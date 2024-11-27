"use strict";(self.webpackChunkownrecipes_web=self.webpackChunkownrecipes_web||[]).push([[594],{2235:(e,t,s)=>{s.d(t,{A:()=>_});var i=s(5043),r=s(1318),a=s(8602),l=s(8628),n=s(1072),o=s(8139),c=s.n(o),d=s(97),u=s(6308),h=s(5838),p=s(5456),g=s(579);const f=[{tag:"easy",icon:"bar-chart",variant:"light"},{tag:"vegetarian",icon:"tree",variant:"light"},{tag:"vegan",icon:"tree",variant:"filled"}],v=e=>{let{recipe:t}=e;const s=(0,d.A)(),r=(0,i.useMemo)((()=>{if(!t.oTags)return[];const e=[],i={...t.oTags};return i.vegetarian&&i.vegan&&delete i.vegetarian,f.forEach((r=>{null!==i&&void 0!==i&&i[r.tag]&&e.push((0,g.jsxs)(p.A,{children:[(0,g.jsx)(u.A,{icon:r.icon,variant:r.variant}),(0,h.yW)(s,"tag.",r.tag)]},`${t.id}-${r.tag}`))})),e}),[t.oTags,s.locale]);return 0===r.length?null:(0,g.jsx)("div",{className:"tags-list",children:r})};var m=s(933),x=s(8563);function b(e){var t;if(e.photoThumbnail)return null!==(t=e.photoThumbnail)&&void 0!==t?t:(0,h.P)();{const t=["fish","fried-eggs","pizza","soup","steak"],s=Math.abs(function(e){let t=0;for(let s=0;s<e.length;++s)t=(t<<5)-t+e.charCodeAt(s),t&=t;return t}(e.title));return(0,h.sF)(`/images/${t[s%5]}.jpg`)}}const _=e=>{let{data:t,lg:s=4,onOpenRecipe:o}=e;const d=(0,i.useMemo)((()=>(0,h.P)()),[]),u=(0,i.useMemo)((()=>({background:`url(${d}) 100% center / cover`})),[d]),p=null===t||void 0===t?void 0:t.map((e=>{const t=(0,h.hp)(`/recipe/${e.slug}`);return(0,g.jsx)(a.A,{children:(0,g.jsxs)(l.A,{className:c()("recipe",e.className),children:[e.header&&(0,g.jsx)(l.A.Header,{children:e.header}),(0,g.jsxs)(r.N_,{to:t,onClick:()=>o(e),children:[(0,g.jsx)(l.A.Img,{variant:"top",src:b(e),alt:"",style:u}),(0,g.jsx)(m.A,{stars:e.rating,count:e.ratingCount,collapsed:!0}),(0,g.jsx)(l.A.Title,{as:"h3",children:(0,g.jsx)(x.A,{id:e.slug,tooltip:e.title,placement:"bottom",className:"card-title-tooltip",children:e.title})}),e.oTags&&(0,g.jsx)(v,{recipe:e}),(0,g.jsx)(l.A.Text,{children:e.info})]}),e.footer&&(0,g.jsx)(l.A.Footer,{children:e.footer})]})},e.key||e.id)}));return(0,g.jsx)(n.A,{xs:1,sm:2,lg:s,className:"g-3 recipes-list",children:p})}},894:(e,t,s)=>{s.d(t,{A:()=>n});var i=s(1072),r=s(8602),a=s(7367),l=s(579);const n=()=>(0,l.jsx)(i.A,{children:(0,l.jsx)(r.A,{xs:12,children:(0,l.jsx)(i.A,{id:"browse",children:(0,l.jsx)("div",{className:"spinner",children:(0,l.jsx)(a.A,{})})})})})},4987:(e,t,s)=>{s.d(t,{A:()=>i});const i={limit:12,ordering:"-pub_date"}},594:(e,t,s)=>{s.r(t),s.d(t,{buildSearchString:()=>re,buildSearchUrl:()=>ae,default:()=>le,mergeDefaultFilters:()=>ie});var i=s(5043),r=s(97),a=s(6971),l=s(1318),n=s(4950),o=s(7032),c=(s(1840),s(1072)),d=s(8602),u=s(2316),h=s(1063),p=s(4572),g=s(1948),f=s(6746),v=s(6847),m=s(9140),x=s(5838),b=s(5386),_=s(1052),j=s(3839);const A=e=>{let t=p.A(e,["limit","offset","ordering"]);return t=(0,j.HU)(t),t};var y=s(8139),S=s.n(y),N=s(3626),M=s(4282),C=s(8628),E=s(457),w=s(6308),U=s(2521),O=s(5456),k=s(8563),T=s(824),F=s(579);const q=(0,N.YK)({filter_active:{id:"filter.active",description:"Hint for ScreenReader that the filter is active",defaultMessage:"active"}}),R=e=>{let{title:t,active:s}=e;return(0,F.jsxs)(F.Fragment,{children:[`${t}`,s>0&&(0,F.jsx)(O.A,{color:"primary",children:s})]})},$=e=>{let{title:t,qsTitle:s,data:a,qs:n,multiSelect:o,cssClass:c,buildUrl:d,sort:u}=e;const h=(0,r.A)(),{formatMessage:p}=h,g=(0,i.useMemo)((()=>{var e;let t=(null!==(e=null===a||void 0===a?void 0:a.map((e=>{let t=!1;if(n[s]&&n[s].split(",").includes(e.slug)&&(t=!0),t||null!=e.total&&0!==e.total)return{...e,label:(0,x.yW)(h,`${s}.`,e.title),active:t}})))&&void 0!==e?e:[]).filter((e=>null!=e));return null!=u&&"on"!==u||(t=t.sort(x.eb)),t}),[a,n,s,h.locale]),f=(0,i.useMemo)((()=>{var e;return null!==(e=g.map((e=>(0,F.jsx)("li",{children:(0,F.jsx)(T.A,{condition:e.label.length>10,render:t=>(0,F.jsx)(k.A,{id:e.title,tooltip:e.label,placement:"bottom",className:"filter-title-tooltip",children:t}),children:(0,F.jsxs)(l.N_,{to:d(s,e.slug,o),className:S()("list-group-item list-group-item-action",{active:e.active}),children:[(0,F.jsx)("span",{className:"name",children:e.label}),(0,F.jsx)("span",{className:"count",children:`(${e.total})`}),e.active&&(0,F.jsx)(w.A,{icon:"x-square",variant:"light","aria-hidden":"true"}),(0,F.jsx)("span",{className:"sr-only",children:p(q.filter_active)})]})})},e.slug))))&&void 0!==e?e:[]}),[g,s,o,d,h.locale]);return null!=a&&0===f.length?null:(0,F.jsxs)(E.A.Item,{eventKey:s,className:S()("filter-group",c),children:[(0,F.jsx)(E.A.Header,{as:"h3",className:"list-group-title",children:(0,F.jsx)(R,{title:t,active:g.filter((e=>e.active)).length})}),(0,F.jsx)(E.A.Body,{as:"ul",className:"filter-list",children:f})]})},L=(0,N.YK)({reset:{id:"filter.reset",description:"Filter reset",defaultMessage:"Reset"},filter_course:{id:"filter.filter_course",description:"Filter field course",defaultMessage:"Courses"},filter_cuisine:{id:"filter.filter_cuisine",description:"Filter field cuisine",defaultMessage:"Cuisines"},filter_rating:{id:"filter.filter_rating",description:"Filter field rating",defaultMessage:"Ratings"},filter_season:{id:"filter.filter_season",description:"Filter field season",defaultMessage:"Seasons"},filter_tag:{id:"filter.filter_tag",description:"Filter field tag",defaultMessage:"Tags"},title:{id:"filter.title",description:"Title",defaultMessage:"Title"},rating:{id:"filter.rating",description:"rating",defaultMessage:"Rating"},pub_date:{id:"filter.pub_date",description:"pub_date",defaultMessage:"Created Date"},filters:{id:"filter.filters",description:"Filters",defaultMessage:"Filters"},show_filters:{id:"filter.show_filters",description:"Show Filters",defaultMessage:"Show Filters"},hide_filters:{id:"filter.hide_filters",description:"Hide Filters",defaultMessage:"Hide Filters"},reset_filters:{id:"filter.reset_filters",description:"Reset Filters",defaultMessage:"Reset Filters"},filter_ordering:{id:"filter.filter_ordering",description:"Filter field ordering",defaultMessage:"Ordering"},x_stars:{id:"filter.x_stars",description:"X Stars",defaultMessage:"{rating, number} stars"},tips_advanced:{id:"filter.tips_advanced",description:"Advanced tips for filtering",defaultMessage:'Looking for more filters? Enter "author:your-username" in the search to find only your recipes.'}}),G=e=>{let{qs:t,courses:s,cuisines:a,ratings:n,seasons:o,tags:c,activeFilters:d,resetFilterUrl:u,openFilters:h,setOpenFilters:p,buildUrl:g}=e;const{formatMessage:f}=(0,r.A)(),[v,m]=(0,i.useState)(!1),x=(0,i.useCallback)((()=>{m((e=>!e))}),[]),b=(0,i.useMemo)((()=>Object.values(d).flatMap((e=>e.split(","))).length),[d]),_=(0,F.jsxs)("div",{className:"sidebar-header",children:[(0,F.jsx)("h2",{children:(0,F.jsxs)(M.A,{type:"button",variant:"transparent",className:"filter-header",onClick:x,children:[f(v?L.hide_filters:L.show_filters),b>0&&(0,F.jsx)(O.A,{color:"primary",children:b}),(0,F.jsx)(w.A,{icon:v?"chevron-up":"chevron-down",variant:"light",className:S()({"reset-margin":Boolean(b)})})]})}),b>0&&(0,F.jsx)("div",{className:"filter-header-clear",children:(0,F.jsx)(l.N_,{className:"clear-filter-mobile btn btn-transparent",to:u,children:f(L.reset)})})]}),j=(0,i.useCallback)((e=>{const t=Array.isArray(e)?e:[null!==e&&void 0!==e?e:""];p(t)}),[]);return(0,F.jsxs)(C.A,{children:[(0,F.jsx)(C.A.Header,{className:"visible-xs",children:_}),(0,F.jsxs)(C.A.Header,{className:"hidden-xs filter-title",children:[(0,F.jsx)("h2",{children:f(L.filters)}),b>0&&(0,F.jsxs)(F.Fragment,{children:[(0,F.jsx)(O.A,{color:"primary",children:b}),(0,F.jsx)(k.A,{id:"clear-filter-desktop-btn-tooltip",tooltip:f(L.reset_filters),children:(0,F.jsx)(l.N_,{className:"clear-filter-desktop btn btn-transparent",to:u,"aria-label":f(L.reset_filters),children:(0,F.jsx)(w.A,{icon:"arrow-counterclockwise",variant:"light"})})})]})]}),(0,F.jsxs)(C.A.Text,{as:"div",className:S()("sidebar",{"hidden-xs":!v}),children:[(0,F.jsxs)(E.A,{activeKey:h,flush:!0,alwaysOpen:!0,className:"filter-group-list",onSelect:j,children:[(0,F.jsx)($,{title:f(L.filter_course),qsTitle:"course",data:s,qs:t,multiSelect:!0,buildUrl:g}),(0,F.jsx)($,{title:f(L.filter_cuisine),qsTitle:"cuisine",data:a,qs:t,multiSelect:!0,buildUrl:g}),(0,F.jsx)($,{title:f(L.filter_season),qsTitle:"season",data:o,qs:t,multiSelect:!0,buildUrl:g}),(0,F.jsx)($,{title:f(L.filter_rating),qsTitle:"rating",data:null===n||void 0===n?void 0:n.map((e=>({id:e.rating,rating:e.rating,total:e.total,slug:e.rating.toString(),title:f(L.x_stars,{rating:e.rating})}))),qs:t,multiSelect:!0,buildUrl:g,sort:"off"}),(0,F.jsx)($,{title:f(L.filter_tag),qsTitle:"tag",data:c,qs:t,multiSelect:!0,buildUrl:g})]}),b>0&&(0,F.jsx)("div",{className:"row reset-search-row print-hidden hidden-xs",children:(0,F.jsx)(l.N_,{className:"btn btn-outline-danger reset-search hidden-xs",to:u,children:f(L.reset)})}),(0,F.jsxs)(U.A,{variant:"body2",className:"filters-tip",children:[(0,F.jsx)(w.A,{icon:"lightbulb",style:{color:"var(--secondaryMain)"}}),f(L.tips_advanced)]})]})]})},H=e=>{let{qs:t,qsString:s,buildUrl:r}=e;const a=(0,b.wA)(),l=(0,b.d4)((e=>e.browse.browserFilter.filter_courses.items)),n=(0,b.d4)((e=>e.browse.browserFilter.filter_cuisines.items)),o=(0,b.d4)((e=>e.browse.browserFilter.filter_ratings.items)),c=(0,b.d4)((e=>e.browse.browserFilter.filter_seasons.items)),d=(0,b.d4)((e=>e.browse.browserFilter.filter_tags.items)),[u,p]=(0,i.useState)(Object.keys(t)),j=t,y=()=>{const e=[];var t;u.includes("course")&&null==(null===l||void 0===l?void 0:l[s])&&e.push((t=j,e=>{e({...(0,b.OS)(_.ug,v.h.LOADING)}),(0,g.Ay)().get(f.U.course_count).query(A(t)).then((s=>e({...(0,b.OS)(_.ug,v.h.GET_SUCCESS),id:(0,x.an)(t),payload:s.body.results}))).catch((t=>e((0,m.H4)(t,_.ug))))})),u.includes("cuisine")&&null==(null===n||void 0===n?void 0:n[s])&&e.push((e=>t=>{t({...(0,b.OS)(_.vl,v.h.LOADING)}),(0,g.Ay)().get(f.U.cuisine_count).query(A(e)).then((s=>t({...(0,b.OS)(_.vl,v.h.GET_SUCCESS),id:(0,x.an)(e),payload:s.body.results}))).catch((e=>t((0,m.H4)(e,_.vl))))})(j)),u.includes("rating")&&null==(null===o||void 0===o?void 0:o[s])&&e.push((e=>t=>{t({...(0,b.OS)(_.e4,v.h.LOADING)}),(0,g.Ay)().get(f.U.rating_count).query(A(e)).then((s=>t({...(0,b.OS)(_.e4,v.h.GET_SUCCESS),id:(0,x.an)(e),payload:s.body.results}))).catch((e=>t((0,m.H4)(e,_.e4))))})(j)),u.includes("season")&&null==(null===c||void 0===c?void 0:c[s])&&e.push((e=>t=>{t({...(0,b.OS)(_.HP,v.h.LOADING)}),(0,g.Ay)().get(f.U.season_count).query(A(e)).then((s=>t({...(0,b.OS)(_.HP,v.h.GET_SUCCESS),id:(0,x.an)(e),payload:s.body.results}))).catch((e=>t((0,m.H4)(e,_.HP))))})(j)),u.includes("tag")&&null==(null===d||void 0===d?void 0:d[s])&&e.push((e=>t=>{t({...(0,b.OS)(_.sv,v.h.LOADING)}),(0,g.Ay)().get(f.U.tag_count).query(A(e)).then((s=>t({...(0,b.OS)(_.sv,v.h.GET_SUCCESS),id:(0,x.an)(e),payload:s.body.results}))).catch((e=>t((0,m.H4)(e,_.sv))))})(j));let i=0;for(let s=0;s<e.length;++s)setTimeout((()=>{a(e[s])}),i),i+=50};(0,i.useEffect)((()=>{y()}),[s,u]);const S=(0,i.useMemo)((()=>{if(t.search){const e=new URLSearchParams({search:t.search}).toString();return(0,x.hp)(`/browser?${e}`)}return(0,x.hp)("/browser")}),[t]),N=(0,i.useMemo)((()=>(0,h.A)(t,((e,t)=>!["limit","ordering","offset","search"].includes(t)))),[t]);return(0,F.jsx)(G,{courses:null===l||void 0===l?void 0:l[s],cuisines:null===n||void 0===n?void 0:n[s],ratings:null===o||void 0===o?void 0:o[s],seasons:null===c||void 0===c?void 0:c[s],tags:null===d||void 0===d?void 0:d[s],qs:t,activeFilters:N,resetFilterUrl:S,openFilters:u,setOpenFilters:p,buildUrl:r})};var I=s(7283),D=s(2437),P=s(2085),B=s(6376);const K=(0,N.YK)({search_title:{id:"searchbar.title",description:"Heading for the search page",defaultMessage:"Search"},input_placeholder:{id:"searchbar.placeholder",description:"SearchBar input placeholder",defaultMessage:"Enter a title, tag, or ingredient"},input_clear:{id:"input.clear",description:"Button to clear the input value (text)",defaultMessage:"Clear input"}}),W=e=>{let{value:t,doSearch:s}=e;const{formatMessage:a}=(0,r.A)(),[l,n]=(0,i.useState)({value:null!==t&&void 0!==t?t:""}),c=(0,i.useRef)(null!==t&&void 0!==t?t:"");(0,i.useEffect)((()=>{l.value!==t&&n({value:t})}),[t]),(0,i.useEffect)((()=>{c.current!==l.value&&(s(l.value),c.current=l.value)}),[l]);const d=(0,i.useCallback)(((e,t)=>{n((s=>{const i=o.A(s);return I.A(i,e,t),i}))}),[]),u=(0,i.useCallback)((()=>{n({value:""})}),[]),h=(0,F.jsx)(B.A,{position:"end",children:(0,F.jsx)(D.A,{id:"clear_search_input",variant:"secondary",className:"search-clear",onClick:u,"aria-label":a(K.input_clear),children:(0,F.jsx)(w.A,{icon:"x",variant:"light",size:"2x"})})});return(0,F.jsxs)(F.Fragment,{children:[(0,F.jsx)("h1",{className:"sr-only",children:a(K.search_title)}),(0,F.jsx)(P.Ay,{name:"value",value:l.value,placeholder:a(K.input_placeholder),required:!0,inputAdornmentStart:(0,F.jsx)(w.A,{icon:"search",variant:"light"}),inputAdornmentEnd:l.value.length>0?h:void 0,onChange:d,debounceTimeout:400,className:"search-bar"})]})};var Y=s(894),z=s(5258),Q=s(4987);const X=(0,N.YK)({search_summary_results:{id:"searchsummary.results",description:"Number of results, if there is no pagination.",defaultMessage:"{resultsCount, plural, one {# result} other {# results}}"},search_summary_results_pagination:{id:"searchsummary.results_pagination",description:"Number of results, with pagination from - to.",defaultMessage:"{offset}-{offsetLast} of {resultsCount} results"},search_summary_sort_by:{id:"searchsummary.sort_by",description:"Sort by title/...",defaultMessage:"Sort by: {sort}"},sort_by_pub_date:{id:"sort_by.pub_date",defaultMessage:"Create date"},sort_by_rating:{id:"sort_by.rating",defaultMessage:"Rating"},sort_by_title:{id:"sort_by.title",defaultMessage:"Title"}});function Z(e){return e.startsWith("-")?e.substring(1):e}const V=e=>{var t,s;let{search:a,qs:n,buildUrl:o}=e;const c=(0,r.A)(),{formatMessage:d}=c,u=null!==(t=null===a||void 0===a?void 0:a.totalRecipes)&&void 0!==t?t:0,h=(0,x.ax)(n.offset,0),p=(0,x.ax)(n.limit,null!==(s=Q.A.limit)&&void 0!==s?s:12),g=null!=a&&a.totalRecipes>p,f=null!=n.ordering?Z(n.ordering):Z("-pub_date"),v=(0,i.useCallback)(((e,t)=>{f===t&&e.preventDefault()}),[f]),m=["title","-pub_date","-rating"].map((e=>{const t=Z(e);return(0,F.jsx)(z.A.Item,{as:l.N_,to:o("ordering",e),active:f===t,onClick:e=>v(e,t),children:(0,x.yW)(c,"sort_by.",t)},e)}));return(0,F.jsxs)("div",{className:"search-summary",children:[(0,F.jsxs)(U.A,{className:"results",children:[g&&d(X.search_summary_results_pagination,{offset:h+1,offsetLast:Math.min(h+p,u),resultsCount:u}),!g&&d(X.search_summary_results,{resultsCount:u})]}),(0,F.jsxs)(z.A,{className:"sort-by-dropdown",children:[(0,F.jsx)(z.A.Toggle,{variant:"outline-primary",id:"sort-by-button",disabled:null==a,children:d(X.search_summary_sort_by,{sort:(0,x.yW)(c,"sort_by.",f)})}),(0,F.jsx)(z.A.Menu,{children:m})]})]})},J=e=>{var t;let{search:s,qs:i,qsString:r,buildUrl:a,doSearch:l,onOpenRecipe:n}=e;const o=null!=s&&Object.keys(s).length>0,h=null===s||void 0===s?void 0:s[r];return(0,F.jsxs)(F.Fragment,{children:[(0,F.jsx)(W,{value:null!==(t=i.search)&&void 0!==t?t:"",doSearch:l}),(0,F.jsx)(V,{qs:i,search:h,buildUrl:a}),!o&&(0,F.jsx)(Y.A,{}),o&&(0,F.jsxs)(c.A,{children:[(0,F.jsx)(d.A,{xs:12,className:"filter-panel",children:(0,F.jsx)(H,{qs:i,qsString:r,buildUrl:a})}),(0,F.jsx)(d.A,{xs:12,className:"results-panel",children:(0,F.jsx)(u.A,{qs:i,qsString:r,buildUrl:a,onOpenRecipe:n})})]})]})};var ee=s(3306),te=s(8591),se=s(3702);function ie(e,t){const s={};return Object.keys(e).forEach((t=>{s[t]=String(e[t])})),n.A(s,t)}function re(e,t,s){const i=o.A(t);delete i.offset,""!==s?i.search=s:delete i.search;const r=(0,x.an)(i);return(0,x.hp)(r?`/${e}?${r}`:`/${e}`)}function ae(e,t,s,i){let r=arguments.length>4&&void 0!==arguments[4]&&arguments[4];if(!s)return(0,x.hp)(`/${e}`);const a=o.A(t);if(delete a.offset,""!==i)if(a[s]&&r){const e=a[s].split(",");if(e.includes(i.toString()))if(1===e.length)delete a[s];else{let t="";e.map((e=>{e!=i&&(t+=e+",")})),a[s]=t.substring(0,t.length-1)}else a[s]=`${a[s]},${i}`}else a[s]=i;else delete a[s];const l=(0,x.an)(a);return(0,x.hp)(l?`/${e}?${l}`:`/${e}`)}const le=()=>{const e=(0,r.A)(),t=(0,b.wA)(),s=(0,a.Zp)(),[n]=(0,l.ok)(),o=(0,b.d4)((e=>e.browse.browserSearch.items)),c=(0,i.useMemo)((()=>Object.fromEntries(n)),[n]),d=(0,i.useMemo)((()=>ie(Q.A,c)),[Q.A,c]),u=(0,i.useMemo)((()=>(0,x.an)(d)),[d]);(0,i.useEffect)((()=>{t(j.Q5(d))}),[n]);const h=(0,i.useCallback)((function(e,t){return ae("browser",c,e,t,arguments.length>2&&void 0!==arguments[2]&&arguments[2])}),[ae,c]),p=(0,i.useCallback)((e=>{const t=re("browser",c,e);s(t)}),[re,c,s]),g=(0,i.useCallback)((e=>{t(ee.uv(e))}),[]);return(0,F.jsxs)(te.A,{title:e.messages["nav.recipes"],children:[(0,F.jsx)(se.A,{scrollOnKeyChange:!0}),(0,F.jsx)(J,{qs:d,qsString:u,buildUrl:h,doSearch:p,onOpenRecipe:g,search:o})]})}},2316:(e,t,s)=>{s.d(t,{A:()=>M});var i=s(5043),r=s(3626),a=s(97),l=s(5386),n=s(7341),o=s(4987),c=s(8139),d=s.n(c),u=s(5838),h=s(2235),p=s(7491),g=s(1318),f=s(579);const v=(0,i.forwardRef)(((e,t)=>{let{title:s,offset:r,active:a,buildUrl:l,disabled:n,className:o,...c}=e;const u=(0,i.useCallback)((e=>{(a||n)&&e.preventDefault()}),[a,n]);return(0,f.jsx)("li",{className:d()("page-item",o,{active:a,disabled:n}),...c,ref:t,children:(0,f.jsx)(g.N_,{className:d()("page-link","btn-outline-primary",{active:a,disabled:n}),to:n?"#":l("offset",r.toString()),onClick:u,children:s})})})),m=(0,r.YK)({pagination_nav_label:{id:"pagination.nav_label",description:"Label for the nav region for screenreader",defaultMessage:"Search results"},pagination_previous:{id:"pagination.previous",description:"Button to previous pagination page",defaultMessage:"Prev"},pagination_previous_aria_label:{id:"pagination.previous_aria_label",description:"Label to previous pagination page button",defaultMessage:"Previous"},pagination_next:{id:"pagination.next",description:"Button to next pagination page",defaultMessage:"Next"},pagination_next_aria_label:{id:"pagination.next_aria_label",description:"Button to next pagination page",defaultMessage:"Next"}});const x=e=>{let{offset:t,limit:s,count:r,buildUrl:a}=e;const l=Math.ceil(r/s),n=Math.ceil(t/s)+1,o=(0,i.useMemo)((()=>function(e,t){const s=[];if(t<=8){for(let e=1;e<=t;e++)s.push({index:e,role:"page"});return s}e>1&&s.push({index:1,role:"first"});let i=1,r=i;if(e>3){const t=Math.round((e-r)/2);r=e-t,s.push({index:r,role:"skipper-far"})}if(e>2){const t=Math.ceil((e-r)/3);e-t!==r&&(r=e-t,s.push({index:r,role:"skipper-near"}))}if(r=e,s.push({index:e,role:"page"}),r<t-1&&(r+=1,s.push({index:r,role:1===e?"first":"next"})),1===e&&(r+=1,s.push({index:r,role:"next"})),s.length<=4&&r<t-1&&(r+=1,s.push({index:r,role:"skipper-far"})),s.length<=4&&r<t-1&&(r+=1,s.push({index:r,role:"skipper-near"})),r<t-1){const e=s.length-1;if(i=t,r<t-2&&(i=r+Math.ceil((i-r)/2),s.push({index:i,role:"skipper-near"})),r<t-1){const t=Math.ceil((i-r)/3);t>0&&(i=r+t,s.splice(e+1,0,{index:i,role:"skipper-far"}))}}e!==t&&s.push({index:t,role:"last"});let a=s.findIndex((t=>t.index===e));if(-1===a)throw new Error("Internal error: Page index not found.");for(;s.length<8&&a>0;)for(;a>0;){const e=s[a].index;if(e-s[a-1].index>1){s.splice(a,0,{index:e-1,role:(l=s.filter((e=>"skipper-far"!==e.role)).length,l<4?"next":l<6?"skipper-near":"skipper-far")});break}--a}var l;return s}(n,l)),[n,l]).map((e=>(0,f.jsx)(v,{title:e.index.toString(),offset:s*(e.index-1),active:n===e.index,buildUrl:a,className:e.role},e.index.toString())));return(0,f.jsx)(f.Fragment,{children:o})},b=e=>{let{offset:t,limit:s,count:i,buildUrl:r}=e;const{formatMessage:l}=(0,a.A)(),n=t+s,o=t-s;return i<=s?null:(0,f.jsx)("nav",{"aria-label":l(m.pagination_nav_label),children:(0,f.jsxs)(p.A,{children:[(0,f.jsx)(v,{title:l(m.pagination_previous),offset:o,buildUrl:r,disabled:o<0,"aria-label":l(m.pagination_previous_aria_label),className:"pagination-separator"},"previous"),(0,f.jsx)(x,{offset:t,limit:s,buildUrl:r,count:i}),(0,f.jsx)(v,{title:l(m.pagination_next),offset:n,buildUrl:r,disabled:n>i,"aria-label":l(m.pagination_next_aria_label),className:"pagination-separator"},"next")]})})},_=e=>{let{pending:t,search:s,qs:r,defaults:l,buildUrl:n,onOpenRecipe:o}=e;const{locale:c}=(0,a.A)(),p=(0,i.useMemo)((()=>(0,f.jsx)(h.A,{data:s.recipes,lg:3,onOpenRecipe:o})),[s.recipes,o]),g=(0,i.useMemo)((()=>{var e,t;return(0,f.jsx)(b,{limit:(0,u.ax)(r.limit,null!==(e=l.limit)&&void 0!==e?e:12),count:s.totalRecipes,offset:(0,u.ax)(r.offset,null!==(t=l.offset)&&void 0!==t?t:0),buildUrl:n})}),[s.totalRecipes,r,l,n,o,c]);return(0,f.jsxs)("div",{className:d()("results-container",{pending:t}),children:[p,g]})};var j=s(2521);const A=(0,r.YK)({no_results:{id:"browse.no_results",description:"No results header",defaultMessage:"There are no results for your search."}}),y=()=>{const{formatMessage:e}=(0,a.A)();return(0,f.jsx)(j.A,{className:"no-results placeholder",children:e(A.no_results)})};var S=s(894);const N=(0,r.YK)({search_results_heading:{id:"browse.results_heading",description:"Browser search results heading",defaultMessage:"Results"}}),M=e=>{let{qs:t,qsString:s,buildUrl:r,onOpenRecipe:c}=e;const{formatMessage:d}=(0,a.A)(),u=(0,l.d4)((e=>e.browse.browserSearch)),h=u.meta.pending===n.F.LOADING,[p,g]=(0,i.useState)(void 0);return(0,i.useEffect)((()=>{var e;u.meta.pending===n.F.COMPLETED&&g(null===(e=u.items)||void 0===e?void 0:e[s])}),[u.meta.pending,u.items]),(0,i.useEffect)((()=>{var e;const t=null===(e=u.items)||void 0===e?void 0:e[s];t&&g(t)}),[s]),(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)("h2",{className:"sr-only",children:d(N.search_results_heading)}),h&&!p&&(0,f.jsx)(S.A,{}),!h&&(null==p||0===p.recipes.length)&&(0,f.jsx)(y,{}),null!=p&&p.recipes.length>0&&(0,f.jsx)(_,{pending:h,search:p,qs:t,defaults:o.A,buildUrl:r,onOpenRecipe:c})]})}},3839:(e,t,s)=>{s.d(t,{HU:()=>p,fN:()=>f,Q5:()=>g});var i=s(1948),r=s(6746),a=s(6847),l=s(5838),n=s(5386),o=s(9140),c=s(834);function d(e,t){var s,i;const r=null!==(s=null===t||void 0===t?void 0:t.delimiter)&&void 0!==s?s:",",a=null!==(i=null===t||void 0===t?void 0:t.escapeChar)&&void 0!==i?i:'"',l=[];let n=!1;for(let o=0,c=0,d=0;d<e.length;d++){const t=e[d],s=e[d+1];l[o]=l[o]||[],l[o][c]=l[o][c]||"",t===a&&n&&s===a?(l[o][c]+=t,++d):t!==a?t!==r||n?"\r"!==t||"\n"!==s||n?("\n"!==t||n)&&("\r"!==t||n)?l[o][c]+=t:(++o,c=0):(++o,c=0,++d):(s||(l[o][++c]=""),++c):n=!n}return l}const u={author:"author__username",course:"course__slug",cuisine:"cuisine__slug",season:"season__slug",tag:"tag__slug"},h=["author","course","cuisine","directions","info","ordering","rating","season","source","tag","title"];function p(e){if(!e.search||!e.search.includes(":"))return e;const t={...e},s=d(t.search,{delimiter:" "})[0],i=[];return s.forEach((e=>{if(e.includes(":")){const s=d(e,{delimiter:":"})[0];if(2===s.length){const e=s[0].toLocaleLowerCase();if(h.includes(e))return void(t[e]=s[1])}}i.push(e)})),t.search=i.join(" "),t}const g=e=>t=>{t({...(0,n.OS)(c.G,a.h.LOADING)});let s=p(e);s=function(e,t){const s={};return Object.keys(e).forEach((i=>{null!==e[i]&&(s[i in t?t[i]:i]=e[i])})),s}(s,u),(0,i.Ay)().get(r.U.browse).query(s).then((s=>{const i=s.body;t({...(0,n.OS)(c.G,a.h.GET_SUCCESS),id:(0,l.an)(e),payload:(0,c.p)(i)})})).catch((e=>{t((0,o.H4)(e,c.G))}))},f=e=>t=>{t({...(0,n.OS)(c.G,a.h.LOADING)});const s={};Object.keys(e).forEach((t=>{null!==e[t]&&(s[t in u?u[t]:t]=e[t])})),(0,i.Ay)().get(r.U.mini_browse).query(s).then((s=>{const i=s.body;t({...(0,n.OS)(c.G,a.h.GET_SUCCESS),id:(0,l.an)(e),payload:(0,c.p)(i)})})).catch((e=>{t((0,o.H4)(e,c.G))}))}},2437:(e,t,s)=>{s.d(t,{A:()=>o});var i=s(5043),r=s(4282),a=(s(4589),s(824)),l=s(8563),n=s(579);const o=(0,i.forwardRef)(((e,t)=>{let{id:s,tooltip:i,tooltipPlacement:o,children:c,...d}=e;return(0,n.jsx)(a.A,{condition:Boolean(i),render:e=>(0,n.jsx)(l.A,{id:`${s}-tooltip`,tooltip:i,placement:o,children:e}),children:(0,n.jsx)(r.A,{id:s,"aria-label":i||void 0,"aria-describedby":void 0,...d,ref:t,children:c})})}))},8591:(e,t,s)=>{s.d(t,{A:()=>p});var i=s(5043),r=s(3519),a=s(6971),l=s(8139),n=s.n(l),o=s(7629),c=s(5838),d=s(4949),u=s(579);function h(e){var t,s;const i=e.startsWith(null!==(t=(0,c._$)("PUBLIC_URL"))&&void 0!==t?t:"")?e.substring((null!==(s=(0,c._$)("PUBLIC_URL"))&&void 0!==s?s:"").length):e,r=i.startsWith("/"),a=i.endsWith("/");return i.substring(r?1:0,a?i.length-1:void 0)}const p=e=>{let{title:t,id:s,state:l,className:p,children:g}=e;const f=(0,a.Zp)(),v=(0,a.zy)(),m=null===l||void 0===l?void 0:l.meta.error,x=(0,i.useContext)(o.A);return(0,i.useEffect)((()=>{document.title=(null!=t&&t.length>0?`${t} | `:"")+"OwnRecipes"}),[t]),(0,i.useEffect)((()=>{if(m&&null==s){const e=(0,c.hp)("/NotFound");f(e)}}),[s,m]),(0,u.jsx)(r.A,{id:"main-container",as:"main",className:n()(h(v.pathname),p),style:{marginTop:`${x.toolbarHeight}px`},children:(0,u.jsx)(d.A,{verbose:!0,printStack:!0,children:g})})}},933:(e,t,s)=>{s.d(t,{A:()=>f});var i=s(5043),r=s(3626),a=s(97),l=s(8139),n=s.n(l),o=s(4282),c=s(6308),d=s(824),u=s(579);const h=(0,r.YK)({star_alt:{id:"rating_comments.star_alt",description:"Alt text for star button, for screen reader.",defaultMessage:"Select to rate item {stars, plural, one {# star} other {# stars}}"},stars_alt:{id:"rating_comments.stars_alt",description:"Alt text for read-only stars (view).",defaultMessage:"{stars} out of 5 stars"},rating_count:{id:"rating_comments.rating_count",description:"Rating count (view).",defaultMessage:"{count} ratings"}}),p=e=>{let{stars:t,num:s,onChange:r}=e;const{formatMessage:l}=(0,a.A)(),n=(0,i.useCallback)((()=>{null===r||void 0===r||r(s)}),[r,s]),p=t>s-1&&t<s,g=p?"star-half":"star",f=s>t||p?"light":"filled";return(0,u.jsx)(d.A,{condition:null!=r,render:e=>(0,u.jsx)(o.A,{variant:"transparent",className:"rating",onClick:n,children:e}),children:(0,u.jsx)(c.A,{icon:g,variant:f,size:null!=r?"2x":"1x",ariaLabel:r?l(h.star_alt,{stars:s}):void 0},s)},s)},g=e=>{let{stars:t}=e;const s=t>0&&t<4,i=s?"star-half":"star",r=0===t||s?"light":"filled";return(0,u.jsx)(c.A,{icon:i,variant:r,size:"1x"},t)},f=e=>{let{stars:t,count:s,showCount:r=!0,collapsed:l=!1,onChange:o}=e;const{formatMessage:c}=(0,a.A)();let d=t;t>5?d=5:t<0&&(d=0);const f=(0,i.useMemo)((()=>l?(0,u.jsx)(g,{stars:d}):Array.from({length:5},((e,t)=>t+1)).map((e=>(0,u.jsx)(p,{stars:d,num:e,onChange:o},e)))),[d,l,o]),v=t>0?`${t}/5`:"",m=!r||0!==t&&!s||o?void 0:null!==s&&void 0!==s?s:0;return(0,u.jsxs)("div",{className:"rating-stars",children:[(0,u.jsx)("span",{className:n()("stars-icons",{active:t>0}),"aria-hidden":!0,children:f}),v&&(0,u.jsx)("span",{className:"rating-text","aria-hidden":!0,children:v}),(0,u.jsx)("span",{className:"sr-only",children:c(h.stars_alt,{stars:d})}),null!=m&&(0,u.jsx)("span",{className:"rating-count",children:`(${l?m:c(h.rating_count,{count:m})})`})]})}},3306:(e,t,s)=>{s.d(t,{B8:()=>h,Hh:()=>d,cL:()=>g,cX:()=>u,uC:()=>c,uv:()=>p});var i=s(1948),r=s(6746),a=s(6847),l=s(5386),n=s(9140),o=s(7473);const c=e=>({...(0,l.OS)(o.p2,a.h.GET_SUCCESS),payload:e}),d=e=>t=>{t({...(0,l.OS)(o.p2,a.h.GET_START)}),(0,i.Ay)().get(`${r.U.recipe}${e}/`).then((e=>{t(c((0,o.sE)(e.body)))})).catch((e=>t((0,n.H4)(e,o.p2))))},u=(e,t)=>s=>{s({...(0,l.OS)(o.p2,a.h.DELETE_START)}),(0,i.Ay)().delete(`${r.U.recipe}${t}/`).then((()=>{s({...(0,l.OS)(o.p2,o.Ei.RECIPE_DELETE),payload:{id:e}})})).catch((e=>s((0,n.H4)(e,o.p2))))},h=(e,t)=>s=>{s({...(0,l.OS)(o.p2,o.Ei.RECIPE_INGREDIENT_SERVINGS_UPDATE),payload:{recipeSlug:e,customServings:t}})},p=e=>t=>{t({...(0,l.OS)(o.p2,a.h.PRELOAD),payload:e})},g=()=>e=>{e({...(0,l.OS)(o.p2,a.h.RESET)})}},1840:()=>{}}]);
//# sourceMappingURL=594.af68e6df.chunk.js.map