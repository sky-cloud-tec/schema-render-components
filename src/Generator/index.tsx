import { ISchema } from '@formily/antd';
import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { RecoilRoot } from 'recoil';
import WrapperGenerator from './WrapperGenerator';

export interface GeneratorProps {
  defaultSchema?: ISchema[];
  onSave?: (values: ISchema[]) => void;
  onExport?: (values: ISchema[]) => void;
}

const Generator: React.FC<GeneratorProps> = props => {
  return (
    <DndProvider backend={HTML5Backend}>
      <RecoilRoot>
        <WrapperGenerator {...props} />
      </RecoilRoot>
    </DndProvider>
  );
};

export default Generator;
