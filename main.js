require('prototype.spawn')();
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');

module.exports.loop = function () {
    //ClearMemory();
    for (var creepName in Memory.creeps) {
        var gameCreep = Game.creeps[creepName];
        if (gameCreep == undefined) {
            console.log("Deleting old creep " + creepName)
            delete Memory.creeps[creepName];
        }
    }

    const minNumberOfHarvesters = 5;
    const minNumberOfBuilders = 4;
    const minNumberOfUpgraders = 3;
    const minNumberOfRepairers = 1;
    var currentNumberOfHarvesters = _.sum(Game.creeps, (x) => x.memory.role == "harvester");
    var currentNumberOfBuilders = _.sum(Game.creeps, (x) => x.memory.role == "builder");
    var currentNumberOfUpgraders = _.sum(Game.creeps, (x) => x.memory.role == "upgrader");
    var currentNumberOfRepairers = _.sum(Game.creeps, (x) => x.memory.role == "repairer");

    // console.log("Current number of harvesters = " + currentNumberOfHarvesters);
    // console.log("Current number of builders = " + currentNumberOfBuilders);
    // console.log("Current number of upgraders = " + currentNumberOfUpgraders);

    var role = "none";
    if (currentNumberOfHarvesters < minNumberOfHarvesters) role = "harvester";
    else if (currentNumberOfUpgraders < minNumberOfUpgraders) role = "upgrader";
    else if (currentNumberOfRepairers < minNumberOfRepairers) role = "repairer";
    else if (currentNumberOfBuilders < minNumberOfBuilders) role = "builder";
    //else role = "upgrader";

    if (role != "none") {
        var energy = currentNumberOfHarvesters == 0 ?
            Game.spawns.MainSpawn.room.energyAvailable :
            Game.spawns.MainSpawn.room.energyCapacityAvailable;
        var name = Game.spawns.MainSpawn.createCustomCreep(energy, role);
        //if(name < 0) name = Game.spawns.MainSpawn.createCustomCreep(Game.spawns.MainSpawn.room.energyCapacity, role);
        if (!(name < 0)) console.log("Creating new creep " + name + " " + role);
    }

    var allTowers = Game.rooms.W38S16.find(FIND_MY_STRUCTURES, {
        filter: (s) => s.structureType == STRUCTURE_TOWER
    });

    for (let tower of allTowers) {
        var target = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (target != undefined) tower.attack(target);
    }


    for (let creepName in Game.creeps) {
        var creep = Game.creeps[creepName];

        switch (creep.memory.role) {
            case "harvester" :
                roleHarvester.run(creep);
                break;
            case "upgrader" :
                roleUpgrader.run(creep);
                break;
            case "builder" :
                roleBuilder.run(creep);
                break;
            case "repairer" :
                roleRepairer.run(creep);
                break;
            case _ :
                console.log(creep.name + " has unknown role " + creep.role)
                break;
        }
    }


}