import * as vscode from 'vscode';
import { collection, doc, addDoc, getDocs, setDoc } from "firebase/firestore";
import { db } from '../src/fb';
import firebase from 'firebase/compat';
import 'firebase/firestore';
import { FirebaseApp } from 'firebase/app';
import { user } from '../src/store';
import { get } from "svelte/store";

export async function storeData() {

    vscode.window.showInformationMessage('Hello World from snippetcode!');

    // const category = await vscode.window.showInputBox({
    //     prompt: 'enter the language'
    // });
    const label = await vscode.window.showInputBox({
        prompt: 'enter snippet label'
    });
    let selectedText = '';
    let editor = vscode.window.activeTextEditor;
    if (editor) {
        selectedText = editor.document.getText(editor.selection);
    } else {
        console.log('No active editor found');
    }

    const snippetsRef = collection(db, 'Snippets');

    // Reference to the "doc" document inside the Snippets collection
    const docRef = doc(snippetsRef, label);
    await setDoc(docRef, { text: selectedText, uid: '1234' });


    // console.log('hahahaah', get(user));

    // const ui = user.uid;
    // try{
    //     firebase.firestore()
    //             .collection('users')
    //             .doc(uid)
    //             .add(
    //                 {{label}:[...fetchedData,newObject]}
    //                 )
    //             .then(()=>{setRerender(!rerender);
    //                 navigation.goBack();
    //                 Alert.alert("Note Init",
    //                 "Added successfully",
    //                 [
    //                     {
    //                         text: "Ok"
    //                     }
    //                 ])
    //             })
    //             .catch((e)=>{setError("Something went wrong")});
    //     }catch(error){
    //         setError("Something went wrong");
    //     }
    // try {
    //     await setDoc(doc(db, "Snippets", "LA"), {
    //         text: "Los Angeles",
    //         userId: 'ash',

    //     });
    // }
    // catch (e) {
    //     console.log(e);
    // }

    // let labelRef;

    // Reference to the Snippets collection
    // const snippetsRef = collection(db, 'Snippets');

    // if (snippetsRef) {
    //     try {
    //         await setDoc(, { text: selectedText });
    //     } catch (error) {
    //         console.log({ error });
    //     }
    // }
    // // Reference to the "doc" document inside the Snippets collection
    // const docRef = doc(snippetsRef, selectedText);

    // if (category) {
    //     // Reference to the Category sub-collection inside the "doc" document
    //     const categoryRef = collection(docRef, category);
    //     // Reference to the "label" document inside the Category sub-collection
    //     labelRef = doc(categoryRef, label);

    // }




    // if (labelRef) {
    //     try {
    //         await setDoc(labelRef, { text: selectedText });
    //     } catch (error) {
    //         console.log({ error });
    //     }
    // }





    // console.log(result);

    vscode.window.showInformationMessage('store was executed!', selectedText, 'was strored');
}

export function deactivate() { }