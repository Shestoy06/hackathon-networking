import { type FC } from 'react';
import {Outlet} from "react-router-dom";
import StyledToaster from "@/components/ui/StyledToaster.tsx";
import BottomNav from "@/components/ui/BottomNav.tsx";

export const App: FC = () => {

  return (
    <div>
      <StyledToaster/>
      <div className="pb-16"> {/* compensate bottom nav height */}
        <Outlet/>
      </div>
      <BottomNav/>
    </div>
  );
};
