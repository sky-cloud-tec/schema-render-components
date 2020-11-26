import React from 'react';
import WrapperTargetBox from './WrapperTargetBox';
import WrapperRenderField from './RenderField';
import styles from './index.less';

import { ISchema } from '../interface';

export interface TargetBoxProps {
  schema: ISchema[];
  // 记录对象的索引位置 为 undefined 时为根路径 为 -1 时为指向当前路径否则为 children 下的子元素位置
  locationPath?: number[];
}

const TargetBox: React.FC<TargetBoxProps> = ({ locationPath, schema = [] }) => {
  return (
    <WrapperTargetBox locationPath={[...(locationPath || []), -1]}>
      {schema && schema.length > 0 ? (
        schema.map((item, index) => {
          return (
            <WrapperTargetBox
              key={index}
              schema={item}
              locationPath={[...(locationPath || []), index]}
            >
              <WrapperRenderField
                schema={item}
                locationPath={[...(locationPath || []), index]}
              />
            </WrapperTargetBox>
          );
        })
      ) : (
        <div className={styles.WrapperEmpty}>请拖拽左侧栏的组件进行添加</div>
      )}
    </WrapperTargetBox>
  );
};

export default TargetBox;
