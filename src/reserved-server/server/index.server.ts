import { config } from "index";
import { GroupService, MessagingService, Players } from "@rbxts/services";
import { store } from "./store";
import { isAdmin, selectPendingPlayers } from "reserved-server/shared/selectors";
import { PendingObject } from "reserved-server/shared/slices";
import { Condition } from "./condition";

for (const admin of config.admins ?? []) {
	store.addAdmin(admin);
}

function checkAdmin(player: Player) {
	const rank = player.GetRankInGroup(config.adminGroupId);
	if (rank >= config.adminRank) {
		store.addAdmin(player.UserId);
	}
}

Players.PlayerAdded.Connect(checkAdmin);
Players.GetPlayers().forEach(checkAdmin);

MessagingService.SubscribeAsync(`@CW-PendHub/JoinRequest/${game.PrivateServerId}`, (message) => {
	const data = message.Data as PendingObject;
	const result = Condition.checkAll(data);
	if (result.decision === "approve") {
		approvePlayer(data, result.message);
	} else if (result.decision === "reject") {
		rejectPlayer(data, result.message);
	} else {
		store.addPendingPlayer(data);
	}
});

MessagingService.SubscribeAsync(`@CW-PendHub/CancelJoinRequest/${game.PrivateServerId}`, (message) => {
	const data = message.Data as PendingObject; // In practice, this can be { UserId: number }
	store.removePendingPlayer(data);
});

function rejectPlayer(data: PendingObject, message?: string) {
	MessagingService.PublishAsync(`@CW-PendHub/RejectJoinRequest/${game.PrivateServerId}`, {
		UserId: data.UserId,
		message,
	});
}

function approvePlayer(data: PendingObject, message?: string) {
	MessagingService.PublishAsync(`@CW-PendHub/ApproveJoinRequest/${game.PrivateServerId}`, {
		UserId: data.UserId,
	});
}

// Condition 1: Account age
new Condition(
	(data) => {
		return data.AccountAge <= config.minimumAccountAge && config.autoDeclineNewAccounts;
	},
	3,
	"reject",
	"This account is too new to join this server.",
);

// Condition 2: Decline mercenaries
new Condition(
	(data) => {
		return !data.Defender && !data.Raider && config.autoDeclineMercenaries;
	},
	3,
	"reject",
	"Mercenaries are not allowed to join this server.",
);

// Condition 3: Defender group
new Condition(
	(data) => {
		if (!config.autoAcceptDefenders) return false;
		const plrGroups = GroupService.GetGroupsAsync(tonumber(data.UserId)!);
		const defenderGroups = config.defenderGroupIds;
		for (const group of plrGroups) {
			if (defenderGroups.includes(group.Id)) {
				return true;
			}
		}
		return false;
	},
	2,
	"approve",
	"This account is in a defender group.",
);

// Condition 4: Raider group
new Condition(
	(data) => {
		if (!config.autoAcceptRaiders) return false;
		const plrGroups = GroupService.GetGroupsAsync(tonumber(data.UserId)!);
		const raiderGroups = config.raiderGroupIds ?? [];
		for (const group of plrGroups) {
			if (raiderGroups.includes(group.Id)) {
				return true;
			}
		}
		return false;
	},
	2,
	"approve",
	"This account is in a raider group.",
);

// Condition 5: Oldest pending
new Condition(
	(data) => {
		if (!config.autoAcceptOldestPending || Players.GetPlayers().size() < config.maximumPlayerCount) return false;
		const pending = store.getState().pending; // Object that contains objects, not array, so sort is not available. Convert to array first.
		const pendingArray = [];
		for (const [, v] of pairs(pending)) {
			pendingArray.push(v);
		}
		const oldest = pendingArray.sort((a, b) => a.PendTime < b.PendTime)[0]; //FIXME: might be wrong way around

		return oldest.UserId === data.UserId;
	},
	1,
	"approve",
	"This account is the oldest pending player.",
);
