import {Choice, Field, Form, Group} from "../interfaces/Form";
import {NodeType} from "../enums/NodeType";
import {TreeNode} from "../interfaces/TreeNode";
import {Node} from '../interfaces/Node'

export function interfaceToTreeNode(form: Form): TreeNode<Node>{
  return {
    label: form.name,
    type: NodeType.FORM,
    parent: undefined,
    droppable: true,
    draggable: true,
    data: formToNode(form),
    expanded: true,
    children: groupsToNodes(form.groups)
  }
}

function formToNode(form: Form): Node{
  return {
    name: form.name,
    type: NodeType.FORM,
    code: form.code,
    properties: form.propertyList,
    propertyList: form.propertyList.map(property => property.propertyName),
    creationDate: form.creationDate,
    lastModificationDate: form.lastModificationDate
  };
}

function groupsToNodes(groups: Group[]): TreeNode<Node>[] {
  return groups.map(group => {
    return {
      label: group.name,
      type: NodeType.GROUP,
      expanded: true,
      draggable: true,
      droppable: true,
      data: groupToNode(group),
      children: fieldsToNodes(group.fields)
    }
  })
}

function groupToNode(group: Group): Node {
  return {
    name: group.name,
    type: NodeType.GROUP,
    code: group.code,
    properties: group.propertyList,
    propertyList: group.propertyList.map(property => property.propertyName),
    ordinalPosition: group.ordinalPosition
  };
}

function fieldsToNodes(fields: Field[]): TreeNode<Node>[]{
  return fields.map(field => {
    return {
      label: field.name,
      type: NodeType.FIELD,
      droppable: true,
      draggable: true,
      expanded: true,
      data: fieldToNode(field),
      children: choicesToNodes(field.choices)
    }
  })
}

function fieldToNode(field: Field): Node {
  return {
    name: field.name,
    type: NodeType.FIELD,
    code: field.code,
    properties: field.propertyList,
    propertyList: field.propertyList.map(property => property.propertyName),
    ordinalPosition: field.ordinalPosition,
    fieldType: field.fieldType
  };
}

function choicesToNodes(choices: Choice[]): TreeNode<Node>[] {
  return choices.map(choice => {
    return {
      label: choice.name,
      type: NodeType.CHOICE,
      data: choiceToNode(choice),
      droppable: true,
      draggable: true,
    }
  })
}

function choiceToNode(choice: Choice): Node{
  return {
    name: choice.name,
    type: NodeType.CHOICE,
    ordinalPosition: choice.ordinalPosition,
    code: choice.code,
    properties: choice.propertyList,
    propertyList: choice.propertyList.map(property => property.propertyName),
  }
}
