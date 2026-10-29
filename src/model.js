export const services=['Shipment','CDS imports','CDS exports','ICS2 ENS','GMR','S&SGB ENS','EMCS'];
export function seed(){const rows=[];for(const [service,count] of [['CDS imports',18],['ICS2 ENS',6],['GMR',2],['CDS exports',8],['Shipment',9],['S&SGB ENS',4],['EMCS',3]])for(let i=0;i<count;i++){const issue=service==='CDS imports'&&i<4?'Registered over 10 days':service==='ICS2 ENS'&&i<4?'Validation error':service==='GMR'&&i===0?'Not finalisable':'';const code=service.replace(/\W/g,'').toLowerCase();const special=i===0&&['CDS imports','ICS2 ENS','GMR'].includes(service);rows.push({owner:['Jane Doe','Alex Morgan','Unassigned'][i%3],id:code+'-'+i,reference:special?`SAMPLE-2610${service==='GMR'?'27-C':service==='ICS2 ENS'?'28-B':'29-A'}`:`SAMPLE-${code.toUpperCase()}-${String(i+1).padStart(3,'0')}`,service,company:['Northern Goods Ltd','Harbour Retail GmbH','Maple Components'][i%3],consignee:['Northern Goods Ltd','Harbour Retail GmbH','Maple Components'][(i+1)%3],country:'United Kingdom',origin:'Netherlands',status:issue==='Registered over 10 days'?'Registered':issue||(i%3===0?'Draft':i%3===1?'Cleared':'Submitted'),workflow:issue?'Awaiting review':'In progress',issue,updated:issue==='Registered over 10 days'?`2026-10-${18-i}`:'2026-10-29',currency:'GBP',vehicle:service==='GMR'&&i===0?'':'AB12 CDE',crossing:service==='GMR'&&i===0?'':'Calais → Dover',notes:'',items:[{id:'goods-1',description:'Electronic components',code:service==='ICS2 ENS'&&i<4?'':'8542399000',origin:'Netherlands',quantity:12,weight:120,value:2100}],documents:[{id:'invoice',name:'Commercial invoice.pdf',kind:'Commercial invoice',date:'2026-10-28'}],history:[{title:issue||'Record created',detail:'Sample record available for review.',date:'29 Oct 2026, 14:22'}],archived:false});}return rows;}
export function validate(r){
 const errors=[];
 for(const [key,label,tab]of [['reference','Reference','overview'],['company','Exporter / seller','parties'],['consignee','Consignee','parties']])if(!r[key]?.trim())errors.push({label,tab,text:'This field is required.'});
 if(!r.items.length)errors.push({label:'Goods',tab:'goods',text:'Add at least one item.'});
 r.items.forEach((g,i)=>{
  const add=(label,text)=>errors.push({label:`Item ${i+1} · ${label}`,tab:'goods',itemId:g.id,text});
  if(!g.description?.trim())add('Description','Enter a goods description.');
  if(!/^\d{8,10}$/.test(g.code))add('Commodity code','Enter an 8–10 digit commodity code for this sample check.');
  if(!g.origin?.trim())add('Country of origin','Enter the country of origin.');
  if(!(g.quantity>0))add('Quantity','Enter a quantity greater than zero.');
  if(!(g.value>0))add('Value','Enter a goods value greater than zero.');
 });
 if(r.service==='GMR'&&(!r.vehicle?.trim()||!r.crossing?.trim()))errors.push({label:'Transport',tab:'transport',text:'Vehicle registration and crossing route are required.'});
 return errors;
}
export const uid=()=>crypto.randomUUID?.()||Date.now().toString(36)+Math.random().toString(36).slice(2);
export const date=d=>new Intl.DateTimeFormat('en-GB',{day:'2-digit',month:'short',year:'numeric',timeZone:'Europe/London'}).format(new Date(d+'T12:00:00Z'));
export const money=(v,c='GBP')=>new Intl.NumberFormat('en-GB',{style:'currency',currency:c}).format(Number(v)||0);
export function csv(filename,headings,rows){const text=[headings,...rows].map(row=>row.map(value=>{let s=String(value??'');if(/^[=+@-]/.test(s))s="'"+s;return '"'+s.replaceAll('"','""')+'"';}).join(',')).join('\r\n');const a=document.createElement('a');a.href=URL.createObjectURL(new Blob(['\uFEFF'+text],{type:'text/csv;charset=utf-8'}));a.download=filename;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),2000);}
