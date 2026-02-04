import { useEffect, useState } from 'react';

/**
 * 获取dashboard页面mock文件数据，只需要传dashborad后的name
 * @param param0
 * @returns
 */
const useMockFileData = <T>({ fileName }: { fileName: string }): { data: T } => {
  const [data, setData] = useState<T>();

  const getData = async () => {
    const res = await fetch(`/mock/dashboard-${fileName}.json`);
    const resultData = await res.json();
    setData(resultData);
  };
  useEffect(() => {
    if (fileName) {
      getData();
    }
  }, [fileName]);
  return { data: data as T };
};

export default useMockFileData;
