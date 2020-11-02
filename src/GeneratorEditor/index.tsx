import { ISchema } from '@formily/antd';
import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { RecoilRoot } from 'recoil';
import WrapperGeneratorEditor from './WrapperGeneratorEditor';

export interface GeneratorProps {
  defaultSchema?: ISchema[];
  onSave?: (values: ISchema[]) => void;
  onExport?: (values: ISchema[]) => void;
}

const GeneratorEditor: React.FC<GeneratorProps> = props => {
  return (
    <DndProvider backend={HTML5Backend}>
      <RecoilRoot>
        <WrapperGeneratorEditor {...props} />
      </RecoilRoot>
    </DndProvider>
  );
};

export default GeneratorEditor;
