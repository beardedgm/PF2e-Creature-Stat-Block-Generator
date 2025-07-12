// Creature data loaded from creatureData.json
let creatureData = [];

// Fetch the creature data on page load
fetch('creatureData.json')
  .then((response) => response.json())
  .then((data) => {
    creatureData = data;
  })
  .catch((err) => console.error('Error loading creature data:', err));

// Function to update the stat block
function updateStatBlock() {
  const level = parseInt(document.getElementById("creatureLevel").value);
  const damageType = document.getElementById("damageType").value;

  // Find the creature data for the selected level
  const creature = creatureData.find((c) => c.level === level);

  if (creature) {
    // Update the stat block with creature data
    document.getElementById("levelDisplay").textContent = creature.level;
    document.getElementById("hpValue").textContent = creature.hp;
    document.getElementById("acValue").textContent = creature.ac;
    document.getElementById("spellDCValue").textContent = creature.spellDC;
    document.getElementById("fortitudeValue").textContent =
      "+" + creature.fortitude;
    document.getElementById("reflexValue").textContent = "+" + creature.reflex;
    document.getElementById("willValue").textContent = "+" + creature.will;
    document.getElementById("perceptionValue").textContent =
      "+" + creature.perception;
    document.getElementById("attackBonusValue").textContent =
      "+" + creature.attackBonus;

    // Update the damage value based on the selected damage type
    let damageValue = "";
    switch (damageType) {
      case "low":
        damageValue = creature.lowDamage;
        break;
      case "moderate":
        damageValue = creature.moderateDamage;
        break;
      case "severe":
        damageValue = creature.severeDamage;
        break;
      case "extreme":
        damageValue = creature.extremeDamage;
        break;
    }

    // Format the damage display
    const damageTypeFormatted =
      damageType.charAt(0).toUpperCase() + damageType.slice(1);
    document.getElementById(
      "damageDisplay"
    ).textContent = `${damageTypeFormatted} Damage: ${damageValue}`;

    // Update example creatures
    document.getElementById("exampleCreatures").textContent = creature.examples;

    // Update the title with level and damage type
    document.getElementById(
      "creatureTitle"
    ).textContent = `Level ${creature.level} Creature (${damageTypeFormatted} Damage)`;
  }
}

// Add event listeners
document
  .getElementById("generateButton")
  .addEventListener("click", updateStatBlock);

// Optional: update examples when level changes
document
  .getElementById("creatureLevel")
  .addEventListener("change", function () {
    const level = parseInt(this.value);
    const creature = creatureData.find((c) => c.level === level);

    if (creature) {
      document.getElementById("exampleCreatures").textContent =
        creature.examples;
    } else {
      document.getElementById("exampleCreatures").textContent =
        "No examples available";
    }
  });

// Function to copy the stat block text to the clipboard
function copyStatBlock() {
  const statText = document.getElementById("statBlock").innerText;
  navigator.clipboard
    .writeText(statText)
    .catch((err) => console.error("Could not copy stat block:", err));
}

// Event listener for the copy button
document
  .getElementById("copyButton")
  .addEventListener("click", copyStatBlock);
