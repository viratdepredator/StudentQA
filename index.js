const OpenAI = require ('openai');
var bodyParser = require('body-parser');
const express=require ('express');
const app=express();

let API_KEY="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";
// console.log(API_KEY)

app.set("view engine","ejs");
app.use(express.static("./public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
let ans1=[];
var userInput="";


let ans="";
let wrd=[];

app.get('/',function(req,res){
  res.render('index',{answr:ans1[ans1.length-1]});
  // ans.push(req.body.writehere);

});

app.post("/",function (req, res) {

  // if (!Array.isArray(req.body.writehere)) {
  //   req.body.writehere = [];
  // }

  wrd.push(req.body.writehere);
  
  // res.status(200).json({ message: 'Data added successfully', data: req.body.writehere });
   
  //  console.log(ans1);
  const openai = new OpenAI({
    apiKey: API_KEY,
  });
  
  async function main(wrd) {
    console.log(wrd[wrd.length-1]);
    const chatCompletion = await openai.chat.completions.create({
      
      messages: [{ role:'user', content: String(wrd[wrd.length-1])}],
      model: 'gpt-3.5-turbo',
    });
    ans1.push(chatCompletion.choices[0].message.content);
    console.log(chatCompletion.choices[0].message.content);
  }
  console.log(wrd);
  if(userInput!=null){
    main(wrd);
  }
  res.render('index',{answr:ans1[ans1.length-1]})
});




app.listen(1409,function(){
    console.log("Your engine is started");
});

