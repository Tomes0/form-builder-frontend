import {FieldType} from "../enums/FieldType";
import {Property} from './Form';
import {NodeType} from "../enums/NodeType";

export interface Node{
  name: string,
  code: string,
  properties: Property[],
  propertyList: string[],
  type: NodeType,
  fieldType?: FieldType,
  ordinalPosition?: number,
  creationDate?: string,
  lastModificationDate?: string,
  isValid?: boolean,
}
