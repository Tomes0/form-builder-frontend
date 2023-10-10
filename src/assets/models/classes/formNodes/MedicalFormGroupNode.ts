import {BaseNode} from "./BaseNode";

export class MedicalFormGroupNode extends BaseNode {

    readonly propertyList = [
        'id',
        'medical_form_id',
        'ordinal_position',
        'code', 'is_valid',
        'creator_session_id',
        'creation_date',
        'last_modifier_session_id',
        'latest_modification_date'
    ];


    constructor(parent: BaseNode, name: string) {
        super(parent, name);

        const properties = new Map<string, string>();
        this.propertyList.forEach(property => properties.set(property, ''));

        return this;
    }
}
