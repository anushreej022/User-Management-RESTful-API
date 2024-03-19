var Assn8 = require('../models/assn8');
var bcrypt = require('bcrypt');
const saltRounds = 10;
const multer = require('multer');
const path = require('path');
module.exports = function (app) {
    //server routes 

    //get all users
    app.get('/user/getAll', function (req, res) {
        Assn8.find(function (err, samples) {
            if (err)
                res.send(err);
            console.log('samples', samples);
            res.json(samples);
        });
    });

    //insert route
    app.post('/user/insert', function (req, res) {
        console.log(req.body);
        var regexEmail = /[a-z0-9]+@northeastern.edu/;
        var regexPwd = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%&*]).{8,}$/;
        //var regExName = /^[a-zA-Z]+$/;
        var regExName = /^[a-zA-Z\s]+$/;
        var em = req.body.email;
        var pass = req.body.password;
        var fname = req.body.full_name;
        var query = { email: req.body.email };
        if (!fname.match(regExName)) {
            res.send("Name is in invalid format");
        }
        else if (!em.match(regexEmail)) {
            res.send("Email is in invalid format, use northeastern.edu format");
        }
        else if (!pass.match(regexPwd)) {
            res.send("Password is in invalid format, follow password rules : 1 Uppercase Character, 1 lower character, 1 special character, 1 digit and minimum 8 characters");
        }
        else {
            Assn8.count(query, function (err, count) {

                if (err) {
                    res.send(err);
                }
                if (count == 1) {

                    res.send("Email Id Exists!");
                }
                else {
                    bcrypt.genSalt(saltRounds, function (err, salt) {
                        bcrypt.hash(req.body.password, salt, function (err, hash) {
                            var record = new Assn8({
                                full_name: req.body.full_name,
                                email: req.body.email,
                                password: hash
                            });
                            record.save(function (err, rec) {
                                if (err)
                                    res.send(err);
                                console.log('Saved ' + rec);
                                res.send("Created User successfully");
                            });
                        });
                    });
                }
            });
        }
    });

    //update route
    app.put('/user/edit', function (req, res) {
        console.log(req.body);
        var query = { email: req.body.email };
        var regexEmail = /[a-z0-9]+@northeastern.edu/;
        var regexPwd = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%&*]).{8,}$/;
        //var regExName = /^[a-zA-Z]+$/;
        var regExName = /^[a-zA-Z\s]+$/;
        var em = req.body.email;
        var pass = req.body.password;
        var fname = req.body.full_name;

        if (!fname.match(regExName)) {
            res.send("Name is in invalid format");
        }
        else if (!em.match(regexEmail)) {
            res.send("Email is in invalid format, use northeastern.edu format");
        }
        else if (!pass.match(regexPwd)) {
            res.send("Password is in invalid format, follow password rules : 1 Uppercase Character, 1 lower character, 1 special character, 1 digit and minimum 8 characters");
        }
        else {
            Assn8.count(query, function (err, count) {
                if (err) {
                    res.send(err);
                }
                if (count == 0) {
                    res.send("User does not exists!");
                }
                else {
                    bcrypt.genSalt(saltRounds, function (err, salt) {
                        bcrypt.hash(req.body.password, salt, function (err, hash) {
                            var upd = { $set: { full_name: req.body.full_name, password: hash } };
                            Assn8.updateOne(query, upd, function (err, dc) {
                                if (err)
                                    res.send(err);
                                else
                                    res.send("Updated user");
                            });
                        });
                    });
                    
                }
            });

        }
    });

    //delete route
    app.delete('/user/delete', function (req, res) {
        console.log(req.body);
        var query = { email: req.body.email };
        var regexEmail = /[a-z0-9]+@northeastern.edu/;
        var em = req.body.email;

        if (!em.match(regexEmail)) {
            res.send("Email is in invalid format, use northeastern.edu format");
        }
        else {
            Assn8.count(query, function (err, count) {
                if (err) {
                    res.send(err);
                }
                if (count == 0) {
                    res.send("User does not exists!");
                }
                else {
                    Assn8.deleteOne(query, function (err, dc) {
                        if (err)
                            res.send(err);
                        else
                            res.send("Deleted User Successfully");
                    });
                }
            });

        }
    });

// Define storage for the uploaded images
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './images');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// Check file type
function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images only! (JPEG, PNG, GIF)');
    }
}

// Initialize upload
const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
}).single('file'); 

// Upload image endpoint
app.post('/user/uploadImage', function (req, res) {
    upload(req, res, function (err) {
        if (err) {
            res.send(err);
        } else {
            if (req.file == undefined) {
                res.send('Error: No File Selected!');
            } else {
                // Here we would save the path to the database
                const imagePath = req.file.path;
                
                var record = new Assn8({ imagePath: imagePath });
                record.save(function (err, rec) {
                    if (err)
                        res.send(err);
                    console.log('Saved ' + rec);
                    res.send("File Uploaded! Path: " + imagePath);
                });
            }
        }
    });
});

}