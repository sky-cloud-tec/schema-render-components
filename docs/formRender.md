---
title: 表单/详情
sidemenu: false
nav: { title: 表单/详情, order: 2 }
---

## 代码演示

```tsx
import React, { useState } from 'react';
import { Switch, Button, Layout, Space, Tabs, Steps } from 'antd';
import { FormRender } from 'schema-render-components';

export default () => {
  const [editable, setEditable] = useState(true);
  return (
    <>
      模式预览:{' '}
      <Switch
        checkedChildren="表单"
        unCheckedChildren="详情"
        onChange={setEditable}
        defaultChecked
      />
      <br />
      <br />
      <FormRender
        key={`${editable}`}
        editable={editable}
        initialValues={{
          array: [
            {
              string: 'Array.0',
              time: '12:00:00',
            },
            {
              string: 'Array.1',
              time: '12:00:00',
            },
          ],
          object: {
            string: 'Object.string',
            textarea: 'Object.textarea',
          },
          string: 'string',
          textarea: 'textarea',
        }}
        schema={[
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
    </>
  );
};
```

## API

| 参数               | 说明                                                                                                          | 类型                                                                                                                                                 | 默认值 |
| ------------------ | ------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| schema             | 通过 schema 渲染表单                                                                                          | <a href="/generator-editor#ischema-属性">ISchema</a>                                                                                                 | []     |
| submitProps        | 提交按钮的 props                                                                                              | React.ReactNode                                                                                                                                      | -      |
| resetProps         | 重置按钮的 props                                                                                              | React.ReactNode                                                                                                                                      | -      |
| stepPrevButton     | 上一步按钮                                                                                                    | React.ReactElement                                                                                                                                   | -      |
| stepNextButton     | 下一步按钮                                                                                                    | React.ReactElement                                                                                                                                   | -      |
| formComponent      | 全局注册 Form 渲染组件                                                                                        | string `or` React.ReactElement                                                                                                                       | -      |
| formItemComponent  | 全局注册 FormItem 渲染组件                                                                                    | React.ReactElement                                                                                                                                   | -      |
| labelCol           | label 布局控制                                                                                                | number `or` { span: number; offset?: number } `or`[object](https://ant.design/components/grid/#Col)                                                  | -      |
| wrapperCol         | FormItem 布局控制                                                                                             | number `or` { span: number; offset?: number } `or`[object](https://ant.design/components/grid/#Col)                                                  | -      |
| previewPlaceholder | 详情页的文本态占位符                                                                                          | string `or` ((props: [IPreviewTextProps](#api)) => string)                                                                                           | -      |
| prefix             | 样式前缀                                                                                                      | string                                                                                                                                               | -      |
| inline             | 是否为内联表单                                                                                                | boolean                                                                                                                                              | -      |
| size               | 单个 Item 的 size 自定义，优先级高于 Form 的 size, 并且当组件与 Item 一起使用时，组件自身设置 size 属性无效。 | 'large' `or` 'medium' `or` 'small'                                                                                                                   | -      |
| labelAlign         | 标签的位置                                                                                                    | 'left' `or` 'right'                                                                                                                                  | -      |
| className          | 扩展 class                                                                                                    | string                                                                                                                                               | -      |
| style              | 自定义内联样式                                                                                                | React.CSSProperties                                                                                                                                  | -      |
| component          | 设置标签类型                                                                                                  | string `or` (() => void)                                                                                                                             | -      |
| value              | 全局 value                                                                                                    | {}                                                                                                                                                   | -      |
| defaultValue       | 全局 defaultValue                                                                                             | {}                                                                                                                                                   | -      |
| initialValues      | 全局 initialValues                                                                                            | {}                                                                                                                                                   | -      |
| actions            | FormActions 实例                                                                                              | [FormActions](#api)                                                                                                                                  | -      |
| effects            | IFormEffect 实例                                                                                              | IFormEffect<FormEffectPayload, [FormActions](#api)>                                                                                                  | -      |
| form               | 表单实例                                                                                                      | [ IForm](#api)                                                                                                                                       | -      |
| onChange           | 表单变化回调                                                                                                  | (values: {}) => void                                                                                                                                 | -      |
| onSubmit           | form 内有 `htmlType="submit"` 或 actions.submit 时 触发                                                       | (values: {}) => void `or` Promise<{}>                                                                                                                | -      |
| onReset            | form 内有或 actions.reset 时 触发                                                                             | () => void                                                                                                                                           | -      |
| onValidateFailed   | 校验失败时触发                                                                                                | (valideted: [IFormValidateResult](https://formilyjs.org/iframe.html?path=/opt/build/repo/packages/antd/README.zh-cn.md#IFormValidateResult)) => void | -      |
| children           | 全局 value                                                                                                    | React.ReactElement `or` ((form: [IForm](#api)) => React.ReactElement)                                                                                | -      |
| useDirty           | 是否使用脏检查，默认会走 immer 精确更新                                                                       | boolean                                                                                                                                              | -      |
| editable           | 是否可编辑                                                                                                    | boolean `or` ((name: string) => boolean)                                                                                                             | -      |
| validateFirst      | 是否走悲观校验，遇到第一个校验失败就停止后续校验                                                              | boolean                                                                                                                                              | -      |
