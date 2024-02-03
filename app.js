const express = require('express');
const pool = require('./db_connection'); // Assuming db_connection.js is in the same directory

const app = express();
const port = 3000;
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// Log database connection status
pool.connect()
  .then(() => console.log('Connected to the database'))
  .catch((error) => console.error('Error connecting to the database:', error));

app.set('view engine', 'pug');
app.use(express.static('public'));

// Route handler for the Departments page
app.get('/departments', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM Departments');
    res.render('departments', { departments: rows });
  } catch (error) {
    console.error('Error fetching departments:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Route handler for the Patients page
app.get('/patients', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM Patients');
    res.render('patients', { patients: rows });
  } catch (error) {
    console.error('Error fetching patients:', error);
    res.status(500).send('Internal Server Error');
  }
});
// Assuming you have a route handler for adding patients
app.post('/patients', async (req, res) => {
  try {
    const { firstname, lastname, birthdate, gender, contactnumber } = req.body;
    
    // Insert the new patient into the database
    await pool.query(
      'INSERT INTO Patients (FirstName, LastName, Birthdate, Gender, ContactNumber) VALUES ($1, $2, $3, $4, $5)',
      [firstname, lastname, birthdate, gender, contactnumber]
    );

    // Redirect back to the patients page
    res.redirect('/patients');
  } catch (error) {
    console.error('Error adding patient:', error);
    res.status(500).send('Internal Server Error');
  }
});


// Route handler for the Doctors page
app.get('/', (req, res) => {
    res.render('index');
  });
  app.get('/doctors', async (req, res) => {
    try {
      const query = 'SELECT doctorid, firstname, lastname, specialty, contactnumber FROM Doctors';
      console.log('Executing SQL query:', query);
  
      const { rows } = await pool.query(query);
      console.log('Doctors:', rows);  // Log the fetched data
      res.render('doctors', { doctors: rows });
    } catch (error) {
      console.error('Error fetching doctors:', error);
      res.status(500).send('Internal Server Error');
    }
  });
  // Assuming you have a route handler for adding doctors
app.post('/doctors', async (req, res) => {
    try {
      const { firstname, lastname, specialty, contactnumber } = req.body;
      
      // Insert the new doctor into the database
      await pool.query(
        'INSERT INTO Doctors (FirstName, LastName, Specialty, ContactNumber) VALUES ($1, $2, $3, $4)',
        [firstName, lastName, specialty, contactNumber]
      );
  
      // Redirect back to the doctors page
      res.redirect('/doctors');
    } catch (error) {
      console.error('Error adding doctor:', error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  


// Route handler for the Appointments page
app.get('/appointments', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM Appointments');
    res.render('appointments', { appointments: rows });
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).send('Internal Server Error');
  }
});



// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
app.post('/patients', async (req, res) => {
  try {
    const { firstName, lastName, birthdate, gender, contactNumber } = req.body;
    
    // Insert the new patient into the database
    await pool.query(
      'INSERT INTO Patients (FirstName, LastName, Birthdate, Gender, ContactNumber) VALUES ($1, $2, $3, $4, $5)',
      [firstName, lastName, birthdate, gender, contactNumber]
    );

    // Redirect back to the patients page
    res.redirect('/patients');
  } catch (error) {
    console.error('Error adding patient:', error);
    res.status(500).send('Internal Server Error');
  }
});

