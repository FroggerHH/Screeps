module.exports = {
    run: function (creep) {
        creep.memory.working = creep.carry.energy >= creep.carryCapacity - 5 ? true : false;

        if (creep.memory.working == true) {
            if (creep.transfer(creep.room.controller, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
                if (creep.moveTo(creep.room.controller) == ERR_NO_PATH) {
                    creep.moveTo(Game.spawns.MainSpawn);
                }
        } else {
            var source = creep.pos.findClosestByPath(FIND_SOURCES);
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
        }
    }
};