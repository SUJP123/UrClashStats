import express from "express";
import axios from 'axios';
import bodyParser from "body-parser"
import path from "path";
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = 3000;
const url = "https://api.clashroyale.com/v1/players/%23";
const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6ImRhNWQ5MWFiLTE1NDYtNDJlZi04MTkwLWIxNWI1MjM2NDg1NiIsImlhdCI6MTcxNzczNDg1NSwic3ViIjoiZGV2ZWxvcGVyL2VmOTI4NjU4LTZjNTQtMjEyMS1lMGUyLTQ3OTRmOGM2MjNjMCIsInNjb3BlcyI6WyJyb3lhbGUiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL3NpbHZlciIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyI5OS4xODUuMjM0LjYwIl0sInR5cGUiOiJjbGllbnQifV19.Gu59CAcSdw_q0dVCp3teqmG8Jwr98e8L38NXkZPgLQj7w8kIH2XBF1IIrDOQbXau9F4RSKJwCFDoSmCkNNJkdg';

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true}));

app.set('Views', path.join(__dirname, 'Views'));
app.set('view engine', 'ejs');

app.get("/", async(req, res)=> 
{
    res.render("index")
});

app.post("/generate", async(req, res) => {
    const playerTag = req.body.playerTag.toUpperCase();
    try {
        const player = await axios.get(`${url}${playerTag}`, {
            headers:
            {
                Authorization: `Bearer ${token}`
            }
        });

        const battleLog = await axios.get(`${url}${playerTag}/battlelog`, {
            headers:
            {
                Authorization: `Bearer ${token}`
            }
        });

        res.render("index", {
            playerStats:player.data,
            playerBattles:battleLog.data
        });
    }

    catch (error) {
        console.log(error.response.data)
        res.render("index",
            {
                playerTag:playerTag
            });
    }
});

app.listen(port, '0.0.0.0', () =>{
    console.log(`Serer is running on port=${port}`)
});