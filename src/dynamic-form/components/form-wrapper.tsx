import { Button, Form, type FormProps } from 'antd';

type Props = FormProps & {
  footer?: React.ReactNode;
  children?: React.ReactNode;
};

const FormItem = Form.Item;

const FormWrapper: React.FC<Props> = ({
  footer = (
    <FormItem label=' ' colon={false}>
      <Button type='primary' htmlType='submit' block>
        提交
      </Button>
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
      preserve={false}
      labelCol={{ span: 7 }}
      wrapperCol={{ span: 17 }}
      autoComplete='off'
      validateMessages={{
        required: '${label} 是必填项',
      }}
      {...restProps}
    >
      {children}
      {footer}
      <FormItem shouldUpdate noStyle>
        {(form) => {
          return (
            <FormItem label={<b>提交结果</b>}>
              <pre style={{ margin: 0, padding: 6, fontWeight: 700, backgroundColor: '#eee' }}>
                {JSON.stringify(form.getFieldsValue(), null, 2)}
              </pre>
            </FormItem>
          );
        }}
      </FormItem>
    </Form>
  );
};

export default FormWrapper;
