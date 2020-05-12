const vscode = require('vscode');

function handler() {
  const editor = vscode.window.activeTextEditor;
  const selection = editor.selection;
  var highlight = editor.document.getText(selection);

  var hash_map = highlight.replace(/' '/g, '')
  hash_map = hash_map.replace(/{/g, '%{')
  hash_map = hash_map.replace(/"([a-zA-Z0-9-]+)":/g, '\$1\: ');

  editor.edit(builder => {
    if (selection.isEmpty) {
      builder.insert(selection.start, hash_map);
    } else {
      builder.replace(selection, hash_map);
    }
  });
};

module.exports = {
  name: 'elixir-map.jsonToHashMap',
  handler
};