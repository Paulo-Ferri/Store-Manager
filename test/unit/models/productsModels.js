const sinon = require('sinon');
const { expect } = require('chai');
const productsModel = require('../../../models/productsModel');
const connection = require('../../../db');

describe('Insert new product in DB', () => {
  const payloadProduct = {
    name: 'Test product',
    quantity: 10
  }

  before(() => {
    const execute = [{insertId: 1}];
    sinon.stub(connection, 'execute').resolves(execute);
  });

  after(() => {
    connection.execute.restore();
  });

  describe('When it is successfully entered', () => {
    it('should return the insertId as a number', async () => {
      const result = await productsModel.createProduct(payloadProduct);
      expect(result).to.be.a('number');
    });
  });
});

describe('Get all products in DB', () => {
  describe('When the DB doesnt have any product', () => {

    before(() => {
      const results = [[]];
      sinon.stub(connection, 'execute').resolves(results);
    });

    after(() => {
      connection.execute.restore();
    });

    it('should return an array', async () => {
      const response = await productsModel.getAll();
      expect(response).to.be.an('array');
    });

    it('should be an empty array', async () => {
      const [response] = await productsModel.getAll();
      expect(response).to.be.empty;
    })
  });

  describe('When the DB have products', () => {
    before(() => {
      const payloadProducts = [
        {
          "id": 1,
          "name": "test product",
          "quantity": 10
        },
      ]
      
      sinon.stub(connection, 'execute').resolves(payloadProducts);
    });

    after(() => {
      connection.execute.restore();
    });

    it('should return an array', async () => {
      const response = await productsModel.getAll();
      expect(response).to.be.an('array');
    });

    it('shouldnt be an empty array', async () => {
      const response = await productsModel.getAll();
      expect(response).to.not.be.empty;
    });

    it('should be an array with object', async () => {
      const [result] = await productsModel.getAll();
      expect(result).to.be.an('object');
    });

    it('should be an object with properties id, name and quantity', async () => {
      const [result] = await productsModel.getAll();
      expect(result).to.include.all.keys(
        'id',
        'name',
        'quantity',
      )
    })
  })
});

describe('Get one product by the id', () => {
  describe('When the db doesnt have one product by the id', () => {
    before(() => {
      const results = [[]];
      sinon.stub(connection, 'execute').resolves(results);
    });
  
    after(() => {
      connection.execute.restore();
    });
  
    it('should return an array', async () => {
      const response = await productsModel.getById(1);
      expect(response).to.be.an('array');
    });
  
    it('should be an empty array', async () => {
      const [response] = await productsModel.getById(1);
      expect(response).to.be.empty;
    });
  })

  describe('When the DB have products by the id', () => {
    before(() => {
      const payloadProducts = [
        {
          "id": 1,
          "name": "test product",
          "quantity": 10
        },
      ]
      
      sinon.stub(connection, 'execute').resolves(payloadProducts);
    });
  
    after(() => {
      connection.execute.restore();
    });
  
    it('should return an array', async () => {
      const response = await productsModel.getById(1);
      expect(response).to.be.an('array');
    });
  
    it('shouldnt be an empty array', async () => {
      const response = await productsModel.getById(1);
      expect(response).to.not.be.empty;
    });
  
    it('should be an array with object', async () => {
      const [result] = await productsModel.getById(1);
      expect(result).to.be.an('object');
    });
  });
});

describe('Get one product by the name', () => {
  describe('When the db doesnt have one product by the name', () => {
    before(() => {
      const results = [[]];
      sinon.stub(connection, 'execute').resolves(results);
    });
  
    after(() => {
      connection.execute.restore();
    });
  
    it('should return an array', async () => {
      const response = await productsModel.getByName('test');
      expect(response).to.be.an('array');
    });
  
    it('should be an empty array', async () => {
      const response = await productsModel.getByName('test');
      expect(response).to.be.empty;
    });
  });
  describe('When the DB have products by the name', () => {
    before(() => {
      const payloadProducts = [
        [{
          "id": 1,
          "name": "test product",
          "quantity": 10
        },
      ]]
      
      sinon.stub(connection, 'execute').resolves(payloadProducts);
    });
  
    after(() => {
      connection.execute.restore();
    });
  
    it('should return an array', async () => {
      const response = await productsModel.getByName();
      expect(response).to.be.an('array');
    });
  
    it('shouldnt be an empty array', async () => {
      const response = await productsModel.getByName();
      expect(response).to.not.be.empty;
    });
  
    it('should be an array with object', async () => {
      const [result] = await productsModel.getByName();
      expect(result).to.be.an('object');
    });
  })
});

