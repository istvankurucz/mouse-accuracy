class Game {
	constructor(
		difficulty = "normal",
		duration = 30,
		timeRemaining = 30,
		baseScore = 0,
		multiplier = 1.5,
		scoringRules = { hit: 2, noHit: 0 },
		targets = [],
		clicks = [],
		diameter = "3rem",
		spawnTime = 1,
		growingTime = 2.5,
		showTime = 4
	) {
		this._difficulty = difficulty;

		this._duration = duration; // in seconds
		this._timeRemaining = timeRemaining; // in seconds

		this._baseScore = baseScore;
		this._multiplier = multiplier;
		this._scoringRules = scoringRules;

		this._targets = targets;
		this._clicks = clicks;

		this._diameter = diameter; // in any CSS dimension
		this._spawnTime = spawnTime; // in seconds
		this._growingTime = growingTime; // in seconds
		this._showTime = showTime; // in seconds
	}

	// Difficulty
	get difficulty() {
		return this._difficulty;
	}
	set difficulty(difficulty) {
		this._difficulty = difficulty;

		switch (difficulty) {
			case "easy":
				this._multiplier = 1;
				this._scoringRules = { hit: 1, noHit: 0 };
				this._diameter = "3.5rem";
				this._spawnTime = 1;
				this._growingTime = 3;
				this._showTime = 5;
				break;
			case "normal":
				this._multiplier = 1.5;
				this._scoringRules = { hit: 2, noHit: 0 };
				this._diameter = "3rem";
				this._spawnTime = 0.75;
				this._growingTime = 2.5;
				this._showTime = 4;
				break;
			case "hard":
				this._multiplier = 2;
				this._scoringRules = { hit: 3, noHit: -1 };
				this._diameter = "2.5rem";
				this._spawnTime = 0.5;
				this._growingTime = 2;
				this._showTime = 3;
				break;
		}
	}

	// Duration
	get duration() {
		return this._duration;
	}
	set duration(duration) {
		this._duration = duration;
		this._timeRemaining = duration;
	}

	// Time remaining
	get timeRemaining() {
		return this._timeRemaining;
	}
	decreaseTimeRemaining() {
		this._timeRemaining--;
	}

	// Score
	get baseScore() {
		return this._baseScore;
	}
	get multiplier() {
		return this._multiplier;
	}
	updateScore(hit) {
		if (hit) this._baseScore += this._scoringRules.hit;
		else this._baseScore += this._scoringRules.noHit;
	}
	getFinalScore() {
		return (this._baseScore * this._multiplier).toFixed(0);
	}

	// Target
	get targets() {
		return this._targets;
	}
	get targetCount() {
		return this._targets.length;
	}
	addTarget(newTarget) {
		this._targets = [...this._targets, newTarget];
	}
	getTargetEfficiency() {
		return ((this.hitCount / this.targetCount) * 100).toFixed(0);
	}

	// Click
	get clicks() {
		return this._clicks;
	}
	get clickCount() {
		return this._clicks.length;
	}
	get hitCount() {
		const hits = this._clicks.filter((click) => click.isHit);
		return hits.length;
	}
	addClick(newClick) {
		this._clicks = [...this._clicks, newClick];
	}
	getClickEfficiency() {
		return ((this.hitCount / this.clickCount) * 100).toFixed(0);
	}

	// Diameter
	get diameter() {
		return this._diameter;
	}

	// Times
	get spawnTime() {
		return this._spawnTime;
	}
	get growingTime() {
		return this._growingTime;
	}
	get showTime() {
		return this._showTime;
	}

	// Restart
	restart() {
		this._timeRemaining = this._duration;
		this._baseScore = 0;
		this._targets = [];
		this._clicks = [];
	}
}

export default Object.freeze(Game);
