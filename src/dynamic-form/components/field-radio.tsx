import { Form, Radio } from 'antd';

const FieldRadio = ({ radioProps, options, ...restProps }) => {
  return (
    <Form.Item {...restProps}>
      <Radio.Group options={options} {...radioProps} />
    </Form.Item>
  );
};

export default FieldRadio;
