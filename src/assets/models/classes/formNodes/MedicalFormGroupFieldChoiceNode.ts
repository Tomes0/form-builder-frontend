import {BaseNode} from "./BaseNode";

export class MedicalFormGroupFieldChoiceNode extends BaseNode {

    readonly propertyList = [
        'id',
        'question_field_id',
        'ordinal_position',
        'code',
        'except_on_field_id',
        'except_on_field_value',
        'is_valid',
        'creator_session_id',
        'creation_date',
        'latest_modifier_session_id',
        'latest_modification_date',
    ];


    constructor(parent: BaseNode, name: string) {
        super(parent, name);

        const properties = new Map<string, string>();
        this.propertyList.forEach(property => properties.set(property, ''));

        return this;
    }
}
