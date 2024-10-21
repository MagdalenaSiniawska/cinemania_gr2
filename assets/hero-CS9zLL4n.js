import{a as l}from"./vendor-nSNXNpMc.js";const f="Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2Y2IxMWQ4ZGE0NTZlOGI5OTIxM2EyNDk4ODM4OGQyNSIsIm5iZiI6MTcyODcyMDEzMC44MDY0Niwic3ViIjoiNjcwYTJiNDEzYmI0NTU3YzY2OWFmYzM5Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.Pgojbxf9JKo_J1qf6Qmglon5qZgkr9wpZ4I978dGQU8";l.defaults.baseURL="https://api.themoviedb.org/3";l.defaults.headers.common.Authorization=f;const w=async(t="day")=>(await l.get(`/trending/movie/${t}`)).data,N=async()=>(await l.get("movie/upcoming")).data;new URLSearchParams({query:"Deadpool",primary_release_year:2024,page:1});const L=async t=>(await l.get(`/movie/${t}`)).data,I=async t=>(await l.get(`/movie/${t}/videos`)).data,M=async()=>{try{const e=(await l.get("/genre/movie/list")).data.genres;return new Map(e.map(o=>[o.id,o.name]))}catch(t){console.log(t)}},x=async t=>{try{const e=await M();return t.map(r=>e.get(r)||"Unknow genre")}catch(e){console.log(e)}},k=t=>{console.log("Trying to open trailer modal with data:",t);const e=document.getElementById("modal-trailer");if(!e){console.error("Modal element not found!");return}console.log("Trailer data:",t);const o=t.results.find(r=>r.type==="Trailer");o?(e.innerHTML=`
      <div class="modal-content">
        <span class="close-modal">&times;</span>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/${o.key}" 
          frameborder="0" allowfullscreen></iframe>
      </div>
    `,console.log("Trailer found, iframe set:",`https://www.youtube.com/embed/${o.key}`)):(e.innerHTML=`
      <div class="modal-content error-pop-up">
        <span class="close-modal">&times;</span>
        <img src="../images/oops-logo.png" alt="camera icon with popcorn" width="363" height="318"/>
        <p>OOPS... We are very sorry! But we couldn’t find the trailer.</p>
      </div>
    `,console.warn("No trailer found.")),e.style.display="block",console.log("Modal style after setting to block:",window.getComputedStyle(e).display),e.querySelector(".close-modal").addEventListener("click",r=>{r.stopPropagation(),e.style.display="none",console.log("Modal closed via close button.")}),e.querySelector(".modal-content").addEventListener("click",r=>{r.stopPropagation()}),e.addEventListener("click",r=>{r.target===e&&(e.style.display="none",console.log("Modal closed by clicking outside modal-content."))})},E=t=>{const e=document.getElementById("modal-details");if(console.log("Modal element:",e),console.log("Modal is visible:",e.style.display),!e){console.error("Modal element not found!");return}const o=t.vote_average.toFixed(1),r=t.vote_count,d=t.popularity.toFixed(1),s=t.backdrop_path?`https://image.tmdb.org/t/p/original/${t.backdrop_path}`:`https://image.tmdb.org/t/p/original/${t.poster_path}`;e.innerHTML=`
    <div class="modal-content" style="background-image: url('${s}'); background-size: cover; background-position: center; padding: 20px; color: white;">
      <span class="close-modal" style="cursor: pointer; font-size: 24px;">&times;</span>
      <h2>${t.title}</h2>
      <p><strong>Vote / Votes:</strong> ${o} / ${r}</p>
      <p><strong>Popularity:</strong> ${d}</p>
      <p><strong>Genres:</strong> ${t.genres.map(a=>a.name).join(", ")}</p>
      <p><strong>Overview:</strong> ${t.overview}</p>
      <button id="add-to-library" class="add-to-library-btn">Add to my library</button>
    </div>
  `,e.style.display="block",console.log("Modal should now be displayed:",e.style.display),e.classList.add("show"),console.log("Modal should be shown"),e.querySelector(".close-modal").addEventListener("click",()=>{console.log("Close modal clicked"),e.style.display="none"}),e.addEventListener("click",a=>{a.target===e&&(e.style.display="none")});const c=document.getElementById("add-to-library");c.addEventListener("click",a=>{const n={title:t.title,vote_average:t.vote_average,vote_count:t.vote_count,popularity:t.popularity,genres:t.genres.map(g=>g.name),overview:t.overview,year:new Date(t.release_date).getFullYear(),poster:`https://image.tmdb.org/t/p/w500${t.poster_path}`};(JSON.parse(localStorage.getItem("myLibrary"))||[]).some(g=>g.title===n.title)?(h(n.title),c.textContent="Add to my library"):(b(n),c.textContent="Remove from my library")});function b(a){const n=JSON.parse(localStorage.getItem("myLibrary"))||[];n.push(a),localStorage.setItem("myLibrary",JSON.stringify(n)),alert(`${a.title} has been added to your library!`)}function h(a){let n=JSON.parse(localStorage.getItem("myLibrary"))||[];n=n.filter(m=>m.title!==a),localStorage.setItem("myLibrary",JSON.stringify(n)),alert(`${a} has been removed from your library!`)}function v(a){(JSON.parse(localStorage.getItem("myLibrary"))||[]).some(y=>y.title===a.title)?c.textContent="Remove from My Library":c.textContent="Add to my Library"}v(t)},i=document.querySelector(".hero"),u=`
  <div class="hero-content">
    <h1 class="hero-header">Let’s Make Your Own Cinema</h1>
    <p class="hero-description get_started_message">Is a guide to creating a personalized movie theater experience. You'll need a projector, screen, and speakers. Decorate your space, choose your films, and stock up on snacks for the full experience.</p>
    <button id="get-started">Get Started</button>
  </div>
`,p=t=>{const e=document.createElement("span");return e.classList.add(`${t}-star`),e.innerHTML="&#9733;",t==="empty"&&(e.innerHTML="&#9734;"),e},S=t=>{const e=document.createElement("div");e.classList.add("star-rating");const o=Math.floor(t/2),r=t%2>=1?1:0,d=5-o-r;for(let s=0;s<o;s++)e.appendChild(p("full"));r&&e.appendChild(p("half"));for(let s=0;s<d;s++)e.appendChild(p("empty"));return e.outerHTML},T=async()=>{try{const e=(await w()).results;if(e.length===0){i.innerHTML=u,document.getElementById("get-started").addEventListener("click",()=>{window.location.href="/catalog"});return}const o=e[Math.floor(Math.random()*e.length)];i.style.backgroundImage=`linear-gradient(to right, rgba(0, 0, 0, 2), rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.1)), url(https://image.tmdb.org/t/p/original/${o.backdrop_path})`,i.innerHTML=`
      <div class="movie-info">
        <h2 class="hero-hader">${o.title}</h2>
        <p class="star-rating">${S(o.vote_average)}</p>
        <p class="hero-description">${o.overview}</p>
        <button id="watch-trailer">Watch Trailer</button>
        <button id="more-details">More Details</button>
      </div>
    `,document.getElementById("watch-trailer").addEventListener("click",async()=>{const r=await I(o.id);k(r)}),document.getElementById("more-details").addEventListener("click",async()=>{const r=await L(o.id);E(r)})}catch(t){console.error("Error fetching trending movies:",t);const e="../images/hero-desktop.jpg",o="../images/hero-tablet.jpg",r="../images/hero-mobile.jpg";window.innerWidth>=1024?i.style.backgroundImage=`url(${e})`:window.innerWidth>=768?i.style.backgroundImage=`url(${o})`:i.style.backgroundImage=`url(${r})`,i.innerHTML=u}};T();export{N as a,L as b,x as c,S as d,w as g,E as o};
//# sourceMappingURL=hero-CS9zLL4n.js.map
