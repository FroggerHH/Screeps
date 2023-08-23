module.exports = {
    run: function (creep) {
        var working = creep.memory.working;
        creep.memory.working = creep.carry.energy >= creep.carryCapacity - 5 ? true : false;

        if (working == true) {
            var structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                filter: (s) => (s.structureType == STRUCTURE_SPAWN ||
                    s.structureType == STRUCTURE_EXTENSION ||
                    s.structureType == STRUCTURE_TOWER) && s.energy < s.energyCapacity
            });
            if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
                creep.moveTo(structure);
        } else {
            var source = creep.pos.findClosestByPath(FIND_SOURCES);
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                if (creep.moveTo(source) == ERR_NO_PATH) {
                    source = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES);
                    if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                        var moveToTOMBSTON_result = creep.moveTo(source);
                        if (moveToTOMBSTON_result == ERR_NO_PATH || source == undefined) {
                            source = creep.pos.findClosestByPath(FIND_SOURCES, {
                                filter: (s) => s.owner == "Screeps"
                            });
                            console.log("Spawn is " + source)
                            if (creep.harvest(source) == ERR_NOT_IN_RANGE)
                                creep.moveTo(source);
                        }
                    }
                }
            }
        }
    }
};