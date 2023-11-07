import {Field, Form, Group, Property} from "../interfaces/Form";
import {FormNode} from "../classes/formNodes/FormNode";
import {GroupNode} from "../classes/formNodes/GroupNode";
import {FieldNode} from "../classes/formNodes/FieldNode";
import {ChoiceNode} from "../classes/formNodes/ChoiceNode";

export function interfaceToClass(form: Form): FormNode{
  const formNode = new FormNode(form.name, form.id ,form.code);

  if(form.propertyList.length > 0){
    formNode.setProperties(createPropertyList(form.propertyList, false));
    formNode.setBaseProperties(createPropertyList(form.propertyList, true));
  }

  if(form.groups.length > 0){
    setGroups(formNode, form);
  }

  return formNode;
}


function setGroups(formNode: FormNode, form: Form) {
  formNode.setChildren(
    form.groups.map(group => {
      const groupNode = new GroupNode(formNode, group.name);

      if(group.propertyList.length > 0){
        groupNode.setProperties(createPropertyList(group.propertyList, false));
        groupNode.setBaseProperties(createPropertyList(group.propertyList, true));
      }

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

      if(field.propertyList.length > 0){
        fieldNode.setProperties(createPropertyList(field.propertyList, false));
        fieldNode.setBaseProperties(createPropertyList(field.propertyList, true))
      }


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

      if(choice.propertyList.length > 0){
        choiceNode.setProperties(createPropertyList(choice.propertyList, false));
        choiceNode.setBaseProperties(createPropertyList(choice.propertyList, true))
      }

      return choiceNode;
    })
  );
}

function createPropertyList(propertyList: Property[], isBaseProperty: boolean): [string, string][]{
  return propertyList
    .filter(propertyList => propertyList.isBaseProperty === isBaseProperty)
    .map(property => [property.propertyName, property.propertyValue]);
}
