import React from 'react';
import _ from 'lodash';
import { Redirect } from 'react-router-dom';
import update from 'immutability-helper';
import QuestionGroup from './QuestionGroup/QuestionGroup.js';
import questionGroups from '../data/mockQuestions.js';
import results from '../data/mockResults.js';
import './Quiz.css';

const colors = [
  '#311b92',
  '#1a237e',
  '#0d47a1',
  '#01579b',
  '#006064',
  '#004d40',
  '#1b5e20',
  '#33691e'
];

class Quiz extends React.Component {
  constructor(props) {
    super(props);
    this.fetchQuestionGroups = this.fetchQuestionGroups.bind(this);
    this.setAnswer = this.setAnswer.bind(this);
    this.onFinish = this.onFinish.bind(this);
    
    props.setSubtitle(': Quiz');
    this.state = {
      finishButtonText: 'Process Results',
      redirectToResults: false
    };
    this.fetchQuestionGroups();
  }

  fetchQuestionGroups() {
    // TODO: fetch question groups from back end
    setTimeout(() => {
      this.setState({ questionGroups });
    }, 250);
  }

  setAnswer(groupIndex, questionIndex, answerIndex, multipleChoice) {
    let answer
    
    if (multipleChoice) {
      answer = this.state
        .questionGroups[groupIndex]
        .questions[questionIndex]
        .answer || [];

      if (answer.includes(answerIndex)) {
        answer = _.without(answer, answerIndex);
      } else {
        answer.push(answerIndex);
      }

    } else {
      answer = [answerIndex];
    }


    const questionGroups = update(this.state.questionGroups, {
      [groupIndex]: {
        questions: {
          [questionIndex]: {
            answer: {
              $set: answer
            }
          }
        }
      }
    });
    this.setState({ questionGroups });
  }

  onFinish() {
    this.setState({ finishButtonText: 'Processing...' });

    // TODO: process results on back end
    setTimeout(() => {
      this.props.setResults(results);
      this.setState({ redirectToResults: true });
    }, 250);
  }

  render() {
    if (this.state.redirectToResults) {
      return <Redirect to='/results' />;
    }

    const loading = !this.state.questionGroups && (
      <div className='Quiz-loading'>Fetching questions...</div>
    );

    const content = _.map(this.state.questionGroups, (questionGroup, index) => {
      const color = colors[index % colors.length];
      return (
        <QuestionGroup
          key={index}
          groupIndex={index}
          color={color}
          setAnswer={this.setAnswer}
          {...questionGroup}
        />
      );
    });

    const finish = this.state.questionGroups && (
      <button className='Quiz-finish button' onClick={this.onFinish}>
        {this.state.finishButtonText}
      </button>
    );

    return (
      <div className='Quiz'>
        {loading}
        {content}
        {finish}
      </div>
    );
  }
}

export default Quiz;
