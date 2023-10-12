import {NodeProperty} from "./NodeProperty";

export interface NodeMinimal{
  label: string,
  code: string,
  rootCode: string,
  properties: NodeProperty|undefined,
  propertyList: string[]
}
