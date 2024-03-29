import {FieldType} from "../enums/FieldType";

export interface Form {
  id: number;
  name: string;
  code: string;
  creationDate: string;
  lastModificationDate: string;
  isValid: boolean;
  groups: Group[]
  propertyList: Property[];
}

export interface Group {
  id: number;
  name: string;
  code: string;
  propertyList: Property[];
  ordinalPosition: number;
  fields: Field[];
}
export interface Field {
  id: number;
  name: string;
  code: string;
  propertyList: Property[];
  ordinalPosition: number;
  fieldType: FieldType;
  choices: Choice[],
  hasDependency: boolean
}

export interface Choice {
  id: number;
  name: string;
  code: string;
  propertyList: Property[];
  ordinalPosition: number;
}

export interface Property {
  id: number;
  propertyName: string;
  propertyValue: string;
}
