const moveToTarget = require("./MoveToTarget");

function work(creep) {
    const controller = creep.room.controller;
    if (controller) {
        if (creep.upgradeController(controller) === ERR_NOT_IN_RANGE) {
            creep.moveTo(controller, {visualizePathStyle: {}});
        }
    }
}

module.exports = {
    run: function (creep) {
        creep.memory.currentRole = 'upgrader';
        //creep.memory.working = creep.carry.energy >= creep.carryCapacity - 5 ? true : false;
        // if (creep.memory.building == true) creep.memory.working = true;

        if (creep.memory.working && creep.store[RESOURCE_ENERGY] === 0) {
            creep.memory.working = false;
            //creep.say('🔄 Harvest');
        }
        if (!creep.memory.working && creep.store.getFreeCapacity() === 0) {
            creep.memory.working = true;
            creep.say('⚡ Upgrade');
        }

        if (creep.memory.working) {
            work(creep);
        } else {
            var findResource = moveToTarget.findResource(creep);
            if (findResource == false && creep.store[RESOURCE_ENERGY] > 0)
                work(creep);
        }
    }
};