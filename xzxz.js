const print = function(text, color){
    if(color == undefined)
    Cheat.Print(text.toString() + "\n");
    else
    Cheat.PrintColor(color, text.toString() + "\n");
}
const print_chat = function(text){
    Cheat.PrintChat(text.toString() + "\n");
}
const cmd = function(cmd){
    Cheat.ExecuteCommand(cmd);
}
const getval = function(name){
    return UI.GetValue("Script items", name);
}
const setval = function(name, value){
    return UI.SetValue("Script items", name, value);
}
const getcol = function(name){
    return UI.GetColor("Script items", name);
}
const text = function(x, y, a, text, color, font)
{
    Render.StringCustom(x + 1, y, a, text, [0, 0, 0, color[3]], font);
    Render.StringCustom(x - 1, y, a, text, [0, 0, 0, color[3]], font);
    Render.StringCustom(x, y + 1, a, text, [0, 0, 0, color[3]], font);
    Render.StringCustom(x, y - 1, a, text, [0, 0, 0, color[3]], font);
    Render.StringCustom(x, y, a, text, color, font);
}
const vec2d = function(xx,yy){
    this.x = xx;
    this.y = yy;
    this.length = function(){
        return Math.sqrt(this.x*this.x + this.y*this.y);
    }
    this.toarray = function(){
        return [this.x, this.y];
    }
    return this;
}
const vec3d = function(xx,yy,zz){
    this.x = xx;
    this.y = yy;
    this.z = zz;
    this.length2d = function(){
        return Math.sqrt(this.x*this.x + this.y*this.y);
    }
    this.length = function(){
        return Math.sqrt(this.x*this.x + this.y*this.y + this.z*this.z);
    }
    this.normalize = function(){
        var l = this.length();
        if (l != 0.0)
			this /= l;
		else
			this.x = this.y = this.z = 0.0;
		return l;
    }
    this.distto = function(vec){
        var delta = new vec3d;

        delta.x = this.x - vec.x;
        delta.y = this.y - vec.y;
        delta.z = this.z - vec.z;

        return delta.length();
    }
    this.toarray = function(){
        return [this.x, this.y, this.z];
    }
    this.clamp = function(){
        if (this.x < -89.0)
        this.x = -89.0;

		if (this.x > 89.0)
        this.x = 89.0;

		while (this.y < -180.0)
        this.y += 360.0;

		while (this.y > 180.0)
        this.y -= 360.0;

		this.z = 0.0;
		return this;
    }
    return this;
}
const v3d = function(x,y,z){
    return new vec3d(x,y,z);
}

/**
 * @title New Math
 * @version 1.0
 * @description Additional math functions
 */

var math = {
    _class: 'math'
};

