const form=document.getElementById("bookingForm");
const msg=document.getElementById("message");
const dateInput=document.getElementById("date");
dateInput.min=new Date().toISOString().split("T")[0];

form.addEventListener("submit", async (e)=>{
  e.preventDefault();
  msg.textContent="جارٍ إرسال الحجز...";
  msg.className="";
  try{
    if(!window.supabaseClient) throw new Error("لم يتم إعداد Supabase بعد.");
    const {error}=await window.supabaseClient.from("appointments").insert([{
      name:document.getElementById("name").value.trim(),
      phone:document.getElementById("phone").value.trim(),
      appointment_date:document.getElementById("date").value,
      appointment_time:document.getElementById("time").value,
      service:document.getElementById("service").value,
      notes:document.getElementById("notes").value.trim(),
      status:"pending"
    }]);
    if(error) throw error;
    form.reset();
    msg.textContent="تم إرسال طلب الموعد بنجاح.";
    msg.className="success";
  }catch(err){
    console.error(err);
    msg.textContent="تعذر الحجز. تأكد من إعداد قاعدة البيانات ومفتاح Supabase.";
    msg.className="error";
  }
});
