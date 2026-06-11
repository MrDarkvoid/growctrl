var W=globalThis,V=W.ShadowRoot&&(W.ShadyCSS===void 0||W.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Q=Symbol(),fe=new WeakMap,L=class{constructor(n,e,t){if(this._$cssResult$=!0,t!==Q)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=n,this.t=e}get styleSheet(){let n=this.o,e=this.t;if(V&&n===void 0){let t=e!==void 0&&e.length===1;t&&(n=fe.get(e)),n===void 0&&((this.o=n=new CSSStyleSheet).replaceSync(this.cssText),t&&fe.set(e,n))}return n}toString(){return this.cssText}},ve=o=>new L(typeof o=="string"?o:o+"",void 0,Q),R=(o,...n)=>{let e=o.length===1?o[0]:n.reduce((t,i,s)=>t+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+o[s+1],o[0]);return new L(e,o,Q)},_e=(o,n)=>{if(V)o.adoptedStyleSheets=n.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of n){let t=document.createElement("style"),i=W.litNonce;i!==void 0&&t.setAttribute("nonce",i),t.textContent=e.cssText,o.appendChild(t)}},Y=V?o=>o:o=>o instanceof CSSStyleSheet?(n=>{let e="";for(let t of n.cssRules)e+=t.cssText;return ve(e)})(o):o;var{is:Ke,defineProperty:je,getOwnPropertyDescriptor:Ze,getOwnPropertyNames:qe,getOwnPropertySymbols:Xe,getPrototypeOf:Je}=Object,b=globalThis,be=b.trustedTypes,Qe=be?be.emptyScript:"",Ye=b.reactiveElementPolyfillSupport,M=(o,n)=>o,ee={toAttribute(o,n){switch(n){case Boolean:o=o?Qe:null;break;case Object:case Array:o=o==null?o:JSON.stringify(o)}return o},fromAttribute(o,n){let e=o;switch(n){case Boolean:e=o!==null;break;case Number:e=o===null?null:Number(o);break;case Object:case Array:try{e=JSON.parse(o)}catch{e=null}}return e}},ye=(o,n)=>!Ke(o,n),xe={attribute:!0,type:String,converter:ee,reflect:!1,useDefault:!1,hasChanged:ye};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),b.litPropertyMetadata??(b.litPropertyMetadata=new WeakMap);var _=class extends HTMLElement{static addInitializer(n){this._$Ei(),(this.l??(this.l=[])).push(n)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(n,e=xe){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(n)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(n,e),!e.noAccessor){let t=Symbol(),i=this.getPropertyDescriptor(n,t,e);i!==void 0&&je(this.prototype,n,i)}}static getPropertyDescriptor(n,e,t){let{get:i,set:s}=Ze(this.prototype,n)??{get(){return this[e]},set(r){this[e]=r}};return{get:i,set(r){let l=i?.call(this);s?.call(this,r),this.requestUpdate(n,l,t)},configurable:!0,enumerable:!0}}static getPropertyOptions(n){return this.elementProperties.get(n)??xe}static _$Ei(){if(this.hasOwnProperty(M("elementProperties")))return;let n=Je(this);n.finalize(),n.l!==void 0&&(this.l=[...n.l]),this.elementProperties=new Map(n.elementProperties)}static finalize(){if(this.hasOwnProperty(M("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(M("properties"))){let e=this.properties,t=[...qe(e),...Xe(e)];for(let i of t)this.createProperty(i,e[i])}let n=this[Symbol.metadata];if(n!==null){let e=litPropertyMetadata.get(n);if(e!==void 0)for(let[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(let[e,t]of this.elementProperties){let i=this._$Eu(e,t);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(n){let e=[];if(Array.isArray(n)){let t=new Set(n.flat(1/0).reverse());for(let i of t)e.unshift(Y(i))}else n!==void 0&&e.push(Y(n));return e}static _$Eu(n,e){let t=e.attribute;return t===!1?void 0:typeof t=="string"?t:typeof n=="string"?n.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(n=>this.enableUpdating=n),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(n=>n(this))}addController(n){(this._$EO??(this._$EO=new Set)).add(n),this.renderRoot!==void 0&&this.isConnected&&n.hostConnected?.()}removeController(n){this._$EO?.delete(n)}_$E_(){let n=new Map,e=this.constructor.elementProperties;for(let t of e.keys())this.hasOwnProperty(t)&&(n.set(t,this[t]),delete this[t]);n.size>0&&(this._$Ep=n)}createRenderRoot(){let n=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return _e(n,this.constructor.elementStyles),n}connectedCallback(){this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),this._$EO?.forEach(n=>n.hostConnected?.())}enableUpdating(n){}disconnectedCallback(){this._$EO?.forEach(n=>n.hostDisconnected?.())}attributeChangedCallback(n,e,t){this._$AK(n,t)}_$ET(n,e){let t=this.constructor.elementProperties.get(n),i=this.constructor._$Eu(n,t);if(i!==void 0&&t.reflect===!0){let s=(t.converter?.toAttribute!==void 0?t.converter:ee).toAttribute(e,t.type);this._$Em=n,s==null?this.removeAttribute(i):this.setAttribute(i,s),this._$Em=null}}_$AK(n,e){let t=this.constructor,i=t._$Eh.get(n);if(i!==void 0&&this._$Em!==i){let s=t.getPropertyOptions(i),r=typeof s.converter=="function"?{fromAttribute:s.converter}:s.converter?.fromAttribute!==void 0?s.converter:ee;this._$Em=i;let l=r.fromAttribute(e,s.type);this[i]=l??this._$Ej?.get(i)??l,this._$Em=null}}requestUpdate(n,e,t,i=!1,s){if(n!==void 0){let r=this.constructor;if(i===!1&&(s=this[n]),t??(t=r.getPropertyOptions(n)),!((t.hasChanged??ye)(s,e)||t.useDefault&&t.reflect&&s===this._$Ej?.get(n)&&!this.hasAttribute(r._$Eu(n,t))))return;this.C(n,e,t)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(n,e,{useDefault:t,reflect:i,wrapped:s},r){t&&!(this._$Ej??(this._$Ej=new Map)).has(n)&&(this._$Ej.set(n,r??e??this[n]),s!==!0||r!==void 0)||(this._$AL.has(n)||(this.hasUpdated||t||(e=void 0),this._$AL.set(n,e)),i===!0&&this._$Em!==n&&(this._$Eq??(this._$Eq=new Set)).add(n))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let n=this.scheduleUpdate();return n!=null&&await n,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(let[i,s]of this._$Ep)this[i]=s;this._$Ep=void 0}let t=this.constructor.elementProperties;if(t.size>0)for(let[i,s]of t){let{wrapped:r}=s,l=this[i];r!==!0||this._$AL.has(i)||l===void 0||this.C(i,void 0,s,l)}}let n=!1,e=this._$AL;try{n=this.shouldUpdate(e),n?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(t){throw n=!1,this._$EM(),t}n&&this._$AE(e)}willUpdate(n){}_$AE(n){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(n)),this.updated(n)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(n){return!0}update(n){this._$Eq&&(this._$Eq=this._$Eq.forEach(e=>this._$ET(e,this[e]))),this._$EM()}updated(n){}firstUpdated(n){}};_.elementStyles=[],_.shadowRootOptions={mode:"open"},_[M("elementProperties")]=new Map,_[M("finalized")]=new Map,Ye?.({ReactiveElement:_}),(b.reactiveElementVersions??(b.reactiveElementVersions=[])).push("2.1.2");var O=globalThis,$e=o=>o,K=O.trustedTypes,we=K?K.createPolicy("lit-html",{createHTML:o=>o}):void 0,Pe="$lit$",x=`lit$${Math.random().toFixed(9).slice(2)}$`,Te="?"+x,et=`<${Te}>`,w=document,H=()=>w.createComment(""),N=o=>o===null||typeof o!="object"&&typeof o!="function",ae=Array.isArray,tt=o=>ae(o)||typeof o?.[Symbol.iterator]=="function",te=`[ 	
\f\r]`,z=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Se=/-->/g,Ae=/>/g,y=RegExp(`>|${te}(?:([^\\s"'>=/]+)(${te}*=${te}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ce=/'/g,ke=/"/g,Le=/^(?:script|style|textarea|title)$/i,le=o=>(n,...e)=>({_$litType$:o,strings:n,values:e}),c=le(1),Re=le(2),Pt=le(3),S=Symbol.for("lit-noChange"),d=Symbol.for("lit-nothing"),Ee=new WeakMap,$=w.createTreeWalker(w,129);function Me(o,n){if(!ae(o)||!o.hasOwnProperty("raw"))throw Error("invalid template strings array");return we!==void 0?we.createHTML(n):n}var nt=(o,n)=>{let e=o.length-1,t=[],i,s=n===2?"<svg>":n===3?"<math>":"",r=z;for(let l=0;l<e;l++){let a=o[l],p,h,u=-1,m=0;for(;m<a.length&&(r.lastIndex=m,h=r.exec(a),h!==null);)m=r.lastIndex,r===z?h[1]==="!--"?r=Se:h[1]!==void 0?r=Ae:h[2]!==void 0?(Le.test(h[2])&&(i=RegExp("</"+h[2],"g")),r=y):h[3]!==void 0&&(r=y):r===y?h[0]===">"?(r=i??z,u=-1):h[1]===void 0?u=-2:(u=r.lastIndex-h[2].length,p=h[1],r=h[3]===void 0?y:h[3]==='"'?ke:Ce):r===ke||r===Ce?r=y:r===Se||r===Ae?r=z:(r=y,i=void 0);let g=r===y&&o[l+1].startsWith("/>")?" ":"";s+=r===z?a+et:u>=0?(t.push(p),a.slice(0,u)+Pe+a.slice(u)+x+g):a+x+(u===-2?l:g)}return[Me(o,s+(o[e]||"<?>")+(n===2?"</svg>":n===3?"</math>":"")),t]},D=class o{constructor({strings:n,_$litType$:e},t){let i;this.parts=[];let s=0,r=0,l=n.length-1,a=this.parts,[p,h]=nt(n,e);if(this.el=o.createElement(p,t),$.currentNode=this.el.content,e===2||e===3){let u=this.el.content.firstChild;u.replaceWith(...u.childNodes)}for(;(i=$.nextNode())!==null&&a.length<l;){if(i.nodeType===1){if(i.hasAttributes())for(let u of i.getAttributeNames())if(u.endsWith(Pe)){let m=h[r++],g=i.getAttribute(u).split(x),v=/([.?@])?(.*)/.exec(m);a.push({type:1,index:s,name:v[2],strings:g,ctor:v[1]==="."?ie:v[1]==="?"?se:v[1]==="@"?oe:k}),i.removeAttribute(u)}else u.startsWith(x)&&(a.push({type:6,index:s}),i.removeAttribute(u));if(Le.test(i.tagName)){let u=i.textContent.split(x),m=u.length-1;if(m>0){i.textContent=K?K.emptyScript:"";for(let g=0;g<m;g++)i.append(u[g],H()),$.nextNode(),a.push({type:2,index:++s});i.append(u[m],H())}}}else if(i.nodeType===8)if(i.data===Te)a.push({type:2,index:s});else{let u=-1;for(;(u=i.data.indexOf(x,u+1))!==-1;)a.push({type:7,index:s}),u+=x.length-1}s++}}static createElement(n,e){let t=w.createElement("template");return t.innerHTML=n,t}};function C(o,n,e=o,t){if(n===S)return n;let i=t!==void 0?e._$Co?.[t]:e._$Cl,s=N(n)?void 0:n._$litDirective$;return i?.constructor!==s&&(i?._$AO?.(!1),s===void 0?i=void 0:(i=new s(o),i._$AT(o,e,t)),t!==void 0?(e._$Co??(e._$Co=[]))[t]=i:e._$Cl=i),i!==void 0&&(n=C(o,i._$AS(o,n.values),i,t)),n}var ne=class{constructor(n,e){this._$AV=[],this._$AN=void 0,this._$AD=n,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(n){let{el:{content:e},parts:t}=this._$AD,i=(n?.creationScope??w).importNode(e,!0);$.currentNode=i;let s=$.nextNode(),r=0,l=0,a=t[0];for(;a!==void 0;){if(r===a.index){let p;a.type===2?p=new U(s,s.nextSibling,this,n):a.type===1?p=new a.ctor(s,a.name,a.strings,this,n):a.type===6&&(p=new re(s,this,n)),this._$AV.push(p),a=t[++l]}r!==a?.index&&(s=$.nextNode(),r++)}return $.currentNode=w,i}p(n){let e=0;for(let t of this._$AV)t!==void 0&&(t.strings!==void 0?(t._$AI(n,t,e),e+=t.strings.length-2):t._$AI(n[e])),e++}},U=class o{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(n,e,t,i){this.type=2,this._$AH=d,this._$AN=void 0,this._$AA=n,this._$AB=e,this._$AM=t,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let n=this._$AA.parentNode,e=this._$AM;return e!==void 0&&n?.nodeType===11&&(n=e.parentNode),n}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(n,e=this){n=C(this,n,e),N(n)?n===d||n==null||n===""?(this._$AH!==d&&this._$AR(),this._$AH=d):n!==this._$AH&&n!==S&&this._(n):n._$litType$!==void 0?this.$(n):n.nodeType!==void 0?this.T(n):tt(n)?this.k(n):this._(n)}O(n){return this._$AA.parentNode.insertBefore(n,this._$AB)}T(n){this._$AH!==n&&(this._$AR(),this._$AH=this.O(n))}_(n){this._$AH!==d&&N(this._$AH)?this._$AA.nextSibling.data=n:this.T(w.createTextNode(n)),this._$AH=n}$(n){let{values:e,_$litType$:t}=n,i=typeof t=="number"?this._$AC(n):(t.el===void 0&&(t.el=D.createElement(Me(t.h,t.h[0]),this.options)),t);if(this._$AH?._$AD===i)this._$AH.p(e);else{let s=new ne(i,this),r=s.u(this.options);s.p(e),this.T(r),this._$AH=s}}_$AC(n){let e=Ee.get(n.strings);return e===void 0&&Ee.set(n.strings,e=new D(n)),e}k(n){ae(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,t,i=0;for(let s of n)i===e.length?e.push(t=new o(this.O(H()),this.O(H()),this,this.options)):t=e[i],t._$AI(s),i++;i<e.length&&(this._$AR(t&&t._$AB.nextSibling,i),e.length=i)}_$AR(n=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);n!==this._$AB;){let t=$e(n).nextSibling;$e(n).remove(),n=t}}setConnected(n){this._$AM===void 0&&(this._$Cv=n,this._$AP?.(n))}},k=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(n,e,t,i,s){this.type=1,this._$AH=d,this._$AN=void 0,this.element=n,this.name=e,this._$AM=i,this.options=s,t.length>2||t[0]!==""||t[1]!==""?(this._$AH=Array(t.length-1).fill(new String),this.strings=t):this._$AH=d}_$AI(n,e=this,t,i){let s=this.strings,r=!1;if(s===void 0)n=C(this,n,e,0),r=!N(n)||n!==this._$AH&&n!==S,r&&(this._$AH=n);else{let l=n,a,p;for(n=s[0],a=0;a<s.length-1;a++)p=C(this,l[t+a],e,a),p===S&&(p=this._$AH[a]),r||(r=!N(p)||p!==this._$AH[a]),p===d?n=d:n!==d&&(n+=(p??"")+s[a+1]),this._$AH[a]=p}r&&!i&&this.j(n)}j(n){n===d?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,n??"")}},ie=class extends k{constructor(){super(...arguments),this.type=3}j(n){this.element[this.name]=n===d?void 0:n}},se=class extends k{constructor(){super(...arguments),this.type=4}j(n){this.element.toggleAttribute(this.name,!!n&&n!==d)}},oe=class extends k{constructor(n,e,t,i,s){super(n,e,t,i,s),this.type=5}_$AI(n,e=this){if((n=C(this,n,e,0)??d)===S)return;let t=this._$AH,i=n===d&&t!==d||n.capture!==t.capture||n.once!==t.once||n.passive!==t.passive,s=n!==d&&(t===d||i);i&&this.element.removeEventListener(this.name,this,t),s&&this.element.addEventListener(this.name,this,n),this._$AH=n}handleEvent(n){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,n):this._$AH.handleEvent(n)}},re=class{constructor(n,e,t){this.element=n,this.type=6,this._$AN=void 0,this._$AM=e,this.options=t}get _$AU(){return this._$AM._$AU}_$AI(n){C(this,n)}};var it=O.litHtmlPolyfillSupport;it?.(D,U),(O.litHtmlVersions??(O.litHtmlVersions=[])).push("3.3.3");var ze=(o,n,e)=>{let t=e?.renderBefore??n,i=t._$litPart$;if(i===void 0){let s=e?.renderBefore??null;t._$litPart$=i=new U(n.insertBefore(H(),s),s,void 0,e??{})}return i._$AI(o),i};var I=globalThis,f=class extends _{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e;let n=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=n.firstChild),n}update(n){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(n),this._$Do=ze(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return S}};f._$litElement$=!0,f.finalized=!0,I.litElementHydrateSupport?.({LitElement:f});var st=I.litElementPolyfillSupport;st?.({LitElement:f});(I.litElementVersions??(I.litElementVersions=[])).push("4.2.2");var ce=[{name:"Keimung",days:7},{name:"Steckling",days:14},{name:"Vegetativ",days:28},{name:"Bl\xFCte",days:56},{name:"Sp\xFClen",days:10}];function Oe(o){return .61078*Math.exp(17.27*o/(o+237.3))}function He(o,n,e=-2){let t=Oe(o+e)-Oe(o)*(n/100);return Math.max(0,Math.round(t*100)/100)}var E=[{max:.4,label:"Zu niedrig",color:"#4f7cd1"},{max:.8,label:"Steckling",color:"#5db17a"},{max:1.2,label:"Vegetativ",color:"#3e9d52"},{max:1.6,label:"Bl\xFCte",color:"#d9a13b"},{max:2.4,label:"Zu hoch",color:"#cf5b4c"}],pe=2.4;function Ne(o){for(let n of E)if(o<=n.max)return n;return E[E.length-1]}var ot=5*60*1e3,rt=10*60*1e3,de=48,B=new Map;function at(o){if(o.length<=de)return o;let n=[],e=o.length/de;for(let t=0;t<de;t++)n.push(o[Math.floor(t*e)]);return n[n.length-1]=o[o.length-1],n}async function he(o,n,e){let t=`${n}:${e}`,i=B.get(t),s=Date.now();if(i){if(i.pending)return i.pending;if(s-i.fetchedAt<ot)return i.points}let l=`history/period/${new Date(s-e*3600*1e3).toISOString()}?filter_entity_id=${encodeURIComponent(n)}&minimal_response&no_attributes&significant_changes_only`,a=o.callApi("GET",l).then(p=>{let h=p&&p[0]||[],u=at(h.map(m=>parseFloat(m.state??m.s)).filter(m=>Number.isFinite(m)));return B.set(t,{fetchedAt:Date.now(),points:u}),u}).catch(()=>(B.set(t,{fetchedAt:Date.now(),points:i?.points??[]}),i?.points??[]));return B.set(t,{fetchedAt:i?.fetchedAt??0,points:i?.points??[],pending:a}),a}function P(o,n){return B.get(`${o}:${n}`)?.points}var G=new Map;async function De(o,n){let e=G.get(n),t=Date.now();if(e){if(e.pending)return e.pending;if(t-e.fetchedAt<rt)return e.events}let i=new Date(t-120*86400*1e3).toISOString(),s=new Date(t+30*86400*1e3).toISOString(),r=`calendars/${n}?start=${encodeURIComponent(i)}&end=${encodeURIComponent(s)}`,l=o.callApi("GET",r).then(a=>{let p=(a||[]).map(h=>({summary:h.summary??"",description:h.description??void 0,start:h.start?.dateTime??h.start?.date??h.start??""})).sort((h,u)=>h.start<u.start?1:-1);return G.set(n,{fetchedAt:Date.now(),events:p}),p}).catch(()=>(G.set(n,{fetchedAt:Date.now(),events:e?.events??[]}),e?.events??[]));return G.set(n,{fetchedAt:e?.fetchedAt??0,events:e?.events??[],pending:l}),l}function j(o){return G.get(o)?.events}function Ue(o,n=100,e=26){if(!o||o.length<2)return null;let t=Math.min(...o),s=Math.max(...o)-t||1,r=n/(o.length-1),l=o.map((a,p)=>{let h=(p*r).toFixed(1),u=(e-2-(a-t)/s*(e-4)).toFixed(1);return`${h},${u}`}).join(" ");return Re`
    <svg class="spark" viewBox="0 0 ${n} ${e}" preserveAspectRatio="none" aria-hidden="true">
      <polyline points=${l} fill="none" stroke="currentColor"
        stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round" opacity="0.55"/>
    </svg>`}function T(o){if(!o||o==="unknown"||o==="unavailable")return null;let n=new Date(o.includes("T")?o:o.replace(" ","T"));return Number.isNaN(n.getTime())?null:n}function Z(o){let n=Date.now()-o.getTime();return Math.max(1,Math.floor(n/864e5)+1)}function ue(o){let n=T(o);return n?n.toLocaleDateString("de-DE",{day:"2-digit",month:"2-digit",year:"numeric"}):o}function me(o,n,e){if(!o||o.length<2)return null;let t=Math.min(...o),i=Math.max(...o),s=i-t||1,r=t-s*.1,l=s*1.2,a=n/(o.length-1),p=o.map((h,u)=>`${(u*a).toFixed(1)},${(e-(h-r)/l*e).toFixed(1)}`);return{line:p.join(" "),area:`M0,${e} L${p.join(" L")} L${n},${e} Z`,min:t,max:i}}var q=o=>!o||["unknown","unavailable",""].includes(o),ge=o=>o.length>=16?o.substring(11,16):"";function Ie(o){if(q(o))return{level:"none",label:"\u2014",ts:""};let n=o,e=ge(n);if(n.includes("SENSOR INVALID"))return{level:"critical",label:"\u{1F6A8} Sensor ung\xFCltig \u2014 Befeuchtung gesperrt",ts:e};if(n.includes("MAINTENANCE"))return{level:"info",label:"\u{1F527} Wartungsmodus aktiv",ts:e};if(n.includes("TESTMODE"))return{level:"info",label:"\u{1F9EA} Testmodus aktiv",ts:e};if(n.includes("AUTO OFF"))return{level:"info",label:"\u{1F534} Klima-Automatik deaktiviert",ts:e};let t=n.match(/(?:IST|SOLL)\s+(?:F|CIRC)=(\w+)/i)?.[1]?.toLowerCase(),i=n.match(/IST\s+(?:CIRC|F)=\w+\s+HUM=(\w+)/i)?.[1]?.toUpperCase(),s=n.match(/REQ=(\w+)/i)?.[1]?.toUpperCase();if(i!==void 0){let r=[];return t==="on"?r.push("Umluft AN"):t==="manual"?r.push("Umluft Manuell"):t==="off"&&r.push("Umluft AUS"),r.push(i==="ON"?"Befeuchtung AN":"Befeuchtung AUS"),r.push(s==="ON"?"Entfeuchtung AN":"Entfeuchtung AUS"),n.includes("ZENTRAL-BLOCK")&&r.push("(Zentral-Block)"),{level:"ok",label:r.join(" \xB7 "),ts:e}}return{level:"ok",label:n.replace(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}\s*/,"").substring(0,45),ts:e}}function Be(o){if(q(o))return{level:"none",label:"\u2014",ts:""};let n=o,e=ge(n);if(n.includes("FAILSAFE LIGHT"))return{level:"critical",label:"\u{1F6A8} Failsafe: Licht-Zwangsabschaltung \u2014 Auto deaktiviert",ts:e};if(n.includes("FAILSAFE PUMP"))return{level:"critical",label:"\u{1F6A8} Failsafe: Pumpen-Zwangsabschaltung \u2014 Auto deaktiviert",ts:e};if(n.includes("TIME INVALID"))return{level:"critical",label:"\u26A0\uFE0F Lichtzeiten nicht konfiguriert",ts:e};if(n.includes("MISMATCH")){let h=n.match(/IST.*?\bL=(\w+)/i)?.[1],u=n.match(/SOLL.*?\bL=(\w+)/i)?.[1],m=n.match(/IST.*?\bP=(\w+)/i)?.[1],g=n.match(/SOLL.*?\bP=(\w+)/i)?.[1],v=n.match(/IST.*?\bO2=(\w+)/i)?.[1],A=n.match(/SOLL.*?\bO2=(\w+)/i)?.[1],F=[];return h&&u&&h!==u&&F.push(`Licht (IST ${h.toUpperCase()} / SOLL ${u.toUpperCase()})`),m&&g&&m!==g&&F.push(`Pumpe (IST ${m.toUpperCase()} / SOLL ${g.toUpperCase()})`),v&&A&&v!==A&&F.push(`O\u2082 (IST ${v.toUpperCase()} / SOLL ${A.toUpperCase()})`),{level:"warning",label:"\u26A0\uFE0F Ger\xE4t antwortet nicht: "+(F.join(", ")||"Abweichung"),ts:e}}if(n.includes("MAINTENANCE"))return{level:"info",label:"\u{1F527} Wartungsmodus aktiv",ts:e};if(n.includes("TESTMODE"))return{level:"info",label:"\u{1F9EA} Testmodus aktiv",ts:e};let t=n.match(/IST.*?\bL=(\w+)/i)?.[1],i=n.match(/IST.*?\bP=(\w+)/i)?.[1],s=n.match(/IST.*?\bO2=(\w+)/i)?.[1],r=n.includes("OVRUNTIL")?" (Override aktiv)":"",l=[t&&t!=="n/a"?t==="on"?"\u{1F4A1} Licht AN":"\u{1F311} Licht AUS":null,i&&i!=="n/a"?i==="on"?"\u{1F4A7} Pumpe AN":"\u23F8\uFE0F Pumpe AUS":null,s&&s!=="n/a"?s==="on"?"\u{1FAE7} O\u2082 AN":"\u{1FAE7} O\u2082 AUS":null].filter(Boolean).join(" \xB7 "),a="";return n.includes("AUTO ON")?a="\u{1F7E2} Auto gestartet":n.includes("AUTO OFF")?a="\u{1F534} Auto gestoppt":n.match(/STAGE\s*→/)?a=`\u{1F331} Phase: ${n.match(/STAGE\s*→\s*(\w+)/)?.[1]||""}`:n.includes("LIGHT \u2192 ON")?a="\u{1F4A1} Licht eingeschaltet":n.includes("LIGHT \u2192 OFF")?a="\u{1F311} Licht ausgeschaltet":n.includes("PUMP \u2192 ON")?a="\u{1F4A7} Pumpe eingeschaltet":n.includes("PUMP \u2192 OFF")?a="\u23F8\uFE0F Pumpe ausgeschaltet":n.includes("O2 \u2192 ON")?a="\u{1FAE7} O\u2082 eingeschaltet":n.includes("FAN \u2192 ON")?a="\u{1F300} L\xFCfter eingeschaltet":n.includes("MANUAL OVERRIDE")?a="\u270B Manuell \xFCbersteuert":n.includes("OVERRIDE END")&&(a="\u2705 Override beendet"),{level:"ok",label:[a,l].filter(Boolean).join(" \u2014 ")+r||n.substring(17,55),ts:e}}function Ge(o){if(q(o))return{level:"none",label:"\u2014",ts:""};let n=o;return{level:"ok",label:n.replace(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}(:\d{2})?\s*/,"").substring(0,60),ts:ge(n)}}function Fe(o){if(q(o))return;let n=o.match(/IST.*?\bP=(\w+)/i);return n?n[1].toLowerCase()==="on":void 0}var lt=["pump","pumpe","co2","valve","ventil"],ct=/bloom|blüte|bluete|flush|spül|spuel/i,pt={seedling:"S\xE4mling",veg:"Wachstum",bloom:"Bl\xFCte",flush:"Sp\xFClung"},X=class extends f{constructor(){super(...arguments);this._activePlant=0;this._popup={kind:"none"};this._showSettings=!1;this._showExpert=!1;this._historyTick=0}static get properties(){return{hass:{attribute:!1},_config:{state:!0},_activePlant:{state:!0},_popup:{state:!0},_showSettings:{state:!0},_showExpert:{state:!0},_historyTick:{state:!0}}}setConfig(e){if(!e)throw new Error("Konfiguration fehlt");this._config=e,this._activePlant>=(e.plants?.length??0)&&(this._activePlant=0)}getCardSize(){return 8}static getConfigElement(){return document.createElement("growctrl-tent-card-editor")}static getStubConfig(){return{name:"Growzelt",mode:"dwc",climate:{temperature:"",humidity:"",leaf_offset:-2},badges:[],stats:[],logs:[],sensors:[],controls:[],settings:[],plants:[],sparkline_hours:24,chart_hours:24}}updated(e){if(super.updated(e),!this.hass||!this._config||!e.has("hass")&&!e.has("_config"))return;let t=this._config,i=()=>this._historyTick++,s=t.sparkline_hours??24;for(let r of t.sensors??[]){if(!r.entity)continue;let l=P(r.entity,s);he(this.hass,r.entity,s).then(a=>a!==l&&i())}if(t.show_chart!==!1&&t.climate?.temperature&&t.climate?.humidity){let r=t.chart_hours??24;for(let l of[t.climate.temperature,t.climate.humidity]){let a=P(l,r);he(this.hass,l,r).then(p=>p!==a&&i())}}for(let r of t.plants??[]){if(!r.calendar)continue;let l=j(r.calendar);De(this.hass,r.calendar).then(a=>a!==l&&i())}}_state(e){if(e)return this.hass?.states?.[e]?.state}_num(e){let t=this._state(e);if(t===void 0)return;let i=parseFloat(t);return Number.isFinite(i)?i:void 0}_unit(e){return e?this.hass?.states?.[e]?.attributes?.unit_of_measurement??"":""}_friendly(e,t){return t||this.hass?.states?.[e]?.attributes?.friendly_name||e}_stageLabel(e){return e?pt[e.toLowerCase()]??e:""}_moreInfo(e){this.dispatchEvent(new CustomEvent("hass-more-info",{bubbles:!0,composed:!0,detail:{entityId:e}}))}_isCriticalDefault(e){let t=`${e.entity} ${e.name??""}`.toLowerCase();return lt.some(i=>t.includes(i))}_toggle(e,t=!1){if(e.confirm??(t?!0:this._isCriticalDefault(e))){this._popup={kind:"confirm",control:e};return}this._doToggle(e.entity)}_doToggle(e){this.hass.callService("homeassistant","toggle",{entity_id:e}),this._popup={kind:"none"}}_timeToMin(e){if(!e)return;let i=(e.split(" ").pop()??e).match(/^(\d{1,2}):(\d{2})/);if(i)return parseInt(i[1],10)*60+parseInt(i[2],10)}_fmtDur(e){let t=Math.floor(e/60),i=Math.round(e%60);return t>0?`${t}h ${String(i).padStart(2,"0")}min`:`${i} min`}_settingValue(e){let t=this.hass?.states?.[e];if(!t)return"\u2013";let i=t.state,s=(i.split(" ").pop()??i).match(/^(\d{1,2}:\d{2})(:\d{2})?$/);if(s)return s[1];let r=parseFloat(i);if(Number.isFinite(r)&&/^[\d.,-]+$/.test(i)){let l=t.attributes?.unit_of_measurement;return l?`${r} ${l}`:`${r}`}return this._stageLabel(i)}_logLines(){return(this._config.logs??[]).filter(e=>e.entity).map(e=>{let t=this._state(e.entity),i=e.kind??"station",s=i==="climate"?Ie(t):i==="raw"?Ge(t):Be(t);return{name:this._friendly(e.entity,e.name),line:s}})}_statusInfo(){let e=this._config.status,t=this._logLines();if(!e&&!t.length)return;let i=t.map(a=>a.line.level);if(i.includes("critical"))return{label:"\u{1F6A8} Fehler",cls:"crit"};if(i.includes("warning"))return{label:"\u26A0\uFE0F Warnung",cls:"warn"};if(e?.dehum_entity&&this._state(e.dehum_entity)==="on")return{label:"\u{1F4A7} Entfeuchter AN",cls:"warn"};let s=this._num(this._config.climate?.temperature),r=e?.temp_min??18,l=e?.temp_max??30;return e&&s!==void 0&&(s<r||s>l)?{label:"\u26A0\uFE0F Temperatur!",cls:"warn"}:i.includes("info")?{label:"\u2139\uFE0F Info",cls:"info"}:{label:"\u2713 Alles OK",cls:"ok"}}render(){if(!this._config)return c``;let e=this._config;return!e.climate?.temperature||!e.climate?.humidity?c`<ha-card>
        <div class="setup-hint">
          <ha-icon icon="mdi:sprout"></ha-icon>
          <div>
            <b>GROWCTRL Tent Card</b><br />
            Bitte im Karten-Editor mindestens <b>Temperatur</b> und
            <b>Luftfeuchte</b> auswählen.
          </div>
        </div>
      </ha-card>`:c`<ha-card>
      <div class="ct">
        ${this._renderHeader()} ${this._renderHero()} ${this._renderChart()}
        ${this._renderStats()} ${this._renderLogs()}
        <div class="duo">
          ${this._renderSensors()} ${this._renderControls()}
        </div>
        ${this._renderGrow()}
        <div class="duo">
          ${this._renderPlants()} ${this._renderSettings()}
        </div>
        ${this._renderExpert()}
      </div>
      ${this._renderPopup()}
    </ha-card>`}_renderHeader(){let e=this._config,t=e.mode==="soil"?"Erde":"DWC",i=(e.badges??[]).filter(s=>s.entity&&this._state(s.entity)==="on");return c`<div class="header">
      <span class="title">${e.name??"Growzelt"}</span>
      <span class="hbadges">
        ${i.map(s=>c`<span class="badge hb">
            ${s.icon?c`<ha-icon icon=${s.icon}></ha-icon>`:d}
            ${this._friendly(s.entity,s.name)}
          </span>`)}
        <span class="badge mode">${t}</span>
      </span>
    </div>`}_renderHero(){let e=this._config.climate,t=this._num(e.temperature),i=this._num(e.humidity),s;e.vpd&&(s=this._num(e.vpd)),s===void 0&&t!==void 0&&i!==void 0&&(s=He(t,i,e.leaf_offset??-2));let r=s!==void 0?Ne(s):void 0,l=s!==void 0?Math.min(100,s/pe*100):void 0;return c`<div class="hero">
      <div class="hero-numbers">
        <div class="kpi" @click=${()=>this._moreInfo(e.temperature)}>
          <span class="kpi-value">${t!==void 0?t.toFixed(1):"\u2013"}</span>
          <span class="kpi-unit">°C</span>
          <span class="kpi-label">Temperatur</span>
        </div>
        <div class="kpi kpi-vpd" style=${r?`--zone:${r.color}`:""}>
          <span class="kpi-value">${s!==void 0?s.toFixed(2):"\u2013"}</span>
          <span class="kpi-unit">kPa</span>
          <span class="kpi-label">VPD · ${r?r.label:"\u2013"}</span>
        </div>
        <div class="kpi" @click=${()=>this._moreInfo(e.humidity)}>
          <span class="kpi-value">${i!==void 0?i.toFixed(0):"\u2013"}</span>
          <span class="kpi-unit">%</span>
          <span class="kpi-label">Luftfeuchte</span>
        </div>
      </div>
      <div class="vpd-scale">
        ${E.map((a,p)=>{let h=p===0?0:E[p-1].max,u=(a.max-h)/pe*100;return c`<div
            class="vpd-zone"
            style="width:${u}%;background:${a.color}"
            title="${a.label} (bis ${a.max} kPa)"
          ></div>`})}
        ${l!==void 0?c`<div class="vpd-marker" style="left:${l}%"></div>`:d}
      </div>
      ${this._renderBars()}
    </div>`}_lightInfo(){let e=this._config.light_schedule;if(!e?.on_helper||!e.off_helper)return;let t=this._state(this._config.grow?.phase_helper)??"",i=!!e.off_helper_bloom&&ct.test(t),s=this._timeToMin(this._state(e.on_helper)),r=this._timeToMin(i?this._state(e.off_helper_bloom):this._state(e.off_helper));if(s===void 0||r===void 0)return;let l=(r-s+1440)%1440||1440,a=1440-l,p=new Date,h=(p.getHours()*60+p.getMinutes()-s+1440)%1440,u=h<l,m=e.entity?this._state(e.entity)==="on":u,g=this._num(e.remaining_helper);if(g!==void 0)return m?{state:"on",pct:l?Math.min(100,g/l*100):0,text:`noch ${this._fmtDur(g)}`}:{state:"night",pct:a?Math.min(100,g/a*100):0,text:`AN in ${this._fmtDur(g)}`};if(m){let A=Math.min(h,l);return{state:"on",pct:A/l*100,text:`${this._fmtDur(A)} / ${this._fmtDur(l)}`}}return{state:"off",pct:0,text:`Aus \xB7 an um ${((this._state(e.on_helper)??"").split(" ").pop()??"").slice(0,5)}`}}_pumpInfo(){let e=this._config.pump_schedule;if(!e)return;let t=(this._state(this._config.grow?.phase_helper)??"").toLowerCase(),i=t.startsWith("seed")||t.startsWith("s\xE4m")?"seedling":t.startsWith("veg")||t.startsWith("wachs")?"veg":"bloom",s=this._num(e[`on_${i}`]),r=this._num(e[`off_${i}`]),l=(s??0)+(r??0),a=this._num(e.remaining_helper),p=e.entity?this._state(e.entity)==="on":void 0;if(p===void 0&&e.log_helper&&(p=Fe(this._state(e.log_helper))),a===void 0&&p===void 0)return;let h=a!==void 0&&l>0?Math.min(100,a/l*100):0,u=p?a!==void 0?`noch ${this._fmtDur(a)}`:"AN":a!==void 0?`AN in ${this._fmtDur(a)}`:"AUS";return{on:p??!1,pct:h,text:u}}_renderBars(){let e=this._lightInfo(),t=this._pumpInfo();return!e&&!t?d:c`<div class="bars">
      ${e?c`<div class="bar-row">
            <ha-icon
              class="bicon ${e.state}"
              icon=${e.state==="on"?"mdi:lightbulb-on":e.state==="night"?"mdi:weather-night":"mdi:lightbulb-off-outline"}
            ></ha-icon>
            <div class="bar">
              <div
                class="bar-fill ${e.state}"
                style="width:${e.state==="off"?0:e.pct}%"
              ></div>
            </div>
            <span class="bar-text">${e.text}</span>
          </div>`:d}
      ${t?c`<div class="bar-row">
            <ha-icon class="bicon ${t.on?"pump":""}" icon="mdi:water"></ha-icon>
            <div class="bar">
              <div class="bar-fill pump" style="width:${t.pct}%"></div>
            </div>
            <span class="bar-text">${t.text}</span>
          </div>`:d}
    </div>`}_renderChart(){let e=this._config;if(e.show_chart===!1)return d;let t=e.climate,i=e.chart_hours??24,s=P(t.temperature,i),r=P(t.humidity,i),l=300,a=80,p=s?me(s,l,a):null,h=r?me(r,l,a):null;if(!p&&!h)return d;let u=this._num(t.temperature),m=this._num(t.humidity);return c`<div class="chart" @click=${()=>this._moreInfo(t.temperature)}>
      <div class="chart-legend">
        <span class="cl"><i class="ct-dot"></i>Temperatur
          ${u!==void 0?`${u.toFixed(1)} \xB0C`:""}
          ${p?c`<small>(${p.min.toFixed(1)}–${p.max.toFixed(1)})</small>`:d}
        </span>
        <span class="cl"><i class="ch-dot"></i>Feuchte
          ${m!==void 0?`${m.toFixed(0)} %`:""}
          ${h?c`<small>(${Math.round(h.min)}–${Math.round(h.max)})</small>`:d}
        </span>
        <span class="cl-range">${i} h</span>
      </div>
      <svg class="chart-svg" viewBox="0 0 ${l} ${a}" preserveAspectRatio="none">
        <line x1="0" y1="${a*.25}" x2="${l}" y2="${a*.25}" class="grid"></line>
        <line x1="0" y1="${a*.5}" x2="${l}" y2="${a*.5}" class="grid"></line>
        <line x1="0" y1="${a*.75}" x2="${l}" y2="${a*.75}" class="grid"></line>
        ${h?c`<path d=${h.area} class="area hum"></path>
              <polyline points=${h.line} class="line hum"></polyline>`:d}
        ${p?c`<path d=${p.area} class="area temp"></path>
              <polyline points=${p.line} class="line temp"></polyline>`:d}
      </svg>
    </div>`}_renderStats(){let e=this._config.stats??[],t=this._statusInfo();return!e.length&&!t?d:c`<div class="stats">
      ${e.map(i=>{let s=this.hass?.states?.[i.entity],r=!s,l=s?parseFloat(s.state):NaN,a=s?Number.isFinite(l)&&/^[\d.,-]+$/.test(s.state)?`${Math.round(l*10)/10} ${this._unit(i.entity)}`.trim():s.state:"\u2013";return c`<div
          class="stat ${r?"missing":""}"
          title=${r?`${i.entity} fehlt`:""}
          @click=${()=>!r&&this._moreInfo(i.entity)}
        >
          <span class="stat-label">${this._friendly(i.entity,i.name)}</span>
          <span class="stat-value">
            ${i.icon?c`<ha-icon icon=${i.icon}></ha-icon>`:d}
            ${a}
          </span>
        </div>`})}
      ${t?c`<div class="stat">
            <span class="stat-label">Status</span>
            <span class="stat-value sv-${t.cls}">${t.label}</span>
          </div>`:d}
    </div>`}_renderLogs(){let e=this._logLines();return e.length?c`<div class="logs-live">
      ${e.map(t=>c`<div class="logrow lv-${t.line.level}">
          <span class="logrow-name">${t.name}</span>
          <span class="logrow-text">${t.line.label}</span>
          ${t.line.ts?c`<span class="logrow-ts">${t.line.ts}</span>`:d}
        </div>`)}
    </div>`:d}_renderSensorTile(e){let t=this.hass?.states?.[e.entity],i=this._config.sparkline_hours??24;if(!t)return c`<div class="tile tile-missing" title=${e.entity}>
        <ha-icon icon="mdi:alert-circle-outline"></ha-icon>
        <span class="tile-name">Entität fehlt</span>
      </div>`;let s=parseFloat(t.state),r=P(e.entity,i);return c`<div class="tile" @click=${()=>this._moreInfo(e.entity)}>
      <div class="tile-top">
        <ha-icon icon=${e.icon??t.attributes.icon??"mdi:gauge"}></ha-icon>
        <span class="tile-name">${this._friendly(e.entity,e.name)}</span>
      </div>
      <div class="tile-value">
        ${Number.isFinite(s)?s:t.state}
        <span class="tile-unit">${this._unit(e.entity)}</span>
      </div>
      ${r?Ue(r):d}
    </div>`}_renderSensors(){let e=this._config.sensors??[];return e.length?c`<div class="section col">
      <div class="group-label">Sensoren</div>
      <div class="tiles">${e.map(t=>this._renderSensorTile(t))}</div>
    </div>`:d}_renderControlTile(e,t=!1){let i=this.hass?.states?.[e.entity],s=i?.state==="on",r=!i,l=e.confirm??(t?!0:this._isCriticalDefault(e));return c`<button
      class="ctrl ${s?"on":""} ${r?"missing":""}"
      title=${r?`${e.entity} fehlt`:this._friendly(e.entity,e.name)}
      ?disabled=${r}
      @click=${()=>this._toggle(e,t)}
    >
      ${l?c`<ha-icon class="lock" icon="mdi:shield-check-outline"></ha-icon>`:d}
      <ha-icon
        class="ctrl-icon"
        icon=${e.icon??i?.attributes?.icon??"mdi:toggle-switch"}
      ></ha-icon>
      <span class="ctrl-name">${this._friendly(e.entity,e.name)}</span>
    </button>`}_renderControls(){let e=this._config.controls??[];if(!e.length)return d;let t=new Map;for(let i of e){let s=i.group?.trim()??"";t.has(s)||t.set(s,[]),t.get(s).push(i)}return c`<div class="section col">
      ${[...t.entries()].map(([i,s],r)=>c`
          <div class="group-label">${i||(r===0?"Steuerung":"")}</div>
          <div class="ctrl-grid">${s.map(l=>this._renderControlTile(l))}</div>
        `)}
      <div class="hint-line">
        Tippen schaltet direkt ·
        <ha-icon icon="mdi:shield-check-outline"></ha-icon> = mit Bestätigung
      </div>
    </div>`}_growInfo(){let e=this._config.grow;if(!e)return;let t=this._state(e.phase_helper),i=T(this._state(e.phase_start_helper)),s=T(this._state(e.grow_start_helper)),r=e.phases?.length?e.phases:ce,l=t?r.find(u=>u.name.toLowerCase()===t.toLowerCase()):void 0,a=i?Z(i):void 0,p=s?Z(s):void 0,h=l&&a?Math.min(100,a/l.days*100):void 0;return{phase:t,dayInPhase:a,dayTotal:p,progress:h,phases:r,def:l}}_renderGrow(){let e=this._growInfo();return!e||!e.phase&&!e.dayTotal?d:c`<div class="grow" @click=${()=>this._popup={kind:"phase"}}>
      <div class="grow-row">
        <ha-icon icon="mdi:sprout-outline"></ha-icon>
        <span class="grow-phase">${this._stageLabel(e.phase)||"Phase unbekannt"}</span>
        <span class="grow-days">
          ${e.dayInPhase?`Tag ${e.dayInPhase}`:""}
          ${e.def?` / ${e.def.days}`:""}
          ${e.dayTotal?` \xB7 Grow-Tag ${e.dayTotal}`:""}
        </span>
      </div>
      ${e.progress!==void 0?c`<div class="grow-bar">
            <div class="grow-fill" style="width:${e.progress}%"></div>
          </div>`:d}
    </div>`}_plantAge(e){let t=T(this._state(e.germination_helper))??T(e.germination_date);return t?Z(t):void 0}_renderPlants(){let e=this._config.plants??[];if(!e.length)return d;let t=Math.min(this._activePlant,e.length-1),i=e[t],s=this._plantAge(i),l=((i.calendar?j(i.calendar):void 0)??[]).filter(a=>new Date(a.start).getTime()<=Date.now());return c`<div class="section col plants">
      <div class="group-label">Pflanzen</div>
      <div class="chips">
        ${e.map((a,p)=>c`<button
            class="chip ${p===t?"active":""}"
            @click=${()=>this._activePlant=p}
          >
            ${a.name||`Pflanze ${p+1}`}
          </button>`)}
      </div>
      <div class="plant" @click=${()=>this._popup={kind:"plant",index:t}}>
        <div class="plant-head">
          <span class="plant-name">${i.name}</span>
          ${i.strain?c`<span class="plant-strain">${i.strain}</span>`:d}
          ${s?c`<span class="plant-age">Tag ${s}</span>`:d}
        </div>
        ${i.sensors?.length?c`<div class="tiles tiles-plant">
              ${i.sensors.map(a=>this._renderSensorTile(a))}
            </div>`:d}
        ${l.length?c`<div class="events">
              ${l.slice(0,3).map(a=>c`<div class="event">
                  <span class="event-date">${ue(a.start)}</span>
                  <span class="event-text">${a.summary}</span>
                </div>`)}
            </div>`:d}
      </div>
    </div>`}_phaseOptions(){let e=this._config.grow?.phase_helper,t=e?this.hass?.states?.[e]?.attributes?.options:void 0;return t?.length?t:(this._config.grow?.phases?.length?this._config.grow.phases:ce).map(s=>s.name)}_selectPhase(e){let t=this._config.grow?.phase_helper;t&&this.hass.callService("input_select","select_option",{entity_id:t,option:e})}_renderSettingTile(e){let t=this.hass?.states?.[e.entity];return t?c`<div class="tile setting" @click=${()=>this._moreInfo(e.entity)}>
      <div class="tile-top">
        <ha-icon icon=${e.icon??t.attributes.icon??"mdi:cog-outline"}></ha-icon>
        <span class="tile-name">${this._friendly(e.entity,e.name)}</span>
      </div>
      <div class="tile-value">${this._settingValue(e.entity)}</div>
    </div>`:c`<div class="tile tile-missing" title=${e.entity}>
        <ha-icon icon="mdi:alert-circle-outline"></ha-icon>
        <span class="tile-name">Entität fehlt</span>
      </div>`}_renderSettings(){let e=this._config.settings??[],t=!!this._config.grow?.phase_helper;return!e.length&&!t?d:c`<div class="section col">
      <button class="section-head" @click=${()=>this._showSettings=!this._showSettings}>
        <ha-icon icon="mdi:cog-outline"></ha-icon>
        <span>Konfiguration</span>
        <ha-icon
          class="chev"
          icon=${this._showSettings?"mdi:chevron-up":"mdi:chevron-down"}
        ></ha-icon>
      </button>
      ${this._showSettings?c`
            ${t?c`<div class="group-label">Wachstumsphase · Tippen zum Wechseln</div>
                  <div class="chips chips-phase">
                    ${this._phaseOptions().map(i=>{let s=(this._state(this._config.grow.phase_helper)??"").toLowerCase()===i.toLowerCase();return c`<button
                        class="chip ${s?"active":""}"
                        @click=${()=>this._selectPhase(i)}
                      >
                        ${this._stageLabel(i)}
                      </button>`})}
                  </div>`:d}
            ${e.map(i=>c`
                ${i.title?c`<div class="group-label">${i.title}</div>`:d}
                <div class="tiles tiles-settings">
                  ${(i.items??[]).map(s=>this._renderSettingTile(s))}
                </div>
              `)}
            <div class="hint-line">Tippen öffnet den HA-Einstellungsdialog</div>
          `:d}
    </div>`}_renderExpert(){let e=this._config.expert;return!!e&&(!!e.controls?.length||!!e.logs?.length)?c`<div class="section expert">
      <button
        class="section-head expert-head"
        @click=${()=>this._showExpert=!this._showExpert}
      >
        <ha-icon icon="mdi:tools"></ha-icon>
        <span>Experten-Modus</span>
        <span class="expert-toggle">${this._showExpert?"Ausblenden":"Einblenden"}</span>
      </button>
      ${this._showExpert?c`
            ${e.controls?.length?c`<div class="ctrl-grid">
                  ${e.controls.map(i=>this._renderControlTile(i,!0))}
                </div>`:d}
            ${(e.logs??[]).map(i=>{let s=this.hass?.states?.[i.entity];return c`<div class="log">
                <div class="group-label">${this._friendly(i.entity,i.name)}</div>
                <pre class="log-body">${s?s.state:`${i.entity} fehlt`}</pre>
              </div>`})}
            <div class="hint-line warn">
              <ha-icon icon="mdi:alert-outline"></ha-icon>
              Experten-Modus · nur für Diagnose und Wartung
            </div>
          `:d}
    </div>`:d}_renderPopup(){let e=this._popup;if(e.kind==="none")return d;let t;if(e.kind==="confirm")t=c`<div class="popup-title">Wirklich schalten?</div>
        <p>
          <b>${this._friendly(e.control.entity,e.control.name)}</b> ist als kritischer
          Aktor markiert.
        </p>
        <div class="popup-actions">
          <button class="btn" @click=${()=>this._popup={kind:"none"}}>
            Abbrechen
          </button>
          <button class="btn primary" @click=${()=>this._doToggle(e.control.entity)}>
            Schalten
          </button>
        </div>`;else if(e.kind==="phase"){let i=this._growInfo();t=c`<div class="popup-title">Grow-Zeitplan</div>
        <div class="timeline">
          ${(i?.phases??[]).map(s=>{let r=i?.phase&&s.name.toLowerCase()===i.phase.toLowerCase();return c`<div class="tl-row ${r?"active":""}">
              <span class="tl-name">${this._stageLabel(s.name)}</span>
              <span class="tl-days">${s.days} Tage</span>
              ${r&&i?.dayInPhase?c`<span class="tl-now">Tag ${i.dayInPhase}</span>`:d}
            </div>`})}
        </div>
        <div class="popup-actions">
          <button class="btn" @click=${()=>this._popup={kind:"none"}}>
            Schließen
          </button>
        </div>`}else{let i=(this._config.plants??[])[e.index],s=i?.calendar?j(i.calendar)??[]:[];t=c`<div class="popup-title">
          ${i?.name}${i?.strain?` \xB7 ${i.strain}`:""}
        </div>
        ${s.length?c`<div class="events events-full">
              ${s.map(r=>c`<div class="event">
                  <span class="event-date">${ue(r.start)}</span>
                  <span class="event-text">
                    ${r.summary}${r.description?c`<br /><small>${r.description}</small>`:d}
                  </span>
                </div>`)}
            </div>`:c`<p>Keine Ereignisse im Kalender gefunden.</p>`}
        <div class="popup-actions">
          <button class="btn" @click=${()=>this._popup={kind:"none"}}>
            Schließen
          </button>
        </div>`}return c`<div
      class="overlay"
      @click=${i=>{i.target===i.currentTarget&&(this._popup={kind:"none"})}}
    >
      <div class="popup">${t}</div>
    </div>`}};X.styles=R`
    :host {
      display: block;
    }
    ha-card {
      position: relative;
      overflow: hidden;
      padding: 12px 12px 14px;
      color: var(--primary-text-color);
    }
    .ct {
      container-type: inline-size;
    }

    /* Header + Badges */
    .header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 8px;
      margin-bottom: 8px;
    }
    .title {
      font-size: 1.15em;
      font-weight: 600;
      letter-spacing: 0.2px;
    }
    .hbadges {
      display: flex;
      gap: 6px;
      flex-wrap: wrap;
      justify-content: flex-end;
    }
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      font-size: 0.7em;
      font-weight: 700;
      letter-spacing: 0.4px;
      padding: 3px 9px;
      border-radius: 999px;
      background: var(--secondary-background-color);
      color: var(--secondary-text-color);
      border: 1px solid var(--divider-color);
      white-space: nowrap;
    }
    .badge.mode {
      text-transform: uppercase;
    }
    .badge.hb {
      border-color: color-mix(in srgb, var(--primary-color) 50%, transparent);
      color: var(--primary-color);
    }
    .badge ha-icon {
      --mdc-icon-size: 12px;
    }

    /* Hero */
    .hero {
      padding: 6px 2px 12px;
      border-bottom: 1px solid var(--divider-color);
    }
    .hero-numbers {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      gap: 8px;
      margin-bottom: 10px;
    }
    .kpi {
      flex: 1;
      text-align: center;
      cursor: pointer;
      min-width: 0;
    }
    .kpi-value {
      font-size: 1.7em;
      font-weight: 700;
      font-variant-numeric: tabular-nums;
    }
    .kpi-vpd .kpi-value {
      font-size: 2.3em;
      color: var(--zone, var(--primary-color));
    }
    .kpi-unit {
      font-size: 0.85em;
      color: var(--secondary-text-color);
      margin-left: 2px;
    }
    .kpi-label {
      display: block;
      font-size: 0.72em;
      color: var(--secondary-text-color);
      margin-top: 2px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .vpd-scale {
      position: relative;
      display: flex;
      height: 10px;
      border-radius: 5px;
      overflow: visible;
    }
    .vpd-zone:first-child {
      border-radius: 5px 0 0 5px;
    }
    .vpd-zone:last-child {
      border-radius: 0 5px 5px 0;
    }
    .vpd-marker {
      position: absolute;
      top: -4px;
      width: 4px;
      height: 18px;
      border-radius: 2px;
      background: var(--primary-text-color);
      box-shadow: 0 0 0 2px var(--card-background-color);
      transform: translateX(-50%);
      transition: left 0.6s ease;
    }

    /* Licht/Pumpe-Balken im Hero */
    .bars {
      margin-top: 12px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .bar-row {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .bicon {
      --mdc-icon-size: 17px;
      color: var(--secondary-text-color);
      flex-shrink: 0;
    }
    .bicon.on {
      color: #d9a13b;
    }
    .bicon.night {
      color: #8b9fc4;
    }
    .bicon.pump {
      color: #4fc3f7;
    }
    .bar {
      flex: 1;
      height: 6px;
      border-radius: 3px;
      background: var(--secondary-background-color);
      overflow: hidden;
    }
    .bar-fill {
      height: 100%;
      border-radius: 3px;
      transition: width 0.6s ease;
    }
    .bar-fill.on {
      background: linear-gradient(90deg, #ffd700, #ffa500);
    }
    .bar-fill.night {
      background: linear-gradient(90deg, #8b9fc4, #5b6f96);
    }
    .bar-fill.pump {
      background: linear-gradient(90deg, #4fc3f7, #0288d1);
    }
    .bar-text {
      font-size: 0.74em;
      color: var(--secondary-text-color);
      font-variant-numeric: tabular-nums;
      white-space: nowrap;
      min-width: 92px;
      text-align: right;
    }

    /* Verlaufsdiagramm */
    .chart {
      padding: 10px 0 6px;
      border-bottom: 1px solid var(--divider-color);
      cursor: pointer;
    }
    .chart-legend {
      display: flex;
      align-items: baseline;
      gap: 14px;
      font-size: 0.74em;
      color: var(--secondary-text-color);
      margin-bottom: 6px;
      flex-wrap: wrap;
    }
    .cl {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      font-variant-numeric: tabular-nums;
    }
    .cl small {
      opacity: 0.7;
    }
    .cl i {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      display: inline-block;
    }
    .ct-dot {
      background: #ffb347;
    }
    .ch-dot {
      background: #4fc3f7;
    }
    .cl-range {
      margin-left: auto;
      font-size: 0.95em;
      opacity: 0.7;
    }
    .chart-svg {
      display: block;
      width: 100%;
      height: 88px;
    }
    .chart-svg .grid {
      stroke: var(--divider-color);
      stroke-width: 0.5;
    }
    .chart-svg .line {
      fill: none;
      stroke-width: 1.6;
      stroke-linejoin: round;
      stroke-linecap: round;
      vector-effect: non-scaling-stroke;
    }
    .chart-svg .line.temp {
      stroke: #ffb347;
    }
    .chart-svg .line.hum {
      stroke: #4fc3f7;
    }
    .chart-svg .area {
      stroke: none;
      opacity: 0.12;
    }
    .chart-svg .area.temp {
      fill: #ffb347;
    }
    .chart-svg .area.hum {
      fill: #4fc3f7;
    }

    /* Status-Boxen */
    .stats {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
      gap: 8px;
      padding: 10px 0 0;
    }
    .stat {
      background: var(--secondary-background-color);
      border: 1px solid var(--divider-color);
      border-radius: var(--ha-card-border-radius, 12px);
      padding: 8px 10px;
      text-align: center;
      cursor: pointer;
      min-width: 0;
      transition: border-color 0.15s ease;
    }
    .stat:hover {
      border-color: var(--primary-color);
    }
    .stat.missing {
      opacity: 0.5;
      cursor: default;
    }
    .stat-label {
      display: block;
      font-size: 0.66em;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.7px;
      color: var(--secondary-text-color);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .stat-value {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 5px;
      font-size: 1.1em;
      font-weight: 700;
      margin-top: 2px;
      font-variant-numeric: tabular-nums;
      white-space: nowrap;
      overflow: hidden;
    }
    .stat-value ha-icon {
      --mdc-icon-size: 16px;
      color: var(--primary-color);
    }
    .sv-ok {
      color: #3e9d52;
    }
    .sv-warn,
    .sv-info {
      color: #d9a13b;
    }
    .sv-crit {
      color: #cf5b4c;
    }

    /* Live-Logzeilen */
    .logs-live {
      display: flex;
      flex-direction: column;
      gap: 6px;
      padding: 10px 0;
      border-bottom: 1px solid var(--divider-color);
    }
    .logrow {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 6px 10px;
      border-radius: 8px;
      background: var(--secondary-background-color);
      font-size: 0.76em;
    }
    .logrow-name {
      font-weight: 700;
      color: var(--secondary-text-color);
      flex-shrink: 0;
      min-width: 46px;
    }
    .logrow-text {
      flex: 1;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .logrow-ts {
      color: var(--secondary-text-color);
      font-size: 0.92em;
      flex-shrink: 0;
      font-variant-numeric: tabular-nums;
    }
    .logrow.lv-critical {
      background: color-mix(in srgb, #cf5b4c 18%, var(--secondary-background-color));
    }
    .lv-critical .logrow-text {
      color: #e06a5b;
      font-weight: 600;
    }
    .logrow.lv-warning {
      background: color-mix(in srgb, #d9a13b 16%, var(--secondary-background-color));
    }
    .lv-warning .logrow-text {
      color: #d9a13b;
      font-weight: 600;
    }
    .lv-info .logrow-text {
      color: #d9a13b;
    }
    .lv-none .logrow-text {
      color: var(--secondary-text-color);
    }

    /* Zweispalten-Layout auf breiten Karten */
    .duo {
      display: grid;
      grid-template-columns: 1fr;
      column-gap: 18px;
    }
    @container (min-width: 540px) {
      .duo {
        grid-template-columns: 1fr 1fr;
      }
    }

    /* Sektionen */
    .section {
      padding: 10px 0;
      border-bottom: 1px solid var(--divider-color);
      min-width: 0;
    }
    .group-label {
      font-size: 0.66em;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.9px;
      color: var(--secondary-text-color);
      margin: 10px 2px 6px;
    }
    .group-label:first-child {
      margin-top: 0;
    }
    .section-head {
      display: flex;
      align-items: center;
      gap: 8px;
      width: 100%;
      padding: 4px 2px;
      background: none;
      border: none;
      color: var(--primary-text-color);
      font: inherit;
      font-weight: 600;
      font-size: 0.92em;
      cursor: pointer;
      text-align: left;
    }
    .section-head ha-icon {
      --mdc-icon-size: 18px;
      color: var(--primary-color);
    }
    .section-head .chev {
      margin-left: auto;
      color: var(--secondary-text-color);
    }

    /* Kacheln */
    .tiles {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(104px, 1fr));
      gap: 8px;
      padding: 2px 0 6px;
    }
    .tile {
      background: var(--secondary-background-color);
      border: 1px solid var(--divider-color);
      border-radius: var(--ha-card-border-radius, 12px);
      padding: 8px 10px 4px;
      cursor: pointer;
      min-width: 0;
      transition: border-color 0.15s ease;
    }
    .tile:hover {
      border-color: var(--primary-color);
    }
    .tile.setting {
      padding-bottom: 8px;
    }
    .tile-missing {
      cursor: default;
      color: var(--error-color, #cf5b4c);
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .tile-top {
      display: flex;
      align-items: center;
      gap: 5px;
      color: var(--secondary-text-color);
      font-size: 0.72em;
      margin-bottom: 2px;
    }
    .tile-top ha-icon {
      --mdc-icon-size: 15px;
    }
    .tile-name {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .tile-value {
      font-size: 1.25em;
      font-weight: 600;
      font-variant-numeric: tabular-nums;
    }
    .tile-unit {
      font-size: 0.7em;
      font-weight: 400;
      color: var(--secondary-text-color);
    }
    .spark {
      display: block;
      width: 100%;
      height: 22px;
      color: var(--primary-color);
      margin-top: 2px;
    }

    /* Schalt-Kacheln */
    .ctrl-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(94px, 1fr));
      gap: 8px;
    }
    .ctrl {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 6px;
      padding: 12px 6px 10px;
      border-radius: var(--ha-card-border-radius, 12px);
      border: 1px solid var(--divider-color);
      background: var(--secondary-background-color);
      color: var(--secondary-text-color);
      font: inherit;
      font-size: 0.78em;
      cursor: pointer;
      min-width: 0;
      transition: all 0.15s ease;
    }
    .ctrl:hover {
      border-color: var(--primary-color);
    }
    .ctrl .ctrl-icon {
      --mdc-icon-size: 22px;
    }
    .ctrl-name {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 100%;
    }
    .ctrl.on {
      border-color: var(--primary-color);
      background: color-mix(in srgb, var(--primary-color) 16%, var(--secondary-background-color));
      color: var(--primary-text-color);
    }
    .ctrl.on .ctrl-icon {
      color: var(--primary-color);
    }
    .ctrl.missing {
      opacity: 0.45;
      cursor: not-allowed;
    }
    .ctrl .lock {
      position: absolute;
      top: 5px;
      right: 6px;
      --mdc-icon-size: 12px;
      opacity: 0.65;
    }
    .hint-line {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 4px;
      font-size: 0.68em;
      color: var(--secondary-text-color);
      margin-top: 8px;
    }
    .hint-line ha-icon {
      --mdc-icon-size: 12px;
    }

    /* Grow */
    .grow {
      padding: 10px 2px;
      border-bottom: 1px solid var(--divider-color);
      cursor: pointer;
    }
    .grow-row {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.9em;
    }
    .grow-row ha-icon {
      --mdc-icon-size: 18px;
      color: var(--primary-color);
    }
    .grow-phase {
      font-weight: 600;
    }
    .grow-days {
      margin-left: auto;
      color: var(--secondary-text-color);
      font-size: 0.85em;
      font-variant-numeric: tabular-nums;
    }
    .grow-bar {
      height: 6px;
      border-radius: 3px;
      background: var(--secondary-background-color);
      margin-top: 8px;
      overflow: hidden;
    }
    .grow-fill {
      height: 100%;
      border-radius: 3px;
      background: var(--primary-color);
      transition: width 0.6s ease;
    }

    /* Pflanzen */
    .chips {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-bottom: 8px;
    }
    .chips-phase {
      margin-bottom: 4px;
    }
    .chip {
      padding: 5px 12px;
      border-radius: 999px;
      border: 1px solid var(--divider-color);
      background: transparent;
      color: var(--secondary-text-color);
      font: inherit;
      font-size: 0.8em;
      cursor: pointer;
      transition: all 0.15s ease;
    }
    .chip.active {
      background: var(--primary-color);
      border-color: var(--primary-color);
      color: var(--text-primary-color, #fff);
      font-weight: 600;
    }
    .plant {
      cursor: pointer;
    }
    .plant-head {
      display: flex;
      align-items: baseline;
      gap: 8px;
      flex-wrap: wrap;
    }
    .plant-name {
      font-weight: 600;
    }
    .plant-strain {
      color: var(--secondary-text-color);
      font-size: 0.85em;
      font-style: italic;
    }
    .plant-age {
      margin-left: auto;
      font-size: 0.8em;
      font-weight: 600;
      color: var(--primary-color);
      font-variant-numeric: tabular-nums;
    }
    .tiles-plant,
    .tiles-settings {
      padding-bottom: 4px;
    }
    .events {
      margin-top: 6px;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .event {
      display: flex;
      gap: 10px;
      font-size: 0.8em;
    }
    .event-date {
      color: var(--secondary-text-color);
      font-variant-numeric: tabular-nums;
      flex-shrink: 0;
    }
    .events-full {
      max-height: 50vh;
      overflow-y: auto;
    }

    /* Experten-Modus */
    .expert {
      border-bottom: none;
      padding-bottom: 0;
    }
    .expert-head {
      color: #d9a13b;
    }
    .expert-head ha-icon {
      color: #d9a13b;
    }
    .expert .ctrl-grid {
      margin-bottom: 4px;
    }
    .log {
      margin-top: 6px;
    }
    .log-body {
      margin: 0;
      padding: 8px 10px;
      background: var(--secondary-background-color);
      border: 1px solid var(--divider-color);
      border-radius: 10px;
      font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
      font-size: 0.7em;
      line-height: 1.45;
      color: var(--primary-text-color);
      white-space: pre-wrap;
      word-break: break-word;
      max-height: 120px;
      overflow-y: auto;
    }
    .hint-line.warn {
      color: #d9a13b;
    }

    /* Popup / Overlay */
    .overlay {
      position: absolute;
      inset: 0;
      background: color-mix(in srgb, var(--card-background-color) 65%, transparent);
      backdrop-filter: blur(3px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 16px;
      z-index: 5;
    }
    .popup {
      background: var(--card-background-color);
      border: 1px solid var(--divider-color);
      border-radius: var(--ha-card-border-radius, 12px);
      box-shadow: var(--ha-card-box-shadow, 0 6px 24px rgba(0, 0, 0, 0.25));
      padding: 16px;
      width: 100%;
      max-width: 340px;
      font-size: 0.9em;
    }
    .popup-title {
      font-weight: 700;
      font-size: 1.05em;
      margin-bottom: 8px;
    }
    .popup-actions {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
      margin-top: 12px;
    }
    .btn {
      padding: 7px 14px;
      border-radius: 8px;
      border: 1px solid var(--divider-color);
      background: var(--secondary-background-color);
      color: var(--primary-text-color);
      font: inherit;
      cursor: pointer;
    }
    .btn.primary {
      background: var(--primary-color);
      border-color: var(--primary-color);
      color: var(--text-primary-color, #fff);
      font-weight: 600;
    }
    .timeline {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .tl-row {
      display: flex;
      gap: 8px;
      align-items: baseline;
      padding: 6px 8px;
      border-radius: 8px;
      border: 1px solid var(--divider-color);
    }
    .tl-row.active {
      border-color: var(--primary-color);
      background: color-mix(in srgb, var(--primary-color) 12%, transparent);
    }
    .tl-name {
      font-weight: 600;
    }
    .tl-days {
      margin-left: auto;
      color: var(--secondary-text-color);
      font-size: 0.85em;
    }
    .tl-now {
      font-size: 0.8em;
      color: var(--primary-color);
      font-weight: 700;
    }

    .setup-hint {
      display: flex;
      gap: 12px;
      align-items: center;
      padding: 16px;
      color: var(--secondary-text-color);
    }
    .setup-hint ha-icon {
      --mdc-icon-size: 32px;
      color: var(--primary-color);
    }
  `;customElements.define("growctrl-tent-card",X);var dt={name:"Name des Zelts",mode:"System-Modus",sparkline_hours:"Sparkline-Zeitfenster (Stunden)",temperature:"Temperatur-Sensor *",humidity:"Luftfeuchte-Sensor *",vpd:"VPD-Sensor (optional, sonst Berechnung)",leaf_offset:"Blatttemperatur-Offset (K)",entity:"Entit\xE4t",icon:"Icon",confirm:"Best\xE4tigung vor dem Schalten",phase_helper:"Phase (input_select)",phase_start_helper:"Phasen-Start (input_datetime)",grow_start_helper:"Grow-Start (input_datetime)",strain:"Sorte / Genetik",germination_helper:"Keimdatum (input_datetime)",calendar:"Ereignis-Kalender (calendar)",days:"Tage",label:"Anzeigename",group:'Gruppe (\xDCberschrift, z.B. "Ger\xE4te \xB7 Manuell")',title:'Gruppen-Titel (z.B. "Lichtzeiten")',on_helper:"Licht AN (input_datetime)",off_helper:"Licht AUS \u2013 Seed/Veg (input_datetime)",off_helper_bloom:"Licht AUS \u2013 Bloom/Flush (optional)",remaining_helper:"Restzeit-Sensor (Minuten)",log_helper:"Stations-Log (f\xFCr AN/AUS-Erkennung)",on_seedling:"Pumpe AN \xB7 S\xE4mling (input_number)",off_seedling:"Pumpe AUS \xB7 S\xE4mling",on_veg:"Pumpe AN \xB7 Wachstum",off_veg:"Pumpe AUS \xB7 Wachstum",on_bloom:"Pumpe AN \xB7 Bl\xFCte/Sp\xFClung",off_bloom:"Pumpe AUS \xB7 Bl\xFCte/Sp\xFClung",kind:"Log-Format",dehum_entity:"Entfeuchter-Anforderung (input_boolean)",temp_min:"Temperatur-Warnung unter (\xB0C)",temp_max:"Temperatur-Warnung \xFCber (\xB0C)",show_chart:"Verlaufsdiagramm anzeigen",chart_hours:"Diagramm-Zeitfenster (Stunden)"},ht=[{name:"name",selector:{text:{}}},{name:"mode",selector:{select:{mode:"dropdown",options:[{value:"dwc",label:"DWC (Hydroponik)"},{value:"soil",label:"Erde"}]}}},{name:"sparkline_hours",selector:{number:{min:1,max:168,mode:"box"}}},{name:"show_chart",selector:{boolean:{}}},{name:"chart_hours",selector:{number:{min:1,max:168,mode:"box"}}}],ut=[{name:"entity",selector:{entity:{domain:["input_boolean","switch","binary_sensor"]}}},{name:"name",selector:{text:{}}},{name:"icon",selector:{icon:{}}}],mt=[{name:"entity",selector:{entity:{domain:["switch","input_boolean"]}}},{name:"remaining_helper",selector:{entity:{domain:"sensor"}}},{name:"log_helper",selector:{entity:{domain:["input_text","sensor","text"]}}},{name:"on_seedling",selector:{entity:{domain:["input_number","number"]}}},{name:"off_seedling",selector:{entity:{domain:["input_number","number"]}}},{name:"on_veg",selector:{entity:{domain:["input_number","number"]}}},{name:"off_veg",selector:{entity:{domain:["input_number","number"]}}},{name:"on_bloom",selector:{entity:{domain:["input_number","number"]}}},{name:"off_bloom",selector:{entity:{domain:["input_number","number"]}}}],gt=[{name:"entity",selector:{entity:{domain:["input_text","sensor","text"]}}},{name:"name",selector:{text:{}}},{name:"kind",selector:{select:{mode:"dropdown",options:[{value:"station",label:"Station (GROWCTRL)"},{value:"climate",label:"Klima (GROWCTRL)"},{value:"raw",label:"Unver\xE4ndert anzeigen"}]}}}],ft=[{name:"dehum_entity",selector:{entity:{domain:["input_boolean","binary_sensor","switch"]}}},{name:"temp_min",selector:{number:{min:0,max:40,step:.5,mode:"box"}}},{name:"temp_max",selector:{number:{min:0,max:50,step:.5,mode:"box"}}}],vt=[{name:"temperature",selector:{entity:{domain:"sensor"}}},{name:"humidity",selector:{entity:{domain:"sensor"}}},{name:"vpd",selector:{entity:{domain:"sensor"}}},{name:"leaf_offset",selector:{number:{min:-6,max:4,step:.5,mode:"box"}}}],We=[{name:"entity",selector:{entity:{domain:["sensor","binary_sensor"]}}},{name:"name",selector:{text:{}}},{name:"icon",selector:{icon:{}}}],Ve=[{name:"entity",selector:{entity:{domain:["switch","light","fan","input_boolean","humidifier","valve"]}}},{name:"name",selector:{text:{}}},{name:"group",selector:{text:{}}},{name:"icon",selector:{icon:{}}},{name:"confirm",selector:{boolean:{}}}],_t=[{name:"entity",selector:{entity:{}}},{name:"name",selector:{text:{}}},{name:"icon",selector:{icon:{}}}],bt=[{name:"entity",selector:{entity:{domain:["light","switch"]}}},{name:"on_helper",selector:{entity:{domain:"input_datetime"}}},{name:"off_helper",selector:{entity:{domain:"input_datetime"}}},{name:"off_helper_bloom",selector:{entity:{domain:"input_datetime"}}},{name:"remaining_helper",selector:{entity:{domain:"sensor"}}}],xt=[{name:"entity",selector:{entity:{domain:["input_datetime","input_number","input_select","input_text","number","select","time","datetime","text"]}}},{name:"name",selector:{text:{}}},{name:"icon",selector:{icon:{}}}],yt=[{name:"entity",selector:{entity:{domain:["sensor","text","input_text"]}}},{name:"name",selector:{text:{}}}],$t=[{name:"phase_helper",selector:{entity:{domain:"input_select"}}},{name:"phase_start_helper",selector:{entity:{domain:"input_datetime"}}},{name:"grow_start_helper",selector:{entity:{domain:"input_datetime"}}}],wt=[{name:"name",selector:{text:{}}},{name:"days",selector:{number:{min:1,max:365,mode:"box"}}}],St=[{name:"name",selector:{text:{}}},{name:"strain",selector:{text:{}}},{name:"germination_helper",selector:{entity:{domain:"input_datetime"}}},{name:"calendar",selector:{entity:{domain:"calendar"}}}],J=class extends f{constructor(){super(...arguments);this._label=e=>dt[e.name]??e.name}static get properties(){return{hass:{attribute:!1},_config:{state:!0}}}setConfig(e){this._config=e}_emit(e){this._config=e,this.dispatchEvent(new CustomEvent("config-changed",{bubbles:!0,composed:!0,detail:{config:e}}))}_patch(e){this._emit({...this._config,...e})}_patchClimate(e){this._emit({...this._config,climate:{...e}})}_listChange(e,t,i){let s=[...this._config[e]??[]];s[t]=i,this._emit({...this._config,[e]:s})}_listAdd(e,t){let i=[...this._config[e]??[],t];this._emit({...this._config,[e]:i})}_listRemove(e,t){let i=[...this._config[e]??[]];i.splice(t,1),this._emit({...this._config,[e]:i})}_settings(){return this._config.settings??[]}_settingsPatch(e){this._emit({...this._config,settings:e})}_settingsGroupPatch(e,t){let i=[...this._settings()];i[e]={...i[e],...t},this._settingsPatch(i)}_settingItemChange(e,t,i){let s=[...this._settings()[e].items??[]];s[t]=i,this._settingsGroupPatch(e,{items:s})}_expertPatch(e){this._emit({...this._config,expert:{...this._config.expert??{},...e}})}_phases(){return this._config.grow?.phases??[]}_phasePatch(e){this._emit({...this._config,grow:{...this._config.grow??{},phases:e}})}_plants(){return this._config.plants??[]}_plantPatch(e,t){let i=[...this._plants()];i[e]={...i[e],...t},this._emit({...this._config,plants:i})}_plantAdd(){let e=[...this._plants(),{name:`Pflanze ${this._plants().length+1}`,sensors:[]}];this._emit({...this._config,plants:e})}_plantRemove(e){let t=[...this._plants()];t.splice(e,1),this._emit({...this._config,plants:t})}_plantSensorChange(e,t,i){let s=[...this._plants()[e].sensors??[]];s[t]=i,this._plantPatch(e,{sensors:s})}_plantSensorAdd(e){let t=[...this._plants()[e].sensors??[],{entity:""}];this._plantPatch(e,{sensors:t})}_plantSensorRemove(e,t){let i=[...this._plants()[e].sensors??[]];i.splice(t,1),this._plantPatch(e,{sensors:i})}_form(e,t,i){return c`<ha-form
      .hass=${this.hass}
      .data=${e??{}}
      .schema=${t}
      .computeLabel=${this._label}
      @value-changed=${s=>{s.stopPropagation(),i(s.detail.value)}}
    ></ha-form>`}_row(e,t){return c`<div class="row">
      <div class="row-form">${e}</div>
      <button class="icon-btn" title="Entfernen" @click=${t}>
        <ha-icon icon="mdi:delete-outline"></ha-icon>
      </button>
    </div>`}render(){if(!this._config||!this.hass)return c``;let e=this._config;return c`
      <ha-expansion-panel outlined .expanded=${!0}>
        <div slot="header" class="ph"><ha-icon icon="mdi:tune"></ha-icon>Basis</div>
        <div class="section">
          ${this._form({name:e.name,mode:e.mode??"dwc",sparkline_hours:e.sparkline_hours??24,show_chart:e.show_chart??!0,chart_hours:e.chart_hours??24},ht,t=>this._patch(t))}
        </div>
      </ha-expansion-panel>

      <ha-expansion-panel outlined .expanded=${!0}>
        <div slot="header" class="ph">
          <ha-icon icon="mdi:thermometer-water"></ha-icon>Klima &amp; VPD
        </div>
        <div class="section">
          ${this._form(e.climate??{leaf_offset:-2},vt,t=>this._patchClimate(t))}
        </div>
      </ha-expansion-panel>

      <ha-expansion-panel outlined>
        <div slot="header" class="ph">
          <ha-icon icon="mdi:label-outline"></ha-icon>Header-Badges
        </div>
        <div class="section">
          ${(e.badges??[]).map((t,i)=>this._row(this._form(t,ut,s=>this._listChange("badges",i,s)),()=>this._listRemove("badges",i)))}
          <button class="add" @click=${()=>this._listAdd("badges",{entity:""})}>
            <ha-icon icon="mdi:plus"></ha-icon> Badge hinzufügen
          </button>
          <p class="hint">
            Erscheint oben rechts neben dem Modus, sobald die Entität "an" ist –
            z.B. Klima Auto, Auto Main oder Wartungsmodus.
          </p>
        </div>
      </ha-expansion-panel>

      <ha-expansion-panel outlined>
        <div slot="header" class="ph">
          <ha-icon icon="mdi:counter"></ha-icon>Status-Boxen
        </div>
        <div class="section">
          ${(e.stats??[]).map((t,i)=>this._row(this._form(t,_t,s=>this._listChange("stats",i,s)),()=>this._listRemove("stats",i)))}
          <button class="add" @click=${()=>this._listAdd("stats",{entity:""})}>
            <ha-icon icon="mdi:plus"></ha-icon> Status-Box hinzufügen
          </button>
          <p class="hint">
            Kompakte Boxen unter dem Hero, z.B. Leistung (W) oder
            Status-Texte (Entfeuchter AN, Modus ...). Beliebige Entität wählbar.
          </p>
        </div>
      </ha-expansion-panel>

      <ha-expansion-panel outlined>
        <div slot="header" class="ph">
          <ha-icon icon="mdi:list-status"></ha-icon>Status-Ampel
        </div>
        <div class="section">
          ${this._form(e.status??{},ft,t=>this._emit({...e,status:{...t}}))}
          <p class="hint">
            Automatische Status-Box ("✓ Alles OK" / Warnung / Fehler) aus
            Log-Schweregrad, Entfeuchter-Anforderung und Temperaturbereich.
            Erscheint, sobald hier etwas gesetzt ist oder Live-Logzeilen
            konfiguriert sind.
          </p>
        </div>
      </ha-expansion-panel>

      <ha-expansion-panel outlined>
        <div slot="header" class="ph">
          <ha-icon icon="mdi:text-box-outline"></ha-icon>Live-Logzeilen
        </div>
        <div class="section">
          ${(e.logs??[]).map((t,i)=>this._row(this._form({kind:"station",...t},gt,s=>this._listChange("logs",i,s)),()=>this._listRemove("logs",i)))}
          <button
            class="add"
            @click=${()=>this._listAdd("logs",{entity:"",kind:"station"})}
          >
            <ha-icon icon="mdi:plus"></ha-icon> Logzeile hinzufügen
          </button>
          <p class="hint">
            Übersetzt GROWCTRL-Rohlogs in Klartext mit Farb-Schweregrad,
            z.B. "💡 Licht eingeschaltet — Pumpe AUS · O₂ AN". Format "Station"
            für Stations-Logs, "Klima" für das Klima-Log.
          </p>
        </div>
      </ha-expansion-panel>

      <ha-expansion-panel outlined>
        <div slot="header" class="ph"><ha-icon icon="mdi:gauge"></ha-icon>Zelt-Sensoren</div>
        <div class="section">
          ${(e.sensors??[]).map((t,i)=>this._row(this._form(t,We,s=>this._listChange("sensors",i,s)),()=>this._listRemove("sensors",i)))}
          <button class="add" @click=${()=>this._listAdd("sensors",{entity:""})}>
            <ha-icon icon="mdi:plus"></ha-icon> Sensor hinzufügen
          </button>
        </div>
      </ha-expansion-panel>

      <ha-expansion-panel outlined>
        <div slot="header" class="ph">
          <ha-icon icon="mdi:toggle-switch-outline"></ha-icon>Steuerung
        </div>
        <div class="section">
          ${(e.controls??[]).map((t,i)=>this._row(this._form(t,Ve,s=>this._listChange("controls",i,s)),()=>this._listRemove("controls",i)))}
          <button
            class="add"
            @click=${()=>this._listAdd("controls",{entity:"",confirm:!1})}
          >
            <ha-icon icon="mdi:plus"></ha-icon> Aktor hinzufügen
          </button>
          <p class="hint">
            Gleiche <b>Gruppe</b> = gemeinsames Raster mit Überschrift
            (z.B. "Licht · Direktschalten", "Automatik", "Geräte · Manuell").
            Pumpe und CO2 werden auch ohne Haken automatisch als kritisch
            behandelt (Bestätigungsdialog).
          </p>
        </div>
      </ha-expansion-panel>

      <ha-expansion-panel outlined>
        <div slot="header" class="ph">
          <ha-icon icon="mdi:weather-sunny-clock"></ha-icon>Licht-Zeitplan
        </div>
        <div class="section">
          ${this._form(e.light_schedule??{},bt,t=>this._emit({...e,light_schedule:{...t}}))}
          <p class="hint">
            Laufzeitbalken im Hero (z.B. "noch 7h 15min"). Die Bloom/Flush-AUS-Zeit
            wird automatisch verwendet, sobald die aktuelle Phase Blüte oder Spülung ist.
            Mit Restzeit-Sensor zählt der Balken live herunter, nachts zeigt er
            "AN in ...".
          </p>
        </div>
      </ha-expansion-panel>

      <ha-expansion-panel outlined>
        <div slot="header" class="ph">
          <ha-icon icon="mdi:water-pump"></ha-icon>Pumpen-Zeitplan
        </div>
        <div class="section">
          ${this._form(e.pump_schedule??{},mt,t=>this._emit({...e,pump_schedule:{...t}}))}
          <p class="hint">
            Zyklusbalken im Hero. AN/AUS-Dauer wird je nach aktueller Phase aus
            den passenden input_number-Helpern gelesen. Der Pumpen-Status kommt
            wahlweise von einem Schalter oder wird aus dem Stations-Log
            (IST ... P=on) erkannt.
          </p>
        </div>
      </ha-expansion-panel>

      <ha-expansion-panel outlined>
        <div slot="header" class="ph"><ha-icon icon="mdi:sprout-outline"></ha-icon>Grow-Phasen</div>
        <div class="section">
          ${this._form({phase_helper:e.grow?.phase_helper,phase_start_helper:e.grow?.phase_start_helper,grow_start_helper:e.grow?.grow_start_helper},$t,t=>this._emit({...e,grow:{...e.grow??{},...t}}))}
          <div class="sub">Phasenplan (für Fortschritt &amp; Timeline)</div>
          ${this._phases().map((t,i)=>this._row(this._form(t,wt,s=>{let r=[...this._phases()];r[i]=s,this._phasePatch(r)}),()=>{let s=[...this._phases()];s.splice(i,1),this._phasePatch(s)}))}
          <button
            class="add"
            @click=${()=>this._phasePatch([...this._phases(),{name:"",days:14}])}
          >
            <ha-icon icon="mdi:plus"></ha-icon> Phase hinzufügen
          </button>
          <p class="hint">
            Leer lassen = Standardplan (Keimung, Steckling, Vegetativ, Blüte, Spülen).
            Die Phasennamen müssen zu den Optionen des input_select passen.
          </p>
        </div>
      </ha-expansion-panel>

      <ha-expansion-panel outlined>
        <div slot="header" class="ph">
          <ha-icon icon="mdi:cog-outline"></ha-icon>Konfigurations-Kacheln
        </div>
        <div class="section">
          ${this._settings().map((t,i)=>c`<ha-expansion-panel outlined class="plant-panel">
              <div slot="header" class="ph">
                <ha-icon icon="mdi:tune-variant"></ha-icon>${t.title||`Gruppe ${i+1}`}
              </div>
              <div class="section">
                ${this._form({title:t.title},[{name:"title",selector:{text:{}}}],s=>this._settingsGroupPatch(i,s))}
                <div class="sub">Kacheln dieser Gruppe</div>
                ${(t.items??[]).map((s,r)=>this._row(this._form(s,xt,l=>this._settingItemChange(i,r,l)),()=>{let l=[...t.items??[]];l.splice(r,1),this._settingsGroupPatch(i,{items:l})}))}
                <button
                  class="add"
                  @click=${()=>this._settingsGroupPatch(i,{items:[...t.items??[],{entity:""}]})}
                >
                  <ha-icon icon="mdi:plus"></ha-icon> Kachel hinzufügen
                </button>
                <button
                  class="remove"
                  @click=${()=>{let s=[...this._settings()];s.splice(i,1),this._settingsPatch(s)}}
                >
                  <ha-icon icon="mdi:delete-outline"></ha-icon> Gruppe entfernen
                </button>
              </div>
            </ha-expansion-panel>`)}
          <button
            class="add primary"
            @click=${()=>this._settingsPatch([...this._settings(),{title:"",items:[]}])}
          >
            <ha-icon icon="mdi:plus"></ha-icon> Gruppe hinzufügen
          </button>
          <p class="hint">
            Helper-Kacheln in der einklappbaren Konfigurations-Sektion der Karte,
            z.B. Gruppen "Lichtzeiten" oder "Pumpenzeiten · Seedling". Tap auf eine
            Kachel öffnet den HA-Einstellungsdialog. Die Phasen-Chips zum Umschalten
            erscheinen automatisch, sobald unter Grow-Phasen ein input_select gewählt ist.
          </p>
        </div>
      </ha-expansion-panel>

      <ha-expansion-panel outlined .expanded=${!0}>
        <div slot="header" class="ph"><ha-icon icon="mdi:flower-outline"></ha-icon>Pflanzen</div>
        <div class="section">
          ${this._plants().map((t,i)=>c`<ha-expansion-panel outlined class="plant-panel">
              <div slot="header" class="ph">
                <ha-icon icon="mdi:sprout"></ha-icon>${t.name||`Pflanze ${i+1}`}
              </div>
              <div class="section">
                ${this._form({name:t.name,strain:t.strain,germination_helper:t.germination_helper,calendar:t.calendar},St,s=>this._plantPatch(i,s))}
                <div class="sub">Sensoren dieser Pflanze</div>
                ${(t.sensors??[]).map((s,r)=>this._row(this._form(s,We,l=>this._plantSensorChange(i,r,l)),()=>this._plantSensorRemove(i,r)))}
                <button class="add" @click=${()=>this._plantSensorAdd(i)}>
                  <ha-icon icon="mdi:plus"></ha-icon> Sensor hinzufügen
                </button>
                <button class="remove" @click=${()=>this._plantRemove(i)}>
                  <ha-icon icon="mdi:delete-outline"></ha-icon> Pflanze entfernen
                </button>
              </div>
            </ha-expansion-panel>`)}
          <button class="add primary" @click=${this._plantAdd}>
            <ha-icon icon="mdi:plus"></ha-icon> Pflanze hinzufügen
          </button>
        </div>
      </ha-expansion-panel>

      <ha-expansion-panel outlined>
        <div slot="header" class="ph">
          <ha-icon icon="mdi:tools"></ha-icon>Experten-Modus
        </div>
        <div class="section">
          <div class="sub">Schalter (Wartung, Test ...)</div>
          ${(e.expert?.controls??[]).map((t,i)=>this._row(this._form(t,Ve,s=>{let r=[...e.expert?.controls??[]];r[i]=s,this._expertPatch({controls:r})}),()=>{let s=[...e.expert?.controls??[]];s.splice(i,1),this._expertPatch({controls:s})}))}
          <button
            class="add"
            @click=${()=>this._expertPatch({controls:[...e.expert?.controls??[],{entity:""}]})}
          >
            <ha-icon icon="mdi:plus"></ha-icon> Schalter hinzufügen
          </button>

          <div class="sub">Logs (Text-/Sensor-Entitäten)</div>
          ${(e.expert?.logs??[]).map((t,i)=>this._row(this._form(t,yt,s=>{let r=[...e.expert?.logs??[]];r[i]=s,this._expertPatch({logs:r})}),()=>{let s=[...e.expert?.logs??[]];s.splice(i,1),this._expertPatch({logs:s})}))}
          <button
            class="add"
            @click=${()=>this._expertPatch({logs:[...e.expert?.logs??[],{entity:""}]})}
          >
            <ha-icon icon="mdi:plus"></ha-icon> Log hinzufügen
          </button>
          <p class="hint">
            Erscheint als einklappbare Sektion am Ende der Karte. Schalter im
            Experten-Modus verlangen standardmäßig eine Bestätigung.
          </p>
        </div>
      </ha-expansion-panel>
    `}};J.styles=R`
    ha-expansion-panel {
      display: block;
      margin-bottom: 10px;
      --expansion-panel-summary-padding: 0 12px;
    }
    .ph {
      display: flex;
      align-items: center;
      gap: 8px;
      font-weight: 600;
    }
    .ph ha-icon {
      --mdc-icon-size: 18px;
      color: var(--primary-color);
    }
    .section {
      padding: 4px 12px 12px;
    }
    ha-form {
      display: block;
      margin-bottom: 8px;
    }
    .row {
      display: flex;
      align-items: flex-start;
      gap: 6px;
      padding: 10px 8px 2px;
      margin-bottom: 8px;
      border: 1px dashed var(--divider-color);
      border-radius: 10px;
    }
    .row-form {
      flex: 1;
      min-width: 0;
    }
    .icon-btn {
      background: none;
      border: none;
      cursor: pointer;
      color: var(--secondary-text-color);
      padding: 6px;
    }
    .icon-btn:hover {
      color: var(--error-color, #cf5b4c);
    }
    .add,
    .remove {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 7px 14px;
      margin: 4px 8px 4px 0;
      border-radius: 999px;
      border: 1px solid var(--divider-color);
      background: var(--secondary-background-color);
      color: var(--primary-text-color);
      font: inherit;
      font-size: 0.85em;
      cursor: pointer;
    }
    .add.primary {
      border-color: var(--primary-color);
      color: var(--primary-color);
      font-weight: 600;
    }
    .remove {
      color: var(--error-color, #cf5b4c);
    }
    .add ha-icon,
    .remove ha-icon {
      --mdc-icon-size: 16px;
    }
    .sub {
      font-size: 0.8em;
      font-weight: 600;
      color: var(--secondary-text-color);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin: 10px 0 6px;
    }
    .hint {
      font-size: 0.78em;
      color: var(--secondary-text-color);
      margin: 6px 0 0;
    }
    .plant-panel {
      margin: 8px 0;
    }
  `;customElements.define("growctrl-tent-card-editor",J);window.customCards=window.customCards||[];window.customCards.push({type:"growctrl-tent-card",name:"GROWCTRL Tent Card",description:"Growzelt-\xDCbersicht: Klima & VPD-Zone, Sensoren mit Sparklines, Steuerung, Grow-Phasen und Pflanzen (DWC & Erde).",preview:!0,documentationURL:"https://github.com/your-user/growctrl-tent-card"});console.info("%c GROWCTRL-TENT-CARD %c v1.3.0 ","background:#3e9d52;color:#fff;font-weight:700;border-radius:4px 0 0 4px;padding:2px 6px","background:#444;color:#fff;border-radius:0 4px 4px 0;padding:2px 6px");
/*! Bundled license information:

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/reactive-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/lit-html.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-element/lit-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/is-server.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
