import * as vscode from 'vscode';
import { collection, doc, addDoc, getDocs, setDoc, query, getDoc, where } from "firebase/firestore";
import { db } from '../src/fb';
import firebase from 'firebase/compat';
import 'firebase/firestore';
import { FirebaseApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { user } from '../src/store';
import { get } from "svelte/store";

// import user from '../webviews/pages/User';

export async function retrieveData() {

    vscode.window.showInformationMessage('Hello World from snippetcode!');

    // const category = await vscode.window.showInputBox({
    //     prompt: 'enter the language'
    // });
    const label = await vscode.window.showInputBox({
        prompt: 'enter label'
    });
    let editor = vscode.window.activeTextEditor;


    let labelRef;
    // Reference to the Snippets collection
    const snippetsRef = collection(db, 'Snippets');

    // Reference to the "doc" document inside the Snippets collection
    const docRef = doc(snippetsRef, label);
    try {
        const labelData = await getDoc(docRef);
        const textField = labelData.get('text');
        console.log(textField);
        if (editor) {
            editor.edit(editBuilder => {
                if (editor) {
                    editBuilder.replace(editor.selection, textField);
                }
            });
        } else {
            console.log('No active editor found');
        }
    }
    catch (e) {
        console.log(e);
    }


    // const userId = get(user);
    // const query = where('userId', '==', userId);
    // if (category) {
    //     // Reference to the Category sub-collection inside the "doc" document
    //     const categoryRef = collection(docRef, category);
    //     // Reference to the "label" document inside the Category sub-collection
    //     labelRef = doc(categoryRef, label);
    //     // if (userId) {
    //     //     // Add a where clause to the query to filter by user ID
    //     //     const query = where('userId', '==', userId);
    //     //     labelRef = query(labelRef);
    //     // }
    // }
    // if (labelRef) {
    //     try {

    //         if (user) {
    //             // If the user is logged in, get the data for the label document
    //             const labelData = await getDoc(labelRef);
    //             const textField = labelData.get('text');
    //             console.log(textField);

    //     if (editor) {
    //         editor.edit(editBuilder => {
    //             if (editor) {
    //                 editBuilder.replace(editor.selection, textField);
    //             }
    //         });
    //     } else {
    //         console.log('No active editor found');
    //     }
    // }
    // else {
    //     console.log('User is not logged in');
    // }
    // const labelData = await getDoc(query(labelRef));
    // const textField = labelData.get('text');

    // console.log(textField);
    // const mydata = JSON.stringify(await getDoc(labelRef));


    // } catch (error) {
    //     console.log({ error });
    // }
    // }





    // console.log(result);

    vscode.window.showInformationMessage('retrieve was executed!');
}

export function deactivate() { }