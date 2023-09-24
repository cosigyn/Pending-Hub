import { InferState, combineProducers, loggerMiddleware } from "@rbxts/reflex";
import { slices } from "../shared/slices";
import { UseSelectorHook, useSelector } from "@rbxts/react-reflex";

export type RootState = InferState<typeof store>;
export const useRootSelector: UseSelectorHook<typeof store> = useSelector;

export const store = combineProducers({
	...slices,
});
