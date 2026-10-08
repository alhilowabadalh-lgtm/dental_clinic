const loginBox=document.getElementById("loginBox");
const dashboard=document.getElementById("dashboard");
const loginMessage=document.getElementById("loginMessage");
const appointments=document.getElementById("appointments");

document.getElementById("loginBtn").onclick=async()=>{
  loginMessage.textContent="جارٍ تسجيل الدخول...";
  const {error}=await window.supabaseClient.auth.signInWithPassword({
    email:document.getElementById("email").value,
    password:document.getElementById("password").value
  });
  if(error){loginMessage.textContent=error.message;return;}
  loginBox.hidden=true; dashboard.hidden=false; loadAppointments();
};
document.getElementById("logoutBtn").onclick=async()=>{
  await window.supabaseClient.auth.signOut();
  dashboard.hidden=true; loginBox.hidden=false;
};
document.getElementById("refreshBtn").onclick=loadAppointments;

async function loadAppointments(){
  appointments.innerHTML="<p>جارٍ تحميل المواعيد...</p>";
  const {data,error}=await window.supabaseClient
    .from("appointments").select("*")
    .order("appointment_date",{ascending:true})
    .order("appointment_time",{ascending:true});
  if(error){appointments.innerHTML="<p class='error'>"+error.message+"</p>";return;}
  if(!data.length){appointments.innerHTML="<p>لا توجد مواعيد.</p>";return;}
  appointments.innerHTML=data.map(a=>`
    <div class="appointment">
      <strong>${escapeHtml(a.name)}</strong><br>
      الهاتف: ${escapeHtml(a.phone)}<br>
      الموعد: ${a.appointment_date} - ${a.appointment_time}<br>
      الخدمة: ${escapeHtml(a.service||"")}<br>
      الحالة: <span class="status">${escapeHtml(a.status||"pending")}</span>
      ${a.notes?`<br>ملاحظات: ${escapeHtml(a.notes)}`:""}
      <div>
        <button onclick="setStatus('${a.id}','confirmed')">تأكيد</button>
        <button class="secondary" onclick="setStatus('${a.id}','cancelled')">إلغاء</button>
      </div>
    </div>`).join("");
}
async function setStatus(id,status){
  const {error}=await window.supabaseClient.from("appointments").update({status}).eq("id",id);
  if(error) alert(error.message); else loadAppointments();
}
function escapeHtml(v){
  return String(v??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));
}
