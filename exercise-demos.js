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
return '<div class="demoStage" data-motion="still"><canvas class="exercise3d" data-model="'+esc(id)+'" width="600" height="300" style="width:100%;height:100%;display:block" role="img" aria-label="Avatar 3D animat orientatiu de '+esc(E[id][0])+'"></canvas></div>';
}
function tile(id,i){
const e=E[id];if(!e)return "";
return '<article class="demoTile" data-exercise="'+esc(id)+'"><div class="demoTileHead"><strong>'+(i+1)+'. '+esc(e[0])+'</strong><span class="demoPill">'+esc(e[1])+'</span></div>'+figure(id)+'<div class="demoTileBody"><p>'+esc(e[2])+'</p><p class="demoPill" style="display:inline-block">Avatar 3D animat · moviment orientatiu</p><div class="demoMore"><p><strong>Com fer-lo:</strong> '+esc(e[3])+'</p><p class="caution"><strong>Precaució:</strong> '+esc(e[4])+'</p></div><div class="demoActions"><button type="button" data-more="'+esc(id)+'">Instruccions i precaucions</button><button type="button" data-pause="'+esc(id)+'">Pausa animació</button></div></div></article>';
}
function bind(root){
root.querySelectorAll("[data-more]").forEach(b=>b.onclick=()=>{const t=b.closest(".demoTile");t.classList.toggle("expanded");b.textContent=t.classList.contains("expanded")?"Amaga les instruccions":"Instruccions i precaucions"});
root.querySelectorAll("[data-pause]").forEach(b=>b.onclick=()=>{const canvas=b.closest(".demoTile").querySelector("canvas");const paused=canvas.dataset.paused==="true";canvas.dataset.paused=paused?"false":"true";b.textContent=paused?"Pausa animació":"Reprèn animació"});
}
function renderDay(){
const day=D[selected];if(!day)return;
const home=$("dailyDemos");
if(home){home.innerHTML='<section class="section"><div class="sectionTitle"><h2>Com es fan els exercicis d’avui</h2><span class="sub">'+esc(day[0])+'</span></div><p class="sub">Avatars 3D animats. Els moviments són orientatius i no han estat validats per un professional.</p><div class="demoList">'+day[7].map(tile).join("")+'</div></section>';bind(home);window.forma3d?.scan(home)}
const detail=$("detailDemos");if(detail){detail.innerHTML='<section class="section"><div class="sectionTitle"><h2>Guia visual de la sessió</h2></div><div class="demoList">'+day[7].map(tile).join("")+'</div></section>';bind(detail);window.forma3d?.scan(detail)}
const work=$("workoutDemo");if(work&&screen==="workout"){const id=day[7][exerciseIndex];work.innerHTML='<div class="section"><div class="sectionTitle"><h2>Demostració visual</h2></div>'+tile(id,0)+'</div>';bind(work);window.forma3d?.scan(work)}
}
const prevShow=show;show=function(id){prevShow(id);renderDay()};
const prevWorkout=renderWorkout;renderWorkout=function(){prevWorkout();renderDay()};
const prevRender=render;render=function(){prevRender();renderDay()};
const prevDetail=renderDetail;renderDetail=function(){prevDetail();renderDay()};
renderDay();
})();