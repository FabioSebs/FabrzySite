import React, { useState } from "react";
import Navbar from "../components/Navbar";
import ContactIcon from "../components/ContactIcon";
import ContactHero from "../components/ContactHero";
import ContactSlideSection from "../components/ContactSlideSection";
import { ContactSection } from "../context/ContactSection";
import Footer from "../components/Footer";

function contact() {
  const [section, setSection] = useState("blank");

  return (
    <ContactSection.Provider value={{ section, setSection }}>
      <Navbar />
      <ContactHero />
      <div className="flex justify-center bottom-[30px] relative">
        <ContactIcon />
      </div>
      <ContactSlideSection />
      <Footer />
    </ContactSection.Provider>
  );
}

export default contact;
