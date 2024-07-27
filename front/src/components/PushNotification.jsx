import { toast } from 'react-toastify';

const PushNotification = (msg, options = {}) => {
    return toast(msg, options);
};
export default PushNotification;
