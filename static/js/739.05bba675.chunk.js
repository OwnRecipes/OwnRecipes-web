"use strict";(self.webpackChunkownrecipes_web=self.webpackChunkownrecipes_web||[]).push([[739],{2739:(e,a,t)=>{t.r(a),t.d(a,{LanguageDialog:()=>u,default:()=>m});var n=t(5043),s=t(3626),o=t(97),i=t(2223),l=t(962),r=t(8479),c=t(579);const g=(0,s.YK)({language_modal_title:{id:"nav.accountmenu.language_modal_title",description:"Change language dialog title",defaultMessage:"Choose language"}}),u=e=>{let{show:a,settings:t,onChangeLanguage:n,onClose:s}=e;const{formatMessage:i}=(0,o.A)();return(0,c.jsx)(l.A,{show:a,title:i(g.language_modal_title),onClose:s,size:"sm",noCloseButton:!0,children:(0,c.jsx)(d,{settings:t,onChangeLanguage:n,onClose:s})})},d=e=>{let{settings:a,onChangeLanguage:t,onClose:s}=e;const o=(0,n.useCallback)((e=>{a.language!==e&&t(e),s()}),[t,s,a.language]),l=Object.values(r.sw).map((e=>(0,c.jsx)(i.A.Item,{role:"listitem",action:!0,active:a.language===e,"aria-current":a.language===e,onClick:()=>o(e),children:(0,r.z0)(e)["1.display_name"]},e)));return(0,c.jsx)(i.A,{as:"ol",role:"list",children:l})},m=u},2223:(e,a,t)=>{t.d(a,{A:()=>b});var n=t(8139),s=t.n(n),o=t(5043),i=(t(6440),t(7121)),l=t(927),r=t(7852),c=t(1456),g=t(2644),u=t(5901),d=t(579);const m=o.forwardRef(((e,a)=>{let{bsPrefix:t,active:n,disabled:o,eventKey:i,className:l,variant:m,action:h,as:v,...b}=e;t=(0,r.oU)(t,"list-group-item");const[f,p]=(0,g.M)({key:(0,u.u)(i,b.href),active:n,...b}),C=(0,c.A)((e=>{if(o)return e.preventDefault(),void e.stopPropagation();f.onClick(e)}));o&&void 0===b.tabIndex&&(b.tabIndex=-1,b["aria-disabled"]=!0);const w=v||(h?b.href?"a":"button":"div");return(0,d.jsx)(w,{ref:a,...b,...f,onClick:C,className:s()(l,t,p.isActive&&"active",o&&"disabled",m&&`${t}-${m}`,h&&`${t}-action`)})}));m.displayName="ListGroupItem";const h=m,v=o.forwardRef(((e,a)=>{const{className:t,bsPrefix:n,variant:o,horizontal:c,numbered:g,as:u="div",...m}=(0,i.Zw)(e,{activeKey:"onSelect"}),h=(0,r.oU)(n,"list-group");let v;return c&&(v=!0===c?"horizontal":`horizontal-${c}`),(0,d.jsx)(l.A,{ref:a,...m,as:u,className:s()(t,h,o&&`${h}-${o}`,v&&`${h}-${v}`,g&&`${h}-numbered`)})}));v.displayName="ListGroup";const b=Object.assign(v,{Item:h})}}]);
//# sourceMappingURL=739.05bba675.chunk.js.map