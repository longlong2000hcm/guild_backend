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
        .catch(err => next(err))
})

router.get('/jobs', (req, res, next) => {
    Job.find((err, jobs) => {
        if (err) return next(err)

        if (!jobs) {
            return res.status(404).json({
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

router.get('/jobs/:id', (req, res, next) => {
    Job.findOne({ _id: req.params.id }, (err, job) => {
        if (err) return next(err)

        if (!job) {
            return res.status(404).json({
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

router.delete('/jobs/:id', (req, res, next) => {
    Job.findOneAndDelete({ _id: req.params.id }, (err, job) => {
        if (err) return next(err)

        if (!job) {
            return res.status(404).json({
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

router.put('/jobs/:id', (req, res, next) => {
    const { title, description, location, salary } = req.body

    Job.findOne({ _id: req.params.id }, (err, job) => {
        if (err) return next(err)

        if (!job) {
            return res.status(404).json({
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
            .catch(err => next(err))
    })
})

module.exports = router