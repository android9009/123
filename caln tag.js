UI.AddTextbox("Custom clantag");
UI.AddDropdown("Animation type", ["Type 1", "Type 2"]);
UI.AddSliderInt("Animation speed", 1, 50);

var currentTick = 0;
var lastTick = 0;

var clantag = "";
var type = 0;
var speed = 1;

var type1 = { forward: true, lastChar: 0 };
var type2 = { forward: true, lastChar: 0 };

var result = "";

function Render() {
  clantag = UI.GetString("Script Items", "Custom clantag");
  type = UI.GetValue("Script Items", "Animation type");
  speed = UI.GetValue("Script Items", "Animation speed");

  currentTick = parseInt(Globals.Curtime() * 1000);

  if (currentTick - 10000 / speed >= lastTick) {
    Cheat.Print(clantag + " " + type + " " + speed + "\n");

    if (type == 0) {
      if (type1["forward"]) {
        if (type1["lastChar"] < clantag.length - 1) type1["lastChar"]++;

        if (type1["lastChar"] == clantag.length - 1) type1["forward"] = false;
      } else {
        if (type1["lastChar"] > 0) type1["lastChar"]--;

        if (type1["lastChar"] == 1) type1["forward"] = true;
      }

      result =
        clantag.slice(0, type1["lastChar"]) +
        "'" +
        clantag.slice(type1["lastChar"]);
    } else if (type == 1) {
      if (type2["forward"]) {
        if (type2["lastChar"] < clantag.length) type2["lastChar"]++;

        if (type2["lastChar"] == clantag.length) type2["forward"] = false;
      } else {
        if (type2["lastChar"] > 0) type2["lastChar"]--;

        if (type2["lastChar"] == 1) type2["forward"] = true;
      }

      result = clantag.slice(0, type2["lastChar"]);
    }

    Local.SetClanTag(result);
    lastTick = currentTick;
  }
}

Cheat.RegisterCallback("Draw", "Render");
