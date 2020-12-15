const btn = document.getElementById('btn');
const container = document.getElementById('container');

btn.addEventListener('click', () => {
    createNotifications();
});

function createNotifications() {
    const notif = document.createElement('div');
    notif.classList.add('toast');

    notif.innerText = 'Successfully';

    container.appendChild(notif);

    setTimeout(() => {
        notif.remove();
    }, 3000);
}