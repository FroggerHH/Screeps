module.exports = {
    run: function () {
        for (const creepName in Game.creeps) {
            const creep = Game.creeps[creepName];

            var roleEmoji = "⛔";
            var fontSize = 0.74;
            var color = 'white';
            switch (creep.memory.currentRole) {
                case "harvester":
                    roleEmoji = "⛏";
                    color = 'yellow';
                    break;
                case "builder":
                    roleEmoji = "🛠";
                    color = 'orange';
                    break;
                case "upgrader":
                    roleEmoji = "🔎";
                    fontSize = 0.5;
                    break;
                case "repairer":
                    roleEmoji = "🔧";
                    fontSize = 0.6;
                    break;
            }
            if(creep.ticksToLive < 40) color = 'red';
            creep.room.visual.text(roleEmoji, creep.pos.x, creep.pos.y, {
                color: color,
                font: fontSize,
                align: 'center',
            });

            for (let s of Game.rooms.W38S16.find(FIND_RUINS)) {
                s.room.visual.text(`Ruin ${s.store[RESOURCE_ENERGY]}`, s.pos.x, s.pos.y, {
                    color: 'red',
                    font: 0.5,
                    align: 'center',
                });
            }
            for (let d of Game.rooms.W38S16.find(FIND_DROPPED_RESOURCES)) {
                d.room.visual.text(`Drop ${d.amount}`, d.pos.x, d.pos.y, {
                    color: 'orange',
                    font: 0.4,
                    align: 'center',
                    stroke: 'black',
                    strokeWidth: 0.08
                });
            }
            for (let d of Game.rooms.W38S16.find(FIND_TOMBSTONES)) {
                if(d.store[RESOURCE_ENERGY] > 0) {
                    d.room.visual.text(`Tomb ${d.store[RESOURCE_ENERGY]}, die ${d.ticksToDecay}`, d.pos.x, d.pos.y, {
                        color: 'red',
                        font: 0.4,
                        align: 'center',
                    });
                }
            }
            for (let d of Game.rooms.W38S16.find(FIND_MY_STRUCTURES)) {
                if(d.hits < d.hitsMax / 2) {
                    d.room.visual.text(`Broken structure`, d.pos.x, d.pos.y, {
                        color: 'red',
                        font: 0.4,
                        align: 'center',
                    });
                }
            }
        }
    }
};