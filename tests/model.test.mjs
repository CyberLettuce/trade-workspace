import test from 'node:test';
import assert from 'node:assert/strict';
import {seed,validate} from '../src/model.js';
test('incomplete safety declarations identify goods correction',()=>{const r=seed().find(r=>r.service==='ICS2 ENS');assert.ok(validate(r).some(e=>e.tab==='goods'));r.items[0].code='8542399000';assert.equal(validate(r).length,0);});
test('a movement requires both vehicle and crossing',()=>{const r=seed().find(r=>r.service==='GMR');assert.ok(validate(r).some(e=>e.tab==='transport'));r.vehicle='AB12 CDE';assert.ok(validate(r).some(e=>e.tab==='transport'));r.crossing='Calais → Dover';assert.equal(validate(r).length,0);});
test('empty and malformed goods cannot pass submission validation',()=>{const r=seed()[0];r.items=[];assert.ok(validate(r).some(e=>e.tab==='goods'));r.items=[{description:'Parts',code:'123',origin:'Netherlands',quantity:1,value:10}];assert.ok(validate(r).some(e=>e.tab==='goods'));r.items[0].code='8542399000';r.items[0].quantity=0;assert.ok(validate(r).some(e=>e.tab==='goods'));});
test('party and reference omissions are assigned to relevant sections',()=>{const r=seed()[0];r.reference=' ';r.company='';r.consignee='';const errors=validate(r);assert.ok(errors.some(e=>e.tab==='overview'));assert.equal(errors.filter(e=>e.tab==='parties').length,2);});
