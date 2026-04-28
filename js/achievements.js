addLayer("a", {
    name: "achievements", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "🏆", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		power: new Decimal(0),
    }},
    color: "#eeff00",
   
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
   
    row: 'side', // Row the layer is in on the tree (0 is the first row)
    powerEff() {
			let eff = new Decimal(player.a.achievements.length).plus(1).pow(0.2)

            return eff
		},
    layerShown(){return true},
   tabFormat: [
    "main-display",
    "blank",
    ["display-text",
        function() { return "You have completed " + formatWhole(player.a.achievements.length) + " achievements, boosting point gain by x" +format(tmp.a.powerEff) },
        ],
    "blank",
   
  
    "achievements"
],
 nodeStyle() {
        if (options.newTree)
             return { // Style on the layer node
            
            'border-radius': '20%'
        }},
achievements: {
        11: {
            name: "Prestiged",
            done() {return player.p.points.gte(1)},
            tooltip: "Get a prestige point.",
            unlocked() {
                return (!hasAchievement(this.layer, this.id) || !options.showAchs)
            }
        },
         12: {
            name: "Upgrading",
            done() {return hasUpgrade('p', 13)},
            tooltip: "Buy 3 prestige upgrades.",
            unlocked() {
                return (!hasAchievement(this.layer, this.id) || !options.showAchs)
            }
        },
        13: {
            name: "100 Is A Lot",
            done() {return player.p.points.gte(100)},
            tooltip: "Get 100 prestige points.",
            unlocked() {
                return (!hasAchievement(this.layer, this.id) || !options.showAchs)
            }
        },
        14: {
            name: "A New Feature?",
            done() {return player.p.power.gt(0)},
            tooltip: "Start generating prestige power.",
            unlocked() {
                return (!hasAchievement(this.layer, this.id) || !options.showAchs)
            }
        },
    },
})
