import express from 'express';
import orderRoutes from "./src/orderRoutes";
const app = express();
const port = process.env.APP_PORT || 3000;

app.use(express.json());
app.use('/', orderRoutes)

app.listen(port, () => {
    console.log(`Server running at port 3000: http://localhost:${ port }`);
});
