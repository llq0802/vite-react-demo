import React from 'react';

const MessageItem = ({ message }) => {
  return (
    <div className='message-item'>
      <div className='message-content'>{message.content}</div>
      <div className='message-time'>{message.time}</div>
    </div>
  );
};

export default MessageItem;
