import React, { Component, Fragment } from 'react';
import 'assets/css/styles.css';
import getReadySound from 'assets/sounds/get_ready.mp3';
import startSound from 'assets/sounds/start.mp3';


class App extends Component {
	
	state = {
		timeLeft: 10,
		countdownFrom: 10,
		countdownFromAlt: 60,
		setsCompleted: 0,
		setsTotal: 5,
		getReadySoundAtSec: 7
	}
	
	countdownInterval = null
	
	sounds = {
		getReady: new Audio(getReadySound),
		start: new Audio(startSound)
	}
	
	startCountdown = () => {
		const timeAtFinishedCountdown = new Date().getTime() + (this.state.countdownFrom * 1000);
		
		this.countdownInterval = setInterval(() => {
			const now = new Date().getTime();
			const distance = timeAtFinishedCountdown - now;
			let timeLeft = distance / 1000;
			
			if (Math.ceil(timeLeft) === this.state.getReadySoundAtSec) {
				document.body.className = 'get-ready';
				this.sounds.getReady.play();
			}
			
			if (timeLeft <= 0) {
				clearInterval(this.countdownInterval);
				timeLeft = 0;
				this.sounds.start.play();
			}
			
			this.setState({timeLeft});
		}, 100);
	}
	
	resetCountdown = () => {
		clearInterval(this.countdownInterval);
		document.body.className = '';
	}
	
	handleSetCompleted = (e) => {
		this.highlightButton(e);
		
		this.resetCountdown();
		
		this.loadSounds();
		
		const newSetCount = () => {
			if (this.state.setsCompleted < this.state.setsTotal - 1) {
				return this.state.setsCompleted + 1;
			} else {
				return 0;
			}
		};
		
		this.setState({
			timeLeft: this.state.countdownFrom,
			setsCompleted: newSetCount()
		});
		
		this.startCountdown();
	}
	
	handleCountdownAltSwitch = (e) => {
		this.highlightButton(e);
		
		this.resetCountdown();
		
		const countdownFrom = this.state.countdownFromAlt;
		const countdownFromAlt = this.state.countdownFrom;
		
		this.setState({
			timeLeft: countdownFrom,
			countdownFrom,
			countdownFromAlt
		});
	}
	
	handleReset = (e) => {
		this.highlightButton(e);
		
		this.resetCountdown();
		
		this.setState({
			timeLeft: this.state.countdownFrom,
			setsCompleted: 0
		});
	}
	
	loadSounds = () => {
		this.sounds.getReady.load();
		this.sounds.start.load();
	}
	
	highlightButton = (e) => {
		const el = e.target;
		
		el.className = 'active';
		
		setTimeout(() => {
			el.className = '';
		}, 500);
	}
	
	render() {
		const { timeLeft, setsCompleted, setsTotal, countdownFromAlt } = this.state;
		
		return (
			<Fragment>
				<div className="time-left">{timeLeft.toFixed(1)}</div>
				<div className="sets">{setsCompleted} / {setsTotal}</div>	
				<div>
					<button onClick={this.handleSetCompleted}>Set Completed</button>
				</div>
				<div>
					<button onClick={this.handleCountdownAltSwitch}>Use {countdownFromAlt} sec Timer</button>
					<button onClick={this.handleReset}>Reset Workout</button>
				</div>
			</Fragment>
		)
	}
}

export default App;
