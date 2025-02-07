require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require('./DB/connectDB')
const StudentSchema = require('./models/Student')
const TeacherSchema = require('./models/Teacher')
const GallerySchema = require('./models/Gallery')
const CarouselImageSchema = require('./models/CarouselImage')
const UserSchema = require('./models/Users')
const ContactSchema = require('./models/Contact')
const NoticeSchema = require('./models/Notice')
const AcademicSchema = require('./models/Academics')
const AdmissionSchema = require('./models/Admission')
const GalleryDropDownSchema = require('./models/GalleryDropDown')
const DownloadDropDownSchema = require('./models/DownloadDropDown')
const jwt = require('jsonwebtoken')
const BackgroundImage = require('./models/BackgroundImage')
const HomeImage = require('./models/HomeImage');


const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;



app.post("/StudentInfo", (req, res) => {
    StudentSchema.create(req.body)
        .then(result => res.json(result))
        .catch(error => res.json(error))
});

app.get('/GetStudentInfo', (req, res) => {
    StudentSchema.find({})
        .then(result => res.json(result))
        .catch(error => res.json(error))
});

app.get('/GetStudentInfo/:id', (req, res) => {
    const id = req.params.id;
    StudentSchema.findById({ _id: id })
        .then(result => res.json(result))
        .catch(error => res.json(error))
});

app.put('/EditStudentInfo/:id', (req, res) => {
    const id = req.params.id;
    const { FirstName, LastName, Class, PhoneNumber } = req.body;
    StudentSchema.findByIdAndUpdate({ _id: id }, {
        FirstName,
        LastName,
        Class,
        PhoneNumber
    })
        .then(result => res.json(result))
        .catch(error => res.json(error))
});

app.delete('/DeleteStudent/:id', (req, res) => {
    const id = req.params.id;
    StudentSchema.findByIdAndDelete({ _id: id })
        .then(result => res.json(result))
        .catch(error => res.json(error))
})

app.post("/TeacherInfo", (req, res) => {
    TeacherSchema.create(req.body)
        .then(result => res.json('Got Teacher Data'))
        .catch(error => res.json(error))
});

app.get('/GetTeacherInfo', (req, res) => {
    TeacherSchema.find({})
        .then(result => res.json(result))
        .catch(error => res.json(error))
});

app.get('/GetTeacherInfo/:id', (req, res) => {
    const id = req.params.id;
    TeacherSchema.findById({ _id: id })
        .then(result => res.json(result))
        .catch(error => res.json(error))
});

app.put('/EditTeacherInfo/:id', (req, res) => {
    const id = req.params.id;
    const { FirstName, LastName, ClassTeacherOf, PhoneNumber } = req.body;
    TeacherSchema.findByIdAndUpdate({ _id: id }, {
        FirstName,
        LastName,
        ClassTeacherOf,
        PhoneNumber
    })
        .then(result => res.json(result))
        .catch(error => res.json(error))
});

app.delete('/DeleteTeacher/:id', (req, res) => {
    const id = req.params.id;
    TeacherSchema.findByIdAndDelete({ _id: id })
        .then(result => res.json(result))
        .catch(error => res.json(error))
})

app.post("/AddNewCard", (req, res) => {
    GallerySchema.create(req.body)
        .then(result => res.json(result))
        .catch(error => res.json(error))
});

app.get('/GetGalleryCard', (req, res) => {
    GallerySchema.find({})
        .then(result => res.json(result))
        .catch(error => res.json(error))
});

app.get('/GetGalleryImages/:id', (req, res) => {
    const id = req.params.id;
    GallerySchema.findById({ _id: id })
        .then(result => res.json(result))
        .catch(error => res.json(error))
});

app.delete('/DeleteGalleryCard/:id', (req, res) => {
    const id = req.params.id;
    GallerySchema.findByIdAndDelete({ _id: id })
        .then(result => res.json(result))
        .catch(error => res.json(error))
})

app.post("/AddNewCarouselImage", (req, res) => {
    CarouselImageSchema.create(req.body)
        .then(result => res.json(result))
        .catch(error => res.json(error))
});

app.get('/GetCarouselImage', (req, res) => {
    CarouselImageSchema.find({})
        .then(result => res.json(result))
        .catch(error => res.json(error))
});

app.delete('/DeleteCarouselImage/:id', (req, res) => {
    const id = req.params.id;
    CarouselImageSchema.findByIdAndDelete({ _id: id })
        .then(result => res.json(result))
        .catch(error => res.json(error))
})

app.post('/Register', (req, res) => {
    UserSchema.create(req.body)
        .then(users => res.json(users))
        .catch(error => res.json(error))
})

app.post('/Login', (req, res) => {
    const { username, password } = req.body;
    UserSchema.findOne({ username: username })
        .then(user => {
            if (user) {
                if (user.password === password) {

                    const token = jwt.sign({ username: user.username }, 'secret_key', { expiresIn: '1hr' });
                    res.json({ token: token, message: 'Login Successful' })
                }
                else {
                    res.json('Please Check the Password')
                }
            } else {
                res.json('Not Existing')
            }
        })
})

