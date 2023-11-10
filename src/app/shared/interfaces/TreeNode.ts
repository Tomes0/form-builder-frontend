export interface TreeNode<T = any> {
  label?: string;
  data: T;
  icon?: string;
  expandedIcon?: any;
  collapsedIcon?: any;
  children: TreeNode<T>[] | undefined;
  leaf?: boolean;
  expanded: boolean;
  type?: string;
  parent?: TreeNode<T> | undefined;
  partialSelected?: boolean;
  style?: string;
  styleClass?: string;
  draggable?: boolean;
  droppable?: boolean;
  selectable?: boolean;
  key?: string;
}
