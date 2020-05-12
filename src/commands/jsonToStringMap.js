const vscode = require('vscode');

function handler() {
  const editor = vscode.window.activeTextEditor;
  const selection = editor.selection;
  var highlight = editor.document.getText(selection);

  var string_map = highlight.replace(/' '/g, '')
  string_map = string_map.replace(/{/g, '%{')
  string_map = string_map.replace(/"([a-zA-Z0-9-]+)":/g, '\"$1\" =>')

  editor.edit(builder => {
    if (selection.isEmpty) {
      builder.insert(selection.start, string_map);
    } else {
      builder.replace(selection, string_map);
    }
  });
};

module.exports = {
  name: 'elixir-map.jsonToStringMap',
  handler
};