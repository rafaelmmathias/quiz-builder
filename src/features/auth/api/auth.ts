import {
  CompleteFn,
  ErrorFn,
  getAuth,
  GoogleAuthProvider,
  NextOrObserver,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  User,
} from "firebase/auth";

export const login = async () => {
  const auth = getAuth();
  return await signInWithPopup(auth, new GoogleAuthProvider());
};

export const logout = async () => {
  const auth = getAuth();
  await signOut(auth);
};

export const onValidateSession = (
  nextOrObserver: NextOrObserver<User>,
  error?: ErrorFn,
  completed?: CompleteFn
) => {
  const auth = getAuth();

  return onAuthStateChanged(auth, nextOrObserver, error, completed);
};
