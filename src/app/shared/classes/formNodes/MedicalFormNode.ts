import {BaseNode} from "./BaseNode";

export class MedicalFormNode extends BaseNode{

    override propertyList: string[] = ['locale']

    constructor(name: string) {
        super(undefined, name);
        return this;
    }
}
