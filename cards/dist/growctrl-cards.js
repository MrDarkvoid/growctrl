var ot=globalThis,lt=ot.ShadowRoot&&(ot.ShadyCSS===void 0||ot.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,gt=Symbol(),ee=new WeakMap,Q=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==gt)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(lt&&e===void 0){let i=t!==void 0&&t.length===1;i&&(e=ee.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&ee.set(t,e))}return e}toString(){return this.cssText}},ie=a=>new Q(typeof a=="string"?a:a+"",void 0,gt),X=(a,...e)=>{let t=a.length===1?a[0]:e.reduce((i,n,s)=>i+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+a[s+1],a[0]);return new Q(t,a,gt)},ne=(a,e)=>{if(lt)a.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(let t of e){let i=document.createElement("style"),n=ot.litNonce;n!==void 0&&i.setAttribute("nonce",n),i.textContent=t.cssText,a.appendChild(i)}},ft=lt?a=>a:a=>a instanceof CSSStyleSheet?(e=>{let t="";for(let i of e.cssRules)t+=i.cssText;return ie(t)})(a):a;var{is:Re,defineProperty:Ie,getOwnPropertyDescriptor:Ne,getOwnPropertyNames:Be,getOwnPropertySymbols:De,getPrototypeOf:He}=Object,ct=globalThis,se=ct.trustedTypes,Ue=se?se.emptyScript:"",Ve=ct.reactiveElementPolyfillSupport,J=(a,e)=>a,bt={toAttribute(a,e){switch(e){case Boolean:a=a?Ue:null;break;case Object:case Array:a=a==null?a:JSON.stringify(a)}return a},fromAttribute(a,e){let t=a;switch(e){case Boolean:t=a!==null;break;case Number:t=a===null?null:Number(a);break;case Object:case Array:try{t=JSON.parse(a)}catch{t=null}}return t}},ae=(a,e)=>!Re(a,e),re={attribute:!0,type:String,converter:bt,reflect:!1,useDefault:!1,hasChanged:ae};Symbol.metadata??=Symbol("metadata"),ct.litPropertyMetadata??=new WeakMap;var O=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=re){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let i=Symbol(),n=this.getPropertyDescriptor(e,i,t);n!==void 0&&Ie(this.prototype,e,n)}}static getPropertyDescriptor(e,t,i){let{get:n,set:s}=Ne(this.prototype,e)??{get(){return this[t]},set(r){this[t]=r}};return{get:n,set(r){let c=n?.call(this);s?.call(this,r),this.requestUpdate(e,c,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??re}static _$Ei(){if(this.hasOwnProperty(J("elementProperties")))return;let e=He(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(J("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(J("properties"))){let t=this.properties,i=[...Be(t),...De(t)];for(let n of i)this.createProperty(n,t[n])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[i,n]of t)this.elementProperties.set(i,n)}this._$Eh=new Map;for(let[t,i]of this.elementProperties){let n=this._$Eu(t,i);n!==void 0&&this._$Eh.set(n,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let i=new Set(e.flat(1/0).reverse());for(let n of i)t.unshift(ft(n))}else e!==void 0&&t.push(ft(e));return t}static _$Eu(e,t){let i=t.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ne(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){let i=this.constructor.elementProperties.get(e),n=this.constructor._$Eu(e,i);if(n!==void 0&&i.reflect===!0){let s=(i.converter?.toAttribute!==void 0?i.converter:bt).toAttribute(t,i.type);this._$Em=e,s==null?this.removeAttribute(n):this.setAttribute(n,s),this._$Em=null}}_$AK(e,t){let i=this.constructor,n=i._$Eh.get(e);if(n!==void 0&&this._$Em!==n){let s=i.getPropertyOptions(n),r=typeof s.converter=="function"?{fromAttribute:s.converter}:s.converter?.fromAttribute!==void 0?s.converter:bt;this._$Em=n;let c=r.fromAttribute(t,s.type);this[n]=c??this._$Ej?.get(n)??c,this._$Em=null}}requestUpdate(e,t,i,n=!1,s){if(e!==void 0){let r=this.constructor;if(n===!1&&(s=this[e]),i??=r.getPropertyOptions(e),!((i.hasChanged??ae)(s,t)||i.useDefault&&i.reflect&&s===this._$Ej?.get(e)&&!this.hasAttribute(r._$Eu(e,i))))return;this.C(e,t,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:n,wrapped:s},r){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,r??t??this[e]),s!==!0||r!==void 0)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),n===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[n,s]of this._$Ep)this[n]=s;this._$Ep=void 0}let i=this.constructor.elementProperties;if(i.size>0)for(let[n,s]of i){let{wrapped:r}=s,c=this[n];r!==!0||this._$AL.has(n)||c===void 0||this.C(n,void 0,s,c)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(i=>i.hostUpdate?.()),this.update(t)):this._$EM()}catch(i){throw e=!1,this._$EM(),i}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(e){}firstUpdated(e){}};O.elementStyles=[],O.shadowRootOptions={mode:"open"},O[J("elementProperties")]=new Map,O[J("finalized")]=new Map,Ve?.({ReactiveElement:O}),(ct.reactiveElementVersions??=[]).push("2.1.2");var kt=globalThis,oe=a=>a,dt=kt.trustedTypes,le=dt?dt.createPolicy("lit-html",{createHTML:a=>a}):void 0,me="$lit$",I=`lit$${Math.random().toFixed(9).slice(2)}$`,ge="?"+I,We=`<${ge}>`,V=document,tt=()=>V.createComment(""),et=a=>a===null||typeof a!="object"&&typeof a!="function",St=Array.isArray,Ke=a=>St(a)||typeof a?.[Symbol.iterator]=="function",xt=`[ 	
\f\r]`,Y=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ce=/-->/g,de=/>/g,H=RegExp(`>|${xt}(?:([^\\s"'>=/]+)(${xt}*=${xt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),pe=/'/g,ue=/"/g,fe=/^(?:script|style|textarea|title)$/i,At=a=>(e,...t)=>({_$litType$:a,strings:e,values:t}),o=At(1),st=At(2),$i=At(3),W=Symbol.for("lit-noChange"),h=Symbol.for("lit-nothing"),he=new WeakMap,U=V.createTreeWalker(V,129);function be(a,e){if(!St(a)||!a.hasOwnProperty("raw"))throw Error("invalid template strings array");return le!==void 0?le.createHTML(e):e}var Ze=(a,e)=>{let t=a.length-1,i=[],n,s=e===2?"<svg>":e===3?"<math>":"",r=Y;for(let c=0;c<t;c++){let d=a[c],l,p,g=-1,x=0;for(;x<d.length&&(r.lastIndex=x,p=r.exec(d),p!==null);)x=r.lastIndex,r===Y?p[1]==="!--"?r=ce:p[1]!==void 0?r=de:p[2]!==void 0?(fe.test(p[2])&&(n=RegExp("</"+p[2],"g")),r=H):p[3]!==void 0&&(r=H):r===H?p[0]===">"?(r=n??Y,g=-1):p[1]===void 0?g=-2:(g=r.lastIndex-p[2].length,l=p[1],r=p[3]===void 0?H:p[3]==='"'?ue:pe):r===ue||r===pe?r=H:r===ce||r===de?r=Y:(r=H,n=void 0);let f=r===H&&a[c+1].startsWith("/>")?" ":"";s+=r===Y?d+We:g>=0?(i.push(l),d.slice(0,g)+me+d.slice(g)+I+f):d+I+(g===-2?c:f)}return[be(a,s+(a[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),i]},it=class a{constructor({strings:e,_$litType$:t},i){let n;this.parts=[];let s=0,r=0,c=e.length-1,d=this.parts,[l,p]=Ze(e,t);if(this.el=a.createElement(l,i),U.currentNode=this.el.content,t===2||t===3){let g=this.el.content.firstChild;g.replaceWith(...g.childNodes)}for(;(n=U.nextNode())!==null&&d.length<c;){if(n.nodeType===1){if(n.hasAttributes())for(let g of n.getAttributeNames())if(g.endsWith(me)){let x=p[r++],f=n.getAttribute(g).split(I),v=/([.?@])?(.*)/.exec(x);d.push({type:1,index:s,name:v[2],strings:f,ctor:v[1]==="."?yt:v[1]==="?"?$t:v[1]==="@"?_t:Z}),n.removeAttribute(g)}else g.startsWith(I)&&(d.push({type:6,index:s}),n.removeAttribute(g));if(fe.test(n.tagName)){let g=n.textContent.split(I),x=g.length-1;if(x>0){n.textContent=dt?dt.emptyScript:"";for(let f=0;f<x;f++)n.append(g[f],tt()),U.nextNode(),d.push({type:2,index:++s});n.append(g[x],tt())}}}else if(n.nodeType===8)if(n.data===ge)d.push({type:2,index:s});else{let g=-1;for(;(g=n.data.indexOf(I,g+1))!==-1;)d.push({type:7,index:s}),g+=I.length-1}s++}}static createElement(e,t){let i=V.createElement("template");return i.innerHTML=e,i}};function K(a,e,t=a,i){if(e===W)return e;let n=i!==void 0?t._$Co?.[i]:t._$Cl,s=et(e)?void 0:e._$litDirective$;return n?.constructor!==s&&(n?._$AO?.(!1),s===void 0?n=void 0:(n=new s(a),n._$AT(a,t,i)),i!==void 0?(t._$Co??=[])[i]=n:t._$Cl=n),n!==void 0&&(e=K(a,n._$AS(a,e.values),n,i)),e}var vt=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:i}=this._$AD,n=(e?.creationScope??V).importNode(t,!0);U.currentNode=n;let s=U.nextNode(),r=0,c=0,d=i[0];for(;d!==void 0;){if(r===d.index){let l;d.type===2?l=new nt(s,s.nextSibling,this,e):d.type===1?l=new d.ctor(s,d.name,d.strings,this,e):d.type===6&&(l=new wt(s,this,e)),this._$AV.push(l),d=i[++c]}r!==d?.index&&(s=U.nextNode(),r++)}return U.currentNode=V,n}p(e){let t=0;for(let i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}},nt=class a{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,n){this.type=2,this._$AH=h,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=n,this._$Cv=n?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=K(this,e,t),et(e)?e===h||e==null||e===""?(this._$AH!==h&&this._$AR(),this._$AH=h):e!==this._$AH&&e!==W&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Ke(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==h&&et(this._$AH)?this._$AA.nextSibling.data=e:this.T(V.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:i}=e,n=typeof i=="number"?this._$AC(e):(i.el===void 0&&(i.el=it.createElement(be(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===n)this._$AH.p(t);else{let s=new vt(n,this),r=s.u(this.options);s.p(t),this.T(r),this._$AH=s}}_$AC(e){let t=he.get(e.strings);return t===void 0&&he.set(e.strings,t=new it(e)),t}k(e){St(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,i,n=0;for(let s of e)n===t.length?t.push(i=new a(this.O(tt()),this.O(tt()),this,this.options)):i=t[n],i._$AI(s),n++;n<t.length&&(this._$AR(i&&i._$AB.nextSibling,n),t.length=n)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let i=oe(e).nextSibling;oe(e).remove(),e=i}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},Z=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,n,s){this.type=1,this._$AH=h,this._$AN=void 0,this.element=e,this.name=t,this._$AM=n,this.options=s,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=h}_$AI(e,t=this,i,n){let s=this.strings,r=!1;if(s===void 0)e=K(this,e,t,0),r=!et(e)||e!==this._$AH&&e!==W,r&&(this._$AH=e);else{let c=e,d,l;for(e=s[0],d=0;d<s.length-1;d++)l=K(this,c[i+d],t,d),l===W&&(l=this._$AH[d]),r||=!et(l)||l!==this._$AH[d],l===h?e=h:e!==h&&(e+=(l??"")+s[d+1]),this._$AH[d]=l}r&&!n&&this.j(e)}j(e){e===h?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},yt=class extends Z{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===h?void 0:e}},$t=class extends Z{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==h)}},_t=class extends Z{constructor(e,t,i,n,s){super(e,t,i,n,s),this.type=5}_$AI(e,t=this){if((e=K(this,e,t,0)??h)===W)return;let i=this._$AH,n=e===h&&i!==h||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,s=e!==h&&(i===h||n);n&&this.element.removeEventListener(this.name,this,i),s&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},wt=class{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){K(this,e)}};var Ge=kt.litHtmlPolyfillSupport;Ge?.(it,nt),(kt.litHtmlVersions??=[]).push("3.3.3");var xe=(a,e,t)=>{let i=t?.renderBefore??e,n=i._$litPart$;if(n===void 0){let s=t?.renderBefore??null;i._$litPart$=n=new nt(e.insertBefore(tt(),s),s,void 0,t??{})}return n._$AI(a),n};var Et=globalThis,F=class extends O{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=xe(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return W}};F._$litElement$=!0,F.finalized=!0,Et.litElementHydrateSupport?.({LitElement:F});var je=Et.litElementPolyfillSupport;je?.({LitElement:F});(Et.litElementVersions??=[]).push("4.2.2");var qe="4d72-4461726b-766f6964",ye=()=>qe,ve,pt=null;function ut(a){if(a?.states===ve&&pt)return pt;let e=new Map,t=new Set,i={};for(let[n,s]of Object.entries(a?.states??{})){let r=s?.attributes;if(!r?.growctrl_role||!r?.growctrl_tent)continue;let c=String(r.growctrl_tent),d=String(r.growctrl_station??"zelt");e.set(`${c}::${d}::${r.growctrl_role}`,n),d==="zelt"?t.add(c):(i[c]??=new Set).add(d)}return ve=a?.states,pt={tents:[...t].sort(),stations:Object.fromEntries(Object.entries(i).map(([n,s])=>[n,[...s].sort()])),byRole:e},pt}var L=(a,e,t,i)=>ut(a).byRole.get(`${e}::${t}::${i}`);var _=class extends F{constructor(){super(...arguments);this._config={};this._label=t=>t.label??t.name}static{this.properties={hass:{attribute:!1},_config:{state:!0}}}static{this.styles=X`
    .lt { font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: .5px;
          color: var(--secondary-text-color); margin: 16px 0 6px; }
    .row { display: flex; align-items: flex-start; gap: 4px;
           border: 1px solid var(--divider-color); border-radius: 8px; padding: 8px; margin-bottom: 8px; }
    .row ha-form { flex: 1; min-width: 0; }
    .row.col { flex-direction: column; align-items: stretch; gap: 8px; }
    .rowmain { display: flex; align-items: flex-start; gap: 4px; flex: 1; min-width: 0; }
    .rowmain ha-form { flex: 1; min-width: 0; }
    .subwrap { border-top: 1px dashed var(--divider-color); padding-top: 8px; }
    .row.sub { background: var(--secondary-background-color, rgba(127,127,127,.08)); margin-bottom: 6px; }
    .lt.sub { margin: 2px 0 6px; font-size: 11px; opacity: .85; }
    button.del { all: unset; cursor: pointer; color: var(--secondary-text-color);
                 font-size: 16px; padding: 4px 8px; line-height: 1; }
    button.del:hover { color: var(--error-color, #db4437); }
    button.add { all: unset; cursor: pointer; color: var(--primary-color);
                 font-size: 13px; font-weight: 600; padding: 4px 0; }
    .hint { font-size: 11px; color: var(--secondary-text-color); margin-top: 12px; }
  `}setConfig(t){this._config={...t}}_fire(t){this._config=t,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0}))}form(t){return o`<ha-form .hass=${this.hass} .data=${this._config} .schema=${t}
      .computeLabel=${this._label}
      @value-changed=${i=>this._fire({...this._config,...i.detail.value})}></ha-form>`}list(t){let i=this._config[t.key]??[],n=s=>this._fire({...this._config,[t.key]:s});return o`
      ${t.title?o`<div class="lt">${t.title}</div>`:h}
      ${i.map((s,r)=>{let c=d=>{let l=[...i];l[r]=d,n(l)};return o`<div class="row ${t.child?"col":""}">
          <div class="rowmain">
            <ha-form .hass=${this.hass} .data=${s} .schema=${t.rowSchema}
              .computeLabel=${this._label}
              @value-changed=${d=>c({...s,...d.detail.value})}></ha-form>
            <button class="del" title="Entfernen"
              @click=${()=>n(i.filter((d,l)=>l!==r))}>\u2715</button>
          </div>
          ${t.child?o`<div class="subwrap">${this._subList(s,t.child,c)}</div>`:h}
        </div>`})}
      <button class="add" @click=${()=>n([...i,t.newItem()])}>+ ${t.addLabel}</button>`}_subList(t,i,n){let s=(t[i.key]??[]).map(c=>typeof c=="string"?{entity:c}:c),r=c=>n({...t,[i.key]:c});return o`
      ${i.title?o`<div class="lt sub">${i.title}</div>`:h}
      ${s.map((c,d)=>o`<div class="row sub">
        <ha-form .hass=${this.hass} .data=${c} .schema=${i.rowSchema}
          .computeLabel=${this._label}
          @value-changed=${l=>{let p=[...s];p[d]={...c,...l.detail.value},r(p)}}></ha-form>
        <button class="del" title="Entfernen"
          @click=${()=>r(s.filter((l,p)=>p!==d))}>\u2715</button>
      </div>`)}
      <button class="add" @click=${()=>r([...s,i.newItem()])}>+ ${i.addLabel}</button>`}tentSelect(t="tent",i="Zelt"){let n=ut(this.hass).tents;return{name:t,label:i,selector:{select:{options:n,custom_value:!0,mode:"dropdown"}}}}stationSelect(t,i="station",n="Station"){let s=ut(this.hass),r=t?s.stations[t]??[]:[...new Set(Object.values(s.stations).flat())];return{name:i,label:n,selector:{select:{options:r,custom_value:!0,mode:"dropdown"}}}}styleSection(){let t=this._config.style??{},i=[u.text("background","Hintergrund (Farbe, 'a,b' = Gradient oder CSS)"),u.num("opacity","Deckkraft (0\u20131)",0,1,.05),u.bool("glass","Glas-Effekt (Blur)"),u.text("accent","Akzentfarbe"),u.num("radius","Eckenradius (px)",0,40)];return o`<div class="lt">Stil</div>
      <ha-form .hass=${this.hass} .data=${t} .schema=${i}
        .computeLabel=${n=>n.label??n.name}
        @value-changed=${n=>this._fire({...this._config,style:{...n.detail.value}})}></ha-form>`}},u={text:(a,e)=>({name:a,label:e,selector:{text:{}}}),bool:(a,e)=>({name:a,label:e,selector:{boolean:{}}}),num:(a,e,t,i,n)=>({name:a,label:e,selector:{number:{min:t,max:i,step:n,mode:"box"}}}),entity:(a,e,t)=>({name:a,label:e,selector:{entity:t?{domain:t}:{}}}),entities:(a,e,t)=>({name:a,label:e,selector:{entity:{multiple:!0,...t?{domain:t}:{}}}}),select:(a,e,t)=>({name:a,label:e,selector:{select:{mode:"dropdown",options:t}}})};var Ct=class extends _{render(){let e=[this.tentSelect("tent","\u{1F3D5}\uFE0F Zelt"),u.text("name","\u270F\uFE0F Anzeigename (optional)"),u.bool("show_chart","\u{1F4C8} VPD-Chart anzeigen"),u.num("hours","\u23F1\uFE0F Chart-Zeitraum (h)",1,168)];return o`${this.form(e)}${this.styleSection()}
      <div class="hint">Zeigt Klima-Werte (Temperatur/Feuchte/VPD), die VPD-Zonenskala, Modus (VPD/RH) und
        die <b>Phase</b> als Dropdown. Zelt- und Klima-Schalter steuern die Automatik.</div>`}};customElements.define("growctrl-tent-editor",Ct);function zt(a){if(a==null||isNaN(a))return"\u2013";let e=Math.max(0,Math.round(a)),t=Math.floor(e/60),i=e%60;return t&&i?`${t} h ${i} min`:t?`${t} h`:`${i} min`}function $e(a,e="auto",t="de"){let i=Math.floor(a/7)+1,n=a%7+1;return e==="tage"||e==="auto"&&a<7?t==="en"?`${a} days`:`${a} Tage`:t==="en"?`Wk ${i} \xB7 Day ${n}`:`Wo ${i} \xB7 Tag ${n}`}function w(a){if(a==null||a==="unknown"||a==="unavailable"||a==="")return null;let e=Number(a);return isNaN(e)?null:e}function _e(a){if(!a||a==="unknown"||a==="unavailable")return null;let e=new Date(a);return isNaN(e.getTime())?null:Math.max(0,Math.floor((Date.now()-e.getTime())/864e5))}var Tt=a=>(a?.locale?.language??a?.language??"de").toString().toLowerCase().startsWith("en")?"en":"de",Qe={"Alles OK":"All OK",Warnung:"Warning",Kritisch:"Critical",Info:"Info",Inaktiv:"Inactive",Fehler:"Error",Deaktiviert:"Disabled",OK:"OK","Alle Systeme arbeiten normal":"All systems operating normally","Klima-Phase":"Climate phase",an:"on",aus:"off",Seedling:"Seedling",Veg:"Veg",Bloom:"Bloom",Flush:"Flush",Trocknung:"Drying",Anzucht:"Propagation",Wachstum:"Vegetative",Bl\u00FCte:"Flowering",Ernte:"Harvest",Sp\u00FClen:"Flush",automatisch:"automatic",Auto:"Auto",Zelt:"Tent",Klima:"Climate",Logo:"Logo",Luftfeuchte:"Humidity",Temperatur:"Temperature","zu feucht":"too humid","zu trocken":"too dry",Phase:"Phase",Soll:"Target",Informationssystem:"Information system",Modus:"Mode",Automatik:"Automatic",Einstellungen:"Settings",Keimstart:"Germination",Leuchtphase:"Light phase","Licht AN":"Light ON","Licht an":"Light on","Licht aus":"Light off","Licht ausgeschaltet":"Light switched off","Licht ohne Leistung":"Light without power","Licht-Failsafe":"Light failsafe","Man. \xDCbernahme":"Manual hold","Manueller Eingriff":"Manual override","Marker = Prognose":"Marker = forecast","N\xE4chster Zyklus":"Next cycle","Pumpe aus":"Pump off","Pumpe ausgeschaltet":"Pump switched off","Pumpe gesperrt (F\xFCllstand)":"Pump blocked (level)","Pumpe l\xE4uft":"Pump running",Tank:"Tank",Feuchtigkeit:"Humidity","DLI heute":"DLI today","AUS Bloom":"OFF Bloom","AUS Seed/Veg":"OFF Seed/Veg","Unter Mindeststand":"Below minimum","Wartung (System greift nicht ein)":"Maintenance (system inactive)",verbleibend:"remaining",Zyklus:"Cycle",ideal:"ideal",Min:"Min",von:"of","Zeiten unvollst\xE4ndig":"Times incomplete","Wartung aktiv":"Maintenance active",AN:"ON",AUS:"OFF",Richtwert:"Reference",Prognose:"Forecast",Aktoren:"Actuators",weniger:"less",mehr:"more",Checkup:"Checkup",Stationen:"Stations",Station:"Station","Automatik AN":"Automatic ON","Automatik AUS (manuell)":"Automatic OFF (manual)","Kein Eingriff":"No override","Klima-Automatik AN":"Climate automatic ON","Klima-Automatik AUS":"Climate automatic OFF","Licht AN ohne Leistung":"Light ON without power","Licht-Failsafe ausgel\xF6st":"Light failsafe tripped","Lichtzeiten unvollst\xE4ndig":"Light times incomplete","Manueller Eingriff aktiv":"Manual override active","Problem erkannt":"Problem detected","Wartungsmodus aktiv":"Maintenance mode active","Zelt aktiv":"Tent active","Zelt deaktiviert":"Tent disabled","Zyklus l\xE4uft":"Cycle running",Pumpe:"Pump",Licht:"Light",Eingriff:"Override",Status:"Status",Aktiv:"Active",Ereignisprotokoll:"Event log","Nur Infos":"Info only","Noch keine Ereignisse":"No events yet",Pflanze:"Plant",Sorte:"Strain",Verlauf:"History",Tage:"days",Tag:"Day",Wo:"Wk",Woche:"Week"},we=(a,e)=>Tt(a)==="en"?Qe[e]??e:e;var ke=new Map;async function M(a,e,t=24,i=48){let n=`${e}:${t}`,s=ke.get(n);if(s&&Date.now()-s.t<5*6e4)return s.data;try{let r=new Date(Date.now()-t*36e5).toISOString(),d=((await a.callApi("GET",`history/period/${r}?filter_entity_id=${e}&minimal_response&no_attributes`))?.[0]??[]).map(g=>parseFloat(g.state??g.s)).filter(g=>!isNaN(g)),l=Math.max(1,Math.floor(d.length/i)),p=d.filter((g,x)=>x%l===0);return ke.set(n,{t:Date.now(),data:p}),p}catch{return s?.data??[]}}var m={label:"rgba(242,247,243,0.56)",value:"rgba(242,247,243,0.97)",muted:"rgba(242,247,243,0.46)",logLabel:"rgba(242,247,243,0.72)",logText:"rgba(242,247,243,0.90)",ok:"#7BE8A8",warn:"#FFCE7A",crit:"#FF9D9D",info:"#9AC8FF",water:"#7CC8F0",light:"#FFDC8A",temp:"#FFB98A",heat:"#FFB35C",tileBg:"rgba(255,255,255,0.04)",rowBg:"rgba(255,255,255,0.035)"},ji={critical:"rgba(255,157,157,.14)",warning:"rgba(255,206,122,.12)",info:"rgba(154,200,255,.10)",ok:m.rowBg,none:"rgba(255,255,255,.022)"},qi={critical:m.crit,warning:m.warn,info:m.info,ok:m.logText,none:"rgba(242,247,243,.36)"},Lt={Seedling:{bg:"rgba(154,200,255,0.16)",color:"#9AC8FF"},Veg:{bg:"rgba(123,232,168,0.16)",color:"#7BE8A8"},Bloom:{bg:"rgba(255,185,138,0.18)",color:"#FFB98A"},Flush:{bg:"rgba(195,171,245,0.18)",color:"#C3ABF5"},Trocknung:{bg:"rgba(211,168,120,0.18)",color:"#D3A878"}},S=a=>{let e=[];if(a?.background){let t=a.background.trim(),i=t.includes(",")&&!/^(linear|radial|conic|rgb|hsl)/i.test(t)?`linear-gradient(160deg, ${t})`:t;e.push(`--gc-bg:${i}`)}return a?.opacity!==void 0&&e.push(`--gc-opacity:${a.opacity}`),a?.accent&&e.push(`--gc-accent:${a.accent}`),a?.radius!==void 0&&e.push(`--gc-radius:${a.radius}px`),e.join(";")},G=a=>a.includes("critical")?"critical":a.includes("warning")?"warning":a.includes("info")?"info":"ok",R=a=>({ok:"ok",info:"info",warning:"warn",critical:"crit",none:"none"})[a]??"ok",A=X`
  :host {
    display:block;
    /* Akzent je Zelt (Klein gruen / Mittel weinrot / Gross violett) */
    --acc: var(--gc-accent, #7BE8A8);
    --acc-soft: color-mix(in srgb, var(--acc) 13%, transparent);
    --bg:#141B17; --card:#1B2620; --card-2:#222F28; --card-3:#17211B;
    --line:#2E3D34; --line-soft:#27342C;
    --tx:#F2F7F3; --tx-2:#B9CCC0; --tx-3:#85998C;
    --warn:#FFCE7A; --crit:#FF9D9D; --info:#9AC8FF;
    --water:#7CC8F0; --light:#FFDC8A; --temp:#FFB98A; --heat:#FFB35C;
    --r:22px; --r-s:15px; --u:4px;
    --f-ui:"Nunito","Quicksand",var(--primary-font-family,"Inter"),system-ui,sans-serif;
    --f-num:"IBM Plex Mono",ui-monospace,"SF Mono",Menlo,monospace;
    --press:cubic-bezier(.2,.9,.3,1.2);
  }
  *{box-sizing:border-box}      /* verhindert Out-of-Bounds durch Padding+Breite */

  .gc{all:unset; cursor:pointer; touch-action:manipulation; box-sizing:border-box;}
  .clickable{cursor:pointer}
  :focus-visible{outline:2.5px solid var(--acc); outline-offset:2px; border-radius:8px}
  button{transition:transform .16s var(--press), border-color .16s, background .16s, color .16s, box-shadow .16s}
  button:active{transform:scale(.975)}
  ha-icon{display:inline-flex; align-items:center; justify-content:center}
  @media (prefers-reduced-motion: reduce){*,*::before,*::after{transition:none!important; animation:none!important}}

  /* ── Karte ── */
  .card{position:relative; background:var(--gc-bg, linear-gradient(180deg,#202C25,var(--card) 30%));
    border:1px solid var(--line-soft); border-radius:var(--gc-radius,22px); padding:20px;
    box-shadow:0 10px 30px -12px rgba(0,0,0,.45)}
  .card.glass{backdrop-filter:blur(14px) saturate(1.2); -webkit-backdrop-filter:blur(14px) saturate(1.2)}
  .card[data-level="warning"]{border-color:color-mix(in srgb, var(--warn) 35%, var(--line-soft))}
  .card[data-level="critical"]{border-color:color-mix(in srgb, var(--crit) 42%, var(--line-soft))}

  /* ── Kopfzeile ── */
  .hd{display:flex; align-items:center; gap:12px; margin-bottom:16px}
  .hd .ttl{font-size:17.5px; font-weight:900; letter-spacing:-.2px; line-height:1.15}
  .hd .sub{font-size:12.5px; color:var(--tx-2); margin-top:1px; font-weight:700}
  .hd .grow{flex:1; min-width:0}
  .badge-ic{width:46px; height:46px; border-radius:16px; display:grid; place-items:center; flex-shrink:0;
    background:linear-gradient(135deg, var(--acc-soft), rgba(123,232,168,.04));
    border:1px solid color-mix(in srgb, var(--acc) 30%, transparent); color:var(--acc); font-size:22px}

  /* ── Status-Pille (zelt-UNABHAENGIGE Farben) ── */
  .pill{display:inline-flex; align-items:center; gap:7px; font:800 11.5px var(--f-ui);
    padding:7px 14px; border-radius:999px; letter-spacing:.2px; white-space:nowrap}
  .pill::before{content:""; width:7px; height:7px; border-radius:50%; background:currentColor; box-shadow:0 0 8px currentColor}
  .pill.ok{color:#7BE8A8; background:rgba(123,232,168,.14)}
  .pill.info{color:#9AC8FF; background:rgba(154,200,255,.14)}
  .pill.warn{color:#FFCE7A; background:rgba(255,206,122,.14)}
  .pill.crit{color:#FF9D9D; background:rgba(255,157,157,.16)}
  .pill.none{color:#85998C; background:rgba(133,153,140,.14)}
  .mlbl{font:800 10.5px var(--f-ui); letter-spacing:1.3px; text-transform:uppercase; color:var(--tx-3)}

  /* ── Toggle-Schalter ── */
  .tgl{display:inline-flex; align-items:center; gap:9px; font:800 12.5px var(--f-ui); cursor:pointer;
    min-height:44px; padding:0 16px; border-radius:999px; border:1px solid var(--line);
    background:var(--card-2); color:var(--tx-2)}
  .tgl.on{color:var(--acc); border-color:color-mix(in srgb, var(--acc) 45%, transparent); background:var(--acc-soft)}
  .tgl .sw{width:30px; height:17px; border-radius:999px; background:var(--line); position:relative; transition:.2s; flex-shrink:0}
  .tgl .sw::after{content:""; position:absolute; top:2px; left:2px; width:13px; height:13px; border-radius:50%; background:var(--tx-2); transition:.2s}
  .tgl.on .sw{background:color-mix(in srgb, var(--acc) 35%, transparent)}
  .tgl.on .sw::after{left:15px; background:var(--acc); box-shadow:0 0 7px var(--acc)}

  /* ── KPI-Kacheln ── */
  .kpis{display:grid; gap:8px; grid-template-columns:repeat(3,minmax(0,1fr))}
  .kpis.cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}
  .kpis.cols-4{grid-template-columns:repeat(4,minmax(0,1fr))}
  .kpi{background:var(--card-2); border:1px solid transparent; border-radius:var(--r-s);
    padding:12px; text-align:left; cursor:pointer; width:100%; color:inherit; min-height:44px}
  .kpi:hover{border-color:color-mix(in srgb, var(--acc) 40%, transparent); background:#27362E}
  .kpi .mlbl{display:block; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; font-size:9.5px; letter-spacing:.5px}
  .kpi .v{font:700 26px/1.05 var(--f-num); letter-spacing:-1px; margin-top:5px; font-variant-numeric:tabular-nums; display:block}
  .kpi .u{font:600 12px var(--f-num); color:var(--tx-2); margin-left:6px; letter-spacing:0}
  .kpi.c-temp .v{color:var(--temp)} .kpi.c-hum .v{color:var(--water)} .kpi.c-vpd .v{color:var(--acc)}

  /* ── Zonen-Balken (VPD / pH / EC) ── */
  .zones{position:relative; height:11px; border-radius:7px; display:flex; overflow:hidden; box-shadow:inset 0 1px 3px rgba(0,0,0,.4)}
  .zones>i{display:block; height:100%}
  .z-cold{background:#6E97DE} .z-low{background:#E5B567} .z-ok{background:#4CB87E} .z-high{background:#E5B567} .z-bad{background:#D4726F}
  .zmark{position:absolute; top:-3px; bottom:-3px; width:3.5px; margin-left:-1.75px; border-radius:3px; background:#fff; box-shadow:0 0 8px rgba(255,255,255,.9)}
  .zband{position:absolute; top:-2px; bottom:-2px; border:1.5px solid rgba(255,255,255,.85); border-radius:5px; pointer-events:none}
  .zlbl{display:flex; margin-top:6px; font:700 9.5px var(--f-ui); color:var(--tx-3)}
  .zlbl span{text-align:center; overflow:hidden; white-space:nowrap}

  /* ── Balken ── */
  .bar{height:10px; border-radius:6px; background:var(--card-3); overflow:hidden; position:relative; display:block}
  .bar>i{display:block; height:100%; border-radius:6px; transition:width .5s}
  .bar .min{position:absolute; top:-1px; bottom:-1px; width:2.5px; background:rgba(255,255,255,.45)}

  /* ── Versorgungszeile (Licht/Pumpe/DLI/Tank) volle Breite ── */
  .supply{display:block; width:100%; background:var(--card-2); border:1px solid transparent;
    border-radius:var(--r-s); padding:12px 16px; cursor:pointer; text-align:left; color:inherit}
  .supply:hover{border-color:color-mix(in srgb, var(--acc) 35%, transparent)}
  .supply .shd{display:flex; align-items:center; gap:11px}
  .supply .sic{font-size:20px; display:grid; place-items:center; width:26px; flex-shrink:0}
  .supply .stt{font-size:14px; font-weight:800; flex:1; min-width:0}
  .supply .stm{font:700 14px var(--f-num); font-variant-numeric:tabular-nums; flex-shrink:0}
  .supply .bar{margin-top:9px}
  .supply .sft{display:flex; justify-content:space-between; gap:10px; margin-top:6px; font:700 10.5px var(--f-ui); color:var(--tx-3); letter-spacing:.3px}
  .supply .sft span{overflow:hidden; white-space:nowrap; text-overflow:ellipsis}

  /* ── DLI-Statleiste ── */
  .stats{display:grid; grid-template-columns:repeat(3,1fr); gap:8px}
  .stat{background:var(--card-3); border:1px solid var(--line-soft); border-radius:var(--r-s); padding:8px 12px; text-align:center; cursor:pointer; color:inherit; min-height:44px}
  .stat:hover{border-color:color-mix(in srgb, var(--acc) 35%, transparent)}
  .stat .sv{font:700 16px var(--f-num); font-variant-numeric:tabular-nums; color:var(--light); display:block}
  .stat .sl{font:800 9px var(--f-ui); letter-spacing:1.1px; text-transform:uppercase; color:var(--tx-3); margin-top:2px; display:block}

  /* ── Phasen-Dropdown ── */
  .dd{position:relative; display:block; width:100%}
  .dd-btn{display:flex; align-items:center; gap:11px; width:100%; min-height:48px; padding:0 18px;
    font:800 13.5px var(--f-ui); color:var(--tx); cursor:pointer; border-radius:14px; background:var(--card-2); border:1px solid var(--line)}
  .dd-btn:hover{border-color:var(--tx-3)}
  .dd-btn .pdot{width:10px; height:10px; border-radius:50%; background:var(--acc); box-shadow:0 0 8px currentColor; flex-shrink:0}
  .dd-btn .hint{margin-left:auto; font:700 11px var(--f-num); color:var(--tx-3); overflow:hidden; white-space:nowrap; text-overflow:ellipsis}
  .dd-menu{position:absolute; top:calc(100% + 7px); left:0; right:0; z-index:20;
    background:#222F28; border:1px solid var(--line); border-radius:16px; padding:7px; box-shadow:0 18px 44px -10px rgba(0,0,0,.6)}
  .dd-it{display:flex; align-items:center; gap:12px; width:100%; min-height:46px; padding:0 13px;
    font:800 13px var(--f-ui); color:var(--tx-2); cursor:pointer; border-radius:11px; background:transparent; border:none; text-align:left}
  .dd-it:hover{background:var(--card-3); color:var(--tx)}
  .dd-it[aria-selected="true"]{color:var(--acc); background:var(--acc-soft)}
  .dd-it .pdot{width:10px; height:10px; border-radius:50%; flex-shrink:0}
  .dd-it .hint{margin-left:auto; font:700 10.5px var(--f-num); color:var(--tx-3)}
  .pd-seed{background:var(--info)} .pd-veg{background:var(--acc)} .pd-bloom{background:var(--temp)} .pd-flush{background:#C3ABF5} .pd-dry{background:#D3A878}

  /* ── Aktor-Raster (4 nebeneinander) ── */
  .acts{display:grid; grid-template-columns:repeat(4,1fr); gap:8px}
  .act{background:var(--card-2); border:1px solid transparent; border-radius:var(--r-s); cursor:pointer; padding:8px 4px; text-align:center; color:var(--tx-3); min-height:62px}
  .act:hover{border-color:var(--tx-3)}
  .act .aic{font-size:18px; display:block; margin:0 auto 4px}
  .act .anm{font:800 10px var(--f-ui); color:var(--tx-2); display:block; line-height:1.15}
  .act .ast{font:700 8.5px var(--f-num); letter-spacing:.8px; margin-top:2px; display:block}
  .act.on{border-color:color-mix(in srgb, var(--acc) 45%, transparent); color:var(--acc); background:linear-gradient(160deg, var(--acc-soft), var(--card-2))}
  .act.on .anm{color:var(--tx)}
  .act.on.light{border-color:rgba(255,220,138,.5); color:var(--light); background:linear-gradient(160deg, rgba(255,220,138,.13), var(--card-2))}
  .act.on.heat{border-color:rgba(255,179,92,.5); color:var(--heat); background:linear-gradient(160deg, rgba(255,179,92,.14), var(--card-2))}
  .act.on.water{border-color:rgba(124,200,240,.5); color:var(--water); background:linear-gradient(160deg, rgba(124,200,240,.14), var(--card-2))}

  /* ── Buttons im Kopf ── */
  .chip-auto{font:900 12px var(--f-ui); letter-spacing:.5px; min-height:42px; padding:0 18px; border-radius:999px; cursor:pointer; color:#0D1812; background:var(--acc); border:none; box-shadow:0 4px 16px -4px var(--acc); white-space:nowrap}
  .chip-auto.off{color:var(--tx-3); background:var(--card-2); border:1px solid var(--line); box-shadow:none}
  .icbtn{width:42px; height:42px; border-radius:13px; display:grid; place-items:center; cursor:pointer; background:var(--card-2); border:1px solid var(--line); color:var(--tx-2); font-size:16px; flex-shrink:0}
  .icbtn:hover{color:var(--tx); border-color:var(--tx-3)}
  .icbtn.on{color:var(--warn); border-color:color-mix(in srgb, var(--warn) 50%, transparent); background:rgba(255,206,122,.14)}

  /* ── Pflanzen-Tabs + Panel ── */
  .ptabs{display:flex; gap:7px; flex-wrap:wrap}
  .ptab{display:inline-flex; align-items:center; gap:8px; font:800 12.5px var(--f-ui); min-height:42px; padding:0 16px; border-radius:999px; cursor:pointer; border:1.5px solid var(--line); background:transparent; color:var(--tx-2)}
  .ptab[aria-selected="true"]{color:var(--acc); border-color:color-mix(in srgb, var(--acc) 50%, transparent); background:var(--acc-soft)}
  .plant{background:linear-gradient(150deg, var(--acc-soft), var(--card-2) 45%); border:1px solid var(--line-soft); border-radius:var(--r-s); padding:16px; margin-top:8px}
  .plant .phd{display:flex; gap:12px; align-items:center}
  .plant .pimg{width:60px; height:60px; border-radius:18px; display:grid; place-items:center; flex-shrink:0; font-size:27px;
    background:linear-gradient(135deg, var(--acc-soft), transparent); border:1.5px solid color-mix(in srgb, var(--acc) 30%, transparent); color:var(--acc); object-fit:cover}
  .plant .pname{font-size:16.5px; font-weight:900; letter-spacing:-.2px}
  .plant .pstrain{font-size:12.5px; color:var(--tx-2); font-weight:700; margin-top:1px}
  .agechip{display:inline-block; margin-top:5px; font:800 11px var(--f-num); color:var(--acc); background:var(--acc-soft); border:1px solid color-mix(in srgb, var(--acc) 30%, transparent); border-radius:8px; padding:3px 10px}

  /* ── Indikator-Block (Sensor) ── */
  .ind{background:var(--card-3); border:1px solid var(--line-soft); border-radius:var(--r-s); padding:12px; margin-top:10px; cursor:pointer; width:100%; text-align:left; color:inherit}
  .ind:hover{border-color:color-mix(in srgb, var(--acc) 35%, transparent)}
  .ind .ihd{display:flex; justify-content:space-between; align-items:center; gap:10px; margin-bottom:12px}
  .ind .ilbl{font:800 11px var(--f-ui); letter-spacing:1.1px; text-transform:uppercase; display:inline-flex; align-items:center; gap:7px; min-width:0}
  .ind .ival{font:700 19px var(--f-num); font-variant-numeric:tabular-nums; flex-shrink:0; white-space:nowrap}
  .ind .ival .u{font-size:11px; color:var(--tx-2); margin-left:5px; letter-spacing:0}
  .spark{display:block; width:100%; height:38px; margin-top:6px}

  /* setzbare Werte (number/input_number): −/＋-Stepper */
  .setrow{display:inline-flex; align-items:center; gap:9px; flex-shrink:0}
  .stepbtn{width:32px; height:32px; border-radius:10px; display:grid; place-items:center; cursor:pointer; color:var(--acc); background:var(--acc-soft); border:1px solid color-mix(in srgb, var(--acc) 35%, transparent)}
  .stepbtn:hover{background:color-mix(in srgb, var(--acc) 24%, transparent)}
  .setval{font:700 19px var(--f-num); font-variant-numeric:tabular-nums; min-width:58px; text-align:center}
  .setval .u{font-size:11px; color:var(--tx-2); margin-left:5px; letter-spacing:0}

  /* ── Ereignisfeld ── */
  .event{display:flex; align-items:center; gap:12px; border-radius:var(--r-s); cursor:pointer; width:100%; text-align:left; color:inherit; background:var(--card-3); border:1px dashed var(--line); padding:12px; min-height:46px}
  .event:hover{border-color:color-mix(in srgb, var(--acc) 40%, transparent)}
  .event .edot{width:8px; height:8px; border-radius:50%; background:var(--tx-3); flex-shrink:0}
  .event .etx{flex:1; min-width:0; font-size:12.5px; font-weight:800; color:var(--tx-2); overflow:hidden; white-space:nowrap; text-overflow:ellipsis}
  .event .etm{font:700 10.5px var(--f-num); color:var(--tx-3); flex-shrink:0}

  /* ── Ereignisprotokoll ── */
  .log{display:flex; flex-direction:column; gap:3px}
  .lrow{display:flex; align-items:center; gap:12px; padding:10px 13px; border-radius:12px; cursor:pointer; width:100%; text-align:left; color:inherit; background:transparent; border:none; min-height:44px}
  .lrow:hover{background:var(--card-2)}
  .lrow .tm{font:700 11px var(--f-num); color:var(--tx-3); width:42px; flex-shrink:0}
  .lrow .who{font:800 11px var(--f-ui); color:var(--tx-2); width:104px; flex-shrink:0; overflow:hidden; white-space:nowrap; text-overflow:ellipsis}
  .lrow .what{font-size:12.5px; font-weight:700; color:var(--tx); flex:1; min-width:0; overflow:hidden; white-space:nowrap; text-overflow:ellipsis}
  .lrow.w{background:rgba(255,206,122,.08)} .lrow.w .what{color:var(--warn)}
  .lrow.c{background:rgba(255,157,157,.09)} .lrow.c .what{color:var(--crit)}
  .lrow.i .what{color:var(--tx)}

  /* ── Checkup-Matrix ── */
  .matrix{display:grid; grid-template-columns:1fr repeat(4,52px); gap:3px; font-size:12px}
  .matrix.m4{grid-template-columns:1fr repeat(4,minmax(0,52px))}
  .matrix.m5{grid-template-columns:1fr repeat(5,minmax(0,46px))}
  .matrix .mh{font:800 9.5px var(--f-ui); letter-spacing:.8px; text-transform:uppercase; color:var(--tx-3); text-align:center; padding:6px 2px}
  .matrix .mh ha-icon{--mdc-icon-size:16px; color:var(--tx-3); display:inline-flex; align-items:center; justify-content:center}
  .matrix .mn{padding:12px 11px; background:var(--card-2); border-radius:12px 0 0 12px; font-weight:800; display:flex; align-items:center; overflow:hidden; white-space:nowrap; text-overflow:ellipsis}
  .matrix .mc{display:grid; place-items:center; background:var(--card-2); cursor:pointer; border:none; min-height:46px; color:inherit}
  .matrix .mc:hover{background:#27362E}
  .matrix .mc:last-child{border-radius:0 12px 12px 0}
  .dot{width:11px; height:11px; border-radius:50%}
  .dot.ok{background:var(--acc); box-shadow:0 0 8px color-mix(in srgb, var(--acc) 70%, transparent)}
  .dot.warn{background:var(--warn); box-shadow:0 0 8px rgba(255,206,122,.7)}
  .dot.crit{background:var(--crit); box-shadow:0 0 8px rgba(255,157,157,.7)}
  .dot.info{background:var(--info); box-shadow:0 0 8px rgba(154,200,255,.6)}
  .dot.off{background:var(--line)}

  /* ── Tank vertikal ── */
  .tankv{width:76px; height:98px; border-radius:18px; border:1.5px solid var(--line); position:relative; overflow:hidden; background:var(--card-3); flex-shrink:0}
  .tankv .fill{position:absolute; left:0; right:0; bottom:0; background:linear-gradient(180deg, rgba(124,200,240,.85), rgba(124,200,240,.5)); border-top:2px solid rgba(255,255,255,.5); transition:height .8s}
  .tankv .minl{position:absolute; left:0; right:0; height:1.5px; background:rgba(255,255,255,.35)}

  /* ── Chart + Legende ── */
  .chart{display:block; width:100%}
  .legend{display:flex; gap:14px; flex-wrap:wrap; margin-top:8px; font:800 11.5px var(--f-ui); color:var(--tx-2)}
  .legend i{display:inline-block; width:14px; height:3.5px; border-radius:2px; margin-right:6px; vertical-align:middle}

  /* ── Diagnose-Badges + Sektionslabel + Settings ── */
  .seclbl{font:800 10.5px var(--f-ui); text-transform:uppercase; letter-spacing:1.3px; color:var(--tx-3); margin:14px 0 8px}
  .pbadge{display:inline-flex; align-items:center; gap:6px; font:800 10px var(--f-ui); padding:5px 10px; border-radius:9px; letter-spacing:.3px}
  .pbadge.warn{color:var(--warn); background:rgba(255,206,122,.12); border:1px solid rgba(255,206,122,.3)}
  .pbadge.crit{color:var(--crit); background:rgba(255,157,157,.12); border:1px solid rgba(255,157,157,.35)}
  .settings-grid{display:grid; gap:8px; grid-template-columns:repeat(3,minmax(0,1fr))}
  .settings-grid .skv{background:var(--card-2); border:1px solid transparent; border-radius:var(--r-s); padding:11px 13px; text-align:left; cursor:pointer; color:inherit; min-width:0}
  .settings-grid .skv:hover{border-color:color-mix(in srgb, var(--acc) 35%, transparent)}
  .settings-grid .skv .k{font:800 10px var(--f-ui); letter-spacing:.8px; text-transform:uppercase; color:var(--tx-3)}
  .settings-grid .skv .vv{font:800 14px var(--f-num); color:var(--tx); margin-top:3px}

  /* ── Dynamische Skalierung: groessere Schrift auf groesseren Screens (PC/Tablet) ── */
  @media (min-width: 900px){
    .hd .ttl{font-size:20px} .hd .sub{font-size:14px}
    .badge-ic{width:52px; height:52px; font-size:25px}
    .pill{font-size:13px; padding:8px 16px}
    .mlbl{font-size:12px}
    .tgl{font-size:14px; min-height:48px} .tgl .sw{width:34px; height:19px}
    .tgl .sw::after{width:15px; height:15px} .tgl.on .sw::after{left:17px}
    .kpi .mlbl{font-size:11px} .kpi .v{font-size:31px} .kpi .u{font-size:14px}
    .zones{height:13px} .zlbl{font-size:11.5px}
    .bar{height:12px}
    .supply .sic{font-size:23px; width:30px} .supply .stt{font-size:16px} .supply .stm{font-size:16px} .supply .sft{font-size:12px}
    .ind .ilbl{font-size:12.5px} .ind .ival{font-size:22px} .ind .ival .u{font-size:13px}
    .setval{font-size:22px} .setval .u{font-size:13px} .stepbtn{width:36px; height:36px}
    .dd-btn{font-size:15.5px; min-height:52px} .dd-it{font-size:15px; min-height:50px}
    .dd-btn .hint, .dd-it .hint{font-size:12px}
    .lrow .tm{font-size:12.5px; width:48px} .lrow .who{font-size:12.5px; width:128px} .lrow .what{font-size:14px}
    .matrix .mh{font-size:11px} .matrix .mn{font-size:14px} .dot{width:13px; height:13px}
    .matrix .mh ha-icon{--mdc-icon-size:19px}
    .seclbl{font-size:12px} .legend{font-size:13px}
    .ptab{font-size:14px; min-height:46px} .chip-auto{font-size:14px; min-height:46px}
    .agechip{font-size:12.5px}
    .plant .pname{font-size:19px} .plant .pstrain{font-size:14px}
    .plant .pimg{width:68px; height:68px; font-size:31px}
    .event .etx{font-size:14px} .event .etm{font-size:12px}
    .settings-grid .skv .k{font-size:11.5px} .settings-grid .skv .vv{font-size:16px}
    .stat .sv{font-size:18px} .stat .sl{font-size:10.5px}
    .act .aic{font-size:21px} .act .anm{font-size:11.5px} .act .ast{font-size:9.5px}
    .c-axl{font-size:12px}   /* Chart-Achsenbeschriftung (SVG) */
  }
  @media (min-width: 1400px){
    .hd .ttl{font-size:22px} .kpi .v{font-size:34px} .kpi .u{font-size:15px}
    .ind .ival{font-size:24px} .setval{font-size:24px}
    .supply .stt{font-size:17px} .supply .stm{font-size:17px}
    .lrow .what{font-size:15px} .plant .pname{font-size:21px}
    .c-axl{font-size:13px}
  }

  @media (max-width: 480px){
    .card{padding:15px 14px}
    .kpis{grid-template-columns:repeat(3,minmax(0,1fr)); gap:6px}
    .kpi .v{font-size:21px}
    .settings-grid{grid-template-columns:repeat(2,minmax(0,1fr))}
    .matrix{grid-template-columns:1fr repeat(4,44px)}
    .matrix.m4{grid-template-columns:1fr repeat(4,40px)}
    .matrix.m5{grid-template-columns:1fr repeat(5,33px)}
    .lrow .who{width:84px}
  }
`,Qi={ok:{bg:"rgba(123,232,168,.14)",color:m.ok,label:"Alles OK"},info:{bg:"rgba(154,200,255,.14)",color:m.info,label:"Info"},warning:{bg:"rgba(255,206,122,.14)",color:m.warn,label:"Warnung"},critical:{bg:"rgba(255,157,157,.16)",color:m.crit,label:"Kritisch"},none:{bg:"rgba(133,153,140,.14)",color:"#85998C",label:"Inaktiv"}};var N=30,ht=4,Se=6,Pt=14,Ae=0;function Ee(a){if(a.length<3)return`M${a.map(t=>t.join(",")).join(" L")}`;let e=`M${a[0][0]},${a[0][1]}`;for(let t=0;t<a.length-1;t++){let i=a[Math.max(0,t-1)],n=a[t],s=a[t+1],r=a[Math.min(a.length-1,t+2)],c=n[0]+(s[0]-i[0])/6,d=n[1]+(s[1]-i[1])/6,l=s[0]-(r[0]-n[0])/6,p=s[1]-(r[1]-n[1])/6;e+=` C${c.toFixed(1)},${d.toFixed(1)} ${l.toFixed(1)},${p.toFixed(1)} ${s[0]},${s[1]}`}return e}function B(a,e={}){let t=`gcg${Ae++}`,i=e.w??300,n=e.h??110,s=a.flatMap(f=>f.data);if(!s.length)return o`<div style="height:${n}px;display:flex;align-items:center;justify-content:center;
    font-size:11px;color:rgba(255,255,255,.5)">Keine Verlaufsdaten</div>`;let r=e.min??Math.min(...s,e.band?.min??1/0),c=e.max??Math.max(...s,e.band?.max??-1/0);c-r<.001&&(c+=1,r-=1);let d=(c-r)*.08;r-=d,c+=d;let l=(f,v)=>N+f/Math.max(1,v-1)*(i-N-ht),p=f=>Se+(1-(f-r)/(c-r))*(n-Se-Pt),g=e.grid??3,x=f=>Math.abs(f)>=100?f.toFixed(0):Math.abs(f)>=10?f.toFixed(1):f.toFixed(2);return o`<svg data-gce="4d724461726b766f6964" viewBox="0 0 ${i} ${n}" preserveAspectRatio="none" style="width:100%;height:${n}px;display:block">
    ${e.band&&(e.band.min!==void 0||e.band.max!==void 0)?st`
      <rect x="${N}" y="${p(e.band.max??c)}" width="${i-N-ht}"
        height="${Math.max(0,p(e.band.min??r)-p(e.band.max??c))}"
        fill="${e.band.color??"rgba(77,255,195,.08)"}" />`:h}
    ${Array.from({length:g+1},(f,v)=>{let y=r+(c-r)*v/g;return st`
        <line x1="${N}" y1="${p(y)}" x2="${i-ht}" y2="${p(y)}"
          stroke="rgba(255,255,255,.10)" stroke-width="1"/>
        <text x="${N-4}" y="${p(y)+3}" text-anchor="end" class="c-axl"
          font-size="9.5" fill="rgba(255,255,255,.68)">${x(y)}</text>`})}
    ${a.map((f,v)=>{if(f.data.length<2)return h;let y=f.data.map((P,C)=>[Number(l(C,f.data.length).toFixed(1)),Number(p(P).toFixed(1))]),k=Ee(y),E=y[y.length-1][0],z=y[y.length-1][1];return st`
        <defs>
          <linearGradient id="${t}-${v}" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="${f.color}" stop-opacity=".18"/>
            <stop offset="100%" stop-color="${f.color}" stop-opacity="0"/>
          </linearGradient>
        </defs>
        ${f.fill!==!1?st`<path
          d="${k} L${E},${n-Pt} L${N},${n-Pt} Z"
          fill="url(#${t}-${v})"/>`:h}
        <path d="${k}" fill="none" stroke="${f.color}" stroke-width="2.4"
          stroke-linejoin="round" stroke-linecap="round"/>
        <circle cx="${E}" cy="${z}" r="6" fill="${f.color}" opacity=".18"/>
        <circle cx="${E}" cy="${z}" r="3" fill="${f.color}"/>
        <circle cx="${E}" cy="${z}" r="1.3" fill="rgba(10,14,18,.9)"/>`})}
    <text x="${N}" y="${n-3}" class="c-axl" font-size="9" fill="rgba(255,255,255,.5)">-24h</text>
    <text x="${i-ht}" y="${n-3}" text-anchor="end" class="c-axl" font-size="9" fill="rgba(255,255,255,.5)">jetzt</text>
  </svg>`}function Ce(a,e,t=280,i=38){if(a.length<2)return o`<div style="height:${i}px"></div>`;let n=`gcs${Ae++}`,s=Math.min(...a),r=Math.max(...a);r-s<.001&&(r+=1,s-=1);let c=f=>f/(a.length-1)*t,d=f=>3+(1-(f-s)/(r-s))*(i-8),l=a.map((f,v)=>[Number(c(v).toFixed(1)),Number(d(f).toFixed(1))]),p=Ee(l),g=l[l.length-1][0],x=l[l.length-1][1];return o`<svg data-gce="4d724461726b766f6964" viewBox="0 0 ${t} ${i}" style="width:100%;height:${i}px;display:block">
    <defs><linearGradient id="${n}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${e}" stop-opacity=".22"/>
      <stop offset="100%" stop-color="${e}" stop-opacity="0"/>
    </linearGradient></defs>
    <path d="${p} L${g},${i} L0,${i} Z" fill="url(#${n})"/>
    <path d="${p}" fill="none" stroke="${e}" stroke-width="2"
      stroke-linejoin="round" stroke-linecap="round"/>
    <circle cx="${g}" cy="${x}" r="2.6" fill="${e}"/>
  </svg>`}var Ft=a=>a.toLowerCase().replace(/ä/g,"a").replace(/ö/g,"o").replace(/ü/g,"u").replace(/ß/g,"ss").replace(/[^a-z0-9]+/g,"_").replace(/^_+|_+$/g,""),D=(a,e,t,i,n)=>n?.[i]??`${a}.growctrl_${Ft(e)}_${Ft(t)}_${i}`,j=(a,e,t,i)=>i?.[t]??`${a}.growctrl_zelt_${Ft(e)}_${t}`,mt={auto:["switch","automatik","auto"],wartung:["switch","wartung","maintenance"],stage:["select","wachstumsphase","stage"],lightOn:["time","licht_an","light_on"],lightOffSv:["time","licht_aus_seedling_veg","light_off_sv"],lightOffBloom:["time","licht_aus_bloom_flush","light_off_bloom"],lightRest:["sensor","licht_restzeit","light_rest"],pumpRest:["sensor","pumpe_restzeit","pump_rest"],age:["sensor","alter_seit_keimung","plant_age"],rec:["sensor","phasen_empfehlung","stage_recommendation"],event:["sensor","letztes_ereignis","last_event"],dli:["sensor","dli_heute","dli_today"],dliFc:["sensor","dli_prognose","dli_forecast"],germination:["date","keimstart","germination"],overrideMin:["number","manuelle_ubernahme","override_minutes"],pOverride:["binary_sensor","manueller_eingriff","problem_override"],pFailsafe:["binary_sensor","licht_failsafe","problem_light_failsafe"],pTime:["binary_sensor","lichtzeiten_unvollstandig","problem_time_invalid"],pPump:["binary_sensor","pumpe_gesperrt_fullstand","problem_pump_blocked"],pPower:["binary_sensor","licht_ohne_leistung","problem_power"]},q={enabled:["switch","zelt_aktiv","tent_enabled"],climate:["switch","klima_automatik","climate_enabled"],mode:["select","klima_modus","climate_mode"],phase:["select","klima_phase","climate_phase"],vpd:["sensor","vpd","vpd"],status:["sensor","status","status"],event:["sensor","letztes_ereignis","last_event"]};var $=class extends F{constructor(){super(...arguments);this._cw=0;this._config={};this._confirm=null}static{this.properties={hass:{attribute:!1},_config:{state:!0},_confirm:{state:!0},_cw:{state:!0}}}connectedCallback(){super.connectedCallback(),this._ro=new ResizeObserver(t=>{let i=Math.round(t[0]?.contentRect?.width??0);i&&Math.abs(i-this._cw)>8&&(this._cw=i)}),this._ro.observe(this)}disconnectedCallback(){this._ro?.disconnect(),super.disconnectedCallback()}chartW(t=34){return Math.max(280,(this._cw||320)-t)}setConfig(t){this.validateConfig(t),this._config=t}validateConfig(t){}getCardSize(){return 4}st(t){return t?this.hass?.states[t]?.state:void 0}isOn(t){return this.st(t)==="on"}t(t){return we(this.hass,t)}get _lang(){return Tt(this.hass)}friendly(t){return t&&this.hass?.states[t]?.attributes?.friendly_name||t||""}unit(t){return t&&this.hass?.states[t]?.attributes?.unit_of_measurement||""}moreInfo(t){this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:t},bubbles:!0,composed:!0}))}navigate(t){history.pushState(null,"",t),window.dispatchEvent(new CustomEvent("location-changed"))}toggle(t){let i=t.split(".")[0],n=["switch","input_boolean","light","fan"].includes(i)?i:"homeassistant";this.hass.callService(n,"toggle",{entity_id:t})}confirmToggle(t,i){this._confirm={text:`${i} wirklich schalten?`,action:()=>this.toggle(t)}}renderConfirm(){return this._confirm?o`<div style="position:absolute;inset:0;background:rgba(0,0,0,.6);border-radius:16px;
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
    </div>`:h}};var Xe=["VPD","RH"],Je=["Auto","Seedling","Veg","Bloom","Trocknung"],ze={Auto:"",Seedling:"pd-seed",Veg:"pd-veg",Bloom:"pd-bloom",Trocknung:"pd-dry"},Te={Auto:"automatisch",Seedling:"Anzucht",Veg:"Wachstum",Bloom:"Bl\xFCte",Trocknung:"Ernte"},Le=[{w:20,col:"#6E97DE",lbl:"zu feucht"},{w:20,col:"#58E0A5",lbl:"Seedling"},{w:20,col:"#2FB36C",lbl:"Veg"},{w:20,col:"#E5B567",lbl:"Bloom"},{w:20,col:"#D4726F",lbl:"zu trocken"}],Mt=2,Ot=class extends ${constructor(){super(...arguments);this._hist=[];this._phase=!1}static{this.styles=A}static{this.properties={...$.properties,_hist:{state:!0},_phase:{state:!0}}}validateConfig(t){if(!t.tent)throw new Error("growctrl-tent-card: 'tent' ist Pflicht (Zelt-Name aus der Integration).")}static getConfigElement(){return document.createElement("growctrl-tent-editor")}static getStubConfig(){return{tent:"gross"}}e(t){let[i,n,s]=q[t],r=this._config;return r.overrides?.[n]??L(this.hass,r.tent,"zelt",s)??j(i,r.tent,n,r.overrides)}_select(t,i){this.hass.callService("select","select_option",{entity_id:t,option:i})}connectedCallback(){super.connectedCallback(),this._load(),this._timer=window.setInterval(()=>this._load(),5*6e4)}disconnectedCallback(){super.disconnectedCallback(),this._timer&&clearInterval(this._timer)}async _load(){if(!this.hass){setTimeout(()=>this._load(),1e3);return}this._hist=await M(this.hass,this.e("vpd"),this._config.hours??24)}tglBtn(t,i,n){return o`<button class="gc tgl ${n?"on":""}" style="flex:1; justify-content:center" @click=${()=>this.confirmToggle(t,i)}>
      <span class="sw"></span> ${i}</button>`}chips(t,i,n){return o`<div style="display:flex; gap:6px; flex-wrap:wrap">
      ${i.map(s=>{let r=s===n;return o`<button class="gc" style="padding:7px 13px; border-radius:999px; font:800 11.5px var(--f-ui);
            border:1.5px solid ${r?"color-mix(in srgb, var(--acc) 50%, transparent)":"var(--line)"};
            background:${r?"var(--acc-soft)":"transparent"}; color:${r?"var(--acc)":"var(--tx-2)"}"
          @click=${()=>this._select(t,s)}>${s}</button>`})}
    </div>`}phaseDropdown(t,i){return o`<div class="dd ${this._phase?"open":""}">
      <button class="gc dd-btn" aria-haspopup="listbox" aria-expanded=${this._phase} @click=${()=>{this._phase=!this._phase}}>
        <span class="pdot ${ze[i]}" style="${i==="Auto"?"background:var(--acc);color:var(--acc)":""}"></span>${this.t(i)}
        <span class="hint">${this.t(Te[i]??"")}</span>
        <ha-icon icon="mdi:chevron-down" style="--mdc-icon-size:16px;color:var(--tx-3);transition:transform .2s;${this._phase?"transform:rotate(180deg)":""}"></ha-icon>
      </button>
      ${this._phase?o`<div class="dd-menu" role="listbox">
        ${Je.map(n=>o`<button class="gc dd-it" role="option" aria-selected=${n===i}
          @click=${()=>{this._select(t,n),this._phase=!1}}>
          <span class="pdot ${ze[n]}" style="${n==="Auto"?"background:var(--acc)":""}"></span>${this.t(n)}<span class="hint">${this.t(Te[n]??"")}</span></button>`)}
      </div>`:h}
    </div>`}render(){let t=this._config;if(!this.hass)return h;let i=this.hass.states[this.e("vpd")],n=!i&&!this.hass.states[this.e("enabled")],s=w(i?.state)??(n?1.06:null),r=i?.attributes?.temp,c=i?.attributes?.rh,d=i?.attributes?.phase_effektiv??"Veg",l=i?.attributes?.sollwerte,p=this.isOn(this.e("enabled"))||n,g=this.isOn(this.e("climate")),x=this.hass.states[this.e("status")],f=x?.attributes?.probleme??[],v=x?.state?.toLowerCase?.()==="problem"?"warning":p?"ok":"none",y=this.hass.states[this.e("event")],k=s!==null&&l&&s>=l.vpd_min&&s<=l.vpd_max,E=s!==null?Math.min(100,Math.max(0,s/Mt*100)):null,z=i?.attributes?.temp_entity||this.e("vpd"),P=i?.attributes?.rh_entity||this.e("vpd");return o`<div class="card ${t.style?.glass?"glass":""}" data-level=${v==="none"?"ok":v} style="${S(t.style)};position:relative">
      <div class="hd">
        <div class="grow" style="min-width:0">
          <div class="ttl">${t.name??`${this.t("Klima")} ${this.t("Zelt")} ${t.tent}`}</div>
          <div class="sub">${this.t("Phase")} ${this.t(d)}${l?` \xB7 ${this.t("Soll")} ${l.vpd_min}\u2013${l.vpd_max} kPa / ${l.rh_min}\u2013${l.rh_max} %`:""}</div>
        </div>
        <span class="pill ${p?R(v):"none"}">${p?v==="ok"?this.t("Alles OK"):v==="warning"?this.t("Warnung"):this.t("Info"):this.t("Deaktiviert")}</span>
      </div>

      <div style="display:flex; gap:8px; margin-bottom:16px">
        ${this.tglBtn(this.e("enabled"),this.t("Zelt"),p)}
        ${this.tglBtn(this.e("climate"),this.t("Klima"),g)}
      </div>

      <div class="kpis">
        <button class="gc kpi c-temp" @click=${()=>this.moreInfo(z)}><span class="mlbl">${this.t("Temperatur")}</span><span class="v">${r!=null?Number(r).toFixed(1):"\u2013"}<span class="u">°C</span></span></button>
        <button class="gc kpi c-hum" @click=${()=>this.moreInfo(P)}><span class="mlbl">${this.t("Luftfeuchte")}</span><span class="v">${c!=null?Math.round(Number(c)):"\u2013"}<span class="u">%</span></span></button>
        <button class="gc kpi c-vpd" @click=${()=>this.moreInfo(this.e("vpd"))}><span class="mlbl">VPD</span><span class="v" style="${s!==null&&!k?`color:${m.warn}`:""}">${s!==null?s.toFixed(2):"\u2013"}<span class="u">kPa</span></span></button>
      </div>

      <div style="margin-top:16px">
        <div class="zones">
          ${Le.map(C=>o`<i style="width:${C.w}%;background:${C.col}"></i>`)}
          ${l?o`<span class="zband" style="left:${l.vpd_min/Mt*100}%;width:${(l.vpd_max-l.vpd_min)/Mt*100}%"></span>`:h}
          ${E!==null?o`<span class="zmark" style="left:${E}%"></span>`:h}
        </div>
        <div class="zlbl">${Le.map(C=>o`<span style="width:${C.w}%">${this.t(C.lbl)}</span>`)}</div>
      </div>

      <div style="display:flex; gap:12px; flex-wrap:wrap; margin-top:14px; align-items:center">
        <span class="mlbl">${this.t("Modus")}</span>${this.chips(this.e("mode"),Xe,this.st(this.e("mode"))??"VPD")}
      </div>
      <div style="margin-top:13px">
        <span class="mlbl" style="display:block; margin-bottom:8px">${this.t("Phase")}</span>
        ${this.phaseDropdown(this.e("phase"),this.st(this.e("phase"))??"Auto")}
      </div>

      ${t.show_chart!==!1&&this._hist.length>1?o`
        <div class="seclbl">VPD · ${t.hours??24}h</div>
        ${B([{data:this._hist,color:k===!1?m.warn:m.ok,fill:!0}],{w:this.chartW(),h:96,band:l?{min:l.vpd_min,max:l.vpd_max}:void 0,grid:3})}`:h}

      ${f.length?o`<div style="display:flex; flex-wrap:wrap; gap:7px; margin-top:12px">
        ${f.map(C=>o`<span class="pbadge warn"><ha-icon icon="mdi:alert" style="--mdc-icon-size:12px"></ha-icon>${C}</span>`)}</div>`:h}

      ${y?o`<button class="gc event" style="margin-top:14px" @click=${()=>this.moreInfo(this.e("event"))}>
        <span class="edot" style="background:${y.attributes?.schweregrad==="critical"?m.crit:y.attributes?.schweregrad==="warning"?m.warn:m.info}"></span>
        <span class="etx">${y.state}</span>
        <span class="etm">${y.last_changed?new Date(y.last_changed).toLocaleTimeString("de-DE",{hour:"2-digit",minute:"2-digit"}):""}</span>
      </button>`:h}
      ${this.renderConfirm()}
    </div>`}};customElements.define("growctrl-tent-card",Ot);var Rt=class extends _{render(){let e=[this.tentSelect("tent","\u{1F3D5}\uFE0F Zelt"),this.stationSelect(this._config?.tent,"station","\u{1F331} Station"),u.text("name","\u270F\uFE0F Anzeigename (optional)"),u.bool("show_settings","\u2699\uFE0F Einstellungen-Zahnrad anzeigen"),u.bool("show_event","\u{1F4E3} Ereignisfeld am Kartenfu\xDF (Standard an)"),u.entity("tank_entity","\u{1F4A7} Stations-Tank F\xFCllstand % (optional)","sensor"),u.num("tank_min","\u26A0\uFE0F Tank-Mindeststand %",0,100),u.num("tank_volume","\u{1FAA3} Tank-Volumen in Litern (optional)",1,1e4)],t=[u.entity("entity","\u{1F50C} Schalter",["switch","input_boolean","light","fan"]),u.text("name","\u270F\uFE0F Anzeigename (optional)"),u.select("kind","\u{1F3A8} Art (Farbe/Icon)",[{value:"light",label:"Licht"},{value:"pump",label:"Pumpe"},{value:"o2",label:"O\u2082"},{value:"fan",label:"L\xFCfter"},{value:"heat",label:"Heizmatte"},{value:"water",label:"Befeuchter"}]),u.bool("confirm","\u2705 Vor dem Schalten best\xE4tigen")],i=[u.text("name","\u{1F331} Name"),u.text("strain","\u{1F9EC} Sorte / Genetik (optional)"),u.entity("germination_helper","\u{1F4C5} Keimstart-Datum (date, optional)","date"),u.text("image","\u{1F5BC}\uFE0F Bild-URL (optional)"),u.entity("temp_entity","\u{1F321}\uFE0F Temperatur (Sensor / input_number)"),u.entity("humidity_entity","\u{1F4A7} Feuchtigkeit (Sensor / input_number)"),u.entity("ph_entity","\u2697\uFE0F pH (Sensor / input_number)"),u.num("ph_ideal_min","\u{1F7E2} pH Idealbereich (gr\xFCn) \u2013 von",0,14,.1),u.num("ph_ideal_max","\u{1F7E2} pH Idealbereich (gr\xFCn) \u2013 bis",0,14,.1),u.num("ph_ok_min","\u{1F7E1} pH akzeptabel \u2013 von (optional)",0,14,.1),u.num("ph_ok_max","\u{1F7E1} pH akzeptabel \u2013 bis (optional)",0,14,.1),u.entity("ec_entity","\u26A1 EC (Sensor / input_number)"),u.num("ec_ideal_min","\u{1F7E2} EC Idealbereich (gr\xFCn) \u2013 von",0,10,.1),u.num("ec_ideal_max","\u{1F7E2} EC Idealbereich (gr\xFCn) \u2013 bis",0,10,.1),u.num("ec_ok_min","\u{1F7E1} EC akzeptabel \u2013 von (optional)",0,10,.1),u.num("ec_ok_max","\u{1F7E1} EC akzeptabel \u2013 bis (optional)",0,10,.1),u.entity("tank_entity","\u{1FAA3} Tank-F\xFCllstand % (optional)","sensor"),u.num("tank_min","\u26A0\uFE0F Tank-Mindeststand % (Standard 30)",0,100)],n={key:"sensors",title:"\u2795 Weitere Sensoren (als Felder, jeder mit Namen)",rowSchema:[u.entity("entity","\u{1F4C8} Sensor / input_number"),u.text("name","\u270F\uFE0F Anzeigename (optional)")],addLabel:"Sensor hinzuf\xFCgen",newItem:()=>({entity:""})};return o`${this.form(e)}
      ${this.list({key:"actuators",rowSchema:t,title:"\u{1F50C} Aktoren (Kacheln, 4 nebeneinander)",addLabel:"Aktor hinzuf\xFCgen",newItem:()=>({entity:""})})}
      ${this.list({key:"plants",rowSchema:i,title:"\u{1F331} Pflanzen (Tabs in der Karte)",child:n,addLabel:"Pflanze hinzuf\xFCgen",newItem:()=>({name:""})})}
      ${this.styleSection()}
      <div class="hint">
        <b>Temperatur &amp; Feuchtigkeit</b> werden als Mini-Verlauf gezeigt, <b>pH &amp; EC</b> als
        Zonen-Balken. W\u00e4hlst du dort ein <code>input_number</code> (oder <code>number</code>),
        erscheint ein <b>\u2212/\uff0b-Stepper</b> zum Setzen \u2013 ideal f\u00fcr Handmessungen ohne Sonde.<br>
        <b>Gr\u00fcner Bereich</b> = Idealbereich. Den akzeptablen (gelben) Bereich kannst du optional
        zus\u00e4tzlich setzen \u2013 l\u00e4sst du ihn leer, gilt der gr\u00fcne Bereich (alles au\u00dferhalb = rot).
        pH-Skala 4\u20138, EC-Skala 0\u20133.<br>
        Entity-IDs werden automatisch abgeleitet
        (z.B. <code>switch.growctrl_gross_main1_automatik</code>); Abweichungen per YAML
        <code>overrides: { automatik: switch.mein_schalter }</code>.
      </div>`}};customElements.define("growctrl-station-editor",Rt);var Ye=["Seedling","Veg","Bloom","Flush","Trocknung"],Pe={Seedling:"Anzucht",Veg:"Wachstum",Bloom:"Bl\xFCte",Flush:"Sp\xFClen",Trocknung:"Ernte"},ti={Seedling:"pd-seed",Veg:"pd-veg",Bloom:"pd-bloom",Flush:"pd-flush",Trocknung:"pd-dry"},ei={light:"mdi:lightbulb",heat:"mdi:radiator",water:"mdi:air-humidifier",pump:"mdi:water-pump",fan:"mdi:fan",o2:"mdi:scuba-tank"},It=class extends ${constructor(){super(...arguments);this._open=!1;this._tab=0;this._phase=!1;this._spark={}}static{this.styles=A}static{this.properties={...$.properties,_open:{state:!0},_tab:{state:!0},_spark:{state:!0},_phase:{state:!0}}}updated(t){if(super.updated?.(t),!t.has("hass")&&!t.has("_config"))return;(this._config?.plants??[]).flatMap(s=>this.sensorsFor(s).filter(r=>r.anzeige==="graph")).forEach(async s=>{let r=await M(this.hass,s.entity,s.hours??24);r.length&&this._spark[s.entity]?.length!==r.length&&(this._spark={...this._spark,[s.entity]:r})})}validateConfig(t){if(!t.tent||!t.station)throw new Error("growctrl-station-card: 'tent' und 'station' sind Pflicht (wie in der Integration angelegt).")}static getConfigElement(){return document.createElement("growctrl-station-editor")}static getStubConfig(){return{tent:"gross",station:"main1"}}get isPreview(){return!this.hass?.states?.[this.e("stage")]}e(t){let[i,n,s]=mt[t],r=this._config;return r.overrides?.[n]??L(this.hass,r.tent,r.station,s)??D(i,r.tent,r.station,n,r.overrides)}_select(t,i){this.hass.callService("select","select_option",{entity_id:t,option:i})}render(){let t=this._config;if(!this.hass)return h;let i=this.isPreview,n=this.st(this.e("stage"))??"Veg",s=Lt[n]??Lt.Veg,r=this.isOn(this.e("auto"))||i,c=this.isOn(this.e("wartung")),d=[{e:this.e("pOverride"),label:"Manueller Eingriff",crit:!1},{e:this.e("pFailsafe"),label:"Licht-Failsafe",crit:!0},{e:this.e("pTime"),label:"Zeiten unvollst\xE4ndig",crit:!1},{e:this.e("pPump"),label:"Pumpe gesperrt (F\xFCllstand)",crit:!1},{e:this.e("pPower"),label:"Licht ohne Leistung",crit:!0}].filter(x=>this.isOn(x.e)),l=this.hass.states[this.e("event")],p=d.length?d.some(x=>x.crit)?"critical":"warning":l?.attributes?.schweregrad==="critical"?"warning":"ok",g=c?this.t("Wartung aktiv"):p==="critical"?this.t("Kritisch"):p==="warning"?this.t("Warnung"):this.t("Alles OK");return o`<div class="card ${t.style?.glass?"glass":""}" data-level=${p} style="${S(t.style)};position:relative">

      <div class="hd">
        <div class="grow" style="min-width:0">
          <div class="ttl">${t.name??`${t.tent} \xB7 ${t.station}`}</div>
          <div class="sub" style="display:flex;align-items:center;gap:7px">
            <span style="width:7px;height:7px;border-radius:50%;flex-shrink:0;
              background:${p==="critical"?m.crit:p==="warning"?m.warn:m.ok};
              box-shadow:0 0 8px currentColor;color:${p==="critical"?m.crit:p==="warning"?m.warn:m.ok}"></span>
            ${g}
          </div>
        </div>
        <button class="gc icbtn ${c?"on":""}" title=${this.t("Wartung (System greift nicht ein)")}
          @click=${()=>this.toggle(this.e("wartung"))}>
          <ha-icon icon="mdi:wrench-outline" style="--mdc-icon-size:16px"></ha-icon></button>
        ${t.show_settings!==!1?o`<button class="gc icbtn" title=${this.t("Einstellungen")} @click=${()=>{this._open=!this._open}}>
          <ha-icon icon="mdi:tune-variant" style="--mdc-icon-size:16px"></ha-icon></button>`:h}
        <button class="gc chip-auto ${r?"":"off"}" @click=${()=>this.confirmToggle(this.e("auto"),this.t("Automatik"))}>
          AUTO ${r?this.t("AN"):this.t("AUS")}</button>
      </div>

      <div style="margin-bottom:10px">${this.phaseDropdown(n,s)}</div>
      ${this.lightRow()}
      ${this.pumpRow(i)}
      ${this.dliRow(i)}
      ${this.actuators()}
      ${this.tankRow()}
      ${this.plantTabs()}

      ${d.length?o`<div style="display:flex;gap:7px;flex-wrap:wrap;margin-top:12px">
        ${d.map(x=>o`<span class="pbadge ${x.crit?"crit":"warn"}">
          <ha-icon icon="mdi:alert" style="--mdc-icon-size:12px"></ha-icon>${this.t(x.label)}</span>`)}</div>`:h}

      ${t.show_event!==!1&&l?o`
        <button class="gc event" style="margin-top:14px" @click=${()=>this.moreInfo(this.e("event"))}>
          <span class="edot" style="background:${l.attributes?.schweregrad==="critical"?m.crit:l.attributes?.schweregrad==="warning"?m.warn:m.info}"></span>
          <span class="etx">${l.state}</span>
          <span class="etm">${l.last_changed?new Date(l.last_changed).toLocaleTimeString("de-DE",{hour:"2-digit",minute:"2-digit"}):""}</span>
        </button>`:h}

      ${this._open?o`<div class="settings-grid" style="margin-top:12px">
        ${this.setting(this.e("lightOn"),"Licht AN")}
        ${this.setting(this.e("lightOffSv"),"AUS Seed/Veg")}
        ${this.setting(this.e("lightOffBloom"),"AUS Bloom")}
        ${this.setting(this.e("germination"),"Keimstart")}
        ${this.setting(this.e("overrideMin"),"Man. \xDCbernahme")}
      </div>`:h}
      ${this.renderConfirm()}
    </div>`}setting(t,i){return o`<button class="gc skv" @click=${()=>this.moreInfo(t)}>
      <div class="k">${this.t(i)}</div><div class="vv">${this.st(t)??"\u2013"}</div></button>`}phaseDropdown(t,i){let n=this.hass.states[this.e("rec")],s=n?.state&&n.state!==t?n.state:null;return o`<div class="dd ${this._phase?"open":""}">
      <button class="gc dd-btn" aria-haspopup="listbox" aria-expanded=${this._phase} @click=${()=>{this._phase=!this._phase}}>
        <span class="pdot" style="background:${i.color};color:${i.color}"></span>${this.t(t)}
        <span class="hint">${this.t(Pe[t]??"")}${s?" \xB7 "+this.t("Richtwert")+" "+this.t(s):""}</span>
        <ha-icon icon="mdi:chevron-down" style="--mdc-icon-size:16px;color:var(--tx-3);transition:transform .2s;${this._phase?"transform:rotate(180deg)":""}"></ha-icon>
      </button>
      ${this._phase?o`<div class="dd-menu" role="listbox">
        ${Ye.map(r=>o`<button class="gc dd-it" role="option" aria-selected=${r===t}
          @click=${()=>{this._select(this.e("stage"),r),this._phase=!1}}>
          <span class="pdot ${ti[r]}"></span>${this.t(r)}<span class="hint">${this.t(Pe[r]??"")}</span></button>`)}
      </div>`:h}
    </div>`}supplyRow(t){return o`<button class="gc supply" style="${t.topMargin?"margin-top:8px":""}" @click=${t.onClick??(()=>{})}>
      <span class="shd">
        <span class="sic" style="color:${t.iconColor};${t.glow?`filter:drop-shadow(0 0 7px ${t.iconColor})`:""}">
          <ha-icon icon="${t.icon}" style="--mdc-icon-size:20px"></ha-icon></span>
        <span class="stt">${t.title}</span>
        <span class="stm" style="color:${t.valueColor}">${t.value}</span>
      </span>
      ${t.fillPct!==null&&t.fillPct!==void 0?o`
        <span class="bar"><i style="width:${Math.min(100,Math.max(0,t.fillPct))}%;
          background:linear-gradient(90deg, ${t.fillColor}, ${t.fillColor}cc);box-shadow:0 0 9px ${t.fillColor}55"></i>
          ${t.minPct!==void 0?o`<span class="min" style="left:${t.minPct}%"></span>`:h}</span>`:h}
      ${t.footL||t.footR?o`<span class="sft"><span>${t.footL??""}</span><span>${t.footR??""}</span></span>`:h}
    </button>`}lightRow(){if(this.isPreview)return this.supplyRow({icon:"mdi:lightbulb-on",iconColor:m.light,glow:!0,title:this.t("Licht an"),value:"5 h 40 min",valueColor:m.light,fillPct:62,fillColor:m.light,footL:this.t("Leuchtphase"),footR:`62 % ${this.t("verbleibend")}`});let t=this.hass.states[this.e("lightRest")];if(!t)return h;let i=t.attributes??{},n=i.zustand?i.zustand==="an":void 0,s=Number(t.state),r=isNaN(s)?"\u2013":zt(s),c=typeof i.anteil=="number"?Math.min(1,Math.max(0,i.anteil)):null,d=n===!1?"#7E9488":m.light;return this.supplyRow({icon:n===!1?"mdi:lightbulb-outline":"mdi:lightbulb-on",iconColor:d,glow:n!==!1,title:n===!1?this.t("Licht aus"):this.t("Licht an"),value:n===!1?"\u2013":r,valueColor:d,fillPct:n===!1?null:c!==null?c*100:null,fillColor:d,footL:n===!1?this.t("Licht ausgeschaltet"):this.t("Leuchtphase"),footR:n===!1?"":c!==null?`${(c*100).toFixed(0)} % ${this.t("verbleibend")}`:"",onClick:()=>this.moreInfo(this.e("lightRest"))})}pumpRow(t){let i=this.hass.states[this.e("pumpRest")];if(!i&&!t)return h;if(t)return this.supplyRow({icon:"mdi:water-pump",iconColor:m.water,topMargin:!0,title:this.t("Pumpe aus"),value:"in 12 min",valueColor:m.water,fillPct:80,fillColor:m.water,footL:this.t("N\xE4chster Zyklus"),footR:"80 %"});let n=Number(i.state),s=i.attributes??{},r=s.aktiv===!1,c=typeof s.anteil=="number"?Math.min(1,Math.max(0,s.anteil)):null,d=s.zustand?s.zustand==="an":void 0;return this.supplyRow({icon:r?"mdi:water-pump-off":"mdi:water-pump",iconColor:r?"#7E9488":m.water,topMargin:!0,title:r?this.t("Pumpe aus"):d?this.t("Pumpe l\xE4uft"):this.t("Pumpe aus"),value:r||isNaN(n)?"\u2013":zt(n),valueColor:r?"#7E9488":m.water,fillPct:r?null:c!==null?c*100:null,fillColor:m.water,footL:r?this.t("Pumpe ausgeschaltet"):s.text??this.t("Zyklus"),footR:r?"":c!==null?`${(c*100).toFixed(0)} %`:"",onClick:()=>this.moreInfo(this.e("pumpRest"))})}dliRow(t){let i=this.hass.states[this.e("dli")];if(!i&&!t)return h;let n=w(this.st(this.e("dli")))??(t?18.4:null),s=w(this.st(this.e("dliFc")))??(t?24.7:null),r=i?.attributes?.ziel_aktuelle_phase??(t?25:void 0),c=r&&n!==null?n/r*100:null,d=r&&s!==null?Math.min(100,s/r*100):void 0;return this.supplyRow({icon:"mdi:white-balance-sunny",iconColor:m.light,topMargin:!0,title:this.t("DLI heute"),value:n!==null?`${n.toFixed(1)}${r?` / ${r}`:""}`:"\u2013",valueColor:m.light,fillPct:c,fillColor:m.light,minPct:d,footL:s!==null?`${this.t("Prognose")} ${s.toFixed(1)} mol/m\xB2`:"",footR:r?this.t("Marker = Prognose"):"",onClick:()=>this.moreInfo(this.e("dli"))})}actuators(){let t=this._config.actuators??[];return t.length?o`
      <div class="seclbl">${this.t("Aktoren")}</div>
      <div class="acts">
        ${t.map(i=>{let n=this.isOn(i.entity),s=i.kind??"",r=i.icon??ei[s]??"mdi:power",c=i.name??this.friendly(i.entity);return o`<button class="gc act ${n?"on":""} ${n&&s?s:""}"
            @click=${()=>i.confirm?this.confirmToggle(i.entity,c):this.toggle(i.entity)}>
            <ha-icon class="aic" icon="${r}" style="--mdc-icon-size:18px"></ha-icon>
            <span class="anm">${c}</span>
            <span class="ast">${n?this.t("AN"):this.t("AUS")}</span></button>`})}
      </div>`:h}tankRow(){let t=this._config;if(!t.tank_entity)return h;let i=Math.min(100,Math.max(0,w(this.st(t.tank_entity))??0)),n=t.tank_min??30,s=i<n,r=s?m.crit:m.water,c=t.tank_volume;return this.supplyRow({icon:"mdi:car-coolant-level",iconColor:m.water,topMargin:!0,title:this.t("Tank"),value:`${i.toFixed(0)} %`,valueColor:r,fillPct:i,fillColor:r,minPct:n,footL:c?`\u2248 ${(i/100*c).toFixed(0)} l ${this.t("von")} ${c} l`:s?this.t("Unter Mindeststand"):"",footR:`${this.t("Min")} ${n} %`,onClick:()=>this.moreInfo(t.tank_entity)})}plantTabs(){let t=this._config,i=t.plants??[];if(!i.length)return h;let n=Math.min(this._tab,i.length-1),s=i[n],r=s.germination_helper?this.st(s.germination_helper):null,c=r?_e(r):null;return o`
      <div class="ptabs" style="margin-top:14px">
        ${i.map((d,l)=>o`<button class="gc ptab" role="tab" aria-selected=${l===n} @click=${()=>{this._tab=l}}>
          <ha-icon icon="mdi:sprout" style="--mdc-icon-size:15px"></ha-icon>${d.name}</button>`)}
      </div>
      <div class="plant">
        <div class="phd">
          ${s.image?o`<img class="pimg" src="${s.image}"/>`:o`<div class="pimg"><ha-icon icon="mdi:sprout" style="--mdc-icon-size:28px"></ha-icon></div>`}
          <div style="flex:1;min-width:0">
            <div class="pname">${s.name}${s.strain?o`<span class="pstrain" style="display:inline;margin:0 0 0 7px">\u00b7 ${s.strain}</span>`:h}</div>
            ${c!==null?o`<span class="agechip">${$e(c,t.age_format??"auto",this._lang)}</span>`:h}
          </div>
        </div>
        ${this.plantSensors(this.sensorsFor(s))}
        ${s.tank_entity?this.plantTankInd(s.tank_entity,s.tank_min??30):h}
      </div>`}sensorsFor(t){let i=[],n=(r,c,d,l)=>[typeof r=="number"?r:d?.[0]??l[0],typeof c=="number"?c:d?.[1]??l[1]];if(t.temp_entity&&i.push({entity:t.temp_entity,name:this.t("Temperatur"),anzeige:"graph",color:m.temp,icon:"mdi:thermometer",hours:24}),t.humidity_entity&&i.push({entity:t.humidity_entity,name:this.t("Feuchtigkeit"),anzeige:"graph",color:m.water,icon:"mdi:water-percent",hours:24}),t.ph_entity){let r=n(t.ph_ideal_min,t.ph_ideal_max,t.ph_ideal,[5.8,6.3]),c=n(t.ph_ok_min,t.ph_ok_max,t.ph_ok,r);i.push({entity:t.ph_entity,name:"pH",anzeige:"zone",min:4,max:8,ok:c,ideal:r})}if(t.ec_entity){let r=n(t.ec_ideal_min,t.ec_ideal_max,t.ec_ideal,[1.2,2.2]),c=n(t.ec_ok_min,t.ec_ok_max,t.ec_ok,r);i.push({entity:t.ec_entity,name:"EC",anzeige:"zone",min:0,max:3,ok:c,ideal:r})}let s=(t.sensors??[]).map(r=>typeof r=="string"?{entity:r}:r);return[...i,...s]}plantSensors(t){return t.length?o`${t.map(i=>this.sensorInd(i))}`:h}zoneV6(t,i,n,s,r,c){let d=n-i||1,l=(x,f)=>Math.max(0,(Math.min(f,n)-Math.max(x,i))/d*100),p=[{cls:"z-bad",w:l(i,s[0])},{cls:"z-low",w:l(s[0],r[0])},{cls:"z-ok",w:l(r[0],r[1])},{cls:"z-high",w:l(r[1],s[1])},{cls:"z-bad",w:l(s[1],n)}],g=t!==null?Math.min(100,Math.max(0,(t-i)/d*100)):null;return o`
      <span class="zones">
        ${p.map(x=>o`<i class="${x.cls}" style="width:${x.w}%"></i>`)}
        ${g!==null?o`<span class="zmark" style="left:${g}%"></span>`:h}
      </span>
      <span class="zlbl">
        <span style="width:30%;text-align:left">${i}</span>
        <span style="width:40%;color:#4CB87E;font-weight:800">${r[0]}\u2013${r[1]} ${this.t("ideal")}</span>
        <span style="width:30%;text-align:right">${n}</span>
      </span>`}sensorInd(t){let i=w(this.st(t.entity)),n=t.name??this.friendly(t.entity),s=this.unit(t.entity),r=t.anzeige??"wert",c=t.entity.split(".")[0],d=c==="number"||c==="input_number",l=this.hass.states[t.entity]?.attributes??{},p=t.step??(Number(l.step)||.1),g=l.min,x=l.max,f=(String(p).split(".")[1]??"").length||1,v=C=>{let T=C;g!==void 0&&(T=Math.max(g,T)),x!==void 0&&(T=Math.min(x,T)),this.hass.callService(c,"set_value",{entity_id:t.entity,value:Number(T.toFixed(f))})},y,k=t.ideal??[0,0],E=t.ok??k;if(r==="zone"){let C=i!==null&&i>=k[0]&&i<=k[1],T=i!==null&&i>=E[0]&&i<=E[1];y=t.color??(C?m.ok:T?m.warn:m.crit)}else r==="graph"?y=t.color??m.water:y=t.color??"rgba(242,247,243,.95)";let z=o`<div class="ihd">
      <span class="ilbl" style="color:${r==="wert"?"var(--tx-2)":y};cursor:pointer" @click=${()=>this.moreInfo(t.entity)}>
        ${t.icon?o`<ha-icon icon="${t.icon}" style="--mdc-icon-size:14px"></ha-icon>`:h}${n}
        ${d?o`<ha-icon icon="mdi:pencil" style="--mdc-icon-size:11px;opacity:.45;margin-left:3px"></ha-icon>`:h}
      </span>
      ${d?o`<span class="setrow">
            <button class="gc stepbtn" title=${this.t("weniger")} @click=${()=>i!==null&&v(i-p)}><ha-icon icon="mdi:minus" style="--mdc-icon-size:16px"></ha-icon></button>
            <span class="setval" style="color:${y}">${i!==null?i:"\u2013"}<span class="u">${s}</span></span>
            <button class="gc stepbtn" title=${this.t("mehr")} @click=${()=>v((i??g??0)+p)}><ha-icon icon="mdi:plus" style="--mdc-icon-size:16px"></ha-icon></button></span>`:o`<span class="ival" style="color:${y};cursor:pointer" @click=${()=>this.moreInfo(t.entity)}>
            ${i!==null?i:this.st(t.entity)??"\u2013"}<span class="u">${s}</span></span>`}
    </div>`,P=r==="zone"?this.zoneV6(i,t.min??0,t.max??14,E,k,s):r==="graph"?o`<div class="spark">${Ce(this._spark[t.entity]??[],y,this.chartW(74),38)}</div>`:h;return o`<div class="ind">${z}${P}</div>`}plantTankInd(t,i){let n=Math.min(100,Math.max(0,w(this.st(t))??0)),r=n<i?m.crit:m.water;return o`<button class="gc ind" @click=${()=>this.moreInfo(t)}>
      <div class="ihd"><span class="ilbl" style="color:${m.water}">
        <ha-icon icon="mdi:car-coolant-level" style="--mdc-icon-size:14px"></ha-icon>${this.t("Tank")}</span>
        <span class="ival" style="color:${r}">${n.toFixed(0)}<span class="u"> %</span></span></div>
      <span class="bar" style="margin-top:8px"><i style="width:${n}%;background:linear-gradient(90deg, ${r}, ${r}cc);box-shadow:0 0 9px ${r}55"></i>
        <span class="min" style="left:${i}%"></span></span>
    </button>`}};customElements.define("growctrl-station-card",It);var ii=[u.text("title","\u{1F3F7}\uFE0F Titel"),u.num("columns","\u25A6 Spalten",1,6)],ni=[u.entity("entity","\u{1F50C} Aktor",["switch","input_boolean","light","fan"]),u.text("name","\u270F\uFE0F Anzeigename (optional)"),u.text("group","\u{1F5C2}\uFE0F Gruppe (optional, z.B. Zelt / Pflanzen)"),u.select("kind","\u{1F3A8} Art (Farbe/Icon, optional)",[{value:"light",label:"Licht"},{value:"heat",label:"Heizung"},{value:"water",label:"Wasser / Befeuchter"},{value:"o2",label:"O\u2082"},{value:"fan",label:"L\xFCfter"},{value:"pump",label:"Pumpe"}]),u.bool("confirm","\u2705 Mit Best\xE4tigung schalten")],Nt=class extends _{render(){return o`${this.form(ii)}
      ${this.list({key:"controls",rowSchema:ni,title:"\u{1F50C} Aktoren",addLabel:"Aktor hinzuf\xFCgen",newItem:()=>({entity:""})})}
      ${this.styleSection()}
      <div class="hint">Gleiche <b>Gruppe</b> = gemeinsame \u00dcberschrift. <b>Art</b> setzt Farbe und Icon.
        <b>Best\u00e4tigung</b> fragt vor dem Schalten nach (z.B. f\u00fcr Pumpen).</div>`}};customElements.define("growctrl-controls-editor",Nt);var si={switch:"mdi:power",light:"mdi:lightbulb",fan:"mdi:fan",input_boolean:"mdi:toggle-switch"},ri={light:"mdi:lightbulb",heat:"mdi:radiator",water:"mdi:air-humidifier",o2:"mdi:scuba-tank",fan:"mdi:fan",pump:"mdi:water-pump"},Bt=class extends ${static{this.styles=A}validateConfig(e){if(!Array.isArray(e.controls)||!e.controls.length)throw new Error("growctrl-controls-card: 'controls' (min. 1 Eintrag) ist Pflicht.")}static getConfigElement(){return document.createElement("growctrl-controls-editor")}static getStubConfig(){return{controls:[{entity:"switch.beispiel"}]}}render(){let e=this._config;if(!this.hass)return h;let t=e.columns??4,i=new Map;return e.controls.forEach(n=>{let s=n.group??"";i.has(s)||i.set(s,[]),i.get(s).push(n)}),o`<div class="card ${e.style?.glass?"glass":""}" style="${S(e.style)};position:relative">
      ${e.title?o`<div class="hd"><div class="ttl">${e.title}</div></div>`:h}
      ${[...i.entries()].map(([n,s])=>o`
        ${n?o`<div class="seclbl">${n}</div>`:h}
        <div class="acts" style="grid-template-columns:repeat(${t},1fr); ${n?"":"margin-top:4px"}">
          ${s.map(r=>{let c=this.isOn(r.entity),d=r.name??this.friendly(r.entity),l=r.kind??"",p=l==="light"||l==="heat"||l==="water"?l:"",g=r.icon??this.hass.states[r.entity]?.attributes?.icon??ri[l]??si[r.entity.split(".")[0]]??"mdi:power";return o`<button class="gc act ${c?"on":""} ${c?p:""}"
              @click=${()=>r.confirm?this.confirmToggle(r.entity,d):this.toggle(r.entity)}>
              <ha-icon class="aic" icon=${g} style="--mdc-icon-size:18px"></ha-icon>
              <span class="anm">${d}</span>
              <span class="ast">${c?"AN":"AUS"}</span>
            </button>`})}
        </div>`)}
      ${this.renderConfirm()}
    </div>`}};customElements.define("growctrl-controls-card",Bt);var ai=[u.text("title","\u{1F3F7}\uFE0F Titel"),u.num("columns","\u25A6 Spalten",1,6)],oi=[u.entity("entity","\u{1F4C8} Sensor","sensor"),u.text("name","\u270F\uFE0F Anzeigename (optional)"),u.num("min","Sollbereich Min (optional)"),u.num("max","Sollbereich Max (optional)"),u.select("accent","\u{1F3A8} Akzentfarbe (optional)",[{value:"temp",label:"Temperatur (orange)"},{value:"hum",label:"Feuchte (blau)"},{value:"vpd",label:"VPD (Akzent)"}])],Dt=class extends _{render(){return o`${this.form(ai)}
      ${this.list({key:"sensors",rowSchema:oi,title:"\u{1F4C8} Sensoren",addLabel:"Sensor hinzuf\xFCgen",newItem:()=>({entity:""})})}
      ${this.styleSection()}
      <div class="hint">Jede Kachel zeigt den aktuellen Wert. <b>Anzeigename</b> \u00fcberschreibt den
        Entity-Namen. <b>Sollbereich</b> (Min/Max) blendet einen kleinen Soll-Hinweis ein.
        <b>Akzentfarbe</b> f\u00e4rbt den Wert passend ein.</div>`}};customElements.define("growctrl-sensors-editor",Dt);var Ht=class extends ${static{this.styles=A}validateConfig(e){if(!Array.isArray(e.sensors)||!e.sensors.length)throw new Error("growctrl-sensors-card: 'sensors' (min. 1 Eintrag) ist Pflicht.")}static getConfigElement(){return document.createElement("growctrl-sensors-editor")}static getStubConfig(){return{sensors:[{entity:"sensor.beispiel"}]}}bad(e,t){return e!==null&&(t.min!==void 0&&e<t.min||t.max!==void 0&&e>t.max)}render(){let e=this._config;if(!this.hass)return h;let t=e.columns??3,i=e.sensors.some(n=>this.bad(w(this.st(n.entity)),n));return o`<div class="card ${e.style?.glass?"glass":""}" data-level=${i?"warning":"ok"} style=${S(e.style)}>
      ${e.title?o`<div class="hd"><div class="ttl">${e.title}</div></div>`:h}
      <div class="kpis" style="grid-template-columns:repeat(${t},minmax(0,1fr))">
        ${e.sensors.map(n=>{let s=w(this.st(n.entity)),r=this.bad(s,n),c=n.name??this.friendly(n.entity),d=n.accent?`c-${n.accent}`:"";return o`<button class="gc kpi ${d}" @click=${()=>this.moreInfo(n.entity)}>
            <span class="mlbl" style="overflow:hidden; white-space:nowrap; text-overflow:ellipsis; display:block">${c}</span>
            <span class="v" style="${r?`color:${m.crit}`:""}">${s!==null?s:"--"}<span class="u">${this.unit(n.entity)}</span></span>
          </button>`})}
      </div>
    </div>`}};customElements.define("growctrl-sensors-card",Ht);var li=[u.text("title","\u{1F3F7}\uFE0F Titel"),u.num("limit","\u{1F4CB} Max. Zeilen",3,50),u.select("min_level","\u{1F50D} Anzeige",[{value:"alle",label:"Alle Ereignisse"},{value:"warnung",label:"Nur Warnungen/Fehler"},{value:"info",label:"Nur Infos"}])],ci=[u.entity("entity","\u{1F4DC} Letztes-Ereignis-Sensor","sensor"),u.text("name","\u270F\uFE0F Label (optional)")],Ut=class extends _{render(){return o`${this.form(li)}
      ${this.list({key:"sources",rowSchema:ci,title:"\u{1F4E1} Quellen",addLabel:"Quelle hinzuf\xFCgen",newItem:()=>({entity:""})})}
      ${this.styleSection()}
      <div class="hint">Sammelt die Ereignisse mehrerer GROWCTRL-Sensoren in ein Protokoll, neueste zuerst.
        <b>Label</b> ersetzt den Quellennamen. <b>Anzeige</b> kann auf Warnungen/Fehler filtern.</div>`}};customElements.define("growctrl-status-editor",Ut);var Vt=class extends ${static{this.styles=A}validateConfig(e){if(!Array.isArray(e.sources)||!e.sources.length)throw new Error("growctrl-status-card: 'sources' (Letztes-Ereignis-Sensoren) ist Pflicht.")}static getConfigElement(){return document.createElement("growctrl-status-editor")}static getStubConfig(){return{sources:[{entity:"sensor.growctrl_gross_main1_letztes_ereignis"}]}}render(){let e=this._config;if(!this.hass)return h;let t=[],i=[];for(let p of e.sources){let g=this.hass.states[p.entity],x=g?.attributes?.verlauf??[];i.push(g?.attributes?.schweregrad??"ok"),x.forEach((f,v)=>t.push({ts:f.ts,t:typeof f.t=="number"?f.t:void 0,text:f.text,level:f.level,src:p.name??this.friendly(p.entity),entity:p.entity,_i:v}))}t.sort((p,g)=>{let x=p.t??-1,f=g.t??-1;return x!==f?f-x:(g._i??0)-(p._i??0)});let s=(e.min_level==="warnung"?t.filter(p=>p.level==="warning"||p.level==="critical"):e.min_level==="info"?t.filter(p=>p.level==="info"):t).slice(0,e.limit??12),r=G(i),c=e.sources.length>1,d=p=>p==="critical"?"c":p==="warning"?"w":p==="info"?"i":"",l=r==="ok"?this.t("Info"):r==="warning"?this.t("Warnung"):r==="critical"?this.t("Kritisch"):this.t("Info");return o`<div class="card ${e.style?.glass?"glass":""}" data-level=${r} style=${S(e.style)}>
      <div class="hd">
        <div class="ttl grow">${e.title??this.t("Ereignisprotokoll")}</div>
        <span class="pill ${R(r)}">${l}</span>
      </div>
      <div class="log">
        ${s.length?s.map(p=>o`
          <button class="gc lrow ${d(p.level)}" @click=${()=>p.entity&&this.moreInfo(p.entity)}>
            <span class="tm">${p.ts}</span>
            ${c?o`<span class="who">${p.src}</span>`:h}
            <span class="what">${p.text}</span>
          </button>`):o`<div class="lrow"><span class="what" style="color:var(--acc)">\u2713 ${this.t("Noch keine Ereignisse")}</span></div>`}
      </div>
    </div>`}};customElements.define("growctrl-status-card",Vt);var di=[u.text("title","\u{1F3F7}\uFE0F Titel (optional)"),u.text("logo","\u{1F5BC}\uFE0F Logo-URL (z.B. /local/growctrl/logo.png)"),u.bool("show_chart","\u{1F4C8} 24h-Chart zus\xE4tzlich zum Zonen-Balken"),u.num("hours","\u23F1\uFE0F Chart-Zeitraum (h)",1,168)],Wt=class extends _{render(){let e=[this.stationSelect(this._config?.tent),u.text("name","\u270F\uFE0F Anzeigename (optional)")];return o`${this.form([this.tentSelect("tent","\u{1F3D5}\uFE0F Zelt"),...di])}
      ${this.list({key:"stations",rowSchema:e,title:"\u{1F331} Stationen (Informationssystem)",addLabel:"Station hinzuf\xFCgen",newItem:()=>({station:""})})}
      ${this.styleSection()}
      <div class="hint">Die Hero-Karte ist die Zelt-\u00dcbersicht: Klima-Werte, VPD-Skala und das
        Informationssystem. Die gelisteten <b>Stationen</b> liefern die Ereigniszeilen darunter.</div>`}};customElements.define("growctrl-hero-editor",Wt);var Fe=[{w:20,col:"#6E97DE",lbl:"zu feucht"},{w:20,col:"#58E0A5",lbl:"Seedling"},{w:20,col:"#2FB36C",lbl:"Veg"},{w:20,col:"#E5B567",lbl:"Bloom"},{w:20,col:"#D4726F",lbl:"zu trocken"}],Kt=2,Zt=class extends ${constructor(){super(...arguments);this._logoErr=!1;this._hist=[]}static{this.styles=A}static{this.properties={...$.properties,_hist:{state:!0},_logoErr:{state:!0}}}validateConfig(t){if(!t.tent)throw new Error("growctrl-hero-card: 'tent' ist Pflicht (Zelt-Name aus der Integration).")}static getConfigElement(){return document.createElement("growctrl-hero-editor")}static getStubConfig(){return{tent:"gross",stations:[{station:"main1"}]}}te(t){let[i,n,s]=q[t],r=this._config;return r.overrides?.[n]??L(this.hass,r.tent,"zelt",s)??j(i,r.tent,n,r.overrides)}connectedCallback(){super.connectedCallback(),this._load(),this._timer=window.setInterval(()=>this._load(),5*6e4)}disconnectedCallback(){super.disconnectedCallback(),this._timer&&clearInterval(this._timer)}async _load(){if(!this.hass){setTimeout(()=>this._load(),1e3);return}this._hist=await M(this.hass,this.te("vpd"),this._config.hours??24)}tglBtn(t,i,n){return o`<button class="gc tgl ${n?"on":""}" @click=${()=>this.confirmToggle(t,i)}>
      <span class="sw"></span> ${i}</button>`}render(){let t=this._config;if(!this.hass)return h;let i=this.hass.states[this.te("vpd")],n=!i&&!this.hass.states[this.te("enabled")],s=w(i?.state)??(n?.76:null),r=i?.attributes?.temp??(n?21.5:null),c=i?.attributes?.rh??(n?61:null),d=i?.attributes?.phase_effektiv??"",l=i?.attributes?.sollwerte,p=this.isOn(this.te("enabled"))||n,g=this.isOn(this.te("climate")),x=this.hass.states[this.te("status")],f=x?.attributes?.probleme??[],v=(t.stations??[]).map(b=>{let rt=this.hass.states[L(this.hass,t.tent,b.station,"last_event")??D("sensor",t.tent,b.station,"letztes_ereignis",t.overrides)],at=this.hass.states[L(this.hass,t.tent,b.station,"light_rest")??D("sensor",t.tent,b.station,"licht_restzeit",t.overrides)],Oe=rt?.attributes?.schweregrad??"ok";return{name:b.name??b.station,text:rt?.state??"\u2013",level:Oe,lightText:at?.attributes?.text??(at?.state?`${this.t("Licht")} ${this.t(String(at.attributes?.zustand??""))}`:""),on:at?.attributes?.zustand==="an",ent:L(this.hass,t.tent,b.station,"last_event")??D("sensor",t.tent,b.station,"letztes_ereignis",t.overrides)}}),y=b=>b==="warning"||b==="critical",k=G([(x?.state??"").toLowerCase()==="problem"?"warning":"ok",...v.map(b=>y(b.level)?b.level:"ok")]),E=[...f.map(b=>({label:b,level:"warning"})),...v.filter(b=>y(b.level)).map(b=>({label:`${b.name}: ${b.text}`,level:b.level}))],z=s!==null&&l&&s>=l.vpd_min&&s<=l.vpd_max,P=s!==null?Math.min(100,Math.max(0,s/Kt*100)):null,C=i?.attributes?.temp_entity||this.te("vpd"),T=i?.attributes?.rh_entity||this.te("vpd");return o`<div class="card ${t.style?.glass?"glass":""}" data-level=${k} style="${S(t.style)};position:relative">
      <div class="hd">
        ${t.logo&&!this._logoErr?o`<img src=${t.logo} alt="Logo" @error=${()=>{this._logoErr=!0}}
              style="width:46px;height:46px;border-radius:16px;object-fit:contain;background:rgba(255,255,255,.92);padding:3px;flex-shrink:0" />`:o`<div class="badge-ic"><ha-icon icon="mdi:sprout" style="--mdc-icon-size:22px"></ha-icon></div>`}
        <div class="grow" style="min-width:0">
          <div class="ttl">${t.title??`Growroom \xB7 ${t.tent}`}</div>
          ${d?o`<div class="sub">${this.t("Klima-Phase")} ${this.t(d)}</div>`:h}
        </div>
        <span class="pill ${R(k)}">${k==="ok"?this.t("Alles OK"):k==="warning"?this.t("Warnung"):k==="critical"?this.t("Kritisch"):this.t("Info")}</span>
      </div>

      <div style="display:flex; gap:8px; margin-bottom:16px; flex-wrap:wrap">
        ${this.tglBtn(this.te("enabled"),this.t("Zelt"),p)}
        ${this.tglBtn(this.te("climate"),this.t("Klima"),g)}
      </div>

      <div class="kpis">
        <button class="gc kpi c-temp" @click=${()=>this.moreInfo(C)}>
          <span class="mlbl">${this.t("Temperatur")}</span><span class="v">${r!=null?Number(r).toFixed(1):"\u2013"}<span class="u">°C</span></span></button>
        <button class="gc kpi c-hum" @click=${()=>this.moreInfo(T)}>
          <span class="mlbl">${this.t("Luftfeuchte")}</span><span class="v">${c!=null?Math.round(Number(c)):"\u2013"}<span class="u">%</span></span></button>
        <button class="gc kpi c-vpd" @click=${()=>this.moreInfo(this.te("vpd"))}>
          <span class="mlbl">VPD</span><span class="v" style="${s!==null&&!z?`color:${m.warn}`:""}">${s!==null?s.toFixed(2):"\u2013"}<span class="u">kPa</span></span></button>
      </div>

      <div style="margin-top:16px">
        <div class="zones">
          ${Fe.map(b=>o`<i style="width:${b.w}%;background:${b.col}"></i>`)}
          ${l?o`<span class="zband" style="left:${l.vpd_min/Kt*100}%;width:${(l.vpd_max-l.vpd_min)/Kt*100}%"></span>`:h}
          ${P!==null?o`<span class="zmark" style="left:${P}%"></span>`:h}
        </div>
        <div class="zlbl">${Fe.map(b=>o`<span style="width:${b.w}%">${this.t(b.lbl)}</span>`)}</div>
      </div>

      ${t.show_chart===!0&&this._hist.length>1?o`
        <div class="seclbl">VPD · ${t.hours??24}h</div>
        ${B([{data:this._hist,color:z===!1?m.warn:m.ok,fill:!0}],{w:this.chartW(),h:96,band:l?{min:l.vpd_min,max:l.vpd_max}:void 0,grid:3})}`:h}

      ${v.length?o`<div class="seclbl">${this.t("Stationen")}</div>
        <div style="display:flex; flex-direction:column; gap:7px">
          ${v.map(b=>o`<button class="gc supply" @click=${()=>b.ent&&this.moreInfo(b.ent)}>
            <span class="shd">
              <span class="sic" style="color:${b.on?m.light:"var(--tx-3)"}"><ha-icon icon="mdi:lightbulb${b.on?"-on":"-outline"}" style="--mdc-icon-size:18px"></ha-icon></span>
              <span class="stt">${b.name}</span>
              <span class="stm" style="color:${y(b.level)?b.level==="critical"?m.crit:m.warn:m.ok};font-size:12px">${y(b.level)?b.level==="critical"?this.t("Fehler"):this.t("Warnung"):this.t("OK")}</span>
            </span>
            <span class="sft"><span>${b.lightText||b.text}</span><span></span></span>
          </button>`)}
        </div>`:h}

      <div class="seclbl">${this.t("Informationssystem")}</div>
      ${E.length?o`<div style="display:flex; flex-direction:column; gap:7px">
            ${E.map(b=>o`<div class="event" style="cursor:default">
              <span class="edot" style="background:${b.level==="critical"?m.crit:m.warn}"></span>
              <span class="etx" style="color:${b.level==="critical"?m.crit:m.warn}">${b.label}</span></div>`)}
          </div>`:o`<div class="event" style="cursor:default">
            <span class="edot" style="background:${m.ok};box-shadow:0 0 6px ${m.ok}"></span>
            <span class="etx" style="color:${m.ok}">${this.t("Alle Systeme arbeiten normal")}</span></div>`}
      ${this.renderConfirm()}
    </div>`}};customElements.define("growctrl-hero-card",Zt);var Gt=class extends _{render(){let e=this._config.tent,t=[this.tentSelect("tent","\u{1F3D5}\uFE0F Zelt"),u.text("title","\u{1F3F7}\uFE0F Titel"),u.bool("show_tent_row","\u{1F3D5}\uFE0F Zelt-Sektion zeigen (Aktiv/Klima/VPD/Status)"),u.text("tent_name","\u270F\uFE0F Name der Zelt-Zeile (optional)")],i=[this.stationSelect(e,"station","\u{1F331} Station"),u.text("name","\u270F\uFE0F Anzeigename (optional)")];return o`${this.form(t)}
      ${this.list({key:"stations",rowSchema:i,title:"\u{1F331} Stationen",addLabel:"Station hinzuf\xFCgen",newItem:()=>({station:""})})}
      ${this.styleSection()}
      <div class="hint">Zwei Ampel-Sektionen: <b>Stationen</b> (Licht / Pumpe / Auto / Eingriff / Status) und
        <b>Zelt</b> (Aktiv / Klima / VPD / Status). Ein <b>grauer</b> Punkt bedeutet \u201enicht aktiv / nicht
        relevant\u201c, gr\u00fcn = OK, gelb = Warnung, rot = kritisch. Tippen \u00f6ffnet die Entit\u00e4t.</div>`}};customElements.define("growctrl-checkup-editor",Gt);var jt=class extends ${static{this.styles=A}validateConfig(e){if((!Array.isArray(e.stations)||!e.stations.length)&&(!Array.isArray(e.rows)||!e.rows.length))throw new Error("growctrl-checkup-card: 'stations' (min. 1) ist Pflicht.")}static getConfigElement(){return document.createElement("growctrl-checkup-editor")}static getStubConfig(){return{tent:"gross",show_tent_row:!0,stations:[{station:"main1"},{station:"main2"}]}}sEnt(e,t,i){let[n,s,r]=mt[i];return L(this.hass,e,t,r)??D(n,e,t,s)}tEnt(e,t){let[i,n,s]=q[t];return L(this.hass,e,"zelt",s)??j(i,e,n)}stationCells(e,t){let i=this.hass.states[this.sEnt(e,t,"lightRest")],n=i?.attributes?.zustand==="an",s=this.isOn(this.sEnt(e,t,"pFailsafe")),r=this.isOn(this.sEnt(e,t,"pPower"))||this.isOn(this.sEnt(e,t,"pTime")),c=s?"critical":r?"warning":i&&n?"ok":"off",d=s?this.t("Licht-Failsafe ausgel\xF6st"):this.isOn(this.sEnt(e,t,"pPower"))?this.t("Licht AN ohne Leistung"):this.isOn(this.sEnt(e,t,"pTime"))?this.t("Lichtzeiten unvollst\xE4ndig"):i?n?this.t("Licht an"):i.attributes?.aktiv===!1?this.t("Licht ausgeschaltet"):this.t("Licht aus"):"\u2014",l=this.isOn(this.sEnt(e,t,"pPump")),p=this.hass.states[this.sEnt(e,t,"pumpRest")],g=l?"critical":p?"ok":"off",x=l?this.t("Pumpe gesperrt (F\xFCllstand)"):p?p.attributes?.aktiv===!1?this.t("Pumpe ausgeschaltet"):p.attributes?.text??this.t("Zyklus l\xE4uft"):"\u2014",f=this.isOn(this.sEnt(e,t,"auto")),v=this.isOn(this.sEnt(e,t,"wartung")),y=v?"info":f?"ok":"warning",k=v?this.t("Wartungsmodus aktiv"):f?this.t("Automatik AN"):this.t("Automatik AUS (manuell)"),E=this.isOn(this.sEnt(e,t,"pOverride")),z=E?"warning":"ok",P=E?this.t("Manueller Eingriff aktiv"):this.t("Kein Eingriff"),C=this.hass.states[this.sEnt(e,t,"event")],T=C?.attributes?.schweregrad??"ok",b=T==="critical"?"critical":T==="warning"?"warning":"ok",rt=C?.state??"OK";return{licht:c,pumpe:g,auto:y,eingriff:z,status:b,lichtText:d,pumpeText:x,autoText:k,eingriffText:P,statusText:rt,ent:{licht:this.sEnt(e,t,"lightRest"),pumpe:this.sEnt(e,t,"pumpRest"),auto:this.sEnt(e,t,"auto"),eingriff:this.sEnt(e,t,"pOverride"),status:this.sEnt(e,t,"event")}}}tentCells(e){let t=this.isOn(this.tEnt(e,"enabled")),i=t?"ok":"warning",n=t?this.t("Zelt aktiv"):this.t("Zelt deaktiviert"),s=this.isOn(this.tEnt(e,"climate")),r=s?"ok":"off",c=s?this.t("Klima-Automatik AN"):this.t("Klima-Automatik AUS"),d=this.hass.states[this.tEnt(e,"vpd")],l=w(d?.state),p=d?.attributes?.sollwerte,g=l!==null&&p?l>=p.vpd_min&&l<=p.vpd_max?"ok":"warning":d?"ok":"off",x=l!==null?`VPD ${l.toFixed(2)} kPa${p?` (${this.t("Soll")} ${p.vpd_min}\u2013${p.vpd_max})`:""}`:"\u2014",f=this.hass.states[this.tEnt(e,"status")],v=(f?.state??"").toLowerCase()==="problem",y=f?.attributes?.probleme??[],k=v?"warning":"ok",E=v?y[0]??this.t("Problem erkannt"):this.t("Alles OK");return{aktiv:i,klima:r,vpd:g,status:k,aktivText:n,klimaText:c,vpdText:x,statusText:E,ent:{aktiv:this.tEnt(e,"enabled"),klima:this.tEnt(e,"climate"),vpd:this.tEnt(e,"vpd"),status:this.tEnt(e,"status")}}}dot(e){return o`<span class="dot ${e==="off"?"off":R(e)}"></span>`}mc(e,t,i){return o`<button class="gc mc" title=${t} @click=${()=>i&&this.moreInfo(i)}>${this.dot(e)}</button>`}mh(e,t){return o`<span class="mh" title=${this.t(t)}><ha-icon icon=${e}></ha-icon></span>`}render(){let e=this._config;if(!this.hass)return h;let t=(e.stations??[]).map(l=>({tent:l.tent??e.tent??"gross",station:l.station,name:l.name??l.station})),i=e.tent??t[0]?.tent??"gross",n=e.show_tent_row!==!1,s=[],r=t.map(l=>{let p=this.stationCells(l.tent,l.station);return s.push(p.status,p.pumpe,p.licht,p.auto,p.eingriff),{...l,...p}}),c=n?this.tentCells(i):null;c&&s.push(c.status,c.aktiv,c.vpd);let d=G(s);return o`<div class="card ${e.style?.glass?"glass":""}" data-level=${d} style=${S(e.style)}>
      <div class="hd">
        <div class="grow">
          <div class="ttl">${e.title??this.t("Checkup")}</div>
          <div class="sub">${t.length} ${t.length===1?this.t("Station"):this.t("Stationen")}${n?` \xB7 1 ${this.t("Zelt")}`:""}</div>
        </div>
        <span class="pill ${R(d)}">${d==="ok"?this.t("Alles OK"):d==="warning"?this.t("Warnung"):d==="critical"?this.t("Kritisch"):this.t("Info")}</span>
      </div>

      <div class="seclbl" style="margin-top:2px">${this.t("Stationen")}</div>
      <div class="matrix m5">
        <span></span>
        ${this.mh("mdi:lightbulb-outline","Licht")}${this.mh("mdi:water-pump","Pumpe")}${this.mh("mdi:robot-outline","Auto")}${this.mh("mdi:hand-back-right-outline","Eingriff")}${this.mh("mdi:heart-pulse","Status")}
        ${r.map(l=>o`
          <div class="mn">${l.name}</div>
          ${this.mc(l.licht,l.lichtText,l.ent.licht)}
          ${this.mc(l.pumpe,l.pumpeText,l.ent.pumpe)}
          ${this.mc(l.auto,l.autoText,l.ent.auto)}
          ${this.mc(l.eingriff,l.eingriffText,l.ent.eingriff)}
          ${this.mc(l.status,l.statusText,l.ent.status)}`)}
      </div>

      ${c?o`
        <div class="seclbl">${this.t("Zelt")}</div>
        <div class="matrix m4">
          <span></span>
          ${this.mh("mdi:power","Aktiv")}${this.mh("mdi:air-conditioner","Klima")}${this.mh("mdi:water-percent","VPD")}${this.mh("mdi:heart-pulse","Status")}
          <div class="mn">${e.tent_name??`${this.t("Zelt")} ${i}`}</div>
          ${this.mc(c.aktiv,c.aktivText,c.ent.aktiv)}
          ${this.mc(c.klima,c.klimaText,c.ent.klima)}
          ${this.mc(c.vpd,c.vpdText,c.ent.vpd)}
          ${this.mc(c.status,c.statusText,c.ent.status)}
        </div>`:h}
    </div>`}};customElements.define("growctrl-checkup-card",jt);var pi=[u.text("title","\u{1F3F7}\uFE0F Titel"),u.entity("entity","\u{1F4A7} F\xFCllstand-Sensor (%) (Pflicht)","sensor"),u.num("min","\u26A0\uFE0F Mindeststand (%)",0,100),u.num("volume_l","\u{1FAA3} Tankvolumen (Liter, optional)",0,2e3)],qt=class extends _{render(){return o`${this.form(pi)}${this.styleSection()}
      <div class="hint">Der <b>F\u00fcllstand-Sensor</b> liefert Prozent. Unter dem <b>Mindeststand</b> wird der
        Tank rot. Mit <b>Tankvolumen</b> zeigt die Karte zus\u00e4tzlich die ungef\u00e4hren Liter an.</div>`}};customElements.define("growctrl-tank-editor",qt);var Qt=class extends ${static{this.styles=A}validateConfig(e){if(!e.entity)throw new Error("growctrl-tank-card: 'entity' (Fuellstand-Sensor in %) ist Pflicht.")}static getConfigElement(){return document.createElement("growctrl-tank-editor")}static getStubConfig(){return{entity:"sensor.gc_slot1_level1",title:"Tank",min:30,volume_l:200}}render(){let e=this._config;if(!this.hass)return h;let t=!this.hass.states[e.entity],i=Math.min(100,Math.max(0,w(this.st(e.entity))??(t?49:0))),n=e.min!==void 0&&i<e.min,s=n?m.crit:m.water,r=e.volume_l?i/100*e.volume_l:null;return o`<div class="card ${e.style?.glass?"glass":""}" data-level=${n?"critical":"ok"} style=${S(e.style)}>
      <div class="hd">
        <div class="ttl grow">${e.title??this.t("Tank")}</div>
        ${n?o`<span class="pill crit">Nachfüllen</span>`:h}
      </div>
      <div style="display:flex; gap:18px; align-items:center">
        <button class="gc tankv" @click=${()=>this.moreInfo(e.entity)}>
          ${e.min!==void 0?o`<span class="minl" style="bottom:${e.min}%"></span>`:h}
          <span class="fill" style="height:${i}%; background:linear-gradient(180deg, ${s}d9, ${s}80)"></span>
        </button>
        <button class="gc" style="flex:1; min-width:0; text-align:left" @click=${()=>this.moreInfo(e.entity)}>
          <span class="mlbl">Aktueller Füllstand</span>
          <div style="font:700 38px/1 var(--f-num); letter-spacing:-1.5px; color:${s}; margin-top:5px; font-variant-numeric:tabular-nums">
            ${Math.round(i)}<span style="font:600 14px var(--f-num); color:var(--tx-2); margin-left:2px">%</span></div>
          ${r!==null?o`<div style="margin-top:6px; font:700 12.5px var(--f-ui); color:var(--tx-2)">≈ ${r.toFixed(1)} l von ${e.volume_l} l</div>`:h}
          ${e.min!==void 0?o`<div style="font:700 10.5px var(--f-ui); color:var(--tx-3); margin-top:2px">Mindeststand ${e.min} %</div>`:h}
        </button>
      </div>
    </div>`}};customElements.define("growctrl-tank-card",Qt);var ui=[u.text("title","\u{1F3F7}\uFE0F Titel"),u.num("hours","\u23F1\uFE0F Zeitraum (h)",1,168),u.num("height","\u{1F4CF} Diagrammh\xF6he (px)",80,300)],hi=[u.entity("entity","\u{1F4C8} Sensor","sensor"),u.text("name","\u270F\uFE0F Anzeigename (optional)"),u.text("color","\u{1F3A8} Farbe (optional, z.B. #FF9F5A)")],Xt=class extends _{render(){return o`${this.form(ui)}
      ${this.list({key:"sensors",rowSchema:hi,title:"\u{1F4C9} Serien",addLabel:"Sensor hinzuf\xFCgen",newItem:()=>({entity:""})})}
      ${this.styleSection()}
      <div class="hint">Mehrere Serien werden in ein Diagramm gezeichnet (z.B. Temperatur + Luftfeuchte).
        <b>Farbe</b> als Hex-Wert; ohne Angabe automatisch.</div>`}};customElements.define("growctrl-history-editor",Xt);var Me=["#FFB98A","#7CC8F0","#7BE8A8","#C3ABF5"],Jt=class extends ${constructor(){super(...arguments);this._hist={}}static{this.styles=A}static{this.properties={...$.properties,_hist:{state:!0}}}validateConfig(t){if(!Array.isArray(t.sensors)||!t.sensors.length)throw new Error("growctrl-history-card: 'sensors' (min. 1 Eintrag) ist Pflicht.")}static getConfigElement(){return document.createElement("growctrl-history-editor")}static getStubConfig(){return{sensors:[{entity:"sensor.zelt_temperature"}],hours:24}}connectedCallback(){super.connectedCallback(),this._load(),this._timer=window.setInterval(()=>this._load(),5*6e4)}disconnectedCallback(){super.disconnectedCallback(),this._timer&&clearInterval(this._timer)}async _load(){if(!this.hass){setTimeout(()=>this._load(),1e3);return}let t=this._config,i={};for(let n of t.sensors)i[n.entity]=await M(this.hass,n.entity,t.hours??24);this._hist=i}render(){let t=this._config;if(!this.hass)return h;let i=t.sensors.map((n,s)=>({data:this._hist[n.entity]??[],color:n.color??Me[s%Me.length],name:n.name??this.friendly(n.entity),fill:t.sensors.length===1}));return o`<div class="card ${t.style?.glass?"glass":""}" style=${S(t.style)}>
      <div class="hd">
        <div class="ttl grow">${t.title??this.t("Verlauf")}</div>
        <button class="gc icbtn" style="width:auto; padding:0 13px; font:800 11px var(--f-num)">${t.hours??24}h</button>
      </div>
      ${B(i,{w:this.chartW(),h:t.height??120,grid:3})}
      <div class="legend">
        ${t.sensors.map((n,s)=>o`<span><i style="background:${i[s].color}"></i>${n.name??this.friendly(n.entity)} · ${w(this.st(n.entity))??"--"} ${this.unit(n.entity)}</span>`)}
      </div>
    </div>`}};customElements.define("growctrl-history-card",Jt);var mi=[u.text("title","\u{1F3F7}\uFE0F Titel"),u.entity("entity","\u{1F4C8} Sensor (Pflicht)","sensor"),u.text("name","\u270F\uFE0F Anzeigename (optional)"),u.num("min","Sollbereich Min"),u.num("max","Sollbereich Max"),u.num("decimals","\u{1F522} Nachkommastellen",0,4),u.num("hours","\u23F1\uFE0F Chart-Zeitraum (h)",1,168),u.num("height","\u{1F4CF} Diagrammh\xF6he (px)",80,300)],Yt=class extends _{render(){return o`${this.form(mi)}${this.styleSection()}
      <div class="hint">Zeigt einen Messwert gro\u00df mit Sollbereich und Verlauf. Ideal f\u00fcr <b>EC</b> oder
        <b>pH</b>. Liegt der Wert au\u00dferhalb von Min/Max, f\u00e4rbt sich die Anzeige als Warnung.</div>`}};customElements.define("growctrl-metric-editor",Yt);var te=class extends ${constructor(){super(...arguments);this._hist=[]}static{this.styles=A}static{this.properties={...$.properties,_hist:{state:!0}}}validateConfig(t){if(!t.entity)throw new Error("growctrl-metric-card: 'entity' ist Pflicht.")}static getConfigElement(){return document.createElement("growctrl-metric-editor")}static getStubConfig(){return{entity:"sensor.gc_slot1_ec1",name:"EC",min:1.2,max:2.2}}connectedCallback(){super.connectedCallback(),this._load(),this._timer=window.setInterval(()=>this._load(),5*6e4)}disconnectedCallback(){super.disconnectedCallback(),this._timer&&clearInterval(this._timer)}async _load(){if(!this.hass){setTimeout(()=>this._load(),1e3);return}let t=this._config;this._hist=await M(this.hass,t.entity,t.hours??24)}render(){let t=this._config;if(!this.hass)return h;let i=w(this.st(t.entity))??(this.hass.states[t.entity]?null:1.84),n=i!==null&&t.min!==void 0&&i<t.min,s=i!==null&&t.max!==void 0&&i>t.max,r=n||s,c=i===null?"var(--tx-3)":r?m.crit:m.ok,d=t.decimals??2,l=t.min!==void 0||t.max!==void 0;return o`<div class="card ${t.style?.glass?"glass":""}" data-level=${r?"warning":"ok"} style=${S(t.style)}>
      <div class="hd">
        <div class="grow" style="min-width:0">
          <span class="mlbl">${t.name??this.friendly(t.entity)}</span>
          <button class="gc" style="display:block; margin-top:4px" @click=${()=>this.moreInfo(t.entity)}>
            <span style="font:700 34px/1 var(--f-num); letter-spacing:-1.5px; color:${c}; font-variant-numeric:tabular-nums">
              ${i!==null?i.toFixed(d):"--"}</span>
            <span style="font:600 14px var(--f-num); color:var(--tx-2); margin-left:2px">${this.unit(t.entity)}</span>
          </button>
        </div>
        ${l?o`<div style="text-align:right; flex-shrink:0">
          <span class="mlbl">Sollbereich</span>
          <div style="font:700 13px var(--f-num); color:${r?m.crit:"var(--acc)"}; margin-top:3px">${t.min??"\u2013"} – ${t.max??"\u2013"}</div>
          ${r?o`<div style="font:900 10px var(--f-ui); color:${m.crit}; margin-top:2px">${n?"\u25BC ZU NIEDRIG":"\u25B2 ZU HOCH"}</div>`:h}
        </div>`:h}
      </div>
      <div style="margin-top:6px">
        ${B([{data:this._hist,color:r?m.crit:m.ok,fill:!0}],{w:this.chartW(),h:t.height??104,band:{min:t.min,max:t.max},grid:3})}
      </div>
    </div>`}};customElements.define("growctrl-metric-card",te);var gi="3.4.1",fi=[{type:"growctrl-tent-card",name:"GROWCTRL Tent",description:"Zelt-Hero: Klima-KPIs, VPD-Skala, Status-Ampel"},{type:"growctrl-station-card",name:"GROWCTRL Station",description:"Station: Licht-/Pumpenbalken, Stage, Auto, Konfiguration"},{type:"growctrl-controls-card",name:"GROWCTRL Controls",description:"Aktoren-Raster mit Gruppen und Bestaetigung"},{type:"growctrl-sensors-card",name:"GROWCTRL Sensors",description:"Sensor-KPIs mit Sollbereich-Ampel"},{type:"growctrl-status-card",name:"GROWCTRL Status",description:"Ereignisprotokoll der Integration mit Schweregrad-Ampel"},{type:"growctrl-hero-card",name:"GROWCTRL Hero",description:"Globale Steuerung, Klima-KPIs, VPD-Chart, Informationssystem"},{type:"growctrl-checkup-card",name:"GROWCTRL Checkup",description:"Checkup-Matrix: Licht/Pumpe/Klima/Status je Station"},{type:"growctrl-tank-card",name:"GROWCTRL Tank",description:"DWC-Fuellstand (vertikaler Tank) mit Warnstufe"},{type:"growctrl-history-card",name:"GROWCTRL History",description:"24h-Diagramm (z.B. Temperatur + Luftfeuchte)"},{type:"growctrl-metric-card",name:"GROWCTRL Metric",description:"EC/pH gross mit Chart und Sollbereich"}];window.customCards=window.customCards??[];window.__gcEpoch=ye();fi.forEach(a=>window.customCards.push({...a,preview:!0,documentationURL:"https://github.com/MrDarkvoid/growctrl"}));console.info(`%c GROWCTRL Cards %c v${gi} `,"background:#1D9E75;color:#fff;font-weight:700","background:#0F6E56;color:#fff");
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
