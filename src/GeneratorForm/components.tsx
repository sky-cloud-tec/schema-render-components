import {
  Input,
  Radio,
  Checkbox,
  Select,
  DatePicker,
  NumberPicker,
  TimePicker,
  Upload,
  Switch,
  Range,
  Transfer,
  Rating,
  Password,
  ArrayCards,
} from '@formily/antd-components';

const components: { [key: string]: React.JSXElementConstructor<any> } = {
  time: TimePicker,
  timerange: TimePicker.RangePicker,
  date: DatePicker,
  daterange: DatePicker.RangePicker,
  transfer: Transfer,
  boolean: Switch,
  array: ArrayCards,
  checkbox: Checkbox.Group,
  string: Input,
  select: Select,
  textarea: Input.TextArea,
  number: NumberPicker,
  password: Password,
  radio: Radio.Group,
  range: Range,
  rating: Rating,
  upload: Upload,
};

import 'antd/lib/transfer/style/index';

export default components;
