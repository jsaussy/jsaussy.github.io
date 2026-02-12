/* global TrelloPowerUp */

var Promise = TrelloPowerUp.Promise;

function cardDetailBadges(trello, options) {
    return [
        testButton(trello),
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
        return [
            {
                dynamic: function () {
                    console.log('updating badge with no text');
                    return {
                        refresh: 10,
                    };
                },
            },
            ];
};

TrelloPowerUp.initialize(
  {
      "card-badges": cardBadges,
      "list-sorters": function (t) {
    return t.list('name', 'id')
    .then(function (list) {
      return [{
        text: "Card Name",
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
          url: t.signUrl('./section2.html', {
            arg: 'you can pass your section args here'
          }),
          height: 400
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
        url: t.signUrl('./modal-dev.html'),
        height: 500,
      },
      action: {
        text: 'My Action',
        callback: (t) =>  t.popup({
    title: 'Iframe popup',
    url: './popupIframe.html',
    args: { text: 'Hello' },
    height: 278, // initial height, can be changed later,
    callback: function (t, opts) {console.log("hide");console.log(opts);},
  })
      }
    };
  },
    "card-detail-badges": cardDetailBadges,
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
          text: "Open date with default",
          callback: function (t) {
            t.popup({
              type: "date",
              title: "DaTE!!!!",
              date: new Date('2020-01-10'),
              callback: function (t, opts) {
                console.log(opts.date);
              },
            });
          },
        },
        {
            text: "Open list with static items",
            callback: function (t) {
                return t.popup({
                    title: "List with static items!",
                    items: [
                        {
                            text: "Item 1",
                        },
                        
                        {
                            text: "Item 2",
                        },
                        
                        {
                            text: "Item 3",
                        },
                    ],
                });
            }
        },
        {
          text: "Open list",
          callback: function (t) {
            return t.popup({
              title: "List!",
              items: [
                {
          text: "Open Popup iframe",
          icon: {
            dark: "https://jsaussy.github.io/icon-gray.svg",
            light: "https://jsaussy.github.io/icon-gray.svg",
          },
          callback: function (t, opts) {
  return t.popup({
    title: 'Iframe popup',
    url: './modal-dev.html',
    args: { text: 'Hello' },
    height: 278, // initial height, can be changed later,
    callback: function (t, opts) {console.log("hide");console.log(opts);},
  });
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
          }
        },
      ];
    },
    "board-buttons": function (t, options) {
      return [
          {
              text: "Open details",
              callback: (t) => t.modal({
                title: "Testing Page 1",
                url: "./details.html",
                height: 100,
              }),
          },
          {
          text: "Open Modal",
          icon: {
            dark: "https://jsaussy.github.io/icon-gray.svg",
            light: "https://jsaussy.github.io/icon-gray.svg",
          },
          callback: function (t) {
            return t.modal({
              url: "./modal-dev.html",
              args: { text: "Hello" },
              accentColor: "#4E5C74",
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
                  callback: (tr) => tr.closeModal(),
                  alt: "Close",
                  position: "right",
                  icon:"https://jsaussy.github.io/icon-gray.svg",
                },
              ],
            });
          },
        },
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
          text: "Open list",
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
          text: "Open Popup iframe",
          icon: {
            dark: "https://jsaussy.github.io/icon-gray.svg",
            light: "https://jsaussy.github.io/icon-gray.svg",
          },
          callback: function (t, opts) {
  return t.popup({
    title: 'Iframe popup',
    url: './modal-dev.html',
    args: { text: 'Hello' },
    height: 278, // initial height, can be changed later,
    callback: function (t, opts) {console.log("hide");console.log(opts);},
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
              url: "./modal-dev.html",
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
      ];
    },
  },
  {targetOrigin: "http://localhost:2999/"}
);
