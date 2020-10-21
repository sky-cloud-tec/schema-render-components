import React from 'react';
import { Schema } from '@/Generator/interface';
import ProDescriptions, {
  ProDescriptionsProps,
} from '@ant-design/pro-descriptions';

interface DescriptionsGeneratorProps
  extends Omit<ProDescriptionsProps, 'columns'> {
  fileds: Schema[];
}

const getColumns = (fileds?: Schema[], parentDataIndex?: string[]) => {
  return fileds?.map((filed: Schema) => {
    const key = filed.key as string;
    const dataIndex = parentDataIndex ? [...parentDataIndex, key] : [key];
    let column: any = {
      dataIndex,
      ...filed,
    };
    if (filed.valueType === 'object') {
      column.children = undefined;
      column.render = (_, row) => {
        return (
          <ProDescriptions
            key={column.key}
            title={column.title}
            tooltip={column.tip}
            columns={getColumns(row.children, dataIndex)}
          />
        );
      };
    }
    return column;
  });
};

const DescriptionsGenerator: React.FC<DescriptionsGeneratorProps> = ({
  fileds,
  ...props
}) => {
  const isSteps = fileds.find(filed => filed.valueType === 'step');
  if (isSteps) {
    return (
      <>
        {fileds.map(filed => (
          <ProDescriptions
            {...props}
            key={filed.key}
            title={filed.title}
            tooltip={filed.tip}
            columns={getColumns(filed.children)}
          />
        ))}
      </>
    );
  }

  return <ProDescriptions {...props} columns={getColumns(fileds)} />;
};
export default DescriptionsGenerator;
