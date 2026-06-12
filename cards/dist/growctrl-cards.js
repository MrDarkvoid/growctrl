var nt=globalThis,rt=nt.ShadowRoot&&(nt.ShadyCSS===void 0||nt.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,mt=Symbol(),Jt=new WeakMap,q=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==mt)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(rt&&t===void 0){let s=e!==void 0&&e.length===1;s&&(t=Jt.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&Jt.set(e,t))}return t}toString(){return this.cssText}},Yt=n=>new q(typeof n=="string"?n:n+"",void 0,mt),X=(n,...t)=>{let e=n.length===1?n[0]:t.reduce((s,i,o)=>s+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+n[o+1],n[0]);return new q(e,n,mt)},te=(n,t)=>{if(rt)n.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let s=document.createElement("style"),i=nt.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=e.cssText,n.appendChild(s)}},ft=rt?n=>n:n=>n instanceof CSSStyleSheet?(t=>{let e="";for(let s of t.cssRules)e+=s.cssText;return Yt(e)})(n):n;var{is:Oe,defineProperty:Pe,getOwnPropertyDescriptor:Fe,getOwnPropertyNames:Re,getOwnPropertySymbols:ze,getPrototypeOf:Ie}=Object,ot=globalThis,ee=ot.trustedTypes,Me=ee?ee.emptyScript:"",Ne=ot.reactiveElementPolyfillSupport,Q=(n,t)=>n,bt={toAttribute(n,t){switch(t){case Boolean:n=n?Me:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,t){let e=n;switch(t){case Boolean:e=n!==null;break;case Number:e=n===null?null:Number(n);break;case Object:case Array:try{e=JSON.parse(n)}catch{e=null}}return e}},ie=(n,t)=>!Oe(n,t),se={attribute:!0,type:String,converter:bt,reflect:!1,useDefault:!1,hasChanged:ie};Symbol.metadata??=Symbol("metadata"),ot.litPropertyMetadata??=new WeakMap;var z=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=se){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let s=Symbol(),i=this.getPropertyDescriptor(t,s,e);i!==void 0&&Pe(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){let{get:i,set:o}=Fe(this.prototype,t)??{get(){return this[e]},set(r){this[e]=r}};return{get:i,set(r){let p=i?.call(this);o?.call(this,r),this.requestUpdate(t,p,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??se}static _$Ei(){if(this.hasOwnProperty(Q("elementProperties")))return;let t=Ie(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(Q("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Q("properties"))){let e=this.properties,s=[...Re(e),...ze(e)];for(let i of s)this.createProperty(i,e[i])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[s,i]of e)this.elementProperties.set(s,i)}this._$Eh=new Map;for(let[e,s]of this.elementProperties){let i=this._$Eu(e,s);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let s=new Set(t.flat(1/0).reverse());for(let i of s)e.unshift(ft(i))}else t!==void 0&&e.push(ft(t));return e}static _$Eu(t,e){let s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return te(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){let s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(i!==void 0&&s.reflect===!0){let o=(s.converter?.toAttribute!==void 0?s.converter:bt).toAttribute(e,s.type);this._$Em=t,o==null?this.removeAttribute(i):this.setAttribute(i,o),this._$Em=null}}_$AK(t,e){let s=this.constructor,i=s._$Eh.get(t);if(i!==void 0&&this._$Em!==i){let o=s.getPropertyOptions(i),r=typeof o.converter=="function"?{fromAttribute:o.converter}:o.converter?.fromAttribute!==void 0?o.converter:bt;this._$Em=i;let p=r.fromAttribute(e,o.type);this[i]=p??this._$Ej?.get(i)??p,this._$Em=null}}requestUpdate(t,e,s,i=!1,o){if(t!==void 0){let r=this.constructor;if(i===!1&&(o=this[t]),s??=r.getPropertyOptions(t),!((s.hasChanged??ie)(o,e)||s.useDefault&&s.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,s))))return;this.C(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:o},r){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??e??this[t]),o!==!0||r!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),i===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[i,o]of this._$Ep)this[i]=o;this._$Ep=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[i,o]of s){let{wrapped:r}=o,p=this[i];r!==!0||this._$AL.has(i)||p===void 0||this.C(i,void 0,o,p)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(e)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};z.elementStyles=[],z.shadowRootOptions={mode:"open"},z[Q("elementProperties")]=new Map,z[Q("finalized")]=new Map,Ne?.({ReactiveElement:z}),(ot.reactiveElementVersions??=[]).push("2.1.2");var St=globalThis,ne=n=>n,at=St.trustedTypes,re=at?at.createPolicy("lit-html",{createHTML:n=>n}):void 0,pe="$lit$",M=`lit$${Math.random().toFixed(9).slice(2)}$`,he="?"+M,Ue=`<${he}>`,G=document,Y=()=>G.createComment(""),tt=n=>n===null||typeof n!="object"&&typeof n!="function",kt=Array.isArray,He=n=>kt(n)||typeof n?.[Symbol.iterator]=="function",yt=`[ 	
\f\r]`,J=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,oe=/-->/g,ae=/>/g,B=RegExp(`>|${yt}(?:([^\\s"'>=/]+)(${yt}*=${yt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),le=/'/g,ce=/"/g,ge=/^(?:script|style|textarea|title)$/i,At=n=>(t,...e)=>({_$litType$:n,strings:t,values:e}),l=At(1),it=At(2),ms=At(3),V=Symbol.for("lit-noChange"),c=Symbol.for("lit-nothing"),de=new WeakMap,D=G.createTreeWalker(G,129);function ue(n,t){if(!kt(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return re!==void 0?re.createHTML(t):t}var Be=(n,t)=>{let e=n.length-1,s=[],i,o=t===2?"<svg>":t===3?"<math>":"",r=J;for(let p=0;p<e;p++){let a=n[p],h,f,u=-1,m=0;for(;m<a.length&&(r.lastIndex=m,f=r.exec(a),f!==null);)m=r.lastIndex,r===J?f[1]==="!--"?r=oe:f[1]!==void 0?r=ae:f[2]!==void 0?(ge.test(f[2])&&(i=RegExp("</"+f[2],"g")),r=B):f[3]!==void 0&&(r=B):r===B?f[0]===">"?(r=i??J,u=-1):f[1]===void 0?u=-2:(u=r.lastIndex-f[2].length,h=f[1],r=f[3]===void 0?B:f[3]==='"'?ce:le):r===ce||r===le?r=B:r===oe||r===ae?r=J:(r=B,i=void 0);let b=r===B&&n[p+1].startsWith("/>")?" ":"";o+=r===J?a+Ue:u>=0?(s.push(h),a.slice(0,u)+pe+a.slice(u)+M+b):a+M+(u===-2?p:b)}return[ue(n,o+(n[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]},et=class n{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let o=0,r=0,p=t.length-1,a=this.parts,[h,f]=Be(t,e);if(this.el=n.createElement(h,s),D.currentNode=this.el.content,e===2||e===3){let u=this.el.content.firstChild;u.replaceWith(...u.childNodes)}for(;(i=D.nextNode())!==null&&a.length<p;){if(i.nodeType===1){if(i.hasAttributes())for(let u of i.getAttributeNames())if(u.endsWith(pe)){let m=f[r++],b=i.getAttribute(u).split(M),v=/([.?@])?(.*)/.exec(m);a.push({type:1,index:o,name:v[2],strings:b,ctor:v[1]==="."?vt:v[1]==="?"?$t:v[1]==="@"?_t:W}),i.removeAttribute(u)}else u.startsWith(M)&&(a.push({type:6,index:o}),i.removeAttribute(u));if(ge.test(i.tagName)){let u=i.textContent.split(M),m=u.length-1;if(m>0){i.textContent=at?at.emptyScript:"";for(let b=0;b<m;b++)i.append(u[b],Y()),D.nextNode(),a.push({type:2,index:++o});i.append(u[m],Y())}}}else if(i.nodeType===8)if(i.data===he)a.push({type:2,index:o});else{let u=-1;for(;(u=i.data.indexOf(M,u+1))!==-1;)a.push({type:7,index:o}),u+=M.length-1}o++}}static createElement(t,e){let s=G.createElement("template");return s.innerHTML=t,s}};function Z(n,t,e=n,s){if(t===V)return t;let i=s!==void 0?e._$Co?.[s]:e._$Cl,o=tt(t)?void 0:t._$litDirective$;return i?.constructor!==o&&(i?._$AO?.(!1),o===void 0?i=void 0:(i=new o(n),i._$AT(n,e,s)),s!==void 0?(e._$Co??=[])[s]=i:e._$Cl=i),i!==void 0&&(t=Z(n,i._$AS(n,t.values),i,s)),t}var xt=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??G).importNode(e,!0);D.currentNode=i;let o=D.nextNode(),r=0,p=0,a=s[0];for(;a!==void 0;){if(r===a.index){let h;a.type===2?h=new st(o,o.nextSibling,this,t):a.type===1?h=new a.ctor(o,a.name,a.strings,this,t):a.type===6&&(h=new wt(o,this,t)),this._$AV.push(h),a=s[++p]}r!==a?.index&&(o=D.nextNode(),r++)}return D.currentNode=G,i}p(t){let e=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}},st=class n{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=c,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Z(this,t,e),tt(t)?t===c||t==null||t===""?(this._$AH!==c&&this._$AR(),this._$AH=c):t!==this._$AH&&t!==V&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):He(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==c&&tt(this._$AH)?this._$AA.nextSibling.data=t:this.T(G.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:s}=t,i=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=et.createElement(ue(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(e);else{let o=new xt(i,this),r=o.u(this.options);o.p(e),this.T(r),this._$AH=o}}_$AC(t){let e=de.get(t.strings);return e===void 0&&de.set(t.strings,e=new et(t)),e}k(t){kt(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,s,i=0;for(let o of t)i===e.length?e.push(s=new n(this.O(Y()),this.O(Y()),this,this.options)):s=e[i],s._$AI(o),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let s=ne(t).nextSibling;ne(t).remove(),t=s}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},W=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,o){this.type=1,this._$AH=c,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=o,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=c}_$AI(t,e=this,s,i){let o=this.strings,r=!1;if(o===void 0)t=Z(this,t,e,0),r=!tt(t)||t!==this._$AH&&t!==V,r&&(this._$AH=t);else{let p=t,a,h;for(t=o[0],a=0;a<o.length-1;a++)h=Z(this,p[s+a],e,a),h===V&&(h=this._$AH[a]),r||=!tt(h)||h!==this._$AH[a],h===c?t=c:t!==c&&(t+=(h??"")+o[a+1]),this._$AH[a]=h}r&&!i&&this.j(t)}j(t){t===c?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},vt=class extends W{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===c?void 0:t}},$t=class extends W{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==c)}},_t=class extends W{constructor(t,e,s,i,o){super(t,e,s,i,o),this.type=5}_$AI(t,e=this){if((t=Z(this,t,e,0)??c)===V)return;let s=this._$AH,i=t===c&&s!==c||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,o=t!==c&&(s===c||i);i&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},wt=class{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){Z(this,t)}};var De=St.litHtmlPolyfillSupport;De?.(et,st),(St.litHtmlVersions??=[]).push("3.3.3");var me=(n,t,e)=>{let s=e?.renderBefore??t,i=s._$litPart$;if(i===void 0){let o=e?.renderBefore??null;s._$litPart$=i=new st(t.insertBefore(Y(),o),o,void 0,e??{})}return i._$AI(n),i};var Ct=globalThis,F=class extends z{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=me(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return V}};F._$litElement$=!0,F.finalized=!0,Ct.litElementHydrateSupport?.({LitElement:F});var Ge=Ct.litElementPolyfillSupport;Ge?.({LitElement:F});(Ct.litElementVersions??=[]).push("4.2.2");var fe,lt=null;function ct(n){if(n?.states===fe&&lt)return lt;let t=new Map,e=new Set,s={};for(let[i,o]of Object.entries(n?.states??{})){let r=o?.attributes;if(!r?.growctrl_role||!r?.growctrl_tent)continue;let p=String(r.growctrl_tent),a=String(r.growctrl_station??"zelt");t.set(`${p}::${a}::${r.growctrl_role}`,i),a==="zelt"?e.add(p):(s[p]??=new Set).add(a)}return fe=n?.states,lt={tents:[...e].sort(),stations:Object.fromEntries(Object.entries(s).map(([i,o])=>[i,[...o].sort()])),byRole:t},lt}var j=(n,t,e,s)=>ct(n).byRole.get(`${t}::${e}::${s}`);var _=class extends F{constructor(){super(...arguments);this._config={};this._label=e=>e.label??e.name}static{this.properties={hass:{attribute:!1},_config:{state:!0}}}static{this.styles=X`
    .lt { font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: .5px;
          color: var(--secondary-text-color); margin: 16px 0 6px; }
    .row { display: flex; align-items: flex-start; gap: 4px;
           border: 1px solid var(--divider-color); border-radius: 8px; padding: 8px; margin-bottom: 8px; }
    .row ha-form { flex: 1; min-width: 0; }
    button.del { all: unset; cursor: pointer; color: var(--secondary-text-color);
                 font-size: 16px; padding: 4px 8px; line-height: 1; }
    button.del:hover { color: var(--error-color, #db4437); }
    button.add { all: unset; cursor: pointer; color: var(--primary-color);
                 font-size: 13px; font-weight: 600; padding: 4px 0; }
    .hint { font-size: 11px; color: var(--secondary-text-color); margin-top: 12px; }
  `}setConfig(e){this._config={...e}}_fire(e){this._config=e,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0}))}form(e){return l`<ha-form .hass=${this.hass} .data=${this._config} .schema=${e}
      .computeLabel=${this._label}
      @value-changed=${s=>this._fire({...this._config,...s.detail.value})}></ha-form>`}list(e){let s=this._config[e.key]??[],i=o=>this._fire({...this._config,[e.key]:o});return l`
      ${e.title?l`<div class="lt">${e.title}</div>`:c}
      ${s.map((o,r)=>l`<div class="row">
        <ha-form .hass=${this.hass} .data=${o} .schema=${e.rowSchema}
          .computeLabel=${this._label}
          @value-changed=${p=>{let a=[...s];a[r]={...p.detail.value},i(a)}}></ha-form>
        <button class="del" title="Entfernen"
          @click=${()=>i(s.filter((p,a)=>a!==r))}>\u2715</button>
      </div>`)}
      <button class="add" @click=${()=>i([...s,e.newItem()])}>+ ${e.addLabel}</button>`}tentSelect(e="tent",s="Zelt"){let i=ct(this.hass).tents;return{name:e,label:s,selector:{select:{options:i,custom_value:!0,mode:"dropdown"}}}}stationSelect(e,s="station",i="Station"){let o=ct(this.hass),r=e?o.stations[e]??[]:[...new Set(Object.values(o.stations).flat())];return{name:s,label:i,selector:{select:{options:r,custom_value:!0,mode:"dropdown"}}}}styleSection(){let e=this._config.style??{},s=[d.text("background","Hintergrund (Farbe, 'a,b' = Gradient oder CSS)"),d.num("opacity","Deckkraft (0\u20131)",0,1,.05),d.bool("glass","Glas-Effekt (Blur)"),d.text("accent","Akzentfarbe"),d.num("radius","Eckenradius (px)",0,40)];return l`<div class="lt">Stil</div>
      <ha-form .hass=${this.hass} .data=${e} .schema=${s}
        .computeLabel=${i=>i.label??i.name}
        @value-changed=${i=>this._fire({...this._config,style:{...i.detail.value}})}></ha-form>`}},d={text:(n,t)=>({name:n,label:t,selector:{text:{}}}),bool:(n,t)=>({name:n,label:t,selector:{boolean:{}}}),num:(n,t,e,s,i)=>({name:n,label:t,selector:{number:{min:e,max:s,step:i,mode:"box"}}}),entity:(n,t,e)=>({name:n,label:t,selector:{entity:e?{domain:e}:{}}}),entities:(n,t,e)=>({name:n,label:t,selector:{entity:{multiple:!0,...e?{domain:e}:{}}}}),select:(n,t,e)=>({name:n,label:t,selector:{select:{mode:"dropdown",options:e}}})};var Et=class extends _{render(){let t=[this.tentSelect(),d.text("name","Anzeigename (optional)"),d.bool("show_chart","VPD-Chart anzeigen"),d.num("hours","Chart-Zeitraum (h)",1,168)];return l`${this.form(t)}${this.styleSection()}`}};customElements.define("growctrl-tent-editor",Et);var k=(n,t=null)=>{if(n===void 0||["unknown","unavailable",""].includes(n))return t;let e=parseFloat(n);return isNaN(e)?t:e},be=n=>{let t=Date.parse(n);return isNaN(t)?null:Math.floor((Date.now()-t)/864e5)};var ye=n=>!n||["unknown","unavailable",""].includes(n),xe=n=>n.length>=16?n.substring(11,16):"",ve=n=>{if(ye(n))return{level:"none",label:"\u2014",ts:""};let t=n,e=xe(t);if(t.includes("SENSOR INVALID"))return{level:"critical",label:"\u{1F6A8} Sensor ung\xFCltig \u2014 Befeuchtung gesperrt",ts:e};if(t.includes("MAINTENANCE"))return{level:"info",label:"\u{1F527} Wartungsmodus aktiv",ts:e};if(t.includes("TESTMODE"))return{level:"info",label:"\u{1F9EA} Testmodus aktiv",ts:e};if(t.includes("AUTO OFF"))return{level:"info",label:"\u{1F534} Klima-Automatik deaktiviert",ts:e};let s=t.match(/(?:IST|SOLL)\s+(?:F|CIRC)=(\w+)/i)?.[1]?.toLowerCase(),i=t.match(/IST\s+(?:CIRC|F)=\w+\s+HUM=(\w+)/i)?.[1]?.toUpperCase(),o=t.match(/REQ=(\w+)/i)?.[1]?.toUpperCase();if(i!==void 0){let r=[];return s==="on"?r.push("Umluft AN"):s==="manual"?r.push("Umluft Manuell"):s==="off"&&r.push("Umluft AUS"),r.push(i==="ON"?"Befeuchtung AN":"Befeuchtung AUS"),r.push(o==="ON"?"Entfeuchtung AN":"Entfeuchtung AUS"),t.includes("ZENTRAL-BLOCK")&&r.push("(Zentral-Block)"),{level:"ok",label:r.join(" \xB7 "),ts:e}}return{level:"ok",label:t.replace(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}\s*/,"").substring(0,45),ts:e}},$e=n=>{if(ye(n))return{level:"none",label:"\u2014",ts:""};let t=n,e=xe(t);if(t.includes("FAILSAFE LIGHT"))return{level:"critical",label:"\u{1F6A8} Failsafe: Licht-Zwangsabschaltung \u2014 Auto deaktiviert",ts:e};if(t.includes("FAILSAFE PUMP"))return{level:"critical",label:"\u{1F6A8} Failsafe: Pumpen-Zwangsabschaltung \u2014 Auto deaktiviert",ts:e};if(t.includes("TIME INVALID"))return{level:"critical",label:"\u26A0\uFE0F Lichtzeiten nicht konfiguriert",ts:e};if(t.includes("MISMATCH")){let f=b=>t.match(b)?.[1];return{level:"warning",label:"\u26A0\uFE0F Ger\xE4t antwortet nicht: "+([["Licht",f(/IST.*?\bL=(\w+)/i),f(/SOLL.*?\bL=(\w+)/i)],["Pumpe",f(/IST.*?\bP=(\w+)/i),f(/SOLL.*?\bP=(\w+)/i)],["O\u2082",f(/IST.*?\bO2=(\w+)/i),f(/SOLL.*?\bO2=(\w+)/i)]].filter(([,b,v])=>b&&v&&b!==v).map(([b,v,A])=>`${b} (IST ${v.toUpperCase()} / SOLL ${A.toUpperCase()})`).join(", ")||"Abweichung"),ts:e}}if(t.includes("MAINTENANCE"))return{level:"info",label:"\u{1F527} Wartungsmodus aktiv",ts:e};if(t.includes("TESTMODE"))return{level:"info",label:"\u{1F9EA} Testmodus aktiv",ts:e};let s=t.match(/IST.*?\bL=(\w+)/i)?.[1],i=t.match(/IST.*?\bP=(\w+)/i)?.[1],o=t.match(/IST.*?\bO2=(\w+)/i)?.[1],r=t.includes("OVRUNTIL")?" (Override aktiv)":"",p=[s&&s!=="n/a"?s==="on"?"\u{1F4A1} Licht AN":"\u{1F311} Licht AUS":null,i&&i!=="n/a"?i==="on"?"\u{1F4A7} Pumpe AN":"\u23F8\uFE0F Pumpe AUS":null,o&&o!=="n/a"?o==="on"?"\u{1FAE7} O\u2082 AN":"\u{1FAE7} O\u2082 AUS":null].filter(Boolean).join(" \xB7 "),a="";return t.includes("AUTO ON")?a="\u{1F7E2} Auto gestartet":t.includes("AUTO OFF")?a="\u{1F534} Auto gestoppt":t.match(/STAGE\s*\u2192/)?a=`\u{1F331} Phase: ${t.match(/STAGE\s*\u2192\s*(\w+)/)?.[1]??""}`:t.includes("LIGHT \u2192 ON")?a="\u{1F4A1} Licht eingeschaltet":t.includes("LIGHT \u2192 OFF")?a="\u{1F311} Licht ausgeschaltet":t.includes("PUMP \u2192 ON")?a="\u{1F4A7} Pumpe eingeschaltet":t.includes("PUMP \u2192 OFF")?a="\u23F8\uFE0F Pumpe ausgeschaltet":t.includes("O2 \u2192 ON")?a="\u{1FAE7} O\u2082 eingeschaltet":t.includes("FAN \u2192 ON")?a="\u{1F300} L\xFCfter eingeschaltet":t.includes("MANUAL OVERRIDE")?a="\u270B Manuell \xFCbersteuert":t.includes("OVERRIDE END")&&(a="\u2705 Override beendet"),{level:"ok",label:[a,p].filter(Boolean).join(" \u2014 ")+r||t.substring(17,55),ts:e}};var _e=new Map,we=new Map;async function R(n,t,e=24,s=48){let i=`${t}:${e}`,o=_e.get(i);if(o&&Date.now()-o.t<5*6e4)return o.data;try{let r=new Date(Date.now()-e*36e5).toISOString(),a=((await n.callApi("GET",`history/period/${r}?filter_entity_id=${t}&minimal_response&no_attributes`))?.[0]??[]).map(u=>parseFloat(u.state??u.s)).filter(u=>!isNaN(u)),h=Math.max(1,Math.floor(a.length/s)),f=a.filter((u,m)=>m%h===0);return _e.set(i,{t:Date.now(),data:f}),f}catch{return o?.data??[]}}async function Se(n,t,e=14){let s=we.get(t);if(s&&Date.now()-s.t<10*6e4)return s.data;try{let i=new Date().toISOString(),o=new Date(Date.now()+e*864e5).toISOString(),r=await n.callApi("GET",`calendars/${t}?start=${i}&end=${o}`);return we.set(t,{t:Date.now(),data:r??[]}),r??[]}catch{return s?.data??[]}}var ke=(n,t=100,e=24)=>{if(n.length<2)return"";let s=Math.min(...n),i=Math.max(...n),o=i-s||1;return n.map((r,p)=>`${p===0?"M":"L"}${(p/(n.length-1)*t).toFixed(1)},${(e-(r-s)/o*e).toFixed(1)}`).join(" ")};var g={label:"rgba(255,255,255,0.55)",value:"rgba(255,255,255,0.97)",muted:"rgba(255,255,255,0.45)",logLabel:"rgba(255,255,255,0.70)",logText:"rgba(255,255,255,0.88)",ok:"#4DFFC3",warn:"#FFD166",crit:"#FF6B6B",info:"#7EC8FF",tileBg:"rgba(255,255,255,0.045)",rowBg:"rgba(255,255,255,0.04)"},N={critical:"rgba(255,107,107,.16)",warning:"rgba(255,209,102,.14)",info:"rgba(126,200,255,.10)",ok:g.rowBg,none:"rgba(255,255,255,.025)"},T={critical:g.crit,warning:g.warn,info:g.info,ok:g.logText,none:"rgba(255,255,255,.35)"},dt={Seedling:{bg:"rgba(126,200,255,0.16)",color:"#7EC8FF"},Veg:{bg:"rgba(126,232,126,0.16)",color:"#7EE87E"},Bloom:{bg:"rgba(255,180,50,0.18)",color:"#FFB432"},Flush:{bg:"rgba(255,180,50,0.18)",color:"#FFB432"},Trocknung:{bg:"rgba(201,155,95,0.18)",color:"#C99B5F"}},w=n=>{let t=[];if(n?.background){let e=n.background.trim(),s=e.includes(",")&&!/^(linear|radial|conic|rgb|hsl)/i.test(e)?`linear-gradient(160deg, ${e})`:e;t.push(`--gc-bg:${s}`)}return n?.opacity!==void 0&&t.push(`--gc-opacity:${n.opacity}`),n?.accent&&t.push(`--gc-accent:${n.accent}`),n?.radius!==void 0&&t.push(`--gc-radius:${n.radius}px`),t.join(";")},K=n=>n.includes("critical")?"critical":n.includes("warning")?"warning":n.includes("info")?"info":"ok",S=X`
  /* Responsive KPI-Raster: 4 Spalten, auf dem Handy 2; Settings 3 -> 2 */
  .kpis { display:grid; gap:8px; grid-template-columns:repeat(4,minmax(0,1fr)); }
  .kpis.cols-2 { grid-template-columns:repeat(2,minmax(0,1fr)); }
  .kpis.cols-3 { grid-template-columns:repeat(3,minmax(0,1fr)); }
  .settings-grid { display:grid; gap:8px; grid-template-columns:repeat(3,minmax(0,1fr)); }
  @media (max-width: 480px) {
    .card { padding: 13px 12px; }
    .kpis { grid-template-columns:repeat(2,minmax(0,1fr)); }
    .kpis.cols-3 { grid-template-columns:repeat(3,minmax(0,1fr)); gap:6px; }
    .settings-grid { grid-template-columns:repeat(2,minmax(0,1fr)); }
    .kpis .tile { padding: 9px 9px; }
    .kpis .val { font-size: 19px; }
    .title { font-size: 15px; }
  }

  :host { display: block; }
  .card {
    position: relative; isolation: isolate;
    border-radius: var(--gc-radius, 20px);
    padding: 18px 18px 16px;
    color: #fff;
    border: 1px solid rgba(255,255,255,.07);
    box-shadow: 0 12px 32px -20px rgba(0,0,0,.9);
    font-family: var(--primary-font-family, "Inter", Roboto, sans-serif);
    overflow: hidden;
  }
  .card::before {
    content: ""; position: absolute; inset: 0; z-index: -1;
    background: var(--gc-bg, linear-gradient(165deg, #1b2230 0%, #12161f 100%));
    opacity: var(--gc-opacity, 1);
  }
  .card.glass { backdrop-filter: blur(14px) saturate(1.25); -webkit-backdrop-filter: blur(14px) saturate(1.25); }
  /* Status-Ampel auf Kartenebene: einmal raufgucken */
  .card[data-level="warning"] {
    border-color: rgba(255,209,102,.45);
    box-shadow: 0 0 0 1px rgba(255,209,102,.25), 0 12px 32px -16px rgba(255,209,102,.3);
  }
  .card[data-level="critical"] {
    border-color: rgba(255,107,107,.55);
    box-shadow: 0 0 0 1px rgba(255,107,107,.3), 0 12px 36px -14px rgba(255,107,107,.4);
  }
  .clickable { cursor: pointer; }
  .hdr { display: flex; justify-content: space-between; align-items: center; gap: 10px; flex-wrap: wrap; }
  .title { font-size: 19px; font-weight: 800; letter-spacing: -.3px; line-height: 1.15; }
  .subtitle { font-size: 11px; color: rgba(255,255,255,.55); margin-top: 2px; font-weight: 500; }
  .badges { display: flex; gap: 6px; flex-wrap: wrap; justify-content: flex-end; align-items: center; }
  .badge { font-size: 10px; font-weight: 700; background: rgba(255,255,255,.08);
           border: 1px solid rgba(255,255,255,.10); color: rgba(255,255,255,.85);
           padding: 4px 10px; border-radius: 20px; white-space: nowrap; }
  .badge.warn { background: rgba(255,165,0,.18); border-color: rgba(255,165,0,.35); color: #FFD166; }
  /* Grosses Status-Pill (Ampel) */
  .status-pill { display: inline-flex; align-items: center; gap: 7px;
    font-size: 12px; font-weight: 800; padding: 6px 13px; border-radius: 20px; white-space: nowrap; }
  .status-pill .dot { width: 8px; height: 8px; border-radius: 50%; box-shadow: 0 0 8px currentColor; }
  .grid { display: grid; gap: 8px; margin-top: 10px; }
  .tile { background: rgba(255,255,255,.045); border: 1px solid rgba(255,255,255,.06);
          border-radius: 14px; padding: 11px 13px; min-width: 0; transition: background .15s; }
  button.tile:hover { background: rgba(255,255,255,.08); }
  .tile .lbl { font-size: 10px; text-transform: uppercase; letter-spacing: .8px;
               color: rgba(255,255,255,.5); font-weight: 600; }
  .tile .val { font-size: 25px; font-weight: 800; margin-top: 2px; letter-spacing: -.5px; }
  .tile .val.sm { font-size: 17px; font-weight: 700; }
  .tile .unit { font-size: 12px; font-weight: 600; color: rgba(255,255,255,.45); margin-left: 3px; }
  .logrow { display: flex; align-items: center; gap: 8px; border-radius: 10px;
            padding: 7px 11px; min-width: 0; }
  .logrow .txt { font-size: 11.5px; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; flex: 1; }
  .logrow .ts { font-size: 10px; color: rgba(255,255,255,.4); flex-shrink: 0; font-variant-numeric: tabular-nums; }
  .seclbl { font-size: 10px; text-transform: uppercase; letter-spacing: 1px;
            color: rgba(255,255,255,.4); margin: 12px 0 6px; font-weight: 700; }
  .stagebadge { font-size: 10px; font-weight: 700; padding: 4px 10px; border-radius: 9px; }
  .barrow { display: flex; align-items: center; gap: 8px; }
  .barrow .ico { font-size: 13px; flex-shrink: 0; width: 18px; text-align: center; }
  .barrow .track { flex: 1; height: 8px; background: rgba(0,0,0,.35); border-radius: 4px; overflow: hidden; }
  .barrow .fill { height: 100%; border-radius: 4px; transition: width .4s; }
  .barrow .time { font-size: 11px; min-width: 78px; flex-shrink: 0; text-align: right;
                  font-variant-numeric: tabular-nums; }
  button.gc { all: unset; cursor: pointer; }
`,L={ok:{bg:"rgba(77,255,195,.14)",color:g.ok,label:"Alles OK"},info:{bg:"rgba(126,200,255,.14)",color:g.info,label:"Info"},warning:{bg:"rgba(255,209,102,.16)",color:g.warn,label:"Warnung"},critical:{bg:"rgba(255,107,107,.18)",color:g.crit,label:"Fehler"}};var U=30,pt=4,Ae=6,Tt=14;function H(n,t={}){let e=t.w??300,s=t.h??110,i=n.flatMap(m=>m.data);if(!i.length)return l`<div style="height:${s}px;display:flex;align-items:center;justify-content:center;
    font-size:11px;color:rgba(255,255,255,.35)">Keine Verlaufsdaten</div>`;let o=t.min??Math.min(...i,t.band?.min??1/0),r=t.max??Math.max(...i,t.band?.max??-1/0);r-o<.001&&(r+=1,o-=1);let p=(r-o)*.08;o-=p,r+=p;let a=(m,b)=>U+m/Math.max(1,b-1)*(e-U-pt),h=m=>Ae+(1-(m-o)/(r-o))*(s-Ae-Tt),f=t.grid??3,u=m=>Math.abs(m)>=100?m.toFixed(0):Math.abs(m)>=10?m.toFixed(1):m.toFixed(2);return l`<svg viewBox="0 0 ${e} ${s}" preserveAspectRatio="none" style="width:100%;height:${s}px;display:block">
    ${t.band&&(t.band.min!==void 0||t.band.max!==void 0)?it`
      <rect x="${U}" y="${h(t.band.max??r)}" width="${e-U-pt}"
        height="${Math.max(0,h(t.band.min??o)-h(t.band.max??r))}"
        fill="${t.band.color??"rgba(77,255,195,.08)"}" />`:c}
    ${Array.from({length:f+1},(m,b)=>{let v=o+(r-o)*b/f;return it`
        <line x1="${U}" y1="${h(v)}" x2="${e-pt}" y2="${h(v)}"
          stroke="rgba(255,255,255,.07)" stroke-width="1"/>
        <text x="${U-4}" y="${h(v)+3}" text-anchor="end"
          font-size="8" fill="rgba(255,255,255,.4)">${u(v)}</text>`})}
    ${n.map(m=>{if(m.data.length<2)return c;let v=`M${m.data.map((A,P)=>`${a(P,m.data.length).toFixed(1)},${h(A).toFixed(1)}`).join(" L")}`;return it`
        ${m.fill!==!1?it`<path d="${v} L${a(m.data.length-1,m.data.length)},${s-Tt} L${U},${s-Tt} Z"
          fill="${m.color}" opacity=".10"/>`:c}
        <path d="${v}" fill="none" stroke="${m.color}" stroke-width="1.8"
          stroke-linejoin="round" stroke-linecap="round"/>
        <circle cx="${a(m.data.length-1,m.data.length)}" cy="${h(m.data[m.data.length-1])}"
          r="2.6" fill="${m.color}"/>`})}
    <text x="${U}" y="${s-3}" font-size="8" fill="rgba(255,255,255,.35)">-24h</text>
    <text x="${e-pt}" y="${s-3}" text-anchor="end" font-size="8" fill="rgba(255,255,255,.35)">jetzt</text>
  </svg>`}var Ce=n=>l`
  <div style="display:flex;gap:12px;flex-wrap:wrap;margin-top:4px">
    ${n.filter(t=>t.name).map(t=>l`<span style="display:inline-flex;align-items:center;gap:5px;
      font-size:10px;color:rgba(255,255,255,.6)">
      <span style="width:10px;height:3px;border-radius:2px;background:${t.color}"></span>${t.name}</span>`)}
  </div>`;var Lt=n=>n.toLowerCase().replace(/ä/g,"a").replace(/ö/g,"o").replace(/ü/g,"u").replace(/ß/g,"ss").replace(/[^a-z0-9]+/g,"_").replace(/^_+|_+$/g,""),ht=(n,t,e,s,i)=>i?.[s]??`${n}.growctrl_${Lt(t)}_${Lt(e)}_${s}`,gt=(n,t,e,s)=>s?.[e]??`${n}.growctrl_zelt_${Lt(t)}_${e}`,Ee={auto:["switch","automatik","auto"],wartung:["switch","wartung","maintenance"],stage:["select","wachstumsphase","stage"],lightOn:["time","licht_an","light_on"],lightOffSv:["time","licht_aus_seedling_veg","light_off_sv"],lightOffBloom:["time","licht_aus_bloom_flush","light_off_bloom"],lightRest:["sensor","licht_restzeit","light_rest"],pumpRest:["sensor","pumpe_restzeit","pump_rest"],age:["sensor","alter_seit_keimung","plant_age"],rec:["sensor","phasen_empfehlung","stage_recommendation"],event:["sensor","letztes_ereignis","last_event"],dli:["sensor","dli_heute","dli_today"],dliFc:["sensor","dli_prognose","dli_forecast"],germination:["date","keimstart","germination"],overrideMin:["number","manuelle_ubernahme","override_minutes"],pOverride:["binary_sensor","manueller_eingriff","problem_override"],pFailsafe:["binary_sensor","licht_failsafe","problem_light_failsafe"],pTime:["binary_sensor","lichtzeiten_unvollstandig","problem_time_invalid"]},ut={enabled:["switch","zelt_aktiv","tent_enabled"],climate:["switch","klima_automatik","climate_enabled"],mode:["select","klima_modus","climate_mode"],phase:["select","klima_phase","climate_phase"],vpd:["sensor","vpd","vpd"],status:["sensor","status","status"],event:["sensor","letztes_ereignis","last_event"]};var x=class extends F{constructor(){super(...arguments);this._config={};this._confirm=null}static{this.properties={hass:{attribute:!1},_config:{state:!0},_confirm:{state:!0}}}setConfig(e){this.validateConfig(e),this._config=e}validateConfig(e){}getCardSize(){return 4}st(e){return e?this.hass?.states[e]?.state:void 0}isOn(e){return this.st(e)==="on"}friendly(e){return e&&this.hass?.states[e]?.attributes?.friendly_name||e||""}unit(e){return e&&this.hass?.states[e]?.attributes?.unit_of_measurement||""}moreInfo(e){this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:e},bubbles:!0,composed:!0}))}navigate(e){history.pushState(null,"",e),window.dispatchEvent(new CustomEvent("location-changed"))}toggle(e){let s=e.split(".")[0],i=["switch","input_boolean","light","fan"].includes(s)?s:"homeassistant";this.hass.callService(i,"toggle",{entity_id:e})}confirmToggle(e,s){this._confirm={text:`${s} wirklich schalten?`,action:()=>this.toggle(e)}}renderConfirm(){return this._confirm?l`<div style="position:absolute;inset:0;background:rgba(0,0,0,.6);border-radius:16px;
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
    </div>`:c}};var Ve=["VPD","RH"],je=["Auto","Seedling","Veg","Bloom","Trocknung"],Ot=class extends x{constructor(){super(...arguments);this._hist=[]}static{this.styles=S}static{this.properties={...x.properties,_hist:{state:!0}}}validateConfig(e){if(!e.tent)throw new Error("growctrl-tent-card: 'tent' ist Pflicht (Zelt-Name aus der Integration).")}static getConfigElement(){return document.createElement("growctrl-tent-editor")}static getStubConfig(){return{tent:"gross"}}e(e){let[s,i,o]=ut[e],r=this._config;return r.overrides?.[i]??j(this.hass,r.tent,"zelt",o)??gt(s,r.tent,i,r.overrides)}_select(e,s){this.hass.callService("select","select_option",{entity_id:e,option:s})}connectedCallback(){super.connectedCallback(),this._load(),this._timer=window.setInterval(()=>this._load(),5*6e4)}disconnectedCallback(){super.disconnectedCallback(),this._timer&&clearInterval(this._timer)}async _load(){if(!this.hass){setTimeout(()=>this._load(),1e3);return}this._hist=await R(this.hass,this.e("vpd"),this._config.hours??24)}chips(e,s,i){return l`<div style="display:flex;gap:5px;flex-wrap:wrap">
      ${s.map(o=>l`<button class="gc" style="padding:4px 11px;border-radius:9px;font-size:10.5px;
          font-weight:700;transition:all .15s;
          background:${o===i?"rgba(77,255,195,.13)":"rgba(255,255,255,.04)"};
          border:1.5px solid ${o===i?g.ok:"rgba(255,255,255,.09)"};
          color:${o===i?g.ok:"rgba(255,255,255,.45)"}"
        @click=${()=>this._select(e,o)}>${o}</button>`)}
    </div>`}render(){let e=this._config;if(!this.hass)return c;let s=this.hass.states[this.e("vpd")],i=k(s?.state),o=s?.attributes?.temp,r=s?.attributes?.rh,p=s?.attributes?.phase_effektiv??"Veg",a=s?.attributes?.sollwerte,h=this.isOn(this.e("enabled")),f=this.isOn(this.e("climate")),u=this.hass.states[this.e("status")],m=u?.attributes?.probleme??[],b=u?.state==="problem"?"warning":h?"ok":"none",v=L[b]??L.none,A=this.hass.states[this.e("event")],P=i!==null&&a&&i>=a.vpd_min&&i<=a.vpd_max,I=(C,$,E,O)=>l`
      <button class="gc" style="flex:1;display:flex;align-items:center;justify-content:center;gap:7px;
          padding:9px 10px;border-radius:13px;transition:all .18s;
          background:${E?"rgba(77,255,195,.12)":"rgba(255,255,255,.05)"};
          border:1.5px solid ${E?g.ok:"rgba(255,255,255,.12)"};
          color:${E?g.ok:"rgba(255,255,255,.5)"}"
        @click=${()=>this.confirmToggle(C,$)}>
        <ha-icon .icon=${O} style="--mdc-icon-size:15px"></ha-icon>
        <span style="font-size:11px;font-weight:800">${$} ${E?"AN":"AUS"}</span>
      </button>`,y=(C,$,E,O)=>l`
      <div class="tile" style="text-align:center">
        <div class="lbl">${C}</div>
        <div class="val" style="font-size:22px;${O?`color:${O}`:""}">${$}<span class="unit">${E}</span></div>
      </div>`;return l`<div class="card ${e.style?.glass?"glass":""}" data-level=${b==="none"?"ok":b}
        style="${w(e.style)};position:relative">
      <div class="hdr">
        <div>
          <div class="title">${e.name??`Zelt ${e.tent}`}</div>
          <div class="subtitle">Klima \u00b7 Phase ${p}${a?` \xB7 Soll ${a.vpd_min}\u2013${a.vpd_max} kPa / ${a.rh_min}\u2013${a.rh_max} %`:""}</div>
        </div>
        <span class="status-pill" style="background:${v.bg};color:${v.color}">
          <span class="dot" style="background:${v.color}"></span>${h?v.label:"Deaktiviert"}</span>
      </div>

      <div style="display:flex;gap:8px;margin-top:12px">
        ${I(this.e("enabled"),"Zelt",h,"mdi:power")}
        ${I(this.e("climate"),"Klima",f,"mdi:thermostat")}
      </div>

      <div class="kpis cols-3" style="margin-top:10px">
        ${y("Temperatur",o!=null?Number(o).toFixed(1):"\u2013","\xB0C")}
        ${y("Luftfeuchte",r!=null?String(Math.round(Number(r))):"\u2013","%")}
        ${y("VPD",i!==null?i.toFixed(2):"\u2013","kPa",i===null?void 0:P?g.ok:"#FFD166")}
      </div>

      <div style="display:flex;gap:14px;flex-wrap:wrap;margin-top:11px;align-items:center">
        <span class="lbl" style="margin:0">Modus</span>
        ${this.chips(this.e("mode"),Ve,this.st(this.e("mode"))??"VPD")}
        <span class="lbl" style="margin:0">Phase</span>
        ${this.chips(this.e("phase"),je,this.st(this.e("phase"))??"Auto")}
      </div>

      ${e.show_chart!==!1&&this._hist.length>1?l`
        <div class="seclbl">VPD \u00b7 ${e.hours??24}h</div>
        ${H([{data:this._hist,color:P===!1?"#FFD166":g.ok}],{h:100,band:a?{min:a.vpd_min,max:a.vpd_max}:void 0,grid:3})}`:c}

      ${m.length?l`<div style="margin-top:9px">
        ${m.map(C=>l`<div class="logrow" style="background:rgba(255,209,102,.08);margin-top:4px">
          <span class="txt" style="color:#FFD166">\u26A0 ${C}</span></div>`)}</div>`:c}

      ${A?l`<button class="gc logrow" style="width:100%;margin-top:9px;text-align:left"
          @click=${()=>this.moreInfo(this.e("event"))}>
          <span class="dot" style="background:${T[A.attributes?.schweregrad]??g.info};flex-shrink:0"></span>
          <span class="txt" style="color:rgba(255,255,255,.6)">${A.state}</span>
        </button>`:c}
      ${this.renderConfirm()}
    </div>`}};customElements.define("growctrl-tent-card",Ot);var Pt=class extends _{render(){let t=[this.tentSelect(),this.stationSelect(this._config?.tent),d.text("name","Anzeigename (optional)"),d.bool("show_settings","Einstellungen-Zahnrad anzeigen")];return l`${this.form(t)}
      ${this.styleSection()}
      <div class="hint">Entity-IDs werden automatisch abgeleitet
        (z.B. <code>switch.growctrl_gross_main1_automatik</code>). Abweichende IDs
        per YAML: <code>overrides: { automatik: switch.mein_schalter }</code></div>`}};customElements.define("growctrl-station-editor",Pt);var Ze=["Seedling","Veg","Bloom","Flush","Trocknung"],Ft=class extends x{constructor(){super(...arguments);this._open=!1}static{this.styles=S}static{this.properties={...x.properties,_open:{state:!0}}}validateConfig(e){if(!e.tent||!e.station)throw new Error("growctrl-station-card: 'tent' und 'station' sind Pflicht (wie in der Integration angelegt).")}static getConfigElement(){return document.createElement("growctrl-station-editor")}static getStubConfig(){return{tent:"gross",station:"main1"}}e(e){let[s,i,o]=Ee[e],r=this._config;return r.overrides?.[i]??j(this.hass,r.tent,r.station,o)??ht(s,r.tent,r.station,i,r.overrides)}_select(e,s){this.hass.callService("select","select_option",{entity_id:e,option:s})}render(){let e=this._config;if(!this.hass)return c;let s=this.st(this.e("stage"))??"Veg",i=dt[s]??dt.Veg,o=this.isOn(this.e("auto")),r=this.isOn(this.e("wartung")),p=[{e:this.e("pOverride"),label:"Manueller Eingriff"},{e:this.e("pFailsafe"),label:"Licht-Failsafe"},{e:this.e("pTime"),label:"Zeiten unvollst\xE4ndig"}].filter($=>this.isOn($.e)),a=this.hass.states[this.e("event")],h=p.length?this.isOn(this.e("pFailsafe"))?"critical":"warning":a?.attributes?.schweregrad==="critical"?"warning":"ok",f=L[h]??L.ok,u=k(this.st(this.e("dli"))),m=k(this.st(this.e("dliFc"))),b=this.hass.states[this.e("dli")]?.attributes?.ziel_aktuelle_phase,v=k(this.st(this.e("age"))),A=this.st(this.e("rec")),P=!!this.hass.states[this.e("pumpRest")],I=!!this.hass.states[this.e("dli")],y=($,E,O,Le)=>l`
      <div class="tile" style="min-width:0">
        <div class="lbl">${$}</div>
        <div style="font-size:19px;font-weight:800;letter-spacing:-.3px;line-height:1.15;
          color:${Le??"rgba(255,255,255,.92)"}">${E}</div>
        ${O?l`<div style="font-size:10px;color:rgba(255,255,255,.45);margin-top:2px">${O}</div>`:c}
      </div>`,C=($,E)=>l`
      <button class="gc tile" style="text-align:left;min-width:0" @click=${()=>this.moreInfo($)}>
        <div class="lbl">${E}</div>
        <div style="font-size:14px;font-weight:700;color:rgba(255,255,255,.85)">
          ${this.st($)??"\u2013"}</div>
      </button>`;return l`<div class="card ${e.style?.glass?"glass":""}" data-level=${h}
        style="${w(e.style)};position:relative">
      <div class="hdr">
        <div style="min-width:0">
          <div class="title" style="display:flex;align-items:center;gap:8px">
            ${e.name??`${e.tent} \xB7 ${e.station}`}
            <span class="stagebadge" style="background:${i.bg};color:${i.color}">${s}</span>
          </div>
          <div class="subtitle" style="display:flex;align-items:center;gap:6px;margin-top:3px">
            <span class="dot" style="background:${f.color}"></span>${f.label}
            ${r?l`<span style="color:#FFD166;font-weight:700">\u00b7 Wartung</span>`:c}
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:6px">
          <button class="gc" title="Wartung (System greift nicht ein)"
            style="width:28px;height:28px;border-radius:9px;display:flex;align-items:center;justify-content:center;
              background:${r?"rgba(255,209,102,.16)":"rgba(255,255,255,.05)"};
              border:1px solid ${r?"rgba(255,209,102,.5)":"rgba(255,255,255,.1)"};
              color:${r?"#FFD166":"rgba(255,255,255,.5)"}"
            @click=${()=>this.toggle(this.e("wartung"))}>
            <ha-icon icon="mdi:wrench-outline" style="--mdc-icon-size:14px"></ha-icon></button>
          ${e.show_settings!==!1?l`<button class="gc" title="Einstellungen"
            style="width:28px;height:28px;border-radius:9px;display:flex;align-items:center;justify-content:center;
              background:${this._open?"rgba(255,255,255,.12)":"rgba(255,255,255,.05)"};
              border:1px solid rgba(255,255,255,.1);color:rgba(255,255,255,.55)"
            @click=${()=>{this._open=!this._open}}>
            <ha-icon icon="mdi:tune-variant" style="--mdc-icon-size:14px"></ha-icon></button>`:c}
          <button class="gc" style="padding:6px 13px;border-radius:12px;font-size:11px;font-weight:800;
              letter-spacing:.4px;transition:all .18s;
              background:${o?"rgba(77,255,195,.13)":"rgba(255,255,255,.05)"};
              border:1.5px solid ${o?g.ok:"rgba(255,255,255,.14)"};
              color:${o?g.ok:"rgba(255,255,255,.5)"}"
            @click=${()=>this.confirmToggle(this.e("auto"),"Automatik")}>
            AUTO ${o?"AN":"AUS"}</button>
        </div>
      </div>

      <div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:12px">
        ${Ze.map($=>{let E=dt[$],O=$===s;return l`<button class="gc" style="padding:5px 12px;border-radius:10px;font-size:11px;
              font-weight:700;transition:all .15s;
              background:${O?E.bg:"rgba(255,255,255,.04)"};
              border:1.5px solid ${O?E.color:"rgba(255,255,255,.09)"};
              color:${O?E.color:"rgba(255,255,255,.45)"}"
            @click=${()=>this._select(this.e("stage"),$)}>${$}</button>`})}
      </div>

      <div class="kpis ${I?"":P?"cols-3":"cols-2"}" style="margin-top:12px">
        ${y("Licht",this.st(this.e("lightRest"))??"\u2013",`${this.unit(this.e("lightRest"))||"min"} Restzeit`)}
        ${P?y("Pumpe",this.st(this.e("pumpRest"))??"\u2013",`${this.unit(this.e("pumpRest"))||"min"} Restzeit`):c}
        ${I?y("DLI heute",u!==null?u.toFixed(1):"\u2013",b?`Ziel ${b} \xB7 Prognose ${m!==null?m.toFixed(1):"\u2013"}`:void 0,b&&u!==null&&u>=b?g.ok:void 0):c}
        ${y("Alter",v!==null?`${v} d`:"\u2013",A&&A!==s?`\u2192 ${A} empfohlen`:"Phase passt",A&&A!==s?"#FFD166":void 0)}
      </div>

      ${p.length?l`<div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:10px">
        ${p.map($=>l`<span class="badge warn">\u26A0 ${$.label}</span>`)}</div>`:c}

      ${a?l`<button class="gc logrow" style="width:100%;margin-top:10px;text-align:left"
          @click=${()=>this.moreInfo(this.e("event"))}>
          <span class="dot" style="background:${T[a.attributes?.schweregrad==="ok"?"info":a.attributes?.schweregrad]??g.info};flex-shrink:0"></span>
          <span class="txt" style="color:rgba(255,255,255,.65)">${a.state}</span>
        </button>`:c}

      ${this._open?l`<div class="settings-grid" style="margin-top:10px">
        ${C(this.e("lightOn"),"Licht AN")}
        ${C(this.e("lightOffSv"),"AUS Seed/Veg")}
        ${C(this.e("lightOffBloom"),"AUS Bloom")}
        ${C(this.e("germination"),"Keimstart")}
        ${C(this.e("overrideMin"),"Man. \xDCbernahme")}
      </div>`:c}
      ${this.renderConfirm()}
    </div>`}};customElements.define("growctrl-station-card",Ft);var We=[d.text("title","Titel"),d.num("columns","Spalten",1,6)],Ke=[d.entity("entity","Aktor",["switch","input_boolean","light","fan"]),d.text("name","Name (optional)"),d.text("group","Gruppe (optional, z.B. Zelt / Pflanzen)"),d.bool("confirm","Mit Best\xE4tigung schalten")],Rt=class extends _{render(){return l`${this.form(We)}
      ${this.list({key:"controls",rowSchema:Ke,title:"Aktoren",addLabel:"Aktor hinzuf\xFCgen",newItem:()=>({entity:""})})}
      ${this.styleSection()}`}};customElements.define("growctrl-controls-editor",Rt);var qe={switch:"mdi:power",light:"mdi:lightbulb",fan:"mdi:fan",input_boolean:"mdi:toggle-switch"},zt=class extends x{static{this.styles=S}validateConfig(t){if(!Array.isArray(t.controls)||!t.controls.length)throw new Error("growctrl-controls-card: 'controls' (min. 1 Eintrag) ist Pflicht.")}static getConfigElement(){return document.createElement("growctrl-controls-editor")}static getStubConfig(){return{controls:[{entity:"switch.beispiel"}]}}render(){let t=this._config;if(!this.hass)return c;let e=t.style?.accent??"#4DFFC3",s=new Map;t.controls.forEach(o=>{let r=o.group??"";s.has(r)||s.set(r,[]),s.get(r).push(o)});let i=t.columns?`repeat(${t.columns},1fr)`:"repeat(auto-fill,minmax(92px,1fr))";return l`<div class="card ${t.style?.glass?"glass":""}" style="${w(t.style)};position:relative">
      ${t.title?l`<div class="title" style="font-size:15px">${t.title}</div>`:c}
      ${[...s.entries()].map(([o,r])=>l`
        ${o?l`<div class="seclbl">${o}</div>`:c}
        <div class="grid" style="grid-template-columns:${i};gap:8px;margin-top:${o?0:10}px">
          ${r.map(p=>{let a=this.isOn(p.entity),h=p.name??this.friendly(p.entity),f=this.hass.states[p.entity],u=p.icon??f?.attributes?.icon??qe[p.entity.split(".")[0]]??"mdi:power";return l`<button class="gc" style="display:flex;flex-direction:column;align-items:center;gap:5px;
                padding:11px 6px 9px;border-radius:14px;transition:all .18s;min-width:0;
                background:${a?`color-mix(in srgb, ${e} 12%, transparent)`:"rgba(255,255,255,.04)"};
                border:1.5px solid ${a?e:"rgba(255,255,255,.08)"};
                box-shadow:${a?`0 4px 18px -8px ${e}`:"none"}"
              @click=${()=>p.confirm?this.confirmToggle(p.entity,h):this.toggle(p.entity)}>
              <span style="width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;
                  transition:all .18s;
                  background:${a?e:"rgba(255,255,255,.07)"};
                  color:${a?"#0C1117":"rgba(255,255,255,.55)"}">
                <ha-icon .icon=${u} style="--mdc-icon-size:18px"></ha-icon>
              </span>
              <span style="font-size:11px;font-weight:700;max-width:100%;overflow:hidden;white-space:nowrap;
                  text-overflow:ellipsis;color:${a?"rgba(255,255,255,.95)":"rgba(255,255,255,.65)"}">
                ${h}${p.confirm?" \u{1F512}":""}</span>
              <span style="font-size:9px;font-weight:800;letter-spacing:.8px;
                  color:${a?e:"rgba(255,255,255,.35)"}">${a?"AN":"AUS"}</span>
            </button>`})}
        </div>`)}
      ${this.renderConfirm()}
    </div>`}};customElements.define("growctrl-controls-card",zt);var Xe=[d.text("title","Titel"),d.num("columns","Spalten",1,6),d.num("sparkline_hours","Sparkline-Zeitraum (h)",1,168)],Qe=[d.entity("entity","Sensor","sensor"),d.text("name","Name (optional)"),d.num("min","Sollbereich Min (optional)"),d.num("max","Sollbereich Max (optional)")],It=class extends _{render(){return l`${this.form(Xe)}
      ${this.list({key:"sensors",rowSchema:Qe,title:"Sensoren",addLabel:"Sensor hinzuf\xFCgen",newItem:()=>({entity:""})})}
      ${this.styleSection()}`}};customElements.define("growctrl-sensors-editor",It);var Mt=class extends x{constructor(){super(...arguments);this._hist={}}static{this.styles=S}static{this.properties={...x.properties,_hist:{state:!0}}}validateConfig(e){if(!Array.isArray(e.sensors)||!e.sensors.length)throw new Error("growctrl-sensors-card: 'sensors' (min. 1 Eintrag) ist Pflicht.")}static getConfigElement(){return document.createElement("growctrl-sensors-editor")}static getStubConfig(){return{sensors:[{entity:"sensor.beispiel"}]}}connectedCallback(){super.connectedCallback(),this._load(),this._timer=window.setInterval(()=>this._load(),5*6e4)}disconnectedCallback(){super.disconnectedCallback(),this._timer&&clearInterval(this._timer)}async _load(){if(!this.hass){setTimeout(()=>this._load(),1e3);return}let e=this._config,s={};for(let i of e.sensors)s[i.entity]=await R(this.hass,i.entity,e.sparkline_hours??24);this._hist=s}bad(e,s){return e!==null&&(s.min!==void 0&&e<s.min||s.max!==void 0&&e>s.max)}render(){let e=this._config;if(!this.hass)return c;let s=e.columns??2,i=e.sensors.some(o=>this.bad(k(this.st(o.entity)),o));return l`<div class="card ${e.style?.glass?"glass":""}" data-level=${i?"warning":"ok"}
        style=${w(e.style)}>
      ${e.title?l`<div class="title" style="font-size:15px;margin-bottom:2px">${e.title}</div>`:c}
      <div class="grid" style="grid-template-columns:repeat(${s},1fr)">
        ${e.sensors.map(o=>{let r=k(this.st(o.entity)),p=this.bad(r,o),a=ke(this._hist[o.entity]??[],100,26),h=o.name??this.friendly(o.entity);return l`<button class="gc tile" style="text-align:left;position:relative;overflow:hidden;
              ${p?"border-color:rgba(255,107,107,.45);background:rgba(255,107,107,.08)":""}"
            @click=${()=>this.moreInfo(o.entity)}>
            ${a?l`<svg viewBox="0 0 100 26" preserveAspectRatio="none"
              style="position:absolute;left:0;right:0;bottom:0;width:100%;height:30px;opacity:.5">
              <path d="${a} L100,26 L0,26 Z" fill="${p?"rgba(255,107,107,.25)":"rgba(77,255,195,.18)"}"/>
              <path d="${a}" fill="none" stroke="${p?g.crit:"rgba(77,255,195,.8)"}" stroke-width="1.4"/>
            </svg>`:c}
            <div class="lbl" style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${h}</div>
            <div class="val" style="font-size:22px;${p?`color:${g.crit}`:""}">${r!==null?r:"--"}<span class="unit">${this.unit(o.entity)}</span></div>
            <div style="height:14px"></div>
          </button>`})}
      </div>
    </div>`}};customElements.define("growctrl-sensors-card",Mt);var Je=[d.text("title","Titel"),d.num("columns","Spalten",1,4),d.entity("calendar","Kalender (optional)","calendar")],Ye=[d.text("name","Pflanzenname"),d.text("strain","Sorte (optional)"),d.entity("germination_helper","Keimdatum-Helper (optional)",["input_datetime","date","datetime"]),d.entities("sensors","Sensoren der Pflanze (optional)","sensor"),d.entity("camera","Kamera (Live-Bild, optional)","camera"),d.text("image","Bild-URL (optional, statt Kamera)")],Nt=class extends _{render(){return l`${this.form(Je)}
      ${this.list({key:"plants",rowSchema:Ye,title:"Pflanzen",addLabel:"Pflanze hinzuf\xFCgen",newItem:()=>({name:"Pflanze"})})}
      ${this.styleSection()}`}};customElements.define("growctrl-plants-editor",Nt);var Ut=class extends x{constructor(){super(...arguments);this._events=[];this._tick=0}static{this.styles=S}static{this.properties={...x.properties,_events:{state:!0},_tick:{state:!0}}}validateConfig(e){if(!Array.isArray(e.plants)||!e.plants.length)throw new Error("growctrl-plants-card: 'plants' (min. 1 Eintrag) ist Pflicht.")}static getConfigElement(){return document.createElement("growctrl-plants-editor")}static getStubConfig(){return{plants:[{name:"Pflanze 1"}]}}connectedCallback(){super.connectedCallback(),this._load(),this._timer=window.setInterval(()=>this._load(),10*6e4),this._mediaTimer=window.setInterval(()=>{this._tick++},1e4)}disconnectedCallback(){super.disconnectedCallback(),this._timer&&clearInterval(this._timer),this._mediaTimer&&clearInterval(this._mediaTimer)}async _load(){let e=this._config;if(e.calendar){if(!this.hass){setTimeout(()=>this._load(),1e3);return}this._events=(await Se(this.hass,e.calendar)).slice(0,3)}}render(){let e=this._config;return this.hass?l`<div class="card ${e.style?.glass?"glass":""}" style=${w(e.style)}>
      ${e.title?l`<div class="title" style="font-size:15px">${e.title}</div>`:c}
      <div class="grid" style="grid-template-columns:repeat(${e.columns??2},1fr)">
        ${e.plants.map(s=>{let i=s.germination_helper?this.st(s.germination_helper):void 0,o=i?be(i):null,r=s.camera?this.hass.states[s.camera]?.attributes?.entity_picture?`${this.hass.states[s.camera].attributes.entity_picture}&t=${this._tick}`:void 0:s.image;return l`<div class="tile" style="overflow:hidden">
            ${r?l`<button class="gc" style="display:block;width:calc(100% + 26px);margin:-11px -13px 9px"
                @click=${()=>s.camera&&this.moreInfo(s.camera)}>
                <img src=${r} style="width:100%;height:120px;object-fit:cover;display:block" loading="lazy"
                  alt=${s.name} /></button>`:c}
            <div style="display:flex;align-items:baseline;gap:6px;flex-wrap:wrap">
              <span style="font-size:13px;font-weight:800">\u{1F331} ${s.name}</span>
              ${s.strain?l`<span style="font-size:10px;color:rgba(255,255,255,.55)">${s.strain}</span>`:c}
            </div>
            ${o!==null?l`<div class="lbl" style="margin-top:4px">Tag ${o}</div>`:c}
            ${(s.sensors??[]).map(p=>{let a=typeof p=="string"?{entity:p}:p;return l`
              <button class="gc" style="display:flex;justify-content:space-between;width:100%;font-size:11px;margin-top:4px;color:rgba(255,255,255,.75)"
                @click=${()=>this.moreInfo(a.entity)}>
                <span>${a.name??this.friendly(a.entity)}</span>
                <span style="font-weight:700">${k(this.st(a.entity))??"--"} ${this.unit(a.entity)}</span>
              </button>`})}
          </div>`})}
      </div>
      ${e.calendar?l`<div class="seclbl">Anstehend</div>
        ${this._events.length?this._events.map(s=>l`
          <div class="logrow" style="background:rgba(0,0,0,.18);margin-top:4px">
            <span class="txt">${s.summary}</span>
            <span class="ts">${(s.start?.date??s.start?.dateTime??"").substring(0,10)}</span>
          </div>`):l`<div class="logrow" style="background:rgba(0,0,0,.12)"><span class="txt" style="color:rgba(255,255,255,.35)">Keine Ereignisse</span></div>`}`:c}
    </div>`:c}};customElements.define("growctrl-plants-card",Ut);var ts=[d.text("title","Titel"),d.num("limit","Max. Zeilen",3,50),d.select("min_level","Anzeige",[{value:"alle",label:"Alle Ereignisse"},{value:"warnung",label:"Nur Warnungen/Fehler"}])],es=[d.entity("entity","Letztes-Ereignis-Sensor","sensor"),d.text("name","Label (optional)")],Ht=class extends _{render(){return l`${this.form(ts)}
      ${this.list({key:"sources",rowSchema:es,title:"Quellen",addLabel:"Quelle hinzuf\xFCgen",newItem:()=>({entity:""})})}
      ${this.styleSection()}`}};customElements.define("growctrl-status-editor",Ht);var Bt=class extends x{static{this.styles=S}validateConfig(t){if(!Array.isArray(t.sources)||!t.sources.length)throw new Error("growctrl-status-card: 'sources' (Letztes-Ereignis-Sensoren) ist Pflicht.")}static getConfigElement(){return document.createElement("growctrl-status-editor")}static getStubConfig(){return{sources:[{entity:"sensor.growctrl_gross_main1_letztes_ereignis"}]}}render(){let t=this._config;if(!this.hass)return c;let e=[],s=[];for(let a of t.sources){let h=this.hass.states[a.entity],f=h?.attributes?.verlauf??[];s.push(h?.attributes?.schweregrad??"ok"),f.forEach(u=>e.push({...u,src:a.name??this.friendly(a.entity)}))}e.reverse();let o=(t.min_level==="warnung"?e.filter(a=>a.level==="warning"||a.level==="critical"):e).slice(0,t.limit??12),r=K(s.map(a=>a==="ok"?"ok":a)),p=L[r];return l`<div class="card ${t.style?.glass?"glass":""}" data-level=${r} style=${w(t.style)}>
      <div class="hdr">
        <div class="title" style="font-size:15px">${t.title??"Ereignisprotokoll"}</div>
        <span class="status-pill" style="background:${p.bg};color:${p.color}">
          <span class="dot" style="background:${p.color}"></span>${p.label}</span>
      </div>
      <div style="margin-top:9px">
        ${o.length?o.map(a=>l`
          <div class="logrow" style="background:${a.level==="info"?"transparent":N[a.level]??"transparent"};
              margin-top:3px;padding:6px 9px">
            <span class="ts" style="min-width:36px;flex-shrink:0">${a.ts}</span>
            ${t.sources.length>1?l`<span style="font-size:10.5px;font-weight:800;min-width:62px;
              flex-shrink:0;color:rgba(255,255,255,.55)">${a.src}</span>`:c}
            <span class="txt" style="color:${a.level==="info"?"rgba(255,255,255,.6)":T[a.level]??"rgba(255,255,255,.6)"}">${a.text}</span>
          </div>`):l`<div class="logrow"><span class="txt" style="color:${g.ok}">
            \u2713 Noch keine Ereignisse</span></div>`}
      </div>
    </div>`}};customElements.define("growctrl-status-card",Bt);var ss=[d.text("title","Titel (optional)"),d.text("logo","Logo-URL (z.B. /local/growctrl/logo.png)"),d.bool("show_chart","VPD-Chart anzeigen"),d.num("hours","Chart-Zeitraum (h)",1,168)],Dt=class extends _{render(){let t=[this.stationSelect(this._config?.tent),d.text("name","Label (optional)")];return l`${this.form([this.tentSelect(),...ss])}
      ${this.list({key:"stations",rowSchema:t,title:"Stationen (Informationssystem)",addLabel:"Station hinzuf\xFCgen",newItem:()=>({station:""})})}
      ${this.styleSection()}`}};customElements.define("growctrl-hero-editor",Dt);var Gt=class extends x{constructor(){super(...arguments);this._hist=[]}static{this.styles=S}static{this.properties={...x.properties,_hist:{state:!0}}}validateConfig(e){if(!e.tent)throw new Error("growctrl-hero-card: 'tent' ist Pflicht (Zelt-Name aus der Integration).")}static getConfigElement(){return document.createElement("growctrl-hero-editor")}static getStubConfig(){return{tent:"gross",stations:[{station:"main1"}]}}te(e){let[s,i,o]=ut[e],r=this._config;return r.overrides?.[i]??j(this.hass,r.tent,"zelt",o)??gt(s,r.tent,i,r.overrides)}connectedCallback(){super.connectedCallback(),this._load(),this._timer=window.setInterval(()=>this._load(),5*6e4)}disconnectedCallback(){super.disconnectedCallback(),this._timer&&clearInterval(this._timer)}async _load(){if(!this.hass){setTimeout(()=>this._load(),1e3);return}this._hist=await R(this.hass,this.te("vpd"),this._config.hours??24)}render(){let e=this._config;if(!this.hass)return c;let s=this.hass.states[this.te("vpd")],i=k(s?.state),o=s?.attributes?.temp,r=s?.attributes?.rh,p=s?.attributes?.phase_effektiv??"",a=s?.attributes?.sollwerte,h=this.isOn(this.te("enabled")),f=this.isOn(this.te("climate")),u=this.hass.states[this.te("status")],m=u?.attributes?.probleme??[],b=(e.stations??[]).map(y=>{let C=this.hass.states[j(this.hass,e.tent,y.station,"last_event")??ht("sensor",e.tent,y.station,"letztes_ereignis",e.overrides)],$=C?.attributes?.schweregrad??"ok";return{name:y.name??y.station,text:C?.state??"\u2013",level:$}}),v=K([u?.state==="problem"?"warning":"ok",...b.map(y=>y.level)]),A=L[v],P=[...m.map(y=>({label:y,level:"warning"})),...b.filter(y=>y.level!=="ok").map(y=>({label:`${y.name}: ${y.text}`,level:y.level}))],I=(y,C,$,E)=>l`
      <button class="gc" style="display:flex;align-items:center;gap:8px;padding:8px 15px;border-radius:14px;
          transition:all .18s;
          background:${$?"rgba(77,255,195,.12)":"rgba(255,255,255,.05)"};
          border:1.5px solid ${$?g.ok:"rgba(255,255,255,.12)"};
          color:${$?g.ok:"rgba(255,255,255,.5)"}"
        @click=${()=>this.confirmToggle(y,C)}>
        <ha-icon .icon=${E} style="--mdc-icon-size:16px"></ha-icon>
        <span style="font-size:11px;font-weight:800">${C} ${$?"AN":"AUS"}</span>
      </button>`;return l`<div class="card ${e.style?.glass?"glass":""}" data-level=${v}
        style="${w(e.style)};position:relative">
      <div class="hdr">
        <div style="display:flex;align-items:center;gap:11px">
          ${e.logo?l`<img src=${e.logo} alt="Logo"
            style="width:42px;height:42px;border-radius:11px;object-fit:contain;background:rgba(255,255,255,.92);padding:3px" />`:c}
          <div>
            <div class="title">${e.title??`GROWCTRL \xB7 ${e.tent}`}</div>
            ${p?l`<div class="subtitle">Klima-Phase ${p}</div>`:c}
          </div>
        </div>
        <span class="status-pill" style="background:${A.bg};color:${A.color}">
          <span class="dot" style="background:${A.color}"></span>${A.label}</span>
      </div>

      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:13px">
        ${I(this.te("enabled"),"Zelt",h,"mdi:power")}
        ${I(this.te("climate"),"Klima",f,"mdi:thermostat")}
      </div>

      <div class="kpis cols-3" style="margin-top:12px">
        <div class="tile" style="text-align:center"><div class="lbl">Temperatur</div>
          <div class="val" style="font-size:22px">${o!=null?Number(o).toFixed(1):"\u2013"}<span class="unit">\u00b0C</span></div></div>
        <div class="tile" style="text-align:center"><div class="lbl">Luftfeuchte</div>
          <div class="val" style="font-size:22px">${r!=null?Math.round(Number(r)):"\u2013"}<span class="unit">%</span></div></div>
        <div class="tile" style="text-align:center"><div class="lbl">VPD</div>
          <div class="val" style="font-size:22px;color:${i!==null&&a&&i>=a.vpd_min&&i<=a.vpd_max?g.ok:"#FFD166"}">${i!==null?i.toFixed(2):"\u2013"}<span class="unit">kPa</span></div></div>
      </div>

      ${e.show_chart!==!1&&this._hist.length>1?l`
        <div class="seclbl">VPD \u00b7 ${e.hours??24}h</div>
        ${H([{data:this._hist,color:g.ok}],{h:100,band:a?{min:a.vpd_min,max:a.vpd_max}:void 0,grid:3})}`:c}

      ${b.length?l`<div class="seclbl">Stationen</div>
        ${b.map(y=>l`<div class="logrow" style="margin-top:3px;padding:6px 9px">
          <span class="dot" style="background:${y.level==="ok"?g.ok:T[y.level]??g.warn};flex-shrink:0"></span>
          <span style="font-size:11px;font-weight:800;min-width:62px;flex-shrink:0;
            color:rgba(255,255,255,.8)">${y.name}</span>
          <span class="txt" style="color:rgba(255,255,255,.55)">${y.text}</span>
        </div>`)}`:c}

      <div class="seclbl">Informationssystem</div>
      ${P.length?P.map(y=>l`<div class="logrow" style="background:${N[y.level]??N.warning};margin-top:4px">
            <span class="txt" style="color:${T[y.level]??T.warning}">\u26A0 ${y.label}</span></div>`):l`<div class="logrow" style="background:${N.ok};margin-top:4px">
            <span class="txt" style="color:${g.ok}">\u2713 Alle Systeme arbeiten normal</span></div>`}
      ${this.renderConfirm()}
    </div>`}};customElements.define("growctrl-hero-card",Gt);var is=[d.text("title","Titel"),d.bool("compact","Kompakte Zeilen")],ns=[d.text("name","Name (z.B. Main 1)"),d.entity("entity","Quelle (Log / Problem- / Ereignis-Sensor)",["input_text","binary_sensor","sensor"]),d.select("type","Typ",[{value:"station",label:"Stations-Log"},{value:"climate",label:"Klima-Log"},{value:"problem",label:"Problem-Sensor"},{value:"event",label:"Ereignis-Sensor (Integration)"}])],Vt=class extends _{render(){return l`${this.form(is)}
      ${this.list({key:"rows",rowSchema:ns,title:"Zeilen",addLabel:"Zeile hinzuf\xFCgen",newItem:()=>({name:"",entity:"",type:"station"})})}
      ${this.styleSection()}`}};customElements.define("growctrl-checkup-editor",Vt);var jt=class extends x{static{this.styles=S}validateConfig(t){if(!Array.isArray(t.rows)||!t.rows.length)throw new Error("growctrl-checkup-card: 'rows' (min. 1 Eintrag) ist Pflicht.")}static getConfigElement(){return document.createElement("growctrl-checkup-editor")}static getStubConfig(){return{rows:[{name:"Main 1",entity:"input_text.hydro_log_mittel_main1"}]}}render(){let t=this._config;if(!this.hass)return c;let e=t.rows.map(r=>{if(r.type==="event"){let a=this.hass.states[r.entity],h=a?.attributes?.schweregrad??"ok";return{row:r,level:h==="ok"?"ok":h,label:a?.state??"\u2013",ts:""}}if(r.type==="problem"){let a=this.isOn(r.entity);return{row:r,level:a?"warning":"ok",label:a?"Problem erkannt":"OK",ts:""}}let p=(r.type==="climate"?ve:$e)(this.st(r.entity));return{row:r,level:p.level==="none"?"ok":p.level,label:p.label,ts:p.ts??""}}),s=K(e.map(r=>r.level)),i=L[s],o=r=>r==="critical"?g.crit:r==="warning"?g.warn:r==="info"?g.info:g.ok;return l`<div class="card ${t.style?.glass?"glass":""}" data-level=${s} style=${w(t.style)}>
      <div class="hdr">
        <div class="title" style="font-size:15px">${t.title??"Checkup"}</div>
        <span class="status-pill" style="background:${i.bg};color:${i.color}">
          <span class="dot" style="background:${i.color}"></span>${i.label}</span>
      </div>
      <div style="margin-top:10px">
        ${e.map(r=>l`<div class="logrow" style="background:${t.compact?"transparent":N[r.level==="ok"?"none":r.level]};
            margin-top:${t.compact?2:5}px;padding:${t.compact?"4px 6px":"8px 11px"}">
          <span style="width:9px;height:9px;border-radius:50%;flex-shrink:0;background:${o(r.level)};
            box-shadow:0 0 7px ${o(r.level)}66"></span>
          <span style="font-size:11.5px;font-weight:800;min-width:64px;flex-shrink:0;color:rgba(255,255,255,.85)">${r.row.name}</span>
          <span class="txt" style="color:${r.level==="ok"?"rgba(255,255,255,.55)":T[r.level]}">${r.label}</span>
          ${r.ts?l`<span class="ts">${r.ts}</span>`:c}
        </div>`)}
      </div>
    </div>`}};customElements.define("growctrl-checkup-card",jt);var rs=[d.text("title","Titel"),d.entity("entity","F\xFCllstand-Sensor (%) (Pflicht)","sensor"),d.num("min","Mindeststand (%)",0,100),d.num("volume_l","Tankvolumen (Liter, optional)",0,2e3)],Zt=class extends _{render(){return l`${this.form(rs)}${this.styleSection()}`}};customElements.define("growctrl-tank-editor",Zt);var Wt=class extends x{static{this.styles=S}validateConfig(t){if(!t.entity)throw new Error("growctrl-tank-card: 'entity' (Fuellstand-Sensor in %) ist Pflicht.")}static getConfigElement(){return document.createElement("growctrl-tank-editor")}static getStubConfig(){return{entity:"sensor.gc_slot1_level1",title:"Tank"}}render(){let t=this._config;if(!this.hass)return c;let e=Math.min(100,Math.max(0,k(this.st(t.entity))??0)),s=t.min!==void 0&&e<t.min,i=s?g.crit:e<(t.min??0)+15?g.warn:"#4FC3F7",o=t.volume_l?e/100*t.volume_l:null;return l`<div class="card ${t.style?.glass?"glass":""}" data-level=${s?"critical":"ok"}
        style=${w(t.style)}>
      <div class="hdr">
        <div class="title" style="font-size:15px">${t.title??"F\xFCllstand"}</div>
        ${s?l`<span class="badge warn">\u26A0 Nachf\u00fcllen</span>`:c}
      </div>
      <div style="display:flex;align-items:center;gap:18px;margin-top:12px">
        <button class="gc" style="position:relative;width:74px;height:108px;flex-shrink:0;border-radius:12px 12px 16px 16px;
            border:2px solid rgba(255,255,255,.15);overflow:hidden;background:rgba(0,0,0,.3)"
          @click=${()=>this.moreInfo(t.entity)}>
          <div style="position:absolute;left:0;right:0;bottom:0;height:${e}%;transition:height .8s;
              background:linear-gradient(180deg, ${i}cc, ${i}88)">
            <div style="position:absolute;top:-5px;left:-10%;width:120%;height:10px;border-radius:50%;
              background:${i};opacity:.9"></div>
          </div>
          ${t.min!==void 0?l`<div style="position:absolute;left:0;right:0;bottom:${t.min}%;
            border-top:1.5px dashed rgba(255,107,107,.7)"></div>`:c}
        </button>
        <div style="flex:1;min-width:0">
          <div class="lbl">Aktueller F\u00fcllstand</div>
          <div class="val" style="font-size:34px;color:${i}">${Math.round(e)}<span class="unit">%</span></div>
          ${o!==null?l`<div style="font-size:12px;font-weight:600;color:rgba(255,255,255,.55);margin-top:2px">
            \u2248 ${o.toFixed(1)} l von ${t.volume_l} l</div>`:c}
          ${t.min!==void 0?l`<div style="font-size:10.5px;color:rgba(255,255,255,.4);margin-top:6px">
            Mindeststand ${t.min}%</div>`:c}
        </div>
      </div>
    </div>`}};customElements.define("growctrl-tank-card",Wt);var os=[d.text("title","Titel"),d.num("hours","Zeitraum (h)",1,168),d.num("height","Diagrammh\xF6he (px)",80,300)],as=[d.entity("entity","Sensor","sensor"),d.text("name","Name (optional)"),d.text("color","Farbe (optional, z.B. #FF9F5A)")],Kt=class extends _{render(){return l`${this.form(os)}
      ${this.list({key:"sensors",rowSchema:as,title:"Serien",addLabel:"Sensor hinzuf\xFCgen",newItem:()=>({entity:""})})}
      ${this.styleSection()}`}};customElements.define("growctrl-history-editor",Kt);var Te=["#FF9F5A","#4FC3F7","#4DFFC3","#C792EA"],qt=class extends x{constructor(){super(...arguments);this._hist={}}static{this.styles=S}static{this.properties={...x.properties,_hist:{state:!0}}}validateConfig(e){if(!Array.isArray(e.sensors)||!e.sensors.length)throw new Error("growctrl-history-card: 'sensors' (min. 1 Eintrag) ist Pflicht.")}static getConfigElement(){return document.createElement("growctrl-history-editor")}static getStubConfig(){return{sensors:[{entity:"sensor.zelt_temperature"}],hours:24}}connectedCallback(){super.connectedCallback(),this._load(),this._timer=window.setInterval(()=>this._load(),5*6e4)}disconnectedCallback(){super.disconnectedCallback(),this._timer&&clearInterval(this._timer)}async _load(){if(!this.hass){setTimeout(()=>this._load(),1e3);return}let e=this._config,s={};for(let i of e.sensors)s[i.entity]=await R(this.hass,i.entity,e.hours??24);this._hist=s}render(){let e=this._config;if(!this.hass)return c;let s=e.sensors.map((i,o)=>({data:this._hist[i.entity]??[],color:i.color??Te[o%Te.length],name:`${i.name??this.friendly(i.entity)} \xB7 ${k(this.st(i.entity))??"--"} ${this.unit(i.entity)}`,fill:e.sensors.length===1}));return l`<div class="card ${e.style?.glass?"glass":""}" style=${w(e.style)}>
      <div class="hdr">
        <div class="title" style="font-size:15px">${e.title??"Verlauf"}</div>
        <span class="badge">${e.hours??24}h</span>
      </div>
      <div style="margin-top:8px">${H(s,{h:e.height??130,grid:3})}</div>
      ${Ce(s)}
    </div>`}};customElements.define("growctrl-history-card",qt);var ls=[d.text("title","Titel"),d.entity("entity","Sensor (Pflicht)","sensor"),d.text("name","Anzeigename (optional)"),d.num("min","Sollbereich Min"),d.num("max","Sollbereich Max"),d.num("decimals","Nachkommastellen",0,4),d.num("hours","Chart-Zeitraum (h)",1,168),d.num("height","Diagrammh\xF6he (px)",80,300)],Xt=class extends _{render(){return l`${this.form(ls)}${this.styleSection()}`}};customElements.define("growctrl-metric-editor",Xt);var Qt=class extends x{constructor(){super(...arguments);this._hist=[]}static{this.styles=S}static{this.properties={...x.properties,_hist:{state:!0}}}validateConfig(e){if(!e.entity)throw new Error("growctrl-metric-card: 'entity' ist Pflicht.")}static getConfigElement(){return document.createElement("growctrl-metric-editor")}static getStubConfig(){return{entity:"sensor.gc_slot1_ec1",name:"EC",min:1.2,max:2.2}}connectedCallback(){super.connectedCallback(),this._load(),this._timer=window.setInterval(()=>this._load(),5*6e4)}disconnectedCallback(){super.disconnectedCallback(),this._timer&&clearInterval(this._timer)}async _load(){if(!this.hass){setTimeout(()=>this._load(),1e3);return}let e=this._config;this._hist=await R(this.hass,e.entity,e.hours??24)}render(){let e=this._config;if(!this.hass)return c;let s=k(this.st(e.entity)),i=s!==null&&(e.min!==void 0&&s<e.min||e.max!==void 0&&s>e.max),o=s===null?"rgba(255,255,255,.4)":i?g.crit:g.ok,r=e.decimals??2;return l`<div class="card ${e.style?.glass?"glass":""}" data-level=${i?"warning":"ok"}
        style=${w(e.style)}>
      <div class="hdr">
        <div>
          <div class="lbl" style="font-size:10px;text-transform:uppercase;letter-spacing:.8px;color:rgba(255,255,255,.5);font-weight:700">
            ${e.name??this.friendly(e.entity)}</div>
          <button class="gc" @click=${()=>this.moreInfo(e.entity)}>
            <span class="val" style="font-size:36px;font-weight:800;letter-spacing:-1px;color:${o}">
              ${s!==null?s.toFixed(r):"--"}</span>
            <span class="unit" style="font-size:14px">${this.unit(e.entity)}</span>
          </button>
        </div>
        ${e.min!==void 0||e.max!==void 0?l`
          <div style="text-align:right">
            <div class="lbl">Sollbereich</div>
            <div style="font-size:13px;font-weight:700;color:${i?g.crit:"rgba(255,255,255,.7)"}">
              ${e.min??"\u2013"} \u2013 ${e.max??"\u2013"}</div>
            ${i?l`<div style="font-size:10px;font-weight:800;color:${g.crit};margin-top:2px">
              ${s<(e.min??-1/0)?"\u25BC ZU NIEDRIG":"\u25B2 ZU HOCH"}</div>`:c}
          </div>`:c}
      </div>
      <div style="margin-top:6px">
        ${H([{data:this._hist,color:i?g.crit:"#4DFFC3"}],{h:e.height??110,band:{min:e.min,max:e.max},grid:3})}
      </div>
    </div>`}};customElements.define("growctrl-metric-card",Qt);var cs="2.5.0",ds=[{type:"growctrl-tent-card",name:"GROWCTRL Tent",description:"Zelt-Hero: Klima-KPIs, VPD-Skala, Status-Ampel"},{type:"growctrl-station-card",name:"GROWCTRL Station",description:"Station: Licht-/Pumpenbalken, Stage, Auto, Konfiguration"},{type:"growctrl-controls-card",name:"GROWCTRL Controls",description:"Aktoren-Raster mit Gruppen und Bestaetigung"},{type:"growctrl-sensors-card",name:"GROWCTRL Sensors",description:"Sensor-Kacheln mit Sparklines"},{type:"growctrl-plants-card",name:"GROWCTRL Plants",description:"Pflanzen, Keimdatum, Kalender"},{type:"growctrl-status-card",name:"GROWCTRL Status",description:"Ereignisprotokoll der Integration mit Schweregrad-Ampel"},{type:"growctrl-hero-card",name:"GROWCTRL Hero",description:"Globale Steuerung, Klima-KPIs, VPD-Chart, Informationssystem"},{type:"growctrl-checkup-card",name:"GROWCTRL Checkup",description:"Ampel-Uebersicht aller Zelte/Stationen mit Auswertung"},{type:"growctrl-tank-card",name:"GROWCTRL Tank",description:"DWC-Fuellstand mit Animation und Warnstufe"},{type:"growctrl-history-card",name:"GROWCTRL History",description:"24h-Diagramm (z.B. Temperatur + Luftfeuchte)"},{type:"growctrl-metric-card",name:"GROWCTRL Metric",description:"EC/pH gross mit Chart und Sollbereich"}];window.customCards=window.customCards??[];ds.forEach(n=>window.customCards.push({...n,preview:!1,documentationURL:"https://github.com/MrDarkvoid/growctrl"}));console.info(`%c GROWCTRL Cards %c v${cs} `,"background:#1D9E75;color:#fff;font-weight:700","background:#0F6E56;color:#fff");
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
