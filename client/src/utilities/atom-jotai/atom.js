import { atom } from "jotai";
import { getUser } from "../users/users-service";

export const userAtom = atom(getUser());

export const setUserAtom = atom(null, (get, set, user) => {
  set(userAtom, user);
});

export const equipmentAtom = atom([]);

export const setEquipmentAtom = atom(null, (get, set, equipment) => {
  set(equipmentAtom, equipment);
});
