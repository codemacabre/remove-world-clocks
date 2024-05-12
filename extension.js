import * as Main from 'resource:///org/gnome/shell/ui/main.js';
const DateMenu = Main.panel.statusArea.dateMenu

export default class RemoveWorldClocks {
  enable() {
    DateMenu._clocksItem.hide();
  }

  disable() {
    DateMenu._clocksItem.show();
  }
}
