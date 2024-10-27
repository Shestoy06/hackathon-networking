import {useInitData} from "@telegram-apps/sdk-react";
import {useQueryClient} from "@tanstack/react-query";
import UserService from "@/api/services/user.service.ts";
import {CreateUserDto} from "@/api/dto/createUserDto.dto.ts";
import {QueryKeys} from "@/utils/enums/queryKeys.ts";
import OnboardingLayout from "@/pages/Onboarding/OnboardingLayout.tsx";
import {useState} from "react";
import {User} from "@/utils/interfaces/user.interface.ts";

const Onboarding = () => {
  const initData = useInitData();
  const queryClient = useQueryClient();

  const [isUserCreationPending, setIsUserCreationPending] = useState(false)

  const createNewUser = () => {
    if (initData?.user) {
      const newUser = new CreateUserDto(
        initData.user.id,
        initData.user.username || "No name",
      )

      setIsUserCreationPending(true)
      UserService.createUser(newUser).then(async user => {
        await UserService.addContact(user.telegramId, 'shestaya_liniya')
        await UserService.addContact(user.telegramId, 'skywl_k')
        await UserService.addContact(user.telegramId, 'PiraJoke')
        await UserService.addLink(user.telegramId, 'Hackathon','PiraJoke')
        await UserService.addLink(user.telegramId, 'Hackathon','skywl_k')
        await UserService.addLink(user.telegramId, 'Hackathon','shestaya_liniya')
        await UserService.addTheme(
          user.telegramId,
          {
            id: 'Hackathon',
            avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_s4hzT31Pte691BvjmzSisxWjjRGLuGPG_g&s',
            description: ''
          })
        queryClient.invalidateQueries({queryKey: [QueryKeys.USER]}).then(() => {
          setUserInContext(user)
          window.location.reload()
        })
        setIsUserCreationPending(false)

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