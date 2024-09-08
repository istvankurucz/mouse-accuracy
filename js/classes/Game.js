class Game {
	constructor(
		difficulty = "normal",
		duration = 30,
		timeRemaining = 30,
		baseScore = 0,
		multiplier = 1.5,
		scoringRules = { hit: 2, noHit: 0 },
		targetCount = 0,
		clickCount = 0,
		hitCount = 0,
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

		this.targetCount = targetCount;
		this.clickCount = clickCount;
		this.hitCount = hitCount;

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

	increaseTargetCount() {
		this.targetCount++;
	}
	getTargetEfficiency() {
		return ((this.hitCount / this.targetCount) * 100).toFixed(0);
	}

	increaseClickCount() {
		this.clickCount++;
	}
	getClickEfficiency() {
		return ((this.hitCount / this.clickCount) * 100).toFixed(0);
	}

	increaseHitCount() {
		this.hitCount++;
	}

	restart() {
		this.timeRemaining = this.duration;
		this.baseScore = 0;
		this.targetCount = 0;
		this.clickCount = 0;
		this.hitCount = 0;
	}
}

export default Object.freeze(Game);
