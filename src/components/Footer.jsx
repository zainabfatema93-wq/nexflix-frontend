import React from "react";

const Footer = () => {
  return (
    <div className="text-[#737373] md:px-10">
      <div className="py-20">
        <p>Developed by Zainab Fatima</p>
        <p>
          Read about Netflix Tv shows and movies and watch bomus videos on
          Tudum.com
        </p>
      </div>
      <p className="pb-5">Questions? Contanct us.</p>

      <div className="grid grid-cols-4 md:grid-cols-4text-sm pb-10 max-w-5xl">
        <ul className="flex flex-col space-y-2">
          <li>FAQ</li>
          <li>Investor Relation</li>
          <li>Privacy</li>
          <li>Speed Test</li>
        </ul>
        <ul className="flex flex-col space-y-2">
          <li>Help Center</li>
          <li>Jobs</li>
          <li>Cookie Preferences</li>
          <li>LegalNotices</li>
        </ul>
        <ul className="flex flex-col space-y-2">
          <li>Account</li>
          <li>Ways to Watch</li>
          <li>Corporate Information</li>
          <li>Only on Netflix</li>
        </ul>

        <ul className="flex flex-col space-y-2">
          <li>Media Center </li>
          <li>Terms of Use</li>
          <li>Contact Us</li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
