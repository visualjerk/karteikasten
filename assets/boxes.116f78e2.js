import{c as Jt,u as Xt}from"./index.01e8e45b.js";import{h as rt,u as z}from"./index.2f23dede.js";var Zt=typeof global=="object"&&global&&global.Object===Object&&global;const wt=Zt;var Qt=typeof self=="object"&&self&&self.Object===Object&&self,kt=wt||Qt||Function("return this")();const d=kt;var te=d.Symbol;const O=te;var St=Object.prototype,ee=St.hasOwnProperty,re=St.toString,P=O?O.toStringTag:void 0;function ne(t){var e=ee.call(t,P),r=t[P];try{t[P]=void 0;var n=!0}catch{}var f=re.call(t);return n&&(e?t[P]=r:delete t[P]),f}var oe=Object.prototype,ae=oe.toString;function ie(t){return ae.call(t)}var se="[object Null]",ce="[object Undefined]",nt=O?O.toStringTag:void 0;function M(t){return t==null?t===void 0?ce:se:nt&&nt in Object(t)?ne(t):ie(t)}function B(t){return t!=null&&typeof t=="object"}var ue=Array.isArray;const q=ue;function F(t){var e=typeof t;return t!=null&&(e=="object"||e=="function")}var fe="[object AsyncFunction]",le="[object Function]",pe="[object GeneratorFunction]",ge="[object Proxy]";function xt(t){if(!F(t))return!1;var e=M(t);return e==le||e==pe||e==fe||e==ge}var de=d["__core-js_shared__"];const R=de;var ot=function(){var t=/[^.]+$/.exec(R&&R.keys&&R.keys.IE_PROTO||"");return t?"Symbol(src)_1."+t:""}();function be(t){return!!ot&&ot in t}var he=Function.prototype,ye=he.toString;function T(t){if(t!=null){try{return ye.call(t)}catch{}try{return t+""}catch{}}return""}var ve=/[\\^$.*+?()[\]{}|]/g,$e=/^\[object .+?Constructor\]$/,_e=Function.prototype,Te=Object.prototype,je=_e.toString,me=Te.hasOwnProperty,Ae=RegExp("^"+je.call(me).replace(ve,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");function Oe(t){if(!F(t)||be(t))return!1;var e=xt(t)?Ae:$e;return e.test(T(t))}function we(t,e){return t==null?void 0:t[e]}function j(t,e){var r=we(t,e);return Oe(r)?r:void 0}var Se=j(d,"WeakMap");const K=Se;var at=Object.create,xe=function(){function t(){}return function(e){if(!F(e))return{};if(at)return at(e);t.prototype=e;var r=new t;return t.prototype=void 0,r}}();const Pe=xe;function Ie(t,e){var r=-1,n=t.length;for(e||(e=Array(n));++r<n;)e[r]=t[r];return e}var Ce=function(){try{var t=j(Object,"defineProperty");return t({},"",{}),t}catch{}}();const it=Ce;function Ee(t,e){for(var r=-1,n=t==null?0:t.length;++r<n&&e(t[r],r,t)!==!1;);return t}var Me=9007199254740991,Be=/^(?:0|[1-9]\d*)$/;function Fe(t,e){var r=typeof t;return e=e==null?Me:e,!!e&&(r=="number"||r!="symbol"&&Be.test(t))&&t>-1&&t%1==0&&t<e}function Pt(t,e,r){e=="__proto__"&&it?it(t,e,{configurable:!0,enumerable:!0,value:r,writable:!0}):t[e]=r}function It(t,e){return t===e||t!==t&&e!==e}var De=Object.prototype,Ge=De.hasOwnProperty;function Ct(t,e,r){var n=t[e];(!(Ge.call(t,e)&&It(n,r))||r===void 0&&!(e in t))&&Pt(t,e,r)}function L(t,e,r,n){var f=!r;r||(r={});for(var c=-1,s=e.length;++c<s;){var l=e[c],p=n?n(r[l],t[l],l,r,t):void 0;p===void 0&&(p=t[l]),f?Pt(r,l,p):Ct(r,l,p)}return r}var Le=9007199254740991;function Et(t){return typeof t=="number"&&t>-1&&t%1==0&&t<=Le}function Mt(t){return t!=null&&Et(t.length)&&!xt(t)}var Ue=Object.prototype;function J(t){var e=t&&t.constructor,r=typeof e=="function"&&e.prototype||Ue;return t===r}function Ne(t,e){for(var r=-1,n=Array(t);++r<t;)n[r]=e(r);return n}var ze="[object Arguments]";function st(t){return B(t)&&M(t)==ze}var Bt=Object.prototype,Re=Bt.hasOwnProperty,He=Bt.propertyIsEnumerable,Ke=st(function(){return arguments}())?st:function(t){return B(t)&&Re.call(t,"callee")&&!He.call(t,"callee")};const Ve=Ke;function We(){return!1}var Ft=typeof exports=="object"&&exports&&!exports.nodeType&&exports,ct=Ft&&typeof module=="object"&&module&&!module.nodeType&&module,Ye=ct&&ct.exports===Ft,ut=Ye?d.Buffer:void 0,qe=ut?ut.isBuffer:void 0,Je=qe||We;const Dt=Je;var Xe="[object Arguments]",Ze="[object Array]",Qe="[object Boolean]",ke="[object Date]",tr="[object Error]",er="[object Function]",rr="[object Map]",nr="[object Number]",or="[object Object]",ar="[object RegExp]",ir="[object Set]",sr="[object String]",cr="[object WeakMap]",ur="[object ArrayBuffer]",fr="[object DataView]",lr="[object Float32Array]",pr="[object Float64Array]",gr="[object Int8Array]",dr="[object Int16Array]",br="[object Int32Array]",hr="[object Uint8Array]",yr="[object Uint8ClampedArray]",vr="[object Uint16Array]",$r="[object Uint32Array]",i={};i[lr]=i[pr]=i[gr]=i[dr]=i[br]=i[hr]=i[yr]=i[vr]=i[$r]=!0;i[Xe]=i[Ze]=i[ur]=i[Qe]=i[fr]=i[ke]=i[tr]=i[er]=i[rr]=i[nr]=i[or]=i[ar]=i[ir]=i[sr]=i[cr]=!1;function _r(t){return B(t)&&Et(t.length)&&!!i[M(t)]}function X(t){return function(e){return t(e)}}var Gt=typeof exports=="object"&&exports&&!exports.nodeType&&exports,I=Gt&&typeof module=="object"&&module&&!module.nodeType&&module,Tr=I&&I.exports===Gt,H=Tr&&wt.process,jr=function(){try{var t=I&&I.require&&I.require("util").types;return t||H&&H.binding&&H.binding("util")}catch{}}();const w=jr;var ft=w&&w.isTypedArray,mr=ft?X(ft):_r;const Ar=mr;var Or=Object.prototype,wr=Or.hasOwnProperty;function Lt(t,e){var r=q(t),n=!r&&Ve(t),f=!r&&!n&&Dt(t),c=!r&&!n&&!f&&Ar(t),s=r||n||f||c,l=s?Ne(t.length,String):[],p=l.length;for(var o in t)(e||wr.call(t,o))&&!(s&&(o=="length"||f&&(o=="offset"||o=="parent")||c&&(o=="buffer"||o=="byteLength"||o=="byteOffset")||Fe(o,p)))&&l.push(o);return l}function Ut(t,e){return function(r){return t(e(r))}}var Sr=Ut(Object.keys,Object);const xr=Sr;var Pr=Object.prototype,Ir=Pr.hasOwnProperty;function Cr(t){if(!J(t))return xr(t);var e=[];for(var r in Object(t))Ir.call(t,r)&&r!="constructor"&&e.push(r);return e}function Z(t){return Mt(t)?Lt(t):Cr(t)}function Er(t){var e=[];if(t!=null)for(var r in Object(t))e.push(r);return e}var Mr=Object.prototype,Br=Mr.hasOwnProperty;function Fr(t){if(!F(t))return Er(t);var e=J(t),r=[];for(var n in t)n=="constructor"&&(e||!Br.call(t,n))||r.push(n);return r}function Q(t){return Mt(t)?Lt(t,!0):Fr(t)}var Dr=j(Object,"create");const C=Dr;function Gr(){this.__data__=C?C(null):{},this.size=0}function Lr(t){var e=this.has(t)&&delete this.__data__[t];return this.size-=e?1:0,e}var Ur="__lodash_hash_undefined__",Nr=Object.prototype,zr=Nr.hasOwnProperty;function Rr(t){var e=this.__data__;if(C){var r=e[t];return r===Ur?void 0:r}return zr.call(e,t)?e[t]:void 0}var Hr=Object.prototype,Kr=Hr.hasOwnProperty;function Vr(t){var e=this.__data__;return C?e[t]!==void 0:Kr.call(e,t)}var Wr="__lodash_hash_undefined__";function Yr(t,e){var r=this.__data__;return this.size+=this.has(t)?0:1,r[t]=C&&e===void 0?Wr:e,this}function _(t){var e=-1,r=t==null?0:t.length;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}_.prototype.clear=Gr;_.prototype.delete=Lr;_.prototype.get=Rr;_.prototype.has=Vr;_.prototype.set=Yr;function qr(){this.__data__=[],this.size=0}function U(t,e){for(var r=t.length;r--;)if(It(t[r][0],e))return r;return-1}var Jr=Array.prototype,Xr=Jr.splice;function Zr(t){var e=this.__data__,r=U(e,t);if(r<0)return!1;var n=e.length-1;return r==n?e.pop():Xr.call(e,r,1),--this.size,!0}function Qr(t){var e=this.__data__,r=U(e,t);return r<0?void 0:e[r][1]}function kr(t){return U(this.__data__,t)>-1}function tn(t,e){var r=this.__data__,n=U(r,t);return n<0?(++this.size,r.push([t,e])):r[n][1]=e,this}function b(t){var e=-1,r=t==null?0:t.length;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}b.prototype.clear=qr;b.prototype.delete=Zr;b.prototype.get=Qr;b.prototype.has=kr;b.prototype.set=tn;var en=j(d,"Map");const E=en;function rn(){this.size=0,this.__data__={hash:new _,map:new(E||b),string:new _}}function nn(t){var e=typeof t;return e=="string"||e=="number"||e=="symbol"||e=="boolean"?t!=="__proto__":t===null}function N(t,e){var r=t.__data__;return nn(e)?r[typeof e=="string"?"string":"hash"]:r.map}function on(t){var e=N(this,t).delete(t);return this.size-=e?1:0,e}function an(t){return N(this,t).get(t)}function sn(t){return N(this,t).has(t)}function cn(t,e){var r=N(this,t),n=r.size;return r.set(t,e),this.size+=r.size==n?0:1,this}function S(t){var e=-1,r=t==null?0:t.length;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}S.prototype.clear=rn;S.prototype.delete=on;S.prototype.get=an;S.prototype.has=sn;S.prototype.set=cn;function Nt(t,e){for(var r=-1,n=e.length,f=t.length;++r<n;)t[f+r]=e[r];return t}var un=Ut(Object.getPrototypeOf,Object);const zt=un;function fn(){this.__data__=new b,this.size=0}function ln(t){var e=this.__data__,r=e.delete(t);return this.size=e.size,r}function pn(t){return this.__data__.get(t)}function gn(t){return this.__data__.has(t)}var dn=200;function bn(t,e){var r=this.__data__;if(r instanceof b){var n=r.__data__;if(!E||n.length<dn-1)return n.push([t,e]),this.size=++r.size,this;r=this.__data__=new S(n)}return r.set(t,e),this.size=r.size,this}function x(t){var e=this.__data__=new b(t);this.size=e.size}x.prototype.clear=fn;x.prototype.delete=ln;x.prototype.get=pn;x.prototype.has=gn;x.prototype.set=bn;function hn(t,e){return t&&L(e,Z(e),t)}function yn(t,e){return t&&L(e,Q(e),t)}var Rt=typeof exports=="object"&&exports&&!exports.nodeType&&exports,lt=Rt&&typeof module=="object"&&module&&!module.nodeType&&module,vn=lt&&lt.exports===Rt,pt=vn?d.Buffer:void 0,gt=pt?pt.allocUnsafe:void 0;function $n(t,e){if(e)return t.slice();var r=t.length,n=gt?gt(r):new t.constructor(r);return t.copy(n),n}function _n(t,e){for(var r=-1,n=t==null?0:t.length,f=0,c=[];++r<n;){var s=t[r];e(s,r,t)&&(c[f++]=s)}return c}function Ht(){return[]}var Tn=Object.prototype,jn=Tn.propertyIsEnumerable,dt=Object.getOwnPropertySymbols,mn=dt?function(t){return t==null?[]:(t=Object(t),_n(dt(t),function(e){return jn.call(t,e)}))}:Ht;const k=mn;function An(t,e){return L(t,k(t),e)}var On=Object.getOwnPropertySymbols,wn=On?function(t){for(var e=[];t;)Nt(e,k(t)),t=zt(t);return e}:Ht;const Kt=wn;function Sn(t,e){return L(t,Kt(t),e)}function Vt(t,e,r){var n=e(t);return q(t)?n:Nt(n,r(t))}function xn(t){return Vt(t,Z,k)}function Pn(t){return Vt(t,Q,Kt)}var In=j(d,"DataView");const V=In;var Cn=j(d,"Promise");const W=Cn;var En=j(d,"Set");const Y=En;var bt="[object Map]",Mn="[object Object]",ht="[object Promise]",yt="[object Set]",vt="[object WeakMap]",$t="[object DataView]",Bn=T(V),Fn=T(E),Dn=T(W),Gn=T(Y),Ln=T(K),$=M;(V&&$(new V(new ArrayBuffer(1)))!=$t||E&&$(new E)!=bt||W&&$(W.resolve())!=ht||Y&&$(new Y)!=yt||K&&$(new K)!=vt)&&($=function(t){var e=M(t),r=e==Mn?t.constructor:void 0,n=r?T(r):"";if(n)switch(n){case Bn:return $t;case Fn:return bt;case Dn:return ht;case Gn:return yt;case Ln:return vt}return e});const tt=$;var Un=Object.prototype,Nn=Un.hasOwnProperty;function zn(t){var e=t.length,r=new t.constructor(e);return e&&typeof t[0]=="string"&&Nn.call(t,"index")&&(r.index=t.index,r.input=t.input),r}var Rn=d.Uint8Array;const _t=Rn;function et(t){var e=new t.constructor(t.byteLength);return new _t(e).set(new _t(t)),e}function Hn(t,e){var r=e?et(t.buffer):t.buffer;return new t.constructor(r,t.byteOffset,t.byteLength)}var Kn=/\w*$/;function Vn(t){var e=new t.constructor(t.source,Kn.exec(t));return e.lastIndex=t.lastIndex,e}var Tt=O?O.prototype:void 0,jt=Tt?Tt.valueOf:void 0;function Wn(t){return jt?Object(jt.call(t)):{}}function Yn(t,e){var r=e?et(t.buffer):t.buffer;return new t.constructor(r,t.byteOffset,t.length)}var qn="[object Boolean]",Jn="[object Date]",Xn="[object Map]",Zn="[object Number]",Qn="[object RegExp]",kn="[object Set]",to="[object String]",eo="[object Symbol]",ro="[object ArrayBuffer]",no="[object DataView]",oo="[object Float32Array]",ao="[object Float64Array]",io="[object Int8Array]",so="[object Int16Array]",co="[object Int32Array]",uo="[object Uint8Array]",fo="[object Uint8ClampedArray]",lo="[object Uint16Array]",po="[object Uint32Array]";function go(t,e,r){var n=t.constructor;switch(e){case ro:return et(t);case qn:case Jn:return new n(+t);case no:return Hn(t,r);case oo:case ao:case io:case so:case co:case uo:case fo:case lo:case po:return Yn(t,r);case Xn:return new n;case Zn:case to:return new n(t);case Qn:return Vn(t);case kn:return new n;case eo:return Wn(t)}}function bo(t){return typeof t.constructor=="function"&&!J(t)?Pe(zt(t)):{}}var ho="[object Map]";function yo(t){return B(t)&&tt(t)==ho}var mt=w&&w.isMap,vo=mt?X(mt):yo;const $o=vo;var _o="[object Set]";function To(t){return B(t)&&tt(t)==_o}var At=w&&w.isSet,jo=At?X(At):To;const mo=jo;var Ao=1,Oo=2,wo=4,Wt="[object Arguments]",So="[object Array]",xo="[object Boolean]",Po="[object Date]",Io="[object Error]",Yt="[object Function]",Co="[object GeneratorFunction]",Eo="[object Map]",Mo="[object Number]",qt="[object Object]",Bo="[object RegExp]",Fo="[object Set]",Do="[object String]",Go="[object Symbol]",Lo="[object WeakMap]",Uo="[object ArrayBuffer]",No="[object DataView]",zo="[object Float32Array]",Ro="[object Float64Array]",Ho="[object Int8Array]",Ko="[object Int16Array]",Vo="[object Int32Array]",Wo="[object Uint8Array]",Yo="[object Uint8ClampedArray]",qo="[object Uint16Array]",Jo="[object Uint32Array]",a={};a[Wt]=a[So]=a[Uo]=a[No]=a[xo]=a[Po]=a[zo]=a[Ro]=a[Ho]=a[Ko]=a[Vo]=a[Eo]=a[Mo]=a[qt]=a[Bo]=a[Fo]=a[Do]=a[Go]=a[Wo]=a[Yo]=a[qo]=a[Jo]=!0;a[Io]=a[Yt]=a[Lo]=!1;function G(t,e,r,n,f,c){var s,l=e&Ao,p=e&Oo,o=e&wo;if(r&&(s=f?r(t,n,f,c):r(t)),s!==void 0)return s;if(!F(t))return t;var u=q(t);if(u){if(s=zn(t),!l)return Ie(t,s)}else{var g=tt(t),m=g==Yt||g==Co;if(Dt(t))return $n(t,l);if(g==qt||g==Wt||m&&!f){if(s=p||m?{}:bo(t),!l)return p?Sn(t,yn(s,t)):An(t,hn(s,t))}else{if(!a[g])return f?t:{};s=go(t,g,l)}}c||(c=new x);var y=c.get(t);if(y)return y;c.set(t,s),mo(t)?t.forEach(function(h){s.add(G(h,e,r,h,t,c))}):$o(t)&&t.forEach(function(h,v){s.set(v,G(h,e,r,v,t,c))});var A=o?p?Pn:xn:p?Q:Z,D=u?void 0:A(t);return Ee(D||t,function(h,v){D&&(v=h,h=t[v]),Ct(s,v,G(h,e,r,v,t,c))}),s}var Xo=1,Zo=4;function Qo(t){return G(t,Xo|Zo)}const ko=[{id:"0",name:"German",cards:[{id:"0",front:"Buch",back:"Book"},{id:"1",front:"Hallo",back:"Hello"},{id:"2",front:"Liebe",back:"Love"},{id:"3",front:"Vogel",back:"Bird"},{id:"4",front:"Du",back:"You"},{id:"5",front:"Gut",back:"Good"},{id:"6",front:"Lied",back:"Song"}]}],ta=Jt(()=>Xt("karteikasten-boxes",ko));function Ot(t){const e=t.at(-1);return(e?Number(e.id)+1:0).toString()}function na(){const t=ta();function e(o){return t.value.find(u=>u.id===z(o))}function r(o){return t.value.findIndex(u=>u.id===z(o))}function n({name:o,cards:u}){const g=Ot(t.value),m=t.value.push({name:o,id:g,cards:[]}),y=t.value[m-1];u.forEach(A=>{p(y,A)})}function f(o){const u=r(o);t.value.splice(u,1)}function c(o){const u=r(o.id);t.value[u]=o}function s(o){const u=e(o);return u?rt(u):null}function l(o){const u=e(o);return u?Qo(u):null}function p(o,u){const{front:g,back:m}=z(u),y=g.trim(),A=m.trim();if(y===""||A==="")return;const D=Ot(o.cards);o.cards.push({id:D,front:y,back:A})}return{all:rt(t),get:s,getCopy:l,add:n,set:c,remove:f,addCardToBox:p}}export{na as u};
