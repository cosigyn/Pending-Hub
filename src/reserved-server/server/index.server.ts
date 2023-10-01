import { config } from "index";
import { GroupService, MessagingService, Players } from "@rbxts/services";
import { store } from "./store";
import { PendingObject } from "reserved-server/shared/slices";
import { Condition } from "./condition";
import { deleteServer } from "shared/serverService";
import { Command, JoinRequest, JoinRequestResponse } from "shared/commandTypes";

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

function getPlayerRank(userId: number) {
	const groups = GroupService.GetGroupsAsync(userId);
	let rank = "Mercenary";
	let defender = false;
	let raider = false;
	let admin = false;

	if (config.admins?.includes(userId)) {
		admin = true;
	} else {
		for (const group of groups) {
			if (group.Id === config.adminGroupId) {
				if (group.Rank >= config.adminRank) {
					admin = true;
				}
				break;
			}
		}
	}

	if (admin) {
		return { rank: "Admin", defender: true, raider: true, admin: true };
	}

	for (const group of groups) {
		if (config.raiderGroupIds?.includes(group.Id)) {
			raider = true;
			rank = group.Name;
			break;
		}
	}

	const mainGroup = groups.find((group) => {
		if (group.Id !== config.defenderGroupIds[0]) {
			return;
		}
		rank = group.Role;
		defender = true;
		return true;
	});

	if (mainGroup !== undefined) {
		return { rank, defender, raider };
	}
	for (const group of groups) {
		if (config.defenderGroupIds.includes(group.Id)) {
			rank = group.Name;
			defender = true;
			break;
		}
	}

	return { rank, defender, raider };
}

MessagingService.SubscribeAsync("@CW-PendHub/reserved", (message) => {
	const command = message.Data as Command;
	if (command.privateServerId !== game.PrivateServerId) return;
	switch (command.method) {
		case "join-request/submit": {
			const joinRequest = command.data as JoinRequest;
			const { rank, defender, raider, admin } = getPlayerRank(joinRequest.userId);

			const pendingObject: PendingObject = {
				UserId: tostring(joinRequest.userId),
				UserName: joinRequest.userName,
				Defender: defender,
				Raider: raider,
				AccountAge: joinRequest.accountAge,
				PendTime: message.Sent,
				Rank: rank,
			};

			if (admin) {
				joinRequestResponse(pendingObject, true, "This account is an admin.");
				return;
			}
			const result = Condition.checkAll(pendingObject);
			if (result.decision === "approve") {
				joinRequestResponse(pendingObject, true, result.message);
			} else if (result.decision === "reject") {
				joinRequestResponse(pendingObject, false, result.message);
			} else {
				store.addPendingPlayer(pendingObject);
			}

			break;
		}
		case "join-request/cancel": {
			const joinRequest = command.data as { userId: number };
			store.removePendingPlayer(joinRequest as unknown as PendingObject);
			break;
		}
	}
});

function joinRequestResponse(data: PendingObject, accept?: boolean, message?: string) {
	MessagingService.PublishAsync(`@CW-PendHub/public`, {
		privateServerId: game.PrivateServerId,
		method: "join-request/response",
		data: {
			userId: data.UserId,
			accept,
			message,
		} as unknown as JoinRequestResponse,
	} as Command);
}

game.BindToClose(() => {
	MessagingService.PublishAsync(`@CW-PendHub/public`, {
		privateServerId: game.PrivateServerId,
		method: "server/update",
		//TODO: this should bulk decline or something
	} as Command);

	deleteServer(game.PrivateServerId);
	task.wait(10);
});

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
