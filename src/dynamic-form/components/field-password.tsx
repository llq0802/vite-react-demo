import { Form, Input, type FormItemProps } from 'antd';
import type { PasswordProps } from 'antd/es/input';

type Props = {
  passwordProps?: PasswordProps;
} & FormItemProps;
const FieldPassword: React.FC<Props> = ({ passwordProps, ...restProps }) => {
  return (
    <Form.Item {...restProps}>
      <Input.Password placeholder='请输入' {...passwordProps} />
    </Form.Item>
  );
};

export default FieldPassword;
