const SUPABASE_URL =
"https://csrrblafrprfjydljtcv.supabase.co";


const SUPABASE_KEY =
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNzcnJibGFmcnByZmp5ZDdsanRjdiIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzg0NjQyNjc3LCJleHAiOjIxMDAyMTg2Nzd9.vtZPw54BUV_5uCMrvJwK9irYNmUcdjK9S6Ecl3EBewU";


const client =
supabase.createClient(
SUPABASE_URL,
SUPABASE_KEY
);



document
.getElementById("rsvpForm")
.addEventListener(
"submit",
async function(e){


e.preventDefault();



const data = {


name:
document
.getElementById("name")
.value
.trim(),



phone:
document
.getElementById("phone")
.value
.trim(),



attending:
document
.getElementById("attending")
.value === "true",



adults:
Number(
document
.getElementById("adults")
.value || 0
),



children:
Number(
document
.getElementById("children")
.value || 0
),



family_members:
document
.getElementById("family_members")
.value
.trim(),



message:
document
.getElementById("message")
.value
.trim()



};




const {data:result,error}=await client
.from("guests")
.insert([data])
.select();



if(error){


console.error(error);


document
.getElementById("message")
.innerHTML =
"❌ Something went wrong. Please try again.";


return;


}



document
.getElementById("message")
.innerHTML =
"🙏 Thank you! Your RSVP has been received.";



document
.getElementById("rsvpForm")
.reset();



});