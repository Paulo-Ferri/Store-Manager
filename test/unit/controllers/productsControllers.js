const sinon = require("sinon");
const { expect } = require("chai");
const productsService = require('../../../services/productsService');
const productsController = require('../../../controllers/productsController');

describe('It is possible to get all the products', () => {
  const request = {};
  const response = {};
  const allProducts = [
    {
        id: 1,
        name: "Martelo de Thor",
        quantity: 10
    },
    {
        id: 2,
        name: "Traje de encolhimento",
        quantity: 20
    },
    {
        id: 3,
        name: "Escudo do Capitão América",
        quantity: 30
    }
  ];
  before(() => {
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();
    sinon.stub(productsService, 'getAll').resolves(allProducts);
  });

  after(() => {
    productsService.getAll.restore();
  });

  it('Should be called with response code 200', async () => {
    await productsController.getAll(request, response);
    expect(response.status.calledWith(200)).to.be.equal(true);
  })
});
