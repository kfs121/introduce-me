const $mailWrap = document.querySelector('#email-section .form-wrap');
const $mailForm = $mailWrap.querySelector('form');
const $sendButton = $mailFormWrap.querySelector('button');
emailjs.init('C01RPPzdk0LpHSE8o');

$mailForm.addEventListener('submit', (e)=>{
  e.preventDefault();
  
  if(!validate(e.target)) return;

  emailjs.sendForm('service_ve5g14c', 'template_9e20roe', e.target)
  .then(()=>{
    console.log('success');
  }, (err)=>{
    console.log(err);
  })
  $mailWrap.style.animation = `ani-paper 1.5s linear forwards`
})


//from, message
function validate(form){
  if (form.from.value.length > 32) return false;
  if (form.message.value.length > 200) return false;

  if (form.from.value.trim().length === 0) return false;
  if (form.message.value.trim().length === 0) return false;

  return true;
}
