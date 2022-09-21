import { atom } from "jotai";

import { CarePlan } from "models/index.types";

export const carePlanAtom = atom<CarePlan | undefined>(undefined);
