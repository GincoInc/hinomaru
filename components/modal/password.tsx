import React, { ChangeEvent, FC } from "react";
import modalChild from "@styles/components/modal/login.module.scss";
import animation from "@styles/components/core/animation.module.scss";
type ModalProps = {
  active: boolean;
  onEncypt: () => void;
  setPassword: (password: string) => void;
};

export const ModalContentPassword: FC<ModalProps> = (props: ModalProps) => {
  const { active, onEncypt, setPassword } = props;

  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  return (
    <div className={`${modalChild.modalContent} ${active ? animation.slideDown : ""}`}>
      <div className={`${modalChild.modalTitle} ${active ? animation.slideDown : ""}`}>
        <p>
          <span className={modalChild.modalTitleBold}>Hinomaru</span>
        </p>
      </div>
      <div className={modalChild.modalIconContainer}></div>
      <div className={`${modalChild.modalInputBox}  ${active ? animation.slideDown : animation.slideUp}`}>
        <input type="text" placeholder="password" onChange={handleChangePassword} />
      </div>
      <button
        className={`${modalChild.modalButton} ${active ? animation.slideDown : animation.slideUp}`}
        onClick={onEncypt}
      >
        Encrypt
      </button>
      <div className={modalChild.modalTextAdditional}>
        <p>Privacy・Terms</p>
      </div>
    </div>
  );
};
