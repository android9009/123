
/*
                           _   _     __    ___    _____                             __  
                          (_) | |   /_ |  / _ \  | ____|                           / /
   ___   ___   _ __ ___    _  | |_   | | | (_) | | |__         _ __ ___   ___     / / 
  / __| / __| | '_ ` _ \  | | | __|  | |  \__, | |___ \       | '_ ` _ \ / _ \   / /  
 | (__  \__ \ | | | | | | | | | |_   | |    / /   ___) |  _   | | | | | |  __/  / /   
  \___| |___/ |_| |_| |_| |_|  \__|  |_|   /_/   |____/  (_)  |_| |_| |_|\___| /_/    
	
	
	Script Name: Super Customizable Killsay
	Script Author: csmit195
	Script Version: 1.0
	Script Description: Literally gives you the ability to create basically any killsay you want. Suggest stuff to me, I got you.
*/

// This is Mustache.js, a great minimalistic templating engine, if the admins or mods feel odd about it, feel free to head to the github https://github.com/janl/mustache.js, and verify that the below mustache.min.js snippet is the source.
(function defineMustache(global,factory){if(typeof exports==="object"&&exports&&typeof exports.nodeName!=="string"){factory(exports)}else if(typeof define==="function"&&define.amd){define(["exports"],factory)}else{global.Mustache={};factory(global.Mustache)}})(this,function mustacheFactory(mustache){var objectToString=Object.prototype.toString;var isArray=Array.isArray||function isArrayPolyfill(object){return objectToString.call(object)==="[object Array]"};function isFunction(object){return typeof object==="function"}function typeStr(obj){return isArray(obj)?"array":typeof obj}function escapeRegExp(string){return string.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")}function hasProperty(obj,propName){return obj!=null&&typeof obj==="object"&&propName in obj}function primitiveHasOwnProperty(primitive,propName){return primitive!=null&&typeof primitive!=="object"&&primitive.hasOwnProperty&&primitive.hasOwnProperty(propName)}var regExpTest=RegExp.prototype.test;function testRegExp(re,string){return regExpTest.call(re,string)}var nonSpaceRe=/\S/;function isWhitespace(string){return!testRegExp(nonSpaceRe,string)}var entityMap={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;","`":"&#x60;","=":"&#x3D;"};function escapeHtml(string){return String(string).replace(/[&<>"'`=\/]/g,function fromEntityMap(s){return entityMap[s]})}var whiteRe=/\s*/;var spaceRe=/\s+/;var equalsRe=/\s*=/;var curlyRe=/\s*\}/;var tagRe=/#|\^|\/|>|\{|&|=|!/;function parseTemplate(template,tags){if(!template)return[];var lineHasNonSpace=false;var sections=[];var tokens=[];var spaces=[];var hasTag=false;var nonSpace=false;var indentation="";var tagIndex=0;function stripSpace(){if(hasTag&&!nonSpace){while(spaces.length)delete tokens[spaces.pop()]}else{spaces=[]}hasTag=false;nonSpace=false}var openingTagRe,closingTagRe,closingCurlyRe;function compileTags(tagsToCompile){if(typeof tagsToCompile==="string")tagsToCompile=tagsToCompile.split(spaceRe,2);if(!isArray(tagsToCompile)||tagsToCompile.length!==2)throw new Error("Invalid tags: "+tagsToCompile);openingTagRe=new RegExp(escapeRegExp(tagsToCompile[0])+"\\s*");closingTagRe=new RegExp("\\s*"+escapeRegExp(tagsToCompile[1]));closingCurlyRe=new RegExp("\\s*"+escapeRegExp("}"+tagsToCompile[1]))}compileTags(tags||mustache.tags);var scanner=new Scanner(template);var start,type,value,chr,token,openSection;while(!scanner.eos()){start=scanner.pos;value=scanner.scanUntil(openingTagRe);if(value){for(var i=0,valueLength=value.length;i<valueLength;++i){chr=value.charAt(i);if(isWhitespace(chr)){spaces.push(tokens.length);indentation+=chr}else{nonSpace=true;lineHasNonSpace=true;indentation+=" "}tokens.push(["text",chr,start,start+1]);start+=1;if(chr==="\n"){stripSpace();indentation="";tagIndex=0;lineHasNonSpace=false}}}if(!scanner.scan(openingTagRe))break;hasTag=true;type=scanner.scan(tagRe)||"name";scanner.scan(whiteRe);if(type==="="){value=scanner.scanUntil(equalsRe);scanner.scan(equalsRe);scanner.scanUntil(closingTagRe)}else if(type==="{"){value=scanner.scanUntil(closingCurlyRe);scanner.scan(curlyRe);scanner.scanUntil(closingTagRe);type="&"}else{value=scanner.scanUntil(closingTagRe)}if(!scanner.scan(closingTagRe))throw new Error("Unclosed tag at "+scanner.pos);if(type==">"){token=[type,value,start,scanner.pos,indentation,tagIndex,lineHasNonSpace]}else{token=[type,value,start,scanner.pos]}tagIndex++;tokens.push(token);if(type==="#"||type==="^"){sections.push(token)}else if(type==="/"){openSection=sections.pop();if(!openSection)throw new Error('Unopened section "'+value+'" at '+start);if(openSection[1]!==value)throw new Error('Unclosed section "'+openSection[1]+'" at '+start)}else if(type==="name"||type==="{"||type==="&"){nonSpace=true}else if(type==="="){compileTags(value)}}stripSpace();openSection=sections.pop();if(openSection)throw new Error('Unclosed section "'+openSection[1]+'" at '+scanner.pos);return nestTokens(squashTokens(tokens))}function squashTokens(tokens){var squashedTokens=[];var token,lastToken;for(var i=0,numTokens=tokens.length;i<numTokens;++i){token=tokens[i];if(token){if(token[0]==="text"&&lastToken&&lastToken[0]==="text"){lastToken[1]+=token[1];lastToken[3]=token[3]}else{squashedTokens.push(token);lastToken=token}}}return squashedTokens}function nestTokens(tokens){var nestedTokens=[];var collector=nestedTokens;var sections=[];var token,section;for(var i=0,numTokens=tokens.length;i<numTokens;++i){token=tokens[i];switch(token[0]){case"#":case"^":collector.push(token);sections.push(token);collector=token[4]=[];break;case"/":section=sections.pop();section[5]=token[2];collector=sections.length>0?sections[sections.length-1][4]:nestedTokens;break;default:collector.push(token)}}return nestedTokens}function Scanner(string){this.string=string;this.tail=string;this.pos=0}Scanner.prototype.eos=function eos(){return this.tail===""};Scanner.prototype.scan=function scan(re){var match=this.tail.match(re);if(!match||match.index!==0)return"";var string=match[0];this.tail=this.tail.substring(string.length);this.pos+=string.length;return string};Scanner.prototype.scanUntil=function scanUntil(re){var index=this.tail.search(re),match;switch(index){case-1:match=this.tail;this.tail="";break;case 0:match="";break;default:match=this.tail.substring(0,index);this.tail=this.tail.substring(index)}this.pos+=match.length;return match};function Context(view,parentContext){this.view=view;this.cache={".":this.view};this.parent=parentContext}Context.prototype.push=function push(view){return new Context(view,this)};Context.prototype.lookup=function lookup(name){var cache=this.cache;var value;if(cache.hasOwnProperty(name)){value=cache[name]}else{var context=this,intermediateValue,names,index,lookupHit=false;while(context){if(name.indexOf(".")>0){intermediateValue=context.view;names=name.split(".");index=0;while(intermediateValue!=null&&index<names.length){if(index===names.length-1)lookupHit=hasProperty(intermediateValue,names[index])||primitiveHasOwnProperty(intermediateValue,names[index]);intermediateValue=intermediateValue[names[index++]]}}else{intermediateValue=context.view[name];lookupHit=hasProperty(context.view,name)}if(lookupHit){value=intermediateValue;break}context=context.parent}cache[name]=value}if(isFunction(value))value=value.call(this.view);return value};function Writer(){this.cache={}}Writer.prototype.clearCache=function clearCache(){this.cache={}};Writer.prototype.parse=function parse(template,tags){var cache=this.cache;var cacheKey=template+":"+(tags||mustache.tags).join(":");var tokens=cache[cacheKey];if(tokens==null)tokens=cache[cacheKey]=parseTemplate(template,tags);return tokens};Writer.prototype.render=function render(template,view,partials,tags){var tokens=this.parse(template,tags);var context=view instanceof Context?view:new Context(view);return this.renderTokens(tokens,context,partials,template,tags)};Writer.prototype.renderTokens=function renderTokens(tokens,context,partials,originalTemplate,tags){var buffer="";var token,symbol,value;for(var i=0,numTokens=tokens.length;i<numTokens;++i){value=undefined;token=tokens[i];symbol=token[0];if(symbol==="#")value=this.renderSection(token,context,partials,originalTemplate);else if(symbol==="^")value=this.renderInverted(token,context,partials,originalTemplate);else if(symbol===">")value=this.renderPartial(token,context,partials,tags);else if(symbol==="&")value=this.unescapedValue(token,context);else if(symbol==="name")value=this.escapedValue(token,context);else if(symbol==="text")value=this.rawValue(token);if(value!==undefined)buffer+=value}return buffer};Writer.prototype.renderSection=function renderSection(token,context,partials,originalTemplate){var self=this;var buffer="";var value=context.lookup(token[1]);function subRender(template){return self.render(template,context,partials)}if(!value)return;if(isArray(value)){for(var j=0,valueLength=value.length;j<valueLength;++j){buffer+=this.renderTokens(token[4],context.push(value[j]),partials,originalTemplate)}}else if(typeof value==="object"||typeof value==="string"||typeof value==="number"){buffer+=this.renderTokens(token[4],context.push(value),partials,originalTemplate)}else if(isFunction(value)){if(typeof originalTemplate!=="string")throw new Error("Cannot use higher-order sections without the original template");value=value.call(context.view,originalTemplate.slice(token[3],token[5]),subRender);if(value!=null)buffer+=value}else{buffer+=this.renderTokens(token[4],context,partials,originalTemplate)}return buffer};Writer.prototype.renderInverted=function renderInverted(token,context,partials,originalTemplate){var value=context.lookup(token[1]);if(!value||isArray(value)&&value.length===0)return this.renderTokens(token[4],context,partials,originalTemplate)};Writer.prototype.indentPartial=function indentPartial(partial,indentation,lineHasNonSpace){var filteredIndentation=indentation.replace(/[^ \t]/g,"");var partialByNl=partial.split("\n");for(var i=0;i<partialByNl.length;i++){if(partialByNl[i].length&&(i>0||!lineHasNonSpace)){partialByNl[i]=filteredIndentation+partialByNl[i]}}return partialByNl.join("\n")};Writer.prototype.renderPartial=function renderPartial(token,context,partials,tags){if(!partials)return;var value=isFunction(partials)?partials(token[1]):partials[token[1]];if(value!=null){var lineHasNonSpace=token[6];var tagIndex=token[5];var indentation=token[4];var indentedValue=value;if(tagIndex==0&&indentation){indentedValue=this.indentPartial(value,indentation,lineHasNonSpace)}return this.renderTokens(this.parse(indentedValue,tags),context,partials,indentedValue)}};Writer.prototype.unescapedValue=function unescapedValue(token,context){var value=context.lookup(token[1]);if(value!=null)return value};Writer.prototype.escapedValue=function escapedValue(token,context){var value=context.lookup(token[1]);if(value!=null)return mustache.escape(value)};Writer.prototype.rawValue=function rawValue(token){return token[1]};mustache.name="mustache.js";mustache.version="3.1.0";mustache.tags=["{{","}}"];var defaultWriter=new Writer;mustache.clearCache=function clearCache(){return defaultWriter.clearCache()};mustache.parse=function parse(template,tags){return defaultWriter.parse(template,tags)};mustache.render=function render(template,view,partials,tags){if(typeof template!=="string"){throw new TypeError('Invalid template! Template should be a "string" '+'but "'+typeStr(template)+'" was given as the first '+"argument for mustache#render(template, view, partials)")}return defaultWriter.render(template,view,partials,tags)};mustache.to_html=function to_html(template,view,partials,send){var result=mustache.render(template,view,partials);if(isFunction(send)){send(result)}else{return result}};mustache.escape=escapeHtml;mustache.Scanner=Scanner;mustache.Context=Context;mustache.Writer=Writer;return mustache});

// And this is my code.

const script = {hide:[]};
const colours = {
	white: '',
	green: '',
	blue: '',
	darkblue: '',
	darkred: '',
	gold: '',
	grey: '',
	lightgreen: '',
	lightred: '',
	lime: '',
	orchid: '',
	yellow: '   ',
	palered: ''
}

script.init = function(){
	UI.AddCheckbox('Kill Message')
	UI.AddTextbox('Template');
	script.hide.push('Template')
	var HelpLabels = [
		'Template Tags:',
		'{n} Your name',
		'{v} Victims Name',
		'{a} Assists Name',
		'{kda.k} Victims Kills',
		'{kda.d} Victims Deaths',
		'{kda.a} Victims Assists',
		'{w} Weapon Name',
		'{s} Suicide (Boolean)',
		'{ivb} Is Victim Bot? (Boolean)',
		'{iab} Is Assist Bot? (Boolean)',
		'{hs} Headshot (Boolean)',
		'{p} Penetrated (Boolean)',
		'COLORS:',
		'{#c.g}text{/c.g} - Green',
		'{#c.b}text{/c.b} - Blue',
		'{#c.db}text{/c.db} - Dark Blue',
		'{#c.dr}text{/c.dr} - Dark Red',
		'{#c.gl}text{/c.gl} - Gold',
		'{#c.gr}text{/c.gr} - Grey',
		'{#c.lg}text{/c.lg} - Light Green',
		'{#c.lr}text{/c.lr} - Light Red',
		'{#c.l}text{/c.l} - Lime',
		'{#c.o}text{/c.o} - Orchid',
		'{#c.y}text{/c.y} - Yellow',
		'{#c.pr}text{/c.pr} - Pale Red'
		//'{d} Dominated Count(broken?)',
		//'{r} Revenge (broken?)',
	];
	for ( i = 0; i < HelpLabels.length; i++ ) {
		var Label = HelpLabels[i];
		script.hide.push(Label);
		UI.AddLabel(Label);
	}
	
	// Disable Mustache.JS HTML Escape:
	Mustache.escape = function (value){
		return value;
	};
	
	Mustache.tags = ['{', '}'];

	// Register Events
	Global.RegisterCallback('player_death', 'script.player_death');
	Global.RegisterCallback('Draw', 'script.updateVisibility');
}

script.get = {
    value(v) {
        return UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', v);
    },
    string(s) {
        return UI.GetString('Misc', 'JAVASCRIPT', 'Script items', s);
    }
}

script.set = function(s,v){
	UI.SetValue('Misc', 'JAVASCRIPT', 'Script items', s, v);
}

script.visible = function(s,v){
	UI.SetEnabled('Misc', 'JAVASCRIPT', 'Script items', s, v);
}

script.say = function(msg){
	Global.ExecuteCommand('say ' + msg)
}

script.colourFunction = function(color){
	// Nested Functions? Don't ask me, its how Mustache likes it...
	return function(){
		return function(text, render){
			return colours[color] + render(text) + colours.white
		}
	}
}

script.player_death = function() {
	if ( !script.get.value('Kill Message') )
		return
	
	var AttackerEntity = Entity.GetEntityFromUserID(Event.GetInt('attacker')),
		VictimEntity = Entity.GetEntityFromUserID(Event.GetInt('userid')),
		AssisterEntity = Entity.GetEntityFromUserID(Event.GetInt('assister'));
	
	if ( !Entity.IsLocalPlayer(AttackerEntity) )
		return
	
	var eData = {
		n: Entity.GetName(Entity.GetLocalPlayer()), //attacker
		v: Entity.GetName(VictimEntity), //victim
		a: Entity.GetName(AssisterEntity), //assister
		kda: {k: Entity.GetProp(VictimEntity, 'CPlayerResource', 'm_iKills'), d: Entity.GetProp(VictimEntity, 'CPlayerResource', 'm_iDeaths') + 1, a: Entity.GetProp(VictimEntity, 'CPlayerResource', 'm_iAssists')},
		w: Event.GetString('weapon'), //weapon
		s: (AttackerEntity == VictimEntity), //suicide
		ivb: Entity.IsBot(VictimEntity), //isVictimBot
		iab: Entity.IsBot(AssisterEntity), //isAssisterBot
		hs: Event.GetInt('headshot'), //headshot
		d: Event.GetInt('dominated'), //dominated
		r: Event.GetInt('revenge'), //revenge
		p: (Event.GetInt('penetrated') > 0), //penetrated
		c: {
			g: script.colourFunction('green'),
			b: script.colourFunction('blue'),
			db: script.colourFunction('darkblue'),
			dr: script.colourFunction('darkred'),
			gl: script.colourFunction('gold'),
			gr: script.colourFunction('grey'),
			lg: script.colourFunction('lightgreen'),
			lr: script.colourFunction('lightred'),
			l: script.colourFunction('lime'),
			o: script.colourFunction('orchid'),
			y: script.colourFunction('yellow'),
			pr: script.colourFunction('palered')
		}
	};
	
	var output = Mustache.render(script.get.string('Template'), eData, {}, ['{', '}']);
	if ( output ) {
		script.say(output);
	} else {
		Global.Print('KILLSAY: Malformed Template, try again\n');
	}
}

script.updateVisibility = function(){
	var Toggle = (script.get.value('Kill Message') == 1) && true || false;
	for ( i = 0; i < script.hide.length; i++ ) {
		script.visible(script.hide[i], Toggle);
	}
}

script.init();