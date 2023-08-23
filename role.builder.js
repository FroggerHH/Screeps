var roleUpgrader = require('role.upgrader');

module.exports =
    {
        run: function (creep) {
            creep.memory.working = creep.carry.energy >= creep.carryCapacity - 1 ? true : false;
            if (creep.memory.building == true) creep.memory.working = true;


            if (creep.memory.working == true) {
                var construction = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
                if (construction == undefined) roleUpgrader.run(creep);
                else {
                    var buildResult = creep.build(construction);
                    if (buildResult == ERR_NOT_IN_RANGE) creep.moveTo(construction);
                    else if (buildResult == ERR_NOT_ENOUGH_RESOURCES) creep.memory.building = false;
                    else creep.memory.building = true;
                }
            } else {
                var source = creep.pos.findClosestByPath(FIND_SOURCES);
                if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    if (creep.moveTo(source) == ERR_NO_PATH) {
                        var construction = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
                        if (construction == undefined) roleUpgrader.run(creep);
                        else {
                            if (creep.build(construction) == ERR_NOT_IN_RANGE) creep.moveTo(construction);
                        }
                    }
                }
            }
        }
    };