
document.addEventListener('DOMContentLoaded', function () {
  // Mobile nav
  const burger = document.querySelector('.burger');
  const nav = document.getElementById('menu');
  if (burger && nav) {
    burger.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      burger.setAttribute('aria-expanded', String(open));
    });
  }

  // Cookie banner
  const banner = document.getElementById('cookie-banner');
  const accept = document.getElementById('cookie-accept');
  console.log('cookie-banner:', banner);
  console.log('cookie-accept:', accept);
  try {
    if (banner && accept) {
      if (!localStorage.getItem('cookieAccepted')) {
  banner.style.display = 'flex';
        console.log('Bannière affichée');
      }
      accept.addEventListener('click', () => {
        console.log('Bouton accepter cliqué');
        localStorage.setItem('cookieAccepted', '1');
  banner.style.display = 'none';
      });
    } else {
      console.log('Bannière ou bouton non trouvé');
    }
  } catch(e) { 
    console.log('Erreur JS bannière cookies', e);
  }

  // Prefill service from querystring
  const params = new URLSearchParams(location.search);
  const svc = params.get('service');
  const svcSelect = document.getElementById('service');
  if (svc && svcSelect) {
    for (const opt of svcSelect.options) {
      if (opt.value === svc) { opt.selected = true; break; }
    }
  }

  // Contact form handling
  const form = document.getElementById('contact-form');
  if (form) {
    const feedback = document.getElementById('form-feedback');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Honeypot check
      const honey = form.querySelector('input[name="website"]');
      if (honey && honey.value.trim() !== '') {
        feedback.textContent = "Merci !";
        return; // silently drop
      }

      // Basic client-side validation
      if (!form.reportValidity()) return;

      // reCAPTCHA placeholder: integrate v2 Invisible or v3 here if needed.

      try {
        const data = new FormData(form);
        const res = await fetch(form.action, {
          method: 'POST',
          headers: { 'Accept': 'application/json' },
          body: data
        });
        if (res.ok) {
          feedback.textContent = "Message envoyé. Nous vous répondrons rapidement.";
          form.reset();
        } else {
          feedback.textContent = "Une erreur est survenue. Réessayez plus tard.";
        }
      } catch (err) {
        feedback.textContent = "Réseau indisponible. Vérifiez votre connexion.";
      }
    });
  }
  });
