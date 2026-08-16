//germany indicators boss

var menu = {};
var menu_elements = {};
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
menu.new = function(func, name, label, properties, initial_value)
{
    // Fix values
    properties = properties || [];
    initial_value = initial_value || undefined;

    // Get properties
    const final_name = name + menu_spacer + label;
    var final_props = [final_name];

    const element_info_t = {
        path: ["Misc", "JAVASCRIPT", "Script items", final_name],
        cache: initial_value,
        func: func
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

    // Initialize our menu element if it has an initializer.
    if (initial_value)
    {
        switch (func)
        {
            case UI.AddColorPicker:
                UI.SetColor.apply(null, this.concat(element_info_t.path, initial_value));
                break;

            case UI.AddHotkey:
                break;

            default:
                UI.SetValue.apply(this, this.concat(element_info_t.path, initial_value));
                break;
        }
    }

    menu_elements[label] = element_info_t;

    return element_info_t;
};

/**
 * Creates a new menu reference
 *
 * @param path {array}
 */
menu.reference = function(path, func)
{
    return {
        path: path,
        func: func
    };
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
    switch (elem.func)
    {
        case UI.AddColorPicker:
            return UI.GetColor.apply(null, elem.path);

        case UI.AddHotkey:
            return UI.IsHotkeyActive.apply(null, elem.path);

        default:
            return UI.GetValue.apply(null, elem.path);
    }
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

    // Set the element's value
    switch (elem.func)
    {
        case UI.AddColorPicker:
            UI.SetColor.apply(null, this.concat(elem.path, value));
            break;

        case UI.AddHotkey:
            if (menu.get(elem) !== value)
                UI.ToggleHotkey.apply(null, elem.path);
            break;

        default:
            UI.SetValue.apply(null, this.concat(elem.path, value));
            break;
    }
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

    // Change the element's visibility
    UI.SetEnabled.apply(null, this.concat(elem.path, visible));
};

/**
 * Adds an event to a menu element which is triggered everytime this element's value is changed.
 *
 * @param elem {array}
 * @param func {function}
 */
menu.add_event = function(elem, func)
{
    if (!elem.path)
        throw new Error("[Menu] This element doesn't exist!");

    if (!elem.func)
        throw new Errror("[Menu] This element does not have a valid type. Please, specify one.");

    elem.callback = func;
}

/**
 * Handles the menu elements' events. Call this inside a Draw or FSN callback.
 */
menu.handle_events = function()
{
    for (var label in menu_elements)
    {
        const elem = menu_elements[label];

        if (!elem.path || !elem.callback)
            continue;

        const value = menu.get(elem);

        if (elem.cache === undefined)
            elem.cache = value;

        if (elem.cache !== value)
        {
            elem.callback.apply(null, [elem]);
            elem.cache = value;
        }
    }
}

/**
 * @brief Normalizes an yaw angle.
 * @param angle {number}
 * @returns {number}
 */
function normalize_yaw(angle)
{
    var adjusted_yaw = angle;

    if (adjusted_yaw < -180)
        adjusted_yaw += 360;

    if (adjusted_yaw > 180)
        adjusted_yaw -= 360;

    return adjusted_yaw;
}

Render.Arc = function(x, y, r1, r2, s, d, col)
{
    for (var i = s; i < s + d; i++)
    {
        const rad = i * Math.PI / 180;

        Render.Line(x + Math.cos(rad) * r1, y + Math.sin(rad) * r1, x + Math.cos(rad) * r2, y + Math.sin(rad) * r2, col);
    }
}
//endregion

//region menu
const voffset = menu.new(UI.AddSliderInt, "| Indicators vertical offset", "", [0, 1000]);

const ref_antiaim_enabled = menu.reference(["Anti-Aim", "Fake angles", "Enabled"]);
const ref_fakelag_enabled = menu.reference(["Anti-Aim", "Fake-Lag", "Enabled"]);
const ref_doubletap = menu.reference(["Rage", "GENERAL", "Exploits", "Doubletap"]);
const ref_doubletap_hk = menu.reference(["Rage", "GENERAL", "Exploits", "Doubletap"], UI.AddHotkey);
const ref_hideshots_hk = menu.reference(["Rage", "GENERAL", "Exploits", "Hide shots"], UI.AddHotkey);
//endregion

//region locals
var last_time = 0;
var planted = false;
var bombsite = -1;
var offset = 0;

const modules = [
    {
        label: "DSY",
        condition: function() {
            return menu.get(ref_antiaim_enabled);
        },
        colors: {
            dormant: [186, 0, 16, 225],
            active: [154, 205, 50, 255]
        },
        logic: function() {
            const self = modules[0];

            const real = Local.GetRealYaw(), fake = Local.GetFakeYaw();
            const delta = Math.abs(normalize_yaw(real % 360 - fake % 360)) / 2;

            return delta / 60;
        },
        extra: function(x, y, color) {
            const real = Local.GetRealYaw(), fake = Local.GetFakeYaw();
            const delta = Math.abs(normalize_yaw(real % 360 - fake % 360)) / 2;

            const frac = delta / 60;

            Render.Arc(x+5, y, 7, 13, 0, 360, [10, 10, 10, 60]);
            Render.Arc(x+5, y, 8, 11, 0, 360 * frac, color);
        }
    },
    {
        label: "LC",
        condition: function() {
            const me = Entity.GetLocalPlayer();
            const on_ground = Entity.GetProp(me, "CBasePlayer", "m_fFlags") & 1;

            return menu.get(ref_fakelag_enabled) & (!on_ground || Input.IsKeyPressed(0x20)) & !menu.get(ref_doubletap_hk) & !menu.get(ref_hideshots_hk);
        },
        colors: {
            dormant: [186, 0, 16, 225],
            active: [163, 232, 44, 255]
        },
        logic: function() {
            const self = modules[1];

            const me = Entity.GetLocalPlayer();
            const vec = Entity.GetProp(me, "CBasePlayer", "m_vecVelocity[0]");
            const vel = Math.sqrt(vec[0] ** 2 + vec[1] ** 2 + vec[2] ** 2);

            if (vel > 370)
                return 1;

            return 0;
        }
    }
];
//endregion

//region functions

function draw_timer()
{
    if (!planted)
        return;

    const me = Entity.GetLocalPlayer();

    if (!me)
        return;

    if (!Entity.IsAlive(me))
    {
        if (Entity.GetProp(me, "CBasePlayer", "m_iObserverMode") < 4)
            return;

        me = Entity.GetProp(me, "CBasePlayer", "m_hObserverTarget");
    }

    var c4 = Entity.GetEntitiesByClassID(128)[0];

    if (!c4)
        return;

    const y = Render.GetScreenSize()[1];
    const color = [235, 235, 235, 255];

    var bombsite_label = bombsite % 2 == 0 ? "" : "";

    var timer = (Entity.GetProp(c4, "CPlantedC4", "m_flC4Blow") - Globals.Curtime());

}

function draw_indicators()
{
    const offset_y = menu.get(voffset);
    const y = Render.GetScreenSize()[1] - offset_y;
    const drawn = 0;

    for (var i = 0; i < modules.length; i++)
    {
        const mod = modules[i];

        if (!mod.condition()) continue;

        const result = mod.logic();
        const label_width = Render.TextSize(mod.label, 4)[0];
        const color = [
            mod.colors.dormant[0] + (mod.colors.active[0] - mod.colors.dormant[0]) * result,
            mod.colors.dormant[1] + (mod.colors.active[1] - mod.colors.dormant[1]) * result,
            mod.colors.dormant[2] + (mod.colors.active[2] - mod.colors.dormant[2]) * result,
            255
        ];

        Render.GradientRect(15 + offset, y - 130 - 55 * drawn, label_width + 15, 45, 1, [10, 10, 10, 50], [10, 10, 10, 0]);
        Render.String(25 + offset, y - 125 - 55 * drawn, 0, mod.label, color, 4);

        if (mod.extra)
            mod.extra(40 + offset + label_width, y - 106 - 55 * drawn, color);

        drawn++;
    }
}

function on_draw() {
    const me = Entity.GetLocalPlayer();

    if (!me || !Entity.IsAlive(me))
        return;

    draw_indicators();
    draw_timer();
}

function on_bomb_beginplant()
{
    bombsite = Event.GetInt("site");
    last_time = Globals.Curtime();
}

function on_bomb_planted()
{
    planted = true;
    bombsite = -1;
    offset = 15;
}

function on_bomb_abortplant()
{
    bombsite = -1;
}

function on_bomb_exploded()
{
    planted = false;
    offset = 0;
}

function on_round_prestart()
{
    planted = false;
    offset = 0;
    bombsite = -1;
    last_time = 0;
}

function on_player_connect()
{
    var c4 = Entity.GetEntitiesByClassID(128)[0];

    last_time = 0;

    if (!c4)
    {
        planted = false;
        offset = 0;
        bombsite = -1;
        return;
    }

    planted = true;
    offset = 15;
    bombsite = Entity.GetProp(c4, "CPlantedC4", "m_nBombSite");
}

Cheat.RegisterCallback("Draw", "on_draw");
Cheat.RegisterCallback("bomb_beginplant", "on_bomb_beginplant");
Cheat.RegisterCallback("bomb_planted", "on_bomb_planted");
Cheat.RegisterCallback("bomb_abortplant", "on_bomb_abortplant");
Cheat.RegisterCallback("bomb_exploded", "on_bomb_exploded");
Cheat.RegisterCallback("round_prestart", "on_round_prestart");
Cheat.RegisterCallback("player_connect_full", "on_player_connect");
//endregion
