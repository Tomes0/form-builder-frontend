import {BaseNode} from "./BaseNode";
import {FieldNode} from "./FieldNode";

export class GroupNode extends BaseNode {

    override propertyList: string[] = [
        'Ordinal Position',
    ]
    override children: FieldNode[] = [];


    constructor(parent: BaseNode, name: string) {
        super(parent, name);
        return this;
    }

    override getChildren(): FieldNode[] {
        return this.children;
    }
}
