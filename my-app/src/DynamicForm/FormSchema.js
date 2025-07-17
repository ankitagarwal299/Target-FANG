// src/formSchema.js
const formSchema = 
    [
        {name:'username',label:'Username',type:'text',validation:{required:true,minLength:3,maxLength:20}},

        {name:'password',label:'Password',type:'password',validation:{required:true,minLength:6}},

        {name:'email',label:'Email',type:'email',validation:{required:true,pattern:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/}},

        {name:'dob',label:'Date of Birth',type:'date',validation:{required:true,},},{name:'age',label:'Age',type:'number',validation:{required:true,min:1,max:120}},

        {name:'gender',label:'Gender',type:'select',options:['Male','Female','Other'],validation:{required:true}},

        {name:'hobbies',label:'Hobbies',type:'checkbox',options:['Reading','Traveling','Gaming'],validation:{required:true}},

        {name:'contactMethod',label:'Preferred Contact Method',type:'radio',options:['Email','Phone','Mail'],validation:{required:true}},

        {name:'bio',label:'Bio',type:'textarea',validation:{required:false}}
  ];
  
  export default formSchema;