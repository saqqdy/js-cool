import{_ as F,N as p}from"./FunctionCard.vue_vue_type_script_setup_true_lang-DEr3P01c.js";import{N as At,bk as He,bl as Lt,bm as Dt,bn as Et,bo as Ht,bp as It,bq as Nt,br as Vt,bs as Mt,bt as te,bu as Ft,bv as Jt,bw as Gt,bx as ye,by as we,bz as J}from"./index-3_y0cKVw.js";import{aw as Qt,ax as Xt,ay as Ie,az as qt,aA as he,aB as Kt,e as Yt,C as Zt,m as ea,aC as ta,au as aa,h as i,G as v,g as U,K as N,l as ra,am as Se,a2 as Ne,al as ze,n as sa,f as qe,aD as na,p as oa,aE as la,s as ia,aF as Ve,aG as da,I as Y,av as be,w as pe,N as C,a as Q,u as ca,X as ua}from"./index-CjE88-X8.js";import{k as de,m as x,r as O,i as Ke,z as fa,F as Oe,c as G,w as Ce,o as ba,v as pa,l as va,A as ha,y as ma,B as ga,n as _e,p as xa,t as Z,H as Te,P as a,O as r,Q as e,I as u,R as c,G as ve,j as S,X as Me,N as ya}from"./vue-vendor-BrQLXg1A.js";import{A as wa}from"./Add-CZHZ8rRD.js";const Sa=Ie(".v-x-scroll",{overflow:"auto",scrollbarWidth:"none"},[Ie("&::-webkit-scrollbar",{width:0,height:0})]),za=de({name:"XScroll",props:{disabled:Boolean,onScroll:Function},setup(){const t=O(null);function l(b){!(b.currentTarget.offsetWidth<b.currentTarget.scrollWidth)||b.deltaY===0||(b.currentTarget.scrollLeft+=b.deltaY+b.deltaX,b.preventDefault())}const f=Qt();return Sa.mount({id:"vueuc/x-scroll",head:!0,anchorMetaName:Xt,ssr:f}),Object.assign({selfRef:t,handleWheel:l},{scrollTo(...b){var T;(T=t.value)===null||T===void 0||T.scrollTo(...b)}})},render(){return x("div",{ref:"selfRef",onScroll:this.onScroll,onWheel:this.disabled?void 0:this.handleWheel,class:"v-x-scroll"},this.$slots)}});function Ca(t,l=[],f){const _={};return Object.getOwnPropertyNames(t).forEach(T=>{l.includes(T)||(_[T]=t[T])}),Object.assign(_,f)}var _a=/\s/;function Ta(t){for(var l=t.length;l--&&_a.test(t.charAt(l)););return l}var Ra=/^\s+/;function Pa(t){return t&&t.slice(0,Ta(t)+1).replace(Ra,"")}var Fe=NaN,ka=/^[-+]0x[0-9a-f]+$/i,Oa=/^0b[01]+$/i,$a=/^0o[0-7]+$/i,ja=parseInt;function Je(t){if(typeof t=="number")return t;if(qt(t))return Fe;if(he(t)){var l=typeof t.valueOf=="function"?t.valueOf():t;t=he(l)?l+"":l}if(typeof t!="string")return t===0?t:+t;t=Pa(t);var f=Oa.test(t);return f||$a.test(t)?ja(t.slice(2),f?2:8):ka.test(t)?Fe:+t}var Re=function(){return Kt.Date.now()},Ba="Expected a function",Wa=Math.max,Ua=Math.min;function Aa(t,l,f){var _,b,T,R,y,k,W=0,w=!1,B=!1,E=!0;if(typeof t!="function")throw new TypeError(Ba);l=Je(l)||0,he(f)&&(w=!!f.leading,B="maxWait"in f,T=B?Wa(Je(f.maxWait)||0,l):T,E="trailing"in f?!!f.trailing:E);function $(h){var I=_,M=b;return _=b=void 0,W=h,R=t.apply(M,I),R}function z(h){return W=h,y=setTimeout(H,l),w?$(h):R}function j(h){var I=h-k,M=h-W,s=l-I;return B?Ua(s,T-M):s}function D(h){var I=h-k,M=h-W;return k===void 0||I>=l||I<0||B&&M>=T}function H(){var h=Re();if(D(h))return A(h);y=setTimeout(H,j(h))}function A(h){return y=void 0,E&&_?$(h):(_=b=void 0,R)}function X(){y!==void 0&&clearTimeout(y),W=0,_=k=b=y=void 0}function V(){return y===void 0?R:A(Re())}function P(){var h=Re(),I=D(h);if(_=arguments,b=this,k=h,I){if(y===void 0)return z(k);if(B)return clearTimeout(y),y=setTimeout(H,l),$(k)}return y===void 0&&(y=setTimeout(H,l)),R}return P.cancel=X,P.flush=V,P}var La="Expected a function";function Da(t,l,f){var _=!0,b=!0;if(typeof t!="function")throw new TypeError(La);return he(f)&&(_="leading"in f?!!f.leading:_,b="trailing"in f?!!f.trailing:b),Aa(t,l,{leading:_,maxWait:l,trailing:b})}const je=Yt("n-tabs"),Ye={tab:[String,Number,Object,Function],name:{type:[String,Number],required:!0},disabled:Boolean,displayDirective:{type:String,default:"if"},closable:{type:Boolean,default:void 0},tabProps:Object,label:[String,Number,Object,Function]},ae=de({__TAB_PANE__:!0,name:"TabPane",alias:["TabPanel"],props:Ye,slots:Object,setup(t){const l=Ke(je,null);return l||Zt("tab-pane","`n-tab-pane` must be placed inside `n-tabs`."),{style:l.paneStyleRef,class:l.paneClassRef,mergedClsPrefix:l.mergedClsPrefixRef}},render(){return x("div",{class:[`${this.mergedClsPrefix}-tab-pane`,this.class],style:this.style},this.$slots)}}),Ea=Object.assign({internalLeftPadded:Boolean,internalAddable:Boolean,internalCreatedByPane:Boolean},Ca(Ye,["displayDirective"])),$e=de({__TAB__:!0,inheritAttrs:!1,name:"Tab",props:Ea,setup(t){const{mergedClsPrefixRef:l,valueRef:f,typeRef:_,closableRef:b,tabStyleRef:T,addTabStyleRef:R,tabClassRef:y,addTabClassRef:k,tabChangeIdRef:W,onBeforeLeaveRef:w,triggerRef:B,handleAdd:E,activateTab:$,handleClose:z}=Ke(je);return{trigger:B,mergedClosable:G(()=>{if(t.internalAddable)return!1;const{closable:j}=t;return j===void 0?b.value:j}),style:T,addStyle:R,tabClass:y,addTabClass:k,clsPrefix:l,value:f,type:_,handleClose(j){j.stopPropagation(),!t.disabled&&z(t.name)},activateTab(){if(t.disabled)return;if(t.internalAddable){E();return}const{name:j}=t,D=++W.id;if(j!==f.value){const{value:H}=w;H?Promise.resolve(H(t.name,f.value)).then(A=>{A&&W.id===D&&$(j)}):$(j)}}}},render(){const{internalAddable:t,clsPrefix:l,name:f,disabled:_,label:b,tab:T,value:R,mergedClosable:y,trigger:k,$slots:{default:W}}=this,w=b??T;return x("div",{class:`${l}-tabs-tab-wrapper`},this.internalLeftPadded?x("div",{class:`${l}-tabs-tab-pad`}):null,x("div",Object.assign({key:f,"data-name":f,"data-disabled":_?!0:void 0},fa({class:[`${l}-tabs-tab`,R===f&&`${l}-tabs-tab--active`,_&&`${l}-tabs-tab--disabled`,y&&`${l}-tabs-tab--closable`,t&&`${l}-tabs-tab--addable`,t?this.addTabClass:this.tabClass],onClick:k==="click"?this.activateTab:void 0,onMouseenter:k==="hover"?this.activateTab:void 0,style:t?this.addStyle:this.style},this.internalCreatedByPane?this.tabProps||{}:this.$attrs)),x("span",{class:`${l}-tabs-tab__label`},t?x(Oe,null,x("div",{class:`${l}-tabs-tab__height-placeholder`}," "),x(ea,{clsPrefix:l},{default:()=>x(wa,null)})):W?W():typeof w=="object"?w:ta(w??f)),y&&this.type==="card"?x(aa,{clsPrefix:l,class:`${l}-tabs-tab__close`,onClick:this.handleClose,disabled:_}):null))}}),Ha=i("tabs",`
 box-sizing: border-box;
 width: 100%;
 display: flex;
 flex-direction: column;
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
`,[v("segment-type",[i("tabs-rail",[U("&.transition-disabled",[i("tabs-capsule",`
 transition: none;
 `)])])]),v("top",[i("tab-pane",`
 padding: var(--n-pane-padding-top) var(--n-pane-padding-right) var(--n-pane-padding-bottom) var(--n-pane-padding-left);
 `)]),v("left",[i("tab-pane",`
 padding: var(--n-pane-padding-right) var(--n-pane-padding-bottom) var(--n-pane-padding-left) var(--n-pane-padding-top);
 `)]),v("left, right",`
 flex-direction: row;
 `,[i("tabs-bar",`
 width: 2px;
 right: 0;
 transition:
 top .2s var(--n-bezier),
 max-height .2s var(--n-bezier),
 background-color .3s var(--n-bezier);
 `),i("tabs-tab",`
 padding: var(--n-tab-padding-vertical); 
 `)]),v("right",`
 flex-direction: row-reverse;
 `,[i("tab-pane",`
 padding: var(--n-pane-padding-left) var(--n-pane-padding-top) var(--n-pane-padding-right) var(--n-pane-padding-bottom);
 `),i("tabs-bar",`
 left: 0;
 `)]),v("bottom",`
 flex-direction: column-reverse;
 justify-content: flex-end;
 `,[i("tab-pane",`
 padding: var(--n-pane-padding-bottom) var(--n-pane-padding-right) var(--n-pane-padding-top) var(--n-pane-padding-left);
 `),i("tabs-bar",`
 top: 0;
 `)]),i("tabs-rail",`
 position: relative;
 padding: 3px;
 border-radius: var(--n-tab-border-radius);
 width: 100%;
 background-color: var(--n-color-segment);
 transition: background-color .3s var(--n-bezier);
 display: flex;
 align-items: center;
 `,[i("tabs-capsule",`
 border-radius: var(--n-tab-border-radius);
 position: absolute;
 pointer-events: none;
 background-color: var(--n-tab-color-segment);
 box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .08);
 transition: transform 0.3s var(--n-bezier);
 `),i("tabs-tab-wrapper",`
 flex-basis: 0;
 flex-grow: 1;
 display: flex;
 align-items: center;
 justify-content: center;
 `,[i("tabs-tab",`
 overflow: hidden;
 border-radius: var(--n-tab-border-radius);
 width: 100%;
 display: flex;
 align-items: center;
 justify-content: center;
 `,[v("active",`
 font-weight: var(--n-font-weight-strong);
 color: var(--n-tab-text-color-active);
 `),U("&:hover",`
 color: var(--n-tab-text-color-hover);
 `)])])]),v("flex",[i("tabs-nav",`
 width: 100%;
 position: relative;
 `,[i("tabs-wrapper",`
 width: 100%;
 `,[i("tabs-tab",`
 margin-right: 0;
 `)])])]),i("tabs-nav",`
 box-sizing: border-box;
 line-height: 1.5;
 display: flex;
 transition: border-color .3s var(--n-bezier);
 `,[N("prefix, suffix",`
 display: flex;
 align-items: center;
 `),N("prefix","padding-right: 16px;"),N("suffix","padding-left: 16px;")]),v("top, bottom",[U(">",[i("tabs-nav",[i("tabs-nav-scroll-wrapper",[U("&::before",`
 top: 0;
 bottom: 0;
 left: 0;
 width: 20px;
 `),U("&::after",`
 top: 0;
 bottom: 0;
 right: 0;
 width: 20px;
 `),v("shadow-start",[U("&::before",`
 box-shadow: inset 10px 0 8px -8px rgba(0, 0, 0, .12);
 `)]),v("shadow-end",[U("&::after",`
 box-shadow: inset -10px 0 8px -8px rgba(0, 0, 0, .12);
 `)])])])])]),v("left, right",[i("tabs-nav-scroll-content",`
 flex-direction: column;
 `),U(">",[i("tabs-nav",[i("tabs-nav-scroll-wrapper",[U("&::before",`
 top: 0;
 left: 0;
 right: 0;
 height: 20px;
 `),U("&::after",`
 bottom: 0;
 left: 0;
 right: 0;
 height: 20px;
 `),v("shadow-start",[U("&::before",`
 box-shadow: inset 0 10px 8px -8px rgba(0, 0, 0, .12);
 `)]),v("shadow-end",[U("&::after",`
 box-shadow: inset 0 -10px 8px -8px rgba(0, 0, 0, .12);
 `)])])])])]),i("tabs-nav-scroll-wrapper",`
 flex: 1;
 position: relative;
 overflow: hidden;
 `,[i("tabs-nav-y-scroll",`
 height: 100%;
 width: 100%;
 overflow-y: auto; 
 scrollbar-width: none;
 `,[U("&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb",`
 width: 0;
 height: 0;
 display: none;
 `)]),U("&::before, &::after",`
 transition: box-shadow .3s var(--n-bezier);
 pointer-events: none;
 content: "";
 position: absolute;
 z-index: 1;
 `)]),i("tabs-nav-scroll-content",`
 display: flex;
 position: relative;
 min-width: 100%;
 min-height: 100%;
 width: fit-content;
 box-sizing: border-box;
 `),i("tabs-wrapper",`
 display: inline-flex;
 flex-wrap: nowrap;
 position: relative;
 `),i("tabs-tab-wrapper",`
 display: flex;
 flex-wrap: nowrap;
 flex-shrink: 0;
 flex-grow: 0;
 `),i("tabs-tab",`
 cursor: pointer;
 white-space: nowrap;
 flex-wrap: nowrap;
 display: inline-flex;
 align-items: center;
 color: var(--n-tab-text-color);
 font-size: var(--n-tab-font-size);
 background-clip: padding-box;
 padding: var(--n-tab-padding);
 transition:
 box-shadow .3s var(--n-bezier),
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `,[v("disabled",{cursor:"not-allowed"}),N("close",`
 margin-left: 6px;
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `),N("label",`
 display: flex;
 align-items: center;
 z-index: 1;
 `)]),i("tabs-bar",`
 position: absolute;
 bottom: 0;
 height: 2px;
 border-radius: 1px;
 background-color: var(--n-bar-color);
 transition:
 left .2s var(--n-bezier),
 max-width .2s var(--n-bezier),
 opacity .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 `,[U("&.transition-disabled",`
 transition: none;
 `),v("disabled",`
 background-color: var(--n-tab-text-color-disabled)
 `)]),i("tabs-pane-wrapper",`
 position: relative;
 overflow: hidden;
 transition: max-height .2s var(--n-bezier);
 `),i("tab-pane",`
 color: var(--n-pane-text-color);
 width: 100%;
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 opacity .2s var(--n-bezier);
 left: 0;
 right: 0;
 top: 0;
 `,[U("&.next-transition-leave-active, &.prev-transition-leave-active, &.next-transition-enter-active, &.prev-transition-enter-active",`
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 transform .2s var(--n-bezier),
 opacity .2s var(--n-bezier);
 `),U("&.next-transition-leave-active, &.prev-transition-leave-active",`
 position: absolute;
 `),U("&.next-transition-enter-from, &.prev-transition-leave-to",`
 transform: translateX(32px);
 opacity: 0;
 `),U("&.next-transition-leave-to, &.prev-transition-enter-from",`
 transform: translateX(-32px);
 opacity: 0;
 `),U("&.next-transition-leave-from, &.next-transition-enter-to, &.prev-transition-leave-from, &.prev-transition-enter-to",`
 transform: translateX(0);
 opacity: 1;
 `)]),i("tabs-tab-pad",`
 box-sizing: border-box;
 width: var(--n-tab-gap);
 flex-grow: 0;
 flex-shrink: 0;
 `),v("line-type, bar-type",[i("tabs-tab",`
 font-weight: var(--n-tab-font-weight);
 box-sizing: border-box;
 vertical-align: bottom;
 `,[U("&:hover",{color:"var(--n-tab-text-color-hover)"}),v("active",`
 color: var(--n-tab-text-color-active);
 font-weight: var(--n-tab-font-weight-active);
 `),v("disabled",{color:"var(--n-tab-text-color-disabled)"})])]),i("tabs-nav",[v("line-type",[v("top",[N("prefix, suffix",`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),i("tabs-nav-scroll-content",`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),i("tabs-bar",`
 bottom: -1px;
 `)]),v("left",[N("prefix, suffix",`
 border-right: 1px solid var(--n-tab-border-color);
 `),i("tabs-nav-scroll-content",`
 border-right: 1px solid var(--n-tab-border-color);
 `),i("tabs-bar",`
 right: -1px;
 `)]),v("right",[N("prefix, suffix",`
 border-left: 1px solid var(--n-tab-border-color);
 `),i("tabs-nav-scroll-content",`
 border-left: 1px solid var(--n-tab-border-color);
 `),i("tabs-bar",`
 left: -1px;
 `)]),v("bottom",[N("prefix, suffix",`
 border-top: 1px solid var(--n-tab-border-color);
 `),i("tabs-nav-scroll-content",`
 border-top: 1px solid var(--n-tab-border-color);
 `),i("tabs-bar",`
 top: -1px;
 `)]),N("prefix, suffix",`
 transition: border-color .3s var(--n-bezier);
 `),i("tabs-nav-scroll-content",`
 transition: border-color .3s var(--n-bezier);
 `),i("tabs-bar",`
 border-radius: 0;
 `)]),v("card-type",[N("prefix, suffix",`
 transition: border-color .3s var(--n-bezier);
 `),i("tabs-pad",`
 flex-grow: 1;
 transition: border-color .3s var(--n-bezier);
 `),i("tabs-tab-pad",`
 transition: border-color .3s var(--n-bezier);
 `),i("tabs-tab",`
 font-weight: var(--n-tab-font-weight);
 border: 1px solid var(--n-tab-border-color);
 background-color: var(--n-tab-color);
 box-sizing: border-box;
 position: relative;
 vertical-align: bottom;
 display: flex;
 justify-content: space-between;
 font-size: var(--n-tab-font-size);
 color: var(--n-tab-text-color);
 `,[v("addable",`
 padding-left: 8px;
 padding-right: 8px;
 font-size: 16px;
 justify-content: center;
 `,[N("height-placeholder",`
 width: 0;
 font-size: var(--n-tab-font-size);
 `),ra("disabled",[U("&:hover",`
 color: var(--n-tab-text-color-hover);
 `)])]),v("closable","padding-right: 8px;"),v("active",`
 background-color: #0000;
 font-weight: var(--n-tab-font-weight-active);
 color: var(--n-tab-text-color-active);
 `),v("disabled","color: var(--n-tab-text-color-disabled);")])]),v("left, right",`
 flex-direction: column; 
 `,[N("prefix, suffix",`
 padding: var(--n-tab-padding-vertical);
 `),i("tabs-wrapper",`
 flex-direction: column;
 `),i("tabs-tab-wrapper",`
 flex-direction: column;
 `,[i("tabs-tab-pad",`
 height: var(--n-tab-gap-vertical);
 width: 100%;
 `)])]),v("top",[v("card-type",[i("tabs-scroll-padding","border-bottom: 1px solid var(--n-tab-border-color);"),N("prefix, suffix",`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),i("tabs-tab",`
 border-top-left-radius: var(--n-tab-border-radius);
 border-top-right-radius: var(--n-tab-border-radius);
 `,[v("active",`
 border-bottom: 1px solid #0000;
 `)]),i("tabs-tab-pad",`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),i("tabs-pad",`
 border-bottom: 1px solid var(--n-tab-border-color);
 `)])]),v("left",[v("card-type",[i("tabs-scroll-padding","border-right: 1px solid var(--n-tab-border-color);"),N("prefix, suffix",`
 border-right: 1px solid var(--n-tab-border-color);
 `),i("tabs-tab",`
 border-top-left-radius: var(--n-tab-border-radius);
 border-bottom-left-radius: var(--n-tab-border-radius);
 `,[v("active",`
 border-right: 1px solid #0000;
 `)]),i("tabs-tab-pad",`
 border-right: 1px solid var(--n-tab-border-color);
 `),i("tabs-pad",`
 border-right: 1px solid var(--n-tab-border-color);
 `)])]),v("right",[v("card-type",[i("tabs-scroll-padding","border-left: 1px solid var(--n-tab-border-color);"),N("prefix, suffix",`
 border-left: 1px solid var(--n-tab-border-color);
 `),i("tabs-tab",`
 border-top-right-radius: var(--n-tab-border-radius);
 border-bottom-right-radius: var(--n-tab-border-radius);
 `,[v("active",`
 border-left: 1px solid #0000;
 `)]),i("tabs-tab-pad",`
 border-left: 1px solid var(--n-tab-border-color);
 `),i("tabs-pad",`
 border-left: 1px solid var(--n-tab-border-color);
 `)])]),v("bottom",[v("card-type",[i("tabs-scroll-padding","border-top: 1px solid var(--n-tab-border-color);"),N("prefix, suffix",`
 border-top: 1px solid var(--n-tab-border-color);
 `),i("tabs-tab",`
 border-bottom-left-radius: var(--n-tab-border-radius);
 border-bottom-right-radius: var(--n-tab-border-radius);
 `,[v("active",`
 border-top: 1px solid #0000;
 `)]),i("tabs-tab-pad",`
 border-top: 1px solid var(--n-tab-border-color);
 `),i("tabs-pad",`
 border-top: 1px solid var(--n-tab-border-color);
 `)])])])]),Pe=Da,Ia=Object.assign(Object.assign({},qe.props),{value:[String,Number],defaultValue:[String,Number],trigger:{type:String,default:"click"},type:{type:String,default:"bar"},closable:Boolean,justifyContent:String,size:String,placement:{type:String,default:"top"},tabStyle:[String,Object],tabClass:String,addTabStyle:[String,Object],addTabClass:String,barWidth:Number,paneClass:String,paneStyle:[String,Object],paneWrapperClass:String,paneWrapperStyle:[String,Object],addable:[Boolean,Object],tabsPadding:{type:Number,default:0},animated:Boolean,onBeforeLeave:Function,onAdd:Function,"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],onClose:[Function,Array],labelSize:String,activeName:[String,Number],onActiveNameChange:[Function,Array]}),Na=de({name:"Tabs",props:Ia,slots:Object,setup(t,{slots:l}){var f,_,b,T;const{mergedClsPrefixRef:R,inlineThemeDisabled:y,mergedComponentPropsRef:k}=sa(t),W=qe("Tabs","-tabs",Ha,na,t,R),w=O(null),B=O(null),E=O(null),$=O(null),z=O(null),j=O(null),D=O(!0),H=O(!0),A=Ve(t,["labelSize","size"]),X=G(()=>{var n,o;if(A.value)return A.value;const d=(o=(n=k==null?void 0:k.value)===null||n===void 0?void 0:n.Tabs)===null||o===void 0?void 0:o.size;return d||"medium"}),V=Ve(t,["activeName","value"]),P=O((_=(f=V.value)!==null&&f!==void 0?f:t.defaultValue)!==null&&_!==void 0?_:l.default?(T=(b=Se(l.default())[0])===null||b===void 0?void 0:b.props)===null||T===void 0?void 0:T.name:null),h=oa(V,P),I={id:0},M=G(()=>{if(!(!t.justifyContent||t.type==="card"))return{display:"flex",justifyContent:t.justifyContent}});Ce(h,()=>{I.id=0,ce(),We()});function s(){var n;const{value:o}=h;return o===null?null:(n=w.value)===null||n===void 0?void 0:n.querySelector(`[data-name="${o}"]`)}function g(n){if(t.type==="card")return;const{value:o}=B;if(!o)return;const d=o.style.opacity==="0";if(n){const m=`${R.value}-tabs-bar--disabled`,{barWidth:L,placement:q}=t;if(n.dataset.disabled==="true"?o.classList.add(m):o.classList.remove(m),["top","bottom"].includes(q)){if(Be(["top","maxHeight","height"]),typeof L=="number"&&n.offsetWidth>=L){const K=Math.floor((n.offsetWidth-L)/2)+n.offsetLeft;o.style.left=`${K}px`,o.style.maxWidth=`${L}px`}else o.style.left=`${n.offsetLeft}px`,o.style.maxWidth=`${n.offsetWidth}px`;o.style.width="8192px",d&&(o.style.transition="none"),o.offsetWidth,d&&(o.style.transition="",o.style.opacity="1")}else{if(Be(["left","maxWidth","width"]),typeof L=="number"&&n.offsetHeight>=L){const K=Math.floor((n.offsetHeight-L)/2)+n.offsetTop;o.style.top=`${K}px`,o.style.maxHeight=`${L}px`}else o.style.top=`${n.offsetTop}px`,o.style.maxHeight=`${n.offsetHeight}px`;o.style.height="8192px",d&&(o.style.transition="none"),o.offsetHeight,d&&(o.style.transition="",o.style.opacity="1")}}}function le(){if(t.type==="card")return;const{value:n}=B;n&&(n.style.opacity="0")}function Be(n){const{value:o}=B;if(o)for(const d of n)o.style[d]=""}function ce(){if(t.type==="card")return;const n=s();n?g(n):le()}function We(){var n;const o=(n=z.value)===null||n===void 0?void 0:n.$el;if(!o)return;const d=s();if(!d)return;const{scrollLeft:m,offsetWidth:L}=o,{offsetLeft:q,offsetWidth:K}=d;m>q?o.scrollTo({top:0,left:q,behavior:"smooth"}):q+K>m+L&&o.scrollTo({top:0,left:q+K-L,behavior:"smooth"})}const ue=O(null);let me=0,ee=null;function Ze(n){const o=ue.value;if(o){me=n.getBoundingClientRect().height;const d=`${me}px`,m=()=>{o.style.height=d,o.style.maxHeight=d};ee?(m(),ee(),ee=null):ee=m}}function et(n){const o=ue.value;if(o){const d=n.getBoundingClientRect().height,m=()=>{document.body.offsetHeight,o.style.maxHeight=`${d}px`,o.style.height=`${Math.max(me,d)}px`};ee?(ee(),ee=null,m()):ee=m}}function tt(){const n=ue.value;if(n){n.style.maxHeight="",n.style.height="";const{paneWrapperStyle:o}=t;if(typeof o=="string")n.style.cssText=o;else if(o){const{maxHeight:d,height:m}=o;d!==void 0&&(n.style.maxHeight=d),m!==void 0&&(n.style.height=m)}}}const Ue={value:[]},Ae=O("next");function at(n){const o=h.value;let d="next";for(const m of Ue.value){if(m===o)break;if(m===n){d="prev";break}}Ae.value=d,rt(n)}function rt(n){const{onActiveNameChange:o,onUpdateValue:d,"onUpdate:value":m}=t;o&&pe(o,n),d&&pe(d,n),m&&pe(m,n),P.value=n}function st(n){const{onClose:o}=t;o&&pe(o,n)}function Le(){const{value:n}=B;if(!n)return;const o="transition-disabled";n.classList.add(o),ce(),n.classList.remove(o)}const re=O(null);function ge({transitionDisabled:n}){const o=w.value;if(!o)return;n&&o.classList.add("transition-disabled");const d=s();d&&re.value&&(re.value.style.width=`${d.offsetWidth}px`,re.value.style.height=`${d.offsetHeight}px`,re.value.style.transform=`translateX(${d.offsetLeft-da(getComputedStyle(o).paddingLeft)}px)`,n&&re.value.offsetWidth),n&&o.classList.remove("transition-disabled")}Ce([h],()=>{t.type==="segment"&&_e(()=>{ge({transitionDisabled:!1})})}),ba(()=>{t.type==="segment"&&ge({transitionDisabled:!0})});let De=0;function nt(n){var o;if(n.contentRect.width===0&&n.contentRect.height===0||De===n.contentRect.width)return;De=n.contentRect.width;const{type:d}=t;if((d==="line"||d==="bar")&&Le(),d!=="segment"){const{placement:m}=t;xe((m==="top"||m==="bottom"?(o=z.value)===null||o===void 0?void 0:o.$el:j.value)||null)}}const ot=Pe(nt,64);Ce([()=>t.justifyContent,()=>t.size],()=>{_e(()=>{const{type:n}=t;(n==="line"||n==="bar")&&Le()})});const se=O(!1);function lt(n){var o;const{target:d,contentRect:{width:m,height:L}}=n,q=d.parentElement.parentElement.offsetWidth,K=d.parentElement.parentElement.offsetHeight,{placement:oe}=t;if(!se.value)oe==="top"||oe==="bottom"?q<m&&(se.value=!0):K<L&&(se.value=!0);else{const{value:ie}=$;if(!ie)return;oe==="top"||oe==="bottom"?q-m>ie.$el.offsetWidth&&(se.value=!1):K-L>ie.$el.offsetHeight&&(se.value=!1)}xe(((o=z.value)===null||o===void 0?void 0:o.$el)||null)}const it=Pe(lt,64);function dt(){const{onAdd:n}=t;n&&n(),_e(()=>{const o=s(),{value:d}=z;!o||!d||d.scrollTo({left:o.offsetLeft,top:0,behavior:"smooth"})})}function xe(n){if(!n)return;const{placement:o}=t;if(o==="top"||o==="bottom"){const{scrollLeft:d,scrollWidth:m,offsetWidth:L}=n;D.value=d<=0,H.value=d+L>=m}else{const{scrollTop:d,scrollHeight:m,offsetHeight:L}=n;D.value=d<=0,H.value=d+L>=m}}const ct=Pe(n=>{xe(n.target)},64);xa(je,{triggerRef:Z(t,"trigger"),tabStyleRef:Z(t,"tabStyle"),tabClassRef:Z(t,"tabClass"),addTabStyleRef:Z(t,"addTabStyle"),addTabClassRef:Z(t,"addTabClass"),paneClassRef:Z(t,"paneClass"),paneStyleRef:Z(t,"paneStyle"),mergedClsPrefixRef:R,typeRef:Z(t,"type"),closableRef:Z(t,"closable"),valueRef:h,tabChangeIdRef:I,onBeforeLeaveRef:Z(t,"onBeforeLeave"),activateTab:at,handleClose:st,handleAdd:dt}),la(()=>{ce(),We()}),pa(()=>{const{value:n}=E;if(!n)return;const{value:o}=R,d=`${o}-tabs-nav-scroll-wrapper--shadow-start`,m=`${o}-tabs-nav-scroll-wrapper--shadow-end`;D.value?n.classList.remove(d):n.classList.add(d),H.value?n.classList.remove(m):n.classList.add(m)});const ut={syncBarPosition:()=>{ce()}},ft=()=>{ge({transitionDisabled:!0})},Ee=G(()=>{const{value:n}=X,{type:o}=t,d={card:"Card",bar:"Bar",line:"Line",segment:"Segment"}[o],m=`${n}${d}`,{self:{barColor:L,closeIconColor:q,closeIconColorHover:K,closeIconColorPressed:oe,tabColor:ie,tabBorderColor:bt,paneTextColor:pt,tabFontWeight:vt,tabBorderRadius:ht,tabFontWeightActive:mt,colorSegment:gt,fontWeightStrong:xt,tabColorSegment:yt,closeSize:wt,closeIconSize:St,closeColorHover:zt,closeColorPressed:Ct,closeBorderRadius:_t,[Y("panePadding",n)]:fe,[Y("tabPadding",m)]:Tt,[Y("tabPaddingVertical",m)]:Rt,[Y("tabGap",m)]:Pt,[Y("tabGap",`${m}Vertical`)]:kt,[Y("tabTextColor",o)]:Ot,[Y("tabTextColorActive",o)]:$t,[Y("tabTextColorHover",o)]:jt,[Y("tabTextColorDisabled",o)]:Bt,[Y("tabFontSize",n)]:Wt},common:{cubicBezierEaseInOut:Ut}}=W.value;return{"--n-bezier":Ut,"--n-color-segment":gt,"--n-bar-color":L,"--n-tab-font-size":Wt,"--n-tab-text-color":Ot,"--n-tab-text-color-active":$t,"--n-tab-text-color-disabled":Bt,"--n-tab-text-color-hover":jt,"--n-pane-text-color":pt,"--n-tab-border-color":bt,"--n-tab-border-radius":ht,"--n-close-size":wt,"--n-close-icon-size":St,"--n-close-color-hover":zt,"--n-close-color-pressed":Ct,"--n-close-border-radius":_t,"--n-close-icon-color":q,"--n-close-icon-color-hover":K,"--n-close-icon-color-pressed":oe,"--n-tab-color":ie,"--n-tab-font-weight":vt,"--n-tab-font-weight-active":mt,"--n-tab-padding":Tt,"--n-tab-padding-vertical":Rt,"--n-tab-gap":Pt,"--n-tab-gap-vertical":kt,"--n-pane-padding-left":be(fe,"left"),"--n-pane-padding-right":be(fe,"right"),"--n-pane-padding-top":be(fe,"top"),"--n-pane-padding-bottom":be(fe,"bottom"),"--n-font-weight-strong":xt,"--n-tab-color-segment":yt}}),ne=y?ia("tabs",G(()=>`${X.value[0]}${t.type[0]}`),Ee,t):void 0;return Object.assign({mergedClsPrefix:R,mergedValue:h,renderedNames:new Set,segmentCapsuleElRef:re,tabsPaneWrapperRef:ue,tabsElRef:w,barElRef:B,addTabInstRef:$,xScrollInstRef:z,scrollWrapperElRef:E,addTabFixed:se,tabWrapperStyle:M,handleNavResize:ot,mergedSize:X,handleScroll:ct,handleTabsResize:it,cssVars:y?void 0:Ee,themeClass:ne==null?void 0:ne.themeClass,animationDirection:Ae,renderNameListRef:Ue,yScrollElRef:j,handleSegmentResize:ft,onAnimationBeforeLeave:Ze,onAnimationEnter:et,onAnimationAfterEnter:tt,onRender:ne==null?void 0:ne.onRender},ut)},render(){const{mergedClsPrefix:t,type:l,placement:f,addTabFixed:_,addable:b,mergedSize:T,renderNameListRef:R,onRender:y,paneWrapperClass:k,paneWrapperStyle:W,$slots:{default:w,prefix:B,suffix:E}}=this;y==null||y();const $=w?Se(w()).filter(P=>P.type.__TAB_PANE__===!0):[],z=w?Se(w()).filter(P=>P.type.__TAB__===!0):[],j=!z.length,D=l==="card",H=l==="segment",A=!D&&!H&&this.justifyContent;R.value=[];const X=()=>{const P=x("div",{style:this.tabWrapperStyle,class:`${t}-tabs-wrapper`},A?null:x("div",{class:`${t}-tabs-scroll-padding`,style:f==="top"||f==="bottom"?{width:`${this.tabsPadding}px`}:{height:`${this.tabsPadding}px`}}),j?$.map((h,I)=>(R.value.push(h.props.name),ke(x($e,Object.assign({},h.props,{internalCreatedByPane:!0,internalLeftPadded:I!==0&&(!A||A==="center"||A==="start"||A==="end")}),h.children?{default:h.children.tab}:void 0)))):z.map((h,I)=>(R.value.push(h.props.name),ke(I!==0&&!A?Xe(h):h))),!_&&b&&D?Qe(b,(j?$.length:z.length)!==0):null,A?null:x("div",{class:`${t}-tabs-scroll-padding`,style:{width:`${this.tabsPadding}px`}}));return x("div",{ref:"tabsElRef",class:`${t}-tabs-nav-scroll-content`},D&&b?x(ze,{onResize:this.handleTabsResize},{default:()=>P}):P,D?x("div",{class:`${t}-tabs-pad`}):null,D?null:x("div",{ref:"barElRef",class:`${t}-tabs-bar`}))},V=H?"top":f;return x("div",{class:[`${t}-tabs`,this.themeClass,`${t}-tabs--${l}-type`,`${t}-tabs--${T}-size`,A&&`${t}-tabs--flex`,`${t}-tabs--${V}`],style:this.cssVars},x("div",{class:[`${t}-tabs-nav--${l}-type`,`${t}-tabs-nav--${V}`,`${t}-tabs-nav`]},Ne(B,P=>P&&x("div",{class:`${t}-tabs-nav__prefix`},P)),H?x(ze,{onResize:this.handleSegmentResize},{default:()=>x("div",{class:`${t}-tabs-rail`,ref:"tabsElRef"},x("div",{class:`${t}-tabs-capsule`,ref:"segmentCapsuleElRef"},x("div",{class:`${t}-tabs-wrapper`},x("div",{class:`${t}-tabs-tab`}))),j?$.map((P,h)=>(R.value.push(P.props.name),x($e,Object.assign({},P.props,{internalCreatedByPane:!0,internalLeftPadded:h!==0}),P.children?{default:P.children.tab}:void 0))):z.map((P,h)=>(R.value.push(P.props.name),h===0?P:Xe(P))))}):x(ze,{onResize:this.handleNavResize},{default:()=>x("div",{class:`${t}-tabs-nav-scroll-wrapper`,ref:"scrollWrapperElRef"},["top","bottom"].includes(V)?x(za,{ref:"xScrollInstRef",onScroll:this.handleScroll},{default:X}):x("div",{class:`${t}-tabs-nav-y-scroll`,onScroll:this.handleScroll,ref:"yScrollElRef"},X()))}),_&&b&&D?Qe(b,!0):null,Ne(E,P=>P&&x("div",{class:`${t}-tabs-nav__suffix`},P))),j&&(this.animated&&(V==="top"||V==="bottom")?x("div",{ref:"tabsPaneWrapperRef",style:W,class:[`${t}-tabs-pane-wrapper`,k]},Ge($,this.mergedValue,this.renderedNames,this.onAnimationBeforeLeave,this.onAnimationEnter,this.onAnimationAfterEnter,this.animationDirection)):Ge($,this.mergedValue,this.renderedNames)))}});function Ge(t,l,f,_,b,T,R){const y=[];return t.forEach(k=>{const{name:W,displayDirective:w,"display-directive":B}=k.props,E=z=>w===z||B===z,$=l===W;if(k.key!==void 0&&(k.key=W),$||E("show")||E("show:lazy")&&f.has(W)){f.has(W)||f.add(W);const z=!E("if");y.push(z?va(k,[[ha,$]]):k)}}),R?x(ma,{name:`${R}-transition`,onBeforeLeave:_,onEnter:b,onAfterEnter:T},{default:()=>y}):y}function Qe(t,l){return x($e,{ref:"addTabInstRef",key:"__addable",name:"__addable",internalCreatedByPane:!0,internalAddable:!0,internalLeftPadded:l,disabled:typeof t=="object"&&t.disabled})}function Xe(t){const l=ga(t);return l.props?l.props.internalLeftPadded=!0:l.props={internalLeftPadded:!0},l}function ke(t){return Array.isArray(t.dynamicProps)?t.dynamicProps.includes("internalLeftPadded")||t.dynamicProps.push("internalLeftPadded"):t.dynamicProps=["internalLeftPadded"],t}const Va={style:{color:"#666","margin-bottom":"24px"}},Ma={class:"code-inline"},Fa={class:"code-inline"},Ja={class:"code-inline"},Ga={class:"code-inline"},Qa={class:"code-block"},Xa={class:"code-block"},qa={class:"ua-checks"},Ka={class:"code-block"},Ya={class:"code-block"},Za={class:"code-block"},er={class:"code-block"},tr={class:"code-block"},ar={class:"code-block"},rr={class:"code-block"},sr={class:"code-block"},nr={style:{"font-size":"12px",color:"#666"}},or=de({__name:"Url",setup(t){const{t:l}=ca(),f=O("a=1&b=2&c=true&d=null"),_=O({name:"John",age:25,active:!0}),b=O("https://example.com/user/123/profile"),T=O("1.2.3"),R=O("1.2.4"),y=O("1.2.3"),k=O("https://api.example.com"),W=G(()=>new te(k.value).path("users","123").set("fields","name,email").setHashPath("section").toString()),w=O("https://example.com:8080/api/users?id=123&page=1#section"),B=G(()=>new te(w.value)),E=O("https://a.cn/?ss=1#/path?bb=343"),$=O("ss"),z=O("all"),j=G(()=>{const M=new te(E.value);return{get:M.get($.value,z.value),has:M.has($.value,z.value),keys:M.keys(z.value==="all"?void 0:z.value),toObject:M.toObject(z.value==="all"?void 0:z.value),toDetailObject:M.toDetailObject()}}),D=O("https://api.example.com"),H=G(()=>new te(D.value).set("token","abc123").set("page",1).set("tab","profile","hash").setHashPath("/user/settings").toURL()),A=O("https://example.com#/profile?tab=settings&mode=dark"),X=G(()=>new te(A.value)),V=G(()=>J.info),P=G(()=>({isMobile:J.isMobile(),isTablet:J.isTablet(),isDesktop:J.isDesktop(),isTouch:J.isTouch(),isiOS:J.isiOS(),isAndroid:J.isAndroid(),isHarmonyOS:J.isHarmonyOS(),isWeChat:J.isWeChat(),isQQ:J.isQQ(),isMiniProgram:J.isMiniProgram(),isDarkMode:J.isDarkMode()})),h=G(()=>J.getNetwork()),I=G(()=>J.getScreen());return(M,s)=>(ve(),Te("div",null,[a(e(At),null,{default:r(()=>[...s[12]||(s[12]=[S("Url",-1)])]),_:1}),u("p",Va,c(e(l).categoriesDesc.Url),1),a(F,{title:e(l).url.classChainBuildTitle,description:e(l).url.classChainBuildDesc,since:"6.0.0",code:`import { Url } from 'js-cool'

// Chainable URL builder
const url = new Url('https://api.example.com')
  .path('users', '123')
  .set('fields', 'name,email')
  .setHashPath('section')
  .toString()
// 'https://api.example.com/users/123?fields=name,email#section'

// Params operations
const u = new Url('https://example.com?id=123&token=abc')
u.get('id')           // '123'
u.set('page', 2)      // chainable
u.delete('token')     // chainable
u.toString()          // 'https://example.com/?id=123&page=2'`},{input:r(()=>[a(e(p),{vertical:"",style:{width:"100%"}},{default:r(()=>[a(e(Q),{value:k.value,"onUpdate:value":s[0]||(s[0]=g=>k.value=g),style:{width:"100%"},placeholder:"Enter base URL"},null,8,["value"])]),_:1})]),result:r(()=>[a(e(p),{vertical:""},{default:r(()=>[s[13]||(s[13]=u("code",{class:"code-inline"},".path('users', '123').set('fields', 'name,email').setHashPath('section')",-1)),a(e(C),{type:"info",size:"small",bordered:!1,style:{"max-width":"100%","overflow-wrap":"break-word"}},{default:r(()=>[S(c(W.value),1)]),_:1})]),_:1})]),_:1},8,["title","description"]),a(F,{title:e(l).url.classPropertiesTitle,description:e(l).url.classPropertiesDesc,since:"6.0.0",code:`import { Url } from 'js-cool'

const u = new Url('https://example.com:8080/api/users?id=123#section')

u.origin    // 'https://example.com:8080'
u.host      // 'example.com:8080'
u.hostname  // 'example.com'
u.pathname  // '/api/users'
u.search    // '?id=123'
u.hash      // '#section'`},{input:r(()=>[a(e(Q),{value:w.value,"onUpdate:value":s[1]||(s[1]=g=>w.value=g),style:{width:"100%"}},null,8,["value"])]),result:r(()=>[a(e(p),{vertical:""},{default:r(()=>[a(e(p),{align:"center"},{default:r(()=>[s[14]||(s[14]=u("code",{class:"code-inline"},".origin",-1)),a(e(C),{type:"info",size:"small",bordered:!1},{default:r(()=>[S(c(B.value.origin),1)]),_:1})]),_:1}),a(e(p),{align:"center"},{default:r(()=>[s[15]||(s[15]=u("code",{class:"code-inline"},".host",-1)),a(e(C),{type:"info",size:"small",bordered:!1},{default:r(()=>[S(c(B.value.host),1)]),_:1})]),_:1}),a(e(p),{align:"center"},{default:r(()=>[s[16]||(s[16]=u("code",{class:"code-inline"},".hostname",-1)),a(e(C),{type:"info",size:"small",bordered:!1},{default:r(()=>[S(c(B.value.hostname),1)]),_:1})]),_:1}),a(e(p),{align:"center"},{default:r(()=>[s[17]||(s[17]=u("code",{class:"code-inline"},".pathname",-1)),a(e(C),{type:"info",size:"small",bordered:!1},{default:r(()=>[S(c(B.value.pathname),1)]),_:1})]),_:1}),a(e(p),{align:"center"},{default:r(()=>[s[18]||(s[18]=u("code",{class:"code-inline"},".search",-1)),a(e(C),{type:"info",size:"small",bordered:!1},{default:r(()=>[S(c(B.value.search),1)]),_:1})]),_:1}),a(e(p),{align:"center"},{default:r(()=>[s[19]||(s[19]=u("code",{class:"code-inline"},".hash",-1)),a(e(C),{type:"info",size:"small",bordered:!1},{default:r(()=>[S(c(B.value.hash),1)]),_:1})]),_:1})]),_:1})]),_:1},8,["title","description"]),a(F,{title:e(l).url.classParamsTitle,description:e(l).url.classParamsDesc,since:"6.0.0",code:`import { Url } from 'js-cool'

const u = new Url('https://a.cn/?ss=1#/path?bb=343')

// Auto search from search + hash (hash priority)
u.get('ss')              // '1' (from search)
u.get('bb')              // '343' (from hash)

// Specify scope
u.get('ss', 'search')    // '1'
u.get('ss', 'hash')      // null
u.get('ss', 'all')       // '1' (default, hash priority)

// Get all params
u.toObject()             // { ss: '1', bb: '343' }
u.toObject('search')     // { ss: '1' }
u.toObject('hash')       // { bb: '343' }`},{input:r(()=>[a(e(p),{vertical:"",style:{width:"100%"}},{default:r(()=>[a(e(Q),{value:E.value,"onUpdate:value":s[2]||(s[2]=g=>E.value=g),style:{width:"100%"},placeholder:"URL with search and hash params"},null,8,["value"]),a(e(p),{align:"center"},{default:r(()=>[a(e(Q),{value:$.value,"onUpdate:value":s[3]||(s[3]=g=>$.value=g),style:{width:"100px"},placeholder:"key"},null,8,["value"]),a(e(p),null,{default:r(()=>[(ve(),Te(Oe,null,Me(["search","hash","all"],g=>a(e(C),{key:g,type:z.value===g?"primary":"default",style:{cursor:"pointer"},onClick:le=>z.value=g},{default:r(()=>[S(c(g),1)]),_:2},1032,["type","onClick"])),64))]),_:1})]),_:1})]),_:1})]),result:r(()=>[a(e(p),{vertical:""},{default:r(()=>[a(e(p),{align:"center"},{default:r(()=>[u("code",Ma,".get('"+c($.value)+"', '"+c(z.value)+"')",1),a(e(C),{type:"info",size:"small",bordered:!1},{default:r(()=>[S(c(j.value.get??"null"),1)]),_:1})]),_:1}),a(e(p),{align:"center"},{default:r(()=>[u("code",Fa,".has('"+c($.value)+"', '"+c(z.value)+"')",1),a(e(C),{type:j.value.has?"success":"default",size:"small",bordered:!1},{default:r(()=>[S(c(j.value.has),1)]),_:1},8,["type"])]),_:1}),a(e(p),{align:"center"},{default:r(()=>[u("code",Ja,".keys('"+c(z.value)+"')",1),a(e(C),{type:"info",size:"small",bordered:!1},{default:r(()=>[S(c(JSON.stringify(j.value.keys)),1)]),_:1})]),_:1}),a(e(p),{align:"center"},{default:r(()=>[u("code",Ga,".toObject('"+c(z.value)+"')",1),a(e(C),{type:"info",size:"small",bordered:!1},{default:r(()=>[S(c(JSON.stringify(j.value.toObject)),1)]),_:1})]),_:1})]),_:1})]),_:1},8,["title","description"]),a(F,{title:"Url.toDetailObject()",description:e(l).url.toDetailObjectDesc,since:"6.0.0",code:`const u = new Url('https://a.cn/?ss=1#/path?bb=343')
u.toDetailObject()
// {
//   search: { ss: '1' },
//   hash: { bb: '343' },
//   all: { ss: '1', bb: '343' },
//   source: { ss: 'search', bb: 'hash' }
// }

// Duplicate key tracking
new Url('https://example.com?token=old#/path?token=new')
  .toDetailObject()
// { ..., source: { token: 'both' } }`},{result:r(()=>[u("pre",Qa,c(JSON.stringify(j.value.toDetailObject,null,2)),1)]),_:1},8,["description"]),a(F,{title:e(l).url.chainModifyTitle,description:e(l).url.chainModifyDesc,since:"6.0.0",code:`import { Url } from 'js-cool'

const url = new Url('https://api.example.com')
  .set('token', 'abc123')
  .set('page', 1)
  .set('tab', 'profile', 'hash')  // set hash param
  .setHashPath('/user/settings')   // set hash path
  .toURL()
// 'https://api.example.com/?token=abc123&page=1#/user/settings?tab=profile'`},{input:r(()=>[a(e(Q),{value:D.value,"onUpdate:value":s[4]||(s[4]=g=>D.value=g),style:{width:"100%"},placeholder:"Base URL"},null,8,["value"])]),result:r(()=>[a(e(p),{vertical:""},{default:r(()=>[s[20]||(s[20]=u("code",{class:"code-inline"},".set('token', 'abc123').set('page', 1).set('tab', 'profile', 'hash').setHashPath('/user/settings')",-1)),a(e(C),{type:"info",size:"small",bordered:!1,style:{"max-width":"100%","overflow-wrap":"break-word"}},{default:r(()=>[S(c(H.value),1)]),_:1})]),_:1})]),_:1},8,["title","description"]),a(F,{title:e(l).url.hashParamsTitle,description:e(l).url.hashParamsDesc,since:"6.0.0",code:`import { Url } from 'js-cool'

const u = new Url('https://example.com#/profile?tab=settings&mode=dark')

// Get hash params
u.get('tab', 'hash')      // 'settings'
u.get('mode', 'hash')     // 'dark'

// Get hash path
u.getHashPath()           // '/profile'

// Get all hash params
u.toObject('hash')        // { tab: 'settings', mode: 'dark' }`},{input:r(()=>[a(e(Q),{value:A.value,"onUpdate:value":s[5]||(s[5]=g=>A.value=g),style:{width:"100%"}},null,8,["value"])]),result:r(()=>[a(e(p),{vertical:""},{default:r(()=>[a(e(p),{align:"center"},{default:r(()=>[s[21]||(s[21]=u("code",{class:"code-inline"},".getHashPath()",-1)),a(e(C),{type:"info",size:"small",bordered:!1},{default:r(()=>[S(c(X.value.getHashPath()),1)]),_:1})]),_:1}),a(e(p),{align:"center"},{default:r(()=>[s[22]||(s[22]=u("code",{class:"code-inline"},".toObject('hash')",-1)),a(e(C),{type:"info",size:"small",bordered:!1},{default:r(()=>[S(c(JSON.stringify(X.value.toObject("hash"))),1)]),_:1})]),_:1})]),_:1})]),_:1},8,["title","description"]),a(F,{title:e(l).url.parseStringifyTitle,description:e(l).url.parseStringifyDesc,since:"6.0.0",code:`import { Url, parse, stringify } from 'js-cool'

// Parse query string
Url.parse('a=1&b=2&c=true')
// { a: '1', b: '2', c: 'true' }

Url.parse('a=1&b=2&c=true', { convert: true })
// { a: 1, b: 2, c: true }  // auto type conversion

// Build query string
Url.stringify({ name: 'John', age: 25 })
// '?name=John&age=25'

// Standalone functions (recommended)
parse('?a=1&b=true', { convert: true })
// { a: 1, b: true }

stringify({ name: 'John' }, { withQuestionMark: false })
// 'name=John'`},{input:r(()=>[a(e(Q),{value:f.value,"onUpdate:value":s[6]||(s[6]=g=>f.value=g),style:{width:"300px"}},null,8,["value"])]),result:r(()=>[a(e(p),{vertical:""},{default:r(()=>[a(e(p),{align:"center"},{default:r(()=>[s[23]||(s[23]=u("code",{class:"code-inline"},"parse(str)",-1)),a(e(C),{type:"info",size:"small",bordered:!1},{default:r(()=>[S(c(JSON.stringify(e(He)(f.value))),1)]),_:1})]),_:1}),a(e(p),{align:"center"},{default:r(()=>[s[24]||(s[24]=u("code",{class:"code-inline"},"parse(str, { convert: true })",-1)),a(e(C),{type:"info",size:"small",bordered:!1},{default:r(()=>[S(c(JSON.stringify(e(He)(f.value,{convert:!0}))),1)]),_:1})]),_:1}),a(e(p),{align:"center"},{default:r(()=>[s[25]||(s[25]=u("code",{class:"code-inline"},"stringify(obj)",-1)),a(e(C),{type:"info",size:"small",bordered:!1},{default:r(()=>[S(c(e(Lt)(_.value)),1)]),_:1})]),_:1})]),_:1})]),_:1},8,["title","description"]),a(F,{title:e(l).url.extractTitle,description:e(l).url.extractDesc,since:"6.0.0",code:`import { getOrigin, getHost, getHostname, getPathname, getSearch, getHash } from 'js-cool'

getOrigin('https://example.com:8080/path')
// 'https://example.com:8080'

getHost('https://example.com:8080/path')
// 'example.com:8080'

getHostname('https://example.com:8080/path')
// 'example.com'

getPathname('https://example.com/api/users?id=1')
// '/api/users'

getSearch('https://example.com?key=value')
// '?key=value'

getHash('https://example.com#section')
// '#section'`},{input:r(()=>[a(e(Q),{value:w.value,"onUpdate:value":s[7]||(s[7]=g=>w.value=g),style:{width:"100%"}},null,8,["value"])]),result:r(()=>[a(e(p),{vertical:""},{default:r(()=>[a(e(p),{align:"center"},{default:r(()=>[s[26]||(s[26]=u("code",{class:"code-inline"},"getOrigin(url)",-1)),a(e(C),{type:"info",size:"small",bordered:!1},{default:r(()=>[S(c(e(Dt)(w.value)),1)]),_:1})]),_:1}),a(e(p),{align:"center"},{default:r(()=>[s[27]||(s[27]=u("code",{class:"code-inline"},"getHost(url)",-1)),a(e(C),{type:"info",size:"small",bordered:!1},{default:r(()=>[S(c(e(Et)(w.value)),1)]),_:1})]),_:1}),a(e(p),{align:"center"},{default:r(()=>[s[28]||(s[28]=u("code",{class:"code-inline"},"getHostname(url)",-1)),a(e(C),{type:"info",size:"small",bordered:!1},{default:r(()=>[S(c(e(Ht)(w.value)),1)]),_:1})]),_:1}),a(e(p),{align:"center"},{default:r(()=>[s[29]||(s[29]=u("code",{class:"code-inline"},"getPathname(url)",-1)),a(e(C),{type:"info",size:"small",bordered:!1},{default:r(()=>[S(c(e(It)(w.value)),1)]),_:1})]),_:1}),a(e(p),{align:"center"},{default:r(()=>[s[30]||(s[30]=u("code",{class:"code-inline"},"getSearch(url)",-1)),a(e(C),{type:"info",size:"small",bordered:!1},{default:r(()=>[S(c(e(Nt)(w.value)),1)]),_:1})]),_:1}),a(e(p),{align:"center"},{default:r(()=>[s[31]||(s[31]=u("code",{class:"code-inline"},"getHash(url)",-1)),a(e(C),{type:"info",size:"small",bordered:!1},{default:r(()=>[S(c(e(Vt)(w.value)),1)]),_:1})]),_:1})]),_:1})]),_:1},8,["title","description"]),a(F,{title:"getDirParams",description:e(l).url.getDirParamsDesc,since:"6.0.0",code:`import { getDirParams } from 'js-cool'

getDirParams('https://example.com/user/123/profile')
// {
//   origin: 'https://example.com',
//   host: 'example.com',
//   hostname: 'example.com',
//   pathname: '/user/123/profile',
//   segments: ['user', '123', 'profile'],
//   query: '',
//   hash: ''
// }`},{input:r(()=>[a(e(Q),{value:b.value,"onUpdate:value":s[8]||(s[8]=g=>b.value=g),style:{width:"100%"}},null,8,["value"])]),result:r(()=>[u("pre",Xa,c(JSON.stringify(e(Mt)(b.value),null,2)),1)]),_:1},8,["description"]),a(F,{title:e(l).url.staticFactoryTitle,description:e(l).url.staticFactoryDesc,since:"6.0.0",code:`import { Url } from 'js-cool'

// Create from current page URL (browser environment)
const currentUrl = Url.current()

// Create from query string
const params = Url.fromQueryString('a=1&b=2')
params.toObject()  // { a: '1', b: '2' }`},{result:r(()=>[a(e(p),{vertical:""},{default:r(()=>[a(e(p),{align:"center"},{default:r(()=>[s[32]||(s[32]=u("code",{class:"code-inline"},"Url.current()",-1)),a(e(C),{type:"info",size:"small",bordered:!1},{default:r(()=>{var g;return[S(c(((g=e(te).current())==null?void 0:g.toString())??e(l).url.notBrowserEnv),1)]}),_:1})]),_:1}),a(e(p),{align:"center"},{default:r(()=>[s[33]||(s[33]=u("code",{class:"code-inline"},"Url.fromQueryString('a=1&b=2').toObject()",-1)),a(e(C),{type:"info",size:"small",bordered:!1},{default:r(()=>[S(c(JSON.stringify(e(te).fromQueryString("a=1&b=2").toObject())),1)]),_:1})]),_:1})]),_:1})]),_:1},8,["title","description"]),a(F,{title:e(l).url.uaTitle,description:e(l).url.uaDesc,since:"6.0.0",code:`import { ua } from 'js-cool'

ua.info        // { device, os, browser, environment }
ua.isMobile()  // true/false
ua.isWeChat()  // true/false
ua.isiOS()     // true/false
ua.device      // DeviceInfo
ua.os          // OSInfo
ua.browser     // BrowserInfo`},{default:r(()=>[a(e(Na),{type:"line",size:"small"},{default:r(()=>[a(e(ae),{name:"quick",tab:"Quick Checks"},{default:r(()=>[u("div",qa,[(ve(!0),Te(Oe,null,Me(P.value,(g,le)=>(ve(),ya(e(C),{key:le,type:g?"success":"default",size:"small"},{default:r(()=>[S(c(le)+": "+c(g),1)]),_:2},1032,["type"]))),128))])]),_:1}),a(e(ae),{name:"device",tab:"Device"},{default:r(()=>[u("pre",Ka,c(JSON.stringify(V.value.device,null,2)),1)]),_:1}),a(e(ae),{name:"os",tab:"OS"},{default:r(()=>[u("pre",Ya,c(JSON.stringify(V.value.os,null,2)),1)]),_:1}),a(e(ae),{name:"browser",tab:"Browser"},{default:r(()=>[u("pre",Za,c(JSON.stringify(V.value.browser,null,2)),1)]),_:1}),a(e(ae),{name:"env",tab:"Environment"},{default:r(()=>[u("pre",er,c(JSON.stringify(V.value.environment,null,2)),1)]),_:1}),a(e(ae),{name:"network",tab:"Network"},{default:r(()=>[u("pre",tr,c(JSON.stringify(h.value,null,2)),1)]),_:1}),a(e(ae),{name:"screen",tab:"Screen"},{default:r(()=>[u("pre",ar,c(JSON.stringify(I.value,null,2)),1)]),_:1})]),_:1})]),_:1},8,["title","description"]),a(F,{title:"browserVersion / osVersion / appVersion",description:e(l).url.browserOsVersionDesc,since:"1.0.0",code:`browserVersion() // { name: 'Chrome', version: '123.0.0.0' }
osVersion() // { name: 'Mac OS', version: '10.15.7' }
appVersion('Chrome') // '123.0.0.0'`},{result:r(()=>[a(e(p),{vertical:""},{default:r(()=>[u("div",null,[s[34]||(s[34]=u("code",{class:"code-inline"},"browserVersion()",-1)),u("pre",rr,c(JSON.stringify(e(Ft)(),null,2)),1)]),u("div",null,[s[35]||(s[35]=u("code",{class:"code-inline"},"osVersion()",-1)),u("pre",sr,c(JSON.stringify(e(Jt)(),null,2)),1)]),a(e(p),{align:"center"},{default:r(()=>[s[36]||(s[36]=u("code",{class:"code-inline"},"appVersion('Chrome')",-1)),a(e(C),{type:"info",size:"small",bordered:!1},{default:r(()=>[S(c(e(Gt)("Chrome")),1)]),_:1})]),_:1})]),_:1})]),_:1},8,["description"]),a(F,{title:"compareVersion",description:e(l).url.compareVersionDesc,since:"1.0.0",code:`compareVersion('1.2.3', '1.2.4') // -1
compareVersion('2.0.0', '1.9.9') // 1
compareVersion('1.0.0', '1.0.0') // 0`},{input:r(()=>[a(e(p),{align:"center"},{default:r(()=>[a(e(Q),{value:T.value,"onUpdate:value":s[9]||(s[9]=g=>T.value=g),style:{width:"100px"}},null,8,["value"]),s[37]||(s[37]=u("span",{style:{color:"#666"}},"vs",-1)),a(e(Q),{value:R.value,"onUpdate:value":s[10]||(s[10]=g=>R.value=g),style:{width:"100px"}},null,8,["value"]),a(e(C),{type:"info",size:"small",bordered:!1},{default:r(()=>[S(c(e(ye)(T.value,R.value)),1)]),_:1}),u("span",nr,c(e(ye)(T.value,R.value)>0?"A > B":e(ye)(T.value,R.value)<0?"A < B":"A = B"),1)]),_:1})]),_:1},8,["description"]),a(F,{title:"nextVersion",description:e(l).url.nextVersionDesc,since:"1.0.0",code:`nextVersion('1.2.3', 'major') // '2.0.0'
nextVersion('1.2.3', 'minor') // '1.3.0'
nextVersion('1.2.3', 'patch') // '1.2.4'`},{input:r(()=>[a(e(Q),{value:y.value,"onUpdate:value":s[11]||(s[11]=g=>y.value=g),style:{width:"100px"}},null,8,["value"])]),result:r(()=>[a(e(p),null,{default:r(()=>[a(e(p),{align:"center"},{default:r(()=>[s[38]||(s[38]=u("code",{class:"code-inline"},"major",-1)),a(e(C),{type:"info",size:"small",bordered:!1},{default:r(()=>[S(c(e(we)(y.value,"major")),1)]),_:1})]),_:1}),a(e(p),{align:"center"},{default:r(()=>[s[39]||(s[39]=u("code",{class:"code-inline"},"minor",-1)),a(e(C),{type:"info",size:"small",bordered:!1},{default:r(()=>[S(c(e(we)(y.value,"minor")),1)]),_:1})]),_:1}),a(e(p),{align:"center"},{default:r(()=>[s[40]||(s[40]=u("code",{class:"code-inline"},"patch",-1)),a(e(C),{type:"info",size:"small",bordered:!1},{default:r(()=>[S(c(e(we)(y.value,"patch")),1)]),_:1})]),_:1})]),_:1})]),_:1},8,["description"])]))}}),fr=ua(or,[["__scopeId","data-v-21ce0e86"]]);export{fr as default};
