import React from 'react';
import { useDrag, DragSourceMonitor } from 'react-dnd';
import { nanoid } from 'nanoid';
import { ISchema } from '../interface';
import styles from './index.less';

const SourceBoxContainer: React.FC<ISchema> = props => {
  const key = `${props.type}_${nanoid(6)}`;
  const [{ isDragging }, dragRef] = useDrag({
    item: {
      type: 'box',
      dragItem: {
        ...props,
        name: key,
        key,
      },
    },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        // alert(`You dropped into ${dropResult.name}!`);
      }
    },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <span ref={dragRef} className={styles.SourceBoxContainer}>
      {props.title}
    </span>
  );
};

export default SourceBoxContainer;
