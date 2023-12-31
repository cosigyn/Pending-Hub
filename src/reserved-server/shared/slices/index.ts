import { CombineStates } from "@rbxts/reflex";
import { adminsSlice } from "./admins";
import { pendingSlice } from "./pendingQueue";
import { settingsSlice } from "./settings";

export * from "./admins";
export * from "./pendingQueue";
export * from "../../../shared/types";
export * from "./settings";

export type SharedState = CombineStates<typeof slices>;

export const slices = {
	admins: adminsSlice,
	pending: pendingSlice,
	settings: settingsSlice,
};
