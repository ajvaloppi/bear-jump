'use strict';


function createViewModule() {
  var BearView = function(model, canvas) {
    var self = this;

    /**
     * Maintain the model.
     */
    this.model = model;

    /**
     * Maintain the canvas and its context.
     */
    this.canvas = canvas;
    this.context = canvas.getContext('2d');


    this.update = function() {
        this.context.clearRect(0,0, canvas.width, canvas.height);
        this.model.rootNode.renderAll(this.context);
    };

    /**
     * You should add the view as a listener to each node in the scene graph, so that the view can get 
     * updated when the model is changed.
     */
    this.model.rootNode.addListener(this);
    // this.model.headNode.addListener(this);
    // this.model.tailNode.addListener(this);
    // this.model.fireNode.addListener(this);
    // this.model.rightlegNode.addListener(this);
    // this.model.leftlegNode.addListener(this);
    this.model.bodyNode.addListener(this);
    this.model.bearNode.addListener(this);
    // this.model.wingsNode.addListener(this);

    /**
     * Handle keydown events.
     */ 
    document.addEventListener('keydown', function(e) {
      // RIGHT
      if (e.keyCode === 39) {
        if (self.model.side == 'left') {
          self.model.bearNode.translate(self.model.jump_distance, 0);
          self.update();
          self.model.side = 'right';
        }
        // else {
        //   // jump up
        // }
      }

      // LEFT
      if (e.keyCode === 37) {
        if (self.model.side == 'right') {
          self.model.bearNode.translate(-self.model.jump_distance, 0);
          self.update();
          self.model.side = 'left';
        }
        // else {
        //   // jump up
        // }
      }
    });

    /**
     * Update the view when first created.
     */
    this.update();
  };

  return {
    BearView: BearView
  };
}