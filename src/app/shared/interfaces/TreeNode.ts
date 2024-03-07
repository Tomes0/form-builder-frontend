import {NodeType} from "../enums/NodeType";
import {Node} from './Node'

export interface TreeNode<T = any> {
  label: string;
  data: Node;
  icon?: string;
  expandedIcon?: any;
  collapsedIcon?: any;
  children?: TreeNode<T>[] | undefined;
  leaf?: boolean;
  expanded?: boolean;
  type: NodeType;
  parent?: TreeNode<T> | undefined;
  partialSelected?: boolean;
  style?: string;
  styleClass?: string;
  draggable?: boolean;
  droppable?: boolean;
  selectable?: boolean;
  key?: string;
}
