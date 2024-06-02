import { toast } from "sonner";
import { STATUS } from "../../../utils/constants"; 
import './styles.scss'

const Toast = (type:string, message:string) => {

  const ToastMessage = () => {

    switch (type) {
      case STATUS.SUCCESS:
        return (
          <div className="toast-container success">
            <p>{message}</p>
          </div>
        );
      case STATUS.ERROR:
        return (
          <div className="toast-container error">
            <p>{message}</p>
          </div>
        );
      default:
        return null;
    }
  };

  return toast(<ToastMessage />, {
    className: `${type}-container`,
    duration: 2000,
  });
};

export default Toast;
