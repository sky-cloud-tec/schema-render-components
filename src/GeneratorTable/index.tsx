import React from 'react';
import { ISchema } from '@/Generator/interface';
import { Empty, Form } from 'antd';
import { RenderField } from '@/Generator/TargetBox/RenderField';
import ProTable, { ProColumns } from '@ant-design/pro-table';

interface GeneratorTableProps {
  schema: ISchema[];
}

const getColumns: (
  fields: ISchema[],
  parentPath?: (string | number | undefined)[],
) => any[] = (fields = [], parentPath = []) => {
  return fields.map(field => {
    if (field.type === 'array') {
      return {
        ...field,
        dataIndex: parentPath.concat([field.name]),
        align: 'center',
        children: undefined,
        render: (record: any) => {
          return (
            <ProTable
              columns={getColumns(field.children || []).flat(Infinity)}
              size="small"
              search={false}
              options={false}
              pagination={false}
              request={() =>
                Promise.resolve({
                  data: record,
                  success: true,
                })
              }
            />
          );
        },
      };
    }
    if (field.type === 'object' && field.children) {
      return {
        ...field,
        dataIndex: parentPath.concat([field.name]),
        children: getColumns(field.children, parentPath.concat([field.name])),
      };
    }
    if (field.type === 'step' && field.children) {
      return getColumns(field.children);
    }
    return {
      ...field,
      align: 'center',
      dataIndex: parentPath.concat([field.name]),
    };
  });
};

const GeneratorTable: React.FC<GeneratorTableProps> = ({ schema }) => {
  if (schema.length > 0) {
    const columns: any = getColumns(schema).flat(Infinity);
    console.log(columns);
    return (
      <ProTable
        bordered
        size="small"
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
        tableStyle={{
          whiteSpace: 'nowrap',
        }}
        scroll={{
          x: true,
        }}
        search={{
          optionRender: ({ searchText, resetText }, { form }) => {
            return [
              <a
                key="searchText"
                onClick={() => {
                  form?.submit();
                }}
              >
                {searchText}
              </a>,
              <a
                key="resetText"
                onClick={() => {
                  form?.resetFields();
                }}
              >
                {resetText}
              </a>,
              // <a key="out">导出</a>,
            ];
          },
        }}
        columns={columns}
      />
    );
  }
  return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
};

export default GeneratorTable;
