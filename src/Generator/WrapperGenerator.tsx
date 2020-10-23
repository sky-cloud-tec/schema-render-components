import React, { useEffect, useMemo, useReducer, useRef, useState } from 'react';
import { Button, Layout, Space, Tabs } from 'antd';
import SourceBox from './SourceBox';
import TargetBox from './TargetBox';
import SettingBox from './SettingBox';
import {
  useRecoilCallback,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil';
import { generatorState, schemaState, selectedState } from './Recoil';
import GeneratorTable from '@/GeneratorTable';
import { Form } from '@formily/antd';
import GeneratorForm from '@/GeneratorForm';
import { GeneratorProps } from '.';

import './global.less';
import styles from './index.less';

const WrapperGenerator: React.FC<GeneratorProps> = ({ defaultSchema }) => {
  const setGeneratorState = useSetRecoilState(generatorState);
  useEffect(() => {
    if (defaultSchema) {
      setGeneratorState({ schemaData: defaultSchema });
    }
  }, [defaultSchema]);

  const schema = useRecoilValue(schemaState);
  const selected = useRecoilValue(selectedState);
  const [activeKey, setActiveKey] = useState('edit');

  return (
    <Layout className={styles.WrapperGenerator} id="generator">
      <SourceBox />
      <Layout.Content>
        <Tabs
          size="small"
          className={styles.WrapperGeneratorTabs}
          style={{
            borderRightWidth: activeKey === 'edit' && selected ? 1 : 0,
          }}
          tabBarStyle={{
            padding: '0 12px',
            background: '#fff',
            marginBottom: 0,
          }}
          activeKey={activeKey}
          onChange={setActiveKey}
          tabBarExtraContent={
            <Space>
              <Button size="small">导出</Button>
              <Button
                size="small"
                onClick={() => {
                  setGeneratorState({
                    schemaData: [],
                  });
                }}
                danger
              >
                重置
              </Button>
              <Button size="small" type="primary">
                保存
              </Button>
            </Space>
          }
        >
          <Tabs.TabPane tab="编辑" key="edit">
            <Form style={{ height: '100%' }}>
              <TargetBox schema={schema} />
            </Form>
          </Tabs.TabPane>
          <Tabs.TabPane tab="表格预览" key="table">
            <GeneratorTable schema={schema} />
          </Tabs.TabPane>
          <Tabs.TabPane tab="表单预览" key="form">
            <GeneratorForm schema={schema} />
          </Tabs.TabPane>
          <Tabs.TabPane tab="详情预览" key="description">
            <GeneratorForm schema={schema} editable={false} />
          </Tabs.TabPane>
        </Tabs>
      </Layout.Content>
      <SettingBox collapsed={activeKey === 'edit'} />
    </Layout>
  );
};

export default WrapperGenerator;
