module.exports = {

	/**
	 * user has made a pick
	 * @param userPicks the user's full picks mongo object
	 * @param fromGame which game the user started dragging
	 * @param toGame at which game the drag ended
	 */
	makePick: (userPicks, fromGame, toGame) => {
		// get winning team from start drag game
		const fromGameObj = userPicks[fromGame.conference].rounds[fromGame.round][fromGame.gameNumber];
		const teamId = fromGameObj.teamId ? parseInt(fromGameObj.teamId, 10) : fromGameObj.winningTeamId;

		// find dragged team's starting position
		let conference = false;
		let gameNumber = false;
		let round = 1;
		// find soruce conference and position
		['topLeft', 'bottomLeft', 'topRight', 'bottomRight']
			.forEach(k => {
				const round1 = userPicks[k].rounds[1];
				round1.forEach((team, i) => {
					if (parseInt(team.teamId, 10) === teamId) {
						gameNumber = i;
						conference = k;
					}
				});
			});

		// start at srouceconference.round1 and pick dragged team winning up through the toGame conference/round
		while (conference !== toGame.conference || round !== toGame.round) {
			// advance to next round
			round++;
			if (round >= 6) {
				// finals, so change conference and round

				// conferences go to specific games in first round of finals
				switch (conference) {
					case 'topLeft':
					case 'bottomLeft':
						gameNumber = 0;
						break;
					case 'topRight':
					case 'bottomRight':
						gameNumber = 1;
						break;
				}
				conference = 'finals';
				round = 1;
			} else {
				gameNumber = Math.floor(gameNumber / 2);
			}

			// assign winner to the dragged team
			userPicks[conference].rounds[round][gameNumber].winningTeamId = teamId;
		}
	}
};
