import express from "express";
import axios from 'axios';
import bodyParser from "body-parser"
const app = express();
const port = process.env.PORT || 3000;
const url = "https://api.clashroyale.com/v1/players/%23";
const token = process.env.CLASH_ROYAL_API_KEY

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true}));

app.listen(port, () =>{
    console.log(`Serer is running on port=${port}`)
});

app.set('Views', './Views');
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