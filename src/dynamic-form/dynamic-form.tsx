import FormWrapper, { FormItem } from './components/form-wrapper';
import type { ControlType, RuleType } from './interface';
import { Fragment, type FC } from 'react';
import FieldInput from './components/field-input';
import FieldDate from './components/field-date';
import FieldSelect from './components/field-select';
import FieldPassword from './components/field-password';
import FieldRadio from './components/field-radio';
import { executeCondition, findValuesByKey } from './utils';

type PropsType = {
  rules: RuleType[];
};

const formItemDomMap = {
  input: FieldInput,
  date: FieldDate,
  select: FieldSelect,
  password: FieldPassword,
  radio: FieldRadio,
} as const;
const DynamicForm: FC<PropsType> = ({ rules }) => {
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
            // 必须使用 shouldUpdate , 否则 form.getFieldValue(name) 获取不到最新的值
            // #ref https://ant-design.antgroup.com/components/form-cn#shouldupdate
            <FormItem shouldUpdate noStyle>
              {(renderForm) => renderControlledFields(renderForm.getFieldValue(rule.name), rule.control)}
            </FormItem>
          )}
        </Fragment>
      );
    });
  };

  const renderControlledFields = (value: unknown, control: ControlType[]) => {
    return control.map((ctrl: ControlType) => {
      const isTrue = executeCondition(value, ctrl.condition, ctrl.value, ctrl);
      if (isTrue) {
        // ctrl.rule只能是 string[] 或者 RuleType[] 不能是 (RuleType | string)[]
        if (typeof ctrl.rule[0] === 'string') {
          const rule: any = findValuesByKey(rules, ctrl.rule[0]);
          if (ctrl.method === 'hidden') return null;
          return <Fragment key={rule.name}>{renderFormItem(rule)}</Fragment>;
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
