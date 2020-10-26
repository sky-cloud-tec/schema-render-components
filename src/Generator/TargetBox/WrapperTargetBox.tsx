import React, { useRef, useState } from 'react';
import { Button, Card, message, Progress, Space } from 'antd';
import { DeleteOutlined, CopyOutlined, DragOutlined } from '@ant-design/icons';
import { useDrag, useDrop } from 'react-dnd';
import { DropResult, ISchema } from '../interface';
import { nanoid } from 'nanoid';
import { useRecoilState, useRecoilValue } from 'recoil';
import { generatorState, selectedState, updateSchemaData } from '../Recoil';

export interface WrapperTargetBoxProps {
  schema?: ISchema;
  locationPath?: number[];
}

const WrapperTargetBox: React.FC<WrapperTargetBoxProps> = ({
  schema,
  children,
  locationPath,
}) => {
  const [, setGeneratorState] = useRecoilState(generatorState);
  const selected = useRecoilValue(selectedState);

  const isSelected = selected?.key === schema?.key;

  // const [position, setPosition] = useState<{
  //   direction: 'inside' | 'up' | 'down';
  //   locationPath?: number[];
  // }>({
  //   direction: 'inside',
  // });

  const boxRef = useRef<any>();

  const [{ isDragging }, dragRef, dragPreview] = useDrag({
    item: { type: 'box', dragItem: schema, move: true, locationPath },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
    end: (dropResult, monitor) => {
      const didDrop = monitor.didDrop();
      if (didDrop) {
        return;
      }
    },
  });

  const [{ canDrop, isOver }, dropRef] = useDrop({
    accept: 'box',
    drop: (dropResult: DropResult, monitor) => {
      // 如果children已经作为了drop target，不处理
      const didDrop = monitor.didDrop();
      if (didDrop) {
        return;
      }
      if (!dropResult.move) {
        incrementEvent(dropResult.dragItem, locationPath!);
      } else {
        moveEvent(dropResult.dragItem, dropResult.locationPath, locationPath!);
      }
      return;
    },
    // hover: (item, monitor) => {
    //   // 只检查被hover的最小元素
    //   const didHover = monitor.isOver({ shallow: true });
    //   if (didHover) {
    //     // Determine rectangle on screen
    //     const hoverBoundingRect =
    //       boxRef.current && boxRef.current.getBoundingClientRect();
    //     // Get vertical middle
    //     const hoverMiddleY =
    //       (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
    //     // Determine mouse position
    //     // const clientOffset = monitor.getClientOffset();
    //     const dragOffset = monitor.getSourceClientOffset();
    //     // Get pixels to the top
    //     const hoverClientY = dragOffset!.y - hoverBoundingRect.top;
    //     // Only perform the move when the mouse has crossed half of the items height
    //     // When dragging downwards, only move when the cursor is below 50%
    //     // When dragging upwards, only move when the cursor is above 50%
    //     // Dragging downwards
    //     if (item.dragItem.key !== schema?.key) {
    //       setPosition({
    //         direction: 'inside',
    //         locationPath,
    //       });
    //       if (hoverClientY <= hoverMiddleY) {
    //         setPosition({
    //           direction: 'up',
    //           locationPath,
    //         });
    //       }
    //       // Dragging upwards
    //       if (hoverClientY > hoverMiddleY) {
    //         setPosition({
    //           direction: 'down',
    //           locationPath,
    //         });
    //       }
    //     }
    //   }
    // },
    collect: monitor => {
      try {
        return {
          isOver: monitor.isOver({ shallow: true }),
          canDrop: monitor.canDrop(),
        };
      } catch (error) {
        return {};
      }
    },
  });

  const handleClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation();
    if (schema?.key && schema?.key !== selected?.key) {
      selectedEvent(schema, locationPath!);
    }
  };

  const incrementEvent = (item: ISchema, path: number[]) => {
    setGeneratorState(prev => {
      const { schemaData } = prev;
      /**
       * step 限制
       * 1. 只能存在于根容器
       * 2. 根容器不能存在其他类型的节点
       * 其他限制
       * 当根容器存在 step 时 其他元素类型不能插入到根容器
       */
      if (item.type === 'step') {
        const flag = schemaData.find(item => item.type !== 'step');
        if (flag) {
          message.warn('路径中存在非步骤容器');
          return prev;
        }
        if (path.length >= 2) {
          message.warn('步骤容器只能插入根容器中');
          return prev;
        }
      } else {
        const flag = schemaData.find(item => item.type === 'step');
        if (flag && path.length < 2) {
          message.warn('步骤容器只能插入根容器中');
          return prev;
        }
      }

      const incrementData = updateSchemaData(
        schemaData,
        path,
        (lastPath, temp) => {
          if (lastPath === -1) {
            temp.push(item);
            path.splice(path.length - 1, 1, temp.length - 1);
          } else {
            temp.splice(lastPath, 0, item);
          }
        },
      );
      return { selected: item, locationPath, schemaData: incrementData };
    });
  };

  const decrementEvent = (path: number[]) => {
    setGeneratorState(prev => {
      const { schemaData } = prev;
      const decrementData = updateSchemaData(
        schemaData,
        path,
        (lastPath, temp) => {
          temp.splice(lastPath, 1);
        },
      );
      return {
        selected: undefined,
        locationPath: undefined,
        schemaData: decrementData,
      };
    });
  };

  const selectedEvent = (item: ISchema, path: number[]) => {
    setGeneratorState(prev => {
      return { ...prev, selected: item, locationPath: path };
    });
  };

  const moveEvent = (
    item: ISchema,
    originLocationPath: number[],
    overLocationPath: number[],
  ) => {
    setGeneratorState(prev => {
      const { schemaData } = prev;

      /**
       * step 限制
       * 1. 只能存在于根容器
       * 2. 根容器不能存在其他类型的节点
       * 其他限制
       * 当根容器存在 step 时 其他元素类型不能插入到根容器
       */
      if (item.type === 'step') {
        const flag = schemaData.find(item => item.type !== 'step');
        if (flag) {
          message.warn('路径中存在非步骤容器');
          return prev;
        }
        if (overLocationPath.length >= 2) {
          message.warn('步骤容器只能插入根容器中');
          return prev;
        }
      } else {
        const flag = schemaData.find(item => item.type === 'step');
        if (flag && overLocationPath.length < 2) {
          message.warn('步骤容器只能插入根容器中');
          return prev;
        }
      }

      /**
       * 删除位移前的元素
       */
      const replaceDate = updateSchemaData(
        schemaData,
        originLocationPath,
        (lastPath, temp) => {
          temp.splice(lastPath, 1);
        },
      );

      /**
       * 计算删除后的新的坐标
       */
      const newOverIndex = overLocationPath.map(
        (path: number, index: number) => {
          if (
            originLocationPath[index] !== undefined &&
            originLocationPath.length === index + 1 &&
            path > originLocationPath[index]
          ) {
            return path - 1;
          }
          return path;
        },
      );

      /**
       * 将元素插入新的坐标
       */
      const insertData = updateSchemaData(
        replaceDate,
        newOverIndex,
        (lastPath, temp) => {
          if (lastPath === -1) {
            temp.push(item);
          } else {
            console.log(newOverIndex, temp);
            temp.splice(lastPath, 0, item);
          }
        },
      );
      return { ...prev, schemaData: insertData };
    });
  };

  // const handleMoveUpItem = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
  //   e.stopPropagation();
  // };

  // const handleMoveDownItem = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
  //   e.stopPropagation();
  // };

  const handelCopyItem = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation();
    const key = `${schema?.type}_${nanoid(6)}`;
    let newLocationPath = JSON.parse(JSON.stringify(locationPath));
    let lastPath = newLocationPath[newLocationPath.length - 1];
    newLocationPath[newLocationPath.length - 1] = lastPath + 1;
    incrementEvent(
      {
        ...schema!,
        name: key,
        key,
      },
      newLocationPath!,
    );
  };

  const handleDeleteItem = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation();
    if (locationPath) {
      decrementEvent(locationPath);
    }
  };

  dragPreview(dropRef(boxRef));

  // 是否为根容器
  const style: React.CSSProperties =
    locationPath &&
    (locationPath[0] === -1 || locationPath[locationPath.length - 1] === -1)
      ? {
          overflowY: locationPath.length === 1 ? 'scroll' : 'hidden',
          height: '100%',
          borderBottom:
            canDrop && isOver ? '2px solid #1890ff' : '1px solid transparent',
        }
      : {
          opacity: isDragging ? 0.5 : 1,
          margin: 10,
          borderTop:
            canDrop && isOver ? '2px solid #1890ff' : '1px solid transparent',
        };

  return (
    <div
      ref={boxRef}
      style={{
        position: 'relative',
        ...style,
      }}
      onClick={handleClick}
    >
      {schema?.type && isSelected && (
        <Space style={{ position: 'absolute', right: 0, top: 0, zIndex: 1 }}>
          <Button size="small" type="link" ref={dragRef}>
            <DragOutlined />
          </Button>
          {/* <Button size="small" type="link" onClick={handleMoveUpItem}>
            <VerticalAlignTopOutlined />
          </Button>
          <Button size="small" type="link" onClick={handleMoveDownItem}>
            <VerticalAlignBottomOutlined />
          </Button> */}
          <Button size="small" type="link" onClick={handelCopyItem}>
            <CopyOutlined />
          </Button>
          <Button size="small" type="link" danger onClick={handleDeleteItem}>
            <DeleteOutlined />
          </Button>
        </Space>
      )}
      {children}
    </div>
  );
};

export default WrapperTargetBox;
