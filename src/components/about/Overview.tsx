import { FC } from "react";
import aboutImg from "@/assets/img/about.jpg";
import coil from "@/assets/img/coil.png";

const Overview: FC = () => {
  return (
    <section className="relative w-full bg-white py-[100px] px-6 md:px-[80px] overflow-hidden">
      <div className="max-w-[1200px] mx-auto flex flex-wrap md:flex-nowrap items-center justify-between gap-[40px] relative z-10">
        {/* Left Text Block */}
        <div className="w-full md:w-1/2 relative z-10">
          <h2 className="text-4xl font-bold text-[#111827] mb-6">
            MC Dee Overview
          </h2>
          <p className="text-lg text-[#333] mb-8 leading-relaxed max-w-[500px]">
            Images, videos, PDFs and audio files are supported. Create math
            expressions and diagrams directly from the app. Take photos with
            the mobile app and save them to a note.
          </p>
          <a
            href="#"
            className="inline-block bg-[#3B82F6] text-white px-6 py-3 rounded-lg font-semibold text-sm hover:opacity-90 transition no-underline"
          >
            Get Started →
          </a>
        </div>

        {/* Right Image */}
        <div className="w-full md:w-1/2 flex justify-end">
          <img
            src={aboutImg}
            alt="About MC Dee"
            className="w-full max-w-[450px] h-auto object-cover rounded-md"
          />
        </div>
      </div>

      {/* Coil Vector positioned bottom left */}
      <img
        src={coil}
        alt="Coil vector"
        className="absolute bottom-[-60px] left-[-60px] w-[400px] opacity-20 z-0 pointer-events-none"
      />
    </section>
  );
};

export default Overview;
