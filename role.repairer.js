var roleBuilder = require('role.builder');

module.exports =
    {
        run: function (creep) {
            var working = creep.memory.working;
            creep.memory.working = creep.carry.energy >= creep.carryCapacity - 1 ? true : false;

            if (working == true) {
                var structure = creep.pos.findClosestByPath(FIND_STRUCTURES,
                    {
                        filter: (s) => s.hits < s.hitsMax / 1.5 && s.structureType != STRUCTURE_WALL
                    });

                if (structure == undefined) roleBuilder.run(creep);
                else if (creep.repair(structure) == ERR_NOT_IN_RANGE) creep.moveTo(structure);
            } else {
                var source = creep.pos.findClosestByPath(FIND_SOURCES);
                if (creep.harvest(source) == ERR_NOT_IN_RANGE) creep.moveTo(source);
            }
        }
    };