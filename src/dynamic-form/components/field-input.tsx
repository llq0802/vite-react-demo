import { Form, Input, type FormItemProps, type InputProps } from 'antd';

type Props = {
  inputProps?: InputProps;
} & FormItemProps;

const FieldInput: React.FC<Props> = ({ inputProps, ...restProps }) => {
  return (
    <Form.Item {...restProps}>
      <Input placeholder='请输入' {...inputProps} />
    </Form.Item>
  );
};

export default FieldInput;
