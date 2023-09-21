/* 

░█████╗░██╗░░░░░░█████╗░███╗░░██╗░██╗░░░░░░░██╗░█████╗░██████╗░███████╗
██╔══██╗██║░░░░░██╔══██╗████╗░██║░██║░░██╗░░██║██╔══██╗██╔══██╗██╔════╝
██║░░╚═╝██║░░░░░███████║██╔██╗██║░╚██╗████╗██╔╝███████║██████╔╝█████╗░░
██║░░██╗██║░░░░░██╔══██║██║╚████║░░████╔═████║░██╔══██║██╔══██╗██╔══╝░░
╚█████╔╝███████╗██║░░██║██║░╚███║░░╚██╔╝░╚██╔╝░██║░░██║██║░░██║███████╗
░╚════╝░╚══════╝╚═╝░░╚═╝╚═╝░░╚══╝░░░╚═╝░░░╚═╝░░╚═╝░░╚═╝╚═╝░░╚═╝╚══════╝

██████╗░███████╗███╗░░██╗██████╗░██╗███╗░░██╗░██████╗░   ██╗░░██╗██╗░░░██╗██████╗░
██╔══██╗██╔════╝████╗░██║██╔══██╗██║████╗░██║██╔════╝░   ██║░░██║██║░░░██║██╔══██╗
██████╔╝█████╗░░██╔██╗██║██║░░██║██║██╔██╗██║██║░░██╗░   ███████║██║░░░██║██████╦╝
██╔═══╝░██╔══╝░░██║╚████║██║░░██║██║██║╚████║██║░░╚██╗   ██╔══██║██║░░░██║██╔══██╗
██║░░░░░███████╗██║░╚███║██████╔╝██║██║░╚███║╚██████╔╝   ██║░░██║╚██████╔╝██████╦╝
╚═╝░░░░░╚══════╝╚═╝░░╚══╝╚═════╝░╚═╝╚═╝░░╚══╝░╚═════╝░   ╚═╝░░╚═╝░╚═════╝░╚═════╝░

*/

// Configuration

export const config: {
	defenderGroupIds: number[];
	raiderGroupIds?: number[];
	autoAcceptDefenders: boolean;
	autoAcceptRaiders: boolean;
	autoAcceptOldestPending: boolean;
	autoDeclineMercenaries: boolean;
	autoDeclineNewAccounts: boolean;
	minimumAccountAge: number;
	maximumPlayerCount: number;

	adminGroupId: number;
	adminRank: number;
	admins?: number[];
} = {
	//required
	defenderGroupIds: [],
	autoAcceptDefenders: true,
	autoAcceptRaiders: true,
	autoAcceptOldestPending: true,
	autoDeclineMercenaries: true,
	autoDeclineNewAccounts: true,
	minimumAccountAge: 0,
	maximumPlayerCount: 0,
	adminGroupId: 0,
	adminRank: 0,
	// not required
	admins: [],
	raiderGroupIds: [],
};
