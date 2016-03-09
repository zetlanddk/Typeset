module.exports = function(text){

  text = text.replace(/ffi/g, 'ﬃ');
  text = text.replace(/ffl/g, 'ﬄ');
  text = text.replace(/ff/g, 'ﬀ');
  text = text.replace(/fi/g, 'ﬁ');
  text = text.replace(/fl/g, 'ﬂ');

  return text;
};
