import {Form} from "../interfaces/Form";
import {FormNode} from "../classes/formNodes/FormNode";

export function interfaceToClass(form: Form): FormNode{
  const formNode = new FormNode(form.name);


  return formNode;
}
