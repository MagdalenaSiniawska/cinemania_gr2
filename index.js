import{a as m}from"./assets/vendor-CNNbG8jS.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function n(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(r){if(r.ep)return;r.ep=!0;const s=n(r);fetch(r.href,s)}})();const N="Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2Y2IxMWQ4ZGE0NTZlOGI5OTIxM2EyNDk4ODM4OGQyNSIsIm5iZiI6MTcyODcyMDEzMC44MDY0Niwic3ViIjoiNjcwYTJiNDEzYmI0NTU3YzY2OWFmYzM5Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.Pgojbxf9JKo_J1qf6Qmglon5qZgkr9wpZ4I978dGQU8";m.defaults.baseURL="https://api.themoviedb.org/3";m.defaults.headers.common.Authorization=N;const w=async(t="day")=>(await m.get(`/trending/movie/${t}`)).data,T=async()=>(await m.get("movie/upcoming")).data,$=new URLSearchParams({query:"Deadpool",primary_release_year:2024,page:1}),O=async()=>(await m.get(`/search/movie?${$}`)).data,x=async t=>(await m.get(`/movie/${t}`)).data,C=async t=>(await m.get(`/movie/${t}/videos`)).data,D=async()=>{try{const e=(await m.get("/genre/movie/list")).data.genres;return new Map(e.map(n=>[n.id,n.name]))}catch(t){console.log(t)}},I=async t=>{try{const e=await D();return t.map(o=>e.get(o)||"Unknow genre")}catch(e){console.log(e)}},_=t=>{const e=document.getElementById("modal-trailer"),n=t.results.find(o=>o.type==="Trailer");n?e.innerHTML=`
      <div class="modal-content">
        <span class="close-modal">&times;</span>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/${n.key}" 
          frameborder="0" allowfullscreen></iframe>
      </div>
    `:e.innerHTML=`
      <div class="modal-content error-pop-up">
        <span class="close-modal">&times;</span>
        <img src="../images/oops-logo.png" alt="camera icon with popcorn" width="363" height="318"/>
        <p>OOPS... We are very sorry! But we couldn’t find the trailer.</p>
      </div>
    `,e.style.display="block",e.querySelector(".close-modal").addEventListener("click",()=>{e.style.display="none"}),e.addEventListener("click",o=>{o.target===e&&(e.style.display="none")})},E=t=>{const e=document.getElementById("modal-details"),n=t.backdrop_path?`https://image.tmdb.org/t/p/original/${t.backdrop_path}`:`https://image.tmdb.org/t/p/original/${t.poster_path}`;e.innerHTML=`
    <div class="modal-content" style="background-image: url('${n}'); background-size: cover; background-position: center; padding: 20px; color: white;">
      <span class="close-modal" style="cursor: pointer; font-size: 24px;">&times;</span>
      <h2>${t.title}</h2>
      <p><strong>Vote / Votes:</strong> ${t.vote_average} / ${t.vote_count}</p>
      <p><strong>Popularity:</strong> ${t.popularity}</p>
      <p><strong>Genres:</strong> ${t.genres.map(o=>o.name).join(", ")}</p>
      <p><strong>Overview:</strong> ${t.overview}</p>
      <button id="add-to-library" class="add-to-library-btn">Add to my library</button>
    </div>
  `,e.style.display="block",e.querySelector(".close-modal").addEventListener("click",()=>{e.style.display="none"}),e.addEventListener("click",o=>{o.target===e&&(e.style.display="none")})},g=document.querySelector(".hero"),L=`
  <div class="hero-content">
    <h1>Let’s Make Your Own Cinema</h1>
    <p>Is a guide to creating a personalized movie theater experience. You'll need a projector, screen, and speakers. Decorate your space, choose your films, and stock up on snacks for the full experience.</p>
    <button id="get-started">Get Started</button>
  </div>
