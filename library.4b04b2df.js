!function(){function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},r={},a=t.parcelRequired7c6;null==a&&((a=function(e){if(e in n)return n[e].exports;if(e in r){var t=r[e];delete r[e];var a={id:e,exports:{}};return n[e]=a,t.call(a.exports,a,a.exports),a.exports}var o=new Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(e,t){r[e]=t},t.parcelRequired7c6=a);var o=a("bpxeT"),c=a("2TvXO"),l=a("lyDIR");a("1oqgH");var i=a("BRQVA"),s=a("1hEYs"),u=a("lyT68");a("jLvu0");var d=a("1BmHy");a("1BmHy"),a("1BmHy"),d=a("1BmHy");a("jLvu0");var f=a("dEUUr");console.log(window.location.href),u.refs.btnHeaderEl.addEventListener("click",w),u.refs.galleryEl.addEventListener("click",d.onGalleryContainerClick);var p=new(0,i.MovieApi),v=(0,s.getOnLocalStorage)(f.localStorageKeyQueue)||[],g=(0,s.getOnLocalStorage)(f.localStorageKeyWatched)||[];function y(e){return h.apply(this,arguments)}function h(){return(h=e(o)(e(c).mark((function t(n){var r,a,o;return e(c).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,m(n);case 3:r=e.sent,a=r.map((function(e){return e.data})),o=a.map((function(e){return e.genres.map((function(e){return e.id||[]}))})),a.map((function(e,t){return e.genre_ids=o[t]})),u.refs.galleryEl.innerHTML=(0,l.makeMarkup)(a),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(0),console.log(e.t0.message);case 13:case"end":return e.stop()}}),t,null,[[0,10]])})))).apply(this,arguments)}function m(e){return E.apply(this,arguments)}function E(){return E=e(o)(e(c).mark((function t(n){var r,a;return e(c).wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=n.map(function(){var t=e(o)(e(c).mark((function t(n){var r;return e(c).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return p.id=n,e.next=3,p.fetchMovieById();case 3:return r=e.sent,e.abrupt("return",r);case 5:case"end":return e.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()),t.next=3,Promise.all(r);case 3:return a=t.sent,t.abrupt("return",a);case 5:case"end":return t.stop()}}),t)}))),E.apply(this,arguments)}function w(e){"BUTTON"===e.target.nodeName&&("watched"===e.target.dataset.action?(y(g),u.refs.btnGelleryWatchedEl.classList.add("active"),u.refs.btnGelleryQueueEl.classList.remove("active")):(e.target.dataset.action,y(v),u.refs.btnGelleryQueueEl.classList.add("active"),u.refs.btnGelleryWatchedEl.classList.remove("active")))}0!==v.length?y(v):console.log("no queue"),u.refs.btnHeaderEl.addEventListener("click",w),d.backdrop.addEventListener("click",(function(e){e.currentTarget===e.target&&(0,d.closeModal)()})),document.addEventListener("keydown",(function(e){"Escape"===e.code&&(0,d.closeModal)()}))}();
//# sourceMappingURL=library.4b04b2df.js.map
