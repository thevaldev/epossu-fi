import { ModalHandlerProps } from "../types";

function ModalHandler({
  title,
  jsx,
  icon,
  closeText = "Sulje",
  onClose,
  action,
  disableOutsideClick = false,
}: ModalHandlerProps) {
  if (title === "" || jsx === null) {
    return null;
  }

  function handleClick(e: React.MouseEvent) {
    if (disableOutsideClick) return;

    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  function handleClose() {
    if (action) action();
    onClose();
  }

  return (
    <div className="modal-popup" onClick={handleClick}>
      <div className={`modal-container modal-factory`}>
        {icon}
        <h2>{title}</h2>
        {jsx}
        {closeText !== "" && <button onClick={handleClose}>{closeText}</button>}
      </div>
    </div>
  );
}

export default ModalHandler;
