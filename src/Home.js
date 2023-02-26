import React from "react";
import HeroSection from "./components/HeroSection";
import Services from "./components/Services";
import Trusted from "./components/Trusted";

const Home = () => {
  const data = {
    name: "Diya Furnitures : Store",
    desc: "A furniture store is a retail establishment that specializes in selling a wide variety of furniture items for home and office use. These stores typically offer furniture pieces such as chairs, tables, sofas, beds, cabinets, and other related items. They may also offer home decor accessories like rugs, curtains, and lighting fixtures. Furniture stores may operate as stand-alone stores or as part of a larger department store. They may sell furniture items in various styles such as contemporary, traditional, or modern, and cater to a wide range of budgets and tastes."
  };
  return (
    <>
      <HeroSection myData={data} />
      <Services />
      <Trusted />
    </>
  );
};

export default Home;
