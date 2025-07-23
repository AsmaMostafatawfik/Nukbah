// app/login/reset-password/page.tsx
import { Suspense } from "react";
import ResetPasswordForm from "./ResetPasswordForm";

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="text-center mt-10">جارٍ تحميل النموذج...</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
}
