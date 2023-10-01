import { createProducer } from "@rbxts/reflex";
import { config } from "index";
import { getServer } from "shared/serverService";

export interface SettingsState {
	readonly serverName?: string;
	readonly maxPlayers?: number;
	readonly autoAcceptDefenders?: boolean;
	readonly autoAcceptRaiders?: boolean;
	readonly autoAcceptOldestPending?: boolean;
	readonly autoDeclineMercenaries?: boolean;
	readonly autoDeclineNewAccounts?: boolean;
	readonly minimumAccountAge?: number;
	readonly defenderGroupIds?: number[];
	readonly raiderGroupIds?: number[];
}

const initialState: SettingsState = {
	serverName: getServer()!.name,
	maxPlayers: config.maximumPlayerCount,
	autoAcceptDefenders: config.autoAcceptDefenders,
	autoAcceptRaiders: config.autoAcceptRaiders,
	autoAcceptOldestPending: config.autoAcceptOldestPending,
	autoDeclineMercenaries: config.autoDeclineMercenaries,
	autoDeclineNewAccounts: config.autoDeclineNewAccounts,
	minimumAccountAge: config.minimumAccountAge,
	defenderGroupIds: config.defenderGroupIds,
	raiderGroupIds: config.raiderGroupIds,
};

export const settingsSlice = createProducer(initialState, {
	updateSettings: (state, data: Partial<SettingsState>) => ({
		// Only need to provide the settings that are being changed. data should be a partial of SettingsState.
		...state,
		...data,
	}),
});
