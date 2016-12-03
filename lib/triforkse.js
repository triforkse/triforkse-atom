'use babel';

import TriforkseView from './triforkse-view';
import { CompositeDisposable } from 'atom';

export default {

  triforkseView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.triforkseView = new TriforkseView(state.triforkseViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.triforkseView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'triforkse:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.triforkseView.destroy();
  },

  serialize() {
    return {
      triforkseViewState: this.triforkseView.serialize()
    };
  },

  toggle() {
    console.log('Triforkse was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
