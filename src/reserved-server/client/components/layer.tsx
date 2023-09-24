import Roact from "@rbxts/roact";
import { IS_PLUGIN } from "../../shared/constants";
import { ReflexProvider } from "@rbxts/react-reflex";
import { store } from "../store";

interface LayerProps {
	displayOrder?: number;
	children?: Roact.Children;
}

export function Layer({ displayOrder, children }: LayerProps) {
	return (
		<ReflexProvider producer={store}>
			{IS_PLUGIN ? (
				<frame
					BackgroundTransparency={1}
					Size={new UDim2(1, 0, 1, 0)}
					Position={new UDim2(0, 0, 0, 0)}
					ZIndex={displayOrder}
				>
					{children}
				</frame>
			) : (
				<screengui
					DisplayOrder={displayOrder}
					IgnoreGuiInset
					ResetOnSpawn={false}
					ZIndexBehavior={Enum.ZIndexBehavior.Sibling}
				>
					{children}
				</screengui>
			)}
		</ReflexProvider>
	);
}
