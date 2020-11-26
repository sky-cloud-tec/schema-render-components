/*
 * @Description: your description
 * @Module: module.name
 * @Author: Draco
 * @Email: Draco.coder@gmail.com
 * @Github: https://github.com/draco-china
 * @Date: 2020-09-21 10:59:58
 * @LastEditTime: 2020-10-19 11:44:00
 */

import { IMarkupSchemaFieldProps } from '@formily/antd/esm/types';

export interface ISchema extends IMarkupSchemaFieldProps {
  /**
   * 字段key
   */
  key?: string;
  /**
   * 用于分组类型
   */
  children?: ISchema[];
}

export interface DropResult {
  type: string;
  dragItem: ISchema;
  move?: boolean; // 是否为移动
  locationPath: number[]; // 位置
}
