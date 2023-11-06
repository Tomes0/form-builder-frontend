import {Form, Group} from "../interfaces/Form";
import {FormNode} from "../classes/formNodes/FormNode";
import {BaseNode} from "../classes/formNodes/BaseNode";

export function classToInterface(node: FormNode|BaseNode): Form{
  // const form: Form = {
  //   name: node.label,
  //   code: node.code,
  //   id: node.getProperty('ID') !== undefined ? +<string>node.getProperty('ID') : null,
  //   creationDate: <string>node.getProperty('Creation Date'),
  //   isValid: <boolean><unknown>node.getProperty('Is Valid'),
  //   lastModificationDate: <string>node.getProperty('Latest Modification Date'),
  //   groups: [],
  //   propertyList: []
  // };

  const form: Form = {
    name: node.label,
    code: node.code,
    id: node.getProperty("ID")  ? <number><unknown>node.getProperty("ID") : 0,
    creationDate: new Date().toISOString(),
    isValid: true,
    lastModificationDate: new Date().toISOString(),
    groups: generateGroups(node.children),
    propertyList: []
  };

  console.log(form)

  return form;
}

function generateGroups(nodeGroups:  BaseNode[]): Group[]{
  return nodeGroups.map(node => {
    return {
      name: node.label,
      code: node.code,
      id: node.getProperty("ID")  ? <number><unknown>node.getProperty("ID") : 0,
      fields: [],
      propertyList: [],
      ordinalPosition: 0
    }
  });
}
