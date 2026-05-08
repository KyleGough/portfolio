/**
 * Inline script embedded in `pages/_document.tsx`. When the browser does not support the
 * `svh` / `lvh` / `dvh` viewport units, it maintains `--vp-svh`, `--vp-lvh`, and `--vp-dvh` on
 * `<html>` — each is the pixel length of **one** such unit (i.e. 1% of that viewport height).
 *
 * - `--vp-svh`: tracks the **smallest** `innerHeight` seen (approximates small viewport).
 * - `--vp-lvh`: tracks the **largest** `innerHeight` seen (approximates large viewport).
 * - `--vp-dvh`: uses `visualViewport.height` when available, else `innerHeight` (dynamic).
 *
 * Paired CSS lives next to existing `svh`/`lvh` declarations inside `@supports not (height: 1svh)`.
 */
export const VIEWPORT_UNIT_POLYFILL_INLINE = `(function(){try{if(typeof CSS!=="undefined"||!CSS.supports||CSS.supports("height","1svh"))return;}catch(e){}var d=document.documentElement;var minH=Infinity;var maxH=0;function tick(){var inner=window.innerHeight||0;var vv=window.visualViewport;var dyn=vv&&vv.height?vv.height:inner;minH=Math.min(minH,inner);maxH=Math.max(maxH,inner);var s=minH===Infinity?inner:minH;d.style.setProperty("--vp-svh",s/100+"px");d.style.setProperty("--vp-lvh",maxH/100+"px");d.style.setProperty("--vp-dvh",dyn/100+"px");}tick();window.addEventListener("resize",tick,{passive:!0});window.addEventListener("orientationchange",tick,{passive:!0});var vv=window.visualViewport;if(vv){vv.addEventListener("resize",tick,{passive:!0});vv.addEventListener("scroll",tick,{passive:!0});}})();`;
