var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},a={},n=e.parcelRequired7c6;null==n&&((n=function(e){if(e in t)return t[e].exports;if(e in a){var n=a[e];delete a[e];var r={id:e,exports:{}};return t[e]=r,n.call(r.exports,r,r.exports),r.exports}var l=new Error("Cannot find module '"+e+"'");throw l.code="MODULE_NOT_FOUND",l}).register=function(e,t){a[e]=t},e.parcelRequired7c6=n);var r=n("1ikH7");n("9t6Mr");var l=n("38cRt"),i=n("7ol1T"),o=n("5MPmM");o.refs.btnHeaderEl.addEventListener("click",u);const s=new(0,l.MovieApi),c=(0,i.getOnLocalStorage)("queue")||[],d=(0,i.getOnLocalStorage)("watched")||[];async function f(e){try{const t=(await async function(e){const t=e.map((async e=>{s.id=e;return await s.fetchMovieById()}));return await Promise.all(t)}(e)).map((e=>e.data)),a=t.map((e=>e.genres.map((e=>e.id||[]))));t.map(((e,t)=>e.genre_ids=a[t]));o.refs.galleryEl.innerHTML=(0,r.makeMarkup)(t)}catch(e){console.log(e.message)}}function u(e){"BUTTON"===e.target.nodeName&&("watched"===e.target.dataset.action?(f(d),o.refs.btnGelleryWatchedEl.classList.add("active"),o.refs.btnGelleryQueueEl.classList.remove("active")):(e.target.dataset.action,f(c),o.refs.btnGelleryQueueEl.classList.add("active"),o.refs.btnGelleryWatchedEl.classList.remove("active")))}0!==c.length?f(c):console.log("no queue"),o.refs.btnHeaderEl.addEventListener("click",u);
//# sourceMappingURL=library.4e26b622.js.map
