import LOGO from "../../assets/logo/STUDY-BADGE-LOGO_PNG.png";

const Footer = (): JSX.Element => {
  return (
    <section className="h-52 flex justify-center items-center bg-Blue-2">
      <div className="w-[1025px] h-52 flex justify-between items-center text-[4px] md:text-xs text-white">
        <div className="ml-8">
          Study Badge @ 2024. All rights reserved.
          <br />
          created by team TenTen
        </div>
        <img src={LOGO} className="h-32 md:h-44 mx-16" />
        <div className="text-right w-20 md:w-56 mr-8">
          CONTACT
          <br />
          GITHUB | GMAIL | NOTION
        </div>
      </div>
    </section>
  );
};

export default Footer;
