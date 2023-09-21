import { createProducer } from "@rbxts/reflex";

export interface AdminState {
	readonly admins: number[];
}

const initialState: AdminState = {
	admins: [38811853],
};

export const adminsSlice = createProducer(initialState, {
	addAdmin: (state, userId: number) => ({
		...state,
		admins: [...state.admins, userId],
	}),

	removeAdmin: (state, userId: number) => ({
		...state,
		admins: state.admins.filter((id) => id !== userId),
	}),
});
