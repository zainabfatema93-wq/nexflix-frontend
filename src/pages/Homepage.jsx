import React from "react";
import Hero from "../components/Hero";
import CardList from "../components/CardList";
import Footer from "../components/Footer";
const Homepage = () => {
  return (
    <div className="p-5">
      <Hero />

      <CardList title="Now Playing" Category={"now_playing"} />
      <CardList title="Top Rated" Category={"top_rated"} />
      <CardList title="Popular" Category={"popular"} />
      <CardList title="Upcoming" Category={"upcoming"} />
      <Footer title="Upcoming" Category={"upcoming"} />
    </div>
  );
};

export default Homepage;
