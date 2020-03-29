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
        }

        return res.status(200).json({
            jobs,
            status: 'Jobs found',
            success: true
        })
    })
})

module.exports = router