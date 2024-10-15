document.addEventListener('DOMContentLoaded', () => {
  fetch('footer.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('footer').innerHTML = data;
    })
    .catch(error => {
      console.error('Error loading footer:', error);
    });
});
// ********************* footer team modal ********************************

const openModalTeamBtns = document.querySelectorAll('.team-link');
const closeModalTeamBtns = document.querySelectorAll('[data-modal-team-close]');
const modalTeam = document.querySelector('.modal-team-container');
const modalTeamBack = document.querySelector('.modal-team-backdrop');

openModalTeamBtns.forEach(openModalTeamBtn => {
  openModalTeamBtn.addEventListener('click', toggleModalTeam);
});

closeModalTeamBtns.forEach(closeModalTeamBtn => {
  closeModalTeamBtn.addEventListener('click', toggleModalTeam);
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    modalTeam.classList.add('is-hidden');
    modalTeamBack.classList.add('is-hidden');
  }
});

document.addEventListener('click', e => {
  if (e.target === modalTeam) {
    modalTeam.classList.add('is-hidden');
    modalTeamBack.classList.add('is-hidden');
  }
});

function toggleModalTeam() {
  modalTeam.classList.toggle('is-hidden');
  modalTeamBack.classList.toggle('is-hidden');
}
