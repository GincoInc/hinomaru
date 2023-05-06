import { useState, useEffect, ChangeEvent } from 'react';
import {
  User,
  signOut,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '@/utils/firebase';
import EIP155Lib from '@/utils/eip155';
import { useRouter } from 'next/router';
import { Core } from '@walletconnect/core';
import Web3Wallet from '@walletconnect/web3wallet';
import { buildApprovedNamespaces, parseUri } from '@walletconnect/utils';
import { hexToUtf8 } from 'web3-utils';

export default function Page() {
  return (
    <div className="mb-4">
      <LoginForm />
      <WalletConnect />
    </div>
  );
}

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [info, setInfo] = useState('');
  const { authUser, loading } = useFirebaseAuth();
  const router = useRouter();

  useEffect(() => {
    try {
      if (
        authUser == null &&
        isSignInWithEmailLink(auth, window.location.href) &&
        router.query.hasOwnProperty('email')
      ) {
        signInWithEmailLink(
          auth,
          router.query.email as string,
          window.location.href
        ).catch((e) => {
          console.error(e);
        });
      }
    } catch (e) {
      console.error(e);
    }
  }, [router.query]);

  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSendSignInLinkToEmail = async () => {
    try {
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      setInfo(`invite link has been sent to ${email}`);
    } catch (e) {
      console.error(e);
    }
  };

  const actionCodeSettings = {
    url: `http://localhost:3060/login?email=${email}`,
    handleCodeInApp: true,
  };

  return (
    <div className="bg-gray-100 p-10">
      <form className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
            User Data
          </label>
          {JSON.stringify(authUser)}
        </div>
        <div className="mb-4">{loading}</div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="john.doe@example.com"
            onChange={handleChangeEmail}
          />
        </div>
        <div className="mb-4">{info}</div>
        <div className="mb-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={() => handleSendSignInLinkToEmail()}
          >
            Send
          </button>
        </div>
        <div className="mb-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={() => signOut(auth)}
          >
            Sign Out
          </button>
        </div>
      </form>
    </div>
  );
};

export const useFirebaseAuth = () => {
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const authStateChanged = async (user: User | null) => {
    setAuthUser(user);
    if (!user) {
      setLoading(false);
      return;
    }
    setLoading(true);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, authStateChanged);
    return () => unsubscribe();
  }, []);

  return {
    authUser,
    loading,
  };
};

const WalletConnect = () => {
  const mnemonic =
    'nothing energy curtain soda almost salon fantasy gloom bronze acid pioneer tool usual ridge credit';
  const wallet = EIP155Lib.init({ mnemonic: mnemonic });

  const [uri, setURI] = useState('');
  const [web3Wallet, setWeb3Wallet] = useState<Web3Wallet | null>(null);

  useEffect(() => {
    initClient().then(() => {
      subscribeWalletConnectEvents();
    });
  }, []);

  const handleChangeURI = (e: ChangeEvent<HTMLInputElement>) => {
    setURI(e.target.value);
  };

  const initClient = async () => {
    try {
      const core = new Core({
        projectId: '9c07d121c71c8d88c76c3ca42f63eaff',
        //projectId: '6f8a8962bb902c2994c0a04af63bfd04',
      });
      console.log(web3Wallet);
      const w = await Web3Wallet.init({
        core,
        metadata: {
          name: 'hinomaru wallet',
          description: 'A wallet using WalletConnect AuthClient',
          url: 'my-auth-wallet.com',
          icons: ['https://my-auth-wallet.com/icons/logo.png'],
        },
      });
      setWeb3Wallet(w);
    } catch (e) {
      console.error(e);
    }
  };

  const subscribeWalletConnectEvents = async () => {
    if (web3Wallet === null) {
      return;
    }
    web3Wallet.on('session_proposal', async (proposal) => {
      console.log(proposal);
      const { id, params } = proposal;
      const approvedNamespaces = buildApprovedNamespaces({
        proposal: params,
        supportedNamespaces: {
          eip155: {
            chains: ['eip155:1', 'eip155:137'],
            methods: ['eth_sendTransaction', 'personal_sign'],
            events: ['accountsChanged', 'chainChanged'],
            accounts: [`eip155:1:${wallet.getAddress()}`],
          },
        },
      });
      const session = await web3Wallet.approveSession({
        id: id,
        namespaces: approvedNamespaces,
      });
      console.log(session);
    });

    web3Wallet.on('session_request', async (event) => {
      console.log(event);
      const { topic, params, id } = event;
      const { request } = params;
      const requestParamsMessage = request.params[0];

      const message = hexToUtf8(requestParamsMessage);

      const signedMessage = await wallet.signMessage(message);

      const response = { id, result: signedMessage, jsonrpc: '2.0' };

      await web3Wallet.respondSessionRequest({ topic, response });
    });

    const iss = `did:pkh:eip155:1:${wallet.getAddress()}`;
    web3Wallet.on('auth_request', async (event) => {
      // format the payload
      const message = web3Wallet.formatMessage(event.params.cacaoPayload, iss);
      // prompt the user to sign the message
      const signature = await wallet.signMessage(message);
      // respond
      await web3Wallet.respondAuthRequest(
        {
          id: event.id,
          signature: {
            s: signature,
            t: 'eip191',
          },
        },
        iss
      );
    });
  };

  const initiateWalletConnect = async () => {
    try {
      if (uri === '') {
        alert('wallet connect uri must not be empty');
        return;
      }
      const { version } = parseUri(uri);
      if (version != 2) {
        alert('wallet connect uri must be version 2');
        return;
      }
      if (web3Wallet === null) {
        alert('wallet connect is not yet initialized');
        return;
      }
      await web3Wallet!.core.pairing.pair({ uri: uri, activatePairing: true });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="bg-gray-100 p-10">
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          Wallet Connect
        </label>
        <form className="bg-white p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="email"
            >
              URI
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="uri"
              placeholder="wc:d4d741df..."
              onChange={handleChangeURI}
            />
          </div>
          <div className="mb-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={() => initiateWalletConnect()}
            >
              Connect
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
