import {BaseNode} from "./BaseNode";

export class MedicalFormGroupFieldChoiceNode extends BaseNode {



    constructor(parent: BaseNode, name: string) {
        super(parent, name);
        this.propertyList.push(...[
          'question_field_id',
          'ordinal_position',
          'except_on_field_id',
          'except_on_field_value',
        ]);

        this.propertyList.forEach(property => this.setProperty(property, ''));
        return this;
    }
}
