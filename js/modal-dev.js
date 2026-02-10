const t = window.TrelloPowerUp.iframe({
  targetOrigin: 'http://localhost:2999/',
});

let pluginData;

t.lists('all')
  .then(function (lists) {
    console.log(JSON.stringify(lists, null, 2));
  })
  .catch((e) => console.error(e));

t.render(() => {
  console.log(t.getContext());
  t.lists('all')
    .then(function (lists) {
      console.log(JSON.stringify(lists, null, 2));
    })
    .then(function () {
      return t.sizeTo('#content');
    })
    .catch((e) => console.error(e));
  document.getElementById('buttonToClick').addEventListener('click', (e) => {
    console.log('Popup button clicked');
    t.popup({
      type: 'confirm',
      title: 'confirm from button',
      message: 'Confirm?',
      confirmText: 'Confirm!',
      onConfirm(t, opts) {
        console.log('CONFIRMED!');
      },
      confirmStyle: 'primary',
      mouseEvent: e,
    });
  });

  document.getElementById('reset-shared-board')?.addEventListener('click', () => {
    console.log('reset board shared clicked');
    t.set('board', 'shared', 'stored', 0);
  });
  document.getElementById('reset-private-board')?.addEventListener('click', () => {
    console.log('reset board privaet clicked');
    t.set('board', 'private', 'stored', 0);
  });
  document.getElementById('reset-shared-card')?.addEventListener('click', () => {
    console.log('reset card shared clicked');
    t.set('card', 'shared', 'stored', 0);
  });
  document.getElementById('reset-private-card')?.addEventListener('click', () => {
    console.log('reset card privaet clicked');
    t.set('card', 'private', 'stored', 0);
  });
  document.getElementById('reset-shared-member')?.addEventListener('click', () => {
    console.log('reset member shared clicked');
    t.set('member', 'shared', 'stored', 0);
  });
  document.getElementById('reset-private-member')?.addEventListener('click', () => {
    console.log('reset member privaet clicked');
    t.set('member', 'private', 'stored', 0);
  });
  document.getElementById('reset-shared-org')?.addEventListener('click', () => {
    console.log('reset org shared clicked');
    t.set('organization', 'shared', 'stored', 0);
  });
  document.getElementById('reset-private-org')?.addEventListener('click', () => {
    console.log('reset org privaet clicked');
    t.set('organization', 'private', 'stored', 0);
  });

  t.getAll().then((data) => {
    const updateElement = (id, newContent, val) => {
      if (val) {
        const element = document.getElementById(id);
        if (element) {
          element.textContent = `${newContent} ${val}`;
        }
      }
    };
    console.log(JSON.stringify(data, null, 2));
    pluginData = data;
    const { board, organization, member, card } = data;
    updateElement('shared-board', 'Shared board data:', board?.shared?.stored);
    updateElement('private-board', 'Private board data:', board?.private?.stored);
    updateElement('shared-card', 'Shared card data:', card?.shared?.stored);
    updateElement('private-card', 'Private card data:', card?.private?.stored);
    updateElement('shared-member', 'Shared member data:', member?.shared?.stored);
    updateElement('private-member', 'Private member data:', member?.private?.stored);
    updateElement('shared-org', 'Shared org data:', organization?.shared?.stored);
    updateElement('private-org', 'Private org data:', organization?.private?.stored);
    document.getElementById('increase-shared-board')?.addEventListener('click', () => {
      console.log('increase board shared clicked');
      t.set('board', 'shared', 'stored', (pluginData.board?.shared?.stored ?? 0) + 1);
    });
    document.getElementById('increase-private-board')?.addEventListener('click', () => {
      console.log('increase board private clicked');
      t.set('board', 'private', 'stored', (pluginData.board?.private?.stored ?? 0) + 1);
    });

    document.getElementById('increase-shared-card')?.addEventListener('click', () => {
      console.log('increase card shared clicked');
      t.set('card', 'shared', 'stored', (pluginData.card?.shared?.stored ?? 0) + 1);
    });
    document.getElementById('increase-private-card')?.addEventListener('click', () => {
      console.log('increase card private clicked');
      t.set('card', 'private', 'stored', (pluginData.card?.private?.stored ?? 0) + 1);
    });

    document.getElementById('increase-shared-member')?.addEventListener('click', () => {
      console.log('increase member shared clicked');
      t.set('member', 'shared', 'stored', (pluginData.member?.shared?.stored ?? 0) + 1);
    });
    document.getElementById('increase-private-member')?.addEventListener('click', () => {
      console.log('increase member private clicked');
      t.set('member', 'private', 'stored', (pluginData.member?.private?.stored ?? 0) + 1);
    });

    document.getElementById('increase-shared-org')?.addEventListener('click', () => {
      console.log('increase org shared clicked');
      t.set('org', 'shared', 'stored', (pluginData.organization?.shared?.stored ?? 0) + 1);
    });
    document.getElementById('increase-private-org')?.addEventListener('click', () => {
      console.log('increase org private clicked');
      t.set('org', 'private', 'stored', (pluginData.organization?.private?.stored ?? 0) + 1);
    });
  });
});
