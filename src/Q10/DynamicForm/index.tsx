import { Button, DatePicker, Form, Input, message, Radio, Select } from 'antd';
import { Fragment, lazy, useState } from 'react';
import { ControlType, RuleType } from '../interface';

const { Option } = Select;

interface PropType {
  rules: RuleType[];
}

const DynamicFor: React.FC<PropType> = ({ rules }) => {
  const [form] = Form.useForm();
  const [submitResult, setSubmitResult] = useState(null);
  const [formData, setFormData] = useState<{ [key: string]: any }>({});

  // 点击
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // 处理表单提交
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setSubmitResult(values);
      message.success('表单提交成功');
    } catch (errorInfo) {
      message.error('表单验证失败');
    }
  };

  const evaluateCondition = (value: any, condition: string, targetValue: any, ctrl: any): boolean => {
    switch (condition) {
      case '==':
        return value === targetValue;
      case '===':
        return value === targetValue;
      case '!=':
        return value !== targetValue;
      case '!==':
        return value !== targetValue;
      case '>':
        return value > targetValue;
      case '<':
        return value < targetValue;
      case '>=':
        return value >= targetValue;
      case '<=':
        return value <= targetValue;
      case 'between':
        if (Array.isArray(targetValue) && targetValue.length === 2) {
          return value >= Number(targetValue[0]) && value <= Number(targetValue[1]);
        }
        return false;
      case 'notBetween':
        if (Array.isArray(targetValue) && targetValue.length === 2) {
          return value < Number(targetValue[0]) || value > Number(targetValue[1]);
        }
        return false;
      case '':
        return ctrl?.handle(value);
      default:
        return false;
    }
  };

  // 递归查询的对应的对象
  const findValuesByKey = (data: any[], key: string) => {
    let result = {};
    data.forEach((item) => {
      if (item.name === key) {
        result = item;
      }
      if (item.control || item.rule) {
        findValuesByKey(item.control || item.rule, key);
      }
    });
    return result;
  };

  // 根据配置生成表单项
  const renderFormItem = (rule: RuleType) => {
    switch (rule.type) {
      case 'input':
        return (
          <Input
            value={formData[rule.name] || ''}
            onChange={(e) => handleChange({ target: { value: e, name: rule.name } })}
          />
        );
      case 'radio':
        return (
          <Radio.Group onChange={handleChange} value={formData[rule.name] || ''}>
            {rule?.options?.map((option) => (
              <Radio key={option.value} value={option.value}>
                {option.label}
              </Radio>
            ))}
          </Radio.Group>
        );
      case 'select':
        return (
          <Select
            value={formData[rule.name] || ''}
            onChange={(e) => handleChange({ target: { value: e, name: rule.name } })}
          >
            {rule?.options?.map((option) => (
              <Option key={option.value} value={option.value}>
                {option.label}
              </Option>
            ))}
          </Select>
        );
      case 'date':
        return (
          <DatePicker
            value={formData[rule.name] || ''}
            onChange={(e) => handleChange({ target: { value: e, name: rule.name } })}
          />
        );
      default:
        return null;
    }
  };
  const renderControlledFields = (control: ControlType[], value: any) => {
    return control.map((ctrl: any) => {
      if (evaluateCondition(value, ctrl.condition, ctrl.value, ctrl)) {
        if (typeof ctrl.rule[0] === 'string') {
          const rule: any = findValuesByKey(rules, ctrl.rule[0]);
          if (ctrl.method === 'hidden') return null;
          return (
            <Form.Item
              key={rule.name}
              name={rule.name}
              label={rule.label}
              rules={rule.required ? [{ required: true, message: `${rule.label} 是必填项` }] : []}
            >
              {renderFormItem(rule)}
            </Form.Item>
          );
        }
        return ctrl.rule.map((subRule: any) => (
          <Fragment key={subRule.name}>
            <Form.Item
              name={subRule.name}
              label={subRule.label}
              rules={subRule.required ? [{ required: true, message: `${subRule.label} 是必填项` }] : []}
            >
              {renderFormItem(subRule)}
            </Form.Item>
            {subRule.control && renderControlledFields(subRule.control, form.getFieldValue(subRule.name))}
          </Fragment>
        ));
      }
      return null;
    });
  };

  // 渲染表单
  const renderForm = () => {
    return rules.map((rule: RuleType, i) => {
      if (rule.hidden) {
        return null;
      }
      return (
        <Fragment key={i}>
          <Form.Item label={rule.label} name={rule.name} rules={[{ required: rule.required }]}>
            {renderFormItem(rule)}
          </Form.Item>
          {rule.control && renderControlledFields(rule.control, form.getFieldValue(rule.name))}
        </Fragment>
      );
    });
  };

  const buttonItemLayout = {
    wrapperCol: { span: 4, offset: 20 },
  };

  return (
    <>
      <Form form={form} labelCol={{ span: 5 }} wrapperCol={{ span: 18 }}>
        {renderForm()}
        <Form.Item {...buttonItemLayout}>
          <Button type='primary' onClick={handleSubmit}>
            提交
          </Button>
        </Form.Item>
      </Form>
      {submitResult && (
        <div>
          <h3>提交结果：</h3>
          <pre>{JSON.stringify(submitResult, null, 2)}</pre>
        </div>
      )}
    </>
  );
};

export default DynamicFor;
