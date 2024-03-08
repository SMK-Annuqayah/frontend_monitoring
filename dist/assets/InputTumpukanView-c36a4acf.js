import{j as P,r as G,o as l,c as i,f as b,A as $,d as t,E as r,t as _,e as T,H as N,F as g,D as m,h as y,g as A,b as O,G as V}from"./index-d4f638b3.js";import{S as j}from"./Sidebar-User-8c7a9a8e.js";import{N as z}from"./Navbar-0577d09a.js";import{C as H}from"./ChatMe-ce29fbf2.js";const U={id:"wrapper"},J={id:"content-wrapper",class:"d-flex flex-column"},F={id:"content"},E=t("h1",{class:"h3 mb-0 text-gray-800 text-center mt-4"},"Halaman Input Tumpukan",-1),L={key:0,class:"row mt-5"},K=t("div",{class:"col-1"},null,-1),M={class:"col-10"},W={class:"row"},q=t("div",{class:"col-4"},[t("h6",null,"Lokasi")],-1),Q={class:"col-8"},R={class:"row"},X=t("div",{class:"col-4"},[t("h6",null,"Tanggal")],-1),Y={class:"col-8"},Z={class:"row"},x=t("div",{class:"col-4"},[t("h6",null,"Supir")],-1),tt={class:"col-8"},st={class:"row"},et=t("div",{class:"col-4"},[t("h6",null,"No. Container")],-1),ot={class:"col-8"},at={class:"row"},nt=t("div",{class:"col-4"},[t("h6",null,"No Telp")],-1),lt={class:"col-8"},it={class:"row"},rt=t("div",{class:"col-4"},[t("h6",null,"No Seal")],-1),dt={class:"col-8"},ut={class:"row"},ct=t("div",{class:"col-4"},[t("h6",null,"Tujuan")],-1),ht={class:"col-8"},pt=t("div",{class:"col-1"},null,-1),_t={class:"row mt-4"},gt=t("div",{class:"col-1"},null,-1),mt={class:"col-10"},kt={class:"row"},vt={class:"col-sm-6"},bt=t("label",{for:"barang",class:"form-label"},"SPPG",-1),ft=t("option",{disabled:""},"Pilih SPPG",-1),wt=["value"],Bt={key:0,class:"col-sm-6"},St=t("label",{for:"barang",class:"form-label"},"Barang",-1),Pt={class:"row"},Tt={class:"col-9"},Nt=t("option",{disabled:""},"Pilih barang",-1),yt=["value"],It={class:"col-3"},Ct=t("i",{class:"bi bi-check2-circle"},null,-1),Dt=[Ct],Gt={class:"row"},$t={key:0,class:"col-sm-6"},At=t("label",{for:"tumpukan",class:"form-label"},"Tumpukan",-1),Ot={class:"row ms-1"},Vt={class:"col-6"},jt={class:"row"},zt={class:"col-8 border bg-white"},Ht={class:"col-4"},Ut=t("i",{class:"bi bi-plus"},null,-1),Jt=[Ut],Ft={class:"col-3"},Et=t("i",{class:"bi bi-arrow-down-square"},null,-1),Lt=[Et],Kt=t("div",{class:"col-3"},null,-1),Mt={class:"col-sm-6"},Wt={key:0,style:{"margin-top":"30px"}},qt=t("i",{class:"bi bi-arrow-down-circle"},null,-1),Qt=t("h4",{class:"text-center mt-5 mb-3"},"Data Barang",-1),Rt={class:"table-responsive"},Xt={class:"bordered-table table-striped m-auto"},Yt=t("th",null,"No. SPPG",-1),Zt=t("th",null,"Jenis Barang",-1),xt=t("th",null,"Total",-1),ts=t("div",{class:"col-1"},null,-1),ss={class:"row"},es=t("div",{class:"col-1"},null,-1),os={class:"col-10"},as={class:"row mb-5 mt-5"},ns={class:"col-6"},ls={class:"col-6"},is=t("div",{class:"col-1"},null,-1),rs={data(){return{tumpukan:0,selectedBarang:null,listBarang:[],dataBarang:[],headers:[],APIHeaders:[],detailNote:[],role:null,id_note:null,selectedSPPG:null,showInput:!1,showBarang:!1,size:null}},methods:{realtimeInput(){console.log("test :",this.dataBarang);const n=[];this.dataBarang.forEach(d=>{const u={};for(const c in d.tumpukan)u[`tumpukan_${c}`]=d.tumpukan[c].join(",");const s=this.getTotalTumpukan(d),a={...u,barang:d.barang,sppg:d.sppg,id_note:0,total:s};n.push(a)});const o=JSON.stringify(this.dataBarang);n.length===0&&this.showAlert(),localStorage.setItem("tumpukans",o)},submitData(){this.realtimeInput(),this.showInput=!1,this.$router.push({name:"user-signature"})},showAlert(){this.$swal("SPPG tidak tersedia!!").then(()=>{this.$router.push("/user-input-note")})},fetchBarang(){let n=new FormData;n.append("lokasi",this.APIHeaders.lokasi),n.append("id_keterangan",this.APIHeaders.id_keterangan),O.post("https://10.11.10.243/backend/public/api/sppg",n).then(o=>{this.listBarang=o.data.data}).catch(o=>{console.error(o),this.showAlert()})},submitBarang(){this.selectedBarang&&(this.dataBarang.push({barang:this.selectedBarang,sppg:this.selectedSPPG,tumpukan:{}}),this.showBarang=!1),this.showInput=!0},hitungTumpukan(){this.tumpukan=parseInt(this.tumpukan+1)},submitTumpukan(){if(this.tumpukan&&this.dataBarang.length>0){const n=this.dataBarang[this.dataBarang.length-1],o=Object.keys(n.tumpukan).length+1;console.log("test header: ",o),console.log("test lastBarang: ",n),o<=10&&(this.headers.includes(o.toString())||(this.headers.push(o.toString()),console.log("test headers: ",this.headers)),n.tumpukan[o.toString()]||(n.tumpukan[o.toString()]=[],console.log("test lastBarang: ",n)),n.tumpukan[o.toString()].push(parseInt(this.tumpukan))),this.tumpukan=0}this.realtimeInput()},getTotalTumpukan(n){let o=0;for(const d in n.tumpukan)for(const u of n.tumpukan[d])o+=u;return o}},created(){const n=new Date().toUTCString();console.log("Waktu Sekarang (UTC):",n);const o=sessionStorage.getItem("token");if(o)try{const[d,u]=o.split("."),s=JSON.parse(atob(d)),a=atob(u),c=JSON.parse(atob(o.split(".")[1])),e=c.exp,f=new Date(e*1e3);console.log("Waktu Kedaluwarsa (UTC):",f.toUTCString()),new Date>f?(console.log("Keluar"),sessionStorage.removeItem("token"),this.$router.push("/")):console.log("Aman"),this.role=c.role,this.APIHeaders.lokasi=c.kodeLokasi,this.role!=="user"?this.$router.push("/unauthorized"):(!s||!a)&&this.$router.push("/");const p=localStorage.getItem("note");p&&(this.detailNote=p,this.detailNote=JSON.parse(p),this.APIHeaders.id_keterangan=this.detailNote.id_keterangan);const k=localStorage.getItem("tumpukans");if(k){const v=JSON.parse(k);this.dataBarang=v,console.log("test data tumpukan: ",v[0].sppg);let w=0;for(let h=0;h<v.length;h++){const S=v[h].tumpukan,I=Object.keys(S).reduce((C,D)=>C+S[D].length,0);w=Math.max(w,I)}for(let h=0;h<w;h++)this.headers[h]=(h+1).toString();console.log(" header: ",w),console.log("test headers: ",this.headers),console.log("from data: ",v[0].tumpukan),console.log("form ls: ",this.dataBarang),this.showInput=!0;const B=this.dataBarang.length-1;this.selectedSPPG=this.dataBarang[B].sppg,this.selectedBarang=this.dataBarang[B].barang}this.fetchBarang(),this.size=window.innerWidth,console.log("size:",this.size)}catch(d){console.error("Error decoding token:",d),this.$router.push("/")}else this.$router.push("/")}},ps=Object.assign(rs,{__name:"InputTumpukanView",setup(n){const o=P(!1),d=P(""),u=()=>{o.value=!o.value,d.value=o.value?"toggle-sidebar":""};return(s,a)=>{const c=G("router-link");return l(),i("div",U,[b(j,{class:$(d.value)},null,8,["class"]),t("div",J,[t("div",F,[b(z,{onToggleSidebar:u}),b(H),E,s.detailNote?(l(),i("div",L,[K,t("div",M,[t("div",W,[q,t("div",Q,[t("h6",null,": "+r(s.detailNote.location),1)])]),t("div",R,[X,t("div",Y,[t("h6",null,": "+r(s.detailNote.date),1)])]),t("div",Z,[x,t("div",tt,[t("h6",null,": "+r(s.detailNote.driver),1)])]),t("div",st,[et,t("div",ot,[t("h6",null,": "+r(s.detailNote.no_container),1)])]),t("div",at,[nt,t("div",lt,[t("h6",null,": "+r(s.detailNote.telp),1)])]),t("div",it,[rt,t("div",dt,[t("h6",null,": "+r(s.detailNote.no_seal),1)])]),t("div",ut,[ct,t("div",ht,[t("h6",null,": "+r(s.detailNote.destination),1)])])]),pt])):_("",!0),t("div",_t,[gt,t("div",mt,[t("div",kt,[t("div",vt,[bt,T(t("select",{"onUpdate:modelValue":a[0]||(a[0]=e=>s.selectedSPPG=e),class:"form-select","aria-label":"Default select example",onSelect:a[1]||(a[1]=e=>s.showBarang=!0)},[ft,(l(!0),i(g,null,m(s.listBarang,e=>(l(),i("option",{key:e.id,value:e.no_sppg},r(e.no_sppg),9,wt))),128))],544),[[N,s.selectedSPPG]])]),s.selectedSPPG!=null?(l(),i("div",Bt,[St,t("div",Pt,[t("div",Tt,[T(t("select",{"onUpdate:modelValue":a[2]||(a[2]=e=>s.selectedBarang=e),class:"form-select","aria-label":"Default select example"},[Nt,(l(!0),i(g,null,m(s.listBarang,e=>(l(),i("option",{key:e.id,value:e.product_name},r(e.product_name),9,yt))),128))],512),[[N,s.selectedBarang]])]),t("div",It,[s.selectedBarang!=null?(l(),i("button",{key:0,onClick:a[3]||(a[3]=(...e)=>s.submitBarang&&s.submitBarang(...e)),class:"btn btn-success"},Dt)):_("",!0)])])])):_("",!0)]),t("div",Gt,[s.showInput===!0?(l(),i("div",$t,[At,t("div",Ot,[t("div",Vt,[t("div",jt,[t("div",zt,[t("h4",null,r(s.tumpukan),1)]),t("div",Ht,[t("button",{onClick:a[4]||(a[4]=e=>s.hitungTumpukan()),class:"btn btn-danger"},Jt)])])]),t("div",Ft,[s.tumpukan!=0?(l(),i("button",{key:0,onClick:a[5]||(a[5]=(...e)=>s.submitTumpukan&&s.submitTumpukan(...e)),class:"btn btn-success ms-3"},Lt)):_("",!0)]),Kt])])):_("",!0),t("div",Mt,[s.size>500?(l(),i("div",Wt)):_("",!0),t("button",{onClick:a[6]||(a[6]=e=>(s.selectedBarang=null,s.selectedSPPG=null,s.showInput=!1,s.tumpukan=0)),class:"btn btn-warning w-100 customNext"},[y(" Baris Baru "),qt])])]),Qt,t("div",Rt,[t("table",Xt,[t("thead",null,[t("tr",null,[Yt,Zt,(l(!0),i(g,null,m(s.headers,e=>(l(),i("th",{key:e,class:"text-center"},r(e),1))),128)),xt])]),t("tbody",null,[(l(!0),i(g,null,m(s.dataBarang,(e,f)=>(l(),i("tr",{key:f},[t("td",null,r(e.sppg),1),t("td",null,r(e.barang),1),(l(!0),i(g,null,m(s.headers,p=>(l(),i("td",{key:p},[(l(!0),i(g,null,m(e.tumpukan[p],k=>(l(),i("p",{key:k},r(k),1))),128))]))),128)),t("td",null,r(s.getTotalTumpukan(e)),1)]))),128))])])])]),ts]),t("div",ss,[es,t("div",os,[t("div",as,[t("div",ns,[b(c,{to:"/user-input-note",class:"btn btn-danger"},{default:A(()=>[y(" Kembali ")]),_:1})]),t("div",ls,[t("button",{class:"btn blueButton float-end",onClick:a[7]||(a[7]=(...e)=>s.submitData&&s.submitData(...e))}," Selanjutnya ")])])]),is])]),b(V)])])}}});export{ps as default};
