import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'المصادقة - نائبك.كوم',
  description: 'تسجيل الدخول أو إنشاء حساب جديد في منصة نائبك.كوم',
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
