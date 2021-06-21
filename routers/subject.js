const express = require('express');
const {SubjectModel} = require('../models/subject');
const jwt = require('jsonwebtoken');
const router = express.Router();




const AllSubject = router.get('/', verifyToken, (req, res, next) => {


    jwt.verify(req.token, 'secretkey', async (err, authData) => {
        if (err) {
            res.status(403)
            res.json({
                message: "Authentication failed try to login "
            })

        } else {
            await SubjectModel.find().sort().populate('User')
                .then((data) => {
                    res.status(200);
                    res.json({
                        Groups: data,
                    })

                })
        }

    })
})


const CreateSubject = router.post('/Add', verifyToken, async (req, res) => {
    jwt.verify(req.token, 'secretkey', async (err, authData) => {
        if (err) {
            res.status(403).json({
                message: "Authentication failed try to login "
            })

        } else {
            const Subject = req.body;
            SubjectModel.create(Subject).then((result) => {
                // res.sendStatus(200)
                res.status(200).json(
                    result
                )
            }).catch((err) => res.status(500).json({
                error: err.message
            }))

        }

    })


})




const UpdateSubject = router.put('/Update/:id', verifyToken, async (req, res, next) => {
    jwt.verify(req.token, 'secretkey', async (err, authData) => {
        if (err) {
            res.status(403).json({
                message: "Authentication failed try to login "
            })

        } else {
            SubjectModel.updateOne({ _id: req.params.id }, req.body, { new: true }, (err, newGroup) => {
                if (err) next(err)
                res.status(200)
                res.json({
                    message: "✔ update succeeded ✔"
                })
            })
        }

    })


})



const DeleteSubject = router.delete('/Delete/:id', verifyToken, async (req, res, next) => {
    jwt.verify(req.token, 'secretkey', async (err, authData) => {
        if (err) {
            res.status(403).json({
                message: "Authentication failed try to login "
            })

        } else {
            SubjectModel.findByIdAndRemove({ _id: req.params.id }, (err, DeleteGroup) => {
                if (err) next(err)
                res.status(200)
                res.json({
                    message: "🪓 Subject Deleted 🧨"
                })
            })
        }

    })


})


function verifyToken(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if (typeof bearerHeader !== 'undefined') {
        // Split at the space
        const bearer = bearerHeader.split(' ');
        // Get token from array
        const bearerToken = bearer[1];

        // Set the token

        req.token = bearerToken;
        // Next middleware
        next();
    } else {
        // Forbidden
        res.status(403)
        next({
            message: "Forbidden you have to login first bro"
        })
    }

}



module.exports = {
    AllSubject,
    CreateSubject,
    UpdateSubject,
    DeleteSubject
}