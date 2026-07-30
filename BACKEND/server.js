const app = require('../BACKEND/src/app');

const port = process.env.port || 3000 ;

app.listen(port,() => {
    console.log("Server is listening !");
})