import React from 'react';
import { WrapperTargetBoxProps } from './WrapperTargetBox';
import RenderChildren from './RenderChildren';
import { FormItem } from '@formily/antd';
import components from '@/GeneratorForm/components';
import { Card } from 'antd';
import { ISchema } from '../interface';

export const RenderField: React.FC<ISchema> = ({
  name,
  type,
  title,
  description,
  ...props
}) => {
  const itemProps: any = {
    name,
    label: title,
    options: props.enum || [],
    dataSource: props.enum || [],
    descriptions: description,
    component: components[type || 'string'],
    size: 'small',
  };
  return <FormItem {...itemProps} data-props={props} />;
};

const WrapperRenderField: React.FC<WrapperTargetBoxProps> = ({
  schema,
  locationPath,
}) => {
  const isWrapper = ['object', 'array', 'step'].includes(
    schema?.type as string,
  );
  return (
    <Card title={isWrapper && schema?.title} size="small">
      {isWrapper ? (
        <div style={{ background: 'rgba(240, 242, 245)' }}>
          <RenderChildren
            key={schema?.key}
            schema={schema?.children || []}
            locationPath={locationPath}
          />
        </div>
      ) : (
        <RenderField {...schema} />
      )}
    </Card>
  );
};

export default WrapperRenderField;
