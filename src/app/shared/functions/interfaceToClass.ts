import {Field, Form, Group, Property} from "../interfaces/Form";
import {FormNode} from "../classes/formNodes/FormNode";
import {GroupNode} from "../classes/formNodes/GroupNode";
import {FieldNode} from "../classes/formNodes/FieldNode";
import {ChoiceNode} from "../classes/formNodes/ChoiceNode";

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
  groupNode.setChildren(
    group.fields.map(field => {
      const fieldNode = new FieldNode(groupNode, field.name, field.fieldType);
      fieldNode.setProperties(createPropertyList(field.propertyList));

      if(field.choices.length > 0){
        setChoices(fieldNode, field);
      }

      return fieldNode;
    })
  );
}

function setChoices(fieldNode: FieldNode, field: Field) {
  fieldNode.setChildren(
    field.choices.map(choice => {
      const choiceNode = new ChoiceNode(fieldNode, choice.name);
      choiceNode.setProperties(createPropertyList(choice.propertyList));

      return choiceNode;
    })
  );
}
