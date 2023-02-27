import React from 'react'
import HeroSection from './components/HeroSection'
import { useProductContext } from './context/productcontext';

const About = () => {
  const {myName} = useProductContext();

  const data = {
    name: "Diya Furnitures : ECommerce",
    desc : "A furniture ecommerce website is an online platform that specializes in selling furniture items for home and office use. These websites typically offer a wide variety of furniture pieces such as chairs, tables, sofas, beds, cabinets, and other related items. They may also offer home decor accessories like rugs, curtains, and lighting fixtures. Furniture ecommerce websites may operate as standalone stores or as part of a larger online marketplace. They may offer furniture items in various styles such as contemporary, traditional, or modern, and cater to a wide range of budgets and tastes. Customers can browse and purchase furniture items from the comfort of their own home, and many websites offer free shipping and easy returns to make the process more convenient."
  }
  return (
    <>
    {/* {myName} */}
      <HeroSection myData={data}/>
    </>
  );
}



export default About
