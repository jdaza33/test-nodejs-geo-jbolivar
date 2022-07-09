/**
 *
 */

const { startExpressTest } = require('../src/loaders/server.loader')
const { startDotenv } = require('../src/loaders/dotenv.loader')
const { startLogger } = require('../src/loaders/logger.loader')
const { startMongoose } = require('../src/loaders/database.loader')
const app = startExpressTest()
const chai = require('chai')
const chaiHttp = require('chai-http')

before(async () => {
  await startDotenv()
  await startLogger()
  await startMongoose()
})

const { expect } = chai
chai.use(chaiHttp)
describe('Test Server', () => {
  it('find bikes - return nothing', (done) => {
    chai
      .request(app)
      .get('/stations')
      .query({
        longitude: 30,
        latitude: 30,
        distance: 500,
      })
      .end((err, res) => {
        expect(res).to.have.status(200)
        expect(res.body.bikes).to.be.empty
        done()
      })
  })

  it('find bikes - return at least one', (done) => {
    chai
      .request(app)
      .get('/stations')
      .query({
        longitude: -103.35305898513403,
        latitude: 20.671032088262155,
        distance: 500,
      })
      .end((err, res) => {
        expect(res).to.have.status(200)
        expect(res.body.bikes).to.satisfy((bikes) => bikes.length > 0)
        done()
      })
  })
})
