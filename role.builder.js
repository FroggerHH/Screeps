var roleUpgrader = require('role.upgrader');
const moveToTarget = require("./MoveToTarget");

module.exports =
    {
        run: function (creep) {
            creep.memory.currentRole = 'builder';
            creep.memory.working = creep.carry.energy >= creep.carryCapacity - 1 ? true : false;
            if (creep.memory.building == true) creep.memory.working = true;


            if (creep.memory.working == true) {
                var construction = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
                if (construction == undefined ||construction == null || (construction.pos.x == 33 && construction.pos.y == 7 && construction.structureType == STRUCTURE_ROAD)) roleUpgrader.run(creep);
                else {
                    var buildResult = creep.build(construction);
                    if (buildResult == ERR_NOT_IN_RANGE) creep.moveTo(construction, {visualizePathStyle: {}});
                    else if (buildResult == ERR_NOT_ENOUGH_RESOURCES) creep.memory.building = false;
                    else creep.memory.building = true;
                }
            } else {
                if (moveToTarget.findResource(creep) == false)roleUpgrader.run(creep);
            }
        }
    };