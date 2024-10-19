import {useState} from "react";

const AnimatedTelegramIcon = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative w-[150px] h-[150px]">
      <iframe
        src="https://lottie.host/embed/7fbe0f7d-8238-48a7-9f49-4f4aaea1de1d/mgo1BP9fQM.json"
        className="w-[150px] h-[150px] bg-transparent"
        onLoad={() => {
          setTimeout(() => {
            setIsLoading(false)
          }, 50)
        }}
        style={{ opacity: isLoading ? 0 : 1, transition: 'all ease-in-out 1s' }}
        title="Lottie Animation"
      ></iframe>
    </div>
  );
};

export default AnimatedTelegramIcon;