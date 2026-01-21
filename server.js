const express=require('express');
const connectDB=require('./config/db');
require('dotenv').config();

// Connect to database
connectDB();

const app=express();

const PORT=process.env.PORT || 3000;

app.get('/',(req,res)=>{
    res.send('API is running...');
});

if(process.env.NODE_ENV==='production'){
    app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
}); 
}
    


module.exports=app;