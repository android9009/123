// User configurable
var tags = {
    "Feel"     : "YourPresetHere",
    "Free"     : "YourPresetHere",
    "To"       : "YourPresetHere",
    "Add"      : "YourPresetHere",
    "Presets"  : "YourPresetHere"
};

/*--------------------------------------------------------------------------------
-- Utility functions
--------------------------------------------------------------------------------*/
function collect_keys(tbl, custom) {
    var keys = Object.keys( tbl );
 
    if ( custom ) {
        keys.unshift( "Disabled" );
        keys.push( "Custom" );
    }
 
    return keys;
}
 
var __lastSetClanTag = "";
function _setClanTag(tag) {
    if ( __lastSetClanTag == tag ) return false;
    __lastSetClanTag = tag;
    Local.SetClanTag( tag );
    return true;
}
/*--------------------------------------------------------------------------------
-- Constants and variables
--------------------------------------------------------------------------------*/

var tag = "";
var tag_index = 0;
var tag_index_offset = 0;
var tag_length = 0;
var tag_reverse = 0;
var tag_last_index = 0;
var time_last_update = 0;
 
var update_after = Globals.Curtime();
 
var commands = 0;
 
/*--------------------------------------------------------------------------------
-- Clan tag animations
--------------------------------------------------------------------------------*/
 
function staticTag() {
    if (tag == "Disabled") return;
    _setClanTag( tag );
}
 
function timeTag() {
    var curTime = Globals.Curtime();
    if ( curTime - time_last_update < 1 ) return; // Only needs to update once per second. Just a tiny optimization.
    time_last_update = curTime;
 
    var curDate = new Date();
    var hours = curDate.getHours() + "";
    if ( hours.length == 1 ) hours = "0" + hours;
    var minutes = curDate.getMinutes() + "";
    if ( minutes.length == 1 ) minutes = "0" + minutes;
    var seconds = curDate.getSeconds() + "";
    if ( seconds.length == 1 ) seconds = "0" + seconds;
 
    var time_tag = hours + ":" + minutes + ":" + seconds;
    _setClanTag( time_tag );
}
 
function defaultTag() {
    if (tag_index == tag_last_index) return;
    _setClanTag( tag_index == 0 ? "\0" : tag.substr( 0, tag_index ) );
}
 
function reverseTag() {
    if ( tag_index == tag_last_index ) return;
 
    if ( tag_reverse <= tag_length ) {
        _setClanTag( tag.substr( 0, tag_index ) );
    } else {
        _setClanTag( (tag_length - tag_index == 0) ? "\0" : tag.substr( 0, tag_length - tag_index ) );
    }
}

function loopTag() {
    if ( tag_index == tag_last_index ) return;
    var loop_tag = tag;

    for ( var i = 0; i <= tag_index; i++ ) { // Only until we reach tag_index
        loop_tag = loop_tag + loop_tag.substr( 0, 1 );     // Copy first character to the back
        loop_tag = loop_tag.substr( 1, loop_tag.length );  // Then delete the first character
    }

    _setClanTag( loop_tag );
}

function loopTagSkip(force) {
    force = force || false;

    if ( tag_index == tag_last_index && !force ) return;
    var loop_tag = tag;

    for ( var i = 0; i <= tag_index; i++ ) { // Only until we reach tag_index
        loop_tag = loop_tag + loop_tag.substr( 0, 1 );     // Copy first character to the back
        loop_tag = loop_tag.substr( 1, loop_tag.length );  // Then delete the first character
    }
 
    var visibleTag = loop_tag.substr( 0, 15 ).trim();
    if ( visibleTag.length == 1 ) {
        var realLength = loop_tag.length / 3;
        var idx = 9 + (realLength - 8) * 3; // Figure out at which index we need to skip once

        if ( tag_index == idx ) {
            tag_index++;
            tag_last_index++;
            tag_index_offset++;
            return loopTagSkip( true );
        }
    }

    _setClanTag( loop_tag );
}
 
