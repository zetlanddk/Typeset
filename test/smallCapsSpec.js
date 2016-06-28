var typeset = require('../src');

function smallCaps (html) {
  return typeset(html, {enable: ['smallCaps']});
};

var expect = require('chai').expect;

describe('SmallCaps', function() {

  it('knows NATO', function() {
    var html = '<p>NATO</p>';
    expect(smallCaps(html)).to.equal('<p><span class="small-caps">NATO</span></p>');
  });

  it("knows EU's", function() {
    var html = "<p>EU's</p>";
    expect(smallCaps(html)).to.equal('<p><span class="small-caps">EU</span>\'s</p>');
  });

  it("knows EU'erne", function() {
    var html = "<p>EU'erne</p>";
    expect(smallCaps(html)).to.equal('<p><span class="small-caps">EU</span>\'erne</p>');
  });

  it("knows EU'er", function() {
    var html = "<p>EU'er</p>";
    expect(smallCaps(html)).to.equal('<p><span class="small-caps">EU</span>\'er</p>');
  });

});
