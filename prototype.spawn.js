module.exports = function () {
    StructureSpawn.prototype.createCustomCreep =
        function (energy, roleName) {
            var numberOfParts = Math.floor(energy / 200);
            var body = [];

            for (var i = 0; i < numberOfParts; i++) {
                body.push(WORK);
                body.push(WORK);
                body.push(CARRY);
                body.push(MOVE);
            }

            return this.createCreep(body, undefined,
                {
                    role: roleName,
                    working: false
                });
        }
}