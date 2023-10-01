import { PendingObject, SharedState } from "../../shared/slices";

export const selectPendingPlayer = (userId: number) => {
	return (state: SharedState) => {
		return state.pending[userId];
	};
};

export const selectPendingPlayers = (state: SharedState) => {
	return state.pending;
};

export const selectPendingDefenders = (state: SharedState) => {
	const defenders = new Array<PendingObject>();
	for (const [, pending] of pairs(state.pending)) {
		if (pending.Defender) {
			defenders.push(pending);
		}
	}
	return defenders;
};

export const selectPendingRaiders = (state: SharedState) => {
	const raiders = new Array<PendingObject>();
	for (const [, pending] of pairs(state.pending)) {
		if (!pending.Defender) {
			raiders.push(pending);
		}
	}
	return raiders;
};

export const selectPendingMercenaries = (state: SharedState) => {
	const mercenaries = new Array<PendingObject>();
	for (const [, pending] of pairs(state.pending)) {
		if (!pending.Defender && !pending.Raider) {
			mercenaries.push(pending);
		}
	}
	return mercenaries;
};
