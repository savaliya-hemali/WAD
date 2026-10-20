/*mkdir myapi
cd myapi
npm init -y
npm install express*/

// run node server.js

/*output: node server.js */
/*postman for put,post,delete*/

const express = require('express');
const app = express();

app.use(express.json());

let students = [
    { id: 1, name: "Hemali" },
    { id: 2, name: "Nidhi" }
];

// GET: Display all students
app.get('/students', (req, res) => {
    res.json(students);
});

// GET: Display one student
app.get('/students/:id', (req, res) => {
    const student = students.find(s => s.id == req.params.id);

    if (!student)
        return res.status(404).send("Student not found");

    res.json(student);
});

// POST: Add a student
app.post('/students', (req, res) => {
    const student = {
        id: students.length
            ? Math.max(...students.map(s => s.id)) + 1 : 1,
        name: req.body.name
    };

    students.push(student);
    res.status(201).json(student);
});

// PUT: Update a student
app.put('/students/:id', (req, res) => {
    const student = students.find(s => s.id == req.params.id);

    if (!student)
        return res.status(404).send("Student not found");

    student.name = req.body.name;
    res.json(student);
});

// DELETE: Delete a student
app.delete('/students/:id', (req, res) => {
    const index = students.findIndex(s => s.id == req.params.id);

    if (index === -1)
        return res.status(404).send("Student not found");

    students.splice(index, 1);
    res.send("Student deleted successfully");
});

// Start server
app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