app.post("/AddContactInfo", (req, res) => {
    ContactSchema.create(req.body)
        .then(result => res.json(result))
        .catch(error => res.json(error))
});

app.get('/GetContactInfo', (req, res) => {
    ContactSchema.find({})
        .then(result => res.json(result))
        .catch(error => res.json(error))
});

app.delete('/DeleteContactInfo/:id', (req, res) => {
    const id = req.params.id;
    ContactSchema.findByIdAndDelete({ _id: id })
        .then(result => res.json(result))
        .catch(error => res.json(error))
})

app.post("/AddNewNotice", (req, res) => {
    NoticeSchema.create(req.body)
        .then(result => res.json(result))
        .catch(error => res.json(error))
});

app.get('/GetNotice', (req, res) => {
    NoticeSchema.find({})
        .then(result => res.json(result))
        .catch(error => res.json(error))
});

app.delete('/DeleteNotice/:id', (req, res) => {
    const id = req.params.id;
    NoticeSchema.findByIdAndDelete({ _id: id })
        .then(result => res.json(result))
        .catch(error => res.json(error))
})

app.post("/AddNewAcademicDropDown", (req, res) => {
    AcademicSchema.create(req.body)
        .then(result => res.json(result))
        .catch(error => res.json(error))
});

app.get('/GetAcademicDropDown', (req, res) => {
    AcademicSchema.find({})
        .then(result => res.json(result))
        .catch(error => res.json(error))
});

app.delete('/DeleteAcademicDropDown/:id', (req, res) => {
    const id = req.params.id;
    AcademicSchema.findByIdAndDelete({ _id: id })
        .then(result => res.json(result))
        .catch(error => res.json(error))
})

app.post("/AddNewAdmissionDropDown", (req, res) => {
    AdmissionSchema.create(req.body)
        .then(result => res.json(result))
        .catch(error => res.json(error))
});

app.get('/GetAdmissionDropDown', (req, res) => {
    AdmissionSchema.find({})
        .then(result => res.json(result))
        .catch(error => res.json(error))
});

app.delete('/DeleteAdmissionDropDown/:id', (req, res) => {
    const id = req.params.id;
    AdmissionSchema.findByIdAndDelete({ _id: id })
        .then(result => res.json(result))
        .catch(error => res.json(error))
})

app.post("/AddNewGalleryDropDown", (req, res) => {
    GalleryDropDownSchema.create(req.body)
        .then(result => res.status(200).json(result))
        .catch(error => res.status(500).json(error));
});

app.get('/GetGalleryDropDown', (req, res) => {
    GalleryDropDownSchema.find({})
        .then(result => res.json(result))
        .catch(error => res.json(error))
});

app.delete('/DeleteGalleryDropDown/:id', (req, res) => {
    const id = req.params.id;
    GalleryDropDownSchema.findByIdAndDelete({ _id: id })
        .then(result => res.json(result))
        .catch(error => res.json(error))
});

app.post("/AddNewDownloadDropDown", (req, res) => {
    DownloadDropDownSchema.create(req.body)
        .then(result => res.json(result))
        .catch(error => res.json(error))
});

app.get('/GetDownloadDropDown', (req, res) => {
    DownloadDropDownSchema.find({})
        .then(result => res.json(result))
        .catch(error => res.json(error))
});

app.delete('/DeleteDownloadDropDown/:id', (req, res) => {
    const id = req.params.id;
    DownloadDropDownSchema.findByIdAndDelete({ _id: id })
        .then(result => res.json(result))
        .catch(error => res.json(error))
});

app.post('/postBackgroundImage', async (req, res) => {
    try {
        const { imageUrl } = req.body;
        if (!imageUrl) return res.status(400).json({ success: false, message: 'Image URL is required' });

        // Remove the existing image and replace it
        await BackgroundImage.deleteMany({});
        const newImage = await BackgroundImage.create({ imageUrl });

        res.status(200).json({ success: true, message: 'Background image updated', data: newImage });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error });
    }
});

// GET: Retrieve the Background Image
app.get('/getBackgroundImage', async (req, res) => {
    try {
        const backgroundImage = await BackgroundImage.findOne();
        if (!backgroundImage) return res.status(404).json({ success: false, message: 'No background image found' });

        res.status(200).json({ success: true, data: backgroundImage });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error });
    }
});

app.post('/postHomeImage', async (req, res) => {
    const { imageLink, description } = req.body;

    try {
        const newImage = new HomeImage({ imageLink, description });
        await newImage.save();
        res.json({ success: true, message: 'Image added successfully', data: newImage });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error });
    }
});

// ✅ Route to fetch all Home Images
app.get('/getHomeImages', async (req, res) => {
    try {
        const homeImages = await HomeImage.find().sort({ createdAt: -1 }); // Latest first
        res.json({ success: true, data: homeImages });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching images', error });
    }
});

// ✅ Route to delete a Home Image by ID
app.delete('/deleteHomeImage/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await HomeImage.findByIdAndDelete(id);
        res.json({ success: true, message: 'Image deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error deleting image', error });
    }
});









const start = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log('Server Connected');
        })
    } catch (error) {
        console.log(error);
    }
}

start();

module.exports = app;
