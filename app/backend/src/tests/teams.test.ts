import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import TeamsModel from '../database/models/teams.model';

import { allTeamsMock, teamIdMock } from './mocks/teams.mock';

import { Response } from 'superagent';
import { Model } from 'sequelize';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando a Service Teams', () => {
  it('Testa o endpoint /teams se retorna todos os times e o stato code correto', async () => {
    const findAllStub = sinon.stub(Model, 'findAll').resolves(allTeamsMock as TeamsModel[])
    let chaiHttpResponse: Response;
    chaiHttpResponse = await chai.request(app).get('/teams');

    expect(chaiHttpResponse.body).to.deep.equal(allTeamsMock)
    expect(chaiHttpResponse.status).to.deep.equal(200)

    findAllStub.restore();
  })

  it('Testa o endpoint /teams se buscando por um id ele retorna o respectivo time e status code', async () => {
    const findOneStub = sinon.stub(Model, 'findOne').resolves(teamIdMock as TeamsModel  )
    let chaiHttpResponse: Response;
    chaiHttpResponse = await chai.request(app).get('/teams/1')

    expect(chaiHttpResponse.body).to.deep.equal(teamIdMock)
    expect(chaiHttpResponse.status).to.deep.equal(200)

    findOneStub.restore()
  })

  afterEach(() => { sinon.restore() })
});
