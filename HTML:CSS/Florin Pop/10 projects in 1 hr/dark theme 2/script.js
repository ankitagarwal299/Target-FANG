const toggle = document.getElementById('checkbox');

toggle.addEventListener('change', (e) => {
    document.body.classList.toggle('dark')
})