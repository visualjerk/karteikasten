import{d as U,j as i,A as $,c as p,B as F,C as E,a as c,F as T,r as D,b as o,w as s,o as m,f as K,D as N,g as V,x as j,v as M}from"./index.c6f947fd.js";import{_ as A,a as L}from"./ActionButton.vue_vue_type_script_setup_true_lang.8458e544.js";import{B as v,_ as u}from"./BoxCardInput.vue_vue_type_script_setup_true_lang.13f53f8a.js";import{u as _}from"./boxes.22127125.js";import"./index.65b83da4.js";const R={class:"grid gap-2 mb-6"},S={class:"flex gap-3 justify-between"},q=V("Save Changes"),z=V("Discard Changes"),P=U({__name:"BoxEdit",props:{box:null},setup(x){const b=x,{push:k}=j(),{getCopy:B,addCardToBox:C}=_(),a=i(B(b.box.id)),d=i(),l=i({front:"",back:""});function f(){!a.value||C(a.value,l.value)}async function h(){var t;f(),l.value={front:"",back:""},await M(),(t=d.value)==null||t.$el.focus()}const{set:w}=_();function y(){!a.value||(f(),w(a.value),k(`/box/${a.value.id}`))}return $(()=>{var t;(t=d.value)==null||t.$el.focus()}),(t,n)=>(m(),p("div",null,[F(c("input",{"onUpdate:modelValue":n[0]||(n[0]=e=>a.value.name=e),class:"h1 w-full bg-transparent mb-8"},null,512),[[E,a.value.name]]),c("div",R,[(m(!0),p(T,null,D(a.value.cards,(e,g)=>(m(),K(v,{key:g},{default:s(()=>[o(u,{modelValue:e.front,"onUpdate:modelValue":r=>e.front=r,placeholder:"Frontside ..."},null,8,["modelValue","onUpdate:modelValue"]),o(u,{modelValue:e.back,"onUpdate:modelValue":r=>e.back=r,placeholder:"Backside ..."},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024))),128)),o(v,null,{default:s(()=>[o(u,{ref_key:"inputFrontEl",ref:d,modelValue:l.value.front,"onUpdate:modelValue":n[1]||(n[1]=e=>l.value.front=e),placeholder:"Frontside ...",autofocus:""},null,8,["modelValue"]),o(u,{modelValue:l.value.back,"onUpdate:modelValue":n[2]||(n[2]=e=>l.value.back=e),onKeydown:N(h,["enter"]),placeholder:"Backside ..."},null,8,["modelValue","onKeydown"])]),_:1})]),c("div",S,[o(A,{onClick:y,primary:""},{default:s(()=>[q]),_:1}),o(L,{to:`/box/${a.value.id}`},{default:s(()=>[z]),_:1},8,["to"])])]))}});export{P as default};
