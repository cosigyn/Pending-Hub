import { createProducer } from "@rbxts/reflex";
import { PendingObject } from "../../../shared/types";

export interface PendingState {
	readonly [player: number]: PendingObject;
}

const initialState: PendingState = {
	1: {
		UserName: "Player1",
		UserId: "1",
		Defender: true,
		Raider: false,
		AccountAge: 300,
		PendTime: 399999999993,
		Rank: "Member",
	},
};

export const pendingSlice = createProducer(initialState, {
	addPendingPlayer: (state, data: PendingObject) => {
		if (!data.Raider && !data.Defender) {
			data.Rank = "Mercenary";
		}
		return {
			...state,
			[data.UserId]: data,
		};
	},

	removePendingPlayer: (state, data: PendingObject) => ({
		// In practice 'data' can just be {userId}
		...state,
		[data.UserId]: undefined,
	}),
});
