const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const moment = require('moment');
const fs = require('fs');
const path = require('path');
chai.use(sinonChai);

const getHelpers = require('../controllers/helper');
const Helper = require('../models/helper');

describe('Get helpers', () => {
  let req, res, next;
  beforeEach(() => {
    req = {
      query: {
        day: 'Monday',
        time: '10:00'
      }
    };
    res = {
      send: sinon.spy()
    };
    next = sinon.spy();
  });

  it('should get the list of available helpers for a given day and time', async () => {
    const helpers = [      {        availability: {          Monday: '09:00,17:00'        }      },      {        availability: {          Monday: '10:00,18:00'        }      }    ];
    sinon.stub(Helper, 'find').yields(null, helpers);
    await getHelpers.getHelpers(req, res, next);
    expect(res.send).to.have.been.calledWith(JSON.stringify([helpers[0]]));
  });

  afterEach(() => {
    Helper.find.restore();
  });
});
