import { useEffect } from "react";
import GuidanceSec from "../../Components/AboutUs/GuidanceSec/GuidanceSec";
import HeroSection from "../../Components/AboutUs/HeroSection/HeroSection";
import TestimonialSection from "../../Components/Home/TestimonialSection/TestimonialSection";
import ServiceCardShowcase from "../../Components/AboutUs/ServiceCardShowcase/ServiceCardShowcase";
import { Helmet } from "react-helmet-async";

const AboutUs = () => {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Newlista | Real Estate Investor Network & Capital Partnerships",
    url: "https://www.newlista.com/about-us",
    description:
      "Learn about Newlista’s investor‑only real‑estate network. We connect investors, facilitate capital partnerships and provide off‑market commercial opportunities.",
    mainEntity: {
      "@type": "Organization",
      "@id": "https://www.newlista.com/#organization",
      name: "Newlista Ventures LLC",
      url: "https://www.newlista.com/",
      logo: {
        "@type": "ImageObject",
        url: "https://www.newlista.com/NewlistaLogo.png",
      },
    },
  };

  useEffect(() => {
    const existing = document.getElementById("about-page-schema");
    if (existing) existing.remove();

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "about-page-schema";
    script.text = JSON.stringify(schemaData);

    document.head.appendChild(script);

    return () => {
      const addedScript = document.getElementById("about-page-schema");
      if (addedScript) addedScript.remove();
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>About Newlista | Real Estate Investor Network & Capital Partnerships</title>
        <meta
          name="description"
          content="Learn about Newlista’s investor‑only real‑estate network. We connect investors, facilitate capital partnerships and provide off‑market commercial opportunities."
        />
        <link rel="canonical" href="https://www.newlista.com/about-us" />
      </Helmet>

      <HeroSection />
      <div className="min-[1780px]:px-28">
        <ServiceCardShowcase />
        <GuidanceSec />
        <section className="py-14 flex justify-center 2xl:-ml-10">
          <TestimonialSection />
        </section>
      </div>
    </>
  );
};

export default AboutUs;