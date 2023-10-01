import { t } from "@rbxts/t";
import { config } from "index";

let folder: Folder | undefined = undefined;
if (game.PrivateServerId === "") {
	// Public Server
	folder = script.Parent?.FindFirstChild("public-server") as Folder;
} else if (game.PrivateServerOwnerId === 0) {
	folder = script.Parent?.FindFirstChild("reserved-server") as Folder;
} else {
	print("VIP Server"); // TODO: VIP Server
}

assert(
	folder !== undefined,
	"[CLANWARE - PENDHUB] Invalid server type. Only public and reserved servers are supported.",
);

const IConfig = t.interface({
	defenderGroupIds: t.array(t.number),
	raiderGroupIds: t.optional(t.array(t.number)),
	autoAcceptDefenders: t.boolean,
	autoAcceptRaiders: t.boolean,
	autoAcceptOldestPending: t.boolean,
	autoDeclineMercenaries: t.boolean,
	autoDeclineNewAccounts: t.boolean,
	minimumAccountAge: t.number,
	maximumPlayerCount: t.number,
	adminGroupId: t.number,
	adminRank: t.number,
	admins: t.optional(t.array(t.number)),
	gamePlaceId: t.optional(t.number),
	loadingScreen: t.optional(t.instanceOf("ScreenGui")),
});

export type Config = t.static<typeof IConfig>;

assert(
	IConfig(config),
	"[CLANWARE - PENDHUB] Invalid configuration. Please review the documentation for more information.",
);

for (const instance of folder.GetDescendants()) {
	if (instance.IsA("Script")) {
		instance.Disabled = false;
	}
}
