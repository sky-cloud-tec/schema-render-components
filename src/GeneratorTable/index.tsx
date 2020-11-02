import React from 'react';
import { ISchema } from '@/GeneratorEditor/interface';
import { Empty } from 'antd';
import ProTable, { ProTableProps } from '@ant-design/pro-table';

interface GeneratorTableProps extends Omit<ProTableProps<any, any>, 'columns'> {
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

const GeneratorTable: React.FC<GeneratorTableProps> = ({
  schema,
  ...props
}) => {
  if (schema.length > 0) {
    const columns: any = getColumns(schema).flat(Infinity);

    return (
      <ProTable
        bordered
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
        {...props}
        columns={columns}
      />
    );
  }
  return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
};

export default GeneratorTable;
