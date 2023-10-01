/* eslint-disable roblox-ts/lua-truthiness */
/* eslint-disable no-undef */
const fs = require("fs");
const process = require("process");
const npm_package_version = process.env.npm_package_version;
const currentYear = new Date().getFullYear();
const currentDateInWords = new Date().toLocaleDateString("en-US", {
	year: "numeric",
	month: "long",
	day: "numeric",
});

let rev = fs.readFileSync(".git/HEAD").toString().trim();
if (rev.indexOf(":") !== -1) {
	rev = fs
		.readFileSync(".git/" + rev.substring(5))
		.toString()
		.trim();
}
rev = rev.slice(0, 7);

const files = [];
const readDirRecursive = (dir) => {
	fs.readdirSync(dir, { withFileTypes: true }).forEach((dirent) => {
		if (dirent.isDirectory()) {
			readDirRecursive(`${dir}/${dirent.name}`);
		} else {
			files.push(`${dir}/${dirent.name}`);
		}
	});
};
readDirRecursive("./out");

files
	.filter((f) => f.endsWith(".lua"))
	.forEach((f) => {
		let content = fs.readFileSync(`${f}`, "utf8");
		const lines = content.split("\n");
		if (lines[0].startsWith("-- Compiled with roblox-ts")) {
			lines.shift();
			content = lines.join("\n");
		}
		if (!content.startsWith("--[[")) {
			fs.writeFileSync(
				`${f}`,
				`--[[ Copyright (c) Clanware ${currentYear}.
MIT License, see LICENSE.lua for more information.
Clanware Pending Hub Version ${npm_package_version}. Commit ${rev}.
These files are compiled automatically with roblox-ts, do not edit.
Compiled on ${currentDateInWords}. ]]\n` + content,
			);
		}
	});
