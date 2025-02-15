const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors'); // Import cors
const autRoutes = require('./routes/authRoutes');
const cvRoutes = require('./routes/cvRoutes');

const app = express();
app.use(cors());
dotenv.config();
app.use(express.json());

app.use('/api/auth', autRoutes);
app.use('/api/cv', cvRoutes);


mongoose.connect(process.env.MONGO_URI).then(() => 
    console.log(`MongoDB connected ${process.env.MONGO_URI}`)).catch(err => console.log(err));



const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});