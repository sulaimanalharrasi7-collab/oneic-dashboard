import { useState, useRef, useCallback, useEffect, createContext, useContext } from "react";

// ══════════════════════════════════════════════════════
// TRANSLATIONS — Arabic ↔ English
// ══════════════════════════════════════════════════════
const TRANS = {
  // ── KPI / metrics ──────────────────────────────────
  "المدفوع":                   { en: "Paid" },
  "التسويات":                  { en: "Settlements" },
  "الإجمالي":                  { en: "Grand Total" },
  "المتبقي":                   { en: "Outstanding" },
  "المتبقي من المحفظة":         { en: "Outstanding from Portfolio" },
  "قيمة المحفظة":              { en: "Portfolio Value" },
  "عدد الحسابات":              { en: "No. of Accounts" },
  "قيمة الحسابات":             { en: "Account Value" },
  "نسبة الإنجاز":              { en: "Achievement Rate" },
  "نسبة الإنجاز الكلي":        { en: "Overall Achievement Rate" },
  "نسبة المساهمة في الانجاز الكلي": { en: "Contribution to Overall Achievement" },
  "حساب":                      { en: "account" },
  "دفعات":                     { en: "Payments" },
  "دفعات زائدة":               { en: "Over Recovery" },
  "خصومات أونك":               { en: "ONEIC Discounts" },
  "تسويات غمانتل":             { en: "Omantel Settlements" },
  "إجمالي المدفوع":            { en: "Total Paid" },
  "الإجمالي الكلي":             { en: "Grand Total" },
  "إجمالي التسويات":            { en: "Total Settlements" },
  "متوسط يومي":                { en: "Daily Average" },
  // ── Sections ───────────────────────────────────────
  "مكاتب أونك":                { en: "ONEIC Offices" },
  "شركات التحصيل":             { en: "Debt Collection Companies" },
  "المكتب الرئيسي":            { en: "Head Office" },
  "المحفظة":                   { en: "Portfolio" },
  // ── Entity status ──────────────────────────────────
  "🔴 مغلقة":                  { en: "🔴 Closed" },
  "🟢 نشطة":                  { en: "🟢 Active" },
  "مغلقة":                     { en: "Closed" },
  "نشطة":                      { en: "Active" },
  "لا توجد عليها مستحقات منذ بداية المشروع": { en: "No dues since project start" },
  "🔄 مبلغ الاسترجاع":         { en: "🔄 Refund Amount" },
  "مبلغ الاسترجاع المقدّر":    { en: "Estimated Refund Amount" },
  "مبلغ الاسترجاع (26% من المتبقي)": { en: "Refund Amount (26% of Outstanding)" },
  "المتبقي (O/S)":             { en: "Outstanding (O/S)" },
  "لا يوجد حسابات نشطة حالياً": { en: "No active accounts currently" },
  // ── Collector/region labels ────────────────────────
  "المحصّل":                   { en: "Collector" },
  "المحصّلون":                 { en: "Collectors" },
  "المنطقة":                   { en: "Region" },
  "الفرع":                     { en: "Branch" },
  "نسبة إنجاز":                { en: "Achievement" },
  "محصّل":                     { en: "collector" },
  "متبقي":                     { en: "outstanding" },
  // ── Buttons ────────────────────────────────────────
  "طباعة / PDF":               { en: "Print / PDF" },
  "طباعة PDF":                 { en: "Print PDF" },
  "PDF":                       { en: "PDF" },
  "تصدير PDF":                 { en: "Export PDF" },
  "تحليل":                     { en: "Analytics" },
  "التحليل البياني":            { en: "Analytics" },
  "عدد الملفات":               { en: "File Count" },
  // ── Header ─────────────────────────────────────────
  "آخر تحديث للملف":           { en: "Last file update" },
  "تاريخ الطباعة":             { en: "Print date" },
  // ── Table headers ──────────────────────────────────
  "التاريخ":                   { en: "Date" },
  "التقدم":                    { en: "Progress" },
  "المبلغ":                    { en: "Amount" },
  "عدد":                       { en: "Count" },
  "أيام نشطة":                 { en: "Active Days" },
  "يوم":                       { en: "day" },
  "سجل":                       { en: "record" },
  "توزيع المدفوعات حسب المنطقة": { en: "Payment Distribution by Region" },
  "توزيع المدفوعات بالنسبة المئوية": { en: "Payment Distribution %" },
  "سيُحفظ كل يوم ترفع فيه ملفاً في السجل التاريخي تلقائياً": { en: "Each uploaded file will be saved in the history log automatically" },
  // ── Print section titles ───────────────────────────
  "💰 المدفوع":                { en: "💰 Paid" },
  "📊 التسويات":               { en: "📊 Settlements" },
  "🏆 الإجمالي":               { en: "🏆 Grand Total" },
  "📈 متوسط يومي":             { en: "📈 Daily Average" },
  "💰 إجمالي المدفوع":         { en: "💰 Total Paid" },
  "📊 إجمالي التسويات":        { en: "📊 Total Settlements" },
  "🏆 الإجمالي الكلي":         { en: "🏆 Grand Total" },
  "📅 أيام نشطة":              { en: "📅 Active Days" },
  "🔄 مبلغ الاسترجاع المقدّر":  { en: "🔄 Estimated Refund Amount" },
  // ── Region/section headers inline ─────────────────
  "إجمالي":                    { en: "Total" },
  // ── Additional ─────────────────────────────────────
"التحصيل":                   { en: "Collection" },
  "📋 المحفظة":                { en: "📋 Portfolio" },
  "💰 التحصيل":                { en: "💰 Collection" },
  "الإجمالي المحصّل":           { en: "Total Collected" },
  "محصّل:":                    { en: "paid:" },
  "متبقي:":                    { en: "outstanding:" },
  "دفعة":                      { en: "payment" },
  "حسابات غير مستحقة":         { en: "Non-due accounts" },
  "رفع Bulk Payment":          { en: "Upload Bulk Payment" },
  ".xlsx يومي":                { en: "daily .xlsx" },
  "تحديد الفترة:":             { en: "Select Period:" },
  "الفترة:":                   { en: "Period:" },
  "من يوم:":                   { en: "From:" },
  "إلى:":                      { en: "To:" },
  "نمو":                       { en: "growth" },
  "جاري المزامنة...":          { en: "Syncing..." },
  "محفظة عُمانتل 1":           { en: "Omantel Portfolio 1" },
  "تاريخ التقرير:":             { en: "Report date:" },
  "تاريخ الطباعة:":             { en: "Print date:" },
  "الشركة":                    { en: "Company" },
  "القسم":                     { en: "Department" },
  "نسبة إنجاز:":               { en: "Achievement:" },
  "المدفوع:":                  { en: "Paid:" },
  "التسويات:":                 { en: "Settlements:" },
  "مدفوع:":                    { en: "paid:" },
  "تسويات:":                   { en: "settlements:" },
  "أعلى:":                     { en: "Peak:" },
  "دفعة":                      { en: "payment" },
  "🎊 تهانينا لفريق ONEIC بأكمله! 🎊": { en: "🎊 Congratulations to the entire ONEIC team! 🎊" },
  // ── inline ────────────────────────────────────────
  "🗓 الفترة:": { en: "🗓 Period:" },
  "📅 من يوم:": { en: "📅 From:" },
  "من:": { en: "From:" },
  "📅 تحديد الفترة:": { en: "📅 Select Period:" },
  "✕ إلغاء الاختيار": { en: "✕ Clear Selection" },
  "🖨️ تصدير PDF": { en: "🖨️ Export PDF" },
  "📂 تأكيد رفع الملف": { en: "📂 Confirm File Upload" },
  "✅ تأكيد الحفظ": { en: "✅ Confirm Save" },
  "❌ إلغاء": { en: "❌ Cancel" },
  "⏳ جاري التحليل...": { en: "⏳ Analyzing..." },
  "✅ تم التحديث": { en: "✅ Updated" },
  "رفع ملف يومي": { en: "Upload Daily File" },
  "يستبدل البيانات تلقائياً": { en: "Replaces data automatically" },
  "السجل التاريخي": { en: "Historical Records" },
  // ── comprehensive ──────────────────────────────
  "لا توجد حركات": { en: "No activity" },
  "من المحفظة": { en: "of Portfolio" },
  "🎯 نسبة الإنجاز من المحفظة": { en: "🎯 Achievement Rate from Portfolio" },
  "نسبة الإنجاز من المحفظة": { en: "Achievement Rate from Portfolio" },
  "👥 المحصّلون": { en: "👥 Collectors" },
  "محصّل نشط": { en: "active collector" },
  "من إجمالي الأيام": { en: "of total days" },
  "لوحة التحليل البياني": { en: "Analytics Dashboard" },
  "كل السنوات": { en: "All Years" },
  "كل الأشهر": { en: "All Months" },
  "هذا الشهر": { en: "This Month" },
  "هذه السنة": { en: "This Year" },
  "الكل": { en: "All" },
  "✕ مسح": { en: "✕ Clear" },
  "✕ مسح الفلتر": { en: "✕ Clear Filter" },
  "اضغط على أي يوم لعرض تفاصيله الكاملة 👇": { en: "Click any day to view its full details 👇" },
  "منطقة": { en: "region" },
  "شركة": { en: "company" },
  "📊 توزيع المدفوعات بالنسبة المئوية": { en: "📊 Payment Distribution %" },
  "مؤشرات الأداء الرئيسية — KPIs": { en: "Key Performance Indicators — KPIs" },
  "المتوسط اليومي": { en: "Daily Average" },
  "عدد المحصّلين": { en: "No. of Collectors" },
  "إجمالي الدفعات": { en: "Total Payments" },
  "معدل النمو": { en: "Growth Rate" },
  "نمو إيجابي ✅": { en: "Positive Growth ✅" },
  "تراجع ⚠️": { en: "Decline ⚠️" },
  "أيام في الفترة": { en: "Days in Period" },
  "إجمالي الفترة": { en: "Period Total" },
  "📅 اليوم الأول": { en: "📅 First Day" },
  "📅 اليوم الثاني": { en: "📅 Second Day" },
  "البيان": { en: "Item" },
  "الفرق": { en: "Difference" },
  "لا يوجد سجل تاريخي بعد": { en: "No historical records yet" },
  "ارفع ملف Excel وأكّد البيانات": { en: "Upload an Excel file and confirm the data" },
  "تحتاج يومين على الأقل للمقارنة": { en: "Need at least 2 days to compare" },
  "ارفع ملف يوم آخر وسيظهر خيار المقارنة تلقائياً": { en: "Upload another day and compare option will appear" },
  "يوم واحد في السجل": { en: "One day in records" },
  "الرسم البياني يحتاج عدة أيام محفوظة": { en: "Chart needs several saved days" },
  "ارفع ملفاً كل يوم وسيبني الرسم البياني تلقائياً": { en: "Upload daily and the chart will build automatically" },
  "اليوم المحفوظ الأول": { en: "First saved day" },
  "مسح البيانات": { en: "Clear Data" },
  "🗑 مسح": { en: "🗑 Clear" },
  "هل تريد مسح كل بيانات Bulk Payment والبدء من جديد؟": { en: "Clear all Bulk Payment data and start over?" },
  "📋 السجل": { en: "📋 Records" },
  "⚖️ مقارنة": { en: "⚖️ Compare" },
  "📊 رسم بياني": { en: "📊 Chart" },
  "📅 يومي": { en: "📅 Daily" },
  "🗺 المناطق": { en: "🗺 Regions" },
  "👤 المحصّلون": { en: "👤 Collectors" },
  "📋 الدفعات": { en: "📋 Payments" },
  "📈 الاتجاه اليومي": { en: "📈 Daily Trend" },
  "🏆 المحصّلون": { en: "🏆 Collectors" },
  "📊 المؤشرات": { en: "📊 KPIs" },
  "⬆️ أعلى يوم": { en: "⬆️ Peak Day" },
  "📉 أدنى يوم": { en: "📉 Lowest Day" },
  "🏆 أفضل يوم": { en: "🏆 Best Day" },
  "🏆 أعلى يوم": { en: "🏆 Peak Day" },
  "📈 المتوسط": { en: "📈 Average" },
  "🥈 ثانٍ": { en: "🥈 2nd" },
  "🥇 أول": { en: "🥇 1st" },
  "🥉 ثالث": { en: "🥉 3rd" },
  "📋 عدد السجلات": { en: "📋 Record Count" },
  "لوحة تحكم إدارة تحصيل الديون": { en: "Debt Collection Management Dashboard" },
  "إدارة الديون": { en: "Debt Management" },
  "متصل بالسيرفر": { en: "Connected to server" },
  "اضغط للتحديث الفوري": { en: "Click for immediate sync" },
  "⏳ اضغط للتحديث": { en: "⏳ Click to refresh" },
  "إنجاز": { en: "Achievement" },
  "إنجاز:": { en: "Achievement:" },
  "🔒 كلمة المرور": { en: "🔒 Password" },
  "أدخل كلمة المرور...": { en: "Enter password..." },
  "❌ كلمة المرور غير صحيحة، حاول مرة أخرى": { en: "❌ Incorrect password, try again" },
  "🔓 دخول": { en: "🔓 Login" },
  "ONEIC — نظام إدارة تحصيل الديون © 2026": { en: "ONEIC — Debt Collection System © 2026" },
  "تأكيد الصلاحية": { en: "Confirm Authorization" },
  "أدخل كلمة المرور الخاصة برفع الملفات": { en: "Enter the file upload password" },
  "كلمة المرور...": { en: "Password..." },
  "❌ كلمة المرور غير صحيحة": { en: "❌ Incorrect password" },
  "إلغاء": { en: "Cancel" },
  "🔓 تأكيد": { en: "🔓 Confirm" },
  "⚙️ إعدادات المزامنة": { en: "⚙️ Sync Settings" },
  "البيانات محفوظة في Supabase — تظهر على جميع الأجهزة تلقائياً ✅": { en: "Data saved in Supabase — appears on all devices automatically ✅" },
  "مثال: 64abc123...": { en: "Example: 64abc123..." },
  "✅ حفظ الإعدادات": { en: "✅ Save Settings" },
  "محفوظ على السيرفر": { en: "Saved to server" },
  "تسويات عُمانتل": { en: "Omantel Settlements" },
  "دفعات زائدة (Over Recovery)": { en: "Over Recovery" },
  "🎯 نسبة الإنجاز الكلي من المحفظة": { en: "🎯 Overall Achievement Rate from Portfolio" },
  "🗺 مكاتب أونك": { en: "🗺 ONEIC Offices" },
  "🏢 شركات التحصيل": { en: "🏢 Debt Collection Companies" },
  "🏛 المكتب الرئيسي": { en: "🏛 Head Office" },
  "تقرير ONEIC": { en: "ONEIC Report" },
  "📊 تقرير التحليل البياني": { en: "📊 Analytics Report" },
  "تفصيل الأيام": { en: "Daily Detail" },
  "التوزيع بالمنطقة": { en: "Regional Distribution" },
  "أعلى المحصّلين": { en: "Top Collectors" },
  "تقرير التحليل —": { en: "Analytics Report —" },
  "🖨️ طباعة / PDF": { en: "🖨️ Print / PDF" },
  "ONEIC — تقرير التحليل البياني": { en: "ONEIC — Analytics Report" },
  "الدفعات اليومية — من": { en: "Daily Payments — from" },
  "📈 الدفعات اليومية —": { en: "📈 Daily Payments —" },
  "ONEIC — لوحة تحكم إدارة تحصيل الديون © 2026": { en: "ONEIC — Debt Collection Dashboard © 2026" },
  "المحصلون": { en: "Collectors" },
  "🔴 غير نشطة": { en: "🔴 Inactive" },
  "الباطنة الشمالية والجنوبية": { en: "South and North Al Batinah" },
  "الشرقية الشمالية والجنوبية والوسطى": { en: "North and South Al Shaurqiah and Al Wasatah" },
  "مسقط والداخلية": { en: "MUSCAT AND AL DAKHILIYAH" },
  "مسندم، البريمي والظاهرة": { en: "Musandam, Al Burimai and Al Dahirah" },
  "ظفار": { en: "Dhofar" },
  "الباطنة": { en: "Al Batinah" },
  "الشرقية والوسطى": { en: "Al Shaurqiah & Al Wasatah" },
  "مسندم والبريمي": { en: "Musandam" },
  "خلال الفترة": { en: "During Period" },
};

// Language Context
const LangContext = createContext({ lang: 'ar', setLang: () => {} });
const useLang = () => useContext(LangContext);
// t(key, lang) — returns Arabic text in AR mode, English translation in EN mode
const t = (key, lang) => (lang === 'en' && TRANS[key]) ? TRANS[key].en : key;


const LOGO = "data:image/png;base64,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";

const SEED = {
  uploadDate: "2026-05-28",
  totalRecords: 47963,
  regions: [
    {
      id: "dhofar",
      nameAr: "ظفار",
      nameEn: "Dhofar",
      paid: 1258.225, adj: 1200.858, portAmt: 1946.119, portCnt: 25,
      collectors: [
        { name: "Hussein Abdul Muttalib", paid: 1258.225, adj: 1200.858 }
      ]
    },
    {
      id: "musandam",
      nameAr: "مسندم، البريمي والظاهرة",
      nameEn: "Musandam, Al Burimai and Al Dahirah",
      paid: 33513.304, adj: 4048.733, portAmt: 37449.515, portCnt: 491,
      collectors: [
        { name: "Fawzia Ali Al Suhi",       paid: 9588.894, adj: 1314.242 },
        { name: "Fahad Said Al Ghaiti",      paid: 9003.186, adj: 1175.042 },
        { name: "Sheikha Rashid Al Muqrshi", paid: 8068.957, adj: 582.375  },
        { name: "Alanood Ali Al Balushi",    paid: 1988.937, adj: 461.102  },
        { name: "Yaqoob Salim Al Harthy",    paid: 1773.655, adj: 0.000    },
        { name: "Wadha Al Kimzari",          paid: 1352.404, adj: 415.972  },
        { name: "Mariam Rashid Al Suhi",     paid: 1077.391, adj: 100.000  },
        { name: "Mohammed",                  paid: 431.569,  adj: 0.000    },
        { name: "Company",                   paid: 160.000,  adj: 0.000    },
        { name: "Sarah Ali Al Suhi",         paid: 68.311,   adj: 0.000    }
      ]
    },
    {
      id: "muscat",
      nameAr: "مسقط والداخلية",
      nameEn: "MUSCAT AND AL DAKHILIYAH",
      paid: 49597.968, adj: 4581.404, portAmt: 68131.760, portCnt: 1279,
      collectors: [
        { name: "Tharaya Muhanna Al-Rashdi",  paid: 5877.813, adj: 138.846 },
        { name: "Manar Nasser Al-Rawahi",     paid: 5164.179, adj: 769.390 },
        { name: "Ibtisam Al Siyabiya",        paid: 4966.515, adj: 259.708 },
        { name: "Mahmood al nabhani",         paid: 4845.539, adj: 860.481 },
        { name: "Khulood Nasser Al Kindi",    paid: 4453.248, adj: 222.068 },
        { name: "Faisal Al-Zadjali",          paid: 4259.351, adj: 95.800  },
        { name: "Badria Al-Maghribi",         paid: 4100.256, adj: 485.772 },
        { name: "Hamad Al Hinai",             paid: 3453.680, adj: 790.911 },
        { name: "Anoud Ibrahim Al Balushi",   paid: 3446.819, adj: 407.019 },
        { name: "Salwa Hamed Al-Julandani",   paid: 2675.773, adj: 182.855 },
        { name: "Nasir Sulaiman",             paid: 2286.621, adj: 0.000   },
        { name: "Sultan Hilal Al Busaidi",    paid: 1559.076, adj: 103.812 },
        { name: "Wadha Ali Al Dhali",         paid: 1177.849, adj: 0.000   },
        { name: "Abdullah Mohammed Ambusaidi",paid: 1019.960, adj: 264.742 },
        { name: "Amira Hamed",               paid: 166.111,  adj: 0.000   },
        { name: "Rehab Al-Saadi",             paid: 118.418,  adj: 0.000   },
        { name: "Asaad Nasser Al-Hadrami",    paid: 26.760,   adj: 0.000   }
      ]
    },
    {
      id: "sharqiya",
      nameAr: "الشرقية الشمالية والجنوبية والوسطى",
      nameEn: "North and South Al Shaurqiah and Al Wasatah",
      paid: 55338.005, adj: 13860.218, portAmt: 164461.982, portCnt: 2463,
      collectors: [
        { name: "Sabah Said",                paid: 13318.394, adj: 3644.907 },
        { name: "Marwa Juma Mubarak",        paid: 10015.619, adj: 1477.823 },
        { name: "Ahoud Nasser",              paid: 4937.432,  adj: 1041.718 },
        { name: "Juma Al Habsi",             paid: 4834.481,  adj: 2922.382 },
        { name: "Shima Yousuf Al Mukhaini",  paid: 2722.389,  adj: 270.712  },
        { name: "Yusra khamis Al Daoudia",   paid: 2637.009,  adj: 476.897  },
        { name: "Amira Sultan",              paid: 2578.937,  adj: 844.818  },
        { name: "Zainab Mabrouk",            paid: 2574.620,  adj: 493.689  },
        { name: "Wjdan said khamis Al alawi",paid: 2018.917,  adj: 660.801  },
        { name: "Shamsa Mohammed",           paid: 1814.271,  adj: 578.708  },
        { name: "Badar Khamis Al Malkhi",    paid: 1679.427,  adj: 246.494  },
        { name: "Ahmed Salim Al Mahruqi",    paid: 1199.212,  adj: 80.262   },
        { name: "Shiiab Al Habsi",           paid: 1181.957,  adj: 530.471  },
        { name: "Ghaliya Mubarak",           paid: 1092.878,  adj: 133.038  },
        { name: "Moza Mohammed Ali",         paid: 1089.169,  adj: 107.990  },
        { name: "Meyaad Abdullah",           paid: 1046.164,  adj: 205.029  },
        { name: "Ahmed Abdullah",            paid: 597.129,   adj: 144.479  }
      ]
    },
    {
      id: "batinah",
      nameAr: "الباطنة الشمالية والجنوبية",
      nameEn: "South and North Al Batinah",
      paid: 58118.002, adj: 14917.782, portAmt: 93541.029, portCnt: 2219,
      collectors: [
        { name: "Aida Kasaf Al Nofli",          paid: 13372.187, adj: 7098.014 },
        { name: "Mrs. Moza Khamis Al Mamari",   paid: 9876.809,  adj: 1631.711 },
        { name: "Ahmed Hassan Al Balushi",      paid: 7810.757,  adj: 1326.232 },
        { name: "Majed Ahmed alzabi",           paid: 4281.063,  adj: 1181.902 },
        { name: "Suliman mosa AL Balushi",      paid: 4270.876,  adj: 378.353  },
        { name: "Ahmed Slim Alqafri",           paid: 3752.460,  adj: 1177.450 },
        { name: "Khaled Al-Maliki",             paid: 3141.485,  adj: 427.107  },
        { name: "Faisal Saif Al Sinani",        paid: 3113.373,  adj: 459.565  },
        { name: "Fathia MohamedAldairia",       paid: 2458.690,  adj: 139.603  },
        { name: "Khamis Al Adawi",              paid: 2344.838,  adj: 518.496  },
        { name: "Iman Al-Abbadi",               paid: 733.887,   adj: 200.960  },
        { name: "Fatima Al-Hanai",              paid: 420.766,   adj: 106.441  },
        { name: "Samia Al-Awfiya",              paid: 305.722,   adj: 0.000    },
        { name: "Mohammed Ali",                 paid: 304.259,   adj: 32.465   },
        { name: "Ahmed Mohammed Al-Shakili",    paid: 269.051,   adj: 177.689  },
        { name: "Hamid Al-Sanani",              paid: 231.071,   adj: 0.000    },
        { name: "Khaled Al-Hadwani",            paid: 201.641,   adj: 0.000    },
        { name: "Abdul Mutalib Darwish",        paid: 167.737,   adj: 0.000    },
        { name: "Fatima Al Kaabiya",            paid: 128.935,   adj: 0.000    },
        { name: "Adnan Al Mayasi",              paid: 125.446,   adj: 0.290    },
        { name: "Amana Al-Sharqiya",            paid: 120.197,   adj: 0.000    },
        { name: "Mahfouza Al-Awfiya",           paid: 92.486,    adj: 0.000    },
        { name: "Zahra Al-Alawi",               paid: 88.211,    adj: 0.000    },
        { name: "Wafaa Al-Sulaymieh",           paid: 81.760,    adj: 0.000    },
        { name: "Tareq Al-Shiyadi",             paid: 69.380,    adj: 0.000    },
        { name: "Aisha Al-Tawbiya",             paid: 54.107,    adj: 17.290   },
        { name: "Ahmed Al Balushi",             paid: 51.225,    adj: 0.000    },
        { name: "Fatima Al-Khaziriya",          paid: 43.114,    adj: 0.000    },
        { name: "sadika Al-Aajmi",              paid: 41.589,    adj: 26.345   },
        { name: "Naji Al-Shibli",               paid: 40.939,    adj: 17.869   },
        { name: "Fatima Al Muqbali",            paid: 38.166,    adj: 0.000    },
        { name: "Mohammed Al Balushi",          paid: 33.458,    adj: 0.000    },
        { name: "Ahmed Al-Khazimi",             paid: 25.002,    adj: 0.000    },
        { name: "Asmahan Al-Saidiyya",          paid: 14.715,    adj: 0.000    },
        { name: "Halima Al Balushi",            paid: 12.600,    adj: 0.000    },
        { name: "Afrah Al-Darmakiah",           paid: 0.000,     adj: 0.000    },
        { name: "Ali Al-Ajmi",                  paid: 0.000,     adj: 0.000    }
      ]
    }
  ],
  debtCompanies: [
    { name: "Ejada",                         paid: 0.000,       adj: 0.000,       portAmt: 0,           portCnt: 1938  },
    { name: "Matrix Debt Collection",        paid: 169090.790,  adj: 29481.071,   portAmt: 2882018.894, portCnt: 23398 },
    { name: "Compass Risk Support Services", paid: 113050.394,  adj: 0.000,       portAmt: 386199.737,  portCnt: 3992  },
    { name: "National Center",               paid: 133891.609,  adj: 3174.667,    portAmt: 1014744.033, portCnt: 6741  },
    { name: "Tahseel United",                paid: 0.000,       adj: 0.000,       portAmt: 0, principalAmt: 0,    portCnt: 108   },
    { name: "High Speed Company",            paid: 0.000,       adj: 0.000,       portAmt: 0, principalAmt: 0,    portCnt: 35    }],
  headOffice: [
    { name: "Legal - DR. Sarhaan", paid: 46866.090, adj: 14781.368, portAmt: 3229651.681, portCnt: 3691, closed:67, active:3624, principalAmt: 3301711.348 },
    { name: "Documentation- Omantel",  paid: 1915.939,  adj: 3468.859,  portAmt: 471756.070,  portCnt: 1099, closed:8, active:1091 },
    { name: "Non-due accounts",                   paid: 0.000,     adj: 0.000,     portAmt: 0,           portCnt: 340  },
    { name: "Legal -Oneic",           paid:0, adj:0, portAmt:64528.164, portCnt:144, closed:3, active:141  },
    { name: "Refund - before legal",  paid:0, adj:0, portAmt:0, portCnt:0, count:0, closed:0, active:0 },
    { name: "Refund - after legal",   paid:0, adj:0, portAmt:0, portCnt:0, count:0, closed:0, active:0 }
  ],
  totalPortfolio: { amt: 0, cnt: 0, outstanding: 0 },
  totalCollection: { paid: 863165.364, adj: 128508.848 }
};

// ── Bulk Payment Seed Data ────────────────────────────────────────────────────
const BULK_SEED = {
  fileName: "bulk_payment_report_2026-05.xlsx",
  dateRange: { from: "2026-05-01", to: "2026-05-24" },
  totalPaid: 36156.054,
  totalAdj: 0.000,
  totalRecords: 486,
  daily: [
    {date:"2026-05-01",paid:375.490,adj:0,count:11},
    {date:"2026-05-02",paid:529.832,adj:0,count:16},
    {date:"2026-05-03",paid:2405.253,adj:0,count:27},
    {date:"2026-05-04",paid:2356.088,adj:0,count:21},
    {date:"2026-05-05",paid:578.759,adj:0,count:18},
    {date:"2026-05-06",paid:2308.979,adj:0,count:25},
    {date:"2026-05-07",paid:1268.413,adj:0,count:15},
    {date:"2026-05-08",paid:112.585,adj:0,count:7},
    {date:"2026-05-09",paid:25.645,adj:0,count:2},
    {date:"2026-05-10",paid:2239.500,adj:0,count:14},
    {date:"2026-05-11",paid:3390.527,adj:0,count:17},
    {date:"2026-05-12",paid:1242.560,adj:0,count:23},
    {date:"2026-05-13",paid:716.418,adj:0,count:15},
    {date:"2026-05-14",paid:2732.886,adj:0,count:20},
    {date:"2026-05-15",paid:220.316,adj:0,count:2},
    {date:"2026-05-16",paid:180.365,adj:0,count:4},
    {date:"2026-05-17",paid:1621.384,adj:0,count:15},
    {date:"2026-05-18",paid:1782.205,adj:0,count:23},
    {date:"2026-05-19",paid:2441.317,adj:0,count:19},
    {date:"2026-05-20",paid:1157.574,adj:0,count:23},
    {date:"2026-05-21",paid:2025.546,adj:0,count:67},
    {date:"2026-05-22",paid:1198.455,adj:0,count:27},
    {date:"2026-05-23",paid:765.859,adj:0,count:16},
    {date:"2026-05-24",paid:4480.098,adj:0,count:59}
  ],
  byRegion: [
    {nameAr:"شركات التحصيل", nameEn:"Debt Collection Company", paid:16844.643, adj:0, count:317, color:"#1a7a6b"},
    {nameAr:"المكتب الرئيسي", nameEn:"Head Office", paid:16170.181, adj:0, count:51, color:"#6c3fa0"},
    {nameAr:"مسقط والداخلية", nameEn:"MUSCAT AND AL DAKHILIYAH", paid:1258.946, adj:0, count:47, color:"#e85d20"},
    {nameAr:"الشرقية والوسطى", nameEn:"N&S Al Sharqiyah", paid:1068.357, adj:0, count:34, color:"#c44b10"},
    {nameAr:"الباطنة", nameEn:"S&N Al Batinah", paid:471.536, adj:0, count:31, color:"#d4601a"},
    {nameAr:"مسندم والبريمي", nameEn:"Musandam", paid:342.391, adj:0, count:6, color:"#b03808"}
  ],
  topCollectors: [
    {name:"Legal- DR. Sarhaan", paid:16110.181, adj:0, count:48},
    {name:"Hamad3 (National Center)", paid:7724.121, adj:0, count:96},
    {name:"Matrix3", paid:2328.173, adj:0, count:53},
    {name:"Matrix5", paid:979.400, adj:0, count:16},
    {name:"Marwa Juma Mubarak", paid:558.521, adj:0, count:9},
    {name:"Abdul Aziz", paid:555.029, adj:0, count:8},
    {name:"Hamood Al-Harthyi", paid:528.988, adj:0, count:18},
    {name:"hala alamri", paid:526.853, adj:0, count:22},
    {name:"Shifa", paid:523.940, adj:0, count:10},
    {name:"Matrix1", paid:477.033, adj:0, count:9}
  ],
  dailyDetail: {
  "2026-05-01": [
    {
      "collector": "Legal- DR. Sarhaan",
      "region": "Legal",
      "branch": "Al-Khuwair",
      "paid": 178.17,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "SAIF KHALIFA AAL ABDULSALAM",
          "agreementNo": "113415163",
          "paid": 178.17,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Legal- DR. Sarhaan",
      "region": "Head Office",
      "branch": "Al-Khuwair",
      "paid": 53.0,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "MAZIN SALIM TABOOK",
          "agreementNo": "113033849",
          "paid": 53.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Hamood Al-Harthyi",
      "region": "Debt Collection Company",
      "branch": "Matrix Debt Collection",
      "paid": 30.0,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "abdul rahman said al mandhari",
          "agreementNo": "114508630",
          "paid": 30.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "nan",
      "region": "Head Office",
      "branch": "Al-Khuwair",
      "paid": 30.0,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "ADAM HUMAID HAMDOON AL RASHDI",
          "agreementNo": "114122258",
          "paid": 30.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Iman",
      "region": "Debt Collection Company",
      "branch": "Compass Risk Support Services",
      "paid": 20.0,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "SALIM SHANNAN AL-OBEIDANI",
          "agreementNo": "67015104",
          "paid": 20.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Maryam Rashid",
      "region": "Debt Collection Company",
      "branch": "Compass Risk Support Services",
      "paid": 20.0,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "MOHAMMED AHMED AMOOSH",
          "agreementNo": "46343271",
          "paid": 20.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Matrix3",
      "region": "Debt Collection Company",
      "branch": "Matrix Debt Collection",
      "paid": 10.0,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "Mr. rashad hamed mohameed al manthri",
          "agreementNo": "104681354",
          "paid": 10.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Tharaya Muhanna Al-Rashdi",
      "region": "MUSCAT AND AL DAKHILIYAH",
      "branch": "Izki",
      "paid": 10.0,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "AHMED NASSER ALZHIMI",
          "agreementNo": "7126542",
          "paid": 10.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Ahmed Hassan Al Balushi",
      "region": "South and North Al Batinah",
      "branch": "liwa",
      "paid": 10.0,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "majid salim aldhuhli",
          "agreementNo": "104552025",
          "paid": 10.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Rayan",
      "region": "Debt Collection Company",
      "branch": "Compass Risk Support Services",
      "paid": 10.0,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "BADAR SALIM AL RAISI",
          "agreementNo": "41577061",
          "paid": 10.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "hala alamri",
      "region": "Debt Collection Company",
      "branch": "Matrix Debt Collection",
      "paid": 4.32,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "SALIM ABDULLAH ALGHAZILI",
          "agreementNo": "61171049",
          "paid": 4.32,
          "adj": 0.0
        }
      ]
    }
  ],
  "2026-05-02": [
    {
      "collector": "hala alamri",
      "region": "Debt Collection Company",
      "branch": "Matrix Debt Collection",
      "paid": 155.0,
      "adj": 0.0,
      "count": 3,
      "debtors": [
        {
          "name": "fahad sultan alabri",
          "agreementNo": "113627452",
          "paid": 100.0,
          "adj": 0.0
        },
        {
          "name": "FAHAD ALI AL DHOWIYANI",
          "agreementNo": "68826576",
          "paid": 50.0,
          "adj": 0.0
        },
        {
          "name": "MOHAMMED ABDULLAH AL",
          "agreementNo": "116754242",
          "paid": 5.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Maryam Rashid",
      "region": "Debt Collection Company",
      "branch": "Compass Risk Support Services",
      "paid": 127.295,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "MOZA MOHAMMED ALmushaikhia",
          "agreementNo": "116363058",
          "paid": 127.295,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Marwa Juma Mubarak",
      "region": "North and South Al Shaurqiah and Al Wasatah",
      "branch": "Musirah",
      "paid": 73.0,
      "adj": 0.0,
      "count": 2,
      "debtors": [
        {
          "name": "Eman Mohammed Albuhsai",
          "agreementNo": "109873683",
          "paid": 48.0,
          "adj": 0.0
        },
        {
          "name": "ANOUD MOHAMMED AL-JAAFARI",
          "agreementNo": "97351568",
          "paid": 25.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Balqees Abdullah",
      "region": "Debt Collection Company",
      "branch": "Matrix Debt Collection",
      "paid": 55.0,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "SAJIDA  JABEEN",
          "agreementNo": "116300930",
          "paid": 55.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Hamood Al-Harthyi",
      "region": "Debt Collection Company",
      "branch": "Matrix Debt Collection",
      "paid": 52.0,
      "adj": 0.0,
      "count": 2,
      "debtors": [
        {
          "name": "JAIFAR NASSER MUGHAIZAWI",
          "agreementNo": "112495990",
          "paid": 50.0,
          "adj": 0.0
        },
        {
          "name": "BASHAAR ALI AL",
          "agreementNo": "114165427",
          "paid": 2.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Legal- DR. Sarhaan",
      "region": "Head Office",
      "branch": "Al-Khuwair",
      "paid": 21.5,
      "adj": 0.0,
      "count": 2,
      "debtors": [
        {
          "name": "ahmed saed al junaibi",
          "agreementNo": "52022833",
          "paid": 1.5,
          "adj": 0.0
        },
        {
          "name": "ZUWAINA ABDULLAH AL HABSI",
          "agreementNo": "63887563",
          "paid": 20.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Khulood Nasser Al Kindi",
      "region": "MUSCAT AND AL DAKHILIYAH",
      "branch": "Nizwa",
      "paid": 14.545,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "SALEH KHADOUM AL BREIKI",
          "agreementNo": "112772390",
          "paid": 14.545,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Khamis Al Adawi",
      "region": "South and North Al Batinah",
      "branch": "Nakhel",
      "paid": 10.492,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "ADNAN HUMAID AL HINDASI",
          "agreementNo": "65251647",
          "paid": 10.492,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Shamsa Mohammed",
      "region": "North and South Al Shaurqiah and Al Wasatah",
      "branch": "JALAN Bu Hasan",
      "paid": 10.0,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "Khalid Hamdan Al Hamdan",
          "agreementNo": "6289198",
          "paid": 10.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Sabah Said",
      "region": "North and South Al Shaurqiah and Al Wasatah",
      "branch": "JALAN Bu Ali",
      "paid": 10.0,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "ALI KHAMIS AL-JUNAIBI",
          "agreementNo": "112490281",
          "paid": 10.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Mrs. Moza Khamis Al Mamari",
      "region": "South and North Al Batinah",
      "branch": "Shinas",
      "paid": 1.0,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "SALIM AL SALIM AL MAWALI",
          "agreementNo": "114222599",
          "paid": 1.0,
          "adj": 0.0
        }
      ]
    }
  ],
  "2026-05-03": [
    {
      "collector": "Legal- DR. Sarhaan",
      "region": "Head Office",
      "branch": "Al-Khuwair",
      "paid": 1575.17,
      "adj": 0.0,
      "count": 4,
      "debtors": [
        {
          "name": "SAMI AHMED AL SHANFARI",
          "agreementNo": "9365102",
          "paid": 90.0,
          "adj": 0.0
        },
        {
          "name": "مؤسسة أبو مالك لتدقيق الحسابات",
          "agreementNo": "108970231",
          "paid": 100.0,
          "adj": 0.0
        },
        {
          "name": "HASSAN AHMED AL BALUSHI",
          "agreementNo": "116179673",
          "paid": 884.43,
          "adj": 0.0
        },
        {
          "name": "nan",
          "agreementNo": "103024190",
          "paid": 500.74,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Haidy",
      "region": "Debt Collection Company",
      "branch": "Compass Risk Support Services",
      "paid": 168.555,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "Abu Said In Tegrated",
          "agreementNo": "93124843",
          "paid": 168.555,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Matrix5",
      "region": "Debt Collection Company",
      "branch": "Matrix Debt Collection",
      "paid": 150.0,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "nan",
          "agreementNo": "94782210",
          "paid": 150.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Hamood Al-Harthyi",
      "region": "Debt Collection Company",
      "branch": "Matrix Debt Collection",
      "paid": 90.0,
      "adj": 0.0,
      "count": 2,
      "debtors": [
        {
          "name": "YOUSUF SULAIMAN AL ALAWI",
          "agreementNo": "12112689",
          "paid": 25.0,
          "adj": 0.0
        },
        {
          "name": "ALI HILAL AL-GAHAFFI",
          "agreementNo": "107083310",
          "paid": 65.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Sabah Said",
      "region": "North and South Al Shaurqiah and Al Wasatah",
      "branch": "JALAN Bu Ali",
      "paid": 70.0,
      "adj": 0.0,
      "count": 3,
      "debtors": [
        {
          "name": "NAEEMA KHALIFA AL MASROORI",
          "agreementNo": "104107730",
          "paid": 30.0,
          "adj": 0.0
        },
        {
          "name": "SARA SAID ABDULLAH AL SHUKAILI",
          "agreementNo": "112785049",
          "paid": 30.0,
          "adj": 0.0
        },
        {
          "name": "Said Khalifa Alkhazaai",
          "agreementNo": "111952920",
          "paid": 10.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Matrix3",
      "region": "Debt Collection Company",
      "branch": "Matrix Debt Collection",
      "paid": 62.115,
      "adj": 0.0,
      "count": 2,
      "debtors": [
        {
          "name": "abdul rahman hamib",
          "agreementNo": "115429232",
          "paid": 20.0,
          "adj": 0.0
        },
        {
          "name": "AHMED AAMIR AL",
          "agreementNo": "112236327",
          "paid": 42.115,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "hala alamri",
      "region": "Debt Collection Company",
      "branch": "Matrix Debt Collection",
      "paid": 55.413,
      "adj": 0.0,
      "count": 2,
      "debtors": [
        {
          "name": "THAYAB GHANIM JANDABALAAMRI",
          "agreementNo": "111506943",
          "paid": 45.413,
          "adj": 0.0
        },
        {
          "name": "AHMED Jamil ALGHEILANI",
          "agreementNo": "47478007",
          "paid": 10.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Omnia",
      "region": "Debt Collection Company",
      "branch": "Compass Risk Support Services",
      "paid": 45.0,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "MASOOMA VAZIR",
          "agreementNo": "102889351",
          "paid": 45.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Rayan",
      "region": "Debt Collection Company",
      "branch": "Compass Risk Support Services",
      "paid": 40.0,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "AADIL SARAID AL ATTALI",
          "agreementNo": "113466961",
          "paid": 40.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Faisal Al-Zadjali",
      "region": "MUSCAT AND AL DAKHILIYAH",
      "branch": "Al Mawaleh",
      "paid": 30.0,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "KHAIR ZAD MUSALLAM ALSARJ ALMARHOON",
          "agreementNo": "102871693",
          "paid": 30.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Aida Kasaf Al Nofli",
      "region": "South and North Al Batinah",
      "branch": "Shinas",
      "paid": 30.0,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "MOHAMMED SULAIMAN AL MAQBALI",
          "agreementNo": "115492409",
          "paid": 30.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Sultan Hilal Al Busaidi",
      "region": "MUSCAT AND AL DAKHILIYAH",
      "branch": "Nizwa",
      "paid": 22.0,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "MARYAM SAID AL",
          "agreementNo": "114300525",
          "paid": 22.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Mrs. Moza Khamis Al Mamari",
      "region": "South and North Al Batinah",
      "branch": "Shinas",
      "paid": 18.0,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "sauod abdullah al balushi",
          "agreementNo": "114877956",
          "paid": 18.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Tharaya Muhanna Al-Rashdi",
      "region": "MUSCAT AND AL DAKHILIYAH",
      "branch": "Izki",
      "paid": 15.0,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "SAID MOHAMMED AL MASHIKHI",
          "agreementNo": "68980590",
          "paid": 15.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Fawzia Ali Al Suhi",
      "region": "Musandam, Al Burimai and Al Dahirah",
      "branch": "Bakha",
      "paid": 10.0,
      "adj": 0.0,
      "count": 2,
      "debtors": [
        {
          "name": "AL MOATASEM AWAISI HADAYAN ZAYD AL-YAAQOUBI",
          "agreementNo": "106027712",
          "paid": 5.0,
          "adj": 0.0
        },
        {
          "name": "SULEMAN SULAIYAM BASHIR AL GHAFRI",
          "agreementNo": "111700140",
          "paid": 5.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Maryam Rashid",
      "region": "Debt Collection Company",
      "branch": "Compass Risk Support Services",
      "paid": 10.0,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "NASSR MOHAMMED AL",
          "agreementNo": "115284254",
          "paid": 10.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Iman Al-Abbadi",
      "region": "South and North Al Batinah",
      "branch": "Al Hwqeen",
      "paid": 10.0,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "haitham bin said al fazari",
          "agreementNo": "69773063",
          "paid": 10.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Faisal Saif Al Sinani",
      "region": "South and North Al Batinah",
      "branch": "Al-Suwaiq",
      "paid": 4.0,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "IMAN SALMEEN AL SHIBLI",
          "agreementNo": "111561097",
          "paid": 4.0,
          "adj": 0.0
        }
      ]
    }
  ],
  "2026-05-04": [
    {
      "collector": "Legal- DR. Sarhaan",
      "region": "Head Office",
      "branch": "Al-Khuwair",
      "paid": 1411.922,
      "adj": 0.0,
      "count": 5,
      "debtors": [
        {
          "name": "SAMI AHMED AL SHANFARI",
          "agreementNo": "9365102",
          "paid": 8.0,
          "adj": 0.0
        },
        {
          "name": "nan",
          "agreementNo": "102301219",
          "paid": 290.499,
          "adj": 0.0
        },
        {
          "name": "nan",
          "agreementNo": "104875410",
          "paid": 416.547,
          "adj": 0.0
        },
        {
          "name": "nan",
          "agreementNo": "102281737",
          "paid": 232.6,
          "adj": 0.0
        },
        {
          "name": "KHALID SALEH AL-KHAZIMI",
          "agreementNo": "92917343",
          "paid": 464.276,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Hamad3",
      "region": "Debt Collection Company",
      "branch": "National Center",
      "paid": 550.032,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "مؤسسة ناصر اليحيائي للتجارة والمقاولات",
          "agreementNo": "108037162",
          "paid": 550.032,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Marwa Juma Mubarak",
      "region": "North and South Al Shaurqiah and Al Wasatah",
      "branch": "Musirah",
      "paid": 55.96,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "WADAHA ALI AL MASHALI",
          "agreementNo": "106136872",
          "paid": 55.96,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Israa",
      "region": "Debt Collection Company",
      "branch": "Compass Risk Support Services",
      "paid": 53.945,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "KHAMIS HAMOOD AL HADHRAMI",
          "agreementNo": "54430203",
          "paid": 53.945,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Matrix3",
      "region": "Debt Collection Company",
      "branch": "Matrix Debt Collection",
      "paid": 50.0,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "AHMED MODHFAR ALHATTALI",
          "agreementNo": "66598291",
          "paid": 50.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Matrix1",
      "region": "Debt Collection Company",
      "branch": "Matrix Debt Collection",
      "paid": 50.0,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "0",
          "agreementNo": "109246858",
          "paid": 50.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Rasheeda",
      "region": "Debt Collection Company",
      "branch": "Matrix Debt Collection",
      "paid": 50.0,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "BADAR MUBARAK AL BALUSHI",
          "agreementNo": "70391919",
          "paid": 50.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Abdul Aziz",
      "region": "Debt Collection Company",
      "branch": "Matrix Debt Collection",
      "paid": 30.0,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "noorh ahmed al-driai",
          "agreementNo": "116857419",
          "paid": 30.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Balqees Abdullah",
      "region": "Debt Collection Company",
      "branch": "Matrix Debt Collection",
      "paid": 20.0,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "ahmed namer alhumaisi",
          "agreementNo": "116373581",
          "paid": 20.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Mrs. Moza Khamis Al Mamari",
      "region": "South and North Al Batinah",
      "branch": "Shinas",
      "paid": 20.0,
      "adj": 0.0,
      "count": 2,
      "debtors": [
        {
          "name": "HAMED SHAMIS AL OUFI",
          "agreementNo": "111684766",
          "paid": 10.0,
          "adj": 0.0
        },
        {
          "name": "Hilal Abdullah  Almakhmari",
          "agreementNo": "112069198",
          "paid": 10.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "hala alamri",
      "region": "Debt Collection Company",
      "branch": "Matrix Debt Collection",
      "paid": 20.0,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "fatima hafedh suwailam",
          "agreementNo": "96731394",
          "paid": 20.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Safiya",
      "region": "Debt Collection Company",
      "branch": "Compass Risk Support Services",
      "paid": 10.211,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "AMAL AMUR AL MUSALAMI",
          "agreementNo": "113171031",
          "paid": 10.211,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Badria Al-Maghribi",
      "region": "MUSCAT AND AL DAKHILIYAH",
      "branch": "Lizj",
      "paid": 10.0,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "YOUSUF OBAID AL",
          "agreementNo": "112479080",
          "paid": 10.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Ahmed Salim Al Mahruqi",
      "region": "North and South Al Shaurqiah and Al Wasatah",
      "branch": "Sinaw",
      "paid": 10.0,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "NAWAF HAMED HAMED AL-HAJRI",
          "agreementNo": "105891071",
          "paid": 10.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Faisal Saif Al Sinani",
      "region": "South and North Al Batinah",
      "branch": "Al-Suwaiq",
      "paid": 9.018,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "DARWISH SALEH AL AJMI",
          "agreementNo": "80052460",
          "paid": 9.018,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Omnia",
      "region": "Debt Collection Company",
      "branch": "Compass Risk Support Services",
      "paid": 5.0,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "ALI ABDULLAH AL",
          "agreementNo": "57195638",
          "paid": 5.0,
          "adj": 0.0
        }
      ]
    }
  ],
  "2026-05-05": [
    {
      "collector": "Matrix5",
      "region": "Debt Collection Company",
      "branch": "Matrix Debt Collection",
      "paid": 146.975,
      "adj": 0.0,
      "count": 2,
      "debtors": [
        {
          "name": "YAQOOB SALIM AL QASMI",
          "agreementNo": "109318729",
          "paid": 20.0,
          "adj": 0.0
        },
        {
          "name": "ali nasar hamadi",
          "agreementNo": "114196590",
          "paid": 126.975,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Legal- DR. Sarhaan",
      "region": "Head Office",
      "branch": "Al-Khuwair",
      "paid": 100.0,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "SALIM MOHAMMED AL-BARAAMI",
          "agreementNo": "29843110",
          "paid": 100.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Hamad3",
      "region": "Debt Collection Company",
      "branch": "National Center",
      "paid": 88.354,
      "adj": 0.0,
      "count": 3,
      "debtors": [
        {
          "name": "nan",
          "agreementNo": "104765884",
          "paid": 68.354,
          "adj": 0.0
        },
        {
          "name": "THURAIYA MOHAMED AL BALUSHI",
          "agreementNo": "114488370",
          "paid": 5.0,
          "adj": 0.0
        },
        {
          "name": "Mohamed Humaid Zaid Al Amri",
          "agreementNo": "109934465",
          "paid": 15.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Matrix3",
      "region": "Debt Collection Company",
      "branch": "Matrix Debt Collection",
      "paid": 70.0,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "Gamela  Amir  Al Amri",
          "agreementNo": "112796722",
          "paid": 70.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Hamood Al abri",
      "region": "Debt Collection Company",
      "branch": "Matrix Debt Collection",
      "paid": 54.885,
      "adj": 0.0,
      "count": 3,
      "debtors": [
        {
          "name": "AHMED SALIM DHISHLIL",
          "agreementNo": "116741200",
          "paid": 5.0,
          "adj": 0.0
        },
        {
          "name": "MUNTASIR MOHAMED A",
          "agreementNo": "114443210",
          "paid": 10.0,
          "adj": 0.0
        },
        {
          "name": "RIYADH KHALID SULAIMAN AL KHARUSI",
          "agreementNo": "105102441",
          "paid": 39.885,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "hala alamri",
      "region": "Debt Collection Company",
      "branch": "Matrix Debt Collection",
      "paid": 45.0,
      "adj": 0.0,
      "count": 2,
      "debtors": [
        {
          "name": "Adil Lal Bakhsh Al Raeesi",
          "agreementNo": "59985630",
          "paid": 15.0,
          "adj": 0.0
        },
        {
          "name": "suliman said alhabsi",
          "agreementNo": "111800067",
          "paid": 30.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Sultan Hilal Al Busaidi",
      "region": "MUSCAT AND AL DAKHILIYAH",
      "branch": "Nizwa",
      "paid": 37.545,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "JUMA ANWAR ALZADJALI",
          "agreementNo": "115216078",
          "paid": 37.545,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Sabah Said",
      "region": "North and South Al Shaurqiah and Al Wasatah",
      "branch": "JALAN Bu Ali",
      "paid": 10.0,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "Noof Sabil Ramadhan",
          "agreementNo": "110471106",
          "paid": 10.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Shifa",
      "region": "Debt Collection Company",
      "branch": "Compass Risk Support Services",
      "paid": 10.0,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "ABDULLAH MUBARAK TEER",
          "agreementNo": "72328903",
          "paid": 10.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Ahmed Hassan Al Balushi",
      "region": "South and North Al Batinah",
      "branch": "liwa",
      "paid": 10.0,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "KHADIJA ABDULLAH  AL BALUSHI",
          "agreementNo": "115895929",
          "paid": 10.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Hamood Al-Harthyi",
      "region": "Debt Collection Company",
      "branch": "Matrix Debt Collection",
      "paid": 3.0,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "MOHAMMED HAMDAN AL KAHHALI",
          "agreementNo": "112890714",
          "paid": 3.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Faisal Saif Al Sinani",
      "region": "South and North Al Batinah",
      "branch": "Al-Suwaiq",
      "paid": 3.0,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "FATEMA MOHAMMED AL BALUSHI",
          "agreementNo": "111632249",
          "paid": 3.0,
          "adj": 0.0
        }
      ]
    }
  ],
  "2026-05-06": [
    {
      "collector": "Legal- DR. Sarhaan",
      "region": "Head Office",
      "branch": "Al-Khuwair",
      "paid": 1219.808,
      "adj": 0.0,
      "count": 2,
      "debtors": [
        {
          "name": "Yahya Alsinawi",
          "agreementNo": "107758740",
          "paid": 1130.008,
          "adj": 0.0
        },
        {
          "name": "ahmed saed al junaibi",
          "agreementNo": "52022833",
          "paid": 89.8,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Hamad3",
      "region": "Debt Collection Company",
      "branch": "National Center",
      "paid": 539.815,
      "adj": 0.0,
      "count": 7,
      "debtors": [
        {
          "name": "Ahmed Marhoon Nasser Al Bulushi",
          "agreementNo": "109396340",
          "paid": 25.685,
          "adj": 0.0
        },
        {
          "name": "nan",
          "agreementNo": "104174869",
          "paid": 140.165,
          "adj": 0.0
        },
        {
          "name": "nan",
          "agreementNo": "98545978",
          "paid": 100.0,
          "adj": 0.0
        },
        {
          "name": "nan",
          "agreementNo": "100691353",
          "paid": 0.0,
          "adj": 0.0
        },
        {
          "name": "Khalifa Zayid Khalifa Al Shaqsei",
          "agreementNo": "109376470",
          "paid": 32.155,
          "adj": 0.0
        },
        {
          "name": "nan",
          "agreementNo": "105140521",
          "paid": 175.965,
          "adj": 0.0
        },
        {
          "name": "abdulaziz said al abdisalam",
          "agreementNo": "115333629",
          "paid": 65.845,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Abdul Aziz",
      "region": "Debt Collection Company",
      "branch": "Matrix Debt Collection",
      "paid": 195.0,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "AL-REEM MAHMOOD ALI AL MAQBALI",
          "agreementNo": "116926284",
          "paid": 195.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "OmniaH",
      "region": "Debt Collection Company",
      "branch": "Compass Risk Support Services",
      "paid": 100.0,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "Abdul Rahman Khalifa Mohammed Jahum Al Yafii",
          "agreementNo": "109439090",
          "paid": 100.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Balqees Abdullah",
      "region": "Debt Collection Company",
      "branch": "Matrix Debt Collection",
      "paid": 75.37,
      "adj": 0.0,
      "count": 2,
      "debtors": [
        {
          "name": "BAKIR WAEL SABAHI",
          "agreementNo": "118336241",
          "paid": 54.87,
          "adj": 0.0
        },
        {
          "name": "Prasanth  Pallissery",
          "agreementNo": "94468813",
          "paid": 20.5,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Faisal Al-Zadjali",
      "region": "MUSCAT AND AL DAKHILIYAH",
      "branch": "Al Mawaleh",
      "paid": 45.0,
      "adj": 0.0,
      "count": 3,
      "debtors": [
        {
          "name": "ASIM OBAID ABD HAMED AL-WAHAIBI",
          "agreementNo": "105839991",
          "paid": 5.0,
          "adj": 0.0
        },
        {
          "name": "YOUSUF ABDALLAH AL MUKHAINI",
          "agreementNo": "112832453",
          "paid": 20.0,
          "adj": 0.0
        },
        {
          "name": "Jokha Said Al mashikhi",
          "agreementNo": "105845474",
          "paid": 20.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Sabah Said",
      "region": "North and South Al Shaurqiah and Al Wasatah",
      "branch": "JALAN Bu Ali",
      "paid": 37.0,
      "adj": 0.0,
      "count": 3,
      "debtors": [
        {
          "name": "saleem juma al rasbi",
          "agreementNo": "116083153",
          "paid": 30.0,
          "adj": 0.0
        },
        {
          "name": "MAJID KHALFAN AL DUHANI",
          "agreementNo": "98837564",
          "paid": 5.0,
          "adj": 0.0
        },
        {
          "name": "BADAR MOHAMED AL MAHRIZI",
          "agreementNo": "116453977",
          "paid": 2.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Khulood Nasser Al Kindi",
      "region": "MUSCAT AND AL DAKHILIYAH",
      "branch": "Nizwa",
      "paid": 32.2,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "Shaima Badar Said Al Habsi",
          "agreementNo": "110563724",
          "paid": 32.2,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Sultan Hilal Al Busaidi",
      "region": "MUSCAT AND AL DAKHILIYAH",
      "branch": "Nizwa",
      "paid": 31.695,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "SAAD ALLAH NASSER MOHAMMED AL NABHANI",
          "agreementNo": "97949796",
          "paid": 31.695,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Tharaya Muhanna Al-Rashdi",
      "region": "MUSCAT AND AL DAKHILIYAH",
      "branch": "Izki",
      "paid": 25.82,
      "adj": 0.0,
      "count": 2,
      "debtors": [
        {
          "name": "slaim fael aluwaisi",
          "agreementNo": "115346478",
          "paid": 10.82,
          "adj": 0.0
        },
        {
          "name": "BSHAIR JUMA AL-MANDHARI",
          "agreementNo": "116011464",
          "paid": 15.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Wjdan said khamis Al alawi",
      "region": "North and South Al Shaurqiah and Al Wasatah",
      "branch": "Sur",
      "paid": 5.0,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "MOHAMMED KHAMIS AL KHAMIS",
          "agreementNo": "47052508",
          "paid": 5.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Marwa Juma Mubarak",
      "region": "North and South Al Shaurqiah and Al Wasatah",
      "branch": "Musirah",
      "paid": 2.271,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "ANOUD MOHAMMED AL-JAAFARI",
          "agreementNo": "97351568",
          "paid": 2.271,
          "adj": 0.0
        }
      ]
    }
  ],
  "2026-05-07": [
    {
      "collector": "Legal- DR. Sarhaan",
      "region": "Head Office",
      "branch": "Al-Khuwair",
      "paid": 400.111,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "nan",
          "agreementNo": "99363124",
          "paid": 400.111,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Hamad3",
      "region": "Debt Collection Company",
      "branch": "National Center",
      "paid": 338.615,
      "adj": 0.0,
      "count": 3,
      "debtors": [
        {
          "name": "Ahmed Said Nasser Al Busaidi",
          "agreementNo": "109416417",
          "paid": 140.215,
          "adj": 0.0
        },
        {
          "name": "SULTAN KHALIFA AL HINAI",
          "agreementNo": "111561310",
          "paid": 100.0,
          "adj": 0.0
        },
        {
          "name": "HAMED SALEH AL ABRI",
          "agreementNo": "101636805",
          "paid": 98.4,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Iman",
      "region": "Debt Collection Company",
      "branch": "Compass Risk Support Services",
      "paid": 207.76,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "nan",
          "agreementNo": "92580427",
          "paid": 207.76,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Balqees Abdullah",
      "region": "Debt Collection Company",
      "branch": "Matrix Debt Collection",
      "paid": 125.639,
      "adj": 0.0,
      "count": 2,
      "debtors": [
        {
          "name": "SIMON CHARLES WILSON",
          "agreementNo": "96163860",
          "paid": 39.495,
          "adj": 0.0
        },
        {
          "name": "haseeb  boota",
          "agreementNo": "96309325",
          "paid": 86.144,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Hamood Al-Harthyi",
      "region": "Debt Collection Company",
      "branch": "Matrix Debt Collection",
      "paid": 56.288,
      "adj": 0.0,
      "count": 3,
      "debtors": [
        {
          "name": "AHMED SAUD AL BUSFI",
          "agreementNo": "49729354",
          "paid": 22.34,
          "adj": 0.0
        },
        {
          "name": "TALAL ABDUL MOOSA",
          "agreementNo": "116082665",
          "paid": 23.948,
          "adj": 0.0
        },
        {
          "name": "SALEEM ALI AL GAHAFFI",
          "agreementNo": "113126270",
          "paid": 10.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Matrix5",
      "region": "Debt Collection Company",
      "branch": "Matrix Debt Collection",
      "paid": 50.0,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "JUMA SBEIT SAID MOOSA ALMUKHAINI",
          "agreementNo": "105842394",
          "paid": 50.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Ahmed Hassan Al Balushi",
      "region": "South and North Al Batinah",
      "branch": "liwa",
      "paid": 30.0,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "SAID KHALFAN AL MAAMARI",
          "agreementNo": "113409771",
          "paid": 30.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Israa",
      "region": "Debt Collection Company",
      "branch": "Compass Risk Support Services",
      "paid": 20.0,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "Salim Khalifa Al busaidi",
          "agreementNo": "111675224",
          "paid": 20.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Matrix3",
      "region": "Debt Collection Company",
      "branch": "Matrix Debt Collection",
      "paid": 20.0,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "abdallah khalfan al quraini",
          "agreementNo": "112949964",
          "paid": 20.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Yustina",
      "region": "Debt Collection Company",
      "branch": "Compass Risk Support Services",
      "paid": 20.0,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "Aiman Khalifa Khalifaal Khusaibi",
          "agreementNo": "109273990",
          "paid": 20.0,
          "adj": 0.0
        }
      ]
    }
  ],
  "2026-05-08": [
    {
      "collector": "Hamad3",
      "region": "Debt Collection Company",
      "branch": "National Center",
      "paid": 60.585,
      "adj": 0.0,
      "count": 2,
      "debtors": [
        {
          "name": "ZIYAD KHAMIS AL GHAFRI",
          "agreementNo": "116591262",
          "paid": 13.0,
          "adj": 0.0
        },
        {
          "name": "Zaher Suliman Zaher Al Subhi",
          "agreementNo": "106014500",
          "paid": 47.585,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Aida Kasaf Al Nofli",
      "region": "South and North Al Batinah",
      "branch": "Shinas",
      "paid": 20.0,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "HUDA SULEIMAN AL DARMAKI",
          "agreementNo": "64939066",
          "paid": 20.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Hamood Al-Harthyi",
      "region": "Debt Collection Company",
      "branch": "Matrix Debt Collection",
      "paid": 15.0,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "ali mubarak ahmed",
          "agreementNo": "110892940",
          "paid": 15.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Matrix3",
      "region": "Debt Collection Company",
      "branch": "Matrix Debt Collection",
      "paid": 10.0,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "Musallam Masoud Al kathiri",
          "agreementNo": "114549175",
          "paid": 10.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Sabah Said",
      "region": "North and South Al Shaurqiah and Al Wasatah",
      "branch": "JALAN Bu Ali",
      "paid": 5.0,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "Halah Salim Bait Rabia",
          "agreementNo": "112103327",
          "paid": 5.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "hala alamri",
      "region": "Debt Collection Company",
      "branch": "Matrix Debt Collection",
      "paid": 2.0,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "suliman said alhabsi",
          "agreementNo": "111800067",
          "paid": 2.0,
          "adj": 0.0
        }
      ]
    }
  ],
  "2026-05-09": [
    {
      "collector": "Rayan",
      "region": "Debt Collection Company",
      "branch": "Compass Risk Support Services",
      "paid": 20.0,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "BADAR JUMA SAIF AL MAQHUSI",
          "agreementNo": "108140600",
          "paid": 20.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Matrix3",
      "region": "Debt Collection Company",
      "branch": "Matrix Debt Collection",
      "paid": 5.645,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "ABDALAZIZ ABDULAH ALALAWI",
          "agreementNo": "59040361",
          "paid": 5.645,
          "adj": 0.0
        }
      ]
    }
  ],
  "2026-05-10": [
    {
      "collector": "Legal- DR. Sarhaan",
      "region": "Head Office",
      "branch": "Al-Khuwair",
      "paid": 1555.73,
      "adj": 0.0,
      "count": 2,
      "debtors": [
        {
          "name": "ghaliya MOHAMMED alRAWAS",
          "agreementNo": "114682677",
          "paid": 816.925,
          "adj": 0.0
        },
        {
          "name": "nan",
          "agreementNo": "102173461",
          "paid": 738.805,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Hamad3",
      "region": "Debt Collection Company",
      "branch": "National Center",
      "paid": 260.33,
      "adj": 0.0,
      "count": 2,
      "debtors": [
        {
          "name": "nan",
          "agreementNo": "98068647",
          "paid": 64.675,
          "adj": 0.0
        },
        {
          "name": "nan",
          "agreementNo": "104768356",
          "paid": 195.655,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Shifa",
      "region": "Debt Collection Company",
      "branch": "Compass Risk Support Services",
      "paid": 202.93,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "SHAHAB HAMED AL",
          "agreementNo": "118880500",
          "paid": 202.93,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Sultan Hilal Al Busaidi",
      "region": "MUSCAT AND AL DAKHILIYAH",
      "branch": "Nizwa",
      "paid": 60.0,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "hmdan amer al mashni",
          "agreementNo": "46923469",
          "paid": 60.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Matrix3",
      "region": "Debt Collection Company",
      "branch": "Matrix Debt Collection",
      "paid": 55.0,
      "adj": 0.0,
      "count": 3,
      "debtors": [
        {
          "name": "ABDALLAH SAID AL",
          "agreementNo": "115460214",
          "paid": 5.0,
          "adj": 0.0
        },
        {
          "name": "SALEH MASAAOD MASAAOD AL-SHAAIBI",
          "agreementNo": "116797228",
          "paid": 30.0,
          "adj": 0.0
        },
        {
          "name": "ALI SULAIYAM AL-HINAAI",
          "agreementNo": "114976661",
          "paid": 20.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Sabah Said",
      "region": "North and South Al Shaurqiah and Al Wasatah",
      "branch": "JALAN Bu Ali",
      "paid": 40.0,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "ANWAR HAMID QAWI AL YAFAEI",
          "agreementNo": "99316274",
          "paid": 40.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Abdul Aziz",
      "region": "Debt Collection Company",
      "branch": "Matrix Debt Collection",
      "paid": 30.535,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "noorh ahmed al-driai",
          "agreementNo": "116857419",
          "paid": 30.535,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "hala alamri",
      "region": "Debt Collection Company",
      "branch": "Matrix Debt Collection",
      "paid": 24.975,
      "adj": 0.0,
      "count": 2,
      "debtors": [
        {
          "name": "ABDULLAH MUBARK ALBLOUSHI .",
          "agreementNo": "55377257",
          "paid": 10.0,
          "adj": 0.0
        },
        {
          "name": "Nasser Masoud Al Kathiri",
          "agreementNo": "113998478",
          "paid": 14.975,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Matrix5",
      "region": "Debt Collection Company",
      "branch": "Matrix Debt Collection",
      "paid": 10.0,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "MUBARAK SALEH AL SHEHEIMI",
          "agreementNo": "113342251",
          "paid": 10.0,
          "adj": 0.0
        }
      ]
    }
  ],
  "2026-05-11": [
    {
      "collector": "Legal- DR. Sarhaan",
      "region": "Head Office",
      "branch": "Al-Khuwair",
      "paid": 2786.716,
      "adj": 0.0,
      "count": 5,
      "debtors": [
        {
          "name": "ZUWAINA ABDULLAH AL HABSI",
          "agreementNo": "63887563",
          "paid": 30.0,
          "adj": 0.0
        },
        {
          "name": "MOHAMMED HUMAID AL ALAWI",
          "agreementNo": "5502410",
          "paid": 964.605,
          "adj": 0.0
        },
        {
          "name": "مؤسسه ابراهيم بن مسلم علي زعبنوت للتجاره والمقاولات",
          "agreementNo": "91176153",
          "paid": 109.455,
          "adj": 0.0
        },
        {
          "name": "khames naser al amrei",
          "agreementNo": "115001074",
          "paid": 892.415,
          "adj": 0.0
        },
        {
          "name": "nan",
          "agreementNo": "94444845",
          "paid": 790.241,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Hamad3",
      "region": "Debt Collection Company",
      "branch": "National Center",
      "paid": 357.741,
      "adj": 0.0,
      "count": 3,
      "debtors": [
        {
          "name": "تادرس للتجارة والمقاولات",
          "agreementNo": "94522388",
          "paid": 20.0,
          "adj": 0.0
        },
        {
          "name": "مؤسسة قهوة بلدي للتجارة",
          "agreementNo": "110610209",
          "paid": 276.712,
          "adj": 0.0
        },
        {
          "name": "nan",
          "agreementNo": "100398637",
          "paid": 61.029,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Ahoud Nasser",
      "region": "North and South Al Shaurqiah and Al Wasatah",
      "branch": "Al Kamil",
      "paid": 87.57,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "ahmed saud almahrezi",
          "agreementNo": "114313180",
          "paid": 87.57,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Matrix5",
      "region": "Debt Collection Company",
      "branch": "Matrix Debt Collection",
      "paid": 60.0,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "nan",
          "agreementNo": "116467599",
          "paid": 60.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Hamood Al-Harthyi",
      "region": "Debt Collection Company",
      "branch": "Matrix Debt Collection",
      "paid": 50.0,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "ABDULLA SAID AL-RUSHEIDI",
          "agreementNo": "26497487",
          "paid": 50.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Salwa Hamed Al-Julandani",
      "region": "MUSCAT AND AL DAKHILIYAH",
      "branch": "Fanja",
      "paid": 30.0,
      "adj": 0.0,
      "count": 2,
      "debtors": [
        {
          "name": "BADRIYA MARHOON AL-HOUSNI",
          "agreementNo": "111241900",
          "paid": 20.0,
          "adj": 0.0
        },
        {
          "name": "Khames Hammad Albusaidi",
          "agreementNo": "114130048",
          "paid": 10.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Sabah Said",
      "region": "North and South Al Shaurqiah and Al Wasatah",
      "branch": "JALAN Bu Ali",
      "paid": 15.0,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "SABIH HAMID AL HARSOOSI",
          "agreementNo": "104430606",
          "paid": 15.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Yustina",
      "region": "Debt Collection Company",
      "branch": "Compass Risk Support Services",
      "paid": 2.0,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "HAMOOD RASHID AL MASKARI",
          "agreementNo": "116449949",
          "paid": 2.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Abdul Aziz",
      "region": "Debt Collection Company",
      "branch": "Matrix Debt Collection",
      "paid": 1.0,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "lobna hamood almaskari",
          "agreementNo": "116528126",
          "paid": 1.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Hamood Al abri",
      "region": "Debt Collection Company",
      "branch": "Matrix Debt Collection",
      "paid": 0.5,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "ali yasaloom oall alshahri",
          "agreementNo": "81303816",
          "paid": 0.5,
          "adj": 0.0
        }
      ]
    }
  ],
  "2026-05-12": [
    {
      "collector": "Matrix5",
      "region": "Debt Collection Company",
      "branch": "Matrix Debt Collection",
      "paid": 337.035,
      "adj": 0.0,
      "count": 3,
      "debtors": [
        {
          "name": "mazin sulaiman al hinaai",
          "agreementNo": "107851660",
          "paid": 10.0,
          "adj": 0.0
        },
        {
          "name": "nan",
          "agreementNo": "95043263",
          "paid": 151.0,
          "adj": 0.0
        },
        {
          "name": "MOHAMMED RASHID AL",
          "agreementNo": "115652220",
          "paid": 176.035,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Hamad3",
      "region": "Debt Collection Company",
      "branch": "National Center",
      "paid": 304.175,
      "adj": 0.0,
      "count": 4,
      "debtors": [
        {
          "name": "ALI SALIM AL FAHDI",
          "agreementNo": "66909510",
          "paid": 10.0,
          "adj": 0.0
        },
        {
          "name": "Qais Ali Abdullah Al Kalbani",
          "agreementNo": "109788369",
          "paid": 45.25,
          "adj": 0.0
        },
        {
          "name": "Khalid Ali Khalaf Alkalbani",
          "agreementNo": "110129027",
          "paid": 48.925,
          "adj": 0.0
        },
        {
          "name": "nan",
          "agreementNo": "103850739",
          "paid": 200.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Matrix1",
      "region": "Debt Collection Company",
      "branch": "Matrix Debt Collection",
      "paid": 120.326,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "nan",
          "agreementNo": "113800873",
          "paid": 120.326,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Legal- DR. Sarhaan",
      "region": "Head Office",
      "branch": "Al-Khuwair",
      "paid": 100.0,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "MOHAMMED ALI AL SARHANI",
          "agreementNo": "117290440",
          "paid": 100.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Abdul Aziz",
      "region": "Debt Collection Company",
      "branch": "Matrix Debt Collection",
      "paid": 71.943,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "MOHAMMED HASSAN AHMED AL BALUSHI",
          "agreementNo": "67125591",
          "paid": 71.943,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Shifa",
      "region": "Debt Collection Company",
      "branch": "Compass Risk Support Services",
      "paid": 62.71,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "KHALFAN ABDULLAH AL DHOUYANI",
          "agreementNo": "103020524",
          "paid": 62.71,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "hala alamri",
      "region": "Debt Collection Company",
      "branch": "Matrix Debt Collection",
      "paid": 55.0,
      "adj": 0.0,
      "count": 2,
      "debtors": [
        {
          "name": "mubarak rashid al aghbari",
          "agreementNo": "41273321",
          "paid": 30.0,
          "adj": 0.0
        },
        {
          "name": "ZAYID HUMAID AL AMRY",
          "agreementNo": "13222004",
          "paid": 25.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Matrix3",
      "region": "Debt Collection Company",
      "branch": "Matrix Debt Collection",
      "paid": 39.645,
      "adj": 0.0,
      "count": 3,
      "debtors": [
        {
          "name": "yousuf surur al yaaribi",
          "agreementNo": "113759940",
          "paid": 5.86,
          "adj": 0.0
        },
        {
          "name": "HUMAID GHASI AL",
          "agreementNo": "114398392",
          "paid": 30.785,
          "adj": 0.0
        },
        {
          "name": "MOHAMMED NASSER AL MAMARI",
          "agreementNo": "48532976",
          "paid": 3.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Shiiab Al Habsi",
      "region": "North and South Al Shaurqiah and Al Wasatah",
      "branch": "Al- Duqum",
      "paid": 36.266,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "SHUAA ALI AL-RAWAS",
          "agreementNo": "90957994",
          "paid": 36.266,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Iman",
      "region": "Debt Collection Company",
      "branch": "Compass Risk Support Services",
      "paid": 30.0,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "MIYTHA MUBARAK AL-JAHDHAMI",
          "agreementNo": "113666160",
          "paid": 30.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Aida Kasaf Al Nofli",
      "region": "South and North Al Batinah",
      "branch": "Shinas",
      "paid": 30.0,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "NAJI HASSAN AL BALUSHI",
          "agreementNo": "117493478",
          "paid": 30.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Rayan",
      "region": "Debt Collection Company",
      "branch": "Compass Risk Support Services",
      "paid": 20.0,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "nan",
          "agreementNo": "108759635",
          "paid": 20.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Salwa Hamed Al-Julandani",
      "region": "MUSCAT AND AL DAKHILIYAH",
      "branch": "Fanja",
      "paid": 16.46,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "ALAZHAR BADAR ALAGHBARI",
          "agreementNo": "111261685",
          "paid": 16.46,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Maryam Rashid",
      "region": "Debt Collection Company",
      "branch": "Compass Risk Support Services",
      "paid": 10.0,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "ALMOATASIM SALEH AL ZAABI",
          "agreementNo": "114161732",
          "paid": 10.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Yusra khamis Al Daoudia",
      "region": "North and South Al Shaurqiah and Al Wasatah",
      "branch": "Sur",
      "paid": 9.0,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "HUSAM SALEH AL-GHARIBI",
          "agreementNo": "86346398",
          "paid": 9.0,
          "adj": 0.0
        }
      ]
    }
  ],
  "2026-05-13": [
    {
      "collector": "Hamad3",
      "region": "Debt Collection Company",
      "branch": "National Center",
      "paid": 451.935,
      "adj": 0.0,
      "count": 5,
      "debtors": [
        {
          "name": "Badar Nasser AL Mamari",
          "agreementNo": "113897285",
          "paid": 37.68,
          "adj": 0.0
        },
        {
          "name": "نور المستقبل للاعمال الرائدة",
          "agreementNo": "110722383",
          "paid": 272.3,
          "adj": 0.0
        },
        {
          "name": "nan",
          "agreementNo": "95421774",
          "paid": 26.955,
          "adj": 0.0
        },
        {
          "name": "NASSER SALIM AL AJMI",
          "agreementNo": "13480649",
          "paid": 15.0,
          "adj": 0.0
        },
        {
          "name": "nan",
          "agreementNo": "97545156",
          "paid": 100.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Matrix5",
      "region": "Debt Collection Company",
      "branch": "Matrix Debt Collection",
      "paid": 117.39,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "lamya   abdul rasheed al balushi",
          "agreementNo": "112873870",
          "paid": 117.39,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Rayan",
      "region": "Debt Collection Company",
      "branch": "Compass Risk Support Services",
      "paid": 50.0,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "aisha mohammed albadi",
          "agreementNo": "117123663",
          "paid": 50.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Khulood Nasser Al Kindi",
      "region": "MUSCAT AND AL DAKHILIYAH",
      "branch": "Nizwa",
      "paid": 29.793,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "AHMED MOHAMMED AL KIYUMI",
          "agreementNo": "6981185",
          "paid": 29.793,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Matrix3",
      "region": "Debt Collection Company",
      "branch": "Matrix Debt Collection",
      "paid": 20.0,
      "adj": 0.0,
      "count": 2,
      "debtors": [
        {
          "name": "ahmed salim al faeaji",
          "agreementNo": "112738461",
          "paid": 15.0,
          "adj": 0.0
        },
        {
          "name": "IBRAHEEM MOHAMMED AL RIYAMI",
          "agreementNo": "112030324",
          "paid": 5.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Balqees Abdullah",
      "region": "Debt Collection Company",
      "branch": "Matrix Debt Collection",
      "paid": 20.0,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "ZEESHAN NAWAZ MUHAMMAD NAWAZ BATTH",
          "agreementNo": "102122222",
          "paid": 20.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Faisal Al-Zadjali",
      "region": "MUSCAT AND AL DAKHILIYAH",
      "branch": "Al Mawaleh",
      "paid": 14.0,
      "adj": 0.0,
      "count": 2,
      "debtors": [
        {
          "name": "AHMED KHALFAN AL WAHAIBI",
          "agreementNo": "68232615",
          "paid": 10.0,
          "adj": 0.0
        },
        {
          "name": "QASIM MOHAMMED AL ATAR",
          "agreementNo": "76515916",
          "paid": 4.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Rasheeda",
      "region": "Debt Collection Company",
      "branch": "Matrix Debt Collection",
      "paid": 10.0,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "SULAIMAN JUMA AL HAKMANI",
          "agreementNo": "115028511",
          "paid": 10.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Shifa",
      "region": "Debt Collection Company",
      "branch": "Compass Risk Support Services",
      "paid": 3.3,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "thaqib ramadhan al hadhrami",
          "agreementNo": "110490174",
          "paid": 3.3,
          "adj": 0.0
        }
      ]
    }
  ],
  "2026-05-14": [
    {
      "collector": "Hamad3",
      "region": "Debt Collection Company",
      "branch": "National Center",
      "paid": 1481.532,
      "adj": 0.0,
      "count": 10,
      "debtors": [
        {
          "name": "Samiya Ahmed Mubarak Al shidi",
          "agreementNo": "115584894",
          "paid": 20.0,
          "adj": 0.0
        },
        {
          "name": "تطوير مجان الوطنية",
          "agreementNo": "109524615",
          "paid": 270.965,
          "adj": 0.0
        },
        {
          "name": "nan",
          "agreementNo": "100872608",
          "paid": 282.205,
          "adj": 0.0
        },
        {
          "name": "nan",
          "agreementNo": "99974319",
          "paid": 371.0,
          "adj": 0.0
        },
        {
          "name": "ZIYAD KHAMIS AL GHAFRI",
          "agreementNo": "116591262",
          "paid": 2.0,
          "adj": 0.0
        },
        {
          "name": "بوابه المعرفه لتقنيه المعلومات",
          "agreementNo": "110812750",
          "paid": 151.925,
          "adj": 0.0
        },
        {
          "name": "ألبوم للإعلام والاستثمار",
          "agreementNo": "108141020",
          "paid": 12.0,
          "adj": 0.0
        },
        {
          "name": "nan",
          "agreementNo": "102279275",
          "paid": 67.137,
          "adj": 0.0
        },
        {
          "name": "nan",
          "agreementNo": "100729320",
          "paid": 170.0,
          "adj": 0.0
        },
        {
          "name": "nan",
          "agreementNo": "96102603",
          "paid": 134.3,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Legal- DR. Sarhaan",
      "region": "Head Office",
      "branch": "Al-Khuwair",
      "paid": 540.585,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "MOHAMMED AHMED AL- JUNAIBI",
          "agreementNo": "45253298",
          "paid": 540.585,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Rasheeda",
      "region": "Debt Collection Company",
      "branch": "Matrix Debt Collection",
      "paid": 229.735,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "HILAL RASHID KHADAYAM AL RUSHEIDI",
          "agreementNo": "112090187",
          "paid": 229.735,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Matrix3",
      "region": "Debt Collection Company",
      "branch": "Matrix Debt Collection",
      "paid": 146.81,
      "adj": 0.0,
      "count": 2,
      "debtors": [
        {
          "name": "AHMED SAIF AL",
          "agreementNo": "113951140",
          "paid": 15.0,
          "adj": 0.0
        },
        {
          "name": "QAIS KHALFAN AL RAHBI",
          "agreementNo": "114732115",
          "paid": 131.81,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Khulood Nasser Al Kindi",
      "region": "MUSCAT AND AL DAKHILIYAH",
      "branch": "Nizwa- Daris",
      "paid": 79.595,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "HASSAN YASEEN AL LAWATI",
          "agreementNo": "30748501",
          "paid": 79.595,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Faisal Al-Zadjali",
      "region": "MUSCAT AND AL DAKHILIYAH",
      "branch": "Al Mawaleh",
      "paid": 66.26,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "ADNAN YAHYA AL RASHDI",
          "agreementNo": "60227217",
          "paid": 66.26,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Hamood Al-Harthyi",
      "region": "Debt Collection Company",
      "branch": "Matrix Debt Collection",
      "paid": 65.0,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "ABDULLAH RASHID AL-GHAFRI",
          "agreementNo": "13226009",
          "paid": 65.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Matrix6",
      "region": "Debt Collection Company",
      "branch": "Matrix Debt Collection",
      "paid": 63.369,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "SALIM MAS'OUD AL-QURAINI",
          "agreementNo": "103299828",
          "paid": 63.369,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Sabah Said",
      "region": "North and South Al Shaurqiah and Al Wasatah",
      "branch": "JALAN Bu Ali",
      "paid": 50.0,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "Mahfoodha saleh Al dhib Al khanjari",
          "agreementNo": "113469743",
          "paid": 50.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Matrix5",
      "region": "Debt Collection Company",
      "branch": "Matrix Debt Collection",
      "paid": 10.0,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "YAQOOB SALIM ALMASARI",
          "agreementNo": "51398904",
          "paid": 10.0,
          "adj": 0.0
        }
      ]
    }
  ],
  "2026-05-15": [
    {
      "collector": "Abdul Aziz",
      "region": "Debt Collection Company",
      "branch": "Matrix Debt Collection",
      "paid": 130.316,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "MAHMOOD ISSA AL HAMRASHDI",
          "agreementNo": "112176860",
          "paid": 130.316,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Hamad3",
      "region": "Debt Collection Company",
      "branch": "National Center",
      "paid": 90.0,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "nan",
          "agreementNo": "103601983",
          "paid": 90.0,
          "adj": 0.0
        }
      ]
    }
  ],
  "2026-05-16": [
    {
      "collector": "Hamad3",
      "region": "Debt Collection Company",
      "branch": "National Center",
      "paid": 101.42,
      "adj": 0.0,
      "count": 2,
      "debtors": [
        {
          "name": "ANWAR",
          "agreementNo": "65379561",
          "paid": 30.0,
          "adj": 0.0
        },
        {
          "name": "SALEEM SAID KHAWAR",
          "agreementNo": "112342619",
          "paid": 71.42,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Matrix3",
      "region": "Debt Collection Company",
      "branch": "Matrix Debt Collection",
      "paid": 68.945,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "MAAN YAHYA AL",
          "agreementNo": "115435918",
          "paid": 68.945,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Documentation- Omantel",
      "region": "Head Office",
      "branch": "Al-Khuwair",
      "paid": 10.0,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "SAID SALIM AL HARSOOSI",
          "agreementNo": "58826350",
          "paid": 10.0,
          "adj": 0.0
        }
      ]
    }
  ],
  "2026-05-17": [
    {
      "collector": "Legal- DR. Sarhaan",
      "region": "Head Office",
      "branch": "Al-Khuwair",
      "paid": 999.274,
      "adj": 0.0,
      "count": 4,
      "debtors": [
        {
          "name": "FAT HIYA KHALFAN",
          "agreementNo": "114860634",
          "paid": 507.55,
          "adj": 0.0
        },
        {
          "name": "المدينة العالمية الحديثة",
          "agreementNo": "92183670",
          "paid": 130.71,
          "adj": 0.0
        },
        {
          "name": "ALI FAISAL ZAABANOOT",
          "agreementNo": "113372980",
          "paid": 227.203,
          "adj": 0.0
        },
        {
          "name": "nan",
          "agreementNo": "103876340",
          "paid": 133.811,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Matrix3",
      "region": "Debt Collection Company",
      "branch": "Matrix Debt Collection",
      "paid": 330.255,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "mahmood  alhooti",
          "agreementNo": "43596186",
          "paid": 330.255,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Hamad3",
      "region": "Debt Collection Company",
      "branch": "National Center",
      "paid": 107.866,
      "adj": 0.0,
      "count": 4,
      "debtors": [
        {
          "name": "nan",
          "agreementNo": "101613544",
          "paid": 30.795,
          "adj": 0.0
        },
        {
          "name": "nan",
          "agreementNo": "103601983",
          "paid": 7.071,
          "adj": 0.0
        },
        {
          "name": "nan",
          "agreementNo": "100894677",
          "paid": 30.0,
          "adj": 0.0
        },
        {
          "name": "abdallah hassan aljabri",
          "agreementNo": "115672539",
          "paid": 40.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Matrix2",
      "region": "Debt Collection Company",
      "branch": "Matrix Debt Collection",
      "paid": 78.74,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "ABDULLAH RASHID AL SHIHHI",
          "agreementNo": "114038041",
          "paid": 78.74,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Balqees Abdullah",
      "region": "Debt Collection Company",
      "branch": "Matrix Debt Collection",
      "paid": 60.249,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "MERVAT MAHMOUD ABDULLAH",
          "agreementNo": "111670573",
          "paid": 60.249,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Salwa Hamed Al-Julandani",
      "region": "MUSCAT AND AL DAKHILIYAH",
      "branch": "Fanja",
      "paid": 20.0,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "ZAMZAM ABDULLAH AL RAHBI",
          "agreementNo": "97744323",
          "paid": 20.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Maryam Rashid",
      "region": "Debt Collection Company",
      "branch": "Compass Risk Support Services",
      "paid": 15.0,
      "adj": 0.0,
      "count": 2,
      "debtors": [
        {
          "name": "Abed Aziz Masoud Almammri",
          "agreementNo": "109234935",
          "paid": 5.0,
          "adj": 0.0
        },
        {
          "name": "MANA SAID AL JUNAIBI",
          "agreementNo": "109919531",
          "paid": 10.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Matrix6",
      "region": "Debt Collection Company",
      "branch": "Matrix Debt Collection",
      "paid": 10.0,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "Mohd Nasir Sulaman Al Ghalabi",
          "agreementNo": "109937302",
          "paid": 10.0,
          "adj": 0.0
        }
      ]
    }
  ],
  "2026-05-18": [
    {
      "collector": "Legal- DR. Sarhaan",
      "region": "Head Office",
      "branch": "Al-Khuwair",
      "paid": 611.965,
      "adj": 0.0,
      "count": 2,
      "debtors": [
        {
          "name": "KHAMIS SAID AL HINAAI",
          "agreementNo": "109056991",
          "paid": 527.965,
          "adj": 0.0
        },
        {
          "name": "SAMI AHMED AL SHANFARI",
          "agreementNo": "9365102",
          "paid": 84.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Hamad3",
      "region": "Debt Collection Company",
      "branch": "National Center",
      "paid": 511.688,
      "adj": 0.0,
      "count": 8,
      "debtors": [
        {
          "name": "SAID BILAL AL SHEKAILI",
          "agreementNo": "70474552",
          "paid": 8.0,
          "adj": 0.0
        },
        {
          "name": "nan",
          "agreementNo": "103368875",
          "paid": 141.693,
          "adj": 0.0
        },
        {
          "name": "nan",
          "agreementNo": "98565023",
          "paid": 150.375,
          "adj": 0.0
        },
        {
          "name": "nan",
          "agreementNo": "96414194",
          "paid": 30.0,
          "adj": 0.0
        },
        {
          "name": "ANWAR",
          "agreementNo": "65379561",
          "paid": 40.5,
          "adj": 0.0
        },
        {
          "name": "MOHAMMED Habib Aljulandani",
          "agreementNo": "111610874",
          "paid": 25.0,
          "adj": 0.0
        },
        {
          "name": "Waqass Saleh Ahmed Rashid Albalushi",
          "agreementNo": "109101546",
          "paid": 20.375,
          "adj": 0.0
        },
        {
          "name": "nan",
          "agreementNo": "102662095",
          "paid": 95.745,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Mariam Rashid Al Suhi",
      "region": "Musandam, Al Burimai and Al Dahirah",
      "branch": "Daba",
      "paid": 277.391,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "AREEF MOHAMMED ALBALUSHI",
          "agreementNo": "46382525",
          "paid": 277.391,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Maryam Rashid",
      "region": "Debt Collection Company",
      "branch": "Compass Risk Support Services",
      "paid": 93.045,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "TALAL SAIF AL HOSNI",
          "agreementNo": "113144350",
          "paid": 93.045,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Abdul Aziz",
      "region": "Debt Collection Company",
      "branch": "Matrix Debt Collection",
      "paid": 86.0,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "amani nasser aljabri",
          "agreementNo": "116623688",
          "paid": 86.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Balqees Abdullah",
      "region": "Debt Collection Company",
      "branch": "Matrix Debt Collection",
      "paid": 81.202,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "MUHAMMAD  MUBEEN",
          "agreementNo": "98306911",
          "paid": 81.202,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Aida Kasaf Al Nofli",
      "region": "South and North Al Batinah",
      "branch": "Shinas",
      "paid": 51.941,
      "adj": 0.0,
      "count": 3,
      "debtors": [
        {
          "name": "BASEM SAID AL RUSHAIDI",
          "agreementNo": "110519036",
          "paid": 36.309,
          "adj": 0.0
        },
        {
          "name": "fatma darwish alqaidia",
          "agreementNo": "112468925",
          "paid": 10.0,
          "adj": 0.0
        },
        {
          "name": "KHAMIS SALEH AL SAADI",
          "agreementNo": "105736089",
          "paid": 5.632,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Matrix1",
      "region": "Debt Collection Company",
      "branch": "Matrix Debt Collection",
      "paid": 21.831,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "ZAHER SULEIMAN AL ABRI",
          "agreementNo": "2780410",
          "paid": 21.831,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Hamood Al abri",
      "region": "Debt Collection Company",
      "branch": "Matrix Debt Collection",
      "paid": 17.0,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "AMUR SALIM BAYAT ALI SAKAROUN",
          "agreementNo": "111764040",
          "paid": 17.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Safiya",
      "region": "Debt Collection Company",
      "branch": "Compass Risk Support Services",
      "paid": 15.0,
      "adj": 0.0,
      "count": 2,
      "debtors": [
        {
          "name": "ahlem gharib assadi",
          "agreementNo": "16070380",
          "paid": 5.0,
          "adj": 0.0
        },
        {
          "name": "AMAL AMUR AL MUSALAMI",
          "agreementNo": "113171031",
          "paid": 10.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Matrix3",
      "region": "Debt Collection Company",
      "branch": "Matrix Debt Collection",
      "paid": 10.142,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "adil  breiki",
          "agreementNo": "54737321",
          "paid": 10.142,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Matrix5",
      "region": "Debt Collection Company",
      "branch": "Matrix Debt Collection",
      "paid": 5.0,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "SAID KHAMIS AL JAAFARI",
          "agreementNo": "113305850",
          "paid": 5.0,
          "adj": 0.0
        }
      ]
    }
  ],
  "2026-05-19": [
    {
      "collector": "Legal- DR. Sarhaan",
      "region": "Head Office",
      "branch": "Al-Khuwair",
      "paid": 1447.545,
      "adj": 0.0,
      "count": 3,
      "debtors": [
        {
          "name": "LULUA HAMED SAIF AL MUKHAINI",
          "agreementNo": "65108516",
          "paid": 651.37,
          "adj": 0.0
        },
        {
          "name": "nan",
          "agreementNo": "103149831",
          "paid": 770.175,
          "adj": 0.0
        },
        {
          "name": "SAMI AHMED AL SHANFARI",
          "agreementNo": "9365102",
          "paid": 26.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Hamad3",
      "region": "Debt Collection Company",
      "branch": "National Center",
      "paid": 452.062,
      "adj": 0.0,
      "count": 7,
      "debtors": [
        {
          "name": "abdul aziz al yahyaee",
          "agreementNo": "116013345",
          "paid": 19.82,
          "adj": 0.0
        },
        {
          "name": "IMAN SALEH AL MUKHAINI",
          "agreementNo": "25580190",
          "paid": 66.985,
          "adj": 0.0
        },
        {
          "name": "nan",
          "agreementNo": "102239010",
          "paid": 237.512,
          "adj": 0.0
        },
        {
          "name": "Abdul Latif Nasib Al Jabri",
          "agreementNo": "111914693",
          "paid": 34.98,
          "adj": 0.0
        },
        {
          "name": "Sulaiman Ali Abdullah Al Ofi",
          "agreementNo": "106257250",
          "paid": 35.74,
          "adj": 0.0
        },
        {
          "name": "khalid bin khamis sawaid al al kayumi",
          "agreementNo": "43401790",
          "paid": 19.025,
          "adj": 0.0
        },
        {
          "name": "MUHANNAD OMRAN AL KINDI",
          "agreementNo": "91508496",
          "paid": 38.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Matrix3",
      "region": "Debt Collection Company",
      "branch": "Matrix Debt Collection",
      "paid": 376.0,
      "adj": 0.0,
      "count": 2,
      "debtors": [
        {
          "name": "Murad Shafia Ahmed Al Balushi- Zubair Automotive Group",
          "agreementNo": "104957219",
          "paid": 26.0,
          "adj": 0.0
        },
        {
          "name": "KHALID ALI ALSAIDI",
          "agreementNo": "116328356",
          "paid": 350.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Aida Kasaf Al Nofli",
      "region": "South and North Al Batinah",
      "branch": "Shinas",
      "paid": 65.0,
      "adj": 0.0,
      "count": 3,
      "debtors": [
        {
          "name": "Ghafran Mubarak Albalushi",
          "agreementNo": "113011520",
          "paid": 20.0,
          "adj": 0.0
        },
        {
          "name": "faisal salim al hosni",
          "agreementNo": "117292874",
          "paid": 10.0,
          "adj": 0.0
        },
        {
          "name": "MOHAMED FARHAT MOHAMMED AL KINDI",
          "agreementNo": "113609802",
          "paid": 35.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Badria Al-Maghribi",
      "region": "MUSCAT AND AL DAKHILIYAH",
      "branch": "Fanja",
      "paid": 55.71,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "abdulaziz ali al sheibli",
          "agreementNo": "116346437",
          "paid": 55.71,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Rayan",
      "region": "Debt Collection Company",
      "branch": "Compass Risk Support Services",
      "paid": 20.0,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "zahra 0 jama",
          "agreementNo": "65925154",
          "paid": 20.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Hamood Al-Harthyi",
      "region": "Debt Collection Company",
      "branch": "Matrix Debt Collection",
      "paid": 15.0,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "SULAIMAN SALEH AL MAMARI",
          "agreementNo": "84226560",
          "paid": 15.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Omnia",
      "region": "Debt Collection Company",
      "branch": "Compass Risk Support Services",
      "paid": 10.0,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "abdallah taoob al kahhali",
          "agreementNo": "106595684",
          "paid": 10.0,
          "adj": 0.0
        }
      ]
    }
  ],
  "2026-05-20": [
    {
      "collector": "Hamad3",
      "region": "Debt Collection Company",
      "branch": "National Center",
      "paid": 354.104,
      "adj": 0.0,
      "count": 4,
      "debtors": [
        {
          "name": "دلتا للمياة الطبيعية",
          "agreementNo": "114011321",
          "paid": 200.0,
          "adj": 0.0
        },
        {
          "name": "nan",
          "agreementNo": "104840523",
          "paid": 78.329,
          "adj": 0.0
        },
        {
          "name": "Ahmed Solum Alhbsi",
          "agreementNo": "112121810",
          "paid": 30.775,
          "adj": 0.0
        },
        {
          "name": "AHLAM SALIM AL ORAIMI",
          "agreementNo": "104686431",
          "paid": 45.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Matrix3",
      "region": "Debt Collection Company",
      "branch": "Matrix Debt Collection",
      "paid": 315.61,
      "adj": 0.0,
      "count": 6,
      "debtors": [
        {
          "name": "said ahmed almahmoodi",
          "agreementNo": "114610733",
          "paid": 126.51,
          "adj": 0.0
        },
        {
          "name": "mahmood muhammed said",
          "agreementNo": "112518904",
          "paid": 10.0,
          "adj": 0.0
        },
        {
          "name": "ABDULLAH KHAMIS AL URAIMI",
          "agreementNo": "111687822",
          "paid": 94.1,
          "adj": 0.0
        },
        {
          "name": "AHMED ALI RASHID AL WAHAIBI",
          "agreementNo": "115333320",
          "paid": 10.0,
          "adj": 0.0
        },
        {
          "name": "KHALIL IBRAHIM AL",
          "agreementNo": "116532348",
          "paid": 74.0,
          "adj": 0.0
        },
        {
          "name": "KHAMIS SAID SAID AL ABDUL SALLAM",
          "agreementNo": "115217563",
          "paid": 1.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Matrix1",
      "region": "Debt Collection Company",
      "branch": "Matrix Debt Collection",
      "paid": 160.0,
      "adj": 0.0,
      "count": 2,
      "debtors": [
        {
          "name": "adil juma almaslahi",
          "agreementNo": "109043686",
          "paid": 150.0,
          "adj": 0.0
        },
        {
          "name": "MAJED MAHKOOM AL KHAMISI",
          "agreementNo": "97835810",
          "paid": 10.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Mahmood al nabhani",
      "region": "MUSCAT AND AL DAKHILIYAH",
      "branch": "Al-Mubailh -Nisto",
      "paid": 78.62,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "salim majid al riyami",
          "agreementNo": "87045114",
          "paid": 78.62,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Legal- DR. Sarhaan",
      "region": "Head Office",
      "branch": "Al-Khuwair",
      "paid": 50.0,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "nan",
          "agreementNo": "103874306",
          "paid": 50.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Marwa Juma Mubarak",
      "region": "North and South Al Shaurqiah and Al Wasatah",
      "branch": "Musirah",
      "paid": 34.255,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "MAHMOOD MOHAMMED AL HARRASI",
          "agreementNo": "114958397",
          "paid": 34.255,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Ibtisam Al Siyabiya",
      "region": "MUSCAT AND AL DAKHILIYAH",
      "branch": "Samail",
      "paid": 30.0,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "MOHAMMED ALI AL HABSI",
          "agreementNo": "42313582",
          "paid": 30.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Haidy",
      "region": "Debt Collection Company",
      "branch": "Compass Risk Support Services",
      "paid": 30.0,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "nan",
          "agreementNo": "92986614",
          "paid": 30.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Matrix5",
      "region": "Debt Collection Company",
      "branch": "Matrix Debt Collection",
      "paid": 25.0,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "MASOUD SALIM AL SAWAI",
          "agreementNo": "114513200",
          "paid": 25.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Yustina",
      "region": "Debt Collection Company",
      "branch": "Compass Risk Support Services",
      "paid": 25.0,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "Ali Said Ali Al-hrassi",
          "agreementNo": "108988569",
          "paid": 25.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Khulood Nasser Al Kindi",
      "region": "MUSCAT AND AL DAKHILIYAH",
      "branch": "Nizwa- Daris",
      "paid": 20.0,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "HANAN  ABDULLAH AL SHKILI",
          "agreementNo": "109005284",
          "paid": 20.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Rayan",
      "region": "Debt Collection Company",
      "branch": "Compass Risk Support Services",
      "paid": 15.0,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "BASIM SALIM AL BALUSHI",
          "agreementNo": "113126293",
          "paid": 15.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Aida Kasaf Al Nofli",
      "region": "South and North Al Batinah",
      "branch": "Shinas",
      "paid": 10.0,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "abdullah subait al rasheidi",
          "agreementNo": "116717245",
          "paid": 10.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Hamood Al abri",
      "region": "Debt Collection Company",
      "branch": "Matrix Debt Collection",
      "paid": 9.985,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "ali yasaloom oall alshahri",
          "agreementNo": "81303816",
          "paid": 9.985,
          "adj": 0.0
        }
      ]
    }
  ],
  "2026-05-21": [
    {
      "collector": "Hamad3",
      "region": "Debt Collection Company",
      "branch": "National Center",
      "paid": 546.708,
      "adj": 0.0,
      "count": 14,
      "debtors": [
        {
          "name": "MOOSA HARIB ALLAH",
          "agreementNo": "106455400",
          "paid": 13.619,
          "adj": 0.0
        },
        {
          "name": "ABDULLAH AHMED AL-MAZROUAI",
          "agreementNo": "116769488",
          "paid": 42.0,
          "adj": 0.0
        },
        {
          "name": "hilal humaid al hinai",
          "agreementNo": "116729995",
          "paid": 5.0,
          "adj": 0.0
        },
        {
          "name": "nan",
          "agreementNo": "103813020",
          "paid": 100.0,
          "adj": 0.0
        },
        {
          "name": "YAHYA MOHAMMED AL SINANI",
          "agreementNo": "114098323",
          "paid": 97.31,
          "adj": 0.0
        },
        {
          "name": "FARIS ZAYID AL RAJHI",
          "agreementNo": "55048961",
          "paid": 22.59,
          "adj": 0.0
        },
        {
          "name": "SALEH ALI AL SAADI",
          "agreementNo": "110501251",
          "paid": 16.58,
          "adj": 0.0
        },
        {
          "name": "abdullah khamis al farsi",
          "agreementNo": "69898157",
          "paid": 40.0,
          "adj": 0.0
        },
        {
          "name": "Yahya Nasser Hamed Almajarfi",
          "agreementNo": "101618517",
          "paid": 50.0,
          "adj": 0.0
        },
        {
          "name": "fatmah ali aljunibi",
          "agreementNo": "44681227",
          "paid": 1.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Matrix3",
      "region": "Debt Collection Company",
      "branch": "Matrix Debt Collection",
      "paid": 297.391,
      "adj": 0.0,
      "count": 9,
      "debtors": [
        {
          "name": "mahnad abdallah alsiyabi",
          "agreementNo": "116962112",
          "paid": 36.51,
          "adj": 0.0
        },
        {
          "name": "NOURA MOHAMMED ALSAADI",
          "agreementNo": "112456273",
          "paid": 10.0,
          "adj": 0.0
        },
        {
          "name": "ALI GHARIB SAID BALUSHI",
          "agreementNo": "115544331",
          "paid": 10.0,
          "adj": 0.0
        },
        {
          "name": "ABDALLAH SAID AL",
          "agreementNo": "115460214",
          "paid": 5.978,
          "adj": 0.0
        },
        {
          "name": "SLMAN SAIf AL KHATRI",
          "agreementNo": "116799699",
          "paid": 6.0,
          "adj": 0.0
        },
        {
          "name": "KHAMIS SALIM SALEEM AL AMRI",
          "agreementNo": "106286754",
          "paid": 30.0,
          "adj": 0.0
        },
        {
          "name": "Mr. rashad hamed mohameed al manthri",
          "agreementNo": "104681354",
          "paid": 25.0,
          "adj": 0.0
        },
        {
          "name": "dhiyab jamil al qannubi",
          "agreementNo": "59445830",
          "paid": 10.0,
          "adj": 0.0
        },
        {
          "name": "RASHID SALEH ALHARTHI",
          "agreementNo": "113873530",
          "paid": 163.903,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Haidy",
      "region": "Debt Collection Company",
      "branch": "Compass Risk Support Services",
      "paid": 223.74,
      "adj": 0.0,
      "count": 2,
      "debtors": [
        {
          "name": "nan",
          "agreementNo": "93987419",
          "paid": 111.915,
          "adj": 0.0
        },
        {
          "name": "nan",
          "agreementNo": "93987330",
          "paid": 111.825,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Rayan",
      "region": "Debt Collection Company",
      "branch": "Compass Risk Support Services",
      "paid": 219.662,
      "adj": 0.0,
      "count": 3,
      "debtors": [
        {
          "name": "abdullahsultan salim alkabi",
          "agreementNo": "114491800",
          "paid": 116.81,
          "adj": 0.0
        },
        {
          "name": "Shihab Ahmed Ali Alsehihhi",
          "agreementNo": "110078044",
          "paid": 19.852,
          "adj": 0.0
        },
        {
          "name": "Arif Mohamed Salim Alhikmani",
          "agreementNo": "109751000",
          "paid": 83.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Matrix6",
      "region": "Debt Collection Company",
      "branch": "Matrix Debt Collection",
      "paid": 108.595,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "ABDUL SALLAM SAID AL KATHIRI",
          "agreementNo": "41925970",
          "paid": 108.595,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Matrix5",
      "region": "Debt Collection Company",
      "branch": "Matrix Debt Collection",
      "paid": 68.0,
      "adj": 0.0,
      "count": 3,
      "debtors": [
        {
          "name": "RUZAIQ MOHAMED AL JABRI",
          "agreementNo": "113736010",
          "paid": 10.0,
          "adj": 0.0
        },
        {
          "name": "JASIM SAID SULAIMAN AL SHIYADI",
          "agreementNo": "116083712",
          "paid": 8.0,
          "adj": 0.0
        },
        {
          "name": "AHMED KHALID AO",
          "agreementNo": "114511287",
          "paid": 50.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "hala alamri",
      "region": "Debt Collection Company",
      "branch": "Matrix Debt Collection",
      "paid": 64.145,
      "adj": 0.0,
      "count": 4,
      "debtors": [
        {
          "name": "AHMED MOHAMMED AL",
          "agreementNo": "116449214",
          "paid": 20.0,
          "adj": 0.0
        },
        {
          "name": "MOHAMMED ALI AL GHAITHI",
          "agreementNo": "75937049",
          "paid": 19.145,
          "adj": 0.0
        },
        {
          "name": "AHMED MOHAMMED SAID HAMEED AL-RASHDI",
          "agreementNo": "61808880",
          "paid": 10.0,
          "adj": 0.0
        },
        {
          "name": "MOHAMMED SAID AL",
          "agreementNo": "116193062",
          "paid": 15.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Maryam Rashid",
      "region": "Debt Collection Company",
      "branch": "Compass Risk Support Services",
      "paid": 60.0,
      "adj": 0.0,
      "count": 3,
      "debtors": [
        {
          "name": "HUSSEIN ALI AL SIYABI",
          "agreementNo": "45306849",
          "paid": 15.0,
          "adj": 0.0
        },
        {
          "name": "SAID JAMIL AL BALUSHI",
          "agreementNo": "67192142",
          "paid": 15.0,
          "adj": 0.0
        },
        {
          "name": "Bandar Abdullah Said Al Marhoon",
          "agreementNo": "106831276",
          "paid": 30.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Ibtisam Al Siyabiya",
      "region": "MUSCAT AND AL DAKHILIYAH",
      "branch": "Samail",
      "paid": 54.015,
      "adj": 0.0,
      "count": 3,
      "debtors": [
        {
          "name": "ABDULLAH NASIB SAAIYID AL HABSI Dhofar Automotive",
          "agreementNo": "105344308",
          "paid": 24.0,
          "adj": 0.0
        },
        {
          "name": "fathiya salim aldighaishi",
          "agreementNo": "114767439",
          "paid": 10.0,
          "adj": 0.0
        },
        {
          "name": "SUHAIL MASOUD KASHOOB",
          "agreementNo": "116373477",
          "paid": 20.015,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Israa",
      "region": "Debt Collection Company",
      "branch": "Compass Risk Support Services",
      "paid": 50.0,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "HAMED SALIM AL MALKI",
          "agreementNo": "59898410",
          "paid": 50.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Badria Al-Maghribi",
      "region": "MUSCAT AND AL DAKHILIYAH",
      "branch": "Fanja",
      "paid": 40.0,
      "adj": 0.0,
      "count": 2,
      "debtors": [
        {
          "name": "FAISAL MOHAMMED ALHAMADANI",
          "agreementNo": "113293320",
          "paid": 10.0,
          "adj": 0.0
        },
        {
          "name": "ABDULAZIZ YOUSUF AL RAHBI",
          "agreementNo": "100608190",
          "paid": 30.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Safiya",
      "region": "Debt Collection Company",
      "branch": "Compass Risk Support Services",
      "paid": 40.0,
      "adj": 0.0,
      "count": 2,
      "debtors": [
        {
          "name": "Khalid Abdulrahman Rashid Algulabi",
          "agreementNo": "109232148",
          "paid": 20.0,
          "adj": 0.0
        },
        {
          "name": "ALI AHMED MAASHANI",
          "agreementNo": "8696974",
          "paid": 20.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Sabah Said",
      "region": "North and South Al Shaurqiah and Al Wasatah",
      "branch": "JALAN Bu Ali",
      "paid": 30.0,
      "adj": 0.0,
      "count": 5,
      "debtors": [
        {
          "name": "mohammad musallam hashm",
          "agreementNo": "103072445",
          "paid": 5.0,
          "adj": 0.0
        },
        {
          "name": "HAMDAN RASHID AL",
          "agreementNo": "113728943",
          "paid": 5.0,
          "adj": 0.0
        },
        {
          "name": "YOUSUF MOHAMED AL GHAMMARI",
          "agreementNo": "116740383",
          "paid": 5.0,
          "adj": 0.0
        },
        {
          "name": "MOHAMMED SALIM AL MASHIKHI",
          "agreementNo": "114233457",
          "paid": 5.0,
          "adj": 0.0
        },
        {
          "name": "aswan abdul matti bait rabeea",
          "agreementNo": "113126359",
          "paid": 10.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Samia Al-Awfiya",
      "region": "South and North Al Batinah",
      "branch": "Sohar",
      "paid": 30.0,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "SULTAN ALI AL BAHRI",
          "agreementNo": "103466411",
          "paid": 30.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Marwa Juma Mubarak",
      "region": "North and South Al Shaurqiah and Al Wasatah",
      "branch": "Musirah",
      "paid": 30.0,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "MOHAMMED SULAIMAN AL HATTALI",
          "agreementNo": "115183942",
          "paid": 30.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Shifa",
      "region": "Debt Collection Company",
      "branch": "Compass Risk Support Services",
      "paid": 25.0,
      "adj": 0.0,
      "count": 2,
      "debtors": [
        {
          "name": "RASHID BAKHIT AL HARSOOSI",
          "agreementNo": "116359614",
          "paid": 5.0,
          "adj": 0.0
        },
        {
          "name": "MOHAMMED ABDULLAH ABDULLAH AL RAHBI",
          "agreementNo": "106800528",
          "paid": 20.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Faisal Al-Zadjali",
      "region": "MUSCAT AND AL DAKHILIYAH",
      "branch": "Al Mawaleh",
      "paid": 21.29,
      "adj": 0.0,
      "count": 2,
      "debtors": [
        {
          "name": "ABDUL RAHMAN FANDOUK AL ZADJALI",
          "agreementNo": "35170906",
          "paid": 18.29,
          "adj": 0.0
        },
        {
          "name": "Amur Ahmed Aamir Alsalmi",
          "agreementNo": "109843393",
          "paid": 3.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Documentation- Omantel",
      "region": "Head Office",
      "branch": "Al-Khuwair",
      "paid": 20.0,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "WAIL KHALID AL",
          "agreementNo": "116727123",
          "paid": 20.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Legal- DR. Sarhaan",
      "region": "Head Office",
      "branch": "Al-Khuwair",
      "paid": 20.0,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "rashid hamed al harsousi",
          "agreementNo": "111881687",
          "paid": 20.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Fahad Said Al Ghaiti",
      "region": "Musandam, Al Burimai and Al Dahirah",
      "branch": "Al-Buraimi",
      "paid": 20.0,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "MOHAMMED HASSAN AL MASHIKHI",
          "agreementNo": "70420610",
          "paid": 20.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Hamood Al-Harthyi",
      "region": "Debt Collection Company",
      "branch": "Matrix Debt Collection",
      "paid": 14.0,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "anad ubaid al khafri",
          "agreementNo": "116069089",
          "paid": 14.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Omnia",
      "region": "Debt Collection Company",
      "branch": "Compass Risk Support Services",
      "paid": 10.0,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "hussam ahmed alrawas",
          "agreementNo": "65583322",
          "paid": 10.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Aida Kasaf Al Nofli",
      "region": "South and North Al Batinah",
      "branch": "Shinas",
      "paid": 10.0,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "AMMAR HUMAID AL saidi",
          "agreementNo": "118344687",
          "paid": 10.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Naji Al-Shibli",
      "region": "South and North Al Batinah",
      "branch": "Sohar",
      "paid": 10.0,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "ASMA KHALIFA AL HARTHI",
          "agreementNo": "48450674",
          "paid": 10.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Mrs. Moza Khamis Al Mamari",
      "region": "South and North Al Batinah",
      "branch": "Shinas",
      "paid": 10.0,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "FAHAD ALI AL RISI",
          "agreementNo": "115464025",
          "paid": 10.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Iman",
      "region": "Debt Collection Company",
      "branch": "Compass Risk Support Services",
      "paid": 3.0,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "Kalfan Juma Al mashaykhi",
          "agreementNo": "114526310",
          "paid": 3.0,
          "adj": 0.0
        }
      ]
    }
  ],
  "2026-05-22": [
    {
      "collector": "Hamad3",
      "region": "Debt Collection Company",
      "branch": "National Center",
      "paid": 371.11,
      "adj": 0.0,
      "count": 5,
      "debtors": [
        {
          "name": "Majada Omar Sharwa Bait Ali Sulaiman",
          "agreementNo": "109307513",
          "paid": 160.905,
          "adj": 0.0
        },
        {
          "name": "MOHAMMED SALIM BORHAM BA OMAR",
          "agreementNo": "115785450",
          "paid": 62.57,
          "adj": 0.0
        },
        {
          "name": "ZIYAD KHAMIS AL GHAFRI",
          "agreementNo": "116591262",
          "paid": 2.0,
          "adj": 0.0
        },
        {
          "name": "FAISAL ALI AL",
          "agreementNo": "114840337",
          "paid": 125.635,
          "adj": 0.0
        },
        {
          "name": "MOHSIN NASSER AL JUNAIBI",
          "agreementNo": "53527367",
          "paid": 20.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Marwa Juma Mubarak",
      "region": "North and South Al Shaurqiah and Al Wasatah",
      "branch": "Musirah",
      "paid": 343.02,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "ALI SALIM GHAWAS",
          "agreementNo": "70039781",
          "paid": 343.02,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Matrix3",
      "region": "Debt Collection Company",
      "branch": "Matrix Debt Collection",
      "paid": 105.0,
      "adj": 0.0,
      "count": 2,
      "debtors": [
        {
          "name": "KHALIL IBRAHIM ALAUFI",
          "agreementNo": "106204385",
          "paid": 20.0,
          "adj": 0.0
        },
        {
          "name": "Abdullah Said Mohammedalqassabi",
          "agreementNo": "110446549",
          "paid": 85.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Shifa",
      "region": "Debt Collection Company",
      "branch": "Compass Risk Support Services",
      "paid": 70.0,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "Ahmed Mubarak Ataqoun Al Shahari",
          "agreementNo": "109068580",
          "paid": 70.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "hala alamri",
      "region": "Debt Collection Company",
      "branch": "Matrix Debt Collection",
      "paid": 61.0,
      "adj": 0.0,
      "count": 3,
      "debtors": [
        {
          "name": "majid said al batahari",
          "agreementNo": "55973802",
          "paid": 10.0,
          "adj": 0.0
        },
        {
          "name": "hamd salim al handasi",
          "agreementNo": "72071217",
          "paid": 5.0,
          "adj": 0.0
        },
        {
          "name": "Khalid saif al raisi",
          "agreementNo": "62542795",
          "paid": 46.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Matrix1",
      "region": "Debt Collection Company",
      "branch": "Matrix Debt Collection",
      "paid": 56.071,
      "adj": 0.0,
      "count": 2,
      "debtors": [
        {
          "name": "NAIL JUDE FERNANDES",
          "agreementNo": "28674881",
          "paid": 27.52,
          "adj": 0.0
        },
        {
          "name": "MANAL SALEH AL ZADJALI",
          "agreementNo": "3867705",
          "paid": 28.551,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Legal- DR. Sarhaan",
      "region": "Head Office",
      "branch": "Al-Khuwair",
      "paid": 51.205,
      "adj": 0.0,
      "count": 2,
      "debtors": [
        {
          "name": "hisham  al amri",
          "agreementNo": "44032997",
          "paid": 2.205,
          "adj": 0.0
        },
        {
          "name": "MANSOOR SALIM AL-HAIFI",
          "agreementNo": "112952379",
          "paid": 49.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Maryam Rashid",
      "region": "Debt Collection Company",
      "branch": "Compass Risk Support Services",
      "paid": 40.0,
      "adj": 0.0,
      "count": 2,
      "debtors": [
        {
          "name": "SALIM MABKHOOT THOAR",
          "agreementNo": "30035259",
          "paid": 20.0,
          "adj": 0.0
        },
        {
          "name": "MUBARAK YOSUF ALSHARJI",
          "agreementNo": "113215058",
          "paid": 20.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Faisal Al-Zadjali",
      "region": "MUSCAT AND AL DAKHILIYAH",
      "branch": "Al Mawaleh",
      "paid": 22.0,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "HALA MOHAMMED WANI AL JAHHAFI",
          "agreementNo": "112908251",
          "paid": 22.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Balqees Abdullah",
      "region": "Debt Collection Company",
      "branch": "Matrix Debt Collection",
      "paid": 20.664,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "malik  mazhar",
          "agreementNo": "77770481",
          "paid": 20.664,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Matrix2",
      "region": "Debt Collection Company",
      "branch": "Matrix Debt Collection",
      "paid": 15.385,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "SAIDA OMAR BAKHSHI AL ZADJALI",
          "agreementNo": "113681574",
          "paid": 15.385,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Hamood Al abri",
      "region": "Debt Collection Company",
      "branch": "Matrix Debt Collection",
      "paid": 13.0,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "AMUR SALIM BAYAT ALI SAKAROUN",
          "agreementNo": "111764040",
          "paid": 13.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Safiya",
      "region": "Debt Collection Company",
      "branch": "Compass Risk Support Services",
      "paid": 10.0,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "Ali Salim Suhail Al Amri",
          "agreementNo": "109473383",
          "paid": 10.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Yustina",
      "region": "Debt Collection Company",
      "branch": "Compass Risk Support Services",
      "paid": 5.0,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "OBAID MUSALLAM MUSALLAM AL ALAWI",
          "agreementNo": "114666908",
          "paid": 5.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Israa",
      "region": "Debt Collection Company",
      "branch": "Compass Risk Support Services",
      "paid": 5.0,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "AHMAD SEEAF AL KHAIFI",
          "agreementNo": "112041152",
          "paid": 5.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Sabah Said",
      "region": "North and South Al Shaurqiah and Al Wasatah",
      "branch": "JALAN Bu Ali",
      "paid": 5.0,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "said salim al brimey",
          "agreementNo": "86178118",
          "paid": 5.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Fahad Said Al Ghaiti",
      "region": "Musandam, Al Burimai and Al Dahirah",
      "branch": "Al-Buraimi",
      "paid": 5.0,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "IBRAHIM RASHID AL-MAQBALI",
          "agreementNo": "114430627",
          "paid": 5.0,
          "adj": 0.0
        }
      ]
    }
  ],
  "2026-05-23": [
    {
      "collector": "Hamad3",
      "region": "Debt Collection Company",
      "branch": "National Center",
      "paid": 285.034,
      "adj": 0.0,
      "count": 4,
      "debtors": [
        {
          "name": "khlood salim alyaqubi",
          "agreementNo": "111808212",
          "paid": 34.0,
          "adj": 0.0
        },
        {
          "name": "nan",
          "agreementNo": "101568198",
          "paid": 100.0,
          "adj": 0.0
        },
        {
          "name": "HUMAID ABDULLAH ALEIDI",
          "agreementNo": "69684893",
          "paid": 30.034,
          "adj": 0.0
        },
        {
          "name": "HAMED SALIM ALI AL KATHIRI",
          "agreementNo": "54392536",
          "paid": 121.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Matrix3",
      "region": "Debt Collection Company",
      "branch": "Matrix Debt Collection",
      "paid": 225.935,
      "adj": 0.0,
      "count": 4,
      "debtors": [
        {
          "name": "Sumiya Salim Al Maawali",
          "agreementNo": "102127037",
          "paid": 145.935,
          "adj": 0.0
        },
        {
          "name": "HUSSAIN SAID AL RAJAIBI",
          "agreementNo": "60224812",
          "paid": 10.0,
          "adj": 0.0
        },
        {
          "name": "saada saleem mohd",
          "agreementNo": "18478323",
          "paid": 50.0,
          "adj": 0.0
        },
        {
          "name": "SULTAN ODAI ALRAEESI",
          "agreementNo": "115017460",
          "paid": 20.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Legal- DR. Sarhaan",
      "region": "Head Office",
      "branch": "Al-Khuwair",
      "paid": 104.805,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "DHARIFA ABDULLAH AL-BUSAIDI",
          "agreementNo": "77317804",
          "paid": 104.805,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Sabah Said",
      "region": "North and South Al Shaurqiah and Al Wasatah",
      "branch": "JALAN Bu Ali",
      "paid": 80.0,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "maryam hamed al mukhani",
          "agreementNo": "113815177",
          "paid": 80.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Yustina",
      "region": "Debt Collection Company",
      "branch": "Compass Risk Support Services",
      "paid": 20.0,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "BADAR DHAHI AL FATHI",
          "agreementNo": "116979252",
          "paid": 20.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Rayan",
      "region": "Debt Collection Company",
      "branch": "Compass Risk Support Services",
      "paid": 16.65,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "mahmood amir salim",
          "agreementNo": "107390334",
          "paid": 16.65,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Aida Kasaf Al Nofli",
      "region": "South and North Al Batinah",
      "branch": "Shinas",
      "paid": 10.0,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "AHMED RASHID AL BREIKI",
          "agreementNo": "116229457",
          "paid": 10.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Ibtisam Al Siyabiya",
      "region": "MUSCAT AND AL DAKHILIYAH",
      "branch": "Samail",
      "paid": 10.0,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "Iman  Hamed Al aamri",
          "agreementNo": "114842887",
          "paid": 10.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Mrs. Moza Khamis Al Mamari",
      "region": "South and North Al Batinah",
      "branch": "Shinas",
      "paid": 10.0,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "HAMZA ISMAIL AL BALUSHI",
          "agreementNo": "112310450",
          "paid": 10.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Iman",
      "region": "Debt Collection Company",
      "branch": "Compass Risk Support Services",
      "paid": 3.435,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "nan",
          "agreementNo": "110026263",
          "paid": 3.435,
          "adj": 0.0
        }
      ]
    }
  ],
  "2026-05-24": [
    {
      "collector": "Legal- DR. Sarhaan",
      "region": "Head Office",
      "branch": "Al-Khuwair",
      "paid": 2882.675,
      "adj": 0.0,
      "count": 8,
      "debtors": [
        {
          "name": "nan",
          "agreementNo": "104276022",
          "paid": 62.3,
          "adj": 0.0
        },
        {
          "name": "HAMED GHADEER SAID AL-OWAISI",
          "agreementNo": "114352197",
          "paid": 1969.2,
          "adj": 0.0
        },
        {
          "name": "ahmed saed al junaibi",
          "agreementNo": "52022833",
          "paid": 80.0,
          "adj": 0.0
        },
        {
          "name": "0",
          "agreementNo": "109845705",
          "paid": 80.0,
          "adj": 0.0
        },
        {
          "name": "AHMED HAMOOD AL",
          "agreementNo": "113352633",
          "paid": 534.036,
          "adj": 0.0
        },
        {
          "name": "nan",
          "agreementNo": "105518372",
          "paid": 94.026,
          "adj": 0.0
        },
        {
          "name": "nan",
          "agreementNo": "104275984",
          "paid": 53.113,
          "adj": 0.0
        },
        {
          "name": "badar bakhit qatan",
          "agreementNo": "114540494",
          "paid": 10.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Hamad3",
      "region": "Debt Collection Company",
      "branch": "National Center",
      "paid": 471.015,
      "adj": 0.0,
      "count": 7,
      "debtors": [
        {
          "name": "MOHAMMED MUSALLAM SHAMAS",
          "agreementNo": "39685937",
          "paid": 50.0,
          "adj": 0.0
        },
        {
          "name": "ZEYANA ALI AL KHARUSI",
          "agreementNo": "115339206",
          "paid": 50.0,
          "adj": 0.0
        },
        {
          "name": "nan",
          "agreementNo": "97028721",
          "paid": 50.0,
          "adj": 0.0
        },
        {
          "name": "Mohammad Kashif Dar",
          "agreementNo": "110770924",
          "paid": 101.59,
          "adj": 0.0
        },
        {
          "name": "FATMA HAMED AL",
          "agreementNo": "116929078",
          "paid": 30.0,
          "adj": 0.0
        },
        {
          "name": "tarik mohd hassan",
          "agreementNo": "116320527",
          "paid": 159.425,
          "adj": 0.0
        },
        {
          "name": "AHMED SAID JABOUB",
          "agreementNo": "114449077",
          "paid": 30.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Shifa",
      "region": "Debt Collection Company",
      "branch": "Compass Risk Support Services",
      "paid": 150.0,
      "adj": 0.0,
      "count": 3,
      "debtors": [
        {
          "name": "HILAL SAID AL JABRI",
          "agreementNo": "114218432",
          "paid": 60.0,
          "adj": 0.0
        },
        {
          "name": "SAID SAIM BALHAF",
          "agreementNo": "13476040",
          "paid": 25.0,
          "adj": 0.0
        },
        {
          "name": "Hassan Ali Said Al Ghaithi",
          "agreementNo": "109868882",
          "paid": 65.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Hamood Al-Harthyi",
      "region": "Debt Collection Company",
      "branch": "Matrix Debt Collection",
      "paid": 138.7,
      "adj": 0.0,
      "count": 4,
      "debtors": [
        {
          "name": "HILAL SAID AL JABRI",
          "agreementNo": "48571301",
          "paid": 40.0,
          "adj": 0.0
        },
        {
          "name": "Said Hamid Musallam Bait Said",
          "agreementNo": "106829970",
          "paid": 40.0,
          "adj": 0.0
        },
        {
          "name": "AHMED SALIM AL",
          "agreementNo": "113164828",
          "paid": 50.0,
          "adj": 0.0
        },
        {
          "name": "GHULAM KHATUN OTHMAN TAJ MOHAMMED",
          "agreementNo": "7706145",
          "paid": 8.7,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Ibtisam Al Siyabiya",
      "region": "MUSCAT AND AL DAKHILIYAH",
      "branch": "Samail",
      "paid": 117.0,
      "adj": 0.0,
      "count": 2,
      "debtors": [
        {
          "name": "MARYAM HASSAN AL TUNAIQI",
          "agreementNo": "114835202",
          "paid": 35.0,
          "adj": 0.0
        },
        {
          "name": "SAIF HAMED AL-DARIAI",
          "agreementNo": "92134520",
          "paid": 82.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Matrix3",
      "region": "Debt Collection Company",
      "branch": "Matrix Debt Collection",
      "paid": 109.68,
      "adj": 0.0,
      "count": 9,
      "debtors": [
        {
          "name": "AFRAH KHAMIS AL BULOOSHI",
          "agreementNo": "108306306",
          "paid": 5.0,
          "adj": 0.0
        },
        {
          "name": "SALIM MOHAMMED ADLI AL KATHIRI",
          "agreementNo": "113219568",
          "paid": 21.2,
          "adj": 0.0
        },
        {
          "name": "HAMED DHABIB BIN SALEH AL ARAIMI",
          "agreementNo": "112081733",
          "paid": 10.0,
          "adj": 0.0
        },
        {
          "name": "said  al tobi",
          "agreementNo": "54065999",
          "paid": 5.0,
          "adj": 0.0
        },
        {
          "name": "AZAD SAID ALI  FADHAL",
          "agreementNo": "52743573",
          "paid": 20.0,
          "adj": 0.0
        },
        {
          "name": "MOATH HAMOOD ALI AL-RAHBI",
          "agreementNo": "108572160",
          "paid": 3.0,
          "adj": 0.0
        },
        {
          "name": "ABDULLAH RASHID AL",
          "agreementNo": "112184420",
          "paid": 20.0,
          "adj": 0.0
        },
        {
          "name": "NADIR SAIF AL SHIDI",
          "agreementNo": "53221874",
          "paid": 5.0,
          "adj": 0.0
        },
        {
          "name": "HAZAA SALIM AL MAEZIDI",
          "agreementNo": "52412544",
          "paid": 20.48,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Badria Al-Maghribi",
      "region": "MUSCAT AND AL DAKHILIYAH",
      "branch": "Fanja",
      "paid": 82.0,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "HASSAN AHMED AL-SHANFARI",
          "agreementNo": "59873486",
          "paid": 82.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Matrix1",
      "region": "Debt Collection Company",
      "branch": "Matrix Debt Collection",
      "paid": 68.805,
      "adj": 0.0,
      "count": 2,
      "debtors": [
        {
          "name": "majid abdulghafoor albulushi",
          "agreementNo": "117015854",
          "paid": 50.605,
          "adj": 0.0
        },
        {
          "name": "FAHAD ALI AL FARSI",
          "agreementNo": "1381350",
          "paid": 18.2,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Faisal Al-Zadjali",
      "region": "MUSCAT AND AL DAKHILIYAH",
      "branch": "Al Mawaleh",
      "paid": 53.337,
      "adj": 0.0,
      "count": 3,
      "debtors": [
        {
          "name": "Jokha Said Al mashikhi",
          "agreementNo": "105845474",
          "paid": 20.0,
          "adj": 0.0
        },
        {
          "name": "ALI AHMED NAJWANI",
          "agreementNo": "74451455",
          "paid": 13.337,
          "adj": 0.0
        },
        {
          "name": "HILAL YAQOOB AL",
          "agreementNo": "111494096",
          "paid": 20.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Nasir Sulaiman",
      "region": "MUSCAT AND AL DAKHILIYAH",
      "branch": "Bahla",
      "paid": 50.0,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "SAMI SAID AL WARDY",
          "agreementNo": "8463153",
          "paid": 50.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "hala alamri",
      "region": "Debt Collection Company",
      "branch": "Matrix Debt Collection",
      "paid": 40.0,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "hisham shah alzadjali",
          "agreementNo": "113936590",
          "paid": 40.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Iman",
      "region": "Debt Collection Company",
      "branch": "Compass Risk Support Services",
      "paid": 39.49,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "ALMEQDAD ALI ZAHIR AL ABRI",
          "agreementNo": "116758235",
          "paid": 39.49,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Yustina",
      "region": "Debt Collection Company",
      "branch": "Compass Risk Support Services",
      "paid": 35.0,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "Badar Said Hamood Al Qarwashi",
          "agreementNo": "109600289",
          "paid": 35.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Maryam Rashid",
      "region": "Debt Collection Company",
      "branch": "Compass Risk Support Services",
      "paid": 33.0,
      "adj": 0.0,
      "count": 3,
      "debtors": [
        {
          "name": "abdulaziz masoud alalawi",
          "agreementNo": "112620036",
          "paid": 20.0,
          "adj": 0.0
        },
        {
          "name": "AHMED BAL ADAI SHAMIS AL BATTASHI",
          "agreementNo": "112052411",
          "paid": 5.0,
          "adj": 0.0
        },
        {
          "name": "SALIM MOHAMMED ABDULLAH AL-BREIKI",
          "agreementNo": "115735616",
          "paid": 8.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Fahad Said Al Ghaiti",
      "region": "Musandam, Al Burimai and Al Dahirah",
      "branch": "Al-Buraimi",
      "paid": 30.0,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "Talal hassan al dhabari",
          "agreementNo": "102251990",
          "paid": 30.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Rayan",
      "region": "Debt Collection Company",
      "branch": "Compass Risk Support Services",
      "paid": 25.0,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "KHALIFA KHADAM AL MUJAINI",
          "agreementNo": "111700565",
          "paid": 25.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Tharaya Muhanna Al-Rashdi",
      "region": "MUSCAT AND AL DAKHILIYAH",
      "branch": "Izki",
      "paid": 20.061,
      "adj": 0.0,
      "count": 2,
      "debtors": [
        {
          "name": "FAHAD ABDULLAH AL WAHAIBI",
          "agreementNo": "116295570",
          "paid": 10.0,
          "adj": 0.0
        },
        {
          "name": "RANIA RABIA ALRIYAMI",
          "agreementNo": "114462331",
          "paid": 10.061,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Marwa Juma Mubarak",
      "region": "North and South Al Shaurqiah and Al Wasatah",
      "branch": "Musirah",
      "paid": 20.015,
      "adj": 0.0,
      "count": 2,
      "debtors": [
        {
          "name": "Bdsr Slatan Bni arabh",
          "agreementNo": "111586756",
          "paid": 10.0,
          "adj": 0.0
        },
        {
          "name": "AMINA SHINAIN AL SULAIMI",
          "agreementNo": "111681996",
          "paid": 10.015,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Aisha Al-Tawbiya",
      "region": "South and North Al Batinah",
      "branch": "Sohar",
      "paid": 20.0,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "SAIF SULTAN AL MAMARI",
          "agreementNo": "106749985",
          "paid": 20.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Safiya",
      "region": "Debt Collection Company",
      "branch": "Compass Risk Support Services",
      "paid": 20.0,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "AHMED ABDULLAH AL ALAWI",
          "agreementNo": "7219611",
          "paid": 20.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Aida Kasaf Al Nofli",
      "region": "South and North Al Batinah",
      "branch": "Shinas",
      "paid": 20.0,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "ASAAD AL KHAMIS AL SAADI",
          "agreementNo": "43129699",
          "paid": 20.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Suliman mosa AL Balushi",
      "region": "South and North Al Batinah",
      "branch": "Barka",
      "paid": 19.085,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "SALIM MOHAMMED AL MAQBALI",
          "agreementNo": "115324999",
          "paid": 19.085,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Sultan Hilal Al Busaidi",
      "region": "MUSCAT AND AL DAKHILIYAH",
      "branch": "Nizwa",
      "paid": 15.0,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "SAMI MALALLAH AL ZADJALI",
          "agreementNo": "106581478",
          "paid": 15.0,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "Abdul Aziz",
      "region": "Debt Collection Company",
      "branch": "Matrix Debt Collection",
      "paid": 10.235,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "SALIM KHAMIS RASHID AL JABRI",
          "agreementNo": "98551103",
          "paid": 10.235,
          "adj": 0.0
        }
      ]
    },
    {
      "collector": "OmniaH",
      "region": "Debt Collection Company",
      "branch": "Compass Risk Support Services",
      "paid": 10.0,
      "adj": 0.0,
      "count": 1,
      "debtors": [
        {
          "name": "waleed said albusaidi",
          "agreementNo": "113842818",
          "paid": 10.0,
          "adj": 0.0
        }
      ]
    }
  ]
}
};

function detectAndDecode(buffer) {
  const bytes = new Uint8Array(buffer);

  // ── ابحث عن BOM (FF FE) في أول 10 بايتات ─────────────────────────────
  let bomPos = -1;
  for (let i = 0; i < Math.min(10, bytes.length - 1); i++) {
    if (bytes[i] === 0xFF && bytes[i+1] === 0xFE) { bomPos = i; break; }
  }

  if (bomPos >= 0) {
    try {
      const decoder = new TextDecoder("utf-16-le");
      const slice = buffer.slice(bomPos + 2);
      return decoder.decode(slice);
    } catch(e) {
      const start = bomPos + 2;
      const chars = [];
      for (let i = start; i + 1 < bytes.length; i += 2) {
        const c = bytes[i] | (bytes[i+1] << 8);
        if (c !== 0) chars.push(String.fromCharCode(c));
      }
      return chars.join('');
    }
  }

  // ── فحص UTF-16-LE بدون BOM ──────────────────────────────────────────────
  let scanStart = 0;
  while (scanStart < 10 && bytes[scanStart] === 0x20) scanStart++;
  let nullCount = 0;
  for (let i = scanStart; i < Math.min(scanStart + 50, bytes.length - 1); i += 2) {
    if (bytes[i] !== 0 && bytes[i+1] === 0) nullCount++;
  }

  if (nullCount > 5) {
    try {
      const decoder = new TextDecoder("utf-16-le");
      const slice = buffer.slice(scanStart);
      const text = decoder.decode(slice);
      return text.replace(/^\uFEFF/, '');
    } catch(e) {
      const chars = [];
      for (let i = scanStart; i + 1 < bytes.length; i += 2) {
        const c = bytes[i] | (bytes[i+1] << 8);
        if (c !== 0 && c !== 0xFEFF) chars.push(String.fromCharCode(c));
      }
      return chars.join('');
    }
  }

  // ── UTF-8 / Latin-1 ────────────────────────────────────────────────────
  try {
    const decoder = new TextDecoder("utf-8");
    let start = 0;
    while (start < 10 && (bytes[start] === 0x20 || bytes[start] === 0xEF || bytes[start] === 0xBB || bytes[start] === 0xBF)) start++;
    return decoder.decode(buffer.slice(start));
  } catch(e) {
    let start = 0;
    while (start < 10 && bytes[start] === 0x20) start++;
    const chars = [];
    for (let i = start; i < bytes.length; i++) chars.push(String.fromCharCode(bytes[i]));
    return chars.join('').replace(/^[ÿþÿþï»¿]+/, '');
  }
}

// ── parseXLS: يقرأ ملف Excel بـ SheetJS ويدعم .xlsx/.xls/.tsv ────────────
async function parseXLS(file) {
  // ── استراتيجية الإقراء: نجرب 3 طرق بالترتيب ─────────────────────────

  const readAsText = (f, enc) => new Promise((res, rej) => {
    const r = new FileReader();
    r.onload  = e => res(e.target.result);
    r.onerror = () => rej(new Error('فشل قراءة الملف بـ ' + enc));
    r.readAsText(f, enc);
  });

  const readAsBuffer = (f) => new Promise((res, rej) => {
    const r = new FileReader();
    r.onload  = e => res(e.target.result);
    r.onerror = () => rej(new Error('فشل قراءة الملف'));
    r.readAsArrayBuffer(f);
  });

  // ── تحليل النص إلى صفوف ─────────────────────────────────────────────
  const parseText = (raw) => {
    // إزالة BOM وأي رموز غريبة
    const text = raw
      .replace(/^\uFEFF/, '')
      .replace(/^[\s\xFF\xFE]+/, '');

    const lines = text.split(/\r?\n/).filter(l => l.trim());
    if (lines.length < 2) return null;

    const headers = lines[0].split('\t').map(h =>
      h.replace(/\uFEFF/g,'').replace(/\r/g,'').replace(/"/g,'').trim()
    );

    // تحقق من وجود الأعمدة المطلوبة
    if (!headers.includes('Region') && !headers.includes('Paid Amount')) {
      console.warn('[parseXLS] Headers found:', headers.slice(0,8).join(', '));
      return null;
    }

    const rows = lines.slice(1)
      .filter(l => l.trim())
      .map(line => {
        const v = line.split('\t');
        const o = {};
        headers.forEach((h, i) => {
          o[h] = (v[i] || '').replace(/\r/g,'').replace(/"/g,'').trim();
        });
        return o;
      })
      .filter(r => r['Region']);

    console.log('[parseXLS] Parsed', rows.length, 'rows, headers:', headers.slice(0,6).join(', '));
    return rows;
  };

  // ── محاولة SheetJS (إذا كان محملاً) ─────────────────────────────────
  const tryXLSX = async () => {
    try {
      const XLSX = window.XLSX;
      if (!XLSX) return null;
      const buf = await readAsBuffer(file);
      const wb = XLSX.read(new Uint8Array(buf), { type: 'array' });
      let wsName = wb.SheetNames[0];
      for (const name of wb.SheetNames) {
        const ws = wb.Sheets[name];
        const s  = XLSX.utils.sheet_to_json(ws, { header:1, range:0, defval:'' });
        const h  = (s[0]||[]).map(v => String(v||'').trim());
        if (h.includes('Region') || h.includes('Paid Amount')) { wsName = name; break; }
      }
      const rows = XLSX.utils.sheet_to_json(wb.Sheets[wsName], { raw:false, defval:'' });
      if (rows.length > 0) { console.log('[parseXLS] SheetJS OK:', rows.length); return rows; }
      return null;
    } catch(e) { console.warn('[parseXLS] SheetJS failed:', e.message); return null; }
  };

  // ── ترتيب المحاولات ──────────────────────────────────────────────────
  let rows = null;

  // 1. SheetJS
  rows = await tryXLSX();

  // 2. UTF-16 LE (الأكثر شيوعاً لـ Excel export)
  if (!rows) {
    try {
      const t = await readAsText(file, 'UTF-16LE');
      rows = parseText(t);
      if (rows) console.log('[parseXLS] UTF-16LE OK');
    } catch(e) { console.warn('[parseXLS] UTF-16LE failed:', e.message); }
  }

  // 3. UTF-8
  if (!rows) {
    try {
      const t = await readAsText(file, 'UTF-8');
      rows = parseText(t);
      if (rows) console.log('[parseXLS] UTF-8 OK');
    } catch(e) { console.warn('[parseXLS] UTF-8 failed:', e.message); }
  }

  // 4. Windows-1252
  if (!rows) {
    try {
      const t = await readAsText(file, 'windows-1252');
      rows = parseText(t);
      if (rows) console.log('[parseXLS] windows-1252 OK');
    } catch(e) { console.warn('[parseXLS] windows-1252 failed:', e.message); }
  }

  // 5. ArrayBuffer + detectAndDecode (الاحتياطي الأخير)
  if (!rows) {
    try {
      const buf = await readAsBuffer(file);
      const text = detectAndDecode(buf);
      rows = parseText(text);
      if (rows) console.log('[parseXLS] detectAndDecode OK');
    } catch(e) { console.warn('[parseXLS] detectAndDecode failed:', e.message); }
  }

  if (!rows || rows.length === 0) {
    throw new Error(
      'تعذّر قراءة الملف. تأكد أن الملف بصيغة .xls أو .xlsx أو .tsv وأنه يحتوي أعمدة: Region, Paid Amount, Branch, Collector'
    );
  }

  // ══════════════════════════════════════════════════════════════════════
  // تحليل البيانات بدقة
  // ══════════════════════════════════════════════════════════════════════
  const n = v => {
    if (v == null || v === '') return 0;
    return parseFloat(String(v).replace(/,/g,'').replace(/[^0-9.-]/g,'')) || 0;
  };

  const REG_AR = {
    "Dhofar":                                        "ظفار",
    "Dhofar ":                                       "ظفار",
    "Musandam, Al Burimai and Al Dahirah":           "مسندم، البريمي والظاهرة",
    "MUSCAT AND AL DAKHILIYAH":                      "مسقط والداخلية",
    "North and South Al Shaurqiah and Al Wasatah":   "الشرقية الشمالية والجنوبية والوسطى",
    "South and North Al Batinah":                    "الباطنة الشمالية والجنوبية"
  };

  // ── بيانات المحافظ الحقيقية من ملف complaints ────────────────────────
  const PORT = {
    regions: {
      "Dhofar":                                      { portAmt: 1946.119,    portCnt: 25   },
      "Dhofar ":                                     { portAmt: 1946.119,    portCnt: 25   },
      "Musandam, Al Burimai and Al Dahirah":         { portAmt: 37449.515,   portCnt: 491  },
      "MUSCAT AND AL DAKHILIYAH":                    { portAmt: 68131.760,   portCnt: 1279 },
      "North and South Al Shaurqiah and Al Wasatah": { portAmt: 164461.982,  portCnt: 2463 },
      "South and North Al Batinah":                  { portAmt: 93541.029,   portCnt: 2219 }
    },
    dc: {
      "Matrix Debt Collection":        { portAmt: 2882018.894, portCnt: 23398 },
      "National Center":               { portAmt: 1014744.033, portCnt: 6741  },
      "Compass Risk Support Services": { portAmt: 386199.737,  portCnt: 3992  },
      "Ejada":                         { portAmt: 0,           portCnt: 1938  },
      "Tahseel United":                { portAmt: 0, principalAmt: 0, portCnt: 108   },
      "High Speed Company":            { portAmt: 0, principalAmt: 0, portCnt: 35    },
      "High Speed company":            { portAmt: 0, principalAmt: 0, portCnt: 35    }
    },
    ho: {
      "Legal - DR. Sarhaan": { portAmt: 3229651.681, portCnt: 3691, closed:67, active:3624, principalAmt: 3301711.348 },
      "Documentation- Omantel": { portAmt: 471756.070,  portCnt: 1099, closed:8, active:1091 },
      "Legal -Oneic":{portAmt:64528.164,portCnt:144,principalAmt:64528.164,closed:3,active:141},"Refund - before legal":{portAmt:0,portCnt:0,closed:0,active:0},"Refund - after legal":{portAmt:0,portCnt:0,closed:0,active:0},
      "HO":                  { portAmt: 0,           portCnt: 340  },
      "Non-due accounts":    { portAmt: 0,           portCnt: 340  }
    }
  };

  const regMap = {}, dcMap = {}, hoMap = {};

  rows.forEach(row => {
    const region  = (row['Region']      || row['region']      || '').trim();
    const paid    = n(row['Paid Amount']|| row['paid_amount']  || row['Paid'] || 0);
    const adj     = n(row['Adjustment'] || row['adjustment']   || row['Adj']  || 0);
    const _osRaw  = row['O/S Amount'] != null && row['O/S Amount'] !== '' ? row['O/S Amount'] : (row['os_amount'] != null && row['os_amount'] !== '' ? row['os_amount'] : (row['Outstanding'] != null && row['Outstanding'] !== '' ? row['Outstanding'] : (row['O/S'] != null && row['O/S'] !== '' ? row['O/S'] : 0)));
    const osAmt   = parseFloat(String(_osRaw).replace(/,/g,'')) || 0;
    const rowPort  = osAmt; // O/S Amount
    const col     = (row['Collector']   || row['collector']    || '').trim();
    const branch  = (row['Branch']      || row['branch']       || '').trim();

    if (region === 'Debt Collection Company') {
      const key = branch || col || 'Unknown';
      if (!dcMap[key]) dcMap[key] = { paid:0, adj:0, count:0, paidCount:0, adjCount:0, osAmt:0, principalAmt:0 };
      dcMap[key].paid  += paid; dcMap[key].adj += adj; dcMap[key].count++; dcMap[key].osAmt += rowPort; dcMap[key].principalAmt += n(row['Principal Amount']||0);
      if (paid>0) dcMap[key].paidCount++;
      if (adj >0) dcMap[key].adjCount++;

    } else if (region === 'Head Office' || region === 'Legal' || region === 'Legal ') {
      const colL = col.toLowerCase();
      let key = 'HO';
      if      (colL.includes('dr') || colL.includes('sarhaan') || colL.includes('sarhan')) key = 'Legal - DR. Sarhaan';
      else if (colL.includes('doc'))  key = 'Documentation- Omantel';
      else if (colL.includes('non-due') || colL.includes('nondue')) key = 'HO';
      else if (col.trim().toUpperCase() === 'HO') key = 'HO';
      else if (colL.includes('refund') && colL.includes('before')) key = 'Refund - before legal';
      else if (colL.includes('refund') && colL.includes('after'))  key = 'Refund - after legal';
      else if (colL.includes('refund')) key = 'Refund - before legal';
      else if (colL.includes('saif')) key = 'Legal -Oneic';
      else if (col.trim() === '')     key = 'Legal -Oneic';
      else                            key = 'Legal -Oneic';
      if (!hoMap[key]) hoMap[key] = { paid:0, adj:0, count:0, closed:0, active:0, principalAmt:0 };
      hoMap[key].paid += paid; hoMap[key].adj += adj; hoMap[key].count++; hoMap[key].principalAmt += n(row['Principal Amount']||0);
      if (key==='Legal -Oneic'||key==='Documentation- Omantel'||key==='Legal - DR. Sarhaan'||key==='HO'||key==='Refund - before legal'||key==='Refund - after legal') { if (osAmt<=0) hoMap[key].closed++; else hoMap[key].active++; }

    } else if (REG_AR[region]) {
      if (!regMap[region]) regMap[region] = { paid:0, adj:0, count:0, paidCount:0, adjCount:0, cMap:{}, principalAmt:0 };
      regMap[region].paid  += paid; regMap[region].adj += adj; regMap[region].count++;
      regMap[region].principalAmt = (regMap[region].principalAmt||0) + n(row['Principal Amount']||0);
      if (paid>0) regMap[region].paidCount++;
      if (adj >0) regMap[region].adjCount++;
      if (col) {
        if (!regMap[region].cMap[col]) regMap[region].cMap[col] = { paid:0, adj:0, count:0, paidCount:0, adjCount:0, osAmt:0, principalAmt:0 };
        regMap[region].cMap[col].paid  += paid;
        regMap[region].cMap[col].adj   += adj;
        regMap[region].cMap[col].count++;
        regMap[region].cMap[col].osAmt += rowPort;
        regMap[region].cMap[col].principalAmt += n(row['Principal Amount']||0);
        if (paid>0) regMap[region].cMap[col].paidCount++;
        if (adj >0) regMap[region].cMap[col].adjCount++;
      }
    }
  });

  // ── بناء المناطق ──────────────────────────────────────────────────────
  const REG_ORDER = [
    "Dhofar ","Dhofar",
    "Musandam, Al Burimai and Al Dahirah",
    "MUSCAT AND AL DAKHILIYAH",
    "North and South Al Shaurqiah and Al Wasatah",
    "South and North Al Batinah"
  ];
  const regions = REG_ORDER.filter(k => regMap[k]).map(k => ({
    id: k.toLowerCase().replace(/\s+/g,'_').replace(/[^a-z0-9_]/g,''),
    nameAr: REG_AR[k], nameEn: k.trim(),
    paid: regMap[k].paid, adj: regMap[k].adj,
    count: regMap[k].count||0,
    paidCount: regMap[k].paidCount||0,
    adjCount:  regMap[k].adjCount||0,
    portAmt: regMap[k].principalAmt||(PORT.regions[k]||{portAmt:0}).portAmt,
    principalAmt: regMap[k].principalAmt||0,
    portCnt: regMap[k].count || (PORT.regions[k]||{portCnt:0}).portCnt,
    collectors: Object.entries(regMap[k].cMap)
      .map(([nm,d]) => ({
        name:nm, paid:d.paid, adj:d.adj,
        count:d.count||0, paidCount:d.paidCount||0, adjCount:d.adjCount||0,
        portAmt:d.osAmt||0, portCnt:d.count||0, principalAmt:d.principalAmt||0
      }))
      .sort((a,b) => { var pa=a.principalAmt>0?a.principalAmt:(a.portAmt||0); var pb=b.principalAmt>0?b.principalAmt:(b.portAmt||0); var pctA=pa>0?((a.paid||0)+(a.adj||0))/pa:0; var pctB=pb>0?((b.paid||0)+(b.adj||0))/pb:0; return pctB-pctA; })
  }));

  // ── شركات التحصيل ─────────────────────────────────────────────────────
  const DC_REQUIRED = ["Matrix Debt Collection","National Center","Compass Risk Support Services","Ejada","Tahseel United","High Speed Company"];
  const dcList = Object.entries(dcMap).map(([nm,d]) => {
    const p = PORT.dc[nm.trim()] || {portAmt:0,portCnt:0};
    // portAmt: من الملف (osAmt) إذا متاح، وإلا من PORT.dc
    const computedPortAmt = d.principalAmt > 0 ? d.principalAmt : p.portAmt;
    return { name:nm.trim(), paid:d.paid, adj:d.adj,
      count:d.count||0, paidCount:d.paidCount||0, adjCount:d.adjCount||0,
      portAmt:computedPortAmt, portCnt:d.count||p.portCnt, osAmt:d.osAmt||0 };
  });
  DC_REQUIRED.forEach(nm => {
    if (!dcList.find(c=>c.name.toLowerCase()===nm.toLowerCase())) {
      const p = PORT.dc[nm]||{portAmt:0,portCnt:0};
      dcList.push({name:nm,paid:0,adj:0,count:0,paidCount:0,adjCount:0,portAmt:p.portAmt,portCnt:p.portCnt});
    }
  });
  const debtCompanies = dcList.sort((a,b)=>((b.paid||0)+(b.adj||0))-((a.paid||0)+(a.adj||0)));

  // ── المكتب الرئيسي ────────────────────────────────────────────────────
  const HO_KEYS = ["Legal - DR. Sarhaan","Documentation- Omantel","HO","Legal -Oneic"];
  const headOffice = HO_KEYS.map(nm => {
    const d = hoMap[nm]||{paid:0,adj:0,count:0};
    const p = PORT.ho[nm]||{portAmt:0,portCnt:0};
    const HO_DISPLAY = {"HO":"Non-due accounts","Non-due accounts":"Non-due accounts","Documentation- Omantel":"Documentation- Omantel","Legal - DR. Sarhaan":"Legal - DR. Sarhaan","Legal -Oneic":"Legal -Oneic"};
    return {name:HO_DISPLAY[nm]||nm, paid:d.paid, adj:d.adj, count:d.count||0, closed:d.closed||0, active:d.active||0,
      portAmt: Math.max(0, d.principalAmt||p.portAmt||0), portCnt: p.portCnt||0,
      principalAmt: p.principalAmt||0};
  });
  const HO_DN={"HO":"Non-due accounts","Non-due accounts":"Non-due accounts"};
  Object.keys(hoMap).forEach(k => {
    if (!HO_KEYS.includes(k))
      headOffice.push({name:HO_DN[k]||k,paid:hoMap[k].paid,adj:hoMap[k].adj,count:hoMap[k].count||0,portAmt:0,portCnt:0});
  });

  return {
    uploadDate: new Date().toISOString().split('T')[0],
    totalRecords: rows.length,
    regions, debtCompanies, headOffice,
    totalPortfolio: {
      amt: rows.reduce((s,r)=>s+n(r['Principal Amount']||0),0),
      cnt: rows.length,
      outstanding: rows.reduce((s,r)=>s+n(r['O/S Amount']||0),0)
    }
  };
}



const FIREBASE_URL = "https://oneic-dashboard-default-rtdb.firebaseio.com";

// ── Firebase Realtime Database helpers ───────────────────────────────────────
async function sbGet(table) {
  const key = table === 'oneic_data' ? 'main' : 'bulk';
  const res = await fetch(FIREBASE_URL + '/' + key + '.json');
  if (!res.ok) throw new Error(await res.text());
  return await res.json();
}

async function sbUpsert(table, obj) {
  const key = table === 'oneic_data' ? 'main' : 'bulk';
  const data = obj.payload || obj;
  const res = await fetch(FIREBASE_URL + '/' + key + '.json', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data) // _updatedAt يأتي من البيانات نفسها
  });
  if (!res.ok) throw new Error(await res.text());
  return await res.json();
}

const omr = n => new Intl.NumberFormat("en-US",{minimumFractionDigits:3,maximumFractionDigits:3}).format(n||0);




// ── BulkPaymentSection ────────────────────────────────────────────────────────


// ── Bulk Payment Print ────────────────────────────────────────────────────────

function handleBulkPrint(d, filterFrom, filterTo) {
  // طباعة Bulk Payment Report
  const w = window.open('','_blank','width=900,height=700');
  if (!w) return;
  const omr = n => new Intl.NumberFormat('en-US',{minimumFractionDigits:3,maximumFractionDigits:3}).format(n||0)+' OMR';
  const totalPaid = (d.totalPaid||0);
  const totalAdj  = (d.totalAdj||0);
  const html = '<!DOCTYPE html><html dir="rtl"><head><meta charset="UTF-8">'+
    '<title>Bulk Payment Report</title>'+
    '<link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;700;800;900&display=swap" rel="stylesheet">'+
    '<style>body{font-family:Cairo,sans-serif;direction:rtl;padding:20px;background:#f5f0eb}'+
    '.page{background:#fff;padding:20px;border-radius:12px;max-width:900px;margin:0 auto}'+
    'table{width:100%;border-collapse:collapse;margin-top:16px}'+
    'th{background:#1e3a5f;color:#fff;padding:8px 12px}'+
    'td{padding:7px 12px;border-bottom:1px solid #f0ece8}'+
    'tr:nth-child(even){background:#f8f4f1}'+
    '@media print{body{background:#fff}.no-print{display:none}}'+
    '</style></head><body>'+
    '<div class="page">'+
    '<div style="display:flex;justify-content:space-between;align-items:center;border-bottom:2px solid #1e3a5f;padding-bottom:12px;margin-bottom:16px">'+
    '<div><div style="font-size:20px;font-weight:900;color:#1e3a5f">ONEIC</div>'+
    '<div style="font-size:13px;color:#555">Bulk Payment Report</div></div>'+
    '<div style="text-align:left;font-size:12px;color:#888">'+
    '<div>'+(filterFrom||d.dateRange?.from||'')+' → '+(filterTo||d.dateRange?.to||'')+'</div>'+
    '<div>'+new Date().toLocaleDateString(lang==='en'?'en-GB':'ar-OM')+'</div></div></div>'+
    '<div style="display:flex;gap:16px;margin-bottom:16px">'+
    ['المدفوع|'+omr(totalPaid)+'|#16a34a','التسويات|'+omr(totalAdj)+'|#d97706','الإجمالي|'+omr(totalPaid+totalAdj)+'|#1e3a5f'].map(s=>{
      const [l,v,c]=s.split('|');
      return '<div style="flex:1;background:#f8f4f1;border-radius:8px;padding:12px;text-align:center">'+
        '<div style="font-size:11px;color:#888">'+l+'</div>'+
        '<div style="font-size:16px;font-weight:900;color:'+c+'">'+v+'</div></div>';
    }).join('')+'</div>'+
    '<table><thead><tr><th>#</th><th>التاريخ</th><th>المدفوع</th><th>التسويات</th><th>الإجمالي</th><th>دفعات</th></tr></thead>'+
    '<tbody>'+(d.daily||[]).map((day,i)=>
      '<tr><td>'+(i+1)+'</td><td>'+day.date+'</td>'+
      '<td style="color:#16a34a;font-weight:700">'+omr(day.paid)+'</td>'+
      '<td style="color:#d97706;font-weight:700">'+omr(day.adj||0)+'</td>'+
      '<td style="font-weight:900">'+omr(day.paid+(day.adj||0))+'</td>'+
      '<td>'+day.count+'</td></tr>'
    ).join('')+'</tbody></table>'+
    '<button class="no-print" onclick="window.print()" style="margin-top:16px;background:#1e3a5f;color:#fff;border:none;border-radius:8px;padding:10px 24px;font-family:Cairo,sans-serif;font-size:14px;font-weight:700;cursor:pointer">طباعة / PDF</button>'+
    '</div></body></html>';
  w.document.write(html);
  w.document.close();
}


// ── VerifyModal ────────────────────────────────────────────────────────────
function VerifyModal({pending, onConfirm, onReject}) {
  const { lang } = useLang();
  if (!pending) return null;
  const { fileName, fileSize, data } = pending;
  const totalPaid = (data.regions||[]).reduce((s,r)=>s+r.paid,0)
    + (data.debtCompanies||[]).reduce((s,r)=>s+r.paid,0)
    + (data.headOffice||[]).reduce((s,r)=>s+Math.max(0,r.paid||0),0);
  const totalAdj = (data.regions||[]).reduce((s,r)=>s+r.adj,0)
    + (data.debtCompanies||[]).reduce((s,r)=>s+r.adj,0)
    + (data.headOffice||[]).reduce((s,r)=>s+Math.max(0,r.adj||0),0);
  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.6)",zIndex:9999,display:"flex",alignItems:"center",justifyContent:"center",padding:16}}>
      <div style={{background:"#fff",borderRadius:18,padding:28,maxWidth:460,width:"100%",boxShadow:"0 20px 60px rgba(0,0,0,0.3)"}}>
        <div style={{fontSize:18,fontWeight:900,color:"#1e3a5f",marginBottom:8}}>{t("📂 تأكيد رفع الملف",lang)}</div>
        <div style={{fontSize:13,color:"#555",marginBottom:16}}>{fileName} — {fileSize} MB</div>
        <div style={{display:"flex",gap:10,marginBottom:16}}>
          {[[t("المدفوع",lang),totalPaid,"#16a34a"],[t("التسويات",lang),totalAdj,"#d97706"],[t("الإجمالي",lang),totalPaid+totalAdj,"#e85d20"]].map(([l,v,c])=>(
            <div key={l} style={{flex:1,background:"#f8f4f1",borderRadius:10,padding:"10px 8px",textAlign:"center"}}>
              <div style={{fontSize:10,color:"#888",marginBottom:3}}>{l}</div>
              <div style={{fontSize:13,fontWeight:900,color:c}}>{new Intl.NumberFormat("en-US",{minimumFractionDigits:3}).format(v)}</div>
            </div>
          ))}
        </div>
        <div style={{fontSize:12,color:"#888",marginBottom:20}}>
          {data.totalRecords?.toLocaleString()} {t("سجل",lang)} · {data.regions?.length} {t("منطقة",lang)} · {data.debtCompanies?.length} {t("شركة",lang)}
        </div>
        <div style={{display:"flex",gap:10}}>
          <button onClick={onConfirm} style={{flex:1,background:"#e85d20",color:"#fff",border:"none",borderRadius:10,padding:"12px",fontSize:14,fontWeight:800,cursor:"pointer"}}>{t("✅ تأكيد الحفظ",lang)}</button>
          <button onClick={onReject} style={{flex:1,background:"#f0ece8",color:"#666",border:"none",borderRadius:10,padding:"12px",fontSize:14,fontWeight:700,cursor:"pointer"}}>{t("❌ إلغاء",lang)}</button>
        </div>
      </div>
    </div>
  );
}

// ── useWindowSize ──────────────────────────────────────────────────────────
function useWindowSize() {
  const [size, setSize] = useState({ w: window.innerWidth, h: window.innerHeight });
  useEffect(() => {
    const fn = () => setSize({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return size;
}

// ── Clock ──────────────────────────────────────────────────────────────────
function Clock({ small }) {
  const { lang } = useLang();
  const [t, setT] = useState(new Date());
  useEffect(()=>{const id=setInterval(()=>setT(new Date()),1000);return()=>clearInterval(id);},[]);
  const hh=String(t.getHours()).padStart(2,'0');
  const mm=String(t.getMinutes()).padStart(2,'0');
  const ss=String(t.getSeconds()).padStart(2,'0');
  const days   = lang==='en'
    ? ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
    : ['الأحد','الاثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت'];
  const months = lang==='en'
    ? ['January','February','March','April','May','June','July','August','September','October','November','December']
    : ['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'];
  return (
    <div style={{textAlign:"right"}}>
      <div style={{fontSize:small?18:26,fontWeight:800,color:"#e85d20",letterSpacing:2,fontVariantNumeric:"tabular-nums",lineHeight:1}}>
        {hh}:{mm}:{ss}
      </div>
      {!small&&<div style={{fontSize:13,color:"#555",marginTop:4,fontWeight:600}}>
        {days[t.getDay()]} {t.getDate()} {months[t.getMonth()]} {t.getFullYear()}
      </div>}
    </div>
  );
}

// ── UploadBtn ─────────────────────────────────────────────────────────────
function UploadBtn({onFile,uploading,success,error,small,onAuth}) {
  const { lang } = useLang();
  const _auth = onAuth || ((cb)=>cb());
  const ref = useRef(null);
  return (
    <div onClick={()=>!uploading&&_auth(()=>ref.current?.click())}
      onDrop={e=>{e.preventDefault();const f=e.dataTransfer.files?.[0];if(f)_auth(()=>onFile(f));}}
      onDragOver={e=>e.preventDefault()}
      style={{border:`2px dashed ${success?"#16a34a":uploading?"#e85d20":"#ddd"}`,
        borderRadius:12,padding:small?"8px 14px":"10px 20px",cursor:uploading?"default":"pointer",
        background:success?"#f0fdf4":uploading?"#fff7f3":"#fff",
        textAlign:"center",minWidth:small?140:175,transition:"all 0.3s"}}>
      <input ref={ref} type="file" accept=".xls,.xlsx,.csv" style={{display:"none"}}
        onChange={e=>{const f=e.target.files?.[0];if(f)_auth(()=>{onFile(f);e.target.value="";}); }}/>
      {uploading?<div style={{color:"#e85d20",fontSize:13,fontWeight:700}}>{t("⏳ جاري التحليل...",lang)}</div>
       :success?<div style={{color:"#16a34a",fontSize:13,fontWeight:700}}>{t("✅ تم التحديث",lang)}</div>
       :<><div style={{fontSize:small?16:20}}>📂</div>
          <div style={{fontSize:small?12:13,color:"#e85d20",fontWeight:700,marginTop:1}}>{t("رفع ملف يومي",lang)}</div>
          {!small&&<div style={{fontSize:11,color:"#999",marginTop:1}}>{t("يستبدل البيانات تلقائياً",lang)}</div>}
        </>}
      {error&&<div style={{color:"#dc2626",fontSize:10,marginTop:3,fontWeight:700}}>⚠ {error}</div>}
    </div>
  );
}

// ── AmountCell ─────────────────────────────────────────────────────────────
function AmountCell({label,value,color,isTotal,small}) {
  return (
    <div className="amount-cell" style={{textAlign:"center",flex:1,padding:small?"4px 6px":"6px 10px"}}>
      <div style={{fontSize:small?11:13,color:"#333",fontWeight:800,marginBottom:small?3:5}}>{label}</div>
      <div style={{fontSize:isTotal?(small?17:22):(small?14:19),fontWeight:900,color,lineHeight:1}}>{value}</div>
    </div>
  );
}

// ── AmountRow ──────────────────────────────────────────────────────────────
function AmountRow({paid,adj,color,small}) {
  const { lang } = useLang();
  return (
    <div className="amount-row" style={{display:"flex",alignItems:"stretch",borderRadius:10,overflow:"hidden",border:"1px solid #f0ece8",background:"#fff"}}>
      <AmountCell label={t("المدفوع",lang)}  value={omr(paid)}     color="#16a34a" small={small}/>
      <div style={{width:1,background:"#f0ece8"}}/>
      <AmountCell label={t("التسويات",lang)} value={omr(adj)}      color="#d97706" small={small}/>
      <div style={{width:1,background:"#f0ece8"}}/>
      <AmountCell label={t("الإجمالي",lang)} value={omr(paid+adj)} color={color}   isTotal small={small}/>
    </div>
  );
}

// ── SectionHeader ──────────────────────────────────────────────────────────
function SectionHeader({title,paid,adj,color,small,portAmt,portCnt}) {
  const { lang } = useLang();
  const total = paid + adj;
  const remaining = portAmt > 0 ? portAmt - total : 0;
  const pct = portAmt > 0 ? Math.min(100,(total/portAmt)*100) : 0;

  const items = [
    {l:t("عدد الحسابات",lang),  v:(portCnt||0).toLocaleString()+" "+t("حساب",lang), c:"rgba(255,255,255,0.9)", show:true},
    {l:t("قيمة المحفظة",lang),  v:omr(portAmt)+" OMR",                   c:"#fff",                 show:portAmt>0},
    {l:t("المدفوع",lang),       v:omr(paid),                              c:"#bbf7d0",              show:true},
    {l:t("التسويات",lang),      v:omr(adj),                               c:"#fde68a",              show:true},
    {l:t("الإجمالي",lang),      v:omr(total),                             c:"#fff",                 show:true},
    {l:t("المتبقي",lang),       v:omr(remaining),                         c:"#fca5a5",              show:portAmt>0},
  ];

  return (
    <div style={{background:`linear-gradient(120deg,${color},${color}cc)`}}>
      {/* صف واحد: العنوان يسار + جميع الأرقام يمين */}
      <div style={{padding:small?"10px 14px":"12px 20px",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10}}>
        {/* اليسار: النسبة + العنوان */}
        <div style={{display:"flex",alignItems:"center",gap:10,flexShrink:0}}>
          {portAmt > 0 && (
            <div style={{background:"rgba(255,255,255,0.25)",borderRadius:20,padding:"3px 12px",fontSize:small?12:15,fontWeight:900,color:"#fff",whiteSpace:"nowrap"}}>
              {pct.toFixed(1)}%
              <span style={{fontSize:small?9:10,color:"rgba(255,255,255,0.75)",fontWeight:700,marginRight:4}}>{t("نسبة الإنجاز",lang)}</span>
            </div>
          )}
          <div style={{fontSize:small?15:19,fontWeight:900,color:"#fff"}}>{title}</div>
        </div>
        {/* اليمين: جميع الأرقام بالترتيب */}
        <div style={{display:"flex",gap:small?10:18,flexWrap:"wrap",alignItems:"center",justifyContent:"flex-end"}}>
          {items.filter(x=>x.show).map(({l,v,c})=>(
            <div key={l} style={{textAlign:"center"}}>
              <div style={{fontSize:small?9:10,color:"rgba(255,255,255,0.7)",fontWeight:700,marginBottom:2,whiteSpace:"nowrap"}}>{l}</div>
              <div style={{fontSize:small?12:15,fontWeight:900,color:c,whiteSpace:"nowrap"}}>{v}</div>
            </div>
          ))}
        </div>
      </div>
      {/* شريط الإنجاز */}
      {portAmt > 0 && (
        <div style={{padding:"0 20px 6px"}}>
          <div style={{background:"rgba(255,255,255,0.15)",borderRadius:6,height:5,overflow:"hidden"}}>
            <div style={{height:"100%",borderRadius:6,background:"rgba(255,255,255,0.7)",width:`${pct}%`}}/>
          </div>
        </div>
      )}
    </div>
  );
}

// ── EntityCard ─────────────────────────────────────────────────────────────
function EntityCard({name,paid,adj,color,rank,small,cnt,cBranch,portAmt,portCnt,principalAmt,osAmt,closed,active,refundAmt}) {
  const { lang } = useLang();
  var effClosed=closed||0;var effActive=(active)||Math.max(0,(portCnt||0)-(closed||0));
  const bKey = Object.keys(cBranch||{}).find(k => k.trim()===name?.trim() || name?.includes(k) || k.includes(name||'__'));
  const bD = bKey ? (cBranch||{})[bKey] : null;
  // قيمة المحفظة = Principal من complaintsBranchMap
  const bComp   = cBranch ? (cBranch[name]||null) : null;
  const principal4card = principalAmt||portAmt||0; // دائماً من XLS
  const cPaid   = paid||0;
  const cAdj    = adj||0;
  const total   = cPaid + cAdj; // الإجمالي = Paid + Adj من Complaints
  const allZero = total === 0 && name !== "Legal -Oneic" && name !== "Non-due accounts" && !["Ejada","Tahseel United","High Speed Company","High Speed company"].includes(name);
  // Non-due accounts: عرض كامل (عدد الحسابات + مغلقة/نشطة + مدفوع/تسويات/إجمالي)
  if (name === "Non-due accounts") {
    return (<div style={{background:"#fff",borderRadius:13,border:`1.5px solid ${color}33`,
      boxShadow:"0 2px 10px rgba(0,0,0,0.05)",overflow:"hidden",borderRight:`5px solid ${color}`}}>
      <div style={{display:"flex",alignItems:"center",gap:10,padding:small?"10px 12px":"12px 16px",
        background:`${color}06`,borderBottom:`1px solid ${color}18`}}>
        <div style={{width:small?28:34,height:small?28:34,borderRadius:8,background:color,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:small?13:15,fontWeight:900,color:"#fff"}}>{rank||3}</div>
        <div style={{fontSize:small?13:16,fontWeight:900,color:"#000",flex:1}}>{"Non-due accounts"}</div>
      </div>
      <div style={{padding:small?"10px 12px":"12px 16px",display:"flex",flexDirection:"column",gap:8}}>
        <div style={{display:"flex",gap:6}}>
          <div style={{flex:1,background:`${color}08`,borderRadius:10,padding:small?"6px 8px":"8px 12px",border:`1px solid ${color}22`,textAlign:"center"}}>
            <div style={{fontSize:small?9:11,color:color,fontWeight:800,marginBottom:3}}>{t("عدد الحسابات",lang)}</div>
            <div style={{fontSize:small?13:16,fontWeight:900,color:color}}>{(portCnt||cnt||340).toLocaleString()}</div>
            <div style={{fontSize:small?8:9,color:"#aaa",fontWeight:600}}>{t("حساب",lang)}</div>
          </div>
          <div style={{flex:1,background:"#fee2e2",borderRadius:10,padding:small?"5px 6px":"7px 10px",border:"1px solid #fca5a5",textAlign:"center"}}>
            <div style={{fontSize:small?8:10,color:"#dc2626",fontWeight:800,marginBottom:2}}>{t("🔴 مغلقة",lang)}</div>
            <div style={{fontSize:small?12:15,fontWeight:900,color:"#dc2626"}}>{effClosed.toLocaleString()}</div>
          </div>
          <div style={{flex:1,background:"#dcfce7",borderRadius:10,padding:small?"5px 6px":"7px 10px",border:"1px solid #86efac",textAlign:"center"}}>
            <div style={{fontSize:small?8:10,color:"#16a34a",fontWeight:800,marginBottom:2}}>{t("🟢 نشطة",lang)}</div>
            <div style={{fontSize:small?12:15,fontWeight:900,color:"#16a34a"}}>{effActive.toLocaleString()}</div>
          </div>
        </div>
        <div style={{display:"flex",border:"1.5px solid #f0ece8",borderRadius:10,overflow:"hidden",background:"#fafafa"}}>
          {[[t("المدفوع",lang),cPaid,"#16a34a"],[t("التسويات",lang),cAdj,"#d97706"],[t("الإجمالي",lang),total,color]].map(([lbl,val,clr],i)=>(
            <div key={lbl} style={{flex:1,textAlign:"center",padding:small?"7px 4px":"10px 6px",
              borderRight:i<2?"1px solid #f0ece8":"none",
              background:i===2?`${clr}06`:"transparent"}}>
              <div style={{fontSize:small?10:12,color:clr,fontWeight:900,marginBottom:3,
                background:`${clr}10`,borderRadius:6,padding:"1px 5px",display:"inline-block"}}>{lbl}</div>
              <div style={{fontSize:small?13:17,fontWeight:900,color:clr}}>{omr(val)}</div>
            </div>
          ))}
        </div>
        <div style={{padding:"6px 10px",background:"#f3f4f6",borderRadius:8,textAlign:"center"}}>
          <div style={{fontSize:small?9:11,color:"#6b7280",fontStyle:"italic"}}>{t("لا توجد عليها مستحقات منذ بداية المشروع",lang)}</div>
        </div>
      </div>
    </div>);
  }

  const hasPort  = principal4card > 0;
  const hasCnt   = (portCnt||0) > 0;
  const effPort  = principal4card > 0 ? principal4card : 0;
  // إذا الشركة عندها تحصيل لكن portAmt غير محدد، استخدم التحصيل نفسه
  const displayPort = effPort > 0 ? effPort : (total>0 ? total : 0);
  const effCnt   = hasCnt  ? portCnt : (bD?.count||0);
  const remaining = effPort > 0 ? effPort - total : 0;
  const pct      = effPort > 0 ? Math.min(100,(total/effPort)*100) : (total>0?100:0);
  const pctVal   = displayPort > 0 ? Math.min(100,(total/displayPort)*100) : 0; // OS/P*100

  if (allZero) {
    return (
      <div style={{background:"#fafafa",borderRadius:13,border:"1.5px dashed #e0dbd6",
        padding:small?"10px 14px":"12px 18px",
        display:"flex",justifyContent:"space-between",alignItems:"center",
        borderRight:`4px solid ${color}30`}}>
        <div style={{fontSize:13,fontWeight:800,color:"#888"}}>{name}</div>
        <div style={{display:"flex",gap:small?8:12,alignItems:"center"}}>
          <span style={{fontSize:11,color:"#bbb",fontStyle:"italic"}}>{t("لا توجد حركات",lang)}</span>
          <div style={{background:color,color:"#fff",borderRadius:"50%",width:22,height:22,
            display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:900}}>{rank}</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{background:"#fff",borderRadius:13,border:`1.5px solid ${color}33`,
      boxShadow:"0 2px 10px rgba(0,0,0,0.05)",overflow:"hidden",borderRight:`5px solid ${color}`}}>

      {/* ── اسم + رقم ── */}
      <div style={{display:"flex",alignItems:"center",gap:10,padding:small?"10px 12px":"12px 16px",
        background:`${color}06`,borderBottom:`1px solid ${color}18`}}>
        <div style={{width:small?28:34,height:small?28:34,borderRadius:8,background:color,flexShrink:0,
          display:"flex",alignItems:"center",justifyContent:"center",fontSize:small?13:15,fontWeight:900,color:"#fff"}}>{rank}</div>
        <div style={{fontSize:small?13:16,fontWeight:900,color:"#000",flex:1,lineHeight:1.2,display:"flex",alignItems:"center",gap:8}}>
            {name}
            {["Ejada","Tahseel United","High Speed Company","High Speed company"].includes(name) && (
              <span style={{fontSize:small?9:10,fontWeight:800,color:"#ef4444",background:"#fee2e2",border:"1px solid #fca5a5",borderRadius:20,padding:"2px 8px",whiteSpace:"nowrap",flexShrink:0}}>{t("🔴 غير نشطة",lang)}</span>
            )}
          </div>
      </div>

      <div style={{padding:small?"10px 12px":"12px 16px",display:"flex",flexDirection:"column",gap:8}}>

        {/* صف 1: قيمة المحفظة + عدد الحسابات */}
        {(effPort>0||effCnt>0) && (
          <div style={{display:"flex",gap:6}}>
            {displayPort>0 && (
              <div style={{flex:1,background:`${color}08`,borderRadius:10,padding:small?"6px 8px":"8px 12px",
                border:`1px solid ${color}22`,textAlign:"center"}}>
                <div style={{fontSize:small?9:11,color:color,fontWeight:800,marginBottom:3}}>{t("قيمة المحفظة",lang)}</div>
                <div style={{fontSize:small?13:16,fontWeight:900,color:color,direction:"ltr"}}>{omr(displayPort)}</div>
                <div style={{fontSize:small?8:9,color:"#aaa",fontWeight:600}}>OMR</div>
              </div>
            )}
            {effCnt>0 && (
              <div style={{flex:1,background:`${color}08`,borderRadius:10,padding:small?"6px 8px":"8px 12px",
                border:`1px solid ${color}22`,textAlign:"center"}}>
                <div style={{fontSize:small?9:11,color:color,fontWeight:800,marginBottom:3}}>{t("عدد الحسابات",lang)}</div>
                <div style={{fontSize:small?13:16,fontWeight:900,color:color}}>{effCnt.toLocaleString()}</div>
                <div style={{fontSize:small?8:9,color:"#aaa",fontWeight:600}}>{t("حساب",lang)}</div>
              </div>
            )}
            {(name==="Legal -Oneic"||name==="Documentation- Omantel"||name==="Legal - DR. Sarhaan"||name==="Refund - before legal"||name==="Refund - after legal")&&<div style={{flex:1,background:"#fee2e2",borderRadius:10,padding:small?"5px 6px":"7px 10px",border:"1px solid #fca5a5",textAlign:"center"}}><div style={{fontSize:small?8:10,color:"#dc2626",fontWeight:800,marginBottom:2}}>{t("🔴 مغلقة",lang)}</div><div style={{fontSize:small?12:15,fontWeight:900,color:"#dc2626"}}>{effClosed.toLocaleString()}</div></div>}
            {(name==="Legal -Oneic"||name==="Documentation- Omantel"||name==="Legal - DR. Sarhaan"||name==="Refund - before legal"||name==="Refund - after legal")&&<div style={{flex:1,background:"#dcfce7",borderRadius:10,padding:small?"5px 6px":"7px 10px",border:"1px solid #86efac",textAlign:"center"}}><div style={{fontSize:small?8:10,color:"#16a34a",fontWeight:800,marginBottom:2}}>{t("🟢 نشطة",lang)}</div><div style={{fontSize:small?12:15,fontWeight:900,color:"#16a34a"}}>{effActive.toLocaleString()}</div></div>}
          </div>
        )}

        {/* صف 2: المدفوع + التسويات + الإجمالي */}
        <div style={{display:"flex",border:"1.5px solid #f0ece8",borderRadius:10,overflow:"hidden",background:"#fafafa"}}>
          {[[t("المدفوع",lang),cPaid,"#16a34a"],[t("التسويات",lang),cAdj,"#d97706"],[t("الإجمالي",lang),total,color]].map(([lbl,val,clr],i)=>(
            <div key={lbl} style={{flex:1,textAlign:"center",padding:small?"7px 4px":"10px 6px",
              borderRight:i<2?"1px solid #f0ece8":"none",
              background:i===2?`${clr}06`:"transparent"}}>
              <div style={{fontSize:small?10:12,color:clr,fontWeight:900,marginBottom:3,
                background:`${clr}10`,borderRadius:6,padding:"1px 5px",display:"inline-block"}}>{lbl}</div>
              <div style={{fontSize:small?13:17,fontWeight:900,color:clr}}>{omr(val)}</div>
            </div>
          ))}
        </div>

        {/* صف 3: المتبقي + نسبة الإنجاز (غير Refund) */}
        {effPort > 0 && name!=="Refund - before legal" && name!=="Refund - after legal" && (
          <div style={{display:"flex",gap:6,alignItems:"center"}}>
            <div style={{flex:1,background:"#fff3ee",borderRadius:10,padding:small?"6px 8px":"8px 12px",
              border:"1px solid #ffe4d4",textAlign:"center"}}>
              <div style={{fontSize:small?9:11,color:"#e85d20",fontWeight:800,marginBottom:3}}>{t("المتبقي من المحفظة",lang)}</div>
              <div style={{fontSize:small?12:15,fontWeight:900,color:"#e85d20",direction:"ltr"}}>{omr(remaining)}</div>
            </div>
            <div style={{flex:1,background:"#f8f9fc",borderRadius:10,padding:small?"6px 8px":"8px 10px",
              border:`1px solid ${color}22`}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
                <div style={{fontSize:small?9:10,color:color,fontWeight:800}}>{t("نسبة الإنجاز",lang)}</div>
                <div style={{fontSize:small?12:14,fontWeight:900,color:color}}>{pctVal.toFixed(1)}%</div>
              </div>
              <div style={{background:"#e8f0fe",borderRadius:6,height:7,overflow:"hidden"}}>
                <div style={{height:"100%",borderRadius:6,
                  background:`linear-gradient(90deg,${color}88,${color})`,
                  width:`${pctVal}%`}}/>
              </div>
            </div>
          </div>
        )}

        {/* صف خاص: Refund before legal — المتبقي + مبلغ الاسترجاع 26% */}
        {name==="Refund - before legal" && (
          <div style={{display:"flex",gap:6,alignItems:"stretch"}}>
            <div style={{flex:1,background:"#fff3ee",borderRadius:10,padding:small?"6px 8px":"8px 12px",
              border:"1px solid #ffe4d4",textAlign:"center"}}>
              <div style={{fontSize:small?9:11,color:"#e85d20",fontWeight:800,marginBottom:3}}>{t("المتبقي من المحفظة",lang)}</div>
              <div style={{fontSize:small?12:15,fontWeight:900,color:"#e85d20",direction:"ltr"}}>{omr(remaining)}</div>
            </div>
            <div style={{flex:1,background:(refundAmt||0)>0?"linear-gradient(135deg,#1e40af11,#3b82f611)":"#f8fafc",
              borderRadius:10,padding:small?"6px 8px":"8px 12px",
              border:(refundAmt||0)>0?"1.5px solid #3b82f6":"1.5px dashed #93c5fd",textAlign:"center"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:3}}>
                <div style={{fontSize:small?8:9,fontWeight:800,color:"#1e40af"}}>{t("🔄 مبلغ الاسترجاع",lang)}</div>
                <div style={{background:"#1e40af",color:"#fff",fontSize:small?7:8,fontWeight:700,borderRadius:20,padding:"1px 6px"}}>26%</div>
              </div>
              <div style={{fontSize:small?12:15,fontWeight:900,color:(refundAmt||0)>0?"#1e40af":"#94a3b8",direction:"ltr"}}>{omr(refundAmt||0)}</div>
              <div style={{fontSize:small?7:8,color:"#3b82f6",marginTop:1}}>O/S × 26%</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


// ── SummaryCard ────────────────────────────────────────────────────────────
function SummaryCard({label,paid,adj,cnt,cntPaid,cntAdj,cntTotal,portAmt,color,icon,pct,small,isMobile,isTablet,principalAmt}) {
  const { lang } = useLang();
  // الإجمالي = Paid + Adj | قيمة المحفظة = Principal
  const effPortAmt = portAmt||0; // دائماً من portAmt (Principal XLS)
  const total = paid + adj;
  // عدد الحسابات المنفصل لكل خانة
  const _cntPaid  = (cntPaid  != null && cntPaid  > 0) ? cntPaid  : (cnt||0);
  const _cntAdj   = (cntAdj   != null && cntAdj   > 0) ? cntAdj   : (cnt||0);
  const _cntTotal = (cntTotal != null && cntTotal > 0) ? cntTotal : _cntPaid;
  const fs = isMobile ? {title:14,sub:11,num:17,cnt:10,cell:9} :
             isTablet  ? {title:16,sub:12,num:19,cnt:11,cell:10} :
                         {title:17,sub:12,num:22,cnt:12,cell:11};
  return (
    <div style={{background:"#fff",borderRadius:15,overflow:"hidden",
      boxShadow:"0 3px 14px rgba(0,0,0,0.07)",border:"1.5px solid #f0ece8",minWidth:0}}>
      {/* Header */}
      <div style={{background:color,padding:small?"10px 12px":"13px 14px",
        display:"flex",justifyContent:"space-between",alignItems:"center",gap:6,flexWrap:"wrap"}}>
        <div style={{display:"flex",alignItems:"center",gap:6,minWidth:0}}>
          <span style={{fontSize:small?16:20,flexShrink:0}}>{icon}</span>
          <span style={{fontSize:fs.title,fontWeight:900,color:"#fff",lineHeight:1.2,wordBreak:"keep-all"}}>{label}</span>
        </div>
        <div style={{textAlign:"center",flexShrink:0}}>
          <div style={{fontSize:small?11:13,color:"rgba(255,255,255,0.75)",fontWeight:700,marginBottom:2}}>{t("نسبة المساهمة في الانجاز الكلي",lang)}</div>
          <div style={{background:"rgba(255,255,255,0.25)",borderRadius:20,padding:"2px 12px",fontSize:small?13:15,fontWeight:900,color:"#fff"}}>{pct}%</div>
        </div>
      </div>
      {/* المحفظة — قيمة الحسابات + عدد الحسابات */}
      <div style={{background:`${color}0f`,borderBottom:"1px solid #f0ece8",padding:small?"6px 10px":"8px 14px"}}>
        <div style={{fontSize:small?9:11,color:"#888",fontWeight:800,marginBottom:6,textAlign:"center",letterSpacing:0.5}}>{t("📊 المحفظة",lang)}</div>
        <div style={{display:"flex",gap:6}}>
          <div style={{flex:1,background:"#fff",borderRadius:10,padding:small?"6px 8px":"8px 12px",border:`1.5px solid ${color}33`,textAlign:"center"}}>
            <div style={{fontSize:small?9:11,color:color,fontWeight:800,marginBottom:4}}>{t("قيمة الحسابات",lang)}</div>
            <div style={{fontSize:small?14:18,fontWeight:900,color:color,lineHeight:1,direction:"ltr"}}>{effPortAmt>0?omr(effPortAmt):omr(total)}</div>
            <div style={{fontSize:small?8:10,color:"#aaa",fontWeight:600,marginTop:2}}>OMR</div>
          </div>
          <div style={{flex:1,background:"#fff",borderRadius:10,padding:small?"6px 8px":"8px 12px",border:`1.5px solid ${color}33`,textAlign:"center"}}>
            <div style={{fontSize:small?9:11,color:color,fontWeight:800,marginBottom:4}}>{t("عدد الحسابات",lang)}</div>
            <div style={{fontSize:small?14:18,fontWeight:900,color:color,lineHeight:1}}>{(cnt||0).toLocaleString()}</div>
            <div style={{fontSize:small?8:10,color:"#aaa",fontWeight:600,marginTop:2}}>{t("حساب",lang)}</div>
          </div>
        </div>
      </div>
      {/* المدفوع | التسويات | الإجمالي — كل خانة بعدد حساباتها */}
      <div style={{padding:small?"8px":"10px"}}>
        <div style={{display:"flex",gap:0,border:"1px solid #f0ece8",borderRadius:10,overflow:"hidden"}}>
          {[
            [t("المدفوع",lang),"#16a34a",paid,_cntPaid],
            [t("التسويات",lang),"#d97706",adj,_cntAdj],
            [t("الإجمالي",lang),color,total,_cntTotal]
          ].map(([lbl,clr,val,c],i)=>(
            <div key={lbl} style={{textAlign:"center",padding:small?"8px 4px":"12px 6px",
              borderRight:i<2?"1px solid #f0ece8":"none",minWidth:0,overflow:"hidden",flex:1,
              background:i===2?`${clr}06`:"transparent"}}>
              <div style={{fontSize:small?11:13,color:clr,fontWeight:900,marginBottom:5,whiteSpace:"nowrap",background:`${clr}10`,borderRadius:6,padding:"2px 6px",display:"inline-block"}}>{lbl}</div>
              <div style={{fontSize:fs.num,fontWeight:900,color:clr,lineHeight:1,wordBreak:"break-all",marginBottom:4}}>{omr(val)}</div>
              {c!=null && <div style={{fontSize:fs.cnt,color:"#888",fontWeight:700,background:"#f0ece8",borderRadius:8,padding:"1px 6px",display:"inline-block"}}>{(c||0).toLocaleString()} {t("حساب",lang)}</div>}
            </div>
          ))}
        </div>
      </div>

      {/* ── دوائر نسبة الإنجاز ── */}
      <div style={{padding:small?"8px 12px":"10px 14px",background:"#fafafa",borderTop:"1px solid #f0ece8",display:"flex",alignItems:"center",justifyContent:"center",gap:small?10:18}}>
        {[[t("المدفوع",lang),paid,"#16a34a"],[t("التسويات",lang),adj,"#d97706"],[t("الإجمالي",lang),paid+adj,color]].map(([lbl,val,clr],ci)=>{
          const pV = portAmt>0 ? Math.min(100,(val/effPortAmt)*100) : 0;
          const r2=34,cx2=40,cy2=40,circ2=2*Math.PI*r2,off=circ2-(pV/100)*circ2;
          return (
            <div key={lbl} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:4,flex:1}}>
              <div style={{fontSize:small?10:12,fontWeight:900,color:clr,background:`${clr}12`,borderRadius:8,padding:"2px 10px"}}>{lbl}</div>
              <svg width={80} height={80} viewBox="0 0 80 80">
                <defs><linearGradient id={`cg_${ci}`} x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor={clr} stopOpacity="0.4"/><stop offset="100%" stopColor={clr}/></linearGradient></defs>
                <circle cx={cx2} cy={cy2} r={r2} fill={`${clr}08`} stroke={`${clr}15`} strokeWidth="1"/>
                <circle cx={cx2} cy={cy2} r={r2} fill="none" stroke={`${clr}20`} strokeWidth="9"/>
                <circle cx={cx2} cy={cy2} r={r2} fill="none" stroke={`url(#cg_${ci})`} strokeWidth="9" strokeDasharray={circ2} strokeDashoffset={off} strokeLinecap="round" transform={`rotate(-90 ${cx2} ${cy2})`}/>
                <text x={cx2} y={cy2-4} textAnchor="middle" fontSize="14" fontWeight="900" fill={clr} fontFamily="Cairo">{pV.toFixed(1)}%</text>
                <text x={cx2} y={cy2+13} textAnchor="middle" fontSize="9" fontWeight="700" fill="#888" fontFamily="Cairo">من المحفظة</text>
              </svg>
              <div style={{fontSize:small?9:11,fontWeight:800,color:"#555",textAlign:"center"}}>{omr(val)}</div>
            </div>
          );
        })}
      </div>

      {/* ── مربع نسبة الإنجاز ── */}
      {effPortAmt > 0 && (() => {
        const tv=paid+adj,pp=Math.min(100,(tv/effPortAmt)*100),rem=effPortAmt>0?effPortAmt-tv:0;
        return (
          <div style={{margin:"10px 12px 12px",borderRadius:14,border:`2px solid ${color}33`,overflow:"hidden",background:`linear-gradient(135deg,${color}06,${color}12)`}}>
            <div style={{background:`linear-gradient(120deg,${color},${color}cc)`,padding:"8px 14px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div style={{fontSize:small?11:13,fontWeight:900,color:"#fff"}}>{t("🎯 نسبة الإنجاز من المحفظة",lang)}</div>
              <div style={{background:"rgba(255,255,255,0.25)",borderRadius:20,padding:"2px 10px",fontSize:small?14:17,fontWeight:900,color:"#fff"}}>{pp.toFixed(1)}%</div>
            </div>
            <div style={{padding:"10px 14px 6px"}}>
              <div style={{background:"rgba(255,255,255,0.6)",borderRadius:8,height:10,overflow:"hidden",marginBottom:8}}>
                <div style={{height:"100%",borderRadius:8,background:`linear-gradient(90deg,${color}88,${color})`,width:`${pp}%`}}/>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:6}}>
                {[[t("قيمة المحفظة",lang),effPortAmt,color],[t("الإجمالي المحصّل",lang),tv,"#16a34a"],[t("المتبقي",lang),rem,"#e85d20"]].map(([l,v,c])=>(
                  <div key={l} style={{textAlign:"center",background:"rgba(255,255,255,0.7)",borderRadius:10,padding:"6px 4px"}}>
                    <div style={{fontSize:small?8:10,color:"#555",fontWeight:800,marginBottom:2}}>{l}</div>
                    <div style={{fontSize:small?10:13,fontWeight:900,color:c}}>{omr(v)}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}

// ── RegionRow ──────────────────────────────────────────────────────────────
const RCOLS = ["#e85d20","#c44b10","#d4601a","#b03808","#f07030"];

// ── RegionRow ─────────────────────────────────────────────────────────────
// يعرض كل محافظة مع: المدفوع + عدد الحسابات / التسويات + عدد الحسابات / الإجمالي + عدد الحسابات
// عند الضغط على "المحصّلون" تنفتح قائمة بنفس التنسيق لكل محصّل
function RegionInfoBox({label, value, color, bg, small}) {
  return (
    <div style={{flex:1,textAlign:"center",padding:small?"6px 4px":"8px 10px",
      background:bg||"#fafafa",borderRadius:10,border:`1px solid ${color}22`}}>
      <div style={{fontSize:small?9:10,color:color,fontWeight:800,marginBottom:3}}>{label}</div>
      <div style={{fontSize:small?12:15,fontWeight:900,color:color,lineHeight:1}}>{value}</div>
    </div>
  );
}

function RegionRow({region, idx, open, onToggle, small, complaintsRegionMap}) {
  const { lang } = useLang();
  const col = RCOLS[idx % RCOLS.length];
  const paidCnt  = region.paidCount || 0;
  const adjCnt   = region.adjCount  || 0;
  const _rMap   = complaintsRegionMap||{};
  const _cReg   = _rMap[region.nameEn]||_rMap[region.id]||null;
  const totalCnt = region.count||0;
  const regPaid  = region.paid||0;
  const regAdj   = region.adj||0;
  const total    = regPaid + regAdj;
  const portAmt   = region.principalAmt||region.portAmt||0;
  const portCnt   = region.portCnt||0;
  const remaining = portAmt>0 ? portAmt-total : 0;
  const pctInj    = portAmt>0 ? Math.min(100,(total/portAmt)*100) : 0;

  return (
    <div style={{borderRadius:14,overflow:"hidden",
      boxShadow:open?"0 4px 20px rgba(232,93,32,0.15)":"0 2px 8px rgba(0,0,0,0.06)",
      border:`1.5px solid ${open?col+"55":"#f0ece8"}`,
      background:"#fff",transition:"all 0.2s"}}>

      <div onClick={onToggle} style={{cursor:"pointer",background:open?`${col}08`:"#fff",
        borderBottom:open?`2px solid ${col}22`:"none"}}>
        <div style={{display:"flex",alignItems:"center",gap:small?10:14,
          padding:small?"12px 14px":"14px 18px",flexWrap:small?"wrap":"nowrap"}}>

          <div style={{width:small?34:40,height:small?34:40,borderRadius:11,background:col,
            flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",
            fontSize:small?16:18,fontWeight:800,color:"#fff"}}>{idx+1}</div>
          <div style={{flex:1,minWidth:small?120:160}}>
            <div style={{fontSize:small?15:19,fontWeight:900,color:"#000",lineHeight:1.2}}>{lang==='en'?(region.nameEn||region.nameAr):region.nameAr}</div>
            <div style={{fontSize:small?11:13,color:"#666",marginTop:3,fontWeight:600}}>{region.nameEn}</div>
          </div>

          <div style={{display:"flex",flexDirection:"column",gap:6,flex:small?1:0,minWidth:small?0:520}}>
            {portAmt > 0 && (
              <div style={{display:"flex",gap:6}}>
                <RegionInfoBox small={small} label={t("قيمة المحفظة",lang)} value={omr(portAmt)+" OMR"} color={col} bg={`${col}08`}/>
                <RegionInfoBox small={small} label={t("عدد الحسابات",lang)} value={portCnt.toLocaleString()+" "+t("حساب",lang)} color={col} bg={`${col}08`}/>
              </div>
            )}
            <div style={{display:"flex",border:"1.5px solid #f0ece8",borderRadius:12,overflow:"hidden",background:"#fafafa"}}>
              {[[t("المدفوع",lang),region.paid,paidCnt,"#16a34a"],[t("التسويات",lang),region.adj,adjCnt,"#d97706"],[t("الإجمالي",lang),total,totalCnt,col]].map(([lbl,val,cnt,clr],i)=>(
                <div key={lbl} style={{flex:1,textAlign:"center",padding:small?"6px":"9px 12px",borderRight:i<2?"1.5px solid #f0ece8":"none"}}>
                  <div style={{fontSize:small?9:11,color:clr,fontWeight:800,marginBottom:2}}>{lbl}</div>
                  <div style={{fontSize:small?13:17,fontWeight:900,color:clr}}>{omr(val)}</div>
                  {cnt>0&&<div style={{fontSize:small?8:9,color:"#aaa",marginTop:2,fontWeight:700,background:"#f0f0f0",borderRadius:8,padding:"1px 5px",display:"inline-block"}}>{cnt.toLocaleString()} {t("حساب",lang)}</div>}
                </div>
              ))}
            </div>
            {portAmt > 0 && (
              <div style={{display:"flex",gap:6,alignItems:"center"}}>
                <RegionInfoBox small={small} label={t("المتبقي من المحفظة",lang)} value={omr(remaining)+" OMR"} color="#e85d20" bg="#fff3ee"/>
                <div style={{flex:1,background:"#f8f9fc",borderRadius:10,padding:small?"6px 8px":"7px 10px",border:`1px solid ${col}22`}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
                    <div style={{fontSize:small?9:11,color:col,fontWeight:800}}>{t("نسبة الإنجاز",lang)}</div>
                    <div style={{fontSize:small?12:15,fontWeight:900,color:col}}>{pctInj.toFixed(1)}%</div>
                  </div>
                  <div style={{background:"#e8f0fe",borderRadius:6,height:8,overflow:"hidden"}}>
                    <div style={{height:"100%",borderRadius:6,background:`linear-gradient(90deg,${col}88,${col})`,width:`${pctInj}%`}}/>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div style={{display:"flex",alignItems:"center",gap:5,flexShrink:0,
            background:open?col:"#fff",color:open?"#fff":col,
            border:`1.5px solid ${col}`,borderRadius:9,
            padding:small?"6px 10px":"8px 14px",fontSize:small?11:13,
            fontWeight:800,transition:"all 0.2s",whiteSpace:"nowrap"}}>
            {open?"▲":"▼"} {small?`(${region.collectors?.length||0})`:`${t("المحصّلون",lang)} (${region.collectors?.length||0})`}
          </div>
        </div>
      </div>

      {open && (
        <div style={{padding:small?"10px":"14px 18px 18px",background:"#fffaf7"}}>
          <div style={{fontSize:small?12:14,fontWeight:800,color:col,marginBottom:10,display:"flex",alignItems:"center",gap:6}}>
            <span style={{background:col,color:"#fff",borderRadius:7,padding:"2px 8px",fontSize:small?10:12}}>{t("👥 المحصّلون",lang)}</span>
            <span style={{color:"#888",fontWeight:600}}>{region.collectors?.length||0} {t(t("محصّل",lang),lang)}</span>
          </div>

          {[...(region.collectors||[])].filter(function(col){return col.name && col.name!=="Legal -Oneic";}).sort(function(a,b){return ((b.paid||0)+(b.adj||0))-((a.paid||0)+(a.adj||0));}).map((c,i) => {
            const cPrincipal = c.principalAmt>0 ? c.principalAmt : 0;
            const ct    = (c.paid||0)+(c.adj||0); // paid+adj
            const cPort = cPrincipal; // Principal
            const cCnt  = c.portCnt||c.count||0;
            const cRem  = cPrincipal>0 ? cPrincipal-ct : 0;
            const cPct  = cPrincipal>0 ? Math.min(100,(ct/cPrincipal)*100) : 0;
            return (
              <div key={i} style={{borderRadius:12,marginBottom:8,overflow:"hidden",
                border:`1.5px solid ${col}22`,background:"#fff"}}>
                {/* اسم المحصّل + رقم */}
                <div style={{display:"flex",alignItems:"center",gap:10,
                  padding:small?"8px 12px":"10px 14px",
                  background:`linear-gradient(120deg,${col}08,${col}15)`,
                  borderBottom:`1px solid ${col}18`}}>
                  <div style={{width:small?28:34,height:small?28:34,borderRadius:8,
                    background:col,display:"flex",alignItems:"center",
                    justifyContent:"center",fontSize:small?13:15,fontWeight:900,color:"#fff",
                    flexShrink:0}}>{i+1}</div>
                  <div style={{fontSize:small?13:16,color:"#000",fontWeight:800,flex:1,
                    overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{c.name}</div>
                  {/* نسبة الإنجاز */}
                  {cPort>0 && (
                    <div style={{background:col,color:"#fff",borderRadius:20,
                      padding:"2px 10px",fontSize:small?10:12,fontWeight:900,flexShrink:0}}>
                      {cPct.toFixed(1)}%
                    </div>
                  )}
                </div>
                {/* صف الأرقام */}
                <div style={{padding:small?"8px 10px":"10px 14px",display:"flex",
                  flexDirection:"column",gap:6}}>
                  {/* قيمة المحفظة + عدد الحسابات */}
                  {(cPort>0||cCnt>0) && (
                    <div style={{display:"flex",gap:6}}>
                      {cPort>0 && (
                        <div style={{flex:1,background:`${col}08`,borderRadius:8,padding:"6px 10px",
                          border:`1px solid ${col}20`,textAlign:"center"}}>
                          <div style={{fontSize:small?8:10,color:col,fontWeight:700,marginBottom:2}}>{t("قيمة المحفظة",lang)}</div>
                          <div style={{fontSize:small?12:15,fontWeight:900,color:col,direction:"ltr"}}>{omr(cPort)}</div>
                        </div>
                      )}
                      {cCnt>0 && (
                        <div style={{flex:1,background:`${col}08`,borderRadius:8,padding:"6px 10px",
                          border:`1px solid ${col}20`,textAlign:"center"}}>
                          <div style={{fontSize:small?8:10,color:col,fontWeight:700,marginBottom:2}}>{t("عدد الحسابات",lang)}</div>
                          <div style={{fontSize:small?12:15,fontWeight:900,color:col}}>{cCnt.toLocaleString()}</div>
                        </div>
                      )}
                    </div>
                  )}
                  {/* المدفوع + التسويات + الإجمالي */}
                  <div style={{display:"flex",border:"1px solid #f0ece8",borderRadius:9,overflow:"hidden",background:"#fafafa"}}>
                    {[[t("المدفوع",lang),c.paid||0,"#16a34a"],[t("التسويات",lang),c.adj||0,"#d97706"],[t("الإجمالي",lang),ct,col]].map(([lbl,val,clr],j)=>(
                      <div key={lbl} style={{flex:1,textAlign:"center",padding:small?"6px 4px":"8px 6px",
                        borderRight:j<2?`1px solid ${col}15`:"none"}}>
                        <div style={{fontSize:small?9:11,color:clr,fontWeight:800,marginBottom:2}}>{lbl}</div>
                        <div style={{fontSize:small?12:15,fontWeight:900,color:clr}}>{omr(val)}</div>
                      </div>
                    ))}
                  </div>
                  {/* المتبقي + شريط */}
                  {cPort>0 && (
                    <div style={{display:"flex",gap:6,alignItems:"center"}}>
                      <div style={{flex:1,background:"#fff3ee",borderRadius:8,padding:"6px 10px",
                        border:"1px solid #ffe4d4",textAlign:"center"}}>
                        <div style={{fontSize:small?8:10,color:"#e85d20",fontWeight:700,marginBottom:2}}>{t("المتبقي",lang)}</div>
                        <div style={{fontSize:small?12:14,fontWeight:900,color:"#e85d20",direction:"ltr"}}>{omr(cRem)}</div>
                      </div>
                      <div style={{flex:2,background:"#f8f9fc",borderRadius:8,padding:"6px 10px",
                        border:`1px solid ${col}18`}}>
                        <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                          <div style={{fontSize:small?8:10,color:col,fontWeight:700}}>{t("نسبة الإنجاز",lang)}</div>
                          <div style={{fontSize:small?11:13,fontWeight:900,color:col}}>{cPct.toFixed(1)}%</div>
                        </div>
                        <div style={{background:"#e8f0fe",borderRadius:4,height:5,overflow:"hidden"}}>
                          <div style={{height:"100%",borderRadius:4,
                            background:`linear-gradient(90deg,${col}88,${col})`,
                            width:`${cPct}%`}}/>
                        </div>
                      </div>
                    </div>
                  )}
                  {/* نسبة مساهمة المحصّل */}
                  {total>0 && (
                    <div style={{height:3,background:"#f0ece8",borderRadius:3,overflow:"hidden",marginTop:2}}>
                      <div style={{height:"100%",width:`${Math.min(100,Math.round(ct/total*100))}%`,
                        background:`linear-gradient(90deg,${col}88,${col})`,borderRadius:3}}/>
                    </div>
                  )}
                  {total>0 && (
                    <div style={{fontSize:small?8:9,color:"#aaa",fontWeight:700,textAlign:"left"}}>
                      {Math.round(ct/total*100)}% من إجمالي المنطقة
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {(region.collectors||[]).length>0&&(
            <div style={{borderRadius:12,overflow:"hidden",border:`2px solid ${col}55`,marginTop:10,boxShadow:`0 2px 10px ${col}25`}}>
              <div style={{padding:small?"8px 12px":"10px 14px",background:`linear-gradient(120deg,${col},${col}cc)`,display:"flex",alignItems:"center",gap:8}}>
                <div style={{width:small?26:32,height:small?26:32,borderRadius:8,background:"rgba(255,255,255,0.25)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:small?14:17,color:"#fff",fontWeight:900}}>Σ</div>
                <div style={{fontSize:small?13:16,color:"#fff",fontWeight:900}}>{t("الإجمالي الكلي",lang)}<div style={{fontSize:small?10:11,color:"rgba(255,255,255,0.75)",fontWeight:600}}>{region.collectors?.length||0} {t("محصّل",lang)} · {totalCnt.toLocaleString()} {t("حساب",lang)}</div></div>
              </div>
              <div style={{display:"flex",background:"#fff"}}>
                {[[t("المدفوع",lang),region.paid,"#16a34a"],[t("التسويات",lang),region.adj,"#d97706"],[t("الإجمالي",lang),total,col]].map(([lbl,val,clr],j)=>(
                  <div key={lbl} style={{flex:1,textAlign:"center",padding:small?"8px":"12px",borderRight:j<2?"1px solid #f0ece8":"none"}}>
                    <div style={{fontSize:small?9:11,color:clr,fontWeight:800,marginBottom:3}}>{lbl}</div>
                    <div style={{fontSize:small?14:18,fontWeight:900,color:clr}}>{omr(val)}</div>
                  </div>
                ))}
              </div>
              {portAmt>0&&(
                <div style={{padding:"8px 14px",background:"#f8f9fc",borderTop:"1px solid #f0ece8"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
                    <div style={{fontSize:small?10:12,color:col,fontWeight:800}}>{t("🎯 نسبة الإنجاز من المحفظة",lang)}</div>
                    <div style={{fontSize:small?13:16,fontWeight:900,color:col}}>{pctInj.toFixed(1)}%</div>
                  </div>
                  <div style={{background:"#e8f0fe",borderRadius:6,height:8,overflow:"hidden"}}>
                    <div style={{height:"100%",borderRadius:6,background:`linear-gradient(90deg,${col}88,${col})`,width:`${pctInj}%`}}/>
                  </div>
                  <div style={{display:"flex",justifyContent:"space-between",marginTop:4,fontSize:small?9:10,color:"#888",fontWeight:700}}>
                    <span>{t("محصّل:",lang)} {omr(total)}</span>
                    <span>{t("متبقي:",lang)} {omr(remaining)}</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}


function DayDetail({ date, day, collectors, regions, fmt, small, onClose, REG_COLORS_MAP, REG_AR_MAP }) {
  const { lang } = useLang();
  const [dayTab, setDayTab] = useState('collectors');
  return (
    <div style={{border:"2px solid #e85d20",borderRadius:16,overflow:"hidden",marginBottom:14}}>
      {/* هيدر اليوم */}
      <div style={{background:"linear-gradient(120deg,#e85d20,#c44b10)",padding:"14px 18px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10}}>
          <div>
            <div style={{fontSize:18,fontWeight:900,color:"#fff"}}>📅 {date}</div>
            <div style={{fontSize:11,color:"rgba(255,255,255,0.7)",marginTop:2}}>
              {day.count} دفعة &nbsp;·&nbsp; {collectors.length} محصّل &nbsp;·&nbsp; {regions.length} منطقة
            </div>
          </div>
          <div style={{display:"flex",gap:16,alignItems:"center"}}>
            {[[t("المدفوع",lang),fmt(day.paid),"#86efac"],
              [t("التسويات",lang),fmt(day.adj),"#fde68a"],
              [t("الإجمالي",lang),fmt(day.paid+day.adj),"#fff"]].map(([l,v,c])=>(
              <div key={l} style={{textAlign:"center"}}>
                <div style={{fontSize:10,color:"rgba(255,255,255,0.7)",marginBottom:3}}>{l}</div>
                <div style={{fontSize:16,fontWeight:900,color:c}}>{v}</div>
              </div>))}
            <button onClick={onClose} style={{background:"rgba(255,255,255,0.2)",border:"none",
              borderRadius:8,padding:"6px 12px",cursor:"pointer",color:"#fff",fontSize:13,fontWeight:700}}>
              ✕
            </button>
          </div>
        </div>
      </div>

      {/* تبويبات داخلية */}
      <div style={{display:"flex",background:"#fff7f3",borderBottom:"1px solid #fde8d8"}}>
        {[['collectors',t('👤 المحصّلون',lang)+' ('+collectors.length+')'],
          ['regions',t('🗺 المناطق',lang)+' ('+regions.length+')'],
          ['transactions',t('📋 الدفعات',lang)]].map(([id,label])=>(
          <button key={id} onClick={()=>setDayTab(id)} style={{
            flex:1,padding:"9px 4px",border:"none",cursor:"pointer",
            background:dayTab===id?"#fff":"transparent",
            color:dayTab===id?"#e85d20":"#888",
            fontWeight:dayTab===id?800:600,fontSize:small?11:13,
            fontFamily:"'Cairo',sans-serif",
            borderBottom:dayTab===id?"2px solid #e85d20":"2px solid transparent",
            transition:"all 0.2s"
          }}>{label}</button>
        ))}
      </div>

      <div style={{padding:"14px 16px",maxHeight:420,overflowY:"auto"}}>

        {/* ── المحصّلون ── */}
        {dayTab==='collectors'&&(
          <div>
            <div style={{display:"grid",gridTemplateColumns:"28px 1fr 90px 110px 120px",
              gap:6,padding:"7px 10px",background:"#e85d20",borderRadius:10,marginBottom:8}}>
              {["#",t("المحصّل",lang),t("المنطقة",lang),t("المدفوع",lang),t("الإجمالي",lang)].map((h,i)=>(
                <div key={i} style={{fontSize:11,fontWeight:800,color:"#fff"}}>{h}</div>))}
            </div>
            {collectors.map((c,i)=>{
              const col=REG_COLORS_MAP[c.region]||'#888';
              return(
              <div key={i} style={{
                display:"grid",gridTemplateColumns:"28px 1fr 90px 110px 120px",
                gap:6,alignItems:"center",padding:"9px 10px",
                background:i%2===0?"#fff":"#fff7f3",
                borderRadius:9,marginBottom:3,border:"1px solid #fde8d8",
                borderRight:`3px solid ${col}`}}>
                <div style={{width:22,height:22,borderRadius:6,background:`${col}20`,
                  border:`1px solid ${col}40`,display:"flex",alignItems:"center",
                  justifyContent:"center",fontSize:11,fontWeight:800,color:col}}>{i+1}</div>
                <div>
                  <div style={{fontSize:13,fontWeight:800,color:"#000",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{c.collector}</div>
                  {c.branch&&<div style={{fontSize:10,color:"#888"}}>{c.branch}</div>}
                </div>
                <div style={{fontSize:11,color:col,fontWeight:700,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
                  {lang==='en'?(c.region||REG_AR_MAP[c.region]):(REG_AR_MAP[c.region]||c.region)}
                </div>
                <div style={{fontSize:13,fontWeight:800,color:"#16a34a"}}>{fmt(c.paid)}</div>
                <div style={{fontSize:14,fontWeight:900,color:"#e85d20"}}>{fmt(c.paid+c.adj)}</div>
              </div>);})}
          </div>
        )}

        {/* ── المناطق ── */}
        {dayTab==='regions'&&(
          <div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 130px 130px 140px 60px",
              gap:6,padding:"7px 10px",background:"#e85d20",borderRadius:10,marginBottom:8}}>
              {[t("المنطقة",lang),t("المدفوع",lang),t("التسويات",lang),t("الإجمالي",lang),"دفعات"].map((h,i)=>(
                <div key={i} style={{fontSize:11,fontWeight:800,color:"#fff",textAlign:i>0?"center":"right"}}>{h}</div>))}
            </div>
            {regions.map((r,i)=>{
              const col=REG_COLORS_MAP[r.nameEn]||'#888';
              return(
              <div key={i} style={{
                display:"grid",gridTemplateColumns:"1fr 130px 130px 140px 60px",
                gap:6,alignItems:"center",padding:"11px 10px",
                background:i%2===0?"#fff":"#fff7f3",borderRadius:9,marginBottom:4,
                border:"1px solid #fde8d8",borderRight:`4px solid ${col}`}}>
                <div>
                  <div style={{fontSize:15,fontWeight:900,color:"#000"}}>{lang==='en'?r.nameEn:(REG_AR_MAP[r.nameEn]||r.nameEn)}</div>
                  <div style={{fontSize:10,color:"#888"}}>{r.nameEn}</div>
                </div>
                <div style={{textAlign:"center",fontSize:14,fontWeight:800,color:"#16a34a"}}>{fmt(r.paid)}</div>
                <div style={{textAlign:"center",fontSize:14,fontWeight:800,color:"#d97706"}}>{fmt(r.adj)}</div>
                <div style={{textAlign:"center",background:`${col}12`,borderRadius:8,padding:"5px"}}>
                  <div style={{fontSize:15,fontWeight:900,color:col}}>{fmt(r.paid+r.adj)}</div>
                </div>
                <div style={{textAlign:"center"}}>
                  <span style={{background:`${col}22`,color:col,borderRadius:6,
                    padding:"2px 7px",fontSize:12,fontWeight:700}}>{r.count}</span>
                </div>
              </div>);})}
          </div>
        )}

        {/* ── الدفعات التفصيلية ── */}
        {dayTab==='transactions'&&(
          <div>
            <div style={{fontSize:12,color:"#888",fontWeight:700,marginBottom:10}}>
              إجمالي الدفعات: {collectors.reduce((s,c)=>s+c.count,0)}
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 110px 120px",
              gap:6,padding:"7px 10px",background:"#e85d20",borderRadius:10,marginBottom:8}}>
              {["المحصّل / المدين","المنطقة / الفرع",t("المدفوع",lang),t("الإجمالي",lang)].map((h,i)=>(
                <div key={i} style={{fontSize:11,fontWeight:800,color:"#fff"}}>{h}</div>))}
            </div>
            {collectors.map((c,i)=>
              (c.debtors||[]).map((deb,j)=>{
                const col=REG_COLORS_MAP[c.region]||'#888';
                return(
                <div key={`${i}-${j}`} style={{
                  display:"grid",gridTemplateColumns:"1fr 1fr 110px 120px",
                  gap:6,alignItems:"center",padding:"8px 10px",
                  background:i%2===0?"#fff":"#fff7f3",
                  borderRadius:8,marginBottom:3,border:"1px solid #fde8d8"}}>
                  <div>
                    <div style={{fontSize:12,fontWeight:800,color:"#000"}}>{c.collector}</div>
                    <div style={{fontSize:10,color:"#888",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{deb.name}</div>
                  </div>
                  <div>
                    <div style={{fontSize:11,color:col,fontWeight:700}}>{lang==='en'?(c.region||REG_AR_MAP[c.region]):(REG_AR_MAP[c.region]||c.region)}</div>
                    {c.branch&&<div style={{fontSize:10,color:"#aaa"}}>{c.branch}</div>}
                  </div>
                  <div style={{fontSize:13,fontWeight:800,color:"#16a34a"}}>{fmt(deb.paid)}</div>
                  <div style={{fontSize:14,fontWeight:900,color:"#e85d20"}}>{fmt(deb.paid+deb.adj)}</div>
                </div>);
              })
            )}
          </div>
        )}

      </div>
    </div>
  );
}


// ── AnalyticsModal — لوحة التحليل البياني ────────────────────────────────────
function AnalyticsModal({ bulk, onClose, small }) {
  const { lang } = useLang();
  const [activeChart, setActiveChart] = useState('trend');
  const [filterYear,  setFilterYear]  = useState('all');
  const [filterMonth, setFilterMonth] = useState('all');
  const [filterFrom,  setFilterFrom]  = useState('');
  const [filterTo,    setFilterTo]    = useState('');
  const d = bulk;
  if (!d) return null;

  // ─── استخراج السنوات والأشهر المتاحة ──────────────────────────────────────
  const allDailyRaw = [...(d.daily||[])].sort((a,b)=>a.date.localeCompare(b.date));
  const years  = [...new Set(allDailyRaw.map(x=>x.date.slice(0,4)))].sort();
  const months = filterYear==='all'
    ? [...new Set(allDailyRaw.map(x=>x.date.slice(0,7)))].sort()
    : [...new Set(allDailyRaw.filter(x=>x.date.startsWith(filterYear)).map(x=>x.date.slice(0,7)))].sort();
  const MONTH_AR = {
    '01':'يناير','02':'فبراير','03':'مارس','04':'أبريل',
    '05':'مايو','06':'يونيو','07':'يوليو','08':'أغسطس',
    '09':'سبتمبر','10':'أكتوبر','11':'نوفمبر','12':'ديسمبر'
  };
  // reset day filter when year/month changes
  const clearDayFilter = () => { setFilterFrom(''); setFilterTo(''); };

  const fmt = n => new Intl.NumberFormat("en-US",{minimumFractionDigits:3,maximumFractionDigits:3}).format(n||0);
  const fmtK = n => n >= 1000 ? (n/1000).toFixed(1)+'K' : n.toFixed(0);

  // ─ تصفية البيانات حسب الفلتر ───────────────────────────────────────────────
  const daily = allDailyRaw.filter(x=>{
    if (filterYear!=='all' && !x.date.startsWith(filterYear)) return false;
    if (filterMonth!=='all' && !x.date.startsWith(filterMonth)) return false;
    if (filterFrom && x.date < filterFrom) return false;
    if (filterTo   && x.date > filterTo)   return false;
    return true;
  });

  // إعادة حساب المناطق والمحصّلين بناءً على الفلتر
  const filteredDates = new Set(daily.map(x=>x.date));
  const isFiltered = filterYear!=='all' || filterMonth!=='all' || !!filterFrom || !!filterTo;

  // إذا يوجد dailyDetail، نبني بيانات مفلترة للمناطق والمحصّلين
  let filteredRegionMap = {};
  let filteredCollectorMap = {};
  if (isFiltered && d.dailyDetail) {
    Object.entries(d.dailyDetail).forEach(([date, cols])=>{
      if (!filteredDates.has(date)) return;
      cols.forEach(c=>{
        const reg = c.region||'';
        if (!filteredRegionMap[reg]) filteredRegionMap[reg]={nameEn:reg,nameAr:reg,paid:0,adj:0,count:0,color:'#888'};
        filteredRegionMap[reg].paid+=c.paid; filteredRegionMap[reg].adj+=c.adj; filteredRegionMap[reg].count+=c.count;
        const ck=c.collector+'||'+reg;
        if (!filteredCollectorMap[ck]) filteredCollectorMap[ck]={name:c.collector,region:reg,paid:0,adj:0,count:0};
        filteredCollectorMap[ck].paid+=c.paid; filteredCollectorMap[ck].adj+=c.adj; filteredCollectorMap[ck].count+=c.count;
      });
    });
  }

  const regions = isFiltered && Object.keys(filteredRegionMap).length>0
    ? Object.values(filteredRegionMap).sort((a,b)=>(b.paid+b.adj)-(a.paid+a.adj))
    : [...(d.byRegion||[])].sort((a,b)=>(b.paid+b.adj)-(a.paid+a.adj));

  const collectors = isFiltered && Object.keys(filteredCollectorMap).length>0
    ? Object.values(filteredCollectorMap).sort((a,b)=>(b.paid+b.adj)-(a.paid+a.adj)).slice(0,10)
    : [...(d.topCollectors||[])].sort((a,b)=>(b.paid+b.adj)-(a.paid+a.adj)).slice(0,10);

  const totalPaid  = daily.reduce((s,x)=>s+x.paid,0);
  const totalAdj   = daily.reduce((s,x)=>s+x.adj,0);
  const grandTotal = totalPaid + totalAdj;
  const avgDaily   = daily.length ? grandTotal/daily.length : 0;
  const bestDay    = daily.reduce((a,b)=>(a.paid+a.adj)>(b.paid+b.adj)?a:b, daily[0]||{});
  const worstDay   = daily.reduce((a,b)=>(a.paid+a.adj)<(b.paid+b.adj)?a:b, daily[0]||{});

  // مؤشرات النمو
  const lastHalf = daily.slice(Math.floor(daily.length/2));
  const firstHalf = daily.slice(0, Math.floor(daily.length/2));
  const lastHalfTotal = lastHalf.reduce((s,x)=>s+x.paid+x.adj,0);
  const firstHalfTotal = firstHalf.reduce((s,x)=>s+x.paid+x.adj,0);
  const growthRate = firstHalfTotal > 0 ? ((lastHalfTotal-firstHalfTotal)/firstHalfTotal*100) : 0;

  // ─ ألوان المناطق ────────────────────────────────────────────────────────────
  const REG_COLORS = {
    'شركات التحصيل':'#1a7a6b','المكتب الرئيسي':'#6c3fa0',
    'مسقط والداخلية':'#e85d20','الباطنة الشمالية والجنوبية':'#c44b10',
    'الباطنة':'#c44b10','الشرقية والوسطى':'#d4601a',
    'مسندم والبريمي':'#b03808','ظفار':'#f07030',
    'Debt Collection Company':'#1a7a6b','Head Office':'#6c3fa0',
    'MUSCAT AND AL DAKHILIYAH':'#e85d20','MUSCAT AND DAKHILIYAH':'#e85d20',
    'South and North Al Batinah':'#c44b10','North and South Al Batinah':'#c44b10',
    'S&N Al Batinah':'#c44b10','N&S Al Batinah':'#c44b10',
    'North and South Al Shaurqiah and Al Wasatah':'#d4601a',
    'N&S Al Sharqiyah':'#d4601a','Al Sharqiyah':'#d4601a',
    'Musandam and Al Buraimi':'#b03808','Musandam':'#b03808',
    'Dhofar':'#f07030','Legal':'#9333ea','Legal- DR. Sarhaan':'#9333ea',
  };
  const FALLBACK_COLS = ['#e85d20','#1a7a6b','#6c3fa0','#c44b10','#d4601a','#b03808','#f07030','#9333ea','#0891b2','#059669'];
  const getRegColor = (r,idx=0) => REG_COLORS[r.nameAr] || REG_COLORS[r.nameEn] || r.color || FALLBACK_COLS[idx%FALLBACK_COLS.length] || '#888';

  // ─ SVG Charts ───────────────────────────────────────────────────────────────
  const maxDaily = daily.length ? Math.max(...daily.map(x=>x.paid+x.adj), 1) : 1;
  const maxReg   = regions.length ? Math.max(...regions.map(x=>x.paid+x.adj), 1) : 1;
  const maxCol   = collectors.length ? Math.max(...collectors.map(x=>x.paid+x.adj), 1) : 1;

  // Line chart path
  const W=680, H=200, PX=48, PY=20;
  const chartW = W-PX*2, chartH = H-PY*2;
  const pts = daily.map((d,i)=>{
    const x = PX + (i/(daily.length-1||1))*chartW;
    const y = PY + chartH - ((d.paid+d.adj)/maxDaily)*chartH;
    return [x,y];
  });
  const linePath = pts.map((p,i)=>i===0?`M${p[0]},${p[1]}`:`L${p[0]},${p[1]}`).join(' ');
  const areaPath = pts.length ? `${linePath} L${pts[pts.length-1][0]},${PY+chartH} L${pts[0][0]},${PY+chartH} Z` : '';

  // طباعة اللوحة الكاملة — جميع التبويبات
  const handlePrintChart = () => {
    const omrP = n => new Intl.NumberFormat("en-US",{minimumFractionDigits:3,maximumFractionDigits:3}).format(n||0);
    const fmtKP = n => n>=1000?(n/1000).toFixed(1)+'K':n.toFixed(1);
    const periodLabel = filterFrom||filterTo
      ? `${filterFrom||daily[0]?.date||''} → ${filterTo||daily[daily.length-1]?.date||''}`
      : filterMonth!=='all'
      ? `${MONTH_AR[filterMonth.slice(5)]} ${filterMonth.slice(0,4)}`
      : filterYear!=='all' ? `سنة ${filterYear}` : `${d.dateRange?.from} → ${d.dateRange?.to}`;

    const regBarsHTML = regions.map((r,i)=>{
      const pct=Math.round(((r.paid+r.adj)/Math.max(...regions.map(x=>x.paid+x.adj),1))*100);
      const col=getRegColor(r);
      return `\x3cdiv style="margin-bottom:12px"\x3e
        \x3cdiv style="display:flex;justify-content:space-between;margin-bottom:4px;direction:rtl"\x3e
          \x3cspan style="font-size:13px;font-weight:800;color:#000"\x3e${lang==='en'?(r.nameEn||r.nameAr):r.nameAr}\x3c/span\x3e
          \x3cdiv style="display:flex;gap:16px"\x3e
            \x3cspan style="font-size:11px;color:#16a34a"\x3eمدفوع: ${omrP(r.paid)}\x3c/span\x3e
            \x3cspan style="font-size:11px;color:#d97706"\x3eتسويات: ${omrP(r.adj)}\x3c/span\x3e
            \x3cspan style="font-size:13px;font-weight:900;color:${col}"\x3e${omrP(r.paid+r.adj)}\x3c/span\x3e
          \x3c/div\x3e
        \x3c/div\x3e
        \x3cdiv style="background:#f0ece8;border-radius:6px;height:14px;overflow:hidden"\x3e
          \x3cdiv style="width:${pct}%;height:100%;background:${col};border-radius:6px"\x3e\x3c/div\x3e
        \x3c/div\x3e
      \x3c/div\x3e`;
    }).join('');

    const collectorsHTML = collectors.map((c,i)=>{
      const total=c.paid+c.adj;
      const pct=Math.round((total/Math.max(...collectors.map(x=>x.paid+x.adj),1))*100);
      const medals=["🥇","🥈","🥉"];
      return `\x3ctr style="background:${i%2===0?'#fff':'#f8f4f1'}"\x3e
        \x3ctd style="padding:2.5mm 3mm;font-size:14px;text-align:center"\x3e${i<3?medals[i]:i+1}\x3c/td\x3e
        \x3ctd style="padding:2.5mm 3mm;font-size:12px;font-weight:800;color:#000"\x3e${c.name}\x3c/td\x3e
        \x3ctd style="padding:2.5mm 3mm;font-size:11px;color:#555"\x3e${c.region||''}\x3c/td\x3e
        \x3ctd style="padding:2.5mm 3mm;text-align:center;font-size:12px;font-weight:800;color:#16a34a"\x3e${omrP(c.paid)}\x3c/td\x3e
        \x3ctd style="padding:2.5mm 3mm;text-align:center;font-size:13px;font-weight:900;color:#1e3a5f"\x3e${omrP(total)}\x3c/td\x3e
        \x3ctd style="padding:2.5mm 3mm;text-align:center;font-size:11px;color:#555"\x3e${c.count}\x3c/td\x3e
      \x3c/tr\x3e`;
    }).join('');

    const dailyHTML = [...daily].reverse().map((day,i)=>{
      const total=day.paid+day.adj;
      return `\x3ctr style="background:${i%2===0?'#fff':'#f8f4f1'}"\x3e
        \x3ctd style="padding:2.5mm 3mm;font-size:11px;color:#888"\x3e${i+1}\x3c/td\x3e
        \x3ctd style="padding:2.5mm 3mm;font-size:13px;font-weight:800;color:#111"\x3e${day.date}\x3c/td\x3e
        \x3ctd style="padding:2.5mm 3mm;text-align:center;font-size:12px;font-weight:800;color:#16a34a"\x3e${omrP(day.paid)}\x3c/td\x3e
        \x3ctd style="padding:2.5mm 3mm;text-align:center;font-size:12px;font-weight:800;color:#d97706"\x3e${omrP(day.adj)}\x3c/td\x3e
        \x3ctd style="padding:2.5mm 3mm;text-align:center;font-size:13px;font-weight:900;color:#1e3a5f"\x3e${omrP(total)}\x3c/td\x3e
        \x3ctd style="padding:2.5mm 3mm;text-align:center;font-size:11px;color:#555"\x3e${day.count}\x3c/td\x3e
      \x3c/tr\x3e`;
    }).join('');

    const pageHeader = `\x3cdiv style="display:flex;justify-content:space-between;align-items:center;
      border-bottom:3px solid #1e3a5f;padding-bottom:6mm;margin-bottom:6mm;direction:rtl"\x3e
      \x3cdiv\x3e
        \x3cdiv style="font-size:18pt;font-weight:900;color:#1e3a5f"\x3e📊 تقرير التحليل البياني\x3c/div\x3e
        \x3cdiv style="font-size:9pt;color:#888;margin-top:3px"\x3e${periodLabel} · ${daily.length} يوم نشط · ${d.totalRecords?.toLocaleString()} دفعة\x3c/div\x3e
      \x3c/div\x3e
      \x3cdiv style="text-align:left;font-size:9pt;color:#888"\x3e
        \x3cdiv\x3eتاريخ الطباعة: ${new Date().toLocaleDateString(lang==='en'?'en-GB':'ar-OM')}\x3c/div\x3e
        \x3cdiv style="font-weight:800;color:#1e3a5f"\x3eONEIC © 2026\x3c/div\x3e
      \x3c/div\x3e
    \x3c/div\x3e`;

    const summaryBanner = `\x3cdiv style="background:linear-gradient(120deg,#1e3a5f,#2d5a8e);
      border-radius:12px;padding:5mm 6mm;margin-bottom:6mm;
      display:grid;grid-template-columns:repeat(4,1fr);gap:4mm;direction:rtl"\x3e
      ${[["💰 المدفوع",omrP(totalPaid),"#86efac"],["📊 التسويات",omrP(totalAdj),"#fde68a"],
         ["🏆 الإجمالي",omrP(grandTotal),"#fff"],[t("📈 متوسط يومي",lang),omrP(avgDaily),"#e9d5ff"]
        ].map(([l,v,c])=>'<div style="text-align:center;background:rgba(255,255,255,0.1);border-radius:8px;padding:3mm">'+
        '<div style="font-size:8pt;color:rgba(255,255,255,0.7);font-weight:700">'+l+'</div>'+
        '<div style="font-size:14pt;font-weight:900;color:'+c+';margin-top:2mm">'+v+'</div>'+
      '</div>').join('')}
    \x3c/div\x3e`;

    const w = window.open('','_blank','width=1100,height=800');
    w.document.write(`\x3c!DOCTYPE html\x3e\x3chtml lang="ar" dir="rtl"\x3e
    \x3chead\x3e\x3cmeta charset="UTF-8"\x3e\x3ctitle\x3eتقرير التحليل — ${periodLabel}\x3c/title\x3e
    \x3clink href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;700;800;900&display=swap" rel="stylesheet"\x3e
    \x3cstyle\x3e*{box-sizing:border-box;margin:0;padding:0;-webkit-print-color-adjust:exact!important;print-color-adjust:exact!important}
    body{font-family:'Cairo',sans-serif;background:#f5f0eb;direction:rtl}
    .page{width:210mm;min-height:297mm;margin:8mm auto;background:#fff;padding:11mm;
      box-shadow:0 4px 32px rgba(0,0,0,.15);page-break-after:always}
    .page:last-child{page-break-after:auto}
    @media print{@page{size:A4;margin:0}body{background:#fff}.page{margin:0;padding:10mm;box-shadow:none}.no-print{display:none!important}}
    table{width:100%;border-collapse:collapse}th,td{border-bottom:1px solid #f0ece8}
    \x3c/style\x3e\x3c/head\x3e\x3cbody\x3e
    \x3cbutton class="no-print" onclick="window.print()" style="position:fixed;top:10px;left:10px;
      background:#1e3a5f;color:#fff;border:none;border-radius:10px;padding:10px 24px;
      font-size:14px;font-weight:800;cursor:pointer;z-index:999"\x3e🖨️ طباعة / PDF\x3c/button\x3e

    \x3cdiv class="page"\x3e
      ${pageHeader}
      ${summaryBanner}
      \x3cdiv style="font-size:13pt;font-weight:900;color:#1e3a5f;margin-bottom:4mm"\x3e📅 تفصيل الأيام (${daily.length} يوم)\x3c/div\x3e
      \x3ctable\x3e
        \x3cthead\x3e\x3ctr style="background:#1e3a5f"\x3e
          \x3cth style="padding:2.5mm 3mm;color:#fff;font-size:9pt"\x3e#\x3c/th\x3e
          \x3cth style="padding:2.5mm 3mm;color:#fff;font-size:9pt;text-align:right"\x3eالتاريخ\x3c/th\x3e
          \x3cth style="padding:2.5mm 3mm;color:#fff;font-size:9pt;text-align:center"\x3eالمدفوع\x3c/th\x3e
          \x3cth style="padding:2.5mm 3mm;color:#fff;font-size:9pt;text-align:center"\x3eالتسويات\x3c/th\x3e
          \x3cth style="padding:2.5mm 3mm;color:#fff;font-size:9pt;text-align:center"\x3eالإجمالي\x3c/th\x3e
          \x3cth style="padding:2.5mm 3mm;color:#fff;font-size:9pt;text-align:center"\x3eدفعات\x3c/th\x3e
        \x3c/tr\x3e\x3c/thead\x3e
        \x3ctbody\x3e${dailyHTML}\x3c/tbody\x3e
        \x3ctfoot\x3e\x3ctr style="background:#f0f4ff"\x3e
          \x3ctd colspan="2" style="padding:3mm;font-size:12pt;font-weight:900;color:#1e3a5f"\x3eالإجمالي\x3c/td\x3e
          \x3ctd style="padding:3mm;text-align:center;font-size:13pt;font-weight:900;color:#16a34a"\x3e${omrP(totalPaid)}\x3c/td\x3e
          \x3ctd style="padding:3mm;text-align:center;font-size:13pt;font-weight:900;color:#d97706"\x3e${omrP(totalAdj)}\x3c/td\x3e
          \x3ctd style="padding:3mm;text-align:center;font-size:14pt;font-weight:900;color:#1e3a5f"\x3e${omrP(grandTotal)}\x3c/td\x3e
          \x3ctd style="padding:3mm;text-align:center;font-size:12pt;font-weight:800;color:#555"\x3e${daily.reduce((s,x)=>s+x.count,0)}\x3c/td\x3e
        \x3c/tfoot\x3e
      \x3c/table\x3e
    \x3c/div\x3e

    \x3cdiv class="page"\x3e
      ${pageHeader}
      \x3cdiv style="font-size:13pt;font-weight:900;color:#1e3a5f;margin-bottom:4mm"\x3e🗺 التوزيع بالمنطقة\x3c/div\x3e
      ${regBarsHTML}
      \x3cdiv style="margin-top:6mm;font-size:13pt;font-weight:900;color:#1e3a5f;margin-bottom:4mm"\x3e
        👤 أعلى المحصّلين (${collectors.length})
      \x3c/div\x3e
      \x3ctable\x3e
        \x3cthead\x3e\x3ctr style="background:#1e3a5f"\x3e
          \x3cth style="padding:2.5mm 3mm;color:#fff;font-size:9pt"\x3e#\x3c/th\x3e
          \x3cth style="padding:2.5mm 3mm;color:#fff;font-size:9pt;text-align:right"\x3eالمحصّل\x3c/th\x3e
          \x3cth style="padding:2.5mm 3mm;color:#fff;font-size:9pt;text-align:right"\x3eالمنطقة\x3c/th\x3e
          \x3cth style="padding:2.5mm 3mm;color:#fff;font-size:9pt;text-align:center"\x3eالمدفوع\x3c/th\x3e
          \x3cth style="padding:2.5mm 3mm;color:#fff;font-size:9pt;text-align:center"\x3eالإجمالي\x3c/th\x3e
          \x3cth style="padding:2.5mm 3mm;color:#fff;font-size:9pt;text-align:center"\x3eدفعات\x3c/th\x3e
        \x3c/tr\x3e\x3c/thead\x3e
        \x3ctbody\x3e${collectorsHTML}\x3c/tbody\x3e
      \x3c/table\x3e
      \x3cdiv style="text-align:center;font-size:8pt;color:#aaa;margin-top:6mm;
        padding-top:3mm;border-top:1px solid #eee"\x3e
        ONEIC — تقرير التحليل البياني · ${periodLabel} · © 2026
      \x3c/div\x3e
    \x3c/div\x3e
    \x3c/body\x3e\x3c/html\x3e`);
    w.document.close();
    setTimeout(()=>w.print(), 2000);
  };

  const tabs = [
    {id:'trend', label:t('📈 الاتجاه اليومي',lang)},
    {id:'region', label:t('🗺 المناطق',lang)},
    {id:'collector', label:t('🏆 المحصّلون',lang)},
    {id:'kpi', label:t('📊 المؤشرات',lang)},
  ];

  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.8)",
      display:"flex",alignItems:"center",justifyContent:"center",
      zIndex:9999,padding:16,direction:"rtl"}}>
      <div style={{
        background:"#fff",borderRadius:20,width:"100%",
        maxWidth:small?400:960,maxHeight:"92vh",
        overflow:"hidden",display:"flex",flexDirection:"column",
        boxShadow:"0 24px 80px rgba(0,0,0,0.5)"
      }}>

        {/* ── Header ── */}
        <div style={{background:"linear-gradient(135deg,#1e3a5f,#2d5a8e)",padding:"18px 24px",flexShrink:0}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12}}>
            <div style={{display:"flex",alignItems:"center",gap:14}}>
              <div style={{width:48,height:48,borderRadius:14,background:"rgba(255,255,255,0.15)",
                border:"1.5px solid rgba(255,255,255,0.25)",display:"flex",alignItems:"center",
                justifyContent:"center",fontSize:26}}>📊</div>
              <div>
                <div style={{fontSize:20,fontWeight:900,color:"#fff"}}>{t("لوحة التحليل البياني",lang)}</div>
                <div style={{fontSize:11,color:"rgba(255,255,255,0.6)",marginTop:3}}>
                  {d.dateRange?.from} → {d.dateRange?.to} &nbsp;·&nbsp; {d.totalRecords?.toLocaleString()} دفعة
                  {growthRate !== 0 && <span style={{
                    marginRight:8,color:growthRate>0?"#86efac":"#fca5a5",fontWeight:800
                  }}>{growthRate>0?"▲":"▼"} {Math.abs(growthRate).toFixed(1)}% {t("نمو",lang)}</span>}
                </div>
              </div>
            </div>
            <div style={{display:"flex",gap:10,alignItems:"center"}}>
              <button onClick={handlePrintChart} style={{
                background:"rgba(255,255,255,0.15)",color:"#fff",
                border:"1.5px solid rgba(255,255,255,0.3)",
                borderRadius:10,padding:"8px 16px",fontSize:13,fontWeight:800,
                cursor:"pointer",fontFamily:"'Cairo',sans-serif"
              }}>{t("🖨️ تصدير PDF",lang)}</button>
              <button onClick={onClose} style={{
                background:"rgba(255,255,255,0.15)",color:"#fff",border:"none",
                borderRadius:10,padding:"8px 14px",fontSize:16,cursor:"pointer",fontWeight:700
              }}>✕</button>
            </div>
          </div>

          {/* ── فلتر الفترة ── */}
          <div style={{
            marginTop:12,padding:"12px 14px",
            background:"rgba(255,255,255,0.08)",
            borderRadius:12,border:"1px solid rgba(255,255,255,0.2)"
          }}>
            {/* صف 1: السنة + الشهر + أزرار سريعة */}
            <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap",marginBottom:8}}>
              <span style={{fontSize:12,color:"rgba(255,255,255,0.8)",fontWeight:800}}>{t("🗓 الفترة:",lang)}</span>
              <select value={filterYear} onChange={e=>{setFilterYear(e.target.value);setFilterMonth('all');clearDayFilter();}}
                style={{padding:"5px 10px",borderRadius:8,border:"1px solid rgba(255,255,255,0.3)",
                  background:"rgba(30,58,95,0.8)",color:"#fff",fontSize:12,fontWeight:700,
                  fontFamily:"'Cairo',sans-serif",cursor:"pointer",outline:"none"}}>
                <option value="all">{t("كل السنوات",lang)}</option>
                {years.map(y=><option key={y} value={y}>{y}</option>)}
              </select>
              <select value={filterMonth} onChange={e=>{setFilterMonth(e.target.value);clearDayFilter();}}
                style={{padding:"5px 10px",borderRadius:8,border:"1px solid rgba(255,255,255,0.3)",
                  background:"rgba(30,58,95,0.8)",color:"#fff",fontSize:12,fontWeight:700,
                  fontFamily:"'Cairo',sans-serif",cursor:"pointer",outline:"none"}}>
                <option value="all">{t("كل الأشهر",lang)}</option>
                {months.map(m=><option key={m} value={m}>{MONTH_AR[m.slice(5)]||m.slice(5)} {m.slice(0,4)}</option>)}
              </select>
              <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
                {[
                  [t("هذا الشهر",lang), ()=>{const n=new Date(),y=n.getFullYear().toString(),m=String(n.getMonth()+1).padStart(2,'0');setFilterYear(y);setFilterMonth(y+'-'+m);clearDayFilter();}],
                  [t("هذه السنة",lang), ()=>{setFilterYear(new Date().getFullYear().toString());setFilterMonth('all');clearDayFilter();}],
                  [t("الكل",lang),      ()=>{setFilterYear('all');setFilterMonth('all');clearDayFilter();}],
                ].map(([l,a])=>(
                  <button key={l} onClick={a} style={{
                    background:"rgba(255,255,255,0.2)",color:"#fff",border:"none",
                    borderRadius:7,padding:"4px 10px",fontSize:11,fontWeight:700,
                    cursor:"pointer",fontFamily:"'Cairo',sans-serif",whiteSpace:"nowrap"
                  }}>{l}</button>
                ))}
              </div>
            </div>
            {/* صف 2: اختيار الأيام من - إلى */}
            <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
              <span style={{fontSize:11,color:"rgba(255,255,255,0.7)",fontWeight:700}}>{t("📅 من يوم:",lang)}</span>
              <input type="date" value={filterFrom}
                onChange={e=>{setFilterFrom(e.target.value);if(e.target.value){setFilterYear('all');setFilterMonth('all');}}}
                style={{padding:"4px 8px",borderRadius:8,border:"1px solid rgba(255,255,255,0.3)",
                  background:"rgba(30,58,95,0.8)",color:"#fff",fontSize:12,
                  fontFamily:"'Cairo',sans-serif",outline:"none",cursor:"pointer"}}
              />
              <span style={{fontSize:11,color:"rgba(255,255,255,0.7)",fontWeight:700}}>{t("إلى:",lang)}</span>
              <input type="date" value={filterTo}
                onChange={e=>{setFilterTo(e.target.value);if(e.target.value){setFilterYear('all');setFilterMonth('all');}}}
                style={{padding:"4px 8px",borderRadius:8,border:"1px solid rgba(255,255,255,0.3)",
                  background:"rgba(30,58,95,0.8)",color:"#fff",fontSize:12,
                  fontFamily:"'Cairo',sans-serif",outline:"none",cursor:"pointer"}}
              />
              {(filterFrom||filterTo) && (
                <button onClick={clearDayFilter} style={{
                  background:"rgba(232,93,32,0.4)",color:"#fff",border:"none",
                  borderRadius:7,padding:"4px 10px",fontSize:11,fontWeight:700,
                  cursor:"pointer",fontFamily:"'Cairo',sans-serif"
                }}>{t("✕ مسح",lang)}</button>
              )}
              {/* ملخص الفترة */}
              <div style={{marginRight:"auto",background:"rgba(255,255,255,0.15)",
                borderRadius:8,padding:"4px 12px",fontSize:11,color:"#fff",fontWeight:700}}>
                📊 {daily.length} يوم &nbsp;·&nbsp; {fmt(grandTotal)} OMR
              </div>
            </div>
          </div>

          {/* KPI شريط */}
          <div style={{display:"grid",gridTemplateColumns:small?"1fr 1fr":"repeat(4,1fr)",
            gap:8,marginTop:10,borderTop:"1px solid rgba(255,255,255,0.15)",paddingTop:10}}>
            {[
              [t("إجمالي المدفوع",lang), fmt(totalPaid), "#86efac"],
              ["📊 التسويات", fmt(totalAdj), "#fde68a"],
              [t("📈 متوسط يومي",lang), fmt(avgDaily), "#e9d5ff"],
              [t("🏆 أفضل يوم",lang), (bestDay.date||'').slice(5)+' · '+fmtK(bestDay.paid+bestDay.adj||0), "#fff"],
            ].map(([l,v,c])=>(
              <div key={l} style={{textAlign:"center",padding:"10px",
                background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.12)",borderRadius:10}}>
                <div style={{fontSize:10,color:"rgba(255,255,255,0.6)",fontWeight:700,marginBottom:4}}>{l}</div>
                <div style={{fontSize:small?13:16,fontWeight:900,color:c,fontFamily:"'IBM Plex Mono',monospace",lineHeight:1}}>{v}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Tabs ── */}
        <div style={{display:"flex",borderBottom:"2px solid #f0ece8",background:"#f8f9fc",padding:"0 8px",flexShrink:0}}>
          {tabs.map(t=>(
            <button key={t.id} onClick={()=>setActiveChart(t.id)} style={{
              flex:1,padding:"12px 6px",border:"none",cursor:"pointer",
              background:"transparent",color:activeChart===t.id?"#1e3a5f":"#999",
              fontWeight:activeChart===t.id?900:600,fontSize:small?11:14,
              fontFamily:"'Cairo',sans-serif",
              borderBottom:activeChart===t.id?"3px solid #1e3a5f":"3px solid transparent",
              transition:"all 0.2s"
            }}>{t.label}</button>
          ))}
        </div>

        {/* ── Content ── */}
        <div style={{flex:1,overflow:"auto",padding:small?"12px":"20px 24px"}}>

          {/* ══ الاتجاه اليومي ══ */}
          {activeChart==='trend' && (
            <div>
              <div style={{fontSize:13,color:"#555",fontWeight:700,marginBottom:12}}>
                الدفعات اليومية — من {d.dateRange?.from} إلى {d.dateRange?.to}
              </div>

              {/* ── Bulk SVG Chart ── */}
              {(() => {
                const STEP=Math.max(36,Math.min(56,1100/Math.max(daily.length,1)));
                const CW=Math.max(daily.length*STEP+120,700);
                const CH=300,CPX=68,CPY=42,CPB=64;
                const cw=CW-CPX-20,ch=CH-CPY-CPB;
                const minVal=Math.min(...daily.map(d=>d.paid+d.adj));
                const maxVal=Math.max(...daily.map(d=>d.paid+d.adj),1);
                const range=maxVal-minVal||1;
                const xOf=i=>CPX+(daily.length>1?(i/(daily.length-1))*cw:cw/2);
                const yOf=v=>CPY+ch-((v-minVal)/range)*ch;
                const cpts=daily.map((d,i)=>({x:xOf(i),y:yOf(d.paid+d.adj),d}));
                const smooth=cpts.map((p,i,a)=>{
                  if(i===0) return `M${p.x},${p.y}`;
                  const pv=a[i-1],c1x=pv.x+(p.x-pv.x)*0.4,c2x=pv.x+(p.x-pv.x)*0.6;
                  return `C${c1x},${pv.y} ${c2x},${p.y} ${p.x},${p.y}`;
                }).join(' ');
                const area=cpts.length?smooth+` L${cpts[cpts.length-1].x},${CPY+ch} L${cpts[0].x},${CPY+ch} Z`:'';
                return (
                <div style={{background:"linear-gradient(135deg,#0f172a,#1e293b)",borderRadius:16,
                  padding:"14px 0 0",marginBottom:20,overflowX:"auto",boxShadow:"0 8px 32px rgba(0,0,0,0.3)"}}>
                  <div style={{padding:"0 16px 10px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <div style={{fontSize:13,color:"rgba(255,255,255,0.9)",fontWeight:800}}>
                      📈 الدفعات اليومية — {d.dateRange?.from} إلى {d.dateRange?.to}
                    </div>
                    <div style={{fontSize:11,color:"rgba(255,255,255,0.4)"}}>{daily.length} يوم · أعلى: {fmtK(maxVal)}</div>
                  </div>
                  <svg width={CW} height={CH} style={{display:"block",overflow:"visible"}}>
                    <defs>
                      <linearGradient id="aGradB" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#e85d20" stopOpacity="0.4"/>
                        <stop offset="100%" stopColor="#e85d20" stopOpacity="0"/>
                      </linearGradient>
                      <linearGradient id="lineGB" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#60a5fa"/>
                        <stop offset="50%" stopColor="#e85d20"/>
                        <stop offset="100%" stopColor="#f97316"/>
                      </linearGradient>
                      <filter id="dotGlowB"><feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#e85d20" floodOpacity="0.7"/></filter>
                    </defs>
                    {[0,0.25,0.5,0.75,1].map((r,gi)=>(
                      <g key={gi}>
                        <line x1={CPX} y1={CPY+ch*(1-r)} x2={CW-20} y2={CPY+ch*(1-r)}
                          stroke="rgba(255,255,255,0.07)" strokeWidth={r===0?1.5:1} strokeDasharray={r===0?"":"5,5"}/>
                        <text x={CPX-8} y={CPY+ch*(1-r)+4} textAnchor="end" fontSize="10" fill="rgba(255,255,255,0.45)" fontWeight="600" fontFamily="Cairo">{fmtK(minVal+range*r)}</text>
                      </g>
                    ))}
                    {area&&<path d={area} fill="url(#aGradB)"/>}
                    {smooth&&<path d={smooth} fill="none" stroke="#e85d2044" strokeWidth="7" strokeLinejoin="round" strokeLinecap="round"/>}
                    {smooth&&<path d={smooth} fill="none" stroke="url(#lineGB)" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round"/>}
                    {cpts.map((pt,i)=>{
                      const total=pt.d.paid+pt.d.adj;
                      const isBest=total===maxVal,isWorst=total===Math.min(...daily.map(x=>x.paid+x.adj)),isLast=i===cpts.length-1;
                      const lbl=total>=1000000?(total/1000000).toFixed(2)+'M':total>=1000?(total/1000).toFixed(1)+'K':total.toFixed(0);
                      const lblW=Math.max(lbl.length*6.5+14,36);
                      const lblAbove=pt.y>CPY+ch*0.78;
                      const lblY=lblAbove?pt.y-32:pt.y-22;
                      const dotR=isBest?7:isLast?6:isWorst?5:4;
                      const dotCol=isBest?"#f97316":isLast?"#60a5fa":isWorst?"#64748b":"#e2e8f0";
                      const showDate=daily.length<=20||i%Math.ceil(daily.length/20)===0||isBest||isLast;
                      return (
                        <g key={i} filter={isBest?"url(#dotGlowB)":undefined}>
                          <line x1={pt.x} y1={CPY+ch} x2={pt.x} y2={pt.y+dotR+2} stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
                          <rect x={pt.x-lblW/2} y={lblY-11} width={lblW} height={15} rx="7.5"
                            fill={isBest?"#f97316":isLast?"#1d4ed8":isWorst?"#334155":"#1e3a5f"}
                            stroke={isBest?"rgba(255,255,255,0.6)":"rgba(255,255,255,0.2)"} strokeWidth="0.8"/>
                          <text x={pt.x} y={lblY} textAnchor="middle" fontSize="8.5" fill="#fff" fontWeight="800" fontFamily="Cairo">{lbl}</text>
                          {isBest&&<text x={pt.x} y={lblY-15} textAnchor="middle" fontSize="11">🏆</text>}
                          <circle cx={pt.x} cy={pt.y} r={dotR+4} fill="rgba(255,255,255,0.05)"/>
                          <circle cx={pt.x} cy={pt.y} r={dotR} fill={dotCol} stroke="rgba(255,255,255,0.7)" strokeWidth={isBest?2.5:1.5}/>
                          <circle cx={pt.x-dotR*0.3} cy={pt.y-dotR*0.3} r={dotR*0.28} fill="rgba(255,255,255,0.4)"/>
                          {showDate&&(
                            <g>
                              <line x1={pt.x} y1={CPY+ch+3} x2={pt.x} y2={CPY+ch+9} stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
                              <text x={pt.x} y={CPY+ch+20} textAnchor="middle" fontSize="9.5"
                                fill={isBest?"#f97316":isLast?"#60a5fa":"rgba(255,255,255,0.5)"}
                                fontWeight={isBest||isLast?"800":"600"} fontFamily="Cairo">
                                {pt.d.date.slice(5,7)+'-'+pt.d.date.slice(8)}
                              </text>
                              <text x={pt.x} y={CPY+ch+33} textAnchor="middle" fontSize="8" fill="rgba(255,255,255,0.22)" fontFamily="Cairo">{pt.d.date.slice(0,4)}</text>
                            </g>
                          )}
                        </g>
                      );
                    })}
                  </svg>
                </div>);
              })()}

              {/* ملخص أسبوعي */}
              <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginBottom:16}}>
                {[
                  [t(t("أيام نشطة",lang),lang), daily.length+" "+t("يوم",lang), "#1e3a5f"],
                  ["⬆️ أعلى يوم", (bestDay.date||'').slice(5)+" · "+fmt(bestDay.paid+bestDay.adj||0), "#e85d20"],
                  ["📉 أدنى يوم", (worstDay.date||'').slice(5)+" · "+fmt(worstDay.paid+worstDay.adj||0), "#888"],
                ].map(([l,v,c])=>(
                  <div key={l} style={{background:"#f8f4f1",borderRadius:12,padding:"14px",textAlign:"center",border:"1px solid #f0ece8"}}>
                    <div style={{fontSize:11,color:"#888",fontWeight:700,marginBottom:6}}>{l}</div>
                    <div style={{fontSize:14,fontWeight:900,color:c}}>{v}</div>
                  </div>
                ))}
              </div>

              {/* جدول تفصيلي */}
              <div style={{maxHeight:220,overflowY:"auto"}}>
                <div style={{display:"grid",gridTemplateColumns:"110px 1fr 130px 130px 60px",
                  gap:6,padding:"8px 10px",background:"#1e3a5f",borderRadius:8,marginBottom:6}}>
                  {["التاريخ","التقدم",t("المدفوع",lang),t("الإجمالي",lang),"عدد"].map((h,i)=>(
                    <div key={i} style={{fontSize:12,fontWeight:800,color:"#fff",textAlign:i>=2?"center":"right"}}>{h}</div>
                  ))}
                </div>
                {[...daily].reverse().map((day,i)=>{
                  const total=day.paid+day.adj;
                  const pct=(total/maxDaily*100);
                  return(
                  <div key={i} style={{
                    display:"grid",gridTemplateColumns:"110px 1fr 130px 130px 60px",
                    gap:6,alignItems:"center",padding:"9px 10px",
                    background:i%2===0?"#fff":"#f8f4f1",
                    borderRadius:8,marginBottom:3,border:"1px solid #f0ece8"
                  }}>
                    <div style={{fontSize:14,fontWeight:800,color:"#111"}}>{day.date}</div>
                    <div style={{background:"#f0ece8",borderRadius:4,height:8,overflow:"hidden"}}>
                      <div style={{width:pct+"%",height:"100%",
                        background:`linear-gradient(90deg,#1e3a5f,#2d5a8e)`,borderRadius:4}}/>
                    </div>
                    <div style={{fontSize:14,fontWeight:800,color:"#16a34a",textAlign:"center"}}>{fmt(day.paid)}</div>
                    <div style={{fontSize:15,fontWeight:900,color:"#1e3a5f",textAlign:"center"}}>{fmt(total)}</div>
                    <div style={{textAlign:"center"}}>
                      <span style={{background:"#1e3a5f22",color:"#1e3a5f",borderRadius:6,
                        padding:"2px 7px",fontSize:12,fontWeight:700}}>{day.count}</span>
                    </div>
                  </div>);
                })}
              </div>
            </div>
          )}

          {/* ══ المناطق ══ */}
          {activeChart==='region' && (
            <div>
              <div style={{fontSize:13,color:"#555",fontWeight:700,marginBottom:16}}>
                توزيع المدفوعات حسب المنطقة
              </div>

              {/* SVG Donut Chart */}
              <div style={{display:"flex",gap:24,alignItems:"center",marginBottom:20,flexWrap:"wrap"}}>
                <svg viewBox="0 0 200 200" width={small?160:200} style={{flexShrink:0}}>
                  {(() => {
                    let offset = -90;
                    return regions.map((r,i)=>{
                      const pct = (r.paid+r.adj)/grandTotal;
                      const angle = pct * 360;
                      const rad = Math.PI/180;
                      const r1=80, r2=50, cx=100, cy=100;
                      const x1=cx+r1*Math.cos((offset)*rad);
                      const y1=cy+r1*Math.sin((offset)*rad);
                      const x2=cx+r1*Math.cos((offset+angle)*rad);
                      const y2=cy+r1*Math.sin((offset+angle)*rad);
                      const x3=cx+r2*Math.cos((offset+angle)*rad);
                      const y3=cy+r2*Math.sin((offset+angle)*rad);
                      const x4=cx+r2*Math.cos((offset)*rad);
                      const y4=cy+r2*Math.sin((offset)*rad);
                      const large = angle>180?1:0;
                      const col = getRegColor(r);
                      const path = `M${x1},${y1} A${r1},${r1} 0 ${large},1 ${x2},${y2} L${x3},${y3} A${r2},${r2} 0 ${large},0 ${x4},${y4} Z`;
                      offset += angle;
                      return <path key={i} d={path} fill={col} stroke="#fff" strokeWidth="2"/>;
                    });
                  })()}
                  <text x="100" y="96" textAnchor="middle" fontSize="11" fill="#1e3a5f"
                    fontWeight="900" fontFamily="Cairo">الإجمالي</text>
                  <text x="100" y="112" textAnchor="middle" fontSize="9" fill="#555"
                    fontFamily="Cairo">{fmtK(grandTotal)}</text>
                </svg>

                {/* Legend */}
                <div style={{flex:1,minWidth:180}}>
                  {regions.map((r,i)=>{
                    const col = getRegColor(r);
                    const pct = Math.round((r.paid+r.adj)/grandTotal*100);
                    return(
                    <div key={i} style={{display:"flex",alignItems:"center",gap:10,
                      padding:"8px 10px",borderRadius:8,marginBottom:6,
                      background:"#f8f4f1",border:`1px solid #f0ece8`,
                      borderRight:`4px solid ${col}`}}>
                      <div style={{flex:1}}>
                        <div style={{fontSize:13,fontWeight:800,color:"#000"}}>{lang==='en'?(r.nameEn||r.nameAr):r.nameAr}</div>
                        <div style={{fontSize:11,color:"#888"}}>{r.count} دفعة</div>
                      </div>
                      <div style={{textAlign:"left"}}>
                        <div style={{fontSize:14,fontWeight:900,color:col}}>{fmt(r.paid+r.adj)}</div>
                        <div style={{fontSize:12,fontWeight:700,color:"#888"}}>{pct}%</div>
                      </div>
                    </div>);
                  })}
                </div>
              </div>

              {/* Bar chart للمناطق */}
              <div style={{background:"#f8fafc",borderRadius:12,padding:"16px",border:"1px solid #e8f0fe"}}>
                {regions.map((r,i)=>{
                  const pct=(r.paid+r.adj)/maxReg*100;
                  const col=getRegColor(r);
                  return(
                  <div key={i} style={{marginBottom:14}}>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
                      <span style={{fontSize:13,fontWeight:800,color:"#000"}}>{lang==='en'?(r.nameEn||r.nameAr):r.nameAr}</span>
                      <span style={{fontSize:13,fontWeight:900,color:col}}>{fmt(r.paid+r.adj)} OMR</span>
                    </div>
                    <div style={{background:"#e8f0fe",borderRadius:6,height:12,overflow:"hidden",position:"relative"}}>
                      <div style={{
                        width:pct+"%",height:"100%",
                        background:`linear-gradient(90deg,${col},${col}aa)`,
                        borderRadius:6,transition:"width 0.8s ease"
                      }}/>
                    </div>
                    <div style={{display:"flex",justifyContent:"space-between",marginTop:3}}>
                      <span style={{fontSize:10,color:"#888"}}>{t("مدفوع:",lang)} {fmt(r.paid)}</span>
                      <span style={{fontSize:10,color:"#888"}}>{t("تسويات:",lang)} {fmt(r.adj)}</span>
                    </div>
                  </div>);
                })}
              </div>
            </div>
          )}

          {/* ══ المحصّلون ══ */}
          {activeChart==='collector' && (
            <div>
              <div style={{fontSize:13,color:"#555",fontWeight:700,marginBottom:16}}>
                أعلى {collectors.length} محصّلين خلال الفترة
              </div>

              {/* Top 3 podium */}
              <div style={{display:"flex",justifyContent:"center",alignItems:"flex-end",
                gap:12,marginBottom:24,direction:"ltr"}}>
                {[
                  {idx:1, height:90,  color:"#c0c0c0", label:t("🥈 ثانٍ",lang),  medal:"🥈"},
                  {idx:0, height:110, color:"#ffd700", label:t("🥇 أول",lang),   medal:"🥇"},
                  {idx:2, height:75,  color:"#cd7f32", label:t("🥉 ثالث",lang),  medal:"🥉"},
                ].map(({idx,height,color,label,medal})=>{
                  const c = collectors[idx];
                  if (!c) return null;
                  return(
                  <div key={idx} style={{textAlign:"center",flex:1,maxWidth:160}}>
                    <div style={{fontSize:10,color:"#888",fontWeight:700,marginBottom:4}}>{label}</div>
                    <div style={{fontSize:12,fontWeight:800,color:"#000",
                      marginBottom:6,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
                      {c.name}
                    </div>
                    <div style={{fontSize:13,fontWeight:900,color:"#1e3a5f",marginBottom:6}}>
                      {fmt(c.paid+c.adj)}
                    </div>
                    <div style={{
                      height:height,
                      background:`linear-gradient(180deg,${color},${color}88)`,
                      borderRadius:"8px 8px 0 0",
                      border:`2px solid ${color}`,
                      display:"flex",alignItems:"center",justifyContent:"center",
                      fontSize:24
                    }}>{medal}</div>
                  </div>);
                })}
              </div>

              {/* قائمة كاملة */}
              <div style={{maxHeight:280,overflowY:"auto"}}>
                <div style={{display:"grid",gridTemplateColumns:"30px 1fr 80px 120px 50px",
                  gap:6,padding:"8px 10px",background:"#1e3a5f",borderRadius:8,marginBottom:6}}>
                  {["#",t("المحصّل",lang),t("المنطقة",lang),t("الإجمالي",lang),"عدد"].map((h,i)=>(
                    <div key={i} style={{fontSize:12,fontWeight:800,color:"#fff",textAlign:i>=2?"center":"right"}}>{h}</div>
                  ))}
                </div>
                {collectors.map((c,i)=>{
                  const total=c.paid+c.adj;
                  const pct=Math.round(total/maxCol*100);
                  const medals=["🥇","🥈","🥉"];
                  return(
                  <div key={i} style={{
                    display:"grid",gridTemplateColumns:"30px 1fr 80px 120px 50px",
                    gap:6,alignItems:"center",padding:"10px",
                    background:i%2===0?"#fff":"#f8f4f1",
                    borderRadius:8,marginBottom:4,border:"1px solid #f0ece8"
                  }}>
                    <div style={{textAlign:"center",fontSize:i<3?18:13,fontWeight:800,
                      color:["#ffd700","#c0c0c0","#cd7f32","#555"][Math.min(i,3)]}}>
                      {i<3?medals[i]:i+1}
                    </div>
                    <div>
                      <div style={{fontSize:13,fontWeight:800,color:"#000",
                        overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{c.name}</div>
                      <div style={{height:4,background:"#f0ece8",borderRadius:2,marginTop:4,overflow:"hidden"}}>
                        <div style={{width:pct+"%",height:"100%",
                          background:"linear-gradient(90deg,#1e3a5f,#2d5a8e)",borderRadius:2}}/>
                      </div>
                    </div>
                    <div style={{textAlign:"center",fontSize:10,color:"#888",
                      overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
                      {c.region}
                    </div>
                    <div style={{textAlign:"center",fontSize:15,fontWeight:900,color:"#1e3a5f"}}>{fmt(total)}</div>
                    <div style={{textAlign:"center"}}>
                      <span style={{background:"#1e3a5f22",color:"#1e3a5f",borderRadius:6,
                        padding:"2px 6px",fontSize:12,fontWeight:700}}>{c.count}</span>
                    </div>
                  </div>);
                })}
              </div>
            </div>
          )}

          {/* ══ مؤشرات الأداء ══ */}
          {activeChart==='kpi' && (
            <div>
              <div style={{fontSize:13,color:"#555",fontWeight:700,marginBottom:16}}>
                مؤشرات الأداء الرئيسية — KPIs
              </div>

              {/* البطاقات الرئيسية */}
              <div style={{display:"grid",gridTemplateColumns:small?"1fr":"1fr 1fr",gap:14,marginBottom:20}}>
                {[
                  {icon:"💰",title:t("إجمالي المدفوع",lang),value:fmt(totalPaid),sub:"OMR",color:"#16a34a",bg:"#f0fdf4"},
                  {icon:"📊",title:t("إجمالي التسويات",lang),value:fmt(totalAdj),sub:"OMR",color:"#d97706",bg:"#fffbeb"},
                  {icon:"🏆",title:t("الإجمالي الكلي",lang),value:fmt(grandTotal),sub:"OMR",color:"#1e3a5f",bg:"#eff6ff"},
                  {icon:"📈",title:t("المتوسط اليومي",lang),value:fmt(avgDaily),sub:"OMR/يوم",color:"#7c3aed",bg:"#f5f3ff"},
                  {icon:"📅",title:t("أيام نشطة",lang),value:daily.length,sub:t("من إجمالي الأيام",lang),color:"#0369a1",bg:"#f0f9ff"},
                  {icon:"👤",title:t("عدد المحصّلين",lang),value:collectors.length,sub:t("محصّل نشط",lang),color:"#be185d",bg:"#fdf2f8"},
                  {icon:"📋",title:t("إجمالي الدفعات",lang),value:(d.totalRecords||0).toLocaleString(),sub:t("دفعة",lang),color:"#065f46",bg:"#ecfdf5"},
                  {icon:growthRate>=0?"📈":"📉",title:t("معدل النمو",lang),value:Math.abs(growthRate).toFixed(1)+"%",
                    sub:growthRate>=0?t("نمو إيجابي ✅",lang):t("تراجع ⚠️",lang),
                    color:growthRate>=0?"#16a34a":"#dc2626",
                    bg:growthRate>=0?"#f0fdf4":"#fef2f2"},
                ].map((kpi,i)=>(
                  <div key={i} style={{
                    background:kpi.bg,borderRadius:14,padding:"16px 18px",
                    border:`1.5px solid ${kpi.color}22`,
                    display:"flex",alignItems:"center",gap:16
                  }}>
                    <div style={{
                      width:50,height:50,borderRadius:14,
                      background:`${kpi.color}18`,
                      display:"flex",alignItems:"center",justifyContent:"center",
                      fontSize:24,flexShrink:0
                    }}>{kpi.icon}</div>
                    <div>
                      <div style={{fontSize:11,color:"#888",fontWeight:700,marginBottom:4}}>{kpi.title}</div>
                      <div style={{fontSize:22,fontWeight:900,color:kpi.color,lineHeight:1}}>{kpi.value}</div>
                      <div style={{fontSize:10,color:"#aaa",marginTop:3}}>{kpi.sub}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* توزيع بالنسبة المئوية */}
              <div style={{background:"#f8f4f1",borderRadius:14,padding:"16px",border:"1px solid #f0ece8"}}>
                <div style={{fontSize:13,fontWeight:800,color:"#333",marginBottom:12}}>
                  📊 توزيع المدفوعات بالنسبة المئوية
                </div>
                <div style={{height:24,background:"#f0ece8",borderRadius:12,overflow:"hidden",
                  display:"flex",marginBottom:10}}>
                  {regions.map((r,i)=>{
                    const pct=(r.paid+r.adj)/grandTotal*100;
                    const col=getRegColor(r);
                    return pct>1 && (
                      <div key={i} title={`${r.nameAr}: ${pct.toFixed(1)}%`}
                        style={{width:pct+"%",background:col,height:"100%",
                          borderLeft:i>0?"1px solid rgba(255,255,255,0.4)":""}}/>
                    );
                  })}
                </div>
                <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
                  {regions.map((r,i)=>{
                    const pct=(r.paid+r.adj)/grandTotal*100;
                    const col=getRegColor(r);
                    return pct>1 && (
                      <div key={i} style={{display:"flex",alignItems:"center",gap:5}}>
                        <div style={{width:10,height:10,borderRadius:3,background:col,flexShrink:0}}/>
                        <span style={{fontSize:11,color:"#555",fontWeight:700}}>
                          {lang==='en'?(r.nameEn||r.nameAr):r.nameAr} {pct.toFixed(1)}%
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

function BulkPaymentSection({ bulk, small, onBulkUpdate, requireUploadAuth }) {
  const { lang } = useLang();
  const [activeTab, setActiveTab]       = useState('daily');
  const [selectedDate, setSelectedDate] = useState(null);
  const [filterFrom, setFilterFrom]     = useState('');
  const [filterTo, setFilterTo]         = useState('');
  const [bulkUploading, setBulkUploading] = useState(false);
  const [bulkSuccess, setBulkSuccess]   = useState(false);
  const [bulkError, setBulkError]       = useState(null);
  const [bulkData, setBulkData]         = useState(bulk);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const fileRef = useRef(null);

  const handleBulkFile = async (file) => {
    setBulkUploading(true); setBulkError(null);
    try {
      const parsed = await parseBulkPayment(file);

      // ── قراءة البيانات المحفوظة (Firebase أولاً ← localStorage ← state) ────
      let existing = null;
      // 1) Firebase (المصدر الحقيقي - يحتوي كل التاريخ)
      try {
        const fbData = await sbGet('oneic_bulk');
        if (fbData?.daily?.length > 0) {
          existing = fbData;
          // حدّث localStorage بأحدث نسخة من Firebase
          try { localStorage.setItem('oneic_bulk_data', JSON.stringify(fbData)); } catch(e) {}
        }
      } catch(e) { console.warn('Firebase read failed, falling back:', e.message); }
      // 2) localStorage (احتياطي)
      if (!existing) {
        try {
          const saved = localStorage.getItem('oneic_bulk_data');
          if (saved) {
            const p = JSON.parse(saved);
            if (p?.daily?.length > 0) existing = p;
          }
        } catch(e) {}
      }
      // 3) state الحالية (آخر خيار)
      if (!existing && bulkData?.daily?.length > 0 && bulkData !== BULK_SEED) {
        existing = bulkData;
      }

      let final = parsed;

      if (existing && existing.daily && existing.daily.length > 0) {
        // دمج الأيام
        const dayMap = {};
        (existing.daily||[]).forEach(d => { dayMap[d.date] = {...d}; });
        (parsed.daily||[]).forEach(d => { dayMap[d.date] = {...d}; });
        const mergedDaily = Object.values(dayMap).sort((a,b)=>a.date.localeCompare(b.date));

        // دمج المناطق
        const regMap = {};
        (existing.byRegion||[]).forEach(r => { regMap[r.nameEn||r.nameAr] = {...r}; });
        (parsed.byRegion||[]).forEach(r => {
          const key = r.nameEn||r.nameAr;
          if (regMap[key]) { regMap[key].paid+=r.paid; regMap[key].adj+=r.adj; regMap[key].count+=r.count; }
          else regMap[key] = {...r};
        });

        // دمج المحصّلين
        const colMap = {};
        (existing.topCollectors||[]).forEach(c => { colMap[c.name+'|'+(c.region||'')] = {...c}; });
        (parsed.topCollectors||[]).forEach(c => {
          const key = c.name+'|'+(c.region||'');
          if (colMap[key]) { colMap[key].paid+=c.paid; colMap[key].adj+=c.adj; colMap[key].count+=c.count; }
          else colMap[key] = {...c};
        });

        // دمج dailyDetail
        const detailMap = { ...(existing.dailyDetail||{}) };
        Object.entries(parsed.dailyDetail||{}).forEach(([date,cols]) => { detailMap[date] = cols; });

        const totalPaid = mergedDaily.reduce((s,d)=>s+d.paid,0);
        const totalAdj  = mergedDaily.reduce((s,d)=>s+d.adj,0);
        const allDates  = mergedDaily.map(d=>d.date).sort();
        const avgDaily  = mergedDaily.length ? totalPaid/mergedDaily.length : 0;
        const bestDay   = mergedDaily.reduce((a,b)=>(a.paid+a.adj)>(b.paid+b.adj)?a:b, mergedDaily[0]||{});

        final = {
          fileName: (existing.fileName||'') + ' + ' + (parsed.fileName||''),
          uploadedAt: new Date().toISOString(),
          dateRange: { from: allDates[0]||'', to: allDates[allDates.length-1]||'' },
          totalPaid, totalAdj,
          totalRecords: mergedDaily.reduce((s,d)=>s+d.count,0),
          daily: mergedDaily,
          byRegion: Object.values(regMap).sort((a,b)=>(b.paid+b.adj)-(a.paid+a.adj)),
          topCollectors: Object.values(colMap).sort((a,b)=>(b.paid+b.adj)-(a.paid+a.adj)).slice(0,30),
          dailyDetail: detailMap,
          stats: { avgDaily, bestDay, activeDays: mergedDaily.length,
                   totalCollectors: Object.keys(colMap).length }
        };
      }

      // ── حفظ محلي ─────────────────────────────────────────────────────────
      try { localStorage.setItem('oneic_bulk_data', JSON.stringify(final)); } catch(e){}

      // ── رفع لـ Firebase ─────────────────────────────────────────────────────────
      try {
        await sbUpsert('oneic_bulk', { payload: final });
      } catch(e) { console.warn('Firebase bulk upload failed:', e); }

      setBulkData(final);
      if (onBulkUpdate) onBulkUpdate(final);
      setSelectedDate(null);
      setBulkSuccess(true);
      setTimeout(()=>setBulkSuccess(false), 4000);
    } catch(e) { setBulkError(e.message); }
    finally { setBulkUploading(false); }
  };

  useEffect(() => {
    async function loadBulk() {
      // أولاً: جرّب Supabase
      try {
        const row = await sbGet('oneic_bulk');
        if (row?.daily?.length > 0) {
          setBulkData(row);
          try { localStorage.setItem('oneic_bulk_data', JSON.stringify(row)); } catch(e) {}
          return;
        }
      } catch(e) { console.warn('Firebase bulk load failed, using localStorage:', e.message); }
      // ثانياً: localStorage
      try {
        const saved = localStorage.getItem('oneic_bulk_data');
        if (saved) { const p=JSON.parse(saved); if(p?.daily?.length>0) setBulkData(p); }
      } catch(e) {}
    }
    loadBulk();
  }, []);

  const d = bulkData;
  if (!d) return null;

  const fmt = n => new Intl.NumberFormat("en-US",{minimumFractionDigits:3,maximumFractionDigits:3}).format(n||0);
  const maxDaily  = d.daily?.length ? Math.max(...d.daily.map(x=>x.paid+x.adj),1) : 1;
  const maxCol    = d.topCollectors?.length ? Math.max(...d.topCollectors.map(x=>x.paid+x.adj),1) : 1;
  const maxReg    = d.byRegion?.length ? Math.max(...d.byRegion.map(x=>x.paid+x.adj),1) : 1;

  // بيانات اليوم المختار
  const selDay         = selectedDate ? d.daily?.find(x=>x.date===selectedDate) : null;
  const selCollectors  = selectedDate && d.dailyDetail ? (d.dailyDetail[selectedDate]||[]) : [];

  // تجميع المناطق لليوم المختار
  const selRegions = selCollectors.reduce((acc,c)=>{
    const ar = c.region||c.nameEn||'';
    if(!acc[ar]) acc[ar]={nameEn:ar,paid:0,adj:0,count:0};
    acc[ar].paid+=c.paid; acc[ar].adj+=c.adj; acc[ar].count+=c.count;
    return acc;
  },{});
  const selRegionArr = Object.values(selRegions).sort((a,b)=>(b.paid+b.adj)-(a.paid+a.adj));

  const REG_COLORS_MAP = {
    'Debt Collection Company':'#1a7a6b','Head Office':'#6c3fa0','Legal ':'#6c3fa0','Legal':'#6c3fa0',
    'MUSCAT AND AL DAKHILIYAH':'#e85d20','South and North Al Batinah':'#c44b10',
    'North and South Al Shaurqiah and Al Wasatah':'#d4601a',
    'Musandam, Al Burimai and Al Dahirah':'#b03808','Dhofar':'#f07030','Dhofar ':'#f07030',
  };
  const REG_AR_MAP = {
    'Debt Collection Company':'شركات التحصيل','Head Office':'المكتب الرئيسي',
    'Legal ':'المكتب الرئيسي','Legal':'المكتب الرئيسي',
    'MUSCAT AND AL DAKHILIYAH':'مسقط والداخلية',
    'South and North Al Batinah':'الباطنة','North and South Al Shaurqiah and Al Wasatah':'الشرقية والوسطى',
    'Musandam, Al Burimai and Al Dahirah':'مسندم والبريمي','Dhofar':'ظفار','Dhofar ':'ظفار',
  };

  const tabs = [{id:'daily',label:t('📅 يومي',lang)},{id:'region',label:t('🗺 المناطق',lang)},{id:'collector',label:t('👤 المحصّلون',lang)}];

  return (
    <>
    <div style={{background:"#fff",borderRadius:16,boxShadow:"0 3px 18px rgba(0,0,0,0.07)",
      border:"1.5px solid #f0ece8",marginBottom:18,overflow:"hidden"}}>

      {/* ══ HEADER ══ */}
      <div style={{background:"linear-gradient(135deg,#1e3a5f 0%,#2d5a8e 50%,#1e3a5f 100%)",padding:small?"14px 16px":"18px 24px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12}}>
          <div style={{display:"flex",alignItems:"center",gap:14}}>
            <div style={{
              width:48,height:48,borderRadius:14,
              background:"rgba(255,255,255,0.15)",
              border:"1.5px solid rgba(255,255,255,0.25)",
              display:"flex",alignItems:"center",justifyContent:"center",
              fontSize:24,flexShrink:0
            }}>💳</div>
            <div>
              <div style={{fontSize:small?16:22,fontWeight:900,color:"#fff",letterSpacing:0.3}}>
                Bulk Payment Report
              </div>
              <div style={{fontSize:11,color:"rgba(255,255,255,0.55)",marginTop:3,display:"flex",gap:8,flexWrap:"wrap"}}>
                <span>📅 {d.dateRange?.from} → {d.dateRange?.to}</span>
                <span>·</span>
                <span>📋 {d.totalRecords?.toLocaleString()} {t(t("دفعة",lang),lang)}</span>
                {/* fileName hidden */}
              </div>
            </div>
          </div>
          <div style={{display:"flex",gap:10,alignItems:"center"}}>
          <button onClick={()=>setShowAnalytics(true)} style={{
            background:"linear-gradient(120deg,rgba(255,255,255,0.25),rgba(255,255,255,0.15))",
            color:"#fff",border:"1.5px solid rgba(255,255,255,0.5)",
            borderRadius:10,padding:"8px 16px",
            fontSize:13,fontWeight:800,cursor:"pointer",
            fontFamily:"'Cairo',sans-serif",
            display:"flex",alignItems:"center",gap:6,
            whiteSpace:"nowrap",boxShadow:"0 2px 8px rgba(0,0,0,0.2)"
          }}>📊 {small?t("تحليل",lang):t("التحليل البياني",lang)}</button>
          <button onClick={()=>handleBulkPrint(bulkData,filterFrom,filterTo)} style={{
            background:"rgba(255,255,255,0.15)",color:"#fff",
            border:"1.5px solid rgba(255,255,255,0.3)",
            borderRadius:10,padding:"8px 16px",
            fontSize:13,fontWeight:800,cursor:"pointer",
            fontFamily:"'Cairo',sans-serif",
            display:"flex",alignItems:"center",gap:6,
            whiteSpace:"nowrap"
          }}>🖨️ {small?"PDF":t("طباعة PDF",lang)}</button>
          <button onClick={()=>{
            if(window.confirm('هل تريد مسح كل بيانات Bulk Payment والبدء من جديد؟')) {
              try { localStorage.removeItem('oneic_bulk_data'); } catch(e){}
              setBulkData(BULK_SEED);
              setSelectedDate(null);
            }
          }} style={{
            background:"rgba(255,255,255,0.08)",color:"rgba(255,255,255,0.6)",
            border:"1px solid rgba(255,255,255,0.2)",
            borderRadius:10,padding:"8px 12px",
            fontSize:12,fontWeight:700,cursor:"pointer",
            fontFamily:"'Cairo',sans-serif",
            whiteSpace:"nowrap",flexShrink:0,title:"مسح البيانات"
          }}>{t("🗑 مسح",lang)}</button>
          <div onClick={()=>!bulkUploading&&fileRef.current?.click()}
            onDrop={e=>{e.preventDefault();const f=e.dataTransfer.files?.[0];if(f)requireUploadAuth(()=>handleBulkFile(f));}}
            onDragOver={e=>e.preventDefault()}
            style={{border:`1.5px dashed ${bulkSuccess?"#22c55e":bulkUploading?"#60a5fa":"rgba(255,255,255,0.4)"}`,
              borderRadius:10,padding:"8px 14px",cursor:"pointer",
              background:bulkSuccess?"rgba(34,197,94,0.15)":"rgba(255,255,255,0.08)",
              textAlign:"center",minWidth:145}}>
            <input ref={fileRef} type="file" accept=".xlsx,.xls" style={{display:"none"}}
              onChange={e=>{const f=e.target.files?.[0];if(f)requireUploadAuth(()=>{handleBulkFile(f);e.target.value="";});}}/>
            {bulkUploading?<div style={{color:"#60a5fa",fontSize:12,fontWeight:700}}>{t("⏳ جاري التحليل...",lang)}</div>
             :bulkSuccess?<div style={{color:"#22c55e",fontSize:12,fontWeight:700}}>{t("✅ تم التحديث",lang)}</div>
             :<><div style={{fontSize:16}}>📂</div>
               <div style={{fontSize:11,color:"#fff",fontWeight:700}}>{t("رفع Bulk Payment",lang)}</div>
               <div style={{fontSize:10,color:"rgba(255,255,255,0.5)",marginTop:1}}>{t(".xlsx يومي",lang)}</div></>}
            {bulkError&&<div style={{color:"#f87171",fontSize:10,marginTop:3}}>⚠ {bulkError}</div>}
          </div>
          </div>
        </div>

        {/* إجماليات */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginTop:14}}>
          {[[t("إجمالي المدفوع",lang),fmt(d.totalPaid),"#86efac","#16a34a"],
            [t("إجمالي التسويات",lang),fmt(d.totalAdj),"#fde68a","#d97706"],
            [t("الإجمالي الكلي",lang),fmt(d.totalPaid+d.totalAdj),"#fff","#fff"]].map(([l,v,c,b])=>(
            <div key={l} style={{
              background:"rgba(255,255,255,0.1)",
              border:"1px solid rgba(255,255,255,0.15)",
              borderRadius:12,padding:"12px 10px",textAlign:"center"
            }}>
              <div style={{fontSize:small?10:12,color:"rgba(255,255,255,0.65)",fontWeight:700,marginBottom:6}}>{l}</div>
              <div style={{fontSize:small?14:18,fontWeight:900,color:c,lineHeight:1,fontFamily:"'IBM Plex Mono',monospace"}}>{v}</div>
              <div style={{fontSize:10,color:"rgba(255,255,255,0.4)",marginTop:3}}>OMR</div>
            </div>))}
        </div>

        {/* إحصاءات ذكية */}
        {d.stats&&(
          <div style={{display:"grid",gridTemplateColumns:small?"1fr 1fr":"repeat(4,1fr)",
            gap:8,marginTop:14,borderTop:"1px solid rgba(255,255,255,0.15)",paddingTop:14}}>
            {[
              [t(t("أيام نشطة",lang),lang), d.stats.activeDays, "يوم", "#bfdbfe"],
              [t("👤 المحصّلون",lang),  d.stats.totalCollectors, t("محصّل",lang), "#d9f99d"],
              [t("🏆 أفضل يوم",lang),  d.stats.bestDay?.date?.slice(5)||"—", fmt(d.stats.bestDay?.paid||0)+" OMR", "#fde68a"],
              [t("📈 متوسط يومي",lang), fmt(d.stats.avgDaily||0), "OMR", "#e9d5ff"],
            ].map(([l,v,s,c])=>(
              <div key={l} style={{
                textAlign:"center",padding:"10px 8px",
                background:"rgba(255,255,255,0.08)",
                border:"1px solid rgba(255,255,255,0.12)",
                borderRadius:10
              }}>
                <div style={{fontSize:10,color:"rgba(255,255,255,0.6)",fontWeight:700,marginBottom:4}}>{l}</div>
                <div style={{fontSize:small?16:20,fontWeight:900,color:c,lineHeight:1}}>{v}</div>
                <div style={{fontSize:10,color:"rgba(255,255,255,0.45)",marginTop:3}}>{s}</div>
              </div>))}
          </div>
        )}
      </div>

      {/* ══ TABS ══ */}
      <div style={{display:"flex",borderBottom:"2px solid #f0ece8",background:"#f8f9fc",padding:"0 8px"}}>
        {tabs.map(t=>(
          <button key={t.id} onClick={()=>{setActiveTab(t.id);if(t.id!=='daily')setSelectedDate(null);}} style={{
            flex:1,padding:"13px 6px",border:"none",cursor:"pointer",
            background:"transparent",
            color:activeTab===t.id?"#1e3a5f":"#999",
            fontWeight:activeTab===t.id?900:600,
            fontSize:small?13:15,
            fontFamily:"'Cairo',sans-serif",
            borderBottom:activeTab===t.id?"3px solid #1e3a5f":"3px solid transparent",
            transition:"all 0.2s",
            letterSpacing:0.3
          }}>{t.label}</button>
        ))}
      </div>

      {/* ══ CONTENT ══ */}
      <div style={{padding:small?"12px":"16px 20px"}}>

        {/* ══ تبويب يومي ══ */}
        {activeTab==='daily'&&(
          <div>
            {/* ── فلتر الفترة الزمنية ── */}
            <div style={{
              display:"flex",alignItems:"center",gap:10,
              padding:"12px 14px",background:"#f8f4f1",
              borderRadius:12,marginBottom:14,flexWrap:"wrap"
            }}>
              <span style={{fontSize:13,fontWeight:800,color:"#333"}}>{t("📅 تحديد الفترة:",lang)}</span>
              <div style={{display:"flex",alignItems:"center",gap:8,flex:1,flexWrap:"wrap"}}>
                <div style={{display:"flex",alignItems:"center",gap:6}}>
                  <span style={{fontSize:12,color:"#666",fontWeight:700}}>{t("من:",lang)}</span>
                  <input type="date"
                    value={filterFrom}
                    onChange={e=>{setFilterFrom(e.target.value);setSelectedDate(null);}}
                    style={{padding:"6px 10px",borderRadius:8,border:"1.5px solid #e5e7eb",
                      fontSize:13,fontFamily:"'Cairo',sans-serif",color:"#111",cursor:"pointer"}}
                  />
                </div>
                <div style={{display:"flex",alignItems:"center",gap:6}}>
                  <span style={{fontSize:12,color:"#666",fontWeight:700}}>{t("إلى:",lang)}</span>
                  <input type="date"
                    value={filterTo}
                    onChange={e=>{setFilterTo(e.target.value);setSelectedDate(null);}}
                    style={{padding:"6px 10px",borderRadius:8,border:"1.5px solid #e5e7eb",
                      fontSize:13,fontFamily:"'Cairo',sans-serif",color:"#111",cursor:"pointer"}}
                  />
                </div>
                {(filterFrom||filterTo) && (
                  <button onClick={()=>{setFilterFrom('');setFilterTo('');setSelectedDate(null);}}
                    style={{background:"#e85d20",color:"#fff",border:"none",borderRadius:8,
                      padding:"6px 14px",fontSize:12,fontWeight:700,cursor:"pointer",
                      fontFamily:"'Cairo',sans-serif"}}>
                    ✕ مسح الفلتر
                  </button>
                )}
              </div>
              {(filterFrom||filterTo) && (() => {
                const filtered = (d.daily||[]).filter(x=>
                  (!filterFrom||x.date>=filterFrom) && (!filterTo||x.date<=filterTo)
                );
                const total = filtered.reduce((s,x)=>s+x.paid+x.adj,0);
                const count = filtered.reduce((s,x)=>s+x.count,0);
                return (
                  <div style={{display:"flex",gap:16,padding:"6px 12px",
                    background:"#1e3a5f",borderRadius:10,flexWrap:"wrap"}}>
                    <div style={{textAlign:"center"}}>
                      <div style={{fontSize:10,color:"rgba(255,255,255,0.65)",fontWeight:700}}>{t("أيام في الفترة",lang)}</div>
                      <div style={{fontSize:16,fontWeight:900,color:"#fff"}}>{filtered.length}</div>
                    </div>
                    <div style={{textAlign:"center"}}>
                      <div style={{fontSize:10,color:"rgba(255,255,255,0.65)",fontWeight:700}}>{t("دفعات",lang)}</div>
                      <div style={{fontSize:16,fontWeight:900,color:"#bfdbfe"}}>{count}</div>
                    </div>
                    <div style={{textAlign:"center"}}>
                      <div style={{fontSize:10,color:"rgba(255,255,255,0.65)",fontWeight:700}}>{t("إجمالي الفترة",lang)}</div>
                      <div style={{fontSize:16,fontWeight:900,color:"#86efac"}}>{fmt(total)}</div>
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* رسم بياني قابل للنقر */}
            <div style={{fontSize:12,color:"#555",fontWeight:700,marginBottom:8,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <span>{t("اضغط على أي يوم لعرض تفاصيله الكاملة 👇",lang)}</span>
              {selectedDate&&<button onClick={()=>setSelectedDate(null)} style={{background:"#f5f0eb",border:"1px solid #ddd",borderRadius:8,padding:"4px 12px",cursor:"pointer",fontSize:12,color:"#888",fontWeight:700}}>{t("✕ إلغاء الاختيار",lang)}</button>}
            </div>

            {/* bars */}
            <div style={{display:"flex",alignItems:"flex-end",gap:3,height:130,marginBottom:4,borderBottom:"2px solid #f0ece8",overflowX:"auto",paddingBottom:2}}>
              {(d.daily||[]).filter(x=>(!filterFrom||x.date>=filterFrom)&&(!filterTo||x.date<=filterTo)).map((day,i)=>{
                const total=day.paid+day.adj;
                const pct=(total/maxDaily)*100;
                const isSel=selectedDate===day.date;
                const isMax=total===maxDaily;
                return(
                  <div key={i} onClick={()=>setSelectedDate(isSel?null:day.date)}
                    style={{display:"flex",flexDirection:"column",alignItems:"center",gap:2,
                      minWidth:small?20:26,flex:"0 0 auto",cursor:"pointer",
                      padding:"2px",borderRadius:4,
                      background:isSel?"rgba(232,93,32,0.1)":"transparent",
                      border:isSel?"1px solid #e85d20":"1px solid transparent"}}>
                    <div style={{fontSize:9,color:isSel?"#e85d20":"#222",fontWeight:isSel?900:700,textAlign:"center",lineHeight:1}}>
                      {total>500?fmt(total).slice(0,5):''}
                    </div>
                    <div style={{width:"100%",height:Math.max(pct,3)+"%",minHeight:4,
                      background:isSel?"#e85d20":isMax?"#1e3a5f":"#93c5fd",
                      borderRadius:"3px 3px 0 0",transition:"all 0.2s"}}/>
                  </div>);
              })}
            </div>
            {/* dates */}
            <div style={{display:"flex",gap:3,overflowX:"auto",marginBottom:14}}>
              {(d.daily||[]).filter(x=>(!filterFrom||x.date>=filterFrom)&&(!filterTo||x.date<=filterTo)).map((day,i)=>(
                <div key={i} onClick={()=>setSelectedDate(selectedDate===day.date?null:day.date)}
                  style={{minWidth:small?20:26,flex:"0 0 auto",textAlign:"center",
                    fontSize:10,cursor:"pointer",fontWeight:800,
                    color:selectedDate===day.date?"#e85d20":"#333"}}>
                  {day.date.slice(8)}
                </div>))}
            </div>

            {/* ══ تفاصيل اليوم المختار ══ */}
            {selectedDate&&selDay&&(
              <div style={{border:"2px solid #e85d20",borderRadius:16,overflow:"hidden",marginBottom:14,animation:"fadeUp 0.3s ease"}}>

                {/* هيدر اليوم */}
                <div style={{background:"linear-gradient(120deg,#e85d20,#c44b10)",padding:"14px 18px"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10}}>
                    <div>
                      <div style={{fontSize:18,fontWeight:900,color:"#fff"}}>📅 {selectedDate}</div>
                      <div style={{fontSize:11,color:"rgba(255,255,255,0.7)",marginTop:2}}>
                        {selDay.count} دفعة &nbsp;·&nbsp; {selCollectors.length} محصّل &nbsp;·&nbsp; {selRegionArr.length} منطقة
                      </div>
                    </div>
                    <div style={{display:"flex",gap:16}}>
                      {[[t("المدفوع",lang),fmt(selDay.paid),"#86efac"],
                        [t("التسويات",lang),fmt(selDay.adj),"#fde68a"],
                        [t("الإجمالي",lang),fmt(selDay.paid+selDay.adj),"#fff"]].map(([l,v,c])=>(
                        <div key={l} style={{textAlign:"center"}}>
                          <div style={{fontSize:10,color:"rgba(255,255,255,0.7)",marginBottom:3}}>{l}</div>
                          <div style={{fontSize:16,fontWeight:900,color:c}}>{v}</div>
                        </div>))}
                    </div>
                  </div>
                </div>

              </div>
            )}
            {selectedDate&&selDay&&(
              <DayDetail
                date={selectedDate}
                day={selDay}
                collectors={selCollectors}
                regions={selRegionArr}
                fmt={fmt}
                small={small}
                onClose={()=>setSelectedDate(null)}
                REG_COLORS_MAP={REG_COLORS_MAP}
                REG_AR_MAP={REG_AR_MAP}
              />
            )}

            {/* جدول يومي */}
            <div style={{maxHeight:260,overflowY:"auto"}}>
              <div style={{display:"grid",gridTemplateColumns:"110px 1fr 130px 80px",gap:6,
                padding:"6px 10px",background:"#1e3a5f",borderRadius:8,marginBottom:6}}>
                {["التاريخ","شريط","المبلغ","عدد"].map((h,i)=>(
                  <div key={i} style={{fontSize:11,fontWeight:800,color:"#fff",textAlign:i>=2?"center":"right"}}>{h}</div>))}
              </div>
              {[...(d.daily||[])].filter(x=>(!filterFrom||x.date>=filterFrom)&&(!filterTo||x.date<=filterTo)).reverse().map((day,i)=>{
                const total=day.paid+day.adj;
                const isSel=selectedDate===day.date;
                return(
                <div key={i} onClick={()=>setSelectedDate(isSel?null:day.date)}
                  style={{display:"grid",gridTemplateColumns:"110px 1fr 130px 80px",
                    gap:6,alignItems:"center",padding:"8px 10px",
                    background:isSel?"#fff7f3":i%2===0?"#fff":"#f8f4f1",
                    borderRadius:8,marginBottom:3,
                    border:isSel?"1.5px solid #e85d20":"1px solid #f0ece8",
                    cursor:"pointer",transition:"all 0.15s"}}>
                  <div style={{fontSize:15,fontWeight:isSel?900:700,color:isSel?"#e85d20":"#111"}}>{day.date}</div>
                  <div style={{background:"#f0ece8",borderRadius:4,height:7,overflow:"hidden"}}>
                    <div style={{width:(total/maxDaily*100)+"%",height:"100%",
                      background:isSel?"#e85d20":"#1e3a5f",borderRadius:4}}/>
                  </div>
                  <div style={{fontSize:16,fontWeight:900,color:"#16a34a",textAlign:"center"}}>{fmt(total)}</div>
                  <div style={{fontSize:13,fontWeight:700,color:"#888",textAlign:"center"}}>{day.count}</div>
                </div>);})}
            </div>
          </div>
        )}

        {/* ══ تبويب المناطق ══ */}
        {activeTab==='region'&&(
          <div>
            <div style={{display:"grid",gridTemplateColumns:small?"1fr":"28px 1fr 120px 120px 130px 55px",
              gap:8,padding:"7px 10px",background:"#1e3a5f",borderRadius:8,marginBottom:8}}>
              {(small?[t("المنطقة",lang),t("الإجمالي",lang)]:["#",t("المنطقة",lang),t("المدفوع",lang),t("التسويات",lang),t("الإجمالي",lang),"دفعات"]).map((h,i)=>(
                <div key={i} style={{fontSize:11,fontWeight:800,color:"#fff",textAlign:i>=2?"center":"right"}}>{h}</div>))}
            </div>
            {(d.byRegion||[]).map((r,i)=>{
              const col=r.color||REG_COLORS_MAP[r.nameEn]||'#888';
              return(
              <div key={i} style={{
                display:"grid",gridTemplateColumns:small?"1fr":"28px 1fr 120px 120px 130px 55px",
                gap:8,alignItems:"center",padding:"11px 10px",
                background:i%2===0?"#fff":"#f8f4f1",borderRadius:10,
                marginBottom:5,border:`1px solid #f0ece8`,borderRight:`4px solid ${col}`}}>
                {!small&&<div style={{width:24,height:24,borderRadius:6,background:`${col}22`,
                  border:`1px solid ${col}44`,display:"flex",alignItems:"center",
                  justifyContent:"center",fontSize:11,fontWeight:800,color:col}}>{i+1}</div>}
                <div>
                  <div style={{fontSize:15,fontWeight:900,color:"#000"}}>{r.nameAr||REG_AR_MAP[r.nameEn]||r.nameEn}</div>
                  {!small&&<div style={{fontSize:11,color:"#888",marginTop:1}}>{r.nameEn} · {r.count} دفعة</div>}
                </div>
                {!small&&<>
                  <div style={{textAlign:"center"}}>
                    <div style={{fontSize:10,color:"#555",fontWeight:700,marginBottom:3}}>{t("المدفوع",lang)}</div>
                    <div style={{fontSize:14,fontWeight:800,color:"#16a34a"}}>{fmt(r.paid)}</div>
                  </div>
                  <div style={{textAlign:"center"}}>
                    <div style={{fontSize:10,color:"#555",fontWeight:700,marginBottom:3}}>{t("التسويات",lang)}</div>
                    <div style={{fontSize:14,fontWeight:800,color:"#d97706"}}>{fmt(r.adj)}</div>
                  </div>
                </>}
                <div style={{background:`${col}12`,borderRadius:8,padding:"6px",textAlign:"center"}}>
                  <div style={{fontSize:10,color:"#555",fontWeight:700,marginBottom:2}}>{t("الإجمالي",lang)}</div>
                  <div style={{fontSize:small?15:17,fontWeight:900,color:col}}>{fmt(r.paid+r.adj)}</div>
                </div>
                <div style={{textAlign:"center"}}>
                  <span style={{fontSize:11,background:`${col}20`,color:col,borderRadius:6,padding:"3px 7px",fontWeight:700}}>{r.count}</span>
                </div>
              </div>);})}
          </div>
        )}

        {/* ══ تبويب المحصّلون ══ */}
        {activeTab==='collector'&&(
          <div>
            <div style={{display:"grid",gridTemplateColumns:"28px 1fr 90px 120px 120px 50px",
              gap:6,padding:"7px 10px",background:"#1e3a5f",borderRadius:8,marginBottom:8}}>
              {["#",t("المحصّل",lang),t("المنطقة",lang),t("المدفوع",lang),t("الإجمالي",lang),"عدد"].map((h,i)=>(
                <div key={i} style={{fontSize:11,fontWeight:800,color:"#fff",textAlign:i>=2?"center":"right"}}>{h}</div>))}
            </div>
            {(d.topCollectors||[]).map((c,i)=>{
              const total=c.paid+c.adj;
              const pct=Math.round((total/maxCol)*100);
              const col=REG_COLORS_MAP[c.regionEn||'']||'#1e3a5f';
              return(
              <div key={i} style={{
                display:"grid",gridTemplateColumns:"28px 1fr 90px 120px 120px 50px",
                gap:6,alignItems:"center",padding:"9px 10px",
                background:i%2===0?"#fff":"#f8f4f1",
                borderRadius:9,marginBottom:4,border:"1px solid #f0ece8",
                borderRight:`3px solid ${col}`}}>
                <div style={{width:24,height:24,borderRadius:6,background:`${col}18`,
                  border:`1px solid ${col}40`,display:"flex",alignItems:"center",
                  justifyContent:"center",fontSize:11,fontWeight:800,color:col}}>{i+1}</div>
                <div>
                  <div style={{fontSize:13,fontWeight:800,color:"#000",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{c.name}</div>
                  <div style={{height:4,background:"#f0ece8",borderRadius:2,marginTop:3,overflow:"hidden"}}>
                    <div style={{width:pct+"%",height:"100%",background:col,borderRadius:2}}/>
                  </div>
                </div>
                <div style={{textAlign:"center",fontSize:10,color:col,fontWeight:700,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
                  {c.region}
                </div>
                <div style={{textAlign:"center",fontSize:13,fontWeight:800,color:"#16a34a"}}>{fmt(c.paid)}</div>
                <div style={{textAlign:"center",fontSize:14,fontWeight:900,color:col}}>{fmt(total)}</div>
                <div style={{textAlign:"center",fontSize:11,fontWeight:700,color:"#888"}}>{c.count}</div>
              </div>);})}
          </div>
        )}

      </div>
    </div>
    {showAnalytics&&<AnalyticsModal bulk={bulkData} onClose={()=>setShowAnalytics(false)} small={small}/>}
    </>
  );
}



// ── HistoryModal — السجل التاريخي والمقارنة ──────────────────────────────────
function HistoryModal({ history, onClose, small }) {
  const { lang } = useLang();
  const [view, setView]       = useState('list');
  const [compareA, setCompareA] = useState(0);
  const [compareB, setCompareB] = useState(1);

  const omr = n => new Intl.NumberFormat("en-US",{minimumFractionDigits:3,maximumFractionDigits:3}).format(n||0);
  const sorted = [...(history||[])].sort((a,b)=>new Date(b.date)-new Date(a.date));

  // ─── عرض رسالة إذا لا يوجد سجل كافٍ ────────────────────────────────────────
  const hasData = sorted.length > 0;
  const hasMultiple = sorted.length > 1;

  return (
    <div style={{
      position:"fixed",inset:0,background:"rgba(0,0,0,0.75)",
      display:"flex",alignItems:"center",justifyContent:"center",
      zIndex:9999,padding:16,direction:"rtl"
    }}>
      <div style={{
        background:"#fff",borderRadius:20,
        width:"100%",maxWidth:small?400:860,
        maxHeight:"90vh",overflow:"hidden",
        display:"flex",flexDirection:"column",
        boxShadow:"0 20px 60px rgba(0,0,0,0.4)"
      }}>

        {/* ── Header ── */}
        <div style={{
          background:"linear-gradient(120deg,#1e3a5f,#2d5a8e)",
          padding:"16px 22px",flexShrink:0
        }}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10}}>
            <div style={{display:"flex",alignItems:"center",gap:12}}>
              <div style={{
                width:44,height:44,borderRadius:12,
                background:"rgba(255,255,255,0.15)",
                border:"1.5px solid rgba(255,255,255,0.25)",
                display:"flex",alignItems:"center",justifyContent:"center",fontSize:22
              }}>📈</div>
              <div>
                <div style={{fontSize:18,fontWeight:900,color:"#fff"}}>{t("السجل التاريخي",lang)}</div>
                <div style={{fontSize:11,color:"rgba(255,255,255,0.6)",marginTop:2}}>
                  {sorted.length} يوم محفوظ &nbsp;·&nbsp; آخر 90 يوم
                </div>
              </div>
            </div>
            <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
              {hasData && [['list','📋 السجل'],['compare','⚖️ مقارنة'],['chart','📊 رسم بياني']].map(([v,l])=>(
                <button key={v} onClick={()=>setView(v)} style={{
                  background:view===v?"rgba(255,255,255,0.25)":"transparent",
                  color:"#fff",border:"1px solid rgba(255,255,255,0.3)",
                  borderRadius:8,padding:"6px 12px",fontSize:12,fontWeight:700,
                  cursor:"pointer",fontFamily:"'Cairo',sans-serif"
                }}>{l}</button>
              ))}
              <button onClick={onClose} style={{
                background:"rgba(255,255,255,0.15)",color:"#fff",
                border:"none",borderRadius:8,padding:"8px 14px",
                fontSize:14,cursor:"pointer",fontWeight:700
              }}>✕</button>
            </div>
          </div>
        </div>

        {/* ── Content ── */}
        <div style={{flex:1,overflow:"auto",padding:"16px 20px"}}>

          {/* لا يوجد بيانات */}
          {!hasData && (
            <div style={{textAlign:"center",padding:"40px 20px"}}>
              <div style={{fontSize:48,marginBottom:16}}>📭</div>
              <div style={{fontSize:16,fontWeight:800,color:"#333",marginBottom:8}}>{t("لا يوجد سجل تاريخي بعد",lang)}</div>
              <div style={{fontSize:13,color:"#888",lineHeight:1.8}}>
                ارفع ملف Excel وأكّد البيانات<br/>
                سيُحفظ كل يوم ترفع فيه ملفاً في السجل التاريخي تلقائياً
              </div>
            </div>
          )}

          {/* ── قائمة السجلات ── */}
          {hasData && view==='list' && (
            <div>
              <div style={{
                display:"grid",
                gridTemplateColumns:small?"1fr":"44px 1fr 160px 160px 180px",
                gap:8,padding:"10px 12px",
                background:"#1e3a5f",borderRadius:10,marginBottom:10
              }}>
                {(small?["التاريخ",t("الإجمالي",lang)]:["#","التاريخ",t("المدفوع",lang),t("التسويات",lang),t("الإجمالي الكلي",lang)]).map((h,i)=>(
                  <div key={i} style={{fontSize:13,fontWeight:800,color:"#fff",textAlign:i>1?"center":"right"}}>{h}</div>
                ))}
              </div>
              {sorted.map((entry,i) => {
                const prev = sorted[i+1];
                const d  = entry.grandTotal||0;
                const d2 = prev?.grandTotal||0;
                const diff = d2>0 ? ((d-d2)/d2*100) : null;
                return (
                  <div key={i} style={{
                    display:"grid",
                    gridTemplateColumns:small?"1fr":"44px 1fr 160px 160px 180px",
                    gap:8,padding:"12px",
                    background:i%2===0?"#fff":"#f8f4f1",
                    borderRadius:10,marginBottom:6,
                    border:"1.5px solid #f0ece8",
                    boxShadow:"0 1px 4px rgba(0,0,0,0.04)"
                  }}>
                    <div style={{
                      width:32,height:32,borderRadius:9,
                      background:"#1e3a5f",
                      display:"flex",alignItems:"center",justifyContent:"center",
                      fontSize:13,fontWeight:800,color:"#fff"
                    }}>{i+1}</div>
                    <div>
                      <div style={{fontSize:16,fontWeight:900,color:"#111"}}>{entry.date}</div>
                      <div style={{fontSize:11,color:"#888",marginTop:2,display:"flex",gap:8,alignItems:"center"}}>
                        <span>{entry.totalRecords?.toLocaleString()} {t(t("سجل",lang),lang)}</span>
                        {diff!==null && (
                          <span style={{
                            color:diff>=0?"#16a34a":"#dc2626",
                            fontWeight:700,fontSize:12
                          }}>
                            {diff>=0?"▲":"▼"} {Math.abs(diff).toFixed(1)}%
                          </span>
                        )}
                      </div>
                    </div>
                    {!small && <>
                      <div style={{textAlign:"center"}}>
                        <div style={{fontSize:11,color:"#888",fontWeight:700,marginBottom:4}}>{t("المدفوع",lang)}</div>
                        <div style={{fontSize:15,fontWeight:800,color:"#16a34a"}}>{omr(entry.grandPaid||0)}</div>
                      </div>
                      <div style={{textAlign:"center"}}>
                        <div style={{fontSize:11,color:"#888",fontWeight:700,marginBottom:4}}>{t("التسويات",lang)}</div>
                        <div style={{fontSize:15,fontWeight:800,color:"#d97706"}}>{omr(entry.grandAdj||0)}</div>
                      </div>
                    </>}
                    <div style={{
                      textAlign:"center",
                      background:"#f8f4f1",borderRadius:10,padding:"8px",
                      border:"1px solid #f0ece8"
                    }}>
                      <div style={{fontSize:11,color:"#888",fontWeight:700,marginBottom:4}}>{t("الإجمالي",lang)}</div>
                      <div style={{fontSize:18,fontWeight:900,color:"#e85d20"}}>{omr(entry.grandTotal||0)}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* ── المقارنة ── */}
          {hasData && view==='compare' && (
            <div>
              {!hasMultiple ? (
                <div style={{textAlign:"center",padding:"30px",background:"#f8f4f1",borderRadius:14}}>
                  <div style={{fontSize:32,marginBottom:12}}>⚠️</div>
                  <div style={{fontSize:15,fontWeight:800,color:"#333",marginBottom:8}}>{t("تحتاج يومين على الأقل للمقارنة",lang)}</div>
                  <div style={{fontSize:12,color:"#888"}}>{t("ارفع ملف يوم آخر وسيظهر خيار المقارنة تلقائياً",lang)}</div>
                </div>
              ) : (
                <div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:16}}>
                    {[["📅 اليوم الأول",compareA,setCompareA],["📅 اليوم الثاني",compareB,setCompareB]].map(([label,val,set],idx)=>(
                      <div key={idx}>
                        <div style={{fontSize:13,color:"#333",fontWeight:800,marginBottom:6}}>{label}</div>
                        <select value={val} onChange={e=>set(Number(e.target.value))} style={{
                          width:"100%",padding:"10px 14px",borderRadius:10,
                          border:"1.5px solid #e5e7eb",fontSize:13,
                          fontFamily:"'Cairo',sans-serif",color:"#111",
                          background:"#fff",cursor:"pointer"
                        }}>
                          {sorted.map((h,i)=>(
                            <option key={i} value={i}>{h.date} — {omr(h.grandTotal||0)}</option>
                          ))}
                        </select>
                      </div>
                    ))}
                  </div>

                  {sorted[compareA] && sorted[compareB] && (() => {
                    const a=sorted[compareA], b=sorted[compareB];
                    return (
                      <div>
                        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 100px",
                          gap:8,padding:"10px 14px",
                          background:"#1e3a5f",borderRadius:10,marginBottom:10}}>
                          {[t("البيان",lang),a.date,b.date,t("الفرق",lang)].map((h,i)=>(
                            <div key={i} style={{fontSize:13,fontWeight:800,color:"#fff",textAlign:i>0?"center":"right"}}>{h}</div>
                          ))}
                        </div>
                        {[
                          [t("الإجمالي الكلي",lang),"grandTotal","#e85d20"],
                          [t("إجمالي المدفوع",lang),"grandPaid","#16a34a"],
                          [t("إجمالي التسويات",lang),"grandAdj","#d97706"],
                          [t("📋 عدد السجلات",lang),"totalRecords","#1e3a5f"],
                        ].map(([label,key,color])=>{
                          const va=a[key]||0, vb=b[key]||0, d=va-vb;
                          const pct=vb>0?((d/vb)*100).toFixed(1):'—';
                          const isUp=d>=0;
                          return(
                          <div key={key} style={{
                            display:"grid",gridTemplateColumns:"1fr 1fr 1fr 100px",
                            gap:8,padding:"12px 14px",
                            background:"#fff",borderRadius:10,marginBottom:6,
                            border:"1.5px solid #f0ece8"
                          }}>
                            <div style={{fontSize:14,fontWeight:800,color:"#333"}}>{label}</div>
                            <div style={{textAlign:"center",fontSize:15,fontWeight:900,color}}>{key==='totalRecords'?va.toLocaleString():omr(va)}</div>
                            <div style={{textAlign:"center",fontSize:15,fontWeight:700,color:"#999"}}>{key==='totalRecords'?vb.toLocaleString():omr(vb)}</div>
                            <div style={{
                              textAlign:"center",fontSize:14,fontWeight:900,
                              color:isUp?"#16a34a":"#dc2626",
                              background:isUp?"#f0fdf4":"#fef2f2",
                              borderRadius:8,padding:"4px 6px"
                            }}>
                              {isUp?"▲":"▼"}{pct==='—'?'—':Math.abs(Number(pct))+'%'}
                            </div>
                          </div>);})}
                      </div>
                    );
                  })()}
                </div>
              )}
            </div>
          )}

          {/* ── الرسم البياني ── */}
          {hasData && view==='chart' && (
            <div>
              {!hasMultiple ? (
                <div style={{textAlign:"center",padding:"30px",background:"#f8f4f1",borderRadius:14}}>
                  <div style={{fontSize:32,marginBottom:12}}>📊</div>
                  <div style={{fontSize:15,fontWeight:800,color:"#333",marginBottom:8}}>{t("يوم واحد في السجل",lang)}</div>
                  <div style={{fontSize:12,color:"#888",lineHeight:1.8}}>
                    الرسم البياني يحتاج عدة أيام محفوظة<br/>
                    ارفع ملفاً كل يوم وسيبني الرسم البياني تلقائياً
                  </div>
                  <div style={{
                    marginTop:16,padding:"14px",
                    background:"#fff",borderRadius:10,
                    border:"1.5px solid #f0ece8",
                    display:"inline-block",textAlign:"right"
                  }}>
                    <div style={{fontSize:12,color:"#888",marginBottom:4}}>{t("اليوم المحفوظ الأول",lang)}</div>
                    <div style={{fontSize:18,fontWeight:900,color:"#e85d20"}}>{sorted[0]?.date}</div>
                    <div style={{fontSize:14,fontWeight:700,color:"#16a34a",marginTop:4}}>{omr(sorted[0]?.grandTotal||0)} OMR</div>
                  </div>
                </div>
              ) : (
                <div>
                  <div style={{fontSize:13,color:"#555",fontWeight:700,marginBottom:12}}>
                    آخر {Math.min(sorted.length,30)} يوم — الإجمالي الكلي
                  </div>
                {/* ── SVG chart ── */}
                {(() => {
                  const items=[...sorted].slice(0,30).reverse();
                  const maxV=Math.max(...items.map(h=>h.grandTotal||0),1);
                  const W=680,H=260,PL=70,PR=16,PT=24,PB=52;
                  const cW=W-PL-PR,cH=H-PT-PB;
                  const fmtK=n=>n>=1000000?(n/1000000).toFixed(2)+'M':n>=1000?(n/1000).toFixed(0)+'K':n.toFixed(0);
                  const barW=Math.max(cW/items.length-4,8);
                  const barX=i=>PL+(i/items.length)*cW+(cW/items.length-barW)/2;
                  const barH=v=>Math.max(((v||0)/maxV)*cH,3);
                  const barY=v=>PT+cH-barH(v);
                  const pts=items.map((h,i)=>[PL+(i+0.5)/items.length*cW, PT+cH-((h.grandTotal||0)/maxV)*cH]);
                  const linePath=pts.map((p,i)=>i===0?`M${p[0]},${p[1]}`:`L${p[0]},${p[1]}`).join(' ');
                  const areaPath=pts.length?linePath+` L${pts[pts.length-1][0]},${PT+cH} L${pts[0][0]},${PT+cH} Z`:'';
                  return (
                    <div style={{background:"linear-gradient(135deg,#f8fafc,#fff)",borderRadius:16,
                      padding:"14px 6px 6px",border:"1.5px solid #e8f0fe",marginBottom:14,
                      boxShadow:"0 4px 20px rgba(30,58,95,0.07)"}}>
                      <div style={{fontSize:12,color:"#1e3a5f",fontWeight:800,marginBottom:6,paddingRight:8}}>
                        📊 آخر {items.length} يوم — الإجمالي الكلي
                      </div>
                      <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{display:"block",overflow:"visible"}}>
                        <defs>
                          <linearGradient id="hBG" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#2d5a8e" stopOpacity="0.9"/>
                            <stop offset="100%" stopColor="#1e3a5f" stopOpacity="0.5"/>
                          </linearGradient>
                          <linearGradient id="hBGH" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#f97316"/>
                            <stop offset="100%" stopColor="#e85d20"/>
                          </linearGradient>
                          <linearGradient id="hArea" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#e85d20" stopOpacity="0.18"/>
                            <stop offset="100%" stopColor="#e85d20" stopOpacity="0.01"/>
                          </linearGradient>
                        </defs>
                        {[0,0.25,0.5,0.75,1].map((r,gi)=>(
                          <g key={gi}>
                            <line x1={PL} y1={PT+cH*(1-r)} x2={W-PR} y2={PT+cH*(1-r)}
                              stroke={r===0?"#cbd5e1":"#e2e8f0"} strokeWidth={r===0?1.5:1} strokeDasharray={r===0?"":"4,4"}/>
                            <text x={PL-8} y={PT+cH*(1-r)+4} textAnchor="end" fontSize="11" fill="#64748b" fontWeight="600" fontFamily="Cairo">{fmtK(maxV*r)}</text>
                          </g>
                        ))}
                        {items.map((h,i)=>{
                          const isMax=(h.grandTotal||0)===maxV, isLast=i===items.length-1;
                          const bx=barX(i),bh=barH(h.grandTotal||0),by=barY(h.grandTotal||0);
                          return (
                            <g key={i}>
                              <rect x={bx+2} y={by+3} width={barW} height={bh} rx="3" fill="rgba(0,0,0,0.06)"/>
                              <rect x={bx} y={by} width={barW} height={bh} rx="3"
                                fill={isMax||isLast?"url(#hBGH)":"url(#hBG)"} opacity={isMax||isLast?1:0.75}/>
                            </g>
                          );
                        })}
                        {areaPath&&<path d={areaPath} fill="url(#hArea)"/>}
                        {linePath&&<path d={linePath} fill="none" stroke="#e85d20" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"/>}
                        {pts.map(([x,y],i)=>{
                          const isMax=(items[i]?.grandTotal||0)===maxV, isLast=i===pts.length-1;
                          const val=items[i]?.grandTotal||0;
                          const lbl=val>=1000000?(val/1000000).toFixed(2)+'M':val>=1000?(val/1000).toFixed(1)+'K':val.toFixed(0);
                          const lblW=Math.max(lbl.length*6+12,34);
                          const lblY=y>PT+cH*0.85?y-28:y-14;
                          return (
                            <g key={i}>
                              <rect x={x-lblW/2} y={lblY-11} width={lblW} height={14} rx="7"
                                fill={isMax?"#e85d20":isLast?"#f97316":"#1e3a5f"} opacity={isMax||isLast?1:0.82}/>
                              <text x={x} y={lblY-1} textAnchor="middle" fontSize="8.5" fill="#fff" fontWeight="800" fontFamily="Cairo">{lbl}</text>
                              {isMax&&<text x={x} y={lblY-16} textAnchor="middle" fontSize="11">🏆</text>}
                              <circle cx={x} cy={y} r={isMax?7:isLast?5:3}
                                fill={isMax||isLast?"#e85d20":"#fff"}
                                stroke={isMax||isLast?"#c44b10":"#e85d20"} strokeWidth="2"/>
                            </g>
                          );
                        })}
                        {items.map((h,i)=>{
                          const show=items.length<=10||i%Math.ceil(items.length/8)===0||i===items.length-1;
                          const x=PL+(i+0.5)/items.length*cW;
                          return show&&(<text key={i} x={x} y={PT+cH+18} textAnchor="middle"
                            fontSize="10" fill={i===items.length-1?"#e85d20":"#64748b"}
                            fontWeight={i===items.length-1?800:600} fontFamily="Cairo">
                            {(h.date||'').slice(5)}
                          </text>);
                        })}
                      </svg>
                      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginTop:6,padding:"0 6px"}}>
                        {[
                          ["🏆 أعلى يوم",omr(Math.max(...sorted.map(h=>h.grandTotal||0))),"#16a34a"],
                          ["📉 أدنى يوم",omr(Math.min(...sorted.map(h=>h.grandTotal||0))),"#dc2626"],
                          ["📈 المتوسط",omr(sorted.reduce((s,h)=>s+(h.grandTotal||0),0)/sorted.length),"#e85d20"],
                        ].map(([l,v,c])=>(
                          <div key={l} style={{background:"#fff",borderRadius:10,padding:"10px 8px",
                            border:`1.5px solid ${c}22`,textAlign:"center",boxShadow:`0 2px 10px ${c}15`}}>
                            <div style={{fontSize:10,color:"#888",fontWeight:700,marginBottom:4}}>{l}</div>
                            <div style={{fontSize:small?13:16,fontWeight:900,color:c}}>{v}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })()}
                  })()}
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}


// ── Bulk Payment Parser (Smart 100%) ─────────────────────────────────────────
// ── parseComplaints ─────────────────────────────────────────────────────────
async function parseComplaints(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = e => {
      try {
        const bytes = new Uint8Array(e.target.result);
        // هيكل الملف: 5 spaces + BOM(FF FE) + UTF-16-LE
        let text = '';
        for (let i = 7; i < bytes.length - 1; i += 2) {
          const cp = bytes[i] | (bytes[i+1] << 8);
          if (cp === 0xFEFF || cp === 0) continue;
          text += String.fromCharCode(cp);
        }
        const lines = text.split('\n').filter(l => l.trim());
        if (lines.length < 2) { reject(new Error('الملف فارغ')); return; }
        const headers = lines[0].split('\t').map(h => h.replace(/\r/g,'').trim());
        const regionIdx   = headers.findIndex(h => h === 'Region');
        const branchIdx   = headers.findIndex(h => h === 'Branch');
        const collectorIdx= headers.findIndex(h => h === 'Collector');
        const principalIdx= headers.findIndex(h => h === 'Principal Amount');
        const osIdx       = headers.findIndex(h => h === 'O/S Amount');
        const paidIdx     = headers.findIndex(h => h === 'Paid Amount');
        const adjIdx      = headers.findIndex(h => h === 'Adjustment');
        const overPaidIdx = headers.findIndex(h => h === 'OverPaid');
        const discIdx = headers.findIndex(h => h === 'Oneic Discount');
        let totalDiscount = 0;
        let totalOverRecovery = 0;
        let totalOverRecoveryCount = 0;
        if (regionIdx < 0) { reject(new Error('عمود Region غير موجود')); return; }

        // خريطة التجميع الدقيقة
        const DC_REGION = 'Debt Collection Company';
        const HO_REGIONS = ['Head Office', 'Legal', 'Legal '];
        
        let total=0, dcCount=0, hoCount=0, govCount=0;
        let dcAmt=0, hoAmt=0, govAmt=0;
        let dcPaid=0, hoPaid=0, govPaid=0;
        let dcAdj=0, hoAdj=0, govAdj=0;
        let totalOS=0;
        
        // تجميع حسب Region للمحافظات وحسب Branch لشركات التحصيل
        const regionMap = {}; // للمحافظات الخمس (Region)
        const branchMap = {}; // لشركات التحصيل (Branch داخل DC)
        // المكتب الرئيسي: Branch='Al-Khuwair' داخل Head Office
        
        for (let i = 1; i < lines.length; i++) {
          const row = lines[i].split('\t');
          const region = (row[regionIdx]||'').replace(/\r/g,'').trim();
          const branch = branchIdx>=0 ? (row[branchIdx]||'').replace(/\r/g,'').trim() : '';
          if (!region) continue;
          const amt       = principalIdx>=0 ? (parseFloat(row[principalIdx])||0) : 0;
          const paidAmt   = paidIdx>=0    ? (parseFloat(row[paidIdx])||0)    : 0;
          const adjAmt    = adjIdx>=0     ? (parseFloat(row[adjIdx])||0)     : 0;
          const overPaidAmt = overPaidIdx>=0 ? (parseFloat(row[overPaidIdx])||0) : 0;
          const osAmt = osIdx>=0 ? (row[osIdx] != null && row[osIdx] !== '' ? parseFloat(String(row[osIdx]).replace(/,/g,'')) || 0 : 0) : (amt - paidAmt - adjAmt);
          totalOS += osAmt;
          totalOverRecovery += overPaidAmt;
          if (overPaidAmt > 0) totalOverRecoveryCount++;
          totalDiscount += discIdx>=0 ? (parseFloat(row[discIdx])||0) : 0;
          const collector2= collectorIdx>=0 ? (row[collectorIdx]||'').replace(/\r/g,'').trim() : '';
          total++;
          
          if (region === DC_REGION) {
            // شركات التحصيل → نجمّع حسب Branch
            dcCount++; dcAmt += amt; dcPaid += paidAmt; dcAdj += adjAmt;
            if (branch) {
              if (!branchMap[branch]) branchMap[branch] = {count:0, amt:0, paid:0, adj:0};
              branchMap[branch].count++; branchMap[branch].amt += amt; branchMap[branch].paid += paidAmt; branchMap[branch].adj += adjAmt;
            }
          } else if (HO_REGIONS.some(k => region.trim() === k.trim())) {
            // المكتب الرئيسي → نجمّع الكل تحت مفتاح واحد
            hoCount++; hoAmt += amt; hoPaid += paidAmt; hoAdj += adjAmt;
            // per-collector للـ HO
            if (collector2) {
              var hoColKey = collector2;
              var cLow = collector2.toLowerCase();
              if (cLow.indexOf('sarhaan')>=0||cLow.indexOf('sarhan')>=0||cLow.indexOf('dr.')>=0||cLow.indexOf(' dr')>=0) hoColKey='Legal - DR. Sarhaan';
              else if (cLow.indexOf('doc')>=0) hoColKey='Documentation- Omantel';
              else if (cLow.indexOf('non-due')>=0||collector2.toUpperCase()==='HO') hoColKey='Non-due accounts';
              else if (cLow.indexOf('refund')>=0&&cLow.indexOf('before')>=0) hoColKey='Refund - before legal';
              else if (cLow.indexOf('refund')>=0&&cLow.indexOf('after')>=0) hoColKey='Refund - after legal';
              else if (cLow.indexOf('refund')>=0) hoColKey='Refund - before legal';
              else hoColKey='Legal -Oneic';
              if (!branchMap[hoColKey]) branchMap[hoColKey]={count:0,amt:0,paid:0,adj:0,closed:0,active:0,refundAmt:0};
              branchMap[hoColKey].count++;
              branchMap[hoColKey].amt  += amt;
              branchMap[hoColKey].paid += paidAmt;
              branchMap[hoColKey].adj += adjAmt;
              if (hoColKey==='Refund - before legal') {
                branchMap[hoColKey].refundAmt += (osAmt>0 ? osAmt*0.26 : 0);
              }
              if (hoColKey==='Legal -Oneic'||hoColKey==='Documentation- Omantel'||hoColKey==='Legal - DR. Sarhaan'||hoColKey==='Non-due accounts'||hoColKey==='Refund - before legal'||hoColKey==='Refund - after legal') {
                if (osAmt<=0) branchMap[hoColKey].closed++; else branchMap[hoColKey].active++;
              }
            }
            const hoKey = 'HEAD_OFFICE_TOTAL';
            if (!branchMap[hoKey]) branchMap[hoKey] = {count:0, amt:0};
            branchMap[hoKey].count++; branchMap[hoKey].amt += amt;
          } else {
            // مكاتب أونك → نجمّع حسب Region
            govCount++; govAmt += amt; govPaid += paidAmt; govAdj += adjAmt;
            const rKey = region;
            if (!regionMap[rKey]) regionMap[rKey] = {count:0, amt:0, paid:0, adj:0, collectors:{}};
            regionMap[rKey].count++; regionMap[rKey].amt += amt;
            regionMap[rKey].paid += paidAmt; regionMap[rKey].adj += adjAmt;
            if (collector2) {
              if (!regionMap[rKey].collectors[collector2]) regionMap[rKey].collectors[collector2]={count:0,principal:0,paid:0,adj:0};
              regionMap[rKey].collectors[collector2].count++;
              regionMap[rKey].collectors[collector2].principal += amt;
              regionMap[rKey].collectors[collector2].paid += paidAmt;
              regionMap[rKey].collectors[collector2].adj  += adjAmt;
            }
          }
        }
        resolve({ total, dcCount, hoCount, govCount, dcAmt, hoAmt, govAmt, dcPaid, hoPaid, govPaid, dcAdj, hoAdj, govAdj, regionMap, branchMap, totalDiscount, totalOverRecovery, totalOverRecoveryCount, totalOS });
      } catch(e) { reject(e); }
    };
    reader.onerror = () => reject(new Error('فشل قراءة الملف'));
    reader.readAsArrayBuffer(file);
  });
}

function parseBulkPayment(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        // قراءة Excel بـ SheetJS
        const data = new Uint8Array(e.target.result);
        const XLSX = await import('https://cdn.sheetjs.com/xlsx-0.20.3/package/xlsx.mjs');
        const wb = XLSX.read(data, { type: 'array', cellDates: true });
        const ws = wb.Sheets[wb.SheetNames[0]];
        const rows = XLSX.utils.sheet_to_json(ws, { raw: false, defval: '' });

        if (!rows.length) return reject(new Error('الملف فارغ'));

        // التحقق من الأعمدة المطلوبة
        const requiredCols = ['Region','Collector','Paid Amount','Adjustment Amount','Date'];
        const firstRow = rows[0];
        const missing = requiredCols.filter(c => !(c in firstRow));
        if (missing.length > 0) {
          return reject(new Error(`أعمدة مفقودة: ${missing.join(', ')}`));
        }

        const REG_AR = {
          'Debt Collection Company': 'شركات التحصيل',
          'Head Office': 'المكتب الرئيسي',
          'Legal ': 'المكتب الرئيسي', 'Legal': 'المكتب الرئيسي',
          'MUSCAT AND AL DAKHILIYAH': 'مسقط والداخلية',
          'South and North Al Batinah': 'الباطنة الشمالية والجنوبية',
          'North and South Al Shaurqiah and Al Wasatah': 'الشرقية والوسطى',
          'Musandam, Al Burimai and Al Dahirah': 'مسندم والبريمي',
          'Dhofar': 'ظفار', 'Dhofar ': 'ظفار',
        };
        const REG_COLORS = {
          'شركات التحصيل':'#1a7a6b','المكتب الرئيسي':'#6c3fa0',
          'مسقط والداخلية':'#e85d20','الباطنة الشمالية والجنوبية':'#c44b10',
          'الشرقية والوسطى':'#d4601a','مسندم والبريمي':'#b03808','ظفار':'#f07030',
        };

        const g = v => { const n = parseFloat(String(v).replace(/,/g,'')); return isNaN(n)?0:n; };
        let totalPaid=0, totalAdj=0;
        const dailyMap={}, regionMap={}, collectorMap={}, dailyDetail={};
        let minDate=null, maxDate=null;

        rows.forEach(row => {
          const paid = g(row['Paid Amount']);
          const adj  = g(row['Adjustment Amount']);
          const region    = String(row['Region']||'').trim();
          const collector = String(row['Collector']||'').trim();
          const branch    = String(row['Branch']||'').trim();
          const debtor    = String(row['Debtor']||'').trim();
          const agreementNo = String(row['Agreement No']||'');
          let dateStr = '';
          if (row['Date']) {
            const d = new Date(row['Date']);
            if (!isNaN(d)) dateStr = d.toISOString().slice(0,10);
            else dateStr = String(row['Date']).slice(0,10);
          }

          totalPaid += paid; totalAdj += adj;

          // ── يومي ──
          if (dateStr) {
            if (!dailyMap[dateStr]) dailyMap[dateStr]={date:dateStr,paid:0,adj:0,count:0};
            dailyMap[dateStr].paid+=paid; dailyMap[dateStr].adj+=adj; dailyMap[dateStr].count++;
            if (!minDate||dateStr<minDate) minDate=dateStr;
            if (!maxDate||dateStr>maxDate) maxDate=dateStr;
            // تفاصيل يومية
            if (!dailyDetail[dateStr]) dailyDetail[dateStr]={};
            const key=collector+'||'+region+'||'+branch;
            if (!dailyDetail[dateStr][key]) dailyDetail[dateStr][key]={collector,region,branch,paid:0,adj:0,count:0,debtors:[]};
            dailyDetail[dateStr][key].paid+=paid;
            dailyDetail[dateStr][key].adj+=adj;
            dailyDetail[dateStr][key].count++;
            if (debtor && dailyDetail[dateStr][key].debtors.length<5)
              dailyDetail[dateStr][key].debtors.push({name:debtor,agreementNo,paid,adj});
          }

          // ── منطقة ──
          const ar = REG_AR[region]||region;
          if (!regionMap[ar]) regionMap[ar]={nameAr:ar,nameEn:region,paid:0,adj:0,count:0,color:REG_COLORS[ar]||'#888'};
          regionMap[ar].paid+=paid; regionMap[ar].adj+=adj; regionMap[ar].count++;

          // ── محصّل ──
          if (collector) {
            const ck = collector+'||'+region;
            if (!collectorMap[ck]) collectorMap[ck]={name:collector,region:ar,regionEn:region,branch,paid:0,adj:0,count:0};
            collectorMap[ck].paid+=paid; collectorMap[ck].adj+=adj; collectorMap[ck].count++;
          }
        });

        const daily = Object.values(dailyMap).sort((a,b)=>a.date.localeCompare(b.date));
        const byRegion = Object.values(regionMap).sort((a,b)=>(b.paid+b.adj)-(a.paid+a.adj));
        const topCollectors = Object.values(collectorMap)
          .sort((a,b)=>(b.paid+b.adj)-(a.paid+a.adj)).slice(0,30);

        // تحويل dailyDetail لـ arrays مرتبة
        const dailyDetailArr={};
        Object.entries(dailyDetail).forEach(([date,cols])=>{
          dailyDetailArr[date]=Object.values(cols).sort((a,b)=>(b.paid+b.adj)-(a.paid+a.adj));
        });

        // ── إحصاءات ذكية ──
        const avgDaily = daily.length ? totalPaid/daily.length : 0;
        const bestDay  = daily.reduce((a,b)=>(a.paid+a.adj)>(b.paid+b.adj)?a:b, daily[0]||{});
        const worstDay = daily.reduce((a,b)=>(a.paid+a.adj)<(b.paid+b.adj)?a:b, daily[0]||{});
        const topCollector = topCollectors[0]||null;

        resolve({
          fileName: file.name,
          uploadedAt: new Date().toISOString(),
          dateRange: { from: minDate, to: maxDate },
          totalPaid, totalAdj,
          totalRecords: rows.length,
          daily, byRegion, topCollectors,
          dailyDetail: dailyDetailArr,
          stats: { avgDaily, bestDay, worstDay, topCollector,
                   activeDays: daily.length, totalCollectors: topCollectors.length }
        });
      } catch(err) { reject(new Error('فشل قراءة الملف: ' + err.message)); }
    };
    reader.onerror = () => reject(new Error('فشل قراءة الملف'));
    reader.readAsArrayBuffer(file);
  });
}


// ── handlePrint ──────────────────────────────────────────────────────────────
function handlePrint(data, lang='ar') {
  var w = window.open('','_blank','width=1200,height=900');
  if (!w) return;
  var omrN = function(n) { return new Intl.NumberFormat('en-US',{minimumFractionDigits:3,maximumFractionDigits:3}).format(n||0); };

  // ── حساب الإجماليات — نفس منطق الداشبورد (gPd+dPd+hPd من data.regions/debtCompanies/headOffice) ──
  var govPaid = (data.regions||[]).reduce(function(s,r){return s+r.paid;},0);
  var govAdj  = (data.regions||[]).reduce(function(s,r){return s+r.adj;},0);
  var dcPaid  = (data.debtCompanies||[]).reduce(function(s,r){return s+r.paid;},0);
  var dcAdj   = (data.debtCompanies||[]).reduce(function(s,r){return s+r.adj;},0);
  var hoPaid  = (data.headOffice||[]).reduce(function(s,r){return s+Math.max(0,r.paid||0);},0);
  var hoAdj   = (data.headOffice||[]).reduce(function(s,r){return s+Math.max(0,r.adj||0);},0);
  var grandPaid = govPaid+dcPaid+hoPaid;
  var grandAdj  = govAdj+dcAdj+hoAdj;
  var grandTotal = grandPaid + grandAdj;
  var portAmt    = (data.totalPortfolio&&data.totalPortfolio.amt) ? data.totalPortfolio.amt : 9414256.834;
  var portCnt    = (data.totalPortfolio&&data.totalPortfolio.cnt) ? data.totalPortfolio.cnt : 47963;
  var ONEIC_DISC = data.totalDiscount||0;
  var pctDone    = portAmt>0 ? Math.min(100,(grandTotal/portAmt*100)).toFixed(1) : '0';
  var remaining  = (data.totalPortfolio&&data.totalPortfolio.outstanding!=null) ? data.totalPortfolio.outstanding : (portAmt - grandTotal - ONEIC_DISC);
  var date      = data.uploadDate||new Date().toISOString().split('T')[0];
  var printDate = new Date().toLocaleDateString('ar-OM',{year:'numeric',month:'long',day:'numeric'});
  var LOGO_SRC  = typeof LOGO!=='undefined'?LOGO:'';

  // ── Section 1 rows ──
  var s1rows = [
    ['المدفوع',            grandPaid,  '#16a34a'],
    ['تسويات عُمانتل',     grandAdj,   '#d97706'],
    ['خصومات ONEIC',       ONEIC_DISC, '#7c3aed'],
    ['الإجمالي',           grandTotal, '#1e3a5f'],
    ['المتبقي من المحفظة', remaining,  '#e85d20'],
  ];
  var s1HTML = s1rows.map(function(r){
    return '<div class="s1-row"><span class="s1-lbl" style="color:'+r[2]+'">'+r[0]+'</span><span class="s1-val" style="color:'+r[2]+'">'+omrN(r[1])+' OMR</span></div>';
  }).join('');

  // ── Summary Cards ──
  var summaries = [
    {label:'المكتب الرئيسي', paid:hoPaid, adj:hoAdj, color:'#6c3fa0', icon:'🏛'},
    {label:'شركات التحصيل',  paid:dcPaid, adj:dcAdj, color:'#1a7a6b', icon:'🏢'},
    {label:'مكاتب أونك',     paid:govPaid,adj:govAdj,color:'#e85d20', icon:'🗺'},
  ];
  var sumHTML = summaries.map(function(s){
    var tot = s.paid+s.adj;
    var pct = grandTotal>0?((tot/grandTotal)*100).toFixed(1):'0';
    return '<div class="sum-card" style="border-top:4px solid '+s.color+'">'
      +'<div class="sum-header" style="background:'+s.color+'"><span class="sum-icon">'+s.icon+'</span><span class="sum-title">'+s.label+'</span><span class="sum-pct">'+pct+'%</span></div>'
      +'<div class="sum-body">'
      +'<div class="sum-row"><span class="sum-lbl">المدفوع</span><span class="sum-val green">'+omrN(s.paid)+'</span></div>'
      +'<div class="sum-row"><span class="sum-lbl">التسويات</span><span class="sum-val amber">'+omrN(s.adj)+'</span></div>'
      +'<div class="sum-row sum-total"><span class="sum-lbl">الإجمالي</span><span class="sum-val" style="color:'+s.color+'">'+omrN(tot)+'</span></div>'
      +'</div></div>';
  }).join('');

  // ── مكاتب أونك ──
  var regsHTML = '';
  (data.regions||[]).forEach(function(r,ri){
    var rTotal=r.paid+r.adj;
    var rPct = grandTotal>0?Math.min(100,Math.round(rTotal/grandTotal*100)):0;
    var portA = r.portAmt||0;
    var portPct = portA>0?Math.min(100,(rTotal/portA*100)).toFixed(1):'—';
    regsHTML += '<tr class="sec-header"><td colspan="5">'
      +'<div class="sec-title"><span>'+String(ri+1)+'. '+r.nameAr+'</span>'
      +'<span class="badge">نسبة إنجاز: '+portPct+'%</span></div>'
      +(portA>0?'<div class="prog-wrap"><div class="prog-bar" style="width:'+portPct+'%"></div></div>':'')
      +'</td></tr>';
    (r.collectors||[]).forEach(function(c,ci){
      regsHTML += '<tr class="'+(ci%2===0?'even':'odd')+'"><td class="rank">'+String(ci+1)+'</td><td class="col-name">'+c.name+'</td>'
        +'<td class="amt green">'+omrN(c.paid)+'</td><td class="amt amber">'+omrN(c.adj)+'</td><td class="amt total">'+omrN((c.paid||0)+(c.adj||0))+'</td></tr>';
    });
    regsHTML += '<tr class="subtotal"><td colspan="2">'+(lang==='en'?'Total ':'إجمالي ')+r.nameAr+'</td>'
      +'<td class="green">'+omrN(r.paid)+'</td><td class="amber">'+omrN(r.adj)+'</td><td class="total">'+omrN(rTotal)+'</td></tr>';
  });

  // ── شركات التحصيل ──
  var dcHTML = (data.debtCompanies||[]).map(function(c,i){
    var tot=(c.paid||0)+(c.adj||0);
    var inactive=['Ejada','Tahseel United','High Speed Company','High Speed company'].includes(c.name)?'<span class="badge-inactive">غير نشطة</span>':'';
    return '<tr class="'+(i%2===0?'even':'odd')+'"><td class="rank">'+String(i+1)+'</td><td class="col-name">'+c.name+inactive+'</td>'
      +'<td class="amt green">'+omrN(c.paid)+'</td><td class="amt amber">'+omrN(c.adj)+'</td><td class="amt total">'+omrN(tot)+'</td></tr>';
  }).join('');

  // ── المكتب الرئيسي ──
  var hoHTML = (data.headOffice||[]).map(function(c,i){
    if (c.name==='Non-due accounts'||c.name==='HO') {
      return '<tr class="'+(i%2===0?'even':'odd')+'"><td class="rank">'+String(i+1)+'</td><td class="col-name">'+c.name+' <span class="badge-sm">'+((c.portCnt||0).toLocaleString())+' حساب فقط</span></td>'
        +'<td colspan="3" class="center-cell" style="color:#888;font-style:italic">حسابات غير مستحقة</td></tr>';
    }
    var p=Math.max(0,c.paid||0),a=Math.max(0,c.adj||0);
    var pa=(c.principalAmt||0)>0?' <span class="badge-sm">PA: '+omrN(c.principalAmt)+'</span>':'';
    return '<tr class="'+(i%2===0?'even':'odd')+'"><td class="rank">'+String(i+1)+'</td><td class="col-name">'+c.name+pa+'</td>'
      +'<td class="amt green">'+omrN(p)+'</td><td class="amt amber">'+omrN(a)+'</td><td class="amt total">'+omrN(p+a)+'</td></tr>';
  }).join('');

  var css = '*{box-sizing:border-box;margin:0;padding:0;-webkit-print-color-adjust:exact!important;print-color-adjust:exact!important}'
    +'body{font-family:\'Cairo\',sans-serif;background:#f0ece8;direction:rtl;color:#111}'
    +'@import url(\'https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&display=swap\');'
    +'.page{width:210mm;margin:0 auto;background:#fff;box-shadow:0 0 40px rgba(0,0,0,.2)}'
    // Hero
    +'.hero{background:linear-gradient(135deg,#1e3a5f 0%,#2d5a8e 60%,#1e3a5f 100%);padding:8mm 12mm 6mm}'
    +'.hero-inner{display:flex;justify-content:space-between;align-items:center}'
    +'.hero-logo img{height:48px;filter:brightness(0) invert(1);opacity:.95}'
    +'.hero-title{text-align:center;flex:1;padding:0 10mm}'
    +'.hero-title h1{font-size:20pt;font-weight:900;color:#fff;line-height:1.1}'
    +'.hero-title p{font-size:9pt;color:rgba(255,255,255,.65);margin-top:3px}'
    +'.hero-meta{text-align:left;font-size:9pt;color:rgba(255,255,255,.65)}'
    +'.hero-meta strong{color:#fbbf24;font-size:12pt;display:block}'
    // Section 1
    +'.s1-wrap{display:grid;grid-template-columns:1fr 1fr;border-bottom:3px solid #f0ece8}'
    +'.s1-port{padding:5mm 8mm;border-left:1.5px solid #f0ece8}'
    +'.s1-port-title{font-size:10pt;font-weight:900;color:#1e3a5f;margin-bottom:4mm;padding:2px 10px;background:#e8f0fe;border-radius:6px;display:inline-block}'
    +'.s1-port-row{display:flex;justify-content:space-between;padding:3mm 4mm;margin-bottom:2mm;border-radius:8px}'
    +'.s1-port-row.blue{background:#f8f9fc;border:1px solid #e8f0fe}'
    +'.s1-port-row.orange{background:#fff3ee;border:1px solid #ffe4d4}'
    +'.s1-port-label{font-size:9pt;color:#555;font-weight:700}'
    +'.s1-port-value{font-size:12pt;font-weight:900;color:#1e3a5f}'
    +'.s1-port-value.orange{color:#e85d20}'
    +'.s1-coll{padding:5mm 8mm}'
    +'.s1-coll-title{font-size:10pt;font-weight:900;color:#16a34a;margin-bottom:4mm;padding:2px 10px;background:#f0fdf4;border-radius:6px;display:inline-block}'
    +'.s1-row{display:flex;justify-content:space-between;align-items:center;padding:3mm 4mm;margin-bottom:2mm;background:#fafafa;border-radius:8px;border:1px solid #f0ece8}'
    +'.s1-lbl{font-size:9pt;font-weight:700}'
    +'.s1-val{font-size:11pt;font-weight:900}'
    // نسبة الإنجاز
    +'.prog-strip{background:linear-gradient(90deg,#1e3a5f,#2d5a8e);padding:4mm 10mm;display:flex;align-items:center;gap:8mm}'
    +'.prog-label{color:rgba(255,255,255,.8);font-size:9pt;font-weight:700;white-space:nowrap}'
    +'.prog-track{flex:1;height:12px;background:rgba(255,255,255,.2);border-radius:6px;overflow:hidden}'
    +'.prog-fill{height:100%;background:linear-gradient(90deg,#4ade80,#16a34a);border-radius:6px}'
    +'.prog-pct{color:#4ade80;font-size:14pt;font-weight:900;white-space:nowrap}'
    // KPI
    +'.kpi-row{display:grid;grid-template-columns:repeat(4,1fr);border-bottom:3px solid #f0ece8}'
    +'.kpi-card{padding:4mm 5mm;text-align:center;border-left:1px solid #f0ece8}'
    +'.kpi-label{font-size:8pt;color:#777;font-weight:700;margin-bottom:3px}'
    +'.kpi-value{font-size:13pt;font-weight:900}'
    // Summary cards
    +'.sum-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:4mm;padding:5mm 8mm;border-bottom:3px solid #f0ece8}'
    +'.sum-card{border-radius:10px;overflow:hidden;border:1.5px solid #f0ece8}'
    +'.sum-header{display:flex;align-items:center;gap:6px;padding:3mm 4mm;color:#fff}'
    +'.sum-icon{font-size:14pt}'
    +'.sum-title{flex:1;font-size:10pt;font-weight:900}'
    +'.sum-pct{background:rgba(255,255,255,.25);border-radius:20px;padding:1px 8px;font-size:11pt;font-weight:900}'
    +'.sum-body{padding:3mm 4mm}'
    +'.sum-row{display:flex;justify-content:space-between;padding:2mm 0;border-bottom:1px solid #f5f5f5}'
    +'.sum-total{border-top:1.5px solid #e0e0e0;margin-top:2mm;padding-top:2mm;border-bottom:none}'
    +'.sum-lbl{font-size:8pt;color:#666;font-weight:700}'
    +'.sum-val{font-size:9pt;font-weight:900}'
    +'.green{color:#16a34a}.amber{color:#d97706}'
    // Tables
    +'.section-title{background:linear-gradient(120deg,#1e3a5f,#2d5a8e);color:#fff;padding:4mm 8mm;font-size:12pt;font-weight:900;display:flex;justify-content:space-between;align-items:center;margin-top:4mm}'
    +'.data-table{width:100%;border-collapse:collapse}'
    +'.data-table th{background:#f0ece8;padding:3mm 4mm;font-size:8pt;font-weight:900;color:#444;text-align:right}'
    +'.data-table td{padding:3mm 4mm;font-size:9pt;border-bottom:1px solid #f5f5f5}'
    +'.data-table .rank{width:30px;text-align:center;font-weight:900;color:#888}'
    +'.data-table .col-name{font-weight:700}'
    +'.data-table .amt{text-align:left;font-weight:900;font-variant-numeric:tabular-nums;direction:ltr}'
    +'.data-table .total{color:#1e3a5f;font-size:10pt}'
    +'.even{background:#fff}.odd{background:#fafafa}'
    +'.sec-header td{background:linear-gradient(90deg,#fff7f3,#fff);padding:3mm 4mm}'
    +'.sec-title{display:flex;justify-content:space-between;align-items:center;margin-bottom:2mm}'
    +'.badge{background:#e85d20;color:#fff;border-radius:20px;padding:1px 8px;font-size:8pt;font-weight:800}'
    +'.badge-inactive{background:#fee2e2;color:#ef4444;border:1px solid #fca5a5;border-radius:20px;padding:1px 8px;font-size:7pt;font-weight:800;margin-right:4px}'
    +'.badge-sm{background:#e8f0fe;color:#1e3a5f;border-radius:20px;padding:1px 6px;font-size:7pt;font-weight:800}'
    +'.prog-wrap{height:6px;background:#f0ece8;border-radius:3px;overflow:hidden}'
    +'.prog-bar{height:100%;background:linear-gradient(90deg,#e85d20,#f07030);border-radius:3px}'
    +'.subtotal{background:#fff3ee;font-weight:900}'
    +'.center-cell{text-align:center}'
    +'.footer{text-align:center;padding:5mm;font-size:8pt;color:#aaa;border-top:2px solid #f0ece8}'
    +'@media print{body{background:#fff}.no-print{display:none!important}.page{box-shadow:none}}';

  var html = '<!DOCTYPE html><html dir="rtl"><head><meta charset="UTF-8">'
    +'<link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&display=swap" rel="stylesheet">'
    +'<style>'+css+'</style><title>تقرير ONEIC</title></head><body><div class="page">'

    // Hero
    +'<div class="hero"><div class="hero-inner">'
    +'<div class="hero-logo"><img src="'+LOGO_SRC+'" alt="ONEIC"></div>'
    +'<div class="hero-title"><h1>{t("محفظة عُمانتل 1",lang)}</h1><p>Omantel Debt Collection Portfolio — ONEIC</p></div>'
    +'<div class="hero-meta"><strong>'+date+'</strong>'+(lang==='en'?'Last file update':'آخر تحديث للملف')+'<br>'+String(portCnt.toLocaleString())+' '+(lang==='en'?' account':'حساب')+'</div>'
    +'</div></div>'

    // شريط الإنجاز
    +'<div class="prog-strip">'
    +'<span class="prog-label">🎯 نسبة الإنجاز الكلي من المحفظة</span>'
    +'<div class="prog-track"><div class="prog-fill" style="width:'+String(pctDone)+'%"></div></div>'
    +'<span class="prog-pct">'+String(pctDone)+'%</span>'
    +'</div>'

    // KPI
    +'<div class="kpi-row">'
    +'<div class="kpi-card"><div class="kpi-label">{t("قيمة المحفظة",lang)}</div><div class="kpi-value" style="color:#e85d20">'+omrN(portAmt)+' OMR</div></div>'
    +'<div class="kpi-card"><div class="kpi-label">{t("المدفوع",lang)}</div><div class="kpi-value" style="color:#16a34a">'+omrN(grandPaid)+' OMR</div></div>'
    +'<div class="kpi-card"><div class="kpi-label">{t("التسويات",lang)}</div><div class="kpi-value" style="color:#d97706">'+omrN(grandAdj)+' OMR</div></div>'
    +'<div class="kpi-card"><div class="kpi-label">'+(lang==='en'?'Total Collected':'الإجمالي المحصّل')+'</div><div class="kpi-value" style="color:#1e3a5f">'+omrN(grandTotal)+' OMR</div></div>'
    +'</div>'

    // Section 1
    +'<div class="s1-wrap">'
    +'<div class="s1-port">'
    +'<div class="s1-port-title">'+(lang==='en'?'📋 Portfolio':'📋 المحفظة')+'</div>'
    +'<div class="s1-port-row blue"><span class="s1-port-label">عدد الحسابات</span><span class="s1-port-value">'+String(portCnt.toLocaleString())+' حساب</span></div>'
    +'<div class="s1-port-row orange"><span class="s1-port-label">قيمة المحفظة</span><span class="s1-port-value orange">'+omrN(portAmt)+' OMR</span></div>'
    +'</div>'
    +'<div class="s1-coll">'
    +'<div class="s1-coll-title">{t("💰 التحصيل",lang)}</div>'
    +s1HTML
    +'</div></div>'

    // Summary Cards
    +'<div style="padding:3mm 8mm 1mm;font-size:10pt;font-weight:900;color:#1e3a5f;border-bottom:1px solid #f0ece8">📊 ملخص الأقسام — نسبة المساهمة</div>'
    +'<div class="sum-grid">'+sumHTML+'</div>'

    // مكاتب أونك
    +'<div class="section-title"><span>🗺 مكاتب أونك</span><span>المدفوع: '+omrN(govPaid)+' | التسويات: '+omrN(govAdj)+'</span></div>'
    +'<table class="data-table"><thead><tr><th>#</th><th>المحصّل</th><th>المدفوع</th><th>التسويات</th><th>الإجمالي</th></tr></thead><tbody>'+regsHTML+'</tbody></table>'

    // شركات التحصيل
    +'<div class="section-title"><span>🏢 شركات التحصيل</span><span>المدفوع: '+omrN(dcPaid)+' | التسويات: '+omrN(dcAdj)+'</span></div>'
    +'<table class="data-table"><thead><tr><th>#</th><th>الشركة</th><th>المدفوع</th><th>التسويات</th><th>الإجمالي</th></tr></thead><tbody>'+dcHTML+'</tbody></table>'

    // المكتب الرئيسي
    +'<div class="section-title"><span>🏛 المكتب الرئيسي</span><span>المدفوع: '+omrN(hoPaid)+' | التسويات: '+omrN(hoAdj)+'</span></div>'
    +'<table class="data-table"><thead><tr><th>#</th><th>القسم</th><th>المدفوع</th><th>التسويات</th><th>الإجمالي</th></tr></thead><tbody>'+hoHTML+'</tbody></table>'

    +'<div class="footer">{t("ONEIC — لوحة تحكم إدارة تحصيل الديون © 2026",lang)} · '+printDate+'<button class="no-print" onclick="window.print()" style="margin-right:10px;background:#1e3a5f;color:#fff;border:none;border-radius:8px;padding:6px 18px;cursor:pointer;font-family:Cairo,sans-serif;font-size:10pt">🖨 طباعة</button></div>'
    +'</div></body></html>';

  w.document.write(html);
  w.document.close();
}


function useSmartNotifications(gTotal, hoPrincipal, bestDayEver, currentDayTotal) {
  const { lang } = useLang();
  const [notifications, setNotifications] = useState([]);
  const [celebration, setCelebration] = useState(null);
  const [confettiActive, setConfettiActive] = useState(false);
  const prevTotal = useRef(0);
  const shownMilestones = useRef(null);
  if (!shownMilestones.current) {
    try { shownMilestones.current = new Set(JSON.parse(localStorage.getItem('oneic_shown_milestones')||'[]')); }
    catch(e) { shownMilestones.current = new Set(); }
  }

  const addNotification = useCallback((notif) => {
    const id = Date.now() + Math.random();
    setNotifications(prev => [{...notif, id, time: new Date()}, ...prev].slice(0,10));
    if (notif.celebrate) {
      setCelebration(notif);
      setConfettiActive(true);
      setTimeout(() => setConfettiActive(false), 6000);
      setTimeout(() => setCelebration(null), 8000);
    }
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, notif.duration || 7000);
  }, []);

  useEffect(() => {
    if (!gTotal || gTotal === prevTotal.current) return;
    const prev = prevTotal.current;
    prevTotal.current = gTotal;
    // أول دفعة
    if (prev === 0 && gTotal > 0) {
      addNotification({
        type:"success", celebrate:true, icon:"🎊", color:"#16a34a",
        label:lang==='en'?"First collection! 🎊":"أول دفعة تحصيل! 🎊",
        msg:lang==='en'?`First payment recorded: ${omr(gTotal)} OMR — Collection journey begins! 🚀`:`تم تسجيل أول دفعة بقيمة ${omr(gTotal)} OMR — انطلاق رحلة التحصيل! 🚀`
      });
    }
    const milestones = [
      { val:500000,  label:lang==='en'?"Half Million OMR! 🎉":"نصف مليون ريال! 🎉",  color:"#16a34a", icon:"💰", celebrate:true },
      { val:1000000, label:lang==='en'?"One Million OMR! 🏆":"مليون ريال كاملة! 🏆", color:"#e85d20", icon:"🏆", celebrate:true },
      { val:1500000, label:lang==='en'?"1.5 Million OMR! 🚀":"مليون ونص ريال! 🚀",   color:"#7c3aed", icon:"🚀", celebrate:true },
      { val:2000000, label:lang==='en'?"Two Million OMR! 🎊":"مليونين ريال! 🎊",      color:"#0891b2", icon:"💎", celebrate:true },
      { val:2500000, label:lang==='en'?"2.5 Million OMR! ⭐":"مليونين ونص! ⭐",       color:"#d97706", icon:"⭐", celebrate:true },
      { val:3000000, label:lang==='en'?"3 Million OMR! 🔥":"3 ملايين ريال! 🔥",     color:"#dc2626", icon:"🔥", celebrate:true },
      { val:4000000, label:lang==='en'?"4 Million OMR! 🌟":"4 ملايين ريال! 🌟",     color:"#059669", icon:"🌟", celebrate:true },
      { val:5000000, label:lang==='en'?"5 Million OMR! 👑":"5 ملايين ريال! 👑",     color:"#7c3aed", icon:"👑", celebrate:true },
    ];
    milestones.forEach(m => {
      const key = `milestone_${m.val}`;
      if (prev < m.val && gTotal >= m.val && !shownMilestones.current.has(key)) {
        shownMilestones.current.add(key);
        try { localStorage.setItem('oneic_shown_milestones', JSON.stringify([...shownMilestones.current])); } catch(e){}
        addNotification({ type:'milestone', title:lang==='en'?`🎯 Milestone Achieved!`:`🎯 تم تحقيق الهدف!`,
          message:lang==='en'?`Grand Total reached ${m.label}`:`الإجمالي الكلي وصل ${m.label}`,
          sub:`${new Intl.NumberFormat('en-US',{minimumFractionDigits:3}).format(gTotal)} OMR`,
          color:m.color, icon:m.icon, celebrate:m.celebrate, duration:10000 });
      }
    });
    if (prev > 0 && gTotal < prev * 0.95 && gTotal > 100000) {
      addNotification({ type:'warning', title:lang==='en'?'⚠️ Warning: Collection Decline':'⚠️ تحذير: انخفاض في التحصيل',
        message:lang==='en'?`Notable decline in Grand Total`:`انخفاض ملحوظ في الإجمالي`,
        sub:`${new Intl.NumberFormat('en-US',{minimumFractionDigits:3}).format(gTotal)} OMR`,
        color:'#dc2626', icon:'⚠️', celebrate:false, duration:8000 });
    }
  }, [gTotal, addNotification]);

  useEffect(() => {
    if (!hoPrincipal) return;
    const key = 'principal_4m';
    if (hoPrincipal >= 4000000 && !shownMilestones.current.has(key)) {
      shownMilestones.current.add(key);
      try { localStorage.setItem('oneic_shown_milestones', JSON.stringify([...shownMilestones.current])); } catch(e){}
      addNotification({ type:'special', title:lang==='en'?'🎊 Exceptional Achievement — Legal DR. Sarhaan!':'🎊 إنجاز استثنائي — Legal DR. Sarhaan!',
        message:lang==='en'?'Principal Amount exceeded 4 Million OMR!':'Principal Amount تجاوز 4 ملايين ريال!',
        sub:`${new Intl.NumberFormat('en-US',{minimumFractionDigits:3}).format(hoPrincipal)} OMR`,
        color:'#9333ea', icon:'💜', celebrate:true, duration:15000 });
    }
  }, [hoPrincipal, addNotification]);

  const prevBest = useRef(0);
  useEffect(() => {
    if (!currentDayTotal || currentDayTotal <= 0) return;
    const storedBest = (() => { try { return parseFloat(localStorage.getItem('oneic_best_day')||'0'); } catch(e){return 0;} })();
    if (currentDayTotal > storedBest && currentDayTotal > prevBest.current) {
      prevBest.current = currentDayTotal;
      try { localStorage.setItem('oneic_best_day', String(currentDayTotal)); } catch(e){}
      addNotification({ type:'record', title:lang==='en'?'🏆 New Record!':'🏆 رقم قياسي جديد!',
        message:lang==='en'?'Best single-day collection in project history!':'أفضل دفعة يومية في تاريخ المشروع!',
        sub:`${new Intl.NumberFormat('en-US',{minimumFractionDigits:3}).format(currentDayTotal)} OMR في يوم واحد`,
        color:'#f59e0b', icon:'🥇', celebrate:true, duration:10000 });
    }
  }, [currentDayTotal, addNotification]);

  return { notifications, celebration, confettiActive, addNotification, setNotifications };
}

function ConfettiRain({ active }) {
  if (!active) return null;
  const colors = ['#e85d20','#ffd700','#16a34a','#7c3aed','#0891b2','#f59e0b','#ec4899'];
  const pieces = Array.from({length:80},(_,i)=>({
    id:i, x:Math.random()*100, delay:Math.random()*3,
    duration:2+Math.random()*3, size:6+Math.random()*10,
    color:colors[Math.floor(Math.random()*colors.length)],
    shape:Math.random()>0.5?'circle':'rect', rotation:Math.random()*360,
  }));
  return (
    <div style={{position:'fixed',inset:0,pointerEvents:'none',zIndex:99999,overflow:'hidden'}}>
      <style>{`
        @keyframes cFall{0%{transform:translateY(-20px) rotate(0deg);opacity:1}100%{transform:translateY(110vh) rotate(720deg);opacity:0}}
        @keyframes cSway{0%,100%{margin-left:0}50%{margin-left:30px}}
      `}</style>
      {pieces.map(p=>(
        <div key={p.id} style={{position:'absolute',left:p.x+'%',top:'-20px',
          width:p.size,height:p.size,background:p.color,
          borderRadius:p.shape==='circle'?'50%':'2px',
          animation:`cFall ${p.duration}s ease-in ${p.delay}s forwards, cSway ${p.duration/2}s ease-in-out ${p.delay}s infinite`,
        }}/>
      ))}
    </div>
  );
}

function CelebrationModal({ celebration }) {
  const { lang } = useLang();
  if (!celebration) return null;
  return (
    <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.75)',
      display:'flex',alignItems:'center',justifyContent:'center',
      zIndex:99998,padding:20,direction:'rtl'}}>
      <div style={{background:`linear-gradient(135deg,${celebration.color}22,#fff)`,
        border:`3px solid ${celebration.color}`,borderRadius:24,padding:'36px 28px',
        maxWidth:460,width:'100%',textAlign:'center',
        boxShadow:`0 0 60px ${celebration.color}66`}}>
        <div style={{fontSize:64,marginBottom:12,lineHeight:1}}>{celebration.icon}</div>
        <div style={{fontSize:22,fontWeight:900,color:celebration.color,marginBottom:8}}>{celebration.title}</div>
        <div style={{fontSize:16,fontWeight:800,color:'#111',marginBottom:6}}>{celebration.message}</div>
        {celebration.sub && <div style={{fontSize:18,fontWeight:900,color:celebration.color,
          background:`${celebration.color}18`,borderRadius:10,padding:'8px 16px',
          margin:'10px auto',display:'inline-block'}}>{celebration.sub}</div>}
        <div style={{fontSize:12,color:'#888',marginTop:12}}>{t("🎊 تهانينا لفريق ONEIC بأكمله! 🎊",lang)}</div>
      </div>
    </div>
  );
}

function NotificationStack({ notifications, onDismiss }) {
  if (!notifications.length) return null;
  return (
    <div style={{position:'fixed',top:80,left:16,zIndex:9997,
      display:'flex',flexDirection:'column',gap:8,maxWidth:340,pointerEvents:'none'}}>
      {notifications.map(n=>(
        <div key={n.id} style={{background:'#fff',borderRadius:12,
          border:`2px solid ${n.color}`,borderRight:`6px solid ${n.color}`,
          padding:'10px 12px',boxShadow:`0 4px 20px ${n.color}33`,
          display:'flex',gap:8,alignItems:'flex-start',pointerEvents:'auto'}}>
          <div style={{fontSize:22,flexShrink:0}}>{n.icon}</div>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontSize:12,fontWeight:900,color:n.color,marginBottom:2}}>{n.title}</div>
            <div style={{fontSize:11,fontWeight:700,color:'#111',marginBottom:2}}>{n.message}</div>
            {n.sub&&<div style={{fontSize:10,color:'#555',fontWeight:600}}>{n.sub}</div>}
          </div>
          <button onClick={()=>onDismiss(n.id)} style={{background:'none',border:'none',
            cursor:'pointer',color:'#aaa',fontSize:13,padding:0,pointerEvents:'auto'}}>✕</button>
        </div>
      ))}
    </div>
  );
}

export default function Dashboard() {
  const dataRef = useRef(null);
  const lastSyncRef = useRef('');
  const { w } = useWindowSize();
  const isMobile  = w < 640;
  const isTablet  = w >= 640 && w < 1024;
  const isDesktop = w >= 1024;
  const small = w < 768;

  // ── تحميل البيانات من API عند البداية ───────────────────────────────────
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem('oneic_dashboard_data');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.regions && parsed.regions.length > 0) return parsed;
      }
    } catch(e) {}
    return SEED;
  });
  const [loadingServer, setLoadingServer] = useState(true);
  const [complaintsCount, setComplaintsCount] = useState(() => { try { return parseInt(localStorage.getItem('oneic_complaints_count')||'0'); } catch(e){return 0;} });
  const [complaintsCounts, setComplaintsCounts] = useState(() => {
    try { return JSON.parse(localStorage.getItem('oneic_complaints_counts')||'{}'); } catch(e){return {};}
  });
  const [complaintsPrincipal, setComplaintsPrincipal] = useState({dc:0,ho:0,gov:0});
  const [complaintsPaidState, setComplaintsPaidState] = useState({dc:0,ho:0,gov:0});
  const [complaintsAdjState,  setComplaintsAdjState]  = useState({dc:0,ho:0,gov:0});
  const [complaintsAmts, setComplaintsAmts] = useState(() => {
    try { return JSON.parse(localStorage.getItem('oneic_complaints_amts')||'{}'); } catch(e){return {};}
  });
  const [complaintsRegionMap, setComplaintsRegionMap] = useState(() => {
    try { return JSON.parse(localStorage.getItem('oneic_complaints_region_map')||'{}'); } catch(e){return {};}
  });
  const [complaintsBranchMap, setComplaintsBranchMap] = useState(() => {
    try { return JSON.parse(localStorage.getItem('oneic_complaints_branch_map')||'{}'); } catch(e){return {};}
  });
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess]   = useState(false);
  const [error, setError]       = useState(null);
  const [openRegion, setOpenRegion] = useState(null);
  const [pending, setPending]   = useState(null);
  const [verified, setVerified] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [pwInput, setPwInput] = useState('');
  const [pwError, setPwError] = useState(false);
  const [showBulkReport, setShowBulkReport] = useState(false);
  const [lastSync, setLastSync] = useState(null);
  const [lang, setLang] = useState(() => { try { return localStorage.getItem('oneic_lang')||'ar'; } catch(e){return 'ar';} });
  // Apply dir/lang to document
  useEffect(() => {
    document.documentElement.dir  = lang === 'en' ? 'ltr' : 'rtl';
    document.documentElement.lang = lang;
  }, [lang]);
  const langCtx = { lang, setLang };


  const [syncing, setSyncing] = useState(false);
  const [showUploadAuth, setShowUploadAuth] = useState(false);
  const [uploadAuthInput, setUploadAuthInput] = useState('');
  const [uploadAuthError, setUploadAuthError] = useState(false);
  const [uploadAuthCallback, setUploadAuthCallback] = useState(null);
  const [binId, setBinId]       = useState(() => { try { return localStorage.getItem('oneic_bin_id')||''; } catch(e){return '';} });
  const [apiKey, setApiKey]     = useState(() => { try { return localStorage.getItem('oneic_api_key')||''; } catch(e){return '';} });
  const [history, setHistory]   = useState(() => {
    try { return JSON.parse(localStorage.getItem('oneic_history')||'[]'); } catch(e){return [];}
  });

  // ── تحميل السجل التاريخي من Firebase على كل الأجهزة ─────────────────────
  useEffect(() => { dataRef.current = data; }, [data]);

    useEffect(() => {
    async function loadHistory() {
      try {
        const res = await fetch('https://oneic-dashboard-default-rtdb.firebaseio.com/history.json');
        if (res.ok) {
          const d = await res.json();
          if (d?.entries?.length > 0) {
            setHistory(d.entries);
            try { localStorage.setItem('oneic_history', JSON.stringify(d.entries)); } catch(e) {}
            return;
          }
        }
      } catch(e) {}
      try {
        const row = await sbGet('oneic_data');
        if (row?.history?.length > 0) {
          setHistory(function(prevH){ var rh=row.history||[]; var merged=(rh.length>=(prevH||[]).length)?rh:prevH; try { localStorage.setItem('oneic_history', JSON.stringify(merged)); } catch(e) {} return merged; });
        }
      } catch(e) {}
    }
    loadHistory();
  }, []);
  const [bulkData, setBulkDataMain] = useState(() => {
    try {
      const saved = localStorage.getItem('oneic_bulk_data');
      if (saved) { const p = JSON.parse(saved); if (p?.daily?.length>0) return p; }
    } catch(e){}
    return BULK_SEED;
  });

  // ── تحميل من Supabase عند فتح الصفحة ──────────────────────────────────────
  useEffect(() => {
    async function load() {
      // ══ منطق مبسّط وموحّد ومضمون: Firebase هو مصدر الحقيقة الوحيد (single source of truth) ══
      // أثبتنا أن sbUpsert يحفظ بنجاح 100% بعد كل Complaints/XLS، لذا Firebase دائماً يُفضَّل إذا توفر ومحتواه صالح
      let row = null;
      try {
        const fbRow = await sbGet('oneic_data');
        if (fbRow?.regions?.length > 0) row = fbRow;
      } catch(e) { console.warn('Firebase unavailable:', e.message); }

      // localStorage فقط كـ fallback إذا Firebase غير متاح تماماً (مشكلة شبكة)
      if (!row) {
        try {
          const saved = localStorage.getItem('oneic_dashboard_data');
          if (saved) {
            const parsed = JSON.parse(saved);
            if (parsed?.regions?.length > 0) row = parsed;
          }
        } catch(e) {}
      }

      if (row?.regions?.length > 0) {
        const HO_REQ = ["Legal - DR. Sarhaan","Documentation- Omantel","Non-due accounts","Legal -Oneic","Refund - before legal","Refund - after legal"];
        const HO_P = {
          "Legal - DR. Sarhaan":{portAmt:3229651.681,portCnt:3691,closed:67,active:3624,principalAmt:3301711.348},
          "Documentation- Omantel":{portAmt:471756.070,portCnt:1099,closed:8,active:1091},
          "Non-due accounts":{portAmt:0,portCnt:340},
          "Legal -Oneic":{portAmt:64528.164,portCnt:144,principalAmt:64528.164,closed:3,active:141},"Refund - before legal":{portAmt:0,portCnt:0,closed:0,active:0},"Refund - after legal":{portAmt:0,portCnt:0,closed:0,active:0}
        };
        const existingHO = row.headOffice || [];
        const fullHO = HO_REQ.map(function(nm){var f=existingHO.find(function(x){return x.name===nm;})||(nm==='Non-due accounts'?existingHO.find(function(x){return x.name==='HO';}):null);var p=HO_P[nm]||{};if(f)return Object.assign({},p,f,{name:nm,closed:(f.closed!==undefined&&f.closed!==null)?f.closed:(p.closed||0),active:(f.active!==undefined&&f.active!==null)?f.active:(p.active||0)});return Object.assign({name:nm,paid:0,adj:0,count:0,closed:0,active:0},p);});
        let d = Object.assign({},row,{headOffice:fullHO,_updatedAt:row._updatedAt||row.lastUpdated||''});
        lastSyncRef.current = d._updatedAt||'';
        if (row.complaintsBranchMap) setComplaintsBranchMap(row.complaintsBranchMap);
        if (row.complaintsRegionMap) setComplaintsRegionMap(row.complaintsRegionMap);
        if (row.complaintsPrincipal) setComplaintsPrincipal(row.complaintsPrincipal);
        if (row.complaintsPaidState) setComplaintsPaidState(row.complaintsPaidState);
        if (row.complaintsAdjState)  setComplaintsAdjState(row.complaintsAdjState);
        
        setData(function(prev){d.uploadCount=Math.max(d.uploadCount||0,(prev&&prev.uploadCount)||0);if((prev&&prev.uploadDate||"")>(d.uploadDate||""))d.uploadDate=prev.uploadDate||d.uploadDate;return d;});
        try { localStorage.setItem('oneic_dashboard_data', JSON.stringify(d)); } catch(e) {}
        if (row.history?.length > 0) {
          setHistory(function(prevH){ var rh=row.history||[]; var merged=(rh.length>=(prevH||[]).length)?rh:prevH; try { localStorage.setItem('oneic_history', JSON.stringify(merged)); } catch(e) {} return merged; });
        }
      }
      setLoadingServer(false);
      sbGet('oneic_bulk').then(function(br){if(br&&br.daily&&br.daily.length){setBulkData(br);try{localStorage.setItem('oneic_bulk_data',JSON.stringify(br));}catch(e){}}}).catch(function(){try{var sb=localStorage.getItem('oneic_bulk_data');if(sb){var pb=JSON.parse(sb);if(pb&&pb.daily&&pb.daily.length)setBulkData(pb);}}catch(e){}});
    }
    load();

    // ══ مزامنة كل 8 ثوانٍ ══
    var _syncInterval = setInterval(function() {
      if (window._noSyncUntil && Date.now() < window._noSyncUntil) return;
      sbGet('oneic_data').then(function(row) {
        if (!row || !row.regions || !row.regions.length) return;
        var fbTime = new Date(row._updatedAt||row.lastUpdated||0).getTime();
        var myTime = lastSyncRef.current ? new Date(lastSyncRef.current).getTime() : 0;
        if (fbTime > 0 && myTime > 0 && fbTime <= myTime) return;
        var HO_KEYS3 = ["Legal - DR. Sarhaan","Documentation- Omantel","Non-due accounts","Legal -Oneic","Refund - before legal","Refund - after legal"];
        var HO_DEF3 = {"Legal - DR. Sarhaan":{portAmt:3229651.681,portCnt:3691,closed:67,active:3624},"Documentation- Omantel":{portAmt:471756.070,portCnt:1099,closed:8,active:1091},"Non-due accounts":{portAmt:0,portCnt:340},"Legal -Oneic":{portAmt:64528.164,portCnt:144,closed:3,active:141},"Refund - before legal":{portAmt:0,portCnt:0,closed:0,active:0},"Refund - after legal":{portAmt:0,portCnt:0,closed:0,active:0}};
        var eHO3 = row.headOffice||[];
        var fullHO3 = HO_KEYS3.map(function(nm){
          var f=eHO3.find(function(c){return c.name===nm;})||(nm==='Non-due accounts'?eHO3.find(function(c){return c.name==='HO';}):null);
          var p=HO_DEF3[nm]||{};
          if(f) return Object.assign({},p,f,{name:nm,closed:(f.closed!==undefined&&f.closed!==null)?f.closed:(p.closed||0),active:(f.active!==undefined&&f.active!==null)?f.active:(p.active||0)});
          return {name:nm,paid:0,adj:0,count:0,portAmt:p.portAmt||0,portCnt:p.portCnt||0,closed:0,active:0};
        });
        // ══ Firebase يحتوي البيانات الكاملة والنهائية الصحيحة - لا حاجة لأي دمج إضافي من localStorage ══
        var dSync = {};
        var rKeys = Object.keys(row);
        for(var ki=0;ki<rKeys.length;ki++){dSync[rKeys[ki]]=row[rKeys[ki]];}
        dSync.headOffice = fullHO3;
        dSync._updatedAt = row._updatedAt||row.lastUpdated||'';
        lastSyncRef.current = dSync._updatedAt || new Date().toISOString();
        setData(function(prev){dSync.uploadCount=Math.max(dSync.uploadCount||0,(prev&&prev.uploadCount)||0);if(prev&&prev.uploadDate>(dSync.uploadDate||""))dSync.uploadDate=prev.uploadDate;return dSync;});
        try{localStorage.setItem('oneic_dashboard_data',JSON.stringify(dSync));}catch(ex){}
        if(row.history&&row.history.length){setHistory(function(prevH){var rh=row.history||[];var merged=(rh.length>=(prevH||[]).length)?rh:prevH;try{localStorage.setItem('oneic_history',JSON.stringify(merged));}catch(ex){}return merged;});}
        sbGet('oneic_bulk').then(function(br){if(br&&br.daily&&br.daily.length){setBulkData(br);try{localStorage.setItem('oneic_bulk_data',JSON.stringify(br));}catch(ex){};}}).catch(function(){});
        setLastSync(new Date());
      }).catch(function(e){console.warn('Sync error:',e.message);});
    }, 8000);
    function doSync() {
      if (window._noSyncUntil && Date.now() < window._noSyncUntil) return;
      sbGet('oneic_data').then(function(row) {
        if (!row || !row.regions || !row.regions.length) return;
        var fbTime = new Date(row._updatedAt||row.lastUpdated||0).getTime();
        var myTime = lastSyncRef.current ? new Date(lastSyncRef.current).getTime() : 0;
        if (fbTime > 0 && myTime > 0 && fbTime <= myTime) return;
        var HO_KEYS4=["Legal - DR. Sarhaan","Documentation- Omantel","Non-due accounts","Legal -Oneic","Refund - before legal","Refund - after legal"];
        var HO_P4={"Legal - DR. Sarhaan":{portAmt:3229651.681,portCnt:3691,closed:67,active:3624},"Documentation- Omantel":{portAmt:471756.070,portCnt:1099,closed:8,active:1091},"Non-due accounts":{portAmt:0,portCnt:340},"Legal -Oneic":{portAmt:64528.164,portCnt:144,closed:3,active:141},"Refund - before legal":{portAmt:0,portCnt:0,closed:0,active:0},"Refund - after legal":{portAmt:0,portCnt:0,closed:0,active:0}};
        var eHO4=row.headOffice||[];
        var fullHO4=HO_KEYS4.map(function(nm){var f=eHO4.find(function(c){return c.name===nm;})||(nm==='Non-due accounts'?eHO4.find(function(c){return c.name==='HO';}):null);var p=HO_P4[nm]||{};if(f)return Object.assign({},p,f,{name:nm,closed:(f.closed!==undefined&&f.closed!==null)?f.closed:(p.closed||0),active:(f.active!==undefined&&f.active!==null)?f.active:(p.active||0)});return {name:nm,paid:0,adj:0,count:0,portAmt:p.portAmt||0,portCnt:p.portCnt||0,closed:0,active:0};});
        // ══ Firebase يحتوي البيانات الكاملة والنهائية الصحيحة - لا حاجة لأي دمج إضافي من localStorage ══
        var dSync4={headOffice:fullHO4,_updatedAt:row._updatedAt||row.lastUpdated||''};
        var rk=Object.keys(row); for(var ki4=0;ki4<rk.length;ki4++){if(rk[ki4]!=='headOffice')dSync4[rk[ki4]]=row[rk[ki4]];}
        lastSyncRef.current = dSync4._updatedAt || new Date().toISOString();
        setData(function(prev){dSync4.uploadCount=Math.max(dSync4.uploadCount||0,(prev&&prev.uploadCount)||0);if(prev&&prev.uploadDate>(dSync4.uploadDate||""))dSync4.uploadDate=prev.uploadDate;return dSync4;});
        try{localStorage.setItem('oneic_dashboard_data',JSON.stringify(dSync4));}catch(e){}
        if(row.history&&row.history.length){setHistory(function(prevH){var rh=row.history||[];return (rh.length>=(prevH||[]).length)?rh:prevH;});}
        sbGet('oneic_bulk').then(function(br){if(br&&br.daily&&br.daily.length){setBulkData(br);}}).catch(function(){});
        setLastSync(new Date());
      }).catch(function(e){console.warn('Sync error:',e.message);});
    }
    var onVisible3 = function() {
      if (document.visibilityState === 'visible') {
        lastSyncRef.current = '';
        doSync();
      }
    };
    var onPageShow3 = function(e) {
      // موبايل: pageshow عند العودة من الخلفية
      lastSyncRef.current = '';
      doSync();
    };
    var onFocus3 = function() {
      // موبايل: focus عند العودة
      lastSyncRef.current = '';
      doSync();
    };
    document.addEventListener('visibilitychange', onVisible3);
    window.addEventListener('pageshow', onPageShow3);
    window.addEventListener('focus', onFocus3);
    return function(){ clearInterval(_syncInterval); document.removeEventListener('visibilitychange',onVisible3); window.removeEventListener('pageshow',onPageShow3); window.removeEventListener('focus',onFocus3); };
  }, []);

  const UPLOAD_PW = 'Sulaiman1992';

  // ══ تحديث فوري من Firebase ══
  const forceRefresh = () => {
    // إجراء متعمد من المستخدم - يعمل دائماً، ويثق بـ Firebase 100% كمصدر الحقيقة الوحيد
    window._noSyncUntil = 0;
    setSyncing(true);
    sbGet('oneic_data').then(function(row) {
      if (!row || !row.regions || !row.regions.length) { setSyncing(false); return; }
      // ══ Firebase يحتوي البيانات الكاملة والنهائية الصحيحة - لا حاجة لأي دمج أو إعادة بناء إضافي ══
      var HO_KEYS5=["Legal - DR. Sarhaan","Documentation- Omantel","Non-due accounts","Legal -Oneic","Refund - before legal","Refund - after legal"];
      var HO_P5={"Legal - DR. Sarhaan":{portAmt:3229651.681,portCnt:3691,closed:67,active:3624},"Documentation- Omantel":{portAmt:471756.070,portCnt:1099,closed:8,active:1091},"Non-due accounts":{portAmt:0,portCnt:340},"Legal -Oneic":{portAmt:64528.164,portCnt:144,closed:3,active:141},"Refund - before legal":{portAmt:0,portCnt:0,closed:0,active:0},"Refund - after legal":{portAmt:0,portCnt:0,closed:0,active:0}};
      var eHO5=row.headOffice||[];
      var fullHO5=HO_KEYS5.map(function(nm){var f=eHO5.find(function(c){return c.name===nm;})||(nm==='Non-due accounts'?eHO5.find(function(c){return c.name==='HO';}):null);var p=HO_P5[nm]||{};if(f)return Object.assign({},p,f,{name:nm,closed:(f.closed!==undefined&&f.closed!==null)?f.closed:(p.closed||0),active:(f.active!==undefined&&f.active!==null)?f.active:(p.active||0)});return Object.assign({name:nm,paid:0,adj:0,count:0,closed:0,active:0},p);});
      var d5={}; var rk5=Object.keys(row); for(var ki5=0;ki5<rk5.length;ki5++){d5[rk5[ki5]]=row[rk5[ki5]];}
      d5.headOffice=fullHO5; d5._updatedAt=row._updatedAt||row.lastUpdated||'';
      lastSyncRef.current = d5._updatedAt || new Date().toISOString();
      setData(function(prev){d5.uploadCount=Math.max(d5.uploadCount||0,(prev&&prev.uploadCount)||0);if(prev&&prev.uploadDate&&prev.uploadDate>(d5.uploadDate||''))d5.uploadDate=prev.uploadDate;return d5;});
      try{localStorage.setItem('oneic_dashboard_data',JSON.stringify(d5));}catch(e){}
      if(row.history&&row.history.length>0){setHistory(function(prevH){var rh=row.history||[];return (rh.length>=(prevH||[]).length)?rh:prevH;});}
      setLastSync(new Date());
      setSyncing(false);
    }).catch(function(e){ console.warn('forceRefresh error:',e.message); setSyncing(false); });
  };

  const requireUploadAuth = (callback) => {
    setUploadAuthInput('');
    setUploadAuthError(false);
    setUploadAuthCallback(() => callback);
    setShowUploadAuth(true);
  };

  const confirmUploadAuth = () => {
    if (uploadAuthInput === UPLOAD_PW) {
      setShowUploadAuth(false);
      if (uploadAuthCallback) uploadAuthCallback();
    } else {
      setUploadAuthError(true);
      setUploadAuthInput('');
    }
  };

  const handleFile = useCallback(async (file) => {
    setUploading(true); setError(null); setSuccess(false); setPending(null);
    try {
      // ── تحديد نوع الملف تلقائياً بالمحتوى لا الاسم ─────────────────
      // نقرأ أول 2KB لمعرفة نوع الملف
      const sniffBuffer = await file.slice(0, 4096).arrayBuffer();
      const sniffText = (() => {
        try {
          const bytes = new Uint8Array(sniffBuffer);
          // Find BOM
          let start = 0;
          for (let i = 0; i < Math.min(10, bytes.length-1); i++) {
            if (bytes[i] === 0xFF && bytes[i+1] === 0xFE) { start = i+2; break; }
          }
          // Decode first 500 chars
          let s = '';
          for (let i = start; i < Math.min(start+1000, bytes.length-1); i += 2) {
            const c = bytes[i] | (bytes[i+1] << 8);
            if (c > 0) s += String.fromCharCode(c);
          }
          return s || new TextDecoder('utf-8').decode(sniffBuffer).slice(0, 500);
        } catch(e) { return ''; }
      })();
      
      // كشف النوع: الأولوية لـ performance إذا وُجد Region + Paid Amount + Collector
      const hasComplaintCols   = sniffText.includes('Complaint ID') || sniffText.includes('Agreement No');
      const hasPerformanceCols = sniffText.includes('Paid Amount') && sniffText.includes('Region') && sniffText.includes('Collector');
      // Performance يأخذ الأولوية دائماً إذا وُجدت الأعمدة الثلاثة
      const nameHasComplaint = file.name.toLowerCase().includes('complaint');
      const isComplaints = nameHasComplaint || file.name.toLowerCase().includes('export') || hasComplaintCols;
      
      console.log('[handleFile]', file.name, '→', isComplaints ? 'complaints' : 'performance',
        '| complaint cols:', hasComplaintCols, '| performance cols:', hasPerformanceCols);
      
      if (isComplaints) {
        // ملف complaints → يحدّث عدد الحسابات والمبالغ
        const {total,dcCount,hoCount,govCount,dcAmt,hoAmt,govAmt,dcPaid,hoPaid,govPaid,dcAdj,hoAdj,govAdj,regionMap,branchMap,totalDiscount,totalOverRecovery,totalOverRecoveryCount,totalOS} = await parseComplaints(file);
        setComplaintsCount(total);
        setComplaintsCounts({dc:dcCount,ho:hoCount,gov:govCount});
        setComplaintsAmts({dc:dcAmt,ho:hoAmt,gov:govAmt});
        setComplaintsPrincipal({dc:dcAmt,ho:hoAmt,gov:govAmt});
        setComplaintsPaidState({dc:dcPaid,ho:hoPaid,gov:govPaid});
        setComplaintsAdjState({dc:dcAdj,ho:hoAdj,gov:govAdj});
        setComplaintsRegionMap(regionMap||{});
        setComplaintsBranchMap(branchMap||{});
        // ══ حماية فورية ضد interval قبل أي شيء آخر (لا تعتمد على توقيت setData) ══
        window._noSyncUntil = Date.now() + 60000;
        // ══ حدّث data مباشرة من Complaints ══
        setData(function(prev) { var base = prev; if(!base||!base.regions||!base.regions.length){console.warn('[EMPTY]');return prev;}
          // ══ تنظيف وتوحيد الأسماء المكررة (case-insensitive) في debtCompanies قبل أي شيء آخر ══
          if (base.debtCompanies && base.debtCompanies.length) {
            var dcSeen = {};
            var dcMerged = [];
            base.debtCompanies.forEach(function(dcItem){
              var dcKeyL = (dcItem.name||'').trim().toLowerCase();
              if (dcSeen[dcKeyL] !== undefined) {
                var existIdx = dcSeen[dcKeyL];
                dcMerged[existIdx] = Object.assign({}, dcMerged[existIdx], {
                  paid: (dcMerged[existIdx].paid||0) + (dcItem.paid||0),
                  adj: (dcMerged[existIdx].adj||0) + (dcItem.adj||0),
                  count: (dcMerged[existIdx].count||0) + (dcItem.count||0),
                  portCnt: Math.max(dcMerged[existIdx].portCnt||0, dcItem.portCnt||0),
                  principalAmt: Math.max(dcMerged[existIdx].principalAmt||0, dcItem.principalAmt||0),
                  portAmt: Math.max(dcMerged[existIdx].portAmt||0, dcItem.portAmt||0)
                });
              } else {
                dcSeen[dcKeyL] = dcMerged.length;
                dcMerged.push(Object.assign({}, dcItem));
              }
            });
            base = Object.assign({}, base, {debtCompanies: dcMerged});
          }
          // ══ تنظيف وتوحيد الأسماء المكررة (case-insensitive) في headOffice قبل أي شيء آخر ══
          // (يصلح حالات قديمة محفوظة فيها بطاقة "Non-due accounts"/"HO" مكررة تُضخّم عدد الحسابات)
          if (base.headOffice && base.headOffice.length) {
            var hoSeen = {};
            var hoMerged = [];
            var hoCanon = function(nm){
              var l = (nm||'').trim().toLowerCase();
              if (l === 'ho' || l === 'non-due accounts') return 'non-due accounts';
              return l;
            };
            base.headOffice.forEach(function(hoItem){
              var hoKeyL = hoCanon(hoItem.name);
              if (hoSeen[hoKeyL] !== undefined) {
                var existIdx = hoSeen[hoKeyL];
                hoMerged[existIdx] = Object.assign({}, hoMerged[existIdx], {
                  name: hoKeyL === 'non-due accounts' ? 'Non-due accounts' : hoMerged[existIdx].name,
                  paid: (hoMerged[existIdx].paid||0) + (hoItem.paid||0),
                  adj: (hoMerged[existIdx].adj||0) + (hoItem.adj||0),
                  count: (hoMerged[existIdx].count||0) + (hoItem.count||0),
                  portCnt: Math.max(hoMerged[existIdx].portCnt||0, hoItem.portCnt||0),
                  portAmt: Math.max(hoMerged[existIdx].portAmt||0, hoItem.portAmt||0),
                  closed: (hoMerged[existIdx].closed||0) + (hoItem.closed||0),
                  active: (hoMerged[existIdx].active||0) + (hoItem.active||0)
                });
              } else {
                hoSeen[hoKeyL] = hoMerged.length;
                hoMerged.push(Object.assign({}, hoItem, {name: hoKeyL==='non-due accounts' ? 'Non-due accounts' : hoItem.name}));
              }
            });
            base = Object.assign({}, base, {headOffice: hoMerged});
          }
          var newRegions = (base.regions||[]).map(function(r) {
            var rKey = (r.nameEn||r.nameAr||'').trim();
            var rKeyL = rKey.toLowerCase();
            var rm = regionMap[rKey] || regionMap[r.nameEn] || regionMap[r.nameAr||''];
            if (!rm) {
              var keys = Object.keys(regionMap);
              for (var ki=0; ki<keys.length; ki++) {
                var kl = keys[ki].toLowerCase();
                if (kl === rKeyL || kl.indexOf(rKeyL)>=0 || rKeyL.indexOf(kl)>=0) { rm = regionMap[keys[ki]]; break; }
              }
            }
            if (rm) {
              var rmColKeys = Object.keys(rm.collectors||{});
              var newCollectors = rmColKeys.map(function(cname){
                var cm = rm.collectors[cname];
                var existingCol = (r.collectors||[]).find(function(oc){return oc.name===cname || oc.name.toLowerCase()===cname.toLowerCase();});
                return Object.assign({}, existingCol||{name:cname,principalAmt:0,portAmt:0}, {
                  name: cname,
                  paid: cm.paid||0,
                  adj: cm.adj||0,
                  count: cm.count||(existingCol&&existingCol.count)||0,
                  portCnt: cm.count||(existingCol&&existingCol.portCnt)||0,
                  principalAmt: (cm.principal||cm.amt||0) || (existingCol&&existingCol.principalAmt) || 0,
                  portAmt: (cm.principal||cm.amt||0) || (existingCol&&existingCol.portAmt) || 0
                });
              });
              return Object.assign({},r,{paid:rm.paid||0, adj:rm.adj||0, count:rm.count||0, portCnt:rm.count||r.portCnt||0, principalAmt:rm.amt||r.principalAmt||0, collectors:newCollectors});
            }
            return r;
          });
          // دالة مطابقة ذكية: حرفية ثم case-insensitive ثم جزئية
          var findBM = function(name){
            if (!name) return null;
            if (branchMap[name]) return branchMap[name];
            var nameL = name.trim().toLowerCase();
            var bks = Object.keys(branchMap);
            for (var i=0;i<bks.length;i++){
              var kl = bks[i].trim().toLowerCase();
              if (kl===nameL) return branchMap[bks[i]];
            }
            for (var i=0;i<bks.length;i++){
              var kl = bks[i].trim().toLowerCase();
              if (kl.indexOf(nameL)>=0 || nameL.indexOf(kl)>=0) return branchMap[bks[i]];
            }
            return null;
          };
          var matchedBmKeys = {};
          var findBMTrack = function(name){
            if (!name) return null;
            if (branchMap[name]) { matchedBmKeys[name]=1; return branchMap[name]; }
            var nameL = name.trim().toLowerCase();
            var bks = Object.keys(branchMap);
            for (var i=0;i<bks.length;i++){
              var kl = bks[i].trim().toLowerCase();
              if (kl===nameL) { matchedBmKeys[bks[i]]=1; return branchMap[bks[i]]; }
            }
            for (var i=0;i<bks.length;i++){
              var kl = bks[i].trim().toLowerCase();
              if (kl.indexOf(nameL)>=0 || nameL.indexOf(kl)>=0) { matchedBmKeys[bks[i]]=1; return branchMap[bks[i]]; }
            }
            return null;
          };
          // حدّث debtCompanies من branchMap (مطابقة ذكية)
          var newDC = (base.debtCompanies||[]).map(function(c) {
            var bm = findBMTrack(c.name);
            if (bm) return Object.assign({},c,{paid:bm.paid||0,adj:bm.adj||0,portCnt:bm.count||c.portCnt||0,count:bm.count||c.count||0,principalAmt:bm.amt||c.principalAmt||0,portAmt:bm.amt||c.portAmt||0,closed:c.closed||0,active:c.active||0});
            return c;
          });
          // حدّث headOffice من branchMap (مطابقة ذكية) - closed/active تُحسب من Complaints مباشرة (O/S Amount لكل حساب)
          var newHO = (base.headOffice||[]).map(function(c) {
            var bm = findBMTrack(c.name);
            if (bm) {
              var hasClosedData = (c.name==='Legal -Oneic'||c.name==='Documentation- Omantel'||c.name==='Legal - DR. Sarhaan'||c.name==='Non-due accounts'||c.name==='Refund - before legal'||c.name==='Refund - after legal');
              return Object.assign({},c,{
                paid:bm.paid||0,
                adj:bm.adj||0,
                portCnt:bm.count||c.portCnt||0,
                count:bm.count||c.count||0,
                principalAmt:bm.amt||c.principalAmt||0,
                portAmt:bm.amt||c.portAmt||0,
                refundAmt: (c.name==='Refund - before legal') ? (bm.refundAmt||0) : (c.refundAmt||0),
                closed: hasClosedData ? (bm.closed||0) : (c.closed||0),
                active: hasClosedData ? (bm.active||0) : (c.active||0)
              });
            }
            return c;
          });
          // أضف شركات في Complaints ليست في debtCompanies (مثل Tahseel، High Speed) - فقط إذا لم تُطابق بالفعل
          var bmKeys = Object.keys(branchMap);
          for (var bki=0; bki<bmKeys.length; bki++) {
            var bkn = bmKeys[bki];
            var HO_SKIP=["Legal - DR. Sarhaan","Documentation- Omantel","HO","Non-due accounts","Legal -Oneic","Refund - before legal","Refund - after legal","Legal","Legal ","HEAD_OFFICE_TOTAL"];
            if (!matchedBmKeys[bkn] && HO_SKIP.indexOf(bkn)<0 && (branchMap[bkn].count||0) > 0) {
              var bkm = branchMap[bkn];
              newDC.push({name:bkn, paid:bkm.paid||0, adj:bkm.adj||0, principalAmt:0, portAmt:0, portCnt:bkm.count||0, count:bkm.count||0});
            }
          }
          var _tF=new Date().toISOString();var _tFd=_tF.split("T")[0];var _gp2=newRegions.reduce(function(s,r){return s+(r.paid||0);},0)+newDC.reduce(function(s,r){return s+(r.paid||0);},0)+newHO.reduce(function(s,r){return s+(r.paid||0);},0);var _ga2=newRegions.reduce(function(s,r){return s+(r.adj||0);},0)+newDC.reduce(function(s,r){return s+(r.adj||0);},0)+newHO.reduce(function(s,r){return s+(r.adj||0);},0);var _he={date:_tFd,savedAt:_tF,totalRecords:base.totalRecords||0,grandPaid:_gp2,grandAdj:_ga2,grandTotal:_gp2+_ga2};var _prevHist=base.history||[];var _flHist=_prevHist.filter(function(h){return h.date!==_he.date;});var _nh=[_he].concat(_flHist).slice(0,90);var mg=Object.assign({},base,{regions:newRegions,debtCompanies:newDC,headOffice:newHO,totalPortfolio:{amt:dcAmt+hoAmt+govAmt,cnt:total,outstanding:totalOS},totalDiscount:totalDiscount||base.totalDiscount||0,overRecovery:totalOverRecovery||0,overRecoveryCount:totalOverRecoveryCount||0,_updatedAt:_tF,lastUpdated:_tF,uploadDate:_tFd,complaintsDate:_tFd,uploadCount:(base.uploadCount||0)+1,history:_nh});lastSyncRef.current=_tF;window._noSyncUntil=Date.now()+60000;try{localStorage.setItem('oneic_dashboard_data',JSON.stringify(mg));}catch(e){}try{localStorage.setItem('oneic_complaints_region_map',JSON.stringify(regionMap||{}));}catch(e){}try{localStorage.setItem('oneic_complaints_branch_map',JSON.stringify(branchMap||{}));}catch(e){}try{localStorage.setItem('oneic_history',JSON.stringify(_nh));}catch(e){}sbUpsert('oneic_data',{payload:mg}).then(function(){console.log('Complaints saved size='+JSON.stringify(mg).length);}).catch(function(e){console.error('Complaints save FAILED:',e&&e.message||e);try{fetch(FIREBASE_URL+'/main/uploadCount.json',{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify(mg.uploadCount)});fetch(FIREBASE_URL+'/main/uploadDate.json',{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify(mg.uploadDate)});fetch(FIREBASE_URL+'/main/history.json',{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify(_nh)});}catch(e2){}});setHistory(function(prev){return (_nh.length>=(prev||[]).length)?_nh:prev;});return mg;
        });
        // احفظ complaints في localStorage
        try {
          localStorage.setItem('oneic_complaints_count', String(total));
          localStorage.setItem('oneic_complaints_counts', JSON.stringify({dc:dcCount,ho:hoCount,gov:govCount}));
          localStorage.setItem('oneic_complaints_amts', JSON.stringify({dc:dcAmt,ho:hoAmt,gov:govAmt}));
          localStorage.setItem('oneic_complaints_region_map', JSON.stringify(regionMap||{}));
          localStorage.setItem('oneic_complaints_branch_map', JSON.stringify(branchMap||{}));
        } catch(ex){}
        // حفظ في Firebase + منع interval
        setSuccess(true);
        setTimeout(()=>setSuccess(false), 3000);
      } else {
        // ملف bulk payment → يحدّث بيانات الداشبورد
        const p = await parseXLS(file);
        setPending({ data: p, fileName: file.name, fileSize: (file.size/1024/1024).toFixed(1) });
      }
    }
    catch(e) {
      console.error('[handleFile] Error:', e);
      setError('خطأ: ' + (e.message || 'فشل قراءة الملف'));
    }
    finally { setUploading(false); }
  }, []);

  // ── تأكيد البيانات ورفعها للسيرفر ──────────────────────────────────────
  const confirmData = useCallback(async () => {
    if (!pending) return;
    const newData = pending.data;
    const gp = newData.regions.reduce((s,r)=>s+r.paid,0)
             + newData.debtCompanies.reduce((s,r)=>s+r.paid,0)
             + newData.headOffice.reduce((s,r)=>s+Math.max(0,r.paid||0),0);
    const ga = newData.regions.reduce((s,r)=>s+r.adj,0)
             + newData.debtCompanies.reduce((s,r)=>s+r.adj,0)
             + newData.headOffice.reduce((s,r)=>s+Math.max(0,r.adj||0),0);
    // حفظ portAmt/portCnt من البيانات الحالية إذا لم تكن في newData
    const mergedCompanies = (newData.debtCompanies||[]).map(function(c) {
      var existing=(data.debtCompanies||[]).find(function(d){return d.name===c.name;});
      var DC_FIX={"Ejada":{portAmt:261235.418,portCnt:1938}};
      var fix=DC_FIX[c.name]||{};
      var finalAmt=c.portAmt>0?c.portAmt:(existing&&existing.portAmt>0?existing.portAmt:fix.portAmt||0);
      var finalCnt=c.portCnt>0?c.portCnt:(existing&&existing.portCnt>0?existing.portCnt:fix.portCnt||c.count||0);
      return Object.assign({},c,{portAmt:finalAmt,portCnt:finalCnt,osAmt:c.osAmt||(existing&&existing.osAmt)||0,principalAmt:c.principalAmt||(existing&&existing.principalAmt)||finalAmt||0});
    });
    var DC_ALWAYS=[{name:"Tahseel United",portAmt:0,principalAmt:0,portCnt:108,paid:0,adj:0,count:0},{name:"High Speed Company",portAmt:0,principalAmt:0,portCnt:35,paid:0,adj:0,count:0}];
    DC_ALWAYS.forEach(function(dc){if(!mergedCompanies.find(function(c){return c.name===dc.name;})){var pdc=(data.debtCompanies||[]).find(function(c){return c.name===dc.name;});mergedCompanies.push(Object.assign({},dc,pdc||{}));}});
    // ضمان وجود كل أقسام المكتب الرئيسي الأربعة دائماً
    const HO_REQUIRED = ["Legal - DR. Sarhaan","Documentation- Omantel","HO","Legal -Oneic"];
    const HO_PORT_DATA = {
      "Legal - DR. Sarhaan": { portAmt: 3229651.681, portCnt: 3662, principalAmt: 3301711.348 },
      "Documentation- Omantel":  { portAmt: 471756.070,  portCnt: 1099, closed:8, active:1091 },
      "HO":                   { portAmt: 0,           portCnt: 340  },
      "Non-due accounts":     { portAmt: 0,           portCnt: 340  },
      "Legal -Oneic":{portAmt:64528.164,portCnt:144,principalAmt:64528.164,closed:3,active:141},"Refund - before legal":{portAmt:0,portCnt:0,closed:0,active:0},"Refund - after legal":{portAmt:0,portCnt:0,closed:0,active:0}
    };
    const mergedHO = HO_REQUIRED.map(nm => {
      const displayNm = nm==='HO'?'Non-due accounts':nm;
      const fromNew = (newData.headOffice||[]).find(c=>c.name===displayNm||c.name===nm);
      const fromExisting = (data.headOffice||[]).find(d=>d.name===displayNm||d.name===nm);
      const portInfo = HO_PORT_DATA[nm]||{};
      if (fromNew) return { ...fromNew, portAmt: fromNew.portAmt||portInfo.portAmt||0, portCnt: fromNew.portCnt||portInfo.portCnt||0 };
      if (fromExisting) return { ...fromExisting, portAmt: fromExisting.portAmt||portInfo.portAmt||0, portCnt: fromExisting.portCnt||portInfo.portCnt||0 };
      return { name:nm, paid:0, adj:0, count:0, portAmt:portInfo.portAmt||0, portCnt:portInfo.portCnt||0 };
    });
    const _ts = new Date().toISOString();
    const dataToSave = {
      ...newData,
      debtCompanies: mergedCompanies,
      headOffice: mergedHO,
      totalPortfolio: newData.totalPortfolio || data.totalPortfolio || { amt: 0, cnt: 0, outstanding: 0 },
      totalCollection: { paid: gp, adj: ga },
      grandPaid: gp,
      grandAdj: ga,
      lastUpdated: _ts,
      _updatedAt: _ts,
      lastUpdatedDate: _ts.split('T')[0],
      complaintsBranchMap: complaintsBranchMap||{},
      complaintsRegionMap: complaintsRegionMap||{},
      complaintsPrincipal: complaintsPrincipal||{},
      complaintsPaidState: complaintsPaidState||{},
      complaintsAdjState: complaintsAdjState||{}
    };

    // ── رفع لـ JSONbin + localStorage ───────────────────────────────────
    setUploading(true);
    try {
      try{localStorage.setItem('oneic_dashboard_data',JSON.stringify(dataToSave));}catch(e){}
      await sbUpsert('oneic_data', { payload: dataToSave });
      lastSyncRef.current = _ts;
      console.log('✅ Saved to Firebase');
    } catch(e) {
      console.warn('JSONbin save failed:', e);
    }
    // حفظ احتياطي محلي دائماً
    try {
      localStorage.setItem('oneic_dashboard_data', JSON.stringify(dataToSave));
      localStorage.setItem('oneic_last_update', new Date().toISOString());
    } catch(e) {}

    // ── حفظ في السجل التاريخي ────────────────────────────────────────────
    const historyEntry = {
      date: dataToSave.uploadDate || new Date().toISOString().split('T')[0],
      savedAt: new Date().toISOString(),
      totalRecords: dataToSave.totalRecords || 0,
      grandPaid: dataToSave.grandPaid || 0,
      grandAdj: dataToSave.grandAdj || 0,
      grandTotal: (dataToSave.grandPaid||0) + (dataToSave.grandAdj||0),
      regions: dataToSave.regions?.map(r=>({
        nameAr: r.nameAr||r.label||'', paid: r.paid, adj: r.adj
      })) || [],
      debtCompanies: dataToSave.debtCompanies?.map(c=>({name:c.name,paid:c.paid,adj:c.adj})) || [],
      headOffice: dataToSave.headOffice?.map(c=>({name:c.name,paid:c.paid,adj:c.adj})) || []
    };
    setHistory(prev => {
      // استبدال نفس التاريخ إذا موجود، أو إضافة جديد
      const filtered = prev.filter(h => h.date !== historyEntry.date);
      const newHistory = [historyEntry, ...filtered].slice(0, 90); // آخر 90 يوم
      try { localStorage.setItem('oneic_history', JSON.stringify(newHistory)); } catch(e) {}
      // رفع التاريخ لـ JSONbin أيضاً
      try {
        const fullData = { ...dataToSave, history: newHistory };
        sbUpsert('oneic_data', { payload: fullData });
      } catch(e) {}
      try {
        fetch('https://oneic-dashboard-default-rtdb.firebaseio.com/history.json', {
          method: 'PUT', headers: {'Content-Type':'application/json'},
          body: JSON.stringify({entries: newHistory, _updatedAt: new Date().toISOString()})
        });
      } catch(e) {}
      return newHistory;
    });

    setUploading(false);

    setComplaintsRegionMap({});
    setData(dataToSave);
    setPending(null);
    setSuccess(true);
    setTimeout(()=>setSuccess(false), 5000);
  }, [pending]);

  // ── رفض البيانات ──
  const rejectData = useCallback(() => {
    setPending(null);
    setError("تم إلغاء الرفع — البيانات القديمة لا تزال نشطة");
    setTimeout(()=>setError(null), 4000);
  }, []);

  const gPd = data.regions.reduce((s,r)=>s+r.paid,0);
  const gAd = data.regions.reduce((s,r)=>s+r.adj,0);
  const gCnt = data.regions.reduce((s,r)=>s+(r.count||0),0);
  const gPortAmt = data.regions.reduce((s,r)=>s+(r.principalAmt||r.portAmt||0),0);
  const gPortCnt = data.regions.reduce((s,r)=>s+(r.portCnt||0),0);
  const dPd = data.debtCompanies.reduce((s,r)=>s+r.paid,0);
  const dAd = data.debtCompanies.reduce((s,r)=>s+r.adj,0);
  const dCnt = data.debtCompanies.reduce((s,r)=>s+(r.count||0),0);
  const dPortAmt=(()=>{var seen={};return(data.debtCompanies||[]).reduce(function(s,r){var nm=(r.name||"").toLowerCase().trim();if(seen[nm])return s;seen[nm]=1;return s+(r.principalAmt||r.portAmt||0);},0);})();
  const dPortCnt = data.debtCompanies.reduce((s,r)=>s+(r.portCnt||0),0);
  const hPd = data.headOffice.reduce((s,r)=>s+Math.max(0,r.paid||0),0);
  const hAd = data.headOffice.reduce((s,r)=>s+Math.max(0,r.adj||0),0);
  const hCnt = data.headOffice.reduce((s,r)=>s+(r.count||0),0);
  const hPortAmt = data.headOffice.reduce((s,r)=>s+Math.max(0,r.principalAmt||r.portAmt||0),0);
  const hPortCnt = data.headOffice.reduce((s,r)=>s+(r.portCnt||0),0);
  const totalPaid = gPd+dPd+hPd;
  const totalAdj  = gAd+dAd+hAd;
  const totalPort = (data.totalPortfolio&&data.totalPortfolio.amt) ? data.totalPortfolio.amt : 9414256.834;
  const ONEIC_DISCOUNT = data.totalDiscount||0;
  const gTotal = totalPaid+totalAdj;
  const gRem = (data.totalPortfolio&&data.totalPortfolio.outstanding!=null) ? data.totalPortfolio.outstanding : (totalPort - gTotal - ONEIC_DISCOUNT);
  const p = v => gTotal>0 ? ((v/gTotal)*100).toFixed(1) : "0";

  // ── Smart Notifications ───────────────────────────────────────────────────
  const hoPrincipalCurrent = (function(){var _f=(data.headOffice||[]).find(function(x){return x.name==='Legal - DR. Sarhaan';});return _f?(_f.principalAmt||0):0;})();
  const currentBestDay = (() => {
    try { const s=localStorage.getItem('oneic_bulk_data'); if(s){const b=JSON.parse(s); if(b?.daily?.length) return Math.max(...b.daily.map(d=>d.paid+(d.adj||0)));} } catch(e){} return 0;
  })();
  const { notifications, celebration, confettiActive, addNotification, setNotifications } =
    useSmartNotifications(gTotal, hoPrincipalCurrent, 0, currentBestDay);

  const pad = isMobile ? "12px" : isTablet ? "16px" : "20px 24px";

  // ══ شاشة كلمة السر ══
  if (!unlocked) {
    return (
      <div style={{
        height:"100vh", display:"flex", flexDirection:"column",
        alignItems:"center", justifyContent:"center",
        background:"linear-gradient(135deg,#1e3a5f 0%,#2d5a8e 50%,#1e3a5f 100%)",
        fontFamily:"'Cairo','Tajawal',sans-serif", direction:"rtl"
      }}>
        {/* بطاقة الدخول */}
        <div style={{
          background:"#fff", borderRadius:24, padding:"40px 36px",
          boxShadow:"0 20px 60px rgba(0,0,0,0.3)",
          width:"100%", maxWidth:400, textAlign:"center"
        }}>
          {/* شعار */}
          <img src={LOGO} alt="ONEIC" style={{height:64,objectFit:"contain",marginBottom:16}}/>
          <div style={{fontSize:22,fontWeight:900,color:"#1e3a5f",marginBottom:4}}>{t("محفظة عُمانتل 1",lang)}</div>
          <div style={{fontSize:13,color:"#888",fontWeight:600,marginBottom:28}}>
            Omantel Debt Collection Dashboard
          </div>

          {/* حقل كلمة السر */}
          <div style={{marginBottom:16,textAlign:"right"}}>
            <div style={{fontSize:13,fontWeight:800,color:"#444",marginBottom:8}}>{t("🔒 كلمة المرور",lang)}</div>
            <input
              type="password"
              value={pwInput}
              onChange={e => { setPwInput(e.target.value); setPwError(false); }}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  if (pwInput === 'Welcome@93360229##') { setUnlocked(true); }
                  else { setPwError(true); setPwInput(''); }
                }
              }}
              placeholder="أدخل كلمة المرور..."
              style={{
                width:"100%", padding:"12px 16px",
                border: pwError ? "2px solid #ef4444" : "2px solid #e5e7eb",
                borderRadius:12, fontSize:15, fontFamily:"'Cairo',sans-serif",
                outline:"none", boxSizing:"border-box",
                background: pwError ? "#fef2f2" : "#f9fafb",
                textAlign:"right", direction:"rtl",
                transition:"border 0.2s"
              }}
            />
            {pwError && (
              <div style={{color:"#ef4444",fontSize:12,fontWeight:700,marginTop:6,textAlign:"right"}}>
                ❌ كلمة المرور غير صحيحة، حاول مرة أخرى
              </div>
            )}
          </div>

          {/* زر الدخول */}
          <button
            onClick={() => {
              if (pwInput === 'Welcome@93360229##') { setUnlocked(true); }
              else { setPwError(true); setPwInput(''); }
            }}
            style={{
              width:"100%", padding:"13px",
              background:"linear-gradient(120deg,#1e3a5f,#2d5a8e)",
              color:"#fff", border:"none", borderRadius:12,
              fontSize:15, fontWeight:900, cursor:"pointer",
              fontFamily:"'Cairo',sans-serif",
              boxShadow:"0 4px 15px rgba(30,58,95,0.4)"
            }}
          >
            🔓 دخول
          </button>

          <div style={{marginTop:20,fontSize:11,color:"#bbb",fontWeight:600}}>
            ONEIC — نظام إدارة تحصيل الديون © 2026
          </div>
        </div>
      </div>
    );
  }

  return (
    <LangContext.Provider value={langCtx}>
    <div style={{
      height:"100vh", display:"flex", flexDirection:"column",
      background:"#f5f0eb",
      fontFamily:"'Cairo','Tajawal','Segoe UI',sans-serif",
      direction:"rtl", color:"#111", overflow:"hidden"
    }}>
      <ConfettiRain active={confettiActive}/>
      <CelebrationModal celebration={celebration}/>
      <NotificationStack notifications={notifications} onDismiss={id=>setNotifications(prev=>prev.filter(n=>n.id!==id))}/>
      {showHistory && <HistoryModal history={history} onClose={()=>setShowHistory(false)} small={small}/>}
      <VerifyModal pending={pending} onConfirm={confirmData} onReject={rejectData}/>

      {/* ══ نافذة كلمة سر الرفع ══ */}
      {showUploadAuth && (
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.7)",display:"flex",
          alignItems:"center",justifyContent:"center",zIndex:9999,padding:16,direction:"rtl"}}>
          <div style={{background:"#fff",borderRadius:20,width:"100%",maxWidth:380,
            padding:"32px 28px",boxShadow:"0 20px 60px rgba(0,0,0,0.4)",textAlign:"center"}}>
            <div style={{fontSize:40,marginBottom:12}}>🔐</div>
            <div style={{fontSize:18,fontWeight:900,color:"#1e3a5f",marginBottom:6}}>{t("تأكيد الصلاحية",lang)}</div>
            <div style={{fontSize:13,color:"#888",marginBottom:20}}>
              أدخل كلمة المرور الخاصة برفع الملفات
            </div>
            <input
              type="password"
              value={uploadAuthInput}
              autoFocus
              onChange={e => { setUploadAuthInput(e.target.value); setUploadAuthError(false); }}
              onKeyDown={e => e.key === 'Enter' && confirmUploadAuth()}
              placeholder="كلمة المرور..."
              style={{
                width:"100%", padding:"12px 16px",
                border: uploadAuthError ? "2px solid #ef4444" : "2px solid #e5e7eb",
                borderRadius:12, fontSize:15, fontFamily:"'Cairo',sans-serif",
                outline:"none", boxSizing:"border-box",
                background: uploadAuthError ? "#fef2f2" : "#f9fafb",
                textAlign:"right", direction:"rtl", marginBottom:8
              }}
            />
            {uploadAuthError && (
              <div style={{color:"#ef4444",fontSize:12,fontWeight:700,marginBottom:12}}>
                ❌ كلمة المرور غير صحيحة
              </div>
            )}
            <div style={{display:"flex",gap:10,marginTop:8}}>
              <button onClick={() => setShowUploadAuth(false)}
                style={{flex:1,padding:"11px",background:"#f5f5f5",color:"#555",
                  border:"none",borderRadius:12,fontSize:14,fontWeight:800,cursor:"pointer",
                  fontFamily:"'Cairo',sans-serif"}}>
                إلغاء
              </button>
              <button onClick={confirmUploadAuth}
                style={{flex:2,padding:"11px",
                  background:"linear-gradient(120deg,#1e3a5f,#2d5a8e)",
                  color:"#fff",border:"none",borderRadius:12,fontSize:14,
                  fontWeight:900,cursor:"pointer",fontFamily:"'Cairo',sans-serif"}}>
                🔓 تأكيد
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── نافذة إعدادات المزامنة ── */}
      {showSettings && (
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.6)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:9998,padding:16,direction:"rtl"}}>
          <div style={{background:"#fff",borderRadius:20,width:"100%",maxWidth:480,padding:28,boxShadow:"0 20px 60px rgba(0,0,0,0.3)"}}>
            <div style={{fontSize:18,fontWeight:900,color:"#1e3a5f",marginBottom:6}}>{t("⚙️ إعدادات المزامنة",lang)}</div>
            <div style={{fontSize:12,color:"#888",marginBottom:20}}>
              البيانات محفوظة في Supabase — تظهر على جميع الأجهزة تلقائياً ✅
            </div>
            <div style={{marginBottom:14}}>
              <div style={{fontSize:13,fontWeight:700,color:"#333",marginBottom:6}}>Bin ID</div>
              <input
                value={binId}
                onChange={e=>setBinId(e.target.value)}
                placeholder="مثال: 64abc123..."
                style={{width:"100%",padding:"10px 14px",border:"1.5px solid #e5e7eb",borderRadius:10,fontSize:13,fontFamily:"monospace",direction:"ltr"}}
              />
            </div>
            <div style={{marginBottom:20}}>
              <div style={{fontSize:13,fontWeight:700,color:"#333",marginBottom:6}}>Master API Key</div>
              <input
                value={apiKey}
                onChange={e=>setApiKey(e.target.value)}
                placeholder="$2b$10$..."
                type="password"
                style={{width:"100%",padding:"10px 14px",border:"1.5px solid #e5e7eb",borderRadius:10,fontSize:13,fontFamily:"monospace",direction:"ltr"}}
              />
            </div>
            <div style={{display:"flex",gap:10}}>
              <button
                onClick={() => {
                  try {
                    localStorage.setItem('oneic_bin_id', binId);
                    localStorage.setItem('oneic_api_key', apiKey);
                  } catch(e) {}
                  setShowSettings(false);
                }}
                style={{flex:1,background:"#16a34a",color:"#fff",border:"none",borderRadius:12,padding:"12px",fontSize:14,fontWeight:900,cursor:"pointer",fontFamily:"'Cairo',sans-serif"}}
              >{t("✅ حفظ الإعدادات",lang)}</button>
              <button
                onClick={() => setShowSettings(false)}
                style={{flex:1,background:"#f5f0eb",color:"#555",border:"1px solid #ddd",borderRadius:12,padding:"12px",fontSize:14,fontWeight:700,cursor:"pointer",fontFamily:"'Cairo',sans-serif"}}
              >{t("إلغاء",lang)}</button>
            </div>
          </div>
        </div>
      )}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800;900&family=IBM+Plex+Mono:wght@400;600;700&display=swap');
        * { box-sizing:border-box; margin:0; padding:0; }
        ::-webkit-scrollbar { width:5px; }
        ::-webkit-scrollbar-thumb { background:#e8c0a8; border-radius:3px; }

        @media print {
          @page {
            size: A4 portrait;
            margin: 12mm 10mm;
          }

          /* ── إعدادات أساسية ── */
          *, *::before, *::after {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            box-sizing: border-box !important;
          }

          html, body {
            width: 190mm !important;
            font-size: 9pt !important;
            background: #fff !important;
            margin: 0 !important;
            padding: 0 !important;
          }

          /* ── إخفاء عناصر التحكم ── */
          button,
          input,
          #clock-section,
          #main-header { display: none !important; }

          /* ── إصلاح overflow ── */
          #root, #root \x3e div, #root \x3e div \x3e div {
            height: auto !important;
            min-height: 0 !important;
            overflow: visible !important;
            width: 190mm !important;
          }

          /* ── إظهار print header ── */
          #print-header {
            display: flex !important;
            justify-content: space-between !important;
            align-items: center !important;
            padding-bottom: 3mm !important;
            margin-bottom: 3mm !important;
            border-bottom: 2px solid #e85d20 !important;
          }

          /* ── البانر ── */
          #print-banner {
            padding: 4mm 5mm !important;
            margin-bottom: 4mm !important;
            border-radius: 6px !important;
          }
          #print-banner * { font-size: inherit !important; }
          #print-banner span:first-child { font-size: 22pt !important; font-weight: 900 !important; }

          /* ── بطاقات الملخص الثلاث ── */
          #print-summary {
            display: grid !important;
            grid-template-columns: 62mm 62mm 62mm !important;
            gap: 2mm !important;
            margin-bottom: 4mm !important;
            page-break-inside: avoid !important;
            width: 190mm !important;
          }
          #print-summary \x3e div {
            width: 62mm !important;
            overflow: hidden !important;
            border-radius: 6px !important;
          }
          #print-summary \x3e div \x3e div:first-child {
            padding: 3mm 4mm !important;
          }
          #print-summary \x3e div \x3e div:last-child {
            padding: 3mm 4mm !important;
          }
          #print-summary .amount-cell {
            padding: 2mm 3mm !important;
          }
          #print-summary .amount-cell div:first-child { font-size: 8pt !important; }
          #print-summary .amount-cell div:last-child  { font-size: 11pt !important; }

          /* ── قسم المحافظات ── */
          #print-regions {
            margin-bottom: 4mm !important;
            width: 190mm !important;
            page-break-inside: avoid !important;
          }
          #print-regions \x3e div:first-child {
            padding: 3mm 4mm !important;
            border-radius: 6px 6px 0 0 !important;
          }
          /* كل صف محافظة */
          #print-regions .region-card {
            margin-bottom: 2mm !important;
            border-radius: 6px !important;
            overflow: hidden !important;
            page-break-inside: avoid !important;
          }
          #print-regions .region-card \x3e div:first-child {
            padding: 2mm 3mm !important;
            flex-wrap: nowrap !important;
          }
          /* الأرقام في صف المحافظة — عرض موحّد */
          #print-regions .region-amounts {
            display: flex !important;
            flex-wrap: nowrap !important;
          }
          #print-regions .region-amounts \x3e div {
            width: 42mm !important;
            padding: 2mm 3mm !important;
          }
          #print-regions .region-amounts div div:first-child { font-size: 7pt !important; }
          #print-regions .region-amounts div div:last-child  { font-size: 11pt !important; }
          /* زر المحصّلون — إخفاء */
          #print-regions .toggle-btn { display: none !important; }
          /* اسم المحافظة */
          #print-regions .region-name { font-size: 11pt !important; }
          #print-regions .region-name-en { font-size: 8pt !important; }

          /* ── DC + HO ── */
          #print-dc-ho {
            display: grid !important;
            grid-template-columns: 93mm 93mm !important;
            gap: 4mm !important;
            width: 190mm !important;
            page-break-before: auto !important;
            page-break-inside: avoid !important;
          }
          #print-dc-ho \x3e div {
            width: 93mm !important;
            overflow: hidden !important;
            border-radius: 6px !important;
          }
          /* هيدر DC/HO */
          #print-dc-ho \x3e div \x3e div:first-child {
            padding: 3mm 4mm !important;
          }
          /* بطاقات الشركات */
          #print-dc-ho .entity-card {
            padding: 2mm 3mm !important;
            margin-bottom: 2mm !important;
            border-radius: 4px !important;
          }
          #print-dc-ho .entity-card .entity-name { font-size: 9pt !important; }
          #print-dc-ho .entity-card .amount-row \x3e div \x3e div:first-child { font-size: 7pt !important; }
          #print-dc-ho .entity-card .amount-row \x3e div \x3e div:last-child  { font-size: 10pt !important; }

          /* ── منع قطع الأرقام ── */
          .amount-cell, .entity-card, #print-summary \x3e div,
          #print-regions .region-card { overflow: hidden !important; }

          /* ── فوتر ── */
          #print-footer {
            display: block !important;
            text-align: center !important;
            font-size: 8pt !important;
            color: #888 !important;
            margin-top: 4mm !important;
            padding-top: 2mm !important;
            border-top: 1px solid #ddd !important;
          }
        }
      `}</style>


      {/* ── نافذة إعدادات المزامنة ── */}
      {showSettings && (
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.6)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:9998,padding:16,direction:"rtl"}}>
          <div style={{background:"#fff",borderRadius:20,width:"100%",maxWidth:480,padding:28,boxShadow:"0 20px 60px rgba(0,0,0,0.3)"}}>
            <div style={{fontSize:18,fontWeight:900,color:"#1e3a5f",marginBottom:6}}>{t("⚙️ إعدادات المزامنة",lang)}</div>
            <div style={{fontSize:12,color:"#888",marginBottom:20}}>
              البيانات محفوظة في Supabase — تظهر على جميع الأجهزة تلقائياً ✅
            </div>
            <div style={{marginBottom:14}}>
              <div style={{fontSize:13,fontWeight:700,color:"#333",marginBottom:6}}>Bin ID</div>
              <input
                value={binId}
                onChange={e=>setBinId(e.target.value)}
                placeholder="مثال: 64abc123..."
                style={{width:"100%",padding:"10px 14px",border:"1.5px solid #e5e7eb",borderRadius:10,fontSize:13,fontFamily:"monospace",direction:"ltr"}}
              />
            </div>
            <div style={{marginBottom:20}}>
              <div style={{fontSize:13,fontWeight:700,color:"#333",marginBottom:6}}>Master API Key</div>
              <input
                value={apiKey}
                onChange={e=>setApiKey(e.target.value)}
                placeholder="$2b$10$..."
                type="password"
                style={{width:"100%",padding:"10px 14px",border:"1.5px solid #e5e7eb",borderRadius:10,fontSize:13,fontFamily:"monospace",direction:"ltr"}}
              />
            </div>
            <div style={{display:"flex",gap:10}}>
              <button
                onClick={() => {
                  try {
                    localStorage.setItem('oneic_bin_id', binId);
                    localStorage.setItem('oneic_api_key', apiKey);
                  } catch(e) {}
                  setShowSettings(false);
                }}
                style={{flex:1,background:"#16a34a",color:"#fff",border:"none",borderRadius:12,padding:"12px",fontSize:14,fontWeight:900,cursor:"pointer",fontFamily:"'Cairo',sans-serif"}}
              >{t("✅ حفظ الإعدادات",lang)}</button>
              <button
                onClick={() => setShowSettings(false)}
                style={{flex:1,background:"#f5f0eb",color:"#555",border:"1px solid #ddd",borderRadius:12,padding:"12px",fontSize:14,fontWeight:700,cursor:"pointer",fontFamily:"'Cairo',sans-serif"}}
              >{t("إلغاء",lang)}</button>
            </div>
          </div>
        </div>
      )}
      <style>{`
          @media print {
            .print-only { display: flex !important; justifyContent: space-between; alignItems: center; padding: 6px 12px; borderBottom: 3px solid #e85d20; marginBottom: 8px; }
          }
        `}</style>

      {/* ══ PRINT HEADER — يظهر فقط عند الطباعة ══ */}
      <div id="print-header" style={{display:"none",justifyContent:"space-between",alignItems:"center",padding:"3mm 0",borderBottom:"2px solid #e85d20",marginBottom:"3mm"}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <img src={LOGO} alt="ONEIC" style={{height:40,objectFit:"contain"}}/>
          <div>
            <div style={{fontSize:14,fontWeight:900,color:"#e85d20"}}>{t(t("لوحة تحكم إدارة تحصيل الديون",lang),lang)}</div>
            <div style={{fontSize:9,color:"#555"}}>Debt Collection Management Dashboard · تاريخ التقرير: {data.uploadDate} · {data.totalRecords?.toLocaleString()} سجل</div>
          </div>
        </div>
        <div style={{textAlign:"right",fontSize:9,color:"#555"}}>
          <div>{lang==='en'?'Print Date:':'تاريخ الطباعة:'} {new Date().toLocaleDateString(lang==='en'?'en-GB':'ar-OM')}</div>
          <div style={{fontWeight:700,color:"#e85d20",fontSize:11}}>ONEIC © 2026</div>
        </div>
      </div>

      {/* ══ HEADER ══ */}
      <div id="main-header" style={{
        background:"#fff", borderBottom:"3px solid #e85d20",
        padding: isMobile ? "10px 14px" : "12px 24px",
        display:"flex", justifyContent:"space-between", alignItems:"center",
        gap:12, boxShadow:"0 3px 16px rgba(232,93,32,0.1)",
        position:"sticky", top:0, zIndex:100
      }}>
        <div style={{ display:"flex", alignItems:"center", gap: isMobile?10:16 }}>
          <img src={LOGO} alt="ONEIC" style={{ height: isMobile?36:48, objectFit:"contain" }} />
          {!isMobile && <div style={{ width:2, height:48, background:"#ffe4d4", borderRadius:2 }} />}
          <div>
            <div style={{ fontSize: isMobile?16:isTablet?20:26, fontWeight:900, color:"#e85d20", lineHeight:1.1 }}>
              {isMobile ? t("إدارة الديون",lang) : t("لوحة تحكم إدارة تحصيل الديون",lang)}
            </div>
            {!isMobile && <div style={{ fontSize:12, color:"#e85d20", fontWeight:700, marginTop:3 }}>
              Omantel Debt Collection Management Dashboard
            </div>}
            {!isMobile && <div style={{ fontSize:10, color:"#16a34a", fontWeight:700, marginTop:2, display:"flex", alignItems:"center", gap:4 }}>
              <span>{"💾"}</span>
              <span>{(() => {
                try {
                  const t = data._updatedAt || data.lastUpdated;
                  if (t) {
                    const d = new Date(t);
                    return (lang==='en'?'Saved to server':'محفوظ على السيرفر')+' · '+d.toLocaleDateString(lang==='en'?'en-GB':'ar-OM')+' '+d.toLocaleTimeString(lang==='en'?'en-GB':'ar-OM',{hour:'2-digit',minute:'2-digit'});
                  }
                } catch(e) {}
                return lang==='en'?'Connected to server':'متصل بالسيرفر';
              })()}</span>
            </div>}
          </div>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap: isMobile?10:20 }}>
          <UploadBtn onFile={handleFile} onAuth={requireUploadAuth} uploading={uploading} success={success} error={error} small={isMobile} />

          <div style={{display:"flex",flexDirection:"column",gap:5,alignItems:"stretch"}}>
            {/* مؤشر المزامنة */}
            <div style={{fontSize:10,color:syncing?"#fbbf24":"#4ade80",fontWeight:700,textAlign:"center",
              background:"rgba(255,255,255,0.1)",borderRadius:6,padding:"2px 8px",display:"flex",alignItems:"center",gap:4,justifyContent:"center"}}>
              <span style={{cursor:'pointer'}} onClick={forceRefresh} title="اضغط للتحديث الفوري">
              {syncing
                ? <><span>🔄</span> جاري المزامنة...</>
                : lastSync
                  ? <>🟢 {lastSync.toLocaleTimeString(lang==='en'?'en-GB':'ar-OM',{hour:'2-digit',minute:'2-digit'})} ↻</>
                  : <>{t("⏳ اضغط للتحديث",lang)}</>
              }
            </span>
            </div>
            <button onClick={() => setShowHistory(s=>!s)} style={{background:"#1e3a5f",color:"#fff",border:"none",borderRadius:10,padding:"8px 14px",fontSize:13,fontWeight:800,cursor:"pointer",fontFamily:"'Cairo',sans-serif",display:"flex",alignItems:"center",gap:5}}>
              📁 {history.length > 0 ? `${t('عدد الملفات',lang)} (${history.length})` : t("عدد الملفات",lang)}
            </button>
            <button onClick={() => { if(showBulkReport) setShowBulkReport(false); else requireUploadAuth(()=>setShowBulkReport(true)); }} style={{background:showBulkReport?"#e85d20":"#2d5a8e",color:"#fff",border:"none",borderRadius:10,padding:"5px 14px",fontSize:12,fontWeight:800,cursor:"pointer",fontFamily:"'Cairo',sans-serif",display:"flex",alignItems:"center",justifyContent:"center",gap:4}}>
              💳 Bulk Payment
            </button>
          </div>
          
          <button
            onClick={() => handlePrint(data, lang)}
            style={{
              display:"flex", alignItems:"center", gap:6,
              background:"#1e3a5f", color:"#fff",
              border:"none", borderRadius:12,
              padding: isMobile ? "8px 14px" : "10px 20px",
              fontSize: isMobile ? 12 : 14,
              fontWeight:800, cursor:"pointer",
              fontFamily:"'Cairo',sans-serif",
              boxShadow:"0 2px 8px rgba(30,58,95,0.3)",
              whiteSpace:"nowrap", flexShrink:0
            }}
          >
            🖨️ {isMobile ? "PDF" : t("طباعة / PDF",lang)}
          </button>

          {/* زر تغيير اللغة */}
          <button
            onClick={() => {
              const next = lang==='ar' ? 'en' : 'ar';
              setLang(next);
              try { localStorage.setItem('oneic_lang', next); } catch(e){}
              document.documentElement.dir = next==='ar' ? 'rtl' : 'ltr';
              document.documentElement.lang = next;
            }}
            style={{
              display:"flex", alignItems:"center", gap:6,
              background: lang==='ar' ? "#1a7a6b" : "#6c3fa0",
              color:"#fff", border:"none", borderRadius:12,
              padding: isMobile ? "8px 12px" : "10px 18px",
              fontSize: isMobile ? 12 : 13,
              fontWeight:800, cursor:"pointer",
              fontFamily:"'Cairo',sans-serif",
              boxShadow:"0 2px 8px rgba(0,0,0,0.2)",
              whiteSpace:"nowrap", flexShrink:0
            }}
            title={lang==='ar' ? "Switch to English" : "التبديل للعربية"}
          >
            {lang==='ar' ? "🌐 English" : "🌐 عربي"}
          </button>

          <div id="clock-section"><Clock small={isMobile} /></div>
        </div>
      </div>



      {/* ══ BODY ══ */}
      <div style={{ padding:pad, flex:1, overflowY:"auto", overflowX:"hidden" }}>

        {showBulkReport && <BulkPaymentSection bulk={bulkData} small={small} onBulkUpdate={function(d){setBulkDataMain(d);try{localStorage.setItem('oneic_bulk_data',JSON.stringify(d));}catch(e){}}} requireUploadAuth={requireUploadAuth}/>}

        
      {/* ══ Section 1 ══ */}
      <div style={{background:"#fff",borderRadius:18,marginBottom:16,boxShadow:"0 4px 24px rgba(30,58,95,0.10)",border:"1.5px solid #e8f0fe",overflow:"hidden"}}>
        <div style={{background:"linear-gradient(120deg,#1e3a5f 0%,#2d5a8e 60%,#1e3a5f 100%)",padding:small?"14px 16px":"18px 28px",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12}}>
          <div style={{display:"flex",alignItems:"center",gap:14}}>
            <img src={LOGO} alt="ONEIC" style={{height:small?40:54,objectFit:"contain",filter:"brightness(0) invert(1)",opacity:0.95}}/>
            <div>
              <div style={{fontSize:small?18:26,fontWeight:900,color:"#fff",lineHeight:1.1}}>{t("محفظة عُمانتل 1",lang)}</div>
              <div style={{fontSize:small?11:13,color:"rgba(255,255,255,0.65)",fontWeight:600,marginTop:3}}>Omantel Debt Collection Portfolio</div>
            </div>
          </div>
          {data.uploadDate && (
            <div style={{textAlign:"left",direction:"ltr"}}>
              <div style={{fontSize:small?10:11,color:"rgba(255,255,255,0.55)",fontWeight:600,marginBottom:2}}>{t("آخر تحديث للملف",lang)}</div>
              <div style={{fontSize:small?14:17,color:"rgba(255,255,255,0.9)",fontWeight:800,letterSpacing:1}}>
                {(() => { const p=data.uploadDate.split('-'); return p.length===3?`${p[2]}-${p[1]}-${p[0]}`:data.uploadDate; })()}
              </div>
            </div>
          )}
        </div>
        <div style={{display:"grid",gridTemplateColumns:small?"1fr":"1fr 1fr",gap:0}}>
          <div style={{padding:small?"16px":"20px 28px",borderLeft:small?"none":"1.5px solid #f0ece8",display:"flex",flexDirection:"column",gap:10}}>
            <div><span style={{background:"#1e3a5f",color:"#fff",borderRadius:8,padding:"3px 14px",fontSize:small?11:13,fontWeight:900}}>{t("📋 المحفظة",lang)}</span></div>
            <div style={{background:"#f8f9fc",borderRadius:12,padding:"14px 18px",display:"flex",justifyContent:"space-between",alignItems:"center",border:"1px solid #e8f0fe"}}>
              <div style={{fontSize:small?13:15,color:"#555",fontWeight:700}}>{t("عدد الحسابات",lang)}</div>
              <div style={{fontSize:small?20:26,fontWeight:900,color:"#1e3a5f",direction:"ltr",textAlign:"right"}}>{(data.totalPortfolio?.cnt||47963).toLocaleString()} <span style={{fontSize:small?11:13,color:"#888",fontWeight:600}}>حساب</span></div>
            </div>
            <div style={{background:"#fff3ee",borderRadius:12,padding:"14px 18px",display:"flex",justifyContent:"space-between",alignItems:"center",border:"1px solid #ffe4d4"}}>
              <div style={{fontSize:small?13:15,color:"#555",fontWeight:700}}>{t("قيمة المحفظة",lang)}</div>
              <div style={{fontSize:small?20:26,fontWeight:900,color:"#e85d20",direction:"ltr",textAlign:"right"}}>{omr(data.totalPortfolio?.amt||9414256.834)} <span style={{fontSize:small?11:13,color:"#888",fontWeight:600}}>OMR</span></div>
            </div>
            <div style={{display:"flex",justifyContent:"center",paddingTop:4}}>
              {(() => {
                const _s1p=gPd+dPd+hPd, _s1a=gAd+dAd+hAd, _s1m=data.totalPortfolio?.amt||9414256.834;
                const pct=_s1m>0?Math.min(100,((_s1p+_s1a)/_s1m*100)):0;
                const pctDisplay=pct.toFixed(1)+'%';
                const r=52,cx=60,cy=60,circ=2*Math.PI*r,offset=circ-(pct/100)*circ;
                return (
                  <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
                    <svg width={120} height={120} viewBox="0 0 120 120">
                      <defs><linearGradient id="pgGrad" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#4ade80"/><stop offset="100%" stopColor="#16a34a"/></linearGradient></defs>
                      <circle cx={cx} cy={cy} r={r} fill="#f0fdf4" stroke="#dcfce7" strokeWidth="1"/>
                      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#e8f5e9" strokeWidth="12"/>
                      <circle cx={cx} cy={cy} r={r} fill="none" stroke="url(#pgGrad)" strokeWidth="12" strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round" transform={`rotate(-90 ${cx} ${cy})`}/>
                      <text x={cx} y={cy-6} textAnchor="middle" fontSize="20" fontWeight="900" fill="#1e3a5f" fontFamily="Cairo">{pctDisplay}</text>
                      <text x={cx} y={cy+14} textAnchor="middle" fontSize="11" fontWeight="700" fill="#16a34a" fontFamily="Cairo">{t("إنجاز",lang)}</text>
                    </svg>
                    <div style={{fontSize:11,color:"#888",fontWeight:700}}>{t("نسبة الإنجاز الكلي",lang)}</div>
                  </div>
                );
              })()}
            </div>
          </div>
          <div style={{padding:small?"16px":"20px 28px"}}>
            <div style={{marginBottom:12}}><span style={{background:"#16a34a",color:"#fff",borderRadius:8,padding:"3px 14px",fontSize:small?11:13,fontWeight:900}}>{t("💰 التحصيل",lang)}</span></div>
            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              {(() => {
                const _gPd = (data.regions||[]).reduce((s,r)=>s+r.paid,0);
                const _dPd = (data.debtCompanies||[]).reduce((s,r)=>s+r.paid,0);
                const _hPd = (data.headOffice||[]).reduce((s,r)=>s+Math.max(0,r.paid||0),0);
                const _gAd = (data.regions||[]).reduce((s,r)=>s+r.adj,0);
                const _dAd = (data.debtCompanies||[]).reduce((s,r)=>s+r.adj,0);
                const _hAd = (data.headOffice||[]).reduce((s,r)=>s+Math.max(0,r.adj||0),0);
                const s1Paid = _gPd+_dPd+_hPd;
                const s1Adj  = _gAd+_dAd+_hAd;
                const s1Port = (data.totalPortfolio&&data.totalPortfolio.amt) ? data.totalPortfolio.amt : 9414256.834;
                const s1OverRec = data.overRecovery||0;
                const s1Tot  = s1Paid + s1Adj;
                const s1Rem  = (data.totalPortfolio&&data.totalPortfolio.outstanding!=null) ? data.totalPortfolio.outstanding : (s1Port - s1Tot - ONEIC_DISCOUNT);
                return [
                  [t("المدفوع",lang),            s1Paid,   "#16a34a"],
                  [t("تسويات عُمانتل",lang),     s1Adj,    "#d97706"],
                  [t("دفعات زائدة (Over Recovery)",lang), s1OverRec, "#0891b2"],
                  [t("خصومات أونك",lang),        ONEIC_DISCOUNT, "#7c3aed"],
                  [t("الإجمالي",lang),           s1Tot,    "#1e3a5f"],
                  [t("المتبقي من المحفظة",lang), s1Rem,    "#e85d20"],
                ];
              })().map(([lbl,val,clr])=>(
                <div key={lbl} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"11px 14px",borderRadius:10,background:"#fafafa",border:"1px solid #f0ece8"}}>
                  <div style={{fontSize:small?13:15,color:"#555",fontWeight:700}}>{lbl}</div>
                  <div style={{fontSize:small?20:26,fontWeight:900,color:clr,direction:"ltr",textAlign:"right"}}>{omr(val)} <span style={{fontSize:small?11:13,color:"#aaa",fontWeight:600}}>OMR</span></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

                {/* Summary cards */}
        <div id="print-summary" style={{
          display:"grid",
          gridTemplateColumns: isMobile?"1fr":isTablet?"1fr 1fr":"repeat(3,1fr)",
          gap: small?12:16, marginBottom: small?14:18
        }}>
          {(()=>{
            // حساب عدد الحسابات الصحيح لكل خانة من بيانات المحصّلين
            const calcCounts = (arr) => {
              let total=0, paid=0, adj=0;
              (arr||[]).forEach(r => {
                const rTotal = r.count || 0;
                total += rTotal;
                // إذا البيانات فيها paidCount و adjCount نستخدمها
                if ((r.paidCount||0) > 0 || (r.adjCount||0) > 0) {
                  paid += (r.paidCount||0);
                  adj  += (r.adjCount||0);
                } else {
                  // fallback: كل من عنده paid > 0 يُعدّ في المدفوع
                  if ((r.paid||0) > 0) paid += rTotal;
                  if ((r.adj||0)  > 0) adj  += rTotal;
                }
              });
              return { total, paid, adj, combined: Math.max(paid,adj) };
            };
            const gCounts = calcCounts(data.regions);
            const dCounts = calcCounts(data.debtCompanies);
            const hCounts = calcCounts(data.headOffice);
            return (<>
              <SummaryCard label={t("مكاتب أونك",lang)}
                paid={gPd} adj={gAd}
                cnt={gPortCnt||gCnt||complaintsCounts.gov||0}
                cntPaid={null}
                cntAdj={null}
                cntTotal={null}
                portAmt={gPortAmt||0}
                color="#e85d20" icon="🗺" pct={p(gPd+gAd)} small={small} isMobile={isMobile} isTablet={isTablet}/>
              <SummaryCard label={t("شركات التحصيل",lang)}
                paid={dPd} adj={dAd}
                cnt={dPortCnt||dCnt||complaintsCounts.dc||0}
                cntPaid={null}
                cntAdj={null}
                cntTotal={null}
                portAmt={dPortAmt||0}
                color="#1a7a6b" icon="🏢" pct={p(dPd+dAd)} small={small} isMobile={isMobile} isTablet={isTablet}/>
              <SummaryCard label={t("المكتب الرئيسي",lang)}
                paid={hPd} adj={hAd}
                cnt={hPortCnt||hCnt||complaintsCounts.ho||0}
                cntPaid={null}
                cntAdj={null}
                cntTotal={null}
                portAmt={hPortAmt||0}
                color="#6c3fa0" icon="🏛" pct={p(hPd+hAd)} small={small} isMobile={isMobile} isTablet={isTablet}/>
            </>);
          })()}
        </div>

        {/* Regions */}
        <div id="print-regions" style={{
          background:"#fff", borderRadius:16,
          boxShadow:"0 3px 18px rgba(0,0,0,0.07)",
          border:"1.5px solid #f0ece8", marginBottom: small?14:18,
          overflow:"hidden"
        }}>
          <SectionHeader title={t("🗺 مكاتب أونك",lang)} paid={gPd} adj={gAd} color="#e85d20" small={small} portAmt={gPortAmt||0} portCnt={gPortCnt||gCnt||complaintsCounts.gov||0}/>
          <div style={{ padding: small?"10px":"14px 16px", display:"flex", flexDirection:"column", gap: small?8:10 }}>
            {[...data.regions].sort((a,b)=>((b.paid||0)+(b.adj||0))-((a.paid||0)+(a.adj||0))).map((r,i) => (
              <RegionRow key={r.id} region={r} idx={i} complaintsRegionMap={complaintsRegionMap}
                open={openRegion===r.id}
                onToggle={() => setOpenRegion(openRegion===r.id?null:r.id)}
                small={small}
              />
            ))}
          </div>
        </div>

        {/* DC + HO */}
        <div id="print-dc-ho" style={{
          display:"grid",
          gridTemplateColumns: isMobile?"1fr":"1fr 1fr",
          gap: small?12:18
        }}>
          {/* DC */}
          <div style={{ background:"#fff", borderRadius:16, boxShadow:"0 3px 18px rgba(0,0,0,0.07)", border:"1.5px solid #f0ece8", overflow:"hidden" }}>
            <SectionHeader title={t("🏢 شركات التحصيل",lang)} paid={dPd} adj={dAd} color="#1a7a6b" small={small} portAmt={dPortAmt||0} portCnt={dPortCnt||dCnt||complaintsCounts.dc||0}/>
            <div style={{ padding: small?"10px":"14px 16px", display:"flex", flexDirection:"column", gap: small?8:10 }}>
              {(() => {
                const ALWAYS_SHOW = [
                  {name:"Ejada",              portAmt:261235.418, portCnt:1938, paid:0, adj:0, count:1938},
                  {name:"Tahseel United",     portAmt:0,          portCnt:0,    paid:0, adj:0, count:0},
                  {name:"High Speed Company", portAmt:0,          portCnt:0,    paid:0, adj:0, count:0},
                ];
                // توحيد اسم High Speed company → High Speed Company
                let dcRaw = (data.debtCompanies||[]).map(c =>
                  c.name==="High Speed company" ? {...c, name:"High Speed Company"} : c
                ).filter(c=>c.name&&c.name!=="Blanks");
                // دمج التكرار (جمع القيم بدل حذف أحدها) - حماية إضافية
                let dc = [];
                let dcIdx = {};
                dcRaw.forEach(c => {
                  const k = c.name.trim().toLowerCase();
                  if (dcIdx[k] !== undefined) {
                    const ei = dcIdx[k];
                    dc[ei] = {...dc[ei], paid:(dc[ei].paid||0)+(c.paid||0), adj:(dc[ei].adj||0)+(c.adj||0), count:(dc[ei].count||0)+(c.count||0), portCnt:(dc[ei].portCnt||0)+(c.portCnt||0), principalAmt: Math.max(dc[ei].principalAmt||0, c.principalAmt||0), portAmt: Math.max(dc[ei].portAmt||0, c.portAmt||0)};
                  } else {
                    dcIdx[k] = dc.length;
                    dc.push({...c});
                  }
                });
                ALWAYS_SHOW.forEach(co => {
                  if (!dc.find(c=>c.name===co.name)) dc.push(co);
                  else {
                    const i2 = dc.findIndex(c=>c.name===co.name);
                    // استخدم portAmt من الملف (osAmt) إذا موجود، وإلا من ALWAYS_SHOW
                    const bestPort = dc[i2].portAmt>0 ? dc[i2].portAmt : co.portAmt;
                    const bestCnt  = dc[i2].portCnt>0 ? dc[i2].portCnt : co.portCnt||dc[i2].count||0;
                    dc[i2] = {...dc[i2], portAmt:bestPort, portCnt:bestCnt};
                  }
                });
                return [...dc].sort((a,b)=>((b.paid||0)+(b.adj||0))-((a.paid||0)+(a.adj||0))).map((c,i) => (
                <EntityCard key={c.name} name={c.name} paid={c.paid} adj={c.adj} cBranch={complaintsBranchMap} color="#1a7a6b" rank={i+1} small={small} portAmt={c.portAmt||0} portCnt={c.portCnt||0} principalAmt={c.principalAmt||c.portAmt||0} osAmt={c.osAmt||c.portAmt||0}/>
                ));
              })()}
            </div>
          </div>

          {/* HO */}
          <div style={{ background:"#fff", borderRadius:16, boxShadow:"0 3px 18px rgba(0,0,0,0.07)", border:"1.5px solid #f0ece8", overflow:"hidden" }}>
            <SectionHeader title={t("🏛 المكتب الرئيسي",lang)} paid={hPd} adj={hAd} color="#6c3fa0" small={small} portAmt={hPortAmt||0} portCnt={hPortCnt||hCnt||complaintsCounts.ho||0}/>
            <div style={{ padding: small?"10px":"14px 16px", display:"flex", flexDirection:"column", gap: small?8:10 }}>
              {[...(data.headOffice||[])].filter(c=>c.name&&c.name!=='HO'&&c.name!=='Blanks').sort((a,b)=>{return ((b.paid||0)+(b.adj||0))-((a.paid||0)+(a.adj||0));}).map((c,i) => (
                <EntityCard key={c.name} name={c.name} paid={c.paid} adj={c.adj} cBranch={complaintsBranchMap} color="#6c3fa0" rank={i+1} closed={c.closed||0} active={c.active||0} small={small} portAmt={c.portAmt||0} portCnt={c.portCnt||0} principalAmt={c.principalAmt||0} refundAmt={c.refundAmt||0}/>
              ))}
            </div>
          </div>
        </div>

        <div id="print-footer" style={{ textAlign:"center", fontSize:11, color:"#bbb", paddingTop:16, paddingBottom:8 }}>
          ONEIC — لوحة تحكم إدارة تحصيل الديون © 2026 · {data.uploadDate}
        </div>
      </div>
    </div>
    </LangContext.Provider>
  );
}
