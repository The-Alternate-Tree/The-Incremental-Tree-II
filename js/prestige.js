addLayer("p", {
    name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        best: new Decimal(0),
        total: new Decimal(0),
        time: new Decimal(0),
        power: new Decimal(0),
    }},
    color: "#008cff",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "prestige points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('p', 14)) mult = mult.times(2.5)
        if (hasUpgrade('p', 15)) mult = mult.times(2)


        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal(1)
        return exp
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    passiveGeneration() { return false ?1:0 },
		doReset(resettingLayer) {
			let keep = [];
			if (layers[resettingLayer].row > this.row) player.p.power = new Decimal(0)
			if (hasUpgrade("p", 999)) keep.push("upgrades")
			if (layers[resettingLayer].row > this.row) layerDataReset("p", keep)
		},
    effect() {
        let eff = new Decimal(0)
if (hasUpgrade('p', 21)) eff = new Decimal(1)
        return eff
    },
    update(diff) {
        if (hasUpgrade('p', 21))
        return player.p.power = player.p.power.plus(tmp.p.effect.times(diff))
    },
    nodeStyle() {
        if (!options.newTree)
             return { // Style on the layer node
            
            'border-radius': '20%'
        }},
        componentStyles: {
            "upgrade"() {if (!options.newStyle)
                return {'border-radius': '5% / 5%'}},
            "prestige-button"() {if (!options.newStyle)
                 return {'border-radius': '10% / 10%'}},
        },
        powerEff() {
            let eff = player.p.power.plus(1).pow(0.32)

            return eff
        },
 tabFormat: [
    "main-display",
    "prestige-button",
    "resource-display",
    "blank",
    ["display-text",
        function() { return "You have " + format(player.p.power) + " prestige power, boosting points by x" +format(tmp.p.powerEff) },
        ],
    "blank",
   
  
    "upgrades"
],
         upgrades: {

            11: {
                title: "More Points",
                description: "Double your point gain.",

                cost: new Decimal(1),
                unlocked() { 
              
                return player.p.unlocked
            },
        },
        12: {
                title: "Prestige Based",
                description: "Boost point gain based on prestige points.",
                cost: new Decimal(3),
                unlocked() { 
              
                return hasUpgrade('p', 11)
            },
              effect() { // Calculate bonuses from the upgrade. Can return a single value or an object with multiple values
                    let ret = player.p.points.add(2).pow(0.45)
                    if (ret.gte("1e300")) ret = ret.sqrt().times("1e150")
                    return ret;
                },
                effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
        },
        13: {
                title: "Another Boost",
                description: "Triple your point gain.",
                cost: new Decimal(10),
                unlocked() { 
             
                return hasUpgrade('p', 12)
            },
             
        },
        14: {
                title: "Prestige Boosters",
                description: "2.5x your prestige point gain.",
                cost: new Decimal(30),
                unlocked() { 
              
                return hasUpgrade('p', 13)
            },
             
        },
        15: {
                title: "Multi-Boost",
                description: "Double your point and prestige point gain.",
                cost: new Decimal(100),
                unlocked() { 
              
                return hasUpgrade('p', 14)
            },
             
        },
         21: {
                title: "Powered Prestige",
                description: "Start gaining prestige power, which boosts points.",
                cost: new Decimal(1000),
                unlocked() { 
              
                return hasUpgrade('p', 15)
            },
             
        },
    },
})
