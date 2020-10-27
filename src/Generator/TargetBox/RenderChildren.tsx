import React from 'react';
import TargetBox, { TargetBoxProps } from './';

const RenderChildren: React.FC<TargetBoxProps> = props => {
  return <TargetBox {...props} />;
};

export default RenderChildren;
