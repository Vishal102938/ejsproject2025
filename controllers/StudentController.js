const Student = require("../models/Student");
const cloudinary = require('cloudinary').v2;
async function addStudent(req, res) {
    try {
        let result;
        if(req.file){
            cloudinary.config({
                cloud_name : 'dt1mqu5h4',
                api_key : '158723965245835',
                api_secret : 'szpfXlPo2QUMoPcBYKp7kEHZ6DU'
            })
            result = await cloudinary.uploader.upload(req.file.path);
        }
        let student = new Student(req.body);
        if(req.file){
            student.studentImage = result.secure_url;
        }
        await student.save();
        let students = await Student.find({});
        res.render("studentlist", {
            students: students,
        });
    } catch (err) {
        console.log(err);
    }
}

async function deleteStudent(req, res) {
    try {
        let studentId = req.params._id;
        await Student.deleteOne({ _id: studentId });
        let students = await Student.find({});
        res.render("welcomeadmin", {
            students: students,
        });
    } catch (err) {
        console.log(err);
    }
}

async function openEditPage(req, res) {
    try {
        let studentId = req.params._id;
        let student = await Student.findOne({ _id: studentId });
        if (student) {
            res.render("studenteditpage", {
                student: student,
            });
        } else {
            res.render("/");
        }
    } catch (err) {
        console.log(err);
    }
}

//  /edit/student/:_id

async function editStudent(req, res) {
    try {
        const studentId = req.params._id;
        let student = await Student.findOne({ _id: studentId });
        if (student) {
            student.rollNo = req.body.rollNo;
            student.studentName = req.body.studentName;
            student.fatherName = req.body.fatherName;
            student.course = req.body.course;
            student.branch = req.body.branch;
            student.yearOfAdmission = req.body.yearOfAdmission;

            await student.save();
            let students = await Student.find({});
            res.render('welcomeadmin',{
                students : students
            })
        } else {
            res.end("Student not found");
        }
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    addStudent,
    deleteStudent,
    openEditPage,
    editStudent,
};
