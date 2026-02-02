# 4sa-blog

## نشر على Vercel

1. **Root Directory:** في إعدادات المشروع على Vercel (Settings → General → Root Directory) ضع **`4sa-blog`** إذا كان المستودع يحتوي على مجلد فرعي بهذا الاسم.
2. **Build Command:** إن كان هناك Override في Build & Development Settings، ضعه **`npx ng build`** أو اترك الحقل فارغاً لاستخدام `vercel.json`.
3. **Output Directory:** **`dist/4sa-blog/browser`**