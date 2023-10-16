import {TreeNode} from "primeng/api";
import {NodeProperty} from "../../interfaces/NodeProperty"
import {NodeMinimal} from "../../interfaces/NodeMinimal";

export class BaseNode {

  root: BaseNode;
  parent: BaseNode | undefined;
  label: string;
  code: string;
  properties: NodeProperty | undefined;
  children: BaseNode[];
  propertyList: string[] = [];

  basePropertyList: string[] = [
    'ID',
    'Is Valid',
    'Creation Date',
    'Creator Session ID',
    'Latest Modification Date',
    'Latest Modifier Session ID'
  ];
  baseProperties: NodeProperty | undefined;

  constructor(parent: BaseNode | undefined, label: string, code?: string, properties?: NodeProperty) {
    this.parent = parent;
    this.root = this.findRootNode();
    this.label = label;
    this.properties = properties;
    this.children = [];
    this.code = code ? code : (Math.floor(Math.random() * 10000000)).toString();

    if (properties !== undefined) {
      this.properties = properties;
    }

    if (parent) {
      // @ts-ignore
      parent.addChild(this);
    }
  }

  toString() {
    const parentString = `parentNode: ${(this.parent ? this.parent.label : 'root element')}\n`;
    const codeString = `name: ${this.label}\n`;
    const propertiesString = this.properties
    return parentString + codeString + propertiesString;
  }

  addChild(child: BaseNode) {
    this.children.push(child);
  }

  setChildren(children: BaseNode[]){
    this.children = children;
  }

  setParent(parent: BaseNode){
    this.parent = parent;
  }

  moveNode(start: BaseNode, end: BaseNode){
    if(start === end){
      return;
    }
    this.removeNode();
    end.addChild(this);

    this.parent = end;
  }

  removeNode() {
    if (this.parent?.children.length === 1) {
      this.parent.children = [];
      return;
    }

    const index = this.parent?.children.indexOf(this);
    if (index) {
      this.parent?.children.splice(index, 1);
    }
  }

  getChildren(): BaseNode[] {
    return this.children;
  }

  getChildrenAsNodes(): TreeNode<BaseNode>[] {
    return this.getChildren().map(node => node.getAsTreeNode())
  }

  getParent(): BaseNode | undefined {
    return this.parent;
  }

  getAsTreeNode(): TreeNode<BaseNode> {
    return {
      parent: this.parent ? this.getParent() : undefined,
      label: this.label ? this.label : undefined,
      children: this.children ? this.getChildrenAsNodes() : undefined,
      draggable: true,
      droppable: true,
      data: this,
      expanded: true
    };
  }

  getMinimal():NodeMinimal{
    return {
      code: this.code,
      properties: this.properties,
      label: this.label,
      propertyList: this.propertyList,
      rootCode: this.root.code,
      basePropertyList: this.basePropertyList,
      baseProperties: this.baseProperties
    }
  }
  setProperty(propertyName: string, propertyValue: string) {
    if(this.properties){
      let props = { ...this.properties};
      props[propertyName] = propertyValue;
      this.properties = props;
    } else {
      this.properties = {} as NodeProperty;
      this.properties[propertyName] = propertyValue;
    }
  }

  findRootNode(): BaseNode{
    if(this.parent === undefined){
      return this;
    }
    return this.parent.findRootNode();
  }

  getProperty(propertyName: string): string | undefined  {
    return this.properties ? this.properties[propertyName] : undefined;
  }

  calculateDepth(): number {
    if (this.parent === null) {
      return 0;
    }

    let depth = 0;
    let parentNode: BaseNode | undefined = this.parent;

    while (parentNode) {
      depth++;
      // @ts-ignore
      parentNode = parentNode.parent;
    }

    return depth;
  }

  traverse(mode: 'preOrder' | 'inOrder' | 'postOrder' | 'breadthFirst' | 'depthFirst', callback: (node: BaseNode) => void) {
    switch (mode) {
      case 'breadthFirst':
        return this.traverseBreadthFirst(callback);
      case 'inOrder':
        return this.traverseInOrder(callback);
      case 'depthFirst':
        return this.traverseDepthFirst(callback);
      case 'postOrder':
        return this.traversePostOrder(callback);
      case 'preOrder':
        return this.traversePreOrder(callback);
    }
  }

  private traversePreOrder(callback: (node: BaseNode) => void) {
    callback(this);
    this.children.forEach((child) => {
      child.traversePreOrder(callback);
    });
  }

  private traverseInOrder(callback: (node: BaseNode) => void) {
    if (this.children.length > 0) {
      this.children[0].traverseInOrder(callback);
    }
    callback(this);
    for (let i = 1; i < this.children.length; i++) {
      this.children[i].traverseInOrder(callback);
    }
  }

  private traversePostOrder(callback: (node: BaseNode) => void) {
    this.children.forEach((child) => {
      child.traversePostOrder(callback);
    });
    callback(this);
  }

  private traverseBreadthFirst(callback: (node: BaseNode) => void) {
    const queue: BaseNode[] = [];
    queue.push(this);

    while (queue.length > 0) {
      const currentNode = queue.shift()!;
      callback(currentNode);

      currentNode.children.forEach((child) => {
        queue.push(child);
      });
    }
  }

  private traverseDepthFirst(callback: (node: BaseNode) => void) {
    const dfs = (node: BaseNode) => {
      callback(node);
      node.children.forEach((child) => {
        dfs(child);
      });
    };
    dfs(this);
  }
}
