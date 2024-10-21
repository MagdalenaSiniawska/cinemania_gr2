import"./assets/footer-DHKSWr6F.js";import{g as u,a as w,o as L,b as M,c as h,d as v,e as E}from"./assets/hero_modals-CRgCPP3_.js";import"./assets/vendor-nSNXNpMc.js";const c=document.querySelector(".hero"),g=`
  <div class="hero-content">
    <h1 class="hero-header">Let’s Make Your Own Cinema</h1>
    <p class="hero-description">Is a guide to creating a personalized movie theater experience. You'll need a projector, screen, and speakers. Decorate your space, choose your films, and stock up on snacks for the full experience.</p>
    <button id="get-started">Get Started</button>
  </div>
`,l=t=>{const r=document.createElement("span");return r.classList.add(`${t}-star`),r.innerHTML="&#9733;",t==="empty"&&(r.innerHTML="&#9734;"),r},_=t=>{const r=document.createElement("div");r.classList.add("star-rating");const e=Math.floor(t/2),n=t%2>=1?1:0,o=5-e-n;for(let a=0;a<e;a++)r.appendChild(l("full"));n&&r.appendChild(l("half"));for(let a=0;a<o;a++)r.appendChild(l("empty"));return r.outerHTML},k=async()=>{try{const r=(await u()).results;if(r.length===0){c.innerHTML=g,document.getElementById("get-started").addEventListener("click",()=>{window.location.href="/catalog"});return}const e=r[Math.floor(Math.random()*r.length)];c.style.backgroundImage=`linear-gradient(to right, rgba(0, 0, 0, 2), rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.1)), url(https://image.tmdb.org/t/p/original/${e.backdrop_path})`,c.innerHTML=`
      <div class="movie-info">
        <h2 class="hero-hader">${e.title}</h2>
        <p class="star-rating">${_(e.vote_average)}</p>
        <p class="hero-description">${e.overview}</p>
        <button id="watch-trailer">Watch Trailer</button>
        <button id="more-details">More Details</button>
      </div>
    `,document.getElementById("watch-trailer").addEventListener("click",async()=>{const n=await w(e.id);L(n)}),document.getElementById("more-details").addEventListener("click",async()=>{const n=await M(e.id);h(n)})}catch(t){console.error("Error fetching trending movies:",t);const r="../images/hero-desktop.jpg",e="../images/hero-tablet.jpg",n="../images/hero-mobile.jpg";window.innerWidth>=1024?c.style.backgroundImage=`url(${r})`:window.innerWidth>=768?c.style.backgroundImage=`url(${e})`:c.style.backgroundImage=`url(${n})`,c.innerHTML=g}};k();const m=t=>{const e=Math.round(t*2)/2,n=Math.floor(e),o=e%1===.5?1:0,a=5-n-o;let d="";for(let i=0;i<n;i++)d+='<svg class="icon"><use xlink:href="#icon-star"></use></svg>';o&&(d+='<svg class="icon"><use xlink:href="#icon-star-half"></use></svg>');for(let i=0;i<a;i++)d+='<svg class="icon"><use xlink:href="#icon-star-empty"></use></svg>';return d},p=async()=>{try{const r=(await u("week")).results,e=document.querySelector("#trending-container"),n=window.innerWidth<768?1:3;e.innerHTML="";for(const o of r.slice(0,n)){const a=await v(o.genre_ids),i=a.slice(0,2).join(", "),s=document.createElement("div");s.classList.add("trending-card"),s.setAttribute("data-movie-id",o.id);const b=o.poster_path?`https://image.tmdb.org/t/p/w500${o.poster_path}`:`https://image.tmdb.org/t/p/w500${o.backdrop_path}`;s.innerHTML=`
        <img src="${b}" alt="${o.title}">
        <h3>${o.title.toUpperCase()}</h3>
        <p>${i} | ${new Date(o.release_date).getFullYear()} ${m(o.vote_average/2)}</p>
      `,s.style.backgroundImage=`url('https://image.tmdb.org/t/p/original${o.backdrop_path}')`,s.innerHTML=`
  <div class="card-info">
    <h3>${o.title.toUpperCase()}</h3>
    <div class="card-info-inner">
      <div class="card-info-left">
        <p class="card-info-p">${i} | ${new Date(o.release_date).getFullYear()}</p>
      </div>
      <div class="card-info-right">
        ${m(o.vote_average/2)}
      </div>
    </div>
  </div>
`,s.addEventListener("click",async()=>{const f={...o,genres:a};h(f)}),e.appendChild(s)}}catch(t){console.error("Error fetching trending movies:",t)}},y=t=>(JSON.parse(localStorage.getItem("myLibrary"))||[]).some(e=>e.id===t),I=t=>{const r=JSON.parse(localStorage.getItem("myLibrary"))||[],e={id:t.id,title:t.title,poster:`https://image.tmdb.org/t/p/w500${t.poster_path}`,backdrop_path:t.backdrop_path,release_date:t.release_date,vote_average:t.vote_average,vote_count:t.vote_count,popularity:t.popularity,overview:t.overview,genre_ids:t.genre_ids};r.push(e),localStorage.setItem("myLibrary",JSON.stringify(r))},S=t=>{let r=JSON.parse(localStorage.getItem("myLibrary"))||[];r=r.filter(e=>e.id!==t),localStorage.setItem("myLibrary",JSON.stringify(r))},$=(t,r)=>{const e={...t,poster:`https://image.tmdb.org/t/p/w500${t.poster_path}`};y(e.id)?(S(e.id),r.textContent="Add to my library"):(I(e),r.textContent="Remove from my library")},C=async()=>{try{const e=(await E()).results[0],o=(await v(e.genre_ids)).join(", ");document.getElementById("upcoming-movie-poster").src=`https://image.tmdb.org/t/p/w500${e.backdrop_path}`,document.getElementById("upcoming-movie-title").textContent=e.title,document.getElementById("upcoming-release-date").textContent=e.release_date,document.querySelector(".vote-average").textContent=e.vote_average,document.querySelector(".vote-count").textContent=e.vote_count,document.getElementById("upcoming-popularity").textContent=e.popularity,document.getElementById("upcoming-overview").textContent=e.overview,document.getElementById("upcoming-genre").textContent=o;const a=document.getElementById("add-library-button");a.textContent=y(e.id)?"Remove from my library":"Add to my library",a.addEventListener("click",()=>$(e,a))}catch(t){console.error("Error fetching upcoming movies:",t),document.getElementById("upcoming-no-movies-message").style.display="block"}};document.addEventListener("DOMContentLoaded",()=>{p(),C(),window.addEventListener("resize",p)});
//# sourceMappingURL=index.js.map
