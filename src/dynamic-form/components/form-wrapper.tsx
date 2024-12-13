import { Button, Flex, Form, type FormProps } from 'antd';

type Props = FormProps & {
  footer?: React.ReactNode;
  children?: React.ReactNode;
};

const preStyle: React.CSSProperties = {
  whiteSpace: 'pre-wrap',
  maxHeight: 250,
  margin: 0,
  padding: 8,
  fontWeight: 700,
  backgroundColor: '#eee',
};

export const FormItem = Form.Item;
const FormWrapper: React.FC<Props> = ({
  footer = (
    <FormItem label=' ' colon={false}>
      <Flex vertical gap={16}>
        <Button htmlType='reset' block>
          重置
        </Button>
        <Button type='primary' htmlType='submit' block>
          提交
        </Button>
      </Flex>
    </FormItem>
  ),
  children,
  ...restProps
}) => {
  return (
    <Form
      // initialValues={{
      //   goodsType: 2,
      // }}
      preserve={false} // 删除字段时不保留字段以及值
      labelCol={{ span: 5 }}
      wrapperCol={{ span: 18 }}
      autoComplete='off'
      validateMessages={{ required: '${label} 是必填项' }}
      {...restProps}
    >
      {children}
      {footer}
      <FormItem shouldUpdate noStyle>
        {(form) => {
          return (
            <FormItem label={<b>表单值</b>}>
              <pre style={preStyle}>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
            </FormItem>
          );
        }}
      </FormItem>
    </Form>
  );
};

export default FormWrapper;
