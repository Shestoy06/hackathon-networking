import toast, {Toaster, useToasterStore} from "react-hot-toast";
import {useEffect} from "react";
import {TOAST_LIMIT} from "@/utils/constants/constants.ts";

const StyledToaster = () => {
  const { toasts } = useToasterStore();

  useEffect(() => {
    toasts
      .filter((t) => t.visible) // Only consider visible toasts
      .filter((_, i) => i >= TOAST_LIMIT) // Is toast index over limit?
      .forEach((t) => toast.dismiss(t.id)); // Dismiss – Use toast.remove(t.id) for no exit animation
  }, [toasts]);

  return (
    <div>
      <Toaster
        toastOptions={{
          className: '',
          style: {
            fontSize: 14,
            color: '#000',
            padding: "5px 10px",
            fontWeight: 500,
            margin: '52px 0',
            textAlign: 'center'
          },
          success: {
            iconTheme: {
              primary: '#fff',
              secondary: '#000',
            },
          },
          error: {
            iconTheme: {
              primary: '#fff',
              secondary: '#000',
            },
          }

        }}/>
    </div>
  );
};

export default StyledToaster;