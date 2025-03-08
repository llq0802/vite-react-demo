import React, { useState } from 'react';
import useInfiniteScroll from './use-infinite-scroll-pro';

const InfiniteScrollList = () => {
  const [items, setItems] = useState(Array.from({ length: 10 }, (_, i) => `Item ${i + 1}`)); // 初始数据

  // 模拟加载更多数据
  const loadMore = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() < 0.1) {
          reject(new Error('Failed to load more items')); // 模拟 10% 的失败率
        } else {
          const newItems = Array.from({ length: 10 }, (_, i) => `Item ${items.length + i + 1}`);
          setItems((prev) => [...prev, ...newItems]);
          if (items.length >= 1000) {
            setHasMore(false); // 假设最多加载 50 条数据
          }
          resolve();
        }
      }, 1000); // 模拟 1 秒延迟
    });
  };

  // 使用自定义 Hook
  const { loaderRef, isLoading, error, hasMore, setHasMore } = useInfiniteScroll(loadMore, {
    threshold: 0.1, // 自定义阈值
  });

  return (
    <div>
      <h1>Infinite Scroll List</h1>
      <ul>
        {items.map((item, index) => (
          <li key={index} style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
            {item}
          </li>
        ))}
      </ul>
      {isLoading && <div style={{ textAlign: 'center', padding: '10px' }}>Loading...</div>}
      {error && (
        <div style={{ textAlign: 'center', padding: '10px', color: 'red' }}>
          {error} <button onClick={loadMore}>Retry</button>
        </div>
      )}
      {!hasMore && <div style={{ textAlign: 'center', padding: '10px' }}>No more items</div>}
      <div ref={loaderRef} style={{ height: '20px' }}></div>
    </div>
  );
};

export default InfiniteScrollList;
