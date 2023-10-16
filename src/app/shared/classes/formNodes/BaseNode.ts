import {TreeNode} from "primeng/api";
import {NodeProperty} from "../../interfaces/NodeProperty"
import {NodeMinimal} from "../../interfaces/NodeMinimal";

export class BaseNode {

  root: BaseNode;
  parent: BaseNode | undefined;
  children: BaseNode[] = [];

  label: string;
  code!: string;

  protected properties: NodeProperty | undefined;
  protected propertyList: string[] = [];

  protected baseProperties: NodeProperty;
  protected basePropertyList: string[] = [
    'ID',
    'Is Valid',
    'Creation Date',
    'Creator Session ID',
    'Latest Modification Date',
    'Latest Modifier Session ID'
  ];

  constructor(parent: BaseNode | undefined, label: string, code?: string, properties?: NodeProperty, baseProperties?: NodeProperty) {
    this.parent = parent;
    this.label = label;

    this.root = this.findRootNode();

    this.code = code ? code : (Math.floor(Math.random() * 10000000)).toString();
    this.properties = properties ? properties: this.initProperties(this.propertyList);
    this.baseProperties = baseProperties ? baseProperties : this.initProperties(this.basePropertyList);

    if (parent) {
      parent.addChild(this);
    }
  }

  toString() {
    const parentString = `parentNode: ${(this.parent ? this.parent.label : 'root element')}\n`;
    const codeString = `name: ${this.label}\n`;
    const propertiesString = this.properties
    return parentString + codeString + propertiesString;
  }

  initProperties(propertyList: string[]): NodeProperty{
    const properties = {} as NodeProperty;
    propertyList.forEach(property => properties[property] = '');
    return properties;
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

  moveNode(newParent: BaseNode){
    if(newParent){
      this.removeNode();
      newParent.addChild(this);

      this.setParent(newParent);
    }
  }

  removeNode() {
    if (this.parent?.children.length === 1) {
      this.parent.children = [];
      return;
    }

    this.removeFromParent();
  }

  removeFromParent(){
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

  getParent(): BaseNode {
    return <BaseNode>this.parent;
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

  private setBaseProperty(propertyName: string, propertyValue: string){
    if(this.baseProperties){
      let props = { ...this.properties};
      props[propertyName] = propertyValue;
      this.baseProperties = props;
    } else {
      this.baseProperties = {} as NodeProperty;
      this.baseProperties[propertyName] = propertyValue;
    }
  }

  setProperties(properties: [string, string][]){
    properties.forEach(([key, value]) => this.setProperty(key, value))
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
