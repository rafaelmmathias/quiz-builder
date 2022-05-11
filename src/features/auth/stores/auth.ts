import { Unsubscribe, User } from "firebase/auth";
import create from "zustand";
import { login, logout, onValidateSession } from "../api";
import { devtools } from "zustand/middleware";

type AuthStore = {
  isLoading: boolean;
  errorMessage: string;
  isAuthorized: boolean;
  isFetchingUser: boolean;
  user: User | null;
  login: () => void;
  logout: () => void;
  onValidateSession: () => Unsubscribe;
};

export const useAuthStore = create(
  devtools<AuthStore>((set, get) => ({
    isLoading: false,
    isAuthorized: false,
    isFetchingUser: false,
    user: null,
    errorMessage: "",
    onValidateSession: () => {
      set({ isFetchingUser: true });

      const onValidateSuccess = (user: User | null) => {
        if (!user) {
          set({
            isAuthorized: false,
            isFetchingUser: false,
            user: null,
            errorMessage: "",
          });
        } else {
          set({ isAuthorized: true, isFetchingUser: false, user: user });
        }
      };

      const onFailue = (error: Error) => {
        set({
          errorMessage: "Your session has expired. Please log in",
          isFetchingUser: false,
          isAuthorized: false,
          isLoading: false,
          user: null,
        });
      };

      return onValidateSession(onValidateSuccess, onFailue);
    },
    login: async () => {
      try {
        set({ isLoading: true, errorMessage: "" });

        const userCredential = await login();
        console.log("userCredential: ", userCredential);
        set({
          isAuthorized: true,
          isLoading: false,
          user: userCredential.user,
        });
      } catch (ex) {
        set({
          errorMessage: "The authentication attempt has failed.",
          isFetchingUser: false,
          isAuthorized: false,
          isLoading: false,
          user: null,
        });
      }
    },
    logout: async () => {
      set({ isLoading: true });
      await logout();
      set({
        isLoading: false,
        isAuthorized: false,
        isFetchingUser: false,
        user: null,
        errorMessage: "",
      });
    },
  }))
);
