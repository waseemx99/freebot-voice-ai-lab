const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-button');
const mobileMenu = document.getElementById('mobile-menu');

function updateHeader() {
  header.classList.toggle('scrolled', window.scrollY > 8);
}

updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

if (menuButton && mobileMenu) {
  menuButton.addEventListener('click', () => {
    const expanded = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!expanded));
    mobileMenu.hidden = expanded;
  });

  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menuButton.setAttribute('aria-expanded', 'false');
      mobileMenu.hidden = true;
    });
  });
}

function text(id, value, className) {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = value;
  if (className) {
    el.classList.remove('status-ok', 'status-warn', 'status-off');
    el.classList.add(className);
  }
}

async function loadStatus() {
  try {
    const response = await fetch('/api/status', { headers: { accept: 'application/json' } });
    if (!response.ok) throw new Error('status unavailable');

    const status = await response.json();
    const aiEnabled = Boolean(status?.ai?.enabled);
    const secure = Boolean(status?.configuration?.webhookSecurityReady);

    text('hero-status', 'Local service is responding');
    text('runtime-badge', 'Online', 'status-ok');
    text('status-app', status?.app || 'Freebot Voice AI Lab');
    text('status-voice', status?.voice || 'Twilio Programmable Voice');
    text('status-ai', aiEnabled ? (status?.ai?.model || 'Enabled') : 'Disabled', aiEnabled ? 'status-ok' : 'status-off');
    text('status-security', secure ? 'Configured' : 'Local / not configured', secure ? 'status-ok' : 'status-warn');
  } catch {
    text('hero-status', 'Static preview');
    text('runtime-badge', 'Preview', 'status-off');
    text('status-app', 'Static website preview');
    text('status-voice', 'Available when app is running');
    text('status-ai', 'Available when app is running', 'status-off');
    text('status-security', 'Available when app is running', 'status-off');
  }
}

loadStatus();
