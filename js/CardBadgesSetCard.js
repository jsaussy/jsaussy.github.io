const targetOrigin = document.referrer === 'http://localhost:2999' ? document.referrer : 'https://trellis.coffee/';

const cardBadges = function (t, opts) {
              return [{
                dynamic: function() {
                    const rand = (Math.random() * 100).toFixed(0).toString();
                    //t.set('card', 'shared', 'random', rand);
                    return {
                        text: 'badge',
                        icon: "https://jsaussy.github.io/icon-gray.svg",
                        color: "red",
                    };
                }
            }];
};

const boardButtons = function (t, opts) {
  return [
              {
              text: "Set data",
              icon: {
                dark: "https://jsaussy.github.io/icon-gray.svg",
                light: "https://jsaussy.github.io/icon-gray.svg",
              },
              callback: (t) => {
                t.cards('all').then((cards) => {
                  cards?.map((card) => {
                    console.log(JSON.stringify(card, null, 2));
                  });
                });
              },
          },
    ];
};

TrelloPowerUp.initialize(
  {
    "card-badges": cardBadges,
    "board-buttons": boardButtons,
  },
  { targetOrigin: targetOrigin }
);
