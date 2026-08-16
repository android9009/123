function addDropdown(name, items) {
    UI.AddDropdown(name, items);

    return {
        get():function() {
            return UI.GetValue("MISC", "JAVASCRIPT", "Script items", name);
        }
    }
}

function addCheckbox(name) {
    UI.AddCheckbox(name);

    return {
        get() {
            return UI.GetValue("MISC", "JAVASCRIPT", "Script items", name);
        },

        set(val) {
            UI.SetValue('Script Items', name, val);
        }
    }
}

const servers = ['1', '2'];

const serverList = addDropdown('Servers', ['first server', 'second server']);
const connectButton = addCheckbox('Connect');

function onDraw() {
    if (connectButton.get()) {
        connectButton.set(false);

        Cheat.ExecuteCommand('connect ' + servers[connectButton.get()]);
    }
}

Global.RegisterCallback('Draw', 'onDraw');
