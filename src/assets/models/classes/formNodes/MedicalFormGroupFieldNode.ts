import {BaseNode} from "./BaseNode";

export class MedicalFormGroupFieldNode extends BaseNode {

    readonly propertyList = [
        'id',
        'question_group_id',
        'ordinal_position',
        'code',
        'type',
        'depends_on_field_id',
        'depends_on_field_value',
        'can_be_negative_number',
        'decimal_place',
        'unit_of_measure',
        'field_is_required',
        'minimum_value',
        'maximum_value',
        'is_valid',
        'creator_session_id',
        'creation_date',
        'latest_modifier_session_id',
        'latest_modification_date',
        'depends_on_field_choice_id',
    ];


  constructor(parent: BaseNode | undefined, name: string) {
        super(parent, name);

        const properties = new Map<string, string>();
        this.propertyList.forEach(property => properties.set(property, ''));

        return this;
    }
}
