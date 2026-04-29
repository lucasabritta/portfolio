import { THEME_STORAGE_KEY } from "./theme-storage";

/** Runs in <head> before paint to avoid flash of wrong theme (pairs with ThemeProvider). */
export function themeInlineBootstrapScript(): string {
  const key = JSON.stringify(THEME_STORAGE_KEY);
  return `!function(){try{var k=${key},s=localStorage.getItem(k),sys=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light",r="light"===s||"dark"===s?s:sys,t="light"===s||"dark"===s||"system"===s?s:"system";document.documentElement.dataset.theme=r,document.documentElement.dataset.themePreference=t}catch(e){}}();`;
}
