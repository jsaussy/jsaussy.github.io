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
