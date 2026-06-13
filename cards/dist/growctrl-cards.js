var rt=globalThis,ot=rt.ShadowRoot&&(rt.ShadyCSS===void 0||rt.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ft=Symbol(),Yt=new WeakMap,X=class{constructor(e,t,n){if(this._$cssResult$=!0,n!==ft)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(ot&&e===void 0){let n=t!==void 0&&t.length===1;n&&(e=Yt.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),n&&Yt.set(t,e))}return e}toString(){return this.cssText}},Jt=o=>new X(typeof o=="string"?o:o+"",void 0,ft),Q=(o,...e)=>{let t=o.length===1?o[0]:e.reduce((n,i,r)=>n+(s=>{if(s._$cssResult$===!0)return s.cssText;if(typeof s=="number")return s;throw Error("Value passed to 'css' function must be a 'css' function result: "+s+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+o[r+1],o[0]);return new X(t,o,ft)},te=(o,e)=>{if(ot)o.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(let t of e){let n=document.createElement("style"),i=rt.litNonce;i!==void 0&&n.setAttribute("nonce",i),n.textContent=t.cssText,o.appendChild(n)}},bt=ot?o=>o:o=>o instanceof CSSStyleSheet?(e=>{let t="";for(let n of e.cssRules)t+=n.cssText;return Jt(t)})(o):o;var{is:Me,defineProperty:Re,getOwnPropertyDescriptor:Oe,getOwnPropertyNames:Ie,getOwnPropertySymbols:Ne,getPrototypeOf:Be}=Object,at=globalThis,ee=at.trustedTypes,De=ee?ee.emptyScript:"",He=at.reactiveElementPolyfillSupport,Y=(o,e)=>o,xt={toAttribute(o,e){switch(e){case Boolean:o=o?De:null;break;case Object:case Array:o=o==null?o:JSON.stringify(o)}return o},fromAttribute(o,e){let t=o;switch(e){case Boolean:t=o!==null;break;case Number:t=o===null?null:Number(o);break;case Object:case Array:try{t=JSON.parse(o)}catch{t=null}}return t}},ie=(o,e)=>!Me(o,e),ne={attribute:!0,type:String,converter:xt,reflect:!1,useDefault:!1,hasChanged:ie};Symbol.metadata??=Symbol("metadata"),at.litPropertyMetadata??=new WeakMap;var O=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=ne){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let n=Symbol(),i=this.getPropertyDescriptor(e,n,t);i!==void 0&&Re(this.prototype,e,i)}}static getPropertyDescriptor(e,t,n){let{get:i,set:r}=Oe(this.prototype,e)??{get(){return this[t]},set(s){this[t]=s}};return{get:i,set(s){let c=i?.call(this);r?.call(this,s),this.requestUpdate(e,c,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??ne}static _$Ei(){if(this.hasOwnProperty(Y("elementProperties")))return;let e=Be(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(Y("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Y("properties"))){let t=this.properties,n=[...Ie(t),...Ne(t)];for(let i of n)this.createProperty(i,t[i])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[n,i]of t)this.elementProperties.set(n,i)}this._$Eh=new Map;for(let[t,n]of this.elementProperties){let i=this._$Eu(t,n);i!==void 0&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let n=new Set(e.flat(1/0).reverse());for(let i of n)t.unshift(bt(i))}else e!==void 0&&t.push(bt(e));return t}static _$Eu(e,t){let n=t.attribute;return n===!1?void 0:typeof n=="string"?n:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let n of t.keys())this.hasOwnProperty(n)&&(e.set(n,this[n]),delete this[n]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return te(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,n){this._$AK(e,n)}_$ET(e,t){let n=this.constructor.elementProperties.get(e),i=this.constructor._$Eu(e,n);if(i!==void 0&&n.reflect===!0){let r=(n.converter?.toAttribute!==void 0?n.converter:xt).toAttribute(t,n.type);this._$Em=e,r==null?this.removeAttribute(i):this.setAttribute(i,r),this._$Em=null}}_$AK(e,t){let n=this.constructor,i=n._$Eh.get(e);if(i!==void 0&&this._$Em!==i){let r=n.getPropertyOptions(i),s=typeof r.converter=="function"?{fromAttribute:r.converter}:r.converter?.fromAttribute!==void 0?r.converter:xt;this._$Em=i;let c=s.fromAttribute(t,r.type);this[i]=c??this._$Ej?.get(i)??c,this._$Em=null}}requestUpdate(e,t,n,i=!1,r){if(e!==void 0){let s=this.constructor;if(i===!1&&(r=this[e]),n??=s.getPropertyOptions(e),!((n.hasChanged??ie)(r,t)||n.useDefault&&n.reflect&&r===this._$Ej?.get(e)&&!this.hasAttribute(s._$Eu(e,n))))return;this.C(e,t,n)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:n,reflect:i,wrapped:r},s){n&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,s??t??this[e]),r!==!0||s!==void 0)||(this._$AL.has(e)||(this.hasUpdated||n||(t=void 0),this._$AL.set(e,t)),i===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[i,r]of this._$Ep)this[i]=r;this._$Ep=void 0}let n=this.constructor.elementProperties;if(n.size>0)for(let[i,r]of n){let{wrapped:s}=r,c=this[i];s!==!0||this._$AL.has(i)||c===void 0||this.C(i,void 0,r,c)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(n=>n.hostUpdate?.()),this.update(t)):this._$EM()}catch(n){throw e=!1,this._$EM(),n}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(e){}firstUpdated(e){}};O.elementStyles=[],O.shadowRootOptions={mode:"open"},O[Y("elementProperties")]=new Map,O[Y("finalized")]=new Map,He?.({ReactiveElement:O}),(at.reactiveElementVersions??=[]).push("2.1.2");var St=globalThis,se=o=>o,lt=St.trustedTypes,re=lt?lt.createPolicy("lit-html",{createHTML:o=>o}):void 0,pe="$lit$",I=`lit$${Math.random().toFixed(9).slice(2)}$`,ue="?"+I,Ue=`<${ue}>`,G=document,tt=()=>G.createComment(""),et=o=>o===null||typeof o!="object"&&typeof o!="function",Ct=Array.isArray,Ge=o=>Ct(o)||typeof o?.[Symbol.iterator]=="function",vt=`[ 	
\f\r]`,J=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,oe=/-->/g,ae=/>/g,H=RegExp(`>|${vt}(?:([^\\s"'>=/]+)(${vt}*=${vt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),le=/'/g,ce=/"/g,he=/^(?:script|style|textarea|title)$/i,At=o=>(e,...t)=>({_$litType$:o,strings:e,values:t}),l=At(1),st=At(2),xn=At(3),V=Symbol.for("lit-noChange"),d=Symbol.for("lit-nothing"),de=new WeakMap,U=G.createTreeWalker(G,129);function ge(o,e){if(!Ct(o)||!o.hasOwnProperty("raw"))throw Error("invalid template strings array");return re!==void 0?re.createHTML(e):e}var Ve=(o,e)=>{let t=o.length-1,n=[],i,r=e===2?"<svg>":e===3?"<math>":"",s=J;for(let c=0;c<t;c++){let a=o[c],u,g,m=-1,x=0;for(;x<a.length&&(s.lastIndex=x,g=s.exec(a),g!==null);)x=s.lastIndex,s===J?g[1]==="!--"?s=oe:g[1]!==void 0?s=ae:g[2]!==void 0?(he.test(g[2])&&(i=RegExp("</"+g[2],"g")),s=H):g[3]!==void 0&&(s=H):s===H?g[0]===">"?(s=i??J,m=-1):g[1]===void 0?m=-2:(m=s.lastIndex-g[2].length,u=g[1],s=g[3]===void 0?H:g[3]==='"'?ce:le):s===ce||s===le?s=H:s===oe||s===ae?s=J:(s=H,i=void 0);let f=s===H&&o[c+1].startsWith("/>")?" ":"";r+=s===J?a+Ue:m>=0?(n.push(u),a.slice(0,m)+pe+a.slice(m)+I+f):a+I+(m===-2?c:f)}return[ge(o,r+(o[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),n]},nt=class o{constructor({strings:e,_$litType$:t},n){let i;this.parts=[];let r=0,s=0,c=e.length-1,a=this.parts,[u,g]=Ve(e,t);if(this.el=o.createElement(u,n),U.currentNode=this.el.content,t===2||t===3){let m=this.el.content.firstChild;m.replaceWith(...m.childNodes)}for(;(i=U.nextNode())!==null&&a.length<c;){if(i.nodeType===1){if(i.hasAttributes())for(let m of i.getAttributeNames())if(m.endsWith(pe)){let x=g[s++],f=i.getAttribute(m).split(I),v=/([.?@])?(.*)/.exec(x);a.push({type:1,index:r,name:v[2],strings:f,ctor:v[1]==="."?$t:v[1]==="?"?_t:v[1]==="@"?wt:K}),i.removeAttribute(m)}else m.startsWith(I)&&(a.push({type:6,index:r}),i.removeAttribute(m));if(he.test(i.tagName)){let m=i.textContent.split(I),x=m.length-1;if(x>0){i.textContent=lt?lt.emptyScript:"";for(let f=0;f<x;f++)i.append(m[f],tt()),U.nextNode(),a.push({type:2,index:++r});i.append(m[x],tt())}}}else if(i.nodeType===8)if(i.data===ue)a.push({type:2,index:r});else{let m=-1;for(;(m=i.data.indexOf(I,m+1))!==-1;)a.push({type:7,index:r}),m+=I.length-1}r++}}static createElement(e,t){let n=G.createElement("template");return n.innerHTML=e,n}};function Z(o,e,t=o,n){if(e===V)return e;let i=n!==void 0?t._$Co?.[n]:t._$Cl,r=et(e)?void 0:e._$litDirective$;return i?.constructor!==r&&(i?._$AO?.(!1),r===void 0?i=void 0:(i=new r(o),i._$AT(o,t,n)),n!==void 0?(t._$Co??=[])[n]=i:t._$Cl=i),i!==void 0&&(e=Z(o,i._$AS(o,e.values),i,n)),e}var yt=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:n}=this._$AD,i=(e?.creationScope??G).importNode(t,!0);U.currentNode=i;let r=U.nextNode(),s=0,c=0,a=n[0];for(;a!==void 0;){if(s===a.index){let u;a.type===2?u=new it(r,r.nextSibling,this,e):a.type===1?u=new a.ctor(r,a.name,a.strings,this,e):a.type===6&&(u=new kt(r,this,e)),this._$AV.push(u),a=n[++c]}s!==a?.index&&(r=U.nextNode(),s++)}return U.currentNode=G,i}p(e){let t=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(e,n,t),t+=n.strings.length-2):n._$AI(e[t])),t++}},it=class o{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,n,i){this.type=2,this._$AH=d,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=n,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Z(this,e,t),et(e)?e===d||e==null||e===""?(this._$AH!==d&&this._$AR(),this._$AH=d):e!==this._$AH&&e!==V&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Ge(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==d&&et(this._$AH)?this._$AA.nextSibling.data=e:this.T(G.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:n}=e,i=typeof n=="number"?this._$AC(e):(n.el===void 0&&(n.el=nt.createElement(ge(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===i)this._$AH.p(t);else{let r=new yt(i,this),s=r.u(this.options);r.p(t),this.T(s),this._$AH=r}}_$AC(e){let t=de.get(e.strings);return t===void 0&&de.set(e.strings,t=new nt(e)),t}k(e){Ct(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,n,i=0;for(let r of e)i===t.length?t.push(n=new o(this.O(tt()),this.O(tt()),this,this.options)):n=t[i],n._$AI(r),i++;i<t.length&&(this._$AR(n&&n._$AB.nextSibling,i),t.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let n=se(e).nextSibling;se(e).remove(),e=n}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},K=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,n,i,r){this.type=1,this._$AH=d,this._$AN=void 0,this.element=e,this.name=t,this._$AM=i,this.options=r,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=d}_$AI(e,t=this,n,i){let r=this.strings,s=!1;if(r===void 0)e=Z(this,e,t,0),s=!et(e)||e!==this._$AH&&e!==V,s&&(this._$AH=e);else{let c=e,a,u;for(e=r[0],a=0;a<r.length-1;a++)u=Z(this,c[n+a],t,a),u===V&&(u=this._$AH[a]),s||=!et(u)||u!==this._$AH[a],u===d?e=d:e!==d&&(e+=(u??"")+r[a+1]),this._$AH[a]=u}s&&!i&&this.j(e)}j(e){e===d?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},$t=class extends K{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===d?void 0:e}},_t=class extends K{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==d)}},wt=class extends K{constructor(e,t,n,i,r){super(e,t,n,i,r),this.type=5}_$AI(e,t=this){if((e=Z(this,e,t,0)??d)===V)return;let n=this._$AH,i=e===d&&n!==d||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,r=e!==d&&(n===d||i);i&&this.element.removeEventListener(this.name,this,n),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},kt=class{constructor(e,t,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){Z(this,e)}};var je=St.litHtmlPolyfillSupport;je?.(nt,it),(St.litHtmlVersions??=[]).push("3.3.3");var me=(o,e,t)=>{let n=t?.renderBefore??e,i=n._$litPart$;if(i===void 0){let r=t?.renderBefore??null;n._$litPart$=i=new it(e.insertBefore(tt(),r),r,void 0,t??{})}return i._$AI(o),i};var Et=globalThis,R=class extends O{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=me(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return V}};R._$litElement$=!0,R.finalized=!0,Et.litElementHydrateSupport?.({LitElement:R});var We=Et.litElementPolyfillSupport;We?.({LitElement:R});(Et.litElementVersions??=[]).push("4.2.2");var fe,ct=null;function dt(o){if(o?.states===fe&&ct)return ct;let e=new Map,t=new Set,n={};for(let[i,r]of Object.entries(o?.states??{})){let s=r?.attributes;if(!s?.growctrl_role||!s?.growctrl_tent)continue;let c=String(s.growctrl_tent),a=String(s.growctrl_station??"zelt");e.set(`${c}::${a}::${s.growctrl_role}`,i),a==="zelt"?t.add(c):(n[c]??=new Set).add(a)}return fe=o?.states,ct={tents:[...t].sort(),stations:Object.fromEntries(Object.entries(n).map(([i,r])=>[i,[...r].sort()])),byRole:e},ct}var j=(o,e,t,n)=>dt(o).byRole.get(`${e}::${t}::${n}`);var _=class extends R{constructor(){super(...arguments);this._config={};this._label=t=>t.label??t.name}static{this.properties={hass:{attribute:!1},_config:{state:!0}}}static{this.styles=Q`
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
  `}setConfig(t){this._config={...t}}_fire(t){this._config=t,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0}))}form(t){return l`<ha-form .hass=${this.hass} .data=${this._config} .schema=${t}
      .computeLabel=${this._label}
      @value-changed=${n=>this._fire({...this._config,...n.detail.value})}></ha-form>`}list(t){let n=this._config[t.key]??[],i=r=>this._fire({...this._config,[t.key]:r});return l`
      ${t.title?l`<div class="lt">${t.title}</div>`:d}
      ${n.map((r,s)=>l`<div class="row">
        <ha-form .hass=${this.hass} .data=${r} .schema=${t.rowSchema}
          .computeLabel=${this._label}
          @value-changed=${c=>{let a=[...n];a[s]={...c.detail.value},i(a)}}></ha-form>
        <button class="del" title="Entfernen"
          @click=${()=>i(n.filter((c,a)=>a!==s))}>\u2715</button>
      </div>`)}
      <button class="add" @click=${()=>i([...n,t.newItem()])}>+ ${t.addLabel}</button>`}tentSelect(t="tent",n="Zelt"){let i=dt(this.hass).tents;return{name:t,label:n,selector:{select:{options:i,custom_value:!0,mode:"dropdown"}}}}stationSelect(t,n="station",i="Station"){let r=dt(this.hass),s=t?r.stations[t]??[]:[...new Set(Object.values(r.stations).flat())];return{name:n,label:i,selector:{select:{options:s,custom_value:!0,mode:"dropdown"}}}}styleSection(){let t=this._config.style??{},n=[p.text("background","Hintergrund (Farbe, 'a,b' = Gradient oder CSS)"),p.num("opacity","Deckkraft (0\u20131)",0,1,.05),p.bool("glass","Glas-Effekt (Blur)"),p.text("accent","Akzentfarbe"),p.num("radius","Eckenradius (px)",0,40)];return l`<div class="lt">Stil</div>
      <ha-form .hass=${this.hass} .data=${t} .schema=${n}
        .computeLabel=${i=>i.label??i.name}
        @value-changed=${i=>this._fire({...this._config,style:{...i.detail.value}})}></ha-form>`}},p={text:(o,e)=>({name:o,label:e,selector:{text:{}}}),bool:(o,e)=>({name:o,label:e,selector:{boolean:{}}}),num:(o,e,t,n,i)=>({name:o,label:e,selector:{number:{min:t,max:n,step:i,mode:"box"}}}),entity:(o,e,t)=>({name:o,label:e,selector:{entity:t?{domain:t}:{}}}),entities:(o,e,t)=>({name:o,label:e,selector:{entity:{multiple:!0,...t?{domain:t}:{}}}}),select:(o,e,t)=>({name:o,label:e,selector:{select:{mode:"dropdown",options:t}}})};var Ft=class extends _{render(){let e=[this.tentSelect(),p.text("name","Anzeigename (optional)"),p.bool("show_chart","VPD-Chart anzeigen"),p.num("hours","Chart-Zeitraum (h)",1,168)];return l`${this.form(e)}${this.styleSection()}`}};customElements.define("growctrl-tent-editor",Ft);function Tt(o){if(o==null||isNaN(o))return"\u2013";let e=Math.max(0,Math.round(o)),t=Math.floor(e/60),n=e%60;return t&&n?`${t} h ${n} min`:t?`${t} h`:`${n} min`}function be(o,e="auto"){let t=Math.floor(o/7)+1,n=o%7+1;return e==="tage"||e==="auto"&&o<7?`${o} Tage`:`Wo ${t} \xB7 Tag ${n}`}function S(o){if(o==null||o==="unknown"||o==="unavailable"||o==="")return null;let e=Number(o);return isNaN(e)?null:e}function xe(o){if(!o||o==="unknown"||o==="unavailable")return null;let e=new Date(o);return isNaN(e.getTime())?null:Math.max(0,Math.floor((Date.now()-e.getTime())/864e5))}var ve=o=>!o||["unknown","unavailable",""].includes(o),ye=o=>o.length>=16?o.substring(11,16):"",$e=o=>{if(ve(o))return{level:"none",label:"\u2014",ts:""};let e=o,t=ye(e);if(e.includes("SENSOR INVALID"))return{level:"critical",label:"\u{1F6A8} Sensor ung\xFCltig \u2014 Befeuchtung gesperrt",ts:t};if(e.includes("MAINTENANCE"))return{level:"info",label:"\u{1F527} Wartungsmodus aktiv",ts:t};if(e.includes("TESTMODE"))return{level:"info",label:"\u{1F9EA} Testmodus aktiv",ts:t};if(e.includes("AUTO OFF"))return{level:"info",label:"\u{1F534} Klima-Automatik deaktiviert",ts:t};let n=e.match(/(?:IST|SOLL)\s+(?:F|CIRC)=(\w+)/i)?.[1]?.toLowerCase(),i=e.match(/IST\s+(?:CIRC|F)=\w+\s+HUM=(\w+)/i)?.[1]?.toUpperCase(),r=e.match(/REQ=(\w+)/i)?.[1]?.toUpperCase();if(i!==void 0){let s=[];return n==="on"?s.push("Umluft AN"):n==="manual"?s.push("Umluft Manuell"):n==="off"&&s.push("Umluft AUS"),s.push(i==="ON"?"Befeuchtung AN":"Befeuchtung AUS"),s.push(r==="ON"?"Entfeuchtung AN":"Entfeuchtung AUS"),e.includes("ZENTRAL-BLOCK")&&s.push("(Zentral-Block)"),{level:"ok",label:s.join(" \xB7 "),ts:t}}return{level:"ok",label:e.replace(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}\s*/,"").substring(0,45),ts:t}},_e=o=>{if(ve(o))return{level:"none",label:"\u2014",ts:""};let e=o,t=ye(e);if(e.includes("FAILSAFE LIGHT"))return{level:"critical",label:"\u{1F6A8} Failsafe: Licht-Zwangsabschaltung \u2014 Auto deaktiviert",ts:t};if(e.includes("FAILSAFE PUMP"))return{level:"critical",label:"\u{1F6A8} Failsafe: Pumpen-Zwangsabschaltung \u2014 Auto deaktiviert",ts:t};if(e.includes("TIME INVALID"))return{level:"critical",label:"\u26A0\uFE0F Lichtzeiten nicht konfiguriert",ts:t};if(e.includes("MISMATCH")){let g=f=>e.match(f)?.[1];return{level:"warning",label:"\u26A0\uFE0F Ger\xE4t antwortet nicht: "+([["Licht",g(/IST.*?\bL=(\w+)/i),g(/SOLL.*?\bL=(\w+)/i)],["Pumpe",g(/IST.*?\bP=(\w+)/i),g(/SOLL.*?\bP=(\w+)/i)],["O\u2082",g(/IST.*?\bO2=(\w+)/i),g(/SOLL.*?\bO2=(\w+)/i)]].filter(([,f,v])=>f&&v&&f!==v).map(([f,v,y])=>`${f} (IST ${v.toUpperCase()} / SOLL ${y.toUpperCase()})`).join(", ")||"Abweichung"),ts:t}}if(e.includes("MAINTENANCE"))return{level:"info",label:"\u{1F527} Wartungsmodus aktiv",ts:t};if(e.includes("TESTMODE"))return{level:"info",label:"\u{1F9EA} Testmodus aktiv",ts:t};let n=e.match(/IST.*?\bL=(\w+)/i)?.[1],i=e.match(/IST.*?\bP=(\w+)/i)?.[1],r=e.match(/IST.*?\bO2=(\w+)/i)?.[1],s=e.includes("OVRUNTIL")?" (Override aktiv)":"",c=[n&&n!=="n/a"?n==="on"?"\u{1F4A1} Licht AN":"\u{1F311} Licht AUS":null,i&&i!=="n/a"?i==="on"?"\u{1F4A7} Pumpe AN":"\u23F8\uFE0F Pumpe AUS":null,r&&r!=="n/a"?r==="on"?"\u{1FAE7} O\u2082 AN":"\u{1FAE7} O\u2082 AUS":null].filter(Boolean).join(" \xB7 "),a="";return e.includes("AUTO ON")?a="\u{1F7E2} Auto gestartet":e.includes("AUTO OFF")?a="\u{1F534} Auto gestoppt":e.match(/STAGE\s*\u2192/)?a=`\u{1F331} Phase: ${e.match(/STAGE\s*\u2192\s*(\w+)/)?.[1]??""}`:e.includes("LIGHT \u2192 ON")?a="\u{1F4A1} Licht eingeschaltet":e.includes("LIGHT \u2192 OFF")?a="\u{1F311} Licht ausgeschaltet":e.includes("PUMP \u2192 ON")?a="\u{1F4A7} Pumpe eingeschaltet":e.includes("PUMP \u2192 OFF")?a="\u23F8\uFE0F Pumpe ausgeschaltet":e.includes("O2 \u2192 ON")?a="\u{1FAE7} O\u2082 eingeschaltet":e.includes("FAN \u2192 ON")?a="\u{1F300} L\xFCfter eingeschaltet":e.includes("MANUAL OVERRIDE")?a="\u270B Manuell \xFCbersteuert":e.includes("OVERRIDE END")&&(a="\u2705 Override beendet"),{level:"ok",label:[a,c].filter(Boolean).join(" \u2014 ")+s||e.substring(17,55),ts:t}};var we=new Map;async function L(o,e,t=24,n=48){let i=`${e}:${t}`,r=we.get(i);if(r&&Date.now()-r.t<5*6e4)return r.data;try{let s=new Date(Date.now()-t*36e5).toISOString(),a=((await o.callApi("GET",`history/period/${s}?filter_entity_id=${e}&minimal_response&no_attributes`))?.[0]??[]).map(m=>parseFloat(m.state??m.s)).filter(m=>!isNaN(m)),u=Math.max(1,Math.floor(a.length/n)),g=a.filter((m,x)=>x%u===0);return we.set(i,{t:Date.now(),data:g}),g}catch{return r?.data??[]}}var ke=(o,e=100,t=24)=>{if(o.length<2)return"";let n=Math.min(...o),i=Math.max(...o),r=i-n||1;return o.map((s,c)=>`${c===0?"M":"L"}${(c/(o.length-1)*e).toFixed(1)},${(t-(s-n)/r*t).toFixed(1)}`).join(" ")};var h={label:"rgba(242,247,243,0.56)",value:"rgba(242,247,243,0.97)",muted:"rgba(242,247,243,0.46)",logLabel:"rgba(242,247,243,0.72)",logText:"rgba(242,247,243,0.90)",ok:"#7BE8A8",warn:"#FFCE7A",crit:"#FF9D9D",info:"#9AC8FF",water:"#7CC8F0",light:"#FFDC8A",temp:"#FFB98A",heat:"#FFB35C",tileBg:"rgba(255,255,255,0.04)",rowBg:"rgba(255,255,255,0.035)"},N={critical:"rgba(255,157,157,.14)",warning:"rgba(255,206,122,.12)",info:"rgba(154,200,255,.10)",ok:h.rowBg,none:"rgba(255,255,255,.022)"},z={critical:h.crit,warning:h.warn,info:h.info,ok:h.logText,none:"rgba(242,247,243,.36)"},pt={Seedling:{bg:"rgba(154,200,255,0.16)",color:"#9AC8FF"},Veg:{bg:"rgba(123,232,168,0.16)",color:"#7BE8A8"},Bloom:{bg:"rgba(255,185,138,0.18)",color:"#FFB98A"},Flush:{bg:"rgba(195,171,245,0.18)",color:"#C3ABF5"},Trocknung:{bg:"rgba(211,168,120,0.18)",color:"#D3A878"}},w=o=>{let e=[];if(o?.background){let t=o.background.trim(),n=t.includes(",")&&!/^(linear|radial|conic|rgb|hsl)/i.test(t)?`linear-gradient(160deg, ${t})`:t;e.push(`--gc-bg:${n}`)}return o?.opacity!==void 0&&e.push(`--gc-opacity:${o.opacity}`),o?.accent&&e.push(`--gc-accent:${o.accent}`),o?.radius!==void 0&&e.push(`--gc-radius:${o.radius}px`),e.join(";")},q=o=>o.includes("critical")?"critical":o.includes("warning")?"warning":o.includes("info")?"info":"ok",k=Q`
  :host {
    display: block;
    --gc-accent: #7BE8A8;                 /* Standard: Klein/gruen. Mittel/Gross via style.accent */
    --gc-line: #2E3D34;
    --gc-line-soft: #27342C;
    --f-ui: "Nunito", "Quicksand", var(--primary-font-family, "Inter"), system-ui, sans-serif;
    --f-num: "IBM Plex Mono", ui-monospace, "SF Mono", Menlo, monospace;
  }

  /* Responsive KPI-Raster */
  .kpis { display:grid; gap:8px; grid-template-columns:repeat(4,minmax(0,1fr)); align-items:stretch; }
  .kpis .tile { display:flex; flex-direction:column; justify-content:center; min-height:64px; }
  .kpis.cols-2 { grid-template-columns:repeat(2,minmax(0,1fr)); }
  .kpis.cols-3 { grid-template-columns:repeat(3,minmax(0,1fr)); }
  .settings-grid { display:grid; gap:8px; grid-template-columns:repeat(3,minmax(0,1fr)); }
  @media (max-width: 480px) {
    .card { padding: 15px 14px; }
    .kpis { grid-template-columns:repeat(2,minmax(0,1fr)); }
    .kpis.cols-3 { grid-template-columns:repeat(3,minmax(0,1fr)); gap:6px; }
    .settings-grid { grid-template-columns:repeat(2,minmax(0,1fr)); }
    .kpis .val { font-size: 20px; }
    .title { font-size: 16px; }
  }

  .card {
    position: relative; isolation: isolate;
    border-radius: var(--gc-radius, 22px);
    padding: 18px;
    color: #F2F7F3;
    border: 1px solid var(--gc-line-soft);
    box-shadow: 0 10px 30px -12px rgba(0,0,0,.45);
    font-family: var(--f-ui);
    overflow: hidden;
  }
  .card::before {
    content: ""; position: absolute; inset: 0; z-index: -1;
    background: var(--gc-bg, linear-gradient(180deg, #202C25 0%, #1B2620 30%));
    opacity: var(--gc-opacity, 1);
  }
  .card.glass { backdrop-filter: blur(14px) saturate(1.2); -webkit-backdrop-filter: blur(14px) saturate(1.2); }
  .card[data-level="warning"] {
    border-color: rgba(255,206,122,.4);
    box-shadow: 0 0 0 1px rgba(255,206,122,.18), 0 12px 30px -14px rgba(255,206,122,.28);
  }
  .card[data-level="critical"] {
    border-color: rgba(255,157,157,.5);
    box-shadow: 0 0 0 1px rgba(255,157,157,.24), 0 12px 32px -14px rgba(255,157,157,.34);
  }

  .clickable, .gc { cursor: pointer; }
  .gc { all: unset; cursor: pointer; touch-action: manipulation; box-sizing: border-box; }
  :focus-visible { outline: 2.5px solid var(--gc-accent); outline-offset: 2px; border-radius: 8px; }
  button { transition: transform .16s cubic-bezier(.2,.9,.3,1.2), border-color .16s, background .16s, color .16s; }
  button:active { transform: scale(.975); }
  @media (prefers-reduced-motion: reduce) { *, *::before, *::after { transition: none !important; animation: none !important; } }

  /* Kopfzeile */
  .hdr { display: flex; justify-content: space-between; align-items: center; gap: 10px; flex-wrap: wrap; }
  .title { font-size: 17.5px; font-weight: 900; letter-spacing: -.3px; line-height: 1.15; }
  .subtitle { font-size: 12px; color: var(--label, rgba(242,247,243,.58)); margin-top: 2px; font-weight: 700; }
  .badges { display: flex; gap: 6px; flex-wrap: wrap; justify-content: flex-end; align-items: center; }
  .badge { font-size: 11px; font-weight: 800; background: rgba(255,255,255,.06);
           border: 1px solid var(--gc-line); color: rgba(242,247,243,.85);
           padding: 5px 11px; border-radius: 999px; white-space: nowrap; }
  .badge.warn { background: rgba(255,206,122,.12); border-color: rgba(255,206,122,.32); color: #FFCE7A; }

  /* Status-Pille */
  .status-pill { display: inline-flex; align-items: center; gap: 7px;
    font-size: 12px; font-weight: 800; padding: 7px 14px; border-radius: 999px; white-space: nowrap; }
  .status-pill .dot { width: 7px; height: 7px; border-radius: 50%; box-shadow: 0 0 8px currentColor; }

  /* Kacheln */
  .grid { display: grid; gap: 8px; margin-top: 10px; }
  .tile { background: var(--card-2, #222F28); border: 1px solid transparent;
          border-radius: 15px; padding: 12px 13px; min-width: 0; transition: background .15s, border-color .15s; }
  button.tile:hover { background: #27362E; border-color: color-mix(in srgb, var(--gc-accent) 35%, transparent); }
  .tile .lbl { font-size: 10.5px; text-transform: uppercase; letter-spacing: 1.1px;
               color: rgba(242,247,243,.62); font-weight: 800; }
  .tile .val { font-size: 25px; font-weight: 800; margin-top: 2px; letter-spacing: -.5px;
               font-family: var(--f-num); font-variant-numeric: tabular-nums; }
  .tile .val.sm { font-size: 17px; font-weight: 700; }
  .tile .unit { font-size: 12px; font-weight: 600; color: rgba(242,247,243,.58); margin-left: 3px; font-family: var(--f-num); }

  .seclbl { font-size: 10.5px; text-transform: uppercase; letter-spacing: 1.3px;
            color: rgba(242,247,243,.42); margin: 14px 0 8px; font-weight: 800; }
  .stagebadge { font-size: 10.5px; font-weight: 800; padding: 4px 11px; border-radius: 999px; }

  .logrow { display: flex; align-items: center; gap: 9px; border-radius: 11px; padding: 9px 12px; min-width: 0; }
  .logrow .txt { font-size: 12.5px; font-weight: 700; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; flex: 1; }
  .logrow .ts { font-size: 10.5px; color: rgba(242,247,243,.42); flex-shrink: 0; font-family: var(--f-num); font-variant-numeric: tabular-nums; }

  /* Balkenzeile (Legacy-kompatibel) */
  .barrow { display: flex; align-items: center; gap: 8px; }
  .barrow .ico { font-size: 13px; flex-shrink: 0; width: 18px; text-align: center; }
  .barrow .track { flex: 1; height: 10px; background: #17211B; border-radius: 6px; overflow: hidden; }
  .barrow .fill { height: 100%; border-radius: 6px; transition: width .4s; }
  .barrow .time { font-size: 11px; min-width: 78px; flex-shrink: 0; text-align: right;
                  font-family: var(--f-num); font-variant-numeric: tabular-nums; }

  /* ── Versorgungszeile (Licht / Pumpe / DLI / Tank) – volle Breite, einheitlich ── */
  .supply { display:block; width:100%; background:var(--card-2,#222F28); border:1px solid transparent;
    border-radius:15px; padding:12px 16px; cursor:pointer; text-align:left; color:inherit; margin-top:8px; }
  .supply:hover { border-color: color-mix(in srgb, var(--gc-accent) 35%, transparent); }
  .supply .shd { display:flex; align-items:center; gap:11px; }
  .supply .sic { font-size:20px; display:grid; place-items:center; width:26px; flex-shrink:0; }
  .supply .stt { font-size:14px; font-weight:800; flex:1; min-width:0; }
  .supply .stm { font-family:var(--f-num); font-weight:700; font-size:14px; font-variant-numeric:tabular-nums; flex-shrink:0; }
  .supply .sbar { height:10px; border-radius:6px; background:#17211B; overflow:hidden; position:relative; display:block; margin-top:9px; }
  .supply .sbar > i { display:block; height:100%; border-radius:6px; transition:width .5s; }
  .supply .sbar .min { position:absolute; top:-1px; bottom:-1px; width:2.5px; background:rgba(255,255,255,.45); }
  .supply .sft { display:flex; justify-content:space-between; margin-top:6px; font-size:10.5px; font-weight:700; color:rgba(242,247,243,.5); }

  /* ── Phasen-Dropdown – volle Breite ── */
  .dd { position:relative; display:block; width:100%; margin-top:12px; }
  .dd-btn { display:flex; align-items:center; gap:11px; width:100%; min-height:46px; padding:0 18px;
    font:800 13px var(--f-ui); color:#F2F7F3; cursor:pointer; border-radius:14px; background:var(--card-2,#222F28); border:1px solid var(--gc-line); }
  .dd-btn:hover { border-color: rgba(133,153,140,.7); }
  .dd-btn .pdot { width:10px; height:10px; border-radius:50%; box-shadow:0 0 8px currentColor; flex-shrink:0; }
  .dd-btn .hint { margin-left:auto; font:700 11px var(--f-num); color:rgba(242,247,243,.5); }
  .dd-menu { margin-top:7px; background:#222F28; border:1px solid var(--gc-line); border-radius:16px; padding:7px;
    box-shadow:0 18px 40px -12px rgba(0,0,0,.6); }
  .dd-it { display:flex; align-items:center; gap:12px; width:100%; min-height:44px; padding:0 13px;
    font:800 13px var(--f-ui); color:rgba(242,247,243,.7); cursor:pointer; border-radius:11px; background:transparent; border:none; text-align:left; }
  .dd-it:hover { background:#17211B; color:#F2F7F3; }
  .dd-it[aria-selected="true"] { color:var(--gc-accent); background:color-mix(in srgb, var(--gc-accent) 14%, transparent); }
  .dd-it .pdot { width:10px; height:10px; border-radius:50%; flex-shrink:0; }
  .dd-it .hint { margin-left:auto; font:700 10px var(--f-num); color:rgba(242,247,243,.5); }

  /* ── Aktor-Raster: fest 4 nebeneinander ── */
  .acts { display:grid; grid-template-columns:repeat(4,1fr); gap:8px; }
  .act { background:var(--card-2,#222F28); border:1px solid transparent; border-radius:15px; cursor:pointer;
    padding:8px 4px; text-align:center; color:rgba(242,247,243,.55); min-height:62px; }
  .act:hover { border-color: rgba(133,153,140,.6); }
  .act .aic { font-size:18px; display:flex; align-items:center; justify-content:center; margin:0 auto 4px; }
  .act .anm { font:800 10px var(--f-ui); color:rgba(242,247,243,.75); display:block; line-height:1.15; }
  .act .ast { font:700 8.5px var(--f-num); letter-spacing:.8px; margin-top:2px; display:block; }
  .act.on { border-color: color-mix(in srgb, var(--gc-accent) 45%, transparent); color:var(--gc-accent);
    background: linear-gradient(160deg, color-mix(in srgb, var(--gc-accent) 14%, transparent), var(--card-2,#222F28)); }
  .act.on .anm { color:#F2F7F3; }
  .act.on.light { border-color:rgba(255,220,138,.5); color:#FFDC8A; background:linear-gradient(160deg, rgba(255,220,138,.13), var(--card-2,#222F28)); }
  .act.on.heat  { border-color:rgba(255,179,92,.5);  color:#FFB35C; background:linear-gradient(160deg, rgba(255,179,92,.14), var(--card-2,#222F28)); }
  .act.on.water { border-color:rgba(124,200,240,.5); color:#7CC8F0; background:linear-gradient(160deg, rgba(124,200,240,.14), var(--card-2,#222F28)); }

  /* ── Pflanzen-Tabs + Panel ── */
  .ptabs { display:flex; gap:7px; flex-wrap:wrap; margin-top:14px; }
  .ptab { display:inline-flex; align-items:center; gap:8px; font:800 12px var(--f-ui); min-height:40px; padding:0 15px;
    border-radius:999px; cursor:pointer; border:1.5px solid var(--gc-line); background:transparent; color:rgba(242,247,243,.6); }
  .ptab[aria-selected="true"] { color:var(--gc-accent); border-color:color-mix(in srgb, var(--gc-accent) 50%, transparent);
    background:color-mix(in srgb, var(--gc-accent) 14%, transparent); }
  .plant { background:linear-gradient(150deg, color-mix(in srgb, var(--gc-accent) 7%, transparent), var(--card-2,#222F28) 45%);
    border:1px solid var(--gc-line-soft); border-radius:15px; padding:16px; margin-top:8px; }
  .plant .phd { display:flex; gap:12px; align-items:center; }
  .plant .pimg { width:58px; height:58px; border-radius:17px; display:grid; place-items:center; flex-shrink:0; font-size:25px;
    background:linear-gradient(135deg, color-mix(in srgb, var(--gc-accent) 22%, transparent), transparent);
    border:1.5px solid color-mix(in srgb, var(--gc-accent) 30%, transparent); color:var(--gc-accent); object-fit:cover; }
  .plant .pname { font-size:16px; font-weight:900; letter-spacing:-.2px; }
  .plant .pstrain { font-size:12px; color:rgba(242,247,243,.65); font-weight:700; margin-top:1px; }
  .agechip { display:inline-block; margin-top:5px; font:800 11px var(--f-num); color:var(--gc-accent);
    background:color-mix(in srgb, var(--gc-accent) 14%, transparent);
    border:1px solid color-mix(in srgb, var(--gc-accent) 30%, transparent); border-radius:8px; padding:3px 10px; }

  /* Sensor-Indikator im Pflanzen-Panel */
  .ind { background:#17211B; border:1px solid var(--gc-line-soft); border-radius:15px; padding:12px; margin-top:10px;
    cursor:pointer; width:100%; text-align:left; color:inherit; }
  .ind:hover { border-color: color-mix(in srgb, var(--gc-accent) 35%, transparent); }
  .ind .ihd { display:flex; justify-content:space-between; align-items:baseline; }
  .ind .ilbl { font:800 11px var(--f-ui); letter-spacing:1.1px; text-transform:uppercase; display:inline-flex; align-items:center; gap:7px; }
  .ind .ival { font:700 19px var(--f-num); font-variant-numeric:tabular-nums; }
  .ind .ival .u { font-size:11px; color:rgba(242,247,243,.6); }
  /* setzbare Werte (number / input_number): −/＋-Stepper */
  .setrow { display:inline-flex; align-items:center; gap:9px; }
  .stepbtn { width:32px; height:32px; border-radius:10px; display:grid; place-items:center; cursor:pointer;
    color:var(--gc-accent); background:color-mix(in srgb, var(--gc-accent) 14%, transparent);
    border:1px solid color-mix(in srgb, var(--gc-accent) 35%, transparent); }
  .stepbtn:hover { background:color-mix(in srgb, var(--gc-accent) 24%, transparent); }
  .setval { font:700 19px var(--f-num); font-variant-numeric:tabular-nums; min-width:58px; text-align:center; }
  .setval .u { font-size:11px; color:rgba(242,247,243,.6); margin-left:1px; }

  /* Ereignisfeld */
  .event { display:flex; align-items:center; gap:11px; border-radius:15px; cursor:pointer; width:100%; text-align:left; color:inherit;
    background:#17211B; border:1px dashed var(--gc-line); padding:12px; min-height:46px; margin-top:14px; }
  .event:hover { border-color: color-mix(in srgb, var(--gc-accent) 40%, transparent); }
  .event .edot { width:8px; height:8px; border-radius:50%; background:rgba(242,247,243,.4); flex-shrink:0; }
  .event .ebody { flex:1; min-width:0; }
  .event .elbl { display:block; font:800 9.5px var(--f-ui); text-transform:uppercase; letter-spacing:.8px; color:rgba(242,247,243,.45); }
  .event .etx { display:block; font-size:12.5px; font-weight:700; color:rgba(242,247,243,.85); overflow:hidden; white-space:nowrap; text-overflow:ellipsis; }

  /* Diagnose-Badges */
  .pbadge { display:inline-flex; align-items:center; gap:6px; font:800 10px var(--f-ui); padding:5px 10px; border-radius:9px; letter-spacing:.3px; }
  .pbadge.warn { color:#FFCE7A; background:rgba(255,206,122,.12); border:1px solid rgba(255,206,122,.3); }
  .pbadge.crit { color:#FF9D9D; background:rgba(255,157,157,.12); border:1px solid rgba(255,157,157,.35); }
`,F={ok:{bg:"rgba(123,232,168,.14)",color:h.ok,label:"Alles OK"},info:{bg:"rgba(154,200,255,.14)",color:h.info,label:"Info"},warning:{bg:"rgba(255,206,122,.14)",color:h.warn,label:"Warnung"},critical:{bg:"rgba(255,157,157,.16)",color:h.crit,label:"Kritisch"},none:{bg:"rgba(133,153,140,.14)",color:"#85998C",label:"Inaktiv"}};var B=30,ut=4,Se=6,Lt=14,Ce=0;function Ae(o){if(o.length<3)return`M${o.map(t=>t.join(",")).join(" L")}`;let e=`M${o[0][0]},${o[0][1]}`;for(let t=0;t<o.length-1;t++){let n=o[Math.max(0,t-1)],i=o[t],r=o[t+1],s=o[Math.min(o.length-1,t+2)],c=i[0]+(r[0]-n[0])/6,a=i[1]+(r[1]-n[1])/6,u=r[0]-(s[0]-i[0])/6,g=r[1]-(s[1]-i[1])/6;e+=` C${c.toFixed(1)},${a.toFixed(1)} ${u.toFixed(1)},${g.toFixed(1)} ${r[0]},${r[1]}`}return e}function D(o,e={}){let t=`gcg${Ce++}`,n=e.w??300,i=e.h??110,r=o.flatMap(f=>f.data);if(!r.length)return l`<div style="height:${i}px;display:flex;align-items:center;justify-content:center;
    font-size:11px;color:rgba(255,255,255,.5)">Keine Verlaufsdaten</div>`;let s=e.min??Math.min(...r,e.band?.min??1/0),c=e.max??Math.max(...r,e.band?.max??-1/0);c-s<.001&&(c+=1,s-=1);let a=(c-s)*.08;s-=a,c+=a;let u=(f,v)=>B+f/Math.max(1,v-1)*(n-B-ut),g=f=>Se+(1-(f-s)/(c-s))*(i-Se-Lt),m=e.grid??3,x=f=>Math.abs(f)>=100?f.toFixed(0):Math.abs(f)>=10?f.toFixed(1):f.toFixed(2);return l`<svg data-gce="4d724461726b766f6964" viewBox="0 0 ${n} ${i}" preserveAspectRatio="none" style="width:100%;height:${i}px;display:block">
    ${e.band&&(e.band.min!==void 0||e.band.max!==void 0)?st`
      <rect x="${B}" y="${g(e.band.max??c)}" width="${n-B-ut}"
        height="${Math.max(0,g(e.band.min??s)-g(e.band.max??c))}"
        fill="${e.band.color??"rgba(77,255,195,.08)"}" />`:d}
    ${Array.from({length:m+1},(f,v)=>{let y=s+(c-s)*v/m;return st`
        <line x1="${B}" y1="${g(y)}" x2="${n-ut}" y2="${g(y)}"
          stroke="rgba(255,255,255,.10)" stroke-width="1"/>
        <text x="${B-4}" y="${g(y)+3}" text-anchor="end"
          font-size="9.5" fill="rgba(255,255,255,.68)">${x(y)}</text>`})}
    ${o.map((f,v)=>{if(f.data.length<2)return d;let y=f.data.map((M,b)=>[Number(u(b,f.data.length).toFixed(1)),Number(g(M).toFixed(1))]),E=Ae(y),A=y[y.length-1][0],P=y[y.length-1][1];return st`
        <defs>
          <linearGradient id="${t}-${v}" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="${f.color}" stop-opacity=".18"/>
            <stop offset="100%" stop-color="${f.color}" stop-opacity="0"/>
          </linearGradient>
        </defs>
        ${f.fill!==!1?st`<path
          d="${E} L${A},${i-Lt} L${B},${i-Lt} Z"
          fill="url(#${t}-${v})"/>`:d}
        <path d="${E}" fill="none" stroke="${f.color}" stroke-width="2.4"
          stroke-linejoin="round" stroke-linecap="round"/>
        <circle cx="${A}" cy="${P}" r="6" fill="${f.color}" opacity=".18"/>
        <circle cx="${A}" cy="${P}" r="3" fill="${f.color}"/>
        <circle cx="${A}" cy="${P}" r="1.3" fill="rgba(10,14,18,.9)"/>`})}
    <text x="${B}" y="${i-3}" font-size="9" fill="rgba(255,255,255,.5)">-24h</text>
    <text x="${n-ut}" y="${i-3}" text-anchor="end" font-size="9" fill="rgba(255,255,255,.5)">jetzt</text>
  </svg>`}var Ee=o=>l`
  <div style="display:flex;gap:12px;flex-wrap:wrap;margin-top:4px">
    ${o.filter(e=>e.name).map(e=>l`<span style="display:inline-flex;align-items:center;gap:5px;
      font-size:10px;color:rgba(255,255,255,.6)">
      <span style="width:10px;height:3px;border-radius:2px;background:${e.color}"></span>${e.name}</span>`)}
  </div>`;function Fe(o,e,t=280,n=38){if(o.length<2)return l`<div style="height:${n}px"></div>`;let i=`gcs${Ce++}`,r=Math.min(...o),s=Math.max(...o);s-r<.001&&(s+=1,r-=1);let c=f=>f/(o.length-1)*t,a=f=>3+(1-(f-r)/(s-r))*(n-8),u=o.map((f,v)=>[Number(c(v).toFixed(1)),Number(a(f).toFixed(1))]),g=Ae(u),m=u[u.length-1][0],x=u[u.length-1][1];return l`<svg data-gce="4d724461726b766f6964" viewBox="0 0 ${t} ${n}" style="width:100%;height:${n}px;display:block">
    <defs><linearGradient id="${i}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${e}" stop-opacity=".22"/>
      <stop offset="100%" stop-color="${e}" stop-opacity="0"/>
    </linearGradient></defs>
    <path d="${g} L${m},${n} L0,${n} Z" fill="url(#${i})"/>
    <path d="${g}" fill="none" stroke="${e}" stroke-width="2"
      stroke-linejoin="round" stroke-linecap="round"/>
    <circle cx="${m}" cy="${x}" r="2.6" fill="${e}"/>
  </svg>`}function Te(o,e){let t=e.max-e.min||1,n=(r,s,c)=>{let a=Math.max(0,(Math.min(s,e.max)-Math.max(r,e.min))/t*100);return l`<div style="width:${a}%;background:${c};opacity:.78"></div>`},i=o!==null?Math.min(1,Math.max(0,(o-e.min)/t))*100:null;return l`<div>
    <div style="position:relative;height:11px;border-radius:6px;overflow:hidden;display:flex;
                box-shadow:inset 0 1px 3px rgba(0,0,0,.4)">
      ${n(e.min,e.okMin,"#FF6B6B")}
      ${n(e.okMin,e.idealMin,"#FFB35C")}
      ${n(e.idealMin,e.idealMax,"#34D17B")}
      ${n(e.idealMax,e.okMax,"#FFB35C")}
      ${n(e.okMax,e.max,"#FF6B6B")}
      ${i!==null?l`<div style="position:absolute;top:0;bottom:0;left:${i}%;
        width:3px;margin-left:-1.5px;background:#fff;border-radius:2px;
        box-shadow:0 0 6px rgba(255,255,255,.9)"></div>`:d}
    </div>
    <div style="display:flex;justify-content:space-between;font-size:9.5px;
                color:rgba(255,255,255,.55);margin-top:3px">
      <span>${e.min}</span><span style="color:#34D17B;font-weight:700">${e.idealMin}\u2013${e.idealMax} ideal</span><span>${e.max}</span>
    </div>
  </div>`}var zt=o=>o.toLowerCase().replace(/ä/g,"a").replace(/ö/g,"o").replace(/ü/g,"u").replace(/ß/g,"ss").replace(/[^a-z0-9]+/g,"_").replace(/^_+|_+$/g,""),ht=(o,e,t,n,i)=>i?.[n]??`${o}.growctrl_${zt(e)}_${zt(t)}_${n}`,gt=(o,e,t,n)=>n?.[t]??`${o}.growctrl_zelt_${zt(e)}_${t}`,Le={auto:["switch","automatik","auto"],wartung:["switch","wartung","maintenance"],stage:["select","wachstumsphase","stage"],lightOn:["time","licht_an","light_on"],lightOffSv:["time","licht_aus_seedling_veg","light_off_sv"],lightOffBloom:["time","licht_aus_bloom_flush","light_off_bloom"],lightRest:["sensor","licht_restzeit","light_rest"],pumpRest:["sensor","pumpe_restzeit","pump_rest"],age:["sensor","alter_seit_keimung","plant_age"],rec:["sensor","phasen_empfehlung","stage_recommendation"],event:["sensor","letztes_ereignis","last_event"],dli:["sensor","dli_heute","dli_today"],dliFc:["sensor","dli_prognose","dli_forecast"],germination:["date","keimstart","germination"],overrideMin:["number","manuelle_ubernahme","override_minutes"],pOverride:["binary_sensor","manueller_eingriff","problem_override"],pFailsafe:["binary_sensor","licht_failsafe","problem_light_failsafe"],pTime:["binary_sensor","lichtzeiten_unvollstandig","problem_time_invalid"],pPump:["binary_sensor","pumpe_gesperrt_fullstand","problem_pump_blocked"],pPower:["binary_sensor","licht_ohne_leistung","problem_power"]},mt={enabled:["switch","zelt_aktiv","tent_enabled"],climate:["switch","klima_automatik","climate_enabled"],mode:["select","klima_modus","climate_mode"],phase:["select","klima_phase","climate_phase"],vpd:["sensor","vpd","vpd"],status:["sensor","status","status"],event:["sensor","letztes_ereignis","last_event"]};var $=class extends R{constructor(){super(...arguments);this._cw=0;this._config={};this._confirm=null}static{this.properties={hass:{attribute:!1},_config:{state:!0},_confirm:{state:!0},_cw:{state:!0}}}connectedCallback(){super.connectedCallback(),this._ro=new ResizeObserver(t=>{let n=Math.round(t[0]?.contentRect?.width??0);n&&Math.abs(n-this._cw)>8&&(this._cw=n)}),this._ro.observe(this)}disconnectedCallback(){this._ro?.disconnect(),super.disconnectedCallback()}chartW(t=34){return Math.max(280,(this._cw||320)-t)}setConfig(t){this.validateConfig(t),this._config=t}validateConfig(t){}getCardSize(){return 4}st(t){return t?this.hass?.states[t]?.state:void 0}isOn(t){return this.st(t)==="on"}friendly(t){return t&&this.hass?.states[t]?.attributes?.friendly_name||t||""}unit(t){return t&&this.hass?.states[t]?.attributes?.unit_of_measurement||""}moreInfo(t){this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:t},bubbles:!0,composed:!0}))}navigate(t){history.pushState(null,"",t),window.dispatchEvent(new CustomEvent("location-changed"))}toggle(t){let n=t.split(".")[0],i=["switch","input_boolean","light","fan"].includes(n)?n:"homeassistant";this.hass.callService(i,"toggle",{entity_id:t})}confirmToggle(t,n){this._confirm={text:`${n} wirklich schalten?`,action:()=>this.toggle(t)}}renderConfirm(){return this._confirm?l`<div style="position:absolute;inset:0;background:rgba(0,0,0,.6);border-radius:16px;
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
    </div>`:d}};var Ze=["VPD","RH"],Ke=["Auto","Seedling","Veg","Bloom","Trocknung"],Pt=class extends ${constructor(){super(...arguments);this._hist=[]}static{this.styles=k}static{this.properties={...$.properties,_hist:{state:!0}}}validateConfig(t){if(!t.tent)throw new Error("growctrl-tent-card: 'tent' ist Pflicht (Zelt-Name aus der Integration).")}static getConfigElement(){return document.createElement("growctrl-tent-editor")}static getStubConfig(){return{tent:"gross"}}e(t){let[n,i,r]=mt[t],s=this._config;return s.overrides?.[i]??j(this.hass,s.tent,"zelt",r)??gt(n,s.tent,i,s.overrides)}_select(t,n){this.hass.callService("select","select_option",{entity_id:t,option:n})}connectedCallback(){super.connectedCallback(),this._load(),this._timer=window.setInterval(()=>this._load(),5*6e4)}disconnectedCallback(){super.disconnectedCallback(),this._timer&&clearInterval(this._timer)}async _load(){if(!this.hass){setTimeout(()=>this._load(),1e3);return}this._hist=await L(this.hass,this.e("vpd"),this._config.hours??24)}chips(t,n,i){return l`<div style="display:flex;gap:5px;flex-wrap:wrap">
      ${n.map(r=>l`<button class="gc" style="padding:4px 11px;border-radius:9px;font-size:10.5px;
          font-weight:700;transition:all .15s;
          background:${r===i?"rgba(77,255,195,.13)":"rgba(255,255,255,.04)"};
          border:1.5px solid ${r===i?h.ok:"rgba(255,255,255,.09)"};
          color:${r===i?h.ok:"rgba(255,255,255,.6)"}"
        @click=${()=>this._select(t,r)}>${r}</button>`)}
    </div>`}render(){let t=this._config;if(!this.hass)return d;let n=this.hass.states[this.e("vpd")],i=!n&&!this.hass.states[this.e("enabled")],r=S(n?.state)??(i?1.06:null),s=n?.attributes?.temp,c=n?.attributes?.rh,a=n?.attributes?.phase_effektiv??"Veg",u=n?.attributes?.sollwerte,g=this.isOn(this.e("enabled")),m=this.isOn(this.e("climate")),x=this.hass.states[this.e("status")],f=x?.attributes?.probleme??[],v=x?.state?.toLowerCase?.()==="problem"?"warning":g?"ok":"none",y=F[v]??F.none,E=this.hass.states[this.e("event")],A=r!==null&&u&&r>=u.vpd_min&&r<=u.vpd_max,P=(b,C,T,W)=>l`
      <button class="gc" style="flex:1;display:flex;align-items:center;justify-content:center;gap:7px;
          padding:9px 10px;border-radius:13px;transition:all .18s;
          background:${T?"rgba(77,255,195,.12)":"rgba(255,255,255,.05)"};
          border:1.5px solid ${T?h.ok:"rgba(255,255,255,.12)"};
          color:${T?h.ok:"rgba(255,255,255,.5)"}"
        @click=${()=>this.confirmToggle(b,C)}>
        <ha-icon .icon=${W} style="--mdc-icon-size:15px"></ha-icon>
        <span style="font-size:11px;font-weight:800">${C} ${T?"AN":"AUS"}</span>
      </button>`,M=(b,C,T,W)=>l`
      <div class="tile" style="text-align:center">
        <div class="lbl">${b}</div>
        <div class="val" style="font-size:22px;${W?`color:${W}`:""}">${C}<span class="unit">${T}</span></div>
      </div>`;return l`<div class="card ${t.style?.glass?"glass":""}" data-level=${v==="none"?"ok":v}
        style="${w(t.style)};position:relative">
      <div class="hdr">
        <div>
          <div class="title">${t.name??`Zelt ${t.tent}`}</div>
          <div class="subtitle">Klima \u00b7 Phase ${a}${u?` \xB7 Soll ${u.vpd_min}\u2013${u.vpd_max} kPa / ${u.rh_min}\u2013${u.rh_max} %`:""}</div>
        </div>
        <span class="status-pill" style="background:${y.bg};color:${y.color}">
          <span class="dot" style="background:${y.color}"></span>${g?y.label:"Deaktiviert"}</span>
      </div>

      <div style="display:flex;gap:8px;margin-top:12px">
        ${P(this.e("enabled"),"Zelt",g,"mdi:power")}
        ${P(this.e("climate"),"Klima",m,"mdi:thermostat")}
      </div>

      <div class="kpis cols-3" style="margin-top:10px">
        ${M("Temperatur",s!=null?Number(s).toFixed(1):"\u2013","\xB0C")}
        ${M("Luftfeuchte",c!=null?String(Math.round(Number(c))):"\u2013","%")}
        ${M("VPD",r!==null?r.toFixed(2):"\u2013","kPa",r===null?void 0:A?h.ok:"#FFD166")}
      </div>

      <div style="display:flex;gap:14px;flex-wrap:wrap;margin-top:11px;align-items:center">
        <span class="lbl" style="margin:0">Modus</span>
        ${this.chips(this.e("mode"),Ze,this.st(this.e("mode"))??"VPD")}
        <span class="lbl" style="margin:0">Phase</span>
        ${this.chips(this.e("phase"),Ke,this.st(this.e("phase"))??"Auto")}
      </div>

      ${t.show_chart!==!1&&this._hist.length>1?l`
        <div class="seclbl">VPD \u00b7 ${t.hours??24}h</div>
        ${D([{data:this._hist,color:A===!1?"#FFD166":h.ok}],{w:this.chartW(),h:100,band:u?{min:u.vpd_min,max:u.vpd_max}:void 0,grid:3})}`:d}

      ${f.length?l`<div style="margin-top:9px">
        ${f.map(b=>l`<div class="logrow" style="background:rgba(255,209,102,.08);margin-top:4px">
          <span class="txt" style="color:#FFD166">\u26A0 ${b}</span></div>`)}</div>`:d}

      ${E?l`<button class="gc logrow" style="width:100%;margin-top:9px;text-align:left"
          @click=${()=>this.moreInfo(this.e("event"))}>
          <span class="dot" style="background:${z[E.attributes?.schweregrad]??h.info};flex-shrink:0"></span>
          <span class="txt" style="color:rgba(255,255,255,.6)">${E.state}</span>
        </button>`:d}
      ${this.renderConfirm()}
    </div>`}};customElements.define("growctrl-tent-card",Pt);var Mt=class extends _{render(){let e=[this.tentSelect(),this.stationSelect(this._config?.tent),p.text("name","Anzeigename (optional)"),p.bool("show_settings","Einstellungen-Zahnrad anzeigen"),p.bool("show_event","Ereignisfeld am Kartenfuss (Standard an)"),p.entity("tank_entity","Stations-Tank F\xFCllstand % (optional)","sensor"),p.num("tank_min","Tank-Mindeststand %",0,100),p.num("tank_volume","Tank-Volumen in Litern (optional)",1,1e4)],t=[p.entity("entity","Schalter",["switch","input_boolean","light","fan"]),p.text("name","Name (optional)"),p.select("kind","Art (Farbe/Icon)",[{value:"light",label:"Licht"},{value:"pump",label:"Pumpe"},{value:"o2",label:"O\u2082"},{value:"fan",label:"L\xFCfter"},{value:"heat",label:"Heizmatte"},{value:"water",label:"Befeuchter"}]),p.bool("confirm","Vor dem Schalten best\xE4tigen")],n=[p.text("name","Name"),p.text("strain","Sorte (optional)"),p.entity("germination_helper","Keimstart-Datum (date, optional)","date"),p.text("image","Bild-URL (optional)"),p.entity("temp_entity","\u{1F321}\uFE0F Temperatur (Sensor / input_number)"),p.entity("humidity_entity","\u{1F4A7} Feuchtigkeit (Sensor / input_number)"),p.entity("ph_entity","\u2697\uFE0F pH (Sensor / input_number)"),p.entity("ec_entity","\u26A1 EC (Sensor / input_number)"),p.entities("sensors","\u2795 Weitere Sensoren (werden als Felder gezeigt)"),p.entity("tank_entity","Tank-F\xFCllstand % (optional)","sensor"),p.num("tank_min","Tank-Mindeststand % (Standard 30)",0,100)];return l`${this.form(e)}
      ${this.list({key:"actuators",rowSchema:t,title:"Aktoren (Kacheln, 4 nebeneinander)",addLabel:"Aktor hinzuf\xFCgen",newItem:()=>({entity:""})})}
      ${this.list({key:"plants",rowSchema:n,title:"Pflanzen (Tabs in der Karte)",addLabel:"Pflanze hinzuf\xFCgen",newItem:()=>({name:""})})}
      ${this.styleSection()}
      <div class="hint">
        <b>Temperatur &amp; Feuchtigkeit</b> werden als Mini-Verlauf gezeigt, <b>pH &amp; EC</b> als
        Zonen-Balken (Ideal/akzeptiert/schlecht). W\u00e4hlst du dort ein <code>input_number</code>
        (oder <code>number</code>), erscheint ein <b>\u2212/\uff0b-Stepper</b> zum Setzen \u2013 ideal f\u00fcr
        Handmessungen ohne Sonde.<br>
        Eigene pH/EC-Idealbereiche oder weitere Sensoren per YAML:
        <code>ph_ideal: [5.8, 6.3]</code>, <code>ec_ideal: [1.2, 2.2]</code>,
        <code>sensors: [...]</code>.<br>
        Entity-IDs werden automatisch abgeleitet
        (z.B. <code>switch.growctrl_gross_main1_automatik</code>); Abweichungen per YAML
        <code>overrides: { automatik: switch.mein_schalter }</code>.
      </div>`}};customElements.define("growctrl-station-editor",Mt);var qe=["Seedling","Veg","Bloom","Flush","Trocknung"],ze={Seedling:"Anzucht",Veg:"Wachstum",Bloom:"Bl\xFCte",Flush:"Sp\xFClen",Trocknung:"Ernte"},Xe={light:"mdi:lightbulb",heat:"mdi:radiator",water:"mdi:air-humidifier",pump:"mdi:water-pump",fan:"mdi:fan",o2:"mdi:scuba-tank"},Rt=class extends ${constructor(){super(...arguments);this._open=!1;this._tab=0;this._phase=!1;this._spark={}}static{this.styles=k}static{this.properties={...$.properties,_open:{state:!0},_tab:{state:!0},_spark:{state:!0},_phase:{state:!0}}}updated(t){if(super.updated?.(t),!t.has("hass")&&!t.has("_config"))return;(this._config?.plants??[]).flatMap(r=>this.sensorsFor(r).filter(s=>s.anzeige==="graph")).forEach(async r=>{let s=await L(this.hass,r.entity,r.hours??24);s.length&&this._spark[r.entity]?.length!==s.length&&(this._spark={...this._spark,[r.entity]:s})})}validateConfig(t){if(!t.tent||!t.station)throw new Error("growctrl-station-card: 'tent' und 'station' sind Pflicht (wie in der Integration angelegt).")}static getConfigElement(){return document.createElement("growctrl-station-editor")}static getStubConfig(){return{tent:"gross",station:"main1"}}get isPreview(){return!this.hass?.states?.[this.e("stage")]}e(t){let[n,i,r]=Le[t],s=this._config;return s.overrides?.[i]??j(this.hass,s.tent,s.station,r)??ht(n,s.tent,s.station,i,s.overrides)}_select(t,n){this.hass.callService("select","select_option",{entity_id:t,option:n})}render(){let t=this._config;if(!this.hass)return d;let n=this.isPreview,i=this.st(this.e("stage"))??"Veg",r=pt[i]??pt.Veg,s=this.isOn(this.e("auto"))||n,c=this.isOn(this.e("wartung")),a=[{e:this.e("pOverride"),label:"Manueller Eingriff",crit:!1},{e:this.e("pFailsafe"),label:"Licht-Failsafe",crit:!0},{e:this.e("pTime"),label:"Zeiten unvollst\xE4ndig",crit:!1},{e:this.e("pPump"),label:"Pumpe gesperrt (F\xFCllstand)",crit:!1},{e:this.e("pPower"),label:"Licht ohne Leistung",crit:!0}].filter(x=>this.isOn(x.e)),u=this.hass.states[this.e("event")],g=a.length?a.some(x=>x.crit)?"critical":"warning":u?.attributes?.schweregrad==="critical"?"warning":"ok",m=F[g]??F.ok;return l`<div class="card ${t.style?.glass?"glass":""}" data-level=${g}
        style="${w(t.style)};position:relative">

      <div class="hdr">
        <div style="min-width:0">
          <div class="title">${t.name??`${t.tent} \xB7 ${t.station}`}</div>
          <div class="subtitle" style="display:flex;align-items:center;gap:6px">
            <span class="dot" style="width:7px;height:7px;border-radius:50%;background:${m.color};box-shadow:0 0 8px ${m.color}"></span>${m.label}
            ${c?l`<span style="color:${h.warn};font-weight:800">\u00b7 Wartung</span>`:d}
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:6px">
          <button class="gc" title="Wartung (System greift nicht ein)"
            style="width:40px;height:40px;border-radius:12px;display:flex;align-items:center;justify-content:center;
              background:${c?"rgba(255,206,122,.14)":"var(--card-2,#222F28)"};
              border:1px solid ${c?"rgba(255,206,122,.5)":"var(--gc-line)"};
              color:${c?h.warn:"rgba(242,247,243,.55)"}"
            @click=${()=>this.toggle(this.e("wartung"))}>
            <ha-icon icon="mdi:wrench-outline" style="--mdc-icon-size:16px"></ha-icon></button>
          ${t.show_settings!==!1?l`<button class="gc" title="Einstellungen"
            style="width:40px;height:40px;border-radius:12px;display:flex;align-items:center;justify-content:center;
              background:var(--card-2,#222F28);border:1px solid var(--gc-line);color:rgba(242,247,243,.55)"
            @click=${()=>{this._open=!this._open}}>
            <ha-icon icon="mdi:tune-variant" style="--mdc-icon-size:16px"></ha-icon></button>`:d}
          <button class="gc" style="min-height:40px;padding:0 16px;border-radius:999px;font-size:11.5px;font-weight:900;
              letter-spacing:.5px;
              background:${s?"var(--gc-accent)":"var(--card-2,#222F28)"};
              border:${s?"none":"1px solid var(--gc-line)"};
              color:${s?"#0D1812":"rgba(242,247,243,.5)"};
              box-shadow:${s?"0 4px 16px -6px var(--gc-accent)":"none"}"
            @click=${()=>this.confirmToggle(this.e("auto"),"Automatik")}>
            AUTO ${s?"AN":"AUS"}</button>
        </div>
      </div>

      ${this.phaseDropdown(i,r)}
      ${this.lightRow()}
      ${this.pumpRow(n)}
      ${this.dliRow(n)}
      ${this.actuators()}
      ${this.tankRow()}
      ${this.plantTabs()}

      ${a.length?l`<div style="display:flex;gap:7px;flex-wrap:wrap;margin-top:12px">
        ${a.map(x=>l`<span class="pbadge ${x.crit?"crit":"warn"}">
          <ha-icon icon="mdi:alert" style="--mdc-icon-size:12px"></ha-icon>${x.label}</span>`)}</div>`:d}

      ${t.show_event!==!1&&u?l`
        <button class="gc event" @click=${()=>this.moreInfo(this.e("event"))}>
          <span class="edot" style="background:${z[u.attributes?.schweregrad]??"rgba(242,247,243,.4)"}"></span>
          <span class="ebody">
            <span class="elbl">Letztes Ereignis</span>
            <span class="etx">${u.state}</span>
          </span>
          <span style="font:700 10.5px var(--f-num);color:rgba(242,247,243,.4)">
            ${u.last_changed?new Date(u.last_changed).toLocaleTimeString("de-DE",{hour:"2-digit",minute:"2-digit"}):""}</span>
        </button>`:d}

      ${this._open?l`<div class="settings-grid" style="margin-top:10px">
        ${this.setting(this.e("lightOn"),"Licht AN")}
        ${this.setting(this.e("lightOffSv"),"AUS Seed/Veg")}
        ${this.setting(this.e("lightOffBloom"),"AUS Bloom")}
        ${this.setting(this.e("germination"),"Keimstart")}
        ${this.setting(this.e("overrideMin"),"Man. \xDCbernahme")}
      </div>`:d}
      ${this.renderConfirm()}
    </div>`}setting(t,n){return l`<button class="gc tile" style="text-align:left;min-width:0" @click=${()=>this.moreInfo(t)}>
      <div class="lbl">${n}</div>
      <div style="font-size:14px;font-weight:800;color:rgba(242,247,243,.85);margin-top:3px">
        ${this.st(t)??"\u2013"}</div></button>`}phaseDropdown(t,n){let i=this.hass.states[this.e("rec")],r=i?.state&&i.state!==t?i.state:null;return l`<div class="dd">
      <button class="gc dd-btn" aria-haspopup="listbox" aria-expanded=${this._phase}
        @click=${()=>{this._phase=!this._phase}}>
        <span class="pdot" style="background:${n.color};color:${n.color}"></span>
        ${t}
        <span class="hint">${ze[t]??""}${r?" \xB7 Richtwert "+r:""}</span>
        <ha-icon icon="mdi:chevron-down" style="--mdc-icon-size:16px;color:rgba(242,247,243,.5);
          transition:transform .2s;${this._phase?"transform:rotate(180deg)":""}"></ha-icon>
      </button>
      ${this._phase?l`<div class="dd-menu" role="listbox">
        ${qe.map(s=>{let c=pt[s];return l`<button class="gc dd-it" role="option" aria-selected=${s===t}
            @click=${()=>{this._select(this.e("stage"),s),this._phase=!1}}>
            <span class="pdot" style="background:${c.color}"></span>${s}
            <span class="hint">${ze[s]??""}</span></button>`})}
      </div>`:d}
    </div>`}supplyRow(t){return l`<button class="gc supply" @click=${t.onClick??(()=>{})}>
      <span class="shd">
        <span class="sic" style="color:${t.iconColor};${t.glow?`filter:drop-shadow(0 0 7px ${t.iconColor})`:""}">
          <ha-icon icon="${t.icon}" style="--mdc-icon-size:20px"></ha-icon></span>
        <span class="stt">${t.title}</span>
        <span class="stm" style="color:${t.valueColor}">${t.value}</span>
      </span>
      ${t.fillPct!==null&&t.fillPct!==void 0?l`
        <span class="sbar"><i style="width:${Math.min(100,Math.max(0,t.fillPct))}%;
          background:linear-gradient(90deg, ${t.fillColor}, ${t.fillColor}cc);
          box-shadow:0 0 9px ${t.fillColor}55"></i>
          ${t.minPct!==void 0?l`<span class="min" style="left:${t.minPct}%"></span>`:d}</span>`:d}
      ${t.footL||t.footR?l`<span class="sft"><span>${t.footL??""}</span><span>${t.footR??""}</span></span>`:d}
    </button>`}lightRow(){if(this.isPreview)return this.supplyRow({icon:"mdi:lightbulb-on",iconColor:h.light,glow:!0,title:"Licht an",value:"5 h 40 min",valueColor:h.light,fillPct:62,fillColor:h.light,footL:"Leuchtphase",footR:"62 % verbleibend"});let t=this.hass.states[this.e("lightRest")];if(!t)return d;let n=t.attributes??{},i=n.zustand?n.zustand==="an":void 0,r=Number(t.state),s=n.text??(isNaN(r)?"\u2013":Tt(r)),c=typeof n.anteil=="number"?Math.min(1,Math.max(0,n.anteil)):null,a=i===!1?"#7E9488":h.light;return this.supplyRow({icon:i===!1?"mdi:lightbulb-outline":"mdi:lightbulb-on",iconColor:a,glow:i!==!1,title:i===!1?"Licht aus":"Licht an",value:s,valueColor:a,fillPct:c!==null?c*100:null,fillColor:a,footL:i===!1?"Dunkelphase":"Leuchtphase",footR:c!==null?`${(c*100).toFixed(0)} % verbleibend`:"",onClick:()=>this.moreInfo(this.e("lightRest"))})}pumpRow(t){let n=this.hass.states[this.e("pumpRest")];if(!n&&!t)return d;if(t)return this.supplyRow({icon:"mdi:water-pump",iconColor:h.water,title:"Pumpe aus",value:"in 12 min",valueColor:h.water,fillPct:80,fillColor:h.water,footL:"N\xE4chster Zyklus",footR:"80 % der Pause"});let i=Number(n.state),r=n.attributes??{},s=typeof r.anteil=="number"?Math.min(1,Math.max(0,r.anteil)):null,c=r.zustand?r.zustand==="an":void 0;return this.supplyRow({icon:"mdi:water-pump",iconColor:h.water,title:c?"Pumpe l\xE4uft":"Pumpe aus",value:isNaN(i)?"\u2013":Tt(i),valueColor:h.water,fillPct:s!==null?s*100:null,fillColor:h.water,footL:r.text??"Zyklus",footR:s!==null?`${(s*100).toFixed(0)} %`:"",onClick:()=>this.moreInfo(this.e("pumpRest"))})}dliRow(t){let n=this.hass.states[this.e("dli")];if(!n&&!t)return d;let i=S(this.st(this.e("dli")))??(t?18.4:null),r=S(this.st(this.e("dliFc")))??(t?24.7:null),s=n?.attributes?.ziel_aktuelle_phase??(t?25:void 0),c=s&&i!==null?i/s*100:null,a=s&&r!==null?Math.min(100,r/s*100):void 0;return this.supplyRow({icon:"mdi:white-balance-sunny",iconColor:h.light,title:"DLI heute",value:i!==null?`${i.toFixed(1)}${s?` / ${s}`:""}`:"\u2013",valueColor:h.light,fillPct:c,fillColor:h.light,minPct:a,footL:r!==null?`Prognose ${r.toFixed(1)} mol/m\xB2`:"",footR:s?"Marker = Prognose":"",onClick:()=>this.moreInfo(this.e("dli"))})}actuators(){let t=this._config.actuators??[];return t.length?l`
      <div class="seclbl">Aktoren</div>
      <div class="acts">
        ${t.map(n=>{let i=this.isOn(n.entity),r=n.kind??"",s=n.icon??Xe[r]??"mdi:power",c=n.name??this.friendly(n.entity);return l`<button class="gc act ${i?"on":""} ${i&&r?r:""}"
            @click=${()=>n.confirm?this.confirmToggle(n.entity,c):this.toggle(n.entity)}>
            <span class="aic"><ha-icon icon="${s}" style="--mdc-icon-size:18px"></ha-icon></span>
            <span class="anm">${c}</span>
            <span class="ast">${i?"AN":"AUS"}</span></button>`})}
      </div>`:d}tankRow(){let t=this._config;if(!t.tank_entity)return d;let n=Math.min(100,Math.max(0,S(this.st(t.tank_entity))??0)),i=t.tank_min??30,r=n<i,s=r?h.crit:h.water,c=t.tank_volume;return this.supplyRow({icon:"mdi:car-coolant-level",iconColor:h.water,title:"Tank",value:`${n.toFixed(0)} %`,valueColor:s,fillPct:n,fillColor:s,minPct:i,footL:c?`\u2248 ${(n/100*c).toFixed(0)} l von ${c} l`:r?"Unter Mindeststand":"",footR:`Min ${i} %`,onClick:()=>this.moreInfo(t.tank_entity)})}plantTabs(){let t=this._config.plants??[];if(!t.length)return d;let n=Math.min(this._tab,t.length-1),i=t[n],r=i.germination_helper?this.st(i.germination_helper):null,s=r?xe(r):null;return l`
      <div class="ptabs">
        ${t.map((c,a)=>l`<button class="gc ptab" role="tab" aria-selected=${a===n}
          @click=${()=>{this._tab=a}}>
          <ha-icon icon="mdi:sprout" style="--mdc-icon-size:15px"></ha-icon>${c.name}</button>`)}
      </div>
      <div class="plant">
        <div class="phd">
          ${i.image?l`<img class="pimg" src="${i.image}"/>`:l`<div class="pimg"><ha-icon icon="mdi:sprout" style="--mdc-icon-size:30px"></ha-icon></div>`}
          <div style="flex:1;min-width:0">
            <div class="pname">${i.name}</div>
            ${i.strain?l`<div class="pstrain">${i.strain}</div>`:d}
            ${s!==null?l`<span class="agechip">${be(s)}</span>`:d}
          </div>
        </div>
        ${this.plantSensors(this.sensorsFor(i))}
        ${i.tank_entity?this.plantTankInd(i.tank_entity,i.tank_min??30):d}
      </div>`}sensorsFor(t){let n=[];t.temp_entity&&n.push({entity:t.temp_entity,name:"Temperatur",anzeige:"graph",color:h.temp,icon:"mdi:thermometer",hours:24}),t.humidity_entity&&n.push({entity:t.humidity_entity,name:"Feuchtigkeit",anzeige:"graph",color:h.water,icon:"mdi:water-percent",hours:24}),t.ph_entity&&n.push({entity:t.ph_entity,name:"pH",anzeige:"zone",icon:"mdi:ph",min:4,max:8,ok:t.ph_ok??[5.5,6.5],ideal:t.ph_ideal??[5.8,6.3]}),t.ec_entity&&n.push({entity:t.ec_entity,name:"EC",anzeige:"zone",icon:"mdi:flash",min:0,max:3,ok:t.ec_ok??[1,2.4],ideal:t.ec_ideal??[1.2,2.2]});let i=(t.sensors??[]).map(r=>typeof r=="string"?{entity:r}:r);return[...n,...i]}plantSensors(t){return t.length?l`${t.map(n=>this.sensorInd(n))}`:d}sensorInd(t){let n=S(this.st(t.entity)),i=t.name??this.friendly(t.entity),r=this.unit(t.entity),s=t.anzeige??"wert",c=t.entity.split(".")[0],a=c==="number"||c==="input_number",u=this.hass.states[t.entity]?.attributes??{},g=t.step??(Number(u.step)||.1),m=u.min,x=u.max,f=(String(g).split(".")[1]??"").length||1,v=b=>{let C=b;m!==void 0&&(C=Math.max(m,C)),x!==void 0&&(C=Math.min(x,C)),this.hass.callService(c,"set_value",{entity_id:t.entity,value:Number(C.toFixed(f))})},y,E=t.ideal??[0,0],A=t.ok??E;if(s==="zone"){let b=n!==null&&n>=E[0]&&n<=E[1],C=n!==null&&n>=A[0]&&n<=A[1];y=t.color??(b?h.ok:C?h.warn:h.crit)}else s==="graph"?y=t.color??h.water:y=t.color??"rgba(242,247,243,.95)";let P=l`<div class="ihd">
      <span class="ilbl" style="color:${s==="wert"?"rgba(242,247,243,.62)":y};cursor:pointer"
        @click=${()=>this.moreInfo(t.entity)}>
        ${t.icon?l`<ha-icon icon="${t.icon}" style="--mdc-icon-size:14px"></ha-icon>`:d}${i}
        ${a?l`<ha-icon icon="mdi:pencil" style="--mdc-icon-size:11px;opacity:.45;margin-left:3px"></ha-icon>`:d}
      </span>
      ${a?l`<span class="setrow">
            <button class="gc stepbtn" title="weniger" @click=${()=>n!==null&&v(n-g)}>
              <ha-icon icon="mdi:minus" style="--mdc-icon-size:16px"></ha-icon></button>
            <span class="setval" style="color:${y}">${n!==null?n:"\u2013"}<span class="u">${r}</span></span>
            <button class="gc stepbtn" title="mehr" @click=${()=>v((n??m??0)+g)}>
              <ha-icon icon="mdi:plus" style="--mdc-icon-size:16px"></ha-icon></button></span>`:l`<span class="ival" style="color:${y};cursor:pointer" @click=${()=>this.moreInfo(t.entity)}>
            ${n!==null?n:this.st(t.entity)??"\u2013"}<span class="u">${r}</span></span>`}
    </div>`,M=s==="zone"?l`<div style="margin-top:8px">${Te(n,{min:t.min??0,max:t.max??14,okMin:A[0],okMax:A[1],idealMin:E[0],idealMax:E[1]})}</div>`:s==="graph"?l`<div style="margin-top:6px">${Fe(this._spark[t.entity]??[],y,this.chartW(74),38)}</div>`:d;return l`<div class="ind">${P}${M}</div>`}plantTankInd(t,n){let i=Math.min(100,Math.max(0,S(this.st(t))??0)),s=i<n?h.crit:h.water;return l`<button class="gc ind" @click=${()=>this.moreInfo(t)}>
      <div class="ihd"><span class="ilbl" style="color:${h.water}">
        <ha-icon icon="mdi:car-coolant-level" style="--mdc-icon-size:14px"></ha-icon>Tank</span>
        <span class="ival" style="color:${s}">${i.toFixed(0)}<span class="u"> %</span></span></div>
      <div class="sbar" style="margin-top:8px;height:10px;border-radius:6px;background:#0D1410;overflow:hidden;position:relative">
        <i style="display:block;height:100%;width:${i}%;border-radius:6px;
          background:linear-gradient(90deg, ${s}, ${s}cc);box-shadow:0 0 8px ${s}55"></i>
        <span style="position:absolute;top:-1px;bottom:-1px;left:${n}%;width:2.5px;background:rgba(255,255,255,.45)"></span></div>
    </button>`}};customElements.define("growctrl-station-card",Rt);var Qe=[p.text("title","Titel"),p.num("columns","Spalten",1,6)],Ye=[p.entity("entity","Aktor",["switch","input_boolean","light","fan"]),p.text("name","Name (optional)"),p.text("group","Gruppe (optional, z.B. Zelt / Pflanzen)"),p.bool("confirm","Mit Best\xE4tigung schalten")],Ot=class extends _{render(){return l`${this.form(Qe)}
      ${this.list({key:"controls",rowSchema:Ye,title:"Aktoren",addLabel:"Aktor hinzuf\xFCgen",newItem:()=>({entity:""})})}
      ${this.styleSection()}`}};customElements.define("growctrl-controls-editor",Ot);var Je={switch:"mdi:power",light:"mdi:lightbulb",fan:"mdi:fan",input_boolean:"mdi:toggle-switch"},It=class extends ${static{this.styles=k}validateConfig(e){if(!Array.isArray(e.controls)||!e.controls.length)throw new Error("growctrl-controls-card: 'controls' (min. 1 Eintrag) ist Pflicht.")}static getConfigElement(){return document.createElement("growctrl-controls-editor")}static getStubConfig(){return{controls:[{entity:"switch.beispiel"}]}}render(){let e=this._config;if(!this.hass)return d;let t=e.style?.accent??"#4DFFC3",n=new Map;e.controls.forEach(r=>{let s=r.group??"";n.has(s)||n.set(s,[]),n.get(s).push(r)});let i=e.columns?`repeat(${e.columns},1fr)`:"repeat(auto-fill,minmax(92px,1fr))";return l`<div class="card ${e.style?.glass?"glass":""}" style="${w(e.style)};position:relative">
      ${e.title?l`<div class="title" style="font-size:15px">${e.title}</div>`:d}
      ${[...n.entries()].map(([r,s])=>l`
        ${r?l`<div class="seclbl">${r}</div>`:d}
        <div class="grid" style="grid-template-columns:${i};gap:8px;margin-top:${r?0:10}px">
          ${s.map(c=>{let a=this.isOn(c.entity),u=c.name??this.friendly(c.entity),g=this.hass.states[c.entity],m=c.icon??g?.attributes?.icon??Je[c.entity.split(".")[0]]??"mdi:power";return l`<button class="gc" style="display:flex;flex-direction:column;align-items:center;gap:5px;
                padding:11px 6px 9px;border-radius:14px;transition:all .18s;min-width:0;
                background:${a?`color-mix(in srgb, ${t} 12%, transparent)`:"rgba(255,255,255,.04)"};
                border:1.5px solid ${a?t:"rgba(255,255,255,.08)"};
                box-shadow:${a?`0 4px 18px -8px ${t}`:"none"}"
              @click=${()=>c.confirm?this.confirmToggle(c.entity,u):this.toggle(c.entity)}>
              <span style="width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;
                  transition:all .18s;
                  background:${a?t:"rgba(255,255,255,.07)"};
                  color:${a?"#0C1117":"rgba(255,255,255,.55)"}">
                <ha-icon .icon=${m} style="--mdc-icon-size:18px"></ha-icon>
              </span>
              <span style="font-size:11px;font-weight:700;max-width:100%;overflow:hidden;white-space:nowrap;
                  text-overflow:ellipsis;color:${a?"rgba(255,255,255,.95)":"rgba(255,255,255,.65)"}">
                ${u}${c.confirm?" \u{1F512}":""}</span>
              <span style="font-size:9px;font-weight:800;letter-spacing:.8px;
                  color:${a?t:"rgba(255,255,255,.35)"}">${a?"AN":"AUS"}</span>
            </button>`})}
        </div>`)}
      ${this.renderConfirm()}
    </div>`}};customElements.define("growctrl-controls-card",It);var tn=[p.text("title","Titel"),p.num("columns","Spalten",1,6),p.num("sparkline_hours","Sparkline-Zeitraum (h)",1,168)],en=[p.entity("entity","Sensor","sensor"),p.text("name","Name (optional)"),p.num("min","Sollbereich Min (optional)"),p.num("max","Sollbereich Max (optional)")],Nt=class extends _{render(){return l`${this.form(tn)}
      ${this.list({key:"sensors",rowSchema:en,title:"Sensoren",addLabel:"Sensor hinzuf\xFCgen",newItem:()=>({entity:""})})}
      ${this.styleSection()}`}};customElements.define("growctrl-sensors-editor",Nt);var Bt=class extends ${constructor(){super(...arguments);this._hist={}}static{this.styles=k}static{this.properties={...$.properties,_hist:{state:!0}}}validateConfig(t){if(!Array.isArray(t.sensors)||!t.sensors.length)throw new Error("growctrl-sensors-card: 'sensors' (min. 1 Eintrag) ist Pflicht.")}static getConfigElement(){return document.createElement("growctrl-sensors-editor")}static getStubConfig(){return{sensors:[{entity:"sensor.beispiel"}]}}connectedCallback(){super.connectedCallback(),this._load(),this._timer=window.setInterval(()=>this._load(),5*6e4)}disconnectedCallback(){super.disconnectedCallback(),this._timer&&clearInterval(this._timer)}async _load(){if(!this.hass){setTimeout(()=>this._load(),1e3);return}let t=this._config,n={};for(let i of t.sensors)n[i.entity]=await L(this.hass,i.entity,t.sparkline_hours??24);this._hist=n}bad(t,n){return t!==null&&(n.min!==void 0&&t<n.min||n.max!==void 0&&t>n.max)}render(){let t=this._config;if(!this.hass)return d;let n=t.columns??2,i=t.sensors.some(r=>this.bad(S(this.st(r.entity)),r));return l`<div class="card ${t.style?.glass?"glass":""}" data-level=${i?"warning":"ok"}
        style=${w(t.style)}>
      ${t.title?l`<div class="title" style="font-size:15px;margin-bottom:2px">${t.title}</div>`:d}
      <div class="grid" style="grid-template-columns:repeat(${n},1fr)">
        ${t.sensors.map(r=>{let s=S(this.st(r.entity)),c=this.bad(s,r),a=ke(this._hist[r.entity]??[],100,26),u=r.name??this.friendly(r.entity);return l`<button class="gc tile" style="text-align:left;position:relative;overflow:hidden;
              ${c?"border-color:rgba(255,107,107,.45);background:rgba(255,107,107,.08)":""}"
            @click=${()=>this.moreInfo(r.entity)}>
            ${a?l`<svg viewBox="0 0 100 26" preserveAspectRatio="none"
              style="position:absolute;left:0;right:0;bottom:0;width:100%;height:30px;opacity:.5">
              <path d="${a} L100,26 L0,26 Z" fill="${c?"rgba(255,107,107,.25)":"rgba(77,255,195,.18)"}"/>
              <path d="${a}" fill="none" stroke="${c?h.crit:"rgba(77,255,195,.8)"}" stroke-width="1.4"/>
            </svg>`:d}
            <div class="lbl" style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${u}</div>
            <div class="val" style="font-size:22px;${c?`color:${h.crit}`:""}">${s!==null?s:"--"}<span class="unit">${this.unit(r.entity)}</span></div>
            <div style="height:14px"></div>
          </button>`})}
      </div>
    </div>`}};customElements.define("growctrl-sensors-card",Bt);var nn=[p.text("title","Titel"),p.num("limit","Max. Zeilen",3,50),p.select("min_level","Anzeige",[{value:"alle",label:"Alle Ereignisse"},{value:"warnung",label:"Nur Warnungen/Fehler"}])],sn=[p.entity("entity","Letztes-Ereignis-Sensor","sensor"),p.text("name","Label (optional)")],Dt=class extends _{render(){return l`${this.form(nn)}
      ${this.list({key:"sources",rowSchema:sn,title:"Quellen",addLabel:"Quelle hinzuf\xFCgen",newItem:()=>({entity:""})})}
      ${this.styleSection()}`}};customElements.define("growctrl-status-editor",Dt);var Ht=class extends ${static{this.styles=k}validateConfig(e){if(!Array.isArray(e.sources)||!e.sources.length)throw new Error("growctrl-status-card: 'sources' (Letztes-Ereignis-Sensoren) ist Pflicht.")}static getConfigElement(){return document.createElement("growctrl-status-editor")}static getStubConfig(){return{sources:[{entity:"sensor.growctrl_gross_main1_letztes_ereignis"}]}}render(){let e=this._config;if(!this.hass)return d;let t=[],n=[];for(let a of e.sources){let u=this.hass.states[a.entity],g=u?.attributes?.verlauf??[];n.push(u?.attributes?.schweregrad??"ok"),g.forEach(m=>t.push({...m,src:a.name??this.friendly(a.entity)}))}t.reverse();let r=(e.min_level==="warnung"?t.filter(a=>a.level==="warning"||a.level==="critical"):t).slice(0,e.limit??12),s=q(n.map(a=>a==="ok"?"ok":a)),c=F[s]??F.ok;return l`<div class="card ${e.style?.glass?"glass":""}" data-level=${s} style=${w(e.style)}>
      <div class="hdr">
        <div class="title" style="font-size:15px">${e.title??"Ereignisprotokoll"}</div>
        <span class="status-pill" style="background:${c.bg};color:${c.color}">
          <span class="dot" style="background:${c.color}"></span>${c.label}</span>
      </div>
      <div style="margin-top:9px">
        ${r.length?r.map(a=>l`
          <div class="logrow" style="background:${a.level==="info"?"transparent":N[a.level]??"transparent"};
              margin-top:3px;padding:6px 9px">
            <span class="ts" style="min-width:36px;flex-shrink:0">${a.ts}</span>
            ${e.sources.length>1?l`<span style="font-size:10.5px;font-weight:800;min-width:62px;
              flex-shrink:0;color:rgba(255,255,255,.55)">${a.src}</span>`:d}
            <span class="txt" style="color:${a.level==="info"?"rgba(255,255,255,.6)":z[a.level]??"rgba(255,255,255,.6)"}">${a.text}</span>
          </div>`):l`<div class="logrow"><span class="txt" style="color:${h.ok}">
            \u2713 Noch keine Ereignisse</span></div>`}
      </div>
    </div>`}};customElements.define("growctrl-status-card",Ht);var rn=[p.text("title","Titel (optional)"),p.text("logo","Logo-URL (z.B. /local/growctrl/logo.png)"),p.bool("show_chart","24h-Chart zus\xE4tzlich zum Zonen-Balken anzeigen"),p.num("hours","Chart-Zeitraum (h)",1,168)],Ut=class extends _{render(){let e=[this.stationSelect(this._config?.tent),p.text("name","Label (optional)")];return l`${this.form([this.tentSelect(),...rn])}
      ${this.list({key:"stations",rowSchema:e,title:"Stationen (Informationssystem)",addLabel:"Station hinzuf\xFCgen",newItem:()=>({station:""})})}
      ${this.styleSection()}`}};customElements.define("growctrl-hero-editor",Ut);var Gt=class extends ${constructor(){super(...arguments);this._logoErr=!1;this._hist=[]}static{this.styles=k}static{this.properties={...$.properties,_hist:{state:!0},_logoErr:{state:!0}}}validateConfig(t){if(!t.tent)throw new Error("growctrl-hero-card: 'tent' ist Pflicht (Zelt-Name aus der Integration).")}static getConfigElement(){return document.createElement("growctrl-hero-editor")}static getStubConfig(){return{tent:"gross",stations:[{station:"main1"}]}}te(t){let[n,i,r]=mt[t],s=this._config;return s.overrides?.[i]??j(this.hass,s.tent,"zelt",r)??gt(n,s.tent,i,s.overrides)}connectedCallback(){super.connectedCallback(),this._load(),this._timer=window.setInterval(()=>this._load(),5*6e4)}disconnectedCallback(){super.disconnectedCallback(),this._timer&&clearInterval(this._timer)}async _load(){if(!this.hass){setTimeout(()=>this._load(),1e3);return}this._hist=await L(this.hass,this.te("vpd"),this._config.hours??24)}render(){let t=this._config;if(!this.hass)return d;let n=this.hass.states[this.te("vpd")],i=!n&&!this.hass.states[this.te("enabled")],r=S(n?.state)??(i?1.06:null),s=n?.attributes?.temp??(i?22.4:null),c=n?.attributes?.rh??(i?52:null),a=n?.attributes?.phase_effektiv??"",u=n?.attributes?.sollwerte,g=this.isOn(this.te("enabled"))||i,m=this.isOn(this.te("climate")),x=this.hass.states[this.te("status")],f=x?.attributes?.probleme??[],v=(t.stations??[]).map(b=>{let C=this.hass.states[j(this.hass,t.tent,b.station,"last_event")??ht("sensor",t.tent,b.station,"letztes_ereignis",t.overrides)],T=C?.attributes?.schweregrad??"ok";return{name:b.name??b.station,text:C?.state??"\u2013",level:T}}),y=b=>b==="warning"||b==="critical",E=q([(x?.state??"").toLowerCase()==="problem"?"warning":"ok",...v.map(b=>y(b.level)?b.level:"ok")]),A=F[E]??F.ok,P=[...f.map(b=>({label:b,level:"warning"})),...v.filter(b=>y(b.level)).map(b=>({label:`${b.name}: ${b.text}`,level:b.level}))],M=(b,C,T,W)=>l`
      <button class="gc" style="display:flex;align-items:center;gap:8px;padding:8px 15px;border-radius:14px;
          transition:all .18s;
          background:${T?"rgba(77,255,195,.12)":"rgba(255,255,255,.05)"};
          border:1.5px solid ${T?h.ok:"rgba(255,255,255,.12)"};
          color:${T?h.ok:"rgba(255,255,255,.5)"}"
        @click=${()=>this.confirmToggle(b,C)}>
        <ha-icon .icon=${W} style="--mdc-icon-size:16px"></ha-icon>
        <span style="font-size:11px;font-weight:800">${C} ${T?"AN":"AUS"}</span>
      </button>`;return l`<div class="card ${t.style?.glass?"glass":""}" data-level=${E}
        style="${w(t.style)};position:relative">
      <div class="hdr">
        <div style="display:flex;align-items:center;gap:11px">
          ${t.logo&&!this._logoErr?l`<img src=${t.logo} alt="Logo"
            @error=${()=>{this._logoErr=!0}}
            style="width:42px;height:42px;border-radius:11px;object-fit:contain;background:rgba(255,255,255,.92);padding:3px" />`:l`<div style="width:42px;height:42px;border-radius:11px;flex-shrink:0;
              display:flex;align-items:center;justify-content:center;
              background:linear-gradient(135deg, rgba(77,255,195,.25), rgba(52,209,123,.12));
              border:1px solid rgba(77,255,195,.35)">
              <ha-icon icon="mdi:sprout" style="--mdc-icon-size:24px;color:#4DFFC3"></ha-icon>
            </div>`}
          <div>
            <div class="title">${t.title??`GROWCTRL \xB7 ${t.tent}`}</div>
            ${a?l`<div class="subtitle">Klima-Phase ${a}</div>`:d}
          </div>
        </div>
        <span class="status-pill" style="background:${A.bg};color:${A.color}">
          <span class="dot" style="background:${A.color}"></span>${A.label}</span>
      </div>

      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:13px">
        ${M(this.te("enabled"),"Zelt",g,"mdi:power")}
        ${M(this.te("climate"),"Klima",m,"mdi:thermostat")}
      </div>

      <div class="kpis cols-3" style="margin-top:12px">
        <div class="tile" style="text-align:center"><div class="lbl">Temperatur</div>
          <div class="val" style="font-size:22px">${s!=null?Number(s).toFixed(1):"\u2013"}<span class="unit">\u00b0C</span></div></div>
        <div class="tile" style="text-align:center"><div class="lbl">Luftfeuchte</div>
          <div class="val" style="font-size:22px">${c!=null?Math.round(Number(c)):"\u2013"}<span class="unit">%</span></div></div>
        <div class="tile" style="text-align:center"><div class="lbl">VPD</div>
          <div class="val" style="font-size:22px;color:${r!==null&&u&&r>=u.vpd_min&&r<=u.vpd_max?h.ok:"#FFD166"}">${r!==null?r.toFixed(2):"\u2013"}<span class="unit">kPa</span></div></div>
      </div>

      ${this.vpdZoneBar(r,u??null)}

      ${t.show_chart===!0&&this._hist.length>1?l`
        <div class="seclbl">VPD \u00b7 ${t.hours??24}h</div>
        ${D([{data:this._hist,color:h.ok}],{w:this.chartW(),h:100,band:u?{min:u.vpd_min,max:u.vpd_max}:void 0,grid:3})}`:d}

      ${v.length?l`<div class="seclbl">Stationen</div>
        ${v.map(b=>l`<div class="logrow" style="margin-top:3px;padding:6px 9px">
          <span class="dot" style="background:${b.level==="ok"?h.ok:z[b.level]??h.warn};flex-shrink:0"></span>
          <span style="font-size:11px;font-weight:800;min-width:62px;flex-shrink:0;
            color:rgba(255,255,255,.8)">${b.name}</span>
          <span class="txt" style="color:rgba(255,255,255,.55)">${b.text}</span>
        </div>`)}`:d}

      <div class="seclbl">Informationssystem</div>
      ${P.length?P.map(b=>l`<div class="logrow" style="background:${N[b.level]??N.warning};margin-top:4px">
            <span class="txt" style="color:${z[b.level]??z.warning}">\u26A0 ${b.label}</span></div>`):l`<div class="logrow" style="background:${N.ok};margin-top:4px">
            <span class="txt" style="color:${h.ok}">\u2713 Alle Systeme arbeiten normal</span></div>`}
      ${this.renderConfirm()}
    </div>`}vpdZoneBar(t,n){let i=[{to:.4,col:"#5B8DEF",lbl:"zu feucht"},{to:.8,col:"#58E0A5",lbl:"Seedling"},{to:1.2,col:"#34D17B",lbl:"Veg"},{to:1.6,col:"#FFB35C",lbl:"Bloom"},{to:2,col:"#FF6B6B",lbl:"zu trocken"}],r=2,s=t!==null?Math.min(1,Math.max(0,t/r))*100:null,c=0;return l`<div style="margin-top:12px">
      <div style="position:relative;height:12px;border-radius:6px;
                  display:flex;box-shadow:inset 0 1px 3px rgba(0,0,0,.4)">
        ${i.map(a=>{let u=(a.to-c)/r*100,g=c===0;return c=a.to,l`<div style="width:${u}%;background:${a.col};opacity:.75;
            ${g?"border-radius:6px 0 0 6px;":""}
            ${a.to===r?"border-radius:0 6px 6px 0;":""}"></div>`})}
        ${n?l`<div style="position:absolute;top:-2px;bottom:-2px;
          left:${n.vpd_min/r*100}%;width:${(n.vpd_max-n.vpd_min)/r*100}%;
          border:1.5px solid rgba(255,255,255,.85);border-radius:4px;pointer-events:none"></div>`:d}
        ${s!==null?l`<div style="position:absolute;top:-4px;bottom:-4px;left:${s}%;
          width:3px;margin-left:-1.5px;background:#fff;border-radius:2px;
          box-shadow:0 0 6px rgba(255,255,255,.9)"></div>`:d}
      </div>
      <div style="display:flex;margin-top:4px">
        ${(()=>{let a=0;return i.map(u=>{let g=(u.to-a)/r*100;return a=u.to,l`<div style="width:${g}%;text-align:center;font-size:9.5px;
            color:rgba(255,255,255,.6);overflow:hidden;white-space:nowrap">${u.lbl}</div>`})})()}
      </div>
    </div>`}};customElements.define("growctrl-hero-card",Gt);var on=[p.text("title","Titel"),p.bool("compact","Kompakte Zeilen")],an=[p.text("name","Name (z.B. Main 1)"),p.entity("entity","Quelle (Log / Problem- / Ereignis-Sensor)",["input_text","binary_sensor","sensor"]),p.select("type","Typ",[{value:"station",label:"Stations-Log"},{value:"climate",label:"Klima-Log"},{value:"problem",label:"Problem-Sensor"},{value:"event",label:"Ereignis-Sensor (Integration)"}])],Vt=class extends _{render(){return l`${this.form(on)}
      ${this.list({key:"rows",rowSchema:an,title:"Zeilen",addLabel:"Zeile hinzuf\xFCgen",newItem:()=>({name:"",entity:"",type:"station"})})}
      ${this.styleSection()}`}};customElements.define("growctrl-checkup-editor",Vt);var jt=class extends ${static{this.styles=k}validateConfig(e){if(!Array.isArray(e.rows)||!e.rows.length)throw new Error("growctrl-checkup-card: 'rows' (min. 1 Eintrag) ist Pflicht.")}static getConfigElement(){return document.createElement("growctrl-checkup-editor")}static getStubConfig(){return{rows:[{name:"Main 1",entity:"input_text.hydro_log_mittel_main1"}]}}render(){let e=this._config;if(!this.hass)return d;let t=e.rows.map(s=>{if(s.type==="event"){let a=this.hass.states[s.entity],u=a?.attributes?.schweregrad??"ok";return{row:s,level:u==="ok"?"ok":u,label:a?.state??"\u2013",ts:""}}if(s.type?.toLowerCase?.()==="problem"){let a=this.isOn(s.entity);return{row:s,level:a?"warning":"ok",label:a?"Problem erkannt":"OK",ts:""}}let c=(s.type==="climate"?$e:_e)(this.st(s.entity));return{row:s,level:c.level==="none"?"ok":c.level,label:c.label,ts:c.ts??""}}),n=q(t.map(s=>s.level)),i=F[n]??F.ok,r=s=>s==="critical"?h.crit:s==="warning"?h.warn:s==="info"?h.info:h.ok;return l`<div class="card ${e.style?.glass?"glass":""}" data-level=${n} style=${w(e.style)}>
      <div class="hdr">
        <div class="title" style="font-size:15px">${e.title??"Checkup"}</div>
        <span class="status-pill" style="background:${i.bg};color:${i.color}">
          <span class="dot" style="background:${i.color}"></span>${i.label}</span>
      </div>
      <div style="margin-top:10px">
        ${t.map(s=>l`<div class="logrow" style="background:${e.compact?"transparent":N[s.level==="ok"?"none":s.level]};
            margin-top:${e.compact?2:5}px;padding:${e.compact?"4px 6px":"8px 11px"}">
          <span style="width:9px;height:9px;border-radius:50%;flex-shrink:0;background:${r(s.level)};
            box-shadow:0 0 7px ${r(s.level)}66"></span>
          <span style="font-size:11.5px;font-weight:800;min-width:64px;flex-shrink:0;color:rgba(255,255,255,.85)">${s.row.name}</span>
          <span class="txt" style="color:${s.level==="ok"?"rgba(255,255,255,.55)":z[s.level]}">${s.label}</span>
          ${s.ts?l`<span class="ts">${s.ts}</span>`:d}
        </div>`)}
      </div>
    </div>`}};customElements.define("growctrl-checkup-card",jt);var ln=[p.text("title","Titel"),p.entity("entity","F\xFCllstand-Sensor (%) (Pflicht)","sensor"),p.num("min","Mindeststand (%)",0,100),p.num("volume_l","Tankvolumen (Liter, optional)",0,2e3)],Wt=class extends _{render(){return l`${this.form(ln)}${this.styleSection()}`}};customElements.define("growctrl-tank-editor",Wt);var Zt=class extends ${static{this.styles=k}validateConfig(e){if(!e.entity)throw new Error("growctrl-tank-card: 'entity' (Fuellstand-Sensor in %) ist Pflicht.")}static getConfigElement(){return document.createElement("growctrl-tank-editor")}static getStubConfig(){return{entity:"sensor.gc_slot1_level1",title:"Tank"}}render(){let e=this._config;if(!this.hass)return d;let t=!this.hass.states[e.entity],n=Math.min(100,Math.max(0,S(this.st(e.entity))??(t?62:0))),i=e.min!==void 0&&n<e.min,r=i?h.crit:n<(e.min??0)+15?h.warn:"#4FC3F7",s=e.volume_l?n/100*e.volume_l:null;return l`<div class="card ${e.style?.glass?"glass":""}" data-level=${i?"critical":"ok"}
        style=${w(e.style)}>
      <div class="hdr">
        <div class="title" style="font-size:15px">${e.title??"F\xFCllstand"}</div>
        ${i?l`<span class="badge warn">\u26A0 Nachf\u00fcllen</span>`:d}
      </div>
      <div style="display:flex;align-items:center;gap:18px;margin-top:12px">
        <button class="gc" style="position:relative;width:74px;height:108px;flex-shrink:0;border-radius:12px 12px 16px 16px;
            border:2px solid rgba(255,255,255,.15);overflow:hidden;background:rgba(0,0,0,.3)"
          @click=${()=>this.moreInfo(e.entity)}>
          <div style="position:absolute;left:0;right:0;bottom:0;height:${n}%;transition:height .8s;
              background:linear-gradient(180deg, ${r}cc, ${r}88)">
            <div style="position:absolute;top:-5px;left:-10%;width:120%;height:10px;border-radius:50%;
              background:${r};opacity:.9"></div>
          </div>
          ${e.min!==void 0?l`<div style="position:absolute;left:0;right:0;bottom:${e.min}%;
            border-top:1.5px dashed rgba(255,107,107,.7)"></div>`:d}
        </button>
        <div style="flex:1;min-width:0">
          <div class="lbl">Aktueller F\u00fcllstand</div>
          <div class="val" style="font-size:34px;color:${r}">${Math.round(n)}<span class="unit">%</span></div>
          ${s!==null?l`<div style="font-size:12px;font-weight:600;color:rgba(255,255,255,.55);margin-top:2px">
            \u2248 ${s.toFixed(1)} l von ${e.volume_l} l</div>`:d}
          ${e.min!==void 0?l`<div style="font-size:10.5px;color:rgba(255,255,255,.4);margin-top:6px">
            Mindeststand ${e.min}%</div>`:d}
        </div>
      </div>
    </div>`}};customElements.define("growctrl-tank-card",Zt);var cn=[p.text("title","Titel"),p.num("hours","Zeitraum (h)",1,168),p.num("height","Diagrammh\xF6he (px)",80,300)],dn=[p.entity("entity","Sensor","sensor"),p.text("name","Name (optional)"),p.text("color","Farbe (optional, z.B. #FF9F5A)")],Kt=class extends _{render(){return l`${this.form(cn)}
      ${this.list({key:"sensors",rowSchema:dn,title:"Serien",addLabel:"Sensor hinzuf\xFCgen",newItem:()=>({entity:""})})}
      ${this.styleSection()}`}};customElements.define("growctrl-history-editor",Kt);var Pe=["#FF9F5A","#4FC3F7","#4DFFC3","#C792EA"],qt=class extends ${constructor(){super(...arguments);this._hist={}}static{this.styles=k}static{this.properties={...$.properties,_hist:{state:!0}}}validateConfig(t){if(!Array.isArray(t.sensors)||!t.sensors.length)throw new Error("growctrl-history-card: 'sensors' (min. 1 Eintrag) ist Pflicht.")}static getConfigElement(){return document.createElement("growctrl-history-editor")}static getStubConfig(){return{sensors:[{entity:"sensor.zelt_temperature"}],hours:24}}connectedCallback(){super.connectedCallback(),this._load(),this._timer=window.setInterval(()=>this._load(),5*6e4)}disconnectedCallback(){super.disconnectedCallback(),this._timer&&clearInterval(this._timer)}async _load(){if(!this.hass){setTimeout(()=>this._load(),1e3);return}let t=this._config,n={};for(let i of t.sensors)n[i.entity]=await L(this.hass,i.entity,t.hours??24);this._hist=n}render(){let t=this._config;if(!this.hass)return d;let n=t.sensors.map((i,r)=>({data:this._hist[i.entity]??[],color:i.color??Pe[r%Pe.length],name:`${i.name??this.friendly(i.entity)} \xB7 ${S(this.st(i.entity))??"--"} ${this.unit(i.entity)}`,fill:t.sensors.length===1}));return l`<div class="card ${t.style?.glass?"glass":""}" style=${w(t.style)}>
      <div class="hdr">
        <div class="title" style="font-size:15px">${t.title??"Verlauf"}</div>
        <span class="badge">${t.hours??24}h</span>
      </div>
      <div style="margin-top:8px">${D(n,{w:this.chartW(),h:t.height??130,grid:3})}</div>
      ${Ee(n)}
    </div>`}};customElements.define("growctrl-history-card",qt);var pn=[p.text("title","Titel"),p.entity("entity","Sensor (Pflicht)","sensor"),p.text("name","Anzeigename (optional)"),p.num("min","Sollbereich Min"),p.num("max","Sollbereich Max"),p.num("decimals","Nachkommastellen",0,4),p.num("hours","Chart-Zeitraum (h)",1,168),p.num("height","Diagrammh\xF6he (px)",80,300)],Xt=class extends _{render(){return l`${this.form(pn)}${this.styleSection()}`}};customElements.define("growctrl-metric-editor",Xt);var Qt=class extends ${constructor(){super(...arguments);this._hist=[]}static{this.styles=k}static{this.properties={...$.properties,_hist:{state:!0}}}validateConfig(t){if(!t.entity)throw new Error("growctrl-metric-card: 'entity' ist Pflicht.")}static getConfigElement(){return document.createElement("growctrl-metric-editor")}static getStubConfig(){return{entity:"sensor.gc_slot1_ec1",name:"EC",min:1.2,max:2.2}}connectedCallback(){super.connectedCallback(),this._load(),this._timer=window.setInterval(()=>this._load(),5*6e4)}disconnectedCallback(){super.disconnectedCallback(),this._timer&&clearInterval(this._timer)}async _load(){if(!this.hass){setTimeout(()=>this._load(),1e3);return}let t=this._config;this._hist=await L(this.hass,t.entity,t.hours??24)}render(){let t=this._config;if(!this.hass)return d;let n=S(this.st(t.entity))??(this.hass.states[t.entity]?null:1.84),i=n!==null&&(t.min!==void 0&&n<t.min||t.max!==void 0&&n>t.max),r=n===null?"rgba(255,255,255,.4)":i?h.crit:h.ok,s=t.decimals??2;return l`<div class="card ${t.style?.glass?"glass":""}" data-level=${i?"warning":"ok"}
        style=${w(t.style)}>
      <div class="hdr">
        <div>
          <div class="lbl" style="font-size:11px;text-transform:uppercase;letter-spacing:.9px;color:rgba(255,255,255,.62);font-weight:700">
            ${t.name??this.friendly(t.entity)}</div>
          <button class="gc" @click=${()=>this.moreInfo(t.entity)}>
            <span class="val" style="font-size:36px;font-weight:800;letter-spacing:-1px;color:${r}">
              ${n!==null?n.toFixed(s):"--"}</span>
            <span class="unit" style="font-size:14px">${this.unit(t.entity)}</span>
          </button>
        </div>
        ${t.min!==void 0||t.max!==void 0?l`
          <div style="text-align:right">
            <div class="lbl">Sollbereich</div>
            <div style="font-size:13px;font-weight:700;color:${i?h.crit:"rgba(255,255,255,.7)"}">
              ${t.min??"\u2013"} \u2013 ${t.max??"\u2013"}</div>
            ${i?l`<div style="font-size:10px;font-weight:800;color:${h.crit};margin-top:2px">
              ${n<(t.min??-1/0)?"\u25BC ZU NIEDRIG":"\u25B2 ZU HOCH"}</div>`:d}
          </div>`:d}
      </div>
      <div style="margin-top:14px">
        ${D([{data:this._hist,color:i?h.crit:"#4DFFC3"}],{w:this.chartW(),h:t.height??110,band:{min:t.min,max:t.max},grid:3})}
      </div>
    </div>`}};customElements.define("growctrl-metric-card",Qt);var un="3.3.0",hn=[{type:"growctrl-tent-card",name:"GROWCTRL Tent",description:"Zelt-Hero: Klima-KPIs, VPD-Skala, Status-Ampel"},{type:"growctrl-station-card",name:"GROWCTRL Station",description:"Station: Licht-/Pumpenbalken, Stage, Auto, Konfiguration"},{type:"growctrl-controls-card",name:"GROWCTRL Controls",description:"Aktoren-Raster mit Gruppen und Bestaetigung"},{type:"growctrl-sensors-card",name:"GROWCTRL Sensors",description:"Sensor-Kacheln mit Sparklines"},{type:"growctrl-status-card",name:"GROWCTRL Status",description:"Ereignisprotokoll der Integration mit Schweregrad-Ampel"},{type:"growctrl-hero-card",name:"GROWCTRL Hero",description:"Globale Steuerung, Klima-KPIs, VPD-Chart, Informationssystem"},{type:"growctrl-checkup-card",name:"GROWCTRL Checkup",description:"Ampel-Uebersicht aller Zelte/Stationen mit Auswertung"},{type:"growctrl-tank-card",name:"GROWCTRL Tank",description:"DWC-Fuellstand mit Animation und Warnstufe"},{type:"growctrl-history-card",name:"GROWCTRL History",description:"24h-Diagramm (z.B. Temperatur + Luftfeuchte)"},{type:"growctrl-metric-card",name:"GROWCTRL Metric",description:"EC/pH gross mit Chart und Sollbereich"}];window.customCards=window.customCards??[];hn.forEach(o=>window.customCards.push({...o,preview:!0,documentationURL:"https://github.com/MrDarkvoid/growctrl"}));console.info(`%c GROWCTRL Cards %c v${un} `,"background:#1D9E75;color:#fff;font-weight:700","background:#0F6E56;color:#fff");
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
