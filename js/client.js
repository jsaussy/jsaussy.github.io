/* global TrelloPowerUp */

var Promise = TrelloPowerUp.Promise;

function cardDetailBadges(trello, options) {
    return [
        // testButton(trello),
        {
            title: "Detail badge",
            text: "Static",
            color: "green"
        },
        {
            dynamic: function () {
                return {
                    title: "Dynamic detail badge",
                    text: "Dynamic "  + (Math.random() * 100).toFixed(0).toString(),
                    color: "red",
                };
            },
            refresh: 10,
        }
    ]
}

function testButton(trello) {
    return {
        text: "☝ Test",
        title: "TEST API IDLE",
        color: 'red',
        callback: () => {
            alert('test');
        }
    }
} 

const cardBadges = function (t, opts) {
  return t.card("name")
  .get("name")
  .then(function (cardName) {
    const parts = cardName.split(" ");
    if (parts.length !== 3) {
      return [];
    }
    const [color, type ] = parts;
    const badge = {
      icon: "https://jsaussy.github.io/icon-gray.svg",
    };
    if (type === 'static') {
      badge.text = 'Static';
    } else if (type === 'dynamic') {
      badge.text = 'Dynamic ' + (Math.random() * 100).toFixed(0).toString();
    } else {
      return [];
    }
    if (['red', 'green', 'blue', 'yellow', 'purple', 'orange', 'pink', 'sky', 'lime', 'light-gray'].includes(color.toLowerCase())) {
      badge.color = color.toLowerCase();
    }
    if (type === 'dynamic') {
      return [{dynamic: function(){return badge}, refresh: 10}];
    }
    return [badge];
  });
};

const saveAttachment = function (t, options) {
    return {
      callback: function (t, opts) {
        console.log('Save!');
      },
    };
  };

var formatNPSUrl = function (t, url) {
  if (!/^https?:\/\/www\.nps\.gov\/[a-z]{4}\//.test(url)) {
    return null;
  }
  var parkShort = /^https?:\/\/www\.nps\.gov\/([a-z]{4})\//.exec(url)[1];
  if (parkShort && parkMap[parkShort]) {
    return parkMap[parkShort];
  } else {
    return null;
  }
};