function killDickTag() {
    // Update once every 0.3 seconds
    var curTime = Globals.Curtime();
    if ( curTime - time_last_update < 0.3 ) return;
    time_last_update = curTime;
 
    var killdick_mode = getUIValue( menu.killDickMode, undefined, false );
    var maxAmount = getUIValue( menu.killDickLength, "text" );
 
    // Modes 0, 1, 2 use the scoreboard for maxAmount
    if ( killdick_mode < 3 ) {
        var playerEntities = killdick_mode == 0
            ? Entity.GetPlayers() // relative to
            : killdick_mode == 1
                ? Entity.GetPlayers().filter(function(e) { return Entity.IsTeammate(e); }) // relative to teammates
                : Entity.GetPlayers().filter(function(e) { return !Entity.IsTeammate(e); }); // relative to enemies
 
        // Get highest kill count
        maxAmount = Math.max.apply( Math, playerEntities.map(function(e) { return Entity.GetProp( e, "CPlayerResource", "m_iKills" ); }) );
    } else {
        // Otherwise just use maxAmount from the textbox. On invalid input, default to 1.
        maxAmount = parseInt( maxAmount );
        maxAmount = (maxAmount <= 0 || isNaN( maxAmount )) ? 1 : maxAmount;
    }
 
    // get kills for player
    var playerEntity = Entity.GetLocalPlayer();
    var kills = Entity.GetProp( playerEntity, "CPlayerResource", "m_iKills" );
 
    // calculate size percentage
    var p = maxAmount == 0 ? 0 : (kills / maxAmount); // catch division by zero
    if ( p > 1 ) p = 1;
 
    // We have 15 characters; 1 reserved for balls and 1 for the tip and at least one for shaft. Yes I just wrote that.
    var shaftAmount = Math.floor( p * 12 );
 
    _setClanTag( "8" + "=".repeat( shaftAmount + 1 ) + "D" );
}
 
var animations = {
    "Static"  : staticTag,
    "Time"    : timeTag,
    "Default" : defaultTag,
    "Reverse" : reverseTag,
    "Classic" : loopTag,
    "Classic (skip first)" : loopTagSkip,
    "Loop"    : loopTag,
    "Killdick": killDickTag // :^)
};
 
var killdickModes = [
    "Relative to all",
    "Relative to team",
    "Relative to enemies",
    "Relative to custom limit"
];
 
/*--------------------------------------------------------------------------------
-- Menu
--------------------------------------------------------------------------------*/
 
function uiTransform(key, value) {
    var t = {
        "Animation" : function(value) { // index => name, name => index
            if ( typeof value == "string" ) {
                return collect_keys( animations, false ).indexOf( value );
            }
 
            return collect_keys( animations, false )[ value ];
        },
        "Tags" : function(value) { // index => name, name => index
            if ( typeof value == "string" ) {
                return collect_keys( tags, true )[ value ].indexOf( value );
            }
 
            return collect_keys( tags, true )[ value ];
        },
        "Mode" : function(value) {
            if ( typeof value == "string" ) {
                return killdickModes.indexOf( value );
            }
 
            return killdickModes[ value ];
        }
    };
 
    if ( t[ key ] ) return t[ key ]( value );
    return value;
}
 
function setUIValue(key, value) {
    UI.SetValue( "Misc", "JAVASCRIPT", "Script items", "[TC] " + key, value );
}
 
function getUIValue(key, type, doTransform) {
    doTransform = doTransform === undefined ? true : false;
    type = type || "default";
    var raw = null;
 
    if ( type == "default" ) raw = UI.GetValue( "Misc", "JAVASCRIPT", "Script items", "[TC] " + key );
    if ( type == "text" ) {
        raw = UI.GetString( "Misc", "JAVASCRIPT", "Script items", "[TC] " + key );
        if ( !raw || !raw.length ) raw = "\0";
    }
 
    return doTransform ? uiTransform( key, raw ) : raw;
}
 
function setUIEnabled(key, value) {
    UI.SetEnabled( "Misc", "JAVASCRIPT", "Script items", "[TC] " + key, value );
}
 
var menu = {
    enabled : "Clan Tag Changer",
    tags : "Tags",
    styles : "Animation",
    killDickMode : "Mode",
    killDickLength : "Kill-dick max size at kill amount",
    speed : "Speed",
    text : "Text"
};
 
UI.AddCheckbox( "[TC] " + menu.enabled );
UI.AddDropdown( "[TC] " + menu.tags, collect_keys( tags, true ) );
UI.AddTextbox( "[TC] " + menu.text );
UI.AddDropdown( "[TC] " + menu.styles, collect_keys( animations, false ) );
UI.AddDropdown( "[TC] " + menu.killDickMode, killdickModes );
UI.AddTextbox( "[TC] " + menu.killDickLength );
UI.AddSliderInt( "[TC] " + menu.speed, 0, 100 );
setUIValue( menu.speed, 30 );
 
