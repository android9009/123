



//         ????? ????? ??? ??? ????? ????
//         ????? ????? ??? ??? ????? ????
//         ????? ????? ??? ??? ????? ????



UI.AddCheckbox("Grenade Helper Enable")
UI.AddColorPicker("Grenade Helper Color")


UI.AddLabel("------------Kuku habibi-------------");

var coords


function atv(pitch, yaw) {

  return [Math.cos(pitch * Math.PI / 180) * Math.cos(yaw * Math.PI / 180), Math.cos(pitch * Math.PI / 180) * Math.sin(yaw * Math.PI / 180), -Math.sin(pitch * Math.PI / 180)]

}

  var scriptitems = ["Misc", "JAVASCRIPT", "Script Items"];

  function menu_cb() {
    var enabled = UI.GetValue(scriptitems, "Grenade Helper Enable");
    UI.SetEnabled(scriptitems, "Grenade Helper Color", enabled);

  }
  

  function grenade_helper() {
    menu_cb();
  }


function dis(a, b) {

  var ax = a[0]

  var ay = a[1]

  var az = a[2]

  var bx = b[0]

  var by = b[1]

  var bz = b[2]



  var dx = ax - bx

  var dy = ay - by

  var dz = az - bz



  return Math.sqrt( dx * dx + dy * dy + dz * dz )

}



function alp(c, a) {

  return [c[0], c[1], c[2], a]

}


