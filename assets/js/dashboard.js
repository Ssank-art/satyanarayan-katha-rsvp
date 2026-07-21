const SUPABASE_URL =
"https://csrrblafrprfjydljtcv.supabase.co";


const SUPABASE_KEY =
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNzcnJibGFmcnByZmp5ZGxqdGN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ2NDI2NzcsImV4cCI6MjEwMDIxODY3N30.vtZPw54BUV_5uCMrvJwK9irYNmUcdjK9S6Ecl3EBewU";


const client =
supabase.createClient(
SUPABASE_URL,
SUPABASE_KEY
);



let guests=[];



async function loadGuests(){


const {data,error}=await client

.from("guests")

.select("*")

.order(
"created_at",
{
ascending:false
}
);



if(error){

console.log(error);
return;

}



guests=data;


displayGuests(data);


}



function displayGuests(list){


const tbody=
document.querySelector(
"#guestTable tbody"
);



tbody.innerHTML="";



let total=0;



list.forEach(g=>{


total += g.guests;



tbody.innerHTML += `


<tr>

<td>${g.name}</td>

<td>${g.phone || "-"}</td>

<td>${g.guests}</td>

<td>
${g.attending ? "✅ Yes":"❌ No"}
</td>


</tr>


`;


});



document
.getElementById("summary")
.innerHTML=

`
Responses: ${list.length}
 |
 Guests: ${total}
`;



}




function filterGuests(){


const value=
document
.getElementById("search")
.value
.toLowerCase();



const filtered=
guests.filter(g=>

g.name
.toLowerCase()
.includes(value)

);



displayGuests(filtered);



}





function exportCSV(){


let csv=
"Name,Phone,Guests,Attending\n";



guests.forEach(g=>{


csv +=

`${g.name},${g.phone || ""},${g.guests},${g.attending}\n`;


});



const blob =
new Blob(
[csv],
{
type:"text/csv"
}
);



const url =
URL.createObjectURL(blob);



const a =
document.createElement("a");


a.href=url;


a.download=
"satyanarayan_rsvp.csv";


a.click();


}



async function logout(){


await client.auth.signOut();


window.location.href=
"admin.html";


}




loadGuests();