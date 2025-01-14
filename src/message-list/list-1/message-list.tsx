import React, { useState, useEffect, useRef } from 'react';
import LoadMoreButton from './load-more-button';
import MessageItem from './message-item';

const MessageList = ({ messages, loadMoreMessages }) => {
  const [visibleMessages, setVisibleMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const listRef = useRef(null);

  useEffect(() => {
    setVisibleMessages(messages);
  }, [messages]);

  const handleLoadMore = async () => {
    setIsLoading(true);
    await loadMoreMessages();
    setIsLoading(false);
  };

  const scrollToBottom = () => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    // scrollToBottom();
    // const scrollTop = listRef.current.scrollTop;
    // const scrollHeight = listRef.current.scrollHeight;
    // requestAnimationFrame(() => {
    //   listRef.current.scrollTop = scrollTop + (listRef.current.scrollHeight - scrollHeight);
    // });
  }, [visibleMessages]);

  return (
    <div className='message-list' ref={listRef}>
      <LoadMoreButton isLoading={isLoading} onClick={handleLoadMore} />
      {visibleMessages.map((message, index) => (
        <MessageItem key={index} message={message} />
      ))}
    </div>
  );
};

export default MessageList;
