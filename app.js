const EN={};document.querySelectorAll("[data-t]").forEach(e=>EN[e.dataset.t]=e.textContent);EN.search="Search the menu";EN.all="All";EN.none="No items match your search.";
let lang="en",cat=-1;
const $=s=>document.querySelector(s),items=$("#items"),tabs=$("#tabs"),q=$("#q");
function tr(k){return lang==="ar"?(T.ar[k]||EN[k]):EN[k]}
function drawTabs(){tabs.innerHTML="";[[-1,tr("all")],...MENU.map((c,i)=>[i,lang==="ar"?c[1]:c[0]])].forEach(([i,l])=>{const b=document.createElement("button");b.className="tab"+(i===cat?" on":"");b.textContent=l;b.setAttribute("role","tab");b.setAttribute("aria-selected",i===cat);b.onclick=()=>{cat=i;drawTabs();drawItems()};tabs.appendChild(b)})}
function drawItems(){const s=q.value.trim().toLowerCase();items.innerHTML="";let n=0;MENU.forEach((c,i)=>{if(cat!==-1&&cat!==i)return;c[3].forEach(([name,price])=>{if(s&&!name.toLowerCase().includes(s))return;n++;const d=document.createElement("div");d.className="item";const b=document.createElement("b");b.textContent=name;const p=document.createElement("span");p.textContent=price+" EGP";d.append(b,p);items.appendChild(d)})});if(!n){const p=document.createElement("p");p.className="note";p.textContent=tr("none");items.appendChild(p)}}
function setLang(l){lang=l;document.documentElement.lang=l;document.documentElement.dir=l==="ar"?"rtl":"ltr";document.querySelectorAll("[data-t]").forEach(e=>e.textContent=tr(e.dataset.t));q.placeholder=tr("search");$("#lang").textContent=l==="ar"?"English":"عربي";drawTabs();drawItems();try{localStorage.setItem("pp-site-lang",l)}catch(e){}}
$("#lang").onclick=()=>setLang(lang==="ar"?"en":"ar");q.oninput=drawItems;
$("#menuBtn").onclick=()=>{const o=$("#links").classList.toggle("open");$("#menuBtn").setAttribute("aria-expanded",o)};
document.querySelectorAll("#links a").forEach(a=>a.onclick=()=>$("#links").classList.remove("open"));
const nav=$("#nav");addEventListener("scroll",()=>nav.classList.toggle("scrolled",scrollY>40),{passive:true});
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("vis");io.unobserve(e.target)}}),{threshold:.15});document.querySelectorAll(".reveal").forEach(e=>io.observe(e));
$("#yr").textContent=new Date().getFullYear();
let saved="en";try{saved=localStorage.getItem("pp-site-lang")||"en"}catch(e){}setLang(saved);
(function(){
const RM=matchMedia("(prefers-reduced-motion: reduce)").matches,FINE=matchMedia("(hover:hover) and (pointer:fine)").matches;
const mq=document.getElementById("mq");function drawMq(){const l=document.documentElement.lang==="ar";const names=MENU.map(c=>l?c[1]:c[0]);mq.innerHTML="";[...names,...names,...names,...names].forEach(n=>{const s=document.createElement("span");s.textContent=n;mq.appendChild(s)})}
drawMq();const HB=getComputedStyle(document.getElementById("hero")).backgroundImage;document.querySelectorAll(".flip").forEach(f=>f.style.setProperty("--img",HB));document.getElementById("lang").addEventListener("click",()=>setTimeout(drawMq,0));
document.querySelectorAll(".flip").forEach(f=>{f.addEventListener("click",()=>f.classList.toggle("on"));f.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();f.classList.toggle("on")}})});
const prog=document.getElementById("progress"),hero=document.getElementById("hero"),top=document.getElementById("toTop");
top.onclick=()=>scrollTo({top:0,behavior:RM?"auto":"smooth"});
let tick=false;function onScroll(){if(tick)return;tick=true;requestAnimationFrame(()=>{const h=document.documentElement.scrollHeight-innerHeight;prog.style.setProperty("--p",h>0?scrollY/h:0);if(!RM&&scrollY<innerHeight)hero.style.setProperty("--py",(scrollY*.35)+"px");top.classList.toggle("show",scrollY>innerHeight*.8);tick=false})}
addEventListener("scroll",onScroll,{passive:true});onScroll();
if(RM)return;
if(FINE){hero.addEventListener("pointermove",e=>{const r=hero.getBoundingClientRect();hero.querySelectorAll(".shape").forEach(s=>{s.style.setProperty("--mx",((e.clientX-r.left)/r.width-.5)*2);s.style.setProperty("--my",((e.clientY-r.top)/r.height-.5)*2)})});
document.querySelectorAll(".tilt").forEach(el=>{el.addEventListener("pointermove",e=>{const r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;el.style.setProperty("--ry",((x-.5)*12)+"deg");el.style.setProperty("--rx",((.5-y)*10)+"deg");el.style.setProperty("--gx",x*100+"%");el.style.setProperty("--gy",y*100+"%");el.classList.add("is-tilting")});el.addEventListener("pointerleave",()=>el.classList.remove("is-tilting"))})}
const cio=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;cio.unobserve(e.target);const el=e.target,end=+el.dataset.count,suf=el.dataset.suffix||"",t0=performance.now(),dur=1400;function step(t){const k=Math.min(1,(t-t0)/dur),v=Math.round(end*(1-Math.pow(1-k,3)));el.textContent=v+suf;if(k<1)requestAnimationFrame(step)}requestAnimationFrame(step)}),{threshold:.6});
document.querySelectorAll("[data-count]").forEach(el=>cio.observe(el));
const items=document.getElementById("items");new MutationObserver(()=>{items.classList.remove("swap");void items.offsetWidth;items.classList.add("swap");[...items.children].slice(0,40).forEach((c,i)=>c.style.animationDelay=(i*0.015)+"s")}).observe(items,{childList:true});
})();
