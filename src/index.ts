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
	raiderGroupIds: number[];
	autoAcceptDefenders: boolean;
	autoAcceptRaiders: boolean;
	autoAcceptOldestPending: boolean;
	autoDeclineMercenaries: boolean;
	autoDeclineNewAccounts: boolean;
	minimumAccountAge: number;
	maximumPlayerCount: number;
} = {
	defenderGroupIds: [],
	raiderGroupIds: [],
	autoAcceptDefenders: true,
	autoAcceptRaiders: true,
	autoAcceptOldestPending: true,
	autoDeclineMercenaries: true,
	autoDeclineNewAccounts: true,
	minimumAccountAge: 0,
	maximumPlayerCount: 0,
};
