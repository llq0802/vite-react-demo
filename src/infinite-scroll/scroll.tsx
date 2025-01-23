import React, { useRef } from 'react';
import { useInfiniteScroll } from 'ahooks';
import { Button } from 'antd';

interface Result {
  list: string[];
  nextId: string | undefined;
}

const resultData = Array.from({ length: 1000 }, (_, i) => `item-${i + 1}`).toReversed();

function getLoadMoreList(nextId: string | undefined, limit: number): Promise<Result> {
  console.log('===getLoadMoreList===>');
  let start = 0;
  if (nextId) {
    start = resultData.findIndex((i) => i === nextId);
  }
  const end = start + limit;
  const list = resultData.slice(start, end).toReversed();
  const nId = resultData.length >= end ? resultData[end] : undefined;
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        list,
        nextId: nId,
      });
    }, 1000);
  });
}

export default () => {
  const ref = useRef<HTMLDivElement>(null);
  const isFirstIn = useRef(true);

  const { data, loading, loadMore, loadingMore, noMore } = useInfiniteScroll((d) => getLoadMoreList(d?.nextId, 20), {
    target: ref,
    direction: 'top',
    threshold: 100,
    isNoMore: (d) => d?.nextId === undefined,
    onSuccess() {
      if (isFirstIn.current) {
        isFirstIn.current = false;
        requestAnimationFrame(() => {
          const el = ref.current;
          if (el) el.scrollTop = el.scrollHeight;
        });
      }
    },
  });

  return (
    <div ref={ref} style={{ width: 400, height: 500, overflowY: 'auto', border: '1px solid', padding: 16 }}>
      {loading ? (
        <p>loading...</p>
      ) : (
        <div>
          <div style={{ marginBottom: 10 }}>
            {!noMore && (
              <Button type='primary' onClick={loadMore} disabled={loadingMore}>
                {loadingMore ? 'Loading more...' : 'Click to load more'}
              </Button>
            )}
            {noMore && <span>No more data</span>}
          </div>
          {data?.list?.map((item) => (
            <div key={item} style={{ padding: 12, border: '1px solid #f5f5f5' }}>
              item-{item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
