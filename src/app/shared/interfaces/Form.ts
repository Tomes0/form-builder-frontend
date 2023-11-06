export interface Form {
  id: number | null;
  name: string;
  code: string;
  propertyList: PropertyDto[];
  creationDate: string;
  lastModificationDate: string;
  isValid: boolean;
  groups: GroupDto[]
}

export interface GroupDto {
  id: number;
  name: string;
  code: string;
  propertyList: PropertyDto[];
  ordinalPosition: number;
  fields: FieldDto[];
}
export interface FieldDto {
  id: number;
  name: string;
  code: string;
  propertyList: PropertyDto[];
  ordinalPosition: number;
  fieldType: string;
  choices: ChoiceDto[],
  hasDependency: boolean
}

export interface ChoiceDto {
  id: number;
  name: string;
  code: string;
  propertyList: PropertyDto[];
  ordinalPosition: number;
}

export interface PropertyDto {
  id: number;
  propertyName: string;
  propertyValue: string;
}
