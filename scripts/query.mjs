import{readFile,writeFile}from'node:fs/promises';
const root=new URL('../',import.meta.url),wiki=JSON.parse(await readFile(new URL('content/wiki.json',root),'utf8'));
const query=process.argv.slice(2).join(' ')||'結構 花色 宮廷';
const results=wiki.map(p=>({id:p.id,title:p.title,score:p.keywords.filter(k=>query.toLowerCase().includes(k.toLowerCase())).length,claims:p.claims})).filter(p=>p.score>0).sort((a,b)=>b.score-a.score);
let log=[];try{log=JSON.parse(await readFile(new URL('runs/retrieval.json',root),'utf8'))}catch{}
log.push({executedAt:new Date().toISOString(),query,method:'Wiki 關鍵詞檢索；不是向量搜尋或 LLM API',results});await writeFile(new URL('runs/retrieval.json',root),JSON.stringify(log,null,2));console.log(JSON.stringify({query,results},null,2));if(!results.length)process.exitCode=1;
