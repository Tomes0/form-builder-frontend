import {BaseNode} from "./BaseNode";

export class MedicalFormNode extends BaseNode{

    readonly propertyList = [
        'id',
        'code',
        'is_valid',
        'creator_session_id',
        'creation_date',
        'last_modifier_session_id',
        'latest_modification_date'
    ];


    constructor(parent: undefined, name: string) {
        super(parent, name);

        const properties = new Map<string, string>();
        this.propertyList.forEach(property => properties.set(property, ''));

        return this;
    }
}
