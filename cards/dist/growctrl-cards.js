var rt=globalThis,ot=rt.ShadowRoot&&(rt.ShadyCSS===void 0||rt.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ft=Symbol(),te=new WeakMap,X=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==ft)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(ot&&t===void 0){let s=e!==void 0&&e.length===1;s&&(t=te.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&te.set(e,t))}return t}toString(){return this.cssText}},ee=n=>new X(typeof n=="string"?n:n+"",void 0,ft),Q=(n,...t)=>{let e=n.length===1?n[0]:t.reduce((s,i,r)=>s+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+n[r+1],n[0]);return new X(e,n,ft)},se=(n,t)=>{if(ot)n.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let s=document.createElement("style"),i=rt.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=e.cssText,n.appendChild(s)}},bt=ot?n=>n:n=>n instanceof CSSStyleSheet?(t=>{let e="";for(let s of t.cssRules)e+=s.cssText;return ee(e)})(n):n;var{is:Re,defineProperty:ze,getOwnPropertyDescriptor:Me,getOwnPropertyNames:Ie,getOwnPropertySymbols:Ne,getPrototypeOf:Be}=Object,at=globalThis,ie=at.trustedTypes,De=ie?ie.emptyScript:"",He=at.reactiveElementPolyfillSupport,J=(n,t)=>n,yt={toAttribute(n,t){switch(t){case Boolean:n=n?De:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,t){let e=n;switch(t){case Boolean:e=n!==null;break;case Number:e=n===null?null:Number(n);break;case Object:case Array:try{e=JSON.parse(n)}catch{e=null}}return e}},re=(n,t)=>!Re(n,t),ne={attribute:!0,type:String,converter:yt,reflect:!1,useDefault:!1,hasChanged:re};Symbol.metadata??=Symbol("metadata"),at.litPropertyMetadata??=new WeakMap;var I=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=ne){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let s=Symbol(),i=this.getPropertyDescriptor(t,s,e);i!==void 0&&ze(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){let{get:i,set:r}=Me(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get:i,set(o){let c=i?.call(this);r?.call(this,o),this.requestUpdate(t,c,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??ne}static _$Ei(){if(this.hasOwnProperty(J("elementProperties")))return;let t=Be(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(J("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(J("properties"))){let e=this.properties,s=[...Ie(e),...Ne(e)];for(let i of s)this.createProperty(i,e[i])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[s,i]of e)this.elementProperties.set(s,i)}this._$Eh=new Map;for(let[e,s]of this.elementProperties){let i=this._$Eu(e,s);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let s=new Set(t.flat(1/0).reverse());for(let i of s)e.unshift(bt(i))}else t!==void 0&&e.push(bt(t));return e}static _$Eu(t,e){let s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return se(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){let s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(i!==void 0&&s.reflect===!0){let r=(s.converter?.toAttribute!==void 0?s.converter:yt).toAttribute(e,s.type);this._$Em=t,r==null?this.removeAttribute(i):this.setAttribute(i,r),this._$Em=null}}_$AK(t,e){let s=this.constructor,i=s._$Eh.get(t);if(i!==void 0&&this._$Em!==i){let r=s.getPropertyOptions(i),o=typeof r.converter=="function"?{fromAttribute:r.converter}:r.converter?.fromAttribute!==void 0?r.converter:yt;this._$Em=i;let c=o.fromAttribute(e,r.type);this[i]=c??this._$Ej?.get(i)??c,this._$Em=null}}requestUpdate(t,e,s,i=!1,r){if(t!==void 0){let o=this.constructor;if(i===!1&&(r=this[t]),s??=o.getPropertyOptions(t),!((s.hasChanged??re)(r,e)||s.useDefault&&s.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,s))))return;this.C(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:r},o){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),r!==!0||o!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),i===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[i,r]of this._$Ep)this[i]=r;this._$Ep=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[i,r]of s){let{wrapped:o}=r,c=this[i];o!==!0||this._$AL.has(i)||c===void 0||this.C(i,void 0,r,c)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(e)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};I.elementStyles=[],I.shadowRootOptions={mode:"open"},I[J("elementProperties")]=new Map,I[J("finalized")]=new Map,He?.({ReactiveElement:I}),(at.reactiveElementVersions??=[]).push("2.1.2");var kt=globalThis,oe=n=>n,lt=kt.trustedTypes,ae=lt?lt.createPolicy("lit-html",{createHTML:n=>n}):void 0,ge="$lit$",N=`lit$${Math.random().toFixed(9).slice(2)}$`,ue="?"+N,Ue=`<${ue}>`,V=document,tt=()=>V.createComment(""),et=n=>n===null||typeof n!="object"&&typeof n!="function",At=Array.isArray,Ge=n=>At(n)||typeof n?.[Symbol.iterator]=="function",xt=`[ 	
\f\r]`,Y=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,le=/-->/g,ce=/>/g,U=RegExp(`>|${xt}(?:([^\\s"'>=/]+)(${xt}*=${xt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),de=/'/g,pe=/"/g,me=/^(?:script|style|textarea|title)$/i,Ct=n=>(t,...e)=>({_$litType$:n,strings:t,values:e}),l=Ct(1),nt=Ct(2),vs=Ct(3),j=Symbol.for("lit-noChange"),d=Symbol.for("lit-nothing"),he=new WeakMap,G=V.createTreeWalker(V,129);function fe(n,t){if(!At(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return ae!==void 0?ae.createHTML(t):t}var Ve=(n,t)=>{let e=n.length-1,s=[],i,r=t===2?"<svg>":t===3?"<math>":"",o=Y;for(let c=0;c<e;c++){let a=n[c],h,g,f=-1,v=0;for(;v<a.length&&(o.lastIndex=v,g=o.exec(a),g!==null);)v=o.lastIndex,o===Y?g[1]==="!--"?o=le:g[1]!==void 0?o=ce:g[2]!==void 0?(me.test(g[2])&&(i=RegExp("</"+g[2],"g")),o=U):g[3]!==void 0&&(o=U):o===U?g[0]===">"?(o=i??Y,f=-1):g[1]===void 0?f=-2:(f=o.lastIndex-g[2].length,h=g[1],o=g[3]===void 0?U:g[3]==='"'?pe:de):o===pe||o===de?o=U:o===le||o===ce?o=Y:(o=U,i=void 0);let m=o===U&&n[c+1].startsWith("/>")?" ":"";r+=o===Y?a+Ue:f>=0?(s.push(h),a.slice(0,f)+ge+a.slice(f)+N+m):a+N+(f===-2?c:m)}return[fe(n,r+(n[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]},st=class n{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let r=0,o=0,c=t.length-1,a=this.parts,[h,g]=Ve(t,e);if(this.el=n.createElement(h,s),G.currentNode=this.el.content,e===2||e===3){let f=this.el.content.firstChild;f.replaceWith(...f.childNodes)}for(;(i=G.nextNode())!==null&&a.length<c;){if(i.nodeType===1){if(i.hasAttributes())for(let f of i.getAttributeNames())if(f.endsWith(ge)){let v=g[o++],m=i.getAttribute(f).split(N),x=/([.?@])?(.*)/.exec(v);a.push({type:1,index:r,name:x[2],strings:m,ctor:x[1]==="."?$t:x[1]==="?"?_t:x[1]==="@"?wt:K}),i.removeAttribute(f)}else f.startsWith(N)&&(a.push({type:6,index:r}),i.removeAttribute(f));if(me.test(i.tagName)){let f=i.textContent.split(N),v=f.length-1;if(v>0){i.textContent=lt?lt.emptyScript:"";for(let m=0;m<v;m++)i.append(f[m],tt()),G.nextNode(),a.push({type:2,index:++r});i.append(f[v],tt())}}}else if(i.nodeType===8)if(i.data===ue)a.push({type:2,index:r});else{let f=-1;for(;(f=i.data.indexOf(N,f+1))!==-1;)a.push({type:7,index:r}),f+=N.length-1}r++}}static createElement(t,e){let s=V.createElement("template");return s.innerHTML=t,s}};function Z(n,t,e=n,s){if(t===j)return t;let i=s!==void 0?e._$Co?.[s]:e._$Cl,r=et(t)?void 0:t._$litDirective$;return i?.constructor!==r&&(i?._$AO?.(!1),r===void 0?i=void 0:(i=new r(n),i._$AT(n,e,s)),s!==void 0?(e._$Co??=[])[s]=i:e._$Cl=i),i!==void 0&&(t=Z(n,i._$AS(n,t.values),i,s)),t}var vt=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??V).importNode(e,!0);G.currentNode=i;let r=G.nextNode(),o=0,c=0,a=s[0];for(;a!==void 0;){if(o===a.index){let h;a.type===2?h=new it(r,r.nextSibling,this,t):a.type===1?h=new a.ctor(r,a.name,a.strings,this,t):a.type===6&&(h=new St(r,this,t)),this._$AV.push(h),a=s[++c]}o!==a?.index&&(r=G.nextNode(),o++)}return G.currentNode=V,i}p(t){let e=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}},it=class n{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=d,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Z(this,t,e),et(t)?t===d||t==null||t===""?(this._$AH!==d&&this._$AR(),this._$AH=d):t!==this._$AH&&t!==j&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Ge(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==d&&et(this._$AH)?this._$AA.nextSibling.data=t:this.T(V.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:s}=t,i=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=st.createElement(fe(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(e);else{let r=new vt(i,this),o=r.u(this.options);r.p(e),this.T(o),this._$AH=r}}_$AC(t){let e=he.get(t.strings);return e===void 0&&he.set(t.strings,e=new st(t)),e}k(t){At(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,s,i=0;for(let r of t)i===e.length?e.push(s=new n(this.O(tt()),this.O(tt()),this,this.options)):s=e[i],s._$AI(r),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let s=oe(t).nextSibling;oe(t).remove(),t=s}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},K=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,r){this.type=1,this._$AH=d,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=r,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=d}_$AI(t,e=this,s,i){let r=this.strings,o=!1;if(r===void 0)t=Z(this,t,e,0),o=!et(t)||t!==this._$AH&&t!==j,o&&(this._$AH=t);else{let c=t,a,h;for(t=r[0],a=0;a<r.length-1;a++)h=Z(this,c[s+a],e,a),h===j&&(h=this._$AH[a]),o||=!et(h)||h!==this._$AH[a],h===d?t=d:t!==d&&(t+=(h??"")+r[a+1]),this._$AH[a]=h}o&&!i&&this.j(t)}j(t){t===d?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},$t=class extends K{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===d?void 0:t}},_t=class extends K{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==d)}},wt=class extends K{constructor(t,e,s,i,r){super(t,e,s,i,r),this.type=5}_$AI(t,e=this){if((t=Z(this,t,e,0)??d)===j)return;let s=this._$AH,i=t===d&&s!==d||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,r=t!==d&&(s===d||i);i&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},St=class{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){Z(this,t)}};var je=kt.litHtmlPolyfillSupport;je?.(st,it),(kt.litHtmlVersions??=[]).push("3.3.3");var be=(n,t,e)=>{let s=e?.renderBefore??t,i=s._$litPart$;if(i===void 0){let r=e?.renderBefore??null;s._$litPart$=i=new it(t.insertBefore(tt(),r),r,void 0,e??{})}return i._$AI(n),i};var Et=globalThis,z=class extends I{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=be(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return j}};z._$litElement$=!0,z.finalized=!0,Et.litElementHydrateSupport?.({LitElement:z});var We=Et.litElementPolyfillSupport;We?.({LitElement:z});(Et.litElementVersions??=[]).push("4.2.2");var ye,ct=null;function dt(n){if(n?.states===ye&&ct)return ct;let t=new Map,e=new Set,s={};for(let[i,r]of Object.entries(n?.states??{})){let o=r?.attributes;if(!o?.growctrl_role||!o?.growctrl_tent)continue;let c=String(o.growctrl_tent),a=String(o.growctrl_station??"zelt");t.set(`${c}::${a}::${o.growctrl_role}`,i),a==="zelt"?e.add(c):(s[c]??=new Set).add(a)}return ye=n?.states,ct={tents:[...e].sort(),stations:Object.fromEntries(Object.entries(s).map(([i,r])=>[i,[...r].sort()])),byRole:t},ct}var W=(n,t,e,s)=>dt(n).byRole.get(`${t}::${e}::${s}`);var _=class extends z{constructor(){super(...arguments);this._config={};this._label=e=>e.label??e.name}static{this.properties={hass:{attribute:!1},_config:{state:!0}}}static{this.styles=Q`
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
      @value-changed=${s=>this._fire({...this._config,...s.detail.value})}></ha-form>`}list(e){let s=this._config[e.key]??[],i=r=>this._fire({...this._config,[e.key]:r});return l`
      ${e.title?l`<div class="lt">${e.title}</div>`:d}
      ${s.map((r,o)=>l`<div class="row">
        <ha-form .hass=${this.hass} .data=${r} .schema=${e.rowSchema}
          .computeLabel=${this._label}
          @value-changed=${c=>{let a=[...s];a[o]={...c.detail.value},i(a)}}></ha-form>
        <button class="del" title="Entfernen"
          @click=${()=>i(s.filter((c,a)=>a!==o))}>\u2715</button>
      </div>`)}
      <button class="add" @click=${()=>i([...s,e.newItem()])}>+ ${e.addLabel}</button>`}tentSelect(e="tent",s="Zelt"){let i=dt(this.hass).tents;return{name:e,label:s,selector:{select:{options:i,custom_value:!0,mode:"dropdown"}}}}stationSelect(e,s="station",i="Station"){let r=dt(this.hass),o=e?r.stations[e]??[]:[...new Set(Object.values(r.stations).flat())];return{name:s,label:i,selector:{select:{options:o,custom_value:!0,mode:"dropdown"}}}}styleSection(){let e=this._config.style??{},s=[p.text("background","Hintergrund (Farbe, 'a,b' = Gradient oder CSS)"),p.num("opacity","Deckkraft (0\u20131)",0,1,.05),p.bool("glass","Glas-Effekt (Blur)"),p.text("accent","Akzentfarbe"),p.num("radius","Eckenradius (px)",0,40)];return l`<div class="lt">Stil</div>
      <ha-form .hass=${this.hass} .data=${e} .schema=${s}
        .computeLabel=${i=>i.label??i.name}
        @value-changed=${i=>this._fire({...this._config,style:{...i.detail.value}})}></ha-form>`}},p={text:(n,t)=>({name:n,label:t,selector:{text:{}}}),bool:(n,t)=>({name:n,label:t,selector:{boolean:{}}}),num:(n,t,e,s,i)=>({name:n,label:t,selector:{number:{min:e,max:s,step:i,mode:"box"}}}),entity:(n,t,e)=>({name:n,label:t,selector:{entity:e?{domain:e}:{}}}),entities:(n,t,e)=>({name:n,label:t,selector:{entity:{multiple:!0,...e?{domain:e}:{}}}}),select:(n,t,e)=>({name:n,label:t,selector:{select:{mode:"dropdown",options:e}}})};var Tt=class extends _{render(){let t=[this.tentSelect(),p.text("name","Anzeigename (optional)"),p.bool("show_chart","VPD-Chart anzeigen"),p.num("hours","Chart-Zeitraum (h)",1,168)];return l`${this.form(t)}${this.styleSection()}`}};customElements.define("growctrl-tent-editor",Tt);function Lt(n){if(n==null||isNaN(n))return"\u2013";let t=Math.max(0,Math.round(n)),e=Math.floor(t/60),s=t%60;return e&&s?`${e} h ${s} min`:e?`${e} h`:`${s} min`}function xe(n,t="auto"){let e=Math.floor(n/7)+1,s=n%7+1;return t==="tage"||t==="auto"&&n<7?`${n} Tage`:`Wo ${e} \xB7 Tag ${s}`}function C(n){if(n==null||n==="unknown"||n==="unavailable"||n==="")return null;let t=Number(n);return isNaN(t)?null:t}function ve(n){if(!n||n==="unknown"||n==="unavailable")return null;let t=new Date(n);return isNaN(t.getTime())?null:Math.max(0,Math.floor((Date.now()-t.getTime())/864e5))}var $e=n=>!n||["unknown","unavailable",""].includes(n),_e=n=>n.length>=16?n.substring(11,16):"",we=n=>{if($e(n))return{level:"none",label:"\u2014",ts:""};let t=n,e=_e(t);if(t.includes("SENSOR INVALID"))return{level:"critical",label:"\u{1F6A8} Sensor ung\xFCltig \u2014 Befeuchtung gesperrt",ts:e};if(t.includes("MAINTENANCE"))return{level:"info",label:"\u{1F527} Wartungsmodus aktiv",ts:e};if(t.includes("TESTMODE"))return{level:"info",label:"\u{1F9EA} Testmodus aktiv",ts:e};if(t.includes("AUTO OFF"))return{level:"info",label:"\u{1F534} Klima-Automatik deaktiviert",ts:e};let s=t.match(/(?:IST|SOLL)\s+(?:F|CIRC)=(\w+)/i)?.[1]?.toLowerCase(),i=t.match(/IST\s+(?:CIRC|F)=\w+\s+HUM=(\w+)/i)?.[1]?.toUpperCase(),r=t.match(/REQ=(\w+)/i)?.[1]?.toUpperCase();if(i!==void 0){let o=[];return s==="on"?o.push("Umluft AN"):s==="manual"?o.push("Umluft Manuell"):s==="off"&&o.push("Umluft AUS"),o.push(i==="ON"?"Befeuchtung AN":"Befeuchtung AUS"),o.push(r==="ON"?"Entfeuchtung AN":"Entfeuchtung AUS"),t.includes("ZENTRAL-BLOCK")&&o.push("(Zentral-Block)"),{level:"ok",label:o.join(" \xB7 "),ts:e}}return{level:"ok",label:t.replace(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}\s*/,"").substring(0,45),ts:e}},Se=n=>{if($e(n))return{level:"none",label:"\u2014",ts:""};let t=n,e=_e(t);if(t.includes("FAILSAFE LIGHT"))return{level:"critical",label:"\u{1F6A8} Failsafe: Licht-Zwangsabschaltung \u2014 Auto deaktiviert",ts:e};if(t.includes("FAILSAFE PUMP"))return{level:"critical",label:"\u{1F6A8} Failsafe: Pumpen-Zwangsabschaltung \u2014 Auto deaktiviert",ts:e};if(t.includes("TIME INVALID"))return{level:"critical",label:"\u26A0\uFE0F Lichtzeiten nicht konfiguriert",ts:e};if(t.includes("MISMATCH")){let g=m=>t.match(m)?.[1];return{level:"warning",label:"\u26A0\uFE0F Ger\xE4t antwortet nicht: "+([["Licht",g(/IST.*?\bL=(\w+)/i),g(/SOLL.*?\bL=(\w+)/i)],["Pumpe",g(/IST.*?\bP=(\w+)/i),g(/SOLL.*?\bP=(\w+)/i)],["O\u2082",g(/IST.*?\bO2=(\w+)/i),g(/SOLL.*?\bO2=(\w+)/i)]].filter(([,m,x])=>m&&x&&m!==x).map(([m,x,w])=>`${m} (IST ${x.toUpperCase()} / SOLL ${w.toUpperCase()})`).join(", ")||"Abweichung"),ts:e}}if(t.includes("MAINTENANCE"))return{level:"info",label:"\u{1F527} Wartungsmodus aktiv",ts:e};if(t.includes("TESTMODE"))return{level:"info",label:"\u{1F9EA} Testmodus aktiv",ts:e};let s=t.match(/IST.*?\bL=(\w+)/i)?.[1],i=t.match(/IST.*?\bP=(\w+)/i)?.[1],r=t.match(/IST.*?\bO2=(\w+)/i)?.[1],o=t.includes("OVRUNTIL")?" (Override aktiv)":"",c=[s&&s!=="n/a"?s==="on"?"\u{1F4A1} Licht AN":"\u{1F311} Licht AUS":null,i&&i!=="n/a"?i==="on"?"\u{1F4A7} Pumpe AN":"\u23F8\uFE0F Pumpe AUS":null,r&&r!=="n/a"?r==="on"?"\u{1FAE7} O\u2082 AN":"\u{1FAE7} O\u2082 AUS":null].filter(Boolean).join(" \xB7 "),a="";return t.includes("AUTO ON")?a="\u{1F7E2} Auto gestartet":t.includes("AUTO OFF")?a="\u{1F534} Auto gestoppt":t.match(/STAGE\s*\u2192/)?a=`\u{1F331} Phase: ${t.match(/STAGE\s*\u2192\s*(\w+)/)?.[1]??""}`:t.includes("LIGHT \u2192 ON")?a="\u{1F4A1} Licht eingeschaltet":t.includes("LIGHT \u2192 OFF")?a="\u{1F311} Licht ausgeschaltet":t.includes("PUMP \u2192 ON")?a="\u{1F4A7} Pumpe eingeschaltet":t.includes("PUMP \u2192 OFF")?a="\u23F8\uFE0F Pumpe ausgeschaltet":t.includes("O2 \u2192 ON")?a="\u{1FAE7} O\u2082 eingeschaltet":t.includes("FAN \u2192 ON")?a="\u{1F300} L\xFCfter eingeschaltet":t.includes("MANUAL OVERRIDE")?a="\u270B Manuell \xFCbersteuert":t.includes("OVERRIDE END")&&(a="\u2705 Override beendet"),{level:"ok",label:[a,c].filter(Boolean).join(" \u2014 ")+o||t.substring(17,55),ts:e}};var ke=new Map,Ae=new Map;async function M(n,t,e=24,s=48){let i=`${t}:${e}`,r=ke.get(i);if(r&&Date.now()-r.t<5*6e4)return r.data;try{let o=new Date(Date.now()-e*36e5).toISOString(),a=((await n.callApi("GET",`history/period/${o}?filter_entity_id=${t}&minimal_response&no_attributes`))?.[0]??[]).map(f=>parseFloat(f.state??f.s)).filter(f=>!isNaN(f)),h=Math.max(1,Math.floor(a.length/s)),g=a.filter((f,v)=>v%h===0);return ke.set(i,{t:Date.now(),data:g}),g}catch{return r?.data??[]}}async function Ce(n,t,e=14){let s=Ae.get(t);if(s&&Date.now()-s.t<10*6e4)return s.data;try{let i=new Date().toISOString(),r=new Date(Date.now()+e*864e5).toISOString(),o=await n.callApi("GET",`calendars/${t}?start=${i}&end=${r}`);return Ae.set(t,{t:Date.now(),data:o??[]}),o??[]}catch{return s?.data??[]}}var Ee=(n,t=100,e=24)=>{if(n.length<2)return"";let s=Math.min(...n),i=Math.max(...n),r=i-s||1;return n.map((o,c)=>`${c===0?"M":"L"}${(c/(n.length-1)*t).toFixed(1)},${(e-(o-s)/r*e).toFixed(1)}`).join(" ")};var u={label:"rgba(255,255,255,0.55)",value:"rgba(255,255,255,0.97)",muted:"rgba(255,255,255,0.45)",logLabel:"rgba(255,255,255,0.70)",logText:"rgba(255,255,255,0.88)",ok:"#4DFFC3",warn:"#FFD166",crit:"#FF6B6B",info:"#7EC8FF",tileBg:"rgba(255,255,255,0.045)",rowBg:"rgba(255,255,255,0.04)"},B={critical:"rgba(255,107,107,.16)",warning:"rgba(255,209,102,.14)",info:"rgba(126,200,255,.10)",ok:u.rowBg,none:"rgba(255,255,255,.025)"},O={critical:u.crit,warning:u.warn,info:u.info,ok:u.logText,none:"rgba(255,255,255,.35)"},pt={Seedling:{bg:"rgba(126,200,255,0.16)",color:"#7EC8FF"},Veg:{bg:"rgba(126,232,126,0.16)",color:"#7EE87E"},Bloom:{bg:"rgba(255,180,50,0.18)",color:"#FFB432"},Flush:{bg:"rgba(255,180,50,0.18)",color:"#FFB432"},Trocknung:{bg:"rgba(201,155,95,0.18)",color:"#C99B5F"}},S=n=>{let t=[];if(n?.background){let e=n.background.trim(),s=e.includes(",")&&!/^(linear|radial|conic|rgb|hsl)/i.test(e)?`linear-gradient(160deg, ${e})`:e;t.push(`--gc-bg:${s}`)}return n?.opacity!==void 0&&t.push(`--gc-opacity:${n.opacity}`),n?.accent&&t.push(`--gc-accent:${n.accent}`),n?.radius!==void 0&&t.push(`--gc-radius:${n.radius}px`),t.join(";")},q=n=>n.includes("critical")?"critical":n.includes("warning")?"warning":n.includes("info")?"info":"ok",k=Q`
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
    border: 1px solid rgba(255,255,255,.13);
    box-shadow: 0 14px 38px -16px rgba(0,0,0,.75), 0 2px 8px rgba(0,0,0,.35);
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
  .tile { background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.09);
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
`,P={ok:{bg:"rgba(77,255,195,.14)",color:u.ok,label:"Alles OK"},info:{bg:"rgba(126,200,255,.14)",color:u.info,label:"Info"},warning:{bg:"rgba(255,209,102,.16)",color:u.warn,label:"Warnung"},critical:{bg:"rgba(255,107,107,.18)",color:u.crit,label:"Fehler"}};var D=30,ht=4,Te=6,Ft=14,Ze=0;function Ke(n){if(n.length<3)return`M${n.map(e=>e.join(",")).join(" L")}`;let t=`M${n[0][0]},${n[0][1]}`;for(let e=0;e<n.length-1;e++){let s=n[Math.max(0,e-1)],i=n[e],r=n[e+1],o=n[Math.min(n.length-1,e+2)],c=i[0]+(r[0]-s[0])/6,a=i[1]+(r[1]-s[1])/6,h=r[0]-(o[0]-i[0])/6,g=r[1]-(o[1]-i[1])/6;t+=` C${c.toFixed(1)},${a.toFixed(1)} ${h.toFixed(1)},${g.toFixed(1)} ${r[0]},${r[1]}`}return t}function H(n,t={}){let e=`gcg${Ze++}`,s=t.w??300,i=t.h??110,r=n.flatMap(m=>m.data);if(!r.length)return l`<div style="height:${i}px;display:flex;align-items:center;justify-content:center;
    font-size:11px;color:rgba(255,255,255,.35)">Keine Verlaufsdaten</div>`;let o=t.min??Math.min(...r,t.band?.min??1/0),c=t.max??Math.max(...r,t.band?.max??-1/0);c-o<.001&&(c+=1,o-=1);let a=(c-o)*.08;o-=a,c+=a;let h=(m,x)=>D+m/Math.max(1,x-1)*(s-D-ht),g=m=>Te+(1-(m-o)/(c-o))*(i-Te-Ft),f=t.grid??3,v=m=>Math.abs(m)>=100?m.toFixed(0):Math.abs(m)>=10?m.toFixed(1):m.toFixed(2);return l`<svg viewBox="0 0 ${s} ${i}" preserveAspectRatio="none" style="width:100%;height:${i}px;display:block">
    ${t.band&&(t.band.min!==void 0||t.band.max!==void 0)?nt`
      <rect x="${D}" y="${g(t.band.max??c)}" width="${s-D-ht}"
        height="${Math.max(0,g(t.band.min??o)-g(t.band.max??c))}"
        fill="${t.band.color??"rgba(77,255,195,.08)"}" />`:d}
    ${Array.from({length:f+1},(m,x)=>{let w=o+(c-o)*x/f;return nt`
        <line x1="${D}" y1="${g(w)}" x2="${s-ht}" y2="${g(w)}"
          stroke="rgba(255,255,255,.07)" stroke-width="1"/>
        <text x="${D-4}" y="${g(w)+3}" text-anchor="end"
          font-size="8" fill="rgba(255,255,255,.4)">${v(w)}</text>`})}
    ${n.map((m,x)=>{if(m.data.length<2)return d;let w=m.data.map((b,A)=>[Number(h(A,m.data.length).toFixed(1)),Number(g(b).toFixed(1))]),E=Ke(w),L=w[w.length-1][0],F=w[w.length-1][1];return nt`
        <defs>
          <linearGradient id="${e}-${x}" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="${m.color}" stop-opacity=".32"/>
            <stop offset="100%" stop-color="${m.color}" stop-opacity="0"/>
          </linearGradient>
        </defs>
        ${m.fill!==!1?nt`<path
          d="${E} L${L},${i-Ft} L${D},${i-Ft} Z"
          fill="url(#${e}-${x})"/>`:d}
        <path d="${E}" fill="none" stroke="${m.color}" stroke-width="2.2"
          stroke-linejoin="round" stroke-linecap="round"/>
        <circle cx="${L}" cy="${F}" r="6" fill="${m.color}" opacity=".18"/>
        <circle cx="${L}" cy="${F}" r="3" fill="${m.color}"/>
        <circle cx="${L}" cy="${F}" r="1.3" fill="rgba(10,14,18,.9)"/>`})}
    <text x="${D}" y="${i-3}" font-size="8" fill="rgba(255,255,255,.35)">-24h</text>
    <text x="${s-ht}" y="${i-3}" text-anchor="end" font-size="8" fill="rgba(255,255,255,.35)">jetzt</text>
  </svg>`}var Le=n=>l`
  <div style="display:flex;gap:12px;flex-wrap:wrap;margin-top:4px">
    ${n.filter(t=>t.name).map(t=>l`<span style="display:inline-flex;align-items:center;gap:5px;
      font-size:10px;color:rgba(255,255,255,.6)">
      <span style="width:10px;height:3px;border-radius:2px;background:${t.color}"></span>${t.name}</span>`)}
  </div>`;var Ot=n=>n.toLowerCase().replace(/ä/g,"a").replace(/ö/g,"o").replace(/ü/g,"u").replace(/ß/g,"ss").replace(/[^a-z0-9]+/g,"_").replace(/^_+|_+$/g,""),gt=(n,t,e,s,i)=>i?.[s]??`${n}.growctrl_${Ot(t)}_${Ot(e)}_${s}`,ut=(n,t,e,s)=>s?.[e]??`${n}.growctrl_zelt_${Ot(t)}_${e}`,Fe={auto:["switch","automatik","auto"],wartung:["switch","wartung","maintenance"],stage:["select","wachstumsphase","stage"],lightOn:["time","licht_an","light_on"],lightOffSv:["time","licht_aus_seedling_veg","light_off_sv"],lightOffBloom:["time","licht_aus_bloom_flush","light_off_bloom"],lightRest:["sensor","licht_restzeit","light_rest"],pumpRest:["sensor","pumpe_restzeit","pump_rest"],age:["sensor","alter_seit_keimung","plant_age"],rec:["sensor","phasen_empfehlung","stage_recommendation"],event:["sensor","letztes_ereignis","last_event"],dli:["sensor","dli_heute","dli_today"],dliFc:["sensor","dli_prognose","dli_forecast"],germination:["date","keimstart","germination"],overrideMin:["number","manuelle_ubernahme","override_minutes"],pOverride:["binary_sensor","manueller_eingriff","problem_override"],pFailsafe:["binary_sensor","licht_failsafe","problem_light_failsafe"],pTime:["binary_sensor","lichtzeiten_unvollstandig","problem_time_invalid"],pPump:["binary_sensor","pumpe_gesperrt_fullstand","problem_pump_blocked"],pPower:["binary_sensor","licht_ohne_leistung","problem_power"]},mt={enabled:["switch","zelt_aktiv","tent_enabled"],climate:["switch","klima_automatik","climate_enabled"],mode:["select","klima_modus","climate_mode"],phase:["select","klima_phase","climate_phase"],vpd:["sensor","vpd","vpd"],status:["sensor","status","status"],event:["sensor","letztes_ereignis","last_event"]};var y=class extends z{constructor(){super(...arguments);this._config={};this._confirm=null}static{this.properties={hass:{attribute:!1},_config:{state:!0},_confirm:{state:!0}}}setConfig(e){this.validateConfig(e),this._config=e}validateConfig(e){}getCardSize(){return 4}st(e){return e?this.hass?.states[e]?.state:void 0}isOn(e){return this.st(e)==="on"}friendly(e){return e&&this.hass?.states[e]?.attributes?.friendly_name||e||""}unit(e){return e&&this.hass?.states[e]?.attributes?.unit_of_measurement||""}moreInfo(e){this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:e},bubbles:!0,composed:!0}))}navigate(e){history.pushState(null,"",e),window.dispatchEvent(new CustomEvent("location-changed"))}toggle(e){let s=e.split(".")[0],i=["switch","input_boolean","light","fan"].includes(s)?s:"homeassistant";this.hass.callService(i,"toggle",{entity_id:e})}confirmToggle(e,s){this._confirm={text:`${s} wirklich schalten?`,action:()=>this.toggle(e)}}renderConfirm(){return this._confirm?l`<div style="position:absolute;inset:0;background:rgba(0,0,0,.6);border-radius:16px;
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
    </div>`:d}};var qe=["VPD","RH"],Xe=["Auto","Seedling","Veg","Bloom","Trocknung"],Pt=class extends y{constructor(){super(...arguments);this._hist=[]}static{this.styles=k}static{this.properties={...y.properties,_hist:{state:!0}}}validateConfig(e){if(!e.tent)throw new Error("growctrl-tent-card: 'tent' ist Pflicht (Zelt-Name aus der Integration).")}static getConfigElement(){return document.createElement("growctrl-tent-editor")}static getStubConfig(){return{tent:"gross"}}e(e){let[s,i,r]=mt[e],o=this._config;return o.overrides?.[i]??W(this.hass,o.tent,"zelt",r)??ut(s,o.tent,i,o.overrides)}_select(e,s){this.hass.callService("select","select_option",{entity_id:e,option:s})}connectedCallback(){super.connectedCallback(),this._load(),this._timer=window.setInterval(()=>this._load(),5*6e4)}disconnectedCallback(){super.disconnectedCallback(),this._timer&&clearInterval(this._timer)}async _load(){if(!this.hass){setTimeout(()=>this._load(),1e3);return}this._hist=await M(this.hass,this.e("vpd"),this._config.hours??24)}chips(e,s,i){return l`<div style="display:flex;gap:5px;flex-wrap:wrap">
      ${s.map(r=>l`<button class="gc" style="padding:4px 11px;border-radius:9px;font-size:10.5px;
          font-weight:700;transition:all .15s;
          background:${r===i?"rgba(77,255,195,.13)":"rgba(255,255,255,.04)"};
          border:1.5px solid ${r===i?u.ok:"rgba(255,255,255,.09)"};
          color:${r===i?u.ok:"rgba(255,255,255,.45)"}"
        @click=${()=>this._select(e,r)}>${r}</button>`)}
    </div>`}render(){let e=this._config;if(!this.hass)return d;let s=this.hass.states[this.e("vpd")],i=!s&&!this.hass.states[this.e("enabled")],r=C(s?.state)??(i?1.06:null),o=s?.attributes?.temp,c=s?.attributes?.rh,a=s?.attributes?.phase_effektiv??"Veg",h=s?.attributes?.sollwerte,g=this.isOn(this.e("enabled")),f=this.isOn(this.e("climate")),v=this.hass.states[this.e("status")],m=v?.attributes?.probleme??[],x=v?.state==="problem"?"warning":g?"ok":"none",w=P[x]??P.none,E=this.hass.states[this.e("event")],L=r!==null&&h&&r>=h.vpd_min&&r<=h.vpd_max,F=(A,$,T,R)=>l`
      <button class="gc" style="flex:1;display:flex;align-items:center;justify-content:center;gap:7px;
          padding:9px 10px;border-radius:13px;transition:all .18s;
          background:${T?"rgba(77,255,195,.12)":"rgba(255,255,255,.05)"};
          border:1.5px solid ${T?u.ok:"rgba(255,255,255,.12)"};
          color:${T?u.ok:"rgba(255,255,255,.5)"}"
        @click=${()=>this.confirmToggle(A,$)}>
        <ha-icon .icon=${R} style="--mdc-icon-size:15px"></ha-icon>
        <span style="font-size:11px;font-weight:800">${$} ${T?"AN":"AUS"}</span>
      </button>`,b=(A,$,T,R)=>l`
      <div class="tile" style="text-align:center">
        <div class="lbl">${A}</div>
        <div class="val" style="font-size:22px;${R?`color:${R}`:""}">${$}<span class="unit">${T}</span></div>
      </div>`;return l`<div class="card ${e.style?.glass?"glass":""}" data-level=${x==="none"?"ok":x}
        style="${S(e.style)};position:relative">
      <div class="hdr">
        <div>
          <div class="title">${e.name??`Zelt ${e.tent}`}</div>
          <div class="subtitle">Klima \u00b7 Phase ${a}${h?` \xB7 Soll ${h.vpd_min}\u2013${h.vpd_max} kPa / ${h.rh_min}\u2013${h.rh_max} %`:""}</div>
        </div>
        <span class="status-pill" style="background:${w.bg};color:${w.color}">
          <span class="dot" style="background:${w.color}"></span>${g?w.label:"Deaktiviert"}</span>
      </div>

      <div style="display:flex;gap:8px;margin-top:12px">
        ${F(this.e("enabled"),"Zelt",g,"mdi:power")}
        ${F(this.e("climate"),"Klima",f,"mdi:thermostat")}
      </div>

      <div class="kpis cols-3" style="margin-top:10px">
        ${b("Temperatur",o!=null?Number(o).toFixed(1):"\u2013","\xB0C")}
        ${b("Luftfeuchte",c!=null?String(Math.round(Number(c))):"\u2013","%")}
        ${b("VPD",r!==null?r.toFixed(2):"\u2013","kPa",r===null?void 0:L?u.ok:"#FFD166")}
      </div>

      <div style="display:flex;gap:14px;flex-wrap:wrap;margin-top:11px;align-items:center">
        <span class="lbl" style="margin:0">Modus</span>
        ${this.chips(this.e("mode"),qe,this.st(this.e("mode"))??"VPD")}
        <span class="lbl" style="margin:0">Phase</span>
        ${this.chips(this.e("phase"),Xe,this.st(this.e("phase"))??"Auto")}
      </div>

      ${e.show_chart!==!1&&this._hist.length>1?l`
        <div class="seclbl">VPD \u00b7 ${e.hours??24}h</div>
        ${H([{data:this._hist,color:L===!1?"#FFD166":u.ok}],{h:100,band:h?{min:h.vpd_min,max:h.vpd_max}:void 0,grid:3})}`:d}

      ${m.length?l`<div style="margin-top:9px">
        ${m.map(A=>l`<div class="logrow" style="background:rgba(255,209,102,.08);margin-top:4px">
          <span class="txt" style="color:#FFD166">\u26A0 ${A}</span></div>`)}</div>`:d}

      ${E?l`<button class="gc logrow" style="width:100%;margin-top:9px;text-align:left"
          @click=${()=>this.moreInfo(this.e("event"))}>
          <span class="dot" style="background:${O[E.attributes?.schweregrad]??u.info};flex-shrink:0"></span>
          <span class="txt" style="color:rgba(255,255,255,.6)">${E.state}</span>
        </button>`:d}
      ${this.renderConfirm()}
    </div>`}};customElements.define("growctrl-tent-card",Pt);var Rt=class extends _{render(){let t=[this.tentSelect(),this.stationSelect(this._config?.tent),p.text("name","Anzeigename (optional)"),p.bool("show_settings","Einstellungen-Zahnrad anzeigen"),p.select("age_format","Alter anzeigen als",[{value:"auto",label:"Automatisch (ab Woche 2 in Wochen)"},{value:"tage",label:"Immer Tage"},{value:"wochen",label:"Immer Wochen"}])];return l`${this.form(t)}
      ${this.styleSection()}
      <div class="hint">Entity-IDs werden automatisch abgeleitet
        (z.B. <code>switch.growctrl_gross_main1_automatik</code>). Abweichende IDs
        per YAML: <code>overrides: { automatik: switch.mein_schalter }</code></div>`}};customElements.define("growctrl-station-editor",Rt);var Qe=["Seedling","Veg","Bloom","Flush","Trocknung"],zt=class extends y{constructor(){super(...arguments);this._open=!1}static{this.styles=k}static{this.properties={...y.properties,_open:{state:!0}}}validateConfig(e){if(!e.tent||!e.station)throw new Error("growctrl-station-card: 'tent' und 'station' sind Pflicht (wie in der Integration angelegt).")}static getConfigElement(){return document.createElement("growctrl-station-editor")}static getStubConfig(){return{tent:"gross",station:"main1"}}get isPreview(){return!this.hass?.states?.[this.e("stage")]}e(e){let[s,i,r]=Fe[e],o=this._config;return o.overrides?.[i]??W(this.hass,o.tent,o.station,r)??gt(s,o.tent,o.station,i,o.overrides)}_select(e,s){this.hass.callService("select","select_option",{entity_id:e,option:s})}render(){let e=this._config;if(!this.hass)return d;let s=this.isPreview,i=this.st(this.e("stage"))??"Veg",r=pt[i]??pt.Veg,o=this.isOn(this.e("auto"))||s,c=this.isOn(this.e("wartung")),a=[{e:this.e("pOverride"),label:"Manueller Eingriff"},{e:this.e("pFailsafe"),label:"Licht-Failsafe"},{e:this.e("pTime"),label:"Zeiten unvollst\xE4ndig"},{e:this.e("pPump"),label:"Pumpe gesperrt (F\xFCllstand)"},{e:this.e("pPower"),label:"Licht ohne Leistung"}].filter($=>this.isOn($.e)),h=this.hass.states[this.e("event")],g=a.length?this.isOn(this.e("pFailsafe"))?"critical":"warning":h?.attributes?.schweregrad==="critical"?"warning":"ok",f=P[g]??P.ok,v=C(this.st(this.e("dli")))??(s?18.4:null),m=C(this.st(this.e("dliFc")))??(s?24.7:null),x=this.hass.states[this.e("dli")]?.attributes?.ziel_aktuelle_phase,w=C(this.st(this.e("age")))??(s?24:null),E=this.st(this.e("rec")),L=!!this.hass.states[this.e("pumpRest")]||s,F=!!this.hass.states[this.e("dli")]||s,b=($,T,R,Pe)=>l`
      <div class="tile" style="min-width:0">
        <div class="lbl">${$}</div>
        <div style="font-size:19px;font-weight:800;letter-spacing:-.3px;line-height:1.15;
          color:${Pe??"rgba(255,255,255,.92)"}">${T}</div>
        ${R?l`<div style="font-size:10px;color:rgba(255,255,255,.45);margin-top:2px">${R}</div>`:d}
      </div>`,A=($,T)=>l`
      <button class="gc tile" style="text-align:left;min-width:0" @click=${()=>this.moreInfo($)}>
        <div class="lbl">${T}</div>
        <div style="font-size:14px;font-weight:700;color:rgba(255,255,255,.85)">
          ${this.st($)??"\u2013"}</div>
      </button>`;return l`<div class="card ${e.style?.glass?"glass":""}" data-level=${g}
        style="${S(e.style)};position:relative">
      <div class="hdr">
        <div style="min-width:0">
          <div class="title" style="display:flex;align-items:center;gap:8px">
            ${e.name??`${e.tent} \xB7 ${e.station}`}
            <span class="stagebadge" style="background:${r.bg};color:${r.color}">${i}</span>
          </div>
          <div class="subtitle" style="display:flex;align-items:center;gap:6px;margin-top:3px">
            <span class="dot" style="background:${f.color}"></span>${f.label}
            ${c?l`<span style="color:#FFD166;font-weight:700">\u00b7 Wartung</span>`:d}
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:6px">
          <button class="gc" title="Wartung (System greift nicht ein)"
            style="width:28px;height:28px;border-radius:9px;display:flex;align-items:center;justify-content:center;
              background:${c?"rgba(255,209,102,.16)":"rgba(255,255,255,.05)"};
              border:1px solid ${c?"rgba(255,209,102,.5)":"rgba(255,255,255,.1)"};
              color:${c?"#FFD166":"rgba(255,255,255,.5)"}"
            @click=${()=>this.toggle(this.e("wartung"))}>
            <ha-icon icon="mdi:wrench-outline" style="--mdc-icon-size:14px"></ha-icon></button>
          ${e.show_settings!==!1?l`<button class="gc" title="Einstellungen"
            style="width:28px;height:28px;border-radius:9px;display:flex;align-items:center;justify-content:center;
              background:${this._open?"rgba(255,255,255,.12)":"rgba(255,255,255,.05)"};
              border:1px solid rgba(255,255,255,.1);color:rgba(255,255,255,.55)"
            @click=${()=>{this._open=!this._open}}>
            <ha-icon icon="mdi:tune-variant" style="--mdc-icon-size:14px"></ha-icon></button>`:d}
          <button class="gc" style="padding:6px 13px;border-radius:12px;font-size:11px;font-weight:800;
              letter-spacing:.4px;transition:all .18s;
              background:${o?"rgba(77,255,195,.13)":"rgba(255,255,255,.05)"};
              border:1.5px solid ${o?u.ok:"rgba(255,255,255,.14)"};
              color:${o?u.ok:"rgba(255,255,255,.5)"}"
            @click=${()=>this.confirmToggle(this.e("auto"),"Automatik")}>
            AUTO ${o?"AN":"AUS"}</button>
        </div>
      </div>

      <div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:12px">
        ${Qe.map($=>{let T=pt[$],R=$===i;return l`<button class="gc" style="padding:5px 12px;border-radius:10px;font-size:11px;
              font-weight:700;transition:all .15s;
              background:${R?T.bg:"rgba(255,255,255,.04)"};
              border:1.5px solid ${R?T.color:"rgba(255,255,255,.09)"};
              color:${R?T.color:"rgba(255,255,255,.45)"}"
            @click=${()=>this._select(this.e("stage"),$)}>${$}</button>`})}
      </div>

      ${this.lightRow()}

      <div class="kpis cols-${(L?1:0)+(F?1:0)>=2?3:2}" style="margin-top:10px">
        ${L?b("Pumpe",s?"12 min":Lt(Number(this.st(this.e("pumpRest")))),s?"Restzeit (Demo)":"Restzeit"):d}
        ${F?b("DLI heute",v!==null?v.toFixed(1):"\u2013",x?`Ziel ${x} \xB7 Prognose ${m!==null?m.toFixed(1):"\u2013"}`:void 0,x&&v!==null&&v>=x?u.ok:void 0):d}
        ${b("Alter",w!==null?xe(w,e.age_format??"auto"):"\u2013",E&&E!==i?`\u2192 ${E} empfohlen`:this.hass.states[this.e("rec")]?.attributes?.hinweis?"Hinweis \u2013 antippen":"Phase passt",E&&E!==i?"#FFD166":void 0)}
      </div>

      ${a.length?l`<div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:10px">
        ${a.map($=>l`<span class="badge warn">\u26A0 ${$.label}</span>`)}</div>`:d}

      ${h?l`<button class="gc logrow" style="width:100%;margin-top:10px;text-align:left"
          @click=${()=>this.moreInfo(this.e("event"))}>
          <span class="dot" style="background:${O[h.attributes?.schweregrad==="ok"?"info":h.attributes?.schweregrad]??u.info};flex-shrink:0"></span>
          <span class="txt" style="color:rgba(255,255,255,.65)">${h.state}</span>
        </button>`:d}

      ${this._open?l`<div class="settings-grid" style="margin-top:10px">
        ${A(this.e("lightOn"),"Licht AN")}
        ${A(this.e("lightOffSv"),"AUS Seed/Veg")}
        ${A(this.e("lightOffBloom"),"AUS Bloom")}
        ${A(this.e("germination"),"Keimstart")}
        ${A(this.e("overrideMin"),"Man. \xDCbernahme")}
      </div>`:d}
      ${this.renderConfirm()}
    </div>`}lightRow(){if(this.isPreview)return this.lightRowView(!0,"Licht an f\xFCr 5 h 40 min",.62);let e=this.hass.states[this.e("lightRest")],s=Number(e?.state),i=e?.attributes??{},r=i.zustand?i.zustand==="an":void 0,o=i.text??(isNaN(s)?"\u2013":`Restzeit ${Lt(s)}`),c=typeof i.anteil=="number"?Math.min(1,Math.max(0,i.anteil)):null;return this.lightRowView(r,o,c)}lightRowView(e,s,i){let r=e===!1?"#7A8CA8":"#FFD166";return l`<div class="tile" style="margin-top:12px;display:flex;align-items:center;gap:12px">
      <ha-icon icon="${e===!1?"mdi:lightbulb-outline":"mdi:lightbulb-on"}"
        style="--mdc-icon-size:26px;color:${r};flex-shrink:0;
               ${e!==!1?`filter:drop-shadow(0 0 7px ${r})`:""}"></ha-icon>
      <div style="flex:1;min-width:0">
        <div style="font-size:13px;font-weight:700;color:rgba(255,255,255,.9)">${s}</div>
        ${i!==null?l`
          <div style="height:7px;border-radius:4px;background:rgba(255,255,255,.08);margin-top:6px;overflow:hidden">
            <div style="height:100%;width:${(i*100).toFixed(1)}%;border-radius:4px;
              background:linear-gradient(90deg, ${r}, ${r}cc);
              box-shadow:0 0 8px ${r}66;transition:width .6s"></div>
          </div>
          <div style="font-size:9.5px;color:rgba(255,255,255,.4);margin-top:3px">
            ${e===!1?"Dunkelphase":"Leuchtphase"} \u00b7 ${(i*100).toFixed(0)} % verbleibend</div>`:d}
      </div>
    </div>`}};customElements.define("growctrl-station-card",zt);var Je=[p.text("title","Titel"),p.num("columns","Spalten",1,6)],Ye=[p.entity("entity","Aktor",["switch","input_boolean","light","fan"]),p.text("name","Name (optional)"),p.text("group","Gruppe (optional, z.B. Zelt / Pflanzen)"),p.bool("confirm","Mit Best\xE4tigung schalten")],Mt=class extends _{render(){return l`${this.form(Je)}
      ${this.list({key:"controls",rowSchema:Ye,title:"Aktoren",addLabel:"Aktor hinzuf\xFCgen",newItem:()=>({entity:""})})}
      ${this.styleSection()}`}};customElements.define("growctrl-controls-editor",Mt);var ts={switch:"mdi:power",light:"mdi:lightbulb",fan:"mdi:fan",input_boolean:"mdi:toggle-switch"},It=class extends y{static{this.styles=k}validateConfig(t){if(!Array.isArray(t.controls)||!t.controls.length)throw new Error("growctrl-controls-card: 'controls' (min. 1 Eintrag) ist Pflicht.")}static getConfigElement(){return document.createElement("growctrl-controls-editor")}static getStubConfig(){return{controls:[{entity:"switch.beispiel"}]}}render(){let t=this._config;if(!this.hass)return d;let e=t.style?.accent??"#4DFFC3",s=new Map;t.controls.forEach(r=>{let o=r.group??"";s.has(o)||s.set(o,[]),s.get(o).push(r)});let i=t.columns?`repeat(${t.columns},1fr)`:"repeat(auto-fill,minmax(92px,1fr))";return l`<div class="card ${t.style?.glass?"glass":""}" style="${S(t.style)};position:relative">
      ${t.title?l`<div class="title" style="font-size:15px">${t.title}</div>`:d}
      ${[...s.entries()].map(([r,o])=>l`
        ${r?l`<div class="seclbl">${r}</div>`:d}
        <div class="grid" style="grid-template-columns:${i};gap:8px;margin-top:${r?0:10}px">
          ${o.map(c=>{let a=this.isOn(c.entity),h=c.name??this.friendly(c.entity),g=this.hass.states[c.entity],f=c.icon??g?.attributes?.icon??ts[c.entity.split(".")[0]]??"mdi:power";return l`<button class="gc" style="display:flex;flex-direction:column;align-items:center;gap:5px;
                padding:11px 6px 9px;border-radius:14px;transition:all .18s;min-width:0;
                background:${a?`color-mix(in srgb, ${e} 12%, transparent)`:"rgba(255,255,255,.04)"};
                border:1.5px solid ${a?e:"rgba(255,255,255,.08)"};
                box-shadow:${a?`0 4px 18px -8px ${e}`:"none"}"
              @click=${()=>c.confirm?this.confirmToggle(c.entity,h):this.toggle(c.entity)}>
              <span style="width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;
                  transition:all .18s;
                  background:${a?e:"rgba(255,255,255,.07)"};
                  color:${a?"#0C1117":"rgba(255,255,255,.55)"}">
                <ha-icon .icon=${f} style="--mdc-icon-size:18px"></ha-icon>
              </span>
              <span style="font-size:11px;font-weight:700;max-width:100%;overflow:hidden;white-space:nowrap;
                  text-overflow:ellipsis;color:${a?"rgba(255,255,255,.95)":"rgba(255,255,255,.65)"}">
                ${h}${c.confirm?" \u{1F512}":""}</span>
              <span style="font-size:9px;font-weight:800;letter-spacing:.8px;
                  color:${a?e:"rgba(255,255,255,.35)"}">${a?"AN":"AUS"}</span>
            </button>`})}
        </div>`)}
      ${this.renderConfirm()}
    </div>`}};customElements.define("growctrl-controls-card",It);var es=[p.text("title","Titel"),p.num("columns","Spalten",1,6),p.num("sparkline_hours","Sparkline-Zeitraum (h)",1,168)],ss=[p.entity("entity","Sensor","sensor"),p.text("name","Name (optional)"),p.num("min","Sollbereich Min (optional)"),p.num("max","Sollbereich Max (optional)")],Nt=class extends _{render(){return l`${this.form(es)}
      ${this.list({key:"sensors",rowSchema:ss,title:"Sensoren",addLabel:"Sensor hinzuf\xFCgen",newItem:()=>({entity:""})})}
      ${this.styleSection()}`}};customElements.define("growctrl-sensors-editor",Nt);var Bt=class extends y{constructor(){super(...arguments);this._hist={}}static{this.styles=k}static{this.properties={...y.properties,_hist:{state:!0}}}validateConfig(e){if(!Array.isArray(e.sensors)||!e.sensors.length)throw new Error("growctrl-sensors-card: 'sensors' (min. 1 Eintrag) ist Pflicht.")}static getConfigElement(){return document.createElement("growctrl-sensors-editor")}static getStubConfig(){return{sensors:[{entity:"sensor.beispiel"}]}}connectedCallback(){super.connectedCallback(),this._load(),this._timer=window.setInterval(()=>this._load(),5*6e4)}disconnectedCallback(){super.disconnectedCallback(),this._timer&&clearInterval(this._timer)}async _load(){if(!this.hass){setTimeout(()=>this._load(),1e3);return}let e=this._config,s={};for(let i of e.sensors)s[i.entity]=await M(this.hass,i.entity,e.sparkline_hours??24);this._hist=s}bad(e,s){return e!==null&&(s.min!==void 0&&e<s.min||s.max!==void 0&&e>s.max)}render(){let e=this._config;if(!this.hass)return d;let s=e.columns??2,i=e.sensors.some(r=>this.bad(C(this.st(r.entity)),r));return l`<div class="card ${e.style?.glass?"glass":""}" data-level=${i?"warning":"ok"}
        style=${S(e.style)}>
      ${e.title?l`<div class="title" style="font-size:15px;margin-bottom:2px">${e.title}</div>`:d}
      <div class="grid" style="grid-template-columns:repeat(${s},1fr)">
        ${e.sensors.map(r=>{let o=C(this.st(r.entity)),c=this.bad(o,r),a=Ee(this._hist[r.entity]??[],100,26),h=r.name??this.friendly(r.entity);return l`<button class="gc tile" style="text-align:left;position:relative;overflow:hidden;
              ${c?"border-color:rgba(255,107,107,.45);background:rgba(255,107,107,.08)":""}"
            @click=${()=>this.moreInfo(r.entity)}>
            ${a?l`<svg viewBox="0 0 100 26" preserveAspectRatio="none"
              style="position:absolute;left:0;right:0;bottom:0;width:100%;height:30px;opacity:.5">
              <path d="${a} L100,26 L0,26 Z" fill="${c?"rgba(255,107,107,.25)":"rgba(77,255,195,.18)"}"/>
              <path d="${a}" fill="none" stroke="${c?u.crit:"rgba(77,255,195,.8)"}" stroke-width="1.4"/>
            </svg>`:d}
            <div class="lbl" style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${h}</div>
            <div class="val" style="font-size:22px;${c?`color:${u.crit}`:""}">${o!==null?o:"--"}<span class="unit">${this.unit(r.entity)}</span></div>
            <div style="height:14px"></div>
          </button>`})}
      </div>
    </div>`}};customElements.define("growctrl-sensors-card",Bt);var is=[p.text("title","Titel"),p.num("columns","Spalten",1,4),p.entity("calendar","Kalender (optional)","calendar")],ns=[p.text("name","Pflanzenname"),p.text("strain","Sorte (optional)"),p.entity("germination_helper","Keimdatum-Helper (optional)",["input_datetime","date","datetime"]),p.entities("sensors","Sensoren der Pflanze (optional)","sensor"),p.entity("camera","Kamera (Live-Bild, optional)","camera"),p.text("image","Bild-URL (optional, statt Kamera)")],Dt=class extends _{render(){return l`${this.form(is)}
      ${this.list({key:"plants",rowSchema:ns,title:"Pflanzen",addLabel:"Pflanze hinzuf\xFCgen",newItem:()=>({name:"Pflanze"})})}
      ${this.styleSection()}`}};customElements.define("growctrl-plants-editor",Dt);var Ht=class extends y{constructor(){super(...arguments);this._events=[];this._tick=0}static{this.styles=k}static{this.properties={...y.properties,_events:{state:!0},_tick:{state:!0}}}validateConfig(e){if(!Array.isArray(e.plants)||!e.plants.length)throw new Error("growctrl-plants-card: 'plants' (min. 1 Eintrag) ist Pflicht.")}static getConfigElement(){return document.createElement("growctrl-plants-editor")}static getStubConfig(){return{plants:[{name:"Pflanze 1"}]}}connectedCallback(){super.connectedCallback(),this._load(),this._timer=window.setInterval(()=>this._load(),10*6e4),this._mediaTimer=window.setInterval(()=>{this._tick++},1e4)}disconnectedCallback(){super.disconnectedCallback(),this._timer&&clearInterval(this._timer),this._mediaTimer&&clearInterval(this._mediaTimer)}async _load(){let e=this._config;if(e.calendar){if(!this.hass){setTimeout(()=>this._load(),1e3);return}this._events=(await Ce(this.hass,e.calendar)).slice(0,3)}}render(){let e=this._config;return this.hass?l`<div class="card ${e.style?.glass?"glass":""}" style=${S(e.style)}>
      ${e.title?l`<div class="title" style="font-size:15px">${e.title}</div>`:d}
      <div class="grid" style="grid-template-columns:repeat(${e.columns??2},1fr)">
        ${e.plants.map(s=>{let i=s.germination_helper?this.st(s.germination_helper):void 0,r=i?ve(i):null,o=s.camera?this.hass.states[s.camera]?.attributes?.entity_picture?`${this.hass.states[s.camera].attributes.entity_picture}&t=${this._tick}`:void 0:s.image;return l`<div class="tile" style="overflow:hidden">
            ${o?l`<button class="gc" style="display:block;width:calc(100% + 26px);margin:-11px -13px 9px"
                @click=${()=>s.camera&&this.moreInfo(s.camera)}>
                <img src=${o} style="width:100%;height:120px;object-fit:cover;display:block" loading="lazy"
                  alt=${s.name} /></button>`:d}
            <div style="display:flex;align-items:baseline;gap:6px;flex-wrap:wrap">
              <span style="font-size:13px;font-weight:800">\u{1F331} ${s.name}</span>
              ${s.strain?l`<span style="font-size:10px;color:rgba(255,255,255,.55)">${s.strain}</span>`:d}
            </div>
            ${r!==null?l`<div class="lbl" style="margin-top:4px">Tag ${r}</div>`:d}
            ${(s.sensors??[]).map(c=>{let a=typeof c=="string"?{entity:c}:c;return l`
              <button class="gc" style="display:flex;justify-content:space-between;width:100%;font-size:11px;margin-top:4px;color:rgba(255,255,255,.75)"
                @click=${()=>this.moreInfo(a.entity)}>
                <span>${a.name??this.friendly(a.entity)}</span>
                <span style="font-weight:700">${C(this.st(a.entity))??"--"} ${this.unit(a.entity)}</span>
              </button>`})}
          </div>`})}
      </div>
      ${e.calendar?l`<div class="seclbl">Anstehend</div>
        ${this._events.length?this._events.map(s=>l`
          <div class="logrow" style="background:rgba(0,0,0,.18);margin-top:4px">
            <span class="txt">${s.summary}</span>
            <span class="ts">${(s.start?.date??s.start?.dateTime??"").substring(0,10)}</span>
          </div>`):l`<div class="logrow" style="background:rgba(0,0,0,.12)"><span class="txt" style="color:rgba(255,255,255,.35)">Keine Ereignisse</span></div>`}`:d}
    </div>`:d}};customElements.define("growctrl-plants-card",Ht);var rs=[p.text("title","Titel"),p.num("limit","Max. Zeilen",3,50),p.select("min_level","Anzeige",[{value:"alle",label:"Alle Ereignisse"},{value:"warnung",label:"Nur Warnungen/Fehler"}])],os=[p.entity("entity","Letztes-Ereignis-Sensor","sensor"),p.text("name","Label (optional)")],Ut=class extends _{render(){return l`${this.form(rs)}
      ${this.list({key:"sources",rowSchema:os,title:"Quellen",addLabel:"Quelle hinzuf\xFCgen",newItem:()=>({entity:""})})}
      ${this.styleSection()}`}};customElements.define("growctrl-status-editor",Ut);var Gt=class extends y{static{this.styles=k}validateConfig(t){if(!Array.isArray(t.sources)||!t.sources.length)throw new Error("growctrl-status-card: 'sources' (Letztes-Ereignis-Sensoren) ist Pflicht.")}static getConfigElement(){return document.createElement("growctrl-status-editor")}static getStubConfig(){return{sources:[{entity:"sensor.growctrl_gross_main1_letztes_ereignis"}]}}render(){let t=this._config;if(!this.hass)return d;let e=[],s=[];for(let a of t.sources){let h=this.hass.states[a.entity],g=h?.attributes?.verlauf??[];s.push(h?.attributes?.schweregrad??"ok"),g.forEach(f=>e.push({...f,src:a.name??this.friendly(a.entity)}))}e.reverse();let r=(t.min_level==="warnung"?e.filter(a=>a.level==="warning"||a.level==="critical"):e).slice(0,t.limit??12),o=q(s.map(a=>a==="ok"?"ok":a)),c=P[o];return l`<div class="card ${t.style?.glass?"glass":""}" data-level=${o} style=${S(t.style)}>
      <div class="hdr">
        <div class="title" style="font-size:15px">${t.title??"Ereignisprotokoll"}</div>
        <span class="status-pill" style="background:${c.bg};color:${c.color}">
          <span class="dot" style="background:${c.color}"></span>${c.label}</span>
      </div>
      <div style="margin-top:9px">
        ${r.length?r.map(a=>l`
          <div class="logrow" style="background:${a.level==="info"?"transparent":B[a.level]??"transparent"};
              margin-top:3px;padding:6px 9px">
            <span class="ts" style="min-width:36px;flex-shrink:0">${a.ts}</span>
            ${t.sources.length>1?l`<span style="font-size:10.5px;font-weight:800;min-width:62px;
              flex-shrink:0;color:rgba(255,255,255,.55)">${a.src}</span>`:d}
            <span class="txt" style="color:${a.level==="info"?"rgba(255,255,255,.6)":O[a.level]??"rgba(255,255,255,.6)"}">${a.text}</span>
          </div>`):l`<div class="logrow"><span class="txt" style="color:${u.ok}">
            \u2713 Noch keine Ereignisse</span></div>`}
      </div>
    </div>`}};customElements.define("growctrl-status-card",Gt);var as=[p.text("title","Titel (optional)"),p.text("logo","Logo-URL (z.B. /local/growctrl/logo.png)"),p.bool("show_chart","VPD-Chart anzeigen"),p.num("hours","Chart-Zeitraum (h)",1,168)],Vt=class extends _{render(){let t=[this.stationSelect(this._config?.tent),p.text("name","Label (optional)")];return l`${this.form([this.tentSelect(),...as])}
      ${this.list({key:"stations",rowSchema:t,title:"Stationen (Informationssystem)",addLabel:"Station hinzuf\xFCgen",newItem:()=>({station:""})})}
      ${this.styleSection()}`}};customElements.define("growctrl-hero-editor",Vt);var jt=class extends y{constructor(){super(...arguments);this._hist=[]}static{this.styles=k}static{this.properties={...y.properties,_hist:{state:!0}}}validateConfig(e){if(!e.tent)throw new Error("growctrl-hero-card: 'tent' ist Pflicht (Zelt-Name aus der Integration).")}static getConfigElement(){return document.createElement("growctrl-hero-editor")}static getStubConfig(){return{tent:"gross",stations:[{station:"main1"}]}}te(e){let[s,i,r]=mt[e],o=this._config;return o.overrides?.[i]??W(this.hass,o.tent,"zelt",r)??ut(s,o.tent,i,o.overrides)}connectedCallback(){super.connectedCallback(),this._load(),this._timer=window.setInterval(()=>this._load(),5*6e4)}disconnectedCallback(){super.disconnectedCallback(),this._timer&&clearInterval(this._timer)}async _load(){if(!this.hass){setTimeout(()=>this._load(),1e3);return}this._hist=await M(this.hass,this.te("vpd"),this._config.hours??24)}render(){let e=this._config;if(!this.hass)return d;let s=this.hass.states[this.te("vpd")],i=!s&&!this.hass.states[this.te("enabled")],r=C(s?.state)??(i?1.06:null),o=s?.attributes?.temp??(i?22.4:null),c=s?.attributes?.rh??(i?52:null),a=s?.attributes?.phase_effektiv??"",h=s?.attributes?.sollwerte,g=this.isOn(this.te("enabled"))||i,f=this.isOn(this.te("climate")),v=this.hass.states[this.te("status")],m=v?.attributes?.probleme??[],x=(e.stations??[]).map(b=>{let A=this.hass.states[W(this.hass,e.tent,b.station,"last_event")??gt("sensor",e.tent,b.station,"letztes_ereignis",e.overrides)],$=A?.attributes?.schweregrad??"ok";return{name:b.name??b.station,text:A?.state??"\u2013",level:$}}),w=q([v?.state==="problem"?"warning":"ok",...x.map(b=>b.level)]),E=P[w],L=[...m.map(b=>({label:b,level:"warning"})),...x.filter(b=>b.level!=="ok").map(b=>({label:`${b.name}: ${b.text}`,level:b.level}))],F=(b,A,$,T)=>l`
      <button class="gc" style="display:flex;align-items:center;gap:8px;padding:8px 15px;border-radius:14px;
          transition:all .18s;
          background:${$?"rgba(77,255,195,.12)":"rgba(255,255,255,.05)"};
          border:1.5px solid ${$?u.ok:"rgba(255,255,255,.12)"};
          color:${$?u.ok:"rgba(255,255,255,.5)"}"
        @click=${()=>this.confirmToggle(b,A)}>
        <ha-icon .icon=${T} style="--mdc-icon-size:16px"></ha-icon>
        <span style="font-size:11px;font-weight:800">${A} ${$?"AN":"AUS"}</span>
      </button>`;return l`<div class="card ${e.style?.glass?"glass":""}" data-level=${w}
        style="${S(e.style)};position:relative">
      <div class="hdr">
        <div style="display:flex;align-items:center;gap:11px">
          ${e.logo?l`<img src=${e.logo} alt="Logo"
            style="width:42px;height:42px;border-radius:11px;object-fit:contain;background:rgba(255,255,255,.92);padding:3px" />`:d}
          <div>
            <div class="title">${e.title??`GROWCTRL \xB7 ${e.tent}`}</div>
            ${a?l`<div class="subtitle">Klima-Phase ${a}</div>`:d}
          </div>
        </div>
        <span class="status-pill" style="background:${E.bg};color:${E.color}">
          <span class="dot" style="background:${E.color}"></span>${E.label}</span>
      </div>

      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:13px">
        ${F(this.te("enabled"),"Zelt",g,"mdi:power")}
        ${F(this.te("climate"),"Klima",f,"mdi:thermostat")}
      </div>

      <div class="kpis cols-3" style="margin-top:12px">
        <div class="tile" style="text-align:center"><div class="lbl">Temperatur</div>
          <div class="val" style="font-size:22px">${o!=null?Number(o).toFixed(1):"\u2013"}<span class="unit">\u00b0C</span></div></div>
        <div class="tile" style="text-align:center"><div class="lbl">Luftfeuchte</div>
          <div class="val" style="font-size:22px">${c!=null?Math.round(Number(c)):"\u2013"}<span class="unit">%</span></div></div>
        <div class="tile" style="text-align:center"><div class="lbl">VPD</div>
          <div class="val" style="font-size:22px;color:${r!==null&&h&&r>=h.vpd_min&&r<=h.vpd_max?u.ok:"#FFD166"}">${r!==null?r.toFixed(2):"\u2013"}<span class="unit">kPa</span></div></div>
      </div>

      ${this.vpdZoneBar(r,h??null)}

      ${e.show_chart!==!1&&this._hist.length>1?l`
        <div class="seclbl">VPD \u00b7 ${e.hours??24}h</div>
        ${H([{data:this._hist,color:u.ok}],{h:100,band:h?{min:h.vpd_min,max:h.vpd_max}:void 0,grid:3})}`:d}

      ${x.length?l`<div class="seclbl">Stationen</div>
        ${x.map(b=>l`<div class="logrow" style="margin-top:3px;padding:6px 9px">
          <span class="dot" style="background:${b.level==="ok"?u.ok:O[b.level]??u.warn};flex-shrink:0"></span>
          <span style="font-size:11px;font-weight:800;min-width:62px;flex-shrink:0;
            color:rgba(255,255,255,.8)">${b.name}</span>
          <span class="txt" style="color:rgba(255,255,255,.55)">${b.text}</span>
        </div>`)}`:d}

      <div class="seclbl">Informationssystem</div>
      ${L.length?L.map(b=>l`<div class="logrow" style="background:${B[b.level]??B.warning};margin-top:4px">
            <span class="txt" style="color:${O[b.level]??O.warning}">\u26A0 ${b.label}</span></div>`):l`<div class="logrow" style="background:${B.ok};margin-top:4px">
            <span class="txt" style="color:${u.ok}">\u2713 Alle Systeme arbeiten normal</span></div>`}
      ${this.renderConfirm()}
    </div>`}vpdZoneBar(e,s){let i=[{to:.4,col:"#5B8DEF",lbl:"zu feucht"},{to:.8,col:"#58E0A5",lbl:"Seedling"},{to:1.2,col:"#34D17B",lbl:"Veg"},{to:1.6,col:"#FFB35C",lbl:"Bloom"},{to:2,col:"#FF6B6B",lbl:"zu trocken"}],r=2,o=e!==null?Math.min(1,Math.max(0,e/r))*100:null,c=0;return l`<div style="margin-top:12px">
      <div style="position:relative;height:12px;border-radius:6px;
                  display:flex;box-shadow:inset 0 1px 3px rgba(0,0,0,.4)">
        ${i.map(a=>{let h=(a.to-c)/r*100,g=c===0;return c=a.to,l`<div style="width:${h}%;background:${a.col};opacity:.75;
            ${g?"border-radius:6px 0 0 6px;":""}
            ${a.to===r?"border-radius:0 6px 6px 0;":""}"></div>`})}
        ${s?l`<div style="position:absolute;top:-2px;bottom:-2px;
          left:${s.vpd_min/r*100}%;width:${(s.vpd_max-s.vpd_min)/r*100}%;
          border:1.5px solid rgba(255,255,255,.85);border-radius:4px;pointer-events:none"></div>`:d}
        ${o!==null?l`<div style="position:absolute;top:-4px;bottom:-4px;left:${o}%;
          width:3px;margin-left:-1.5px;background:#fff;border-radius:2px;
          box-shadow:0 0 6px rgba(255,255,255,.9)"></div>`:d}
      </div>
      <div style="display:flex;margin-top:4px">
        ${(()=>{let a=0;return i.map(h=>{let g=(h.to-a)/r*100;return a=h.to,l`<div style="width:${g}%;text-align:center;font-size:8.5px;
            color:rgba(255,255,255,.45);overflow:hidden;white-space:nowrap">${h.lbl}</div>`})})()}
      </div>
    </div>`}};customElements.define("growctrl-hero-card",jt);var ls=[p.text("title","Titel"),p.bool("compact","Kompakte Zeilen")],cs=[p.text("name","Name (z.B. Main 1)"),p.entity("entity","Quelle (Log / Problem- / Ereignis-Sensor)",["input_text","binary_sensor","sensor"]),p.select("type","Typ",[{value:"station",label:"Stations-Log"},{value:"climate",label:"Klima-Log"},{value:"problem",label:"Problem-Sensor"},{value:"event",label:"Ereignis-Sensor (Integration)"}])],Wt=class extends _{render(){return l`${this.form(ls)}
      ${this.list({key:"rows",rowSchema:cs,title:"Zeilen",addLabel:"Zeile hinzuf\xFCgen",newItem:()=>({name:"",entity:"",type:"station"})})}
      ${this.styleSection()}`}};customElements.define("growctrl-checkup-editor",Wt);var Zt=class extends y{static{this.styles=k}validateConfig(t){if(!Array.isArray(t.rows)||!t.rows.length)throw new Error("growctrl-checkup-card: 'rows' (min. 1 Eintrag) ist Pflicht.")}static getConfigElement(){return document.createElement("growctrl-checkup-editor")}static getStubConfig(){return{rows:[{name:"Main 1",entity:"input_text.hydro_log_mittel_main1"}]}}render(){let t=this._config;if(!this.hass)return d;let e=t.rows.map(o=>{if(o.type==="event"){let a=this.hass.states[o.entity],h=a?.attributes?.schweregrad??"ok";return{row:o,level:h==="ok"?"ok":h,label:a?.state??"\u2013",ts:""}}if(o.type==="problem"){let a=this.isOn(o.entity);return{row:o,level:a?"warning":"ok",label:a?"Problem erkannt":"OK",ts:""}}let c=(o.type==="climate"?we:Se)(this.st(o.entity));return{row:o,level:c.level==="none"?"ok":c.level,label:c.label,ts:c.ts??""}}),s=q(e.map(o=>o.level)),i=P[s],r=o=>o==="critical"?u.crit:o==="warning"?u.warn:o==="info"?u.info:u.ok;return l`<div class="card ${t.style?.glass?"glass":""}" data-level=${s} style=${S(t.style)}>
      <div class="hdr">
        <div class="title" style="font-size:15px">${t.title??"Checkup"}</div>
        <span class="status-pill" style="background:${i.bg};color:${i.color}">
          <span class="dot" style="background:${i.color}"></span>${i.label}</span>
      </div>
      <div style="margin-top:10px">
        ${e.map(o=>l`<div class="logrow" style="background:${t.compact?"transparent":B[o.level==="ok"?"none":o.level]};
            margin-top:${t.compact?2:5}px;padding:${t.compact?"4px 6px":"8px 11px"}">
          <span style="width:9px;height:9px;border-radius:50%;flex-shrink:0;background:${r(o.level)};
            box-shadow:0 0 7px ${r(o.level)}66"></span>
          <span style="font-size:11.5px;font-weight:800;min-width:64px;flex-shrink:0;color:rgba(255,255,255,.85)">${o.row.name}</span>
          <span class="txt" style="color:${o.level==="ok"?"rgba(255,255,255,.55)":O[o.level]}">${o.label}</span>
          ${o.ts?l`<span class="ts">${o.ts}</span>`:d}
        </div>`)}
      </div>
    </div>`}};customElements.define("growctrl-checkup-card",Zt);var ds=[p.text("title","Titel"),p.entity("entity","F\xFCllstand-Sensor (%) (Pflicht)","sensor"),p.num("min","Mindeststand (%)",0,100),p.num("volume_l","Tankvolumen (Liter, optional)",0,2e3)],Kt=class extends _{render(){return l`${this.form(ds)}${this.styleSection()}`}};customElements.define("growctrl-tank-editor",Kt);var qt=class extends y{static{this.styles=k}validateConfig(t){if(!t.entity)throw new Error("growctrl-tank-card: 'entity' (Fuellstand-Sensor in %) ist Pflicht.")}static getConfigElement(){return document.createElement("growctrl-tank-editor")}static getStubConfig(){return{entity:"sensor.gc_slot1_level1",title:"Tank"}}render(){let t=this._config;if(!this.hass)return d;let e=!this.hass.states[t.entity],s=Math.min(100,Math.max(0,C(this.st(t.entity))??(e?62:0))),i=t.min!==void 0&&s<t.min,r=i?u.crit:s<(t.min??0)+15?u.warn:"#4FC3F7",o=t.volume_l?s/100*t.volume_l:null;return l`<div class="card ${t.style?.glass?"glass":""}" data-level=${i?"critical":"ok"}
        style=${S(t.style)}>
      <div class="hdr">
        <div class="title" style="font-size:15px">${t.title??"F\xFCllstand"}</div>
        ${i?l`<span class="badge warn">\u26A0 Nachf\u00fcllen</span>`:d}
      </div>
      <div style="display:flex;align-items:center;gap:18px;margin-top:12px">
        <button class="gc" style="position:relative;width:74px;height:108px;flex-shrink:0;border-radius:12px 12px 16px 16px;
            border:2px solid rgba(255,255,255,.15);overflow:hidden;background:rgba(0,0,0,.3)"
          @click=${()=>this.moreInfo(t.entity)}>
          <div style="position:absolute;left:0;right:0;bottom:0;height:${s}%;transition:height .8s;
              background:linear-gradient(180deg, ${r}cc, ${r}88)">
            <div style="position:absolute;top:-5px;left:-10%;width:120%;height:10px;border-radius:50%;
              background:${r};opacity:.9"></div>
          </div>
          ${t.min!==void 0?l`<div style="position:absolute;left:0;right:0;bottom:${t.min}%;
            border-top:1.5px dashed rgba(255,107,107,.7)"></div>`:d}
        </button>
        <div style="flex:1;min-width:0">
          <div class="lbl">Aktueller F\u00fcllstand</div>
          <div class="val" style="font-size:34px;color:${r}">${Math.round(s)}<span class="unit">%</span></div>
          ${o!==null?l`<div style="font-size:12px;font-weight:600;color:rgba(255,255,255,.55);margin-top:2px">
            \u2248 ${o.toFixed(1)} l von ${t.volume_l} l</div>`:d}
          ${t.min!==void 0?l`<div style="font-size:10.5px;color:rgba(255,255,255,.4);margin-top:6px">
            Mindeststand ${t.min}%</div>`:d}
        </div>
      </div>
    </div>`}};customElements.define("growctrl-tank-card",qt);var ps=[p.text("title","Titel"),p.num("hours","Zeitraum (h)",1,168),p.num("height","Diagrammh\xF6he (px)",80,300)],hs=[p.entity("entity","Sensor","sensor"),p.text("name","Name (optional)"),p.text("color","Farbe (optional, z.B. #FF9F5A)")],Xt=class extends _{render(){return l`${this.form(ps)}
      ${this.list({key:"sensors",rowSchema:hs,title:"Serien",addLabel:"Sensor hinzuf\xFCgen",newItem:()=>({entity:""})})}
      ${this.styleSection()}`}};customElements.define("growctrl-history-editor",Xt);var Oe=["#FF9F5A","#4FC3F7","#4DFFC3","#C792EA"],Qt=class extends y{constructor(){super(...arguments);this._hist={}}static{this.styles=k}static{this.properties={...y.properties,_hist:{state:!0}}}validateConfig(e){if(!Array.isArray(e.sensors)||!e.sensors.length)throw new Error("growctrl-history-card: 'sensors' (min. 1 Eintrag) ist Pflicht.")}static getConfigElement(){return document.createElement("growctrl-history-editor")}static getStubConfig(){return{sensors:[{entity:"sensor.zelt_temperature"}],hours:24}}connectedCallback(){super.connectedCallback(),this._load(),this._timer=window.setInterval(()=>this._load(),5*6e4)}disconnectedCallback(){super.disconnectedCallback(),this._timer&&clearInterval(this._timer)}async _load(){if(!this.hass){setTimeout(()=>this._load(),1e3);return}let e=this._config,s={};for(let i of e.sensors)s[i.entity]=await M(this.hass,i.entity,e.hours??24);this._hist=s}render(){let e=this._config;if(!this.hass)return d;let s=e.sensors.map((i,r)=>({data:this._hist[i.entity]??[],color:i.color??Oe[r%Oe.length],name:`${i.name??this.friendly(i.entity)} \xB7 ${C(this.st(i.entity))??"--"} ${this.unit(i.entity)}`,fill:e.sensors.length===1}));return l`<div class="card ${e.style?.glass?"glass":""}" style=${S(e.style)}>
      <div class="hdr">
        <div class="title" style="font-size:15px">${e.title??"Verlauf"}</div>
        <span class="badge">${e.hours??24}h</span>
      </div>
      <div style="margin-top:8px">${H(s,{h:e.height??130,grid:3})}</div>
      ${Le(s)}
    </div>`}};customElements.define("growctrl-history-card",Qt);var gs=[p.text("title","Titel"),p.entity("entity","Sensor (Pflicht)","sensor"),p.text("name","Anzeigename (optional)"),p.num("min","Sollbereich Min"),p.num("max","Sollbereich Max"),p.num("decimals","Nachkommastellen",0,4),p.num("hours","Chart-Zeitraum (h)",1,168),p.num("height","Diagrammh\xF6he (px)",80,300)],Jt=class extends _{render(){return l`${this.form(gs)}${this.styleSection()}`}};customElements.define("growctrl-metric-editor",Jt);var Yt=class extends y{constructor(){super(...arguments);this._hist=[]}static{this.styles=k}static{this.properties={...y.properties,_hist:{state:!0}}}validateConfig(e){if(!e.entity)throw new Error("growctrl-metric-card: 'entity' ist Pflicht.")}static getConfigElement(){return document.createElement("growctrl-metric-editor")}static getStubConfig(){return{entity:"sensor.gc_slot1_ec1",name:"EC",min:1.2,max:2.2}}connectedCallback(){super.connectedCallback(),this._load(),this._timer=window.setInterval(()=>this._load(),5*6e4)}disconnectedCallback(){super.disconnectedCallback(),this._timer&&clearInterval(this._timer)}async _load(){if(!this.hass){setTimeout(()=>this._load(),1e3);return}let e=this._config;this._hist=await M(this.hass,e.entity,e.hours??24)}render(){let e=this._config;if(!this.hass)return d;let s=C(this.st(e.entity))??(this.hass.states[e.entity]?null:1.84),i=s!==null&&(e.min!==void 0&&s<e.min||e.max!==void 0&&s>e.max),r=s===null?"rgba(255,255,255,.4)":i?u.crit:u.ok,o=e.decimals??2;return l`<div class="card ${e.style?.glass?"glass":""}" data-level=${i?"warning":"ok"}
        style=${S(e.style)}>
      <div class="hdr">
        <div>
          <div class="lbl" style="font-size:10px;text-transform:uppercase;letter-spacing:.8px;color:rgba(255,255,255,.5);font-weight:700">
            ${e.name??this.friendly(e.entity)}</div>
          <button class="gc" @click=${()=>this.moreInfo(e.entity)}>
            <span class="val" style="font-size:36px;font-weight:800;letter-spacing:-1px;color:${r}">
              ${s!==null?s.toFixed(o):"--"}</span>
            <span class="unit" style="font-size:14px">${this.unit(e.entity)}</span>
          </button>
        </div>
        ${e.min!==void 0||e.max!==void 0?l`
          <div style="text-align:right">
            <div class="lbl">Sollbereich</div>
            <div style="font-size:13px;font-weight:700;color:${i?u.crit:"rgba(255,255,255,.7)"}">
              ${e.min??"\u2013"} \u2013 ${e.max??"\u2013"}</div>
            ${i?l`<div style="font-size:10px;font-weight:800;color:${u.crit};margin-top:2px">
              ${s<(e.min??-1/0)?"\u25BC ZU NIEDRIG":"\u25B2 ZU HOCH"}</div>`:d}
          </div>`:d}
      </div>
      <div style="margin-top:6px">
        ${H([{data:this._hist,color:i?u.crit:"#4DFFC3"}],{h:e.height??110,band:{min:e.min,max:e.max},grid:3})}
      </div>
    </div>`}};customElements.define("growctrl-metric-card",Yt);var us="2.6.0",ms=[{type:"growctrl-tent-card",name:"GROWCTRL Tent",description:"Zelt-Hero: Klima-KPIs, VPD-Skala, Status-Ampel"},{type:"growctrl-station-card",name:"GROWCTRL Station",description:"Station: Licht-/Pumpenbalken, Stage, Auto, Konfiguration"},{type:"growctrl-controls-card",name:"GROWCTRL Controls",description:"Aktoren-Raster mit Gruppen und Bestaetigung"},{type:"growctrl-sensors-card",name:"GROWCTRL Sensors",description:"Sensor-Kacheln mit Sparklines"},{type:"growctrl-plants-card",name:"GROWCTRL Plants",description:"Pflanzen, Keimdatum, Kalender"},{type:"growctrl-status-card",name:"GROWCTRL Status",description:"Ereignisprotokoll der Integration mit Schweregrad-Ampel"},{type:"growctrl-hero-card",name:"GROWCTRL Hero",description:"Globale Steuerung, Klima-KPIs, VPD-Chart, Informationssystem"},{type:"growctrl-checkup-card",name:"GROWCTRL Checkup",description:"Ampel-Uebersicht aller Zelte/Stationen mit Auswertung"},{type:"growctrl-tank-card",name:"GROWCTRL Tank",description:"DWC-Fuellstand mit Animation und Warnstufe"},{type:"growctrl-history-card",name:"GROWCTRL History",description:"24h-Diagramm (z.B. Temperatur + Luftfeuchte)"},{type:"growctrl-metric-card",name:"GROWCTRL Metric",description:"EC/pH gross mit Chart und Sollbereich"}];window.customCards=window.customCards??[];ms.forEach(n=>window.customCards.push({...n,preview:!0,documentationURL:"https://github.com/MrDarkvoid/growctrl"}));console.info(`%c GROWCTRL Cards %c v${us} `,"background:#1D9E75;color:#fff;font-weight:700","background:#0F6E56;color:#fff");
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
