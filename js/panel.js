const t = window.TrelloPowerUp.iframe({targetOrigin: "http://localhost:2999/"});

  t.lists("all").then(function (lists) {
      document.getElementById('list').innerHTML = "Here's a list of cards on this board:";
      lists.map(({list}) => {
        if (!list) {
          return;
        }
        list.cards?.map(({card}) => {
          if (!card) {
            return;
          }
          const cardEl = document.createElement('div');
          cardEl.appendChild(document.createTextNode(card.name ?? ''));
          document.getElementById('list').appendChild(cardEl);
        });
      }
    );
  }).catch(e => console.error(e));
