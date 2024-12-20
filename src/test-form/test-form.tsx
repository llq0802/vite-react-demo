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
      <Form.Item<FieldType> label='姓名' name={[0, 'username1']} rules={[{ required: true }]}>
        <Input placeholder='请输入' />
      </Form.Item>

      <Form.Item<FieldType> label='密码' name={[0, 'password1']}>
        <Input.Password placeholder='请输入' />
      </Form.Item>

      <Form.Item<FieldType> name={[2, 'date1']} label='日期'>
        <DatePicker placeholder='请选择' />
      </Form.Item>

      <Form.Item<FieldType> name={[3, 'remember1']} valuePropName='checked' label='同意'>
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

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
