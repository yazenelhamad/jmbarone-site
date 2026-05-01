import { NavBar } from "./NavBar";
import { Footer } from "./Footer";
import { EmergencyBar } from "./EmergencyBar";
import { getSiteSettings } from "@/lib/content";

export async function PublicShell({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings();
  return (
    <>
      <EmergencyBar phone={settings.emergency_phone} />
      <NavBar phone={settings.phone} />
      <main>{children}</main>
      <Footer settings={settings} />
    </>
  );
}
