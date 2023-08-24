require('prototype.spawn')();
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var debugVisual = require('debugVisual');

//var discord = require('discord');

function ClearMemory() {
    for (var creepName in Memory.creeps) {
        var gameCreep = Game.creeps[creepName];
        if (gameCreep == undefined) {
            console.log("Deleting old creep " + creepName)
            delete Memory.creeps[creepName];
        }
    }
}

function HandleSpawning() {
    const minNumberOfHarvesters = 3;
    const minNumberOfBuilders = 2;
    const minNumberOfUpgraders = 1;
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
    else if (currentNumberOfBuilders < minNumberOfBuilders) role = "builder";
    else if (currentNumberOfRepairers < minNumberOfRepairers) role = "repairer";

    if (Game.spawns.MainSpawn.memory.doNotNeedSpawnCreeps) return;

    if (role != "none") {
        var energy = 0;
        if (currentNumberOfHarvesters == 0) {
            Game.notify("Colony is about to die");
            energy = Game.spawns.MainSpawn.room.energyAvailable;
        } else energy = Game.spawns.MainSpawn.room.energyCapacityAvailable;
        var name = Game.spawns.MainSpawn.createCustomCreep(energy, role);
        //if(name < 0) name = Game.spawns.MainSpawn.createCustomCreep(Game.spawns.MainSpawn.room.energyCapacity, role);
        if (!(name < 0)) console.log("Creating new creep " + name + " " + role);
    }
}

function UpdateTurrets() {
    for (let tower of Game.rooms.W38S16.find(FIND_MY_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_TOWER})) {
        var target = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (target != undefined) tower.attack(target);
    }
}

function UpdateCreepsBehavior() {
    for (let creepName in Game.creeps) {
        var creep = Game.creeps[creepName];

        if (creep.ticksToLive < 5) creep.drop(RESOURCE_ENERGY);

        switch (creep.memory.role) {
            case "upgrader" :
                roleUpgrader.run(creep);
                break;
            case "builder" :
                roleBuilder.run(creep);
                break;
            case "repairer" :
                roleRepairer.run(creep);
                break;
            case "harvester" :
                roleHarvester.run(creep);
                break;
            case _ :
                console.log(creep.name + " has unknown role " + creep.role)
                break;
        }
    }
}

module.exports.loop = function () {

    ClearMemory();
    HandleSpawning();
    UpdateTurrets();
    UpdateCreepsBehavior();

    var level = Game.rooms.W38S16.controller.level;
    var savedLevel = Game.spawns.MainSpawn.memory.controllerLevel;
    if (level != savedLevel) {
        Game.spawns.MainSpawn.memory.controllerLevel = level;
        Game.notify("New constoller level " + level, 1);
        //discord.send("New constoller level " + level);
    }
    /*
    //discord.send("Test");
    const whurl ="https://discord.com/api/webhooks/1144258419226849330/0qSojNj_auhLBBXBCNY75eAJigvewa_Hyep9fU0q0yXyMGym2QR-XPfdo6fGMzyhvOMD"

    const msg = {
        "content": "Hello! I'm a bot, this is fetch api"
    }

    fetch(whurl + "?wait=true",
        {"method":"POST",
            "headers": {"content-type": "application/json"},
            "body": JSON.stringify(msg)})
        .then(a=xa.json()).then(console.log)

     */


    debugVisual.run();
}