/*mkdir mongodb-crud
cd mongodb-crud
npm init -y
npm install express mongoose */

// run node server.js 
// postman for put,post,delete  

const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/college')
    .then(() => console.log('MongoDB Connected Successfully'))
    .catch(err => {
        console.error('MongoDB Connection Error:', err.message);
    });

// Student Schema
const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    }
});

const Student = mongoose.model('Student', studentSchema);

// Home page
app.get('/', (req, res) => {
    res.send(`
        <h1>MongoDB CRUD Application</h1>
        <p>Node.js and Express server is running.</p>
        <a href="/students">View All Students</a>
    `);
});

// CREATE: Add a student
app.post('/students', async (req, res) => {
    try {
        const { name, email } = req.body;

        if (!name || !email) {
            return res.status(400).json({
                message: 'Name and email are required'
            });
        }

        const student = await Student.create({ name, email });

        res.status(201).json({
            message: 'Student added successfully',
            student
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// READ: Get all students
app.get('/students', async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// READ: Get one student
app.get('/students/:id', async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({
                message: 'Invalid student ID'
            });
        }

        const student = await Student.findById(req.params.id);

        if (!student) {
            return res.status(404).json({
                message: 'Student not found'
            });
        }

        res.json(student);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// UPDATE: Update a student
app.put('/students/:id', async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({
                message: 'Invalid student ID'
            });
        }

        const student = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!student) {
            return res.status(404).json({
                message: 'Student not found'
            });
        }

        res.json({
            message: 'Student updated successfully',
            student
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE: Delete a student
app.delete('/students/:id', async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({
                message: 'Invalid student ID'
            });
        }

        const student = await Student.findByIdAndDelete(
            req.params.id
        );

        if (!student) {
            return res.status(404).json({
                message: 'Student not found'
            });
        }

        res.json({
            message: 'Student deleted successfully'
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Handle unknown routes
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

// Start server after MongoDB connects
mongoose.connection.once('open', () => {
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
});
