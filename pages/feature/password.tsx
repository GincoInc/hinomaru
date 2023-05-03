import { ReactElement, useState, useEffect } from "react";
import FeaturePageLayout from "@/components/layout/featurePageLayout";
import modalChild from "@styles/components/modal/login.module.scss";
import { ModalContainer } from "@/components/modalContainer";
import { ModalContentPassword } from "@/components/modal/password";
import { db, auth } from "@/utils/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import * as bip39 from "bip39";
import * as passworder from "@metamask/browser-passworder";

const FeaturePasswordModal = () => {
  const [active, setActive] = useState(false);
  const [isShowEncryptCompleteModal, setIsShowEncryptCompleteModal] = useState(false);
  const [password, setPassword] = useState<string>("");
  const [encryptedPassword, setEncryptedPassword] = useState<Promise<string>>();
  const [isModalActive, setIsModalActive] = useState(true);

  const generateMnemonicAndStore = async () => {
    if (auth.currentUser) {
      const userRef = doc(db, "users", auth.currentUser.uid);
      const userSnap = await getDoc(userRef);
      if (!userSnap.exists()) {
        console.log("generate key");
        const mnemonic = bip39.generateMnemonic(256);
        const encrypted = await passworder.encrypt(password, mnemonic);

        console.log("store key");
        await setDoc(doc(db, "users", auth.currentUser.uid), {
          uid: auth.currentUser.uid,
          encrypted: encrypted,
        });
      } else {
        console.log("key already exists");
        // TODO redirect to home
      }
    }
  };

  const onClose = () => {
    setIsModalActive(false);
  };

  useEffect(() => {}, []);

  return (
    <div className={`${modalChild.container}`}>
      <ModalContainer onClose={onClose} isModalActive={isModalActive}>
        <ModalContentPassword active={active} onEncypt={generateMnemonicAndStore} setPassword={setPassword} />
      </ModalContainer>
    </div>
  );
};

FeaturePasswordModal.getLayout = (page: ReactElement) => {
  return <FeaturePageLayout>{page}</FeaturePageLayout>;
};

export default FeaturePasswordModal;
