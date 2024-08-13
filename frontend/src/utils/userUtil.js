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
      return 'orange';
    case 3:
      return 'orange';
    case 4:
      return 'green';
    default:
      return null;
  }
}

export const getDocumentName = (index) => {
  switch (index) {
      case 0:
          return 'Formulario';
      case 1:
          return 'Assicurazione';
      case 2:
          return 'Decisione'
      default:
          return 'Documento';
  }
} 

export const getStatus = (status, t) => {
  switch (status) {
    case 0:
      return t('profile.never_approved');
    case 1:
      return t('profile.waiting_first');
    case 2:
      return t('profile.expired');
    case 3:
      return t('profile.waiting');
    case 4:
      return t('profile.approved');
    default:
      return null;
  }
}
