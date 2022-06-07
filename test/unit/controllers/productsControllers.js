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
  });

  it('Should return an array', async () => {
    await productsController.getAll(request, response);
    expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
  });

});

describe('It is possible to get one product by the id', () => {
  const request = {};
  const response = {};

  const productById = [{
    id: 1,
    name: "Martelo de Thor",
    quantity: 10
  }];
  before(() => {
    request.params = { id: 1 };
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();
    sinon.stub(productsService, 'getById').resolves({status: 200, message: productById});
  });

  after(() => {
    productsService.getById.restore();
  });

  it('Should be called with response code 200', async () => {
    await productsController.getById(request, response);
    expect(response.status.calledWith(200)).to.be.equal(true);
  });

  it('Should return an object', async () => {
    await productsController.getAll(request, response);
    expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
  });
});

describe('It is possible to create a new product', () => {
  const request = {};
  const response = {};

  before(() => {
    request.body = { name: "testProduct", quantity: 10 };
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();
    sinon.stub(productsService, 'createProduct').resolves({
      status: 201,
        productRegistred: {
          id: 1,
          name: 'testProduct',
          quantity: 10,
      }
    });
  });

  after(() => {
    productsService.createProduct.restore();
  });

  it('Should be called with response code 201', async () => {
    await productsController.createProduct(request, response);
    expect(response.status.calledWith(201)).to.be.equal(true);
  })
});

describe('It is possible to modify one product by the id', () => {
  const request = {};
  const response = {};

  before(() => {
    request.params = { id: 1 }
    request.body = { name: "testProduct", quantity: 10 };
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();
    sinon.stub(productsService, 'changeProduct').resolves(
      {
      status: 200,
      message: {
        id: 1,
        name: "testProduct",
        quantity: 10
      }
     }
    );
  });

  after(() => {
    productsService.changeProduct.restore();
  });

  it('Should be called with response 200', async () => {
    await productsController.modify(request, response);
    expect(response.status.calledWith(200)).to.be.equal(true);
  })
});

describe('It is possible to delete one product by the id', () => {
  const request = {};
  const response = {};
  before(() => {
    request.params = { id: 1 }
    response.status = sinon.stub().returns(response);
    response.send = sinon.stub().returns('ok');
    sinon.stub(productsService, 'deleteProduct').resolves({status: 204})
  });

  after(() => {
    productsService.deleteProduct.restore();
  });

  it('Should return status code 204', async () => {
    await productsController.deleteProduct(request, response);
    expect(response.status.calledWith(204)).to.be.equal(true);
  })
})