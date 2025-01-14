import React from 'react';

const LoadMoreButton = ({ isLoading, onClick }) => {
  return (
    <button className='load-more-button' onClick={onClick} disabled={isLoading}>
      {isLoading ? 'Loading...' : 'Load More'}
    </button>
  );
};

export default LoadMoreButton;
