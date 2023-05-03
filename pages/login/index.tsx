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
import { useRouter } from 'next/router';

export default function Page() {
  return (
    <div className="mb-4">
      <LoginForm />
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
