UI.AddCheckbox("TrashTalk");

const normal_killsays = ["Создатель этого прекрасного кфг - HvH STARS | HvH Community"
];
    
const hs_killsays = ["Подпишись если не пидор|https://vk.com/hvhstars1|"
];

function on_player_death()
{
    if(UI.GetValue("Misc", "TrashTalk"))
    {
        const victim = Entity.GetEntityFromUserID(Event.GetInt("userid"));
        const attacker = Entity.GetEntityFromUserID(Event.GetInt("attacker"));
        const headshot = Event.GetInt("headshot") == 1;
        
        if(Entity.IsLocalPlayer(attacker) && attacker != victim)
        {
            const normal_say = normal_killsays[Math.floor(Math.random() * normal_killsays.length)];
            const hs_say = hs_killsays[Math.floor(Math.random() * hs_killsays.length)];
            
            if(headshot && Math.random() * 2 > 1) //gamer style randomizer
            {
                Cheat.ExecuteCommand("say " + hs_say);
                return;
            }
            Cheat.ExecuteCommand("say " + normal_say);
        }
    }
}

var killsay_amt = normal_killsays.length + hs_killsays.length;

Cheat.Print("trashtalk js loaded, killsay count: " + killsay_amt + "\n");
Cheat.RegisterCallback("player_death", "on_player_death");