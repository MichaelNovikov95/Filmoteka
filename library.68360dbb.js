!function(){function e(e){return e&&e.__esModule?e.default:e}var n="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},r={},t={},o=n.parcelRequired7c6;null==o&&((o=function(e){if(e in r)return r[e].exports;if(e in t){var n=t[e];delete t[e];var o={id:e,exports:{}};return r[e]=o,n.call(o.exports,o,o.exports),o.exports}var a=new Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}).register=function(e,n){t[e]=n},n.parcelRequired7c6=o);var a=o("bpxeT"),l=o("2TvXO"),s=o("lyDIR");o("1oqgH");var c=o("BRQVA"),i=o("1hEYs"),u=o("lyT68");u.refs.btnHeaderEl.addEventListener("click",b);var f=new(0,c.MovieApi);(0,i.saveOnLocalStorag)("watched",453395);var d=[725201,453395,756999,718789,438148],p=[861072,545611,639933,414906,361743];function v(e){return g.apply(this,arguments)}function g(){return(g=e(a)(e(l).mark((function n(r){var t,o,a,c;return e(l).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,console.log("start1"),e.next=4,h(r);case 4:t=e.sent,console.log(t),o=t.map((function(e){return e.data})),console.log(o),a=o.map((function(e){return e.genres.map((function(e){return e.id||[]}))})),console.log(a),c=o.map((function(e,n){return e.genre_ids=a[n]})),console.log(c),u.refs.galleryEl.innerHTML=(0,s.makeMarkup)(o),e.next=18;break;case 15:e.prev=15,e.t0=e.catch(0),console.log(e.t0.message);case 18:case"end":return e.stop()}}),n,null,[[0,15]])})))).apply(this,arguments)}function h(e){return y.apply(this,arguments)}function y(){return y=e(a)(e(l).mark((function n(r){var t,o;return e(l).wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return t=r.map(function(){var n=e(a)(e(l).mark((function n(r){var t;return e(l).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return f.id=r,console.log(f.id),e.next=4,f.fetchMovieById();case 4:return t=e.sent,console.log(t),e.abrupt("return",t);case 7:case"end":return e.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}()),n.next=3,Promise.all(t);case 3:return o=n.sent,n.abrupt("return",o);case 5:case"end":return n.stop()}}),n)}))),y.apply(this,arguments)}function b(e){"BUTTON"===e.target.nodeName&&("watched"===e.target.dataset.action?(v(p),u.refs.btnGelleryWatchedEl.classList.add("active"),u.refs.btnGelleryQueueEl.classList.remove("active")):(e.target.dataset.action,v(d),u.refs.btnGelleryQueueEl.classList.add("active"),u.refs.btnGelleryWatchedEl.classList.remove("active")))}console.log(d),console.log(u.refs.refLibreryHeaderEl),console.log(u.refs.galleryEl),0!==d.length?v(d):console.log("no queue"),u.refs.btnHeaderEl.addEventListener("click",b)}();
//# sourceMappingURL=library.68360dbb.js.map
