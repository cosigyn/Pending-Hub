import { RunService, UserInputService } from "@rbxts/services";

export const IS_PLUGIN = RunService.IsStudio() && !RunService.IsRunning();
export const IS_MOBILE = UserInputService.TouchEnabled;
