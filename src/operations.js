import {validate,uid} from './model.js';
export const DEMO_TODAY='2026-10-29';
export const owners=['Unassigned','Jane Doe','Alex Morgan','Sam Taylor'];
export function checks(r){
 const errors=validate(r);
 return [
  {key:'parties',label:'Parties & reference',tab:'parties',ok:!errors.some(e=>['parties','overview'].includes(e.tab))},
  {key:'goods',label:'Goods information',tab:'goods',ok:!errors.some(e=>e.tab==='goods')},
  {key:'transport',label:'Transport information',tab:'transport',ok:!errors.some(e=>e.tab==='transport')},
  {key:'documents',label:'Supporting document attached',tab:'documents',ok:r.documents.length>0}
 ];
}
export function nextAction(r){
 const errors=validate(r);
 if(['Cleared','Completed'].includes(r.status))return {label:'Complete',text:'Available in your records',tab:'history',rank:4};
 if(errors.length)return {label:'Missing data',text:errors[0].label+': '+errors[0].text,tab:errors[0].tab,rank:0};
 if(r.issue)return {label:'Follow up',text:r.issue,tab:'history',rank:1};
 if(!r.documents.length)return {label:'Documents',text:'Attach supporting evidence for review.',tab:'documents',rank:2};
 if(r.status==='Submitted')return {label:'Awaiting response',text:'Review the latest message before taking action.',tab:'history',rank:3};
 return {label:'Ready to review',text:'Sample completeness checks passed. Review before submission.',tab:'overview',rank:2};
}
export function matchesLane(r,lane,owner){
 if(r.archived)return false;
 if(lane==='mine')return r.owner===owner&&!['Cleared','Completed'].includes(r.status);
 if(lane==='unassigned')return !r.owner||r.owner==='Unassigned';
 if(lane==='missing')return nextAction(r).label==='Missing data';
 if(lane==='followup')return nextAction(r).label==='Follow up';
 return !['Cleared','Completed'].includes(r.status);
}
export function templateFromRecord(r,name){
 return {id:uid(),name,service:r.service,company:r.company,consignee:r.consignee,country:r.country,origin:r.origin,currency:r.currency,items:structuredClone(r.items)};
}
export function fromTemplate(t,form){
 return {...structuredClone(t),...form,id:uid(),reference:form.reference.trim(),owner:form.owner||'Unassigned',status:'Draft',workflow:'Draft',issue:'',updated:DEMO_TODAY,vehicle:'',crossing:'',notes:'',items:t.items.map(g=>({...g,id:uid()})),documents:[],archived:false,history:[{title:'Draft created from template',detail:t.name,date:'29 Oct 2026 · just now'}]};
}
export function starterTemplates(records){return ['CDS imports','CDS exports','ICS2 ENS'].map(service=>templateFromRecord(records.find(r=>r.service===service&&validate(r).length===0),service+' · recurring components'));}
