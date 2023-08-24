var roleBuilder = require('role.builder');
const moveToTarget = require("./MoveToTarget");
const roleUpgrader = require("./role.upgrader");

module.exports =
    {
        run: function (creep) {
            creep.memory.currentRole = 'repairer';
            if(creep.spawning) return;
            var working = creep.memory.working;
            creep.memory.working = creep.carry.energy >= creep.carryCapacity - 1 ? true : false;

            if (working == true) {
                var structure = creep.pos.findClosestByPath(FIND_STRUCTURES,
                    {
                        filter: (s) => s.hits < s.hitsMax / 1.5 && s.structureType != STRUCTURE_WALL
                    });

                if (structure == undefined) roleBuilder.run(creep);
                else if (creep.repair(structure) == ERR_NOT_IN_RANGE) creep.moveTo(structure, {visualizePathStyle: {}});
            } else {
                if (moveToTarget.findResource(creep) == false)roleUpgrader.run(creep); roleBuilder.run(creep);
            }
        }
    };