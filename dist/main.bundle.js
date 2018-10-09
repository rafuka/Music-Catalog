!function(e){var t={};function n(r){if(t[r])return t[r].exports;var a=t[r]={i:r,l:!1,exports:{}};return e[r].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)n.d(r,a,function(t){return e[t]}.bind(null,a));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){n(1),e.exports=n(2)},function(e,t,n){"use strict";n.r(t);new Vue({el:"#music-catalog",data:{albums:[]}}),function(){if(!("indexedDB"in window))return;let e=window.indexedDB.open("music-catalog",1);e.onsuccess=function(e){e.target.result.transaction("albums","readonly").objectStore("albums").getAll().onsuccess=function(e){let t=e.target.result,n=document.getElementById("albums-list");t.forEach(function(e){let t=function(e){var t=document.createElement("article"),n=document.createElement("img"),r=document.createElement("div"),a=document.createElement("h2"),o=document.createElement("p");return t.classList.add("album"),n.classList.add("album__image"),r.classList.add("album__info"),a.classList.add("album__title"),o.classList.add("album__author"),console.log(o),o.innerHTML=e.author,a.innerHTML=e.title,r.appendChild(a),r.appendChild(o),n.setAttribute("src",e.imgUrl),n.setAttribute("title","Album Cover"),t.appendChild(n),t.appendChild(r),t.style.top="100%",t}(e);n.appendChild(t)}),TweenMax.staggerFrom(".album",1,{scale:0,delay:3},.3)}},e.onerror=function(e){console.log(e.target.errorCode)},e.onupgradeneeded=function(e){var t=e.target.result;t.createObjectStore("albums",{keyPath:"id",autoIncrement:!0}).transaction.oncomplete=function(e){var n=t.transaction("albums","readwrite").objectStore("albums");[{title:"Misterious Stuffy Bugs",trackNum:13,date:1989,author:"Winnie McGranny",imgUrl:"./assets/albumcover1.jpeg"},{title:"Pidgeons tryna steal my money",trackNum:17,date:1964,author:"Scrutin Martinez",imgUrl:"./assets/albumcover2.jpeg"},{title:"Abraham's lost flip-flop",trackNum:9,date:2006,author:"The Melting Hipsters",imgUrl:"./assets/albumcover3.jpeg"},{title:"Grandma's Bass Drop",trackNum:24,date:1964,author:"Winnie McGranny",imgUrl:"https://placeimg.com/300/300/people"},{title:"Pidgeons tryna steal my money",trackNum:17,date:1964,author:"Scrutin Martinez",imgUrl:"https://placeimg.com/300/300/tech"},{title:"Abraham's lost flip-flop",trackNum:13,date:1989,author:"The Melting Hipsters",imgUrl:"https://placeimg.com/300/300/animals"}].forEach(function(e){n.add(e)})}},document.getElementById("add-new").addEventListener("click",function(e){console.log("click!")})}()},function(e,t,n){e.exports=n.p+"css/main.min.css"}]);