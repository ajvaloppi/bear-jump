'use strict';

function createViewModule() {
  var BearView = function(model, canvas) {
    var self = this;

    this.RIGHTFALL = [];
    this.LEFTFALL = [0];

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

    this.jumpUp = function(side) {
      console.log("jump up");
      if (side == self.model.RIGHT) {
        self.model.leftFall.push(side);
      }
      else {
        self.model.rightFall.push(side);
      }
    }

    this.jumpInPlace = function(side) {
      console.log("jump in place");
    }

    this.jumpLeft = function () {
      console.log("jump left");
      self.model.leftFall = [0, 1];
      self.model.bearNode.translate(-self.model.jump_distance, 0);
      self.model.onRockNode.translate(-self.model.jump_distance, 0);
      self.update();
      self.model.side = self.model.LEFT;
    }

    this.jumpRight = function () {
      console.log("jump right");
      self.model.rightFall = [1, 0];
      self.model.bearNode.translate(self.model.jump_distance, 0);
      self.model.onRockNode.translate(self.model.jump_distance, 0);
      self.update();
      self.model.side = self.model.RIGHT;
    }

    this.placeNextRock = function(next, reset = false) {
      if (reset) {
        var distance = 0;
      }
      else if (next == self.model.LEFT) {
        var distance = -self.model.rock_distance;
      }
      else {
        var distance = self.model.rock_distance;
      }
      self.model.nextRockNode.translate(distance, 0);
      self.update();
      self.model.nextRock = next;
    }

    this.fallIn = function (side) {
      console.log("fall in " + side);
      if (side == self.model.RIGHT) {
        self.model.repeat = self.model.rightFall
      }
      else{ 
        self.model.repeat = self.model.leftFall
      }
      console.log(self.model.repeat);
      // TODO: add rocks passing animation
      side = self.model.repeat.shift();
      console.log(self.model.repeat);
      if (side == self.model.RIGHT) {
        self.jumpRight();
        self.placeNextRock(self.model.LEFT, true);
      }
      else {
        self.jumpLeft();
        self.placeNextRock(self.model.RIGHT, true);
      }
    }

    this.generateRock = function () {
      if (self.model.repeat.length > 0) {
        console.log("repeat")
        side = self.model.repeat.pop();
        console.log(self.model.repeat);
      }
      else {
        var side = Math.floor((Math.random() * 2));
      }

      if (side == self.model.LEFT && self.model.nextRock == self.model.RIGHT) {
        self.placeNextRock(self.model.LEFT)
      }
      else if (side == self.model.RIGHT && self.model.nextRock == self.model.LEFT){
        self.placeNextRock(self.model.RIGHT)
      }
    }

    this.generateJump = function(direction, opposite, jumpOver) {
      if (self.model.nextRock == direction) {
          if (self.model.side == opposite) {
            jumpOver();
            self.generateRock();
          }
          else {
            // jump up
            self.jumpUp(direction);
            self.generateRock();
          }
        }
        else {
          if (self.model.side == direction) {
            self.jumpInPlace(direction);
          }
          else {
            self.fallIn(direction);
          }
        }
    }

    /**
     * You should add the view as a listener to each node in the scene graph, so that the view can get 
     * updated when the model is changed.
     */
    this.model.rootNode.addListener(this);
    this.model.bodyNode.addListener(this);
    this.model.bearNode.addListener(this);

    this.model.onRockNode.addListener(this);
    this.model.nextRockNode.addListener(this);
    this.model.bearNode.addListener(this);

    /**
     * Handle keydown events.
     */ 
    document.addEventListener('keydown', function(e) {
      // RIGHT
      if (e.keyCode === 39) {
        self.generateJump(self.model.RIGHT, self.model.LEFT, self.jumpRight);
      }

      // LEFT
      if (e.keyCode === 37) {
        self.generateJump(self.model.LEFT, self.model.RIGHT, self.jumpLeft);
      }
    });

    this.update();
  };

  return {
    BearView: BearView
  };
}