const KEY="later_phase1_2";
const CATS={Watch:"🎬",Read:"📚",Connect:"💬",Work:"💼",Buy:"🛍️",Learn:"🎓",Visit:"📍",Other:"✨"};
const statuses=["Pending","In Progress","Done","Not Interested"];
const today=(plus=0)=>{const d=new Date();d.setDate(d.getDate()+plus);return new Date(d-d.getTimezoneOffset()*60000).toISOString().slice(0,10)};
function fresh(){return {profile:{name:"Hassan Saber"},items:[
{id:uid(),title:"Prepare pre meeting notes",category:"Work",status:"Pending",notes:"Review notes and key discussion points.",date:today(),time:"",archived:false,createdAt:new Date().toISOString()},
{id:uid(),title:"Product Analytics course",category:"Learn",status:"In Progress",notes:"Continue the next module.",date:"",time:"",archived:false,createdAt:new Date().toISOString()},
{id:uid(),title:"Visit AlUla",category:"Visit",status:"Pending",notes:"Check the best season.",date:"",time:"",archived:false,createdAt:new Date().toISOString()},
{id:uid(),title:"Call Ahmed about Product role",category:"Connect",status:"Pending",notes:"Ask about next steps.",date:today(3),time:"19:00",archived:false,createdAt:new Date().toISOString()}
]}}
function uid(){return Date.now().toString(36)+Math.random().toString(36).slice(2)}
let state;try{state=JSON.parse(localStorage.getItem(KEY))||fresh()}catch(e){state=fresh()}
let page="home",filter="All";
const $=s=>document.querySelector(s);
function track(eventName, params={}){
  if(typeof window.gtag==="function"){
    window.gtag("event", eventName, params);
  }
}

