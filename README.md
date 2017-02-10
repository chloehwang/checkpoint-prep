# Checkpoint Prep

Maybe you could just make a simple todo app?

## Getting started

1. Fork and clone this repo
2. *Set the name of your project in `package.json`*. The skeleton intentionally ships with an invalid name,
and nothing will work.
3. Start the build process:
```
npm install
npm run build-watch
```

4. In another terminal, start your app:

```
npm start
```

## Outline

Here’s a basic outline for the exercise:
- Include two or three data models with an association between them (in the case of a todo app you might want to have a user that can make a list and add tasks to it)
- Make a backend that does the CRUD thing (i.e. has routes that handle POST, GET, PUT, and DELETE requests for each model)
- Use React! Using Redux is optional. Ultimately, your front end should hook up to your backend somehow, allowing users to make those CRUD requests.
