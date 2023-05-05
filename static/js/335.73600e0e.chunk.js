"use strict";(self.webpackChunkownrecipes_web=self.webpackChunkownrecipes_web||[]).push([[335,423],{335:function(e,o,n){n.r(o),n.d(o,{default:function(){return y}});var r=n(9743),a=n(2677),t=n(9140),i=n(6221),s=n(3539),c=n(9388),l=n(2791),d=n(5987);function u(e){var o=(0,s.Z)(),n=o.formatMessage,r=o.textComponent,a=void 0===r?l.Fragment:r,t=e.id,i=e.description,c=e.defaultMessage,d=e.values,u=e.children,f=e.tagName,p=void 0===f?a:f,m=n({id:t,description:i,defaultMessage:c},d,{ignoreTag:e.ignoreTag});return"function"===typeof u?u(Array.isArray(m)?m:[m]):p?l.createElement(p,null,l.Children.toArray(m)):l.createElement(l.Fragment,null,m)}u.displayName="FormattedMessage";var f=l.memo(u,(function(e,o){var n=e.values,r=(0,c._T)(e,["values"]),a=o.values,t=(0,c._T)(o,["values"]);return(0,d.wU)(a,n)&&(0,d.wU)(r,t)}));f.displayName="MemoizedFormattedMessage";var p=f,m=(n(5606),n(1127)),v=n(4138),h=n(1884),b=n(184),g=(0,i.vU)({about_title:{id:"footer.about.title",description:"Title of the about dialog.",defaultMessage:"About OwnRecipes"},about_developers:{id:"footer.about.developers",description:"Developers heading.",defaultMessage:"Developers"},about_technical_info:{id:"footer.about.technical info",description:"Technical information heading.",defaultMessage:"Version info"},about_technical_info_demo:{id:"footer.about.technical info.demo alert",description:"Info that this instance is a demo only.",defaultMessage:"Demo mode."},about_credits:{id:"footer.about.credits",description:"Credits heading.",defaultMessage:"Credits"},founder_openeats:{id:"footer.role.founder_openeats",description:"Role description for the founder of OpenEats.",defaultMessage:"Founder of OpenEats"},founder_ownrecipes:{id:"footer.role.founder_ownrecipes",description:"Role description for the founder of OwnRecipes.",defaultMessage:"Founder of OwnRecipes"},backend:{id:"footer.role.backend",description:"Backend staff.",defaultMessage:"Backend/api"},frontend:{id:"footer.role.frontend",description:"Frontend staff.",defaultMessage:"Frontend"}}),Z=function(){var e=(0,s.Z)().formatMessage;return(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(m.Z,{variant:"body1",children:(0,b.jsx)(p,{id:"footer.credit",description:"Footer credit",defaultMessage:"Created with {link}, an open source recipe management site. You can share recipes with friends, rate recipes, manage your grocery lists, and more.",values:{link:(0,b.jsx)("a",{href:"https://github.com/ownrecipes/OwnRecipes",children:"OwnRecipes"})}})}),(0,b.jsx)("hr",{}),(0,b.jsx)("h2",{children:e(g.about_developers)}),(0,b.jsxs)(r.Z,{xs:2,md:3,className:"credits-people g-3",children:[(0,b.jsx)(x,{userName:"Ryan Noelk",userUrl:"https://github.com/RyanNoelk",imageSrc:"https://avatars.githubusercontent.com/u/11916338?v=4",roles:["founder_openeats"]}),(0,b.jsx)(x,{userName:'Frank "Roy" H.',userUrl:"https://github.com/sepulzera",imageSrc:"https://avatars.githubusercontent.com/u/43857716?v=4",roles:["founder_ownrecipes","frontend"]}),(0,b.jsx)(x,{userName:"Sarajiko",userUrl:"https://github.com/Sarajiko",imageSrc:"https://avatars.githubusercontent.com/u/80350428?v=4",roles:["backend"]})]}),(0,b.jsx)("hr",{}),(0,b.jsx)("h2",{children:e(g.about_technical_info)}),(0,b.jsx)(m.Z,{variant:"body2",children:(0,b.jsx)(p,{id:"footer.technical info.version",description:"Version of OwnRecipes",defaultMessage:"OwnRecipes: v{version}",values:{version:(0,h.Oi)("REACT_APP_VERSION")}})}),(0,b.jsx)(m.Z,{variant:"body2",children:(0,b.jsx)(p,{id:"footer.technical info.api url",description:"Api url",defaultMessage:"Api url: {url}",values:{url:(0,h.dU)("REACT_APP_API_URL",window.location.origin)}})}),(0,h.s6)()&&(0,b.jsx)(m.Z,{variant:"body2",children:e(g.about_technical_info_demo)}),(0,b.jsx)("hr",{}),(0,b.jsx)("h2",{children:e(g.about_credits)}),(0,b.jsx)(m.Z,{variant:"body2",children:(0,b.jsx)(p,{id:"footer.credit_openeats",description:"Footer credit for OpenEats",defaultMessage:"OwnRecipes is a fork of {link} by Ryan Noelk.",values:{link:(0,b.jsx)("a",{href:"https://github.com/open-eats/OpenEats",target:"_blank",rel:"noreferrer",children:"OpenEats"})}})}),(0,b.jsx)(m.Z,{variant:"body2",children:(0,b.jsx)(p,{id:"footer.icon_credit",description:"Footer icons credit",defaultMessage:"Icons by {link} ({ccLink}).",values:{link:(0,b.jsx)("a",{href:"http://www.flaticon.com/authors/nikita-golubev",title:"Nikita Golubev",target:"_blank",rel:"noreferrer",children:"Nikita Golubev"}),ccLink:(0,b.jsx)("a",{href:"http://creativecommons.org/licenses/by/3.0/",title:"Creative Commons",target:"_blank",rel:"noreferrer",children:"CC BY 3.0"})}})})]})},x=function(e){var o=e.userName,n=e.userUrl,r=e.imageSrc,i=e.roles,c=(0,s.Z)();return(0,b.jsx)(a.Z,{children:(0,b.jsxs)(t.Z,{children:[(0,b.jsx)(t.Z.Img,{variant:"top",src:r}),(0,b.jsxs)(t.Z.Body,{children:[(0,b.jsx)(t.Z.Title,{children:(0,b.jsx)("a",{href:n,target:"_blank",rel:"noreferrer",children:o})}),(0,b.jsx)(t.Z.Text,{children:i.map((function(e){return(0,h.kT)(c,"footer.role.",e)})).join(", ")})]})]})})},y=function(e){var o=e.show,n=e.onClose,r=(0,s.Z)().formatMessage;return(0,b.jsx)(v.Z,{show:o,title:r(g.about_title),onClose:n,noCloseButton:!0,className:"modal-about",children:(0,b.jsx)(Z,{})})}},4138:function(e,o,n){n.d(o,{h:function(){return g}});var r=n(1413),a=n(557),t=n(2791),i=n(6221),s=n(3539),c=n(3360),l=n(5316),d=n(1694),u=n.n(d),f=(n(7493),n(78)),p=n(2605),m=n(184),v=["onClose","className"],h=["show","title","acceptTitle","closeTitle","onAccept","onClose","noCloseButton","size","acceptButtonProps","children"],b=(0,i.vU)({accept:{id:"modal.accept",description:"Default modal accept button",defaultMessage:"Accept"},close:{id:"modal.close",description:"Default modal close button",defaultMessage:"Close"}}),g=(0,t.forwardRef)((function(e,o){var n=e.onClose,t=e.className,i=(0,a.Z)(e,v),l=(0,s.Z)().formatMessage;return(0,m.jsx)(c.Z,(0,r.Z)((0,r.Z)({type:"button",onClick:n,variant:"transparent",className:u()("close-button",t),"aria-label":l(b.close)},i),{},{ref:o,children:(0,m.jsx)(f.Z,{icon:"x",variant:"light",size:"2x"})}))})),Z=(0,t.forwardRef)((function(e,o){var n=e.show,i=e.title,d=e.acceptTitle,u=e.closeTitle,f=e.onAccept,v=e.onClose,Z=e.noCloseButton,x=e.size,y=void 0===x?"lg":x,j=e.acceptButtonProps,N=e.children,w=(0,a.Z)(e,h),k=(0,s.Z)().formatMessage,C=(0,t.useCallback)((function(){null===v||void 0===v||v(!1)}),[v]),E=(0,t.useCallback)((function(){null===v||void 0===v||v(!0),null===f||void 0===f||f()}),[v,f]),_=null!=f||null!=v&&!Z;return(0,m.jsxs)(l.Z,(0,r.Z)((0,r.Z)({show:n,backdrop:"static",size:y,centered:!0,onHide:C,keyboard:!1},w),{},{ref:o,children:[(0,m.jsxs)(l.Z.Header,{children:[(0,m.jsx)(l.Z.Title,{children:i}),null!=v&&(0,m.jsx)(g,{onClose:C})]}),(0,m.jsx)(l.Z.Body,{children:(0,m.jsx)(p.Z,{verbose:!0,printStack:!0,children:N})}),_&&(0,m.jsxs)(l.Z.Footer,{children:[null!=v&&!Z&&(0,m.jsx)(c.Z,{variant:"outline-primary",onClick:C,children:null!==u&&void 0!==u?u:k(b.close)}),null!=f&&(0,m.jsx)(c.Z,(0,r.Z)((0,r.Z)({variant:"primary",onClick:E},j),{},{children:null!==d&&void 0!==d?d:k(b.accept)}))]})]}))}));o.Z=Z},9140:function(e,o,n){n.d(o,{Z:function(){return M}});var r=n(1413),a=n(557),t=n(1694),i=n.n(t),s=n(2791),c=n(162),l=n(6543),d=n(7472),u=n(184),f=["bsPrefix","className","variant","as"],p=s.forwardRef((function(e,o){var n=e.bsPrefix,t=e.className,s=e.variant,l=e.as,d=void 0===l?"img":l,p=(0,a.Z)(e,f),m=(0,c.vE)(n,"card-img");return(0,u.jsx)(d,(0,r.Z)({ref:o,className:i()(s?"".concat(m,"-").concat(s):m,t)},p))}));p.displayName="CardImg";var m=p,v=n(6040),h=["bsPrefix","className","as"],b=s.forwardRef((function(e,o){var n=e.bsPrefix,t=e.className,l=e.as,d=void 0===l?"div":l,f=(0,a.Z)(e,h),p=(0,c.vE)(n,"card-header"),m=(0,s.useMemo)((function(){return{cardHeaderBsPrefix:p}}),[p]);return(0,u.jsx)(v.Z.Provider,{value:m,children:(0,u.jsx)(d,(0,r.Z)((0,r.Z)({ref:o},f),{},{className:i()(t,p)}))})}));b.displayName="CardHeader";var g=b,Z=["bsPrefix","className","bg","text","border","body","children","as"],x=(0,d.Z)("h5"),y=(0,d.Z)("h6"),j=(0,l.Z)("card-body"),N=(0,l.Z)("card-title",{Component:x}),w=(0,l.Z)("card-subtitle",{Component:y}),k=(0,l.Z)("card-link",{Component:"a"}),C=(0,l.Z)("card-text",{Component:"p"}),E=(0,l.Z)("card-footer"),_=(0,l.Z)("card-img-overlay"),R=s.forwardRef((function(e,o){var n=e.bsPrefix,t=e.className,s=e.bg,l=e.text,d=e.border,f=e.body,p=void 0!==f&&f,m=e.children,v=e.as,h=void 0===v?"div":v,b=(0,a.Z)(e,Z),g=(0,c.vE)(n,"card");return(0,u.jsx)(h,(0,r.Z)((0,r.Z)({ref:o},b),{},{className:i()(t,g,s&&"bg-".concat(s),l&&"text-".concat(l),d&&"border-".concat(d)),children:p?(0,u.jsx)(j,{children:m}):m}))}));R.displayName="Card";var M=Object.assign(R,{Img:m,Title:N,Subtitle:w,Body:j,Link:k,Text:C,Header:g,Footer:E,ImgOverlay:_})},5316:function(e,o,n){n.d(o,{Z:function(){return z}});var r,a=n(885),t=n(557),i=n(1413),s=n(1694),c=n.n(s),l=n(3070),d=n(7357),u=n(8376),f=n(6382);function p(e){if((!r&&0!==r||e)&&d.Z){var o=document.createElement("div");o.style.position="absolute",o.style.top="-9999px",o.style.width="50px",o.style.height="50px",o.style.overflow="scroll",document.body.appendChild(o),r=o.offsetWidth-o.clientWidth,document.body.removeChild(o)}return r}var m=n(7731),v=n(9007),h=n(3201),b=n(1683),g=n(3690),Z=n(2791),x=n(7246),y=n(729),j=n(2709),N=n(6543),w=(0,N.Z)("modal-body"),k=n(9820),C=n(162),E=n(184),_=["bsPrefix","className","contentClassName","centered","size","fullscreen","children","scrollable"],R=Z.forwardRef((function(e,o){var n=e.bsPrefix,r=e.className,a=e.contentClassName,s=e.centered,l=e.size,d=e.fullscreen,u=e.children,f=e.scrollable,p=(0,t.Z)(e,_);n=(0,C.vE)(n,"modal");var m="".concat(n,"-dialog"),v="string"===typeof d?"".concat(n,"-fullscreen-").concat(d):"".concat(n,"-fullscreen");return(0,E.jsx)("div",(0,i.Z)((0,i.Z)({},p),{},{ref:o,className:c()(m,r,l&&"".concat(n,"-").concat(l),s&&"".concat(m,"-centered"),f&&"".concat(m,"-scrollable"),d&&v),children:(0,E.jsx)("div",{className:c()("".concat(n,"-content"),a),children:u})}))}));R.displayName="ModalDialog";var M=R,T=(0,N.Z)("modal-footer"),F=n(2086),O=["bsPrefix","className","closeLabel","closeButton"],P=Z.forwardRef((function(e,o){var n=e.bsPrefix,r=e.className,a=e.closeLabel,s=void 0===a?"Close":a,l=e.closeButton,d=void 0!==l&&l,u=(0,t.Z)(e,O);return n=(0,C.vE)(n,"modal-header"),(0,E.jsx)(F.Z,(0,i.Z)((0,i.Z)({ref:o},u),{},{className:c()(r,n),closeLabel:s,closeButton:d}))}));P.displayName="ModalHeader";var A=P,B=(0,n(7472).Z)("h4"),S=(0,N.Z)("modal-title",{Component:B}),D=["bsPrefix","className","style","dialogClassName","contentClassName","children","dialogAs","aria-labelledby","aria-describedby","aria-label","show","animation","backdrop","keyboard","onEscapeKeyDown","onShow","onHide","container","autoFocus","enforceFocus","restoreFocus","restoreFocusOptions","onEntered","onExit","onExiting","onEnter","onEntering","onExited","backdropClassName","manager"];function H(e){return(0,E.jsx)(j.Z,(0,i.Z)((0,i.Z)({},e),{},{timeout:null}))}function I(e){return(0,E.jsx)(j.Z,(0,i.Z)((0,i.Z)({},e),{},{timeout:null}))}var U=Z.forwardRef((function(e,o){var n=e.bsPrefix,r=e.className,s=e.style,j=e.dialogClassName,N=e.contentClassName,w=e.children,_=e.dialogAs,R=void 0===_?M:_,T=e["aria-labelledby"],F=e["aria-describedby"],O=e["aria-label"],P=e.show,A=void 0!==P&&P,B=e.animation,S=void 0===B||B,U=e.backdrop,z=void 0===U||U,L=e.keyboard,K=void 0===L||L,G=e.onEscapeKeyDown,V=e.onShow,W=e.onHide,Y=e.container,q=e.autoFocus,J=void 0===q||q,Q=e.enforceFocus,X=void 0===Q||Q,$=e.restoreFocus,ee=void 0===$||$,oe=e.restoreFocusOptions,ne=e.onEntered,re=e.onExit,ae=e.onExiting,te=e.onEnter,ie=e.onEntering,se=e.onExited,ce=e.backdropClassName,le=e.manager,de=(0,t.Z)(e,D),ue=(0,Z.useState)({}),fe=(0,a.Z)(ue,2),pe=fe[0],me=fe[1],ve=(0,Z.useState)(!1),he=(0,a.Z)(ve,2),be=he[0],ge=he[1],Ze=(0,Z.useRef)(!1),xe=(0,Z.useRef)(!1),ye=(0,Z.useRef)(null),je=(0,m.Z)(),Ne=(0,a.Z)(je,2),we=Ne[0],ke=Ne[1],Ce=(0,h.Z)(o,ke),Ee=(0,v.Z)(W),_e=(0,C.SC)();n=(0,C.vE)(n,"modal");var Re=(0,Z.useMemo)((function(){return{onHide:Ee}}),[Ee]);function Me(){return le||(0,y.t)({isRTL:_e})}function Te(e){if(d.Z){var o=Me().getScrollbarWidth()>0,n=e.scrollHeight>(0,u.Z)(e).documentElement.clientHeight;me({paddingRight:o&&!n?p():void 0,paddingLeft:!o&&n?p():void 0})}}var Fe=(0,v.Z)((function(){we&&Te(we.dialog)}));(0,b.Z)((function(){(0,f.Z)(window,"resize",Fe),null==ye.current||ye.current()}));var Oe=function(){Ze.current=!0},Pe=function(e){Ze.current&&we&&e.target===we.dialog&&(xe.current=!0),Ze.current=!1},Ae=function(){ge(!0),ye.current=(0,g.Z)(we.dialog,(function(){ge(!1)}))},Be=function(e){"static"!==z?xe.current||e.target!==e.currentTarget?xe.current=!1:null==W||W():function(e){e.target===e.currentTarget&&Ae()}(e)},Se=(0,Z.useCallback)((function(e){return(0,E.jsx)("div",(0,i.Z)((0,i.Z)({},e),{},{className:c()("".concat(n,"-backdrop"),ce,!S&&"show")}))}),[S,ce,n]),De=(0,i.Z)((0,i.Z)({},s),pe);De.display="block";return(0,E.jsx)(k.Z.Provider,{value:Re,children:(0,E.jsx)(x.Z,{show:A,ref:Ce,backdrop:z,container:Y,keyboard:!0,autoFocus:J,enforceFocus:X,restoreFocus:ee,restoreFocusOptions:oe,onEscapeKeyDown:function(e){K?null==G||G(e):(e.preventDefault(),"static"===z&&Ae())},onShow:V,onHide:W,onEnter:function(e,o){e&&Te(e),null==te||te(e,o)},onEntering:function(e,o){null==ie||ie(e,o),(0,l.ZP)(window,"resize",Fe)},onEntered:ne,onExit:function(e){null==ye.current||ye.current(),null==re||re(e)},onExiting:ae,onExited:function(e){e&&(e.style.display=""),null==se||se(e),(0,f.Z)(window,"resize",Fe)},manager:Me(),transition:S?H:void 0,backdropTransition:S?I:void 0,renderBackdrop:Se,renderDialog:function(e){return(0,E.jsx)("div",(0,i.Z)((0,i.Z)({role:"dialog"},e),{},{style:De,className:c()(r,n,be&&"".concat(n,"-static"),!S&&"show"),onClick:z?Be:void 0,onMouseUp:Pe,"aria-label":O,"aria-labelledby":T,"aria-describedby":F,children:(0,E.jsx)(R,(0,i.Z)((0,i.Z)({},de),{},{onMouseDown:Oe,className:j,contentClassName:N,children:w}))}))}})})}));U.displayName="Modal";var z=Object.assign(U,{Body:w,Header:A,Title:S,Footer:T,Dialog:M,TRANSITION_DURATION:300,BACKDROP_TRANSITION_DURATION:150})},9743:function(e,o,n){var r=n(1413),a=n(557),t=n(1694),i=n.n(t),s=n(2791),c=n(162),l=n(184),d=["bsPrefix","className","as"],u=s.forwardRef((function(e,o){var n=e.bsPrefix,t=e.className,s=e.as,u=void 0===s?"div":s,f=(0,a.Z)(e,d),p=(0,c.vE)(n,"row"),m=(0,c.pi)(),v=(0,c.zG)(),h="".concat(p,"-cols"),b=[];return m.forEach((function(e){var o,n=f[e];delete f[e],o=null!=n&&"object"===typeof n?n.cols:n;var r=e!==v?"-".concat(e):"";null!=o&&b.push("".concat(h).concat(r,"-").concat(o))})),(0,l.jsx)(u,(0,r.Z)((0,r.Z)({ref:o},f),{},{className:i().apply(void 0,[t,p].concat(b))}))}));u.displayName="Row",o.Z=u},7493:function(){}}]);
//# sourceMappingURL=335.73600e0e.chunk.js.map