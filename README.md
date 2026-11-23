# Socializer

An interactive, responsive meetup planner for friends. Data is stored in the browser (`localStorage`) and no server or build process is required.

## Features

- venue suggestions and voting,
- cost breakdown and automatic per-person splitting,
- attendance list,
- travel directions,
- buttons for adding venues, costs, and participants.

## Deploying to GitHub Pages

1. Commit and push the files to the `main` branch:

```bash
git add .
git commit -m "Create meetup planner"
git push origin main
```

2. Open **Settings → Pages** in the repository.
3. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
4. Select the `main` branch and the `/ (root)` folder, then click **Save**.
5. Wait for the site to be published. It will be available at `https://<username>.github.io/<repository-name>/`.

The repository does not require any library or build process. Project files are organized as follows:

- `index.html` — page structure,
- `css/` — stylesheets,
- `js/` — JavaScript and initial data,
- `README.md` — setup and deployment instructions.
