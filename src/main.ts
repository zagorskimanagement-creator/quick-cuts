import "./ui/styles.css";
import { initApp } from "./ui/App";

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp);
} else {
  initApp();
}
