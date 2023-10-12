import {BaseNode} from "./BaseNode";

export class MedicalFormGroupNode extends BaseNode {
    constructor(parent: BaseNode, name: string) {
        super(parent, name);

        this.propertyList.push(...[
            'medical_form_id',
            'ordinal_position',
        ]);

        this.propertyList.forEach(property => this.setProperty(property, ''));
        return this;
    }
}
