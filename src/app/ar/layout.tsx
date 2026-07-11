import ArabicNavbar from "@/components/ArabicNavbar";
import ArabicFooter from "@/components/ArabicFooter";

export default function ArabicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div dir="rtl" lang="ar">
      <ArabicNavbar />
      {children}
      <ArabicFooter />
    </div>
  );
}
