import {BaseNode} from "./BaseNode";

export class ChoiceNode extends BaseNode {

  override basePropertyList: string[] = [
    'Ordinal Position'
  ]
  override propertyList: string[] = [
    'question_field_id',
    'except_on_field_id',
    'except_on_field_value',
  ];

  override children = [];


  constructor(parent: BaseNode, name: string) {
      super(parent, name);
      return this;
  }
}
