import { createProducer } from "@rbxts/reflex";
import { PendingObject } from "./types";

export interface PendingState {
	readonly [player: number]: PendingObject;
}

const initialState: PendingState = {};

export const pendingSlice = createProducer(initialState, {
	addPendingPlayer: (state, data: PendingObject) => ({
		...state,
		[data.UserId]: data,
	}),

	removePendingPlayer: (state, data: PendingObject) => ({
		...state,
		[data.UserId]: undefined,
	}),
});
