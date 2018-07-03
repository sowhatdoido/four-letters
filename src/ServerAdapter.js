import dictionary from './dictionary.json';
import array from 'lodash/array';
import lang from 'lodash/lang';
import collection from 'lodash/collection';

let allowedWords;
let score = 0;

export const getRandomWord = () => {
  const word = dictionary[Math.floor(Math.random() * dictionary.length)];
  const data = {
    letters: collection.shuffle([...word].map((el, index) => ({
      letter: el,
    }))),
    words: dictionary.filter((el) => lang.isEmpty(array.xor([...el], [...word]))),
  };

  allowedWords = data.words;

  return data;
};

export const checkSubmission = (word) => {
  if (allowedWords.indexOf(word) !== -1) {
    score += 1;
    return {
      score,
      correct: true,
    };
  }

  score -= 1;
  if (score < 0) { score = 0; }
  
  return {
    score,
    correct: false,
  };
};

export default {};