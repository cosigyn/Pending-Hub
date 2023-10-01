import Roact from "@rbxts/roact";
import { fonts } from "../utils/fonts";
import { dark } from "../utils/palette";
import { useRem } from "../hooks/use-rem";

interface ButtonProps {
	size?: UDim2;
	position?: UDim2;
	onClick?: () => void;
	text?: string;
	layoutOrder?: number;
}

export function Button({ size, position, onClick, text, layoutOrder }: ButtonProps) {
	const rem = useRem();

	return (
		<frame key={"buttonFrame"} LayoutOrder={layoutOrder} BackgroundTransparency={1} Position={position} Size={size}>
			<textbutton
				key={"button"}
				BackgroundTransparency={1}
				Size={UDim2.fromScale(1, 1)}
				FontFace={fonts.inter.semiBold}
				Text={text}
				TextColor3={dark["on-background"]}
				TextSize={rem(1.125)}
				Event={{
					MouseButton1Click: onClick,
				}}
			/>
			<uistroke key={"stroke"} Color={dark["on-background"]} Thickness={rem(0.063)} />
		</frame>
	);
}
