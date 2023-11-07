import {BaseNode} from "./BaseNode";
import {GroupNode} from "./GroupNode";

export class FormNode extends BaseNode{

    override basePropertyList: string[] = [
      'Is Valid',
      'Creation Date',
      'Creator Session ID',
      'Latest Modification Date',
      'Latest Modifier Session ID'
    ];
    override propertyList: string[] = ['Locale']
    override children: GroupNode[] = [];

    constructor(name: string, id: number, code: string) {
        super(undefined, name, id, code);
        return this;
    }

    override getChildren(): GroupNode[] {
        return this.children;
    }
}
