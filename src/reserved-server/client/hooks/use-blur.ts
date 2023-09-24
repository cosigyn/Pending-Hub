import { useState, useEffect, useRef } from "@rbxts/roact";
import { Lighting } from "@rbxts/services";
import { useMotion } from "./use-motion";
import { springs } from "../utils/springs";
export function useBlurEffect(initialSize: number = 0) {
	const [blurInstance, setBlurInstance] = useState<BlurEffect | undefined>(undefined);
	const [, blurMotion] = useMotion(initialSize);

	useEffect(() => {
		const blur = new Instance("BlurEffect");
		blur.Size = initialSize;
		blur.Parent = Lighting;
		setBlurInstance(blur);

		return () => {
			blur.Destroy();
		};
	}, []);

	function setBlurSize(size: number) {
		blurMotion.spring(size, springs.stiff);

		blurMotion.onStep((value) => {
			if (blurInstance) {
				blurInstance.Size = value;
			}
		});
	}

	return setBlurSize;
}
