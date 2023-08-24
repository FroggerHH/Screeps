var moveToTarget = require('MoveToTarget');
var roleBuilder = require('role.builder');

module.exports = {
    run: function (creep) {
        creep.memory.currentRole = 'harvester';
        var working = creep.memory.working;
        creep.memory.working = creep.carry.energy >= creep.carryCapacity - 5 ? true : false;

        if (working == true) {
            var structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                filter: (s) => (s.structureType == STRUCTURE_SPAWN ||
                    s.structureType == STRUCTURE_EXTENSION ||
                    s.structureType == STRUCTURE_TOWER) && s.energy < s.energyCapacity - 1
            });
            var transferResult = creep.transfer(structure, RESOURCE_ENERGY);
            if (transferResult == ERR_NOT_IN_RANGE)
                creep.moveTo(structure, {visualizePathStyle: {}});
            else if (structure == undefined) {
                roleBuilder.run(creep);
            }
        } else {
            if (_.sum(Game.constructionSites, []) == 0)
                creep.room.createConstructionSite(creep.pos.x, creep.pos.y, STRUCTURE_ROAD);

            if (moveToTarget.findResource(creep) == false) roleBuilder.run(creep);
        }
    }
};