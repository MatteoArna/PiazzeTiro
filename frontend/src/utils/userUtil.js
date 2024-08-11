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

export const getStatus = (status) => {
  switch (status) {
    case 0:
      return 'Mai approvato';
    case 1:
      return 'In attesa della prima approvazione';
    case 2:
      return 'Approvazione scaduta';
    case 3:
      return 'In attesa dell\'approvazione';
    case 4:
      return 'Approvato';
    default:
      return null;
  }
}
