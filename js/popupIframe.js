/* global TrelloPowerUp */


const t = window.TrelloPowerUp.iframe({targetOrigin: "http://localhost:2999/"});

t.render(() => {
  document.getElementById("buttonToClick").addEventListener('click', (event) => {
    t.popup({
        type: 'confirm',
        title: 'Confirm?',
        message: 'this is a confirm popup',
        confirmText: 'Confirm',
        onConfirm: function(t, opts) {
          console.log('CONFIRM');
        },
        confirmStyle: 'primary'
    });
  });
});
