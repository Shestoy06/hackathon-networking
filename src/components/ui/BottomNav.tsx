import {NavLink} from "react-router-dom";
import {Routes} from "@/utils/enums/routes.ts";
import graphIcon from "@/assets/icons/graph-icon.svg"
import {twMerge} from "tailwind-merge";
import {useQRScanner} from "@telegram-apps/sdk-react";

const BottomNav = () => {
  return (
    <div className="fixed bottom-0 flex items-center w-full h-16 p-4 pb-6 justify-between backdrop-blur border-t-2 border-opacity-5 border-white">
      <CustomNavLink route={Routes.GRAPH} icon={graphIcon}/>
    </div>
  );
};

const CustomNavLink = ({route, icon, iconPadding = 0}: { route: Routes, icon: string, iconPadding?: number }) => {
  const navLinkStyle = "w-full text-[12px] flex flex-col text items-center gap-0.5"

  const iconStyle = "w-6 h-6 opacity-60"
  const activeIconStyle = "w-6 h-6 opacity-100"

  const textStyle = "font-medium transition-all duration-300 ease-in-out capitalize opacity-60"
  const activeTextStyle = twMerge(textStyle, 'opacity-100')
  useQRScanner()
  return (
    <NavLink to={route} className={navLinkStyle}>
      {({ isActive }) => (
        <>
          <img
            src={icon}
            alt={route}
            className={`${isActive ? activeIconStyle : iconStyle} transition-opacity duration-300 ease-in-out p-${iconPadding}`}
          />
          <span className={isActive ? activeTextStyle : textStyle}>{route === '/' ? 'Graph' : route}</span>
        </>
      )}
    </NavLink>
  )
}

export default BottomNav;