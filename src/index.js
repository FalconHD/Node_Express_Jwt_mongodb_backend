const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const auth = require('../routers/AuthRouters')
const meet = require('../routers/rendez_vous')
const Group = require('../routers/group')
const task = require('../routers/tasks')
const subject = require('../routers/subject')
const middlewares = require('../middlewares/errors');
require('dotenv').config()


const app = express();
app.use(express.json());
app.use(express.static('public'))
app.use(helmet());
app.use(cors());
app.use(morgan('tiny'));

//Users Routers 
app.use('/auth',auth.singup);
app.use('/auth',auth.signIn);
app.use('/auth',auth.getUser);
app.use('/auth',auth.getAllUsers);
app.use('/auth',auth.UpdateUser);
//Tasks Routers 
app.use('/tasks',task.getAllTask);
app.use('/tasks',task.CreateTask);
app.use('/tasks',task.UpdateTask);
app.use('/tasks',task.DeleteTask);
//Groups Routers 
app.use('/Group',Group.getAllGroups);
app.use('/Group',Group.CreateGroup);
app.use('/Group',Group.UpdateGroup);
app.use('/Group',Group.DeleteGroup);
app.use('/Group',Group.getOne);
//Meet Routers 
app.use('/meet',meet.getAllMeet);
app.use('/meet',meet.CreateMeet);
app.use('/meet',meet.DeleteMeet);
app.use('/meet',meet.UpdateMeet);

//subjects
app.use('/subject',subject.AllSubject);
app.use('/subject',subject.CreateSubject);
app.use('/subkect',subject.DeleteSubject);
app.use('/subject',subject.UpdateSubject);

app.get('/hello' , (req , res) => {
    res.json({
        message : " ❤ hello To my First backend ❤" ,
    });
});

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

dbUrl = process.env.MONGO_URI
mongoose.connect(dbUrl ,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
    .then((result) => {
        app.listen(process.env.PORT || 5000);
        console.log("app connected");
    })
    .catch((err => {
        console.error(err)
    }))


    

//api key : 81df64ae8891d649c66e065f5daaf83e