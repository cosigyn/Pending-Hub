import Roact from "@rbxts/roact";
import { useRem } from "../hooks/use-rem";
import { dark } from "../utils/palette";
import { fonts } from "../utils/fonts";

interface PendingPlayerProps {
	name: string;
	rank: string;
	displayOrder: number;
	xplt: boolean;
	dgn: boolean;
	image: string;
}

export function PendingPlayer({ name, rank, displayOrder, xplt, dgn, image }: PendingPlayerProps) {
	const rem = useRem();
	return (
		<frame key="pendingPlayer" BackgroundTransparency={1} Size={UDim2.fromOffset(rem(26.44219), rem(3.73363))}>
			<imagelabel
				key="image"
				BackgroundTransparency={1}
				Size={UDim2.fromOffset(rem(3.125), rem(3.125))}
				Position={UDim2.fromOffset(1, 1)}
				Image={image}
			>
				<uicorner CornerRadius={new UDim(1, 0)} />
				<uistroke key={"image-stroke"} Color={dark["on-background"]} Thickness={rem(0.063)} />
			</imagelabel>
			<textlabel
				key="name"
				BackgroundTransparency={1}
				Size={UDim2.fromOffset(rem(12.40319), rem(1.5625))}
				Position={UDim2.fromOffset(rem(3.91), 0)}
				FontFace={fonts.inter.bold}
				Text={name.upper()}
				TextColor3={dark["on-background"]}
				TextSize={rem(0.875)}
				TextXAlignment={Enum.TextXAlignment.Left}
			/>
			<textlabel
				key="rank"
				BackgroundTransparency={1}
				Size={UDim2.fromOffset(rem(12.40319), rem(1.5625))}
				Position={UDim2.fromOffset(rem(3.91), rem(1.5625))}
				FontFace={fonts.inter.light}
				Text={rank.upper()}
				TextColor3={dark["on-background"]}
				TextSize={rem(0.875)}
				TextXAlignment={Enum.TextXAlignment.Left}
			/>
			<textlabel
				key="xplt"
				BackgroundTransparency={1}
				Size={UDim2.fromOffset(rem(2.6875), rem(1.375))}
				Position={UDim2.fromOffset(rem(17.5), rem(0.04))}
				FontFace={fonts.inter.light}
				Text={xplt ? "XPLT" : ""}
				TextColor3={dark.error}
				TextSize={rem(1.125)}
			/>
			<textlabel
				key="dgn"
				BackgroundTransparency={1}
				Size={UDim2.fromOffset(rem(2.6875), rem(1.375))}
				Position={UDim2.fromOffset(rem(17.56), rem(1.71))}
				FontFace={fonts.inter.light}
				Text={dgn ? "DGN" : ""}
				TextColor3={dark.error}
				TextSize={rem(1.125)}
			/>
			<imagebutton
				key="accept"
				BackgroundTransparency={1}
				Size={UDim2.fromOffset(rem(1.95313), rem(1.95313))}
				Position={UDim2.fromOffset(rem(21.36), rem(0.39))}
				Image={"rbxassetid://14875114588"}
				AutoButtonColor={false}
			/>
			<imagebutton
				key="decline"
				BackgroundTransparency={1}
				Size={UDim2.fromOffset(rem(1.95313), rem(1.95313))}
				Position={UDim2.fromOffset(rem(24.1), rem(0.39))}
				Image={"rbxassetid://14875114772"}
				AutoButtonColor={false}
			/>
			<frame
				key={"line4"}
				Size={UDim2.fromOffset(rem(26.44219), rem(0.0625))}
				Position={UDim2.fromOffset(rem(0), rem(3.73119))}
				BorderSizePixel={0}
				BackgroundColor3={dark["on-background"]}
			/>
		</frame>
	);
}
