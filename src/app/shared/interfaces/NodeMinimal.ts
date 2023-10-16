import {NodeProperty} from "./NodeProperty";
import {FieldType} from "../enums/FiledTypes";

export interface NodeMinimal{
  label: string,
  code: string,
  rootCode: string,
  properties: NodeProperty|undefined,
  propertyList: string[],
  fieldType?: FieldType,
  baseProperties: NodeProperty,
  basePropertyList: string[]
}
