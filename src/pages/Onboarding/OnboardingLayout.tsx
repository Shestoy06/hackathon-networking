import React, {useEffect, useState} from "react";
import AnimatedTelegramIcon from "@/components/ui/animation/AnimatedTelegramIcon.tsx";
import {Button} from "@telegram-apps/telegram-ui";

interface OnboardingLayoutProps {
  createNewUser: () => void;
  isUserCreationPending: boolean;
}

enum ButtonText {
  CONTINUE = 'Continue',
  CLAIM = 'Claim'
}

const OnboardingLayout: React.FC<OnboardingLayoutProps> = (
  {
    createNewUser,
    isUserCreationPending
  }
) => {

  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false)
  const [buttonText, setButtonText] = useState(ButtonText.CONTINUE)

  useEffect(() => {
    const timeouts: Array<ReturnType<typeof setTimeout>> = [];
    timeouts.push(setTimeout(() => setStep(1), 3000));
    timeouts.push(setTimeout(() => setStep(2), 4000));
    timeouts.push(setTimeout(() => setStep(3), 5000));
    timeouts.push(setTimeout(() => setStep(4), 6000));

    return () => timeouts.forEach(timeout => clearTimeout(timeout));
  }, []);

  const handleContinue = async () => {
    setIsLoading(true);
    createNewUser()

  }

  return (
    <div className="w-screen h-[100dvh] flex flex-col justify-between fixed top-0 left-0 z-[1000] p-4">
      <div className="h-full flex flex-col items-center justify-center text-center">

        {progress === 0 && (
          <div>
            <h1 className="text-3xl font-bold mb-4 text-white">Welcome!</h1>
            <p className="">
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              Let's get started to enhance your networking experience through telegram
            </p>
          </div>
        )}

        {progress === 1 && (
          <div className="h-[25rem] flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-4 text-white">Analysing Your Profile</h1>

            <div
              className="bg-white rounded-full h-[140px] w-[140px] grid place-items-center relative shadow-[0_0_10px_5px_rgba(255,255,255,1)] mt-10">
              <div className="absolute -top-[5px] -left-[5px]">
                <AnimatedTelegramIcon/>
              </div>
            </div>

            <div className="w-full text-center text-white space-y-2 font-bold mt-auto">
              {step === 1 && <p>Checking Telegram Age...</p>}
              {step === 2 && <p>Verifying your Premium Status...</p>}
              {step === 3 && <p>Awarding your Bonus for joining Rats Kingdom...</p>}
              {step === 4 && <p>Completed</p>}
            </div>
          </div>
        )}

        {progress === 2 && (
          <div>
            <h1 className="text-3xl font-bold mb-4 text-white">
              {tokens} RATS</h1>
            <p className="font-medium">
              You&apos;ve earned {tokens} RATS for joining us! <br/> Earn more RATS by completing tasks and
              referring friends.
            </p>
          </div>
        )}
      </div>

      <div className="min-h-10">
        <Button
          stretched={true}
          onClick={handleContinue}
          disabled={isUserCreationPending || isLoading}
        >{buttonText}</Button>
      </div>
    </div>
  );
};

export default OnboardingLayout;