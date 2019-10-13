const express = require('express'); // including our express server
const path = require('path');
const port = 8002; // defining my post number

const db = require('./config/mongoose');  //including my mongoose(ODM)
const Content  = require('./models/todo'); // including my models

const app = express();  // instance of express

//setting-up my view-engine
app.set('view engine','ejs'); 
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());

// including my static file
app.use(express.static('assets'));



// route for home and corresponding controller function
app.get('/',function(req,res){
   
    Content.find({},function(err,content){
        if(err){
            console.log('Error while fetching data');
            return;
        }

        console.log(content);

        return res.render('home',{
            title: "My To-Do List",
            toDo_list: content,
            // done: Done
        })

    })
});

// creating my mongodb-document by the input provided by user through form
app.post('/create_task',function(req,res){
   
    Content.create({
      task: req.body.task,
      task_type: req.body.task_type,
      dueDate: req.body.dueDate
    },function(err,newContent){
        if(err){
            console.log('Error Creating ToDoList');
            return;
        }
        return res.redirect('back');
    })
});

// Delete the corresponding document of which ids have been checked through checkbox
app.post('/select_delete',function(req,res){

  for(let i=0;i<req.body.arr.length;i++){
    // search for each 'id' and delete corresponding document from my database
    Content.findByIdAndDelete(req.body.arr[i],function(err){
        if(err){
            console.log('Error While Delete the Contact');
            return;
        }
    }); 
   }

   return res.redirect('back'); // redirect to home page
})




// Port listener function to check my server is running fine/or not
app.listen(port,function(err){
    if(err){
        console.log("Error in running server",err);
    }
    console.log('Yup! My Server is running fine on port',port);
});

