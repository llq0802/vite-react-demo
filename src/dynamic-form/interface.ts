export type OptionType = {
  label: string;
  value: any;
};

export interface RuleType {
  name: string;
  label: string;
  type: string;
  required?: boolean;
  options?: OptionType[];
  control?: ControlType[];
  hidden?: boolean;
}

export interface ControlType {
  value: any;
  condition: string;
  rule: RuleType[] | string[];
  method?: string;
  handle?: (val: any) => boolean;
}
