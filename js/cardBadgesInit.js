/* global TrelloPowerUp */

var Promise = TrelloPowerUp.Promise;

const cardDetailBadges = function (t, opts) {
    let cardAttachments = opts.attachments; // Trello passes you the attachments on the card
    return t
      .card("name")
      .get("name")
      .then(function (cardName) {
        console.log("We just loaded the card name for fun: " + cardName);
        return [
          {
            // Dynamic badges can have their function rerun
            // after a set number of seconds defined by refresh.
            // Minimum of 10 seconds.
            dynamic: function () {
              // we could also return a Promise that resolves to
              // this as well if we needed to do something async first
              return {
                text: "Dynamic " + (Math.random() * 100).toFixed(0).toString(),
                icon: "https://jsaussy.github.io/icon-gray.svg",
                color: "green",
                refresh: 10, // in seconds
              };
            },
          },
            {
                dynamic: function() {
                    return {
                        text: cardName,
                        icon: "https://jsaussy.github.io/icon-gray.svg",
                        color: "red",
                    };
                }
            },
          {
            // It's best to use static badges unless you need your
            // badges to refresh.
            // You can mix and match between static and dynamic
            text: "Static Red",
            icon: "https://jsaussy.github.io/icon-gray.svg",
            color: "red",
          },
          {
            text: "Yellow",
            icon: "https://jsaussy.github.io/icon-gray.svg",
            color: "yellow",
          },
          {
            text: "Blue",
            icon: "https://jsaussy.github.io/icon-gray.svg",
            color: "blue",
          },
          {
            text: "Orange",
            icon: "https://jsaussy.github.io/icon-gray.svg",
            color: "orange",
          },
          {
            text: "Purple",
            icon: "https://jsaussy.github.io/icon-gray.svg",
            color: "purple",
          },
          {
            text: "Pink",
            icon: "https://jsaussy.github.io/icon-gray.svg",
            color: "pink",
          },
          {
            text: "Sky",
            icon: "https://jsaussy.github.io/icon-gray.svg",
            color: "sky",
          },
          {
            text: "Lime",
            icon: "https://jsaussy.github.io/icon-gray.svg",
            color: "lime",
          },
          {
            text: "Light Gray",
            icon: "https://jsaussy.github.io/icon-gray.svg",
            color: "light-gray",
          },
          {
            text: "Monochrome",
            icon: "https://jsaussy.github.io/error.svg",
            color: "light-gray",
            monochrome: true,
          },
          {
            text: "Not monochrome",
            icon: "https://jsaussy.github.io/error.svg",
            color: "light-gray",
            monochrome: false,
          },
        ];
      });
  };

TrelloPowerUp.initialize(
  {
    "card-badges": cardDetailBadges,
  },
  { targetOrigin: "https://trellis.coffee/" }
);
