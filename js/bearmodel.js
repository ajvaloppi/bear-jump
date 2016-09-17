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

    this.rootNode = new sceneGraphModule.RootNode('scene');

    this.bearNode = new sceneGraphModule.BearNode('bear', this.rootNode);

    // this.tailNode = new sceneGraphModule.TailNode('tail', this.spaceshipNode);
    // this.tailNode.translate(0, 75);

    // this.fireNode = new sceneGraphModule.FireNode('fire', this.tailNode);
    // this.fireNode.translate(0,75);

    this.bodyNode = new sceneGraphModule.BodyNode('body', this.bearNode);

    // this.handleNode = new sceneGraphModule.HandleNode('handle', this.bodyNode);
    // this.handleNode.translate(0,-95);

    // this.wingsNode = new sceneGraphModule.WingsNode('wings', this.spaceshipNode);
    // this.wingsNode.translate(0, 20);

    // this.headNode = new sceneGraphModule.HeadNode('head', this.spaceshipNode);
    // this.headNode.translate(0, -150);

    this.bearNode.translate(200, 500);

    this.jump_distance = 400;
    // this.speed = -25;
    // this.powerUp = false;
    // this.move = false;
    // this.resize = false;
    // this.clicked = null;
    // this.on = null;
    // this.originalX = 0;
    // this.originalY = 0;
    // this.tailRotation = 0;
    // this.spaceshipRotation = 0;

    /**
     * Push every node into the the nodes list.
     */
    // this.nodes.push(this.headNode);
    // this.nodes.push(this.tailNode);
    // this.nodes.push(this.fireNode);
    // this.nodes.push(this.handleNode);
    this.nodes.push(this.bodyNode);
    this.nodes.push(this.bearNode);
    // this.nodes.push(this.rootNode);
    // this.nodes.push(this.wingsNode);
    
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