(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{151:function(e,n,t){e.exports=t(246)},241:function(e,n,t){},244:function(e,n,t){},246:function(e,n,t){"use strict";t.r(n);t(152),t(182),t(183),t(212),t(216),t(218),t(229);!function(){if("function"===typeof window.CustomEvent)return!1;function e(e,n){n=n||{bubbles:!1,cancelable:!1,detail:void 0};var t=document.createEvent("CustomEvent");return t.initCustomEvent(e,n.bubbles,n.cancelable,n.detail),t}e.prototype=window.Event.prototype,window.CustomEvent=e}();var a=t(1),o=t.n(a),r=t(103),i=t.n(r),l=(t(241),t(98)),c=t(99),u=t(102),s=t(100),m=t(101),d=t(251),p=t(252),f=t(248),h=t(250),v=t(36),b=t.n(v),g=(t(244),function(){return o.a.createElement("div",{className:"animated fadeIn pt-3 text-center"},o.a.createElement("div",{className:"sk-spinner sk-spinner-pulse"}))}),w=b()({loader:function(){return Promise.all([t.e(9),t.e(21)]).then(t.bind(null,547))},loading:g}),E=b()({loader:function(){return t.e(10).then(t.bind(null,550))},loading:g}),k=b()({loader:function(){return Promise.all([t.e(3),t.e(17)]).then(t.bind(null,551))},loading:g}),P=b()({loader:function(){return Promise.all([t.e(3),t.e(23)]).then(t.bind(null,537))},loading:g}),x=b()({loader:function(){return Promise.all([t.e(3),t.e(24)]).then(t.bind(null,538))},loading:g}),y=function(e){function n(e){var t;return Object(l.a)(this,n),(t=Object(u.a)(this,Object(s.a)(n).call(this,e))).state={token:""},t}return Object(m.a)(n,e),Object(c.a)(n,[{key:"componentWillMount",value:function(){var e=window.location.href,n=e.substr(e.indexOf("#")+1).split("&").reduce(function(e,n){var t=n.split("=");return e[t[0]]=t[1],e},{});this.setState({token:n.access_token})}},{key:"render",value:function(){var e=this.state.token;void 0!==e&&localStorage.setItem("token",e);var n=localStorage.getItem("token");return o.a.createElement(d.a,null,o.a.createElement(p.a,null,o.a.createElement(f.a,{exact:!0,path:"/register",name:"Register Page",component:k}),o.a.createElement(f.a,{exact:!0,path:"/404",name:"Page 404",component:P}),o.a.createElement(f.a,{exact:!0,path:"/500",name:"Page 500",component:x}),n?o.a.createElement(f.a,{path:"/",name:"Home",component:w}):o.a.createElement(f.a,{exact:!0,path:"/login",name:"Login Page",component:E}),!n&&o.a.createElement(h.a,{to:"/login"})))}}]),n}(a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(o.a.createElement(y,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[151,6,7]]]);
//# sourceMappingURL=main.f318b35b.chunk.js.map