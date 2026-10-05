import adapterStatic from "@sveltejs/adapter-static";
import adapterNode from "@sveltejs/adapter-node";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import process from "node:process";

/**
 * Tauri provides TAURI_ENV_PLATFORM when it runs the
 * frontend's beforeDevCommand / beforeBuildCommand.
 *
 * When that variable exists, we build a static SPA for Tauri.
 *
 * When it does not exist, we build a normal Node-powered
 * SvelteKit application for the web.
 */
const isTauriBuild = Boolean(process.env.TAURI_ENV_PLATFORM);

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		adapter: isTauriBuild
			? adapterStatic({
					fallback: "index.html",
				})
			: adapterNode(),
	},
};

export default config;