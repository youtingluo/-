import{s as k,r as u,b as r,u as p,f as e,h as c,v as b,k as N,j as f,l as h,p as n}from"./index-Ddh2s6S1.js";const P={class:"container py-3"},x={key:0},V={class:"card"},C={class:"card-body"},U={class:"mb-3"},g=["value"],B={class:"mb-3"},D={key:0},E=["placeholder"],I={key:1},M=["placeholder"],S={key:0,class:"mb-3"},T={class:"row"},j={class:"col-6"},A={class:"col-6"},L={class:"col-12 col-lg-2 mt-2"},$=["disabled"],q={key:0,class:"spinner-border spinner-border-sm me-1",role:"status","aria-hidden":"true"},G={__name:"UserProfileView",setup(z){const l=k(),m=u(!1),i=u(!1),d=u(""),t=u(""),a=u(""),y=()=>{m.value=!0,d.value=l.user.displayName},w=async()=>{try{await l.updateDisplayName(d.value),m.value=!1,d.value=""}catch(v){v.value="個人資訊更新失敗: "+v.message}},_=async()=>{i.value=!0;try{await l.reauthenticate(t.value,a.value),i.value=!1,t.value="",a.value=""}catch{i.value=!1,t.value="",a.value=""}};return(v,s)=>(n(),r("div",P,[p(l).user?(n(),r("div",x,[s[13]||(s[13]=e("h1",{class:"mb-4"},"會員中心",-1)),e("div",V,[e("div",C,[s[12]||(s[12]=e("p",{class:"card-title h5 text-primary"},"個人資料",-1)),e("form",null,[e("div",U,[s[4]||(s[4]=e("label",{for:"email",class:"form-label"},"電子郵件",-1)),e("input",{type:"email",class:"form-control",id:"email",value:p(l).user.email,disabled:""},null,8,g)]),e("div",B,[m.value?(n(),r("div",D,[s[5]||(s[5]=e("label",{for:"displayName",class:"form-label"},"暱稱",-1)),c(e("input",{class:"form-control mb-2",type:"text","onUpdate:modelValue":s[0]||(s[0]=o=>d.value=o),placeholder:p(l).user.displayName},null,8,E),[[b,d.value]]),e("button",{type:"button",class:"btn btn-primary me-2",onClick:w}," 儲存 "),e("button",{type:"button",class:"btn btn-outline-primary",onClick:s[1]||(s[1]=o=>m.value=!1)}," 取消 ")])):(n(),r("div",I,[s[6]||(s[6]=e("label",{for:"displayName",class:"form-label"},"暱稱",-1)),e("input",{type:"text",class:"form-control mb-2",id:"displayName",placeholder:p(l).user.displayName,disabled:""},null,8,M),e("button",{type:"button",onClick:y,class:"btn btn-primary"}," 修改暱稱 ")]))]),s[11]||(s[11]=e("hr",null,null,-1)),p(l).profileId==="password"?(n(),r("div",S,[s[10]||(s[10]=e("p",{class:"card-title h5 text-primary"},"修改密碼",-1)),e("div",T,[e("div",j,[s[7]||(s[7]=e("label",{for:"oldPassword",class:"form-label"},"舊密碼",-1)),c(e("input",{type:"password",class:"form-control",id:"oldPassword",placeholder:"輸入舊密碼","onUpdate:modelValue":s[2]||(s[2]=o=>t.value=o)},null,512),[[b,t.value]])]),e("div",A,[s[8]||(s[8]=e("label",{for:"newPassword",class:"form-label"},"新密碼",-1)),c(e("input",{type:"password",class:"form-control",id:"newPassword",placeholder:"輸入新密碼","onUpdate:modelValue":s[3]||(s[3]=o=>a.value=o)},null,512),[[b,a.value]])]),e("div",L,[e("button",{type:"button",class:"btn btn-primary w-100",onClick:N(_,["prevent"]),disabled:i.value||!t.value||!a.value},[i.value?(n(),r("span",q)):f("",!0),s[9]||(s[9]=h(" 確認修改 "))],8,$)])])])):f("",!0)])])])])):f("",!0)]))}};export{G as default};
