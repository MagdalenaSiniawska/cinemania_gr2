import{g as C,a as b,c as w}from"./assets/footer-DWEeZ6RJ.js";import"./assets/vendor-nSNXNpMc.js";document.addEventListener("DOMContentLoaded",async()=>{const i=document.querySelector("#catalog"),m=document.querySelector("#genre-select"),p=document.querySelector("#load-more"),v=document.querySelector("#empty-library");let s=0;const d=6;let a=[],r=[];const M=()=>{const e=document.createElement("option");e.value="all",e.textContent="Genre",m.appendChild(e),["action","drama","comedy","horror","thriller"].forEach(o=>{const n=document.createElement("option");n.value=o,n.textContent=o.charAt(0).toUpperCase()+o.slice(1),m.appendChild(n)})},g=e=>{const t=document.createElement("span");return t.classList.add(`${e}-star`),t.innerHTML=e==="empty"?"&#9734;":"&#9733;",t},L=e=>{const t=document.createElement("div");t.classList.add("star-rating");const o=e/2,n=Math.floor(o),l=o%1>=.5?1:0,h=5-n-l;for(let c=0;c<n;c++)t.appendChild(g("full"));l&&t.appendChild(g("half"));for(let c=0;c<h;c++)t.appendChild(g("empty"));return t.outerHTML},E=e=>{a=a.filter(t=>t.id!==e),localStorage.setItem("myLibrary",JSON.stringify(a)),f()},u=(e,t)=>{const o=document.createDocumentFragment();e.forEach(n=>{const l=document.createElement("div");l.classList.add("film-card");const h=n.vote_average;l.innerHTML=`
                <button class="remove-movie" data-id="${n.id}">X</button>
                <img src="https://image.tmdb.org/t/p/w500${n.poster_path||""}" alt="${n.title||""} poster" class="film-poster"/>
                <h3>${n.title||""}</h3>
                <p>Genre: ${n.genres.join(", ")||"N/A"}</p>
                <p>Year: ${new Date(n.release_date).getFullYear()||""}</p>
                <p>${L(h)||""}</p>
            `,l.querySelector(".remove-movie").addEventListener("click",()=>E(n.id)),o.appendChild(l)}),t.append(o)},S=async()=>{try{const e=await C("day");a=await Promise.all(e.results.map(async t=>{const o=await b(t.id);return{...t,genres:await w(o.genres.map(n=>n.id)),poster_path:o.poster_path,release_date:o.release_date}})),console.log("All movies fetched:",a.length)}catch(e){console.error("Error fetching movies:",e)}},f=()=>{if(i.innerHTML="",r=a,!Array.isArray(a)||a.length===0){v.style.display="block",p.style.display="none";return}else v.style.display="none";u(r.slice(0,d),i),s=Math.min(d,r.length),y(),console.log("Displayed movies:",s),console.log("Filtered movies:",r.length)},y=()=>{p.style.display=s<r.length?"block":"none"};p.addEventListener("click",()=>{const e=r.slice(s,s+d);u(e,i),s+=e.length,y(),console.log("Displayed movies after loading more:",s)}),m.addEventListener("change",e=>{const t=e.target.value;r=a.filter(o=>t==="all"||Array.isArray(o.genres)&&o.genres.map(n=>n.toLowerCase()).includes(t)),i.innerHTML="",u(r.slice(0,d),i),s=Math.min(d,r.length),y(),console.log("Filtered movies after genre change:",r.length)}),M(),await S(),f()});
//# sourceMappingURL=library.js.map
