const vscode = require('vscode');

function handler() {
  const editor = vscode.window.activeTextEditor;
  const selection = editor.selection;
  var highlight = editor.document.getText(selection);

  var atom_map = highlight.replace(/' '/g, '')
  atom_map = atom_map.replace(/{/g, '%{')
  atom_map = atom_map.replace(/"([a-zA-Z0-9-]+)":/g, '\$1\: ');

  editor.edit(builder => {
    if (selection.isEmpty) {
      builder.insert(selection.start, atom_map);
    } else {
      builder.replace(selection, atom_map);
    }
  });
};

module.exports = {
  name: 'elixir-map.jsonToAtomMap',
  handler
};