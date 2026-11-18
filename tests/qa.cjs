// Development-only VM harness; never shipped inside the application script.
// npm install --no-save @napi-rs/canvas (test dependency only)
const fs=require('fs'),vm=require('vm'),assert=require('assert'),path=require('path');
const {createCanvas,Image}=require('@napi-rs/canvas');
const root=path.resolve(__dirname,'..'),html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const nodes=new Map();class E{constructor(id){this.id=id;this.value='';this.children=[];this.style={};this.disabled=false;this.listeners={};this.width=1;this.height=1;this.dataset={};this.hidden=false;this.clientWidth=400;this.clientHeight=600;this.classList={add(){},remove(){}};this.captured=new Set()}getBoundingClientRect(){return {left:0,top:0,width:400,height:600}}setPointerCapture(id){this.captured.add(id)}hasPointerCapture(id){return this.captured.has(id)}releasePointerCapture(id){this.captured.delete(id)}setAttribute(k,v){this[k]=v}addEventListener(k,v){this.listeners[k]=v}appendChild(e){this.children.push(e)}set innerHTML(x){this.children=[];this.html=x}get innerHTML(){return this.html||''}querySelector(k){return this[k]||(this[k]=new E(k))}showModal(){this.open=true}close(){this.open=false;this.listeners.close?.()}add(x){this.children.push(x)}remove(){}click(){this.onclick?.()}}
for(const id of [...html.split('<script>')[0].matchAll(/id="([^"]+)"/g)].map(m=>m[1]))nodes.set(id,new E(id));
for(const [id,v]of Object.entries({margin:'10',size:'a4',orient:'auto',qual:'85',name:'VesperFolio',cEdge:'t'}))nodes.get(id).value=v;
function canvas(){const c=createCanvas(1,1);c.style={};c.toBlob=(fn,type,q)=>fn(new Blob([c.toBuffer('image/jpeg',Math.round((q||.85)*100))],{type}));return c}
nodes.set('cv',canvas());nodes.set('previewCanvas',canvas());
let downloads=[],printed=0,messages=[],frames=new Map(),frameId=0;function flushFrames(){const batch=[...frames.values()];frames.clear();batch.forEach(f=>f())}const window={addEventListener(){},print(){printed++},close(){}};
const context={document:{getElementById:id=>nodes.get(id),querySelectorAll:()=>[...nodes.values()].filter(x=>x instanceof E),createElement:tag=>tag==='canvas'?canvas():new E(tag),body:new E('body')},window,TextEncoder,Uint8Array,Blob,Image,Option:function(t,v){this.text=t;this.value=v},URL:{createObjectURL:b=>{downloads.push(b);return'blob:test'},revokeObjectURL(){}},requestAnimationFrame:f=>{frames.set(++frameId,f);return frameId},cancelAnimationFrame:id=>frames.delete(id),setTimeout:f=>{f();return 0},confirm:()=>true,alert:t=>messages.push(t),console};
let script=html.match(/<script>([\s\S]*?)<\/script>/)[1];script=script.replace('draw();\n})();','globalThis.Q={layout,buildPdf,buildDocx,renderItem,rotBox,addFiles,draw,lock,exportFile,showPreview,cropChange,cropStep,fitCrop,previewCrop,resizeCrop,getCrop:()=>({draft:cropDraft,base:cropBase,drag:cropDrag}),setCrop:c=>{cropDraft=c;previewCrop()},get:()=>({items,history,busy}),set:x=>{items=x;history=[];draw()}};draw();\n})();');vm.createContext(context);vm.runInContext(script,context);const q=context.Q,$=id=>nodes.get(id);let passed=[];function check(n,f){f();passed.push(n)}
(async()=>{
check('Unique web-app element IDs',()=>assert.equal([...html.split('<script>')[0].matchAll(/id="([^"]+)"/g)].length,nodes.size));
check('No external executable dependencies',()=>assert(!/<(?:script|link)[^>]+(?:src|href)=/i.test(html)));
check('CSP blocks connections',()=>assert(html.includes("connect-src 'none'")));
check('Exit occurs once in header',()=>assert(/<header>[\s\S]*id="exit"[\s\S]*<\/header>/.test(html)));
check('Baseline byte identity',()=>{const crypto=require('crypto');assert.equal(crypto.createHash('sha256').update(fs.readFileSync(path.join(root,'baseline/ImageToDocs_Pocket_Studio_v2.1.html'))).digest('hex'),fs.readFileSync(path.join(root,'BASELINE-SHA256.txt'),'utf8').split(' ')[0])});
const c=createCanvas(80,120),x=c.getContext('2d');x.fillStyle='red';x.fillRect(0,0,80,60);x.fillStyle='blue';x.fillRect(0,60,80,60);const item=(id)=>({id,name:`page${id}.png`,img:c,rot:0,filter:'none',crop:{t:0,r:0,b:0,l:0}});q.set([item(1),item(2)]);
check('Two cards rendered',()=>assert.equal($('list').children.length,2));
check('Impossible earlier move disabled',()=>assert($('list').children[0].querySelector('.row').children[0].disabled));
check('Impossible later move disabled',()=>assert($('list').children[1].querySelector('.row').children[1].disabled));
$('list').children[0].querySelector('.row').children[1].click();check('Ordering action',()=>assert.equal(q.get().items[0].id,2));$('undo').click();check('Undo ordering',()=>assert.equal(q.get().items[0].id,1));
$('list').children[0].querySelector('.row').children[3].click();check('Rotate right action',()=>assert.equal(q.get().items[0].rot,1));check('Rotation dimensions',()=>assert.equal(q.renderItem(q.get().items[0],1000).width,120));$('undo').click();check('Undo rotation',()=>assert.equal(q.get().items[0].rot,0));
let before=q.get().history.length;$('list').children[0].querySelector('.row').children[4].click();check('Opening crop preserves Undo',()=>assert.equal(q.get().history.length,before));q.setCrop({t:.25,r:0,b:0,l:0});$('cApply').click();check('Apply crop',()=>assert.equal(q.get().items[0].crop.t,.25));check('Crop dimensions',()=>assert.equal(q.renderItem(q.get().items[0],1000).height,90));$('undo').click();check('Undo crop',()=>assert.equal(q.get().items[0].crop.t,0));

const open=()=>$('list').children[0].querySelector('.row').children[4].click();
const near=(a,b)=>assert(Math.abs(a-b)<1e-9,`${a} != ${b}`);
check('Crop uses eight direct manipulation handles without range sliders',()=>{
 assert.equal((html.match(/class="crop-handle"/g)||[]).length,8);
 assert(!/id="c[tblr]" type="range"/.test(html));assert(html.includes('height:100dvh'));
});
open();check('Large crop preview fits stage with room for edge targets',()=>{
 assert(parseFloat($('cropBoard').style.width)<=348);
 assert(parseFloat($('cropBoard').style.height)<=548);
 assert(q.getCrop().base.width>1);
});
check('Semitransparent precision panel opens and hides',()=>{
 assert($('cropFine').hidden);$('cFineToggle').click();assert(!$('cropFine').hidden);
 assert.equal($('cFineToggle')['aria-expanded'],'true');$('cFineToggle').click();assert($('cropFine').hidden);
});
check('Precision controls change exactly one source pixel',()=>{
 $('cEdge').value='t';$('cMore').click();near(q.getCrop().draft.t,1/120);
 $('cLess').click();near(q.getCrop().draft.t,0);
});
check('Right and bottom controls trim toward centre',()=>{
 $('cEdge').value='r';$('cMore').click();near(q.getCrop().draft.r,1/80);
 $('cEdge').value='b';$('cMore').click();near(q.getCrop().draft.b,1/120);$('cReset').click();
});
check('Pointer drag uses captured image-relative coordinates',()=>{
 const board=$('cropBoard'),event=(type,x,y,id=7)=>({type,clientX:x,clientY:y,pointerId:id,pointerType:'touch',target:{dataset:{handle:'tl'}},preventDefault(){}});
 board.listeners.pointerdown(event('pointerdown',0,0));assert(board.hasPointerCapture(7));
 board.listeners.pointermove(event('pointermove',40,120));flushFrames();
 near(q.getCrop().draft.l,.1);near(q.getCrop().draft.t,.2);
 board.listeners.pointerup(event('pointerup',80,180));flushFrames();
 near(q.getCrop().draft.l,.2);near(q.getCrop().draft.t,.3);assert(!board.hasPointerCapture(7));assert(!q.getCrop().drag);
});
check('Other fingers do not change active gesture',()=>{
 const board=$('cropBoard'),e=(id,x)=>({type:'pointermove',pointerId:id,pointerType:'touch',clientX:x,clientY:0,target:{dataset:{handle:'r'}},preventDefault(){}});
 board.listeners.pointerdown(e(8,400));board.listeners.pointermove(e(9,200));near(q.getCrop().draft.r,0);
 board.listeners.pointercancel(e(8,400));assert(!q.getCrop().drag);
});
check('Moving inside preserves selection size and bounds',()=>{
 const a={t:.2,r:.1,b:.3,l:.15},c=q.cropChange(a,'move',2,-2);
 near(c.l+c.r,a.l+a.r);near(c.t+c.b,a.t+a.b);near(c.r,0);near(c.t,0);
});
check('All handles preserve nonempty bounded crop',()=>{
 for(const h of ['tl','t','tr','r','br','b','bl','l'])for(const dx of [-4,-.2,0,.2,4])for(const dy of [-4,0,4]){
  const c=q.cropChange({t:.1,r:.2,b:.1,l:.2},h,dx,dy);
  assert(Object.values(c).every(v=>v>=0&&v<=.94));assert(c.l+c.r<=.94000000001&&c.t+c.b<=.94000000001);
 }
});
check('Keyboard arrows and Shift support precise corner adjustments',()=>{
 $('cReset').click();$('crop-tl').listeners.keydown({key:'ArrowRight',shiftKey:false,preventDefault(){}});near(q.getCrop().draft.l,1/80);
 $('crop-tl').listeners.keydown({key:'ArrowDown',shiftKey:true,preventDefault(){}});near(q.getCrop().draft.t,10/120);
});
check('Resize preserves draft and releases active gesture',()=>{
 const board=$('cropBoard');board.listeners.pointerdown({pointerId:41,pointerType:'touch',clientX:0,clientY:0,target:{dataset:{handle:'tl'}},preventDefault(){}});
 assert(board.hasPointerCapture(41));const old=JSON.stringify(q.getCrop().draft);q.resizeCrop();flushFrames();assert.equal(JSON.stringify(q.getCrop().draft),old);assert(!q.getCrop().drag);assert(!board.hasPointerCapture(41));
});
check('Cancel preserves image and Undo history and releases bitmaps',()=>{
 const old=JSON.stringify(q.get().items[0].crop),n=q.get().history.length,base=q.getCrop().base;
 $('cCancel').click();assert.equal(JSON.stringify(q.get().items[0].crop),old);assert.equal(q.get().history.length,n);
 assert(!q.getCrop().base);assert.equal(base.width,1);assert.equal($('cv').width,1);
});
for(let r=0;r<4;r++)check('Precise crop apply and Undo at rotation '+r,()=>{
 q.get().items[0].rot=r;open();const draft={t:.1234,r:.0843,b:.0337,l:.1479};q.setCrop(draft);
 const want=q.rotBox(draft,(4-r)%4);$('cApply').click();assert.equal(JSON.stringify(q.get().items[0].crop),JSON.stringify(want));
 $('undo').click();assert(Object.values(q.get().items[0].crop).every(v=>v===0));
});q.get().items[0].rot=0;
check('One pixel adjustments follow rotated image dimensions',()=>{
 q.get().items[0].rot=1;open();near(q.cropStep('t'),1/80);near(q.cropStep('l'),1/120);$('cCancel').click();q.get().items[0].rot=0;
});
check('Reset only changes draft until apply',()=>{
 open();q.setCrop({t:.2,r:.2,b:.2,l:.2});$('cReset').click();assert(Object.values(q.getCrop().draft).every(v=>v===0));$('cCancel').click();
});
for(let r=0;r<4;r++)check('Crop rotation round trip '+r,()=>{const a={t:.1,r:.2,b:.3,l:.05};assert.equal(JSON.stringify(q.rotBox(q.rotBox(a,r),(4-r)%4)),JSON.stringify(a))});
const select=$('list').children[0].querySelector('.row').children.at(-1);select.value='grey';select.onchange();check('Colour control',()=>assert.equal(q.get().items[0].filter,'grey'));const pix=q.renderItem(q.get().items[0],1000).getContext('2d').getImageData(10,10,1,1).data;check('Greyscale rendered',()=>assert(Math.abs(pix[0]-pix[1])<2));$('undo').click();
q.showPreview(q.get().items[0],0);check('Paper preview opens',()=>assert($('previewDialog').open));check('Portrait paper preview',()=>assert($('previewCanvas').height>$('previewCanvas').width));$('previewClose').click();check('Preview bitmap released',()=>assert.equal($('previewCanvas').width,1));
q.lock(true);check('Header Exit locked while busy',()=>assert($('exit').disabled));q.lock(false);
for(const sz of ['a4','letter','fit'])for(const o of ['auto','p','l'])for(const m of [-4,0,10,50,500])for(const [w,h]of [[1,1],[80,120],[120,80],[1,2200]]){$('size').value=sz;$('orient').value=o;$('margin').value=m;const L=q.layout(w,h);assert(L.iw>0&&L.ih>0&&L.x>=0&&L.y>=0)}passed.push('180 layout combinations');$('size').value='a4';$('orient').value='auto';$('margin').value=10;
const pages=[{bytes:new Uint8Array(c.toBuffer('image/jpeg')),w:80,h:120,L:q.layout(80,120)},{bytes:new Uint8Array(c.toBuffer('image/jpeg')),w:120,h:80,L:q.layout(120,80)}];fs.mkdirSync(path.join(root,'tests/results'),{recursive:true});for(const kind of ['pdf','docx']){const b=kind==='pdf'?q.buildPdf(pages):q.buildDocx(pages);fs.writeFileSync(path.join(root,'tests/results/sample.'+kind),Buffer.from(await b.arrayBuffer()));passed.push(kind+' export generated')}
let resolveSave;window.TurtleNative={save:()=>new Promise(r=>resolveSave=r)};const pending=q.exportFile('pdf');await new Promise(setImmediate);await new Promise(setImmediate);check('Export remains locked awaiting native save',()=>assert(q.get().busy));const overlap=q.exportFile('docx');await overlap;resolveSave();await pending;check('Native save releases lock',()=>assert(!q.get().busy));
window.TurtleNative.save=async()=>{throw Error('cancelled')};await q.exportFile('docx');check('Save failure visible',()=>assert($('status').textContent.includes('cancelled')));
window.TurtleNative.print=async()=>{throw Error('printer unavailable')};await $('bPrint').onclick();check('Print failure visible and unlocked',()=>assert($('status').textContent.includes('printer unavailable')&&!q.get().busy));
$('clear').click();check('Clear removes pages',()=>assert.equal(q.get().items.length,0));$('undo').click();check('Undo Clear restores pages',()=>assert.equal(q.get().items.length,2));$('discard').click();check('Discard also removes history',()=>assert.equal(q.get().items.length+q.get().history.length,0));
fs.writeFileSync(path.join(root,'tests/results/automated.json'),JSON.stringify({environment:'Node VM DOM simulation with native canvas; not browser or Android QA',passed},null,2));console.log(JSON.stringify({passed:passed.length,checks:passed},null,2));
})().catch(e=>{console.error(e);process.exit(1)});
