# Pokedex Vue

![Zrzut ekranu 2020-09-13 o 7 41 44 PM](https://user-images.githubusercontent.com/63778196/93024777-28e54f80-f5f9-11ea-836f-e037d444f43a.png)


## Task description

The task was to prepare a Pokedex - a list of Pokemons, which will contain basic information about each of them using external API called PokeAPI.

![Zrzut ekranu 2020-09-13 o 7 42 06 PM](https://user-images.githubusercontent.com/63778196/93024781-369ad500-f5f9-11ea-9828-ebd662e94383.png)

## Launching the app

After downloading, go to the folder where the downloaded files are located (pokedex or pokedex-master). The application should be started with the command ```npm start``` (which also starts ``` npm install```), and then the application should be opened in the browser on one of the given addresses (e.g. http://localhost:8080/).

## Technologies used in the project

*  JavaScript
*  Vue.js (Vuex, VueRouter)
*  HTML, CSS
*  Vuetify - UI library
*  Axios - HTTP library

## Functionalities

The Pokedex application allows to display a list of pokemons,
which includes pagination. On the main page there are cards with pokemons,
buttons for navigating through the list, a field for entering the name of the searched pokemon
and a button to go to the page with filtering by types.
After hovering the mouse over the selected card with a photo, the name of the selected pokemon appears. 
When you click on the card with Pokemon, it displays
a dialog box that contains a picture and basic information about the pokemon,
such as: name, type of pokemon (blue fields), base experience,
height, weight and skills (yellow spaces). At the bottom of the page there are arrows to
scroll the list.

On the home page there is also a field to enter the searched name of
pokemon - ```Search by name```. The search works in such a way that it compares exactly
typed name, regardless of case. After entering the name and pressing the magnifying glass or
key ```enter```, the list is scrolled to the page where searched pokemon is located
and a dialog box with information about it appears.
After closing the dialog with the ```Choose me``` button, you can continue to navigate from there.


After pressing the ```Types Filter``` button, it is possible to filter the list by
types of Pokemon. The available types of Pokemon are electric, grass, fire,
water. After selecting the filter, cards with pokemon of the selected type are displayed.
The same functionality as the main page is available: name display
by hovering over the card and displaying the dialog box
about a given Pokemon after clicking on the card. In order to go back to the home page, please
click the 'Pokedex List' button.

![Zrzut ekranu 2020-09-13 o 7 42 48 PM](https://user-images.githubusercontent.com/63778196/93024793-4fa38600-f5f9-11ea-984f-c24bcfe58de6.png)

## Summary

I used photos from https://pokeres.bastionbot.org website. However, in the windows
the photo dialogs are taken from PokeAPI. The consequence of this may be their longer loading on the website.
The application does not check if there is a photo at the address.

