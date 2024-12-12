import { Form, Select, type FormItemProps, type SelectProps } from 'antd';

type Props = {
  selectProps: SelectProps;
  options: SelectProps['options'];
} & FormItemProps;

const FieldSelect: React.FC<Props> = ({ selectProps, options, ...restProps }) => {
  return (
    <Form.Item {...restProps}>
      <Select placeholder='请选择' options={options} {...selectProps}></Select>
    </Form.Item>
  );
};

export default FieldSelect;
