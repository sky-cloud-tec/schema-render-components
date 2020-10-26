import React, { useState } from 'react';
import {
  SchemaForm,
  SchemaMarkupField as Field,
  FormButtonGroup,
  Submit,
  Reset,
  createFormActions,
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
import { FormCard, FormLayout, FormStep } from '@formily/antd-components';

interface GeneratorFormProps extends Omit<IAntdSchemaFormProps, 'schema'> {
  schema: ISchema[];
  submitProps?: ISubmitProps & {
    children: React.ReactNode;
  };
  resetProps?: IResetProps & {
    children: React.ReactNode;
  };
  stepPrevButton?: React.ReactElement;
  stepNextButton?: React.ReactElement;
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
    if (field.type === 'step') {
      return (
        <FormCard
          size="small"
          bordered={false}
          name={field.name as string}
          key={field.key}
        >
          {RenderField(field.children)}
        </FormCard>
      );
    }
    return <Field {...field} />;
  });
};
const actions = createFormActions();
const GeneratorForm: React.FC<GeneratorFormProps> = ({
  schema,
  submitProps,
  resetProps,
  stepPrevButton,
  stepNextButton,
  ...props
}) => {
  if (!schema) return null;
  const isStep = schema.find(field => field.type === 'step');
  const [current, setCurrent] = useState<number>(0);
  return (
    <Card
      style={{
        height: '100%',
        overflowY: 'scroll',
      }}
      size="small"
    >
      <SchemaForm
        size="small"
        labelCol={7}
        wrapperCol={12}
        components={components}
        actions={actions}
        {...props}
      >
        {!!isStep && props.editable !== false && (
          <FormStep
            dataSource={schema.map(item => ({
              title: item.title as string,
              name: item.name as string,
            }))}
          />
        )}
        {RenderField(schema)}
        {props.editable !== false && (
          <FormButtonGroup
            style={{
              justifyContent: 'center',
            }}
            align="center"
          >
            {!!isStep ? (
              <>
                {current > 0 &&
                  React.cloneElement(
                    stepPrevButton || <Button>上一步</Button>,
                    {
                      onClick: () => {
                        if (actions.dispatch) {
                          actions.dispatch('onFormStepPrevious', undefined);
                          setCurrent(current - 1);
                        }
                      },
                    },
                  )}
                {current < schema.length - 1 ? (
                  React.cloneElement(
                    stepNextButton || <Button type="primary">下一步</Button>,
                    {
                      onClick: () => {
                        actions.validate().then(() => {
                          actions.dispatch!('onFormStepNext', undefined);
                          setCurrent(current + 1);
                        });
                      },
                    },
                  )
                ) : (
                  <Submit
                    onSubmit={values => console.log(values)}
                    {...submitProps}
                  >
                    {resetProps?.children || 'Submit'}
                  </Submit>
                )}
              </>
            ) : (
              <>
                <Submit
                  onSubmit={values => console.log(values)}
                  {...submitProps}
                >
                  {resetProps?.children || 'Submit'}
                </Submit>
                <Reset {...resetProps}>{resetProps?.children || 'Reset'}</Reset>
              </>
            )}
          </FormButtonGroup>
        )}
      </SchemaForm>
    </Card>
  );
};

export default GeneratorForm;
