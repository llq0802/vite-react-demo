import { Button, Divider } from 'antd';
import React, { FC, useState, useEffect } from 'react';
import { useImmer } from 'use-immer';
import { produce } from 'immer';
const TestComponent: FC = () => {
  const [counts, setCount] = useImmer({
    count1: 0,
    count2: 0,
  });

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

  // 事件处理函数
  const handleClick = () => {
    setCount((draft) => {
      draft.count1 += 1;
    });
  };

  const handleAdd = () => {
    const ret1 = produce((draft) => {
      draft.push({
        id: 'todo_' + Math.random(),
        title: 'A new todo',
        done: false,
      });
    });
    const ret2 = produce(todos, (draft) => {
      draft.push({
        id: 'todo_' + Math.random(),
        title: 'A new todo',
        done: false,
      });
    });
    console.log('===ret1===>', ret1);
    setTodos(ret1);
  };

  return (
    <div>
      <h1>测试组件</h1>

      <Divider></Divider>

      <Button onClick={handleClick}>测试1</Button>
      <Button onClick={handleAdd}>测试2</Button>

      <p>count1: {counts.count1}</p>
      <p>count2: {counts.count2}</p>
      <p>todos: {todos.length}</p>
    </div>
  );
};

export default TestComponent;
