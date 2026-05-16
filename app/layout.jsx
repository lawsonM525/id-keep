import './globals.css';

export const metadata = {
  title: 'ID Keep',
  description: 'Extract and copy child codes from URLs.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
