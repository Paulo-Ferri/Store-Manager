const sinon = require('sinon');
const { expect } = require('chai');
const salesModel = require('../../../models/salesModel');
const salesService = require('../../../services/salesService');

describe('It is possible to get all the sales', () => {
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
    sinon.stub(salesModel, 'getAll').resolves(allSales);
  });
  after(() => {
    salesModel.getAll.restore();
  });

  it('Should return status code 200', async () => {
    const {status} = await salesService.getAll();
    expect(status).to.be.equals(200);
  })
});

describe('It is possible to get all the sales by the id', () => {
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
  describe('When the id doesnt exists', () => {
    before(() => {
      sinon.stub(salesModel, 'getById').resolves([])
    });
    after(() => {
      salesModel.getById.restore();
    });

    it('Should return status code 404', async () => {
      const {status} = await salesService.getById(5);
      expect(status).to.be.equals(404);
    });
  });

  describe('When the id exists', () => {
    before(() => {
      sinon.stub(salesModel, 'getById').resolves(salesById)
    });
    after(() => {
      salesModel.getById.restore();
    });

    it('Should return status code 200', async () => {
      const {status} = await salesService.getById(1);
      expect(status).to.be.equals(200);
    })
  });
});

describe('It is possible to modify one sale by the id', () => {
  before(() => {
    sinon.stub(salesModel, 'modifyById').resolves([])
  });
  after(() => {
    salesModel.modifyById.restore();
  });

  it('Should return status code 200', async () => {
    const {status} = await salesService.changeSale(1, 10, 1);
    expect(status).to.be.equals(200);
  })
})
