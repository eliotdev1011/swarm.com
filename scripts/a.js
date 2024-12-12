!function(e){"function"==typeof define&&define.amd?define(e):e()}((function(){"use strict";var e,t=new Uint8Array(16);function n(){if(!e&&!(e="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!=typeof msCrypto&&"function"==typeof msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto)))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return e(t)}var r=/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;function i(e){return"string"==typeof e&&r.test(e)}for(var a=[],o=0;o<256;++o)a.push((o+256).toString(16).substr(1));function s(e,t,r){var o=(e=e||{}).random||(e.rng||n)();if(o[6]=15&o[6]|64,o[8]=63&o[8]|128,t){r=r||0;for(var s=0;s<16;++s)t[r+s]=o[s];return t}return function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=(a[e[t+0]]+a[e[t+1]]+a[e[t+2]]+a[e[t+3]]+"-"+a[e[t+4]]+a[e[t+5]]+"-"+a[e[t+6]]+a[e[t+7]]+"-"+a[e[t+8]]+a[e[t+9]]+"-"+a[e[t+10]]+a[e[t+11]]+a[e[t+12]]+a[e[t+13]]+a[e[t+14]]+a[e[t+15]]).toLowerCase();if(!i(n))throw TypeError("Stringified UUID is invalid");return n}(o)}const c="trends",d=2e3,u="v1/manifest/pull",l="sdk_start",m="visibility_visible",f="visibility_hidden";let p=null;const y=e=>{let t=`_${c}`;return p&&(t=p),`${t}${e}`},h=()=>y("Id"),g=()=>y("Data");let w=!1;const v=e=>{w&&console.info(e)},k=e=>{let t=Date.now().toString();if("undefined"!=typeof performance&&"function"==typeof performance.now){const e=performance.now();e&&(t=e.toFixed(4))}return`${btoa(e)}-${s()}-${t}`},b=()=>{let e=null;try{if(document.referrer){const t=new URL(document.referrer);t.host!==window.location.host&&(e=t.href)}}catch(e){v(e)}return e},_=()=>{const e=window.location.search;return e||null},q=()=>{const e=parseInt(S(y("Created")));return isNaN(e)?null:e},E=()=>{const e=Date.now().toString();D(h(),e);const t={referrer:b(),search:_()};return D(g(),JSON.stringify(t)),e},S=e=>e?window.localStorage.getItem(e):null,x=e=>{e&&window.localStorage.removeItem(e)},D=(e,t)=>{e&&window.sessionStorage.setItem(e,t)},I=e=>e?window.sessionStorage.getItem(e):null,$=e=>{let t;try{t=JSON.parse(I(g()))}catch(e){return v(e),null}return t?t[e]:null},N=(e,t)=>{let n;try{n=JSON.parse(I(g()))||{}}catch(e){return void v(e)}n[e]=t,D(g(),JSON.stringify(n))},O=()=>{let e=I(h());return e||(e=E()),e},L=()=>{let e,t=navigator.userAgent;t=navigator.brave?`${t} Brave`:t;try{e=JSON.parse(I(g()))}catch(e){v(e)}const n={sdkv:"0.10.1",tz_offset:-1*(new Date).getTimezoneOffset(),user_agent:t,page_title:document.title},r=q();return r&&(n.user_id_created=r),e&&(e.referrer&&(n.referrer=e.referrer),e.search&&(n.search=e.search)),n};let P=null;let j="";const T=e=>{const t=R();if(!t)return console.log("URL is not valid"),"";return`${t}/${e}?token=${P||""}`},R=()=>j;let J=!0;let U=0;const A=[500,1e3,2e3,4e3,8e3,16e3,32e3];let C=null;const z=()=>{clearTimeout(C),A[U]?C=setTimeout(K,A[U]):U=0},H=e=>{let t=[];try{t=JSON.parse($("retries")||"[]")}catch(e){v(e)}t.push(e),N("retries",JSON.stringify(t)),z()},K=()=>{if(!J)return;const e=(()=>{let e;try{if(e=$("retries"),!e)return null;e=JSON.parse(e)}catch(e){v(e)}if(!Array.isArray(e)||0===e.length)return null;const t=e.pop();return N("retries",JSON.stringify(e)),t})();e?(U++,V(e.url,e.payload).then((()=>{U=0})).catch(v).finally((()=>{z()}))):U=0};async function V(e,t,n){return e?n&&"beacon"===n.method&&navigator.sendBeacon?Promise.resolve(((e,t)=>{const n=new Blob([t],{type:"application/json"});return navigator.sendBeacon(e,n)})(e,t)):await(async(e,t)=>await fetch(e,{method:"POST",headers:{"Content-type":"application/json; charset=utf-8",Accept:"application/json; charset=utf-8"},body:t,credentials:"include"}).then((e=>e.json().then((t=>({status:e.status,body:t}))))).then((n=>n.status<200||n.status>=300?(H({payload:t,url:e}),Promise.reject(new Error(JSON.stringify(n.body)))):Promise.resolve(n.body))).catch((n=>(H({payload:t,url:e}),Promise.reject(new Error(n))))))(e,t):Promise.reject(new Error("URL is empty"))}const W=()=>{const e=S(y("User"));return e||""},X=e=>{switch(e){case"system":return"dataSystem";case"codified":return"dataCodified";case"pii":return"dataPII";case"phi":return"dataPHI"}return null},Y=e=>{const t=$("dataAll")||{},n=X(e);return{...t,...$(n)||{}}},B=(e,t)=>{const n=[];e.forEach((e=>{const t=((e,t)=>{const n={mid:e.mid,evn:e.name,scrn:e.urlPath,evt:e.tstmp,session_id:O(),type:t,screen:{width:document.documentElement.clientWidth,height:document.documentElement.clientHeight,docHeight:document.documentElement.scrollHeight,docWidth:document.documentElement.scrollWidth},additionalData:Y(t)},r=W();return r&&(n.userid=r),n})(e.data,e.type);e.extra&&(t.additionalData={...t.additionalData,...e.extra}),n.push(t)})),0!==n.length&&V(T("v1/events/publish"),JSON.stringify((e=>{const t={meta:L()};return e&&(t.events=e),t})(n)),t).catch(v)},F=e=>e&&e.name?{name:e.name,urlPath:e.url||window.location.href,mid:k(e.name),tstmp:Date.now()}:null;let M=!0,G=!1;const Q=()=>G?M:(console.log("SDK is not initialized"),!1),Z=(e,t,n)=>{if(!Q()||!e)return;const r={type:"system",data:F({name:e}),extra:{path:window.location.pathname}};if(t){const e=t;r.extra.position=(e=>{if(!e)return null;let t=-1,n=-1;if(e&&e.target){const r=e.target;r.offsetHeight&&(t=r.offsetHeight),r.offsetWidth&&(n=r.offsetWidth)}let r=-1,i=-1;return null!=e.screenX&&null!=e.offsetX&&(r=e.screenX-e.offsetX),null!=e.screenY&&null!=e.offsetY&&(i=e.screenY-e.offsetY),{x:r,y:i,width:n,height:t}})(e),r.extra.mouse={x:e.clientX||-1,y:e.clientY||-1};const n=(i=t.target)?"alt"in i&&i.alt?i.alt:i.title?i.title:i.innerText?i.innerText.substring(0,100):null:null;n&&(r.extra.objectTitle=n);const a=(e=>{if(!e)return null;let t="";e.className&&"string"==typeof e.className&&(t=`.${e.className.split(" ").join(".")}`);let n="";return e.id&&(n=`#${e.id}`),`${e.nodeName}${n}${t}`})(t.target);a&&(r.extra.objectName=a)}var i;B([r],n)};let ee=!0;let te=null;const ne=e=>{e&&e.variables&&(te=(e=>{const t={};return Object.entries(re).forEach((([n,r])=>{const i=e.findIndex((e=>e.variableId===r));if(-1===i)return;const a=e[i];if(!a||void 0===a.value)return;let o;switch(a.variableDataType){case 6:o=a.value;break;case 7:o=(a.value||"").split(",")}void 0!==o&&(t[n]=o)})),t})(e.variables),N("manifest",te))},re={phiPublicKey:5997,piiPublicKey:5998,systemEvents:5001},ie=e=>te?te[e]:null,ae=()=>new Promise(((e,t)=>{V(T(u),"").then((t=>{ne(t),e(!0)})).catch((e=>{t(e)}))})),oe={11101:{name:"cut"},11102:{name:"copy"},11103:{name:"paste"},11104:{name:"dragstart"},11105:{name:"dragend"},11106:{name:"error"},11107:{name:"keydown",operation:()=>{window.addEventListener("keydown",(e=>{"F1"===e.key&&Z("help",e)}))}},11108:{name:"blur"},11109:{name:"focus"},11110:{name:"reset"},11111:{name:"submit"},11112:{name:"keypress"},11113:{name:"dblclick"},11114:{name:"contextmenu"},11115:{name:"offline"},11116:{name:"online"},11117:{name:"afterprint"},11118:{name:"touchend"},11119:{name:"click",operation:()=>{window.addEventListener("click",(e=>{Z("click",e,{method:"beacon"})}))}},11120:{name:"hashchange"},11121:{name:"resize"},11122:{name:"scroll",operation:()=>{window.addEventListener("scroll",((e,t)=>{let n;return function(...r){clearTimeout(n),n=setTimeout((()=>e(...r)),t)}})((e=>{Z("scroll",e)}),d))}},11123:{name:"hover",operation:()=>{let e;window.addEventListener("mouseover",(t=>{e=setTimeout((()=>{Z("hover",t)}),2e3)})),window.addEventListener("mouseout",(()=>{clearTimeout(e)}))}}},se=()=>{const e=ie("systemEvents");e&&e.forEach((e=>{const t=oe[e];t&&(t.operation?t.operation():window.addEventListener(t.name,(e=>{Z(t.name,e)})))}))},ce=()=>{(()=>{const e="onpagehide"in window?"pagehide":"unload";window.addEventListener(e,(function(e){ee&&(Z(f,e,{method:"beacon"}),ee=!1)}))})(),window.addEventListener("visibilitychange",(function(e){if("visible"===document.visibilityState)return ee=!0,void Z(m,e);"hidden"===document.visibilityState&&ee&&(Z(f,e,{method:"beacon"}),ee=!1)})),window.addEventListener("online",(()=>{J=!0,K()})),window.addEventListener("offline",(()=>{J=!1}))},de=e=>{var t,n,r;null!=(t=e.endpointUrl)&&(j=t),n=e.token,P=n,(r=e.storageRootKey)||(p=null),p=r},ue=e=>{if(!e)return;if(!e.token||15!==e.token.length)return void console.info("SDK token is not valid");if(de(e),G=!0,!(()=>{const e=$("enabled");return null==e||(M=!!e),M})())return;let t=!1;(()=>{if(I(h())){const e=b();if(!e)return!1;if($("referrer")===e)return!1}return E(),!0})()||(t=(()=>{const e=$("manifest");return!!e&&(te=e,!0)})()),Z(l),ce(),t?(se(),K()):new Promise(((e,t)=>{ae().then((()=>{e(!0)})).catch((e=>{v(e),t(e)}))})).then((()=>{se(),K()})),x("sdkRoot"),x("sdkRootIndex"),x("sdkRootUser")},le=(e,t,n)=>{he()&&((e,t)=>{if(!Q()||!e)return;const n=[];e.forEach((e=>{const t=F(e);t&&n.push({type:"codified",data:t,extra:e.data})})),0!==n.length&&B(n,t)})([{name:e,data:t,options:n}],n)},me=()=>(()=>{const e=document.cookie;if(!e)return"";const t=e.split("; ");for(const e of t){if(!e)continue;const[t,n]=e.split("=",2);if("_trends_user_id"===t)return n}return""})(),fe=(e,t)=>{he()&&((e,t)=>{const n={type:"system",data:F({name:f,url:e}),extra:t},r={type:"system",data:F({name:l}),extra:t};B([n,r])})(e,t)},pe=e=>{(e=>{N("enabled",e),M=e})(e)},ye=(e,t)=>{((e,t)=>{if(t)if(0!==e.length)for(const n of e){const e=X(n);e&&N(e,t)}else N("dataAll",t)})(e,t)},he=()=>Q(),ge=e=>{(e=>{w=e})(e)},we=B,ve=F,ke=e=>{console.error(e)},be="map_id",_e="transaction",qe="item",Ee="persona",Se=(e,t,n,r)=>{const i=(e=>{switch(e){case"mapID":return{name:be,fields:{externalID:{required:!0,key:"map_id"},provider:{required:!0,key:"map_provider"}}};case"transaction":return{name:_e,fields:{ID:{required:!0,key:"transaction_id"},currency:{required:!1,key:"transaction_currency"},payment:{required:!1,key:"transaction_payment"},total:{required:!1,key:"transaction_total"},discount:{required:!1,key:"transaction_discount"},shipping:{required:!1,key:"transaction_shipping"},tax:{required:!1,key:"transaction_tax"}}};case"item":return{name:qe,fields:{ID:{required:!0,key:"item_id"},name:{required:!1,key:"item_name"},SKU:{required:!1,key:"item_sku"},category:{required:!1,key:"item_category"},price:{required:!1,key:"item_price"},currency:{required:!1,key:"item_currency"},quantity:{required:!1,key:"item_quantity"}}};case"persona":return{name:Ee,fields:{ID:{required:!0,key:"persona_id"},firstname:{required:!1,key:"persona_firstname"},lastname:{required:!1,key:"persona_lastname"},middlename:{required:!1,key:"persona_middlename"},username:{required:!1,key:"persona_username"},dob:{required:!1,key:"persona_dob"},email:{required:!1,key:"persona_email"},number:{required:!1,key:"persona_number"},address:{required:!1,key:"persona_address"},city:{required:!1,key:"persona_city"},state:{required:!1,key:"persona_state"},zip:{required:!1,key:"persona_zip"},country:{required:!1,key:"persona_country"},gender:{required:!1,key:"persona_gender"},age:{required:!1,key:"persona_age"}}}}})(e),a=((e,t)=>{if(!e)return void ke(`Data not provided for ${t.name}`);const n={};let r=!1;return Object.entries(t.fields).forEach((([i,a])=>{const o=i,s=a;e[o]?n[s.key]=e[o]:s.required&&(r=!0,ke(`Missing required field ${o} for ${t.name}`))})),r?null:n})(t,i);if(!a)return;const o=((e,t,n={})=>({type:"codified",data:ve({name:e}),extra:{...n,...t}}))(i.name,a,n);we([o],r)};var xe=new class{init(e){(e=>{ue(e)})(e)}capture(e,t,n){le(e,t,n)}pageView(e,t){fe(e,t)}getUserId(){return me()}enable(e){pe(e)}defaultEventData(e,t){ye(e,t)}isEnabled(){return he()}logging(e){ge(e)}mapID(e,t,n){((e,t,n)=>{he()&&Se("mapID",e,t,n)})(e,t,n)}transaction(e,t,n){((e,t,n)=>{he()&&Se("transaction",e,t,n)})(e,t,n)}item(e,t,n){((e,t,n)=>{he()&&Se("item",e,t,n)})(e,t,n)}persona(e,t,n){((e,t,n)=>{he()&&Se("persona",e,t,n)})(e,t,n)}};!function(){const e=e=>{const n=[].slice.call(e);if(Array.isArray(n))try{return t[n[0]](...n.slice(1))}catch(e){console.error(e)}},t=xe;let n=[];window.trends&&(n=window.trends.stubs||[]),window.trends=function(){return e(arguments)},n.forEach(e)}()}));
//# sourceMappingURL=index.min.js.map
