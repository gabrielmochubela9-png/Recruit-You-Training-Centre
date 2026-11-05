/* Rebuild You: live background, footer year, contact form */
(function(){
  var y=document.getElementById('yr'); if(y) y.textContent=new Date().getFullYear();

  var cv=document.getElementById('wall');
  if(cv && !matchMedia('(prefers-reduced-motion:reduce)').matches){
    var ctx=cv.getContext('2d'),W,H,dpr=Math.min(devicePixelRatio||1,2),pts=[],mouse={x:-999,y:-999};
    var cols=['29,95,209','14,143,156','107,70,201'];
    function size(){
      W=innerWidth;H=innerHeight;cv.width=W*dpr;cv.height=H*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);
      var n=Math.min(90,Math.round(W*H/16000));pts=[];
      for(var i=0;i<n;i++)pts.push({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.35,vy:(Math.random()-.5)*.35,r:1.6+Math.random()*2,c:cols[i%3]});
    }
    addEventListener('resize',size);
    addEventListener('mousemove',function(e){mouse.x=e.clientX;mouse.y=e.clientY});
    addEventListener('mouseleave',function(){mouse.x=mouse.y=-999});
    var L=140;
    function frame(){
      ctx.clearRect(0,0,W,H);ctx.fillStyle='#fff';ctx.fillRect(0,0,W,H);
      for(var i=0;i<pts.length;i++){
        var p=pts[i];p.x+=p.vx;p.y+=p.vy;
        if(p.x<0||p.x>W)p.vx*=-1;if(p.y<0||p.y>H)p.vy*=-1;
        var dx=p.x-mouse.x,dy=p.y-mouse.y,d=Math.sqrt(dx*dx+dy*dy);
        if(d<110&&d>0){p.x+=dx/d*1.2;p.y+=dy/d*1.2}
        for(var j=i+1;j<pts.length;j++){
          var q=pts[j],ax=p.x-q.x,ay=p.y-q.y,dd=Math.sqrt(ax*ax+ay*ay);
          if(dd<L){ctx.strokeStyle='rgba('+p.c+','+(.22*(1-dd/L)).toFixed(3)+')';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.stroke()}
        }
        ctx.fillStyle='rgba('+p.c+',.45)';ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,6.283);ctx.fill();
      }
      requestAnimationFrame(frame);
    }
    size();frame();
  }

  var links=document.querySelectorAll('nav a[data-s]');
  if(links.length&&'IntersectionObserver' in window){
    var ids=['top','about','skills','why','careers'];
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){links.forEach(function(a){a.classList.toggle('on',a.dataset.s===e.target.id)})}})},{rootMargin:'-40% 0px -55% 0px'});
    ids.forEach(function(i){var el=document.getElementById(i);if(el)io.observe(el)});
    var c=document.getElementById('contact');if(c)io.observe(c);
  }
  var f=document.getElementById('form'),m=document.getElementById('msg');
  if(f){f.addEventListener('submit',function(e){
    e.preventDefault();
    var d=new FormData(f),n=(d.get('name')||'').trim(),em=(d.get('email')||'').trim(),t=(d.get('message')||'').trim();
    if(!n||!/^\S+@\S+\.\S+$/.test(em)||!t){m.style.color='#c0392b';m.textContent='Please complete your name, a valid email and a message.';return}
    var body='Name: '+n+'\nEmail: '+em+'\nI am a: '+d.get('who')+'\n\n'+t;
    location.href='mailto:lereases@gmail.com?subject='+encodeURIComponent('Website enquiry from '+n)+'&body='+encodeURIComponent(body);
    m.style.color='';m.textContent='Opening your email app to send your message…';
  })}
})();
