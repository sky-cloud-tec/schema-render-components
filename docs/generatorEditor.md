---
title: 编辑器
sidemenu: false
nav: { title: 编辑器, order: 1 }
---

## 安装

```shell
npm install --save antd @ant-design/pro-table @formily/antd @formily/antd-components formily-schema-generator
```

## 代码演示

```tsx
import React from 'react';
import { GeneratorEditor } from 'formily-schema-generator';

export default () => (
  <GeneratorEditor
    defaultSchema={[
      {
        type: 'step',
        name: 'step-1',
        title: '步骤',
        description: '步骤组件',
        children: [
          {
            type: 'textarea',
            name: 'textarea',
            title: '多行输入框',
            description: '多行输入框组件',
            key: 'textarea',
          },
          {
            type: 'string',
            name: 'string',
            title: '输入框',
            description: '输入框组件',
            key: 'string',
          },
        ],
        key: 'step',
      },
      {
        type: 'step',
        name: 'step-2',
        title: '步骤',
        description: '步骤组件',
        children: [
          {
            type: 'array',
            name: 'array',
            title: '列表',
            description: '数组组件',
            children: [
              {
                type: 'string',
                name: 'string',
                title: '输入框',
                description: '输入框组件',
                key: 'string_OH4OVK',
              },
              {
                type: 'time',
                name: 'time',
                title: '时间',
                description: '时间',
                key: 'time_OH4OVK',
              },
            ],
            key: 'array',
          },
          {
            type: 'object',
            name: 'object',
            title: '对象',
            description: '对象组件',
            children: [
              {
                type: 'string',
                name: 'string',
                title: '输入框',
                description: '输入框组件',
                key: 'string_a_h9bC',
              },
              {
                type: 'textarea',
                name: 'textarea',
                title: '多行输入框',
                description: '多行输入框组件',
                key: 'textarea_a_h9bC',
              },
            ],
            key: 'object',
          },
        ],
        key: 'step-2',
      },
    ]}
  />
);
```

## API

| 参数          | 说明           | 类型                                                   | 默认值 |
| ------------- | -------------- | ------------------------------------------------------ | ------ |
| defaultSchema | 初始化默认模型 | <a href="/generator-editor#ischema-属性">ISchema</a>[] | []     |
| onSave        | 保存按钮事件   | (values: ISchema) => void                              | -      |
| onExport      | 导出按钮事件   | (values: ISchema) => void                              | -      |

### ISchema 属性

Schema 协议对象，主要用于约束一份 json 结构满足 Schema 协议

| 属性名               | 描述                                    | 类型                                                                                                                               |
| -------------------- | --------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| title                | 字段 label                              | React.ReactNode                                                                                                                    |
| name                 | 字段名                                  | string                                                                                                                             |
| description          | 字段描述信息                            | React.ReactNode                                                                                                                    |
| default              | 字段默认值                              | any                                                                                                                                |
| readOnly             | 只读                                    | boolean                                                                                                                            |
| writeOnly            | 只写                                    | boolean                                                                                                                            |
| type                 | 字段类型                                | 'string' `or` 'object' `or` 'array' `or` 'number' `or` string                                                                      |
| enum                 | 相当于字段 dataSource                   | `Array<string\|number\|{label:React.ReactNode;value:any}>`                                                                         |
| const                | 校验字段值是否与 const 的值相等         | any                                                                                                                                |
| multipleOf           | 校验字段值是否可被 multipleOf 的值整除  | number                                                                                                                             |
| maximum              | 最大值                                  | number                                                                                                                             |
| exclusiveMaximum     | 校验最大值（大于等于）                  | number                                                                                                                             |
| minimum              | 最小值                                  | number                                                                                                                             |
| exclusiveMinimum     | 校验最小值（小于等于）                  | number                                                                                                                             |
| maxLength            | 最大长度                                | number                                                                                                                             |
| minLength            | 最小长度                                | number                                                                                                                             |
| pattern              | 正则校验规则                            | string `or` RegExp                                                                                                                 |
| maxItems             | 最大项数                                | number                                                                                                                             |
| minItems             | 最小项数                                | number                                                                                                                             |
| uniqueItems          | 是否校验重复                            | boolean                                                                                                                            |
| maxProperties        | 最大属性数量                            | number                                                                                                                             |
| minProperties        | 最小属性数量                            | number                                                                                                                             |
| required             | 是否必填，为 true 会同时设置校验规则    | string[] `or` boolean                                                                                                              |
| format               | 正则规则类型                            | string                                                                                                                             |
| properties           | 对象属性                                | { [key: string]: <a href="#ischema-属性">ISchema</a>[] }                                                                           |
| items                | 数组描述                                | <a href="#ischema-属性">ISchema</a>`or`<a href="#ischema-属性">ISchema</a>[]                                                       |
| patternProperties    | 动态匹配对象的某个属性的 Schema         | { [key: string]: <a href="#ischema-属性">ISchema</a> }                                                                             |
| additionalProperties | 匹配对象额外属性的 Schema               | <a href="#ischema-属性">ISchema</a>                                                                                                |
| editable             | 字段是否可编辑                          | boolean                                                                                                                            |
| visible              | 字段是否显示（伴随 value 的显示和隐藏） | boolean                                                                                                                            |
| display              | 字段是否显示（纯视觉，不影响 value）    | boolean                                                                                                                            |
| triggerType          | 规则校验触发                            | onBlur `or` onchange                                                                                                               |
| x-props              | 字段扩展属性                            | { [name: string]: any }                                                                                                            |
| x-index              | 字段顺序                                | number                                                                                                                             |
| x-rules              | 校验规则                                | [ ValidatePatternRules](https://formilyjs.org/iframe.html?path=/opt/build/repo/packages/antd/README.zh-cn.md#ValidatePatternRules) |
| x-component          | 用于渲染的组件                          | string                                                                                                                             |
| x-component-props    | 组件的属性                              | { [name: string]: any }                                                                                                            |
