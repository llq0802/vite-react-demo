import { Button, Checkbox, DatePicker, Form, Input, Space, type FormProps } from 'antd';
import { useDeferredValue } from 'react';

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
  date?: unknown;
};

const DynamicForm = () => {
  const [form] = Form.useForm<FieldType>();
  const userName = Form.useWatch('username', form);
  const deferredValue = useDeferredValue(userName);
  // console.log('===deferredValue===>', deferredValue);
  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
  };

  const onValuesChange: FormProps<FieldType>['onValuesChange'] = (curVal, allVal) => {
    // console.log('curVal:', Object.keys(curVal)?.[0]);
    // console.log('allVal:', allVal);
  };
  return (
    <Form
      autoComplete='off'
      form={form}
      validateMessages={{
        required: '${label}是必选字段',
      }}
      labelCol={{ span: 7 }}
      wrapperCol={{ span: 17 }}
      onFinish={onFinish}
      onValuesChange={onValuesChange}
    >
      <Form.Item<FieldType> label='姓名' name='username' rules={[{ required: true }]}>
        <Input placeholder='请输入' />
      </Form.Item>

      <Form.Item<FieldType>
        label='密码'
        name='password'
        // rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password placeholder='请输入' />
      </Form.Item>

      <Form.Item<FieldType>
        name='date'
        label='日期'
        // rules={[{ required: true }]}
      >
        <DatePicker placeholder='请选择' />
      </Form.Item>

      <Form.Item<FieldType> name='remember' valuePropName='checked' label='同意'>
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      {/* <Form.Item label='测试' shouldUpdate>
        {(form) => {
          // console.log('===form===>', form);
          // return (
          //   <Form.Item<FieldType> name='other'>
          //     <Input placeholder='请输入' />
          //   </Form.Item>
          // );
          return <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>;
        }}
      </Form.Item> */}

      <Form.Item label=' ' colon={false}>
        <Space>
          <Button type='primary' htmlType='submit'>
            提交
          </Button>
          <Button
            type='primary'
            onClick={() => {
              const ret = form.isFieldTouched('username');
              console.log('===ret===>', ret);
            }}
          >
            isFieldTouched
          </Button>
          <Button
            type='primary'
            onClick={() => {
              const ret = form.isFieldsTouched();
              console.log('===ret===>', ret);
            }}
          >
            isFieldsTouched
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default DynamicForm;
