import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.static(__dirname));

app.get('/',(req,res)=> {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(3000,()=> {
    console.log('http://localhost:3000/');
});
