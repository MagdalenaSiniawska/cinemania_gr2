import{g as v,d as f,a as L}from"./footer-BCtfmS9H.js";const w=t=>{console.log("Trying to open trailer modal with data:",t);const e=document.getElementById("modal-trailer");if(!e){console.error("Modal element not found!");return}console.log("Trailer data:",t);const r=t.results.find(o=>o.type==="Trailer");r?(e.innerHTML=`
      <div class="modal-content">
        <span class="close-modal">&times;</span>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/${r.key}" 
          frameborder="0" allowfullscreen></iframe>
      </div>
    `,console.log("Trailer found, iframe set:",`https://www.youtube.com/embed/${r.key}`)):(e.innerHTML=`
      <div class="modal-content error-pop-up">
        <span class="close-modal">&times;</span>
        <img src="../images/oops-logo.png" alt="camera icon with popcorn" width="363" height="318"/>
        <p>OOPS... We are very sorry! But we couldn’t find the trailer.</p>
      </div>
    `,console.warn("No trailer found.")),e.style.display="block",console.log("Modal style after setting to block:",window.getComputedStyle(e).display),e.querySelector(".close-modal").addEventListener("click",o=>{o.stopPropagation(),e.style.display="none",console.log("Modal closed via close button.")}),e.querySelector(".modal-content").addEventListener("click",o=>{o.stopPropagation()}),e.addEventListener("click",o=>{o.target===e&&(e.style.display="none",console.log("Modal closed by clicking outside modal-content."))})},k=t=>{const e=document.getElementById("modal-details");if(console.log("Modal element:",e),console.log("Modal is visible:",e.style.display),!e){console.error("Modal element not found!");return}const r=t.vote_average.toFixed(1),o=t.vote_count,d=t.popularity.toFixed(1),s=t.backdrop_path?`https://image.tmdb.org/t/p/original/${t.backdrop_path}`:`https://image.tmdb.org/t/p/original/${t.poster_path}`;e.innerHTML=`
    <div class="modal-content" style="background-image: url('${s}'); background-size: cover; background-position: center; padding: 20px; color: white;">
      <span class="close-modal" style="cursor: pointer; font-size: 24px;">&times;</span>
      <h2>${t.title}</h2>
      <p><strong>Vote / Votes:</strong> ${r} / ${o}</p>
      <p><strong>Popularity:</strong> ${d}</p>
      <p><strong>Genres:</strong> ${t.genres.map(a=>a.name).join(", ")}</p>
      <p><strong>Overview:</strong> ${t.overview}</p>
      <button id="add-to-library" class="add-to-library-btn">Add to my library</button>
    </div>
  `,e.style.display="block",console.log("Modal should now be displayed:",e.style.display),e.classList.add("show"),console.log("Modal should be shown"),e.querySelector(".close-modal").addEventListener("click",()=>{console.log("Close modal clicked"),e.style.display="none"}),e.addEventListener("click",a=>{a.target===e&&(e.style.display="none")});const l=document.getElementById("add-to-library");l.addEventListener("click",a=>{const n={title:t.title,vote_average:t.vote_average,vote_count:t.vote_count,popularity:t.popularity,genres:t.genres.map(m=>m.name),overview:t.overview,year:new Date(t.release_date).getFullYear(),poster:`https://image.tmdb.org/t/p/w500${t.poster_path}`};(JSON.parse(localStorage.getItem("myLibrary"))||[]).some(m=>m.title===n.title)?(b(n.title),l.textContent="Add to my library"):(u(n),l.textContent="Remove from my library")});function u(a){const n=JSON.parse(localStorage.getItem("myLibrary"))||[];n.push(a),localStorage.setItem("myLibrary",JSON.stringify(n)),alert(`${a.title} has been added to your library!`)}function b(a){let n=JSON.parse(localStorage.getItem("myLibrary"))||[];n=n.filter(c=>c.title!==a),localStorage.setItem("myLibrary",JSON.stringify(n)),alert(`${a} has been removed from your library!`)}function h(a){(JSON.parse(localStorage.getItem("myLibrary"))||[]).some(p=>p.title===a.title)?l.textContent="Remove from My Library":l.textContent="Add to my Library"}h(t)},i=document.querySelector(".hero"),y=`
  <div class="hero-content">
    <h1 class="hero-header">Let’s Make Your Own Cinema</h1>
    <p class="hero-description get_started_message">Is a guide to creating a personalized movie theater experience. You'll need a projector, screen, and speakers. Decorate your space, choose your films, and stock up on snacks for the full experience.</p>
    <button id="get-started">Get Started</button>
  </div>
`,g=t=>{const e=document.createElement("span");return e.classList.add(`${t}-star`),e.innerHTML="&#9733;",t==="empty"&&(e.innerHTML="&#9734;"),e},M=t=>{const e=document.createElement("div");e.classList.add("star-rating");const r=Math.floor(t/2),o=t%2>=1?1:0,d=5-r-o;for(let s=0;s<r;s++)e.appendChild(g("full"));o&&e.appendChild(g("half"));for(let s=0;s<d;s++)e.appendChild(g("empty"));return e.outerHTML},E=async()=>{try{const e=(await v()).results;if(e.length===0){i.innerHTML=y,document.getElementById("get-started").addEventListener("click",()=>{window.location.href="/catalog"});return}const r=e[Math.floor(Math.random()*e.length)];i.style.backgroundImage=`linear-gradient(to right, rgba(0, 0, 0, 2), rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.1)), url(https://image.tmdb.org/t/p/original/${r.backdrop_path})`,i.innerHTML=`
      <div class="movie-info">
        <h2 class="hero-hader">${r.title}</h2>
        <p class="star-rating">${M(r.vote_average)}</p>
        <p class="hero-description">${r.overview}</p>
        <button id="watch-trailer">Watch Trailer</button>
        <button id="more-details">More Details</button>
      </div>
    `,document.getElementById("watch-trailer").addEventListener("click",async()=>{const o=await f(r.id);w(o)}),document.getElementById("more-details").addEventListener("click",async()=>{const o=await L(r.id);k(o)})}catch(t){console.error("Error fetching trending movies:",t);const e="../images/hero-desktop.jpg",r="../images/hero-tablet.jpg",o="../images/hero-mobile.jpg";window.innerWidth>=1024?i.style.backgroundImage=`url(${e})`:window.innerWidth>=768?i.style.backgroundImage=`url(${r})`:i.style.backgroundImage=`url(${o})`,i.innerHTML=y}};E();export{M as d,k as o};
//# sourceMappingURL=hero-6f8YhxtL.js.map
