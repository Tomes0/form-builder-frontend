import {BaseNode} from "./BaseNode";
import {FieldType} from "../../enums/FiledTypes";
import {NodeMinimal} from "../../interfaces/NodeMinimal";

export class MedicalFormGroupFieldNode extends BaseNode {

  fieldType: FieldType;

  constructor(parent: BaseNode | undefined, name: string, fieldType: FieldType) {
    super(parent, name);
    this.fieldType = fieldType;
    return this;
  }

  setFieldType(fieldType: FieldType){
    this.fieldType = fieldType;
    this.setPropertyList();
  }

  getFieldType(){
    return this.fieldType
  }

  override getMinimal(): NodeMinimal {
    return {
      code: this.code,
      properties: this.properties,
      label: this.label,
      propertyList: this.propertyList,
      rootCode: this.root.code,
      baseProperties: this.baseProperties,
      basePropertyList: this.basePropertyList,
      fieldType: this.fieldType
    }
  }

  setPropertyList(){
    switch (this.fieldType){
      case FieldType.NONE: this.propertyList = []; break;
      case FieldType.CHECKBOX: this.propertyList =                   ['dependsOnChoiceCode', 'dependsOnFieldCode']; break;
      case FieldType.NUMERIC: this.propertyList =                    ['dependsOnChoiceCode', 'dependsOnFieldCode']; break;
      case FieldType.RADIO: this.propertyList =                      ['dependsOnChoiceCode', 'dependsOnFieldCode']; break;
      case FieldType.TEXT: this.propertyList =                       ['dependsOnChoiceCode', 'dependsOnFieldCode']; break;
      case FieldType.TEXTAREA: this.propertyList =                   ['dependsOnChoiceCode', 'dependsOnFieldCode']; break;
      case FieldType.SELECTION: this.propertyList =                  ['dependsOnChoiceCode', 'dependsOnFieldCode']; break;
      case FieldType.LIMITED_MULTIPLE_SELECTION: this.propertyList = ['dependsOnChoiceCode', 'dependsOnFieldCode']; break;
      case FieldType.MULTIPLE_SELECTION: this.propertyList =         ['dependsOnChoiceCode', 'dependsOnFieldCode']; break;
      case FieldType.SPECIAL: this.propertyList =                    ['dependsOnChoiceCode', 'dependsOnFieldCode']; break;
    }
  }

}
