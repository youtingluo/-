import{e as v,a as u,b as a,j as s,k as y,z as f,o as p,m as d,n as r,d as V,A as x}from"./index-Dci7ro-i.js";const M={class:"container py-3"},q={class:"row justify-content-center mb-3"},F={class:"col-lg-8"},N={class:"mb-3"},j={class:"mb-3"},_={class:"mb-3"},z={class:"mb-3"},E={key:0},S={class:"mb-2"},T={class:"mb-3"},B={key:1},O={class:"row mb-2"},$={class:"col"},A={class:"col"},J={class:"mb-3"},L=["disabled"],P={key:0,class:"spinner-border spinner-border-sm",role:"status","aria-hidden":"true"},H={__name:"ContributeView",setup(D){const C=x("$toast"),k=x("$swal"),m=v(!1),b=v(null),l=v({name:"",company:"",email:"",phone:"",type:"",cooperateCompany:"",cooperateContent:"",manufacturer:"",recipe:"",experience:""}),g=()=>{l.value.manufacturer="",l.value.recipe="",l.value.experience="",l.value.cooperateCompany="",l.value.cooperateContent=""},w=async()=>{m.value=!0;try{(await fetch("https://formspree.io/f/mzzbbjkj",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({聯絡人名稱:l.value.name,代表單位:l.value.company,聯絡信箱:l.value.email,聯絡電話:l.value.phone,回饋方案:l.value.type,公司名稱:l.value.cooperateCompany,合作方案:l.value.cooperateContent,食品廠商:l.value.manufacturer,食材:l.value.recipe,食譜與心得:l.value.experience})})).ok&&(m.value=!1,C.fire({icon:"success",title:"信件寄出成功"}),b.value.resetForm())}catch(c){m.value=!1,console.error("Error:",c),k.fire({icon:"error",title:"信件寄出失敗"})}};return(c,e)=>{const t=f("VField"),i=f("ErrorMessage"),U=f("VForm");return p(),u("div",M,[e[22]||(e[22]=a("h1",{class:"mb-4"},"投稿",-1)),a("div",q,[a("div",F,[s(U,{ref_key:"sendForm",ref:b,onSubmit:w},{default:y(({errors:n})=>[a("div",N,[e[10]||(e[10]=a("label",{for:"contactName",class:"form-label"},[d("聯絡人名稱"),a("span",{class:"text-danger"},"*")],-1)),s(t,{name:"聯絡人",type:"text",class:r(["form-control",{"is-invalid":n.聯絡人}]),id:"contactName",placeholder:"聯絡人名稱",modelValue:l.value.name,"onUpdate:modelValue":e[0]||(e[0]=o=>l.value.name=o),modelModifiers:{trim:!0},rules:"required"},null,8,["modelValue","class"]),s(i,{name:"聯絡人",class:"invalid-feedback"})]),a("div",j,[e[11]||(e[11]=a("label",{for:"company",class:"form-label"},"代表單位(公司)",-1)),s(t,{name:"company",type:"text",class:"form-control",id:"company",placeholder:"單位名稱",modelValue:l.value.company,"onUpdate:modelValue":e[1]||(e[1]=o=>l.value.company=o),modelModifiers:{trim:!0}},null,8,["modelValue"])]),a("div",_,[e[12]||(e[12]=a("label",{for:"email",class:"form-label"},[d("聯絡信箱"),a("span",{class:"text-danger"},"*")],-1)),s(t,{name:"聯絡信箱",type:"email",class:r(["form-control",{"is-invalid":n.聯絡信箱}]),id:"email",placeholder:"聯絡信箱",modelValue:l.value.email,"onUpdate:modelValue":e[2]||(e[2]=o=>l.value.email=o),modelModifiers:{trim:!0},rules:"required|email"},null,8,["modelValue","class"]),s(i,{name:"聯絡信箱",class:"invalid-feedback"})]),a("div",z,[e[13]||(e[13]=a("label",{for:"tel",class:"form-label"},"聯絡電話",-1)),s(t,{name:"聯絡電話",type:"tel",class:r(["form-control",{"is-invalid":n.聯絡電話}]),id:"tel",placeholder:"聯絡電話",modelValue:l.value.phone,"onUpdate:modelValue":e[3]||(e[3]=o=>l.value.phone=o),modelModifiers:{number:!0,trim:!0},rules:"numeric|min:8"},null,8,["modelValue","class"]),s(i,{name:"聯絡電話",class:"invalid-feedback"})]),e[21]||(e[21]=a("hr",null,null,-1)),s(t,{onChange:g,class:r(["form-select mb-3",{"is-invalid":n.回饋方案}]),name:"回饋方案","aria-label":"回饋方案",modelValue:l.value.type,"onUpdate:modelValue":e[4]||(e[4]=o=>l.value.type=o),rules:"required",as:"select"},{default:y(()=>e[14]||(e[14]=[a("option",{disabled:"",value:""},"選擇回饋方案",-1),a("option",{value:"合作聯繫"},"合作聯繫",-1),a("option",{value:"實際評測"},"實際評測",-1)])),_:2},1032,["modelValue","class"]),l.value.type==="合作聯繫"?(p(),u("div",E,[a("div",S,[e[15]||(e[15]=a("label",{for:"cooperateCompany",class:"form-label"},[d("公司"),a("span",{class:"text-danger"},"*")],-1)),s(t,{name:"公司名稱",type:"text",class:r(["form-control",{"is-invalid":n.公司名稱}]),id:"cooperateCompany",placeholder:"公司名稱",modelValue:l.value.cooperateCompany,"onUpdate:modelValue":e[5]||(e[5]=o=>l.value.cooperateCompany=o),modelModifiers:{trim:!0},rules:"required"},null,8,["modelValue","class"]),s(i,{name:"公司名稱",class:"invalid-feedback"})]),a("div",T,[e[16]||(e[16]=a("label",{for:"case",class:"form-label"},[d("合作方案"),a("span",{class:"text-danger"},"*")],-1)),s(t,{name:"合作內容",type:"text",class:r(["form-control",{"is-invalid":n.合作內容}]),id:"case",placeholder:"合作內容",modelValue:l.value.cooperateContent,"onUpdate:modelValue":e[6]||(e[6]=o=>l.value.cooperateContent=o),rows:"4",as:"textarea",rules:"required"},null,8,["modelValue","class"]),s(i,{name:"合作內容",class:"invalid-feedback"})])])):l.value.type==="實際評測"?(p(),u("div",B,[a("div",O,[a("div",$,[e[17]||(e[17]=a("label",{for:"manufacturer",class:"form-label"},[d("廠商"),a("span",{class:"text-danger"},"*")],-1)),s(t,{name:"食品廠商",id:"manufacturer",type:"text",class:r(["form-control",{"is-invalid":n.食品廠商}]),placeholder:"食品廠商","aria-label":"First name",modelValue:l.value.manufacturer,"onUpdate:modelValue":e[7]||(e[7]=o=>l.value.manufacturer=o),modelModifiers:{trim:!0},rules:"required"},null,8,["modelValue","class"]),s(i,{name:"食品廠商",class:"invalid-feedback"})]),a("div",A,[e[18]||(e[18]=a("label",{for:"recip",class:"form-label"},[d("食材"),a("span",{class:"text-danger"},"*")],-1)),s(t,{name:"食材",id:"recip",type:"text",class:r(["form-control",{"is-invalid":n.食材}]),placeholder:"範例：珍珠/紅茶/貢丸",modelValue:l.value.recipe,"onUpdate:modelValue":e[8]||(e[8]=o=>l.value.recipe=o),modelModifiers:{trim:!0},rules:"required"},null,8,["modelValue","class"]),s(i,{name:"食材",class:"invalid-feedback"})])]),a("div",J,[e[19]||(e[19]=a("label",{class:"form-label",for:"experience"},[d("食譜與心得"),a("span",{class:"text-danger"},"*")],-1)),s(t,{name:"食譜與心得",class:r(["form-control",{"is-invalid":n.食譜與心得}]),placeholder:"食譜作法必填,包含心得,最少200字",id:"experience",rows:"8",modelValue:l.value.experience,"onUpdate:modelValue":e[9]||(e[9]=o=>l.value.experience=o),as:"textarea",rules:"required|min:200"},null,8,["modelValue","class"]),s(i,{name:"食譜與心得",class:"invalid-feedback"})])])):V("",!0),a("button",{type:"submit",class:"btn btn-primary w-100",disabled:m.value},[m.value?(p(),u("span",P)):V("",!0),e[20]||(e[20]=d(" 寄出信件 "))],8,L)]),_:1},512)])])])}}};export{H as default};