math.vector_angles = function(forward, angles){
    if (forward.y == 0.0 && forward.x == 0.0)
    {
        angles.x = (forward.z > 0.0) ? 270.0 : 90.0;
        angles.y = 0.0;
    }
    else
    {
        angles.x = Math.atan2(-forward.z, forward.length2d()) * -180 / Math.PI;
        angles.y = Math.atan2(forward.y, forward.x) * 180 / Math.PI;
        if (angles.y > 90) angles.y -= 180;
        else if (angles.y < 90) angles.y += 180;
        else if (angles.y == 90) angles.y = 0;
    }
    angles.z = 0.0;
}
math.crossproduct = function(a,b){
    return new vec3d(a.y*b.z - a.z*b.y, a.z*b.x - a.x*b.z, a.x*b.y - a.y*b.x);
}
math.dotproduct = function(a,b){
    return(a.x*b.x + a.y*b.y, a.z*b.z);
}
math.deg2rad2 = function(x){
    return x * (Math.PI / 180.0);
}
math.calc_angle = function(vec1, vec2){
    var qAngles = new vec3d;
	var delta = new vec3d((vec1.x - vec2.x), (vec1.y - vec2.y), (vec1.z - vec2.z));
	var hyp = Math.sqrt(delta.x * delta.x + delta.y * delta.y);
	qAngles.x = (Math.atan(delta.z / hyp) * (180.0 / Math.PI));
	qAngles.y = (Math.atan(delta.y / delta.x) * (180.0 / Math.PI));
	qAngles.z = 0;
	if (delta.x >= 0)
		qAngles.y = qAngles.y+180;
	return qAngles;
}
math.clamp = function(in_, low, high){
    if (in_ <= low)
		return low;
	else if (in_ >= high)
		return high;
	else
		return in_;
}
math.array_to_vec = function(array){
    return new vec3d(array[0],array[1],array[2]);
}
math.array_to_vec2d = function(array){
    return new vec2d(array[0],array[1]);
}
math.vec_round = function(vec){
    return v3d(Math.round(vec.x), Math.round(vec.y), Math.round(vec.z));
}
math.clamp_angles = function(angles){
    if (angles.x > 89.0)
		angles.x = 89.0;
	else if (angles.x < -89.0)
		angles.x = -89.0;
	if (angles.y > 180.0)
		angles.y = 180.0;
	else if (angles.y < -180.0)
		angles.y = -180.0;
	angles.z = 0;
}
math.normalize_angles = function(angles){
    while (angles.x > 89.0)
		angles.x -= 180.0;
	while (angles.x < -89.0)
		angles.x += 180.0;
	while (angles.y < -180.0)
		angles.y += 360.0;
	while (angles.y > 180.0)
        angles.y -= 360.0;
        
    if(angles.z > 0)
	    angles.zangles.z = 0.0;
}
math.smooth_angle = function(curang, popka, imennoon){
    var a = math.array_to_vec2d(Render.WorldToScreen(curang.toarray()));
    var b = math.array_to_vec2d(Render.WorldToScreen(popka.toarray()));
    var delta = new vec2d(a.x - b.x, a.y - b.y);
    math.normalize_angles(delta);
    delta.x *= imennoon;
    delta.y *= imennoon;
    popka = v3d(curang.x - delta.x, curang.y - delta.y, curang.z);
}

const screen_size = math.array_to_vec2d(Render.GetScreenSize())
const screen_center = new vec2d(screen_size.x / 2, screen_size.y / 2);

math.is_on_screen = function(origin){
    const w2s = math.array_to_vec2d(Render.WorldToScreen(origin.toarray()));
    if(!w2s) return false;
    return screen_size.x > w2s.x && screen_size.y > w2s.y;
}

math.rotate_triangle = function(points, rotation, point_center){
    for(var i in points){
        var point = points[i]
        point[0] -= point_center.x;
        point[1] -= point_center.y;
        const tempX = point[0];
		const tempY = point[1];
		const theta = math.deg2rad2(rotation);
		const c = Math.cos(theta);
        const s = Math.sin(theta);
        point[0] = tempX * c - tempY * s;
		point[1] = tempX * s + tempY * c;
		point[0] += point_center.x;
		point[1] += point_center.y;
    }
    return point_center;
}

/**
 * @title New Render
 * @version 1.0
 * @description Additional render functions
 */

var draw = {
    _class: 'draw'
};

draw.path_arc = function(center, radius, a_min, a_max, num_segments, color){
    if (radius == 0.0) return;
    var prevpos = 0
    for (var i = 0; i <= num_segments; i++)
    {
        const a = a_min + (i / num_segments) * (a_max - a_min);
        var renderat = new vec2d(center.x + Math.cos(a) * radius, center.y + Math.sin(a) * radius);
        if(prevpos != 0)
        Render.Line(prevpos.x, prevpos.y, renderat.x, renderat.y, color);
        
        prevpos = renderat;
    }
}

draw.cross = function(x,y,size,color){
    Render.Line(x - size, y - size, x + size, y + size, color);
    Render.Line(x - size, y + size, x + size, y - size, color);
}

