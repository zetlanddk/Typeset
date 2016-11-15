var Entities = require('html-entities').AllHtmlEntities;
var entities = new Entities();

// Only numbers regex
var onlyNumbers = new RegExp('^\\d+$');

// Ensure the word has a length of more than 2 letters,
// does not contain punctation since exterior punctuation
// has been stripped by this point. If so, then see if the
// uppercase version of the word is indentical, if so it's
// very probably an acronym
function isAcronym (word) {

  return word.length &&
    word.trim().length > 1 &&
    !(onlyNumbers.test(word.replace(/[\.,-\/#!–$%°\^&\*;?:+′|@\[\]{}=\-_`~()]/g,""))) &&
    word.replace(/[\.,-\/#!$%\^&\*;–?:+|@\[\]{}=\-_`~(′°)]/g,"") === word &&
    word.toUpperCase() === word;
}

function removeCruft (word) {

  var wordSplitters = "-‘’′‘’'".split('').concat(['&#39;']);
  var ignore = "{}()-‘’[]!#$*&;:,.“”″′‘’\"'".split('').concat(['&quot;']);

  var encodedIgnore = ignore.slice(0);
  var encodedWordSplitters = wordSplitters.slice(0);

  for (var x in encodedIgnore)
    encodedIgnore[x] = entities.encode(encodedIgnore[x]);

  for (var x in encodedWordSplitters)
    encodedWordSplitters[x] = entities.encode(encodedWordSplitters[x]);

  ignore = ignore.concat(encodedIgnore);
  wordSplitters = wordSplitters.concat(encodedWordSplitters);

  var trailing = '',
  leading = '';

  for (var i = 0; i < wordSplitters.length; i++) {

    var ignoreThis = wordSplitters[i];
    var endOfWord = (word.match(ignoreThis+'.*$') || [])[0];

    if (endOfWord && endOfWord != word) {
      trailing = endOfWord + trailing;
      word = word.slice(0, -endOfWord.length);
      i = 0;continue;
    }

  }

  for (var j = 0; j < wordSplitters.length; j++) {

    var ignoreThis = wordSplitters[j];
    var startOfWord = (word.match('^.*'+ignoreThis) || [])[0];

    if (startOfWord) {
      leading += startOfWord;
      word = word.slice(startOfWord.length);
      j = 0;continue;
    }

  }

  for (var i = 0; i < ignore.length; i++) {

    var ignoreThis = ignore[i],
    endOfWord = word.slice(-ignoreThis.length);

    if (endOfWord === ignoreThis) {
      trailing = ignoreThis + trailing;
      word = word.slice(0, -ignoreThis.length);
      i = 0;continue;
    }

  }

  for (var j = 0; j < ignore.length; j++) {

    var ignoreThis = ignore[j],
    startOfWord = word.slice(0, ignoreThis.length);

    if (startOfWord === ignoreThis) {
      leading += ignoreThis;
      word = word.slice(ignoreThis.length);
      j = 0;continue;
    }

  }

  return [leading, word, trailing];
}

module.exports = function(text){

  var wordList = text.split(' ');

  for (var i in wordList) {

    if ( typeof wordList[i] === 'string' ) {

      var brokenWord = removeCruft(wordList[i]),
        word = brokenWord[1],
        leading = brokenWord[0],
        trailing = brokenWord[2];

      if (isAcronym(word)) {
        wordList[i] = leading + '<span class="small-caps">' + word + '</span>' + trailing;
      }

    }
  }

  return  wordList.join(' ');
};
