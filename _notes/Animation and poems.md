---
title: Animations and poems
---

```html
<!-- Kaizen (white) — inline embed -->
<div class="ascii-kaizen" style="width: 180px;">
  <canvas id="kaizen-note-1"
          width="320" height="320"
          style="width: 180px; height: 180px; aspect-ratio: 1 / 1; display: block; border-radius: 10px;"
          aria-label="Kaizen — evolving ASCII petals"></canvas>
</div>
<script>
(function(){
  const el = document.getElementById('kaizen-note-1');
  if (!el) return;
  const ctx = el.getContext('2d');
  const BASE_GRID = 44;
  const cell = 10, cw = cell*0.72, ch = cell;
  const CHARS = ['/', '\\\\', '|'];
  let t = 0, animId, running = false;

  function draw(time){
    const tLocal = time ?? t;
    ctx.clearRect(0,0,el.width,el.height);
    ctx.font = `${cell}px ui-monospace, Menlo, monospace`;
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    const cx = el.width/2, cy = el.height/2;
    const GRID_SIZE = BASE_GRID + Math.floor(Math.sin(tLocal*0.25)*1);
    const threshold = 0.28 + 0.08*Math.sin(tLocal*0.18 + 1.3);
    const fadeEdge = 0.84 + 0.02*Math.cos(tLocal*0.21);
    const pulse = (Math.sin(tLocal*0.6) + 1)/2;

    for(let y=0;y<GRID_SIZE;y++){
      for(let x=0;x<GRID_SIZE;x++){
        const w1 = Math.sin((x+y)/4 + tLocal);
        const w2 = Math.cos((x - y)/4 - tLocal*0.7);
        const bx = Math.abs(x-GRID_SIZE/2)/(GRID_SIZE/2);
        const by = Math.abs(y-GRID_SIZE/2)/(GRID_SIZE/2);
        const boundary = Math.max(bx,by);
        if (boundary >= fadeEdge) continue;
        const fade = 1 - boundary/fadeEdge;
        const v = (w1*0.6 + w2*0.4) * fade;
        let char = '';
        if (v > threshold) char = CHARS[0];
        else if (v < -threshold) char = CHARS[1];
        else if (Math.abs(v) < 0.08) char = CHARS[2];
        if (!char) continue;
        const xp = cx + (x-GRID_SIZE/2)*cw;
        const yp = cy + (y-GRID_SIZE/2)*ch;
        const a = 0.6 + 0.35*pulse; // white ink with breathing
        ctx.fillStyle = `rgba(255,255,255,${a})`;
        ctx.fillText(char, xp, yp);
      }
    }
  }

  function frame(){ running = true; draw(t); t += 0.007; animId = requestAnimationFrame(frame); }
  function stop(){ running = false; if (animId) cancelAnimationFrame(animId); }

  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  if (!reduce.matches) frame(); else draw(0);
  try { reduce.addEventListener('change', e => { if (e.matches) { stop(); draw(0);} else if(!running){ frame(); } }); } catch(_) {}
  document.addEventListener('visibilitychange', () => { if (document.hidden) stop(); else if(!reduce.matches && !running) frame(); });
})();
</script>
```

I am like a MUJI store.
Freshly steamed.
Cleaned.
Simple.
Yet functionally beautiful.

I enjoy wrapping words.
Bending them.
As bamboo in the wind.

My grandpa. 
Jimmy. 
Woven such characters too.

This is part of my story.

What is a piece of a story that makes you?

----- 

I enjoy function.  
The edge where practical and beauty meet.  
A feeling of a well weighted door handle.  
That clicks.  
Worn and made more beautiful.  
By the many hands passed over.  

The space where work needs be done.  
For the head to rest.  
Knowing.
Something has been attended.  
Too.

To linger.  
Longer.  
Through practice.  
In a place.  
Without words.

Yet.  
Like a brick.  
I cast my net.  
Into the unknown wet.

Slipping for words at the back of her neck.
It changes.  
It changes.  
You changes.
We changes.

I wish to listen to how it changes.
Over the ages.

So stay in the seeing.
The noticing.
Of the many hearts.
Having passed through and touched.

To make you.

To make this handle as it is.