import { PendingObject } from "../shared/slices";

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
