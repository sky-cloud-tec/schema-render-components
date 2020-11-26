---
title: Table 表格
sidemenu: false
nav: { title: Table 表格, order: 3 }
---

TableRender 的诞生是为了解决项目中需要写很多 table 的样板代码的问题。

## 代码演示

```tsx
import React from 'react';
import { Button, Layout, Space, Tabs, Steps } from 'antd';
import { TableRender } from 'schema-render-components';

export default () => (
  <TableRender
    request={params =>
      Promise.resolve({
        data: [
          {
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
          },
        ],
        success: true,
      })
    }
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
);
```

## API

TableRender 在 ProTable 上进行了一层封装，支持了一些预设，并且封装了一些行为。这里只列出与 ProTable 不同的 api。

### TableRender

| 参数        | 说明                               | 类型                                 | 默认值 |
| ----------- | ---------------------------------- | ------------------------------------ | ------ |
| schema      | 通过 schema 渲染表单               | <a href="/#ischema-属性">ISchema</a> | -      |
| ~~columns~~ | 通过 schema 自动生成，不支持自定义 | -                                    | -      |
