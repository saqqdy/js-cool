import{_ as m,N as i,a as fe}from"./FunctionCard.vue_vue_type_script_setup_true_lang-DEr3P01c.js";import{N as ye,aT as r,aU as $,aV as J,aW as W,aX as Se}from"./index-3_y0cKVw.js";import{N as k,a as c,B as u,u as xe}from"./index-CjE88-X8.js";import{k as Ce,H as B,P as l,O as o,Q as t,I as v,R as d,G as D,j as a,W as be,N as Ue,r as n}from"./vue-vendor-BrQLXg1A.js";import{N as H}from"./InputNumber-CYbltrrO.js";import{N as ze}from"./Switch-CW_uII20.js";import{N as he}from"./Select-BPzV9bMH.js";import"./Add-CZHZ8rRD.js";const we={style:{color:"#666","margin-bottom":"24px"}},Ne={class:"code-inline"},De={class:"code-inline"},Ie={key:0,class:"code-block"},je={class:"code-block"},Ve={key:1,style:{color:"#999"}},Oe=Ce({__name:"Storage",setup(Ee){const{t:q}=xe(),f=n("myKey"),I=n("myValue"),b=n(null),g=n(null),j=n([]),O=n(0),U=n("user"),V=n({id:1,name:"John",email:"john@example.com"}),Q=n(null),F=()=>{const p=b.value?{expires:b.value}:void 0;r.local.set(f.value,I.value,p),z()},X=()=>{g.value=r.local.get(f.value)},M=()=>{r.local.delete(f.value),g.value=null,z()},Y=()=>{g.value=r.local.has(f.value)},Z=()=>{r.local.clear(),g.value=null,z()},_=()=>{r.local.set(U.value,V.value,{expires:3600}),z()},ee=()=>{Q.value=r.local.get(U.value)},le=()=>{$.set("directKey","directValue"),g.value=$.get("directKey")},z=()=>{O.value=r.local.length,j.value=r.local.keys()},C=n("sessionKey"),E=n("sessionValue"),h=n(null),y=n(null),oe=()=>{const p=h.value?{expires:h.value}:void 0;r.session.set(C.value,E.value,p)},te=()=>{y.value=r.session.get(C.value)},ae=()=>{r.session.delete(C.value),y.value=null},se=()=>{r.session.clear(),y.value=null},ie=()=>{J.set("directSessionKey","directSessionValue",{expires:60}),y.value=J.get("directSessionKey")},S=n("myCookie"),G=n("cookieValue"),L=n(86400),K=n("/"),R=n(""),T=n(!1),A=n(void 0),x=n(null),w=n({}),ne=[{label:"None",value:"None"},{label:"Lax",value:"Lax"},{label:"Strict",value:"Strict"}],re=()=>{const p={expires:L.value,path:K.value||void 0,domain:R.value||void 0,secure:T.value,sameSite:A.value};r.cookie.set(S.value,G.value,p)},ue=()=>{x.value=r.cookie.get(S.value)},de=()=>{w.value=r.cookie.getAll()},pe=()=>{r.cookie.delete(S.value),x.value=null},ce=()=>{x.value=r.cookie.has(S.value)?"exists":"not exists"},ve=()=>{r.cookie.clear(),w.value={}},ge=()=>{W.set("directCookie","directValue",{expires:3600}),x.value=W.get("directCookie")},N=n(""),me=()=>{try{const p="x".repeat(10485760);r.local.set("largeData",p)}catch(p){p instanceof Se?N.value=`StorageQuotaError: ${p.message}`:N.value=`Unknown error: ${p}`}},P=n(""),ke=()=>{P.value=`storage.local.length: ${r.local.length}
storage.session.length: ${r.session.length}
storage.cookie.has('test'): ${r.cookie.has("test")}`};return(p,e)=>(D(),B("div",null,[l(t(ye),null,{default:o(()=>[...e[14]||(e[14]=[a("Storage",-1)])]),_:1}),v("p",we,d(t(q).categoriesDesc.Storage),1),l(m,{title:"storage.local - localStorage",description:"Unified localStorage API with expiration, generic types, and error handling",since:"6.0.0",tags:["local","namespace"],code:`import { storage } from 'js-cool'

// Basic usage
storage.local.set('key', 'value')
storage.local.set('key', 'value', { expires: 3600 }) // 1 hour
storage.local.get('key') // 'value'
storage.local.has('key') // true
storage.local.delete('key')
storage.local.keys() // string[]
storage.local.length // number
storage.local.clear()

// Generic type support
interface User { id: number; name: string }
storage.local.set<User>('user', { id: 1, name: 'John' })
const user = storage.local.get<User>('user')`},{input:o(()=>[l(t(i),{vertical:""},{default:o(()=>[l(t(i),{align:"center"},{default:o(()=>[l(t(c),{value:f.value,"onUpdate:value":e[0]||(e[0]=s=>f.value=s),placeholder:"key",style:{width:"120px"}},null,8,["value"]),l(t(c),{value:I.value,"onUpdate:value":e[1]||(e[1]=s=>I.value=s),placeholder:"value",style:{width:"120px"}},null,8,["value"]),l(t(H),{value:b.value,"onUpdate:value":e[2]||(e[2]=s=>b.value=s),placeholder:"expire (s)",style:{width:"120px"},min:0,clearable:""},null,8,["value"])]),_:1}),l(t(i),null,{default:o(()=>[l(t(u),{size:"small",onClick:F},{default:o(()=>[...e[15]||(e[15]=[a("Set",-1)])]),_:1}),l(t(u),{size:"small",onClick:X},{default:o(()=>[...e[16]||(e[16]=[a("Get",-1)])]),_:1}),l(t(u),{size:"small",onClick:Y},{default:o(()=>[...e[17]||(e[17]=[a("Has",-1)])]),_:1}),l(t(u),{size:"small",type:"warning",onClick:M},{default:o(()=>[...e[18]||(e[18]=[a("Delete",-1)])]),_:1}),l(t(u),{size:"small",type:"error",onClick:Z},{default:o(()=>[...e[19]||(e[19]=[a("Clear",-1)])]),_:1})]),_:1})]),_:1})]),result:o(()=>[l(t(i),{vertical:""},{default:o(()=>[l(t(i),{align:"center"},{default:o(()=>[e[20]||(e[20]=v("code",{class:"code-inline"},"Result:",-1)),l(t(k),{type:"info",size:"small",bordered:!1},{default:o(()=>[a(d(g.value??"null"),1)]),_:1})]),_:1}),l(t(i),{align:"center"},{default:o(()=>[v("code",Ne,"Length: "+d(O.value),1),v("code",De,"Keys: "+d(j.value.slice(0,5).join(", "))+d(j.value.length>5?"...":""),1)]),_:1})]),_:1})]),_:1}),l(m,{title:"storage.local - Generic Type Support",description:"Type-safe storage with TypeScript generics",since:"6.0.0",tags:["local","typescript","generic"],code:`interface User { id: number; name: string; email: string }
storage.local.set<User>('user', { id: 1, name: 'John', email: 'john@example.com' })
const user = storage.local.get<User>('user')
// user: User | null, fully typed!`},{input:o(()=>[l(t(i),{vertical:""},{default:o(()=>[l(t(i),{align:"center"},{default:o(()=>[l(t(c),{value:U.value,"onUpdate:value":e[3]||(e[3]=s=>U.value=s),placeholder:"key",style:{width:"100px"}},null,8,["value"]),l(t(k),{size:"small"},{default:o(()=>[a("id: "+d(V.value.id),1)]),_:1}),l(t(k),{size:"small"},{default:o(()=>[a("name: "+d(V.value.name),1)]),_:1})]),_:1}),l(t(i),null,{default:o(()=>[l(t(u),{size:"small",onClick:_},{default:o(()=>[...e[21]||(e[21]=[a("Set User",-1)])]),_:1}),l(t(u),{size:"small",onClick:ee},{default:o(()=>[...e[22]||(e[22]=[a("Get User",-1)])]),_:1})]),_:1})]),_:1})]),result:o(()=>[l(t(i),{vertical:""},{default:o(()=>[l(t(fe),{code:JSON.stringify(Q.value,null,2),language:"json"},null,8,["code"])]),_:1})]),_:1}),l(m,{title:"storage.session - sessionStorage",description:"Unified sessionStorage API with expiration support",since:"6.0.0",tags:["session","namespace"],code:`import { storage } from 'js-cool'

storage.session.set('key', 'value')
storage.session.set('key', 'value', { expires: 1800 }) // 30 minutes
storage.session.get('key')
storage.session.delete('key')
storage.session.clear()`},{input:o(()=>[l(t(i),{vertical:""},{default:o(()=>[l(t(i),{align:"center"},{default:o(()=>[l(t(c),{value:C.value,"onUpdate:value":e[4]||(e[4]=s=>C.value=s),placeholder:"key",style:{width:"120px"}},null,8,["value"]),l(t(c),{value:E.value,"onUpdate:value":e[5]||(e[5]=s=>E.value=s),placeholder:"value",style:{width:"120px"}},null,8,["value"]),l(t(H),{value:h.value,"onUpdate:value":e[6]||(e[6]=s=>h.value=s),placeholder:"expire (s)",style:{width:"120px"},min:0,clearable:""},null,8,["value"])]),_:1}),l(t(i),null,{default:o(()=>[l(t(u),{size:"small",onClick:oe},{default:o(()=>[...e[23]||(e[23]=[a("Set",-1)])]),_:1}),l(t(u),{size:"small",onClick:te},{default:o(()=>[...e[24]||(e[24]=[a("Get",-1)])]),_:1}),l(t(u),{size:"small",type:"warning",onClick:ae},{default:o(()=>[...e[25]||(e[25]=[a("Delete",-1)])]),_:1}),l(t(u),{size:"small",type:"error",onClick:se},{default:o(()=>[...e[26]||(e[26]=[a("Clear",-1)])]),_:1})]),_:1})]),_:1})]),result:o(()=>[l(t(i),{align:"center"},{default:o(()=>[e[27]||(e[27]=v("code",{class:"code-inline"},"Result:",-1)),l(t(k),{type:"info",size:"small",bordered:!1},{default:o(()=>[a(d(y.value??"null"),1)]),_:1})]),_:1})]),_:1}),l(m,{title:"storage.cookie - Cookie",description:"Full-featured Cookie API with path, domain, secure, and sameSite options",since:"6.0.0",tags:["cookie","namespace"],code:`import { storage } from 'js-cool'

// Basic usage (expires in 1 day by default)
storage.cookie.set('token', 'abc123')

// With options
storage.cookie.set('session', 'xyz', {
  expires: 86400,      // 1 day in seconds
  path: '/',
  domain: '.example.com',
  secure: true,
  sameSite: 'Strict'
})

storage.cookie.get('token')
storage.cookie.getAll()
storage.cookie.has('token')
storage.cookie.delete('session', { path: '/', domain: '.example.com' })
storage.cookie.clear()`},{input:o(()=>[l(t(i),{vertical:""},{default:o(()=>[l(t(i),{align:"center"},{default:o(()=>[l(t(c),{value:S.value,"onUpdate:value":e[7]||(e[7]=s=>S.value=s),placeholder:"key",style:{width:"100px"}},null,8,["value"]),l(t(c),{value:G.value,"onUpdate:value":e[8]||(e[8]=s=>G.value=s),placeholder:"value",style:{width:"100px"}},null,8,["value"]),l(t(H),{value:L.value,"onUpdate:value":e[9]||(e[9]=s=>L.value=s),placeholder:"expires (s)",style:{width:"120px"},min:1},null,8,["value"])]),_:1}),l(t(i),{align:"center"},{default:o(()=>[l(t(c),{value:K.value,"onUpdate:value":e[10]||(e[10]=s=>K.value=s),placeholder:"path",style:{width:"80px"}},null,8,["value"]),l(t(c),{value:R.value,"onUpdate:value":e[11]||(e[11]=s=>R.value=s),placeholder:"domain",style:{width:"120px"}},null,8,["value"]),l(t(ze),{value:T.value,"onUpdate:value":e[12]||(e[12]=s=>T.value=s),size:"small"},{checked:o(()=>[...e[28]||(e[28]=[a("Secure",-1)])]),unchecked:o(()=>[...e[29]||(e[29]=[a("Secure",-1)])]),_:1},8,["value"]),l(t(he),{value:A.value,"onUpdate:value":e[13]||(e[13]=s=>A.value=s),options:ne,placeholder:"SameSite",style:{width:"100px"},clearable:""},null,8,["value"])]),_:1}),l(t(i),null,{default:o(()=>[l(t(u),{size:"small",onClick:re},{default:o(()=>[...e[30]||(e[30]=[a("Set",-1)])]),_:1}),l(t(u),{size:"small",onClick:ue},{default:o(()=>[...e[31]||(e[31]=[a("Get",-1)])]),_:1}),l(t(u),{size:"small",onClick:ce},{default:o(()=>[...e[32]||(e[32]=[a("Has",-1)])]),_:1}),l(t(u),{size:"small",type:"warning",onClick:pe},{default:o(()=>[...e[33]||(e[33]=[a("Delete",-1)])]),_:1}),l(t(u),{size:"small",onClick:de},{default:o(()=>[...e[34]||(e[34]=[a("Get All",-1)])]),_:1}),l(t(u),{size:"small",type:"error",onClick:ve},{default:o(()=>[...e[35]||(e[35]=[a("Clear",-1)])]),_:1})]),_:1})]),_:1})]),result:o(()=>[l(t(i),{vertical:""},{default:o(()=>[l(t(i),{align:"center"},{default:o(()=>[e[36]||(e[36]=v("code",{class:"code-inline"},"Result:",-1)),l(t(k),{type:"info",size:"small",bordered:!1},{default:o(()=>[a(d(x.value??"null"),1)]),_:1})]),_:1}),Object.keys(w.value).length?(D(),B("pre",Ie,d(JSON.stringify(w.value,null,2)),1)):be("",!0)]),_:1})]),_:1}),l(m,{title:"Direct Import (Tree-shaking)",description:"Import storage modules directly for better tree-shaking",since:"6.0.0",tags:["tree-shaking","import"],code:`// Import from main package
import { storage, local, session, cookie } from 'js-cool'

// Or import from subpath (recommended for tree-shaking)
import { storage, local, session, cookie } from 'js-cool/storage'

// Use directly
local.set('key', 'value')
session.set('key', 'value')
cookie.set('key', 'value')`},{input:o(()=>[l(t(i),null,{default:o(()=>[l(t(u),{size:"small",onClick:le},{default:o(()=>[...e[37]||(e[37]=[a("Test local",-1)])]),_:1}),l(t(u),{size:"small",onClick:ie},{default:o(()=>[...e[38]||(e[38]=[a("Test session",-1)])]),_:1}),l(t(u),{size:"small",onClick:ge},{default:o(()=>[...e[39]||(e[39]=[a("Test cookie",-1)])]),_:1})]),_:1})]),result:o(()=>[l(t(i),{align:"center"},{default:o(()=>[e[40]||(e[40]=v("code",{class:"code-inline"},"Result:",-1)),l(t(k),{type:"info",size:"small",bordered:!1},{default:o(()=>[a(d(g.value??y.value??x.value??"click a button"),1)]),_:1})]),_:1})]),_:1}),l(m,{title:"Subpath Import: js-cool/storage",description:"Import storage module from subpath for optimal tree-shaking",since:"6.0.0",tags:["subpath","tree-shaking"],code:`// Import from subpath
import { storage, local, session, cookie } from 'js-cool/storage'
import type { StorageOptions, CookieOptions } from 'js-cool/storage'

// All storage APIs available
storage.local.set('key', 'value')
local.get('key')
session.set('key', 'value')
cookie.set('key', 'value')`},{input:o(()=>[l(t(i),null,{default:o(()=>[l(t(u),{size:"small",onClick:ke},{default:o(()=>[...e[41]||(e[41]=[a("Test Subpath Import",-1)])]),_:1})]),_:1})]),result:o(()=>[v("pre",je,d(P.value),1)]),_:1}),l(m,{title:"Error Handling",description:"Handle storage quota and availability errors",since:"6.0.0",tags:["error","exception"],code:`import { storage, StorageQuotaError, StorageUnavailableError } from 'js-cool'

try {
  storage.local.set('key', largeData)
} catch (e) {
  if (e instanceof StorageQuotaError) {
    console.error('Storage quota exceeded')
  } else if (e instanceof StorageUnavailableError) {
    console.error('Storage not available (SSR or private mode)')
  }
}`},{input:o(()=>[l(t(i),null,{default:o(()=>[l(t(u),{size:"small",type:"warning",onClick:me},{default:o(()=>[...e[42]||(e[42]=[a("Trigger Quota Error",-1)])]),_:1})]),_:1})]),result:o(()=>[N.value?(D(),Ue(t(k),{key:0,type:"error",size:"small",bordered:!1},{default:o(()=>[a(d(N.value),1)]),_:1})):(D(),B("span",Ve,"Click to test error handling"))]),_:1})]))}});export{Oe as default};
