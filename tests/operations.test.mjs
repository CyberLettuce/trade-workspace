import test from 'node:test';
import assert from 'node:assert/strict';
import {seed,validate} from '../src/model.js';
import {nextAction,matchesLane,templateFromRecord,fromTemplate,checks,starterTemplates} from '../src/operations.js';

test('correctable gaps take priority over response follow-ups and survive a cleared attention flag',()=>{
 const r=seed().find(r=>r.service==='ICS2 ENS');
 assert.equal(nextAction(r).label,'Missing data');
 r.issue='';assert.equal(nextAction(r).label,'Missing data');
 r.items[0].code='8542399000';assert.notEqual(nextAction(r).label,'Missing data');
});
test('a complete customs response remains complete even if sample fields are missing',()=>{
 const r=seed()[0];r.status='Cleared';r.items=[];
 assert.equal(nextAction(r).label,'Complete');assert.equal(matchesLane(r,'all','Jane Doe'),false);
});
test('personal and unassigned views respect ownership and exclude archives',()=>{
 const r=seed()[0];r.owner='Alex Morgan';
 assert.equal(matchesLane(r,'mine','Jane Doe'),false);
 assert.equal(matchesLane(r,'mine','Alex Morgan'),true);
 r.owner='Unassigned';assert.equal(matchesLane(r,'unassigned','Jane Doe'),true);
 r.archived=true;assert.equal(matchesLane(r,'unassigned','Jane Doe'),false);
});
test('templates reuse data without inheriting response, identity, transport, documents or history',()=>{
 const original=seed()[0],t=templateFromRecord(original,'Repeat import');
 const r=fromTemplate(t,{reference:'  UNIQUE-REF  ',owner:'Jane Doe'});
 assert.notEqual(r.id,original.id);assert.equal(r.reference,'UNIQUE-REF');
 assert.equal(r.status,'Draft');assert.equal(r.issue,'');assert.equal(r.archived,false);
 assert.equal(r.vehicle,'');assert.equal(r.crossing,'');assert.deepEqual(r.documents,[]);
 assert.equal(r.history.length,1);assert.equal(r.history[0].title,'Draft created from template');
 assert.equal(r.items[0].code,original.items[0].code);assert.notEqual(r.items[0].id,original.items[0].id);
 r.items[0].description='Changed';assert.notEqual(t.items[0].description,'Changed');
});
test('documents checklist updates independently of sample validation and built-in templates are usable',()=>{
 const r=seed()[0];r.documents=[];
 assert.equal(validate(r).length,0);assert.equal(checks(r).find(c=>c.key==='documents').ok,false);
 const templates=starterTemplates(seed());assert.equal(templates.length,3);
 for(const t of templates)assert.equal(validate(fromTemplate(t,{reference:'NEW-REF'})).length,0);
});
