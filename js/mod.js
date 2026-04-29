let modInfo = {
	name: "The Incremental Tree II",
	author: "liam",
	pointsName: "points",
	modFiles: ["prestige.js", "antiMatter.js", "achievements.js","tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 0,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "1.00",
	name: "Base Game",
}

let changelog = `<h1>Changelog:</h1><br>
<h3><br><br>v1.00 - Base Game - 4/29/2026</h3><br>
		- Added prestige and antimatter<br>
		- Added a sub-currency, prestige power<br>
		- Added the first 20 upgrades<br>
		- Added 8 achievements<br>
		- Added some new options<br>
		- Added a new tree and content style<br>


	<h3><br><br>v0.0 - Literally Nothing</h3><br>
		- Added things<br>
		- Added stuff`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(1)
	if (hasUpgrade('p', 11)) gain = gain.times(2)
	if (hasUpgrade('p', 12)) gain = gain.times(upgradeEffect('p', 12))
	if (hasUpgrade('p', 13)) gain = gain.times(3)
	if (hasUpgrade('p', 15)) gain = gain.times(2)

		gain = gain.times(tmp.a.powerEff)
		if (hasUpgrade('p', 21)) gain = gain.times(tmp.p.powerEff)
	if (hasUpgrade('p', 22)) gain = gain.times(5)
	if (hasUpgrade('p', 23)) gain = gain.times(upgradeEffect('p', 23))
	if (hasUpgrade('p', 24)) gain = gain.times(3)
	if (hasUpgrade('p', 35)) gain = gain.times(100)
	if (hasUpgrade('am', 11)) gain = gain.times(10)
	if (hasUpgrade('am', 12)) gain = gain.times(8)
	if (hasUpgrade('am', 14)) gain = gain.times(upgradeEffect('am', 14))
	if (hasUpgrade('am', 15)) gain = gain.times(250)


exp = new Decimal(1)
	return gain.pow(exp)
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
	
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("e280000000"))
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}