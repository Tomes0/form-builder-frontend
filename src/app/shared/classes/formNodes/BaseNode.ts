import {NodeProperty} from "../../interfaces/NodeProperty"
import {NodeMinimal} from "../../interfaces/NodeMinimal";
import {FormNode} from "./FormNode";
import {TreeNode} from "../../interfaces/TreeNode";

export enum Traverse{
  PREORDER,
  INORDER,
  POSTORDER,
  BREADTHFIRST,
  DEPTHFIRST
}
export class BaseNode {

  root: BaseNode;
  parent: BaseNode | undefined;
  children: BaseNode[] = [];

  label: string;
  code: string;
  id: number;

  protected properties: NodeProperty | undefined;
  protected propertyList: string[] = [];

  protected baseProperties: NodeProperty;
  protected basePropertyList: string[] = [];

  constructor(parent: BaseNode | undefined, label: string, id?: number, code?: string, properties?: NodeProperty, baseProperties?: NodeProperty) {
    this.parent = parent;

    this.label = label;
    this.code = code ? code : label.trim().toUpperCase().replace(/ /g, '_') + (Math.floor(Math.random() * 100)).toString();
    this.id = id ? id : 0;

    this.root = this.findRootNode();
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

  isRoot(){
    return this.getParent() === undefined;
  }

  removeNode() {
    const index = this.parent?.children.indexOf(this);

    if (index !== undefined) {
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
      label: this.label ? this.label : undefined,
      children:  this.getChildrenAsNodes(),
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

  setBaseProperty(propertyName: string, propertyValue: string){
    if(this.baseProperties){
      let props = { ...this.properties};
      props[propertyName] = propertyValue;
      this.baseProperties = props;
    } else {
      this.baseProperties = {} as NodeProperty;
      this.baseProperties[propertyName] = propertyValue;
    }
  }

  getProperty(propertyName: string): string | undefined  {
    return this.properties ? this.properties[propertyName] : undefined;
  }

  getBaseProperty(propertyName: string): string | undefined  {
    return this.baseProperties ? this.baseProperties[propertyName] : undefined;
  }

  setProperties(properties: [string, string][]){
    properties.forEach(([key, value]) => this.setProperty(key, value))
  }

  setBaseProperties(properties: [string, string][]){
    properties.forEach(([key, value]) => this.setBaseProperty(key, value))
  }

  getProperties(): NodeProperty{
    return <NodeProperty>this.properties;
  }

  getBaseProperties(): NodeProperty{
    return <NodeProperty>this.baseProperties;
  }

  findRootNode(): FormNode{
    if(this.parent === undefined){
      return  <FormNode><unknown>this;
    }
    return this.parent.findRootNode();
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

  traverse(mode: Traverse, callback: (node: BaseNode) => void) {
    switch (mode) {
      case Traverse.BREADTHFIRST:
        return this.traverseBreadthFirst(callback);
      case Traverse.INORDER:
        return this.traverseInOrder(callback);
      case Traverse.DEPTHFIRST:
        return this.traverseDepthFirst(callback);
      case Traverse.POSTORDER:
        return this.traversePostOrder(callback);
      case Traverse.PREORDER:
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
