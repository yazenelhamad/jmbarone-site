export const metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Login uses its own minimal page; dashboard layout lives in (dashboard)/.
  return <>{children}</>;
}
