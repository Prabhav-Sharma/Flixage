# [Flixage](https://flixage.netlify.app/)
A video streaming platform built using react

The backend code for this project is currently provided by [Mockbee](https://mockbee.netlify.app/)

The platform enables the user to have their own personalized data on the app like watch later list, playlists, history and their liked videos while also providing the ability to stream videos.

## Features
### Authentication 
- Authentication allows the user to login/signup into the app to unlock personalized features.
- Redirects user to login page, if an attempt is made to navigate to protected pages which require the user to be authenticated
- Authentication is achieved by using an encoded token so as to not publicize user data.
- The user on successfully logging in, is navigated back to whichever page their were trying to reach before being redirected to the login page.

### Playlists
- The user can create and delete new playlists.
- The user can add new videos or remove videos from the playlist

### Likes
- All the videos that the user has liked in the app, will be stored here
- The user can choose to remove them one by one or alternatively remove all of them at once

### Watch Later
- The user can also save videos which they might not have the time for, so they come back to them later.
- This feature also allows users to delete items one by one or remove them all at once

### History
- All the videos that the user has streamed on the app will be available here.
- The user can choose to keep them in order to revisit, track or remove them.

### Alerts & Loaders
- The web-app has been made in a way that doesn't leave the user confused, figuring out whether the thing they tried to achieve, actually happened or not
- There are alerts for all API calls, which would be triggered both on success and failure.
- There are button loaders which indicate the task is in progress, upon completion the loader stops and an alert is fired to inform the user about the result.

## Screens
![chrome-capture (10)](https://user-images.githubusercontent.com/88072012/162268352-de4d7a16-64d0-4d81-b6ce-79df04301940.gif)