test = 0
function draw() {


  weaponnames = {"flashbang": [43], "molotov": [46, 48], "smoke": [45]}


  weapon = Entity.GetProp(Entity.GetWeapon(Entity.GetLocalPlayer()), "CEconEntity", "m_iItemDefinitionIndex")

  world  = World.GetMapName()

  color  = UI.GetColor("Misc", "JAVASCRIPT", "Script itens", "Grenade Helper Color")

  var enabled = UI.GetValue(scriptitems, "Grenade Helper Enable");
  if (enabled) 
  {
    if(!color) color = [255, 255, 255, 255]



    if([46, 48, 45, 43].indexOf(weapon) < 0) return

    //["", "", "", ],

    if(world == "de_cbble")     coords = [[ "Hut - right", "Throw", "molotov", -155.970673, -16.010778, -31.906188, -33.869473, -48.637550 ]] 

   if(world == "de_mirage")     coords = [["Car", "Throw", "molotov", -1182.872070, 679.580505, -79.968750, -9.450004, 174.482330 ],["Under", "Walk + Throw", "molotov", -34.409924, 822.263123, -135.968750, -8.459991, -150.967743 ],["One-Way Site", "Left+Right click + JumpThrow", "molotov", -539.091858, -1309.002563, -159.968750, -1.090015, -75.809937 ],["One-Way Box", "JumpThrow", "molotov", 663.968750, -1128.005005, -127.968750, 0.395009, -136.764679 ],["Window", "Run + Throw", "molotov", 399.974335, -109.131142, -169.663116, -18.249926, -151.934357 ],["Ramp", "Throw", "molotov", -1119.997314, -1527.024292, -156.076477,-17.370033, 0.035920],["Stairs", "Throw", "molotov", 499.251617, -1574.105713, -261.590881, -25.290028, 176.995941 ]]

    if(world == "cs_agency")    coords = [[ "T spawn", "Throw", "molotov", -1186.566406, 217.027771, 322.031250, -24.158953, 83.298912 ],["boost", "Throw / walk", "molotov", -1238.322754, 117.609955, 322.031250, -26.066105, 40.273457 ]]

    if(world == "de_dust2")     coords = [[ "CT spawn", "Throw", "molotov", -112.864204, 1350.943115, 1.341919, -12.697030, 138.4860 ]]

    if(world == "de_tulip")     coords = [[ "boost", "Walk / Throw", "molotov", 6249.320801, 4487.204590, -120.850731, -19.699421, -131.733322 ],["fish", "Throw", "molotov", 5577.691895, 4920.044922, 1.093811, -15.477150, -89.704681 ]]

    if(world == "de_inferno")   coords = [[ "Graveyard", "Run / Jump / Throw", "molotov", 2017.503174, 1225.968750, 178.031250, -33.659977, -64.684898],["5hp 1w V2", "Throw", "molotov", 1843.442993, 1373.403564, 165.928940, -22.073603, -76.816792],["Mid", "Run / Jump / Throw", "molotov", 2343.707520, 568.729492, 145.928940, -38.500111, -178.690613],["Jail", "Throw", "molotov", 1762.031250, 1360.352539, 160.031250, -19.652582, -54.807373],["Fountain", "Run / Jump / Throw", "molotov", 362.636536, 1726.205933, 128.376053, -39.875027, 95.339996],["Triple Box", "Throw", "molotov", 877.968750, 2393.092041, 150.504181, -13.529912, 168.994965 ],["Library", "Jump / Throw", "molotov", 1314.032593, 797.901489, 153.586700, -26.509958, 10.154735 ],["5hp 1w v3", "Run / Throw", "molotov", 1364.515015, 277.541809, 135.426834, -17.755112, -48.144848],["Archade", "Run / Jump / Throw", "molotov", 1287.723633, 434.031250, 125.995117, -36.354294, 55.140560],["Default", "Jump / Throw", "molotov", 1961.373169, 1225.968750, 175.031250, -34.145012, -79.280289],["Stove", "Throw", "molotov", 698.401245, -267.968750, 105.031250, -21.614807, 32.599926 ],["Library", "Run / Jump / Throw", "molotov", 1143.116577, 434.031250, 118.129883, -33.825024, 26.110008], ["Pit", "Run / Throw", "molotov", 2105.090088, 1168.412354, 165.084000, -13.804811, -63.900101], [ "5hp 1w V1", "Run / Jump / Throw", "molotov", 2079.774658, 1225.998535, 180.093811, -37.500053, -89.940086],[ "B Plant", "Jump / Throw", "molotov", 929.176636, 3295.995117, 144.093811, -45.887463, -131.960571 ],[ "3s", "Throw", "molotov", 999.982422, 1878.530640, 149.329788, -26.647552, 141.132538 ],[ "Coffins", "Throw", "molotov", 664.968750, 1873.031250, 168.093811, -24.272781, 96.641022 ]]

    if(world == "de_nuke")      coords = [[ "Hangar", "Throw", "smoke", -164.092941, -1954.733765, -415.916107, -13.613587, 1.278547 ],[ "Red container", "Throw", "smoke", -533.003357, -833.215759, -193.634827, -30.904673, -43.816589 ],[ "Between containers", "Run / Throw", "smoke", -423.996399, -1753.002075, -415.914856, -2.624159, -50.804165 ],[ "T Outside", "Jump / Throw", "smoke", 1664.031250, -280.002014, -351.906250, -25.048063, -135.212463 ]]

    if(world == "de_overpass")  coords = [[ "Stairs", "Run + JumpThrow", "molotov", -3750.460938, -250.358826, 520.609863, 5.050490, 35.776577 ],["Barrels", "Run + Throw", "molotov", -442.186157, -1551.968750, 140.031250, -16.164569, 101.556863 ],["Heaven", "Walk + JumpThrow", "molotov", -856.031311, -639.968750, 105.031250, 4.120225, 128.027786 ],["Barrels", "Throw", "molotov", -1580.517578, -710.171814, 135.334778, -14.950030, 60.188404 ],["Water", "Throw", "molotov", -1276.541260, -964.551147, 10.933800, -23.484703, 82.194580],[ "A 1w v2", "Run/Throw", "molotov", -2351.968750, -392.031250, 438.562317, -24.588089, 76.825958 ],[ "B VODA", "Throw", "molotov", -1300.968750, -1087.984619, 0.093811, -22.278185, 92.646019 ],[ "9ww", "Run/Throw", "molotov", -859.968750, -630.785583, 101.574355, -23.446209, 126.293686 ],[ "B gustella", "Run / Throw", "molotov", -329.999390, -941.285339, 20.421722, -152.693123, -28.193089 ],[ "A 1w", "Run/Throw", "molotov", -3382.332520, 35.247875, 516.906006, -16.775419, 34.999980 ],[ "B push", "Run/Throw", "molotov", -2048.398926, 580.698242, 515.093810, -1.207984, -49.596695 ]]

    if(world == "de_train")     coords = [[ "Window 1w", "Run", "molotov", -590.03333, 500.031250, -211.532227, -30.096550, -30.974125 ],[ "Blue train (Back)", "Run / Throw", "molotov", -790.028748, 375.928741, -215.906189, -11.270589, 27.332729 ],[ "TrainA", "Run / Throw", "molotov", -800.028748, 500.928741, -220.906189, -27.270589, -1.111129 ]]

    if(world == "de_cache")     coords = [[ "Bombsite B One-Way", "Throw", "molotov", 910.649597, -1235.031250, 1614.093750, -23.876366, -179.771790 ],[ "B Bombsite CENTER", "Throw", "molotov", 918.978760, -1297.367065, 1617.031250, -22.509432, -167.384781 ],[ "Boost down", "Throw BoostDown", "molotov", -120.183487, 424.871674, 1620.031250, -22.213342, 4.959707 ],[ "Squeaky", "Run / Throw", "molotov", -982.153381, 971.216309, 1679.831909, -18.033867, 41.925247 ],[ "Boost UP", "Throw BoostUp", "molotov", -198.205246, 418.773346, 1620.031250, -22.513342, 4.959707 ],[ "Boost", "Throw", "molotov", 11.759085, -148.994904, 1613.093750, -32.654572, 38.675369 ]]

    if(world == "de_bank")     coords = [[ "Car one-way", "Throw", "molotov", -325.515381, -635.069336, 192.031250, -10.724926, 9.545136 ],[ "Car FBI", "Run/Throw", "molotov", -463.293304, -596.599365, 192.031250, -11.05492, 3.550225],[ "b1g TRACK", "Run/Throw", "molotov", -450.500671, -416.452148, 192.031250, -3.735980, -9.906375]]

    if(world == "de_shortdust")    coords = [["Box", "Run + Throw", "molotov", -309.406403, 1933.314819, 32.031250, -5.444888, -45.821072 ],["Car", "Run + Throw", "molotov", -891.402405, 954.262512, 35.031250, -9.515043,  -34.965118 ],["One-Way CT", "Throw", "molotov", -450.279297, 780.684265, 40.753510, -19.734886, -50.160259 ],["One-Way Car", "Run + Throw", "molotov", -1279.968750, 1039.968750, -170.329315, -27.609568, -18.734381 ]]
    
    if(world == "de_vertigo")    coords = [[ "Box one-way", "Throw", "molotov", -540.693604, -1216.081177, 11690.464844, -24.158911, 55.470219 ],[ "Box A CENTER", "Walk/Throw", "molotov", -608.523926, -1312.261597, 11670.854492, -14.570215, 49.645222 ],[ "one-way", "Throw", "molotov", -1721.622314, -517.357117, 11780.031250, -29.357119, 114.850655 ],[ "Up one-way", "Throw", "molotov", -2037.912964, -590.725769, 11780.031250, -19.860214, 61.385583 ]]

    var font1 = Render.AddFont("Verdana", 10, 600)

    var font2 = Render.AddFont("Verdana", 12, 600)

    var font3 = Render.AddFont("Verdana", 12, 500)

    var scsiz = Render.GetScreenSize()

    var scrmid = [Render.GetScreenSize()[0] / 2, Render.GetScreenSize()[1] / 2]

    var coordslenght = 0

    color_circle = [0,0,0,0]

    while(coords[coordslenght]) {

      coordslenght++

    }

    for(var i = 0; i < coordslenght; i++) {

      crd = coords[i]

      if(weaponnames[crd[2]].indexOf(weapon) >= 0) {

        cds = Render.WorldToScreen([crd[3], crd[4], crd[5]])

        var distance = dis([crd[3], crd[4], crd[5]], Entity.GetRenderOrigin(Entity.GetLocalPlayer()))

        if(distance >= 2000 - 255 && distance <= 2000) {
          Render.StringCustom(cds[0], cds[1], 1, crd[0], alp(color, Math.round(Math.min(255, 2000 - distance))), font1)
          continue;
        }
        if(distance < 2000 - 255 && distance >= 10) {
          Render.StringCustom(cds[0], cds[1], 1, crd[0], alp(color, 255), font1)
        }

        

        if(dis([crd[3], crd[4], crd[5]], Entity.GetRenderOrigin(Entity.GetLocalPlayer())) < 10) {

          Render.StringCustom(cds[0], cds[1], 1, crd[0], alp(color, 255), font2)



          vec = atv(crd[6], crd[7])

          wec = Render.WorldToScreen([crd[3] + vec[0] * 200, crd[4] + vec[1] * 200, crd[5] + 64 + vec[2] * 200])

          

          Render.StringCustom(wec[0] + 14, wec[1] - 9, 0, crd[1], alp(color, 255), font3)

          Render.Line(scsiz[0] / 2, scsiz[1] / 2, wec[0], wec[1], alp(color, 255))


          if(( Math.abs(wec[0] - scrmid[0]) + Math.abs(wec[1] - scrmid[1]) ) <= 5)
          {
            color_circle = [0,255,0,255]
          }
          else {
            color_circle = [255,0,0,255]
          }

          Render.Circle(wec[0], wec[1], 4, color_circle)
          Render.Circle(wec[0], wec[1], 3, color_circle)
          Render.Circle(wec[0], wec[1], 2, color_circle)
          Render.Circle(wec[0], wec[1], 1, color_circle)
          Render.FilledRect(wec[0], wec[1], 1, 1, color_circle)

          Render.Circle(wec[0], wec[1], 5, alp(color, 255))
        } 
      } 
    } 
  }

  
}

Cheat.RegisterCallback("Draw","grenade_helper");

Global.RegisterCallback("Draw", "draw")