import{a as y,S as w}from"./assets/vendor-58e78301.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function a(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(e){if(e.ep)return;e.ep=!0;const r=a(e);fetch(e.href,r)}})();const E="42806027-cb009af69a31f8552609fdd7f",L=15;async function g(o,t){const a=`https://pixabay.com/api/?key=${E}&q=${o}&image_type=photo&orientation=horizontal&safesearch=true&page=${t}&per_page=${L}`;try{return(await y.get(a)).data.hits}catch(s){return console.error("Error fetching images:",s),[]}}function h(o,t=!1){const a=document.querySelector(".gallery"),s=new w(".gallery a",{});t||(a.innerHTML=""),o.forEach(e=>{const r=document.createElement("div");r.classList.add("card");const n=document.createElement("a");n.href=e.largeImageURL,n.setAttribute("data-lightbox","gallery");const d=document.createElement("img");d.src=e.webformatURL,d.alt=e.tags;const u=document.createElement("span");u.textContent=`Likes: ${e.likes}`;const m=document.createElement("span");m.textContent=`Views: ${e.views}`;const p=document.createElement("span");p.textContent=`Comments: ${e.comments}`;const f=document.createElement("span");f.textContent=`Downloads: ${e.downloads}`,n.appendChild(d),r.appendChild(n),r.appendChild(u),r.appendChild(m),r.appendChild(p),r.appendChild(f),a.appendChild(r)}),s.refresh()}function c(o,t="error"){iziToast[t]({title:"",message:o,position:"topRight"})}function b(){const o=document.querySelector(".gallery"),t=document.createElement("div");t.textContent="Loading images...",t.classList.add("loader"),o.appendChild(t)}let l=1,i="";window.addEventListener("DOMContentLoaded",o=>{document.querySelector("form").addEventListener("submit",C),document.querySelector(".gallery"),document.querySelector(".load-more-button").addEventListener("click",q)});async function C(o){if(o.preventDefault(),l=1,i=o.target.elements.query.value.trim(),!i){c("Please enter a search query.","warning");return}b();try{const t=await g(i,l);if(t.length===0){c("Sorry, there are no images matching your search query. Please try again.");return}h(t),document.querySelector(".load-more-button").style.display="block"}catch(t){console.error("Error processing search:",t),c("An error occurred while processing your search. Please try again later.")}}async function q(){l++;try{const o=await g(i,l);if(o.length===0){c("We're sorry, but you've reached the end of search results.","info"),document.querySelector(".load-more-button").style.display="none";return}h(o,!0);const t=document.querySelector(".card").getBoundingClientRect().height;window.scrollBy({top:t*2,behavior:"smooth"})}catch(o){console.error("Error loading more images:",o),c("An error occurred while loading more images. Please try again later.")}}
//# sourceMappingURL=commonHelpers.js.map