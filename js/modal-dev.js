const t = window.TrelloPowerUp.iframe({targetOrigin: "http://localhost:2999/"});

  t.lists("all").then(function (lists) {
      console.log(JSON.stringify(lists, null, 2));
  }).catch(e => console.error(e));

t.render(() => {
  console.log(t.getContext());
  t.lists("all").then(function (lists) {
      console.log(JSON.stringify(lists, null, 2));
  }).then(function () {
    return t.sizeTo('#content');
  }).catch(e => console.error(e));
  document.getElementById('buttonToClick').addEventListener('click', (e) => {
    console.log('Popup button clicked');
    t.popup({
        type: 'confirm',
        title: 'confirm from button',
        message: 'Confirm?',
        confirmText: 'Confirm!',
        onConfirm: function(t, opts) => {
          console.log('CONFIRMED!');
        },
        confirmStyle: 'primary',
    });
  });
});
