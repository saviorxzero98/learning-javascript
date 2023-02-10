
var Role = (function () {

    /**
     * @class
     * @constructor 
     * @param {String} name
     * @property {String} Name
     * @property {int} Level
     * @property {int} Hp
     * @property {int} Atk
     */
    function Role(name) {
        this._name = name;
        this._level = 1;
        this._hp = 40;
        this._atk = 15;
    }

    /**
     * @method
     * @param {String} name
     */
    Role.prototype.rename = function (name) {
        this._name = name;
    };

    /**
     * @method
     * @returns {type} 
     */
    Role.prototype.getAbility = function () {
        return {
            Name: this._name,
            Level: this._level,
            HP: this._hp,
            ATK: this._atk
        }
    };

    /**
     * @method
     */
    Role.prototype.levelUp = function () {
        var level = 1;
        var atkPowerUp = 0;
        
        // argument
        switch (arguments.length) {
            case 2:
                atkPowerUp = arguments[1];
            case 1:
                level = arguments[0];
                break;
        }

        for (var i = 0; i < level; i++) {
            this._level += 1;
            this._hp += 5;
            this._atk += 3 + atkPowerUp;
        }
    };

    return Role;
})();