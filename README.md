# Socializer

Interaktywny, responsywny planer spotkań znajomych. Dane są zapisywane w przeglądarce (`localStorage`) i nie wymagają serwera ani procesu budowania.

## Funkcje

- propozycje miejscówek i głosowanie,
- zestawienie kosztów i automatyczny podział na uczestników,
- lista obecności,
- wskazówki dojazdu,
- przyciski dodawania miejscówek, kosztów i osób.

## Lokalny start

Uruchom prosty serwer w katalogu projektu:

```bash
python -m http.server 8000
```

Następnie odwiedź `http://localhost:8000`.

## Wdrożenie na GitHub Pages

1. Zatwierdź i wyślij pliki do gałęzi `main`:

```bash
git add .
git commit -m "Create meetup planner"
git push origin main
```

2. W repozytorium otwórz **Settings → Pages**.
3. W sekcji **Build and deployment** ustaw **Source** na **Deploy from a branch**.
4. Wybierz gałąź `main` i folder `/ (root)`, a następnie kliknij **Save**.
5. Poczekaj na publikację strony. Będzie dostępna pod adresem `https://<użytkownik>.github.io/<nazwa-repozytorium>/`.

Repozytorium nie potrzebuje biblioteki ani kompilacji — wystarczą pliki `index.html`, `styles.css` i `app.js`.
