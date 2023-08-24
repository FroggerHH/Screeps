
function move(creep, target) {
    if (target == undefined || target == null) return false;
    if (creep == undefined || creep == null) return false;
    var harvestResult = creep.harvest(target);
    if (harvestResult == ERR_NOT_IN_RANGE) {
        var moveResult = creep.moveTo(target, {visualizePathStyle: {}});
        if (moveResult < 0) return false;
        else return true;
    } else if (harvestResult == ERR_INVALID_TARGET) {
        harvestResult = creep.pickup(target);
        if (harvestResult == ERR_INVALID_TARGET) {
            if (target.structure != undefined) {
                var strType = target.structure.structureType;
                if (strType == STRUCTURE_SPAWN && target.structure.owner.username == "Screeps") {
                    harvestResult = creep.withdraw(target, RESOURCE_ENERGY);
                    if (harvestResult == ERR_NOT_IN_RANGE) {
                        var moveResult = creep.moveTo(target, {visualizePathStyle: {}});
                        if (moveResult < 0) return false;
                        else return true;
                    }
                }
            }
            else if(target.creep != undefined) {
                harvestResult = creep.withdraw(target, RESOURCE_ENERGY);
                if (harvestResult == ERR_NOT_IN_RANGE) {
                    var moveResult = creep.moveTo(target, {visualizePathStyle: {}});
                    if (moveResult < 0) return false;
                    else return true;
                }
            }
        }
        else if (harvestResult == ERR_NOT_IN_RANGE) {
            var moveResult = creep.moveTo(target, {visualizePathStyle: {}});
            if (moveResult < 0) return false;
            else return true;
        }
    } else if (harvestResult == OK) return true;
    else return false;
}

module.exports = {
    findResource: function(creep){
        var sourceTarget = creep.pos.findClosestByPath(FIND_SOURCES);
        var droppedResourcesTarget = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES);
        var tombstoneTarget = creep.pos.findClosestByPath(FIND_TOMBSTONES, {
            filter: (tombstone) => tombstone.store[RESOURCE_ENERGY] > 0
        });
        var ruinTarget = creep.pos.findClosestByPath(FIND_RUINS, {
            filter: (ruin) => ruin.store[RESOURCE_ENERGY] > 0
        });

        var moveToTombstoneResult = move(creep, tombstoneTarget);
        if (moveToTombstoneResult) return true;
        var moveToDroppedResourcesResult = move(creep, droppedResourcesTarget);
        if (moveToDroppedResourcesResult) return true;
        var moveToSourceResult = move(creep, sourceTarget);
        if (moveToSourceResult) return true;
        var moveToRuinResult = move(creep, ruinTarget);
        if (moveToRuinResult) return true;

        return false;
    }
};