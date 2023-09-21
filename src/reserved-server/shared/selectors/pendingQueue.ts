import { PendingObject, SharedState } from "../../shared/slices";

export const selectPendingPlayer = (userId: number) => {
	return (state: SharedState) => {
		return state.pending[userId];
	};
};

export const selectPendingPlayers = () => {
	return (state: SharedState) => {
		return state.pending;
	};
};
