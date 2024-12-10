import { message } from 'antd';
import React, { useState } from 'react';
import { useRequest } from 'ahooks';

function editUsername(username: string): Promise<void> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.5) {
        resolve();
      } else {
        reject(new Error('Failed to modify username'));
      }
    }, 500);
  });
}

export default () => {
  const [state, setState] = useState('');

  const { loading, runAsync } = useRequest(editUsername, {
    manual: true,
    onSuccess: () => {
      console.log('==onSuccess====>');
    },
    onError() {
      console.log('==onError====>');
    },
    onFinally() {
      console.log('==onFinally====>');
    },
  });

  const onClick = async () => {
    await runAsync(state);
    setState('');
    // try {
    //   await runAsync(state);
    //   setState('');
    //   console.log('==try-success====>');
    // } catch (error) {
    //   console.log('==catch-onError====>');
    // }
    // console.log('==onClick====>');
  };

  return (
    <div>
      <input
        onChange={(e) => setState(e.target.value)}
        value={state}
        placeholder='Please enter username'
        style={{ width: 240, marginRight: 16 }}
      />
      <button disabled={loading} type='button' onClick={onClick}>
        {loading ? 'Loading' : 'Edit'}
      </button>
    </div>
  );
};
