
import * as vscode from 'vscode';
import { storeData } from './storeData';
import { retrieveData } from './retrieveData';
import { SidebarProvider } from './SidebarProvider';
import { HelloWorldPanel } from './HelloWorldPanel';

export function activate(context: vscode.ExtensionContext) {



	const sidebarProvider = new SidebarProvider(context.extensionUri);
	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider("sidebar", sidebarProvider)
	);


	context.subscriptions.push(vscode.commands.registerCommand('snippetbook.helloWorld', () => {


		HelloWorldPanel.createOrShow(context.extensionUri);
		vscode.window.showInformationMessage('Hello World from Snippetbook!');
	}));

	context.subscriptions.push(vscode.commands.registerCommand('snippetbook.refresh', async () => {

		// HelloWorldPanel.kill();
		// HelloWorldPanel.createOrShow(context.extensionUri);
		await vscode.commands.executeCommand("workbench.view.extension.sidebar-view");
		await vscode.commands.executeCommand("workbench.action.closeSidebar");
		vscode.window.showInformationMessage('Hello World from Snippetbook!');
	}));


	context.subscriptions.push(vscode.commands.registerCommand('snippetbook.store', storeData));
	context.subscriptions.push(vscode.commands.registerCommand('snippetbook.retrieve', retrieveData));
}

export function deactivate() { }
