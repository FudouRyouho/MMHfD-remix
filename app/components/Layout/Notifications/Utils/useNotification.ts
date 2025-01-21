import { useDispatch } from "react-redux";
import { addNotification, NotificationType } from "~/store/NotificationsSlice";

const useNotification = () => {
  const dispatch = useDispatch();

  const handleAddNotification  = (
    typeProp: NotificationType,
    messageProp: string,
    iconProp?: React.ReactNode
  ) => {
    dispatch(
      addNotification({
        type: typeProp,
        message: messageProp,
        icon: iconProp,
      })
    );
  };

  return handleAddNotification;
};

export default useNotification;
