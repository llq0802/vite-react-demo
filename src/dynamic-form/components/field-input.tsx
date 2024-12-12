import { Form, Input } from 'antd';

const FieldInput = ({ inputProps, ...restProps }) => {
  return (
    <Form.Item {...restProps}>
      <Input placeholder='请输入' {...inputProps} />
    </Form.Item>
  );
};

export default FieldInput;
