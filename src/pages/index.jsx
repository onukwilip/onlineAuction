import Head from "next/head";
import Image from "next/image";
import { Inter, Modak } from "@next/font/google";
import css from "@/styles/index/Index.module.scss";
import PreHeader from "@/components/PreHeader";
import PageHeader from "@/components/Header";
import Banner from "@/components/Banner";
import Finished from "@/components/Finished";
import Current from "@/components/Current";
import HowItWorksClass from "@/components/HowItWorks";
import Footer from "@/components/Footer";
import Modal from "@/components/Modal";
import { useState } from "react";
const inter = Inter({ subsets: ["latin"] });

export const HeadComponent = ({ children }) => {
  return (
    <Head>
      <title>onlineAuction</title>
      <meta
        name="description"
        content="A web application for aunctioning goods and services"
      />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"
        integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w=="
        crossorigin="anonymous"
        referrerpolicy="no-referrer"
      />
      <link rel="icon" href="/favicon.ico" />
      {children}
    </Head>
  );
};

export default function Home() {
  return (
    <>
      <HeadComponent> /</HeadComponent>
      <main className={css.body}>
        <div className={css["pre-header"]}>
          <PreHeader />
        </div>
        <PageHeader />
        <div className={css["banner"]}>
          <Banner />
        </div>
        <div className={css["finished"]}>
          <Finished />
        </div>
        <div className={css["current"]}>
          <Current />
        </div>
        <div className={css["how-it-works"]}>
          <HowItWorksClass />
        </div>
        {/* <div className={css["pre-header"]}></div> */}
        <div className={css["footer"]}>
          <Footer />
        </div>
      </main>
    </>
  );
}
