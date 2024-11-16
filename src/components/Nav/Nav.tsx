import Image from 'next/image';
import bell from '@/../public/assets/icon_bell_default.png';
import translate from '@/../public/assets/icon_translate.png';
import logo from '@/../public/assets/img_logo_pc.png';
import profile from '@/../public/assets/img_profile_member.png';

export default function Nav() {
  return (
    <div className="flex w-full h-[6rem] justify-center items-center border-b border-gray-100">
      <div className="w-[120rem] flex justify-between items-center">
        <div className="w-[35rem] gap-[2.4rem] flex items-center justify-center">
          <Image className="w-[14.6rem] h-[2.92rem]" src={logo} alt="로고" />
          <div className="flex">
            <p className="flex items-center justify-center py-[2.1rem] px-[1.7rem] gap-[1rem] font-semibold leading-[1.79rem] text-[1.5rem] ">
              Recipe
            </p>
            <p className="flex items-center justify-center py-[2.1rem] px-[1.7rem] gap-[1rem] font-semibold leading-[1.79rem] text-[1.5rem]">
              Challenge
            </p>
          </div>
        </div>
        <div className="w-[11.2rem] flex gap-[1.6rem] items-center justify-center">
          <Image src={translate} alt="번역" />
          <Image src={bell} alt="벨" />
          <Image src={profile} alt="프로필" />
        </div>
      </div>
    </div>
  );
}
