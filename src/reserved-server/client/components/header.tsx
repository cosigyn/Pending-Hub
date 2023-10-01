import Roact, { useState } from "@rbxts/roact";
import { Players } from "@rbxts/services";
import Object from "@rbxts/object-utils";

import { useRem } from "../hooks/use-rem";
import { dark } from "../utils/palette";
import { fonts } from "../utils/fonts";
import { useEventListener } from "@rbxts/pretty-react-hooks";
import { store } from "../store";
import { Button } from "./button";

export function Header() {
	const rem = useRem();

	const [playerCount, setPlayerCount] = useState(Players.GetPlayers().size());
	useEventListener(Players.PlayerAdded, () => setPlayerCount(Players.GetPlayers().size()));
	useEventListener(Players.PlayerRemoving, () => setPlayerCount(Players.GetPlayers().size()));

	const pendingCount = store.getState((state) => Object.keys(state.pending).size());

	return (
		<>
			{/* Logo */}
			<imagelabel
				key={"logo"}
				BackgroundTransparency={1}
				Position={UDim2.fromOffset(rem(2.07), rem(2.07))}
				Size={UDim2.fromOffset(rem(4.4485), rem(4.64675))}
				Image="rbxassetid://14872949015"
			/>
			<textlabel
				key={"title"}
				BackgroundTransparency={1}
				Position={UDim2.fromOffset(rem(7.29), rem(2.07))}
				Size={UDim2.fromOffset(rem(24.5), rem(4.6875))}
				FontFace={fonts.inter.extraBold}
				Text="Pending Hub"
				TextColor3={dark["on-background"]}
				TextSize={rem(3.875)}
				TextXAlignment={Enum.TextXAlignment.Left}
			/>
			{/* Plr count */}
			<imagelabel
				key={"player-count-image"}
				BackgroundTransparency={1}
				Position={UDim2.fromOffset(rem(35.21), rem(3.22))}
				Size={UDim2.fromOffset(rem(2.34375), rem(2.34375))}
				Image="rbxassetid://14873352039"
				ImageColor3={dark["on-background"]}
			/>
			<textlabel
				key={"player-count-text"}
				BackgroundTransparency={1}
				Position={UDim2.fromOffset(rem(38.34), rem(2.98))}
				Size={UDim2.fromOffset(rem(4.125), rem(2.8125))}
				FontFace={fonts.inter.semiBold}
				Text={`${playerCount}`}
				TextColor3={dark["on-background"]}
				TextSize={rem(2.34375)}
				TextXAlignment={Enum.TextXAlignment.Left}
			/>

			{/* Pending count */}
			<imagelabel
				key={"pending-count-image"}
				BackgroundTransparency={1}
				Position={UDim2.fromOffset(rem(44.9), rem(3.22))}
				Size={UDim2.fromOffset(rem(2.34375), rem(2.34375))}
				Image="rbxassetid://14873352324"
				ImageColor3={dark["on-background"]}
			/>
			<textlabel
				key={"pending-count-text"}
				BackgroundTransparency={1}
				Position={UDim2.fromOffset(rem(47.98), rem(2.98))}
				Size={UDim2.fromOffset(rem(4.125), rem(2.8125))}
				FontFace={fonts.inter.semiBold}
				Text={`${pendingCount}`}
				TextColor3={dark["on-background"]}
				TextSize={rem(2.34375)}
				TextXAlignment={Enum.TextXAlignment.Left}
			/>

			{/* Settings */}
			<Button
				key={"settings"}
				position={UDim2.fromOffset(rem(52.38), rem(5.34))}
				size={UDim2.fromOffset(rem(6.76075), rem(1.375))}
				text={"Settings ->"}
				onClick={() => {
					//TODO:
				}}
			/>

			{/* Exit */}
			<imagebutton
				key={"exit"}
				BackgroundTransparency={1}
				Position={UDim2.fromOffset(rem(56.8), rem(2.07))}
				Size={UDim2.fromOffset(rem(2.34375), rem(2.34375))}
				Image="rbxassetid://14875114242"
				Event={{
					MouseButton1Click: () => {
						Players.LocalPlayer.Kick("Bye!"); //TODO:
					},
				}}
			/>

			{/* Line */}
			<frame
				key={"line"}
				Position={UDim2.fromOffset(0, rem(8.85))}
				Size={new UDim2(1, 0, 0, rem(0.063))}
				BackgroundColor3={dark["on-background"]}
				BorderSizePixel={0}
				Transparency={0.5}
			/>
		</>
	);
}
