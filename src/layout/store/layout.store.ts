import create from "zustand";
import { LayoutStore } from "./layout.types";

export const useLayoutStore = create<LayoutStore>((set, get) => ({
  pageTitle: "",
  setPageTitle: (pageTitle) => {
    set({
      pageTitle,
    });
  },
}));
