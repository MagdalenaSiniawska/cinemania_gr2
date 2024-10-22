import"./assets/footer-DQzmd3O7.js";import{g as b,c as u,o as f,a as h}from"./assets/hero-Dqtculrb.js";import"./assets/vendor-nSNXNpMc.js";const p=i=>{const e=Math.round(i*2)/2,l=Math.floor(e),t=e%1===.5?1:0,o=5-l-t;let c="";for(let n=0;n<l;n++)c+='<svg class="icon"><use xlink:href="#icon-star"></use></svg>';t&&(c+='<svg class="icon"><use xlink:href="#icon-star-half"></use></svg>');for(let n=0;n<o;n++)c+='<svg class="icon"><use xlink:href="#icon-star-empty"></use></svg>';return c},v=async()=>{try{const m=(await b("week")).results,e=document.querySelector("#trending-container"),l=window.innerWidth<768?1:3;e.innerHTML="";for(const t of m.slice(0,l)){const o=await u(t.genre_ids),n=o.slice(0,2).join(", "),a=document.createElement("div");a.classList.add("trending-card"),a.setAttribute("data-movie-id",t.id);const s=t.poster_path?`https://image.tmdb.org/t/p/w500${t.poster_path}`:`https://image.tmdb.org/t/p/w500${t.backdrop_path}`;a.innerHTML=`
        <img src="${s}" alt="${t.title}">
        <h3>${t.title.toUpperCase()}</h3>
        <p>${n} | ${new Date(t.release_date).getFullYear()} ${p(t.vote_average/2)}</p>
      `,a.style.backgroundImage=`url('https://image.tmdb.org/t/p/original${t.backdrop_path}')`,a.innerHTML=`
  <div class="card-info">
    <h3>${t.title.toUpperCase()}</h3>
    <div class="card-info-inner">
      <div class="card-info-left">
        <p class="card-info-p">${n} | ${new Date(t.release_date).getFullYear()}</p>
      </div>
      <div class="card-info-right">
        ${p(t.vote_average/2)}
      </div>
    </div>
  </div>
`,a.addEventListener("click",async()=>{const r={...t,genres:o};f(r)}),e.appendChild(a)}}catch(i){console.error("Error fetching trending movies:",i)}},L=i=>(JSON.parse(localStorage.getItem("myLibrary"))||[]).some(e=>e.id===i),x=async()=>{try{let c=function(s){const r=JSON.parse(localStorage.getItem("myLibrary"))||[];r.push(s),localStorage.setItem("myLibrary",JSON.stringify(r)),alert(`${s.title} has been added to your library!`)},n=function(s){let r=JSON.parse(localStorage.getItem("myLibrary"))||[];r=r.filter(d=>d.title!==s),localStorage.setItem("myLibrary",JSON.stringify(r)),alert(`${s} has been removed from your library!`)},a=function(s){(JSON.parse(localStorage.getItem("myLibrary"))||[]).some(y=>y.title===e.title)?o.textContent="Remove from My Library":o.textContent="Add to my Library"};const e=(await h()).results[Math.floor(Math.random()*10)];console.log(e);const t=(await u(e.genre_ids)).join(", ");document.getElementById("upcoming-movie-poster").src=`https://image.tmdb.org/t/p/w500${e.backdrop_path}`,document.getElementById("upcoming-movie-title").textContent=e.title,document.getElementById("upcoming-release-date").textContent=e.release_date,document.querySelector(".vote-average").textContent=e.vote_average.toFixed(1),document.querySelector(".vote-count").textContent=e.vote_count,document.getElementById("upcoming-popularity").textContent=e.popularity.toFixed(1),document.getElementById("upcoming-overview").textContent=e.overview,document.getElementById("upcoming-genre").textContent=t;const o=document.getElementById("add-library-button");o.textContent=L(e.id)?"Remove from my library":"Add to my library",o.addEventListener("click",s=>{const r={title:e.title,vote_average:e.vote_average,vote_count:e.vote_count,popularity:e.popularity,genres:e.genre_ids.map(g=>g.name),overview:e.overview,year:new Date(e.release_date).getFullYear(),poster:`https://image.tmdb.org/t/p/w500${e.poster_path}`};(JSON.parse(localStorage.getItem("myLibrary"))||[]).some(g=>g.title===r.title)?(n(r.title),o.textContent="Add to my library"):(c(r),o.textContent="Remove from my library")}),a(e)}catch(i){console.error("Error fetching upcoming movies:",i),document.getElementById("upcoming-no-movies-message").style.display="block"}};document.addEventListener("DOMContentLoaded",()=>{v(),x(),window.addEventListener("resize",v)});
//# sourceMappingURL=index.js.map
