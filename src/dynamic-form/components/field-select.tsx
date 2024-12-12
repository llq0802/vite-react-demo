import { Form, Select } from 'antd';

const FieldSelect = ({ selectProps, options, ...restProps }) => {
  return (
    <Form.Item {...restProps}>
      <Select placeholder='请选择' options={options} {...selectProps}></Select>
    </Form.Item>
  );
};

export default FieldSelect;
