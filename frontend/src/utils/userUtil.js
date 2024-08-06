import civilianIcon from '../assets/profilepics/civilian.webp';
import adminIcon from '../assets/profilepics/admin.webp';

export const getIcon = (roleId) => {
  switch (roleId) {
    case 0:
      return civilianIcon;
    case 1:
      return adminIcon;
    default:
      return null;
  }
}

export const getColor = (status) => {
  switch (status) {
    case 0:
      return 'red';
    case 1:
      return 'orange';
    case 2:
      return 'green';
    default:
      return null;
  }
}

export const getStatus = (status) => {
  switch (status) {
    case 0:
      return 'Non approvato';
    case 1:
      return 'In attesa';
    case 2:
      return 'Approvato';
    default:
      return null;
  }
}
