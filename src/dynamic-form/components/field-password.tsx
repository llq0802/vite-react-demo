import { Form, Input } from 'antd';

const FieldPassword = ({ passwordProps, ...restProps }) => {
  return (
    <Form.Item {...restProps}>
      <Input.Password placeholder='请输入' {...passwordProps} />
    </Form.Item>
  );
};

export default FieldPassword;
