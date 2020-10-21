import React, { useEffect, useMemo, useState } from 'react';
import { Layout, Button } from 'antd';
import styles from './index.less';
import { useRecoilState, useRecoilValue } from 'recoil';
import { generatorState, selectedState, updateSchemaData } from '../Recoil';
import {
  createFormActions,
  FormEffectHooks,
  SchemaForm,
  SchemaMarkupField as Field,
} from '@formily/antd';
import components from '@/GeneratorForm/components';
import { FormBlock, FormLayout } from '@formily/antd-components';
import { FormOutlined } from '@ant-design/icons';
import { ISchema } from '../interface';

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
  const [, setGeneratorState] = useRecoilState(generatorState);
  const selected = useRecoilValue(selectedState);

  return (
    <Layout.Sider
      width={280}
      className={styles.SettingBox}
      theme="light"
      collapsedWidth="0"
      collapsed={collapsed ? !selected : true}
      key={selected?.key}
    >
      {useMemo(
        () =>
          selected && (
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
              onChange={(values: ISchema) => {
                actions.validate().then(() => {
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
              <Field title="字段名称" name="name" type="string" required />
              <Field title="标题" name="title" type="string" required />
              <Field title="描述" name="description" type="string" />
              <Field
                title="候选值"
                name="enum"
                type="array"
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
              <Field title="默认值" name="default" type={selected?.type} />
              <FormBlock title="校验" size="small">
                <FormLayout inline>
                  <Field title="必填" name="required" type="boolean" />
                  <Field title="正则" name="pattern" type="string" />
                </FormLayout>
              </FormBlock>
              <FormBlock title="隐藏" size="small">
                <FormLayout inline>
                  <Field title="搜索" name="hideInSearch" type="boolean" />
                  <Field title="列表" name="hideInTable" type="boolean" />
                  <Field title="表单" name="hideInForm" type="boolean" />
                  <Field
                    title="详情"
                    name="hideInDescriptions"
                    type="boolean"
                  />
                </FormLayout>
              </FormBlock>
              <FormBlock title="列表功能增强" size="small">
                <FormLayout inline>
                  <Field title="缩略" name="ellipsis" type="boolean" />
                  <Field title="复制" name="copyable" type="boolean" />
                </FormLayout>
              </FormBlock>
            </SchemaForm>
          ),
        [selected?.key],
      )}
    </Layout.Sider>
  );
};
export default SettingBox;
