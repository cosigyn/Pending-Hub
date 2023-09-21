import { SharedState } from "../../shared/slices";

export const isAdmin = (userId: number) => {
	return (state: SharedState) => {
		return state.admins.admins.includes(userId);
	};
};
