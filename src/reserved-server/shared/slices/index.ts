import { CombineStates } from "@rbxts/reflex";
import { adminsSlice } from "./admins";
import { pendingSlice } from "./pendingQueue";

export * from "./admins";
export * from "./pendingQueue";
export * from "../../types/types";

export type SharedState = CombineStates<typeof slices>;

export const slices = {
	admins: adminsSlice,
	pending: pendingSlice,
};
