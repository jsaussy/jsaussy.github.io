const targetOrigin = document.referrer === 'http://localhost:2999' ? document.referrer : 'https://trellis.coffee/';

const cardBadges = function (t, opts) {
              return [{
                dynamic: function() {
                    const rand = (Math.random() * 100).toFixed(0).toString();
                    t.set('card', 'shared', 'random', rand);
                    return {
                        text: 'badge',
                        icon: "https://jsaussy.github.io/icon-gray.svg",
                        color: "red",
                    };
                }
            }];
};

TrelloPowerUp.initialize(
  {
    "card-badges": cardBadges,
  },
  { targetOrigin: targetOrigin }
);
