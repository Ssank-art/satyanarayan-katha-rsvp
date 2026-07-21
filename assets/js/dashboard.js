const SUPABASE_URL =
"https://csrrblafrprfjydljtcv.supabase.co";


const SUPABASE_KEY =
"YOUR_ANON_KEY";


const client =
supabase.createClient(
SUPABASE_URL,
SUPABASE_KEY
);



let guests = [];




// Load guests

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

console.error(error);

return;

}


guests=data;


displayGuests(
guests
);


}




// Display table

function displayGuests(list){



const tbody =
document
.querySelector("#guestTable tbody");



tbody.innerHTML="";



let families=0;

let adults=0;

let children=0;



list.forEach(g=>{


families++;


if(g.attending){


adults += g.adults || 0;

children += g.children || 0;


}



tbody.innerHTML += `


<tr>


<td>
${g.name}
</td>


<td>
${g.phone || "-"}
</td>


<td>
${g.adults || 0}
</td>


<td>
${g.children || 0}
</td>


<td>

${g.attending 
? "✅ Attending"
: "❌ Not Coming"}

</td>


<td>

${g.message || "-"}

</td>



</tr>


`;


});



document
.getElementById("summary")
.innerHTML = `


<h3>

Families:
${families}

<br>

Adults:
${adults}

<br>

Children:
${children}

<br>

Total Guests:
${adults + children}


</h3>


`;



}



// Search

function filterGuests(){


const value =
document
.getElementById("search")
.value
.toLowerCase();



const filtered =
guests.filter(g =>


g.name
.toLowerCase()
.includes(value)


);



displayGuests(filtered);



}




// Export CSV

function exportCSV(){


let csv =

"Name,Phone,Adults,Children,Attending,Family Members,Message\n";



guests.forEach(g=>{


csv +=

`"${g.name}",
"${g.phone || ''}",
"${g.adults || 0}",
"${g.children || 0}",
"${g.attending ? 'Yes':'No'}",
"${g.family_members || ''}",
"${g.message || ''}"\n`;



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



const link =
document.createElement("a");


link.href=url;


link.download =
"Satyanarayan_Katha_RSVP.csv";


link.click();



}




async function logout(){


await client
.auth
.signOut();


window.location.href =
"admin.html";


}




loadGuests();