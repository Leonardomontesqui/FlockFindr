'use strict';

var staticMatch = require('css-mediaquery').match;
var dynamicMatch = typeof window !== 'undefined' ? window.matchMedia : null;

// our fake MediaQueryList
function Mql(query, values, forceStatic){
  var self = this;
  var mql;

  // matchMedia will return null in FF when it's called in a hidden iframe
  // ref: https://stackoverflow.com/a/12330568
  if(dynamicMatch && !forceStatic) mql = dynamicMatch.call(window, query);

  if (mql) {
    this.matches = mql.matches;
    this.media = mql.media;
    // TODO: is there a time it makes sense to remove this listener?
    mql.addListener(update);
  } else {
    this.matches = staticMatch(query, values);
    this.media = query;
  }

  this.addListener = addListener;
  this.removeListener = removeListener;
  this.dispose = dispose;

  function addListener(listener){
    if(mql){
      mql.addListener(listener);
    }
  }

  function removeListener(listener){
    if(mql){
      mql.removeListener(listener);
    }
  }

  // update ourselves!
  function update(evt){
    self.matches = evt.matches;
    self.media = evt.media;
  }

  function dispose(){
    if(mql){
      mql.removeListener(update);
    }
  }
}

function matchMedia(query, values, forceStatic){
  return new Mql(query, values, forceStatic);
}

module.exports = matchMedia;
