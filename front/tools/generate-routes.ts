import { generator } from "@tanstack/router-generator"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const root = path.resolve(__dirname, "..")

await generator(
  {
    target: "react",
    routesDirectory: "./src/routes",
    generatedRouteTree: "./src/routeTree.gen.ts",
    routeFileIgnorePrefix: "_",
    quoteStyle: "double",
    semicolons: true,
    disableTypes: false,
    addExtensions: false,
    disableLogging: false,
    disableManifestGeneration: false,
    enableRouteTreeFormatting: false,
    apiBase: "",
    routeTreeFileHeader: [],
    routeTreeFileFooter: [],
    indexToken: "index",
    routeToken: "Route"    
  },
  root
)
