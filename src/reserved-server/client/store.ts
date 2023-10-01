import { InferState, combineProducers, loggerMiddleware } from "@rbxts/reflex";
import { slices } from "../shared/slices";
import { UseProducerHook, UseSelectorHook, useProducer, useSelector } from "@rbxts/react-reflex";

export type RootState = InferState<typeof store>;
export const useRootSelector: UseSelectorHook<typeof store> = useSelector;
export const useRootProducer: UseProducerHook<typeof store> = useProducer;

export const store = combineProducers({
	...slices,
});
