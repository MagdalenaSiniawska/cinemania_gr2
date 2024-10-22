import{g as v,c as g,b as y}from"./assets/footer-BRG6CyJb.js";import{o as h}from"./assets/hero-BM8Da8_3.js";import"./assets/vendor-nSNXNpMc.js";const d=t=>{const e=Math.round(t*2)/2,s=Math.floor(e),r=e%1===.5?1:0,n=5-s-r;let c="";for(let a=0;a<s;a++)c+='<svg class="icon"><use xlink:href="#icon-star"></use></svg>';r&&(c+='<svg class="icon"><use xlink:href="#icon-star-half"></use></svg>');for(let a=0;a<n;a++)c+='<svg class="icon"><use xlink:href="#icon-star-empty"></use></svg>';return c},l=async()=>{try{const o=(await v("week")).results,e=document.querySelector("#trending-container"),s=window.innerWidth<768?1:3;e.innerHTML="";for(const r of o.slice(0,s)){const n=await g(r.genre_ids),a=n.slice(0,2).join(", "),i=document.createElement("div");i.classList.add("trending-card"),i.setAttribute("data-movie-id",r.id);const p=r.poster_path?`https://image.tmdb.org/t/p/w500${r.poster_path}`:`https://image.tmdb.org/t/p/w500${r.backdrop_path}`;i.innerHTML=`
        <img src="${p}" alt="${r.title}">
        <h3>${r.title.toUpperCase()}</h3>
        <p>${a} | ${new Date(r.release_date).getFullYear()} ${d(r.vote_average/2)}</p>
      `,i.style.backgroundImage=`url('https://image.tmdb.org/t/p/original${r.backdrop_path}')`,i.innerHTML=`
  <div class="card-info">
    <h3>${r.title.toUpperCase()}</h3>
    <div class="card-info-inner">
      <div class="card-info-left">
        <p class="card-info-p">${a} | ${new Date(r.release_date).getFullYear()}</p>
      </div>
      <div class="card-info-right">
        ${d(r.vote_average/2)}
      </div>
    </div>
  </div>
`,i.addEventListener("click",async()=>{const u={...r,genres:n};h(u)}),e.appendChild(i)}}catch(t){console.error("Error fetching trending movies:",t)}},m=t=>(JSON.parse(localStorage.getItem("myLibrary"))||[]).some(e=>e.id===t),b=t=>{const o=JSON.parse(localStorage.getItem("myLibrary"))||[],e={id:t.id,title:t.title,poster:`https://image.tmdb.org/t/p/w500${t.poster_path}`,backdrop_path:t.backdrop_path,release_date:t.release_date,vote_average:t.vote_average,vote_count:t.vote_count,popularity:t.popularity,overview:t.overview,genre_ids:t.genre_ids};o.push(e),localStorage.setItem("myLibrary",JSON.stringify(o))},f=t=>{let o=JSON.parse(localStorage.getItem("myLibrary"))||[];o=o.filter(e=>e.id!==t),localStorage.setItem("myLibrary",JSON.stringify(o))},_=(t,o)=>{const e={...t,poster:`https://image.tmdb.org/t/p/w500${t.poster_path}`};m(e.id)?(f(e.id),o.textContent="Add to my library"):(b(e),o.textContent="Remove from my library")},w=async()=>{try{const e=(await y()).results[0],r=(await g(e.genre_ids)).join(", ");document.getElementById("upcoming-movie-poster").src=`https://image.tmdb.org/t/p/w500${e.backdrop_path}`,document.getElementById("upcoming-movie-title").textContent=e.title,document.getElementById("upcoming-release-date").textContent=e.release_date,document.querySelector(".vote-average").textContent=e.vote_average.toFixed(1),document.querySelector(".vote-count").textContent=e.vote_count,document.getElementById("upcoming-popularity").textContent=e.popularity.toFixed(1),document.getElementById("upcoming-overview").textContent=e.overview,document.getElementById("upcoming-genre").textContent=r;const n=document.getElementById("add-library-button");n.textContent=m(e.id)?"Remove from my library":"Add to my library",n.addEventListener("click",()=>_(e,n))}catch(t){console.error("Error fetching upcoming movies:",t),document.getElementById("upcoming-no-movies-message").style.display="block"}};document.addEventListener("DOMContentLoaded",()=>{l(),w(),window.addEventListener("resize",l)});
//# sourceMappingURL=index.js.map
