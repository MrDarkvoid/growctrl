var rt=globalThis,at=rt.ShadowRoot&&(rt.ShadyCSS===void 0||rt.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,gt=Symbol(),Jt=new WeakMap,Q=class{constructor(e,t,n){if(this._$cssResult$=!0,n!==gt)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(at&&e===void 0){let n=t!==void 0&&t.length===1;n&&(e=Jt.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),n&&Jt.set(t,e))}return e}toString(){return this.cssText}},te=a=>new Q(typeof a=="string"?a:a+"",void 0,gt),X=(a,...e)=>{let t=a.length===1?a[0]:e.reduce((n,i,s)=>n+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+a[s+1],a[0]);return new Q(t,a,gt)},ee=(a,e)=>{if(at)a.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(let t of e){let n=document.createElement("style"),i=rt.litNonce;i!==void 0&&n.setAttribute("nonce",i),n.textContent=t.cssText,a.appendChild(n)}},mt=at?a=>a:a=>a instanceof CSSStyleSheet?(e=>{let t="";for(let n of e.cssRules)t+=n.cssText;return te(t)})(a):a;var{is:Le,defineProperty:Me,getOwnPropertyDescriptor:Fe,getOwnPropertyNames:Oe,getOwnPropertySymbols:Re,getPrototypeOf:Ie}=Object,ot=globalThis,ne=ot.trustedTypes,Be=ne?ne.emptyScript:"",Ne=ot.reactiveElementPolyfillSupport,Y=(a,e)=>a,ft={toAttribute(a,e){switch(e){case Boolean:a=a?Be:null;break;case Object:case Array:a=a==null?a:JSON.stringify(a)}return a},fromAttribute(a,e){let t=a;switch(e){case Boolean:t=a!==null;break;case Number:t=a===null?null:Number(a);break;case Object:case Array:try{t=JSON.parse(a)}catch{t=null}}return t}},se=(a,e)=>!Le(a,e),ie={attribute:!0,type:String,converter:ft,reflect:!1,useDefault:!1,hasChanged:se};Symbol.metadata??=Symbol("metadata"),ot.litPropertyMetadata??=new WeakMap;var M=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=ie){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let n=Symbol(),i=this.getPropertyDescriptor(e,n,t);i!==void 0&&Me(this.prototype,e,i)}}static getPropertyDescriptor(e,t,n){let{get:i,set:s}=Fe(this.prototype,e)??{get(){return this[t]},set(r){this[t]=r}};return{get:i,set(r){let c=i?.call(this);s?.call(this,r),this.requestUpdate(e,c,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??ie}static _$Ei(){if(this.hasOwnProperty(Y("elementProperties")))return;let e=Ie(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(Y("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Y("properties"))){let t=this.properties,n=[...Oe(t),...Re(t)];for(let i of n)this.createProperty(i,t[i])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[n,i]of t)this.elementProperties.set(n,i)}this._$Eh=new Map;for(let[t,n]of this.elementProperties){let i=this._$Eu(t,n);i!==void 0&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let n=new Set(e.flat(1/0).reverse());for(let i of n)t.unshift(mt(i))}else e!==void 0&&t.push(mt(e));return t}static _$Eu(e,t){let n=t.attribute;return n===!1?void 0:typeof n=="string"?n:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let n of t.keys())this.hasOwnProperty(n)&&(e.set(n,this[n]),delete this[n]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ee(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,n){this._$AK(e,n)}_$ET(e,t){let n=this.constructor.elementProperties.get(e),i=this.constructor._$Eu(e,n);if(i!==void 0&&n.reflect===!0){let s=(n.converter?.toAttribute!==void 0?n.converter:ft).toAttribute(t,n.type);this._$Em=e,s==null?this.removeAttribute(i):this.setAttribute(i,s),this._$Em=null}}_$AK(e,t){let n=this.constructor,i=n._$Eh.get(e);if(i!==void 0&&this._$Em!==i){let s=n.getPropertyOptions(i),r=typeof s.converter=="function"?{fromAttribute:s.converter}:s.converter?.fromAttribute!==void 0?s.converter:ft;this._$Em=i;let c=r.fromAttribute(t,s.type);this[i]=c??this._$Ej?.get(i)??c,this._$Em=null}}requestUpdate(e,t,n,i=!1,s){if(e!==void 0){let r=this.constructor;if(i===!1&&(s=this[e]),n??=r.getPropertyOptions(e),!((n.hasChanged??se)(s,t)||n.useDefault&&n.reflect&&s===this._$Ej?.get(e)&&!this.hasAttribute(r._$Eu(e,n))))return;this.C(e,t,n)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:n,reflect:i,wrapped:s},r){n&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,r??t??this[e]),s!==!0||r!==void 0)||(this._$AL.has(e)||(this.hasUpdated||n||(t=void 0),this._$AL.set(e,t)),i===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[i,s]of this._$Ep)this[i]=s;this._$Ep=void 0}let n=this.constructor.elementProperties;if(n.size>0)for(let[i,s]of n){let{wrapped:r}=s,c=this[i];r!==!0||this._$AL.has(i)||c===void 0||this.C(i,void 0,s,c)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(n=>n.hostUpdate?.()),this.update(t)):this._$EM()}catch(n){throw e=!1,this._$EM(),n}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(e){}firstUpdated(e){}};M.elementStyles=[],M.shadowRootOptions={mode:"open"},M[Y("elementProperties")]=new Map,M[Y("finalized")]=new Map,Ne?.({ReactiveElement:M}),(ot.reactiveElementVersions??=[]).push("2.1.2");var _t=globalThis,re=a=>a,lt=_t.trustedTypes,ae=lt?lt.createPolicy("lit-html",{createHTML:a=>a}):void 0,ue="$lit$",R=`lit$${Math.random().toFixed(9).slice(2)}$`,he="?"+R,De=`<${he}>`,U=document,tt=()=>U.createComment(""),et=a=>a===null||typeof a!="object"&&typeof a!="function",kt=Array.isArray,He=a=>kt(a)||typeof a?.[Symbol.iterator]=="function",bt=`[ 	
\f\r]`,J=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,oe=/-->/g,le=/>/g,D=RegExp(`>|${bt}(?:([^\\s"'>=/]+)(${bt}*=${bt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ce=/'/g,de=/"/g,ge=/^(?:script|style|textarea|title)$/i,St=a=>(e,...t)=>({_$litType$:a,strings:e,values:t}),l=St(1),st=St(2),bn=St(3),V=Symbol.for("lit-noChange"),p=Symbol.for("lit-nothing"),pe=new WeakMap,H=U.createTreeWalker(U,129);function me(a,e){if(!kt(a)||!a.hasOwnProperty("raw"))throw Error("invalid template strings array");return ae!==void 0?ae.createHTML(e):e}var Ue=(a,e)=>{let t=a.length-1,n=[],i,s=e===2?"<svg>":e===3?"<math>":"",r=J;for(let c=0;c<t;c++){let d=a[c],o,h,m=-1,x=0;for(;x<d.length&&(r.lastIndex=x,h=r.exec(d),h!==null);)x=r.lastIndex,r===J?h[1]==="!--"?r=oe:h[1]!==void 0?r=le:h[2]!==void 0?(ge.test(h[2])&&(i=RegExp("</"+h[2],"g")),r=D):h[3]!==void 0&&(r=D):r===D?h[0]===">"?(r=i??J,m=-1):h[1]===void 0?m=-2:(m=r.lastIndex-h[2].length,o=h[1],r=h[3]===void 0?D:h[3]==='"'?de:ce):r===de||r===ce?r=D:r===oe||r===le?r=J:(r=D,i=void 0);let b=r===D&&a[c+1].startsWith("/>")?" ":"";s+=r===J?d+De:m>=0?(n.push(o),d.slice(0,m)+ue+d.slice(m)+R+b):d+R+(m===-2?c:b)}return[me(a,s+(a[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),n]},nt=class a{constructor({strings:e,_$litType$:t},n){let i;this.parts=[];let s=0,r=0,c=e.length-1,d=this.parts,[o,h]=Ue(e,t);if(this.el=a.createElement(o,n),H.currentNode=this.el.content,t===2||t===3){let m=this.el.content.firstChild;m.replaceWith(...m.childNodes)}for(;(i=H.nextNode())!==null&&d.length<c;){if(i.nodeType===1){if(i.hasAttributes())for(let m of i.getAttributeNames())if(m.endsWith(ue)){let x=h[r++],b=i.getAttribute(m).split(R),y=/([.?@])?(.*)/.exec(x);d.push({type:1,index:s,name:y[2],strings:b,ctor:y[1]==="."?vt:y[1]==="?"?yt:y[1]==="@"?$t:Z}),i.removeAttribute(m)}else m.startsWith(R)&&(d.push({type:6,index:s}),i.removeAttribute(m));if(ge.test(i.tagName)){let m=i.textContent.split(R),x=m.length-1;if(x>0){i.textContent=lt?lt.emptyScript:"";for(let b=0;b<x;b++)i.append(m[b],tt()),H.nextNode(),d.push({type:2,index:++s});i.append(m[x],tt())}}}else if(i.nodeType===8)if(i.data===he)d.push({type:2,index:s});else{let m=-1;for(;(m=i.data.indexOf(R,m+1))!==-1;)d.push({type:7,index:s}),m+=R.length-1}s++}}static createElement(e,t){let n=U.createElement("template");return n.innerHTML=e,n}};function K(a,e,t=a,n){if(e===V)return e;let i=n!==void 0?t._$Co?.[n]:t._$Cl,s=et(e)?void 0:e._$litDirective$;return i?.constructor!==s&&(i?._$AO?.(!1),s===void 0?i=void 0:(i=new s(a),i._$AT(a,t,n)),n!==void 0?(t._$Co??=[])[n]=i:t._$Cl=i),i!==void 0&&(e=K(a,i._$AS(a,e.values),i,n)),e}var xt=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:n}=this._$AD,i=(e?.creationScope??U).importNode(t,!0);H.currentNode=i;let s=H.nextNode(),r=0,c=0,d=n[0];for(;d!==void 0;){if(r===d.index){let o;d.type===2?o=new it(s,s.nextSibling,this,e):d.type===1?o=new d.ctor(s,d.name,d.strings,this,e):d.type===6&&(o=new wt(s,this,e)),this._$AV.push(o),d=n[++c]}r!==d?.index&&(s=H.nextNode(),r++)}return H.currentNode=U,i}p(e){let t=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(e,n,t),t+=n.strings.length-2):n._$AI(e[t])),t++}},it=class a{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,n,i){this.type=2,this._$AH=p,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=n,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=K(this,e,t),et(e)?e===p||e==null||e===""?(this._$AH!==p&&this._$AR(),this._$AH=p):e!==this._$AH&&e!==V&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):He(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==p&&et(this._$AH)?this._$AA.nextSibling.data=e:this.T(U.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:n}=e,i=typeof n=="number"?this._$AC(e):(n.el===void 0&&(n.el=nt.createElement(me(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===i)this._$AH.p(t);else{let s=new xt(i,this),r=s.u(this.options);s.p(t),this.T(r),this._$AH=s}}_$AC(e){let t=pe.get(e.strings);return t===void 0&&pe.set(e.strings,t=new nt(e)),t}k(e){kt(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,n,i=0;for(let s of e)i===t.length?t.push(n=new a(this.O(tt()),this.O(tt()),this,this.options)):n=t[i],n._$AI(s),i++;i<t.length&&(this._$AR(n&&n._$AB.nextSibling,i),t.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let n=re(e).nextSibling;re(e).remove(),e=n}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},Z=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,n,i,s){this.type=1,this._$AH=p,this._$AN=void 0,this.element=e,this.name=t,this._$AM=i,this.options=s,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=p}_$AI(e,t=this,n,i){let s=this.strings,r=!1;if(s===void 0)e=K(this,e,t,0),r=!et(e)||e!==this._$AH&&e!==V,r&&(this._$AH=e);else{let c=e,d,o;for(e=s[0],d=0;d<s.length-1;d++)o=K(this,c[n+d],t,d),o===V&&(o=this._$AH[d]),r||=!et(o)||o!==this._$AH[d],o===p?e=p:e!==p&&(e+=(o??"")+s[d+1]),this._$AH[d]=o}r&&!i&&this.j(e)}j(e){e===p?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},vt=class extends Z{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===p?void 0:e}},yt=class extends Z{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==p)}},$t=class extends Z{constructor(e,t,n,i,s){super(e,t,n,i,s),this.type=5}_$AI(e,t=this){if((e=K(this,e,t,0)??p)===V)return;let n=this._$AH,i=e===p&&n!==p||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,s=e!==p&&(n===p||i);i&&this.element.removeEventListener(this.name,this,n),s&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},wt=class{constructor(e,t,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){K(this,e)}};var Ve=_t.litHtmlPolyfillSupport;Ve?.(nt,it),(_t.litHtmlVersions??=[]).push("3.3.3");var fe=(a,e,t)=>{let n=t?.renderBefore??e,i=n._$litPart$;if(i===void 0){let s=t?.renderBefore??null;n._$litPart$=i=new it(e.insertBefore(tt(),s),s,void 0,t??{})}return i._$AI(a),i};var Et=globalThis,P=class extends M{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=fe(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return V}};P._$litElement$=!0,P.finalized=!0,Et.litElementHydrateSupport?.({LitElement:P});var We=Et.litElementPolyfillSupport;We?.({LitElement:P});(Et.litElementVersions??=[]).push("4.2.2");var Ke="4d72-4461726b-766f6964",xe=()=>Ke,be,ct=null;function dt(a){if(a?.states===be&&ct)return ct;let e=new Map,t=new Set,n={};for(let[i,s]of Object.entries(a?.states??{})){let r=s?.attributes;if(!r?.growctrl_role||!r?.growctrl_tent)continue;let c=String(r.growctrl_tent),d=String(r.growctrl_station??"zelt");e.set(`${c}::${d}::${r.growctrl_role}`,i),d==="zelt"?t.add(c):(n[c]??=new Set).add(d)}return be=a?.states,ct={tents:[...t].sort(),stations:Object.fromEntries(Object.entries(n).map(([i,s])=>[i,[...s].sort()])),byRole:e},ct}var T=(a,e,t,n)=>dt(a).byRole.get(`${e}::${t}::${n}`);var w=class extends P{constructor(){super(...arguments);this._config={};this._label=t=>t.label??t.name}static{this.properties={hass:{attribute:!1},_config:{state:!0}}}static{this.styles=X`
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
  `}setConfig(t){this._config={...t}}_fire(t){this._config=t,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0}))}form(t){return l`<ha-form .hass=${this.hass} .data=${this._config} .schema=${t}
      .computeLabel=${this._label}
      @value-changed=${n=>this._fire({...this._config,...n.detail.value})}></ha-form>`}list(t){let n=this._config[t.key]??[],i=s=>this._fire({...this._config,[t.key]:s});return l`
      ${t.title?l`<div class="lt">${t.title}</div>`:p}
      ${n.map((s,r)=>{let c=d=>{let o=[...n];o[r]=d,i(o)};return l`<div class="row ${t.child?"col":""}">
          <div class="rowmain">
            <ha-form .hass=${this.hass} .data=${s} .schema=${t.rowSchema}
              .computeLabel=${this._label}
              @value-changed=${d=>c({...s,...d.detail.value})}></ha-form>
            <button class="del" title="Entfernen"
              @click=${()=>i(n.filter((d,o)=>o!==r))}>\u2715</button>
          </div>
          ${t.child?l`<div class="subwrap">${this._subList(s,t.child,c)}</div>`:p}
        </div>`})}
      <button class="add" @click=${()=>i([...n,t.newItem()])}>+ ${t.addLabel}</button>`}_subList(t,n,i){let s=(t[n.key]??[]).map(c=>typeof c=="string"?{entity:c}:c),r=c=>i({...t,[n.key]:c});return l`
      ${n.title?l`<div class="lt sub">${n.title}</div>`:p}
      ${s.map((c,d)=>l`<div class="row sub">
        <ha-form .hass=${this.hass} .data=${c} .schema=${n.rowSchema}
          .computeLabel=${this._label}
          @value-changed=${o=>{let h=[...s];h[d]={...c,...o.detail.value},r(h)}}></ha-form>
        <button class="del" title="Entfernen"
          @click=${()=>r(s.filter((o,h)=>h!==d))}>\u2715</button>
      </div>`)}
      <button class="add" @click=${()=>r([...s,n.newItem()])}>+ ${n.addLabel}</button>`}tentSelect(t="tent",n="Zelt"){let i=dt(this.hass).tents;return{name:t,label:n,selector:{select:{options:i,custom_value:!0,mode:"dropdown"}}}}stationSelect(t,n="station",i="Station"){let s=dt(this.hass),r=t?s.stations[t]??[]:[...new Set(Object.values(s.stations).flat())];return{name:n,label:i,selector:{select:{options:r,custom_value:!0,mode:"dropdown"}}}}styleSection(){let t=this._config.style??{},n=[u.text("background","Hintergrund (Farbe, 'a,b' = Gradient oder CSS)"),u.num("opacity","Deckkraft (0\u20131)",0,1,.05),u.bool("glass","Glas-Effekt (Blur)"),u.text("accent","Akzentfarbe"),u.num("radius","Eckenradius (px)",0,40)];return l`<div class="lt">Stil</div>
      <ha-form .hass=${this.hass} .data=${t} .schema=${n}
        .computeLabel=${i=>i.label??i.name}
        @value-changed=${i=>this._fire({...this._config,style:{...i.detail.value}})}></ha-form>`}},u={text:(a,e)=>({name:a,label:e,selector:{text:{}}}),bool:(a,e)=>({name:a,label:e,selector:{boolean:{}}}),num:(a,e,t,n,i)=>({name:a,label:e,selector:{number:{min:t,max:n,step:i,mode:"box"}}}),entity:(a,e,t)=>({name:a,label:e,selector:{entity:t?{domain:t}:{}}}),entities:(a,e,t)=>({name:a,label:e,selector:{entity:{multiple:!0,...t?{domain:t}:{}}}}),select:(a,e,t)=>({name:a,label:e,selector:{select:{mode:"dropdown",options:t}}})};var Ct=class extends w{render(){let e=[this.tentSelect("tent","\u{1F3D5}\uFE0F Zelt"),u.text("name","\u270F\uFE0F Anzeigename (optional)"),u.bool("show_chart","\u{1F4C8} VPD-Chart anzeigen"),u.num("hours","\u23F1\uFE0F Chart-Zeitraum (h)",1,168)];return l`${this.form(e)}${this.styleSection()}
      <div class="hint">Zeigt Klima-Werte (Temperatur/Feuchte/VPD), die VPD-Zonenskala, Modus (VPD/RH) und
        die <b>Phase</b> als Dropdown. Zelt- und Klima-Schalter steuern die Automatik.</div>`}};customElements.define("growctrl-tent-editor",Ct);function At(a){if(a==null||isNaN(a))return"\u2013";let e=Math.max(0,Math.round(a)),t=Math.floor(e/60),n=e%60;return t&&n?`${t} h ${n} min`:t?`${t} h`:`${n} min`}function ve(a,e="auto"){let t=Math.floor(a/7)+1,n=a%7+1;return e==="tage"||e==="auto"&&a<7?`${a} Tage`:`Wo ${t} \xB7 Tag ${n}`}function _(a){if(a==null||a==="unknown"||a==="unavailable"||a==="")return null;let e=Number(a);return isNaN(e)?null:e}function ye(a){if(!a||a==="unknown"||a==="unavailable")return null;let e=new Date(a);return isNaN(e.getTime())?null:Math.max(0,Math.floor((Date.now()-e.getTime())/864e5))}var $e=new Map;async function L(a,e,t=24,n=48){let i=`${e}:${t}`,s=$e.get(i);if(s&&Date.now()-s.t<5*6e4)return s.data;try{let r=new Date(Date.now()-t*36e5).toISOString(),d=((await a.callApi("GET",`history/period/${r}?filter_entity_id=${e}&minimal_response&no_attributes`))?.[0]??[]).map(m=>parseFloat(m.state??m.s)).filter(m=>!isNaN(m)),o=Math.max(1,Math.floor(d.length/n)),h=d.filter((m,x)=>x%o===0);return $e.set(i,{t:Date.now(),data:h}),h}catch{return s?.data??[]}}var g={label:"rgba(242,247,243,0.56)",value:"rgba(242,247,243,0.97)",muted:"rgba(242,247,243,0.46)",logLabel:"rgba(242,247,243,0.72)",logText:"rgba(242,247,243,0.90)",ok:"#7BE8A8",warn:"#FFCE7A",crit:"#FF9D9D",info:"#9AC8FF",water:"#7CC8F0",light:"#FFDC8A",temp:"#FFB98A",heat:"#FFB35C",tileBg:"rgba(255,255,255,0.04)",rowBg:"rgba(255,255,255,0.035)"},Vn={critical:"rgba(255,157,157,.14)",warning:"rgba(255,206,122,.12)",info:"rgba(154,200,255,.10)",ok:g.rowBg,none:"rgba(255,255,255,.022)"},Wn={critical:g.crit,warning:g.warn,info:g.info,ok:g.logText,none:"rgba(242,247,243,.36)"},zt={Seedling:{bg:"rgba(154,200,255,0.16)",color:"#9AC8FF"},Veg:{bg:"rgba(123,232,168,0.16)",color:"#7BE8A8"},Bloom:{bg:"rgba(255,185,138,0.18)",color:"#FFB98A"},Flush:{bg:"rgba(195,171,245,0.18)",color:"#C3ABF5"},Trocknung:{bg:"rgba(211,168,120,0.18)",color:"#D3A878"}},S=a=>{let e=[];if(a?.background){let t=a.background.trim(),n=t.includes(",")&&!/^(linear|radial|conic|rgb|hsl)/i.test(t)?`linear-gradient(160deg, ${t})`:t;e.push(`--gc-bg:${n}`)}return a?.opacity!==void 0&&e.push(`--gc-opacity:${a.opacity}`),a?.accent&&e.push(`--gc-accent:${a.accent}`),a?.radius!==void 0&&e.push(`--gc-radius:${a.radius}px`),e.join(";")},G=a=>a.includes("critical")?"critical":a.includes("warning")?"warning":a.includes("info")?"info":"ok",F=a=>({ok:"ok",info:"info",warning:"warn",critical:"crit",none:"none"})[a]??"ok",E=X`
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
    box-shadow:0 10px 30px -12px rgba(0,0,0,.45); container-type:inline-size; container-name:gccard}
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

  /* ── Dynamische Skalierung: groessere Schrift in breiten Karten (PC/Tablet) ── */
  @container gccard (min-width: 460px){
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
    .seclbl{font-size:12px} .legend{font-size:13px}
    .ptab{font-size:14px; min-height:46px} .chip-auto{font-size:14px; min-height:46px}
    .agechip{font-size:12.5px}
    .plant .pname{font-size:19px} .plant .pstrain{font-size:14px}
    .plant .pimg{width:68px; height:68px; font-size:31px}
    .event .etx{font-size:14px} .event .etm{font-size:12px}
    .settings-grid .skv .k{font-size:11.5px} .settings-grid .skv .vv{font-size:16px}
    .stat .sv{font-size:18px} .stat .sl{font-size:10.5px}
    .act .aic{font-size:21px} .act .anm{font-size:11.5px} .act .ast{font-size:9.5px}
  }
  @container gccard (min-width: 680px){
    .hd .ttl{font-size:22px} .kpi .v{font-size:34px} .kpi .u{font-size:15px}
    .ind .ival{font-size:24px} .setval{font-size:24px}
    .supply .stt{font-size:17px} .supply .stm{font-size:17px}
    .lrow .what{font-size:15px} .plant .pname{font-size:21px}
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
`,Kn={ok:{bg:"rgba(123,232,168,.14)",color:g.ok,label:"Alles OK"},info:{bg:"rgba(154,200,255,.14)",color:g.info,label:"Info"},warning:{bg:"rgba(255,206,122,.14)",color:g.warn,label:"Warnung"},critical:{bg:"rgba(255,157,157,.16)",color:g.crit,label:"Kritisch"},none:{bg:"rgba(133,153,140,.14)",color:"#85998C",label:"Inaktiv"}};var I=30,pt=4,we=6,Tt=14,_e=0;function ke(a){if(a.length<3)return`M${a.map(t=>t.join(",")).join(" L")}`;let e=`M${a[0][0]},${a[0][1]}`;for(let t=0;t<a.length-1;t++){let n=a[Math.max(0,t-1)],i=a[t],s=a[t+1],r=a[Math.min(a.length-1,t+2)],c=i[0]+(s[0]-n[0])/6,d=i[1]+(s[1]-n[1])/6,o=s[0]-(r[0]-i[0])/6,h=s[1]-(r[1]-i[1])/6;e+=` C${c.toFixed(1)},${d.toFixed(1)} ${o.toFixed(1)},${h.toFixed(1)} ${s[0]},${s[1]}`}return e}function B(a,e={}){let t=`gcg${_e++}`,n=e.w??300,i=e.h??110,s=a.flatMap(b=>b.data);if(!s.length)return l`<div style="height:${i}px;display:flex;align-items:center;justify-content:center;
    font-size:11px;color:rgba(255,255,255,.5)">Keine Verlaufsdaten</div>`;let r=e.min??Math.min(...s,e.band?.min??1/0),c=e.max??Math.max(...s,e.band?.max??-1/0);c-r<.001&&(c+=1,r-=1);let d=(c-r)*.08;r-=d,c+=d;let o=(b,y)=>I+b/Math.max(1,y-1)*(n-I-pt),h=b=>we+(1-(b-r)/(c-r))*(i-we-Tt),m=e.grid??3,x=b=>Math.abs(b)>=100?b.toFixed(0):Math.abs(b)>=10?b.toFixed(1):b.toFixed(2);return l`<svg data-gce="4d724461726b766f6964" viewBox="0 0 ${n} ${i}" preserveAspectRatio="none" style="width:100%;height:${i}px;display:block">
    ${e.band&&(e.band.min!==void 0||e.band.max!==void 0)?st`
      <rect x="${I}" y="${h(e.band.max??c)}" width="${n-I-pt}"
        height="${Math.max(0,h(e.band.min??r)-h(e.band.max??c))}"
        fill="${e.band.color??"rgba(77,255,195,.08)"}" />`:p}
    ${Array.from({length:m+1},(b,y)=>{let v=r+(c-r)*y/m;return st`
        <line x1="${I}" y1="${h(v)}" x2="${n-pt}" y2="${h(v)}"
          stroke="rgba(255,255,255,.10)" stroke-width="1"/>
        <text x="${I-4}" y="${h(v)+3}" text-anchor="end"
          font-size="9.5" fill="rgba(255,255,255,.68)">${x(v)}</text>`})}
    ${a.map((b,y)=>{if(b.data.length<2)return p;let v=b.data.map((O,f)=>[Number(o(f,b.data.length).toFixed(1)),Number(h(O).toFixed(1))]),k=ke(v),C=v[v.length-1][0],A=v[v.length-1][1];return st`
        <defs>
          <linearGradient id="${t}-${y}" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="${b.color}" stop-opacity=".18"/>
            <stop offset="100%" stop-color="${b.color}" stop-opacity="0"/>
          </linearGradient>
        </defs>
        ${b.fill!==!1?st`<path
          d="${k} L${C},${i-Tt} L${I},${i-Tt} Z"
          fill="url(#${t}-${y})"/>`:p}
        <path d="${k}" fill="none" stroke="${b.color}" stroke-width="2.4"
          stroke-linejoin="round" stroke-linecap="round"/>
        <circle cx="${C}" cy="${A}" r="6" fill="${b.color}" opacity=".18"/>
        <circle cx="${C}" cy="${A}" r="3" fill="${b.color}"/>
        <circle cx="${C}" cy="${A}" r="1.3" fill="rgba(10,14,18,.9)"/>`})}
    <text x="${I}" y="${i-3}" font-size="9" fill="rgba(255,255,255,.5)">-24h</text>
    <text x="${n-pt}" y="${i-3}" text-anchor="end" font-size="9" fill="rgba(255,255,255,.5)">jetzt</text>
  </svg>`}function Se(a,e,t=280,n=38){if(a.length<2)return l`<div style="height:${n}px"></div>`;let i=`gcs${_e++}`,s=Math.min(...a),r=Math.max(...a);r-s<.001&&(r+=1,s-=1);let c=b=>b/(a.length-1)*t,d=b=>3+(1-(b-s)/(r-s))*(n-8),o=a.map((b,y)=>[Number(c(y).toFixed(1)),Number(d(b).toFixed(1))]),h=ke(o),m=o[o.length-1][0],x=o[o.length-1][1];return l`<svg data-gce="4d724461726b766f6964" viewBox="0 0 ${t} ${n}" style="width:100%;height:${n}px;display:block">
    <defs><linearGradient id="${i}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${e}" stop-opacity=".22"/>
      <stop offset="100%" stop-color="${e}" stop-opacity="0"/>
    </linearGradient></defs>
    <path d="${h} L${m},${n} L0,${n} Z" fill="url(#${i})"/>
    <path d="${h}" fill="none" stroke="${e}" stroke-width="2"
      stroke-linejoin="round" stroke-linecap="round"/>
    <circle cx="${m}" cy="${x}" r="2.6" fill="${e}"/>
  </svg>`}var Pt=a=>a.toLowerCase().replace(/ä/g,"a").replace(/ö/g,"o").replace(/ü/g,"u").replace(/ß/g,"ss").replace(/[^a-z0-9]+/g,"_").replace(/^_+|_+$/g,""),N=(a,e,t,n,i)=>i?.[n]??`${a}.growctrl_${Pt(e)}_${Pt(t)}_${n}`,j=(a,e,t,n)=>n?.[t]??`${a}.growctrl_zelt_${Pt(e)}_${t}`,ut={auto:["switch","automatik","auto"],wartung:["switch","wartung","maintenance"],stage:["select","wachstumsphase","stage"],lightOn:["time","licht_an","light_on"],lightOffSv:["time","licht_aus_seedling_veg","light_off_sv"],lightOffBloom:["time","licht_aus_bloom_flush","light_off_bloom"],lightRest:["sensor","licht_restzeit","light_rest"],pumpRest:["sensor","pumpe_restzeit","pump_rest"],age:["sensor","alter_seit_keimung","plant_age"],rec:["sensor","phasen_empfehlung","stage_recommendation"],event:["sensor","letztes_ereignis","last_event"],dli:["sensor","dli_heute","dli_today"],dliFc:["sensor","dli_prognose","dli_forecast"],germination:["date","keimstart","germination"],overrideMin:["number","manuelle_ubernahme","override_minutes"],pOverride:["binary_sensor","manueller_eingriff","problem_override"],pFailsafe:["binary_sensor","licht_failsafe","problem_light_failsafe"],pTime:["binary_sensor","lichtzeiten_unvollstandig","problem_time_invalid"],pPump:["binary_sensor","pumpe_gesperrt_fullstand","problem_pump_blocked"],pPower:["binary_sensor","licht_ohne_leistung","problem_power"]},q={enabled:["switch","zelt_aktiv","tent_enabled"],climate:["switch","klima_automatik","climate_enabled"],mode:["select","klima_modus","climate_mode"],phase:["select","klima_phase","climate_phase"],vpd:["sensor","vpd","vpd"],status:["sensor","status","status"],event:["sensor","letztes_ereignis","last_event"]};var $=class extends P{constructor(){super(...arguments);this._cw=0;this._config={};this._confirm=null}static{this.properties={hass:{attribute:!1},_config:{state:!0},_confirm:{state:!0},_cw:{state:!0}}}connectedCallback(){super.connectedCallback(),this._ro=new ResizeObserver(t=>{let n=Math.round(t[0]?.contentRect?.width??0);n&&Math.abs(n-this._cw)>8&&(this._cw=n)}),this._ro.observe(this)}disconnectedCallback(){this._ro?.disconnect(),super.disconnectedCallback()}chartW(t=34){return Math.max(280,(this._cw||320)-t)}setConfig(t){this.validateConfig(t),this._config=t}validateConfig(t){}getCardSize(){return 4}st(t){return t?this.hass?.states[t]?.state:void 0}isOn(t){return this.st(t)==="on"}friendly(t){return t&&this.hass?.states[t]?.attributes?.friendly_name||t||""}unit(t){return t&&this.hass?.states[t]?.attributes?.unit_of_measurement||""}moreInfo(t){this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:t},bubbles:!0,composed:!0}))}navigate(t){history.pushState(null,"",t),window.dispatchEvent(new CustomEvent("location-changed"))}toggle(t){let n=t.split(".")[0],i=["switch","input_boolean","light","fan"].includes(n)?n:"homeassistant";this.hass.callService(i,"toggle",{entity_id:t})}confirmToggle(t,n){this._confirm={text:`${n} wirklich schalten?`,action:()=>this.toggle(t)}}renderConfirm(){return this._confirm?l`<div style="position:absolute;inset:0;background:rgba(0,0,0,.6);border-radius:16px;
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
    </div>`:p}};var Ze=["VPD","RH"],Ge=["Auto","Seedling","Veg","Bloom","Trocknung"],Ee={Auto:"",Seedling:"pd-seed",Veg:"pd-veg",Bloom:"pd-bloom",Trocknung:"pd-dry"},Ce={Auto:"automatisch",Seedling:"Anzucht",Veg:"Wachstum",Bloom:"Bl\xFCte",Trocknung:"Ernte"},Ae=[{w:20,col:"#6E97DE",lbl:"zu feucht"},{w:20,col:"#58E0A5",lbl:"Seedling"},{w:20,col:"#2FB36C",lbl:"Veg"},{w:20,col:"#E5B567",lbl:"Bloom"},{w:20,col:"#D4726F",lbl:"zu trocken"}],Lt=2,Mt=class extends ${constructor(){super(...arguments);this._hist=[];this._phase=!1}static{this.styles=E}static{this.properties={...$.properties,_hist:{state:!0},_phase:{state:!0}}}validateConfig(t){if(!t.tent)throw new Error("growctrl-tent-card: 'tent' ist Pflicht (Zelt-Name aus der Integration).")}static getConfigElement(){return document.createElement("growctrl-tent-editor")}static getStubConfig(){return{tent:"gross"}}e(t){let[n,i,s]=q[t],r=this._config;return r.overrides?.[i]??T(this.hass,r.tent,"zelt",s)??j(n,r.tent,i,r.overrides)}_select(t,n){this.hass.callService("select","select_option",{entity_id:t,option:n})}connectedCallback(){super.connectedCallback(),this._load(),this._timer=window.setInterval(()=>this._load(),5*6e4)}disconnectedCallback(){super.disconnectedCallback(),this._timer&&clearInterval(this._timer)}async _load(){if(!this.hass){setTimeout(()=>this._load(),1e3);return}this._hist=await L(this.hass,this.e("vpd"),this._config.hours??24)}tglBtn(t,n,i){return l`<button class="gc tgl ${i?"on":""}" style="flex:1; justify-content:center" @click=${()=>this.confirmToggle(t,n)}>
      <span class="sw"></span> ${n}</button>`}chips(t,n,i){return l`<div style="display:flex; gap:6px; flex-wrap:wrap">
      ${n.map(s=>{let r=s===i;return l`<button class="gc" style="padding:7px 13px; border-radius:999px; font:800 11.5px var(--f-ui);
            border:1.5px solid ${r?"color-mix(in srgb, var(--acc) 50%, transparent)":"var(--line)"};
            background:${r?"var(--acc-soft)":"transparent"}; color:${r?"var(--acc)":"var(--tx-2)"}"
          @click=${()=>this._select(t,s)}>${s}</button>`})}
    </div>`}phaseDropdown(t,n){return l`<div class="dd ${this._phase?"open":""}">
      <button class="gc dd-btn" aria-haspopup="listbox" aria-expanded=${this._phase} @click=${()=>{this._phase=!this._phase}}>
        <span class="pdot ${Ee[n]}" style="${n==="Auto"?"background:var(--acc);color:var(--acc)":""}"></span>${n}
        <span class="hint">${Ce[n]??""}</span>
        <ha-icon icon="mdi:chevron-down" style="--mdc-icon-size:16px;color:var(--tx-3);transition:transform .2s;${this._phase?"transform:rotate(180deg)":""}"></ha-icon>
      </button>
      ${this._phase?l`<div class="dd-menu" role="listbox">
        ${Ge.map(i=>l`<button class="gc dd-it" role="option" aria-selected=${i===n}
          @click=${()=>{this._select(t,i),this._phase=!1}}>
          <span class="pdot ${Ee[i]}" style="${i==="Auto"?"background:var(--acc)":""}"></span>${i}<span class="hint">${Ce[i]??""}</span></button>`)}
      </div>`:p}
    </div>`}render(){let t=this._config;if(!this.hass)return p;let n=this.hass.states[this.e("vpd")],i=!n&&!this.hass.states[this.e("enabled")],s=_(n?.state)??(i?1.06:null),r=n?.attributes?.temp,c=n?.attributes?.rh,d=n?.attributes?.phase_effektiv??"Veg",o=n?.attributes?.sollwerte,h=this.isOn(this.e("enabled"))||i,m=this.isOn(this.e("climate")),x=this.hass.states[this.e("status")],b=x?.attributes?.probleme??[],y=x?.state?.toLowerCase?.()==="problem"?"warning":h?"ok":"none",v=this.hass.states[this.e("event")],k=s!==null&&o&&s>=o.vpd_min&&s<=o.vpd_max,C=s!==null?Math.min(100,Math.max(0,s/Lt*100)):null;return l`<div class="card ${t.style?.glass?"glass":""}" data-level=${y==="none"?"ok":y} style="${S(t.style)};position:relative">
      <div class="hd">
        <div class="grow" style="min-width:0">
          <div class="ttl">${t.name??`Klima Zelt ${t.tent}`}</div>
          <div class="sub">Phase ${d}${o?` \xB7 Soll ${o.vpd_min}\u2013${o.vpd_max} kPa / ${o.rh_min}\u2013${o.rh_max} %`:""}</div>
        </div>
        <span class="pill ${h?F(y):"none"}">${h?y==="ok"?"Alles OK":y==="warning"?"Warnung":"Info":"Deaktiviert"}</span>
      </div>

      <div style="display:flex; gap:8px; margin-bottom:16px">
        ${this.tglBtn(this.e("enabled"),"Zelt",h)}
        ${this.tglBtn(this.e("climate"),"Klima",m)}
      </div>

      <div class="kpis">
        <button class="gc kpi c-temp" @click=${()=>this.moreInfo(this.e("vpd"))}><span class="mlbl">Temperatur</span><span class="v">${r!=null?Number(r).toFixed(1):"\u2013"}<span class="u">°C</span></span></button>
        <button class="gc kpi c-hum" @click=${()=>this.moreInfo(this.e("vpd"))}><span class="mlbl">Luftfeuchte</span><span class="v">${c!=null?Math.round(Number(c)):"\u2013"}<span class="u">%</span></span></button>
        <button class="gc kpi c-vpd" @click=${()=>this.moreInfo(this.e("vpd"))}><span class="mlbl">VPD</span><span class="v" style="${s!==null&&!k?`color:${g.warn}`:""}">${s!==null?s.toFixed(2):"\u2013"}<span class="u">kPa</span></span></button>
      </div>

      <div style="margin-top:16px">
        <div class="zones">
          ${Ae.map(A=>l`<i style="width:${A.w}%;background:${A.col}"></i>`)}
          ${o?l`<span class="zband" style="left:${o.vpd_min/Lt*100}%;width:${(o.vpd_max-o.vpd_min)/Lt*100}%"></span>`:p}
          ${C!==null?l`<span class="zmark" style="left:${C}%"></span>`:p}
        </div>
        <div class="zlbl">${Ae.map(A=>l`<span style="width:${A.w}%">${A.lbl}</span>`)}</div>
      </div>

      <div style="display:flex; gap:12px; flex-wrap:wrap; margin-top:14px; align-items:center">
        <span class="mlbl">Modus</span>${this.chips(this.e("mode"),Ze,this.st(this.e("mode"))??"VPD")}
      </div>
      <div style="margin-top:13px">
        <span class="mlbl" style="display:block; margin-bottom:8px">Phase</span>
        ${this.phaseDropdown(this.e("phase"),this.st(this.e("phase"))??"Auto")}
      </div>

      ${t.show_chart!==!1&&this._hist.length>1?l`
        <div class="seclbl">VPD · ${t.hours??24}h</div>
        ${B([{data:this._hist,color:k===!1?g.warn:g.ok,fill:!0}],{w:this.chartW(),h:96,band:o?{min:o.vpd_min,max:o.vpd_max}:void 0,grid:3})}`:p}

      ${b.length?l`<div style="display:flex; flex-wrap:wrap; gap:7px; margin-top:12px">
        ${b.map(A=>l`<span class="pbadge warn"><ha-icon icon="mdi:alert" style="--mdc-icon-size:12px"></ha-icon>${A}</span>`)}</div>`:p}

      ${v?l`<button class="gc event" style="margin-top:14px" @click=${()=>this.moreInfo(this.e("event"))}>
        <span class="edot" style="background:${v.attributes?.schweregrad==="critical"?g.crit:v.attributes?.schweregrad==="warning"?g.warn:g.info}"></span>
        <span class="etx">${v.state}</span>
        <span class="etm">${v.last_changed?new Date(v.last_changed).toLocaleTimeString("de-DE",{hour:"2-digit",minute:"2-digit"}):""}</span>
      </button>`:p}
      ${this.renderConfirm()}
    </div>`}};customElements.define("growctrl-tent-card",Mt);var Ft=class extends w{render(){let e=[this.tentSelect("tent","\u{1F3D5}\uFE0F Zelt"),this.stationSelect(this._config?.tent,"station","\u{1F331} Station"),u.text("name","\u270F\uFE0F Anzeigename (optional)"),u.bool("show_settings","\u2699\uFE0F Einstellungen-Zahnrad anzeigen"),u.bool("show_event","\u{1F4E3} Ereignisfeld am Kartenfu\xDF (Standard an)"),u.entity("tank_entity","\u{1F4A7} Stations-Tank F\xFCllstand % (optional)","sensor"),u.num("tank_min","\u26A0\uFE0F Tank-Mindeststand %",0,100),u.num("tank_volume","\u{1FAA3} Tank-Volumen in Litern (optional)",1,1e4)],t=[u.entity("entity","\u{1F50C} Schalter",["switch","input_boolean","light","fan"]),u.text("name","\u270F\uFE0F Anzeigename (optional)"),u.select("kind","\u{1F3A8} Art (Farbe/Icon)",[{value:"light",label:"Licht"},{value:"pump",label:"Pumpe"},{value:"o2",label:"O\u2082"},{value:"fan",label:"L\xFCfter"},{value:"heat",label:"Heizmatte"},{value:"water",label:"Befeuchter"}]),u.bool("confirm","\u2705 Vor dem Schalten best\xE4tigen")],n=[u.text("name","\u{1F331} Name"),u.text("strain","\u{1F9EC} Sorte / Genetik (optional)"),u.entity("germination_helper","\u{1F4C5} Keimstart-Datum (date, optional)","date"),u.text("image","\u{1F5BC}\uFE0F Bild-URL (optional)"),u.entity("temp_entity","\u{1F321}\uFE0F Temperatur (Sensor / input_number)"),u.entity("humidity_entity","\u{1F4A7} Feuchtigkeit (Sensor / input_number)"),u.entity("ph_entity","\u2697\uFE0F pH (Sensor / input_number)"),u.entity("ec_entity","\u26A1 EC (Sensor / input_number)"),u.entity("tank_entity","\u{1FAA3} Tank-F\xFCllstand % (optional)","sensor"),u.num("tank_min","\u26A0\uFE0F Tank-Mindeststand % (Standard 30)",0,100)],i={key:"sensors",title:"\u2795 Weitere Sensoren (als Felder, jeder mit Namen)",rowSchema:[u.entity("entity","\u{1F4C8} Sensor / input_number"),u.text("name","\u270F\uFE0F Anzeigename (optional)")],addLabel:"Sensor hinzuf\xFCgen",newItem:()=>({entity:""})};return l`${this.form(e)}
      ${this.list({key:"actuators",rowSchema:t,title:"\u{1F50C} Aktoren (Kacheln, 4 nebeneinander)",addLabel:"Aktor hinzuf\xFCgen",newItem:()=>({entity:""})})}
      ${this.list({key:"plants",rowSchema:n,title:"\u{1F331} Pflanzen (Tabs in der Karte)",child:i,addLabel:"Pflanze hinzuf\xFCgen",newItem:()=>({name:""})})}
      ${this.styleSection()}
      <div class="hint">
        <b>Temperatur &amp; Feuchtigkeit</b> werden als Mini-Verlauf gezeigt, <b>pH &amp; EC</b> als
        Zonen-Balken (Ideal/akzeptiert/schlecht). W\u00e4hlst du dort ein <code>input_number</code>
        (oder <code>number</code>), erscheint ein <b>\u2212/\uff0b-Stepper</b> zum Setzen \u2013 ideal f\u00fcr
        Handmessungen ohne Sonde.<br>
        Eigene pH/EC-Idealbereiche per YAML:
        <code>ph_ideal: [5.8, 6.3]</code>, <code>ec_ideal: [1.2, 2.2]</code>.<br>
        Entity-IDs werden automatisch abgeleitet
        (z.B. <code>switch.growctrl_gross_main1_automatik</code>); Abweichungen per YAML
        <code>overrides: { automatik: switch.mein_schalter }</code>.
      </div>`}};customElements.define("growctrl-station-editor",Ft);var je=["Seedling","Veg","Bloom","Flush","Trocknung"],ze={Seedling:"Anzucht",Veg:"Wachstum",Bloom:"Bl\xFCte",Flush:"Sp\xFClen",Trocknung:"Ernte"},qe={Seedling:"pd-seed",Veg:"pd-veg",Bloom:"pd-bloom",Flush:"pd-flush",Trocknung:"pd-dry"},Qe={light:"mdi:lightbulb",heat:"mdi:radiator",water:"mdi:air-humidifier",pump:"mdi:water-pump",fan:"mdi:fan",o2:"mdi:scuba-tank"},Ot=class extends ${constructor(){super(...arguments);this._open=!1;this._tab=0;this._phase=!1;this._spark={}}static{this.styles=E}static{this.properties={...$.properties,_open:{state:!0},_tab:{state:!0},_spark:{state:!0},_phase:{state:!0}}}updated(t){if(super.updated?.(t),!t.has("hass")&&!t.has("_config"))return;(this._config?.plants??[]).flatMap(s=>this.sensorsFor(s).filter(r=>r.anzeige==="graph")).forEach(async s=>{let r=await L(this.hass,s.entity,s.hours??24);r.length&&this._spark[s.entity]?.length!==r.length&&(this._spark={...this._spark,[s.entity]:r})})}validateConfig(t){if(!t.tent||!t.station)throw new Error("growctrl-station-card: 'tent' und 'station' sind Pflicht (wie in der Integration angelegt).")}static getConfigElement(){return document.createElement("growctrl-station-editor")}static getStubConfig(){return{tent:"gross",station:"main1"}}get isPreview(){return!this.hass?.states?.[this.e("stage")]}e(t){let[n,i,s]=ut[t],r=this._config;return r.overrides?.[i]??T(this.hass,r.tent,r.station,s)??N(n,r.tent,r.station,i,r.overrides)}_select(t,n){this.hass.callService("select","select_option",{entity_id:t,option:n})}render(){let t=this._config;if(!this.hass)return p;let n=this.isPreview,i=this.st(this.e("stage"))??"Veg",s=zt[i]??zt.Veg,r=this.isOn(this.e("auto"))||n,c=this.isOn(this.e("wartung")),d=[{e:this.e("pOverride"),label:"Manueller Eingriff",crit:!1},{e:this.e("pFailsafe"),label:"Licht-Failsafe",crit:!0},{e:this.e("pTime"),label:"Zeiten unvollst\xE4ndig",crit:!1},{e:this.e("pPump"),label:"Pumpe gesperrt (F\xFCllstand)",crit:!1},{e:this.e("pPower"),label:"Licht ohne Leistung",crit:!0}].filter(x=>this.isOn(x.e)),o=this.hass.states[this.e("event")],h=d.length?d.some(x=>x.crit)?"critical":"warning":o?.attributes?.schweregrad==="critical"?"warning":"ok",m=c?"Wartung aktiv":h==="critical"?"Kritisch":h==="warning"?"Warnung":"Alles OK";return l`<div class="card ${t.style?.glass?"glass":""}" data-level=${h} style="${S(t.style)};position:relative">

      <div class="hd">
        <div class="grow" style="min-width:0">
          <div class="ttl">${t.name??`${t.tent} \xB7 ${t.station}`}</div>
          <div class="sub" style="display:flex;align-items:center;gap:7px">
            <span style="width:7px;height:7px;border-radius:50%;flex-shrink:0;
              background:${h==="critical"?g.crit:h==="warning"?g.warn:g.ok};
              box-shadow:0 0 8px currentColor;color:${h==="critical"?g.crit:h==="warning"?g.warn:g.ok}"></span>
            ${m}
          </div>
        </div>
        <button class="gc icbtn ${c?"on":""}" title="Wartung (System greift nicht ein)"
          @click=${()=>this.toggle(this.e("wartung"))}>
          <ha-icon icon="mdi:wrench-outline" style="--mdc-icon-size:16px"></ha-icon></button>
        ${t.show_settings!==!1?l`<button class="gc icbtn" title="Einstellungen" @click=${()=>{this._open=!this._open}}>
          <ha-icon icon="mdi:tune-variant" style="--mdc-icon-size:16px"></ha-icon></button>`:p}
        <button class="gc chip-auto ${r?"":"off"}" @click=${()=>this.confirmToggle(this.e("auto"),"Automatik")}>
          AUTO ${r?"AN":"AUS"}</button>
      </div>

      <div style="margin-bottom:10px">${this.phaseDropdown(i,s)}</div>
      ${this.lightRow()}
      ${this.pumpRow(n)}
      ${this.dliRow(n)}
      ${this.actuators()}
      ${this.tankRow()}
      ${this.plantTabs()}

      ${d.length?l`<div style="display:flex;gap:7px;flex-wrap:wrap;margin-top:12px">
        ${d.map(x=>l`<span class="pbadge ${x.crit?"crit":"warn"}">
          <ha-icon icon="mdi:alert" style="--mdc-icon-size:12px"></ha-icon>${x.label}</span>`)}</div>`:p}

      ${t.show_event!==!1&&o?l`
        <button class="gc event" style="margin-top:14px" @click=${()=>this.moreInfo(this.e("event"))}>
          <span class="edot" style="background:${o.attributes?.schweregrad==="critical"?g.crit:o.attributes?.schweregrad==="warning"?g.warn:g.info}"></span>
          <span class="etx">${o.state}</span>
          <span class="etm">${o.last_changed?new Date(o.last_changed).toLocaleTimeString("de-DE",{hour:"2-digit",minute:"2-digit"}):""}</span>
        </button>`:p}

      ${this._open?l`<div class="settings-grid" style="margin-top:12px">
        ${this.setting(this.e("lightOn"),"Licht AN")}
        ${this.setting(this.e("lightOffSv"),"AUS Seed/Veg")}
        ${this.setting(this.e("lightOffBloom"),"AUS Bloom")}
        ${this.setting(this.e("germination"),"Keimstart")}
        ${this.setting(this.e("overrideMin"),"Man. \xDCbernahme")}
      </div>`:p}
      ${this.renderConfirm()}
    </div>`}setting(t,n){return l`<button class="gc skv" @click=${()=>this.moreInfo(t)}>
      <div class="k">${n}</div><div class="vv">${this.st(t)??"\u2013"}</div></button>`}phaseDropdown(t,n){let i=this.hass.states[this.e("rec")],s=i?.state&&i.state!==t?i.state:null;return l`<div class="dd ${this._phase?"open":""}">
      <button class="gc dd-btn" aria-haspopup="listbox" aria-expanded=${this._phase} @click=${()=>{this._phase=!this._phase}}>
        <span class="pdot" style="background:${n.color};color:${n.color}"></span>${t}
        <span class="hint">${ze[t]??""}${s?" \xB7 Richtwert "+s:""}</span>
        <ha-icon icon="mdi:chevron-down" style="--mdc-icon-size:16px;color:var(--tx-3);transition:transform .2s;${this._phase?"transform:rotate(180deg)":""}"></ha-icon>
      </button>
      ${this._phase?l`<div class="dd-menu" role="listbox">
        ${je.map(r=>l`<button class="gc dd-it" role="option" aria-selected=${r===t}
          @click=${()=>{this._select(this.e("stage"),r),this._phase=!1}}>
          <span class="pdot ${qe[r]}"></span>${r}<span class="hint">${ze[r]??""}</span></button>`)}
      </div>`:p}
    </div>`}supplyRow(t){return l`<button class="gc supply" style="${t.topMargin?"margin-top:8px":""}" @click=${t.onClick??(()=>{})}>
      <span class="shd">
        <span class="sic" style="color:${t.iconColor};${t.glow?`filter:drop-shadow(0 0 7px ${t.iconColor})`:""}">
          <ha-icon icon="${t.icon}" style="--mdc-icon-size:20px"></ha-icon></span>
        <span class="stt">${t.title}</span>
        <span class="stm" style="color:${t.valueColor}">${t.value}</span>
      </span>
      ${t.fillPct!==null&&t.fillPct!==void 0?l`
        <span class="bar"><i style="width:${Math.min(100,Math.max(0,t.fillPct))}%;
          background:linear-gradient(90deg, ${t.fillColor}, ${t.fillColor}cc);box-shadow:0 0 9px ${t.fillColor}55"></i>
          ${t.minPct!==void 0?l`<span class="min" style="left:${t.minPct}%"></span>`:p}</span>`:p}
      ${t.footL||t.footR?l`<span class="sft"><span>${t.footL??""}</span><span>${t.footR??""}</span></span>`:p}
    </button>`}lightRow(){if(this.isPreview)return this.supplyRow({icon:"mdi:lightbulb-on",iconColor:g.light,glow:!0,title:"Licht an",value:"5 h 40 min",valueColor:g.light,fillPct:62,fillColor:g.light,footL:"Leuchtphase",footR:"62 % verbleibend"});let t=this.hass.states[this.e("lightRest")];if(!t)return p;let n=t.attributes??{},i=n.zustand?n.zustand==="an":void 0,s=Number(t.state),r=isNaN(s)?"\u2013":At(s),c=typeof n.anteil=="number"?Math.min(1,Math.max(0,n.anteil)):null,d=i===!1?"#7E9488":g.light;return this.supplyRow({icon:i===!1?"mdi:lightbulb-outline":"mdi:lightbulb-on",iconColor:d,glow:i!==!1,title:i===!1?"Licht aus":"Licht an",value:i===!1?"\u2013":r,valueColor:d,fillPct:i===!1?null:c!==null?c*100:null,fillColor:d,footL:i===!1?"Licht ausgeschaltet":"Leuchtphase",footR:i===!1?"":c!==null?`${(c*100).toFixed(0)} % verbleibend`:"",onClick:()=>this.moreInfo(this.e("lightRest"))})}pumpRow(t){let n=this.hass.states[this.e("pumpRest")];if(!n&&!t)return p;if(t)return this.supplyRow({icon:"mdi:water-pump",iconColor:g.water,topMargin:!0,title:"Pumpe aus",value:"in 12 min",valueColor:g.water,fillPct:80,fillColor:g.water,footL:"N\xE4chster Zyklus",footR:"80 % der Pause"});let i=Number(n.state),s=n.attributes??{},r=s.aktiv===!1,c=typeof s.anteil=="number"?Math.min(1,Math.max(0,s.anteil)):null,d=s.zustand?s.zustand==="an":void 0;return this.supplyRow({icon:r?"mdi:water-pump-off":"mdi:water-pump",iconColor:r?"#7E9488":g.water,topMargin:!0,title:r?"Pumpe aus":d?"Pumpe l\xE4uft":"Pumpe aus",value:r||isNaN(i)?"\u2013":At(i),valueColor:r?"#7E9488":g.water,fillPct:r?null:c!==null?c*100:null,fillColor:g.water,footL:r?"Pumpe ausgeschaltet":s.text??"Zyklus",footR:r?"":c!==null?`${(c*100).toFixed(0)} %`:"",onClick:()=>this.moreInfo(this.e("pumpRest"))})}dliRow(t){let n=this.hass.states[this.e("dli")];if(!n&&!t)return p;let i=_(this.st(this.e("dli")))??(t?18.4:null),s=_(this.st(this.e("dliFc")))??(t?24.7:null),r=n?.attributes?.ziel_aktuelle_phase??(t?25:void 0),c=r&&i!==null?i/r*100:null,d=r&&s!==null?Math.min(100,s/r*100):void 0;return this.supplyRow({icon:"mdi:white-balance-sunny",iconColor:g.light,topMargin:!0,title:"DLI heute",value:i!==null?`${i.toFixed(1)}${r?` / ${r}`:""}`:"\u2013",valueColor:g.light,fillPct:c,fillColor:g.light,minPct:d,footL:s!==null?`Prognose ${s.toFixed(1)} mol/m\xB2`:"",footR:r?"Marker = Prognose":"",onClick:()=>this.moreInfo(this.e("dli"))})}actuators(){let t=this._config.actuators??[];return t.length?l`
      <div class="seclbl">Aktoren</div>
      <div class="acts">
        ${t.map(n=>{let i=this.isOn(n.entity),s=n.kind??"",r=n.icon??Qe[s]??"mdi:power",c=n.name??this.friendly(n.entity);return l`<button class="gc act ${i?"on":""} ${i&&s?s:""}"
            @click=${()=>n.confirm?this.confirmToggle(n.entity,c):this.toggle(n.entity)}>
            <ha-icon class="aic" icon="${r}" style="--mdc-icon-size:18px"></ha-icon>
            <span class="anm">${c}</span>
            <span class="ast">${i?"AN":"AUS"}</span></button>`})}
      </div>`:p}tankRow(){let t=this._config;if(!t.tank_entity)return p;let n=Math.min(100,Math.max(0,_(this.st(t.tank_entity))??0)),i=t.tank_min??30,s=n<i,r=s?g.crit:g.water,c=t.tank_volume;return this.supplyRow({icon:"mdi:car-coolant-level",iconColor:g.water,topMargin:!0,title:"Tank",value:`${n.toFixed(0)} %`,valueColor:r,fillPct:n,fillColor:r,minPct:i,footL:c?`\u2248 ${(n/100*c).toFixed(0)} l von ${c} l`:s?"Unter Mindeststand":"",footR:`Min ${i} %`,onClick:()=>this.moreInfo(t.tank_entity)})}plantTabs(){let t=this._config.plants??[];if(!t.length)return p;let n=Math.min(this._tab,t.length-1),i=t[n],s=i.germination_helper?this.st(i.germination_helper):null,r=s?ye(s):null;return l`
      <div class="ptabs" style="margin-top:14px">
        ${t.map((c,d)=>l`<button class="gc ptab" role="tab" aria-selected=${d===n} @click=${()=>{this._tab=d}}>
          <ha-icon icon="mdi:sprout" style="--mdc-icon-size:15px"></ha-icon>${c.name}</button>`)}
      </div>
      <div class="plant">
        <div class="phd">
          ${i.image?l`<img class="pimg" src="${i.image}"/>`:l`<div class="pimg"><ha-icon icon="mdi:sprout" style="--mdc-icon-size:28px"></ha-icon></div>`}
          <div style="flex:1;min-width:0">
            <div class="pname">${i.name}${i.strain?l`<span class="pstrain" style="display:inline;margin:0 0 0 7px">\u00b7 ${i.strain}</span>`:p}</div>
            ${r!==null?l`<span class="agechip">${ve(r)}</span>`:p}
          </div>
        </div>
        ${this.plantSensors(this.sensorsFor(i))}
        ${i.tank_entity?this.plantTankInd(i.tank_entity,i.tank_min??30):p}
      </div>`}sensorsFor(t){let n=[];t.temp_entity&&n.push({entity:t.temp_entity,name:"Temperatur",anzeige:"graph",color:g.temp,icon:"mdi:thermometer",hours:24}),t.humidity_entity&&n.push({entity:t.humidity_entity,name:"Feuchtigkeit",anzeige:"graph",color:g.water,icon:"mdi:water-percent",hours:24}),t.ph_entity&&n.push({entity:t.ph_entity,name:"pH",anzeige:"zone",min:4,max:8,ok:t.ph_ok??[5.5,6.5],ideal:t.ph_ideal??[5.8,6.3]}),t.ec_entity&&n.push({entity:t.ec_entity,name:"EC",anzeige:"zone",min:0,max:3,ok:t.ec_ok??[1,2.4],ideal:t.ec_ideal??[1.2,2.2]});let i=(t.sensors??[]).map(s=>typeof s=="string"?{entity:s}:s);return[...n,...i]}plantSensors(t){return t.length?l`${t.map(n=>this.sensorInd(n))}`:p}zoneV6(t,n,i,s,r,c){let d=i-n||1,o=(x,b)=>Math.max(0,(Math.min(b,i)-Math.max(x,n))/d*100),h=[{cls:"z-bad",w:o(n,s[0])},{cls:"z-low",w:o(s[0],r[0])},{cls:"z-ok",w:o(r[0],r[1])},{cls:"z-high",w:o(r[1],s[1])},{cls:"z-bad",w:o(s[1],i)}],m=t!==null?Math.min(100,Math.max(0,(t-n)/d*100)):null;return l`
      <span class="zones">
        ${h.map(x=>l`<i class="${x.cls}" style="width:${x.w}%"></i>`)}
        ${m!==null?l`<span class="zmark" style="left:${m}%"></span>`:p}
      </span>
      <span class="zlbl">
        <span style="width:30%;text-align:left">${n}</span>
        <span style="width:40%;color:#4CB87E;font-weight:800">${r[0]}\u2013${r[1]} ideal</span>
        <span style="width:30%;text-align:right">${i}</span>
      </span>`}sensorInd(t){let n=_(this.st(t.entity)),i=t.name??this.friendly(t.entity),s=this.unit(t.entity),r=t.anzeige??"wert",c=t.entity.split(".")[0],d=c==="number"||c==="input_number",o=this.hass.states[t.entity]?.attributes??{},h=t.step??(Number(o.step)||.1),m=o.min,x=o.max,b=(String(h).split(".")[1]??"").length||1,y=f=>{let z=f;m!==void 0&&(z=Math.max(m,z)),x!==void 0&&(z=Math.min(x,z)),this.hass.callService(c,"set_value",{entity_id:t.entity,value:Number(z.toFixed(b))})},v,k=t.ideal??[0,0],C=t.ok??k;if(r==="zone"){let f=n!==null&&n>=k[0]&&n<=k[1],z=n!==null&&n>=C[0]&&n<=C[1];v=t.color??(f?g.ok:z?g.warn:g.crit)}else r==="graph"?v=t.color??g.water:v=t.color??"rgba(242,247,243,.95)";let A=l`<div class="ihd">
      <span class="ilbl" style="color:${r==="wert"?"var(--tx-2)":v};cursor:pointer" @click=${()=>this.moreInfo(t.entity)}>
        ${t.icon?l`<ha-icon icon="${t.icon}" style="--mdc-icon-size:14px"></ha-icon>`:p}${i}
        ${d?l`<ha-icon icon="mdi:pencil" style="--mdc-icon-size:11px;opacity:.45;margin-left:3px"></ha-icon>`:p}
      </span>
      ${d?l`<span class="setrow">
            <button class="gc stepbtn" title="weniger" @click=${()=>n!==null&&y(n-h)}><ha-icon icon="mdi:minus" style="--mdc-icon-size:16px"></ha-icon></button>
            <span class="setval" style="color:${v}">${n!==null?n:"\u2013"}<span class="u">${s}</span></span>
            <button class="gc stepbtn" title="mehr" @click=${()=>y((n??m??0)+h)}><ha-icon icon="mdi:plus" style="--mdc-icon-size:16px"></ha-icon></button></span>`:l`<span class="ival" style="color:${v};cursor:pointer" @click=${()=>this.moreInfo(t.entity)}>
            ${n!==null?n:this.st(t.entity)??"\u2013"}<span class="u">${s}</span></span>`}
    </div>`,O=r==="zone"?this.zoneV6(n,t.min??0,t.max??14,C,k,s):r==="graph"?l`<div class="spark">${Se(this._spark[t.entity]??[],v,this.chartW(74),38)}</div>`:p;return l`<div class="ind">${A}${O}</div>`}plantTankInd(t,n){let i=Math.min(100,Math.max(0,_(this.st(t))??0)),r=i<n?g.crit:g.water;return l`<button class="gc ind" @click=${()=>this.moreInfo(t)}>
      <div class="ihd"><span class="ilbl" style="color:${g.water}">
        <ha-icon icon="mdi:car-coolant-level" style="--mdc-icon-size:14px"></ha-icon>Tank</span>
        <span class="ival" style="color:${r}">${i.toFixed(0)}<span class="u"> %</span></span></div>
      <span class="bar" style="margin-top:8px"><i style="width:${i}%;background:linear-gradient(90deg, ${r}, ${r}cc);box-shadow:0 0 9px ${r}55"></i>
        <span class="min" style="left:${n}%"></span></span>
    </button>`}};customElements.define("growctrl-station-card",Ot);var Xe=[u.text("title","\u{1F3F7}\uFE0F Titel"),u.num("columns","\u25A6 Spalten",1,6)],Ye=[u.entity("entity","\u{1F50C} Aktor",["switch","input_boolean","light","fan"]),u.text("name","\u270F\uFE0F Anzeigename (optional)"),u.text("group","\u{1F5C2}\uFE0F Gruppe (optional, z.B. Zelt / Pflanzen)"),u.select("kind","\u{1F3A8} Art (Farbe/Icon, optional)",[{value:"light",label:"Licht"},{value:"heat",label:"Heizung"},{value:"water",label:"Wasser / Befeuchter"},{value:"o2",label:"O\u2082"},{value:"fan",label:"L\xFCfter"},{value:"pump",label:"Pumpe"}]),u.bool("confirm","\u2705 Mit Best\xE4tigung schalten")],Rt=class extends w{render(){return l`${this.form(Xe)}
      ${this.list({key:"controls",rowSchema:Ye,title:"\u{1F50C} Aktoren",addLabel:"Aktor hinzuf\xFCgen",newItem:()=>({entity:""})})}
      ${this.styleSection()}
      <div class="hint">Gleiche <b>Gruppe</b> = gemeinsame \u00dcberschrift. <b>Art</b> setzt Farbe und Icon.
        <b>Best\u00e4tigung</b> fragt vor dem Schalten nach (z.B. f\u00fcr Pumpen).</div>`}};customElements.define("growctrl-controls-editor",Rt);var Je={switch:"mdi:power",light:"mdi:lightbulb",fan:"mdi:fan",input_boolean:"mdi:toggle-switch"},tn={light:"mdi:lightbulb",heat:"mdi:radiator",water:"mdi:air-humidifier",o2:"mdi:scuba-tank",fan:"mdi:fan",pump:"mdi:water-pump"},It=class extends ${static{this.styles=E}validateConfig(e){if(!Array.isArray(e.controls)||!e.controls.length)throw new Error("growctrl-controls-card: 'controls' (min. 1 Eintrag) ist Pflicht.")}static getConfigElement(){return document.createElement("growctrl-controls-editor")}static getStubConfig(){return{controls:[{entity:"switch.beispiel"}]}}render(){let e=this._config;if(!this.hass)return p;let t=e.columns??4,n=new Map;return e.controls.forEach(i=>{let s=i.group??"";n.has(s)||n.set(s,[]),n.get(s).push(i)}),l`<div class="card ${e.style?.glass?"glass":""}" style="${S(e.style)};position:relative">
      ${e.title?l`<div class="hd"><div class="ttl">${e.title}</div></div>`:p}
      ${[...n.entries()].map(([i,s])=>l`
        ${i?l`<div class="seclbl">${i}</div>`:p}
        <div class="acts" style="grid-template-columns:repeat(${t},1fr); ${i?"":"margin-top:4px"}">
          ${s.map(r=>{let c=this.isOn(r.entity),d=r.name??this.friendly(r.entity),o=r.kind??"",h=o==="light"||o==="heat"||o==="water"?o:"",m=r.icon??this.hass.states[r.entity]?.attributes?.icon??tn[o]??Je[r.entity.split(".")[0]]??"mdi:power";return l`<button class="gc act ${c?"on":""} ${c?h:""}"
              @click=${()=>r.confirm?this.confirmToggle(r.entity,d):this.toggle(r.entity)}>
              <ha-icon class="aic" icon=${m} style="--mdc-icon-size:18px"></ha-icon>
              <span class="anm">${d}</span>
              <span class="ast">${c?"AN":"AUS"}</span>
            </button>`})}
        </div>`)}
      ${this.renderConfirm()}
    </div>`}};customElements.define("growctrl-controls-card",It);var en=[u.text("title","\u{1F3F7}\uFE0F Titel"),u.num("columns","\u25A6 Spalten",1,6)],nn=[u.entity("entity","\u{1F4C8} Sensor","sensor"),u.text("name","\u270F\uFE0F Anzeigename (optional)"),u.num("min","Sollbereich Min (optional)"),u.num("max","Sollbereich Max (optional)"),u.select("accent","\u{1F3A8} Akzentfarbe (optional)",[{value:"temp",label:"Temperatur (orange)"},{value:"hum",label:"Feuchte (blau)"},{value:"vpd",label:"VPD (Akzent)"}])],Bt=class extends w{render(){return l`${this.form(en)}
      ${this.list({key:"sensors",rowSchema:nn,title:"\u{1F4C8} Sensoren",addLabel:"Sensor hinzuf\xFCgen",newItem:()=>({entity:""})})}
      ${this.styleSection()}
      <div class="hint">Jede Kachel zeigt den aktuellen Wert. <b>Anzeigename</b> \u00fcberschreibt den
        Entity-Namen. <b>Sollbereich</b> (Min/Max) blendet einen kleinen Soll-Hinweis ein.
        <b>Akzentfarbe</b> f\u00e4rbt den Wert passend ein.</div>`}};customElements.define("growctrl-sensors-editor",Bt);var Nt=class extends ${static{this.styles=E}validateConfig(e){if(!Array.isArray(e.sensors)||!e.sensors.length)throw new Error("growctrl-sensors-card: 'sensors' (min. 1 Eintrag) ist Pflicht.")}static getConfigElement(){return document.createElement("growctrl-sensors-editor")}static getStubConfig(){return{sensors:[{entity:"sensor.beispiel"}]}}bad(e,t){return e!==null&&(t.min!==void 0&&e<t.min||t.max!==void 0&&e>t.max)}render(){let e=this._config;if(!this.hass)return p;let t=e.columns??3,n=e.sensors.some(i=>this.bad(_(this.st(i.entity)),i));return l`<div class="card ${e.style?.glass?"glass":""}" data-level=${n?"warning":"ok"} style=${S(e.style)}>
      ${e.title?l`<div class="hd"><div class="ttl">${e.title}</div></div>`:p}
      <div class="kpis" style="grid-template-columns:repeat(${t},minmax(0,1fr))">
        ${e.sensors.map(i=>{let s=_(this.st(i.entity)),r=this.bad(s,i),c=i.name??this.friendly(i.entity),d=i.accent?`c-${i.accent}`:"";return l`<button class="gc kpi ${d}" @click=${()=>this.moreInfo(i.entity)}>
            <span class="mlbl" style="overflow:hidden; white-space:nowrap; text-overflow:ellipsis; display:block">${c}</span>
            <span class="v" style="${r?`color:${g.crit}`:""}">${s!==null?s:"--"}<span class="u">${this.unit(i.entity)}</span></span>
          </button>`})}
      </div>
    </div>`}};customElements.define("growctrl-sensors-card",Nt);var sn=[u.text("title","\u{1F3F7}\uFE0F Titel"),u.num("limit","\u{1F4CB} Max. Zeilen",3,50),u.select("min_level","\u{1F50D} Anzeige",[{value:"alle",label:"Alle Ereignisse"},{value:"warnung",label:"Nur Warnungen/Fehler"}])],rn=[u.entity("entity","\u{1F4DC} Letztes-Ereignis-Sensor","sensor"),u.text("name","\u270F\uFE0F Label (optional)")],Dt=class extends w{render(){return l`${this.form(sn)}
      ${this.list({key:"sources",rowSchema:rn,title:"\u{1F4E1} Quellen",addLabel:"Quelle hinzuf\xFCgen",newItem:()=>({entity:""})})}
      ${this.styleSection()}
      <div class="hint">Sammelt die Ereignisse mehrerer GROWCTRL-Sensoren in ein Protokoll, neueste zuerst.
        <b>Label</b> ersetzt den Quellennamen. <b>Anzeige</b> kann auf Warnungen/Fehler filtern.</div>`}};customElements.define("growctrl-status-editor",Dt);var Ht=class extends ${static{this.styles=E}validateConfig(e){if(!Array.isArray(e.sources)||!e.sources.length)throw new Error("growctrl-status-card: 'sources' (Letztes-Ereignis-Sensoren) ist Pflicht.")}static getConfigElement(){return document.createElement("growctrl-status-editor")}static getStubConfig(){return{sources:[{entity:"sensor.growctrl_gross_main1_letztes_ereignis"}]}}render(){let e=this._config;if(!this.hass)return p;let t=[],n=[];for(let o of e.sources){let h=this.hass.states[o.entity],m=h?.attributes?.verlauf??[];n.push(h?.attributes?.schweregrad??"ok"),m.forEach(x=>t.push({...x,src:o.name??this.friendly(o.entity),entity:o.entity}))}t.reverse();let s=(e.min_level==="warnung"?t.filter(o=>o.level==="warning"||o.level==="critical"):t).slice(0,e.limit??12),r=G(n),c=e.sources.length>1,d=o=>o==="critical"?"c":o==="warning"?"w":o==="info"?"i":"";return l`<div class="card ${e.style?.glass?"glass":""}" data-level=${r} style=${S(e.style)}>
      <div class="hd">
        <div class="ttl grow">${e.title??"Ereignisprotokoll"}</div>
        <span class="pill ${F(r)}">${r==="ok"?"Info":r==="warning"?"Warnung":r==="critical"?"Kritisch":"Info"}</span>
      </div>
      <div class="log">
        ${s.length?s.map(o=>l`
          <button class="gc lrow ${d(o.level)}" @click=${()=>o.entity&&this.moreInfo(o.entity)}>
            <span class="tm">${o.ts}</span>
            ${c?l`<span class="who">${o.src}</span>`:p}
            <span class="what">${o.text}</span>
          </button>`):l`<div class="lrow"><span class="what" style="color:var(--acc)">✓ Noch keine Ereignisse</span></div>`}
      </div>
    </div>`}};customElements.define("growctrl-status-card",Ht);var an=[u.text("title","\u{1F3F7}\uFE0F Titel (optional)"),u.text("logo","\u{1F5BC}\uFE0F Logo-URL (z.B. /local/growctrl/logo.png)"),u.bool("show_chart","\u{1F4C8} 24h-Chart zus\xE4tzlich zum Zonen-Balken"),u.num("hours","\u23F1\uFE0F Chart-Zeitraum (h)",1,168)],Ut=class extends w{render(){let e=[this.stationSelect(this._config?.tent),u.text("name","\u270F\uFE0F Anzeigename (optional)")];return l`${this.form([this.tentSelect("tent","\u{1F3D5}\uFE0F Zelt"),...an])}
      ${this.list({key:"stations",rowSchema:e,title:"\u{1F331} Stationen (Informationssystem)",addLabel:"Station hinzuf\xFCgen",newItem:()=>({station:""})})}
      ${this.styleSection()}
      <div class="hint">Die Hero-Karte ist die Zelt-\u00dcbersicht: Klima-Werte, VPD-Skala und das
        Informationssystem. Die gelisteten <b>Stationen</b> liefern die Ereigniszeilen darunter.</div>`}};customElements.define("growctrl-hero-editor",Ut);var Te=[{w:20,col:"#6E97DE",lbl:"zu feucht"},{w:20,col:"#58E0A5",lbl:"Seedling"},{w:20,col:"#2FB36C",lbl:"Veg"},{w:20,col:"#E5B567",lbl:"Bloom"},{w:20,col:"#D4726F",lbl:"zu trocken"}],Vt=2,Wt=class extends ${constructor(){super(...arguments);this._logoErr=!1;this._hist=[]}static{this.styles=E}static{this.properties={...$.properties,_hist:{state:!0},_logoErr:{state:!0}}}validateConfig(t){if(!t.tent)throw new Error("growctrl-hero-card: 'tent' ist Pflicht (Zelt-Name aus der Integration).")}static getConfigElement(){return document.createElement("growctrl-hero-editor")}static getStubConfig(){return{tent:"gross",stations:[{station:"main1"}]}}te(t){let[n,i,s]=q[t],r=this._config;return r.overrides?.[i]??T(this.hass,r.tent,"zelt",s)??j(n,r.tent,i,r.overrides)}connectedCallback(){super.connectedCallback(),this._load(),this._timer=window.setInterval(()=>this._load(),5*6e4)}disconnectedCallback(){super.disconnectedCallback(),this._timer&&clearInterval(this._timer)}async _load(){if(!this.hass){setTimeout(()=>this._load(),1e3);return}this._hist=await L(this.hass,this.te("vpd"),this._config.hours??24)}tglBtn(t,n,i){return l`<button class="gc tgl ${i?"on":""}" @click=${()=>this.confirmToggle(t,n)}>
      <span class="sw"></span> ${n}</button>`}render(){let t=this._config;if(!this.hass)return p;let n=this.hass.states[this.te("vpd")],i=!n&&!this.hass.states[this.te("enabled")],s=_(n?.state)??(i?.76:null),r=n?.attributes?.temp??(i?21.5:null),c=n?.attributes?.rh??(i?61:null),d=n?.attributes?.phase_effektiv??"",o=n?.attributes?.sollwerte,h=this.isOn(this.te("enabled"))||i,m=this.isOn(this.te("climate")),x=this.hass.states[this.te("status")],b=x?.attributes?.probleme??[],y=(t.stations??[]).map(f=>{let z=this.hass.states[T(this.hass,t.tent,f.station,"last_event")??N("sensor",t.tent,f.station,"letztes_ereignis",t.overrides)],W=this.hass.states[T(this.hass,t.tent,f.station,"light_rest")??N("sensor",t.tent,f.station,"licht_restzeit",t.overrides)],ht=z?.attributes?.schweregrad??"ok";return{name:f.name??f.station,text:z?.state??"\u2013",level:ht,lightText:W?.attributes?.text??(W?.state?`Licht ${W.attributes?.zustand??""}`:""),on:W?.attributes?.zustand==="an",ent:T(this.hass,t.tent,f.station,"last_event")??N("sensor",t.tent,f.station,"letztes_ereignis",t.overrides)}}),v=f=>f==="warning"||f==="critical",k=G([(x?.state??"").toLowerCase()==="problem"?"warning":"ok",...y.map(f=>v(f.level)?f.level:"ok")]),C=[...b.map(f=>({label:f,level:"warning"})),...y.filter(f=>v(f.level)).map(f=>({label:`${f.name}: ${f.text}`,level:f.level}))],A=s!==null&&o&&s>=o.vpd_min&&s<=o.vpd_max,O=s!==null?Math.min(100,Math.max(0,s/Vt*100)):null;return l`<div class="card ${t.style?.glass?"glass":""}" data-level=${k} style="${S(t.style)};position:relative">
      <div class="hd">
        ${t.logo&&!this._logoErr?l`<img src=${t.logo} alt="Logo" @error=${()=>{this._logoErr=!0}}
              style="width:46px;height:46px;border-radius:16px;object-fit:contain;background:rgba(255,255,255,.92);padding:3px;flex-shrink:0" />`:l`<div class="badge-ic"><ha-icon icon="mdi:sprout" style="--mdc-icon-size:22px"></ha-icon></div>`}
        <div class="grow" style="min-width:0">
          <div class="ttl">${t.title??`Growroom \xB7 ${t.tent}`}</div>
          ${d?l`<div class="sub">Klima-Phase ${d}</div>`:p}
        </div>
        <span class="pill ${F(k)}">${k==="ok"?"Alles OK":k==="warning"?"Warnung":k==="critical"?"Kritisch":"Info"}</span>
      </div>

      <div style="display:flex; gap:8px; margin-bottom:16px; flex-wrap:wrap">
        ${this.tglBtn(this.te("enabled"),"Zelt",h)}
        ${this.tglBtn(this.te("climate"),"Klima",m)}
      </div>

      <div class="kpis">
        <button class="gc kpi c-temp" @click=${()=>this.moreInfo(this.te("vpd"))}>
          <span class="mlbl">Temperatur</span><span class="v">${r!=null?Number(r).toFixed(1):"\u2013"}<span class="u">°C</span></span></button>
        <button class="gc kpi c-hum" @click=${()=>this.moreInfo(this.te("vpd"))}>
          <span class="mlbl">Luftfeuchte</span><span class="v">${c!=null?Math.round(Number(c)):"\u2013"}<span class="u">%</span></span></button>
        <button class="gc kpi c-vpd" @click=${()=>this.moreInfo(this.te("vpd"))}>
          <span class="mlbl">VPD</span><span class="v" style="${s!==null&&!A?`color:${g.warn}`:""}">${s!==null?s.toFixed(2):"\u2013"}<span class="u">kPa</span></span></button>
      </div>

      <div style="margin-top:16px">
        <div class="zones">
          ${Te.map(f=>l`<i style="width:${f.w}%;background:${f.col}"></i>`)}
          ${o?l`<span class="zband" style="left:${o.vpd_min/Vt*100}%;width:${(o.vpd_max-o.vpd_min)/Vt*100}%"></span>`:p}
          ${O!==null?l`<span class="zmark" style="left:${O}%"></span>`:p}
        </div>
        <div class="zlbl">${Te.map(f=>l`<span style="width:${f.w}%">${f.lbl}</span>`)}</div>
      </div>

      ${t.show_chart===!0&&this._hist.length>1?l`
        <div class="seclbl">VPD · ${t.hours??24}h</div>
        ${B([{data:this._hist,color:A===!1?g.warn:g.ok,fill:!0}],{w:this.chartW(),h:96,band:o?{min:o.vpd_min,max:o.vpd_max}:void 0,grid:3})}`:p}

      ${y.length?l`<div class="seclbl">Stationen</div>
        <div style="display:flex; flex-direction:column; gap:7px">
          ${y.map(f=>l`<button class="gc supply" @click=${()=>f.ent&&this.moreInfo(f.ent)}>
            <span class="shd">
              <span class="sic" style="color:${f.on?g.light:"var(--tx-3)"}"><ha-icon icon="mdi:lightbulb${f.on?"-on":"-outline"}" style="--mdc-icon-size:18px"></ha-icon></span>
              <span class="stt">${f.name}</span>
              <span class="stm" style="color:${v(f.level)?f.level==="critical"?g.crit:g.warn:g.ok};font-size:12px">${v(f.level)?f.level==="critical"?"Fehler":"Warnung":"OK"}</span>
            </span>
            <span class="sft"><span>${f.lightText||f.text}</span><span></span></span>
          </button>`)}
        </div>`:p}

      <div class="seclbl">Informationssystem</div>
      ${C.length?l`<div style="display:flex; flex-direction:column; gap:7px">
            ${C.map(f=>l`<div class="event" style="cursor:default">
              <span class="edot" style="background:${f.level==="critical"?g.crit:g.warn}"></span>
              <span class="etx" style="color:${f.level==="critical"?g.crit:g.warn}">${f.label}</span></div>`)}
          </div>`:l`<div class="event" style="cursor:default">
            <span class="edot" style="background:${g.ok};box-shadow:0 0 6px ${g.ok}"></span>
            <span class="etx" style="color:${g.ok}">Alle Systeme arbeiten normal</span></div>`}
      ${this.renderConfirm()}
    </div>`}};customElements.define("growctrl-hero-card",Wt);var Kt=class extends w{render(){let e=this._config.tent,t=[this.tentSelect("tent","\u{1F3D5}\uFE0F Zelt"),u.text("title","\u{1F3F7}\uFE0F Titel"),u.bool("show_tent_row","\u{1F3D5}\uFE0F Zelt-Sektion zeigen (Aktiv/Klima/VPD/Status)"),u.text("tent_name","\u270F\uFE0F Name der Zelt-Zeile (optional)")],n=[this.stationSelect(e,"station","\u{1F331} Station"),u.text("name","\u270F\uFE0F Anzeigename (optional)")];return l`${this.form(t)}
      ${this.list({key:"stations",rowSchema:n,title:"\u{1F331} Stationen",addLabel:"Station hinzuf\xFCgen",newItem:()=>({station:""})})}
      ${this.styleSection()}
      <div class="hint">Zwei Ampel-Sektionen: <b>Stationen</b> (Licht / Pumpe / Auto / Eingriff / Status) und
        <b>Zelt</b> (Aktiv / Klima / VPD / Status). Ein <b>grauer</b> Punkt bedeutet \u201enicht aktiv / nicht
        relevant\u201c, gr\u00fcn = OK, gelb = Warnung, rot = kritisch. Tippen \u00f6ffnet die Entit\u00e4t.</div>`}};customElements.define("growctrl-checkup-editor",Kt);var Zt=class extends ${static{this.styles=E}validateConfig(e){if((!Array.isArray(e.stations)||!e.stations.length)&&(!Array.isArray(e.rows)||!e.rows.length))throw new Error("growctrl-checkup-card: 'stations' (min. 1) ist Pflicht.")}static getConfigElement(){return document.createElement("growctrl-checkup-editor")}static getStubConfig(){return{tent:"gross",show_tent_row:!0,stations:[{station:"main1"},{station:"main2"}]}}sEnt(e,t,n){let[i,s,r]=ut[n];return T(this.hass,e,t,r)??N(i,e,t,s)}tEnt(e,t){let[n,i,s]=q[t];return T(this.hass,e,"zelt",s)??j(n,e,i)}stationCells(e,t){let n=this.hass.states[this.sEnt(e,t,"lightRest")],i=n?.attributes?.zustand==="an",s=this.isOn(this.sEnt(e,t,"pFailsafe")),r=this.isOn(this.sEnt(e,t,"pPower"))||this.isOn(this.sEnt(e,t,"pTime")),c=s?"critical":r?"warning":n&&i?"ok":"off",d=s?"Licht-Failsafe ausgel\xF6st":this.isOn(this.sEnt(e,t,"pPower"))?"Licht AN ohne Leistung":this.isOn(this.sEnt(e,t,"pTime"))?"Lichtzeiten unvollst\xE4ndig":n?i?"Licht an":n.attributes?.aktiv===!1?"Licht ausgeschaltet":"Licht aus":"\u2014",o=this.isOn(this.sEnt(e,t,"pPump")),h=this.hass.states[this.sEnt(e,t,"pumpRest")],m=o?"critical":h?"ok":"off",x=o?"Pumpe gesperrt (F\xFCllstand)":h?h.attributes?.aktiv===!1?"Pumpe ausgeschaltet":h.attributes?.text??"Zyklus l\xE4uft":"\u2014",b=this.isOn(this.sEnt(e,t,"auto")),y=this.isOn(this.sEnt(e,t,"wartung")),v=y?"info":b?"ok":"warning",k=y?"Wartungsmodus aktiv":b?"Automatik AN":"Automatik AUS (manuell)",C=this.isOn(this.sEnt(e,t,"pOverride")),A=C?"warning":"ok",O=C?"Manueller Eingriff aktiv":"Kein Eingriff",f=this.hass.states[this.sEnt(e,t,"event")],z=f?.attributes?.schweregrad??"ok",W=z==="critical"?"critical":z==="warning"?"warning":"ok",ht=f?.state??"OK";return{licht:c,pumpe:m,auto:v,eingriff:A,status:W,lichtText:d,pumpeText:x,autoText:k,eingriffText:O,statusText:ht,ent:{licht:this.sEnt(e,t,"lightRest"),pumpe:this.sEnt(e,t,"pumpRest"),auto:this.sEnt(e,t,"auto"),eingriff:this.sEnt(e,t,"pOverride"),status:this.sEnt(e,t,"event")}}}tentCells(e){let t=this.isOn(this.tEnt(e,"enabled")),n=t?"ok":"warning",i=t?"Zelt aktiv":"Zelt deaktiviert",s=this.isOn(this.tEnt(e,"climate")),r=s?"ok":"off",c=s?"Klima-Automatik AN":"Klima-Automatik AUS",d=this.hass.states[this.tEnt(e,"vpd")],o=_(d?.state),h=d?.attributes?.sollwerte,m=o!==null&&h?o>=h.vpd_min&&o<=h.vpd_max?"ok":"warning":d?"ok":"off",x=o!==null?`VPD ${o.toFixed(2)} kPa${h?` (Soll ${h.vpd_min}\u2013${h.vpd_max})`:""}`:"\u2014",b=this.hass.states[this.tEnt(e,"status")],y=(b?.state??"").toLowerCase()==="problem",v=b?.attributes?.probleme??[],k=y?"warning":"ok",C=y?v[0]??"Problem erkannt":"Alles OK";return{aktiv:n,klima:r,vpd:m,status:k,aktivText:i,klimaText:c,vpdText:x,statusText:C,ent:{aktiv:this.tEnt(e,"enabled"),klima:this.tEnt(e,"climate"),vpd:this.tEnt(e,"vpd"),status:this.tEnt(e,"status")}}}dot(e){return l`<span class="dot ${e==="off"?"off":F(e)}"></span>`}mc(e,t,n){return l`<button class="gc mc" title=${t} @click=${()=>n&&this.moreInfo(n)}>${this.dot(e)}</button>`}render(){let e=this._config;if(!this.hass)return p;let t=(e.stations??[]).map(o=>({tent:o.tent??e.tent??"gross",station:o.station,name:o.name??o.station})),n=e.tent??t[0]?.tent??"gross",i=e.show_tent_row!==!1,s=[],r=t.map(o=>{let h=this.stationCells(o.tent,o.station);return s.push(h.status,h.pumpe,h.licht,h.auto,h.eingriff),{...o,...h}}),c=i?this.tentCells(n):null;c&&s.push(c.status,c.aktiv,c.vpd);let d=G(s);return l`<div class="card ${e.style?.glass?"glass":""}" data-level=${d} style=${S(e.style)}>
      <div class="hd">
        <div class="grow">
          <div class="ttl">${e.title??"Checkup"}</div>
          <div class="sub">${t.length} ${t.length===1?"Station":"Stationen"}${i?" \xB7 1 Zelt":""}</div>
        </div>
        <span class="pill ${F(d)}">${d==="ok"?"Alles OK":d==="warning"?"Warnung":d==="critical"?"Kritisch":"Info"}</span>
      </div>

      <div class="seclbl" style="margin-top:2px">Stationen</div>
      <div class="matrix m5">
        <span></span>
        <span class="mh">Licht</span><span class="mh">Pumpe</span><span class="mh">Auto</span><span class="mh">Eingriff</span><span class="mh">Status</span>
        ${r.map(o=>l`
          <div class="mn">${o.name}</div>
          ${this.mc(o.licht,o.lichtText,o.ent.licht)}
          ${this.mc(o.pumpe,o.pumpeText,o.ent.pumpe)}
          ${this.mc(o.auto,o.autoText,o.ent.auto)}
          ${this.mc(o.eingriff,o.eingriffText,o.ent.eingriff)}
          ${this.mc(o.status,o.statusText,o.ent.status)}`)}
      </div>

      ${c?l`
        <div class="seclbl">Zelt</div>
        <div class="matrix m4">
          <span></span>
          <span class="mh">Aktiv</span><span class="mh">Klima</span><span class="mh">VPD</span><span class="mh">Status</span>
          <div class="mn">${e.tent_name??`Zelt ${n}`}</div>
          ${this.mc(c.aktiv,c.aktivText,c.ent.aktiv)}
          ${this.mc(c.klima,c.klimaText,c.ent.klima)}
          ${this.mc(c.vpd,c.vpdText,c.ent.vpd)}
          ${this.mc(c.status,c.statusText,c.ent.status)}
        </div>`:p}
    </div>`}};customElements.define("growctrl-checkup-card",Zt);var on=[u.text("title","\u{1F3F7}\uFE0F Titel"),u.entity("entity","\u{1F4A7} F\xFCllstand-Sensor (%) (Pflicht)","sensor"),u.num("min","\u26A0\uFE0F Mindeststand (%)",0,100),u.num("volume_l","\u{1FAA3} Tankvolumen (Liter, optional)",0,2e3)],Gt=class extends w{render(){return l`${this.form(on)}${this.styleSection()}
      <div class="hint">Der <b>F\u00fcllstand-Sensor</b> liefert Prozent. Unter dem <b>Mindeststand</b> wird der
        Tank rot. Mit <b>Tankvolumen</b> zeigt die Karte zus\u00e4tzlich die ungef\u00e4hren Liter an.</div>`}};customElements.define("growctrl-tank-editor",Gt);var jt=class extends ${static{this.styles=E}validateConfig(e){if(!e.entity)throw new Error("growctrl-tank-card: 'entity' (Fuellstand-Sensor in %) ist Pflicht.")}static getConfigElement(){return document.createElement("growctrl-tank-editor")}static getStubConfig(){return{entity:"sensor.gc_slot1_level1",title:"Tank",min:30,volume_l:200}}render(){let e=this._config;if(!this.hass)return p;let t=!this.hass.states[e.entity],n=Math.min(100,Math.max(0,_(this.st(e.entity))??(t?49:0))),i=e.min!==void 0&&n<e.min,s=i?g.crit:g.water,r=e.volume_l?n/100*e.volume_l:null;return l`<div class="card ${e.style?.glass?"glass":""}" data-level=${i?"critical":"ok"} style=${S(e.style)}>
      <div class="hd">
        <div class="ttl grow">${e.title??"Tank"}</div>
        ${i?l`<span class="pill crit">Nachfüllen</span>`:p}
      </div>
      <div style="display:flex; gap:18px; align-items:center">
        <button class="gc tankv" @click=${()=>this.moreInfo(e.entity)}>
          ${e.min!==void 0?l`<span class="minl" style="bottom:${e.min}%"></span>`:p}
          <span class="fill" style="height:${n}%; background:linear-gradient(180deg, ${s}d9, ${s}80)"></span>
        </button>
        <button class="gc" style="flex:1; min-width:0; text-align:left" @click=${()=>this.moreInfo(e.entity)}>
          <span class="mlbl">Aktueller Füllstand</span>
          <div style="font:700 38px/1 var(--f-num); letter-spacing:-1.5px; color:${s}; margin-top:5px; font-variant-numeric:tabular-nums">
            ${Math.round(n)}<span style="font:600 14px var(--f-num); color:var(--tx-2); margin-left:2px">%</span></div>
          ${r!==null?l`<div style="margin-top:6px; font:700 12.5px var(--f-ui); color:var(--tx-2)">≈ ${r.toFixed(1)} l von ${e.volume_l} l</div>`:p}
          ${e.min!==void 0?l`<div style="font:700 10.5px var(--f-ui); color:var(--tx-3); margin-top:2px">Mindeststand ${e.min} %</div>`:p}
        </button>
      </div>
    </div>`}};customElements.define("growctrl-tank-card",jt);var ln=[u.text("title","\u{1F3F7}\uFE0F Titel"),u.num("hours","\u23F1\uFE0F Zeitraum (h)",1,168),u.num("height","\u{1F4CF} Diagrammh\xF6he (px)",80,300)],cn=[u.entity("entity","\u{1F4C8} Sensor","sensor"),u.text("name","\u270F\uFE0F Anzeigename (optional)"),u.text("color","\u{1F3A8} Farbe (optional, z.B. #FF9F5A)")],qt=class extends w{render(){return l`${this.form(ln)}
      ${this.list({key:"sensors",rowSchema:cn,title:"\u{1F4C9} Serien",addLabel:"Sensor hinzuf\xFCgen",newItem:()=>({entity:""})})}
      ${this.styleSection()}
      <div class="hint">Mehrere Serien werden in ein Diagramm gezeichnet (z.B. Temperatur + Luftfeuchte).
        <b>Farbe</b> als Hex-Wert; ohne Angabe automatisch.</div>`}};customElements.define("growctrl-history-editor",qt);var Pe=["#FFB98A","#7CC8F0","#7BE8A8","#C3ABF5"],Qt=class extends ${constructor(){super(...arguments);this._hist={}}static{this.styles=E}static{this.properties={...$.properties,_hist:{state:!0}}}validateConfig(t){if(!Array.isArray(t.sensors)||!t.sensors.length)throw new Error("growctrl-history-card: 'sensors' (min. 1 Eintrag) ist Pflicht.")}static getConfigElement(){return document.createElement("growctrl-history-editor")}static getStubConfig(){return{sensors:[{entity:"sensor.zelt_temperature"}],hours:24}}connectedCallback(){super.connectedCallback(),this._load(),this._timer=window.setInterval(()=>this._load(),5*6e4)}disconnectedCallback(){super.disconnectedCallback(),this._timer&&clearInterval(this._timer)}async _load(){if(!this.hass){setTimeout(()=>this._load(),1e3);return}let t=this._config,n={};for(let i of t.sensors)n[i.entity]=await L(this.hass,i.entity,t.hours??24);this._hist=n}render(){let t=this._config;if(!this.hass)return p;let n=t.sensors.map((i,s)=>({data:this._hist[i.entity]??[],color:i.color??Pe[s%Pe.length],name:i.name??this.friendly(i.entity),fill:t.sensors.length===1}));return l`<div class="card ${t.style?.glass?"glass":""}" style=${S(t.style)}>
      <div class="hd">
        <div class="ttl grow">${t.title??"Verlauf"}</div>
        <button class="gc icbtn" style="width:auto; padding:0 13px; font:800 11px var(--f-num)">${t.hours??24}h</button>
      </div>
      ${B(n,{w:this.chartW(),h:t.height??120,grid:3})}
      <div class="legend">
        ${t.sensors.map((i,s)=>l`<span><i style="background:${n[s].color}"></i>${i.name??this.friendly(i.entity)} · ${_(this.st(i.entity))??"--"} ${this.unit(i.entity)}</span>`)}
      </div>
    </div>`}};customElements.define("growctrl-history-card",Qt);var dn=[u.text("title","\u{1F3F7}\uFE0F Titel"),u.entity("entity","\u{1F4C8} Sensor (Pflicht)","sensor"),u.text("name","\u270F\uFE0F Anzeigename (optional)"),u.num("min","Sollbereich Min"),u.num("max","Sollbereich Max"),u.num("decimals","\u{1F522} Nachkommastellen",0,4),u.num("hours","\u23F1\uFE0F Chart-Zeitraum (h)",1,168),u.num("height","\u{1F4CF} Diagrammh\xF6he (px)",80,300)],Xt=class extends w{render(){return l`${this.form(dn)}${this.styleSection()}
      <div class="hint">Zeigt einen Messwert gro\u00df mit Sollbereich und Verlauf. Ideal f\u00fcr <b>EC</b> oder
        <b>pH</b>. Liegt der Wert au\u00dferhalb von Min/Max, f\u00e4rbt sich die Anzeige als Warnung.</div>`}};customElements.define("growctrl-metric-editor",Xt);var Yt=class extends ${constructor(){super(...arguments);this._hist=[]}static{this.styles=E}static{this.properties={...$.properties,_hist:{state:!0}}}validateConfig(t){if(!t.entity)throw new Error("growctrl-metric-card: 'entity' ist Pflicht.")}static getConfigElement(){return document.createElement("growctrl-metric-editor")}static getStubConfig(){return{entity:"sensor.gc_slot1_ec1",name:"EC",min:1.2,max:2.2}}connectedCallback(){super.connectedCallback(),this._load(),this._timer=window.setInterval(()=>this._load(),5*6e4)}disconnectedCallback(){super.disconnectedCallback(),this._timer&&clearInterval(this._timer)}async _load(){if(!this.hass){setTimeout(()=>this._load(),1e3);return}let t=this._config;this._hist=await L(this.hass,t.entity,t.hours??24)}render(){let t=this._config;if(!this.hass)return p;let n=_(this.st(t.entity))??(this.hass.states[t.entity]?null:1.84),i=n!==null&&t.min!==void 0&&n<t.min,s=n!==null&&t.max!==void 0&&n>t.max,r=i||s,c=n===null?"var(--tx-3)":r?g.crit:g.ok,d=t.decimals??2,o=t.min!==void 0||t.max!==void 0;return l`<div class="card ${t.style?.glass?"glass":""}" data-level=${r?"warning":"ok"} style=${S(t.style)}>
      <div class="hd">
        <div class="grow" style="min-width:0">
          <span class="mlbl">${t.name??this.friendly(t.entity)}</span>
          <button class="gc" style="display:block; margin-top:4px" @click=${()=>this.moreInfo(t.entity)}>
            <span style="font:700 34px/1 var(--f-num); letter-spacing:-1.5px; color:${c}; font-variant-numeric:tabular-nums">
              ${n!==null?n.toFixed(d):"--"}</span>
            <span style="font:600 14px var(--f-num); color:var(--tx-2); margin-left:2px">${this.unit(t.entity)}</span>
          </button>
        </div>
        ${o?l`<div style="text-align:right; flex-shrink:0">
          <span class="mlbl">Sollbereich</span>
          <div style="font:700 13px var(--f-num); color:${r?g.crit:"var(--acc)"}; margin-top:3px">${t.min??"\u2013"} – ${t.max??"\u2013"}</div>
          ${r?l`<div style="font:900 10px var(--f-ui); color:${g.crit}; margin-top:2px">${i?"\u25BC ZU NIEDRIG":"\u25B2 ZU HOCH"}</div>`:p}
        </div>`:p}
      </div>
      <div style="margin-top:6px">
        ${B([{data:this._hist,color:r?g.crit:g.ok,fill:!0}],{w:this.chartW(),h:t.height??104,band:{min:t.min,max:t.max},grid:3})}
      </div>
    </div>`}};customElements.define("growctrl-metric-card",Yt);var pn="3.3.2",un=[{type:"growctrl-tent-card",name:"GROWCTRL Tent",description:"Zelt-Hero: Klima-KPIs, VPD-Skala, Status-Ampel"},{type:"growctrl-station-card",name:"GROWCTRL Station",description:"Station: Licht-/Pumpenbalken, Stage, Auto, Konfiguration"},{type:"growctrl-controls-card",name:"GROWCTRL Controls",description:"Aktoren-Raster mit Gruppen und Bestaetigung"},{type:"growctrl-sensors-card",name:"GROWCTRL Sensors",description:"Sensor-KPIs mit Sollbereich-Ampel"},{type:"growctrl-status-card",name:"GROWCTRL Status",description:"Ereignisprotokoll der Integration mit Schweregrad-Ampel"},{type:"growctrl-hero-card",name:"GROWCTRL Hero",description:"Globale Steuerung, Klima-KPIs, VPD-Chart, Informationssystem"},{type:"growctrl-checkup-card",name:"GROWCTRL Checkup",description:"Checkup-Matrix: Licht/Pumpe/Klima/Status je Station"},{type:"growctrl-tank-card",name:"GROWCTRL Tank",description:"DWC-Fuellstand (vertikaler Tank) mit Warnstufe"},{type:"growctrl-history-card",name:"GROWCTRL History",description:"24h-Diagramm (z.B. Temperatur + Luftfeuchte)"},{type:"growctrl-metric-card",name:"GROWCTRL Metric",description:"EC/pH gross mit Chart und Sollbereich"}];window.customCards=window.customCards??[];window.__gcEpoch=xe();un.forEach(a=>window.customCards.push({...a,preview:!0,documentationURL:"https://github.com/MrDarkvoid/growctrl"}));console.info(`%c GROWCTRL Cards %c v${pn} `,"background:#1D9E75;color:#fff;font-weight:700","background:#0F6E56;color:#fff");
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
