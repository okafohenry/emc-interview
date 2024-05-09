import { useRef } from "react";

interface ModalProps {
  modalStyle?: string;
  children: any;
  closeModal?: () => void;
}

function CustomModal({ modalStyle, children, closeModal }: ModalProps) {
  const ref = useRef(null);

  return (
    <div className="fixed z-[1020] backdrop-blur-sm w-full h-full top-0 left-0 bottom-0 bg-[#747474]/[0.1] backdrop-brightness-50">
      <div ref={ref} className={`${modalStyle} grid`}>
        {/* {closeBtn && (
          <div className={`${closeBtnStyle}`} onClick={closeModal}>
            <button> &times; </button>
          </div>
        )} */}
        <main>{children}</main>
      </div>
    </div>
  );
}

export default CustomModal;
