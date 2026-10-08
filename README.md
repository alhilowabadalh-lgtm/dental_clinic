# نظام مواعيد عيادة الأسنان

الملفات:
- index.html: صفحة حجز الموعد
- admin.html: لوحة المدير
- style.css: التصميم
- app.js: حجز المواعيد
- admin.js: إدارة المواعيد
- supabase.js: إعداد Supabase
- schema.sql: إنشاء جدول المواعيد والصلاحيات

الخطوات:
1. افتح Supabase وأنشئ المشروع.
2. افتح SQL Editor والصق محتوى schema.sql ثم نفذه.
3. من Project Settings > API خذ anon/publishable key وضعه في supabase.js.
4. أضف مكتبة Supabase JS في الصفحات أو استخدم النسخة النهائية التي سأجهزها لك.
5. أنشئ مستخدم مدير من Authentication > Users.
6. ارفع الملفات إلى Cloudflare Pages.

مهم:
لا تضع service_role key داخل الموقع.
