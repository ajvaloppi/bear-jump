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

    this.jumpUp = function() {
      console.log("jump up")

    }

    this.jumpLeft = function () {
      console.log("jump left")
      self.model.bearNode.translate(-self.model.jump_distance, 0);
      self.model.onRockNode.translate(-self.model.jump_distance, 0);
      self.update();
      self.model.side = self.model.LEFT;
    }

    this.jumpRight = function () {
      console.log("jump right")
      self.model.bearNode.translate(self.model.jump_distance, 0);
      self.model.onRockNode.translate(self.model.jump_distance, 0);
      self.update();
      self.model.side = self.model.RIGHT;
    }

    this.fallIn = function () {
      console.log("fall in")
    }

    this.generateRock = function () {
      var side = Math.floor((Math.random() * 2));
      if (side == self.model.LEFT && self.model.nextRock == self.model.RIGHT) {
        self.model.nextRockNode.translate(-self.model.rock_distance, 0);
        self.update();
        self.model.nextRock = self.model.LEFT;
      }
      else if (side == self.model.RIGHT && self.model.nextRock == self.model.LEFT){
        self.model.nextRockNode.translate(self.model.rock_distance, 0);
        self.update();
        self.model.nextRock = self.model.RIGHT;
      }
    }

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

    this.model.onRockNode.addListener(this);
    this.model.nextRockNode.addListener(this);
    this.model.bearNode.addListener(this);
    // this.model.wingsNode.addListener(this);

    /**
     * Handle keydown events.
     */ 
    document.addEventListener('keydown', function(e) {
      // RIGHT
      console.log("ROCK: " + self.model.nextRock)
      console.log("BEAR: " + self.model.side)
      if (e.keyCode === 39) {
        if (self.model.nextRock == self.model.RIGHT) {
          if (self.model.side == self.model.LEFT) {
            self.jumpRight();
            self.generateRock();
          }

          else {
            // jump up
            self.jumpUp();
            self.generateRock();
          }
        }
        else {
          self.fallIn();
        }
      }

      // LEFT
      if (e.keyCode === 37) {
        if (self.model.nextRock == self.model.LEFT) {
          if (self.model.side == self.model.RIGHT) {
            self.jumpLeft();
            self.generateRock();
          }

          else {
            self.jumpUp();
            self.generateRock();
          }
        }
        else {
          self.fallIn();
        }
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