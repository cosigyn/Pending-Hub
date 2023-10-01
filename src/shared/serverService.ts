import { MemoryStoreService } from "@rbxts/services";

export interface Server {
	readonly privateServerId: string;
	name?: string;
	readonly accessCode: string;
	playerCount?: number;
	maxPlayers?: number;
	region?: string;
	readonly owner: string;
}

export const Servers = MemoryStoreService.GetSortedMap("CW/PendHub/Servers");
type Method = () => unknown;

function withRetry(method: Method, retry = 0, errorMessage: string) {
	if (retry < 5) {
		const [success, result] = pcall(method);
		if (success) {
			return result;
		}
		warn(`[CLANWARE - PENDHUB] ${errorMessage} after ${retry + 1} attempt(s). ${result}`);
		task.wait(2);
		return withRetry(method, retry + 1, errorMessage);
	}
	error(`[CLANWARE - PENDHUB] ${errorMessage} after 5 attempts.`);
}

export function createServer(server: Server) {
	withRetry(
		() => Servers.SetAsync(server.privateServerId, server, 3_888_000),
		0,
		`Failed to create server ${server.privateServerId}`,
	);
}

export function deleteServer(privateServerId: string) {
	withRetry(() => Servers.RemoveAsync(privateServerId), 0, `Failed to delete server ${privateServerId}`);
}

export function updateServer(server: Server) {
	withRetry(
		() => Servers.SetAsync(server.privateServerId, server, 3_888_000),
		0,
		`Failed to update server ${server.privateServerId}`,
	);
}

export function getServer(privateServerId: string = game.PrivateServerId): Server | undefined {
	return withRetry(
		() => Servers.GetAsync(privateServerId) as Server,
		0,
		`Failed to get server ${privateServerId}`,
	) as Server;
}

export function listServers(): Server[] {
	return withRetry(
		() => Servers.GetRangeAsync(Enum.SortDirection.Ascending, 100) as Server[],
		0,
		`Failed to list servers`,
	) as Server[];
}
