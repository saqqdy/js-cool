import{a_ as zt,a$ as Sn,b0 as Rn,b1 as zn,_ as Ee,N as kn,a as xe,b as Tn,b2 as Fn,b3 as On,U as In,Y as Mn}from"./index-KPARPmDz.js";import{k as Pe,V as kt,q as Pn,r as Bn,s as pe,n as _n,t as ft,p as Fe,v as ht,c as E,d as R,w as fe,x as Vt,u as Ye,f as Ce,y as $n,z as At,h as Je,A as ue,D as Ve,E as St,e as te,b as qe,G as Lt,H as Re,I as Dt,S as Nn,J as En,K as jt,M as Vn,O as Ke,P as An,Q as Ge,R as Ln,W as Dn,T as jn,N as Oe,U as Tt,X as Wn,Y as Hn,Z as Un,_ as Kn,$ as Gn,a0 as yt,a1 as Ft,a2 as qn,a3 as xt,a4 as Wt,a5 as Yn,a6 as Jn,a7 as Xn,a8 as ge,a9 as Zn,aa as Qn,ab as eo,ac as to,ad as Ot,ae as vt,af as no,B as gt,a as oo}from"./index-BfsBBipi.js";import{c as I,r as k,p as Ct,k as be,i as Rt,m as r,z as lo,o as Xe,f as io,h as ro,t as ae,w as Be,b as Ht,x as Ut,n as Kt,F as ao,v as so,l as uo,A as co,H as fo,P as D,O as K,Q as W,I as Te,G as bt,j as Se,N as It,V as lt}from"./vue-vendor-CtKZO9pe.js";import{N as ho}from"./InputNumber-vB83ClxX.js";function Mt(e){return e&-e}class Gt{constructor(n,l){this.l=n,this.min=l;const o=new Array(n+1);for(let i=0;i<n+1;++i)o[i]=0;this.ft=o}add(n,l){if(l===0)return;const{l:o,ft:i}=this;for(n+=1;n<=o;)i[n]+=l,n+=Mt(n)}get(n){return this.sum(n+1)-this.sum(n)}sum(n){if(n===void 0&&(n=this.l),n<=0)return 0;const{ft:l,min:o,l:i}=this;if(n>i)throw new Error("[FinweckTree.sum]: `i` is larger than length.");let u=n*o;for(;n>0;)u+=l[n],n-=Mt(n);return u}getBound(n){let l=0,o=this.l;for(;o>l;){const i=Math.floor((l+o)/2),u=this.sum(i);if(u>n){o=i;continue}else if(u<n){if(l===i)return this.sum(l+1)<=n?l+1:i;l=i}else return i}return l}}let it;function vo(){return typeof document>"u"?!1:(it===void 0&&("matchMedia"in window?it=window.matchMedia("(pointer:coarse)").matches:it=!1),it)}let pt;function Pt(){return typeof document>"u"?1:(pt===void 0&&(pt="chrome"in window?window.devicePixelRatio:1),pt)}const qt="VVirtualListXScroll";function go({columnsRef:e,renderColRef:n,renderItemWithColsRef:l}){const o=k(0),i=k(0),u=I(()=>{const p=e.value;if(p.length===0)return null;const w=new Gt(p.length,0);return p.forEach((y,x)=>{w.add(x,y.width)}),w}),f=Pe(()=>{const p=u.value;return p!==null?Math.max(p.getBound(i.value)-1,0):0}),a=p=>{const w=u.value;return w!==null?w.sum(p):0},S=Pe(()=>{const p=u.value;return p!==null?Math.min(p.getBound(i.value+o.value)+1,e.value.length-1):0});return Ct(qt,{startIndexRef:f,endIndexRef:S,columnsRef:e,renderColRef:n,renderItemWithColsRef:l,getLeft:a}),{listWidthRef:o,scrollLeftRef:i}}const Bt=be({name:"VirtualListRow",props:{index:{type:Number,required:!0},item:{type:Object,required:!0}},setup(){const{startIndexRef:e,endIndexRef:n,columnsRef:l,getLeft:o,renderColRef:i,renderItemWithColsRef:u}=Rt(qt);return{startIndex:e,endIndex:n,columns:l,renderCol:i,renderItemWithCols:u,getLeft:o}},render(){const{startIndex:e,endIndex:n,columns:l,renderCol:o,renderItemWithCols:i,getLeft:u,item:f}=this;if(i!=null)return i({itemIndex:this.index,startColIndex:e,endColIndex:n,allColumns:l,item:f,getLeft:u});if(o!=null){const a=[];for(let S=e;S<=n;++S){const p=l[S];a.push(o({column:p,left:u(S),item:f}))}return a}return null}}),bo=ft(".v-vl",{maxHeight:"inherit",height:"100%",overflow:"auto",minWidth:"1px"},[ft("&:not(.v-vl--show-scrollbar)",{scrollbarWidth:"none"},[ft("&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb",{width:0,height:0,display:"none"})])]),po=be({name:"VirtualList",inheritAttrs:!1,props:{showScrollbar:{type:Boolean,default:!0},columns:{type:Array,default:()=>[]},renderCol:Function,renderItemWithCols:Function,items:{type:Array,default:()=>[]},itemSize:{type:Number,required:!0},itemResizable:Boolean,itemsStyle:[String,Object],visibleItemsTag:{type:[String,Object],default:"div"},visibleItemsProps:Object,ignoreItemResize:Boolean,onScroll:Function,onWheel:Function,onResize:Function,defaultScrollKey:[Number,String],defaultScrollIndex:Number,keyField:{type:String,default:"key"},paddingTop:{type:[Number,String],default:0},paddingBottom:{type:[Number,String],default:0}},setup(e){const n=Pn();bo.mount({id:"vueuc/virtual-list",head:!0,anchorMetaName:Bn,ssr:n}),Xe(()=>{const{defaultScrollIndex:c,defaultScrollKey:C}=e;c!=null?A({index:c}):C!=null&&A({key:C})});let l=!1,o=!1;io(()=>{if(l=!1,!o){o=!0;return}A({top:z.value,left:f.value})}),ro(()=>{l=!0,o||(o=!0)});const i=Pe(()=>{if(e.renderCol==null&&e.renderItemWithCols==null||e.columns.length===0)return;let c=0;return e.columns.forEach(C=>{c+=C.width}),c}),u=I(()=>{const c=new Map,{keyField:C}=e;return e.items.forEach((V,L)=>{c.set(V[C],L)}),c}),{scrollLeftRef:f,listWidthRef:a}=go({columnsRef:ae(e,"columns"),renderColRef:ae(e,"renderCol"),renderItemWithColsRef:ae(e,"renderItemWithCols")}),S=k(null),p=k(void 0),w=new Map,y=I(()=>{const{items:c,itemSize:C,keyField:V}=e,L=new Gt(c.length,C);return c.forEach((j,Z)=>{const $=j[V],Y=w.get($);Y!==void 0&&L.add(Z,Y)}),L}),x=k(0),z=k(0),m=Pe(()=>Math.max(y.value.getBound(z.value-pe(e.paddingTop))-1,0)),_=I(()=>{const{value:c}=p;if(c===void 0)return[];const{items:C,itemSize:V}=e,L=m.value,j=Math.min(L+Math.ceil(c/V+1),C.length-1),Z=[];for(let $=L;$<=j;++$)Z.push(C[$]);return Z}),A=(c,C)=>{if(typeof c=="number"){ne(c,C,"auto");return}const{left:V,top:L,index:j,key:Z,position:$,behavior:Y,debounce:J=!0}=c;if(V!==void 0||L!==void 0)ne(V,L,Y);else if(j!==void 0)G(j,Y,J);else if(Z!==void 0){const X=u.value.get(Z);X!==void 0&&G(X,Y,J)}else $==="bottom"?ne(0,Number.MAX_SAFE_INTEGER,Y):$==="top"&&ne(0,0,Y)};let v,F=null;function G(c,C,V){const{value:L}=y,j=L.sum(c)+pe(e.paddingTop);if(!V)S.value.scrollTo({left:0,top:j,behavior:C});else{v=c,F!==null&&window.clearTimeout(F),F=window.setTimeout(()=>{v=void 0,F=null},16);const{scrollTop:Z,offsetHeight:$}=S.value;if(j>Z){const Y=L.get(c);j+Y<=Z+$||S.value.scrollTo({left:0,top:j+Y-$,behavior:C})}else S.value.scrollTo({left:0,top:j,behavior:C})}}function ne(c,C,V){S.value.scrollTo({left:c,top:C,behavior:V})}function q(c,C){var V,L,j;if(l||e.ignoreItemResize||ee(C.target))return;const{value:Z}=y,$=u.value.get(c),Y=Z.get($),J=(j=(L=(V=C.borderBoxSize)===null||V===void 0?void 0:V[0])===null||L===void 0?void 0:L.blockSize)!==null&&j!==void 0?j:C.contentRect.height;if(J===Y)return;J-e.itemSize===0?w.delete(c):w.set(c,J-e.itemSize);const ie=J-Y;if(ie===0)return;Z.add($,ie);const s=S.value;if(s!=null){if(v===void 0){const g=Z.sum($);s.scrollTop>g&&s.scrollBy(0,ie)}else if($<v)s.scrollBy(0,ie);else if($===v){const g=Z.sum($);J+g>s.scrollTop+s.offsetHeight&&s.scrollBy(0,ie)}U()}x.value++}const H=!vo();let de=!1;function oe(c){var C;(C=e.onScroll)===null||C===void 0||C.call(e,c),(!H||!de)&&U()}function P(c){var C;if((C=e.onWheel)===null||C===void 0||C.call(e,c),H){const V=S.value;if(V!=null){if(c.deltaX===0&&(V.scrollTop===0&&c.deltaY<=0||V.scrollTop+V.offsetHeight>=V.scrollHeight&&c.deltaY>=0))return;c.preventDefault(),V.scrollTop+=c.deltaY/Pt(),V.scrollLeft+=c.deltaX/Pt(),U(),de=!0,_n(()=>{de=!1})}}}function se(c){if(l||ee(c.target))return;if(e.renderCol==null&&e.renderItemWithCols==null){if(c.contentRect.height===p.value)return}else if(c.contentRect.height===p.value&&c.contentRect.width===a.value)return;p.value=c.contentRect.height,a.value=c.contentRect.width;const{onResize:C}=e;C!==void 0&&C(c)}function U(){const{value:c}=S;c!=null&&(z.value=c.scrollTop,f.value=c.scrollLeft)}function ee(c){let C=c;for(;C!==null;){if(C.style.display==="none")return!0;C=C.parentElement}return!1}return{listHeight:p,listStyle:{overflow:"auto"},keyToIndex:u,itemsStyle:I(()=>{const{itemResizable:c}=e,C=Fe(y.value.sum());return x.value,[e.itemsStyle,{boxSizing:"content-box",width:Fe(i.value),height:c?"":C,minHeight:c?C:"",paddingTop:Fe(e.paddingTop),paddingBottom:Fe(e.paddingBottom)}]}),visibleItemsStyle:I(()=>(x.value,{transform:`translateY(${Fe(y.value.sum(m.value))})`})),viewportItems:_,listElRef:S,itemsElRef:k(null),scrollTo:A,handleListResize:se,handleListScroll:oe,handleListWheel:P,handleItemResize:q}},render(){const{itemResizable:e,keyField:n,keyToIndex:l,visibleItemsTag:o}=this;return r(kt,{onResize:this.handleListResize},{default:()=>{var i,u;return r("div",lo(this.$attrs,{class:["v-vl",this.showScrollbar&&"v-vl--show-scrollbar"],onScroll:this.handleListScroll,onWheel:this.handleListWheel,ref:"listElRef"}),[this.items.length!==0?r("div",{ref:"itemsElRef",class:"v-vl-items",style:this.itemsStyle},[r(o,Object.assign({class:"v-vl-visible-items",style:this.visibleItemsStyle},this.visibleItemsProps),{default:()=>{const{renderCol:f,renderItemWithCols:a}=this;return this.viewportItems.map(S=>{const p=S[n],w=l.get(p),y=f!=null?r(Bt,{index:w,item:S}):void 0,x=a!=null?r(Bt,{index:w,item:S}):void 0,z=this.$slots.default({item:S,renderedCols:y,renderedItemWithCols:x,index:w})[0];return e?r(kt,{key:p,onResize:m=>this.handleItemResize(p,m)},{default:()=>z}):(z.key=p,z)})}})]):(u=(i=this.$slots).empty)===null||u===void 0?void 0:u.call(i)])}})}});function Yt(e,n){n&&(Xe(()=>{const{value:l}=e;l&&ht.registerHandler(l,n)}),Be(e,(l,o)=>{o&&ht.unregisterHandler(o)},{deep:!1}),Ht(()=>{const{value:l}=e;l&&ht.unregisterHandler(l)}))}const mo=new WeakSet;function wo(e){mo.add(e)}function _t(e){switch(typeof e){case"string":return e||void 0;case"number":return String(e);default:return}}function mt(e){const n=e.filter(l=>l!==void 0);if(n.length!==0)return n.length===1?n[0]:l=>{e.forEach(o=>{o&&o(l)})}}const yo=be({name:"Checkmark",render(){return r("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 16 16"},r("g",{fill:"none"},r("path",{d:"M14.046 3.486a.75.75 0 0 1-.032 1.06l-7.93 7.474a.85.85 0 0 1-1.188-.022l-2.68-2.72a.75.75 0 1 1 1.068-1.053l2.234 2.267l7.468-7.038a.75.75 0 0 1 1.06.032z",fill:"currentColor"})))}}),xo=be({name:"Empty",render(){return r("svg",{viewBox:"0 0 28 28",fill:"none",xmlns:"http://www.w3.org/2000/svg"},r("path",{d:"M26 7.5C26 11.0899 23.0899 14 19.5 14C15.9101 14 13 11.0899 13 7.5C13 3.91015 15.9101 1 19.5 1C23.0899 1 26 3.91015 26 7.5ZM16.8536 4.14645C16.6583 3.95118 16.3417 3.95118 16.1464 4.14645C15.9512 4.34171 15.9512 4.65829 16.1464 4.85355L18.7929 7.5L16.1464 10.1464C15.9512 10.3417 15.9512 10.6583 16.1464 10.8536C16.3417 11.0488 16.6583 11.0488 16.8536 10.8536L19.5 8.20711L22.1464 10.8536C22.3417 11.0488 22.6583 11.0488 22.8536 10.8536C23.0488 10.6583 23.0488 10.3417 22.8536 10.1464L20.2071 7.5L22.8536 4.85355C23.0488 4.65829 23.0488 4.34171 22.8536 4.14645C22.6583 3.95118 22.3417 3.95118 22.1464 4.14645L19.5 6.79289L16.8536 4.14645Z",fill:"currentColor"}),r("path",{d:"M25 22.75V12.5991C24.5572 13.0765 24.053 13.4961 23.5 13.8454V16H17.5L17.3982 16.0068C17.0322 16.0565 16.75 16.3703 16.75 16.75C16.75 18.2688 15.5188 19.5 14 19.5C12.4812 19.5 11.25 18.2688 11.25 16.75L11.2432 16.6482C11.1935 16.2822 10.8797 16 10.5 16H4.5V7.25C4.5 6.2835 5.2835 5.5 6.25 5.5H12.2696C12.4146 4.97463 12.6153 4.47237 12.865 4H6.25C4.45507 4 3 5.45507 3 7.25V22.75C3 24.5449 4.45507 26 6.25 26H21.75C23.5449 26 25 24.5449 25 22.75ZM4.5 22.75V17.5H9.81597L9.85751 17.7041C10.2905 19.5919 11.9808 21 14 21L14.215 20.9947C16.2095 20.8953 17.842 19.4209 18.184 17.5H23.5V22.75C23.5 23.7165 22.7165 24.5 21.75 24.5H6.25C5.2835 24.5 4.5 23.7165 4.5 22.75Z",fill:"currentColor"}))}}),Co=be({props:{onFocus:Function,onBlur:Function},setup(e){return()=>r("div",{style:"width: 0; height: 0",tabindex:0,onFocus:e.onFocus,onBlur:e.onBlur})}}),So=E("empty",`
 display: flex;
 flex-direction: column;
 align-items: center;
 font-size: var(--n-font-size);
`,[R("icon",`
 width: var(--n-icon-size);
 height: var(--n-icon-size);
 font-size: var(--n-icon-size);
 line-height: var(--n-icon-size);
 color: var(--n-icon-color);
 transition:
 color .3s var(--n-bezier);
 `,[fe("+",[R("description",`
 margin-top: 8px;
 `)])]),R("description",`
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
 `),R("extra",`
 text-align: center;
 transition: color .3s var(--n-bezier);
 margin-top: 12px;
 color: var(--n-extra-text-color);
 `)]),Ro=Object.assign(Object.assign({},Ce.props),{description:String,showDescription:{type:Boolean,default:!0},showIcon:{type:Boolean,default:!0},size:{type:String,default:"medium"},renderIcon:Function}),zo=be({name:"Empty",props:Ro,slots:Object,setup(e){const{mergedClsPrefixRef:n,inlineThemeDisabled:l,mergedComponentPropsRef:o}=Ye(e),i=Ce("Empty","-empty",So,$n,e,n),{localeRef:u}=At("Empty"),f=I(()=>{var w,y,x;return(w=e.description)!==null&&w!==void 0?w:(x=(y=o==null?void 0:o.value)===null||y===void 0?void 0:y.Empty)===null||x===void 0?void 0:x.description}),a=I(()=>{var w,y;return((y=(w=o==null?void 0:o.value)===null||w===void 0?void 0:w.Empty)===null||y===void 0?void 0:y.renderIcon)||(()=>r(xo,null))}),S=I(()=>{const{size:w}=e,{common:{cubicBezierEaseInOut:y},self:{[ue("iconSize",w)]:x,[ue("fontSize",w)]:z,textColor:m,iconColor:_,extraTextColor:A}}=i.value;return{"--n-icon-size":x,"--n-font-size":z,"--n-bezier":y,"--n-text-color":m,"--n-icon-color":_,"--n-extra-text-color":A}}),p=l?Je("empty",I(()=>{let w="";const{size:y}=e;return w+=y[0],w}),S,e):void 0;return{mergedClsPrefix:n,mergedRenderIcon:a,localizedDescription:I(()=>f.value||u.value.description),cssVars:l?void 0:S,themeClass:p==null?void 0:p.themeClass,onRender:p==null?void 0:p.onRender}},render(){const{$slots:e,mergedClsPrefix:n,onRender:l}=this;return l==null||l(),r("div",{class:[`${n}-empty`,this.themeClass],style:this.cssVars},this.showIcon?r("div",{class:`${n}-empty__icon`},e.icon?e.icon():r(Vt,{clsPrefix:n},{default:this.mergedRenderIcon})):null,this.showDescription?r("div",{class:`${n}-empty__description`},e.default?e.default():this.localizedDescription):null,e.extra?r("div",{class:`${n}-empty__extra`},e.extra()):null)}}),$t=be({name:"NBaseSelectGroupHeader",props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0}},setup(){const{renderLabelRef:e,renderOptionRef:n,labelFieldRef:l,nodePropsRef:o}=Rt(St);return{labelField:l,nodeProps:o,renderLabel:e,renderOption:n}},render(){const{clsPrefix:e,renderLabel:n,renderOption:l,nodeProps:o,tmNode:{rawNode:i}}=this,u=o==null?void 0:o(i),f=n?n(i,!1):Ve(i[this.labelField],i,!1),a=r("div",Object.assign({},u,{class:[`${e}-base-select-group-header`,u==null?void 0:u.class]}),f);return i.render?i.render({node:a,option:i}):l?l({node:a,option:i,selected:!1}):a}});function ko(e,n){return r(Ut,{name:"fade-in-scale-up-transition"},{default:()=>e?r(Vt,{clsPrefix:n,class:`${n}-base-select-option__check`},{default:()=>r(yo)}):null})}const Nt=be({name:"NBaseSelectOption",props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0}},setup(e){const{valueRef:n,pendingTmNodeRef:l,multipleRef:o,valueSetRef:i,renderLabelRef:u,renderOptionRef:f,labelFieldRef:a,valueFieldRef:S,showCheckmarkRef:p,nodePropsRef:w,handleOptionClick:y,handleOptionMouseEnter:x}=Rt(St),z=Pe(()=>{const{value:v}=l;return v?e.tmNode.key===v.key:!1});function m(v){const{tmNode:F}=e;F.disabled||y(v,F)}function _(v){const{tmNode:F}=e;F.disabled||x(v,F)}function A(v){const{tmNode:F}=e,{value:G}=z;F.disabled||G||x(v,F)}return{multiple:o,isGrouped:Pe(()=>{const{tmNode:v}=e,{parent:F}=v;return F&&F.rawNode.type==="group"}),showCheckmark:p,nodeProps:w,isPending:z,isSelected:Pe(()=>{const{value:v}=n,{value:F}=o;if(v===null)return!1;const G=e.tmNode.rawNode[S.value];if(F){const{value:ne}=i;return ne.has(G)}else return v===G}),labelField:a,renderLabel:u,renderOption:f,handleMouseMove:A,handleMouseEnter:_,handleClick:m}},render(){const{clsPrefix:e,tmNode:{rawNode:n},isSelected:l,isPending:o,isGrouped:i,showCheckmark:u,nodeProps:f,renderOption:a,renderLabel:S,handleClick:p,handleMouseEnter:w,handleMouseMove:y}=this,x=ko(l,e),z=S?[S(n,l),u&&x]:[Ve(n[this.labelField],n,l),u&&x],m=f==null?void 0:f(n),_=r("div",Object.assign({},m,{class:[`${e}-base-select-option`,n.class,m==null?void 0:m.class,{[`${e}-base-select-option--disabled`]:n.disabled,[`${e}-base-select-option--selected`]:l,[`${e}-base-select-option--grouped`]:i,[`${e}-base-select-option--pending`]:o,[`${e}-base-select-option--show-checkmark`]:u}],style:[(m==null?void 0:m.style)||"",n.style||""],onClick:mt([p,m==null?void 0:m.onClick]),onMouseenter:mt([w,m==null?void 0:m.onMouseenter]),onMousemove:mt([y,m==null?void 0:m.onMousemove])}),r("div",{class:`${e}-base-select-option__content`},z));return n.render?n.render({node:_,option:n,selected:l}):a?a({node:_,option:n,selected:l}):_}}),To=E("base-select-menu",`
 line-height: 1.5;
 outline: none;
 z-index: 0;
 position: relative;
 border-radius: var(--n-border-radius);
 transition:
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 background-color: var(--n-color);
`,[E("scrollbar",`
 max-height: var(--n-height);
 `),E("virtual-list",`
 max-height: var(--n-height);
 `),E("base-select-option",`
 min-height: var(--n-option-height);
 font-size: var(--n-option-font-size);
 display: flex;
 align-items: center;
 `,[R("content",`
 z-index: 1;
 white-space: nowrap;
 text-overflow: ellipsis;
 overflow: hidden;
 `)]),E("base-select-group-header",`
 min-height: var(--n-option-height);
 font-size: .93em;
 display: flex;
 align-items: center;
 `),E("base-select-menu-option-wrapper",`
 position: relative;
 width: 100%;
 `),R("loading, empty",`
 display: flex;
 padding: 12px 32px;
 flex: 1;
 justify-content: center;
 `),R("loading",`
 color: var(--n-loading-color);
 font-size: var(--n-loading-size);
 `),R("header",`
 padding: 8px var(--n-option-padding-left);
 font-size: var(--n-option-font-size);
 transition: 
 color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 border-bottom: 1px solid var(--n-action-divider-color);
 color: var(--n-action-text-color);
 `),R("action",`
 padding: 8px var(--n-option-padding-left);
 font-size: var(--n-option-font-size);
 transition: 
 color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 border-top: 1px solid var(--n-action-divider-color);
 color: var(--n-action-text-color);
 `),E("base-select-group-header",`
 position: relative;
 cursor: default;
 padding: var(--n-option-padding);
 color: var(--n-group-header-text-color);
 `),E("base-select-option",`
 cursor: pointer;
 position: relative;
 padding: var(--n-option-padding);
 transition:
 color .3s var(--n-bezier),
 opacity .3s var(--n-bezier);
 box-sizing: border-box;
 color: var(--n-option-text-color);
 opacity: 1;
 `,[te("show-checkmark",`
 padding-right: calc(var(--n-option-padding-right) + 20px);
 `),fe("&::before",`
 content: "";
 position: absolute;
 left: 4px;
 right: 4px;
 top: 0;
 bottom: 0;
 border-radius: var(--n-border-radius);
 transition: background-color .3s var(--n-bezier);
 `),fe("&:active",`
 color: var(--n-option-text-color-pressed);
 `),te("grouped",`
 padding-left: calc(var(--n-option-padding-left) * 1.5);
 `),te("pending",[fe("&::before",`
 background-color: var(--n-option-color-pending);
 `)]),te("selected",`
 color: var(--n-option-text-color-active);
 `,[fe("&::before",`
 background-color: var(--n-option-color-active);
 `),te("pending",[fe("&::before",`
 background-color: var(--n-option-color-active-pending);
 `)])]),te("disabled",`
 cursor: not-allowed;
 `,[qe("selected",`
 color: var(--n-option-text-color-disabled);
 `),te("selected",`
 opacity: var(--n-option-opacity-disabled);
 `)]),R("check",`
 font-size: 16px;
 position: absolute;
 right: calc(var(--n-option-padding-right) - 4px);
 top: calc(50% - 7px);
 color: var(--n-option-check-color);
 transition: color .3s var(--n-bezier);
 `,[Lt({enterScale:"0.5"})])])]),Fo=be({name:"InternalSelectMenu",props:Object.assign(Object.assign({},Ce.props),{clsPrefix:{type:String,required:!0},scrollable:{type:Boolean,default:!0},treeMate:{type:Object,required:!0},multiple:Boolean,size:{type:String,default:"medium"},value:{type:[String,Number,Array],default:null},autoPending:Boolean,virtualScroll:{type:Boolean,default:!0},show:{type:Boolean,default:!0},labelField:{type:String,default:"label"},valueField:{type:String,default:"value"},loading:Boolean,focusable:Boolean,renderLabel:Function,renderOption:Function,nodeProps:Function,showCheckmark:{type:Boolean,default:!0},onMousedown:Function,onScroll:Function,onFocus:Function,onBlur:Function,onKeyup:Function,onKeydown:Function,onTabOut:Function,onMouseenter:Function,onMouseleave:Function,onResize:Function,resetMenuOnOptionsChange:{type:Boolean,default:!0},inlineThemeDisabled:Boolean,scrollbarProps:Object,onToggle:Function}),setup(e){const{mergedClsPrefixRef:n,mergedRtlRef:l,mergedComponentPropsRef:o}=Ye(e),i=jt("InternalSelectMenu",l,n),u=Ce("InternalSelectMenu","-internal-select-menu",To,Vn,e,ae(e,"clsPrefix")),f=k(null),a=k(null),S=k(null),p=I(()=>e.treeMate.getFlattenedNodes()),w=I(()=>An(p.value)),y=k(null);function x(){const{treeMate:s}=e;let g=null;const{value:Q}=e;Q===null?g=s.getFirstAvailableNode():(e.multiple?g=s.getNode((Q||[])[(Q||[]).length-1]):g=s.getNode(Q),(!g||g.disabled)&&(g=s.getFirstAvailableNode())),L(g||null)}function z(){const{value:s}=y;s&&!e.treeMate.getNode(s.key)&&(y.value=null)}let m;Be(()=>e.show,s=>{s?m=Be(()=>e.treeMate,()=>{e.resetMenuOnOptionsChange?(e.autoPending?x():z(),Kt(j)):z()},{immediate:!0}):m==null||m()},{immediate:!0}),Ht(()=>{m==null||m()});const _=I(()=>pe(u.value.self[ue("optionHeight",e.size)])),A=I(()=>Ge(u.value.self[ue("padding",e.size)])),v=I(()=>e.multiple&&Array.isArray(e.value)?new Set(e.value):new Set),F=I(()=>{const s=p.value;return s&&s.length===0}),G=I(()=>{var s,g;return(g=(s=o==null?void 0:o.value)===null||s===void 0?void 0:s.Select)===null||g===void 0?void 0:g.renderEmpty});function ne(s){const{onToggle:g}=e;g&&g(s)}function q(s){const{onScroll:g}=e;g&&g(s)}function H(s){var g;(g=S.value)===null||g===void 0||g.sync(),q(s)}function de(){var s;(s=S.value)===null||s===void 0||s.sync()}function oe(){const{value:s}=y;return s||null}function P(s,g){g.disabled||L(g,!1)}function se(s,g){g.disabled||ne(g)}function U(s){var g;Ke(s,"action")||(g=e.onKeyup)===null||g===void 0||g.call(e,s)}function ee(s){var g;Ke(s,"action")||(g=e.onKeydown)===null||g===void 0||g.call(e,s)}function c(s){var g;(g=e.onMousedown)===null||g===void 0||g.call(e,s),!e.focusable&&s.preventDefault()}function C(){const{value:s}=y;s&&L(s.getNext({loop:!0}),!0)}function V(){const{value:s}=y;s&&L(s.getPrev({loop:!0}),!0)}function L(s,g=!1){y.value=s,g&&j()}function j(){var s,g;const Q=y.value;if(!Q)return;const ce=w.value(Q.key);ce!==null&&(e.virtualScroll?(s=a.value)===null||s===void 0||s.scrollTo({index:ce}):(g=S.value)===null||g===void 0||g.scrollTo({index:ce,elSize:_.value}))}function Z(s){var g,Q;!((g=f.value)===null||g===void 0)&&g.contains(s.target)&&((Q=e.onFocus)===null||Q===void 0||Q.call(e,s))}function $(s){var g,Q;!((g=f.value)===null||g===void 0)&&g.contains(s.relatedTarget)||(Q=e.onBlur)===null||Q===void 0||Q.call(e,s)}Ct(St,{handleOptionMouseEnter:P,handleOptionClick:se,valueSetRef:v,pendingTmNodeRef:y,nodePropsRef:ae(e,"nodeProps"),showCheckmarkRef:ae(e,"showCheckmark"),multipleRef:ae(e,"multiple"),valueRef:ae(e,"value"),renderLabelRef:ae(e,"renderLabel"),renderOptionRef:ae(e,"renderOption"),labelFieldRef:ae(e,"labelField"),valueFieldRef:ae(e,"valueField")}),Ct(Ln,f),Xe(()=>{const{value:s}=S;s&&s.sync()});const Y=I(()=>{const{size:s}=e,{common:{cubicBezierEaseInOut:g},self:{height:Q,borderRadius:ce,color:we,groupHeaderTextColor:he,actionDividerColor:ve,optionTextColorPressed:_e,optionTextColor:ze,optionTextColorDisabled:Ae,optionTextColorActive:Le,optionOpacityDisabled:De,optionCheckColor:Ie,actionTextColor:Me,optionColorPending:je,optionColorActive:We,loadingColor:He,loadingSize:$e,optionColorActivePending:Ne,[ue("optionFontSize",s)]:me,[ue("optionHeight",s)]:d,[ue("optionPadding",s)]:b}}=u.value;return{"--n-height":Q,"--n-action-divider-color":ve,"--n-action-text-color":Me,"--n-bezier":g,"--n-border-radius":ce,"--n-color":we,"--n-option-font-size":me,"--n-group-header-text-color":he,"--n-option-check-color":Ie,"--n-option-color-pending":je,"--n-option-color-active":We,"--n-option-color-active-pending":Ne,"--n-option-height":d,"--n-option-opacity-disabled":De,"--n-option-text-color":ze,"--n-option-text-color-active":Le,"--n-option-text-color-disabled":Ae,"--n-option-text-color-pressed":_e,"--n-option-padding":b,"--n-option-padding-left":Ge(b,"left"),"--n-option-padding-right":Ge(b,"right"),"--n-loading-color":He,"--n-loading-size":$e}}),{inlineThemeDisabled:J}=e,X=J?Je("internal-select-menu",I(()=>e.size[0]),Y,e):void 0,ie={selfRef:f,next:C,prev:V,getPendingTmNode:oe};return Yt(f,e.onResize),Object.assign({mergedTheme:u,mergedClsPrefix:n,rtlEnabled:i,virtualListRef:a,scrollbarRef:S,itemSize:_,padding:A,flattenedNodes:p,empty:F,mergedRenderEmpty:G,virtualListContainer(){const{value:s}=a;return s==null?void 0:s.listElRef},virtualListContent(){const{value:s}=a;return s==null?void 0:s.itemsElRef},doScroll:q,handleFocusin:Z,handleFocusout:$,handleKeyUp:U,handleKeyDown:ee,handleMouseDown:c,handleVirtualListResize:de,handleVirtualListScroll:H,cssVars:J?void 0:Y,themeClass:X==null?void 0:X.themeClass,onRender:X==null?void 0:X.onRender},ie)},render(){const{$slots:e,virtualScroll:n,clsPrefix:l,mergedTheme:o,themeClass:i,onRender:u}=this;return u==null||u(),r("div",{ref:"selfRef",tabindex:this.focusable?0:-1,class:[`${l}-base-select-menu`,`${l}-base-select-menu--${this.size}-size`,this.rtlEnabled&&`${l}-base-select-menu--rtl`,i,this.multiple&&`${l}-base-select-menu--multiple`],style:this.cssVars,onFocusin:this.handleFocusin,onFocusout:this.handleFocusout,onKeyup:this.handleKeyUp,onKeydown:this.handleKeyDown,onMousedown:this.handleMouseDown,onMouseenter:this.onMouseenter,onMouseleave:this.onMouseleave},Re(e.header,f=>f&&r("div",{class:`${l}-base-select-menu__header`,"data-header":!0,key:"header"},f)),this.loading?r("div",{class:`${l}-base-select-menu__loading`},r(Dt,{clsPrefix:l,strokeWidth:20})):this.empty?r("div",{class:`${l}-base-select-menu__empty`,"data-empty":!0},En(e.empty,()=>{var f;return[((f=this.mergedRenderEmpty)===null||f===void 0?void 0:f.call(this))||r(zo,{theme:o.peers.Empty,themeOverrides:o.peerOverrides.Empty,size:this.size})]})):r(Nn,Object.assign({ref:"scrollbarRef",theme:o.peers.Scrollbar,themeOverrides:o.peerOverrides.Scrollbar,scrollable:this.scrollable,container:n?this.virtualListContainer:void 0,content:n?this.virtualListContent:void 0,onScroll:n?void 0:this.doScroll},this.scrollbarProps),{default:()=>n?r(po,{ref:"virtualListRef",class:`${l}-virtual-list`,items:this.flattenedNodes,itemSize:this.itemSize,showScrollbar:!1,paddingTop:this.padding.top,paddingBottom:this.padding.bottom,onResize:this.handleVirtualListResize,onScroll:this.handleVirtualListScroll,itemResizable:!0},{default:({item:f})=>f.isGroup?r($t,{key:f.key,clsPrefix:l,tmNode:f}):f.ignored?null:r(Nt,{clsPrefix:l,key:f.key,tmNode:f})}):r("div",{class:`${l}-base-select-menu-option-wrapper`,style:{paddingTop:this.padding.top,paddingBottom:this.padding.bottom}},this.flattenedNodes.map(f=>f.isGroup?r($t,{key:f.key,clsPrefix:l,tmNode:f}):r(Nt,{clsPrefix:l,key:f.key,tmNode:f})))}),Re(e.action,f=>f&&[r("div",{class:`${l}-base-select-menu__action`,"data-action":!0,key:"action"},f),r(Co,{onFocus:this.onTabOut,key:"focus-detector"})]))}}),Oo=fe([E("base-selection",`
 --n-padding-single: var(--n-padding-single-top) var(--n-padding-single-right) var(--n-padding-single-bottom) var(--n-padding-single-left);
 --n-padding-multiple: var(--n-padding-multiple-top) var(--n-padding-multiple-right) var(--n-padding-multiple-bottom) var(--n-padding-multiple-left);
 position: relative;
 z-index: auto;
 box-shadow: none;
 width: 100%;
 max-width: 100%;
 display: inline-block;
 vertical-align: bottom;
 border-radius: var(--n-border-radius);
 min-height: var(--n-height);
 line-height: 1.5;
 font-size: var(--n-font-size);
 `,[E("base-loading",`
 color: var(--n-loading-color);
 `),E("base-selection-tags","min-height: var(--n-height);"),R("border, state-border",`
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 pointer-events: none;
 border: var(--n-border);
 border-radius: inherit;
 transition:
 box-shadow .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `),R("state-border",`
 z-index: 1;
 border-color: #0000;
 `),E("base-suffix",`
 cursor: pointer;
 position: absolute;
 top: 50%;
 transform: translateY(-50%);
 right: 10px;
 `,[R("arrow",`
 font-size: var(--n-arrow-size);
 color: var(--n-arrow-color);
 transition: color .3s var(--n-bezier);
 `)]),E("base-selection-overlay",`
 display: flex;
 align-items: center;
 white-space: nowrap;
 pointer-events: none;
 position: absolute;
 top: 0;
 right: 0;
 bottom: 0;
 left: 0;
 padding: var(--n-padding-single);
 transition: color .3s var(--n-bezier);
 `,[R("wrapper",`
 flex-basis: 0;
 flex-grow: 1;
 overflow: hidden;
 text-overflow: ellipsis;
 `)]),E("base-selection-placeholder",`
 color: var(--n-placeholder-color);
 `,[R("inner",`
 max-width: 100%;
 overflow: hidden;
 `)]),E("base-selection-tags",`
 cursor: pointer;
 outline: none;
 box-sizing: border-box;
 position: relative;
 z-index: auto;
 display: flex;
 padding: var(--n-padding-multiple);
 flex-wrap: wrap;
 align-items: center;
 width: 100%;
 vertical-align: bottom;
 background-color: var(--n-color);
 border-radius: inherit;
 transition:
 color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 `),E("base-selection-label",`
 height: var(--n-height);
 display: inline-flex;
 width: 100%;
 vertical-align: bottom;
 cursor: pointer;
 outline: none;
 z-index: auto;
 box-sizing: border-box;
 position: relative;
 transition:
 color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 border-radius: inherit;
 background-color: var(--n-color);
 align-items: center;
 `,[E("base-selection-input",`
 font-size: inherit;
 line-height: inherit;
 outline: none;
 cursor: pointer;
 box-sizing: border-box;
 border:none;
 width: 100%;
 padding: var(--n-padding-single);
 background-color: #0000;
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 caret-color: var(--n-caret-color);
 `,[R("content",`
 text-overflow: ellipsis;
 overflow: hidden;
 white-space: nowrap; 
 `)]),R("render-label",`
 color: var(--n-text-color);
 `)]),qe("disabled",[fe("&:hover",[R("state-border",`
 box-shadow: var(--n-box-shadow-hover);
 border: var(--n-border-hover);
 `)]),te("focus",[R("state-border",`
 box-shadow: var(--n-box-shadow-focus);
 border: var(--n-border-focus);
 `)]),te("active",[R("state-border",`
 box-shadow: var(--n-box-shadow-active);
 border: var(--n-border-active);
 `),E("base-selection-label","background-color: var(--n-color-active);"),E("base-selection-tags","background-color: var(--n-color-active);")])]),te("disabled","cursor: not-allowed;",[R("arrow",`
 color: var(--n-arrow-color-disabled);
 `),E("base-selection-label",`
 cursor: not-allowed;
 background-color: var(--n-color-disabled);
 `,[E("base-selection-input",`
 cursor: not-allowed;
 color: var(--n-text-color-disabled);
 `),R("render-label",`
 color: var(--n-text-color-disabled);
 `)]),E("base-selection-tags",`
 cursor: not-allowed;
 background-color: var(--n-color-disabled);
 `),E("base-selection-placeholder",`
 cursor: not-allowed;
 color: var(--n-placeholder-color-disabled);
 `)]),E("base-selection-input-tag",`
 height: calc(var(--n-height) - 6px);
 line-height: calc(var(--n-height) - 6px);
 outline: none;
 display: none;
 position: relative;
 margin-bottom: 3px;
 max-width: 100%;
 vertical-align: bottom;
 `,[R("input",`
 font-size: inherit;
 font-family: inherit;
 min-width: 1px;
 padding: 0;
 background-color: #0000;
 outline: none;
 border: none;
 max-width: 100%;
 overflow: hidden;
 width: 1em;
 line-height: inherit;
 cursor: pointer;
 color: var(--n-text-color);
 caret-color: var(--n-caret-color);
 `),R("mirror",`
 position: absolute;
 left: 0;
 top: 0;
 white-space: pre;
 visibility: hidden;
 user-select: none;
 -webkit-user-select: none;
 opacity: 0;
 `)]),["warning","error"].map(e=>te(`${e}-status`,[R("state-border",`border: var(--n-border-${e});`),qe("disabled",[fe("&:hover",[R("state-border",`
 box-shadow: var(--n-box-shadow-hover-${e});
 border: var(--n-border-hover-${e});
 `)]),te("active",[R("state-border",`
 box-shadow: var(--n-box-shadow-active-${e});
 border: var(--n-border-active-${e});
 `),E("base-selection-label",`background-color: var(--n-color-active-${e});`),E("base-selection-tags",`background-color: var(--n-color-active-${e});`)]),te("focus",[R("state-border",`
 box-shadow: var(--n-box-shadow-focus-${e});
 border: var(--n-border-focus-${e});
 `)])])]))]),E("base-selection-popover",`
 margin-bottom: -3px;
 display: flex;
 flex-wrap: wrap;
 margin-right: -8px;
 `),E("base-selection-tag-wrapper",`
 max-width: 100%;
 display: inline-flex;
 padding: 0 7px 3px 0;
 `,[fe("&:last-child","padding-right: 0;"),E("tag",`
 font-size: 14px;
 max-width: 100%;
 `,[R("content",`
 line-height: 1.25;
 text-overflow: ellipsis;
 overflow: hidden;
 `)])])]),Io=be({name:"InternalSelection",props:Object.assign(Object.assign({},Ce.props),{clsPrefix:{type:String,required:!0},bordered:{type:Boolean,default:void 0},active:Boolean,pattern:{type:String,default:""},placeholder:String,selectedOption:{type:Object,default:null},selectedOptions:{type:Array,default:null},labelField:{type:String,default:"label"},valueField:{type:String,default:"value"},multiple:Boolean,filterable:Boolean,clearable:Boolean,disabled:Boolean,size:{type:String,default:"medium"},loading:Boolean,autofocus:Boolean,showArrow:{type:Boolean,default:!0},inputProps:Object,focused:Boolean,renderTag:Function,onKeydown:Function,onClick:Function,onBlur:Function,onFocus:Function,onDeleteOption:Function,maxTagCount:[String,Number],ellipsisTagPopoverProps:Object,onClear:Function,onPatternInput:Function,onPatternFocus:Function,onPatternBlur:Function,renderLabel:Function,status:String,inlineThemeDisabled:Boolean,ignoreComposition:{type:Boolean,default:!0},onResize:Function}),setup(e){const{mergedClsPrefixRef:n,mergedRtlRef:l}=Ye(e),o=jt("InternalSelection",l,n),i=k(null),u=k(null),f=k(null),a=k(null),S=k(null),p=k(null),w=k(null),y=k(null),x=k(null),z=k(null),m=k(!1),_=k(!1),A=k(!1),v=Ce("InternalSelection","-internal-selection",Oo,Hn,e,ae(e,"clsPrefix")),F=I(()=>e.clearable&&!e.disabled&&(A.value||e.active)),G=I(()=>e.selectedOption?e.renderTag?e.renderTag({option:e.selectedOption,handleClose:()=>{}}):e.renderLabel?e.renderLabel(e.selectedOption,!0):Ve(e.selectedOption[e.labelField],e.selectedOption,!0):e.placeholder),ne=I(()=>{const d=e.selectedOption;if(d)return d[e.labelField]}),q=I(()=>e.multiple?!!(Array.isArray(e.selectedOptions)&&e.selectedOptions.length):e.selectedOption!==null);function H(){var d;const{value:b}=i;if(b){const{value:le}=u;le&&(le.style.width=`${b.offsetWidth}px`,e.maxTagCount!=="responsive"&&((d=x.value)===null||d===void 0||d.sync({showAllItemsBeforeCalculate:!1})))}}function de(){const{value:d}=z;d&&(d.style.display="none")}function oe(){const{value:d}=z;d&&(d.style.display="inline-block")}Be(ae(e,"active"),d=>{d||de()}),Be(ae(e,"pattern"),()=>{e.multiple&&Kt(H)});function P(d){const{onFocus:b}=e;b&&b(d)}function se(d){const{onBlur:b}=e;b&&b(d)}function U(d){const{onDeleteOption:b}=e;b&&b(d)}function ee(d){const{onClear:b}=e;b&&b(d)}function c(d){const{onPatternInput:b}=e;b&&b(d)}function C(d){var b;(!d.relatedTarget||!(!((b=f.value)===null||b===void 0)&&b.contains(d.relatedTarget)))&&P(d)}function V(d){var b;!((b=f.value)===null||b===void 0)&&b.contains(d.relatedTarget)||se(d)}function L(d){ee(d)}function j(){A.value=!0}function Z(){A.value=!1}function $(d){!e.active||!e.filterable||d.target!==u.value&&d.preventDefault()}function Y(d){U(d)}const J=k(!1);function X(d){if(d.key==="Backspace"&&!J.value&&!e.pattern.length){const{selectedOptions:b}=e;b!=null&&b.length&&Y(b[b.length-1])}}let ie=null;function s(d){const{value:b}=i;if(b){const le=d.target.value;b.textContent=le,H()}e.ignoreComposition&&J.value?ie=d:c(d)}function g(){J.value=!0}function Q(){J.value=!1,e.ignoreComposition&&c(ie),ie=null}function ce(d){var b;_.value=!0,(b=e.onPatternFocus)===null||b===void 0||b.call(e,d)}function we(d){var b;_.value=!1,(b=e.onPatternBlur)===null||b===void 0||b.call(e,d)}function he(){var d,b;if(e.filterable)_.value=!1,(d=p.value)===null||d===void 0||d.blur(),(b=u.value)===null||b===void 0||b.blur();else if(e.multiple){const{value:le}=a;le==null||le.blur()}else{const{value:le}=S;le==null||le.blur()}}function ve(){var d,b,le;e.filterable?(_.value=!1,(d=p.value)===null||d===void 0||d.focus()):e.multiple?(b=a.value)===null||b===void 0||b.focus():(le=S.value)===null||le===void 0||le.focus()}function _e(){const{value:d}=u;d&&(oe(),d.focus())}function ze(){const{value:d}=u;d&&d.blur()}function Ae(d){const{value:b}=w;b&&b.setTextContent(`+${d}`)}function Le(){const{value:d}=y;return d}function De(){return u.value}let Ie=null;function Me(){Ie!==null&&window.clearTimeout(Ie)}function je(){e.active||(Me(),Ie=window.setTimeout(()=>{q.value&&(m.value=!0)},100))}function We(){Me()}function He(d){d||(Me(),m.value=!1)}Be(q,d=>{d||(m.value=!1)}),Xe(()=>{so(()=>{const d=p.value;d&&(e.disabled?d.removeAttribute("tabindex"):d.tabIndex=_.value?-1:0)})}),Yt(f,e.onResize);const{inlineThemeDisabled:$e}=e,Ne=I(()=>{const{size:d}=e,{common:{cubicBezierEaseInOut:b},self:{fontWeight:le,borderRadius:at,color:st,placeholderColor:dt,textColor:Ze,paddingSingle:Qe,paddingMultiple:et,caretColor:ut,colorDisabled:ct,textColorDisabled:tt,placeholderColorDisabled:ke,colorActive:t,boxShadowFocus:h,boxShadowActive:T,boxShadowHover:B,border:O,borderFocus:M,borderHover:N,borderActive:re,arrowColor:ye,arrowColorDisabled:Xt,loadingColor:Zt,colorActiveWarning:Qt,boxShadowFocusWarning:en,boxShadowActiveWarning:tn,boxShadowHoverWarning:nn,borderWarning:on,borderFocusWarning:ln,borderHoverWarning:rn,borderActiveWarning:an,colorActiveError:sn,boxShadowFocusError:dn,boxShadowActiveError:un,boxShadowHoverError:cn,borderError:fn,borderFocusError:hn,borderHoverError:vn,borderActiveError:gn,clearColor:bn,clearColorHover:pn,clearColorPressed:mn,clearSize:wn,arrowSize:yn,[ue("height",d)]:xn,[ue("fontSize",d)]:Cn}}=v.value,nt=Ge(Qe),ot=Ge(et);return{"--n-bezier":b,"--n-border":O,"--n-border-active":re,"--n-border-focus":M,"--n-border-hover":N,"--n-border-radius":at,"--n-box-shadow-active":T,"--n-box-shadow-focus":h,"--n-box-shadow-hover":B,"--n-caret-color":ut,"--n-color":st,"--n-color-active":t,"--n-color-disabled":ct,"--n-font-size":Cn,"--n-height":xn,"--n-padding-single-top":nt.top,"--n-padding-multiple-top":ot.top,"--n-padding-single-right":nt.right,"--n-padding-multiple-right":ot.right,"--n-padding-single-left":nt.left,"--n-padding-multiple-left":ot.left,"--n-padding-single-bottom":nt.bottom,"--n-padding-multiple-bottom":ot.bottom,"--n-placeholder-color":dt,"--n-placeholder-color-disabled":ke,"--n-text-color":Ze,"--n-text-color-disabled":tt,"--n-arrow-color":ye,"--n-arrow-color-disabled":Xt,"--n-loading-color":Zt,"--n-color-active-warning":Qt,"--n-box-shadow-focus-warning":en,"--n-box-shadow-active-warning":tn,"--n-box-shadow-hover-warning":nn,"--n-border-warning":on,"--n-border-focus-warning":ln,"--n-border-hover-warning":rn,"--n-border-active-warning":an,"--n-color-active-error":sn,"--n-box-shadow-focus-error":dn,"--n-box-shadow-active-error":un,"--n-box-shadow-hover-error":cn,"--n-border-error":fn,"--n-border-focus-error":hn,"--n-border-hover-error":vn,"--n-border-active-error":gn,"--n-clear-size":wn,"--n-clear-color":bn,"--n-clear-color-hover":pn,"--n-clear-color-pressed":mn,"--n-arrow-size":yn,"--n-font-weight":le}}),me=$e?Je("internal-selection",I(()=>e.size[0]),Ne,e):void 0;return{mergedTheme:v,mergedClearable:F,mergedClsPrefix:n,rtlEnabled:o,patternInputFocused:_,filterablePlaceholder:G,label:ne,selected:q,showTagsPanel:m,isComposing:J,counterRef:w,counterWrapperRef:y,patternInputMirrorRef:i,patternInputRef:u,selfRef:f,multipleElRef:a,singleElRef:S,patternInputWrapperRef:p,overflowRef:x,inputTagElRef:z,handleMouseDown:$,handleFocusin:C,handleClear:L,handleMouseEnter:j,handleMouseLeave:Z,handleDeleteOption:Y,handlePatternKeyDown:X,handlePatternInputInput:s,handlePatternInputBlur:we,handlePatternInputFocus:ce,handleMouseEnterCounter:je,handleMouseLeaveCounter:We,handleFocusout:V,handleCompositionEnd:Q,handleCompositionStart:g,onPopoverUpdateShow:He,focus:ve,focusInput:_e,blur:he,blurInput:ze,updateCounter:Ae,getCounter:Le,getTail:De,renderLabel:e.renderLabel,cssVars:$e?void 0:Ne,themeClass:me==null?void 0:me.themeClass,onRender:me==null?void 0:me.onRender}},render(){const{status:e,multiple:n,size:l,disabled:o,filterable:i,maxTagCount:u,bordered:f,clsPrefix:a,ellipsisTagPopoverProps:S,onRender:p,renderTag:w,renderLabel:y}=this;p==null||p();const x=u==="responsive",z=typeof u=="number",m=x||z,_=r(Dn,null,{default:()=>r(jn,{clsPrefix:a,loading:this.loading,showArrow:this.showArrow,showClear:this.mergedClearable&&this.selected,onClear:this.handleClear},{default:()=>{var v,F;return(F=(v=this.$slots).arrow)===null||F===void 0?void 0:F.call(v)}})});let A;if(n){const{labelField:v}=this,F=c=>r("div",{class:`${a}-base-selection-tag-wrapper`,key:c.value},w?w({option:c,handleClose:()=>{this.handleDeleteOption(c)}}):r(Oe,{size:l,closable:!c.disabled,disabled:o,onClose:()=>{this.handleDeleteOption(c)},internalCloseIsButtonTag:!1,internalCloseFocusable:!1},{default:()=>y?y(c,!0):Ve(c[v],c,!0)})),G=()=>(z?this.selectedOptions.slice(0,u):this.selectedOptions).map(F),ne=i?r("div",{class:`${a}-base-selection-input-tag`,ref:"inputTagElRef",key:"__input-tag__"},r("input",Object.assign({},this.inputProps,{ref:"patternInputRef",tabindex:-1,disabled:o,value:this.pattern,autofocus:this.autofocus,class:`${a}-base-selection-input-tag__input`,onBlur:this.handlePatternInputBlur,onFocus:this.handlePatternInputFocus,onKeydown:this.handlePatternKeyDown,onInput:this.handlePatternInputInput,onCompositionstart:this.handleCompositionStart,onCompositionend:this.handleCompositionEnd})),r("span",{ref:"patternInputMirrorRef",class:`${a}-base-selection-input-tag__mirror`},this.pattern)):null,q=x?()=>r("div",{class:`${a}-base-selection-tag-wrapper`,ref:"counterWrapperRef"},r(Oe,{size:l,ref:"counterRef",onMouseenter:this.handleMouseEnterCounter,onMouseleave:this.handleMouseLeaveCounter,disabled:o})):void 0;let H;if(z){const c=this.selectedOptions.length-u;c>0&&(H=r("div",{class:`${a}-base-selection-tag-wrapper`,key:"__counter__"},r(Oe,{size:l,ref:"counterRef",onMouseenter:this.handleMouseEnterCounter,disabled:o},{default:()=>`+${c}`})))}const de=x?i?r(Tt,{ref:"overflowRef",updateCounter:this.updateCounter,getCounter:this.getCounter,getTail:this.getTail,style:{width:"100%",display:"flex",overflow:"hidden"}},{default:G,counter:q,tail:()=>ne}):r(Tt,{ref:"overflowRef",updateCounter:this.updateCounter,getCounter:this.getCounter,style:{width:"100%",display:"flex",overflow:"hidden"}},{default:G,counter:q}):z&&H?G().concat(H):G(),oe=m?()=>r("div",{class:`${a}-base-selection-popover`},x?G():this.selectedOptions.map(F)):void 0,P=m?Object.assign({show:this.showTagsPanel,trigger:"hover",overlap:!0,placement:"top",width:"trigger",onUpdateShow:this.onPopoverUpdateShow,theme:this.mergedTheme.peers.Popover,themeOverrides:this.mergedTheme.peerOverrides.Popover},S):null,U=(this.selected?!1:this.active?!this.pattern&&!this.isComposing:!0)?r("div",{class:`${a}-base-selection-placeholder ${a}-base-selection-overlay`},r("div",{class:`${a}-base-selection-placeholder__inner`},this.placeholder)):null,ee=i?r("div",{ref:"patternInputWrapperRef",class:`${a}-base-selection-tags`},de,x?null:ne,_):r("div",{ref:"multipleElRef",class:`${a}-base-selection-tags`,tabindex:o?void 0:0},de,_);A=r(ao,null,m?r(Wn,Object.assign({},P,{scrollable:!0,style:"max-height: calc(var(--v-target-height) * 6.6);"}),{trigger:()=>ee,default:oe}):ee,U)}else if(i){const v=this.pattern||this.isComposing,F=this.active?!v:!this.selected,G=this.active?!1:this.selected;A=r("div",{ref:"patternInputWrapperRef",class:`${a}-base-selection-label`,title:this.patternInputFocused?void 0:_t(this.label)},r("input",Object.assign({},this.inputProps,{ref:"patternInputRef",class:`${a}-base-selection-input`,value:this.active?this.pattern:"",placeholder:"",readonly:o,disabled:o,tabindex:-1,autofocus:this.autofocus,onFocus:this.handlePatternInputFocus,onBlur:this.handlePatternInputBlur,onInput:this.handlePatternInputInput,onCompositionstart:this.handleCompositionStart,onCompositionend:this.handleCompositionEnd})),G?r("div",{class:`${a}-base-selection-label__render-label ${a}-base-selection-overlay`,key:"input"},r("div",{class:`${a}-base-selection-overlay__wrapper`},w?w({option:this.selectedOption,handleClose:()=>{}}):y?y(this.selectedOption,!0):Ve(this.label,this.selectedOption,!0))):null,F?r("div",{class:`${a}-base-selection-placeholder ${a}-base-selection-overlay`,key:"placeholder"},r("div",{class:`${a}-base-selection-overlay__wrapper`},this.filterablePlaceholder)):null,_)}else A=r("div",{ref:"singleElRef",class:`${a}-base-selection-label`,tabindex:this.disabled?void 0:0},this.label!==void 0?r("div",{class:`${a}-base-selection-input`,title:_t(this.label),key:"input"},r("div",{class:`${a}-base-selection-input__content`},w?w({option:this.selectedOption,handleClose:()=>{}}):y?y(this.selectedOption,!0):Ve(this.label,this.selectedOption,!0))):r("div",{class:`${a}-base-selection-placeholder ${a}-base-selection-overlay`,key:"placeholder"},r("div",{class:`${a}-base-selection-placeholder__inner`},this.placeholder)),_);return r("div",{ref:"selfRef",class:[`${a}-base-selection`,this.rtlEnabled&&`${a}-base-selection--rtl`,this.themeClass,e&&`${a}-base-selection--${e}-status`,{[`${a}-base-selection--active`]:this.active,[`${a}-base-selection--selected`]:this.selected||this.active&&this.pattern,[`${a}-base-selection--disabled`]:this.disabled,[`${a}-base-selection--multiple`]:this.multiple,[`${a}-base-selection--focus`]:this.focused}],style:this.cssVars,onClick:this.onClick,onMouseenter:this.handleMouseEnter,onMouseleave:this.handleMouseLeave,onKeydown:this.onKeydown,onFocusin:this.handleFocusin,onFocusout:this.handleFocusout,onMousedown:this.handleMouseDown},A,f?r("div",{class:`${a}-base-selection__border`}):null,f?r("div",{class:`${a}-base-selection__state-border`}):null)}});function rt(e){return e.type==="group"}function Jt(e){return e.type==="ignored"}function wt(e,n){try{return!!(1+n.toString().toLowerCase().indexOf(e.trim().toLowerCase()))}catch{return!1}}function Mo(e,n){return{getIsGroup:rt,getIgnored:Jt,getKey(o){return rt(o)?o.name||o.key||"key-required":o[e]},getChildren(o){return o[n]}}}function Po(e,n,l,o){if(!n)return e;function i(u){if(!Array.isArray(u))return[];const f=[];for(const a of u)if(rt(a)){const S=i(a[o]);S.length&&f.push(Object.assign({},a,{[o]:S}))}else{if(Jt(a))continue;n(l,a)&&f.push(a)}return f}return i(e)}function Bo(e,n,l){const o=new Map;return e.forEach(i=>{rt(i)?i[l].forEach(u=>{o.set(u[n],u)}):o.set(i[n],i)}),o}const _o=fe([E("select",`
 z-index: auto;
 outline: none;
 width: 100%;
 position: relative;
 font-weight: var(--n-font-weight);
 `),E("select-menu",`
 margin: 4px 0;
 box-shadow: var(--n-menu-box-shadow);
 `,[Lt({originalTransition:"background-color .3s var(--n-bezier), box-shadow .3s var(--n-bezier)"})])]),$o=Object.assign(Object.assign({},Ce.props),{to:yt.propTo,bordered:{type:Boolean,default:void 0},clearable:Boolean,clearCreatedOptionsOnClear:{type:Boolean,default:!0},clearFilterAfterSelect:{type:Boolean,default:!0},options:{type:Array,default:()=>[]},defaultValue:{type:[String,Number,Array],default:null},keyboard:{type:Boolean,default:!0},value:[String,Number,Array],placeholder:String,menuProps:Object,multiple:Boolean,size:String,menuSize:{type:String},filterable:Boolean,disabled:{type:Boolean,default:void 0},remote:Boolean,loading:Boolean,filter:Function,placement:{type:String,default:"bottom-start"},widthMode:{type:String,default:"trigger"},tag:Boolean,onCreate:Function,fallbackOption:{type:[Function,Boolean],default:void 0},show:{type:Boolean,default:void 0},showArrow:{type:Boolean,default:!0},maxTagCount:[Number,String],ellipsisTagPopoverProps:Object,consistentMenuWidth:{type:Boolean,default:!0},virtualScroll:{type:Boolean,default:!0},labelField:{type:String,default:"label"},valueField:{type:String,default:"value"},childrenField:{type:String,default:"children"},renderLabel:Function,renderOption:Function,renderTag:Function,"onUpdate:value":[Function,Array],inputProps:Object,nodeProps:Function,ignoreComposition:{type:Boolean,default:!0},showOnFocus:Boolean,onUpdateValue:[Function,Array],onBlur:[Function,Array],onClear:[Function,Array],onFocus:[Function,Array],onScroll:[Function,Array],onSearch:[Function,Array],onUpdateShow:[Function,Array],"onUpdate:show":[Function,Array],displayDirective:{type:String,default:"show"},resetMenuOnOptionsChange:{type:Boolean,default:!0},status:String,showCheckmark:{type:Boolean,default:!0},scrollbarProps:Object,onChange:[Function,Array],items:Array}),No=be({name:"Select",props:$o,slots:Object,setup(e){const{mergedClsPrefixRef:n,mergedBorderedRef:l,namespaceRef:o,inlineThemeDisabled:i,mergedComponentPropsRef:u}=Ye(e),f=Ce("Select","-select",_o,qn,e,n),a=k(e.defaultValue),S=ae(e,"value"),p=xt(S,a),w=k(!1),y=k(""),x=Xn(e,["items","options"]),z=k([]),m=k([]),_=I(()=>m.value.concat(z.value).concat(x.value)),A=I(()=>{const{filter:t}=e;if(t)return t;const{labelField:h,valueField:T}=e;return(B,O)=>{if(!O)return!1;const M=O[h];if(typeof M=="string")return wt(B,M);const N=O[T];return typeof N=="string"?wt(B,N):typeof N=="number"?wt(B,String(N)):!1}}),v=I(()=>{if(e.remote)return x.value;{const{value:t}=_,{value:h}=y;return!h.length||!e.filterable?t:Po(t,A.value,h,e.childrenField)}}),F=I(()=>{const{valueField:t,childrenField:h}=e,T=Mo(t,h);return Zn(v.value,T)}),G=I(()=>Bo(_.value,e.valueField,e.childrenField)),ne=k(!1),q=xt(ae(e,"show"),ne),H=k(null),de=k(null),oe=k(null),{localeRef:P}=At("Select"),se=I(()=>{var t;return(t=e.placeholder)!==null&&t!==void 0?t:P.value.placeholder}),U=[],ee=k(new Map),c=I(()=>{const{fallbackOption:t}=e;if(t===void 0){const{labelField:h,valueField:T}=e;return B=>({[h]:String(B),[T]:B})}return t===!1?!1:h=>Object.assign(t(h),{value:h})});function C(t){const h=e.remote,{value:T}=ee,{value:B}=G,{value:O}=c,M=[];return t.forEach(N=>{if(B.has(N))M.push(B.get(N));else if(h&&T.has(N))M.push(T.get(N));else if(O){const re=O(N);re&&M.push(re)}}),M}const V=I(()=>{if(e.multiple){const{value:t}=p;return Array.isArray(t)?C(t):[]}return null}),L=I(()=>{const{value:t}=p;return!e.multiple&&!Array.isArray(t)?t===null?null:C([t])[0]||null:null}),j=Wt(e,{mergedSize:t=>{var h,T;const{size:B}=e;if(B)return B;const{mergedSize:O}=t||{};if(O!=null&&O.value)return O.value;const M=(T=(h=u==null?void 0:u.value)===null||h===void 0?void 0:h.Select)===null||T===void 0?void 0:T.size;return M||"medium"}}),{mergedSizeRef:Z,mergedDisabledRef:$,mergedStatusRef:Y}=j;function J(t,h){const{onChange:T,"onUpdate:value":B,onUpdateValue:O}=e,{nTriggerFormChange:M,nTriggerFormInput:N}=j;T&&ge(T,t,h),O&&ge(O,t,h),B&&ge(B,t,h),a.value=t,M(),N()}function X(t){const{onBlur:h}=e,{nTriggerFormBlur:T}=j;h&&ge(h,t),T()}function ie(){const{onClear:t}=e;t&&ge(t)}function s(t){const{onFocus:h,showOnFocus:T}=e,{nTriggerFormFocus:B}=j;h&&ge(h,t),B(),T&&he()}function g(t){const{onSearch:h}=e;h&&ge(h,t)}function Q(t){const{onScroll:h}=e;h&&ge(h,t)}function ce(){var t;const{remote:h,multiple:T}=e;if(h){const{value:B}=ee;if(T){const{valueField:O}=e;(t=V.value)===null||t===void 0||t.forEach(M=>{B.set(M[O],M)})}else{const O=L.value;O&&B.set(O[e.valueField],O)}}}function we(t){const{onUpdateShow:h,"onUpdate:show":T}=e;h&&ge(h,t),T&&ge(T,t),ne.value=t}function he(){$.value||(we(!0),ne.value=!0,e.filterable&&et())}function ve(){we(!1)}function _e(){y.value="",m.value=U}const ze=k(!1);function Ae(){e.filterable&&(ze.value=!0)}function Le(){e.filterable&&(ze.value=!1,q.value||_e())}function De(){$.value||(q.value?e.filterable?et():ve():he())}function Ie(t){var h,T;!((T=(h=oe.value)===null||h===void 0?void 0:h.selfRef)===null||T===void 0)&&T.contains(t.relatedTarget)||(w.value=!1,X(t),ve())}function Me(t){s(t),w.value=!0}function je(){w.value=!0}function We(t){var h;!((h=H.value)===null||h===void 0)&&h.$el.contains(t.relatedTarget)||(w.value=!1,X(t),ve())}function He(){var t;(t=H.value)===null||t===void 0||t.focus(),ve()}function $e(t){var h;q.value&&(!((h=H.value)===null||h===void 0)&&h.$el.contains(Jn(t))||ve())}function Ne(t){if(!Array.isArray(t))return[];if(c.value)return Array.from(t);{const{remote:h}=e,{value:T}=G;if(h){const{value:B}=ee;return t.filter(O=>T.has(O)||B.has(O))}else return t.filter(B=>T.has(B))}}function me(t){d(t.rawNode)}function d(t){if($.value)return;const{tag:h,remote:T,clearFilterAfterSelect:B,valueField:O}=e;if(h&&!T){const{value:M}=m,N=M[0]||null;if(N){const re=z.value;re.length?re.push(N):z.value=[N],m.value=U}}if(T&&ee.value.set(t[O],t),e.multiple){const M=Ne(p.value),N=M.findIndex(re=>re===t[O]);if(~N){if(M.splice(N,1),h&&!T){const re=b(t[O]);~re&&(z.value.splice(re,1),B&&(y.value=""))}}else M.push(t[O]),B&&(y.value="");J(M,C(M))}else{if(h&&!T){const M=b(t[O]);~M?z.value=[z.value[M]]:z.value=U}Qe(),ve(),J(t[O],t)}}function b(t){return z.value.findIndex(T=>T[e.valueField]===t)}function le(t){q.value||he();const{value:h}=t.target;y.value=h;const{tag:T,remote:B}=e;if(g(h),T&&!B){if(!h){m.value=U;return}const{onCreate:O}=e,M=O?O(h):{[e.labelField]:h,[e.valueField]:h},{valueField:N,labelField:re}=e;x.value.some(ye=>ye[N]===M[N]||ye[re]===M[re])||z.value.some(ye=>ye[N]===M[N]||ye[re]===M[re])?m.value=U:m.value=[M]}}function at(t){t.stopPropagation();const{multiple:h,tag:T,remote:B,clearCreatedOptionsOnClear:O}=e;!h&&e.filterable&&ve(),T&&!B&&O&&(z.value=U),ie(),h?J([],[]):J(null,null)}function st(t){!Ke(t,"action")&&!Ke(t,"empty")&&!Ke(t,"header")&&t.preventDefault()}function dt(t){Q(t)}function Ze(t){var h,T,B,O,M;if(!e.keyboard){t.preventDefault();return}switch(t.key){case" ":if(e.filterable)break;t.preventDefault();case"Enter":if(!(!((h=H.value)===null||h===void 0)&&h.isComposing)){if(q.value){const N=(T=oe.value)===null||T===void 0?void 0:T.getPendingTmNode();N?me(N):e.filterable||(ve(),Qe())}else if(he(),e.tag&&ze.value){const N=m.value[0];if(N){const re=N[e.valueField],{value:ye}=p;e.multiple&&Array.isArray(ye)&&ye.includes(re)||d(N)}}}t.preventDefault();break;case"ArrowUp":if(t.preventDefault(),e.loading)return;q.value&&((B=oe.value)===null||B===void 0||B.prev());break;case"ArrowDown":if(t.preventDefault(),e.loading)return;q.value?(O=oe.value)===null||O===void 0||O.next():he();break;case"Escape":q.value&&(wo(t),ve()),(M=H.value)===null||M===void 0||M.focus();break}}function Qe(){var t;(t=H.value)===null||t===void 0||t.focus()}function et(){var t;(t=H.value)===null||t===void 0||t.focusInput()}function ut(){var t;q.value&&((t=de.value)===null||t===void 0||t.syncPosition())}ce(),Be(ae(e,"options"),ce);const ct={focus:()=>{var t;(t=H.value)===null||t===void 0||t.focus()},focusInput:()=>{var t;(t=H.value)===null||t===void 0||t.focusInput()},blur:()=>{var t;(t=H.value)===null||t===void 0||t.blur()},blurInput:()=>{var t;(t=H.value)===null||t===void 0||t.blurInput()}},tt=I(()=>{const{self:{menuBoxShadow:t}}=f.value;return{"--n-menu-box-shadow":t}}),ke=i?Je("select",void 0,tt,e):void 0;return Object.assign(Object.assign({},ct),{mergedStatus:Y,mergedClsPrefix:n,mergedBordered:l,namespace:o,treeMate:F,isMounted:Yn(),triggerRef:H,menuRef:oe,pattern:y,uncontrolledShow:ne,mergedShow:q,adjustedTo:yt(e),uncontrolledValue:a,mergedValue:p,followerRef:de,localizedPlaceholder:se,selectedOption:L,selectedOptions:V,mergedSize:Z,mergedDisabled:$,focused:w,activeWithoutMenuOpen:ze,inlineThemeDisabled:i,onTriggerInputFocus:Ae,onTriggerInputBlur:Le,handleTriggerOrMenuResize:ut,handleMenuFocus:je,handleMenuBlur:We,handleMenuTabOut:He,handleTriggerClick:De,handleToggle:me,handleDeleteOption:d,handlePatternInput:le,handleClear:at,handleTriggerBlur:Ie,handleTriggerFocus:Me,handleKeydown:Ze,handleMenuAfterLeave:_e,handleMenuClickOutside:$e,handleMenuScroll:dt,handleMenuKeydown:Ze,handleMenuMousedown:st,mergedTheme:f,cssVars:i?void 0:tt,themeClass:ke==null?void 0:ke.themeClass,onRender:ke==null?void 0:ke.onRender})},render(){return r("div",{class:`${this.mergedClsPrefix}-select`},r(Un,null,{default:()=>[r(Kn,null,{default:()=>r(Io,{ref:"triggerRef",inlineThemeDisabled:this.inlineThemeDisabled,status:this.mergedStatus,inputProps:this.inputProps,clsPrefix:this.mergedClsPrefix,showArrow:this.showArrow,maxTagCount:this.maxTagCount,ellipsisTagPopoverProps:this.ellipsisTagPopoverProps,bordered:this.mergedBordered,active:this.activeWithoutMenuOpen||this.mergedShow,pattern:this.pattern,placeholder:this.localizedPlaceholder,selectedOption:this.selectedOption,selectedOptions:this.selectedOptions,multiple:this.multiple,renderTag:this.renderTag,renderLabel:this.renderLabel,filterable:this.filterable,clearable:this.clearable,disabled:this.mergedDisabled,size:this.mergedSize,theme:this.mergedTheme.peers.InternalSelection,labelField:this.labelField,valueField:this.valueField,themeOverrides:this.mergedTheme.peerOverrides.InternalSelection,loading:this.loading,focused:this.focused,onClick:this.handleTriggerClick,onDeleteOption:this.handleDeleteOption,onPatternInput:this.handlePatternInput,onClear:this.handleClear,onBlur:this.handleTriggerBlur,onFocus:this.handleTriggerFocus,onKeydown:this.handleKeydown,onPatternBlur:this.onTriggerInputBlur,onPatternFocus:this.onTriggerInputFocus,onResize:this.handleTriggerOrMenuResize,ignoreComposition:this.ignoreComposition},{arrow:()=>{var e,n;return[(n=(e=this.$slots).arrow)===null||n===void 0?void 0:n.call(e)]}})}),r(Gn,{ref:"followerRef",show:this.mergedShow,to:this.adjustedTo,teleportDisabled:this.adjustedTo===yt.tdkey,containerClass:this.namespace,width:this.consistentMenuWidth?"target":void 0,minWidth:"target",placement:this.placement},{default:()=>r(Ut,{name:"fade-in-scale-up-transition",appear:this.isMounted,onAfterLeave:this.handleMenuAfterLeave},{default:()=>{var e,n,l;return this.mergedShow||this.displayDirective==="show"?((e=this.onRender)===null||e===void 0||e.call(this),uo(r(Fo,Object.assign({},this.menuProps,{ref:"menuRef",onResize:this.handleTriggerOrMenuResize,inlineThemeDisabled:this.inlineThemeDisabled,virtualScroll:this.consistentMenuWidth&&this.virtualScroll,class:[`${this.mergedClsPrefix}-select-menu`,this.themeClass,(n=this.menuProps)===null||n===void 0?void 0:n.class],clsPrefix:this.mergedClsPrefix,focusable:!0,labelField:this.labelField,valueField:this.valueField,autoPending:!0,nodeProps:this.nodeProps,theme:this.mergedTheme.peers.InternalSelectMenu,themeOverrides:this.mergedTheme.peerOverrides.InternalSelectMenu,treeMate:this.treeMate,multiple:this.multiple,size:this.menuSize,renderOption:this.renderOption,renderLabel:this.renderLabel,value:this.mergedValue,style:[(l=this.menuProps)===null||l===void 0?void 0:l.style,this.cssVars],onToggle:this.handleToggle,onScroll:this.handleMenuScroll,onFocus:this.handleMenuFocus,onBlur:this.handleMenuBlur,onKeydown:this.handleMenuKeydown,onTabOut:this.handleMenuTabOut,onMousedown:this.handleMenuMousedown,show:this.mergedShow,showCheckmark:this.showCheckmark,resetMenuOnOptionsChange:this.resetMenuOnOptionsChange,scrollbarProps:this.scrollbarProps}),{empty:()=>{var o,i;return[(i=(o=this.$slots).empty)===null||i===void 0?void 0:i.call(o)]},header:()=>{var o,i;return[(i=(o=this.$slots).header)===null||i===void 0?void 0:i.call(o)]},action:()=>{var o,i;return[(i=(o=this.$slots).action)===null||i===void 0?void 0:i.call(o)]}}),this.displayDirective==="show"?[[co,this.mergedShow],[Ft,this.handleMenuClickOutside,void 0,{capture:!0}]]:[[Ft,this.handleMenuClickOutside,void 0,{capture:!0}]])):null}})})]}))}});function Eo(e){const{primaryColor:n,opacityDisabled:l,borderRadius:o,textColor3:i}=e;return Object.assign(Object.assign({},eo),{iconColor:i,textColor:"white",loadingColor:n,opacityDisabled:l,railColor:"rgba(0, 0, 0, .14)",railColorActive:n,buttonBoxShadow:"0 1px 4px 0 rgba(0, 0, 0, 0.3), inset 0 0 1px 0 rgba(0, 0, 0, 0.05)",buttonColor:"#FFF",railBorderRadiusSmall:o,railBorderRadiusMedium:o,railBorderRadiusLarge:o,buttonBorderRadiusSmall:o,buttonBorderRadiusMedium:o,buttonBorderRadiusLarge:o,boxShadowFocus:`0 0 0 2px ${to(n,{alpha:.2})}`})}const Vo={common:Qn,self:Eo},Ao=E("switch",`
 height: var(--n-height);
 min-width: var(--n-width);
 vertical-align: middle;
 user-select: none;
 -webkit-user-select: none;
 display: inline-flex;
 outline: none;
 justify-content: center;
 align-items: center;
`,[R("children-placeholder",`
 height: var(--n-rail-height);
 display: flex;
 flex-direction: column;
 overflow: hidden;
 pointer-events: none;
 visibility: hidden;
 `),R("rail-placeholder",`
 display: flex;
 flex-wrap: none;
 `),R("button-placeholder",`
 width: calc(1.75 * var(--n-rail-height));
 height: var(--n-rail-height);
 `),E("base-loading",`
 position: absolute;
 top: 50%;
 left: 50%;
 transform: translateX(-50%) translateY(-50%);
 font-size: calc(var(--n-button-width) - 4px);
 color: var(--n-loading-color);
 transition: color .3s var(--n-bezier);
 `,[Ot({left:"50%",top:"50%",originalTransform:"translateX(-50%) translateY(-50%)"})]),R("checked, unchecked",`
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
 box-sizing: border-box;
 position: absolute;
 white-space: nowrap;
 top: 0;
 bottom: 0;
 display: flex;
 align-items: center;
 line-height: 1;
 `),R("checked",`
 right: 0;
 padding-right: calc(1.25 * var(--n-rail-height) - var(--n-offset));
 `),R("unchecked",`
 left: 0;
 justify-content: flex-end;
 padding-left: calc(1.25 * var(--n-rail-height) - var(--n-offset));
 `),fe("&:focus",[R("rail",`
 box-shadow: var(--n-box-shadow-focus);
 `)]),te("round",[R("rail","border-radius: calc(var(--n-rail-height) / 2);",[R("button","border-radius: calc(var(--n-button-height) / 2);")])]),qe("disabled",[qe("icon",[te("rubber-band",[te("pressed",[R("rail",[R("button","max-width: var(--n-button-width-pressed);")])]),R("rail",[fe("&:active",[R("button","max-width: var(--n-button-width-pressed);")])]),te("active",[te("pressed",[R("rail",[R("button","left: calc(100% - var(--n-offset) - var(--n-button-width-pressed));")])]),R("rail",[fe("&:active",[R("button","left: calc(100% - var(--n-offset) - var(--n-button-width-pressed));")])])])])])]),te("active",[R("rail",[R("button","left: calc(100% - var(--n-button-width) - var(--n-offset))")])]),R("rail",`
 overflow: hidden;
 height: var(--n-rail-height);
 min-width: var(--n-rail-width);
 border-radius: var(--n-rail-border-radius);
 cursor: pointer;
 position: relative;
 transition:
 opacity .3s var(--n-bezier),
 background .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 background-color: var(--n-rail-color);
 `,[R("button-icon",`
 color: var(--n-icon-color);
 transition: color .3s var(--n-bezier);
 font-size: calc(var(--n-button-height) - 4px);
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 display: flex;
 justify-content: center;
 align-items: center;
 line-height: 1;
 `,[Ot()]),R("button",`
 align-items: center; 
 top: var(--n-offset);
 left: var(--n-offset);
 height: var(--n-button-height);
 width: var(--n-button-width-pressed);
 max-width: var(--n-button-width);
 border-radius: var(--n-button-border-radius);
 background-color: var(--n-button-color);
 box-shadow: var(--n-button-box-shadow);
 box-sizing: border-box;
 cursor: inherit;
 content: "";
 position: absolute;
 transition:
 background-color .3s var(--n-bezier),
 left .3s var(--n-bezier),
 opacity .3s var(--n-bezier),
 max-width .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 `)]),te("active",[R("rail","background-color: var(--n-rail-color-active);")]),te("loading",[R("rail",`
 cursor: wait;
 `)]),te("disabled",[R("rail",`
 cursor: not-allowed;
 opacity: .5;
 `)])]),Lo=Object.assign(Object.assign({},Ce.props),{size:String,value:{type:[String,Number,Boolean],default:void 0},loading:Boolean,defaultValue:{type:[String,Number,Boolean],default:!1},disabled:{type:Boolean,default:void 0},round:{type:Boolean,default:!0},"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],checkedValue:{type:[String,Number,Boolean],default:!0},uncheckedValue:{type:[String,Number,Boolean],default:!1},railStyle:Function,rubberBand:{type:Boolean,default:!0},spinProps:Object,onChange:[Function,Array]});let Ue;const Et=be({name:"Switch",props:Lo,slots:Object,setup(e){Ue===void 0&&(typeof CSS<"u"?typeof CSS.supports<"u"?Ue=CSS.supports("width","max(1px)"):Ue=!1:Ue=!0);const{mergedClsPrefixRef:n,inlineThemeDisabled:l,mergedComponentPropsRef:o}=Ye(e),i=Ce("Switch","-switch",Ao,Vo,e,n),u=Wt(e,{mergedSize(P){var se,U;if(e.size!==void 0)return e.size;if(P)return P.mergedSize.value;const ee=(U=(se=o==null?void 0:o.value)===null||se===void 0?void 0:se.Switch)===null||U===void 0?void 0:U.size;return ee||"medium"}}),{mergedSizeRef:f,mergedDisabledRef:a}=u,S=k(e.defaultValue),p=ae(e,"value"),w=xt(p,S),y=I(()=>w.value===e.checkedValue),x=k(!1),z=k(!1),m=I(()=>{const{railStyle:P}=e;if(P)return P({focused:z.value,checked:y.value})});function _(P){const{"onUpdate:value":se,onChange:U,onUpdateValue:ee}=e,{nTriggerFormInput:c,nTriggerFormChange:C}=u;se&&ge(se,P),ee&&ge(ee,P),U&&ge(U,P),S.value=P,c(),C()}function A(){const{nTriggerFormFocus:P}=u;P()}function v(){const{nTriggerFormBlur:P}=u;P()}function F(){e.loading||a.value||(w.value!==e.checkedValue?_(e.checkedValue):_(e.uncheckedValue))}function G(){z.value=!0,A()}function ne(){z.value=!1,v(),x.value=!1}function q(P){e.loading||a.value||P.key===" "&&(w.value!==e.checkedValue?_(e.checkedValue):_(e.uncheckedValue),x.value=!1)}function H(P){e.loading||a.value||P.key===" "&&(P.preventDefault(),x.value=!0)}const de=I(()=>{const{value:P}=f,{self:{opacityDisabled:se,railColor:U,railColorActive:ee,buttonBoxShadow:c,buttonColor:C,boxShadowFocus:V,loadingColor:L,textColor:j,iconColor:Z,[ue("buttonHeight",P)]:$,[ue("buttonWidth",P)]:Y,[ue("buttonWidthPressed",P)]:J,[ue("railHeight",P)]:X,[ue("railWidth",P)]:ie,[ue("railBorderRadius",P)]:s,[ue("buttonBorderRadius",P)]:g},common:{cubicBezierEaseInOut:Q}}=i.value;let ce,we,he;return Ue?(ce=`calc((${X} - ${$}) / 2)`,we=`max(${X}, ${$})`,he=`max(${ie}, calc(${ie} + ${$} - ${X}))`):(ce=Fe((pe(X)-pe($))/2),we=Fe(Math.max(pe(X),pe($))),he=pe(X)>pe($)?ie:Fe(pe(ie)+pe($)-pe(X))),{"--n-bezier":Q,"--n-button-border-radius":g,"--n-button-box-shadow":c,"--n-button-color":C,"--n-button-width":Y,"--n-button-width-pressed":J,"--n-button-height":$,"--n-height":we,"--n-offset":ce,"--n-opacity-disabled":se,"--n-rail-border-radius":s,"--n-rail-color":U,"--n-rail-color-active":ee,"--n-rail-height":X,"--n-rail-width":ie,"--n-width":he,"--n-box-shadow-focus":V,"--n-loading-color":L,"--n-text-color":j,"--n-icon-color":Z}}),oe=l?Je("switch",I(()=>f.value[0]),de,e):void 0;return{handleClick:F,handleBlur:ne,handleFocus:G,handleKeyup:q,handleKeydown:H,mergedRailStyle:m,pressed:x,mergedClsPrefix:n,mergedValue:w,checked:y,mergedDisabled:a,cssVars:l?void 0:de,themeClass:oe==null?void 0:oe.themeClass,onRender:oe==null?void 0:oe.onRender}},render(){const{mergedClsPrefix:e,mergedDisabled:n,checked:l,mergedRailStyle:o,onRender:i,$slots:u}=this;i==null||i();const{checked:f,unchecked:a,icon:S,"checked-icon":p,"unchecked-icon":w}=u,y=!(vt(S)&&vt(p)&&vt(w));return r("div",{role:"switch","aria-checked":l,class:[`${e}-switch`,this.themeClass,y&&`${e}-switch--icon`,l&&`${e}-switch--active`,n&&`${e}-switch--disabled`,this.round&&`${e}-switch--round`,this.loading&&`${e}-switch--loading`,this.pressed&&`${e}-switch--pressed`,this.rubberBand&&`${e}-switch--rubber-band`],tabindex:this.mergedDisabled?void 0:0,style:this.cssVars,onClick:this.handleClick,onFocus:this.handleFocus,onBlur:this.handleBlur,onKeyup:this.handleKeyup,onKeydown:this.handleKeydown},r("div",{class:`${e}-switch__rail`,"aria-hidden":"true",style:o},Re(f,x=>Re(a,z=>x||z?r("div",{"aria-hidden":!0,class:`${e}-switch__children-placeholder`},r("div",{class:`${e}-switch__rail-placeholder`},r("div",{class:`${e}-switch__button-placeholder`}),x),r("div",{class:`${e}-switch__rail-placeholder`},r("div",{class:`${e}-switch__button-placeholder`}),z)):null)),r("div",{class:`${e}-switch__button`},Re(S,x=>Re(p,z=>Re(w,m=>r(no,null,{default:()=>this.loading?r(Dt,Object.assign({key:"loading",clsPrefix:e,strokeWidth:20},this.spinProps)):this.checked&&(z||x)?r("div",{class:`${e}-switch__button-icon`,key:z?"checked-icon":"icon"},z||x):!this.checked&&(m||x)?r("div",{class:`${e}-switch__button-icon`,key:m?"unchecked-icon":"icon"},m||x):null})))),Re(f,x=>x&&r("div",{key:"checked",class:`${e}-switch__checked`},x)),Re(a,x=>x&&r("div",{key:"unchecked",class:`${e}-switch__unchecked`},x)))))}}),Uo=be({__name:"Utility",setup(e){const n=k(""),l=()=>{n.value=In()},o=k(16),i=k(["uppercase","lowercase","number"]),u=k(!1),f=k(!1),a=k(""),S=[{label:"Uppercase (A-Z)",value:"uppercase"},{label:"Lowercase (a-z)",value:"lowercase"},{label:"Number (0-9)",value:"number"},{label:"Special (!@#$...)",value:"special"}],p=I(()=>{const A=[];return A.push(`length: ${o.value}`),i.value.length===1?A.push(`charTypes: '${i.value[0]}'`):(i.value.length<3||i.value.includes("special"))&&A.push(`charTypes: ['${i.value.join("', '")}']`),u.value&&A.push("noConfuse: true"),f.value&&A.push("strict: true"),A.length===1&&!u.value&&!f.value&&i.value.length===3?`randomString(${o.value})`:`randomString({
  ${A.join(`,
  `)}
})`}),w=()=>{a.value=Mn({length:o.value,charTypes:i.value.length>0?i.value:void 0,noConfuse:u.value,strict:f.value})},y=k(zt()-1),x=()=>{y.value=zt()},z=k("document.pdf"),m=k(!1),_=k({inBrowser:!1,inNodeJs:!1});return Xe(()=>{_.value={inBrowser:Rn,inNodeJs:Sn},m.value=zn()}),(A,v)=>(bt(),fo("div",null,[D(W(kn),null,{default:K(()=>[...v[5]||(v[5]=[Se("Utility",-1)])]),_:1}),v[17]||(v[17]=Te("p",{style:{color:"#666","margin-bottom":"24px"}},"General utility functions",-1)),D(Ee,{title:"uuid",description:"Generate UUID",result:n.value||"Click to generate",code:"uuid() // '550e8400-e29b-41d4-a716-446655440000'"},{input:K(()=>[D(W(gt),{size:"small",onClick:l},{default:K(()=>[...v[6]||(v[6]=[Se("Generate UUID",-1)])]),_:1})]),_:1},8,["result"]),D(Ee,{title:"randomString",description:"Generate random string with various options",code:`randomString() // default 32 chars
randomString(16) // 16 chars
randomString({ length: 6, charTypes: 'number' }) // '847291'
randomString({ length: 16, noConfuse: true }) // exclude confusing chars
randomString({ length: 16, strict: true }) // must include all char types`},{input:K(()=>[D(W(xe),{vertical:""},{default:K(()=>[D(W(xe),{align:"center",wrap:!0},{default:K(()=>[v[7]||(v[7]=Te("span",{style:{color:"#999","font-size":"12px"}},"length:",-1)),D(W(ho),{value:o.value,"onUpdate:value":v[0]||(v[0]=F=>o.value=F),style:{width:"80px"},min:1,max:128},null,8,["value"])]),_:1}),D(W(xe),{align:"center",wrap:!0},{default:K(()=>[v[8]||(v[8]=Te("span",{style:{color:"#999","font-size":"12px"}},"charTypes:",-1)),D(W(No),{value:i.value,"onUpdate:value":v[1]||(v[1]=F=>i.value=F),options:S,multiple:"",style:{width:"280px"},"max-tag-count":2},null,8,["value"])]),_:1}),D(W(xe),{align:"center",wrap:!0},{default:K(()=>[v[9]||(v[9]=Te("span",{style:{color:"#999","font-size":"12px"}},"noConfuse:",-1)),D(W(Et),{value:u.value,"onUpdate:value":v[2]||(v[2]=F=>u.value=F),size:"small"},null,8,["value"]),v[10]||(v[10]=Te("span",{style:{color:"#999","font-size":"12px","margin-left":"12px"}},"strict:",-1)),D(W(Et),{value:f.value,"onUpdate:value":v[3]||(v[3]=F=>f.value=F),size:"small"},null,8,["value"])]),_:1}),D(W(xe),{align:"center"},{default:K(()=>[D(W(gt),{size:"small",type:"primary",onClick:w},{default:K(()=>[...v[11]||(v[11]=[Se("Generate",-1)])]),_:1})]),_:1})]),_:1})]),result:K(()=>[a.value?(bt(),It(W(xe),{key:0,vertical:""},{default:K(()=>[D(W(Tn),{code:p.value,language:"javascript"},null,8,["code"]),D(W(Oe),{type:"info",style:{"font-family":"monospace","font-size":"13px"}},{default:K(()=>[Se(lt(a.value),1)]),_:1})]),_:1})):(bt(),It(W(Oe),{key:1,type:"default"},{default:K(()=>[...v[12]||(v[12]=[Se("Click Generate to see result",-1)])]),_:1}))]),_:1}),D(Ee,{title:"nextIndex",description:"Get next z-index (starting from 1000)",result:y.value,code:`nextIndex() // 1001
nextIndex() // 1002`},{input:K(()=>[D(W(gt),{size:"small",onClick:x},{default:K(()=>[...v[13]||(v[13]=[Se("Get Next Index",-1)])]),_:1})]),_:1},8,["result"]),D(Ee,{title:"getFileType",description:"Detect file type from extension",result:W(Fn)(z.value),code:`getFileType('document.pdf') // 'pdf'
getFileType('image.png') // 'image'`},{input:K(()=>[D(W(oo),{value:z.value,"onUpdate:value":v[4]||(v[4]=F=>z.value=F),style:{width:"200px"}},null,8,["value"])]),_:1},8,["result"]),D(Ee,{title:"fingerprint",description:"Generate browser fingerprint",result:W(On)(),code:"fingerprint() // 'wc7sWJJA8'"},null,8,["result"]),D(Ee,{title:"Environment Detection",description:"Check runtime environment",code:`inBrowser // true in browser
inNodeJs // true in Node.js
isDarkMode() // true if dark mode`},{result:K(()=>[D(W(xe),{vertical:""},{default:K(()=>[D(W(xe),{align:"center"},{default:K(()=>[v[14]||(v[14]=Te("code",{class:"code-inline"},"inBrowser",-1)),D(W(Oe),{size:"small",bordered:!1},{default:K(()=>[Se(lt(_.value.inBrowser),1)]),_:1})]),_:1}),D(W(xe),{align:"center"},{default:K(()=>[v[15]||(v[15]=Te("code",{class:"code-inline"},"inNodeJs",-1)),D(W(Oe),{size:"small",bordered:!1},{default:K(()=>[Se(lt(_.value.inNodeJs),1)]),_:1})]),_:1}),D(W(xe),{align:"center"},{default:K(()=>[v[16]||(v[16]=Te("code",{class:"code-inline"},"isDarkMode()",-1)),D(W(Oe),{size:"small",bordered:!1},{default:K(()=>[Se(lt(m.value),1)]),_:1})]),_:1})]),_:1})]),_:1})]))}});export{Uo as default};
