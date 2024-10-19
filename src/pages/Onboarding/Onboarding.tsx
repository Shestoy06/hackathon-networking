import {useInitData, useLaunchParams} from "@telegram-apps/sdk-react";
import {useQueryClient} from "@tanstack/react-query";
import UserService from "@/api/services/user.service.ts";
import {CreateUserDto} from "@/api/dto/createUserDto.dto.ts";
import {QueryKeys} from "@/utils/enums/queryKeys.ts";
import OnboardingLayout from "@/pages/Onboarding/OnboardingLayout.tsx";
import {useState} from "react";
import {User} from "@/utils/interfaces/user.interface.ts";

const Onboarding = () => {
  const lp = useLaunchParams();
  const initData = useInitData();
  const queryClient = useQueryClient();

  const [isUserCreationPending, setIsUserCreationPending] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  const createNewUser = () => {
    if (initData?.user) {
      const newUser = new CreateUserDto(
        initData.user.id,
        initData.user.username || "No name",
      )

      setIsUserCreationPending(true)
      UserService.createUser(newUser).then(user => {
        setIsUserCreationPending(false)
        setUser(user)
        setUserInContext(user)
      })
    }
  }

  const setUserInContext = (user: User) => {
    console.log('YOO')
    // when user is set in query data, the main application will automatically launch
    if (user) {
      console.log('YOOOOO')
      queryClient.setQueryData([QueryKeys.USER], () => user)
    }
  }

  return (
    <OnboardingLayout
      createNewUser={() => createNewUser()}
      isUserCreationPending={isUserCreationPending}
    />
  );
};

export default Onboarding;