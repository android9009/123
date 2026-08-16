/*--------------------------------------------------------------------------------
-- Utility functions
--------------------------------------------------------------------------------*/
function collect_keys(tbl, custom) {
    var keys = Object.keys( tbl ).sort();

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
var tags = {
    "Toeaim" : "toeaim.gov",
    "Blaster" : "nnblaster",
    "Opulence" : "opulence.cc",
    "Nixware" : "nixware.cc",
    "Gamesense": "gamesense",
    "uwu": "UWUware.nyet",
};

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

    var result = "";
    var loop_tag = tag;

    for ( var i = 0; i <= tag_index; i++ ) {
        loop_tag = loop_tag + loop_tag.substr( 0, 1 );
        loop_tag = loop_tag.substr( 1, loop_tag.length );
    }

    _setClanTag( loop_tag );
}

function killDickTag() {
    // Update once every 0.3 seconds
    var curTime = Globals.Curtime();
    if ( curTime - time_last_update < 0.3 ) return;
    time_last_update = curTime;

    // Read value. Force to at least 1, make sure it's a positive amount.
    // The following exceptions exist: 
    //     1. the textbox contains an "a" - if set to "a", it's relative to every other players score. Meaning the highest score is used as maxAmount.
    //     2. the textbox contains a "t" - if set to "t", it's relative to teammates
    //     3. the textbox contains an "e" - if set to "e", it's relative to the enemy team.
    var killdick_mode = getUIValue( menu.killDickMode, undefined, false );
    var maxAmount = getUIValue( menu.killDickLength, "text" );

    if ( killdick_mode < 3 ) {
        var playerEntities = killdick_mode == 0 
            ? Entity.GetPlayers() // all
            : killdick_mode == 1
                ? Entity.GetPlayers().filter(function(e) { return Entity.IsTeammate(e); }) // teammates
                : Entity.GetPlayers().filter(function(e) { return !Entity.IsTeammate(e); }); // enemies

        maxAmount = Math.max.apply( Math, playerEntities.map(function(e) { return Entity.GetProp( e, "CPlayerResource", "m_iKills" ); }) );
    } else {
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
    //Global.Print( "SetValue: " + key + " to " + value + "\n" );
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

    var val = doTransform ? uiTransform( key, raw ) : raw;
    //Global.Print( "GetValue: " + key + " got " + val + "\n" );
    return val;
}

function getKilldickValue() {

}

function setUIEnabled(key, value) {
    //Global.Print( "SetEnabled: " + key + " to " + value + "\n" );
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

UI.AddCheckbox( "[TC] Clan Tag Changer" );
UI.AddDropdown( "[TC] Tags", collect_keys( tags, true ) );
UI.AddTextbox( "[TC] Text" );
UI.AddDropdown( "[TC] Animation", collect_keys( animations, false ) );
UI.AddDropdown( "[TC] " + menu.killDickMode, killdickModes );
UI.AddTextbox( "[TC] " + menu.killDickLength );
UI.AddSliderInt( "[TC] Speed", 0, 100 );
setUIValue( "Speed", 30 );

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

    if ( menu_tag == "Disabled" ) return;

    tag          = (menu_tag == "Custom") ? getUIValue( menu.text, "text" ).substr(0,15) : tags[ menu_tag ]; // clip to max length of 15 characters

    if ( tag_style == "Classic" && tag.length < 8 ) {
        // Work-around for classic animation. Couldn't figure out why this behaves oddly when it has less than 7 characters and right now I can't look into it :)
        tag = tag + (" ".repeat( 8 - tag.length ));
    }

    tag         = (tag_style == "Loop") ? tag + " " : tag;
    tag         = (tag_style == "Classic") ? (tag + " ".repeat( Math.floor( tag.length * 2 ) )) : tag;
    tag_length  = tag.length;
    tag_index   = Math.floor( ( (Globals.Curtime() * getUIValue( menu.speed ) / 10) + tag_index_offset ) % tag_length + 1 );
    
    if ( tag_style == "Classic" && menu_tag == "Gamesense" && tag_index == 12 ) {
        // Force-advance index by one.
        tag_index_offset++;
    } else if ( menu_tag != "Gamesense" || tag_style != "Classic" ) {
        tag_index_offset = 0;
    }

    tag_reverse = Math.floor( ( Globals.Curtime() * getUIValue( menu.speed ) / 10 ) % ( tag_length * 2 ) + 1 );

    //Cheat.Print( "tag: " + tag + " length: " + tag_length + " index: " + tag_index + " reverse: " + tag_reverse + "\n" );
    // For Classic tag style with GS behaviour enabled, skip the first letter

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