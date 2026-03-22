import{_ as p,y,z as C,A as T,B as S}from"./index-rIPb5oMc.js";import{d as V,c as N,a,w as l,u as o,b as r,o as x,e as s,N as A,f as t,g as B,t as v,j as c,k as U,l as k,B as z,r as i}from"./index-DxtSBRyp.js";const G=["href"],F=["src"],I=V({__name:"Convert",setup(H){const g=i("Hello World"),m=i('<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="red"/></svg>'),d=i("Hello, 世界!"),b=i(""),_=()=>{const f=new Blob([g.value],{type:"text/plain"});b.value=T(f)},u=i(""),w=()=>{const f=S(m.value);u.value=T(f)};return(f,e)=>(x(),N("div",null,[a(o(A),null,{default:l(()=>[...e[3]||(e[3]=[s("Convert",-1)])]),_:1}),e[11]||(e[11]=r("p",{style:{color:"#666","margin-bottom":"24px"}},"Format conversion utilities",-1)),a(p,{title:"encodeBase64 / decodeBase64",description:"Encode and decode Base64 strings (supports Unicode)",code:`encodeBase64('Hello') // 'SGVsbG8='
encodeBase64('你好') // '5L2g5aW9'
decodeBase64('SGVsbG8=') // 'Hello'`},{input:l(()=>[a(o(t),{align:"center"},{default:l(()=>[a(o(c),{value:d.value,"onUpdate:value":e[0]||(e[0]=n=>d.value=n),style:{width:"200px"},placeholder:"Enter text"},null,8,["value"])]),_:1})]),result:l(()=>[a(o(t),{vertical:""},{default:l(()=>[a(o(t),{align:"center"},{default:l(()=>[e[4]||(e[4]=r("code",{style:{"font-size":"12px",background:"#f5f5f5",padding:"2px 8px","border-radius":"4px"}},"encodeBase64",-1)),a(o(B),{type:"info",size:"small",bordered:!1},{default:l(()=>[s(v(o(y)(d.value)),1)]),_:1})]),_:1}),a(o(t),{align:"center"},{default:l(()=>[e[5]||(e[5]=r("code",{style:{"font-size":"12px",background:"#f5f5f5",padding:"2px 8px","border-radius":"4px"}},"decodeBase64",-1)),a(o(B),{type:"info",size:"small",bordered:!1},{default:l(()=>[s(v(o(C)(o(y)(d.value))),1)]),_:1})]),_:1})]),_:1})]),_:1}),a(p,{title:"blobToUrl",description:"Create blob URL from data",code:`const blob = new Blob(['Hello'], { type: 'text/plain' })
blobToUrl(blob) // 'blob:origin/uuid'`},{input:l(()=>[a(o(t),{align:"center"},{default:l(()=>[a(o(c),{value:g.value,"onUpdate:value":e[1]||(e[1]=n=>g.value=n),style:{width:"200px"}},null,8,["value"]),a(o(z),{size:"small",onClick:_},{default:l(()=>[...e[6]||(e[6]=[s("Create Blob URL",-1)])]),_:1})]),_:1})]),result:l(()=>[b.value?(x(),U(o(t),{key:0,vertical:""},{default:l(()=>[a(o(t),{align:"center"},{default:l(()=>[e[7]||(e[7]=r("code",{style:{"font-size":"12px",background:"#f5f5f5",padding:"2px 8px","border-radius":"4px"}},"Blob URL:",-1)),a(o(B),{type:"info",size:"small",bordered:!1},{default:l(()=>[s(v(b.value),1)]),_:1})]),_:1}),r("a",{href:b.value,target:"_blank",style:{color:"#18a058","font-size":"14px"}},"Open in new tab",8,G)]),_:1})):k("",!0)]),_:1}),a(p,{title:"svgToBlob",description:"Convert SVG string to Blob",code:"svgToBlob('<svg>...</svg>') // Blob (image/svg+xml)"},{input:l(()=>[a(o(t),{vertical:""},{default:l(()=>[a(o(c),{value:m.value,"onUpdate:value":e[2]||(e[2]=n=>m.value=n),style:{width:"100%"}},null,8,["value"]),a(o(z),{size:"small",onClick:w},{default:l(()=>[...e[8]||(e[8]=[s("Create SVG Blob",-1)])]),_:1})]),_:1})]),result:l(()=>[u.value?(x(),U(o(t),{key:0,vertical:""},{default:l(()=>[a(o(t),{align:"center"},{default:l(()=>[e[9]||(e[9]=r("code",{style:{"font-size":"12px",background:"#f5f5f5",padding:"2px 8px","border-radius":"4px"}},"SVG Blob URL:",-1)),a(o(B),{type:"info",size:"small",bordered:!1},{default:l(()=>[s(v(u.value),1)]),_:1})]),_:1}),r("img",{src:u.value,style:{"max-width":"96px",border:"1px solid #ddd","border-radius":"4px"}},null,8,F)]),_:1})):k("",!0)]),_:1}),a(p,{title:"Available Functions",description:"All conversion utilities",code:`// ArrayBuffer
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
urlToBlob(url)           // Promise`},{result:l(()=>[...e[10]||(e[10]=[r("pre",{style:{"font-size":"12px",background:"#f5f5f5",padding:"12px","border-radius":"8px","overflow-x":"auto"}},`arrayBufferToBase64(buffer, mimeType?)
arrayBufferToBlob(buffer, mimeType)
base64ToArrayBuffer(base64)
base64ToBlob(base64)
base64ToFile(base64, filename, mime)
blobToArrayBuffer(blob)
blobToBase64(blob)
blobToUrl(blob)
fileToBase64(file)
svgToBlob(svgString)
urlToBlob(url)`,-1)])]),_:1})]))}});export{I as default};