`,f=t=>{const e=document.createElement("span");return e.classList.add(`${t}-star`),e.innerHTML="&#9733;",t==="empty"&&(e.innerHTML="&#9734;"),e},B=t=>{console.log(`Rating dla filmu: ${t}`);const e=document.createElement("div");e.classList.add("star-rating");const n=Math.floor(t/2),o=t%2>=1?1:0,r=5-n-o;for(let s=0;s<n;s++)e.appendChild(f("full"));o&&e.appendChild(f("half"));for(let s=0;s<r;s++)e.appendChild(f("empty"));return e.outerHTML},H=async()=>{try{const e=(await w()).results;if(e.length===0){g.innerHTML=L,document.getElementById("get-started").addEventListener("click",()=>{window.location.href="/catalog"});return}const n=e[Math.floor(Math.random()*e.length)];g.style.backgroundImage=`url(https://image.tmdb.org/t/p/original/${n.backdrop_path})`,g.innerHTML=`
      <div class="movie-info">
        <h2>${n.title}</h2>
        <p>Rating: ${B(n.vote_average)}</p>
        <p>${n.overview}</p>
        <button id="watch-trailer">Watch Trailer</button>
        <button id="more-details">More Details</button>
      </div>
    `,document.getElementById("watch-trailer").addEventListener("click",async()=>{const o=await C(n.id);_(o)}),document.getElementById("more-details").addEventListener("click",async()=>{const o=await x(n.id);E(o)})}catch(t){console.error("Error fetching trending movies:",t);const e="../images/hero-desktop.jpg",n="../images/hero-tablet.jpg",o="../images/hero-mobile.jpg";window.innerWidth>=1024?g.style.backgroundImage=`url(${e})`:window.innerWidth>=768?g.style.backgroundImage=`url(${n})`:g.style.backgroundImage=`url(${o})`,g.innerHTML=L}};H();const q=t=>{const n=Math.round(t*2)/2,o=Math.floor(n),r=n%1===.5?1:0,s=5-o-r;let a="";for(let i=0;i<o;i++)a+='<svg class="icon"><use xlink:href="#icon-star"></use></svg>';r&&(a+='<svg class="icon"><use xlink:href="#icon-star-half"></use></svg>');for(let i=0;i<s;i++)a+='<svg class="icon"><use xlink:href="#icon-star-empty"></use></svg>';return a},M=async()=>{try{const e=(await w("week")).results,n=document.querySelector("#trending-container"),o=window.innerWidth<768?1:3;n.innerHTML="";for(const r of e.slice(0,o)){const s=await I(r.genre_ids),i=s.slice(0,2).join(", "),c=document.createElement("div");c.classList.add("trending-card"),c.setAttribute("data-movie-id",r.id),c.style.backgroundImage=`url('https://image.tmdb.org/t/p/original${r.backdrop_path}')`,c.innerHTML=`
  <div class="card-info">
    <h3>${r.title.toUpperCase()}</h3>
    <div class="card-info-inner">
      <div class="card-info-left">
        <p class="card-info-p">${i} | ${new Date(r.release_date).getFullYear()}</p>
      </div>
      <div class="card-info-right">
        ${q(r.vote_average/2)}
      </div>
    </div>
  </div>
`,c.addEventListener("click",async()=>{const h={...r,genres:s};E(h)}),n.appendChild(c)}}catch(t){console.error("Error fetching trending movies:",t)}},S=t=>(JSON.parse(localStorage.getItem("myLibrary"))||[]).some(n=>n.id===t),j=t=>{const e=JSON.parse(localStorage.getItem("myLibrary"))||[];e.push(t),localStorage.setItem("myLibrary",JSON.stringify(e))},G=t=>{let e=JSON.parse(localStorage.getItem("myLibrary"))||[];e=e.filter(n=>n.id!==t),localStorage.setItem("myLibrary",JSON.stringify(e))},J=(t,e)=>{S(t.id)?(G(t.id),e.textContent="Add to my library"):(j(t),e.textContent="Remove from my library")},P=async()=>{try{const n=(await T()).results[0],r=(await I(n.genre_ids)).join(", ");document.getElementById("upcoming-movie-poster").src=`https://image.tmdb.org/t/p/w500${n.backdrop_path}`,document.getElementById("upcoming-movie-title").textContent=n.title,document.getElementById("upcoming-release-date").textContent=n.release_date,document.querySelector(".vote-average").textContent=n.vote_average,document.querySelector(".vote-count").textContent=n.vote_count,document.getElementById("upcoming-popularity").textContent=n.popularity,document.getElementById("upcoming-overview").textContent=n.overview,document.getElementById("upcoming-genre").textContent=r;const s=document.getElementById("add-library-button");s.textContent=S(n.id)?"Remove from my library":"Add to my library",s.addEventListener("click",()=>J(n,s))}catch(t){console.error("Error fetching upcoming movies:",t),document.getElementById("upcoming-no-movies-message").style.display="block"}};document.addEventListener("DOMContentLoaded",()=>{M(),P(),window.addEventListener("resize",M)});const u=(t,e)=>Object.assign(document.createElement(t),e),z=({poster_path:t,title:e,genre_ids:n,release_date:o})=>{const r=u("li",{className:"card"}),s=u("img",{className:"card-poster",src:`https://image.tmdb.org/t/p/original/${t}`,width:200,height:300}),a=u("div",{className:"card-description"}),i=u("p",{className:"card-title",textContent:e}),c=u("p",{className:"card-description-element"});I(n).then(k=>{c.textContent=`${k.join(", ")} |`});const h=u("p",{className:"card-description-element",textContent:o.slice(0,4)});return a.append(c,h),r.append(s,i,a),r},Y=document.querySelector("#searchForm"),y=document.querySelector("#catalog"),F=document.querySelector("#genre-select"),b=document.querySelector("#load-more");console.log(`load more: ${b}`);let l=0;const p=6;let d=[];const v=(t,e)=>{const n=document.createDocumentFragment();n.append(...t.map(z)),e.append(n)};(async()=>{try{d=(await w("day")).results,v(d.slice(0,p),y),l+=p}catch(t){console.log(t)}})();b.addEventListener("click",()=>{const t=d.slice(l,l+p);v(t,y),l+=t.length,l>=d.length&&(b.style.display="none")});Y.addEventListener("submit",async t=>{t.preventDefault();const e=document.querySelector("#searchInput").value;if(e)try{const n=await O(e);y.innerHTML="",d=n.results,l=0,v(d.slice(0,p),y),l+=p}catch(n){console.log(n)}});F.addEventListener("change",t=>{const e=t.target.value;let n;e==="all"?n=d:n=d.filter(o=>o.genre_ids.includes(Number(e))),y.innerHTML="",v(n.slice(0,p),y),l=p});
//# sourceMappingURL=index.js.map