draw.arrow = function(x, y, color, lines_color, rotation, type){
    switch(type){
        case 0:
            var arrow = [[x, y - 7], [x + 20, y], [x,y+7]];
            math.rotate_triangle(arrow, rotation, new vec2d(x,y));
            Render.Polygon( arrow, color );
            for(var i in arrow){
                if(arrow[i-1] != undefined)
                Render.Line(arrow[i][0], arrow[i][1], arrow[i-1][0], arrow[i-1][1], lines_color)
            }
            Render.Line(arrow[0][0], arrow[0][1], arrow[arrow.length - 1][0], arrow[arrow.length - 1][1], lines_color)
        break;
        case 1:
            var arrow1 = [[x, y - 10], [x + 20, y], [x + 5, y]];
            var arrow2 = [[x+20, y], [x, y + 10], [x + 5, y]];
            math.rotate_triangle(arrow1, rotation, new vec2d(x,y));
            math.rotate_triangle(arrow2, rotation, new vec2d(x,y));
            Render.Polygon( arrow1, color );
            Render.Polygon( arrow2, color );
            var cont = arrow1.concat(arrow2)
            for(var i in cont){
                if(cont[i-1] != undefined)
                Render.Line(cont[i][0], cont[i][1], cont[i-1][0], cont[i-1][1], lines_color)
            }
            Render.Line(cont[0][0], cont[0][1], cont[cont.length - 1][0], cont[cont.length - 1][1], lines_color)
        break;

        case 2:
            var arrow1 = [[x, y], [x + 30, y - 10], [x + 30, y + 10]];
            var arrow2 = [[x + 30, y - 20], [x + 50, y], [x + 30, y + 20]];
            math.rotate_triangle(arrow1, rotation, new vec2d(x,y));
            math.rotate_triangle(arrow2, rotation, new vec2d(x,y));
            Render.Polygon( arrow1, color );
            Render.Polygon( arrow2, color );
            var cont = arrow1.concat(arrow2)
            for(var i in cont){
                if(cont[i-1] != undefined)
                Render.Line(cont[i][0], cont[i][1], cont[i-1][0], cont[i-1][1], lines_color)
            }
            Render.Line(cont[3][0], cont[3][1], cont[cont.length - 1][0], cont[cont.length - 1][1], lines_color)
            Render.Line(cont[0][0], cont[0][1], cont[2][0], cont[2][1], lines_color)
        break;

        case 3:
            var arrow1 = [[x, y], [x + 20, y + 5], [x + 20, y + 10]];
            var arrow2 = [[x + 15, y - 2], [x + 35, y + 10], [x + 15, y + 4]];
            math.rotate_triangle(arrow1, rotation + 11, new vec2d(x,y));
            math.rotate_triangle(arrow2, rotation + 11, new vec2d(x,y));
            Render.Polygon( arrow1, color );
            Render.Polygon( arrow2, color );
            var cont = arrow1.concat(arrow2)
            for(var i in cont){
                if(cont[i-1] != undefined)
                Render.Line(cont[i][0], cont[i][1], cont[i-1][0], cont[i-1][1], lines_color)
            }
            Render.Line(cont[0][0], cont[0][1], cont[2][0], cont[2][1], lines_color)
        break;

        default:
            print("draw.arrow error unkonwn type")
    }
}


const screen_size = math.array_to_vec2d(Render.GetScreenSize())
const screen_center = new vec2d(screen_size.x / 2, screen_size.y / 2);

const get_render_pos = function(mainvec, viewangles, radius){
    var rot = math.deg2rad2(viewangles.y - math.calc_angle(math.array_to_vec(Entity.GetEyePosition(Entity.GetLocalPlayer())), mainvec).y - 90);
    return new vec2d(screen_center.x + Math.cos(rot) * radius, screen_center.y + Math.sin(rot) * radius);
}
const get_dropdown_value = function(value, index)
{
    const mask = 1 << index;
    return value & mask ? true : false;
}

