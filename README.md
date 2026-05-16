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

If a `child` field has a six-character alphanumeric value, that value is shown as the child code. If the `child` field is missing or invalid, the app shows a clear message instead of guessing from another part of the URL.

Validation messages include:

- `No child code`
- `Too short: needs 6 characters`
- `Too long: max 6 characters`
- `Invalid character: -`

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
