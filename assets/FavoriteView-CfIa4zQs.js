import{_ as x,a as k,c as w,L as b,m as D}from"./coverArray-UpVe8PT_.js";import{_ as L}from"./IndustryComponent-F4L3948v.js";import{D as M,r as u,d as V,e as $,a as r,f as i,h as F,u as S,b as o,F as p,k as T,o as n,q as j}from"./index-oLzmJPFH.js";const z={class:"container py-3"},B={class:"row g-3"},C={key:1,class:"text-center"},q={__name:"FavoriteView",setup(N){const d=M(),v=j(),m="AIzaSyD5bMMUbcVKn0XhDjWNzZOZ0_YQwQjd2nU",f="1z-irp4iTLpHxl64hk6cGQ-94d4x5cTbZwHlV3eRw8fM",s=u(!1),l=u([]);async function y(){s.value=!0;const e=`https://sheets.googleapis.com/v4/spreadsheets/${f}/values/全部?key=${m}`;try{const h=await(await k.get(e)).data.values;l.value=w(h),s.value=!1}catch(t){s.value=!1,console.error("Error fetching values:",t)}}const g=a=>D(a.filter(t=>d.favorites.includes(t.廠商))),c=V(()=>g(l.value));function _(a){v.push({path:`company/${a}`,query:{search:"",selectedindustry:"",MultipleTypeArray:[],selected:[]}})}return $(()=>{y()}),(a,e)=>(n(),r(p,null,[i(S(b),{active:s.value,"onUpdate:active":e[0]||(e[0]=t=>s.value=t)},{default:F(()=>e[1]||(e[1]=[o("div",{class:"loader"},null,-1)])),_:1},8,["active"]),o("div",z,[e[3]||(e[3]=o("h1",{class:"mb-4 text-center"},"收藏項目",-1)),o("div",B,[c.value.length?(n(!0),r(p,{key:0},T(c.value,t=>(n(),r("div",{class:"col-6 col-lg-3",key:t},[i(L,{onGoCompany:_,company:t,"mutiple-type-array":[],tag:["編號","廠商","網址","類別","公司簡介","評測"]},null,8,["company"])]))),128)):(n(),r("div",C,e[2]||(e[2]=[o("img",{class:"text-center",src:x,alt:"尚無資料"},null,-1)])))])])],64))}};export{q as default};