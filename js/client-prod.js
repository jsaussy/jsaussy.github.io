window.TrelloPowerUp.initialize({
  "card-badges": (t, opts) => {
		return [{
			dynamic: () => {
				console.log("Updating badge - You should see me every 10s, but won't.")
				return { refresh: 10, };
			},
		}];
	}
});
