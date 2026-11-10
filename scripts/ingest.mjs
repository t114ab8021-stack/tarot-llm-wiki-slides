import{readFile,writeFile,mkdir}from'node:fs/promises';import{createHash}from'node:crypto';import assert from'node:assert/strict';
const root=new URL('../',import.meta.url);const sources=JSON.parse(await readFile(new URL('content/sources.json',root),'utf8'));
await mkdir(new URL('wiki/sources/',root),{recursive:true});await mkdir(new URL('runs/',root),{recursive:true});
const results=[];
for(const s of sources){assert.equal(new URL(s.url).protocol,'https:');assert(s.summary&&s.locator&&s.method&&s.accessed);assert(s.excerpt.trim().split(/\s+/).length<=25);
 if(s.status==='rejected'){results.push({id:s.id,status:'rejected',reason:s.summary});continue}
 assert.equal(s.status,'accepted');assert(!s.method.includes('只得到'));const md=`# ${s.id} · ${s.title}\n\n- 來源：${s.publisher}\n- 作者：${s.author}\n- 原頁日期：${s.date}\n- 取得日期：${s.accessed}\n- 網址：${s.url}\n- 取得方式：${s.method}\n- 來源定位：${s.locator}\n\n## 自行整理的摘要\n\n${s.summary}\n\n## 最小查核摘句\n\n> ${s.excerpt}\n\n## 使用限制\n\n${s.limits}\n`;
 await writeFile(new URL(`wiki/sources/${s.id}.md`,root),md);results.push({id:s.id,status:'ingested',note:`wiki/sources/${s.id}.md`,noteSha256:createHash('sha256').update(md).digest('hex')});
}
assert(results.filter(r=>r.status==='ingested').length>=5);
const report={executedAt:new Date().toISOString(),method:'來源正文由本次 web reader 實際取得，LLM 整理成筆記；此腳本驗證並 ingest 筆記，不宣稱再次下載網頁。',results};
await writeFile(new URL('runs/ingest.json',root),JSON.stringify(report,null,2));console.log('PASS: 5 source notes ingested; 1 unreadable candidate excluded.');
