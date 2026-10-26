/**
 * Yudhit Widy Wicaksono - Content & Source Protection Layer
 * Prevents text selection, right-click context menu, image dragging,
 * inspect shortcuts (F12, Ctrl+Shift+I/J/C, Ctrl+U), and unauthorized copying.
 */
(function () {
  'use strict';

  // Create & inject security notification toast
  var toast = null;
  var toastTimer = null;

  function showSecurityToast(message) {
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'security-toast';
      toast.className = 'security-toast';
      document.body.appendChild(toast);
    }
    toast.innerHTML = '<i class="fa fa-shield" style="color: #38bdf8; margin-right: 8px;"></i>' +
      '<span>' + (message || 'Content and source code are protected from copying.') + '</span>';
    toast.classList.add('show');

    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toast.classList.remove('show');
    }, 2400);
  }

  // 1. Disable Right-Click Context Menu
  document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
    showSecurityToast('Right-click is disabled to protect content.');
    return false;
  }, { capture: true });

  // 2. Disable Copy, Cut, Paste
  document.addEventListener('copy', function (e) {
    e.preventDefault();
    showSecurityToast('Text and asset copying is disabled.');
    return false;
  }, { capture: true });

  document.addEventListener('cut', function (e) {
    e.preventDefault();
    return false;
  }, { capture: true });

  document.addEventListener('paste', function (e) {
    e.preventDefault();
    return false;
  }, { capture: true });

  // 3. Disable Dragging (Images, Links, Text)
  document.addEventListener('dragstart', function (e) {
    e.preventDefault();
    return false;
  }, { capture: true });

  // 4. Disable Text Selection via Events
  document.addEventListener('selectstart', function (e) {
    var tag = e.target && e.target.tagName ? e.target.tagName.toLowerCase() : '';
    if (tag !== 'input' && tag !== 'textarea') {
      e.preventDefault();
      return false;
    }
  }, { capture: true });

  // 5. Block Key Combinations (F12, Ctrl+U, Ctrl+Shift+I/J/C, Ctrl+S, Ctrl+A, Ctrl+C, Ctrl+P)
  document.addEventListener('keydown', function (e) {
    var isCtrlOrCmd = e.ctrlKey || e.metaKey;
    var key = e.key ? e.key.toLowerCase() : '';
    var keyCode = e.keyCode || e.which;

    // F12
    if (keyCode === 123 || key === 'f12') {
      e.preventDefault();
      e.stopPropagation();
      showSecurityToast('Developer tools access is disabled.');
      return false;
    }

    // Ctrl/Cmd + Shift + I / J / C (DevTools & Inspect)
    if (isCtrlOrCmd && e.shiftKey && (key === 'i' || key === 'j' || key === 'c' || keyCode === 73 || keyCode === 74 || keyCode === 67)) {
      e.preventDefault();
      e.stopPropagation();
      showSecurityToast('Inspect element is disabled.');
      return false;
    }

    // Ctrl/Cmd + U (View Source)
    if (isCtrlOrCmd && (key === 'u' || keyCode === 85)) {
      e.preventDefault();
      e.stopPropagation();
      showSecurityToast('View source is disabled.');
      return false;
    }

    // Ctrl/Cmd + S (Save Page)
    if (isCtrlOrCmd && (key === 's' || keyCode === 83)) {
      e.preventDefault();
      e.stopPropagation();
      showSecurityToast('Saving page is disabled.');
      return false;
    }

    // Ctrl/Cmd + P (Print to PDF / Print)
    if (isCtrlOrCmd && (key === 'p' || keyCode === 80)) {
      e.preventDefault();
      e.stopPropagation();
      showSecurityToast('Printing page is disabled.');
      return false;
    }

    // Ctrl/Cmd + A (Select All)
    if (isCtrlOrCmd && (key === 'a' || keyCode === 65)) {
      var activeTag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
      if (activeTag !== 'input' && activeTag !== 'textarea') {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    }

    // Ctrl/Cmd + C (Copy)
    if (isCtrlOrCmd && (key === 'c' || keyCode === 67)) {
      var activeElTag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
      if (activeElTag !== 'input' && activeElTag !== 'textarea') {
        e.preventDefault();
        e.stopPropagation();
        showSecurityToast('Copying content is disabled.');
        return false;
      }
    }
  }, { capture: true });

  // 6. Console Security Warning
  try {
    var titleStyle = 'font-size: 26px; font-weight: 800; color: #ef4444; text-shadow: 0 0 10px rgba(239, 68, 68, 0.4); padding: 8px 0;';
    var textStyle = 'font-size: 14px; font-family: sans-serif; color: #94a3b8; line-height: 1.6;';
    var brandStyle = 'font-size: 13px; font-weight: bold; color: #38bdf8;';

    console.log('%c⚠️ SECURITY NOTICE: PROTECTED ASSETS', titleStyle);
    console.log('%cAll content, design, and code on this portfolio are the intellectual property of Yudhit Widy Wicaksono.\nUnauthorized copying, distribution, or reproduction is strictly prohibited.', textStyle);
    console.log('%c© ' + new Date().getFullYear() + ' Yudhit Widy Wicaksono. All rights reserved.', brandStyle);
  } catch (err) {
    // Silent fail if console is suppressed
  }
})();
