import ArabicNavbar from "@/components/ArabicNavbar";
import ArabicFooter from "@/components/ArabicFooter";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export default function ArabicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div dir="rtl" lang="ar">
      <ArabicNavbar />
      {children}
      <ArabicFooter />
      <FloatingWhatsApp />
    </div>
  );
}
