import {motion} from "framer-motion";
import logo from "@/assets/logo.png";

const SplashScreenServerOverload = () => {
  return (
    <div
      className="z-[1000] fixed top-0 left-0 w-screen h-[100dvh] flex flex-col items-center text-center justify-center bg-black">
      <div>
        <motion.img
          src={logo}
          alt="Splash-Screen"
          className="w-40 h-40"
          initial={{scale: 0.5, opacity: 0}}
          animate={{scale: [0.5, 1, 1, 1], opacity: 1}}
          transition={{duration: 1.8, repeat: Infinity, repeatType: "reverse"}}
        />
      </div>

      <motion.h1
        initial={{y: 20, opacity: 0}}
        animate={{y: 0, opacity: 1}}
        transition={{duration: 1.8, repeat: Infinity, repeatType: "reverse"}}
        className="font-black text-3xl text-white">
        Rats Kingdom
      </motion.h1>
      <div className="mt-4">Rats servers are overloaded for the moment, please wait or try to connect later</div>
    </div>
  );
};

export default SplashScreenServerOverload;