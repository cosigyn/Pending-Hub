export class Condition {
	constructor(private readonly condition: string) {}

	public getCondition(): string {
		return this.condition;
	}
}
