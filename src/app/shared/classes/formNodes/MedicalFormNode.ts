import {BaseNode} from "./BaseNode";

export class MedicalFormNode extends BaseNode{

    override propertyList: string[] = ['locale']

    constructor(name: string) {
        super(undefined, name);

        this.propertyList.forEach(property => this.setProperty(property, ''));
        return this;
    }
}
