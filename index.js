import{a as i}from"./assets/vendor-CNNbG8jS.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const a of n)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&o(l)}).observe(document,{childList:!0,subtree:!0});function r(n){const a={};return n.integrity&&(a.integrity=n.integrity),n.referrerPolicy&&(a.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?a.credentials="include":n.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function o(n){if(n.ep)return;n.ep=!0;const a=r(n);fetch(n.href,a)}})();const p="Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2Y2IxMWQ4ZGE0NTZlOGI5OTIxM2EyNDk4ODM4OGQyNSIsIm5iZiI6MTcyODcyMDEzMC44MDY0Niwic3ViIjoiNjcwYTJiNDEzYmI0NTU3YzY2OWFmYzM5Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.Pgojbxf9JKo_J1qf6Qmglon5qZgkr9wpZ4I978dGQU8";i.defaults.baseURL="https://api.themoviedb.org/3";i.defaults.headers.common.Authorization=p;const m=async(t="day")=>(await i.get(`/trending/movie/${t}`)).data;new URLSearchParams({query:"Deadpool",primary_release_year:2024,page:1});const u=async t=>(await i.get(`/movie/${t}`)).data,g=async t=>(await i.get(`/movie/${t}/videos`)).data,y=t=>{const e=document.getElementById("modal-trailer"),r=t.results.find(o=>o.type==="Trailer");r?e.innerHTML=`
      <div class="modal-content">
        <span class="close-modal">&times;</span>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/${r.key}" 
          frameborder="0" allowfullscreen></iframe>
      </div>
    `:e.innerHTML=`
      <div class="modal-content error-pop-up">
        <span class="close-modal">&times;</span>
        <img src="../images/oops-logo.png" alt="camera icon with popcorn" width="363" height="318"/>
        <p>OOPS... We are very sorry! But we couldn’t find the trailer.</p>
      </div>
    `,e.style.display="block",e.querySelector(".close-modal").addEventListener("click",()=>{e.style.display="none"}),e.addEventListener("click",o=>{o.target===e&&(e.style.display="none")})},h=t=>{const e=document.getElementById("modal-details"),r=t.backdrop_path?`https://image.tmdb.org/t/p/original/${t.backdrop_path}`:`https://image.tmdb.org/t/p/original/${t.poster_path}`;e.innerHTML=`
    <div class="modal-content" style="background-image: url('${r}'); background-size: cover; background-position: center; padding: 20px; color: white;">
      <span class="close-modal" style="cursor: pointer; font-size: 24px;">&times;</span>
      <h2>${t.title}</h2>
      <p><strong>Vote / Votes:</strong> ${t.vote_average} / ${t.vote_count}</p>
      <p><strong>Popularity:</strong> ${t.popularity}</p>
      <p><strong>Genres:</strong> ${t.genres.map(o=>o.name).join(", ")}</p>
      <p><strong>Overview:</strong> ${t.overview}</p>
      <button id="add-to-library" class="add-to-library-btn">Add to my library</button>
    </div>
  `,e.style.display="block",e.querySelector(".close-modal").addEventListener("click",()=>{e.style.display="none"}),e.addEventListener("click",o=>{o.target===e&&(e.style.display="none")})},s=document.querySelector(".hero"),d=`
  <div class="hero-content">
    <h1>Let’s Make Your Own Cinema</h1>
    <p>Is a guide to creating a personalized movie theater experience. You'll need a projector, screen, and speakers. Decorate your space, choose your films, and stock up on snacks for the full experience.</p>
    <button id="get-started">Get Started</button>
  </div>
`,c=t=>{const e=document.createElement("span");return e.classList.add(`${t}-star`),e.innerHTML="&#9733;",t==="empty"&&(e.innerHTML="&#9734;"),e},f=t=>{console.log(`Rating dla filmu: ${t}`);const e=document.createElement("div");e.classList.add("star-rating");const r=Math.floor(t/2),o=t%2>=1?1:0,n=5-r-o;for(let a=0;a<r;a++)e.appendChild(c("full"));o&&e.appendChild(c("half"));for(let a=0;a<n;a++)e.appendChild(c("empty"));return e.outerHTML},v=async()=>{try{const e=(await m()).results;if(e.length===0){s.innerHTML=d,document.getElementById("get-started").addEventListener("click",()=>{window.location.href="/catalog"});return}const r=e[Math.floor(Math.random()*e.length)];s.style.backgroundImage=`url(https://image.tmdb.org/t/p/original/${r.backdrop_path})`,s.innerHTML=`
      <div class="movie-info">
        <h2>${r.title}</h2>
        <p>Rating: ${f(r.vote_average)}</p>
        <p>${r.overview}</p>
        <button id="watch-trailer">Watch Trailer</button>
        <button id="more-details">More Details</button>
      </div>
    `,document.getElementById("watch-trailer").addEventListener("click",async()=>{const o=await g(r.id);y(o)}),document.getElementById("more-details").addEventListener("click",async()=>{const o=await u(r.id);h(o)})}catch(t){console.error("Error fetching trending movies:",t);const e="../images/hero-desktop.jpg",r="../images/hero-tablet.jpg",o="../images/hero-mobile.jpg";window.innerWidth>=1024?s.style.backgroundImage=`url(${e})`:window.innerWidth>=768?s.style.backgroundImage=`url(${r})`:s.style.backgroundImage=`url(${o})`,s.innerHTML=d}};v();
//# sourceMappingURL=index.js.map
