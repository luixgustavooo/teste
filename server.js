require('dotenv');
const app = require('./src/app');
const PORT = 3001;


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});