const SUPABASE_URL = "https://csrrblafrprfjydljtcv.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNzcnJibGFmcnByZmp5ZGxqdGN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ2NDI2NzcsImV4cCI6MjEwMDIxODY3N30.vtZPw54BUV_5uCMrvJwK9irYNmUcdjK9S6Ecl3EBewU";

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

let guests = [];

async function protectDashboard() {
  const {
    data: { session },
    error: sessionError
  } = await client.auth.getSession();

  if (sessionError || !session) {
    window.location.href = "admin.html";
    return false;
  }

  const {
    data: { user },
    error: userError
  } = await client.auth.getUser();

  if (userError || !user) {
    await client.auth.signOut();
    window.location.href = "admin.html";
    return false;
  }

  return true;
}

async function loadGuests() {
  const { data, error } = await client
    .from("guests")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    document.getElementById("summary").innerHTML =
      "<p>Unable to load guest data.</p>";
    return;
  }

  guests = data || [];
  displayGuests(guests);
}

function displayGuests(list) {
  const tbody = document.querySelector("#guestTable tbody");
  tbody.innerHTML = "";

  let families = 0;
  let adults = 0;
  let children = 0;

  list.forEach((g) => {
    families++;

    if (g.attending) {
      adults += g.adults || 0;
      children += g.children || 0;
    }

    tbody.innerHTML += `
      <tr>
        <td>${g.name || "-"}</td>
        <td>${g.phone || "-"}</td>
        <td>${g.adults || 0}</td>
        <td>${g.children || 0}</td>
        <td>${g.attending ? "✅ Attending" : "❌ Not Coming"}</td>
        <td>${g.message || "-"}</td>
      </tr>
    `;
  });

  document.getElementById("summary").innerHTML = `
    <h3>
      Families: ${families}<br>
      Adults: ${adults}<br>
      Children: ${children}<br>
      Total Guests: ${adults + children}
    </h3>
  `;
}

function filterGuests() {
  const value = document.getElementById("search").value.toLowerCase();

  const filtered = guests.filter((g) =>
    (g.name || "").toLowerCase().includes(value)
  );

  displayGuests(filtered);
}

function exportCSV() {
  let csv = "Name,Phone,Adults,Children,Attending,Family Members,Message\n";

  guests.forEach((g) => {
    csv += `"${g.name || ""}","${g.phone || ""}","${g.adults || 0}","${g.children || 0}","${g.attending ? "Yes" : "No"}","${g.family_members || ""}","${g.message || ""}"\n`;
  });

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = "Satyanarayan_Katha_RSVP.csv";
  link.click();

  URL.revokeObjectURL(url);
}

async function logout() {
  await client.auth.signOut();
  window.location.href = "admin.html";
}

client.auth.onAuthStateChange((event) => {
  if (event === "SIGNED_OUT") {
    window.location.href = "admin.html";
  }
});

(async function initDashboard() {
  const allowed = await protectDashboard();
  if (allowed) {
    await loadGuests();
  }
})();