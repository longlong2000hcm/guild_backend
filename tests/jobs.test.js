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

let id

before(done => {
    chai.request(app)
        .post('/api/jobs')
        .send(job)
        .end((err, res) => {
            id = res.body.job._id
            done()
        })
})

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
            .get(`/api/jobs/${id}`)
            .end((err, res) => {
                expect(res).to.have.status(200)
                expect(res.body.success).to.equals(true)
                done()
            })
    })
})

describe('DELETE', () => {
    it('Deletes a job', done => {
        chai.request(app)
            .delete(`/api/jobs/${id}`)
            // .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                expect(res).to.have.status(200)
                expect(res.body.success).to.equals(true)
                done()
            })
    })
})