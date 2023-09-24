import Roact, { useState } from "@rbxts/roact";
import { Players } from "@rbxts/services";
import Object from "@rbxts/object-utils";

import { Layer } from "./layer";
import { Card } from "./card";
import { useRem } from "../hooks/use-rem";
import { dark } from "../utils/palette";
import { fonts } from "../utils/fonts";
import { useEventListener } from "@rbxts/pretty-react-hooks";
import { store, useRootSelector } from "../store";
import { ReflexProvider } from "@rbxts/react-reflex";

export function App() {
	const rem = useRem();
	const [playerCount, setPlayerCount] = useState(Players.GetPlayers().size());
	useEventListener(Players.PlayerAdded, () => setPlayerCount(Players.GetPlayers().size()));
	useEventListener(Players.PlayerRemoving, () => setPlayerCount(Players.GetPlayers().size()));

	const pendingCount = useRootSelector((state) => Object.keys(state.pending).size());

	return (
		<ReflexProvider producer={store}>
			<Layer>
				<Card
					key="background"
					size={UDim2.fromOffset(rem(61.19031), rem(42.46144))}
					position={UDim2.fromScale(0.5, 0.5)}
					anchorPoint={new Vector2(0.5, 0.5)}
					backgroundColor={dark.background}
				>
					<uicorner CornerRadius={new UDim(0, rem(2.0625))} />
					{/* Logo */}
					<imagelabel
						BackgroundTransparency={1}
						Position={UDim2.fromOffset(rem(2.07), rem(2.07))}
						Size={UDim2.fromOffset(rem(4.4485), rem(4.64675))}
						Image="rbxassetid://14872949015"
					/>
					<textlabel
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
						BackgroundTransparency={1}
						Position={UDim2.fromOffset(rem(35.21), rem(3.22))}
						Size={UDim2.fromOffset(rem(2.34375), rem(2.34375))}
						Image="rbxassetid://14873352039"
						ImageColor3={dark["on-background"]}
					/>
					<textlabel
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
						BackgroundTransparency={1}
						Position={UDim2.fromOffset(rem(44.9), rem(3.22))}
						Size={UDim2.fromOffset(rem(2.34375), rem(2.34375))}
						Image="rbxassetid://14873352324"
						ImageColor3={dark["on-background"]}
					/>
					<textlabel
						BackgroundTransparency={1}
						Position={UDim2.fromOffset(rem(47.98), rem(2.98))}
						Size={UDim2.fromOffset(rem(4.125), rem(2.8125))}
						FontFace={fonts.inter.semiBold}
						Text={`${pendingCount}`}
						TextColor3={dark["on-background"]}
						TextSize={rem(2.34375)}
						TextXAlignment={Enum.TextXAlignment.Left}
					/>
				</Card>
			</Layer>
		</ReflexProvider>
	);
}
