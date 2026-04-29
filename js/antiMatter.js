addLayer("am", {
    name: "antimatter", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "A", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        best: new Decimal(0),
        total: new Decimal(0),
        time: new Decimal(0),
        power: new Decimal(0),
    }},
    color: "#ff0080",
    requires: new Decimal(2e12), // Can be a function that takes requirement increases into account
    resource: "antimatter", // Name of prestige currency
    baseResource: "prestige points", // Name of resource prestige is based on
    baseAmount() {return player.p.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.34, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
       if (hasUpgrade('am', 12)) mult = mult.times(8)

        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal(1)
        return exp
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    branches: ['p'],
    hotkeys: [
        {key: "a", description: "A: Reset for antimatter", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return hasUpgrade('p', 35) || player.am.unlocked},
    passiveGeneration() { return false ?1:0 },
		doReset(resettingLayer) {
			let keep = [];
			if (hasUpgrade("p", 999)) keep.push("upgrades")
			if (layers[resettingLayer].row > this.row) layerDataReset("am", keep)
		},
    effect() {
        let eff = new Decimal(1)
eff = player.am.points.add(1).pow(1.8).pow(0.3)
if (eff.gte(10000)) eff = eff.sqrt().times(100)
if (eff.gte(1e100)) eff = eff.sqrt().times(1e50)

        return eff
    },
   effectDescription() {
			return "boosting prestige points by x"+format(tmp.am.effect)+ "."
		},

    update(diff) {
      
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
       
 tabFormat: [
    "main-display",
    "prestige-button",
    "resource-display",
    "blank",
    
    "blank",
   
  
    "upgrades"
],
       upgrades: {

            11: {
                title: "I Want More Points",
                description: "Gain 10x more points.",

                cost: new Decimal(1),
                unlocked() { 
              
                return player.am.unlocked
            },
        }, 
         12: {
                title: "Boost Everything!",
                description: "Gain 8x more antimatter and points, and 4x prestige points and power.",

                cost: new Decimal(2),
                unlocked() { 
              
                return hasUpgrade('am', 11)
            },
        }, 
        13: {
                title: "You Need This",
                description: "Autobuy the first 3 rows of prestige upgrades and 30x prestige points.",

                cost: new Decimal(400),
                unlocked() { 
              
                return hasUpgrade('am', 12)
            },
        }, 
         14: {
                title: "Anti Upgrade Power",
                description: "Double points for every bought antimatter upgrade.",

                cost: new Decimal(10000),
                unlocked() { 
              
                return hasUpgrade('am', 13)
            },
             effect() { // Calculate bonuses from the upgrade. Can return a single value or an object with multiple values
                    let ret = new Decimal.pow(2, player.am.upgrades.length)
                    return ret;
                },
                effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
        }, 
        15: {
                title: "Point Growth",
                description: "Gain 250x points.",

                cost: new Decimal(100000),
                unlocked() { 
              
                return hasUpgrade('am', 14)
            },
            
        }, 
       },
})
