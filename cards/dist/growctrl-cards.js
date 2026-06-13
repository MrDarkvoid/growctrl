var rt=globalThis,at=rt.ShadowRoot&&(rt.ShadyCSS===void 0||rt.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ht=Symbol(),Yt=new WeakMap,q=class{constructor(e,t,n){if(this._$cssResult$=!0,n!==ht)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(at&&e===void 0){let n=t!==void 0&&t.length===1;n&&(e=Yt.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),n&&Yt.set(t,e))}return e}toString(){return this.cssText}},Jt=a=>new q(typeof a=="string"?a:a+"",void 0,ht),X=(a,...e)=>{let t=a.length===1?a[0]:e.reduce((n,s,i)=>n+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+a[i+1],a[0]);return new q(t,a,ht)},te=(a,e)=>{if(at)a.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(let t of e){let n=document.createElement("style"),s=rt.litNonce;s!==void 0&&n.setAttribute("nonce",s),n.textContent=t.cssText,a.appendChild(n)}},gt=at?a=>a:a=>a instanceof CSSStyleSheet?(e=>{let t="";for(let n of e.cssRules)t+=n.cssText;return Jt(t)})(a):a;var{is:ze,defineProperty:Me,getOwnPropertyDescriptor:Fe,getOwnPropertyNames:Re,getOwnPropertySymbols:Oe,getPrototypeOf:Ie}=Object,ot=globalThis,ee=ot.trustedTypes,Ne=ee?ee.emptyScript:"",Be=ot.reactiveElementPolyfillSupport,Q=(a,e)=>a,mt={toAttribute(a,e){switch(e){case Boolean:a=a?Ne:null;break;case Object:case Array:a=a==null?a:JSON.stringify(a)}return a},fromAttribute(a,e){let t=a;switch(e){case Boolean:t=a!==null;break;case Number:t=a===null?null:Number(a);break;case Object:case Array:try{t=JSON.parse(a)}catch{t=null}}return t}},se=(a,e)=>!ze(a,e),ne={attribute:!0,type:String,converter:mt,reflect:!1,useDefault:!1,hasChanged:se};Symbol.metadata??=Symbol("metadata"),ot.litPropertyMetadata??=new WeakMap;var M=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=ne){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let n=Symbol(),s=this.getPropertyDescriptor(e,n,t);s!==void 0&&Me(this.prototype,e,s)}}static getPropertyDescriptor(e,t,n){let{get:s,set:i}=Fe(this.prototype,e)??{get(){return this[t]},set(r){this[t]=r}};return{get:s,set(r){let p=s?.call(this);i?.call(this,r),this.requestUpdate(e,p,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??ne}static _$Ei(){if(this.hasOwnProperty(Q("elementProperties")))return;let e=Ie(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(Q("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Q("properties"))){let t=this.properties,n=[...Re(t),...Oe(t)];for(let s of n)this.createProperty(s,t[s])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[n,s]of t)this.elementProperties.set(n,s)}this._$Eh=new Map;for(let[t,n]of this.elementProperties){let s=this._$Eu(t,n);s!==void 0&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let n=new Set(e.flat(1/0).reverse());for(let s of n)t.unshift(gt(s))}else e!==void 0&&t.push(gt(e));return t}static _$Eu(e,t){let n=t.attribute;return n===!1?void 0:typeof n=="string"?n:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let n of t.keys())this.hasOwnProperty(n)&&(e.set(n,this[n]),delete this[n]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return te(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,n){this._$AK(e,n)}_$ET(e,t){let n=this.constructor.elementProperties.get(e),s=this.constructor._$Eu(e,n);if(s!==void 0&&n.reflect===!0){let i=(n.converter?.toAttribute!==void 0?n.converter:mt).toAttribute(t,n.type);this._$Em=e,i==null?this.removeAttribute(s):this.setAttribute(s,i),this._$Em=null}}_$AK(e,t){let n=this.constructor,s=n._$Eh.get(e);if(s!==void 0&&this._$Em!==s){let i=n.getPropertyOptions(s),r=typeof i.converter=="function"?{fromAttribute:i.converter}:i.converter?.fromAttribute!==void 0?i.converter:mt;this._$Em=s;let p=r.fromAttribute(t,i.type);this[s]=p??this._$Ej?.get(s)??p,this._$Em=null}}requestUpdate(e,t,n,s=!1,i){if(e!==void 0){let r=this.constructor;if(s===!1&&(i=this[e]),n??=r.getPropertyOptions(e),!((n.hasChanged??se)(i,t)||n.useDefault&&n.reflect&&i===this._$Ej?.get(e)&&!this.hasAttribute(r._$Eu(e,n))))return;this.C(e,t,n)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:n,reflect:s,wrapped:i},r){n&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,r??t??this[e]),i!==!0||r!==void 0)||(this._$AL.has(e)||(this.hasUpdated||n||(t=void 0),this._$AL.set(e,t)),s===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[s,i]of this._$Ep)this[s]=i;this._$Ep=void 0}let n=this.constructor.elementProperties;if(n.size>0)for(let[s,i]of n){let{wrapped:r}=i,p=this[s];r!==!0||this._$AL.has(s)||p===void 0||this.C(s,void 0,i,p)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(n=>n.hostUpdate?.()),this.update(t)):this._$EM()}catch(n){throw e=!1,this._$EM(),n}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(e){}firstUpdated(e){}};M.elementStyles=[],M.shadowRootOptions={mode:"open"},M[Q("elementProperties")]=new Map,M[Q("finalized")]=new Map,Be?.({ReactiveElement:M}),(ot.reactiveElementVersions??=[]).push("2.1.2");var wt=globalThis,ie=a=>a,lt=wt.trustedTypes,re=lt?lt.createPolicy("lit-html",{createHTML:a=>a}):void 0,de="$lit$",R=`lit$${Math.random().toFixed(9).slice(2)}$`,ue="?"+R,De=`<${ue}>`,H=document,J=()=>H.createComment(""),tt=a=>a===null||typeof a!="object"&&typeof a!="function",_t=Array.isArray,He=a=>_t(a)||typeof a?.[Symbol.iterator]=="function",ft=`[ 	
\f\r]`,Y=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ae=/-->/g,oe=/>/g,B=RegExp(`>|${ft}(?:([^\\s"'>=/]+)(${ft}*=${ft}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),le=/'/g,ce=/"/g,he=/^(?:script|style|textarea|title)$/i,kt=a=>(e,...t)=>({_$litType$:a,strings:e,values:t}),o=kt(1),st=kt(2),bn=kt(3),U=Symbol.for("lit-noChange"),d=Symbol.for("lit-nothing"),pe=new WeakMap,D=H.createTreeWalker(H,129);function ge(a,e){if(!_t(a)||!a.hasOwnProperty("raw"))throw Error("invalid template strings array");return re!==void 0?re.createHTML(e):e}var Ue=(a,e)=>{let t=a.length-1,n=[],s,i=e===2?"<svg>":e===3?"<math>":"",r=Y;for(let p=0;p<t;p++){let c=a[p],l,g,m=-1,x=0;for(;x<c.length&&(r.lastIndex=x,g=r.exec(c),g!==null);)x=r.lastIndex,r===Y?g[1]==="!--"?r=ae:g[1]!==void 0?r=oe:g[2]!==void 0?(he.test(g[2])&&(s=RegExp("</"+g[2],"g")),r=B):g[3]!==void 0&&(r=B):r===B?g[0]===">"?(r=s??Y,m=-1):g[1]===void 0?m=-2:(m=r.lastIndex-g[2].length,l=g[1],r=g[3]===void 0?B:g[3]==='"'?ce:le):r===ce||r===le?r=B:r===ae||r===oe?r=Y:(r=B,s=void 0);let b=r===B&&a[p+1].startsWith("/>")?" ":"";i+=r===Y?c+De:m>=0?(n.push(l),c.slice(0,m)+de+c.slice(m)+R+b):c+R+(m===-2?p:b)}return[ge(a,i+(a[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),n]},et=class a{constructor({strings:e,_$litType$:t},n){let s;this.parts=[];let i=0,r=0,p=e.length-1,c=this.parts,[l,g]=Ue(e,t);if(this.el=a.createElement(l,n),D.currentNode=this.el.content,t===2||t===3){let m=this.el.content.firstChild;m.replaceWith(...m.childNodes)}for(;(s=D.nextNode())!==null&&c.length<p;){if(s.nodeType===1){if(s.hasAttributes())for(let m of s.getAttributeNames())if(m.endsWith(de)){let x=g[r++],b=s.getAttribute(m).split(R),y=/([.?@])?(.*)/.exec(x);c.push({type:1,index:i,name:y[2],strings:b,ctor:y[1]==="."?xt:y[1]==="?"?vt:y[1]==="@"?yt:G}),s.removeAttribute(m)}else m.startsWith(R)&&(c.push({type:6,index:i}),s.removeAttribute(m));if(he.test(s.tagName)){let m=s.textContent.split(R),x=m.length-1;if(x>0){s.textContent=lt?lt.emptyScript:"";for(let b=0;b<x;b++)s.append(m[b],J()),D.nextNode(),c.push({type:2,index:++i});s.append(m[x],J())}}}else if(s.nodeType===8)if(s.data===ue)c.push({type:2,index:i});else{let m=-1;for(;(m=s.data.indexOf(R,m+1))!==-1;)c.push({type:7,index:i}),m+=R.length-1}i++}}static createElement(e,t){let n=H.createElement("template");return n.innerHTML=e,n}};function W(a,e,t=a,n){if(e===U)return e;let s=n!==void 0?t._$Co?.[n]:t._$Cl,i=tt(e)?void 0:e._$litDirective$;return s?.constructor!==i&&(s?._$AO?.(!1),i===void 0?s=void 0:(s=new i(a),s._$AT(a,t,n)),n!==void 0?(t._$Co??=[])[n]=s:t._$Cl=s),s!==void 0&&(e=W(a,s._$AS(a,e.values),s,n)),e}var bt=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:n}=this._$AD,s=(e?.creationScope??H).importNode(t,!0);D.currentNode=s;let i=D.nextNode(),r=0,p=0,c=n[0];for(;c!==void 0;){if(r===c.index){let l;c.type===2?l=new nt(i,i.nextSibling,this,e):c.type===1?l=new c.ctor(i,c.name,c.strings,this,e):c.type===6&&(l=new $t(i,this,e)),this._$AV.push(l),c=n[++p]}r!==c?.index&&(i=D.nextNode(),r++)}return D.currentNode=H,s}p(e){let t=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(e,n,t),t+=n.strings.length-2):n._$AI(e[t])),t++}},nt=class a{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,n,s){this.type=2,this._$AH=d,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=n,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=W(this,e,t),tt(e)?e===d||e==null||e===""?(this._$AH!==d&&this._$AR(),this._$AH=d):e!==this._$AH&&e!==U&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):He(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==d&&tt(this._$AH)?this._$AA.nextSibling.data=e:this.T(H.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:n}=e,s=typeof n=="number"?this._$AC(e):(n.el===void 0&&(n.el=et.createElement(ge(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===s)this._$AH.p(t);else{let i=new bt(s,this),r=i.u(this.options);i.p(t),this.T(r),this._$AH=i}}_$AC(e){let t=pe.get(e.strings);return t===void 0&&pe.set(e.strings,t=new et(e)),t}k(e){_t(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,n,s=0;for(let i of e)s===t.length?t.push(n=new a(this.O(J()),this.O(J()),this,this.options)):n=t[s],n._$AI(i),s++;s<t.length&&(this._$AR(n&&n._$AB.nextSibling,s),t.length=s)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let n=ie(e).nextSibling;ie(e).remove(),e=n}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},G=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,n,s,i){this.type=1,this._$AH=d,this._$AN=void 0,this.element=e,this.name=t,this._$AM=s,this.options=i,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=d}_$AI(e,t=this,n,s){let i=this.strings,r=!1;if(i===void 0)e=W(this,e,t,0),r=!tt(e)||e!==this._$AH&&e!==U,r&&(this._$AH=e);else{let p=e,c,l;for(e=i[0],c=0;c<i.length-1;c++)l=W(this,p[n+c],t,c),l===U&&(l=this._$AH[c]),r||=!tt(l)||l!==this._$AH[c],l===d?e=d:e!==d&&(e+=(l??"")+i[c+1]),this._$AH[c]=l}r&&!s&&this.j(e)}j(e){e===d?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},xt=class extends G{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===d?void 0:e}},vt=class extends G{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==d)}},yt=class extends G{constructor(e,t,n,s,i){super(e,t,n,s,i),this.type=5}_$AI(e,t=this){if((e=W(this,e,t,0)??d)===U)return;let n=this._$AH,s=e===d&&n!==d||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,i=e!==d&&(n===d||s);s&&this.element.removeEventListener(this.name,this,n),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},$t=class{constructor(e,t,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){W(this,e)}};var Ve=wt.litHtmlPolyfillSupport;Ve?.(et,nt),(wt.litHtmlVersions??=[]).push("3.3.3");var me=(a,e,t)=>{let n=t?.renderBefore??e,s=n._$litPart$;if(s===void 0){let i=t?.renderBefore??null;n._$litPart$=s=new nt(e.insertBefore(J(),i),i,void 0,t??{})}return s._$AI(a),s};var St=globalThis,P=class extends M{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=me(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return U}};P._$litElement$=!0,P.finalized=!0,St.litElementHydrateSupport?.({LitElement:P});var We=St.litElementPolyfillSupport;We?.({LitElement:P});(St.litElementVersions??=[]).push("4.2.2");var Ge="4d72-4461726b-766f6964",be=()=>Ge,fe,ct=null;function pt(a){if(a?.states===fe&&ct)return ct;let e=new Map,t=new Set,n={};for(let[s,i]of Object.entries(a?.states??{})){let r=i?.attributes;if(!r?.growctrl_role||!r?.growctrl_tent)continue;let p=String(r.growctrl_tent),c=String(r.growctrl_station??"zelt");e.set(`${p}::${c}::${r.growctrl_role}`,s),c==="zelt"?t.add(p):(n[p]??=new Set).add(c)}return fe=a?.states,ct={tents:[...t].sort(),stations:Object.fromEntries(Object.entries(n).map(([s,i])=>[s,[...i].sort()])),byRole:e},ct}var T=(a,e,t,n)=>pt(a).byRole.get(`${e}::${t}::${n}`);var w=class extends P{constructor(){super(...arguments);this._config={};this._label=t=>t.label??t.name}static{this.properties={hass:{attribute:!1},_config:{state:!0}}}static{this.styles=X`
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
      @value-changed=${n=>this._fire({...this._config,...n.detail.value})}></ha-form>`}list(t){let n=this._config[t.key]??[],s=i=>this._fire({...this._config,[t.key]:i});return o`
      ${t.title?o`<div class="lt">${t.title}</div>`:d}
      ${n.map((i,r)=>{let p=c=>{let l=[...n];l[r]=c,s(l)};return o`<div class="row ${t.child?"col":""}">
          <div class="rowmain">
            <ha-form .hass=${this.hass} .data=${i} .schema=${t.rowSchema}
              .computeLabel=${this._label}
              @value-changed=${c=>p({...i,...c.detail.value})}></ha-form>
            <button class="del" title="Entfernen"
              @click=${()=>s(n.filter((c,l)=>l!==r))}>\u2715</button>
          </div>
          ${t.child?o`<div class="subwrap">${this._subList(i,t.child,p)}</div>`:d}
        </div>`})}
      <button class="add" @click=${()=>s([...n,t.newItem()])}>+ ${t.addLabel}</button>`}_subList(t,n,s){let i=(t[n.key]??[]).map(p=>typeof p=="string"?{entity:p}:p),r=p=>s({...t,[n.key]:p});return o`
      ${n.title?o`<div class="lt sub">${n.title}</div>`:d}
      ${i.map((p,c)=>o`<div class="row sub">
        <ha-form .hass=${this.hass} .data=${p} .schema=${n.rowSchema}
          .computeLabel=${this._label}
          @value-changed=${l=>{let g=[...i];g[c]={...p,...l.detail.value},r(g)}}></ha-form>
        <button class="del" title="Entfernen"
          @click=${()=>r(i.filter((l,g)=>g!==c))}>\u2715</button>
      </div>`)}
      <button class="add" @click=${()=>r([...i,n.newItem()])}>+ ${n.addLabel}</button>`}tentSelect(t="tent",n="Zelt"){let s=pt(this.hass).tents;return{name:t,label:n,selector:{select:{options:s,custom_value:!0,mode:"dropdown"}}}}stationSelect(t,n="station",s="Station"){let i=pt(this.hass),r=t?i.stations[t]??[]:[...new Set(Object.values(i.stations).flat())];return{name:n,label:s,selector:{select:{options:r,custom_value:!0,mode:"dropdown"}}}}styleSection(){let t=this._config.style??{},n=[u.text("background","Hintergrund (Farbe, 'a,b' = Gradient oder CSS)"),u.num("opacity","Deckkraft (0\u20131)",0,1,.05),u.bool("glass","Glas-Effekt (Blur)"),u.text("accent","Akzentfarbe"),u.num("radius","Eckenradius (px)",0,40)];return o`<div class="lt">Stil</div>
      <ha-form .hass=${this.hass} .data=${t} .schema=${n}
        .computeLabel=${s=>s.label??s.name}
        @value-changed=${s=>this._fire({...this._config,style:{...s.detail.value}})}></ha-form>`}},u={text:(a,e)=>({name:a,label:e,selector:{text:{}}}),bool:(a,e)=>({name:a,label:e,selector:{boolean:{}}}),num:(a,e,t,n,s)=>({name:a,label:e,selector:{number:{min:t,max:n,step:s,mode:"box"}}}),entity:(a,e,t)=>({name:a,label:e,selector:{entity:t?{domain:t}:{}}}),entities:(a,e,t)=>({name:a,label:e,selector:{entity:{multiple:!0,...t?{domain:t}:{}}}}),select:(a,e,t)=>({name:a,label:e,selector:{select:{mode:"dropdown",options:t}}})};var Ct=class extends w{render(){let e=[this.tentSelect(),u.text("name","Anzeigename (optional)"),u.bool("show_chart","VPD-Chart anzeigen"),u.num("hours","Chart-Zeitraum (h)",1,168)];return o`${this.form(e)}${this.styleSection()}`}};customElements.define("growctrl-tent-editor",Ct);function Et(a){if(a==null||isNaN(a))return"\u2013";let e=Math.max(0,Math.round(a)),t=Math.floor(e/60),n=e%60;return t&&n?`${t} h ${n} min`:t?`${t} h`:`${n} min`}function xe(a,e="auto"){let t=Math.floor(a/7)+1,n=a%7+1;return e==="tage"||e==="auto"&&a<7?`${a} Tage`:`Wo ${t} \xB7 Tag ${n}`}function S(a){if(a==null||a==="unknown"||a==="unavailable"||a==="")return null;let e=Number(a);return isNaN(e)?null:e}function ve(a){if(!a||a==="unknown"||a==="unavailable")return null;let e=new Date(a);return isNaN(e.getTime())?null:Math.max(0,Math.floor((Date.now()-e.getTime())/864e5))}var ye=new Map;async function z(a,e,t=24,n=48){let s=`${e}:${t}`,i=ye.get(s);if(i&&Date.now()-i.t<5*6e4)return i.data;try{let r=new Date(Date.now()-t*36e5).toISOString(),c=((await a.callApi("GET",`history/period/${r}?filter_entity_id=${e}&minimal_response&no_attributes`))?.[0]??[]).map(m=>parseFloat(m.state??m.s)).filter(m=>!isNaN(m)),l=Math.max(1,Math.floor(c.length/n)),g=c.filter((m,x)=>x%l===0);return ye.set(s,{t:Date.now(),data:g}),g}catch{return i?.data??[]}}var h={label:"rgba(242,247,243,0.56)",value:"rgba(242,247,243,0.97)",muted:"rgba(242,247,243,0.46)",logLabel:"rgba(242,247,243,0.72)",logText:"rgba(242,247,243,0.90)",ok:"#7BE8A8",warn:"#FFCE7A",crit:"#FF9D9D",info:"#9AC8FF",water:"#7CC8F0",light:"#FFDC8A",temp:"#FFB98A",heat:"#FFB35C",tileBg:"rgba(255,255,255,0.04)",rowBg:"rgba(255,255,255,0.035)"},Vn={critical:"rgba(255,157,157,.14)",warning:"rgba(255,206,122,.12)",info:"rgba(154,200,255,.10)",ok:h.rowBg,none:"rgba(255,255,255,.022)"},Wn={critical:h.crit,warning:h.warn,info:h.info,ok:h.logText,none:"rgba(242,247,243,.36)"},At={Seedling:{bg:"rgba(154,200,255,0.16)",color:"#9AC8FF"},Veg:{bg:"rgba(123,232,168,0.16)",color:"#7BE8A8"},Bloom:{bg:"rgba(255,185,138,0.18)",color:"#FFB98A"},Flush:{bg:"rgba(195,171,245,0.18)",color:"#C3ABF5"},Trocknung:{bg:"rgba(211,168,120,0.18)",color:"#D3A878"}},_=a=>{let e=[];if(a?.background){let t=a.background.trim(),n=t.includes(",")&&!/^(linear|radial|conic|rgb|hsl)/i.test(t)?`linear-gradient(160deg, ${t})`:t;e.push(`--gc-bg:${n}`)}return a?.opacity!==void 0&&e.push(`--gc-opacity:${a.opacity}`),a?.accent&&e.push(`--gc-accent:${a.accent}`),a?.radius!==void 0&&e.push(`--gc-radius:${a.radius}px`),e.join(";")},K=a=>a.includes("critical")?"critical":a.includes("warning")?"warning":a.includes("info")?"info":"ok",F=a=>({ok:"ok",info:"info",warning:"warn",critical:"crit",none:"none"})[a]??"ok",k=X`
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
  .kpi .u{font:600 12px var(--f-num); color:var(--tx-2); margin-left:2px}
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
  .ind .ival .u{font-size:11px; color:var(--tx-2)}
  .spark{display:block; width:100%; height:38px; margin-top:6px}

  /* setzbare Werte (number/input_number): −/＋-Stepper */
  .setrow{display:inline-flex; align-items:center; gap:9px; flex-shrink:0}
  .stepbtn{width:32px; height:32px; border-radius:10px; display:grid; place-items:center; cursor:pointer; color:var(--acc); background:var(--acc-soft); border:1px solid color-mix(in srgb, var(--acc) 35%, transparent)}
  .stepbtn:hover{background:color-mix(in srgb, var(--acc) 24%, transparent)}
  .setval{font:700 19px var(--f-num); font-variant-numeric:tabular-nums; min-width:58px; text-align:center}
  .setval .u{font-size:11px; color:var(--tx-2); margin-left:1px}

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

  @media (max-width: 480px){
    .card{padding:15px 14px}
    .kpis{grid-template-columns:repeat(3,minmax(0,1fr)); gap:6px}
    .kpi .v{font-size:21px}
    .settings-grid{grid-template-columns:repeat(2,minmax(0,1fr))}
    .matrix{grid-template-columns:1fr repeat(4,44px)}
    .lrow .who{width:84px}
  }
`,Gn={ok:{bg:"rgba(123,232,168,.14)",color:h.ok,label:"Alles OK"},info:{bg:"rgba(154,200,255,.14)",color:h.info,label:"Info"},warning:{bg:"rgba(255,206,122,.14)",color:h.warn,label:"Warnung"},critical:{bg:"rgba(255,157,157,.16)",color:h.crit,label:"Kritisch"},none:{bg:"rgba(133,153,140,.14)",color:"#85998C",label:"Inaktiv"}};var O=30,dt=4,$e=6,Tt=14,we=0;function _e(a){if(a.length<3)return`M${a.map(t=>t.join(",")).join(" L")}`;let e=`M${a[0][0]},${a[0][1]}`;for(let t=0;t<a.length-1;t++){let n=a[Math.max(0,t-1)],s=a[t],i=a[t+1],r=a[Math.min(a.length-1,t+2)],p=s[0]+(i[0]-n[0])/6,c=s[1]+(i[1]-n[1])/6,l=i[0]-(r[0]-s[0])/6,g=i[1]-(r[1]-s[1])/6;e+=` C${p.toFixed(1)},${c.toFixed(1)} ${l.toFixed(1)},${g.toFixed(1)} ${i[0]},${i[1]}`}return e}function I(a,e={}){let t=`gcg${we++}`,n=e.w??300,s=e.h??110,i=a.flatMap(b=>b.data);if(!i.length)return o`<div style="height:${s}px;display:flex;align-items:center;justify-content:center;
    font-size:11px;color:rgba(255,255,255,.5)">Keine Verlaufsdaten</div>`;let r=e.min??Math.min(...i,e.band?.min??1/0),p=e.max??Math.max(...i,e.band?.max??-1/0);p-r<.001&&(p+=1,r-=1);let c=(p-r)*.08;r-=c,p+=c;let l=(b,y)=>O+b/Math.max(1,y-1)*(n-O-dt),g=b=>$e+(1-(b-r)/(p-r))*(s-$e-Tt),m=e.grid??3,x=b=>Math.abs(b)>=100?b.toFixed(0):Math.abs(b)>=10?b.toFixed(1):b.toFixed(2);return o`<svg data-gce="4d724461726b766f6964" viewBox="0 0 ${n} ${s}" preserveAspectRatio="none" style="width:100%;height:${s}px;display:block">
    ${e.band&&(e.band.min!==void 0||e.band.max!==void 0)?st`
      <rect x="${O}" y="${g(e.band.max??p)}" width="${n-O-dt}"
        height="${Math.max(0,g(e.band.min??r)-g(e.band.max??p))}"
        fill="${e.band.color??"rgba(77,255,195,.08)"}" />`:d}
    ${Array.from({length:m+1},(b,y)=>{let v=r+(p-r)*y/m;return st`
        <line x1="${O}" y1="${g(v)}" x2="${n-dt}" y2="${g(v)}"
          stroke="rgba(255,255,255,.10)" stroke-width="1"/>
        <text x="${O-4}" y="${g(v)+3}" text-anchor="end"
          font-size="9.5" fill="rgba(255,255,255,.68)">${x(v)}</text>`})}
    ${a.map((b,y)=>{if(b.data.length<2)return d;let v=b.data.map((V,f)=>[Number(l(f,b.data.length).toFixed(1)),Number(g(V).toFixed(1))]),C=_e(v),A=v[v.length-1][0],E=v[v.length-1][1];return st`
        <defs>
          <linearGradient id="${t}-${y}" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="${b.color}" stop-opacity=".18"/>
            <stop offset="100%" stop-color="${b.color}" stop-opacity="0"/>
          </linearGradient>
        </defs>
        ${b.fill!==!1?st`<path
          d="${C} L${A},${s-Tt} L${O},${s-Tt} Z"
          fill="url(#${t}-${y})"/>`:d}
        <path d="${C}" fill="none" stroke="${b.color}" stroke-width="2.4"
          stroke-linejoin="round" stroke-linecap="round"/>
        <circle cx="${A}" cy="${E}" r="6" fill="${b.color}" opacity=".18"/>
        <circle cx="${A}" cy="${E}" r="3" fill="${b.color}"/>
        <circle cx="${A}" cy="${E}" r="1.3" fill="rgba(10,14,18,.9)"/>`})}
    <text x="${O}" y="${s-3}" font-size="9" fill="rgba(255,255,255,.5)">-24h</text>
    <text x="${n-dt}" y="${s-3}" text-anchor="end" font-size="9" fill="rgba(255,255,255,.5)">jetzt</text>
  </svg>`}function ke(a,e,t=280,n=38){if(a.length<2)return o`<div style="height:${n}px"></div>`;let s=`gcs${we++}`,i=Math.min(...a),r=Math.max(...a);r-i<.001&&(r+=1,i-=1);let p=b=>b/(a.length-1)*t,c=b=>3+(1-(b-i)/(r-i))*(n-8),l=a.map((b,y)=>[Number(p(y).toFixed(1)),Number(c(b).toFixed(1))]),g=_e(l),m=l[l.length-1][0],x=l[l.length-1][1];return o`<svg data-gce="4d724461726b766f6964" viewBox="0 0 ${t} ${n}" style="width:100%;height:${n}px;display:block">
    <defs><linearGradient id="${s}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${e}" stop-opacity=".22"/>
      <stop offset="100%" stop-color="${e}" stop-opacity="0"/>
    </linearGradient></defs>
    <path d="${g} L${m},${n} L0,${n} Z" fill="url(#${s})"/>
    <path d="${g}" fill="none" stroke="${e}" stroke-width="2"
      stroke-linejoin="round" stroke-linecap="round"/>
    <circle cx="${m}" cy="${x}" r="2.6" fill="${e}"/>
  </svg>`}var Lt=a=>a.toLowerCase().replace(/ä/g,"a").replace(/ö/g,"o").replace(/ü/g,"u").replace(/ß/g,"ss").replace(/[^a-z0-9]+/g,"_").replace(/^_+|_+$/g,""),N=(a,e,t,n,s)=>s?.[n]??`${a}.growctrl_${Lt(e)}_${Lt(t)}_${n}`,Z=(a,e,t,n)=>n?.[t]??`${a}.growctrl_zelt_${Lt(e)}_${t}`,ut={auto:["switch","automatik","auto"],wartung:["switch","wartung","maintenance"],stage:["select","wachstumsphase","stage"],lightOn:["time","licht_an","light_on"],lightOffSv:["time","licht_aus_seedling_veg","light_off_sv"],lightOffBloom:["time","licht_aus_bloom_flush","light_off_bloom"],lightRest:["sensor","licht_restzeit","light_rest"],pumpRest:["sensor","pumpe_restzeit","pump_rest"],age:["sensor","alter_seit_keimung","plant_age"],rec:["sensor","phasen_empfehlung","stage_recommendation"],event:["sensor","letztes_ereignis","last_event"],dli:["sensor","dli_heute","dli_today"],dliFc:["sensor","dli_prognose","dli_forecast"],germination:["date","keimstart","germination"],overrideMin:["number","manuelle_ubernahme","override_minutes"],pOverride:["binary_sensor","manueller_eingriff","problem_override"],pFailsafe:["binary_sensor","licht_failsafe","problem_light_failsafe"],pTime:["binary_sensor","lichtzeiten_unvollstandig","problem_time_invalid"],pPump:["binary_sensor","pumpe_gesperrt_fullstand","problem_pump_blocked"],pPower:["binary_sensor","licht_ohne_leistung","problem_power"]},j={enabled:["switch","zelt_aktiv","tent_enabled"],climate:["switch","klima_automatik","climate_enabled"],mode:["select","klima_modus","climate_mode"],phase:["select","klima_phase","climate_phase"],vpd:["sensor","vpd","vpd"],status:["sensor","status","status"],event:["sensor","letztes_ereignis","last_event"]};var $=class extends P{constructor(){super(...arguments);this._cw=0;this._config={};this._confirm=null}static{this.properties={hass:{attribute:!1},_config:{state:!0},_confirm:{state:!0},_cw:{state:!0}}}connectedCallback(){super.connectedCallback(),this._ro=new ResizeObserver(t=>{let n=Math.round(t[0]?.contentRect?.width??0);n&&Math.abs(n-this._cw)>8&&(this._cw=n)}),this._ro.observe(this)}disconnectedCallback(){this._ro?.disconnect(),super.disconnectedCallback()}chartW(t=34){return Math.max(280,(this._cw||320)-t)}setConfig(t){this.validateConfig(t),this._config=t}validateConfig(t){}getCardSize(){return 4}st(t){return t?this.hass?.states[t]?.state:void 0}isOn(t){return this.st(t)==="on"}friendly(t){return t&&this.hass?.states[t]?.attributes?.friendly_name||t||""}unit(t){return t&&this.hass?.states[t]?.attributes?.unit_of_measurement||""}moreInfo(t){this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:t},bubbles:!0,composed:!0}))}navigate(t){history.pushState(null,"",t),window.dispatchEvent(new CustomEvent("location-changed"))}toggle(t){let n=t.split(".")[0],s=["switch","input_boolean","light","fan"].includes(n)?n:"homeassistant";this.hass.callService(s,"toggle",{entity_id:t})}confirmToggle(t,n){this._confirm={text:`${n} wirklich schalten?`,action:()=>this.toggle(t)}}renderConfirm(){return this._confirm?o`<div style="position:absolute;inset:0;background:rgba(0,0,0,.6);border-radius:16px;
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
    </div>`:d}};var Ke=["VPD","RH"],Ze=["Auto","Seedling","Veg","Bloom","Trocknung"],Se={Auto:"",Seedling:"pd-seed",Veg:"pd-veg",Bloom:"pd-bloom",Trocknung:"pd-dry"},Ce={Auto:"automatisch",Seedling:"Anzucht",Veg:"Wachstum",Bloom:"Bl\xFCte",Trocknung:"Ernte"},Ee=[{w:20,col:"#6E97DE",lbl:"zu feucht"},{w:20,col:"#58E0A5",lbl:"Seedling"},{w:20,col:"#2FB36C",lbl:"Veg"},{w:20,col:"#E5B567",lbl:"Bloom"},{w:20,col:"#D4726F",lbl:"zu trocken"}],Pt=2,zt=class extends ${constructor(){super(...arguments);this._hist=[];this._phase=!1}static{this.styles=k}static{this.properties={...$.properties,_hist:{state:!0},_phase:{state:!0}}}validateConfig(t){if(!t.tent)throw new Error("growctrl-tent-card: 'tent' ist Pflicht (Zelt-Name aus der Integration).")}static getConfigElement(){return document.createElement("growctrl-tent-editor")}static getStubConfig(){return{tent:"gross"}}e(t){let[n,s,i]=j[t],r=this._config;return r.overrides?.[s]??T(this.hass,r.tent,"zelt",i)??Z(n,r.tent,s,r.overrides)}_select(t,n){this.hass.callService("select","select_option",{entity_id:t,option:n})}connectedCallback(){super.connectedCallback(),this._load(),this._timer=window.setInterval(()=>this._load(),5*6e4)}disconnectedCallback(){super.disconnectedCallback(),this._timer&&clearInterval(this._timer)}async _load(){if(!this.hass){setTimeout(()=>this._load(),1e3);return}this._hist=await z(this.hass,this.e("vpd"),this._config.hours??24)}tglBtn(t,n,s){return o`<button class="gc tgl ${s?"on":""}" style="flex:1; justify-content:center" @click=${()=>this.confirmToggle(t,n)}>
      <span class="sw"></span> ${n}</button>`}chips(t,n,s){return o`<div style="display:flex; gap:6px; flex-wrap:wrap">
      ${n.map(i=>{let r=i===s;return o`<button class="gc" style="padding:7px 13px; border-radius:999px; font:800 11.5px var(--f-ui);
            border:1.5px solid ${r?"color-mix(in srgb, var(--acc) 50%, transparent)":"var(--line)"};
            background:${r?"var(--acc-soft)":"transparent"}; color:${r?"var(--acc)":"var(--tx-2)"}"
          @click=${()=>this._select(t,i)}>${i}</button>`})}
    </div>`}phaseDropdown(t,n){return o`<div class="dd ${this._phase?"open":""}">
      <button class="gc dd-btn" aria-haspopup="listbox" aria-expanded=${this._phase} @click=${()=>{this._phase=!this._phase}}>
        <span class="pdot ${Se[n]}" style="${n==="Auto"?"background:var(--acc);color:var(--acc)":""}"></span>${n}
        <span class="hint">${Ce[n]??""}</span>
        <ha-icon icon="mdi:chevron-down" style="--mdc-icon-size:16px;color:var(--tx-3);transition:transform .2s;${this._phase?"transform:rotate(180deg)":""}"></ha-icon>
      </button>
      ${this._phase?o`<div class="dd-menu" role="listbox">
        ${Ze.map(s=>o`<button class="gc dd-it" role="option" aria-selected=${s===n}
          @click=${()=>{this._select(t,s),this._phase=!1}}>
          <span class="pdot ${Se[s]}" style="${s==="Auto"?"background:var(--acc)":""}"></span>${s}<span class="hint">${Ce[s]??""}</span></button>`)}
      </div>`:d}
    </div>`}render(){let t=this._config;if(!this.hass)return d;let n=this.hass.states[this.e("vpd")],s=!n&&!this.hass.states[this.e("enabled")],i=S(n?.state)??(s?1.06:null),r=n?.attributes?.temp,p=n?.attributes?.rh,c=n?.attributes?.phase_effektiv??"Veg",l=n?.attributes?.sollwerte,g=this.isOn(this.e("enabled"))||s,m=this.isOn(this.e("climate")),x=this.hass.states[this.e("status")],b=x?.attributes?.probleme??[],y=x?.state?.toLowerCase?.()==="problem"?"warning":g?"ok":"none",v=this.hass.states[this.e("event")],C=i!==null&&l&&i>=l.vpd_min&&i<=l.vpd_max,A=i!==null?Math.min(100,Math.max(0,i/Pt*100)):null;return o`<div class="card ${t.style?.glass?"glass":""}" data-level=${y==="none"?"ok":y} style="${_(t.style)};position:relative">
      <div class="hd">
        <div class="grow" style="min-width:0">
          <div class="ttl">${t.name??`Klima Zelt ${t.tent}`}</div>
          <div class="sub">Phase ${c}${l?` \xB7 Soll ${l.vpd_min}\u2013${l.vpd_max} kPa / ${l.rh_min}\u2013${l.rh_max} %`:""}</div>
        </div>
        <span class="pill ${g?F(y):"none"}">${g?y==="ok"?"Alles OK":y==="warning"?"Warnung":"Info":"Deaktiviert"}</span>
      </div>

      <div style="display:flex; gap:8px; margin-bottom:16px">
        ${this.tglBtn(this.e("enabled"),"Zelt",g)}
        ${this.tglBtn(this.e("climate"),"Klima",m)}
      </div>

      <div class="kpis">
        <button class="gc kpi c-temp" @click=${()=>this.moreInfo(this.e("vpd"))}><span class="mlbl">Temperatur</span><span class="v">${r!=null?Number(r).toFixed(1):"\u2013"}<span class="u">°C</span></span></button>
        <button class="gc kpi c-hum" @click=${()=>this.moreInfo(this.e("vpd"))}><span class="mlbl">Luftfeuchte</span><span class="v">${p!=null?Math.round(Number(p)):"\u2013"}<span class="u">%</span></span></button>
        <button class="gc kpi c-vpd" @click=${()=>this.moreInfo(this.e("vpd"))}><span class="mlbl">VPD</span><span class="v" style="${i!==null&&!C?`color:${h.warn}`:""}">${i!==null?i.toFixed(2):"\u2013"}<span class="u">kPa</span></span></button>
      </div>

      <div style="margin-top:16px">
        <div class="zones">
          ${Ee.map(E=>o`<i style="width:${E.w}%;background:${E.col}"></i>`)}
          ${l?o`<span class="zband" style="left:${l.vpd_min/Pt*100}%;width:${(l.vpd_max-l.vpd_min)/Pt*100}%"></span>`:d}
          ${A!==null?o`<span class="zmark" style="left:${A}%"></span>`:d}
        </div>
        <div class="zlbl">${Ee.map(E=>o`<span style="width:${E.w}%">${E.lbl}</span>`)}</div>
      </div>

      <div style="display:flex; gap:12px; flex-wrap:wrap; margin-top:14px; align-items:center">
        <span class="mlbl">Modus</span>${this.chips(this.e("mode"),Ke,this.st(this.e("mode"))??"VPD")}
      </div>
      <div style="margin-top:13px">
        <span class="mlbl" style="display:block; margin-bottom:8px">Phase</span>
        ${this.phaseDropdown(this.e("phase"),this.st(this.e("phase"))??"Auto")}
      </div>

      ${t.show_chart!==!1&&this._hist.length>1?o`
        <div class="seclbl">VPD · ${t.hours??24}h</div>
        ${I([{data:this._hist,color:C===!1?h.warn:h.ok,fill:!0}],{w:this.chartW(),h:96,band:l?{min:l.vpd_min,max:l.vpd_max}:void 0,grid:3})}`:d}

      ${b.length?o`<div style="display:flex; flex-wrap:wrap; gap:7px; margin-top:12px">
        ${b.map(E=>o`<span class="pbadge warn"><ha-icon icon="mdi:alert" style="--mdc-icon-size:12px"></ha-icon>${E}</span>`)}</div>`:d}

      ${v?o`<button class="gc event" style="margin-top:14px" @click=${()=>this.moreInfo(this.e("event"))}>
        <span class="edot" style="background:${v.attributes?.schweregrad==="critical"?h.crit:v.attributes?.schweregrad==="warning"?h.warn:h.info}"></span>
        <span class="etx">${v.state}</span>
        <span class="etm">${v.last_changed?new Date(v.last_changed).toLocaleTimeString("de-DE",{hour:"2-digit",minute:"2-digit"}):""}</span>
      </button>`:d}
      ${this.renderConfirm()}
    </div>`}};customElements.define("growctrl-tent-card",zt);var Mt=class extends w{render(){let e=[this.tentSelect(),this.stationSelect(this._config?.tent),u.text("name","Anzeigename (optional)"),u.bool("show_settings","Einstellungen-Zahnrad anzeigen"),u.bool("show_event","Ereignisfeld am Kartenfuss (Standard an)"),u.entity("tank_entity","Stations-Tank F\xFCllstand % (optional)","sensor"),u.num("tank_min","Tank-Mindeststand %",0,100),u.num("tank_volume","Tank-Volumen in Litern (optional)",1,1e4)],t=[u.entity("entity","Schalter",["switch","input_boolean","light","fan"]),u.text("name","Name (optional)"),u.select("kind","Art (Farbe/Icon)",[{value:"light",label:"Licht"},{value:"pump",label:"Pumpe"},{value:"o2",label:"O\u2082"},{value:"fan",label:"L\xFCfter"},{value:"heat",label:"Heizmatte"},{value:"water",label:"Befeuchter"}]),u.bool("confirm","Vor dem Schalten best\xE4tigen")],n=[u.text("name","Name"),u.text("strain","Sorte (optional)"),u.entity("germination_helper","Keimstart-Datum (date, optional)","date"),u.text("image","Bild-URL (optional)"),u.entity("temp_entity","\u{1F321}\uFE0F Temperatur (Sensor / input_number)"),u.entity("humidity_entity","\u{1F4A7} Feuchtigkeit (Sensor / input_number)"),u.entity("ph_entity","\u2697\uFE0F pH (Sensor / input_number)"),u.entity("ec_entity","\u26A1 EC (Sensor / input_number)"),u.entity("tank_entity","Tank-F\xFCllstand % (optional)","sensor"),u.num("tank_min","Tank-Mindeststand % (Standard 30)",0,100)],s={key:"sensors",title:"\u2795 Weitere Sensoren (als Felder, jeder mit Namen)",rowSchema:[u.entity("entity","Sensor / input_number"),u.text("name","Anzeigename (optional)")],addLabel:"Sensor hinzuf\xFCgen",newItem:()=>({entity:""})};return o`${this.form(e)}
      ${this.list({key:"actuators",rowSchema:t,title:"Aktoren (Kacheln, 4 nebeneinander)",addLabel:"Aktor hinzuf\xFCgen",newItem:()=>({entity:""})})}
      ${this.list({key:"plants",rowSchema:n,title:"Pflanzen (Tabs in der Karte)",child:s,addLabel:"Pflanze hinzuf\xFCgen",newItem:()=>({name:""})})}
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
      </div>`}};customElements.define("growctrl-station-editor",Mt);var je=["Seedling","Veg","Bloom","Flush","Trocknung"],Ae={Seedling:"Anzucht",Veg:"Wachstum",Bloom:"Bl\xFCte",Flush:"Sp\xFClen",Trocknung:"Ernte"},qe={Seedling:"pd-seed",Veg:"pd-veg",Bloom:"pd-bloom",Flush:"pd-flush",Trocknung:"pd-dry"},Xe={light:"mdi:lightbulb",heat:"mdi:radiator",water:"mdi:air-humidifier",pump:"mdi:water-pump",fan:"mdi:fan",o2:"mdi:scuba-tank"},Ft=class extends ${constructor(){super(...arguments);this._open=!1;this._tab=0;this._phase=!1;this._spark={}}static{this.styles=k}static{this.properties={...$.properties,_open:{state:!0},_tab:{state:!0},_spark:{state:!0},_phase:{state:!0}}}updated(t){if(super.updated?.(t),!t.has("hass")&&!t.has("_config"))return;(this._config?.plants??[]).flatMap(i=>this.sensorsFor(i).filter(r=>r.anzeige==="graph")).forEach(async i=>{let r=await z(this.hass,i.entity,i.hours??24);r.length&&this._spark[i.entity]?.length!==r.length&&(this._spark={...this._spark,[i.entity]:r})})}validateConfig(t){if(!t.tent||!t.station)throw new Error("growctrl-station-card: 'tent' und 'station' sind Pflicht (wie in der Integration angelegt).")}static getConfigElement(){return document.createElement("growctrl-station-editor")}static getStubConfig(){return{tent:"gross",station:"main1"}}get isPreview(){return!this.hass?.states?.[this.e("stage")]}e(t){let[n,s,i]=ut[t],r=this._config;return r.overrides?.[s]??T(this.hass,r.tent,r.station,i)??N(n,r.tent,r.station,s,r.overrides)}_select(t,n){this.hass.callService("select","select_option",{entity_id:t,option:n})}render(){let t=this._config;if(!this.hass)return d;let n=this.isPreview,s=this.st(this.e("stage"))??"Veg",i=At[s]??At.Veg,r=this.isOn(this.e("auto"))||n,p=this.isOn(this.e("wartung")),c=[{e:this.e("pOverride"),label:"Manueller Eingriff",crit:!1},{e:this.e("pFailsafe"),label:"Licht-Failsafe",crit:!0},{e:this.e("pTime"),label:"Zeiten unvollst\xE4ndig",crit:!1},{e:this.e("pPump"),label:"Pumpe gesperrt (F\xFCllstand)",crit:!1},{e:this.e("pPower"),label:"Licht ohne Leistung",crit:!0}].filter(x=>this.isOn(x.e)),l=this.hass.states[this.e("event")],g=c.length?c.some(x=>x.crit)?"critical":"warning":l?.attributes?.schweregrad==="critical"?"warning":"ok",m=p?"Wartung aktiv":g==="critical"?"Kritisch":g==="warning"?"Warnung":"Alles OK";return o`<div class="card ${t.style?.glass?"glass":""}" data-level=${g} style="${_(t.style)};position:relative">

      <div class="hd">
        <div class="grow" style="min-width:0">
          <div class="ttl">${t.name??`${t.tent} \xB7 ${t.station}`}</div>
          <div class="sub" style="display:flex;align-items:center;gap:7px">
            <span style="width:7px;height:7px;border-radius:50%;flex-shrink:0;
              background:${g==="critical"?h.crit:g==="warning"?h.warn:h.ok};
              box-shadow:0 0 8px currentColor;color:${g==="critical"?h.crit:g==="warning"?h.warn:h.ok}"></span>
            ${m}
          </div>
        </div>
        <button class="gc icbtn ${p?"on":""}" title="Wartung (System greift nicht ein)"
          @click=${()=>this.toggle(this.e("wartung"))}>
          <ha-icon icon="mdi:wrench-outline" style="--mdc-icon-size:16px"></ha-icon></button>
        ${t.show_settings!==!1?o`<button class="gc icbtn" title="Einstellungen" @click=${()=>{this._open=!this._open}}>
          <ha-icon icon="mdi:tune-variant" style="--mdc-icon-size:16px"></ha-icon></button>`:d}
        <button class="gc chip-auto ${r?"":"off"}" @click=${()=>this.confirmToggle(this.e("auto"),"Automatik")}>
          AUTO ${r?"AN":"AUS"}</button>
      </div>

      <div style="margin-bottom:10px">${this.phaseDropdown(s,i)}</div>
      ${this.lightRow()}
      ${this.pumpRow(n)}
      ${this.dliRow(n)}
      ${this.actuators()}
      ${this.tankRow()}
      ${this.plantTabs()}

      ${c.length?o`<div style="display:flex;gap:7px;flex-wrap:wrap;margin-top:12px">
        ${c.map(x=>o`<span class="pbadge ${x.crit?"crit":"warn"}">
          <ha-icon icon="mdi:alert" style="--mdc-icon-size:12px"></ha-icon>${x.label}</span>`)}</div>`:d}

      ${t.show_event!==!1&&l?o`
        <button class="gc event" style="margin-top:14px" @click=${()=>this.moreInfo(this.e("event"))}>
          <span class="edot" style="background:${l.attributes?.schweregrad==="critical"?h.crit:l.attributes?.schweregrad==="warning"?h.warn:h.info}"></span>
          <span class="etx">${l.state}</span>
          <span class="etm">${l.last_changed?new Date(l.last_changed).toLocaleTimeString("de-DE",{hour:"2-digit",minute:"2-digit"}):""}</span>
        </button>`:d}

      ${this._open?o`<div class="settings-grid" style="margin-top:12px">
        ${this.setting(this.e("lightOn"),"Licht AN")}
        ${this.setting(this.e("lightOffSv"),"AUS Seed/Veg")}
        ${this.setting(this.e("lightOffBloom"),"AUS Bloom")}
        ${this.setting(this.e("germination"),"Keimstart")}
        ${this.setting(this.e("overrideMin"),"Man. \xDCbernahme")}
      </div>`:d}
      ${this.renderConfirm()}
    </div>`}setting(t,n){return o`<button class="gc skv" @click=${()=>this.moreInfo(t)}>
      <div class="k">${n}</div><div class="vv">${this.st(t)??"\u2013"}</div></button>`}phaseDropdown(t,n){let s=this.hass.states[this.e("rec")],i=s?.state&&s.state!==t?s.state:null;return o`<div class="dd ${this._phase?"open":""}">
      <button class="gc dd-btn" aria-haspopup="listbox" aria-expanded=${this._phase} @click=${()=>{this._phase=!this._phase}}>
        <span class="pdot" style="background:${n.color};color:${n.color}"></span>${t}
        <span class="hint">${Ae[t]??""}${i?" \xB7 Richtwert "+i:""}</span>
        <ha-icon icon="mdi:chevron-down" style="--mdc-icon-size:16px;color:var(--tx-3);transition:transform .2s;${this._phase?"transform:rotate(180deg)":""}"></ha-icon>
      </button>
      ${this._phase?o`<div class="dd-menu" role="listbox">
        ${je.map(r=>o`<button class="gc dd-it" role="option" aria-selected=${r===t}
          @click=${()=>{this._select(this.e("stage"),r),this._phase=!1}}>
          <span class="pdot ${qe[r]}"></span>${r}<span class="hint">${Ae[r]??""}</span></button>`)}
      </div>`:d}
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
          ${t.minPct!==void 0?o`<span class="min" style="left:${t.minPct}%"></span>`:d}</span>`:d}
      ${t.footL||t.footR?o`<span class="sft"><span>${t.footL??""}</span><span>${t.footR??""}</span></span>`:d}
    </button>`}lightRow(){if(this.isPreview)return this.supplyRow({icon:"mdi:lightbulb-on",iconColor:h.light,glow:!0,title:"Licht an",value:"5 h 40 min",valueColor:h.light,fillPct:62,fillColor:h.light,footL:"Leuchtphase",footR:"62 % verbleibend"});let t=this.hass.states[this.e("lightRest")];if(!t)return d;let n=t.attributes??{},s=n.zustand?n.zustand==="an":void 0,i=Number(t.state),r=isNaN(i)?"\u2013":Et(i),p=typeof n.anteil=="number"?Math.min(1,Math.max(0,n.anteil)):null,c=s===!1?"#7E9488":h.light;return this.supplyRow({icon:s===!1?"mdi:lightbulb-outline":"mdi:lightbulb-on",iconColor:c,glow:s!==!1,title:s===!1?"Licht aus":"Licht an",value:s===!1?"\u2013":r,valueColor:c,fillPct:s===!1?null:p!==null?p*100:null,fillColor:c,footL:s===!1?"Licht ausgeschaltet":"Leuchtphase",footR:s===!1?"":p!==null?`${(p*100).toFixed(0)} % verbleibend`:"",onClick:()=>this.moreInfo(this.e("lightRest"))})}pumpRow(t){let n=this.hass.states[this.e("pumpRest")];if(!n&&!t)return d;if(t)return this.supplyRow({icon:"mdi:water-pump",iconColor:h.water,topMargin:!0,title:"Pumpe aus",value:"in 12 min",valueColor:h.water,fillPct:80,fillColor:h.water,footL:"N\xE4chster Zyklus",footR:"80 % der Pause"});let s=Number(n.state),i=n.attributes??{},r=typeof i.anteil=="number"?Math.min(1,Math.max(0,i.anteil)):null,p=i.zustand?i.zustand==="an":void 0;return this.supplyRow({icon:"mdi:water-pump",iconColor:h.water,topMargin:!0,title:p?"Pumpe l\xE4uft":"Pumpe aus",value:isNaN(s)?"\u2013":Et(s),valueColor:h.water,fillPct:r!==null?r*100:null,fillColor:h.water,footL:i.text??"Zyklus",footR:r!==null?`${(r*100).toFixed(0)} %`:"",onClick:()=>this.moreInfo(this.e("pumpRest"))})}dliRow(t){let n=this.hass.states[this.e("dli")];if(!n&&!t)return d;let s=S(this.st(this.e("dli")))??(t?18.4:null),i=S(this.st(this.e("dliFc")))??(t?24.7:null),r=n?.attributes?.ziel_aktuelle_phase??(t?25:void 0),p=r&&s!==null?s/r*100:null,c=r&&i!==null?Math.min(100,i/r*100):void 0;return this.supplyRow({icon:"mdi:white-balance-sunny",iconColor:h.light,topMargin:!0,title:"DLI heute",value:s!==null?`${s.toFixed(1)}${r?` / ${r}`:""}`:"\u2013",valueColor:h.light,fillPct:p,fillColor:h.light,minPct:c,footL:i!==null?`Prognose ${i.toFixed(1)} mol/m\xB2`:"",footR:r?"Marker = Prognose":"",onClick:()=>this.moreInfo(this.e("dli"))})}actuators(){let t=this._config.actuators??[];return t.length?o`
      <div class="seclbl">Aktoren</div>
      <div class="acts">
        ${t.map(n=>{let s=this.isOn(n.entity),i=n.kind??"",r=n.icon??Xe[i]??"mdi:power",p=n.name??this.friendly(n.entity);return o`<button class="gc act ${s?"on":""} ${s&&i?i:""}"
            @click=${()=>n.confirm?this.confirmToggle(n.entity,p):this.toggle(n.entity)}>
            <ha-icon class="aic" icon="${r}" style="--mdc-icon-size:18px"></ha-icon>
            <span class="anm">${p}</span>
            <span class="ast">${s?"AN":"AUS"}</span></button>`})}
      </div>`:d}tankRow(){let t=this._config;if(!t.tank_entity)return d;let n=Math.min(100,Math.max(0,S(this.st(t.tank_entity))??0)),s=t.tank_min??30,i=n<s,r=i?h.crit:h.water,p=t.tank_volume;return this.supplyRow({icon:"mdi:car-coolant-level",iconColor:h.water,topMargin:!0,title:"Tank",value:`${n.toFixed(0)} %`,valueColor:r,fillPct:n,fillColor:r,minPct:s,footL:p?`\u2248 ${(n/100*p).toFixed(0)} l von ${p} l`:i?"Unter Mindeststand":"",footR:`Min ${s} %`,onClick:()=>this.moreInfo(t.tank_entity)})}plantTabs(){let t=this._config.plants??[];if(!t.length)return d;let n=Math.min(this._tab,t.length-1),s=t[n],i=s.germination_helper?this.st(s.germination_helper):null,r=i?ve(i):null;return o`
      <div class="ptabs" style="margin-top:14px">
        ${t.map((p,c)=>o`<button class="gc ptab" role="tab" aria-selected=${c===n} @click=${()=>{this._tab=c}}>
          <ha-icon icon="mdi:sprout" style="--mdc-icon-size:15px"></ha-icon>${p.name}</button>`)}
      </div>
      <div class="plant">
        <div class="phd">
          ${s.image?o`<img class="pimg" src="${s.image}"/>`:o`<div class="pimg"><ha-icon icon="mdi:sprout" style="--mdc-icon-size:28px"></ha-icon></div>`}
          <div style="flex:1;min-width:0">
            <div class="pname">${s.name}${s.strain?o`<span class="pstrain" style="display:inline;margin:0 0 0 7px">\u00b7 ${s.strain}</span>`:d}</div>
            ${r!==null?o`<span class="agechip">${xe(r)}</span>`:d}
          </div>
        </div>
        ${this.plantSensors(this.sensorsFor(s))}
        ${s.tank_entity?this.plantTankInd(s.tank_entity,s.tank_min??30):d}
      </div>`}sensorsFor(t){let n=[];t.temp_entity&&n.push({entity:t.temp_entity,name:"Temperatur",anzeige:"graph",color:h.temp,icon:"mdi:thermometer",hours:24}),t.humidity_entity&&n.push({entity:t.humidity_entity,name:"Feuchtigkeit",anzeige:"graph",color:h.water,icon:"mdi:water-percent",hours:24}),t.ph_entity&&n.push({entity:t.ph_entity,name:"pH",anzeige:"zone",min:4,max:8,ok:t.ph_ok??[5.5,6.5],ideal:t.ph_ideal??[5.8,6.3]}),t.ec_entity&&n.push({entity:t.ec_entity,name:"EC",anzeige:"zone",min:0,max:3,ok:t.ec_ok??[1,2.4],ideal:t.ec_ideal??[1.2,2.2]});let s=(t.sensors??[]).map(i=>typeof i=="string"?{entity:i}:i);return[...n,...s]}plantSensors(t){return t.length?o`${t.map(n=>this.sensorInd(n))}`:d}zoneV6(t,n,s,i,r,p){let c=s-n||1,l=(x,b)=>Math.max(0,(Math.min(b,s)-Math.max(x,n))/c*100),g=[{cls:"z-bad",w:l(n,i[0])},{cls:"z-low",w:l(i[0],r[0])},{cls:"z-ok",w:l(r[0],r[1])},{cls:"z-high",w:l(r[1],i[1])},{cls:"z-bad",w:l(i[1],s)}],m=t!==null?Math.min(100,Math.max(0,(t-n)/c*100)):null;return o`
      <span class="zones">
        ${g.map(x=>o`<i class="${x.cls}" style="width:${x.w}%"></i>`)}
        ${m!==null?o`<span class="zmark" style="left:${m}%"></span>`:d}
      </span>
      <span class="zlbl">
        <span style="width:30%;text-align:left">${n}</span>
        <span style="width:40%;color:#4CB87E;font-weight:800">${r[0]}\u2013${r[1]} ideal</span>
        <span style="width:30%;text-align:right">${s}</span>
      </span>`}sensorInd(t){let n=S(this.st(t.entity)),s=t.name??this.friendly(t.entity),i=this.unit(t.entity),r=t.anzeige??"wert",p=t.entity.split(".")[0],c=p==="number"||p==="input_number",l=this.hass.states[t.entity]?.attributes??{},g=t.step??(Number(l.step)||.1),m=l.min,x=l.max,b=(String(g).split(".")[1]??"").length||1,y=f=>{let L=f;m!==void 0&&(L=Math.max(m,L)),x!==void 0&&(L=Math.min(x,L)),this.hass.callService(p,"set_value",{entity_id:t.entity,value:Number(L.toFixed(b))})},v,C=t.ideal??[0,0],A=t.ok??C;if(r==="zone"){let f=n!==null&&n>=C[0]&&n<=C[1],L=n!==null&&n>=A[0]&&n<=A[1];v=t.color??(f?h.ok:L?h.warn:h.crit)}else r==="graph"?v=t.color??h.water:v=t.color??"rgba(242,247,243,.95)";let E=o`<div class="ihd">
      <span class="ilbl" style="color:${r==="wert"?"var(--tx-2)":v};cursor:pointer" @click=${()=>this.moreInfo(t.entity)}>
        ${t.icon?o`<ha-icon icon="${t.icon}" style="--mdc-icon-size:14px"></ha-icon>`:d}${s}
        ${c?o`<ha-icon icon="mdi:pencil" style="--mdc-icon-size:11px;opacity:.45;margin-left:3px"></ha-icon>`:d}
      </span>
      ${c?o`<span class="setrow">
            <button class="gc stepbtn" title="weniger" @click=${()=>n!==null&&y(n-g)}><ha-icon icon="mdi:minus" style="--mdc-icon-size:16px"></ha-icon></button>
            <span class="setval" style="color:${v}">${n!==null?n:"\u2013"}<span class="u">${i}</span></span>
            <button class="gc stepbtn" title="mehr" @click=${()=>y((n??m??0)+g)}><ha-icon icon="mdi:plus" style="--mdc-icon-size:16px"></ha-icon></button></span>`:o`<span class="ival" style="color:${v};cursor:pointer" @click=${()=>this.moreInfo(t.entity)}>
            ${n!==null?n:this.st(t.entity)??"\u2013"}<span class="u">${i}</span></span>`}
    </div>`,V=r==="zone"?this.zoneV6(n,t.min??0,t.max??14,A,C,i):r==="graph"?o`<div class="spark">${ke(this._spark[t.entity]??[],v,this.chartW(74),38)}</div>`:d;return o`<div class="ind">${E}${V}</div>`}plantTankInd(t,n){let s=Math.min(100,Math.max(0,S(this.st(t))??0)),r=s<n?h.crit:h.water;return o`<button class="gc ind" @click=${()=>this.moreInfo(t)}>
      <div class="ihd"><span class="ilbl" style="color:${h.water}">
        <ha-icon icon="mdi:car-coolant-level" style="--mdc-icon-size:14px"></ha-icon>Tank</span>
        <span class="ival" style="color:${r}">${s.toFixed(0)}<span class="u"> %</span></span></div>
      <span class="bar" style="margin-top:8px"><i style="width:${s}%;background:linear-gradient(90deg, ${r}, ${r}cc);box-shadow:0 0 9px ${r}55"></i>
        <span class="min" style="left:${n}%"></span></span>
    </button>`}};customElements.define("growctrl-station-card",Ft);var Qe=[u.text("title","Titel"),u.num("columns","Spalten",1,6)],Ye=[u.entity("entity","Aktor",["switch","input_boolean","light","fan"]),u.text("name","Name (optional)"),u.text("group","Gruppe (optional, z.B. Zelt / Pflanzen)"),u.select("kind","Art (Farbe/Icon, optional)",[{value:"light",label:"Licht"},{value:"heat",label:"Heizung"},{value:"water",label:"Wasser / Befeuchter"},{value:"o2",label:"O\u2082"},{value:"fan",label:"L\xFCfter"},{value:"pump",label:"Pumpe"}]),u.bool("confirm","Mit Best\xE4tigung schalten")],Rt=class extends w{render(){return o`${this.form(Qe)}
      ${this.list({key:"controls",rowSchema:Ye,title:"Aktoren",addLabel:"Aktor hinzuf\xFCgen",newItem:()=>({entity:""})})}
      ${this.styleSection()}`}};customElements.define("growctrl-controls-editor",Rt);var Je={switch:"mdi:power",light:"mdi:lightbulb",fan:"mdi:fan",input_boolean:"mdi:toggle-switch"},tn={light:"mdi:lightbulb",heat:"mdi:radiator",water:"mdi:air-humidifier",o2:"mdi:scuba-tank",fan:"mdi:fan",pump:"mdi:water-pump"},Ot=class extends ${static{this.styles=k}validateConfig(e){if(!Array.isArray(e.controls)||!e.controls.length)throw new Error("growctrl-controls-card: 'controls' (min. 1 Eintrag) ist Pflicht.")}static getConfigElement(){return document.createElement("growctrl-controls-editor")}static getStubConfig(){return{controls:[{entity:"switch.beispiel"}]}}render(){let e=this._config;if(!this.hass)return d;let t=e.columns??4,n=new Map;return e.controls.forEach(s=>{let i=s.group??"";n.has(i)||n.set(i,[]),n.get(i).push(s)}),o`<div class="card ${e.style?.glass?"glass":""}" style="${_(e.style)};position:relative">
      ${e.title?o`<div class="hd"><div class="ttl">${e.title}</div></div>`:d}
      ${[...n.entries()].map(([s,i])=>o`
        ${s?o`<div class="seclbl">${s}</div>`:d}
        <div class="acts" style="grid-template-columns:repeat(${t},1fr); ${s?"":"margin-top:4px"}">
          ${i.map(r=>{let p=this.isOn(r.entity),c=r.name??this.friendly(r.entity),l=r.kind??"",g=l==="light"||l==="heat"||l==="water"?l:"",m=r.icon??this.hass.states[r.entity]?.attributes?.icon??tn[l]??Je[r.entity.split(".")[0]]??"mdi:power";return o`<button class="gc act ${p?"on":""} ${p?g:""}"
              @click=${()=>r.confirm?this.confirmToggle(r.entity,c):this.toggle(r.entity)}>
              <ha-icon class="aic" icon=${m} style="--mdc-icon-size:18px"></ha-icon>
              <span class="anm">${c}</span>
              <span class="ast">${p?"AN":"AUS"}</span>
            </button>`})}
        </div>`)}
      ${this.renderConfirm()}
    </div>`}};customElements.define("growctrl-controls-card",Ot);var en=[u.text("title","Titel"),u.num("columns","Spalten",1,6)],nn=[u.entity("entity","Sensor","sensor"),u.text("name","Name (optional)"),u.num("min","Sollbereich Min (optional)"),u.num("max","Sollbereich Max (optional)"),u.select("accent","Akzentfarbe (optional)",[{value:"temp",label:"Temperatur (orange)"},{value:"hum",label:"Feuchte (blau)"},{value:"vpd",label:"VPD (Akzent)"}])],It=class extends w{render(){return o`${this.form(en)}
      ${this.list({key:"sensors",rowSchema:nn,title:"Sensoren",addLabel:"Sensor hinzuf\xFCgen",newItem:()=>({entity:""})})}
      ${this.styleSection()}`}};customElements.define("growctrl-sensors-editor",It);var Nt=class extends ${static{this.styles=k}validateConfig(e){if(!Array.isArray(e.sensors)||!e.sensors.length)throw new Error("growctrl-sensors-card: 'sensors' (min. 1 Eintrag) ist Pflicht.")}static getConfigElement(){return document.createElement("growctrl-sensors-editor")}static getStubConfig(){return{sensors:[{entity:"sensor.beispiel"}]}}bad(e,t){return e!==null&&(t.min!==void 0&&e<t.min||t.max!==void 0&&e>t.max)}render(){let e=this._config;if(!this.hass)return d;let t=e.columns??3,n=e.sensors.some(s=>this.bad(S(this.st(s.entity)),s));return o`<div class="card ${e.style?.glass?"glass":""}" data-level=${n?"warning":"ok"} style=${_(e.style)}>
      ${e.title?o`<div class="hd"><div class="ttl">${e.title}</div></div>`:d}
      <div class="kpis" style="grid-template-columns:repeat(${t},minmax(0,1fr))">
        ${e.sensors.map(s=>{let i=S(this.st(s.entity)),r=this.bad(i,s),p=s.name??this.friendly(s.entity),c=s.accent?`c-${s.accent}`:"";return o`<button class="gc kpi ${c}" @click=${()=>this.moreInfo(s.entity)}>
            <span class="mlbl" style="overflow:hidden; white-space:nowrap; text-overflow:ellipsis; display:block">${p}</span>
            <span class="v" style="${r?`color:${h.crit}`:""}">${i!==null?i:"--"}<span class="u">${this.unit(s.entity)}</span></span>
          </button>`})}
      </div>
    </div>`}};customElements.define("growctrl-sensors-card",Nt);var sn=[u.text("title","Titel"),u.num("limit","Max. Zeilen",3,50),u.select("min_level","Anzeige",[{value:"alle",label:"Alle Ereignisse"},{value:"warnung",label:"Nur Warnungen/Fehler"}])],rn=[u.entity("entity","Letztes-Ereignis-Sensor","sensor"),u.text("name","Label (optional)")],Bt=class extends w{render(){return o`${this.form(sn)}
      ${this.list({key:"sources",rowSchema:rn,title:"Quellen",addLabel:"Quelle hinzuf\xFCgen",newItem:()=>({entity:""})})}
      ${this.styleSection()}`}};customElements.define("growctrl-status-editor",Bt);var Dt=class extends ${static{this.styles=k}validateConfig(e){if(!Array.isArray(e.sources)||!e.sources.length)throw new Error("growctrl-status-card: 'sources' (Letztes-Ereignis-Sensoren) ist Pflicht.")}static getConfigElement(){return document.createElement("growctrl-status-editor")}static getStubConfig(){return{sources:[{entity:"sensor.growctrl_gross_main1_letztes_ereignis"}]}}render(){let e=this._config;if(!this.hass)return d;let t=[],n=[];for(let l of e.sources){let g=this.hass.states[l.entity],m=g?.attributes?.verlauf??[];n.push(g?.attributes?.schweregrad??"ok"),m.forEach(x=>t.push({...x,src:l.name??this.friendly(l.entity),entity:l.entity}))}t.reverse();let i=(e.min_level==="warnung"?t.filter(l=>l.level==="warning"||l.level==="critical"):t).slice(0,e.limit??12),r=K(n),p=e.sources.length>1,c=l=>l==="critical"?"c":l==="warning"?"w":l==="info"?"i":"";return o`<div class="card ${e.style?.glass?"glass":""}" data-level=${r} style=${_(e.style)}>
      <div class="hd">
        <div class="ttl grow">${e.title??"Ereignisprotokoll"}</div>
        <span class="pill ${F(r)}">${r==="ok"?"Info":r==="warning"?"Warnung":r==="critical"?"Kritisch":"Info"}</span>
      </div>
      <div class="log">
        ${i.length?i.map(l=>o`
          <button class="gc lrow ${c(l.level)}" @click=${()=>l.entity&&this.moreInfo(l.entity)}>
            <span class="tm">${l.ts}</span>
            ${p?o`<span class="who">${l.src}</span>`:d}
            <span class="what">${l.text}</span>
          </button>`):o`<div class="lrow"><span class="what" style="color:var(--acc)">✓ Noch keine Ereignisse</span></div>`}
      </div>
    </div>`}};customElements.define("growctrl-status-card",Dt);var an=[u.text("title","Titel (optional)"),u.text("logo","Logo-URL (z.B. /local/growctrl/logo.png)"),u.bool("show_chart","24h-Chart zus\xE4tzlich zum Zonen-Balken anzeigen"),u.num("hours","Chart-Zeitraum (h)",1,168)],Ht=class extends w{render(){let e=[this.stationSelect(this._config?.tent),u.text("name","Label (optional)")];return o`${this.form([this.tentSelect(),...an])}
      ${this.list({key:"stations",rowSchema:e,title:"Stationen (Informationssystem)",addLabel:"Station hinzuf\xFCgen",newItem:()=>({station:""})})}
      ${this.styleSection()}`}};customElements.define("growctrl-hero-editor",Ht);var Te=[{w:20,col:"#6E97DE",lbl:"zu feucht"},{w:20,col:"#58E0A5",lbl:"Seedling"},{w:20,col:"#2FB36C",lbl:"Veg"},{w:20,col:"#E5B567",lbl:"Bloom"},{w:20,col:"#D4726F",lbl:"zu trocken"}],Ut=2,Vt=class extends ${constructor(){super(...arguments);this._logoErr=!1;this._hist=[]}static{this.styles=k}static{this.properties={...$.properties,_hist:{state:!0},_logoErr:{state:!0}}}validateConfig(t){if(!t.tent)throw new Error("growctrl-hero-card: 'tent' ist Pflicht (Zelt-Name aus der Integration).")}static getConfigElement(){return document.createElement("growctrl-hero-editor")}static getStubConfig(){return{tent:"gross",stations:[{station:"main1"}]}}te(t){let[n,s,i]=j[t],r=this._config;return r.overrides?.[s]??T(this.hass,r.tent,"zelt",i)??Z(n,r.tent,s,r.overrides)}connectedCallback(){super.connectedCallback(),this._load(),this._timer=window.setInterval(()=>this._load(),5*6e4)}disconnectedCallback(){super.disconnectedCallback(),this._timer&&clearInterval(this._timer)}async _load(){if(!this.hass){setTimeout(()=>this._load(),1e3);return}this._hist=await z(this.hass,this.te("vpd"),this._config.hours??24)}tglBtn(t,n,s){return o`<button class="gc tgl ${s?"on":""}" @click=${()=>this.confirmToggle(t,n)}>
      <span class="sw"></span> ${n}</button>`}render(){let t=this._config;if(!this.hass)return d;let n=this.hass.states[this.te("vpd")],s=!n&&!this.hass.states[this.te("enabled")],i=S(n?.state)??(s?.76:null),r=n?.attributes?.temp??(s?21.5:null),p=n?.attributes?.rh??(s?61:null),c=n?.attributes?.phase_effektiv??"",l=n?.attributes?.sollwerte,g=this.isOn(this.te("enabled"))||s,m=this.isOn(this.te("climate")),x=this.hass.states[this.te("status")],b=x?.attributes?.probleme??[],y=(t.stations??[]).map(f=>{let L=this.hass.states[T(this.hass,t.tent,f.station,"last_event")??N("sensor",t.tent,f.station,"letztes_ereignis",t.overrides)],it=this.hass.states[T(this.hass,t.tent,f.station,"light_rest")??N("sensor",t.tent,f.station,"licht_restzeit",t.overrides)],Pe=L?.attributes?.schweregrad??"ok";return{name:f.name??f.station,text:L?.state??"\u2013",level:Pe,lightText:it?.attributes?.text??(it?.state?`Licht ${it.attributes?.zustand??""}`:""),on:it?.attributes?.zustand==="an",ent:T(this.hass,t.tent,f.station,"last_event")??N("sensor",t.tent,f.station,"letztes_ereignis",t.overrides)}}),v=f=>f==="warning"||f==="critical",C=K([(x?.state??"").toLowerCase()==="problem"?"warning":"ok",...y.map(f=>v(f.level)?f.level:"ok")]),A=[...b.map(f=>({label:f,level:"warning"})),...y.filter(f=>v(f.level)).map(f=>({label:`${f.name}: ${f.text}`,level:f.level}))],E=i!==null&&l&&i>=l.vpd_min&&i<=l.vpd_max,V=i!==null?Math.min(100,Math.max(0,i/Ut*100)):null;return o`<div class="card ${t.style?.glass?"glass":""}" data-level=${C} style="${_(t.style)};position:relative">
      <div class="hd">
        ${t.logo&&!this._logoErr?o`<img src=${t.logo} alt="Logo" @error=${()=>{this._logoErr=!0}}
              style="width:46px;height:46px;border-radius:16px;object-fit:contain;background:rgba(255,255,255,.92);padding:3px;flex-shrink:0" />`:o`<div class="badge-ic"><ha-icon icon="mdi:sprout" style="--mdc-icon-size:22px"></ha-icon></div>`}
        <div class="grow" style="min-width:0">
          <div class="ttl">${t.title??`Growroom \xB7 ${t.tent}`}</div>
          ${c?o`<div class="sub">Klima-Phase ${c}</div>`:d}
        </div>
        <span class="pill ${F(C)}">${C==="ok"?"Alles OK":C==="warning"?"Warnung":C==="critical"?"Kritisch":"Info"}</span>
      </div>

      <div style="display:flex; gap:8px; margin-bottom:16px; flex-wrap:wrap">
        ${this.tglBtn(this.te("enabled"),"Zelt",g)}
        ${this.tglBtn(this.te("climate"),"Klima",m)}
      </div>

      <div class="kpis">
        <button class="gc kpi c-temp" @click=${()=>this.moreInfo(this.te("vpd"))}>
          <span class="mlbl">Temperatur</span><span class="v">${r!=null?Number(r).toFixed(1):"\u2013"}<span class="u">°C</span></span></button>
        <button class="gc kpi c-hum" @click=${()=>this.moreInfo(this.te("vpd"))}>
          <span class="mlbl">Luftfeuchte</span><span class="v">${p!=null?Math.round(Number(p)):"\u2013"}<span class="u">%</span></span></button>
        <button class="gc kpi c-vpd" @click=${()=>this.moreInfo(this.te("vpd"))}>
          <span class="mlbl">VPD</span><span class="v" style="${i!==null&&!E?`color:${h.warn}`:""}">${i!==null?i.toFixed(2):"\u2013"}<span class="u">kPa</span></span></button>
      </div>

      <div style="margin-top:16px">
        <div class="zones">
          ${Te.map(f=>o`<i style="width:${f.w}%;background:${f.col}"></i>`)}
          ${l?o`<span class="zband" style="left:${l.vpd_min/Ut*100}%;width:${(l.vpd_max-l.vpd_min)/Ut*100}%"></span>`:d}
          ${V!==null?o`<span class="zmark" style="left:${V}%"></span>`:d}
        </div>
        <div class="zlbl">${Te.map(f=>o`<span style="width:${f.w}%">${f.lbl}</span>`)}</div>
      </div>

      ${t.show_chart===!0&&this._hist.length>1?o`
        <div class="seclbl">VPD · ${t.hours??24}h</div>
        ${I([{data:this._hist,color:E===!1?h.warn:h.ok,fill:!0}],{w:this.chartW(),h:96,band:l?{min:l.vpd_min,max:l.vpd_max}:void 0,grid:3})}`:d}

      ${y.length?o`<div class="seclbl">Stationen</div>
        <div style="display:flex; flex-direction:column; gap:7px">
          ${y.map(f=>o`<button class="gc supply" @click=${()=>f.ent&&this.moreInfo(f.ent)}>
            <span class="shd">
              <span class="sic" style="color:${f.on?h.light:"var(--tx-3)"}"><ha-icon icon="mdi:lightbulb${f.on?"-on":"-outline"}" style="--mdc-icon-size:18px"></ha-icon></span>
              <span class="stt">${f.name}</span>
              <span class="stm" style="color:${v(f.level)?f.level==="critical"?h.crit:h.warn:h.ok};font-size:12px">${v(f.level)?f.level==="critical"?"Fehler":"Warnung":"OK"}</span>
            </span>
            <span class="sft"><span>${f.lightText||f.text}</span><span></span></span>
          </button>`)}
        </div>`:d}

      <div class="seclbl">Informationssystem</div>
      ${A.length?o`<div style="display:flex; flex-direction:column; gap:7px">
            ${A.map(f=>o`<div class="event" style="cursor:default">
              <span class="edot" style="background:${f.level==="critical"?h.crit:h.warn}"></span>
              <span class="etx" style="color:${f.level==="critical"?h.crit:h.warn}">${f.label}</span></div>`)}
          </div>`:o`<div class="event" style="cursor:default">
            <span class="edot" style="background:${h.ok};box-shadow:0 0 6px ${h.ok}"></span>
            <span class="etx" style="color:${h.ok}">Alle Systeme arbeiten normal</span></div>`}
      ${this.renderConfirm()}
    </div>`}};customElements.define("growctrl-hero-card",Vt);var Wt=class extends w{render(){let e=this._config.tent,t=[this.tentSelect("tent","Zelt"),u.text("title","Titel"),u.bool("show_tent_row","Zelt-Zeile zeigen (Klima/Status)"),u.text("tent_name","Name der Zelt-Zeile (optional)")],n=[this.stationSelect(e,"station","Station"),u.text("name","Anzeigename (optional)")];return o`${this.form(t)}
      ${this.list({key:"stations",rowSchema:n,title:"Stationen",addLabel:"Station hinzuf\xFCgen",newItem:()=>({station:""})})}
      ${this.styleSection()}`}};customElements.define("growctrl-checkup-editor",Wt);var Gt=class extends ${static{this.styles=k}validateConfig(e){if((!Array.isArray(e.stations)||!e.stations.length)&&(!Array.isArray(e.rows)||!e.rows.length))throw new Error("growctrl-checkup-card: 'stations' (min. 1) ist Pflicht.")}static getConfigElement(){return document.createElement("growctrl-checkup-editor")}static getStubConfig(){return{tent:"gross",show_tent_row:!0,stations:[{station:"main1"},{station:"main2"}]}}sEnt(e,t,n){let[s,i,r]=ut[n];return T(this.hass,e,t,r)??N(s,e,t,i)}tEnt(e,t){let[n,s,i]=j[t];return T(this.hass,e,"zelt",i)??Z(n,e,s)}stationCells(e,t){let n=this.hass.states[this.sEnt(e,t,"lightRest")],s=n?.attributes?.zustand==="an",i=n&&s?"ok":"off",r=this.hass.states[this.sEnt(e,t,"pumpRest")],p=this.isOn(this.sEnt(e,t,"pPump")),c=p?"warning":r?"ok":"off",l=this.hass.states[this.sEnt(e,t,"event")],g=l?.attributes?.schweregrad??"ok";return{licht:i,pumpe:c,klima:"off",status:g==="critical"?"critical":g==="warning"?"warning":"ok",lichtText:n?s?`Licht an${n.attributes?.text?" \xB7 "+n.attributes.text:""}`:"Licht aus":"\u2014",pumpeText:p?"Pumpe gesperrt (F\xFCllstand)":r?r.attributes?.text??"Zyklus l\xE4uft":"\u2014",statusText:l?.state??"OK",ent:{licht:this.sEnt(e,t,"lightRest"),pumpe:this.sEnt(e,t,"pumpRest"),status:this.sEnt(e,t,"event")}}}dot(e){let t=e==="off"?"off":F(e);return o`<span class="dot ${t}"></span>`}mc(e,t,n){return o`<button class="gc mc" title=${t}
      @click=${()=>n&&this.moreInfo(n)}>${this.dot(e)}</button>`}render(){let e=this._config;if(!this.hass)return d;let t=(e.stations??[]).map(c=>({tent:c.tent??e.tent??"gross",station:c.station,name:c.name??c.station})),n=e.tent??t[0]?.tent??"gross",s=[],i=e.show_tent_row?(()=>{let c=this.isOn(this.tEnt(n,"climate")),g=(this.hass.states[this.tEnt(n,"status")]?.state??"").toLowerCase()==="problem",m=c?"ok":"off",x=g?"warning":"ok";return s.push(x),{name:e.tent_name??`Zelt ${n}`,licht:"off",pumpe:"off",klima:m,status:x,klimaEnt:this.tEnt(n,"climate"),statusEnt:this.tEnt(n,"status")}})():null,r=t.map(c=>{let l=this.stationCells(c.tent,c.station);return s.push(l.status,l.pumpe),{...c,...l}}),p=K(s);return o`<div class="card ${e.style?.glass?"glass":""}" data-level=${p} style=${_(e.style)}>
      <div class="hd">
        <div class="grow">
          <div class="ttl">${e.title??"Checkup"}</div>
          <div class="sub">${t.length} ${t.length===1?"Station":"Stationen"}${e.show_tent_row?" \xB7 1 Zelt":""}</div>
        </div>
        <span class="pill ${F(p)}">${p==="ok"?"Alles OK":p==="warning"?"Warnung":p==="critical"?"Kritisch":"Info"}</span>
      </div>
      <div class="matrix">
        <span></span>
        <span class="mh">Licht</span><span class="mh">Pumpe</span><span class="mh">Klima</span><span class="mh">Status</span>
        ${i?o`
          <div class="mn">${i.name}</div>
          ${this.mc(i.licht,"Licht \u2013 auf Zeltebene nicht relevant")}
          ${this.mc(i.pumpe,"Pumpe \u2013 auf Zeltebene nicht relevant")}
          ${this.mc(i.klima,i.klima==="ok"?"Klima-Automatik AN":"Klima-Automatik AUS",i.klimaEnt)}
          ${this.mc(i.status,"Zelt-Status",i.statusEnt)}`:d}
        ${r.map(c=>o`
          <div class="mn">${c.name}</div>
          ${this.mc(c.licht,c.lichtText,c.ent.licht)}
          ${this.mc(c.pumpe,c.pumpeText,c.ent.pumpe)}
          ${this.mc(c.klima,"Klima wird auf Zeltebene geregelt")}
          ${this.mc(c.status,c.statusText,c.ent.status)}`)}
      </div>
    </div>`}};customElements.define("growctrl-checkup-card",Gt);var on=[u.text("title","Titel"),u.entity("entity","F\xFCllstand-Sensor (%) (Pflicht)","sensor"),u.num("min","Mindeststand (%)",0,100),u.num("volume_l","Tankvolumen (Liter, optional)",0,2e3)],Kt=class extends w{render(){return o`${this.form(on)}${this.styleSection()}`}};customElements.define("growctrl-tank-editor",Kt);var Zt=class extends ${static{this.styles=k}validateConfig(e){if(!e.entity)throw new Error("growctrl-tank-card: 'entity' (Fuellstand-Sensor in %) ist Pflicht.")}static getConfigElement(){return document.createElement("growctrl-tank-editor")}static getStubConfig(){return{entity:"sensor.gc_slot1_level1",title:"Tank",min:30,volume_l:200}}render(){let e=this._config;if(!this.hass)return d;let t=!this.hass.states[e.entity],n=Math.min(100,Math.max(0,S(this.st(e.entity))??(t?49:0))),s=e.min!==void 0&&n<e.min,i=s?h.crit:h.water,r=e.volume_l?n/100*e.volume_l:null;return o`<div class="card ${e.style?.glass?"glass":""}" data-level=${s?"critical":"ok"} style=${_(e.style)}>
      <div class="hd">
        <div class="ttl grow">${e.title??"Tank"}</div>
        ${s?o`<span class="pill crit">Nachfüllen</span>`:d}
      </div>
      <div style="display:flex; gap:18px; align-items:center">
        <button class="gc tankv" @click=${()=>this.moreInfo(e.entity)}>
          ${e.min!==void 0?o`<span class="minl" style="bottom:${e.min}%"></span>`:d}
          <span class="fill" style="height:${n}%; background:linear-gradient(180deg, ${i}d9, ${i}80)"></span>
        </button>
        <button class="gc" style="flex:1; min-width:0; text-align:left" @click=${()=>this.moreInfo(e.entity)}>
          <span class="mlbl">Aktueller Füllstand</span>
          <div style="font:700 38px/1 var(--f-num); letter-spacing:-1.5px; color:${i}; margin-top:5px; font-variant-numeric:tabular-nums">
            ${Math.round(n)}<span style="font:600 14px var(--f-num); color:var(--tx-2); margin-left:2px">%</span></div>
          ${r!==null?o`<div style="margin-top:6px; font:700 12.5px var(--f-ui); color:var(--tx-2)">≈ ${r.toFixed(1)} l von ${e.volume_l} l</div>`:d}
          ${e.min!==void 0?o`<div style="font:700 10.5px var(--f-ui); color:var(--tx-3); margin-top:2px">Mindeststand ${e.min} %</div>`:d}
        </button>
      </div>
    </div>`}};customElements.define("growctrl-tank-card",Zt);var ln=[u.text("title","Titel"),u.num("hours","Zeitraum (h)",1,168),u.num("height","Diagrammh\xF6he (px)",80,300)],cn=[u.entity("entity","Sensor","sensor"),u.text("name","Name (optional)"),u.text("color","Farbe (optional, z.B. #FF9F5A)")],jt=class extends w{render(){return o`${this.form(ln)}
      ${this.list({key:"sensors",rowSchema:cn,title:"Serien",addLabel:"Sensor hinzuf\xFCgen",newItem:()=>({entity:""})})}
      ${this.styleSection()}`}};customElements.define("growctrl-history-editor",jt);var Le=["#FFB98A","#7CC8F0","#7BE8A8","#C3ABF5"],qt=class extends ${constructor(){super(...arguments);this._hist={}}static{this.styles=k}static{this.properties={...$.properties,_hist:{state:!0}}}validateConfig(t){if(!Array.isArray(t.sensors)||!t.sensors.length)throw new Error("growctrl-history-card: 'sensors' (min. 1 Eintrag) ist Pflicht.")}static getConfigElement(){return document.createElement("growctrl-history-editor")}static getStubConfig(){return{sensors:[{entity:"sensor.zelt_temperature"}],hours:24}}connectedCallback(){super.connectedCallback(),this._load(),this._timer=window.setInterval(()=>this._load(),5*6e4)}disconnectedCallback(){super.disconnectedCallback(),this._timer&&clearInterval(this._timer)}async _load(){if(!this.hass){setTimeout(()=>this._load(),1e3);return}let t=this._config,n={};for(let s of t.sensors)n[s.entity]=await z(this.hass,s.entity,t.hours??24);this._hist=n}render(){let t=this._config;if(!this.hass)return d;let n=t.sensors.map((s,i)=>({data:this._hist[s.entity]??[],color:s.color??Le[i%Le.length],name:s.name??this.friendly(s.entity),fill:t.sensors.length===1}));return o`<div class="card ${t.style?.glass?"glass":""}" style=${_(t.style)}>
      <div class="hd">
        <div class="ttl grow">${t.title??"Verlauf"}</div>
        <button class="gc icbtn" style="width:auto; padding:0 13px; font:800 11px var(--f-num)">${t.hours??24}h</button>
      </div>
      ${I(n,{w:this.chartW(),h:t.height??120,grid:3})}
      <div class="legend">
        ${t.sensors.map((s,i)=>o`<span><i style="background:${n[i].color}"></i>${s.name??this.friendly(s.entity)} · ${S(this.st(s.entity))??"--"} ${this.unit(s.entity)}</span>`)}
      </div>
    </div>`}};customElements.define("growctrl-history-card",qt);var pn=[u.text("title","Titel"),u.entity("entity","Sensor (Pflicht)","sensor"),u.text("name","Anzeigename (optional)"),u.num("min","Sollbereich Min"),u.num("max","Sollbereich Max"),u.num("decimals","Nachkommastellen",0,4),u.num("hours","Chart-Zeitraum (h)",1,168),u.num("height","Diagrammh\xF6he (px)",80,300)],Xt=class extends w{render(){return o`${this.form(pn)}${this.styleSection()}`}};customElements.define("growctrl-metric-editor",Xt);var Qt=class extends ${constructor(){super(...arguments);this._hist=[]}static{this.styles=k}static{this.properties={...$.properties,_hist:{state:!0}}}validateConfig(t){if(!t.entity)throw new Error("growctrl-metric-card: 'entity' ist Pflicht.")}static getConfigElement(){return document.createElement("growctrl-metric-editor")}static getStubConfig(){return{entity:"sensor.gc_slot1_ec1",name:"EC",min:1.2,max:2.2}}connectedCallback(){super.connectedCallback(),this._load(),this._timer=window.setInterval(()=>this._load(),5*6e4)}disconnectedCallback(){super.disconnectedCallback(),this._timer&&clearInterval(this._timer)}async _load(){if(!this.hass){setTimeout(()=>this._load(),1e3);return}let t=this._config;this._hist=await z(this.hass,t.entity,t.hours??24)}render(){let t=this._config;if(!this.hass)return d;let n=S(this.st(t.entity))??(this.hass.states[t.entity]?null:1.84),s=n!==null&&t.min!==void 0&&n<t.min,i=n!==null&&t.max!==void 0&&n>t.max,r=s||i,p=n===null?"var(--tx-3)":r?h.crit:h.ok,c=t.decimals??2,l=t.min!==void 0||t.max!==void 0;return o`<div class="card ${t.style?.glass?"glass":""}" data-level=${r?"warning":"ok"} style=${_(t.style)}>
      <div class="hd">
        <div class="grow" style="min-width:0">
          <span class="mlbl">${t.name??this.friendly(t.entity)}</span>
          <button class="gc" style="display:block; margin-top:4px" @click=${()=>this.moreInfo(t.entity)}>
            <span style="font:700 34px/1 var(--f-num); letter-spacing:-1.5px; color:${p}; font-variant-numeric:tabular-nums">
              ${n!==null?n.toFixed(c):"--"}</span>
            <span style="font:600 14px var(--f-num); color:var(--tx-2); margin-left:2px">${this.unit(t.entity)}</span>
          </button>
        </div>
        ${l?o`<div style="text-align:right; flex-shrink:0">
          <span class="mlbl">Sollbereich</span>
          <div style="font:700 13px var(--f-num); color:${r?h.crit:"var(--acc)"}; margin-top:3px">${t.min??"\u2013"} – ${t.max??"\u2013"}</div>
          ${r?o`<div style="font:900 10px var(--f-ui); color:${h.crit}; margin-top:2px">${s?"\u25BC ZU NIEDRIG":"\u25B2 ZU HOCH"}</div>`:d}
        </div>`:d}
      </div>
      <div style="margin-top:6px">
        ${I([{data:this._hist,color:r?h.crit:h.ok,fill:!0}],{w:this.chartW(),h:t.height??104,band:{min:t.min,max:t.max},grid:3})}
      </div>
    </div>`}};customElements.define("growctrl-metric-card",Qt);var dn="3.3.1",un=[{type:"growctrl-tent-card",name:"GROWCTRL Tent",description:"Zelt-Hero: Klima-KPIs, VPD-Skala, Status-Ampel"},{type:"growctrl-station-card",name:"GROWCTRL Station",description:"Station: Licht-/Pumpenbalken, Stage, Auto, Konfiguration"},{type:"growctrl-controls-card",name:"GROWCTRL Controls",description:"Aktoren-Raster mit Gruppen und Bestaetigung"},{type:"growctrl-sensors-card",name:"GROWCTRL Sensors",description:"Sensor-KPIs mit Sollbereich-Ampel"},{type:"growctrl-status-card",name:"GROWCTRL Status",description:"Ereignisprotokoll der Integration mit Schweregrad-Ampel"},{type:"growctrl-hero-card",name:"GROWCTRL Hero",description:"Globale Steuerung, Klima-KPIs, VPD-Chart, Informationssystem"},{type:"growctrl-checkup-card",name:"GROWCTRL Checkup",description:"Checkup-Matrix: Licht/Pumpe/Klima/Status je Station"},{type:"growctrl-tank-card",name:"GROWCTRL Tank",description:"DWC-Fuellstand (vertikaler Tank) mit Warnstufe"},{type:"growctrl-history-card",name:"GROWCTRL History",description:"24h-Diagramm (z.B. Temperatur + Luftfeuchte)"},{type:"growctrl-metric-card",name:"GROWCTRL Metric",description:"EC/pH gross mit Chart und Sollbereich"}];window.customCards=window.customCards??[];window.__gcEpoch=be();un.forEach(a=>window.customCards.push({...a,preview:!0,documentationURL:"https://github.com/MrDarkvoid/growctrl"}));console.info(`%c GROWCTRL Cards %c v${dn} `,"background:#1D9E75;color:#fff;font-weight:700","background:#0F6E56;color:#fff");
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
