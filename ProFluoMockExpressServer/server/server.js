const express = require('express');
const cors = require('cors'); // Import the cors package
const app = express();
const port = 3000;

// Load your JSON data
const jsonData = require('./invoice-ids.json');

// Enable CORS for all routes
app.use(cors());
app.use(express.json()); // Parse JSON request bodies

app.post('/check-invoice', (req, res) => {
    const { id } = req.body; // Get the 'id' from the request body

    // Check if the ID exists in the invoiceIds array
    const exists = jsonData.invoiceIds.includes(id);

    // Log the request details and status
    console.log(`[${new Date().toLocaleString()}] Requested ID: ${id}, Status: ${exists ? 'Exists' : 'Does Not Exist'}`);

    setTimeout(() => {
        // Send the result as a response
        res.json({ exists });
    }, 500); // Delay in milliseconds
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
