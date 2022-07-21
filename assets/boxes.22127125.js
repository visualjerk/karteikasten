import{c as Yt,u as Xt}from"./index.65b83da4.js";import{h as rt,u as z}from"./index.c6f947fd.js";var Zt=typeof global=="object"&&global&&global.Object===Object&&global;const St=Zt;var Qt=typeof self=="object"&&self&&self.Object===Object&&self,kt=St||Qt||Function("return this")();const d=kt;var te=d.Symbol;const O=te;var wt=Object.prototype,ee=wt.hasOwnProperty,re=wt.toString,P=O?O.toStringTag:void 0;function ne(t){var e=ee.call(t,P),r=t[P];try{t[P]=void 0;var n=!0}catch{}var f=re.call(t);return n&&(e?t[P]=r:delete t[P]),f}var ae=Object.prototype,oe=ae.toString;function ie(t){return oe.call(t)}var se="[object Null]",ce="[object Undefined]",nt=O?O.toStringTag:void 0;function M(t){return t==null?t===void 0?ce:se:nt&&nt in Object(t)?ne(t):ie(t)}function F(t){return t!=null&&typeof t=="object"}var ue=Array.isArray;const J=ue;function B(t){var e=typeof t;return t!=null&&(e=="object"||e=="function")}var fe="[object AsyncFunction]",le="[object Function]",pe="[object GeneratorFunction]",ge="[object Proxy]";function xt(t){if(!B(t))return!1;var e=M(t);return e==le||e==pe||e==fe||e==ge}var de=d["__core-js_shared__"];const R=de;var at=function(){var t=/[^.]+$/.exec(R&&R.keys&&R.keys.IE_PROTO||"");return t?"Symbol(src)_1."+t:""}();function be(t){return!!at&&at in t}var he=Function.prototype,ye=he.toString;function T(t){if(t!=null){try{return ye.call(t)}catch{}try{return t+""}catch{}}return""}var ve=/[\\^$.*+?()[\]{}|]/g,$e=/^\[object .+?Constructor\]$/,_e=Function.prototype,Te=Object.prototype,je=_e.toString,me=Te.hasOwnProperty,Ae=RegExp("^"+je.call(me).replace(ve,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");function Oe(t){if(!B(t)||be(t))return!1;var e=xt(t)?Ae:$e;return e.test(T(t))}function Se(t,e){return t==null?void 0:t[e]}function j(t,e){var r=Se(t,e);return Oe(r)?r:void 0}var we=j(d,"WeakMap");const H=we;var ot=Object.create,xe=function(){function t(){}return function(e){if(!B(e))return{};if(ot)return ot(e);t.prototype=e;var r=new t;return t.prototype=void 0,r}}();const Pe=xe;function Ie(t,e){var r=-1,n=t.length;for(e||(e=Array(n));++r<n;)e[r]=t[r];return e}var Ce=function(){try{var t=j(Object,"defineProperty");return t({},"",{}),t}catch{}}();const it=Ce;function Ee(t,e){for(var r=-1,n=t==null?0:t.length;++r<n&&e(t[r],r,t)!==!1;);return t}var Me=9007199254740991,Fe=/^(?:0|[1-9]\d*)$/;function Be(t,e){var r=typeof t;return e=e==null?Me:e,!!e&&(r=="number"||r!="symbol"&&Fe.test(t))&&t>-1&&t%1==0&&t<e}function Pt(t,e,r){e=="__proto__"&&it?it(t,e,{configurable:!0,enumerable:!0,value:r,writable:!0}):t[e]=r}function It(t,e){return t===e||t!==t&&e!==e}var De=Object.prototype,Ue=De.hasOwnProperty;function Ct(t,e,r){var n=t[e];(!(Ue.call(t,e)&&It(n,r))||r===void 0&&!(e in t))&&Pt(t,e,r)}function G(t,e,r,n){var f=!r;r||(r={});for(var c=-1,s=e.length;++c<s;){var l=e[c],p=n?n(r[l],t[l],l,r,t):void 0;p===void 0&&(p=t[l]),f?Pt(r,l,p):Ct(r,l,p)}return r}var Ge=9007199254740991;function Et(t){return typeof t=="number"&&t>-1&&t%1==0&&t<=Ge}function Mt(t){return t!=null&&Et(t.length)&&!xt(t)}var Le=Object.prototype;function Y(t){var e=t&&t.constructor,r=typeof e=="function"&&e.prototype||Le;return t===r}function Ne(t,e){for(var r=-1,n=Array(t);++r<t;)n[r]=e(r);return n}var ze="[object Arguments]";function st(t){return F(t)&&M(t)==ze}var Ft=Object.prototype,Re=Ft.hasOwnProperty,Ke=Ft.propertyIsEnumerable,He=st(function(){return arguments}())?st:function(t){return F(t)&&Re.call(t,"callee")&&!Ke.call(t,"callee")};const Ve=He;function We(){return!1}var Bt=typeof exports=="object"&&exports&&!exports.nodeType&&exports,ct=Bt&&typeof module=="object"&&module&&!module.nodeType&&module,qe=ct&&ct.exports===Bt,ut=qe?d.Buffer:void 0,Je=ut?ut.isBuffer:void 0,Ye=Je||We;const Dt=Ye;var Xe="[object Arguments]",Ze="[object Array]",Qe="[object Boolean]",ke="[object Date]",tr="[object Error]",er="[object Function]",rr="[object Map]",nr="[object Number]",ar="[object Object]",or="[object RegExp]",ir="[object Set]",sr="[object String]",cr="[object WeakMap]",ur="[object ArrayBuffer]",fr="[object DataView]",lr="[object Float32Array]",pr="[object Float64Array]",gr="[object Int8Array]",dr="[object Int16Array]",br="[object Int32Array]",hr="[object Uint8Array]",yr="[object Uint8ClampedArray]",vr="[object Uint16Array]",$r="[object Uint32Array]",i={};i[lr]=i[pr]=i[gr]=i[dr]=i[br]=i[hr]=i[yr]=i[vr]=i[$r]=!0;i[Xe]=i[Ze]=i[ur]=i[Qe]=i[fr]=i[ke]=i[tr]=i[er]=i[rr]=i[nr]=i[ar]=i[or]=i[ir]=i[sr]=i[cr]=!1;function _r(t){return F(t)&&Et(t.length)&&!!i[M(t)]}function X(t){return function(e){return t(e)}}var Ut=typeof exports=="object"&&exports&&!exports.nodeType&&exports,I=Ut&&typeof module=="object"&&module&&!module.nodeType&&module,Tr=I&&I.exports===Ut,K=Tr&&St.process,jr=function(){try{var t=I&&I.require&&I.require("util").types;return t||K&&K.binding&&K.binding("util")}catch{}}();const S=jr;var ft=S&&S.isTypedArray,mr=ft?X(ft):_r;const Ar=mr;var Or=Object.prototype,Sr=Or.hasOwnProperty;function Gt(t,e){var r=J(t),n=!r&&Ve(t),f=!r&&!n&&Dt(t),c=!r&&!n&&!f&&Ar(t),s=r||n||f||c,l=s?Ne(t.length,String):[],p=l.length;for(var a in t)(e||Sr.call(t,a))&&!(s&&(a=="length"||f&&(a=="offset"||a=="parent")||c&&(a=="buffer"||a=="byteLength"||a=="byteOffset")||Be(a,p)))&&l.push(a);return l}function Lt(t,e){return function(r){return t(e(r))}}var wr=Lt(Object.keys,Object);const xr=wr;var Pr=Object.prototype,Ir=Pr.hasOwnProperty;function Cr(t){if(!Y(t))return xr(t);var e=[];for(var r in Object(t))Ir.call(t,r)&&r!="constructor"&&e.push(r);return e}function Z(t){return Mt(t)?Gt(t):Cr(t)}function Er(t){var e=[];if(t!=null)for(var r in Object(t))e.push(r);return e}var Mr=Object.prototype,Fr=Mr.hasOwnProperty;function Br(t){if(!B(t))return Er(t);var e=Y(t),r=[];for(var n in t)n=="constructor"&&(e||!Fr.call(t,n))||r.push(n);return r}function Q(t){return Mt(t)?Gt(t,!0):Br(t)}var Dr=j(Object,"create");const C=Dr;function Ur(){this.__data__=C?C(null):{},this.size=0}function Gr(t){var e=this.has(t)&&delete this.__data__[t];return this.size-=e?1:0,e}var Lr="__lodash_hash_undefined__",Nr=Object.prototype,zr=Nr.hasOwnProperty;function Rr(t){var e=this.__data__;if(C){var r=e[t];return r===Lr?void 0:r}return zr.call(e,t)?e[t]:void 0}var Kr=Object.prototype,Hr=Kr.hasOwnProperty;function Vr(t){var e=this.__data__;return C?e[t]!==void 0:Hr.call(e,t)}var Wr="__lodash_hash_undefined__";function qr(t,e){var r=this.__data__;return this.size+=this.has(t)?0:1,r[t]=C&&e===void 0?Wr:e,this}function _(t){var e=-1,r=t==null?0:t.length;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}_.prototype.clear=Ur;_.prototype.delete=Gr;_.prototype.get=Rr;_.prototype.has=Vr;_.prototype.set=qr;function Jr(){this.__data__=[],this.size=0}function L(t,e){for(var r=t.length;r--;)if(It(t[r][0],e))return r;return-1}var Yr=Array.prototype,Xr=Yr.splice;function Zr(t){var e=this.__data__,r=L(e,t);if(r<0)return!1;var n=e.length-1;return r==n?e.pop():Xr.call(e,r,1),--this.size,!0}function Qr(t){var e=this.__data__,r=L(e,t);return r<0?void 0:e[r][1]}function kr(t){return L(this.__data__,t)>-1}function tn(t,e){var r=this.__data__,n=L(r,t);return n<0?(++this.size,r.push([t,e])):r[n][1]=e,this}function b(t){var e=-1,r=t==null?0:t.length;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}b.prototype.clear=Jr;b.prototype.delete=Zr;b.prototype.get=Qr;b.prototype.has=kr;b.prototype.set=tn;var en=j(d,"Map");const E=en;function rn(){this.size=0,this.__data__={hash:new _,map:new(E||b),string:new _}}function nn(t){var e=typeof t;return e=="string"||e=="number"||e=="symbol"||e=="boolean"?t!=="__proto__":t===null}function N(t,e){var r=t.__data__;return nn(e)?r[typeof e=="string"?"string":"hash"]:r.map}function an(t){var e=N(this,t).delete(t);return this.size-=e?1:0,e}function on(t){return N(this,t).get(t)}function sn(t){return N(this,t).has(t)}function cn(t,e){var r=N(this,t),n=r.size;return r.set(t,e),this.size+=r.size==n?0:1,this}function w(t){var e=-1,r=t==null?0:t.length;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}w.prototype.clear=rn;w.prototype.delete=an;w.prototype.get=on;w.prototype.has=sn;w.prototype.set=cn;function Nt(t,e){for(var r=-1,n=e.length,f=t.length;++r<n;)t[f+r]=e[r];return t}var un=Lt(Object.getPrototypeOf,Object);const zt=un;function fn(){this.__data__=new b,this.size=0}function ln(t){var e=this.__data__,r=e.delete(t);return this.size=e.size,r}function pn(t){return this.__data__.get(t)}function gn(t){return this.__data__.has(t)}var dn=200;function bn(t,e){var r=this.__data__;if(r instanceof b){var n=r.__data__;if(!E||n.length<dn-1)return n.push([t,e]),this.size=++r.size,this;r=this.__data__=new w(n)}return r.set(t,e),this.size=r.size,this}function x(t){var e=this.__data__=new b(t);this.size=e.size}x.prototype.clear=fn;x.prototype.delete=ln;x.prototype.get=pn;x.prototype.has=gn;x.prototype.set=bn;function hn(t,e){return t&&G(e,Z(e),t)}function yn(t,e){return t&&G(e,Q(e),t)}var Rt=typeof exports=="object"&&exports&&!exports.nodeType&&exports,lt=Rt&&typeof module=="object"&&module&&!module.nodeType&&module,vn=lt&&lt.exports===Rt,pt=vn?d.Buffer:void 0,gt=pt?pt.allocUnsafe:void 0;function $n(t,e){if(e)return t.slice();var r=t.length,n=gt?gt(r):new t.constructor(r);return t.copy(n),n}function _n(t,e){for(var r=-1,n=t==null?0:t.length,f=0,c=[];++r<n;){var s=t[r];e(s,r,t)&&(c[f++]=s)}return c}function Kt(){return[]}var Tn=Object.prototype,jn=Tn.propertyIsEnumerable,dt=Object.getOwnPropertySymbols,mn=dt?function(t){return t==null?[]:(t=Object(t),_n(dt(t),function(e){return jn.call(t,e)}))}:Kt;const k=mn;function An(t,e){return G(t,k(t),e)}var On=Object.getOwnPropertySymbols,Sn=On?function(t){for(var e=[];t;)Nt(e,k(t)),t=zt(t);return e}:Kt;const Ht=Sn;function wn(t,e){return G(t,Ht(t),e)}function Vt(t,e,r){var n=e(t);return J(t)?n:Nt(n,r(t))}function xn(t){return Vt(t,Z,k)}function Pn(t){return Vt(t,Q,Ht)}var In=j(d,"DataView");const V=In;var Cn=j(d,"Promise");const W=Cn;var En=j(d,"Set");const q=En;var bt="[object Map]",Mn="[object Object]",ht="[object Promise]",yt="[object Set]",vt="[object WeakMap]",$t="[object DataView]",Fn=T(V),Bn=T(E),Dn=T(W),Un=T(q),Gn=T(H),$=M;(V&&$(new V(new ArrayBuffer(1)))!=$t||E&&$(new E)!=bt||W&&$(W.resolve())!=ht||q&&$(new q)!=yt||H&&$(new H)!=vt)&&($=function(t){var e=M(t),r=e==Mn?t.constructor:void 0,n=r?T(r):"";if(n)switch(n){case Fn:return $t;case Bn:return bt;case Dn:return ht;case Un:return yt;case Gn:return vt}return e});const tt=$;var Ln=Object.prototype,Nn=Ln.hasOwnProperty;function zn(t){var e=t.length,r=new t.constructor(e);return e&&typeof t[0]=="string"&&Nn.call(t,"index")&&(r.index=t.index,r.input=t.input),r}var Rn=d.Uint8Array;const _t=Rn;function et(t){var e=new t.constructor(t.byteLength);return new _t(e).set(new _t(t)),e}function Kn(t,e){var r=e?et(t.buffer):t.buffer;return new t.constructor(r,t.byteOffset,t.byteLength)}var Hn=/\w*$/;function Vn(t){var e=new t.constructor(t.source,Hn.exec(t));return e.lastIndex=t.lastIndex,e}var Tt=O?O.prototype:void 0,jt=Tt?Tt.valueOf:void 0;function Wn(t){return jt?Object(jt.call(t)):{}}function qn(t,e){var r=e?et(t.buffer):t.buffer;return new t.constructor(r,t.byteOffset,t.length)}var Jn="[object Boolean]",Yn="[object Date]",Xn="[object Map]",Zn="[object Number]",Qn="[object RegExp]",kn="[object Set]",ta="[object String]",ea="[object Symbol]",ra="[object ArrayBuffer]",na="[object DataView]",aa="[object Float32Array]",oa="[object Float64Array]",ia="[object Int8Array]",sa="[object Int16Array]",ca="[object Int32Array]",ua="[object Uint8Array]",fa="[object Uint8ClampedArray]",la="[object Uint16Array]",pa="[object Uint32Array]";function ga(t,e,r){var n=t.constructor;switch(e){case ra:return et(t);case Jn:case Yn:return new n(+t);case na:return Kn(t,r);case aa:case oa:case ia:case sa:case ca:case ua:case fa:case la:case pa:return qn(t,r);case Xn:return new n;case Zn:case ta:return new n(t);case Qn:return Vn(t);case kn:return new n;case ea:return Wn(t)}}function da(t){return typeof t.constructor=="function"&&!Y(t)?Pe(zt(t)):{}}var ba="[object Map]";function ha(t){return F(t)&&tt(t)==ba}var mt=S&&S.isMap,ya=mt?X(mt):ha;const va=ya;var $a="[object Set]";function _a(t){return F(t)&&tt(t)==$a}var At=S&&S.isSet,Ta=At?X(At):_a;const ja=Ta;var ma=1,Aa=2,Oa=4,Wt="[object Arguments]",Sa="[object Array]",wa="[object Boolean]",xa="[object Date]",Pa="[object Error]",qt="[object Function]",Ia="[object GeneratorFunction]",Ca="[object Map]",Ea="[object Number]",Jt="[object Object]",Ma="[object RegExp]",Fa="[object Set]",Ba="[object String]",Da="[object Symbol]",Ua="[object WeakMap]",Ga="[object ArrayBuffer]",La="[object DataView]",Na="[object Float32Array]",za="[object Float64Array]",Ra="[object Int8Array]",Ka="[object Int16Array]",Ha="[object Int32Array]",Va="[object Uint8Array]",Wa="[object Uint8ClampedArray]",qa="[object Uint16Array]",Ja="[object Uint32Array]",o={};o[Wt]=o[Sa]=o[Ga]=o[La]=o[wa]=o[xa]=o[Na]=o[za]=o[Ra]=o[Ka]=o[Ha]=o[Ca]=o[Ea]=o[Jt]=o[Ma]=o[Fa]=o[Ba]=o[Da]=o[Va]=o[Wa]=o[qa]=o[Ja]=!0;o[Pa]=o[qt]=o[Ua]=!1;function U(t,e,r,n,f,c){var s,l=e&ma,p=e&Aa,a=e&Oa;if(r&&(s=f?r(t,n,f,c):r(t)),s!==void 0)return s;if(!B(t))return t;var u=J(t);if(u){if(s=zn(t),!l)return Ie(t,s)}else{var g=tt(t),m=g==qt||g==Ia;if(Dt(t))return $n(t,l);if(g==Jt||g==Wt||m&&!f){if(s=p||m?{}:da(t),!l)return p?wn(t,yn(s,t)):An(t,hn(s,t))}else{if(!o[g])return f?t:{};s=ga(t,g,l)}}c||(c=new x);var y=c.get(t);if(y)return y;c.set(t,s),ja(t)?t.forEach(function(h){s.add(U(h,e,r,h,t,c))}):va(t)&&t.forEach(function(h,v){s.set(v,U(h,e,r,v,t,c))});var A=a?p?Pn:xn:p?Q:Z,D=u?void 0:A(t);return Ee(D||t,function(h,v){D&&(v=h,h=t[v]),Ct(s,v,U(h,e,r,v,t,c))}),s}var Ya=1,Xa=4;function Za(t){return U(t,Ya|Xa)}const Qa=[{id:"0",name:"German",cards:[]},{id:"1",name:"Spain",cards:[]},{id:"2",name:"JS Syntax",cards:[]}],ka=Yt(()=>Xt("karteikasten-boxes",Qa));function Ot(t){const e=t.at(-1);return(e?Number(e.id)+1:0).toString()}function ro(){const t=ka();function e(a){return t.value.find(u=>u.id===z(a))}function r(a){return t.value.findIndex(u=>u.id===z(a))}function n({name:a,cards:u}){const g=Ot(t.value),m=t.value.push({name:a,id:g,cards:[]}),y=t.value[m-1];u.forEach(A=>{p(y,A)})}function f(a){const u=r(a);t.value.splice(u,1)}function c(a){const u=r(a.id);t.value[u]=a}function s(a){const u=e(a);return u?rt(u):null}function l(a){const u=e(a);return u?Za(u):null}function p(a,u){const{front:g,back:m}=z(u),y=g.trim(),A=m.trim();if(y===""||A==="")return;const D=Ot(a.cards);a.cards.push({id:D,front:y,back:A})}return{all:rt(t),get:s,getCopy:l,add:n,set:c,remove:f,addCardToBox:p}}export{ro as u};