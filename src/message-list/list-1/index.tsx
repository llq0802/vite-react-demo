import React, { useState } from 'react';
import MessageList from './message-list';
import './index.less';

const List1 = () => {
  const [messages, setMessages] = useState([]);

  const loadMoreMessages = () => {
    // 模拟加载更多消息
    setMessages((prev) => {
      const newMessages = Array.from({ length: 10 }, (_, i) => ({
        id: prev.length + i,
        content: `Message ${prev.length + i}`,
        time: new Date().toLocaleTimeString(),
      }));
      return [...newMessages, ...prev];
    });
  };

  return (
    <>
      <h1>微信历史记录</h1>
      <div className='list-1'>
        <MessageList messages={messages} loadMoreMessages={loadMoreMessages} />
      </div>
    </>
  );
};

export default List1;
