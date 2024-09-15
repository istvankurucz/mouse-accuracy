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
		this.difficulty = difficulty;

		this.duration = duration; // in seconds
		this.timeRemaining = timeRemaining; // in seconds

		this.baseScore = baseScore;
		this.multiplier = multiplier;
		this.scoringRules = scoringRules;

		this.targets = targets;
		this.clicks = clicks;

		this.diameter = diameter; // in any CSS dimension
		this.spawnTime = spawnTime; // in seconds
		this.growingTime = growingTime; // in seconds
		this.showTime = showTime; // in seconds
	}

	setDifficulty(difficulty) {
		this.difficulty = difficulty;

		switch (difficulty) {
			case "easy":
				this.multiplier = 1;
				this.scoringRules = { hit: 1, noHit: 0 };
				this.diameter = "3.5rem";
				this.spawnTime = 1;
				this.growingTime = 3;
				this.showTime = 5;
				break;
			case "normal":
				this.multiplier = 1.5;
				this.scoringRules = { hit: 2, noHit: 0 };
				this.diameter = "3rem";
				this.spawnTime = 0.75;
				this.growingTime = 2.5;
				this.showTime = 4;
				break;
			case "hard":
				this.multiplier = 2;
				this.scoringRules = { hit: 3, noHit: -1 };
				this.diameter = "2.5rem";
				this.spawnTime = 0.5;
				this.growingTime = 2;
				this.showTime = 3;
				break;
		}
	}

	setDuration(duration) {
		this.duration = duration;
		this.timeRemaining = duration;
	}
	decreaseTimeRemaining() {
		this.timeRemaining--;
	}

	updateScore(hit) {
		if (hit) this.baseScore += this.scoringRules.hit;
		else this.baseScore += this.scoringRules.noHit;
	}
	getFinalScore() {
		return (this.baseScore * this.multiplier).toFixed(0);
	}

	getTargetCount() {
		return this.targets.length;
	}
	addTarget(newTarget) {
		this.targets = [...this.targets, newTarget];
	}
	getTargetEfficiency() {
		return ((this.getHitCount() / this.getTargetCount()) * 100).toFixed(0);
	}

	getClickCount() {
		return this.clicks.length;
	}
	getHitCount() {
		const hits = this.clicks.filter((click) => click.isHit);
		return hits.length;
	}
	addClick(newClick) {
		this.clicks = [...this.clicks, newClick];
	}
	getClickEfficiency() {
		return ((this.getHitCount() / this.getClickCount()) * 100).toFixed(0);
	}

	restart() {
		this.timeRemaining = this.duration;
		this.baseScore = 0;
		this.targets = [];
		this.clicks = [];
	}
}

export default Object.freeze(Game);
