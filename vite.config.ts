import type { Plugin } from "vite"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { COLOR_MODE_STORAGE_KEY, getStorageScript } from "@workspaces/ui"
import { config } from "@workspaces/theme"

function injectColorModeScript(): Plugin {
  return {
    name: "inject-color-mode-script",
    transformIndexHtml(html) {
      const content = getStorageScript(
        "colorMode",
        COLOR_MODE_STORAGE_KEY,
      )({ defaultValue: config.defaultColorMode })

      return html.replace("<body>", `<body><script>${content}</script>`)
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), injectColorModeScript()],
})