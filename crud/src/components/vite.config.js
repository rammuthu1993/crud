import React from "@vitejs/plugin-react"
import { defineConfig } from "vite";
import vitePluginRequire from "vite-plugin-require"

export default defineConfig({
	plugins: [React(),vitePluginRequire.default()],
});