import {TonConnectButton} from "@tonconnect/ui-react";

const Profile = () => {
  return (
    <div className='p-4'>
      <div className="text-2xl">Profile</div>
      <div className='text-xl mt-4 flex font-bold'>
        My wallet
        <TonConnectButton className='ml-auto'/>
      </div>

    </div>
  );
};

export default Profile;