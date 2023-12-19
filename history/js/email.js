const $mailWrap = document.querySelector('#email-section .form-wrap');
const $mailForm = $mailWrap.querySelector('form');
const $sendButton = $mailWrap.querySelector('button');
const $sendLoading = document.querySelector('#email-section .send__loading');
const $sendSuccess = document.querySelector('#email-section .send__success');

const $mobileEmailForm = document.querySelector("#mobile--email .form-wrap");
const $mobileLoading = $mobileEmailForm.querySelector(".send__loading");
const $mobileSendSuccess = $mobileEmailForm.querySelector(".send__success");
// 이건 사실 숨겨야 하는디..
emailjs.init('C01RPPzdk0LpHSE8o');

$mailForm.addEventListener('submit', (e)=>{
  e.preventDefault();
  
  if(!validate(e.target)) return;
  $sendLoading.style.display = 'block';
  emailjs.sendForm('service_ve5g14c', 'template_9e20roe', e.target)
  .then(()=>{
    console.log('success');
    $sendLoading.style.display = 'none';
    $sendSuccess.style.display = 'block';
  }, (err)=>{
    $sendLoading.style.display = 'none';
    console.log(err);
  })
  $mailWrap.style.animation = `ani-paper 1.5s linear forwards`
})

$mobileEmailForm.addEventListener('submit', (e)=>{
  e.preventDefault();
  console.log("mobile")
  
  if(!validate(e.target)) return;
  $mobileLoading.style.display = 'block';
  emailjs.sendForm('service_ve5g14c', 'template_9e20roe', e.target)
  .then(()=>{
    console.log('success');
    $mobileLoading.style.display = 'none';
    $mobileSendSuccess.style.display = 'block';
    e.target.from.disabled = true;
    e.target.message.disabled = true;
    e.target.querySelector('button').disabled = true;
  }, (err)=>{
    $mobileLoading.style.display = 'none';
    e.target.from.disabled = false;
    e.target.message.disabled = false;
    console.log(err);
  })
})





//from, message
function validate(form){
  if (form.from.value.length > 32) return false;
  if (form.message.value.length > 200) return false;

  if (form.from.value.trim().length === 0) return false;
  if (form.message.value.trim().length === 0) return false;

  return true;
}
