import"./Navbar-0577d09a.js";import{_ as r,r as d,o as c,c as l,d as a,f as i,g as o,A as b,a as _,y as p,z as v}from"./index-d4f638b3.js";const m={data(){return{sidebarToggled:!1}},methods:{toggleSidebar(){this.sidebarToggled=!this.sidebarToggled}},created(){}},e=t=>(p("data-v-a0e5b781"),t=t(),v(),t),h=_('<a class="sidebar-brand d-flex align-items-center justify-content-center" href="#" data-v-a0e5b781><div class="sidebar-brand-icon mt-2" data-v-a0e5b781></div><div class="sidebar-brand-text ms-3" data-v-a0e5b781><span class="text-primary" data-v-a0e5b781>Alicorn<span class="text-warning" data-v-a0e5b781>bot</span></span></div></a><div class="sidebar-heading mt-5 text-primary" data-v-a0e5b781>Menu</div>',2),u={class:"nav-item"},g=e(()=>a("i",{class:"bi bi-speedometer2 text-primary"},null,-1)),x=e(()=>a("span",null,"Dashboard",-1)),f={class:"nav-item"},y=e(()=>a("i",{class:"bi bi-journal-text text-primary"},null,-1)),k=e(()=>a("span",null,"My Invoice",-1)),S={class:"nav-item"},w=e(()=>a("i",{class:"bi bi-journal-text text-primary"},null,-1)),I=e(()=>a("span",null,"Service",-1));function T(t,j,B,C,n,N){const s=d("router-link");return c(),l("ul",{class:b(["navbar-nav bg-gradient-light sidebar sidebar-dark accordion",{toggled:n.sidebarToggled}]),id:"accordionSidebar"},[h,a("li",u,[i(s,{class:"nav-link text-primary",to:"/user-dashboard","active-class":"font-weight-bold active-link"},{default:o(()=>[g,x]),_:1})]),a("li",f,[i(s,{class:"nav-link text-primary",to:"/user-invoice","active-class":"font-weight-bold text-primary active-link"},{default:o(()=>[y,k]),_:1})]),a("li",S,[i(s,{class:"nav-link text-primary",to:"/user-layanan","active-class":"font-weight-bold text-primary active-link"},{default:o(()=>[w,I]),_:1})])],2)}const z=r(m,[["render",T],["__scopeId","data-v-a0e5b781"]]);export{z as S};
