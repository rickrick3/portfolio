(function(){
  var root=document.documentElement, KEY='farel-lang';
  var titles={en:'Farel (Mr Dev) — Full-stack developer & data engineer',fr:'Farel (Mr Dev) — Développeur full-stack & data engineer'};
  var who={en:'Farel, full-stack developer, data engineer and mentor',fr:'Farel, développeur full-stack, data engineer et mentor'};
  var typer=null;
  function type(text){
    var el=document.getElementById('typed'); if(!el) return;
    clearTimeout(typer); el.textContent='';
    if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){el.textContent=text;return}
    var i=0;(function step(){el.textContent=text.slice(0,++i); if(i<text.length) typer=setTimeout(step,34)})();
  }
  function setLang(l,first){
    root.setAttribute('data-lang',l); root.setAttribute('lang',l); document.title=titles[l];
    document.querySelectorAll('.lang button').forEach(function(b){b.setAttribute('aria-pressed',String(b.dataset.set===l))});
    try{localStorage.setItem(KEY,l)}catch(e){}
    if(first) setTimeout(function(){type(who[l])},1500); else type(who[l]);
  }
  // split name letters
  document.querySelectorAll('[data-split]').forEach(function(el,row){
    var t=el.dataset.split;
    for(var i=0;i<t.length;i++){
      var s=document.createElement('span'); s.className='ch'+(t[i]==='.'?' dot':''); s.textContent=t[i];
      s.style.animationDelay=(0.15+row*0.25+i*0.05)+'s'; el.appendChild(s);
    }
  });
  var saved=null; try{saved=localStorage.getItem(KEY)}catch(e){}
  setLang(saved==='fr'||saved==='en'?saved:((navigator.language||'').toLowerCase().indexOf('fr')===0?'fr':'en'),true);
  document.querySelectorAll('.lang button').forEach(function(b){b.addEventListener('click',function(){setLang(b.dataset.set)})});
  function toggle(btn,force){
    var open=force!==undefined?force:btn.getAttribute('aria-expanded')!=='true';
    btn.setAttribute('aria-expanded',String(open));
    document.getElementById(btn.getAttribute('aria-controls')).classList.toggle('open',open);
  }
  document.querySelectorAll('.row').forEach(function(btn){btn.addEventListener('click',function(){toggle(btn)})});
  document.querySelectorAll('.chip').forEach(function(c){
    c.addEventListener('click',function(){
      var id=c.dataset.go, btn=document.querySelector('.row[aria-controls="'+id+'"]');
      if(btn){toggle(btn,true);btn.scrollIntoView({behavior:'smooth',block:'start'});btn.focus({preventScroll:true})}
      else{var el=document.getElementById(id); if(el) el.scrollIntoView({behavior:'smooth',block:'start'})}
    });
  });
  // scroll reveal
  document.querySelectorAll('#work .s-head,#experience .s-head,.index>li,.tl>li').forEach(function(el){el.classList.add('rv')});
  var els=document.querySelectorAll('.rv');
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12,rootMargin:'0px 0px -40px 0px'});
    els.forEach(function(el){io.observe(el)});
  } else els.forEach(function(el){el.classList.add('in')});
})();
