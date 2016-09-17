'use strict';

/**
 * A function that creates and returns the spaceship model.
 */

function createModelModule() {

  var BearModel = function() {
    var sceneGraphModule = createSceneGraphModule();

    /*
     * Maintain a list of nodes for iteration when performing hit detection.
     */
    this.nodes = [];

    this.LEFT = 0;
    this.RIGHT = 1;

    this.nextRock = this.RIGHT;

    this.rootNode = new sceneGraphModule.RootNode('scene');

    this.bearNode = new sceneGraphModule.BearNode('bear', this.rootNode);
    this.bodyNode = new sceneGraphModule.BodyNode('body', this.bearNode);

    this.nextLeft = 300;
    this.nextRight = 500;
    this.onLeft = 200;
    this.onRight = 600;
    this.bearY = 450;
    this.onRockY = 550;
    this.nextRockY = 100;

    this.rocksNode = new sceneGraphModule.RocksNode('rocks', this.rootNode);
    this.onRockNode = new sceneGraphModule.OnRockNode('onRock', this.rocksNode);
    this.onRockNode.translate(this.onLeft, this.onRockY);
    this.nextRockNode = new sceneGraphModule.NextRockNode('nextRock', this.rocksNode);
    this.nextRockNode.translate(this.nextRight, this.nextRockY);

    this.bearNode.translate(this.onLeft, this.bearY);

    this.jump_distance = 400;
    this.rock_distance = 200;
    this.side = this.LEFT;
    this.repeat = false;
    this.rightFall = [];
    this.leftFall = [0];
    this.repeat = [];
    this.animating = false;

    this.nodes.push(this.onRockNode);
    this.nodes.push(this.nextRockNode);
    this.nodes.push(this.rocksNode)
    this.nodes.push(this.bodyNode);
    this.nodes.push(this.bearNode);
  };

  _.extend(BearModel.prototype, {
    /**
      * Perform hit detection and return the hit node.
      * @param point: Point in the world view, i.e., from the perspective of the canvas.
      * @return 
      *   null if no node is hit, otherwise return the hit node.
      */
    performHitDetection: function(point) {
      var result = _.find(this.nodes, function(node) {
        if (node.performHitDetection(point)) {
          return node;
        }
      });
      if (result) {
        return result;
      } 
      return null;
    }
  });

  return {
    BearModel: BearModel
  };
}