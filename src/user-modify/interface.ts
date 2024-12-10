export type ATagInputActionRef = {
  addTag: (tagvalue: string, taglabel: string) => void;
  onFocus: () => void;
  onBlur: () => void;
  clear: () => void;
};

export type ATagInputProps = {
  /**
   * 如果内容是tag里面的则必须满足 `{{#id.name#}}` 的格式
   * @example
   * const value = '其他信息{{#123.张三#}}其他信息{{#124.李四#}}等'
   */
  value?: string;
  onChange?: (val: string) => void;
  readOnly?: boolean;
  disabled?: boolean;
  /**
   * 是否在添加标签后焦点
   * @default true
   */
  isAddTagAfterFocus?: boolean;
  placeholder?: string;
  style?: React.CSSProperties;
  className?: string;
  tagClassName?: string;
  actionRef?: React.MutableRefObject<ATagInputActionRef | undefined>;
  inputStyle?: React.CSSProperties;
  inputClassName?: string;
  placeholderStyle?: React.CSSProperties;
  onKeyDown?: React.KeyboardEventHandler<HTMLDivElement>;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  /**
   *
   * @param tagvalue
   * @param taglabel
   * @returns 字符串类型标签
   * @example
   * const ret = '<span class='class-xxx' style='xxxx'>标签</span>'
   */
  renderTag?: (tagvalue: string, taglabel: string) => string;
  [x: string]: any;
} & React.HTMLAttributes<HTMLDivElement>;
