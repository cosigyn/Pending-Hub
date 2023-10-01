import Roact, { useEffect, useState } from "@rbxts/roact";

import { useRem } from "../hooks/use-rem";
import { TeamPage } from "./teamPage";
import { dark } from "../utils/palette";
import { Button } from "./button";
import { PendingPlayer } from "./pendingPlayer";
import { selectPendingDefenders, selectPendingRaiders } from "reserved-server/shared/selectors";
import { useSelector } from "@rbxts/react-reflex";
import { Players } from "@rbxts/services";

export function PendPage() {
	const defenders = useSelector(selectPendingDefenders);
	const raiders = useSelector(selectPendingRaiders);

	const rem = useRem();
	return (
		<>
			<TeamPage key={"defenders"} name={"Defenders"} position={UDim2.fromOffset(rem(2.04), rem(8.85))}>
				{defenders.map((player) => {
					const [image, ready] = Players.GetUserThumbnailAsync(
						tonumber(player.UserId)!,
						Enum.ThumbnailType.HeadShot,
						Enum.ThumbnailSize.Size420x420,
					);
					return (
						<PendingPlayer
							key={player.UserId}
							name={player.UserName}
							rank={player.Rank}
							displayOrder={player.PendTime}
							xplt={true}
							dgn={true}
							// eslint-disable-next-line roblox-ts/lua-truthiness
							image={image && ready ? image : "rbxassetid://0"}
						/>
					);
				})}
			</TeamPage>
			<frame
				key={"line2"}
				BackgroundTransparency={0.5}
				Size={UDim2.fromOffset(rem(0.063), rem(28.04598))}
				Position={UDim2.fromOffset(rem(30.58), rem(8.9))}
				BackgroundColor3={dark["on-background"]}
				BorderSizePixel={0}
			/>
			<TeamPage key={"raiders"} name={"Raiders"} position={UDim2.fromOffset(rem(32.61), rem(8.85))}>
				{raiders.map((player) => {
					const [image, ready] = Players.GetUserThumbnailAsync(
						tonumber(player.UserId)!,
						Enum.ThumbnailType.HeadShot,
						Enum.ThumbnailSize.Size420x420,
					);
					return (
						<PendingPlayer
							key={player.UserId}
							name={player.UserName}
							rank={player.Rank}
							displayOrder={player.PendTime}
							xplt={true}
							dgn={true}
							// eslint-disable-next-line roblox-ts/lua-truthiness
							image={image && ready ? image : "rbxassetid://0"}
						/>
					);
				})}
			</TeamPage>
			<frame
				key={"line3"}
				BackgroundTransparency={0.5}
				Size={UDim2.fromOffset(rem(61.19031), rem(0.0625))}
				Position={UDim2.fromOffset(rem(0), rem(36.95))}
				BackgroundColor3={dark["on-background"]}
				BorderSizePixel={0}
			/>
			<frame
				key={"ButtonContainer"}
				BackgroundTransparency={1}
				Size={UDim2.fromOffset(rem(57.05331), rem(5.50263))}
				Position={UDim2.fromOffset(rem(2.04), rem(36.96))}
			>
				<uilistlayout
					key={"ButtonLayout"}
					FillDirection={Enum.FillDirection.Horizontal}
					HorizontalAlignment={Enum.HorizontalAlignment.Center}
					SortOrder={Enum.SortOrder.LayoutOrder}
					VerticalAlignment={Enum.VerticalAlignment.Center}
					Padding={new UDim(0, rem(0.66569))}
				/>
				<Button
					key={"accept-all-players"}
					size={UDim2.fromOffset(rem(6.08888), rem(1.375))}
					text={"Accept All"}
					layoutOrder={1}
				/>
				<Button
					key={"reject-all-players"}
					size={UDim2.fromOffset(rem(6.08888), rem(1.375))}
					text={"Reject All"}
					layoutOrder={2}
				/>
				<Button
					key={"accept-oldest-player"}
					size={UDim2.fromOffset(rem(8.71694), rem(1.375))}
					text={"Accept Oldest"}
					layoutOrder={3}
				/>
				<Button
					key={"reject-mercs"}
					size={UDim2.fromOffset(rem(7.86713), rem(1.375))}
					text={"Reject Mercs"}
					layoutOrder={4}
				/>
			</frame>
		</>
	);
}
