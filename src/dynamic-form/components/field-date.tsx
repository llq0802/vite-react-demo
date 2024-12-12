import { Form, DatePicker, type FormItemProps, type GetProps } from 'antd';

type Props = {
  dateProps: GetProps<typeof DatePicker>;
} & FormItemProps;

const FieldDate: React.FC<Props> = ({ dateProps, ...restProps }) => {
  return (
    <Form.Item {...restProps}>
      <DatePicker placeholder='请选择' style={{ width: '100%' }} {...dateProps} />
    </Form.Item>
  );
};

export default FieldDate;
