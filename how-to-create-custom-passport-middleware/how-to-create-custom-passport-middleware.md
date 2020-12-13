We're going to be looking at how we can dynamically select the passport middleware that we want to use based on the requested route. This is useful if you have multiple auth handlers in your app and you want a consistent way of handling them without repeating code.

So if you find yourself doing something like this:

```ts
app.get(
  "/login/facebook",
  passport.authenticate("facebook", { /* options */ })
);

app.get(
  "/login/google",
  passport.authenticate("google", { /* options */ })
);

app.get(
  "/login/twitter",
  passport.authenticate("twitter", { /* options */ })
);
```

... and then handling the return callback routes like this:

```ts
app.get(
  "/login/facebook/callback",
  passport.authenticate("facebook"),
  (req, res) => {
    /* ... */
  }
);

app.get(
  "/login/google/callback",
  passport.authenticate("google"),
  (req, res) => {
    /* ... */
  }
);

app.get(
  "/login/twitter/callback",
  passport.authenticate("twitter"),
  (req, res) => {
    /* ... */
  }
);
```

... we can see that a lot of similar code is being repeated. This would mean that any changes that we make would have to be repeated thrice (in this case).

## Refactor
Now in order to abstract this out, we can use Express' route parameters to determine the handler that we want to use.

One thing to note is that `passport.authenticate()` returns an Express middleware, which accepts `req`, `res` and `next` as arguments. So we're going to take advantage of this fact by forwarding these arguments to the passport middleware.

So for the initial login route handler, we're going to refactor it like this:

```ts
app.get("/login/:provider", (req, res, next) => {
  const { provider } = req.params;

  const passportOptions = {
    // compose your options object
    // here based on the provider.
  };

  const passportMiddleware = passport.authenticate(
    provider, passportOptions
  );

  // this is important, else
  // you'll see a blank screen.
  passportMiddleware(req, res, next);
});
```

And similarly for the callback route handler:

```ts
app.get(
  "/login/:provider/callback",
  (req, res, next) => {
    const { provider } = req.params;

    const passportOptions = {
      /* ... */
    };

    const passportMiddleware = passport.authenticate(
      provider, passportOptions
    );

    passportMiddleware(req, res, next);
  },
  (req, res) => {
    // the provider route param is available
    // here too, along with the user object that
    // passport attaches upon successful authentication
    const { provider, user } = req.params;

    // ...
    // Conditional code based on the provider.
    // Preferably, the conditional logic would
    // be defined elsewhere, where it would accept
    // a `provider` as an argument and would
    // return data accordingly. This would ensure that
    // the route handler code doesn't get cluttered
    // with conditional logic.
  }
);
```

## Typos? Improvements?
Thanks for reading. If you notice any typos or would like to suggest improvements, please feel free to either create an issue or PR [here](https://github.com/metamodal/blog/blob/master/how-to-create-custom-passport-middleware/how-to-create-custom-passport-middleware.md).