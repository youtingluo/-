import{x,r as l,y as V,a as p,b as e,f as g,h as w,l as N,i as d,v as u,u as y,k as _,m,t as R,z as S,o as v}from"./index-CGl8i4wn.js";const T={class:"container py-3"},C={class:"row justify-content-center"},U={class:"col-lg-6"},h={class:"nav nav-tabs",ref:"loginTab",role:"tablist"},B={class:"nav-item",role:"presentation"},L={class:"tab-content bg-white p-3 rounded",id:"myTabContent"},M={class:"tab-pane show active"},P={class:"mb-3"},j={class:"mb-3"},D={class:"mb-3"},z={class:"mb-3"},A={class:"d-flex justify-content-between align-items-center"},E=["disabled"],q={key:0,class:"spinner-border spinner-border-sm me-1",role:"status","aria-hidden":"true"},F={key:0,class:"text-danger mt-1"},J={__name:"SignupView",setup(G){const b=x(),a=l(""),n=l(""),o=l(""),i=l(""),r=l(""),{piniaLoading:c}=V(b),k=async()=>{if(o.value!==i.value){r.value="密碼與確認密碼不相符";return}r.value="",b.validateRegistration(n.value,o.value,a.value)};return(H,s)=>{const f=S("RouterLink");return v(),p("div",T,[e("div",C,[e("div",U,[s[13]||(s[13]=e("h1",{class:"mb-3 text-center"},"註冊",-1)),e("ul",h,[s[5]||(s[5]=e("li",{class:"nav-item me-auto",role:"presentation"},[e("div",{class:"nav-link active"},"註冊")],-1)),e("li",B,[g(f,{class:"nav-link text-dark fs-6",to:"/"},{default:w(()=>s[4]||(s[4]=[e("span",{class:"material-symbols-outlined d-inline-block align-bottom"}," home ",-1),m("回首頁")])),_:1})])],512),e("div",L,[e("div",M,[e("form",{onSubmit:N(k,["prevent"])},[e("div",P,[s[6]||(s[6]=e("label",{for:"signup-userName",class:"form-label"},"暱稱",-1)),d(e("input",{type:"text",class:"form-control",id:"signup-userName",placeholder:"請輸入暱稱","onUpdate:modelValue":s[0]||(s[0]=t=>a.value=t)},null,512),[[u,a.value]])]),e("div",j,[s[7]||(s[7]=e("label",{for:"signup-email",class:"form-label"},"信箱",-1)),d(e("input",{type:"email",class:"form-control",id:"signup-email",placeholder:"請輸入電子信箱","onUpdate:modelValue":s[1]||(s[1]=t=>n.value=t)},null,512),[[u,n.value]])]),e("div",D,[s[8]||(s[8]=e("label",{for:"password1",class:"form-label"},"密碼",-1)),d(e("input",{type:"password",class:"form-control",id:"password1",placeholder:"請輸入密碼","onUpdate:modelValue":s[2]||(s[2]=t=>o.value=t)},null,512),[[u,o.value]])]),e("div",z,[s[9]||(s[9]=e("label",{for:"confirmPassword",class:"form-label"},"確認密碼",-1)),d(e("input",{type:"password",class:"form-control",id:"confirmPassword",placeholder:"請再次輸入密碼","onUpdate:modelValue":s[3]||(s[3]=t=>i.value=t)},null,512),[[u,i.value]])]),e("div",A,[e("button",{type:"submit",class:"btn btn-primary flex-grow-1 me-3",disabled:y(c)||!a.value||!n.value||!o.value||!i.value},[y(c)?(v(),p("span",q)):_("",!0),s[10]||(s[10]=m(" 註冊 "))],8,E),g(f,{to:"login",class:"btn btn-outline-dark"},{default:w(()=>s[11]||(s[11]=[m("前往登入")])),_:1})])],32),r.value?(v(),p("p",F,[s[12]||(s[12]=e("span",{class:"material-symbols-outlined d-inline-block align-middle"}," cancel ",-1)),m(" "+R(r.value),1)])):_("",!0)])])])])])}}};export{J as default};
