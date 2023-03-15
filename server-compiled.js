(()=>{var e={417:(e,t,a)=>{"use strict";a.d(t,{Z:()=>r});const n=require("axios");var o=a.n(n),s=a(689),i=a.n(s);const r=function(e){const[t,a]=(0,s.useState)(!1),[n,r]=(0,s.useState)(""),[l,c]=(0,s.useState)(),[d,m]=(0,s.useState)("");return i().createElement("div",{className:"card"},i().createElement("div",{className:"our-card-top"},t&&i().createElement("div",{className:"our-custom-input"},i().createElement("div",{className:"our-custom-input-interior"},i().createElement("input",{onChange:e=>c(e.target.files[0]),className:"form-control form-control-sm",type:"file"}))),i().createElement("img",{src:e.photo?`/uploaded-photos/${e.photo}`:"/fallback.png",className:"card-img-top",alt:`${e.species} named ${e.name}`})),i().createElement("div",{className:"card-body"},!t&&i().createElement(i().Fragment,null,i().createElement("h4",null,e.name),i().createElement("p",{className:"text-muted small"},e.species),!e.readOnly&&i().createElement(i().Fragment,null,i().createElement("button",{onClick:()=>{a(!0),r(e.name),m(e.species),c("")},className:"btn btn-sm btn-primary"},"Edit")," ",i().createElement("button",{onClick:async()=>{o().delete(`/animal/${e.id}`),e.setAnimals((t=>t.filter((t=>t._id!=e.id))))},className:"btn btn-sm btn-outline-danger"},"Delete"))),t&&i().createElement("form",{onSubmit:async function(t){t.preventDefault(),a(!1),e.setAnimals((t=>t.map((function(t){return t._id==e.id?{...t,name:n,species:d}:t}))));const s=new FormData;l&&s.append("photo",l),s.append("_id",e.id),s.append("name",n),s.append("species",d);const i=await o().post("/update-animal",s,{headers:{"Content-Type":"multipart/form-data"}});i.data&&e.setAnimals((t=>t.map((function(t){return t._id==e.id?{...t,photo:i.data}:t}))))}},i().createElement("div",{className:"mb-1"},i().createElement("input",{autoFocus:!0,onChange:e=>r(e.target.value),type:"text",className:"form-control form-control-sm",value:n})),i().createElement("div",{className:"mb-2"},i().createElement("input",{onChange:e=>m(e.target.value),type:"text",className:"form-control form-control-sm",value:d})),i().createElement("button",{className:"btn btn-sm btn-success"},"Save")," ",i().createElement("button",{onClick:()=>a(!1),className:"btn btn-sm btn-outline-secondary"},"Cancel"))))}},860:e=>{"use strict";e.exports=require("express")},470:e=>{"use strict";e.exports=require("fs-extra")},13:e=>{"use strict";e.exports=require("mongodb")},738:e=>{"use strict";e.exports=require("multer")},689:e=>{"use strict";e.exports=require("react")},684:e=>{"use strict";e.exports=require("react-dom/server")},109:e=>{"use strict";e.exports=require("sanitize-html")},441:e=>{"use strict";e.exports=require("sharp")},17:e=>{"use strict";e.exports=require("path")}},t={};function a(n){var o=t[n];if(void 0!==o)return o.exports;var s=t[n]={exports:{}};return e[n](s,s.exports,a),s.exports}a.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return a.d(t,{a:t}),t},a.d=(e,t)=>{for(var n in t)a.o(t,n)&&!a.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},a.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{const{MongoClient:e,ObjectId:t}=a(13),n=a(860),{response:o}=a(860),s=n(),i=a(738)(),r=a(109),l=a(470),c=a(441);let d;const m=a(17),p=a(689),u=a(684),b=a(417).Z;function f(e,t,a){"string"!=typeof e.body.name&&(e.body.name=""),"string"!=typeof e.body.species&&(e.body.species=""),"string"!=typeof e.body._id&&(e.body._id=""),e.cleanData={name:r(e.body.name.trim(),{allowedTags:[],allowedAttributes:{}}),species:r(e.body.species.trim(),{allowedTags:[],allowedAttributes:{}})},a()}l.ensureDirSync(m.join("public","uploaded-photos")),s.set("view engine","ejs"),s.set("views,","./views"),s.use(n.static("public")),s.use(n.json()),s.use(n.urlencoded({extended:!1})),s.get("/",(async(e,t)=>{const a=await d.collection("animals").find().toArray(),n=u.renderToString(p.createElement("div",{className:"container"},p.createElement("div",{className:"animal-grid mb-3"},a.map((e=>p.createElement(b,{key:e._id,name:e.name,species:e.species,photo:e.photo,id:e._id,readOnly:!0})))),p.createElement("p",null,p.createElement("a",{href:"/admin"},"Login / Manage the animal listings."))));t.render("home",{generatedHTML:n})})),s.use((function(e,t,a){t.set("WWW-Authenticate","Basic realm='Our MERN App'"),"Basic YWRtaW46YWRtaW4="===e.headers.authorization?a():(console.log(e.headers.authorization),t.status(401).send("Try again."))})),s.get("/admin",(function(e,t){t.render("admin")})),s.get("/api/animals",(async(e,t)=>{const a=await d.collection("animals").find().toArray();t.json(a)})),s.post("/create-animal",i.single("photo"),f,(async(e,a)=>{if(e.file){const t=`${Date.now()}.jpg`;await c(e.file.buffer).resize(844,456).jpeg({quality:60}).toFile(m.join("public","uploaded-photos",t)),e.cleanData.photo=t}console.log(e.body);const n=await d.collection("animals").insertOne(e.cleanData),o=await d.collection("animals").findOne({_id:new t(n.insertedId)});a.send(o)})),s.delete("/animal/:id",(async(e,a)=>{"string"!=typeof e.params.id&&(e.params.id="");const n=await d.collection("animals").findOne({_id:new t(e.params.id)});n.photo&&l.remove(m.join("public","uploaded-photos",n.photo)),d.collection("animals").deleteOne({_id:new t(e.params.id)}),a.send("Good job")})),s.post("/update-animal",i.single("photo"),f,(async(e,a)=>{if(e.file){const n=`${Date.now()}.jpg`;await c(e.file.buffer).resize(844,456).jpeg({quality:60}).toFile(m.join("public","uploaded-photos",n)),e.cleanData.photo=n;const o=await d.collection("animals").findOneAndUpdate({_id:new t(e.body._id)},{$set:e.cleanData});o.value.photo&&l.remove(m.join("public","uploaded-photos",o.value.photo)),a.send(n)}else d.collection("animals").findOneAndUpdate({_id:new t(e.body._id)},{$set:e.cleanData}),a.send(!1)})),async function(){const t=new e("mongodb://root:root@localhost:27017/AmazingMernApp?&authSource=admin");await t.connect(),d=t.db(),s.listen(4e3)}()})()})();