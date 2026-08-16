
function clamp(x,a,b){ return Math.max(a, Math.min(b, x)); }
function InGameAlive(){
  if (!World.GetServerString()) return false;
  var me = Entity.GetLocalPlayer();
  return me && Entity.IsAlive(me);
}

UI.AddCheckbox("LBY Head Flick - Enabled");
UI.AddSliderInt("Flick desync amount", 0, 60);      // сила десинка (fake), глядит в сторону прошлого флика
UI.AddSliderInt("Flick LBY delta", 0, 120);         // амплитуда LBY флика
UI.AddSliderFloat("Flick jitter delay", 0.05, 1.00);// период флика/джиттера (сек)

// Дефолты (не обязательно)
UI.SetValue("Misc","JAVASCRIPT","Script items","Flick desync amount", 36);
UI.SetValue("Misc","JAVASCRIPT","Script items","Flick LBY delta", 60);
UI.SetValue("Misc","JAVASCRIPT","Script items","Flick jitter delay", 0.25);

// ========== State ==========
var hf_next = 0.0;        // когда переключить сторону флика
var hf_prev_side = 1;     // предыдущая сторона флика (-1/1)
var hf_side = 1;          // текущая сторона флика (-1/1)
var hf_hold_until = 0.0;  // время, до которого держим повышенный FL

// Сохранение и восстановление Fake-Lag Limit
var hf_fl_saved = -1, hf_fl_prev = -1;

function HF_RestoreFL(){
  // вернуть FL Limit на сохранённое значение, если меняли
  if (hf_fl_saved !== -1 && hf_fl_prev !== hf_fl_saved){
    UI.SetValue("Anti-Aim","Fake-Lag","Limit", hf_fl_saved);
    hf_fl_prev = hf_fl_saved;
  }
  hf_fl_saved = -1;
}
function HF_FLSafetyTick(){
  // На отключении сервера/смерти — вернуть FL
  if (!World.GetServerString()){
    HF_RestoreFL();
    return;
  }
  var me = Entity.GetLocalPlayer();
  if (!me || !Entity.IsAlive(me)){
    HF_RestoreFL();
  }
}

// ========== Core ==========
function LBY_HeadFlick_Run(){
  var enabled = UI.GetValue("Misc","JAVASCRIPT","Script items","LBY Head Flick - Enabled");
  if (!enabled){ HF_RestoreFL(); return; }
  if (!InGameAlive()){ HF_RestoreFL(); return; }

  var inv = UI.IsHotkeyActive("Anti-Aim","Fake angles","Inverter");
  var sign = inv ? -1 : 1;

  var desyncAmt = UI.GetValue("Misc","JAVASCRIPT","Script items","Flick desync amount"); // 0..60
  var lbyDelta  = UI.GetValue("Misc","JAVASCRIPT","Script items","Flick LBY delta");      // 0..120
  var jitterDel = UI.GetValue("Misc","JAVASCRIPT","Script items","Flick jitter delay");   // 0.05..1.0

  var now = Global.Realtime();

  // Переключение стороны флика по таймеру
  if (now >= hf_next){
    // сохранить прошлую сторону для десинка
    hf_prev_side = hf_side;

    // флик: инвертируем сторону
    hf_side = -hf_side;

    // небольшой шанс "фальш-джиттера" (делает паттерн менее предсказуемым)
    if (Math.random() < 0.15) hf_side = -hf_side;

    // короткое окно "лагать": поднимаем Fake-Lag Limit, чтобы флик залагал
    var hold = clamp(jitterDel * 0.6, 0.06, 0.25);
    hf_hold_until = now + hold;

    // следующее переключение стороны через jitterDel
    hf_next = now + clamp(jitterDel, 0.05, 1.0);
  }

  // Управление Fake-Lag Limit во время окна флика
  if (now < hf_hold_until){
    if (hf_fl_saved === -1) hf_fl_saved = UI.GetValue("Anti-Aim","Fake-Lag","Limit");
    if (hf_fl_prev !== 16){
      UI.SetValue("Anti-Aim","Fake-Lag","Limit", 16);
      hf_fl_prev = 16;
    }
  } else {
    // по окончанию окна вернуть старый FL Limit
    HF_RestoreFL();
  }

  // База: маленький real, чтобы именно LBY флик "ломал лбу"
  var real = sign * 12;

  // Fake (desync) направляем в прошлую сторону флика
  var fake = clamp(-sign * desyncAmt * hf_prev_side, -60, 60);

  // LBY фликаем по текущей стороне, зеркалим относительно inverter
  var lby  = clamp(-sign * lbyDelta  * hf_side, -120, 120);

  AntiAim.SetOverride(1);
  AntiAim.SetRealOffset(real);
  AntiAim.SetFakeOffset(fake);
  AntiAim.SetLBYOffset(lby);
}

// ========== Callbacks ==========
function on_draw(){
  LBY_HeadFlick_Run();
}
function on_createmove(){
  HF_FLSafetyTick(); // менеджер восстановления FL
}
function on_unload(){
  HF_RestoreFL();
}

// Register
Cheat.RegisterCallback("Draw", on_draw);
Cheat.RegisterCallback("CreateMove", on_createmove);
Cheat.RegisterCallback("Unload", on_unload);

// Info
Cheat.Print("LBY Head Flick loaded: desync->prev side, LBY flick with jitter, FL burst on flick.\n");