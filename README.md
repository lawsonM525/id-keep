# ID Keep

ID Keep is a simple Next.js app for pulling ID-style values out of links.

## What It Does

The app has two pages:

- `/` lets someone paste a link and see the values attached to it.
- `/static` reads the current page URL and shows the `child` code if one is present.

For example, this link:

```txt
https://example.com/form?child=AB483Z&case=summer
```

will show:

- `child` = `AB483Z`
- `case` = `summer`

The app also includes copy buttons so people can copy the child code or an individual field value.

## How Fields Are Found

ID Keep checks:

- Query string fields, like `?child=483920`
- Hash fields, like `#child=483920`
- Six-character alphanumeric codes in the URL path, like `/child/AB483Z`

If a `child` field has a six-character alphanumeric value, that value is shown as the child code. If there is no valid `child` field, the app can still fall back to a six-character alphanumeric code found in the URL path or another field value.

## Local Development

Install dependencies:

```bash
npm install
```

Run the dev server:

```bash
npm run dev
```

Open:

```txt
http://localhost:3000
```

## Build

```bash
npm run build
```

## Deploy

This app is ready to deploy on Vercel. Import the GitHub repo into Vercel and use the default Next.js settings.
