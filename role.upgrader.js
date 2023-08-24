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
        if(creep.spawning) return;

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