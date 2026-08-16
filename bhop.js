/*
 *
 * Author: april#0001
 * Customer: nomercy112#0001
 *
 */

 //region dependencies

 /**
  * @title BetterUI
  * @version 2.0.1
  * @description A better UI system for Onetap
  */

 var menu = [];
 const menu_spacer = "                                                                                  ";

 /**
  * Concats two elements into an array without increasing the array length.
  * Prevents the memory leak in 2.0.0 from happening
  *
  * @param a {array}
  * @param b {any}
  */
 menu.concat = function(a, b)
 {
     // Creates a new array.
     var arr = [];

     // Push all items from the array 'a' into our array.
     for (var c in a)
     {
         arr.push(a[c]);
     }

     // Push the value 'b' into our array.
     arr.push(b);

     // Return the new array.
     return arr;
 }

 /**
  * Creates a new menu label
  *
  * @param label {string}
  */
 menu.label = function(label)
 {
     // Creates the label
     UI.AddLabel(label);
 };

 /**
  * Creates a new menu element
  *
  * @param func {function}
  * @param name {string}
  * @param label {string},
  * @param properties {array}
  */
 menu.call = function(func, name, label, properties)
 {
     // Get properties
     const final_name = name + menu_spacer + label;
     var final_props = [final_name];
     const element_info_t = {
         path: ["Misc", "JAVASCRIPT", "Script items", final_name]
     };

     // If our properties aren't null, then pack them together.
     if (properties != null)
     {
         for (var i = 0; i < properties.length; i++)
         {
             final_props.push(properties[i]);
         }
     }

     // Create our menu element and return properties
     func.apply(null, final_props);
     return element_info_t;
 };

 /**
  * Creates a new menu reference
  *
  * @param path {array}
  */
 menu.reference = function(path)
 {
     const element_info_t = {
         path: path
     };

     return element_info_t;
 };

 /**
  * Gets the value of a menu element
  *
  * @param elem {array}
  * @return {*}
  */
 menu.get = function(elem)
 {
     // If the element doesn't exist
     if (!(elem.path))
         throw new Error("[Menu] This element doesn't exist!");

     // Returns the element's value
     return UI.GetValue.apply(null, elem.path);
 };

 /**
  * Gets the value of a menu element
  *
  * @param elem {array}
  * @return {*}
  */
 menu.get_hotkey = function(elem)
 {
     // If the label doesn't exist
     if (!(elem.path))
         throw new Error("[Menu] This element doesn't exist!");

     // Returns the element's value
     return UI.IsHotkeyActive.apply(null, elem.path);
 };

 /**
  * Gets the value of a menu element
  *
  * @param elem {array}
  * @return {*}
  */
 menu.get_color = function(elem)
 {
     // If the label doesn't exist
     if (!(elem.path))
         throw new Error("[Menu] This element doesn't exist!");

     // Returns the element's value
     return UI.GetColor.apply(null, elem.path);
 };

 /**
  * Sets the value of a menu element
  *
  * @param elem {array}
  * @param value {*}
  */
 menu.set = function(elem, value)
 {
     // If the label doesn't exist
     if (!(elem.path))
         throw new Error("[Menu] This element doesn't exist!");

     // Get properties
     const properties = elem;

     // Set the element's value
     UI.SetValue.apply(null, this.concat(properties.path, value));
 };

 /**
  * Sets the value of a color picker
  *
  * @param elem {array}
  * @param color {array|Color}
  */
 menu.set_color = function(elem, color)
 {
     // If the label doesn't exist
     if (!(elem.path))
         throw new Error("[Menu] This element doesn't exist!");

     // Get properties
     const properties = elem;

     // Set the element's value
     UI.SetColor.apply(null, this.concat(properties.path, color));
 };

 /**
  * Toggles a hotkey
  *
  * @param elem {array}
  */
 menu.toggle = function(elem)
 {
     // If the label doesn't exist
     if (!(elem.path))
         throw new Error("[Menu] This element doesn't exist!");

     // Set the element's value
     UI.ToggleHotkey.apply(null, elem.path);
 };

 /**
  * Changes the visibility of a menu elements
  *
  * @param elem {array}
  * @param visible {boolean}
  */
 menu.visibility = function(elem, visible)
 {
     // If the label doesn't exist
     if (!(elem.path))
         throw new Error("[Menu] This element doesn't exist!");

     // Get properties
     const properties = elem;

     // Change the element's visibility
     UI.SetEnabled.apply(null, this.concat(properties.path, visible));
 };

const between = function(v, c, f)
{
    return v < c && v > f;
}

 //endregion

//region locals

var MAX_VEL_CONSTANT = 0.350877193;

//endregion

//region menu

const autostrafer = menu.call(UI.AddDropdown, "| Dynamic autostrafer", "nomercy_dyn_autostrafer", [["Off", "Prefer acceleration", "Prefer mobility"]]);

const on_shot_bind = menu.call(UI.AddHotkey, "| On-shot on key", "nomercy_onshot_key", []);

const ref_autostrafer_speed = menu.reference(["Misc", "Movement", "Turn speed"]);
const ref_on_shot = menu.reference(["Rage", "Exploits", "Hide shots"]);

//endregion

//region functions

function do_auto_strafer()
{
    const mode = menu.get(autostrafer)

    if (!mode)
        return;

    const me = Entity.GetLocalPlayer();

    if (!me || !Entity.IsAlive(me))
        return;

    const flags = Entity.GetProp(me, "CBasePlayer", "m_fFlags");

    if (!(flags & 1))
    {
        const velocity = Entity.GetProp(me, "CBasePlayer", "m_vecVelocity[0]");
        const speed = Math.sqrt(velocity[0] ** 2 + velocity[1] ** 2);

        menu.set(ref_autostrafer_speed, mode === 1 ? (100 - speed * MAX_VEL_CONSTANT) : (speed * MAX_VEL_CONSTANT));
    }
}

function do_on_shot()
{
    if (!menu.get_hotkey(on_shot_bind))
        return;

    const me = Entity.GetLocalPlayer();

    if (!me || !Entity.IsAlive(me))
        return;

    const players = Entity.GetEnemies();
    var data = {dmg: 0, target: null};

    for (var i = 0; i < players.length; i++)
    {
        const ent = players[i];
        const pitch = Entity.GetProp(ent, "CCSPlayer", "m_angEyeAngles")[0];

        if (pitch > 89)
            pitch = 360 - pitch;

        if (pitch < 80)
        {
            const line = Trace.Bullet(me, ent, Entity.GetEyePosition(me), Entity.GetHitboxPosition(ent, 0));

            if (line[0] && line[1] > data.dmg)
            {
                data.target = ent;
                data.dmg = line[1];
            }
        }
    }

    if (!data.target)
        return;

    Ragebot.ForceTarget(data.target);
}

function on_create_move()
{
    do_auto_strafer();
    do_on_shot();
}

//endregion

//region callbacks

Cheat.RegisterCallback("CreateMove", "on_create_move");

//endregion
