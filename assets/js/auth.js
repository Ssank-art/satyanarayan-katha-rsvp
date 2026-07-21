const SUPABASE_URL =
"https://csrrblafrprfjydljtcv.supabase.co";


const SUPABASE_KEY =
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNzcnJibGFmcnByZmp5ZGxqdGN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ2NDI2NzcsImV4cCI6MjEwMDIxODY3N30.vtZPw54BUV_5uCMrvJwK9irYNmUcdjK9S6Ecl3EBewU";



const client =
supabase.createClient(
SUPABASE_URL,
SUPABASE_KEY
);



async function login(){


const email =
document.getElementById("email").value;


const password =
document.getElementById("password").value;



const {data,error}=await client
.auth
.signInWithPassword({

email,
password

});



if(error){


document.getElementById("message")
.innerHTML=
"❌ Invalid login";


console.log(error);


}

else{


window.location.href=
"dashboard.html";


}



}