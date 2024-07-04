// ./routes/bookRoutes.js

const express = require('express');
const router = express.Router();

// Example route handler
router.get('/', (req, res) => {
    res.send('Books API endpoint');
});

module.exports = router;
