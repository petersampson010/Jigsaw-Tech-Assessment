const chai = require('chai');
const rp = require('request-promise');
const { response } = require('../src');

chai.should();

async function request(path) {
  return rp({
    url: `http://localhost:3000/insights/${path}`,
    method: 'GET',
    json: true,
    resolveWithFullResponse: true, // promise resolves with full response not just body. 
    simple: false   // ensures promise resolves even if statusCode is not 200 series.
  });
}

describe('Insights Service', () => {
  describe('/categories', () => {
    it('should return a 200 status code', async () => {
        const response = await request('/categories');
        response.statusCode.should.equal(200);
      });
      it('should return 297 Total Value for Charity', async () => {
        const response = await request('/categories');
        response.body.Charity.totalValue.should.equal(297);
      });
      it('should return 5 food categories', async () => {
        const response = await request('/categories');
        Object.keys(response.body).length.should.equal(5);
      })
  });
  describe('/cashflow/:param', () => {
      it('should return a 501 error for an incorrect month parameter', async () => {
        const response = await request(`/cashflow/0`);
        response.statusCode.should.equal(501);
      });
      it('should return a totalNumber of 21 for November', async () => {
        const response = await request('/cashflow/11');
        response.body["04/11/2020"].totalNumber.should.equal(21);
      })
      context('should return a success 200 for any valid month', () => {
        it('one digit param (4)', async () => {
          const response = await request('/cashflow/4');
          response.statusCode.should.equal(200);
        });
        it('two digit param (04)', async () => {
          const response = await request('/cashflow/04');
          response.statusCode.should.equal(200);
        });
      });
  });
});
