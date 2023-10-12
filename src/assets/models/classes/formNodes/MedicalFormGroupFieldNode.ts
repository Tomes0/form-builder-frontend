import {BaseNode} from "./BaseNode";

export class MedicalFormGroupFieldNode extends BaseNode {

  constructor(parent: BaseNode | undefined, name: string) {
        super(parent, name);

        this.propertyList.push(...[
            'question_group_id',
            'ordinal_position',
            'type',
            'depends_on_field_id',
            'depends_on_field_value',
            'can_be_negative_number',
            'decimal_place',
            'unit_of_measure',
            'field_is_required',
            'minimum_value',
            'maximum_value',
            'depends_on_field_choice_id',
          ]);
        this.propertyList.forEach(property => this.setProperty(property, ''));
        return this;
    }
}
