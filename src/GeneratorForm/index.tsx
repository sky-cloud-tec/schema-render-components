import React from 'react';
import {
  SchemaForm,
  SchemaMarkupField as Field,
  FormButtonGroup,
  Submit,
  Reset,
} from '@formily/antd';
import components from './components';
import { ISchema } from '@/Generator/interface';
import {
  IAntdSchemaFormProps,
  IResetProps,
  ISubmitProps,
} from '@formily/antd-components/esm/types';
import { Button, Card } from 'antd';
import { FormOutlined } from '@ant-design/icons';

interface GeneratorFormProps extends Omit<IAntdSchemaFormProps, 'schema'> {
  schema: ISchema[];
  submitProps?: ISubmitProps & {
    children: React.ReactNode;
  };
  resetProps?: IResetProps & {
    children: React.ReactNode;
  };
}

const RenderField = (fields: ISchema[] = []) => {
  return fields.map(field => {
    if (field.type === 'array') {
      return (
        <Field
          {...field}
          x-component-props={{
            size: 'small',
            renderAddition: () => (
              <Button type="link" size="small">
                <FormOutlined /> 添加
              </Button>
            ),
            renderEmpty: () => (
              <Button
                style={{
                  marginTop: -10,
                }}
                type="link"
                size="small"
              >
                <FormOutlined /> 添加
              </Button>
            ),
          }}
        >
          <Field type="object">{RenderField(field.children)}</Field>
        </Field>
      );
    }
    if (field.type === 'object') {
      return <Field {...field}>{RenderField(field.children)}</Field>;
    }
    return <Field {...field} />;
  });
};

const GeneratorForm: React.FC<GeneratorFormProps> = ({
  schema,
  submitProps,
  resetProps,
  ...props
}) => {
  if (!schema) return null;
  return (
    <Card size="small">
      <SchemaForm layout="vertical" components={components} {...props}>
        {RenderField(schema)}
        {props.editable !== false && (
          <FormButtonGroup
            style={{
              justifyContent: 'center',
            }}
            align="center"
          >
            <Submit {...submitProps}>{resetProps?.children || 'Submit'}</Submit>
            <Reset {...resetProps}>{resetProps?.children || 'Reset'}</Reset>
          </FormButtonGroup>
        )}
      </SchemaForm>
    </Card>
  );
};

export default GeneratorForm;
