
// require('dotenv').config();
const app = require('./app');
const PORT = 3001;

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
