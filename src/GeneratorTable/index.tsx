import React from 'react';
import { ISchema } from '@/Generator/interface';
import { Empty, Form } from 'antd';
import { RenderField } from '@/Generator/TargetBox/RenderField';
import ProTable, { ProColumns } from '@ant-design/pro-table';

interface GeneratorTableProps {
  schema: ISchema[];
}

const GeneratorTable: React.FC<GeneratorTableProps> = ({ schema }) => {
  if (schema.length > 0) {
    const columns: any = schema.map(filed => {
      return {
        dataIndex: filed.name,
        ...filed,
      };
    });
    return (
      <ProTable
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
