# VS Media Assignment

## Requirements

1. Build a list of items/users from an API (https://jsonplaceholder.typicode.com/users)

The list list is fetched in the DOMCententLoaded event like so:

document.addEventListener("DOMContentLoaded", async () => {
  allUsers = await getAllUsers()
  buildUserList(displayFormat, sortBy, filterBy)
});

The users are loaded in the allUsers array global variable, then the buildUserList() function actually builds the list.

2. Views

a/ All Users List: a list view that shows all the users in cards format

b/ Edit an Item: Each card has an Edit button and a Delete button on the top right corner. Clicking on each button presents the user with a modal view to complete the Edit or Delete opration or Cancel it.

c/ Add New Item: The page contains an New Item/User form to fullfil that function. I chose to implement validation for 4 fields.
Validation is also provided for the Edit view.

I am using a generated unique id to add the new user to avoid eventual colision on the the id with different users.
Ideeally, I was thinking of calling the 'add' endpoint of the API. But since it will return an item for which the id may already used by an item already on the list.

I could handle this case where the id is already in use.

3. Filtering

I chose to filter on the email domain field (i.e., .net, .com etc..)

4. Sorting

Sorting is implemented on the email and the name fields.
It's an alphabetical sort so the first word of the email/name is used

5. Styling

I used Tailwindcss for styling. For this reason I think you might need a web server to render the page.
I use Live Server and it works beatifully.

## How To Run The App

- Clone the package or downnload and unzip the files in a folder.
- Start Live Server or any web server
- Open localhost:[PORT_NUMBER]

Enjoy.

## Limitations

There are many edge cases that in a production CRUD application MUST be handled, such as:
- add to an existing item in the list
- delete an item that does not exist
- etc...

But this application put the focus more on different aspects of the web app dev cycle. I just wanted to say that I have these key points in mind.