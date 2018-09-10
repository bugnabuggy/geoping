export default interface IShareCheckListModalComponentProps {
  show: boolean;

  closeModalShare: () => ( dispatch: Function ) => void;
}