const sinon = require('sinon');
const { expect } = require('chai');
const productsModel = require('../../../models/productsModel');
const productsService = require('../../../services/productsService');

describe('When modifying one product', () => {
  describe('The product by the id doesnt exists', () => {
    before(() => {
      sinon.stub(productsModel, 'getById').resolves([[]]);
    });
    after(() => {
      productsModel.getById.restore();
    });
  
    it('Should return status code 404', async () => {
      const {status} = await productsService.getById(5);
      expect(status).to.be.equal(404);
    });
  });
  
  describe('The product id exists', () => {
    before(() => {
      sinon.stub(productsModel, 'getById').resolves([
        [{
        id: 1,
        name: "Martelo de Thor",
        quantity: 10
      }]]);
    })
    after(() => {
      productsModel.getById.restore();
    });

    it('Shoud return status code 200', async () => {
      const {status} = await productsService.getById(1);
      expect(status).to.be.equal(200);
    });
  });
})