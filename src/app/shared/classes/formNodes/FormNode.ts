import {BaseNode} from "./BaseNode";
import {GroupNode} from "./GroupNode";

export class FormNode extends BaseNode{

    override propertyList: string[] = ['locale']
    override children: GroupNode[] = [];

    constructor(name: string, code: string) {
        super(undefined, name, code);
        return this;
    }

    override getChildren(): GroupNode[] {
        return this.children;
    }
}
