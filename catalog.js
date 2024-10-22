import{c as T,g as C,a as O}from"./assets/footer-DWEeZ6RJ.js";import{d as S,o as w}from"./assets/hero-LfhOdN2Q.js";import{a as E,i as P}from"./assets/vendor-nSNXNpMc.js";const e=(t,a)=>Object.assign(document.createElement(t),a),x=({poster_path:t,title:a,genre_ids:l,release_date:g,vote_average:p})=>{const s=e("li",{className:"catalog-card"}),c=e("img",{className:"catalog-card-poster",src:`https://image.tmdb.org/t/p/original/${t}`}),i=e("div",{className:"catalog-card-description"}),L=e("p",{className:"catalog-card-title",textContent:a.toUpperCase()}),y=e("div",{className:"catalog-card-description-sub"}),b=e("p",{className:"catalog-card-description-element"});T(l).then(d=>{b.textContent=`${d.slice(0,2).join(", ")} | ${g.slice(0,4)}`});const n=e("div",{className:"catalog-card-description-sub-sub"}),r=e("p",{className:"catalog-star-rating",innerHTML:S(p)});return y.append(b),n.append(y,r),i.append(L,n),s.append(c,i),s};document.querySelector(".catalog");const D=document.querySelector("#searchForm"),u=document.querySelector("#film-list"),M=document.querySelector("#searchForm-input"),v=document.querySelector("#searchForm-input-clear"),m=document.querySelector("#pagination");v.style.display="none";let o=1;const k="Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2Y2IxMWQ4ZGE0NTZlOGI5OTIxM2EyNDk4ODM4OGQyNSIsIm5iZiI6MTcyODcyMDEzMC44MDY0Niwic3ViIjoiNjcwYTJiNDEzYmI0NTU3YzY2OWFmYzM5Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.Pgojbxf9JKo_J1qf6Qmglon5qZgkr9wpZ4I978dGQU8";E.defaults.baseURL="https://api.themoviedb.org/3";E.defaults.headers.common.Authorization=k;const I=(t,a,l)=>{const g=document.createDocumentFragment();g.append(...t.map(p=>{const s=l(p);return s.addEventListener("click",async c=>{if(c.target.classList.contains("catalog-card"))try{const i=await O(p.id);w(i)}catch(i){console.log("Error fetching movie details:",i)}}),s})),a.append(g)},q=async()=>{try{const t=await C("day");console.log(t),I(t.results,u,x)}catch(t){u.innerHTML="<h2>OOPS!</h2><p>We are very sorry! We don’t have any results matching your search.</p>",console.log(t)}},N=async()=>{try{const t=new URLSearchParams({query:M.value.trim(),include_adult:!1,page:o});return(await E.get(`/search/movie?${t}`)).data}catch(t){console.log(t)}},f=async()=>{try{const t=await N();u.innerHTML="",I(t.results,u,x)}catch(t){console.log("Error in search:",t)}},h=async()=>{try{const a=(await N()).total_pages,l=5;m.innerHTML="",m.style.display="flex";const g=e("li",{classList:"pagination-item"}),p=e("button",{classList:"pagination-btn prev-page",id:"previous-page",textContent:"<"});p.addEventListener("click",()=>{o>1&&(o--,f(),h())}),g.append(p),m.append(g);const s=e("ul",{classList:"page-list"});m.append(s),s.style.display="flex";let c=Math.max(1,o-Math.floor(l/2)),i=Math.min(a,c+l-1);if(i-c<l-1&&(c===1?i=Math.min(a,c+l-1):c=Math.max(1,i-l+1)),c>1){const n=e("li",{classList:"pagination-item"}),r=e("button",{classList:"pagination-btn",textContent:"1"});if(r.addEventListener("click",()=>{o=1,f(),h()}),n.append(r),s.append(n),c>2){const d=e("li",{classList:"pagination-item",textContent:"..."});s.append(d)}}for(let n=c;n<=i;n++){const r=e("li",{classList:"pagination-item"}),d=e("button",{classList:"pagination-btn",textContent:n});d.addEventListener("click",()=>{o=n,f(),h()}),r.append(d),s.append(r)}if(i<a){if(i<a-1){const d=e("li",{classList:"pagination-item",textContent:"..."});s.append(d)}const n=e("li",{classList:"pagination-item"}),r=e("button",{classList:"pagination-btn",textContent:a});r.addEventListener("click",()=>{o=a,f(),h()}),n.append(r),s.append(n)}const L=e("li",{classList:"pagination-item"}),y=e("button",{classList:"pagination-btn next-page",id:"next-page",textContent:">"});y.addEventListener("click",()=>{o<a&&(o++,f(),h())}),L.append(y),m.append(L),o===1&&(p.disabled=!0),o===a&&(y.disabled=!0),Array.from(document.querySelectorAll(".pagination-btn")).slice(1,-1).forEach(n=>{n.textContent==o&&n.classList.add("pagination-btn-active")})}catch(t){console.log(t)}};document.addEventListener("DOMContentLoaded",q);D.addEventListener("submit",t=>{t.preventDefault(),M.value!==""?(u.innerHTML="",m.innerHTML="",(async()=>(o=1,await f(),await h(),u.childElementCount===0&&(u.innerHTML='<div class="catalog-oops"><h2>OOPS!</h2><p>We are very sorry! We don’t have any results matching your search.</p></div>',m.style.display="none")))(),v.style.display="inline"):P.info({message:"Type film title."})});v.addEventListener("click",t=>{v.style.display="none",m.style.display="none",M.value=""});
//# sourceMappingURL=catalog.js.map
