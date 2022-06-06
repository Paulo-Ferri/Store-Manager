const sinon = require('sinon');
const { expect } = require('chai');
const salesModel = require('../../../models/salesModel');
const connection = require('../../../db');

describe('Get all sales in DB', () => {
  describe('When the DB doesnt have any sale', () => {

    before(() => {
      const results = [[]];
      sinon.stub(connection, 'execute').resolves(results);
    });

    after(() => {
      connection.execute.restore();
    });

    it('should return an array', async () => {
      const response = await salesModel.getAll();
      expect(response).to.be.an('array');
    });

    it('should be an empty array', async () => {
      const response = await salesModel.getAll();
      expect(response).to.be.empty;
    })
  });

  describe('When the DB have sales', () => {
    before(() => {
      const payloadSales = [[
        {
          "saleId": 1,
          "date": "2022-06-06T13:55:28.000Z",
          "productId": 1,
          "quantity": 5
        },
      ]];
      
      sinon.stub(connection, 'execute').resolves(payloadSales);
    });

    after(() => {
      connection.execute.restore();
    });

    it('should return an array', async () => {
      const response = await salesModel.getAll();
      expect(response).to.be.an('array');
    });

    it('shouldnt be an empty array', async () => {
      const response = await salesModel.getAll();
      expect(response).to.not.be.empty;
    });

    it('should be an array with object', async () => {
      const [result] = await salesModel.getAll();
      expect(result).to.be.an('object');
    });

    it('should be an object with properties saleId, date, productId and quantity', async () => {
      const [result] = await salesModel.getAll();
      expect(result).to.include.all.keys(
        'saleId',
        'date',
        'productId',
        'quantity',
      )
    })
  })
});

describe('Get one sale by the id', () => {
  describe('When the db doesnt have one sale by the id', () => {
    before(() => {
      const results = [[]];
      sinon.stub(connection, 'execute').resolves(results);
    });
  
    after(() => {
      connection.execute.restore();
    });
  
    it('should return an array', async () => {
      const response = await salesModel.getById();
      expect(response).to.be.an('array');
    });
  
    it('should be an empty array', async () => {
      const response = await salesModel.getById();
      expect(response).to.be.empty;
    });
  })

  describe('When the DB have sales by the id', () => {
    before(() => {
      const payloadSales = [[
        {
          "date": 1,
          "productId": "test product",
          "quantity": 10
        },
      ]];
      
      sinon.stub(connection, 'execute').resolves(payloadSales);
    });
  
    after(() => {
      connection.execute.restore();
    });
  
    it('should return an array', async () => {
      const response = await salesModel.getById();
      expect(response).to.be.an('array');
    });
  
    it('shouldnt be an empty array', async () => {
      const response = await salesModel.getById(1);
      expect(response).to.not.be.empty;
    });
  
    it('should be an array with object', async () => {
      const [result] = await salesModel.getById(1);
      expect(result).to.be.an('object');
    });
  });
});

describe('Get the details of one sale by the id', () => {
  describe('When the db doesnt have one sale-product by the id', () => {
    before(() => {
      const results = [[]];
      sinon.stub(connection, 'execute').resolves(results);
    });
  
    after(() => {
      connection.execute.restore();
    });
  
    it('should return an array', async () => {
      const response = await salesModel.getSaleProductsById();
      expect(response).to.be.an('array');
    });
  
    it('should be an empty array', async () => {
      const response = await salesModel.getSaleProductsById();
      expect(response).to.be.empty;
    });
  })

  describe('When the DB have sales-products by the id', () => {
    before(() => {
      const payloadSales = [[
        {
          "date": 1,
          "productId": "test product",
          "quantity": 10
        },
      ]];
      
      sinon.stub(connection, 'execute').resolves(payloadSales);
    });
  
    after(() => {
      connection.execute.restore();
    });
  
    it('should return an array', async () => {
      const response = await salesModel.getSaleProductsById();
      expect(response).to.be.an('array');
    });
  
    it('shouldnt be an empty array', async () => {
      const response = await salesModel.getSaleProductsById();
      expect(response).to.not.be.empty;
    });
  
    it('should be an array with object', async () => {
      const [result] = await salesModel.getSaleProductsById();
      expect(result).to.be.an('object');
    });
  });
});

describe('Create new sale and get it id', () => {
  describe('When the sale is created', () => {
    before(() => {
      const execute = [{insertId: 1}];
      sinon.stub(connection, 'execute').resolves(execute);
    });
  
    after(() => {
      connection.execute.restore();
    });

    it('should return the insertId as a number', async () => {
      const result = await salesModel.getNewSaleId();
      expect(result).to.be.a('number');
    });
  })
})