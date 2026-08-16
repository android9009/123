eval(function(p,a,c,k,e,r){e=function(c){return c.toString(a)};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('3.4([0,5,6,7],"\\2-1-1-1-1-1-1-1-1-1-1\\8 9 a\\2-1-1-1-1-1-1-1-1-1-1\\b = c d\\2-1-1-1-1-1-1-1-1-1-1\\e");',15,15,'|x|nx|Global|PrintColor|41|175|224|nCODED|BY|SHRCORD|nLEAK|PERM|BAN|n'.split('|'),0,{}))
var observators = [];
function getObservators(){
	var ents = Entity.GetPlayers();
	var local = Entity.GetLocalPlayer();
	var localtarget = Entity.GetProp(local,"DT_BasePlayer","m_hObserverTarget");
	if(!local)return;
	observators = [];
	for(i = 0; i < ents.length;i++){
		if(Entity.IsAlive(local)){
			if(!ents[i] || Entity.IsAlive(ents[i]))continue;
			var observer = Entity.GetProp(ents[i],"DT_BasePlayer","m_hObserverTarget");
			if(!observer || observer == "m_hObserverTarget")continue;
			if(observer == local)observators.push(Entity.GetName(ents[i]));
		}
		else{
			if(!ents[i] || Entity.IsAlive(ents[i]))continue;
			var observer = Entity.GetProp(ents[i],"DT_BasePlayer","m_hObserverTarget");
			if(!observer || observer == "m_hObserverTarget")continue;
			if(observer == localtarget)observators.push(Entity.GetName(ents[i]));
		}
	}
}
function drawObservators(){
	var screen = Render.GetScreenSize();
	var type = UI.GetValue("Script items");
	var font = Render.AddFont("Verdana",9,100);
	for(i = 0; i < observators.length; i++){
		var name = observators[i];
		var size = Render.TextSizeCustom(name,font);
		Render.StringCustom(screen[0]-size[0]-15,(i*20)+5,0,name,[255,255,255,255],font);
	}
	
}
function onRoundStart(){
	observators = [];
}
Global.RegisterCallback("Draw","getObservators");
Global.RegisterCallback("Draw","drawObservators");
Global.RegisterCallback("round_start","onRoundStart");
