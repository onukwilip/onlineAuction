import React from "react";
import ProductComponent from "@/components/Product";
import { HeadComponent } from "..";

const Product = (props) => {
  return (
    <>
      <HeadComponent></HeadComponent>
      <ProductComponent />
    </>
  );
};

export default Product;
