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

TrelloPowerUp.initialize(
  {
      "attachment-sections": function(t, options){
    var claimed = options.entries.filter(function (attachment) {
      return attachment.url.indexOf('http://www.nps.gov/yell/') === 0;
    });

    if (claimed && claimed.length > 0) {
      return [{
        id: 'Yellowstone',
        claimed: claimed,
        icon: "https://jsaussy.github.io/icon-gray.svg",
        title: 'Example Attachment Section: Yellowstone',
        content: {
          type: 'iframe',
          url: t.signUrl('./section.html', {
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
        url: t.signUrl('./section.html'),
        height: 230,
      },
      action: {
        text: 'My Action',
        callback: (t) => t.popup({
              title: "Confirm",
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
      ];
    },
    "board-buttons": function (t, options) {
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
      ];
    },
  },
  {targetOrigin: "http://localhost:2999/"}
);
