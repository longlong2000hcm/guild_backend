const app = require('../index')
const chai = require('chai')
const chaiHttp = require('chai-http')

const { expect } = chai
chai.use(chaiHttp)

const job = {
    title: 'Car repair',
    description: 'I will repair you car cheaply',
    location: ['Helsinki', 'Finland'],
    salary: 50.95
}

// test code for future when login and register is implemented
/* before(done => {
    chai.request(app)
        .post('/api/jobs')
        .send({ job })
        .end((err, res) => {
            done()
        })
}) */

describe('GET', () => {
    it('Fetches all the items', done => {
        chai.request(app)
            .get('/api/jobs')
            .end((err, res) => {
                expect(res).to.have.status(200)
                expect(res.body.success).to.equals(true)
                done()
            })
    })

    it('Fetches a specific item by id', done => {
        chai.request(app)
            .get('/api/jobs/5e81e25c1367360d74710bc1')
            .end((err, res) => {
                expect(res).to.have.status(200)
                expect(res.body.success).to.equals(true)
                done()
            })
    })
})

describe('POST', () => {
    it('Posts a new job', done => {
        chai.request(app)
            .post('/api/jobs')
            // .set('Authorization', `Bearer ${token}`)
            .send(job)
            .end((err, res) => {
                expect(res).to.have.status(200)
                expect(res.body.success).to.equals(true)
                done()
            })
    })
})