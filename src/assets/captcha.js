let generatedCaptcha = '';

function generateCaptcha() {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  generatedCaptcha = '';
  for (let i = 0; i < 6; i++) {
    generatedCaptcha += charset.charAt(Math.floor(Math.random() * charset.length));
  }

  const codeField = document.getElementById('captchaCode');
  const inputField = document.getElementById('userCaptcha');
  const message = document.getElementById('captchaMessage');
  const verifyBtn = document.getElementById('verifyButton');

  if (codeField && inputField && message && verifyBtn) {
    codeField.value = generatedCaptcha;
    inputField.value = '';
    message.textContent = '';
    message.style.color = '';
    verifyBtn.disabled = true;
  }
}

function verifyCaptcha() {
  const userInput = document.getElementById('userCaptcha')?.value?.trim();
  const message = document.getElementById('captchaMessage');

  if (!userInput) {
    message.textContent = '❗ Please enter the CAPTCHA.';
    message.style.color = 'orange';
  } else if (userInput === generatedCaptcha) {
    message.textContent = '✅ CAPTCHA matched!';
    message.style.color = 'green';
  } else {
    message.textContent = '❌ Incorrect CAPTCHA. Please try again.';
    message.style.color = 'red';
  }
} 
function handleCaptchaInput(){
  const input = document.getElementById('userCaptcha');
  const verifyBtn = document.getElementById('verifyButton');
  if (input && verifyBtn) {
    verifyBtn.disabled = input.value.trim().length !== 6;
  }
}

window.onload = function () {
  generateCaptcha();

  const captchaInput = document.getElementById('userCaptcha');
  if (captchaInput) {
    captchaInput.addEventListener('input', handleCaptchaInput);
  }
};
