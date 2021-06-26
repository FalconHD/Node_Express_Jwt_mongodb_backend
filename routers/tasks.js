const express = require('express');
const TasksModel = require('../models/tasks');
const jwt = require('jsonwebtoken');

const router = express.Router();


const CreateTask = router.post('/Create', verifyToken, async (req, res) => {
    jwt.verify(req.token, 'secretkey', async (err, authData) => {
        if (err) {
            res.status(403).json({
                message: "Authentication failed try to login "
            })
        } else {
            const Room = req.body;
            TasksModel.create(Room).then((result) => {
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

const UpdateTask = router.put('/Update/:id', verifyToken, async (req, res, next) => {
    jwt.verify(req.token, 'secretkey', async (err, authData) => {
        if (err) {
            res.status(403).json({
                message: "Authentication failed try to login "
            })

        } else {
            TasksModel.updateOne({ _id: req.params.id }, req.body, { new: true }, (err, newRoomInfo) => {
                if (err) next(err)
                res.status(200)
                res.json({
                    message: "✔ update succeeded ✔"
                })
            })
        }

    })


})

const DeleteTask = router.delete('/Delete/:id', verifyToken, async (req, res, next) => {
    jwt.verify(req.token, 'secretkey', async (err, authData) => {
        if (err) {
            res.status(403).json({
                message: "Authentication failed try to login "
            })

        } else {
            TasksModel.findByIdAndRemove({ _id: req.params.id }, (err, deletedRomm) => {
                if (err) next(err)
                res.status(200)
                res.json({
                    message: "🪓 Room Deleted 🧨"
                })
            })
        }

    })


})


const getAllTask = router.get('/', verifyToken, (req, res, next) => {


    jwt.verify(req.token, 'secretkey', async (err, authData) => {
        if (err) {

            res.status(403)
            res.json({
                message: "authrntication failed try to login "
            })

        } else {
            await TasksModel.find().sort().populate('member')
                .then((data) => {
                    res.status(200);
                    res.json({
                        rooms: data,
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
    getAllTask,
    CreateTask,
    UpdateTask,
    DeleteTask
}