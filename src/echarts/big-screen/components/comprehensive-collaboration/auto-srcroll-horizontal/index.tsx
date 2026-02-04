/**
 * 自动滚动组件(横向)，注意外容器需要display: flex
 */
import { Fragment, ReactNode, useEffect, useRef, useState } from 'react';
import styles from './index.less';
interface AutoScrollProps {
  /**
   * 渲染的内容
   */
  content: ReactNode;
  /**
   * 速度ms
   */
  speed?: number;
}
const AutoScrollHorizontal = ({ content, speed = 80 }: AutoScrollProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<Array<ReactNode>>([]);
  const timer = useRef<NodeJS.Timeout | null>(null);
  const currentScrollLeft = useRef<number>(0);
  const stopScroll = () => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
  };
  const handleScroll = () => {
    if (containerRef.current && contentRef.current) {
      const clientWidth = containerRef.current.clientWidth;
      const scrollWidth = containerRef.current.scrollWidth;
      const scrollLeft = containerRef.current.scrollLeft;
      if (scrollLeft === contentRef.current?.clientWidth) {
        currentScrollLeft.current = 0;
        containerRef.current.scrollLeft = 0;
      } else if (scrollLeft < scrollWidth - clientWidth) {
        currentScrollLeft.current += 1;
        containerRef.current.scrollLeft = currentScrollLeft.current;
      }
      stopScroll();
      timer.current = setTimeout(() => {
        handleScroll();
      }, speed);
    }
  };

  useEffect(() => {
    stopScroll();
    if (containerRef.current && contentRef.current) {
      console.log(contentRef.current.clientWidth);
      currentScrollLeft.current = 0;
      contentRef.current.scrollLeft = 0;
      setData(
        containerRef.current.clientWidth < contentRef.current.clientWidth
          ? [content, content]
          : [content],
      );
      handleScroll();
    }

    return () => {
      stopScroll();
    };
  }, [content]);
  return (
    <div
      className={styles.scrollContainer}
      ref={containerRef}
      onMouseMove={() => {
        stopScroll();
      }}
      onMouseLeave={() => {
        if (containerRef.current && contentRef.current) {
          // if (containerRef.current.scrollLeft > contentRef.current.clientWidth) {
          //   currentScrollLeft.current =
          //     containerRef.current.scrollLeft - contentRef.current.clientWidth;
          //   containerRef.current.scrollLeft =
          //     containerRef.current.scrollLeft - contentRef.current.clientWidth;
          // } else {
          //   currentScrollLeft.current = containerRef.current?.scrollLeft;
          // }
          handleScroll();
        }
      }}
    >
      {data.map((item, index) => {
        return (
          <Fragment key={index}>
            <div>{item}</div>
          </Fragment>
        );
      })}
      <div className={styles.container} ref={contentRef}>
        {content}
      </div>
    </div>
  );
};

export default AutoScrollHorizontal;
