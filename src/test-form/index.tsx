import dayjs from 'dayjs';
import DynamicForm from './DynamicForm/index';
import { RuleType } from './interface';
import TestForm from './test-form';

const rules: RuleType[] = [
  { name: 'goodsName', label: '商品名称', type: 'input', required: true },
  {
    name: 'goodsType',
    label: '商品类型',
    type: 'radio',
    options: [
      { label: '数码', value: 1 },
      { label: '食品', value: 2 },
      { label: '服装', value: 3 },
    ],
    control: [
      {
        value: 1,
        condition: '==',
        rule: [
          {
            name: 'digitalGoods',
            label: '数码商品',
            type: 'select',
            options: [
              { label: '手机', value: 'phone' },
              { label: '电脑', value: 'computer' },
              { label: '平板', value: 'pad' },
            ],
            required: false,
          },
        ],
      },
      {
        value: 2,
        condition: '==',
        rule: [
          {
            name: 'foodGoods',
            label: '食品商品',
            type: 'select',
            options: [
              { label: '水果', value: 'fruit' },
              { label: '海鲜', value: 'seafood' },
              { label: '肉类', value: 'meat' },
              { label: '蔬菜', value: 'vegetable' },
            ],
            required: false,
          },
        ],
      },
      {
        value: 3,
        condition: '==',
        rule: [
          {
            name: 'clothingGoods',
            label: '服装商品',
            type: 'select',
            options: [
              { label: '上衣', value: 't-shirt' },
              { label: '裤子', value: 'pants' },
            ],
            control: [
              {
                value: 'pants',
                condition: '==',
                rule: [
                  {
                    label: '裤子类型',
                    name: 'jeans',
                    type: 'select',
                    options: [
                      { label: '牛仔裤', value: 'jeans' },
                      { label: '休闲裤', value: 'casual' },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: 'upDate',
    label: '上架日期',
    type: 'date',
    control: [
      {
        handle(val: any) {
          return dayjs().isAfter(val);
        },
        rule: [{ name: 'remark', label: '备注', type: 'input', required: true }],
        value: undefined,
        condition: '',
      },
    ],
  },
  {
    name: 'price',
    label: '价格',
    type: 'input',
    control: [
      { value: ['50', '100'], condition: 'between', method: 'hidden', rule: ['reason'] },
      { value: ['50', '100'], condition: 'notBetween', method: 'display', rule: ['reason'] },
    ],
  },
  { name: 'reason', label: '原因', type: 'input', hidden: true, required: true },
];

// 使用表单生成器组件
const App = () => {
  return (
    <div
      style={{
        width: '50%',
      }}
    >
      {/* <DynamicForm rules={rules} /> */}

      <TestForm />
    </div>
  );
};

export default App;
