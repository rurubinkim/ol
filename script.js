const sky=document.getElementById("sky");
const fx=document.getElementById("fx");
const sctx=sky.getContext("2d");
const fctx=fx.getContext("2d");
const gift=document.getElementById("gift");
const intro=document.getElementById("intro");
const show=document.getElementById("show");
const typed=document.getElementById("typed");
const toast=document.getElementById("toast");

let W,H,stars=[],meteors=[],particles=[];
let clicks=0;
let opened=false;
let golden=false;

function size(){
  W=sky.width=fx.width=innerWidth;
  H=sky.height=fx.height=innerHeight;
  makeStars();
}
addEventListener("resize",size);
size();

function makeStars(){
  stars=[];
  for(let i=0;i<520;i++){
    stars.push({
      x:Math.random()*W,
      y:Math.random()*H,
      r:Math.random()*2.2+.35,
      a:Math.random()*Math.PI*2,
      speed:.01+Math.random()*.035
    });
  }
}

function drawSky(){
  sctx.clearRect(0,0,W,H);
  for(const st of stars){
    st.a+=st.speed;
    const alpha=.2+Math.abs(Math.sin(st.a))*.8;
    sctx.globalAlpha=alpha;
    sctx.fillStyle="white";
    sctx.beginPath();
    sctx.arc(st.x,st.y,st.r,0,Math.PI*2);
    sctx.fill();
  }
  sctx.globalAlpha=1;

  if(Math.random()<.018){
    meteors.push({
      x:W*(.45+Math.random()*.65),
      y:Math.random()*H*.33,
      vx:-8-Math.random()*8,
      vy:4+Math.random()*5,
      life:55
    });
  }
  for(let i=meteors.length-1;i>=0;i--){
    const m=meteors[i];
    m.x+=m.vx;m.y+=m.vy;m.life--;
    sctx.globalAlpha=m.life/55;
    const grad=sctx.createLinearGradient(m.x,m.y,m.x-m.vx*10,m.y-m.vy*10);
    grad.addColorStop(0,"white");
    grad.addColorStop(1,"transparent");
    sctx.strokeStyle=grad;
    sctx.lineWidth=3;
    sctx.beginPath();
    sctx.moveTo(m.x,m.y);
    sctx.lineTo(m.x-m.vx*10,m.y-m.vy*10);
    sctx.stroke();
    if(m.life<=0)meteors.splice(i,1);
  }
  requestAnimationFrame(drawSky);
}
drawSky();

function firework(x,y,power=1){
  const colors=golden
    ? ["#fff","#ffe600","#ff8c00","#ff2bd6","#00f5ff","#aaff00"]
    : ["#ffd700","#ff4d6d","#4cc9f0","#b8ff60","#ffffff","#ff9f1c","#c77dff"];
  const count=Math.floor(95*power);
  for(let i=0;i<count;i++){
    const a=Math.random()*Math.PI*2;
    const sp=(2+Math.random()*7)*power;
    particles.push({
      x,y,
      vx:Math.cos(a)*sp,
      vy:Math.sin(a)*sp,
      r:1.6+Math.random()*3.3,
      c:colors[Math.floor(Math.random()*colors.length)],
      life:80+Math.random()*30,
      max:110,
      g:.045+Math.random()*.025
    });
  }
}

function drawFx(){
  fctx.clearRect(0,0,W,H);
  fctx.globalCompositeOperation="lighter";
  for(let i=particles.length-1;i>=0;i--){
    const p=particles[i];
    p.x+=p.vx;p.y+=p.vy;p.vy+=p.g;p.vx*=.992;p.vy*=.992;p.life--;
    fctx.globalAlpha=Math.max(0,p.life/p.max);
    fctx.fillStyle=p.c;
    fctx.shadowBlur=16;
    fctx.shadowColor=p.c;
    fctx.beginPath();
    fctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    fctx.fill();
    if(p.life<=0)particles.splice(i,1);
  }
  fctx.shadowBlur=0;
  fctx.globalAlpha=1;
  fctx.globalCompositeOperation="source-over";
  requestAnimationFrame(drawFx);
}
drawFx();

