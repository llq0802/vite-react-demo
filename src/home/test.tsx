import { Button, Divider, Flex } from 'antd';
import React, { FC, useState, useEffect } from 'react';
import { useImmer } from 'use-immer';
import { produce } from 'immer';
import { useRequest } from 'ahooks';

const TestComponent: FC = () => {
  const [type, setType] = useState(999);
  const [counts, setCount] = useImmer({ count1: 0, count2: 0 });

  const [todos, setTodos] = useState([
    {
      id: 'React',
      title: 'Learn React',
      done: true,
    },
    {
      id: 'Immer',
      title: 'Try Immer',
      done: false,
    },
  ]);
  const handleClick = () => {
    setTimeout(() => {
      setCount({
        count1: 1,
        count2: 2,
      });

      setCount((draft) => {
        draft.count1 = draft.count1 + 1;
        draft.count2 = draft.count2 + 10;
      });
    });
  };

  console.log('render');

  const handleAdd = () => {
    const retFunc = produce((draft) => {
      draft.push({
        id: 'todo_' + Math.random(),
        title: 'A new todo',
        done: false,
      });
    });
    const retObj = produce(todos, (draft) => {
      draft.push({
        id: 'todo_' + Math.random(),
        title: 'A new todo',
        done: false,
      });
    });
    console.log('===retFunc===>', retFunc);
    console.log('===retObj===>', retObj);
    setTodos(retFunc);
  };

  const { loading, run, data } = useRequest(
    (type) => {
      if (type === 1) {
        return Promise.resolve(1);
      }
      return Promise.resolve(0);
    },
    {
      cacheKey: `cacheKey-${type}`,
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
    }
  );

  return (
    <div className='w-full h-full'>
      <h1>测试组件</h1>
      <Divider />
      <Button onClick={handleClick}>use-immer测试</Button>
      <Button onClick={handleAdd}>immer</Button>
      <p>count1: {counts.count1}</p>
      <p>count2: {counts.count2}</p>
      <p>todos: {todos.length}</p>
      <Divider />
      <Flex gap={16}>
        <Button
          onClick={() => {
            setType(0);
            run(0);
          }}
        >
          测试 useRequest 0
        </Button>
        <Button
          onClick={() => {
            setType(1);
            run(1);
          }}
        >
          测试 useRequest 1
        </Button>
      </Flex>
    </div>
  );
};

export default TestComponent;
