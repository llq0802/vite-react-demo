import React, { ReactNode, useEffect, useRef, useState } from 'react';

// 定义列表项数据类型
interface ListItem {
  id: string | number;
  content: ReactNode;
}

// 定义组件属性类型
interface FlexRemAutoScrollListProps {
  items: ListItem[];
  speed?: number; // 滚动速度，值越小越快，默认50ms
  step?: number; // 每次滚动距离，默认0.5px
  flexGrow?: number; // 弹性布局的增长因子，默认1
  itemHeightRem?: number; // 每个项的高度(rem单位)，默认2rem
  pauseOnHover?: boolean; // 鼠标悬停时是否暂停，默认true
  enableMouseScroll?: boolean; // 是否启用鼠标滚动，默认false
  mouseScrollSensitivity?: number; // 鼠标滚动灵敏度，默认1
  containerClassName?: string; // 容器自定义类名
  itemClassName?: string; // 列表项自定义类名
}

const FlexRemAutoScrollList: React.FC<FlexRemAutoScrollListProps> = ({
  items,
  speed = 50,
  step = 0.5,
  flexGrow = 1,
  itemHeightRem = 2,
  pauseOnHover = true,
  enableMouseScroll = true,
  mouseScrollSensitivity = 1,
  containerClassName = '',
  itemClassName = '',
}) => {
  // 状态管理
  const [isScrolling, setIsScrolling] = useState(true);
  const [itemHeightPx, setItemHeightPx] = useState(0); // 存储转换后的px高度
  const [translateY, setTranslateY] = useState(0); // 垂直位移距离

  // DOM引用
  const listContainerRef = useRef<HTMLDivElement>(null);
  const scrollContentRef = useRef<HTMLDivElement>(null);
  const measurementRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // 计算rem到px的转换
  useEffect(() => {
    // 创建一个临时元素用于测量rem对应的px值
    if (measurementRef.current) {
      const computedStyle = window.getComputedStyle(measurementRef.current);
      const height = parseFloat(computedStyle.height);
      setItemHeightPx(height);
    }
  }, [itemHeightRem]);

  // 处理滚动逻辑
  const handleScroll = () => {
    if (itemHeightPx === 0) return;

    setTranslateY((prev) => {
      // 计算最大滚动距离（原始列表高度）
      const maxScroll = items.length * itemHeightPx;

      // 当滚动超过原始列表时，重置到起始位置
      if (prev >= maxScroll - 1) {
        return 0; // 重置到起始位置
      } else {
        return prev + step; // 继续向下滚动
      }
    });
  };

  // 开始滚动
  const startScrolling = () => {
    if (intervalRef.current) return;

    intervalRef.current = setInterval(handleScroll, speed);
  };

  // 停止滚动
  const stopScrolling = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  // 鼠标事件处理
  const handleMouseEnter = () => {
    if (pauseOnHover) {
      setIsScrolling(false);
      stopScrolling();
    }
  };

  const handleMouseLeave = () => {
    if (pauseOnHover) {
      setIsScrolling(true);
      startScrolling();
    }
  };

  // 处理鼠标滚轮滚动
  const handleWheel = (e: React.WheelEvent) => {
    if (!enableMouseScroll) return;

    // 阻止默认滚动行为
    e.preventDefault();

    // 计算滚动增量
    const delta = e.deltaY * mouseScrollSensitivity;

    setTranslateY((prev) => {
      const newTranslateY = prev + delta;

      // 计算总内容高度和容器高度
      const totalContentHeight = items.length * itemHeightPx;
      const containerHeight = listContainerRef.current?.clientHeight || 0;

      // 最大滚动距离 = 总内容高度 - 容器高度
      const maxScroll = Math.max(0, totalContentHeight - containerHeight);

      // 处理边界情况，限制滚动范围
      if (newTranslateY < 0) {
        return 0; // 顶部边界
      } else if (newTranslateY > maxScroll) {
        return maxScroll; // 底部边界
      }

      return newTranslateY;
    });
  };

  // 窗口大小变化时重新计算
  useEffect(() => {
    const handleResize = () => {
      if (measurementRef.current) {
        const computedStyle = window.getComputedStyle(measurementRef.current);
        const height = parseFloat(computedStyle.height);
        setItemHeightPx(height);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [itemHeightRem]);

  // 组件挂载和卸载时的处理
  useEffect(() => {
    if (itemHeightPx > 0 && isScrolling) {
      startScrolling();
    }

    return () => {
      stopScrolling();
    };
  }, [items, speed, step, itemHeightPx, isScrolling]);

  return (
    <>
      {/* 用于测量rem对应px值的隐藏元素 */}
      <div
        ref={measurementRef}
        style={{
          height: `${itemHeightRem}rem`,
          visibility: 'hidden',
          position: 'absolute',
          // top: '-9999px',
        }}
      />

      <div
        ref={listContainerRef}
        className={`flex-auto overflow-hidden relative ${containerClassName}`}
        style={{
          flexGrow,
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onWheel={handleWheel}
      >
        <div
          ref={scrollContentRef}
          style={{
            // 通过transform实现无缝循环滚动
            minHeight: '100%',
            transform: `translateY(-${translateY}px)`,
            transition: 'none', // 禁用过渡动画以保证流畅
          }}
        >
          {items.map((item) => (
            <div
              key={item.id}
              className={itemClassName}
              style={{
                height: `${itemHeightRem}rem`,
                display: 'flex',
                alignItems: 'center',
                boxSizing: 'border-box',
              }}
            >
              {item.content}
            </div>
          ))}
        </div>

        {/* 滚动状态指示器 */}
        {/* {!isScrolling && (
          <div
            style={{
              position: 'absolute',
              top: '0.5rem',
              right: '0.5rem',
              backgroundColor: 'rgba(0,0,0,0.5)',
              color: 'white',
              padding: '0.2rem 0.8rem',
              borderRadius: '1rem',
              fontSize: '0.8rem',
            }}
          >
            已暂停
          </div>
        )} */}
      </div>
    </>
  );
};

export default FlexRemAutoScrollList;
