import{a as w,_ as x}from"./axios-CY2WsjS1.js";import{bO as C,aS as u,aC as V,aX as A,aK as i,u as c,v as e,I as B,bH as L,at as m,b9 as h,t as d,F as O}from"./index-ZawvAhS6.js";const j={class:"navbar bg-white shadow-sm mb-5 sticky-top"},D={class:"container"},I={class:"d-flex w-100"},R={class:"container"},S={class:"mb-5"},T={class:"d-flex justify-content-between"},z={key:0,class:"fs-3 placeholder-glow"},E=["href"],F={key:0,class:"placeholder-glow"},G={__name:"companyView",setup(H){const p=C(),a=u({});function _(){console.log(p);const o=p.params.id,s=v.value.filter(t=>t.編號===o);a.value=s[0],l.value=!1}const b="AIzaSyBD47B-9Q5OFIvDYEZXmv7WrcVb-7eoT_A",g="1z-irp4iTLpHxl64hk6cGQ-94d4x5cTbZwHlV3eRw8fM",v=u([]),l=u(!1);async function k(){l.value=!0;const s=`https://sheets.googleapis.com/v4/spreadsheets/${g}/values/全部!A1:AA70?key=${b}`;try{const n=(await w.get(s)).data.values;v.value=y(n),_()}catch(t){l.value=!1,console.error("Error fetching values:",t)}}function y(o){const s=o[0],t=[];for(let n=1;n<o.length;n++){const f={};for(let r=0;r<s.length;r++)f[s[r]]=o[n][r];t.push(f)}return t}return V(()=>{k()}),(o,s)=>{const t=A("RouterLink");return i(),c(O,null,[e("nav",j,[e("div",D,[e("div",I,[e("div",null,[B(t,{class:"navbar-brand",to:"/"},{default:L(()=>s[0]||(s[0]=[e("img",{src:x,alt:"LOGO"},null,-1)])),_:1})])])])]),e("div",R,[e("div",S,[e("div",T,[a.value?(i(),c("h2",z,[e("span",{class:m({placeholder:l.value})},h(a.value.廠商),3)])):d("",!0),e("div",null,[a.value?(i(),c("a",{key:0,href:a.value.網址,target:"_blank",class:"fs-3 me-3 link-dark"},s[1]||(s[1]=[e("i",{class:"bi bi-globe"},null,-1)]),8,E)):d("",!0),s[2]||(s[2]=e("a",{class:"fs-3 text-dark"},[e("i",{class:"bi bi-heart"})],-1))])]),e("div",null,[s[3]||(s[3]=e("h3",{class:"mt-3 fs-6"},"公司介紹",-1)),a.value?(i(),c("p",F,[e("span",{class:m({placeholder:l.value})},h(a.value.公司簡介),3)])):d("",!0)])]),s[4]||(s[4]=e("p",{class:"fs-6 mb-2"},"實際評測",-1)),s[5]||(s[5]=e("p",{class:"fs-3 text-danger"},"規劃中，陸續更新，敬請期待！",-1))])],64)}}};export{G as default};
