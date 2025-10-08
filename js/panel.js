const t = window.TrelloPowerUp.iframe({targetOrigin: "http://localhost:2999/"});

  t.lists("all").then(function (lists) {
      console.log(JSON.stringify(lists, null, 2));
  }).catch(e => console.error(e));
