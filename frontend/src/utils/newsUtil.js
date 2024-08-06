import infoIcon from '../assets/info.png';
import warningIcon from '../assets/warning.png';

export const getIcon = (type) => {
  switch (type) {
    case 'info':
      return infoIcon;
    case 'warning':
      return warningIcon;
    default:
      return null;
  }
};