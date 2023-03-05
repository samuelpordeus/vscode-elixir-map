const vscode = require('vscode');

function handler() {
  const editor = vscode.window.activeTextEditor;
  const selection = editor.selection;
  var highlight = editor.document.getText(selection);

  var json = highlight.replace(/%{/g, '{')

  // This logic is terrible and needs to be improved,
  // specially the atom map RegEx.
  if (highlight.match(/"(\w+)"\s*=>/g)) {
    // It's a string map!
    json = json.replace(/"(\w+)"\s*=>\s*/g, '\"$1\": ')
  } else {
    // It's an atom map! (please send help)
    json = json.replace(/(\w+):\s*/g, '\"$1\": ')
  }

  editor.edit(builder => {
    if (selection.isEmpty) {
      builder.insert(selection.start, json);
    } else {
      builder.replace(selection, json);
    }
  });
};

module.exports = {
  name: 'elixir-map.mapToJson',
  handler
};