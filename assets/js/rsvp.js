const client=supabase.createClient(SUPABASE_URL,SUPABASE_KEY);
document.getElementById('f').addEventListener('submit',async e=>{
e.preventDefault();
await client.from('rsvp').insert({
name:name.value,
phone:phone.value
});
alert('RSVP Submitted');
});
