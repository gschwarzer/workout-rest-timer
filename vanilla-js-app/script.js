//Disable scrolling on touch screens
document.ontouchmove = function(e) {
	e.preventDefault();
}

class Timer {
	constructor(settings) {
		
		//Settings
		this.settings = settings || {
			maxSet: 5,
			countdownFrom: 90,
			countdownFromAlt: 60,
			getReadyAtSec: 7
		};
		
		//DOM Elements
		this.el = {
			body: document.getElementsByTagName('body')[0],
			timeLeft: document.getElementById('time-left'),
			finishedSets: document.getElementById('finished-sets'),
			totalSets: document.getElementById('total-sets'),
			timerLength: document.getElementById('timer-length'),
			button: {
				setCompleted: document.getElementById('set-completed'),
				toggleTimer: document.getElementById('toggle-timer'),
				reset: document.getElementById('reset')
			}
		}
		
		//Sounds
		this.sound = {
			getReady: new Audio('sounds/get_ready.mp3'),
			start: new Audio('sounds/start.mp3')
		}
		
		//Used to store the countdown interval
		this.countdownInterval;
		
		//Show default values on screen
		this.showDefault();
		
		//Add event listeners
		this.addEventListeners();
	}
	
	showDefault() {
		const el = this.el;
		
		el.timeLeft.innerHTML = this.settings.countdownFrom.toFixed(1);
		el.finishedSets.innerHTML = 0;
		el.totalSets.innerHTML = this.settings.maxSet;
		el.timerLength.innerHTML = this.settings.countdownFromAlt;
	}
	
	addEventListeners() {
		const btn = this.el.button;
		
		['touchstart', 'mousedown'].map((e) => {
			if (e === 'mousedown' && this.isTouchDevice()) {
				return;
			}
			
			btn.setCompleted.addEventListener(e, () => {
				this.toggleBtnHighlight(btn.setCompleted);
				
				//Load sounds
				this.sound.getReady.load();
				this.sound.start.load();
				
				//Start countdown
				this.countdownStart();
				
				//Increase set count by 1
				this.addSet();
			});
		});

		['touchend', 'mouseup'].map((e) => {
			if (e === 'mouseup' && this.isTouchDevice()) {
				return;
			}
			
			btn.setCompleted.addEventListener(e, () => {
				setTimeout(() => this.toggleBtnHighlight(btn.setCompleted), 500);
			});
		});


		['touchstart', 'mousedown'].map((e) => {
			if (e === 'mousedown' && this.isTouchDevice()) {
				return;
			}
			
			btn.reset.addEventListener(e, () => {
				this.toggleBtnHighlight(btn.reset);
				
				//Reset countdown
				this.countdownReset();
				
				//Reset the set count
				this.resetSet();
			});
		});

		['touchend', 'mouseup'].map((e) => {
			if (e === 'mouseup' && this.isTouchDevice()) {
				return;
			}
			
			btn.reset.addEventListener(e, () => {
				setTimeout(() => this.toggleBtnHighlight(btn.reset), 500);
			});
		});


		['touchstart', 'mousedown'].map((e) => {
			if (e === 'mousedown' && this.isTouchDevice()) {
				return;
			}
			
			btn.toggleTimer.addEventListener(e, () => {
				this.toggleBtnHighlight(btn.toggleTimer);
				
				const newTime = parseInt(this.el.timerLength.innerHTML);
				
				this.el.timerLength.innerHTML = this.settings.countdownFrom;
				
				this.settings.countdownFrom = newTime;
				
				this.el.timeLeft.innerHTML = newTime.toFixed(1);
			});
		});

		['touchend', 'mouseup'].map((e) => {
			if (e === 'mouseup' && this.isTouchDevice()) {
				return;
			}
			
			btn.toggleTimer.addEventListener(e, () => {
				setTimeout(() => this.toggleBtnHighlight(btn.toggleTimer), 500);
			});
		});
	}
	
	toggleBtnHighlight(el) {
		if (el.className === 'touched') {
			el.className = ''
		} else {
			el.className = 'touched';
		}
	}
	
	isTouchDevice() {
		return 'ontouchstart' in document.documentElement; 
	}
	
	countdownStart() {
		this.countdownReset();
		
		const timeAtFinishedCountdown = new Date().getTime() + (this.settings.countdownFrom * 1000);
		
		this.countdownInterval = setInterval(() => {
			const now = new Date().getTime();
			const distance = timeAtFinishedCountdown - now;
			const secondsLeft = distance / 1000;
				
			this.el.timeLeft.innerHTML = secondsLeft.toFixed(1);
			
			if (Math.ceil(secondsLeft) === this.settings.getReadyAtSec) {
				this.el.body.className = 'start-soon';
				this.sound.getReady.play();
			}
			
			if (secondsLeft <= 0) {
				clearInterval(this.countdownInterval);
				this.el.timeLeft.innerHTML = '0.0';
				this.sound.start.play();
			}
		}, 100);
	}
	
	countdownReset() {
		clearInterval(this.countdownInterval);
	
		this.el.timeLeft.innerHTML = this.settings.countdownFrom.toFixed(1);
		
		this.el.body.className = '';
	}
	
	addSet() {
		this.el.finishedSets.innerHTML = parseInt(this.el.finishedSets.innerHTML) + 1;
	
		if (parseInt(this.el.finishedSets.innerHTML) >= this.settings.maxSet) {
			this.el.finishedSets.innerHTML = 0;
		}
	}
	
	resetSet() {
		this.el.finishedSets.innerHTML = 0;
	}
}

new Timer();