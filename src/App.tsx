import { type FC } from 'react';
import {Outlet} from "react-router-dom";
import StyledToaster from "@/components/ui/StyledToaster.tsx";
import BottomNav from "@/components/ui/BottomNav.tsx";
import Loader from "@/components/ui/Loader.tsx";
import axios from "axios";
import useGetUser from "@/api/hooks/useGetUser.tsx";
import Onboarding from "@/pages/Onboarding/Onboarding.tsx";

export const App: FC = () => {

  const {user, isLoading, isError, error} = useGetUser()

  if (isLoading) {
    return (
      <Loader/>
    )
  }

  if (isError) {
    if (axios.isAxiosError(error) && error.response) {
      const statusCode = error.response.status;

      if (statusCode === 404) {
        return <Onboarding/>
      } else {
        return <SplashScreenServerOverload/>
      }
    }
  }

  return (
    <div>
      <StyledToaster/>
      <div className="pb-16"> {/* compensate bottom nav height */}
        <Outlet context={user}/>
      </div>
      <BottomNav/>
    </div>
  );
};
