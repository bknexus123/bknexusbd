const menu = document.querySelector('.menu');
const links = document.querySelector('.navlinks');
if (menu && links) {
  menu.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    menu.setAttribute('aria-expanded', String(open));
    menu.textContent = open ? '×' : '☰';
  });
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    links.classList.remove('open');
    menu.setAttribute('aria-expanded','false');
    menu.textContent='☰';
  }));
}
const here = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.navlinks a').forEach(a => {
  if ((a.getAttribute('href')||'') === here) a.classList.add('active');
});
