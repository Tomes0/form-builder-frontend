import {Field, Form, Group, Property} from "../interfaces/Form";
import {FormNode} from "../classes/formNodes/FormNode";
import {BaseNode} from "../classes/formNodes/BaseNode";
import {GroupNode} from "../classes/formNodes/GroupNode";

export function classToInterface(node: FormNode): Form{
  return {
    name: node.label,
    code: node.code,
    id: node.getProperty("ID") ? <number><unknown>node.getProperty("ID") : 0,
    creationDate: new Date().toISOString(),
    isValid: true,
    lastModificationDate: new Date().toISOString(),
    groups: generateGroups(node.children),
    propertyList: generatePropertyList(node)
  };
}

function generatePropertyList(node: BaseNode): Property[] {
  return Object.entries(node.getProperties()).map(property => {return {propertyName: property[0], propertyValue: property[1], id: 0}});
}

function getFields(node: GroupNode): Field[] {
  return node.getChildren().map(node => {
    return {
      name: node.label,
      code: node.code,
      id: node.getProperty("ID")  ? <number><unknown>node.getProperty("ID") : 0,
      fieldType: node.getFieldType(),
      propertyList: generatePropertyList(node),
      choices: [],
      ordinalPosition: 0,
      hasDependency: false
    }
  })
}



function generateGroups(nodeGroups: GroupNode[]): Group[]{
  return nodeGroups.map(node => {
    return {
      name: node.label,
      code: node.code,
      id: node.getProperty("ID")  ? <number><unknown>node.getProperty("ID") : 0,
      fields: getFields(node),
      propertyList: generatePropertyList(node),
      ordinalPosition: 0
    }
  });
}





