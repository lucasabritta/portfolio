import { PRESERVED_PARAMS_STORAGE_KEY } from "./query-params-storage-key";

/** Runs in `<head>` before React so `utm_*` land in sessionStorage before any link click. */
export function queryParamsInlineBootstrapScript(): string {
  const key = JSON.stringify(PRESERVED_PARAMS_STORAGE_KEY);
  return `!function(){try{var k=${key},s=location.search;if(!s)return;var p=new URLSearchParams(s),o={},h=!1;p.forEach(function(v,q){if(q.indexOf("utm_")===0){o[q]=v;h=!0}});if(!h)return;var e={};try{e=JSON.parse(sessionStorage.getItem(k)||"{}")}catch(n){}var m=Object.assign({},e,o);sessionStorage.setItem(k,JSON.stringify(m))}catch(n){}}();`;
}
