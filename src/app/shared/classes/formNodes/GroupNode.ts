import {BaseNode} from "./BaseNode";

export class GroupNode extends BaseNode {
    constructor(parent: BaseNode, name: string) {
        super(parent, name);
        this.propertyList.push(...[
            'medical_form_id',
            'ordinal_position',
        ]);

        return this;
    }
}
