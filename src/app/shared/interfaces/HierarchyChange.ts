import {TreeNode} from "primeng/api";

export interface HierarchyChange<T = any>{
  target: TreeNode<T> | undefined,
  end?: TreeNode<T> | undefined
}
