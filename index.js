const express = require('express');
const bodyParser = require('body-parser');
const db = require('./models'); // Assuming the models are directly in the 'models' directory
const userCtrl = require('./controllers/userController');

const app = express();

app.use(bodyParser.json());

// Routes
app.get('/', (req, res) => {
    res.send('Hello world');
});

// User routes
app.get('/add-user', userCtrl.addUser);
app.get('/get-user', userCtrl.getUser);
app.get('/get-user/:id', userCtrl.getSingleUser);
app.post('/post-user', userCtrl.createUser);
app.delete('/delete-user/:id', userCtrl.deleteUser)
app.patch('/patch-user/:id', userCtrl.patchUser)
app.put('/update-user/:id', userCtrl.updateUser)

// Start the server
const PORT = 4400;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
