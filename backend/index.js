const express = require('express')
const app = express()
const port = 3000
const users = require('./MOCK_DATA.json')
const fs = require("fs")
const cors = require('cors')

app.use(express.json());


app.use(cors({
    origin: [
        "http://localhost:5173",
    ],
    methods: ["GET", ]
}))



app.get('/api/users',(req,res)=>{
    return res.json(users)
})


app.get('/api/users/:id',(req,res)=>{
    const id = Number(req.params.id);
    console.log(id)

    const user =users.find(user=> user.id ===id) 
    return res.json(user)
})

app.post('/api/users/',(req,res)=>{
    const body = req.body;
    console.log(body)

    users.push({...body,id: users.length+1})

    fs.writeFile('./MOCK_DATA.json',JSON.stringify(users),(err)=>{
        return res.json({status:'success'})
    })
})

app.patch('/api/users/:id', (req,res) =>{
    const body = req.body;
    const id = Number(req.params.id);
    const userIndex = users.findIndex(user => user.id === id);  //triple ==== check the value and datatype either string or int
    
    users[userIndex] = {...users[userIndex],...body}
    fs.writeFile('./MOCK_DATA.json',JSON.stringify(users),(err)=>{
        return res.json({status:'success'})
    })

})
app.delete('/api/users/:id', (req,res) =>{
    const id = Number(req.params.id);

    const updatedUsers = users.filter(user => user.id !==id)
    
    fs.writeFile('./MOCK_DATA.json',JSON.stringify(updatedUsers),(err)=>{
        return res.json({status:'success'})
        })
})



app.listen(port, () =>{
     console.log(`Example app listening on port ${port}!`)
})