import{e as l,d as m,a}from"./vendor-nSNXNpMc.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))r(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function s(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(t){if(t.ep)return;t.ep=!0;const o=s(t);fetch(t.href,o)}})();document.addEventListener("DOMContentLoaded",function(){const e=n=>{const s=document.querySelectorAll(`.${n} a`),r=window.location.pathname;s.forEach(t=>{t.getAttribute("href")===`.${r}`&&t.classList.add("active")})};e("navigate-header"),e("menu-mobile")});(()=>{const e=document.querySelector(".js-menu-container"),n=document.querySelector(".js-open-menu"),s=document.querySelector(".js-close-menu"),r=()=>{const t=n.getAttribute("aria-expanded")==="true"||!1;n.setAttribute("aria-expanded",!t),e.classList.toggle("is-open"),t?l(document.body):m(document.body)};n.addEventListener("click",r),s.addEventListener("click",r),window.matchMedia("(min-width: 768px)").addEventListener("change",t=>{t.matches&&(e.classList.remove("is-open"),n.setAttribute("aria-expanded",!1),l(document.body))})})();const p="Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2Y2IxMWQ4ZGE0NTZlOGI5OTIxM2EyNDk4ODM4OGQyNSIsIm5iZiI6MTcyODcyMDEzMC44MDY0Niwic3ViIjoiNjcwYTJiNDEzYmI0NTU3YzY2OWFmYzM5Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.Pgojbxf9JKo_J1qf6Qmglon5qZgkr9wpZ4I978dGQU8";a.defaults.baseURL="https://api.themoviedb.org/3";a.defaults.headers.common.Authorization=p;const L=async(e="day")=>(await a.get(`/trending/movie/${e}`)).data,v=async()=>(await a.get("movie/upcoming")).data;new URLSearchParams({query:"Deadpool",primary_release_year:2024,page:1});const b=async e=>(await a.get(`/movie/${e}`)).data,w=async e=>(await a.get(`/movie/${e}/videos`)).data,g=async()=>{try{const n=(await a.get("/genre/movie/list")).data.genres;return new Map(n.map(s=>[s.id,s.name]))}catch(e){console.log(e)}},M=async e=>{try{const n=await g();return e.map(r=>n.get(r)||"Unknow genre")}catch(n){console.log(n)}},y=document.querySelectorAll(".team-link"),f=document.querySelectorAll("[data-modal-team-close]"),c=document.querySelector(".modal-team-container"),d=document.querySelector(".modal-team-backdrop");y.forEach(e=>{e.addEventListener("click",u)});f.forEach(e=>{e.addEventListener("click",u)});document.addEventListener("keydown",e=>{e.key==="Escape"&&(c.classList.add("is-hidden"),d.classList.add("is-hidden"))});document.addEventListener("click",e=>{e.target===c&&(c.classList.add("is-hidden"),d.classList.add("is-hidden"))});function u(){c.classList.toggle("is-hidden"),d.classList.toggle("is-hidden")}export{b as a,v as b,M as c,w as d,L as g};
//# sourceMappingURL=footer-BQNK3_Ec.js.map
