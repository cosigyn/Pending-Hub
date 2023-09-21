import { PendingObject } from "reserved-server/shared/slices";

type DecisionType = "approve" | "reject" | "manual";

export class Condition {
	constructor(
		private readonly conditionFn: (data: PendingObject) => boolean,
		private readonly priority: number,
		private readonly decisionType: DecisionType,
		private readonly message?: string,
	) {
		Condition.conditions.add(this);
	}

	public getPriority(): number {
		return this.priority;
	}

	public getDecisionType(): DecisionType {
		return this.decisionType;
	}

	public getMessage(): string | undefined {
		return this.message;
	}

	public isMet(data: PendingObject): boolean {
		return this.conditionFn(data);
	}

	private static conditions: Set<Condition> = new Set();

	public static checkAll(data: PendingObject): { decision: DecisionType; message?: string } {
		for (const decisionTypeValue of ["approve", "reject"]) {
			const conditionsOfType = Condition.getConditionsOfType(decisionTypeValue as DecisionType);

			if (conditionsOfType.size() > 0) {
				const sortedConditions = conditionsOfType.sort((a, b) => b.getPriority() < a.getPriority());

				for (const condition of sortedConditions) {
					// This should be in the priority order FIXME:
					if (condition.isMet(data)) {
						return { decision: decisionTypeValue as DecisionType, message: condition.getMessage() };
					}
				}
			}
		}

		return { decision: "manual" };
	}

	private static getConditionsOfType(decisionType: DecisionType): Condition[] {
		return [...Condition.conditions].filter((condition) => {
			return condition.getDecisionType() === decisionType;
		});
	}
}
