import{a as c}from"./vendor-nSNXNpMc.js";const h="Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2Y2IxMWQ4ZGE0NTZlOGI5OTIxM2EyNDk4ODM4OGQyNSIsIm5iZiI6MTcyODcyMDEzMC44MDY0Niwic3ViIjoiNjcwYTJiNDEzYmI0NTU3YzY2OWFmYzM5Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.Pgojbxf9JKo_J1qf6Qmglon5qZgkr9wpZ4I978dGQU8";c.defaults.baseURL="https://api.themoviedb.org/3";c.defaults.headers.common.Authorization=h;const b=async(t="day")=>(await c.get(`/trending/movie/${t}`)).data,S=async()=>(await c.get("movie/upcoming")).data;new URLSearchParams({query:"Deadpool",primary_release_year:2024,page:1});const v=async t=>(await c.get(`/movie/${t}`)).data,f=async t=>(await c.get(`/movie/${t}/videos`)).data,w=async()=>{try{const e=(await c.get("/genre/movie/list")).data.genres;return new Map(e.map(a=>[a.id,a.name]))}catch(t){console.log(t)}},T=async t=>{try{const e=await w();return t.map(r=>e.get(r)||"Unknow genre")}catch(e){console.log(e)}},L=t=>{const e=document.getElementById("modal-trailer"),a=t.results.find(s=>s.type==="Trailer");document.querySelector("#watch-trailer").addEventListener("click",()=>{e.style.display.block}),a?e.innerHTML=`          <div class="modal-content">
            <span class="close-modal">&times;</span>
            <iframe width="560" height="315" src="https://www.youtube.com/embed/${a.key}"
              frameborder="0" allowfullscreen></iframe>
          </div>
        `:e.innerHTML=`<div class="modal-content error-pop-up">
            <span class="close-modal">&times;</span>
              <p>OOPS... </br>We are very sorry! </br>But we couldn’t find the trailer.</p>
               <img src="../images/oops-logo.png" alt="camera icon with popcorn" width="363" height="318"/>
          </div>
        `,e.style.display="block",e.querySelector(".close-modal").addEventListener("click",()=>{e.style.display="none",e.innerHTML=""}),e.addEventListener("click",s=>{s.target===e&&(e.style.display="none",e.innerHTML="")})},I=t=>{const e=document.getElementById("modal-details"),a=t.backdrop_path?`https://image.tmdb.org/t/p/original/${t.backdrop_path}`:`https://image.tmdb.org/t/p/original/${t.poster_path}`;e.innerHTML=` <div class="modal-content">
      <span class="close-modal">&times;</span> <!-- Przeniesiono przycisk zamykania tutaj -->
      <div class="modal-image" style="background-image: url('${a}');"></div>
      <div class="modal-text">
        <h3 class="modal-title">${t.title}</h3>

        <table class="tags-grade-wrap">
        <tr>
          <th>Vote / Votes:</th>
          <td id="hero-modal-vote">
            <span class="hero-vote-average-container">
              <span class="hero-vote-average">${t.vote_average}</span>
            </span>
            <span> / </span>
            <span class="hero-vote-count-container">
              <span class="hero-vote-count">${t.vote_count}</span>
            </span>
          </td>
        </tr>
        <tr>
          <th>Popularity:</th>
          <td id="hero-popularity">${t.popularity.toFixed(1)}</td>
        </tr>
        <tr>
          <th>Genre:</th>
          <td id="hero-genre">${t.genres.map(o=>o.name).join(", ")}</td>
        </tr>
      </table>
        <div class="modal-text-about">
        <p ><strong>About:</strong></p>
        <p class="modal-text-about">${t.overview}</p>
        </div>
        <button id="add-to-library" class="add-to-library-btn">Add to my library</button>
      </div>
    </div>
  `,e.style.display="block",e.querySelector(".close-modal").addEventListener("click",()=>{e.style.display="none"}),e.addEventListener("click",o=>{o.target===e&&(e.style.display="none")});const r=document.getElementById("add-to-library");r.addEventListener("click",o=>{const n={title:t.title,vote_average:t.vote_average,vote_count:t.vote_count,popularity:t.popularity,genres:t.genres.map(m=>m.name),overview:t.overview,year:new Date(t.release_date).getFullYear(),poster:`https://image.tmdb.org/t/p/w500${t.poster_path}`};(JSON.parse(localStorage.getItem("myLibrary"))||[]).some(m=>m.title===n.title)?(i(n.title),r.textContent="Add to my library"):(s(n),r.textContent="Remove from my library")});function s(o){const n=JSON.parse(localStorage.getItem("myLibrary"))||[];n.push(o),localStorage.setItem("myLibrary",JSON.stringify(n)),alert(`${o.title} has been added to your library!`)}function i(o){let n=JSON.parse(localStorage.getItem("myLibrary"))||[];n=n.filter(d=>d.title!==o),localStorage.setItem("myLibrary",JSON.stringify(n)),alert(`${o} has been removed from your library!`)}function u(o){(JSON.parse(localStorage.getItem("myLibrary"))||[]).some(g=>g.title===o.title)?r.textContent="Remove from My Library":r.textContent="Add to my Library"}u(t)},l=document.querySelector(".hero"),y=`
  <div class="hero-content">
    <h1 class="hero-header">Let’s Make Your Own Cinema</h1>
    <p class="hero-description get_started_message">Is a guide to creating a personalized movie theater experience. You'll need a projector, screen, and speakers. Decorate your space, choose your films, and stock up on snacks for the full experience.</p>
    <button id="get-started" class="get-started-btn">Get Started</button>
  </div>
`,p=t=>{const e=document.createElement("span");return e.classList.add(`${t}-star`),e.innerHTML="&#9733;",t==="empty"&&(e.innerHTML="&#9734;"),e},k=t=>{const e=document.createElement("div");e.classList.add("star-rating");const a=Math.floor(t/2),r=t%2>=1?1:0,s=5-a-r;for(let i=0;i<a;i++)e.appendChild(p("full"));r&&e.appendChild(p("half"));for(let i=0;i<s;i++)e.appendChild(p("empty"));return e.outerHTML},M=async()=>{try{const e=(await b()).results;if(e.length===0){l.innerHTML=y,document.getElementById("get-started").addEventListener("click",()=>{window.location.href="/catalog"});return}const a=e[Math.floor(Math.random()*e.length)];l.style.backgroundImage=`linear-gradient(to right, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.1)), url(https://image.tmdb.org/t/p/original/${a.backdrop_path})`,l.innerHTML=`
      <div class="movie-info">
        <h2 class="hero-header">${a.title}</h2>
        <p class="star-rating">${k(a.vote_average)}</p>
        <p class="hero-description">${a.overview}</p>
        <button id="watch-trailer" class="watch-trailer-btn">Watch Trailer</button>
        <button id="more-details" class="more-details-btn">More Details</button>
      </div>
    `,document.getElementById("watch-trailer").addEventListener("click",async()=>{const r=await f(a.id);L(r)}),document.getElementById("more-details").addEventListener("click",async()=>{const r=await v(a.id);I(r)})}catch(t){console.error("Error fetching trending movies:",t);const e="../images/hero-desktop.jpg",a="../images/hero-tablet.jpg",r="../images/hero-mobile.jpg";window.innerWidth>=1024?l.style.backgroundImage=`url(${e})`:window.innerWidth>=768?l.style.backgroundImage=`url(${a})`:l.style.backgroundImage=`url(${r})`,l.innerHTML=y}};M();export{S as a,v as b,T as c,k as d,b as g,I as o};
//# sourceMappingURL=hero-Ldttc4iv.js.map
