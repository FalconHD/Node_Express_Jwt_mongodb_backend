const express = require('express');
const { RVModel } = require('../models/rendez_vous');
const jwt = require('jsonwebtoken');

const router = express.Router();




const CreateMeet = router.post('/Create', verifyToken, async (req, res) => {
    jwt.verify(req.token, 'secretkey', async (err, authData) => {
        if (err) {
            res.status(403).json({
                message: "Authentication failed try to login "
            })

        } else {
            const Question = req.body;
            RVModel.create(Group).then((result) => {
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


const UpdateMeet = router.put('/Update/:id', verifyToken, async (req, res, next) => {
    jwt.verify(req.token, 'secretkey', async (err, authData) => {
        if (err) {
            res.status(403).json({
                message: "Authentication failed try to login "
            })

        } else {
            RVModel.updateOne({ _id: req.params.id }, req.body, { new: true }, (err, newGroup) => {
                if (err) next(err)
                res.status(200)
                res.json({
                    message: "✔ update succeeded ✔"
                })
            })
        }

    })


})

const DeleteMeet = router.delete('/Delete/:id', verifyToken, async (req, res, next) => {
    jwt.verify(req.token, 'secretkey', async (err, authData) => {
        if (err) {
            res.status(403).json({
                message: "Authentication failed try to login "
            })

        } else {
            RVModel.findByIdAndRemove({ _id: req.params.id }, (err, DeleteGroup) => {
                if (err) next(err)
                res.status(200)
                res.json({
                    message: "🪓 Question Deleted 🧨"
                })
            })
        }

    })


})



const getAllMeet = router.get('/', verifyToken, (req, res, next) => {


    jwt.verify(req.token, 'secretkey', async (err, authData) => {
        if (err) {
            res.status(403)
            res.json({
                message: "Authentication failed try to login "
            })

        } else {
            await RVModel.find().sort().populate('User')
                .then((data) => {
                    res.status(200);
                    res.json({
                        Questions: data,
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
    CreateMeet,
    UpdateMeet,
    DeleteMeet,
    getAllMeet
}