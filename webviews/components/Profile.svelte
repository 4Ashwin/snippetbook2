<script>
    import { app } from "../../src/fb";

    import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
    let email = "";
    let password = "";

    const login = () => {
        const auth = getAuth(app);
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log(user);
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    };
    const logout = () => {};
</script>

<input type="email" id="email" placeholder="email" bind:value={email} />
<input
    type="password"
    id="password"
    placeholder="password"
    bind:value={password}
/>
<button on:click={login}>Login</button>
<button on:click={logout}>Login</button>
