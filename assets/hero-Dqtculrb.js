import{a as c}from"./vendor-nSNXNpMc.js";const v="Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2Y2IxMWQ4ZGE0NTZlOGI5OTIxM2EyNDk4ODM4OGQyNSIsIm5iZiI6MTcyODcyMDEzMC44MDY0Niwic3ViIjoiNjcwYTJiNDEzYmI0NTU3YzY2OWFmYzM5Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.Pgojbxf9JKo_J1qf6Qmglon5qZgkr9wpZ4I978dGQU8";c.defaults.baseURL="https://api.themoviedb.org/3";c.defaults.headers.common.Authorization=v;const b=async(t="day")=>(await c.get(`/trending/movie/${t}`)).data,T=async()=>(await c.get("movie/upcoming")).data;new URLSearchParams({query:"Deadpool",primary_release_year:2024,page:1});const h=async t=>(await c.get(`/movie/${t}`)).data,f=async t=>(await c.get(`/movie/${t}/videos`)).data,L=async()=>{try{const e=(await c.get("/genre/movie/list")).data.genres;return new Map(e.map(r=>[r.id,r.name]))}catch(t){console.log(t)}},S=async t=>{try{const e=await L();return t.map(a=>e.get(a)||"Unknow genre")}catch(e){console.log(e)}},w=t=>{const e=document.getElementById("modal-trailer"),r=t.results.find(s=>s.type==="Trailer");document.querySelector("#watch-trailer").addEventListener("click",()=>{e.style.display.block}),r?e.innerHTML=`          <div class="modal-content">
            <span class="close-modal">&times;</span>
            <iframe width="560" height="315" src="https://www.youtube.com/embed/${r.key}"
              frameborder="0" allowfullscreen></iframe>
          </div>
        `:e.innerHTML=`<div class="modal-content error-pop-up">
            <span class="close-modal">&times;</span>
              <p>OOPS... </br>We are very sorry! </br>But we couldn’t find the trailer.</p>
               <img src="../images/oops-logo.png" alt="camera icon with popcorn" width="363" height="318"/>
          </div>
        `,e.style.display="block",e.querySelector(".close-modal").addEventListener("click",()=>{e.style.display="none",e.innerHTML=""}),e.addEventListener("click",s=>{s.target===e&&(e.style.display="none",e.innerHTML="")})},I=t=>{const e=document.getElementById("modal-details"),r=t.backdrop_path?`https://image.tmdb.org/t/p/original/${t.backdrop_path}`:`https://image.tmdb.org/t/p/original/${t.poster_path}`;e.innerHTML=` <div class="modal-content">
      <span class="close-modal">&times;</span> <!-- Przeniesiono przycisk zamykania tutaj -->
      <div class="modal-image" style="background-image: url('${r}');"></div>
      <div class="modal-text">
        <h3 class="modal-title">${t.title}</h3>
        <div class="tags-grade-wrap">
        <div>
        <p><strong>Vote / Votes:</strong></p>
        <p><strong>Popularity:</strong></p>
        <p><strong>Genres:</strong></p>
</div><div>
<p> ${t.vote_average} / ${t.vote_count}</p>        
<p> ${t.popularity.toFixed(1)}</p>          
<p> ${t.genres.map(o=>o.name).join(", ")}</p>
    </div></div>
    <div class="modal-text-about">
        <p ><strong>ABOUT:</strong></p>
        <p class="modal-text-about">${t.overview}</p>
    </div>
        <button id="add-to-library" class="add-to-library-btn">Add to my library</button>
      </div>
    </div>
  `,e.style.display="block",e.querySelector(".close-modal").addEventListener("click",()=>{e.style.display="none"}),e.addEventListener("click",o=>{o.target===e&&(e.style.display="none")});const a=document.getElementById("add-to-library");a.addEventListener("click",o=>{const n={title:t.title,vote_average:t.vote_average,vote_count:t.vote_count,popularity:t.popularity,genres:t.genres.map(m=>m.name),overview:t.overview,year:new Date(t.release_date).getFullYear(),poster:`https://image.tmdb.org/t/p/w500${t.poster_path}`};(JSON.parse(localStorage.getItem("myLibrary"))||[]).some(m=>m.title===n.title)?(i(n.title),a.textContent="Add to my library"):(s(n),a.textContent="Remove from my library")});function s(o){const n=JSON.parse(localStorage.getItem("myLibrary"))||[];n.push(o),localStorage.setItem("myLibrary",JSON.stringify(n)),alert(`${o.title} has been added to your library!`)}function i(o){let n=JSON.parse(localStorage.getItem("myLibrary"))||[];n=n.filter(d=>d.title!==o),localStorage.setItem("myLibrary",JSON.stringify(n)),alert(`${o} has been removed from your library!`)}function u(o){(JSON.parse(localStorage.getItem("myLibrary"))||[]).some(g=>g.title===o.title)?a.textContent="Remove from My Library":a.textContent="Add to my Library"}u(t)},l=document.querySelector(".hero"),y=`
  <div class="hero-content">
    <h1 class="hero-header">Let’s Make Your Own Cinema</h1>
    <p class="hero-description get_started_message">Is a guide to creating a personalized movie theater experience. You'll need a projector, screen, and speakers. Decorate your space, choose your films, and stock up on snacks for the full experience.</p>
    <button id="get-started">Get Started</button>
  </div>
`,p=t=>{const e=document.createElement("span");return e.classList.add(`${t}-star`),e.innerHTML="&#9733;",t==="empty"&&(e.innerHTML="&#9734;"),e},k=t=>{const e=document.createElement("div");e.classList.add("star-rating");const r=Math.floor(t/2),a=t%2>=1?1:0,s=5-r-a;for(let i=0;i<r;i++)e.appendChild(p("full"));a&&e.appendChild(p("half"));for(let i=0;i<s;i++)e.appendChild(p("empty"));return e.outerHTML},M=async()=>{try{const e=(await b()).results;if(e.length===0){l.innerHTML=y,document.getElementById("get-started").addEventListener("click",()=>{window.location.href="/catalog"});return}const r=e[Math.floor(Math.random()*e.length)];l.style.backgroundImage=`linear-gradient(to right, rgba(0, 0, 0, 2), rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.1)), url(https://image.tmdb.org/t/p/original/${r.backdrop_path})`,l.innerHTML=`
      <div class="movie-info">
        <h2 class="hero-hader">${r.title}</h2>
        <p class="star-rating">${k(r.vote_average)}</p>
        <p class="hero-description">${r.overview}</p>
        <button id="watch-trailer">Watch Trailer</button>
        <button id="more-details">More Details</button>
      </div>
    `,document.getElementById("watch-trailer").addEventListener("click",async()=>{const a=await f(r.id);w(a)}),document.getElementById("more-details").addEventListener("click",async()=>{const a=await h(r.id);I(a)})}catch(t){console.error("Error fetching trending movies:",t);const e="../images/hero-desktop.jpg",r="../images/hero-tablet.jpg",a="../images/hero-mobile.jpg";window.innerWidth>=1024?l.style.backgroundImage=`url(${e})`:window.innerWidth>=768?l.style.backgroundImage=`url(${r})`:l.style.backgroundImage=`url(${a})`,l.innerHTML=y}};M();export{T as a,h as b,S as c,k as d,b as g,I as o};
//# sourceMappingURL=hero-Dqtculrb.js.map
