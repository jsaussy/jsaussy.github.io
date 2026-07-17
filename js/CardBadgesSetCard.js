const targetOrigin = document.referrer === 'http://localhost:2999' ? document.referrer : 'https://trellis.coffee/';

const cardBadges = function (t, opts) {
  const rand = (Math.random() * 100).toFixed(0).toString();
  t.set('card', 'shared', 'random', rand);
};

TrelloPowerUp.initialize(
  {
    "card-badges": cardBadges,
  },
  { targetOrigin: targetOrigin }
);
