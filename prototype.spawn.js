module.exports = function () {
    StructureSpawn.prototype.createCustomCreep =
        function (energy, roleName) {
        var startEnergy = Game.spawns.MainSpawn.room.energyAvailable;

            var numberOfParts = Math.floor(energy / 200);
            var body = [];

            for (var i = 0; i < numberOfParts; i++) {
                body.push(WORK); //20
                body.push(CARRY); //50
                body.push(MOVE);//???
            }

            var result = this.createCreep(body, undefined,
                {
                    role: roleName,
                    working: false
                });
            return result;
        }
}