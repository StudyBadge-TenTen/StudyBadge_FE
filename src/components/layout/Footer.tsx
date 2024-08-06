import LOGO from "../../assets/logo/STUDY-BADGE-LOGO_PNG.png";

const Footer = (): JSX.Element => {
  return (
    <section className="h-52 flex justify-center items-center bg-Blue-2 py-4">
      <div className="w-full sm:w-fit lg:w-[1025px] h-full flex flex-col sm:flex-row justify-between items-center text-xs text-white">
        <div className="w-full sm:w-28 md:w-fit ml-8">
          Study Badge @ 2024. All rights reserved.
          <br />
          created by team TenTen
        </div>
        <img src={LOGO} className="h-20 md:h-44 mx-16" />
        <div className="text-right w-full text-center sm:w-20 md:w-56 mr-8">
          <b>CONTACT</b>
          <br />
          <a href="https://github.com/StudyBadge-TenTen" target="_blank" rel="noopener noreferrer">
            GITHUB
          </a>{" "}
          | <a href="mailto:studybadge04@gmail.com">GMAIL</a> |{" "}
          <a
            href="https://tenten-studybadge.notion.site/StudyBadge-88869c57effe4ef2a33ea393c594bcf4?pvs=4"
            target="_blank"
            rel="noopener noreferrer"
          >
            NOTION
          </a>
        </div>
      </div>
    </section>
  );
};

export default Footer;
