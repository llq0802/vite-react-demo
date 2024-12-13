import { Form, DatePicker, type FormItemProps, type GetProps } from 'antd';
import dayjs from 'dayjs';

type Props = {
  dateProps: GetProps<typeof DatePicker>;
} & FormItemProps;

const FieldDate: React.FC<Props> = ({ dateProps, ...restProps }) => {
  return (
    <Form.Item
      getValueProps={(value) => ({ value: value && dayjs(Number(value)) })}
      normalize={(value) => value && `${dayjs(value).valueOf()}`}
      {...restProps}
    >
      <DatePicker placeholder='请选择' style={{ width: '100%' }} {...dateProps} />
    </Form.Item>
  );
};

export default FieldDate;
