import { FooterSection } from "@/components/layout/sections/footer";
import { PricingSection } from "@/components/layout/sections/pricing";

export const metadata = {
  title: "Vadim's - Landing template",
  description: "my landing page",
  openGraph: {
    type: "website",
    url: "https://github.com/u0100/Vadim-s-Portfolio.git",
    title: "Landing template",
    description: "my landing page",
    images: [
      {
        url: "",
        width: 1200,
        height: 630,
        alt: "Landing template",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "https://github.com/u0100/Vadim-s-Portfolio.git",
    title: "Landing template",
    description: "landing page",
    images: [
      "",
    ],
  },
};

export default function Home() {
  return (
    <>
      <PricingSection />
      <FooterSection />
    </>
  );
}
