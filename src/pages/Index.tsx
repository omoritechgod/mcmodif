import { FC } from "react";
import Header from "@/components/common/Header";
import Hero from "@/components/hero/Hero";
import Overview from "@/components/about/Overview";

const Index: FC = () => {
  return (
    <div className="font-sans">
      <Header />
      <Hero />
      <Overview />
      {/* Add other landing sections here later */}
    </div>
  );
};

export default Index;
