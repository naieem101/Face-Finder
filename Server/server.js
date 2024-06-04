const app = require('express')();
const cors = require("cors");
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const Clarifai = require('clarifai');
const api=new Clarifai.App({apiKey: '9b7f1f5daf1e48b3b708b959435ee03b'});

const db = require('knex')({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      port : 5432,
      user : 'postgres',
      password : '1234',
      database : 'smart-brain'
    }
  });

db.select("*").from('users').then(data=> console.log(data));
app.use(bodyParser.json());
app.use(cors());
var users = [
    {name: "Adam Black", email: "ablack@gmail.com", id: "r124", password: '1234'},
    {name: "David Black", email: "db@gmail.com", id: "q123", password: '1234'},
    {name: "John Roofs", email: "johnroofs@gmail.com", id: "r125", password: '1234'}
]

app.get('/', (req,res)=>{
    res.send(users);
})

app.post('/home', (req,res)=>{
    console.log(req.body)
    const {email, password} = req.body;
    db.transaction(trx => {
        return trx("login").where("email", email)
        .then((loginAry) => {
            const loginHash = loginAry[0].hash
            const loginEmail = loginAry[0].email
            if(bcrypt.compareSync(password, loginHash))
                return trx('users').where("email", loginEmail)
                .then(userDetail => res.json(userDetail[0].id) )
                .catch((error) => {throw error})
            else 
                res.status(400).json("wrong password")
        })
        .then(trx.commit)
        .catch((e) =>{
            trx.rollback
            throw e
        })
    })
    .catch((e) => {res.status(400).json("unable to login")})
})
app.post('/Register',(req,res)=>{
    const {name, email, password} = req.body;
    db.transaction( trx =>{

        return trx("login").insert({ email: email, hash: bcrypt.hashSync(password,10)})
        .then( ()=>{
            return trx("users").insert({name:name, email:email, joined: new Date()})
            .returning('id')
            .then(userId => res.json(userId[0]))
        })
        .then(trx.commit)
        .catch((e) => {
            trx.rollback
            throw e
        })
    })
    .catch(error => res.status(400).json("user exists"))

})

app.put('/image', (req,res)=>{
    const id = req.body.id;
    console.log(id);
    db('users')
    .where('id','=', id)
    .increment("entries",1)
    .returning("entries")
    .then(entries => res.json(entries.length === 0 ? "No such user" : entries))
    .catch(error => res.status(400).json("Error in updating entries"));
})
app.put('/imageurl', (req,res)=>{
    api.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.url)
    .then(response => res.json(response))
    .catch(err => res.status(400).json("unable to connect to API"))
})
const a='hello';

app.listen(3000);