setInterval(()=>firework(Math.random()*W,80+Math.random()*H*.45,golden?1.55:1),golden?520:900);

function drop(){
  const e=document.createElement("div");
  e.className="float";
  const arr=golden?["👑","💎","✨","⭐","💛","🎊","🎉","🎈"]:["🎊","🎉","✨","⭐","💛","💙","🎈","💜"];
  e.textContent=arr[Math.floor(Math.random()*arr.length)];
  e.style.left=Math.random()*100+"vw";
  e.style.top="-60px";
  e.style.fontSize=18+Math.random()*(golden?42:30)+"px";
  e.style.animationDuration=(2.8+Math.random()*4)+"s";
  document.body.appendChild(e);
  setTimeout(()=>e.remove(),7500);
}
setInterval(drop, golden?35:65);

function hearts(n=120){
  for(let i=0;i<n;i++){
    const h=document.createElement("div");
    h.className="heart";
    h.textContent=["❤️","💛","💖","💙","💜"][Math.floor(Math.random()*5)];
    h.style.left=Math.random()*100+"vw";
    h.style.top=(76+Math.random()*18)+"vh";
    h.style.fontSize=20+Math.random()*30+"px";
    document.body.appendChild(h);
    setTimeout(()=>h.remove(),3400);
  }
}

function sparkleBurst(x,y,n=100){
  for(let i=0;i<n;i++){
    const sp=document.createElement("div");
    sp.className="spark";
    sp.textContent=["✨","⭐","💫"][Math.floor(Math.random()*3)];
    sp.style.left=x+"px";sp.style.top=y+"px";
    sp.style.fontSize=12+Math.random()*28+"px";
    const a=Math.random()*Math.PI*2;
    const r=80+Math.random()*260;
    sp.style.setProperty("--x",Math.cos(a)*r+"px");
    sp.style.setProperty("--y",Math.sin(a)*r+"px");
    document.body.appendChild(sp);
    setTimeout(()=>sp.remove(),1600);
  }
}

const letterText =
`생일 정말 축하드려요! 🎉
항상 우리 가족을 위해 열심히 일해주셔서 감사합니다.

오래오래 건강하시고
행복한 일만 가득하세요.

아빠는 우리 가족의 든든한 별이에요. ✨`;

function typeLetter(){
  typed.textContent="";
  let i=0;
  const timer=setInterval(()=>{
    typed.textContent+=letterText[i] || "";
    i++;
    if(i>=letterText.length) clearInterval(timer);
  },1);
}

function showToast(text){
  toast.textContent=text;
  toast.classList.add("show");
  setTimeout(()=>toast.classList.remove("show"),1700);
}

function goldenMode(){
  if(golden)return;
  golden=true;
  document.body.classList.add("goldenMode");
  const t=document.createElement("div");
  t.className="goldenText";
  t.textContent="👑 GOLDEN MODE 👑";
  document.body.appendChild(t);
  setTimeout(()=>t.remove(),2300);
  for(let i=0;i<14;i++){
    setTimeout(()=>firework(Math.random()*W,80+Math.random()*H*.5,2),i*130);
  }
  hearts(220);
  showToast("👑 Golden Mode 발동!");
}

gift.addEventListener("click",()=>{
  clicks++;
  const rect=gift.getBoundingClientRect();
  sparkleBurst(rect.left+rect.width/2,rect.top+rect.height/2,60);
  firework(rect.left+rect.width/2,rect.top+rect.height/2,.9);

  if(clicks>=5 && !golden) goldenMode();

  if(opened) return;
  opened=true;
  gift.classList.add("openGift");
  showToast("🎁 선물 개봉!");
  setTimeout(()=>{
    intro.classList.add("hidden");
    show.classList.remove("hidden");
    show.classList.add("reveal");
    typeLetter();
    hearts(170);
    for(let i=0;i<12;i++){
      setTimeout(()=>firework(Math.random()*W,70+Math.random()*H*.45,1.4),i*160);
    }
  },760);
});

addEventListener("click",e=>{
  if(e.target===gift || gift.contains(e.target)) return;
  firework(e.clientX,e.clientY,.75);
});

showToast("✨ 준비 완료!");
