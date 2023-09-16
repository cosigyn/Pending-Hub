interface PendingObject {
	UserId: string;
	UserName: string;
	Defender: boolean;
	Raider: boolean;
	AccountAge: number;
	PendTime: number;
}

export class PendingQueueService {
	private static instance: PendingQueueService;
	private pendingQueue: PendingObject[] = [];

	public static getService(): PendingQueueService {
		if (PendingQueueService.instance === undefined) {
			PendingQueueService.instance = new PendingQueueService();
		}

		return PendingQueueService.instance;
	}
}