TrelloPowerUp.initialize(
  {
        "attachment-thumbnail": function (t, options) {
    var parkName = formatNPSUrl(t, options.url);
    if (parkName){
      return {
        title: parkName,
        image: {
          url: 'https://jsaussy.github.io/nps.svg',
          logo: true
        }
      };
    } else {
      throw t.NotHandled();
    }
  },
            "attachment-sections": function(t, options){
    var claimed = options.entries.filter(function (attachment) {
      return attachment.url.indexOf('https://www.nps.gov/yell/') === 0;
    });

    if (claimed && claimed.length > 0) {
      return [{
        id: 'Yellowstone',
        claimed: claimed,
        icon: "https://jsaussy.github.io/icon-gray.svg",
        title: 'Example Attachment Section: Yellowstone',
        content: {
          type: 'iframe',
          url: t.signUrl('./section-staging.html', {
            arg: 'you can pass your section args here'
          }),
          height: 230
        }
      }];
    } else {
      return [];
    }
  },
          "card-back-section": function(t, options){
    return {
      title: 'My Card Back Section',
      icon: "https://jsaussy.github.io/icon-gray.svg",
      content: {
        type: 'iframe',
        url: t.signUrl('./cardBackSection.html'),
        height: 230,
      },
      action: {
        text: 'My Action',
        callback: (t) => t.popup({
              title: "Popover",
              type: "confirm",
              message: "Confirm?",
              confirmText: "Confirm!",
              onConfirm: () => {
                console.log("confirm");
              },
            }),
      }
    };
  },
    "card-badges": cardBadges,
    "card-detail-badges": cardDetailBadges,
    "save-attachment": saveAttachment,
    "list-actions": function (t) {
        return t.list('name', 'id')
            .then(function (list) {
              return [{
                text: "Get List Stats",
                callback: function (t) {
                    return t.popup({
                      title: "Confirm",
                      type: "confirm",
                      message: "Confirm?",
                      confirmText: "Confirm!",
                      onConfirm: () => {
                        console.log("confirm");
                      },
                    });
                }
              }];
        });
  },
    "list-sorters": function (t) {
        return t.list('name', 'id')
            .then(function (list) {
              return [{
                text: "Card Description",
                callback: function (t, opts) {
                  // Trello will call this if the user clicks on this sort
                  // opts.cards contains all card objects in the list
                  var sortedCards = opts.cards.sort(
                    function(a,b) {
                      if (a.name > b.name) {
                        return 1;
                      } else if (b.name > a.name) {
                        return -1;
                      }
                      return 0;
                    });

                  return {
                    sortedIds: sortedCards.map(function (c) { return c.id; })
                  };
            }
      }];
    });
  },
    "card-buttons": function (t, options) {
      return [
        {
          text: "Open confirm",
          callback: function (t) {
            return t.popup({
              title: "Confirm",
              type: "confirm",
              message: "Confirm?",
              confirmText: "Confirm!",
              onConfirm: () => {
                console.log("confirm");
              },
            });
          },
        },
        {
          text: "Open date",
          callback: function (t) {
            t.popup({
              type: "date",
              title: "DaTE!!!!",
              callback: function (t, opts) {
                console.log(opts.date);
              },
            });
          },
        },
        {
          text: "Open datetime",
          callback: function (t) {
            t.popup({
              type: "datetime",
              title: "DaTETime!!!!",
              callback: function (t, opts) {
                console.log(opts.date);
              },
            });
          },
        },
      ];
    },
    "board-buttons": function (t, options) {
      return [
        {
          text: "Open confirm",
                      icon: {
            dark: "https://jsaussy.github.io/icon-gray.svg",
            light: "https://jsaussy.github.io/icon-gray.svg",
          },
          callback: function (t) {
            return t.popup({
              title: "Confirm",
              type: "confirm",
              message: "Confirm?",
              confirmText: "Confirm!",
              onConfirm: () => {
                console.log("confirm");
              },
            });
          },
        },
        {
          text: "Open list",
                      icon: {
            dark: "https://jsaussy.github.io/icon-gray.svg",
            light: "https://jsaussy.github.io/icon-gray.svg",
          },
          callback: function (t) {
            return t.popup({
              title: "List!",
              items: [
                {
                  text: "Item 1",
                  callback: function (t, opts) {
                    console.log("Item 1");
                  },
                },
                {
                  text: "Item 2",
                  callback: function (t, opts) {
                    console.log("Item 2");
                  },
                },
                {
                  text: "Item 3",
                  callback: function (t, opts) {
                    console.log("Item 3");
                  },
                },
              ],
            });
          },
        },
        {
          text: "Open Modal",
          icon: {
            dark: "https://jsaussy.github.io/icon-gray.svg",
            light: "https://jsaussy.github.io/icon-gray.svg",
          },
          callback: function (t) {
            return t.modal({
              url: "./modal.html",
              args: { text: "Hello" },
              accentColor: "#F2D600",
              fullscreen: true,
              callback: () => console.log("Goodbye."),
              title: "This is a modal",
              actions: [
                {
                  url: "https://google.com",
                  alt: "Leftmost",
                  position: "left",
                },
                {
                  callback: () => console.log(":tada:"),
                  alt: "Right side",
                  position: "right",
                },
              ],
            });
          },
        },
        {
          text: "Open board bar",
          icon: {
            dark: "https://jsaussy.github.io/icon-gray.svg",
            light: "https://jsaussy.github.io/icon-gray.svg",
          },
          callback: function (t) {
            return t.boardBar({
              url: "./modal.html",
              args: { text: "Hello" },
              accentColor: "#F2D600",
              fullscreen: true,
              callback: () => console.log("Goodbye."),
              title: "This is a board bar",
              actions: [
                {
                  url: "https://google.com",
                  alt: "Leftmost",
                  position: "left",
                },
                {
                  callback: () => console.log(":tada:"),
                  alt: "Right side",
                  position: "right",
                },
              ],
            });
          },
        },
                {
          text: "Open board bar (resizable)",
          icon: {
            dark: "https://jsaussy.github.io/icon-gray.svg",
            light: "https://jsaussy.github.io/icon-gray.svg",
          },
          callback: function (t) {
            return t.boardBar({
              url: "./modal.html",
              args: { text: "Hello" },
              accentColor: "#F2D600",
              fullscreen: true,
              callback: () => console.log("Goodbye."),
              title: "This is a board bar",
              resizable: true,
              actions: [
                {
                  url: "https://google.com",
                  alt: "Leftmost",
                  position: "left",
                },
                {
                  callback: () => console.log(":tada:"),
                  alt: "Right side",
                  position: "right",
                },
              ],
            });
          },
        },
                {
          text: "Open Popup iframe",
          icon: {
            dark: "https://jsaussy.github.io/icon-gray.svg",
            light: "https://jsaussy.github.io/icon-gray.svg",
          },
          callback: function (t, opts) {
  return t.popup({
    title: 'Iframe popup',
    url: './modal.html',
    args: { text: 'Hello' },
    height: 278 // initial height, can be changed later
  });
},
        },
      ];
    },
  },
  { targetOrigin: "https://trellis.coffee" }
);
