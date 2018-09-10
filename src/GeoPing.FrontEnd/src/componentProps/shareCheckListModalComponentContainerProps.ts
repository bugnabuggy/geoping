export default interface IShareCheckListModalComponentContainerProps {
  show: boolean;

  closeModalShare: () => ( dispatch: Function ) => void;
}