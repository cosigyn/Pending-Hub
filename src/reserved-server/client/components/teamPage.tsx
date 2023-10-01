import Roact from "@rbxts/roact";
import { useRem } from "../hooks/use-rem";
import { fonts } from "../utils/fonts";
import { dark } from "../utils/palette";
import { Button } from "./button";

interface TeamPageProps {
	name: string;
	position: UDim2;
	children?: Roact.Children;
}

export function TeamPage({ name, position, children }: TeamPageProps) {
	const rem = useRem();
	return (
		<frame
			key="teamPage"
			BackgroundTransparency={1}
			Size={UDim2.fromOffset(rem(26.4705), rem(28.11369))}
			Position={position}
		>
			<textlabel
				key="name"
				BackgroundTransparency={1}
				Size={UDim2.fromOffset(rem(11.875), rem(2.8125))}
				Position={UDim2.fromOffset(rem(0.03), rem(0.64))}
				FontFace={fonts.inter.semiBold}
				Text={name}
				TextColor3={dark["on-background"]}
				TextSize={rem(2.34375)}
				TextXAlignment={Enum.TextXAlignment.Left}
			/>
			<Button
				key={"accept-all"}
				size={UDim2.fromOffset(rem(6.08888), rem(1.375))}
				position={UDim2.fromOffset(rem(13.46), rem(1.375))}
				text={"Accept All"}
			/>
			<Button
				key={"reject-all"}
				size={UDim2.fromOffset(rem(6.08888), rem(1.375))}
				position={UDim2.fromOffset(rem(20.35), rem(1.375))}
				text={"Reject All"}
			/>
			<scrollingframe
				key={"penders"}
				BackgroundTransparency={1}
				Size={UDim2.fromOffset(rem(26.4705), rem(24.01869))}
				Position={UDim2.fromOffset(rem(0), rem(4.095))}
				AutomaticCanvasSize={Enum.AutomaticSize.Y}
				ScrollBarThickness={0}
				CanvasSize={UDim2.fromScale(1, 1)}
			>
				<uilistlayout
					key={"penders-layout"}
					FillDirection={Enum.FillDirection.Vertical}
					SortOrder={Enum.SortOrder.LayoutOrder}
					VerticalAlignment={Enum.VerticalAlignment.Top}
					Padding={new UDim(0, rem(0.63856))}
				/>
				{children}
			</scrollingframe>
		</frame>
	);
}
