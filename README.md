# Karteikasten - Atomic Learning

This app helps you learn "atomic" things like vocabulary, formula and everything else that fits on a card.

[Open Karteikasten](https://visualjerk.github.io/karteikasten/)

## TODO

- [x] Add learn with TRPC
- [x] Add global learning reset
- [ ] Add better learning session handling
- [ ] Add single card reset
- [ ] Add unauthorized usage option
- [ ] Add loading skeleton
- [ ] Add button pending indicator
- [ ] Add global pending indicator
- [ ] Improve card style
- [ ] Add different learning variants (timer, speech to text, ...)
- [ ] Add learn duration diff setting
- [ ] Add TRPC subscriptions for cross tab updates

## Unauthorized usage

The app should be usable without log in. In order to sync data between different devices / browsers, a user can log in.

### Option A - LocalStorage

We could use localStorage for unauthorized users. This is a challenge, as localStorage does not play well with our current architecture (TRPC / Prisma). The prefered option would be a Prisma-like solution for client side storage.

Maybe use localForage for this?

### Option B - Same DB, but different auth method

We could create our own token for unauthorized users.

### Option C - Offline first DB (rxdb)

We could opt for an offline first approach with a solution like rxdb. This however would mean to rework the whole architecture, as it does not allow relational data.
