import { Form, Radio, type FormItemProps, type GetProps } from 'antd';

type Props = {
  radioProps: GetProps<typeof Radio.Group>;
  options: Parameters<typeof Radio.Group>[0]['options'];
} & FormItemProps;

const FieldRadio: React.FC<Props> = ({ radioProps, options, ...restProps }) => {
  return (
    <Form.Item {...restProps}>
      <Radio.Group options={options} {...radioProps} />
    </Form.Item>
  );
};

export default FieldRadio;
