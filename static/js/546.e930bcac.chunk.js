"use strict";(self.webpackChunkownrecipes_web=self.webpackChunkownrecipes_web||[]).push([[546],{6546:(e,t,o)=>{o.r(t),o.d(t,{ThemeDialog:()=>c,default:()=>u});var s=o(5043),a=o(3626),i=o(97),n=o(2223),l=o(962),r=o(9757),d=o(579);const m=(0,a.YK)({theme_modal_title:{id:"nav.accountmenu.theme_modal_title",description:"Change theme mode dialog title",defaultMessage:"Choose theme"},theme_mode_dark:{id:"theme.mode.dark",description:"Dark mode",defaultMessage:"Dark"},theme_mode_light:{id:"theme.mode.light",description:"Light mode",defaultMessage:"Light"}}),c=e=>{let{show:t,settings:o,onChangeTheme:s,onClose:a}=e;const{formatMessage:n}=(0,i.A)();return(0,d.jsx)(l.A,{show:t,title:n(m.theme_modal_title),onClose:a,size:"sm",noCloseButton:!0,children:(0,d.jsx)(h,{settings:o,onChangeTheme:s,onClose:a})})},h=e=>{let{settings:t,onChangeTheme:o,onClose:a}=e;const{formatMessage:l}=(0,i.A)(),c=(0,s.useCallback)((e=>{t.themeMode!==e&&o(e),a()}),[o,a,t.themeMode]),h=Object.values(r.lG).map((e=>(0,d.jsx)(n.A.Item,{role:"listitem",action:!0,active:t.themeMode===e,"aria-current":t.themeMode===e,onClick:()=>c(e),children:l(m[`theme_mode_${e}`])},e)));return(0,d.jsx)(n.A,{as:"ol",role:"list",children:h})},u=c},2223:(e,t,o)=>{o.d(t,{A:()=>p});var s=o(8139),a=o.n(s),i=o(5043),n=(o(6440),o(7121)),l=o(927),r=o(7852),d=o(1456),m=o(2644),c=o(5901),h=o(579);const u=i.forwardRef(((e,t)=>{let{bsPrefix:o,active:s,disabled:i,eventKey:n,className:l,variant:u,action:g,as:f,...p}=e;o=(0,r.oU)(o,"list-group-item");const[v,b]=(0,m.M)({key:(0,c.u)(n,p.href),active:s,...p}),C=(0,d.A)((e=>{if(i)return e.preventDefault(),void e.stopPropagation();v.onClick(e)}));i&&void 0===p.tabIndex&&(p.tabIndex=-1,p["aria-disabled"]=!0);const _=f||(g?p.href?"a":"button":"div");return(0,h.jsx)(_,{ref:t,...p,...v,onClick:C,className:a()(l,o,b.isActive&&"active",i&&"disabled",u&&`${o}-${u}`,g&&`${o}-action`)})}));u.displayName="ListGroupItem";const g=u,f=i.forwardRef(((e,t)=>{const{className:o,bsPrefix:s,variant:i,horizontal:d,numbered:m,as:c="div",...u}=(0,n.Zw)(e,{activeKey:"onSelect"}),g=(0,r.oU)(s,"list-group");let f;return d&&(f=!0===d?"horizontal":`horizontal-${d}`),(0,h.jsx)(l.A,{ref:t,...u,as:c,className:a()(o,g,i&&`${g}-${i}`,f&&`${g}-${f}`,m&&`${g}-numbered`)})}));f.displayName="ListGroup";const p=Object.assign(f,{Item:g})}}]);
//# sourceMappingURL=546.e930bcac.chunk.js.map