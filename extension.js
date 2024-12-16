export default class RemoveWorldClocks {
  #state = {};

  enable() {
    const clocksItem = this._main.panel.statusArea.dateMenu._clocksItem;

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
    const clocksItem = this._main.panel.statusArea.dateMenu._clocksItem;

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
