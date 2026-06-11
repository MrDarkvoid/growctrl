var ut=globalThis,gt=ut.ShadowRoot&&(ut.ShadyCSS===void 0||ut.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,xt=Symbol(),ae=new WeakMap,et=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==xt)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(gt&&t===void 0){let s=e!==void 0&&e.length===1;s&&(t=ae.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&ae.set(e,t))}return t}toString(){return this.cssText}},le=n=>new et(typeof n=="string"?n:n+"",void 0,xt),st=(n,...t)=>{let e=n.length===1?n[0]:t.reduce((s,i,o)=>s+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+n[o+1],n[0]);return new et(e,n,xt)},ce=(n,t)=>{if(gt)n.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let s=document.createElement("style"),i=ut.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=e.cssText,n.appendChild(s)}},wt=gt?n=>n:n=>n instanceof CSSStyleSheet?(t=>{let e="";for(let s of t.cssRules)e+=s.cssText;return le(e)})(n):n;var{is:Ge,defineProperty:We,getOwnPropertyDescriptor:Ve,getOwnPropertyNames:Ke,getOwnPropertySymbols:je,getPrototypeOf:Ze}=Object,mt=globalThis,de=mt.trustedTypes,qe=de?de.emptyScript:"",Xe=mt.reactiveElementPolyfillSupport,it=(n,t)=>n,St={toAttribute(n,t){switch(t){case Boolean:n=n?qe:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,t){let e=n;switch(t){case Boolean:e=n!==null;break;case Number:e=n===null?null:Number(n);break;case Object:case Array:try{e=JSON.parse(n)}catch{e=null}}return e}},he=(n,t)=>!Ge(n,t),pe={attribute:!0,type:String,converter:St,reflect:!1,useDefault:!1,hasChanged:he};Symbol.metadata??=Symbol("metadata"),mt.litPropertyMetadata??=new WeakMap;var z=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=pe){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let s=Symbol(),i=this.getPropertyDescriptor(t,s,e);i!==void 0&&We(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){let{get:i,set:o}=Ve(this.prototype,t)??{get(){return this[e]},set(r){this[e]=r}};return{get:i,set(r){let d=i?.call(this);o?.call(this,r),this.requestUpdate(t,d,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??pe}static _$Ei(){if(this.hasOwnProperty(it("elementProperties")))return;let t=Ze(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(it("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(it("properties"))){let e=this.properties,s=[...Ke(e),...je(e)];for(let i of s)this.createProperty(i,e[i])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[s,i]of e)this.elementProperties.set(s,i)}this._$Eh=new Map;for(let[e,s]of this.elementProperties){let i=this._$Eu(e,s);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let s=new Set(t.flat(1/0).reverse());for(let i of s)e.unshift(wt(i))}else t!==void 0&&e.push(wt(t));return e}static _$Eu(t,e){let s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ce(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){let s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(i!==void 0&&s.reflect===!0){let o=(s.converter?.toAttribute!==void 0?s.converter:St).toAttribute(e,s.type);this._$Em=t,o==null?this.removeAttribute(i):this.setAttribute(i,o),this._$Em=null}}_$AK(t,e){let s=this.constructor,i=s._$Eh.get(t);if(i!==void 0&&this._$Em!==i){let o=s.getPropertyOptions(i),r=typeof o.converter=="function"?{fromAttribute:o.converter}:o.converter?.fromAttribute!==void 0?o.converter:St;this._$Em=i;let d=r.fromAttribute(e,o.type);this[i]=d??this._$Ej?.get(i)??d,this._$Em=null}}requestUpdate(t,e,s,i=!1,o){if(t!==void 0){let r=this.constructor;if(i===!1&&(o=this[t]),s??=r.getPropertyOptions(t),!((s.hasChanged??he)(o,e)||s.useDefault&&s.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,s))))return;this.C(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:o},r){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??e??this[t]),o!==!0||r!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),i===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[i,o]of this._$Ep)this[i]=o;this._$Ep=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[i,o]of s){let{wrapped:r}=o,d=this[i];r!==!0||this._$AL.has(i)||d===void 0||this.C(i,void 0,o,d)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(e)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};z.elementStyles=[],z.shadowRootOptions={mode:"open"},z[it("elementProperties")]=new Map,z[it("finalized")]=new Map,Xe?.({ReactiveElement:z}),(mt.reactiveElementVersions??=[]).push("2.1.2");var Tt=globalThis,ue=n=>n,ft=Tt.trustedTypes,ge=ft?ft.createPolicy("lit-html",{createHTML:n=>n}):void 0,ve="$lit$",B=`lit$${Math.random().toFixed(9).slice(2)}$`,_e="?"+B,Je=`<${_e}>`,V=document,rt=()=>V.createComment(""),ot=n=>n===null||typeof n!="object"&&typeof n!="function",Ot=Array.isArray,Qe=n=>Ot(n)||typeof n?.[Symbol.iterator]=="function",Ct=`[ 	
\f\r]`,nt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,me=/-->/g,fe=/>/g,G=RegExp(`>|${Ct}(?:([^\\s"'>=/]+)(${Ct}*=${Ct}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),be=/'/g,ye=/"/g,xe=/^(?:script|style|textarea|title)$/i,Pt=n=>(t,...e)=>({_$litType$:n,strings:t,values:e}),a=Pt(1),ct=Pt(2),Ms=Pt(3),K=Symbol.for("lit-noChange"),p=Symbol.for("lit-nothing"),$e=new WeakMap,W=V.createTreeWalker(V,129);function we(n,t){if(!Ot(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return ge!==void 0?ge.createHTML(t):t}var Ye=(n,t)=>{let e=n.length-1,s=[],i,o=t===2?"<svg>":t===3?"<math>":"",r=nt;for(let d=0;d<e;d++){let c=n[d],h,m,g=-1,u=0;for(;u<c.length&&(r.lastIndex=u,m=r.exec(c),m!==null);)u=r.lastIndex,r===nt?m[1]==="!--"?r=me:m[1]!==void 0?r=fe:m[2]!==void 0?(xe.test(m[2])&&(i=RegExp("</"+m[2],"g")),r=G):m[3]!==void 0&&(r=G):r===G?m[0]===">"?(r=i??nt,g=-1):m[1]===void 0?g=-2:(g=r.lastIndex-m[2].length,h=m[1],r=m[3]===void 0?G:m[3]==='"'?ye:be):r===ye||r===be?r=G:r===me||r===fe?r=nt:(r=G,i=void 0);let _=r===G&&n[d+1].startsWith("/>")?" ":"";o+=r===nt?c+Je:g>=0?(s.push(h),c.slice(0,g)+ve+c.slice(g)+B+_):c+B+(g===-2?d:_)}return[we(n,o+(n[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]},at=class n{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let o=0,r=0,d=t.length-1,c=this.parts,[h,m]=Ye(t,e);if(this.el=n.createElement(h,s),W.currentNode=this.el.content,e===2||e===3){let g=this.el.content.firstChild;g.replaceWith(...g.childNodes)}for(;(i=W.nextNode())!==null&&c.length<d;){if(i.nodeType===1){if(i.hasAttributes())for(let g of i.getAttributeNames())if(g.endsWith(ve)){let u=m[r++],_=i.getAttribute(g).split(B),b=/([.?@])?(.*)/.exec(u);c.push({type:1,index:o,name:b[2],strings:_,ctor:b[1]==="."?Et:b[1]==="?"?kt:b[1]==="@"?Lt:X}),i.removeAttribute(g)}else g.startsWith(B)&&(c.push({type:6,index:o}),i.removeAttribute(g));if(xe.test(i.tagName)){let g=i.textContent.split(B),u=g.length-1;if(u>0){i.textContent=ft?ft.emptyScript:"";for(let _=0;_<u;_++)i.append(g[_],rt()),W.nextNode(),c.push({type:2,index:++o});i.append(g[u],rt())}}}else if(i.nodeType===8)if(i.data===_e)c.push({type:2,index:o});else{let g=-1;for(;(g=i.data.indexOf(B,g+1))!==-1;)c.push({type:7,index:o}),g+=B.length-1}o++}}static createElement(t,e){let s=V.createElement("template");return s.innerHTML=t,s}};function q(n,t,e=n,s){if(t===K)return t;let i=s!==void 0?e._$Co?.[s]:e._$Cl,o=ot(t)?void 0:t._$litDirective$;return i?.constructor!==o&&(i?._$AO?.(!1),o===void 0?i=void 0:(i=new o(n),i._$AT(n,e,s)),s!==void 0?(e._$Co??=[])[s]=i:e._$Cl=i),i!==void 0&&(t=q(n,i._$AS(n,t.values),i,s)),t}var At=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??V).importNode(e,!0);W.currentNode=i;let o=W.nextNode(),r=0,d=0,c=s[0];for(;c!==void 0;){if(r===c.index){let h;c.type===2?h=new lt(o,o.nextSibling,this,t):c.type===1?h=new c.ctor(o,c.name,c.strings,this,t):c.type===6&&(h=new Ft(o,this,t)),this._$AV.push(h),c=s[++d]}r!==c?.index&&(o=W.nextNode(),r++)}return W.currentNode=V,i}p(t){let e=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}},lt=class n{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=p,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=q(this,t,e),ot(t)?t===p||t==null||t===""?(this._$AH!==p&&this._$AR(),this._$AH=p):t!==this._$AH&&t!==K&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Qe(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==p&&ot(this._$AH)?this._$AA.nextSibling.data=t:this.T(V.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:s}=t,i=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=at.createElement(we(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(e);else{let o=new At(i,this),r=o.u(this.options);o.p(e),this.T(r),this._$AH=o}}_$AC(t){let e=$e.get(t.strings);return e===void 0&&$e.set(t.strings,e=new at(t)),e}k(t){Ot(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,s,i=0;for(let o of t)i===e.length?e.push(s=new n(this.O(rt()),this.O(rt()),this,this.options)):s=e[i],s._$AI(o),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let s=ue(t).nextSibling;ue(t).remove(),t=s}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},X=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,o){this.type=1,this._$AH=p,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=o,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=p}_$AI(t,e=this,s,i){let o=this.strings,r=!1;if(o===void 0)t=q(this,t,e,0),r=!ot(t)||t!==this._$AH&&t!==K,r&&(this._$AH=t);else{let d=t,c,h;for(t=o[0],c=0;c<o.length-1;c++)h=q(this,d[s+c],e,c),h===K&&(h=this._$AH[c]),r||=!ot(h)||h!==this._$AH[c],h===p?t=p:t!==p&&(t+=(h??"")+o[c+1]),this._$AH[c]=h}r&&!i&&this.j(t)}j(t){t===p?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},Et=class extends X{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===p?void 0:t}},kt=class extends X{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==p)}},Lt=class extends X{constructor(t,e,s,i,o){super(t,e,s,i,o),this.type=5}_$AI(t,e=this){if((t=q(this,t,e,0)??p)===K)return;let s=this._$AH,i=t===p&&s!==p||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,o=t!==p&&(s===p||i);i&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},Ft=class{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){q(this,t)}};var ts=Tt.litHtmlPolyfillSupport;ts?.(at,lt),(Tt.litHtmlVersions??=[]).push("3.3.3");var Se=(n,t,e)=>{let s=e?.renderBefore??t,i=s._$litPart$;if(i===void 0){let o=e?.renderBefore??null;s._$litPart$=i=new lt(t.insertBefore(rt(),o),o,void 0,e??{})}return i._$AI(n),i};var Rt=globalThis,P=class extends z{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Se(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return K}};P._$litElement$=!0,P.finalized=!0,Rt.litElementHydrateSupport?.({LitElement:P});var es=Rt.litElementPolyfillSupport;es?.({LitElement:P});(Rt.litElementVersions??=[]).push("4.2.2");var w=class extends P{constructor(){super(...arguments);this._config={};this._label=e=>e.label??e.name}static{this.properties={hass:{attribute:!1},_config:{state:!0}}}static{this.styles=st`
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
  `}setConfig(e){this._config={...e}}_fire(e){this._config=e,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0}))}form(e){return a`<ha-form .hass=${this.hass} .data=${this._config} .schema=${e}
      .computeLabel=${this._label}
      @value-changed=${s=>this._fire({...this._config,...s.detail.value})}></ha-form>`}list(e){let s=this._config[e.key]??[],i=o=>this._fire({...this._config,[e.key]:o});return a`
      ${e.title?a`<div class="lt">${e.title}</div>`:p}
      ${s.map((o,r)=>a`<div class="row">
        <ha-form .hass=${this.hass} .data=${o} .schema=${e.rowSchema}
          .computeLabel=${this._label}
          @value-changed=${d=>{let c=[...s];c[r]={...d.detail.value},i(c)}}></ha-form>
        <button class="del" title="Entfernen"
          @click=${()=>i(s.filter((d,c)=>c!==r))}>\u2715</button>
      </div>`)}
      <button class="add" @click=${()=>i([...s,e.newItem()])}>+ ${e.addLabel}</button>`}styleSection(){let e=this._config.style??{},s=[l.text("background","Hintergrund (Farbe, 'a,b' = Gradient oder CSS)"),l.num("opacity","Deckkraft (0\u20131)",0,1,.05),l.bool("glass","Glas-Effekt (Blur)"),l.text("accent","Akzentfarbe"),l.num("radius","Eckenradius (px)",0,40)];return a`<div class="lt">Stil</div>
      <ha-form .hass=${this.hass} .data=${e} .schema=${s}
        .computeLabel=${i=>i.label??i.name}
        @value-changed=${i=>this._fire({...this._config,style:{...i.detail.value}})}></ha-form>`}},l={text:(n,t)=>({name:n,label:t,selector:{text:{}}}),bool:(n,t)=>({name:n,label:t,selector:{boolean:{}}}),num:(n,t,e,s,i)=>({name:n,label:t,selector:{number:{min:e,max:s,step:i,mode:"box"}}}),entity:(n,t,e)=>({name:n,label:t,selector:{entity:e?{domain:e}:{}}}),entities:(n,t,e)=>({name:n,label:t,selector:{entity:{multiple:!0,...e?{domain:e}:{}}}}),select:(n,t,e)=>({name:n,label:t,selector:{select:{mode:"dropdown",options:e}}})};var ss=[l.text("title","Titel"),l.text("subtitle","Untertitel"),l.entity("temperature","Temperatursensor (Pflicht)","sensor"),l.entity("humidity","Feuchtesensor (Pflicht)","sensor"),l.entity("power","Leistungssensor (optional)","sensor"),l.num("leaf_offset","Blatt-Offset (K, z.B. -1.5)",-5,5),l.text("gradient","Gradient (z.B. #E87B2E,#C45A10)"),l.entity("climate_auto","Klima-Automatik (Badge)","input_boolean"),l.entity("maintenance","Wartung (Badge)","input_boolean"),l.entity("dehum_request","Entfeuchter-Anforderung","input_boolean"),l.num("temp_min","Temp-Warnung unter (\xB0C)"),l.num("temp_max","Temp-Warnung \xFCber (\xB0C)"),l.bool("show_vpd_scale","VPD-Skala anzeigen"),l.text("tap_navigation","Navigation bei Tap (z.B. /grow-zelt/gz_mittel)")],is=[l.entity("entity","Log-Entity","input_text"),l.select("type","Typ",[{value:"station",label:"Station"},{value:"climate",label:"Klima"}])],Mt=class extends w{render(){return a`${this.form(ss)}
      ${this.list({key:"logs",rowSchema:is,title:"Logs (Status-Ampel)",addLabel:"Log hinzuf\xFCgen",newItem:()=>({entity:"",type:"station"})})}
      ${this.styleSection()}`}};customElements.define("growctrl-tent-editor",Mt);var bt=n=>n===null||isNaN(n)?"\u2013":n<60?`${n} min`:`${Math.floor(n/60)}h ${n%60}min`,zt=n=>{let t=n.split(" ").pop().substring(0,5).split(":");return parseInt(t[0])*60+parseInt(t[1])},x=(n,t=null)=>{if(n===void 0||["unknown","unavailable",""].includes(n))return t;let e=parseFloat(n);return isNaN(e)?t:e},Ce=n=>{let t=Date.parse(n);return isNaN(t)?null:Math.floor((Date.now()-t)/864e5)};var Ae=n=>.61078*Math.exp(17.27*n/(n+237.3)),dt=(n,t,e=0)=>{let s=n+e;return Ae(s)-Ae(n)*(t/100)},J=[{max:.4,label:"Zu feucht",color:"#4FC3F7"},{max:.8,label:"Seedling",color:"#7EC8FF"},{max:1.2,label:"Veg",color:"#7EE87E"},{max:1.6,label:"Bloom",color:"#FFB432"},{max:9.9,label:"Zu trocken",color:"#FF6B6B"}],yt=n=>J.find(t=>n<=t.max)??J[J.length-1];var Ee=n=>!n||["unknown","unavailable",""].includes(n),ke=n=>n.length>=16?n.substring(11,16):"",N=n=>{if(Ee(n))return{level:"none",label:"\u2014",ts:""};let t=n,e=ke(t);if(t.includes("SENSOR INVALID"))return{level:"critical",label:"\u{1F6A8} Sensor ung\xFCltig \u2014 Befeuchtung gesperrt",ts:e};if(t.includes("MAINTENANCE"))return{level:"info",label:"\u{1F527} Wartungsmodus aktiv",ts:e};if(t.includes("TESTMODE"))return{level:"info",label:"\u{1F9EA} Testmodus aktiv",ts:e};if(t.includes("AUTO OFF"))return{level:"info",label:"\u{1F534} Klima-Automatik deaktiviert",ts:e};let s=t.match(/(?:IST|SOLL)\s+(?:F|CIRC)=(\w+)/i)?.[1]?.toLowerCase(),i=t.match(/IST\s+(?:CIRC|F)=\w+\s+HUM=(\w+)/i)?.[1]?.toUpperCase(),o=t.match(/REQ=(\w+)/i)?.[1]?.toUpperCase();if(i!==void 0){let r=[];return s==="on"?r.push("Umluft AN"):s==="manual"?r.push("Umluft Manuell"):s==="off"&&r.push("Umluft AUS"),r.push(i==="ON"?"Befeuchtung AN":"Befeuchtung AUS"),r.push(o==="ON"?"Entfeuchtung AN":"Entfeuchtung AUS"),t.includes("ZENTRAL-BLOCK")&&r.push("(Zentral-Block)"),{level:"ok",label:r.join(" \xB7 "),ts:e}}return{level:"ok",label:t.replace(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}\s*/,"").substring(0,45),ts:e}},R=n=>{if(Ee(n))return{level:"none",label:"\u2014",ts:""};let t=n,e=ke(t);if(t.includes("FAILSAFE LIGHT"))return{level:"critical",label:"\u{1F6A8} Failsafe: Licht-Zwangsabschaltung \u2014 Auto deaktiviert",ts:e};if(t.includes("FAILSAFE PUMP"))return{level:"critical",label:"\u{1F6A8} Failsafe: Pumpen-Zwangsabschaltung \u2014 Auto deaktiviert",ts:e};if(t.includes("TIME INVALID"))return{level:"critical",label:"\u26A0\uFE0F Lichtzeiten nicht konfiguriert",ts:e};if(t.includes("MISMATCH")){let m=_=>t.match(_)?.[1];return{level:"warning",label:"\u26A0\uFE0F Ger\xE4t antwortet nicht: "+([["Licht",m(/IST.*?\bL=(\w+)/i),m(/SOLL.*?\bL=(\w+)/i)],["Pumpe",m(/IST.*?\bP=(\w+)/i),m(/SOLL.*?\bP=(\w+)/i)],["O\u2082",m(/IST.*?\bO2=(\w+)/i),m(/SOLL.*?\bO2=(\w+)/i)]].filter(([,_,b])=>_&&b&&_!==b).map(([_,b,E])=>`${_} (IST ${b.toUpperCase()} / SOLL ${E.toUpperCase()})`).join(", ")||"Abweichung"),ts:e}}if(t.includes("MAINTENANCE"))return{level:"info",label:"\u{1F527} Wartungsmodus aktiv",ts:e};if(t.includes("TESTMODE"))return{level:"info",label:"\u{1F9EA} Testmodus aktiv",ts:e};let s=t.match(/IST.*?\bL=(\w+)/i)?.[1],i=t.match(/IST.*?\bP=(\w+)/i)?.[1],o=t.match(/IST.*?\bO2=(\w+)/i)?.[1],r=t.includes("OVRUNTIL")?" (Override aktiv)":"",d=[s&&s!=="n/a"?s==="on"?"\u{1F4A1} Licht AN":"\u{1F311} Licht AUS":null,i&&i!=="n/a"?i==="on"?"\u{1F4A7} Pumpe AN":"\u23F8\uFE0F Pumpe AUS":null,o&&o!=="n/a"?o==="on"?"\u{1FAE7} O\u2082 AN":"\u{1FAE7} O\u2082 AUS":null].filter(Boolean).join(" \xB7 "),c="";return t.includes("AUTO ON")?c="\u{1F7E2} Auto gestartet":t.includes("AUTO OFF")?c="\u{1F534} Auto gestoppt":t.match(/STAGE\s*\u2192/)?c=`\u{1F331} Phase: ${t.match(/STAGE\s*\u2192\s*(\w+)/)?.[1]??""}`:t.includes("LIGHT \u2192 ON")?c="\u{1F4A1} Licht eingeschaltet":t.includes("LIGHT \u2192 OFF")?c="\u{1F311} Licht ausgeschaltet":t.includes("PUMP \u2192 ON")?c="\u{1F4A7} Pumpe eingeschaltet":t.includes("PUMP \u2192 OFF")?c="\u23F8\uFE0F Pumpe ausgeschaltet":t.includes("O2 \u2192 ON")?c="\u{1FAE7} O\u2082 eingeschaltet":t.includes("FAN \u2192 ON")?c="\u{1F300} L\xFCfter eingeschaltet":t.includes("MANUAL OVERRIDE")?c="\u270B Manuell \xFCbersteuert":t.includes("OVERRIDE END")&&(c="\u2705 Override beendet"),{level:"ok",label:[c,d].filter(Boolean).join(" \u2014 ")+r||t.substring(17,55),ts:e}},Le=n=>n?.match(/IST.*?\bP=(\w+)/i)?.[1]==="on";var Fe={auto:"input_boolean.hydro_auto_{tent}_{station}",stage:"input_select.hydro_stage_{tent}_{station}",log:"input_text.hydro_log_{tent}_{station}",climate_log:"input_text.hydro_climate_log_{tent}",light_on:"input_datetime.hydro_light_on_{tent}_{station}",light_off_sv:"input_datetime.hydro_light_off_sv_{tent}_{station}",light_off_bloom:"input_datetime.hydro_light_off_bloom_{tent}_{station}",pump_on_seedling:"input_number.hydro_pump_on_seedling_{tent}_{station}",pump_off_seedling:"input_number.hydro_pump_off_seedling_{tent}_{station}",pump_on_veg:"input_number.hydro_pump_on_veg_{tent}_{station}",pump_off_veg:"input_number.hydro_pump_off_veg_{tent}_{station}",pump_on_bloom:"input_number.hydro_pump_on_bloom_{tent}_{station}",pump_off_bloom:"input_number.hydro_pump_off_bloom_{tent}_{station}",light_rest:"sensor.{tent}_{station}_licht_restzeit",pump_rest:"sensor.{tent}_{station}_pumpe_restzeit",maintenance:"input_boolean.hydro_maintenance_{tent}",testmode:"input_boolean.hydro_testmode_{tent}",climate_auto:"input_boolean.hydro_climate_auto_{tent}",dehum_request:"input_boolean.hydro_dehum_request_{tent}"},ns=(n,t)=>n.replaceAll("{tent}",t.tent).replaceAll("{station}",t.station),Te=(n,t)=>{let e={};return Object.keys(Fe).forEach(s=>{let i=t.overrides?.[s];if(i){e[s]=i;return}let o=t.templates?.[s]??Fe[s],r=ns(o,t);n.states[r]&&(e[s]=r)}),e};var Oe=new Map,Pe=new Map;async function I(n,t,e=24,s=48){let i=`${t}:${e}`,o=Oe.get(i);if(o&&Date.now()-o.t<5*6e4)return o.data;try{let r=new Date(Date.now()-e*36e5).toISOString(),c=((await n.callApi("GET",`history/period/${r}?filter_entity_id=${t}&minimal_response&no_attributes`))?.[0]??[]).map(g=>parseFloat(g.state??g.s)).filter(g=>!isNaN(g)),h=Math.max(1,Math.floor(c.length/s)),m=c.filter((g,u)=>u%h===0);return Oe.set(i,{t:Date.now(),data:m}),m}catch{return o?.data??[]}}async function Re(n,t,e=14){let s=Pe.get(t);if(s&&Date.now()-s.t<10*6e4)return s.data;try{let i=new Date().toISOString(),o=new Date(Date.now()+e*864e5).toISOString(),r=await n.callApi("GET",`calendars/${t}?start=${i}&end=${o}`);return Pe.set(t,{t:Date.now(),data:r??[]}),r??[]}catch{return s?.data??[]}}var Me=(n,t=100,e=24)=>{if(n.length<2)return"";let s=Math.min(...n),i=Math.max(...n),o=i-s||1;return n.map((r,d)=>`${d===0?"M":"L"}${(d/(n.length-1)*t).toFixed(1)},${(e-(r-s)/o*e).toFixed(1)}`).join(" ")};var f={label:"rgba(255,255,255,0.55)",value:"rgba(255,255,255,0.97)",muted:"rgba(255,255,255,0.45)",logLabel:"rgba(255,255,255,0.70)",logText:"rgba(255,255,255,0.88)",ok:"#4DFFC3",warn:"#FFD166",crit:"#FF6B6B",info:"#7EC8FF",tileBg:"rgba(255,255,255,0.045)",rowBg:"rgba(255,255,255,0.04)"},O={critical:"rgba(255,107,107,.16)",warning:"rgba(255,209,102,.14)",info:"rgba(126,200,255,.10)",ok:f.rowBg,none:"rgba(255,255,255,.025)"},M={critical:f.crit,warning:f.warn,info:f.info,ok:f.logText,none:"rgba(255,255,255,.35)"},It={Seedling:{bg:"rgba(126,200,255,0.16)",color:"#7EC8FF"},Veg:{bg:"rgba(126,232,126,0.16)",color:"#7EE87E"},Bloom:{bg:"rgba(255,180,50,0.18)",color:"#FFB432"},Flush:{bg:"rgba(255,180,50,0.18)",color:"#FFB432"},Trocknung:{bg:"rgba(201,155,95,0.18)",color:"#C99B5F"}},S=n=>{let t=[];if(n?.background){let e=n.background.trim(),s=e.includes(",")&&!/^(linear|radial|conic|rgb|hsl)/i.test(e)?`linear-gradient(160deg, ${e})`:e;t.push(`--gc-bg:${s}`)}return n?.opacity!==void 0&&t.push(`--gc-opacity:${n.opacity}`),n?.accent&&t.push(`--gc-accent:${n.accent}`),n?.radius!==void 0&&t.push(`--gc-radius:${n.radius}px`),t.join(";")},D=n=>n.includes("critical")?"critical":n.includes("warning")?"warning":n.includes("info")?"info":"ok",C=st`
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
`,j={ok:{bg:"rgba(77,255,195,.14)",color:f.ok,label:"Alles OK"},info:{bg:"rgba(126,200,255,.14)",color:f.info,label:"Info"},warning:{bg:"rgba(255,209,102,.16)",color:f.warn,label:"Warnung"},critical:{bg:"rgba(255,107,107,.18)",color:f.crit,label:"Fehler"}};var H=30,$t=4,ze=6,Bt=14;function Q(n,t={}){let e=t.w??300,s=t.h??110,i=n.flatMap(u=>u.data);if(!i.length)return a`<div style="height:${s}px;display:flex;align-items:center;justify-content:center;
    font-size:11px;color:rgba(255,255,255,.35)">Keine Verlaufsdaten</div>`;let o=t.min??Math.min(...i,t.band?.min??1/0),r=t.max??Math.max(...i,t.band?.max??-1/0);r-o<.001&&(r+=1,o-=1);let d=(r-o)*.08;o-=d,r+=d;let c=(u,_)=>H+u/Math.max(1,_-1)*(e-H-$t),h=u=>ze+(1-(u-o)/(r-o))*(s-ze-Bt),m=t.grid??3,g=u=>Math.abs(u)>=100?u.toFixed(0):Math.abs(u)>=10?u.toFixed(1):u.toFixed(2);return a`<svg viewBox="0 0 ${e} ${s}" preserveAspectRatio="none" style="width:100%;height:${s}px;display:block">
    ${t.band&&(t.band.min!==void 0||t.band.max!==void 0)?ct`
      <rect x="${H}" y="${h(t.band.max??r)}" width="${e-H-$t}"
        height="${Math.max(0,h(t.band.min??o)-h(t.band.max??r))}"
        fill="${t.band.color??"rgba(77,255,195,.08)"}" />`:p}
    ${Array.from({length:m+1},(u,_)=>{let b=o+(r-o)*_/m;return ct`
        <line x1="${H}" y1="${h(b)}" x2="${e-$t}" y2="${h(b)}"
          stroke="rgba(255,255,255,.07)" stroke-width="1"/>
        <text x="${H-4}" y="${h(b)+3}" text-anchor="end"
          font-size="8" fill="rgba(255,255,255,.4)">${g(b)}</text>`})}
    ${n.map(u=>{if(u.data.length<2)return p;let b=`M${u.data.map((E,k)=>`${c(k,u.data.length).toFixed(1)},${h(E).toFixed(1)}`).join(" L")}`;return ct`
        ${u.fill!==!1?ct`<path d="${b} L${c(u.data.length-1,u.data.length)},${s-Bt} L${H},${s-Bt} Z"
          fill="${u.color}" opacity=".10"/>`:p}
        <path d="${b}" fill="none" stroke="${u.color}" stroke-width="1.8"
          stroke-linejoin="round" stroke-linecap="round"/>
        <circle cx="${c(u.data.length-1,u.data.length)}" cy="${h(u.data[u.data.length-1])}"
          r="2.6" fill="${u.color}"/>`})}
    <text x="${H}" y="${s-3}" font-size="8" fill="rgba(255,255,255,.35)">-24h</text>
    <text x="${e-$t}" y="${s-3}" text-anchor="end" font-size="8" fill="rgba(255,255,255,.35)">jetzt</text>
  </svg>`}var Ie=n=>a`
  <div style="display:flex;gap:12px;flex-wrap:wrap;margin-top:4px">
    ${n.filter(t=>t.name).map(t=>a`<span style="display:inline-flex;align-items:center;gap:5px;
      font-size:10px;color:rgba(255,255,255,.6)">
      <span style="width:10px;height:3px;border-radius:2px;background:${t.color}"></span>${t.name}</span>`)}
  </div>`;var v=class extends P{constructor(){super(...arguments);this._config={};this._confirm=null}static{this.properties={hass:{attribute:!1},_config:{state:!0},_confirm:{state:!0}}}setConfig(e){this.validateConfig(e),this._config=e}validateConfig(e){}getCardSize(){return 4}st(e){return e?this.hass?.states[e]?.state:void 0}isOn(e){return this.st(e)==="on"}friendly(e){return e&&this.hass?.states[e]?.attributes?.friendly_name||e||""}unit(e){return e&&this.hass?.states[e]?.attributes?.unit_of_measurement||""}moreInfo(e){this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:e},bubbles:!0,composed:!0}))}navigate(e){history.pushState(null,"",e),window.dispatchEvent(new CustomEvent("location-changed"))}toggle(e){let s=e.split(".")[0],i=["switch","input_boolean","light","fan"].includes(s)?s:"homeassistant";this.hass.callService(i,"toggle",{entity_id:e})}confirmToggle(e,s){this._confirm={text:`${s} wirklich schalten?`,action:()=>this.toggle(e)}}renderConfirm(){return this._confirm?a`<div style="position:absolute;inset:0;background:rgba(0,0,0,.6);border-radius:16px;
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
    </div>`:p}};var Nt=class extends v{static{this.styles=C}validateConfig(t){if(!t.temperature||!t.humidity)throw new Error("growctrl-tent-card: 'temperature' und 'humidity' sind Pflicht.")}static getConfigElement(){return document.createElement("growctrl-tent-editor")}static getStubConfig(){return{temperature:"sensor.zelt_temperature",humidity:"sensor.zelt_humidity",title:"Mein Zelt"}}render(){let t=this._config;if(!this.hass)return p;let e=x(this.st(t.temperature)),s=x(this.st(t.humidity)),i=t.power?x(this.st(t.power)):null,o=e!==null&&s!==null?dt(e,s,t.leaf_offset??0):null,r=o!==null?yt(o):null,d=(t.logs??[]).map(b=>(b.type==="climate"?N:R)(this.st(b.entity))),c=D(d.map(b=>b.level)),h=j[c].label;c==="ok"&&(this.isOn(t.dehum_request)?(c="warning",h="Dehum AN"):e!==null&&(e<(t.temp_min??18)||e>(t.temp_max??30))&&(c="warning",h="Temp!"));let m=j[c],g=t.style??(t.gradient?{background:t.gradient}:void 0),u=2,_=o!==null?Math.min(100,Math.max(0,o/u*100)):null;return a`<div class="card ${g?.glass?"glass":""} ${t.tap_navigation?"clickable":""}"
        data-level=${c} style=${S(g)}
        @click=${()=>t.tap_navigation&&this.navigate(t.tap_navigation)}>
      <div class="hdr">
        <div>
          <div class="title">${t.title??"Zelt"}</div>
          ${t.subtitle?a`<div class="subtitle">${t.subtitle}</div>`:p}
        </div>
        <div class="badges">
          ${this.isOn(t.climate_auto)?a`<span class="badge">\u2699 Klima</span>`:p}
          ${this.isOn(t.maintenance)?a`<span class="badge warn">\u{1F527} Wartung</span>`:p}
          <span class="status-pill" style="background:${m.bg};color:${m.color}">
            <span class="dot" style="background:${m.color}"></span>${h}</span>
        </div>
      </div>
      <div class="grid" style="grid-template-columns:1fr 1fr 1fr;margin-top:14px">
        <div class="tile"><div class="lbl">Temperatur</div>
          <div class="val">${e!==null?e.toFixed(1):"--"}<span class="unit">\u00b0C</span></div></div>
        <div class="tile"><div class="lbl">Luftfeuchte</div>
          <div class="val">${s!==null?Math.round(s):"--"}<span class="unit">%</span></div></div>
        <div class="tile"><div class="lbl">VPD</div>
          <div class="val" style=${r?`color:${r.color}`:""}>${o!==null?o.toFixed(2):"--"}<span class="unit">kPa</span></div></div>
      </div>
      ${t.show_vpd_scale!==!1&&_!==null?a`
        <div style="margin-top:10px">
          <div style="position:relative;height:8px;border-radius:4px;overflow:visible;display:flex">
            ${J.map((b,E)=>{let k=E===0?0:Math.min(J[E-1].max,u),$=Math.max(0,(Math.min(b.max,u)-k)/u*100),A=E===0,L=b.max>=u;return a`<div style="width:${$}%;background:${b.color};opacity:.5;
                ${A?"border-radius:4px 0 0 4px;":""}${L?"border-radius:0 4px 4px 0;":""}"></div>`})}
            <div style="position:absolute;left:${_}%;top:-3px;width:3px;height:14px;background:#fff;
              border-radius:2px;transform:translateX(-50%);box-shadow:0 0 6px rgba(255,255,255,.8)"></div>
          </div>
          <div style="display:flex;justify-content:space-between;font-size:10px;color:${f.muted};margin-top:4px">
            <span>${r.label}${t.leaf_offset?` \xB7 Blatt ${t.leaf_offset>0?"+":""}${t.leaf_offset}K`:""}</span>
            ${i!==null?a`<span style="font-weight:700;color:rgba(255,255,255,.7)">\u26A1 ${Math.round(i)} W</span>`:p}
          </div>
        </div>`:i!==null?a`<div style="font-size:11px;font-weight:700;color:rgba(255,255,255,.7);margin-top:8px">\u26A1 ${Math.round(i)} W</div>`:p}
      ${d.length?a`<div class="seclbl">Letzte Ereignisse</div>
        ${d.map(b=>a`<div class="logrow" style="background:${O[b.level]};margin-top:4px">
          <span class="txt" style="color:${M[b.level]}">${b.label}</span>
          ${b.ts?a`<span class="ts">${b.ts}</span>`:p}
        </div>`)}`:p}
    </div>`}};customElements.define("growctrl-tent-card",Nt);var rs=[l.text("name","Anzeigename"),l.select("system","Systemtyp",[{value:"generic",label:"Generisch"},{value:"dwc",label:"DWC (Wasserkultur)"},{value:"soil",label:"Erde"}]),l.text("tent","Zelt (Profil, z.B. mittel)"),l.text("station_id","Station (Profil, z.B. main1)"),l.entity("light_switch","Licht-Switch (Hardware, Pflicht)","switch"),l.entity("pump_switch","Pumpen-Switch (optional)","switch"),l.entity("o2_switch","O\u2082-Switch (optional)","switch"),l.entity("fan_switch","Umluft-Switch (optional)","switch"),l.bool("show_stage_chips","Phasen-Chips anzeigen"),l.bool("show_settings","Konfigurations-Kacheln anzeigen")],Dt=class extends w{constructor(){super(...arguments);this._origStation={}}setConfig(e){let s=e.station??{};this._origStation=s,this._config={...e,tent:s.tent??"",station_id:s.station??"",light_switch:s.light_switch,pump_switch:s.pump_switch,o2_switch:s.o2_switch,fan_switch:s.fan_switch}}_fire(e){let{tent:s,station_id:i,light_switch:o,pump_switch:r,o2_switch:d,fan_switch:c,...h}=e,m=this._origStation,g={...h,station:{...m,tent:s??"",station:i??"",light_switch:o,pump_switch:r,o2_switch:d,fan_switch:c}};this._config=e,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:g},bubbles:!0,composed:!0}))}range(e,s,i){let o=(this._config[e]??{})[s]??{},r=[l.entity("entity",i,"sensor"),l.num("min","Min"),l.num("max","Max")];return a`<div class="row"><ha-form .hass=${this.hass} .data=${o} .schema=${r}
      .computeLabel=${d=>d.label??d.name}
      @value-changed=${d=>{let c={...this._config[e]??{},[s]:{...d.detail.value}};this._fire({...this._config,[e]:c})}}></ha-form></div>`}render(){let e=this._config.system??"generic";return a`${this.form(rs)}
      ${e==="dwc"?a`<div class="lt">DWC-Wasserwerte (Ampel bei Sollbereich-Verletzung)</div>
        ${this.range("dwc","ec","EC-Sensor")}
        ${this.range("dwc","ph","pH-Sensor")}
        ${this.range("dwc","water_temp","Wassertemperatur-Sensor")}
        ${this.range("dwc","level","F\xFCllstand-Sensor")}`:p}
      ${e==="soil"?a`<div class="lt">Erde-Bodenwerte (Ampel bei Sollbereich-Verletzung)</div>
        ${this.range("soil","moisture","Bodenfeuchte-Sensor")}
        ${this.range("soil","soil_temp","Bodentemperatur-Sensor")}
        ${this.range("soil","ec","EC-Sensor")}
        ${this.range("soil","ph","pH-Sensor")}`:p}
      ${this.styleSection()}
      <div class="hint">Erweitert (nur YAML): <code>station.overrides</code> /
        <code>station.templates</code> zum \u00dcberschreiben einzelner Rollen bzw. des Namensschemas.</div>`}};customElements.define("growctrl-station-editor",Dt);var os=["Seedling","Veg","Bloom","Flush","Trocknung"],as=[["ec","EC","mS/cm"],["ph","pH",""],["water_temp","Wasser","\xB0C"],["level","F\xFCllstand","%"]],ls=[["moisture","Bodenfeuchte","%"],["soil_temp","Bodentemp","\xB0C"],["ec","EC Boden","mS/cm"],["ph","pH Boden",""]],Ht=class extends v{constructor(){super(...arguments);this._open=!1}static{this.styles=C}static{this.properties={...v.properties,_open:{state:!0}}}validateConfig(e){if(!e.station?.tent||!e.station?.station)throw new Error("growctrl-station-card: 'station: { tent, station }' ist Pflicht.")}static getConfigElement(){return document.createElement("growctrl-station-editor")}static getStubConfig(){return{station:{tent:"mittel",station:"main1",light_switch:"switch.licht"}}}rangeColor(e,s){return e===null?"rgba(255,255,255,.35)":s.min!==void 0&&e<s.min?f.crit:s.max!==void 0&&e>s.max?f.crit:f.ok}rangeBad(e,s){return e!==null&&(s.min!==void 0&&e<s.min||s.max!==void 0&&e>s.max)}render(){let e=this._config;if(!this.hass)return p;let s=e.station,i=Te(this.hass,s),o=y=>i[y],r=this.st(o("stage"))??"",d=this.isOn(o("auto")),c=s.light_switch?this.isOn(s.light_switch):!1,h=this.st(o("log")),m=x(this.st(o("light_rest"))),g=x(this.st(o("pump_rest"))),u=this.st(o("light_on"))??"",_=r==="Bloom"||r==="Flush"?this.st(o("light_off_bloom"))??"":this.st(o("light_off_sv"))??"",b=(_?zt(_):0)-(u?zt(u):0);b<=0&&(b+=24*60);let E=24*60-b,k=r==="Seedling"?"seedling":r==="Veg"?"veg":"bloom",$=x(this.st(o(`pump_on_${k}`)),10),A=x(this.st(o(`pump_off_${k}`)),15),L=$+A,vt=Le(h),Ne=m!==null&&b>0?Math.min(100,Math.round(m/b*100)):0,De=m!==null&&E>0?Math.min(100,Math.round(m/E*100)):0,He=g!==null&&L>0?Math.min(100,Math.round(g/L*100)):0,oe=It[r]??{bg:"rgba(255,255,255,0.08)",color:"rgba(255,255,255,0.5)"},U=R(h),pt=(e.system==="dwc"?as.filter(([y])=>e.dwc?.[y]?.entity).map(([y,F,T])=>[y,F,T,e.dwc[y]]):e.system==="soil"?ls.filter(([y])=>e.soil?.[y]?.entity).map(([y,F,T])=>[y,F,T,e.soil[y]]):[]).map(([y,F,T,Z])=>{let tt=x(this.st(Z.entity));return{key:y,label:F,unit:T,v:tt,color:this.rangeColor(tt,Z),bad:this.rangeBad(tt,Z),entity:Z.entity}}),_t=U.level==="none"?"ok":U.level;pt.some(y=>y.bad)&&_t!=="critical"&&(_t="warning");let Y=(y,F,T,Z,tt,Ue=!1)=>a`
      <div class="barrow">
        <span class="ico" style=${Ue?"opacity:.25":""}>${y}</span>
        <div class="track"><div class="fill" style="background:${F};width:${T}%"></div></div>
        <span class="time" style="color:${tt}">${Z}</span>
      </div>`,ht=[{eid:o("light_on"),name:"Licht AN",val:(this.st(o("light_on"))??"").substring(0,5)},{eid:o(r==="Bloom"||r==="Flush"?"light_off_bloom":"light_off_sv"),name:"Licht AUS",val:(_??"").substring(0,5)},{eid:o(`pump_on_${k}`),name:"Pumpe AN",val:`${$} min`},{eid:o(`pump_off_${k}`),name:"Pumpe AUS",val:`${A} min`}].filter(y=>y.eid);return a`<div class="card ${e.style?.glass?"glass":""}" data-level=${_t}
        style="${S(e.style)};position:relative">
      <div class="hdr">
        <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
          <span class="title" style="font-size:15px">${e.name??`${s.tent} \xB7 ${s.station}`}</span>
          <span class="stagebadge" style="background:${oe.bg};color:${oe.color}">${r||"\u2013"}</span>
          ${e.system&&e.system!=="generic"?a`<span class="badge" style="font-size:9px">${e.system==="dwc"?"DWC":"Erde"}</span>`:p}
        </div>
        <div style="display:flex;align-items:center;gap:8px">
          <span style="width:9px;height:9px;border-radius:50%;flex-shrink:0;
            background:${c?"#FFD700":d?"#8B9FC4":"rgba(255,255,255,.18)"};
            ${c?"box-shadow:0 0 8px #FFD700aa":""}"></span>
          <span style="font-size:11px;font-weight:700;color:${c?"rgba(255,255,255,.9)":d?"#B0BED4":"rgba(255,255,255,.3)"}">
            ${c?"Licht AN":d?"Nacht":"Inaktiv"}</span>
          ${e.show_settings!==!1&&ht.length?a`<button class="gc"
              title="Konfiguration" style="width:26px;height:26px;border-radius:8px;display:flex;align-items:center;
                justify-content:center;background:${this._open?"rgba(255,255,255,.12)":"rgba(255,255,255,.05)"};
                border:1px solid rgba(255,255,255,.1);color:rgba(255,255,255,.6)"
              @click=${()=>{this._open=!this._open}}>
              <ha-icon icon="mdi:tune-variant" style="--mdc-icon-size:14px"></ha-icon></button>`:p}
          ${o("auto")?a`<button class="gc stagebadge"
              style="background:${d?"rgba(77,255,195,.14)":"rgba(255,107,107,.14)"};
                border:1px solid ${d?"rgba(77,255,195,.3)":"rgba(255,107,107,.3)"};
                color:${d?"#4DFFC3":"#FF6B6B"}"
              @click=${()=>this.toggle(o("auto"))}>Auto ${d?"AN":"AUS"}</button>`:p}
        </div>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;margin-top:12px">
        ${c?Y("\u{1F4A1}","linear-gradient(90deg,#FFD700,#FFA500)",Ne,bt(m),f.muted):d?Y("\u{1F319}","linear-gradient(90deg,#8B9FC4,#5B6F96)",De,`AN in ${bt(m)}`,f.label):Y("\u{1F4A1}","transparent",0,"\u2013","rgba(255,255,255,.25)",!0)}
        ${vt?Y("\u{1F4A7}","linear-gradient(90deg,#4FC3F7,#0288D1)",He,bt(g),f.muted):Y("\u{1F4A7}","transparent",0,"\u2013","rgba(255,255,255,.25)",!0)}
      </div>
      ${pt.length?a`
        <div class="grid" style="grid-template-columns:repeat(${Math.min(4,pt.length)},1fr)">
          ${pt.map(y=>a`<button class="gc tile" style="text-align:left;padding:9px 11px;
              ${y.bad?"border-color:rgba(255,107,107,.45);background:rgba(255,107,107,.08)":""}"
            @click=${()=>this.moreInfo(y.entity)}>
            <div class="lbl">${y.label}</div>
            <div class="val sm" style="color:${y.color}">${y.v!==null?y.v:"--"}<span class="unit">${y.unit}</span></div>
          </button>`)}
        </div>`:p}
      ${e.show_stage_chips!==!1&&o("stage")?a`
        <div style="display:flex;gap:6px;margin-top:10px">
          ${os.map(y=>{let F=It[y],T=r===y;return a`<button class="gc" style="flex:1;text-align:center;padding:9px 4px;border-radius:12px;
                font-size:11px;font-weight:700;transition:all .15s;
                background:${T?F.bg:"rgba(255,255,255,.04)"};
                border:1px solid ${T?F.color:"rgba(255,255,255,.1)"};
                color:${T?F.color:"rgba(255,255,255,.45)"}"
              @click=${()=>this.hass.callService("input_select","select_option",{entity_id:o("stage"),option:y})}>${y}</button>`})}
        </div>`:p}
      ${e.show_settings!==!1&&ht.length?a`
        ${this._open?a`<div class="grid" style="grid-template-columns:repeat(${Math.min(4,ht.length)},1fr);margin-top:10px">
          ${ht.map(y=>a`<button class="gc tile" style="text-align:left;padding:9px 11px"
              @click=${()=>this.moreInfo(y.eid)}>
            <div class="lbl">${y.name}</div><div class="val sm">${y.val||"\u2013"}</div></button>`)}
        </div>`:p}`:p}
      <div class="logrow" style="background:${O[U.level]};margin-top:10px">
        <span class="txt" style="color:${M[U.level]}">${U.label}</span>
        ${U.ts?a`<span class="ts">${U.ts}</span>`:p}
      </div>
      ${this.renderConfirm()}
    </div>`}};customElements.define("growctrl-station-card",Ht);var cs=[l.text("title","Titel"),l.num("columns","Spalten",1,6)],ds=[l.entity("entity","Aktor",["switch","input_boolean","light","fan"]),l.text("name","Name (optional)"),l.text("group","Gruppe (optional, z.B. Zelt / Pflanzen)"),l.bool("confirm","Mit Best\xE4tigung schalten")],Ut=class extends w{render(){return a`${this.form(cs)}
      ${this.list({key:"controls",rowSchema:ds,title:"Aktoren",addLabel:"Aktor hinzuf\xFCgen",newItem:()=>({entity:""})})}
      ${this.styleSection()}`}};customElements.define("growctrl-controls-editor",Ut);var ps={switch:"mdi:power",light:"mdi:lightbulb",fan:"mdi:fan",input_boolean:"mdi:toggle-switch"},Gt=class extends v{static{this.styles=C}validateConfig(t){if(!Array.isArray(t.controls)||!t.controls.length)throw new Error("growctrl-controls-card: 'controls' (min. 1 Eintrag) ist Pflicht.")}static getConfigElement(){return document.createElement("growctrl-controls-editor")}static getStubConfig(){return{controls:[{entity:"switch.beispiel"}]}}render(){let t=this._config;if(!this.hass)return p;let e=t.style?.accent??"#4DFFC3",s=new Map;t.controls.forEach(o=>{let r=o.group??"";s.has(r)||s.set(r,[]),s.get(r).push(o)});let i=t.columns??3;return a`<div class="card ${t.style?.glass?"glass":""}" style="${S(t.style)};position:relative">
      ${t.title?a`<div class="title" style="font-size:15px">${t.title}</div>`:p}
      ${[...s.entries()].map(([o,r])=>a`
        ${o?a`<div class="seclbl">${o}</div>`:p}
        <div class="grid" style="grid-template-columns:repeat(${i},1fr);margin-top:${o?0:10}px">
          ${r.map(d=>{let c=this.isOn(d.entity),h=d.name??this.friendly(d.entity),m=this.hass.states[d.entity],g=d.icon??m?.attributes?.icon??ps[d.entity.split(".")[0]]??"mdi:power";return a`<button class="gc" style="display:flex;flex-direction:column;align-items:center;gap:7px;
                padding:15px 8px 12px;border-radius:16px;transition:all .18s;min-width:0;
                background:${c?`color-mix(in srgb, ${e} 12%, transparent)`:"rgba(255,255,255,.04)"};
                border:1.5px solid ${c?e:"rgba(255,255,255,.08)"};
                box-shadow:${c?`0 4px 18px -8px ${e}`:"none"}"
              @click=${()=>d.confirm?this.confirmToggle(d.entity,h):this.toggle(d.entity)}>
              <span style="width:42px;height:42px;border-radius:50%;display:flex;align-items:center;justify-content:center;
                  transition:all .18s;
                  background:${c?e:"rgba(255,255,255,.07)"};
                  color:${c?"#0C1117":"rgba(255,255,255,.55)"}">
                <ha-icon .icon=${g} style="--mdc-icon-size:21px"></ha-icon>
              </span>
              <span style="font-size:11.5px;font-weight:700;max-width:100%;overflow:hidden;white-space:nowrap;
                  text-overflow:ellipsis;color:${c?"rgba(255,255,255,.95)":"rgba(255,255,255,.65)"}">
                ${h}${d.confirm?" \u{1F512}":""}</span>
              <span style="font-size:9.5px;font-weight:800;letter-spacing:1px;
                  color:${c?e:"rgba(255,255,255,.35)"}">${c?"AN":"AUS"}</span>
            </button>`})}
        </div>`)}
      ${this.renderConfirm()}
    </div>`}};customElements.define("growctrl-controls-card",Gt);var hs=[l.text("title","Titel"),l.num("columns","Spalten",1,6),l.num("sparkline_hours","Sparkline-Zeitraum (h)",1,168)],us=[l.entity("entity","Sensor","sensor"),l.text("name","Name (optional)"),l.num("min","Sollbereich Min (optional)"),l.num("max","Sollbereich Max (optional)")],Wt=class extends w{render(){return a`${this.form(hs)}
      ${this.list({key:"sensors",rowSchema:us,title:"Sensoren",addLabel:"Sensor hinzuf\xFCgen",newItem:()=>({entity:""})})}
      ${this.styleSection()}`}};customElements.define("growctrl-sensors-editor",Wt);var Vt=class extends v{constructor(){super(...arguments);this._hist={}}static{this.styles=C}static{this.properties={...v.properties,_hist:{state:!0}}}validateConfig(e){if(!Array.isArray(e.sensors)||!e.sensors.length)throw new Error("growctrl-sensors-card: 'sensors' (min. 1 Eintrag) ist Pflicht.")}static getConfigElement(){return document.createElement("growctrl-sensors-editor")}static getStubConfig(){return{sensors:[{entity:"sensor.beispiel"}]}}connectedCallback(){super.connectedCallback(),this._load(),this._timer=window.setInterval(()=>this._load(),5*6e4)}disconnectedCallback(){super.disconnectedCallback(),this._timer&&clearInterval(this._timer)}async _load(){if(!this.hass){setTimeout(()=>this._load(),1e3);return}let e=this._config,s={};for(let i of e.sensors)s[i.entity]=await I(this.hass,i.entity,e.sparkline_hours??24);this._hist=s}bad(e,s){return e!==null&&(s.min!==void 0&&e<s.min||s.max!==void 0&&e>s.max)}render(){let e=this._config;if(!this.hass)return p;let s=e.columns??2,i=e.sensors.some(o=>this.bad(x(this.st(o.entity)),o));return a`<div class="card ${e.style?.glass?"glass":""}" data-level=${i?"warning":"ok"}
        style=${S(e.style)}>
      ${e.title?a`<div class="title" style="font-size:15px;margin-bottom:2px">${e.title}</div>`:p}
      <div class="grid" style="grid-template-columns:repeat(${s},1fr)">
        ${e.sensors.map(o=>{let r=x(this.st(o.entity)),d=this.bad(r,o),c=Me(this._hist[o.entity]??[],100,26),h=o.name??this.friendly(o.entity);return a`<button class="gc tile" style="text-align:left;position:relative;overflow:hidden;
              ${d?"border-color:rgba(255,107,107,.45);background:rgba(255,107,107,.08)":""}"
            @click=${()=>this.moreInfo(o.entity)}>
            ${c?a`<svg viewBox="0 0 100 26" preserveAspectRatio="none"
              style="position:absolute;left:0;right:0;bottom:0;width:100%;height:30px;opacity:.5">
              <path d="${c} L100,26 L0,26 Z" fill="${d?"rgba(255,107,107,.25)":"rgba(77,255,195,.18)"}"/>
              <path d="${c}" fill="none" stroke="${d?f.crit:"rgba(77,255,195,.8)"}" stroke-width="1.4"/>
            </svg>`:p}
            <div class="lbl" style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${h}</div>
            <div class="val" style="font-size:22px;${d?`color:${f.crit}`:""}">${r!==null?r:"--"}<span class="unit">${this.unit(o.entity)}</span></div>
            <div style="height:14px"></div>
          </button>`})}
      </div>
    </div>`}};customElements.define("growctrl-sensors-card",Vt);var gs=[l.text("title","Titel"),l.num("columns","Spalten",1,4),l.entity("calendar","Kalender (optional)","calendar")],ms=[l.text("name","Pflanzenname"),l.text("strain","Sorte (optional)"),l.entity("germination_helper","Keimdatum-Helper (optional)",["input_datetime","date","datetime"]),l.entities("sensors","Sensoren der Pflanze (optional)","sensor"),l.entity("camera","Kamera (Live-Bild, optional)","camera"),l.text("image","Bild-URL (optional, statt Kamera)")],Kt=class extends w{render(){return a`${this.form(gs)}
      ${this.list({key:"plants",rowSchema:ms,title:"Pflanzen",addLabel:"Pflanze hinzuf\xFCgen",newItem:()=>({name:"Pflanze"})})}
      ${this.styleSection()}`}};customElements.define("growctrl-plants-editor",Kt);var jt=class extends v{constructor(){super(...arguments);this._events=[];this._tick=0}static{this.styles=C}static{this.properties={...v.properties,_events:{state:!0},_tick:{state:!0}}}validateConfig(e){if(!Array.isArray(e.plants)||!e.plants.length)throw new Error("growctrl-plants-card: 'plants' (min. 1 Eintrag) ist Pflicht.")}static getConfigElement(){return document.createElement("growctrl-plants-editor")}static getStubConfig(){return{plants:[{name:"Pflanze 1"}]}}connectedCallback(){super.connectedCallback(),this._load(),this._timer=window.setInterval(()=>this._load(),10*6e4),this._mediaTimer=window.setInterval(()=>{this._tick++},1e4)}disconnectedCallback(){super.disconnectedCallback(),this._timer&&clearInterval(this._timer),this._mediaTimer&&clearInterval(this._mediaTimer)}async _load(){let e=this._config;if(e.calendar){if(!this.hass){setTimeout(()=>this._load(),1e3);return}this._events=(await Re(this.hass,e.calendar)).slice(0,3)}}render(){let e=this._config;return this.hass?a`<div class="card ${e.style?.glass?"glass":""}" style=${S(e.style)}>
      ${e.title?a`<div class="title" style="font-size:15px">${e.title}</div>`:p}
      <div class="grid" style="grid-template-columns:repeat(${e.columns??2},1fr)">
        ${e.plants.map(s=>{let i=s.germination_helper?this.st(s.germination_helper):void 0,o=i?Ce(i):null,r=s.camera?this.hass.states[s.camera]?.attributes?.entity_picture?`${this.hass.states[s.camera].attributes.entity_picture}&t=${this._tick}`:void 0:s.image;return a`<div class="tile" style="overflow:hidden">
            ${r?a`<button class="gc" style="display:block;width:calc(100% + 26px);margin:-11px -13px 9px"
                @click=${()=>s.camera&&this.moreInfo(s.camera)}>
                <img src=${r} style="width:100%;height:120px;object-fit:cover;display:block" loading="lazy"
                  alt=${s.name} /></button>`:p}
            <div style="display:flex;align-items:baseline;gap:6px;flex-wrap:wrap">
              <span style="font-size:13px;font-weight:800">\u{1F331} ${s.name}</span>
              ${s.strain?a`<span style="font-size:10px;color:rgba(255,255,255,.55)">${s.strain}</span>`:p}
            </div>
            ${o!==null?a`<div class="lbl" style="margin-top:4px">Tag ${o}</div>`:p}
            ${(s.sensors??[]).map(d=>{let c=typeof d=="string"?{entity:d}:d;return a`
              <button class="gc" style="display:flex;justify-content:space-between;width:100%;font-size:11px;margin-top:4px;color:rgba(255,255,255,.75)"
                @click=${()=>this.moreInfo(c.entity)}>
                <span>${c.name??this.friendly(c.entity)}</span>
                <span style="font-weight:700">${x(this.st(c.entity))??"--"} ${this.unit(c.entity)}</span>
              </button>`})}
          </div>`})}
      </div>
      ${e.calendar?a`<div class="seclbl">Anstehend</div>
        ${this._events.length?this._events.map(s=>a`
          <div class="logrow" style="background:rgba(0,0,0,.18);margin-top:4px">
            <span class="txt">${s.summary}</span>
            <span class="ts">${(s.start?.date??s.start?.dateTime??"").substring(0,10)}</span>
          </div>`):a`<div class="logrow" style="background:rgba(0,0,0,.12)"><span class="txt" style="color:rgba(255,255,255,.35)">Keine Ereignisse</span></div>`}`:p}
    </div>`:p}};customElements.define("growctrl-plants-card",jt);var fs=[l.text("title","Titel")],bs=[l.entity("entity","Log-Entity","input_text"),l.text("name","Label (optional)"),l.select("type","Typ",[{value:"station",label:"Station"},{value:"climate",label:"Klima"}])],ys=[l.entity("entity","Schalter",["input_boolean","switch"]),l.text("name","Name (optional)")],Zt=class extends w{render(){let t=this._config.expert??{},e=i=>this._fire({...this._config,expert:{...t,...i}}),s=t.controls??[];return a`${this.form(fs)}
      ${this.list({key:"logs",rowSchema:bs,title:"Logs",addLabel:"Log hinzuf\xFCgen",newItem:()=>({entity:"",type:"station"})})}
      <div class="lt">Experten-Bereich</div>
      <ha-form .hass=${this.hass} .data=${{show_raw:t.show_raw!==!1}}
        .schema=${[l.bool("show_raw","Roh-Logs anzeigen")]}
        .computeLabel=${i=>i.label??i.name}
        @value-changed=${i=>e({show_raw:i.detail.value.show_raw})}></ha-form>
      ${s.map((i,o)=>a`<div class="row">
        <ha-form .hass=${this.hass} .data=${i} .schema=${ys}
          .computeLabel=${r=>r.label??r.name}
          @value-changed=${r=>{let d=[...s];d[o]={...r.detail.value},e({controls:d})}}></ha-form>
        <button class="del" @click=${()=>e({controls:s.filter((r,d)=>d!==o)})}>\u2715</button>
      </div>`)}
      <button class="add" @click=${()=>e({controls:[...s,{entity:""}]})}>+ Experten-Schalter</button>
      ${this.styleSection()}`}};customElements.define("growctrl-status-editor",Zt);var qt=class extends v{constructor(){super(...arguments);this._expert=!1}static{this.styles=C}static{this.properties={...v.properties,_expert:{state:!0}}}validateConfig(e){if(!Array.isArray(e.logs)||!e.logs.length)throw new Error("growctrl-status-card: 'logs' (min. 1 Eintrag) ist Pflicht.")}static getConfigElement(){return document.createElement("growctrl-status-editor")}static getStubConfig(){return{logs:[{entity:"input_text.hydro_log_mittel_main1"}]}}render(){let e=this._config;if(!this.hass)return p;let s=e.logs.map(r=>({l:r,r:(r.type==="climate"?N:R)(this.st(r.entity))})),i=s.map(r=>r.r.level),o={label:"\u2713 Alles OK",color:f.ok};return i.includes("critical")?o={label:"\u{1F6A8} Fehler",color:f.crit}:i.includes("warning")?o={label:"\u26A0\uFE0F Warnung",color:f.warn}:i.includes("info")&&(o={label:"\u2139\uFE0F Info",color:f.info}),a`<div class="card ${e.style?.glass?"glass":""}" data-level=${D(i)} style="${S(e.style)};position:relative">
      <div class="hdr" style="align-items:center">
        <div class="title" style="font-size:15px">${e.title??"Status"}</div>
        <div style="display:flex;align-items:center;gap:6px">
          <span class="stagebadge" style="background:rgba(0,0,0,.25);color:${o.color}">${o.label}</span>
          ${e.expert?a`<button class="gc" title="Experten-Modus"
            style="width:26px;height:26px;border-radius:8px;display:flex;align-items:center;justify-content:center;
              background:${this._expert?"rgba(255,165,0,.18)":"rgba(255,255,255,.05)"};
              border:1px solid ${this._expert?"rgba(255,165,0,.4)":"rgba(255,255,255,.1)"};
              color:${this._expert?"#FFD166":"rgba(255,255,255,.5)"}"
            @click=${()=>{this._expert=!this._expert}}>
            <ha-icon icon="mdi:wrench-outline" style="--mdc-icon-size:14px"></ha-icon></button>`:p}
        </div>
      </div>
      ${s.map(({l:r,r:d})=>a`
        <div class="logrow" style="background:${O[d.level]};margin-top:6px">
          ${r.name?a`<span style="font-size:11px;font-weight:700;color:${f.logLabel};min-width:42px;flex-shrink:0">${r.name}</span>`:p}
          <span class="txt" style="color:${M[d.level]}">${d.label}</span>
          ${d.ts?a`<span class="ts">${d.ts}</span>`:p}
        </div>`)}
      ${e.expert?a`
        ${this._expert?a`
          ${(e.expert.controls??[]).length?a`<div class="grid" style="grid-template-columns:repeat(2,1fr)">
            ${e.expert.controls.map(r=>{let d=this.isOn(r.entity),c=r.name??this.friendly(r.entity);return a`<button class="gc tile" style="text-align:left;
                  background:${d?"rgba(255,165,0,.18)":"rgba(0,0,0,.18)"};
                  border:1px solid ${d?"rgba(255,165,0,.38)":"rgba(255,165,0,.15)"}"
                @click=${()=>this.confirmToggle(r.entity,c)}>
                <div class="lbl" style="color:${d?"#FFD166":"rgba(255,255,255,.45)"}">${c}</div>
                <div class="val sm" style="color:${d?"#FFD166":"rgba(255,255,255,.5)"}">${d?"AN":"AUS"}</div>
              </button>`})}
          </div>`:p}
          ${e.expert.show_raw!==!1?e.logs.map(r=>a`
            <div style="background:rgba(0,0,0,.28);border-radius:8px;padding:9px 11px;margin-top:6px">
              <div style="font-size:10px;text-transform:uppercase;letter-spacing:.8px;color:rgba(255,215,0,.65);margin-bottom:4px">${r.name??r.entity}</div>
              <div style="font-size:11px;color:rgba(255,255,255,.72);font-family:monospace;word-break:break-all;line-height:1.6">${this.st(r.entity)??"\u2013"}</div>
            </div>`):p}`:p}`:p}
      ${this.renderConfirm()}
    </div>`}};customElements.define("growctrl-status-card",qt);var $s=[l.text("title","Titel"),l.text("logo","Logo-URL (z.B. /local/growctrl/logo.png)"),l.entity("temperature","Temperatursensor (Pflicht)","sensor"),l.entity("humidity","Feuchtesensor (Pflicht)","sensor"),l.num("leaf_offset","Blatt-Offset (K)",-5,5,.5),l.entity("power","Gesamtleistung (optional)","sensor"),l.entity("tent_enable","Zelt aktiv (Hauptschalter)",["input_boolean","switch"]),l.entity("climate_enable","Klima aktiv",["input_boolean","switch"]),l.entities("problem_sensors","Problem-Sensoren (binary_sensor)",["binary_sensor","sensor"]),l.num("hours","Chart-Zeitraum (h)",1,168),l.bool("show_chart","VPD-Chart anzeigen")],vs=[l.entity("entity","Schalter",["switch","input_boolean","light","fan"]),l.text("name","Name (optional)"),l.text("icon","Icon (mdi:..., optional)")],_s=[l.entity("entity","Log-Entity","input_text"),l.text("name","Label (optional)"),l.select("type","Typ",[{value:"station",label:"Station"},{value:"climate",label:"Klima"}])],Xt=class extends w{render(){return a`${this.form($s)}
      ${this.list({key:"controls",rowSchema:vs,title:"Globale Schalter",addLabel:"Schalter hinzuf\xFCgen",newItem:()=>({entity:""})})}
      ${this.list({key:"logs",rowSchema:_s,title:"Logs (Informationssystem)",addLabel:"Log hinzuf\xFCgen",newItem:()=>({entity:"",type:"station"})})}
      ${this.styleSection()}`}};customElements.define("growctrl-hero-editor",Xt);var Jt=class extends v{constructor(){super(...arguments);this._hist={t:[],h:[]}}static{this.styles=C}static{this.properties={...v.properties,_hist:{state:!0}}}validateConfig(e){if(!e.temperature||!e.humidity)throw new Error("growctrl-hero-card: 'temperature' und 'humidity' sind Pflicht.")}static getConfigElement(){return document.createElement("growctrl-hero-editor")}static getStubConfig(){return{temperature:"sensor.zelt_temperature",humidity:"sensor.zelt_humidity",title:"GROWCTRL"}}connectedCallback(){super.connectedCallback(),this._load(),this._timer=window.setInterval(()=>this._load(),5*6e4)}disconnectedCallback(){super.disconnectedCallback(),this._timer&&clearInterval(this._timer)}async _load(){if(!this.hass){setTimeout(()=>this._load(),1e3);return}let e=this._config,s=e.hours??24;this._hist={t:await I(this.hass,e.temperature,s),h:await I(this.hass,e.humidity,s)}}render(){let e=this._config;if(!this.hass)return p;let s=x(this.st(e.temperature)),i=x(this.st(e.humidity)),o=e.power?x(this.st(e.power)):null,r=s!==null&&i!==null?dt(s,i,e.leaf_offset??0):null,d=r!==null?yt(r):null,c=(e.logs??[]).map($=>({name:$.name,r:($.type==="climate"?N:R)(this.st($.entity))})),h=[];c.forEach($=>{($.r.level==="warning"||$.r.level==="critical")&&h.push({label:`${$.name?$.name+": ":""}${$.r.label}`,level:$.r.level})}),(e.problem_sensors??[]).forEach($=>{let A=this.st($);(A==="on"||A==="problem")&&h.push({label:this.friendly($),level:"warning"})});let m=D([...c.map($=>$.r.level),...h.map($=>$.level)]),g=j[m],u=Math.min(this._hist.t.length,this._hist.h.length),_=Array.from({length:u},($,A)=>dt(this._hist.t[A],this._hist.h[A],e.leaf_offset??0)),b=e.tent_enable?this.isOn(e.tent_enable):null,E=e.climate_enable?this.isOn(e.climate_enable):null,k=($,A,L,vt)=>a`
      <button class="gc" style="display:flex;align-items:center;gap:8px;padding:8px 14px;border-radius:14px;
          transition:all .18s;
          background:${L?"rgba(77,255,195,.12)":"rgba(255,255,255,.05)"};
          border:1.5px solid ${L?"#4DFFC3":"rgba(255,255,255,.12)"};
          color:${L?"#4DFFC3":"rgba(255,255,255,.5)"}"
        @click=${()=>this.confirmToggle($,A)}>
        <ha-icon .icon=${vt} style="--mdc-icon-size:16px"></ha-icon>
        <span style="font-size:11px;font-weight:800">${A} ${L?"AN":"AUS"}</span>
      </button>`;return a`<div class="card ${e.style?.glass?"glass":""}" data-level=${m}
        style="${S(e.style)};position:relative">
      <div class="hdr">
        <div style="display:flex;align-items:center;gap:11px">
          ${e.logo?a`<img src=${e.logo} alt="Logo"
            style="width:42px;height:42px;border-radius:11px;object-fit:contain;background:rgba(255,255,255,.92);padding:3px" />`:p}
          <div>
            <div class="title">${e.title??"GROWCTRL"}</div>
            ${o!==null?a`<div class="subtitle">\u26A1 ${Math.round(o)} W Gesamtleistung</div>`:p}
          </div>
        </div>
        <span class="status-pill" style="background:${g.bg};color:${g.color}">
          <span class="dot" style="background:${g.color}"></span>${g.label}</span>
      </div>
      ${b!==null||E!==null||(e.controls??[]).length?a`
        <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:13px">
          ${b!==null?k(e.tent_enable,"Zelt",b,"mdi:power"):p}
          ${E!==null?k(e.climate_enable,"Klima",E,"mdi:thermostat"):p}
          ${(e.controls??[]).map($=>{let A=this.isOn($.entity),L=$.name??this.friendly($.entity);return k($.entity,L,A,$.icon??"mdi:power")})}
        </div>`:p}
      <div class="grid" style="grid-template-columns:1fr 1fr 1fr;margin-top:12px">
        <div class="tile"><div class="lbl">Temperatur</div>
          <div class="val">${s!==null?s.toFixed(1):"--"}<span class="unit">\u00b0C</span></div></div>
        <div class="tile"><div class="lbl">Luftfeuchte</div>
          <div class="val">${i!==null?Math.round(i):"--"}<span class="unit">%</span></div></div>
        <div class="tile"><div class="lbl">VPD ${d?`\xB7 ${d.label}`:""}</div>
          <div class="val" style=${d?`color:${d.color}`:""}>${r!==null?r.toFixed(2):"--"}<span class="unit">kPa</span></div></div>
      </div>
      ${e.show_chart!==!1&&_.length>1?a`
        <div class="seclbl">VPD \u00b7 ${e.hours??24}h</div>
        ${Q([{data:_,color:d?.color??"#4DFFC3"}],{h:105,band:{min:.8,max:1.2},grid:3})}`:p}
      <div class="seclbl">Informationssystem</div>
      ${h.length?h.map($=>a`<div class="logrow" style="background:${O[$.level]};margin-top:4px">
            <span class="txt" style="color:${M[$.level]}">\u26A0 ${$.label}</span></div>`):a`<div class="logrow" style="background:${O.ok};margin-top:4px">
            <span class="txt" style="color:${f.ok}">\u2713 Alle Systeme arbeiten normal</span></div>`}
      ${this.renderConfirm()}
    </div>`}};customElements.define("growctrl-hero-card",Jt);var xs=[l.text("title","Titel"),l.bool("compact","Kompakte Zeilen")],ws=[l.text("name","Name (z.B. Main 1)"),l.entity("entity","Quelle (Log oder Problem-Sensor)",["input_text","binary_sensor","sensor"]),l.select("type","Typ",[{value:"station",label:"Stations-Log"},{value:"climate",label:"Klima-Log"},{value:"problem",label:"Problem-Sensor"}])],Qt=class extends w{render(){return a`${this.form(xs)}
      ${this.list({key:"rows",rowSchema:ws,title:"Zeilen",addLabel:"Zeile hinzuf\xFCgen",newItem:()=>({name:"",entity:"",type:"station"})})}
      ${this.styleSection()}`}};customElements.define("growctrl-checkup-editor",Qt);var Yt=class extends v{static{this.styles=C}validateConfig(t){if(!Array.isArray(t.rows)||!t.rows.length)throw new Error("growctrl-checkup-card: 'rows' (min. 1 Eintrag) ist Pflicht.")}static getConfigElement(){return document.createElement("growctrl-checkup-editor")}static getStubConfig(){return{rows:[{name:"Main 1",entity:"input_text.hydro_log_mittel_main1"}]}}render(){let t=this._config;if(!this.hass)return p;let e=t.rows.map(r=>{if(r.type==="problem"){let c=this.isOn(r.entity);return{row:r,level:c?"warning":"ok",label:c?"Problem erkannt":"OK",ts:""}}let d=(r.type==="climate"?N:R)(this.st(r.entity));return{row:r,level:d.level==="none"?"ok":d.level,label:d.label,ts:d.ts??""}}),s=D(e.map(r=>r.level)),i=j[s],o=r=>r==="critical"?f.crit:r==="warning"?f.warn:r==="info"?f.info:f.ok;return a`<div class="card ${t.style?.glass?"glass":""}" data-level=${s} style=${S(t.style)}>
      <div class="hdr">
        <div class="title" style="font-size:15px">${t.title??"Checkup"}</div>
        <span class="status-pill" style="background:${i.bg};color:${i.color}">
          <span class="dot" style="background:${i.color}"></span>${i.label}</span>
      </div>
      <div style="margin-top:10px">
        ${e.map(r=>a`<div class="logrow" style="background:${t.compact?"transparent":O[r.level==="ok"?"none":r.level]};
            margin-top:${t.compact?2:5}px;padding:${t.compact?"4px 6px":"8px 11px"}">
          <span style="width:9px;height:9px;border-radius:50%;flex-shrink:0;background:${o(r.level)};
            box-shadow:0 0 7px ${o(r.level)}66"></span>
          <span style="font-size:11.5px;font-weight:800;min-width:64px;flex-shrink:0;color:rgba(255,255,255,.85)">${r.row.name}</span>
          <span class="txt" style="color:${r.level==="ok"?"rgba(255,255,255,.55)":M[r.level]}">${r.label}</span>
          ${r.ts?a`<span class="ts">${r.ts}</span>`:p}
        </div>`)}
      </div>
    </div>`}};customElements.define("growctrl-checkup-card",Yt);var Ss=[l.text("title","Titel"),l.entity("entity","F\xFCllstand-Sensor (%) (Pflicht)","sensor"),l.num("min","Mindeststand (%)",0,100),l.num("volume_l","Tankvolumen (Liter, optional)",0,2e3)],te=class extends w{render(){return a`${this.form(Ss)}${this.styleSection()}`}};customElements.define("growctrl-tank-editor",te);var ee=class extends v{static{this.styles=C}validateConfig(t){if(!t.entity)throw new Error("growctrl-tank-card: 'entity' (Fuellstand-Sensor in %) ist Pflicht.")}static getConfigElement(){return document.createElement("growctrl-tank-editor")}static getStubConfig(){return{entity:"sensor.gc_slot1_level1",title:"Tank"}}render(){let t=this._config;if(!this.hass)return p;let e=Math.min(100,Math.max(0,x(this.st(t.entity))??0)),s=t.min!==void 0&&e<t.min,i=s?f.crit:e<(t.min??0)+15?f.warn:"#4FC3F7",o=t.volume_l?e/100*t.volume_l:null;return a`<div class="card ${t.style?.glass?"glass":""}" data-level=${s?"critical":"ok"}
        style=${S(t.style)}>
      <div class="hdr">
        <div class="title" style="font-size:15px">${t.title??"F\xFCllstand"}</div>
        ${s?a`<span class="badge warn">\u26A0 Nachf\u00fcllen</span>`:p}
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
          ${t.min!==void 0?a`<div style="position:absolute;left:0;right:0;bottom:${t.min}%;
            border-top:1.5px dashed rgba(255,107,107,.7)"></div>`:p}
        </button>
        <div style="flex:1;min-width:0">
          <div class="lbl">Aktueller F\u00fcllstand</div>
          <div class="val" style="font-size:34px;color:${i}">${Math.round(e)}<span class="unit">%</span></div>
          ${o!==null?a`<div style="font-size:12px;font-weight:600;color:rgba(255,255,255,.55);margin-top:2px">
            \u2248 ${o.toFixed(1)} l von ${t.volume_l} l</div>`:p}
          ${t.min!==void 0?a`<div style="font-size:10.5px;color:rgba(255,255,255,.4);margin-top:6px">
            Mindeststand ${t.min}%</div>`:p}
        </div>
      </div>
    </div>`}};customElements.define("growctrl-tank-card",ee);var Cs=[l.text("title","Titel"),l.num("hours","Zeitraum (h)",1,168),l.num("height","Diagrammh\xF6he (px)",80,300)],As=[l.entity("entity","Sensor","sensor"),l.text("name","Name (optional)"),l.text("color","Farbe (optional, z.B. #FF9F5A)")],se=class extends w{render(){return a`${this.form(Cs)}
      ${this.list({key:"sensors",rowSchema:As,title:"Serien",addLabel:"Sensor hinzuf\xFCgen",newItem:()=>({entity:""})})}
      ${this.styleSection()}`}};customElements.define("growctrl-history-editor",se);var Be=["#FF9F5A","#4FC3F7","#4DFFC3","#C792EA"],ie=class extends v{constructor(){super(...arguments);this._hist={}}static{this.styles=C}static{this.properties={...v.properties,_hist:{state:!0}}}validateConfig(e){if(!Array.isArray(e.sensors)||!e.sensors.length)throw new Error("growctrl-history-card: 'sensors' (min. 1 Eintrag) ist Pflicht.")}static getConfigElement(){return document.createElement("growctrl-history-editor")}static getStubConfig(){return{sensors:[{entity:"sensor.zelt_temperature"}],hours:24}}connectedCallback(){super.connectedCallback(),this._load(),this._timer=window.setInterval(()=>this._load(),5*6e4)}disconnectedCallback(){super.disconnectedCallback(),this._timer&&clearInterval(this._timer)}async _load(){if(!this.hass){setTimeout(()=>this._load(),1e3);return}let e=this._config,s={};for(let i of e.sensors)s[i.entity]=await I(this.hass,i.entity,e.hours??24);this._hist=s}render(){let e=this._config;if(!this.hass)return p;let s=e.sensors.map((i,o)=>({data:this._hist[i.entity]??[],color:i.color??Be[o%Be.length],name:`${i.name??this.friendly(i.entity)} \xB7 ${x(this.st(i.entity))??"--"} ${this.unit(i.entity)}`,fill:e.sensors.length===1}));return a`<div class="card ${e.style?.glass?"glass":""}" style=${S(e.style)}>
      <div class="hdr">
        <div class="title" style="font-size:15px">${e.title??"Verlauf"}</div>
        <span class="badge">${e.hours??24}h</span>
      </div>
      <div style="margin-top:8px">${Q(s,{h:e.height??130,grid:3})}</div>
      ${Ie(s)}
    </div>`}};customElements.define("growctrl-history-card",ie);var Es=[l.text("title","Titel"),l.entity("entity","Sensor (Pflicht)","sensor"),l.text("name","Anzeigename (optional)"),l.num("min","Sollbereich Min"),l.num("max","Sollbereich Max"),l.num("decimals","Nachkommastellen",0,4),l.num("hours","Chart-Zeitraum (h)",1,168),l.num("height","Diagrammh\xF6he (px)",80,300)],ne=class extends w{render(){return a`${this.form(Es)}${this.styleSection()}`}};customElements.define("growctrl-metric-editor",ne);var re=class extends v{constructor(){super(...arguments);this._hist=[]}static{this.styles=C}static{this.properties={...v.properties,_hist:{state:!0}}}validateConfig(e){if(!e.entity)throw new Error("growctrl-metric-card: 'entity' ist Pflicht.")}static getConfigElement(){return document.createElement("growctrl-metric-editor")}static getStubConfig(){return{entity:"sensor.gc_slot1_ec1",name:"EC",min:1.2,max:2.2}}connectedCallback(){super.connectedCallback(),this._load(),this._timer=window.setInterval(()=>this._load(),5*6e4)}disconnectedCallback(){super.disconnectedCallback(),this._timer&&clearInterval(this._timer)}async _load(){if(!this.hass){setTimeout(()=>this._load(),1e3);return}let e=this._config;this._hist=await I(this.hass,e.entity,e.hours??24)}render(){let e=this._config;if(!this.hass)return p;let s=x(this.st(e.entity)),i=s!==null&&(e.min!==void 0&&s<e.min||e.max!==void 0&&s>e.max),o=s===null?"rgba(255,255,255,.4)":i?f.crit:f.ok,r=e.decimals??2;return a`<div class="card ${e.style?.glass?"glass":""}" data-level=${i?"warning":"ok"}
        style=${S(e.style)}>
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
        ${e.min!==void 0||e.max!==void 0?a`
          <div style="text-align:right">
            <div class="lbl">Sollbereich</div>
            <div style="font-size:13px;font-weight:700;color:${i?f.crit:"rgba(255,255,255,.7)"}">
              ${e.min??"\u2013"} \u2013 ${e.max??"\u2013"}</div>
            ${i?a`<div style="font-size:10px;font-weight:800;color:${f.crit};margin-top:2px">
              ${s<(e.min??-1/0)?"\u25BC ZU NIEDRIG":"\u25B2 ZU HOCH"}</div>`:p}
          </div>`:p}
      </div>
      <div style="margin-top:6px">
        ${Q([{data:this._hist,color:i?f.crit:"#4DFFC3"}],{h:e.height??110,band:{min:e.min,max:e.max},grid:3})}
      </div>
    </div>`}};customElements.define("growctrl-metric-card",re);var ks="2.2.0",Ls=[{type:"growctrl-tent-card",name:"GROWCTRL Tent",description:"Zelt-Hero: Klima-KPIs, VPD-Skala, Status-Ampel"},{type:"growctrl-station-card",name:"GROWCTRL Station",description:"Station: Licht-/Pumpenbalken, Stage, Auto, Konfiguration"},{type:"growctrl-controls-card",name:"GROWCTRL Controls",description:"Aktoren-Raster mit Gruppen und Bestaetigung"},{type:"growctrl-sensors-card",name:"GROWCTRL Sensors",description:"Sensor-Kacheln mit Sparklines"},{type:"growctrl-plants-card",name:"GROWCTRL Plants",description:"Pflanzen, Keimdatum, Kalender"},{type:"growctrl-status-card",name:"GROWCTRL Status",description:"Uebersetzte Logs, Ampel, Experten-Modus"},{type:"growctrl-hero-card",name:"GROWCTRL Hero",description:"Globale Steuerung, Klima-KPIs, VPD-Chart, Informationssystem"},{type:"growctrl-checkup-card",name:"GROWCTRL Checkup",description:"Ampel-Uebersicht aller Zelte/Stationen mit Auswertung"},{type:"growctrl-tank-card",name:"GROWCTRL Tank",description:"DWC-Fuellstand mit Animation und Warnstufe"},{type:"growctrl-history-card",name:"GROWCTRL History",description:"24h-Diagramm (z.B. Temperatur + Luftfeuchte)"},{type:"growctrl-metric-card",name:"GROWCTRL Metric",description:"EC/pH gross mit Chart und Sollbereich"}];window.customCards=window.customCards??[];Ls.forEach(n=>window.customCards.push({...n,preview:!1,documentationURL:"https://github.com/MrDarkvoid/growctrl"}));console.info(`%c GROWCTRL Cards %c v${ks} `,"background:#1D9E75;color:#fff;font-weight:700","background:#0F6E56;color:#fff");
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
