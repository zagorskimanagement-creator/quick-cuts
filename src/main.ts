/**
 * Quick Transition Builder — Entry Point
 * Loaded by index.html as a module script.
 * Initialises the UI after the DOM is ready.
 */
import { initApp } from "./ui/App";

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp);
} else {
  initApp();
}
