"use strict";

var sceneGraphModule = createSceneGraphModule();

window.addEventListener('load', function() {
  var modelModule = createModelModule();
  var viewModule = createViewModule();

  var model = new modelModule.BearModel();

  var canvas = document.getElementById('canvas');

  var view = viewModule.BearView(model, canvas);
});