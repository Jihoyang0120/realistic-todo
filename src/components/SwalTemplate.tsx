import Swal from 'sweetalert2'

const SwalCheer = () => Swal.fire({
  background: '#ffd url(https://lazy-note.s3.ap-northeast-2.amazonaws.com/FAF0E6.png.jpg)',
  imageUrl: 'https://lazy-note.s3.ap-northeast-2.amazonaws.com/cheering2.gif',
  width: 430,
  template: '#my-template',
  color: "#5a534d",
  toast:true,
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
  html: '<b>  남은 할 일 만큼은 최선을 다해봐요🔥🔥 </b>',
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  },
});

const SwalBuzyTmr = () => Swal.fire({
  background: '#ffd url(https://lazy-note.s3.ap-northeast-2.amazonaws.com/FAF0E6.png.jpg)',
  imageUrl: 'https://lazy-note.s3.ap-northeast-2.amazonaws.com/worrying.gif',
  width: 430,
  template: '#my-template',
  color: "#86776a",
  toast:true,
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
  html: '<b>  이러다가 내일 진짜 바빠지겠어요 😵‍💫</b>',
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
});

export { SwalCheer, SwalBuzyTmr }