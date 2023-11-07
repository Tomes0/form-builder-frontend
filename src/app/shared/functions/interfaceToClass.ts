import {Form, Group, Property} from "../interfaces/Form";
import {FormNode} from "../classes/formNodes/FormNode";
import {GroupNode} from "../classes/formNodes/GroupNode";
import {FieldNode} from "../classes/formNodes/FieldNode";

export function interfaceToClass(form: Form): FormNode{
  const formNode = new FormNode(form.name, form.code);

  if(form.propertyList.length > 0){
    formNode.setProperties(createPropertyList(form.propertyList));
  }

  if(form.groups.length > 0){
    setGroups(formNode, form);
  }


  return formNode;
}
function createPropertyList(propertyList: Property[]): [string, string][]{
  return propertyList.map(property => [property.propertyName, property.propertyValue]);
}

function setGroups(formNode: FormNode, form: Form) {
  formNode.setChildren(
    form.groups.map(group => {
      const groupNode = new GroupNode(formNode, group.name);
      groupNode.setProperties(createPropertyList(group.propertyList));

      if(group.fields.length > 0){
        setFields(groupNode, group);
      }

      return groupNode;
    })
  );
}

function setFields(groupNode: GroupNode, group: Group) {
  groupNode.setChildren(group.fields.map(field => new FieldNode(groupNode, field.name, field.fieldType)));
}

