export interface Message {
  text: string;
  subText: string;
}

export enum MessageTypes {
  FORM_DELETE_WARNING = 'FORM_DELETE_WARNING'
}

export const Messages: { [key in MessageTypes]: Message } = {
  [MessageTypes.FORM_DELETE_WARNING]: {
    text: "Are you sure you want to delete the form?",
    subText: "Form deletion cannot be undone!"
  }
};
