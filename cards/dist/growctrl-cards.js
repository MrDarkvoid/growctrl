var it=globalThis,rt=it.ShadowRoot&&(it.ShadyCSS===void 0||it.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ht=Symbol(),Ht=new WeakMap,j=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==ht)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(rt&&t===void 0){let s=e!==void 0&&e.length===1;s&&(t=Ht.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&Ht.set(e,t))}return t}toString(){return this.cssText}},Wt=i=>new j(typeof i=="string"?i:i+"",void 0,ht),K=(i,...t)=>{let e=i.length===1?i[0]:t.reduce((s,n,r)=>s+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+i[r+1],i[0]);return new j(e,i,ht)},Vt=(i,t)=>{if(rt)i.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let s=document.createElement("style"),n=it.litNonce;n!==void 0&&s.setAttribute("nonce",n),s.textContent=e.cssText,i.appendChild(s)}},gt=rt?i=>i:i=>i instanceof CSSStyleSheet?(t=>{let e="";for(let s of t.cssRules)e+=s.cssText;return Wt(e)})(i):i;var{is:Ae,defineProperty:Ee,getOwnPropertyDescriptor:Ce,getOwnPropertyNames:ke,getOwnPropertySymbols:Le,getPrototypeOf:Fe}=Object,ot=globalThis,Gt=ot.trustedTypes,Oe=Gt?Gt.emptyScript:"",Pe=ot.reactiveElementPolyfillSupport,Z=(i,t)=>i,mt={toAttribute(i,t){switch(t){case Boolean:i=i?Oe:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,t){let e=i;switch(t){case Boolean:e=i!==null;break;case Number:e=i===null?null:Number(i);break;case Object:case Array:try{e=JSON.parse(i)}catch{e=null}}return e}},Kt=(i,t)=>!Ae(i,t),jt={attribute:!0,type:String,converter:mt,reflect:!1,useDefault:!1,hasChanged:Kt};Symbol.metadata??=Symbol("metadata"),ot.litPropertyMetadata??=new WeakMap;var k=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=jt){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let s=Symbol(),n=this.getPropertyDescriptor(t,s,e);n!==void 0&&Ee(this.prototype,t,n)}}static getPropertyDescriptor(t,e,s){let{get:n,set:r}=Ce(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get:n,set(o){let a=n?.call(this);r?.call(this,o),this.requestUpdate(t,a,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??jt}static _$Ei(){if(this.hasOwnProperty(Z("elementProperties")))return;let t=Fe(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(Z("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Z("properties"))){let e=this.properties,s=[...ke(e),...Le(e)];for(let n of s)this.createProperty(n,e[n])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[s,n]of e)this.elementProperties.set(s,n)}this._$Eh=new Map;for(let[e,s]of this.elementProperties){let n=this._$Eu(e,s);n!==void 0&&this._$Eh.set(n,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let s=new Set(t.flat(1/0).reverse());for(let n of s)e.unshift(gt(n))}else t!==void 0&&e.push(gt(t));return e}static _$Eu(t,e){let s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Vt(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){let s=this.constructor.elementProperties.get(t),n=this.constructor._$Eu(t,s);if(n!==void 0&&s.reflect===!0){let r=(s.converter?.toAttribute!==void 0?s.converter:mt).toAttribute(e,s.type);this._$Em=t,r==null?this.removeAttribute(n):this.setAttribute(n,r),this._$Em=null}}_$AK(t,e){let s=this.constructor,n=s._$Eh.get(t);if(n!==void 0&&this._$Em!==n){let r=s.getPropertyOptions(n),o=typeof r.converter=="function"?{fromAttribute:r.converter}:r.converter?.fromAttribute!==void 0?r.converter:mt;this._$Em=n;let a=o.fromAttribute(e,r.type);this[n]=a??this._$Ej?.get(n)??a,this._$Em=null}}requestUpdate(t,e,s,n=!1,r){if(t!==void 0){let o=this.constructor;if(n===!1&&(r=this[t]),s??=o.getPropertyOptions(t),!((s.hasChanged??Kt)(r,e)||s.useDefault&&s.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,s))))return;this.C(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:n,wrapped:r},o){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),r!==!0||o!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),n===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[n,r]of this._$Ep)this[n]=r;this._$Ep=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[n,r]of s){let{wrapped:o}=r,a=this[n];o!==!0||this._$AL.has(n)||a===void 0||this.C(n,void 0,r,a)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(e)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};k.elementStyles=[],k.shadowRootOptions={mode:"open"},k[Z("elementProperties")]=new Map,k[Z("finalized")]=new Map,Pe?.({ReactiveElement:k}),(ot.reactiveElementVersions??=[]).push("2.1.2");var vt=globalThis,Zt=i=>i,at=vt.trustedTypes,qt=at?at.createPolicy("lit-html",{createHTML:i=>i}):void 0,ee="$lit$",F=`lit$${Math.random().toFixed(9).slice(2)}$`,se="?"+F,Te=`<${se}>`,R=document,X=()=>R.createComment(""),J=i=>i===null||typeof i!="object"&&typeof i!="function",wt=Array.isArray,Re=i=>wt(i)||typeof i?.[Symbol.iterator]=="function",ft=`[ 	
\f\r]`,q=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Xt=/-->/g,Jt=/>/g,P=RegExp(`>|${ft}(?:([^\\s"'>=/]+)(${ft}*=${ft}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Qt=/'/g,Yt=/"/g,ne=/^(?:script|style|textarea|title)$/i,St=i=>(t,...e)=>({_$litType$:i,strings:t,values:e}),c=St(1),as=St(2),ls=St(3),M=Symbol.for("lit-noChange"),d=Symbol.for("lit-nothing"),te=new WeakMap,T=R.createTreeWalker(R,129);function ie(i,t){if(!wt(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return qt!==void 0?qt.createHTML(t):t}var Me=(i,t)=>{let e=i.length-1,s=[],n,r=t===2?"<svg>":t===3?"<math>":"",o=q;for(let a=0;a<e;a++){let l=i[a],m,u,h=-1,_=0;for(;_<l.length&&(o.lastIndex=_,u=o.exec(l),u!==null);)_=o.lastIndex,o===q?u[1]==="!--"?o=Xt:u[1]!==void 0?o=Jt:u[2]!==void 0?(ne.test(u[2])&&(n=RegExp("</"+u[2],"g")),o=P):u[3]!==void 0&&(o=P):o===P?u[0]===">"?(o=n??q,h=-1):u[1]===void 0?h=-2:(h=o.lastIndex-u[2].length,m=u[1],o=u[3]===void 0?P:u[3]==='"'?Yt:Qt):o===Yt||o===Qt?o=P:o===Xt||o===Jt?o=q:(o=P,n=void 0);let y=o===P&&i[a+1].startsWith("/>")?" ":"";r+=o===q?l+Te:h>=0?(s.push(m),l.slice(0,h)+ee+l.slice(h)+F+y):l+F+(h===-2?a:y)}return[ie(i,r+(i[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]},Q=class i{constructor({strings:t,_$litType$:e},s){let n;this.parts=[];let r=0,o=0,a=t.length-1,l=this.parts,[m,u]=Me(t,e);if(this.el=i.createElement(m,s),T.currentNode=this.el.content,e===2||e===3){let h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(n=T.nextNode())!==null&&l.length<a;){if(n.nodeType===1){if(n.hasAttributes())for(let h of n.getAttributeNames())if(h.endsWith(ee)){let _=u[o++],y=n.getAttribute(h).split(F),f=/([.?@])?(.*)/.exec(_);l.push({type:1,index:r,name:f[2],strings:y,ctor:f[1]==="."?yt:f[1]==="?"?_t:f[1]==="@"?$t:I}),n.removeAttribute(h)}else h.startsWith(F)&&(l.push({type:6,index:r}),n.removeAttribute(h));if(ne.test(n.tagName)){let h=n.textContent.split(F),_=h.length-1;if(_>0){n.textContent=at?at.emptyScript:"";for(let y=0;y<_;y++)n.append(h[y],X()),T.nextNode(),l.push({type:2,index:++r});n.append(h[_],X())}}}else if(n.nodeType===8)if(n.data===se)l.push({type:2,index:r});else{let h=-1;for(;(h=n.data.indexOf(F,h+1))!==-1;)l.push({type:7,index:r}),h+=F.length-1}r++}}static createElement(t,e){let s=R.createElement("template");return s.innerHTML=t,s}};function B(i,t,e=i,s){if(t===M)return t;let n=s!==void 0?e._$Co?.[s]:e._$Cl,r=J(t)?void 0:t._$litDirective$;return n?.constructor!==r&&(n?._$AO?.(!1),r===void 0?n=void 0:(n=new r(i),n._$AT(i,e,s)),s!==void 0?(e._$Co??=[])[s]=n:e._$Cl=n),n!==void 0&&(t=B(i,n._$AS(i,t.values),n,s)),t}var bt=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:s}=this._$AD,n=(t?.creationScope??R).importNode(e,!0);T.currentNode=n;let r=T.nextNode(),o=0,a=0,l=s[0];for(;l!==void 0;){if(o===l.index){let m;l.type===2?m=new Y(r,r.nextSibling,this,t):l.type===1?m=new l.ctor(r,l.name,l.strings,this,t):l.type===6&&(m=new xt(r,this,t)),this._$AV.push(m),l=s[++a]}o!==l?.index&&(r=T.nextNode(),o++)}return T.currentNode=R,n}p(t){let e=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}},Y=class i{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,n){this.type=2,this._$AH=d,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=n,this._$Cv=n?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=B(this,t,e),J(t)?t===d||t==null||t===""?(this._$AH!==d&&this._$AR(),this._$AH=d):t!==this._$AH&&t!==M&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Re(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==d&&J(this._$AH)?this._$AA.nextSibling.data=t:this.T(R.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:s}=t,n=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=Q.createElement(ie(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===n)this._$AH.p(e);else{let r=new bt(n,this),o=r.u(this.options);r.p(e),this.T(o),this._$AH=r}}_$AC(t){let e=te.get(t.strings);return e===void 0&&te.set(t.strings,e=new Q(t)),e}k(t){wt(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,s,n=0;for(let r of t)n===e.length?e.push(s=new i(this.O(X()),this.O(X()),this,this.options)):s=e[n],s._$AI(r),n++;n<e.length&&(this._$AR(s&&s._$AB.nextSibling,n),e.length=n)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let s=Zt(t).nextSibling;Zt(t).remove(),t=s}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},I=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,n,r){this.type=1,this._$AH=d,this._$AN=void 0,this.element=t,this.name=e,this._$AM=n,this.options=r,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=d}_$AI(t,e=this,s,n){let r=this.strings,o=!1;if(r===void 0)t=B(this,t,e,0),o=!J(t)||t!==this._$AH&&t!==M,o&&(this._$AH=t);else{let a=t,l,m;for(t=r[0],l=0;l<r.length-1;l++)m=B(this,a[s+l],e,l),m===M&&(m=this._$AH[l]),o||=!J(m)||m!==this._$AH[l],m===d?t=d:t!==d&&(t+=(m??"")+r[l+1]),this._$AH[l]=m}o&&!n&&this.j(t)}j(t){t===d?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},yt=class extends I{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===d?void 0:t}},_t=class extends I{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==d)}},$t=class extends I{constructor(t,e,s,n,r){super(t,e,s,n,r),this.type=5}_$AI(t,e=this){if((t=B(this,t,e,0)??d)===M)return;let s=this._$AH,n=t===d&&s!==d||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,r=t!==d&&(s===d||n);n&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},xt=class{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){B(this,t)}};var ze=vt.litHtmlPolyfillSupport;ze?.(Q,Y),(vt.litHtmlVersions??=[]).push("3.3.3");var re=(i,t,e)=>{let s=e?.renderBefore??t,n=s._$litPart$;if(n===void 0){let r=e?.renderBefore??null;s._$litPart$=n=new Y(t.insertBefore(X(),r),r,void 0,e??{})}return n._$AI(i),n};var At=globalThis,C=class extends k{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=re(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return M}};C._$litElement$=!0,C.finalized=!0,At.litElementHydrateSupport?.({LitElement:C});var Ne=At.litElementPolyfillSupport;Ne?.({LitElement:C});(At.litElementVersions??=[]).push("4.2.2");var v=class extends C{constructor(){super(...arguments);this._config={};this._label=e=>e.label??e.name}static{this.properties={hass:{attribute:!1},_config:{state:!0}}}static{this.styles=K`
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
  `}setConfig(e){this._config={...e}}_fire(e){this._config=e,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0}))}form(e){return c`<ha-form .hass=${this.hass} .data=${this._config} .schema=${e}
      .computeLabel=${this._label}
      @value-changed=${s=>this._fire({...this._config,...s.detail.value})}></ha-form>`}list(e){let s=this._config[e.key]??[],n=r=>this._fire({...this._config,[e.key]:r});return c`
      ${e.title?c`<div class="lt">${e.title}</div>`:d}
      ${s.map((r,o)=>c`<div class="row">
        <ha-form .hass=${this.hass} .data=${r} .schema=${e.rowSchema}
          .computeLabel=${this._label}
          @value-changed=${a=>{let l=[...s];l[o]={...a.detail.value},n(l)}}></ha-form>
        <button class="del" title="Entfernen"
          @click=${()=>n(s.filter((a,l)=>l!==o))}>\u2715</button>
      </div>`)}
      <button class="add" @click=${()=>n([...s,e.newItem()])}>+ ${e.addLabel}</button>`}styleSection(){let e=this._config.style??{},s=[p.text("background","Hintergrund (Farbe, 'a,b' = Gradient oder CSS)"),p.num("opacity","Deckkraft (0\u20131)",0,1,.05),p.bool("glass","Glas-Effekt (Blur)"),p.text("accent","Akzentfarbe"),p.num("radius","Eckenradius (px)",0,40)];return c`<div class="lt">Stil</div>
      <ha-form .hass=${this.hass} .data=${e} .schema=${s}
        .computeLabel=${n=>n.label??n.name}
        @value-changed=${n=>this._fire({...this._config,style:{...n.detail.value}})}></ha-form>`}},p={text:(i,t)=>({name:i,label:t,selector:{text:{}}}),bool:(i,t)=>({name:i,label:t,selector:{boolean:{}}}),num:(i,t,e,s,n)=>({name:i,label:t,selector:{number:{min:e,max:s,step:n,mode:"box"}}}),entity:(i,t,e)=>({name:i,label:t,selector:{entity:e?{domain:e}:{}}}),entities:(i,t,e)=>({name:i,label:t,selector:{entity:{multiple:!0,...e?{domain:e}:{}}}}),select:(i,t,e)=>({name:i,label:t,selector:{select:{mode:"dropdown",options:e}}})};var Be=[p.text("title","Titel"),p.text("subtitle","Untertitel"),p.entity("temperature","Temperatursensor (Pflicht)","sensor"),p.entity("humidity","Feuchtesensor (Pflicht)","sensor"),p.entity("power","Leistungssensor (optional)","sensor"),p.num("leaf_offset","Blatt-Offset (K, z.B. -1.5)",-5,5),p.text("gradient","Gradient (z.B. #E87B2E,#C45A10)"),p.entity("climate_auto","Klima-Automatik (Badge)","input_boolean"),p.entity("maintenance","Wartung (Badge)","input_boolean"),p.entity("dehum_request","Entfeuchter-Anforderung","input_boolean"),p.num("temp_min","Temp-Warnung unter (\xB0C)"),p.num("temp_max","Temp-Warnung \xFCber (\xB0C)"),p.bool("show_vpd_scale","VPD-Skala anzeigen"),p.text("tap_navigation","Navigation bei Tap (z.B. /grow-zelt/gz_mittel)")],Ie=[p.entity("entity","Log-Entity","input_text"),p.select("type","Typ",[{value:"station",label:"Station"},{value:"climate",label:"Klima"}])],Et=class extends v{render(){return c`${this.form(Be)}
      ${this.list({key:"logs",rowSchema:Ie,title:"Logs (Status-Ampel)",addLabel:"Log hinzuf\xFCgen",newItem:()=>({entity:"",type:"station"})})}
      ${this.styleSection()}`}};customElements.define("growctrl-tent-editor",Et);var lt=i=>i===null||isNaN(i)?"\u2013":i<60?`${i} min`:`${Math.floor(i/60)}h ${i%60}min`,Ct=i=>{let t=i.split(" ").pop().substring(0,5).split(":");return parseInt(t[0])*60+parseInt(t[1])},x=(i,t=null)=>{if(i===void 0||["unknown","unavailable",""].includes(i))return t;let e=parseFloat(i);return isNaN(e)?t:e},oe=i=>{let t=Date.parse(i);return isNaN(t)?null:Math.floor((Date.now()-t)/864e5)};var ae=i=>.61078*Math.exp(17.27*i/(i+237.3)),le=(i,t,e=0)=>{let s=i+e;return ae(s)-ae(i)*(t/100)},U=[{max:.4,label:"Zu feucht",color:"#4FC3F7"},{max:.8,label:"Seedling",color:"#7EC8FF"},{max:1.2,label:"Veg",color:"#7EE87E"},{max:1.6,label:"Bloom",color:"#FFB432"},{max:9.9,label:"Zu trocken",color:"#FF6B6B"}],ce=i=>U.find(t=>i<=t.max)??U[U.length-1];var pe=i=>!i||["unknown","unavailable",""].includes(i),de=i=>i.length>=16?i.substring(11,16):"",ct=i=>{if(pe(i))return{level:"none",label:"\u2014",ts:""};let t=i,e=de(t);if(t.includes("SENSOR INVALID"))return{level:"critical",label:"\u{1F6A8} Sensor ung\xFCltig \u2014 Befeuchtung gesperrt",ts:e};if(t.includes("MAINTENANCE"))return{level:"info",label:"\u{1F527} Wartungsmodus aktiv",ts:e};if(t.includes("TESTMODE"))return{level:"info",label:"\u{1F9EA} Testmodus aktiv",ts:e};if(t.includes("AUTO OFF"))return{level:"info",label:"\u{1F534} Klima-Automatik deaktiviert",ts:e};let s=t.match(/(?:IST|SOLL)\s+(?:F|CIRC)=(\w+)/i)?.[1]?.toLowerCase(),n=t.match(/IST\s+(?:CIRC|F)=\w+\s+HUM=(\w+)/i)?.[1]?.toUpperCase(),r=t.match(/REQ=(\w+)/i)?.[1]?.toUpperCase();if(n!==void 0){let o=[];return s==="on"?o.push("Umluft AN"):s==="manual"?o.push("Umluft Manuell"):s==="off"&&o.push("Umluft AUS"),o.push(n==="ON"?"Befeuchtung AN":"Befeuchtung AUS"),o.push(r==="ON"?"Entfeuchtung AN":"Entfeuchtung AUS"),t.includes("ZENTRAL-BLOCK")&&o.push("(Zentral-Block)"),{level:"ok",label:o.join(" \xB7 "),ts:e}}return{level:"ok",label:t.replace(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}\s*/,"").substring(0,45),ts:e}},D=i=>{if(pe(i))return{level:"none",label:"\u2014",ts:""};let t=i,e=de(t);if(t.includes("FAILSAFE LIGHT"))return{level:"critical",label:"\u{1F6A8} Failsafe: Licht-Zwangsabschaltung \u2014 Auto deaktiviert",ts:e};if(t.includes("FAILSAFE PUMP"))return{level:"critical",label:"\u{1F6A8} Failsafe: Pumpen-Zwangsabschaltung \u2014 Auto deaktiviert",ts:e};if(t.includes("TIME INVALID"))return{level:"critical",label:"\u26A0\uFE0F Lichtzeiten nicht konfiguriert",ts:e};if(t.includes("MISMATCH")){let u=y=>t.match(y)?.[1];return{level:"warning",label:"\u26A0\uFE0F Ger\xE4t antwortet nicht: "+([["Licht",u(/IST.*?\bL=(\w+)/i),u(/SOLL.*?\bL=(\w+)/i)],["Pumpe",u(/IST.*?\bP=(\w+)/i),u(/SOLL.*?\bP=(\w+)/i)],["O\u2082",u(/IST.*?\bO2=(\w+)/i),u(/SOLL.*?\bO2=(\w+)/i)]].filter(([,y,f])=>y&&f&&y!==f).map(([y,f,L])=>`${y} (IST ${f.toUpperCase()} / SOLL ${L.toUpperCase()})`).join(", ")||"Abweichung"),ts:e}}if(t.includes("MAINTENANCE"))return{level:"info",label:"\u{1F527} Wartungsmodus aktiv",ts:e};if(t.includes("TESTMODE"))return{level:"info",label:"\u{1F9EA} Testmodus aktiv",ts:e};let s=t.match(/IST.*?\bL=(\w+)/i)?.[1],n=t.match(/IST.*?\bP=(\w+)/i)?.[1],r=t.match(/IST.*?\bO2=(\w+)/i)?.[1],o=t.includes("OVRUNTIL")?" (Override aktiv)":"",a=[s&&s!=="n/a"?s==="on"?"\u{1F4A1} Licht AN":"\u{1F311} Licht AUS":null,n&&n!=="n/a"?n==="on"?"\u{1F4A7} Pumpe AN":"\u23F8\uFE0F Pumpe AUS":null,r&&r!=="n/a"?r==="on"?"\u{1FAE7} O\u2082 AN":"\u{1FAE7} O\u2082 AUS":null].filter(Boolean).join(" \xB7 "),l="";return t.includes("AUTO ON")?l="\u{1F7E2} Auto gestartet":t.includes("AUTO OFF")?l="\u{1F534} Auto gestoppt":t.match(/STAGE\s*\u2192/)?l=`\u{1F331} Phase: ${t.match(/STAGE\s*\u2192\s*(\w+)/)?.[1]??""}`:t.includes("LIGHT \u2192 ON")?l="\u{1F4A1} Licht eingeschaltet":t.includes("LIGHT \u2192 OFF")?l="\u{1F311} Licht ausgeschaltet":t.includes("PUMP \u2192 ON")?l="\u{1F4A7} Pumpe eingeschaltet":t.includes("PUMP \u2192 OFF")?l="\u23F8\uFE0F Pumpe ausgeschaltet":t.includes("O2 \u2192 ON")?l="\u{1FAE7} O\u2082 eingeschaltet":t.includes("FAN \u2192 ON")?l="\u{1F300} L\xFCfter eingeschaltet":t.includes("MANUAL OVERRIDE")?l="\u270B Manuell \xFCbersteuert":t.includes("OVERRIDE END")&&(l="\u2705 Override beendet"),{level:"ok",label:[l,a].filter(Boolean).join(" \u2014 ")+o||t.substring(17,55),ts:e}},ue=i=>i?.match(/IST.*?\bP=(\w+)/i)?.[1]==="on";var he={auto:"input_boolean.hydro_auto_{tent}_{station}",stage:"input_select.hydro_stage_{tent}_{station}",log:"input_text.hydro_log_{tent}_{station}",climate_log:"input_text.hydro_climate_log_{tent}",light_on:"input_datetime.hydro_light_on_{tent}_{station}",light_off_sv:"input_datetime.hydro_light_off_sv_{tent}_{station}",light_off_bloom:"input_datetime.hydro_light_off_bloom_{tent}_{station}",pump_on_seedling:"input_number.hydro_pump_on_seedling_{tent}_{station}",pump_off_seedling:"input_number.hydro_pump_off_seedling_{tent}_{station}",pump_on_veg:"input_number.hydro_pump_on_veg_{tent}_{station}",pump_off_veg:"input_number.hydro_pump_off_veg_{tent}_{station}",pump_on_bloom:"input_number.hydro_pump_on_bloom_{tent}_{station}",pump_off_bloom:"input_number.hydro_pump_off_bloom_{tent}_{station}",light_rest:"sensor.{tent}_{station}_licht_restzeit",pump_rest:"sensor.{tent}_{station}_pumpe_restzeit",maintenance:"input_boolean.hydro_maintenance_{tent}",testmode:"input_boolean.hydro_testmode_{tent}",climate_auto:"input_boolean.hydro_climate_auto_{tent}",dehum_request:"input_boolean.hydro_dehum_request_{tent}"},Ue=(i,t)=>i.replaceAll("{tent}",t.tent).replaceAll("{station}",t.station),ge=(i,t)=>{let e={};return Object.keys(he).forEach(s=>{let n=t.overrides?.[s];if(n){e[s]=n;return}let r=t.templates?.[s]??he[s],o=Ue(r,t);i.states[o]&&(e[s]=o)}),e};var me=new Map,fe=new Map;async function be(i,t,e=24,s=48){let n=`${t}:${e}`,r=me.get(n);if(r&&Date.now()-r.t<5*6e4)return r.data;try{let o=new Date(Date.now()-e*36e5).toISOString(),l=((await i.callApi("GET",`history/period/${o}?filter_entity_id=${t}&minimal_response&no_attributes`))?.[0]??[]).map(h=>parseFloat(h.state??h.s)).filter(h=>!isNaN(h)),m=Math.max(1,Math.floor(l.length/s)),u=l.filter((h,_)=>_%m===0);return me.set(n,{t:Date.now(),data:u}),u}catch{return r?.data??[]}}async function ye(i,t,e=14){let s=fe.get(t);if(s&&Date.now()-s.t<10*6e4)return s.data;try{let n=new Date().toISOString(),r=new Date(Date.now()+e*864e5).toISOString(),o=await i.callApi("GET",`calendars/${t}?start=${n}&end=${r}`);return fe.set(t,{t:Date.now(),data:o??[]}),o??[]}catch{return s?.data??[]}}var _e=(i,t=100,e=24)=>{if(i.length<2)return"";let s=Math.min(...i),n=Math.max(...i),r=n-s||1;return i.map((o,a)=>`${a===0?"M":"L"}${(a/(i.length-1)*t).toFixed(1)},${(e-(o-s)/r*e).toFixed(1)}`).join(" ")};var b={label:"rgba(255,255,255,0.55)",value:"rgba(255,255,255,0.97)",muted:"rgba(255,255,255,0.45)",logLabel:"rgba(255,255,255,0.70)",logText:"rgba(255,255,255,0.88)",ok:"#4DFFC3",warn:"#FFD166",crit:"#FF6B6B",info:"#7EC8FF",tileBg:"rgba(255,255,255,0.045)",rowBg:"rgba(255,255,255,0.04)"},H={critical:"rgba(255,107,107,.16)",warning:"rgba(255,209,102,.14)",info:"rgba(126,200,255,.10)",ok:b.rowBg,none:"rgba(255,255,255,.025)"},W={critical:b.crit,warning:b.warn,info:b.info,ok:b.logText,none:"rgba(255,255,255,.35)"},kt={Seedling:{bg:"rgba(126,200,255,0.16)",color:"#7EC8FF"},Veg:{bg:"rgba(126,232,126,0.16)",color:"#7EE87E"},Bloom:{bg:"rgba(255,180,50,0.18)",color:"#FFB432"},Flush:{bg:"rgba(255,180,50,0.18)",color:"#FFB432"}},w=i=>{let t=[];if(i?.background){let e=i.background.trim(),s=e.includes(",")&&!/^(linear|radial|conic|rgb|hsl)/i.test(e)?`linear-gradient(160deg, ${e})`:e;t.push(`--gc-bg:${s}`)}return i?.opacity!==void 0&&t.push(`--gc-opacity:${i.opacity}`),i?.accent&&t.push(`--gc-accent:${i.accent}`),i?.radius!==void 0&&t.push(`--gc-radius:${i.radius}px`),t.join(";")},pt=i=>i.includes("critical")?"critical":i.includes("warning")?"warning":i.includes("info")?"info":"ok",S=K`
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
`,Lt={ok:{bg:"rgba(77,255,195,.14)",color:b.ok,label:"Alles OK"},info:{bg:"rgba(126,200,255,.14)",color:b.info,label:"Info"},warning:{bg:"rgba(255,209,102,.16)",color:b.warn,label:"Warnung"},critical:{bg:"rgba(255,107,107,.18)",color:b.crit,label:"Fehler"}};var $=class extends C{constructor(){super(...arguments);this._config={};this._confirm=null}static{this.properties={hass:{attribute:!1},_config:{state:!0},_confirm:{state:!0}}}setConfig(e){this.validateConfig(e),this._config=e}validateConfig(e){}getCardSize(){return 4}st(e){return e?this.hass?.states[e]?.state:void 0}isOn(e){return this.st(e)==="on"}friendly(e){return e&&this.hass?.states[e]?.attributes?.friendly_name||e||""}unit(e){return e&&this.hass?.states[e]?.attributes?.unit_of_measurement||""}moreInfo(e){this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:e},bubbles:!0,composed:!0}))}navigate(e){history.pushState(null,"",e),window.dispatchEvent(new CustomEvent("location-changed"))}toggle(e){let s=e.split(".")[0],n=["switch","input_boolean","light","fan"].includes(s)?s:"homeassistant";this.hass.callService(n,"toggle",{entity_id:e})}confirmToggle(e,s){this._confirm={text:`${s} wirklich schalten?`,action:()=>this.toggle(e)}}renderConfirm(){return this._confirm?c`<div style="position:absolute;inset:0;background:rgba(0,0,0,.6);border-radius:16px;
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
    </div>`:d}};var Ft=class extends ${static{this.styles=S}validateConfig(t){if(!t.temperature||!t.humidity)throw new Error("growctrl-tent-card: 'temperature' und 'humidity' sind Pflicht.")}static getConfigElement(){return document.createElement("growctrl-tent-editor")}static getStubConfig(){return{temperature:"sensor.zelt_temperature",humidity:"sensor.zelt_humidity",title:"Mein Zelt"}}render(){let t=this._config;if(!this.hass)return d;let e=x(this.st(t.temperature)),s=x(this.st(t.humidity)),n=t.power?x(this.st(t.power)):null,r=e!==null&&s!==null?le(e,s,t.leaf_offset??0):null,o=r!==null?ce(r):null,a=(t.logs??[]).map(f=>(f.type==="climate"?ct:D)(this.st(f.entity))),l=pt(a.map(f=>f.level)),m=Lt[l].label;l==="ok"&&(this.isOn(t.dehum_request)?(l="warning",m="Dehum AN"):e!==null&&(e<(t.temp_min??18)||e>(t.temp_max??30))&&(l="warning",m="Temp!"));let u=Lt[l],h=t.style??(t.gradient?{background:t.gradient}:void 0),_=2,y=r!==null?Math.min(100,Math.max(0,r/_*100)):null;return c`<div class="card ${h?.glass?"glass":""} ${t.tap_navigation?"clickable":""}"
        data-level=${l} style=${w(h)}
        @click=${()=>t.tap_navigation&&this.navigate(t.tap_navigation)}>
      <div class="hdr">
        <div>
          <div class="title">${t.title??"Zelt"}</div>
          ${t.subtitle?c`<div class="subtitle">${t.subtitle}</div>`:d}
        </div>
        <div class="badges">
          ${this.isOn(t.climate_auto)?c`<span class="badge">\u2699 Klima</span>`:d}
          ${this.isOn(t.maintenance)?c`<span class="badge warn">\u{1F527} Wartung</span>`:d}
          <span class="status-pill" style="background:${u.bg};color:${u.color}">
            <span class="dot" style="background:${u.color}"></span>${m}</span>
        </div>
      </div>
      <div class="grid" style="grid-template-columns:1fr 1fr 1fr;margin-top:14px">
        <div class="tile"><div class="lbl">Temperatur</div>
          <div class="val">${e!==null?e.toFixed(1):"--"}<span class="unit">\u00b0C</span></div></div>
        <div class="tile"><div class="lbl">Luftfeuchte</div>
          <div class="val">${s!==null?Math.round(s):"--"}<span class="unit">%</span></div></div>
        <div class="tile"><div class="lbl">VPD</div>
          <div class="val" style=${o?`color:${o.color}`:""}>${r!==null?r.toFixed(2):"--"}<span class="unit">kPa</span></div></div>
      </div>
      ${t.show_vpd_scale!==!1&&y!==null?c`
        <div style="margin-top:10px">
          <div style="position:relative;height:8px;border-radius:4px;overflow:visible;display:flex">
            ${U.map((f,L)=>{let z=L===0?0:Math.min(U[L-1].max,_),tt=Math.max(0,(Math.min(f.max,_)-z)/_*100),et=L===0,st=f.max>=_;return c`<div style="width:${tt}%;background:${f.color};opacity:.5;
                ${et?"border-radius:4px 0 0 4px;":""}${st?"border-radius:0 4px 4px 0;":""}"></div>`})}
            <div style="position:absolute;left:${y}%;top:-3px;width:3px;height:14px;background:#fff;
              border-radius:2px;transform:translateX(-50%);box-shadow:0 0 6px rgba(255,255,255,.8)"></div>
          </div>
          <div style="display:flex;justify-content:space-between;font-size:10px;color:${b.muted};margin-top:4px">
            <span>${o.label}${t.leaf_offset?` \xB7 Blatt ${t.leaf_offset>0?"+":""}${t.leaf_offset}K`:""}</span>
            ${n!==null?c`<span style="font-weight:700;color:rgba(255,255,255,.7)">\u26A1 ${Math.round(n)} W</span>`:d}
          </div>
        </div>`:n!==null?c`<div style="font-size:11px;font-weight:700;color:rgba(255,255,255,.7);margin-top:8px">\u26A1 ${Math.round(n)} W</div>`:d}
      ${a.length?c`<div class="seclbl">Letzte Ereignisse</div>
        ${a.map(f=>c`<div class="logrow" style="background:${H[f.level]};margin-top:4px">
          <span class="txt" style="color:${W[f.level]}">${f.label}</span>
          ${f.ts?c`<span class="ts">${f.ts}</span>`:d}
        </div>`)}`:d}
    </div>`}};customElements.define("growctrl-tent-card",Ft);var De=[p.text("name","Anzeigename"),p.select("system","Systemtyp",[{value:"generic",label:"Generisch"},{value:"dwc",label:"DWC (Wasserkultur)"},{value:"soil",label:"Erde"}]),p.text("tent","Zelt (Profil, z.B. mittel)"),p.text("station_id","Station (Profil, z.B. main1)"),p.entity("light_switch","Licht-Switch (Hardware, Pflicht)","switch"),p.entity("pump_switch","Pumpen-Switch (optional)","switch"),p.entity("o2_switch","O\u2082-Switch (optional)","switch"),p.entity("fan_switch","Umluft-Switch (optional)","switch"),p.bool("show_stage_chips","Phasen-Chips anzeigen"),p.bool("show_settings","Konfigurations-Kacheln anzeigen")],Ot=class extends v{constructor(){super(...arguments);this._origStation={}}setConfig(e){let s=e.station??{};this._origStation=s,this._config={...e,tent:s.tent??"",station_id:s.station??"",light_switch:s.light_switch,pump_switch:s.pump_switch,o2_switch:s.o2_switch,fan_switch:s.fan_switch}}_fire(e){let{tent:s,station_id:n,light_switch:r,pump_switch:o,o2_switch:a,fan_switch:l,...m}=e,u=this._origStation,h={...m,station:{...u,tent:s??"",station:n??"",light_switch:r,pump_switch:o,o2_switch:a,fan_switch:l}};this._config=e,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:h},bubbles:!0,composed:!0}))}range(e,s,n){let r=(this._config[e]??{})[s]??{},o=[p.entity("entity",n,"sensor"),p.num("min","Min"),p.num("max","Max")];return c`<div class="row"><ha-form .hass=${this.hass} .data=${r} .schema=${o}
      .computeLabel=${a=>a.label??a.name}
      @value-changed=${a=>{let l={...this._config[e]??{},[s]:{...a.detail.value}};this._fire({...this._config,[e]:l})}}></ha-form></div>`}render(){let e=this._config.system??"generic";return c`${this.form(De)}
      ${e==="dwc"?c`<div class="lt">DWC-Wasserwerte (Ampel bei Sollbereich-Verletzung)</div>
        ${this.range("dwc","ec","EC-Sensor")}
        ${this.range("dwc","ph","pH-Sensor")}
        ${this.range("dwc","water_temp","Wassertemperatur-Sensor")}
        ${this.range("dwc","level","F\xFCllstand-Sensor")}`:d}
      ${e==="soil"?c`<div class="lt">Erde-Bodenwerte (Ampel bei Sollbereich-Verletzung)</div>
        ${this.range("soil","moisture","Bodenfeuchte-Sensor")}
        ${this.range("soil","soil_temp","Bodentemperatur-Sensor")}
        ${this.range("soil","ec","EC-Sensor")}
        ${this.range("soil","ph","pH-Sensor")}`:d}
      ${this.styleSection()}
      <div class="hint">Erweitert (nur YAML): <code>station.overrides</code> /
        <code>station.templates</code> zum \u00dcberschreiben einzelner Rollen bzw. des Namensschemas.</div>`}};customElements.define("growctrl-station-editor",Ot);var He=["Seedling","Veg","Bloom","Flush"],We=[["ec","EC","mS/cm"],["ph","pH",""],["water_temp","Wasser","\xB0C"],["level","F\xFCllstand","%"]],Ve=[["moisture","Bodenfeuchte","%"],["soil_temp","Bodentemp","\xB0C"],["ec","EC Boden","mS/cm"],["ph","pH Boden",""]],Pt=class extends ${constructor(){super(...arguments);this._open=!1}static{this.styles=S}static{this.properties={...$.properties,_open:{state:!0}}}validateConfig(e){if(!e.station?.tent||!e.station?.station)throw new Error("growctrl-station-card: 'station: { tent, station }' ist Pflicht.")}static getConfigElement(){return document.createElement("growctrl-station-editor")}static getStubConfig(){return{station:{tent:"mittel",station:"main1",light_switch:"switch.licht"}}}rangeColor(e,s){return e===null?"rgba(255,255,255,.35)":s.min!==void 0&&e<s.min?b.crit:s.max!==void 0&&e>s.max?b.crit:b.ok}rangeBad(e,s){return e!==null&&(s.min!==void 0&&e<s.min||s.max!==void 0&&e>s.max)}render(){let e=this._config;if(!this.hass)return d;let s=e.station,n=ge(this.hass,s),r=g=>n[g],o=this.st(r("stage"))??"",a=this.isOn(r("auto")),l=s.light_switch?this.isOn(s.light_switch):!1,m=this.st(r("log")),u=x(this.st(r("light_rest"))),h=x(this.st(r("pump_rest"))),_=this.st(r("light_on"))??"",y=o==="Bloom"||o==="Flush"?this.st(r("light_off_bloom"))??"":this.st(r("light_off_sv"))??"",f=(y?Ct(y):0)-(_?Ct(_):0);f<=0&&(f+=24*60);let L=24*60-f,z=o==="Seedling"?"seedling":o==="Veg"?"veg":"bloom",tt=x(this.st(r(`pump_on_${z}`)),10),et=x(this.st(r(`pump_off_${z}`)),15),st=tt+et,$e=ue(m),xe=u!==null&&f>0?Math.min(100,Math.round(u/f*100)):0,ve=u!==null&&L>0?Math.min(100,Math.round(u/L*100)):0,we=h!==null&&st>0?Math.min(100,Math.round(h/st*100)):0,Dt=kt[o]??{bg:"rgba(255,255,255,0.08)",color:"rgba(255,255,255,0.5)"},O=D(m),nt=(e.system==="dwc"?We.filter(([g])=>e.dwc?.[g]?.entity).map(([g,A,E])=>[g,A,E,e.dwc[g]]):e.system==="soil"?Ve.filter(([g])=>e.soil?.[g]?.entity).map(([g,A,E])=>[g,A,E,e.soil[g]]):[]).map(([g,A,E,N])=>{let G=x(this.st(N.entity));return{key:g,label:A,unit:E,v:G,color:this.rangeColor(G,N),bad:this.rangeBad(G,N),entity:N.entity}}),dt=O.level==="none"?"ok":O.level;nt.some(g=>g.bad)&&dt!=="critical"&&(dt="warning");let V=(g,A,E,N,G,Se=!1)=>c`
      <div class="barrow">
        <span class="ico" style=${Se?"opacity:.25":""}>${g}</span>
        <div class="track"><div class="fill" style="background:${A};width:${E}%"></div></div>
        <span class="time" style="color:${G}">${N}</span>
      </div>`,ut=[{eid:r("light_on"),name:"Licht AN",val:(this.st(r("light_on"))??"").substring(0,5)},{eid:r(o==="Bloom"||o==="Flush"?"light_off_bloom":"light_off_sv"),name:"Licht AUS",val:(y??"").substring(0,5)},{eid:r(`pump_on_${z}`),name:"Pumpe AN",val:`${tt} min`},{eid:r(`pump_off_${z}`),name:"Pumpe AUS",val:`${et} min`}].filter(g=>g.eid);return c`<div class="card ${e.style?.glass?"glass":""}" data-level=${dt}
        style="${w(e.style)};position:relative">
      <div class="hdr">
        <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
          <span class="title" style="font-size:15px">${e.name??`${s.tent} \xB7 ${s.station}`}</span>
          <span class="stagebadge" style="background:${Dt.bg};color:${Dt.color}">${o||"\u2013"}</span>
          ${e.system&&e.system!=="generic"?c`<span class="badge" style="font-size:9px">${e.system==="dwc"?"DWC":"Erde"}</span>`:d}
        </div>
        <div style="display:flex;align-items:center;gap:8px">
          <span style="width:9px;height:9px;border-radius:50%;flex-shrink:0;
            background:${l?"#FFD700":a?"#8B9FC4":"rgba(255,255,255,.18)"};
            ${l?"box-shadow:0 0 8px #FFD700aa":""}"></span>
          <span style="font-size:11px;font-weight:700;color:${l?"rgba(255,255,255,.9)":a?"#B0BED4":"rgba(255,255,255,.3)"}">
            ${l?"Licht AN":a?"Nacht":"Inaktiv"}</span>
          ${r("auto")?c`<button class="gc stagebadge"
              style="background:${a?"rgba(77,255,195,.14)":"rgba(255,107,107,.14)"};
                border:1px solid ${a?"rgba(77,255,195,.3)":"rgba(255,107,107,.3)"};
                color:${a?"#4DFFC3":"#FF6B6B"}"
              @click=${()=>this.toggle(r("auto"))}>Auto ${a?"AN":"AUS"}</button>`:d}
        </div>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;margin-top:12px">
        ${l?V("\u{1F4A1}","linear-gradient(90deg,#FFD700,#FFA500)",xe,lt(u),b.muted):a?V("\u{1F319}","linear-gradient(90deg,#8B9FC4,#5B6F96)",ve,`AN in ${lt(u)}`,b.label):V("\u{1F4A1}","transparent",0,"\u2013","rgba(255,255,255,.25)",!0)}
        ${$e?V("\u{1F4A7}","linear-gradient(90deg,#4FC3F7,#0288D1)",we,lt(h),b.muted):V("\u{1F4A7}","transparent",0,"\u2013","rgba(255,255,255,.25)",!0)}
      </div>
      ${nt.length?c`
        <div class="grid" style="grid-template-columns:repeat(${Math.min(4,nt.length)},1fr)">
          ${nt.map(g=>c`<button class="gc tile" style="text-align:left;padding:9px 11px;
              ${g.bad?"border-color:rgba(255,107,107,.45);background:rgba(255,107,107,.08)":""}"
            @click=${()=>this.moreInfo(g.entity)}>
            <div class="lbl">${g.label}</div>
            <div class="val sm" style="color:${g.color}">${g.v!==null?g.v:"--"}<span class="unit">${g.unit}</span></div>
          </button>`)}
        </div>`:d}
      ${e.show_stage_chips!==!1&&r("stage")?c`
        <div style="display:flex;gap:6px;margin-top:10px">
          ${He.map(g=>{let A=kt[g],E=o===g;return c`<button class="gc" style="flex:1;text-align:center;padding:9px 4px;border-radius:12px;
                font-size:11px;font-weight:700;transition:all .15s;
                background:${E?A.bg:"rgba(255,255,255,.04)"};
                border:1px solid ${E?A.color:"rgba(255,255,255,.1)"};
                color:${E?A.color:"rgba(255,255,255,.45)"}"
              @click=${()=>this.hass.callService("input_select","select_option",{entity_id:r("stage"),option:g})}>${g}</button>`})}
        </div>`:d}
      ${e.show_settings!==!1&&ut.length?c`
        <button class="gc seclbl" style="display:block;width:100%;text-align:left"
          @click=${()=>{this._open=!this._open}}>Konfiguration ${this._open?"\u25B4":"\u25BE"}</button>
        ${this._open?c`<div class="grid" style="grid-template-columns:repeat(${Math.min(4,ut.length)},1fr);margin-top:0">
          ${ut.map(g=>c`<button class="gc tile" style="text-align:left;padding:9px 11px"
              @click=${()=>this.moreInfo(g.eid)}>
            <div class="lbl">${g.name}</div><div class="val sm">${g.val||"\u2013"}</div></button>`)}
        </div>`:d}`:d}
      <div class="logrow" style="background:${H[O.level]};margin-top:10px">
        <span class="txt" style="color:${W[O.level]}">${O.label}</span>
        ${O.ts?c`<span class="ts">${O.ts}</span>`:d}
      </div>
      ${this.renderConfirm()}
    </div>`}};customElements.define("growctrl-station-card",Pt);var Ge=[p.text("title","Titel"),p.num("columns","Spalten",1,6)],je=[p.entity("entity","Aktor",["switch","input_boolean","light","fan"]),p.text("name","Name (optional)"),p.text("group","Gruppe (optional, z.B. Zelt / Pflanzen)"),p.bool("confirm","Mit Best\xE4tigung schalten")],Tt=class extends v{render(){return c`${this.form(Ge)}
      ${this.list({key:"controls",rowSchema:je,title:"Aktoren",addLabel:"Aktor hinzuf\xFCgen",newItem:()=>({entity:""})})}
      ${this.styleSection()}`}};customElements.define("growctrl-controls-editor",Tt);var Rt=class extends ${static{this.styles=S}validateConfig(t){if(!Array.isArray(t.controls)||!t.controls.length)throw new Error("growctrl-controls-card: 'controls' (min. 1 Eintrag) ist Pflicht.")}static getConfigElement(){return document.createElement("growctrl-controls-editor")}static getStubConfig(){return{controls:[{entity:"switch.beispiel"}]}}render(){let t=this._config;if(!this.hass)return d;let e=new Map;t.controls.forEach(n=>{let r=n.group??"";e.has(r)||e.set(r,[]),e.get(r).push(n)});let s=t.columns??2;return c`<div class="card ${t.style?.glass?"glass":""}" style="${w(t.style)};position:relative">
      ${t.title?c`<div class="title" style="font-size:15px">${t.title}</div>`:d}
      ${[...e.entries()].map(([n,r])=>c`
        ${n?c`<div class="seclbl">${n}</div>`:d}
        <div class="grid" style="grid-template-columns:repeat(${s},1fr);margin-top:${n?0:10}px">
          ${r.map(o=>{let a=this.isOn(o.entity),l=o.name??this.friendly(o.entity),m=this.hass.states[o.entity],u=o.icon??m?.attributes?.icon;return c`<button class="gc tile" style="display:flex;align-items:center;gap:11px;padding:12px 13px;
                background:${a?"rgba(77,255,195,.10)":"rgba(255,255,255,.045)"};
                border:1px solid ${a?"rgba(77,255,195,.3)":"rgba(255,255,255,.07)"}"
              @click=${()=>o.confirm?this.confirmToggle(o.entity,l):this.toggle(o.entity)}>
              <span style="width:34px;height:34px;border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;
                  background:${a?"rgba(77,255,195,.16)":"rgba(255,255,255,.06)"};color:${a?"#4DFFC3":"rgba(255,255,255,.5)"}">
                ${u?c`<ha-icon .icon=${u} style="--mdc-icon-size:19px"></ha-icon>`:c`\u23FB`}
              </span>
              <span style="flex:1;min-width:0;text-align:left">
                <span style="display:block;font-size:12px;font-weight:700;color:rgba(255,255,255,.9);
                  white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${l}${o.confirm?" \u{1F512}":""}</span>
                <span style="display:block;font-size:10px;font-weight:600;color:${a?"#4DFFC3":"rgba(255,255,255,.4)"}">${a?"AN":"AUS"}</span>
              </span>
              <span style="width:34px;height:19px;border-radius:10px;flex-shrink:0;position:relative;transition:background .2s;
                  background:${a?"rgba(77,255,195,.5)":"rgba(255,255,255,.14)"}">
                <span style="position:absolute;top:2.5px;width:14px;height:14px;border-radius:50%;background:#fff;
                  transition:left .2s;left:${a?"17.5px":"2.5px"}"></span>
              </span>
            </button>`})}
        </div>`)}
      ${this.renderConfirm()}
    </div>`}};customElements.define("growctrl-controls-card",Rt);var Ke=[p.text("title","Titel"),p.num("columns","Spalten",1,6),p.num("sparkline_hours","Sparkline-Zeitraum (h)",1,168)],Ze=[p.entity("entity","Sensor","sensor"),p.text("name","Name (optional)"),p.num("min","Sollbereich Min (optional)"),p.num("max","Sollbereich Max (optional)")],Mt=class extends v{render(){return c`${this.form(Ke)}
      ${this.list({key:"sensors",rowSchema:Ze,title:"Sensoren",addLabel:"Sensor hinzuf\xFCgen",newItem:()=>({entity:""})})}
      ${this.styleSection()}`}};customElements.define("growctrl-sensors-editor",Mt);var zt=class extends ${constructor(){super(...arguments);this._hist={}}static{this.styles=S}static{this.properties={...$.properties,_hist:{state:!0}}}validateConfig(e){if(!Array.isArray(e.sensors)||!e.sensors.length)throw new Error("growctrl-sensors-card: 'sensors' (min. 1 Eintrag) ist Pflicht.")}static getConfigElement(){return document.createElement("growctrl-sensors-editor")}static getStubConfig(){return{sensors:[{entity:"sensor.beispiel"}]}}connectedCallback(){super.connectedCallback(),this._load(),this._timer=window.setInterval(()=>this._load(),5*6e4)}disconnectedCallback(){super.disconnectedCallback(),this._timer&&clearInterval(this._timer)}async _load(){if(!this.hass){setTimeout(()=>this._load(),1e3);return}let e=this._config,s={};for(let n of e.sensors)s[n.entity]=await be(this.hass,n.entity,e.sparkline_hours??24);this._hist=s}bad(e,s){return e!==null&&(s.min!==void 0&&e<s.min||s.max!==void 0&&e>s.max)}render(){let e=this._config;if(!this.hass)return d;let s=e.columns??2,n=e.sensors.some(r=>this.bad(x(this.st(r.entity)),r));return c`<div class="card ${e.style?.glass?"glass":""}" data-level=${n?"warning":"ok"}
        style=${w(e.style)}>
      ${e.title?c`<div class="title" style="font-size:15px;margin-bottom:2px">${e.title}</div>`:d}
      <div class="grid" style="grid-template-columns:repeat(${s},1fr)">
        ${e.sensors.map(r=>{let o=x(this.st(r.entity)),a=this.bad(o,r),l=_e(this._hist[r.entity]??[],100,26),m=r.name??this.friendly(r.entity);return c`<button class="gc tile" style="text-align:left;position:relative;overflow:hidden;
              ${a?"border-color:rgba(255,107,107,.45);background:rgba(255,107,107,.08)":""}"
            @click=${()=>this.moreInfo(r.entity)}>
            ${l?c`<svg viewBox="0 0 100 26" preserveAspectRatio="none"
              style="position:absolute;left:0;right:0;bottom:0;width:100%;height:30px;opacity:.5">
              <path d="${l} L100,26 L0,26 Z" fill="${a?"rgba(255,107,107,.25)":"rgba(77,255,195,.18)"}"/>
              <path d="${l}" fill="none" stroke="${a?b.crit:"rgba(77,255,195,.8)"}" stroke-width="1.4"/>
            </svg>`:d}
            <div class="lbl" style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${m}</div>
            <div class="val" style="font-size:22px;${a?`color:${b.crit}`:""}">${o!==null?o:"--"}<span class="unit">${this.unit(r.entity)}</span></div>
            <div style="height:14px"></div>
          </button>`})}
      </div>
    </div>`}};customElements.define("growctrl-sensors-card",zt);var qe=[p.text("title","Titel"),p.num("columns","Spalten",1,4),p.entity("calendar","Kalender (optional)","calendar")],Xe=[p.text("name","Pflanzenname"),p.text("strain","Sorte (optional)"),p.entity("germination_helper","Keimdatum-Helper (optional)",["input_datetime","date","datetime"]),p.entities("sensors","Sensoren der Pflanze (optional)","sensor")],Nt=class extends v{render(){return c`${this.form(qe)}
      ${this.list({key:"plants",rowSchema:Xe,title:"Pflanzen",addLabel:"Pflanze hinzuf\xFCgen",newItem:()=>({name:"Pflanze"})})}
      ${this.styleSection()}`}};customElements.define("growctrl-plants-editor",Nt);var Bt=class extends ${constructor(){super(...arguments);this._events=[]}static{this.styles=S}static{this.properties={...$.properties,_events:{state:!0}}}validateConfig(e){if(!Array.isArray(e.plants)||!e.plants.length)throw new Error("growctrl-plants-card: 'plants' (min. 1 Eintrag) ist Pflicht.")}static getConfigElement(){return document.createElement("growctrl-plants-editor")}static getStubConfig(){return{plants:[{name:"Pflanze 1"}]}}connectedCallback(){super.connectedCallback(),this._load(),this._timer=window.setInterval(()=>this._load(),10*6e4)}disconnectedCallback(){super.disconnectedCallback(),this._timer&&clearInterval(this._timer)}async _load(){let e=this._config;if(e.calendar){if(!this.hass){setTimeout(()=>this._load(),1e3);return}this._events=(await ye(this.hass,e.calendar)).slice(0,3)}}render(){let e=this._config;return this.hass?c`<div class="card ${e.style?.glass?"glass":""}" style=${w(e.style)}>
      ${e.title?c`<div class="title" style="font-size:15px">${e.title}</div>`:d}
      <div class="grid" style="grid-template-columns:repeat(${e.columns??2},1fr)">
        ${e.plants.map(s=>{let n=s.germination_helper?this.st(s.germination_helper):void 0,r=n?oe(n):null;return c`<div class="tile">
            <div style="display:flex;align-items:baseline;gap:6px;flex-wrap:wrap">
              <span style="font-size:13px;font-weight:800">\u{1F331} ${s.name}</span>
              ${s.strain?c`<span style="font-size:10px;color:rgba(255,255,255,.55)">${s.strain}</span>`:d}
            </div>
            ${r!==null?c`<div class="lbl" style="margin-top:4px">Tag ${r}</div>`:d}
            ${(s.sensors??[]).map(o=>{let a=typeof o=="string"?{entity:o}:o;return c`
              <button class="gc" style="display:flex;justify-content:space-between;width:100%;font-size:11px;margin-top:4px;color:rgba(255,255,255,.75)"
                @click=${()=>this.moreInfo(a.entity)}>
                <span>${a.name??this.friendly(a.entity)}</span>
                <span style="font-weight:700">${x(this.st(a.entity))??"--"} ${this.unit(a.entity)}</span>
              </button>`})}
          </div>`})}
      </div>
      ${e.calendar?c`<div class="seclbl">Anstehend</div>
        ${this._events.length?this._events.map(s=>c`
          <div class="logrow" style="background:rgba(0,0,0,.18);margin-top:4px">
            <span class="txt">${s.summary}</span>
            <span class="ts">${(s.start?.date??s.start?.dateTime??"").substring(0,10)}</span>
          </div>`):c`<div class="logrow" style="background:rgba(0,0,0,.12)"><span class="txt" style="color:rgba(255,255,255,.35)">Keine Ereignisse</span></div>`}`:d}
    </div>`:d}};customElements.define("growctrl-plants-card",Bt);var Je=[p.text("title","Titel")],Qe=[p.entity("entity","Log-Entity","input_text"),p.text("name","Label (optional)"),p.select("type","Typ",[{value:"station",label:"Station"},{value:"climate",label:"Klima"}])],Ye=[p.entity("entity","Schalter",["input_boolean","switch"]),p.text("name","Name (optional)")],It=class extends v{render(){let t=this._config.expert??{},e=n=>this._fire({...this._config,expert:{...t,...n}}),s=t.controls??[];return c`${this.form(Je)}
      ${this.list({key:"logs",rowSchema:Qe,title:"Logs",addLabel:"Log hinzuf\xFCgen",newItem:()=>({entity:"",type:"station"})})}
      <div class="lt">Experten-Bereich</div>
      <ha-form .hass=${this.hass} .data=${{show_raw:t.show_raw!==!1}}
        .schema=${[p.bool("show_raw","Roh-Logs anzeigen")]}
        .computeLabel=${n=>n.label??n.name}
        @value-changed=${n=>e({show_raw:n.detail.value.show_raw})}></ha-form>
      ${s.map((n,r)=>c`<div class="row">
        <ha-form .hass=${this.hass} .data=${n} .schema=${Ye}
          .computeLabel=${o=>o.label??o.name}
          @value-changed=${o=>{let a=[...s];a[r]={...o.detail.value},e({controls:a})}}></ha-form>
        <button class="del" @click=${()=>e({controls:s.filter((o,a)=>a!==r)})}>\u2715</button>
      </div>`)}
      <button class="add" @click=${()=>e({controls:[...s,{entity:""}]})}>+ Experten-Schalter</button>
      ${this.styleSection()}`}};customElements.define("growctrl-status-editor",It);var Ut=class extends ${constructor(){super(...arguments);this._expert=!1}static{this.styles=S}static{this.properties={...$.properties,_expert:{state:!0}}}validateConfig(e){if(!Array.isArray(e.logs)||!e.logs.length)throw new Error("growctrl-status-card: 'logs' (min. 1 Eintrag) ist Pflicht.")}static getConfigElement(){return document.createElement("growctrl-status-editor")}static getStubConfig(){return{logs:[{entity:"input_text.hydro_log_mittel_main1"}]}}render(){let e=this._config;if(!this.hass)return d;let s=e.logs.map(o=>({l:o,r:(o.type==="climate"?ct:D)(this.st(o.entity))})),n=s.map(o=>o.r.level),r={label:"\u2713 Alles OK",color:b.ok};return n.includes("critical")?r={label:"\u{1F6A8} Fehler",color:b.crit}:n.includes("warning")?r={label:"\u26A0\uFE0F Warnung",color:b.warn}:n.includes("info")&&(r={label:"\u2139\uFE0F Info",color:b.info}),c`<div class="card ${e.style?.glass?"glass":""}" data-level=${pt(n)} style="${w(e.style)};position:relative">
      <div class="hdr" style="align-items:center">
        <div class="title" style="font-size:15px">${e.title??"Status"}</div>
        <span class="stagebadge" style="background:rgba(0,0,0,.25);color:${r.color}">${r.label}</span>
      </div>
      ${s.map(({l:o,r:a})=>c`
        <div class="logrow" style="background:${H[a.level]};margin-top:6px">
          ${o.name?c`<span style="font-size:11px;font-weight:700;color:${b.logLabel};min-width:42px;flex-shrink:0">${o.name}</span>`:d}
          <span class="txt" style="color:${W[a.level]}">${a.label}</span>
          ${a.ts?c`<span class="ts">${a.ts}</span>`:d}
        </div>`)}
      ${e.expert?c`
        <button class="gc seclbl" style="display:block;width:100%;text-align:left"
          @click=${()=>{this._expert=!this._expert}}>Experte ${this._expert?"\u25B2":"\u25BC"}</button>
        ${this._expert?c`
          ${(e.expert.controls??[]).length?c`<div class="grid" style="grid-template-columns:repeat(2,1fr)">
            ${e.expert.controls.map(o=>{let a=this.isOn(o.entity),l=o.name??this.friendly(o.entity);return c`<button class="gc tile" style="text-align:left;
                  background:${a?"rgba(255,165,0,.18)":"rgba(0,0,0,.18)"};
                  border:1px solid ${a?"rgba(255,165,0,.38)":"rgba(255,165,0,.15)"}"
                @click=${()=>this.confirmToggle(o.entity,l)}>
                <div class="lbl" style="color:${a?"#FFD166":"rgba(255,255,255,.45)"}">${l}</div>
                <div class="val sm" style="color:${a?"#FFD166":"rgba(255,255,255,.5)"}">${a?"AN":"AUS"}</div>
              </button>`})}
          </div>`:d}
          ${e.expert.show_raw!==!1?e.logs.map(o=>c`
            <div style="background:rgba(0,0,0,.28);border-radius:8px;padding:9px 11px;margin-top:6px">
              <div style="font-size:10px;text-transform:uppercase;letter-spacing:.8px;color:rgba(255,215,0,.65);margin-bottom:4px">${o.name??o.entity}</div>
              <div style="font-size:11px;color:rgba(255,255,255,.72);font-family:monospace;word-break:break-all;line-height:1.6">${this.st(o.entity)??"\u2013"}</div>
            </div>`):d}`:d}`:d}
      ${this.renderConfirm()}
    </div>`}};customElements.define("growctrl-status-card",Ut);var ts="2.1.0",es=[{type:"growctrl-tent-card",name:"GROWCTRL Tent",description:"Zelt-Hero: Klima-KPIs, VPD-Skala, Status-Ampel"},{type:"growctrl-station-card",name:"GROWCTRL Station",description:"Station: Licht-/Pumpenbalken, Stage, Auto, Konfiguration"},{type:"growctrl-controls-card",name:"GROWCTRL Controls",description:"Aktoren-Raster mit Gruppen und Bestaetigung"},{type:"growctrl-sensors-card",name:"GROWCTRL Sensors",description:"Sensor-Kacheln mit Sparklines"},{type:"growctrl-plants-card",name:"GROWCTRL Plants",description:"Pflanzen, Keimdatum, Kalender"},{type:"growctrl-status-card",name:"GROWCTRL Status",description:"Uebersetzte Logs, Ampel, Experten-Modus"}];window.customCards=window.customCards??[];es.forEach(i=>window.customCards.push({...i,preview:!1,documentationURL:"https://github.com/MrDarkvoid/growctrl"}));console.info(`%c GROWCTRL Cards %c v${ts} `,"background:#1D9E75;color:#fff;font-weight:700","background:#0F6E56;color:#fff");
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
