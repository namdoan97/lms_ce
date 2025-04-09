/*!
 * Chart.js v3.7.0
 * https://www.chartjs.org
 * (c) 2021 Chart.js Contributors
 * Released under the MIT License
 */
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t="undefined"!=typeof globalThis?globalThis:t||self).Chart=e()}(this,(function(){"use strict";const t="undefined"==typeof window?function(t){return t()}:window.requestAnimationFrame;function e(e,i,s){const n=s||(t=>Array.prototype.slice.call(t));let o=!1,a=[];return function(...s){a=n(s),o||(o=!0,t.call(window,(()=>{o=!1,e.apply(i,a)})))}}function i(t,e){let i;return function(...s){return e?(clearTimeout(i),i=setTimeout(t,e,s)):t.apply(this,s),e}}const s=t=>"start"===t?"left":"end"===t?"right":"center",n=(t,e,i)=>"start"===t?e:"end"===t?i:(e+i)/2,o=(t,e,i,s)=>t===(s?"left":"right")?i:"center"===t?(e+i)/2:e;var a=new class{constructor(){this._request=null,this._charts=new Map,this._running=!1,this._lastDate=void 0}_notify(t,e,i,s){const n=e.listeners[s],o=e.duration;n.forEach((s=>s({chart:t,initial:e.initial,numSteps:o,currentStep:Math.min(i-e.start,o)})))}_refresh(){this._request||(this._running=!0,this._request=t.call(window,(()=>{this._update(),this._request=null,this._running&&this._refresh()})))}_update(t=Date.now()){let e=0;this._charts.forEach(((i,s)=>{if(!i.running||!i.items.length)return;const n=i.items;let o,a=n.length-1,r=!1;for(;a>=0;--a)o=n[a],o._active?(o._total>i.duration&&(i.duration=o._total),o.tick(t),r=!0):(n[a]=n[n.length-1],n.pop());r&&(s.draw(),this._notify(s,i,t,"progress")),n.length||(i.running=!1,this._notify(s,i,t,"complete"),i.initial=!1),e+=n.length})),this._lastDate=t,0===e&&(this._running=!1)}_getAnims(t){const e=this._charts;let i=e.get(t);return i||(i={running:!1,initial:!0,items:[],listeners:{complete:[],progress:[]}},e.set(t,i)),i}listen(t,e,i){this._getAnims(t).listeners[e].push(i)}add(t,e){e&&e.length&&this._getAnims(t).items.push(...e)}has(t){return this._getAnims(t).items.length>0}start(t){const e=this._charts.get(t);e&&(e.running=!0,e.start=Date.now(),e.duration=e.items.reduce(((t,e)=>Math.max(t,e._duration)),0),this._refresh())}running(t){if(!this._running)return!1;const e=this._charts.get(t);return!!(e&&e.running&&e.items.length)}stop(t){const e=this._charts.get(t);if(!e||!e.items.length)return;const i=e.items;let s=i.length-1;for(;s>=0;--s)i[s].cancel();e.items=[],this._notify(t,e,Date.now(),"complete")}remove(t){return this._charts.delete(t)}};
/*!
 * @kurkle/color v0.1.9
 * https://github.com/kurkle/color#readme
 * (c) 2020 Jukka Kurkela
 * Released under the MIT License
 */const r={0:0,1:1,2:2,3:3,4:4,5:5,6:6,7:7,8:8,9:9,A:10,B:11,C:12,D:13,E:14,F:15,a:10,b:11,c:12,d:13,e:14,f:15},l="0123456789ABCDEF",h=t=>l[15&t],c=t=>l[(240&t)>>4]+l[15&t],d=t=>(240&t)>>4==(15&t);function u(t){var e=function(t){return d(t.r)&&d(t.g)&&d(t.b)&&d(t.a)}(t)?h:c;return t?"#"+e(t.r)+e(t.g)+e(t.b)+(t.a<255?e(t.a):""):t}function f(t){return t+.5|0}const g=(t,e,i)=>Math.max(Math.min(t,i),e);function p(t){return g(f(2.55*t),0,255)}function m(t){return g(f(255*t),0,255)}function x(t){return g(f(t/2.55)/100,0,1)}function b(t){return g(f(100*t),0,100)}const _=/^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;const y=/^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;function v(t,e,i){const s=e*Math.min(i,1-i),n=(e,n=(e+t/30)%12)=>i-s*Math.max(Math.min(n-3,9-n,1),-1);return[n(0),n(8),n(4)]}function w(t,e,i){const s=(s,n=(s+t/60)%6)=>i-i*e*Math.max(Math.min(n,4-n,1),0);return[s(5),s(3),s(1)]}function M(t,e,i){const s=v(t,1,.5);let n;for(e+i>1&&(n=1/(e+i),e*=n,i*=n),n=0;n<3;n++)s[n]*=1-e-i,s[n]+=e;return s}function k(t){const e=t.r/255,i=t.g/255,s=t.b/255,n=Math.max(e,i,s),o=Math.min(e,i,s),a=(n+o)/2;let r,l,h;return n!==o&&(h=n-o,l=a>.5?h/(2-n-o):h/(n+o),r=n===e?(i-s)/h+(i<s?6:0):n===i?(s-e)/h+2:(e-i)/h+4,r=60*r+.5),[0|r,l||0,a]}function S(t,e,i,s){return(Array.isArray(e)?t(e[0],e[1],e[2]):t(e,i,s)).map(m)}function P(t,e,i){return S(v,t,e,i)}function D(t){return(t%360+360)%360}function C(t){const e=y.exec(t);let i,s=255;if(!e)return;e[5]!==i&&(s=e[6]?p(+e[5]):m(+e[5]));const n=D(+e[2]),o=+e[3]/100,a=+e[4]/100;return i="hwb"===e[1]?function(t,e,i){return S(M,t,e,i)}(n,o,a):"hsv"===e[1]?function(t,e,i){return S(w,t,e,i)}(n,o,a):P(n,o,a),{r:i[0],g:i[1],b:i[2],a:s}}const O={x:"dark",Z:"light",Y:"re",X:"blu",W:"gr",V:"medium",U:"slate",A:"ee",T:"ol",S:"or",B:"ra",C:"lateg",D:"ights",R:"in",Q:"turquois",E:"hi",P:"ro",O:"al",N:"le",M:"de",L:"yello",F:"en",K:"ch",G:"arks",H:"ea",I:"ightg",J:"wh"},A={OiceXe:"f0f8ff",antiquewEte:"faebd7",aqua:"ffff",aquamarRe:"7fffd4",azuY:"f0ffff",beige:"f5f5dc",bisque:"ffe4c4",black:"0",blanKedOmond:"ffebcd",Xe:"ff",XeviTet:"8a2be2",bPwn:"a52a2a",burlywood:"deb887",caMtXe:"5f9ea0",KartYuse:"7fff00",KocTate:"d2691e",cSO:"ff7f50",cSnflowerXe:"6495ed",cSnsilk:"fff8dc",crimson:"dc143c",cyan:"ffff",xXe:"8b",xcyan:"8b8b",xgTMnPd:"b8860b",xWay:"a9a9a9",xgYF:"6400",xgYy:"a9a9a9",xkhaki:"bdb76b",xmagFta:"8b008b",xTivegYF:"556b2f",xSange:"ff8c00",xScEd:"9932cc",xYd:"8b0000",xsOmon:"e9967a",xsHgYF:"8fbc8f",xUXe:"483d8b",xUWay:"2f4f4f",xUgYy:"2f4f4f",xQe:"ced1",xviTet:"9400d3",dAppRk:"ff1493",dApskyXe:"bfff",dimWay:"696969",dimgYy:"696969",dodgerXe:"1e90ff",fiYbrick:"b22222",flSOwEte:"fffaf0",foYstWAn:"228b22",fuKsia:"ff00ff",gaRsbSo:"dcdcdc",ghostwEte:"f8f8ff",gTd:"ffd700",gTMnPd:"daa520",Way:"808080",gYF:"8000",gYFLw:"adff2f",gYy:"808080",honeyMw:"f0fff0",hotpRk:"ff69b4",RdianYd:"cd5c5c",Rdigo:"4b0082",ivSy:"fffff0",khaki:"f0e68c",lavFMr:"e6e6fa",lavFMrXsh:"fff0f5",lawngYF:"7cfc00",NmoncEffon:"fffacd",ZXe:"add8e6",ZcSO:"f08080",Zcyan:"e0ffff",ZgTMnPdLw:"fafad2",ZWay:"d3d3d3",ZgYF:"90ee90",ZgYy:"d3d3d3",ZpRk:"ffb6c1",ZsOmon:"ffa07a",ZsHgYF:"20b2aa",ZskyXe:"87cefa",ZUWay:"778899",ZUgYy:"778899",ZstAlXe:"b0c4de",ZLw:"ffffe0",lime:"ff00",limegYF:"32cd32",lRF:"faf0e6",magFta:"ff00ff",maPon:"800000",VaquamarRe:"66cdaa",VXe:"cd",VScEd:"ba55d3",VpurpN:"9370db",VsHgYF:"3cb371",VUXe:"7b68ee",VsprRggYF:"fa9a",VQe:"48d1cc",VviTetYd:"c71585",midnightXe:"191970",mRtcYam:"f5fffa",mistyPse:"ffe4e1",moccasR:"ffe4b5",navajowEte:"ffdead",navy:"80",Tdlace:"fdf5e6",Tive:"808000",TivedBb:"6b8e23",Sange:"ffa500",SangeYd:"ff4500",ScEd:"da70d6",pOegTMnPd:"eee8aa",pOegYF:"98fb98",pOeQe:"afeeee",pOeviTetYd:"db7093",papayawEp:"ffefd5",pHKpuff:"ffdab9",peru:"cd853f",pRk:"ffc0cb",plum:"dda0dd",powMrXe:"b0e0e6",purpN:"800080",YbeccapurpN:"663399",Yd:"ff0000",Psybrown:"bc8f8f",PyOXe:"4169e1",saddNbPwn:"8b4513",sOmon:"fa8072",sandybPwn:"f4a460",sHgYF:"2e8b57",sHshell:"fff5ee",siFna:"a0522d",silver:"c0c0c0",skyXe:"87ceeb",UXe:"6a5acd",UWay:"708090",UgYy:"708090",snow:"fffafa",sprRggYF:"ff7f",stAlXe:"4682b4",tan:"d2b48c",teO:"8080",tEstN:"d8bfd8",tomato:"ff6347",Qe:"40e0d0",viTet:"ee82ee",JHt:"f5deb3",wEte:"ffffff",wEtesmoke:"f5f5f5",Lw:"ffff00",LwgYF:"9acd32"};let T;function L(t){T||(T=function(){const t={},e=Object.keys(A),i=Object.keys(O);let s,n,o,a,r;for(s=0;s<e.length;s++){for(a=r=e[s],n=0;n<i.length;n++)o=i[n],r=r.replace(o,O[o]);o=parseInt(A[a],16),t[r]=[o>>16&255,o>>8&255,255&o]}return t}(),T.transparent=[0,0,0,0]);const e=T[t.toLowerCase()];return e&&{r:e[0],g:e[1],b:e[2],a:4===e.length?e[3]:255}}function R(t,e,i){if(t){let s=k(t);s[e]=Math.max(0,Math.min(s[e]+s[e]*i,0===e?360:1)),s=P(s),t.r=s[0],t.g=s[1],t.b=s[2]}}function E(t,e){return t?Object.assign(e||{},t):t}function I(t){var e={r:0,g:0,b:0,a:255};return Array.isArray(t)?t.length>=3&&(e={r:t[0],g:t[1],b:t[2],a:255},t.length>3&&(e.a=m(t[3]))):(e=E(t,{r:0,g:0,b:0,a:1})).a=m(e.a),e}function z(t){return"r"===t.charAt(0)?function(t){const e=_.exec(t);let i,s,n,o=255;if(e){if(e[7]!==i){const t=+e[7];o=255&(e[8]?p(t):255*t)}return i=+e[1],s=+e[3],n=+e[5],i=255&(e[2]?p(i):i),s=255&(e[4]?p(s):s),n=255&(e[6]?p(n):n),{r:i,g:s,b:n,a:o}}}(t):C(t)}class F{constructor(t){if(t instanceof F)return t;const e=typeof t;let i;var s,n,o;"object"===e?i=I(t):"string"===e&&(o=(s=t).length,"#"===s[0]&&(4===o||5===o?n={r:255&17*r[s[1]],g:255&17*r[s[2]],b:255&17*r[s[3]],a:5===o?17*r[s[4]]:255}:7!==o&&9!==o||(n={r:r[s[1]]<<4|r[s[2]],g:r[s[3]]<<4|r[s[4]],b:r[s[5]]<<4|r[s[6]],a:9===o?r[s[7]]<<4|r[s[8]]:255})),i=n||L(t)||z(t)),this._rgb=i,this._valid=!!i}get valid(){return this._valid}get rgb(){var t=E(this._rgb);return t&&(t.a=x(t.a)),t}set rgb(t){this._rgb=I(t)}rgbString(){return this._valid?(t=this._rgb)&&(t.a<255?`rgba(${t.r}, ${t.g}, ${t.b}, ${x(t.a)})`:`rgb(${t.r}, ${t.g}, ${t.b})`):this._rgb;var t}hexString(){return this._valid?u(this._rgb):this._rgb}hslString(){return this._valid?function(t){if(!t)return;const e=k(t),i=e[0],s=b(e[1]),n=b(e[2]);return t.a<255?`hsla(${i}, ${s}%, ${n}%, ${x(t.a)})`:`hsl(${i}, ${s}%, ${n}%)`}(this._rgb):this._rgb}mix(t,e){const i=this;if(t){const s=i.rgb,n=t.rgb;let o;const a=e===o?.5:e,r=2*a-1,l=s.a-n.a,h=((r*l==-1?r:(r+l)/(1+r*l))+1)/2;o=1-h,s.r=255&h*s.r+o*n.r+.5,s.g=255&h*s.g+o*n.g+.5,s.b=255&h*s.b+o*n.b+.5,s.a=a*s.a+(1-a)*n.a,i.rgb=s}return i}clone(){return new F(this.rgb)}alpha(t){return this._rgb.a=m(t),this}clearer(t){return this._rgb.a*=1-t,this}greyscale(){const t=this._rgb,e=f(.3*t.r+.59*t.g+.11*t.b);return t.r=t.g=t.b=e,this}opaquer(t){return this._rgb.a*=1+t,this}negate(){const t=this._rgb;return t.r=255-t.r,t.g=255-t.g,t.b=255-t.b,this}lighten(t){return R(this._rgb,2,t),this}darken(t){return R(this._rgb,2,-t),this}saturate(t){return R(this._rgb,1,t),this}desaturate(t){return R(this._rgb,1,-t),this}rotate(t){return function(t,e){var i=k(t);i[0]=D(i[0]+e),i=P(i),t.r=i[0],t.g=i[1],t.b=i[2]}(this._rgb,t),this}}function B(t){return new F(t)}const V=t=>t instanceof CanvasGradient||t instanceof CanvasPattern;function W(t){return V(t)?t:B(t)}function N(t){return V(t)?t:B(t).saturate(.5).darken(.1).hexString()}function H(){}const j=function(){let t=0;return function(){return t++}}();function $(t){return null==t}function Y(t){if(Array.isArray&&Array.isArray(t))return!0;const e=Object.prototype.toString.call(t);return"[object"===e.substr(0,7)&&"Array]"===e.substr(-6)}function U(t){return null!==t&&"[object Object]"===Object.prototype.toString.call(t)}const X=t=>("number"==typeof t||t instanceof Number)&&isFinite(+t);function q(t,e){return X(t)?t:e}function K(t,e){return void 0===t?e:t}const G=(t,e)=>"string"==typeof t&&t.endsWith("%")?parseFloat(t)/100:t/e,Z=(t,e)=>"string"==typeof t&&t.endsWith("%")?parseFloat(t)/100*e:+t;function J(t,e,i){if(t&&"function"==typeof t.call)return t.apply(i,e)}function Q(t,e,i,s){let n,o,a;if(Y(t))if(o=t.length,s)for(n=o-1;n>=0;n--)e.call(i,t[n],n);else for(n=0;n<o;n++)e.call(i,t[n],n);else if(U(t))for(a=Object.keys(t),o=a.length,n=0;n<o;n++)e.call(i,t[a[n]],a[n])}function tt(t,e){let i,s,n,o;if(!t||!e||t.length!==e.length)return!1;for(i=0,s=t.length;i<s;++i)if(n=t[i],o=e[i],n.datasetIndex!==o.datasetIndex||n.index!==o.index)return!1;return!0}function et(t){if(Y(t))return t.map(et);if(U(t)){const e=Object.create(null),i=Object.keys(t),s=i.length;let n=0;for(;n<s;++n)e[i[n]]=et(t[i[n]]);return e}return t}function it(t){return-1===["__proto__","prototype","constructor"].indexOf(t)}function st(t,e,i,s){if(!it(t))return;const n=e[t],o=i[t];U(n)&&U(o)?nt(n,o,s):e[t]=et(o)}function nt(t,e,i){const s=Y(e)?e:[e],n=s.length;if(!U(t))return t;const o=(i=i||{}).merger||st;for(let a=0;a<n;++a){if(!U(e=s[a]))continue;const n=Object.keys(e);for(let s=0,a=n.length;s<a;++s)o(n[s],t,e,i)}return t}function ot(t,e){return nt(t,e,{merger:at})}function at(t,e,i){if(!it(t))return;const s=e[t],n=i[t];U(s)&&U(n)?ot(s,n):Object.prototype.hasOwnProperty.call(e,t)||(e[t]=et(n))}function rt(t,e){const i=t.indexOf(".",e);return-1===i?t.length:i}function lt(t,e){if(""===e)return t;let i=0,s=rt(e,i);for(;t&&s>i;)t=t[e.substr(i,s-i)],i=s+1,s=rt(e,i);return t}function ht(t){return t.charAt(0).toUpperCase()+t.slice(1)}const ct=t=>void 0!==t,dt=t=>"function"==typeof t,ut=(t,e)=>{if(t.size!==e.size)return!1;for(const i of t)if(!e.has(i))return!1;return!0};function ft(t){return"mouseup"===t.type||"click"===t.type||"contextmenu"===t.type}const gt=Object.create(null),pt=Object.create(null);function mt(t,e){if(!e)return t;const i=e.split(".");for(let e=0,s=i.length;e<s;++e){const s=i[e];t=t[s]||(t[s]=Object.create(null))}return t}function xt(t,e,i){return"string"==typeof e?nt(mt(t,e),i):nt(mt(t,""),e)}var bt=new class{constructor(t){this.animation=void 0,this.backgroundColor="rgba(0,0,0,0.1)",this.borderColor="rgba(0,0,0,0.1)",this.color="#666",this.datasets={},this.devicePixelRatio=t=>t.chart.platform.getDevicePixelRatio(),this.elements={},this.events=["mousemove","mouseout","click","touchstart","touchmove"],this.font={family:"'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",size:12,style:"normal",lineHeight:1.2,weight:null},this.hover={},this.hoverBackgroundColor=(t,e)=>N(e.backgroundColor),this.hoverBorderColor=(t,e)=>N(e.borderColor),this.hoverColor=(t,e)=>N(e.color),this.indexAxis="x",this.interaction={mode:"nearest",intersect:!0},this.maintainAspectRatio=!0,this.onHover=null,this.onClick=null,this.parsing=!0,this.plugins={},this.responsive=!0,this.scale=void 0,this.scales={},this.showLine=!0,this.drawActiveElementsOnTop=!0,this.describe(t)}set(t,e){return xt(this,t,e)}get(t){return mt(this,t)}describe(t,e){return xt(pt,t,e)}override(t,e){return xt(gt,t,e)}route(t,e,i,s){const n=mt(this,t),o=mt(this,i),a="_"+e;Object.defineProperties(n,{[a]:{value:n[e],writable:!0},[e]:{enumerable:!0,get(){const t=this[a],e=o[s];return U(t)?Object.assign({},e,t):K(t,e)},set(t){this[a]=t}}})}}({_scriptable:t=>!t.startsWith("on"),_indexable:t=>"events"!==t,hover:{_fallback:"interaction"},interaction:{_scriptable:!1,_indexable:!1}});const _t=Math.PI,yt=2*_t,vt=yt+_t,wt=Number.POSITIVE_INFINITY,Mt=_t/180,kt=_t/2,St=_t/4,Pt=2*_t/3,Dt=Math.log10,Ct=Math.sign;function Ot(t){const e=Math.round(t);t=Lt(t,e,t/1e3)?e:t;const i=Math.pow(10,Math.floor(Dt(t))),s=t/i;return(s<=1?1:s<=2?2:s<=5?5:10)*i}function At(t){const e=[],i=Math.sqrt(t);let s;for(s=1;s<i;s++)t%s==0&&(e.push(s),e.push(t/s));return i===(0|i)&&e.push(i),e.sort(((t,e)=>t-e)).pop(),e}function Tt(t){return!isNaN(parseFloat(t))&&isFinite(t)}function Lt(t,e,i){return Math.abs(t-e)<i}function Rt(t,e){const i=Math.round(t);return i-e<=t&&i+e>=t}function Et(t,e,i){let s,n,o;for(s=0,n=t.length;s<n;s++)o=t[s][i],isNaN(o)||(e.min=Math.min(e.min,o),e.max=Math.max(e.max,o))}function It(t){return t*(_t/180)}function zt(t){return t*(180/_t)}function Ft(t){if(!X(t))return;let e=1,i=0;for(;Math.round(t*e)/e!==t;)e*=10,i++;return i}function Bt(t,e){const i=e.x-t.x,s=e.y-t.y,n=Math.sqrt(i*i+s*s);let o=Math.atan2(s,i);return o<-.5*_t&&(o+=yt),{angle:o,distance:n}}function Vt(t,e){return Math.sqrt(Math.pow(e.x-t.x,2)+Math.pow(e.y-t.y,2))}function Wt(t,e){return(t-e+vt)%yt-_t}function Nt(t){return(t%yt+yt)%yt}function Ht(t,e,i,s){const n=Nt(t),o=Nt(e),a=Nt(i),r=Nt(o-n),l=Nt(a-n),h=Nt(n-o),c=Nt(n-a);return n===o||n===a||s&&o===a||r>l&&h<c}function jt(t,e,i){return Math.max(e,Math.min(i,t))}function $t(t){return jt(t,-32768,32767)}function Yt(t,e,i,s=1e-6){return t>=Math.min(e,i)-s&&t<=Math.max(e,i)+s}function Ut(t){return!t||$(t.size)||$(t.family)?null:(t.style?t.style+" ":"")+(t.weight?t.weight+" ":"")+t.size+"px "+t.family}function Xt(t,e,i,s,n){let o=e[n];return o||(o=e[n]=t.measureText(n).width,i.push(n)),o>s&&(s=o),s}function qt(t,e,i,s){let n=(s=s||{}).data=s.data||{},o=s.garbageCollect=s.garbageCollect||[];s.font!==e&&(n=s.data={},o=s.garbageCollect=[],s.font=e),t.save(),t.font=e;let a=0;const r=i.length;let l,h,c,d,u;for(l=0;l<r;l++)if(d=i[l],null!=d&&!0!==Y(d))a=Xt(t,n,o,a,d);else if(Y(d))for(h=0,c=d.length;h<c;h++)u=d[h],null==u||Y(u)||(a=Xt(t,n,o,a,u));t.restore();const f=o.length/2;if(f>i.length){for(l=0;l<f;l++)delete n[o[l]];o.splice(0,f)}return a}function Kt(t,e,i){const s=t.currentDevicePixelRatio,n=0!==i?Math.max(i/2,.5):0;return Math.round((e-n)*s)/s+n}function Gt(t,e){(e=e||t.getContext("2d")).save(),e.resetTransform(),e.clearRect(0,0,t.width,t.height),e.restore()}function Zt(t,e,i,s){let n,o,a,r,l;const h=e.pointStyle,c=e.rotation,d=e.radius;let u=(c||0)*Mt;if(h&&"object"==typeof h&&(n=h.toString(),"[object HTMLImageElement]"===n||"[object HTMLCanvasElement]"===n))return t.save(),t.translate(i,s),t.rotate(u),t.drawImage(h,-h.width/2,-h.height/2,h.width,h.height),void t.restore();if(!(isNaN(d)||d<=0)){switch(t.beginPath(),h){default:t.arc(i,s,d,0,yt),t.closePath();break;case"triangle":t.moveTo(i+Math.sin(u)*d,s-Math.cos(u)*d),u+=Pt,t.lineTo(i+Math.sin(u)*d,s-Math.cos(u)*d),u+=Pt,t.lineTo(i+Math.sin(u)*d,s-Math.cos(u)*d),t.closePath();break;case"rectRounded":l=.516*d,r=d-l,o=Math.cos(u+St)*r,a=Math.sin(u+St)*r,t.arc(i-o,s-a,l,u-_t,u-kt),t.arc(i+a,s-o,l,u-kt,u),t.arc(i+o,s+a,l,u,u+kt),t.arc(i-a,s+o,l,u+kt,u+_t),t.closePath();break;case"rect":if(!c){r=Math.SQRT1_2*d,t.rect(i-r,s-r,2*r,2*r);break}u+=St;case"rectRot":o=Math.cos(u)*d,a=Math.sin(u)*d,t.moveTo(i-o,s-a),t.lineTo(i+a,s-o),t.lineTo(i+o,s+a),t.lineTo(i-a,s+o),t.closePath();break;case"crossRot":u+=St;case"cross":o=Math.cos(u)*d,a=Math.sin(u)*d,t.moveTo(i-o,s-a),t.lineTo(i+o,s+a),t.moveTo(i+a,s-o),t.lineTo(i-a,s+o);break;case"star":o=Math.cos(u)*d,a=Math.sin(u)*d,t.moveTo(i-o,s-a),t.lineTo(i+o,s+a),t.moveTo(i+a,s-o),t.lineTo(i-a,s+o),u+=St,o=Math.cos(u)*d,a=Math.sin(u)*d,t.moveTo(i-o,s-a),t.lineTo(i+o,s+a),t.moveTo(i+a,s-o),t.lineTo(i-a,s+o);break;case"line":o=Math.cos(u)*d,a=Math.sin(u)*d,t.moveTo(i-o,s-a),t.lineTo(i+o,s+a);break;case"dash":t.moveTo(i,s),t.lineTo(i+Math.cos(u)*d,s+Math.sin(u)*d)}t.fill(),e.borderWidth>0&&t.stroke()}}function Jt(t,e,i){return i=i||.5,!e||t&&t.x>e.left-i&&t.x<e.right+i&&t.y>e.top-i&&t.y<e.bottom+i}function Qt(t,e){t.save(),t.beginPath(),t.rect(e.left,e.top,e.right-e.left,e.bottom-e.top),t.clip()}function te(t){t.restore()}function ee(t,e,i,s,n){if(!e)return t.lineTo(i.x,i.y);if("middle"===n){const s=(e.x+i.x)/2;t.lineTo(s,e.y),t.lineTo(s,i.y)}else"after"===n!=!!s?t.lineTo(e.x,i.y):t.lineTo(i.x,e.y);t.lineTo(i.x,i.y)}function ie(t,e,i,s){if(!e)return t.lineTo(i.x,i.y);t.bezierCurveTo(s?e.cp1x:e.cp2x,s?e.cp1y:e.cp2y,s?i.cp2x:i.cp1x,s?i.cp2y:i.cp1y,i.x,i.y)}function se(t,e,i,s,n,o={}){const a=Y(e)?e:[e],r=o.strokeWidth>0&&""!==o.strokeColor;let l,h;for(t.save(),t.font=n.string,function(t,e){e.translation&&t.translate(e.translation[0],e.translation[1]);$(e.rotation)||t.rotate(e.rotation);e.color&&(t.fillStyle=e.color);e.textAlign&&(t.textAlign=e.textAlign);e.textBaseline&&(t.textBaseline=e.textBaseline)}(t,o),l=0;l<a.length;++l)h=a[l],r&&(o.strokeColor&&(t.strokeStyle=o.strokeColor),$(o.strokeWidth)||(t.lineWidth=o.strokeWidth),t.strokeText(h,i,s,o.maxWidth)),t.fillText(h,i,s,o.maxWidth),ne(t,i,s,h,o),s+=n.lineHeight;t.restore()}function ne(t,e,i,s,n){if(n.strikethrough||n.underline){const o=t.measureText(s),a=e-o.actualBoundingBoxLeft,r=e+o.actualBoundingBoxRight,l=i-o.actualBoundingBoxAscent,h=i+o.actualBoundingBoxDescent,c=n.strikethrough?(l+h)/2:h;t.strokeStyle=t.fillStyle,t.beginPath(),t.lineWidth=n.decorationWidth||2,t.moveTo(a,c),t.lineTo(r,c),t.stroke()}}function oe(t,e){const{x:i,y:s,w:n,h:o,radius:a}=e;t.arc(i+a.topLeft,s+a.topLeft,a.topLeft,-kt,_t,!0),t.lineTo(i,s+o-a.bottomLeft),t.arc(i+a.bottomLeft,s+o-a.bottomLeft,a.bottomLeft,_t,kt,!0),t.lineTo(i+n-a.bottomRight,s+o),t.arc(i+n-a.bottomRight,s+o-a.bottomRight,a.bottomRight,kt,0,!0),t.lineTo(i+n,s+a.topRight),t.arc(i+n-a.topRight,s+a.topRight,a.topRight,0,-kt,!0),t.lineTo(i+a.topLeft,s)}function ae(t,e,i){i=i||(i=>t[i]<e);let s,n=t.length-1,o=0;for(;n-o>1;)s=o+n>>1,i(s)?o=s:n=s;return{lo:o,hi:n}}const re=(t,e,i)=>ae(t,i,(s=>t[s][e]<i)),le=(t,e,i)=>ae(t,i,(s=>t[s][e]>=i));function he(t,e,i){let s=0,n=t.length;for(;s<n&&t[s]<e;)s++;for(;n>s&&t[n-1]>i;)n--;return s>0||n<t.length?t.slice(s,n):t}const ce=["push","pop","shift","splice","unshift"];function de(t,e){t._chartjs?t._chartjs.listeners.push(e):(Object.defineProperty(t,"_chartjs",{configurable:!0,enumerable:!1,value:{listeners:[e]}}),ce.forEach((e=>{const i="_onData"+ht(e),s=t[e];Object.defineProperty(t,e,{configurable:!0,enumerable:!1,value(...e){const n=s.apply(this,e);return t._chartjs.listeners.forEach((t=>{"function"==typeof t[i]&&t[i](...e)})),n}})})))}function ue(t,e){const i=t._chartjs;if(!i)return;const s=i.listeners,n=s.indexOf(e);-1!==n&&s.splice(n,1),s.length>0||(ce.forEach((e=>{delete t[e]})),delete t._chartjs)}function fe(t){const e=new Set;let i,s;for(i=0,s=t.length;i<s;++i)e.add(t[i]);return e.size===s?t:Array.from(e)}function ge(){return"undefined"!=typeof window&&"undefined"!=typeof document}function pe(t){let e=t.parentNode;return e&&"[object ShadowRoot]"===e.toString()&&(e=e.host),e}function me(t,e,i){let s;return"string"==typeof t?(s=parseInt(t,10),-1!==t.indexOf("%")&&(s=s/100*e.parentNode[i])):s=t,s}const xe=t=>window.getComputedStyle(t,null);function be(t,e){return xe(t).getPropertyValue(e)}const _e=["top","right","bottom","left"];function ye(t,e,i){const s={};i=i?"-"+i:"";for(let n=0;n<4;n++){const o=_e[n];s[o]=parseFloat(t[e+"-"+o+i])||0}return s.width=s.left+s.right,s.height=s.top+s.bottom,s}function ve(t,e){const{canvas:i,currentDevicePixelRatio:s}=e,n=xe(i),o="border-box"===n.boxSizing,a=ye(n,"padding"),r=ye(n,"border","width"),{x:l,y:h,box:c}=function(t,e){const i=t.native||t,s=i.touches,n=s&&s.length?s[0]:i,{offsetX:o,offsetY:a}=n;let r,l,h=!1;if(((t,e,i)=>(t>0||e>0)&&(!i||!i.shadowRoot))(o,a,i.target))r=o,l=a;else{const t=e.getBoundingClientRect();r=n.clientX-t.left,l=n.clientY-t.top,h=!0}return{x:r,y:l,box:h}}(t,i),d=a.left+(c&&r.left),u=a.top+(c&&r.top);let{width:f,height:g}=e;return o&&(f-=a.width+r.width,g-=a.height+r.height),{x:Math.round((l-d)/f*i.width/s),y:Math.round((h-u)/g*i.height/s)}}const we=t=>Math.round(10*t)/10;function Me(t,e,i,s){const n=xe(t),o=ye(n,"margin"),a=me(n.maxWidth,t,"clientWidth")||wt,r=me(n.maxHeight,t,"clientHeight")||wt,l=function(t,e,i){let s,n;if(void 0===e||void 0===i){const o=pe(t);if(o){const t=o.getBoundingClientRect(),a=xe(o),r=ye(a,"border","width"),l=ye(a,"padding");e=t.width-l.width-r.width,i=t.height-l.height-r.height,s=me(a.maxWidth,o,"clientWidth"),n=me(a.maxHeight,o,"clientHeight")}else e=t.clientWidth,i=t.clientHeight}return{width:e,height:i,maxWidth:s||wt,maxHeight:n||wt}}(t,e,i);let{width:h,height:c}=l;if("content-box"===n.boxSizing){const t=ye(n,"border","width"),e=ye(n,"padding");h-=e.width+t.width,c-=e.height+t.height}return h=Math.max(0,h-o.width),c=Math.max(0,s?Math.floor(h/s):c-o.height),h=we(Math.min(h,a,l.maxWidth)),c=we(Math.min(c,r,l.maxHeight)),h&&!c&&(c=we(h/2)),{width:h,height:c}}function ke(t,e,i){const s=e||1,n=Math.floor(t.height*s),o=Math.floor(t.width*s);t.height=n/s,t.width=o/s;const a=t.canvas;return a.style&&(i||!a.style.height&&!a.style.width)&&(a.style.height=`${t.height}px`,a.style.width=`${t.width}px`),(t.currentDevicePixelRatio!==s||a.height!==n||a.width!==o)&&(t.currentDevicePixelRatio=s,a.height=n,a.width=o,t.ctx.setTransform(s,0,0,s,0,0),!0)}const Se=function(){let t=!1;try{const e={get passive(){return t=!0,!1}};window.addEventListener("test",null,e),window.removeEventListener("test",null,e)}catch(t){}return t}();function Pe(t,e){const i=be(t,e),s=i&&i.match(/^(\d+)(\.\d+)?px$/);return s?+s[1]:void 0}function De(t,e){return"native"in t?{x:t.x,y:t.y}:ve(t,e)}function Ce(t,e,i,s){const{controller:n,data:o,_sorted:a}=t,r=n._cachedMeta.iScale;if(r&&e===r.axis&&"r"!==e&&a&&o.length){const t=r._reversePixels?le:re;if(!s)return t(o,e,i);if(n._sharedOptions){const s=o[0],n="function"==typeof s.getRange&&s.getRange(e);if(n){const s=t(o,e,i-n),a=t(o,e,i+n);return{lo:s.lo,hi:a.hi}}}}return{lo:0,hi:o.length-1}}function Oe(t,e,i,s,n){const o=t.getSortedVisibleDatasetMetas(),a=i[e];for(let t=0,i=o.length;t<i;++t){const{index:i,data:r}=o[t],{lo:l,hi:h}=Ce(o[t],e,a,n);for(let t=l;t<=h;++t){const e=r[t];e.skip||s(e,i,t)}}}function Ae(t,e,i,s){const n=[];if(!Jt(e,t.chartArea,t._minPadding))return n;return Oe(t,i,e,(function(t,i,o){t.inRange(e.x,e.y,s)&&n.push({element:t,datasetIndex:i,index:o})}),!0),n}function Te(t,e,i,s,n){let o=[];const a=function(t){const e=-1!==t.indexOf("x"),i=-1!==t.indexOf("y");return function(t,s){const n=e?Math.abs(t.x-s.x):0,o=i?Math.abs(t.y-s.y):0;return Math.sqrt(Math.pow(n,2)+Math.pow(o,2))}}(i);let r=Number.POSITIVE_INFINITY;return Oe(t,i,e,(function(i,l,h){const c=i.inRange(e.x,e.y,n);if(s&&!c)return;const d=i.getCenterPoint(n);if(!Jt(d,t.chartArea,t._minPadding)&&!c)return;const u=a(e,d);u<r?(o=[{element:i,datasetIndex:l,index:h}],r=u):u===r&&o.push({element:i,datasetIndex:l,index:h})})),o}function Le(t,e,i,s,n){return Jt(e,t.chartArea,t._minPadding)?"r"!==i||s?Te(t,e,i,s,n):function(t,e,i,s){let n=[];return Oe(t,i,e,(function(t,i,o){const{startAngle:a,endAngle:r}=t.getProps(["startAngle","endAngle"],s),{angle:l}=Bt(t,{x:e.x,y:e.y});Ht(l,a,r)&&n.push({element:t,datasetIndex:i,index:o})})),n}(t,e,i,n):[]}function Re(t,e,i,s){const n=De(e,t),o=[],a=i.axis,r="x"===a?"inXRange":"inYRange";let l=!1;return function(t,e){const i=t.getSortedVisibleDatasetMetas();let s,n,o;for(let t=0,a=i.length;t<a;++t){({index:s,data:n}=i[t]);for(let t=0,i=n.length;t<i;++t)o=n[t],o.skip||e(o,s,t)}}(t,((t,e,i)=>{t[r](n[a],s)&&o.push({element:t,datasetIndex:e,index:i}),t.inRange(n.x,n.y,s)&&(l=!0)})),i.intersect&&!l?[]:o}var Ee={modes:{index(t,e,i,s){const n=De(e,t),o=i.axis||"x",a=i.intersect?Ae(t,n,o,s):Le(t,n,o,!1,s),r=[];return a.length?(t.getSortedVisibleDatasetMetas().forEach((t=>{const e=a[0].index,i=t.data[e];i&&!i.skip&&r.push({element:i,datasetIndex:t.index,index:e})})),r):[]},dataset(t,e,i,s){const n=De(e,t),o=i.axis||"xy";let a=i.intersect?Ae(t,n,o,s):Le(t,n,o,!1,s);if(a.length>0){const e=a[0].datasetIndex,i=t.getDatasetMeta(e).data;a=[];for(let t=0;t<i.length;++t)a.push({element:i[t],datasetIndex:e,index:t})}return a},point:(t,e,i,s)=>Ae(t,De(e,t),i.axis||"xy",s),nearest:(t,e,i,s)=>Le(t,De(e,t),i.axis||"xy",i.intersect,s),x:(t,e,i,s)=>Re(t,e,{axis:"x",intersect:i.intersect},s),y:(t,e,i,s)=>Re(t,e,{axis:"y",intersect:i.intersect},s)}};const Ie=new RegExp(/^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/),ze=new RegExp(/^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/);function Fe(t,e){const i=(""+t).match(Ie);if(!i||"normal"===i[1])return 1.2*e;switch(t=+i[2],i[3]){case"px":return t;case"%":t/=100}return e*t}function Be(t,e){const i={},s=U(e),n=s?Object.keys(e):e,o=U(t)?s?i=>K(t[i],t[e[i]]):e=>t[e]:()=>t;for(const t of n)i[t]=+o(t)||0;return i}function Ve(t){return Be(t,{top:"y",right:"x",bottom:"y",left:"x"})}function We(t){return Be(t,["topLeft","topRight","bottomLeft","bottomRight"])}function Ne(t){const e=Ve(t);return e.width=e.left+e.right,e.height=e.top+e.bottom,e}function He(t,e){t=t||{},e=e||bt.font;let i=K(t.size,e.size);"string"==typeof i&&(i=parseInt(i,10));let s=K(t.style,e.style);s&&!(""+s).match(ze)&&(console.warn('Invalid font style specified: "'+s+'"'),s="");const n={family:K(t.family,e.family),lineHeight:Fe(K(t.lineHeight,e.lineHeight),i),size:i,style:s,weight:K(t.weight,e.weight),string:""};return n.string=Ut(n),n}function je(t,e,i,s){let n,o,a,r=!0;for(n=0,o=t.length;n<o;++n)if(a=t[n],void 0!==a&&(void 0!==e&&"function"==typeof a&&(a=a(e),r=!1),void 0!==i&&Y(a)&&(a=a[i%a.length],r=!1),void 0!==a))return s&&!r&&(s.cacheable=!1),a}function $e(t,e,i){const{min:s,max:n}=t,o=Z(e,(n-s)/2),a=(t,e)=>i&&0===t?0:t+e;return{min:a(s,-Math.abs(o)),max:a(n,o)}}function Ye(t,e){return Object.assign(Object.create(t),e)}const Ue=["left","top","right","bottom"];function Xe(t,e){return t.filter((t=>t.pos===e))}function qe(t,e){return t.filter((t=>-1===Ue.indexOf(t.pos)&&t.box.axis===e))}function Ke(t,e){return t.sort(((t,i)=>{const s=e?i:t,n=e?t:i;return s.weight===n.weight?s.index-n.index:s.weight-n.weight}))}function Ge(t,e){const i=function(t){const e={};for(const i of t){const{stack:t,pos:s,stackWeight:n}=i;if(!t||!Ue.includes(s))continue;const o=e[t]||(e[t]={count:0,placed:0,weight:0,size:0});o.count++,o.weight+=n}return e}(t),{vBoxMaxWidth:s,hBoxMaxHeight:n}=e;let o,a,r;for(o=0,a=t.length;o<a;++o){r=t[o];const{fullSize:a}=r.box,l=i[r.stack],h=l&&r.stackWeight/l.weight;r.horizontal?(r.width=h?h*s:a&&e.availableWidth,r.height=n):(r.width=s,r.height=h?h*n:a&&e.availableHeight)}return i}function Ze(t,e,i,s){return Math.max(t[i],e[i])+Math.max(t[s],e[s])}function Je(t,e){t.top=Math.max(t.top,e.top),t.left=Math.max(t.left,e.left),t.bottom=Math.max(t.bottom,e.bottom),t.right=Math.max(t.right,e.right)}function Qe(t,e,i,s){const{pos:n,box:o}=i,a=t.maxPadding;if(!U(n)){i.size&&(t[n]-=i.size);const e=s[i.stack]||{size:0,count:1};e.size=Math.max(e.size,i.horizontal?o.height:o.width),i.size=e.size/e.count,t[n]+=i.size}o.getPadding&&Je(a,o.getPadding());const r=Math.max(0,e.outerWidth-Ze(a,t,"left","right")),l=Math.max(0,e.outerHeight-Ze(a,t,"top","bottom")),h=r!==t.w,c=l!==t.h;return t.w=r,t.h=l,i.horizontal?{same:h,other:c}:{same:c,other:h}}function ti(t,e){const i=e.maxPadding;function s(t){const s={left:0,top:0,right:0,bottom:0};return t.forEach((t=>{s[t]=Math.max(e[t],i[t])})),s}return s(t?["left","right"]:["top","bottom"])}function ei(t,e,i,s){const n=[];let o,a,r,l,h,c;for(o=0,a=t.length,h=0;o<a;++o){r=t[o],l=r.box,l.update(r.width||e.w,r.height||e.h,ti(r.horizontal,e));const{same:a,other:d}=Qe(e,i,r,s);h|=a&&n.length,c=c||d,l.fullSize||n.push(r)}return h&&ei(n,e,i,s)||c}function ii(t,e,i,s,n){t.top=i,t.left=e,t.right=e+s,t.bottom=i+n,t.width=s,t.height=n}function si(t,e,i,s){const n=i.padding;let{x:o,y:a}=e;for(const r of t){const t=r.box,l=s[r.stack]||{count:1,placed:0,weight:1},h=r.stackWeight/l.weight||1;if(r.horizontal){const s=e.w*h,o=l.size||t.height;ct(l.start)&&(a=l.start),t.fullSize?ii(t,n.left,a,i.outerWidth-n.right-n.left,o):ii(t,e.left+l.placed,a,s,o),l.start=a,l.placed+=s,a=t.bottom}else{const s=e.h*h,a=l.size||t.width;ct(l.start)&&(o=l.start),t.fullSize?ii(t,o,n.top,a,i.outerHeight-n.bottom-n.top):ii(t,o,e.top+l.placed,a,s),l.start=o,l.placed+=s,o=t.right}}e.x=o,e.y=a}bt.set("layout",{autoPadding:!0,padding:{top:0,right:0,bottom:0,left:0}});var ni={addBox(t,e){t.boxes||(t.boxes=[]),e.fullSize=e.fullSize||!1,e.position=e.position||"top",e.weight=e.weight||0,e._layers=e._layers||function(){return[{z:0,draw(t){e.draw(t)}}]},t.boxes.push(e)},removeBox(t,e){const i=t.boxes?t.boxes.indexOf(e):-1;-1!==i&&t.boxes.splice(i,1)},configure(t,e,i){e.fullSize=i.fullSize,e.position=i.position,e.weight=i.weight},update(t,e,i,s){if(!t)return;const n=Ne(t.options.layout.padding),o=Math.max(e-n.width,0),a=Math.max(i-n.height,0),r=function(t){const e=function(t){const e=[];let i,s,n,o,a,r;for(i=0,s=(t||[]).length;i<s;++i)n=t[i],({position:o,options:{stack:a,stackWeight:r=1}}=n),e.push({index:i,box:n,pos:o,horizontal:n.isHorizontal(),weight:n.weight,stack:a&&o+a,stackWeight:r});return e}(t),i=Ke(e.filter((t=>t.box.fullSize)),!0),s=Ke(Xe(e,"left"),!0),n=Ke(Xe(e,"right")),o=Ke(Xe(e,"top"),!0),a=Ke(Xe(e,"bottom")),r=qe(e,"x"),l=qe(e,"y");return{fullSize:i,leftAndTop:s.concat(o),rightAndBottom:n.concat(l).concat(a).concat(r),chartArea:Xe(e,"chartArea"),vertical:s.concat(n).concat(l),horizontal:o.concat(a).concat(r)}}(t.boxes),l=r.vertical,h=r.horizontal;Q(t.boxes,(t=>{"function"==typeof t.beforeLayout&&t.beforeLayout()}));const c=l.reduce(((t,e)=>e.box.options&&!1===e.box.options.display?t:t+1),0)||1,d=Object.freeze({outerWidth:e,outerHeight:i,padding:n,availableWidth:o,availableHeight:a,vBoxMaxWidth:o/2/c,hBoxMaxHeight:a/2}),u=Object.assign({},n);Je(u,Ne(s));const f=Object.assign({maxPadding:u,w:o,h:a,x:n.left,y:n.top},n),g=Ge(l.concat(h),d);ei(r.fullSize,f,d,g),ei(l,f,d,g),ei(h,f,d,g)&&ei(l,f,d,g),function(t){const e=t.maxPadding;function i(i){const s=Math.max(e[i]-t[i],0);return t[i]+=s,s}t.y+=i("top"),t.x+=i("left"),i("right"),i("bottom")}(f),si(r.leftAndTop,f,d,g),f.x+=f.w,f.y+=f.h,si(r.rightAndBottom,f,d,g),t.chartArea={left:f.left,top:f.top,right:f.left+f.w,bottom:f.top+f.h,height:f.h,width:f.w},Q(r.chartArea,(e=>{const i=e.box;Object.assign(i,t.chartArea),i.update(f.w,f.h,{left:0,top:0,right:0,bottom:0})}))}};function oi(t,e=[""],i=t,s,n=(()=>t[0])){ct(s)||(s=mi("_fallback",t));const o={[Symbol.toStringTag]:"Object",_cacheable:!0,_scopes:t,_rootScopes:i,_fallback:s,_getTarget:n,override:n=>oi([n,...t],e,i,s)};return new Proxy(o,{deleteProperty:(e,i)=>(delete e[i],delete e._keys,delete t[0][i],!0),get:(i,s)=>ci(i,s,(()=>function(t,e,i,s){let n;for(const o of e)if(n=mi(li(o,t),i),ct(n))return hi(t,n)?gi(i,s,t,n):n}(s,e,t,i))),getOwnPropertyDescriptor:(t,e)=>Reflect.getOwnPropertyDescriptor(t._scopes[0],e),getPrototypeOf:()=>Reflect.getPrototypeOf(t[0]),has:(t,e)=>xi(t).includes(e),ownKeys:t=>xi(t),set(t,e,i){const s=t._storage||(t._storage=n());return t[e]=s[e]=i,delete t._keys,!0}})}function ai(t,e,i,s){const n={_cacheable:!1,_proxy:t,_context:e,_subProxy:i,_stack:new Set,_descriptors:ri(t,s),setContext:e=>ai(t,e,i,s),override:n=>ai(t.override(n),e,i,s)};return new Proxy(n,{deleteProperty:(e,i)=>(delete e[i],delete t[i],!0),get:(t,e,i)=>ci(t,e,(()=>function(t,e,i){const{_proxy:s,_context:n,_subProxy:o,_descriptors:a}=t;let r=s[e];dt(r)&&a.isScriptable(e)&&(r=function(t,e,i,s){const{_proxy:n,_context:o,_subProxy:a,_stack:r}=i;if(r.has(t))throw new Error("Recursion detected: "+Array.from(r).join("->")+"->"+t);r.add(t),e=e(o,a||s),r.delete(t),hi(t,e)&&(e=gi(n._scopes,n,t,e));return e}(e,r,t,i));Y(r)&&r.length&&(r=function(t,e,i,s){const{_proxy:n,_context:o,_subProxy:a,_descriptors:r}=i;if(ct(o.index)&&s(t))e=e[o.index%e.length];else if(U(e[0])){const i=e,s=n._scopes.filter((t=>t!==i));e=[];for(const l of i){const i=gi(s,n,t,l);e.push(ai(i,o,a&&a[t],r))}}return e}(e,r,t,a.isIndexable));hi(e,r)&&(r=ai(r,n,o&&o[e],a));return r}(t,e,i))),getOwnPropertyDescriptor:(e,i)=>e._descriptors.allKeys?Reflect.has(t,i)?{enumerable:!0,configurable:!0}:void 0:Reflect.getOwnPropertyDescriptor(t,i),getPrototypeOf:()=>Reflect.getPrototypeOf(t),has:(e,i)=>Reflect.has(t,i),ownKeys:()=>Reflect.ownKeys(t),set:(e,i,s)=>(t[i]=s,delete e[i],!0)})}function ri(t,e={scriptable:!0,indexable:!0}){const{_scriptable:i=e.scriptable,_indexable:s=e.indexable,_allKeys:n=e.allKeys}=t;return{allKeys:n,scriptable:i,indexable:s,isScriptable:dt(i)?i:()=>i,isIndexable:dt(s)?s:()=>s}}const li=(t,e)=>t?t+ht(e):e,hi=(t,e)=>U(e)&&"adapters"!==t&&(null===Object.getPrototypeOf(e)||e.constructor===Object);function ci(t,e,i){if(Object.prototype.hasOwnProperty.call(t,e))return t[e];const s=i();return t[e]=s,s}function di(t,e,i){return dt(t)?t(e,i):t}const ui=(t,e)=>!0===t?e:"string"==typeof t?lt(e,t):void 0;function fi(t,e,i,s,n){for(const o of e){const e=ui(i,o);if(e){t.add(e);const o=di(e._fallback,i,n);if(ct(o)&&o!==i&&o!==s)return o}else if(!1===e&&ct(s)&&i!==s)return null}return!1}function gi(t,e,i,s){const n=e._rootScopes,o=di(e._fallback,i,s),a=[...t,...n],r=new Set;r.add(s);let l=pi(r,a,i,o||i,s);return null!==l&&((!ct(o)||o===i||(l=pi(r,a,o,l,s),null!==l))&&oi(Array.from(r),[""],n,o,(()=>function(t,e,i){const s=t._getTarget();e in s||(s[e]={});const n=s[e];if(Y(n)&&U(i))return i;return n}(e,i,s))))}function pi(t,e,i,s,n){for(;i;)i=fi(t,e,i,s,n);return i}function mi(t,e){for(const i of e){if(!i)continue;const e=i[t];if(ct(e))return e}}function xi(t){let e=t._keys;return e||(e=t._keys=function(t){const e=new Set;for(const i of t)for(const t of Object.keys(i).filter((t=>!t.startsWith("_"))))e.add(t);return Array.from(e)}(t._scopes)),e}const bi=Number.EPSILON||1e-14,_i=(t,e)=>e<t.length&&!t[e].skip&&t[e],yi=t=>"x"===t?"y":"x";function vi(t,e,i,s){const n=t.skip?e:t,o=e,a=i.skip?e:i,r=Vt(o,n),l=Vt(a,o);let h=r/(r+l),c=l/(r+l);h=isNaN(h)?0:h,c=isNaN(c)?0:c;const d=s*h,u=s*c;return{previous:{x:o.x-d*(a.x-n.x),y:o.y-d*(a.y-n.y)},next:{x:o.x+u*(a.x-n.x),y:o.y+u*(a.y-n.y)}}}function wi(t,e="x"){const i=yi(e),s=t.length,n=Array(s).fill(0),o=Array(s);let a,r,l,h=_i(t,0);for(a=0;a<s;++a)if(r=l,l=h,h=_i(t,a+1),l){if(h){const t=h[e]-l[e];n[a]=0!==t?(h[i]-l[i])/t:0}o[a]=r?h?Ct(n[a-1])!==Ct(n[a])?0:(n[a-1]+n[a])/2:n[a-1]:n[a]}!function(t,e,i){const s=t.length;let n,o,a,r,l,h=_i(t,0);for(let c=0;c<s-1;++c)l=h,h=_i(t,c+1),l&&h&&(Lt(e[c],0,bi)?i[c]=i[c+1]=0:(n=i[c]/e[c],o=i[c+1]/e[c],r=Math.pow(n,2)+Math.pow(o,2),r<=9||(a=3/Math.sqrt(r),i[c]=n*a*e[c],i[c+1]=o*a*e[c])))}(t,n,o),function(t,e,i="x"){const s=yi(i),n=t.length;let o,a,r,l=_i(t,0);for(let h=0;h<n;++h){if(a=r,r=l,l=_i(t,h+1),!r)continue;const n=r[i],c=r[s];a&&(o=(n-a[i])/3,r[`cp1${i}`]=n-o,r[`cp1${s}`]=c-o*e[h]),l&&(o=(l[i]-n)/3,r[`cp2${i}`]=n+o,r[`cp2${s}`]=c+o*e[h])}}(t,o,e)}function Mi(t,e,i){return Math.max(Math.min(t,i),e)}function ki(t,e,i,s,n){let o,a,r,l;if(e.spanGaps&&(t=t.filter((t=>!t.skip))),"monotone"===e.cubicInterpolationMode)wi(t,n);else{let i=s?t[t.length-1]:t[0];for(o=0,a=t.length;o<a;++o)r=t[o],l=vi(i,r,t[Math.min(o+1,a-(s?0:1))%a],e.tension),r.cp1x=l.previous.x,r.cp1y=l.previous.y,r.cp2x=l.next.x,r.cp2y=l.next.y,i=r}e.capBezierPoints&&function(t,e){let i,s,n,o,a,r=Jt(t[0],e);for(i=0,s=t.length;i<s;++i)a=o,o=r,r=i<s-1&&Jt(t[i+1],e),o&&(n=t[i],a&&(n.cp1x=Mi(n.cp1x,e.left,e.right),n.cp1y=Mi(n.cp1y,e.top,e.bottom)),r&&(n.cp2x=Mi(n.cp2x,e.left,e.right),n.cp2y=Mi(n.cp2y,e.top,e.bottom)))}(t,i)}const Si=t=>0===t||1===t,Pi=(t,e,i)=>-Math.pow(2,10*(t-=1))*Math.sin((t-e)*yt/i),Di=(t,e,i)=>Math.pow(2,-10*t)*Math.sin((t-e)*yt/i)+1,Ci={linear:t=>t,easeInQuad:t=>t*t,easeOutQuad:t=>-t*(t-2),easeInOutQuad:t=>(t/=.5)<1?.5*t*t:-.5*(--t*(t-2)-1),easeInCubic:t=>t*t*t,easeOutCubic:t=>(t-=1)*t*t+1,easeInOutCubic:t=>(t/=.5)<1?.5*t*t*t:.5*((t-=2)*t*t+2),easeInQuart:t=>t*t*t*t,easeOutQuart:t=>-((t-=1)*t*t*t-1),easeInOutQuart:t=>(t/=.5)<1?.5*t*t*t*t:-.5*((t-=2)*t*t*t-2),easeInQuint:t=>t*t*t*t*t,easeOutQuint:t=>(t-=1)*t*t*t*t+1,easeInOutQuint:t=>(t/=.5)<1?.5*t*t*t*t*t:.5*((t-=2)*t*t*t*t+2),easeInSine:t=>1-Math.cos(t*kt),easeOutSine:t=>Math.sin(t*kt),easeInOutSine:t=>-.5*(Math.cos(_t*t)-1),easeInExpo:t=>0===t?0:Math.pow(2,10*(t-1)),easeOutExpo:t=>1===t?1:1-Math.pow(2,-10*t),easeInOutExpo:t=>Si(t)?t:t<.5?.5*Math.pow(2,10*(2*t-1)):.5*(2-Math.pow(2,-10*(2*t-1))),easeInCirc:t=>t>=1?t:-(Math.sqrt(1-t*t)-1),easeOutCirc:t=>Math.sqrt(1-(t-=1)*t),easeInOutCirc:t=>(t/=.5)<1?-.5*(Math.sqrt(1-t*t)-1):.5*(Math.sqrt(1-(t-=2)*t)+1),easeInElastic:t=>Si(t)?t:Pi(t,.075,.3),easeOutElastic:t=>Si(t)?t:Di(t,.075,.3),easeInOutElastic(t){const e=.1125;return Si(t)?t:t<.5?.5*Pi(2*t,e,.45):.5+.5*Di(2*t-1,e,.45)},easeInBack(t){const e=1.70158;return t*t*((e+1)*t-e)},easeOutBack(t){const e=1.70158;return(t-=1)*t*((e+1)*t+e)+1},easeInOutBack(t){let e=1.70158;return(t/=.5)<1?t*t*((1+(e*=1.525))*t-e)*.5:.5*((t-=2)*t*((1+(e*=1.525))*t+e)+2)},easeInBounce:t=>1-Ci.easeOutBounce(1-t),easeOutBounce(t){const e=7.5625,i=2.75;return t<1/i?e*t*t:t<2/i?e*(t-=1.5/i)*t+.75:t<2.5/i?e*(t-=2.25/i)*t+.9375:e*(t-=2.625/i)*t+.984375},easeInOutBounce:t=>t<.5?.5*Ci.easeInBounce(2*t):.5*Ci.easeOutBounce(2*t-1)+.5};function Oi(t,e,i,s){return{x:t.x+i*(e.x-t.x),y:t.y+i*(e.y-t.y)}}function Ai(t,e,i,s){return{x:t.x+i*(e.x-t.x),y:"middle"===s?i<.5?t.y:e.y:"after"===s?i<1?t.y:e.y:i>0?e.y:t.y}}function Ti(t,e,i,s){const n={x:t.cp2x,y:t.cp2y},o={x:e.cp1x,y:e.cp1y},a=Oi(t,n,i),r=Oi(n,o,i),l=Oi(o,e,i),h=Oi(a,r,i),c=Oi(r,l,i);return Oi(h,c,i)}const Li=new Map;function Ri(t,e,i){return function(t,e){e=e||{};const i=t+JSON.stringify(e);let s=Li.get(i);return s||(s=new Intl.NumberFormat(t,e),Li.set(i,s)),s}(e,i).format(t)}function Ei(t,e,i){return t?function(t,e){return{x:i=>t+t+e-i,setWidth(t){e=t},textAlign:t=>"center"===t?t:"right"===t?"left":"right",xPlus:(t,e)=>t-e,leftForLtr:(t,e)=>t-e}}(e,i):{x:t=>t,setWidth(t){},textAlign:t=>t,xPlus:(t,e)=>t+e,leftForLtr:(t,e)=>t}}function Ii(t,e){let i,s;"ltr"!==e&&"rtl"!==e||(i=t.canvas.style,s=[i.getPropertyValue("direction"),i.getPropertyPriority("direction")],i.setProperty("direction",e,"important"),t.prevTextDirection=s)}function zi(t,e){void 0!==e&&(delete t.prevTextDirection,t.canvas.style.setProperty("direction",e[0],e[1]))}function Fi(t){return"angle"===t?{between:Ht,compare:Wt,normalize:Nt}:{between:Yt,compare:(t,e)=>t-e,normalize:t=>t}}function Bi({start:t,end:e,count:i,loop:s,style:n}){return{start:t%i,end:e%i,loop:s&&(e-t+1)%i==0,style:n}}function Vi(t,e,i){if(!i)return[t];const{property:s,start:n,end:o}=i,a=e.length,{compare:r,between:l,normalize:h}=Fi(s),{start:c,end:d,loop:u,style:f}=function(t,e,i){const{property:s,start:n,end:o}=i,{between:a,normalize:r}=Fi(s),l=e.length;let h,c,{start:d,end:u,loop:f}=t;if(f){for(d+=l,u+=l,h=0,c=l;h<c&&a(r(e[d%l][s]),n,o);++h)d--,u--;d%=l,u%=l}return u<d&&(u+=l),{start:d,end:u,loop:f,style:t.style}}(t,e,i),g=[];let p,m,x,b=!1,_=null;const y=()=>b||l(n,x,p)&&0!==r(n,x),v=()=>!b||0===r(o,p)||l(o,x,p);for(let t=c,i=c;t<=d;++t)m=e[t%a],m.skip||(p=h(m[s]),p!==x&&(b=l(p,n,o),null===_&&y()&&(_=0===r(p,n)?t:i),null!==_&&v()&&(g.push(Bi({start:_,end:t,loop:u,count:a,style:f})),_=null),i=t,x=p));return null!==_&&g.push(Bi({start:_,end:d,loop:u,count:a,style:f})),g}function Wi(t,e){const i=[],s=t.segments;for(let n=0;n<s.length;n++){const o=Vi(s[n],t.points,e);o.length&&i.push(...o)}return i}function Ni(t,e){const i=t.points,s=t.options.spanGaps,n=i.length;if(!n)return[];const o=!!t._loop,{start:a,end:r}=function(t,e,i,s){let n=0,o=e-1;if(i&&!s)for(;n<e&&!t[n].skip;)n++;for(;n<e&&t[n].skip;)n++;for(n%=e,i&&(o+=n);o>n&&t[o%e].skip;)o--;return o%=e,{start:n,end:o}}(i,n,o,s);if(!0===s)return Hi(t,[{start:a,end:r,loop:o}],i,e);return Hi(t,function(t,e,i,s){const n=t.length,o=[];let a,r=e,l=t[e];for(a=e+1;a<=i;++a){const i=t[a%n];i.skip||i.stop?l.skip||(s=!1,o.push({start:e%n,end:(a-1)%n,loop:s}),e=r=i.stop?a:null):(r=a,l.skip&&(e=a)),l=i}return null!==r&&o.push({start:e%n,end:r%n,loop:s}),o}(i,a,r<a?r+n:r,!!t._fullLoop&&0===a&&r===n-1),i,e)}function Hi(t,e,i,s){return s&&s.setContext&&i?function(t,e,i,s){const n=t._chart.getContext(),o=ji(t.options),{_datasetIndex:a,options:{spanGaps:r}}=t,l=i.length,h=[];let c=o,d=e[0].start,u=d;function f(t,e,s,n){const o=r?-1:1;if(t!==e){for(t+=l;i[t%l].skip;)t-=o;for(;i[e%l].skip;)e+=o;t%l!=e%l&&(h.push({start:t%l,end:e%l,loop:s,style:n}),c=n,d=e%l)}}for(const t of e){d=r?d:t.start;let e,o=i[d%l];for(u=d+1;u<=t.end;u++){const r=i[u%l];e=ji(s.setContext(Ye(n,{type:"segment",p0:o,p1:r,p0DataIndex:(u-1)%l,p1DataIndex:u%l,datasetIndex:a}))),$i(e,c)&&f(d,u-1,t.loop,c),o=r,c=e}d<u-1&&f(d,u-1,t.loop,c)}return h}(t,e,i,s):e}function ji(t){return{backgroundColor:t.backgroundColor,borderCapStyle:t.borderCapStyle,borderDash:t.borderDash,borderDashOffset:t.borderDashOffset,borderJoinStyle:t.borderJoinStyle,borderWidth:t.borderWidth,borderColor:t.borderColor}}function $i(t,e){return e&&JSON.stringify(t)!==JSON.stringify(e)}var Yi=Object.freeze({__proto__:null,easingEffects:Ci,color:W,getHoverColor:N,noop:H,uid:j,isNullOrUndef:$,isArray:Y,isObject:U,isFinite:X,finiteOrDefault:q,valueOrDefault:K,toPercentage:G,toDimension:Z,callback:J,each:Q,_elementsEqual:tt,clone:et,_merger:st,merge:nt,mergeIf:ot,_mergerIf:at,_deprecated:function(t,e,i,s){void 0!==e&&console.warn(t+': "'+i+'" is deprecated. Please use "'+s+'" instead')},resolveObjectKey:lt,_capitalize:ht,defined:ct,isFunction:dt,setsEqual:ut,_isClickEvent:ft,toFontString:Ut,_measureText:Xt,_longestText:qt,_alignPixel:Kt,clearCanvas:Gt,drawPoint:Zt,_isPointInArea:Jt,clipArea:Qt,unclipArea:te,_steppedLineTo:ee,_bezierCurveTo:ie,renderText:se,addRoundedRectPath:oe,_lookup:ae,_lookupByKey:re,_rlookupByKey:le,_filterBetween:he,listenArrayEvents:de,unlistenArrayEvents:ue,_arrayUnique:fe,_createResolver:oi,_attachContext:ai,_descriptors:ri,splineCurve:vi,splineCurveMonotone:wi,_updateBezierControlPoints:ki,_isDomSupported:ge,_getParentNode:pe,getStyle:be,getRelativePosition:ve,getMaximumSize:Me,retinaScale:ke,supportsEventListenerOptions:Se,readUsedSize:Pe,fontString:function(t,e,i){return e+" "+t+"px "+i},requestAnimFrame:t,throttled:e,debounce:i,_toLeftRightCenter:s,_alignStartEnd:n,_textX:o,_pointInLine:Oi,_steppedInterpolation:Ai,_bezierInterpolation:Ti,formatNumber:Ri,toLineHeight:Fe,_readValueToProps:Be,toTRBL:Ve,toTRBLCorners:We,toPadding:Ne,toFont:He,resolve:je,_addGrace:$e,createContext:Ye,PI:_t,TAU:yt,PITAU:vt,INFINITY:wt,RAD_PER_DEG:Mt,HALF_PI:kt,QUARTER_PI:St,TWO_THIRDS_PI:Pt,log10:Dt,sign:Ct,niceNum:Ot,_factorize:At,isNumber:Tt,almostEquals:Lt,almostWhole:Rt,_setMinAndMaxByKey:Et,toRadians:It,toDegrees:zt,_decimalPlaces:Ft,getAngleFromPoint:Bt,distanceBetweenPoints:Vt,_angleDiff:Wt,_normalizeAngle:Nt,_angleBetween:Ht,_limitValue:jt,_int16Range:$t,_isBetween:Yt,getRtlAdapter:Ei,overrideTextDirection:Ii,restoreTextDirection:zi,_boundSegment:Vi,_boundSegments:Wi,_computeSegments:Ni});class Ui{acquireContext(t,e){}releaseContext(t){return!1}addEventListener(t,e,i){}removeEventListener(t,e,i){}getDevicePixelRatio(){return 1}getMaximumSize(t,e,i,s){return e=Math.max(0,e||t.width),i=i||t.height,{width:e,height:Math.max(0,s?Math.floor(e/s):i)}}isAttached(t){return!0}updateConfig(t){}}class Xi extends Ui{acquireContext(t){return t&&t.getContext&&t.getContext("2d")||null}updateConfig(t){t.options.animation=!1}}const qi={touchstart:"mousedown",touchmove:"mousemove",touchend:"mouseup",pointerenter:"mouseenter",pointerdown:"mousedown",pointermove:"mousemove",pointerup:"mouseup",pointerleave:"mouseout",pointerout:"mouseout"},Ki=t=>null===t||""===t;const Gi=!!Se&&{passive:!0};function Zi(t,e,i){t.canvas.removeEventListener(e,i,Gi)}function Ji(t,e){for(const i of t)if(i===e||i.contains(e))return!0}function Qi(t,e,i){const s=t.canvas,n=new MutationObserver((t=>{let e=!1;for(const i of t)e=e||Ji(i.addedNodes,s),e=e&&!Ji(i.removedNodes,s);e&&i()}));return n.observe(document,{childList:!0,subtree:!0}),n}function ts(t,e,i){const s=t.canvas,n=new MutationObserver((t=>{let e=!1;for(const i of t)e=e||Ji(i.removedNodes,s),e=e&&!Ji(i.addedNodes,s);e&&i()}));return n.observe(document,{childList:!0,subtree:!0}),n}const es=new Map;let is=0;function ss(){const t=window.devicePixelRatio;t!==is&&(is=t,es.forEach(((e,i)=>{i.currentDevicePixelRatio!==t&&e()})))}function ns(t,i,s){const n=t.canvas,o=n&&pe(n);if(!o)return;const a=e(((t,e)=>{const i=o.clientWidth;s(t,e),i<o.clientWidth&&s()}),window),r=new ResizeObserver((t=>{const e=t[0],i=e.contentRect.width,s=e.contentRect.height;0===i&&0===s||a(i,s)}));return r.observe(o),function(t,e){es.size||window.addEventListener("resize",ss),es.set(t,e)}(t,a),r}function os(t,e,i){i&&i.disconnect(),"resize"===e&&function(t){es.delete(t),es.size||window.removeEventListener("resize",ss)}(t)}function as(t,i,s){const n=t.canvas,o=e((e=>{null!==t.ctx&&s(function(t,e){const i=qi[t.type]||t.type,{x:s,y:n}=ve(t,e);return{type:i,chart:e,native:t,x:void 0!==s?s:null,y:void 0!==n?n:null}}(e,t))}),t,(t=>{const e=t[0];return[e,e.offsetX,e.offsetY]}));return function(t,e,i){t.addEventListener(e,i,Gi)}(n,i,o),o}class rs extends Ui{acquireContext(t,e){const i=t&&t.getContext&&t.getContext("2d");return i&&i.canvas===t?(function(t,e){const i=t.style,s=t.getAttribute("height"),n=t.getAttribute("width");if(t.$chartjs={initial:{height:s,width:n,style:{display:i.display,height:i.height,width:i.width}}},i.display=i.display||"block",i.boxSizing=i.boxSizing||"border-box",Ki(n)){const e=Pe(t,"width");void 0!==e&&(t.width=e)}if(Ki(s))if(""===t.style.height)t.height=t.width/(e||2);else{const e=Pe(t,"height");void 0!==e&&(t.height=e)}}(t,e),i):null}releaseContext(t){const e=t.canvas;if(!e.$chartjs)return!1;const i=e.$chartjs.initial;["height","width"].forEach((t=>{const s=i[t];$(s)?e.removeAttribute(t):e.setAttribute(t,s)}));const s=i.style||{};return Object.keys(s).forEach((t=>{e.style[t]=s[t]})),e.width=e.width,delete e.$chartjs,!0}addEventListener(t,e,i){this.removeEventListener(t,e);const s=t.$proxies||(t.$proxies={}),n={attach:Qi,detach:ts,resize:ns}[e]||as;s[e]=n(t,e,i)}removeEventListener(t,e){const i=t.$proxies||(t.$proxies={}),s=i[e];if(!s)return;({attach:os,detach:os,resize:os}[e]||Zi)(t,e,s),i[e]=void 0}getDevicePixelRatio(){return window.devicePixelRatio}getMaximumSize(t,e,i,s){return Me(t,e,i,s)}isAttached(t){const e=pe(t);return!(!e||!e.isConnected)}}function ls(t){return!ge()||"undefined"!=typeof OffscreenCanvas&&t instanceof OffscreenCanvas?Xi:rs}var hs=Object.freeze({__proto__:null,_detectPlatform:ls,BasePlatform:Ui,BasicPlatform:Xi,DomPlatform:rs});const cs="transparent",ds={boolean:(t,e,i)=>i>.5?e:t,color(t,e,i){const s=W(t||cs),n=s.valid&&W(e||cs);return n&&n.valid?n.mix(s,i).hexString():e},number:(t,e,i)=>t+(e-t)*i};class us{constructor(t,e,i,s){const n=e[i];s=je([t.to,s,n,t.from]);const o=je([t.from,n,s]);this._active=!0,this._fn=t.fn||ds[t.type||typeof o],this._easing=Ci[t.easing]||Ci.linear,this._start=Math.floor(Date.now()+(t.delay||0)),this._duration=this._total=Math.floor(t.duration),this._loop=!!t.loop,this._target=e,this._prop=i,this._from=o,this._to=s,this._promises=void 0}active(){return this._active}update(t,e,i){if(this._active){this._notify(!1);const s=this._target[this._prop],n=i-this._start,o=this._duration-n;this._start=i,this._duration=Math.floor(Math.max(o,t.duration)),this._total+=n,this._loop=!!t.loop,this._to=je([t.to,e,s,t.from]),this._from=je([t.from,s,e])}}cancel(){this._active&&(this.tick(Date.now()),this._active=!1,this._notify(!1))}tick(t){const e=t-this._start,i=this._duration,s=this._prop,n=this._from,o=this._loop,a=this._to;let r;if(this._active=n!==a&&(o||e<i),!this._active)return this._target[s]=a,void this._notify(!0);e<0?this._target[s]=n:(r=e/i%2,r=o&&r>1?2-r:r,r=this._easing(Math.min(1,Math.max(0,r))),this._target[s]=this._fn(n,a,r))}wait(){const t=this._promises||(this._promises=[]);return new Promise(((e,i)=>{t.push({res:e,rej:i})}))}_notify(t){const e=t?"res":"rej",i=this._promises||[];for(let t=0;t<i.length;t++)i[t][e]()}}bt.set("animation",{delay:void 0,duration:1e3,easing:"easeOutQuart",fn:void 0,from:void 0,loop:void 0,to:void 0,type:void 0});const fs=Object.keys(bt.animation);bt.describe("animation",{_fallback:!1,_indexable:!1,_scriptable:t=>"onProgress"!==t&&"onComplete"!==t&&"fn"!==t}),bt.set("animations",{colors:{type:"color",properties:["color","borderColor","backgroundColor"]},numbers:{type:"number",properties:["x","y","borderWidth","radius","tension"]}}),bt.describe("animations",{_fallback:"animation"}),bt.set("transitions",{active:{animation:{duration:400}},resize:{animation:{duration:0}},show:{animations:{colors:{from:"transparent"},visible:{type:"boolean",duration:0}}},hide:{animations:{colors:{to:"transparent"},visible:{type:"boolean",easing:"linear",fn:t=>0|t}}}});class gs{constructor(t,e){this._chart=t,this._properties=new Map,this.configure(e)}configure(t){if(!U(t))return;const e=this._properties;Object.getOwnPropertyNames(t).forEach((i=>{const s=t[i];if(!U(s))return;const n={};for(const t of fs)n[t]=s[t];(Y(s.properties)&&s.properties||[i]).forEach((t=>{t!==i&&e.has(t)||e.set(t,n)}))}))}_animateOptions(t,e){const i=e.options,s=function(t,e){if(!e)return;let i=t.options;if(!i)return void(t.options=e);i.$shared&&(t.options=i=Object.assign({},i,{$shared:!1,$animations:{}}));return i}(t,i);if(!s)return[];const n=this._createAnimations(s,i);return i.$shared&&function(t,e){const i=[],s=Object.keys(e);for(let e=0;e<s.length;e++){const n=t[s[e]];n&&n.active()&&i.push(n.wait())}return Promise.all(i)}(t.options.$animations,i).then((()=>{t.options=i}),(()=>{})),n}_createAnimations(t,e){const i=this._properties,s=[],n=t.$animations||(t.$animations={}),o=Object.keys(e),a=Date.now();let r;for(r=o.length-1;r>=0;--r){const l=o[r];if("$"===l.charAt(0))continue;if("options"===l){s.push(...this._animateOptions(t,e));continue}const h=e[l];let c=n[l];const d=i.get(l);if(c){if(d&&c.active()){c.update(d,h,a);continue}c.cancel()}d&&d.duration?(n[l]=c=new us(d,t,l,h),s.push(c)):t[l]=h}return s}update(t,e){if(0===this._properties.size)return void Object.assign(t,e);const i=this._createAnimations(t,e);return i.length?(a.add(this._chart,i),!0):void 0}}function ps(t,e){const i=t&&t.options||{},s=i.reverse,n=void 0===i.min?e:0,o=void 0===i.max?e:0;return{start:s?o:n,end:s?n:o}}function ms(t,e){const i=[],s=t._getSortedDatasetMetas(e);let n,o;for(n=0,o=s.length;n<o;++n)i.push(s[n].index);return i}function xs(t,e,i,s={}){const n=t.keys,o="single"===s.mode;let a,r,l,h;if(null!==e){for(a=0,r=n.length;a<r;++a){if(l=+n[a],l===i){if(s.all)continue;break}h=t.values[l],X(h)&&(o||0===e||Ct(e)===Ct(h))&&(e+=h)}return e}}function bs(t,e){const i=t&&t.options.stacked;return i||void 0===i&&void 0!==e.stack}function _s(t,e,i){const s=t[e]||(t[e]={});return s[i]||(s[i]={})}function ys(t,e,i,s){for(const n of e.getMatchingVisibleMetas(s).reverse()){const e=t[n.index];if(i&&e>0||!i&&e<0)return n.index}return null}function vs(t,e){const{chart:i,_cachedMeta:s}=t,n=i._stacks||(i._stacks={}),{iScale:o,vScale:a,index:r}=s,l=o.axis,h=a.axis,c=function(t,e,i){return`${t.id}.${e.id}.${i.stack||i.type}`}(o,a,s),d=e.length;let u;for(let t=0;t<d;++t){const i=e[t],{[l]:o,[h]:d}=i;u=(i._stacks||(i._stacks={}))[h]=_s(n,c,o),u[r]=d,u._top=ys(u,a,!0,s.type),u._bottom=ys(u,a,!1,s.type)}}function ws(t,e){const i=t.scales;return Object.keys(i).filter((t=>i[t].axis===e)).shift()}function Ms(t,e){const i=t.controller.index,s=t.vScale&&t.vScale.axis;if(s){e=e||t._parsed;for(const t of e){const e=t._stacks;if(!e||void 0===e[s]||void 0===e[s][i])return;delete e[s][i]}}}const ks=t=>"reset"===t||"none"===t,Ss=(t,e)=>e?t:Object.assign({},t);class Ps{constructor(t,e){this.chart=t,this._ctx=t.ctx,this.index=e,this._cachedDataOpts={},this._cachedMeta=this.getMeta(),this._type=this._cachedMeta.type,this.options=void 0,this._parsing=!1,this._data=void 0,this._objectData=void 0,this._sharedOptions=void 0,this._drawStart=void 0,this._drawCount=void 0,this.enableOptionSharing=!1,this.$context=void 0,this._syncList=[],this.initialize()}initialize(){const t=this._cachedMeta;this.configure(),this.linkScales(),t._stacked=bs(t.vScale,t),this.addElements()}updateIndex(t){this.index!==t&&Ms(this._cachedMeta),this.index=t}linkScales(){const t=this.chart,e=this._cachedMeta,i=this.getDataset(),s=(t,e,i,s)=>"x"===t?e:"r"===t?s:i,n=e.xAxisID=K(i.xAxisID,ws(t,"x")),o=e.yAxisID=K(i.yAxisID,ws(t,"y")),a=e.rAxisID=K(i.rAxisID,ws(t,"r")),r=e.indexAxis,l=e.iAxisID=s(r,n,o,a),h=e.vAxisID=s(r,o,n,a);e.xScale=this.getScaleForId(n),e.yScale=this.getScaleForId(o),e.rScale=this.getScaleForId(a),e.iScale=this.getScaleForId(l),e.vScale=this.getScaleForId(h)}getDataset(){return this.chart.data.datasets[this.index]}getMeta(){return this.chart.getDatasetMeta(this.index)}getScaleForId(t){return this.chart.scales[t]}_getOtherScale(t){const e=this._cachedMeta;return t===e.iScale?e.vScale:e.iScale}reset(){this._update("reset")}_destroy(){const t=this._cachedMeta;this._data&&ue(this._data,this),t._stacked&&Ms(t)}_dataCheck(){const t=this.getDataset(),e=t.data||(t.data=[]),i=this._data;if(U(e))this._data=function(t){const e=Object.keys(t),i=new Array(e.length);let s,n,o;for(s=0,n=e.length;s<n;++s)o=e[s],i[s]={x:o,y:t[o]};return i}(e);else if(i!==e){if(i){ue(i,this);const t=this._cachedMeta;Ms(t),t._parsed=[]}e&&Object.isExtensible(e)&&de(e,this),this._syncList=[],this._data=e}}addElements(){const t=this._cachedMeta;this._dataCheck(),this.datasetElementType&&(t.dataset=new this.datasetElementType)}buildOrUpdateElements(t){const e=this._cachedMeta,i=this.getDataset();let s=!1;this._dataCheck();const n=e._stacked;e._stacked=bs(e.vScale,e),e.stack!==i.stack&&(s=!0,Ms(e),e.stack=i.stack),this._resyncElements(t),(s||n!==e._stacked)&&vs(this,e._parsed)}configure(){const t=this.chart.config,e=t.datasetScopeKeys(this._type),i=t.getOptionScopes(this.getDataset(),e,!0);this.options=t.createResolver(i,this.getContext()),this._parsing=this.options.parsing,this._cachedDataOpts={}}parse(t,e){const{_cachedMeta:i,_data:s}=this,{iScale:n,_stacked:o}=i,a=n.axis;let r,l,h,c=0===t&&e===s.length||i._sorted,d=t>0&&i._parsed[t-1];if(!1===this._parsing)i._parsed=s,i._sorted=!0,h=s;else{h=Y(s[t])?this.parseArrayData(i,s,t,e):U(s[t])?this.parseObjectData(i,s,t,e):this.parsePrimitiveData(i,s,t,e);const n=()=>null===l[a]||d&&l[a]<d[a];for(r=0;r<e;++r)i._parsed[r+t]=l=h[r],c&&(n()&&(c=!1),d=l);i._sorted=c}o&&vs(this,h)}parsePrimitiveData(t,e,i,s){const{iScale:n,vScale:o}=t,a=n.axis,r=o.axis,l=n.getLabels(),h=n===o,c=new Array(s);let d,u,f;for(d=0,u=s;d<u;++d)f=d+i,c[d]={[a]:h||n.parse(l[f],f),[r]:o.parse(e[f],f)};return c}parseArrayData(t,e,i,s){const{xScale:n,yScale:o}=t,a=new Array(s);let r,l,h,c;for(r=0,l=s;r<l;++r)h=r+i,c=e[h],a[r]={x:n.parse(c[0],h),y:o.parse(c[1],h)};return a}parseObjectData(t,e,i,s){const{xScale:n,yScale:o}=t,{xAxisKey:a="x",yAxisKey:r="y"}=this._parsing,l=new Array(s);let h,c,d,u;for(h=0,c=s;h<c;++h)d=h+i,u=e[d],l[h]={x:n.parse(lt(u,a),d),y:o.parse(lt(u,r),d)};return l}getParsed(t){return this._cachedMeta._parsed[t]}getDataElement(t){return this._cachedMeta.data[t]}applyStack(t,e,i){const s=this.chart,n=this._cachedMeta,o=e[t.axis];return xs({keys:ms(s,!0),values:e._stacks[t.axis]},o,n.index,{mode:i})}updateRangeFromParsed(t,e,i,s){const n=i[e.axis];let o=null===n?NaN:n;const a=s&&i._stacks[e.axis];s&&a&&(s.values=a,o=xs(s,n,this._cachedMeta.index)),t.min=Math.min(t.min,o),t.max=Math.max(t.max,o)}getMinMax(t,e){const i=this._cachedMeta,s=i._parsed,n=i._sorted&&t===i.iScale,o=s.length,a=this._getOtherScale(t),r=((t,e,i)=>t&&!e.hidden&&e._stacked&&{keys:ms(i,!0),values:null})(e,i,this.chart),l={min:Number.POSITIVE_INFINITY,max:Number.NEGATIVE_INFINITY},{min:h,max:c}=function(t){const{min:e,max:i,minDefined:s,maxDefined:n}=t.getUserBounds();return{min:s?e:Number.NEGATIVE_INFINITY,max:n?i:Number.POSITIVE_INFINITY}}(a);let d,u;function f(){u=s[d];const e=u[a.axis];return!X(u[t.axis])||h>e||c<e}for(d=0;d<o&&(f()||(this.updateRangeFromParsed(l,t,u,r),!n));++d);if(n)for(d=o-1;d>=0;--d)if(!f()){this.updateRangeFromParsed(l,t,u,r);break}return l}getAllParsedValues(t){const e=this._cachedMeta._parsed,i=[];let s,n,o;for(s=0,n=e.length;s<n;++s)o=e[s][t.axis],X(o)&&i.push(o);return i}getMaxOverflow(){return!1}getLabelAndValue(t){const e=this._cachedMeta,i=e.iScale,s=e.vScale,n=this.getParsed(t);return{label:i?""+i.getLabelForValue(n[i.axis]):"",value:s?""+s.getLabelForValue(n[s.axis]):""}}_update(t){const e=this._cachedMeta;this.update(t||"default"),e._clip=function(t){let e,i,s,n;return U(t)?(e=t.top,i=t.right,s=t.bottom,n=t.left):e=i=s=n=t,{top:e,right:i,bottom:s,left:n,disabled:!1===t}}(K(this.options.clip,function(t,e,i){if(!1===i)return!1;const s=ps(t,i),n=ps(e,i);return{top:n.end,right:s.end,bottom:n.start,left:s.start}}(e.xScale,e.yScale,this.getMaxOverflow())))}update(t){}draw(){const t=this._ctx,e=this.chart,i=this._cachedMeta,s=i.data||[],n=e.chartArea,o=[],a=this._drawStart||0,r=this._drawCount||s.length-a,l=this.options.drawActiveElementsOnTop;let h;for(i.dataset&&i.dataset.draw(t,n,a,r),h=a;h<a+r;++h){const e=s[h];e.hidden||(e.active&&l?o.push(e):e.draw(t,n))}for(h=0;h<o.length;++h)o[h].draw(t,n)}getStyle(t,e){const i=e?"active":"default";return void 0===t&&this._cachedMeta.dataset?this.resolveDatasetElementOptions(i):this.resolveDataElementOptions(t||0,i)}getContext(t,e,i){const s=this.getDataset();let n;if(t>=0&&t<this._cachedMeta.data.length){const e=this._cachedMeta.data[t];n=e.$context||(e.$context=function(t,e,i){return Ye(t,{active:!1,dataIndex:e,parsed:void 0,raw:void 0,element:i,index:e,mode:"default",type:"data"})}(this.getContext(),t,e)),n.parsed=this.getParsed(t),n.raw=s.data[t],n.index=n.dataIndex=t}else n=this.$context||(this.$context=function(t,e){return Ye(t,{active:!1,dataset:void 0,datasetIndex:e,index:e,mode:"default",type:"dataset"})}(this.chart.getContext(),this.index)),n.dataset=s,n.index=n.datasetIndex=this.index;return n.active=!!e,n.mode=i,n}resolveDatasetElementOptions(t){return this._resolveElementOptions(this.datasetElementType.id,t)}resolveDataElementOptions(t,e){return this._resolveElementOptions(this.dataElementType.id,e,t)}_resolveElementOptions(t,e="default",i){const s="active"===e,n=this._cachedDataOpts,o=t+"-"+e,a=n[o],r=this.enableOptionSharing&&ct(i);if(a)return Ss(a,r);const l=this.chart.config,h=l.datasetElementScopeKeys(this._type,t),c=s?[`${t}Hover`,"hover",t,""]:[t,""],d=l.getOptionScopes(this.getDataset(),h),u=Object.keys(bt.elements[t]),f=l.resolveNamedOptions(d,u,(()=>this.getContext(i,s)),c);return f.$shared&&(f.$shared=r,n[o]=Object.freeze(Ss(f,r))),f}_resolveAnimations(t,e,i){const s=this.chart,n=this._cachedDataOpts,o=`animation-${e}`,a=n[o];if(a)return a;let r;if(!1!==s.options.animation){const s=this.chart.config,n=s.datasetAnimationScopeKeys(this._type,e),o=s.getOptionScopes(this.getDataset(),n);r=s.createResolver(o,this.getContext(t,i,e))}const l=new gs(s,r&&r.animations);return r&&r._cacheable&&(n[o]=Object.freeze(l)),l}getSharedOptions(t){if(t.$shared)return this._sharedOptions||(this._sharedOptions=Object.assign({},t))}includeOptions(t,e){return!e||ks(t)||this.chart._animationsDisabled}updateElement(t,e,i,s){ks(s)?Object.assign(t,i):this._resolveAnimations(e,s).update(t,i)}updateSharedOptions(t,e,i){t&&!ks(e)&&this._resolveAnimations(void 0,e).update(t,i)}_setStyle(t,e,i,s){t.active=s;const n=this.getStyle(e,s);this._resolveAnimations(e,i,s).update(t,{options:!s&&this.getSharedOptions(n)||n})}removeHoverStyle(t,e,i){this._setStyle(t,i,"active",!1)}setHoverStyle(t,e,i){this._setStyle(t,i,"active",!0)}_removeDatasetHoverStyle(){const t=this._cachedMeta.dataset;t&&this._setStyle(t,void 0,"active",!1)}_setDatasetHoverStyle(){const t=this._cachedMeta.dataset;t&&this._setStyle(t,void 0,"active",!0)}_resyncElements(t){const e=this._data,i=this._cachedMeta.data;for(const[t,e,i]of this._syncList)this[t](e,i);this._syncList=[];const s=i.length,n=e.length,o=Math.min(n,s);o&&this.parse(0,o),n>s?this._insertElements(s,n-s,t):n<s&&this._removeElements(n,s-n)}_insertElements(t,e,i=!0){const s=this._cachedMeta,n=s.data,o=t+e;let a;const r=t=>{for(t.length+=e,a=t.length-1;a>=o;a--)t[a]=t[a-e]};for(r(n),a=t;a<o;++a)n[a]=new this.dataElementType;this._parsing&&r(s._parsed),this.parse(t,e),i&&this.updateElements(n,t,e,"reset")}updateElements(t,e,i,s){}_removeElements(t,e){const i=this._cachedMeta;if(this._parsing){const s=i._parsed.splice(t,e);i._stacked&&Ms(i,s)}i.data.splice(t,e)}_sync(t){if(this._parsing)this._syncList.push(t);else{const[e,i,s]=t;this[e](i,s)}this.chart._dataChanges.push([this.index,...t])}_onDataPush(){const t=arguments.length;this._sync(["_insertElements",this.getDataset().data.length-t,t])}_onDataPop(){this._sync(["_removeElements",this._cachedMeta.data.length-1,1])}_onDataShift(){this._sync(["_removeElements",0,1])}_onDataSplice(t,e){e&&this._sync(["_removeElements",t,e]);const i=arguments.length-2;i&&this._sync(["_insertElements",t,i])}_onDataUnshift(){this._sync(["_insertElements",0,arguments.length])}}Ps.defaults={},Ps.prototype.datasetElementType=null,Ps.prototype.dataElementType=null;class Ds{constructor(){this.x=void 0,this.y=void 0,this.active=!1,this.options=void 0,this.$animations=void 0}tooltipPosition(t){const{x:e,y:i}=this.getProps(["x","y"],t);return{x:e,y:i}}hasValue(){return Tt(this.x)&&Tt(this.y)}getProps(t,e){const i=this.$animations;if(!e||!i)return this;const s={};return t.forEach((t=>{s[t]=i[t]&&i[t].active()?i[t]._to:this[t]})),s}}Ds.defaults={},Ds.defaultRoutes=void 0;const Cs={values:t=>Y(t)?t:""+t,numeric(t,e,i){if(0===t)return"0";const s=this.chart.options.locale;let n,o=t;if(i.length>1){const e=Math.max(Math.abs(i[0].value),Math.abs(i[i.length-1].value));(e<1e-4||e>1e15)&&(n="scientific"),o=function(t,e){let i=e.length>3?e[2].value-e[1].value:e[1].value-e[0].value;Math.abs(i)>=1&&t!==Math.floor(t)&&(i=t-Math.floor(t));return i}(t,i)}const a=Dt(Math.abs(o)),r=Math.max(Math.min(-1*Math.floor(a),20),0),l={notation:n,minimumFractionDigits:r,maximumFractionDigits:r};return Object.assign(l,this.options.ticks.format),Ri(t,s,l)},logarithmic(t,e,i){if(0===t)return"0";const s=t/Math.pow(10,Math.floor(Dt(t)));return 1===s||2===s||5===s?Cs.numeric.call(this,t,e,i):""}};var Os={formatters:Cs};function As(t,e){const i=t.options.ticks,s=i.maxTicksLimit||function(t){const e=t.options.offset,i=t._tickSize(),s=t._length/i+(e?0:1),n=t._maxLength/i;return Math.floor(Math.min(s,n))}(t),n=i.major.enabled?function(t){const e=[];let i,s;for(i=0,s=t.length;i<s;i++)t[i].major&&e.push(i);return e}(e):[],o=n.length,a=n[0],r=n[o-1],l=[];if(o>s)return function(t,e,i,s){let n,o=0,a=i[0];for(s=Math.ceil(s),n=0;n<t.length;n++)n===a&&(e.push(t[n]),o++,a=i[o*s])}(e,l,n,o/s),l;const h=function(t,e,i){const s=function(t){const e=t.length;let i,s;if(e<2)return!1;for(s=t[0],i=1;i<e;++i)if(t[i]-t[i-1]!==s)return!1;return s}(t),n=e.length/i;if(!s)return Math.max(n,1);const o=At(s);for(let t=0,e=o.length-1;t<e;t++){const e=o[t];if(e>n)return e}return Math.max(n,1)}(n,e,s);if(o>0){let t,i;const s=o>1?Math.round((r-a)/(o-1)):null;for(Ts(e,l,h,$(s)?0:a-s,a),t=0,i=o-1;t<i;t++)Ts(e,l,h,n[t],n[t+1]);return Ts(e,l,h,r,$(s)?e.length:r+s),l}return Ts(e,l,h),l}function Ts(t,e,i,s,n){const o=K(s,0),a=Math.min(K(n,t.length),t.length);let r,l,h,c=0;for(i=Math.ceil(i),n&&(r=n-s,i=r/Math.floor(r/i)),h=o;h<0;)c++,h=Math.round(o+c*i);for(l=Math.max(o,0);l<a;l++)l===h&&(e.push(t[l]),c++,h=Math.round(o+c*i))}bt.set("scale",{display:!0,offset:!1,reverse:!1,beginAtZero:!1,bounds:"ticks",grace:0,grid:{display:!0,lineWidth:1,drawBorder:!0,drawOnChartArea:!0,drawTicks:!0,tickLength:8,tickWidth:(t,e)=>e.lineWidth,tickColor:(t,e)=>e.color,offset:!1,borderDash:[],borderDashOffset:0,borderWidth:1},title:{display:!1,text:"",padding:{top:4,bottom:4}},ticks:{minRotation:0,maxRotation:50,mirror:!1,textStrokeWidth:0,textStrokeColor:"",padding:3,display:!0,autoSkip:!0,autoSkipPadding:3,labelOffset:0,callback:Os.formatters.values,minor:{},major:{},align:"center",crossAlign:"near",showLabelBackdrop:!1,backdropColor:"rgba(255, 255, 255, 0.75)",backdropPadding:2}}),bt.route("scale.ticks","color","","color"),bt.route("scale.grid","color","","borderColor"),bt.route("scale.grid","borderColor","","borderColor"),bt.route("scale.title","color","","color"),bt.describe("scale",{_fallback:!1,_scriptable:t=>!t.startsWith("before")&&!t.startsWith("after")&&"callback"!==t&&"parser"!==t,_indexable:t=>"borderDash"!==t&&"tickBorderDash"!==t}),bt.describe("scales",{_fallback:"scale"}),bt.describe("scale.ticks",{_scriptable:t=>"backdropPadding"!==t&&"callback"!==t,_indexable:t=>"backdropPadding"!==t});const Ls=(t,e,i)=>"top"===e||"left"===e?t[e]+i:t[e]-i;function Rs(t,e){const i=[],s=t.length/e,n=t.length;let o=0;for(;o<n;o+=s)i.push(t[Math.floor(o)]);return i}function Es(t,e,i){const s=t.ticks.length,n=Math.min(e,s-1),o=t._startPixel,a=t._endPixel,r=1e-6;let l,h=t.getPixelForTick(n);if(!(i&&(l=1===s?Math.max(h-o,a-h):0===e?(t.getPixelForTick(1)-h)/2:(h-t.getPixelForTick(n-1))/2,h+=n<e?l:-l,h<o-r||h>a+r)))return h}function Is(t){return t.drawTicks?t.tickLength:0}function zs(t,e){if(!t.display)return 0;const i=He(t.font,e),s=Ne(t.padding);return(Y(t.text)?t.text.length:1)*i.lineHeight+s.height}function Fs(t,e,i){let n=s(t);return(i&&"right"!==e||!i&&"right"===e)&&(n=(t=>"left"===t?"right":"right"===t?"left":t)(n)),n}class Bs extends Ds{constructor(t){super(),this.id=t.id,this.type=t.type,this.options=void 0,this.ctx=t.ctx,this.chart=t.chart,this.top=void 0,this.bottom=void 0,this.left=void 0,this.right=void 0,this.width=void 0,this.height=void 0,this._margins={left:0,right:0,top:0,bottom:0},this.maxWidth=void 0,this.maxHeight=void 0,this.paddingTop=void 0,this.paddingBottom=void 0,this.paddingLeft=void 0,this.paddingRight=void 0,this.axis=void 0,this.labelRotation=void 0,this.min=void 0,this.max=void 0,this._range=void 0,this.ticks=[],this._gridLineItems=null,this._labelItems=null,this._labelSizes=null,this._length=0,this._maxLength=0,this._longestTextCache={},this._startPixel=void 0,this._endPixel=void 0,this._reversePixels=!1,this._userMax=void 0,this._userMin=void 0,this._suggestedMax=void 0,this._suggestedMin=void 0,this._ticksLength=0,this._borderValue=0,this._cache={},this._dataLimitsCached=!1,this.$context=void 0}init(t){this.options=t.setContext(this.getContext()),this.axis=t.axis,this._userMin=this.parse(t.min),this._userMax=this.parse(t.max),this._suggestedMin=this.parse(t.suggestedMin),this._suggestedMax=this.parse(t.suggestedMax)}parse(t,e){return t}getUserBounds(){let{_userMin:t,_userMax:e,_suggestedMin:i,_suggestedMax:s}=this;return t=q(t,Number.POSITIVE_INFINITY),e=q(e,Number.NEGATIVE_INFINITY),i=q(i,Number.POSITIVE_INFINITY),s=q(s,Number.NEGATIVE_INFINITY),{min:q(t,i),max:q(e,s),minDefined:X(t),maxDefined:X(e)}}getMinMax(t){let e,{min:i,max:s,minDefined:n,maxDefined:o}=this.getUserBounds();if(n&&o)return{min:i,max:s};const a=this.getMatchingVisibleMetas();for(let r=0,l=a.length;r<l;++r)e=a[r].controller.getMinMax(this,t),n||(i=Math.min(i,e.min)),o||(s=Math.max(s,e.max));return i=o&&i>s?s:i,s=n&&i>s?i:s,{min:q(i,q(s,i)),max:q(s,q(i,s))}}getPadding(){return{left:this.paddingLeft||0,top:this.paddingTop||0,right:this.paddingRight||0,bottom:this.paddingBottom||0}}getTicks(){return this.ticks}getLabels(){const t=this.chart.data;return this.options.labels||(this.isHorizontal()?t.xLabels:t.yLabels)||t.labels||[]}beforeLayout(){this._cache={},this._dataLimitsCached=!1}beforeUpdate(){J(this.options.beforeUpdate,[this])}update(t,e,i){const{beginAtZero:s,grace:n,ticks:o}=this.options,a=o.sampleSize;this.beforeUpdate(),this.maxWidth=t,this.maxHeight=e,this._margins=i=Object.assign({left:0,right:0,top:0,bottom:0},i),this.ticks=null,this._labelSizes=null,this._gridLineItems=null,this._labelItems=null,this.beforeSetDimensions(),this.setDimensions(),this.afterSetDimensions(),this._maxLength=this.isHorizontal()?this.width+i.left+i.right:this.height+i.top+i.bottom,this._dataLimitsCached||(this.beforeDataLimits(),this.determineDataLimits(),this.afterDataLimits(),this._range=$e(this,n,s),this._dataLimitsCached=!0),this.beforeBuildTicks(),this.ticks=this.buildTicks()||[],this.afterBuildTicks();const r=a<this.ticks.length;this._convertTicksToLabels(r?Rs(this.ticks,a):this.ticks),this.configure(),this.beforeCalculateLabelRotation(),this.calculateLabelRotation(),this.afterCalculateLabelRotation(),o.display&&(o.autoSkip||"auto"===o.source)&&(this.ticks=As(this,this.ticks),this._labelSizes=null),r&&this._convertTicksToLabels(this.ticks),this.beforeFit(),this.fit(),this.afterFit(),this.afterUpdate()}configure(){let t,e,i=this.options.reverse;this.isHorizontal()?(t=this.left,e=this.right):(t=this.top,e=this.bottom,i=!i),this._startPixel=t,this._endPixel=e,this._reversePixels=i,this._length=e-t,this._alignToPixels=this.options.alignToPixels}afterUpdate(){J(this.options.afterUpdate,[this])}beforeSetDimensions(){J(this.options.beforeSetDimensions,[this])}setDimensions(){this.isHorizontal()?(this.width=this.maxWidth,this.left=0,this.right=this.width):(this.height=this.maxHeight,this.top=0,this.bottom=this.height),this.paddingLeft=0,this.paddingTop=0,this.paddingRight=0,this.paddingBottom=0}afterSetDimensions(){J(this.options.afterSetDimensions,[this])}_callHooks(t){this.chart.notifyPlugins(t,this.getContext()),J(this.options[t],[this])}beforeDataLimits(){this._callHooks("beforeDataLimits")}determineDataLimits(){}afterDataLimits(){this._callHooks("afterDataLimits")}beforeBuildTicks(){this._callHooks("beforeBuildTicks")}buildTicks(){return[]}afterBuildTicks(){this._callHooks("afterBuildTicks")}beforeTickToLabelConversion(){J(this.options.beforeTickToLabelConversion,[this])}generateTickLabels(t){const e=this.options.ticks;let i,s,n;for(i=0,s=t.length;i<s;i++)n=t[i],n.label=J(e.callback,[n.value,i,t],this)}afterTickToLabelConversion(){J(this.options.afterTickToLabelConversion,[this])}beforeCalculateLabelRotation(){J(this.options.beforeCalculateLabelRotation,[this])}calculateLabelRotation(){const t=this.options,e=t.ticks,i=this.ticks.length,s=e.minRotation||0,n=e.maxRotation;let o,a,r,l=s;if(!this._isVisible()||!e.display||s>=n||i<=1||!this.isHorizontal())return void(this.labelRotation=s);const h=this._getLabelSizes(),c=h.widest.width,d=h.highest.height,u=jt(this.chart.width-c,0,this.maxWidth);o=t.offset?this.maxWidth/i:u/(i-1),c+6>o&&(o=u/(i-(t.offset?.5:1)),a=this.maxHeight-Is(t.grid)-e.padding-zs(t.title,this.chart.options.font),r=Math.sqrt(c*c+d*d),l=zt(Math.min(Math.asin(jt((h.highest.height+6)/o,-1,1)),Math.asin(jt(a/r,-1,1))-Math.asin(jt(d/r,-1,1)))),l=Math.max(s,Math.min(n,l))),this.labelRotation=l}afterCalculateLabelRotation(){J(this.options.afterCalculateLabelRotation,[this])}beforeFit(){J(this.options.beforeFit,[this])}fit(){const t={width:0,height:0},{chart:e,options:{ticks:i,title:s,grid:n}}=this,o=this._isVisible(),a=this.isHorizontal();if(o){const o=zs(s,e.options.font);if(a?(t.width=this.maxWidth,t.height=Is(n)+o):(t.height=this.maxHeight,t.width=Is(n)+o),i.display&&this.ticks.length){const{first:e,last:s,widest:n,highest:o}=this._getLabelSizes(),r=2*i.padding,l=It(this.labelRotation),h=Math.cos(l),c=Math.sin(l);if(a){const e=i.mirror?0:c*n.width+h*o.height;t.height=Math.min(this.maxHeight,t.height+e+r)}else{const e=i.mirror?0:h*n.width+c*o.height;t.width=Math.min(this.maxWidth,t.width+e+r)}this._calculatePadding(e,s,c,h)}}this._handleMargins(),a?(this.width=this._length=e.width-this._margins.left-this._margins.right,this.height=t.height):(this.width=t.width,this.height=this._length=e.height-this._margins.top-this._margins.bottom)}_calculatePadding(t,e,i,s){const{ticks:{align:n,padding:o},position:a}=this.options,r=0!==this.labelRotation,l="top"!==a&&"x"===this.axis;if(this.isHorizontal()){const a=this.getPixelForTick(0)-this.left,h=this.right-this.getPixelForTick(this.ticks.length-1);let c=0,d=0;r?l?(c=s*t.width,d=i*e.height):(c=i*t.height,d=s*e.width):"start"===n?d=e.width:"end"===n?c=t.width:(c=t.width/2,d=e.width/2),this.paddingLeft=Math.max((c-a+o)*this.width/(this.width-a),0),this.paddingRight=Math.max((d-h+o)*this.width/(this.width-h),0)}else{let i=e.height/2,s=t.height/2;"start"===n?(i=0,s=t.height):"end"===n&&(i=e.height,s=0),this.paddingTop=i+o,this.paddingBottom=s+o}}_handleMargins(){this._margins&&(this._margins.left=Math.max(this.paddingLeft,this._margins.left),this._margins.top=Math.max(this.paddingTop,this._margins.top),this._margins.right=Math.max(this.paddingRight,this._margins.right),this._margins.bottom=Math.max(this.paddingBottom,this._margins.bottom))}afterFit(){J(this.options.afterFit,[this])}isHorizontal(){const{axis:t,position:e}=this.options;return"top"===e||"bottom"===e||"x"===t}isFullSize(){return this.options.fullSize}_convertTicksToLabels(t){let e,i;for(this.beforeTickToLabelConversion(),this.generateTickLabels(t),e=0,i=t.length;e<i;e++)$(t[e].label)&&(t.splice(e,1),i--,e--);this.afterTickToLabelConversion()}_getLabelSizes(){let t=this._labelSizes;if(!t){const e=this.options.ticks.sampleSize;let i=this.ticks;e<i.length&&(i=Rs(i,e)),this._labelSizes=t=this._computeLabelSizes(i,i.length)}return t}_computeLabelSizes(t,e){const{ctx:i,_longestTextCache:s}=this,n=[],o=[];let a,r,l,h,c,d,u,f,g,p,m,x=0,b=0;for(a=0;a<e;++a){if(h=t[a].label,c=this._resolveTickFontOptions(a),i.font=d=c.string,u=s[d]=s[d]||{data:{},gc:[]},f=c.lineHeight,g=p=0,$(h)||Y(h)){if(Y(h))for(r=0,l=h.length;r<l;++r)m=h[r],$(m)||Y(m)||(g=Xt(i,u.data,u.gc,g,m),p+=f)}else g=Xt(i,u.data,u.gc,g,h),p=f;n.push(g),o.push(p),x=Math.max(g,x),b=Math.max(p,b)}!function(t,e){Q(t,(t=>{const i=t.gc,s=i.length/2;let n;if(s>e){for(n=0;n<s;++n)delete t.data[i[n]];i.splice(0,s)}}))}(s,e);const _=n.indexOf(x),y=o.indexOf(b),v=t=>({width:n[t]||0,height:o[t]||0});return{first:v(0),last:v(e-1),widest:v(_),highest:v(y),widths:n,heights:o}}getLabelForValue(t){return t}getPixelForValue(t,e){return NaN}getValueForPixel(t){}getPixelForTick(t){const e=this.ticks;return t<0||t>e.length-1?null:this.getPixelForValue(e[t].value)}getPixelForDecimal(t){this._reversePixels&&(t=1-t);const e=this._startPixel+t*this._length;return $t(this._alignToPixels?Kt(this.chart,e,0):e)}getDecimalForPixel(t){const e=(t-this._startPixel)/this._length;return this._reversePixels?1-e:e}getBasePixel(){return this.getPixelForValue(this.getBaseValue())}getBaseValue(){const{min:t,max:e}=this;return t<0&&e<0?e:t>0&&e>0?t:0}getContext(t){const e=this.ticks||[];if(t>=0&&t<e.length){const i=e[t];return i.$context||(i.$context=function(t,e,i){return Ye(t,{tick:i,index:e,type:"tick"})}(this.getContext(),t,i))}return this.$context||(this.$context=Ye(this.chart.getContext(),{scale:this,type:"scale"}))}_tickSize(){const t=this.options.ticks,e=It(this.labelRotation),i=Math.abs(Math.cos(e)),s=Math.abs(Math.sin(e)),n=this._getLabelSizes(),o=t.autoSkipPadding||0,a=n?n.widest.width+o:0,r=n?n.highest.height+o:0;return this.isHorizontal()?r*i>a*s?a/i:r/s:r*s<a*i?r/i:a/s}_isVisible(){const t=this.options.display;return"auto"!==t?!!t:this.getMatchingVisibleMetas().length>0}_computeGridLineItems(t){const e=this.axis,i=this.chart,s=this.options,{grid:n,position:o}=s,a=n.offset,r=this.isHorizontal(),l=this.ticks.length+(a?1:0),h=Is(n),c=[],d=n.setContext(this.getContext()),u=d.drawBorder?d.borderWidth:0,f=u/2,g=function(t){return Kt(i,t,u)};let p,m,x,b,_,y,v,w,M,k,S,P;if("top"===o)p=g(this.bottom),y=this.bottom-h,w=p-f,k=g(t.top)+f,P=t.bottom;else if("bottom"===o)p=g(this.top),k=t.top,P=g(t.bottom)-f,y=p+f,w=this.top+h;else if("left"===o)p=g(this.right),_=this.right-h,v=p-f,M=g(t.left)+f,S=t.right;else if("right"===o)p=g(this.left),M=t.left,S=g(t.right)-f,_=p+f,v=this.left+h;else if("x"===e){if("center"===o)p=g((t.top+t.bottom)/2+.5);else if(U(o)){const t=Object.keys(o)[0],e=o[t];p=g(this.chart.scales[t].getPixelForValue(e))}k=t.top,P=t.bottom,y=p+f,w=y+h}else if("y"===e){if("center"===o)p=g((t.left+t.right)/2);else if(U(o)){const t=Object.keys(o)[0],e=o[t];p=g(this.chart.scales[t].getPixelForValue(e))}_=p-f,v=_-h,M=t.left,S=t.right}const D=K(s.ticks.maxTicksLimit,l),C=Math.max(1,Math.ceil(l/D));for(m=0;m<l;m+=C){const t=n.setContext(this.getContext(m)),e=t.lineWidth,s=t.color,o=n.borderDash||[],l=t.borderDashOffset,h=t.tickWidth,d=t.tickColor,u=t.tickBorderDash||[],f=t.tickBorderDashOffset;x=Es(this,m,a),void 0!==x&&(b=Kt(i,x,e),r?_=v=M=S=b:y=w=k=P=b,c.push({tx1:_,ty1:y,tx2:v,ty2:w,x1:M,y1:k,x2:S,y2:P,width:e,color:s,borderDash:o,borderDashOffset:l,tickWidth:h,tickColor:d,tickBorderDash:u,tickBorderDashOffset:f}))}return this._ticksLength=l,this._borderValue=p,c}_computeLabelItems(t){const e=this.axis,i=this.options,{position:s,ticks:n}=i,o=this.isHorizontal(),a=this.ticks,{align:r,crossAlign:l,padding:h,mirror:c}=n,d=Is(i.grid),u=d+h,f=c?-h:u,g=-It(this.labelRotation),p=[];let m,x,b,_,y,v,w,M,k,S,P,D,C="middle";if("top"===s)v=this.bottom-f,w=this._getXAxisLabelAlignment();else if("bottom"===s)v=this.top+f,w=this._getXAxisLabelAlignment();else if("left"===s){const t=this._getYAxisLabelAlignment(d);w=t.textAlign,y=t.x}else if("right"===s){const t=this._getYAxisLabelAlignment(d);w=t.textAlign,y=t.x}else if("x"===e){if("center"===s)v=(t.top+t.bottom)/2+u;else if(U(s)){const t=Object.keys(s)[0],e=s[t];v=this.chart.scales[t].getPixelForValue(e)+u}w=this._getXAxisLabelAlignment()}else if("y"===e){if("center"===s)y=(t.left+t.right)/2-u;else if(U(s)){const t=Object.keys(s)[0],e=s[t];y=this.chart.scales[t].getPixelForValue(e)}w=this._getYAxisLabelAlignment(d).textAlign}"y"===e&&("start"===r?C="top":"end"===r&&(C="bottom"));const O=this._getLabelSizes();for(m=0,x=a.length;m<x;++m){b=a[m],_=b.label;const t=n.setContext(this.getContext(m));M=this.getPixelForTick(m)+n.labelOffset,k=this._resolveTickFontOptions(m),S=k.lineHeight,P=Y(_)?_.length:1;const e=P/2,i=t.color,r=t.textStrokeColor,h=t.textStrokeWidth;let d;if(o?(y=M,D="top"===s?"near"===l||0!==g?-P*S+S/2:"center"===l?-O.highest.height/2-e*S+S:-O.highest.height+S/2:"near"===l||0!==g?S/2:"center"===l?O.highest.height/2-e*S:O.highest.height-P*S,c&&(D*=-1)):(v=M,D=(1-P)*S/2),t.showLabelBackdrop){const e=Ne(t.backdropPadding),i=O.heights[m],s=O.widths[m];let n=v+D-e.top,o=y-e.left;switch(C){case"middle":n-=i/2;break;case"bottom":n-=i}switch(w){case"center":o-=s/2;break;case"right":o-=s}d={left:o,top:n,width:s+e.width,height:i+e.height,color:t.backdropColor}}p.push({rotation:g,label:_,font:k,color:i,strokeColor:r,strokeWidth:h,textOffset:D,textAlign:w,textBaseline:C,translation:[y,v],backdrop:d})}return p}_getXAxisLabelAlignment(){const{position:t,ticks:e}=this.options;if(-It(this.labelRotation))return"top"===t?"left":"right";let i="center";return"start"===e.align?i="left":"end"===e.align&&(i="right"),i}_getYAxisLabelAlignment(t){const{position:e,ticks:{crossAlign:i,mirror:s,padding:n}}=this.options,o=t+n,a=this._getLabelSizes().widest.width;let r,l;return"left"===e?s?(l=this.right+n,"near"===i?r="left":"center"===i?(r="center",l+=a/2):(r="right",l+=a)):(l=this.right-o,"near"===i?r="right":"center"===i?(r="center",l-=a/2):(r="left",l=this.left)):"right"===e?s?(l=this.left+n,"near"===i?r="right":"center"===i?(r="center",l-=a/2):(r="left",l-=a)):(l=this.left+o,"near"===i?r="left":"center"===i?(r="center",l+=a/2):(r="right",l=this.right)):r="right",{textAlign:r,x:l}}_computeLabelArea(){if(this.options.ticks.mirror)return;const t=this.chart,e=this.options.position;return"left"===e||"right"===e?{top:0,left:this.left,bottom:t.height,right:this.right}:"top"===e||"bottom"===e?{top:this.top,left:0,bottom:this.bottom,right:t.width}:void 0}drawBackground(){const{ctx:t,options:{backgroundColor:e},left:i,top:s,width:n,height:o}=this;e&&(t.save(),t.fillStyle=e,t.fillRect(i,s,n,o),t.restore())}getLineWidthForValue(t){const e=this.options.grid;if(!this._isVisible()||!e.display)return 0;const i=this.ticks.findIndex((e=>e.value===t));if(i>=0){return e.setContext(this.getContext(i)).lineWidth}return 0}drawGrid(t){const e=this.options.grid,i=this.ctx,s=this._gridLineItems||(this._gridLineItems=this._computeGridLineItems(t));let n,o;const a=(t,e,s)=>{s.width&&s.color&&(i.save(),i.lineWidth=s.width,i.strokeStyle=s.color,i.setLineDash(s.borderDash||[]),i.lineDashOffset=s.borderDashOffset,i.beginPath(),i.moveTo(t.x,t.y),i.lineTo(e.x,e.y),i.stroke(),i.restore())};if(e.display)for(n=0,o=s.length;n<o;++n){const t=s[n];e.drawOnChartArea&&a({x:t.x1,y:t.y1},{x:t.x2,y:t.y2},t),e.drawTicks&&a({x:t.tx1,y:t.ty1},{x:t.tx2,y:t.ty2},{color:t.tickColor,width:t.tickWidth,borderDash:t.tickBorderDash,borderDashOffset:t.tickBorderDashOffset})}}drawBorder(){const{chart:t,ctx:e,options:{grid:i}}=this,s=i.setContext(this.getContext()),n=i.drawBorder?s.borderWidth:0;if(!n)return;const o=i.setContext(this.getContext(0)).lineWidth,a=this._borderValue;let r,l,h,c;this.isHorizontal()?(r=Kt(t,this.left,n)-n/2,l=Kt(t,this.right,o)+o/2,h=c=a):(h=Kt(t,this.top,n)-n/2,c=Kt(t,this.bottom,o)+o/2,r=l=a),e.save(),e.lineWidth=s.borderWidth,e.strokeStyle=s.borderColor,e.beginPath(),e.moveTo(r,h),e.lineTo(l,c),e.stroke(),e.restore()}drawLabels(t){if(!this.options.ticks.display)return;const e=this.ctx,i=this._computeLabelArea();i&&Qt(e,i);const s=this._labelItems||(this._labelItems=this._computeLabelItems(t));let n,o;for(n=0,o=s.length;n<o;++n){const t=s[n],i=t.font,o=t.label;t.backdrop&&(e.fillStyle=t.backdrop.color,e.fillRect(t.backdrop.left,t.backdrop.top,t.backdrop.width,t.backdrop.height)),se(e,o,0,t.textOffset,i,t)}i&&te(e)}drawTitle(){const{ctx:t,options:{position:e,title:i,reverse:s}}=this;if(!i.display)return;const o=He(i.font),a=Ne(i.padding),r=i.align;let l=o.lineHeight/2;"bottom"===e||"center"===e||U(e)?(l+=a.bottom,Y(i.text)&&(l+=o.lineHeight*(i.text.length-1))):l+=a.top;const{titleX:h,titleY:c,maxWidth:d,rotation:u}=function(t,e,i,s){const{top:o,left:a,bottom:r,right:l,chart:h}=t,{chartArea:c,scales:d}=h;let u,f,g,p=0;const m=r-o,x=l-a;if(t.isHorizontal()){if(f=n(s,a,l),U(i)){const t=Object.keys(i)[0],s=i[t];g=d[t].getPixelForValue(s)+m-e}else g="center"===i?(c.bottom+c.top)/2+m-e:Ls(t,i,e);u=l-a}else{if(U(i)){const t=Object.keys(i)[0],s=i[t];f=d[t].getPixelForValue(s)-x+e}else f="center"===i?(c.left+c.right)/2-x+e:Ls(t,i,e);g=n(s,r,o),p="left"===i?-kt:kt}return{titleX:f,titleY:g,maxWidth:u,rotation:p}}(this,l,e,r);se(t,i.text,0,0,o,{color:i.color,maxWidth:d,rotation:u,textAlign:Fs(r,e,s),textBaseline:"middle",translation:[h,c]})}draw(t){this._isVisible()&&(this.drawBackground(),this.drawGrid(t),this.drawBorder(),this.drawTitle(),this.drawLabels(t))}_layers(){const t=this.options,e=t.ticks&&t.ticks.z||0,i=K(t.grid&&t.grid.z,-1);return this._isVisible()&&this.draw===Bs.prototype.draw?[{z:i,draw:t=>{this.drawBackground(),this.drawGrid(t),this.drawTitle()}},{z:i+1,draw:()=>{this.drawBorder()}},{z:e,draw:t=>{this.drawLabels(t)}}]:[{z:e,draw:t=>{this.draw(t)}}]}getMatchingVisibleMetas(t){const e=this.chart.getSortedVisibleDatasetMetas(),i=this.axis+"AxisID",s=[];let n,o;for(n=0,o=e.length;n<o;++n){const o=e[n];o[i]!==this.id||t&&o.type!==t||s.push(o)}return s}_resolveTickFontOptions(t){return He(this.options.ticks.setContext(this.getContext(t)).font)}_maxDigits(){const t=this._resolveTickFontOptions(0).lineHeight;return(this.isHorizontal()?this.width:this.height)/t}}class Vs{constructor(t,e,i){this.type=t,this.scope=e,this.override=i,this.items=Object.create(null)}isForType(t){return Object.prototype.isPrototypeOf.call(this.type.prototype,t.prototype)}register(t){const e=Object.getPrototypeOf(t);let i;(function(t){return"id"in t&&"defaults"in t})(e)&&(i=this.register(e));const s=this.items,n=t.id,o=this.scope+"."+n;if(!n)throw new Error("class does not have id: "+t);return n in s||(s[n]=t,function(t,e,i){const s=nt(Object.create(null),[i?bt.get(i):{},bt.get(e),t.defaults]);bt.set(e,s),t.defaultRoutes&&function(t,e){Object.keys(e).forEach((i=>{const s=i.split("."),n=s.pop(),o=[t].concat(s).join("."),a=e[i].split("."),r=a.pop(),l=a.join(".");bt.route(o,n,l,r)}))}(e,t.defaultRoutes);t.descriptors&&bt.describe(e,t.descriptors)}(t,o,i),this.override&&bt.override(t.id,t.overrides)),o}get(t){return this.items[t]}unregister(t){const e=this.items,i=t.id,s=this.scope;i in e&&delete e[i],s&&i in bt[s]&&(delete bt[s][i],this.override&&delete gt[i])}}var Ws=new class{constructor(){this.controllers=new Vs(Ps,"datasets",!0),this.elements=new Vs(Ds,"elements"),this.plugins=new Vs(Object,"plugins"),this.scales=new Vs(Bs,"scales"),this._typedRegistries=[this.controllers,this.scales,this.elements]}add(...t){this._each("register",t)}remove(...t){this._each("unregister",t)}addControllers(...t){this._each("register",t,this.controllers)}addElements(...t){this._each("register",t,this.elements)}addPlugins(...t){this._each("register",t,this.plugins)}addScales(...t){this._each("register",t,this.scales)}getController(t){return this._get(t,this.controllers,"controller")}getElement(t){return this._get(t,this.elements,"element")}getPlugin(t){return this._get(t,this.plugins,"plugin")}getScale(t){return this._get(t,this.scales,"scale")}removeControllers(...t){this._each("unregister",t,this.controllers)}removeElements(...t){this._each("unregister",t,this.elements)}removePlugins(...t){this._each("unregister",t,this.plugins)}removeScales(...t){this._each("unregister",t,this.scales)}_each(t,e,i){[...e].forEach((e=>{const s=i||this._getRegistryForType(e);i||s.isForType(e)||s===this.plugins&&e.id?this._exec(t,s,e):Q(e,(e=>{const s=i||this._getRegistryForType(e);this._exec(t,s,e)}))}))}_exec(t,e,i){const s=ht(t);J(i["before"+s],[],i),e[t](i),J(i["after"+s],[],i)}_getRegistryForType(t){for(let e=0;e<this._typedRegistries.length;e++){const i=this._typedRegistries[e];if(i.isForType(t))return i}return this.plugins}_get(t,e,i){const s=e.get(t);if(void 0===s)throw new Error('"'+t+'" is not a registered '+i+".");return s}};class Ns{constructor(){this._init=[]}notify(t,e,i,s){"beforeInit"===e&&(this._init=this._createDescriptors(t,!0),this._notify(this._init,t,"install"));const n=s?this._descriptors(t).filter(s):this._descriptors(t),o=this._notify(n,t,e,i);return"afterDestroy"===e&&(this._notify(n,t,"stop"),this._notify(this._init,t,"uninstall")),o}_notify(t,e,i,s){s=s||{};for(const n of t){const t=n.plugin;if(!1===J(t[i],[e,s,n.options],t)&&s.cancelable)return!1}return!0}invalidate(){$(this._cache)||(this._oldCache=this._cache,this._cache=void 0)}_descriptors(t){if(this._cache)return this._cache;const e=this._cache=this._createDescriptors(t);return this._notifyStateChanges(t),e}_createDescriptors(t,e){const i=t&&t.config,s=K(i.options&&i.options.plugins,{}),n=function(t){const e=[],i=Object.keys(Ws.plugins.items);for(let t=0;t<i.length;t++)e.push(Ws.getPlugin(i[t]));const s=t.plugins||[];for(let t=0;t<s.length;t++){const i=s[t];-1===e.indexOf(i)&&e.push(i)}return e}(i);return!1!==s||e?function(t,e,i,s){const n=[],o=t.getContext();for(let a=0;a<e.length;a++){const r=e[a],l=Hs(i[r.id],s);null!==l&&n.push({plugin:r,options:js(t.config,r,l,o)})}return n}(t,n,s,e):[]}_notifyStateChanges(t){const e=this._oldCache||[],i=this._cache,s=(t,e)=>t.filter((t=>!e.some((e=>t.plugin.id===e.plugin.id))));this._notify(s(e,i),t,"stop"),this._notify(s(i,e),t,"start")}}function Hs(t,e){return e||!1!==t?!0===t?{}:t:null}function js(t,e,i,s){const n=t.pluginScopeKeys(e),o=t.getOptionScopes(i,n);return t.createResolver(o,s,[""],{scriptable:!1,indexable:!1,allKeys:!0})}function $s(t,e){const i=bt.datasets[t]||{};return((e.datasets||{})[t]||{}).indexAxis||e.indexAxis||i.indexAxis||"x"}function Ys(t,e){return"x"===t||"y"===t?t:e.axis||("top"===(i=e.position)||"bottom"===i?"x":"left"===i||"right"===i?"y":void 0)||t.charAt(0).toLowerCase();var i}function Us(t){const e=t.options||(t.options={});e.plugins=K(e.plugins,{}),e.scales=function(t,e){const i=gt[t.type]||{scales:{}},s=e.scales||{},n=$s(t.type,e),o=Object.create(null),a=Object.create(null);return Object.keys(s).forEach((t=>{const e=s[t];if(!U(e))return console.error(`Invalid scale configuration for scale: ${t}`);if(e._proxy)return console.warn(`Ignoring resolver passed as options for scale: ${t}`);const r=Ys(t,e),l=function(t,e){return t===e?"_index_":"_value_"}(r,n),h=i.scales||{};o[r]=o[r]||t,a[t]=ot(Object.create(null),[{axis:r},e,h[r],h[l]])})),t.data.datasets.forEach((i=>{const n=i.type||t.type,r=i.indexAxis||$s(n,e),l=(gt[n]||{}).scales||{};Object.keys(l).forEach((t=>{const e=function(t,e){let i=t;return"_index_"===t?i=e:"_value_"===t&&(i="x"===e?"y":"x"),i}(t,r),n=i[e+"AxisID"]||o[e]||e;a[n]=a[n]||Object.create(null),ot(a[n],[{axis:e},s[n],l[t]])}))})),Object.keys(a).forEach((t=>{const e=a[t];ot(e,[bt.scales[e.type],bt.scale])})),a}(t,e)}function Xs(t){return(t=t||{}).datasets=t.datasets||[],t.labels=t.labels||[],t}const qs=new Map,Ks=new Set;function Gs(t,e){let i=qs.get(t);return i||(i=e(),qs.set(t,i),Ks.add(i)),i}const Zs=(t,e,i)=>{const s=lt(e,i);void 0!==s&&t.add(s)};class Js{constructor(t){this._config=function(t){return(t=t||{}).data=Xs(t.data),Us(t),t}(t),this._scopeCache=new Map,this._resolverCache=new Map}get platform(){return this._config.platform}get type(){return this._config.type}set type(t){this._config.type=t}get data(){return this._config.data}set data(t){this._config.data=Xs(t)}get options(){return this._config.options}set options(t){this._config.options=t}get plugins(){return this._config.plugins}update(){const t=this._config;this.clearCache(),Us(t)}clearCache(){this._scopeCache.clear(),this._resolverCache.clear()}datasetScopeKeys(t){return Gs(t,(()=>[[`datasets.${t}`,""]]))}datasetAnimationScopeKeys(t,e){return Gs(`${t}.transition.${e}`,(()=>[[`datasets.${t}.transitions.${e}`,`transitions.${e}`],[`datasets.${t}`,""]]))}datasetElementScopeKeys(t,e){return Gs(`${t}-${e}`,(()=>[[`datasets.${t}.elements.${e}`,`datasets.${t}`,`elements.${e}`,""]]))}pluginScopeKeys(t){const e=t.id;return Gs(`${this.type}-plugin-${e}`,(()=>[[`plugins.${e}`,...t.additionalOptionScopes||[]]]))}_cachedScopes(t,e){const i=this._scopeCache;let s=i.get(t);return s&&!e||(s=new Map,i.set(t,s)),s}getOptionScopes(t,e,i){const{options:s,type:n}=this,o=this._cachedScopes(t,i),a=o.get(e);if(a)return a;const r=new Set;e.forEach((e=>{t&&(r.add(t),e.forEach((e=>Zs(r,t,e)))),e.forEach((t=>Zs(r,s,t))),e.forEach((t=>Zs(r,gt[n]||{},t))),e.forEach((t=>Zs(r,bt,t))),e.forEach((t=>Zs(r,pt,t)))}));const l=Array.from(r);return 0===l.length&&l.push(Object.create(null)),Ks.has(e)&&o.set(e,l),l}chartOptionScopes(){const{options:t,type:e}=this;return[t,gt[e]||{},bt.datasets[e]||{},{type:e},bt,pt]}resolveNamedOptions(t,e,i,s=[""]){const n={$shared:!0},{resolver:o,subPrefixes:a}=Qs(this._resolverCache,t,s);let r=o;if(function(t,e){const{isScriptable:i,isIndexable:s}=ri(t);for(const n of e){const e=i(n),o=s(n),a=(o||e)&&t[n];if(e&&(dt(a)||tn(a))||o&&Y(a))return!0}return!1}(o,e)){n.$shared=!1;r=ai(o,i=dt(i)?i():i,this.createResolver(t,i,a))}for(const t of e)n[t]=r[t];return n}createResolver(t,e,i=[""],s){const{resolver:n}=Qs(this._resolverCache,t,i);return U(e)?ai(n,e,void 0,s):n}}function Qs(t,e,i){let s=t.get(e);s||(s=new Map,t.set(e,s));const n=i.join();let o=s.get(n);if(!o){o={resolver:oi(e,i),subPrefixes:i.filter((t=>!t.toLowerCase().includes("hover")))},s.set(n,o)}return o}const tn=t=>U(t)&&Object.getOwnPropertyNames(t).reduce(((e,i)=>e||dt(t[i])),!1);const en=["top","bottom","left","right","chartArea"];function sn(t,e){return"top"===t||"bottom"===t||-1===en.indexOf(t)&&"x"===e}function nn(t,e){return function(i,s){return i[t]===s[t]?i[e]-s[e]:i[t]-s[t]}}function on(t){const e=t.chart,i=e.options.animation;e.notifyPlugins("afterRender"),J(i&&i.onComplete,[t],e)}function an(t){const e=t.chart,i=e.options.animation;J(i&&i.onProgress,[t],e)}function rn(t){return ge()&&"string"==typeof t?t=document.getElementById(t):t&&t.length&&(t=t[0]),t&&t.canvas&&(t=t.canvas),t}const ln={},hn=t=>{const e=rn(t);return Object.values(ln).filter((t=>t.canvas===e)).pop()};function cn(t,e,i){const s=Object.keys(t);for(const n of s){const s=+n;if(s>=e){const o=t[n];delete t[n],(i>0||s>e)&&(t[s+i]=o)}}}class dn{constructor(t,e){const s=this.config=new Js(e),n=rn(t),o=hn(n);if(o)throw new Error("Canvas is already in use. Chart with ID '"+o.id+"' must be destroyed before the canvas can be reused.");const r=s.createResolver(s.chartOptionScopes(),this.getContext());this.platform=new(s.platform||ls(n)),this.platform.updateConfig(s);const l=this.platform.acquireContext(n,r.aspectRatio),h=l&&l.canvas,c=h&&h.height,d=h&&h.width;this.id=j(),this.ctx=l,this.canvas=h,this.width=d,this.height=c,this._options=r,this._aspectRatio=this.aspectRatio,this._layers=[],this._metasets=[],this._stacks=void 0,this.boxes=[],this.currentDevicePixelRatio=void 0,this.chartArea=void 0,this._active=[],this._lastEvent=void 0,this._listeners={},this._responsiveListeners=void 0,this._sortedMetasets=[],this.scales={},this._plugins=new Ns,this.$proxies={},this._hiddenIndices={},this.attached=!1,this._animationsDisabled=void 0,this.$context=void 0,this._doResize=i((t=>this.update(t)),r.resizeDelay||0),this._dataChanges=[],ln[this.id]=this,l&&h?(a.listen(this,"complete",on),a.listen(this,"progress",an),this._initialize(),this.attached&&this.update()):console.error("Failed to create chart: can't acquire context from the given item")}get aspectRatio(){const{options:{aspectRatio:t,maintainAspectRatio:e},width:i,height:s,_aspectRatio:n}=this;return $(t)?e&&n?n:s?i/s:null:t}get data(){return this.config.data}set data(t){this.config.data=t}get options(){return this._options}set options(t){this.config.options=t}_initialize(){return this.notifyPlugins("beforeInit"),this.options.responsive?this.resize():ke(this,this.options.devicePixelRatio),this.bindEvents(),this.notifyPlugins("afterInit"),this}clear(){return Gt(this.canvas,this.ctx),this}stop(){return a.stop(this),this}resize(t,e){a.running(this)?this._resizeBeforeDraw={width:t,height:e}:this._resize(t,e)}_resize(t,e){const i=this.options,s=this.canvas,n=i.maintainAspectRatio&&this.aspectRatio,o=this.platform.getMaximumSize(s,t,e,n),a=i.devicePixelRatio||this.platform.getDevicePixelRatio(),r=this.width?"resize":"attach";this.width=o.width,this.height=o.height,this._aspectRatio=this.aspectRatio,ke(this,a,!0)&&(this.notifyPlugins("resize",{size:o}),J(i.onResize,[this,o],this),this.attached&&this._doResize(r)&&this.render())}ensureScalesHaveIDs(){Q(this.options.scales||{},((t,e)=>{t.id=e}))}buildOrUpdateScales(){const t=this.options,e=t.scales,i=this.scales,s=Object.keys(i).reduce(((t,e)=>(t[e]=!1,t)),{});let n=[];e&&(n=n.concat(Object.keys(e).map((t=>{const i=e[t],s=Ys(t,i),n="r"===s,o="x"===s;return{options:i,dposition:n?"chartArea":o?"bottom":"left",dtype:n?"radialLinear":o?"category":"linear"}})))),Q(n,(e=>{const n=e.options,o=n.id,a=Ys(o,n),r=K(n.type,e.dtype);void 0!==n.position&&sn(n.position,a)===sn(e.dposition)||(n.position=e.dposition),s[o]=!0;let l=null;if(o in i&&i[o].type===r)l=i[o];else{l=new(Ws.getScale(r))({id:o,type:r,ctx:this.ctx,chart:this}),i[l.id]=l}l.init(n,t)})),Q(s,((t,e)=>{t||delete i[e]})),Q(i,(t=>{ni.configure(this,t,t.options),ni.addBox(this,t)}))}_updateMetasets(){const t=this._metasets,e=this.data.datasets.length,i=t.length;if(t.sort(((t,e)=>t.index-e.index)),i>e){for(let t=e;t<i;++t)this._destroyDatasetMeta(t);t.splice(e,i-e)}this._sortedMetasets=t.slice(0).sort(nn("order","index"))}_removeUnreferencedMetasets(){const{_metasets:t,data:{datasets:e}}=this;t.length>e.length&&delete this._stacks,t.forEach(((t,i)=>{0===e.filter((e=>e===t._dataset)).length&&this._destroyDatasetMeta(i)}))}buildOrUpdateControllers(){const t=[],e=this.data.datasets;let i,s;for(this._removeUnreferencedMetasets(),i=0,s=e.length;i<s;i++){const s=e[i];let n=this.getDatasetMeta(i);const o=s.type||this.config.type;if(n.type&&n.type!==o&&(this._destroyDatasetMeta(i),n=this.getDatasetMeta(i)),n.type=o,n.indexAxis=s.indexAxis||$s(o,this.options),n.order=s.order||0,n.index=i,n.label=""+s.label,n.visible=this.isDatasetVisible(i),n.controller)n.controller.updateIndex(i),n.controller.linkScales();else{const e=Ws.getController(o),{datasetElementType:s,dataElementType:a}=bt.datasets[o];Object.assign(e.prototype,{dataElementType:Ws.getElement(a),datasetElementType:s&&Ws.getElement(s)}),n.controller=new e(this,i),t.push(n.controller)}}return this._updateMetasets(),t}_resetElements(){Q(this.data.datasets,((t,e)=>{this.getDatasetMeta(e).controller.reset()}),this)}reset(){this._resetElements(),this.notifyPlugins("reset")}update(t){const e=this.config;e.update();const i=this._options=e.createResolver(e.chartOptionScopes(),this.getContext()),s=this._animationsDisabled=!i.animation;if(this._updateScales(),this._checkEventBindings(),this._updateHiddenIndices(),this._plugins.invalidate(),!1===this.notifyPlugins("beforeUpdate",{mode:t,cancelable:!0}))return;const n=this.buildOrUpdateControllers();this.notifyPlugins("beforeElementsUpdate");let o=0;for(let t=0,e=this.data.datasets.length;t<e;t++){const{controller:e}=this.getDatasetMeta(t),i=!s&&-1===n.indexOf(e);e.buildOrUpdateElements(i),o=Math.max(+e.getMaxOverflow(),o)}o=this._minPadding=i.layout.autoPadding?o:0,this._updateLayout(o),s||Q(n,(t=>{t.reset()})),this._updateDatasets(t),this.notifyPlugins("afterUpdate",{mode:t}),this._layers.sort(nn("z","_idx"));const{_active:a,_lastEvent:r}=this;r?this._eventHandler(r,!0):a.length&&this._updateHoverStyles(a,a,!0),this.render()}_updateScales(){Q(this.scales,(t=>{ni.removeBox(this,t)})),this.ensureScalesHaveIDs(),this.buildOrUpdateScales()}_checkEventBindings(){const t=this.options,e=new Set(Object.keys(this._listeners)),i=new Set(t.events);ut(e,i)&&!!this._responsiveListeners===t.responsive||(this.unbindEvents(),this.bindEvents())}_updateHiddenIndices(){const{_hiddenIndices:t}=this,e=this._getUniformDataChanges()||[];for(const{method:i,start:s,count:n}of e){cn(t,s,"_removeElements"===i?-n:n)}}_getUniformDataChanges(){const t=this._dataChanges;if(!t||!t.length)return;this._dataChanges=[];const e=this.data.datasets.length,i=e=>new Set(t.filter((t=>t[0]===e)).map(((t,e)=>e+","+t.splice(1).join(",")))),s=i(0);for(let t=1;t<e;t++)if(!ut(s,i(t)))return;return Array.from(s).map((t=>t.split(","))).map((t=>({method:t[1],start:+t[2],count:+t[3]})))}_updateLayout(t){if(!1===this.notifyPlugins("beforeLayout",{cancelable:!0}))return;ni.update(this,this.width,this.height,t);const e=this.chartArea,i=e.width<=0||e.height<=0;this._layers=[],Q(this.boxes,(t=>{i&&"chartArea"===t.position||(t.configure&&t.configure(),this._layers.push(...t._layers()))}),this),this._layers.forEach(((t,e)=>{t._idx=e})),this.notifyPlugins("afterLayout")}_updateDatasets(t){if(!1!==this.notifyPlugins("beforeDatasetsUpdate",{mode:t,cancelable:!0})){for(let t=0,e=this.data.datasets.length;t<e;++t)this.getDatasetMeta(t).controller.configure();for(let e=0,i=this.data.datasets.length;e<i;++e)this._updateDataset(e,dt(t)?t({datasetIndex:e}):t);this.notifyPlugins("afterDatasetsUpdate",{mode:t})}}_updateDataset(t,e){const i=this.getDatasetMeta(t),s={meta:i,index:t,mode:e,cancelable:!0};!1!==this.notifyPlugins("beforeDatasetUpdate",s)&&(i.controller._update(e),s.cancelable=!1,this.notifyPlugins("afterDatasetUpdate",s))}render(){!1!==this.notifyPlugins("beforeRender",{cancelable:!0})&&(a.has(this)?this.attached&&!a.running(this)&&a.start(this):(this.draw(),on({chart:this})))}draw(){let t;if(this._resizeBeforeDraw){const{width:t,height:e}=this._resizeBeforeDraw;this._resize(t,e),this._resizeBeforeDraw=null}if(this.clear(),this.width<=0||this.height<=0)return;if(!1===this.notifyPlugins("beforeDraw",{cancelable:!0}))return;const e=this._layers;for(t=0;t<e.length&&e[t].z<=0;++t)e[t].draw(this.chartArea);for(this._drawDatasets();t<e.length;++t)e[t].draw(this.chartArea);this.notifyPlugins("afterDraw")}_getSortedDatasetMetas(t){const e=this._sortedMetasets,i=[];let s,n;for(s=0,n=e.length;s<n;++s){const n=e[s];t&&!n.visible||i.push(n)}return i}getSortedVisibleDatasetMetas(){return this._getSortedDatasetMetas(!0)}_drawDatasets(){if(!1===this.notifyPlugins("beforeDatasetsDraw",{cancelable:!0}))return;const t=this.getSortedVisibleDatasetMetas();for(let e=t.length-1;e>=0;--e)this._drawDataset(t[e]);this.notifyPlugins("afterDatasetsDraw")}_drawDataset(t){const e=this.ctx,i=t._clip,s=!i.disabled,n=this.chartArea,o={meta:t,index:t.index,cancelable:!0};!1!==this.notifyPlugins("beforeDatasetDraw",o)&&(s&&Qt(e,{left:!1===i.left?0:n.left-i.left,right:!1===i.right?this.width:n.right+i.right,top:!1===i.top?0:n.top-i.top,bottom:!1===i.bottom?this.height:n.bottom+i.bottom}),t.controller.draw(),s&&te(e),o.cancelable=!1,this.notifyPlugins("afterDatasetDraw",o))}getElementsAtEventForMode(t,e,i,s){const n=Ee.modes[e];return"function"==typeof n?n(this,t,i,s):[]}getDatasetMeta(t){const e=this.data.datasets[t],i=this._metasets;let s=i.filter((t=>t&&t._dataset===e)).pop();return s||(s={type:null,data:[],dataset:null,controller:null,hidden:null,xAxisID:null,yAxisID:null,order:e&&e.order||0,index:t,_dataset:e,_parsed:[],_sorted:!1},i.push(s)),s}getContext(){return this.$context||(this.$context=Ye(null,{chart:this,type:"chart"}))}getVisibleDatasetCount(){return this.getSortedVisibleDatasetMetas().length}isDatasetVisible(t){const e=this.data.datasets[t];if(!e)return!1;const i=this.getDatasetMeta(t);return"boolean"==typeof i.hidden?!i.hidden:!e.hidden}setDatasetVisibility(t,e){this.getDatasetMeta(t).hidden=!e}toggleDataVisibility(t){this._hiddenIndices[t]=!this._hiddenIndices[t]}getDataVisibility(t){return!this._hiddenIndices[t]}_updateVisibility(t,e,i){const s=i?"show":"hide",n=this.getDatasetMeta(t),o=n.controller._resolveAnimations(void 0,s);ct(e)?(n.data[e].hidden=!i,this.update()):(this.setDatasetVisibility(t,i),o.update(n,{visible:i}),this.update((e=>e.datasetIndex===t?s:void 0)))}hide(t,e){this._updateVisibility(t,e,!1)}show(t,e){this._updateVisibility(t,e,!0)}_destroyDatasetMeta(t){const e=this._metasets[t];e&&e.controller&&e.controller._destroy(),delete this._metasets[t]}_stop(){let t,e;for(this.stop(),a.remove(this),t=0,e=this.data.datasets.length;t<e;++t)this._destroyDatasetMeta(t)}destroy(){this.notifyPlugins("beforeDestroy");const{canvas:t,ctx:e}=this;this._stop(),this.config.clearCache(),t&&(this.unbindEvents(),Gt(t,e),this.platform.releaseContext(e),this.canvas=null,this.ctx=null),this.notifyPlugins("destroy"),delete ln[this.id],this.notifyPlugins("afterDestroy")}toBase64Image(...t){return this.canvas.toDataURL(...t)}bindEvents(){this.bindUserEvents(),this.options.responsive?this.bindResponsiveEvents():this.attached=!0}bindUserEvents(){const t=this._listeners,e=this.platform,i=(i,s)=>{e.addEventListener(this,i,s),t[i]=s},s=(t,e,i)=>{t.offsetX=e,t.offsetY=i,this._eventHandler(t)};Q(this.options.events,(t=>i(t,s)))}bindResponsiveEvents(){this._responsiveListeners||(this._responsiveListeners={});const t=this._responsiveListeners,e=this.platform,i=(i,s)=>{e.addEventListener(this,i,s),t[i]=s},s=(i,s)=>{t[i]&&(e.removeEventListener(this,i,s),delete t[i])},n=(t,e)=>{this.canvas&&this.resize(t,e)};let o;const a=()=>{s("attach",a),this.attached=!0,this.resize(),i("resize",n),i("detach",o)};o=()=>{this.attached=!1,s("resize",n),this._stop(),this._resize(0,0),i("attach",a)},e.isAttached(this.canvas)?a():o()}unbindEvents(){Q(this._listeners,((t,e)=>{this.platform.removeEventListener(this,e,t)})),this._listeners={},Q(this._responsiveListeners,((t,e)=>{this.platform.removeEventListener(this,e,t)})),this._responsiveListeners=void 0}updateHoverStyle(t,e,i){const s=i?"set":"remove";let n,o,a,r;for("dataset"===e&&(n=this.getDatasetMeta(t[0].datasetIndex),n.controller["_"+s+"DatasetHoverStyle"]()),a=0,r=t.length;a<r;++a){o=t[a];const e=o&&this.getDatasetMeta(o.datasetIndex).controller;e&&e[s+"HoverStyle"](o.element,o.datasetIndex,o.index)}}getActiveElements(){return this._active||[]}setActiveElements(t){const e=this._active||[],i=t.map((({datasetIndex:t,index:e})=>{const i=this.getDatasetMeta(t);if(!i)throw new Error("No dataset found at index "+t);return{datasetIndex:t,element:i.data[e],index:e}}));!tt(i,e)&&(this._active=i,this._lastEvent=null,this._updateHoverStyles(i,e))}notifyPlugins(t,e,i){return this._plugins.notify(this,t,e,i)}_updateHoverStyles(t,e,i){const s=this.options.hover,n=(t,e)=>t.filter((t=>!e.some((e=>t.datasetIndex===e.datasetIndex&&t.index===e.index)))),o=n(e,t),a=i?t:n(t,e);o.length&&this.updateHoverStyle(o,s.mode,!1),a.length&&s.mode&&this.updateHoverStyle(a,s.mode,!0)}_eventHandler(t,e){const i={event:t,replay:e,cancelable:!0,inChartArea:Jt(t,this.chartArea,this._minPadding)},s=e=>(e.options.events||this.options.events).includes(t.native.type);if(!1===this.notifyPlugins("beforeEvent",i,s))return;const n=this._handleEvent(t,e,i.inChartArea);return i.cancelable=!1,this.notifyPlugins("afterEvent",i,s),(n||i.changed)&&this.render(),this}_handleEvent(t,e,i){const{_active:s=[],options:n}=this,o=e,a=this._getActiveElements(t,s,i,o),r=ft(t),l=function(t,e,i,s){return i&&"mouseout"!==t.type?s?e:t:null}(t,this._lastEvent,i,r);i&&(this._lastEvent=null,J(n.onHover,[t,a,this],this),r&&J(n.onClick,[t,a,this],this));const h=!tt(a,s);return(h||e)&&(this._active=a,this._updateHoverStyles(a,s,e)),this._lastEvent=l,h}_getActiveElements(t,e,i,s){if("mouseout"===t.type)return[];if(!i)return e;const n=this.options.hover;return this.getElementsAtEventForMode(t,n.mode,n,s)}}const un=()=>Q(dn.instances,(t=>t._plugins.invalidate())),fn=!0;function gn(){throw new Error("This method is not implemented: Check that a complete date adapter is provided.")}Object.defineProperties(dn,{defaults:{enumerable:fn,value:bt},instances:{enumerable:fn,value:ln},overrides:{enumerable:fn,value:gt},registry:{enumerable:fn,value:Ws},version:{enumerable:fn,value:"3.7.0"},getChart:{enumerable:fn,value:hn},register:{enumerable:fn,value:(...t)=>{Ws.add(...t),un()}},unregister:{enumerable:fn,value:(...t)=>{Ws.remove(...t),un()}}});class pn{constructor(t){this.options=t||{}}formats(){return gn()}parse(t,e){return gn()}format(t,e){return gn()}add(t,e,i){return gn()}diff(t,e,i){return gn()}startOf(t,e,i){return gn()}endOf(t,e){return gn()}}pn.override=function(t){Object.assign(pn.prototype,t)};var mn={_date:pn};function xn(t){const e=t.iScale,i=function(t,e){if(!t._cache.$bar){const i=t.getMatchingVisibleMetas(e);let s=[];for(let e=0,n=i.length;e<n;e++)s=s.concat(i[e].controller.getAllParsedValues(t));t._cache.$bar=fe(s.sort(((t,e)=>t-e)))}return t._cache.$bar}(e,t.type);let s,n,o,a,r=e._length;const l=()=>{32767!==o&&-32768!==o&&(ct(a)&&(r=Math.min(r,Math.abs(o-a)||r)),a=o)};for(s=0,n=i.length;s<n;++s)o=e.getPixelForValue(i[s]),l();for(a=void 0,s=0,n=e.ticks.length;s<n;++s)o=e.getPixelForTick(s),l();return r}function bn(t,e,i,s){return Y(t)?function(t,e,i,s){const n=i.parse(t[0],s),o=i.parse(t[1],s),a=Math.min(n,o),r=Math.max(n,o);let l=a,h=r;Math.abs(a)>Math.abs(r)&&(l=r,h=a),e[i.axis]=h,e._custom={barStart:l,barEnd:h,start:n,end:o,min:a,max:r}}(t,e,i,s):e[i.axis]=i.parse(t,s),e}function _n(t,e,i,s){const n=t.iScale,o=t.vScale,a=n.getLabels(),r=n===o,l=[];let h,c,d,u;for(h=i,c=i+s;h<c;++h)u=e[h],d={},d[n.axis]=r||n.parse(a[h],h),l.push(bn(u,d,o,h));return l}function yn(t){return t&&void 0!==t.barStart&&void 0!==t.barEnd}function vn(t,e,i,s){let n=e.borderSkipped;const o={};if(!n)return void(t.borderSkipped=o);const{start:a,end:r,reverse:l,top:h,bottom:c}=function(t){let e,i,s,n,o;return t.horizontal?(e=t.base>t.x,i="left",s="right"):(e=t.base<t.y,i="bottom",s="top"),e?(n="end",o="start"):(n="start",o="end"),{start:i,end:s,reverse:e,top:n,bottom:o}}(t);"middle"===n&&i&&(t.enableBorderRadius=!0,(i._top||0)===s?n=h:(i._bottom||0)===s?n=c:(o[wn(c,a,r,l)]=!0,n=h)),o[wn(n,a,r,l)]=!0,t.borderSkipped=o}function wn(t,e,i,s){var n,o,a;return s?(a=i,t=Mn(t=(n=t)===(o=e)?a:n===a?o:n,i,e)):t=Mn(t,e,i),t}function Mn(t,e,i){return"start"===t?e:"end"===t?i:t}function kn(t,{inflateAmount:e},i){t.inflateAmount="auto"===e?1===i?.33:0:e}class Sn extends Ps{parsePrimitiveData(t,e,i,s){return _n(t,e,i,s)}parseArrayData(t,e,i,s){return _n(t,e,i,s)}parseObjectData(t,e,i,s){const{iScale:n,vScale:o}=t,{xAxisKey:a="x",yAxisKey:r="y"}=this._parsing,l="x"===n.axis?a:r,h="x"===o.axis?a:r,c=[];let d,u,f,g;for(d=i,u=i+s;d<u;++d)g=e[d],f={},f[n.axis]=n.parse(lt(g,l),d),c.push(bn(lt(g,h),f,o,d));return c}updateRangeFromParsed(t,e,i,s){super.updateRangeFromParsed(t,e,i,s);const n=i._custom;n&&e===this._cachedMeta.vScale&&(t.min=Math.min(t.min,n.min),t.max=Math.max(t.max,n.max))}getMaxOverflow(){return 0}getLabelAndValue(t){const e=this._cachedMeta,{iScale:i,vScale:s}=e,n=this.getParsed(t),o=n._custom,a=yn(o)?"["+o.start+", "+o.end+"]":""+s.getLabelForValue(n[s.axis]);return{label:""+i.getLabelForValue(n[i.axis]),value:a}}initialize(){this.enableOptionSharing=!0,super.initialize();this._cachedMeta.stack=this.getDataset().stack}update(t){const e=this._cachedMeta;this.updateElements(e.data,0,e.data.length,t)}updateElements(t,e,i,s){const n="reset"===s,{index:o,_cachedMeta:{vScale:a}}=this,r=a.getBasePixel(),l=a.isHorizontal(),h=this._getRuler(),c=this.resolveDataElementOptions(e,s),d=this.getSharedOptions(c),u=this.includeOptions(s,d);this.updateSharedOptions(d,s,c);for(let c=e;c<e+i;c++){const e=this.getParsed(c),i=n||$(e[a.axis])?{base:r,head:r}:this._calculateBarValuePixels(c),f=this._calculateBarIndexPixels(c,h),g=(e._stacks||{})[a.axis],p={horizontal:l,base:i.base,enableBorderRadius:!g||yn(e._custom)||o===g._top||o===g._bottom,x:l?i.head:f.center,y:l?f.center:i.head,height:l?f.size:Math.abs(i.size),width:l?Math.abs(i.size):f.size};u&&(p.options=d||this.resolveDataElementOptions(c,t[c].active?"active":s));const m=p.options||t[c].options;vn(p,m,g,o),kn(p,m,h.ratio),this.updateElement(t[c],c,p,s)}}_getStacks(t,e){const i=this._cachedMeta.iScale,s=i.getMatchingVisibleMetas(this._type),n=i.options.stacked,o=s.length,a=[];let r,l;for(r=0;r<o;++r)if(l=s[r],l.controller.options.grouped){if(void 0!==e){const t=l.controller.getParsed(e)[l.controller._cachedMeta.vScale.axis];if($(t)||isNaN(t))continue}if((!1===n||-1===a.indexOf(l.stack)||void 0===n&&void 0===l.stack)&&a.push(l.stack),l.index===t)break}return a.length||a.push(void 0),a}_getStackCount(t){return this._getStacks(void 0,t).length}_getStackIndex(t,e,i){const s=this._getStacks(t,i),n=void 0!==e?s.indexOf(e):-1;return-1===n?s.length-1:n}_getRuler(){const t=this.options,e=this._cachedMeta,i=e.iScale,s=[];let n,o;for(n=0,o=e.data.length;n<o;++n)s.push(i.getPixelForValue(this.getParsed(n)[i.axis],n));const a=t.barThickness;return{min:a||xn(e),pixels:s,start:i._startPixel,end:i._endPixel,stackCount:this._getStackCount(),scale:i,grouped:t.grouped,ratio:a?1:t.categoryPercentage*t.barPercentage}}_calculateBarValuePixels(t){const{_cachedMeta:{vScale:e,_stacked:i},options:{base:s,minBarLength:n}}=this,o=s||0,a=this.getParsed(t),r=a._custom,l=yn(r);let h,c,d=a[e.axis],u=0,f=i?this.applyStack(e,a,i):d;f!==d&&(u=f-d,f=d),l&&(d=r.barStart,f=r.barEnd-r.barStart,0!==d&&Ct(d)!==Ct(r.barEnd)&&(u=0),u+=d);const g=$(s)||l?u:s;let p=e.getPixelForValue(g);if(h=this.chart.getDataVisibility(t)?e.getPixelForValue(u+f):p,c=h-p,Math.abs(c)<n&&(c=function(t,e,i){return 0!==t?Ct(t):(e.isHorizontal()?1:-1)*(e.min>=i?1:-1)}(c,e,o)*n,d===o&&(p-=c/2),h=p+c),p===e.getPixelForValue(o)){const t=Ct(c)*e.getLineWidthForValue(o)/2;p+=t,c-=t}return{size:c,base:p,head:h,center:h+c/2}}_calculateBarIndexPixels(t,e){const i=e.scale,s=this.options,n=s.skipNull,o=K(s.maxBarThickness,1/0);let a,r;if(e.grouped){const i=n?this._getStackCount(t):e.stackCount,l="flex"===s.barThickness?function(t,e,i,s){const n=e.pixels,o=n[t];let a=t>0?n[t-1]:null,r=t<n.length-1?n[t+1]:null;const l=i.categoryPercentage;null===a&&(a=o-(null===r?e.end-e.start:r-o)),null===r&&(r=o+o-a);const h=o-(o-Math.min(a,r))/2*l;return{chunk:Math.abs(r-a)/2*l/s,ratio:i.barPercentage,start:h}}(t,e,s,i):function(t,e,i,s){const n=i.barThickness;let o,a;return $(n)?(o=e.min*i.categoryPercentage,a=i.barPercentage):(o=n*s,a=1),{chunk:o/s,ratio:a,start:e.pixels[t]-o/2}}(t,e,s,i),h=this._getStackIndex(this.index,this._cachedMeta.stack,n?t:void 0);a=l.start+l.chunk*h+l.chunk/2,r=Math.min(o,l.chunk*l.ratio)}else a=i.getPixelForValue(this.getParsed(t)[i.axis],t),r=Math.min(o,e.min*e.ratio);return{base:a-r/2,head:a+r/2,center:a,size:r}}draw(){const t=this._cachedMeta,e=t.vScale,i=t.data,s=i.length;let n=0;for(;n<s;++n)null!==this.getParsed(n)[e.axis]&&i[n].draw(this._ctx)}}Sn.id="bar",Sn.defaults={datasetElementType:!1,dataElementType:"bar",categoryPercentage:.8,barPercentage:.9,grouped:!0,animations:{numbers:{type:"number",properties:["x","y","base","width","height"]}}},Sn.overrides={scales:{_index_:{type:"category",offset:!0,grid:{offset:!0}},_value_:{type:"linear",beginAtZero:!0}}};class Pn extends Ps{initialize(){this.enableOptionSharing=!0,super.initialize()}parsePrimitiveData(t,e,i,s){const n=super.parsePrimitiveData(t,e,i,s);for(let t=0;t<n.length;t++)n[t]._custom=this.resolveDataElementOptions(t+i).radius;return n}parseArrayData(t,e,i,s){const n=super.parseArrayData(t,e,i,s);for(let t=0;t<n.length;t++){const s=e[i+t];n[t]._custom=K(s[2],this.resolveDataElementOptions(t+i).radius)}return n}parseObjectData(t,e,i,s){const n=super.parseObjectData(t,e,i,s);for(let t=0;t<n.length;t++){const s=e[i+t];n[t]._custom=K(s&&s.r&&+s.r,this.resolveDataElementOptions(t+i).radius)}return n}getMaxOverflow(){const t=this._cachedMeta.data;let e=0;for(let i=t.length-1;i>=0;--i)e=Math.max(e,t[i].size(this.resolveDataElementOptions(i))/2);return e>0&&e}getLabelAndValue(t){const e=this._cachedMeta,{xScale:i,yScale:s}=e,n=this.getParsed(t),o=i.getLabelForValue(n.x),a=s.getLabelForValue(n.y),r=n._custom;return{label:e.label,value:"("+o+", "+a+(r?", "+r:"")+")"}}update(t){const e=this._cachedMeta.data;this.updateElements(e,0,e.length,t)}updateElements(t,e,i,s){const n="reset"===s,{iScale:o,vScale:a}=this._cachedMeta,r=this.resolveDataElementOptions(e,s),l=this.getSharedOptions(r),h=this.includeOptions(s,l),c=o.axis,d=a.axis;for(let r=e;r<e+i;r++){const e=t[r],i=!n&&this.getParsed(r),l={},u=l[c]=n?o.getPixelForDecimal(.5):o.getPixelForValue(i[c]),f=l[d]=n?a.getBasePixel():a.getPixelForValue(i[d]);l.skip=isNaN(u)||isNaN(f),h&&(l.options=this.resolveDataElementOptions(r,e.active?"active":s),n&&(l.options.radius=0)),this.updateElement(e,r,l,s)}this.updateSharedOptions(l,s,r)}resolveDataElementOptions(t,e){const i=this.getParsed(t);let s=super.resolveDataElementOptions(t,e);s.$shared&&(s=Object.assign({},s,{$shared:!1}));const n=s.radius;return"active"!==e&&(s.radius=0),s.radius+=K(i&&i._custom,n),s}}Pn.id="bubble",Pn.defaults={datasetElementType:!1,dataElementType:"point",animations:{numbers:{type:"number",properties:["x","y","borderWidth","radius"]}}},Pn.overrides={scales:{x:{type:"linear"},y:{type:"linear"}},plugins:{tooltip:{callbacks:{title:()=>""}}}};class Dn extends Ps{constructor(t,e){super(t,e),this.enableOptionSharing=!0,this.innerRadius=void 0,this.outerRadius=void 0,this.offsetX=void 0,this.offsetY=void 0}linkScales(){}parse(t,e){const i=this.getDataset().data,s=this._cachedMeta;if(!1===this._parsing)s._parsed=i;else{let n,o,a=t=>+i[t];if(U(i[t])){const{key:t="value"}=this._parsing;a=e=>+lt(i[e],t)}for(n=t,o=t+e;n<o;++n)s._parsed[n]=a(n)}}_getRotation(){return It(this.options.rotation-90)}_getCircumference(){return It(this.options.circumference)}_getRotationExtents(){let t=yt,e=-yt;for(let i=0;i<this.chart.data.datasets.length;++i)if(this.chart.isDatasetVisible(i)){const s=this.chart.getDatasetMeta(i).controller,n=s._getRotation(),o=s._getCircumference();t=Math.min(t,n),e=Math.max(e,n+o)}return{rotation:t,circumference:e-t}}update(t){const e=this.chart,{chartArea:i}=e,s=this._cachedMeta,n=s.data,o=this.getMaxBorderWidth()+this.getMaxOffset(n)+this.options.spacing,a=Math.max((Math.min(i.width,i.height)-o)/2,0),r=Math.min(G(this.options.cutout,a),1),l=this._getRingWeight(this.index),{circumference:h,rotation:c}=this._getRotationExtents(),{ratioX:d,ratioY:u,offsetX:f,offsetY:g}=function(t,e,i){let s=1,n=1,o=0,a=0;if(e<yt){const r=t,l=r+e,h=Math.cos(r),c=Math.sin(r),d=Math.cos(l),u=Math.sin(l),f=(t,e,s)=>Ht(t,r,l,!0)?1:Math.max(e,e*i,s,s*i),g=(t,e,s)=>Ht(t,r,l,!0)?-1:Math.min(e,e*i,s,s*i),p=f(0,h,d),m=f(kt,c,u),x=g(_t,h,d),b=g(_t+kt,c,u);s=(p-x)/2,n=(m-b)/2,o=-(p+x)/2,a=-(m+b)/2}return{ratioX:s,ratioY:n,offsetX:o,offsetY:a}}(c,h,r),p=(i.width-o)/d,m=(i.height-o)/u,x=Math.max(Math.min(p,m)/2,0),b=Z(this.options.radius,x),_=(b-Math.max(b*r,0))/this._getVisibleDatasetWeightTotal();this.offsetX=f*b,this.offsetY=g*b,s.total=this.calculateTotal(),this.outerRadius=b-_*this._getRingWeightOffset(this.index),this.innerRadius=Math.max(this.outerRadius-_*l,0),this.updateElements(n,0,n.length,t)}_circumference(t,e){const i=this.options,s=this._cachedMeta,n=this._getCircumference();return e&&i.animation.animateRotate||!this.chart.getDataVisibility(t)||null===s._parsed[t]||s.data[t].hidden?0:this.calculateCircumference(s._parsed[t]*n/yt)}updateElements(t,e,i,s){const n="reset"===s,o=this.chart,a=o.chartArea,r=o.options.animation,l=(a.left+a.right)/2,h=(a.top+a.bottom)/2,c=n&&r.animateScale,d=c?0:this.innerRadius,u=c?0:this.outerRadius,f=this.resolveDataElementOptions(e,s),g=this.getSharedOptions(f),p=this.includeOptions(s,g);let m,x=this._getRotation();for(m=0;m<e;++m)x+=this._circumference(m,n);for(m=e;m<e+i;++m){const e=this._circumference(m,n),i=t[m],o={x:l+this.offsetX,y:h+this.offsetY,startAngle:x,endAngle:x+e,circumference:e,outerRadius:u,innerRadius:d};p&&(o.options=g||this.resolveDataElementOptions(m,i.active?"active":s)),x+=e,this.updateElement(i,m,o,s)}this.updateSharedOptions(g,s,f)}calculateTotal(){const t=this._cachedMeta,e=t.data;let i,s=0;for(i=0;i<e.length;i++){const n=t._parsed[i];null===n||isNaN(n)||!this.chart.getDataVisibility(i)||e[i].hidden||(s+=Math.abs(n))}return s}calculateCircumference(t){const e=this._cachedMeta.total;return e>0&&!isNaN(t)?yt*(Math.abs(t)/e):0}getLabelAndValue(t){const e=this._cachedMeta,i=this.chart,s=i.data.labels||[],n=Ri(e._parsed[t],i.options.locale);return{label:s[t]||"",value:n}}getMaxBorderWidth(t){let e=0;const i=this.chart;let s,n,o,a,r;if(!t)for(s=0,n=i.data.datasets.length;s<n;++s)if(i.isDatasetVisible(s)){o=i.getDatasetMeta(s),t=o.data,a=o.controller;break}if(!t)return 0;for(s=0,n=t.length;s<n;++s)r=a.resolveDataElementOptions(s),"inner"!==r.borderAlign&&(e=Math.max(e,r.borderWidth||0,r.hoverBorderWidth||0));return e}getMaxOffset(t){let e=0;for(let i=0,s=t.length;i<s;++i){const t=this.resolveDataElementOptions(i);e=Math.max(e,t.offset||0,t.hoverOffset||0)}return e}_getRingWeightOffset(t){let e=0;for(let i=0;i<t;++i)this.chart.isDatasetVisible(i)&&(e+=this._getRingWeight(i));return e}_getRingWeight(t){return Math.max(K(this.chart.data.datasets[t].weight,1),0)}_getVisibleDatasetWeightTotal(){return this._getRingWeightOffset(this.chart.data.datasets.length)||1}}Dn.id="doughnut",Dn.defaults={datasetElementType:!1,dataElementType:"arc",animation:{animateRotate:!0,animateScale:!1},animations:{numbers:{type:"number",properties:["circumference","endAngle","innerRadius","outerRadius","startAngle","x","y","offset","borderWidth","spacing"]}},cutout:"50%",rotation:0,circumference:360,radius:"100%",spacing:0,indexAxis:"r"},Dn.descriptors={_scriptable:t=>"spacing"!==t,_indexable:t=>"spacing"!==t},Dn.overrides={aspectRatio:1,plugins:{legend:{labels:{generateLabels(t){const e=t.data;if(e.labels.length&&e.datasets.length){const{labels:{pointStyle:i}}=t.legend.options;return e.labels.map(((e,s)=>{const n=t.getDatasetMeta(0).controller.getStyle(s);return{text:e,fillStyle:n.backgroundColor,strokeStyle:n.borderColor,lineWidth:n.borderWidth,pointStyle:i,hidden:!t.getDataVisibility(s),index:s}}))}return[]}},onClick(t,e,i){i.chart.toggleDataVisibility(e.index),i.chart.update()}},tooltip:{callbacks:{title:()=>"",label(t){let e=t.label;const i=": "+t.formattedValue;return Y(e)?(e=e.slice(),e[0]+=i):e+=i,e}}}}};class Cn extends Ps{initialize(){this.enableOptionSharing=!0,super.initialize()}update(t){const e=this._cachedMeta,{dataset:i,data:s=[],_dataset:n}=e,o=this.chart._animationsDisabled;let{start:a,count:r}=function(t,e,i){const s=e.length;let n=0,o=s;if(t._sorted){const{iScale:a,_parsed:r}=t,l=a.axis,{min:h,max:c,minDefined:d,maxDefined:u}=a.getUserBounds();d&&(n=jt(Math.min(re(r,a.axis,h).lo,i?s:re(e,l,a.getPixelForValue(h)).lo),0,s-1)),o=u?jt(Math.max(re(r,a.axis,c).hi+1,i?0:re(e,l,a.getPixelForValue(c)).hi+1),n,s)-n:s-n}return{start:n,count:o}}(e,s,o);this._drawStart=a,this._drawCount=r,function(t){const{xScale:e,yScale:i,_scaleRanges:s}=t,n={xmin:e.min,xmax:e.max,ymin:i.min,ymax:i.max};if(!s)return t._scaleRanges=n,!0;const o=s.xmin!==e.min||s.xmax!==e.max||s.ymin!==i.min||s.ymax!==i.max;return Object.assign(s,n),o}(e)&&(a=0,r=s.length),i._chart=this.chart,i._datasetIndex=this.index,i._decimated=!!n._decimated,i.points=s;const l=this.resolveDatasetElementOptions(t);this.options.showLine||(l.borderWidth=0),l.segment=this.options.segment,this.updateElement(i,void 0,{animated:!o,options:l},t),this.updateElements(s,a,r,t)}updateElements(t,e,i,s){const n="reset"===s,{iScale:o,vScale:a,_stacked:r,_dataset:l}=this._cachedMeta,h=this.resolveDataElementOptions(e,s),c=this.getSharedOptions(h),d=this.includeOptions(s,c),u=o.axis,f=a.axis,{spanGaps:g,segment:p}=this.options,m=Tt(g)?g:Number.POSITIVE_INFINITY,x=this.chart._animationsDisabled||n||"none"===s;let b=e>0&&this.getParsed(e-1);for(let h=e;h<e+i;++h){const e=t[h],i=this.getParsed(h),g=x?e:{},_=$(i[f]),y=g[u]=o.getPixelForValue(i[u],h),v=g[f]=n||_?a.getBasePixel():a.getPixelForValue(r?this.applyStack(a,i,r):i[f],h);g.skip=isNaN(y)||isNaN(v)||_,g.stop=h>0&&i[u]-b[u]>m,p&&(g.parsed=i,g.raw=l.data[h]),d&&(g.options=c||this.resolveDataElementOptions(h,e.active?"active":s)),x||this.updateElement(e,h,g,s),b=i}this.updateSharedOptions(c,s,h)}getMaxOverflow(){const t=this._cachedMeta,e=t.dataset,i=e.options&&e.options.borderWidth||0,s=t.data||[];if(!s.length)return i;const n=s[0].size(this.resolveDataElementOptions(0)),o=s[s.length-1].size(this.resolveDataElementOptions(s.length-1));return Math.max(i,n,o)/2}draw(){const t=this._cachedMeta;t.dataset.updateControlPoints(this.chart.chartArea,t.iScale.axis),super.draw()}}Cn.id="line",Cn.defaults={datasetElementType:"line",dataElementType:"point",showLine:!0,spanGaps:!1},Cn.overrides={scales:{_index_:{type:"category"},_value_:{type:"linear"}}};class On extends Ps{constructor(t,e){super(t,e),this.innerRadius=void 0,this.outerRadius=void 0}getLabelAndValue(t){const e=this._cachedMeta,i=this.chart,s=i.data.labels||[],n=Ri(e._parsed[t].r,i.options.locale);return{label:s[t]||"",value:n}}update(t){const e=this._cachedMeta.data;this._updateRadius(),this.updateElements(e,0,e.length,t)}_updateRadius(){const t=this.chart,e=t.chartArea,i=t.options,s=Math.min(e.right-e.left,e.bottom-e.top),n=Math.max(s/2,0),o=(n-Math.max(i.cutoutPercentage?n/100*i.cutoutPercentage:1,0))/t.getVisibleDatasetCount();this.outerRadius=n-o*this.index,this.innerRadius=this.outerRadius-o}updateElements(t,e,i,s){const n="reset"===s,o=this.chart,a=this.getDataset(),r=o.options.animation,l=this._cachedMeta.rScale,h=l.xCenter,c=l.yCenter,d=l.getIndexAngle(0)-.5*_t;let u,f=d;const g=360/this.countVisibleElements();for(u=0;u<e;++u)f+=this._computeAngle(u,s,g);for(u=e;u<e+i;u++){const e=t[u];let i=f,p=f+this._computeAngle(u,s,g),m=o.getDataVisibility(u)?l.getDistanceFromCenterForValue(a.data[u]):0;f=p,n&&(r.animateScale&&(m=0),r.animateRotate&&(i=p=d));const x={x:h,y:c,innerRadius:0,outerRadius:m,startAngle:i,endAngle:p,options:this.resolveDataElementOptions(u,e.active?"active":s)};this.updateElement(e,u,x,s)}}countVisibleElements(){const t=this.getDataset(),e=this._cachedMeta;let i=0;return e.data.forEach(((e,s)=>{!isNaN(t.data[s])&&this.chart.getDataVisibility(s)&&i++})),i}_computeAngle(t,e,i){return this.chart.getDataVisibility(t)?It(this.resolveDataElementOptions(t,e).angle||i):0}}On.id="polarArea",On.defaults={dataElementType:"arc",animation:{animateRotate:!0,animateScale:!0},animations:{numbers:{type:"number",properties:["x","y","startAngle","endAngle","innerRadius","outerRadius"]}},indexAxis:"r",startAngle:0},On.overrides={aspectRatio:1,plugins:{legend:{labels:{generateLabels(t){const e=t.data;if(e.labels.length&&e.datasets.length){const{labels:{pointStyle:i}}=t.legend.options;return e.labels.map(((e,s)=>{const n=t.getDatasetMeta(0).controller.getStyle(s);return{text:e,fillStyle:n.backgroundColor,strokeStyle:n.borderColor,lineWidth:n.borderWidth,pointStyle:i,hidden:!t.getDataVisibility(s),index:s}}))}return[]}},onClick(t,e,i){i.chart.toggleDataVisibility(e.index),i.chart.update()}},tooltip:{callbacks:{title:()=>"",label:t=>t.chart.data.labels[t.dataIndex]+": "+t.formattedValue}}},scales:{r:{type:"radialLinear",angleLines:{display:!1},beginAtZero:!0,grid:{circular:!0},pointLabels:{display:!1},startAngle:0}}};class An extends Dn{}An.id="pie",An.defaults={cutout:0,rotation:0,circumference:360,radius:"100%"};class Tn extends Ps{getLabelAndValue(t){const e=this._cachedMeta.vScale,i=this.getParsed(t);return{label:e.getLabels()[t],value:""+e.getLabelForValue(i[e.axis])}}update(t){const e=this._cachedMeta,i=e.dataset,s=e.data||[],n=e.iScale.getLabels();if(i.points=s,"resize"!==t){const e=this.resolveDatasetElementOptions(t);this.options.showLine||(e.borderWidth=0);const o={_loop:!0,_fullLoop:n.length===s.length,options:e};this.updateElement(i,void 0,o,t)}this.updateElements(s,0,s.length,t)}updateElements(t,e,i,s){const n=this.getDataset(),o=this._cachedMeta.rScale,a="reset"===s;for(let r=e;r<e+i;r++){const e=t[r],i=this.resolveDataElementOptions(r,e.active?"active":s),l=o.getPointPositionForValue(r,n.data[r]),h=a?o.xCenter:l.x,c=a?o.yCenter:l.y,d={x:h,y:c,angle:l.angle,skip:isNaN(h)||isNaN(c),options:i};this.updateElement(e,r,d,s)}}}Tn.id="radar",Tn.defaults={datasetElementType:"line",dataElementType:"point",indexAxis:"r",showLine:!0,elements:{line:{fill:"start"}}},Tn.overrides={aspectRatio:1,scales:{r:{type:"radialLinear"}}};class Ln extends Cn{}Ln.id="scatter",Ln.defaults={showLine:!1,fill:!1},Ln.overrides={interaction:{mode:"point"},plugins:{tooltip:{callbacks:{title:()=>"",label:t=>"("+t.label+", "+t.formattedValue+")"}}},scales:{x:{type:"linear"},y:{type:"linear"}}};var Rn=Object.freeze({__proto__:null,BarController:Sn,BubbleController:Pn,DoughnutController:Dn,LineController:Cn,PolarAreaController:On,PieController:An,RadarController:Tn,ScatterController:Ln});function En(t,e,i){const{startAngle:s,pixelMargin:n,x:o,y:a,outerRadius:r,innerRadius:l}=e;let h=n/r;t.beginPath(),t.arc(o,a,r,s-h,i+h),l>n?(h=n/l,t.arc(o,a,l,i+h,s-h,!0)):t.arc(o,a,n,i+kt,s-kt),t.closePath(),t.clip()}function In(t,e,i,s){const n=Be(t.options.borderRadius,["outerStart","outerEnd","innerStart","innerEnd"]);const o=(i-e)/2,a=Math.min(o,s*e/2),r=t=>{const e=(i-Math.min(o,t))*s/2;return jt(t,0,Math.min(o,e))};return{outerStart:r(n.outerStart),outerEnd:r(n.outerEnd),innerStart:jt(n.innerStart,0,a),innerEnd:jt(n.innerEnd,0,a)}}function zn(t,e,i,s){return{x:i+t*Math.cos(e),y:s+t*Math.sin(e)}}function Fn(t,e,i,s,n){const{x:o,y:a,startAngle:r,pixelMargin:l,innerRadius:h}=e,c=Math.max(e.outerRadius+s+i-l,0),d=h>0?h+s+i+l:0;let u=0;const f=n-r;if(s){const t=((h>0?h-s:0)+(c>0?c-s:0))/2;u=(f-(0!==t?f*t/(t+s):f))/2}const g=(f-Math.max(.001,f*c-i/_t)/c)/2,p=r+g+u,m=n-g-u,{outerStart:x,outerEnd:b,innerStart:_,innerEnd:y}=In(e,d,c,m-p),v=c-x,w=c-b,M=p+x/v,k=m-b/w,S=d+_,P=d+y,D=p+_/S,C=m-y/P;if(t.beginPath(),t.arc(o,a,c,M,k),b>0){const e=zn(w,k,o,a);t.arc(e.x,e.y,b,k,m+kt)}const O=zn(P,m,o,a);if(t.lineTo(O.x,O.y),y>0){const e=zn(P,C,o,a);t.arc(e.x,e.y,y,m+kt,C+Math.PI)}if(t.arc(o,a,d,m-y/d,p+_/d,!0),_>0){const e=zn(S,D,o,a);t.arc(e.x,e.y,_,D+Math.PI,p-kt)}const A=zn(v,p,o,a);if(t.lineTo(A.x,A.y),x>0){const e=zn(v,M,o,a);t.arc(e.x,e.y,x,p-kt,M)}t.closePath()}function Bn(t,e,i,s,n){const{options:o}=e,{borderWidth:a,borderJoinStyle:r}=o,l="inner"===o.borderAlign;a&&(l?(t.lineWidth=2*a,t.lineJoin=r||"round"):(t.lineWidth=a,t.lineJoin=r||"bevel"),e.fullCircles&&function(t,e,i){const{x:s,y:n,startAngle:o,pixelMargin:a,fullCircles:r}=e,l=Math.max(e.outerRadius-a,0),h=e.innerRadius+a;let c;for(i&&En(t,e,o+yt),t.beginPath(),t.arc(s,n,h,o+yt,o,!0),c=0;c<r;++c)t.stroke();for(t.beginPath(),t.arc(s,n,l,o,o+yt),c=0;c<r;++c)t.stroke()}(t,e,l),l&&En(t,e,n),Fn(t,e,i,s,n),t.stroke())}class Vn extends Ds{constructor(t){super(),this.options=void 0,this.circumference=void 0,this.startAngle=void 0,this.endAngle=void 0,this.innerRadius=void 0,this.outerRadius=void 0,this.pixelMargin=0,this.fullCircles=0,t&&Object.assign(this,t)}inRange(t,e,i){const s=this.getProps(["x","y"],i),{angle:n,distance:o}=Bt(s,{x:t,y:e}),{startAngle:a,endAngle:r,innerRadius:l,outerRadius:h,circumference:c}=this.getProps(["startAngle","endAngle","innerRadius","outerRadius","circumference"],i),d=this.options.spacing/2,u=K(c,r-a)>=yt||Ht(n,a,r),f=Yt(o,l+d,h+d);return u&&f}getCenterPoint(t){const{x:e,y:i,startAngle:s,endAngle:n,innerRadius:o,outerRadius:a}=this.getProps(["x","y","startAngle","endAngle","innerRadius","outerRadius","circumference"],t),{offset:r,spacing:l}=this.options,h=(s+n)/2,c=(o+a+l+r)/2;return{x:e+Math.cos(h)*c,y:i+Math.sin(h)*c}}tooltipPosition(t){return this.getCenterPoint(t)}draw(t){const{options:e,circumference:i}=this,s=(e.offset||0)/2,n=(e.spacing||0)/2;if(this.pixelMargin="inner"===e.borderAlign?.33:0,this.fullCircles=i>yt?Math.floor(i/yt):0,0===i||this.innerRadius<0||this.outerRadius<0)return;t.save();let o=0;if(s){o=s/2;const e=(this.startAngle+this.endAngle)/2;t.translate(Math.cos(e)*o,Math.sin(e)*o),this.circumference>=_t&&(o=s)}t.fillStyle=e.backgroundColor,t.strokeStyle=e.borderColor;const a=function(t,e,i,s){const{fullCircles:n,startAngle:o,circumference:a}=e;let r=e.endAngle;if(n){Fn(t,e,i,s,o+yt);for(let e=0;e<n;++e)t.fill();isNaN(a)||(r=o+a%yt,a%yt==0&&(r+=yt))}return Fn(t,e,i,s,r),t.fill(),r}(t,this,o,n);Bn(t,this,o,n,a),t.restore()}}function Wn(t,e,i=e){t.lineCap=K(i.borderCapStyle,e.borderCapStyle),t.setLineDash(K(i.borderDash,e.borderDash)),t.lineDashOffset=K(i.borderDashOffset,e.borderDashOffset),t.lineJoin=K(i.borderJoinStyle,e.borderJoinStyle),t.lineWidth=K(i.borderWidth,e.borderWidth),t.strokeStyle=K(i.borderColor,e.borderColor)}function Nn(t,e,i){t.lineTo(i.x,i.y)}function Hn(t,e,i={}){const s=t.length,{start:n=0,end:o=s-1}=i,{start:a,end:r}=e,l=Math.max(n,a),h=Math.min(o,r),c=n<a&&o<a||n>r&&o>r;return{count:s,start:l,loop:e.loop,ilen:h<l&&!c?s+h-l:h-l}}function jn(t,e,i,s){const{points:n,options:o}=e,{count:a,start:r,loop:l,ilen:h}=Hn(n,i,s),c=function(t){return t.stepped?ee:t.tension||"monotone"===t.cubicInterpolationMode?ie:Nn}(o);let d,u,f,{move:g=!0,reverse:p}=s||{};for(d=0;d<=h;++d)u=n[(r+(p?h-d:d))%a],u.skip||(g?(t.moveTo(u.x,u.y),g=!1):c(t,f,u,p,o.stepped),f=u);return l&&(u=n[(r+(p?h:0))%a],c(t,f,u,p,o.stepped)),!!l}function $n(t,e,i,s){const n=e.points,{count:o,start:a,ilen:r}=Hn(n,i,s),{move:l=!0,reverse:h}=s||{};let c,d,u,f,g,p,m=0,x=0;const b=t=>(a+(h?r-t:t))%o,_=()=>{f!==g&&(t.lineTo(m,g),t.lineTo(m,f),t.lineTo(m,p))};for(l&&(d=n[b(0)],t.moveTo(d.x,d.y)),c=0;c<=r;++c){if(d=n[b(c)],d.skip)continue;const e=d.x,i=d.y,s=0|e;s===u?(i<f?f=i:i>g&&(g=i),m=(x*m+e)/++x):(_(),t.lineTo(e,i),u=s,x=0,f=g=i),p=i}_()}function Yn(t){const e=t.options,i=e.borderDash&&e.borderDash.length;return!(t._decimated||t._loop||e.tension||"monotone"===e.cubicInterpolationMode||e.stepped||i)?$n:jn}Vn.id="arc",Vn.defaults={borderAlign:"center",borderColor:"#fff",borderJoinStyle:void 0,borderRadius:0,borderWidth:2,offset:0,spacing:0,angle:void 0},Vn.defaultRoutes={backgroundColor:"backgroundColor"};const Un="function"==typeof Path2D;function Xn(t,e,i,s){Un&&!e.options.segment?function(t,e,i,s){let n=e._path;n||(n=e._path=new Path2D,e.path(n,i,s)&&n.closePath()),Wn(t,e.options),t.stroke(n)}(t,e,i,s):function(t,e,i,s){const{segments:n,options:o}=e,a=Yn(e);for(const r of n)Wn(t,o,r.style),t.beginPath(),a(t,e,r,{start:i,end:i+s-1})&&t.closePath(),t.stroke()}(t,e,i,s)}class qn extends Ds{constructor(t){super(),this.animated=!0,this.options=void 0,this._chart=void 0,this._loop=void 0,this._fullLoop=void 0,this._path=void 0,this._points=void 0,this._segments=void 0,this._decimated=!1,this._pointsUpdated=!1,this._datasetIndex=void 0,t&&Object.assign(this,t)}updateControlPoints(t,e){const i=this.options;if((i.tension||"monotone"===i.cubicInterpolationMode)&&!i.stepped&&!this._pointsUpdated){const s=i.spanGaps?this._loop:this._fullLoop;ki(this._points,i,t,s,e),this._pointsUpdated=!0}}set points(t){this._points=t,delete this._segments,delete this._path,this._pointsUpdated=!1}get points(){return this._points}get segments(){return this._segments||(this._segments=Ni(this,this.options.segment))}first(){const t=this.segments,e=this.points;return t.length&&e[t[0].start]}last(){const t=this.segments,e=this.points,i=t.length;return i&&e[t[i-1].end]}interpolate(t,e){const i=this.options,s=t[e],n=this.points,o=Wi(this,{property:e,start:s,end:s});if(!o.length)return;const a=[],r=function(t){return t.stepped?Ai:t.tension||"monotone"===t.cubicInterpolationMode?Ti:Oi}(i);let l,h;for(l=0,h=o.length;l<h;++l){const{start:h,end:c}=o[l],d=n[h],u=n[c];if(d===u){a.push(d);continue}const f=r(d,u,Math.abs((s-d[e])/(u[e]-d[e])),i.stepped);f[e]=t[e],a.push(f)}return 1===a.length?a[0]:a}pathSegment(t,e,i){return Yn(this)(t,this,e,i)}path(t,e,i){const s=this.segments,n=Yn(this);let o=this._loop;e=e||0,i=i||this.points.length-e;for(const a of s)o&=n(t,this,a,{start:e,end:e+i-1});return!!o}draw(t,e,i,s){const n=this.options||{};(this.points||[]).length&&n.borderWidth&&(t.save(),Xn(t,this,i,s),t.restore()),this.animated&&(this._pointsUpdated=!1,this._path=void 0)}}function Kn(t,e,i,s){const n=t.options,{[i]:o}=t.getProps([i],s);return Math.abs(e-o)<n.radius+n.hitRadius}qn.id="line",qn.defaults={borderCapStyle:"butt",borderDash:[],borderDashOffset:0,borderJoinStyle:"miter",borderWidth:3,capBezierPoints:!0,cubicInterpolationMode:"default",fill:!1,spanGaps:!1,stepped:!1,tension:0},qn.defaultRoutes={backgroundColor:"backgroundColor",borderColor:"borderColor"},qn.descriptors={_scriptable:!0,_indexable:t=>"borderDash"!==t&&"fill"!==t};class Gn extends Ds{constructor(t){super(),this.options=void 0,this.parsed=void 0,this.skip=void 0,this.stop=void 0,t&&Object.assign(this,t)}inRange(t,e,i){const s=this.options,{x:n,y:o}=this.getProps(["x","y"],i);return Math.pow(t-n,2)+Math.pow(e-o,2)<Math.pow(s.hitRadius+s.radius,2)}inXRange(t,e){return Kn(this,t,"x",e)}inYRange(t,e){return Kn(this,t,"y",e)}getCenterPoint(t){const{x:e,y:i}=this.getProps(["x","y"],t);return{x:e,y:i}}size(t){let e=(t=t||this.options||{}).radius||0;e=Math.max(e,e&&t.hoverRadius||0);return 2*(e+(e&&t.borderWidth||0))}draw(t,e){const i=this.options;this.skip||i.radius<.1||!Jt(this,e,this.size(i)/2)||(t.strokeStyle=i.borderColor,t.lineWidth=i.borderWidth,t.fillStyle=i.backgroundColor,Zt(t,i,this.x,this.y))}getRange(){const t=this.options||{};return t.radius+t.hitRadius}}function Zn(t,e){const{x:i,y:s,base:n,width:o,height:a}=t.getProps(["x","y","base","width","height"],e);let r,l,h,c,d;return t.horizontal?(d=a/2,r=Math.min(i,n),l=Math.max(i,n),h=s-d,c=s+d):(d=o/2,r=i-d,l=i+d,h=Math.min(s,n),c=Math.max(s,n)),{left:r,top:h,right:l,bottom:c}}function Jn(t,e,i,s){return t?0:jt(e,i,s)}function Qn(t){const e=Zn(t),i=e.right-e.left,s=e.bottom-e.top,n=function(t,e,i){const s=t.options.borderWidth,n=t.borderSkipped,o=Ve(s);return{t:Jn(n.top,o.top,0,i),r:Jn(n.right,o.right,0,e),b:Jn(n.bottom,o.bottom,0,i),l:Jn(n.left,o.left,0,e)}}(t,i/2,s/2),o=function(t,e,i){const{enableBorderRadius:s}=t.getProps(["enableBorderRadius"]),n=t.options.borderRadius,o=We(n),a=Math.min(e,i),r=t.borderSkipped,l=s||U(n);return{topLeft:Jn(!l||r.top||r.left,o.topLeft,0,a),topRight:Jn(!l||r.top||r.right,o.topRight,0,a),bottomLeft:Jn(!l||r.bottom||r.left,o.bottomLeft,0,a),bottomRight:Jn(!l||r.bottom||r.right,o.bottomRight,0,a)}}(t,i/2,s/2);return{outer:{x:e.left,y:e.top,w:i,h:s,radius:o},inner:{x:e.left+n.l,y:e.top+n.t,w:i-n.l-n.r,h:s-n.t-n.b,radius:{topLeft:Math.max(0,o.topLeft-Math.max(n.t,n.l)),topRight:Math.max(0,o.topRight-Math.max(n.t,n.r)),bottomLeft:Math.max(0,o.bottomLeft-Math.max(n.b,n.l)),bottomRight:Math.max(0,o.bottomRight-Math.max(n.b,n.r))}}}}function to(t,e,i,s){const n=null===e,o=null===i,a=t&&!(n&&o)&&Zn(t,s);return a&&(n||Yt(e,a.left,a.right))&&(o||Yt(i,a.top,a.bottom))}function eo(t,e){t.rect(e.x,e.y,e.w,e.h)}function io(t,e,i={}){const s=t.x!==i.x?-e:0,n=t.y!==i.y?-e:0,o=(t.x+t.w!==i.x+i.w?e:0)-s,a=(t.y+t.h!==i.y+i.h?e:0)-n;return{x:t.x+s,y:t.y+n,w:t.w+o,h:t.h+a,radius:t.radius}}Gn.id="point",Gn.defaults={borderWidth:1,hitRadius:1,hoverBorderWidth:1,hoverRadius:4,pointStyle:"circle",radius:3,rotation:0},Gn.defaultRoutes={backgroundColor:"backgroundColor",borderColor:"borderColor"};class so extends Ds{constructor(t){super(),this.options=void 0,this.horizontal=void 0,this.base=void 0,this.width=void 0,this.height=void 0,this.inflateAmount=void 0,t&&Object.assign(this,t)}draw(t){const{inflateAmount:e,options:{borderColor:i,backgroundColor:s}}=this,{inner:n,outer:o}=Qn(this),a=(r=o.radius).topLeft||r.topRight||r.bottomLeft||r.bottomRight?oe:eo;var r;t.save(),o.w===n.w&&o.h===n.h||(t.beginPath(),a(t,io(o,e,n)),t.clip(),a(t,io(n,-e,o)),t.fillStyle=i,t.fill("evenodd")),t.beginPath(),a(t,io(n,e)),t.fillStyle=s,t.fill(),t.restore()}inRange(t,e,i){return to(this,t,e,i)}inXRange(t,e){return to(this,t,null,e)}inYRange(t,e){return to(this,null,t,e)}getCenterPoint(t){const{x:e,y:i,base:s,horizontal:n}=this.getProps(["x","y","base","horizontal"],t);return{x:n?(e+s)/2:e,y:n?i:(i+s)/2}}getRange(t){return"x"===t?this.width/2:this.height/2}}so.id="bar",so.defaults={borderSkipped:"start",borderWidth:0,borderRadius:0,inflateAmount:"auto",pointStyle:void 0},so.defaultRoutes={backgroundColor:"backgroundColor",borderColor:"borderColor"};var no=Object.freeze({__proto__:null,ArcElement:Vn,LineElement:qn,PointElement:Gn,BarElement:so});function oo(t){if(t._decimated){const e=t._data;delete t._decimated,delete t._data,Object.defineProperty(t,"data",{value:e})}}function ao(t){t.data.datasets.forEach((t=>{oo(t)}))}var ro={id:"decimation",defaults:{algorithm:"min-max",enabled:!1},beforeElementsUpdate:(t,e,i)=>{if(!i.enabled)return void ao(t);const s=t.width;t.data.datasets.forEach(((e,n)=>{const{_data:o,indexAxis:a}=e,r=t.getDatasetMeta(n),l=o||e.data;if("y"===je([a,t.options.indexAxis]))return;if("line"!==r.type)return;const h=t.scales[r.xAxisID];if("linear"!==h.type&&"time"!==h.type)return;if(t.options.parsing)return;let{start:c,count:d}=function(t,e){const i=e.length;let s,n=0;const{iScale:o}=t,{min:a,max:r,minDefined:l,maxDefined:h}=o.getUserBounds();return l&&(n=jt(re(e,o.axis,a).lo,0,i-1)),s=h?jt(re(e,o.axis,r).hi+1,n,i)-n:i-n,{start:n,count:s}}(r,l);if(d<=(i.threshold||4*s))return void oo(e);let u;switch($(o)&&(e._data=l,delete e.data,Object.defineProperty(e,"data",{configurable:!0,enumerable:!0,get:function(){return this._decimated},set:function(t){this._data=t}})),i.algorithm){case"lttb":u=function(t,e,i,s,n){const o=n.samples||s;if(o>=i)return t.slice(e,e+i);const a=[],r=(i-2)/(o-2);let l=0;const h=e+i-1;let c,d,u,f,g,p=e;for(a[l++]=t[p],c=0;c<o-2;c++){let s,n=0,o=0;const h=Math.floor((c+1)*r)+1+e,m=Math.min(Math.floor((c+2)*r)+1,i)+e,x=m-h;for(s=h;s<m;s++)n+=t[s].x,o+=t[s].y;n/=x,o/=x;const b=Math.floor(c*r)+1+e,_=Math.min(Math.floor((c+1)*r)+1,i)+e,{x:y,y:v}=t[p];for(u=f=-1,s=b;s<_;s++)f=.5*Math.abs((y-n)*(t[s].y-v)-(y-t[s].x)*(o-v)),f>u&&(u=f,d=t[s],g=s);a[l++]=d,p=g}return a[l++]=t[h],a}(l,c,d,s,i);break;case"min-max":u=function(t,e,i,s){let n,o,a,r,l,h,c,d,u,f,g=0,p=0;const m=[],x=e+i-1,b=t[e].x,_=t[x].x-b;for(n=e;n<e+i;++n){o=t[n],a=(o.x-b)/_*s,r=o.y;const e=0|a;if(e===l)r<u?(u=r,h=n):r>f&&(f=r,c=n),g=(p*g+o.x)/++p;else{const i=n-1;if(!$(h)&&!$(c)){const e=Math.min(h,c),s=Math.max(h,c);e!==d&&e!==i&&m.push({...t[e],x:g}),s!==d&&s!==i&&m.push({...t[s],x:g})}n>0&&i!==d&&m.push(t[i]),m.push(o),l=e,p=0,u=f=r,h=c=d=n}}return m}(l,c,d,s);break;default:throw new Error(`Unsupported decimation algorithm '${i.algorithm}'`)}e._decimated=u}))},destroy(t){ao(t)}};function lo(t,e,i){const s=function(t){const e=t.options,i=e.fill;let s=K(i&&i.target,i);return void 0===s&&(s=!!e.backgroundColor),!1!==s&&null!==s&&(!0===s?"origin":s)}(t);if(U(s))return!isNaN(s.value)&&s;let n=parseFloat(s);return X(n)&&Math.floor(n)===n?("-"!==s[0]&&"+"!==s[0]||(n=e+n),!(n===e||n<0||n>=i)&&n):["origin","start","end","stack","shape"].indexOf(s)>=0&&s}class ho{constructor(t){this.x=t.x,this.y=t.y,this.radius=t.radius}pathSegment(t,e,i){const{x:s,y:n,radius:o}=this;return e=e||{start:0,end:yt},t.arc(s,n,o,e.end,e.start,!0),!i.bounds}interpolate(t){const{x:e,y:i,radius:s}=this,n=t.angle;return{x:e+Math.cos(n)*s,y:i+Math.sin(n)*s,angle:n}}}function co(t){return(t.scale||{}).getPointPositionForValue?function(t){const{scale:e,fill:i}=t,s=e.options,n=e.getLabels().length,o=[],a=s.reverse?e.max:e.min,r=s.reverse?e.min:e.max;let l,h,c;if(c="start"===i?a:"end"===i?r:U(i)?i.value:e.getBaseValue(),s.grid.circular)return h=e.getPointPositionForValue(0,a),new ho({x:h.x,y:h.y,radius:e.getDistanceFromCenterForValue(c)});for(l=0;l<n;++l)o.push(e.getPointPositionForValue(l,c));return o}(t):function(t){const{scale:e={},fill:i}=t;let s,n=null;return"start"===i?n=e.bottom:"end"===i?n=e.top:U(i)?n=e.getPixelForValue(i.value):e.getBasePixel&&(n=e.getBasePixel()),X(n)?(s=e.isHorizontal(),{x:s?n:null,y:s?null:n}):null}(t)}function uo(t,e,i){for(;e>t;e--){const t=i[e];if(!isNaN(t.x)&&!isNaN(t.y))break}return e}function fo(t,e,i){const s=[];for(let n=0;n<i.length;n++){const o=i[n],{first:a,last:r,point:l}=go(o,e,"x");if(!(!l||a&&r))if(a)s.unshift(l);else if(t.push(l),!r)break}t.push(...s)}function go(t,e,i){const s=t.interpolate(e,i);if(!s)return{};const n=s[i],o=t.segments,a=t.points;let r=!1,l=!1;for(let t=0;t<o.length;t++){const e=o[t],s=a[e.start][i],h=a[e.end][i];if(Yt(n,s,h)){r=n===s,l=n===h;break}}return{first:r,last:l,point:s}}function po(t){const{chart:e,fill:i,line:s}=t;if(X(i))return function(t,e){const i=t.getDatasetMeta(e);return i&&t.isDatasetVisible(e)?i.dataset:null}(e,i);if("stack"===i)return function(t){const{scale:e,index:i,line:s}=t,n=[],o=s.segments,a=s.points,r=function(t,e){const i=[],s=t.getMatchingVisibleMetas("line");for(let t=0;t<s.length;t++){const n=s[t];if(n.index===e)break;n.hidden||i.unshift(n.dataset)}return i}(e,i);r.push(mo({x:null,y:e.bottom},s));for(let t=0;t<o.length;t++){const e=o[t];for(let t=e.start;t<=e.end;t++)fo(n,a[t],r)}return new qn({points:n,options:{}})}(t);if("shape"===i)return!0;const n=co(t);return n instanceof ho?n:mo(n,s)}function mo(t,e){let i=[],s=!1;return Y(t)?(s=!0,i=t):i=function(t,e){const{x:i=null,y:s=null}=t||{},n=e.points,o=[];return e.segments.forEach((({start:t,end:e})=>{e=uo(t,e,n);const a=n[t],r=n[e];null!==s?(o.push({x:a.x,y:s}),o.push({x:r.x,y:s})):null!==i&&(o.push({x:i,y:a.y}),o.push({x:i,y:r.y}))})),o}(t,e),i.length?new qn({points:i,options:{tension:0},_loop:s,_fullLoop:s}):null}function xo(t,e,i){let s=t[e].fill;const n=[e];let o;if(!i)return s;for(;!1!==s&&-1===n.indexOf(s);){if(!X(s))return s;if(o=t[s],!o)return!1;if(o.visible)return s;n.push(s),s=o.fill}return!1}function bo(t,e,i){t.beginPath(),e.path(t),t.lineTo(e.last().x,i),t.lineTo(e.first().x,i),t.closePath(),t.clip()}function _o(t,e,i,s){if(s)return;let n=e[t],o=i[t];return"angle"===t&&(n=Nt(n),o=Nt(o)),{property:t,start:n,end:o}}function yo(t,e,i,s){return t&&e?s(t[i],e[i]):t?t[i]:e?e[i]:0}function vo(t,e,i){const{top:s,bottom:n}=e.chart.chartArea,{property:o,start:a,end:r}=i||{};"x"===o&&(t.beginPath(),t.rect(a,s,r-a,n-s),t.clip())}function wo(t,e,i,s){const n=e.interpolate(i,s);n&&t.lineTo(n.x,n.y)}function Mo(t,e){const{line:i,target:s,property:n,color:o,scale:a}=e,r=function(t,e,i){const s=t.segments,n=t.points,o=e.points,a=[];for(const t of s){let{start:s,end:r}=t;r=uo(s,r,n);const l=_o(i,n[s],n[r],t.loop);if(!e.segments){a.push({source:t,target:l,start:n[s],end:n[r]});continue}const h=Wi(e,l);for(const e of h){const s=_o(i,o[e.start],o[e.end],e.loop),r=Vi(t,n,s);for(const t of r)a.push({source:t,target:e,start:{[i]:yo(l,s,"start",Math.max)},end:{[i]:yo(l,s,"end",Math.min)}})}}return a}(i,s,n);for(const{source:e,target:l,start:h,end:c}of r){const{style:{backgroundColor:r=o}={}}=e,d=!0!==s;t.save(),t.fillStyle=r,vo(t,a,d&&_o(n,h,c)),t.beginPath();const u=!!i.pathSegment(t,e);let f;if(d){u?t.closePath():wo(t,s,c,n);const e=!!s.pathSegment(t,l,{move:u,reverse:!0});f=u&&e,f||wo(t,s,h,n)}t.closePath(),t.fill(f?"evenodd":"nonzero"),t.restore()}}function ko(t,e,i){const s=po(e),{line:n,scale:o,axis:a}=e,r=n.options,l=r.fill,h=r.backgroundColor,{above:c=h,below:d=h}=l||{};s&&n.points.length&&(Qt(t,i),function(t,e){const{line:i,target:s,above:n,below:o,area:a,scale:r}=e,l=i._loop?"angle":e.axis;t.save(),"x"===l&&o!==n&&(bo(t,s,a.top),Mo(t,{line:i,target:s,color:n,scale:r,property:l}),t.restore(),t.save(),bo(t,s,a.bottom)),Mo(t,{line:i,target:s,color:o,scale:r,property:l}),t.restore()}(t,{line:n,target:s,above:c,below:d,area:i,scale:o,axis:a}),te(t))}var So={id:"filler",afterDatasetsUpdate(t,e,i){const s=(t.data.datasets||[]).length,n=[];let o,a,r,l;for(a=0;a<s;++a)o=t.getDatasetMeta(a),r=o.dataset,l=null,r&&r.options&&r instanceof qn&&(l={visible:t.isDatasetVisible(a),index:a,fill:lo(r,a,s),chart:t,axis:o.controller.options.indexAxis,scale:o.vScale,line:r}),o.$filler=l,n.push(l);for(a=0;a<s;++a)l=n[a],l&&!1!==l.fill&&(l.fill=xo(n,a,i.propagate))},beforeDraw(t,e,i){const s="beforeDraw"===i.drawTime,n=t.getSortedVisibleDatasetMetas(),o=t.chartArea;for(let e=n.length-1;e>=0;--e){const i=n[e].$filler;i&&(i.line.updateControlPoints(o,i.axis),s&&ko(t.ctx,i,o))}},beforeDatasetsDraw(t,e,i){if("beforeDatasetsDraw"!==i.drawTime)return;const s=t.getSortedVisibleDatasetMetas();for(let e=s.length-1;e>=0;--e){const i=s[e].$filler;i&&ko(t.ctx,i,t.chartArea)}},beforeDatasetDraw(t,e,i){const s=e.meta.$filler;s&&!1!==s.fill&&"beforeDatasetDraw"===i.drawTime&&ko(t.ctx,s,t.chartArea)},defaults:{propagate:!0,drawTime:"beforeDatasetDraw"}};const Po=(t,e)=>{let{boxHeight:i=e,boxWidth:s=e}=t;return t.usePointStyle&&(i=Math.min(i,e),s=Math.min(s,e)),{boxWidth:s,boxHeight:i,itemHeight:Math.max(e,i)}};class Do extends Ds{constructor(t){super(),this._added=!1,this.legendHitBoxes=[],this._hoveredItem=null,this.doughnutMode=!1,this.chart=t.chart,this.options=t.options,this.ctx=t.ctx,this.legendItems=void 0,this.columnSizes=void 0,this.lineWidths=void 0,this.maxHeight=void 0,this.maxWidth=void 0,this.top=void 0,this.bottom=void 0,this.left=void 0,this.right=void 0,this.height=void 0,this.width=void 0,this._margins=void 0,this.position=void 0,this.weight=void 0,this.fullSize=void 0}update(t,e,i){this.maxWidth=t,this.maxHeight=e,this._margins=i,this.setDimensions(),this.buildLabels(),this.fit()}setDimensions(){this.isHorizontal()?(this.width=this.maxWidth,this.left=this._margins.left,this.right=this.width):(this.height=this.maxHeight,this.top=this._margins.top,this.bottom=this.height)}buildLabels(){const t=this.options.labels||{};let e=J(t.generateLabels,[this.chart],this)||[];t.filter&&(e=e.filter((e=>t.filter(e,this.chart.data)))),t.sort&&(e=e.sort(((e,i)=>t.sort(e,i,this.chart.data)))),this.options.reverse&&e.reverse(),this.legendItems=e}fit(){const{options:t,ctx:e}=this;if(!t.display)return void(this.width=this.height=0);const i=t.labels,s=He(i.font),n=s.size,o=this._computeTitleHeight(),{boxWidth:a,itemHeight:r}=Po(i,n);let l,h;e.font=s.string,this.isHorizontal()?(l=this.maxWidth,h=this._fitRows(o,n,a,r)+10):(h=this.maxHeight,l=this._fitCols(o,n,a,r)+10),this.width=Math.min(l,t.maxWidth||this.maxWidth),this.height=Math.min(h,t.maxHeight||this.maxHeight)}_fitRows(t,e,i,s){const{ctx:n,maxWidth:o,options:{labels:{padding:a}}}=this,r=this.legendHitBoxes=[],l=this.lineWidths=[0],h=s+a;let c=t;n.textAlign="left",n.textBaseline="middle";let d=-1,u=-h;return this.legendItems.forEach(((t,f)=>{const g=i+e/2+n.measureText(t.text).width;(0===f||l[l.length-1]+g+2*a>o)&&(c+=h,l[l.length-(f>0?0:1)]=0,u+=h,d++),r[f]={left:0,top:u,row:d,width:g,height:s},l[l.length-1]+=g+a})),c}_fitCols(t,e,i,s){const{ctx:n,maxHeight:o,options:{labels:{padding:a}}}=this,r=this.legendHitBoxes=[],l=this.columnSizes=[],h=o-t;let c=a,d=0,u=0,f=0,g=0;return this.legendItems.forEach(((t,o)=>{const p=i+e/2+n.measureText(t.text).width;o>0&&u+s+2*a>h&&(c+=d+a,l.push({width:d,height:u}),f+=d+a,g++,d=u=0),r[o]={left:f,top:u,col:g,width:p,height:s},d=Math.max(d,p),u+=s+a})),c+=d,l.push({width:d,height:u}),c}adjustHitBoxes(){if(!this.options.display)return;const t=this._computeTitleHeight(),{legendHitBoxes:e,options:{align:i,labels:{padding:s},rtl:o}}=this,a=Ei(o,this.left,this.width);if(this.isHorizontal()){let o=0,r=n(i,this.left+s,this.right-this.lineWidths[o]);for(const l of e)o!==l.row&&(o=l.row,r=n(i,this.left+s,this.right-this.lineWidths[o])),l.top+=this.top+t+s,l.left=a.leftForLtr(a.x(r),l.width),r+=l.width+s}else{let o=0,r=n(i,this.top+t+s,this.bottom-this.columnSizes[o].height);for(const l of e)l.col!==o&&(o=l.col,r=n(i,this.top+t+s,this.bottom-this.columnSizes[o].height)),l.top=r,l.left+=this.left+s,l.left=a.leftForLtr(a.x(l.left),l.width),r+=l.height+s}}isHorizontal(){return"top"===this.options.position||"bottom"===this.options.position}draw(){if(this.options.display){const t=this.ctx;Qt(t,this),this._draw(),te(t)}}_draw(){const{options:t,columnSizes:e,lineWidths:i,ctx:s}=this,{align:a,labels:r}=t,l=bt.color,h=Ei(t.rtl,this.left,this.width),c=He(r.font),{color:d,padding:u}=r,f=c.size,g=f/2;let p;this.drawTitle(),s.textAlign=h.textAlign("left"),s.textBaseline="middle",s.lineWidth=.5,s.font=c.string;const{boxWidth:m,boxHeight:x,itemHeight:b}=Po(r,f),_=this.isHorizontal(),y=this._computeTitleHeight();p=_?{x:n(a,this.left+u,this.right-i[0]),y:this.top+u+y,line:0}:{x:this.left+u,y:n(a,this.top+y+u,this.bottom-e[0].height),line:0},Ii(this.ctx,t.textDirection);const v=b+u;this.legendItems.forEach(((w,M)=>{s.strokeStyle=w.fontColor||d,s.fillStyle=w.fontColor||d;const k=s.measureText(w.text).width,S=h.textAlign(w.textAlign||(w.textAlign=r.textAlign)),P=m+g+k;let D=p.x,C=p.y;h.setWidth(this.width),_?M>0&&D+P+u>this.right&&(C=p.y+=v,p.line++,D=p.x=n(a,this.left+u,this.right-i[p.line])):M>0&&C+v>this.bottom&&(D=p.x=D+e[p.line].width+u,p.line++,C=p.y=n(a,this.top+y+u,this.bottom-e[p.line].height));!function(t,e,i){if(isNaN(m)||m<=0||isNaN(x)||x<0)return;s.save();const n=K(i.lineWidth,1);if(s.fillStyle=K(i.fillStyle,l),s.lineCap=K(i.lineCap,"butt"),s.lineDashOffset=K(i.lineDashOffset,0),s.lineJoin=K(i.lineJoin,"miter"),s.lineWidth=n,s.strokeStyle=K(i.strokeStyle,l),s.setLineDash(K(i.lineDash,[])),r.usePointStyle){const o={radius:m*Math.SQRT2/2,pointStyle:i.pointStyle,rotation:i.rotation,borderWidth:n},a=h.xPlus(t,m/2);Zt(s,o,a,e+g)}else{const o=e+Math.max((f-x)/2,0),a=h.leftForLtr(t,m),r=We(i.borderRadius);s.beginPath(),Object.values(r).some((t=>0!==t))?oe(s,{x:a,y:o,w:m,h:x,radius:r}):s.rect(a,o,m,x),s.fill(),0!==n&&s.stroke()}s.restore()}(h.x(D),C,w),D=o(S,D+m+g,_?D+P:this.right,t.rtl),function(t,e,i){se(s,i.text,t,e+b/2,c,{strikethrough:i.hidden,textAlign:h.textAlign(i.textAlign)})}(h.x(D),C,w),_?p.x+=P+u:p.y+=v})),zi(this.ctx,t.textDirection)}drawTitle(){const t=this.options,e=t.title,i=He(e.font),o=Ne(e.padding);if(!e.display)return;const a=Ei(t.rtl,this.left,this.width),r=this.ctx,l=e.position,h=i.size/2,c=o.top+h;let d,u=this.left,f=this.width;if(this.isHorizontal())f=Math.max(...this.lineWidths),d=this.top+c,u=n(t.align,u,this.right-f);else{const e=this.columnSizes.reduce(((t,e)=>Math.max(t,e.height)),0);d=c+n(t.align,this.top,this.bottom-e-t.labels.padding-this._computeTitleHeight())}const g=n(l,u,u+f);r.textAlign=a.textAlign(s(l)),r.textBaseline="middle",r.strokeStyle=e.color,r.fillStyle=e.color,r.font=i.string,se(r,e.text,g,d,i)}_computeTitleHeight(){const t=this.options.title,e=He(t.font),i=Ne(t.padding);return t.display?e.lineHeight+i.height:0}_getLegendItemAt(t,e){let i,s,n;if(Yt(t,this.left,this.right)&&Yt(e,this.top,this.bottom))for(n=this.legendHitBoxes,i=0;i<n.length;++i)if(s=n[i],Yt(t,s.left,s.left+s.width)&&Yt(e,s.top,s.top+s.height))return this.legendItems[i];return null}handleEvent(t){const e=this.options;if(!function(t,e){if("mousemove"===t&&(e.onHover||e.onLeave))return!0;if(e.onClick&&("click"===t||"mouseup"===t))return!0;return!1}(t.type,e))return;const i=this._getLegendItemAt(t.x,t.y);if("mousemove"===t.type){const o=this._hoveredItem,a=(n=i,null!==(s=o)&&null!==n&&s.datasetIndex===n.datasetIndex&&s.index===n.index);o&&!a&&J(e.onLeave,[t,o,this],this),this._hoveredItem=i,i&&!a&&J(e.onHover,[t,i,this],this)}else i&&J(e.onClick,[t,i,this],this);var s,n}}var Co={id:"legend",_element:Do,start(t,e,i){const s=t.legend=new Do({ctx:t.ctx,options:i,chart:t});ni.configure(t,s,i),ni.addBox(t,s)},stop(t){ni.removeBox(t,t.legend),delete t.legend},beforeUpdate(t,e,i){const s=t.legend;ni.configure(t,s,i),s.options=i},afterUpdate(t){const e=t.legend;e.buildLabels(),e.adjustHitBoxes()},afterEvent(t,e){e.replay||t.legend.handleEvent(e.event)},defaults:{display:!0,position:"top",align:"center",fullSize:!0,reverse:!1,weight:1e3,onClick(t,e,i){const s=e.datasetIndex,n=i.chart;n.isDatasetVisible(s)?(n.hide(s),e.hidden=!0):(n.show(s),e.hidden=!1)},onHover:null,onLeave:null,labels:{color:t=>t.chart.options.color,boxWidth:40,padding:10,generateLabels(t){const e=t.data.datasets,{labels:{usePointStyle:i,pointStyle:s,textAlign:n,color:o}}=t.legend.options;return t._getSortedDatasetMetas().map((t=>{const a=t.controller.getStyle(i?0:void 0),r=Ne(a.borderWidth);return{text:e[t.index].label,fillStyle:a.backgroundColor,fontColor:o,hidden:!t.visible,lineCap:a.borderCapStyle,lineDash:a.borderDash,lineDashOffset:a.borderDashOffset,lineJoin:a.borderJoinStyle,lineWidth:(r.width+r.height)/4,strokeStyle:a.borderColor,pointStyle:s||a.pointStyle,rotation:a.rotation,textAlign:n||a.textAlign,borderRadius:0,datasetIndex:t.index}}),this)}},title:{color:t=>t.chart.options.color,display:!1,position:"center",text:""}},descriptors:{_scriptable:t=>!t.startsWith("on"),labels:{_scriptable:t=>!["generateLabels","filter","sort"].includes(t)}}};class Oo extends Ds{constructor(t){super(),this.chart=t.chart,this.options=t.options,this.ctx=t.ctx,this._padding=void 0,this.top=void 0,this.bottom=void 0,this.left=void 0,this.right=void 0,this.width=void 0,this.height=void 0,this.position=void 0,this.weight=void 0,this.fullSize=void 0}update(t,e){const i=this.options;if(this.left=0,this.top=0,!i.display)return void(this.width=this.height=this.right=this.bottom=0);this.width=this.right=t,this.height=this.bottom=e;const s=Y(i.text)?i.text.length:1;this._padding=Ne(i.padding);const n=s*He(i.font).lineHeight+this._padding.height;this.isHorizontal()?this.height=n:this.width=n}isHorizontal(){const t=this.options.position;return"top"===t||"bottom"===t}_drawArgs(t){const{top:e,left:i,bottom:s,right:o,options:a}=this,r=a.align;let l,h,c,d=0;return this.isHorizontal()?(h=n(r,i,o),c=e+t,l=o-i):("left"===a.position?(h=i+t,c=n(r,s,e),d=-.5*_t):(h=o-t,c=n(r,e,s),d=.5*_t),l=s-e),{titleX:h,titleY:c,maxWidth:l,rotation:d}}draw(){const t=this.ctx,e=this.options;if(!e.display)return;const i=He(e.font),n=i.lineHeight/2+this._padding.top,{titleX:o,titleY:a,maxWidth:r,rotation:l}=this._drawArgs(n);se(t,e.text,0,0,i,{color:e.color,maxWidth:r,rotation:l,textAlign:s(e.align),textBaseline:"middle",translation:[o,a]})}}var Ao={id:"title",_element:Oo,start(t,e,i){!function(t,e){const i=new Oo({ctx:t.ctx,options:e,chart:t});ni.configure(t,i,e),ni.addBox(t,i),t.titleBlock=i}(t,i)},stop(t){const e=t.titleBlock;ni.removeBox(t,e),delete t.titleBlock},beforeUpdate(t,e,i){const s=t.titleBlock;ni.configure(t,s,i),s.options=i},defaults:{align:"center",display:!1,font:{weight:"bold"},fullSize:!0,padding:10,position:"top",text:"",weight:2e3},defaultRoutes:{color:"color"},descriptors:{_scriptable:!0,_indexable:!1}};const To=new WeakMap;var Lo={id:"subtitle",start(t,e,i){const s=new Oo({ctx:t.ctx,options:i,chart:t});ni.configure(t,s,i),ni.addBox(t,s),To.set(t,s)},stop(t){ni.removeBox(t,To.get(t)),To.delete(t)},beforeUpdate(t,e,i){const s=To.get(t);ni.configure(t,s,i),s.options=i},defaults:{align:"center",display:!1,font:{weight:"normal"},fullSize:!0,padding:0,position:"top",text:"",weight:1500},defaultRoutes:{color:"color"},descriptors:{_scriptable:!0,_indexable:!1}};const Ro={average(t){if(!t.length)return!1;let e,i,s=0,n=0,o=0;for(e=0,i=t.length;e<i;++e){const i=t[e].element;if(i&&i.hasValue()){const t=i.tooltipPosition();s+=t.x,n+=t.y,++o}}return{x:s/o,y:n/o}},nearest(t,e){if(!t.length)return!1;let i,s,n,o=e.x,a=e.y,r=Number.POSITIVE_INFINITY;for(i=0,s=t.length;i<s;++i){const s=t[i].element;if(s&&s.hasValue()){const t=Vt(e,s.getCenterPoint());t<r&&(r=t,n=s)}}if(n){const t=n.tooltipPosition();o=t.x,a=t.y}return{x:o,y:a}}};function Eo(t,e){return e&&(Y(e)?Array.prototype.push.apply(t,e):t.push(e)),t}function Io(t){return("string"==typeof t||t instanceof String)&&t.indexOf("\n")>-1?t.split("\n"):t}function zo(t,e){const{element:i,datasetIndex:s,index:n}=e,o=t.getDatasetMeta(s).controller,{label:a,value:r}=o.getLabelAndValue(n);return{chart:t,label:a,parsed:o.getParsed(n),raw:t.data.datasets[s].data[n],formattedValue:r,dataset:o.getDataset(),dataIndex:n,datasetIndex:s,element:i}}function Fo(t,e){const i=t.chart.ctx,{body:s,footer:n,title:o}=t,{boxWidth:a,boxHeight:r}=e,l=He(e.bodyFont),h=He(e.titleFont),c=He(e.footerFont),d=o.length,u=n.length,f=s.length,g=Ne(e.padding);let p=g.height,m=0,x=s.reduce(((t,e)=>t+e.before.length+e.lines.length+e.after.length),0);if(x+=t.beforeBody.length+t.afterBody.length,d&&(p+=d*h.lineHeight+(d-1)*e.titleSpacing+e.titleMarginBottom),x){p+=f*(e.displayColors?Math.max(r,l.lineHeight):l.lineHeight)+(x-f)*l.lineHeight+(x-1)*e.bodySpacing}u&&(p+=e.footerMarginTop+u*c.lineHeight+(u-1)*e.footerSpacing);let b=0;const _=function(t){m=Math.max(m,i.measureText(t).width+b)};return i.save(),i.font=h.string,Q(t.title,_),i.font=l.string,Q(t.beforeBody.concat(t.afterBody),_),b=e.displayColors?a+2+e.boxPadding:0,Q(s,(t=>{Q(t.before,_),Q(t.lines,_),Q(t.after,_)})),b=0,i.font=c.string,Q(t.footer,_),i.restore(),m+=g.width,{width:m,height:p}}function Bo(t,e,i,s){const{x:n,width:o}=i,{width:a,chartArea:{left:r,right:l}}=t;let h="center";return"center"===s?h=n<=(r+l)/2?"left":"right":n<=o/2?h="left":n>=a-o/2&&(h="right"),function(t,e,i,s){const{x:n,width:o}=s,a=i.caretSize+i.caretPadding;return"left"===t&&n+o+a>e.width||"right"===t&&n-o-a<0||void 0}(h,t,e,i)&&(h="center"),h}function Vo(t,e,i){const s=i.yAlign||e.yAlign||function(t,e){const{y:i,height:s}=e;return i<s/2?"top":i>t.height-s/2?"bottom":"center"}(t,i);return{xAlign:i.xAlign||e.xAlign||Bo(t,e,i,s),yAlign:s}}function Wo(t,e,i,s){const{caretSize:n,caretPadding:o,cornerRadius:a}=t,{xAlign:r,yAlign:l}=i,h=n+o,{topLeft:c,topRight:d,bottomLeft:u,bottomRight:f}=We(a);let g=function(t,e){let{x:i,width:s}=t;return"right"===e?i-=s:"center"===e&&(i-=s/2),i}(e,r);const p=function(t,e,i){let{y:s,height:n}=t;return"top"===e?s+=i:s-="bottom"===e?n+i:n/2,s}(e,l,h);return"center"===l?"left"===r?g+=h:"right"===r&&(g-=h):"left"===r?g-=Math.max(c,u)+n:"right"===r&&(g+=Math.max(d,f)+n),{x:jt(g,0,s.width-e.width),y:jt(p,0,s.height-e.height)}}function No(t,e,i){const s=Ne(i.padding);return"center"===e?t.x+t.width/2:"right"===e?t.x+t.width-s.right:t.x+s.left}function Ho(t){return Eo([],Io(t))}function jo(t,e){const i=e&&e.dataset&&e.dataset.tooltip&&e.dataset.tooltip.callbacks;return i?t.override(i):t}class $o extends Ds{constructor(t){super(),this.opacity=0,this._active=[],this._eventPosition=void 0,this._size=void 0,this._cachedAnimations=void 0,this._tooltipItems=[],this.$animations=void 0,this.$context=void 0,this.chart=t.chart||t._chart,this._chart=this.chart,this.options=t.options,this.dataPoints=void 0,this.title=void 0,this.beforeBody=void 0,this.body=void 0,this.afterBody=void 0,this.footer=void 0,this.xAlign=void 0,this.yAlign=void 0,this.x=void 0,this.y=void 0,this.height=void 0,this.width=void 0,this.caretX=void 0,this.caretY=void 0,this.labelColors=void 0,this.labelPointStyles=void 0,this.labelTextColors=void 0}initialize(t){this.options=t,this._cachedAnimations=void 0,this.$context=void 0}_resolveAnimations(){const t=this._cachedAnimations;if(t)return t;const e=this.chart,i=this.options.setContext(this.getContext()),s=i.enabled&&e.options.animation&&i.animations,n=new gs(this.chart,s);return s._cacheable&&(this._cachedAnimations=Object.freeze(n)),n}getContext(){return this.$context||(this.$context=(t=this.chart.getContext(),e=this,i=this._tooltipItems,Ye(t,{tooltip:e,tooltipItems:i,type:"tooltip"})));var t,e,i}getTitle(t,e){const{callbacks:i}=e,s=i.beforeTitle.apply(this,[t]),n=i.title.apply(this,[t]),o=i.afterTitle.apply(this,[t]);let a=[];return a=Eo(a,Io(s)),a=Eo(a,Io(n)),a=Eo(a,Io(o)),a}getBeforeBody(t,e){return Ho(e.callbacks.beforeBody.apply(this,[t]))}getBody(t,e){const{callbacks:i}=e,s=[];return Q(t,(t=>{const e={before:[],lines:[],after:[]},n=jo(i,t);Eo(e.before,Io(n.beforeLabel.call(this,t))),Eo(e.lines,n.label.call(this,t)),Eo(e.after,Io(n.afterLabel.call(this,t))),s.push(e)})),s}getAfterBody(t,e){return Ho(e.callbacks.afterBody.apply(this,[t]))}getFooter(t,e){const{callbacks:i}=e,s=i.beforeFooter.apply(this,[t]),n=i.footer.apply(this,[t]),o=i.afterFooter.apply(this,[t]);let a=[];return a=Eo(a,Io(s)),a=Eo(a,Io(n)),a=Eo(a,Io(o)),a}_createItems(t){const e=this._active,i=this.chart.data,s=[],n=[],o=[];let a,r,l=[];for(a=0,r=e.length;a<r;++a)l.push(zo(this.chart,e[a]));return t.filter&&(l=l.filter(((e,s,n)=>t.filter(e,s,n,i)))),t.itemSort&&(l=l.sort(((e,s)=>t.itemSort(e,s,i)))),Q(l,(e=>{const i=jo(t.callbacks,e);s.push(i.labelColor.call(this,e)),n.push(i.labelPointStyle.call(this,e)),o.push(i.labelTextColor.call(this,e))})),this.labelColors=s,this.labelPointStyles=n,this.labelTextColors=o,this.dataPoints=l,l}update(t,e){const i=this.options.setContext(this.getContext()),s=this._active;let n,o=[];if(s.length){const t=Ro[i.position].call(this,s,this._eventPosition);o=this._createItems(i),this.title=this.getTitle(o,i),this.beforeBody=this.getBeforeBody(o,i),this.body=this.getBody(o,i),this.afterBody=this.getAfterBody(o,i),this.footer=this.getFooter(o,i);const e=this._size=Fo(this,i),a=Object.assign({},t,e),r=Vo(this.chart,i,a),l=Wo(i,a,r,this.chart);this.xAlign=r.xAlign,this.yAlign=r.yAlign,n={opacity:1,x:l.x,y:l.y,width:e.width,height:e.height,caretX:t.x,caretY:t.y}}else 0!==this.opacity&&(n={opacity:0});this._tooltipItems=o,this.$context=void 0,n&&this._resolveAnimations().update(this,n),t&&i.external&&i.external.call(this,{chart:this.chart,tooltip:this,replay:e})}drawCaret(t,e,i,s){const n=this.getCaretPosition(t,i,s);e.lineTo(n.x1,n.y1),e.lineTo(n.x2,n.y2),e.lineTo(n.x3,n.y3)}getCaretPosition(t,e,i){const{xAlign:s,yAlign:n}=this,{caretSize:o,cornerRadius:a}=i,{topLeft:r,topRight:l,bottomLeft:h,bottomRight:c}=We(a),{x:d,y:u}=t,{width:f,height:g}=e;let p,m,x,b,_,y;return"center"===n?(_=u+g/2,"left"===s?(p=d,m=p-o,b=_+o,y=_-o):(p=d+f,m=p+o,b=_-o,y=_+o),x=p):(m="left"===s?d+Math.max(r,h)+o:"right"===s?d+f-Math.max(l,c)-o:this.caretX,"top"===n?(b=u,_=b-o,p=m-o,x=m+o):(b=u+g,_=b+o,p=m+o,x=m-o),y=b),{x1:p,x2:m,x3:x,y1:b,y2:_,y3:y}}drawTitle(t,e,i){const s=this.title,n=s.length;let o,a,r;if(n){const l=Ei(i.rtl,this.x,this.width);for(t.x=No(this,i.titleAlign,i),e.textAlign=l.textAlign(i.titleAlign),e.textBaseline="middle",o=He(i.titleFont),a=i.titleSpacing,e.fillStyle=i.titleColor,e.font=o.string,r=0;r<n;++r)e.fillText(s[r],l.x(t.x),t.y+o.lineHeight/2),t.y+=o.lineHeight+a,r+1===n&&(t.y+=i.titleMarginBottom-a)}}_drawColorBox(t,e,i,s,n){const o=this.labelColors[i],a=this.labelPointStyles[i],{boxHeight:r,boxWidth:l,boxPadding:h}=n,c=He(n.bodyFont),d=No(this,"left",n),u=s.x(d),f=r<c.lineHeight?(c.lineHeight-r)/2:0,g=e.y+f;if(n.usePointStyle){const e={radius:Math.min(l,r)/2,pointStyle:a.pointStyle,rotation:a.rotation,borderWidth:1},i=s.leftForLtr(u,l)+l/2,h=g+r/2;t.strokeStyle=n.multiKeyBackground,t.fillStyle=n.multiKeyBackground,Zt(t,e,i,h),t.strokeStyle=o.borderColor,t.fillStyle=o.backgroundColor,Zt(t,e,i,h)}else{t.lineWidth=o.borderWidth||1,t.strokeStyle=o.borderColor,t.setLineDash(o.borderDash||[]),t.lineDashOffset=o.borderDashOffset||0;const e=s.leftForLtr(u,l-h),i=s.leftForLtr(s.xPlus(u,1),l-h-2),a=We(o.borderRadius);Object.values(a).some((t=>0!==t))?(t.beginPath(),t.fillStyle=n.multiKeyBackground,oe(t,{x:e,y:g,w:l,h:r,radius:a}),t.fill(),t.stroke(),t.fillStyle=o.backgroundColor,t.beginPath(),oe(t,{x:i,y:g+1,w:l-2,h:r-2,radius:a}),t.fill()):(t.fillStyle=n.multiKeyBackground,t.fillRect(e,g,l,r),t.strokeRect(e,g,l,r),t.fillStyle=o.backgroundColor,t.fillRect(i,g+1,l-2,r-2))}t.fillStyle=this.labelTextColors[i]}drawBody(t,e,i){const{body:s}=this,{bodySpacing:n,bodyAlign:o,displayColors:a,boxHeight:r,boxWidth:l,boxPadding:h}=i,c=He(i.bodyFont);let d=c.lineHeight,u=0;const f=Ei(i.rtl,this.x,this.width),g=function(i){e.fillText(i,f.x(t.x+u),t.y+d/2),t.y+=d+n},p=f.textAlign(o);let m,x,b,_,y,v,w;for(e.textAlign=o,e.textBaseline="middle",e.font=c.string,t.x=No(this,p,i),e.fillStyle=i.bodyColor,Q(this.beforeBody,g),u=a&&"right"!==p?"center"===o?l/2+h:l+2+h:0,_=0,v=s.length;_<v;++_){for(m=s[_],x=this.labelTextColors[_],e.fillStyle=x,Q(m.before,g),b=m.lines,a&&b.length&&(this._drawColorBox(e,t,_,f,i),d=Math.max(c.lineHeight,r)),y=0,w=b.length;y<w;++y)g(b[y]),d=c.lineHeight;Q(m.after,g)}u=0,d=c.lineHeight,Q(this.afterBody,g),t.y-=n}drawFooter(t,e,i){const s=this.footer,n=s.length;let o,a;if(n){const r=Ei(i.rtl,this.x,this.width);for(t.x=No(this,i.footerAlign,i),t.y+=i.footerMarginTop,e.textAlign=r.textAlign(i.footerAlign),e.textBaseline="middle",o=He(i.footerFont),e.fillStyle=i.footerColor,e.font=o.string,a=0;a<n;++a)e.fillText(s[a],r.x(t.x),t.y+o.lineHeight/2),t.y+=o.lineHeight+i.footerSpacing}}drawBackground(t,e,i,s){const{xAlign:n,yAlign:o}=this,{x:a,y:r}=t,{width:l,height:h}=i,{topLeft:c,topRight:d,bottomLeft:u,bottomRight:f}=We(s.cornerRadius);e.fillStyle=s.backgroundColor,e.strokeStyle=s.borderColor,e.lineWidth=s.borderWidth,e.beginPath(),e.moveTo(a+c,r),"top"===o&&this.drawCaret(t,e,i,s),e.lineTo(a+l-d,r),e.quadraticCurveTo(a+l,r,a+l,r+d),"center"===o&&"right"===n&&this.drawCaret(t,e,i,s),e.lineTo(a+l,r+h-f),e.quadraticCurveTo(a+l,r+h,a+l-f,r+h),"bottom"===o&&this.drawCaret(t,e,i,s),e.lineTo(a+u,r+h),e.quadraticCurveTo(a,r+h,a,r+h-u),"center"===o&&"left"===n&&this.drawCaret(t,e,i,s),e.lineTo(a,r+c),e.quadraticCurveTo(a,r,a+c,r),e.closePath(),e.fill(),s.borderWidth>0&&e.stroke()}_updateAnimationTarget(t){const e=this.chart,i=this.$animations,s=i&&i.x,n=i&&i.y;if(s||n){const i=Ro[t.position].call(this,this._active,this._eventPosition);if(!i)return;const o=this._size=Fo(this,t),a=Object.assign({},i,this._size),r=Vo(e,t,a),l=Wo(t,a,r,e);s._to===l.x&&n._to===l.y||(this.xAlign=r.xAlign,this.yAlign=r.yAlign,this.width=o.width,this.height=o.height,this.caretX=i.x,this.caretY=i.y,this._resolveAnimations().update(this,l))}}draw(t){const e=this.options.setContext(this.getContext());let i=this.opacity;if(!i)return;this._updateAnimationTarget(e);const s={width:this.width,height:this.height},n={x:this.x,y:this.y};i=Math.abs(i)<.001?0:i;const o=Ne(e.padding),a=this.title.length||this.beforeBody.length||this.body.length||this.afterBody.length||this.footer.length;e.enabled&&a&&(t.save(),t.globalAlpha=i,this.drawBackground(n,t,s,e),Ii(t,e.textDirection),n.y+=o.top,this.drawTitle(n,t,e),this.drawBody(n,t,e),this.drawFooter(n,t,e),zi(t,e.textDirection),t.restore())}getActiveElements(){return this._active||[]}setActiveElements(t,e){const i=this._active,s=t.map((({datasetIndex:t,index:e})=>{const i=this.chart.getDatasetMeta(t);if(!i)throw new Error("Cannot find a dataset at index "+t);return{datasetIndex:t,element:i.data[e],index:e}})),n=!tt(i,s),o=this._positionChanged(s,e);(n||o)&&(this._active=s,this._eventPosition=e,this._ignoreReplayEvents=!0,this.update(!0))}handleEvent(t,e,i=!0){if(e&&this._ignoreReplayEvents)return!1;this._ignoreReplayEvents=!1;const s=this.options,n=this._active||[],o=this._getActiveElements(t,n,e,i),a=this._positionChanged(o,t),r=e||!tt(o,n)||a;return r&&(this._active=o,(s.enabled||s.external)&&(this._eventPosition={x:t.x,y:t.y},this.update(!0,e))),r}_getActiveElements(t,e,i,s){const n=this.options;if("mouseout"===t.type)return[];if(!s)return e;const o=this.chart.getElementsAtEventForMode(t,n.mode,n,i);return n.reverse&&o.reverse(),o}_positionChanged(t,e){const{caretX:i,caretY:s,options:n}=this,o=Ro[n.position].call(this,t,e);return!1!==o&&(i!==o.x||s!==o.y)}}$o.positioners=Ro;var Yo={id:"tooltip",_element:$o,positioners:Ro,afterInit(t,e,i){i&&(t.tooltip=new $o({chart:t,options:i}))},beforeUpdate(t,e,i){t.tooltip&&t.tooltip.initialize(i)},reset(t,e,i){t.tooltip&&t.tooltip.initialize(i)},afterDraw(t){const e=t.tooltip,i={tooltip:e};!1!==t.notifyPlugins("beforeTooltipDraw",i)&&(e&&e.draw(t.ctx),t.notifyPlugins("afterTooltipDraw",i))},afterEvent(t,e){if(t.tooltip){const i=e.replay;t.tooltip.handleEvent(e.event,i,e.inChartArea)&&(e.changed=!0)}},defaults:{enabled:!0,external:null,position:"average",backgroundColor:"rgba(0,0,0,0.8)",titleColor:"#fff",titleFont:{weight:"bold"},titleSpacing:2,titleMarginBottom:6,titleAlign:"left",bodyColor:"#fff",bodySpacing:2,bodyFont:{},bodyAlign:"left",footerColor:"#fff",footerSpacing:2,footerMarginTop:6,footerFont:{weight:"bold"},footerAlign:"left",padding:6,caretPadding:2,caretSize:5,cornerRadius:6,boxHeight:(t,e)=>e.bodyFont.size,boxWidth:(t,e)=>e.bodyFont.size,multiKeyBackground:"#fff",displayColors:!0,boxPadding:0,borderColor:"rgba(0,0,0,0)",borderWidth:0,animation:{duration:400,easing:"easeOutQuart"},animations:{numbers:{type:"number",properties:["x","y","width","height","caretX","caretY"]},opacity:{easing:"linear",duration:200}},callbacks:{beforeTitle:H,title(t){if(t.length>0){const e=t[0],i=e.chart.data.labels,s=i?i.length:0;if(this&&this.options&&"dataset"===this.options.mode)return e.dataset.label||"";if(e.label)return e.label;if(s>0&&e.dataIndex<s)return i[e.dataIndex]}return""},afterTitle:H,beforeBody:H,beforeLabel:H,label(t){if(this&&this.options&&"dataset"===this.options.mode)return t.label+": "+t.formattedValue||t.formattedValue;let e=t.dataset.label||"";e&&(e+=": ");const i=t.formattedValue;return $(i)||(e+=i),e},labelColor(t){const e=t.chart.getDatasetMeta(t.datasetIndex).controller.getStyle(t.dataIndex);return{borderColor:e.borderColor,backgroundColor:e.backgroundColor,borderWidth:e.borderWidth,borderDash:e.borderDash,borderDashOffset:e.borderDashOffset,borderRadius:0}},labelTextColor(){return this.options.bodyColor},labelPointStyle(t){const e=t.chart.getDatasetMeta(t.datasetIndex).controller.getStyle(t.dataIndex);return{pointStyle:e.pointStyle,rotation:e.rotation}},afterLabel:H,afterBody:H,beforeFooter:H,footer:H,afterFooter:H}},defaultRoutes:{bodyFont:"font",footerFont:"font",titleFont:"font"},descriptors:{_scriptable:t=>"filter"!==t&&"itemSort"!==t&&"external"!==t,_indexable:!1,callbacks:{_scriptable:!1,_indexable:!1},animation:{_fallback:!1},animations:{_fallback:"animation"}},additionalOptionScopes:["interaction"]},Uo=Object.freeze({__proto__:null,Decimation:ro,Filler:So,Legend:Co,SubTitle:Lo,Title:Ao,Tooltip:Yo});function Xo(t,e,i,s){const n=t.indexOf(e);if(-1===n)return((t,e,i,s)=>("string"==typeof e?(i=t.push(e)-1,s.unshift({index:i,label:e})):isNaN(e)&&(i=null),i))(t,e,i,s);return n!==t.lastIndexOf(e)?i:n}class qo extends Bs{constructor(t){super(t),this._startValue=void 0,this._valueRange=0,this._addedLabels=[]}init(t){const e=this._addedLabels;if(e.length){const t=this.getLabels();for(const{index:i,label:s}of e)t[i]===s&&t.splice(i,1);this._addedLabels=[]}super.init(t)}parse(t,e){if($(t))return null;const i=this.getLabels();return((t,e)=>null===t?null:jt(Math.round(t),0,e))(e=isFinite(e)&&i[e]===t?e:Xo(i,t,K(e,t),this._addedLabels),i.length-1)}determineDataLimits(){const{minDefined:t,maxDefined:e}=this.getUserBounds();let{min:i,max:s}=this.getMinMax(!0);"ticks"===this.options.bounds&&(t||(i=0),e||(s=this.getLabels().length-1)),this.min=i,this.max=s}buildTicks(){const t=this.min,e=this.max,i=this.options.offset,s=[];let n=this.getLabels();n=0===t&&e===n.length-1?n:n.slice(t,e+1),this._valueRange=Math.max(n.length-(i?0:1),1),this._startValue=this.min-(i?.5:0);for(let i=t;i<=e;i++)s.push({value:i});return s}getLabelForValue(t){const e=this.getLabels();return t>=0&&t<e.length?e[t]:t}configure(){super.configure(),this.isHorizontal()||(this._reversePixels=!this._reversePixels)}getPixelForValue(t){return"number"!=typeof t&&(t=this.parse(t)),null===t?NaN:this.getPixelForDecimal((t-this._startValue)/this._valueRange)}getPixelForTick(t){const e=this.ticks;return t<0||t>e.length-1?null:this.getPixelForValue(e[t].value)}getValueForPixel(t){return Math.round(this._startValue+this.getDecimalForPixel(t)*this._valueRange)}getBasePixel(){return this.bottom}}function Ko(t,e,{horizontal:i,minRotation:s}){const n=It(s),o=(i?Math.sin(n):Math.cos(n))||.001,a=.75*e*(""+t).length;return Math.min(e/o,a)}qo.id="category",qo.defaults={ticks:{callback:qo.prototype.getLabelForValue}};class Go extends Bs{constructor(t){super(t),this.start=void 0,this.end=void 0,this._startValue=void 0,this._endValue=void 0,this._valueRange=0}parse(t,e){return $(t)||("number"==typeof t||t instanceof Number)&&!isFinite(+t)?null:+t}handleTickRangeOptions(){const{beginAtZero:t}=this.options,{minDefined:e,maxDefined:i}=this.getUserBounds();let{min:s,max:n}=this;const o=t=>s=e?s:t,a=t=>n=i?n:t;if(t){const t=Ct(s),e=Ct(n);t<0&&e<0?a(0):t>0&&e>0&&o(0)}if(s===n){let e=1;(n>=Number.MAX_SAFE_INTEGER||s<=Number.MIN_SAFE_INTEGER)&&(e=Math.abs(.05*n)),a(n+e),t||o(s-e)}this.min=s,this.max=n}getTickLimit(){const t=this.options.ticks;let e,{maxTicksLimit:i,stepSize:s}=t;return s?(e=Math.ceil(this.max/s)-Math.floor(this.min/s)+1,e>1e3&&(console.warn(`scales.${this.id}.ticks.stepSize: ${s} would result generating up to ${e} ticks. Limiting to 1000.`),e=1e3)):(e=this.computeTickLimit(),i=i||11),i&&(e=Math.min(i,e)),e}computeTickLimit(){return Number.POSITIVE_INFINITY}buildTicks(){const t=this.options,e=t.ticks;let i=this.getTickLimit();i=Math.max(2,i);const s=function(t,e){const i=[],{bounds:s,step:n,min:o,max:a,precision:r,count:l,maxTicks:h,maxDigits:c,includeBounds:d}=t,u=n||1,f=h-1,{min:g,max:p}=e,m=!$(o),x=!$(a),b=!$(l),_=(p-g)/(c+1);let y,v,w,M,k=Ot((p-g)/f/u)*u;if(k<1e-14&&!m&&!x)return[{value:g},{value:p}];M=Math.ceil(p/k)-Math.floor(g/k),M>f&&(k=Ot(M*k/f/u)*u),$(r)||(y=Math.pow(10,r),k=Math.ceil(k*y)/y),"ticks"===s?(v=Math.floor(g/k)*k,w=Math.ceil(p/k)*k):(v=g,w=p),m&&x&&n&&Rt((a-o)/n,k/1e3)?(M=Math.round(Math.min((a-o)/k,h)),k=(a-o)/M,v=o,w=a):b?(v=m?o:v,w=x?a:w,M=l-1,k=(w-v)/M):(M=(w-v)/k,M=Lt(M,Math.round(M),k/1e3)?Math.round(M):Math.ceil(M));const S=Math.max(Ft(k),Ft(v));y=Math.pow(10,$(r)?S:r),v=Math.round(v*y)/y,w=Math.round(w*y)/y;let P=0;for(m&&(d&&v!==o?(i.push({value:o}),v<o&&P++,Lt(Math.round((v+P*k)*y)/y,o,Ko(o,_,t))&&P++):v<o&&P++);P<M;++P)i.push({value:Math.round((v+P*k)*y)/y});return x&&d&&w!==a?i.length&&Lt(i[i.length-1].value,a,Ko(a,_,t))?i[i.length-1].value=a:i.push({value:a}):x&&w!==a||i.push({value:w}),i}({maxTicks:i,bounds:t.bounds,min:t.min,max:t.max,precision:e.precision,step:e.stepSize,count:e.count,maxDigits:this._maxDigits(),horizontal:this.isHorizontal(),minRotation:e.minRotation||0,includeBounds:!1!==e.includeBounds},this._range||this);return"ticks"===t.bounds&&Et(s,this,"value"),t.reverse?(s.reverse(),this.start=this.max,this.end=this.min):(this.start=this.min,this.end=this.max),s}configure(){const t=this.ticks;let e=this.min,i=this.max;if(super.configure(),this.options.offset&&t.length){const s=(i-e)/Math.max(t.length-1,1)/2;e-=s,i+=s}this._startValue=e,this._endValue=i,this._valueRange=i-e}getLabelForValue(t){return Ri(t,this.chart.options.locale,this.options.ticks.format)}}class Zo extends Go{determineDataLimits(){const{min:t,max:e}=this.getMinMax(!0);this.min=X(t)?t:0,this.max=X(e)?e:1,this.handleTickRangeOptions()}computeTickLimit(){const t=this.isHorizontal(),e=t?this.width:this.height,i=It(this.options.ticks.minRotation),s=(t?Math.sin(i):Math.cos(i))||.001,n=this._resolveTickFontOptions(0);return Math.ceil(e/Math.min(40,n.lineHeight/s))}getPixelForValue(t){return null===t?NaN:this.getPixelForDecimal((t-this._startValue)/this._valueRange)}getValueForPixel(t){return this._startValue+this.getDecimalForPixel(t)*this._valueRange}}function Jo(t){return 1===t/Math.pow(10,Math.floor(Dt(t)))}Zo.id="linear",Zo.defaults={ticks:{callback:Os.formatters.numeric}};class Qo extends Bs{constructor(t){super(t),this.start=void 0,this.end=void 0,this._startValue=void 0,this._valueRange=0}parse(t,e){const i=Go.prototype.parse.apply(this,[t,e]);if(0!==i)return X(i)&&i>0?i:null;this._zero=!0}determineDataLimits(){const{min:t,max:e}=this.getMinMax(!0);this.min=X(t)?Math.max(0,t):null,this.max=X(e)?Math.max(0,e):null,this.options.beginAtZero&&(this._zero=!0),this.handleTickRangeOptions()}handleTickRangeOptions(){const{minDefined:t,maxDefined:e}=this.getUserBounds();let i=this.min,s=this.max;const n=e=>i=t?i:e,o=t=>s=e?s:t,a=(t,e)=>Math.pow(10,Math.floor(Dt(t))+e);i===s&&(i<=0?(n(1),o(10)):(n(a(i,-1)),o(a(s,1)))),i<=0&&n(a(s,-1)),s<=0&&o(a(i,1)),this._zero&&this.min!==this._suggestedMin&&i===a(this.min,0)&&n(a(i,-1)),this.min=i,this.max=s}buildTicks(){const t=this.options,e=function(t,e){const i=Math.floor(Dt(e.max)),s=Math.ceil(e.max/Math.pow(10,i)),n=[];let o=q(t.min,Math.pow(10,Math.floor(Dt(e.min)))),a=Math.floor(Dt(o)),r=Math.floor(o/Math.pow(10,a)),l=a<0?Math.pow(10,Math.abs(a)):1;do{n.push({value:o,major:Jo(o)}),++r,10===r&&(r=1,++a,l=a>=0?1:l),o=Math.round(r*Math.pow(10,a)*l)/l}while(a<i||a===i&&r<s);const h=q(t.max,o);return n.push({value:h,major:Jo(o)}),n}({min:this._userMin,max:this._userMax},this);return"ticks"===t.bounds&&Et(e,this,"value"),t.reverse?(e.reverse(),this.start=this.max,this.end=this.min):(this.start=this.min,this.end=this.max),e}getLabelForValue(t){return void 0===t?"0":Ri(t,this.chart.options.locale,this.options.ticks.format)}configure(){const t=this.min;super.configure(),this._startValue=Dt(t),this._valueRange=Dt(this.max)-Dt(t)}getPixelForValue(t){return void 0!==t&&0!==t||(t=this.min),null===t||isNaN(t)?NaN:this.getPixelForDecimal(t===this.min?0:(Dt(t)-this._startValue)/this._valueRange)}getValueForPixel(t){const e=this.getDecimalForPixel(t);return Math.pow(10,this._startValue+e*this._valueRange)}}function ta(t){const e=t.ticks;if(e.display&&t.display){const t=Ne(e.backdropPadding);return K(e.font&&e.font.size,bt.font.size)+t.height}return 0}function ea(t,e,i,s,n){return t===s||t===n?{start:e-i/2,end:e+i/2}:t<s||t>n?{start:e-i,end:e}:{start:e,end:e+i}}function ia(t){const e={l:t.left+t._padding.left,r:t.right-t._padding.right,t:t.top+t._padding.top,b:t.bottom-t._padding.bottom},i=Object.assign({},e),s=[],n=[],o=t._pointLabels.length,a=t.options.pointLabels,r=a.centerPointLabels?_t/o:0;for(let d=0;d<o;d++){const o=a.setContext(t.getPointLabelContext(d));n[d]=o.padding;const u=t.getPointPosition(d,t.drawingArea+n[d],r),f=He(o.font),g=(l=t.ctx,h=f,c=Y(c=t._pointLabels[d])?c:[c],{w:qt(l,h.string,c),h:c.length*h.lineHeight});s[d]=g;const p=Nt(t.getIndexAngle(d)+r),m=Math.round(zt(p));sa(i,e,p,ea(m,u.x,g.w,0,180),ea(m,u.y,g.h,90,270))}var l,h,c;t.setCenterPoint(e.l-i.l,i.r-e.r,e.t-i.t,i.b-e.b),t._pointLabelItems=function(t,e,i){const s=[],n=t._pointLabels.length,o=t.options,a=ta(o)/2,r=t.drawingArea,l=o.pointLabels.centerPointLabels?_t/n:0;for(let o=0;o<n;o++){const n=t.getPointPosition(o,r+a+i[o],l),h=Math.round(zt(Nt(n.angle+kt))),c=e[o],d=aa(n.y,c.h,h),u=na(h),f=oa(n.x,c.w,u);s.push({x:n.x,y:d,textAlign:u,left:f,top:d,right:f+c.w,bottom:d+c.h})}return s}(t,s,n)}function sa(t,e,i,s,n){const o=Math.abs(Math.sin(i)),a=Math.abs(Math.cos(i));let r=0,l=0;s.start<e.l?(r=(e.l-s.start)/o,t.l=Math.min(t.l,e.l-r)):s.end>e.r&&(r=(s.end-e.r)/o,t.r=Math.max(t.r,e.r+r)),n.start<e.t?(l=(e.t-n.start)/a,t.t=Math.min(t.t,e.t-l)):n.end>e.b&&(l=(n.end-e.b)/a,t.b=Math.max(t.b,e.b+l))}function na(t){return 0===t||180===t?"center":t<180?"left":"right"}function oa(t,e,i){return"right"===i?t-=e:"center"===i&&(t-=e/2),t}function aa(t,e,i){return 90===i||270===i?t-=e/2:(i>270||i<90)&&(t-=e),t}function ra(t,e,i,s){const{ctx:n}=t;if(i)n.arc(t.xCenter,t.yCenter,e,0,yt);else{let i=t.getPointPosition(0,e);n.moveTo(i.x,i.y);for(let o=1;o<s;o++)i=t.getPointPosition(o,e),n.lineTo(i.x,i.y)}}Qo.id="logarithmic",Qo.defaults={ticks:{callback:Os.formatters.logarithmic,major:{enabled:!0}}};class la extends Go{constructor(t){super(t),this.xCenter=void 0,this.yCenter=void 0,this.drawingArea=void 0,this._pointLabels=[],this._pointLabelItems=[]}setDimensions(){const t=this._padding=Ne(ta(this.options)/2),e=this.width=this.maxWidth-t.width,i=this.height=this.maxHeight-t.height;this.xCenter=Math.floor(this.left+e/2+t.left),this.yCenter=Math.floor(this.top+i/2+t.top),this.drawingArea=Math.floor(Math.min(e,i)/2)}determineDataLimits(){const{min:t,max:e}=this.getMinMax(!1);this.min=X(t)&&!isNaN(t)?t:0,this.max=X(e)&&!isNaN(e)?e:0,this.handleTickRangeOptions()}computeTickLimit(){return Math.ceil(this.drawingArea/ta(this.options))}generateTickLabels(t){Go.prototype.generateTickLabels.call(this,t),this._pointLabels=this.getLabels().map(((t,e)=>{const i=J(this.options.pointLabels.callback,[t,e],this);return i||0===i?i:""})).filter(((t,e)=>this.chart.getDataVisibility(e)))}fit(){const t=this.options;t.display&&t.pointLabels.display?ia(this):this.setCenterPoint(0,0,0,0)}setCenterPoint(t,e,i,s){this.xCenter+=Math.floor((t-e)/2),this.yCenter+=Math.floor((i-s)/2),this.drawingArea-=Math.min(this.drawingArea/2,Math.max(t,e,i,s))}getIndexAngle(t){return Nt(t*(yt/(this._pointLabels.length||1))+It(this.options.startAngle||0))}getDistanceFromCenterForValue(t){if($(t))return NaN;const e=this.drawingArea/(this.max-this.min);return this.options.reverse?(this.max-t)*e:(t-this.min)*e}getValueForDistanceFromCenter(t){if($(t))return NaN;const e=t/(this.drawingArea/(this.max-this.min));return this.options.reverse?this.max-e:this.min+e}getPointLabelContext(t){const e=this._pointLabels||[];if(t>=0&&t<e.length){const i=e[t];return function(t,e,i){return Ye(t,{label:i,index:e,type:"pointLabel"})}(this.getContext(),t,i)}}getPointPosition(t,e,i=0){const s=this.getIndexAngle(t)-kt+i;return{x:Math.cos(s)*e+this.xCenter,y:Math.sin(s)*e+this.yCenter,angle:s}}getPointPositionForValue(t,e){return this.getPointPosition(t,this.getDistanceFromCenterForValue(e))}getBasePosition(t){return this.getPointPositionForValue(t||0,this.getBaseValue())}getPointLabelPosition(t){const{left:e,top:i,right:s,bottom:n}=this._pointLabelItems[t];return{left:e,top:i,right:s,bottom:n}}drawBackground(){const{backgroundColor:t,grid:{circular:e}}=this.options;if(t){const i=this.ctx;i.save(),i.beginPath(),ra(this,this.getDistanceFromCenterForValue(this._endValue),e,this._pointLabels.length),i.closePath(),i.fillStyle=t,i.fill(),i.restore()}}drawGrid(){const t=this.ctx,e=this.options,{angleLines:i,grid:s}=e,n=this._pointLabels.length;let o,a,r;if(e.pointLabels.display&&function(t,e){const{ctx:i,options:{pointLabels:s}}=t;for(let n=e-1;n>=0;n--){const e=s.setContext(t.getPointLabelContext(n)),o=He(e.font),{x:a,y:r,textAlign:l,left:h,top:c,right:d,bottom:u}=t._pointLabelItems[n],{backdropColor:f}=e;if(!$(f)){const t=Ne(e.backdropPadding);i.fillStyle=f,i.fillRect(h-t.left,c-t.top,d-h+t.width,u-c+t.height)}se(i,t._pointLabels[n],a,r+o.lineHeight/2,o,{color:e.color,textAlign:l,textBaseline:"middle"})}}(this,n),s.display&&this.ticks.forEach(((t,e)=>{if(0!==e){a=this.getDistanceFromCenterForValue(t.value);!function(t,e,i,s){const n=t.ctx,o=e.circular,{color:a,lineWidth:r}=e;!o&&!s||!a||!r||i<0||(n.save(),n.strokeStyle=a,n.lineWidth=r,n.setLineDash(e.borderDash),n.lineDashOffset=e.borderDashOffset,n.beginPath(),ra(t,i,o,s),n.closePath(),n.stroke(),n.restore())}(this,s.setContext(this.getContext(e-1)),a,n)}})),i.display){for(t.save(),o=n-1;o>=0;o--){const s=i.setContext(this.getPointLabelContext(o)),{color:n,lineWidth:l}=s;l&&n&&(t.lineWidth=l,t.strokeStyle=n,t.setLineDash(s.borderDash),t.lineDashOffset=s.borderDashOffset,a=this.getDistanceFromCenterForValue(e.ticks.reverse?this.min:this.max),r=this.getPointPosition(o,a),t.beginPath(),t.moveTo(this.xCenter,this.yCenter),t.lineTo(r.x,r.y),t.stroke())}t.restore()}}drawBorder(){}drawLabels(){const t=this.ctx,e=this.options,i=e.ticks;if(!i.display)return;const s=this.getIndexAngle(0);let n,o;t.save(),t.translate(this.xCenter,this.yCenter),t.rotate(s),t.textAlign="center",t.textBaseline="middle",this.ticks.forEach(((s,a)=>{if(0===a&&!e.reverse)return;const r=i.setContext(this.getContext(a)),l=He(r.font);if(n=this.getDistanceFromCenterForValue(this.ticks[a].value),r.showLabelBackdrop){t.font=l.string,o=t.measureText(s.label).width,t.fillStyle=r.backdropColor;const e=Ne(r.backdropPadding);t.fillRect(-o/2-e.left,-n-l.size/2-e.top,o+e.width,l.size+e.height)}se(t,s.label,0,-n,l,{color:r.color})})),t.restore()}drawTitle(){}}la.id="radialLinear",la.defaults={display:!0,animate:!0,position:"chartArea",angleLines:{display:!0,lineWidth:1,borderDash:[],borderDashOffset:0},grid:{circular:!1},startAngle:0,ticks:{showLabelBackdrop:!0,callback:Os.formatters.numeric},pointLabels:{backdropColor:void 0,backdropPadding:2,display:!0,font:{size:10},callback:t=>t,padding:5,centerPointLabels:!1}},la.defaultRoutes={"angleLines.color":"borderColor","pointLabels.color":"color","ticks.color":"color"},la.descriptors={angleLines:{_fallback:"grid"}};const ha={millisecond:{common:!0,size:1,steps:1e3},second:{common:!0,size:1e3,steps:60},minute:{common:!0,size:6e4,steps:60},hour:{common:!0,size:36e5,steps:24},day:{common:!0,size:864e5,steps:30},week:{common:!1,size:6048e5,steps:4},month:{common:!0,size:2628e6,steps:12},quarter:{common:!1,size:7884e6,steps:4},year:{common:!0,size:3154e7}},ca=Object.keys(ha);function da(t,e){return t-e}function ua(t,e){if($(e))return null;const i=t._adapter,{parser:s,round:n,isoWeekday:o}=t._parseOpts;let a=e;return"function"==typeof s&&(a=s(a)),X(a)||(a="string"==typeof s?i.parse(a,s):i.parse(a)),null===a?null:(n&&(a="week"!==n||!Tt(o)&&!0!==o?i.startOf(a,n):i.startOf(a,"isoWeek",o)),+a)}function fa(t,e,i,s){const n=ca.length;for(let o=ca.indexOf(t);o<n-1;++o){const t=ha[ca[o]],n=t.steps?t.steps:Number.MAX_SAFE_INTEGER;if(t.common&&Math.ceil((i-e)/(n*t.size))<=s)return ca[o]}return ca[n-1]}function ga(t,e,i){if(i){if(i.length){const{lo:s,hi:n}=ae(i,e);t[i[s]>=e?i[s]:i[n]]=!0}}else t[e]=!0}function pa(t,e,i){const s=[],n={},o=e.length;let a,r;for(a=0;a<o;++a)r=e[a],n[r]=a,s.push({value:r,major:!1});return 0!==o&&i?function(t,e,i,s){const n=t._adapter,o=+n.startOf(e[0].value,s),a=e[e.length-1].value;let r,l;for(r=o;r<=a;r=+n.add(r,1,s))l=i[r],l>=0&&(e[l].major=!0);return e}(t,s,n,i):s}class ma extends Bs{constructor(t){super(t),this._cache={data:[],labels:[],all:[]},this._unit="day",this._majorUnit=void 0,this._offsets={},this._normalized=!1,this._parseOpts=void 0}init(t,e){const i=t.time||(t.time={}),s=this._adapter=new mn._date(t.adapters.date);ot(i.displayFormats,s.formats()),this._parseOpts={parser:i.parser,round:i.round,isoWeekday:i.isoWeekday},super.init(t),this._normalized=e.normalized}parse(t,e){return void 0===t?null:ua(this,t)}beforeLayout(){super.beforeLayout(),this._cache={data:[],labels:[],all:[]}}determineDataLimits(){const t=this.options,e=this._adapter,i=t.time.unit||"day";let{min:s,max:n,minDefined:o,maxDefined:a}=this.getUserBounds();function r(t){o||isNaN(t.min)||(s=Math.min(s,t.min)),a||isNaN(t.max)||(n=Math.max(n,t.max))}o&&a||(r(this._getLabelBounds()),"ticks"===t.bounds&&"labels"===t.ticks.source||r(this.getMinMax(!1))),s=X(s)&&!isNaN(s)?s:+e.startOf(Date.now(),i),n=X(n)&&!isNaN(n)?n:+e.endOf(Date.now(),i)+1,this.min=Math.min(s,n-1),this.max=Math.max(s+1,n)}_getLabelBounds(){const t=this.getLabelTimestamps();let e=Number.POSITIVE_INFINITY,i=Number.NEGATIVE_INFINITY;return t.length&&(e=t[0],i=t[t.length-1]),{min:e,max:i}}buildTicks(){const t=this.options,e=t.time,i=t.ticks,s="labels"===i.source?this.getLabelTimestamps():this._generate();"ticks"===t.bounds&&s.length&&(this.min=this._userMin||s[0],this.max=this._userMax||s[s.length-1]);const n=this.min,o=he(s,n,this.max);return this._unit=e.unit||(i.autoSkip?fa(e.minUnit,this.min,this.max,this._getLabelCapacity(n)):function(t,e,i,s,n){for(let o=ca.length-1;o>=ca.indexOf(i);o--){const i=ca[o];if(ha[i].common&&t._adapter.diff(n,s,i)>=e-1)return i}return ca[i?ca.indexOf(i):0]}(this,o.length,e.minUnit,this.min,this.max)),this._majorUnit=i.major.enabled&&"year"!==this._unit?function(t){for(let e=ca.indexOf(t)+1,i=ca.length;e<i;++e)if(ha[ca[e]].common)return ca[e]}(this._unit):void 0,this.initOffsets(s),t.reverse&&o.reverse(),pa(this,o,this._majorUnit)}initOffsets(t){let e,i,s=0,n=0;this.options.offset&&t.length&&(e=this.getDecimalForValue(t[0]),s=1===t.length?1-e:(this.getDecimalForValue(t[1])-e)/2,i=this.getDecimalForValue(t[t.length-1]),n=1===t.length?i:(i-this.getDecimalForValue(t[t.length-2]))/2);const o=t.length<3?.5:.25;s=jt(s,0,o),n=jt(n,0,o),this._offsets={start:s,end:n,factor:1/(s+1+n)}}_generate(){const t=this._adapter,e=this.min,i=this.max,s=this.options,n=s.time,o=n.unit||fa(n.minUnit,e,i,this._getLabelCapacity(e)),a=K(n.stepSize,1),r="week"===o&&n.isoWeekday,l=Tt(r)||!0===r,h={};let c,d,u=e;if(l&&(u=+t.startOf(u,"isoWeek",r)),u=+t.startOf(u,l?"day":o),t.diff(i,e,o)>1e5*a)throw new Error(e+" and "+i+" are too far apart with stepSize of "+a+" "+o);const f="data"===s.ticks.source&&this.getDataTimestamps();for(c=u,d=0;c<i;c=+t.add(c,a,o),d++)ga(h,c,f);return c!==i&&"ticks"!==s.bounds&&1!==d||ga(h,c,f),Object.keys(h).sort(((t,e)=>t-e)).map((t=>+t))}getLabelForValue(t){const e=this._adapter,i=this.options.time;return i.tooltipFormat?e.format(t,i.tooltipFormat):e.format(t,i.displayFormats.datetime)}_tickFormatFunction(t,e,i,s){const n=this.options,o=n.time.displayFormats,a=this._unit,r=this._majorUnit,l=a&&o[a],h=r&&o[r],c=i[e],d=r&&h&&c&&c.major,u=this._adapter.format(t,s||(d?h:l)),f=n.ticks.callback;return f?J(f,[u,e,i],this):u}generateTickLabels(t){let e,i,s;for(e=0,i=t.length;e<i;++e)s=t[e],s.label=this._tickFormatFunction(s.value,e,t)}getDecimalForValue(t){return null===t?NaN:(t-this.min)/(this.max-this.min)}getPixelForValue(t){const e=this._offsets,i=this.getDecimalForValue(t);return this.getPixelForDecimal((e.start+i)*e.factor)}getValueForPixel(t){const e=this._offsets,i=this.getDecimalForPixel(t)/e.factor-e.end;return this.min+i*(this.max-this.min)}_getLabelSize(t){const e=this.options.ticks,i=this.ctx.measureText(t).width,s=It(this.isHorizontal()?e.maxRotation:e.minRotation),n=Math.cos(s),o=Math.sin(s),a=this._resolveTickFontOptions(0).size;return{w:i*n+a*o,h:i*o+a*n}}_getLabelCapacity(t){const e=this.options.time,i=e.displayFormats,s=i[e.unit]||i.millisecond,n=this._tickFormatFunction(t,0,pa(this,[t],this._majorUnit),s),o=this._getLabelSize(n),a=Math.floor(this.isHorizontal()?this.width/o.w:this.height/o.h)-1;return a>0?a:1}getDataTimestamps(){let t,e,i=this._cache.data||[];if(i.length)return i;const s=this.getMatchingVisibleMetas();if(this._normalized&&s.length)return this._cache.data=s[0].controller.getAllParsedValues(this);for(t=0,e=s.length;t<e;++t)i=i.concat(s[t].controller.getAllParsedValues(this));return this._cache.data=this.normalize(i)}getLabelTimestamps(){const t=this._cache.labels||[];let e,i;if(t.length)return t;const s=this.getLabels();for(e=0,i=s.length;e<i;++e)t.push(ua(this,s[e]));return this._cache.labels=this._normalized?t:this.normalize(t)}normalize(t){return fe(t.sort(da))}}function xa(t,e,i){let s,n,o,a,r=0,l=t.length-1;i?(e>=t[r].pos&&e<=t[l].pos&&({lo:r,hi:l}=re(t,"pos",e)),({pos:s,time:o}=t[r]),({pos:n,time:a}=t[l])):(e>=t[r].time&&e<=t[l].time&&({lo:r,hi:l}=re(t,"time",e)),({time:s,pos:o}=t[r]),({time:n,pos:a}=t[l]));const h=n-s;return h?o+(a-o)*(e-s)/h:o}ma.id="time",ma.defaults={bounds:"data",adapters:{},time:{parser:!1,unit:!1,round:!1,isoWeekday:!1,minUnit:"millisecond",displayFormats:{}},ticks:{source:"auto",major:{enabled:!1}}};class ba extends ma{constructor(t){super(t),this._table=[],this._minPos=void 0,this._tableRange=void 0}initOffsets(){const t=this._getTimestampsForTable(),e=this._table=this.buildLookupTable(t);this._minPos=xa(e,this.min),this._tableRange=xa(e,this.max)-this._minPos,super.initOffsets(t)}buildLookupTable(t){const{min:e,max:i}=this,s=[],n=[];let o,a,r,l,h;for(o=0,a=t.length;o<a;++o)l=t[o],l>=e&&l<=i&&s.push(l);if(s.length<2)return[{time:e,pos:0},{time:i,pos:1}];for(o=0,a=s.length;o<a;++o)h=s[o+1],r=s[o-1],l=s[o],Math.round((h+r)/2)!==l&&n.push({time:l,pos:o/(a-1)});return n}_getTimestampsForTable(){let t=this._cache.all||[];if(t.length)return t;const e=this.getDataTimestamps(),i=this.getLabelTimestamps();return t=e.length&&i.length?this.normalize(e.concat(i)):e.length?e:i,t=this._cache.all=t,t}getDecimalForValue(t){return(xa(this._table,t)-this._minPos)/this._tableRange}getValueForPixel(t){const e=this._offsets,i=this.getDecimalForPixel(t)/e.factor-e.end;return xa(this._table,i*this._tableRange+this._minPos,!0)}}ba.id="timeseries",ba.defaults=ma.defaults;var _a=Object.freeze({__proto__:null,CategoryScale:qo,LinearScale:Zo,LogarithmicScale:Qo,RadialLinearScale:la,TimeScale:ma,TimeSeriesScale:ba});return dn.register(Rn,_a,no,Uo),dn.helpers={...Yi},dn._adapters=mn,dn.Animation=us,dn.Animations=gs,dn.animator=a,dn.controllers=Ws.controllers.items,dn.DatasetController=Ps,dn.Element=Ds,dn.elements=no,dn.Interaction=Ee,dn.layouts=ni,dn.platforms=hs,dn.Scale=Bs,dn.Ticks=Os,Object.assign(dn,Rn,_a,no,Uo,hs),dn.Chart=dn,"undefined"!=typeof window&&(window.Chart=dn),dn}));


/*!
 * chartjs-plugin-datalabels v2.0.0
 * https://chartjs-plugin-datalabels.netlify.app
 * (c) 2017-2021 chartjs-plugin-datalabels contributors
 * Released under the MIT license
 */
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e(require("chart.js/helpers"),require("chart.js")):"function"==typeof define&&define.amd?define(["chart.js/helpers","chart.js"],e):(t="undefined"!=typeof globalThis?globalThis:t||self).ChartDataLabels=e(t.Chart.helpers,t.Chart)}(this,(function(t,e){"use strict";var r=function(){if("undefined"!=typeof window){if(window.devicePixelRatio)return window.devicePixelRatio;var t=window.screen;if(t)return(t.deviceXDPI||1)/(t.logicalXDPI||1)}return 1}(),a=function(e){var r,a=[];for(e=[].concat(e);e.length;)"string"==typeof(r=e.pop())?a.unshift.apply(a,r.split("\n")):Array.isArray(r)?e.push.apply(e,r):t.isNullOrUndef(e)||a.unshift(""+r);return a},o=function(t,e,r){var a,o=[].concat(e),n=o.length,i=t.font,l=0;for(t.font=r.string,a=0;a<n;++a)l=Math.max(t.measureText(o[a]).width,l);return t.font=i,{height:n*r.lineHeight,width:l}},n=function(t,e,r){return Math.max(t,Math.min(e,r))},i=function(t,e){var r,a,o,n,i=t.slice(),l=[];for(r=0,o=e.length;r<o;++r)n=e[r],-1===(a=i.indexOf(n))?l.push([n,1]):i.splice(a,1);for(r=0,o=i.length;r<o;++r)l.push([i[r],-1]);return l};function l(t,e){var r=e.x,a=e.y;if(null===r)return{x:0,y:-1};if(null===a)return{x:1,y:0};var o=t.x-r,n=t.y-a,i=Math.sqrt(o*o+n*n);return{x:i?o/i:0,y:i?n/i:-1}}function s(t,e,r){var a=0;return t<r.left?a|=1:t>r.right&&(a|=2),e<r.top?a|=8:e>r.bottom&&(a|=4),a}function u(t,e){var r,a,o=e.anchor,n=t;return e.clamp&&(n=function(t,e){for(var r,a,o,n=t.x0,i=t.y0,l=t.x1,u=t.y1,d=s(n,i,e),c=s(l,u,e);d|c&&!(d&c);)8&(r=d||c)?(a=n+(l-n)*(e.top-i)/(u-i),o=e.top):4&r?(a=n+(l-n)*(e.bottom-i)/(u-i),o=e.bottom):2&r?(o=i+(u-i)*(e.right-n)/(l-n),a=e.right):1&r&&(o=i+(u-i)*(e.left-n)/(l-n),a=e.left),r===d?d=s(n=a,i=o,e):c=s(l=a,u=o,e);return{x0:n,x1:l,y0:i,y1:u}}(n,e.area)),"start"===o?(r=n.x0,a=n.y0):"end"===o?(r=n.x1,a=n.y1):(r=(n.x0+n.x1)/2,a=(n.y0+n.y1)/2),function(t,e,r,a,o){switch(o){case"center":r=a=0;break;case"bottom":r=0,a=1;break;case"right":r=1,a=0;break;case"left":r=-1,a=0;break;case"top":r=0,a=-1;break;case"start":r=-r,a=-a;break;case"end":break;default:o*=Math.PI/180,r=Math.cos(o),a=Math.sin(o)}return{x:t,y:e,vx:r,vy:a}}(r,a,t.vx,t.vy,e.align)}var d=function(t,e){var r=(t.startAngle+t.endAngle)/2,a=Math.cos(r),o=Math.sin(r),n=t.innerRadius,i=t.outerRadius;return u({x0:t.x+a*n,y0:t.y+o*n,x1:t.x+a*i,y1:t.y+o*i,vx:a,vy:o},e)},c=function(t,e){var r=l(t,e.origin),a=r.x*t.options.radius,o=r.y*t.options.radius;return u({x0:t.x-a,y0:t.y-o,x1:t.x+a,y1:t.y+o,vx:r.x,vy:r.y},e)},h=function(t,e){var r=l(t,e.origin),a=t.x,o=t.y,n=0,i=0;return t.horizontal?(a=Math.min(t.x,t.base),n=Math.abs(t.base-t.x)):(o=Math.min(t.y,t.base),i=Math.abs(t.base-t.y)),u({x0:a,y0:o+i,x1:a+n,y1:o,vx:r.x,vy:r.y},e)},f=function(t,e){var r=l(t,e.origin);return u({x0:t.x,y0:t.y,x1:t.x,y1:t.y,vx:r.x,vy:r.y},e)},x=function(t){return Math.round(t*r)/r};function y(t,e){var r=e.chart.getDatasetMeta(e.datasetIndex).vScale;if(!r)return null;if(void 0!==r.xCenter&&void 0!==r.yCenter)return{x:r.xCenter,y:r.yCenter};var a=r.getBasePixel();return t.horizontal?{x:a,y:null}:{x:null,y:a}}function v(t,e,r){var a=r.backgroundColor,o=r.borderColor,n=r.borderWidth;(a||o&&n)&&(t.beginPath(),function(t,e,r,a,o,n){var i=Math.PI/2;if(n){var l=Math.min(n,o/2,a/2),s=e+l,u=r+l,d=e+a-l,c=r+o-l;t.moveTo(e,u),s<d&&u<c?(t.arc(s,u,l,-Math.PI,-i),t.arc(d,u,l,-i,0),t.arc(d,c,l,0,i),t.arc(s,c,l,i,Math.PI)):s<d?(t.moveTo(s,r),t.arc(d,u,l,-i,i),t.arc(s,u,l,i,Math.PI+i)):u<c?(t.arc(s,u,l,-Math.PI,0),t.arc(s,c,l,0,Math.PI)):t.arc(s,u,l,-Math.PI,Math.PI),t.closePath(),t.moveTo(e,r)}else t.rect(e,r,a,o)}(t,x(e.x)+n/2,x(e.y)+n/2,x(e.w)-n,x(e.h)-n,r.borderRadius),t.closePath(),a&&(t.fillStyle=a,t.fill()),o&&n&&(t.strokeStyle=o,t.lineWidth=n,t.lineJoin="miter",t.stroke()))}function b(t,e,r){var a=t.shadowBlur,o=r.stroked,n=x(r.x),i=x(r.y),l=x(r.w);o&&t.strokeText(e,n,i,l),r.filled&&(a&&o&&(t.shadowBlur=0),t.fillText(e,n,i,l),a&&o&&(t.shadowBlur=a))}var _=function(t,e,r,a){var o=this;o._config=t,o._index=a,o._model=null,o._rects=null,o._ctx=e,o._el=r};t.merge(_.prototype,{_modelize:function(r,a,n,i){var l,s=this,u=s._index,x=t.toFont(t.resolve([n.font,{}],i,u)),v=t.resolve([n.color,e.defaults.color],i,u);return{align:t.resolve([n.align,"center"],i,u),anchor:t.resolve([n.anchor,"center"],i,u),area:i.chart.chartArea,backgroundColor:t.resolve([n.backgroundColor,null],i,u),borderColor:t.resolve([n.borderColor,null],i,u),borderRadius:t.resolve([n.borderRadius,0],i,u),borderWidth:t.resolve([n.borderWidth,0],i,u),clamp:t.resolve([n.clamp,!1],i,u),clip:t.resolve([n.clip,!1],i,u),color:v,display:r,font:x,lines:a,offset:t.resolve([n.offset,0],i,u),opacity:t.resolve([n.opacity,1],i,u),origin:y(s._el,i),padding:t.toPadding(t.resolve([n.padding,0],i,u)),positioner:(l=s._el,l instanceof e.ArcElement?d:l instanceof e.PointElement?c:l instanceof e.BarElement?h:f),rotation:t.resolve([n.rotation,0],i,u)*(Math.PI/180),size:o(s._ctx,a,x),textAlign:t.resolve([n.textAlign,"start"],i,u),textShadowBlur:t.resolve([n.textShadowBlur,0],i,u),textShadowColor:t.resolve([n.textShadowColor,v],i,u),textStrokeColor:t.resolve([n.textStrokeColor,v],i,u),textStrokeWidth:t.resolve([n.textStrokeWidth,0],i,u)}},update:function(e){var r,o,n,i=this,l=null,s=null,u=i._index,d=i._config,c=t.resolve([d.display,!0],e,u);c&&(r=e.dataset.data[u],o=t.valueOrDefault(t.callback(d.formatter,[r,e]),r),(n=t.isNullOrUndef(o)?[]:a(o)).length&&(s=function(t){var e=t.borderWidth||0,r=t.padding,a=t.size.height,o=t.size.width,n=-o/2,i=-a/2;return{frame:{x:n-r.left-e,y:i-r.top-e,w:o+r.width+2*e,h:a+r.height+2*e},text:{x:n,y:i,w:o,h:a}}}(l=i._modelize(c,n,d,e)))),i._model=l,i._rects=s},geometry:function(){return this._rects?this._rects.frame:{}},rotation:function(){return this._model?this._model.rotation:0},visible:function(){return this._model&&this._model.opacity},model:function(){return this._model},draw:function(t,e){var r,a=t.ctx,o=this._model,i=this._rects;this.visible()&&(a.save(),o.clip&&(r=o.area,a.beginPath(),a.rect(r.left,r.top,r.right-r.left,r.bottom-r.top),a.clip()),a.globalAlpha=n(0,o.opacity,1),a.translate(x(e.x),x(e.y)),a.rotate(o.rotation),v(a,i.frame,o),function(t,e,r,a){var o,n=a.textAlign,i=a.color,l=!!i,s=a.font,u=e.length,d=a.textStrokeColor,c=a.textStrokeWidth,h=d&&c;if(u&&(l||h))for(r=function(t,e,r){var a=r.lineHeight,o=t.w,n=t.x;return"center"===e?n+=o/2:"end"!==e&&"right"!==e||(n+=o),{h:a,w:o,x:n,y:t.y+a/2}}(r,n,s),t.font=s.string,t.textAlign=n,t.textBaseline="middle",t.shadowBlur=a.textShadowBlur,t.shadowColor=a.textShadowColor,l&&(t.fillStyle=i),h&&(t.lineJoin="round",t.lineWidth=c,t.strokeStyle=d),o=0,u=e.length;o<u;++o)b(t,e[o],{stroked:h,filled:l,w:r.w,x:r.x,y:r.y+r.h*o})}(a,o.lines,i.text,o),a.restore())}});var p=Number.MIN_SAFE_INTEGER||-9007199254740991,g=Number.MAX_SAFE_INTEGER||9007199254740991;function m(t,e,r){var a=Math.cos(r),o=Math.sin(r),n=e.x,i=e.y;return{x:n+a*(t.x-n)-o*(t.y-i),y:i+o*(t.x-n)+a*(t.y-i)}}function w(t,e){var r,a,o,n,i,l=g,s=p,u=e.origin;for(r=0;r<t.length;++r)o=(a=t[r]).x-u.x,n=a.y-u.y,i=e.vx*o+e.vy*n,l=Math.min(l,i),s=Math.max(s,i);return{min:l,max:s}}function M(t,e){var r=e.x-t.x,a=e.y-t.y,o=Math.sqrt(r*r+a*a);return{vx:(e.x-t.x)/o,vy:(e.y-t.y)/o,origin:t,ln:o}}var k=function(){this._rotation=0,this._rect={x:0,y:0,w:0,h:0}};function $(t,e,r){var a=e.positioner(t,e),o=a.vx,n=a.vy;if(!o&&!n)return{x:a.x,y:a.y};var i=r.w,l=r.h,s=e.rotation,u=Math.abs(i/2*Math.cos(s))+Math.abs(l/2*Math.sin(s)),d=Math.abs(i/2*Math.sin(s))+Math.abs(l/2*Math.cos(s)),c=1/Math.max(Math.abs(o),Math.abs(n));return u*=o*c,d*=n*c,u+=e.offset*o,d+=e.offset*n,{x:a.x+u,y:a.y+d}}t.merge(k.prototype,{center:function(){var t=this._rect;return{x:t.x+t.w/2,y:t.y+t.h/2}},update:function(t,e,r){this._rotation=r,this._rect={x:e.x+t.x,y:e.y+t.y,w:e.w,h:e.h}},contains:function(t){var e=this,r=e._rect;return!((t=m(t,e.center(),-e._rotation)).x<r.x-1||t.y<r.y-1||t.x>r.x+r.w+2||t.y>r.y+r.h+2)},intersects:function(t){var e,r,a,o=this._points(),n=t._points(),i=[M(o[0],o[1]),M(o[0],o[3])];for(this._rotation!==t._rotation&&i.push(M(n[0],n[1]),M(n[0],n[3])),e=0;e<i.length;++e)if(r=w(o,i[e]),a=w(n,i[e]),r.max<a.min||a.max<r.min)return!1;return!0},_points:function(){var t=this,e=t._rect,r=t._rotation,a=t.center();return[m({x:e.x,y:e.y},a,r),m({x:e.x+e.w,y:e.y},a,r),m({x:e.x+e.w,y:e.y+e.h},a,r),m({x:e.x,y:e.y+e.h},a,r)]}});var C={prepare:function(t){var e,r,a,o,n,i=[];for(e=0,a=t.length;e<a;++e)for(r=0,o=t[e].length;r<o;++r)n=t[e][r],i.push(n),n.$layout={_box:new k,_hidable:!1,_visible:!0,_set:e,_idx:r};return i.sort((function(t,e){var r=t.$layout,a=e.$layout;return r._idx===a._idx?a._set-r._set:a._idx-r._idx})),this.update(i),i},update:function(t){var e,r,a,o,n,i=!1;for(e=0,r=t.length;e<r;++e)o=(a=t[e]).model(),(n=a.$layout)._hidable=o&&"auto"===o.display,n._visible=a.visible(),i|=n._hidable;i&&function(t){var e,r,a,o,n,i,l;for(e=0,r=t.length;e<r;++e)(o=(a=t[e]).$layout)._visible&&(l=new Proxy(a._el,{get:(t,e)=>t.getProps([e],!0)[e]}),n=a.geometry(),i=$(l,a.model(),n),o._box.update(i,n,a.rotation()));(function(t,e){var r,a,o,n;for(r=t.length-1;r>=0;--r)for(o=t[r].$layout,a=r-1;a>=0&&o._visible;--a)(n=t[a].$layout)._visible&&o._box.intersects(n._box)&&e(o,n)})(t,(function(t,e){var r=t._hidable,a=e._hidable;r&&a||a?e._visible=!1:r&&(t._visible=!1)}))}(t)},lookup:function(t,e){var r,a;for(r=t.length-1;r>=0;--r)if((a=t[r].$layout)&&a._visible&&a._box.contains(e))return t[r];return null},draw:function(t,e){var r,a,o,n,i,l;for(r=0,a=e.length;r<a;++r)(n=(o=e[r]).$layout)._visible&&(i=o.geometry(),l=$(o._el,o.model(),i),n._box.update(l,i,o.rotation()),o.draw(t,l))}},P="$default";function S(e,r,a){if(r){var o,n=a.$context,i=a.$groups;r[i._set]&&(o=r[i._set][i._key])&&!0===t.callback(o,[n])&&(e.$datalabels._dirty=!0,a.update(n))}}function I(t,e){var r,a,o=t.$datalabels,n=o._listeners;if(n.enter||n.leave){if("mousemove"===e.type)a=C.lookup(o._labels,e);else if("mouseout"!==e.type)return;r=o._hovered,o._hovered=a,function(t,e,r,a){var o,n;(r||a)&&(r?a?r!==a&&(n=o=!0):n=!0:o=!0,n&&S(t,e.leave,r),o&&S(t,e.enter,a))}(t,n,r,a)}}return{id:"datalabels",defaults:{align:"center",anchor:"center",backgroundColor:null,borderColor:null,borderRadius:0,borderWidth:0,clamp:!1,clip:!1,color:void 0,display:!0,font:{family:void 0,lineHeight:1.2,size:void 0,style:void 0,weight:null},formatter:function(e){if(t.isNullOrUndef(e))return null;var r,a,o,n=e;if(t.isObject(e))if(t.isNullOrUndef(e.label))if(t.isNullOrUndef(e.r))for(n="",o=0,a=(r=Object.keys(e)).length;o<a;++o)n+=(0!==o?", ":"")+r[o]+": "+e[r[o]];else n=e.r;else n=e.label;return""+n},labels:void 0,listeners:{},offset:4,opacity:1,padding:{top:4,right:4,bottom:4,left:4},rotation:0,textAlign:"start",textStrokeColor:void 0,textStrokeWidth:0,textShadowBlur:0,textShadowColor:void 0},beforeInit:function(t){t.$datalabels={_actives:[]}},beforeUpdate:function(t){var e=t.$datalabels;e._listened=!1,e._listeners={},e._datasets=[],e._labels=[]},afterDatasetUpdate:function(e,r,a){var o,n,i,l,s,u,d,c,h=r.index,f=e.$datalabels,x=f._datasets[h]=[],y=e.isDatasetVisible(h),v=e.data.datasets[h],b=function(e,r){var a,o,n,i=e.datalabels,l=[];return!1===i?null:(!0===i&&(i={}),r=t.merge({},[r,i]),o=r.labels||{},n=Object.keys(o),delete r.labels,n.length?n.forEach((function(e){o[e]&&l.push(t.merge({},[r,o[e],{_key:e}]))})):l.push(r),a=l.reduce((function(e,r){return t.each(r.listeners||{},(function(t,a){e[a]=e[a]||{},e[a][r._key||P]=t})),delete r.listeners,e}),{}),{labels:l,listeners:a})}(v,a),p=r.meta.data||[],g=e.ctx;for(g.save(),o=0,i=p.length;o<i;++o)if((d=p[o]).$datalabels=[],y&&d&&e.getDataVisibility(o)&&!d.skip)for(n=0,l=b.labels.length;n<l;++n)u=(s=b.labels[n])._key,(c=new _(s,g,d,o)).$groups={_set:h,_key:u||P},c.$context={active:!1,chart:e,dataIndex:o,dataset:v,datasetIndex:h},c.update(c.$context),d.$datalabels.push(c),x.push(c);g.restore(),t.merge(f._listeners,b.listeners,{merger:function(t,e,a){e[t]=e[t]||{},e[t][r.index]=a[t],f._listened=!0}})},afterUpdate:function(t,e){t.$datalabels._labels=C.prepare(t.$datalabels._datasets,e)},afterDatasetsDraw:function(t){C.draw(t,t.$datalabels._labels)},beforeEvent:function(t,e){if(t.$datalabels._listened){var r=e.event;switch(r.type){case"mousemove":case"mouseout":I(t,r);break;case"click":!function(t,e){var r=t.$datalabels,a=r._listeners.click,o=a&&C.lookup(r._labels,e);o&&S(t,a,o)}(t,r)}}},afterEvent:function(t){var e,r,a,o,n,l,s,u=t.$datalabels,d=u._actives,c=u._actives=t.getActiveElements(),h=i(d,c);for(e=0,r=h.length;e<r;++e)if((n=h[e])[1])for(a=0,o=(s=n[0].element.$datalabels||[]).length;a<o;++a)(l=s[a]).$context.active=1===n[1],l.update(l.$context);(u._dirty||h.length)&&(C.update(u._labels),t.render()),delete u._dirty}}}));

Chart.register(ChartDataLabels);// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                          D A T E S                                             //
//                                                                                                //
// -----------------------------------------------------------------------------------------------//


function Date_Now()
{
 var forcetime = Client_Location_Parameter("forcetime");
 if(forcetime) return forcetime;
 
 var now = new Date();

 return Date_From_JS(now); 
}




function Date_To_JS(date)
{
 var year    = date.substr(0,  4);
 var month   = date.substr(4,  2) - 1;
 var day     = date.substr(6,  2);
 var hour    = date.substr(8,  2);
 var minutes = date.substr(10, 2);
 var seconds = date.substr(12, 2);
 
 return new Date(year, month, day, hour, minutes, seconds);
}



function Date_From_Input(date, separator = "-")
{
 if(!date) var date = "";
 
 var date = date.split(separator);
 date     = date.join("");
 
 return date;
}



function Date_To_Input(date, separator = "-")
{
 if(!date) var date = "";
	 
 var year    = String(date.substr(0,  4)).padStart(4, "0");
 var month   = String(date.substr(4,  2)).padStart(2, "0");
 var day     = String(date.substr(6,  2)).padStart(2, "0");
 
 var date    =  [year, month, day].join(separator);
 
 return date;
}



function Date_To_UTC(date)
{
 if(!date) var date = Date_Now();
 
 var jsdate = Date_To_JS(date);
 jsdate     = new Date(jsdate.getTime() + jsdate.getTimezoneOffset() * 60000);
 
 var date   = Date_From_JS(jsdate);
 return date;
}



function Datetime_To_Input(date, separator = "-")
{
 if(!date) var date = "";
	 
 var year    = String(date.substr(0,  4)).padStart(4, "0");
 var month   = String(date.substr(4,  2)).padStart(2, "0");
 var day     = String(date.substr(6,  2)).padStart(2, "0");
 var hour    = String(date.substr(8,  2)).padStart(2, "0");
 var minute  = String(date.substr(10, 2)).padStart(2, "0");
 
 var date    =  [year, month, day].join(separator);
 date        = date + "T" + hour + ":" + minute;
 
 return date;
}



function Datetime_From_Input(date, separator = "-")
{
 if(!date) var date = "";
 
 date = date.split("T");
 time = date[1];
 date = date[0];
 
 date = date.split(separator);
 date = date.join("");
 
 time = time.split(":");
 time = time.join("");
 
 date = date + time;
 
 return date;
}





function Date_From_JS(date)
{
 var year    = date.getFullYear(); 
 var month   = date.getMonth() + 1;
 var day     = date.getDate(); 
 var hour    = date.getHours();
 var minutes = date.getMinutes();
 var seconds = date.getSeconds();
 
 return String(year) + String(month).padStart(2, "0") + String(day).padStart(2, "0") + String(hour).padStart(2, "0") + String(minutes).padStart(2, "0") + String(seconds).padStart(2, "0");
}




function Date_Complete(date)
{ 
 // MISSING TIME?
 if(date.length >= 8 && date.length < 14) return date.padEnd(14, 0);
}




function Date_Portion(date, mode, complete)
{
 switch(mode)
 {  
  case "no-seconds":
	var portion = date.substr(0, 12);  
  break;
  
  case "date-only":
	var portion = date.substr(0, 8);
  break;
  
  case "time-only":
	var portion = date.substr(8, 4);  
  break;
  
  case "time-timecode":
	var portion = date.substr(8, 2) + ":" + date.substr(10, 2);
  break;
  
  case "time-seconds":
	var portion = date.substr(8);  
  break;
 }
 
 if(complete) portion = Date_Complete(portion);
 
 return portion;
}





function Date_Get(date, components, separator = "/")
{
 if(typeof components == "string") var components = [components];
 
 var parts = [];
 for(var component of components)
 {
  switch(component)
  {
   case "year":
 	var part = date.substr(0, 4);
   break;
  
   case "month":
	var part = date.substr(4, 2);
   break;
   
   case "day":
	var part = date.substr(6, 2);
   break;
   
   case "hour":
	var part = date.substr(8, 2);
   break;
   
   case "minutes":
	var part = date.substr(10, 2);
   break;
  }
  
  parts.push(part);
 }

 return parts.join(separator); 
}



function Date_Weekday_Name(day, format = "long", locale = "en-US")
{ 
 day = parseInt(day);
 day = day.toString().padStart(2, "0");
 
 return Date_Format("000601" + day, locale, {weekday:format});
}




function Date_Weekday_Get(date)
{
 var jsdate  = Date_To_JS(date);
 var weekday = jsdate.getDay();
 
 if(weekday == 0) weekday = 7;
 
 return weekday;
}




function Date_Format(date, locale = "en-US", format = "full", options = {})
{
 if(typeof format == "object") 
 {
  var config = format;
 }
 else
 {
  
  switch(format)
  {
   case "full":
	 var config = 
	 { 
	  dateStyle: "full", 
	  timeStyle: "short", 
	  hourCycle: "h24"
	 }
   break;
  
   case "date-long-weekday":
     var config =
	 {
	  weekday: "long", 
	  day:     "numeric", 
	  month:   "long", 
	  year:    "numeric"
	 }  
   break;
   
   case "date-long-noyear":
     var config =
	 {
	  weekday: "long", 
	  day:     "numeric", 
	  month:   "long", 
	 }  
   break;
   
   case "date-long-weekday-noyear":
     var config =
	 {
	  weekday: "long", 
	  day:     "numeric", 
	  month:   "long", 
	 }  
   break;
   
   case "date-shortmonth-weekday-noyear":
     var config =
	 {
	  weekday: "long", 
	  day:     "numeric", 
	  month:   "short"
	 }  
   break;
   
   case "date-short-weekday":
     var config =
	 {
	  weekday: "short", 
	  day:     "numeric", 
	  month:   "short", 
	  year:    "numeric"
	 }  
   break;
   
   case "date-short-weekday-noyear":
     var config =
	 {
	  weekday: "short", 
	  day:     "numeric", 
	  month:   "short", 
	 }  
   break;
   
   case "date-short-noyear":
     var config =
	 {
	  day:     "numeric", 
	  month:   "short", 
	 }  
   break;
   
   case "date-short":
     var config =
	 {
	  day:     "numeric", 
	  month:   "short", 
	  year:    "numeric"
	 }  
   break;
  
   case "day-weekday":
	var config =
	 {
	  day:     "numeric",
      weekday: "long" 	  
	 }  
   break;
   
   case "date-time-long":
     var config =
	 {
	  weekday:   "long", 
	  day:       "numeric", 
	  month:     "long",
	  hour:      "2-digit", 
	  minute:    "2-digit", 
	  hourCycle: "h24"	  
	 }  
   break;
   
   case "date-time-compact":
     var config =
	 {
	  weekday:   "long", 
	  day:       "numeric", 
	  month:     "short",
	  hour:      "2-digit", 
	  minute:    "2-digit", 
	  hourCycle: "h24"	  
	 }  
   break;
   
   case "date-compact":
     var config =
	 {
	  weekday:   "long", 
	  day:       "2-digit", 
	  month:     "short"
	 }  
   break;
   
   case "monthdayyear-compact":
     var config =
	 {
	  day:       "2-digit", 
	  month:     "short",
	  year:      "numeric"
	 }  
   break;
  
   case "time-only":
	 var config = 
	 {
	  hour:      "2-digit", 
	  minute:    "2-digit", 
	  hourCycle: "h24"
	 }
   break;
  }
  
 }
 
 
 Object.assign(config, options);
 
 
 var jsdate    = Date_To_JS(date);
 var formatted = new Intl.DateTimeFormat(locale, config).format(jsdate);
 
 return formatted;
}





function Date_Format_Period(date_from, date_to, options = {})
{
 var config = {};
 
 // SPECIFIC LOCALE?
 var locale = options["locale"];
 
 // USE "TOMORROW", "YESTERDAY", "LAST WEEK" ETC.?
 if(options["conversational"]) config["numeric"] = "auto"; else config["numeric"] = "always";
 
 const formatter = new Intl.RelativeTimeFormat(locale, config);
 const DIVISIONS = 
 [
  { amount: 60, name: 'seconds' },
  { amount: 60, name: 'minutes' },
  { amount: 24, name: 'hours' },
  { amount: 7, name: 'days' },
  { amount: 4.34524, name: 'weeks' },
  { amount: 12, name: 'months' },
  { amount: Number.POSITIVE_INFINITY, name: 'years' }
 ]

 if(!date_from) var date_from = Date_Now(); 
 
 var duration = (Date_To_JS(date_to) - Date_To_JS(date_from)) / 1000;
 for (let i = 0; i <= DIVISIONS.length; i++) 
 {
  const division = DIVISIONS[i]
   
  if (Math.abs(duration) < division.amount) 
  {
   return formatter.format(Math.round(duration), division.name);
  }
   
  duration /= division.amount
 }
}





function Date_Distance(date_from, date_to, unit = "seconds")
{
 date_from   = Date_To_JS(date_from);
 date_to     = Date_To_JS(date_to);
 var seconds = (date_to - date_from) / 1000;
 
 switch(unit)
 {
  case "seconds":
	var distance = seconds;
  break;
  
  case "minutes":
	var distance = Math.floor(seconds / 60);
  break;
  
  case "hours":
	var distance = Math.floor(seconds / 3600);
  break;
  
  case "days":
	var distance = Math.floor(seconds / 86400);
  break;
  
  case "months":
	var distance = date_to.getMonth() - date_from.getMonth() + 12 * (date_to.getFullYear() - date_from.getFullYear());
  break;
  
  case "years":
	var distance = date_to.getFullYear() - date_from.getFullYear();
  break;
 }
 
 return distance;
}




function Date_Timezone()
{
 return Intl.DateTimeFormat().resolvedOptions().timeZone;
}



function Date_Month_Name(month, format = "long", locale = "en-US")
{  
 month = parseInt(month);
 month = month + 1;
 month = month.toString().padStart(2, "0");
 
 return Date_Format("0000" + month, locale, {month:format});
}



function Date_Month_FirstDay(date)
{
 if(!date) var date = Date_Now(); 
 
 var jsdate = Date_To_JS(date);
 var first  = new Date(jsdate.getFullYear(), jsdate.getMonth(), 1); 
 first      = Date_From_JS(first);
 
 return first;
}



function Date_Month_LastDay(date)
{
 if(!date) var date = Date_Now(); 
 
 var jsdate = Date_To_JS(date);
 var last   = new Date(jsdate.getFullYear(), jsdate.getMonth() + 1, 0); 
 last       = Date_From_JS(last);
 
 return last;
}




function Date_Month_ListDays(month, year) 
{
 var month = month - 1; // FIX, JS DATE MONTHS START WITH 0 (!!)
 var date  = new Date(year, month, 1);
 var days  = [];
 
 while (date.getMonth() === month) 
 {
  var day = Date_From_JS(new Date(date));
  
  days.push(day);
  date.setDate(date.getDate() + 1);
 }

 return days;
}




function Date_Week_FirstDay(date)
{
 if(!date) var date = Date_Now();
 var jsdate = Date_To_JS(date);
 
 while (jsdate.getDay() != 1) 
 {
  jsdate.setDate(jsdate.getDate() - 1);
 }

 return Date_From_JS(jsdate);
}




function Date_Week_LastDay(date)
{
 var date = Date_Week_FirstDay(date);
 date     = Date_Add_Days(date, 6);
 
 return date;
}




function Date_Add_Months(date, months)
{
 var jsdate = Date_To_JS(date);
 var month  = jsdate.getMonth();
 
 jsdate.setMonth(month + months);
 
 // FIX: IF MONTHS DO NOT HAVE SAME NUMBER OF DAYS THERE MIGHT BE A PROBLEM, AND MONTH WON'T CHANGE
 while(jsdate.getMonth() == month)
 {
  if(months < 0)
  {
   jsdate.setDate(jsdate.getDate() - 1);
  }
  else
  {
   jsdate.setDate(jsdate.getDate() + 1);
  }
 }
 
 return Date_From_JS(jsdate);
}





function Date_Add_Days(date, days)
{
 var jsdate = Date_To_JS(date);
 
 jsdate.setDate(jsdate.getDate() + days);
 
 return Date_From_JS(jsdate);
}





function Date_Add_Minutes(date, minutes)
{
 var jsdate = Date_To_JS(date);
 
 jsdate.setMinutes(jsdate.getMinutes() + minutes);
 
 return Date_From_JS(jsdate);
}





function Date_Add_Hours(date, hours)
{
 var jsdate = Date_To_JS(date);
 
 jsdate.setHours(jsdate.getHours() + hours);
 
 return Date_From_JS(jsdate);
}



function Date_Period_Detail(token, defaultedge = "start")
{
 var detail = {};
 
 var parts = token.split(" of ");
 
 if(parts.length < 2)
 {
  detail["time"] = token;
  detail["edge"] = defaultedge;
 }
 else
 {  
  detail["time"] = parts[1].trim().toLowerCase();
  detail["edge"] = parts[0].trim().toLowerCase();
 }
 
 return detail;
}



function Date_Range(period)
{ 
 var parts = period.split(" to ");
 for(var i in parts) parts[i] = parts[i].toLowerCase().trim();
 
 if(parts.length == 1) parts[1] = parts[0];

 var range     = {};
 
 var detail = Date_Period_Detail(parts[0], "start"); 
 range["from"] = Date_Period_Time(detail["time"], detail["edge"]);
 
 var detail = Date_Period_Detail(parts[1], "end"); 
 range["to"] = Date_Period_Time(detail["time"], detail["edge"]);
 
 return range;
}



function Date_Period_Time(period, edge)
{
 switch(period)
 {
  // PRESENT
  case "today":
	var today = Date_Now();
	
	if(edge == "start")
	{
	 var day   = Date_Portion(today, "date-only") + "0000";
	}
	else
	{
	 var day   = Date_Portion(today, "date-only") + "2359";
	}	
  break;
 
  case "this week":
	if(edge == "start")
	{
     var day = Date_Portion(Date_Week_FirstDay(Date_Now()), "date-only") + "0000"; 
	}
	else
	{
	 var day = Date_Portion(Date_Week_LastDay(Date_Now()), "date-only") + "2359";
	}
  break;
 
  case "this month":
    var thismonth = Date_Month_FirstDay(Date_Now()); 
	
	if(edge == "start")
	{
	 var day = Date_Portion(Date_Month_FirstDay(Date_Now()), "date-only") + "0000"; 
	}
	else
    {
     var day = Date_Portion(Date_Month_LastDay(Date_Now()), "date-only") + "2359"; 
	}
  break;
  
  // FUTURE
  case "future":
	day = "290001010000";
  break;
  
  case "tomorrow":
	var tomorrow = Date_Add_Days(Date_Now(), 1);
	
	if(edge == "start")
	{
	 var day = Date_Portion(tomorrow, "date-only") + "0000";
	}
	else
	{
	 var day = Date_Portion(tomorrow, "date-only") + "2359";
	}	
  break;
  
  case "next week":
	var nextweek = Date_Add_Days(Date_Week_FirstDay(Date_Now()), 7);
	
	if(edge == "start")
	{
     var day = Date_Portion(Date_Week_FirstDay(nextweek), "date-only") + "0000"; 
	}
	else
	{
	 var day = Date_Portion(Date_Week_LastDay(nextweek), "date-only") + "2359";
	}
  break;
  
  case "next month":
	var nextmonth = Date_Add_Days(Date_Month_LastDay(Date_Now()), 1);
	
	if(edge == "start")
	{
	 var day = Date_Portion(Date_Month_FirstDay(nextmonth), "date-only") + "0000"; 
	}
	else
    {
     var day = Date_Portion(Date_Month_LastDay(nextmonth), "date-only") + "2359"; 
	}
  break;
  
  // PAST
  case "past":
	day = "197001010000";
  break;
  
  case "yesterday":
	var yesterday = Date_Add_Days(Date_Now(), -1);
	
	if(edge == "start")
	{
	 var day = Date_Portion(yesterday, "date-only") + "0000";
	}
	else
	{
	 var day = Date_Portion(yesterday, "date-only") + "2359";
	}	
  break;
  
  case "last week":
	var lastweek = Date_Add_Days(Date_Week_FirstDay(Date_Now()), -7);
	
	if(edge == "start")
	{
     var day = Date_Portion(Date_Week_FirstDay(lastweek), "date-only") + "0000"; 
	}
	else
	{
	 var day = Date_Portion(Date_Week_LastDay(lastweek), "date-only") + "2359";
	}
  break;
  
  case "last month":
    var lastmonth = Date_Month_FirstDay(Date_Add_Days(Date_Month_FirstDay(Date_Now()), -1));

	if(edge == "start")
	{
	 var day = Date_Portion(Date_Month_FirstDay(lastmonth), "date-only") + "0000"; 
	}
	else
    {
     var day = Date_Portion(Date_Month_LastDay(lastmonth), "date-only") + "2359"; 
	}
  break;
 }
 
 return day;
}



function Time_Now()
{
 return new Date().getTime(); 
}



function Time_From_Minutes(minutes, separator = ":")
{
 var hours   = Math.floor(minutes / 60);
 var minutes = minutes % 60;
 
 return hours.toString().padStart(2, "0") + separator + minutes.toString().padStart(2, "0");
}


function Time_To_Minutes(time)
{
 time        = String_Filter_AllowDigits(String(time));
 
 var hours   = parseInt(time.substr(0, 2));
 var minutes = parseInt(time.substr(2, 2));
 
 return (hours * 60) + minutes;
}



function Time_From_Input(value, separator = ":")
{
 var time = value.split(separator);
 time     = time.join("");
 
 return time;
}



function Time_Seconds_ToTimecode(seconds, separator = ":")
{
 var hours   = Math.floor(seconds / 3600);
 seconds     = seconds - (hours * 3600);
 
 var minutes = Math.floor(seconds / 60);
 seconds     = seconds - (minutes * 60);
 
 return hours.toString().padStart(2, "0") + separator + minutes.toString().padStart(2, "0") + separator + seconds.toString().padStart(2, "0");
}



function Time_Timecode_ToSeconds(timecode, separator = ":")
{
 var parts   = timecode.split(separator);
 var seconds = 0;
 
 if(parts.length > 0)	
 {
  seconds = seconds + parts[0] * 60 * 60;
 }	 
 
 if(parts.length > 1)	
 {
  seconds = seconds + parts[1] * 60;
 }	

 if(parts.length > 2)	
 {
  seconds = seconds + parts[2];
 }	 
  
 return seconds;
}





function Time_Format_Period(minutes, locale = "en", separator = ", ")
{
 var hours   = Math.floor(minutes / 60);
 var minutes = minutes % 60;
 
 var time    = [];
 
 if(hours > 0)
 {
  var component = new Intl.NumberFormat(locale, {style:"unit", unit:"hour", unitDisplay:"long"}).format(hours);
  time.push(component);
 }
 
 if(minutes > 0)
 {
  var component = new Intl.NumberFormat(locale, {style:"unit", unit:"minute", unitDisplay:"long"}).format(minutes);
  time.push(component);
 }
 
 return time.join(separator);
}function Debug_Elements_Outline()
{
 var elements = Document_Element_Children(document.body, true);
 
 for(var element of elements) 
 { 
  element.style.outline = "1px solid rgba(1, 0, 1, 0.5)"; 
  element.style.outlineOffset = -1;
 }
}
// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                     D O C U M E N T                                            //
//                                                                                                //
// -----------------------------------------------------------------------------------------------//







// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                       E V E N T S                                              //
//                                                                                                //
// -----------------------------------------------------------------------------------------------//

function Document_Event_Trigger(element, type)
{
 var event = new Event(type);
 element.dispatchEvent(event);
}



function Document_Event_RelativeCoords(event)
{
 var element = event.currentTarget;
 
 var rect    = element.getBoundingClientRect();
 var x       = (event.clientX - rect.left); 
 var y       = (event.clientY - rect.top);
 
 return {x,y};
}







// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                     E L E M E N T S                                            //
//                                                                                                //
// -----------------------------------------------------------------------------------------------//


function Document_Element_Create(html)
{
 var element       = document.createElement(null); 
 element.innerHTML = html;
 element           = element.firstElementChild;
 
 return element;
}



function Document_Element_Disable(element, css)
{
 var style = {fields:[], css:false};
 
 for(var field of ["pointer-events", "user-select"])
 {
  style["fields"][field] = element.style[field];
  element.style[field]   = "none";  
 }
 
 if(css)
 {
  Document_CSS_SetClass(element, css);
  style["css"] = css;
 }
 
 Document_Element_SetObject(element, "beforedisable", style);
}




function Document_Element_Restore(element, enable)
{
 var style = Document_Element_GetObject(element, "beforedisable") || {};
 
 for(var field in style["fields"])
 {
  element.style[field] = style["fields"][field];
 }
 
 if(style["css"]) Document_CSS_UnsetClass(element, style["css"]);
 
 if(enable)
 {
  element.style.pointerEvents = "";
 }
}







function Document_Element_FindParent(root, fieldname, fieldvalue, options = [])
{
 var element = root;

 do
 {  
  if(element && element.dataset[fieldname] && (!fieldvalue || element.dataset[fieldname] == fieldvalue)) return element;
 
  element = element.parentElement;
 } 
 while(element);
 
 return undefined;
}




function Document_Element_Children(element, recurse)
{
 if(!element || typeof element != "object") return [];
 
 if(recurse) 
 {
  var collection = element.getElementsByTagName("*"); 
 }
 else 
 {
  var collection = element.children;
 }
 
 var elements = [];
 for(var e of collection)
 {
  elements.push(e);
 }
 
 return elements;
}





function Document_Element_FindChildren(element, fieldname, fieldvalue, options = [])
{
 // RECURSE CHIDREN?
 var recurse = options.includes("recurse")
	
 // SEARCH AN EXACT MATCH?
 var match    = (options.includes("match"));
	
	
 var children = Document_Element_Children(element, recurse);
 var list     = [];

 
 for(var child of children)
 {
  // FIELD MUST EXIST	 
  if(child.dataset[fieldname] !== undefined) 
  {	   
   // IF NO SPECIFIC VALUE REQUESTED OR REQUESTED AND MATCHED...
   if((fieldvalue === undefined) || (child.dataset[fieldname] == fieldvalue)) 
   {
	if(match) return child; else list.push(child);
   }
  }
 }
 
 if(match) return undefined; else return list;
}





function Document_Element_FindChild(element, fieldname, fieldvalue, options = [])
{
 // MUST FIND AN EXACT MATCH
 options.push("match");
 
 var child = Document_Element_FindChildren(element, fieldname, fieldvalue, options);
 
 return child;
}




function Document_Element_Index(element)
{
 if(!element.parentElement) return -1;
 
 var index = 0;
 for(var child of element.parentElement.children)
 {
  if(child == element) return index;
  
  index = index + 1;
 }
}




function Document_Element_ShuffleChildren(element, options = {preservenull:true})
{ 
 var elements = [];
 
 while(element.children.length > 0)
 {
  var child = element.children[0];
  
  elements.push(child); 
  child.remove();
 }
 
 elements.sort((a, b) => 0.5 - Math.random());
 

 element.append(...elements);
}





function Document_Element_ListColliding(element)
{
 var list = [];
 
 if(element.parentElement)
 {
  var element_rect = element.getBoundingClientRect();
  var siblings     = Document_Element_Children(element.parentElement);
  
  for(var sibling of siblings)
  {
   if(sibling != element)
   {
	var sibling_rect = sibling.getBoundingClientRect();
	
	var collides     = Geometry_Rect_Intersect(element_rect, sibling_rect);
	if(collides) list.push(sibling);
   }
  }
  
 }
 
 return list;
}





function Document_Element_SetData(element, id, value)
{
 element.dataset[id] = value;
}




function Document_Element_GetData(element, id)
{
 var value = element.dataset[id];
 
 return value;
}




function Document_Element_SetObject(element, id, obj, options = [])
{
 if(options.includes("propagate"))
 {
  var children = Document_Element_Children(element, true);
  
  for(var child of children) 
  {
   Safe_Set(child, ["data-objects", id], obj);
  }
 }
 
 return Safe_Set(element, ["data-objects", id], obj);
}




function Document_Element_GetObject(element, id)
{
 var obj = Safe_Get(element, ["data-objects", id], undefined);
 
 return obj;
}




function Document_Element_Show(element)
{
 if(!element || !element.style) return;
 
 if(element.style.visibility != "visible") element.style.visibility = "visible";
}





function Document_Element_Hide(element)
{
 if(!element || !element.style) return;
 
 if(element.style.visibility != "hidden") element.style.visibility = "hidden";
}





function Document_Element_Position(element)
{
 var position     = {};
 
 var rect         = element.getBoundingClientRect();
 
 position["left"] = rect.left;
 position["top"]  = rect.top;
 
 //position["left"] = element.offsetLeft;
 //position["top"]  = element.offsetTop;
 
 return position;
}




function Document_Element_Size(element)
{
 var size       = {};
 
 var rect       = element.getBoundingClientRect();
 
 size["width"]  = rect.width;
 size["height"] = rect.height;
 
 return size;
}




function Document_Element_Corner(element, corner)
{
 var rect  = element.getBoundingClientRect();
 var point = Geometry_Rect_Corner(rect, corner);

 return point; 
}




function Document_Element_Center(element)
{ 
 var center     = {};
 
 var rect       = element.getBoundingClientRect();
 center["left"] = rect.left + rect.width  / 2;
 center["top"]  = rect.top  + rect.height / 2;
 
 
 //center["left"] = element.offsetLeft + element.offsetWidth  / 2;
 //center["top"]  = element.offsetTop  + element.offsetHeight / 2;
 
 return center;
}






function Document_Element_ScaleStyle(element, field, scale)
{
 if(element.style[field].includes("%")) return;
 
 element.style[field] = (parseInt(element.style[field]) * scale) + "px";
}




function Document_Element_Scale(element, scale_x, scale_y)
{
 
 for(var field of ["left", "width", "font-size", "border-width", "border-radius", "padding"])
 {
  Document_Element_ScaleStyle(element, field, scale_x);
 }
 
 for(var field of ["top", "height"])
 {
  Document_Element_ScaleStyle(element, field, scale_y);
 }
 
}




function Document_Element_IsVisible(element)
{
 var rect = element.getBoundingClientRect();
 
 return  (rect.top >= 0) && (rect.left >= 0) && (rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)) && (rect.right <= (window.innerWidth || document.documentElement.clientWidth))
}




function Document_Element_Overflows(element, direction = "both")
{
 switch(direction)
 {
  case "both":
	return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
  break;
  
  case "vertical":
	return element.scrollHeight > element.clientHeight;
  break;
  
  case "horizontal":	
	element.scrollWidth > element.clientWidth;
  break;
 }
}



function Document_Element_ScrollSync(dest, source, mode = "both")
{
 Document_Element_SetData(dest,   "scrollsync", mode);
 Document_Element_SetObject(dest, "scrollsync", dest);
 
 dest.onscroll =
 function(event)
 {
  var element = event.currentTarget;
  
  var mode    = Document_Element_GetData(element, "scrollsync");
  var source  = Document_Element_GetObject(element, "scrollsync");
  
  switch(mode)
  {
   case "horizontal":
	 element.scrollLeft = source.scrollLeft; 
   break;
  
   case "vertical":
     element.scrollTop = source.scrollTop; 
   break;
  
   case "both":
	 element.scrollLeft = source.scrollLeft; 
     element.scrollTop  = source.scrollTop;
   break;
  }
 }
 
}




function Document_Element_FitText(element, options = {mode:"vertical"})
{
 var control = options["control"] || element;

 
 // STORE OVERFLOW OF CHECK-ELEMENT AND UNDO IT
 var old_overflow = control.style.overflow;
 control.style.overflow = "auto";

 switch(options["mode"])
 {
  case "vertical":
	var timeout = options["timeout"] || screen.height;
	var height  = Document_Element_Size(element).height;
	
	while(Document_Element_Overflows(control) && (timeout > 0)) 
    {
     element.style.height = height + "px";
     height = height + 1;
	 
	 timeout = timeout - 1;
    }
  break;
 }
 
 // RESTORE OVERFLOW OF CONTROL ELEMENT
 control.style.overflow = old_overflow;
}




function Document_Element_FitContent(element, delta = 0.05, options = {})
{  
 var check = options["check"] || element;


 // STORE OVERFLOW OF CHECK-ELEMENT AND UNDO IT
 var old_overflow = check.style.overflow;
 check.style.overflow = "auto";
 
 
 // PREPARE CHILDREN ELEMENTS
 for(var child of element.children)
 {
  // SET/RESET ZOOM
  if(child.style.zoom == "") child.style.zoom = 1;
  
  if(options["advanced"])
  {
   // STORE A SET OF PROPERTIES AND UNDO THEM
   // SUCH PROPERTIES CAN CAUSE AN ELEMENT TO ALWAYS MAKE ITS CONTAINER OVERFLOW  
   var style    = window.getComputedStyle(child);
   var previous = {};
   for(var key of ["outline", "border", "margin"]) 
   {
    previous[key]    = style[key];
    child.style[key] = "none";
   }
   Document_Element_SetObject(child, "prevstyle", previous);
  }
  
 }
 
 
 
 // TRY EXPANDING SIZE OF ELEMENTS
 if(options["expand"])
 {
  var timeout = 1;
 
  while(!Document_Element_Overflows(check) && (timeout > 0))
  {
   for(var child of element.children)
   {
    child.style.zoom = child.style.zoom + delta;
   }
   
   timeout = timeout - delta;
  }
 }
 
 
 // KEEP REDUCING SIZE OF ELEMENTS
 var timeout = 1;
 
 while(Document_Element_Overflows(check) && (timeout > 0))
 {
  for(var child of element.children)
  {
   child.style.zoom = child.style.zoom - delta;
  }
  
  timeout = timeout - delta;
 }
 
 
 
 // RESTORE OVERFLOW OF CHECK-ELEMENT
 check.style.overflow = old_overflow;
 
 
 if(options["advanced"])
 {
  // RESTORE CHILDREN ELEMENTS' PREVIOUS STYLE
  for(var child of element.children)
  {
   var previous = Document_Element_GetObject(child, "prevstyle");
   
   for(var key in previous) child.style[key] = previous[key];
  }
 }
}



/*
function Document_Element_FitStretch(element, delta = 1)
{
 var container = element.parentElement;
 element.style.transformOrigin = "top left";
 scalex = 0;
 scaley = 0;
 
 var temp = container.style.overflowX;
 container.style.overflowX = "auto";
 while(!Document_Element_Overflows(container, "horizontal"))
 {
  
 }

}
*/


/*
function Document_Element_Protect(element)
{	
 element.attributes["listener-protect"] =
 function(event)
 {
  event.preventDefault();
  event.stopImmediatePropagation(); 
  return false;
 };

 for(var eventname of ["contextmenu", "selectstart"]) element.addEventListener(eventname, element.attributes["listener-protect"]);  
}




function Document_Element_Unprotect(element)
{  
 for(var eventname of ["contextmenu", "selectstart"]) element.removeEventListener(eventname, element.attributes["listener-protect"]);
}
*/






async function Document_Element_Interpolate(element, position, time, onchange)
{
 var thread = Interpolation_Thread(element["style"], position, time, undefined, 
 {
  onchange:
  function(interpolator)
  {
   if(onchange) onchange(element, interpolator);
  }
 });
 
 return thread;
}






async function Document_Element_Zoom(element, factor, time)
{
 var width   = parseFloat(element.style.width)  * factor;
 var height  = parseFloat(element.style.height) * factor;  console.log(factor, width, height);

 var centerx = parseFloat(element.style.left) + (parseFloat(element.style.width)  / 2);
 var centery = parseFloat(element.style.top)  + (parseFloat(element.style.height) / 2);

 var thread = Document_Element_Interpolate(element, {width:width, height:height}, time,
 function(element, interpolator)
 { 
  element.style.left = centerx - parseFloat(element.style.width) / 2;
  element.style.top  = centery - parseFloat(element.style.height) / 2;
 });
 
 return thread;
}







function Document_Elements_Swap(element_a, element_b)
{
 const parent_a = element_a.parentNode;
 const sibling_a = element_a.nextSibling === element_b ? element_a : element_a.nextSibling;

 // Move `nodeA` to before the `nodeB`
 element_b.parentNode.insertBefore(element_a, element_b);

 // Move `nodeB` to before the sibling of `nodeA`
 parent_a.insertBefore(element_b, sibling_a);
};





function Document_Element_Toggle(element, what)
{
 if(!element || !element.style) return;
 
 switch(what)
 {
  case "visibility":
  
	if(element.style.visibility == "visible")  
	{
     element.style.visibility = "hidden"; 
	 return false;
	}
	else 
	{
     element.style.visibility = "visible";
	 return true;
	}
  break;
 }
}







// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                         I M A G E S                                            //
//                                                                                                //
// -----------------------------------------------------------------------------------------------//


async function Document_Image_Load(img, sources, options = {})
{
 var promise = new Promise((resolve, reject) =>
 {
  // IF THERE ARE SOURCES AVAILABLE...
  if(sources && sources.length > 0)
  { 
   // GET FIRST SOURCE AND REMOVE IT FROM THE LIST
   var source = sources[0];
   sources.splice(0, 1);
    
   // TRY 
   img.onerror =
   async function(event)
   {
    var element = event.currentTarget;
    await Document_Image_Load(element, sources, options);
   }
  
   // SPECIAL SOURCES OR JUST ASSIGN
   switch(source)
   {
    case "hide":
 	  img.style.visibility = "hidden";
	  
	  resolve("hide");
    break;
    
    default:
       if(options["nocache"]) source = source + "?c=" + Date.now();
       img.src = encodeURI(source);
	   
	   if(options["waitloaded"])
	   {
		img.onload =
		function()
		{
	     resolve(true);
		}
		
		img.onerror =
		function()
		{
	     resolve(true);
		}
	   }
	   else
	   {
	    resolve(true);
	   }
    break;
   }
   
  }
 });
 
 return promise;
}




async function Document_Image_Resize(data, options = {})
{	
 var promise = new Promise((resolve, reject) =>
 {
  var image = new Image();
 
  // PROCESS THAT WILL BE INITIATED ONCE IMAGE IS ASSIGNED DATA
  image.onload =
  function()
  {
   // CALCULATE SCALE
   var scale = options["scale"] || 1;

   if(options["constraints"])
   { 
    if(image.width  > options["constraints"]["width"])  var wscale = options["constraints"]["width"]  / image.width;  else wscale = 1;
    if(image.height > options["constraints"]["height"]) var hscale = options["constraints"]["height"] / image.height; else hscale = 1;
    
    if(wscale < hscale) scale = wscale; else scale = hscale;
   }
  
   // SCALE THROUGH CANVAS
   var canvas    = document.createElement("canvas");    
   canvas.width  = image.width  * scale;
   canvas.height = image.height * scale;
  
   var context                   = canvas.getContext("2d");
   context.imageSmoothingEnabled = true;
   context.imageSmoothingQuality = options["resample"] || "high";
     
   context.drawImage(image, 0, 0, canvas.width, canvas.height);
  
   // DETERMINE FORMAT
   var format  = options["format"] || "image/png";
   if(!format.includes("image/")) format  = "image/" + format;
   
   // DETERMINE QUALITY
   var quality = options["quality"] || 1;
   
   // ENCODE AND RETURN
   canvas.toBlob(
   function(blob)
   {
	// RETURN RESAMPLED IMAGE
	blob["type"] = format;
	
	resolve(blob);
   }, 
   
   format, quality);
  }
 
  // INITIATE PROCESS
  image.src = data;
 });
 
 return promise;
}




function Document_Image_HasTransparency(image)
{
 var canvas    = document.createElement("canvas");    
 canvas.width  = image.width;
 canvas.height = image.height;
  
 var context   = canvas.getContext("2d");
 context.drawImage(image, 0, 0);
  
 var pixels = context.getImageData(0, 0, image.width, image.height).data;
 var length = Math.floor(pixels.length / 4);
 for(var i = 0; i < length -1; i++)
 {
  alphaindex = (i * 4) + 3;
  if(pixels[alphaindex] != 255)
  {
   return true;
  }
 }
  
 return false; 
}




async function Document_Image_FromFile(file)
{
 var promise = new Promise(async(resolve, reject) =>
 {
  var data = await Storage_File_Read(file, {whole:true});
 
  var image = new Image();
 
  image.onload =
  async function()
  {
   resolve(image);
  }
 
  image.src = data;
 });
 
 return promise;
}







// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                     A N I M A T I O N                                          //
//                                                                                                //
// -----------------------------------------------------------------------------------------------//


async function Document_Element_Animate(element, animation) 
{
 if(!element) return;
 
 var promise = new Promise((resolve, reject) =>
 {
  element.addEventListener('animationend', 
  function() 
  {
   if(element.style.animationFillMode != "forwards") element.style.animation = "";
   resolve();
  }, 
  {once:true, capture:false});
  
  // FIRE UP ANIMATION
  element.style.animation = animation;
 });
 
 return promise;
}




async function Document_Element_Transition(element, style, mode) 
{
 var promise = new Promise((resolve, reject) =>
 {
  element.addEventListener('transitionend', 
  function() 
  {
   element.style.transition = "";
   resolve();
  }, 
  {once:true, capture:false});
  
  // SET UP TRANSITION
  element.style.transition = "all " + mode;
  
  // FIRE UP THE TRANSITION BY ALTERING THE ELEMENT:
  // IF STYLE IS A STRING, THEN WE ALTER THE ELEMENT BY SWITCHING A CLASS ON/OFF
  if(typeof style == "string") 
  {
   Document_CSS_SwitchClass(element, style);
  }
  else 
  // OTHERWISE WE TREAT STYLE AS AN OBJECT CONTAINING UPDATES TO THE ELEMENT'S STYLE
  {
   Object.assign(element.style, style); 
  }
 });
 
 return promise;
}




async function Document_Element_AnimateChildren(element, animation, config = {interval:0, delay:0, onstart:false, onend:false}) 
{
 var promise = new Promise((resolve, reject) =>
 {
  var n        = 0;
  var delay    = config["delay"]    || 0;
  var interval = config["interval"] || 0;
 
  var done     = 0;
 
  for(let child of element.children)
  {
   if(config["appear"])    element.style.visibility = "hidden";
	   
   setTimeout(
   async function()
   {
    if(config["onstart"]) config["onstart"](child);
    
    await Document_Element_Animate(child, animation);
    
	if(config["appear"])    element.style.visibility = "visible";
	
    if(config["onend"]) await config["onend"](child);
	
	if(config["disappear"]) element.style.visibility = "hidden";
	
    done++;
    if(done == element.children.length -1)
    {
 	 resolve();
    }
   }, 
   delay + (interval * n));
  
   n++; 
  }
 });
 
 return promise;
}






// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                         I N P U T                                              //
//                                                                                                //
// -----------------------------------------------------------------------------------------------//

function Document_Input_Set(element, value)
{
 switch(element.type)
 {
  case "text":
  case "textarea":
	element.value = value;
  break;
  
  case "select-one":
	element.value = value;
  break;
  
  
  case "select-multiple":
    for(var option of element.options) 
    {
     option.selected = value.includes(option.value);
    }
  break;
  
  
  case "date":
	element.value = Date_To_Input(value);
  break;
  
  
  default:
	element.value = value;
  break;
 }
}




function Document_Input_Get(element)
{
 switch(element.type)
 {
  case "text":
  case "textarea":
	var value = element.value;
  break;
  
  
  case "select-one":
	var value = element.value;
  break;
  
  
  case "select-multiple":
	var value = [];
 
    for(var option of element.options) 
    {
     if(option.selected) value.push(option.value);
    }
  break;
  
  
  case "date":
	var value = Date_From_Input(element.value);
  break;
  
  
  default:
	var value = element.value;
  break;
 }
 
 return value;
}





// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                       S E L E C T                                              //
//                                                                                                //
// -----------------------------------------------------------------------------------------------//


function Document_Select_Clear(select)
{
 select.innerHTML = "";
}



function Document_Select_SelectedOption(select)
{
 var index = select.selectedIndex;
 if(index == -1) return undefined;
 
 var option = select.options[index];
 
 return option;
}



function Document_Select_SelectedValues(select, format = "array")
{
 var options = select.selectedOptions;
 
 switch(format)
 {
  case "array":
	var values  = [];
 
    for(var option of options) 
    {
     values.push(option.value);
    }
  break;
  
  case "object":
	var values = {};
	
	for(var option of options) 
    {
     values[option.value] = true;
    }
  break;
 }
 
 return values;
}



function Document_Select_AddOption(select, text, value, obj)
{
 var option   = new Option();
 option.text  = text;
 option.value = value;
 
 select.appendChild(option);
 
 if(obj)
 {
  Document_Element_SetObject(option, "object", obj);
 }
 
 return option;
}




function Document_Select_OptionsFromObjects(select, objects, textfield = false, valuefield = false)
{
 for(var i in objects)
 {
  var item = objects[i];
  
  var option   = new Option();
  
  if(!textfield)  option.text  = i;  else option.text  = item[textfield];
  if(!valuefield) option.value = i; else option.value = item[valuefield];
  
  select.appendChild(option);
 }
}


function Document_Select_OptionsFromValues(select, texts = [], values = [])
{
 for(var i in values)
 {
  var option   = new Option();
  
  option.text  = texts[i] || "";
  option.value = values[i];
  
  select.appendChild(option);
 }
}




function Document_Select_InsertOption(select, text, value, obj)
{
 if(!select.firstChild) 
 {
  Document_Select_AddOption(select, text, value, obj);
  return;
 }
 
 
 var option   = new Option();
 option.text  = text;
 option.value = value;
 
 select.insertBefore(option, select.firstChild);
 
 if(obj)
 {
  Document_Element_SetObject(option, "object", obj);
 }
 
 return option;
}





function Document_Select_OptionByObject(select, obj)
{
 for(var option of select.options)
 {
  if(Document_Element_GetObject(option, "object") == obj) return option;
 }
}




function Document_Select_OptionByValue(select, value)
{
 for(var option of select.options)
 {
  if(option.value == value) return option;
 }
}




function Document_Select_ClearSelection(select)
{
 for(var option of select.options) option.selected = false;
}





function Document_Select_SelectByValue(select, value)
{
 if(typeof value == "array")
 {
  for(var option of select.options) option.selected = (value.includes(option.value));
 }
 else
 {
  for(var option of select.options) option.selected = (option.value == value);
 }
}




function Document_Select_SetMulti(select)
{
 // FUNCTION TO SETUP OPTIONS TO PREVENT DEFAULT BEHAVIOR
 var setupoptions = 
 function()
 {
  for(var option of select.options)
  {
   option.onmousedown =  
   function(event)
   {
    event.preventDefault();
	var position = select.scrollTop;
	
	event.target.selected = !event.target.selected;
	setTimeout(function(){select.scrollTop = position}, 0);

    select.focus();
	
	return false;
   }
   
   option.onmousemove =
   function(event)
   {
	event.preventDefault();  
   }
  }
 }

 
 // OBSERVER TO CONTROL IF ANY OPTIONS ARE ADDED IN THE FUTURE
 var observer = new MutationObserver(
 function(mutations)
 {  
  for(var mutation of mutations)
  {   
   if(mutation.type == "childList")
   {
    // REFRESH OPTIONS SETUP
    setupoptions();
	
	break;
   }
  }
 });
 
 
 // SETUP CURRENT OPTIONS AND OBSERVE FOR FUTURE CHANGES
 setupoptions();
 //observer.observe(select, {childList:true});
}




function Document_Select_Sort(select, options = {field:"text", mode:"ascending"})
{
 var items = [];
 for(var option of select.options) items.push(option);
 
 var field = options["field"];
 var mode  = options["mode"];
 
 items.sort(
 function(a,b)
 {
  switch(mode)
  {
   case "ascending":
	  if (a[field] > b[field]) return 1;
	  else if (a[field] < b[field]) return -1;
	  else return 0;
   break;
   
   case "descending":
	  if (a[field] < b[field]) return 1;
	  else if (a[field] > b[field]) return -1;
	  else return 0;
   break;
  }
 }); 
  
 
 select.innerHTML = "";
 select.append(...items);
}







// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                           C S S                                                //
//                                                                                                //
// -----------------------------------------------------------------------------------------------//


function Document_CSS_GetClasses(element)
{
 var classes = [];
 
 for(var cssclass of element.classList)
 {
  classes.push(cssclass);
 }
 
 return classes; 
}





function Document_CSS_SetClasses(element, classes)
{
 element.className = "";
 
 for(var cssclass of classes)
 {
  Document_CSS_SetClass(element, cssclass);
 }
 
}





function Document_CSS_SwitchClass(element, cssclass)
{
 if(element.classList.contains(cssclass)) element.classList.remove(cssclass); else element.classList.add(cssclass); 
}




function Document_CSS_SetClass(element, cssclass)
{
 if(!element.classList.contains(cssclass)) element.classList.add(cssclass); 
}



function Document_CSS_UnsetClass(element, cssclass)
{
 while(element.classList.contains(cssclass)) element.classList.remove(cssclass); 
}




function Document_CSS_SetClasses(element, classes)
{
 for(var cssclass of classes) Document_CSS_SetClass(element, cssclass);
}




function Document_CSS_PurgeClasses(element, tag)
{
 var purge = [];
 
 for(var cssclass of element.classList)
 {
  if(cssclass.startsWith(tag)) purge.push(cssclass);
 }
 
 for(var cssclass of purge) element.classList.remove(cssclass);
 
 return purge;
}




function Document_CSS_GetValue(selector, style, sheet) 
{
 selector = "." + selector;	
	
 var sheets = typeof sheet !== 'undefined' ? [sheet] : document.styleSheets;
 
 for(var i = 0, l = sheets.length; i < l; i++) 
 {
  var sheet = sheets[i];
 
  if(!sheet.cssRules) continue; 
  
  for(var j = 0, k = sheet.cssRules.length; j < k; j++) 
  {
   var rule = sheet.cssRules[j];
   if(rule.selectorText && rule.selectorText.split(',').indexOf(selector) !== -1) 
   {
    return rule.style[style];
   }
  }
 }
 
 return null;
}





function Document_CSS_GetVariable(name)
{
 var style = getComputedStyle(document.documentElement);
 var value = style.getPropertyValue("--" + name);
 
 return value;
}



function Document_CSS_SetVariable(name, value)
{
 document.documentElement.style.setProperty("--" + name, value);
}



function Document_CSS_Get(name)
{
 return Document_CSS_GetVariable(name) || Document_CSS_GetValue(name) || name;
}



function Document_CSS_Percentage(a, b)
{
 var p = ((parseFloat(a) / parseFloat(b)) * 100) + "%";

 return p;
}








// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                        F O N T S                                               //
//                                                                                                //
// -----------------------------------------------------------------------------------------------//


function Document_Fonts_List()
{
 var list = [];
 
 var fonts = document.fonts.entries();
 do
 {
  var item = fonts.next();
   
  if(!item.done)
  {
   list.push(item.value[0]["family"]);
  }
 }
 while(!item.done)
 
 return list;
}









// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                  P R O C E S S I N G                                           //
//                                                                                                //
// -----------------------------------------------------------------------------------------------//



function Document_Conditional_Class(container, cssclass, condition_data, condition_value)
{
 if(typeof cssclass == "string")
 {
  var cssclass = [cssclass];
 }
 
 
 if(!container.children) var elements = container;
 else
 {
  var elements = Document_Element_Children(container);
 }
 
 
 for(var element of elements)
 {
  var select = undefined;
  
  // DETERMINE WHETHER TO SELECT OR NOT
  switch(typeof condition_data)
  {
   case "function":
	select = condition_data(element);
   break;
   
   case "object":
	select = (element == condition_data)
   break;

   case "string":
	select = (Document_Element_GetData(element, condition_data) == condition_value);
   break;
  }
  
  // APPLY SELECTION
  switch(select)
  {
   case true:
     for(var css of cssclass) Document_CSS_SetClass(element, css);
   break;
  
   case false:  
	 for(var css of cssclass) Document_CSS_UnsetClass(element, css);
   break;
  }
  
 }
 
}



function Document_Conditional_Style(container, style_selected, style_unselected, condition_data, condition_value)
{
 if(!container.children) var elements = container;
 else
 {
  var elements = Document_Element_Children(container);
 }
 
 
 for(var element of elements)
 {
  var select = undefined;
  
  // DETERMINE WHETHER TO SELECT OR NOT
  switch(typeof condition_data)
  {
   case "function":
	select = condition_data(element);
   break;
   
   case "object":
	select = (element == condition_data)
   break;

   case "string":
	select = (Document_Element_GetData(element, condition_data) == condition_value);
   break;
  }
  
  // APPLY SELECTION
  switch(select)
  {
   case true:
     Object.assign(element.style, style_selected);
   break;
  
   case false:  
	 Object.assign(element.style, style_unselected);
   break;
  }
  
 }
 
 
}





// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                      H A N D L E R S                                           //
//                                                                                                //
// -----------------------------------------------------------------------------------------------//


function Document_Handler_FileDrop(element, options, ondrop)
{
 element.ondragover = 
 function(event)
 {
  event.preventDefault();
 }
 
 element.ondrop = 
 function(event)
 {
  event.preventDefault();
  
  var files = [];
  for(var item of event.dataTransfer.items)
  {
   var file = item.getAsFile();
   files.push(file);
  }
  
  ondrop(files);
 }
}






function Document_Handler_Paste(events = {}, target = document)
{ console.log(target);
 target.onpaste = 
 function(event)
 { 
  // SCAN CLIPBOARD ITEMS
  for(var item of event.clipboardData.items)
  {
   // IF THERE IS AN EVENT ASSOCIATED WITH THE CLIPBOARD ITEM TYPE, CALL IT
   for(var key in events)
   {
    if(item.type.indexOf(key) === 0)
    {		 
     events[key](item, event);
    }  
   }
   
  }
 }
 
}





function Document_Handler_EnterKey(element, onenter)
{
	
 element.addEventListener("keyup", 
 function(event) 
 {
  event.preventDefault();
  if(event.keyCode == 13) onenter();
 });
 
}



function Document_Handler_SelectionRectangle(container, style, onselecting, onselected)
{
 container.style.position  = "relative";
 container.style.draggable = false;
 container.ondragstart     = function(){return false};
 
 container.addEventListener("mousedown",
 function(event)
 {
  var rectangle = Document_Element_GetObject(container, "selectionrectangle");
  if(rectangle) rectangle.remove();
  
  var rectangle = document.createElement("div");
  Document_CSS_SetClass(rectangle, style);
  rectangle.style.position      = "absolute";
  rectangle.style.zIndex        = 10000;
  rectangle.style.pointerEvents = "none"; 
  
  var rect = container.getBoundingClientRect();
  rectangle.style.left = (event.clientX - rect.left); 
  rectangle.style.top  = (event.clientY - rect.top);
  
  Document_Element_SetObject(container, "selectionrectangle", rectangle);
  
  container.appendChild(rectangle);
 });
 
 
 
 container.addEventListener("mousemove",
 function(event)
 {
  var rectangle = Document_Element_GetObject(container, "selectionrectangle");
  if(!rectangle) return;
  
  var rect = container.getBoundingClientRect();
  rectangle.style.width  = (event.clientX - rect.left) - parseInt(rectangle.style.left);
  rectangle.style.height = (event.clientY - rect.top)  - parseInt(rectangle.style.top);
  
  var list = Document_Element_ListColliding(rectangle);
  
  if(onselecting) onselecting(rectangle, list);
 });
 
 
 
 container.addEventListener("mouseup",
 function(event)
 {
  var rectangle = Document_Element_GetObject(container, "selectionrectangle");
  if(!rectangle) return;
  
  rectangle.remove();
  
  Document_Element_SetObject(container, "selectionrectangle", false);
  
  if(onselected) onselected(rectangle);
 });
 
}





function Document_Handler_DragSwap(elements, highlight, onswap)
{
 for(var element of elements)
 {
  element.draggable = true;	 
	 
  // START DRAGGING
  element.ondrag =
  function(event)
  {
   var element = event.currentTarget;
    
   utils["dragging"]        = element;
   element.style.visibility = "hidden";
   
   event.preventDefault();
  }
 
 
 
  // DRAGGING OVER
  element.ondragover =
  function(event)
  {
   var element = event.currentTarget;
   
   if(highlight) Document_CSS_SetClass(element, highlight);
   
   event.preventDefault();
  }
  
  
  
  // DRAG LEAVE
  element.ondragleave =
  function(event)
  {
   var element = event.currentTarget;
   
   if(highlight) Document_CSS_UnsetClass(element, highlight);
   
   event.preventDefault();
  }

 
  // DROPPING
  element.ondrop =
  function(event)
  {
   var dragged = utils["dragging"]; 
   var dropped = event.currentTarget;
   
   //dragged.parentNode.insertBefore(dragged, dropped);
   Document_Elements_Swap(dragged, dropped);
   
   if(onswap) onswap(
   {
    success: true,   
	dragged: dragged,
    dropped: dropped    
   });
   
   if(highlight) Document_CSS_UnsetClass(dropped, highlight);
   
   utils["lastdrag"] = true;
   delete utils["dragging"];
   
   event.preventDefault();
  }
  
  
  // END OF DRAGGING
  element.ondragend =
  function(event)
  {
   var element = event.currentTarget;
   
   element.style.visibility = "visible";
   
   if(!utils["lastdrag"] && onswap) onswap(
   {
	success: false,
	dragged: element
   });
   
   delete utils["lastdrag"];
   delete utils["dragging"];
   
   event.preventDefault();
  }
  
 
 }
}






function Document_Handler_DragSwapParent(containers, highlight, onswap)
{
 for(let container of containers)
 {
  var elements = Document_Element_Children(container);
  
  for(var element of elements)
  {
   element.draggable = true;
   
   // BEGIN ELEMENT DRAGGING
   element.ondrag =
   function(event)
   {
    var element = event.currentTarget;
    
    utils["dragging"]        = element;
    element.style.visibility = "hidden";

    event.preventDefault();
   }
   
   // CANCELLED ELEMENT DRAGGING
   element.ondragend =
   function(event)
   {
    var element = event.currentTarget;
   
    element.style.visibility = "visible";
   
    if(!utils["lastdrag"] && onswap) onswap(
    {
 	 success: false,
	 dragged: element
    });
   
    delete utils["lastdrag"];
    delete utils["dragging"];
   
    event.preventDefault();
   }
  } 
 
 
  // DRAGGING OVER CONTAINER
  container.ondragover =
  function(event)
  {
   var dropon = event.currentTarget;
   
   if(highlight) Document_CSS_SetClass(dropon, highlight);
   
   event.preventDefault();
  }
  
  
  
  // DRAGGIN AWAY FROM CONTAINER
  container.ondragleave =
  function(event)
  {
   var dropon = event.currentTarget;
   
   if(highlight) Document_CSS_UnsetClass(dropon, highlight);
   
   event.preventDefault();
  }

 
  // DROPPING OVER CONTAINER
  container.ondrop =
  function(event)
  {
   var element = utils["dragging"]; 
   var dropon  = event.currentTarget;
   var from    = element.parentElement;
   
   from.removeChild(element);
   dropon.appendChild(element);
   
   if(onswap) onswap(
   {
    success:   true,   
	dragged:   element,
	from:      from,
    container: dropon,    
   });
   
   if(highlight) Document_CSS_UnsetClass(dropon, highlight);
   
   utils["lastdrag"] = true;
   delete utils["dragging"];
   
   event.preventDefault();
  }
  
 
 }
}




function Document_Handler_DragVirtual(sources, destinations, highlight, ondragstart, ondragdrop)
{
 // SET ALL SOURCES TO BE DRAGGABLE
 for(var source of sources)
 {
  source.draggable = true;   
   
  source.ondragstart = 
  function(event)
  {
   if(ondragstart) ondragstart(event);
  }
 }
 
 
 // SET ALL DESTINATION ELEMENTS TO ACCEPT RECEIVING
 for(var destination of destinations)
 {
  destination.ondragover =
  function(event)
  {
   var element = event.currentTarget;
   if(highlight) Document_CSS_SetClass(element, highlight);
	
   event.preventDefault();
  }
  
  destination.ondragleave = 
  function(event)
  {
   var element = event.currentTarget;
   if(highlight) Document_CSS_UnsetClass(element, highlight);
  }
  
  destination.ondrop = 
  function(event)
  {
   var element = event.currentTarget;
   if(highlight) Document_CSS_UnsetClass(element, highlight);
   
   if(ondragdrop) ondragdrop(event);
  }
 }
 
}





function Document_Handler_Dragging(container, ondragstart, onmouseup, onmousemove)
{
 container.style.position = "relative";
 var crect    = container.getBoundingClientRect();

 var elements = Document_Element_Children(container); 
 for(var element of elements) 
 {
  var rect = element.getBoundingClientRect();
  
  element.style.position = "absolute";
  element.style.left     = rect.left - crect.left;
  element.style.top      = rect.top  - crect.top;  
  
  console.log(element.style.left, element.style.top);
 }
	
	
 container.ondragstart = 
 function(event)
 {
  event.preventDefault();
 
  var container = event.currentTarget;
  var element   = event.srcElement;
  
  if(element == container) return;
  
  Document_Element_SetObject(container, "dragging", element);
  Document_CSS_SwitchClass(element, "style-drag-dragging");
 }
 
 
 container.onmouseup = 
 function(event)
 {
  var container = event.currentTarget;
  var element = Document_Element_GetObject(container, "dragging");
  
  if(element)
  {
   Document_Element_SetObject(container, "dragging", undefined);
   Document_CSS_SwitchClass(element, "style-drag-dragging");
  }
 }
 
 
 container.onmousemove = 
 function(event)
 { 
  var container = event.currentTarget;
  var element = Document_Element_GetObject(container, "dragging");
  
  if(element)
  {
   var crect = container.getBoundingClientRect();
   var erect = element.getBoundingClientRect();
  
   var left = erect.left - crect.left;
   var top  = erect.top  - crect.top;   
   
   element.style.left = parseFloat(left) + event.movementX;
   element.style.top  = parseFloat(top)  + event.movementY;   
  }
 }
 
}




function Document_Handler_ScrollReduce(scroller, target, config = {direction:"vertical", size:"0px", threshold:0.2, time:1})
{
 // WHEN *SCROLLER* SCROLLS BEYOND *THRESHOLD*, IN *DIRECTION*
 // TAKE *TARGET* AND SHRINK IT TO *SIZE* IN *TIME* SECONDS
 target.style.transition = "all " + config["time"] + "s";
 
 scroller.addEventListener("scroll",
 function(event)
 {
  if(config["direction"] == "vertical") 
  {
   var field    = "height";
   var position = "scrollTop";
  }
  else
  {
   var field    = "width"; 
   var position = "scrollLeft";
  }
  
  var amount  = scroller[position] / scroller.getBoundingClientRect()[field];   console.log(amount);
  var reduced = Document_Element_GetData(target, "scrollreduced");
  
  if(!reduced && amount >= config["threshold"])
  {
   Document_Element_SetData(target, "beforescrollreduce", target.style[field]);
   
   target.style[field] = config["size"];   
   Document_Element_SetData(target, "scrollreduced", true);
  }
  else
  if(reduced && amount < config["threshold"])  
  {
   target.style[field] = Document_Element_GetData(target, "beforescrollreduce");
   Document_Element_SetData(target, "scrollreduced", false);
  }
  
 }, true);
 
 //temp2.scrollTop / temp2.getBoundingClientRect().height
}





function Document_Handler_KeyFilter(element, keys)
{
 // PREVENT TYPING
 element.onkeydown = 
 function(event)
 { 
  if(keys.includes(event.key)) return false;
 }

 // PREVENT PASTING
 /*
 element.onpaste =
 function(event)
 {  
  var text = (event.clipboardData || window.clipboardData).getData("text");
  for(var key of keys) text = text.replaceAll(key, "");

  const selection = window.getSelection();
  if (!selection.rangeCount) return false;
  
  selection.deleteFromDocument();
  selection.getRangeAt(0).insertNode(document.createTextNode(text));
 
  event.preventDefault();
 }
 */
}// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                         I N P U T                                              // 
//                                                                                                //
// -----------------------------------------------------------------------------------------------//

var input = {};









// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                      K E Y B O A R D                                           // 
//                                                                                                //
// -----------------------------------------------------------------------------------------------//

const KEY_BACKSP = 8;
const KEY_DEL    = 46;
const KEY_ESC    = 27;
const KEY_END    = 35;
const KEY_PGUP   = 33;
const KEY_PGDN   = 34;
const KEY_LSHIFT = 16;
const KEY_LALT   = 18;
const KEY_LEFT   = 37;
const KEY_RIGHT  = 39;
const KEY_UP     = 38;
const KEY_DOWN   = 40;
const KEY_PLUS   = 107;
const KEY_MINUS  = 109;
const KEY_LCTRL  = 17;
const KEY_RCTRL  = 17;


input["keyboard"]             = {};
input["keyboard"]["keys"]     = {};
input["keyboard"]["codes"]    = {};




function Input_Keyboard_Assign(element, onupdate)
{
 input["keyboard"]["controller"]  = element;
 input["keyboard"]["onupdate"]    = onupdate;
 
 input["keyboard"]["controller"].onkeydown = Input_Keyboard_Down;
 input["keyboard"]["controller"].onkeyup   = Input_Keyboard_Up;
 
 /*
 window.addEventListener("keydown", Input_Keyboard_Down, true);
 window.addEventListener("keyup",   Input_Keyboard_Up,   true);
 */
}



function Input_Keyboard_Release()
{
 if(!input["keyboard"]["controller"]) return;
	 
 input["keyboard"]["controller"].onkeydown = false;
 input["keyboard"]["controller"].onkeyup   = false;
 
 input["keyboard"]["controller"]  = false;
 input["keyboard"]["onupdate"]    = false;
}




function Input_Keyboard_Lock()
{
 input["keyboard"]["locked"] = true;
}




function Input_Keyboard_Unlock()
{
 input["keyboard"]["locked"] = false;
}




function Input_Keyboard_Update()
{
 if(input["keyboard"]["onupdate"]) 
 {
  input["keyboard"]["onupdate"]();
 }
}





function Input_Keyboard_Down(event)
{
 if(input["keyboard"]["locked"]) return;
 
 input["keyboard"]["keys"][String.fromCharCode(event.keyCode)] = true;
 input["keyboard"]["codes"][event.keyCode]                     = true;
 
 Input_Keyboard_Update();
}





function Input_Keyboard_Up(event)
{
 if(input["keyboard"]["locked"]) return;
 
 delete input["keyboard"]["keys"][String.fromCharCode(event.keyCode)];
 delete input["keyboard"]["codes"][event.keyCode];
 
 Input_Keyboard_Update();
}





function Input_Keyboard_Pressed(key, codes)
{
 if(codes) for(var code of codes) if(!input["keyboard"]["codes"][code]) return false;
 
 if(key && !input["keyboard"]["keys"][key]) return false;
 
 return true;
}






function Input_Keyboard_Reset()
{
 input["keyboard"]["keys"]  = {};
 input["keyboard"]["codes"] = {};
}






// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                           M O U S E                                            // 
//                                                                                                //
// -----------------------------------------------------------------------------------------------//




function Input_Mouse_Bind(element, onmousemove, onmouseup, onmousedown, onwheel)
{
 // MOUSE MOVE
 element.onmousemove = 
 function(event)
 {
  var element = event.currentTarget;
  if(!element) return;
  
  var rect   = element.getBoundingClientRect();
  var x      = event.clientX - rect.left;
  var y      = event.clientY - rect.top;
 
  var dx = x - parseInt(element.getAttribute("lastx") || 0);
  var dy = y - parseInt(element.getAttribute("lasty") || 0);
 
  element.setAttribute("lastx", x)
  element.setAttribute("lasty", y)
  
  var button = element.getAttribute("button");
 
  if(onmousemove) onmousemove(dx, dy, button);
 }


 // MOUSE DOWN 
 element.onmousedown = 
 function(event)
 {
  var element = event.currentTarget;
  if(!element) return;
  
  element.setAttribute("mousedown", true);
  element.setAttribute("button",    event.button);
  
  if(onmousedown) onmousedown(element);
 }
 
 
 // MOUSE UP
 element.onmouseup = 
 function(event)
 {
  var element = event.currentTarget;
  if(!element) return;
  
  element.setAttribute("mousedown", false);
  element.setAttribute("button",    false);

  if(onmouseup) onmouseup(element);
 }
 
}








// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                           T O U C H                                            // 
//                                                                                                //
// -----------------------------------------------------------------------------------------------//


function Input_Touch_Handler(event)
{
 var touches = event.changedTouches;
 var first   = touches[0];
 var type    = "";
 
 switch(event.type)
 {
  case 
	"touchstart": 
		type = "mousedown"; 
	break;
        
	case "touchmove":  
		type = "mousemove"; 
	break;        
        
	case "touchend":   
		type = "mouseup";   
	break;
    
	default:           
	return;
 }

 // initMouseEvent(type, canBubble, cancelable, view, clickCount, 
 //                screenX, screenY, clientX, clientY, ctrlKey, 
 //                altKey, shiftKey, metaKey, button, relatedTarget);

 var simulatedEvent = document.createEvent("MouseEvent");
 
 simulatedEvent.initMouseEvent(type, true, true, window, 1, first.screenX, first.screenY, first.clientX, first.clientY, false, false, false, false, 0/*left*/, null);

 first.target.dispatchEvent(simulatedEvent);
 event.preventDefault();
}





function Input_Touch_Remap(element) 
{
 if(!element) var element = document;
 
 element.addEventListener("touchstart",  Input_Touch_Handler, true);
 element.addEventListener("touchmove",   Input_Touch_Handler, true);
 element.addEventListener("touchend",    Input_Touch_Handler, true);
 element.addEventListener("touchcancel", Input_Touch_Handler, true);    
}





function Input_Touch_Unmap(element)
{
 if(!element) var element = document;
 
 element.removeEventListener("touchstart",  Input_Touch_Handler, true);
 element.removeEventListener("touchmove",   Input_Touch_Handler, true);
 element.removeEventListener("touchend",    Input_Touch_Handler, true);
 element.removeEventListener("touchcancel", Input_Touch_Handler, true);    
}/*!
    localForage -- Offline Storage, Improved
    Version 1.10.0
    https://localforage.github.io/localForage
    (c) 2013-2017 Mozilla, Apache License 2.0
*/
!function(a){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=a();else if("function"==typeof define&&define.amd)define([],a);else{var b;b="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,b.localforage=a()}}(function(){return function a(b,c,d){function e(g,h){if(!c[g]){if(!b[g]){var i="function"==typeof require&&require;if(!h&&i)return i(g,!0);if(f)return f(g,!0);var j=new Error("Cannot find module '"+g+"'");throw j.code="MODULE_NOT_FOUND",j}var k=c[g]={exports:{}};b[g][0].call(k.exports,function(a){var c=b[g][1][a];return e(c||a)},k,k.exports,a,b,c,d)}return c[g].exports}for(var f="function"==typeof require&&require,g=0;g<d.length;g++)e(d[g]);return e}({1:[function(a,b,c){(function(a){"use strict";function c(){k=!0;for(var a,b,c=l.length;c;){for(b=l,l=[],a=-1;++a<c;)b[a]();c=l.length}k=!1}function d(a){1!==l.push(a)||k||e()}var e,f=a.MutationObserver||a.WebKitMutationObserver;if(f){var g=0,h=new f(c),i=a.document.createTextNode("");h.observe(i,{characterData:!0}),e=function(){i.data=g=++g%2}}else if(a.setImmediate||void 0===a.MessageChannel)e="document"in a&&"onreadystatechange"in a.document.createElement("script")?function(){var b=a.document.createElement("script");b.onreadystatechange=function(){c(),b.onreadystatechange=null,b.parentNode.removeChild(b),b=null},a.document.documentElement.appendChild(b)}:function(){setTimeout(c,0)};else{var j=new a.MessageChannel;j.port1.onmessage=c,e=function(){j.port2.postMessage(0)}}var k,l=[];b.exports=d}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],2:[function(a,b,c){"use strict";function d(){}function e(a){if("function"!=typeof a)throw new TypeError("resolver must be a function");this.state=s,this.queue=[],this.outcome=void 0,a!==d&&i(this,a)}function f(a,b,c){this.promise=a,"function"==typeof b&&(this.onFulfilled=b,this.callFulfilled=this.otherCallFulfilled),"function"==typeof c&&(this.onRejected=c,this.callRejected=this.otherCallRejected)}function g(a,b,c){o(function(){var d;try{d=b(c)}catch(b){return p.reject(a,b)}d===a?p.reject(a,new TypeError("Cannot resolve promise with itself")):p.resolve(a,d)})}function h(a){var b=a&&a.then;if(a&&("object"==typeof a||"function"==typeof a)&&"function"==typeof b)return function(){b.apply(a,arguments)}}function i(a,b){function c(b){f||(f=!0,p.reject(a,b))}function d(b){f||(f=!0,p.resolve(a,b))}function e(){b(d,c)}var f=!1,g=j(e);"error"===g.status&&c(g.value)}function j(a,b){var c={};try{c.value=a(b),c.status="success"}catch(a){c.status="error",c.value=a}return c}function k(a){return a instanceof this?a:p.resolve(new this(d),a)}function l(a){var b=new this(d);return p.reject(b,a)}function m(a){function b(a,b){function d(a){g[b]=a,++h!==e||f||(f=!0,p.resolve(j,g))}c.resolve(a).then(d,function(a){f||(f=!0,p.reject(j,a))})}var c=this;if("[object Array]"!==Object.prototype.toString.call(a))return this.reject(new TypeError("must be an array"));var e=a.length,f=!1;if(!e)return this.resolve([]);for(var g=new Array(e),h=0,i=-1,j=new this(d);++i<e;)b(a[i],i);return j}function n(a){function b(a){c.resolve(a).then(function(a){f||(f=!0,p.resolve(h,a))},function(a){f||(f=!0,p.reject(h,a))})}var c=this;if("[object Array]"!==Object.prototype.toString.call(a))return this.reject(new TypeError("must be an array"));var e=a.length,f=!1;if(!e)return this.resolve([]);for(var g=-1,h=new this(d);++g<e;)b(a[g]);return h}var o=a(1),p={},q=["REJECTED"],r=["FULFILLED"],s=["PENDING"];b.exports=e,e.prototype.catch=function(a){return this.then(null,a)},e.prototype.then=function(a,b){if("function"!=typeof a&&this.state===r||"function"!=typeof b&&this.state===q)return this;var c=new this.constructor(d);if(this.state!==s){g(c,this.state===r?a:b,this.outcome)}else this.queue.push(new f(c,a,b));return c},f.prototype.callFulfilled=function(a){p.resolve(this.promise,a)},f.prototype.otherCallFulfilled=function(a){g(this.promise,this.onFulfilled,a)},f.prototype.callRejected=function(a){p.reject(this.promise,a)},f.prototype.otherCallRejected=function(a){g(this.promise,this.onRejected,a)},p.resolve=function(a,b){var c=j(h,b);if("error"===c.status)return p.reject(a,c.value);var d=c.value;if(d)i(a,d);else{a.state=r,a.outcome=b;for(var e=-1,f=a.queue.length;++e<f;)a.queue[e].callFulfilled(b)}return a},p.reject=function(a,b){a.state=q,a.outcome=b;for(var c=-1,d=a.queue.length;++c<d;)a.queue[c].callRejected(b);return a},e.resolve=k,e.reject=l,e.all=m,e.race=n},{1:1}],3:[function(a,b,c){(function(b){"use strict";"function"!=typeof b.Promise&&(b.Promise=a(2))}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{2:2}],4:[function(a,b,c){"use strict";function d(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function e(){try{if("undefined"!=typeof indexedDB)return indexedDB;if("undefined"!=typeof webkitIndexedDB)return webkitIndexedDB;if("undefined"!=typeof mozIndexedDB)return mozIndexedDB;if("undefined"!=typeof OIndexedDB)return OIndexedDB;if("undefined"!=typeof msIndexedDB)return msIndexedDB}catch(a){return}}function f(){try{if(!ua||!ua.open)return!1;var a="undefined"!=typeof openDatabase&&/(Safari|iPhone|iPad|iPod)/.test(navigator.userAgent)&&!/Chrome/.test(navigator.userAgent)&&!/BlackBerry/.test(navigator.platform),b="function"==typeof fetch&&-1!==fetch.toString().indexOf("[native code");return(!a||b)&&"undefined"!=typeof indexedDB&&"undefined"!=typeof IDBKeyRange}catch(a){return!1}}function g(a,b){a=a||[],b=b||{};try{return new Blob(a,b)}catch(f){if("TypeError"!==f.name)throw f;for(var c="undefined"!=typeof BlobBuilder?BlobBuilder:"undefined"!=typeof MSBlobBuilder?MSBlobBuilder:"undefined"!=typeof MozBlobBuilder?MozBlobBuilder:WebKitBlobBuilder,d=new c,e=0;e<a.length;e+=1)d.append(a[e]);return d.getBlob(b.type)}}function h(a,b){b&&a.then(function(a){b(null,a)},function(a){b(a)})}function i(a,b,c){"function"==typeof b&&a.then(b),"function"==typeof c&&a.catch(c)}function j(a){return"string"!=typeof a&&(console.warn(a+" used as a key, but it is not a string."),a=String(a)),a}function k(){if(arguments.length&&"function"==typeof arguments[arguments.length-1])return arguments[arguments.length-1]}function l(a){for(var b=a.length,c=new ArrayBuffer(b),d=new Uint8Array(c),e=0;e<b;e++)d[e]=a.charCodeAt(e);return c}function m(a){return new va(function(b){var c=a.transaction(wa,Ba),d=g([""]);c.objectStore(wa).put(d,"key"),c.onabort=function(a){a.preventDefault(),a.stopPropagation(),b(!1)},c.oncomplete=function(){var a=navigator.userAgent.match(/Chrome\/(\d+)/),c=navigator.userAgent.match(/Edge\//);b(c||!a||parseInt(a[1],10)>=43)}}).catch(function(){return!1})}function n(a){return"boolean"==typeof xa?va.resolve(xa):m(a).then(function(a){return xa=a})}function o(a){var b=ya[a.name],c={};c.promise=new va(function(a,b){c.resolve=a,c.reject=b}),b.deferredOperations.push(c),b.dbReady?b.dbReady=b.dbReady.then(function(){return c.promise}):b.dbReady=c.promise}function p(a){var b=ya[a.name],c=b.deferredOperations.pop();if(c)return c.resolve(),c.promise}function q(a,b){var c=ya[a.name],d=c.deferredOperations.pop();if(d)return d.reject(b),d.promise}function r(a,b){return new va(function(c,d){if(ya[a.name]=ya[a.name]||B(),a.db){if(!b)return c(a.db);o(a),a.db.close()}var e=[a.name];b&&e.push(a.version);var f=ua.open.apply(ua,e);b&&(f.onupgradeneeded=function(b){var c=f.result;try{c.createObjectStore(a.storeName),b.oldVersion<=1&&c.createObjectStore(wa)}catch(c){if("ConstraintError"!==c.name)throw c;console.warn('The database "'+a.name+'" has been upgraded from version '+b.oldVersion+" to version "+b.newVersion+', but the storage "'+a.storeName+'" already exists.')}}),f.onerror=function(a){a.preventDefault(),d(f.error)},f.onsuccess=function(){var b=f.result;b.onversionchange=function(a){a.target.close()},c(b),p(a)}})}function s(a){return r(a,!1)}function t(a){return r(a,!0)}function u(a,b){if(!a.db)return!0;var c=!a.db.objectStoreNames.contains(a.storeName),d=a.version<a.db.version,e=a.version>a.db.version;if(d&&(a.version!==b&&console.warn('The database "'+a.name+"\" can't be downgraded from version "+a.db.version+" to version "+a.version+"."),a.version=a.db.version),e||c){if(c){var f=a.db.version+1;f>a.version&&(a.version=f)}return!0}return!1}function v(a){return new va(function(b,c){var d=new FileReader;d.onerror=c,d.onloadend=function(c){var d=btoa(c.target.result||"");b({__local_forage_encoded_blob:!0,data:d,type:a.type})},d.readAsBinaryString(a)})}function w(a){return g([l(atob(a.data))],{type:a.type})}function x(a){return a&&a.__local_forage_encoded_blob}function y(a){var b=this,c=b._initReady().then(function(){var a=ya[b._dbInfo.name];if(a&&a.dbReady)return a.dbReady});return i(c,a,a),c}function z(a){o(a);for(var b=ya[a.name],c=b.forages,d=0;d<c.length;d++){var e=c[d];e._dbInfo.db&&(e._dbInfo.db.close(),e._dbInfo.db=null)}return a.db=null,s(a).then(function(b){return a.db=b,u(a)?t(a):b}).then(function(d){a.db=b.db=d;for(var e=0;e<c.length;e++)c[e]._dbInfo.db=d}).catch(function(b){throw q(a,b),b})}function A(a,b,c,d){void 0===d&&(d=1);try{var e=a.db.transaction(a.storeName,b);c(null,e)}catch(e){if(d>0&&(!a.db||"InvalidStateError"===e.name||"NotFoundError"===e.name))return va.resolve().then(function(){if(!a.db||"NotFoundError"===e.name&&!a.db.objectStoreNames.contains(a.storeName)&&a.version<=a.db.version)return a.db&&(a.version=a.db.version+1),t(a)}).then(function(){return z(a).then(function(){A(a,b,c,d-1)})}).catch(c);c(e)}}function B(){return{forages:[],db:null,dbReady:null,deferredOperations:[]}}function C(a){function b(){return va.resolve()}var c=this,d={db:null};if(a)for(var e in a)d[e]=a[e];var f=ya[d.name];f||(f=B(),ya[d.name]=f),f.forages.push(c),c._initReady||(c._initReady=c.ready,c.ready=y);for(var g=[],h=0;h<f.forages.length;h++){var i=f.forages[h];i!==c&&g.push(i._initReady().catch(b))}var j=f.forages.slice(0);return va.all(g).then(function(){return d.db=f.db,s(d)}).then(function(a){return d.db=a,u(d,c._defaultConfig.version)?t(d):a}).then(function(a){d.db=f.db=a,c._dbInfo=d;for(var b=0;b<j.length;b++){var e=j[b];e!==c&&(e._dbInfo.db=d.db,e._dbInfo.version=d.version)}})}function D(a,b){var c=this;a=j(a);var d=new va(function(b,d){c.ready().then(function(){A(c._dbInfo,Aa,function(e,f){if(e)return d(e);try{var g=f.objectStore(c._dbInfo.storeName),h=g.get(a);h.onsuccess=function(){var a=h.result;void 0===a&&(a=null),x(a)&&(a=w(a)),b(a)},h.onerror=function(){d(h.error)}}catch(a){d(a)}})}).catch(d)});return h(d,b),d}function E(a,b){var c=this,d=new va(function(b,d){c.ready().then(function(){A(c._dbInfo,Aa,function(e,f){if(e)return d(e);try{var g=f.objectStore(c._dbInfo.storeName),h=g.openCursor(),i=1;h.onsuccess=function(){var c=h.result;if(c){var d=c.value;x(d)&&(d=w(d));var e=a(d,c.key,i++);void 0!==e?b(e):c.continue()}else b()},h.onerror=function(){d(h.error)}}catch(a){d(a)}})}).catch(d)});return h(d,b),d}function F(a,b,c){var d=this;a=j(a);var e=new va(function(c,e){var f;d.ready().then(function(){return f=d._dbInfo,"[object Blob]"===za.call(b)?n(f.db).then(function(a){return a?b:v(b)}):b}).then(function(b){A(d._dbInfo,Ba,function(f,g){if(f)return e(f);try{var h=g.objectStore(d._dbInfo.storeName);null===b&&(b=void 0);var i=h.put(b,a);g.oncomplete=function(){void 0===b&&(b=null),c(b)},g.onabort=g.onerror=function(){var a=i.error?i.error:i.transaction.error;e(a)}}catch(a){e(a)}})}).catch(e)});return h(e,c),e}function G(a,b){var c=this;a=j(a);var d=new va(function(b,d){c.ready().then(function(){A(c._dbInfo,Ba,function(e,f){if(e)return d(e);try{var g=f.objectStore(c._dbInfo.storeName),h=g.delete(a);f.oncomplete=function(){b()},f.onerror=function(){d(h.error)},f.onabort=function(){var a=h.error?h.error:h.transaction.error;d(a)}}catch(a){d(a)}})}).catch(d)});return h(d,b),d}function H(a){var b=this,c=new va(function(a,c){b.ready().then(function(){A(b._dbInfo,Ba,function(d,e){if(d)return c(d);try{var f=e.objectStore(b._dbInfo.storeName),g=f.clear();e.oncomplete=function(){a()},e.onabort=e.onerror=function(){var a=g.error?g.error:g.transaction.error;c(a)}}catch(a){c(a)}})}).catch(c)});return h(c,a),c}function I(a){var b=this,c=new va(function(a,c){b.ready().then(function(){A(b._dbInfo,Aa,function(d,e){if(d)return c(d);try{var f=e.objectStore(b._dbInfo.storeName),g=f.count();g.onsuccess=function(){a(g.result)},g.onerror=function(){c(g.error)}}catch(a){c(a)}})}).catch(c)});return h(c,a),c}function J(a,b){var c=this,d=new va(function(b,d){if(a<0)return void b(null);c.ready().then(function(){A(c._dbInfo,Aa,function(e,f){if(e)return d(e);try{var g=f.objectStore(c._dbInfo.storeName),h=!1,i=g.openKeyCursor();i.onsuccess=function(){var c=i.result;if(!c)return void b(null);0===a?b(c.key):h?b(c.key):(h=!0,c.advance(a))},i.onerror=function(){d(i.error)}}catch(a){d(a)}})}).catch(d)});return h(d,b),d}function K(a){var b=this,c=new va(function(a,c){b.ready().then(function(){A(b._dbInfo,Aa,function(d,e){if(d)return c(d);try{var f=e.objectStore(b._dbInfo.storeName),g=f.openKeyCursor(),h=[];g.onsuccess=function(){var b=g.result;if(!b)return void a(h);h.push(b.key),b.continue()},g.onerror=function(){c(g.error)}}catch(a){c(a)}})}).catch(c)});return h(c,a),c}function L(a,b){b=k.apply(this,arguments);var c=this.config();a="function"!=typeof a&&a||{},a.name||(a.name=a.name||c.name,a.storeName=a.storeName||c.storeName);var d,e=this;if(a.name){var f=a.name===c.name&&e._dbInfo.db,g=f?va.resolve(e._dbInfo.db):s(a).then(function(b){var c=ya[a.name],d=c.forages;c.db=b;for(var e=0;e<d.length;e++)d[e]._dbInfo.db=b;return b});d=a.storeName?g.then(function(b){if(b.objectStoreNames.contains(a.storeName)){var c=b.version+1;o(a);var d=ya[a.name],e=d.forages;b.close();for(var f=0;f<e.length;f++){var g=e[f];g._dbInfo.db=null,g._dbInfo.version=c}return new va(function(b,d){var e=ua.open(a.name,c);e.onerror=function(a){e.result.close(),d(a)},e.onupgradeneeded=function(){e.result.deleteObjectStore(a.storeName)},e.onsuccess=function(){var a=e.result;a.close(),b(a)}}).then(function(a){d.db=a;for(var b=0;b<e.length;b++){var c=e[b];c._dbInfo.db=a,p(c._dbInfo)}}).catch(function(b){throw(q(a,b)||va.resolve()).catch(function(){}),b})}}):g.then(function(b){o(a);var c=ya[a.name],d=c.forages;b.close();for(var e=0;e<d.length;e++){d[e]._dbInfo.db=null}return new va(function(b,c){var d=ua.deleteDatabase(a.name);d.onerror=function(){var a=d.result;a&&a.close(),c(d.error)},d.onblocked=function(){console.warn('dropInstance blocked for database "'+a.name+'" until all open connections are closed')},d.onsuccess=function(){var a=d.result;a&&a.close(),b(a)}}).then(function(a){c.db=a;for(var b=0;b<d.length;b++)p(d[b]._dbInfo)}).catch(function(b){throw(q(a,b)||va.resolve()).catch(function(){}),b})})}else d=va.reject("Invalid arguments");return h(d,b),d}function M(){return"function"==typeof openDatabase}function N(a){var b,c,d,e,f,g=.75*a.length,h=a.length,i=0;"="===a[a.length-1]&&(g--,"="===a[a.length-2]&&g--);var j=new ArrayBuffer(g),k=new Uint8Array(j);for(b=0;b<h;b+=4)c=Da.indexOf(a[b]),d=Da.indexOf(a[b+1]),e=Da.indexOf(a[b+2]),f=Da.indexOf(a[b+3]),k[i++]=c<<2|d>>4,k[i++]=(15&d)<<4|e>>2,k[i++]=(3&e)<<6|63&f;return j}function O(a){var b,c=new Uint8Array(a),d="";for(b=0;b<c.length;b+=3)d+=Da[c[b]>>2],d+=Da[(3&c[b])<<4|c[b+1]>>4],d+=Da[(15&c[b+1])<<2|c[b+2]>>6],d+=Da[63&c[b+2]];return c.length%3==2?d=d.substring(0,d.length-1)+"=":c.length%3==1&&(d=d.substring(0,d.length-2)+"=="),d}function P(a,b){var c="";if(a&&(c=Ua.call(a)),a&&("[object ArrayBuffer]"===c||a.buffer&&"[object ArrayBuffer]"===Ua.call(a.buffer))){var d,e=Ga;a instanceof ArrayBuffer?(d=a,e+=Ia):(d=a.buffer,"[object Int8Array]"===c?e+=Ka:"[object Uint8Array]"===c?e+=La:"[object Uint8ClampedArray]"===c?e+=Ma:"[object Int16Array]"===c?e+=Na:"[object Uint16Array]"===c?e+=Pa:"[object Int32Array]"===c?e+=Oa:"[object Uint32Array]"===c?e+=Qa:"[object Float32Array]"===c?e+=Ra:"[object Float64Array]"===c?e+=Sa:b(new Error("Failed to get type for BinaryArray"))),b(e+O(d))}else if("[object Blob]"===c){var f=new FileReader;f.onload=function(){var c=Ea+a.type+"~"+O(this.result);b(Ga+Ja+c)},f.readAsArrayBuffer(a)}else try{b(JSON.stringify(a))}catch(c){console.error("Couldn't convert value into a JSON string: ",a),b(null,c)}}function Q(a){if(a.substring(0,Ha)!==Ga)return JSON.parse(a);var b,c=a.substring(Ta),d=a.substring(Ha,Ta);if(d===Ja&&Fa.test(c)){var e=c.match(Fa);b=e[1],c=c.substring(e[0].length)}var f=N(c);switch(d){case Ia:return f;case Ja:return g([f],{type:b});case Ka:return new Int8Array(f);case La:return new Uint8Array(f);case Ma:return new Uint8ClampedArray(f);case Na:return new Int16Array(f);case Pa:return new Uint16Array(f);case Oa:return new Int32Array(f);case Qa:return new Uint32Array(f);case Ra:return new Float32Array(f);case Sa:return new Float64Array(f);default:throw new Error("Unkown type: "+d)}}function R(a,b,c,d){a.executeSql("CREATE TABLE IF NOT EXISTS "+b.storeName+" (id INTEGER PRIMARY KEY, key unique, value)",[],c,d)}function S(a){var b=this,c={db:null};if(a)for(var d in a)c[d]="string"!=typeof a[d]?a[d].toString():a[d];var e=new va(function(a,d){try{c.db=openDatabase(c.name,String(c.version),c.description,c.size)}catch(a){return d(a)}c.db.transaction(function(e){R(e,c,function(){b._dbInfo=c,a()},function(a,b){d(b)})},d)});return c.serializer=Va,e}function T(a,b,c,d,e,f){a.executeSql(c,d,e,function(a,g){g.code===g.SYNTAX_ERR?a.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name = ?",[b.storeName],function(a,h){h.rows.length?f(a,g):R(a,b,function(){a.executeSql(c,d,e,f)},f)},f):f(a,g)},f)}function U(a,b){var c=this;a=j(a);var d=new va(function(b,d){c.ready().then(function(){var e=c._dbInfo;e.db.transaction(function(c){T(c,e,"SELECT * FROM "+e.storeName+" WHERE key = ? LIMIT 1",[a],function(a,c){var d=c.rows.length?c.rows.item(0).value:null;d&&(d=e.serializer.deserialize(d)),b(d)},function(a,b){d(b)})})}).catch(d)});return h(d,b),d}function V(a,b){var c=this,d=new va(function(b,d){c.ready().then(function(){var e=c._dbInfo;e.db.transaction(function(c){T(c,e,"SELECT * FROM "+e.storeName,[],function(c,d){for(var f=d.rows,g=f.length,h=0;h<g;h++){var i=f.item(h),j=i.value;if(j&&(j=e.serializer.deserialize(j)),void 0!==(j=a(j,i.key,h+1)))return void b(j)}b()},function(a,b){d(b)})})}).catch(d)});return h(d,b),d}function W(a,b,c,d){var e=this;a=j(a);var f=new va(function(f,g){e.ready().then(function(){void 0===b&&(b=null);var h=b,i=e._dbInfo;i.serializer.serialize(b,function(b,j){j?g(j):i.db.transaction(function(c){T(c,i,"INSERT OR REPLACE INTO "+i.storeName+" (key, value) VALUES (?, ?)",[a,b],function(){f(h)},function(a,b){g(b)})},function(b){if(b.code===b.QUOTA_ERR){if(d>0)return void f(W.apply(e,[a,h,c,d-1]));g(b)}})})}).catch(g)});return h(f,c),f}function X(a,b,c){return W.apply(this,[a,b,c,1])}function Y(a,b){var c=this;a=j(a);var d=new va(function(b,d){c.ready().then(function(){var e=c._dbInfo;e.db.transaction(function(c){T(c,e,"DELETE FROM "+e.storeName+" WHERE key = ?",[a],function(){b()},function(a,b){d(b)})})}).catch(d)});return h(d,b),d}function Z(a){var b=this,c=new va(function(a,c){b.ready().then(function(){var d=b._dbInfo;d.db.transaction(function(b){T(b,d,"DELETE FROM "+d.storeName,[],function(){a()},function(a,b){c(b)})})}).catch(c)});return h(c,a),c}function $(a){var b=this,c=new va(function(a,c){b.ready().then(function(){var d=b._dbInfo;d.db.transaction(function(b){T(b,d,"SELECT COUNT(key) as c FROM "+d.storeName,[],function(b,c){var d=c.rows.item(0).c;a(d)},function(a,b){c(b)})})}).catch(c)});return h(c,a),c}function _(a,b){var c=this,d=new va(function(b,d){c.ready().then(function(){var e=c._dbInfo;e.db.transaction(function(c){T(c,e,"SELECT key FROM "+e.storeName+" WHERE id = ? LIMIT 1",[a+1],function(a,c){var d=c.rows.length?c.rows.item(0).key:null;b(d)},function(a,b){d(b)})})}).catch(d)});return h(d,b),d}function aa(a){var b=this,c=new va(function(a,c){b.ready().then(function(){var d=b._dbInfo;d.db.transaction(function(b){T(b,d,"SELECT key FROM "+d.storeName,[],function(b,c){for(var d=[],e=0;e<c.rows.length;e++)d.push(c.rows.item(e).key);a(d)},function(a,b){c(b)})})}).catch(c)});return h(c,a),c}function ba(a){return new va(function(b,c){a.transaction(function(d){d.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name <> '__WebKitDatabaseInfoTable__'",[],function(c,d){for(var e=[],f=0;f<d.rows.length;f++)e.push(d.rows.item(f).name);b({db:a,storeNames:e})},function(a,b){c(b)})},function(a){c(a)})})}function ca(a,b){b=k.apply(this,arguments);var c=this.config();a="function"!=typeof a&&a||{},a.name||(a.name=a.name||c.name,a.storeName=a.storeName||c.storeName);var d,e=this;return d=a.name?new va(function(b){var d;d=a.name===c.name?e._dbInfo.db:openDatabase(a.name,"","",0),b(a.storeName?{db:d,storeNames:[a.storeName]}:ba(d))}).then(function(a){return new va(function(b,c){a.db.transaction(function(d){function e(a){return new va(function(b,c){d.executeSql("DROP TABLE IF EXISTS "+a,[],function(){b()},function(a,b){c(b)})})}for(var f=[],g=0,h=a.storeNames.length;g<h;g++)f.push(e(a.storeNames[g]));va.all(f).then(function(){b()}).catch(function(a){c(a)})},function(a){c(a)})})}):va.reject("Invalid arguments"),h(d,b),d}function da(){try{return"undefined"!=typeof localStorage&&"setItem"in localStorage&&!!localStorage.setItem}catch(a){return!1}}function ea(a,b){var c=a.name+"/";return a.storeName!==b.storeName&&(c+=a.storeName+"/"),c}function fa(){var a="_localforage_support_test";try{return localStorage.setItem(a,!0),localStorage.removeItem(a),!1}catch(a){return!0}}function ga(){return!fa()||localStorage.length>0}function ha(a){var b=this,c={};if(a)for(var d in a)c[d]=a[d];return c.keyPrefix=ea(a,b._defaultConfig),ga()?(b._dbInfo=c,c.serializer=Va,va.resolve()):va.reject()}function ia(a){var b=this,c=b.ready().then(function(){for(var a=b._dbInfo.keyPrefix,c=localStorage.length-1;c>=0;c--){var d=localStorage.key(c);0===d.indexOf(a)&&localStorage.removeItem(d)}});return h(c,a),c}function ja(a,b){var c=this;a=j(a);var d=c.ready().then(function(){var b=c._dbInfo,d=localStorage.getItem(b.keyPrefix+a);return d&&(d=b.serializer.deserialize(d)),d});return h(d,b),d}function ka(a,b){var c=this,d=c.ready().then(function(){for(var b=c._dbInfo,d=b.keyPrefix,e=d.length,f=localStorage.length,g=1,h=0;h<f;h++){var i=localStorage.key(h);if(0===i.indexOf(d)){var j=localStorage.getItem(i);if(j&&(j=b.serializer.deserialize(j)),void 0!==(j=a(j,i.substring(e),g++)))return j}}});return h(d,b),d}function la(a,b){var c=this,d=c.ready().then(function(){var b,d=c._dbInfo;try{b=localStorage.key(a)}catch(a){b=null}return b&&(b=b.substring(d.keyPrefix.length)),b});return h(d,b),d}function ma(a){var b=this,c=b.ready().then(function(){for(var a=b._dbInfo,c=localStorage.length,d=[],e=0;e<c;e++){var f=localStorage.key(e);0===f.indexOf(a.keyPrefix)&&d.push(f.substring(a.keyPrefix.length))}return d});return h(c,a),c}function na(a){var b=this,c=b.keys().then(function(a){return a.length});return h(c,a),c}function oa(a,b){var c=this;a=j(a);var d=c.ready().then(function(){var b=c._dbInfo;localStorage.removeItem(b.keyPrefix+a)});return h(d,b),d}function pa(a,b,c){var d=this;a=j(a);var e=d.ready().then(function(){void 0===b&&(b=null);var c=b;return new va(function(e,f){var g=d._dbInfo;g.serializer.serialize(b,function(b,d){if(d)f(d);else try{localStorage.setItem(g.keyPrefix+a,b),e(c)}catch(a){"QuotaExceededError"!==a.name&&"NS_ERROR_DOM_QUOTA_REACHED"!==a.name||f(a),f(a)}})})});return h(e,c),e}function qa(a,b){if(b=k.apply(this,arguments),a="function"!=typeof a&&a||{},!a.name){var c=this.config();a.name=a.name||c.name,a.storeName=a.storeName||c.storeName}var d,e=this;return d=a.name?new va(function(b){b(a.storeName?ea(a,e._defaultConfig):a.name+"/")}).then(function(a){for(var b=localStorage.length-1;b>=0;b--){var c=localStorage.key(b);0===c.indexOf(a)&&localStorage.removeItem(c)}}):va.reject("Invalid arguments"),h(d,b),d}function ra(a,b){a[b]=function(){var c=arguments;return a.ready().then(function(){return a[b].apply(a,c)})}}function sa(){for(var a=1;a<arguments.length;a++){var b=arguments[a];if(b)for(var c in b)b.hasOwnProperty(c)&&($a(b[c])?arguments[0][c]=b[c].slice():arguments[0][c]=b[c])}return arguments[0]}var ta="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(a){return typeof a}:function(a){return a&&"function"==typeof Symbol&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a},ua=e();"undefined"==typeof Promise&&a(3);var va=Promise,wa="local-forage-detect-blob-support",xa=void 0,ya={},za=Object.prototype.toString,Aa="readonly",Ba="readwrite",Ca={_driver:"asyncStorage",_initStorage:C,_support:f(),iterate:E,getItem:D,setItem:F,removeItem:G,clear:H,length:I,key:J,keys:K,dropInstance:L},Da="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",Ea="~~local_forage_type~",Fa=/^~~local_forage_type~([^~]+)~/,Ga="__lfsc__:",Ha=Ga.length,Ia="arbf",Ja="blob",Ka="si08",La="ui08",Ma="uic8",Na="si16",Oa="si32",Pa="ur16",Qa="ui32",Ra="fl32",Sa="fl64",Ta=Ha+Ia.length,Ua=Object.prototype.toString,Va={serialize:P,deserialize:Q,stringToBuffer:N,bufferToString:O},Wa={_driver:"webSQLStorage",_initStorage:S,_support:M(),iterate:V,getItem:U,setItem:X,removeItem:Y,clear:Z,length:$,key:_,keys:aa,dropInstance:ca},Xa={_driver:"localStorageWrapper",_initStorage:ha,_support:da(),iterate:ka,getItem:ja,setItem:pa,removeItem:oa,clear:ia,length:na,key:la,keys:ma,dropInstance:qa},Ya=function(a,b){return a===b||"number"==typeof a&&"number"==typeof b&&isNaN(a)&&isNaN(b)},Za=function(a,b){for(var c=a.length,d=0;d<c;){if(Ya(a[d],b))return!0;d++}return!1},$a=Array.isArray||function(a){return"[object Array]"===Object.prototype.toString.call(a)},_a={},ab={},bb={INDEXEDDB:Ca,WEBSQL:Wa,LOCALSTORAGE:Xa},cb=[bb.INDEXEDDB._driver,bb.WEBSQL._driver,bb.LOCALSTORAGE._driver],db=["dropInstance"],eb=["clear","getItem","iterate","key","keys","length","removeItem","setItem"].concat(db),fb={description:"",driver:cb.slice(),name:"localforage",size:4980736,storeName:"keyvaluepairs",version:1},gb=function(){function a(b){d(this,a);for(var c in bb)if(bb.hasOwnProperty(c)){var e=bb[c],f=e._driver;this[c]=f,_a[f]||this.defineDriver(e)}this._defaultConfig=sa({},fb),this._config=sa({},this._defaultConfig,b),this._driverSet=null,this._initDriver=null,this._ready=!1,this._dbInfo=null,this._wrapLibraryMethodsWithReady(),this.setDriver(this._config.driver).catch(function(){})}return a.prototype.config=function(a){if("object"===(void 0===a?"undefined":ta(a))){if(this._ready)return new Error("Can't call config() after localforage has been used.");for(var b in a){if("storeName"===b&&(a[b]=a[b].replace(/\W/g,"_")),"version"===b&&"number"!=typeof a[b])return new Error("Database version must be a number.");this._config[b]=a[b]}return!("driver"in a&&a.driver)||this.setDriver(this._config.driver)}return"string"==typeof a?this._config[a]:this._config},a.prototype.defineDriver=function(a,b,c){var d=new va(function(b,c){try{var d=a._driver,e=new Error("Custom driver not compliant; see https://mozilla.github.io/localForage/#definedriver");if(!a._driver)return void c(e);for(var f=eb.concat("_initStorage"),g=0,i=f.length;g<i;g++){var j=f[g];if((!Za(db,j)||a[j])&&"function"!=typeof a[j])return void c(e)}(function(){for(var b=function(a){return function(){var b=new Error("Method "+a+" is not implemented by the current driver"),c=va.reject(b);return h(c,arguments[arguments.length-1]),c}},c=0,d=db.length;c<d;c++){var e=db[c];a[e]||(a[e]=b(e))}})();var k=function(c){_a[d]&&console.info("Redefining LocalForage driver: "+d),_a[d]=a,ab[d]=c,b()};"_support"in a?a._support&&"function"==typeof a._support?a._support().then(k,c):k(!!a._support):k(!0)}catch(a){c(a)}});return i(d,b,c),d},a.prototype.driver=function(){return this._driver||null},a.prototype.getDriver=function(a,b,c){var d=_a[a]?va.resolve(_a[a]):va.reject(new Error("Driver not found."));return i(d,b,c),d},a.prototype.getSerializer=function(a){var b=va.resolve(Va);return i(b,a),b},a.prototype.ready=function(a){var b=this,c=b._driverSet.then(function(){return null===b._ready&&(b._ready=b._initDriver()),b._ready});return i(c,a,a),c},a.prototype.setDriver=function(a,b,c){function d(){g._config.driver=g.driver()}function e(a){return g._extend(a),d(),g._ready=g._initStorage(g._config),g._ready}function f(a){return function(){function b(){for(;c<a.length;){var f=a[c];return c++,g._dbInfo=null,g._ready=null,g.getDriver(f).then(e).catch(b)}d();var h=new Error("No available storage method found.");return g._driverSet=va.reject(h),g._driverSet}var c=0;return b()}}var g=this;$a(a)||(a=[a]);var h=this._getSupportedDrivers(a),j=null!==this._driverSet?this._driverSet.catch(function(){return va.resolve()}):va.resolve();return this._driverSet=j.then(function(){var a=h[0];return g._dbInfo=null,g._ready=null,g.getDriver(a).then(function(a){g._driver=a._driver,d(),g._wrapLibraryMethodsWithReady(),g._initDriver=f(h)})}).catch(function(){d();var a=new Error("No available storage method found.");return g._driverSet=va.reject(a),g._driverSet}),i(this._driverSet,b,c),this._driverSet},a.prototype.supports=function(a){return!!ab[a]},a.prototype._extend=function(a){sa(this,a)},a.prototype._getSupportedDrivers=function(a){for(var b=[],c=0,d=a.length;c<d;c++){var e=a[c];this.supports(e)&&b.push(e)}return b},a.prototype._wrapLibraryMethodsWithReady=function(){for(var a=0,b=eb.length;a<b;a++)ra(this,eb[a])},a.prototype.createInstance=function(b){return new a(b)},a}(),hb=new gb;b.exports=hb},{3:3}]},{},[4])(4)});// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                         M E D I A                                              //
//                                                                                                //
// -----------------------------------------------------------------------------------------------//

var media        = {};
media["devices"] = {};




async function Media_Init()
{
 // AWAKE USER MEDIA AND REQUEST PERMISSIONS
 await navigator.mediaDevices.getUserMedia({audio:true, video:true});
 
 await Media_Devices_List(); 
   
 navigator.mediaDevices.ondevicechange = Media_Devices_OnChange;
}







function Media_Info_Type(filename)
{
 var ext = Path_Extension(filename).toLowerCase();
 
 if(["jpg", "jpeg", "gif", "png", "svg"].includes(ext))
 {
  return "image";
 }	  
     
	 
 if(["mov", "avi", "mpg", "mpeg", "mp4"].includes(ext))
 {
  return "video";
 }
  
  
 if(["mp3", "wav", "ogg"].includes(ext))
 {
  return "audio";
 }
 
 
 
 if(["pdf"].includes(ext))
 {
  return "pdf";
 }
 
 
 
 return "unknown";
}








// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                        D E V I C E S                                           //
//                                                                                                //
// -----------------------------------------------------------------------------------------------//


async function Media_Devices_List()
{
 // ENUMERATE AVAILABLE DEVICES
 var devices = await navigator.mediaDevices.enumerateDevices();
  
 // ASSEMBLE DEVICES LIST
 var list = {};
 for(var device of devices) 
 {  console.log(device);
  // NEW DEVICE TYPE?
  if(!list[device.kind]) list[device.kind] = {};
   
  list[device.kind][device.deviceId] = device;
 }
  
 media["devices"] = list;
}





function Media_Devices_Select(type, id)
{ 	
 // DOES CHOSEN DEVICE EXIST?
 var device = Safe_Get(media, ["devices", type, id], false);

 // IF IT DOESN'T EXIST, TRY DEFAULT DEVICE (FIRST ONE IN LIST) FOR THAT DEVICE TYPE
 if(!device)
 {
  var devices = Object.keys(Safe_Get(media, ["devices", type], {}));
  if(devices.length == 0) return false;
  
  var id = devices[0];
  var device = Safe_Get(media, ["devices", type, id], false);
 }
  
 return device;
}




function Media_Devices_OnChange(event)
{
 Media_Devices_List();
}








// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                          A U D I O                                             //
//                                                                                                //
// -----------------------------------------------------------------------------------------------//



function Media_Audio_Duration(src, callback)
{
 var promise = new Promise((resolve, reject) =>
 { 
  var sample = new Audio();	
 	
  sample.oncanplaythrough = 
  function()
  {
   delete sample;
   resolve(sample.duration);
  }
 
  sample.onerror =
  function()
  {
   delete sample;	  
   resolve(-1);
  }
 
  sample.src = src;
  sample.load();
 });
 
 return promise;
}




async function Media_Audio_Record(time, onstart)
{
 var format = "audio/wav";
 
 var promise = new Promise(async(resolve, reject) =>
 {
  try
  {
   var stream   = await navigator.mediaDevices.getUserMedia({audio:true});
  }
  catch(e)
  {
   resolve(false);
   return;
  }
  
  var recorder = new MediaRecorder(stream);			
  var chunks   = [];
				
  // COLLECT AUDIO CHUNKS			
  recorder.addEventListener("dataavailable", 
  function(e)
  {
   chunks.push(e.data);
  });
 
  // WHEN DONE, PUT CHUNKS TOGETHER
  recorder.addEventListener("stop",
  function()
  {
   var output = new Blob(chunks, {"type" : format});
  
   resolve(output);
  });
  
  // START RECORDER
  recorder.start();
  if(onstart) onstart(recorder);
  
  // IF TIMED, AUTOSTOP
  if(time)
  {
   setTimeout(function()
   {
    recorder.stop(); 
   }, time);								   			
  }
  
 });
 
 return promise;
}





function Media_Audio_Play(source, options = {volume:1, loop:false})
{ 
 var audio;
 
 var promise = new Promise((resolve, reject) =>
 {   
  // ASSUME BLOB
  if(typeof source == "object") 
  {
   source = URL.createObjectURL(source);
  }
  
  var player = new Audio();
  audio      = player;
 	
  // AS SOON AS PLAYABLE, PLAY
  player.oncanplaythrough = 
  function()
  {
   player.volume = options["volume"] || 1;
   player.play();
   
   //console.log(player, player.src, player.volume);
  } 
 
  // ON ERROR, CONSIDER IT PLAYED
  player.onerror =
  function(error)
  { 
   resolve();
  }
 
  player.onended =
  function()
  {
   resolve();
   
   if(options["loop"]) 
   {
    if(typeof options["loop"] == "function") options["loop"](player);
	player.play(); 
   }
   else 
   {
	// END
   }
  }	 
  
  // IF THIS AUDIO'S EXISTENCE IS BASED ON THE EXISTENCE OF A SPECIFIC CONTAINER, SET UP AN EVENT TO MANAGE THIS
  if(options["container"])
  {
   player.addEventListener("timeupdate",
   function(event)
   {
	if(!options["container"].isConnected) 
	{
     player.pause(); 
	 player.remove();
	}
   }, true);
  }
  
  
 
  // ASSIGN SOURCE AND LOAD
  player.src = source;
  player.load();
 });


 promise["audio"] = audio;
 return promise;
}








// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                      S P E E C H                                               //
//                                                                                                //
// -----------------------------------------------------------------------------------------------//


// TRIGGER VOICES LISTING
speechSynthesis.onvoiceschanged =
function(event)
{
}




async function Media_Speech_GetVoices()
{
 var promise = new Promise((resolve, reject) =>
 {
  speechSynthesis.onvoiceschanged =
  function()
  {
   var available = speechSynthesis.getVoices();
  
   resolve(available);
  }
  
  var available = speechSynthesis.getVoices();
  if(available.length > 0) resolve(available);
 });
 
 return promise;
}



async function Media_Speech_GetVoice(name)
{
 var name      = name.toLowerCase();
 
 var available = await Media_Speech_GetVoices();
 for(var voice of available)
 {
  if(voice.name.toLowerCase() == name)
  {
   return voice;
  }
 }
}




async function Media_Speech_ListVoices(lang = "")
{
 var voices = [];
 var lang   = lang.toLowerCase();
 
 var available = await Media_Speech_GetVoices();
 for(var voice of available)
 {
  if(!lang || voice.lang.toLowerCase() == lang)
  {
   voices.push(voice);
  }
 }
 
 // PREFER LOCAL TO REMOTE
 voices.sort(
 function(a, b)
 {
  if(a.localService && !b.localService) return -1;
  else
  if(!a.localService && b.localService) return 1;
  else 
  return 0;
 });
 
 return voices;
}




async function Media_Speech_Speak(text, voice, options = {rate:1, pitch:1}, onword)
{
 var promise = new Promise(async(resolve, reject) =>
 {
  // INIT SPEECH
  var speech   = new SpeechSynthesisUtterance();
  speech.text  = text;
  speech.rate  = options["rate"]  || 1;
  speech.pitch = options["pitch"] || 1;


  // ARE WE USING A SPECIFIC VOICE?
  if(typeof voice == "string") 
  {
   // 5 CHARACTERS = LANGUAGE CODE
   if(voice.length == 5)
   {
    speech.lang = voice;
   }
   else
   // MORE THAN 4 CHARACTERS = SPECIFIC VOICE NAME
   {
    speech.voice = await Media_Speech_GetVoice(voice);
	
	// NOT AVAILABLE, RETURN IMMEDIATELY
	if(!speech.voice) resolve();
   }
  }
  else
  {
   speech.voice = voice
  }
  
  
  // ON SPEECH END, RETURN FROM ASYNC FUNCTION
  speech.onend = 
  function()
  {
   resolve();
  }


  // ON WORD SPOKEN
  if(onword)
  {
   speech.onboundary = 
   function(event)
   {
    var segment = text.substr(event.charIndex, event.charLength);
	var time    = event.elapsedTime;
	
    onword(segment, time);
   }
  }
  
  
  // SPEAK
  speechSynthesis.speak(speech)
 });

 return promise;
}







async function Media_Speech_RecognizeCustom(sentences, lang, sample, service, onstartrecord, onendrecord)
{ 
 // IF SAMPLE IS A NUMBER RATHER THAN A BLOB, THEN IT REPRESENTS THE LENGTH OF A SAMPLE TO BE RECORDED
 if(typeof sample == "number")
 {
  var sample = await Media_Audio_Record(sample, onstartrecord);
  if(onendrecord) onendrecord();
 }

 // READ SAMPLE AS FILE
 var data  = await Storage_File_Read(sample);
 
 // PACKAGE QUERY FOR THE RECOGNIZER 
 var query = 
 {
  "binaryData"   : data,
  "fileExtension": "wav",
  "culture"      : lang,
  "sentences"    : sentences
 }
			 
			 
 console.log("recognizing...", query); 
			 
 // CALL SERVICE AND RETURN RESULT
 var response = await Request_Post(service, query, "json");
 
 console.log("response", response);
 
 var index = Safe_Get(response, "indexRecognized", -1);
 if(index == -1) var sentence = false; else var sentence = sentences[index];
 
 var result           = {};
 result["sample"]     = sample;
 result["sentence"]   = sentence;
 result["confidence"] = Safe_Get(response, "confidence", 0);
 
 return result;
} 





async function Media_Speech_Recognize(text, lang, time, controller, onstart)
{
 var promise = new Promise((resolve, reject) =>
 {	
  var recognition = new webkitSpeechRecognition();
  controller = recognition;

  recognition.continuous     = false;
  recognition.interimResults = false;

  recognition.onstart = 
  function()
  {
   if(onstart) onstart();	   
   
   if(time) setTimeout(function(){recognition.stop()}, time);	  
  }
  
  recognition.onerror =
  function(error)
  { 
   resolve(error);	
  }
  
  recognition.onresult = 
  function(event)
  {
   var result = event.results;	  
    
   // *TODO* PROCESS THE RESULT AND MAKE IT MATCH THE STRUCTURE OF OUR CUSTOM RECOGNIZER 
	   
   resolve(result);	
  }
  
  recognition.start();
 });

 return promise;
}






// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                            D S P                                               //
//                                                                                                //
// -----------------------------------------------------------------------------------------------//


function Audio_DSP_CreateMeter(context, stream)
{
 var meter = {};
 
 var source   = context.createMediaStreamSource(stream);
 var analyser = context.createAnalyser();
 var node     = context.createScriptProcessor(2048, 1, 1);
 
 meter["source"]   = source;
 meter["analyser"] = analyser;
 meter["node"]     = node;
 
 analyser.smoothingTimeConstant = 0.8;
 analyser.fftSize               = 1024;

 source.connect(analyser);
 meter.analyser.connect(node);
 node.connect(context.destination);
 
 node.onaudioprocess = function() 
 {
  var array = new Uint8Array(analyser.frequencyBinCount);
  analyser.getByteFrequencyData(array);
  var values = 0;

  var length = array.length;
  for(var i = 0; i < length; i++) 
  {
   values += (array[i]);
  }

  meter.average = (values / length) / 100;
 }

 return meter;
}

// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                        U T I L S                                               //
//                                                                                                //
// -----------------------------------------------------------------------------------------------//

var utils = {};








// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                     O B J E C T S                                              //
//                                                                                                //
// -----------------------------------------------------------------------------------------------//


function Object_Copy(obj)
{
 var copy = structuredClone(obj);
 return copy;
}



function Object_From_String(string, separator = ";", assigner = ":")
{
 if(typeof(string) != "string") return {};
 
 var obj = {};
    
 var tokens = string.split(separator);
 for(token of tokens)
 {
  token     = token.trim();
  var parts = token.split(assigner);
  
  if(parts.length > 0)
  {
   var field  = parts[0].trim();
  
   if(parts.length > 1) var value = parts[1].trim(); else value = undefined;
  
   obj[field] = value;
  }
 }
 
 return obj;
}




function Object_From_Paths(array, separator = "/")
{
 var obj = {};
 
 for(var string of array)
 {
  var item = string.split(separator);
  
  Safe_Set(obj, item, {});
 }
 
 return obj;
}





function Object_From_Objects(array, field)
{
 var obj = {};
 
 for(var item of array)
 {
  var id  = item[field];
  obj[id] = item;
 }
 
 return obj;
}






function Object_To_String(obj, separator = ";", assigner = ":")
{
 var tokens = [];
 
 for(var key in obj)
 {
  var token = key + assigner + " " + obj[key];
  
  tokens.push(token);
 }
 
 var string = tokens.join(separator);
 
 return string;
}






function Object_To_Pairs(source, field)
{
 var dest = {};
 
 for(var id in source)
 {
  dest[id] = source[id][field];
 }
 
 return dest;
}







function Object_To_Array(obj, mapkey)
{
 var array = [];
 var keys  = Object.keys(obj);
 
 for(var key of keys) 
 {
  var item = obj[key];
  array.push(item);
  
  if(mapkey) item[mapkey] = key;
 }
 
 return array;
}








function Object_Fields_MaxId(obj, tag)
{
 var subset = Object_Subset(obj, tag);
 var fields = Object.keys(subset);

 var max = 0;
 for(var field of fields) 
 {
  var id = parseInt(field.replace(tag, "").trim());
  
  if(id > max) max = id;
 }
 
 return id;
}





function Object_Fields_BrandSelf(obj, brand)
{
 var keys = Object.keys(obj);
 
 for(var key of keys) 
 {
  if(typeof obj[key] == "object" || typeof obj[key] == "array")
  {
   obj[key][brand] = key
  }
 }
}





function Object_Fields_Brand(obj, field, value)
{
 var keys = Object.keys(obj);
 
 for(var key of keys) 
 {
  if(typeof obj[key] == "object" || typeof obj[key] == "array")
  {
   obj[key][field] = value;
  }
 }
}





function Object_Values_Average(obj)
{
 var values = Object.values(obj);
 if(values.length == 0) return undefined;
 
 var sum = values.reduce((a, b) => parseInt(a) + parseInt(b), 0);
 var avg = (sum / values.length) || 0;
 
 return avg;
}




function Object_Catalog_ByNumericValue(obj, field, map = {})
{
 var catalog = {};
 
 for(var id in obj)
 {
  var item  = obj[id];
  var value = item[field];
  
  for(var key in map)
  {
   var upto = map[key];
  
   if((value <= upto) || (upto === undefined)) 
   {
	Safe_Push(catalog, key, item);
	break;
   }
   
  }
 }
 
 return catalog;
}






function Object_Map(obj, map, parent = false)
{ 
 if(!map) var map = [];
 
 var keys = Object.keys(obj);
 
 for(var key of keys)
 {
  var item         = {};
  item["key"]      = key;
  item["source"]   = obj[key];
  item["count"]    = 1;
  item["parent"]   = parent;
  item["children"] = [];
  
  if(parent) parent["children"].push(item);
  
  
  Object_Map(obj[key], map, item);
  
  var depth   = 0;
  var pointer = item["parent"];
  
  while(pointer)
  {
   pointer["count"]++;
   pointer = pointer["parent"];
   
   depth ++;
  }
  
  if(!map[depth]) map[depth] = [];
  
  map[depth].push(item);
 }
  
 return map;
}



function Object_Subset(obj, tag, mode = "starts-with")
{
 var sub  = {};
 var keys = Object.keys(obj);
 
 if(typeof tag == "object") mode = "defined";
 
 switch(mode)
 {
  case "starts-with":
	for(var key of keys) 
	{
     if(key.toLowerCase().startsWith(tag.toLowerCase()))
	 {
	  sub[key] = obj[key];
	 }
	}
  break;
  
  case "starts-without":
	for(var key of keys) 
	{
     if(!key.toLowerCase().startsWith(tag.toLowerCase()))
	 {
	  sub[key] = obj[key];
	 }
	}
  break;
  
  case "collect":
	for(var key of keys)
	{
     if(tag.includes(key))
	 {
	  sub[key] = obj[key];
	 }
	}
  break;
  
  case "defined":
	for(var key of tag)
	{
     sub[key] = obj[key];
	}
  break;
 }
 
 return sub;
}





function Object_Purge(obj, tag)
{
 var fields = Object.keys(Object_Subset(obj, tag));
 
 for(var field of fields) delete obj[field];
}





function Object_Is_Array(obj)
{
 return (typeof obj == "object") && Array.isArray(obj);
}




function Object_Valid(obj)
{
 return (typeof obj == "object") && (Object.keys(obj).length > 0);
}








// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                      A R R A Y S                                               //
//                                                                                                //
// -----------------------------------------------------------------------------------------------//


function Array_In(item, array)
{
 return array.includes(item);
}




function Array_PushUnique(array, item)
{
 if(!array.includes(item)) 
 {
  array.push(item);
  return true;
 }
 
 return false;
}




function Array_To_Object(array)
{
 var obj  = {};
 var keys = Object.keys(array);
 
 for(var key of keys)
 {
  obj[key] = array[key];
 }
 
 return obj;
}



function Array_From_String(string, separator = ",")
{
 var arr = [];
  
 var tokens = string.split(separator);
 for(token of tokens)
 {
  var value = token.trim();
  arr.push(value);
 }
 
 return arr;
}



function Array_From_Fields(array, field)
{
 var list = [];
 
 if(Object_Is_Array(array))
 {
  for(var item of array) list.push(item[field]);
 }
 else
 {
  for(var key in array) 
  {
   var value = Safe_Get(array, [key, field]);
   list.push(value);
  }
 }
 
 return list;
}





function Array_Element_DeleteAt(array, index)
{
 array.splice(index, 1);
 return index;
}




function Array_Element_Delete(array, element)
{
 var index = array.indexOf(element);
 if(index == -1) return;
 
 array.splice(index, 1);
 return index;
}



function Array_Element_Insert(array, index, element)
{
 array.splice(index, 0, element);
}




function Array_Element_DeleteAll(array, element)
{
 var indices = [];
 
 while(array.includes(element)) 
 {
  var index = Array_Element_Delete(array, element);
  indices.push(index);
 }
 
 return indices;
}





function Array_Elements_Random(array)
{
 return array[Numbers_Random(0, array.length - 1)];
}




function Array_Items_Sort(array, field)
{
 array.sort(
 function(a, b)
 {
  if(a[field] > b[field]) return 1;
  else
  if(a[field] < b[field]) return -1;
  else
  return 0;
 });
}




function Array_Organize_ByField(array, field)
{
 var catalog = {};
 
 for(var item of array)
 {
  var key = item[field];
  
  catalog[key] = item;
 }
 
 return catalog;
}



function Array_Catalog_ByField(array, field)
{
 var catalog = {};
 
 for(var item of array)
 {
  var key = item[field];
  
  if(!catalog[key]) catalog[key] = [];
  catalog[key].push(item);
 }
 
 return catalog;
}




function Array_Catalog_Counts(array)
{
 var catalog = {};
 
 for(var item of array)
 {
  if(typeof catalog[item] == "undefined") 
  {
   catalog[item] = 1;
  }
  else
  {
   catalog[item]++;
  }
 }
 
 return catalog;
}




function Array_Integrate_AddFromObject(array, object, id_field)
{
 for(var item of array)
 {
  var id   = item[id_field];
  var data = object[id];
  
  if(typeof data != "undefined")
  {
   item.assign(data);
  }
 }
}





function Array_Empty(array)
{
 return Object_Is_Array(array) && (array.length == 0);
}




function Array_Valid(array)
{
 return Object_Is_Array(array) && (array.length > 0);
}







// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                      S T R I N G S                                             //
//                                                                                                //
// -----------------------------------------------------------------------------------------------//


function String_Unicode_Length(string)
{
 var segmenter = new Intl.Segmenter(); 
 var segments  = segmenter.segment(string);
 
 return [...segments].length;
}





function String_Filter_AllowDigits(string, allowspaces)
{
 if(allowspaces) 
 {
  return string.replace(/[^0-9 ]/gi,'');
 }
 else 
 {	 
  return string.replace(/[^0-9]/gi,'');
 }
}






function String_Filter_AllowAlphanum(string, allowspaces)
{
 if(allowspaces) 
 {
  return string.replace(/[^a-z0-9 ]/gi,'');
 }
 else 
 {	 
  return string.replace(/[^a-z0-9]/gi,'');
 }
}




function String_Filter_AllowAlpha(string, allowspaces)
{
 if(allowspaces)
 {
  return string.replace(/[^a-zA-Z ]/g,"");
 }
 else
 {
  return string.replace(/[^a-zA-Z]/g,"");
 }
}




function String_Split(string, separators)
{
 // ESCAPE SEPARATORS
 var escaped = [];
 for(var separator of separators) escaped.push("\\" + separator); 
  
 // BUILD REGEX
 var regex = new RegExp("(?:" + escaped.join("|") + ")+"); 
 
 // SPLIT
 return string.split(regex)
}




function String_Capitalize_Initial(string) 
{
 return string.charAt(0).toUpperCase() + string.slice(1);
}





function String_Capitalize_Camel(string, separator = "-", joiner = "")
{
 var parts = string.split(separator);
 
 for(var i in parts) parts[i] = String_Capitalize_Initial(parts[i]);
 
 return parts.join(joiner);
}



function String_Lowercase_Initial(string) 
{
 return string.charAt(0).toLowerCase() + string.slice(1);
}







function String_Variables_Set(string, variables = {}, delimiter = "$")
{	
 var varnames = Object.keys(variables);
 
 for(var i in varnames)
 {
  var name  = varnames[i];
  var value = variables[name];
  
  string = string.replaceAll(delimiter + name + delimiter, value);
 }
 
 return string;
}






function String_Extract_TagContent(string, delimiter_a = "{", delimiter_b = "}")
{
 var regex   = new RegExp(delimiter_a + "(.*?)" + delimiter_b, "g");
 var matches = string.matchAll(regex);
 var content = Array.from(matches, x => x[1]);
 
 return content;
}




function String_Extract_TagBlocks(string, delimiter_a = "{", delimiter_b = "}")
{
 var blocks = [];

 var tags = String_Extract_TagContent(string, delimiter_a, delimiter_b);

 var c = 0;
 for(var tag of tags)
 {  
  // FIND TAG AND EMPTY IT
  var search = delimiter_a + tag + delimiter_b;
  var i      = string.indexOf(search); 
  string     = string.replace(search, " ".repeat(search.length));
  
  // PRE-TAG CONTENT
  var text = string.substring(c, i);
  if(text.length > 0)
  {
   var block        = {};
   block["type"]    = "text";
   block["content"] = text;
   blocks.push(block);
  }

  // TAG CONTENT
  var block        = {};
  block["type"]    = "tag";
  block["content"] = tag;
  blocks.push(block);
  
  // MOVE ON
  c = i + search.length;
 }

 // REMAINDER
 var text = string.substring(c, string.length);
 if(text.length > 0)
 { 
  var block        = {};
  block["type"]    = "text";
  block["content"] = text;
  blocks.push(block);
 }

 return blocks;
}




function String_HTML_SegmentTag(html, delimiter_a = "<", delimiter_b = ">")
{
 var parts = {};
 
 var a = html.search(delimiter_a);
 if(a == -1) return parts;
 
 var b = html.substr(a).search(" ");
 if(b == -1) return parts;
 
 parts["head"] = html.substr(0, a + b);  
 html = html.replace(parts["head"], "");
 
 var a = html.search(delimiter_b);
 if(a == -1) return parts;
 parts["tail"] = html.substr(a);
 
 html = html.replace(parts["tail"], "");
 
 parts["content"] = html;
 
 return parts;
}




function String_Parse_Ini(data)
{
 var regex = 
 {
  section: /^\s*\[\s*([^\]]*)\s*\]\s*$/,
  param:   /^\s*([^=]+?)\s*=\s*(.*?)\s*$/,
  comment: /^\s*;.*$/
 };
     
 var value   = {};
 var lines   = data.split(/[\r\n]+/);
 var section = null;
 
 lines.forEach(
 function(line)
 {
  if(regex.comment.test(line))
  {
   return;
  }
  else 
  if(regex.param.test(line))
  {
   var match = line.match(regex.param);
   if(section)
   {
    value[section][match[1]] = match[2].replaceAll('"', '');
   }
   else
   {
    value[match[1]] = match[2].replaceAll('"', '');;
   }
  }
  else 
  if(regex.section.test(line))
  {
   var match       = line.match(regex.section);
   value[match[1]] = {};
   section         = match[1].replaceAll('"', '');;
  }
  else if(line.length == 0 && section)
  {
   section = null;
  };
 });
 
 return value;
}
	




function String_Simplify(string)
{
 if(!string) return "";
 
 return String(string).trim().toLowerCase();
}




function String_Is_Number(string)
{
 return !isNaN(string);
}





function String_Copycount_Get(string, delimiter_a = "(", delimiter_b = ")")
{
 var a = string.lastIndexOf(delimiter_a);
 var b = string.lastIndexOf(delimiter_b);
 
 if(b > a)
 {
  var count = string.substr(a + 1, b - a - 1);
  
  if(String_Is_Number(count)) return parseInt(count);
 }
}




function String_Copycount_Set(string, count, delimiter_a = "(", delimiter_b = ")")
{
 var current = String_Copycount_Get(string, delimiter_a, delimiter_b);
 if(current)
 { 
  var a    = string.lastIndexOf(delimiter_a);
  var b    = string.lastIndexOf(delimiter_b); 
  
  var head = string.substr(0, a);
  var tail = string.substr(b + 1, string.length - b);
  
  return head + delimiter_a + count + delimiter_b + tail;
 }
 else
 {
  return string + " " + delimiter_a + count + delimiter_b; 
 }
}



function String_Copycount_Next(string, delimiter_a = "(", delimiter_b = ")")
{
 var current = String_Copycount_Get(string, delimiter_a, delimiter_b);
 if(!current) current = 1; else current = current + 1;
 
 return String_Copycount_Set(string, current, delimiter_a, delimiter_b);
}





function String_Numtemplate_Info(string, digit_symbol = "N")
{
 var info   = string.split(" ");
 var digits = info[info.length - 1] || "";
 
 if(digits.includes(digit_symbol))
 {
  var header = info[0];
  digits     = digits.trim().length;
 }
 else
 {
  var header = string.trim();
  digits     = 0;
 }
 
 return {header:header, digits:digits};
}




function String_Numtemplate_Next(template, list)
{
 var max = 0;
 
 for(var item of list)
 {
  if(item.startsWith(template["header"]))
  {
   var parts = item.split(" ");
   var count = parseInt(parts[parts.length - 1]);
   
   if(count > max) max = count;
  }	  
 }
 
 max = max + 1;
 
 return template["header"] + " " + String(max).padStart(template["digits"], "0");
}




function String_Numtemplate_Comply(string, template)
{
 if(!string) return false;
 
 if(!string.startsWith(template["header"])) return false;

 var parts  = string.split(" ");
 var digits = String_Filter_AllowDigits(parts[parts.length -1]).trim();
 if(digits.length != template["digits"]) return false;
 
 return true;
}



function String_Numtemplate_Derive(string, digit_symbol = "N")
{
 if(!string) return "";
 
 var parts  = string.split(" ");
 var digits = String_Filter_AllowDigits(parts[parts.length -1]).trim();
 if(digits.length == 0) return "";
 
 return parts[0] + " " + digit_symbol.repeat(digits.length);
}






function String_Speak_Time(string, letter = 150, pause = 250)
{
 var time  = 0;
 var words = string.split(" ");
 
 for(var word of words)
 {
  var l     = word.trim().length;
  if(l<2) l = 2; 
   
  time = time + l * letter;
  time = time + pause;
 }
}





function String_Analysis_Categorize(sentence, terms = [])
{
 var analyzed = [sentence];
 
 var validate = 
 function(text, from, to)
 {  
  var invalid =  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
 
  // VALIDATE LEFT BOUNDARY
  if(from != 0)
  {
   if(invalid.includes(text[from - 1])) return false;
  }
  
  // VALIDATE RIGHT BOUNDARY
  if(to != text.length - 1)
  {
   if(invalid.includes(text[to + 1])) return false;
  }
  
  return true;
 }
 
 do
 {
  var found = false;

  for(var i in analyzed) if(typeof analyzed[i] == "string")
  {
   var text  = analyzed[i] || "";
   
   // CHECK BLOCK AGAINST ALL TERMS
   for(var term of terms)
   {
	var index = text.toLowerCase().indexOf(term);
	
    if(index != -1 && validate(text, index, index + term.length - 1))
    {     
     var head = text.substring(0, index);
	 var core = text.substring(index, index + term.length); 
	 var tail = text.substring(index + term.length);
	 
	 Array_Element_DeleteAt(analyzed, i);
	 
	 if(tail.trim()) Array_Element_Insert(analyzed, i, tail);
	 Array_Element_Insert(analyzed, i, {type:"term", text:core});
	 if(head.trim()) Array_Element_Insert(analyzed, i, head);
	 
	 found = true;
	 break;
    }
   }
   
  }
  
 } while(found);
 
 
 // NOW CONVERT THE LEFTOVER STRINGS INTO OBJECTS
 do
 {  
  var found = false;
  
  for(var i in analyzed) if(typeof analyzed[i] == "string")
  {
   var text   = analyzed[i];
   Array_Element_DeleteAt(analyzed, i); 

   var tokens = String_Split(text, [" "]);
   tokens.reverse(); 
   for(var token of tokens)
   {
    var block = {type:"text", text:token}
	Array_Element_Insert(analyzed, i, block);
   }
   
   found = true;
   break;
  }
 
 } while(found);
 
 
 return analyzed;
}




function String_Analysis_StructuredMatch(target, guess, threshold = 1)
{
 if(typeof target == "string") var target = String_Analysis_Categorize(target);
 if(typeof guess  == "string") var guess  = String_Analysis_Categorize(guess);
 
 // RESET BLOCKS
 for(var block of guess)  block["used"]  = false;
 for(var block of target) block["match"] = false;
	 
 // SCAN
 for(var target_block of target)
 {
  var target_text = String_Filter_AllowAlphanum(target_block["text"]).trim().toLowerCase();

  for(var guess_block of guess)
  if(!guess_block["used"])
  {
   var guess_text = String_Filter_AllowAlphanum(guess_block["text"]).trim().toLowerCase();
  
   var similarity = 1 - String_Analysis_Distance(guess_text, target_text);
   
   // FOUND MATCH
   if(similarity >= threshold)
   {
	target_block["match"] = similarity;
	guess_block["used"]   = true;
	
	break;
   }
  }
  
 }

 return target; 
}





function String_Analysis_Distance(a, b, options = {})
{
 if(options["alphanum"])
 {
  a = String_Filter_AllowAlphanum(a, true);
  b = String_Filter_AllowAlphanum(b, true);
 }
	
	
 function _min(d0, d1, d2, bx, ay)
 {
  return d0 < d1 || d2 < d1 ? d0 > d2 ? d2 + 1 : d0 + 1 : bx === ay ? d1 : d1 + 1;
 }

 
 if(a === b) 
 {
  return 0;
 }

 if(a.length > b.length) 
 {
  var tmp = a;
  a = b;
  b = tmp;
 }

 var la  = a.length;
 var lb  = b.length;
 var max = Math.max(la, lb);  


 while(la > 0 && (a.charCodeAt(la - 1) === b.charCodeAt(lb - 1))) 
 {
  la--;
  lb--;
 }

 var offset = 0;

 while(offset < la && (a.charCodeAt(offset) === b.charCodeAt(offset))) 
 {
  offset++;
 }

 la -= offset;
 lb -= offset;

 if(la === 0 || lb < 3) 
 {
  return lb / max;
 }

 var x = 0, y, d0, d1, d2, d3, dd, dy, ay, bx0, bx1, bx2, bx3
 var vector = [];

 for(y = 0; y < la; y++) 
 {
  vector.push(y + 1);
  vector.push(a.charCodeAt(offset + y));
 }

 var len = vector.length - 1;

 for(; x < lb - 3;) 
 {
  bx0 = b.charCodeAt(offset + (d0 = x));
  bx1 = b.charCodeAt(offset + (d1 = x + 1));
  bx2 = b.charCodeAt(offset + (d2 = x + 2));
  bx3 = b.charCodeAt(offset + (d3 = x + 3));
  dd = (x += 4);
   
  for(y = 0; y < len; y += 2) 
  {
   dy = vector[y];
   ay = vector[y + 1];
   d0 = _min(dy, d0, d1, bx0, ay);
   d1 = _min(d0, d1, d2, bx1, ay);
   d2 = _min(d1, d2, d3, bx2, ay);
   dd = _min(d2, d3, dd, bx3, ay);
   vector[y] = dd;
   d3 = d2;
   d2 = d1;
   d1 = d0;
   d0 = dy;
  }
 }

 for(; x < lb;) 
 {
  bx0 = b.charCodeAt(offset + (d0 = x));
  dd  = ++x;
  for(y = 0; y < len; y += 2) 
  {
   dy = vector[y];
   vector[y] = dd = _min(dy, d0, dd, bx0, vector[y + 1]);
   d0 = dy;
  }
 }


 return dd / max;
}







// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                         B L O B S                                              //
//                                                                                                //
// -----------------------------------------------------------------------------------------------//


async function Blob_ToBase64(blob)
{
 var promise = new Promise((resolve, reject) =>
 {
  var reader = new FileReader();
  
  reader.onloadend = 
  function() 
  {		  
   var data = reader.result.split("base64,")[1];						  
   
   resolve(data);
  }			  
 
  reader.readAsDataURL(blob);
 });

 return promise;
}












// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                    F U N C T I O N S                                           //
//                                                                                                //
// -----------------------------------------------------------------------------------------------//


function Function_Debounce(func, wait)
{
 let timeout;

 return function executedFunction(...args) 
 {
  const later = 
  function()
  {
   clearTimeout(timeout);

   func(...args);
  }

  clearTimeout(timeout);

  timeout = setTimeout(later, wait);
 }
}





function Function_Throttle(func, interval)
{
 func["throttle-time"] = interval;
 
 if(!func["throttle-next"] || Date.now() > func["throttle-next"])
 {
  func["throttle-next"] = Date.now() + func["throttle-time"];
  func();
 }
} 




function Function_ThrottleEvent(callback, delay)
{
 let throttleTimeout = null;
 let storedEvent     = null;

 function throttledEventHandler(event)
 {
  storedEvent = event;

  const shouldHandleEvent = !throttleTimeout;

  if(shouldHandleEvent) 
  {
   callback(storedEvent);

   storedEvent = null;

   throttleTimeout = setTimeout(
   function()
   {
    throttleTimeout = null;

    if(storedEvent) 
	{
     throttledEventHandler(storedEvent);
    }
   }, delay);
  }
 }

 return throttledEventHandler;
}






async function Function_Worker(f)
{ 
 var params = []; 
 for(var i = 1; i < arguments.length; i++) params.push(arguments[i]);

 var promise = new Promise((resolve, reject) =>
 {
  // GET FUNCTION CODE AS STRING
  var text = f.toString(); 

  // EXTRACT ARGUMENTS
  var args = text.slice(text.indexOf("(") + 1, text.indexOf(")")); 
  args     = args.split(",");
  for(arg of args) arg = arg.trim();

  // ALTER FUNCTION CODE:
  
  // DECLARE ARGUMENTS AS VARIABLES
  var body  = "onmessage = function(){";
  body      = body +  text.slice(text.indexOf("{") + 1, text.lastIndexOf("}")); 
  for(var i = 0, c = params.length; i<c; i++) body = "var " + args[i] + " = " + JSON.stringify(params[i]) + ";" + body;
  
  // REPLACE RETURN STATEMENTS WITH THREAD POSTMESSAGE AND TERMINATION
  body      = body.replace(/return\s+([^;]*);/g, 'postMessage($1)');
  body      = body + "}";
  
  // CREATE WORKER FROM CONSTRUCTED CODE
  var code   = URL.createObjectURL(new Blob([body], {type:"text/javascript"}));
  var thread = new Worker(code);

  thread.onmessage =
  function(result)
  {
   resolve(result.data);
 
   thread.terminate();
  }
  
  // CALL WORKER
  thread.postMessage("");
  
 });

 return promise;
}





function Functions_List(filter, categorize, separator = "_")
{
 var functions = {};
 
 for(var id in window)
 {
  var f = window[id];
  
  if(typeof f == "function")
  {
   if(!f.toString().includes("native code"))
   {
	if(!filter || id.startsWith(filter))
	{
	 functions[id] = f;
	}
   }
  }
 }
 
 return functions;
}






// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                       C L I E N T                                              //
//                                                                                                //
// -----------------------------------------------------------------------------------------------//


function Client_Language_Get()
{
 var language = navigator.language.split("-");
 
 return language[0] || "en";
}





function Client_Location_Parameter(parameter)
{
 var url   = window.location.href;
 var value = URL_Parameter_Get(parameter, url);
 
 return value;
}



function Client_Location_Current()
{
 return document.location.origin + document.location.pathname;
}



function Client_Location_Clear()
{
 history.replaceState({}, "", Client_Location_Current());
}




async function Client_Wait(seconds)
{
 var time    = Math.floor(seconds  * 1000);

 var promise = new Promise((resolve, reject) =>
 {
  var wait = 
  setTimeout(
  function()
  {
   clearTimeout(wait);
   
   resolve();	  
  }, 
  time);
  
 });
 
 return promise;
}





function Client_Variables_Get()
{
 var variables =
 {
  host : location.origin
 }
 
 return variables;
}





function Client_Variables_Apply(string)
{ 
 var variables = Client_Variables_Get();
 var parsed    = String_Variables_Set(string, variables);
 
 return parsed;
}




async function Client_Screen_Info()
{
 var info          = {};
 info["secondary"] = [];
 
 var details = await getScreenDetails();
 
 for(var screen of details["screens"])
 {
  if(!screen.isPrimary) info["secondary"].push(screen); 
 }
 
 info["primary"] = details.currentScreen;
 
 return info;
}



function Client_Reload()
{
 document.location.reload();
}




async function Client_Picker(type, options = {})
{
 var promise = new Promise((resolve, reject) => 
 {
  var input = document.createElement("input");
  input.type             = type;
  input.style.position   = "absolute";
  input.style.zIndex     = 100;
  input.style.left       = options["left"] || (window.innerWidth  / 2) + "px";
  input.style.top        = options["top"]  || (window.innerHeight / 2) + "px";
  input.style.width      = "0px";
  input.style.height     = "0px";
  input.style.opacity    = 0;
 
  document.body.appendChild(input);

  input.onchange = 
  function(event)
  {
   resolve(input.value);
  } 

  input.onblur = 
  function(event)
  {
   resolve(false);
  }
 
  input.focus(); 
  setTimeout(function(){input.showPicker()}, 125); 
 });
 
 return promise;
}





// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                           S A F E                                              //
//                                                                                                //
// -----------------------------------------------------------------------------------------------//

function Safe_Set(object, field, value, setonly)
{
  // NOT AN OBJECT OR ARRAY? RETURN SAFEVALUE
 if(typeof object != "array" && typeof object != "object") return false;
 
 // LIST OF NESTED FIELDS IS A STRING? FIX IT TO ARRAY CONTAINING A SINGLE STRING
 if(typeof field == "string") field = [field];
 	
	
 var pointer = object;
 var level   = "";
 
 for(var i=0, c=field.length; i<c; i++) 
 {
  level = field[i];
 
  if(i == (c-1))
  {
   //if(!setonly || pointer[level] === undefined) 
   //{
	pointer[level] = value;
	return pointer;
   //}
  }
  else
  {
   if(typeof pointer[level] == "undefined") pointer[level] = {};
   pointer = pointer[level]
  }
 }
 
 return true;
}





function Safe_Get(object, field, safevalue)
{
 // NOT AN OBJECT OR ARRAY? RETURN SAFEVALUE
 if(typeof object != "array" && typeof object != "object") return safevalue;


 // LIST OF NESTED FIELDS IS A STRING? FIX IT TO ARRAY CONTAINING A SINGLE STRING
 if(typeof field == "string") field = [field];


 // DEFAULT TO SAFE VALUE
 var value = safevalue;
 
 // RUN
 var check = object;
 var i     = 0;
 var l     = field.length;
 
 while(typeof check[field[i]] != "undefined" && check[field[i]] != null)
 {
  check = check[field[i]];
  
  if(i == (l-1)) value = check; else i = i + 1;
 }
 
 return value;
}




function Safe_Add(object, field, inc)
{
 var value = Safe_Get(object, field);
 
 if(typeof value == "undefined") var value = 0;
 value = parseInt(value) + inc;
 
 Safe_Set(object, field, value);
}




function Safe_Switch(object, field, safedefault = true)
{
 var value = Safe_Get(object, field);
 if(typeof value == "undefined") var value = safedefault; else value = !value;
 
 Safe_Set(object, field, value);
}




function Safe_Delete(object, field)
{ 
 // NOT AN OBJECT OR ARRAY? RETURN SAFEVALUE
 if(typeof object != "array" && typeof object != "object") return false;
 
 // LIST OF NESTED FIELDS IS A STRING? FIX IT TO ARRAY CONTAINING A SINGLE STRING
 if(typeof field == "string") field = [field];

	
 var pointer = object;
 var level   = "";
 
 for(var i=0, c=field.length; i<c; i++) 
 {
  level = field[i];
 
  if(i == (c-1))
  {
   delete pointer[level];
   return true;
  }
  else
  {
   if(typeof pointer[level] == "undefined") pointer[level] = {};
   pointer = pointer[level]
  }
 }
 
 return false;
}





function Safe_Push(object, field, item)
{
 // NOT AN OBJECT OR ARRAY? RETURN SAFEVALUE
 if(typeof object != "array" && typeof object != "object") return false;
 	
 if(!object[field]) object[field] = [];
 object[field].push(item);
 
 return item;
}




/*function Safe_Push(object, field, item)
{
 if(typeof object != "array" && typeof object != "object") return false;
 	
 var pointer = object;
 var level   = "";
 
 for(var i=0, c=field.length; i<c; i++) 
 {
  level = field[i];
 
  if(i == (c-1))
  {
   pointer[level].push(item);
  }
  else
  {
   if(typeof pointer[level] == "undefined") pointer[level] = [];
   pointer = pointer[level]
  }
 }
 
 return true;
}*/






function Safe_JSON(string, saferesult)
{ 
 try
 {
  var result = JSON.parse(string);
 }
 catch
 {
  var result = saferesult;
 }
 
 return result;
}




function Safe_JSON_Field(object, field, safevalue)
{
 var json  = Safe_Get(object, field, "");

 var value = Safe_JSON(json, safevalue);
 
 Safe_Set(object, field, value);
 
 return value;
}
 





function Safe_Function(funcname, safefunc)
{
 if(window[funcname]) return window[funcname]; else return safefunc;
}




function Safe_Length(item)
{
 if(Array.isArray(item))  return item.length;
 
 if(typeof item == "object") return Object.keys(item).length;
 
 return 0; 
}




function Safe_Validate(item)
{
 switch(typeof item)
 {
  case "object":
	if(Array.isArray(item)) return (item.length != 0); else return (Object.keys(item) != 0);
  break;
  
  default:
	return (item != false) && (item != null);
  break;
 }
}







// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                        P A T H S                                               //
//                                                                                                //
// -----------------------------------------------------------------------------------------------//


function Path_Filename(path)
{
 return path.replace(/^.*[\\\/]/, '');
}




function Path_Extension(filename)
{
 var extension = filename.split('.').pop();
 
 if(extension == filename) return ""; else return extension;
}




function Path_Folder(path)
{
 return path.match(/(.*)[\/\\]/)[1]||'';
}




function Path_RemoveExtension(filename)
{
 return filename.substr(0, filename.lastIndexOf('.')) || filename;
}








// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                         C O L O R S                                            //
//                                                                                                //
// -----------------------------------------------------------------------------------------------//



function Color_Hex_ToRGBA(hex, alpha = 1)
{
 hex   = hex.trim().toLowerCase(); 
 var c = hex.substring(1).split('');
 
 if(c.length== 3)
 {
  c = [c[0], c[0], c[1], c[1], c[2], c[2]];
 }
 
 c= '0x'+c.join('');
 
 var rgba = [(c>>16)&255, (c>>8)&255, c&255];
 
 
 return 'rgba(' + rgba.join(',')+', ' + alpha + ')';
}



function Color_Shade(color, percent) 
{
 if(percent == 0) return color;
	 
 color = color.trim();

 var R = parseInt(color.substring(1,3),16);
 var G = parseInt(color.substring(3,5),16);
 var B = parseInt(color.substring(5,7),16);

 R = parseInt(R * (100 + percent) / 100);
 G = parseInt(G * (100 + percent) / 100);
 B = parseInt(B * (100 + percent) / 100);

 R = (R<255) ? R: 255;  
 G = (G<255) ? G: 255;  
 B = (B<255) ? B: 255;  
 
 var RR = ((R.toString(16).length==1) ? "0" + R.toString(16): R.toString(16));
 var GG = ((G.toString(16).length==1) ? "0" + G.toString(16): G.toString(16));
 var BB = ((B.toString(16).length==1) ? "0" + B.toString(16): B.toString(16));

 return "#" + RR + GG + BB;
}









// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                       R E Q U E S T S                                          //
//                                                                                                //
// -----------------------------------------------------------------------------------------------//

async function Request_Response(response, type, options = {})
{
 switch(type)
 {
  case "text":
	var  data = await response.text();
  break;
  
  case "json":
	var text = await response.text();
	var data = Safe_JSON(text);
  break;
  
  case "blob":
	var data = await response.blob();
  break;
  
  case "csv":
	
	var text = await response.text();
	
	// SPLIT IN LINES
	var delimiter = options["delimiter"] || ";";	
	var lines     = text.split("\r\n");
	for(var i in lines)
	{
     lines[i] = lines[i].split(delimiter);
	}
	
	// FIRST LINE = FIELDS?
	var fields = options["fields"];
	if(fields && lines.length > 1)
	{
     var data   = [];
	 var fields = lines[0]; console.log(fields);
	 
	 for(var i = 1; i<lines.length; i++)
	 {
	  var obj  = {};
	  var line = lines[i];
	  
      for(var n in fields)
	  {
	   var field = fields[n];
	   var value = line[n];
	   
	   obj[field] = value;
	  }
	  
	  data.push(obj);
	 }	
	}
	
	else
    
	{
	 var data = lines;
	}
	
  break;
 }
 
 return data;
}





async function Request_Load(url, type, options)
{
 var response = await fetch(url);
 var data     = await Request_Response(response, type, options);
 
 return data;
}






async function Request_Post(url, data, type, header)
{
 var config = 
 {
  method: "POST",
  headers: {
		    'Content-Type': 'application/json'
           },
  body:   JSON.stringify(data)		   
 }
 
 var response = await fetch(url, config);
 console.log("response:",response);
 var data     = await Request_Response(response, type);
 console.log("data:",data);
 return data;
}







async function Request_Upload(uploader, onuploadstart, options) 
{ 
 var promise = new Promise((resolve, reject) =>
 {
  if(uploader.indexOf("?") == -1) uploader = uploader + "?";
  
  var input           = document.createElement("input");
  input.type          = "file";
  input.style.display = "none";
  document.body.appendChild(input);
 
  // 1b - WHEN THE USER HAS PICKED A FILE...
  input.addEventListener("change",
  function()
  { 
   console.log("input change");
   
   input.changed = true;
   document.body.removeChild(input);
  
   var file = input.files[0];
  
   if(onuploadstart) onuploadstart();
  
   var reader = new FileReader();
  
   // 2b - WHEN THE FILE HAS BEEN READ FROM LOCAL DEVICE...
   reader.onloadend = 
   function() 
   {
    var data = reader.result;
    if (data.indexOf("base64,") > 0)
    {
     data = data.split("base64,")[1];
    }
   
    // CHECK FILESIZE LIMIT, IF SPECIFIED
    if(options && options["maxsize"] && (data.length > options["maxsize"]))  	  
    {
	 resolve({status:"error", reason:"too big"});
    }
    else
    // FILESIZE IS OK, MOVE ON	    
    {
     var request = new XMLHttpRequest();
    
     request.open("POST", uploader + "&srcfilename=" + Path_Filename(reader.source.name), true);
     request.setRequestHeader("Content-Type", `${file.type}`);
  
     // 3b - WHEN DATA HAS BEEN RECEIVED BY THE SERVER...
     request.onreadystatechange =
     function()
     { 
	  if(request.readyState==4 && request.status==200)
      {
	   var response = request.responseText;	
    
	   resolve({status:"ok", path:response});
      }		 
     }

     // 3a - SEND DATA TO THE SERVER
     request.send(data); 
    }
   
   }
   
   // 2a - READ FILE FROM LOCAL DEVICE 
   reader.source = file;
   reader.readAsDataURL(file);
  },
  false);
 
  // 1a - FIRE UP FILE SELECTION DIALOG
  window.addEventListener("focus",
  function()
  {
   setTimeout(
   function()
   {
    if(!input.changed) resolve({status:"cancelled"});  
   }, 250);
  }, 
  {once:true});

  input.click();
 });
 
 return promise;
}




async function Request_Download(url)
{
 var name = Path_Filename(url);
 var blob = await Request_Load(url, "blob");

 await Storage_Blob_Download(blob, name); 
}








// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                      S T O R A G E                                             //
//                                                                                                //
// -----------------------------------------------------------------------------------------------//



async function Storage_File_Read(source, options = {})
{
 var promise = new Promise((resolve, reject) =>
 {
  var reader = new FileReader();
  
  reader.onloadend = 
  function() 
  {
   var data = reader.result;
   
   if(!options["whole"])
   {
    if(data.indexOf("base64,") > 0)
    {
     data = data.split("base64,")[1];
    }
   }
   
   resolve(data);  
  }
 
  reader.source = source;
  reader.readAsDataURL(source);
 });
 
 return promise;
}




async function Storage_File_ReadText(source, options = {})
{
 var promise = new Promise((resolve, reject) =>
 {
  var reader = new FileReader();
  
  reader.onloadend = 
  function() 
  {
   var data = reader.result;
   
   resolve(data);  
  }
 
  reader.source = source;
  reader.readAsText(source, 'UTF-8');
 });
 
 return promise;
}




async function Storage_File_ReadBlob(source, options)
{
 var promise = new Promise((resolve, reject) =>
 {
  var reader = new FileReader();
  
  reader.onloadend = 
  function() 
  {
   var data = reader.result;
   
   resolve(data);  
  }
 
  reader.source = source;
  reader.readAsBlob(source);
 });
 
 return promise;
}



async function Storage_File_Select(options = {})
{
 var promise = new Promise((resolve, reject) =>
 {
  // SETUP FILE SELECT DIALOG
  var selector           = document.createElement("input");
  selector.type          = "file";
  selector.style.display = "none";
  
  selector.accept        = options["accept"];
  selector.changed       = false;
  
  if(options["multiple"]) selector.multiple = "multiple";
  
 
  // DETECT FILES SELECTED
  selector.addEventListener("change",
  function()
  {     
   selector.changed = true;
   var selected     = selector.files;
   
   console.log("selected files", selected);  
   resolve(selected);
  }, 
  false);
  
  
  // DETECT IF NO FILES SELECTED
  window.addEventListener("focus",
  function()
  {   
   setTimeout(
   function()
   {
	var changed = selector.changed;
	selector.remove();
 
    if(!changed) 
	{
     console.log("no files selected");
	 resolve([]);  
	}
   }, 500);
  }, 
  {once:true});
  
 
  // TRIGGER SELECTOR
  document.body.appendChild(selector);
  selector.click();
 });
 
 return promise;
}





async function Storage_File_Upload(filename, data, type, uploader, options)
{
 var promise = new Promise((resolve, reject) =>
 {
  // SETUP REQUEST
  var request = new XMLHttpRequest();
    
  request.open("POST", uploader + "&srcfilename=" + Path_Filename(filename), true);
  request.setRequestHeader("Content-Type", type);
  
  // ON SERVER RESPONSE
  request.onreadystatechange =
  function()
  { 
   if(request.readyState == 4 && request.status == 200)
   {
	var response = request.responseText;	
    
	resolve({status:"ok", path:response});
   } 		 
  }

  // SEND DATA TO THE UPLOADER
  request.send(data); 
 });
 
 return promise;
}






async function Storage_Files_Upload(files, uploader, options = {}, onfileuploaded)
{
 for(var file of files)
 {
  console.log(file);
  
  var filename = Safe_Get(options, ["filename"]) || file["override-name"] || file["name"];
  
  var data     = await Storage_File_Read(file);
  var response = await Storage_File_Upload(filename, data, file["type"], uploader, options);

  if(onfileuploaded) onfileuploaded(filename, data, response);
 }
}





function Storage_Blob_Download(blob, filename)
{
 url = URL.createObjectURL(blob);
 
 var a           = document.createElement("a");
 a.style.display = "none";
 a.href          = url;
 a.download      = filename;
 a.click();
 
 URL.revokeObjectURL(url)
}





function Storage_Data_Download(data, filename, mimetype)
{
 if(typeof(data) == "object") var data = JSON.stringify(data, null, 2);
 
 var blob = new Blob([data], {type:mimetype});
 
 Storage_Blob_Download(blob, filename);
}








// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                           U R L S                                              //
//                                                                                                //
// -----------------------------------------------------------------------------------------------//



function URL_Parameter_Get(parameter, url)
{
 if(!url) var url = window.location.href;
 
 var urlobject = new URL(url);
 var value     = urlobject.searchParams.get(parameter);
 
 return value;
}





function URL_Encode(str) 
{
  str = (str + '').toString();

  // Tilde should be allowed unescaped in future versions of PHP (as reflected below), but if you want to reflect current
  // PHP behavior, you would need to add ".replace(/~/g, '%7E');" to the following.
  return encodeURIComponent(str)
    .replace(/!/g, '%21')
    .replace(/'/g, '%27')
    .replace(/\(/g, '%28')
    .
  replace(/\)/g, '%29')
    .replace(/\*/g, '%2A')
    .replace(/%20/g, '+');
}





function URL_Decode(str) 
{
 return decodeURIComponent((str + '').replace(/%(?![\da-f]{2})/gi, function () {
        // PHP tolerates poorly formed escape sequences
        return '%25';
    }).replace(/\+/g, '%20'));
}











// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                     G E O M E T R Y                                            //
//                                                                                                //
// -----------------------------------------------------------------------------------------------//

function Geometry_Point_InRect(x, y, r) 
{
 return x >= r.left && x < r.right && y >= r.top && y < r.bottom;
}



function Geometry_Rect_Intersect(rect1, rect2)
{
 return !( rect1.top > rect2.bottom || rect1.right < rect2.left || rect1.bottom < rect2.top || rect1.left > rect2.right);
}




function Geometry_Rect_Displacement(rect, corner)
{
 switch(corner)
 {
  case "top":
	var x = rect.width / 2;
    var y = 0;
  break;	
  
  case "center":
	var x = rect.width  / 2;
    var y = rect.height / 2;
  break;	
  
  case "bottom":
	var x = rect.width / 2;
    var y = rect.height;
  break;	
	 
	 
	 
  case "right top":
	var x = rect.width;
    var y = 0;
  break;

  case "right":
	var x = rect.width;
    var y = rect.height / 2;
  break;
  
  case "right bottom":
	var x = rect.width;
    var y = rect.height;
  break;
  
 
  
  case "left top":
	var x = 0;
    var y = 0;
  break;
  
  case "left":
	var x = 0;
    var y = rect.height / 2;
  break
  
  case "left bottom":
	var x = 0;
    var y = rect.height;
  break;
 }
 
 return {left:x, top:y};
}





function Geometry_Rect_Corner(rect, corner)
{
 var displacement = Geometry_Rect_Displacement(rect, corner);
 var x = rect.left + displacement["left"]; 
 var y = rect.top  + displacement["top"];
 
 return {left:x, top:y};
}




function Geometry_Rect_Inside(rect1, rect2)
{
 return ( ((rect2.top <= rect1.top) && (rect1.top <= rect2.bottom)) && ((rect2.top <= rect1.bottom) && (rect1.bottom <= rect2.bottom)) && ((rect2.left <= rect1.left) && (rect1.left <= rect2.right)) && ((rect2.left <= rect1.right) && (rect1.right <= rect2.right)) );
}



function Geometry_Rect_Translate(rect, x, y)
{
 var result = {};
 
 result.left   = rect.left   + x;
 result.right  = rect.right  + x;
 result.width  = rect.width  + x;
 result.top    = rect.top    + y;
 result.bottom = rect.bottom + y;
 result.height = rect.height + y;
 
 return result;
}



function Geometry_Line_Points(x0, y0, x1, y1)
{
 var points = [];
	
 var dx = Math.abs(x1-x0);
 var dy = Math.abs(y1-y0);
 var sx = (x0 < x1) ? 1 : -1;
 var sy = (y0 < y1) ? 1 : -1;
 var err = dx-dy;

 while(true)
 {
  points.push({x:x0, y:y0}); 

  if ((x0==x1) && (y0==y1)) break;
  var e2 = 2*err;
  if (e2 >-dy){ err -= dy; x0  += sx; }
  if (e2 < dx){ err += dx; y0  += sy; }
 }
 
 return points;
}












// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                      N U M B E R S                                             //
//                                                                                                //
// -----------------------------------------------------------------------------------------------//



function Numbers_Interpolate(x, y, a)
{
 return x * (1 - a) + y * a;
}




function Numbers_PercentageDifference(a, b)
{
 return  100 * Math.abs( ( a - b ) / ( (a + b)/2 ) );
}




function Numbers_PercentageDistance(a, b)
{
 return (b - a) * 100;
}




function Numbers_Random(min, max)
{
 return Math.floor(Math.random() * (max - min)) + min;
}



function Numbers_Between(x, a, b)
{
 return x >= a && x <= b;
}



function Numbers_Within(x, a, b)
{
 return x > a && x < b;
}



function Numbers_Range_Intersect(ra, rb)
{
 return Numbers_Within(ra["from"], rb["from"], rb["to"]) || Numbers_Within(ra["to"],   rb["from"], rb["to"]) || Numbers_Within(rb["from"], ra["from"], ra["to"]) || Numbers_Within(rb["to"], ra["from"], ra["to"]);
}




function Numbers_Is_Even(n)
{
 return (n % 2 == 0);
}



function Numbers_Is_Odd(n)
{
 return (n % 2 != 0);
}




// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                I N T E R P O L A T I O N                                       //
//                                                                                                //
// -----------------------------------------------------------------------------------------------//



async function Interpolation_Thread(target, values, time, options = {fps:60}, events)
{
 var promise = new Promise((resolve, reject) =>
 { 
  var interpolator               = {};
  
  interpolator["target"]         = target;
  interpolator["keys"]           = Object.keys(values);
  
  interpolator["start-time"]     = Date.now();
  interpolator["start-values"]   = Object_Subset(target, interpolator["keys"], "collect");
  interpolator["end-values"]     = values;
  
  interpolator["execution-time"] = time;
  interpolator["execution-freq"] = options["fps"];
  
  
  interpolator["thread"]         = setInterval(
  function()
  {
   interpolator["elapsed-time"]  = Date.now() - interpolator["start-time"];
   interpolator["interpolation"] = interpolator["elapsed-time"] / (interpolator["execution-time"] * 1000);
   
   for(var key of interpolator["keys"])
   {
	var a = parseFloat(interpolator["start-values"][key]);
	var b = parseFloat(interpolator["end-values"][key]);
	
    interpolator["target"][key] = Numbers_Interpolate(a, b, interpolator["interpolation"]);
	
	if(events && events["onchange"]) events["onchange"](interpolator);
   }
   
   if(interpolator["interpolation"] >= 1)
   {
	clearInterval(interpolator["thread"]);
	
	resolve();
   }	   
  },
  
  Math.floor(1000/ interpolator["execution-freq"]));
  
  this["interpolator"] = interpolator;
 });
 
 return promise;
}






// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                       D A T A S E T S                                          //
//                                                                                                //
// -----------------------------------------------------------------------------------------------//


function Dataset_Compute_CumulativeAverages(dataset, field, scale)
{ 
 var output = [];
 
 var max    = dataset.length * scale;
 var total  = 0;
 for(var item of dataset)
 {
  total     = total + Safe_Get(item, field, 0);
  var score = (total / max) * scale;
  
  output.push(score);
 }
 
 return output;
}// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                     T E M P L A T E                                            //
//                                                                                                //
// -----------------------------------------------------------------------------------------------//

async function Template_OnLoad(module, data)
{
}



async function Template_OnShow(module, data)
{
}




async function Template_OnUnload()
{
}





// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                          M O R E                                               //
//                                                                                                //
// -----------------------------------------------------------------------------------------------//// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                   A P P O I N T M E N T S                                      //
//                                                                                                //
// -----------------------------------------------------------------------------------------------//

async function Appointments_OnLoad(module, data)
{
 // SET BY URL?
 var date = Client_Location_Parameter("date");
 
 // SET IN STATE?
 if(!date) var date = Core_State_Get("appointments", "date", Date_Portion(Date_Now(), "date-only"))
 
 // HANDLERS
 await Appointments_LoadHandlers();
 
 // UPDATE STATE
 Core_State_Set("appointments", "date", date);
 
 // CENTER SELECTOR
 var select = UI_Element_Find(module, "appointments-center");
 
 var scope  = User_Config("appointments-scope");
 switch(scope)
 {
  case "all":
  break;
  
  case "center":
	Document_Element_Disable(select, "style-disabled");
  break;
  
  case "user":
	select.style.display = "none";
  break;
 }	 

 
}



async function Appointments_OnShow(module, data)
{
 // CONTROLS
 UI_Element_Find(module, "nav-goto").onclick   = Appointments_Navigation_GoTo;
 UI_Element_Find(module, "nav-prev").onclick   = Appointments_Navigation_Prev;
 UI_Element_Find(module, "nav-next").onclick   = Appointments_Navigation_Next;
 UI_Element_Find(module, "nav-update").onclick = Appointments_Navigation_Update;
 UI_Element_Find(module, "nav-search").onclick = Appointments_Navigation_Search;
 
 
 // CENTERS
 var select       = UI_Element_Find(module, "appointments-center");
 select.innerHTML = "";
 
 var centers = Centers_List();
 for(var center in centers)
 {  
  Document_Select_AddOption(select, Centers_Name(center), center);
 }
 select.value    = Client_Location_Parameter("view-center") || Core_State_Get("appointments", "view-center", User_Center());
 select.onchange = Appointments_SetCenter;
 
 await Appointments_SetCenter(module);
 
 await Appointments_Update(); 
}





async function Appointments_OnUnload()
{
}



async function Appointments_LoadHandlers()
{
 // LOAD ALL POSSIBLE APPOINTMENT HANDLERS
 //var roles = User_Config("appointments-handlers-roles");
 var roles = "sales,tutor,director,desk";
 roles     = roles.split(",");
 
 var users = await Core_Api("Users_List_ByRole", {role:roles, fields:"id,firstname,lastname,center"});
 users     = Array_Catalog_ByField(users, "center");
 
 Core_State_Set("appointments", "handlers", users);
}




async function Appointments_SetCenter()
{
 var module = Module_Body();
 
 var center = UI_Element_Find(module, "appointments-center").value;
 Core_State_Set("appointments", "view-center", center)
 
 await Appointments_Update();
}





// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                          M O R E                                               //
//                                                                                                //
// -----------------------------------------------------------------------------------------------//


async function Appointments_Update(highlight)
{
 var module        = Module_Body();

 var center        = UI_Element_Find(module, "appointments-center").value;		
 var date          = Core_State_Get("appointments", "date");
 var locale        = UI_Language_Current(true);
 
 var element       = UI_Element_Find("appointments-date");
 element.innerHTML = Date_Format(date, locale, "date-long-weekday-noyear").toUpperCase(); 
 
 
 switch(User_Config("appointments-scope"))
 {
  case "user":
	var center_id = Core_State_Get("appointments", "view-center");
	var user_id   = User_Id();
  break;
  
  case "all":
  case "center":
	var center_id = Core_State_Get("appointments", "view-center");
  break;

  default:
	var center_id = false;
	var user_id   = User_Id();
  break;  
 }
 
 
 // GET APPOINTMENTS
 var date_from = Date_Portion(date, "date-only") + "0000";
 var date_to   = Date_Portion(date, "date-only") + "2359";
 var list      = await Core_Api("Appointments_List", {user_id, center_id, date_from, date_to, info:["users"]});
 
 
 Core_State_Set("appointments", "list", list);
 await Appointments_Display(list, {sections:"time", highlight});
}




async function Appointments_Display(list, options = {})
{
 console.log(list);
 console.log(options);
 
 var date          = Core_State_Get("appointments", "date");
 var locale        = UI_Language_Current(true);
 
 // LIST
 var container       = UI_Element_Find("appointments-list");
 container.innerHTML = "";
 
 
 if(User_Can("create-appointments")) var state_new = "enabled"; else var state_new = "disabled";
 
 // CONTAINER MENU
 var menu = UI_Menu_Create("list", 
 {
  new:
  {
   text  : UI_Language_String("appointments/card", "menu new"),
   state : state_new,  
   icon  : "calendar-plus",
   func  : Appointments_Appointment_New
  },
  
  search:
  {
   text  : UI_Language_String("appointments/card", "menu search"),
   state : "enabled",  
   icon  : "magnifying-glass",
   func  : Appointments_Navigation_Search
  } 
 });
 
 UI_Menu_Assign(container, menu);
 
 var highlight_card  = false;
 var section         = "";


 for(var appointment of list)
 {
  
  // SECTION
  switch(options["sections"])
  {
   case "time":
	var app_time = Date_Portion(appointment["date"], "time-only");
    if(app_time != section)
    {   
     section = app_time;
  
     var element = UI_Element_Create("appointments/appointment-section", 
     {
  	  time:Date_Format(appointment["date"], locale, "time-only")
     });
   
     container.appendChild(element); 
	}
   break;
	
   case "dates":
	var app_date = Date_Portion(appointment["date"], "date-only");
	
	if(app_date != section)
    {   
     section = app_date;
  
     var element = UI_Element_Create("appointments/appointment-section", 
     {
  	  time:String_Capitalize_Camel(Date_Format(appointment["date"], locale, "date-time-long"), " ", " ")
     });
   
     container.appendChild(element); 
	}
   break;   
  }
  
  
  
  // APPOINTMENT CARD
  var element = await Appointments_Appointment_Card(appointment, options);
  
  
  // DISPLAY
  container.appendChild(element); 
 }
 
 
 if(highlight_card)
 {
  Document_Element_Animate(highlight_card, "flash 1.5s 1.5");
  highlight_card.scrollIntoView({behavior: "smooth", block: "center"});
 }
}



async function Appointments_Appointment_Card(appointment = {}, options = {})
{
 // CHECK HANDLERS
 if(!Core_State_Get("appointments", "handlers")) await Appointments_LoadHandlers(); 

	
 // COMPILE CARD
 var element = UI_Element_Create("appointments/appointment-card", appointment, {language:"appointments/card"});
 Document_Element_SetData(element, "appointment", appointment["id"]);
 Document_Element_SetData(element, "datetime", appointment["date"]);
  
 if(options["highlight"] && (appointment["id"] == options["highlight"]))
 {
  highlight_card = element;
 }
 
 
 // LOCATION
 if(options["location"])
 {
  UI_Element_Find(element, "location-row").style.display = "flex";
  UI_Element_Find(element, "center").innerHTML           = Centers_Name(appointment["center_id"]);   
  UI_Element_Find(element, "date").innerHTML             = Date_Format(appointment["date"], UI_Language_Current(true), "date-long-weekday-noyear") + ", " + Date_Format(appointment["date"], UI_Language_Current(true), "time-only");
 }
  
  
 // VISITOR
 var text       = UI_Element_Find(element, "visitor");
 text.value     = appointment["visitor"];
 Document_Element_SetData(text, "field", "visitor");
 text.onchange  = Appointments_Appointment_UpdateField;
 
  
 // HANDLER
 var select = UI_Element_Find(element, "handler");
 Document_Select_AddOption(select, UI_Language_String("appointments/card", "handler placeholder"), "");
  
 var all_handlers = Core_State_Get("appointments", "handlers");
 var handlers     = all_handlers[appointment["center_id"]];
 
 for(var handler of handlers)
 {
  var option      = document.createElement("option");
  option["value"] = handler["id"];
  option["text"]  = [handler["firstname"], handler["lastname"]].join(" ");
   
  select.appendChild(option);
 }	  
 
 select.value = appointment["handler_id"];
 Document_Element_SetData(select, "field", "handler_id");
 select.onchange  = Appointments_Appointment_UpdateField;
 
 
 
 // SOURCE
 var select       = UI_Element_Find(element, "source");
 UI_Select_FromDatapage(select, "appointments/sources");
 Document_Select_AddOption(select, "", "");
 select.value     = appointment["source"];
 Document_Element_SetData(select, "field", "source");
 select.onchange  = Appointments_Appointment_UpdateField;
  
 // OUTCOME
 var select       = UI_Element_Find(element, "outcome");
 UI_Select_FromDatapage(select, "appointments/outcomes");
 Document_Select_AddOption(select, "", "");
 select.value     = appointment["outcome"];
 Document_Element_SetData(select, "field", "outcome");
 select.onchange  = Appointments_Appointment_UpdateField;
  
  
 // CREATOR (OPTIONAL)
 if(User_Flag("appointments-view-extra", "creator"))
 {
  var user = Safe_Get(appointment, ["creator_info"], {});
  var name = [user["firstname"] || "", user["lastname"] || ""].join(" ");
  UI_Element_Find(element, "creator-name").innerHTML = name;
  
  UI_Element_Find(element, "creator").style.display = "flex";
 } 
  
  
 // PHONE
 var text       = UI_Element_Find(element, "phone");
 text.value     = appointment["phone"];
 Document_Element_SetData(text, "field", "phone");
 text.onchange  = Appointments_Appointment_UpdateField;
  
 // EMAIL
 var text       = UI_Element_Find(element, "email");
 Document_Element_SetData(text, "field", "email");
 text.value     = appointment["email"];
 text.onchange  = Appointments_Appointment_UpdateField;
  
 // TEXT
 var text       = UI_Element_Find(element, "text");
 Document_Element_SetData(text, "field", "text");
 text.value     = appointment["text"];
 text.onchange  = Appointments_Appointment_UpdateField;
 
 // NOTES
 var text       = UI_Element_Find(element, "notes");
 Document_Element_SetData(text, "field", "notes");
 text.value     = appointment["notes"];
 text.onchange  = Appointments_Appointment_UpdateField;
  
  
 // HIDE SECTIONS BASED ON ROLE
 var sections = User_Config("appointments-sections-hide") || "";
 sections = sections.split(",");
 
 for(var section of sections)
 {
  var div = UI_Element_Find(element, "section-" + section);
  if(div) div.style.display = "none";
 } 
 
  
  
 // ASSIGN MENU
 var items = [];
  
 var item        = {};
 item["text"]    = UI_Language_String("appointments/card", "menu delete");
 item["state"]   = "enabled";
 item["icon"]    = "trash-can";
 item["func"]    = Appointments_Appointment_Delete;
 items["delete"] = item;
  
 var item        = {};
 item["text"]    = UI_Language_String("appointments/card", "menu move");
 item["state"]   = "enabled";
 item["icon"]    = "share-from-square";
 item["func"]    = Appointments_Appointment_Move;
 items["move"] = item;
  
 var menu  = UI_Menu_Create("card", items);
 UI_Menu_Assign(element, menu);
  
 return element;
}






async function Appointments_Appointment_New(item)
{
 var popup   = false;
 var content = false;
 
 // NEW APPOINTMENT
 var button = 
 {
  text:   UI_Language_String("appointments/popups", "new button create"),
  onclick:
  async function()
  {
   newdate        = Datetime_From_Input(UI_Element_Find(content, "datetime").value);
   var creator_id = User_Id();
   var user_id    = User_Id
   var center_id  = UI_Element_Find(content, "center").value;
   
   var id         = await Core_Api("Appointments_Appointment_New", {date:newdate, creator_id, user_id, center_id});
  
   Core_State_Set("appointments", "date", newdate);
   await Appointments_Update(id);
   
   await UI_Popup_Close(popup);
  }
 }  
  
 var title     = UI_Language_String("appointments/popups", "new title");
 var picture   = Resources_URL("images/cover-booking.png");

 content       = UI_Element_Create("appointments/popup-new");
 
 var control   = UI_Element_Find(content, "datetime");
 control.value = Datetime_To_Input(Core_State_Get("appointments", ["date"]) || Date_Now());
 
 var control   = UI_Element_Find(content, "center");
 Centers_To_Select(control);
 control.value = Core_State_Get("appointments", ["view-center"]) || User_Center();
 if(User_Config("appointments-centers") != "all") control.style.display = "none";

 popup  =  await UI_Popup_Create({title, picture, content}, [button], undefined, {escape:true, open:false});

 await UI_Popup_Show(popup);
 
 //var newdate  = await UI_Popup_DateTime(Date_Now(), title, undefined, button, picture);
}



async function Appointments_Appointment_Delete(item)
{
 // MENU ITEM --> MENU --> SOURCE CARD --> ID
 var menu = Document_Element_GetObject(item, "menu");
 var card = menu["source-parent"];
 var id   = Document_Element_GetData(card, "appointment");
 
 var title    = UI_Language_String("appointments/popups", "delete title");
 var subtitle = UI_Language_String("appointments/popups", "delete subtitle");
 var picture  = Resources_URL("images/cover-alert.jpg");
 var confirm = await UI_Popup_Confirm(title, subtitle, picture);
 
 console.log(card);
 if(confirm)
 {
  await Core_Api("Appointments_Appointment_Delete", {id});
  
  await Document_Element_Animate(card, "zoomOut 1.5s 1");
  card.remove();
 }
}





async function Appointments_Appointment_Move(item)
{
 // MENU ITEM --> MENU --> SOURCE CARD --> DATE & ID
 var menu = Document_Element_GetObject(item, "menu");
 var card = menu["source-parent"];
 var date = Document_Element_GetData(card, "datetime");
 var id   = Document_Element_GetData(card, "appointment");
 
 var title    = UI_Language_String("appointments/popups", "move title");
 var subtitle = UI_Language_String("appointments/popups", "move text");
 var button   = UI_Language_String("appointments/popups", "move button move");
 var picture  = Resources_URL("images/cover-booking.png");
 
 var newdate  = await UI_Popup_DateTime(Date_Now(), title, subtitle, button, picture);
 if(newdate) 
 {
  newdate = Date_To_UTC(newdate);
  newdate = Date_Portion(newdate, "no-seconds");
  
  // MOVE ITEM TO NEW DATE
  await Core_Api("Appointments_Appointment_Set", {id, field:"date", value:newdate});
  
  // RELOAD WITH NEW DATE AND FLASH ITEM
  Core_State_Set("appointments", "date", Date_Portion(newdate, "date-only"));
  await Appointments_Update(id);	   
 } 
}




async function Appointments_Appointment_UpdateField(event)
{
 var element = event.currentTarget;
 var field   = Document_Element_GetData(element, "field");
 var value   = element.value;
 var card    = Document_Element_FindParent(element, "appointment");
 var id      = Document_Element_GetData(card, "appointment");
 
 await Core_Api("Appointments_Appointment_Set", {id, field, value});
}








// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                     N A V I G A T I O N                                        //
//                                                                                                //
// -----------------------------------------------------------------------------------------------//



async function Appointments_Navigation_Update(event)
{
 await Appointments_Update();
}




async function Appointments_Navigation_GoTo(event)
{
 var element  = event.currentTarget;
 var position = Document_Element_Corner(element, "center");
 
 var date = await Client_Picker("date", position);
 if(date)
 {
  date = Date_From_Input(date);
  
  Core_State_Set("appointments", "date", date);
  await Appointments_Update();	  
 }
}



async function Appointments_Navigation_Next(event)
{
 var date = Core_State_Get("appointments", "date");	
 date     = Date_Add_Days(date, 1);
 
 Core_State_Set("appointments", "date", date);
 await Appointments_Update();	
}



async function Appointments_Navigation_Prev(event)
{
 var date = Core_State_Get("appointments", "date");	
 date     = Date_Add_Days(date, -1);
 
 Core_State_Set("appointments", "date", date);
 await Appointments_Update();	
}



async function Appointments_Navigation_Search(event)
{
 var title    = UI_Language_String("appointments/popups", "search title");
 var subtitle = UI_Language_String("appointments/popups", "search subtitle", {days:30});
 var picture  = Resources_URL("images/cover-booking.png");
 var search   = await UI_Popup_Input(title, subtitle, picture);
 if(!search) return;
  
 var date_from = Date_Portion(Date_Add_Days(Date_Now(), -30), "date-only");
 var date_to   = Date_Portion(Date_Add_Days(Date_Now(), +30), "date-only");
 
 switch(User_Config("appointments-scope"))
 {
  case "user":
	var center_id = false;
	var user_id   = User_Id();
  break;
  
  case "all":
  case "center":
	var center_id = Core_State_Get("appointments", "view-center");
  break;

  default:
	var center_id = false;
	var user_id   = User_Id();
  break;  
 }
 
 var list      = await Core_Api("Appointments_Search", {search, center_id, user_id, date_from, date_to});
  
 // NO RESULTS? 
 if(!list || list.length == 0)
 {
  var title    = UI_Language_String("appointments/popups", "noresults title");
  var subtitle = UI_Language_String("appointments/popups", "noresults subtitle");
  var picture  = Resources_URL("images/cover-deny.png");
 
  await UI_Popup_Alert(title, subtitle, picture);
  
  return;	 
 }
  
 Core_State_Set("appointments", "list", list);
 await Appointments_Display(list, {sections:"dates"}); 
}// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                       C E N T E R S                                            //
//                                                                                                //
// -----------------------------------------------------------------------------------------------//


function Centers_List()
{
 var centers = Core_Config(["centers"]);
 for(var id in centers) centers[id]["id"] = id;
 
 return centers;
}




function Centers_Name(center)
{
 var name = Core_Config(["centers", center, "name"], "");
 
 return name;
}



function Centers_Center(center)
{ 
 var data   = Core_Config(["centers", center]);
 data["id"] = center; 
 
 return data;
}



function Centers_From_Cluster(cluster, onlyid)
{
 var centers = [];
 var list    = Centers_List();
 
 for(var id in list)
 {
  var center = list[id];
  if(center["cluster"] == cluster) 
  {
   if(onlyid) centers.push(id); 
   else 
   {
	centers.push(center);
   }
  }
 }
 
 return centers;
}




function Centers_Related(center, onlyid)
{
 var centers = Centers_List();
 var cluster = Safe_Get(centers, [center, "cluster"], false);
 
 if(!cluster) 
 {
  if(onlyid) return [center];
  else
  {
   center = centers[center];
   return [center];
  }
 }
 
 var related = Centers_From_Cluster(cluster, onlyid);
 return related;
}



function Centers_Available(available)
{
 if(!available) var available = Core_Config(["roles", User_Role(), "operate-on-centers"], "none");
 var centers = [];
 
 switch(available)
 {
  case "home":
	centers.push(Centers_Center(User_Center()));
  break;
  
  case "cluster":
	centers.push(...Centers_Related(User_Center()));
  break;
  
  case "all":		
	centers.push(...Object_To_Array(Centers_List()));
  break;
 }
 
 return centers;
}



async function Centers_Rooms(center)
{
 var rooms = Core_Api("Center_Rooms", {center});
 
 return rooms;
}



async function Centers_Room_Select(rooms, center, dates, config = {})
{
 // BOTH CENTER AND DATES SPECIFIED: GET ROOMS FROM AVAILABILITY QUERY
 if(center && dates)
 {
  var rooms = await Core_Api("Center_Rooms_Available", {center, dates, options:{utc:true}}); 
 }
 
 
 // CENTER SPECIFIED, BUT NOT DATES: GET ROOMS FROM CENTER'S WHOLE LIST
 if(center && !dates)
 {
  var rooms = await Centers_Rooms(center);
  rooms     = Object.keys(rooms);
 }
 
 
 // NO ROOMS 
 if(!rooms) rooms = [];
 
 
 // BUILD OPTIONS LIST
 var options = [];
 
 if(config["nullfirst"])
 {
  var option   = new Option();
  option.text  = "";
  option.value = "";
  options.push(option);
 }
 
 console.log(rooms);
 for(var room of rooms)
 {
  option       = new Option();
  option.text  = room;
  option.value = room;
  
  options.push(option);
 }
 
 if(config["online"])
 {
  var option   = new Option();
  option.text  = UI_Language_String("centers/popups", "room online");
  option.value = "online";
  options.push(option);
 }
 
 
 var title = config["title"] || UI_Language_String("centers/popups", "room select title");
 
 var room = await UI_Popup_Select(title, false, false, options);
 return room;
}// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                          C O R E                                               //
//                                                                                                //
// -----------------------------------------------------------------------------------------------//

application = {};


function Core_Init(partner)
{
 application["html"]                  = application_html; 
 application["data"]                  = application_data;
 application["config"]                = application_config;

 application["user"]                  = {};
 
 application["state"]                 = {};
 application["state"]["core"]         = {};
 application["state"]["core"]["lang"] = Client_Language_Get();

 Safe_Set(application, ["config", "partner", "name"], partner);
}




async function Core_User()
{
 var user = Safe_Get(application, ["user"], {});
 var data = await Core_Api("User_Read", {options:{settings:true, permissions:true}});
 
 Object.assign(user, data);
 Safe_Set(application, ["user"], user);
 
 return user;
}



function Core_Config(config, def)
{
 if(typeof config == "string") var config = [config];
 
 return Safe_Get(application, ["config", ...config], def);
}





async function Core_Login(id, password)
{
 var response = await Core_Api("Core_Login", {user_id:id, password:password});

 if(typeof response == "string")
 {
  switch(response)
  {
   case "no":
   break;
   
   case "nouser":
   break;
  
   case "wrongpass":
   break;
  }

  return false;  
 }
 else
 {
  application["user"] = response;
  return true;
 }
}



async function Core_Logout()
{
 await Core_Api("Core_Logout", {});
 
 delete application["user"];
}



async function Core_Reload()
{
 var initial = Core_State_Get("core", ["initial-page"], "home");
 
 await Module_Load(initial, document.body);
}




function Core_State_Get(module, field = [], def)
{
 if(typeof field == "string") field = [field];
 
 return Safe_Get(application, ["state", module, ...field], def);
}




function Core_State_Set(module, field = [], value)
{
 if(typeof field == "string") field = [field];
 
 return Safe_Set(application, ["state", module, ...field], value);
}





async function Core_Api(func, params = {}, options = {type:"json"})
{
 var url      = Path_Folder(document.location.origin + document.location.pathname) + "/api.php?f=" + func;  
 var response = await Request_Post(url, params, options["type"]);
 
 return response;
}




async function Core_Service(service, params, options = {type:"json"})
{
 // FIRST CHECK IF IT'S A CONFIGURED SERVICE
 var url = Core_Config(["system", "services", service]) || service;
 url     = document.location.origin + "/services/" + url;
 
 // CALL
 var response = await Request_Post(url, params, options["type"]);
 console.log(response);

 // RETURN
 return response;
}




async function Core_Script(service, params, options = {type:"text"})
{
 // FIRST CHECK IF IT'S A CONFIGURED SERVICE
 var url = document.location.origin + document.location.pathname + "services/" + service;
 
 // CALL
 var response = await Request_Post(url, params, options["type"]);
 
 // RETURN
 return response;
}






function Core_Data_Page(pageid)
{
 if(!pageid.includes("/")) pageid = pageid + "/module";
 
 var page = Safe_Get(application, ["data", pageid], {});
 
 return page;
}





function Core_Data_Pages(module)
{
 var data  = Object_Subset(application["data"], module);
 var pages = Object.keys(data);

 for(var i in pages) pages[i] = pages[i].replace(module + "/", "");

 return pages;
}





function Core_Data_Section(pageid, section)
{
 var page = Core_Data_Page(pageid);
 
 var data = Safe_Get(page, [section]);
 return data; 
}





function Core_Data_Sections(pageid)
{
 var page = Core_Data_Page(pageid);
 
 var sections = Object.keys(page);
 return sections; 
}




function Core_Data_Keys(pageid, section)
{
 var page = Core_Data_Page(pageid);
 
 var data = Safe_Get(page, [section], {});
 
 var keys = Object.keys(data);
 return keys; 
}




function Core_Data_Value(pageid, section, field, def)
{
 var page = Core_Data_Page(pageid);
 
 var value = Safe_Get(page, [section, field], def);
 
 return value;
}



function Core_Magic()
{
 if(Client_Location_Parameter("magic") == 137) return true;
 
 return User_Can("cast-spells");
}




async function Core_App_Register(worker)
{
 var registration = Core_State_Get("core", ["app", "registration"]);
 if(registration) return registration;
 
 window.addEventListener("beforeinstallprompt", 
 function(event)
 {
  Core_State_Set("core", ["app", "installer"], event);
  
  event.preventDefault();
 });
 
 var registration = await navigator.serviceWorker.register(worker);
 Core_State_Set("core", ["app", "registration"], registration);
  
 return registration;
}



async function Core_App_Install()
{
 var installer = Core_State_Get("core", ["app", "installer"]);
 
 if(installer) 
 {
  var result = await installer.prompt();
  return result.outcome;
 }
 
 return "unavailable";
}// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                          D A T A                                               //
//                                                                                                //
// -----------------------------------------------------------------------------------------------//




function Data_Page_Complete(data, config, sections = false)
{
 var page = data;
 
 if(sections)
 {
  for(var section in config) 
  {
   if(!page[section]) page[section] = {};
  }
 }
 
 for(var section in config)
 {
  page[section] = data[section] || config[section];
 
  for(var field in config[section])
  {
   var value = Safe_Get(data, [section, field], undefined);
   if(value === undefined) var value = Safe_Get(config, [section, field]);
   
   Safe_Set(page, [section, field], value);
  }
 }
 
 return page;
}







function Data_Page_Sanitize(data, config, complete = false)
{
	
 // 1. CLEAN UP DATA FROM UNWANTED SECTIONS
 for(var section in data)
 {
  // ANALIZE SECTIONS. SECTIONS THAT ARE ARRAYS OR OBJECTS SHOULD BE SANITIZED.
  // WE SKIP SECTIONS THAT ARE INDIVIDUAL VALUES
  var sanitize_section = (typeof(data[section]) == "object" || typeof(data[section]) == "array");
  
  if(sanitize_section)
  {
   
   if(!Data_Key_Compliant(section, config))
   {
    delete data[section];
   }
   else
   {
	// SECTION VALIDATED. BUT NOW WE SHOULD SANITIZE ITS KEYS
	// REMEMBER WE MUST COMPARE WITH THE TEMPLATE SECTION FOR THAT SECTION, NOT THE SECTION ITSELF
	var section_template = String_Numtemplate_Derive(section) || section;
	
	for(var key in data[section])
	{
     var invalid_key = (typeof(data[section][key]) == "object" || typeof(data[section][key]) == "array");
	 
     if(invalid_key || !Data_Key_Compliant(key, config[section_template]))
	 {
	  delete data[section][key];
	 }
	}
	
   }
   
  }
  
 }
 
 
 // 2. COMPLETE WITH MISSIN STANDARD SECTIONS
 if(complete)
 {
  for(var id in config)
  {
   var info = String_Numtemplate_Info(id);
   if((info["digits"] == 0) && !data[id])
   {
    Data_Section_Add(data, config, id);
   }
  }
 }
 
}







function Data_Page_FromConfig(config = {})
{
 var data = {};

 
 // SCAN CONFIG SECTIONS
 for(var section_id in config)
 {
  var section = config[section_id];
  
  // CHECK IF SECTION IS A TEMPLATE
  var template = section_id.split(" ");
  digits       = template[template.length - 1] || "";
  if(digits.includes("N"))
  {
   template = template[0];
   digits   = digits.trim().length;
   var s_id = template + " " + "0".repeat(digits);
  }
  else
  {
   var s_id = section_id;
  }
  
  // CREATE DATA SECTION
  data[s_id] = {};
  
  // SCAN CONFIG SECTION'S KEYS
  for(var field_id in section)
  {
   // CHECK IF KEY IS A TEMPLATE
   var template = field_id.split(" ");
   digits       = template[template.length - 1] || "";
   if(digits.includes("N"))
   {
    template = template[0];
    digits   = digits.trim().length;
    var f_id = template + " " + "0".repeat(digits);
   }
   else
   {
	var f_id = field_id;
   }
   
   
   // GET DEFAULT VALUE FOR THIS FIELD
   var field = Object_From_String(config[section_id][field_id]);
   var value = field["default"] || "";
   
   
   data[s_id][f_id] = value;
  }
  
 }
 
 return data;
}




function Data_Config_Templates(config, section_id)
{ 
 var templates = {};
 
 // RETURN CONFIG SECTION TEMPLATES
 if(!section_id)
 {
  var keys = Object.keys(config);
 }
 else
 // RETURN SECTION FIELD TEMPLATES
 {
  // WE NEED TO DERIVE A TEMPLATE SECTION FROM THE SECTION ID, IN ORDER TO LOOK FOR TEMPLATE FIELDS IN IT
  var section_template = String_Numtemplate_Derive(section_id) || section_id;
  var section          = config[section_template];
  if(section) var keys = Object.keys(section); else var keys = [];
 }
 
 
 // DETERMINE WHICH KEYS ARE TEMPLATES (STRING WITH LAST PORTION BEING A SEQUENCE OF "N" = IT'S A TEMPLATE)
 for(var key of keys)
 {
  var name = key.split(" ");
  if(name.length > 1 && name[name.length -1].includes("N"))
  {
   var template = {};
   
   template["name"]   = name[0].trim();
   template["digits"] = name[name.length -1].trim().length;
  
   templates[key] = template;
  }
 }	 

 return templates;
}




// NOTE: CALL WITH config[section] IF NEED TO CHECK COMPLIANCY OF A FIELD
function Data_Key_Compliant(id, config, templateonly)
{
 // SCAN ALL KEYS AND SEE IF IT MATCHES ONE
 for(var key in config)
 {
  // IDENTICAL TO ONE OF THE KEYS? THEN IT COMPLIES
  if(id == key && !templateonly) return true;
   
  // MAYBE IT MATCHES A TEMPLATE? THEN IT COMPLIES
  var template = String_Numtemplate_Info(key);
  if(template["digits"] > 0 && String_Numtemplate_Comply(id, template)) return true;
 }
  
 return false;
}





function Data_Section_Add(data, config, templateid)
{
 var template = String_Numtemplate_Info(templateid);
 if(template["digits"] == 0) 
 {
  var id = templateid; 
 }
 else 
 {
  var sections = Object.keys(data);
  var id       = String_Numtemplate_Next(template, sections);
 }
 
 var section = {};
 for(var field in config[templateid])
 {
  var field_config = Object_From_String(config[templateid][field]);
  section[field]   = field_config["default"] || "";
 }
 
 data[id] = section;
 
 return {data:section, id};
}// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                      H A N D L E R S                                           // 
//                                                                                                //
// -----------------------------------------------------------------------------------------------//



async function Handler_Speech_Recognition(sentences, content_lang, container, config = {})
{ 
 Document_Element_Disable(container);
	
 // SPEECH SERVICE URL
 var service = Safe_Get(application, ["config", "system", "speech", "service"], "");
 service     = Client_Variables_Apply(service);
 
 
 // CALCULATE LONGEST POSSIBLE SPEECH TIME
 var letter_time = config["letter_time"] || 150;
 var pause_time  = config["pause_time"]  || 250;
 var max         = 0;
 for(var sentence of sentences) 
 {
  var time           = String_Speak_Time(sentence, letter_time, pause_time);
  if(time > max) max = time;
 }
 max = max + 500;
 if(max < 3000) max = 3000;
 
 
 // CREATE GAUGE
 var color  = Document_CSS_GetVariable("color-alert");
 var gauge  = UI_Gauge_ProgressCircle(container, undefined, color);
 UI_Gauge_TimeUpdate(gauge, max);
   
 // FIRE RECOGNITION
 var lang_code = Core_Data_Value("core/languages", "en", "code"); console.log(lang_code);
 var result    = await Media_Speech_RecognizeCustom(sentences, lang_code, max, service,
   
 // ON RECORD START
 function()
 {
  if(config["icon"])
  {
   config["icon"].style.color = "var(--color-alert)";
   Document_Element_Animate(config["icon"], "flash 1.5s ease-in-out infinite");
  }
  
  if(config["onstart"]) config["onstart"]();
 },
   
 // ON RECORD END
 function()
 {
  if(config["icon"])
  {
   config["icon"].style.color = "";
   Document_Element_Animate(config["icon"], false);
  }
  
  gauge.remove();
  
  if(config["onend"]) config["onend"]();
 }); 
 
 Document_Element_Restore(container); 
 
 return result; 
}








async function Handler_Element_Feedback(element, value, options = {})
{  
 var feedback  = Core_Data_Section("core/feedback", value);
  
  
 if(options["outline"]) 
 {
  var outline = "outline-" + options["outline"];
 }
 else
 {
  var outline = "outline-inner";
 }
  
  
 if(options["lock"])
 {
  Document_Element_Disable(options["lock"]);
 }

 
 var removed = Document_CSS_PurgeClasses(element, "style-outlined");
 if(!options["nostyle"]) 
 {
  Document_CSS_SetClass(element, "style-outlined-" + feedback["color"]);
  Document_CSS_SetClass(element, outline);
 }
 
 if(!options["silent"])
 {
  Media_Audio_Play(Resources_URL("sounds/" + feedback["sound"] + ".mp3"));
 }
 
 
 await Document_Element_Animate(element, feedback["animation"]);  
 
 
 if(!options["permanent"])
 {
  Document_CSS_UnsetClass(element, "style-outlined-" + feedback["color"]);
  Document_CSS_UnsetClass(element, outline);
  
  Document_CSS_SetClasses(element, removed);
 }
 

 if(options["lock"])
 {
  Document_Element_Restore(options["lock"]);
 }
}// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                     M O D U L E S                                              //
//                                                                                                //
// -----------------------------------------------------------------------------------------------//


async function Module_Load(module, container, configuration = {})
{
 var namespace = String_Capitalize_Initial(module);
 console.log("Loading Module " + module); 
 
 
 // UNLOAD PREVIOUS MODULE   
 await Module_Unload();
 
 // SET SELECTED MODULE
 Safe_Set(application, ["state", "core", "module"], module);
 
 // INIT MODULE STATE IF NEVER LOADED BEFORE
 var state = Core_State_Get(module);
 if(!state) Safe_Set(application, ["state", module], {}, true);
 
 // RESET MODULE STATE IF NOT SET TO PERSIST
 /*
 var persist = Core_State_Get(module, "persist");
 if(!persist) 
 {
  Safe_Set(application, ["state", module], {}, true);
 }
 */
 
 // INITIALIZE MODULE HTML
 var element = UI_Element_Create(module + "/module");
 Core_State_Set("core", "module-body", element);
 
 
 // EXPLICITLY MULTIPAGE MODULE?
 /*
 var pages  = Module_Data(module, "module", "pages", "");
 pages      = pages.split(",");
 
 if(pages.length > 0)
 {
  // CREATE A HEADER TO ACCESS PAGES
  var items = [];
  
  for(let page of pages)
  {  
   var item        = {};
   item["text"]    = UI_Language_Object(Module_Data(module, "page " + page, undefined, {})) || page;
   item["onclick"] = 
   function()
   {
	Module_Page_Set(page);
   }
   
   items[page]     = item;
  }
  
  var header    = UI_Header("module-page-select", items, {selectfirst:false, css:"color-noted"});  
 
  var selector = UI_Element_Find(element, "module-header");
  if(selector) selector.appendChild(header);
 }
 */
 
 
 // ONLOAD (EVERYTHING BEFORE INJECTING MODULE UI)
 var Module_OnLoad = Safe_Function(namespace + "_OnLoad");
 if(Module_OnLoad) 
 {
  var data = await Core_Api(namespace + "_Load", configuration);
  await Module_OnLoad(element, data);
 }
 
 
 // INJECT MODULE UI AND CALL ONSHOW
 if(!container) var container = document.getElementById("main-module");
 container.innerHTML = "";
 container.appendChild(element);
 
 var Module_OnShow = Safe_Function(namespace + "_OnShow");
 if(Module_OnShow) 
 {
  await Module_OnShow(element, data);
 }
}




async function Module_Unload()
{ 
 var module = Module_Current();
 
 if(module)
 {
  var namespace = String_Capitalize_Initial(module);
 
  var Module_OnUnload = Safe_Function(namespace + "_OnUnload");	
  if(Module_OnUnload) 
  {
   await Module_OnUnload();
  }
 }
 
 Safe_Delete(application, ["state", "core", "module"]);
}





function Module_Current()
{
 var module = Safe_Get(application, ["state", "core", "module"], false);
 
 return module;
}




function Module_Body()
{
 var body = Core_State_Get("core", "module-body");

 return body;
}




function Module_Data(module, section, field, def)
{
 var get           = ["data", module + "/module"];
 if(typeof section != "undefined") get.push(section);
 if(typeof field   != "undefined") get.push(field);
 	
 var value = Safe_Get(application, get, def);
 
 return value;
}




function Module_Config(module, field, def)
{
 return Safe_Get(application, ["config", "modules", module, field], def);
}





function Module_Preload_Set(module, parameter, value)
{
 Core_State_Set("modules", ["preload", module, parameter], value);
}





function Module_Parameter_Get(parameter, module)
{
 if(!module) var module = Module_Current();
 
 
 // FIRST CHECK IF PARAMETER SET BY URL
 var value = Client_Location_Parameter(parameter);
 
 
 // THEN CHECK IF SET BY ANOTHER MODULE
 if(!value)
 {
  var value = Core_State_Get("modules", ["preload", module, parameter]);
  Core_State_Set("modules", ["preload", module, parameter], undefined);
 }
 
 
 // FINALLY CHECK IF ALREADY PREVIOUSLY SET/STORED 
 if(!value)
 {
  var value = Core_State_Get(module, parameter);
 }
 
 
 return value;
}







// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                         P A G E S                                              //
//                                                                                                //
// -----------------------------------------------------------------------------------------------//

function Module_Page_Get()
{
 var module = Module_Current();
 
 // TRY IN ORDER:
 // - HARD SETTING FROM URL PARAMETER IN module-page FORMAT
 // - CURRENT STATE
 // - DEFAULT AS SPECIFIED BY MODULE CONFIGURATION DATA
 // - USER GIVEN DEFAULT
 var page = Client_Location_Parameter("page") || Core_State_Get(module, ["page"]) || Module_Data(module, "module", "default-page") || "main";
 
 return page;
}





async function Module_Page_Set(page)
{
 var module = Module_Current();
 
 // IF NO PAGE IS GIVEN, TRY A DEFAULT
 if(!page) var page = Module_Page_Get();
 
 console.log("Module Page: ", page);
 
 // STORE STATE
 Core_State_Set(module, ["page"], page); 
 
 // IDENTIFY AND CALL (IF AVAILABLE) PAGE INITIALIZATION FUNCTION
 var page_function = String_Capitalize_Initial(module) + "_" + String_Capitalize_Initial(page);
 console.log("Page Function", page_function); 
  
 var page_function = window[page_function];
 if(page_function) 
 {  
  var body = Core_State_Get("core", "module-body");
  
  // LOAD PAGE HTML
  if(UI_Element_Exists(module + "/" + page))
  {
   var submodule = UI_Element_Create(module + "/" + page, {}, {language:module + "/" + page});
   var container = UI_Element_Find(body, "module-page");
  
   Core_State_Set(module, "submodule", submodule);
   await page_function(submodule);
  
   container.innerHTML = "";
   container.appendChild(submodule);
  }
  else
  // NO HTML, THIS PAGE IS ONLY A SET OF FUNCTIONS WITH NO PAGE BODY
  {
   var submodule = Core_State_Get(module, "submodule");
   await page_function(submodule);
  }
 }
 
}




function Module_Page_Body()
{
 var module = Module_Current();
 
 return Core_State_Get(module, "submodule");	
}// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                      P A R T N E R                                             //
//                                                                                                //
// -----------------------------------------------------------------------------------------------//

function Partner_Name()
{
 var name = Safe_Get(application, ["config", "partner", "name"], "default");
 
 return name;
}



function Partner_Data(section, field)
{
 var value = Safe_Get(application, ["config", "partner", section, field]);
 
 return value;
}




function Partner_Languages()
{
 var languages = {};
 
 var used = Partner_Data("localization", "languages");
 used     = used.split(",");
 
 
 var all = Core_Data_Page("core/languages");
 for(var id of used)
 {
  languages[id] = all[id];
 }
 
 return languages;
}// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                             U I                                                // 
//                                                                                                //
// -----------------------------------------------------------------------------------------------//


function UI_Element_Component(source)
{
 // DETERMINE PLATFORM IN USE, DEFAULT TO DESKTOP
 var platform = Safe_Get(application, ["state", "core", "platform"], "desktop");  
 
 // GET COMPONENT HTML. IF NOT AVAILABLE FOR THE SPECIFIED PLATFORM, GET IT IN ITS DEFAULT (DESKTOP) VERSION
 var html                = Safe_Get(application, ["html", source, platform], "");
 if(html == "") var html = Safe_Get(application, ["html", source, "desktop"], "");
 if(html == "") var html = "<null></null>";
 
 return html;
}




function UI_Element_Exists(source)
{
 // DETERMINE PLATFORM IN USE, DEFAULT TO DESKTOP
 var platform = Safe_Get(application, ["state", "core", "platform"], "desktop");  
 
 // GET COMPONENT HTML
 var html = Safe_Get(application, ["html", source, platform], false);
 
 return html;
}





function UI_Element_Create(source, variables, options = {})
{		
 // GET COMPONENT HTML
 if(options["html"]) 
 {
  var html = source;
 }
 else
 {
  var html = UI_Element_Component(source);
 }
 
 // SEARCH FOR REFERENCE TO CORE COMPONENTS
 var tokens = String_Extract_TagContent(html, "<element", "/>");
 for(var token of tokens)
 {
  // GET COMPONENT NAME (LAST ATTRIBUTE OF THE TAG)	 
  var parts     = token.trim().split(" ");
  var name      = parts[parts.length - 1];
  
  // GET COMPONENT HTML AND BLEND IT WITH CUSTOM TAG ADDITIONAL ATTRIBUTES
  var component  = UI_Element_Component("core/" + name);
  var parts      = String_HTML_SegmentTag(component);
  component      = [parts["head"], parts["content"], token, parts["tail"]].join(" ");
 
 
  // APPLY TEMPLATE VARIABLES
  var sets = String_Extract_TagContent(component, "{", "}");
  for(var set of sets)
  { 
   var obj   = Object_From_String(set);
   component = String_Variables_Set(component, obj);  
  }
 
  
  // REPLACE ORIGINAL CUSTOM TAG WITH BLENDED COMPONENT 
  var tag       = "<element" + token + "/>";
  html          = html.replace(tag, component);
 }
 

 // APPLY ELEMENT'S PARENT MODULE LANGUAGE
 var path = Path_Folder(source);
 html = UI_Language_Apply(html, path + "/module");
 
 // APPLY CORE LANGUAGE
 html = UI_Language_Apply(html, "core/module");
 
 // APPLY OPTIONAL EXTRA LANGUAGE
 if(options["language"])
 {
  html = UI_Language_Apply(html, options["language"]);
 }
 
 // APPLY VARIABLES
 if(variables) html = String_Variables_Set(html, variables);
 
 
 if(options["structure"])
 // SPECIFIC DOM ELEMENT STRUCTURE
 {
  var element       = document.createElement(options["structure"]); 
  element.innerHTML = html;  
 }
 else
 // GENERIC ELEMENT
 {
  var element       = document.createElement(null); 
  element.innerHTML = html;
  element           = element.firstElementChild;
 }
 
 
 // *** ELEMENT HAS NOW BEEN CREATED
 // *** MOVE TO PREPROCESS IT
 
 // COLLECT ALL ELEMENT CHILDREN AND PROCESS THEM FOR AUTODATA FROM SPECIAL TAGS
 var children = Document_Element_Children(element, true);
 for(var child of children)
 { 
  // HAS AN OPTIONS SOURCE?
  var source = Document_Element_GetData(child, "optsource");
  if(source)
  { 
   Document_Select_AddOption(child, "", "");
  
   var page = Core_Data_Page(source);
   var keys = Object.keys(page);
   for(var key of keys)
   {
    var text  = UI_Language_Object(page[key]);
   
    Document_Select_AddOption(child, text, key);
   } 
  }
 }
 
 
 // *** RETURN ASSEMBLED ELEMENT
 return element;
}





function UI_Element_Find(root, uid, options = ["recurse"])
{
 // SPECIAL CASE: IF CALLED WITH ONLY ONE ARGUMENT, WILL TREAT THAT AS UID AND SCAN THE WHOLE DOCUMENT ACCORDINGLY
 if(arguments.length == 1) 
 {
  var uid     = root;
  var root    = document.body;
 }
 
 var element = Document_Element_FindChild(root, "uid", uid, options);


 return element;
}








// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                          D A T A                                               // 
//                                                                                                //
// -----------------------------------------------------------------------------------------------//


function UI_Element_HasData(element, name)
{
 return element["applicationdata"] && (element["applicationdata"][name] !== undefined);
}





function UI_Element_GetData(element, name)
{
 if(!UI_Element_HasData) return undefined;
 
 return element["applicationdata"][name];
}





// TRACES BACK FROM AN EVENT, LOOKING FOR THE
function UI_Element_TraceData(event, dataname, datavalue)
{
 var root = Document_Event_Source(event);
 if(!root) return undefined;
}





function UI_Element_SearchData(root, dataname, datavalue)
{
}



function UI_Value_FromDatapage(element, page, value)
{
 if(typeof page == "string") var page = Core_Data_Page(page);
 var item = page[value] || {};
 
 element.value = UI_Language_Object(item);
}



function UI_Select_FromConfig(select, config, clear = false)
{
 if(clear) select.innerHTML = "";
 
 var data = Core_Config(config);
 
 for(var key in data)
 {
  var option   = new Option();
  option.text  = UI_Language_Object(data[key]);
  option.value = key;
  
  select.appendChild(option);
 }
}



function UI_Select_FromDatapage(select, page, category_field, categories = {}, category_style = "", filter)
{
 if(typeof page == "string") var page = Core_Data_Page(page);
 
 var catalog = {};
 
 // IF NO CATEGORY SPECIFIED, JUST GROUP ALL THE DATAPAGE TOGETHER
 if(!category_field)
 {
  catalog["*"] = page;
 }
 else
 // OTHERWISE ORGANIZE BY CATEGORY
 {
  for(var id in page)
  {
   var item     = page[id];
  
   var category = item[category_field];
   if(!catalog[category]) catalog[category] = {};
  
   catalog[category][id] = item;
  }
 }
 
 
 // CREATE OPTIONS
 for(var category in catalog)
 {
  // IF NO CATEGORY, DON'T ADD AN HEADER AND NO NEED FOR A SPACE BETWEEN CATEGORIES 
  if(category == "*")
  {
   var addspace = false;
  }
  else
  // OTHERWISE CREATE A HEADER FOR THIS CATEGORY, AND ADD A SPACE AFTER ALL ITS ITEMS
  {
   var text        = UI_Language_Object(categories[category]) || category;
   var value       = category;
   var option      = Document_Select_AddOption(select, text, value); 
   option.disabled = true;
   Document_CSS_SetClass(option, category_style);
   
   var addspace = true;
  }

  
  // CATEGORY OPTIONS
  for(var id in catalog[category])
  {  
   var item = catalog[category][id];
   
   if(!filter || filter(item))
   {
    var text   = UI_Language_Object(item);
    var value  = id;
    var option = Document_Select_AddOption(select, text, value); 
   }
  }
  
  
  // BLANK SPACE NEEDED?
  if(addspace)
  {
   var option      = Document_Select_AddOption(select, "", "");
   option.disabled = true;
  }
  
 }
}








// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                        P O P U P S                                             // 
//                                                                                                //
// -----------------------------------------------------------------------------------------------//



async function UI_Popup_Create(data = {}, buttons = [], template = "core/popup-standard", config = {open:true, escape:true})
{	
 // LAYER: DARK BACKGROUND    WHITESPACE: ON TOP OF THE BACKGROUND    WINDOW: INSIDE WHITESPACE
 var popup      = UI_Element_Create("core/layer-glass-thin");
 Document_Element_SetObject(popup, "data",   data);
 Document_Element_SetObject(popup, "config", config);
 
 // THE POPUP ITSELF
 if(!template.includes("/"))
 {
  template = "core/popup-" + template;
 }
 
 var whitespace = UI_Element_Find(popup, "layer-front");
 var win        = UI_Element_Create(template, data); 
 Document_Element_SetData(win, "uid", "popup-window");
 
 
 // COLLAPSE UNSET ELEMENTS
 for(var id of ["title", "subtitle", "picture"])
 {
  if(!data[id]) 
  {
   var element = UI_Element_Find(win, id);
   if(element) 
   {
	//element.style.display = "none";
    element.remove();
   }
  }
 }
 
 
 // CONTENT
 var content   = Safe_Get(data, ["content"], "");
 var container = UI_Element_Find(win, "content");
 
 // NO CONTENT
 if(!content)
 {
  //container.style.display = "none";
 }
 else
 // EXPLICIT ELEMENT TO APPEND INSIDE
 if(typeof content == "object")
 {
  if(container) container.appendChild(content); else win.appendChild(content);
 }
 else
 // INTERPRET CONTENT TEXT
 {
  switch(content)
  {
   case "input":
		//data["placeholder"];
		var input = UI_Element_Create("core/control-edit-popup");
		Document_Element_SetData(input, "uid", "input");
		
		if(data["placeholder"]) input.placeholder = data["placeholder"];
		
		container.appendChild(input);
   break;
   
   case "select":
		//data["options"]
		var select = UI_Element_Create("core/control-dropdown-popup");
		Document_Element_SetData(select, "uid", "select");
		
		container.appendChild(select);
   break;
   
   // CONTENT = PURE TEXT
   default:
		container.innerHTML = content;
   break;
  }
 }
 
 
 // WHITESPACE IS THE TOPMOST EVELEMENT SO APPEND AND ATTACH POPUP DATA TO IT
 whitespace.appendChild(win);
 Document_Element_SetObject(whitespace, "popup", popup);
 
 
 // ESCAPE: AUTOMATICALLY CLOSE THE POPUP IF CLICKED OUTSIDE CONTENT AREA
 if(config["escape"])
 {
  whitespace.onclick =
  async function(event)
  {
   // PROCESS ONLY IF DIRECT CLICK ON WHITESPACE	    
   if(event.srcElement != event.currentTarget) return;
   
   var popup = Document_Element_GetObject(event.currentTarget, "popup");
	
   // IF ESCAPE IS A FUNCTION, USE IT TO CHECK WHETHER TO ACTUALLY ESCAPE OR NOT (USEFUL FOR CONFIRMATION EXITS)	 
   if(typeof config["escape"] == "function") var proceed = await config["escape"](); else var proceed = true; 	 
   
   if(proceed)
   {	   
    UI_Popup_Close(popup);
	
    var data     = Document_Element_GetObject(popup, "data");
    var onescape = data["onescape"];
    if(onescape) onescape(popup);
   }
   
  }
 }
 
 
 // IF BUTTONS DEFINED, ADD BUTTONS
 var container = UI_Element_Find(win, "buttons");
 if(container)
 {
  if(buttons && buttons.length > 0)
  {
   for(let button of buttons)
   {   
    // LINK BUTTON TO POPUP
	var button_template = button["template"] || "button-popup-plain";
	
    var element = UI_Element_Create("core/" + button_template, {text:button["text"]});
    Document_Element_SetObject(element, "popup", popup);
    
	
    // DETERMINE BUTTON ACTION (STANDARD ACTIONS OR CUSTOM EVENT)
    switch(button["onclick"])
    {
	 case "close": 
		  element.onclick = 
		  function(event)
		  {
		   var popup = Document_Element_GetObject(event.currentTarget, "popup");
           UI_Popup_Close(popup);
		  }
	 break;
	   
     default:
		 element.onclick = 
		 function(event)
		 {
	      var popup = Document_Element_GetObject(event.currentTarget, "popup"); 
	      button["onclick"](popup);
 	 	 }
 	 break;
    }
   
    // ADD BUTTON
    container.appendChild(element);
   }
  }
  else
  {
   container.style.display = "none";
  }
 }
 
 
 // IMMEDIATELY OPEN ON CREATION, IF SO CONFIGURED
 if(config["open"]) 
 { 
  console.log("opening... ");
  await UI_Popup_Show(popup, config);
  console.log("opened");
 }	 
 
 
 return popup;
}






async function UI_Popup_Show(popup, config)
{
 var config = config || Document_Element_GetObject(popup, "config");
 
 // BLUR THE BACKGROUND
 var body = UI_Element_Find(document.body, "main-body");
 Document_CSS_SetClass(body, "style-blurred-medium");


 // SHOW POPUP
 document.body.appendChild(popup);
 
 
 if(!config["instant"]) 
 {
  var win       = UI_Element_Find(popup, "popup-window");
  var animation = config["animation"] || "zoomIn 0.125s linear 1";
  
  await Document_Element_Animate(win, animation);
 }
}




async function UI_Popup_Close(popup)
{
 var config  = Document_Element_GetObject(popup, "config");
  
 // UNBLUR THE BACKGROUND
 var body = UI_Element_Find(document.body, "main-body");
 Document_CSS_UnsetClass(body, "style-blurred-medium");

 
 // REMOVE POPUP
 popup.remove();

 
 // CALL ONCLOSE EVENT IF PRESENT
 var onclose = config["onclose"];
 
 if(onclose) onclose(popup);
}





async function UI_Popup_Input(title, subtitle, picture, placeholder)
{
 var promise = new Promise(async(resolve, reject) =>
 {
  var button = 
  { 
   text   : UI_Language_String("core/popups", "button ok"), 
   onclick: 
   async function(popup)
   {
	var input = UI_Element_Find(popup, "input");
    var value = input.value;
	
    await UI_Popup_Close(popup);
	
	resolve(value);
   }
  };
	
  await UI_Popup_Create(
  {
   title:    title, 
   subtitle: subtitle, 
   picture:  picture,
   content:  "input",
   placeholder,
   onescape: 
   function(popup)
   {
	resolve(false);
   }
  },

  [
   button 
  ]);
  
 });
 
 return promise;
}



async function UI_Popup_Select(title, subtitle, picture, options, selected)
{
 var promise = new Promise(async(resolve, reject) =>
 {
  var button = 
  { 
   text   : UI_Language_String("core/popups", "button ok"), 
   onclick: 
   async function(popup)
   {
	var select = UI_Element_Find(popup, "select");
	var option = Document_Select_SelectedOption(select);
    var value  = option.value;
	
    await UI_Popup_Close(popup);
	
	resolve(value);
   }
  };
	
  var popup = await UI_Popup_Create(
  {
   title:    title, 
   subtitle: subtitle, 
   picture:  picture,
   content:  "select",
   onescape: 
   function(popup)
   {
	resolve(false);
   }
  },

  [
   button 
  ]);
  
  
  // SELECT OPTIONS
  var select = UI_Element_Find(popup, "select");
  
  if(typeof(options) == "function")
  {
   await options(select);
  }
  else
  {
   
   for(var option of options)
   { 
    var text  = option["text"];
    var value = option["value"];

    Document_Select_AddOption(select, text, value);
   }
  }
  
  if(selected) select.value = selected;
  
 });
 
 return promise;
}



async function UI_Popup_Confirm(title, content, picture)
{
 var promise = new Promise((resolve, reject) =>
 {
  var button_yes = 
  { 
   text   : UI_Language_String("core/popups", "button yes"), 
   onclick: 
   function(popup)
   {
    UI_Popup_Close(popup);
	
	resolve(true);
   }
  };
  
  var button_no = 
  { 
   text   : UI_Language_String("core/popups", "button no"), 
   onclick: 
   function(popup)
   {
    UI_Popup_Close(popup);
	
	resolve(false);
   }
  };

  UI_Popup_Create(
  {
   title, 
   content, 
   subtitle: "",
   picture,
   onescape: 
   function(popup)
   {
	resolve(false);
   }
  },

  [
   button_yes,
   button_no   
  ]);
  
 });
 
 return promise;
}





async function UI_Popup_Code(title, content, picture, code)
{
 var promise = new Promise((resolve, reject) =>
 {
  var button_confirm = 
  { 
   text   : UI_Language_String("core/popups", "button confirm"), 
   onclick: 
   async function(popup)
   {
    var input = UI_Element_Find(popup, "code");
	if(input.value == code)
	{
	 UI_Popup_Close(popup);
     resolve(true);
	}
	else
    {  
     await Document_Element_Animate(input, "headShake 0.75s linear 1");
     input.value = "";
	}
   }
  };
  
  UI_Popup_Create(
  {
   title, 
   content, 
   subtitle: "",
   picture,
   onescape: 
   function(popup)
   {
	resolve(false);
   }
  },

  [
   button_confirm,
  ],
  
  "core/popup-standard-code");
  
 });
 
 return promise;
}





async function UI_Popup_Intermission(title, content, picture, timer, options = {})
{
 var popup_template = Safe_Get(options, "template", "standard");
 var autoclose      = Safe_Get(options, "autoclose", false);
 
 var promise = new Promise(async (resolve, reject) =>
 {
  var button_ok = 
  { 
   text     : UI_Language_String("core/popups", "button ok"), 
   
   template : "button-large-plain",
   
   onclick  : 
   function(popup)
   {
    UI_Popup_Close(popup);
	resolve(true);
   }
  };
 

  if(!picture && typeof content == "object") var template = "content"; else var template = popup_template;
  var popup   = await UI_Popup_Create({title, content, picture}, [button_ok], "core/popup-intermission-" + template, {open:false, escape:false});
  
  var buttons = UI_Element_Find(popup, "buttons");
  if(autoclose) buttons.style.display = "none";

  await UI_Popup_Show(popup);
  
  if(timer)
  {  
   buttons.style.visibility = "hidden";
   
   setTimeout(
   async function()
   {
	if(autoclose)
	{
     UI_Popup_Close(popup);
	 resolve(true);
	}
	else
    {
	 buttons.style.visibility = "visible";
	 Document_Element_Animate(buttons, "bounceIn 1s 1");
	}
	
   }, Math.round(timer * 1000));
  }
 });
 
 return promise;
}




async function UI_Popup_Alert(title, content, picture)
{
 var promise = new Promise((resolve, reject) =>
 {
  var button_ok = 
  { 
   text   : UI_Language_String("core/popups", "button ok"), 
   onclick: 
   function(popup)
   {
    UI_Popup_Close(popup);
	
	resolve(true);
   }
  };
  
 
  UI_Popup_Create(
  {
   title, 
   content, 
   subtitle: "",
   picture,
   onescape: 
   function(popup)
   {
	resolve(false);
   }
  },

  [
   button_ok,
  ]);
  
 });
 
 return promise;
}



async function UI_Popup_SelectData(title, data = [], fields = {}, language)
{
 var promise = new Promise((resolve, reject) =>
 { 
  var content = UI_Element_Create("core/popup-select-box");
  var table   = UI_Table_Data(data, fields, language)
  content.appendChild(table);
 
  var onclick = 
  function(popup)
  {
   UI_Popup_Close(popup);
   
   var row = Document_Element_GetObject(table, "selected-row");
   if(row)
   {
	var item = Document_Element_GetObject(row, "item");
   }
   else
   {
	var item = false;
   }
   
   resolve(item);
  }

  var onescape =
  function()
  {
   resolve(false);
  }
 
  var button_caption = UI_Language_String("core/popups", "button select");
  
  UI_Popup_Create({title, content}, [{text:button_caption, onclick}], "flexi", {escape:true, open:true, onescape});  
 });
 
 return promise;
}




async function UI_Popup_DateTime(datetime, title, subtitle, button, picture)
{
 if(!datetime) var datetime = Date_Now();
 
 var promise = new Promise(async(resolve, reject) =>
 {
  var popup = false;
  
  if(!button) button = UI_Language_String("core/popups", "button ok"); 
  
  var button_pick = 
  { 
   text:button, 
   onclick:  
   
   async function()
   {
    var input = UI_Element_Find(popup, "datetime");
    var date  = Datetime_From_Input(input.value);

    await UI_Popup_Close(popup);  
    resolve(date);
   }
  }
 
  var button_cancel = 
  { 
   text   : UI_Language_String("core/popups", "button cancel"), 
   onclick:
   
   async function()
   {
    await UI_Popup_Close(popup);  
    resolve(false);
   }
  }
  
  popup       = await UI_Popup_Create({content:UI_Element_Create("core/popup-standard-datetime"), title, subtitle, picture}, [button_pick, button_cancel], undefined, {open:false, escape:false});
  var input   = UI_Element_Find(popup, "datetime");
  input.value = Datetime_To_Input(datetime);
 
  await UI_Popup_Show(popup);
 });
 
 return promise;
}







// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                         M E N U S                                              // 
//                                                                                                //
// -----------------------------------------------------------------------------------------------//

function UI_Menu_Create(uid, items = {}, events = {}, options = {})
{
 var menu = UI_Element_Create("core/menu-plain", {uid:uid});

 Document_Element_SetObject(menu, "items",  items);
 Document_Element_SetObject(menu, "events", events);
 
 return menu;
}





function UI_Menu_Build(menu)
{
 menu.innerHTML = "";
 
 var items = Document_Element_GetObject(menu, "items");
 
 var uids = Object.keys(items);
 for(var uid of uids)
 {
  var item = items[uid];
 
  UI_Menu_AddItem(menu, uid, item["icon"], item["text"], item["state"], item["func"], item["submenu"], item["tag"]);
 }
}




function UI_Menu_GetItems(menu)
{
 return Document_Element_GetObject(menu, "items");
}




function UI_Menu_Assign(element, menu, options)
{  
 Document_Element_SetObject(element, "menu", menu);
 
 element.oncontextmenu =
 function(event)
 { 
  event.preventDefault();
  event.stopPropagation();
  
  var x = event.pageX;
  var y = event.pageY;
  
  menu["source-parent"] = event.currentTarget;
  menu["source-target"] = event.target;
  
  UI_Menu_Show(menu, x, y, options, event);
 }
}




function UI_Menu_GetItem(menu, id)
{
 var items = Document_Element_GetObject(menu, "items");
 
 return items[id];
}





function UI_Menu_ListItems(menu, id)
{
 var items = Document_Element_GetObject(menu, "items");
 
 return items;
}





function UI_Menu_AddItem(menu, uid, icon, text, state, func, submenu, tag)
{
 
 switch(state)
 {
  case "enabled": 
   var template = "enabled";
   var visible  = true;   
   var enabled  = true;
  break;
  
  case "disabled":
   var template = "disabled";
   var visible  = true;   
   var enabled  = false;
  break;
  
  case "hidden":
	var template = "enabled";
	var visible  = false;   
	var enabled  = false;
  break;
  
  default:
	var visible = true;
  break;
 }
 
 
 // NO TEXT = SPACER
 if(!text) 
 {
  var template = "spacer";
  var enabled  = false;
 }
 
 
 
 // CREATE ITEM
 var element = UI_Element_Create("core/menu-item-" + template, {uid:uid, icon:icon, text:text}); 
 if(!visible) element.style.display = "none";

 // ICON TRICK: IF ICON LENGTH = 1 THEN IT'S AN EXPLICIT ICON, NOT A FONTAWESOME CODE. ADJUST ACCORDINGLY
 if(icon && String_Unicode_Length(icon) == 1)
 {
  var component = UI_Element_Find(element, "icon");
  Document_CSS_PurgeClasses(component, "fa-");
  component.innerHTML = icon;
 }
 
 // ICON TRICK: IF ICON NAME CONTAINS ".svg" THEN IT'S A SVG GLYPH
 if(icon && icon.includes(".svg"))
 {
  var component = UI_Element_Find(element, "icon");
  Document_CSS_PurgeClasses(component, "fa-");
  component.innerHTML = "<img src = '" + icon + "' style = 'width:100%; height:100%'></img>";
 }
 
 
 // LINK MENU
 Document_Element_SetObject(element, "menu", menu);


 // ATTACH TAG
 Document_Element_SetObject(element, "tag", tag);


 // ATTACH FUNCTION
 if(func)
 {
  Document_Element_SetObject(element, "func", func);
 }
 
 

 // IF ENABLED AND VISIBLE, MANAGE ITEM'S ONCLICK
 if(enabled && visible)
 {
  // ATTACH SUBMENU IF PRESENT
  if(submenu)
  {
   // SHOW SUBMENU SELECTOR
   UI_Element_Find(element, "submenu").style.visibility = "visible";
   
   // ATTACH SUBMENU TO ELEMENT
   Document_Element_SetObject(element, "submenu", submenu);
  }
   
  // ON CLICK
  element.onclick = UI_Menu_OnClick;
 }
 
 
 // ATTACH TO MENU
 menu.appendChild(element);
}




function UI_Menu_Show(menu, x, y, options = {}, event)
{
 // IF THIS IS A TOP LEVEL MENU, CLOSE ALL OTHERS FIRST
 if(!Document_Element_GetObject(menu, "parent-menu")) UI_Menu_CloseAll();
 
 
 // AN EMPTY MENU DOESN'T EVEN GET SHOWN
 var items = Document_Element_GetObject(menu, "items");
 if(Object.keys(items).length < 1) return;
 	
	
 // ON SHOW
 var events  = Document_Element_GetObject(menu, "events");
 if(events["onshow"]) events["onshow"](menu, event);
	
	
 // RENDER AND DISPLAY
 UI_Menu_Build(menu);
 
 
 // INITIALLY INVISIBLE
 menu.style.visibility = "hidden";
 document.body.appendChild(menu);
 
 
 // CALCULATE POSITION AND SIZE
 var style  = window.getComputedStyle(menu); 
 var width  = Math.floor(parseFloat(style.width));
 var height = Math.floor(parseFloat(style.height)); 
 

 // TRY DIFFERENT OPENING DIRECTIONS, ATTEMPTING TO AVOID CLIPPING
 var forcedirection = options["direction"];

 if(forcedirection) var directions = [forcedirection]; else var directions = ["top right", "bottom right", "top left", "bottom left"];
 
 for(var direction of directions)
 {
  Document_Element_SetData(menu, "showdirection", direction);
 
  switch(direction)
  {
   case "top":
	 menu.style.left = x;
	 menu.style.top  = y - height / 2;
   break;
   
   case "top right":
	 menu.style.left = x;
	 menu.style.top  = y - height;
   break;
  
   case "bottom right":
	menu.style.left = x;
	menu.style.top  = y;
   break;
   
   case "bottom":
	menu.style.left = x - width / 2;
	menu.style.top  = y;
   break;
  
   case "bottom left":
	 menu.style.left = x - width;
 	 menu.style.top  = y;
   break;
  
   case "top left":
	 menu.style.left = x - width;
	 menu.style.top  = y - height;
   break;
  }
  
  if(forcedirection || Document_Element_IsVisible(menu)) break;
 }

 
 // ACTUALLY SHOW
 menu.style.visibility = "visible";
 Document_Element_Animate(menu,  "fadeIn 0.125s linear 1");
 
 menu["status"] = "open";
 
 UI_Menu_GlobalCloser();
}




function UI_Menu_Close(menu, options = [])
{
 // REMOVE MENU FROM SCREEN
 if(menu.parentElement) menu.parentElement.removeChild(menu);
 menu["status"] = "closed";
    
 
 // IF MENU WAS OPENED BY ANOTHER MENU, MUST CLOSE THAT MENU AS WELL UNLESS OPTIONS DICTATE DIFFERENTLYY
 var parent = Document_Element_GetObject(menu, "parent-menu");
 if(parent && !options.includes("noparent")) 
 {
  Document_Element_SetObject(menu, "parent-menu", undefined);
  
  UI_Menu_Close(parent); 
 }
 
 
 // IF MENU HAS A SUBMENU OPENED, CLOSE IT UNLESS OPTIONS DICTATE DIFFERENTLY
 var submenu = Document_Element_GetObject(menu, "submenu");
 if(submenu && !options.includes("nosub"))
 {
  Document_Element_SetObject(menu, "submenu", undefined);
  
  UI_Menu_Close(submenu);
 }
}




function UI_Menu_CloseAll()
{
 var menus = Document_Element_FindChildren(document.body, "uielement", "menu");
 
 for(var menu of menus) if(menu && menu.parentElement) menu.parentElement.removeChild(menu);
}




function UI_Menu_OnClick(event)
{
 event.stopPropagation();
 var item = event.currentTarget;
 
 var menu    = Document_Element_FindParent(item, "uielement", "menu");
 var submenu = Document_Element_GetObject(item, "submenu");
 
 // IF THE ITEM HAS A SUBMENU, DISPLAY IT
 if(submenu)
 {
  // SEE IF THE CLICKED MENU ALREADY HAS AN OPENED SUBMENU
  var current = Document_Element_GetObject(menu, "submenu");
  if(current)
  {  
   UI_Menu_Close(current, ["noparent"]);
  }
  
	 
  // DETERMINE ORIGIN BASED ON ITEM POSITION	 
  var rect = UI_Element_Find(item, "submenu").getBoundingClientRect();  //console.log(rect);
  var x    = rect.right;
  var y    = rect.top;
  
  // LINK PARENT TO CHILD
  Document_Element_SetObject(menu,    "submenu",     submenu);
  Document_Element_SetObject(submenu, "parent-menu", menu);
  
  // DETERMINE SUBMENU DIRECTION. TOP OR BOTTOM MUST BE PRESERVED, BUT IT SHOULD ALWAYS SHOW TO THE RIGHT
  var direction = Document_Element_GetData(menu, "showdirection");
  direction = direction.replace("left",   "right");
  direction = direction.replace("middle", "right");
  
  UI_Menu_Show(submenu, x, y, {direction:direction}, event);
 }
 else
 // CALL FUNCTION AND CLOSE MENU
 {  
  if(menu) UI_Menu_Close(menu); 
 
  var func = Document_Element_GetObject(item, "func");
  if(func) func(item); 
 }	 

}





function UI_Menu_GlobalCloser()
{
 if(Document_Element_GetObject(document, "menu-globalcloser")) return;
 
 var handler = document.addEventListener("click", 
 function()
 {
  Document_Element_SetObject(document, "menu-globalcloser", undefined);
  UI_Menu_CloseAll();
 }, 
 {capture:false, once:true});
 
 Document_Element_SetObject(document, "menu-globalcloser", handler);
}





function UI_Menu_FromDatapage(id, page, category_field, categories = {}, handler = false)
{
 // BUILD CATALOG OF CATEGORIES AND THEIR ITEMS
 var catalog = {};
 for(var id in page)
 {
  var item = page[id];
  
  var category = item[category_field];
  if(!catalog[category]) catalog[category] = {};
  
  catalog[category][id] = item;
 }
 
 // PARSE ITEMS
 var items = {};
 for(var category in catalog)
 {
  // MAIN ITEMS - REPRESENTING CATEGORIES
  var item      = {};
  
  item["text"]  = UI_Language_Object(categories[category]);
  item["state"] = "enabled";
  item["icon"]  = categories[category]["icon"] || false;
   
  // SUBMENU FOR THIS MAIN (CATEGORY) ITEM
  var sub_items = {}; 
  for(var id in catalog[category])
  {
   var sub_item = {};
  
   sub_item["text"]  = UI_Language_Object(catalog[category][id]);
   sub_item["state"] = "enabled";
   sub_item["func"]  = handler;
  
   sub_items[id] = sub_item;
  }
  
  // CREATE SUBMENU
  item["submenu"] = UI_Menu_Create(id, sub_items, 
  {
   onshow: Editor_Presentation_MenuStyles
  });
  
  // MAIN ITEM MENU
  items[category] = item;
 }
 
 // FINALLY CREATE THE MAIN MENU
 var menu  = UI_Menu_Create("element-style", items);
 
 return menu;
}




function UI_Menu_FromObject(id, obj, category_field = false, handler = false)
{ 
 var items = {};
 
 // IF CATEGORY FIELD SET, COLLECT KEYS IN A STRUCTURED MANNER
 if(category_field)
 {
  // FIRST CATALOGUE CATEGORIES
  var catalog = {};
  for(var key in obj)
  {
   var category = obj[key][category_field];
   if(category) Safe_Push(catalog, category, key);
  }
  
  
  // NOT PUT KEYS IN A SEQUENCES BY CATEGORY, AND WITH SEPARATORS BETWEEN CATEGORIES
  var keys       = [];
  var categories = Object.keys(catalog);
  for(var i = 0; i < categories.length; i++) 
  {
   // ADD ALL KEYS IN THIS CATEGORY
   for(var key of catalog[categories[i]]) keys.push(key);
   
   // IF NOT LAST CATEGORY IN THE CATALOG, ADD A SEPARATOR ITEM
   if(i < categories.length - 1)
   {
	// THIS REPRESENTS A SEPARATOR
	keys.push(false);
   }	   
  }
 }
 else
 // NO CATEGORY FIELD SET, SIMPLY COLLECT OBJECT'S KEYS
 {
  var keys = Object.keys(obj);
 }
 
 
 // PARSE OBJECT AND CREATE ITEMS
 var sc = 0;
 for(var key of keys)
 {
  var item = {};
  
  if(!key)
  {
   // SEPARATOR
   var id = "separator " + sc; 
   sc     = sc + 1;
  }
  else
  {
   var id        = key;
   item["text"]  = UI_Language_Object(obj[key]);
   item["icon"]  = obj[key]["icon"] || false;
   item["state"] = "enabled";
   item["func"]  = handler;
  }
  
  items[id] = item;
 }
 
 
 // CREATE THE MENU
 var menu  = UI_Menu_Create(id, items);
 return menu;
}






// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                        T A B L E S                                             // 
//                                                                                                //
// -----------------------------------------------------------------------------------------------//

function UI_Table(style = "standard", config = {})
{
 var table = document.createElement("table");
 Document_CSS_SetClass(table, "table-" + style);
 
 Document_Element_SetData(table,   "style",  style);
 Document_Element_SetObject(table, "config", config);

 var cells = [];
 Document_Element_SetObject(table, "cells", cells);
 
 if(config["fixed"])
 {
  table.style.height = "auto";
 }
 
 if(config["seamless"])
 {
  table.style.borderCollapse = "collapse";
 }
 
 return table;
}



function UI_Table_Row(table, config = {}, onclick)
{
 var style = Document_Element_GetData(table, "style");
 
 var row   = document.createElement("tr");
 Document_CSS_SetClass(row, "table-" + style + "-row");
 Document_Element_SetData(row,   "style", style);
 Document_Element_SetObject(row, "table", table);
 Document_Element_SetObject(row, "config", config);
 Document_Element_SetObject(row, "onclick", onclick);
 
 if(config["fixed"])
 {
  row.style.position = "sticky";
  row.style.top      = "0";
 }
 
 
 if(config["selectable"])
 { 
  Document_CSS_SetClass(row, "effect-highlight-accented");
  
  row.onclick = 
  function(event)
  {
   console.log("row clicked");
   
   var row   = event.currentTarget;
   var table = row.parentElement;
   
   Document_Conditional_Class(table, "style-highlight-accented", row);
   Document_Element_SetObject(table, "selected-row", row);
   
   var onclick = Document_Element_GetObject(row, "onclick");
   if(onclick) onclick(event);
  }
 }
 
 table.appendChild(row);
 return row;
}



function UI_Table_Cell(row, config = {type:"cell"})
{
 var style = Document_Element_GetData(row, "style");
 var table = Document_Element_GetObject(row, "table");
 var cells = Document_Element_GetObject(table, "cells");
 
 var type    = config["type"] || "cell";
 var onclick = config["onclick"];
 
 var cell  = document.createElement("td");
 
 var row_config = Document_Element_GetObject(row, "config");
 if(row_config["selectable"] || row_config["transparent"])
 {
  cell.style.backgroundColor = "inherit";
  cell.style.color           = "inherit";
 }
 
 Document_CSS_SetClass(cell, "table-" + style + "-" + type);
 Document_Element_SetData(cell, "style", style);
 
 if(onclick)
 {
  Document_CSS_SetClass(cell, "style-clickable");
  cell.onclick = onclick;
 }
 
 cells.push(cell);
 
 row.appendChild(cell);
 return cell;
}





function UI_Table_Data(data = [], fields = {}, language, events = {}, actions = false)
{
 var table = UI_Table("standard", {seamless:true, fixed:true});
 
 // HEADER
 var row = UI_Table_Row(table, {fixed:true});
 for(var field in fields)
 {
  var cell             = UI_Table_Cell(row, {type:"header"});   
  cell.style.textAlign = "left";
  
  cell.innerHTML = UI_Language_String(language, field, "");
  
  if(events[field])
  {
   cell.onclick = events[field];
   
   Document_CSS_SetClass(cell, "style-clickable");
   Document_Element_SetData(cell, "field", field);
  }
 }
 
 // IF AN ACTION SET IS DEFINED, ADD AN EMPTY CELL TO THE HEADER
 if(actions)
 {
  var cell  = UI_Table_Cell(row, {type:"header"});  
 }
 
 
 
 // ROWS
 for(var item of data)
 {
  var row = UI_Table_Row(table, {selectable:true}, events["row"]);
  Document_Element_SetObject(row, "item", item);
   
  var i = 0; 
  for(var field in fields)
  {
   var cell             = UI_Table_Cell(row);
   cell.style.textAlign = "left";
    
   // HOW TO DEAL WITH THE CONTENT OF THIS FIELD?
   switch(typeof fields[field])
   {
    // IF FIELD EQUIPPED WITH A FUNCTION: CALL THE FUNCTION TO DETERMINE CONTENT
	case "function": 
		var value = fields[field](item[field]);
    break;
   
    // IF FIELD EQUIPPED WITH AN OBJECT: USE IT AS A DATAPAGE TO DECODE THE VALUE
    case "object":
		var obj   = fields[field][item[field]];
		var value = UI_Language_Object(obj, item[field]);
    break;

    // DIRECT CONTENT
    default:	
		var value = item[field]; 
	break;
   }
   
   cell.innerHTML = value || "";
   i++;
  }
  
  // IF AN ACTION SET IS DEFINED, ADD A CELL WITH ACTION ICONS
  if(actions)
  {
   var cell  = UI_Table_Cell(row, {type:"actions"});  
   for(var id in actions)
   {
	var action  = actions[id];
   
	var element = document.createElement("li");
	Document_CSS_SetClass(element, "style-clickable");
	Document_CSS_SetClass(element, "fa");
	Document_CSS_SetClass(element, "fa-" + action["icon"]);
	
	Document_Element_SetObject(element, "action", action);
	Document_Element_SetObject(element, "item",   item);
	Document_Element_SetObject(element, "row",    row);
	
	element.onclick = 
	function(event)
	{	 
	 var element = event.currentTarget;
	 var action  = Document_Element_GetObject(element, "action");
	 var item    = Document_Element_GetObject(element, "item");
	 var row     = Document_Element_GetObject(element, "row");
	 
     if(action["onclick"]) 
	 {
	  event.stopPropagation();
	
	  action["onclick"](item, row);
	 }
    }
	
	cell.appendChild(element);
   }
  }
 }
 
 return table;
}	






// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                     H E A D E R S                                              // 
//                                                                                                //
// -----------------------------------------------------------------------------------------------//

function UI_Header(id, items = {}, options = {})
{
 var template = options["template"] || "standard";
 
 var header   = UI_Element_Create("core/header-" + template);
 var labels   = UI_Element_Find(header, "labels");
 var selected = false;
 
 Document_Element_SetData(header,   "uid",     id);
 Document_Element_SetObject(header, "options", options);
 
 if(Object.keys(items).length > 1) Document_Element_SetData(header, "multi", true); 
 
 for(var id in items)
 {
  var item               = items[id];
  item["id"]             = id;
  
  var label              = document.createElement("div");
  label.innerHTML        = item["text"];
  if(!selected) selected = label;        // AUTOSELECT FIRST LABEL
  
  if(item["color"])
  {
   label.style.color = item["color"];
  }
  
  Document_Element_SetData(label,   "uid", id);
  Document_Element_SetObject(label, "item",   item);
  Document_Element_SetObject(label, "header", header); 
  Document_CSS_SetClass(label,      "style-clickable");
  
  // WHEN A HEADER LABEL (LEFT SIDE) IS CLICKED, LOAD ITS ICONS AND CALL THE ASSOCIATED FUNCTION IF ANY 
  label.onclick =
  function(event)
  { 
   var element = event.currentTarget;
   var item    = Document_Element_GetObject(element, "item");
   var header  = Document_Element_GetObject(element, "header");
   
   Document_Element_SetObject(header, "selected", element);
   
   UI_Header_Update(header);
   
   if(item["onclick"]) item["onclick"](item);
  }
  
  if(item["disabled"]) Document_Element_Disable(label, "style-disabled");
  labels.appendChild(label);
 }
 
 
 if(options["selectfirst"])
 {
  Document_Element_SetObject(header, "selected", selected);
  UI_Header_Update(header);
 
  var item = Document_Element_GetObject(selected, "item");
  if(item["onclick"]) item["onclick"]();
 }
 
 return header;
}





function UI_Header_Update(header)
{
 var options  = Document_Element_GetObject(header,   "options");
 var selected = Document_Element_GetObject(header,   "selected");
 var item     = Document_Element_GetObject(selected, "item");
 
 if(!item) return;
 
 // IF THIS HEADER HAS MULTIPLE LABELS, UNDERLINE THE CURRENTLY SELECTED LABEL, DE-UNDERLINE ALL OTHERS
 if(Document_Element_GetData(header, "multi"))
 { 
  var labels   = UI_Element_Find(header, "labels");
  
  // UNDERLINING
  Document_Conditional_Class(labels, "style-underlined", selected); 
  
  // EXTRA CLASS
  if(options["css"])
  {
   Document_Conditional_Class(labels, options["css"], selected); 
  }
 }
   
 // DISPLAY ICONS FOR THIS LABEL
 var glyphs       = UI_Element_Find(header, "icons");
 glyphs.innerHTML = "";
   
 var icons = item["icons"] || [];
 for(var icon of icons)
 {
  var glyph = document.createElement("li");
  Document_CSS_SetClass(glyph, "fa-solid");
  Document_CSS_SetClass(glyph, "fa-" + icon["icon"]);
	
  var func = icon["onclick"];
  if(func)
  {
   Document_CSS_SetClass(glyph, "style-clickable");
   glyph.onclick = func;
  }
   
  glyphs.appendChild(glyph);
 }
 
}




function UI_Header_Set(header, tab, autoclick)
{
 var selected = UI_Element_Find(header, tab);
 Document_Element_SetObject(header, "selected", selected);
 
 UI_Header_Update(header);
 
 if(selected && autoclick) 
 {
  var item = Document_Element_GetObject(selected, "item");
  if(item["onclick"]) item["onclick"](item);
 }
}




function UI_Header_Disable(header, tab)
{
 var selected = UI_Element_Find(header, tab);
 
 Document_CSS_SetClass(selected, "style-disabled");
 selected.style.pointerEvents = "none";
}



function UI_Header_Enable(header, tab)
{
 var selected = UI_Element_Find(header, tab);
 
 Document_CSS_UnsetClass(selected, "style-disabled");
 selected.style.pointerEvents = "";
}







// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                          L I S T S                                             // 
//                                                                                                //
// -----------------------------------------------------------------------------------------------//

function UI_List_Items(items, selectedstyle, onselect, options = {style:"vertical", overflow:true}, itemcreator, sectioncreator)
{
 var style = options["style"] || "vertical";
 
 var itemlist = UI_Element_Create("core/itemlist-" + style);
 Document_Element_SetObject(itemlist, "selectedstyle", selectedstyle);
 Document_Element_SetObject(itemlist, "onselect", onselect);
 
 //if(options["overflow"]) itemlist.style.overflow = "";
 
 var select =
 function()
 {
  if(!options["selected"]) return;
  
  for(var element of itemlist.children)
  {
   var item = Document_Element_GetObject(element, "itemlist-item");
   if(item == options["selected"])
   {
	Document_CSS_SetClass(element, options["highlight"] || "style-outlined-alert"); 
	Document_Element_Animate(element, "flash 1.5s") ;
	
	element.scrollIntoView({behavior: "smooth", block: "center"});
	
	if(options["selectedclick"])
	{
     Document_Event_Trigger(element, "click");
	}
	
   }	   
  }
 }
 
 if(options["sections"])
 {
  var sections = true;
  var catalog  = Array_Catalog_ByField(items, options["sections"]);
 }
 else
 {
  var sections = false; 
  var catalog  = {items};
 }
 
 for(var key in catalog)
 {
  // SECTION HEADER
  if(sections)
  {
   var element = sectioncreator(key, item);
   itemlist.appendChild(element);
  }
	 
  // ITEMS
  for(var item of catalog[key])
  {
   var element = itemcreator(item);
   Document_Element_SetObject(element, "itemlist-item", item);
   
   // IF ITEMS WILL BE ANIMATED, START THEM AS INVISIBLE
   if(options["animate"]) element.style.visibility = "hidden";
   
   element.onclick = 
   function(event)
   {
    var element       = event.currentTarget;
    var list          = element.parentElement;
 
    var selectedstyle = Document_Element_GetObject(list, "selectedstyle");
    var onselect      = Document_Element_GetObject(list, "onselect");

    Document_Conditional_Class(list, selectedstyle, element);    
    Document_Element_SetObject(list, "selecteditem", element);
 
    if(onselect) onselect(element);
   } 
  
   itemlist.appendChild(element);
  }
 }
 
 
 // ANIMATE LIST ITEMS?
 if(options["animate"])
 {  
  Document_Element_AnimateChildren(itemlist, "zoomIn 0.250s 1 ease-out", 
  {
   delay:    250, 
   interval: 125, 
  
   onstart:
   function(element) 
   {
    element.style.visibility = "visible";
   },
  
   onend:
   function(element)
   {
   }
  }).then(
  function()
  {
   // AFTER ALL HAS BEEN ANIMATED, CHECK SELECTED ITEM
   select();
  });
 }
 else  
 { 
  // CHECK SELECTED ITEM
  select();
 }
 
 return itemlist;
}






function UI_List_Files(files, onclick, options = {style:"standard"})
{
 style        = Safe_Get(options, "style", "standard");
 var filelist = UI_Element_Create("core/filelist-" + style);
 
 for(var file of files)
 {
  if(typeof file == "object")
  {
   var name = file["name"];
   var f    = file["onclick"] || onclick;
   var icon = file["icon"];
  }
  
  else	 
  
  {
   // NAME
   var name = Path_RemoveExtension(Path_Filename(file));
   var f    = onclick;
   
   var type = Media_Info_Type(file);
   switch(type)
   {
    case "image":
 	 var icon = "file-image";
    break;
   
    case "audio":
	 var icon = "file-audio";
    break;
   
    case "video":
	 var icon = "file-video";
    break;
   
    default:
	 var ext  = Path_Extension(file).toLowerCase();
     switch(ext)
	 {
      case "doc":
	  case "docx":
	  case "odt":
	 	var icon = "file-word";
	  break;
	 
	  case "xls":
	  case "xlsx":
	  case "odf":
		var icon = "file-excel";
	  break;
	 
	  case "pdf":
	 	var icon = "file-pdf";
	  break;
	 
	  default:
	 	var icon = "file";
	  break;
	}
    break;
   }
  }
 
  
  // CREATE ELEMENT
  var element = UI_Element_Create("core/filelist-" + style + "-item", {name, icon});
  Document_Element_SetData(element, "file", file);
  
  if(f) 
  {
   Document_CSS_SetClass(element, "style-clickable");
   Document_CSS_SetClass(element, "effect-highlight-accented");

   switch(f)
   {   
    case "download":
		element.onclick =
		function(event)
		{
	     var element = event.currentTarget;
		 var url  = Document_Element_GetData(element, "file");
		 
		 //Document_Element_Animate(item, "bounce 1s ease-in-out");
		 Request_Download(url);
		}
    break;	   
	
	default:
		 element.onclick = f;
	break;
   }
   
  }
  
  filelist.appendChild(element);
 }
 
 return filelist;
}



function UI_Checklist_GetValues(element)
{
 var object = {};
 
 var children = Document_Element_FindChildren(element, "itemid", undefined, ["recurse"]);
 for(var checkbox of children)
 {
  var id    = Document_Element_GetData(checkbox, "itemid");
  var value = checkbox.checked;
  
  object[id] = value;
 }
 
 return object;
}



function UI_Checklist_SetValues(element, object)
{ 
 var children = Document_Element_FindChildren(element, "itemid", undefined, ["recurse"]);
 for(var checkbox of children)
 {
  var id           = Document_Element_GetData(checkbox, "itemid");
  checkbox.checked = object[id];
 }
}



function UI_Checklist(items, template = "plain", onchange)
{
 var box = UI_Element_Create("core/checklist-box-" + template);
 Document_Element_SetObject(box, "items", items);
 
 for(var item of items)
 {  
  var element   = UI_Element_Create("core/checklist-item-" + template, item);
  var check     = UI_Element_Find(element, "check");
  
  check.checked = item["value"];
  Document_Element_SetObject(check, "item", item);
  
  check.onclick = 
  function(event)
  {
   var element   = event.currentTarget;
   var item      = Document_Element_GetObject(element, "item", {});
   
   var list      = Document_Element_FindParent(element, "control", "checklist");
   var items     = Document_Element_GetObject(list, "items", []);
   
   item["value"] = element.checked;

   if(onchange) onchange(item, items, list);   
  }
  
  box.appendChild(element);
 }
 
 return box;
}





// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                         G A U G E S                                            // 
//                                                                                                //
// -----------------------------------------------------------------------------------------------//


function UI_Gauge_ProgressCircle(element, options = {width:"100%", height:"100%", zIndex:100}, color)
{
 var gauge              = UI_Element_Create("core/gauge-circle");
 element.style.position = "relative";
 element.appendChild(gauge);
 
 var canvas  = UI_Element_Find(gauge, "canvas");
 
 Object.assign(canvas.style, options);
 
 var context = canvas.getContext("2d"); 
 var radius  = 0.75;
 
 
 var plugins = 
 {
  legend: 
  {
   display: false
  },
   
  tooltip: 
  {
   enabled: false
  },
   
  datalabels: 
  {
   formatter: 
   function (value, context) 
   {
    return "";
   } 
  }
 }


 var options = 
 {
  plugins:    plugins,
  cutout:     (100 * radius) + "%",
  responsive: false,
  
  animation:
  {
   duration:0
  }
 }


 var data = 
 {
  datasets: 
  [
   {
    data:            [0, 1],
    backgroundColor: [color, "transparent"],
    borderWidth:     0
  }
  ]
 }


 var chart = 
 new Chart(context, 
 {
  type:       "doughnut",
 
  cutout:     100 * radius,
  responsive: false,
  data:       data, 
  options:    options

 });
 
 
 Document_Element_SetData(gauge, "type", "progress-circle");
 Document_Element_SetObject(gauge, "chart", chart);
 return gauge; 
}






function UI_Gauge_Update(gauge, progress)
{
 var type  = Document_Element_GetData(gauge, "type");
 var chart = Document_Element_GetObject(gauge, "chart");
 
 chart.data.datasets[0].data[0] = progress;
 chart.data.datasets[0].data[1] = 1 - progress;
 
 chart.update();
}




async function UI_Gauge_TimeUpdate(gauge, time)
{
 var promise = new Promise((resolve, reject) =>
 {
  var start = Date.now();
 
  var update = setInterval(
  function()
  {
   var delta = (Date.now() - start) / time;
   if(delta > 1) delta = 1;
  
   UI_Gauge_Update(gauge, delta);
  
   if(delta == 1) 
   {
	clearInterval(update);
    resolve();
   }
  },
  1000 / 60);  // 60 TIMES PER SECOND 
 });
 
 return promise;
}









// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                         C H A R T S                                            // 
//                                                                                                //
// -----------------------------------------------------------------------------------------------//


function UI_Chart_LabelFormatter(context)
{
 var index = context["dataIndex"];
 var data  = Safe_Get(context, ["chart", "sourcedata"]); 
	
 if(data) 
 {
  var label = Safe_Get(data, [index, "label"]); 
 }
 else
 {
  var label = "";
 }
	
 return label;
}



function UI_Chart_DataDestructure(data)
{
 var values = [];
 var colors = [];
 
 for(var item of data)
 {
  values.push(item["value"]);
  colors.push(item["color"]);
 }
 
 return {values, colors};
}




function UI_Chart_UpdateValues(element, values)
{  
 var chart = Document_Element_GetObject(element, "chart");
 
 chart.data.datasets[0].data = values;
 chart.update();
}




function UI_Chart_UpdateData(element, data)
{  
 var chart           = Document_Element_GetObject(element, "chart");
 chart["sourcedata"] = data;
 
 
 var destructured = UI_Chart_DataDestructure(data);
 
 chart.data.datasets[0].data            = destructured["values"];
 chart.data.datasets[0].backgroundColor = destructured["colors"];
 chart.update();
}





function UI_Chart_Sunburst(data, radius = 0.5, onclick, config = {width:"100%", height:"100%", zIndex:100})
{
 // CREATE ELEMENT
 var element            = UI_Element_Create("core/chart-doughnut");
 element.style.position = "relative";

  
 // SETUP CANVAS
 var canvas  = UI_Element_Find(element, "canvas");
 var context = canvas.getContext("2d");  
 Object.assign(canvas.style, config);
 
 
 // SETUP CHART DEFAULTS
 var plugins = 
 {
  legend: 
  {
   display: false
  },
   
  tooltip: 
  {
   enabled: true,
   
   callbacks: 
   {
    label:UI_Chart_LabelFormatter 
   }
  },
   
  datalabels:
  {
   anchor: "center", //start, center, end
    
   rotation: function(ctx) 
   {
    const valuesBefore = ctx.dataset.data.slice(0, ctx.dataIndex).reduce((a, b) => a + b, 0);
    const sum = ctx.dataset.data.reduce((a, b) => a + b, 0);
    const rotation = ((valuesBefore + ctx.dataset.data[ctx.dataIndex] /2) /sum *360);
    return rotation < 180 ? rotation-90 : rotation+90;
   },
      
   formatter: function (value, context) 
   {
	var index = context["dataIndex"];
    var label = Safe_Get(context, ["chart", "sourcedata", index, "label"], "");
	
	// LABEL CLIPPING?
	if(config["maxlength"])
	{
     if(label.length > config["maxlength"]) label = label.substr(0, config["maxlength"]) + "…";
	}
	
	return label;
   },
  }
 }


 // CUSTOM FONT?
 if(config["font"])
 {
  plugins["datalabels"]["font"] = config["font"];
 }


 // 
 var options = 
 {
  plugins:    plugins,
  cutout:     (100 * radius) + "%",
  responsive: true,
 }


 // DISSECT DATA INTO COMPONENTS
 var destructured = UI_Chart_DataDestructure(data);
 var chartdata    = 
 {
  datasets: 
  [
   {
    data:            destructured["values"],
    backgroundColor: destructured["colors"],
    borderWidth:     1
   }
  ]
 }


 var chart = 
 new Chart(context, 
 {
  type:       "doughnut",
  cutout:     100 * radius,
  responsive: false,
  data:       chartdata, 
  options
 });
 
 
 
 canvas.onclick =
 function()
 {  
  var elements = chart.getElementsAtEventForMode(event, 'nearest', { intersect: true }, true); 
  var element  = elements[0];
  //var label    = datasets[element.datasetIndex]["labels"][element.index];
  var index     = element["index"];
  
  //chart.data.datasets[0].backgroundColor[index] = "red";
  //chart.update();
  
  if(onclick) onclick(data[index], element);
 }
 
 
 chart["sourcedata"] = data;
 Document_Element_SetData(element,   "type",  "doughnut");
 Document_Element_SetObject(element, "chart", chart);
 return element; 
}





function UI_Chart_Doughnut(data, radius = 0.5, config = {width:"100%", height:"100%", zIndex:100})
{
 // CREATE ELEMENT
 var element            = UI_Element_Create("core/chart-doughnut");
 
  
 // SETUP CANVAS
 var canvas  = UI_Element_Find(element, "canvas");
 var context = canvas.getContext("2d");  
 Object.assign(canvas.style, config);
 
 
 if(typeof config["tooltip"] != "undefined") var tooltip = config["tooltip"]; else var tooltip = true;

 
 // SETUP CHART DEFAULTS
 var plugins = 
 {
  legend: 
  {
   display: false
  },
   
  tooltip: 
  {
   enabled: tooltip,
   
   callbacks: 
   {
    label:UI_Chart_LabelFormatter 
   }
  },
   
  datalabels: 
  {
   formatter: 
   function(value, context) 
   {
    return "";
   } 
  }
 }


 var options = 
 {
  plugins:    plugins,
  cutout:     (100 * radius) + "%",
  responsive: true,
 }


 // DISSECT DATA INTO COMPONENTS
 var destructured = UI_Chart_DataDestructure(data);
 var chartdata    = 
 {
  datasets: 
  [
   {
    data:            destructured["values"],
    backgroundColor: destructured["colors"],
    borderWidth:     0
   }
  ]
 }


 var chart = 
 new Chart(context, 
 {
  type:       "doughnut",
  cutout:     100 * radius,
  responsive: false,
  data:       chartdata, 
  options:    options
 });
 
 
 chart["sourcedata"] = data;
 Document_Element_SetData(element,   "type",  "doughnut");
 Document_Element_SetObject(element, "chart", chart);
 return element; 
}




function UI_Chart_DoughnutLegend(data, radius = 0.67, config = {width:"100%", height:"100%", zIndex:100, tooltip:false}, datapage = false)
{
 var container = UI_Element_Create("core/chart-doughnut-legend");


 // IF THERE IS A DATAPAGE SPECIFIED, IT WILL BE USED TO CONVERT DATA
 if(datapage)
 {
  var convert = [];
  
  for(key in data)
  {
   var item      = {};
   item["value"] = data[key];
   item["name"]  = UI_Language_Object(datapage[key], key, {value:item["value"]});
   item["color"] = Document_CSS_Get(datapage[key]["color"]);
   
   convert.push(item);
  }
  
  var data = convert;
 }
	
 // CHART
 var chart = UI_Chart_Doughnut(data, radius, config);  
 UI_Element_Find(container, "chart").appendChild(chart);
 
 
 // LEGEND
 var legend = UI_Element_Find(container, "legend");
 for(var item of data)
 { 
  var color   = item["color"];
  var caption = item["name"];
  
  if(config && config["values"])  
  switch(config["values"])
  {
   case "right":
	caption = caption + ": " + item["value"]; 
   break;
   
   case "left":
	caption = item["value"] + " " + caption; 
   break;
  }
  
  var element = UI_Element_Create("core/chart-legend-item", {color, caption});
  legend.appendChild(element);
 }

  
 return container;
}





function UI_Chart_Lines(labels, data, options = {}, y_formatter, x_formatter, onclick, config = {width:"100%", height:"100%", zIndex:100})
{
 // CREATE ELEMENT
 var element            = UI_Element_Create("core/chart-lines");
 element.style.position = "relative";

  
 // SETUP CANVAS
 var canvas  = UI_Element_Find(element, "canvas");
 var context = canvas.getContext("2d");
 Object.assign(canvas.style, config);
 
  
 // DATA
 var chartdata =
 {
  labels,
  
  datasets: data
 }
 
 // SET INTERPOLATION FOR ALL SETS IN DATA
 if(options["interpolation"]) 
 {
  for(var set of data) set["cubicInterpolationMode"] = "monotone";
 }



 
 // SETUP CHART DEFAULTS
 var plugins = 
 {
  legend: 
  {
   display: false
  },
   
  tooltip: 
  {
   enabled: true,
   
   callbacks: 
   {
    label:UI_Chart_LabelFormatter 
   }
  },
   
  datalabels: 
  {
   formatter: 
   function(value, context) 
   {
    return "";
   } 
  }
 }


 
 // OPTIONS
 var chartoptions = 
 {
  plugins:    plugins,
  
  responsive: true,
  
  scales: 
  {
   y: 
   {
    ticks: 
	{
     callback : y_formatter || function(value){return value}
    }
   },
   
   x:
   {
	ticks: 
	{
     callback : x_formatter || function(value){return ""}
    }
   }
  }
  
 }
 
   
 if(options["min"] != undefined)
 {
  Safe_Set(chartoptions, ["scales", "y", "min"],          options["min"]);
 }

 
 if(options["max"] != undefined)
 {
  Safe_Set(chartoptions, ["scales", "y", "max"],          options["max"])
 }
 
 
 if(options["responsive"])
 { 
  chartoptions["responsive"]          = true;
  chartoptions["maintainAspectRatio"] = false;	
 }
 
 
 if(!options["gaps"])
 { 
  chartoptions["spanGaps"] = true;
 }


 // CHART
 var chart = 
 new Chart(context, 
 {
  type:       "line",
  data:       chartdata, 
  options:    chartoptions
 });
 

 // MAP CANVAS CLICK TO POINT SELECTION IN CHART
 canvas.onclick = 
 function(event)
 {
  var points = chart.getElementsAtEventForMode(event, "nearest", {intersect: true}, true);
  
  if(points.length > 0)
  {
   var point = points[0];

   if(onclick) onclick(point, event);
  }
 };

 
 chart["sourcedata"] = chartdata;
 Document_Element_SetData(element,   "type",  "line");
 Document_Element_SetObject(element, "chart", chart);
 return element; 
}







function UI_Chart_Bars(sets, options = {})
{
 // CREATE ELEMENT
 var element            = UI_Element_Create("core/chart-bars");
 element.style.position = "relative";

  
 // SETUP CANVAS
 var canvas   = UI_Element_Find(element, "canvas");
 var context  = canvas.getContext("2d"); 


 // DATA
 var chartdata   = 
 {
  labels: [""],
  datasets: sets
 }

 
 // OPTIONS 
 var chartoptions = 
 {
  indexAxis: 'y',
  elements: 
  {
   bar: 
   {
    borderWidth: 2,
   }
  },
   
  responsive: true,
  
  plugins: 
  {
   legend:
   {
    display: false,
   },
	
   datalabels: 
   {
    formatter: function(value, context) 
	{
     return Safe_Get(context, ["dataset", "label"], "");
    }
   }
  }
 }
 
 
  
 if(options["min"])
 {
  Safe_Set(chartoptions, ["scales", "x", "suggestedMin"], options["min"])
 }
 
 
 if(options["max"])
 {
  Safe_Set(chartoptions, ["scales", "x", "suggestedMax"], options["max"])
 }
 
 
 
 // CONFIG
 const config = 
 {
  type:    "bar",
  data:    chartdata,
  options: chartoptions
 } 
 
 var chart = new Chart(context, config);

 chart["sourcedata"] = chartdata;
 Document_Element_SetData(element,   "type",  "bar");
 Document_Element_SetObject(element, "chart", chart);
 
 return element; 
}



function UI_Chart_Stacks(data = {}, categories = {}, options = {})
{	 
 // CREATE LABELS
 var labels = Object.keys(data);
 console.log(data);
 
 // PREPARE COUNTERS
 var bycategory = {};
 var bylabel    = {};
 for(label of labels) bylabel[label] = 0;

 // COMPILE DATASETS
 var datasets   = [];
 
 for(id in categories)
 { 
  bycategory[id] = 0;
  var category   = categories[id];
   
  var set                = {};
  set["backgroundColor"] = Document_CSS_Get(category["backgroundColor"] || category["color"]); 
  
  set["data"]            = Array(labels.length).fill(null); 
  var i                  = 0;
  
  for(var label of labels)
  {   
   var value      = Safe_Get(data, [label, id], null);
   set["data"][i] = value;
   i++;
   
   if(value != null) 
   {
	bycategory[id] = bycategory[id] + parseInt(value);
    bylabel[label] = bylabel[label] + parseInt(value);
   }
  }
  
  datasets.push(set);
 }
 
 
 // PROCESS / STYLE LABELS
 var temp   = [];
 var totals = Safe_Get(options, "totals");
 for(var label of labels) 
 {
  if(totals)
  { 
   switch(totals)
   {
    case "()":
	 label = label + " (" + bylabel[label] + ") ";
    break;
	   
    default:
		label = label + totals + bylabel[label];
	break;
   }
  }
  
  label = String_Capitalize_Camel(label, " ", " ");
  temp.push(label);
 }
  
 var labels = temp;
 
 
 
 // CHART CONFIG
 var config = 
 {
  type:    "bar",
  data:    {labels, datasets},
  options: 
  {
   responsive: true,
   maintainAspectRatio: false,   
   scales:     {x:{stacked: true}, y:{stacked: true}},
   plugins:    {legend: {display: false}}
  }
 }
 
 
 // CREATE ELEMENT
 var title              = Safe_Get(options, "title", "");
 var element            = UI_Element_Create("core/chart-bars-custom", {title});
 element.style.position = "relative";
 
 
 
 // LEGEND
 if(Safe_Get(options, "legend", true))
 {
  var legend = UI_Element_Find(element, "legend");
  for(var id in categories)
  {
   var category = categories[id];
   var total    = totals[id] || "";
   var caption  = [total, String_Capitalize_Camel(id)].join(" ");
   var color    = Document_CSS_Get(category["backgroundColor"] || category["color"]);
  
   var item = UI_Element_Create("core/chart-legend-item", {caption, color});
   legend.appendChild(item);
  }
 }
 

 // SETUP CANVAS
 var canvas   = UI_Element_Find(element, "canvas");
 var context  = canvas.getContext("2d"); 
 
 var chart = new Chart(context, config);

 Document_Element_SetData(element,   "type",  "stacks");
 Document_Element_SetObject(element, "chart", chart);


 return element; 
}








function UI_Chart_Radar(labels, data, options = {}, config = {width:"100%", height:"100%", zIndex:100})
{
 // CREATE ELEMENT
 var element            = UI_Element_Create("core/chart-radar");
 element.style.position = "relative";

  
 // SETUP CANVAS
 var canvas  = UI_Element_Find(element, "canvas");
 var context = canvas.getContext("2d"); 
 Object.assign(canvas.style, config);

 
 // DATA
 var chartdata =
 {
  labels,
  datasets: data
 }
 
 
 // SETUP CHART DEFAULTS
 var plugins = 
 {
  legend: 
  {
   display: false
  },
   
  tooltip: 
  {
   enabled: false 
  },
   
  datalabels: 
  {
   formatter: 
   function(value, context) 
   {
    return "";
   } 
  }
 }


 // OPTIONS
 var chartoptions = 
 {
  aspectRatio: 1,
  plugins:    plugins,
 }
 
 
 // SET FONT SIZE AND PADDING (DOUBLE THE FONT'S SIZE)
 Safe_Set(chartoptions, ["scales", "r", "pointLabels", "font", "size"], Chart.defaults.font.size);
 Safe_Set(chartoptions, ["scales", "r", "pointLabels", "padding"],      parseInt(Chart.defaults.font.size) * 2);
 
 // DO NOT DISPLAY TICKS
 Safe_Set(chartoptions, ["scales", "r", "ticks", "display"], false);
 Safe_Set(chartoptions, ["scale", "stepSize"], 1);
   
 if(options["min"] != undefined)
 {
  Safe_Set(chartoptions, ["scale", "min"], options["min"]);
 }

 
 if(options["max"] != undefined)
 {
  Safe_Set(chartoptions, ["scale", "max"], options["max"])
 }
 
 
 if(options["responsive"])
 { 
  chartoptions["responsive"]          = true;
  chartoptions["maintainAspectRatio"] = false;	
 }
 
 console.log(chartdata);

 // CHART
 var chart = 
 new Chart(context, 
 {
  type:       "radar",
  data:       chartdata, 
  options:    chartoptions
 });
 

 chart["sourcedata"] = chartdata;
 Document_Element_SetData(element,   "type",  "radar");
 Document_Element_SetObject(element, "chart", chart);
 return element; 
}





// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                      C A L E N D A R                                           // 
//                                                                                                //
// -----------------------------------------------------------------------------------------------//


function UI_Calendar(month, year, data = {},  config = {})
{ 
 // BASICS
 var today  = Date_Portion(Date_Now(), "date-only");
 var locale = UI_Language_Current(true);
 
 
 // TABLE
 var table  = UI_Table("cursive");
 table.style.tableLayout = "fixed";
 
 
 // HEADER
 var row = UI_Table_Row(table); 
 for(var i = 1; i <= 7; i++)
 {
  var cell       = UI_Table_Cell(row, {type:"header"});  
  cell.innerHTML = Date_Weekday_Name(i, "short", locale); 
 }
 
 
 var days   = Date_Month_ListDays(month, year);
 
 
 // FIRST ROW: SEE HOW MANY CELLS WE NEED TO SKIP TO GET TO THE FIRST DAY OF THE MONTH
 var row = UI_Table_Row(table); 
 
 var first = Date_Weekday_Get(days[0]);
 for(var weekday = 1; weekday < first; weekday++)
 {
  var cell              = UI_Table_Cell(row);
  cell.style.visibility = "hidden";
  
  row.appendChild(cell);
 }	 


 // FUNCTION THAT WILL DETERMINE WHETHER A CELL IS ACTIVE OR NOT, GIVEN A DAY AND DATA
 if(config["activeday"])
 {
  var activeday = config["activeday"];
 }
 else
 {
  var activeday =
  function(day, data)
  {
   return data[day];
  }
 }
 

 // NOW WE PROCEED: KEEP ADDING DAYS
 var d = 0;
 while(d < days.length)
 {	 
  var weekday = Date_Weekday_Get(days[d]);
  
  var cell       = UI_Table_Cell(row); 
  cell.innerHTML = Date_Get(days[d], "day"); 
    
  var day = Date_Portion(days[d], "date-only");
  Document_Element_SetData(cell, "date", day);
	
	
  // ACTIVE CELL?	
  var active = activeday(day, data);
	
	
  // CELL WITH DATA?
  if(active)
  {
   cell.style.backgroundColor = "var(--color-alert-light)"; 
   Document_Element_SetObject(cell, "data", data[day]);
  }
  else
  {
  }
  
  
  // CELL ONCLICK
  if(config["onclick"] && (active || config["emptyactive"]))
  {
   Document_CSS_SetClass(cell, "style-clickable");
   
   cell.onclick =
   function(event)
   {
    var element = event.currentTarget;
	var data    = Document_Element_GetObject(element, "data");
	var date    = Document_Element_GetData(element, "date");
	
	config["onclick"](cell, date, data);
   }
  }
 
    
  // HIGHLIGHT TODAY
  if(day == today) 
  {
   cell.style.backgroundColor = "var(--color-noted)";
   Document_Element_Animate(cell, "flash 1.5s ease-in-out 1.5");
  }
  
  
  // CHECK ROW END
  if(weekday == 7)
  {
   var row = false;
   
   // START NEW ROW UNLESS THIS WAS ALSO THE FINAL DAY
   if(d != (days.length -1))
   {
    var row = UI_Table_Row(table);
   }
  }
  
  d++;
 }


 return table;
}



// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                          F R A M E S                                           // 
//                                                                                                //
// -----------------------------------------------------------------------------------------------//

async function UI_Frame(template = "standard", background, options = {})
{
 var frame  = UI_Element_Create("core/frame-" + template);
 
 for(var component of ["top", "right", "bottom", "left"])
 {
  var element = UI_Element_Find(frame, component); 
  var url     = background + "/" + component + ".png";
  
  await Document_Image_Load(element, [url]);
 }
 
 return frame;
}



async function UI_Frame_Flexi(background, bordersize)
{
 var frame                  = UI_Table();
 frame.style.borderCollapse = "collapse";
 frame.style.width          = "auto";
 frame.style.height         = "auto";
 frame.style.overflow       = "hidden";
 
 
 var row            = UI_Table_Row(frame);
 
 var cell           = UI_Table_Cell(row);
 cell.colSpan       = 3;
 cell.style.padding = "0px";
 cell.style.height  = bordersize + "px";
 Document_Element_SetData(cell, "uid", "top");
 
 
 var row             = UI_Table_Row(frame);
 
 var cell            = UI_Table_Cell(row);
 cell.style.padding  = "0px";
 cell.style.width    = bordersize + "px";
 Document_Element_SetData(cell, "uid", "left");
 
 var cell            = UI_Table_Cell(row);
 cell.style.padding  = "0px";
 cell.style.overflow = "hidden";
 Document_Element_SetData(cell, "uid", "content");
 
 var cell            = UI_Table_Cell(row);
 cell.style.padding  = "0px";
 cell.style.width    = bordersize + "px";
 Document_Element_SetData(cell, "uid", "right");
 
 
 var row             = UI_Table_Row(frame);
 
 var cell            = UI_Table_Cell(row);
 cell.colSpan        = 3;
 cell.style.padding  = "0px";
 cell.style.height   = bordersize + "px";
 Document_Element_SetData(cell, "uid", "bottom");
 
 
 
 for(var component of ["top", "right", "bottom", "left"])
 {
  var element = UI_Element_Find(frame, component); 
  var url     = background + "/" + component + ".png";
  
  element.style.backgroundSize  = "100% 100%";
  element.style.backgroundImage = "url(" + url + ")";	  
 }
 
 return frame;
}









// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                      S T I C K E R S                                           // 
//                                                                                                //
// -----------------------------------------------------------------------------------------------//


function UI_Sticker(element, sticker, options = {corner:"top", z:1000})
{
 sticker.style.position = "absolute";
 sticker.style.zIndex   = options["z"];
 Document_Element_SetData(sticker, "sticker", true);

 
 document.body.appendChild(sticker);
 
 
 var attach = 
 function(event)
 {  
  var point = Document_Element_Corner(element, options["corner"]);
  
  switch(options["corner"])
  {
   case "top":          var opposite = "bottom";       break;
   case "center":       var opposite = "center";       break;
   case "bottom":       var opposite = "top";          break;
   case "left top":     var opposite = "right bottom"; break;
   case "left":         var opposite = "right";        break;
   case "left bottom":  var opposite = "right top";    break;
   case "right top":    var opposite = "left top";     break;
   case "right":        var opposite = "left";         break;
   case "right bottom": var opposite = "left bottom";  break;
  }
  var rect         = sticker.getBoundingClientRect();
  var displacement = Geometry_Rect_Displacement(rect, opposite);
  
  var offset_left    = options["offset_left"] || 0;
  var offset_top     = options["offset_top"]  || 0;
  
  sticker.style.left = point["left"] - displacement["left"] + offset_left;
  sticker.style.top  = point["top"]  - displacement["top"]  + offset_top;
 }
 
 attach();
 
 var observer = new ResizeObserver(attach);
 observer.observe(element);
 
 return sticker;
}



function UI_Stickers_Clean(container)
{
 if(!container) var container = document.body;
 
 var stickers = Document_Element_FindChildren(container, "sticker");
 for(var sticker of stickers) sticker.remove();
}




function UI_Sticker_Frame(template, content, variables)
{
 var frame     = UI_Element_Create("core/" + template, variables);
 var container = UI_Element_Find(frame, "content");
 
 container.appendChild(content);
 
 return frame;
}










// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                      L A N G U A G E                                           // 
//                                                                                                //
// -----------------------------------------------------------------------------------------------//


function UI_Language_Current(aslocale)
{
 var lang = Safe_Get(application, ["state", "core", "lang"], "en");
 
 if(aslocale) lang = Core_Data_Value("core/languages", lang, "code");
 
 return lang;
}



function UI_Language_Set(language)
{
 Safe_Set(application, ["state", "core", "lang"], language);
}



function UI_Language_Page(pageid)
{
 // FOR MODULES, WE ALLOW TO ADDRESS THE MODULE'S BASE PAGE (/MODULE) AS JUST "MODULENAME"
 if(!pageid.includes("/")) pageid = pageid + "/module";
	 
 var page = Safe_Get(application, ["data", pageid], {});
 return page;
}





function UI_Language_Exists(pageid, item, lang)
{	
 if(!lang) var lang = UI_Language_Current();
 var page   = UI_Language_Page(pageid);
 var string = Safe_Get(page, [item, lang], "");
 
 return string !== "";
}





function UI_Language_String(pageid, item, variables, lang)
{	  
 var page   = UI_Language_Page(pageid);
 
 // LANGUAGE TO BE USED
 if(!lang) var lang = UI_Language_Current();
 
 // TRY GETTING A STRING FOR THIS ITEM AND LANGUAGE
 var string = Safe_Get(page, [item, lang], "");
 
 //console.log(pageid, item, string);
 
 // NOT FOUND? TRY WITH ENGLISH (UNIVERSAL DEFAULT). IF NOT FOUND, JUST THE ITEM DEFINITION AS TEXT
 if(string == "") 
 {
  //console.log(pageid + " / " + itemid + " / " + lang + " was undefined");
  var string = Safe_Get(page, [item, "en"], item);
 }
 
 // FORMAT AND RETURN
 string = String_Variables_Set(string, variables);
 return string;
}



function UI_Language_Object(obj, def, variables, lang)
{
 if(!lang) var lang = UI_Language_Current();
 
 var text = Safe_Get(obj, [lang], "");
 if(text == "") var text = Safe_Get(obj, ["en"], def);
 
 if(variables) text = String_Variables_Set(text, variables);
 return text;
}





function UI_Language_Apply(text, pageid, variables, lang)
{ 
 var page = UI_Language_Page(pageid);
 
 if(!lang) var lang = UI_Language_Current();

 var keys = Object.keys(page);
 
 for(var key of keys)
 {
  var string = Safe_Get(page, [key, lang], "");
  if(string == "") var string = Safe_Get(page, [key, "en"], key);
  
  text = text.replaceAll("%" + key + "%", string);
 }
 
 if(variables) text = String_Variables_Set(text, variables);
 
 return text;
}




function UI_Language_Options(page, lang)
{
 if(!lang) var lang = UI_Language_Current();
 
 if(typeof page == "string") var page = Core_Data_Page(page);
 
 var options = [];
 for(var id in page)
 {
  var value = id;
  var text  = UI_Language_Object(page[id]);
  
  options.push({value, text});
 }
 
 return options;
}





function UI_Language_Date(date, format, lang)
{
 if(!lang) var lang = UI_Language_Current();
 var locale         = Core_Data_Value("core/languages", lang, "code");
 
 var text = Date_Format(date, locale, format);
 
 return text;
}







// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                          I N I T                                               // 
//                                                                                                //
// -----------------------------------------------------------------------------------------------//

Chart.defaults.font.family = Document_CSS_GetValue("text-caption-medium", "fontFamily")
Chart.defaults.font.size   = Document_CSS_GetValue("text-caption-medium", "fontSize");// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                        D A T A B A S E                                         //
//                                                                                                //
// -----------------------------------------------------------------------------------------------//

function Database_View_Create(service, pagerows, fields, language, onselectrow, actions, options = [])
{
 var view = {};
 
 view["service"]     = service;
 view["pagerows"]    = pagerows;
 view["fields"]      = fields;
 view["onselectrow"] = onselectrow;
 view["language"]    = language;
 view["actions"]     = actions;
 view["options"]     = options;
 
 console.log("Created database with view", view);
 
 var display = UI_Element_Create("database/list-standard");
 Document_Element_SetObject(display, "view", view);
 
 console.log(display);
 return display;
}




async function Database_View_Data(display, rows, fields)
{
 var view   = Document_Element_GetObject(display, "view");
 var search = Object_Copy(Document_Element_GetObject(display, "search"));
 
 
 //ROWS
 switch(rows)
 {
  // ALL ADDRESSABLE ROWS
  case "all":
	search["rows"] = false;
	search["page"] = false;
  break;

  // CURRENTLY DISPLAYED
  default:
  break;  
 }
 
 
 
 // FIELDS
 search["fields"] = fields || search["fields"];
 
 
 var data = await Core_Api(view["service"], search);
 return data;
}





async function Database_View_Download(display, rows, fields, filename)
{
 var data = await Database_View_Data(display, rows, fields);
 
 if(data.length == 0) return;
 var file = [];
 
 // HEADER
 var header = Object.keys(data[0]);
 header.join(",");
 file.push(header);
 
 // ROWS
 for(var row of data)
 {
  var line = Object.values(row);
  line     = line.join(",");
  
  file.push(line);
 }
 
 file = file.join("\r\n");
 
 Storage_Data_Download(file, filename, "text/csv");
}





async function Database_View_Query(display, search)
{
 var view = Document_Element_GetObject(display, "view");
  
 search["rows"] = view["pagerows"];
  
 // IF NO PAGE SELECTED, THEN DEFAULT TO PAGE 1 AND REQUEST STATS
 if(!search["page"]) 
 {
  search["page"]  = 0;
  search["stats"] = true;
 }
 
 Document_Element_SetObject(display, "search", search);
 
 
 console.log("Querying database with search", view["service"], search);
 
 // READ FROM DATABASE
 var data = await Core_Api(view["service"], search);
 
 
 
 // IF STATS REQUESTED, UPDATE
 if(search["stats"])
 {
  var stats    = data.pop();
  var count    = stats["count"];
  var pagesize = Module_Config("users", "page");
  var pages    = Math.ceil(count / pagesize);
  
  view["count"] = count;
  view["pages"] = pages;  
 }
 
 view["current-page"] = search["page"];
  
  
  
 
 // CREATE TABLE
 var events    = {};
 events["row"] = view["onselectrow"];
 
 // HEADER EVENTS : SORT 
 for(var field in view["fields"])
 {
  events[field] = 
  async function(event)
  {
   element = event.currentTarget;
   field   = Document_Element_GetData(element, "field");
   
   console.log(search);
   console.log(view);
   
   // IF CLICKED THE SAME AGAIN, INVERT ORDER
   if(search["order"].replaceAll(" DESC", "") == field.replaceAll(" DESC", ""))
   {
	if(search["order"].includes(" DESC")) var mode = ""; else var mode = " DESC";
   }
   else
   {
	var mode = "";
   }
   
   search["order"] = field + mode;
   search["page"]  = 0;
   
   await Database_View_Query(display, search);
  }
 }
 
 var table = UI_Table_Data(data, view["fields"], view["language"], events, view["actions"]);
 
 
 // CREATE DISPLAY (VIEW)
 var container       = UI_Element_Find(display, "list");
 container.innerHTML = "";
 container.appendChild(table);
 
 
 // UPDATE PAGE SELECTOR
 var select = UI_Element_Find(display, "page");
 Document_Select_Clear(select);
 
 // IF STATS WERE REQUESTED, UPDATE PAGE SELECTOR ACCORDINGLY
 if(search["stats"])
 {
  for(var i = 0; i <  view["pages"]; i++)
  {
   var option = Document_Select_AddOption(select, UI_Language_String("database/list", "select page", {n:i + 1}), i);
  }
 }
 
 select.value = view["current-page"];
 
 Document_Element_SetObject(select, "display", display); 
 
 // PAGE CHANGE
 select.onchange = 
 async function(event)
 {
  var element = event.currentTarget;
  var display = Document_Element_GetObject(element, "display");
  var view    = Document_Element_GetObject(display, "view");
  var search  = Document_Element_GetObject(display, "search");
  
  search["page"] = element.value;
  
  await Database_View_Query(display, search);
 }
 
 console.log(view["current-page"], view["pages"]);
 

 // NAVIGATION
 
 // PREV
 var element = UI_Element_Find(display, "prev");
 if(parseInt(view["current-page"]) <= 0) Document_Element_Disable(element, "style-disabled"); else Document_Element_Restore(element);
 
 element.onclick = 
 function()
 {
  select.value = parseInt(select.value) -1;
  Document_Event_Trigger(select, "change");
 }

 
 // NEXT
 var element = UI_Element_Find(display, "next");
 if(parseInt(view["current-page"]) >= (view["pages"] - 1)) Document_Element_Disable(UI_Element_Find(display, "next"), "style-disabled");  else Document_Element_Restore(element);
 
 element.onclick = 
 function()
 {
  select.value = parseInt(select.value) +1;
  Document_Event_Trigger(select, "change");
 }
 
 
 // EXPORT
 
 // EXPORT PAGE
 var element = UI_Element_Find(display, "export-page");
 Document_Element_SetObject(element, "display", display);
 
 if(!User_Can("export-page")) Document_Element_Disable(element, "style-disabled");

 element.onclick = 
 function(event)
 {
  var element = event.currentTarget;
  var display = Document_Element_GetObject(element, "display");
  
  var filename = Safe_Get(view, ["service"], false);
  var fields   = Safe_Get(view, ["options", "export_fields"], false);
  
  Database_View_Download(display, view["pagerows"], fields, filename);
 }
 
 
 
 // EXPORT ALL
 var element = UI_Element_Find(display, "export-all");
 Document_Element_SetObject(element, "display", display);
 
 if(!User_Can("export-all")) Document_Element_Disable(element, "style-disabled");
 
 element.onclick = 
 function(event)
 {
  var element = event.currentTarget;
  var display = Document_Element_GetObject(element, "display");
  var view    = Document_Element_GetObject(display, "view");
  
  var filename = Safe_Get(view, ["service"], false);
  var fields   = Safe_Get(view, ["options", "export_fields"], false);
  
  Database_View_Download(display, "all", fields, filename);
 }
 
 
 
 // MORE OPERATIONS
 var operations = Safe_Get(view, ["options", "operations"], {});
 var container  = UI_Element_Find(display, "operations");
 
 for(id in operations)
 {
  var operation = operations[id];
  var element   = UI_Element_Create("database/list-operation", {id, icon:operation["icon"]});
   
  Document_Element_SetObject(element, "display", display);
  Document_Element_SetObject(element, "onclick", operation["onclick"]);
   
  element.onclick = 
  function(event)
  {
   var element = event.currentTarget;
   var display = Document_Element_GetObject(element, "display");
   var onclick = Document_Element_GetObject(element, "onclick");
    
   onclick(display);
  }
   
  container.appendChild(element);
 }
 
}// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                      F O L L O W U P                                           //
//                                                                                                //
// -----------------------------------------------------------------------------------------------//


async function Embed_Casefollowup()
{
 
 var case_id   = Client_Location_Parameter("case_id");
 var action_id = Client_Location_Parameter("action_id");
 
 var page      = Module_Page_Body();
 var panel     = UI_Element_Find(page, "display");
 var display   = await Marketing_Contact_DisplayCase(case_id, {customer:true});
 
 
 // DISABLE CUSTOMER SECTION
 /*
 var section    = UI_Element_Find(display, "section-customer");
 var elements  = Document_Element_Children(section, true);
 for(var element of elements)
 {
  var uid = Document_Element_GetData(element, "uid", false);
  if(uid) Document_Element_Disable(element, "style-disabled");
 }
 */
 
 // DISABLE PRODUCT EDITING
 var section    = UI_Element_Find(display, "section-product");
 var elements  = Document_Element_Children(section, true);
 for(var element of elements)
 {
  var uid = Document_Element_GetData(element, "uid", false);
  if(uid) Document_Element_Disable(element, "style-disabled");
 }
 
 
 // DISABLE CALL EDITING
 var section    = UI_Element_Find(display, "section-call");
 var elements  = Document_Element_Children(section, true);
 for(var element of elements)
 {
  var uid = Document_Element_GetData(element, "uid", false);
  if(uid) Document_Element_Disable(element, "style-disabled");
 }
 
 // DISABLE SURVEY EDITING
 var section    = UI_Element_Find(display, "section-survey");
 var elements  = Document_Element_Children(section, true);
 for(var element of elements)
 {
  var uid = Document_Element_GetData(element, "uid", false);
  if(uid == "answer") Document_Element_Disable(element, "style-disabled");
 }
 
 // DISABLE DELETING ACTIONS
 var section    = UI_Element_Find(display, "section-actions");
 var elements  = Document_Element_Children(section, true);
 for(var element of elements)
 {
  var uid = Document_Element_GetData(element, "uid", false);
  if(uid == "delete") Document_Element_Disable(element, "style-disabled");
 }
 
 panel.appendChild(display);
 
 var element = Document_Element_FindChild(display, "actionid", action_id, ["recurse"]);
 if(element) Document_Element_Animate(element, "flash 1s 3");
}// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                         E M B E D                                              //
//                                                                                                //
// -----------------------------------------------------------------------------------------------//

async function Embed_OnLoad(module, data)
{
 Module_Page_Set();
}



async function Embed_OnShow(module, data)
{
 
}




async function Embed_OnUnload()
{
}// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                          L O G I N                                             //
//                                                                                                //
// -----------------------------------------------------------------------------------------------//

async function Login_OnLoad(module, data)
{
 // LOGO
 var image   = UI_Element_Find(module, "logo");
 var source  = Resources_URL("images/login-logo.png", "partner");
 Document_Image_Load(image, [source]);
 
 // BACKGROUND
 var video = UI_Element_Find(module, "background-video");
 video.src = Resources_URL("video/login-loop.mp4", "partner");
 
 // SETUP LOGIN BUTTON
 var button       = UI_Element_Find(module, "button-login");
 button.innerHTML = UI_Language_String("login", "login button text");
 button.onclick   = Login_Login;
 
 // SETUP FIELDS TO SUBMIT LOGIN EVENT ON ENTER KEY PRESSED
 Document_Handler_EnterKey(UI_Element_Find(module, "username"), Login_Login);
 Document_Handler_EnterKey(UI_Element_Find(module, "password"), Login_Login);
}




async function Login_OnShow(module, data)
{
 // LOGO
 var logo  = UI_Element_Find(module, "logo");
 var login = UI_Element_Find(module, "login");
 
 UI_Element_Find("background-video").play()
 
 await Document_Element_Animate(logo,  "fadeInUp 1.5s ease-out 1");
 
 Document_Element_Show(login);
 Document_Element_Animate(login, "fadeIn 0.5s linear 1");
}




async function Login_OnUnload()
{
}







// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                          M O R E                                               //
//                                                                                                //
// -----------------------------------------------------------------------------------------------//

async function Login_Login()
{
 var login    = UI_Element_Find("login");
 var username = UI_Element_Find("username");
 var password = UI_Element_Find("password");
 
 var response = await Core_Api("Core_Login", {user_id:username.value, password:password.value});
 
 if((typeof response == "object") && (response["id"]))
 {
  // ANIMATE DISAPPEARANCE
  var box = UI_Element_Find("box-main");
  
  await Document_Element_Animate(box, "fadeOutUp 1.75s ease-out 1 normal forwards");
  await Module_Load("main", document.body);
  await Module_Load("home");
 }
 else
 {
  Document_Element_Animate(login, "headShake 0.75s linear 1");
 }
 
}// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                          M A I N                                               //
//                                                                                                //
// -----------------------------------------------------------------------------------------------//


async function Main_OnLoad(module, data)
{ 
 // USER PROFILE
 var user     = await Core_User();
 var element  = UI_Element_Create("main/menu-item-user", {username:user["firstname"]});
 
 
 // APPLY USER PREFERENCES
 Profile_Preferences_ApplyLanguage();
 Profile_Preferences_ApplySize();
 
 
 
 var icon     = UI_Element_Find(element, "user-propic");
 User_Picture_Load(icon, user);
 
 icon.onclick = Main_Menu_LoadModule;
 Document_Element_SetData(icon, "module", "profile");
 
 UI_Element_Find(module, "main-user").appendChild(element);
 Document_Element_Animate(element, "slideInLeft 1s 1 ease-out");
 
 	
 // BUILD MENU
 var container = UI_Element_Find(module, "main-menu");

 var modules = Safe_Get(application, ["config", "roles", user["role"], "modules"], "");
 var menu    = Array_From_String(modules);
 for(var item of menu)
 {
  // MENU ITEM TEXT
  var text    = UI_Language_String(item, "module");
  let element = UI_Element_Create("main/menu-item-plain", {text:text});
  
  // MENU ITEM ID
  Document_Element_SetData(element, "uid", "menu-" + item);
  
  // MENU ITEM ICON
  var sources = [];
  var icon    = UI_Element_Find(element, "icon");
  var image   = Module_Data(item, "module", "menu-icon");
  sources.push(Resources_URL("images/" + image) + ".png");
  
  Document_Image_Load(icon, sources);
  
  Document_Element_SetData(element, "module", item);
  element.onclick           = Main_Menu_LoadModule;  
  element.style.visibility  = "hidden";
  
  container.appendChild(element);
 }
  
 Document_Element_AnimateChildren(container, "slideInUp 1s 1 ease-out", 
 {
  delay:    0, 
  interval: 175, 
  onstart:
  function(element) 
  {
   element.style.visibility = "visible"
  }
 });
 
}




async function Main_OnShow(module, data)
{
 //Module_Load("home");
 /*
 var container = UI_Element_Find(module, "main-menu");
 container.style.overflow = "auto hidden";
 Document_Element_FitContent(container, 0.1);
 container.style.overflow = "hidden";
 */
}








async function Main_OnUnload()
{
}




// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                          M E N U                                               //
//                                                                                                //
// -----------------------------------------------------------------------------------------------//


function Main_Menu_LoadModule(event)
{
 var element = event.currentTarget;
 var module  = Document_Element_GetData(element, "module");
 
 var container = UI_Element_Find("main-menu");
 Document_Conditional_Class(container, "shadow-sharp-bottom",   element);
 // Document_Conditional_Class(container, "style-highlight-light", element);
 
 Module_Load(module);
}// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                          C A L L                                               //
//                                                                                                //
// -----------------------------------------------------------------------------------------------//

async function Marketing_Call(event)
{	
 // SET UP CONTROLS
 var page  = Core_State_Get("marketing", "submodule"); 

 await Marketing_Call_DisplayLead(-1, UI_Element_Find(page, "panel-call")); 
}





  
async function Marketing_Call_DisplayRecalls(operator_id, container, options = {})
{
 if(!operator_id) var operator_id = User_Id();
	 
 var recalls = await Core_Api("Marketing_Call_ListRecalls", {operator_id, leads:true});
 Core_State_Set("marketing", ["call", "recalls"], recalls);
 
 var table = UI_Table("standard", {seamless:true, fixed:true, xselectable:true});
 var n     = 0;
 for(var recall of recalls)
 {
  var date = Safe_Get(recall, ["date_recall"], Date_Now());
  
  // ROW
  var row = UI_Table_Row(table, {transparent:true});
  
  if(Numbers_Is_Odd(n))
  {
   row.style.backgroundColor = "var(--color-light)";
  }
  else
  {
   row.style.backgroundColor = "var(--color-medium)";
  }
  n++;
  
  Document_CSS_SetClass(row, "style-clickable");
  Document_Element_SetData(row, "lead", recall["lead_id"]);
  
  
  // MANUAL RECALL
  if(Safe_Get(options, "openrecalls"))
  {
   row.onclick =
   async function(event)
   {
    var element = event.srcElement;
    element     = Document_Element_FindParent(element, "lead");
    
    var id      = Document_Element_GetData(element, "lead");
    console.log(id);
    
    var title   = UI_Language_String("marketing/call", "recall popup title"); 
    var text    = UI_Language_String("marketing/call", "recall popup text"); 
    
	var confirm = await UI_Popup_Confirm(title, text);
	if(!confirm) return;
   
    var lead_id = id;
    var operator_id = User_Id();
 
    await Core_Api("Marketing_Call_AssignLead", {operator_id, lead_id});
    await Marketing_Call_Next();
	await Marketing_Call();
   }
  }
  else
  {
   // CUSTOM ONCLICK ?
   if(!onclick) row.onclick = Safe_Get(options, "onclick");
  }
 
   
 
  
  // CENTER
  var cell             = UI_Table_Cell(row);
  cell.innerHTML       = Centers_Name(Safe_Get(recall, ["lead", "center"]));
  cell.style.textAlign = "left";
  
  // DATE
  var cell             = UI_Table_Cell(row);
  cell.innerHTML       = String_Capitalize_Camel(Date_Format(date, UI_Language_Current(true), "date-long-weekday-noyear"));
  cell.style.textAlign = "left";
  
  // TIME
  var cell              = UI_Table_Cell(row);
  cell.style.textAlign  = "left";
  cell.innerHTML        = Date_Format(date, UI_Language_Current(true), "time-only");
  
  // NAME
  var cell = UI_Table_Cell(row);
  cell.innerHTML = Safe_Get(recall, ["lead", "name"], "");
  
  // NOTES
  var cell             = UI_Table_Cell(row);
  cell.innerHTML       = Safe_Get(recall, ["notes"], "");
  cell.style.textAlign = "justify";
 }
 
 container.innerHTML = "";
 container.appendChild(table);
}



function Marketing_Call_DisplayContacts(lead)
{
 var outcomes = Core_Data_Page("marketing/outcomes");
 var n        = 0;
 var table    = UI_Table("standard", {seamless:true, fixed:true});
 
 for(var contact of Safe_Get(lead, ["contacts"], []))
 { 
  var row = UI_Table_Row(table, {transparent:true});
  //console.log(contact);
 
  if(contact["outcome"] == "eng")
  {
   row.style.backgroundColor = "var(--color-good)";
   row.style.color           = "var(--color-white)";
  }
  else
  {
   if(Numbers_Is_Odd(n))
   {
    row.style.backgroundColor = "var(--color-light)";
   }
   else
   {
    row.style.backgroundColor = "var(--color-medium)";
   }
  }
  
  // CONTACT OUTCOME
  var cell                   = UI_Table_Cell(row);
  cell.innerHTML             = UI_Language_Object(outcomes[contact["outcome"]]);
  cell.style.backgroundColor = "var(--" + outcomes[contact["outcome"]]["color"] + ")";
  cell.style.color           = contact["outcome"]["text"] || "";
  cell.style.textAlign       = "left";
  
  
  // CONTACT DATE
  var cell             = UI_Table_Cell(row);
  cell.innerHTML       = Date_Format(contact["date_call"], UI_Language_Current(true), "date-long-weekday");
  cell.style.textAlign = "left";
  
  // CONTACT TIME
  var cell             = UI_Table_Cell(row);
  cell.innerHTML       = Date_Format(contact["date_call"], UI_Language_Current(true), "time-only");
  cell.style.textAlign = "left";
  
  // CONTACT DURATION
  var cell             = UI_Table_Cell(row);
  cell.innerHTML       = Time_Format_Period((contact["duration"] / 60).toFixed(1), UI_Language_Current(true)); 
  cell.style.textAlign = "left";
 
  // CONTACT NOTES  
  var cell             = UI_Table_Cell(row);
  var wrapper          = UI_Element_Create("marketing/lead-contact-notes");
  wrapper.innerHTML    = contact["notes"] || "...";
  wrapper.title        = contact["notes"] || "";
  //cell.style.textAlign = "left";
  //cell.style.overflow  = "ellipsis";
  cell.appendChild(wrapper); 
 
  // CASE ICONS  
  var cell    = UI_Table_Cell(row);
  var wrapper = UI_Element_Create("marketing/lead-contact-links");
  cell.appendChild(wrapper);
	
  
  // ICONS: DISPLAY CASE
  var icon    = UI_Element_Find(wrapper, "case");
  
  if(contact["outcome"] == "eng") 
  {
   Document_Element_SetData(icon, "uid", "case-" + contact["id"]);
   Document_Element_SetObject(icon, "contact", contact);
  
   icon.onclick =
   async function(event)
   {
    var element = event.srcElement;
    var contact = Document_Element_GetObject(element, "contact"); console.log(contact);
    var appid   = contact["id"]; 
    
    var display         = await Marketing_Contact_DisplayCase(contact["id"]);  console.log(display);
	var container       = UI_Element_Find("more-content");
	container.innerHTML = "";
    container.appendChild(display);
   }
  }
  else
  {
   icon.style.display = "none";
  }
  
  
  //if(contact["date_recall"]) 
  
  n++;
 }
 
 return table;
}




async function Marketing_Call_DisplayLead(operator_id, container, options = {data:true, history:true, outcome:true})
{
 var outcomes = Core_Data_Page("marketing/outcomes");
 
 var mode     = Safe_Get(options, ["mode"],    "operator");
 var lead_id  = Safe_Get(options, ["lead_id"], -1);
 
 var lead     = await Core_Api("Marketing_Call_GetLead", {operator_id, options:{full:true, mode, lead_id}});
 
 // NO LEAD
 if(!lead)
 {
  var text    = UI_Language_String("marketing/call", "message noleads");
  var message = UI_Element_Create("core/message-center-big", {text});
	 
  container.innerHTML = "";
  container.appendChild(message);
  
  return;
 }
 
 lead["time"]      = new Date().getTime();
 lead["date_call"] = Date_Now();
 
 console.log("lead");
 console.log(lead);
 
 var element = UI_Element_Create("marketing/lead-call", {}, {language:"marketing/lead"});
 
  // RECALL?
 if(lead["reason"] == "recall")
 {
  console.log("recall");
  UI_Element_Find(element, "warning-text").innerHTML = UI_Language_String("marketing/lead", "warning recall");
  UI_Element_Find(element, "warning-icon").className = "fas fa-exclamation-triangle";
  
  UI_Element_Find(element, "warning-body").style.backgroundColor = "var(--color-soso)";
  UI_Element_Find(element, "panel-warning").style.display         = "flex";
 }
 
 
 // BASE INFO
 if(options["data"])
 {
  var fields  = ["student_id", "name", "phone_mobile", "center", "course", "email", "province", "city", "postcode", "notes"];
  
  // FIELDS
  for(var field of fields)
  {
   var control   = UI_Element_Find(element, "input-" + field);
   control.value = lead[field];
   
   Document_Element_SetData(control, "field", field);
   Document_Element_SetData(control, "lead_id", lead["id"]);
 
   control.onchange = 
   async function(event)
   {
    var element = event.srcElement;
    
    var id    = Document_Element_GetData(element, "lead_id");
    var field = Document_Element_GetData(element, "field");
    var value = element.value;
    
    Core_Api("Marketing_Lead_Update", {id, field, value});
   }	  
  }
  
 }
 
 
 // CONTACT HISTORY
 var table       = Marketing_Call_DisplayContacts(lead);
 var panel       = UI_Element_Find(element, "panel-contacts"); 
 panel.innerHTML = "";
 panel.appendChild(table);
  
  
  
 // OUTCOMES
 var buttons  = UI_Element_Find(element, "panel-outcomes");

 if(mode == "operator")
 {
  if(options["outcome"])
  {
   for(var key in outcomes)
   {
    var outcome = outcomes[key];
    var button  = UI_Element_Create("marketing/lead-button-outcome");
    
    button.style.backgroundColor            = "var(--" + outcome["color"] + ")"; 
    if(outcome["text"]) button.style.color  = "var(--" + outcome["text"]  + ")";
    
    UI_Element_Find(button, "text").innerHTML = UI_Language_Object(outcome);
    Document_CSS_SetClass(UI_Element_Find(button, "icon"), "fa-" + outcome["icon"]);
    
    Document_Element_SetData(button, "outcome", key);
    Document_Element_SetObject(button, "lead", lead);
    button.onclick = Marketing_Call_SetOutcome;   

    buttons.appendChild(button);
   }
 
  }	   
 }
 else
 {
  buttons.style.display = "none";
 }
 
 container.innerHTML = "";
 container.appendChild(element);
}



function Marketing_Call_DisableButtons()
{
 // DISABLE ALL BUTTONS EXCEPT NEXT
 var panel   = UI_Element_Find("panel-outcomes");
 var buttons = Document_Element_FindChildren(panel, "outcome", undefined, ["recurse"]);
 for(var button of buttons) Document_Element_Disable(button, "style-disabled");
}



async function Marketing_Call_NewContact(lead_id, operator_id = null, outcome, date_call, date_recall, date_nouse, notes = "", duration = null, release = false)
{	
 var contact               = {};
 
 contact["user_id"]        = operator_id;
 contact["lead_id"]        = lead_id;
 contact["date_call"]      = date_call; 
 contact["date_recall"]    = date_recall;
 contact["notes"]          = notes;
 contact["duration"]       = duration;
 contact["outcome"]        = outcome;
 
 var id = await Core_Api("Marketing_Call_NewContact", {contact, release, date_nouse});
 
 console.log(contact);
 console.log(id);
 
 return id;
}








async function Marketing_Call_SetOutcome(event)
{
 var element   = event.srcElement;
 element       = Document_Element_FindParent(element, "outcome");
 
 var outcome   = Document_Element_GetData(element, "outcome", "");
 var lead      = Document_Element_GetObject(element, "lead", {});
 var popup     = false;
 
 var date_call = Date_Portion(lead["date_call"], "no-seconds");
 

 // CANCEL
 var button_cancel =
 { 
  text   : UI_Language_String("core/popups", "button cancel"), 
  onclick: "close" 
 }  
 
 
 // SOME DEFAULTS
 var notes    = ""; 
 var duration = Math.floor((new Date().getTime() - lead["time"]) / 1000);
 
 // COMPOSE POPUP
 var lead_id    = lead["id"];
 var recall     = false;
 
 switch(outcome)
 {	  
  // DENY
  case "no":
    var days    = parseInt(Core_Config(["marketing", outcome, "recall-default-time"], 365));

    var title   = "";
	var text    = UI_Language_String("marketing/popups", "newcontact no text", {days});
	var picture = Resources_URL("images/cover-alert.jpg");
	var confirm = await UI_Popup_Confirm(title, text, picture);
	
	if(!confirm) return;
	
	var date_recall = -1;
	var date_nouse  = Date_Add_Days(Date_Now(), 365 * 10);
	var release     = true;
	
	await Marketing_Call_NewContact(lead["id"], lead["operator_id"], outcome, date_call, date_recall, date_nouse, notes, duration, release);
	
	// NEXT LEAD
	await Marketing_Call_Next();
	await Marketing_Call();
  break;
  
  
  // NEXT
  case "next":
	var title   = "";
	var text    = UI_Language_String("marketing/popups", "newcontact next text");
	var confirm = await UI_Popup_Confirm(title, text);
	
	if(!confirm) return;
	

    var days        = parseInt(Core_Config(["marketing", outcome, "nouse-default-time"], 3));
	var date_nouse  = Date_Add_Days(Date_Now(), days);
	var date_recall = -1;
	var release     = true;  

	await Marketing_Call_NewContact(lead["id"], lead["operator_id"], outcome, date_call, date_recall, date_nouse, notes, duration, release);
	
	// NEXT LEAD
	await Marketing_Call_Next();
	await Marketing_Call();
  break;
  
  
  // RECALL
  case "rec":
    var minutes = Core_Config(["marketing", outcome, "recall-default-time"], 60);
	recall      = Date_Add_Minutes(Date_Now(), minutes);
	
	var title    = "";
	var subtitle = UI_Language_String("marketing/popups", "newcontact rec text");
	var picture  = Resources_URL("images/cover-stopwatch.jpg");
	
	var content = UI_Element_Create("marketing/popup-outcome-rec", {text}, {language:"marketing/popups"});
	
	UI_Element_Find(content, "date").value = Date_To_Input(Date_Now());
	UI_Element_Find(content, "time").value = Date_Portion(Date_Add_Minutes(Date_Now(), minutes), "time-timecode");
	
	// ON CONFIRM
    var button_confirm =
    {
     text    : UI_Language_String("marketing/popups", "newcontact outcome confirm"),
     onclick : 
	 async function()
	 {
	  await UI_Popup_Close(popup);
	  
	  var date        = Date_From_Input(UI_Element_Find(popup, "date").value);
	  var time        = Time_From_Input(UI_Element_Find(popup, "time").value);
	  var notes       = UI_Element_Find(popup, "notes").value;
	   
	  var date_recall = Date_Portion(date, "date-only") + "" + time;
	  var date_nouse  = 0;
	  var release     = false;
	 
	  await Marketing_Call_NewContact(lead["id"], lead["operator_id"], outcome, date_call, date_recall, date_nouse, notes, duration, release);
	
	  // NEXT LEAD
	  await Marketing_Call_Next();
	  await Marketing_Call();
	 }
    }
	
	popup = await UI_Popup_Create({content, picture, subtitle}, [button_cancel, button_confirm], undefined, {open:false, escape:true});
	await UI_Popup_Show(popup);
	
  break;
  
  
  // ENGAGED
  case "eng": 

	var title   = "";
	var text    = UI_Language_String("marketing/popups", "engaged contact text");
	var confirm = await UI_Popup_Confirm(title, text);
	
	if(!confirm) return;
  
     // RECORD OUTCOME
	 var date_nouse  = Date_Add_Days(Date_Now(), 365);
	 var date_recall = -1;
	 var release     = false;
	 
     Marketing_Call_DisableButtons();
	 var contact_id = await Marketing_Call_NewContact(lead["id"], lead["operator_id"], outcome, date_call, date_recall, date_nouse, "", duration, release);
     
	 // ADD TO CONTACT HISTORY AND AUTOSELECT
     if(!lead["contacts"]) lead["contacts"] = [];
	 lead["contacts"].push(
	 {
	  id:contact_id,
	  user_id:User_Id(),
	  lead_id:lead["id"],
	  date_call:Date_Portion(Date_Now(), "no-seconds"),
	  outcome,
	  duration
	 });
	 
	 // CONTACT HISTORY
	 var table       = Marketing_Call_DisplayContacts(lead);
	 var panel       = UI_Element_Find("panel-contacts"); 
	 panel.innerHTML = "";
	 panel.appendChild(table);
	 
	 var icon = UI_Element_Find(table, "case-" + contact_id);
	 Document_Event_Trigger(icon, "click");
  break;
 }

}






async function Marketing_Call_Next()
{
 var title = UI_Language_String("marketing/popups", "nextcontact title");
 var text  = UI_Language_String("marketing/popups", "nextcontact text");
 
 var popup = await UI_Popup_Intermission(title, text, false, 3, {autoclose:true, template:"flexi"});
}// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                        C A S E S                                               //
//                                                                                                //
// -----------------------------------------------------------------------------------------------//

async function Marketing_Cases(event)
{   
 var operator_id = User_Id();
 
 var config = await Core_Api("User_Config_Read", {file:"ce", section:"cases"}) || {};
 Core_State_Set("marketing", ["cases", "config"], config);
 
 var page = Core_State_Get("marketing", "submodule");  
 
 var element                  = UI_Element_Find(page, "date-from");
 var date_from                = Safe_Get(config, ["list-date-from"], false);
 if(!date_from) var date_from = Date_Add_Days(Date_Now(), -7);
 element.value                = Date_To_Input(date_from);
 element.onchange             = Marketing_Cases_UpdateList;
 
 
 var element                  = UI_Element_Find(page, "date-to");
 var date_to                  = Safe_Get(config, ["list-date-to"], false);
 if(!date_to) var date_to     = Date_Now();
 element.value                = Date_To_Input(date_to); 
 element.onchange             = Marketing_Cases_UpdateList;
 
 for(var date of ["lastweek", "yesterday", "today", "thisweek"])
 {
  var element = UI_Element_Find(page, "date-" + date);
  Document_Element_SetData(element, "range", date);
  
  element.onclick = 
  async function(event)
  {
   var element = event.srcElement;
   var range   = Document_Element_GetData(element, "range");
   
   switch(range)
   {
	case "lastweek":
		var range = Date_Range("last week");
	break;
	
	case "yesterday":
		var range = Date_Range("yesterday");
	break;
	
	case "today":
		var range = Date_Range("today");
	break;

	case "thisweek":
		var range = Date_Range("this week");
	break;
	
	default:
		var range = false;
	break;
   }
   
   if(range)
   {
	UI_Element_Find(page, "date-from").value = Date_To_Input(range["from"]);
	UI_Element_Find(page, "date-to").value   = Date_To_Input(range["to"]);
	
	console.log(range);
	await Marketing_Cases_UpdateList();
   }
  }
 }
 
 
 
 await Marketing_Cases_UpdateList();
}





async function Marketing_Cases_UpdateList(event)
{
 var page    = Core_State_Get("marketing", "submodule");  
 
 var date_from = Date_From_Input(UI_Element_Find(page, "date-from").value);
 var date_to   = Date_From_Input(UI_Element_Find(page, "date-to").value);
 
 var config    =  Core_State_Get("marketing", ["cases", "config"]);
 config["list-date-from"] = date_from;
 config["list-date-to"]   = date_to;
 
 Core_Api("User_Config_WriteSection", {file:"ce", section:"cases", data:config});


 switch(User_Config("marketing-cases"))
 {
  case "own":
	var operator_id = User_Id();
  break;
  
  case "all":
	var operator_id = undefined;
  break;
  
  default:
	var operator_id = User_Id();
  break;
 }
 
 var display = UI_Element_Find(page, "cases-list");
 await Marketing_Cases_Display(operator_id, date_from, date_to, display) 
}







async function Marketing_Cases_Display(operator_id, date_from, date_to, display)
{
 // FROM A FEW DAYS AGO
 var date_from = Date_Portion(date_from, "date-only") + "0000";
 
 // TO ALL OF TODAY
 var date_to = Date_Portion(date_to, "date-only") + "2359";
 
 // FETCH AND STRUCTURE APPOINTMENTS
 var list = await Core_Api("Marketing_Contacts_List", {operator_id, outcomes:["eng"], date_from, date_to, info:{leads:true}}); console.log(list);

 for(var item of list)
 {
  item["date_call"] = Date_Portion(item["date_call"], "date-only");
 }
 list      = Array_Catalog_ByField(list, "date_call");
 var dates = Object.keys(list);
 dates     = dates.reverse();


 display.innerHTML = ""; 
 for(var date of dates)
 {
  var items  = list[date];
  
  var text   = UI_Language_Date(date,"date-long-weekday-noyear");
  var header = UI_Element_Create("marketing/contact-cases-header", {text});
  display.appendChild(header);
  
  for(var item of items)
  {
   var card = await Marketing_Contact_Card(item);
   display.appendChild(card);
	  
   Document_Element_SetData(card, "contact_id", item["id"]);
	  
   card.onclick =   
   async function(event)
   {
	var element = event.srcElement;
	element     = Document_Element_FindParent(element, "contact_id");
	var id      = Document_Element_GetData(element, "contact_id"); 
	   
	await Marketing_Contacts_CasePopup(id);
	await Marketing_Cases_UpdateList();
   }
  }
 }
 
}




async function Marketing_Cases_DisplayCase(id)
{
}

// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                    C O N T A C T S                                             //
//                                                                                                //
// -----------------------------------------------------------------------------------------------//



async function Marketing_Contact_DisplayCase(id, options = {})
{
 Core_State_Set("marketing", "displaying-case", true);
 var customer_info = Safe_Get(options, "customer", false);  
 
 if(typeof(id) != "object")
 {
  var data = await Core_Api("Marketing_Contact_Read", {id, case:true}); 
 }
 console.log("case", data);
 
 var case_id = id;
 Core_State_Set("marketing", "display-contact-id", id);
 Core_State_Set("marketing", "display-contact-data", data);
 

 
 // MAIN FORM
 var panel  = UI_Element_Create("marketing/case-form", {}, {language:"marketing/case"});
 Document_Element_SetData(panel, "contact_id", id);


 // CUSTOMER INFO?
 if(customer_info)
 {
  UI_Element_Find(panel, "section-customer").style.display = "flex";
  
  var lead = data["lead"] || {};
  for(var field of ["student_id", "name", "phone_mobile", "email"])
  {
   UI_Element_Find(panel, field).value = lead[field];
  }
 }

 // DELETE CONTACT BUTTON
 if(User_Role() == "ceman")
 {
  var buttonDelete = UI_Element_Find(panel,"delete-button");
  buttonDelete.style.display = "inherit";
  buttonDelete.onclick = async (e) => {
    var id = Core_State_Get("marketing", "display-contact-id");
    await Marketing_Contacts_CaseDelete(id)
  }
 }
 
 
 // CENTER
 /*
 var select  = UI_Element_Find(panel, "center_id");
 Document_Select_AddOption(select, "", "");
 var centers = Centers_List();
 for(var id in centers)
 {
  Document_Select_AddOption(select, id, centers[id]["name"]);
 }
 select.value = data["center_id"];
 select.onchange = Call_SetField;
 */
 
 // ID
 var input      = UI_Element_Find(panel, "id");
 input.value    = data["id"];
 
 // PRODUCT
 var select      = UI_Element_Find(panel, "product");
 Marketing_Contact_SelectData(select, "product");
 select.onchange =
 async function(event)
 {   
  var element = event.srcElement;
  
  // PROGRAM
  var select  = UI_Element_Find(panel, "program");
  UI_Select_FromConfig(select, "programs-" + element.value, true);
  
  select.value = data["program"]; 
  
  select.onchange = Marketing_Contact_SetField;
  
  Marketing_Contact_SetField({srcElement:element});
 }
 select.value = data["product"]; 
 Document_Event_Trigger(select, "change");


 // COURSE
 var input = UI_Element_Find(panel, "course");
 input.value = data["course"];
 input.onchange = Marketing_Contact_SetField;
 
 
 // CALL TYPE
 var select = UI_Element_Find(panel, "call_type");
 Marketing_Contact_SelectData(select, "call_type");
  
 select.onchange =
 async function(event)
 { 
  var element = event.srcElement;
  var select  = UI_Element_Find(panel, "call_reason");
  
  var reasons   = Core_Data_Page("marketing/call_reason");
  
  select.innerHTML = "";
  for(var key in reasons)
  {
   if(reasons[key]["type"] == element.value)
   {
    var text = UI_Language_Object(reasons[key]);
    Document_Select_AddOption(select, text, key);
   }
  }

  select.value    = data["call_reason"];
  select.onchange = Marketing_Contact_SetField;
  
  Marketing_Contact_SetField({srcElement:element});
 }

 select.value = data["call_type"]; 
 Document_Event_Trigger(select, "change");



 // INQUIRY CATEGORY (DEPARTMENTS)
 var select = UI_Element_Find(panel, "inquiry_department");
 UI_Select_FromConfig(select, "departments", true);
 
 select.onchange =
 async function(event)
 { 
  var element = event.srcElement;
  var select  = UI_Element_Find(panel, "inquiry_topic");
  
  var inquiries   = Core_Data_Page("marketing/inquiry_topic");
  
  select.innerHTML = "";
  for(var key in inquiries)
  {
   if(inquiries[key]["department"] == element.value)
   {
    var text = UI_Language_Object(inquiries[key]);
    Document_Select_AddOption(select, text, key);
   }
  }

  select.value    = data["inquiry_topic"];
  select.onchange = Marketing_Contact_SetField;
  
  Marketing_Contact_SetField({srcElement:element});
 }
 select.value = data["inquiry_department"]; 
 Document_Event_Trigger(select, "change");

 

 // NOTES
 var select = UI_Element_Find(panel, "notes");
 Marketing_Contact_SelectData(select, "notes");
 select.value = data["notes"]; 
 select.onchange = Marketing_Contact_SetField;
 
	

 
 // SURVEY	
 var questions = Core_Data_Page("marketing/case-questions");
 var container = UI_Element_Find(panel, "panel-questions");
 
 for(var id in questions)
 {
  var question   = questions[id];
  question["id"] = id;
  
  var text       = UI_Language_Object(question);
  var element    = UI_Element_Create("marketing/case-question-item", {id, text});  
  var select     = UI_Element_Find(element, "answer");
  
  Document_Element_SetObject(select, "question", question);
  Document_Element_SetData(select, "case_id", case_id);
  Document_Select_AddOption(select, "", "");
  

  var scores = Core_Data_Page("marketing/case-question-" + question["type"]);
  for(var key in scores)
  {
   var text  = UI_Language_Object(scores[key]);
   var value = scores[key]["score"];
   
   Document_Select_AddOption(select, text, value);
  }
  
  select.value    = Safe_Get(data, ["survey", id, "answer"], "");
  select.onchange = Marketing_Contact_CaseAnswer; 
 
  container.appendChild(element);
 }
 
 
 
 // CASE	
 var container = UI_Element_Find(panel, "panel-case");
 Document_Element_SetData(container, "caseid", case_id);
 Core_State_Set("marketing", "display-contact-container", container);
 
 await Marketing_Contact_DisplayActions(container, data);

 
 UI_Element_Find(panel, "followup-item-add").onclick = Marketing_Contact_RecordAction;
 
 var icon     = UI_Element_Find(panel, "link-case");
 Document_Element_SetData(icon, "caseid", case_id);
 icon.onclick = Marketing_Contact_CopyLink;
 
 Core_State_Set("marketing", "displaying-case", false);
 return panel;
}



async function Marketing_Contact_CopyLink(event)
{ 
 var element       = event.srcElement;
 var url           = Client_Location_Current() + "?autologin=1&framework=null&module=embed&page=casefollowup";
 
 var case_id       = Document_Element_GetData(element, "caseid", false);
 if(case_id) url   = url + "&case_id=" + case_id;
  
 var action_id    = Document_Element_GetData(element, "actionid", false);
 if(action_id) url = url + "&action_id=" + action_id;
  
 navigator.clipboard.writeText(url);
 var title = UI_Language_String("marketing/popups", "link copied title");
 await UI_Popup_Intermission(title, undefined, undefined, 1, {autoclose:true});
  
 return url;
}
  



async function Marketing_Contact_DisplayActions(container, data)
{ 
 container.innerHTML = "";
 var case_id = Document_Element_GetData(container, "caseid");
 
 var actions = Safe_Get(data, ["actions"], []);
 for(var item of actions)
 {  
  var element                                   = UI_Element_Create("marketing/case-action-item", {});  
  UI_Element_Find(element, "date").innerHTML    = UI_Language_Date(item["date"], "date-short");
  UI_Element_Find(element, "time").innerHTML    = UI_Language_Date(item["date"], "time-only");
  UI_Element_Find(element, "user").innerHTML    = item["user"];
  UI_Element_Find(element, "dept").innerHTML    = "(" + UI_Language_String("marketing/inquiry_department", item["department"]) + ")"; 
  UI_Element_Find(element, "action").value      = item["action"];
  
  var outcome                   = UI_Element_Find(element, "outcome");
  outcome.innerHTML             = UI_Language_String("marketing/case-outcomes", item["outcome"]); 
  outcome.style.backgroundColor = Document_CSS_Get(Core_Data_Value("marketing/case-outcomes", item["outcome"], "color", "transparent"));
 
  var icon = UI_Element_Find(element, "delete");
  Document_Element_SetData(icon, "actionid", item["id"]);
  icon.onclick = Marketing_Contact_DeleteAction;  
  
  var icon     = UI_Element_Find(element,    "link");
  Document_Element_SetData(icon, "caseid",   case_id);
  Document_Element_SetData(icon, "actionid", item["id"]);
  icon.onclick = Marketing_Contact_CopyLink;
  
  Document_Element_SetData(element, "actionid", item["id"]);
 
  container.appendChild(element);
 }

}



async function Marketing_Contact_RecordAction(event)
{
 var id      = Core_State_Get("marketing", "display-contact-id");
 var data    = Core_State_Get("marketing", "display-contact-data", {});
	
 var content = UI_Element_Create("marketing/popup-case-addaction", {}, {language:"marketing/case"});
 var title   = UI_Language_String("marketing/case", "popup addaction title");
 var button  = 
 {
  text    : UI_Language_String("marketing/case", "popup addaction record"),
  onclick : 
  async function()
  {
   // RECORD ACTION
   var user       = UI_Element_Find(popup, "user").value;
   var department = UI_Element_Find(popup, "department").value;
   var action     = UI_Element_Find(popup, "action").value;
   var outcome    = UI_Element_Find(popup, "outcome").value;
   
   var action_id  = await Core_Api("Marketing_Contact_RecordAction", {id, user, department, action, outcome});
   
   
   // SEND EMAIL
   var data = Core_State_Get("marketing", "display-contact-data", {});
   var info = [];
   info.push(Safe_Get(data, ["lead", "student_id"], ""));
   info.push(Safe_Get(data, ["lead", "name"], ""));
   info.push(Safe_Get(data, ["center"], ""));
   info = info.join(" ");
   console.log(info);
	  
   var ceNotify = Core_Config(["centers",Safe_Get(data, ["center"], ""),"ce-notify"]);

   //var to       = "thanhtran@ilavietnam.edu.vn"; 
   var to       = ceNotify; 
   var from     = Module_Config("marketing", "mailer-name") + ";" + Module_Config("marketing", "mailer-email");
   var subject  = String_Variables_Set(Module_Config("marketing", "case-notify-subject"), {info});
   var template = Module_Config("marketing", "case-notify-template");
   var data     = {};
   data["url"]  = Client_Location_Current() + "?autologin=1&framework=null&module=embed&page=casefollowup&case_id=" + id + "&action_id=" + action_id;
   
   var mailsent = await Core_Service("sendmail", {from, to, subject, template, data});
   console.log(mailsent);
   
   
   


   // RELOAD CONTACT 
   var container = Core_State_Get("marketing", "display-contact-container");
   var data      = await Core_Api("Marketing_Contact_Read", {id, case:true}); 
   await Marketing_Contact_DisplayActions(container, data);
     
   // CLOSE
   await UI_Popup_Close(popup);
   
   Core_State_Set("marketing",["follow-up","action-default"],false);
   
   // FIND THE NEW ITEM AND FLASH IT
   var element = Document_Element_FindChild(container, "actionid", action_id, ["recurse"]);
   Document_Element_Animate(element, "flash 1s 3");
  }
 }

 var escape = () => {
	var action = UI_Element_Find(popup, "action").value;
	Core_State_Set("marketing",["follow-up","action-default"],action);
	UI_Popup_Close(popup);
 }

 popup = await UI_Popup_Create({content, title}, [button], "flexi", {open:false, escape});
 
 // DEFAULT USERNAME
 var user = await User_Read(true);
 var name = [user["firstname"], user["lastname"]].join();
 UI_Element_Find(popup, "user").value = name;
 
 // DEPARTMENT BY ROLE
 var department = User_Config("department");
 UI_Element_Find(popup, "department").value = department;
 
 // DEPARTMENT SELECT
 var select   = UI_Element_Find(popup, "department");
 Document_Select_AddOption(select, "", "");
 UI_Select_FromConfig(select, "departments", true);
 
 // ACTION 
 var action = UI_Element_Find(popup,"action");
 var actionValue = Core_State_Get("marketing",["follow-up","action-default"],false);
 if(actionValue) action.value = actionValue;
 
 // OUTCOME SELECT
 var select   = UI_Element_Find(popup, "outcome");
 UI_Select_FromDatapage(select, "marketing/case-outcomes");

 await UI_Popup_Show(popup);
}






async function Marketing_Contact_DeleteAction(event)
{
 var element = event.srcElement;
 var id      = Document_Element_GetData(element, "actionid");
 var caseid  = Core_State_Get("marketing", "display-contact-id");
	
 var title   = UI_Language_String("marketing/case", "popup deleteaction title");
 var text    = UI_Language_String("marketing/case", "popup deleteaction text");
 var confirm = await UI_Popup_Confirm(title, text);
 
 if(!confirm) return;
 
 // DELETE
 await Core_Api("Marketing_Contact_DeleteAction", {id});
 
 // RELOAD CONTACT 
 var container = Core_State_Get("marketing", "display-contact-container");
 var data      = await Core_Api("Marketing_Contact_Read", {id:caseid, case:true}); 
 await Marketing_Contact_DisplayActions(container, data);
}








function Marketing_Contact_SelectData(select, page)
{ 
 select.innerHTML = "";
 
 var items = Core_Data_Page("marketing/" + page);
 var keys  = Object.keys(items);
   
 if(keys.length > 0)
 {
  Document_Select_AddOption(select, "", "");
	
  for(var key of keys)
  {
   var text = UI_Language_Object(items[key]);
   Document_Select_AddOption(select, text, key);
  }
 }
}




async function Marketing_Contact_Card(contact)
{
 var element = UI_Element_Create("marketing/contact-case-card", contact, {language:"marketing/case"});
 
 for(var field of ["name", "student_id"])
 {
  var input   = UI_Element_Find(element, field);
  input.value = Safe_Get(contact, ["lead", field], "");
 }
 
 
 for(var field of ["notes"])
 {
  var input   = UI_Element_Find(element, field);
  input.value = contact[field] || "";
 }
  
  
 for(var field of ["call_type", "call_reason", "inquiry_topic"])
 {
  var data    = Core_Data_Page("marketing/" + field);
  var item    = data[contact[field]] || {};
  
  var input   = UI_Element_Find(element, field);
  input.value = UI_Language_Object(item);
 }

 var data = Core_Config("departments");
 var item = data[contact["inquiry_department"]] || {};
 
 var input = UI_Element_Find(element, "inquiry_department");
 input.value = UI_Language_Object(item);
 
 return element;
}



async function Marketing_Contact_SetField(event)
{
 // DO NOT STORE DATA IF DISPLAYING CASE (NOT TRIGGERED BY USER)
 if(Core_State_Get("marketing", "displaying-case")) return;
	
	
 var element   = event.srcElement;
 var field     = Document_Element_GetData(element, "uid");
 
 var parent    = Document_Element_FindParent(element, "contact_id");
 var id        = Document_Element_GetData(parent, "contact_id");
 
 await Core_Api("Marketing_Contact_Set", {id, field, value:element.value});
}



async function Marketing_Contact_CaseAnswer(event)
{
 var element    = event.srcElement;
 var data       = Document_Element_GetObject(element, "question");
 
 var parent     = Document_Element_FindParent(element, "contact_id");
 var contact_id = Document_Element_GetData(parent, "contact_id");
 
 var question   = data["id"];
 var department = data["dept"];
 var answer     = element.value;
   
 await Core_Api("Marketing_Survey_Set", {contact_id, question, department, answer});
}



async function Marketing_Contacts_CasePopup(id)
{
 var promise = new Promise(async(resolve, reject) =>
 {
  var display = await Marketing_Contact_DisplayCase(id);
 
  var content = UI_Element_Create("marketing/popup-case");
  content.appendChild(display);
  
  var onclose = 
  async function()
  {
   resolve();
  }
 
  var popup = await UI_Popup_Create({content}, [], "flexi", {open:false, escape:true, onclose});
  await UI_Popup_Show(popup);

  Core_State_Set("marketing","display-contact-popup",popup);
 });

 return promise; 
}


async function Marketing_Contacts_CaseDelete(id) {
  var confirm = await UI_Popup_Confirm(false, UI_Language_String("marketing/popups","confirm message delete"), "resources/images/cover-alert.jpg");
  if(!confirm) return;
 
  // DELETE
  await Core_Api("Marketing_Contact_Delete", {id});
  
  // RELOAD CONTACT 
  var module = Core_State_Get("marketing","page");
  switch (module) {
    case "call":
      var page  = Core_State_Get("marketing", "submodule"); 
      var container = UI_Element_Find(page, "panel-call");
      var lead_id = parseInt(Core_State_Get("marketing",["display-contact-data","lead_id"],false));
      if(lead_id)
      {
        var operator_id = User_Id();
        await Core_Api("Marketing_Call_AssignLead",{operator_id, lead_id})
        Marketing_Call_DisplayLead(-1, container, {data:true, history:true, outcome:true});
        UI_Element_Find(page,"more-content").innerHTML = "";
      } 

      break;
    case "cases":
      var popup = Core_State_Get("marketing","display-contact-popup",popup);
      UI_Popup_Close(popup);

      Marketing_Cases();
      break;
  }
}// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                       C R E A T E                                              //
//                                                                                                //
// -----------------------------------------------------------------------------------------------//

async function Marketing_Create(event)
{   	
 // CREATION POPUP
 var title       = UI_Language_String("marketing/popups", "create lead title");
 var placeholder = UI_Language_String("marketing/popups", "create lead id");
 var student_id  = await UI_Popup_Input(title, false, false, placeholder);
 
 if(!student_id) return;
 
 // CHECK IF EXISTS
 var lead_id = await Core_Api("Marketing_Lead_Exists", {student_id});
 
 // IF IT DOESN'T, OFFER TO CREATE IT
 if(lead_id)
 {
  var title = UI_Language_String("marketing/popups", "create lead title");
  var text  = UI_Language_String("marketing/popups", "create lead exists", {id:student_id});
  var popup = await UI_Popup_Intermission(title, text, false, 3, {autoclose:true, template:"flexi"});
 }
 else
 {  
  var title   = UI_Language_String("marketing/popups", "create lead title");
  var text    = UI_Language_String("marketing/popups", "create lead confirm", {id:student_id});
  var picture = Resources_URL("images/cover-alert.jpg");
  var confirm = await UI_Popup_Confirm(title, text, picture);
  
  if(!confirm) return;
  
  var lead_id = await Core_Api("Marketing_Lead_New", {student_id});
 }
 
 // ASSIGN LEAD
 var operator_id = User_Id();
 await Core_Api("Marketing_Call_AssignLead", {operator_id, lead_id});
 
 // RETURN TO CALL
 if(Core_State_Get(module, ["page"]) == "call") 
 {
  await Marketing_Call(); 
 }
 else 
 {
  await Module_Page_Set("call");
 }
}



// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                      D A T A B A S E                                           //
//                                                                                                //
// -----------------------------------------------------------------------------------------------//

async function Marketing_Database(event)
{ 
 // SET UP CONTROLS
 var page = Core_State_Get("marketing", "submodule");
 
 UI_Element_Find(page, "panel-lists-title").innerHTML = UI_Language_String("marketing/database", "panel lists title");
 
 UI_Element_Find(page, "list-menu-upload").onclick   = Marketing_Database_UploadLeads;
 UI_Element_Find(page, "list-menu-move").onclick     = Marketing_Database_MoveLeads;
 UI_Element_Find(page, "list-menu-delete").onclick   = Marketing_Database_DeleteList;
 UI_Element_Find(page, "list-menu-rename").onclick   = Marketing_Database_RenameList;
 UI_Element_Find(page, "list-menu-cleanup").onclick  = Marketing_Database_CleanList;

  
 
 // LISTS MENU
 var menu = UI_Menu_Create("lists", 
 {
  new:
  {
   text  : UI_Language_String("marketing/menus", "lists new"),
   state : "enabled",  
   icon  : "list-alt",
   func  : Marketing_Database_NewList
  },
  
  reload:
  {
   text  : UI_Language_String("marketing/menus", "lists reload"),
   state : "enabled",  
   icon  : "sync-alt",
   func  : Marketing_Database_UpdateLists
  }
 });
 
 
 var container = UI_Element_Find(page, "panel-lists");
 UI_Menu_Assign(container, menu);
 
 
 
 // LIST HEADER (LEADS, STATS ETC.)
 var items = {};

 var item        = {};
 item["icons"]   = [];
 item["text"]    = UI_Language_String("marketing/database", "list menu leads");
 item["onclick"] = Marketing_Database_ListLeads;  
 items["leads"]  = item;
 
  var item       = {};
 item["icons"]   = [];
 item["text"]    = UI_Language_String("marketing/database", "list menu stats");
 item["onclick"] = Marketing_Database_ListStats;  
 items["stats"]  = item;
 
 var header = UI_Header("list-menu", items, {selectfirst:false, css:"color-noted"});  
 UI_Element_Find(page, "panel-list-menu").appendChild(header);
 
 Core_State_Set("marketing", ["database", "list-header"], header);
 

 
 await Marketing_Database_UpdateLists();
}







// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                         L I S T S                                              //
//                                                                                                //
// -----------------------------------------------------------------------------------------------//


function Marketing_Database_ListName(id)
{
 var lists = Core_State_Get("marketing", "lists", {});
 var lists = Array_Organize_ByField(lists, "id");
 var name  = Safe_Get(lists, [id ,"name"], id);
 
 return name;
}




async function Marketing_Database_UpdateLists()
{
 await Marketing_Database_ReadLists();
 await Marketing_Database_DisplayLists();
}



async function Marketing_Database_NewList(event)
{
 var popup = false;

 // CREATE DIALOG
 var content = UI_Element_Create("marketing/popup-newlist", {}, {language:"marketing/popups"});

 // CREATE NEW
 var button_create =
 {
  text   : UI_Language_String("marketing/popups", "newlist button create"), 
  onclick: 
  async function()
  {
   var name      = UI_Element_Find(popup, "name").value;
   var id        = await Core_Api("Marketing_Lists_New", {name});
   Core_State_Set("marketing", ["database", "new-list"], id);
   
   UI_Popup_Close(popup);
  }
 }


 // CANCEL
 var button_cancel =
 { 
  text   : UI_Language_String("core/popups", "button cancel"), 
  onclick: "close" 
 } 
 
 
 // ON CLOSE POPUP
 var onclose = 
 async function()
 {
  var id = Core_State_Get("marketing", ["database", "new-list"], false); console.log(id);
  if(id)
  {
   // RELOAD LISTS
   await Marketing_Database_UpdateLists();
 
   // FIND AND SELECT NEWLY CREATED LIST
   Marketing_Database_SelectList(id);
  
   Core_State_Set("marketing", ["database", "new-list"], false);
  }
 }


 // CREATE POPUP
 var title = UI_Language_String("marketing/popups", "newlist title");
 var text  = UI_Language_String("marketing/popups", "newlist text");
 popup     = await UI_Popup_Create({content, title, text}, [button_create, button_cancel], "flexi", {open:false, escape:true, onclose}); 
 
 
 
 // OPEN POPUP
 Core_State_Set("marketing", ["database", "new-list"], false);
 await UI_Popup_Show(popup);
}





async function Marketing_Database_ReadLists()
{
 var lists   = await Core_Api("Marketing_Lists_List", {});
 
 Core_State_Set("marketing", "lists", lists);
}



async function Marketing_Database_ListSelect(element)
{
 var item = Document_Element_GetObject(element, "item");
 Core_State_Set("marketing", ["database", "selected-list"], item);
  
 UI_Element_Find("list-name").innerHTML              = UI_Language_String("marketing/database", "list title", {name:item["name"]});
 UI_Element_Find("panel-list-display").innerHTML     = "";
 UI_Element_Find("panel-list-actions").style.display = "none";
 
 UI_Element_Find("panel-list").style.visibility = "visible";
 
 var header = Core_State_Get("marketing", ["database", "list-header"]);
 
 
 var view = Core_State_Get("marketing", ["database", "list-view"], "leads");
 if(view) 
 {
  UI_Header_Set(header, view, true);
 }
}



async function Marketing_Database_ListLeads()
{
 Core_State_Set("marketing", ["database", "list-view"], "leads");
 
 UI_Element_Find("panel-list-actions").style.display = "flex";
 
 // CREATE LEADS TABLE 
 var pagerows  = Module_Config("users", "page"); 
 
 var display  = Database_View_Create("Marketing_Leads_ByList", pagerows, 
 {
  student_id  :true,
  name        :true,
  phone_mobile:true,
  email       :true
 }, 
 "marketing/lead-fields", false, false, {export_fields:"student_id,phone_mobile,email,name", operations:{}});
 
 // Change order from name to id
 // await Database_View_Query(display,
 // {		
  // fields : "student_id,phone_mobile,email,name",
  // list_id: Core_State_Get("marketing", ["database", "selected-list", "id"], -1),
  // order  : "name",
 // }); 

 await Database_View_Query(display,
 {		
  fields : "student_id,phone_mobile,email,name",
  list_id: Core_State_Get("marketing", ["database", "selected-list", "id"], -1),
  order  : "order_id",
 }); 


 var panel       = UI_Element_Find("panel-list-display");
 panel.innerHTML = "";
 panel.appendChild(display);
}





async function Marketing_Database_ListStats()
{
 Core_State_Set("marketing", ["database", "list-view"], "stats");
 
 UI_Element_Find("panel-list-actions").style.display = "none";
 
 var id   = Core_State_Get("marketing", ["database", "selected-list", "id"], -1)
 var stats = await Core_Api("Marketing_List_Stats", {id, outcomes:["eng","no","rec"]});
 
 
 // CHART: LIST USAGE
 var unused = stats["total"] - stats["used"];
 var data   = 
 [
  {color:Document_CSS_GetVariable("color-light"), name:UI_Language_String("marketing/database", "chart legend unused"), value:unused}, 
  {color:Document_CSS_GetVariable("color-dark"),   name:UI_Language_String("marketing/database", "chart legend used"),   value:stats["used"]}
 ];
 var chart_usage = UI_Chart_DoughnutLegend(data, 0.67, {width:"100%", height:"100%", zIndex:100, values:"left"});  
 
 
 // CHART: LIST OUTCOMES
 var outcomes       = Core_Data_Page("marketing/outcomes");
 var data           = Object_Subset(stats, ["eng", "rec", "no"]); 
 var chart_outcomes = UI_Chart_DoughnutLegend(data,  0.67, {width:"100%", height:"100%", zIndex:100, values:"left"}, outcomes);
 
 
 var panel       = UI_Element_Find("panel-list-display");
 panel.innerHTML = "";
 panel.appendChild(chart_usage);
 panel.appendChild(chart_outcomes);

 //panel.appendChild(display);
}




async function Marketing_Database_DisplayLists(lists)
{
 var page = Core_State_Get("marketing", "submodule");
 if(!lists) var lists = Core_State_Get("marketing", "lists", []);


 // ASSEMBLE DISPLAY
 var display = UI_List_Items(lists, ["style-outlined-accented", "outline-inner"], Marketing_Database_ListSelect, {style:"vertical", overflow:true},
 
 // ITEMS
 function(item)
 {    
  var element = UI_Element_Create("marketing/database-list-card", item, {language:"marketing/elements"});  
  Document_Element_SetObject(element, "item", item);
  Document_Element_SetData(element, "list_id", item["id"]);
  
  return element; 
 });
 
 
 var container       = UI_Element_Find(page, "panel-lists");
 container.innerHTML = "";
 container.appendChild(display);
}




async function Marketing_Database_SelectList(id)
{
 var container = UI_Element_Find("panel-lists");
 
 var element   = Document_Element_FindChild(container, "list_id", id, ["recurse"]); 
 if(element) 
 {	  
  element.scrollIntoView({behavior: "smooth", block: "center"});
  Document_Event_Trigger(element, "click");
 } 
}








// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                             S I D E   M E N U   F U N C T I O N S                              //
//                                                                                                //
// -----------------------------------------------------------------------------------------------//



async function Marketing_Database_DeleteList()
{
 var list = Core_State_Get("marketing", ["database", "selected-list"], false);
 if(!list) return;
 
 
 var title   = UI_Language_String("marketing/popups", "deletelist title");
 var content = UI_Language_String("marketing/popups", "deletelist confirm", list); 
 var picture = Resources_URL("images/cover-alert.jpg");  
 var confirm = await UI_Popup_Confirm(title, content, picture);
 if(!confirm) return;
 
 
 var result = await Core_Api("Marketing_List_Delete", {id:list["id"], emptyonly:true});
 
 if(result == "notempty")
 {
  var title   = UI_Language_String("marketing/popups", "deletelist title");
  var content = UI_Language_String("marketing/popups", "deletelist cant"); 
  var picture = Resources_URL("images/cover-deny.png");  

  await UI_Popup_Alert(title, content, picture);
  return;
 }
 
 
 var title   = UI_Language_String("marketing/popups", "deletelist title");
 var content = UI_Language_String("marketing/popups", "deletelist done", list); 
 await UI_Popup_Alert(title, content);
 
 await Marketing_Database_UpdateLists();
}




async function Marketing_Database_RenameList()
{
 var list = Core_State_Get("marketing", ["database", "selected-list"], false);
 if(!list) return;
 
 
 var title   = UI_Language_String("marketing/popups", "renamelist title");
 var picture = Resources_URL("images/cover-write.png");  
 var newname = await UI_Popup_Input(title, false, picture, list["name"]);
 if(!newname) return;
 
 var result = await Core_Api("Marketing_List_Rename", {id:list["id"], name:newname});
 
 switch(result)
 {
  case "ok":
  break;
  
  case "exists":
	var title   = UI_Language_String("marketing/popups", "renamelist title");
    var content = UI_Language_String("marketing/popups", "renamelist exists", list); 
    var picture = Resources_URL("images/cover-deny.png");  
 
	await UI_Popup_Alert(title, content, picture);
	return;
  break;
 }
 
 await Marketing_Database_UpdateLists();
}











async function Marketing_Database_CleanList()
{
 var list = Core_State_Get("marketing", ["database", "selected-list"], false);
 if(!list) return;
 
 
 var title   = UI_Language_String("marketing/popups", "cleanlist title");
 var content = UI_Language_String("marketing/popups", "cleanlist text", list); 
 var picture = Resources_URL("images/cover-alert.jpg");  
 var confirm = await UI_Popup_Confirm(title, content, picture);
 if(!confirm) return;
 
 await Core_Api("Marketing_Leads_Reset", {list_id:list["id"], criteria:"all"});
}




async function Marketing_Database_MoveLeads()
{
 var list = Core_State_Get("marketing", ["database", "selected-list"], false);
 if(!list) return;
 
 var popup = false;
 
 // POPUP CONTENT
 var content = UI_Element_Create("marketing/popup-moveleads", list, {language:"marketing/popups"});
 var select  = UI_Element_Find(content, "list");
 
 // SHOW LISTS IN SELECT
 var lists = Core_State_Get("marketing", "lists", []);
 Marketing_Lists_ToSelect(lists, select, {selected:list["id"], sections:true});

 
 
 // POPUP BUTTONS
 
 // CANCEL
 var button_cancel =
 { 
  text   : UI_Language_String("core/popups", "button cancel"), 
  onclick: "close" 
 } 
 
 
 // MOVE
 var button_move =
 { 
  text   : UI_Language_String("marketing/popups", "moveleads move"), 
  onclick: 
  async function()
  {
   var list_from = list["id"];
   var list_to   = UI_Element_Find(popup, "list").value;
   var amount    = UI_Element_Find(popup, "amount").value;
   var virgin    = UI_Element_Find(popup, "virgin").checked;

   var title   = UI_Language_String("marketing/popups", "moveleads title");
   var content = UI_Language_String("marketing/popups", "moveleads confirm", {from:Marketing_Database_ListName(list_from), to:Marketing_Database_ListName(list_to), amount}); 
   var picture = Resources_URL("images/cover-alert.jpg");  
   var confirm = await UI_Popup_Confirm(title, content, picture);
   if(!confirm) return;

   await Core_Api("Marketing_List_MoveLeads", {list_from, list_to, amount, virgin});   
   
   await UI_Popup_Close(popup);
   await Marketing_Database_UpdateLists();
  }
 } 
 
 
 
 // CREATE POPUP
 var title = UI_Language_String("marketing/popups", "moveleads title");
 popup     = await UI_Popup_Create({content, title}, [button_move, button_cancel], "flexi", {open:false, escape:true, onclose}); 
 
 
 // OPEN POPUP
 await UI_Popup_Show(popup);
}



async function Marketing_Database_UploadLeads()
{
 var fields    = ["student_id", "name", "center", "course", "phone_mobile", "email", "province", "city", "notes"];
 var popup     = false;
 var content   = false;
 var lines     = [];
 
 var firstrow  = "";
 var separator = "";
 
 
 // READ USER'S LAST LEAD UPLOAD SETTINGS
 var value = await Core_Api("User_Config_Read", {file:"marketing", section:"database", field:"upload-leads-assign"});
 assign    = Object_From_String(value);

 

 // READ CSV FILE
 var files = await Storage_File_Select({accept:".csv, .txt"});
 if(!files || files.length == 0) return;
 
 var data  = await Storage_File_ReadText(files[0]);
 
 var deletedFR = false;
 
 // FUNCTION UPDATE
 var update =
 function()
 {
  // SETUP
  separator = UI_Element_Find(popup, "select-separator").value; 
  firstrow  = UI_Element_Find(popup, "select-firstrow").value; 
  
  // DECODE
  var text  = data; //atob(data);
  lines     = Array_From_String(text, "\r\n");
  
  if(firstrow == "fields" && lines.length > 0)
  {
   deletedFR = true;
   Array_Element_DeleteAt(lines, 0);
  }
  
  for(var i in lines) lines[i] = lines[i].split(separator);
  
  
  // PURGE DELIMITERS
  for(var i in lines)
  {
   var tokens = lines[i];
   
   for(var t in tokens)
   {
	var token = tokens[t];
	
	if((token[0] == "'" && token[token.length -1] == "'") || (token[0] == '"' && token[token.length -1] == '"'))
	{
     tokens[t] = token.substr(1, token.length-2)
	}
   }
  }
   

  // UPDATE FIELDS SELECTORS
  for(var field of fields)
  {
   var select = Document_Element_FindChild(popup, "assign", field, ["recurse"]);
  
   if(select)
   {
	select.innerHTML = "";
	
	Document_Select_AddOption(select, "", "");
	
    if(lines.length > 0)
	{
     for(var i in lines[0])
	 {
	  var value = lines[0][i];
	  Document_Select_AddOption(select, value, i);
	 }
	}
	
	if(assign[field] !== undefined) select.value = assign[field];

    select.onchange =   
    async function(event)
	{
     var select    = event.srcElement;
	 var field     = Document_Element_GetData(select, "assign");
	 assign[field] = select.value;
	 
	 var value = Object_To_String(assign);   
	 await Core_Api("User_Config_WriteValue", {file:"marketing", section:"database", field:"upload-leads-assign", value});
	}		
   }
  }

  if(!deletedFR)
  Array_Element_DeleteAt(lines, 0);

  // DISPLAY SAMPLE
  var container       = UI_Element_Find(popup, "sample");
 
  var table = UI_Table("data");
  var n     = lines.length;
  if(n > 10) n = 10;
  
  var k = lines[0].length;
  for(var i = 0; i<n; i++)
  {
   var row  = UI_Table_Row(table);
   for(var j=0; j<k; j++)
   {
	var cell = UI_Table_Cell(row);
    cell.innerHTML = lines[i][j];
	
	Document_CSS_SetClass(cell, "table-borders-gray");
   }
  }
  
  container.innerHTML = "";
  container.appendChild(table);  
 }
 
 
 
 // FUNCTION UPLOAD
 var upload = 
 async function()
 {
  // DETERMINE LIST
  var lists    = Array_Organize_ByField(Core_State_Get("marketing", "lists"), "id");
  var list_id  = Core_State_Get("marketing", ["database", "selected-list", "id"], -1);
  var list     = lists[list_id];
  
  // OTHER UPLOAD PARAMETERS
  var leads    = lines.filter(lead => { if(lead.join("").length > 0) return true; else return false });
  var code     = UI_Element_Find(popup, "input-tag").value;
  

  // CONFIRMATION POPUP 
  var title    = UI_Language_String("marketing/popups", "upload confirm title"); 
  var content  = UI_Language_String("marketing/popups", "upload confirm text", {count:leads.length, name:list["name"], code}); 
  var picture  = Resources_URL("images/cover-alert.jpg");

  var confirm  = await UI_Popup_Confirm(title, content, picture);
	 
  if(confirm)
  {
   // WAIT POPUP
   var title   = UI_Language_String("marketing/popups", "upload wait title"); 
   var content = UI_Language_String("marketing/popups", "upload wait text"); 
   var wait    = await UI_Popup_Create({title, content}, [], "standard", {open:true, escape:false});
   

   // UPLOAD
   await Core_Api("Marketing_Leads_Upload", {list_id, code, leads, assign});
   
   // CLOSE POPUPS
   await UI_Popup_Close(wait);
   await UI_Popup_Close(popup);
   
   // RELOAD LISTS AND RESELECT THE CURRENT ONE
   await Marketing_Database_UpdateLists();
   await Marketing_Database_SelectList(list_id);
  } 
 }

 
 
 
 // POPUP CONTENT
 content = UI_Element_Create("marketing/popup-upload", {}, {language:"marketing/popups"});
 
 // FIELDS ASSIGNMENT
 var container = UI_Element_Find(content, "fields-assign");
 for(var field of fields)
 {
  var element = UI_Element_Create("marketing/popup-upload-selectfield", {field}, {language:"marketing/popups"});
  UI_Element_Find(element, "caption").innerHTML = UI_Language_String("marketing/popups", "upload field " + field);
  
  var select = UI_Element_Find(element, "select");
  Document_Element_SetData(select, "assign", field);
  
  container.appendChild(element);
 }
 
 
 
 // CREATE AND OPEN POPUP
 var button_upload =
 { 
  text   : UI_Language_String("marketing/popups", "upload button upload"), 
  onclick: upload 
 }
 
 var button_cancel =
 { 
  text   : UI_Language_String("core/popups", "button cancel"), 
  onclick: "close" 
 }
 
 popup = await UI_Popup_Create({content}, [button_upload, button_cancel], "flexi", {open:false, escape:true});
 
 UI_Element_Find(popup, "select-separator").onchange = update; 
 UI_Element_Find(popup, "select-firstrow").onchange  = update;

 update();
 await UI_Popup_Show(popup);
}// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                      L E A D S                                                 //
//                                                                                                //
// -----------------------------------------------------------------------------------------------//



async function Marketing_Leads_Create(phone, studentid)
{
 var title   = UI_Language_String("marketing/call", "search popup title");
 var text    = UI_Language_String("marketing/call", "search popup newlead");
 var confirm = await UI_Popup_Confirm(title, text);
   
 if(!confirm) return;
   
 var title   = UI_Language_String("marketing/call", "search popup list");
 var list_id = await UI_Popup_Select(title, false, false, 
 async function(select)
 {
  var user  = await Core_Api("User_Read", {user_id:operator_id, options:{fields:"marketing_list"}});
  var list  = user["marketing_list"];
  var lists = await Core_Api("Marketing_Lists_List", {}); 
  await Marketing_Lists_ToSelect(lists, select, {selected:list, sections:true});
 });
   
 if(!list_id) return;
  
 if(Module_Page_Get() != "call") await Module_Page_Set("call");
  
 await Core_Api("Marketing_Lead_New", {phone, list_id, operator_id}); 
 await Marketing_Call_Next();
 await Marketing_Call();
}






function Marketing_Leads_FieldType(string)
{
 // PHONE?
 if(String_Is_Number(string) && (string.length >=9))
 {
  return "phone";
 }

 // EMAIL?   
 if(string.includes("@"))
 {
  return "email";
 }

 // CODE?
 var parts = string.split("-");
 if((parts.length == 2) && (String_Is_Number(parts[1])))
 {
  return "code";
 }

 // TEXT (NAME OR NOTES)
 return "text";
}




async function Marketing_Leads_SearchPopup(fields = "student_id,name", count = 100, order = "id")
{
 var promise = new Promise((resolve, reject) =>
 {
  var title   = UI_Language_String("marketing/popups", "search lead title");
  var text    = UI_Language_String("marketing/popups", "search lead button");
  
  var content = UI_Element_Create("marketing/popup-select-search", {}, {language:"marketing/popups"});
  var table   = false;
  
  // DEBOUNCEABLE SEARCH FUNCTION
  var update_timeout = false;
  
  function update()
  {
   if(update_timeout) clearTimeout(update_timeout);
   
   update_timeout = setTimeout(
   async function()
   {
	var search =
	{
	 fields,
	 count,
	 order
	}
	
	// GET OTHER SEARCH VALUES FROM THE POPUP
	for(var field of ["name", "email", "phone_mobile", "student_id"]) search[field] = UI_Element_Find(content, field).value;	

    var users       = await Core_Api("Marketing_Leads_Search", {search});
	
	var tablefields = {};
	for(var field of fields.split(",")) tablefields[field] = true;
	table     = UI_Table_Data(users, tablefields, "users/table-fields");
	
    var display = UI_Element_Find(content, "users");
	display.innerHTML = "";
	display.appendChild(table);
  
	update_timeout = false;
   }, 1000);
  }
  
 
  // FIELDS
  for(var field of ["name", "email", "phone_mobile", "student_id"])
  {
   var element  = UI_Element_Find(content, field);
    
   element.onkeypress  = update;
   //element.onblur      = update;
  }
 
  
  var onclick = 
  function(popup)
  {
   UI_Popup_Close(popup);
   
   var row = Document_Element_GetObject(table, "selected-row");
   if(row)
   {
	var user = Document_Element_GetObject(row, "item");
   }
   else
   {
	var user = false;
   }
   
   resolve(user);
  }


  var onescape =
  function()
  {
   resolve(false);
  }
 
  UI_Popup_Create({title, content}, [{text, onclick}], "flexi", {escape:true, open:true, onescape});  
 });
 
 return promise;
}
// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                   M A R K E T I N G                                            //
//                                                                                                //
// -----------------------------------------------------------------------------------------------//

async function Marketing_OnLoad(module, data)
{
 // LOAD LISTS
 await Marketing_Database_ReadLists();
}



async function Marketing_OnShow(module, data)
{
 // ALLOWED FUNCTIONS (TOP MENU)
 var functions = User_Config("marketing-functions", "").split(","); 

 var items = {};
 for(var func of functions)
 {
  var item        = {};
  item["icons"]   = [];
  item["text"]    = UI_Language_String("marketing/functions", func);
  item["onclick"] = Marketing_Page;
  
  items[func]  = item;
 }
 
 var header = UI_Header("module-page-select", items, {selectfirst:false, css:"color-noted"});  
 
 var selector = UI_Element_Find(module, "module-header");
 selector.appendChild(header);
 
 Module_Page_Set();
}




async function Marketing_OnUnload()
{
}




async function Marketing_Page(item)
{
 await Module_Page_Set(item["id"]);
}




// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                          M O R E                                               //
//                                                                                                //
// -----------------------------------------------------------------------------------------------//

function Marketing_Lists_ToSelect(lists, select, options = {selected:false})
{
 if(options["nullfirst"])
 {
  Document_Select_AddOption(select, "", "");
 }
 

 // LISTS IN CENTER
 for(var item of lists)
 {
  var option   = new Option();
  option.text  = item["name"];
  option.value = item["id"];
   
  select.appendChild(option);
 }
  
 if(options["selected"]) select.value = options["selected"];
}

// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                    O P E R A TO R S                                            //
//                                                                                                //
// -----------------------------------------------------------------------------------------------//

async function Marketing_Operators(event)
{ 
 // SET UP CONTROLS
 var page = Core_State_Get("marketing", "submodule");
 
 var select  = UI_Element_Find(page, "operators-filter");
 
 // LOAD LISTS
 //await Marketing_Database_ReadLists();
 

 // OPERATORS REPORTING TO YOU
 var list = await Core_Api("Marketing_Operators_ByRole", {roles:["ceoper", "cesuper"]});
 Core_State_Set("marketing", ["operators", "list"], list);
 
 // OPERATORS WORKING ON SPECIFIC CENTERS
 
 // OPERATORS WORKING 
 
 // CENTERS
 var centers = Centers_List(); 
 var select  = UI_Element_Find(page, "operators-center");
 for(var center in centers)
 {
  var option   = new Option();
  option.text  = centers[center]["name"].toUpperCase();
  option.value = center; 
  
  select.appendChild(option);
 }
 
 select.value = User_Center();
 Core_State_Set("marketing", "view-center", select.value);
 
 select.onchange = 
 async function()
 { 
  Core_State_Set("marketing", "view-center", select.value);
  
  // CLEAR CURRENTLY EDITED LIST
  var container       = UI_Element_Find("panel-operators");
  container.innerHTML = "";
 
  // RELOAD LISTS
  //await Marketing_Database_ReadLists();
  
  // OPERATORS
  await Marketing_Operators_Update();
 }
 
 
 await Marketing_Operators_Update();
}




async function Marketing_Operators_Update()
{
 var list  = Core_State_Get("marketing", ["operators", "list"], []);
 var lists = Core_State_Get("marketing", "lists");
 var page  = Core_State_Get("marketing", "submodule");
 
 var panel       = UI_Element_Find(page, "panel-operators");
 panel.innerHTML = "";
 
 for(var operator of list)
 {
  var element = UI_Element_Create("marketing/operator-card", operator);
  
  var icon     = UI_Element_Find(element, "action-user");
  Document_Element_SetObject(icon, "operator", operator);
  icon.onclick = Marketing_Operators_DisplayUser;
  
  var icon     = UI_Element_Find(element, "action-cases");
  Document_Element_SetObject(icon, "operator", operator);
  icon.onclick = Marketing_Operators_DisplayAppointments;
  
  var icon     = UI_Element_Find(element, "action-recalls");
  Document_Element_SetObject(icon, "operator", operator);
  icon.onclick = Marketing_Operators_DisplayRecalls;
  
  var icon     = UI_Element_Find(element, "action-stats");
  Document_Element_SetObject(icon, "operator", operator);
  icon.onclick = Marketing_Operators_DisplayStats;
  
  var select = UI_Element_Find(element, "marketing-list");
   
  Marketing_Lists_ToSelect(lists, select, {selected:operator["marketing_list"], sections:true, nullfirst:true})
  Document_Element_SetData(select, "operator", operator["id"]);
 
  select.onchange =
  async function(event)
  {
   var element = event.srcElement;   
   var user_id = Document_Element_GetData(element, "operator");
   
   var value   = element.value;
   if(value == "") value = null;
	
   await Core_Api("User_Update_Field", {user_id, field:"marketing_list", value});
  
  }	  
  
  panel.appendChild(element);
 }
  
}



async function Marketing_Operators_DisplayRecalls(event)
{
 var element      = event.srcElement;
 var operator     = Document_Element_GetObject(element, "operator", {});

 var container    = UI_Element_Create("marketing/operator-recalls"); 
 UI_Element_Find(container, "title").innerHTML = UI_Language_String("marketing/operators", "operator recalls title");
 
 await Marketing_Call_DisplayRecalls(operator["id"], UI_Element_Find(container, "recalls"), {onclick:Marketing_Operators_DisplayLead});
 
 var panel       = UI_Element_Find("panel-info");
 panel.innerHTML = "";
 panel.appendChild(container);
 
 UI_Element_Find("panel-info").style.display   = "flex"; 
 UI_Element_Find("panel-extras").style.display = "none"; 
}




async function Marketing_Operators_DisplayLead(event)
{
 var element = event.srcElement;
 element     = Document_Element_FindParent(element, "lead");
    
 var lead_id = Document_Element_GetData(element, "lead");
 
 var container = UI_Element_Find("panel-extras");
 await Marketing_Call_DisplayLead(-1, container, {mode:"lead", lead_id, data:true, history:true, outcome:false});
 container.style.display = "flex";
}





async function Marketing_Operators_DisplayUser(event)
{
 var element      = event.srcElement;
 var operator     = Document_Element_GetObject(element, "operator", {});
 var user         = await Users_User_DisplayMain(operator["id"]);
 
 var panel       = UI_Element_Find("panel-info");
 panel.innerHTML = "";
 panel.appendChild(user);
 
 UI_Element_Find("panel-info").style.display   = "flex"; 
 UI_Element_Find("panel-extras").style.display = "none"; 
}




async function Marketing_Operators_DisplayAppointments(event)
{
 var element      = event.srcElement;
 var operator     = Document_Element_GetObject(element, "operator", {});
 var date         = Date_Now();
 
 // FROM A FEW DAYS AGO
 var days      = 7;
 var date_from = Date_Portion(Date_Add_Days(date, -days), "date-only") + "0000";
 
 // TO ALL OF TODAY
 var date_to = Date_Portion(date, "date-only") + "2359";
 
 // FETCH AND STRUCTURE APPOINTMENTS
 var list = await Core_Api("Marketing_Contacts_List", {operator_id:operator["id"], outcomes:["eng"], date_from, date_to, info:{leads:true}});

 for(var item of list)
 {
  item["date_call"] = Date_Portion(item["date_call"], "date-only");
 }
 list      = Array_Catalog_ByField(list, "date_call");
 var dates = Object.keys(list);
 dates     = dates.reverse();
 
 // DISPLAY
 var container = UI_Element_Create("marketing/operator-appointments");
 UI_Element_Find(container, "title").innerHTML = UI_Language_String("marketing/operators", "operator appointments title", {days});
 
 var cards = UI_Element_Find(container, "appointments");
 
 for(var date of dates)
 {
  var items  = list[date];
  
  var text   = UI_Language_Date(date,"date-long-weekday-noyear");
  var header = UI_Element_Create("marketing/contact-cases-header", {text});
  cards.appendChild(header);
  
  for(var item of items)
  {
   var card = await Marketing_Contact_Card(item);
   cards.appendChild(card);
	  
   Document_Element_SetData(card, "contact_id", item["id"]);
	  
   card.onclick =   
   async function(event)
   {
	var element = event.srcElement;
	element     = Document_Element_FindParent(element, "contact_id");
	var id      = Document_Element_GetData(element, "contact_id"); 
	   
	await Marketing_Contacts_CasePopup(id);
   }
  }
 }
 
 var panel       = UI_Element_Find("panel-info");
 panel.innerHTML = "";
 panel.appendChild(container);
 
 UI_Element_Find("panel-info").style.display   = "flex"; 
 UI_Element_Find("panel-extras").style.display = "none"; 
}



async function Marketing_Operators_DisplayStats(event)
{
 var element      = event.srcElement;
 var operator     = Document_Element_GetObject(element, "operator", {});
 var date         = Date_Now();
 
 var days         = 7;
 var date_to      = Date_Now();
 var date_from    = Date_Add_Days(date_to, -days);
 var stats        = await Core_Api("Marketing_Operator_Stats", {id:operator["id"], date_from, date_to});
 
 
 // CREATE DISPLAY
 var container = UI_Element_Create("marketing/operator-stats");
 var charts    = UI_Element_Find(container, "charts");
 UI_Element_Find(container, "title").innerHTML    = UI_Language_String("marketing/operators", "operator stats title");
 UI_Element_Find(container, "subtitle").innerHTML = UI_Language_String("marketing/operators", "operator stats subtitle", {days});
 
 
 // OUTCOMES
 var contacts = Safe_Get(stats, ["contacts"], []);
 var outcomes = Array_Catalog_ByField(contacts, "outcome");
 
 var data = {}
 for(var outcome in outcomes)
 {
  data[outcome] = outcomes[outcome].length;
 }
 
 var outcomes = Core_Data_Page("marketing/outcomes"); 
 var chart    = UI_Chart_DoughnutLegend(data,  0.67, {width:"100%", height:"100%", zIndex:100, values:"left"}, outcomes);

 charts.appendChild(chart);
 
 
 
 
 
 // TOTAL CALL TIME
 var time = 0;

 for(var contact of contacts)
 {
  var duration = parseInt(contact["duration"]);
  if(!isNaN(duration)) time = time + duration;
 }
 
 if(time > 0)
 {
  time        = (time / 60).toFixed(1);
  var text    = UI_Language_String("marketing/operators", "operator stats calltime", {time}); 
  
  var element = UI_Element_Create("marketing/stats-operator-info", {text}); 
  charts.appendChild(element);
 }
 
 
 
 
 // BY DAY
 var outcomes = Core_Data_Page("marketing/outcomes"); 
 var contacts = Safe_Get(stats, ["contacts"], []);
 var dates    = {};
 
 for(var i = -7; i<=0; i++)
 {
  var item = {};
  var date = Date_Portion(Date_Add_Days(Date_Now(), i), "date-only");
 
 
  for(var outcome in outcomes)
  {
   for(var contact of contacts)
   {
	if((Date_Portion(contact["date_call"], "date-only") == date) && (contact["outcome"] == outcome))
	{		
     if(!item[outcome]) item[outcome] = 0;
     item[outcome]++;
	}
   }
  }
    
  
  var key    = UI_Language_Date(date + "000000", "date-short-weekday-noyear");
  dates[key] = item;
 }

 var chart = UI_Chart_Stacks(dates, outcomes, {totals:": ", legend:false});
 charts.appendChild(chart);
 


 var panel       = UI_Element_Find("panel-info");
 panel.innerHTML = "";
 panel.appendChild(container);
  
  UI_Element_Find("panel-info").style.display   = "flex"; 
 UI_Element_Find("panel-extras").style.display = "none"; 
}// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                      S E A R C H                                               //
//                                                                                                //
// -----------------------------------------------------------------------------------------------//

async function Marketing_Search(event)
{   
 var lead = await Marketing_Leads_SearchPopup(); 
 console.log(lead);
  
 if(lead)
 {
  var operator_id = User_Id();
  var lead_id     = lead["id"];
  
  await Core_Api("Marketing_Call_AssignLead", {operator_id, lead_id});
  
  
  // RETURN TO CALL
  if(Core_State_Get(module, ["page"]) == "call") 
  {
   await Marketing_Call(); 
  }
  else 
  {
   await Module_Page_Set("call");
  }
 }
  
}



// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                      S T A T S                                                 //
//                                                                                                //
// -----------------------------------------------------------------------------------------------//




async function Marketing_Stats(event)
{
 // STATS SELECTOR
 var stats = Core_Data_Page("marketing/stats");
 
 var items = {};
 for(var id in stats)
 {
  var stat        = stats[id];
  
  var item        = {};
  item["icons"]   = [];
  item["text"]    = UI_Language_Object(stat);
  item["onclick"] = Safe_Function("Marketing_Stats_" + String_Capitalize_Initial(id), false);
  
  items[id]       = item;
 }
 
 var header = UI_Header("module-page-select", items, {selectfirst:false, css:"color-noted"});  
 var page   = Core_State_Get("marketing", "submodule");
 UI_Element_Find(page, "header").appendChild(header);
}





function Marketing_Stats_Center(center, dates, title)
{	
 var config   = Core_Data_Page("marketing/stats-outcomes-groups");
 
 var outcomes = [];
 for(var item of config)
 {
  var outcome = {};
  
  outcome["values"]          = Array_From_String(item["values"]);
  outcome["backgroundColor"] = Document_CSS_GetVariable(item["color"]);
  outcome["label"]           = UI_Language_Object(item);
  outcome["data"]            = Array(dates.length).fill(null);
  
  outcomes.push(outcome);
 }
 

 // SCAN DATES
 var n = 0;
 for(var date of dates)
 {
  var items = center[date] || [];
  
  for(var item of items)
  { 
   for(var outcome of outcomes) if(outcome["values"].includes(item["outcome"]))
   {
	if(outcome["data"] == null) outcome["data"] = [];
	outcome["data"][n]++
	
    break;
   }
  }
  
  n++;
 }


 // CREATE LABELS
 var labels = [];
 for(var date of dates)
 {
  var text = UI_Language_Date(date + "000000", "date-long-weekday-noyear");
  labels.push(text);
 }
 
 
 // CHART CONFIG
 var config = 
 {
  type:    "bar",
  data:    {labels, datasets: outcomes},
  options: 
  {
   responsive: true, 
   scales:     {x:{stacked: true}, y:{stacked: true}},
   plugins:    {legend: {display: false}}
  }
 }
 
 
 // CREATE ELEMENT
 var element            = UI_Element_Create("core/chart-bars-custom", {title});
 element.style.position = "relative";
 
 // LEGEND
 var legend = UI_Element_Find(element, "legend");
 for(var outcome of outcomes)
 {
  var caption = outcome["label"];
  var color   = outcome["backgroundColor"];
  
  var item = UI_Element_Create("core/chart-legend-item", {caption, color});
  legend.appendChild(item);
 }


 // SETUP CANVAS
 var canvas   = UI_Element_Find(element, "canvas");
 var context  = canvas.getContext("2d"); 
 
 var chart = new Chart(context, config);

 Document_Element_SetData(element,   "type",  "stacks");
 Document_Element_SetObject(element, "chart", chart);


 // CUSTOM-STYLE CHART
 element.style.backgroundColor = "var(--color-white)";
 element.style.width           = "512px";
 element.style.height          = "384px";
 Document_CSS_SetClass(element, "shadow-sharp-bottom");
 Document_CSS_SetClass(element, "border-rounded");
 Document_CSS_SetClass(element, "padding-medium");
 
 return element; 
}




async function Marketing_Stats_Appointments()
{
 var page          = Core_State_Get("marketing", "submodule");
 var content       = UI_Element_Find(page, "content");
 content.innerHTML = "";
 
 var centers   = Centers_List();
 var ids       = Object.keys(centers);
  
 var days      = 7;
 var types     = false;//["sales"];
 var date_from = Date_Portion(Date_Now(), "no-seconds");
 //var date_from = "202406010000";
 var date_to   = Date_Add_Days(date_from, days); 
 var stats     = await Core_Api("Marketing_Stats_Appointments", {date_from, date_to, types, centers:ids});
 console.log(stats);
 
 // DATES
 var dates = [];
 for(var i = 0; i<days; i++)
 {
  var date  = Date_Add_Days(date_from, i);
  date      = Date_Portion(date, "date-only");
  
  dates.push(date);
 }
 
 // ALL CENTERS
 var table  = UI_Table("sheet");

 var header = UI_Table_Row(table);
 
 var title  = UI_Table_Cell(header);
 title.style.backgroundColor = "transparent";
 title.style.border          = "0px";
 
 var caption = UI_Language_String("marketing/stats", "appointments");
 var text    = UI_Element_Create("marketing/stats-title", {caption});
 title.appendChild(text);
 
 
 for(var center in centers)
 {
  var cell       = UI_Table_Cell(header);
  cell.innerHTML = "<b>" + Centers_Name(center) + "</b>";
 }
 
 for(var date of dates)
 {
  var row = UI_Table_Row(table);
   
  var cell             = UI_Table_Cell(row);
  cell.style.textAlign = "left";
  cell.innerHTML       = UI_Language_Date(date, "date-long-weekday-noyear");
  
  for(var center in centers)
  {
   var appointments = Safe_Get(stats, [center, date], []);
   
   var cell         = UI_Table_Cell(row);
   cell.innerHTML   = appointments.length;
  }
 }
 
 var container = UI_Element_Create("marketing/stats-sheet");
 container.appendChild(table);
 container.style.width = "100%";
 
 content.appendChild(container);
 
 
 // APPOINTMENTS RESULTS BY CENTER
 var container = UI_Element_Create("marketing/stats-charts-blocks");
 for(var center of ids)
 {  
  var data    = stats[center] || {};
  var element = Marketing_Stats_Center(data, dates, Centers_Name(center));
   
  container.appendChild(element)
 }
 content.appendChild(container);
}




async function Marketing_Stats_Calls()
{
 var operators     = await Core_Api("Marketing_Operators_ByRole", {roles:["ceoper", "cesuper"]});
 var outcomes      = Core_Data_Page("marketing/outcomes");
 var subpage       = UI_Element_Create("marketing/stats-subpage-calls");
 
 var select        = UI_Element_Find(subpage, "date");
 select.value      = Date_To_Input(Date_Now());
 select.onchange   =
 async function(event)
 {
  var select = event.srcElement;
  var date   = Date_From_Input(select.value);
  date       = Date_Portion(date, "date-only");
  
  var stats = await Core_Api("Marketing_Stats_Calls", {date});
  var data  = {};

  for(var operator of operators)
  {
   var id     = operator["id"];
   var fname  = operator["firstname"] || " ";
   var name   = [operator["firstname"], operator["lastname"]].join(" "); 
   
   data[name] = stats[id] || {};
  }
 
  console.log(data);
  
  var chart = UI_Chart_Stacks(data, outcomes, {totals:": "});
  
  var calls       = UI_Element_Find(subpage, "calls");
  calls.innerHTML = "";
  calls.appendChild(chart);
 }
 
 Document_Event_Trigger(select, "change");
 
 var page          = Core_State_Get("marketing", "submodule");
 var content       = UI_Element_Find(page, "content");
 content.innerHTML = "";
 content.appendChild(subpage);
}// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                    M E S S A G E S                                             //
//                                                                                                //
// -----------------------------------------------------------------------------------------------//

async function Messages_OnLoad(module, data)
{
 
}



async function Messages_OnShow(module, data)
{
 var items = {};
 
 for(var group of ["unread", "this week", "last week", "last month"])
 {
  var item        = {};
  
  item["icons"]   = [];
  item["text"]    = UI_Language_String("messages/groups", group);
  item["period"]  = Core_Data_Value("messages/groups", group, "period");
  item["onclick"] = Messages_List;
  
  items[group]    = item;
 }
 
 var header = UI_Header("classes", items, {selectfirst:false, css:"color-noted", template:"big"});
 UI_Header_Set(header, "unread", true);

 UI_Element_Find(module, "module-header").appendChild(header);
}




async function Messages_OnUnload()
{
}





// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                          M O R E                                               //
//                                                                                                //
// -----------------------------------------------------------------------------------------------//


async function Messages_List(item)
{
 UI_Element_Find("message-display").style.visibility = "hidden";
 
 // LOAD OR RETRIEVE MESSAGES
 if(item)
 {
  var period   = item["period"];
 
  switch(period) 
  {
   case "unread":
	 var range  = {from:undefined, to:undefined};
	 var unread = true;
   break;
   
   default:
	 var range  = Date_Range(period);
	 var unread = false;
   break;
  }
 
  var messages = await Core_Api("Messages_List", {date_from:range["from"], date_to:range["to"], options:{unread, users:true}});
  Core_State_Set("messages", "data",    messages);
  Core_State_Set("messages", "section", item);
 }
 else
 {
  var messages = Core_State_Get("messages", "data", messages);
 }
 
 
 
 // NO MESSAGES?
 if(messages.length == 0)
 {  
  Core_State_Set("messages", "list", false);
 
  var none            = UI_Element_Create("messages/message-none");
   
  var container       = UI_Element_Find("messages-list");
  container.innerHTML = "";
  container.appendChild(none);
 
  return;
 }
  
  
  
 // LIST MESSAGES 
 var list = UI_List_Items(messages, ["style-outlined-accented", "outline-inner"], Messages_Message_Open, {style:"vertical", overflow:true},
 function(message)
 {  
  console.log(message);
  
  // SENDER
  var sender = [Safe_Get(message, ["sender", "firstname"], ""), Safe_Get(message, ["sender", "lastname"], "")].join("");
  
  // SUBJECT
  var subject = Safe_Get(message, "subject", "");
  
  
  // CREATE ITEM
  var item = UI_Element_Create("messages/message-item", {sender, subject});
  Document_Element_SetData(item, "message", message["id"]);
  
  // SENDER PICTURE
  var picture = UI_Element_Find(item, "picture");
  
  if(message["sender_id"])
  {
   User_Picture_Load(picture, message["sender_id"]);
  }
  else
  {
  }
  
  // READ/UNREAD
  if(message["date_read"]) 
  {
   Document_CSS_SetClass(item, "style-translucent-medium");
  }
  
  
  // ACTIONS
  var actions = UI_Element_Find(item, "actions");
  
  
  // DELETE
  var element = UI_Element_Create("messages/icon", {icon:"trash-can"});
  Document_Element_SetData(element, "message", message["id"]);
  element.onclick = Messages_Message_Delete;
  actions.appendChild(element);
  
  // SET READ/UNREAD
  if(message["date_read"]) 
  {
   var icon = "envelope-open";
  }
  else
  {
   var icon = "envelope";
  }
  

  return item;
 });
 
 Core_State_Set("messages", "list", list);
 
 
 // DISPLAY LIST
 var container       = UI_Element_Find("messages-list");
 container.innerHTML = "";
 container.appendChild(list);
}




async function Messages_Message_Open(element)
{
 var id      = Document_Element_GetData(element, "message");
 var message = await Core_Api("Messages_Read", {id});
 
 
 // DISPLAY
 var display = UI_Element_Find("message-display");
 Messages_Message_Display(message, display);
 
 display.style.visibility = "visible";
 

 // SET MESSAGE AS READ 
 await Core_Api("Messages_Set_Read", {id, read:true});
}




function Messages_Message_Display(message, container)
{
 // SUBJECT
 var text = message["subject"]; 
 UI_Element_Find(container, "message-subject").innerHTML = text; 
  
 // TEXT
 var text = message["text"]; 
 UI_Element_Find(container, "message-text").innerHTML = text;
}




async function Messages_Message_Delete(event)
{
 var element = event.currentTarget;
 var id      = Document_Element_GetData(element, "message");
 
 // CONFIRM
 var title    = UI_Language_String("messages/popups", "delete title"); 
 var content  = UI_Language_String("messages/popups", "delete text"); 
 var picture  = Resources_URL("images/cover-alert.jpg");
 
 var confirm = await UI_Popup_Confirm(title, content, picture);
 if(!confirm) return;
 
 
 //DELETE
 await Core_Api("Messages_Delete", {id});
 UI_Element_Find("message-display").style.visibility = "hidden";
 
 
 // REFRESH LIST
 var section = Core_State_Get("messages", "section");
 await Messages_List(section);
}




async function Messages_Message_Popup(id)
{
 // LOAD MESSAGE
 var message = await Core_Api("Messages_Read", {id});
 
 // ENCAPSULATE
 var content = UI_Element_Create("messages/popup-content");
 Messages_Message_Display(message, content);
 
 // DISPLAY POPUP
 await UI_Popup_Intermission(false, content, false, 5);
 
 // SET MESSAGE AS READ 
 await Core_Api("Messages_Set_Read", {id, read:true});
}




async function Messages_Pending_Popups()
{
 var pending = await Core_Api("Messages_List", {options:{type:"popup", unread:true}});
 
 for(var message of pending)
 {
  await Messages_Message_Popup(message["id"]);
 }
}



async function Messages_Popup_SendMultiple(ids, options = {})
{
 var users = [];
 
 // COLLECT TEMPLATES
 var templates = await Core_Api("Core_Files_PartnerTemplates", {type:"messages"});
  
 // CREATE POPUP CONTENT
 var content = UI_Element_Create("messages/popup-sendmultiple", {}, {language:"messages/popups"});
 
 
 // USERS SPECIFIED
 if(Object_Is_Array(ids))
 {
  // READ USERS
  users = await Core_Api("Users_Read", {ids, fields:"id,firstname,lastname", options:{order:"firstname,lastname", array:true}});
 }
 else
 // USERS LOADED DYNAMICALLY BY QUERY
 {
  // ASSUME IDS IS A STANDARD QUERY NAME
  var name = ids; 
  users    = await Core_Api("Queries_Query", {name, fields:["id", "name", "lastname"]});
 }
 
 
 // DISPLAY USERS
 for(var user of users) 
 {
  user["text"]  = [user["firstname"], user["lastname"]].join(" ");
  user["value"] = "checked";
 }
 
 var list = UI_Checklist(users, "tight"); 
 UI_Element_Find(content, "users").appendChild(list);

 
 // FILL TYPES SELECT
 var select = UI_Element_Find(content, "types");
 UI_Select_FromDatapage(select, "messages/types");
 select.value = "message";
 
 
 // FILL TEMPLATE SELECT
 var select = UI_Element_Find(content, "templates");
 Document_Select_AddOption(select, "", "");
 for(var template of templates) Document_Select_AddOption(select, template, template);
 
 select.onchange = 
 async function(event)
 {
  var element  = event.currentTarget;
  var template = element.value; 
  var html     = await Core_Api("Messages_Template", {template, data:options["data"] || {}});
  
  UI_Element_Find(content, "preview").innerHTML = html;
 }
 
 var button_send = 
 { 
  text   : UI_Language_String("messages/popups", "button send"), 
  onclick: 
  async function()
  {
   var users = [];
   var items = Document_Element_GetObject(list, "items");
   for(var item of items) if(item["value"]) users.push(item["id"]);
    
   
   // CONFIRM  
   var title    = UI_Language_String("messages/popups", "messages send title"); 
   var text     = UI_Language_String("messages/popups", "messages send text", {count:users.length}); 
   var picture  = Resources_URL("images/cover-alert.jpg");
   var confirm  = await UI_Popup_Confirm(title, text, picture);
   
   if(!confirm) return;
   
   
   // SEND
   var sender_id       = User_Id();
   var subject         = UI_Element_Find(content, "subject").value;
   var type            = UI_Element_Find(content, "types").value;
   var template        = UI_Element_Find(content, "templates").value;
   var date_expiration = Date_From_Input(UI_Element_Find(content, "expiration").value);
   if(!date_expiration) date_expiration = false;
   
   if(options["fields"]) var fields = options["fields"]; else var fields = false;
     
   await Core_Api("Messages_Send_Multiple", {sender_id, users, subject, options:{template, date_expiration, type, fields}});
   
   
   // CLOSE
   UI_Popup_Close(popup);
  }
 }
 
 // POPUP
 var popup = await UI_Popup_Create({content}, [button_send], "intermission-content", {open:true, escape:true});
}// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                          N U L L                                               //
//                                                                                                //
// -----------------------------------------------------------------------------------------------//


async function Null_OnLoad(module, data)
{
 // RE-READ USER
 await Core_User();
}// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                       P R O F I L E                                            //
//                                                                                                //
// -----------------------------------------------------------------------------------------------//

async function Profile_OnLoad(module, data)
{
 var user     = await Core_User();

  
 var picture = UI_Element_Find(module, "profile-picture");	
 User_Picture_Load(picture, user);
 picture.onclick = Profile_Picture_Upload;
 
 var container = UI_Element_Find(module, "profile-settings");
 
 
 var languages = Partner_Data("localization", "languages").split(",");
 var options   = {};
 for(var language of languages) options[language] = UI_Language_String("core/languages", language, {}, language); // DISPLAY EACH LANGUAGE NAME IN ITS NATIVE NAME
 var panel     = Profile_Preferences_Panel("language", options, 
 async function()
 {
  Profile_Preferences_ApplyLanguage();
  
  await Core_Reload();
  Module_Load("profile");
 })
 
 UI_Element_Find(panel, "options").value = User_Settings_Get("preferences", "language") || "en";
 
 container.appendChild(panel); 


 var panel     = Profile_Preferences_Panel("size", false, Profile_Preferences_ApplySize);
 container.appendChild(panel);


 var panel     = Profile_Preferences_Panel("sound");
 container.appendChild(panel); 
 
 
 var panel     = Profile_Preferences_Panel("music");
 container.appendChild(panel);  
 
 
 var text      = UI_Language_String("profile/settings", "password change text");
 var action    = UI_Language_String("profile/settings", "password change action");
 var panel     = UI_Element_Create("profile/settings-action", {text, action});
 panel.onclick = Profile_Password_Change;
 container.appendChild(panel); 
 
 
 var text      = UI_Language_String("profile/settings", "account logout text");
 var action    = UI_Language_String("profile/settings", "account logout action");
 var panel     = UI_Element_Create("profile/settings-action", {text, action});
 panel.onclick = Profile_Account_Logout;
 container.appendChild(panel); 
 
 
 // ABOUT ME
 var element      = UI_Element_Find(module, "profile-about");
 Document_Element_SetData(element, "field", "about");
 element.value    = Safe_Get(user, ["about"]) || "";
 element.onchange = Profile_User_Set; 
 
 
 // ANIMATE ELEMENTS
 var container = UI_Element_Find(module, "profile-settings");
 for(var element of container.children) element.style.visibility = "hidden";
 
 Document_Element_AnimateChildren(container, "slideInRight 0.250s ease-in-out", 
 {
  delay:    125, 
  interval: 125, 
  onstart:
  function(element) 
  {
   element.style.visibility = "visible";
  }
 });

 
 var container = UI_Element_Find(module, "profile-user");
 for(var element of container.children) element.style.visibility = "hidden";
 
 Document_Element_AnimateChildren(container, "zoomIn 0.250s ease-in-out", 
 {
  delay:    125, 
  interval: 125, 
  onstart:
  function(element) 
  {
   element.style.visibility = "visible";
  }
 });
}



async function Profile_OnShow(module, data)
{
}




async function Profile_OnUnload()
{
}








// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                          M O R E                                               //
//                                                                                                //
// -----------------------------------------------------------------------------------------------//


function Profile_Preferences_Panel(preference, options, onchange)
{
 var text      = UI_Language_String("profile/settings", "preferences " + preference + " text");
 var panel     = UI_Element_Create("profile/settings-options", {text});
 
 var select   = UI_Element_Find(panel, "options");
 Document_Element_SetData(select, "preference", preference);
 
 if(options)
 {
  for(var value in options) Document_Select_AddOption(select, options[value], value);
 }
 else
 {
  UI_Select_FromDatapage(select, "profile/settings-" + preference);
  select.value = User_Settings_Get("preferences", preference);
 }
 
 select.onchange = 
 async function(event)
 {
  await Profile_Preferences_Set(event);
  
  if(onchange) onchange();
 }
 
 return panel;
}




async function Profile_Account_Logout()
{
 var title    = UI_Language_String("profile", "logout popup title"); 
 var content  = UI_Language_String("profile", "logout popup text"); 
 var picture  = Resources_URL("images/cover-logout.png");

 var confirm  = await UI_Popup_Confirm(title, content, picture);
 if(!confirm) return;
 
 await Core_Logout();
 
 Module_Load("login", document.body);
}





async function Profile_Picture_Upload()
{
 var files = await Storage_File_Select({accept:".jpg"});
 var file  = files[0];
 
 var data = await Storage_File_Read(file, {whole:true});
 
 var blob = await Document_Image_Resize(data, 
 {
  constraints:
  {
   width:  400, 
   height: 400
  }, 
  
  format:"image/jpg", 
  
  quality:0.5
 });
 
 //var user_id = 1;
 //var dest    = Resources_URL("propic.jpg", "user", user_id); 
 
 // READ DATA ONLY AND STORE
 var data = await Storage_File_Read(blob, {whole:false}); 
 Storage_File_Upload("propic.jpg", data, "image/jpg", "api.php?direct&f=User_Files_Upload", {});
 
 // READ AS A WHOLE INCLUDING BASE64 HEADER, AND DISPLAY ON BIG PICTURE AND PROPIC IN THE MENU BAR
 var picture = await Storage_File_Read(blob, {whole:true});  
 
 var element = UI_Element_Find("user-propic");
 Document_Element_Animate(element, "rubberBand 0.5s linear 1");
 element.src = picture;
 
 var element = UI_Element_Find("profile-picture");
 Document_Element_Animate(element, "rubberBand 0.5s linear 1");
 element.src = picture;
}






async function Profile_Password_Change(event)
{
 var popup    = false;
 
 var picture  = Resources_URL("images/cover-password.png");
 var title    = UI_Language_String("profile", "password change title");
 var button   = UI_Language_String("profile", "password change button");
 var subtitle = false;
 
 var text        = {};
 text["current"] = UI_Language_String("profile", "password change current");
 text["new"]     = UI_Language_String("profile", "password change new");
 text["repeat"]  = UI_Language_String("profile", "password change repeat");
 var content     = UI_Element_Create("profile/password-change", text); 
 
 var change   =
 async function()
 {  
  var current = UI_Element_Find(content, "current");
  var newpass = UI_Element_Find(content, "new");
  var repeat  = UI_Element_Find(content, "repeat");
  var setpass = newpass.value.trim();
  
  // NEW PASS NOT REPEATED CORRECTLY?
  if(newpass.value != repeat.value)
  {
   repeat.value = UI_Language_String("profile", "password change different");  
   Document_Element_Animate(repeat,  "headShake 0.75s ease-in-out 1");
   
   await Client_Wait(2);
   repeat.value = "";
   
   return;
  }
  
  
  // MINIMUM LENGTH NOT RESPECTED?
  var minlength = 5;
  if(setpass.length < minlength)
  {
   newpass.value = UI_Language_String("profile", "password change tooshort", {n:minlength});  
   Document_Element_Animate(newpass, "headShake 0.75s ease-in-out 1");
   
   await Client_Wait(2);
   newpass.value = setpass;
   
   return;
  }
  

  // TRY CHANGING
  var result = await Core_Api("User_ChangePassword", {old:current.value, new:setpass});
  
  if(result == "ok")
  {
   UI_Popup_Close(popup);
  }
  else
  {  
   current.value = UI_Language_String("profile", "password change wrong", {length:minlength});  
   Document_Element_Animate(current, "headShake 0.75s ease-in-out 1");
   
   await Client_Wait(2);
   current.value = "";
   
   return;
  }
 }
 
 popup = await UI_Popup_Create({title, subtitle, picture, content}, [{text:button, onclick:change}], undefined, {escape:true, open:true});  
}




async function Profile_Preferences_Set(event)
{
 var element = event.currentTarget;
 var field   = Document_Element_GetData(element, "preference");
 var value   = element.value;
 
 await User_Settings_Set("preferences", field, value);
}



async function Profile_User_Set(event)
{
 var element = event.currentTarget;
 var field   = Document_Element_GetData(element, "field");
 var value   = element.value;
  
 await Core_Api("User_Update_Field", {field, value});
}





function Profile_Preferences_ApplySize()
{
 var size = User_Settings_Get("preferences", "size");
 
 var zoom = Core_Data_Value("profile/settings-size", size, "zoom");
 
 document.body.style.zoom = zoom;
}




function Profile_Preferences_ApplyLanguage()
{
 var language = User_Settings_Get("preferences", "language") || "en";
 
 UI_Language_Set(language);
}// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                     R E S O U R C E S                                          //
//                                                                                                //
// -----------------------------------------------------------------------------------------------//


function Resources_Get(type, mode)
{
 switch(mode)
 {
  case "list":
	return Core_State_Get("resources", [type, "list"]); 
  break;
  
  case "catalog":
	return Core_State_Get("resources", [type, "catalog"]); 
  break;
  
  default:
	return Core_State_Get("resources", [type]); 
  break;
 }
}



async function Resources_Update(type, force, catalog_function)
{
 var list = Resources_Get(type, "list");
 
 if(!list || force)
 {
  var list = await Core_Api("Resources_" + String_Capitalize_Initial(type), {});
  Core_State_Set("resources", [type, "list"], list);
  
  if(catalog_function)
  {
   var catalog = catalog_function(list);
   Core_State_Set("resources", [type, "catalog"], catalog);
  }
 }
 
 return list;
}




function Resources_URL(path, type = "application", id)
{
 switch(type)
 {
  case "application":
	var resource = "resources/" + path;
  break;
  
  case "partner":
	var resource = "partners/" + Partner_Name() + "/" + path;
  break;
  
  case "user":
    var userfolder = User_Folder(id);
	var resource   = "partners/" + Partner_Name() + "/users/" + userfolder + "/" + path;
  break;
  
  case "content":
	var resource = "content/" + path;
  break;
  
  case "lesson":
	var resource = "content/lessons/" + id + "/" + path;
  break;
  
  case "curriculum":
	var resource = "content/curricula/" + id + "/" + path; 
  break;
  
  default:
	var resource = path;
  break;
 }
 
 return resource;
}




async function Resources_Lessons(update, mode)
{
 var list = await Resources_Update("lessons", update,
 function(list)
 {
  var catalog = {};
	 
  for(var item of list)
  {
   var parts = String_Split(item, ["_", "-", ".", " "]);
   
   // PAD MISSING PARTS
   for(var i = parts.length; i<3; i++)
   {
	Array_Element_Insert(parts, 0, "");
   }
   
   // STRUCTURE CATALOG
   Safe_Set(catalog, parts, {id:item});
  }
  
  return catalog;
 });
 
 return Resources_Get("lessons", mode);
}





async function Resources_Vocabulary(update, mode)
{
 var list = await Resources_Update("vocabulary", update,
 function(list)
 {
  var catalog = {};
  
  for(var item of list)
  {
   var parts = String_Split(item, ["_", "-", ".", " "]);
   
   // PAD MISSING PARTS
   for(var i = parts.length; i<2; i++)
   {
	Array_Element_Insert(parts, 0, "");
   }
   
   // STRUCTURE CATALOG
   Safe_Set(catalog, parts, {id:item});
  }
  
  return catalog;
 });
 
 return Resources_Get("vocabulary", mode);
}





async function Resources_Outcomes(update, mode)
{
 var list = await Resources_Update("outcomes", update,
 function(list)
 {
  var catalog = {};
  
  for(var item of list)
  {
   var parts = String_Split(item, ["_", "-", ".", " "]);
   
   // PAD MISSING PARTS
   for(var i = parts.length; i<3; i++)
   {
	Array_Element_Insert(parts, 0, "");
   }
   
   // STRUCTURE CATALOG
   Safe_Set(catalog, parts, {id:item});
  }

  return catalog;
 });
 
 return Resources_Get("outcomes", mode);
}




async function Resources_Skills(update)
{
 var list = await Resources_Update("skills", update);
 
 return Resources_Get("skills", "list");
}



async function Resources_Projects(update, mode)
{
 var list = await Resources_Update("projects", update,
 function(list)
 {
  var catalog = {};
  
  for(var item of list)
  {
   var parts = String_Split(item, ["_", "-", ".", " "]);
   
   // PAD MISSING PARTS
   for(var i = parts.length; i<3; i++)
   {
	Array_Element_Insert(parts, 0, "");
   }
   
   // STRUCTURE CATALOG
   Safe_Set(catalog, parts, {id:item});
  }

  return catalog;
 });
 
 return Resources_Get("projects", mode);
}




async function Resources_Index(index, update)
{
 if(!update)
 {
  var resource = Core_State_Get("resources", ["index", index], false);
  if(resource) return resource;
 }	 
 
 var resource = await Core_Api("Resources_Index", {index});
 Core_State_Set("resources", ["index", index], resource);
 
 return resource;
}
// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                     T R I G G E R S                                            //
//                                                                                                //
// -----------------------------------------------------------------------------------------------//

async function Triggers_OnLoad(module, data)
{
}



async function Triggers_OnShow(module, data)
{
}




async function Triggers_OnUnload()
{
}





// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                          M O R E                                               //
//                                                                                                //
// -----------------------------------------------------------------------------------------------//async function Users_Family_DisplayMain(id, options = {})
{
 var data = await Core_Api("Family_Read", {id, options:{manager:true}});
 console.log(data);
 
 Core_State_Set("users", "family-id", id);
 Core_State_Set("users", "family-data", data);
 
 var display = UI_Element_Create("users/family-main", {}, {language:"users/family-main"});
 
 // DROPDOWN SOURCES
 
 // 1. CENTERS
 var element = UI_Element_Find(display, "family-center");
 Document_Select_AddOption(element, "", ""); 
 var centers = Centers_Available();
 for(var center of centers) Document_Select_AddOption(element, center["name"], center["id"]);

 // 2. STATUSES
 var element = UI_Element_Find(display, "family-status");
 Document_Select_AddOption(element, "", ""); 
 UI_Select_FromDatapage(element, "families/statuses"); 
 
 // 3. TYPES
 var element = UI_Element_Find(display, "family-type");
 Document_Select_AddOption(element, "", ""); 
 UI_Select_FromDatapage(element, "families/types"); 


 // STANDARD FIELDS
 for(var field in data)
 {
  var element = UI_Element_Find(display, "family-" + field);
  
  if(element)
  {
   Document_Input_Set(element, data[field]);
   Document_Element_SetData(element, "field", field);
   
   // ON VALUE CHANGE - UPDATE
   element.onchange =
   async function(event)
   {
	console.log("update");
	
    var element = event.currentTarget;
    var field   = Document_Element_GetData(element, "field");
	var value   = Document_Input_Get(element);
	
	var id      = Core_State_Get("users", "family-id");
	
    await Core_Api("Family_Update_Field", {id, field, value});
   }
   
  }
 
 }
 
 
 // JSON DATA FIELDS
 var more   = data["data"] || {};
 var inputs = Document_Element_FindChildren(display, "type", "data", ["recurse"]);
 
 for(var element of inputs)
 {
  var field = Document_Element_GetData(element, "uid");
  
  if(field)
  {
   if(typeof more[field] != "undefined") Document_Input_Set(element, more[field]);
   Document_Element_SetData(element, "field", field);
   
   // ON VALUE CHANGE - UPDATE
   element.onchange =
   async function(event)
   {
	console.log("update");
	
    var element = event.currentTarget;
    var field   = Document_Element_GetData(element, "field");
	var value   = Document_Input_Get(element);
	
	var id      = Core_State_Get("users", "family-id");
	
    await Core_Api("Family_Update_Data", {id, field, value});
   }
   
  }
 
 }
 
 
 // MANAGER
 var element = UI_Element_Find(display, "family-manager_id");
 Document_CSS_SetClass(element, "style-clickable");
 var manager = data["manager"];
 if(manager)
 {
  var firstname = manager["firstname"] || "";
  var lastname  = manager["lastname"]  || "";
  
  element.value = [firstname, lastname].join(" ").trim();
 }
 element.onclick = Users_Family_ChangeManager;
 
 
 
 // APPLY PERMISSIONS
 var editable = User_Config("edit-family-fields", "").split(",");
 
 var elements = Document_Element_FindChildren(display, "field", undefined, ["recurse"]);
 for(var element of elements)
 {
  var field = Document_Element_GetData(element, "field");
  if(!editable.includes(field))
  {
   Document_Element_Disable(element);
  }
 }
 
 
 
 return display;
}



async function Users_Family_DisplayMore(family, maindisplay = false)
{
 var display = UI_Element_Create("users/family-more");
 if(maindisplay) Document_Element_SetObject(display, "main-display", maindisplay);
 
 var view   = User_Config("view-family-more", "").split(",");
 var items  = {};
 
 var header_dispatcher =
 async function(item)
 {
  console.log(item);
  
  var f    = Safe_Function("Users_Family_Display" + String_Capitalize_Initial(item["display"]), function(){});
  var data = await f(item["family"], maindisplay);

  var container = UI_Element_Find(display, "data");
  container.innerHTML = "";
  container.appendChild(data);
 }
 
 // BUILD HEADER BASED ON MORE.DAT INFORMATION + PARTNER CONFIGURATION
 var more   = Core_Data_Page("users/family-more");
 for(var field in more)
 { 
  // IS THE CURRENT USER ALLOWED TO SEE THIS PAGE?
  if(view.includes(field))
  {
   var item        = {};
   item["text"]    = UI_Language_String("users/family-more", field);
   item["icons"]   = [];
   item["family"]  = family;
   item["display"] = field;
   item["onclick"] = header_dispatcher;
   items[field]    = item;
  }
 }
 
 var header = UI_Header("header-more", items, {selectfirst:false, css:"color-noted", template:"standard"}); 
 
 UI_Element_Find(display, "header").appendChild(header);
 return display;
}




async function Users_Family_DisplayUsers(family, maindisplay)
{
 if(typeof family == "object") var users = family["users"] || []; else var users = await Core_Api("Family_Users", {id:family});
 
 users     = Object.values(users);
 var table = UI_Table_Data(users, {id:true, firstname:true, lastname:true}, "users/table-fields",
 // EVENTS
 {
  row:
  async function(event)
  {
   var element = event.currentTarget;
   var user    = Document_Element_GetObject(element, "item");
   
   if(maindisplay)
   {
    var display           = await Users_User_DisplayMain(user["id"]);
	maindisplay.innerHTML = "";
	maindisplay.appendChild(display);
   }
  }
 },
 
 // ACTIONS
 {
  delete:
  {
   icon:"trash-can",
   onclick: async function(item, row)
   {
	console.log(item);
	
	var name    = [item["firstname"] || "", item["lastname"] || ""].join(" ").trim();
    var title   = UI_Language_String("users/popups", "family removeuser title"); 
    var text    = UI_Language_String("users/popups", "family removeuser text", {name}); 
    var picture = Resources_URL("images/cover-alert.jpg");
 
    var confirm  = await UI_Popup_Confirm(title, text, picture);
    if(!confirm) return; 
	
	await Core_Api("User_Update_Field", {user_id:item["id"], field:"family_id", value:null});
	row.remove();
   }
  }
 });
 
 return table;
}




async function Users_Family_ChangeManager(event)
{
 var element = event.currentTarget;
 var family  = Core_State_Get("users", "family-data")
 var role    = Module_Config("families", "managed-by", "").split(",");

 var center = Array_From_Fields(Centers_Available(), "id");
 if(center.length == 0) center = [User_Center()];

 var users   = await Core_Api("Users_List_ByCenter", {role, center, fields:"id,firstname,lastname", order:"firstname,lastname"});
 var manager = await Users_Popup_SelectFromList(users, {firstname:true, lastname:true}, "users/table-fields");

 if(manager && manager["id"] != family["manager_id"])
 {
  // UPDATE DB
  Core_Api("Family_Update_Field", {id:family["id"], field:"manager_id", value:manager["id"]});// UPDATE DISPLAY
  
  // UPDATE MEMORY
  family["manager_id"] = manager["id"];
  
  // UPDATE DISPLAY
  var firstname = manager["firstname"] || "";
  var lastname  = manager["lastname"]  || "";
  
  element.value = [firstname, lastname].join(" ").trim(); 
 }
}
// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                          U S E R S                                             //
//                                                                                                //
// -----------------------------------------------------------------------------------------------//


async function Users_OnLoad(module, data)
{ 
 // CREATE MENU HEADER
 var menus = Core_Data_Page("users/menus");
 var items = {};
 for(var key in menus)
 {
  if(User_Flag("users-menu", key, true))
  {
   items[key]            = {};
   items[key]["text"]    = UI_Language_Object(menus[key]);
   items[key]["icons"]   = [];
   items[key]["onclick"] = Safe_Function("Users_" + String_Capitalize_Initial(key), function(){});
  }
 }
 
 var header = UI_Header("users-menu", items, {selectfirst:false, css:"color-noted", template:"standard"});
  
 UI_Element_Find(module, "module-header").appendChild(header);
 
 
 
 // CREATE STAFF SUBMENU
 var items   = {};
 var roles   = User_Config("edit-staff", "").split(",");
 for(var role of roles)
 {
  var item      = []; 
  item["icon"]  = "";
  item["text"]  = UI_Language_Object(Core_Config(["roles", role], {}));
  item["state"] = "enabled";
  item["func"]  = Users_Staff_List;
  item["tag"]   = role;

  items[role]   = item;
 }
 
 // ADD BREAK ITEM
 var item      = [];
 item["icon"]  = "";
 item["text"]  = "";
 item["state"] = "disabled";
 item["func"]  = false;
 item["tag"]   = role;

 items["break 1"]   = item;
 
 // ADD NEW STAFF ITEM
 var item      = [];
 item["icon"]  = "";
 item["text"]  = UI_Language_String("users/submenus", "staff new");
 item["state"] = "enabled";
 item["func"]  = Users_Staff_New;

 items["new"]   = item;
 
 
 var menu = UI_Menu_Create("staff-submenu", items);
 Core_State_Set("users", ["menus", "staff"], menu);
}



async function Users_OnUnload()
{
}



async function Users_OnShow(module, data)
{
}




function Users_ClearDisplay()
{
 var element = UI_Element_Find("user-main");
 element.style.visibility = "hidden";
 element.innerHTML        = "";
 
 var element = UI_Element_Find("user-more");
 element.style.visibility = "hidden";
 element.innerHTML        = "";
}






async function Users_Students()
{
 Users_ClearDisplay();
 
 var operations = 
 {
  message : 
  {
   icon    : "envelope",
   onclick : Users_List_Message
  }
 }
 
 var display   = Database_View_Create("Users_List_ByCenter", Module_Config("users", "page"), {id:true, firstname:true, lastname:true, email:true}, "users/table-fields", Users_User_Select, false, {export_fields:"id,firstname,lastname,email,mobile,center", operations});
 
 var scope = User_Config("operate-on-users");
 switch(scope)
 {
  case "all":
  
	var center = User_Center();
 
	await Database_View_Query(display,
	{
	 center,
	 fields : "id,firstname,lastname",
	 role   : "student",
	 order  : "lastname, firstname",
	}); 
  break;
  
  case "managed":	
	
	var manager = User_Id();
	
	await Database_View_Query(display,
	{		
	 manager,
	 fields : "id,firstname,lastname",
	 role   : "student",
	 order  : "lastname, firstname",
	}); 
  break;
 }
 
 Core_State_Set("users", "list-display", display);

 var container       = UI_Element_Find("list-display");
 container.innerHTML = "";
 container.appendChild(display);
 container.style.visibility = "visible";
}




async function Users_List_Message(display)
{
 // GET ALL DISPLAY STUDENTS IDS
 var users = await Database_View_Data(display, "all", "id");
 var ids   = Array_From_Fields(users, "id");
 
 await Messages_Popup_SendMultiple(ids);
}




async function Users_Staff()
{ 
 var menu     = Core_State_Get("users", ["menus", "staff"]);
 var position = Document_Element_Corner(UI_Element_Find("staff"), "bottom"); 
 
 setTimeout(
 function()
 {
  UI_Menu_Show(menu, position["left"], position["top"] + parseInt(Document_CSS_GetValue("gap-medium", "gap")) * 2, {direction:"bottom"});
 }, 125);
}



async function Users_Staff_New(item)
{
 var options = [];
 options.push({text:"", value:""});

 var roles = User_Config("edit-staff", "").split(","); 
 for(var role of roles)
 {
  var text = UI_Language_Object(Core_Config(["roles", role]));
  options.push({value:role, text});	 
 }
 
 // POPUP WITH STAFF ROLES
 var title    = UI_Language_String("users/popups", "createuser role title");
 var subtitle = UI_Language_String("users/popups", "createuser role subtitle");
 var picture  = Resources_URL("images/users.png");
 
 var role     = await UI_Popup_Select(title, subtitle, picture, options);
 
 if(role)
 {
  var data = {role};
  
  // CREATE NEW USER
  var id = await Core_Api("User_Create", {data});
  if(!id) return;
  
  // DISPLAY
  var display = await Users_User_DisplayMain(id);
  
  var container = UI_Element_Find("list-display");
  container.innerHTML = "";
  container.style.visibility = "visible";
  
  var container  = UI_Element_Find("user-main");
  container.innerHTML        = "";
  container.appendChild(display);
  container.style.visibility = "visible";
  
  var container = UI_Element_Find("user-more");
  container.innerHTML = "";
  container.style.visibility = "visible";
 }
}



async function Users_Staff_List(item)
{  
 Users_ClearDisplay();
 
 var operations = 
 {
  message : 
  {
   icon    : "envelope",
   onclick : Users_List_Message
  }
 }
  
 var display = Database_View_Create("Users_List_ByCenter", Module_Config("users", "page"), {id:true, firstname:true, lastname:true, email:true}, "users/table-fields", Users_User_Select, false, {export_fields:"id,firstname,lastname,email,mobile,center", operations});
 
 var role = Document_Element_GetObject(item, "tag");
 var center = User_Center();
 
 await Database_View_Query(display,
 {
  center,
  role,
  order  : "lastname, firstname",
 }); 
 
 Core_State_Set("users", "list-display", display);

 var container       = UI_Element_Find("list-display");
 container.innerHTML = "";
 container.appendChild(display);
 container.style.visibility = "visible";
}




async function Users_Search()
{
 var centers = [User_Center()];
 
 var user    = await Users_Popup_SelectFromSearch(centers, [], fields = "id,firstname,lastname", count = 100, order = "id");
 if(!user) return;
  
 Users_ClearDisplay();
 
 var table           = UI_Table_Data([user], {id:true, firstname:true, lastname:true}, "users/table-fields", Users_User_Select);
 var container       = UI_Element_Find("list-display");
 container.innerHTML = ""; 
 container.appendChild(table);
 container.style.visibility = "visible";
 
 Users_User_Select(false, user);
}





// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                     F A M I L I E S                                            //
//                                                                                                //
// -----------------------------------------------------------------------------------------------//


async function Users_Families()
{
 Users_ClearDisplay();
  
 var display = Database_View_Create("Families_List_ByCenter", Module_Config("families", "page"), {id:true, name:true, type:Core_Data_Page("families/types")}, "families/table-fields", Users_Family_Select);
 
 var center = User_Center();
 
 await Database_View_Query(display,
 {
  center,
  order  : "name",
 }); 
 
 Core_State_Set("families", "list-display", display);

 var container       = UI_Element_Find("list-display");
 container.innerHTML = "";
 container.appendChild(display);
 container.style.visibility = "visible";
}



async function Users_Family_Select(event)
{
 var element = event.currentTarget;
 var family  = Document_Element_GetObject(element, "item");
    
 var display = await Users_Family_DisplayMain(family["id"]);
 var more    = await Users_Family_DisplayMore(family["id"], UI_Element_Find("user-main"));
  
 var container  = UI_Element_Find("user-main");
 container.innerHTML        = "";
 container.appendChild(display);
 container.style.visibility = "visible";
  
 var container  = UI_Element_Find("user-more");
 container.innerHTML        = "";
 container.appendChild(more);
 container.style.visibility = "visible";
}






// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                            U S E R                                             //
//                                                                                                //
// -----------------------------------------------------------------------------------------------//


async function Users_User_Select(event, user)
{ 
 if(!user)
 {
  var element = event.currentTarget;
  var user    = Document_Element_GetObject(element, "item");
 }
 
 var display = await Users_User_DisplayMain(user["id"]);
 var more    = await Users_User_DisplayMore(user["id"]);
  
 var container  = UI_Element_Find("user-main");
 container.innerHTML        = "";
 container.appendChild(display);
 container.style.visibility = "visible";
  
 var container  = UI_Element_Find("user-more");
 container.innerHTML        = "";
 container.appendChild(more);
 container.style.visibility = "visible";
}



async function Users_User_DisplayMain(id, options = {})
{
 var data = await Core_Api("User_Read", {user_id:id, options:{family:true, manager:true}});
 console.log(data);
 
 Core_State_Set("users", "user-id", id);
 Core_State_Set("users", "user-data", data);
 
 var display = UI_Element_Create("users/user-main", {}, {language:"users/user-main"});
 
 // DROPDOWN SOURCES
 
 // 1. ROLES
 var element = UI_Element_Find(display, "user-role");
 Document_Select_AddOption(element, "", ""); 
 UI_Select_FromConfig(element, "roles");
 
 // 2. CENTERS
 var element = UI_Element_Find(display, "user-center");
 Document_Select_AddOption(element, "", ""); 
 var centers = Centers_Available();
 for(var center of centers) Document_Select_AddOption(element, center["name"], center["id"]);

 // 3. STATUSES
 var element = UI_Element_Find(display, "user-status");
 Document_Select_AddOption(element, "", ""); 
 UI_Select_FromDatapage(element, "users/statuses"); 

 // 4. NATIONALITIES
 var element = UI_Element_Find(display, "user-nationality");
 Document_Select_AddOption(element, "", ""); 
 UI_Select_FromConfig(element, "nationalities");
 
 // 5. GENDERS
 var element = UI_Element_Find(display, "user-gender");
 Document_Select_AddOption(element, "", ""); 
 UI_Select_FromDatapage(element, "users/genders"); 
 

 // STANDARD FIELDS
 for(var field in data)
 {
  var element = UI_Element_Find(display, "user-" + field);
  
  if(element)
  {
   Document_Input_Set(element, data[field]);
   Document_Element_SetData(element, "field", field);
   
   // ON VALUE CHANGE - UPDATE
   element.onchange =
   async function(event)
   {
	console.log("update");
	
    var element = event.currentTarget;
    var field   = Document_Element_GetData(element, "field");
	var value   = Document_Input_Get(element);
	
	var user_id = Core_State_Get("users", "user-id");
	
    await Core_Api("User_Update_Field", {user_id, field, value});
   }
   
  }
 
 }
 
 
 // SPECIAL FIELDS
 
 // PICTURE
 var element = UI_Element_Find(display, "user-picture");
 await User_Picture_Load(element, data, undefined, true);
 Document_CSS_SetClass(element, "style-clickable");
 element.onclick =
 function(event)
 {
  var element = event.currentTarget;
  var user_id = Core_State_Get("users", "user-id");
  
  User_Picture_Upload(user_id, {update:[element]});
 }
 
 
 // FAMILY
 var element = UI_Element_Find(display, "user-family_id");
 Document_CSS_SetClass(element, "style-clickable");
 var family = data["family"];
 if(family)
 {
  element.value = family["name"] || family["id"];
 }
 element.onclick = Users_User_ChangeFamily;

 // MANAGER
 var element = UI_Element_Find(display, "user-manager_id");
 Document_CSS_SetClass(element, "style-clickable");
 var manager = data["manager"];
 if(manager)
 {
  var firstname = manager["firstname"] || "";
  var lastname  = manager["lastname"]  || "";
  
  element.value = [firstname, lastname].join(" ").trim();
 }
 element.onclick = Users_User_ChangeManager;
 
 
 
 // APPLY PERMISSIONS
 var editable = User_Config("edit-user-fields", "").split(",");
 
 var elements = Document_Element_FindChildren(display, "field", undefined, ["recurse"]);
 for(var element of elements)
 {
  var field = Document_Element_GetData(element, "field");
  if(!editable.includes(field))
  {
   Document_Element_Disable(element);
  }
 }
 
 
 
 return display;
}



async function Users_User_ChangeFamily(event)
{
 var element  = event.currentTarget;
 var user     = Core_State_Get("users", "user-data");
 
 var center   = User_Center();
 var families = await Core_Api("Families_List_ByCenter", {center});
 
 var title    = UI_Language_String("users/popups", "select family title");
 var family   = await UI_Popup_SelectData(title, families, {id:true, name:true, type:Core_Data_Page("families/types")}, "families/table-fields");
 
 if(family && user["family_id"] != family["id"])
 {  
  // UPDATE DB
  Core_Api("User_Update_Field", {user_id:user["id"], field:"family_id", value:family["id"]});
  
  // UPDATE MEMORY
  user["family_id"] = family["id"];
  
  // UPDATE DISPLAY
  element.value = family["name"] || family["id"];
 }
}


async function Users_User_ChangeManager(event)
{  
 var element = event.currentTarget;
 var user    = Core_State_Get("users", "user-data")
 var role    = Core_Config(["roles", user["role"], "managed-by"], "none").split(",");

 var center = Array_From_Fields(Centers_Available(), "id");
 if(center.length == 0) center = [User_Center()];

 var users   = await Core_Api("Users_List_ByCenter", {role, center, fields:"id,firstname,lastname", order:"firstname,lastname"});
 var manager = await Users_Popup_SelectFromList(users, {firstname:true, lastname:true}, "users/table-fields");

 if(manager && manager["id"] != user["manager_id"])
 {
  // UPDATE DB
  Core_Api("User_Update_Field", {user_id:user["id"], field:"manager_id", value:manager["id"]});
  
  // UPDATE MEMORY
  user["manager_id"] = manager["id"];
  
  // UPDATE DISPLAY
  var firstname = manager["firstname"] || "";
  var lastname  = manager["lastname"]  || "";

  element.value = [firstname, lastname].join(" ").trim(); 
 }
}








// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                             M O R E                                            //
//                                                                                                //
// -----------------------------------------------------------------------------------------------//

async function Users_User_DisplayMore(user)
{
 if(typeof user != "object") var user = await Core_Api("User_Read", {user_id:user, options:{fields:"id,role"}});
  
 var display = UI_Element_Create("users/user-more");
 
 var edit   = User_Config("edit-user-data", "").split(",");
 var items  = {};
 
 // BUILD HEADER BASED ON ROLE INFORMATION + PARTNER CONFIGURATION
 var data = User_Role_Config(user["role"], "user-data", "").split(",");
 for(var field of data)
 { 
  // IS THE CURRENT USER ALLOWED TO SEE THIS PAGE?
  if(edit.includes(field))
  {
   var item        = {};
   item["text"]    = UI_Language_String("users/user-more", field);
   item["icons"]   = [];
   item["onclick"] = Safe_Function("Users_More_Display" + String_Capitalize_Initial(field), function(){});
   items[field]    = item;
  }
 }
 
 var header = UI_Header("header-more", items, {selectfirst:false, css:"color-noted", template:"standard"}); 
 
 UI_Element_Find(display, "header").appendChild(header);
 return display;
}



async function Users_More_DisplayFamily(event)
{
 var element  = event.currentTarget;
 var user     = Core_State_Get("users", "user-data");
 
 // DISPLAY
 var container = UI_Element_Find("user-more");
 
 // BUTTONS
 var buttons           = UI_Element_Find(container, "buttons");
 buttons.innerHTML     = "";
 buttons.style.display = "none";
 
 if(user["family_id"])
 {
  var display    = await Users_Family_DisplayMain(user["family_id"]);
  
  var data       = UI_Element_Find(container, "data");
  data.innerHTML = "";
  data.appendChild(display);
 }
 else
 {
 }
 
}



async function Users_More_DisplayClasses(event)
{
 var user    = Core_State_Get("users", "user-data");
 var classes = await Core_Api("Classes_List_ByStudent", {student_id:user["id"]});
 
 for(var item of classes)
 {
  item["period"] = Date_Format_Period(Date_Now(), item["date_start"], {locale:UI_Language_Current(true), conversational:true});
 }
 
 var list = UI_List_Items(classes, ["style-outlined-accented", "outline-inner"], Users_More_DisplayClass, {style:"vertical", overflow:true, sections:"period"},
 // ITEMS
 function(item)
 {
  var info    = Class_Info(item);
  
  var element = UI_Element_Create("users/more-class-item", info);
  Document_Element_SetObject(element, "item", item);
  
  return element;
 },

 // SECTIONS
 function(section, item)
 {
  var element = UI_Element_Create("users/more-class-section", {period:section.toUpperCase()});  
  return element;
 });
 
 
 // DISPLAY
 var container = UI_Element_Find("user-more");
 
 // BUTTONS
 var buttons           = UI_Element_Find(container, "buttons");
 buttons.innerHTML     = "";
 buttons.style.display = "none";


 var data       = UI_Element_Find(container, "data");
 data.innerHTML = "";
 data.appendChild(list);
}



async function Users_More_DisplayPlacements(event)
{
 var user    = Core_State_Get("users", "user-data");
 var classes = await Core_Api("Classes_List_ByStudent", {student_id:user["id"], options:{types:["placement"]}});
 
 for(var item of classes)
 {
  item["period"] = Date_Format_Period(Date_Now(), item["date_start"], {locale:UI_Language_Current(true), conversational:true});
 }
 
 var list = UI_List_Items(classes, ["style-outlined-accented", "outline-inner"], Users_More_DisplayClass, {style:"vertical", overflow:true, sections:"period"},
 // ITEMS
 function(item)
 {
  var info    = Class_Info(item);
  
  var element = UI_Element_Create("users/more-class-item", info);
  Document_Element_SetObject(element, "item", item);
  
  return element;
 },

 // SECTIONS
 function(section, item)
 {
  var element = UI_Element_Create("users/more-class-section", {period:section.toUpperCase()});  
  return element;
 });

 
 // DISPLAY
 var container  = UI_Element_Find("user-more");
 
 // DATA
 var data       = UI_Element_Find(container, "data");
 data.innerHTML = "";
 data.appendChild(list);

 // BUTTONS
 var buttons           = UI_Element_Find(container, "buttons");
 buttons.innerHTML     = "";
 buttons.style.display = "flex";
 
 var text       = UI_Language_String("users/user-more", "button book placement");
 var button     = UI_Element_Create("core/button-medium-plain", {text});
 button.onclick = 
 async function()
 {
  var student = user["id"];
  var center  = User_Center(); // CURRENTLY SELECTED CENTER ONLY
  
  var seat    = await User_More_BookPlacement(student, center);
  console.log("booked " + seat);
  
  // IF BOOKED, RELOAD DATA
  if(seat)
  {
   Users_More_DisplayPlacements();
  }
 }
 
 buttons.appendChild(button);
}




async function User_More_BookPlacement(student, center)
{ 
 // CONFIGURE AND LAUNCH A CLASS SEARCH POPUP WITH AUTOSEARCH AND BOOKING
 var seat = await Classes_Search_Popup(
 {
  type:      "placement", 
  center,
  datefrom:  Date_Now(),
  dateto:    Date_Add_Days(Date_Now(), 60),
  seats:     "yes"
 },
    
 {
  autosearch:true,
  book:true
 },

 {
  student
 });
 
 return seat;
}




async function Users_More_DisplayClass(element)
{
 var item = Document_Element_GetObject(element, "item");
 await Class_Display(item["id"]);
}




async function Users_More_DisplayFiles(event)
{
 // DISPLAY
 var container  = UI_Element_Find("user-more");
  
 // BUTTONS
 var buttons           = UI_Element_Find(container, "buttons");
 buttons.innerHTML     = "";
 buttons.style.display = "none";
 
 var user       = Core_State_Get("users", "user-data");
 var files      = await Core_Api("User_Files_List", {id:user["id"], folder:"documents"});
 
 var list       = UI_List_Files(files, "download", {style:"icons"});
  
 var data       = UI_Element_Find(container, "data");
 data.innerHTML = "";
 data.appendChild(list);
}




async function Users_More_DisplayPermissions(event)
{
 var user_id = Core_State_Get("users", "user-id");
  
 // READ PERMISSIONS
 var permissions = await Core_Api("User_Config_Read", {user_id, file:"permissions"});
 
 
 // DISPLAY
 var container  = UI_Element_Find("user-more");
  
 // BUTTONS
 var buttons           = UI_Element_Find(container, "buttons");
 buttons.innerHTML     = "";
 buttons.style.display = "none";
 
 
 // CENTERS
 var page       = UI_Element_Create("users/user-more-permissions", {}, {language:"users/user-more"});
 
 var allcenters = Centers_List();
 var centers    = [];
 for(var id in allcenters)
 {
  var item      = {};
  
  item["id"]    = id;
  item["text"]  = allcenters[id]["name"] || id;
  item["value"] = Safe_Get(permissions, ["centers", id]);
  
  centers.push(item);
 }
 
 var list    = UI_Checklist(centers, "plain",
 async function(item, items)
 {
  var user_id = Core_State_Get("users", "user-id");
  var centers = {};
  
  for(var item of items)
  {
   if(item["value"])
   {
	var id = item["id"];
	centers[id] = true;
   }
  }
  
  await Core_Api("User_Config_WriteSection", {user_id, file:"permissions", section:"centers", data:centers});
 });
 
 
 UI_Element_Find(page, "centers").appendChild(list);
  
 var data       = UI_Element_Find(container, "data");
 data.innerHTML = "";
 data.appendChild(page);
}// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                         U S E R S                                              //
//                                                                                                //
// -----------------------------------------------------------------------------------------------//

function User_Folder(id)
{
 var folder = id;
 
 return folder;
}



function User_Role()
{
 return Safe_Get(application, ["user", "role"], "none");
}



function User_Center()
{
 return Safe_Get(application, ["user", "center"], "none");
}




function User_Settings_Get(section, field, def)
{
 return Safe_Get(application, ["user", "settings", section, field], def);
}



async function User_Settings_Set(section, field, value)
{
 Safe_Set(application, ["user", "settings", section, field], value);
 
 await Core_Api("User_Config_WriteValue", {file:"settings", section, field, value});
}





async function User_Read(current, options = {settings:true, permissions:true})
{
 var user = Safe_Get(application, ["user"], {});
 
 if(!current)
 {
  var data = await Core_Api("User_Read", {options});
  Object.assign(user, data);
 }
 
 return user;
}




async function User_Content_Access(user_id = -1)
{
 var content = {};

 var items   = await Core_Api("User_Products_List", {user_id});
 for(var item of items)
 { 
  var product = Core_Config(["products", item["product"]], false);
 
  if(product)
  {
   var program  = product["program"];
   if(!content[program]) content[program] = [];
       
   var features = item["features"] || {};
   for(var feature in features)
   {
    var enable = product[feature] || "";
    var enable = enable.split(",");
       
    content[program].push(...enable);
   }
  }
 }
 
 return content;
}




function User_Id()
{
 var id = Safe_Get(application, ["user", "id"]);
 
 return id;
}




function User_Can(what, def = "no")
{
 var role  = User_Role();
 
 var value = Core_Config(["roles", role, "can-" + what], def);
 
 // EXPLICIT RETURN OF CAN STRING
 if(def == "what")
 {
  var can = value;
 }
 else
 // RETURN BOOLEAN EVALUATION
 {
  var can = (value == "yes");
 }
 
 return can;
}




function User_Flag(what, flag, defaulttoall)
{
 var role  = User_Role();
 var flags = Core_Config(["roles", User_Role(), what], ""); 
 
 if(flags == "all") return true;
 if(defaulttoall && flags == "") return true;
 
 flags = Array_From_String(flags);
 return flags.includes(flag);
}



function User_Config(what, def = false)
{
 var role  = User_Role();
 
 var value = Core_Config(["roles", User_Role(), what], def);
 
 return value;
}





function User_Role_Config(role, what, def = false)
{ 
 var value = Core_Config(["roles", User_Role(), what], def);
 
 return value;
}







async function User_View_Popup(id, options = {})
{
 var user  = await Core_Api("User_Read", {user_id:id, options:{fields:"id,firstname,lastname,role,center,mobile,email"}});
 var popup = await UI_Popup_Create({}, [], "users/popup-view", {open:false, escape:true});
 
 User_Picture_Load(UI_Element_Find(popup, "propic"), user);
 
 UI_Element_Find(popup, "name").innerHTML = user["firstname"] + " " + user["lastname"];
 UI_Element_Find(popup, "id").innerHTML   = id;

 UI_Element_Find(popup, "data-role").innerHTML   = UI_Language_Object(Core_Config(["roles", user["role"] || ""], {}), "");
 UI_Element_Find(popup, "data-center").innerHTML = Centers_Name(user["center"] || "");
 UI_Element_Find(popup, "data-mobile").innerHTML = user["mobile"] || "";
 UI_Element_Find(popup, "data-email").innerHTML  = user["email"]  || "";

 await UI_Popup_Show(popup);
}




function User_Card(user, template = "standard", more = false)
{
 var card = UI_Element_Create("users/card-" + template);
 
 // PICTURE
 var element = UI_Element_Find(card, "picture");
 if(user["id"])
 {
  User_Picture_Load(element, user);
 }
 else
 {
  element.style.visibility = "hidden";
 }
 
 // NAME
 for(var field of ["firstname", "lastname"])
 {
  var element = UI_Element_Find(card, field);
  
  if(element)
  {
   element.innerHTML = user[field] || "";
  }
 }
 
 // MORE
 if(more)
 {
  var element = UI_Element_Find(card, "more");
  element.style.display = "flex";
  element.appendChild(more);
 }
 
 Document_Element_SetObject(card, "user", user);
 
 return card;
}




async function Users_Popup_SelectFromList(users = [], fields = {firstname:true, lastname:true}, language, title = false)
{
 var promise = new Promise((resolve, reject) =>
 {
  var title   = title || UI_Language_String("users/popups", "select list title");
  var text    = UI_Language_String("users/popups", "select list button");
  
  var content = UI_Element_Create("users/popup-select-box");
  var table   = UI_Table_Data(users, fields, language)
  content.appendChild(table);
 
  var onclick = 
  function(popup)
  {
   UI_Popup_Close(popup);
   
   var row = Document_Element_GetObject(table, "selected-row");
   if(row)
   {
	var user = Document_Element_GetObject(row, "item");
   }
   else
   {
	var user = false;
   }
   
   resolve(user);
  }

  var onescape =
  function()
  {
   resolve(false);
  }
 
  UI_Popup_Create({title, content}, [{text, onclick}], "flexi", {escape:true, open:true, onescape});  
 });
 
 return promise;
}




async function Users_Popup_SelectFromSearch(centers = [], roles = [], fields = "firstname,lastname", count = 100, order = "id")
{
 var promise = new Promise((resolve, reject) =>
 {
  var title   = UI_Language_String("users/popups", "select list title");
  var text    = UI_Language_String("users/popups", "select list button");
  
  var content = UI_Element_Create("users/popup-select-search", {}, {language:"users/popups"});
  var table   = false;
  
  // DEBOUNCEABLE SEARCH FUNCTION
  var update_timeout = false;
  function update()
  {
   if(update_timeout) clearTimeout(update_timeout);
   
   update_timeout = setTimeout(
   async function()
   {
	var search =
	{
     centers,
	 roles,
	 fields,
	 count,
	 order
	}
	
	// GET OTHER SEARCH VALUES FROM THE POPUP
	for(var field of ["lastname", "firstname", "email", "mobile", "id"]) search[field] = UI_Element_Find(content, field).value;	

    var users       = await Core_Api("Users_Search", {search});
	
	var tablefields = {id:true};
	for(var field of fields.split(",")) tablefields[field] = true;
	table     = UI_Table_Data(users, tablefields, "users/table-fields")
	
    var display = UI_Element_Find(content, "users");
	display.innerHTML = "";
	display.appendChild(table);
  
	update_timeout = false;
   }, 1000);
  }
  
 
  // FIELDS
  for(var field of ["lastname", "firstname", "email", "mobile", "id"])
  {
   var element  = UI_Element_Find(content, field);
    
   element.onkeypress  = update;
   element.onblur      = update;
  }
 
  
  var onclick = 
  function(popup)
  {
   UI_Popup_Close(popup);
   
   var row = Document_Element_GetObject(table, "selected-row");
   if(row)
   {
	var user = Document_Element_GetObject(row, "item");
   }
   else
   {
	var user = false;
   }
   
   resolve(user);
  }


  var onescape =
  function()
  {
   resolve(false);
  }
 
  UI_Popup_Create({title, content}, [{text, onclick}], "flexi", {escape:true, open:true, onescape});  
 });
 
 return promise;
}





async function User_Picture_Load(picture, user, role = "generic", hide = false)
{
 if(typeof user == "object") var id = user["id"]; else var id = user;
 
 var role = user["role"] || role || "generic";
 
 if(hide) picture.style.visibility = "hidden";
 
 var image    = Resources_URL("propic.jpg", "user", id);
 var fallback = Resources_URL("images/default/propic-" + role + ".png"); 
 var generic  = Resources_URL("images/default/propic-generic.png"); 
 
 var result   = await Document_Image_Load(picture, [image, fallback, generic], {nocache:true});
 
 if(hide && result != "hide") picture.style.visibility = "visible";
}





async function User_Picture_Upload(user_id, options)
{
 var files = await Storage_File_Select({accept:".jpg"});
 var file  = files[0];
 
 var data = await Storage_File_Read(file, {whole:true});
 
 var blob = await Document_Image_Resize(data, 
 {
  constraints:
  {
   width:  400, 
   height: 400
  }, 
  
  format:"image/jpg", 
  
  quality:0.5
 });
 
 
 // READ DATA ONLY AND STORE
 if(!user_id) var user_id = User_Id();
 
 var data = await Storage_File_Read(blob, {whole:false}); 
 Storage_File_Upload("propic.jpg", data, "image/jpg", "api.php?direct&f=User_Files_Upload&id=" + user_id + "", {});
 
 // READ AS A WHOLE INCLUDING BASE64 HEADER, AND DISPLAY ON BIG PICTURE AND PROPIC IN THE MENU BAR
 var picture = await Storage_File_Read(blob, {whole:true});  
 
 if(options["update"]) 
 {
  var elements = options["update"] || [];
  
  for(var element of elements)
  {
   if(options["animate"]) Document_Element_Animate(element, "rubberBand 0.5s linear 1");
   
   element.src = picture;
  }
 }

}