const $=s=>document.querySelector(s);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
let S={meds:[],log:{}},fired={};
try{const r=JSON.parse(localStorage.getItem("pillpal")||"null");if(r)S=r}catch(e){}
const save=()=>{try{localStorage.setItem("pillpal",JSON.stringify(S))}catch(e){}};
const day=()=>new Date().toLocaleDateString("en-CA");
const hm=()=>new Date().toTimeString().slice(0,5);
const nice=id=>D[id][0];

function resolve(raw){
  const n=raw.toLowerCase().replace(/\d+(\.\d+)?\s*(mg|mcg|g|ml)\b/g,"").trim();
  if(!n)return null;
  for(const id in D)if(D[id].some(x=>x.toLowerCase()===n))return id;
  for(const id in D)if(D[id].some(x=>x.toLowerCase().startsWith(n)&&n.length>=4))return id;
  return null;
}
function interactions(){
  const keys=[...new Set(S.meds.map(m=>m.key).filter(Boolean))],out=[];
  for(let i=0;i<keys.length;i++)for(let j=i+1;j<keys.length;j++){
    const hit=I.find(x=>(x[0]===keys[i]&&x[1]===keys[j])||(x[0]===keys[j]&&x[1]===keys[i]));
    if(hit)out.push(hit);
  }
  const rank={major:0,moderate:1,minor:2};
  return out.sort((a,b)=>rank[a[2]]-rank[b[2]]);
}
function render(){
  $("#dl").innerHTML=Object.values(D).map(a=>`<option value="${a[0]}">`).join("");
  const list=$("#list");
  list.innerHTML=S.meds.length?S.meds.map(m=>`<div class="row"><div><b>${esc(m.name)}</b> <span class="mut">${esc(m.dose||"")}</span><br><span class="mut">${m.times.join(", ")}${m.key?"":" · not in our dataset, so it can’t be checked"}</span></div><button data-del="${m.uid}" class="noprint">Remove</button></div>`).join(""):`<p class="mut">No medicines yet. Add one above to get started.</p>`;
  const ix=interactions(),unk=S.meds.filter(m=>!m.key).map(m=>esc(m.name));
  let h="";
  if(S.meds.length<2)h=`<p class="mut">Add at least two medicines to check for interactions.</p>`;
  else if(!ix.length)h=`<div class="none">No interactions found in our sample data. That does not mean the combination is safe. Ask a pharmacist.</div>`;
  else h=ix.map(x=>`<div class="ix ${x[2]}"><span class="s">${x[2]} interaction</span><b>${nice(x[0])} + ${nice(x[1])}</b>${esc(x[3])}</div>`).join("");
  if(unk.length)h+=`<p class="mut">Not checked (not in dataset): ${unk.join(", ")}.</p>`;
  $("#ix").innerHTML=h;
  const slots=[];S.meds.forEach(m=>m.times.forEach(t=>slots.push({m,t,k:m.uid+"@"+t})));
  slots.sort((a,b)=>a.t.localeCompare(b.t));
  const lg=S.log[day()]||{},now=hm();
  $("#today").innerHTML=slots.length?slots.map(s=>{
    const st=lg[s.k],late=!st&&s.t<now;
    return `<div class="row"><div><span class="t">${s.t}</span> &nbsp;${esc(s.m.name)} <span class="mut">${esc(s.m.dose||"")}</span></div><div>${st?`<span class="pill ${st}">${st}</span>`:`${late?`<span class="pill late">overdue</span> `:""}<button class="p noprint" data-a="taken" data-k="${s.k}">Taken</button> <button class="noprint" data-a="skipped" data-k="${s.k}">Skip</button>`}</div></div>`}).join("")
    +`<p class="mut">Taken today: ${Object.values(lg).filter(v=>v==="taken").length} of ${slots.length}</p>`:`<p class="mut">Nothing scheduled yet.</p>`;
}
function add(name,dose,times){
  const key=resolve(name);
  S.meds.push({uid:Date.now().toString(36)+Math.random().toString(36).slice(2,5),name:key?nice(key):name.trim(),key,dose:dose.trim(),times:times.split(",")});
  save();render();
}
$("#f").addEventListener("submit",e=>{e.preventDefault();add($("#n").value,$("#d").value,$("#q").value);e.target.reset()});
$("#demo").onclick=()=>{S.meds=[];add("Warfarin","5 mg","08:00");add("Ibuprofen","200 mg","08:00,20:00");add("Sertraline","50 mg","08:00")};
$("#clr").onclick=()=>{if(confirm("Delete all medicines and history?")){S={meds:[],log:{}};save();render()}};
$("#print").onclick=()=>window.print();
document.addEventListener("click",e=>{
  const t=e.target;
  if(t.dataset.del){S.meds=S.meds.filter(m=>m.uid!==t.dataset.del);save();render()}
  if(t.dataset.a){(S.log[day()]=S.log[day()]||{})[t.dataset.k]=t.dataset.a;save();render()}
});
$("#notif").onclick=async()=>{
  try{const p=await Notification.requestPermission();$("#nmsg").textContent=p==="granted"?"Reminders are on while this page stays open.":"Notifications are blocked. Allow them in your browser settings."}
  catch(e){$("#nmsg").textContent="This browser doesn’t support notifications. Reminders show as overdue on the list."}
};
setInterval(()=>{
  const now=hm(),lg=S.log[day()]||{};
  S.meds.forEach(m=>m.times.forEach(t=>{
    const k=day()+m.uid+t;
    if(t===now&&!lg[m.uid+"@"+t]&&!fired[k]){fired[k]=1;
      try{if(Notification.permission==="granted")new Notification("Time for "+m.name,{body:m.dose||"Open PillPal to log it."})}catch(e){}}
  }));
  render();
},30000);
render();
