'use client';

import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { CopyButton, FieldTable, Header, parseUrl } from './url-tools';

const exampleDynamicUrl =
  'https://example.org/intake?child=AB483Z&case=summer&guardian=michelle#source=school';

export default function DynamicPage() {
  const [url, setUrl] = useState(exampleDynamicUrl);
  const result = useMemo(() => parseUrl(url), [url]);

  return (
    <>
      <Header activePage="dynamic" />
      <main className="page">
        <section className="panel">
          <div className="section-title">
            <Search aria-hidden="true" />
            <h1>Find the child code in a link</h1>
          </div>
          <p className="lede">
            Paste a link below to pull out the child code and any other values attached to it.
          </p>

          <label className="field">
            <span>Paste link here</span>
            <textarea value={url} onChange={(event) => setUrl(event.target.value)} />
          </label>

          <div className="result-grid">
            <div className="result-card">
              <span>Child code</span>
              <strong>{result.childCode || 'Not found'}</strong>
            </div>
            <div className="result-card">
              <span>Status</span>
              <strong>{result.ok ? 'Parsed' : 'Waiting'}</strong>
            </div>
          </div>

          <CopyButton text={result.childCode || 'No child code found'} label="Copy child code" />

          {!result.ok ? <p className="error">{result.error}</p> : <FieldTable fields={result.fields} />}
        </section>
      </main>
    </>
  );
}
