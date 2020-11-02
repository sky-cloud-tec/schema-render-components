import React from 'react';
import { Divider, Layout, Typography } from 'antd';
import WrapperSourceBox from './WrapperSourceBox';
import BasicComponents from './BasicComponents';

import styles from './index.less';

const SourceBox: React.FC<{}> = () => {
  return (
    <Layout.Sider
      width={280}
      collapsedWidth={120}
      className={styles.SourceBox}
      theme="light"
      collapsible
    >
      {BasicComponents.map(({ title, group }, index) => (
        <div key={index}>
          <Divider plain>
            <Typography.Text type="secondary">{title}</Typography.Text>
          </Divider>
          <div className={styles.BasicComponentsContainer}>
            {group.map((item, i) => (
              <WrapperSourceBox key={`${index}-${i}`} {...item} />
            ))}
          </div>
        </div>
      ))}
    </Layout.Sider>
  );
};

export default SourceBox;
