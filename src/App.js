import React, { Component } from 'react';
import LetterButton from './components/LetterButton';
import { Line } from 'rc-progress';
import { Icon } from 'react-icons-kit';
import { exit } from 'react-icons-kit/icomoon/exit';
import { getRandomWord, checkSubmission } from './ServerAdapter';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      timer: 10000,
      maxTimer: 10000,
      score: 0,
      letters: [],
      possibleSolutions: 0,
      selected: [],
      guessCorrect: null,
    };
  }

  componentDidMount() {
    this.getNewWord();
    // this.timer = setInterval(() => {
    //   this.setState({
    //     timer: this.state.timer - 25,
    //   });
    // }, 25);
  }

  componentWillUnmount() {
    // clearInterval(this.timer);
  }

  onLetterClick = (letter) => {
    const selected = [
      ...this.state.selected,
    ];
    const selectedIndex = this.state.selected.indexOf(letter);

    if (selectedIndex !== -1) {
      selected.splice(selectedIndex, 1);
    } else {
      selected.push(letter);
    }

    if (selected.length === this.state.letters.length){
      this.checkWord(selected);
    } else {
      this.addLetter(selected);
    }
  }

  getNewWord = () => {
    const data = getRandomWord();
    console.log('possible', data.words);
    this.setState({
      letters: data.letters,
      possibleSolutions: data.words.length,
    });
  }

  addLetter = (selected) => {
    this.setState({
      selected,
    });
  }

  checkWord = (selected) => {
    const word = selected.reduce((acc, el) => `${acc}${el.letter}`, '');
    const submission = checkSubmission(word);

    if (submission.correct) {
      this.setState({
        selected: [],
        guessCorrect: true,
        score: submission.score,
      });
      this.getNewWord();
    } else {
      this.setState({
        selected: [],
        guessCorrect: false,
        score: submission.score,
      });
    }
  }

  render() {
    return (
      <div className="App">
        <div className="Actions">
          <button className="Exit">
            <Icon icon={exit} size="100%" />
          </button>
        </div>
        <div className="GamePlatform">
          <div className="GamePlatformCentered">
            <div className="Letters">
              {
                this.state.letters.map((el, index) => {
                  const selectedIndex = this.state.selected.indexOf(el);
                  return (
                    <LetterButton
                      position={(selectedIndex === -1) ? 'start' : 'end'}
                      index={(selectedIndex === -1) ? index : selectedIndex}
                      onClick={() => { this.onLetterClick(el); }}
                    >
                      {el.letter}
                    </LetterButton>
                  );
                })
              }
            </div>
            <div className="GameData">
              <div className="Score">
                <span>{this.state.score}</span>
              </div>
              <div className="Timer">
                <Line
                  percent={this.state.timer/this.state.maxTimer* 100}
                  strokeColor="#a7b1b1"
                  trailColor="#FFF"
                  strokeLinecap="square"
                  strokeWidth={1}
                  trailWidth={1}
                />
              </div>
              <div className="Combinations">
                <span className="CombinationValues">{this.state.possibleSolutions}</span> Possible Combinations
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
