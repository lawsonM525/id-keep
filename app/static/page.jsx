'use client';

import { useEffect, useMemo, useState } from 'react';
import { ShieldCheck } from 'lucide-react';
import { CopyButton, Header, parseUrl } from '../url-tools';

export default function StaticPage() {
  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  const result = useMemo(() => parseUrl(currentUrl), [currentUrl]);
  const exampleStaticUrl =
    typeof window === 'undefined' ? '/static?child=483920' : `${window.location.origin}/static?child=483920`;

  return (
    <>
      <Header activePage="static" />
      <main className="page">
        <section className="panel narrow">
          <div className="section-title">
            <ShieldCheck aria-hidden="true" />
            <h1>Static child field</h1>
          </div>
          <p className="lede">
            This page reads the current page URL and displays the six-digit value from the
            <code> child </code>
            field.
          </p>

          <label className="field">
            <span>Child code</span>
            <input readOnly value={result.childCode || 'No six-digit child code found'} />
          </label>

          <CopyButton text={result.childCode || 'No six-digit child code found'} label="Copy child code" />

          <div className="example">
            <span>Try this URL</span>
            <a href="/static?child=483920">{exampleStaticUrl}</a>
          </div>
        </section>
      </main>
    </>
  );
}
