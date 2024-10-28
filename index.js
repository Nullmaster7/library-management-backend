
// require('dotenv').config(); // Load environment variables from .env file if you're using one
const app = require('./app'); // Import the main Express app
const PORT = 3000; // Set the port

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
