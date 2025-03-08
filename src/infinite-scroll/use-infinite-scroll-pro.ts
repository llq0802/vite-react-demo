import { useEffect, useRef, useState, useCallback } from 'react';

// 防抖函数
const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

// 自定义 Hook：useInfiniteScroll
const useInfiniteScroll = (loadMore, options = {}) => {
  const loaderRef = useRef(null); // 用于观察的目标元素
  const [isLoading, setIsLoading] = useState(false); // 加载状态
  const [error, setError] = useState(null); // 错误状态
  const [hasMore, setHasMore] = useState(true); // 是否还有更多数据

  // 加载更多数据的逻辑
  const handleLoadMore = useCallback(
    debounce(async () => {
      if (!hasMore || isLoading) return; // 如果没有更多数据或正在加载，则返回
      setIsLoading(true);
      setError(null);
      try {
        await loadMore();
      } catch (err) {
        setError(err.message || 'Failed to load more items'); // 捕获错误
      } finally {
        setIsLoading(false);
      }
    }, 300), // 防抖延迟 300ms
    [loadMore, hasMore, isLoading]
  );

  useEffect(() => {
    if (!hasMore) return; // 如果没有更多数据，则停止观察

    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting) {
          handleLoadMore();
        }
      },
      {
        root: null, // 相对于视口
        rootMargin: '0px',
        threshold: options.threshold || 0.1, // 默认阈值 0.1
        ...options, // 允许自定义 IntersectionObserver 配置
      }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current); // 开始观察目标元素
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current); // 组件卸载时停止观察
      }
    };
  }, [handleLoadMore, hasMore, options]);

  // 暴露状态和方法
  return {
    loaderRef, // 目标元素的 ref
    isLoading, // 加载状态
    error, // 错误信息
    hasMore, // 是否还有更多数据
    setHasMore, // 手动设置是否还有更多数据
  };
};

export default useInfiniteScroll;
