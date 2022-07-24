# Karteikasten - Atomic Learning

This app helps you learn "atomic" things like vocabulary, formula and everything else that fits on a card.

[Open Karteikasten](https://visualjerk.github.io/karteikasten/)

## TODO

- [ ] Add learn with TRPC
- [ ] Add unauthorized usage option
- [ ] Add loading skeleton
- [ ] Add button pending indicator
- [ ] Add global pending indicator
- [ ] Improve card style
- [ ] Add different learning variants (timer, speech to text, ...)
- [ ] Add TRPC subscriptions for cross tab updates

## Unauthorized usage

The app should be usable without log in. In order to sync data between different devices / browsers, a user can log in.

### Option A - LocalStorage

We could use localStorage for unauthorized users. This is a challenge, as localStorage does not play well with our current architecture (TRPC / Prisma). The prefered option would be a Prisma-like solution for client side storage.

### Option B - Same DB, but different auth method

We could create our own token for unauthorized users.
