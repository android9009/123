var flip = false;
var isInBuyzone = false;

function onEnterBuyzone() {
    var player = Entity.GetEntityFromUserID( Event.GetInt( "userid" ) );
    if ( !player ) return;
    if ( Entity.IsLocalPlayer( player ) ) {
        if ( Event.GetInt( "canbuy" ) ) {
            isInBuyzone = true;
        }
    }
};

function onRoundStart() {
    isInBuyzone = true;
};

function onExitBuyzone() {
    var player = Entity.GetEntityFromUserID( Event.GetInt( "userid" ) );
    if ( !player ) return;
    if ( Entity.IsLocalPlayer( player ) ) {
        isInBuyzone = false;
    }
};

