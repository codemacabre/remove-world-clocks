import * as Main from 'resource:///org/gnome/shell/ui/main.js';
const DateMenu = Main.panel.statusArea.dateMenu

export default class RemoveWorldClocks {
  #state = {};

  enable() {
    const clocksItem = DateMenu._clocksItem;

    if (this.#state.clocksItemUpdate) {
      clocksItem._update = this.#state.clocksItemUpdate;
      delete this.#state.clocksItemUpdate;

      if (this._clocksItemSignal) {
        clocksItem.disconnect(this._clocksItemSignal);
        delete this._clocksItemSignal;
      }

      clocksItem._update();
    }
  }

  disable() {
    const clocksItem = DateMenu._clocksItem;

    if (!this.#state.clocksItemUpdate) {
      this.#state.clocksItemUpdate = clocksItem._update;
      clocksItem._update = () => {
        clocksItem.visible = false;
      }

      this._clocksItemSignal = clocksItem.connect('show', clocksItem._update);
    }

    clocksItem._update();
  }
}
