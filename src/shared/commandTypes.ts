// Interacts with MessagingService to transmit commands between servers

import { MessagingService } from "@rbxts/services";

export type Command = {
	method: string;
	privateServerId: string;
	data: unknown;
};

export type JoinRequest = {
	userId: number;
	userName: string;
	accountAge: number;
};

export type JoinRequestResponse = {
	userId: number;
	accept?: boolean;
	message?: string;
};

// TODO: move to public-server folder
MessagingService.SubscribeAsync("@CW-PendHub/public", (message) => {
	const command = message.Data as Command;
	switch (command.method) {
		case "join-request/response": {
			// TODO: Accept join request
			const joinRequest = command.data as JoinRequestResponse;
			break;
		}
		case "bulk-action": {
			break;
		}
		case "server/update": {
			// Indicates the memory store has been updated TODO: Update state
			break;
		}
	}
});
