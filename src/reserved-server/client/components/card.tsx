import Roact, { useEffect, useState } from "@rbxts/roact";
import { useBlurEffect } from "../hooks/use-blur";
import { useMotion } from "../hooks/use-motion";
import { useRem } from "../hooks/use-rem";
import { palette } from "../utils/palette";
import { springs } from "../utils/springs";
import { IS_MOBILE } from "reserved-server/shared/constants";

interface CardProps {
	backgroundColor?: Color3;
	size?: UDim2;
	position?: UDim2;
	anchorPoint?: Vector2;
	children?: Roact.Children;
}

export function Card({ backgroundColor = palette.blue, size, position, anchorPoint, children }: CardProps) {
	const rem = useRem();
	const [hovered, setHovered] = useState(IS_MOBILE);
	const [cardPosition, cardPositionMotion] = useMotion(0);
	const [cardTransparency, cardTransparencyMotion] = useMotion(0);
	const setBlurAmount = useBlurEffect();

	useEffect(() => {
		if (hovered) {
			setBlurAmount(24);
			cardPositionMotion.spring(rem(0.5), springs.responsive);
			cardTransparencyMotion.spring(0, springs.responsive);

			return;
		}
		setBlurAmount(0);
		cardPositionMotion.spring(0, springs.responsive);
		cardTransparencyMotion.spring(0.7, springs.responsive);
	}, [hovered, backgroundColor, rem]);

	return (
		<frame key={"centerFrame"} BackgroundTransparency={1} AnchorPoint={anchorPoint} Size={size} Position={position}>
			<frame
				key={"cardFrame"}
				Size={UDim2.fromScale(1, 1)}
				BackgroundTransparency={cardTransparency}
				Position={cardPosition.map((y) => new UDim2(0, 0, 0, y))}
				BackgroundColor3={backgroundColor}
				BorderSizePixel={0}
				Active={true}
				Event={{
					MouseEnter: () => setHovered(true),
					MouseLeave: () => (IS_MOBILE ? setHovered(true) : setHovered(false)),
				}}
			>
				{children}
			</frame>
		</frame>
	);
}
