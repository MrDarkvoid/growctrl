var q=globalThis,X=q.ShadowRoot&&(q.ShadyCSS===void 0||q.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,et=Symbol(),Ct=new WeakMap,D=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==et)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(X&&t===void 0){let s=e!==void 0&&e.length===1;s&&(t=Ct.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&Ct.set(e,t))}return t}toString(){return this.cssText}},Ft=n=>new D(typeof n=="string"?n:n+"",void 0,et),st=(n,...t)=>{let e=n.length===1?n[0]:t.reduce((s,i,r)=>s+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+n[r+1],n[0]);return new D(e,n,et)},kt=(n,t)=>{if(X)n.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let s=document.createElement("style"),i=q.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=e.cssText,n.appendChild(s)}},it=X?n=>n:n=>n instanceof CSSStyleSheet?(t=>{let e="";for(let s of t.cssRules)e+=s.cssText;return Ft(e)})(n):n;var{is:ue,defineProperty:he,getOwnPropertyDescriptor:ge,getOwnPropertyNames:fe,getOwnPropertySymbols:me,getPrototypeOf:_e}=Object,J=globalThis,Ot=J.trustedTypes,be=Ot?Ot.emptyScript:"",ve=J.reactiveElementPolyfillSupport,H=(n,t)=>n,nt={toAttribute(n,t){switch(t){case Boolean:n=n?be:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,t){let e=n;switch(t){case Boolean:e=n!==null;break;case Number:e=n===null?null:Number(n);break;case Object:case Array:try{e=JSON.parse(n)}catch{e=null}}return e}},Tt=(n,t)=>!ue(n,t),Pt={attribute:!0,type:String,converter:nt,reflect:!1,useDefault:!1,hasChanged:Tt};Symbol.metadata??=Symbol("metadata"),J.litPropertyMetadata??=new WeakMap;var x=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=Pt){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let s=Symbol(),i=this.getPropertyDescriptor(t,s,e);i!==void 0&&he(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){let{get:i,set:r}=ge(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get:i,set(o){let c=i?.call(this);r?.call(this,o),this.requestUpdate(t,c,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??Pt}static _$Ei(){if(this.hasOwnProperty(H("elementProperties")))return;let t=_e(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(H("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(H("properties"))){let e=this.properties,s=[...fe(e),...me(e)];for(let i of s)this.createProperty(i,e[i])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[s,i]of e)this.elementProperties.set(s,i)}this._$Eh=new Map;for(let[e,s]of this.elementProperties){let i=this._$Eu(e,s);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let s=new Set(t.flat(1/0).reverse());for(let i of s)e.unshift(it(i))}else t!==void 0&&e.push(it(t));return e}static _$Eu(t,e){let s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return kt(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){let s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(i!==void 0&&s.reflect===!0){let r=(s.converter?.toAttribute!==void 0?s.converter:nt).toAttribute(e,s.type);this._$Em=t,r==null?this.removeAttribute(i):this.setAttribute(i,r),this._$Em=null}}_$AK(t,e){let s=this.constructor,i=s._$Eh.get(t);if(i!==void 0&&this._$Em!==i){let r=s.getPropertyOptions(i),o=typeof r.converter=="function"?{fromAttribute:r.converter}:r.converter?.fromAttribute!==void 0?r.converter:nt;this._$Em=i;let c=o.fromAttribute(e,r.type);this[i]=c??this._$Ej?.get(i)??c,this._$Em=null}}requestUpdate(t,e,s,i=!1,r){if(t!==void 0){let o=this.constructor;if(i===!1&&(r=this[t]),s??=o.getPropertyOptions(t),!((s.hasChanged??Tt)(r,e)||s.useDefault&&s.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,s))))return;this.C(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:r},o){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),r!==!0||o!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),i===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[i,r]of this._$Ep)this[i]=r;this._$Ep=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[i,r]of s){let{wrapped:o}=r,c=this[i];o!==!0||this._$AL.has(i)||c===void 0||this.C(i,void 0,r,c)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(e)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[H("elementProperties")]=new Map,x[H("finalized")]=new Map,ve?.({ReactiveElement:x}),(J.reactiveElementVersions??=[]).push("2.1.2");var pt=globalThis,Lt=n=>n,Q=pt.trustedTypes,Mt=Q?Q.createPolicy("lit-html",{createHTML:n=>n}):void 0,Dt="$lit$",A=`lit$${Math.random().toFixed(9).slice(2)}$`,Ht="?"+A,$e=`<${Ht}>`,C=document,G=()=>C.createComment(""),V=n=>n===null||typeof n!="object"&&typeof n!="function",ut=Array.isArray,ye=n=>ut(n)||typeof n?.[Symbol.iterator]=="function",rt=`[ 	
\f\r]`,z=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Rt=/-->/g,Nt=/>/g,S=RegExp(`>|${rt}(?:([^\\s"'>=/]+)(${rt}*=${rt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ut=/'/g,It=/"/g,zt=/^(?:script|style|textarea|title)$/i,ht=n=>(t,...e)=>({_$litType$:n,strings:t,values:e}),d=ht(1),Le=ht(2),Me=ht(3),F=Symbol.for("lit-noChange"),l=Symbol.for("lit-nothing"),Bt=new WeakMap,E=C.createTreeWalker(C,129);function Gt(n,t){if(!ut(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return Mt!==void 0?Mt.createHTML(t):t}var xe=(n,t)=>{let e=n.length-1,s=[],i,r=t===2?"<svg>":t===3?"<math>":"",o=z;for(let c=0;c<e;c++){let a=n[c],g,p,u=-1,m=0;for(;m<a.length&&(o.lastIndex=m,p=o.exec(a),p!==null);)m=o.lastIndex,o===z?p[1]==="!--"?o=Rt:p[1]!==void 0?o=Nt:p[2]!==void 0?(zt.test(p[2])&&(i=RegExp("</"+p[2],"g")),o=S):p[3]!==void 0&&(o=S):o===S?p[0]===">"?(o=i??z,u=-1):p[1]===void 0?u=-2:(u=o.lastIndex-p[2].length,g=p[1],o=p[3]===void 0?S:p[3]==='"'?It:Ut):o===It||o===Ut?o=S:o===Rt||o===Nt?o=z:(o=S,i=void 0);let h=o===S&&n[c+1].startsWith("/>")?" ":"";r+=o===z?a+$e:u>=0?(s.push(g),a.slice(0,u)+Dt+a.slice(u)+A+h):a+A+(u===-2?c:h)}return[Gt(n,r+(n[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]},j=class n{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let r=0,o=0,c=t.length-1,a=this.parts,[g,p]=xe(t,e);if(this.el=n.createElement(g,s),E.currentNode=this.el.content,e===2||e===3){let u=this.el.content.firstChild;u.replaceWith(...u.childNodes)}for(;(i=E.nextNode())!==null&&a.length<c;){if(i.nodeType===1){if(i.hasAttributes())for(let u of i.getAttributeNames())if(u.endsWith(Dt)){let m=p[o++],h=i.getAttribute(u).split(A),b=/([.?@])?(.*)/.exec(m);a.push({type:1,index:r,name:b[2],strings:h,ctor:b[1]==="."?at:b[1]==="?"?lt:b[1]==="@"?ct:T}),i.removeAttribute(u)}else u.startsWith(A)&&(a.push({type:6,index:r}),i.removeAttribute(u));if(zt.test(i.tagName)){let u=i.textContent.split(A),m=u.length-1;if(m>0){i.textContent=Q?Q.emptyScript:"";for(let h=0;h<m;h++)i.append(u[h],G()),E.nextNode(),a.push({type:2,index:++r});i.append(u[m],G())}}}else if(i.nodeType===8)if(i.data===Ht)a.push({type:2,index:r});else{let u=-1;for(;(u=i.data.indexOf(A,u+1))!==-1;)a.push({type:7,index:r}),u+=A.length-1}r++}}static createElement(t,e){let s=C.createElement("template");return s.innerHTML=t,s}};function P(n,t,e=n,s){if(t===F)return t;let i=s!==void 0?e._$Co?.[s]:e._$Cl,r=V(t)?void 0:t._$litDirective$;return i?.constructor!==r&&(i?._$AO?.(!1),r===void 0?i=void 0:(i=new r(n),i._$AT(n,e,s)),s!==void 0?(e._$Co??=[])[s]=i:e._$Cl=i),i!==void 0&&(t=P(n,i._$AS(n,t.values),i,s)),t}var ot=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??C).importNode(e,!0);E.currentNode=i;let r=E.nextNode(),o=0,c=0,a=s[0];for(;a!==void 0;){if(o===a.index){let g;a.type===2?g=new W(r,r.nextSibling,this,t):a.type===1?g=new a.ctor(r,a.name,a.strings,this,t):a.type===6&&(g=new dt(r,this,t)),this._$AV.push(g),a=s[++c]}o!==a?.index&&(r=E.nextNode(),o++)}return E.currentNode=C,i}p(t){let e=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}},W=class n{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=l,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=P(this,t,e),V(t)?t===l||t==null||t===""?(this._$AH!==l&&this._$AR(),this._$AH=l):t!==this._$AH&&t!==F&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):ye(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==l&&V(this._$AH)?this._$AA.nextSibling.data=t:this.T(C.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:s}=t,i=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=j.createElement(Gt(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(e);else{let r=new ot(i,this),o=r.u(this.options);r.p(e),this.T(o),this._$AH=r}}_$AC(t){let e=Bt.get(t.strings);return e===void 0&&Bt.set(t.strings,e=new j(t)),e}k(t){ut(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,s,i=0;for(let r of t)i===e.length?e.push(s=new n(this.O(G()),this.O(G()),this,this.options)):s=e[i],s._$AI(r),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let s=Lt(t).nextSibling;Lt(t).remove(),t=s}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},T=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,r){this.type=1,this._$AH=l,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=r,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=l}_$AI(t,e=this,s,i){let r=this.strings,o=!1;if(r===void 0)t=P(this,t,e,0),o=!V(t)||t!==this._$AH&&t!==F,o&&(this._$AH=t);else{let c=t,a,g;for(t=r[0],a=0;a<r.length-1;a++)g=P(this,c[s+a],e,a),g===F&&(g=this._$AH[a]),o||=!V(g)||g!==this._$AH[a],g===l?t=l:t!==l&&(t+=(g??"")+r[a+1]),this._$AH[a]=g}o&&!i&&this.j(t)}j(t){t===l?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},at=class extends T{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===l?void 0:t}},lt=class extends T{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==l)}},ct=class extends T{constructor(t,e,s,i,r){super(t,e,s,i,r),this.type=5}_$AI(t,e=this){if((t=P(this,t,e,0)??l)===F)return;let s=this._$AH,i=t===l&&s!==l||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,r=t!==l&&(s===l||i);i&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},dt=class{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){P(this,t)}};var Ae=pt.litHtmlPolyfillSupport;Ae?.(j,W),(pt.litHtmlVersions??=[]).push("3.3.3");var Vt=(n,t,e)=>{let s=e?.renderBefore??t,i=s._$litPart$;if(i===void 0){let r=e?.renderBefore??null;s._$litPart$=i=new W(t.insertBefore(G(),r),r,void 0,e??{})}return i._$AI(n),i};var gt=globalThis,w=class extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Vt(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return F}};w._$litElement$=!0,w.finalized=!0,gt.litElementHydrateSupport?.({LitElement:w});var we=gt.litElementPolyfillSupport;we?.({LitElement:w});(gt.litElementVersions??=[]).push("4.2.2");var Y=n=>n===null||isNaN(n)?"\u2013":n<60?`${n} min`:`${Math.floor(n/60)}h ${n%60}min`,ft=n=>{let t=n.split(" ").pop().substring(0,5).split(":");return parseInt(t[0])*60+parseInt(t[1])},$=(n,t=null)=>{if(n===void 0||["unknown","unavailable",""].includes(n))return t;let e=parseFloat(n);return isNaN(e)?t:e},jt=n=>{let t=Date.parse(n);return isNaN(t)?null:Math.floor((Date.now()-t)/864e5)};var Wt=n=>.61078*Math.exp(17.27*n/(n+237.3)),Kt=(n,t,e=0)=>{let s=n+e;return Wt(s)-Wt(n)*(t/100)},L=[{max:.4,label:"Zu feucht",color:"#4FC3F7"},{max:.8,label:"Seedling",color:"#7EC8FF"},{max:1.2,label:"Veg",color:"#7EE87E"},{max:1.6,label:"Bloom",color:"#FFB432"},{max:9.9,label:"Zu trocken",color:"#FF6B6B"}],Zt=n=>L.find(t=>n<=t.max)??L[L.length-1];var qt=n=>!n||["unknown","unavailable",""].includes(n),Xt=n=>n.length>=16?n.substring(11,16):"",K=n=>{if(qt(n))return{level:"none",label:"\u2014",ts:""};let t=n,e=Xt(t);if(t.includes("SENSOR INVALID"))return{level:"critical",label:"\u{1F6A8} Sensor ung\xFCltig \u2014 Befeuchtung gesperrt",ts:e};if(t.includes("MAINTENANCE"))return{level:"info",label:"\u{1F527} Wartungsmodus aktiv",ts:e};if(t.includes("TESTMODE"))return{level:"info",label:"\u{1F9EA} Testmodus aktiv",ts:e};if(t.includes("AUTO OFF"))return{level:"info",label:"\u{1F534} Klima-Automatik deaktiviert",ts:e};let s=t.match(/(?:IST|SOLL)\s+(?:F|CIRC)=(\w+)/i)?.[1]?.toLowerCase(),i=t.match(/IST\s+(?:CIRC|F)=\w+\s+HUM=(\w+)/i)?.[1]?.toUpperCase(),r=t.match(/REQ=(\w+)/i)?.[1]?.toUpperCase();if(i!==void 0){let o=[];return s==="on"?o.push("Umluft AN"):s==="manual"?o.push("Umluft Manuell"):s==="off"&&o.push("Umluft AUS"),o.push(i==="ON"?"Befeuchtung AN":"Befeuchtung AUS"),o.push(r==="ON"?"Entfeuchtung AN":"Entfeuchtung AUS"),t.includes("ZENTRAL-BLOCK")&&o.push("(Zentral-Block)"),{level:"ok",label:o.join(" \xB7 "),ts:e}}return{level:"ok",label:t.replace(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}\s*/,"").substring(0,45),ts:e}},k=n=>{if(qt(n))return{level:"none",label:"\u2014",ts:""};let t=n,e=Xt(t);if(t.includes("FAILSAFE LIGHT"))return{level:"critical",label:"\u{1F6A8} Failsafe: Licht-Zwangsabschaltung \u2014 Auto deaktiviert",ts:e};if(t.includes("FAILSAFE PUMP"))return{level:"critical",label:"\u{1F6A8} Failsafe: Pumpen-Zwangsabschaltung \u2014 Auto deaktiviert",ts:e};if(t.includes("TIME INVALID"))return{level:"critical",label:"\u26A0\uFE0F Lichtzeiten nicht konfiguriert",ts:e};if(t.includes("MISMATCH")){let p=h=>t.match(h)?.[1];return{level:"warning",label:"\u26A0\uFE0F Ger\xE4t antwortet nicht: "+([["Licht",p(/IST.*?\bL=(\w+)/i),p(/SOLL.*?\bL=(\w+)/i)],["Pumpe",p(/IST.*?\bP=(\w+)/i),p(/SOLL.*?\bP=(\w+)/i)],["O\u2082",p(/IST.*?\bO2=(\w+)/i),p(/SOLL.*?\bO2=(\w+)/i)]].filter(([,h,b])=>h&&b&&h!==b).map(([h,b,O])=>`${h} (IST ${b.toUpperCase()} / SOLL ${O.toUpperCase()})`).join(", ")||"Abweichung"),ts:e}}if(t.includes("MAINTENANCE"))return{level:"info",label:"\u{1F527} Wartungsmodus aktiv",ts:e};if(t.includes("TESTMODE"))return{level:"info",label:"\u{1F9EA} Testmodus aktiv",ts:e};let s=t.match(/IST.*?\bL=(\w+)/i)?.[1],i=t.match(/IST.*?\bP=(\w+)/i)?.[1],r=t.match(/IST.*?\bO2=(\w+)/i)?.[1],o=t.includes("OVRUNTIL")?" (Override aktiv)":"",c=[s&&s!=="n/a"?s==="on"?"\u{1F4A1} Licht AN":"\u{1F311} Licht AUS":null,i&&i!=="n/a"?i==="on"?"\u{1F4A7} Pumpe AN":"\u23F8\uFE0F Pumpe AUS":null,r&&r!=="n/a"?r==="on"?"\u{1FAE7} O\u2082 AN":"\u{1FAE7} O\u2082 AUS":null].filter(Boolean).join(" \xB7 "),a="";return t.includes("AUTO ON")?a="\u{1F7E2} Auto gestartet":t.includes("AUTO OFF")?a="\u{1F534} Auto gestoppt":t.match(/STAGE\s*\u2192/)?a=`\u{1F331} Phase: ${t.match(/STAGE\s*\u2192\s*(\w+)/)?.[1]??""}`:t.includes("LIGHT \u2192 ON")?a="\u{1F4A1} Licht eingeschaltet":t.includes("LIGHT \u2192 OFF")?a="\u{1F311} Licht ausgeschaltet":t.includes("PUMP \u2192 ON")?a="\u{1F4A7} Pumpe eingeschaltet":t.includes("PUMP \u2192 OFF")?a="\u23F8\uFE0F Pumpe ausgeschaltet":t.includes("O2 \u2192 ON")?a="\u{1FAE7} O\u2082 eingeschaltet":t.includes("FAN \u2192 ON")?a="\u{1F300} L\xFCfter eingeschaltet":t.includes("MANUAL OVERRIDE")?a="\u270B Manuell \xFCbersteuert":t.includes("OVERRIDE END")&&(a="\u2705 Override beendet"),{level:"ok",label:[a,c].filter(Boolean).join(" \u2014 ")+o||t.substring(17,55),ts:e}},Jt=n=>n?.match(/IST.*?\bP=(\w+)/i)?.[1]==="on";var Qt={auto:"input_boolean.hydro_auto_{tent}_{station}",stage:"input_select.hydro_stage_{tent}_{station}",log:"input_text.hydro_log_{tent}_{station}",climate_log:"input_text.hydro_climate_log_{tent}",light_on:"input_datetime.hydro_light_on_{tent}_{station}",light_off_sv:"input_datetime.hydro_light_off_sv_{tent}_{station}",light_off_bloom:"input_datetime.hydro_light_off_bloom_{tent}_{station}",pump_on_seedling:"input_number.hydro_pump_on_seedling_{tent}_{station}",pump_off_seedling:"input_number.hydro_pump_off_seedling_{tent}_{station}",pump_on_veg:"input_number.hydro_pump_on_veg_{tent}_{station}",pump_off_veg:"input_number.hydro_pump_off_veg_{tent}_{station}",pump_on_bloom:"input_number.hydro_pump_on_bloom_{tent}_{station}",pump_off_bloom:"input_number.hydro_pump_off_bloom_{tent}_{station}",light_rest:"sensor.{tent}_{station}_licht_restzeit",pump_rest:"sensor.{tent}_{station}_pumpe_restzeit",maintenance:"input_boolean.hydro_maintenance_{tent}",testmode:"input_boolean.hydro_testmode_{tent}",climate_auto:"input_boolean.hydro_climate_auto_{tent}",dehum_request:"input_boolean.hydro_dehum_request_{tent}"},Se=(n,t)=>n.replaceAll("{tent}",t.tent).replaceAll("{station}",t.station),Yt=(n,t)=>{let e={};return Object.keys(Qt).forEach(s=>{let i=t.overrides?.[s];if(i){e[s]=i;return}let r=t.templates?.[s]??Qt[s],o=Se(r,t);n.states[o]&&(e[s]=o)}),e};var te=new Map,ee=new Map;async function se(n,t,e=24,s=48){let i=`${t}:${e}`,r=te.get(i);if(r&&Date.now()-r.t<5*6e4)return r.data;try{let o=new Date(Date.now()-e*36e5).toISOString(),a=((await n.callApi("GET",`history/period/${o}?filter_entity_id=${t}&minimal_response&no_attributes`))?.[0]??[]).map(u=>parseFloat(u.state??u.s)).filter(u=>!isNaN(u)),g=Math.max(1,Math.floor(a.length/s)),p=a.filter((u,m)=>m%g===0);return te.set(i,{t:Date.now(),data:p}),p}catch{return r?.data??[]}}async function ie(n,t,e=14){let s=ee.get(t);if(s&&Date.now()-s.t<10*6e4)return s.data;try{let i=new Date().toISOString(),r=new Date(Date.now()+e*864e5).toISOString(),o=await n.callApi("GET",`calendars/${t}?start=${i}&end=${r}`);return ee.set(t,{t:Date.now(),data:o??[]}),o??[]}catch{return s?.data??[]}}var ne=(n,t=100,e=24)=>{if(n.length<2)return"";let s=Math.min(...n),i=Math.max(...n),r=i-s||1;return n.map((o,c)=>`${c===0?"M":"L"}${(c/(n.length-1)*t).toFixed(1)},${(e-(o-s)/r*e).toFixed(1)}`).join(" ")};var f={label:"rgba(255,255,255,0.85)",value:"rgba(255,255,255,1.0)",muted:"rgba(255,255,255,0.50)",logLabel:"rgba(255,255,255,0.75)",logText:"rgba(255,255,255,0.88)",ok:"#4DFFC3",warn:"#FFD166",crit:"#FF6B6B",info:"#FFD166",tileBg:"rgba(0,0,0,0.20)",rowBg:"rgba(0,0,0,0.18)"},M={critical:"rgba(255,107,107,.22)",warning:"rgba(255,209,102,.2)",info:"rgba(255,209,102,.15)",ok:f.rowBg,none:"rgba(0,0,0,.12)"},R={critical:f.crit,warning:f.warn,info:f.info,ok:f.logText,none:"rgba(255,255,255,.35)"},mt={Seedling:{bg:"rgba(100,180,255,0.2)",color:"#7EC8FF"},Veg:{bg:"rgba(100,220,100,0.25)",color:"#7EE87E"},Bloom:{bg:"rgba(255,180,50,0.25)",color:"#FFB432"},Flush:{bg:"rgba(255,180,50,0.25)",color:"#FFB432"}},y=st`
  :host { display: block; }
  .card { border-radius: 16px; padding: 16px 18px; color: #fff;
          background: var(--growctrl-bg, linear-gradient(135deg,#1f2733,#141a23));
          font-family: var(--primary-font-family, Roboto, sans-serif); }
  .clickable { cursor: pointer; }
  .hdr { display: flex; justify-content: space-between; align-items: flex-start; gap: 8px; flex-wrap: wrap; }
  .title { font-size: 20px; font-weight: 800; letter-spacing: -.3px; }
  .subtitle { font-size: 11px; color: rgba(255,255,255,.75); margin-top: 3px; }
  .badges { display: flex; gap: 6px; flex-wrap: wrap; justify-content: flex-end; }
  .badge { font-size: 10px; font-weight: 700; background: rgba(255,255,255,.2); color: #fff;
           padding: 3px 9px; border-radius: 20px; white-space: nowrap; }
  .badge.warn { background: rgba(255,165,0,.5); }
  .grid { display: grid; gap: 8px; margin-top: 8px; }
  .tile { background: rgba(0,0,0,0.20); border-radius: 12px; padding: 10px 12px; min-width: 0; }
  .tile .lbl { font-size: 10px; text-transform: uppercase; letter-spacing: .7px; color: rgba(255,255,255,0.85); }
  .tile .val { font-size: 24px; font-weight: 800; }
  .tile .val.sm { font-size: 18px; font-weight: 700; }
  .logrow { display: flex; align-items: center; gap: 6px; border-radius: 8px; padding: 6px 10px; min-width: 0; }
  .logrow .txt { font-size: 11px; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; flex: 1; }
  .logrow .ts { font-size: 10px; color: rgba(255,255,255,0.5); flex-shrink: 0; }
  .seclbl { font-size: 10px; text-transform: uppercase; letter-spacing: .8px; color: rgba(255,255,255,0.5); margin: 8px 0 4px; }
  .stagebadge { font-size: 10px; font-weight: 700; padding: 3px 9px; border-radius: 9px; }
  .barrow { display: flex; align-items: center; gap: 7px; }
  .barrow .ico { font-size: 12px; flex-shrink: 0; }
  .barrow .track { flex: 1; height: 10px; background: rgba(0,0,0,.3); border-radius: 5px; overflow: hidden; }
  .barrow .fill { height: 100%; border-radius: 5px; }
  .barrow .time { font-size: 11px; min-width: 82px; flex-shrink: 0; text-align: right; }
  button.gc { all: unset; cursor: pointer; }
`;var _=class extends w{constructor(){super(...arguments);this._config={};this._confirm=null}static{this.properties={hass:{attribute:!1},_config:{state:!0},_confirm:{state:!0}}}setConfig(e){this.validateConfig(e),this._config=e}validateConfig(e){}getCardSize(){return 4}st(e){return e?this.hass?.states[e]?.state:void 0}isOn(e){return this.st(e)==="on"}friendly(e){return e&&this.hass?.states[e]?.attributes?.friendly_name||e||""}unit(e){return e&&this.hass?.states[e]?.attributes?.unit_of_measurement||""}moreInfo(e){this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:e},bubbles:!0,composed:!0}))}navigate(e){history.pushState(null,"",e),window.dispatchEvent(new CustomEvent("location-changed"))}toggle(e){let s=e.split(".")[0],i=["switch","input_boolean","light","fan"].includes(s)?s:"homeassistant";this.hass.callService(i,"toggle",{entity_id:e})}confirmToggle(e,s){this._confirm={text:`${s} wirklich schalten?`,action:()=>this.toggle(e)}}renderConfirm(){return this._confirm?d`<div style="position:absolute;inset:0;background:rgba(0,0,0,.6);border-radius:16px;
        display:flex;align-items:center;justify-content:center;z-index:5">
      <div style="background:#1c2330;border:1px solid rgba(255,255,255,.15);border-radius:12px;padding:16px;max-width:80%">
        <div style="font-size:13px;margin-bottom:12px">${this._confirm.text}</div>
        <div style="display:flex;gap:8px;justify-content:flex-end">
          <button class="gc" style="padding:6px 14px;border-radius:8px;background:rgba(255,255,255,.1)"
            @click=${()=>{this._confirm=null}}>Abbrechen</button>
          <button class="gc" style="padding:6px 14px;border-radius:8px;background:rgba(77,255,195,.2);color:#4DFFC3"
            @click=${()=>{this._confirm.action(),this._confirm=null}}>Schalten</button>
        </div>
      </div>
    </div>`:l}};var _t=class extends _{static{this.styles=y}validateConfig(t){if(!t.temperature||!t.humidity)throw new Error("growctrl-tent-card: 'temperature' und 'humidity' sind Pflicht.")}static getStubConfig(){return{temperature:"sensor.zelt_temperature",humidity:"sensor.zelt_humidity",title:"Mein Zelt"}}levels(){return(this._config.logs??[]).map(t=>(t.type==="climate"?K:k)(this.st(t.entity)).level)}render(){let t=this._config;if(!this.hass)return l;let e=$(this.st(t.temperature)),s=$(this.st(t.humidity)),i=t.power?$(this.st(t.power)):null,r=e!==null&&s!==null?Kt(e,s,t.leaf_offset??0):null,o=r!==null?Zt(r):null,c=this.levels(),a={label:"\u2713 Alles OK",color:f.ok};c.includes("critical")?a={label:"\u{1F6A8} Fehler",color:f.crit}:c.includes("warning")?a={label:"\u26A0\uFE0F Warnung",color:f.warn}:this.isOn(t.dehum_request)?a={label:"\u{1F4A7} Dehum AN",color:f.warn}:e!==null&&(e<(t.temp_min??18)||e>(t.temp_max??30))?a={label:"\u26A0\uFE0F Temp!",color:f.warn}:c.includes("info")&&(a={label:"\u2139\uFE0F Info",color:f.info});let g=t.gradient?`linear-gradient(135deg,${t.gradient})`:void 0,p=2,u=r!==null?Math.min(100,Math.max(0,r/p*100)):null;return d`<div class="card ${t.tap_navigation?"clickable":""}"
        style=${g?`background:${g}`:""}
        @click=${()=>t.tap_navigation&&this.navigate(t.tap_navigation)}>
      <div class="hdr">
        <div>
          <div class="title">${t.title??"Zelt"}</div>
          ${t.subtitle?d`<div class="subtitle">${t.subtitle}</div>`:l}
        </div>
        <div class="badges">
          ${this.isOn(t.climate_auto)?d`<span class="badge">\u2699 Klima Auto</span>`:l}
          ${this.isOn(t.maintenance)?d`<span class="badge warn">\u{1F527} Wartung</span>`:l}
        </div>
      </div>
      <div class="grid" style="grid-template-columns:1fr 1fr 1fr">
        <div class="tile"><div class="lbl">Temperatur</div><div class="val">${e!==null?e.toFixed(1):"--"}\u00b0C</div></div>
        <div class="tile"><div class="lbl">Luftfeuchte</div><div class="val">${s!==null?Math.round(s):"--"}%</div></div>
        <div class="tile"><div class="lbl">VPD</div><div class="val">${r!==null?r.toFixed(2):"--"}</div></div>
      </div>
      ${t.show_vpd_scale!==!1&&u!==null?d`
        <div style="margin-top:8px">
          <div style="position:relative;height:10px;border-radius:5px;overflow:hidden;display:flex">
            ${L.map((m,h)=>{let b=h===0?0:Math.min(L[h-1].max,p),O=Math.max(0,(Math.min(m.max,p)-b)/p*100);return d`<div style="width:${O}%;background:${m.color};opacity:.55"></div>`})}
            <div style="position:absolute;left:${u}%;top:-2px;width:3px;height:14px;background:#fff;border-radius:2px;transform:translateX(-50%)"></div>
          </div>
          <div style="font-size:10px;color:${f.muted};margin-top:3px">${o.label} \u00b7 ${r.toFixed(2)} kPa${t.leaf_offset?` (Blatt ${t.leaf_offset>0?"+":""}${t.leaf_offset}K)`:""}</div>
        </div>`:l}
      <div class="grid" style="grid-template-columns:1fr 1fr">
        ${t.power?d`<div class="tile"><div class="lbl">Leistung</div><div class="val sm">\u26A1 ${i!==null?Math.round(i):"--"} W</div></div>`:l}
        <div class="tile" style=${t.power?"":"grid-column:1 / -1"}><div class="lbl">Status</div>
          <div class="val sm" style="color:${a.color}">${a.label}</div></div>
      </div>
      ${(t.logs??[]).length?d`<div class="seclbl">Letzte Ereignisse</div>
        ${(t.logs??[]).map(m=>{let h=(m.type==="climate"?K:k)(this.st(m.entity));return d`<div class="logrow" style="background:${M[h.level]};margin-top:4px">
            <span class="txt" style="color:${R[h.level]}">${h.label}</span>
            ${h.ts?d`<span class="ts">${h.ts}</span>`:l}
          </div>`})}`:l}
    </div>`}};customElements.define("growctrl-tent-card",_t);var Ee=["Seedling","Veg","Bloom","Flush"],bt=class extends _{constructor(){super(...arguments);this._open=!1}static{this.styles=y}static{this.properties={..._.properties,_open:{state:!0}}}validateConfig(e){if(!e.station?.tent||!e.station?.station)throw new Error("growctrl-station-card: 'station: { tent, station }' ist Pflicht (Profil-Modus).")}static getStubConfig(){return{station:{tent:"mittel",station:"main1",light_switch:"switch.licht"}}}render(){let e=this._config;if(!this.hass)return l;let s=e.station,i=Yt(this.hass,s),r=v=>i[v],o=this.st(r("stage"))??"",c=this.isOn(r("auto")),a=s.light_switch?this.isOn(s.light_switch):!1,g=this.st(r("log")),p=$(this.st(r("light_rest"))),u=$(this.st(r("pump_rest"))),m=this.st(r("light_on"))??"",h=o==="Bloom"||o==="Flush"?this.st(r("light_off_bloom"))??"":this.st(r("light_off_sv"))??"",b=(h?ft(h):0)-(m?ft(m):0);b<=0&&(b+=24*60);let O=24*60-b,Z=o==="Seedling"?"seedling":o==="Veg"?"veg":"bloom",At=$(this.st(r(`pump_on_${Z}`)),10),wt=$(this.st(r(`pump_off_${Z}`)),15),St=At+wt,re=Jt(g),oe=p!==null&&b>0?Math.min(100,Math.round(p/b*100)):0,ae=p!==null&&O>0?Math.min(100,Math.round(p/O*100)):0,le=u!==null&&St>0?Math.min(100,Math.round(u/St*100)):0,Et=mt[o]??{bg:"rgba(255,255,255,0.1)",color:"rgba(255,255,255,0.5)"},N=k(g),U=(v,I,B,ce,de,pe=!1)=>d`
      <div class="barrow">
        <span class="ico" style=${pe?"opacity:.25":""}>${v}</span>
        <div class="track"><div class="fill" style="background:${I};width:${B}%"></div></div>
        <span class="time" style="color:${de}">${ce}</span>
      </div>`,tt=[{eid:r("light_on"),name:"Licht AN",val:(this.st(r("light_on"))??"").substring(0,5)},{eid:r(o==="Bloom"||o==="Flush"?"light_off_bloom":"light_off_sv"),name:"Licht AUS",val:(h??"").substring(0,5)},{eid:r(`pump_on_${Z}`),name:"Pumpe AN",val:`${At} min`},{eid:r(`pump_off_${Z}`),name:"Pumpe AUS",val:`${wt} min`}].filter(v=>v.eid);return d`<div class="card" style="position:relative">
      <div class="hdr" style="align-items:center">
        <span style="font-size:14px;font-weight:800">${e.name??`${s.tent} \xB7 ${s.station}`}</span>
        <span class="stagebadge" style="background:${Et.bg};color:${Et.color}">${o||"\u2013"}</span>
        <div style="flex:1"></div>
        <span style="width:8px;height:8px;border-radius:50%;flex-shrink:0;
          background:${a?"#FFD700":c?"#8B9FC4":"rgba(255,255,255,.18)"}"></span>
        <span style="font-size:11px;font-weight:700;color:${a?"rgba(255,255,255,.85)":c?"#B0BED4":"rgba(255,255,255,.3)"}">
          ${a?"\u{1F4A1} AN":c?"\u{1F319} AUS":"\u{1F4A1} Auto AUS"}</span>
        ${r("auto")?d`<button class="gc stagebadge"
            style="background:${c?"rgba(77,255,195,.15)":"rgba(255,107,107,.15)"};color:${c?"#4DFFC3":"#FF6B6B"}"
            @click=${()=>this.toggle(r("auto"))}>Auto ${c?"AN":"AUS"}</button>`:l}
      </div>
      <div style="display:flex;flex-direction:column;gap:7px;margin-top:10px">
        ${a?U("\u{1F4A1}","linear-gradient(90deg,#FFD700,#FFA500)",oe,Y(p),f.muted):c?U("\u{1F319}","linear-gradient(90deg,#8B9FC4,#5B6F96)",ae,`AN in ${Y(p)}`,f.label):U("\u{1F4A1}","transparent",0,"\u2013","rgba(255,255,255,.25)",!0)}
        ${re?U("\u{1F4A7}","linear-gradient(90deg,#4FC3F7,#0288D1)",le,Y(u),f.muted):U("\u{1F4A7}","transparent",0,"\u2013","rgba(255,255,255,.25)",!0)}
      </div>
      ${e.show_stage_chips!==!1&&r("stage")?d`
        <div style="display:flex;gap:6px;margin-top:10px">
          ${Ee.map(v=>{let I=mt[v],B=o===v;return d`<button class="gc" style="flex:1;text-align:center;padding:8px 4px;border-radius:11px;
                font-size:11px;font-weight:700;
                background:${B?I.bg:"rgba(255,255,255,.05)"};
                border:1px solid ${B?I.color:"rgba(255,255,255,.12)"};
                color:${B?I.color:"rgba(255,255,255,.5)"}"
              @click=${()=>this.hass.callService("input_select","select_option",{entity_id:r("stage"),option:v})}>${v}</button>`})}
        </div>`:l}
      ${e.show_settings!==!1&&tt.length?d`
        <button class="gc seclbl" style="display:block;width:100%;text-align:left"
          @click=${()=>{this._open=!this._open}}>
          Konfiguration ${this._open?"\u25B2":"\u25BC"}</button>
        ${this._open?d`<div class="grid" style="grid-template-columns:repeat(${Math.min(4,tt.length)},1fr);margin-top:2px">
          ${tt.map(v=>d`<button class="gc tile" style="text-align:left"
              @click=${()=>this.moreInfo(v.eid)}>
            <div class="lbl">${v.name}</div><div class="val sm">${v.val||"\u2013"}</div></button>`)}
        </div>`:l}`:l}
      <div class="logrow" style="background:${M[N.level]};margin-top:10px">
        <span class="txt" style="color:${R[N.level]}">${N.label}</span>
        ${N.ts?d`<span class="ts">${N.ts}</span>`:l}
      </div>
      ${this.renderConfirm()}
    </div>`}};customElements.define("growctrl-station-card",bt);var vt=class extends _{static{this.styles=y}validateConfig(t){if(!Array.isArray(t.controls)||!t.controls.length)throw new Error("growctrl-controls-card: 'controls' (min. 1 Eintrag) ist Pflicht.")}static getStubConfig(){return{controls:[{entity:"switch.beispiel"}]}}render(){let t=this._config;if(!this.hass)return l;let e=new Map;t.controls.forEach(i=>{let r=i.group??"";e.has(r)||e.set(r,[]),e.get(r).push(i)});let s=t.columns??3;return d`<div class="card" style="position:relative">
      ${t.title?d`<div class="title" style="font-size:15px">${t.title}</div>`:l}
      ${[...e.entries()].map(([i,r])=>d`
        ${i?d`<div class="seclbl">${i}</div>`:l}
        <div class="grid" style="grid-template-columns:repeat(${s},1fr)">
          ${r.map(o=>{let c=this.isOn(o.entity),a=o.name??this.friendly(o.entity);return d`<button class="gc tile" style="text-align:left;
                background:${c?"rgba(77,255,195,.15)":"rgba(0,0,0,.20)"};
                border:1px solid ${c?"rgba(77,255,195,.25)":"rgba(255,255,255,.08)"}"
              @click=${()=>o.confirm?this.confirmToggle(o.entity,a):this.toggle(o.entity)}>
              <div class="lbl" style="color:${c?"#4DFFC3":"rgba(255,255,255,.5)"}">${a}</div>
              <div class="val sm" style="color:${c?"#4DFFC3":"rgba(255,255,255,.6)"}">${c?"AN":"AUS"}${o.confirm?" \u26A0\uFE0F":""}</div>
            </button>`})}
        </div>`)}
      ${this.renderConfirm()}
    </div>`}};customElements.define("growctrl-controls-card",vt);var $t=class extends _{constructor(){super(...arguments);this._hist={}}static{this.styles=y}static{this.properties={..._.properties,_hist:{state:!0}}}validateConfig(e){if(!Array.isArray(e.sensors)||!e.sensors.length)throw new Error("growctrl-sensors-card: 'sensors' (min. 1 Eintrag) ist Pflicht.")}static getStubConfig(){return{sensors:[{entity:"sensor.beispiel"}]}}connectedCallback(){super.connectedCallback(),this._load(),this._timer=window.setInterval(()=>this._load(),5*6e4)}disconnectedCallback(){super.disconnectedCallback(),this._timer&&clearInterval(this._timer)}async _load(){if(!this.hass){setTimeout(()=>this._load(),1e3);return}let e=this._config,s={};for(let i of e.sensors)s[i.entity]=await se(this.hass,i.entity,e.sparkline_hours??24);this._hist=s}render(){let e=this._config;if(!this.hass)return l;let s=e.columns??3;return d`<div class="card">
      ${e.title?d`<div class="title" style="font-size:15px">${e.title}</div>`:l}
      <div class="grid" style="grid-template-columns:repeat(${s},1fr)">
        ${e.sensors.map(i=>{let r=$(this.st(i.entity)),o=ne(this._hist[i.entity]??[]);return d`<button class="gc tile" style="text-align:left" @click=${()=>this.moreInfo(i.entity)}>
            <div class="lbl">${i.name??this.friendly(i.entity)}</div>
            <div class="val sm">${r!==null?r:"--"} ${this.unit(i.entity)}</div>
            ${o?d`<svg viewBox="0 0 100 24" style="width:100%;height:24px;margin-top:4px" preserveAspectRatio="none">
              <path d="${o}" fill="none" stroke="rgba(77,255,195,.7)" stroke-width="1.5"/></svg>`:l}
          </button>`})}
      </div>
    </div>`}};customElements.define("growctrl-sensors-card",$t);var yt=class extends _{constructor(){super(...arguments);this._events=[]}static{this.styles=y}static{this.properties={..._.properties,_events:{state:!0}}}validateConfig(e){if(!Array.isArray(e.plants)||!e.plants.length)throw new Error("growctrl-plants-card: 'plants' (min. 1 Eintrag) ist Pflicht.")}static getStubConfig(){return{plants:[{name:"Pflanze 1"}]}}connectedCallback(){super.connectedCallback(),this._load(),this._timer=window.setInterval(()=>this._load(),10*6e4)}disconnectedCallback(){super.disconnectedCallback(),this._timer&&clearInterval(this._timer)}async _load(){let e=this._config;if(e.calendar){if(!this.hass){setTimeout(()=>this._load(),1e3);return}this._events=(await ie(this.hass,e.calendar)).slice(0,3)}}render(){let e=this._config;return this.hass?d`<div class="card">
      ${e.title?d`<div class="title" style="font-size:15px">${e.title}</div>`:l}
      <div class="grid" style="grid-template-columns:repeat(${e.columns??2},1fr)">
        ${e.plants.map(s=>{let i=s.germination_helper?this.st(s.germination_helper):void 0,r=i?jt(i):null;return d`<div class="tile">
            <div style="display:flex;align-items:baseline;gap:6px;flex-wrap:wrap">
              <span style="font-size:13px;font-weight:800">\u{1F331} ${s.name}</span>
              ${s.strain?d`<span style="font-size:10px;color:rgba(255,255,255,.55)">${s.strain}</span>`:l}
            </div>
            ${r!==null?d`<div class="lbl" style="margin-top:4px">Tag ${r}</div>`:l}
            ${(s.sensors??[]).map(o=>d`
              <button class="gc" style="display:flex;justify-content:space-between;width:100%;font-size:11px;margin-top:4px;color:rgba(255,255,255,.75)"
                @click=${()=>this.moreInfo(o.entity)}>
                <span>${o.name??this.friendly(o.entity)}</span>
                <span style="font-weight:700">${$(this.st(o.entity))??"--"} ${this.unit(o.entity)}</span>
              </button>`)}
          </div>`})}
      </div>
      ${e.calendar?d`<div class="seclbl">Anstehend</div>
        ${this._events.length?this._events.map(s=>d`
          <div class="logrow" style="background:rgba(0,0,0,.18);margin-top:4px">
            <span class="txt">${s.summary}</span>
            <span class="ts">${(s.start?.date??s.start?.dateTime??"").substring(0,10)}</span>
          </div>`):d`<div class="logrow" style="background:rgba(0,0,0,.12)"><span class="txt" style="color:rgba(255,255,255,.35)">Keine Ereignisse</span></div>`}`:l}
    </div>`:l}};customElements.define("growctrl-plants-card",yt);var xt=class extends _{constructor(){super(...arguments);this._expert=!1}static{this.styles=y}static{this.properties={..._.properties,_expert:{state:!0}}}validateConfig(e){if(!Array.isArray(e.logs)||!e.logs.length)throw new Error("growctrl-status-card: 'logs' (min. 1 Eintrag) ist Pflicht.")}static getStubConfig(){return{logs:[{entity:"input_text.hydro_log_mittel_main1"}]}}render(){let e=this._config;if(!this.hass)return l;let s=e.logs.map(o=>({l:o,r:(o.type==="climate"?K:k)(this.st(o.entity))})),i=s.map(o=>o.r.level),r={label:"\u2713 Alles OK",color:f.ok};return i.includes("critical")?r={label:"\u{1F6A8} Fehler",color:f.crit}:i.includes("warning")?r={label:"\u26A0\uFE0F Warnung",color:f.warn}:i.includes("info")&&(r={label:"\u2139\uFE0F Info",color:f.info}),d`<div class="card" style="position:relative">
      <div class="hdr" style="align-items:center">
        <div class="title" style="font-size:15px">${e.title??"Status"}</div>
        <span class="stagebadge" style="background:rgba(0,0,0,.25);color:${r.color}">${r.label}</span>
      </div>
      ${s.map(({l:o,r:c})=>d`
        <div class="logrow" style="background:${M[c.level]};margin-top:6px">
          ${o.name?d`<span style="font-size:11px;font-weight:700;color:${f.logLabel};min-width:42px;flex-shrink:0">${o.name}</span>`:l}
          <span class="txt" style="color:${R[c.level]}">${c.label}</span>
          ${c.ts?d`<span class="ts">${c.ts}</span>`:l}
        </div>`)}
      ${e.expert?d`
        <button class="gc seclbl" style="display:block;width:100%;text-align:left"
          @click=${()=>{this._expert=!this._expert}}>Experte ${this._expert?"\u25B2":"\u25BC"}</button>
        ${this._expert?d`
          ${(e.expert.controls??[]).length?d`<div class="grid" style="grid-template-columns:repeat(2,1fr)">
            ${e.expert.controls.map(o=>{let c=this.isOn(o.entity),a=o.name??this.friendly(o.entity);return d`<button class="gc tile" style="text-align:left;
                  background:${c?"rgba(255,165,0,.18)":"rgba(0,0,0,.18)"};
                  border:1px solid ${c?"rgba(255,165,0,.38)":"rgba(255,165,0,.15)"}"
                @click=${()=>this.confirmToggle(o.entity,a)}>
                <div class="lbl" style="color:${c?"#FFD166":"rgba(255,255,255,.45)"}">${a}</div>
                <div class="val sm" style="color:${c?"#FFD166":"rgba(255,255,255,.5)"}">${c?"AN":"AUS"}</div>
              </button>`})}
          </div>`:l}
          ${e.expert.show_raw!==!1?e.logs.map(o=>d`
            <div style="background:rgba(0,0,0,.28);border-radius:8px;padding:9px 11px;margin-top:6px">
              <div style="font-size:10px;text-transform:uppercase;letter-spacing:.8px;color:rgba(255,215,0,.65);margin-bottom:4px">${o.name??o.entity}</div>
              <div style="font-size:11px;color:rgba(255,255,255,.72);font-family:monospace;word-break:break-all;line-height:1.6">${this.st(o.entity)??"\u2013"}</div>
            </div>`):l}`:l}`:l}
      ${this.renderConfirm()}
    </div>`}};customElements.define("growctrl-status-card",xt);var Ce="2.0.0",Fe=[{type:"growctrl-tent-card",name:"GROWCTRL Tent",description:"Zelt-Hero: Klima-KPIs, VPD-Skala, Status-Ampel"},{type:"growctrl-station-card",name:"GROWCTRL Station",description:"Station: Licht-/Pumpenbalken, Stage, Auto, Konfiguration"},{type:"growctrl-controls-card",name:"GROWCTRL Controls",description:"Aktoren-Raster mit Gruppen und Bestaetigung"},{type:"growctrl-sensors-card",name:"GROWCTRL Sensors",description:"Sensor-Kacheln mit Sparklines"},{type:"growctrl-plants-card",name:"GROWCTRL Plants",description:"Pflanzen, Keimdatum, Kalender"},{type:"growctrl-status-card",name:"GROWCTRL Status",description:"Uebersetzte Logs, Ampel, Experten-Modus"}];window.customCards=window.customCards??[];Fe.forEach(n=>window.customCards.push({...n,preview:!1,documentationURL:"https://github.com/MrDarkvoid/growctrl"}));console.info(`%c GROWCTRL Cards %c v${Ce} `,"background:#1D9E75;color:#fff;font-weight:700","background:#0F6E56;color:#fff");
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
