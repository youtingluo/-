import{x as N,r as u,a as r,u as p,b as s,i as c,v as b,l as k,j as y,m as x,o as n}from"./index-oLzmJPFH.js";const P={class:"container py-3"},h={key:0},V={class:"card"},C={class:"card-body"},U={class:"mb-3"},g=["value"],B={class:"mb-3"},D={key:0},E=["placeholder"],I={key:1},M=["placeholder"],S={key:0,class:"mb-3"},T={class:"row"},j={class:"col-6"},A={class:"col-6"},L={class:"col-12 col-lg-2 mt-2"},$=["disabled"],q={key:0,class:"spinner-border spinner-border-sm me-1",role:"status","aria-hidden":"true"},G={__name:"UserProfileView",setup(z){const l=N(),m=u(!1),i=u(!1),d=u(""),t=u(""),a=u(""),f=()=>{m.value=!0,d.value=l.user.displayName},w=async()=>{try{await l.updateDisplayName(d.value),m.value=!1,d.value=""}catch(v){v.value="個人資訊更新失敗: "+v.message}},_=async()=>{i.value=!0;try{await l.reauthenticate(t.value,a.value),i.value=!1,t.value="",a.value=""}catch{i.value=!1,t.value="",a.value=""}};return(v,e)=>(n(),r("div",P,[p(l).user?(n(),r("div",h,[e[13]||(e[13]=s("h1",{class:"mb-4 text-center"},"會員中心",-1)),s("div",V,[s("div",C,[e[12]||(e[12]=s("p",{class:"card-title h5 text-primary"},"個人資料",-1)),s("form",null,[s("div",U,[e[4]||(e[4]=s("label",{for:"email",class:"form-label"},"電子郵件",-1)),s("input",{type:"email",class:"form-control",id:"email",value:p(l).user.email,disabled:""},null,8,g)]),s("div",B,[m.value?(n(),r("div",D,[e[5]||(e[5]=s("label",{for:"displayName",class:"form-label"},"暱稱",-1)),c(s("input",{class:"form-control mb-2",type:"text","onUpdate:modelValue":e[0]||(e[0]=o=>d.value=o),placeholder:p(l).user.displayName},null,8,E),[[b,d.value]]),s("button",{type:"button",class:"btn btn-primary me-2",onClick:w}," 儲存 "),s("button",{type:"button",class:"btn btn-outline-primary",onClick:e[1]||(e[1]=o=>m.value=!1)}," 取消 ")])):(n(),r("div",I,[e[6]||(e[6]=s("label",{for:"displayName",class:"form-label"},"暱稱",-1)),s("input",{type:"text",class:"form-control mb-2",id:"displayName",placeholder:p(l).user.displayName,disabled:""},null,8,M),s("button",{type:"button",onClick:f,class:"btn btn-primary"}," 修改暱稱 ")]))]),e[11]||(e[11]=s("hr",null,null,-1)),p(l).profileId==="password"?(n(),r("div",S,[e[10]||(e[10]=s("p",{class:"card-title h5 text-primary"},"修改密碼",-1)),s("div",T,[s("div",j,[e[7]||(e[7]=s("label",{for:"oldPassword",class:"form-label"},"舊密碼",-1)),c(s("input",{type:"password",class:"form-control",id:"oldPassword",placeholder:"輸入舊密碼","onUpdate:modelValue":e[2]||(e[2]=o=>t.value=o)},null,512),[[b,t.value]])]),s("div",A,[e[8]||(e[8]=s("label",{for:"newPassword",class:"form-label"},"新密碼",-1)),c(s("input",{type:"password",class:"form-control",id:"newPassword",placeholder:"輸入新密碼","onUpdate:modelValue":e[3]||(e[3]=o=>a.value=o)},null,512),[[b,a.value]])]),s("div",L,[s("button",{type:"button",class:"btn btn-primary w-100",onClick:k(_,["prevent"]),disabled:i.value||!t.value||!a.value},[i.value?(n(),r("span",q)):y("",!0),e[9]||(e[9]=x(" 確認修改 "))],8,$)])])])):y("",!0)])])])])):y("",!0)]))}};export{G as default};