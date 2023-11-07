import {Choice, Field, Form, Group, Property} from "../interfaces/Form";
import {FormNode} from "../classes/formNodes/FormNode";
import {BaseNode} from "../classes/formNodes/BaseNode";
import {GroupNode} from "../classes/formNodes/GroupNode";
import {FieldNode} from "../classes/formNodes/FieldNode";
import {ChoiceNode} from "../classes/formNodes/ChoiceNode";

export function classToInterface(node: FormNode): Form {
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

function generateGroups(groupNodes: GroupNode[]): Group[] {
  return groupNodes.map(groupNode => {
    return {
      name: groupNode.label,
      code: groupNode.code,
      id: groupNode.getProperty("ID") ? <number><unknown>groupNode.getProperty("ID") : 0,
      fields: generateFields(groupNode.getChildren()),
      propertyList: generatePropertyList(groupNode),
      ordinalPosition: 0
    }
  });
}

function generateFields(fieldNodes: FieldNode[]): Field[] {
  return fieldNodes.map(fieldNode => {
    return {
      name: fieldNode.label,
      code: fieldNode.code,
      id: fieldNode.getProperty("ID") ? <number><unknown>fieldNode.getProperty("ID") : 0,
      fieldType: fieldNode.getFieldType(),
      propertyList: generatePropertyList(fieldNode),
      choices: generateChoices(fieldNode.getChildren()),
      ordinalPosition: 0,
      hasDependency: false
    }
  });
}

function generateChoices(choiceNodes: ChoiceNode[]): Choice[] {
  return choiceNodes.map(choiceNode => {
    return {
      name: choiceNode.label,
      code: choiceNode.code,
      id: choiceNode.getProperty("ID") ? <number><unknown>choiceNode.getProperty("ID") : 0,
      propertyList: generatePropertyList(choiceNode),
      ordinalPosition: 0
    }
  })
}

function generatePropertyList(node: BaseNode): Property[] {
  const properties: Property[] = [];

  const nonBaseProperties = Object.entries(node.getProperties()).map(property => {
    return {
      propertyName: property[0],
      propertyValue: property[1],
      id: 0,
      isBaseProperty: false
    } as Property
  });

  const baseProperties = Object.entries(node.getBaseProperties()).map(property => {
    return {
      propertyName: property[0],
      propertyValue: property[1],
      id: 0,
      isBaseProperty: false
    } as Property
  });

  properties.push(...nonBaseProperties);
  properties.push(...baseProperties);

  return properties;
}

