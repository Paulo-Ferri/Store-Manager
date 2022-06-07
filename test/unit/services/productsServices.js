const sinon = require('sinon');
const { expect } = require('chai');
const productsModel = require('../../../models/productsModel');
const productsService = require('../../../services/productsService');

describe('When modifying one product', () => {
  describe('If the product by the id doesnt exists', () => {
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
  
  describe('If the product by the id exists', () => {
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
});

describe('When creating one product', () => {
  describe('If the product already exists', () => {
    before(() => {
      sinon.stub(productsModel, 'getByName').resolves([{ id: 1, name: 'Martelo de Thor', quantity: 10 }]);
    });
    after(() => {
      productsModel.getByName.restore();
    });

    it('should return the following message: Product already exists', async () => {
      const {message} = await productsService.createProduct({name: 'Martelo de Thor', quantity: 10 });
      expect(message).to.be.equals("Product already exists");
    });
  });
  
  describe('It is a new product', () => {
    before(() => {
      sinon.stub(productsModel, 'getByName').resolves([]);
      sinon.stub(productsModel, 'createProduct').resolves(5);
    });
    after(() => {
      productsModel.getByName.restore();
      productsModel.createProduct.restore();
    });

    it('Should return status code 201', async () => {
      const {status} = await productsService.createProduct('New Product', 10);
      expect(status).to.be.equals(201);
    });
  })
});