/* Skihandlarz - wizualizacja kierunku wyglądu (dane: skihandlarz.pl, stan 09.11.2026) */
(function(){
"use strict";
var $=function(s,c){return (c||document).querySelector(s)};
var $$=function(s,c){return Array.prototype.slice.call((c||document).querySelectorAll(s))};
var zl=function(n){return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g,' ')+',00 zł'};

/* ---- dane produktów (prawdziwe nazwy i ceny ze sklepu) ---- */
var PROMO=[
 {n:"Narty HEAD Supershape e-Magnum SW SF-PR + PRD 12",b:"HEAD",p:2690,o:3700,i:"n_2661"},
 {n:"Narty Völkl Peregrine V-Werks Lowride + Marker Lowride 13 FR",b:"Völkl",p:4999,o:6600,i:"p_peregrine"},
 {n:"Narty Salomon E Addikt Pro 76 + MI12 GW 2026",b:"Salomon",p:2880,o:3800,i:"p_addikt"},
 {n:"Narty HEAD Absolut Joy",b:"HEAD",p:1999,o:2599,i:"p_absolut"},
 {n:"Buty narciarskie damskie HEAD Edge 85 W HV Anthracite",b:"HEAD",p:1519,o:1700,i:"p_edge85w"},
 {n:"Buty narciarskie Atomic Hawx Prime 120 S BOA 27'",b:"Atomic",p:2516,o:2649,i:"p_prime120"},
 {n:"Buty narciarskie HEAD Edge 110 HV GW BOA Anthracite-Red",b:"HEAD",p:1959,o:2200,i:"p_edge110"},
 {n:"Buty narciarskie Salomon X-Pro 80 Blue/Black",b:"Salomon",p:899,o:1049,i:"p_xpro80"},
 {n:"Kurtka narciarska damska Descente Janie Amplitude Magenta",b:"Descente",p:2480,o:3100,i:"p_janie"},
 {n:"Spodnie narciarskie Dainese Ariante Dermizax Ev Stretch Limo",b:"Dainese",p:1499,o:1649,i:"p_ariante"}
];
var NARTY=[
 {n:"Narty HEAD Supershape Team SLR Pro wh/y + SLR 4.5 GW AC BR.80",b:"HEAD",p:799,i:"n_1668"},
 {n:"Narty Völkl Deacon 75 Black + vMotion 10 GW",b:"Völkl",p:3000,i:"n_1648"},
 {n:"Narty Atomic Redster X7 + FT 12 GW",b:"Atomic",p:2899,i:"n_370"},
 {n:"Narty Atomic Redster X9 + X 12 TL",b:"Atomic",p:3999,i:"n_371"},
 {n:"Narty Salomon E S/Race 8 + M11 GW L80",b:"Salomon",p:2299,o:3250,i:"n_3476"},
 {n:"Narty Atomic Vantage JR 100-120 + C 5",b:"Atomic",p:699,i:"n_377"},
 {n:"Narty Atomic Vantage JR 130-150 + C5",b:"Atomic",p:749,i:"n_427"},
 {n:"Narty HEAD Joy Easy JRS wh/mi + JRS 7.5",b:"HEAD",p:900,i:"n_2672"},
 {n:"Narty Nordica Belle 78 DC Set",b:"Nordica",p:3399,i:"n_3040"},
 {n:"Narty HEAD Kore 99 + Attack 11 GW Brake 100",b:"HEAD",p:2900,i:"n_472"},
 {n:"Narty HEAD Real Joy SLR Joy Pro bk/si + Joy 9",b:"HEAD",p:1950,i:"n_2668"},
 {n:"Narty Salomon M X-Race SC + XT12",b:"Salomon",p:2199,o:2999,i:"n_990"},
 {n:"Narty HEAD Shape e-V10 SW AMT-PR dbl/wh + PR 11",b:"HEAD",p:2900,i:"n_2663"},
 {n:"Narty HEAD Shape V2 AMT-PR dbl/wh + PR 11",b:"HEAD",p:1600,i:"n_2666"},
 {n:"Narty HEAD Supershape e-Magnum SW SF-PR bk/nge + PRD 12",b:"HEAD",p:2690,o:3700,i:"n_2661"},
 {n:"Narty HEAD Supershape e-Rally SW SF-PR bk/nrd + PRD 12",b:"HEAD",p:3700,i:"n_2662",u:"produkt.html"},
 {n:"Narty HEAD Supershape e-Speed SW SF-PR bk/nyw + PRD 12",b:"HEAD",p:3700,i:"n_2660"},
 {n:"Narty Salomon E S/Max N°6 XT Black/Iv",b:"Salomon",p:2300,i:"n_3518"},
 {n:"Narty K2 Apache Ranger",b:"K2",p:1190,i:"n_1977"},
 {n:"Narty HEAD Supershape Team Easy JRS wh/yw + JRS 4.5",b:"HEAD",p:800,i:"n_2671"},
 {n:"Narty HEAD Supershape Team SLR2 + SLR 7.5 AC Brake 78",b:"HEAD",p:799,i:"n_499"},
 {n:"Narty Salomon E Shortmax 120 + Lithium 10 L90",b:"Salomon",p:1299,i:"n_328"},
 {n:"Narty Nordica Dobermann Multigara DC + Comp 13 FDT",b:"Nordica",p:5499,i:"n_3729"},
 {n:"Narty HEAD V-Shape V8 SW LYT PR + PR 11 GW BR.85",b:"HEAD",p:3200,i:"n_467"}
];
var PODOBNE=[NARTY[16],NARTY[14],NARTY[12],NARTY[23],NARTY[9],NARTY[2]];

function card(x){
  var d=x.o?Math.round((1-x.p/x.o)*100):0;
  return '<a class="pc" href="'+(x.u||'#')+'"'+(x.u?'':' data-demo')+'>'+
    (d?'<span class="bad">-'+d+'%</span>':'')+
    '<span class="im"><img src="img/'+x.i+'.webp" alt="'+x.n.replace(/"/g,'&quot;')+'" loading="lazy" width="300" height="300"></span>'+
    '<span class="bd"><span class="br">'+x.b+'</span><span class="nm">'+x.n+'</span>'+
    '<span class="pr"><b>'+zl(x.p)+'</b>'+(x.o?'<s>'+zl(x.o)+'</s>':'')+'</span></span></a>';
}
var fill=function(id,arr){var el=document.getElementById(id);if(el)el.innerHTML=arr.map(card).join('')};
fill('promoRail',PROMO);fill('podobneRail',PODOBNE);

/* ---- toast + elementy pokazowe ---- */
var tEl=$('.toast'),tT;
function toast(m){if(!tEl)return;tEl.textContent=m;tEl.classList.add('on');clearTimeout(tT);tT=setTimeout(function(){tEl.classList.remove('on')},2600)}
document.addEventListener('click',function(e){
  var a=e.target.closest('[data-demo]');
  if(a){e.preventDefault();toast('W wizualizacji pokazujemy stronę główną, kategorię Narty i kartę produktu.')}
});
$$('form.search').forEach(function(f){f.addEventListener('submit',function(e){e.preventDefault();toast('Wyszukiwarka działa w Shoperze - tu tylko jej wygląd.')})});

/* ---- menu mobilne ---- */
var mm=$('.mm');
function mmSet(o){if(!mm)return;mm.classList.toggle('open',o);document.body.style.overflow=o?'hidden':'';var b=$('.burger');if(b)b.setAttribute('aria-expanded',o)}
$$('.burger').forEach(function(b){b.addEventListener('click',function(){mmSet(true)})});
$$('.mm .x,.mm .shade').forEach(function(b){b.addEventListener('click',function(){mmSet(false)})});
document.addEventListener('keydown',function(e){if(e.key==='Escape'){mmSet(false);fSet(false)}});

/* ---- przewijane rzędy: palec, mysz, strzałki ---- */
function dragScroll(el){
  var down=false,sx=0,sl=0,moved=false;
  el.addEventListener('pointerdown',function(e){if(e.pointerType!=='mouse')return;down=true;moved=false;sx=e.clientX;sl=el.scrollLeft});
  window.addEventListener('pointermove',function(e){if(!down)return;var dx=e.clientX-sx;if(Math.abs(dx)>4){moved=true;el.classList.add('drag')}el.scrollLeft=sl-dx});
  window.addEventListener('pointerup',function(){if(!down)return;down=false;setTimeout(function(){el.classList.remove('drag')},0)});
  el.addEventListener('click',function(e){if(moved){e.preventDefault();e.stopPropagation();moved=false}},true);
  el.addEventListener('dragstart',function(e){e.preventDefault()});
}
$$('.row').forEach(function(r){
  var rail=$('.rail',r),p=$('.arr.p',r),n=$('.arr.n',r);if(!rail)return;dragScroll(rail);
  var st=function(){if(p)p.disabled=rail.scrollLeft<8;if(n)n.disabled=rail.scrollLeft+rail.clientWidth>=rail.scrollWidth-8};
  rail.addEventListener('scroll',st,{passive:true});window.addEventListener('resize',st);st();
  var go=function(d){rail.scrollBy({left:d*rail.clientWidth*.8,behavior:'smooth'})};
  if(p)p.addEventListener('click',function(){go(-1)});if(n)n.addEventListener('click',function(){go(1)});
});

/* ---- dolny pasek na telefonie: dopiero po przewinięciu ---- */
function barAfter(bar,anchor){
  if(!bar||!anchor||!('IntersectionObserver' in window))return;
  new IntersectionObserver(function(es){es.forEach(function(en){bar.classList.toggle('widac',!en.isIntersecting&&en.boundingClientRect.top<0)})}).observe(anchor);
}
barAfter($('.mob'),$('.hero .cta')||$('.chead')||$('.buy'));
barAfter($('.stick'),$('.buy'));

/* ---- kategoria: filtry i sortowanie ---- */
var grid=document.getElementById('grid');
var fl=$('.flt');
function fSet(o){if(!fl)return;fl.classList.toggle('open',o);document.body.style.overflow=o?'hidden':''}
if(grid){
  var state={b:[],min:null,max:null,s:'def'};
  var render=function(){
    var L=NARTY.filter(function(x){return(!state.b.length||state.b.indexOf(x.b)>-1)&&(state.min==null||x.p>=state.min)&&(state.max==null||x.p<=state.max)});
    if(state.s==='asc')L=L.slice().sort(function(a,b){return a.p-b.p});
    if(state.s==='desc')L=L.slice().sort(function(a,b){return b.p-a.p});
    if(state.s==='az')L=L.slice().sort(function(a,b){return a.n.localeCompare(b.n,'pl')});
    grid.innerHTML=L.length?L.map(card).join(''):'<div class="empty">Brak nart w tym zakresie na tej stronie wizualizacji. W sklepie filtr przeszuka wszystkie 135 produktów.</div>';
    var c=$('#cnt');if(c)c.innerHTML=state.b.length||state.min!=null||state.max!=null?'Pasuje: <b>'+L.length+'</b> z '+NARTY.length+' na tej stronie':'Narty: <b>135</b> produktów';
    var act=$('#act');if(act){var h=state.b.map(function(b){return '<button type="button" data-rb="'+b+'">'+b+' ✕</button>'});
      if(state.min!=null||state.max!=null)h.push('<button type="button" data-rp>Cena '+(state.min!=null?'od '+state.min+' ':'')+(state.max!=null?'do '+state.max+' ':'')+'zł ✕</button>');act.innerHTML=h.join('')}
    $$('.chips [data-b]').forEach(function(ch){ch.classList.toggle('on',state.b.length===1&&state.b[0]===ch.dataset.b)});
    $$('.fg input[data-b]').forEach(function(i){i.checked=state.b.indexOf(i.dataset.b)>-1});
    var fc=$('#fcount');if(fc)fc.textContent=(state.b.length+(state.min!=null||state.max!=null?1:0))||'';
  };
  $$('.fg input[data-b]').forEach(function(i){i.addEventListener('change',function(){var b=i.dataset.b;state.b=state.b.filter(function(x){return x!==b});if(i.checked)state.b.push(b);render()})});
  $$('.chips [data-b]').forEach(function(ch){ch.addEventListener('click',function(e){e.preventDefault();var b=ch.dataset.b;state.b=(state.b.length===1&&state.b[0]===b)?[]:[b];render();grid.scrollIntoView({behavior:'smooth',block:'start'})})});
  var pmin=$('#pmin'),pmax=$('#pmax');
  var rd=function(el){var v=parseInt(el.value,10);return isNaN(v)?null:v};
  [pmin,pmax].forEach(function(el){if(el)el.addEventListener('input',function(){state.min=rd(pmin);state.max=rd(pmax);render()})});
  var so=$('#sort');if(so)so.addEventListener('change',function(){state.s=so.value;render()});
  $('#act').addEventListener('click',function(e){var t=e.target.closest('button');if(!t)return;if(t.dataset.rb){state.b=state.b.filter(function(x){return x!==t.dataset.rb})}if(t.hasAttribute('data-rp')){state.min=state.max=null;pmin.value='';pmax.value=''}render()});
  $$('.fbtn').forEach(function(b){b.addEventListener('click',function(){fSet(true)})});
  $$('.flt .shade,.flt .x,.flt .go').forEach(function(b){b.addEventListener('click',function(){fSet(false)})});
  render();
}

/* ---- karta produktu ---- */
var slides=$('.slides');
if(slides){
  dragScroll(slides);
  var th=$$('.thumbs button'),dots=$$('.dots i');
  var cur=function(){return Math.round(slides.scrollLeft/slides.clientWidth)};
  slides.addEventListener('scroll',function(){var k=cur();th.forEach(function(b,j){b.classList.toggle('on',j===k)});dots.forEach(function(d,j){d.classList.toggle('on',j===k)})},{passive:true});
  th.forEach(function(b,j){b.addEventListener('click',function(){slides.scrollTo({left:j*slides.clientWidth,behavior:'smooth'})})});
  window.addEventListener('pointerup',function(){if(!slides.classList.contains('drag'))return;var k=cur();setTimeout(function(){slides.scrollTo({left:k*slides.clientWidth,behavior:'smooth'})},10)});
}
var sizes=$$('.sizes button');
if(sizes.length){
  var av=$('#avail'),add=$('#add');
  var pick=function(b){sizes.forEach(function(x){x.classList.toggle('on',x===b);x.setAttribute('aria-pressed',x===b)});
    var z=b.classList.contains('zam');av.classList.toggle('zam',z);
    av.querySelector('span').innerHTML=z?'Długość '+b.dataset.l+' cm: <b>na zamówienie</b> - zapytaj o termin telefonicznie':'Długość '+b.dataset.l+' cm: <b>dostępna</b>, wysyłka w 24 godziny';
    $$('.stk-l').forEach(function(s){s.textContent=b.dataset.l+' cm, '+(z?'na zamówienie':'dostępna')})};
  sizes.forEach(function(b){b.addEventListener('click',function(){pick(b)})});pick($('.sizes button.on')||sizes[0]);
  var q=$('#qty');
  $$('.qty button').forEach(function(b){b.addEventListener('click',function(){var v=Math.max(1,Math.min(9,(parseInt(q.value,10)||1)+(+b.dataset.d)));q.value=v})});
  var addCart=function(){var c=$$('.ic .cnt');c.forEach(function(x){x.textContent=(parseInt(x.textContent,10)||0)+(parseInt(q.value,10)||1)});toast('Dodano do koszyka (wizualizacja - w sklepie to zwykły koszyk Shopera).')};
  $$('.add').forEach(function(b){b.addEventListener('click',addCart)});
}
var hero=$('.hero');function hh(){if(hero)document.documentElement.style.setProperty('--hh',Math.round(hero.getBoundingClientRect().top+window.scrollY)+'px')}hh();window.addEventListener('resize',hh);if(document.fonts)document.fonts.ready.then(hh);
var y=$('#rok');if(y)y.textContent=new Date().getFullYear();
})();
