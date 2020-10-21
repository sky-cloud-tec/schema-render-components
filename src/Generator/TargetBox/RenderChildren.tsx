import React from 'react';
import TargetBox, { TargetBoxProps } from './index';

const RenderChildren: React.FC<TargetBoxProps> = props => {
  return <TargetBox {...props} />;
};

export default RenderChildren;
