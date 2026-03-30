import{_ as S,N as r}from"./FunctionCard.vue_vue_type_script_setup_true_lang-DDIdy86z.js";import{N as p,T as C,U as f,V,W as N}from"./index-BVibqmd8.js";import{a as v,N as c,u as J,X as T}from"./index-D8X7QFQD.js";import{N as _}from"./Alert-ByBrAE-F.js";import{k as b,H as O,P as a,O as o,Q as n,I as t,R as i,M as A,G as x,j as s,r as d}from"./vue-vendor-BrQLXg1A.js";import"./Warning-DFpb2-1N.js";const k={style:{color:"#666","margin-bottom":"24px"}},j={style:{"margin-top":"8px"}},B={class:"code-block",style:{"font-size":"11px"}},I={class:"code-block",style:{"font-size":"11px"}},w=b({__name:"Convert",setup(z){const{t:u}=J(),l=d(`name,age,city
John,25,New York
Alice,30,Los Angeles
Bob,35,Chicago`),m=d([{name:"John",age:25,city:"New York"},{name:"Alice",age:30,city:"Los Angeles"}]);return(D,e)=>{const y=A("router-link");return x(),O("div",null,[a(n(p),null,{default:o(()=>[...e[1]||(e[1]=[s("Convert",-1)])]),_:1}),t("p",k,i(n(u).categoriesDesc.Convert),1),a(n(_),{type:"info",style:{"margin-bottom":"24px"},title:"Binary Module"},{default:o(()=>[e[3]||(e[3]=t("p",null,[s(" All binary data conversion functions have been unified into the "),t("strong",null,"binary"),s(" module since v6.0.0. ")],-1)),t("p",j,[a(y,{to:"/binary"},{default:o(()=>[...e[2]||(e[2]=[s("Go to Binary module →",-1)])]),_:1})])]),_:1}),a(S,{title:"CSVToArray / CSVToJSON",description:"Parse CSV to array or JSON",since:"5.0.0",code:`CSVToArray('a,b,c\\n1,2,3') // [['a','b','c'], ['1','2','3']]
CSVToJSON('name,age\\nJohn,25') // [{ name: 'John', age: '25' }]`},{input:o(()=>[a(n(r),{vertical:""},{default:o(()=>[a(n(v),{value:l.value,"onUpdate:value":e[0]||(e[0]=g=>l.value=g),type:"textarea",style:{width:"100%"},rows:4},null,8,["value"])]),_:1})]),result:o(()=>[a(n(r),{vertical:""},{default:o(()=>[a(n(r),{align:"center"},{default:o(()=>[...e[4]||(e[4]=[t("code",{class:"code-inline"},"CSVToArray",-1)])]),_:1}),t("pre",B,i(JSON.stringify(n(C)(l.value),null,2)),1),a(n(r),{align:"center"},{default:o(()=>[...e[5]||(e[5]=[t("code",{class:"code-inline"},"CSVToJSON",-1)])]),_:1}),t("pre",I,i(JSON.stringify(n(f)(l.value),null,2)),1)]),_:1})]),_:1}),a(S,{title:"JSONToCSV / arrayToCSV",description:"Convert JSON or array to CSV string",since:"5.0.0",code:`JSONToCSV([{ name: 'John', age: 25 }], ['name', 'age'])
arrayToCSV([['a','b'], ['1','2']])`},{result:o(()=>[a(n(r),{vertical:""},{default:o(()=>[a(n(r),{align:"center"},{default:o(()=>[...e[6]||(e[6]=[t("code",{class:"code-inline"},"JSONToCSV(jsonArray, ['name', 'age', 'city'])",-1)])]),_:1}),a(n(c),{type:"info",size:"small",bordered:!1},{default:o(()=>[s(i(n(V)(m.value,["name","age","city"])),1)]),_:1}),a(n(r),{align:"center"},{default:o(()=>[...e[7]||(e[7]=[t("code",{class:"code-inline"},"arrayToCSV([['a','b'], ['1','2']])",-1)])]),_:1}),a(n(c),{type:"info",size:"small",bordered:!1},{default:o(()=>[s(i(n(N)([["a","b"],["1","2"]])),1)]),_:1})]),_:1})]),_:1}),a(S,{title:"CSV Functions Summary",description:"All CSV conversion utilities",since:"5.0.0"},{result:o(()=>[...e[8]||(e[8]=[t("pre",{class:"code-block"},`// Parse CSV string to 2D array
CSVToArray(csvString)  // string[][]

// Parse CSV string to JSON objects
CSVToJSON(csvString)   // object[]

// Convert 2D array to CSV string
arrayToCSV(array)      // string

// Convert JSON array to CSV string
JSONToCSV(jsonArray, headers?)  // string

// Example usage
const csv = 'name,age\\\\nJohn,25\\\\nJane,30'

CSVToArray(csv)
// [['name', 'age'], ['John', '25'], ['Jane', '30']]

CSVToJSON(csv)
// [{ name: 'John', age: '25' }, { name: 'Jane', age: '30' }]

arrayToCSV([['a', 'b'], ['1', '2']])
// 'a,b\\\\n1,2'

JSONToCSV([{ name: 'John', age: 25 }], ['name', 'age'])
// 'name,age\\\\nJohn,25'`,-1)])]),_:1})])}}}),M=T(w,[["__scopeId","data-v-6c71fdf6"]]);export{M as default};
