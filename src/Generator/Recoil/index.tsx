import { atom, selector } from 'recoil';
import { ISchema } from '../interface';

interface StateProps {
  // 当前选中节点
  selected?: ISchema;
  locationPath?: number[];
  // 模型列表
  schemaData: ISchema[];
}

/**
 * 全局数据
 */
export const generatorState = atom<StateProps>({
  key: 'generatorState',
  default: {
    schemaData: [
      {
        type: 'step',
        name: 'step-1',
        title: '步骤',
        description: '步骤组件',
        children: [
          {
            type: 'textarea',
            name: 'textarea',
            title: '多行输入框',
            description: '多行输入框组件',
            key: 'textarea',
          },
          {
            type: 'string',
            name: 'string',
            title: '输入框',
            description: '输入框组件',
            key: 'string',
          },
        ],
        key: 'step',
      },
      {
        type: 'step',
        name: 'step-2',
        title: '步骤',
        description: '步骤组件',
        children: [
          {
            type: 'array',
            name: 'array',
            title: '列表',
            description: '数组组件',
            children: [
              {
                type: 'string',
                name: 'string',
                title: '输入框',
                description: '输入框组件',
                key: 'string_OH4OVK',
              },
              {
                type: 'time',
                name: 'time',
                title: '时间',
                description: '时间',
                key: 'time_OH4OVK',
              },
            ],
            key: 'array',
          },
          {
            type: 'object',
            name: 'object',
            title: '对象',
            description: '对象组件',
            children: [
              {
                type: 'string',
                name: 'string',
                title: '输入框',
                description: '输入框组件',
                key: 'string_a_h9bC',
              },
              {
                type: 'textarea',
                name: 'textarea',
                title: '多行输入框',
                description: '多行输入框组件',
                key: 'textarea_a_h9bC',
              },
            ],
            key: 'object',
          },
        ],
        key: 'step-2',
      },
    ],
  }, // default value (aka initial value)
});

/**
 * 获取列表
 */
export const schemaState = selector({
  key: 'schemaState',
  get: ({ get }) => {
    const state = get(generatorState);
    return state.schemaData;
  },
});

/**
 * 获取当前选中节点坐标
 */
export const locationPathState = selector({
  key: 'locationPathState',
  get: ({ get }) => {
    const state = get(generatorState);
    return state.locationPath;
  },
});

/**
 * 获取当前选中节点
 */
export const selectedState = selector({
  key: 'selectedState',
  get: ({ get }) => {
    const state = get(generatorState);
    return state.selected;
  },
});

/**
 * 用于查找树中的指定位置的父节点并由 callback 编辑后 返回新的数据
 * @param schemaData
 * @param locationPath
 * @param callback
 */
export const updateSchemaData = (
  schemaData: ISchema[],
  locationPath: number[],
  callback: (lastPath: number, temp: ISchema[]) => void,
) => {
  let data = JSON.parse(JSON.stringify(schemaData));
  let temp: ISchema[] = data;
  locationPath.forEach((path: number, index: number) => {
    if (locationPath.length !== index + 1) {
      temp = temp[path].children as ISchema[];
    }
  });
  callback(locationPath[locationPath.length - 1], temp);
  return data;
};
