import ErrorBoundary from 'antd/lib/alert/ErrorBoundary';
import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { RecoilRoot } from 'recoil';
import Main from './Main';

interface GeneratorProps {}

const Generator: React.FC<GeneratorProps> = props => {
  return (
    <DndProvider backend={HTML5Backend}>
      <RecoilRoot>
        <Main {...props} />
      </RecoilRoot>
    </DndProvider>
  );
};

export default Generator;
