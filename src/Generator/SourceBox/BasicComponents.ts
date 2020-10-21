/*
 * @Description: 基础组件
 * @Module: BasicComponents
 * @Author: Draco
 * @Email: Draco.coder@gmail.com
 * @Github: https://github.com/draco-china
 * @Date: 2020-09-18 11:10:09
 * @LastEditTime: 2020-10-21 17:18:36
 */
import { IMarkupSchemaFieldProps } from '@formily/antd';

export const BasicGroup = [
  {
    type: 'string',
    name: 'String',
    title: '输入框',
    description: '输入框组件',
  },
  {
    type: 'textarea',
    name: 'Textarea',
    title: '多行输入框',
    description: '多行输入框组件',
  },
  {
    type: 'password',
    name: 'Password',
    title: '密码框',
    description: '密码输入框组件',
  },
  {
    type: 'number',
    name: 'Number',
    title: '数字框',
    description: '数字输入框组件',
  },
  {
    type: 'select',
    name: 'Select',
    title: '选择框',
    description: '选择框组件',
  },
  {
    type: 'checkbox',
    name: 'Checkbox',
    title: '勾选框',
    description: '勾选框组件',
  },
  {
    type: 'radio',
    name: 'Radio',
    title: '单选框',
    description: '单选框组件',
  },
  {
    type: 'upload',
    name: 'Upload',
    title: '文件上传',
    description: '文件上传组件',
  },
  {
    type: 'time',
    name: 'Time',
    title: '时间',
    description: '时间选择器',
  },
  {
    type: 'timerange',
    name: 'Timerange',
    title: '时间范围',
    description: '范围时选择器',
  },
  {
    type: 'date',
    name: 'Date',
    title: '日期',
    description: '日期选择器',
  },
  {
    type: 'daterange',
    name: 'DateRange',
    title: '日期范围',
    description: '范围日期选择器',
  },
  {
    type: 'rating',
    name: 'Rating',
    title: '评分',
    description: '评价组件',
  },
  {
    type: 'boolean',
    name: 'Boolean',
    title: '开关',
    description: '开关组件',
  },
  {
    type: 'range',
    name: 'Range',
    title: '范围',
    description: '范围选择器',
  },
  {
    type: 'transfer',
    name: 'Transfer',
    title: '穿梭框',
    description: '穿梭框组件',
    render: (record: { label: string }) => record.label,
  },
];

export const ComplexGroup = [
  {
    type: 'object',
    name: 'Object',
    title: '对象',
    description: '对象组件',
    children: [],
  },
  {
    type: 'array',
    name: 'Array',
    title: '列表',
    description: '数组组件',
    children: [],
  },
];

const StepsGroup = [
  {
    type: 'step',
    name: 'Step',
    title: '步骤',
    description: '步骤组件',
    children: [],
  },
];

const BasicComponents: {
  title: string;
  group: IMarkupSchemaFieldProps[];
}[] = [
  {
    title: '基础组件',
    group: BasicGroup,
  },
  {
    title: '复杂组件',
    group: ComplexGroup,
  },
  {
    title: '分步组件',
    group: StepsGroup,
  },
];

export default BasicComponents;
