import{c as C,g as O,a as w}from"./assets/footer-BQNK3_Ec.js";import{d as P,o as S}from"./assets/hero-C9Tw8c9_.js";import{a as b,i as k}from"./assets/vendor-nSNXNpMc.js";const e=(t,n)=>Object.assign(document.createElement(t),n),x=({poster_path:t,title:n,genre_ids:l,release_date:m,vote_average:p})=>{const a=e("li",{className:"card"}),c=e("img",{className:"card-poster",src:`https://image.tmdb.org/t/p/original/${t}`,width:200,height:300}),i=e("div",{className:"card-description"}),L=e("p",{className:"card-title",textContent:n}),g=e("p",{className:"card-description-element"});C(l).then(r=>{g.textContent=`${r.join(", ")} |`});const M=e("p",{className:"card-description-element",textContent:m.slice(0,4)}),s=e("p",{className:"star-rating",innerHTML:P(p)});return i.append(g,M,s),a.append(c,L,i),a},I=document.querySelector(".catalog"),D=document.querySelector("#searchForm"),f=document.querySelector("#film-list"),E=document.querySelector("#searchForm-input"),v=document.querySelector("#searchForm-input-clear"),d=document.querySelector("#pagination");v.style.display="none";let o=1;const q="Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2Y2IxMWQ4ZGE0NTZlOGI5OTIxM2EyNDk4ODM4OGQyNSIsIm5iZiI6MTcyODcyMDEzMC44MDY0Niwic3ViIjoiNjcwYTJiNDEzYmI0NTU3YzY2OWFmYzM5Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.Pgojbxf9JKo_J1qf6Qmglon5qZgkr9wpZ4I978dGQU8";b.defaults.baseURL="https://api.themoviedb.org/3";b.defaults.headers.common.Authorization=q;const N=(t,n,l)=>{const m=document.createDocumentFragment();m.append(...t.map(p=>{const a=l(p);return a.addEventListener("click",async c=>{if(c.target.classList.contains("card-poster"))try{const i=await w(p.id);S(i)}catch(i){console.log("Error fetching movie details:",i)}}),a})),n.append(m)},B=async()=>{try{const t=await O("day");N(t.results,f,x)}catch(t){I.innerHTML="<h2>OOPS!</h2><p>We are very sorry! We don’t have any results matching your search.</p>",console.log(t)}},T=async()=>{try{const t=new URLSearchParams({query:E.value.trim(),include_adult:!1,page:o});return(await b.get(`/search/movie?${t}`)).data}catch(t){console.log(t)}},y=async()=>{try{const t=await T();f.innerHTML="",N(t.results,f,x)}catch(t){console.log("Error in search:",t)}},h=async()=>{try{const n=(await T()).total_pages,l=5;d.innerHTML="",d.style.display="flex";const m=e("li",{classList:"pagination-item"}),p=e("button",{classList:"pagination-btn prev-page",id:"previous-page",textContent:"<"});p.addEventListener("click",()=>{o>1&&(o--,y(),h())}),m.append(p),d.append(m);const a=e("ul",{classList:"page-list"});d.append(a),a.style.display="flex";let c=Math.max(1,o-Math.floor(l/2)),i=Math.min(n,c+l-1);if(i-c<l-1&&(c===1?i=Math.min(n,c+l-1):c=Math.max(1,i-l+1)),c>1){const s=e("li",{classList:"pagination-item"}),r=e("button",{classList:"pagination-btn",textContent:"1"});if(r.addEventListener("click",()=>{o=1,y(),h()}),s.append(r),a.append(s),c>2){const u=e("li",{classList:"pagination-item",textContent:"..."});a.append(u)}}for(let s=c;s<=i;s++){const r=e("li",{classList:"pagination-item"}),u=e("button",{classList:"pagination-btn",textContent:s});u.addEventListener("click",()=>{o=s,y(),h()}),r.append(u),a.append(r)}if(i<n){if(i<n-1){const u=e("li",{classList:"pagination-item",textContent:"..."});a.append(u)}const s=e("li",{classList:"pagination-item"}),r=e("button",{classList:"pagination-btn",textContent:n});r.addEventListener("click",()=>{o=n,y(),h()}),s.append(r),a.append(s)}const L=e("li",{classList:"pagination-item"}),g=e("button",{classList:"pagination-btn next-page",id:"next-page",textContent:">"});g.addEventListener("click",()=>{o<n&&(o++,y(),h())}),L.append(g),d.append(L),o===1&&(p.disabled=!0),o===n&&(g.disabled=!0),Array.from(document.querySelectorAll(".pagination-btn")).slice(1,-1).forEach(s=>{s.textContent==o&&(s.style.backgroundColor="red")})}catch(t){console.log(t)}};document.addEventListener("DOMContentLoaded",B);D.addEventListener("submit",t=>{t.preventDefault(),E.value!==""?(f.innerHTML="",d.innerHTML="",(async()=>(o=1,await y(),f.childElementCount===0&&(d.style.display="none",I.innerHTML="<h2>OOPS!</h2><p>We are very sorry! We don’t have any results matching your search.</p>"),await h()))(),v.style.display="inline"):k.info({message:"Type film title."})});v.addEventListener("click",t=>{v.style.display="none",d.style.display="none",E.value=""});
//# sourceMappingURL=catalog.js.map
