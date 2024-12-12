import { DatePicker, Form } from 'antd';

const FieldDate = ({ dateProps, ...restProps }) => {
  return (
    <Form.Item {...restProps}>
      <DatePicker placeholder='请选择' {...dateProps} />
    </Form.Item>
  );
};

export default FieldDate;
