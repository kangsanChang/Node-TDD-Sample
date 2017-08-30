const utils = require('./utils');
const should = require('should');

describe('utils.js module 의 caplitalize 함수는', ()=>{
    it('문자열의 첫 번쨰 문자를 대문자로 변환한다.',()=>{
        const result = utils.caplitalize('hello');
        result.should.be.equal('Hello');
    })
})