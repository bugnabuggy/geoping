export default interface ILinkMenuType {
  text: string;
  path: string;
}

export default interface ILinkHeaderComponentProps {
  text: string;
  path: string;
  id: string;
  classLink?: string;
  index: string;
  dropdown?: boolean;
  links?: Array<ILinkMenuType>;
}