const HSVtoRGB = function(h, s, v) {
    var r, g, b, i, f, p, q, t;
    if (arguments.length === 1) {
        s = h.s, v = h.v, h = h.h;
    }
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }
    return [
        Math.round(r * 255),
        Math.round(g * 255),
        Math.round(b * 255),
        255
    ]
}

UI.AddLabel("-----------------------------------");
UI.AddLabel("OOF arrows by @lenin");
UI.AddLabel("-----------------------------------");
UI.AddCheckbox("Only invisible")
UI.AddCheckbox("Lines")
UI.AddDropdown("OOF type", [ "Circle", "Triangle" ]);
UI.AddDropdown("OOF triangle type", [ "Default", "Nixware style", "Rifk7 style", "Lightning McQueen style" ]);
UI.AddSliderInt("OOF radius", 0, 500);
UI.AddSliderInt("OOF circle radius", 1, 50);
UI.AddColorPicker("Fill color");
UI.AddColorPicker("Outline color");
UI.AddColorPicker("Lines color");
UI.SetColor("Script items", "Fill color", [255, 255, 255, 255]);
UI.SetColor("Script items", "Outline color", [255, 255, 255, 255]);
UI.SetColor("Script items", "Lines color", [255, 255, 255, 255]);
UI.AddLabel("-----------------------------------");
UI.AddMultiDropdown("Rainbow", [ "Fill color", "Outline color", "Lines color" ] );
UI.AddSliderInt("Rainbow speed", 100, 1000)
UI.AddLabel("-----------------------------------");
//const alpha = Math.sin(Math.abs(-Math.PI + (Globals.Curtime() * (1 / getval("Pulse alpha speed"))) % (Math.PI * 2))) * 125;
const main = function(){
    const tickcount = Globals.Tickcount();
    const rgb = HSVtoRGB(tickcount % getval("Rainbow speed") / getval("Rainbow speed"), 1, 1, 1, 255);

    const values = {only_invis: getval("Only invisible"), oof_rad: getval("OOF radius"), oof_type: getval("OOF type"), oof_triangle_type: getval("OOF triangle type"), oof_circle_rad: getval("OOF circle radius"), draw_lines: getval("Lines")};

    const fill_clr = get_dropdown_value(getval("Rainbow"), 0) ? rgb : getcol("Fill color");
    const outl_clr = get_dropdown_value(getval("Rainbow"), 1) ? rgb : getcol("Outline color");
    const lines_clr = get_dropdown_value(getval("Rainbow"), 2) ? rgb : getcol("Lines color");

    var enemies = Entity.GetEnemies();
    var viewangles = math.array_to_vec(Local.GetViewAngles());
    var localorigin = math.array_to_vec(Entity.GetRenderOrigin(Entity.GetLocalPlayer()));

    for (i=0; i<enemies.length; i++)
    {
        var hitbox_pos = Entity.GetHitboxPosition( enemies[i], 2 );
        if(Entity.IsDormant(enemies[i]) || ( values.only_invis && math.is_on_screen(math.array_to_vec(hitbox_pos))) ) return;
        var pos = get_render_pos(math.array_to_vec(hitbox_pos), viewangles, values.oof_rad);
        var angle = viewangles.y - math.calc_angle(localorigin, math.array_to_vec(hitbox_pos)).y - 90;

        if(pos.x > 0 && pos.y > 0){
            if(values.oof_type)
                draw.arrow(pos.x, pos.y, fill_clr, outl_clr, angle, values.oof_triangle_type);
            else
            Render.FilledCircle( pos.x, pos.y, values.oof_circle_rad, fill_clr);

            if(values.draw_lines) Render.Line(screen_center.x, screen_center.y, pos.x, pos.y, lines_clr);
        }
    }
}
Cheat.RegisterCallback("Draw", "main")