function handle_menu(e) {
    if ( e && e.what == menu.tags && e.after == "Disabled" ) {
        _setClanTag( "\0" ); // Set tag to nothing if Tags is set to Disabled.
    }
 
    var state = getUIValue( menu.enabled );
    var menu_tag = getUIValue( menu.tags );
    var tag_style = getUIValue( menu.styles );
    var killdick_mode = getUIValue( menu.killDickMode );
 
    setUIEnabled( menu.tags, state );
    setUIEnabled( menu.styles, state );
    setUIEnabled( menu.speed, state );
    setUIEnabled( menu.killDickMode, state && (tag_style == "Killdick") );
    setUIEnabled( menu.killDickLength, state && (tag_style == "Killdick") && (killdick_mode == killdickModes[ 3 ]) );
    setUIEnabled( menu.text, state && (menu_tag == "Custom") );
 
    if (!state) _setClanTag( "\0" );
}
 
function handle_text_change() {
    update_after = Globals.Curtime() + 1;
    // reset all
    tag_index = 0;
    tag_length = 0;
    tag_reverse = 0;
    tag_last_index = 0;
    _setClanTag( "\0" );
}
 
handle_menu()
 
// Bridge some stuff that exists in the lua...
var listeners = {};
 
function listenerCheck() {
    Object.keys( listeners ).forEach(function(key) {
        var v = getUIValue( key, listeners[ key ].type );
        if ( v != listeners[ key ].currentValue ) {
            listeners[ key ].callbacks.forEach(function(cb) {
                cb({ before : listeners[ key ].currentValue, after : v, what : key });
            });
 
            listeners[ key ].currentValue = v;
        }
    });
}
 
function listen( onElement, callback, type ) {
    if ( !listeners[ onElement ] ) {
        listeners[ onElement ] = {
            callbacks : [ callback ],
            currentValue : getUIValue( onElement, type ),
            type : type || "default"
        };
    } else {
        listeners[ onElement ].callbacks.push( callback );
    }
}
 
listen( menu.enabled, handle_menu );
listen( menu.tags, handle_menu );
listen( menu.styles, handle_menu );
listen( menu.killDickMode, handle_menu );
listen( menu.text, handle_text_change, "text" );
 
/*--------------------------------------------------------------------------------
-- Game event handling
--------------------------------------------------------------------------------*/
function net_update_end() {
    if ( !getUIValue( menu.enabled ) ) return;
 
    var local_player  = Entity.GetLocalPlayer();
    var menu_tag      = getUIValue( menu.tags );
    var tag_style     = getUIValue( menu.styles );
    var update_tag    = Globals.Curtime() > update_after; //commands == 0 || Entity.IsAlive( local_player ) == false;

    var isClassicVariant = tag_style == "Classic" || tag_style == "Classic (skip first)";

    if ( menu_tag == "Disabled" ) return;
 
    tag          = (menu_tag == "Custom") ? getUIValue( menu.text, "text" ).substr(0,15) : tags[ menu_tag ]; // clip to max length of 15 characters
 
    if ( isClassicVariant && tag.length < 8 ) {
        tag = tag + (" ".repeat( 8 - tag.length ));
    }

    if ( tag_style != "Classic (skip first)" ) {
        tag_index_offset = 0;
    }
 
    tag         = (tag_style == "Loop") ? tag + " " : tag;
    tag         = isClassicVariant ? (tag + " ".repeat( Math.floor( tag.length * 2 ) )) : tag;
    tag_length  = tag.length;
    tag_index   = Math.floor( ( (Globals.Curtime() * getUIValue( menu.speed ) / 10) + tag_index_offset ) % tag_length + 1 );
    tag_reverse = Math.floor( ( Globals.Curtime() * getUIValue( menu.speed ) / 10 ) % ( tag_length * 2 ) + 1 );
 
    if ( !update_tag ) return;
 
    var animation = animations[ tag_style ];
    animation();
 
    tag_last_index = tag_index;
}
 
/*
function run_command(cmd) {
    if ( !getUIValue( menu.enabled ) ) return;
 
    // Can't do this.
    commands = cmd.chokedcommands;
}
*/
 
/*
local function shutdown()
    client_set_clan_tag("\0")
end
*/
 
function onFrameStageNotify() {
    if ( Cheat.FrameStage() == 0 ) listenerCheck();
    if ( Cheat.FrameStage() == 4 ) net_update_end();
}
 
Cheat.RegisterCallback( "FrameStageNotify", "onFrameStageNotify" );
 
//client_set_event_callback("run_command", run_command)
//client_set_event_callback("shutdown", shutdown)