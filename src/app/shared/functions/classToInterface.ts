import {Form} from "../interfaces/Form";
import {FormNode} from "../classes/formNodes/FormNode";
import {GroupNode} from "../classes/formNodes/GroupNode";
import {BaseNode} from "../classes/formNodes/BaseNode";

export function classToInterface(node: FormNode|BaseNode): Form{
  const form: Form = {
    name: node.label,
    code: node.code,
    id: node.getProperty('ID') !== undefined ? +<string>node.getProperty('ID') : null,
    creationDate: <string>node.getProperty('Creation Date'),
    isValid: <boolean><unknown>node.getProperty('Is Valid'),
    lastModificationDate: <string>node.getProperty('Latest Modification Date'),
    groups: [],
    propertyList: []
  };
  return form;
}
