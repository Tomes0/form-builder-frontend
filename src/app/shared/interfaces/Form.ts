export interface Form{
  id: number;
  name: string;
  code: string;
  propertyList: Property[];
  creationDate: string;
  lastModificationDate: string;
  isValid: boolean;
  groups: Group[]
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
  fieldType: string;
  choices: Choice[]
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