import {Choice, Field, Form, Group} from "../interfaces/Form";
import {Node} from '../interfaces/Node'
import {TreeNode} from "../interfaces/TreeNode";
import {FieldType} from "../enums/FieldType";


export function classToInterface(tree: TreeNode<Node>): Form {
  return {
    name: tree.label,
    code: tree.data? tree.data.code : '',
    id: 0,
    creationDate: new Date().toISOString(),
    isValid: true,
    lastModificationDate: new Date().toISOString(),
    groups: generateGroups(<TreeNode<Node>[]>tree.children),
    propertyList: tree.data ? tree.data.properties: []
  };
}

function generateGroups(groupNodes: TreeNode<Node>[]): Group[] {
  return groupNodes.map(groupNode => {
    return {
      name: groupNode.label,
      code: groupNode.data? groupNode.data.code : '',
      id: 0,
      fields: generateFields(<TreeNode<Node>[]>groupNode.children),
      propertyList: groupNode.data ? groupNode.data.properties: [],
      ordinalPosition: 0
    }
  });
}

function generateFields(fieldNodes: TreeNode<Node>[]): Field[] {
  return fieldNodes.map(fieldNode => {
    return {
      name: fieldNode.label,
      code: fieldNode.data? fieldNode.data.code : '',
      id: 0,
      fieldType: fieldNode.data ? <FieldType>fieldNode.data.fieldType : FieldType.NONE,
      propertyList: fieldNode.data ? fieldNode.data.properties: [],
      choices: generateChoices(<TreeNode<Node>[]>fieldNode.children),
      ordinalPosition: 0,
      hasDependency: false
    }
  });
}
function generateChoices(choiceNodes: TreeNode<Node>[]): Choice[] {
  return choiceNodes.map(choiceNode => {
    return {
      name: choiceNode.label,
      code: choiceNode.data? choiceNode.data.code : '',
      id: 0,
      propertyList: choiceNode.data ? choiceNode.data.properties: [],
      ordinalPosition: 0
    }
  })
}

