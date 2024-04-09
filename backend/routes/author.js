const express = require('express');

const router = express.Router();

const Author = require('../models/author');

const multer = require('multer');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

filename ='';

const mystorage = multer.diskStorage({
    destination:'./uploads',
    filename:(req,file,redirect)=>{
        let date = Date.now();
        let fl = date + '.' + file.mimetype.split('/')[1];
        //filename.png
        redirect(null,fl);
        filename = fl;
    }
});

const upload = multer({storage: mystorage})

router.post('/register', upload.any('image') ,(req,res)=>{

    data = req.body;
    author = new Author(data);

    author.image = filename;

    salt = bcrypt.genSaltSync(10);
    author.password = bcrypt.hashSync(data.password,salt);

    author.save()
        .then(
            (savedAuthor)=>{
                filename = '';
                res.status(200).send(savedAuthor);
            }
        )
        .catch(
            err => {
                res.send(err)
            }
        )

})

router.post('/login', (req, res) => {
    let data = req.body;

    Author.findOne({ email: data.email })
        .then(author => {
            if (!author) {
                res.status(400).send('Email or password is invalid');
            } else {
                let valid = bcrypt.compareSync(data.password, author.password);
                if (!valid) {
                    res.status(400).send('Email or password is invalid');
                } else {
                    let payload = {
                        _id: author._id,
                        email: author.email,
                        fullname: author.name + ' ' + author.lastname
                    };
                    let token = jwt.sign(payload, '123456789', { expiresIn: '1h' }); // Adding expiration time

                    res.status(200).send({ mytoken: token });
                }
            }
        })
        .catch(err => {
            res.status(500).send(err); // Internal server error
        });
});

router.get('/all',(req,res)=>{
    Author.find({})
    .then((authors) =>{
        res.status(200).send(authors);
    })
    .catch((err)=>{
        res.status(400).send(err);
    })
})

router.get('/getbyid/:id',(req,res)=>{
    let id = req.params.id

    Author.findOne({_id:id})
        .then((author) => {
            res.status(200).send(author);
        })
        .catch(
            (err)=>{
                res.status(400).send(err);
            }
        )
})

router.delete('/supprimer/:id',(req,res)=>{
    let id = req.params.id

    Author.find({idAuthor: id})
        .then((author) => {
            res.status(200).send(author);
        })
        .catch(
            (err)=>{
                res.status(400).send(err);
            }
        )
})

router.put('/update/:id',(req,res)=>{

})

module.exports = router;