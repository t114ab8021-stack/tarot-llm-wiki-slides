const {chromium}=require(process.env.PLAYWRIGHT_PATH||'playwright');
const fs=require('node:fs/promises'),path=require('node:path'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),url=process.env.TEST_URL||'http://127.0.0.1:4175';
(async()=>{await fs.mkdir(path.join(root,'private/screenshots'),{recursive:true});const browser=await chromium.launch({headless:true,...(process.env.BROWSER_PATH?{executablePath:process.env.BROWSER_PATH}:{})});const errors=[],results=[];
try{
for(const viewport of [{width:1440,height:900},{width:1366,height:768},{width:390,height:844},{width:320,height:568}]){
 const page=await browser.newPage({viewport});page.on('pageerror',e=>errors.push(e.message));await page.goto(url+'/slides.html');
 for(let i=0;i<14;i++){await page.selectOption('#slide-select',String(i));await page.waitForFunction(()=>[...document.querySelectorAll('.slide:not([hidden]) img')].every(i=>i.complete&&i.naturalWidth>0));
  const sizes=await page.evaluate(()=>{const slide=document.querySelector('.slide:not([hidden])'),area=document.querySelector('#deck');return{visible:document.querySelectorAll('.slide:not([hidden])').length,pageWidth:document.documentElement.scrollWidth,width:innerWidth,slideWidth:slide.scrollWidth,clientWidth:slide.clientWidth,areaHeight:area.clientHeight,scrollHeight:area.scrollHeight}});
  assert.equal(sizes.visible,1);assert(sizes.pageWidth<=sizes.width,'Page horizontal overflow '+i);assert(sizes.slideWidth<=sizes.clientWidth+1,'Slide horizontal overflow '+i);
  if(viewport.width>=1000)assert(sizes.scrollHeight<=sizes.areaHeight+2,'Desktop slide requires scrolling: '+(i+1));
  if(viewport.width===1440)await page.screenshot({path:path.join(root,'private/screenshots/slide-'+String(i+1).padStart(2,'0')+'.png')});
 }
 results.push({test:'All 14 slides render, images loaded, no horizontal overflow; desktop fits',viewport,status:'passed'});await page.close();
}
const page=await browser.newPage({viewport:{width:1440,height:900}});page.on('pageerror',e=>errors.push(e.message));await page.goto(url+'/slides.html');await page.keyboard.press('ArrowRight');assert.equal(await page.locator('#slide-select').inputValue(),'1');await page.keyboard.press('End');assert.equal(await page.locator('#slide-select').inputValue(),'13');await page.keyboard.press('Home');assert.equal(await page.locator('#slide-select').inputValue(),'0');
await page.selectOption('#slide-select','7');await page.click('.reveal');assert(await page.locator('#observation-answer').isVisible());await page.click('.reveal');assert(!(await page.locator('#observation-answer').isVisible()));
for(const [index,answer]of [['10','0'],['11','1']]){await page.selectOption('#slide-select',index);await page.locator('.slide:not([hidden]) [data-choice="2"]').click();assert(await page.locator('.slide:not([hidden]) .wrong').count());await page.locator('.slide:not([hidden]) [data-choice="'+answer+'"]').click();assert(await page.locator('.slide:not([hidden]) .correct').count())}
await page.selectOption('#slide-select','9');await page.fill('#practice-note','browser verification note');await page.press('#practice-note','ArrowLeft');assert.equal(await page.locator('#slide-select').inputValue(),'9');await page.click('#save-note');await page.reload();assert.equal(await page.locator('#practice-note').inputValue(),'browser verification note');await page.click('#timer');await page.waitForTimeout(1150);assert.match(await page.locator('#timer-output').textContent(),/59|58/);
await page.locator('.slide:not([hidden]) summary').click();assert(await page.locator('.slide:not([hidden]) details[open]').count());await page.emulateMedia({media:'print'});assert.equal(await page.locator('.slide:visible').count(),14);await page.emulateMedia({media:'screen'});
results.push({test:'Keyboard, reveal, both quizzes, note persistence, timer, notes and print visibility',status:'passed'});
await page.goto(url+'/wiki.html');await page.fill('#wiki-search','RWS');assert((await page.locator('.wiki-item:visible').count())>=1);await page.fill('#wiki-search','zzzz-no-result');assert.equal(await page.locator('.wiki-item:visible').count(),0);await page.fill('#wiki-search','');assert.equal(await page.locator('.wiki-item:visible').count(),5);
for(const route of ['index.html','workflow.html','submission.html','wiki/history.html','sources/S01.html'])assert.equal((await page.goto(url+'/'+route)).status(),200);
results.push({test:'Wiki search, empty state and public site routes',status:'passed'});assert.deepEqual(errors,[]);
await fs.writeFile(path.join(root,'runs/browser.json'),JSON.stringify({executedAt:new Date().toISOString(),status:'passed',browser:'Chromium / Microsoft Edge headless',results,errors,limits:'自動化瀏覽器測試；不是手機實機觸控測試。列印只驗證 14 頁內容可見，未驗證實體紙張輸出。'},null,2));console.log('PASS: '+results.length+' browser checks, zero console errors');
}catch(error){await fs.writeFile(path.join(root,'runs/browser-failure.json'),JSON.stringify({executedAt:new Date().toISOString(),status:'failed',message:error.message,completed:results},null,2));throw error}finally{await browser.close()}})().catch(e=>{console.error(e);process.exit(1)});
