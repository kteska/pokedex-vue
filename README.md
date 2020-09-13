# Pokedex by Katarzyna Teska

![Zrzut ekranu 2020-09-13 o 7 41 44 PM](https://user-images.githubusercontent.com/63778196/93024777-28e54f80-f5f9-11ea-836f-e037d444f43a.png)

Strona dostępna pod adresem: https://pokedex-kat.netlify.app/#/

## Opis zadania

Zadanie polegało na przygotowaniu Pokedexa, czyli listy Pokemonów, która 
będzie zawierała podstawowe informacje o każdym z nich, korzystając z PokeAPI.

![Zrzut ekranu 2020-09-13 o 7 42 06 PM](https://user-images.githubusercontent.com/63778196/93024781-369ad500-f5f9-11ea-9828-ebd662e94383.png)

## Uruchomienie aplikacji

Po pobraniu należy przejść do folderu, gdzie znajdują się pobrane pliki (pokedex lub pokedex-master). Aplikację należy uruchomić komendą ```npm start``` (która również uruchamia ```npm install```), a następnie otworzyć aplikację w przeglądarce na jednym z podanych adresów (np. http://localhost:8080/).

## Wykorzystane technologie w projekcie

*  JavaScript - framework Vue.js (Vuex, VueRouter)
*  HTML, CSS
*  Vuetify - biblioteka UI
*  Axios - biblioteka do zapytań HTTP

## Funkcjonalności

Aplikacja Pokedex by Katarzyna Teska umożliwia wyświetlenie listy pokemonów, 
która zawiera paginację. Na stronie głównej znajdują się karty z Pokemonami, 
przyciski do poruszania się po liście, pole do wpisania nazwy szukanego 
Pokemona oraz przycisk służący do przejścia na stronę z filtrowaniem po typach.
Po najechaniu myszką na wybraną kartę ze zdjęciem, pojawia się nazwa 
wybranego Pokemona. Natomiast po kliknięciu w kartę z Pokemonem, wyświetla się 
okno dialogowe, które zawiera zdjęcie i podstawowe informacje o Pokemonie, 
takie jak: nazwa, typ pokemona (niebieskie pola), podstawowe doświadczenie (base experience), 
wzrost, waga i umiejętności (żółte pola). Na dole strony znajdują się strzałki do 
przewijania listy.

Na stronie głównej znajduje się również pole do wpisania nazwy szukanego 
Pokemona - ```Search by name```. Wyszukiwanie działa w taki sposób, że dokładnie porównuje 
wpisaną nazwę, niezależnie od wielkości znaków. Po wpisaniu nazwy i wciśnięciu lupki lub 
klawisza ```enter```, lista jest przewijana na stronę, gdzie znajduje się 
szukany Pokemon i wyświetla się okno dialogowe z informacjami o nim.
Po zamknięciu okna dialogowego przyciskiem ```Choose me```, można z tego miejsca dalej poruszać 
się po liście. 


Po wciśnięciu przycisku ```Types Filter``` możliwe jest filtrowanie listy po 
typach Pokemonów. Dostępne typy Pokemonów to electric, grass, fire, 
’water’. Po wybraniu filtra wyświetlają się karty z pokemonami wybranego typu. 
Tak samo jak stronie głównej dostępne są funkcjonalności: wyświetlenie nazwy 
po najechaniu myszką na kartę i wyświetlenie okna dialogowego z informacjami
o danym Pokemonie po kliknięciu na kartę. Aby wrócić na stronę główną, należy 
kliknąć przycisk ```Pokedex List```.

![Zrzut ekranu 2020-09-13 o 7 42 48 PM](https://user-images.githubusercontent.com/63778196/93024793-4fa38600-f5f9-11ea-984f-c24bcfe58de6.png)

## Podsumowanie
Do zdjęć Pokemonów na kartach wykorzystałam zdjęcia 
z [https://pokeres.bastionbot.org](url) Pokemon (Pokeres) API. Natomiast w oknach 
dialogowych zdjęcia są pobierane z PokeAPI. Uznałam, że na kartach będą zdjęcia
w lepszej jakości. Konsekwencją tego może być dłuższe ich ładowanie na stronie.
Aplikacja nie sprawdza czy pod danym adresem znajduje się zdjęcie.

