import Swal from 'sweetalert2';

export const showAlert = (type, title, text = '', timer = 2000) => {
  Swal.fire({
    icon: type,
    title: title,
    text: text,
    showConfirmButton: false,
    timer: timer,
  });
};
