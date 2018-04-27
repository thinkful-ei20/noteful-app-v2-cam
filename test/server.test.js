'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');

// Import server.js and use destructuring assignment to create variables for
// server.app, server.runServer, and server.closeServer
const { app, runServer, closeServer } = require('../server');

// declare a variable for expect from chai import
const expect = chai.expect;

chai.use(chaiHttp);

// describe('Reality Check', () => {
//   it('true should be true', () => {
//     expect(true).to.be.true;
//   });

//   it('2 + 2 should equal 4', () => {
//     expect(2 + 2).to.equal(4);
//   });
// });

describe('Noteful App', () => {
  let server;

  before(() => {
    return app.startServer()
      .then(instance => server = instance);
  });

  after(() => {
    return server.stopServer();
  });

  describe('static server', () => {
    it('GET request "/" should return the index page', () => {

    });
  });
});