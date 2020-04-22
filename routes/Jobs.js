const router = require('express').Router()
const Job = require('../models/Job')

// @ROUTE POST /api/jobs
// @DESC post a new job
router.post('/jobs', (req, res) => {
    const { title, description, location, salary, phone, ownerID } = req.body
    const newJob = new Job({ title, description, location, salary, phone, ownerID })

    newJob.save()
        .then(job => res.status(200).json({
            job,
            status: 'Job added',
            success: true
        }))
        .catch(err => {
            console.log(err);
            res.status(400).json({"message": err});
        })
})

// @ROUTE GET /api/jobs
// @DESC get all jobs
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

// @ROUTE GET /api/jobs/:id
// @DESC get a job by job id
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

// @ROUTE GET /api/availableJobs/:userId
// @DESC get all job not made by userId
router.get('/availableJobs/:userId', (req, res, next) => {
    Job.find({ ownerID: {$ne: req.params.userId}},(err, jobs) => {
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

// @ROUTE GET /api/jobs/ownerID/:id
// @DESC get a job by ownerID
router.get('/jobs/ownerID/:id', (req, res, next) => {
    Job.find({ ownerID: req.params.id }, (err, job) => {
        if (err) return next(err)

        if (!job) {
            return res.status(404).json({
                status: 'Job not found',
                success: false
            })
        }

        return res.status(200).json({
            jobs: job,
            status: 'Job found',
            success: true
        })
    })
})

// @ROUTE DELETE /api/jobs/:id
// @DESC delete a job
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

// @ROUTE PUT /api/jobs/:id
// @DESC edit a job
router.put('/jobs/:id', (req, res, next) => {
    const { title, description, location, salary, phone } = req.body

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
        job.phone = phone

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