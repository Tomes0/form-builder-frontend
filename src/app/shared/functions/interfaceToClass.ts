import {Form} from "../interfaces/Form";
import {FormNode} from "../classes/formNodes/FormNode";
import {GroupNode} from "../classes/formNodes/GroupNode";

export function interfaceToClass(form: Form): FormNode{
  const formNode = new FormNode(form.name);

  console.log(form);

  if(form.propertyList.length > 0){
    formNode.setProperties(form.propertyList.map(property => [property.propertyName, property.propertyValue]));
  }

  if(form.groups.length > 0){
    formNode.setChildren(form.groups.map(group => new GroupNode(formNode ,group.name)));
  }

  return formNode;
}
