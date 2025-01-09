import { useState } from 'react';
import { createContainer } from 'react-tracked';

const initialState = {
  count: 0,
  text: 'hello',
  box: 999,
};

const useMyState = () => useState(initialState);

export const { Provider: SharedStateProvider, useTracked: useSharedState } = createContainer(useMyState);

const obj = {
  count: 0,
  text: 'hello',
  box: 999,
};

const pObj = new Proxy(obj, {});

// pObj.count = 2;
// console.log('===pObj.count===>', pObj.count);
// console.log('===obj===>', obj.count);
// console.log('===obj===>', obj === pObj);
