/* PALA citation interaction; progressive enhancement over readable HTML. */
(() => {
  const button = document.getElementById('copy-bibtex');
  const citation = document.getElementById('bibtex');
  const status = document.getElementById('copy-status');
  if (!button || !citation || !status) return;
  button.hidden = false;
  button.addEventListener('click', async () => {
    button.disabled = true;
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(citation.textContent.trim());
      status.textContent = 'Citation copied to clipboard.';
    } catch {
      const selection = window.getSelection();
      if (selection) {
        const range = document.createRange();
        range.selectNodeContents(citation);
        selection.removeAllRanges();
        selection.addRange(range);
      }
      status.textContent = 'Please copy the selected citation using Ctrl+C or Command+C.';
    } finally {
      button.disabled = false;
    }
  });
})();

// Keep the image link usable when native dialogs or JavaScript are unavailable.
(() => {
  const trigger = document.getElementById('wechat-trigger');
  const dialog = document.getElementById('wechat-dialog');
  if (!trigger || !dialog || typeof dialog.showModal !== 'function') return;
  trigger.setAttribute('aria-haspopup', 'dialog');
  trigger.addEventListener('click', (event) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    dialog.showModal();
  });
  dialog.addEventListener('click', (event) => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right ||
        event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => trigger.focus());
})();

(() => {
  const trigger = document.getElementById('email-trigger');
  const dialog = document.getElementById('email-dialog');
  const address = document.getElementById('contact-email');
  const copy = document.getElementById('copy-email');
  const status = document.getElementById('email-copy-status');
  if (!trigger || !dialog || !address || !copy || !status) return;
  trigger.addEventListener('click', () => {
    status.textContent = '';
    if (typeof dialog.showModal === 'function') dialog.showModal();
    else window.location.href = address.href;
  });
  dialog.addEventListener('click', (event) => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right ||
        event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => trigger.focus());
  copy.addEventListener('click', async () => {
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(address.textContent.trim());
      status.textContent = 'Email copied to clipboard.';
    } catch {
      const selection = window.getSelection();
      if (selection) {
        const range = document.createRange();
        range.selectNodeContents(address);
        selection.removeAllRanges();
        selection.addRange(range);
      }
      status.textContent = 'Please copy the selected address using Ctrl+C or Command+C.';
    }
  });
})();
