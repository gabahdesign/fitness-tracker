/* FORMA · demostracions visuals integrades. Els esquemes no són animacions 3D validades. */
(()=>{
"use strict";
const $=id=>document.getElementById(id);
const esc=x=>String(x??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const profiles={
warm:["up","Dempeus · mobilitat"],
w:["rotate","Bocaterrosa · espatlles"],
angel:["side","Bocaterrosa · braços"],
push:["lower","Planxa · flexions"],
reverse:["up","Estirat · abdomen"],
bird:["side","Quadrupèdia · estabilitat"],
squat:["lower","Dempeus · cames"],
bridge:["up","Estirat · malucs"],
incline:["lower","Flexió inclinada"],
hinge:["rotate","Dempeus · frontissa de maluc"],
dead:["side","Estirat · coordinació"],
y:["rotate","Bocaterrosa · braços en Y"],
side:["still","Planxa lateral · estabilitat"],
neck:["side","Dempeus · coll"],
thoracic:["rotate","Mobilitat toràcica"],
wall:["up","A la paret · braços"],
chest:["still","Estirament de pit"],
breath:["up","Respiració controlada"],
runwarm:["side","Escalfament abans de córrer"],
run5:["side","Cursa · ritme suau"],
runcool:["side","Tornada a la calma"],
option:["still","Activitat opcional"],
sunday:["side","Cursa o senderisme"]
};
function figure(id){
const p=profiles[id]||["still","Moviment"];
const isGround=/^(w|angel|push|reverse|bird|bridge|incline|dead|y|side)$/.test(id);
const x=isGround?0:1;
return '<div class="demoStage" data-motion="'+p[0]+'" role="img" aria-label="Esquema animat orientatiu de '+esc(E[id][0])+'. No és una demostració tècnica 3D validada."><svg viewBox="0 0 420 210" aria-hidden="true"><defs><linearGradient id="formaActor" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#e2ff89"/><stop offset="1" stop-color="#9fc624"/></linearGradient></defs><ellipse class="shadow" cx="210" cy="181" rx="125" ry="11"/><path class="floor" d="M30 185H390"/><g class="actor">'+(x?
'<circle cx="210" cy="42" r="19" fill="#d3d9da"/><path class="torso" d="M210 75V122"/><path class="limb" d="M210 87L173 113M210 87L247 113M210 123L186 178M210 123L234 178"/><path stroke="#1e2322" stroke-width="3" d="M199 95H221"/>':
'<circle cx="315" cy="107" r="17" fill="#d3d9da"/><path class="torso" d="M294 112L190 115"/><path class="limb" d="M188 115L99 146M99 146L75 174M284 119L282 170M320 123L328 171"/><path stroke="#1e2322" stroke-width="3" d="M245 110L217 113"/>')+'</g></svg></div>';
}
function tile(id,i){
const e=E[id];if(!e)return "";
return '<article class="demoTile" data-exercise="'+esc(id)+'"><div class="demoTileHead"><strong>'+(i+1)+'. '+esc(e[0])+'</strong><span class="demoPill">'+esc(e[1])+'</span></div>'+figure(id)+'<div class="demoTileBody"><p>'+esc(e[2])+'</p><p class="demoPill" style="display:inline-block">Esquema orientatiu · animació 3D pendent</p><div class="demoMore"><p><strong>Com fer-lo:</strong> '+esc(e[3])+'</p><p class="caution"><strong>Precaució:</strong> '+esc(e[4])+'</p></div><div class="demoActions"><button type="button" data-more="'+esc(id)+'">Instruccions i precaucions</button><button type="button" data-pause="'+esc(id)+'">Pausa l'esquema</button></div></div></article>';
}
function bind(root){
root.querySelectorAll("[data-more]").forEach(b=>b.onclick=()=>{const t=b.closest(".demoTile");t.classList.toggle("expanded");b.textContent=t.classList.contains("expanded")?"Amaga les instruccions":"Instruccions i precaucions"});
root.querySelectorAll("[data-pause]").forEach(b=>b.onclick=()=>{const actor=b.closest(".demoTile").querySelector(".actor");const paused=actor.style.animationPlayState==="paused";actor.style.animationPlayState=paused?"running":"paused";b.textContent=paused?"Pausa l'esquema":"Reprèn l'esquema"});
}
function renderDay(){
const day=D[selected];if(!day)return;
const home=$("dailyDemos");
if(home){home.innerHTML='<section class="section"><div class="sectionTitle"><h2>Com es fan els exercicis d’avui</h2><span class="sub">'+esc(day[0])+'</span></div><p class="sub">Previsualitzacions orientatives. Les demostracions 3D definitives encara estan pendents de producció i revisió tècnica.</p><div class="demoList">'+day[7].map(tile).join("")+'</div></section>';bind(home)}
const detail=$("detailDemos");if(detail){detail.innerHTML='<section class="section"><div class="sectionTitle"><h2>Guia visual de la sessió</h2></div><div class="demoList">'+day[7].map(tile).join("")+'</div></section>';bind(detail)}
const work=$("workoutDemo");if(work&&screen==="workout"){const id=day[7][exerciseIndex];work.innerHTML='<div class="section"><div class="sectionTitle"><h2>Demostració visual</h2></div>'+tile(id,0)+'</div>';bind(work)}
}
const prevShow=show;show=function(id){prevShow(id);renderDay()};
const prevWorkout=renderWorkout;renderWorkout=function(){prevWorkout();renderDay()};
const prevRender=render;render=function(){prevRender();renderDay()};
const prevDetail=renderDetail;renderDetail=function(){prevDetail();renderDay()};
renderDay();
})();