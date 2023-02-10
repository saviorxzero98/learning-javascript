
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
        this._level += 1;
        this._hp += 5;
        this._atk += 3;
    };

    return Role;
})();

var Warrior = (function () {
    /**
     * @class
     * @constructor 
     * @param {String} name
     * @property {String} Name
     * @property {int} Level
     * @property {int} Hp
     * @property {int} Atk
     * @property {int} Def
     */
    function Warrior(name) {
        this._name = name;
        this._level = 1;
        this._hp = 50;
        this._atk = 20;
    }

    // Inherit
    Warrior.prototype = new Role();

    /**
     * @override
     * @method
     */
    Warrior.prototype.levelUp = function () {
        this._level += 1;
        this._hp += 8;
        this._atk += 4;
    };

    return Warrior;
})();