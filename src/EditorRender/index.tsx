import { ISchema } from '@formily/antd';
import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { RecoilRoot } from 'recoil';
import WrapperEditorRender from './WrapperEditorRender';

export interface GeneratorProps {
  defaultSchema?: ISchema[];
  onSave?: (values: ISchema[]) => void;
  onExport?: (values: ISchema[]) => void;
  style?: React.CSSProperties;
}

const EditorRender: React.FC<GeneratorProps> = props => {
  return (
    <DndProvider backend={HTML5Backend}>
      <RecoilRoot>
        <WrapperEditorRender {...props} />
      </RecoilRoot>
    </DndProvider>
  );
};

export default EditorRender;
