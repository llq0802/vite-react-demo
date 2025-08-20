import { useMount } from 'ahooks';
import React from 'react';
import { init, skeleton } from '@alilc/lowcode-engine';

type PropsType = {};

const Page: React.FC<PropsType> = ({}) => {
  // useMount(() => {
  //   // 例如，在页面上添加一个 logo
  //   skeleton.add({
  //     area: 'topArea',
  //     type: 'Widget',
  //     name: 'logo',
  //     content: <>测试content</>,
  //     contentProps: {
  //       logo: 'https://img.alicdn.com/tfs/TB1_SocGkT2gK0jSZFkXXcIQFXa-66-66.png',
  //       href: '/',
  //     },
  //     props: {
  //       align: 'left',
  //       width: 100,
  //     },
  //   });

  //   // 初始化引擎，挂载到 id 为 'lce' 的 DOM 元素上
  //   init(document.getElementById('lce')!);
  // });
  return <div id='lce'></div>;
};

export default Page;
