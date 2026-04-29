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
        if (hasUpgrade('p', 22)) mult = mult.times(2)
        if (hasUpgrade('p', 24)) mult = mult.times(3)
        if (hasUpgrade('p', 31)) mult = mult.times(upgradeEffect('p', 31))
        if (hasUpgrade('p', 32)) mult = mult.times(upgradeEffect('p', 32))
        if (hasUpgrade('p', 33)) mult = mult.times(upgradeEffect('p', 33))
        mult = mult.times(tmp.am.effect)
       if (hasUpgrade('am', 12)) mult = mult.times(4)
       if (hasUpgrade('am', 13)) mult = mult.times(30)


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
if (hasUpgrade('p', 22)) eff = eff.times(5)
if (hasUpgrade('p', 24)) eff = eff.times(3)
if (hasUpgrade('p', 34)) eff = eff.times(upgradeEffect('p', 34))
if (hasUpgrade('am', 12)) eff = eff.times(4)


        return eff
    },
    update(diff) {
        if (hasUpgrade('p', 21))
        return player.p.power = player.p.power.plus(tmp.p.effect.times(diff))
    },
    nodeStyle() {
        if (options.newTree)
             return { // Style on the layer node
            
            'border-radius': '20%'
        }},
        componentStyles: {
            "upgrade"() {if (options.newStyle)
                return {'border-radius': '5% / 5%'}},
            "prestige-button"() {if (options.newStyle)
                 return {'border-radius': '10% / 10%'}},
        },
        powerEff() {
            let eff = player.p.power.plus(1).pow(0.32)
if (hasUpgrade('p', 25)) eff = eff.pow(1.5)
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
autoUpgrade() {
    return (hasUpgrade('am', 13) && !hasUpgrade('p', 35))
},
         upgrades: {

            11: {
                title: "More Points",
                description: "The first upgrade. Double your point gain.",

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
                description: "Start gaining prestige power, which boosts points. Already a new currency.",
                cost: new Decimal(1000),
                unlocked() { 
              
                return hasUpgrade('p', 15)
            },
             
        },
         22: {
                title: "A Lot Of Boost",
                description: "Gain 5x prestige power and points, and 2x prestige points.",
                cost: new Decimal(4000),
                unlocked() { 
              
                return hasUpgrade('p', 21)
            },
             
        },
        23: {
                title: "Upgrade Power",
                description: "Multiply point gain by prestige upgrades bought.",
                cost: new Decimal(50000),
                unlocked() { 
              
                return hasUpgrade('p', 22)
            },
             effect() { // Calculate bonuses from the upgrade. Can return a single value or an object with multiple values
                    let ret = new Decimal(player.p.upgrades.length)
                    return ret;
                },
                effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
        },
        24: {
                title: "Three^3",
                description: "Triple points, prestige points, and prestige power.",
                cost: new Decimal(200000),
                unlocked() { 
              
                return hasUpgrade('p', 23)
            },
            
        },
         25: {
                title: "Better Power",
                description: "Prestige power effect is ^1.5.",
                cost: new Decimal(2e6),
                unlocked() { 
              
                return hasUpgrade('p', 24)
            },
            
        },
        31: {
                title: "Prestige Synergy",
                description: "Boost prestige points based on prestige points.",
                cost: new Decimal(10e6),
                unlocked() { 
              
                return hasUpgrade('p', 25)
            },
            effect() { // Calculate bonuses from the upgrade. Can return a single value or an object with multiple values
                    let ret = player.p.points.add(2).pow(0.1)
                    if (ret.gte("1e200")) ret = ret.sqrt().times("1e100")
                    return ret;
                },
                effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
            
        },
         32: {
                title: "Power Synergy",
                description: "Boost prestige points based on prestige power.",
                cost: new Decimal(100e6),
                unlocked() { 
              
                return hasUpgrade('p', 31)
            },
            effect() { // Calculate bonuses from the upgrade. Can return a single value or an object with multiple values
                    let ret = player.p.power.add(2).pow(0.13)
                    if (ret.gte("1e40")) ret = ret.sqrt().times("1e20")
                    return ret;
                },
                effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
            
        },
        33: {
                title: "Point Synergy",
                description: "Boost prestige points based on points.",
                cost: new Decimal(1e9),
                unlocked() { 
              
                return hasUpgrade('p', 32)
            },
            effect() { // Calculate bonuses from the upgrade. Can return a single value or an object with multiple values
                    let ret = player.points.add(2).pow(0.06)
                    if (ret.gte("1e50")) ret = ret.sqrt().times("1e25")
                    return ret;
                },
                effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
            
        },
        34: {
                title: "More Power",
                description: "Boost prestige power based on prestige points.",
                cost: new Decimal(4e9),
                unlocked() { 
              
                return hasUpgrade('p', 33)
            },
            effect() { // Calculate bonuses from the upgrade. Can return a single value or an object with multiple values
                    let ret = player.p.points.add(2).pow(0.25)
                    if (ret.gte("1e10")) ret = ret.sqrt().times("1e5")
                    return ret;
                },
                effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
            
        },
        35: {
                title: "Big Boost",
                description: "Gain 100x more points!",
                cost: new Decimal(1e10),
                unlocked() { 
              
                return hasUpgrade('p', 34)
            },
           
            
        },
    },
})
