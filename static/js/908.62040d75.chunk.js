"use strict";(self.webpackChunkownrecipes_web=self.webpackChunkownrecipes_web||[]).push([[908],{7412:(e,i,t)=>{t.d(i,{c:()=>n});var r=t(9060);function n(e,i){(0,r.useEffect)((()=>{null==i&&e()}),[e,i])}},712:(e,i,t)=>{t.r(i),t.d(i,{default:()=>De});var r=t(9060),n=t(6936),s=t(768),l=t(8224),a=t(8836),o=t(7804),c=t(880),u=t(544),d=t(4120),p=t(7640),m=t(3152),h=(t(3688),t(5640)),g=t(7748),b=t(7412),f=t(8330),v=t(7352),x=t(5016),j=t(2496);const _=(0,r.forwardRef)(((e,i)=>{let{parser:t,formatter:n,name:l,required:a,isMulti:o,onFocus:c,onBlur:u,...d}=e;const p=(0,s.c)(),h=(0,r.useCallback)((e=>null==e?o?[]:void 0:n(e)),[n,o]);return(0,j.jsx)(m.IN,{name:l,validate:a?v.o0:void 0,validateFields:[],children:e=>(0,j.jsx)(x.u,{...d,isMulti:o,required:a,name:e.input.name,value:h(e.input.value),errors:(0,v.MZ)(p,e.meta.error||(e.meta.dirtySinceLastSubmit?void 0:e.meta.submitError)),meta:e.meta,onChange:(i,r)=>{e.input.onChange(t(r))},onFocus:i=>{e.input.onFocus(i),null===c||void 0===c||c(i)},onBlur:i=>{e.input.onBlur(i),null===u||void 0===u||u(i)},ref:i})})})),C=e=>{let{name:i,label:t}=e;const n=(0,s.c)(),l=(0,o.OY)(),a=(0,r.useCallback)((()=>{l(g.y8())}),[]),c=(0,o.w1)((e=>e.recipeGroups.tags.items));(0,b.c)(a,c);const u=(0,r.useMemo)((()=>null===c||void 0===c?void 0:c.filter((e=>e.title.length>0)).map((e=>({value:e.title,label:(0,f.$Q)(n,"tag.",e.title)}))).sort(f.QH)),[c,n.locale]),d=(0,r.useCallback)((e=>{if(null!=e){const i=[];return e.forEach((e=>{const t=null===c||void 0===c?void 0:c.find((i=>i.title===e));i.push(null!==t&&void 0!==t?t:{title:e})})),i}}),[c]),p=(0,r.useCallback)((e=>h.c(e).map((e=>e.title))),[]);return(0,j.jsx)(_,{name:i,label:t,data:u,parser:d,formatter:p,isMulti:!0})},w=e=>{let{name:i,label:t}=e;const n=(0,s.c)(),l=(0,o.OY)(),a=(0,r.useCallback)((()=>{l(g.WG())}),[]),c=(0,o.w1)((e=>e.recipeGroups.courses.items));(0,b.c)(a,c);const u=(0,r.useMemo)((()=>null===c||void 0===c?void 0:c.map((e=>({value:e.title,label:(0,f.$Q)(n,"course.",e.title)}))).sort(f.QH)),[c,n.locale]),d=(0,r.useCallback)((e=>{var i;if(null!=e)return null!==(i=null===c||void 0===c?void 0:c.find((i=>i.title===e)))&&void 0!==i?i:{title:e}}),[c]),p=(0,r.useCallback)((e=>h.c(e).map((e=>e.title))),[]);return(0,j.jsx)(_,{name:i,label:t,data:u,parser:d,formatter:p})},M=e=>{let{name:i,label:t}=e;const n=(0,s.c)(),l=(0,o.OY)(),a=(0,r.useCallback)((()=>{l(g.uk())}),[]),c=(0,o.w1)((e=>e.recipeGroups.cuisines.items));(0,b.c)(a,c);const u=(0,r.useMemo)((()=>null===c||void 0===c?void 0:c.map((e=>({value:e.title,label:(0,f.$Q)(n,"cuisine.",e.title)}))).sort(f.QH)),[c,n.locale]),d=(0,r.useCallback)((e=>{var i;if(null!=e)return null!==(i=null===c||void 0===c?void 0:c.find((i=>i.title===e)))&&void 0!==i?i:{title:null!==e&&void 0!==e?e:""}}),[c]),p=(0,r.useCallback)((e=>h.c(e).map((e=>e.title))),[]);return(0,j.jsx)(_,{name:i,label:t,data:u,parser:d,formatter:p})};var y=t(2136),S=t(6464),N=t(1808),k=t(9340);const E=(0,l.Os)({submit:{id:"recipe.create.submit",description:"Submit recipe button",defaultMessage:"Submit recipe"},view:{id:"recipe.create.view",description:"View recipe button",defaultMessage:"View"}}),T=(0,r.forwardRef)(((e,i)=>{let{isNew:t,submitting:n,pristine:l,onSubmit:a,onLink:o,...c}=e;const{formatMessage:u}=(0,s.c)(),d=!t&&l,p=(0,r.useCallback)((()=>{d?o():a()}),[d,o,a]);return(0,j.jsx)(N.Y,{position:"end",children:(0,j.jsxs)(y.c,{variant:"primary",type:d?"button":"submit",disabled:(0,f.wL)()&&!d,onClick:p,accessKey:d?void 0:"s",...c,className:n?"disabled":void 0,ref:i,children:[(0,j.jsx)("span",{style:{visibility:n?"hidden":"initial"},children:u(d?E.view:E.submit)}),n&&(0,j.jsx)(S.c,{style:{position:"absolute",color:"var(--primaryText)"}})]})})})),R=(0,r.forwardRef)(((e,i)=>(0,j.jsx)(m.Wu,{subscription:{pristine:!0,submitting:!0},children:e=>{let{submitting:t}=e;return(0,j.jsx)(L,{submitting:t,ref:i})}})));class L extends r.Component{getSubmitting(){return this.props.submitting}render(){return null}}const F=()=>{var e,i;const t=(0,n.i6)(),s=(0,o.OY)(),l=(0,o.w1)((e=>e.recipeForm)),a=(0,r.useCallback)((()=>{l.item&&s(k.Wm(l.item))}),[l.item]),c=(0,r.useCallback)((()=>{var e;t((0,f.sL)("/recipe/".concat(null===(e=l.item)||void 0===e?void 0:e.slug)))}),[null===(e=l.item)||void 0===e?void 0:e.slug]),u=null===(i=l.item)||void 0===i?void 0:i.id,d=null==u||0===u;return(0,j.jsx)(m.Wu,{subscription:{pristine:!0,submitting:!0},children:e=>{let{pristine:i,submitting:t}=e;return(0,j.jsx)(T,{isNew:d,pristine:i,submitting:t,onSubmit:a,onLink:c})}})};var G=t(8364),I=t(5292),O=t(1700),W=t(2068),D=t(7136),P=t(8680),B=t(9448),q=t(5924),Q=t(4748),A=t(5404),V=t(6240),Y=t(5344);class U extends Y.c{constructor(){super(...arguments),this.ref=(0,r.createRef)(),this.handleChange=e=>{var i,t,r;null===(i=(t=this.props).onChange)||void 0===i||i.call(t,e.target.name,null===e||void 0===e||null===(r=e.target.files)||void 0===r?void 0:r[0])},this.handleClear=()=>{this.props.onChange&&(this.props.onChange(this.props.name,""),this.clearValue())}}clearValue(){null!=this.ref&&this.ref.current&&(this.ref.current.value="")}focus(){return!(null==this.ref||!this.ref.current)&&(this.ref.current.focus(),!0)}render(){const{accept:e,value:i,onChange:t,name:r,style:n,tooltip:s,readOnly:l,disabled:a,label:o,className:u,helpText:d,errors:p,meta:m,...h}=this.props;return(0,j.jsx)(c.c.Group,{...this.getGroupProps(),controlId:r,className:this.getFormGroupClassNames(),style:n,children:(0,j.jsxs)(Q.c,{condition:null!=s,render:e=>(0,j.jsx)(V.c,{id:"".concat(r,"-tooltip"),tooltip:s,children:e}),children:[this.getLabel(),this.getHelpText(),this.getErrorMessage(),(0,j.jsxs)(q.c,{children:[(0,j.jsx)(c.c.Control,{type:"file",name:r,accept:e,readOnly:l,disabled:a,onChange:this.handleChange,...h,ref:this.ref}),!l&&!a&&t&&(i||null!=this.ref.current&&this.ref.current.value)&&(0,j.jsx)(q.c.Text,{className:"input-adornment-end button",children:(0,j.jsx)(y.c,{onClick:this.handleClear,children:(0,j.jsx)(A.c,{icon:"x",variant:"light",size:"2x"})})})]})]})})}}const K=U,Z=e=>e,z=(0,r.forwardRef)(((e,i)=>{let{name:t,required:r,onChange:n,onFocus:l,onBlur:a,...o}=e;const c=(0,s.c)();return(0,j.jsx)(m.IN,{name:t,validate:r?v.o0:void 0,validateFields:[],parse:Z,children:e=>{var t;return(0,j.jsx)(K,{...o,required:r,name:e.input.name,value:null!==(t=e.input.value)&&void 0!==t&&t,errors:(0,v.MZ)(c,e.meta.error||(e.meta.dirtySinceLastSubmit?void 0:e.meta.submitError)),meta:e.meta,onChange:(i,t)=>{e.input.onChange(t),null===n||void 0===n||n(i,t)},onFocus:i=>{e.input.onFocus(i),null===l||void 0===l||l(i)},onBlur:i=>{e.input.onBlur(i),null===a||void 0===a||a(i)},ref:i})}})}));var H=t(7396);const $=(0,l.Os)({photo_label:{id:"recipe.create.photo_label",description:"Photo label",defaultMessage:"Photo"}}),J=()=>{const{formatMessage:e}=(0,s.c)(),{key:i}=(0,n.IT)(),t=(0,r.useRef)(null),[l,a]=(0,r.useState)(void 0),o=(0,r.useMemo)((()=>(0,f.eQ)()),[]);(0,r.useEffect)((()=>{t.current&&t.current.clearValue(),a(void 0)}),[i]);const c=(0,r.useCallback)(((e,i)=>{a(i?URL.createObjectURL(i):"")}),[]),u=(0,r.useCallback)((e=>null!=l?l.length>0?l:(0,f.eQ)():(0,f.Zd)(e||o)),[l,o]);return(0,j.jsxs)(j.Fragment,{children:[(0,j.jsx)(d.c,{children:(0,j.jsx)(p.c,{xs:12,lg:11,xl:10,xxl:9,style:{marginLeft:"auto",marginRight:"auto"},children:(0,j.jsx)(P.c,{height:66.67,width:100,children:(0,j.jsx)(H.c,{fieldNames:["photo"],children:e=>(0,j.jsx)(B.c,{src:u(e.photo),alt:"",style:{objectFit:"contain"}})})})})}),(0,j.jsx)(d.c,{children:(0,j.jsx)(p.c,{xs:12,children:(0,j.jsx)(z,{name:"photo",label:e($.photo_label),accept:"image/*",onChange:c,ref:t})})})]})};var X=t(8436),ee=t(1307),ie=t(3360);function te(e){let i;const t=e.indexOf("."),r=e.indexOf(",");return-1===t&&-1===r?i=e:-1===t?i=e.replace(",","."):-1===r?i=e:t<r?(i=e.replace(".",""),i=i.replace(",",".")):i=e.replace(",",""),parseFloat(i)}const re=e=>{let i=-1;const t=e.length;return["1","2","3","4","5","6","7","8","9","0"].forEach((t=>{e.lastIndexOf(t)>i&&(i=e.lastIndexOf(t))})),t===i+1?{amount:e,rest:""}:{amount:e.substring(0,i+1),rest:e.substring(i+1,t)}},ne=e=>e.normalize("NFKD").split("\u2044"),se=(e,i)=>{const t=i.split(" "),r=[];let n,s,l=!1;for(s=0;s<t.length-1;++s){const i=t[s];if(0===i.length)continue;const a=l?[]:ne(i[0]);if(l||Number.isNaN(parseInt(i[0]))){if(l||!a[1]){l=!0,n=e[i.toLocaleLowerCase()],n&&++s;break}if(l=!0,r.push("".concat(a[0],"/").concat(a[1])),i.length>1){n=e[i.substring(1).toLocaleLowerCase()],n&&++s;break}}else{let{amount:t,rest:a}=re(i);if(r.push(t),a){const i=ne(a[0]);if(i[1]){if(l=!0,r.push("".concat(i[0],"/").concat(i[1])),!(a.length>1))continue;a=a.substring(1)}if(n=e[a.toLocaleLowerCase()],n){++s;break}}r.length>=2&&(l=!0)}}const{numerator:a,denominator:o}=(e=>{const{numerator:i,denominator:t}=e.reduce(((e,i)=>{const t=i.split("/");let r=te(t[0]),n=t.length>1?te(t[1]):1;if(0===e.denominator)return{numerator:r,denominator:n};if(1===t.length){r*=e.numerator,n*=e.denominator;const i=(0,ie.I)(r,n);return{numerator:r/i,denominator:n/i}}r=e.numerator*n+e.denominator*r,n*=e.denominator;const s=(0,ie.I)(r,n);return{numerator:r/s,denominator:n/s}}),{numerator:0,denominator:0});return{numerator:i,denominator:t}})(r);return{numerator:0===a?void 0:a,denominator:o,measurement:n,title:t.slice(s).join(" ")}};var le=t(5388),ae=t(8331);t(4124);const oe=()=>(0,j.jsx)("div",{className:"loading",children:"Loading..."});class ce extends Y.c{constructor(){super(...arguments),this.ref=(0,r.createRef)()}focus(){return!(null==this.ref||!this.ref.current)&&(this.ref.current.focus(),!0)}getLabel(){return null==this.props.label?null:this.props.tooltip?(0,j.jsxs)(j.Fragment,{children:[this.props.label,"\xa0",(0,j.jsx)(A.c,{icon:"info-circle",className:"tooltip-icon"})]}):this.props.label}render(){const{value:e="",rows:i=4,onChange:t,name:r,style:n,tooltip:s,label:l,className:a,helpText:o,errors:u,meta:d,...p}=this.props;return(0,j.jsx)(c.c.Group,{...this.getGroupProps(),controlId:r,className:this.getFormGroupClassNames(),style:n,children:(0,j.jsxs)(Q.c,{condition:null!=s,render:e=>(0,j.jsx)(V.c,{id:"".concat(r,"-tooltip"),tooltip:s,children:e}),children:[this.getLabel(),this.getHelpText(),this.getErrorMessage(),(0,j.jsx)(q.c,{children:(0,j.jsx)(ae.c,{name:r,value:e,rows:i,loadingComponent:oe,className:"form-control",movePopupAsYouType:!0,onChange:this.handleChange,...p,ref:this.ref})})]})})}}const ue=(0,r.forwardRef)(((e,i)=>{let{name:t,required:n,format:l,parse:a,onChange:o,onFocus:c,onBlur:u,...d}=e;const p=(0,s.c)(),h=(0,r.useMemo)((()=>{const e=[];return n&&e.push(v.o0),(0,v.Gc)(...e)}),[n]);return(0,j.jsx)(m.IN,{name:t,validate:h,validateFields:[],format:l,parse:a,children:e=>(0,j.jsx)(ce,{...d,required:n,name:e.input.name,value:e.input.value,errors:(0,v.MZ)(p,e.meta.error||(e.meta.dirtySinceLastSubmit?void 0:e.meta.submitError)),meta:e.meta,onChange:(i,t)=>{e.input.onChange(t),null===o||void 0===o||o(i,t)},onFocus:i=>{e.input.onFocus(i),null===c||void 0===c||c(i)},onBlur:i=>{e.input.onBlur(i),null===u||void 0===u||u(i)},ref:i})})}));var de=t(8584),pe=t(264),me=t.n(pe),he=t(9772),ge=t(3208);const be=(0,l.Os)({preview:{id:"recipe.create.preview",description:"Preview",defaultMessage:"Preview"}}),fe=e=>{let{id:i,labels:t,errors:n,tooltips:l,initialTab:a,activeTab:o,onSelect:c,children:u}=e;const{formatMessage:d}=(0,s.c)(),p=me()("content",{"has-error":!!n}),m=me()("nav","nav-tabs",{"has-error":!!n}),h=u.slice(0,u.length-1).map(((e,i)=>(0,j.jsx)(he.c,{title:(0,j.jsxs)(j.Fragment,{children:[t[i],(null===l||void 0===l?void 0:l[i])&&(0,j.jsxs)(j.Fragment,{children:["\xa0",(0,j.jsx)(V.c,{id:"".concat(t[i],"-tooltip"),tooltip:l[i],children:(0,j.jsx)(A.c,{icon:"info-circle",className:"tooltip-icon","aria-label":l[i],"aria-describedby":void 0})})]})]}),eventKey:i.toString(),className:"editor",children:(0,j.jsx)("div",{className:p,children:e})},i.toString()))),g=(0,r.useCallback)((e=>{e&&(null===c||void 0===c||c(e))}),[c]);return(0,j.jsxs)("div",{className:"live-editor",children:[(0,j.jsxs)(ge.c,{id:"".concat(i,"-tabs"),defaultActiveKey:a||"0",activeKey:o,onSelect:g,className:m,children:[h,(0,j.jsx)(he.c,{title:d(be.preview),className:"preview",eventKey:"preview",children:(0,j.jsx)("div",{className:p,children:u[u.length-1]})})]}),(0,j.jsx)("div",{className:"help-text error",children:n})]})},ve=(0,l.Os)({ingredients_label:{id:"recipe.create.ingredients_label",description:"Recipe ingredients label",defaultMessage:"Ingredients"},ingredients_tooltip:{id:"recipe.create.ing.info_desc",description:"info_desc",defaultMessage:'Each Ingredient should be on its own line. You can form groups by ending the groups first line with a colon (":").'},ingredients_placeholder:{id:"recipe.create.ing.ingredients_placeholder",description:"Example for writing ingredients",defaultMessage:"Dough:\n300 g flour\n100 ml milk\n\nDip:\n100 ml olive oil\n..."},subrecipes_label:{id:"recipe.create.subrecipes_label",description:"Recipe links label",defaultMessage:"Recipe links"},subrecipes_tooltip:{id:"recipe.create.subrecipes.tooltip",description:"Subrecipes tooltip",defaultMessage:"If the recipe is made of several subrecipes, then link them here. Each Recipe Link should be on its own line."},subrecipes_placeholder:{id:"recipe.create.subrecipes.placeholder",description:"Subreceipes placeholder",defaultMessage:":dough-1\n:olive-oil-dip-1"}});function xe(e){let i=e.replace(/\t/g," ");return i=i.trim(),i}function je(e,i,t){let r="";return t&&t.filter((e=>e.title.trim().length>0||e.ingredients.length>0)).forEach((t=>{t.title&&(r+="".concat(t.title,":\n")),t.ingredients.forEach((t=>{const n=t.measurement?i[t.measurement]:"";r+=t.numerator?"".concat((0,ee.c)(1,1,t.numerator,t.denominator)," "):"",r+=n?"".concat(e.formatMessage({id:"measurement.".concat(n.toLocaleLowerCase())},{itemCount:t.numerator})," "):"",r+="".concat(t.title,"\n")})),r+="\n"})),r.endsWith("\n")?r.substring(0,r.length-2):r}function _e(e,i){var t;if(!i)return[];const r=[{slug:"default",title:"",ingredients:[]}];let n="",s=null===(t=r.find((e=>""===e.title)))||void 0===t?void 0:t.ingredients;if(null==s)throw new Error("Invalid state: ings may not be null.");if(i){i.split("\n").map(xe).filter((e=>e.length>0)).forEach((i=>{if(i.length>0)if(i.endsWith(":")&&i.length>1){var t;if(n=i.substring(0,i.length-1),r.push({slug:(0,f.sV)(n),title:n,ingredients:[]}),s=null===(t=r.find((e=>e.title===n)))||void 0===t?void 0:t.ingredients,null==s)throw new Error("Invalid state: The create ings may not be null.")}else{if(null==s)throw new Error("Invalid state: ings may not be null.");s.push(se(e,i))}}))}return r}function Ce(e,i,t){let r="";return t&&t.forEach((t=>{const n=t.measurement?i[t.measurement]:"";r+=t.numerator?"".concat((0,ee.c)(1,1,t.numerator,t.denominator)," "):"",r+=n?"".concat(e.formatMessage({id:"measurement.".concat(n.toLocaleLowerCase())},{itemCount:t.numerator})," "):"",r+="".concat(t.title,"\n")})),r.substring(0,r.length-1)}function we(e,i){if(!i)return[];const t=[];return i.split("\n").map(xe).filter((e=>e.length>1&&!e.startsWith(":"))).forEach((i=>{i.length>0&&t.push(se(e,i))})),t}const Me=e=>{let{entity:{char:i}}=e;return(0,j.jsx)("div",{children:i})},ye=e=>{let{igData:i,srData:t}=e;const n=(0,r.useMemo)((()=>{return e=e=>{const i=(0,ee.c)(1,1,e.numerator,e.denominator);return{...e,quantity:i}},i.map((i=>({...i,ingredients:i.ingredients.map(e)})));var e}),[i]),s=(0,r.useMemo)((()=>t.map((e=>{const i=(0,ee.c)(1,1,e.numerator,e.denominator);return{...e,quantity:i}}))),[i]);return(0,j.jsx)("div",{className:"recipe-details",children:(0,j.jsx)("div",{className:"recipe-schema",children:(0,j.jsx)("article",{className:"ingredients-panel",children:(0,j.jsxs)("div",{className:"ingredient-groups",children:[(0,j.jsx)(le.c,{subRecipes:s}),(0,j.jsx)(X.c,{groups:n,hasSubrecipes:t.length>0})]})})})})},Se=e=>{let{nameIg:i,nameSub:t,fetchRecipeList:l}=e;const a=(0,s.c)(),{formatMessage:o}=a,c=(0,n.IT)(),[u,d]=(0,r.useState)("0");(0,r.useEffect)((()=>{c.pathname.endsWith("/".concat(de.OM))&&d("0")}),[c.pathname]);const p=(0,r.useContext)(W.c),h=(0,r.useCallback)(((e,r)=>!0===(null===r||void 0===r?void 0:r[i])&&null!=(null===e||void 0===e?void 0:e[i])?(0,v.MZ)(a,null===e||void 0===e?void 0:e[i]):null!==r&&void 0!==r&&r[t]&&null!=(null===e||void 0===e?void 0:e[t])?(0,v.MZ)(a,null===e||void 0===e?void 0:e[t]):void 0),[a]);return(0,j.jsx)(m.Wu,{subscription:{errors:!0,touched:!0,initialValues:!0},children:e=>{let{errors:r,touched:n,initialValues:s}=e;return(0,j.jsxs)(fe,{id:"ingredients",labels:[o(ve.ingredients_label),o(ve.subrecipes_label)],activeTab:u,onSelect:d,errors:h(r,n),tooltips:[o(ve.ingredients_tooltip),o(ve.subrecipes_tooltip)],children:[(0,j.jsx)(H.c,{fieldNames:[t],children:e=>(0,j.jsx)(G.c,{name:i,rows:8,placeholder:o(ve.ingredients_placeholder),required:s&&!e[t]})}),(0,j.jsx)("div",{className:"form-group",children:(0,j.jsx)(ue,{name:t,rows:8,placeholder:o(ve.subrecipes_placeholder),trigger:{":":{dataProvider:e=>l(e),component:Me,output:e=>e.char}}})}),(0,j.jsx)(H.c,{fieldNames:[i,t],children:e=>(0,j.jsx)(j.Fragment,{children:"preview"===u&&(0,j.jsx)(ye,{igData:_e(p.parser,e[i]),srData:we(p.parser,e[t])})})})]})}})};var Ne=t(3745);const ke=(0,l.Os)({directions_label:{id:"recipe.create.directions_label",description:"Directions label",defaultMessage:"Directions"},directions_tooltip:{id:"recipe.create.dir.tooltip",description:"Directions Tooltip",defaultMessage:'Each Direction should be on its own line. You can form chapters by ending the chapters heading with a colon (":").'},directions_placeholder:{id:"recipe.create.dir.placeholder",description:"Directions Placeholder",defaultMessage:"Dough:\nPrepare the dough.\n\nDip:\nPrepare the dip.\n..."}}),Ee=e=>{let{directions:i,ingredients:t}=e;const n=(0,r.useMemo)((()=>{return e=e=>{const i=(0,ee.c)(1,1,e.numerator,e.denominator);return{...e,quantity:i}},t.map((i=>({...i,ingredients:i.ingredients.map(e)})));var e}),[t]),s=i.includes(":\n");return(0,j.jsx)("div",{className:"recipe-details",children:(0,j.jsx)("div",{className:"recipe-schema",children:(0,j.jsx)("article",{className:me()("directions-panel",{"multi-directions":s}),children:(0,j.jsx)("div",{className:"direction-groups",children:(0,j.jsx)(Ne.c,{directions:i,ingredients:n})})})})})},Te=e=>{let{name:i}=e;const t=(0,s.c)(),{formatMessage:l}=t,a=(0,r.useContext)(W.c),o=(0,n.IT)(),[c,u]=(0,r.useState)("0");return(0,r.useEffect)((()=>{o.pathname.endsWith("/".concat(de.OM))&&u("0")}),[o.pathname]),(0,j.jsx)(m.Wu,{subscription:{errors:!0},children:e=>{let{errors:r}=e;return(0,j.jsxs)(fe,{id:"directions",labels:[l(ke.directions_label)],activeTab:c,onSelect:u,errors:(0,v.MZ)(t,null===r||void 0===r?void 0:r[i]),tooltips:[l(ke.directions_tooltip)],children:[(0,j.jsx)(G.c,{name:i,rows:8,placeholder:l(ke.directions_placeholder)}),(0,j.jsx)(H.c,{fieldNames:[i,"ingredientGroupsS"],children:e=>{var t;return(0,j.jsx)(j.Fragment,{children:"preview"===c&&(0,j.jsx)(Ee,{directions:null!==(t=e[i])&&void 0!==t?t:"",ingredients:_e(a.parser,e.ingredientGroupsS)})})}})]})}})},Re=(0,l.Os)({name_label:{id:"recipe.create.name_label",description:"Recipe name label",defaultMessage:"Recipe name"},course_label:{id:"recipe.create.course_label",description:"Course label",defaultMessage:"Course"},cuisine_label:{id:"recipe.create.cuisine_label",description:"Cuisine label",defaultMessage:"Cuisine"},tags_label:{id:"recipe.create.tags_label",description:"Tags label",defaultMessage:"Tags"},prep_time_label:{id:"recipe.create.prep_time_label",description:"Prep time label",defaultMessage:"Prep time (min)"},cooking_time_label:{id:"recipe.create.cooking_time_label",description:"Cooking time label",defaultMessage:"Cooking time (min)"},servings_label:{id:"recipe.create.servings_label",description:"Servings label",defaultMessage:"Servings"},information_label:{id:"recipe.create.information_label",description:"Recipe information label",defaultMessage:"Recipe information"},information_placeholder:{id:"recipe.create.information_placeholder",description:"Recipe information placeholder",defaultMessage:"A quick description of the recipe"},source_label:{id:"recipe.create.source_label",description:"Rating source label",defaultMessage:"Source"},source_tooltip:{id:"recipe.create.source_tooltip",description:"Rating source tooltip",defaultMessage:"Where the original recipe is from."},public_label:{id:"recipe.create.public_label",description:"Recipe set public label",defaultMessage:"Public Recipe"}}),Le=e=>{let{recipe:i,isNew:t,location:n,fetchRecipeList:l,onSubmit:a}=e;const o=(0,s.c)(),{formatMessage:h}=o,g=(0,r.useContext)(W.c),b=(0,r.useRef)(null),f=(0,r.useCallback)((e=>{var i;return null!==(i=b.current)&&void 0!==i&&i.getSubmitting()?Promise:a({...e,ingredientGroups:_e(g.parser,e.ingredientGroupsS),subrecipes:we(g.parser,e.subrecipesS)})}),[g.parser,b.current]),v=(0,r.useMemo)((()=>t&&!i?{slug:"",public:!0,servings:1}:i?{...i,ingredientGroupsS:je(o,g.formatter,i.ingredientGroups),subrecipesS:Ce(o,g.formatter,i.subrecipes)}:void 0),[i,t,n]);return(0,j.jsx)(m.QF,{initialValues:v,onSubmit:f,subscription:{submitting:!0},render:e=>{let{form:i,handleSubmit:t}=e;return(0,j.jsxs)(c.c,{className:"recipe-form",onSubmit:t,children:[(0,j.jsx)(O.c,{form:i,initialValues:v}),(0,j.jsx)(R,{ref:b}),(0,j.jsxs)(u.c,{children:[(0,j.jsx)(D.c,{}),(0,j.jsxs)(d.c,{children:[(0,j.jsxs)(p.c,{id:"recipe-meta",md:5,lg:4,children:[(0,j.jsx)(d.c,{children:(0,j.jsx)(p.c,{xs:12,children:(0,j.jsx)(G.c,{name:"title",label:h(Re.name_label),maxLength:250,required:!0})})}),(0,j.jsx)(J,{}),(0,j.jsxs)(d.c,{children:[(0,j.jsx)(p.c,{xs:12,sm:6,children:(0,j.jsx)(w,{name:"course",label:h(Re.course_label)})}),(0,j.jsx)(p.c,{xs:12,sm:6,children:(0,j.jsx)(M,{name:"cuisine",label:h(Re.cuisine_label)})}),(0,j.jsx)(p.c,{xs:12,children:(0,j.jsx)(C,{name:"tags",label:h(Re.tags_label)})})]}),(0,j.jsxs)(d.c,{children:[(0,j.jsx)(p.c,{xs:12,sm:6,children:(0,j.jsx)(G.c,{name:"prepTime",type:"number",label:h(Re.prep_time_label),min:1,max:999})}),(0,j.jsx)(p.c,{xs:12,sm:6,children:(0,j.jsx)(G.c,{name:"cookTime",type:"number",label:h(Re.cooking_time_label)})})]}),(0,j.jsx)(d.c,{children:(0,j.jsx)(p.c,{xs:12,children:(0,j.jsx)(G.c,{name:"servings",type:"number",label:h(Re.servings_label),min:1,max:999,required:!0})})}),(0,j.jsx)(d.c,{children:(0,j.jsx)(p.c,{xs:12,children:(0,j.jsx)(G.c,{name:"source",label:h(Re.source_label),tooltip:h(Re.source_tooltip)})})}),(0,j.jsx)(d.c,{children:(0,j.jsx)(p.c,{xs:12,children:(0,j.jsx)(I.c,{name:"public",label:h(Re.public_label)})})})]}),(0,j.jsxs)(p.c,{id:"recipe",md:7,lg:8,children:[(0,j.jsx)(G.c,{name:"info",rows:3,label:h(Re.information_label),placeholder:h(Re.information_placeholder)}),(0,j.jsx)(Se,{nameIg:"ingredientGroupsS",nameSub:"subrecipesS",fetchRecipeList:l}),(0,j.jsx)(Te,{name:"directions"}),(0,j.jsx)(F,{})]})]})]})]})}})};var Fe=t(7173),Ge=t(8712),Ie=t(2124),Oe=t(100);const We=()=>{var e;const i=(0,n.W4)(),t=(0,n.i6)(),s=null!==(e=i.recipe)&&void 0!==e?e:"",l="create"===s,a=(0,o.w1)((e=>e.account)),c=(0,o.w1)((e=>e.recipeForm)),u=c.item,{pending:d}=c.meta,p=(0,r.useRef)(!1),m=a.item,h=null!=m&&(l||m.id===(null===u||void 0===u?void 0:u.author)||m.role===Oe.c.STAFF||m.role===Oe.c.ADMIN);(0,r.useEffect)((()=>{null==m||d!==Ie.A.COMPLETED||null==u||h||t((0,f.sL)("/recipe/".concat(s)))}),[m,c,h]),(0,r.useEffect)((()=>{null!=(null===u||void 0===u?void 0:u.slug)&&d===Ie.A.COMPLETED&&l&&p.current&&setTimeout((()=>{t((0,f.sL)("/recipe/edit/".concat(u.slug)))}),250),p.current=!0}),[d]);const g=c.meta;return(0,r.useEffect)((()=>{404===Ge.c(g.error,"status")&&t((0,f.sL)("/NotFound"))}),[g.error]),null},De=()=>{var e;const{formatMessage:i}=(0,s.c)(),t=(0,l.Os)({new_recipe:{id:"recipe_form.new_recipe",description:"New Recipe documentTitle",defaultMessage:"New Recipe"}}),c=(0,o.OY)(),u=(0,n.W4)(),d=(0,n.IT)(),p=a.gB,m=(0,r.useCallback)((async e=>a.eI(c,e)),[]),h=null!==(e=u.recipe)&&void 0!==e?e:"",g="create"===h,b=(0,o.w1)((e=>e.recipeForm.item));return(0,r.useEffect)((()=>{h&&c(g?a.a_():a.AJ(h))}),[h,d.key]),(0,r.useEffect)((()=>()=>{c(a.a_())}),[]),(0,j.jsxs)(Fe.c,{title:g?i(t.new_recipe):null===b||void 0===b?void 0:b.title,children:[(0,j.jsx)(We,{}),(0,j.jsx)(Le,{recipe:b,isNew:g,location:d.key,fetchRecipeList:p,onSubmit:m})]})}},7748:(e,i,t)=>{t.d(i,{WG:()=>u,uk:()=>d,y8:()=>p});var r=t(1480),n=t(2672),s=t(6320),l=t(8936),a=t(7804),o=t(3536),c=t(6524);const u=()=>e=>{e({...(0,a.gB)(c.m2,s.y.GET_START)}),(0,r.cp)().get(n.Q.course).then((i=>{e({...(0,a.gB)(c.m2,s.y.GET_SUCCESS),payload:i.body.results.filter((e=>"-"!==e.title)).map(l.qQ)})})).catch((i=>e((0,o.GW)(i,c.m2))))},d=()=>e=>{e({...(0,a.gB)(c.ii,s.y.GET_START)}),(0,r.cp)().get(n.Q.cuisine).then((i=>{e({...(0,a.gB)(c.ii,s.y.GET_SUCCESS),payload:i.body.results.filter((e=>"-"!==e.title)).map(l._K)})})).catch((i=>e((0,o.GW)(i,c.ii))))},p=()=>e=>{e({...(0,a.gB)(c.Uz,s.y.GET_START)}),(0,r.cp)().get(n.Q.tag).then((i=>{e({...(0,a.gB)(c.Uz,s.y.GET_SUCCESS),payload:i.body.results.map(l.Yb)})})).catch((i=>e((0,o.GW)(i,c.Uz))))}}}]);
//# sourceMappingURL=908.62040d75.chunk.js.map