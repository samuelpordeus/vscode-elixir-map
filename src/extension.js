const vscode = require('vscode');
const commands = require('./commands');

function activate(context) {
  console.log("oi");
  commands.forEach((command) => {
    console.log(command.handler);
    const disposable = vscode.commands.registerCommand(
      command.name,
      command.handler,
    );
    context.subscriptions.push(disposable);
  });
}

function deactivate() { }

module.exports = {
  activate,
  deactivate,
};