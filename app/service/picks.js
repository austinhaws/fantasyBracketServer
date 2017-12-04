/**
 * loop through rounds for a teamIds possible games and callback to set what to do at that game
 *
 * @param toGame loop until get to this game
 * @param conferenceStart at which conference to start looping
 * @param roundStart at which round to start looping
 * @param gameNumberStart at which game number to start looping
 * @param setCallback at each game, call this funciton
 */
function applyPick(toGame, conferenceStart, roundStart, gameNumberStart, setCallback) {
	while (conferenceStart !== toGame.conference || roundStart !== toGame.round) {
		// advance to next round
		roundStart++;
		if (roundStart >= 6) {
			// finals, so change conference and round

			// conferences go to specific games in first round of finals
			switch (conferenceStart) {
				case 'topLeft':
				case 'bottomLeft':
					gameNumberStart = 0;
					break;
				case 'topRight':
				case 'bottomRight':
					gameNumberStart = 1;
					break;
			}
			conferenceStart = 'finals';
			roundStart = 1;
		} else {
			gameNumberStart = Math.floor(gameNumberStart / 2);
		}

		// assign winner to the dragged team
		setCallback(conferenceStart, roundStart, gameNumberStart);
	}
}

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
		// find source conference and position
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

		// pick the team all the way through the target game
		let deadTeamId = false;
		applyPick(toGame, conference, round, gameNumber, (conference, round, gameNumber) => {
			deadTeamId = userPicks[conference].rounds[round][gameNumber].winningTeamId;
			userPicks[conference].rounds[round][gameNumber].winningTeamId = teamId;
		});

		// unset the originally picked team from the target game on through the finals since they are no longer valid
		applyPick({
			conference: 'finals',
			round: 2,
			gameNumber: 0,
		}, toGame.conference, toGame.round, toGame.gameNumber, (conference, round, gameNumber) => {
			if (userPicks[conference].rounds[round][gameNumber].winningTeamId === deadTeamId) {
				userPicks[conference].rounds[round][gameNumber].winningTeamId = false;
			}
		});
	}
};
