import { Form } from 'antd';
import FormWrapper from './components/form-wrapper';
import type { ControlType, RuleType } from './interface';
import { Fragment, type FC } from 'react';
import FieldInput from './components/field-input';
import FieldDate from './components/field-date';
import FieldSelect from './components/field-select';
import FieldPassword from './components/field-password';
import FieldRadio from './components/field-radio';
import { executeCondition, findValuesByKey } from './utils';

type TypeProps = {
  rules: RuleType[];
};

const DynamicForm: FC<TypeProps> = ({ rules }) => {
  const formItemDomMap = {
    input: FieldInput,
    date: FieldDate,
    select: FieldSelect,
    password: FieldPassword,
    radio: FieldRadio,
  } as const;

  const renderFormItem = (rule: RuleType) => {
    const { name, type, label, required, ...rest } = rule;
    const FormItemComp = formItemDomMap[type];
    return <FormItemComp name={name} label={label} rules={[{ required }]} options={rest.options} />;
  };
  const renderFormContent = (schemaRules: RuleType[]) => {
    return schemaRules.map((rule: RuleType) => {
      if (rule.hidden) return null;
      return (
        <Fragment key={rule.name}>
          {renderFormItem(rule)}
          {rule.control?.length > 0 && (
            <Form.Item shouldUpdate noStyle>
              {(renderForm) => renderControlledFields(renderForm.getFieldValue(rule.name), rule.control)}
            </Form.Item>
          )}
        </Fragment>
      );
    });
  };

  const renderControlledFields = (value: unknown, control: ControlType[]) => {
    return control.map((ctrl: ControlType) => {
      const isTrue = executeCondition(value, ctrl.condition, ctrl.value, ctrl);
      if (isTrue) {
        // ctrl.rule只能是 string[] 或者 RuleType[]
        if (typeof ctrl.rule[0] === 'string') {
          const rule: any = findValuesByKey(rules, ctrl.rule[0]);
          if (ctrl.method === 'hidden') return null;
          return renderFormItem(rule);
        }
        return renderFormContent(ctrl.rule as RuleType[]);
      }
      // 包含metod 为 hidden 属性时，不渲染
      return null;
    });
  };

  return <FormWrapper>{renderFormContent(rules)}</FormWrapper>;
};

export default DynamicForm;
