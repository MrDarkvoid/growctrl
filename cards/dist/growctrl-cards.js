var rt=globalThis,ot=rt.ShadowRoot&&(rt.ShadyCSS===void 0||rt.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ft=Symbol(),Yt=new WeakMap,X=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==ft)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(ot&&e===void 0){let i=t!==void 0&&t.length===1;i&&(e=Yt.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&Yt.set(t,e))}return e}toString(){return this.cssText}},Jt=o=>new X(typeof o=="string"?o:o+"",void 0,ft),Q=(o,...e)=>{let t=o.length===1?o[0]:e.reduce((i,n,r)=>i+(s=>{if(s._$cssResult$===!0)return s.cssText;if(typeof s=="number")return s;throw Error("Value passed to 'css' function must be a 'css' function result: "+s+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+o[r+1],o[0]);return new X(t,o,ft)},te=(o,e)=>{if(ot)o.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(let t of e){let i=document.createElement("style"),n=rt.litNonce;n!==void 0&&i.setAttribute("nonce",n),i.textContent=t.cssText,o.appendChild(i)}},bt=ot?o=>o:o=>o instanceof CSSStyleSheet?(e=>{let t="";for(let i of e.cssRules)t+=i.cssText;return Jt(t)})(o):o;var{is:Re,defineProperty:ze,getOwnPropertyDescriptor:Oe,getOwnPropertyNames:Ie,getOwnPropertySymbols:Ne,getPrototypeOf:Be}=Object,at=globalThis,ee=at.trustedTypes,De=ee?ee.emptyScript:"",Ue=at.reactiveElementPolyfillSupport,Y=(o,e)=>o,xt={toAttribute(o,e){switch(e){case Boolean:o=o?De:null;break;case Object:case Array:o=o==null?o:JSON.stringify(o)}return o},fromAttribute(o,e){let t=o;switch(e){case Boolean:t=o!==null;break;case Number:t=o===null?null:Number(o);break;case Object:case Array:try{t=JSON.parse(o)}catch{t=null}}return t}},ne=(o,e)=>!Re(o,e),ie={attribute:!0,type:String,converter:xt,reflect:!1,useDefault:!1,hasChanged:ne};Symbol.metadata??=Symbol("metadata"),at.litPropertyMetadata??=new WeakMap;var z=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=ie){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let i=Symbol(),n=this.getPropertyDescriptor(e,i,t);n!==void 0&&ze(this.prototype,e,n)}}static getPropertyDescriptor(e,t,i){let{get:n,set:r}=Oe(this.prototype,e)??{get(){return this[t]},set(s){this[t]=s}};return{get:n,set(s){let c=n?.call(this);r?.call(this,s),this.requestUpdate(e,c,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??ie}static _$Ei(){if(this.hasOwnProperty(Y("elementProperties")))return;let e=Be(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(Y("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Y("properties"))){let t=this.properties,i=[...Ie(t),...Ne(t)];for(let n of i)this.createProperty(n,t[n])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[i,n]of t)this.elementProperties.set(i,n)}this._$Eh=new Map;for(let[t,i]of this.elementProperties){let n=this._$Eu(t,i);n!==void 0&&this._$Eh.set(n,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let i=new Set(e.flat(1/0).reverse());for(let n of i)t.unshift(bt(n))}else e!==void 0&&t.push(bt(e));return t}static _$Eu(e,t){let i=t.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return te(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){let i=this.constructor.elementProperties.get(e),n=this.constructor._$Eu(e,i);if(n!==void 0&&i.reflect===!0){let r=(i.converter?.toAttribute!==void 0?i.converter:xt).toAttribute(t,i.type);this._$Em=e,r==null?this.removeAttribute(n):this.setAttribute(n,r),this._$Em=null}}_$AK(e,t){let i=this.constructor,n=i._$Eh.get(e);if(n!==void 0&&this._$Em!==n){let r=i.getPropertyOptions(n),s=typeof r.converter=="function"?{fromAttribute:r.converter}:r.converter?.fromAttribute!==void 0?r.converter:xt;this._$Em=n;let c=s.fromAttribute(t,r.type);this[n]=c??this._$Ej?.get(n)??c,this._$Em=null}}requestUpdate(e,t,i,n=!1,r){if(e!==void 0){let s=this.constructor;if(n===!1&&(r=this[e]),i??=s.getPropertyOptions(e),!((i.hasChanged??ne)(r,t)||i.useDefault&&i.reflect&&r===this._$Ej?.get(e)&&!this.hasAttribute(s._$Eu(e,i))))return;this.C(e,t,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:n,wrapped:r},s){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,s??t??this[e]),r!==!0||s!==void 0)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),n===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[n,r]of this._$Ep)this[n]=r;this._$Ep=void 0}let i=this.constructor.elementProperties;if(i.size>0)for(let[n,r]of i){let{wrapped:s}=r,c=this[n];s!==!0||this._$AL.has(n)||c===void 0||this.C(n,void 0,r,c)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(i=>i.hostUpdate?.()),this.update(t)):this._$EM()}catch(i){throw e=!1,this._$EM(),i}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(e){}firstUpdated(e){}};z.elementStyles=[],z.shadowRootOptions={mode:"open"},z[Y("elementProperties")]=new Map,z[Y("finalized")]=new Map,Ue?.({ReactiveElement:z}),(at.reactiveElementVersions??=[]).push("2.1.2");var St=globalThis,se=o=>o,lt=St.trustedTypes,re=lt?lt.createPolicy("lit-html",{createHTML:o=>o}):void 0,de="$lit$",I=`lit$${Math.random().toFixed(9).slice(2)}$`,he="?"+I,He=`<${he}>`,G=document,tt=()=>G.createComment(""),et=o=>o===null||typeof o!="object"&&typeof o!="function",Ct=Array.isArray,Ge=o=>Ct(o)||typeof o?.[Symbol.iterator]=="function",vt=`[ 	
\f\r]`,J=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,oe=/-->/g,ae=/>/g,U=RegExp(`>|${vt}(?:([^\\s"'>=/]+)(${vt}*=${vt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),le=/'/g,ce=/"/g,ue=/^(?:script|style|textarea|title)$/i,At=o=>(e,...t)=>({_$litType$:o,strings:e,values:t}),l=At(1),st=At(2),bi=At(3),V=Symbol.for("lit-noChange"),p=Symbol.for("lit-nothing"),pe=new WeakMap,H=G.createTreeWalker(G,129);function ge(o,e){if(!Ct(o)||!o.hasOwnProperty("raw"))throw Error("invalid template strings array");return re!==void 0?re.createHTML(e):e}var Ve=(o,e)=>{let t=o.length-1,i=[],n,r=e===2?"<svg>":e===3?"<math>":"",s=J;for(let c=0;c<t;c++){let a=o[c],d,g,m=-1,x=0;for(;x<a.length&&(s.lastIndex=x,g=s.exec(a),g!==null);)x=s.lastIndex,s===J?g[1]==="!--"?s=oe:g[1]!==void 0?s=ae:g[2]!==void 0?(ue.test(g[2])&&(n=RegExp("</"+g[2],"g")),s=U):g[3]!==void 0&&(s=U):s===U?g[0]===">"?(s=n??J,m=-1):g[1]===void 0?m=-2:(m=s.lastIndex-g[2].length,d=g[1],s=g[3]===void 0?U:g[3]==='"'?ce:le):s===ce||s===le?s=U:s===oe||s===ae?s=J:(s=U,n=void 0);let f=s===U&&o[c+1].startsWith("/>")?" ":"";r+=s===J?a+He:m>=0?(i.push(d),a.slice(0,m)+de+a.slice(m)+I+f):a+I+(m===-2?c:f)}return[ge(o,r+(o[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),i]},it=class o{constructor({strings:e,_$litType$:t},i){let n;this.parts=[];let r=0,s=0,c=e.length-1,a=this.parts,[d,g]=Ve(e,t);if(this.el=o.createElement(d,i),H.currentNode=this.el.content,t===2||t===3){let m=this.el.content.firstChild;m.replaceWith(...m.childNodes)}for(;(n=H.nextNode())!==null&&a.length<c;){if(n.nodeType===1){if(n.hasAttributes())for(let m of n.getAttributeNames())if(m.endsWith(de)){let x=g[s++],f=n.getAttribute(m).split(I),v=/([.?@])?(.*)/.exec(x);a.push({type:1,index:r,name:v[2],strings:f,ctor:v[1]==="."?$t:v[1]==="?"?_t:v[1]==="@"?wt:K}),n.removeAttribute(m)}else m.startsWith(I)&&(a.push({type:6,index:r}),n.removeAttribute(m));if(ue.test(n.tagName)){let m=n.textContent.split(I),x=m.length-1;if(x>0){n.textContent=lt?lt.emptyScript:"";for(let f=0;f<x;f++)n.append(m[f],tt()),H.nextNode(),a.push({type:2,index:++r});n.append(m[x],tt())}}}else if(n.nodeType===8)if(n.data===he)a.push({type:2,index:r});else{let m=-1;for(;(m=n.data.indexOf(I,m+1))!==-1;)a.push({type:7,index:r}),m+=I.length-1}r++}}static createElement(e,t){let i=G.createElement("template");return i.innerHTML=e,i}};function Z(o,e,t=o,i){if(e===V)return e;let n=i!==void 0?t._$Co?.[i]:t._$Cl,r=et(e)?void 0:e._$litDirective$;return n?.constructor!==r&&(n?._$AO?.(!1),r===void 0?n=void 0:(n=new r(o),n._$AT(o,t,i)),i!==void 0?(t._$Co??=[])[i]=n:t._$Cl=n),n!==void 0&&(e=Z(o,n._$AS(o,e.values),n,i)),e}var yt=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:i}=this._$AD,n=(e?.creationScope??G).importNode(t,!0);H.currentNode=n;let r=H.nextNode(),s=0,c=0,a=i[0];for(;a!==void 0;){if(s===a.index){let d;a.type===2?d=new nt(r,r.nextSibling,this,e):a.type===1?d=new a.ctor(r,a.name,a.strings,this,e):a.type===6&&(d=new kt(r,this,e)),this._$AV.push(d),a=i[++c]}s!==a?.index&&(r=H.nextNode(),s++)}return H.currentNode=G,n}p(e){let t=0;for(let i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}},nt=class o{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,n){this.type=2,this._$AH=p,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=n,this._$Cv=n?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Z(this,e,t),et(e)?e===p||e==null||e===""?(this._$AH!==p&&this._$AR(),this._$AH=p):e!==this._$AH&&e!==V&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Ge(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==p&&et(this._$AH)?this._$AA.nextSibling.data=e:this.T(G.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:i}=e,n=typeof i=="number"?this._$AC(e):(i.el===void 0&&(i.el=it.createElement(ge(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===n)this._$AH.p(t);else{let r=new yt(n,this),s=r.u(this.options);r.p(t),this.T(s),this._$AH=r}}_$AC(e){let t=pe.get(e.strings);return t===void 0&&pe.set(e.strings,t=new it(e)),t}k(e){Ct(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,i,n=0;for(let r of e)n===t.length?t.push(i=new o(this.O(tt()),this.O(tt()),this,this.options)):i=t[n],i._$AI(r),n++;n<t.length&&(this._$AR(i&&i._$AB.nextSibling,n),t.length=n)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let i=se(e).nextSibling;se(e).remove(),e=i}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},K=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,n,r){this.type=1,this._$AH=p,this._$AN=void 0,this.element=e,this.name=t,this._$AM=n,this.options=r,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=p}_$AI(e,t=this,i,n){let r=this.strings,s=!1;if(r===void 0)e=Z(this,e,t,0),s=!et(e)||e!==this._$AH&&e!==V,s&&(this._$AH=e);else{let c=e,a,d;for(e=r[0],a=0;a<r.length-1;a++)d=Z(this,c[i+a],t,a),d===V&&(d=this._$AH[a]),s||=!et(d)||d!==this._$AH[a],d===p?e=p:e!==p&&(e+=(d??"")+r[a+1]),this._$AH[a]=d}s&&!n&&this.j(e)}j(e){e===p?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},$t=class extends K{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===p?void 0:e}},_t=class extends K{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==p)}},wt=class extends K{constructor(e,t,i,n,r){super(e,t,i,n,r),this.type=5}_$AI(e,t=this){if((e=Z(this,e,t,0)??p)===V)return;let i=this._$AH,n=e===p&&i!==p||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,r=e!==p&&(i===p||n);n&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},kt=class{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){Z(this,e)}};var je=St.litHtmlPolyfillSupport;je?.(it,nt),(St.litHtmlVersions??=[]).push("3.3.3");var me=(o,e,t)=>{let i=t?.renderBefore??e,n=i._$litPart$;if(n===void 0){let r=t?.renderBefore??null;i._$litPart$=n=new nt(e.insertBefore(tt(),r),r,void 0,t??{})}return n._$AI(o),n};var Et=globalThis,M=class extends z{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=me(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return V}};M._$litElement$=!0,M.finalized=!0,Et.litElementHydrateSupport?.({LitElement:M});var We=Et.litElementPolyfillSupport;We?.({LitElement:M});(Et.litElementVersions??=[]).push("4.2.2");var fe,ct=null;function pt(o){if(o?.states===fe&&ct)return ct;let e=new Map,t=new Set,i={};for(let[n,r]of Object.entries(o?.states??{})){let s=r?.attributes;if(!s?.growctrl_role||!s?.growctrl_tent)continue;let c=String(s.growctrl_tent),a=String(s.growctrl_station??"zelt");e.set(`${c}::${a}::${s.growctrl_role}`,n),a==="zelt"?t.add(c):(i[c]??=new Set).add(a)}return fe=o?.states,ct={tents:[...t].sort(),stations:Object.fromEntries(Object.entries(i).map(([n,r])=>[n,[...r].sort()])),byRole:e},ct}var j=(o,e,t,i)=>pt(o).byRole.get(`${e}::${t}::${i}`);var $=class extends M{constructor(){super(...arguments);this._config={};this._label=t=>t.label??t.name}static{this.properties={hass:{attribute:!1},_config:{state:!0}}}static{this.styles=Q`
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
      @value-changed=${i=>this._fire({...this._config,...i.detail.value})}></ha-form>`}list(t){let i=this._config[t.key]??[],n=r=>this._fire({...this._config,[t.key]:r});return l`
      ${t.title?l`<div class="lt">${t.title}</div>`:p}
      ${i.map((r,s)=>l`<div class="row">
        <ha-form .hass=${this.hass} .data=${r} .schema=${t.rowSchema}
          .computeLabel=${this._label}
          @value-changed=${c=>{let a=[...i];a[s]={...c.detail.value},n(a)}}></ha-form>
        <button class="del" title="Entfernen"
          @click=${()=>n(i.filter((c,a)=>a!==s))}>\u2715</button>
      </div>`)}
      <button class="add" @click=${()=>n([...i,t.newItem()])}>+ ${t.addLabel}</button>`}tentSelect(t="tent",i="Zelt"){let n=pt(this.hass).tents;return{name:t,label:i,selector:{select:{options:n,custom_value:!0,mode:"dropdown"}}}}stationSelect(t,i="station",n="Station"){let r=pt(this.hass),s=t?r.stations[t]??[]:[...new Set(Object.values(r.stations).flat())];return{name:i,label:n,selector:{select:{options:s,custom_value:!0,mode:"dropdown"}}}}styleSection(){let t=this._config.style??{},i=[h.text("background","Hintergrund (Farbe, 'a,b' = Gradient oder CSS)"),h.num("opacity","Deckkraft (0\u20131)",0,1,.05),h.bool("glass","Glas-Effekt (Blur)"),h.text("accent","Akzentfarbe"),h.num("radius","Eckenradius (px)",0,40)];return l`<div class="lt">Stil</div>
      <ha-form .hass=${this.hass} .data=${t} .schema=${i}
        .computeLabel=${n=>n.label??n.name}
        @value-changed=${n=>this._fire({...this._config,style:{...n.detail.value}})}></ha-form>`}},h={text:(o,e)=>({name:o,label:e,selector:{text:{}}}),bool:(o,e)=>({name:o,label:e,selector:{boolean:{}}}),num:(o,e,t,i,n)=>({name:o,label:e,selector:{number:{min:t,max:i,step:n,mode:"box"}}}),entity:(o,e,t)=>({name:o,label:e,selector:{entity:t?{domain:t}:{}}}),entities:(o,e,t)=>({name:o,label:e,selector:{entity:{multiple:!0,...t?{domain:t}:{}}}}),select:(o,e,t)=>({name:o,label:e,selector:{select:{mode:"dropdown",options:t}}})};var Ft=class extends ${render(){let e=[this.tentSelect(),h.text("name","Anzeigename (optional)"),h.bool("show_chart","VPD-Chart anzeigen"),h.num("hours","Chart-Zeitraum (h)",1,168)];return l`${this.form(e)}${this.styleSection()}`}};customElements.define("growctrl-tent-editor",Ft);function Tt(o){if(o==null||isNaN(o))return"\u2013";let e=Math.max(0,Math.round(o)),t=Math.floor(e/60),i=e%60;return t&&i?`${t} h ${i} min`:t?`${t} h`:`${i} min`}function be(o,e="auto"){let t=Math.floor(o/7)+1,i=o%7+1;return e==="tage"||e==="auto"&&o<7?`${o} Tage`:`Wo ${t} \xB7 Tag ${i}`}function S(o){if(o==null||o==="unknown"||o==="unavailable"||o==="")return null;let e=Number(o);return isNaN(e)?null:e}function xe(o){if(!o||o==="unknown"||o==="unavailable")return null;let e=new Date(o);return isNaN(e.getTime())?null:Math.max(0,Math.floor((Date.now()-e.getTime())/864e5))}var ve=o=>!o||["unknown","unavailable",""].includes(o),ye=o=>o.length>=16?o.substring(11,16):"",$e=o=>{if(ve(o))return{level:"none",label:"\u2014",ts:""};let e=o,t=ye(e);if(e.includes("SENSOR INVALID"))return{level:"critical",label:"\u{1F6A8} Sensor ung\xFCltig \u2014 Befeuchtung gesperrt",ts:t};if(e.includes("MAINTENANCE"))return{level:"info",label:"\u{1F527} Wartungsmodus aktiv",ts:t};if(e.includes("TESTMODE"))return{level:"info",label:"\u{1F9EA} Testmodus aktiv",ts:t};if(e.includes("AUTO OFF"))return{level:"info",label:"\u{1F534} Klima-Automatik deaktiviert",ts:t};let i=e.match(/(?:IST|SOLL)\s+(?:F|CIRC)=(\w+)/i)?.[1]?.toLowerCase(),n=e.match(/IST\s+(?:CIRC|F)=\w+\s+HUM=(\w+)/i)?.[1]?.toUpperCase(),r=e.match(/REQ=(\w+)/i)?.[1]?.toUpperCase();if(n!==void 0){let s=[];return i==="on"?s.push("Umluft AN"):i==="manual"?s.push("Umluft Manuell"):i==="off"&&s.push("Umluft AUS"),s.push(n==="ON"?"Befeuchtung AN":"Befeuchtung AUS"),s.push(r==="ON"?"Entfeuchtung AN":"Entfeuchtung AUS"),e.includes("ZENTRAL-BLOCK")&&s.push("(Zentral-Block)"),{level:"ok",label:s.join(" \xB7 "),ts:t}}return{level:"ok",label:e.replace(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}\s*/,"").substring(0,45),ts:t}},_e=o=>{if(ve(o))return{level:"none",label:"\u2014",ts:""};let e=o,t=ye(e);if(e.includes("FAILSAFE LIGHT"))return{level:"critical",label:"\u{1F6A8} Failsafe: Licht-Zwangsabschaltung \u2014 Auto deaktiviert",ts:t};if(e.includes("FAILSAFE PUMP"))return{level:"critical",label:"\u{1F6A8} Failsafe: Pumpen-Zwangsabschaltung \u2014 Auto deaktiviert",ts:t};if(e.includes("TIME INVALID"))return{level:"critical",label:"\u26A0\uFE0F Lichtzeiten nicht konfiguriert",ts:t};if(e.includes("MISMATCH")){let g=f=>e.match(f)?.[1];return{level:"warning",label:"\u26A0\uFE0F Ger\xE4t antwortet nicht: "+([["Licht",g(/IST.*?\bL=(\w+)/i),g(/SOLL.*?\bL=(\w+)/i)],["Pumpe",g(/IST.*?\bP=(\w+)/i),g(/SOLL.*?\bP=(\w+)/i)],["O\u2082",g(/IST.*?\bO2=(\w+)/i),g(/SOLL.*?\bO2=(\w+)/i)]].filter(([,f,v])=>f&&v&&f!==v).map(([f,v,_])=>`${f} (IST ${v.toUpperCase()} / SOLL ${_.toUpperCase()})`).join(", ")||"Abweichung"),ts:t}}if(e.includes("MAINTENANCE"))return{level:"info",label:"\u{1F527} Wartungsmodus aktiv",ts:t};if(e.includes("TESTMODE"))return{level:"info",label:"\u{1F9EA} Testmodus aktiv",ts:t};let i=e.match(/IST.*?\bL=(\w+)/i)?.[1],n=e.match(/IST.*?\bP=(\w+)/i)?.[1],r=e.match(/IST.*?\bO2=(\w+)/i)?.[1],s=e.includes("OVRUNTIL")?" (Override aktiv)":"",c=[i&&i!=="n/a"?i==="on"?"\u{1F4A1} Licht AN":"\u{1F311} Licht AUS":null,n&&n!=="n/a"?n==="on"?"\u{1F4A7} Pumpe AN":"\u23F8\uFE0F Pumpe AUS":null,r&&r!=="n/a"?r==="on"?"\u{1FAE7} O\u2082 AN":"\u{1FAE7} O\u2082 AUS":null].filter(Boolean).join(" \xB7 "),a="";return e.includes("AUTO ON")?a="\u{1F7E2} Auto gestartet":e.includes("AUTO OFF")?a="\u{1F534} Auto gestoppt":e.match(/STAGE\s*\u2192/)?a=`\u{1F331} Phase: ${e.match(/STAGE\s*\u2192\s*(\w+)/)?.[1]??""}`:e.includes("LIGHT \u2192 ON")?a="\u{1F4A1} Licht eingeschaltet":e.includes("LIGHT \u2192 OFF")?a="\u{1F311} Licht ausgeschaltet":e.includes("PUMP \u2192 ON")?a="\u{1F4A7} Pumpe eingeschaltet":e.includes("PUMP \u2192 OFF")?a="\u23F8\uFE0F Pumpe ausgeschaltet":e.includes("O2 \u2192 ON")?a="\u{1FAE7} O\u2082 eingeschaltet":e.includes("FAN \u2192 ON")?a="\u{1F300} L\xFCfter eingeschaltet":e.includes("MANUAL OVERRIDE")?a="\u270B Manuell \xFCbersteuert":e.includes("OVERRIDE END")&&(a="\u2705 Override beendet"),{level:"ok",label:[a,c].filter(Boolean).join(" \u2014 ")+s||e.substring(17,55),ts:t}};var we=new Map;async function E(o,e,t=24,i=48){let n=`${e}:${t}`,r=we.get(n);if(r&&Date.now()-r.t<5*6e4)return r.data;try{let s=new Date(Date.now()-t*36e5).toISOString(),a=((await o.callApi("GET",`history/period/${s}?filter_entity_id=${e}&minimal_response&no_attributes`))?.[0]??[]).map(m=>parseFloat(m.state??m.s)).filter(m=>!isNaN(m)),d=Math.max(1,Math.floor(a.length/i)),g=a.filter((m,x)=>x%d===0);return we.set(n,{t:Date.now(),data:g}),g}catch{return r?.data??[]}}var ke=(o,e=100,t=24)=>{if(o.length<2)return"";let i=Math.min(...o),n=Math.max(...o),r=n-i||1;return o.map((s,c)=>`${c===0?"M":"L"}${(c/(o.length-1)*e).toFixed(1)},${(t-(s-i)/r*t).toFixed(1)}`).join(" ")};var u={label:"rgba(242,247,243,0.56)",value:"rgba(242,247,243,0.97)",muted:"rgba(242,247,243,0.46)",logLabel:"rgba(242,247,243,0.72)",logText:"rgba(242,247,243,0.90)",ok:"#7BE8A8",warn:"#FFCE7A",crit:"#FF9D9D",info:"#9AC8FF",water:"#7CC8F0",light:"#FFDC8A",temp:"#FFB98A",heat:"#FFB35C",tileBg:"rgba(255,255,255,0.04)",rowBg:"rgba(255,255,255,0.035)"},N={critical:"rgba(255,157,157,.14)",warning:"rgba(255,206,122,.12)",info:"rgba(154,200,255,.10)",ok:u.rowBg,none:"rgba(255,255,255,.022)"},F={critical:u.crit,warning:u.warn,info:u.info,ok:u.logText,none:"rgba(242,247,243,.36)"},dt={Seedling:{bg:"rgba(154,200,255,0.16)",color:"#9AC8FF"},Veg:{bg:"rgba(123,232,168,0.16)",color:"#7BE8A8"},Bloom:{bg:"rgba(255,185,138,0.18)",color:"#FFB98A"},Flush:{bg:"rgba(195,171,245,0.18)",color:"#C3ABF5"},Trocknung:{bg:"rgba(211,168,120,0.18)",color:"#D3A878"}},w=o=>{let e=[];if(o?.background){let t=o.background.trim(),i=t.includes(",")&&!/^(linear|radial|conic|rgb|hsl)/i.test(t)?`linear-gradient(160deg, ${t})`:t;e.push(`--gc-bg:${i}`)}return o?.opacity!==void 0&&e.push(`--gc-opacity:${o.opacity}`),o?.accent&&e.push(`--gc-accent:${o.accent}`),o?.radius!==void 0&&e.push(`--gc-radius:${o.radius}px`),e.join(";")},q=o=>o.includes("critical")?"critical":o.includes("warning")?"warning":o.includes("info")?"info":"ok",k=Q`
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

  .clickable, button.gc { cursor: pointer; }
  button.gc { all: unset; cursor: pointer; touch-action: manipulation; }
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
`,T={ok:{bg:"rgba(123,232,168,.14)",color:u.ok,label:"Alles OK"},info:{bg:"rgba(154,200,255,.14)",color:u.info,label:"Info"},warning:{bg:"rgba(255,206,122,.14)",color:u.warn,label:"Warnung"},critical:{bg:"rgba(255,157,157,.16)",color:u.crit,label:"Kritisch"}};var B=30,ht=4,Se=6,Lt=14,Ce=0;function Ae(o){if(o.length<3)return`M${o.map(t=>t.join(",")).join(" L")}`;let e=`M${o[0][0]},${o[0][1]}`;for(let t=0;t<o.length-1;t++){let i=o[Math.max(0,t-1)],n=o[t],r=o[t+1],s=o[Math.min(o.length-1,t+2)],c=n[0]+(r[0]-i[0])/6,a=n[1]+(r[1]-i[1])/6,d=r[0]-(s[0]-n[0])/6,g=r[1]-(s[1]-n[1])/6;e+=` C${c.toFixed(1)},${a.toFixed(1)} ${d.toFixed(1)},${g.toFixed(1)} ${r[0]},${r[1]}`}return e}function D(o,e={}){let t=`gcg${Ce++}`,i=e.w??300,n=e.h??110,r=o.flatMap(f=>f.data);if(!r.length)return l`<div style="height:${n}px;display:flex;align-items:center;justify-content:center;
    font-size:11px;color:rgba(255,255,255,.5)">Keine Verlaufsdaten</div>`;let s=e.min??Math.min(...r,e.band?.min??1/0),c=e.max??Math.max(...r,e.band?.max??-1/0);c-s<.001&&(c+=1,s-=1);let a=(c-s)*.08;s-=a,c+=a;let d=(f,v)=>B+f/Math.max(1,v-1)*(i-B-ht),g=f=>Se+(1-(f-s)/(c-s))*(n-Se-Lt),m=e.grid??3,x=f=>Math.abs(f)>=100?f.toFixed(0):Math.abs(f)>=10?f.toFixed(1):f.toFixed(2);return l`<svg data-gce="4d724461726b766f6964" viewBox="0 0 ${i} ${n}" preserveAspectRatio="none" style="width:100%;height:${n}px;display:block">
    ${e.band&&(e.band.min!==void 0||e.band.max!==void 0)?st`
      <rect x="${B}" y="${g(e.band.max??c)}" width="${i-B-ht}"
        height="${Math.max(0,g(e.band.min??s)-g(e.band.max??c))}"
        fill="${e.band.color??"rgba(77,255,195,.08)"}" />`:p}
    ${Array.from({length:m+1},(f,v)=>{let _=s+(c-s)*v/m;return st`
        <line x1="${B}" y1="${g(_)}" x2="${i-ht}" y2="${g(_)}"
          stroke="rgba(255,255,255,.10)" stroke-width="1"/>
        <text x="${B-4}" y="${g(_)+3}" text-anchor="end"
          font-size="9.5" fill="rgba(255,255,255,.68)">${x(_)}</text>`})}
    ${o.map((f,v)=>{if(f.data.length<2)return p;let _=f.data.map((O,b)=>[Number(d(b,f.data.length).toFixed(1)),Number(g(O).toFixed(1))]),P=Ae(_),A=_[_.length-1][0],R=_[_.length-1][1];return st`
        <defs>
          <linearGradient id="${t}-${v}" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="${f.color}" stop-opacity=".18"/>
            <stop offset="100%" stop-color="${f.color}" stop-opacity="0"/>
          </linearGradient>
        </defs>
        ${f.fill!==!1?st`<path
          d="${P} L${A},${n-Lt} L${B},${n-Lt} Z"
          fill="url(#${t}-${v})"/>`:p}
        <path d="${P}" fill="none" stroke="${f.color}" stroke-width="2.4"
          stroke-linejoin="round" stroke-linecap="round"/>
        <circle cx="${A}" cy="${R}" r="6" fill="${f.color}" opacity=".18"/>
        <circle cx="${A}" cy="${R}" r="3" fill="${f.color}"/>
        <circle cx="${A}" cy="${R}" r="1.3" fill="rgba(10,14,18,.9)"/>`})}
    <text x="${B}" y="${n-3}" font-size="9" fill="rgba(255,255,255,.5)">-24h</text>
    <text x="${i-ht}" y="${n-3}" text-anchor="end" font-size="9" fill="rgba(255,255,255,.5)">jetzt</text>
  </svg>`}var Ee=o=>l`
  <div style="display:flex;gap:12px;flex-wrap:wrap;margin-top:4px">
    ${o.filter(e=>e.name).map(e=>l`<span style="display:inline-flex;align-items:center;gap:5px;
      font-size:10px;color:rgba(255,255,255,.6)">
      <span style="width:10px;height:3px;border-radius:2px;background:${e.color}"></span>${e.name}</span>`)}
  </div>`;function Fe(o,e,t=280,i=38){if(o.length<2)return l`<div style="height:${i}px"></div>`;let n=`gcs${Ce++}`,r=Math.min(...o),s=Math.max(...o);s-r<.001&&(s+=1,r-=1);let c=f=>f/(o.length-1)*t,a=f=>3+(1-(f-r)/(s-r))*(i-8),d=o.map((f,v)=>[Number(c(v).toFixed(1)),Number(a(f).toFixed(1))]),g=Ae(d),m=d[d.length-1][0],x=d[d.length-1][1];return l`<svg data-gce="4d724461726b766f6964" viewBox="0 0 ${t} ${i}" style="width:100%;height:${i}px;display:block">
    <defs><linearGradient id="${n}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${e}" stop-opacity=".22"/>
      <stop offset="100%" stop-color="${e}" stop-opacity="0"/>
    </linearGradient></defs>
    <path d="${g} L${m},${i} L0,${i} Z" fill="url(#${n})"/>
    <path d="${g}" fill="none" stroke="${e}" stroke-width="2"
      stroke-linejoin="round" stroke-linecap="round"/>
    <circle cx="${m}" cy="${x}" r="2.6" fill="${e}"/>
  </svg>`}function Te(o,e){let t=e.max-e.min||1,i=(r,s,c)=>{let a=Math.max(0,(Math.min(s,e.max)-Math.max(r,e.min))/t*100);return l`<div style="width:${a}%;background:${c};opacity:.78"></div>`},n=o!==null?Math.min(1,Math.max(0,(o-e.min)/t))*100:null;return l`<div>
    <div style="position:relative;height:11px;border-radius:6px;overflow:hidden;display:flex;
                box-shadow:inset 0 1px 3px rgba(0,0,0,.4)">
      ${i(e.min,e.okMin,"#FF6B6B")}
      ${i(e.okMin,e.idealMin,"#FFB35C")}
      ${i(e.idealMin,e.idealMax,"#34D17B")}
      ${i(e.idealMax,e.okMax,"#FFB35C")}
      ${i(e.okMax,e.max,"#FF6B6B")}
      ${n!==null?l`<div style="position:absolute;top:0;bottom:0;left:${n}%;
        width:3px;margin-left:-1.5px;background:#fff;border-radius:2px;
        box-shadow:0 0 6px rgba(255,255,255,.9)"></div>`:p}
    </div>
    <div style="display:flex;justify-content:space-between;font-size:9.5px;
                color:rgba(255,255,255,.55);margin-top:3px">
      <span>${e.min}</span><span style="color:#34D17B;font-weight:700">${e.idealMin}\u2013${e.idealMax} ideal</span><span>${e.max}</span>
    </div>
  </div>`}var Mt=o=>o.toLowerCase().replace(/ä/g,"a").replace(/ö/g,"o").replace(/ü/g,"u").replace(/ß/g,"ss").replace(/[^a-z0-9]+/g,"_").replace(/^_+|_+$/g,""),ut=(o,e,t,i,n)=>n?.[i]??`${o}.growctrl_${Mt(e)}_${Mt(t)}_${i}`,gt=(o,e,t,i)=>i?.[t]??`${o}.growctrl_zelt_${Mt(e)}_${t}`,Le={auto:["switch","automatik","auto"],wartung:["switch","wartung","maintenance"],stage:["select","wachstumsphase","stage"],lightOn:["time","licht_an","light_on"],lightOffSv:["time","licht_aus_seedling_veg","light_off_sv"],lightOffBloom:["time","licht_aus_bloom_flush","light_off_bloom"],lightRest:["sensor","licht_restzeit","light_rest"],pumpRest:["sensor","pumpe_restzeit","pump_rest"],age:["sensor","alter_seit_keimung","plant_age"],rec:["sensor","phasen_empfehlung","stage_recommendation"],event:["sensor","letztes_ereignis","last_event"],dli:["sensor","dli_heute","dli_today"],dliFc:["sensor","dli_prognose","dli_forecast"],germination:["date","keimstart","germination"],overrideMin:["number","manuelle_ubernahme","override_minutes"],pOverride:["binary_sensor","manueller_eingriff","problem_override"],pFailsafe:["binary_sensor","licht_failsafe","problem_light_failsafe"],pTime:["binary_sensor","lichtzeiten_unvollstandig","problem_time_invalid"],pPump:["binary_sensor","pumpe_gesperrt_fullstand","problem_pump_blocked"],pPower:["binary_sensor","licht_ohne_leistung","problem_power"]},mt={enabled:["switch","zelt_aktiv","tent_enabled"],climate:["switch","klima_automatik","climate_enabled"],mode:["select","klima_modus","climate_mode"],phase:["select","klima_phase","climate_phase"],vpd:["sensor","vpd","vpd"],status:["sensor","status","status"],event:["sensor","letztes_ereignis","last_event"]};var y=class extends M{constructor(){super(...arguments);this._cw=0;this._config={};this._confirm=null}static{this.properties={hass:{attribute:!1},_config:{state:!0},_confirm:{state:!0},_cw:{state:!0}}}connectedCallback(){super.connectedCallback(),this._ro=new ResizeObserver(t=>{let i=Math.round(t[0]?.contentRect?.width??0);i&&Math.abs(i-this._cw)>8&&(this._cw=i)}),this._ro.observe(this)}disconnectedCallback(){this._ro?.disconnect(),super.disconnectedCallback()}chartW(t=34){return Math.max(280,(this._cw||320)-t)}setConfig(t){this.validateConfig(t),this._config=t}validateConfig(t){}getCardSize(){return 4}st(t){return t?this.hass?.states[t]?.state:void 0}isOn(t){return this.st(t)==="on"}friendly(t){return t&&this.hass?.states[t]?.attributes?.friendly_name||t||""}unit(t){return t&&this.hass?.states[t]?.attributes?.unit_of_measurement||""}moreInfo(t){this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:t},bubbles:!0,composed:!0}))}navigate(t){history.pushState(null,"",t),window.dispatchEvent(new CustomEvent("location-changed"))}toggle(t){let i=t.split(".")[0],n=["switch","input_boolean","light","fan"].includes(i)?i:"homeassistant";this.hass.callService(n,"toggle",{entity_id:t})}confirmToggle(t,i){this._confirm={text:`${i} wirklich schalten?`,action:()=>this.toggle(t)}}renderConfirm(){return this._confirm?l`<div style="position:absolute;inset:0;background:rgba(0,0,0,.6);border-radius:16px;
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
    </div>`:p}};var Ze=["VPD","RH"],Ke=["Auto","Seedling","Veg","Bloom","Trocknung"],Pt=class extends y{constructor(){super(...arguments);this._hist=[]}static{this.styles=k}static{this.properties={...y.properties,_hist:{state:!0}}}validateConfig(t){if(!t.tent)throw new Error("growctrl-tent-card: 'tent' ist Pflicht (Zelt-Name aus der Integration).")}static getConfigElement(){return document.createElement("growctrl-tent-editor")}static getStubConfig(){return{tent:"gross"}}e(t){let[i,n,r]=mt[t],s=this._config;return s.overrides?.[n]??j(this.hass,s.tent,"zelt",r)??gt(i,s.tent,n,s.overrides)}_select(t,i){this.hass.callService("select","select_option",{entity_id:t,option:i})}connectedCallback(){super.connectedCallback(),this._load(),this._timer=window.setInterval(()=>this._load(),5*6e4)}disconnectedCallback(){super.disconnectedCallback(),this._timer&&clearInterval(this._timer)}async _load(){if(!this.hass){setTimeout(()=>this._load(),1e3);return}this._hist=await E(this.hass,this.e("vpd"),this._config.hours??24)}chips(t,i,n){return l`<div style="display:flex;gap:5px;flex-wrap:wrap">
      ${i.map(r=>l`<button class="gc" style="padding:4px 11px;border-radius:9px;font-size:10.5px;
          font-weight:700;transition:all .15s;
          background:${r===n?"rgba(77,255,195,.13)":"rgba(255,255,255,.04)"};
          border:1.5px solid ${r===n?u.ok:"rgba(255,255,255,.09)"};
          color:${r===n?u.ok:"rgba(255,255,255,.6)"}"
        @click=${()=>this._select(t,r)}>${r}</button>`)}
    </div>`}render(){let t=this._config;if(!this.hass)return p;let i=this.hass.states[this.e("vpd")],n=!i&&!this.hass.states[this.e("enabled")],r=S(i?.state)??(n?1.06:null),s=i?.attributes?.temp,c=i?.attributes?.rh,a=i?.attributes?.phase_effektiv??"Veg",d=i?.attributes?.sollwerte,g=this.isOn(this.e("enabled")),m=this.isOn(this.e("climate")),x=this.hass.states[this.e("status")],f=x?.attributes?.probleme??[],v=x?.state?.toLowerCase?.()==="problem"?"warning":g?"ok":"none",_=T[v]??T.none,P=this.hass.states[this.e("event")],A=r!==null&&d&&r>=d.vpd_min&&r<=d.vpd_max,R=(b,L,C,W)=>l`
      <button class="gc" style="flex:1;display:flex;align-items:center;justify-content:center;gap:7px;
          padding:9px 10px;border-radius:13px;transition:all .18s;
          background:${C?"rgba(77,255,195,.12)":"rgba(255,255,255,.05)"};
          border:1.5px solid ${C?u.ok:"rgba(255,255,255,.12)"};
          color:${C?u.ok:"rgba(255,255,255,.5)"}"
        @click=${()=>this.confirmToggle(b,L)}>
        <ha-icon .icon=${W} style="--mdc-icon-size:15px"></ha-icon>
        <span style="font-size:11px;font-weight:800">${L} ${C?"AN":"AUS"}</span>
      </button>`,O=(b,L,C,W)=>l`
      <div class="tile" style="text-align:center">
        <div class="lbl">${b}</div>
        <div class="val" style="font-size:22px;${W?`color:${W}`:""}">${L}<span class="unit">${C}</span></div>
      </div>`;return l`<div class="card ${t.style?.glass?"glass":""}" data-level=${v==="none"?"ok":v}
        style="${w(t.style)};position:relative">
      <div class="hdr">
        <div>
          <div class="title">${t.name??`Zelt ${t.tent}`}</div>
          <div class="subtitle">Klima \u00b7 Phase ${a}${d?` \xB7 Soll ${d.vpd_min}\u2013${d.vpd_max} kPa / ${d.rh_min}\u2013${d.rh_max} %`:""}</div>
        </div>
        <span class="status-pill" style="background:${_.bg};color:${_.color}">
          <span class="dot" style="background:${_.color}"></span>${g?_.label:"Deaktiviert"}</span>
      </div>

      <div style="display:flex;gap:8px;margin-top:12px">
        ${R(this.e("enabled"),"Zelt",g,"mdi:power")}
        ${R(this.e("climate"),"Klima",m,"mdi:thermostat")}
      </div>

      <div class="kpis cols-3" style="margin-top:10px">
        ${O("Temperatur",s!=null?Number(s).toFixed(1):"\u2013","\xB0C")}
        ${O("Luftfeuchte",c!=null?String(Math.round(Number(c))):"\u2013","%")}
        ${O("VPD",r!==null?r.toFixed(2):"\u2013","kPa",r===null?void 0:A?u.ok:"#FFD166")}
      </div>

      <div style="display:flex;gap:14px;flex-wrap:wrap;margin-top:11px;align-items:center">
        <span class="lbl" style="margin:0">Modus</span>
        ${this.chips(this.e("mode"),Ze,this.st(this.e("mode"))??"VPD")}
        <span class="lbl" style="margin:0">Phase</span>
        ${this.chips(this.e("phase"),Ke,this.st(this.e("phase"))??"Auto")}
      </div>

      ${t.show_chart!==!1&&this._hist.length>1?l`
        <div class="seclbl">VPD \u00b7 ${t.hours??24}h</div>
        ${D([{data:this._hist,color:A===!1?"#FFD166":u.ok}],{w:this.chartW(),h:100,band:d?{min:d.vpd_min,max:d.vpd_max}:void 0,grid:3})}`:p}

      ${f.length?l`<div style="margin-top:9px">
        ${f.map(b=>l`<div class="logrow" style="background:rgba(255,209,102,.08);margin-top:4px">
          <span class="txt" style="color:#FFD166">\u26A0 ${b}</span></div>`)}</div>`:p}

      ${P?l`<button class="gc logrow" style="width:100%;margin-top:9px;text-align:left"
          @click=${()=>this.moreInfo(this.e("event"))}>
          <span class="dot" style="background:${F[P.attributes?.schweregrad]??u.info};flex-shrink:0"></span>
          <span class="txt" style="color:rgba(255,255,255,.6)">${P.state}</span>
        </button>`:p}
      ${this.renderConfirm()}
    </div>`}};customElements.define("growctrl-tent-card",Pt);var Rt=class extends ${render(){let e=[this.tentSelect(),this.stationSelect(this._config?.tent),h.text("name","Anzeigename (optional)"),h.bool("show_settings","Einstellungen-Zahnrad anzeigen"),h.bool("show_event","Ereignisfeld am Kartenfuss (Standard an)"),h.entity("tank_entity","Stations-Tank F\xFCllstand % (optional)","sensor"),h.num("tank_min","Tank-Mindeststand %",0,100),h.num("tank_volume","Tank-Volumen in Litern (optional)",1,1e4)],t=[h.text("name","Name"),h.text("strain","Sorte (optional)"),h.entity("germination_helper","Keimstart-Entity (date, optional)","date"),h.entities("sensors","Sensoren dieser Pflanze (optional)","sensor"),h.text("image","Bild-URL (optional)"),h.entity("tank_entity","Tank-F\xFCllstand in % (optional)","sensor"),h.num("tank_min","Tank-Mindeststand % (Standard 30)",0,100)];return l`${this.form(e)}
      ${this.list({key:"plants",rowSchema:t,title:"Pflanzen (Tabs in der Karte)",addLabel:"Pflanze hinzuf\xFCgen",newItem:()=>({name:""})})}
      ${this.styleSection()}
      <div class="hint">Entity-IDs werden automatisch abgeleitet
        (z.B. <code>switch.growctrl_gross_main1_automatik</code>). Abweichende IDs
        per YAML: <code>overrides: { automatik: switch.mein_schalter }</code></div>`}};customElements.define("growctrl-station-editor",Rt);var qe=["Seedling","Veg","Bloom","Flush","Trocknung"],Me={Seedling:"Anzucht",Veg:"Wachstum",Bloom:"Bl\xFCte",Flush:"Sp\xFClen",Trocknung:"Ernte"},Xe={light:"mdi:lightbulb",heat:"mdi:radiator",water:"mdi:air-humidifier",pump:"mdi:water-pump",fan:"mdi:fan",o2:"mdi:scuba-tank"},zt=class extends y{constructor(){super(...arguments);this._open=!1;this._tab=0;this._phase=!1;this._spark={}}static{this.styles=k}static{this.properties={...y.properties,_open:{state:!0},_tab:{state:!0},_spark:{state:!0},_phase:{state:!0}}}updated(t){if(super.updated?.(t),!t.has("hass")&&!t.has("_config"))return;(this._config?.plants??[]).flatMap(r=>(r.sensors??[]).map(s=>typeof s=="string"?{entity:s}:s).filter(s=>s.anzeige==="graph")).forEach(async r=>{let s=await E(this.hass,r.entity,r.hours??24);s.length&&this._spark[r.entity]?.length!==s.length&&(this._spark={...this._spark,[r.entity]:s})})}validateConfig(t){if(!t.tent||!t.station)throw new Error("growctrl-station-card: 'tent' und 'station' sind Pflicht (wie in der Integration angelegt).")}static getConfigElement(){return document.createElement("growctrl-station-editor")}static getStubConfig(){return{tent:"gross",station:"main1"}}get isPreview(){return!this.hass?.states?.[this.e("stage")]}e(t){let[i,n,r]=Le[t],s=this._config;return s.overrides?.[n]??j(this.hass,s.tent,s.station,r)??ut(i,s.tent,s.station,n,s.overrides)}_select(t,i){this.hass.callService("select","select_option",{entity_id:t,option:i})}render(){let t=this._config;if(!this.hass)return p;let i=this.isPreview,n=this.st(this.e("stage"))??"Veg",r=dt[n]??dt.Veg,s=this.isOn(this.e("auto"))||i,c=this.isOn(this.e("wartung")),a=[{e:this.e("pOverride"),label:"Manueller Eingriff",crit:!1},{e:this.e("pFailsafe"),label:"Licht-Failsafe",crit:!0},{e:this.e("pTime"),label:"Zeiten unvollst\xE4ndig",crit:!1},{e:this.e("pPump"),label:"Pumpe gesperrt (F\xFCllstand)",crit:!1},{e:this.e("pPower"),label:"Licht ohne Leistung",crit:!0}].filter(x=>this.isOn(x.e)),d=this.hass.states[this.e("event")],g=a.length?a.some(x=>x.crit)?"critical":"warning":d?.attributes?.schweregrad==="critical"?"warning":"ok",m=T[g]??T.ok;return l`<div class="card ${t.style?.glass?"glass":""}" data-level=${g}
        style="${w(t.style)};position:relative">

      <div class="hdr">
        <div style="min-width:0">
          <div class="title">${t.name??`${t.tent} \xB7 ${t.station}`}</div>
          <div class="subtitle" style="display:flex;align-items:center;gap:6px">
            <span class="dot" style="width:7px;height:7px;border-radius:50%;background:${m.color};box-shadow:0 0 8px ${m.color}"></span>${m.label}
            ${c?l`<span style="color:${u.warn};font-weight:800">\u00b7 Wartung</span>`:p}
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:6px">
          <button class="gc" title="Wartung (System greift nicht ein)"
            style="width:40px;height:40px;border-radius:12px;display:flex;align-items:center;justify-content:center;
              background:${c?"rgba(255,206,122,.14)":"var(--card-2,#222F28)"};
              border:1px solid ${c?"rgba(255,206,122,.5)":"var(--gc-line)"};
              color:${c?u.warn:"rgba(242,247,243,.55)"}"
            @click=${()=>this.toggle(this.e("wartung"))}>
            <ha-icon icon="mdi:wrench-outline" style="--mdc-icon-size:16px"></ha-icon></button>
          ${t.show_settings!==!1?l`<button class="gc" title="Einstellungen"
            style="width:40px;height:40px;border-radius:12px;display:flex;align-items:center;justify-content:center;
              background:var(--card-2,#222F28);border:1px solid var(--gc-line);color:rgba(242,247,243,.55)"
            @click=${()=>{this._open=!this._open}}>
            <ha-icon icon="mdi:tune-variant" style="--mdc-icon-size:16px"></ha-icon></button>`:p}
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

      ${this.phaseDropdown(n,r)}
      ${this.lightRow()}
      ${this.pumpRow(i)}
      ${this.dliRow(i)}
      ${this.actuators()}
      ${this.tankRow()}
      ${this.plantTabs()}

      ${a.length?l`<div style="display:flex;gap:7px;flex-wrap:wrap;margin-top:12px">
        ${a.map(x=>l`<span class="pbadge ${x.crit?"crit":"warn"}">
          <ha-icon icon="mdi:alert" style="--mdc-icon-size:12px"></ha-icon>${x.label}</span>`)}</div>`:p}

      ${t.show_event!==!1&&d?l`
        <button class="gc event" @click=${()=>this.moreInfo(this.e("event"))}>
          <span class="edot" style="background:${F[d.attributes?.schweregrad]??"rgba(242,247,243,.4)"}"></span>
          <span class="ebody">
            <span class="elbl">Letztes Ereignis</span>
            <span class="etx">${d.state}</span>
          </span>
          <span style="font:700 10.5px var(--f-num);color:rgba(242,247,243,.4)">
            ${d.last_changed?new Date(d.last_changed).toLocaleTimeString("de-DE",{hour:"2-digit",minute:"2-digit"}):""}</span>
        </button>`:p}

      ${this._open?l`<div class="settings-grid" style="margin-top:10px">
        ${this.setting(this.e("lightOn"),"Licht AN")}
        ${this.setting(this.e("lightOffSv"),"AUS Seed/Veg")}
        ${this.setting(this.e("lightOffBloom"),"AUS Bloom")}
        ${this.setting(this.e("germination"),"Keimstart")}
        ${this.setting(this.e("overrideMin"),"Man. \xDCbernahme")}
      </div>`:p}
      ${this.renderConfirm()}
    </div>`}setting(t,i){return l`<button class="gc tile" style="text-align:left;min-width:0" @click=${()=>this.moreInfo(t)}>
      <div class="lbl">${i}</div>
      <div style="font-size:14px;font-weight:800;color:rgba(242,247,243,.85);margin-top:3px">
        ${this.st(t)??"\u2013"}</div></button>`}phaseDropdown(t,i){let n=this.hass.states[this.e("rec")],r=n?.state&&n.state!==t?n.state:null;return l`<div class="dd">
      <button class="gc dd-btn" aria-haspopup="listbox" aria-expanded=${this._phase}
        @click=${()=>{this._phase=!this._phase}}>
        <span class="pdot" style="background:${i.color};color:${i.color}"></span>
        ${t}
        <span class="hint">${Me[t]??""}${r?" \xB7 Richtwert "+r:""}</span>
        <ha-icon icon="mdi:chevron-down" style="--mdc-icon-size:16px;color:rgba(242,247,243,.5);
          transition:transform .2s;${this._phase?"transform:rotate(180deg)":""}"></ha-icon>
      </button>
      ${this._phase?l`<div class="dd-menu" role="listbox">
        ${qe.map(s=>{let c=dt[s];return l`<button class="gc dd-it" role="option" aria-selected=${s===t}
            @click=${()=>{this._select(this.e("stage"),s),this._phase=!1}}>
            <span class="pdot" style="background:${c.color}"></span>${s}
            <span class="hint">${Me[s]??""}</span></button>`})}
      </div>`:p}
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
          ${t.minPct!==void 0?l`<span class="min" style="left:${t.minPct}%"></span>`:p}</span>`:p}
      ${t.footL||t.footR?l`<span class="sft"><span>${t.footL??""}</span><span>${t.footR??""}</span></span>`:p}
    </button>`}lightRow(){if(this.isPreview)return this.supplyRow({icon:"mdi:lightbulb-on",iconColor:u.light,glow:!0,title:"Licht an",value:"5 h 40 min",valueColor:u.light,fillPct:62,fillColor:u.light,footL:"Leuchtphase",footR:"62 % verbleibend"});let t=this.hass.states[this.e("lightRest")];if(!t)return p;let i=t.attributes??{},n=i.zustand?i.zustand==="an":void 0,r=Number(t.state),s=i.text??(isNaN(r)?"\u2013":Tt(r)),c=typeof i.anteil=="number"?Math.min(1,Math.max(0,i.anteil)):null,a=n===!1?"#7E9488":u.light;return this.supplyRow({icon:n===!1?"mdi:lightbulb-outline":"mdi:lightbulb-on",iconColor:a,glow:n!==!1,title:n===!1?"Licht aus":"Licht an",value:s,valueColor:a,fillPct:c!==null?c*100:null,fillColor:a,footL:n===!1?"Dunkelphase":"Leuchtphase",footR:c!==null?`${(c*100).toFixed(0)} % verbleibend`:"",onClick:()=>this.moreInfo(this.e("lightRest"))})}pumpRow(t){let i=this.hass.states[this.e("pumpRest")];if(!i&&!t)return p;if(t)return this.supplyRow({icon:"mdi:water-pump",iconColor:u.water,title:"Pumpe aus",value:"in 12 min",valueColor:u.water,fillPct:80,fillColor:u.water,footL:"N\xE4chster Zyklus",footR:"80 % der Pause"});let n=Number(i.state),r=i.attributes??{},s=typeof r.anteil=="number"?Math.min(1,Math.max(0,r.anteil)):null,c=r.zustand?r.zustand==="an":void 0;return this.supplyRow({icon:"mdi:water-pump",iconColor:u.water,title:c?"Pumpe l\xE4uft":"Pumpe aus",value:isNaN(n)?"\u2013":Tt(n),valueColor:u.water,fillPct:s!==null?s*100:null,fillColor:u.water,footL:r.text??"Zyklus",footR:s!==null?`${(s*100).toFixed(0)} %`:"",onClick:()=>this.moreInfo(this.e("pumpRest"))})}dliRow(t){let i=this.hass.states[this.e("dli")];if(!i&&!t)return p;let n=S(this.st(this.e("dli")))??(t?18.4:null),r=S(this.st(this.e("dliFc")))??(t?24.7:null),s=i?.attributes?.ziel_aktuelle_phase??(t?25:void 0),c=s&&n!==null?n/s*100:null,a=s&&r!==null?Math.min(100,r/s*100):void 0;return this.supplyRow({icon:"mdi:white-balance-sunny",iconColor:u.light,title:"DLI heute",value:n!==null?`${n.toFixed(1)}${s?` / ${s}`:""}`:"\u2013",valueColor:u.light,fillPct:c,fillColor:u.light,minPct:a,footL:r!==null?`Prognose ${r.toFixed(1)} mol/m\xB2`:"",footR:s?"Marker = Prognose":"",onClick:()=>this.moreInfo(this.e("dli"))})}actuators(){let t=this._config.actuators??[];return t.length?l`
      <div class="seclbl">Aktoren</div>
      <div class="acts">
        ${t.map(i=>{let n=this.isOn(i.entity),r=i.kind??"",s=i.icon??Xe[r]??"mdi:power",c=i.name??this.friendly(i.entity);return l`<button class="gc act ${n?"on":""} ${n&&r?r:""}"
            @click=${()=>i.confirm?this.confirmToggle(i.entity,c):this.toggle(i.entity)}>
            <span class="aic"><ha-icon icon="${s}" style="--mdc-icon-size:18px"></ha-icon></span>
            <span class="anm">${c}</span>
            <span class="ast">${n?"AN":"AUS"}</span></button>`})}
      </div>`:p}tankRow(){let t=this._config;if(!t.tank_entity)return p;let i=Math.min(100,Math.max(0,S(this.st(t.tank_entity))??0)),n=t.tank_min??30,r=i<n,s=r?u.crit:u.water,c=t.tank_volume;return this.supplyRow({icon:"mdi:car-coolant-level",iconColor:u.water,title:"Tank",value:`${i.toFixed(0)} %`,valueColor:s,fillPct:i,fillColor:s,minPct:n,footL:c?`\u2248 ${(i/100*c).toFixed(0)} l von ${c} l`:r?"Unter Mindeststand":"",footR:`Min ${n} %`,onClick:()=>this.moreInfo(t.tank_entity)})}plantTabs(){let t=this._config.plants??[];if(!t.length)return p;let i=Math.min(this._tab,t.length-1),n=t[i],r=n.germination_helper?this.st(n.germination_helper):null,s=r?xe(r):null;return l`
      <div class="ptabs">
        ${t.map((c,a)=>l`<button class="gc ptab" role="tab" aria-selected=${a===i}
          @click=${()=>{this._tab=a}}>
          <ha-icon icon="mdi:sprout" style="--mdc-icon-size:15px"></ha-icon>${c.name}</button>`)}
      </div>
      <div class="plant">
        <div class="phd">
          ${n.image?l`<img class="pimg" src="${n.image}"/>`:l`<div class="pimg"><ha-icon icon="mdi:sprout" style="--mdc-icon-size:30px"></ha-icon></div>`}
          <div style="flex:1;min-width:0">
            <div class="pname">${n.name}</div>
            ${n.strain?l`<div class="pstrain">${n.strain}</div>`:p}
            ${s!==null?l`<span class="agechip">${be(s)}</span>`:p}
          </div>
        </div>
        ${this.plantSensors(n.sensors??[])}
        ${n.tank_entity?this.plantTankInd(n.tank_entity,n.tank_min??30):p}
      </div>`}plantSensors(t){if(!t.length)return p;let i=t.map(n=>typeof n=="string"?{entity:n}:n);return l`${i.map(n=>{let r=S(this.st(n.entity)),s=n.name??this.friendly(n.entity),c=this.unit(n.entity),a=n.anzeige??"wert";if(a==="zone"){let g=n.ideal??[0,0],m=n.ok??g,x=r!==null&&r>=g[0]&&r<=g[1],f=r!==null&&r>=m[0]&&r<=m[1],v=n.color??(x?u.ok:f?u.warn:u.crit);return l`<button class="gc ind" @click=${()=>this.moreInfo(n.entity)}>
          <div class="ihd"><span class="ilbl" style="color:${v}">
            ${n.icon?l`<ha-icon icon="${n.icon}" style="--mdc-icon-size:14px"></ha-icon>`:p}${s}</span>
            <span class="ival" style="color:${v}">${r!==null?r:"\u2013"}<span class="u">${c}</span></span></div>
          <div style="margin-top:8px">${Te(r,{min:n.min??0,max:n.max??14,okMin:m[0],okMax:m[1],idealMin:g[0],idealMax:g[1]})}</div>
        </button>`}if(a==="graph"){let g=n.color??u.water;return l`<button class="gc ind" @click=${()=>this.moreInfo(n.entity)}>
          <div class="ihd"><span class="ilbl" style="color:${g}">
            ${n.icon?l`<ha-icon icon="${n.icon}" style="--mdc-icon-size:14px"></ha-icon>`:p}${s}</span>
            <span class="ival" style="color:${g}">${r!==null?r:"\u2013"}<span class="u">${c}</span></span></div>
          <div style="margin-top:6px">${Fe(this._spark[n.entity]??[],g,this.chartW(74),38)}</div>
        </button>`}let d=r!==null?r:this.st(n.entity)??"\u2013";return l`<button class="gc ind" @click=${()=>this.moreInfo(n.entity)}>
        <div class="ihd"><span class="ilbl" style="color:rgba(242,247,243,.6)">
          ${n.icon?l`<ha-icon icon="${n.icon}" style="--mdc-icon-size:14px"></ha-icon>`:p}${s}</span>
          <span class="ival" style="color:${n.color??"rgba(242,247,243,.95)"}">${d}<span class="u">${c}</span></span></div>
      </button>`})}`}plantTankInd(t,i){let n=Math.min(100,Math.max(0,S(this.st(t))??0)),s=n<i?u.crit:u.water;return l`<button class="gc ind" @click=${()=>this.moreInfo(t)}>
      <div class="ihd"><span class="ilbl" style="color:${u.water}">
        <ha-icon icon="mdi:car-coolant-level" style="--mdc-icon-size:14px"></ha-icon>Tank</span>
        <span class="ival" style="color:${s}">${n.toFixed(0)}<span class="u"> %</span></span></div>
      <div class="sbar" style="margin-top:8px;height:10px;border-radius:6px;background:#0D1410;overflow:hidden;position:relative">
        <i style="display:block;height:100%;width:${n}%;border-radius:6px;
          background:linear-gradient(90deg, ${s}, ${s}cc);box-shadow:0 0 8px ${s}55"></i>
        <span style="position:absolute;top:-1px;bottom:-1px;left:${i}%;width:2.5px;background:rgba(255,255,255,.45)"></span></div>
    </button>`}};customElements.define("growctrl-station-card",zt);var Qe=[h.text("title","Titel"),h.num("columns","Spalten",1,6)],Ye=[h.entity("entity","Aktor",["switch","input_boolean","light","fan"]),h.text("name","Name (optional)"),h.text("group","Gruppe (optional, z.B. Zelt / Pflanzen)"),h.bool("confirm","Mit Best\xE4tigung schalten")],Ot=class extends ${render(){return l`${this.form(Qe)}
      ${this.list({key:"controls",rowSchema:Ye,title:"Aktoren",addLabel:"Aktor hinzuf\xFCgen",newItem:()=>({entity:""})})}
      ${this.styleSection()}`}};customElements.define("growctrl-controls-editor",Ot);var Je={switch:"mdi:power",light:"mdi:lightbulb",fan:"mdi:fan",input_boolean:"mdi:toggle-switch"},It=class extends y{static{this.styles=k}validateConfig(e){if(!Array.isArray(e.controls)||!e.controls.length)throw new Error("growctrl-controls-card: 'controls' (min. 1 Eintrag) ist Pflicht.")}static getConfigElement(){return document.createElement("growctrl-controls-editor")}static getStubConfig(){return{controls:[{entity:"switch.beispiel"}]}}render(){let e=this._config;if(!this.hass)return p;let t=e.style?.accent??"#4DFFC3",i=new Map;e.controls.forEach(r=>{let s=r.group??"";i.has(s)||i.set(s,[]),i.get(s).push(r)});let n=e.columns?`repeat(${e.columns},1fr)`:"repeat(auto-fill,minmax(92px,1fr))";return l`<div class="card ${e.style?.glass?"glass":""}" style="${w(e.style)};position:relative">
      ${e.title?l`<div class="title" style="font-size:15px">${e.title}</div>`:p}
      ${[...i.entries()].map(([r,s])=>l`
        ${r?l`<div class="seclbl">${r}</div>`:p}
        <div class="grid" style="grid-template-columns:${n};gap:8px;margin-top:${r?0:10}px">
          ${s.map(c=>{let a=this.isOn(c.entity),d=c.name??this.friendly(c.entity),g=this.hass.states[c.entity],m=c.icon??g?.attributes?.icon??Je[c.entity.split(".")[0]]??"mdi:power";return l`<button class="gc" style="display:flex;flex-direction:column;align-items:center;gap:5px;
                padding:11px 6px 9px;border-radius:14px;transition:all .18s;min-width:0;
                background:${a?`color-mix(in srgb, ${t} 12%, transparent)`:"rgba(255,255,255,.04)"};
                border:1.5px solid ${a?t:"rgba(255,255,255,.08)"};
                box-shadow:${a?`0 4px 18px -8px ${t}`:"none"}"
              @click=${()=>c.confirm?this.confirmToggle(c.entity,d):this.toggle(c.entity)}>
              <span style="width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;
                  transition:all .18s;
                  background:${a?t:"rgba(255,255,255,.07)"};
                  color:${a?"#0C1117":"rgba(255,255,255,.55)"}">
                <ha-icon .icon=${m} style="--mdc-icon-size:18px"></ha-icon>
              </span>
              <span style="font-size:11px;font-weight:700;max-width:100%;overflow:hidden;white-space:nowrap;
                  text-overflow:ellipsis;color:${a?"rgba(255,255,255,.95)":"rgba(255,255,255,.65)"}">
                ${d}${c.confirm?" \u{1F512}":""}</span>
              <span style="font-size:9px;font-weight:800;letter-spacing:.8px;
                  color:${a?t:"rgba(255,255,255,.35)"}">${a?"AN":"AUS"}</span>
            </button>`})}
        </div>`)}
      ${this.renderConfirm()}
    </div>`}};customElements.define("growctrl-controls-card",It);var ti=[h.text("title","Titel"),h.num("columns","Spalten",1,6),h.num("sparkline_hours","Sparkline-Zeitraum (h)",1,168)],ei=[h.entity("entity","Sensor","sensor"),h.text("name","Name (optional)"),h.num("min","Sollbereich Min (optional)"),h.num("max","Sollbereich Max (optional)")],Nt=class extends ${render(){return l`${this.form(ti)}
      ${this.list({key:"sensors",rowSchema:ei,title:"Sensoren",addLabel:"Sensor hinzuf\xFCgen",newItem:()=>({entity:""})})}
      ${this.styleSection()}`}};customElements.define("growctrl-sensors-editor",Nt);var Bt=class extends y{constructor(){super(...arguments);this._hist={}}static{this.styles=k}static{this.properties={...y.properties,_hist:{state:!0}}}validateConfig(t){if(!Array.isArray(t.sensors)||!t.sensors.length)throw new Error("growctrl-sensors-card: 'sensors' (min. 1 Eintrag) ist Pflicht.")}static getConfigElement(){return document.createElement("growctrl-sensors-editor")}static getStubConfig(){return{sensors:[{entity:"sensor.beispiel"}]}}connectedCallback(){super.connectedCallback(),this._load(),this._timer=window.setInterval(()=>this._load(),5*6e4)}disconnectedCallback(){super.disconnectedCallback(),this._timer&&clearInterval(this._timer)}async _load(){if(!this.hass){setTimeout(()=>this._load(),1e3);return}let t=this._config,i={};for(let n of t.sensors)i[n.entity]=await E(this.hass,n.entity,t.sparkline_hours??24);this._hist=i}bad(t,i){return t!==null&&(i.min!==void 0&&t<i.min||i.max!==void 0&&t>i.max)}render(){let t=this._config;if(!this.hass)return p;let i=t.columns??2,n=t.sensors.some(r=>this.bad(S(this.st(r.entity)),r));return l`<div class="card ${t.style?.glass?"glass":""}" data-level=${n?"warning":"ok"}
        style=${w(t.style)}>
      ${t.title?l`<div class="title" style="font-size:15px;margin-bottom:2px">${t.title}</div>`:p}
      <div class="grid" style="grid-template-columns:repeat(${i},1fr)">
        ${t.sensors.map(r=>{let s=S(this.st(r.entity)),c=this.bad(s,r),a=ke(this._hist[r.entity]??[],100,26),d=r.name??this.friendly(r.entity);return l`<button class="gc tile" style="text-align:left;position:relative;overflow:hidden;
              ${c?"border-color:rgba(255,107,107,.45);background:rgba(255,107,107,.08)":""}"
            @click=${()=>this.moreInfo(r.entity)}>
            ${a?l`<svg viewBox="0 0 100 26" preserveAspectRatio="none"
              style="position:absolute;left:0;right:0;bottom:0;width:100%;height:30px;opacity:.5">
              <path d="${a} L100,26 L0,26 Z" fill="${c?"rgba(255,107,107,.25)":"rgba(77,255,195,.18)"}"/>
              <path d="${a}" fill="none" stroke="${c?u.crit:"rgba(77,255,195,.8)"}" stroke-width="1.4"/>
            </svg>`:p}
            <div class="lbl" style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${d}</div>
            <div class="val" style="font-size:22px;${c?`color:${u.crit}`:""}">${s!==null?s:"--"}<span class="unit">${this.unit(r.entity)}</span></div>
            <div style="height:14px"></div>
          </button>`})}
      </div>
    </div>`}};customElements.define("growctrl-sensors-card",Bt);var ii=[h.text("title","Titel"),h.num("limit","Max. Zeilen",3,50),h.select("min_level","Anzeige",[{value:"alle",label:"Alle Ereignisse"},{value:"warnung",label:"Nur Warnungen/Fehler"}])],ni=[h.entity("entity","Letztes-Ereignis-Sensor","sensor"),h.text("name","Label (optional)")],Dt=class extends ${render(){return l`${this.form(ii)}
      ${this.list({key:"sources",rowSchema:ni,title:"Quellen",addLabel:"Quelle hinzuf\xFCgen",newItem:()=>({entity:""})})}
      ${this.styleSection()}`}};customElements.define("growctrl-status-editor",Dt);var Ut=class extends y{static{this.styles=k}validateConfig(e){if(!Array.isArray(e.sources)||!e.sources.length)throw new Error("growctrl-status-card: 'sources' (Letztes-Ereignis-Sensoren) ist Pflicht.")}static getConfigElement(){return document.createElement("growctrl-status-editor")}static getStubConfig(){return{sources:[{entity:"sensor.growctrl_gross_main1_letztes_ereignis"}]}}render(){let e=this._config;if(!this.hass)return p;let t=[],i=[];for(let a of e.sources){let d=this.hass.states[a.entity],g=d?.attributes?.verlauf??[];i.push(d?.attributes?.schweregrad??"ok"),g.forEach(m=>t.push({...m,src:a.name??this.friendly(a.entity)}))}t.reverse();let r=(e.min_level==="warnung"?t.filter(a=>a.level==="warning"||a.level==="critical"):t).slice(0,e.limit??12),s=q(i.map(a=>a==="ok"?"ok":a)),c=T[s];return l`<div class="card ${e.style?.glass?"glass":""}" data-level=${s} style=${w(e.style)}>
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
              flex-shrink:0;color:rgba(255,255,255,.55)">${a.src}</span>`:p}
            <span class="txt" style="color:${a.level==="info"?"rgba(255,255,255,.6)":F[a.level]??"rgba(255,255,255,.6)"}">${a.text}</span>
          </div>`):l`<div class="logrow"><span class="txt" style="color:${u.ok}">
            \u2713 Noch keine Ereignisse</span></div>`}
      </div>
    </div>`}};customElements.define("growctrl-status-card",Ut);var si=[h.text("title","Titel (optional)"),h.text("logo","Logo-URL (z.B. /local/growctrl/logo.png)"),h.bool("show_chart","24h-Chart zus\xE4tzlich zum Zonen-Balken anzeigen"),h.num("hours","Chart-Zeitraum (h)",1,168)],Ht=class extends ${render(){let e=[this.stationSelect(this._config?.tent),h.text("name","Label (optional)")];return l`${this.form([this.tentSelect(),...si])}
      ${this.list({key:"stations",rowSchema:e,title:"Stationen (Informationssystem)",addLabel:"Station hinzuf\xFCgen",newItem:()=>({station:""})})}
      ${this.styleSection()}`}};customElements.define("growctrl-hero-editor",Ht);var Gt=class extends y{constructor(){super(...arguments);this._logoErr=!1;this._hist=[]}static{this.styles=k}static{this.properties={...y.properties,_hist:{state:!0},_logoErr:{state:!0}}}validateConfig(t){if(!t.tent)throw new Error("growctrl-hero-card: 'tent' ist Pflicht (Zelt-Name aus der Integration).")}static getConfigElement(){return document.createElement("growctrl-hero-editor")}static getStubConfig(){return{tent:"gross",stations:[{station:"main1"}]}}te(t){let[i,n,r]=mt[t],s=this._config;return s.overrides?.[n]??j(this.hass,s.tent,"zelt",r)??gt(i,s.tent,n,s.overrides)}connectedCallback(){super.connectedCallback(),this._load(),this._timer=window.setInterval(()=>this._load(),5*6e4)}disconnectedCallback(){super.disconnectedCallback(),this._timer&&clearInterval(this._timer)}async _load(){if(!this.hass){setTimeout(()=>this._load(),1e3);return}this._hist=await E(this.hass,this.te("vpd"),this._config.hours??24)}render(){let t=this._config;if(!this.hass)return p;let i=this.hass.states[this.te("vpd")],n=!i&&!this.hass.states[this.te("enabled")],r=S(i?.state)??(n?1.06:null),s=i?.attributes?.temp??(n?22.4:null),c=i?.attributes?.rh??(n?52:null),a=i?.attributes?.phase_effektiv??"",d=i?.attributes?.sollwerte,g=this.isOn(this.te("enabled"))||n,m=this.isOn(this.te("climate")),x=this.hass.states[this.te("status")],f=x?.attributes?.probleme??[],v=(t.stations??[]).map(b=>{let L=this.hass.states[j(this.hass,t.tent,b.station,"last_event")??ut("sensor",t.tent,b.station,"letztes_ereignis",t.overrides)],C=L?.attributes?.schweregrad??"ok";return{name:b.name??b.station,text:L?.state??"\u2013",level:C}}),_=b=>b==="warning"||b==="critical",P=q([(x?.state??"").toLowerCase()==="problem"?"warning":"ok",...v.map(b=>_(b.level)?b.level:"ok")]),A=T[P],R=[...f.map(b=>({label:b,level:"warning"})),...v.filter(b=>_(b.level)).map(b=>({label:`${b.name}: ${b.text}`,level:b.level}))],O=(b,L,C,W)=>l`
      <button class="gc" style="display:flex;align-items:center;gap:8px;padding:8px 15px;border-radius:14px;
          transition:all .18s;
          background:${C?"rgba(77,255,195,.12)":"rgba(255,255,255,.05)"};
          border:1.5px solid ${C?u.ok:"rgba(255,255,255,.12)"};
          color:${C?u.ok:"rgba(255,255,255,.5)"}"
        @click=${()=>this.confirmToggle(b,L)}>
        <ha-icon .icon=${W} style="--mdc-icon-size:16px"></ha-icon>
        <span style="font-size:11px;font-weight:800">${L} ${C?"AN":"AUS"}</span>
      </button>`;return l`<div class="card ${t.style?.glass?"glass":""}" data-level=${P}
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
            ${a?l`<div class="subtitle">Klima-Phase ${a}</div>`:p}
          </div>
        </div>
        <span class="status-pill" style="background:${A.bg};color:${A.color}">
          <span class="dot" style="background:${A.color}"></span>${A.label}</span>
      </div>

      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:13px">
        ${O(this.te("enabled"),"Zelt",g,"mdi:power")}
        ${O(this.te("climate"),"Klima",m,"mdi:thermostat")}
      </div>

      <div class="kpis cols-3" style="margin-top:12px">
        <div class="tile" style="text-align:center"><div class="lbl">Temperatur</div>
          <div class="val" style="font-size:22px">${s!=null?Number(s).toFixed(1):"\u2013"}<span class="unit">\u00b0C</span></div></div>
        <div class="tile" style="text-align:center"><div class="lbl">Luftfeuchte</div>
          <div class="val" style="font-size:22px">${c!=null?Math.round(Number(c)):"\u2013"}<span class="unit">%</span></div></div>
        <div class="tile" style="text-align:center"><div class="lbl">VPD</div>
          <div class="val" style="font-size:22px;color:${r!==null&&d&&r>=d.vpd_min&&r<=d.vpd_max?u.ok:"#FFD166"}">${r!==null?r.toFixed(2):"\u2013"}<span class="unit">kPa</span></div></div>
      </div>

      ${this.vpdZoneBar(r,d??null)}

      ${t.show_chart===!0&&this._hist.length>1?l`
        <div class="seclbl">VPD \u00b7 ${t.hours??24}h</div>
        ${D([{data:this._hist,color:u.ok}],{w:this.chartW(),h:100,band:d?{min:d.vpd_min,max:d.vpd_max}:void 0,grid:3})}`:p}

      ${v.length?l`<div class="seclbl">Stationen</div>
        ${v.map(b=>l`<div class="logrow" style="margin-top:3px;padding:6px 9px">
          <span class="dot" style="background:${b.level==="ok"?u.ok:F[b.level]??u.warn};flex-shrink:0"></span>
          <span style="font-size:11px;font-weight:800;min-width:62px;flex-shrink:0;
            color:rgba(255,255,255,.8)">${b.name}</span>
          <span class="txt" style="color:rgba(255,255,255,.55)">${b.text}</span>
        </div>`)}`:p}

      <div class="seclbl">Informationssystem</div>
      ${R.length?R.map(b=>l`<div class="logrow" style="background:${N[b.level]??N.warning};margin-top:4px">
            <span class="txt" style="color:${F[b.level]??F.warning}">\u26A0 ${b.label}</span></div>`):l`<div class="logrow" style="background:${N.ok};margin-top:4px">
            <span class="txt" style="color:${u.ok}">\u2713 Alle Systeme arbeiten normal</span></div>`}
      ${this.renderConfirm()}
    </div>`}vpdZoneBar(t,i){let n=[{to:.4,col:"#5B8DEF",lbl:"zu feucht"},{to:.8,col:"#58E0A5",lbl:"Seedling"},{to:1.2,col:"#34D17B",lbl:"Veg"},{to:1.6,col:"#FFB35C",lbl:"Bloom"},{to:2,col:"#FF6B6B",lbl:"zu trocken"}],r=2,s=t!==null?Math.min(1,Math.max(0,t/r))*100:null,c=0;return l`<div style="margin-top:12px">
      <div style="position:relative;height:12px;border-radius:6px;
                  display:flex;box-shadow:inset 0 1px 3px rgba(0,0,0,.4)">
        ${n.map(a=>{let d=(a.to-c)/r*100,g=c===0;return c=a.to,l`<div style="width:${d}%;background:${a.col};opacity:.75;
            ${g?"border-radius:6px 0 0 6px;":""}
            ${a.to===r?"border-radius:0 6px 6px 0;":""}"></div>`})}
        ${i?l`<div style="position:absolute;top:-2px;bottom:-2px;
          left:${i.vpd_min/r*100}%;width:${(i.vpd_max-i.vpd_min)/r*100}%;
          border:1.5px solid rgba(255,255,255,.85);border-radius:4px;pointer-events:none"></div>`:p}
        ${s!==null?l`<div style="position:absolute;top:-4px;bottom:-4px;left:${s}%;
          width:3px;margin-left:-1.5px;background:#fff;border-radius:2px;
          box-shadow:0 0 6px rgba(255,255,255,.9)"></div>`:p}
      </div>
      <div style="display:flex;margin-top:4px">
        ${(()=>{let a=0;return n.map(d=>{let g=(d.to-a)/r*100;return a=d.to,l`<div style="width:${g}%;text-align:center;font-size:9.5px;
            color:rgba(255,255,255,.6);overflow:hidden;white-space:nowrap">${d.lbl}</div>`})})()}
      </div>
    </div>`}};customElements.define("growctrl-hero-card",Gt);var ri=[h.text("title","Titel"),h.bool("compact","Kompakte Zeilen")],oi=[h.text("name","Name (z.B. Main 1)"),h.entity("entity","Quelle (Log / Problem- / Ereignis-Sensor)",["input_text","binary_sensor","sensor"]),h.select("type","Typ",[{value:"station",label:"Stations-Log"},{value:"climate",label:"Klima-Log"},{value:"problem",label:"Problem-Sensor"},{value:"event",label:"Ereignis-Sensor (Integration)"}])],Vt=class extends ${render(){return l`${this.form(ri)}
      ${this.list({key:"rows",rowSchema:oi,title:"Zeilen",addLabel:"Zeile hinzuf\xFCgen",newItem:()=>({name:"",entity:"",type:"station"})})}
      ${this.styleSection()}`}};customElements.define("growctrl-checkup-editor",Vt);var jt=class extends y{static{this.styles=k}validateConfig(e){if(!Array.isArray(e.rows)||!e.rows.length)throw new Error("growctrl-checkup-card: 'rows' (min. 1 Eintrag) ist Pflicht.")}static getConfigElement(){return document.createElement("growctrl-checkup-editor")}static getStubConfig(){return{rows:[{name:"Main 1",entity:"input_text.hydro_log_mittel_main1"}]}}render(){let e=this._config;if(!this.hass)return p;let t=e.rows.map(s=>{if(s.type==="event"){let a=this.hass.states[s.entity],d=a?.attributes?.schweregrad??"ok";return{row:s,level:d==="ok"?"ok":d,label:a?.state??"\u2013",ts:""}}if(s.type?.toLowerCase?.()==="problem"){let a=this.isOn(s.entity);return{row:s,level:a?"warning":"ok",label:a?"Problem erkannt":"OK",ts:""}}let c=(s.type==="climate"?$e:_e)(this.st(s.entity));return{row:s,level:c.level==="none"?"ok":c.level,label:c.label,ts:c.ts??""}}),i=q(t.map(s=>s.level)),n=T[i],r=s=>s==="critical"?u.crit:s==="warning"?u.warn:s==="info"?u.info:u.ok;return l`<div class="card ${e.style?.glass?"glass":""}" data-level=${i} style=${w(e.style)}>
      <div class="hdr">
        <div class="title" style="font-size:15px">${e.title??"Checkup"}</div>
        <span class="status-pill" style="background:${n.bg};color:${n.color}">
          <span class="dot" style="background:${n.color}"></span>${n.label}</span>
      </div>
      <div style="margin-top:10px">
        ${t.map(s=>l`<div class="logrow" style="background:${e.compact?"transparent":N[s.level==="ok"?"none":s.level]};
            margin-top:${e.compact?2:5}px;padding:${e.compact?"4px 6px":"8px 11px"}">
          <span style="width:9px;height:9px;border-radius:50%;flex-shrink:0;background:${r(s.level)};
            box-shadow:0 0 7px ${r(s.level)}66"></span>
          <span style="font-size:11.5px;font-weight:800;min-width:64px;flex-shrink:0;color:rgba(255,255,255,.85)">${s.row.name}</span>
          <span class="txt" style="color:${s.level==="ok"?"rgba(255,255,255,.55)":F[s.level]}">${s.label}</span>
          ${s.ts?l`<span class="ts">${s.ts}</span>`:p}
        </div>`)}
      </div>
    </div>`}};customElements.define("growctrl-checkup-card",jt);var ai=[h.text("title","Titel"),h.entity("entity","F\xFCllstand-Sensor (%) (Pflicht)","sensor"),h.num("min","Mindeststand (%)",0,100),h.num("volume_l","Tankvolumen (Liter, optional)",0,2e3)],Wt=class extends ${render(){return l`${this.form(ai)}${this.styleSection()}`}};customElements.define("growctrl-tank-editor",Wt);var Zt=class extends y{static{this.styles=k}validateConfig(e){if(!e.entity)throw new Error("growctrl-tank-card: 'entity' (Fuellstand-Sensor in %) ist Pflicht.")}static getConfigElement(){return document.createElement("growctrl-tank-editor")}static getStubConfig(){return{entity:"sensor.gc_slot1_level1",title:"Tank"}}render(){let e=this._config;if(!this.hass)return p;let t=!this.hass.states[e.entity],i=Math.min(100,Math.max(0,S(this.st(e.entity))??(t?62:0))),n=e.min!==void 0&&i<e.min,r=n?u.crit:i<(e.min??0)+15?u.warn:"#4FC3F7",s=e.volume_l?i/100*e.volume_l:null;return l`<div class="card ${e.style?.glass?"glass":""}" data-level=${n?"critical":"ok"}
        style=${w(e.style)}>
      <div class="hdr">
        <div class="title" style="font-size:15px">${e.title??"F\xFCllstand"}</div>
        ${n?l`<span class="badge warn">\u26A0 Nachf\u00fcllen</span>`:p}
      </div>
      <div style="display:flex;align-items:center;gap:18px;margin-top:12px">
        <button class="gc" style="position:relative;width:74px;height:108px;flex-shrink:0;border-radius:12px 12px 16px 16px;
            border:2px solid rgba(255,255,255,.15);overflow:hidden;background:rgba(0,0,0,.3)"
          @click=${()=>this.moreInfo(e.entity)}>
          <div style="position:absolute;left:0;right:0;bottom:0;height:${i}%;transition:height .8s;
              background:linear-gradient(180deg, ${r}cc, ${r}88)">
            <div style="position:absolute;top:-5px;left:-10%;width:120%;height:10px;border-radius:50%;
              background:${r};opacity:.9"></div>
          </div>
          ${e.min!==void 0?l`<div style="position:absolute;left:0;right:0;bottom:${e.min}%;
            border-top:1.5px dashed rgba(255,107,107,.7)"></div>`:p}
        </button>
        <div style="flex:1;min-width:0">
          <div class="lbl">Aktueller F\u00fcllstand</div>
          <div class="val" style="font-size:34px;color:${r}">${Math.round(i)}<span class="unit">%</span></div>
          ${s!==null?l`<div style="font-size:12px;font-weight:600;color:rgba(255,255,255,.55);margin-top:2px">
            \u2248 ${s.toFixed(1)} l von ${e.volume_l} l</div>`:p}
          ${e.min!==void 0?l`<div style="font-size:10.5px;color:rgba(255,255,255,.4);margin-top:6px">
            Mindeststand ${e.min}%</div>`:p}
        </div>
      </div>
    </div>`}};customElements.define("growctrl-tank-card",Zt);var li=[h.text("title","Titel"),h.num("hours","Zeitraum (h)",1,168),h.num("height","Diagrammh\xF6he (px)",80,300)],ci=[h.entity("entity","Sensor","sensor"),h.text("name","Name (optional)"),h.text("color","Farbe (optional, z.B. #FF9F5A)")],Kt=class extends ${render(){return l`${this.form(li)}
      ${this.list({key:"sensors",rowSchema:ci,title:"Serien",addLabel:"Sensor hinzuf\xFCgen",newItem:()=>({entity:""})})}
      ${this.styleSection()}`}};customElements.define("growctrl-history-editor",Kt);var Pe=["#FF9F5A","#4FC3F7","#4DFFC3","#C792EA"],qt=class extends y{constructor(){super(...arguments);this._hist={}}static{this.styles=k}static{this.properties={...y.properties,_hist:{state:!0}}}validateConfig(t){if(!Array.isArray(t.sensors)||!t.sensors.length)throw new Error("growctrl-history-card: 'sensors' (min. 1 Eintrag) ist Pflicht.")}static getConfigElement(){return document.createElement("growctrl-history-editor")}static getStubConfig(){return{sensors:[{entity:"sensor.zelt_temperature"}],hours:24}}connectedCallback(){super.connectedCallback(),this._load(),this._timer=window.setInterval(()=>this._load(),5*6e4)}disconnectedCallback(){super.disconnectedCallback(),this._timer&&clearInterval(this._timer)}async _load(){if(!this.hass){setTimeout(()=>this._load(),1e3);return}let t=this._config,i={};for(let n of t.sensors)i[n.entity]=await E(this.hass,n.entity,t.hours??24);this._hist=i}render(){let t=this._config;if(!this.hass)return p;let i=t.sensors.map((n,r)=>({data:this._hist[n.entity]??[],color:n.color??Pe[r%Pe.length],name:`${n.name??this.friendly(n.entity)} \xB7 ${S(this.st(n.entity))??"--"} ${this.unit(n.entity)}`,fill:t.sensors.length===1}));return l`<div class="card ${t.style?.glass?"glass":""}" style=${w(t.style)}>
      <div class="hdr">
        <div class="title" style="font-size:15px">${t.title??"Verlauf"}</div>
        <span class="badge">${t.hours??24}h</span>
      </div>
      <div style="margin-top:8px">${D(i,{w:this.chartW(),h:t.height??130,grid:3})}</div>
      ${Ee(i)}
    </div>`}};customElements.define("growctrl-history-card",qt);var pi=[h.text("title","Titel"),h.entity("entity","Sensor (Pflicht)","sensor"),h.text("name","Anzeigename (optional)"),h.num("min","Sollbereich Min"),h.num("max","Sollbereich Max"),h.num("decimals","Nachkommastellen",0,4),h.num("hours","Chart-Zeitraum (h)",1,168),h.num("height","Diagrammh\xF6he (px)",80,300)],Xt=class extends ${render(){return l`${this.form(pi)}${this.styleSection()}`}};customElements.define("growctrl-metric-editor",Xt);var Qt=class extends y{constructor(){super(...arguments);this._hist=[]}static{this.styles=k}static{this.properties={...y.properties,_hist:{state:!0}}}validateConfig(t){if(!t.entity)throw new Error("growctrl-metric-card: 'entity' ist Pflicht.")}static getConfigElement(){return document.createElement("growctrl-metric-editor")}static getStubConfig(){return{entity:"sensor.gc_slot1_ec1",name:"EC",min:1.2,max:2.2}}connectedCallback(){super.connectedCallback(),this._load(),this._timer=window.setInterval(()=>this._load(),5*6e4)}disconnectedCallback(){super.disconnectedCallback(),this._timer&&clearInterval(this._timer)}async _load(){if(!this.hass){setTimeout(()=>this._load(),1e3);return}let t=this._config;this._hist=await E(this.hass,t.entity,t.hours??24)}render(){let t=this._config;if(!this.hass)return p;let i=S(this.st(t.entity))??(this.hass.states[t.entity]?null:1.84),n=i!==null&&(t.min!==void 0&&i<t.min||t.max!==void 0&&i>t.max),r=i===null?"rgba(255,255,255,.4)":n?u.crit:u.ok,s=t.decimals??2;return l`<div class="card ${t.style?.glass?"glass":""}" data-level=${n?"warning":"ok"}
        style=${w(t.style)}>
      <div class="hdr">
        <div>
          <div class="lbl" style="font-size:11px;text-transform:uppercase;letter-spacing:.9px;color:rgba(255,255,255,.62);font-weight:700">
            ${t.name??this.friendly(t.entity)}</div>
          <button class="gc" @click=${()=>this.moreInfo(t.entity)}>
            <span class="val" style="font-size:36px;font-weight:800;letter-spacing:-1px;color:${r}">
              ${i!==null?i.toFixed(s):"--"}</span>
            <span class="unit" style="font-size:14px">${this.unit(t.entity)}</span>
          </button>
        </div>
        ${t.min!==void 0||t.max!==void 0?l`
          <div style="text-align:right">
            <div class="lbl">Sollbereich</div>
            <div style="font-size:13px;font-weight:700;color:${n?u.crit:"rgba(255,255,255,.7)"}">
              ${t.min??"\u2013"} \u2013 ${t.max??"\u2013"}</div>
            ${n?l`<div style="font-size:10px;font-weight:800;color:${u.crit};margin-top:2px">
              ${i<(t.min??-1/0)?"\u25BC ZU NIEDRIG":"\u25B2 ZU HOCH"}</div>`:p}
          </div>`:p}
      </div>
      <div style="margin-top:14px">
        ${D([{data:this._hist,color:n?u.crit:"#4DFFC3"}],{w:this.chartW(),h:t.height??110,band:{min:t.min,max:t.max},grid:3})}
      </div>
    </div>`}};customElements.define("growctrl-metric-card",Qt);var di="3.0.0",hi=[{type:"growctrl-tent-card",name:"GROWCTRL Tent",description:"Zelt-Hero: Klima-KPIs, VPD-Skala, Status-Ampel"},{type:"growctrl-station-card",name:"GROWCTRL Station",description:"Station: Licht-/Pumpenbalken, Stage, Auto, Konfiguration"},{type:"growctrl-controls-card",name:"GROWCTRL Controls",description:"Aktoren-Raster mit Gruppen und Bestaetigung"},{type:"growctrl-sensors-card",name:"GROWCTRL Sensors",description:"Sensor-Kacheln mit Sparklines"},{type:"growctrl-status-card",name:"GROWCTRL Status",description:"Ereignisprotokoll der Integration mit Schweregrad-Ampel"},{type:"growctrl-hero-card",name:"GROWCTRL Hero",description:"Globale Steuerung, Klima-KPIs, VPD-Chart, Informationssystem"},{type:"growctrl-checkup-card",name:"GROWCTRL Checkup",description:"Ampel-Uebersicht aller Zelte/Stationen mit Auswertung"},{type:"growctrl-tank-card",name:"GROWCTRL Tank",description:"DWC-Fuellstand mit Animation und Warnstufe"},{type:"growctrl-history-card",name:"GROWCTRL History",description:"24h-Diagramm (z.B. Temperatur + Luftfeuchte)"},{type:"growctrl-metric-card",name:"GROWCTRL Metric",description:"EC/pH gross mit Chart und Sollbereich"}];window.customCards=window.customCards??[];hi.forEach(o=>window.customCards.push({...o,preview:!0,documentationURL:"https://github.com/MrDarkvoid/growctrl"}));console.info(`%c GROWCTRL Cards %c v${di} `,"background:#1D9E75;color:#fff;font-weight:700","background:#0F6E56;color:#fff");
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
