# REST API BUILT BY CURSOR AI

A practice project to improve my skills with prompting and editing AI completions. Primarily used claude-3.7-sonnet.

Roughly based on Udemy course: **AI For Developers With GitHub Copilot, Cursor AI & ChatGPT**

### Kicked it off with a request of ChatGPT:
```
You are a professional Node.js / Express developer.

Give me the structure and key building blocks for a Node + Express REST API that offers the following features:
- User authentication
- Authenticated users can create, edit and delete events
- Authenticated users can register for events and unregister
- Users can only edit or delete the events that they created
- Events are made up of a title, description, date, location and image (which is uploaded during creation)

Don't generate any code, just give me the key building blocks and structure.
```

### Some of my requests to Cursor:

```
This REST API needs user authentication.
Users must be able to register (sign up) and login.
Don't add any JWT code or anything like that, just generate User model in the models folder.
Also generate signup and login routes (e.g.: /users/signup) in the routes folder.
Also, add the code for linking route and model to a users controller (in the controllers folder).
Don't add any code for storing user data in a database yet.
```

```
@Web I want to store all the data in a SQLite database. How do I add one to this application?
```

```
Can this be done without sqlite3 and only the better-sqlite3 package?
```