import Roact from "@rbxts/roact";

import { Layer } from "./layer";
import { Card } from "./card";
import { useRem } from "../hooks/use-rem";
import { dark } from "../utils/palette";
import { store } from "../store";
import { ReflexProvider } from "@rbxts/react-reflex";
import { Header } from "./header";
import { PendPage } from "./pendPage";

export function App() {
	const rem = useRem();
	return (
		<ReflexProvider producer={store} key={"reflex"}>
			<Layer key={"layer"}>
				<Card
					key="background"
					size={UDim2.fromOffset(rem(61.19031), rem(42.46144))}
					position={UDim2.fromScale(0.5, 0.5)}
					anchorPoint={new Vector2(0.5, 0.5)}
					backgroundColor={dark.background}
				>
					<uicorner key={"uicorner"} CornerRadius={new UDim(0, rem(2.0625))} />
					<Header key={"header"} />
					<PendPage key={"pendPage"} />
				</Card>
			</Layer>
		</ReflexProvider>
	);
}
