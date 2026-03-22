import{_ as B,N as V,a as s,A as y,B as k,C as x,D as w}from"./index-KPARPmDz.js";import{N as v,a as T,B as U}from"./index-BfsBBipi.js";import{k as G,H as A,P as a,O as l,Q as o,I as t,G as g,j as r,V as p,N as _,W as C,r as i}from"./vue-vendor-CtKZO9pe.js";const z=["href"],H=["src"],R=G({__name:"Convert",setup(F){const m=i("Hello World"),c=i('<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="red"/></svg>'),b=i("Hello, 世界!"),u=i(""),N=()=>{const f=new Blob([m.value],{type:"text/plain"});u.value=x(f)},d=i(""),S=()=>{const f=w(c.value);d.value=x(f)};return(f,e)=>(g(),A("div",null,[a(o(V),null,{default:l(()=>[...e[3]||(e[3]=[r("Convert",-1)])]),_:1}),e[11]||(e[11]=t("p",{style:{color:"#666","margin-bottom":"24px"}},"Format conversion utilities",-1)),a(B,{title:"encodeBase64 / decodeBase64",description:"Encode and decode Base64 strings (supports Unicode)",code:`encodeBase64('Hello') // 'SGVsbG8='
encodeBase64('你好') // '5L2g5aW9'
decodeBase64('SGVsbG8=') // 'Hello'`},{input:l(()=>[a(o(s),{align:"center"},{default:l(()=>[a(o(T),{value:b.value,"onUpdate:value":e[0]||(e[0]=n=>b.value=n),style:{width:"200px"},placeholder:"Enter text"},null,8,["value"])]),_:1})]),result:l(()=>[a(o(s),{vertical:""},{default:l(()=>[a(o(s),{align:"center"},{default:l(()=>[e[4]||(e[4]=t("code",{class:"code-inline"},"encodeBase64",-1)),a(o(v),{type:"info",size:"small",bordered:!1},{default:l(()=>[r(p(o(y)(b.value)),1)]),_:1})]),_:1}),a(o(s),{align:"center"},{default:l(()=>[e[5]||(e[5]=t("code",{class:"code-inline"},"decodeBase64",-1)),a(o(v),{type:"info",size:"small",bordered:!1},{default:l(()=>[r(p(o(k)(o(y)(b.value))),1)]),_:1})]),_:1})]),_:1})]),_:1}),a(B,{title:"blobToUrl",description:"Create blob URL from data",code:`const blob = new Blob(['Hello'], { type: 'text/plain' })
blobToUrl(blob) // 'blob:origin/uuid'`},{input:l(()=>[a(o(s),{align:"center"},{default:l(()=>[a(o(T),{value:m.value,"onUpdate:value":e[1]||(e[1]=n=>m.value=n),style:{width:"200px"}},null,8,["value"]),a(o(U),{size:"small",onClick:N},{default:l(()=>[...e[6]||(e[6]=[r("Create Blob URL",-1)])]),_:1})]),_:1})]),result:l(()=>[u.value?(g(),_(o(s),{key:0,vertical:""},{default:l(()=>[a(o(s),{align:"center"},{default:l(()=>[e[7]||(e[7]=t("code",{class:"code-inline"},"Blob URL:",-1)),a(o(v),{type:"info",size:"small",bordered:!1},{default:l(()=>[r(p(u.value),1)]),_:1})]),_:1}),t("a",{href:u.value,target:"_blank",style:{color:"#18a058","font-size":"14px"}},"Open in new tab",8,z)]),_:1})):C("",!0)]),_:1}),a(B,{title:"svgToBlob",description:"Convert SVG string to Blob",code:"svgToBlob('<svg>...</svg>') // Blob (image/svg+xml)"},{input:l(()=>[a(o(s),{vertical:""},{default:l(()=>[a(o(T),{value:c.value,"onUpdate:value":e[2]||(e[2]=n=>c.value=n),style:{width:"100%"}},null,8,["value"]),a(o(U),{size:"small",onClick:S},{default:l(()=>[...e[8]||(e[8]=[r("Create SVG Blob",-1)])]),_:1})]),_:1})]),result:l(()=>[d.value?(g(),_(o(s),{key:0,vertical:""},{default:l(()=>[a(o(s),{align:"center"},{default:l(()=>[e[9]||(e[9]=t("code",{class:"code-inline"},"SVG Blob URL:",-1)),a(o(v),{type:"info",size:"small",bordered:!1},{default:l(()=>[r(p(d.value),1)]),_:1})]),_:1}),t("img",{src:d.value,style:{"max-width":"96px",border:"1px solid #ddd","border-radius":"4px"}},null,8,H)]),_:1})):C("",!0)]),_:1}),a(B,{title:"Available Functions",description:"All conversion utilities",code:`// ArrayBuffer
arrayBufferToBase64(buffer, mimeType?)
arrayBufferToBlob(buffer, mimeType)

// Base64
base64ToArrayBuffer(base64)
base64ToBlob(base64)
base64ToFile(base64, filename, mime)

// Blob
blobToArrayBuffer(blob)  // Promise
blobToBase64(blob)       // Promise
blobToUrl(blob)

// File
fileToBase64(file)       // Promise

// SVG
svgToBlob(svgString)

// URL
urlToBlob(url)           // Promise`},{result:l(()=>[...e[10]||(e[10]=[t("pre",{class:"code-block"},`arrayBufferToBase64(buffer, mimeType?)
arrayBufferToBlob(buffer, mimeType)
base64ToArrayBuffer(base64)
base64ToBlob(base64)
base64ToFile(base64, filename, mime)
blobToArrayBuffer(blob)
blobToBase64(blob)
blobToUrl(blob)
fileToBase64(file)
svgToBlob(svgString)
urlToBlob(url)`,-1)])]),_:1})]))}});export{R as default};
