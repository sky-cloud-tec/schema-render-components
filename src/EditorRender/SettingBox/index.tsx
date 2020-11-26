import React from 'react';
import { Layout, Button } from 'antd';
import styles from './index.less';
import { useRecoilState } from 'recoil';
import { generatorState, updateSchemaData } from '../Recoil';
import {
  createFormActions,
  FormEffectHooks,
  SchemaForm,
  SchemaMarkupField as Field,
} from '@formily/antd';
import components from '../../FormRender/components';
import { FormBlock, FormLayout } from '@formily/antd-components';
import { FormOutlined } from '@ant-design/icons';

interface SettingBoxProps {
  collapsed: boolean;
}

const actions = createFormActions();

const { onFieldValueChange$ } = FormEffectHooks;

const useCyclicLinkageEffects = () => {
  const { setFieldState, getFieldState } = actions;
  onFieldValueChange$('enum').subscribe(({ value }: { value?: [] }) => {
    if (!value || value.length <= 0) return;
    setFieldState('default', () => {
      const props = getFieldState('default', state => state.props);
      props.enum = value;
    });
  });
};

const SettingBox: React.FC<SettingBoxProps> = ({ collapsed }) => {
  const [GeneratorState, setGeneratorState] = useRecoilState(generatorState);
  const { schemaData, selected, locationPath } = GeneratorState;
  // const selected = useRecoilValue(selectedState);
  // const selected = useRecoilValue(selectedState);

  return (
    <Layout.Sider
      width={280}
      className={styles.SettingBox}
      theme="light"
      collapsedWidth="0"
      collapsed={collapsed ? !selected : true}
      key={selected?.key}
    >
      {selected && (
        <SchemaForm
          title="模型设置"
          style={{
            padding: 12,
          }}
          layout="vertical"
          size="small"
          actions={actions}
          components={components}
          effects={() => {
            useCyclicLinkageEffects();
          }}
          initialValues={selected}
          onChange={(values: any) => {
            actions.validate().then(msg => {
              setGeneratorState(prev => {
                const { schemaData, locationPath } = prev;
                if (locationPath) {
                  const modifySchemaData = updateSchemaData(
                    schemaData,
                    locationPath,
                    (lastPath, temp) => {
                      temp[lastPath] = {
                        ...temp[lastPath],
                        ...JSON.parse(JSON.stringify(values)),
                      };
                    },
                  );
                  return { ...prev, schemaData: modifySchemaData };
                }
                return prev;
              });
            });
          }}
        >
          <>
            <Field
              title="字段名称"
              name="name"
              type="string"
              x-rules={[
                {
                  required: true,
                  pattern: /^[A-Za-z0-9_\-]+$/gi,
                  message: '字段名字只能由 大小写字母、数组、下划线 组成！',
                },
                {
                  validator(value) {
                    let validator: any = true;
                    updateSchemaData(
                      schemaData,
                      locationPath!,
                      (lastPath, temp) => {
                        const flag = temp?.find((item, index) => {
                          return item.name == value && index !== lastPath;
                        });
                        if (!!flag) {
                          validator = {
                            type: 'error',
                            message: '字段名称已存在！',
                          };
                        }
                      },
                    );
                    return validator;
                  },
                },
              ]}
            />
            <Field title="标题" name="title" type="string" required />
            <Field title="描述" name="description" type="string" />
            {!['object', 'array', 'step'].includes(selected.type as string) && (
              <>
                <Field
                  title="候选值"
                  name="enum"
                  type="array"
                  visible={['select', 'checkbox', 'radio', 'transfer'].includes(
                    selected.type as string,
                  )}
                  x-component-props={{
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
                  <Field type="object">
                    <Field title="标题" name="label" type="string" required />
                    <Field title="值" name="value" type="string" required />
                  </Field>
                </Field>
                {selected?.type && (
                  <Field title="默认值" name="default" type={selected?.type} />
                )}
                <FormBlock title="校验" size="small">
                  <FormLayout inline>
                    <Field title="必填" name="required" type="boolean" />
                    <Field title="正则" name="pattern" type="string" />
                  </FormLayout>
                </FormBlock>
                <FormBlock title="表格设置" size="small">
                  <FormLayout inline>
                    <Field
                      title="隐藏搜索"
                      name="hideInSearch"
                      type="boolean"
                    />
                    <Field title="隐藏列表" name="hideInTable" type="boolean" />
                    <Field title="缩略" name="ellipsis" type="boolean" />
                    <Field title="复制" name="copyable" type="boolean" />
                  </FormLayout>
                </FormBlock>
              </>
            )}
          </>
        </SchemaForm>
      )}
    </Layout.Sider>
  );
};
export default SettingBox;
