import loader from '@/assets/loader.svg'

const SmallLoader = () => {
  return (
    <div className="flex justify-center items-center w-[1.5rem] h-[1.5rem]">
      <img
        src={loader}
        alt="loader"
        width={24}
        height={24}
        className="w-full h-full animate-spin"
      />
    </div>
  );
}
export default SmallLoader;