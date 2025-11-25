const t = window.TrelloPowerUp.iframe({targetOrigin: "https://trellis.coffee"});

  t.lists("all").then(function (lists) {
      console.log(JSON.stringify(lists, null, 2));
  }).catch(e => console.error(e));

t.render(() => {
  console.log(t.getContext());
  t.lists("all").then(function (lists) {
      console.log(JSON.stringify(lists, null, 2));
  }).catch(e => console.error(e));
});

document.getElementById("modalButton").addEventListener("click", () => {
  t.modal();
});
