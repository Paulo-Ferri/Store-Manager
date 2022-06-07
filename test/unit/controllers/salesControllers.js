const sinon = require("sinon");
const { expect } = require("chai");
const salesService = require('../../../services/salesService');
const salesController = require('../../../controllers/salesController');

describe('It is possible to get all the sales', () => {
  const request = {};
  const response = {};
  const allSales = [
    {
        saleId: 1,
        date: "2022-06-07T14:28:04.000Z",
        productId: 1,
        quantity: 5
    },
    {
        saleId: 1,
        date: "2022-06-07T14:28:04.000Z",
        productId: 2,
        quantity: 10
    },
    {
        saleId: 2,
        "date": "2022-06-07T14:28:04.000Z",
        productId: 3,
        quantity: 15
    }
  ];

  before(() => {
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();
    sinon.stub(salesService, 'getAll').resolves({status: 200, message: allSales});
  });

  after(() => {
    salesService.getAll.restore();
  });

  it('Should return with status code 200', async () => {
    await salesController.getAll(request, response);
    expect(response.status.calledWith(200)).to.be.equal(true);
  });
});

describe('It is possible to get sales by the id', () => {
  const request = {};
  const response = {};
  const salesById = [
    {
        date: "2022-06-07T14:28:04.000Z",
        productId: 1,
        quantity: 5
    },
    {
        date: "2022-06-07T14:28:04.000Z",
        productId: 2,
        quantity: 10
    }
  ];

  before(() => {
    request.params = { id: 1 };
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();
    sinon.stub(salesService, 'getById').resolves({status: 200, message: salesById});
  });

  after(() => {
    salesService.getById.restore();
  });

  it('Shoud return with status code 200', async () => {
    await salesController.getById(request, response);
    expect(response.status.calledWith(200)).to.be.equal(true);
  })
});