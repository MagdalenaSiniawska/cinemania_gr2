import{e as a,d as u}from"./vendor-nSNXNpMc.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const d of o.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&s(d)}).observe(document,{childList:!0,subtree:!0});function c(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(e){if(e.ep)return;e.ep=!0;const o=c(e);fetch(e.href,o)}})();document.addEventListener("DOMContentLoaded",function(){const t=n=>{const c=document.querySelectorAll(`.${n} a`),s=window.location.pathname;c.forEach(e=>{e.getAttribute("href")===`.${s}`&&e.classList.add("active")})};t("navigate-header"),t("menu-mobile")});(()=>{const t=document.querySelector(".js-menu-container"),n=document.querySelector(".js-open-menu"),c=document.querySelector(".js-close-menu"),s=()=>{const e=n.getAttribute("aria-expanded")==="true"||!1;n.setAttribute("aria-expanded",!e),t.classList.toggle("is-open"),e?a(document.body):u(document.body)};n.addEventListener("click",s),c.addEventListener("click",s),window.matchMedia("(min-width: 768px)").addEventListener("change",e=>{e.matches&&(t.classList.remove("is-open"),n.setAttribute("aria-expanded",!1),a(document.body))})})();const m=document.querySelectorAll(".team-link"),f=document.querySelectorAll("[data-modal-team-close]"),r=document.querySelector(".modal-team-container"),i=document.querySelector(".modal-team-backdrop");m.forEach(t=>{t.addEventListener("click",l)});f.forEach(t=>{t.addEventListener("click",l)});document.addEventListener("keydown",t=>{t.key==="Escape"&&(r.classList.add("is-hidden"),i.classList.add("is-hidden"))});document.addEventListener("click",t=>{t.target===r&&(r.classList.add("is-hidden"),i.classList.add("is-hidden"))});function l(){r.classList.toggle("is-hidden"),i.classList.toggle("is-hidden")}
//# sourceMappingURL=footer-DQzmd3O7.js.map