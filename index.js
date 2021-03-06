
const express = require("express");
const app = express();
app.use(express.json())
const data =[{
  "id": 1,
  "name": "New Todo 1"
},{
  "id": 2,
  "name": "New Todo 2"
},{
  "id": 3,
  "name": "New Todo 3"
},{
  "id": 4,
  "name": "New Todo 4"
}]

app.get('/',(req,res)=>{
        res.send('Ahmed Attalla')
    })

    app.post('/todos',(req,res)=>{
        data.push(req.body)
        res.status(204).end()
      
    })

    app.get('/todos',(req,res)=>{
        res.json(data)
    })

    app.get('/todos/:id',(req,res)=>{
      const {id}= req.params
      const data2= data.find((da)=>+da.id===+id) 
      if(!data2)
      {
          res.status(404).end()
      }
      res.json(data2)
    })

    app.patch("/todos/:id", (req, res) => {
        const data_id = req.params.id;
        const data_update = req.body;
        // console.log(data_update.name);
        for (let da of data) {
          if (da.id == data_id) {
            if (data_update.name != null || undefined)
              da.name = data_update.name;
            return res
              .status(200)
              .json({ message: "Updated Succesfully", data: da });
          }
        }
        res.status(404).json({ message: "Invalid Order Id" });
      });

    app.delete("/todos/:id", (req, res) => {
        const data_id = req.params.id;
        for (let da of data) {
          if (da.id == data_id) {
            data.splice(data.indexOf(da), 1);
            return res.status(200).json({
              message: "Deleted Successfully"
            });
          }
        }
        res.status(404).json({ message: "Invalid Order Id" });
      });



app.listen(3000);