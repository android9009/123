exports.VectorAdd = function(a,b){
return [a[0]+b[0],a[1]+b[1],a[2]+b[2]]
}
exports.VectorSub = function(a,b){
return [a[0]-b[0],a[1]-b[1],a[2]-b[2]]
}
exports.VectorMulFl = function(a,b){
return [a[0]*b,a[1]*b,a[2]*b]
}
exports.VectorDivFl = function(a,b){
return [a[0]/b,a[1]/b,a[2]/b]
}
exports.VectorLength = function(a){
return Math.sqrt(a[0]*a[0]+a[1]*a[1]+a[2]*a[2])
}
exports.AngleVectors = function(a){
var sy = Math.sin(a[1] / 180 * Math.PI)
var cy = Math.cos(a[1] / 180 * Math.PI)
var sp = Math.sin(a[0] / 180 * Math.PI)
var cp = Math.cos(a[0] / 180 * Math.PI)
return [cp * cy, cp * sy, -sp]
}
exports.VectorAngles = function(a){
var tmp, yaw, pitch
if(a[1] == 0 && a[0] == 0){
yaw = 0
if(a[2] > 0)
pitch = 270
else
pitch = 90
}
else{
yaw = (Math.atan2(a[1], a[0]) * 180 / Math.PI)
if(yaw < 0)
yaw += 360
tmp = Math.sqrt(a[0]*a[0]+a[1]*a[1])
pitch = (Math.atan2(-a[2],tmp) * 180 / Math.PI)
if(pitch < 0)
pitch += 360
}
return [pitch,yaw,0]
}
exports.CalculateAngle = function(source, entityPos){
var delta = []
delta[0] = source[0] - entityPos[0]
delta[1] = source[1] - entityPos[1]
delta[2] = source[2] - entityPos[2]
var angles = []
var viewangles = Local.GetViewAngles()
angles[0] = exports.RadToDeg(Math.atan(delta[2] / Math.hypot(delta[0], delta[1])))
angles[1] = exports.RadToDeg(Math.atan(delta[1] / delta[0]))
angles[2] = 0
if(delta[0] >= 0)
angles[1] += 180
while(angles[1] > 180)
angles[1] -= 360
while(angles[1] < -180)
angles[1] += 360
return angles
}
exports.RadToDeg = function(a){
return a * 180 / Math.PI
}
exports.DegToRad = function(a){
return a / 180 * Math.PI
}
exports.HSVtoRGB = function(h,s,v){
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
exports.Clamp = function(val,min,max){
if(val > max)
return max
if(val < min)
return min
return val
}
exports.Lerp = function(start,end,time){
var delta = end - start
delta *= time
delta += start
return delta
}