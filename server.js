/*********************************************************************************
* BTI325 – Assignment 3
* I declare that this assignment is my own work in accordance with Seneca Academic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
*
* Name: Valy Osman 
* Student ID: 184017218 
* Date: 10/30/2022
*
* Had to use cyclic, im too stupid to figure out Heroku
* https://drab-cyan-jackrabbit-shoe.cyclic.app/
*
********************************************************************************/ 


const express = require("express");
const app = express();
const path = require("path");
const data = require("./data-service");
const multer = require("multer");
const fs = require('fs');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

const HTTP_PORT = 8080;

const storage = multer.diskStorage({
  destination: 
    "./public/images/uploaded",
  filename: 
    (req, f, c) => {
      c(null
       , Date.now() + path.extname(f.originalname));
  }
});

const upload = multer({storage: storage});

let onHttpStart = () => {
  console.log("Express http server listening on: " + HTTP_PORT);
}

app.get("/", (req,res) => {
    res.sendFile(path.join(__dirname, "/views/home.html")); 
});

app.get("/about", (req,res) => {
    res.sendFile(path.join(__dirname, "/views/about.html"));
});

app.get("/employees", (req,res) => {
  if(req.query.status){
    const s= req.query.status;
    data.getEmployeesByStatus(s)
    .then((data) => { 
      res.json(data) 
    })
    .catch((err) => { 
      res.json({message: err}) 
    });
  } else if (req.query.department){
    const d = req.query.department;
    data.getEmployeesByDepartment(d)
    .then((data) => { 
      res.json(data) 
    })
    .catch((err) => { 
      res.json({message: err}) 
    });
  } else if (req.query.manager){
    const m = req.query.manager;
    data.getEmployeesByManager(m)
    .then((data) => { 
      res.json(data) 
    })
    .catch((err) => { 
      res.json({message: err}) 
    });
  } else {
    data.getAllEmployees()
    .then((data) => { 
      res.json(data) 
    })
    .catch((err) => { 
      res.json({message: err}) 
    });
  }
});

app.get("/departments", (req,res) => {
  data.getDepartments()
  .then((data) => { 
    res.json(data) 
  })
  .catch((err) => { 
    res.json({message: err});
  });
});

app.get("/managers", (req,res) => {
  data.getManagers()
  .then((data) => { 
    res.json(data) 
  })
  .catch((err) => { 
    res.json({message: err}); 
  });
});

app.get("/images/add", (req,res) => {
  res.sendFile(path.join(__dirname,"/views/addImage.html"));
});

app.post("/images/add", upload.single("imageFile"), (req, res) => {
  res.redirect("/images");
});

app.get("/images", (req,res) => {
  fs.readdir("./public/images/uploaded", (err, items) => {
    if(err) console.log(err);
    else {
      res.json({images: items});
    }
  });
});

app.get("/employee/:value", (req,res) => {
  const value = req.params.value;
  data.getEmployeeByNum(value)
    .then((data) => { 
      res.json(data); 
    })
    .catch((err) => { 
      res.json({message: err}); 
    });
});

app.get("/employees/add", (req,res) => {
  res.sendFile(path.join(__dirname,"/views/addEmployee.html"));
});

app.post("/employees/add", (req,res) => {
  data.addEmployee(req.body)
  .then(() => { 
    res.redirect("/employees"); 
  })
  .catch((err) => { 
    res.json({message: err});
  });
});

app.get("*", (req,res) => {
  res.send("Error 404: Page not found.");
});

data.initialize()
.then(() => {
  app.listen(HTTP_PORT, onHttpStart);
})
.catch((reason) => {
  console.log(reason);
});
