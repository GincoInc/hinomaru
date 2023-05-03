import { useEffect, ReactElement } from "react";
import FeaturePageLayout from "@/components/layout/featurePageLayout";
import Link from "next/link";
import * as bip39 from "bip39";
import * as passworder from "@metamask/browser-passworder";

const FeatureHome = () => {
  const onLoad = async () => {
    console.log("onLoad");
    generateKey();
  };

  const generateKey = async () => {
    const mnemonic = bip39.generateMnemonic(256);
    console.log(mnemonic);
    const seed = bip39.mnemonicToSeedSync(mnemonic);
    console.log(seed);
    const password = "hunter55";
    const encrypted = await passworder.encrypt(password, seed);
    console.log(encrypted);
    const decrypted = await passworder.decrypt(password, encrypted);
    console.log(decrypted);
  };

  useEffect(() => {
    onLoad();
  }, []);

  return (
    <div className="w-full flex justify-center items-center p-3">
      <div className="w-5/12 flex flex-col items-center rounded-2xl shadow-2xl p-2">
        <div className="w-full text-lg text-white bold py-3 px-4 rounded-xl bg-blue-400">Menu</div>
        <div className="px-4 w-full text-gray-500 py-3">
          <div>
            <h2>Modals</h2>
            <div className="px-4">
              <div>
                <Link className="hover:text-yellow-400" href="/feature/login">
                  Login Modal
                </Link>
              </div>
              <div>
                <Link className="hover:text-yellow-400" href="/feature/signature">
                  Signature Modal
                </Link>
              </div>
              <div>
                <Link className="hover:text-yellow-400" href="/feature/create-transaction">
                  Create transaction Modal
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

FeatureHome.getLayout = (page: ReactElement) => {
  return <FeaturePageLayout>{page}</FeaturePageLayout>;
};

export default FeatureHome;
