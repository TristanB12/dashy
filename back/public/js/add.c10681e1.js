(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["add"],{"0e36":function(e,t,n){},1793:function(e,t,n){},"18e9":function(e,t,n){"use strict";n("0e36")},"1af2":function(e,t,n){},"24ff":function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"add-service"},[e.needToConnect?n("VConnectToService"):n("div",{staticClass:"widgets"},e._l(e.widgets,(function(t){return n("VWidgetPreview",{key:t.code,attrs:{widget:t},on:{"params-widget":function(n){return e.goToWidgetParams(t)}}})})),1)],1)},i=[],o=(n("d3b7"),n("159b"),n("7598")),a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"widget"},[n("img",{attrs:{src:e.getImgPath(),alt:""}}),n("h4",[e._v(e._s(e.widget.name))]),n("VButton",{attrs:{title:"Add",titleSize:"14px",width:"100px",height:"25px"},nativeOn:{click:function(t){return e.$router.push({name:"ServiceAdder",params:{service:e.$route.params.service,widgetCode:e.widget.code}})}}})],1)},s=[],c=n("af5a"),u={components:{VButton:c["a"]},props:{widget:{type:Object,default:void 0}},methods:{getImgPath:function(){return n("8ec0")("./"+this.widget.service.toLowerCase()+"_logo.png")}}},d=u,f=(n("2702"),n("2877")),p=Object(f["a"])(d,a,s,!1,null,"34421cf7",null),l=p.exports,h=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"connect-service"},[n("img",{attrs:{src:e.getImgPath(),alt:""}}),n("p",[e._v("To use this service you need to link your account.")]),n("VLightButton",{attrs:{title:e.connectString,iconName:this.$route.params.service+"_logo.png"},nativeOn:{click:function(t){return e.linkAccount.apply(null,arguments)}}})],1)},g=[],m=n("8aa1"),v=n("7c0b"),w={components:{VLightButton:v["a"]},computed:{connectString:function(){return"Connect with "+this.$route.params.service}},methods:{getImgPath:function(){return n("8ec0")("./"+this.$route.params.service.toLowerCase()+"_logo.png")},linkAccount:function(){var e,t=this,n=[{service:"spotify",func:m["spotifyAuthCode"]},{service:"twitch",func:m["twitchAuthCode"]},{service:"github",func:m["githubAuthCode"]}];n.forEach((function(n){t.$route.params.service.toLowerCase()==n.service&&(e=n.func("link"))}));var r=setInterval((function(){e.closed&&(clearInterval(r),t.$router.go(0))}),500)}}},b=w,y=(n("dba8"),Object(f["a"])(b,h,g,!1,null,"43df189d",null)),C=y.exports,P={components:{VConnectToService:C,VWidgetPreview:l,SpotifyTopArtistParameters:o["a"]},watch:{$route:{immediate:!0,handler:function(e,t){e&&t&&e.params.service!=t.params.service&&this.setWidgets()}}},data:function(){return{widgets:void 0,currentWidget:void 0}},computed:{needToConnect:function(){return console.log(this.$route.params.service),"dashy"!=this.$route.params.service&&!this.$store.state.user.services[this.$route.params.service].access_token}},mounted:function(){this.setWidgets()},methods:{setWidgets:function(){var e=this;this.$store.state.widgetsConf.forEach((function(t){t.service==e.$route.params.service&&(e.widgets=t.widgets)}))}}},_=P,O=(n("18e9"),Object(f["a"])(_,r,i,!1,null,"61fe7b05",null));t["default"]=O.exports},2702:function(e,t,n){"use strict";n("1af2")},"286f":function(e,t,n){},4236:function(e,t,n){},"6e93":function(e,t,n){"use strict";n("1793")},"7c0b":function(e,t,n){"use strict";var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("button",{staticClass:"light-button",style:e.styleObject},[e.iconName&&!e.isLoading?n("img",{attrs:{src:e.imagePath,alt:e.iconName}}):e._e(),e.title&&!e.isLoading?n("span",[e._v(e._s(e.title))]):n("ClipLoader",{attrs:{size:"20px",color:"grey"}})],1)},i=[],o=n("da7a"),a={components:{ClipLoader:o["a"]},props:{title:{type:String,default:null},iconName:{type:String,default:null},isLoading:{type:Boolean,default:!1},width:{type:String,default:void 0}},computed:{styleObject:function(){return this.width?{width:this.width}:{}},imagePath:function(){return n("1771")("./".concat(this.iconName))}}},s=a,c=(n("8712"),n("2877")),u=Object(c["a"])(s,r,i,!1,null,"541100c6",null);t["a"]=u.exports},8712:function(e,t,n){"use strict";n("286f")},"8aa1":function(e,t,n){var r=n("b383"),i=function(e){var t=window.open("https://accounts.spotify.com/authorize?"+r.stringify({response_type:"code",client_id:"2cb4475d23514256b4c21375f3350e4d",scope:"user-read-private user-read-email user-top-read",redirect_uri:"https://dashyepitech.herokuapp.com/callback/spotify",state:e}));return t},o=function(e){var t=window.open("https://www.facebook.com/v12.0/dialog/oauth?"+r.stringify({client_id:"1205864576573521",scope:"email",redirect_uri:"https://dashyepitech.herokuapp.com/callback/facebook",state:e}));return t},a=function(e){var t=window.open("https://github.com/login/oauth/authorize?"+r.stringify({client_id:"e8f31010e5b77ef70302",scope:"user",state:e}));return t},s=function(e){var t=window.open("https://id.twitch.tv/oauth2/authorize?"+r.stringify({client_id:"eaqynw4jsaq3htstpbqxyo0s8icht3",redirect_uri:"https://dashyepitech.herokuapp.com/callback/twitch",response_type:"code",scope:"user:read:follows",state:e}));return t};e.exports={spotifyAuthCode:i,facebookAuthCode:o,twitchAuthCode:s,githubAuthCode:a}},"91dd":function(e,t,n){"use strict";function r(e,t){return Object.prototype.hasOwnProperty.call(e,t)}e.exports=function(e,t,n,o){t=t||"&",n=n||"=";var a={};if("string"!==typeof e||0===e.length)return a;var s=/\+/g;e=e.split(t);var c=1e3;o&&"number"===typeof o.maxKeys&&(c=o.maxKeys);var u=e.length;c>0&&u>c&&(u=c);for(var d=0;d<u;++d){var f,p,l,h,g=e[d].replace(s,"%20"),m=g.indexOf(n);m>=0?(f=g.substr(0,m),p=g.substr(m+1)):(f=g,p=""),l=decodeURIComponent(f),h=decodeURIComponent(p),r(a,l)?i(a[l])?a[l].push(h):a[l]=[a[l],h]:a[l]=h}return a};var i=Array.isArray||function(e){return"[object Array]"===Object.prototype.toString.call(e)}},9575:function(e,t,n){"use strict";n("4236")},b383:function(e,t,n){"use strict";t.decode=t.parse=n("91dd"),t.encode=t.stringify=n("e099")},b62f:function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return e.$store.state.user?n("div",{staticClass:"add-page"},[n("div",{staticClass:"header"},[n("h2",[e._v("Add Widget")]),n("VCloseButton",{nativeOn:{click:function(t){return e.$router.push({name:"DashboardPage"})}}})],1),n("div",{staticClass:"content"},[e.$store.state.widgetsConf?n("TheServicesAside"):e._e(),n("router-view")],1)]):e._e()},i=[],o=n("1da1"),a=(n("96cf"),n("fa7b")),s=n("b9cf"),c=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("aside",[n("div",{staticClass:"container"},e._l(e.$store.state.widgetsConf,(function(t){return n("div",{key:t.service,staticClass:"service"},[n("router-link",{attrs:{to:{name:"AddServicePage",params:{service:t.service}}}},[n("div",[n("img",{attrs:{src:e.getImgPath(t.service),alt:""}})])])],1)})),0)])},u=[],d={methods:{getImgPath:function(e){return n("8ec0")("./"+e.toLowerCase()+"_logo.png")}}},f=d,p=(n("9575"),n("2877")),l=Object(p["a"])(f,c,u,!1,null,"066f7ef8",null),h=l.exports,g={components:{TheServicesAside:h,VCloseButton:a["a"]},data:function(){return{error:void 0}},mounted:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.getWidgetsConf();case 2:case"end":return t.stop()}}),t)})))()},methods:{getWidgetsConf:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(s["getALlWidgetsConf"])();case 2:n=t.sent,n[0]?e.$store.state.widgetsConf=n[0].widgets:e.error=n[1];case 4:case"end":return t.stop()}}),t)})))()}}},m=g,v=(n("ffc1"),Object(p["a"])(m,r,i,!1,null,"7ffc1a36",null));t["default"]=v.exports},c922:function(e,t,n){"use strict";n.r(t);var r,i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return e.widget?n("div",{staticClass:"adder"},[n("div",{staticClass:"header"},[n("img",{attrs:{src:e.getImgPath(),alt:""}}),n("h3",[e._v(e._s(e.widget.name))])]),n("div",{staticClass:"params-container"},[n(e.correspondingWidgetParams,{tag:"component",attrs:{config:e.widget.config},on:{"config-changed":e.changeConfig}})],1),n("div",{staticClass:"btn-container"},[n("div",[n("h4",[e._v("Refresh rate in secondes")]),n("VInput",{attrs:{width:"100px",type:"number",model:"60"},on:{"input-updated":e.changeRefreshRate}})],1),n("VButton",{attrs:{title:"Add",titleSize:"16px",width:"110px",height:"35px",isLoading:e.isLoading},nativeOn:{click:function(t){return e.addWidget.apply(null,arguments)}}})],1)]):e._e()},o=[],a=n("1da1"),s=n("ade3"),c=(n("96cf"),n("d3b7"),n("159b"),n("b9cf")),u=n("6cdc"),d=n("af5a"),f=n("be85"),p=n("7598"),l=n("28f2"),h=n("873d"),g=n("ef31"),m=n("5f3e"),v={components:(r={VButton:d["a"],VInput:u["a"],SpotifyTopArtistParameters:p["a"],SpotifyTopTracksParameters:f["a"],TwitchOnlineChannelsParameters:h["a"],TwitchUserProfileParameters:l["a"]},Object(s["a"])(r,"TwitchUserProfileParameters",l["a"]),Object(s["a"])(r,"GithubUserProfileParameters",g["a"]),Object(s["a"])(r,"DashyWantedPeopleParameters",m["a"]),r),data:function(){return{widget:void 0,error:void 0,config:void 0,isLoading:!1}},computed:{correspondingWidgetParams:function(){var e=this,t=[{code:"STA",component:"SpotifyTopArtistParameters"},{code:"STT",component:"SpotifyTopTracksParameters"},{code:"TOC",component:"TwitchOnlineChannelsParameters"},{code:"TUP",component:"TwitchUserProfileParameters"},{code:"GUP",component:"GithubUserProfileParameters"},{code:"FWP",component:"DashyWantedPeopleParameters"}],n=void 0;return t.forEach((function(t){t.code==e.widget.code&&(n=t.component)})),n}},mounted:function(){this.setWidget()},methods:{getImgPath:function(){return n("8ec0")("./"+this.widget.service.toLowerCase()+"_logo.png")},changeConfig:function(e){this.config=e},changeRefreshRate:function(e){console.log(e),this.widget.refreshRate=e},setWidget:function(){var e=this;this.$store.state.widgetsConf.forEach((function(t){t.service==e.$route.params.service&&t.widgets.forEach((function(t){t.code==e.$route.params.widgetCode&&(e.widget=t),e.config=t.config}))}))},addWidget:function(){var e=this;return Object(a["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.isLoading=!0,t.next=3,Object(c["addWidget"])(e.$store.state.token,e.widget);case 3:n=t.sent,n[0]?e.$router.push({name:"DashboardPage"}):e.error=n[1],e.isLoading=!1;case 6:case"end":return t.stop()}}),t)})))()}}},w=v,b=(n("6e93"),n("2877")),y=Object(b["a"])(w,i,o,!1,null,"1b6d5d87",null);t["default"]=y.exports},dba8:function(e,t,n){"use strict";n("f585")},e099:function(e,t,n){"use strict";var r=function(e){switch(typeof e){case"string":return e;case"boolean":return e?"true":"false";case"number":return isFinite(e)?e:"";default:return""}};e.exports=function(e,t,n,s){return t=t||"&",n=n||"=",null===e&&(e=void 0),"object"===typeof e?o(a(e),(function(a){var s=encodeURIComponent(r(a))+n;return i(e[a])?o(e[a],(function(e){return s+encodeURIComponent(r(e))})).join(t):s+encodeURIComponent(r(e[a]))})).join(t):s?encodeURIComponent(r(s))+n+encodeURIComponent(r(e)):""};var i=Array.isArray||function(e){return"[object Array]"===Object.prototype.toString.call(e)};function o(e,t){if(e.map)return e.map(t);for(var n=[],r=0;r<e.length;r++)n.push(t(e[r],r));return n}var a=Object.keys||function(e){var t=[];for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.push(n);return t}},e75c:function(e,t,n){},f585:function(e,t,n){},ffc1:function(e,t,n){"use strict";n("e75c")}}]);
//# sourceMappingURL=add.c10681e1.js.map