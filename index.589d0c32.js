function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},s={},o=t.parcelRequired7c6;null==o&&((o=function(e){if(e in n)return n[e].exports;if(e in s){var t=s[e];delete s[e];var o={id:e,exports:{}};return n[e]=o,t.call(o.exports,o,o.exports),o.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,t){s[e]=t},t.parcelRequired7c6=o);var i=o("iUlH6");const r=document.querySelector(".footer__link"),d=document.querySelector(".team-backdrop"),l=document.querySelector("body");let c="";let a=document.documentElement.clientWidth;r.addEventListener("click",(function(){d.classList.remove("is-hidden"),l.classList.add("stop-scroll"),a<1200?c=new(e(i))(".team-modal",{effect:"cards",grabCursor:!0}):a>=1200&&(c=new(e(i))(".team-modal",{effect:"flip",grabCursor:!0,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"}}))})),d.addEventListener("click",(function({target:e}){"IMG"!==e.nodeName&&"swiper-button-next"!==e.classList[0]&&"swiper-button-prev"!==e.classList[0]&&(d.classList.add("is-hidden"),l.classList.remove("stop-scroll"),c.destroy(!0,!0))})),document.addEventListener("keydown",(function(e){if(!d.classList.contains("is-hidden")&&!d.classList.contains("is-hidden")){if("Escape"!==e.key)return;d.classList.add("is-hidden"),l.classList.remove("stop-scroll"),c.destroy(!0,!0)}}));
//# sourceMappingURL=index.589d0c32.js.map
