import { atom } from "jotai";
import { getUser } from "../users/users-service";

export const userAtom = atom(getUser());

export const setUserAtom = atom(null, (get, set, user) => {
  set(userAtom, user);
});
