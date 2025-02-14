// allow pasting

const buttons = document.querySelectorAll('input[type="submit"][name="commit"][value="Follow"][data-disable-with="Follow"]');
buttons.forEach(button => button.click())
const nextButton = document.querySelector('.pagination a:nth-child(2)');
if (nextButton && nextButton.textContent.trim() === 'Next') {
  nextButton.click();
}