const esc=v=>String(v??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]));
function save(){localStorage.setItem(KEY,JSON.stringify(state));render()}
function active(){return state.items.filter(x=>!x.archived)}
function first(){return (state.profile.name||"Hassan Saber").trim().split(/\s+/)[0]}
function nav(){return `<header class="topnav"><div class="navinner">
<button class="navbtn ${page==="home"?"active":""}" data-page="home" aria-label="Home">
<svg class="navicon" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 10.8 12 3l9 7.8v9.7a.5.5 0 0 1-.5.5H15v-6H9v6H3.5a.5.5 0 0 1-.5-.5z"/></svg><span>Home</span></button>
<button class="navbtn ${page==="later"?"active":""}" data-page="later" aria-label="Later">
<svg class="navicon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 6h14M5 12h14M5 18h14"/></svg><span>Later</span></button>
<button class="add" id="quickAdd" type="button" aria-label="Add item">
<svg class="plusicon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg></button>
<button class="navbtn ${page==="history"?"active":""}" data-page="history" aria-label="History">
<svg class="navicon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5v5h5"/><path d="M5.6 9A7.5 7.5 0 1 1 4.8 15"/><path d="M12 8v4l2.8 1.7"/></svg><span>History</span></button>
<button class="navbtn ${page==="profile"?"active":""}" data-page="profile" aria-label="Profile">
<svg class="navicon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="3.5"/><path d="M5.5 20c.8-4 3-6 6.5-6s5.7 2 6.5 6"/></svg><span>Profile</span></button>
</div></header>`}
function hero(){return `<section class="hero"><div><div class="logo">LATER <span class="arabic-brand">بعدين</span></div><h1>Good morning, ${esc(first())}</h1><p>One place for the things you want to come back to.</p></div></section>`}
function card(x){
  const doneButton = (!x.archived && x.status !== "Done")
    ? `<button class="small done" type="button" data-done="${x.id}">Done</button>` : "";
  const notInterestedButton = (!x.archived && x.status !== "Not Interested")
    ? `<button class="small dismiss" type="button" data-notinterested="${x.id}">Not Interested</button>` : "";
  const archiveButton = x.archived
    ? `<button class="small edit" type="button" data-restore="${x.id}">Restore</button>`
    : `<button class="small archive" type="button" data-archive="${x.id}">Archive</button>`;
  return `<article class="card">
    <div class="icon">${CATS[x.category]||"✨"}</div>
    <div class="main">
      ${x.image?`<img class="item-image" src="${x.image}" alt="">`:""}
      <div class="title">${esc(x.title)}</div>
      <div class="meta">
        <span class="pill">${esc(x.category)}</span>
        <span class="pill">${x.archived?"Archived":esc(x.status)}</span>
        <span class="pill">${x.date?esc(x.date)+(x.time?" · "+esc(x.time):""):"Someday"}</span>
      </div>
      <div class="actions">
        <button class="small edit" type="button" data-edit="${x.id}">Edit</button>
        ${doneButton}
        ${notInterestedButton}
        ${archiveButton}
      </div>
    </div>
  </article>`;
}
function section(name,items){return `<section class="section"><div class="head"><h2>${name}</h2><span class="count">${items.length}</span></div>${items.length?`<div class="grid">${items.map(card).join("")}</div>`:`<div class="empty">Nothing here right now.</div>`}</section>`}
function content(){
 const a=active(),t=today();
 if(page==="home") return hero()+`<main class="content">${section("Today",a.filter(x=>x.date===t&&!["Done","Not Interested"].includes(x.status)))}${section("Continue",a.filter(x=>x.status==="In Progress"))}${section("Upcoming",a.filter(x=>x.date&&x.date>t&&!["Done","Not Interested"].includes(x.status)))}${section("Someday",a.filter(x=>!x.date&&!["Done","Not Interested"].includes(x.status)))}</main>`;
 if(page==="later"){const fs=["All","Pending","In Progress"];const actionable=a.filter(x=>x.status==="Pending"||x.status==="In Progress");const list=filter==="All"?actionable:actionable.filter(x=>x.status===filter);return `<main class="content"><h1 class="page">Later</h1><p class="sub">Things you still want or need to do.</p>${filterBar(fs)}${list.length?`<div class="grid">${list.map(card).join("")}</div>`:`<div class="empty">Nothing left to do here.</div>`}</main>`}
 if(page==="history"){const fs=["All","Archived","Done","In Progress","Pending","Not Interested"];let list=state.items;if(filter==="Archived")list=list.filter(x=>x.archived);else if(filter!=="All")list=list.filter(x=>!x.archived&&x.status===filter);return `<main class="content"><h1 class="page">History</h1>${filterBar(fs)}${list.length?`<div class="grid">${list.map(card).join("")}</div>`:`<div class="empty">No items in this history filter.</div>`}</main>`}
 const ini=(state.profile.name||"HS").split(/\s+/).slice(0,2).map(x=>x[0]||"").join("").toUpperCase();
 return `<main class="content"><h1 class="page">Profile</h1><div class="profile"><div class="avatar">${esc(ini)}</div><form id="profileForm" class="form"><div class="field"><label>Your name</label><input name="name" required value="${esc(state.profile.name)}"></div><button class="btn primary" type="submit">Save edit</button></form></div></main>`
}
function filterBar(fs){return `<div class="filters">${fs.map(f=>`<button type="button" class="filter ${filter===f?"active":""}" data-filter="${f}">${f}</button>`).join("")}</div>`}
function render(){document.getElementById("app").innerHTML=nav()+content();bind()}
function bind(){
 document.querySelectorAll("[data-page]").forEach(b=>b.addEventListener("click",()=>{page=b.dataset.page;filter="All";track("section_view",{section:page});render()}));
 $("#quickAdd").addEventListener("click",()=>openForm());
 document.querySelectorAll("[data-filter]").forEach(b=>b.addEventListener("click",()=>{filter=b.dataset.filter;render()}));
 document.querySelectorAll("[data-edit]").forEach(b=>b.addEventListener("click",()=>openForm(b.dataset.edit)));
 document.querySelectorAll("[data-done]").forEach(b=>b.addEventListener("click",()=>{const x=find(b.dataset.done);x.status="Done";track("item_completed",{category:x.category});save()}));
 document.querySelectorAll("[data-notinterested]").forEach(b=>b.addEventListener("click",()=>{const x=find(b.dataset.notinterested);x.status="Not Interested";track("item_not_interested",{category:x.category});save()}));
 document.querySelectorAll("[data-archive]").forEach(b=>b.addEventListener("click",()=>{find(b.dataset.archive).archived=true;save()}));
 document.querySelectorAll("[data-restore]").forEach(b=>b.addEventListener("click",()=>{find(b.dataset.restore).archived=false;save()}));
 $("#profileForm")?.addEventListener("submit",e=>{e.preventDefault();state.profile.name=new FormData(e.currentTarget).get("name").trim()||"Hassan Saber";save()});
}
function find(id){return state.items.find(x=>x.id===id)}
function opts(arr,selected){return arr.map(v=>`<option value="${esc(v)}" ${v===selected?"selected":""}>${esc(v)}</option>`).join("")}
function openForm(id=""){
 const x=id?find(id):{title:"",category:"Watch",status:"Pending",notes:"",date:"",time:"",image:""};
 $("#modalContent").innerHTML=`<h2>${id?"Edit item":"Quick Add"}</h2><form id="itemForm" class="form">
 <div class="field"><label>Title *</label><input name="title" required value="${esc(x.title)}" placeholder="What do you want to remember?"></div>
 <div class="field"><label>Category *</label><select name="category">${opts(Object.keys(CATS),x.category)}</select></div>
 <div class="field"><label>Status</label><select name="status">${opts(statuses,x.status)}</select></div>
 <div class="field"><label>Notes</label><textarea name="notes">${esc(x.notes)}</textarea></div>
 <div class="field"><label>Image (optional)</label><input type="file" name="imageFile" accept="image/*">${x.image?`<div class="image-preview-wrap"><img class="image-preview" src="${x.image}" alt="Attached image"><button type="button" class="small archive" id="removeImage">Remove image</button></div>`:""}</div>
 <div class="row"><div class="field"><label>Date (optional)</label><input type="date" name="date" value="${esc(x.date)}"></div><div class="field"><label>Time (optional)</label><input type="time" name="time" value="${esc(x.time)}"></div></div>
 <button class="btn primary" type="submit">${id?"Save changes":"Create item"}</button></form>`;
 $("#modal").classList.remove("hidden");
 let removeExistingImage=false;
 $("#removeImage")?.addEventListener("click",()=>{removeExistingImage=true;const wrap=document.querySelector(".image-preview-wrap");if(wrap)wrap.remove()});
 $("#itemForm").addEventListener("submit",async e=>{
   e.preventDefault();
   const f=new FormData(e.currentTarget);
   const file=f.get("imageFile");
   let image=id?(find(id).image||""):"";
   if(removeExistingImage) image="";
   if(file && file.size){
     if(file.size>1500000){alert("For this prototype, please choose an image smaller than 1.5 MB.");return}
     image=await fileToDataURL(file);
   }
   const data={title:f.get("title").trim(),category:f.get("category"),status:f.get("status"),notes:f.get("notes").trim(),date:f.get("date"),time:f.get("time"),image};
   if(id){
     Object.assign(find(id),data);
     track("item_edited",{category:data.category,status:data.status});
   } else {
     state.items.unshift({id:uid(),...data,archived:false,createdAt:new Date().toISOString()});
     track("item_created",{category:data.category,has_date:Boolean(data.date),has_image:Boolean(data.image)});
   }
   closeModal();save()
 })
}
function fileToDataURL(file){return new Promise((resolve,reject)=>{const r=new FileReader();r.onload=()=>resolve(r.result);r.onerror=reject;r.readAsDataURL(file)})}
function closeModal(){$("#modal").classList.add("hidden")}
$("#closeModal").addEventListener("click",closeModal);$("#backdrop").addEventListener("click",closeModal);
render();