"use strict";(self.webpackChunkownrecipes_web=self.webpackChunkownrecipes_web||[]).push([[52],{9724:(e,t,s)=>{s.d(t,{c:()=>_});var r=s(9060),i=s(1112),l=s(7640),a=s(3988),n=s(4120),c=s(264),o=s.n(c),d=s(768),u=s(5404),h=s(8330),g=s(1012),f=s(2496);const p=[{tag:"easy",icon:"bar-chart",variant:"light"},{tag:"vegetarian",icon:"tree",variant:"light"},{tag:"vegan",icon:"tree",variant:"filled"}],m=e=>{let{recipe:t}=e;const s=(0,d.c)(),i=(0,r.useMemo)((()=>{if(!t.oTags)return[];const e=[],r={...t.oTags};return r.vegetarian&&r.vegan&&delete r.vegetarian,p.forEach((i=>{null!==r&&void 0!==r&&r[i.tag]&&e.push((0,f.jsxs)(g.c,{children:[(0,f.jsx)(u.c,{icon:i.icon,variant:i.variant}),(0,h.$Q)(s,"tag.",i.tag)]},"".concat(t.id,"-").concat(i.tag)))})),e}),[t.oTags,s.locale]);return 0===i.length?null:(0,f.jsx)("div",{className:"tags-list",children:i})};var v=s(56),x=s(6240);function b(e){var t;if(e.photoThumbnail)return null!==(t=e.photoThumbnail)&&void 0!==t?t:(0,h.eQ)();{const t=["fish","fried-eggs","pizza","soup","steak"],s=Math.abs(function(e){let t=0;for(let s=0;s<e.length;++s)t=(t<<5)-t+e.charCodeAt(s),t&=t;return t}(e.title));return(0,h.oB)("/images/".concat(t[s%5],".jpg"))}}const _=e=>{let{data:t,lg:s=4,onOpenRecipe:c}=e;const d=(0,r.useMemo)((()=>(0,h.eQ)()),[]),u=(0,r.useMemo)((()=>({background:"url(".concat(d,") 100% center / cover")})),[d]),g=null===t||void 0===t?void 0:t.map((e=>{const t=(0,h.sL)("/recipe/".concat(e.slug));return(0,f.jsx)(l.c,{children:(0,f.jsx)(a.c,{className:o()("recipe"),children:(0,f.jsxs)(i.cH,{to:t,onClick:()=>c(e),children:[(0,f.jsx)(a.c.Img,{variant:"top",src:b(e),alt:"",style:u}),(0,f.jsx)(v.c,{stars:e.rating,count:e.ratingCount,collapsed:!0}),(0,f.jsx)(a.c.Title,{as:"h3",children:(0,f.jsx)(x.c,{id:e.slug,tooltip:e.title,placement:"bottom",className:"card-title-tooltip",children:e.title})}),e.oTags&&(0,f.jsx)(m,{recipe:e}),(0,f.jsx)(a.c.Text,{children:e.info})]})})},e.id)}));return(0,f.jsx)(n.c,{xs:1,sm:2,lg:s,className:"g-3 recipes-list",children:g})}},2092:(e,t,s)=>{s.d(t,{c:()=>n});var r=s(4120),i=s(7640),l=s(6776),a=s(2496);const n=()=>(0,a.jsx)(r.c,{children:(0,a.jsx)(i.c,{xs:12,children:(0,a.jsx)(r.c,{id:"browse",children:(0,a.jsx)("div",{className:"spinner",children:(0,a.jsx)(l.c,{})})})})})},5088:(e,t,s)=>{s.d(t,{c:()=>r});const r={limit:12,ordering:"-pub_date"}},9052:(e,t,s)=>{s.r(t),s.d(t,{buildSearchString:()=>ee,buildSearchUrl:()=>te,default:()=>se,mergeDefaultFilters:()=>X});var r=s(9060),i=s(768),l=s(6936),a=s(1112),n=s(1380),c=s(5248),o=(s(144),s(4120)),d=s(7640),u=s(5136),h=s(8814),g=s(1480),f=s(2672),p=s(6320),m=s(3536),v=s(8330),x=s(7804),b=s(524),_=s(1996);const j=e=>{let t=h.c(e,["limit","offset","ordering"]);return t=(0,_.Id)(t),t};var y=s(264),E=s.n(y),S=s(8224),M=s(2136),N=s(3988),w=s(1648),C=s(5404),k=s(6240),T=s(4748),U=s(2496);const q=(0,S.Os)({filter_active:{id:"filter.active",description:"Hint for ScreenReader that the filter is active",defaultMessage:"active"}}),O=e=>{let{title:t,qsTitle:s,data:l,qs:n,multiSelect:c,cssClass:o,buildUrl:d,sort:u}=e;const h=(0,i.c)(),{formatMessage:g}=h,f=(0,r.useMemo)((()=>{var e;let t=(null!==(e=null===l||void 0===l?void 0:l.map((e=>{let t=!1;if(n[s]&&n[s].split(",").includes(e.slug)&&(t=!0),t||null!=e.total&&0!==e.total)return{...e,label:(0,v.$Q)(h,"".concat(s,"."),e.title),active:t}})))&&void 0!==e?e:[]).filter((e=>null!=e));return null!=u&&"on"!==u||(t=t.sort(v.QH)),t}),[l,n,s]),p=(0,r.useMemo)((()=>{var e;return null!==(e=f.map((e=>(0,U.jsx)("li",{children:(0,U.jsx)(T.c,{condition:e.label.length>10,render:t=>(0,U.jsx)(k.c,{id:e.title,tooltip:e.label,placement:"bottom",className:"filter-title-tooltip",children:t}),children:(0,U.jsxs)(a.cH,{to:d(s,e.slug,c),className:E()("list-group-item list-group-item-action",{active:e.active}),children:[(0,U.jsx)("span",{className:"name",children:e.label}),(0,U.jsx)("span",{className:"count",children:"(".concat(e.total,")")}),e.active&&(0,U.jsx)(C.c,{icon:"x-square",variant:"light","aria-hidden":"true"}),(0,U.jsx)("span",{className:"sr-only",children:g(q.filter_active)})]})})},e.slug))))&&void 0!==e?e:[]}),[f,s,c,d]);return null!=l&&0===p.length?null:(0,U.jsxs)(w.c.Item,{eventKey:s,className:E()("filter-group",o),children:[(0,U.jsx)(w.c.Header,{as:"h3",className:"list-group-title",children:t}),(0,U.jsx)(w.c.Body,{as:"ul",className:"filter-list",children:p})]})};var R=s(1560);const F=(0,S.Os)({reset:{id:"filter.reset",description:"Filter reset",defaultMessage:"Reset"},filter_course:{id:"filter.filter_course",description:"Filter field course",defaultMessage:"Courses"},filter_cuisine:{id:"filter.filter_cuisine",description:"Filter field cuisine",defaultMessage:"Cuisines"},filter_rating:{id:"filter.filter_rating",description:"Filter field rating",defaultMessage:"Ratings"},filter_tag:{id:"filter.filter_tag",description:"Filter field tag",defaultMessage:"Tags"},title:{id:"filter.title",description:"Title",defaultMessage:"Title"},rating:{id:"filter.rating",description:"rating",defaultMessage:"Rating"},pub_date:{id:"filter.pub_date",description:"pub_date",defaultMessage:"Created Date"},filters:{id:"filter.filters",description:"Filters",defaultMessage:"Filters"},show_filters:{id:"filter.show_filters",description:"Show Filters",defaultMessage:"Show Filters"},hide_filters:{id:"filter.hide_filters",description:"Hide Filters",defaultMessage:"Hide Filters"},reset_filters:{id:"filter.reset_filters",description:"Reset Filters",defaultMessage:"Reset Filters"},filter_ordering:{id:"filter.filter_ordering",description:"Filter field ordering",defaultMessage:"Ordering"},x_stars:{id:"filter.x_stars",description:"X Stars",defaultMessage:"{rating, number} stars"},tips_advanced:{id:"filter.tips_advanced",description:"Advanced tips for filtering",defaultMessage:'Looking for more filters? Enter "author:your-username" in the search to find only your recipes.'}}),L=e=>{let{qs:t,courses:s,cuisines:l,ratings:n,tags:c,hasActiveFilter:o,resetFilterUrl:d,openFilters:u,setOpenFilters:h,buildUrl:g}=e;const{formatMessage:f}=(0,i.c)(),[p,m]=(0,r.useState)(!1),v=(0,r.useCallback)((()=>{m((e=>!e))}),[]),x=(0,U.jsxs)("div",{className:"sidebar-header",children:[(0,U.jsx)("h2",{children:(0,U.jsxs)(M.c,{type:"button",variant:"transparent",className:"filter-header",onClick:v,children:[f(p?F.hide_filters:F.show_filters),(0,U.jsx)(C.c,{icon:p?"chevron-up":"chevron-down",variant:"light",className:E()({"reset-margin":o})})]})}),o&&(0,U.jsx)("div",{className:"filter-header-clear",children:(0,U.jsx)(a.cH,{className:"clear-filter-mobile btn btn-transparent",to:d,children:f(F.reset)})})]}),b=(0,r.useCallback)((e=>{const t=Array.isArray(e)?e:[null!==e&&void 0!==e?e:""];h(t)}),[]);return(0,U.jsxs)(N.c,{children:[(0,U.jsx)(N.c.Header,{className:"visible-xs",children:x}),(0,U.jsxs)(N.c.Header,{className:"hidden-xs filter-title",children:[(0,U.jsx)("h2",{children:f(F.filters)}),o&&(0,U.jsx)(a.cH,{className:"clear-filter-desktop btn btn-transparent",to:d,"aria-label":f(F.reset_filters),children:(0,U.jsx)(C.c,{icon:"arrow-counterclockwise",variant:"light"})})]}),(0,U.jsxs)(N.c.Text,{as:"div",className:E()("sidebar",{"hidden-xs":!p}),children:[(0,U.jsxs)(w.c,{activeKey:u,flush:!0,alwaysOpen:!0,className:"filter-group-list",onSelect:b,children:[(0,U.jsx)(O,{title:f(F.filter_course),qsTitle:"course",data:s,qs:t,multiSelect:!0,buildUrl:g}),(0,U.jsx)(O,{title:f(F.filter_cuisine),qsTitle:"cuisine",data:l,qs:t,multiSelect:!0,buildUrl:g}),(0,U.jsx)(O,{title:f(F.filter_rating),qsTitle:"rating",data:null===n||void 0===n?void 0:n.map((e=>({id:e.rating,rating:e.rating,total:e.total,slug:e.rating.toString(),title:f(F.x_stars,{rating:e.rating})}))),qs:t,multiSelect:!0,buildUrl:g,sort:"off"}),(0,U.jsx)(O,{title:f(F.filter_tag),qsTitle:"tag",data:c,qs:t,multiSelect:!0,buildUrl:g})]}),o&&(0,U.jsx)("div",{className:"row reset-search-row print-hidden hidden-xs",children:(0,U.jsx)(a.cH,{className:"btn btn-outline-danger reset-search hidden-xs",to:d,children:f(F.reset)})}),(0,U.jsxs)(R.c,{variant:"body2",className:"filters-tip",children:[(0,U.jsx)(C.c,{icon:"lightbulb",style:{color:"var(--secondaryMain)"}}),f(F.tips_advanced)]})]})]})},B=e=>{let{qs:t,qsString:s,buildUrl:i}=e;const l=(0,x.OY)(),a=(0,x.w1)((e=>e.browse.browserFilter.courses.items)),n=(0,x.w1)((e=>e.browse.browserFilter.cuisines.items)),c=(0,x.w1)((e=>e.browse.browserFilter.ratings.items)),o=(0,x.w1)((e=>e.browse.browserFilter.tags.items)),[d,u]=(0,r.useState)(Object.keys(t)),h=t,_=()=>{const e=[];var t;d.includes("course")&&null==(null===a||void 0===a?void 0:a[s])&&e.push((t=h,e=>{e({...(0,x.gB)(b.EV,p.y.LOADING)}),(0,g.cp)().get(f.Q.course_count).query(j(t)).then((s=>e({...(0,x.gB)(b.EV,p.y.GET_SUCCESS),id:(0,v.EZ)(t),payload:s.body.results}))).catch((t=>e((0,m.GW)(t,b.EV))))})),d.includes("cuisine")&&null==(null===n||void 0===n?void 0:n[s])&&e.push((e=>t=>{t({...(0,x.gB)(b.AL,p.y.LOADING)}),(0,g.cp)().get(f.Q.cuisine_count).query(j(e)).then((s=>t({...(0,x.gB)(b.AL,p.y.GET_SUCCESS),id:(0,v.EZ)(e),payload:s.body.results}))).catch((e=>t((0,m.GW)(e,b.AL))))})(h)),d.includes("rating")&&null==(null===c||void 0===c?void 0:c[s])&&e.push((e=>t=>{t({...(0,x.gB)(b.ae,p.y.LOADING)}),(0,g.cp)().get(f.Q.rating_count).query(j(e)).then((s=>t({...(0,x.gB)(b.ae,p.y.GET_SUCCESS),id:(0,v.EZ)(e),payload:s.body.results}))).catch((e=>t((0,m.GW)(e,b.ae))))})(h)),d.includes("tag")&&null==(null===o||void 0===o?void 0:o[s])&&e.push((e=>t=>{t({...(0,x.gB)(b.cf,p.y.LOADING)}),(0,g.cp)().get(f.Q.tag_count).query(j(e)).then((s=>t({...(0,x.gB)(b.cf,p.y.GET_SUCCESS),id:(0,v.EZ)(e),payload:s.body.results}))).catch((s=>{404===s.status?t({...(0,x.gB)(b.cf,p.y.GET_SUCCESS),id:(0,v.EZ)(e),payload:[]}):t((0,m.GW)(s,b.cf))}))})(h));let r=0;for(let s=0;s<e.length;++s)setTimeout((()=>{l(e[s])}),r),r+=50};(0,r.useEffect)((()=>{_()}),[s,d]);const y=(0,r.useMemo)((()=>{if(t.search){const e=new URLSearchParams({search:t.search}).toString();return(0,v.sL)("/browser?".concat(e))}return(0,v.sL)("/browser")}),[t]),E=0!==Object.keys(t).filter((e=>!["limit","ordering","offset","search"].includes(e))).length;return(0,U.jsx)(L,{courses:null===a||void 0===a?void 0:a[s],cuisines:null===n||void 0===n?void 0:n[s],ratings:null===c||void 0===c?void 0:c[s],tags:null===o||void 0===o?void 0:o[s],qs:t,hasActiveFilter:E,resetFilterUrl:y,openFilters:d,setOpenFilters:u,buildUrl:i})};var A=s(5856),G=s(4712),I=s(70),Q=s(7380);const W=(0,S.Os)({search_title:{id:"searchbar.title",description:"Heading for the search page",defaultMessage:"Search"},input_placeholder:{id:"searchbar.placeholder",description:"SearchBar input placeholder",defaultMessage:"Enter a title, tag, or ingredient"},input_clear:{id:"input.clear",description:"Button to clear the input value (text)",defaultMessage:"Clear input"}}),D=e=>{let{value:t,doSearch:s}=e;const{formatMessage:l}=(0,i.c)(),[a,n]=(0,r.useState)({value:null!==t&&void 0!==t?t:""}),o=(0,r.useRef)(null!==t&&void 0!==t?t:"");(0,r.useEffect)((()=>{a.value!==t&&n({value:t})}),[t]),(0,r.useEffect)((()=>{o.current!==a.value&&(s(a.value),o.current=a.value)}),[a]);const d=(0,r.useCallback)(((e,t)=>{n((s=>{const r=c.c(s);return A.c(r,e,t),r}))}),[]),u=(0,r.useCallback)((()=>{n({value:""})}),[]),h=(0,U.jsx)(Q.c,{position:"end",children:(0,U.jsx)(G.c,{id:"clear_search_input",variant:"secondary",className:"search-clear",onClick:u,"aria-label":l(W.input_clear),children:(0,U.jsx)(C.c,{icon:"x",variant:"light",size:"2x"})})});return(0,U.jsxs)(U.Fragment,{children:[(0,U.jsx)("h1",{className:"sr-only",children:l(W.search_title)}),(0,U.jsx)(I.cp,{name:"value",value:a.value,placeholder:l(W.input_placeholder),required:!0,inputAdornmentStart:(0,U.jsx)(C.c,{icon:"search",variant:"light"}),inputAdornmentEnd:a.value.length>0?h:void 0,onChange:d,debounceTimeout:400,className:"search-bar"})]})};var H=s(2092),V=s(2016),P=s(5088);const Z=(0,S.Os)({search_summary_results:{id:"searchsummary.results",description:"Number of results, if there is no pagination.",defaultMessage:"{resultsCount, plural, one {# result} other {# results}}"},search_summary_results_pagination:{id:"searchsummary.results_pagination",description:"Number of results, with pagination from - to.",defaultMessage:"{offset}-{offsetLast} of {resultsCount} results"},search_summary_sort_by:{id:"searchsummary.sort_by",description:"Sort by title/...",defaultMessage:"Sort by: {sort}"},sort_by_pub_date:{id:"sort_by.pub_date",defaultMessage:"Create date"},sort_by_rating:{id:"sort_by.rating",defaultMessage:"Rating"},sort_by_title:{id:"sort_by.title",defaultMessage:"Title"}});function z(e){return e.startsWith("-")?e.substring(1):e}const Y=e=>{var t,s;let{search:l,qs:n,buildUrl:c}=e;const o=(0,i.c)(),{formatMessage:d}=o,u=null!==(t=null===l||void 0===l?void 0:l.totalRecipes)&&void 0!==t?t:0,h=(0,v.mq)(n.offset,0),g=(0,v.mq)(n.limit,null!==(s=P.c.limit)&&void 0!==s?s:12),f=null!=l&&l.totalRecipes>g,p=null!=n.ordering?z(n.ordering):z("-pub_date"),m=(0,r.useCallback)(((e,t)=>{p===t&&e.preventDefault()}),[p]),x=["title","-pub_date","-rating"].map((e=>{const t=z(e);return(0,U.jsx)(V.c.Item,{as:a.cH,to:c("ordering",e),active:p===t,onClick:e=>m(e,t),children:(0,v.$Q)(o,"sort_by.",t)},e)}));return(0,U.jsxs)("div",{className:"search-summary",children:[(0,U.jsxs)(R.c,{className:"results",children:[f&&d(Z.search_summary_results_pagination,{offset:h+1,offsetLast:Math.min(h+g,u),resultsCount:u}),!f&&d(Z.search_summary_results,{resultsCount:u})]}),(0,U.jsxs)(V.c,{className:"sort-by-dropdown",children:[(0,U.jsx)(V.c.Toggle,{variant:"outline-primary",id:"sort-by-button",disabled:null==l,children:d(Z.search_summary_sort_by,{sort:(0,v.$Q)(o,"sort_by.",p)})}),(0,U.jsx)(V.c.Menu,{children:x})]})]})},$=e=>{var t;let{search:s,qs:r,qsString:i,buildUrl:l,doSearch:a,onOpenRecipe:n}=e;const c=null!=s&&Object.keys(s).length>0,h=null===s||void 0===s?void 0:s[i];return(0,U.jsxs)(U.Fragment,{children:[(0,U.jsx)(D,{value:null!==(t=r.search)&&void 0!==t?t:"",doSearch:a}),(0,U.jsx)(Y,{qs:r,search:h,buildUrl:l}),!c&&(0,U.jsx)(H.c,{}),c&&(0,U.jsxs)(o.c,{children:[(0,U.jsx)(d.c,{xs:12,className:"filter-panel",children:(0,U.jsx)(B,{qs:r,qsString:i,buildUrl:l})}),(0,U.jsx)(d.c,{xs:12,className:"results-panel",children:(0,U.jsx)(u.c,{qs:r,qsString:i,buildUrl:l,onOpenRecipe:n})})]})]})};var K=s(9340),J=s(7173);function X(e,t){const s={};return Object.keys(e).forEach((t=>{s[t]=String(e[t])})),n.c(s,t)}function ee(e,t,s){const r=c.c(t);delete r.offset,""!==s?r.search=s:delete r.search;const i=(0,v.EZ)(r);return(0,v.sL)(i?"/".concat(e,"?").concat(i):"/".concat(e))}function te(e,t,s,r){let i=arguments.length>4&&void 0!==arguments[4]&&arguments[4];if(!s)return(0,v.sL)("/".concat(e));const l=c.c(t);if(delete l.offset,""!==r)if(l[s]&&i){const e=l[s].split(",");if(e.includes(r.toString()))if(1===e.length)delete l[s];else{let t="";e.map((e=>{e!=r&&(t+=e+",")})),l[s]=t.substring(0,t.length-1)}else l[s]="".concat(l[s],",").concat(r)}else l[s]=r;else delete l[s];const a=(0,v.EZ)(l);return(0,v.sL)(a?"/".concat(e,"?").concat(a):"/".concat(e))}const se=()=>{const e=(0,i.c)(),t=(0,x.OY)(),s=(0,l.i6)(),[n]=(0,a.k5)(),c=(0,x.w1)((e=>e.browse.browserSearch.items)),o=(0,r.useMemo)((()=>Object.fromEntries(n)),[n]),d=(0,r.useMemo)((()=>X(P.c,o)),[P.c,o]),u=(0,r.useMemo)((()=>(0,v.EZ)(d)),[d]);(0,r.useEffect)((()=>{t(_.Y5(d))}),[n]);const h=(0,r.useCallback)((function(e,t){return te("browser",o,e,t,arguments.length>2&&void 0!==arguments[2]&&arguments[2])}),[te,o]),g=(0,r.useCallback)((e=>{const t=ee("browser",o,e);s(t)}),[ee,o,s]),f=(0,r.useCallback)((e=>{t(K.Wm(e))}),[]);return(0,U.jsx)(J.c,{title:e.messages["nav.recipes"],children:(0,U.jsx)($,{qs:d,qsString:u,buildUrl:h,doSearch:g,onOpenRecipe:f,search:c})})}},5136:(e,t,s)=>{s.d(t,{c:()=>N});var r=s(9060),i=s(8224),l=s(768),a=s(7804),n=s(2124),c=s(5088),o=s(264),d=s.n(o),u=s(8330),h=s(9724),g=s(7948),f=s(1112),p=s(2496);const m=(0,r.forwardRef)(((e,t)=>{let{title:s,offset:i,active:l,buildUrl:a,disabled:n,className:c,...o}=e;const u=(0,r.useCallback)((e=>{(l||n)&&e.preventDefault()}),[l,n]);return(0,p.jsx)("li",{className:d()("page-item",c,{active:l,disabled:n}),...o,ref:t,children:(0,p.jsx)(f.cH,{className:d()("page-link","btn-outline-primary",{active:l,disabled:n}),to:n?"#":a("offset",i.toString()),onClick:u,children:s})})})),v=(0,i.Os)({pagination_previous:{id:"pagination.previous",description:"Button to previous pagination page",defaultMessage:"Previous"},pagination_next:{id:"pagination.next",description:"Button to next pagination page",defaultMessage:"Next"}});const x=e=>{let{offset:t,limit:s,count:i,buildUrl:l}=e;const a=Math.ceil(i/s),n=Math.ceil(t/s)+1,c=(0,r.useMemo)((()=>function(e,t){const s=[];if(t<=8){for(let e=1;e<=t;e++)s.push({index:e,role:"page"});return s}e>1&&s.push({index:1,role:"first"});let r=1,i=r;if(e>3){const t=Math.round((e-i)/2);i=e-t,s.push({index:i,role:"skipper-far"})}if(e>2){const t=Math.ceil((e-i)/3);e-t!==i&&(i=e-t,s.push({index:i,role:"skipper-near"}))}if(i=e,s.push({index:e,role:"page"}),i<t-1&&(i+=1,s.push({index:i,role:1===e?"first":"next"})),1===e&&(i+=1,s.push({index:i,role:"next"})),s.length<=4&&i<t-1&&(i+=1,s.push({index:i,role:"skipper-far"})),s.length<=4&&i<t-1&&(i+=1,s.push({index:i,role:"skipper-near"})),i<t-1){const e=s.length-1;if(r=t,i<t-2&&(r=i+Math.ceil((r-i)/2),s.push({index:r,role:"skipper-near"})),i<t-1){const t=Math.ceil((r-i)/3);t>0&&(r=i+t,s.splice(e+1,0,{index:r,role:"skipper-far"}))}}e!==t&&s.push({index:t,role:"last"});let l=s.findIndex((t=>t.index===e));if(-1===l)throw new Error("Internal error: Page index not found.");for(;s.length<8&&l>0;)for(;l>0;){const e=s[l].index;if(e-s[l-1].index>1){s.splice(l,0,{index:e-1,role:(a=s.filter((e=>"skipper-far"!==e.role)).length,a<4?"next":a<6?"skipper-near":"skipper-far")});break}--l}var a;return s}(n,a)),[n,a]).map((e=>(0,p.jsx)(m,{title:e.index.toString(),offset:s*(e.index-1),active:n===e.index,buildUrl:l,className:e.role},e.index.toString())));return(0,p.jsx)(p.Fragment,{children:c})},b=e=>{let{offset:t,limit:s,count:r,buildUrl:i}=e;const{formatMessage:a}=(0,l.c)(),n=t+s,c=t-s;return r<=s?null:(0,p.jsx)("nav",{children:(0,p.jsxs)(g.c,{children:[(0,p.jsx)(m,{title:"\u2190",offset:c,buildUrl:i,disabled:c<0,"aria-label":a(v.pagination_previous)},"previous"),(0,p.jsx)(x,{offset:t,limit:s,buildUrl:i,count:r}),(0,p.jsx)(m,{title:"\u2192",offset:n,buildUrl:i,disabled:n>r,"aria-label":a(v.pagination_previous)},"next")]})})},_=e=>{let{pending:t,search:s,qs:i,defaults:l,buildUrl:a,onOpenRecipe:n}=e;const c=(0,r.useMemo)((()=>(0,p.jsx)(h.c,{data:s.recipes,lg:3,onOpenRecipe:n})),[s.recipes,n]),o=(0,r.useMemo)((()=>{var e,t;return(0,p.jsx)(b,{limit:(0,u.mq)(i.limit,null!==(e=l.limit)&&void 0!==e?e:12),count:s.totalRecipes,offset:(0,u.mq)(i.offset,null!==(t=l.offset)&&void 0!==t?t:0),buildUrl:a})}),[s.totalRecipes,i,l,a,n]);return(0,p.jsxs)("div",{className:d()("results-container",{pending:t}),children:[c,o]})};var j=s(1560);const y=(0,i.Os)({no_results:{id:"browse.no_results",description:"No results header",defaultMessage:"There are no results for your search."}}),E=()=>{const{formatMessage:e}=(0,l.c)();return(0,p.jsx)(j.c,{className:"no-results placeholder",children:e(y.no_results)})};var S=s(2092);const M=(0,i.Os)({search_results_heading:{id:"browse.results_heading",description:"Browser search results heading",defaultMessage:"Results"}}),N=e=>{let{qs:t,qsString:s,buildUrl:i,onOpenRecipe:o}=e;const{formatMessage:d}=(0,l.c)(),u=(0,a.w1)((e=>e.browse.browserSearch)),h=u.meta.pending===n.A.LOADING,[g,f]=(0,r.useState)(void 0);return(0,r.useEffect)((()=>{var e;u.meta.pending===n.A.COMPLETED&&f(null===(e=u.items)||void 0===e?void 0:e[s])}),[u.meta.pending,u.items]),(0,r.useEffect)((()=>{var e;const t=null===(e=u.items)||void 0===e?void 0:e[s];t&&f(t)}),[s]),(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)("h2",{className:"sr-only",children:d(M.search_results_heading)}),h&&!g&&(0,p.jsx)(S.c,{}),!h&&(null==g||0===g.recipes.length)&&(0,p.jsx)(E,{}),null!=g&&g.recipes.length>0&&(0,p.jsx)(_,{pending:h,search:g,qs:t,defaults:c.c,buildUrl:i,onOpenRecipe:o})]})}},1996:(e,t,s)=>{s.d(t,{Id:()=>g,Mx:()=>p,Y5:()=>f});var r=s(1480),i=s(2672),l=s(6320),a=s(8330),n=s(7804),c=s(3536),o=s(1896);function d(e,t){var s,r;const i=null!==(s=null===t||void 0===t?void 0:t.delimiter)&&void 0!==s?s:",",l=null!==(r=null===t||void 0===t?void 0:t.escapeChar)&&void 0!==r?r:'"',a=[];let n=!1;for(let c=0,o=0,d=0;d<e.length;d++){const t=e[d],s=e[d+1];a[c]=a[c]||[],a[c][o]=a[c][o]||"",t===l&&n&&s===l?(a[c][o]+=t,++d):t!==l?t!==i||n?"\r"!==t||"\n"!==s||n?("\n"!==t||n)&&("\r"!==t||n)?a[c][o]+=t:(++c,o=0):(++c,o=0,++d):(s||(a[c][++o]=""),++o):n=!n}return a}const u={cuisine:"cuisine__slug",course:"course__slug",tag:"tag__slug",author:"author__username"},h=["author","cuisine","course","directions","info","ordering","rating","source","tag","title"];function g(e){if(!e.search||!e.search.includes(":"))return e;const t={...e},s=d(t.search,{delimiter:" "})[0],r=[];return s.forEach((e=>{if(e.includes(":")){const s=d(e,{delimiter:":"})[0];if(2===s.length){const e=s[0].toLocaleLowerCase();if(h.includes(e))return void(t[e]=s[1])}}r.push(e)})),t.search=r.join(" "),t}const f=e=>t=>{t({...(0,n.gB)(o.Q,l.y.LOADING)});let s=g(e);s=function(e,t){const s={};return Object.keys(e).forEach((r=>{null!==e[r]&&(s[r in t?t[r]:r]=e[r])})),s}(s,u),(0,r.cp)().get(i.Q.browse).query(s).then((s=>{const r=s.body;t({...(0,n.gB)(o.Q,l.y.GET_SUCCESS),id:(0,a.EZ)(e),payload:(0,o.w)(r)})})).catch((e=>{t((0,c.GW)(e,o.Q))}))},p=e=>t=>{t({...(0,n.gB)(o.Q,l.y.LOADING)});const s={};Object.keys(e).forEach((t=>{null!==e[t]&&(s[t in u?u[t]:t]=e[t])})),(0,r.cp)().get(i.Q.mini_browse).query(s).then((s=>{const r=s.body;t({...(0,n.gB)(o.Q,l.y.GET_SUCCESS),id:(0,a.EZ)(e),payload:(0,o.w)(r)})})).catch((e=>{t((0,c.GW)(e,o.Q))}))}},4712:(e,t,s)=>{s.d(t,{c:()=>c});var r=s(9060),i=s(2136),l=(s(7272),s(4748)),a=s(6240),n=s(2496);const c=(0,r.forwardRef)(((e,t)=>{let{id:s,tooltip:r,tooltipPlacement:c,children:o,...d}=e;return(0,n.jsx)(l.c,{condition:Boolean(r),render:e=>(0,n.jsx)(a.c,{id:"".concat(s,"-tooltip"),tooltip:r,placement:c,children:e}),children:(0,n.jsx)(i.c,{id:s,"aria-label":r||void 0,"aria-describedby":void 0,...d,ref:t,children:o})})}))},7173:(e,t,s)=>{s.d(t,{c:()=>u});var r=s(9060),i=s(544),l=s(6936),a=s(9352),n=s(8330),c=s(8684),o=s(2496);function d(e){var t,s;const r=e.startsWith(null!==(t=(0,n.W4)("PUBLIC_URL"))&&void 0!==t?t:"")?e.substring((null!==(s=(0,n.W4)("PUBLIC_URL"))&&void 0!==s?s:"").length):e,i=r.startsWith("/"),l=r.endsWith("/");return r.substring(i?1:0,l?r.length-1:void 0)}const u=e=>{let{title:t,id:s,state:u,children:h}=e;const g=(0,l.i6)(),f=(0,l.IT)(),p=null===u||void 0===u?void 0:u.meta.error,m=(0,r.useContext)(a.c);return(0,r.useEffect)((()=>{document.title="".concat(null!=t&&t.length>0?"".concat(t," | "):"","OwnRecipes")}),[t]),(0,r.useEffect)((()=>{if(p&&null==s){const e=(0,n.sL)("/NotFound");g(e)}}),[s,p]),(0,o.jsx)(i.c,{id:"main-container",as:"main",className:d(f.pathname),style:{marginTop:"".concat(m.toolbarHeight,"px")},children:(0,o.jsx)(c.c,{verbose:!0,printStack:!0,children:h})})}},56:(e,t,s)=>{s.d(t,{c:()=>p});var r=s(9060),i=s(8224),l=s(768),a=s(264),n=s.n(a),c=s(2136),o=s(5404),d=s(4748),u=s(2496);const h=(0,i.Os)({star_alt:{id:"rating_comments.star_alt",description:"Alt text for star button, for screen reader.",defaultMessage:"Select to rate item {stars, plural, one {# star} other {# stars}}"},stars_alt:{id:"rating_comments.stars_alt",description:"Alt text for read-only stars (view).",defaultMessage:"{stars} out of 5 stars"},rating_count:{id:"rating_comments.rating_count",description:"Rating count (view).",defaultMessage:"{count} ratings"}}),g=e=>{let{stars:t,num:s,onChange:i}=e;const{formatMessage:a}=(0,l.c)(),n=(0,r.useCallback)((()=>{null===i||void 0===i||i(s)}),[i,s]),g=t>s-1&&t<s,f=g?"star-half":"star",p=s>t||g?"light":"filled";return(0,u.jsx)(d.c,{condition:null!=i,render:e=>(0,u.jsx)(c.c,{variant:"transparent",className:"rating",onClick:n,children:e}),children:(0,u.jsx)(o.c,{icon:f,variant:p,size:null!=i?"2x":"1x",ariaLabel:i?a(h.star_alt,{stars:s}):void 0},s)},s)},f=e=>{let{stars:t}=e;const s=t>0&&t<4,r=s?"star-half":"star",i=0===t||s?"light":"filled";return(0,u.jsx)(o.c,{icon:r,variant:i,size:"1x"},t)},p=e=>{let{stars:t,count:s,showCount:i=!0,collapsed:a=!1,onChange:c}=e;const{formatMessage:o}=(0,l.c)();let d=t;t>5?d=5:t<0&&(d=0);const p=(0,r.useMemo)((()=>a?(0,u.jsx)(f,{stars:d}):Array.from({length:5},((e,t)=>t+1)).map((e=>(0,u.jsx)(g,{stars:d,num:e,onChange:c},e)))),[d,a,c]),m=t>0?"".concat(t,"/5"):"",v=!i||0!==t&&!s||c?void 0:null!==s&&void 0!==s?s:0;return(0,u.jsxs)("div",{className:"rating-stars",children:[(0,u.jsx)("span",{className:n()("stars-icons",{active:t>0}),"aria-hidden":!0,children:p}),m&&(0,u.jsx)("span",{className:"rating-text","aria-hidden":!0,children:m}),(0,u.jsx)("span",{className:"sr-only",children:o(h.stars_alt,{stars:d})}),null!=v&&(0,u.jsx)("span",{className:"rating-count",children:"(".concat(a?v:o(h.rating_count,{count:v}),")")})]})}},9340:(e,t,s)=>{s.d(t,{AJ:()=>d,Bh:()=>u,Se:()=>h,Wm:()=>g,Ws:()=>o,a_:()=>f});var r=s(1480),i=s(2672),l=s(6320),a=s(7804),n=s(3536),c=s(8936);const o=e=>({...(0,a.gB)(c.EV,l.y.GET_SUCCESS),payload:e}),d=e=>t=>{t({...(0,a.gB)(c.EV,l.y.GET_START)}),(0,r.cp)().get("".concat(i.Q.recipe).concat(e,"/")).then((e=>{t(o((0,c.yW)(e.body)))})).catch((e=>t((0,n.GW)(e,c.EV))))},u=(e,t)=>s=>{s({...(0,a.gB)(c.EV,l.y.DELETE_START)}),(0,r.cp)().delete("".concat(i.Q.recipe).concat(t,"/")).then((()=>{s({...(0,a.gB)(c.EV,c.Vw.RECIPE_DELETE),payload:{id:e}})})).catch((e=>s((0,n.GW)(e,c.EV))))},h=(e,t)=>s=>{s({...(0,a.gB)(c.EV,c.Vw.RECIPE_INGREDIENT_SERVINGS_UPDATE),payload:{recipeSlug:e,customServings:t}})},g=e=>t=>{t({...(0,a.gB)(c.EV,l.y.PRELOAD),payload:e})},f=()=>e=>{e({...(0,a.gB)(c.EV,l.y.RESET)})}},144:()=>{}}]);
//# sourceMappingURL=52.0eca1a6b.chunk.js.map