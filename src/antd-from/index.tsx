import React from 'react';
import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input } from 'antd';
import { useMount } from 'ahooks';

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
  console.log('Success:', values);
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const App: React.FC = () => {
  const [form] = Form.useForm();
  useMount(() => {
    form.setFieldsValue({
      username: '999',
    });
  });
  return (
    <Form
      form={form}
      name='basic'
      autoComplete='off'
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{
        remember: true,
        username: '56165',
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item<FieldType>
        // noStyle
        // hidden

        // extra={111}
        // help={999}
        // colon={false}
        // label={null}
        // shouldUpdate  //要注意 Form.Item 里包裹的子组件必须由函数返回
        // layout='vertical'
        labelCol={{
          flex: '0 0 100px',
        }}
        getValueFromEvent={(e) => {
          // chushi
          console.log('===getValueFromEvent-1===>', e);
          return e.target.value;
        }}
        getValueProps={(value) => {
          //每次初始化或者重新渲染都有效
          console.log('===getValueProps-2===>', value);
          return { value };
        }}
        normalize={(v, pv, s) => {
          // 只在用户操作有效
          console.log('===normalize-3===>', v);
          return v;
        }}
        label='Username'
        name='username'
        // rules={[{ required: true, message: 'Please input your username!' }]}
        // required
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label='Password'
        name='password'
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item<FieldType> name='remember' valuePropName='checked' label={null}>
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item label={null}>
        <Button type='primary' htmlType='submit'>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default App;

// import React from 'react';
// import type { FormProps } from 'antd';
// import { Button, DatePicker, Form } from 'antd';
// import dayjs from 'dayjs';

// const dateTimestamp = dayjs('2024-01-01').valueOf();

// type FieldType = {
//   date?: string;
// };

// const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
//   console.log('Success:', values);
// };

// const App: React.FC = () => (
//   <Form
//     name='getValueProps'
//     labelCol={{ span: 8 }}
//     wrapperCol={{ span: 16 }}
//     style={{ maxWidth: 600 }}
//     initialValues={{ date: dateTimestamp }}
//     onFinish={onFinish}
//     autoComplete='off'
//   >
//     <Form.Item<FieldType>
//       label='Date'
//       name='date'
//       rules={[{ required: true }]}
//       getValueFromEvent={(value) => {
//         console.log('===value-getValueFromEvent===>', value);
//         return value && value.valueOf();
//       }}
//       normalize={(value) => {
//         console.log('===value-normalize===>', value);
//         return value && dayjs(value).valueOf();
//       }}
//       getValueProps={(value) => {
//         console.log('===value-getValueProps===>', value);
//         return { value: value && dayjs(Number(value)) };
//       }}
//     >
//       <DatePicker />
//     </Form.Item>

//     <Form.Item label={null}>
//       <Button type='primary' htmlType='submit'>
//         Submit
//       </Button>
//     </Form.Item>
//   </Form>
// );

// export default App;
