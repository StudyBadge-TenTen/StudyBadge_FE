import SAMPLE_IMG from "../../assets/image/CAROUSEL_IMG_1.jpg";
import GOLD_BADGE from "../../assets/GOLD-BADGE_PNG.png";
import ProfileEdit from "./ProfileEdit";

const Profile = (): JSX.Element => {
  return (
    <>
      <div className="w-full min-h-52 border border-solid border-Gray-3 rounded-t-[30px] p-6 flex">
        <div className="profile-image w-2/3 flex flex-col justify-center border-r border-solid border-Gray-2">
          <div className="flex items-center">
            {/* <img src={SAMPLE_IMG} className="object-cover w-32 h-32 rounded-full mr-8" /> */}
            <div className="no-profile-image w-32 h-32 bg-Gray-2 rounded-full flex justify-center items-center mr-8">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="80"
                height="80"
                fill="white"
                className="bi bi-person"
                viewBox="0 0 16 16"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
              </svg>
            </div>
            <span className="text-2xl">홍길동</span>
          </div>
          <div className="flex justify-end">
            <button className="btn-blue px-3 py-2 text-xs mr-8">수정하기</button>
          </div>
        </div>
        <div className="badge w-1/3 flex justify-center items-center">
          <img src={GOLD_BADGE} className="w-28" />
        </div>
      </div>
      <div className="w-full h-20 bg-Gray-1 border-x border-b border-solid border-Gray-3 rounded-b-[30px] flex justify-between items-center px-10">
        <div className="text-xl">
          충전금액 : <span className="ml-4 font-bold">10,000원</span>
        </div>
        <button className="btn-blue">충전하기</button>
      </div>
      <ProfileEdit />
    </>
  );
};

export default Profile;
