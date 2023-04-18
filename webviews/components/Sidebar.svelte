<script>
    import { onMount } from "svelte";
    import { appI } from "../../src/fb";
    import "firebase/firestore";
    import { user } from "../../src/store";
    import { tok } from "../../src/token";
    import { get } from "svelte/store";
    import {
        getAuth,
        signInWithEmailAndPassword,
        signOut,
        onAuthStateChanged,
        createUserWithEmailAndPassword,
        signInWithPopup,
        signInWithRedirect,
        GoogleAuthProvider,
    } from "firebase/auth";
    import { db } from "../../src/fb";
    import {
        collection,
        doc,
        addDoc,
        getDocs,
        setDoc,
        query,
        getDoc,
        where,
    } from "firebase/firestore";

    // import { collection, query, where, getDocs } from "firebase/firestore";

    let email = "";
    let password = "";
    let userI = null;
    let error = null;
    let data = [];
    let id;

    // Initialize user with null
    user.set(null);
    tok.set(null);
    // $: if (user) {
    //     id = user.uid;
    // }

    const signup = () => {
        const auth = getAuth(appI);
        createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                error = null;
            })
            .catch((err) => {
                const errorCode = err.code;

                error = err.message;
                console.log(errorCode, error);
            });
    };

    const login = () => {
        const auth = getAuth(appI);
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                error = null;
                console.log(userI);
                console.log(user);
                const userId = get(user); // get the user id from the store
                const token = auth.getIdToken();
                console.log("hahah", userId);
                console.log("hahah2", token);
                // console.log($user);
            })
            .catch((err) => {
                const errorCode = err.code;
                error = err.message;
                console.log(errorCode, error);
            });
    };

    const logout = async () => {
        const auth = getAuth(appI);
        signOut(auth);
        // user.set(null);
        userI = null; // Update userI to null
        user.set(null);
        console.log(user);
        const userId = get(user); // get the user id from the store
        console.log("hahah", userId);
        const t = get(tok); // get the user id from the store
        console.log("hohoh", t);
        // console.log(user);
        // console.log(user.value());

        // console.log(user.value);
    };

    onMount(async () => {
        userI = null;
        const auth = getAuth(appI);
        onAuthStateChanged(auth, (newUser) => {
            userI = newUser;
            user.set(userI.uid);
            // tok.set(userI.accessToken);
        });
    });
    let labels;
    const fetchData = async () => {
        labels = [];
        data = [];
        const snippetsRef = collection(db, "Snippets");
        const docsSnap = await getDocs(snippetsRef);
        docsSnap.forEach((doc) => {
            console.log(doc.id);
            labels.push(doc.id);
        });
        console.log(labels);
        data = data.concat(labels);
    };
    fetchData();
</script>

{#if userI}
    <p>Signed In !</p>
    <button on:click={logout}>Logout</button>
    <button on:click={fetchData}>Fetch</button>

    <p>Snippet Labels</p>
    <ul>
        {#each data as label}
            <li>{label}</li>
        {/each}
    </ul>
{:else}
    <input type="email" id="email" placeholder="email" bind:value={email} />
    <input
        type="password"
        id="password"
        placeholder="password"
        bind:value={password}
    />
    <button on:click={login}>Login</button>
    <button on:click={signup}>Sign Up</button>
    {#if error}
        <p style="color: red">{error}</p>
    {/if}
{/if}
