(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{52:function(e,t,n){e.exports=n(69)},57:function(e,t,n){},69:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(16),l=n.n(c),o=n(14),i=n(50),u=n.n(i),s=n(8),m=(n(57),n(6)),d=n(5),f=n(74),h=n(9),p=n.n(h),E=n(15),b=function(e){var t={};return e.forEach((function(e){t[e.param]=e.msg})),t},v=function(){var e=Object(a.useState)(!1),t=Object(d.a)(e,2),n=t[0],r=t[1],c=Object(a.useState)(""),l=Object(d.a)(c,2),o=l[0],i=l[1],u=Object(a.useState)({}),s=Object(d.a)(u,2),m=s[0],f=s[1];return{isLoading:n,request:Object(a.useCallback)(function(){var e=Object(E.a)(p.a.mark((function e(t){var n,a,c,l,o,u,s,m,d;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.url,a=t.method,c=void 0===a?"GET":a,l=t.body,o=void 0===l?null:l,u=t.headers,s=void 0===u?{}:u,r(!0),o&&(o=JSON.stringify(o)),s["Content-Type"]="application/json",e.prev=4,e.next=7,fetch(n,{method:c,body:o,headers:s});case 7:return m=e.sent,e.next=10,m.json();case 10:if(d=e.sent,m.ok){e.next=14;break}throw d.errors?f(b(d.errors)):f({}),new Error(d.message||"Something go wrong");case 14:return e.abrupt("return",d);case 17:throw e.prev=17,e.t0=e.catch(4),console.dir(e.t0),i(e.t0.message),e.t0;case 22:return e.prev=22,r(!1),e.finish(22);case 25:case"end":return e.stop()}}),e,null,[[4,17,22,25]])})));return function(t){return e.apply(this,arguments)}}(),[r,i,f]),error:o,clearError:function(){return i("")},errorsFields:m}},g=Object(a.createContext)({token:null,userID:null,login:function(){},logout:function(){},isAuthenticated:!1}),k=function(e){var t=Object(a.useState)(!1),n=Object(d.a)(t,2),c=n[0],l=n[1],i=v().request,u=Object(a.useContext)(g).token,m=function(){var t=Object(E.a)(p.a.mark((function t(n){var a;return p.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!c){t.next=2;break}return t.abrupt("return");case 2:return l(!0),t.prev=3,t.next=6,i({url:"/api/link/".concat(n),method:"DELETE",headers:{Authorization:"Bearer ".concat(u)}});case 6:a=t.sent,s.b.success(a.message),e.onDelete&&e.onDelete(),t.next=14;break;case 11:t.prev=11,t.t0=t.catch(3),s.b.error(t.t0.message);case 14:return t.prev=14,l(!1),t.finish(14);case 17:case"end":return t.stop()}}),t,null,[[3,11,14,17]])})));return function(e){return t.apply(this,arguments)}}();return r.a.createElement("tr",{key:e._id},r.a.createElement("td",null,e.no+1),r.a.createElement("td",null,r.a.createElement("a",{href:e.from,target:"_blank",rel:"noreferrer noopener"},e.from)),r.a.createElement("td",null,r.a.createElement("a",{href:e.to,target:"_blank",rel:"noreferrer noopener"},e.to)),r.a.createElement("td",null,e.visitions.length),r.a.createElement("td",null,r.a.createElement("span",{onClick:function(){return m(e._id)}},"\xd7"),r.a.createElement(o.b,{to:"/detail/".concat(e._id)},"View")))},j=n(72),O=n(73),w=function(){return r.a.createElement(j.a,{className:"justify-content-center my-2"},r.a.createElement(O.a,{animation:"border"}))},y=n(79),x=function(e){var t=e.text;return r.a.createElement(y.a,{type:"danger"},t)},S=function(){var e=Object(a.useState)([]),t=Object(d.a)(e,2),n=t[0],c=t[1],l=Object(a.useState)(!0),o=Object(d.a)(l,2),i=o[0],u=o[1],s=Object(a.useState)(null),m=Object(d.a)(s,2),h=m[0],p=m[1],E=v().request,b=Object(a.useContext)(g).token;Object(a.useEffect)((function(){u(!0),E({url:"/api/link",method:"GET",headers:{Authorization:"Bearer ".concat(b)}}).then((function(e){c(e.links)})).catch((function(e){p(e.message)})).finally((function(){return u(!1)}))}),[]);return i?r.a.createElement(w,null):h?r.a.createElement(x,{text:h}):n.length?r.a.createElement(r.a.Fragment,null,r.a.createElement("h3",null,"Links page"),r.a.createElement(f.a,{hover:!0,bordered:!0},r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",null,"#"),r.a.createElement("th",null,"From"),r.a.createElement("th",null,"To"),r.a.createElement("th",null,"Clicks"),r.a.createElement("th",null,"Actions"))),r.a.createElement("tbody",null,n.map((function(e,t){return r.a.createElement(k,Object.assign({},e,{key:e._id,no:t,onDelete:function(){return function(e){var t=n.filter((function(t){return t._id!=e}));c(t)}(e._id)}}))}))))):r.a.createElement("div",{className:"text-center"},"You haven't links yet")},C=n(41),N=n(77),D=n(44),F=n(43),A=n(75),T=function(){var e=Object(a.useState)(""),t=Object(d.a)(e,2),n=t[0],c=t[1],l=Object(a.useState)(!1),o=Object(d.a)(l,2),i=o[0],u=o[1],f=Object(m.g)(),h=v(),b=h.request,k=h.errorsFields,O=Object(a.useContext)(g).token,w=function(){var e=Object(E.a)(p.a.mark((function e(){var t;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return u(!0),e.prev=1,e.next=4,b({url:"/api/link/generate",method:"POST",body:{url:n},headers:{Authorization:"Bearer ".concat(O)}});case 4:t=e.sent,f.push("/detail/".concat(t.link._id)),u(!1),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(1),s.b.error(e.t0.message);case 12:return e.prev=12,u(!1),e.finish(12);case 15:case"end":return e.stop()}}),e,null,[[1,9,12,15]])})));return function(){return e.apply(this,arguments)}}();return r.a.createElement(j.a,null,r.a.createElement(C.a,{xs:{span:6,offset:3}},r.a.createElement(N.a,null,r.a.createElement(D.a,{htmlFor:"urlField",column:!0},"Enter url to short"),r.a.createElement(F.a,{type:"text",name:"url",id:"urlField",value:n,onChange:function(e){c(e.target.value)}}),r.a.createElement(F.a.Feedback,{type:"invalid",className:"d-block"},k.url)),r.a.createElement("div",{className:"d-flex justify-content-end"},r.a.createElement(A.a,{type:"button",variant:"primary",className:"m-2",onClick:w,disabled:i},"Short it!"))))},_=n(80),I=function(e){var t=e.link;return r.a.createElement("div",null,r.a.createElement("div",null,"ID: ",t._id),r.a.createElement("div",null,"Code: ",t.code),r.a.createElement("div",null,"Date of registration: ",new Date(t.date).toLocaleString()),r.a.createElement("div",null,"Clicks count: ",t.visitions.length),r.a.createElement("div",null,r.a.createElement("span",null,"From: "),r.a.createElement("a",{href:t.from,target:"_blank",rel:"noopener noreferrer"},t.from)),r.a.createElement("div",null,r.a.createElement("span",null,"To: "),r.a.createElement("a",{href:t.to,target:"_blank",rel:"noopener noreferrer"},t.to)))},L=function(){var e=Object(a.useState)(null),t=Object(d.a)(e,2),n=t[0],c=t[1],l=Object(a.useState)(null),o=Object(d.a)(l,2),i=o[0],u=o[1],f=Object(a.useState)(!0),h=Object(d.a)(f,2),b=h[0],k=h[1],O=Object(a.useState)(!1),y=Object(d.a)(O,2),S=y[0],C=y[1],N=Object(m.g)(),D=v().request,F=Object(a.useContext)(g).token,T=Object(m.h)();Object(a.useEffect)((function(){k(!0),D({url:"/api/link/".concat(T.id),method:"GET",headers:{Authorization:"Bearer ".concat(F)}}).then((function(e){c(e.link)})).catch((function(e){u(e.message)})).finally((function(){return k(!1)}))}),[]);var L=function(){var e=Object(E.a)(p.a.mark((function e(t){var n;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return C(!0),e.prev=1,e.next=4,D({url:"/api/link/".concat(t),method:"DELETE",headers:{Authorization:"Bearer ".concat(F)}});case 4:n=e.sent,s.b.success(n.message),N.push("/create"),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(1),s.b.error(e.t0.message);case 12:return e.prev=12,C(!1),e.finish(12);case 15:case"end":return e.stop()}}),e,null,[[1,9,12,15]])})));return function(t){return e.apply(this,arguments)}}();return b?r.a.createElement(w,null):i?r.a.createElement(x,{text:i}):r.a.createElement(j.a,{className:"justify-content-center my-3"},r.a.createElement(_.a,{className:"w-100"},r.a.createElement(_.a.Header,null,r.a.createElement("b",null,"Details")),r.a.createElement(_.a.Body,null,r.a.createElement(I,{link:n})),r.a.createElement(_.a.Footer,null,r.a.createElement(j.a,{className:"justify-content-end"},r.a.createElement(A.a,{className:"my-2",variant:"danger",disabled:S,onClick:function(){return L(n._id)}},"Delete link")))))},B=n(24),P=n(45),W=n(42),q=function(){var e=r.a.useState({email:"",password:""}),t=Object(d.a)(e,2),n=t[0],a=t[1],c=r.a.useContext(g).login,l=function(e){var t=e.target.name;a(Object(P.a)({},n,Object(B.a)({},t,e.target.value)))},o=v(),i=o.request,u=o.isLoading,m=o.errorsFields,f=function(){var e=Object(E.a)(p.a.mark((function e(){var t;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,i({url:"/api/auth/register",method:"POST",body:n});case 3:t=e.sent,s.b.success(t.message),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),s.b.error(e.t0.message);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(){return e.apply(this,arguments)}}(),h=function(){var e=Object(E.a)(p.a.mark((function e(){var t;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,i({url:"/api/auth/login",method:"POST",body:n});case 3:t=e.sent,c(t.token,t.userID),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),s.b.error(e.t0.message);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(){return e.apply(this,arguments)}}();return r.a.createElement(j.a,{className:"my-3"},r.a.createElement(C.a,{md:{span:6,offset:3}},r.a.createElement(N.a,null,r.a.createElement(_.a,null,r.a.createElement(_.a.Header,null,r.a.createElement("b",null,"Authorization")),r.a.createElement(_.a.Body,null,r.a.createElement(W.a,null,r.a.createElement(D.a,{htmlFor:"email",column:!0},"Email"),r.a.createElement(F.a,{type:"text",id:"email",name:"email",placeholder:"Email",value:n.email,onChange:l}),r.a.createElement(F.a.Feedback,{type:"invalid",className:"d-block"},m.email)),r.a.createElement(W.a,null,r.a.createElement(D.a,{htmlFor:"password",column:!0},"Password"),r.a.createElement(F.a,{type:"password",name:"password",id:"password",placeholder:"Password",value:n.password,onChange:l}),r.a.createElement(F.a.Feedback,{type:"invalid",className:"d-block"},m.password))),r.a.createElement(_.a.Footer,null,r.a.createElement(j.a,{className:"justify-content-end"},r.a.createElement(A.a,{type:"button",variant:"primary",className:"m-2",disabled:u,onClick:h},"Log in"),r.a.createElement(A.a,{type:"button",variant:"secondary",className:"m-2",disabled:u,onClick:f},"Sign in")))))))},z=function(){var e=Object(a.useState)(!0),t=Object(d.a)(e,2),n=t[0],c=t[1],l=v().request,o=Object(m.h)();return Object(a.useEffect)((function(){l({url:"/api/auth/confirm/".concat(o.code),method:"GET"}).then((function(e){s.b.success(e.message)})).catch((function(e){s.b.error(e.message)})).finally((function(){c(!1)}))}),[]),n?r.a.createElement(w,null):r.a.createElement(m.a,{to:"/"})},G=function(e){return e?r.a.createElement(m.d,null,r.a.createElement(m.b,{path:"/links",exact:!0,component:S}),r.a.createElement(m.b,{path:"/create",exact:!0,component:T}),r.a.createElement(m.b,{path:"/detail/:id",exact:!0,component:L}),r.a.createElement(m.b,{path:"/",render:function(){return console.log("Redirect"),r.a.createElement(m.a,{to:"/create"})}})):r.a.createElement(m.d,null,r.a.createElement(m.b,{path:"/",exact:!0,component:q}),r.a.createElement(m.b,{path:"/confirm/:code",exact:!0,component:z}),r.a.createElement(m.a,{to:"/"}))},J=function(){var e=Object(a.useState)(null),t=Object(d.a)(e,2),n=t[0],r=t[1],c=Object(a.useState)(null),l=Object(d.a)(c,2),o=l[0],i=l[1],u=Object(a.useCallback)((function(e,t){r(e),i(t),localStorage.setItem("userData",JSON.stringify({token:e,userID:t}))}),[]),s=Object(a.useCallback)((function(){r(null),i(null),localStorage.removeItem("userData")}),[]);return Object(a.useEffect)((function(){var e=JSON.parse(localStorage.getItem("userData"));e&&e.token&&u(e.token,e.userID)}),[u]),{login:u,logout:s,userID:o,token:n}},R=n(76),U=n(78),H=n(49),M=function(){var e=Object(a.useContext)(g).logout;return r.a.createElement(j.a,{className:"justify-content-between bg-primary p-2 text-white align-items-center",noGutters:!0},r.a.createElement(R.a,null,"Short your link"),r.a.createElement(U.a,null,r.a.createElement(H.a,null,r.a.createElement(o.c,{to:"/create",className:"text-white p-1"},"Create")),r.a.createElement(H.a,null,r.a.createElement(o.c,{to:"/links",className:"text-white p-1"},"Links")),r.a.createElement(H.a,null,r.a.createElement("a",{href:"#",onClick:function(){return e()},className:"text-white"},"Logout"))))},V=function(){var e=J(),t=e.login,n=e.logout,a=e.token,c=e.userID,l=!!a,i=G(l);return r.a.createElement(g.Provider,{value:{login:t,logout:n,token:a,userID:c,isAuthenticated:l}},r.a.createElement(o.a,null,l&&r.a.createElement(M,null),r.a.createElement(u.a,null,i)),r.a.createElement(s.a,null))},Y=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function $(e,t){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var n=e.installing;null!=n&&(n.onstatechange=function(){"installed"===n.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}l.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(V,null)),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var t="".concat("","/service-worker.js");Y?(!function(e,t){fetch(e,{headers:{"Service-Worker":"script"}}).then((function(n){var a=n.headers.get("content-type");404===n.status||null!=a&&-1===a.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):$(e,t)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(t,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")}))):$(t,e)}))}}()}},[[52,1,2]]]);
//# sourceMappingURL=main.2d967c32.chunk.js.map