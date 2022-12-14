import Swal from 'sweetalert2';

export function alert({ text, type }) {
  Swal.fire({
    title: type === 'success' ? 'Success!' : 'Error!',
    text,
    icon: type || 'warning',
    confirmButtonText: 'Continue',
    confirmButtonColor: '#ffde59',
  });
}