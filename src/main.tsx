import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";

import App from "./App";
import { isLocale } from "./content/types";
import "./styles/tokens.css";

const root = document.getElementById("root");
if (root === null) throw new Error("Missing #root element.");

const language = document.documentElement.lang;
const initialLocale = isLocale(language) ? language : "en";
const app = <StrictMode><App initialLocale={initialLocale} /></StrictMode>;

if (root.dataset.prerendered === "true") {
  hydrateRoot(root, app);
} else {
  createRoot(root).render(app);
}
