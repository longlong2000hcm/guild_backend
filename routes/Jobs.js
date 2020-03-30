const router = require('express').Router()
const Job = require('../models/Job')

// @ROUTE POST /api/jobs
// @DESC register a new user
router.post('/jobs', (req, res) => {
    const { title, description, location, salary } = req.body
    const newJob = new Job({ title, description, location, salary })

    newJob.save()
        .then(job => res.status(200).json({
            job,
            status: 'Job added',
            success: true
        }))
        .catch(err => {
            console.log(err.message)
            res.status(404).json({
                status: 'emt',
                success: false
            })
        })
})

router.get('/jobs', (req, res) => {
    Job.find((err, jobs) => {
        if (err) {
            console.log(err)
            return res.status(400).json({
                status: 'Jobs not found',
                success: false
            })
        }

        return res.status(200).json({
            jobs,
            status: 'Jobs found',
            success: true
        })
    })
})

router.get('/jobs/:id', (req, res) => {
    Job.find({ _id: req.params.id }, (err, job) => {
        if (err) {
            console.log(err)
            return res.status(400).json({
                status: 'Job not found',
                success: false
            })
        }

        return res.status(200).json({
            job,
            status: 'Job found',
            success: true
        })
    })
})

router.delete('/jobs/:id', (req, res) => {
    Job.findOneAndDelete({ _id: req.params.id }, (err) => {
        if (err) {
            console.log(err)
            return res.status(400).json({
                status: 'Job not found',
                success: false
            })
        }

        return res.status(200).json({
            status: 'Deletion successfull',
            success: true
        })
    })
})

router.put('/jobs/:id', (req, res) => {
    const { title, description, location, salary } = req.body

    Job.findOne({ _id: req.params.id }, (err, job) => {
        if (err) {
            console.log(err)
            return res.status(400).json({
                status: 'Job not found',
                success: false
            })
        }

        if (!job) {
            console.log(err)
            return res.status(400).json({
                status: 'Job not found',
                success: false
            })
        }

        job.title = title
        job.description = description
        job.location = location
        job.salary = salary

        job.save()
            .then(job => res.status(200).json({
                job,
                status: 'Job edited',
                success: true
            }))
            .catch(err => {
                console.log(err.message)
                res.status(404).json({
                    status: 'emt',
                    success: false
                })
            })
    })
})

module.exports = router