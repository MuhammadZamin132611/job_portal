"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[9884],{9884:(l,c,i)=>{i.r(c),i.d(c,{FacebookLoginWeb:()=>a});var r=i(5861),u=i(7423);class a extends u.Uw{constructor(){super({name:"FacebookLogin",platforms:["web"]})}initialize(e){const n={version:"v10.0"};return new Promise((s,o)=>{try{return this.loadScript(e.locale).then(()=>{FB.init(Object.assign(Object.assign({},n),e)),s()})}catch(t){o(t)}})}loadScript(e){if(typeof document>"u")return Promise.resolve();if(document?.getElementById("fb"))return Promise.resolve();const o=document.getElementsByTagName("head")[0],t=document.createElement("script");return new Promise(d=>{t.defer=!0,t.async=!0,t.id="fb",t.onload=()=>{d()},t.src=`https://connect.facebook.net/${e??"en_US"}/sdk.js`,o.appendChild(t)})}login(e){return(0,r.Z)(function*(){return console.log("FacebookLoginWeb.login",e),new Promise((n,s)=>{FB.login(o=>{console.debug("FB.login",o),"connected"===o.status?n({accessToken:{token:o.authResponse.accessToken}}):s({accessToken:{token:null}})},{scope:e.permissions.join(",")})})})()}logout(){return(0,r.Z)(function*(){return new Promise(e=>{FB.logout(()=>e())})})()}reauthorize(){return(0,r.Z)(function*(){return new Promise(e=>{FB.reauthorize(n=>e(n))})})()}getCurrentAccessToken(){return(0,r.Z)(function*(){return new Promise((e,n)=>{FB.getLoginStatus(s=>{"connected"===s.status?e({accessToken:{applicationId:void 0,declinedPermissions:[],expires:void 0,isExpired:void 0,lastRefresh:void 0,permissions:[],token:s.authResponse.accessToken,userId:s.authResponse.userID}}):n({accessToken:{token:null}})})})})()}getProfile(e){return(0,r.Z)(function*(){const n=e.fields.join(",");return new Promise((s,o)=>{FB.api("/me",{fields:n},t=>{t.error?o(t.error.message):s(t)})})})()}}}}]);