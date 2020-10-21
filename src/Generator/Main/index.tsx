import React, { useMemo, useReducer, useRef, useState } from 'react';
import { Button, Layout, Space, Tabs } from 'antd';
import SourceBox from '../SourceBox';
import TargetBox from '../TargetBox';
import SettingBox from '../SettingBox';
import './global.less';
import styles from './index.less';
import { useRecoilValue } from 'recoil';
import { schemaState, selectedState } from '../Recoil';
import TableGenerator from '@/Table';
import { Form } from '@formily/antd';
import GeneratorForm from '@/GeneratorForm';

interface MainProps {}
const Main: React.FC<MainProps> = () => {
  const schema = useRecoilValue(schemaState);
  const selected = useRecoilValue(selectedState);
  const [activeKey, setActiveKey] = useState('edit');
  return (
    <Layout className={styles.Main} id="generator">
      <SourceBox />
      <Layout.Content>
        <Tabs
          size="small"
          className={styles.MainTabs}
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
              <Button size="small" danger>
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
            <TableGenerator schema={schema} />
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

export default Main;
