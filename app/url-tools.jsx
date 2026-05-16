'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Check, Clipboard, Copy, ExternalLink, Link2 } from 'lucide-react';

function collectParams(params, source, fields) {
  params.forEach((value, key) => {
    const existing = fields.find((field) => field.key === key && field.source === source);
    if (existing) {
      existing.values.push(value);
    } else {
      fields.push({ key, source, values: [value] });
    }
  });
}

function isSixCharacterCode(value) {
  return /^[a-z0-9]{6}$/i.test(value.trim());
}

export function parseUrl(rawUrl) {
  const trimmed = rawUrl.trim();
  if (!trimmed) {
    return { ok: false, error: 'Paste a URL to inspect its fields.', childCode: '', fields: [] };
  }

  try {
    const base = typeof window === 'undefined' ? 'https://id-keep.local' : window.location.origin;
    const parsed = new URL(trimmed, base);
    const fields = [];
    collectParams(parsed.searchParams, 'query string', fields);

    if (parsed.hash.length > 1) {
      const hashValue = parsed.hash.slice(1);
      const hashQuery = hashValue.includes('?') ? hashValue.split('?').at(-1) : hashValue;
      collectParams(new URLSearchParams(hashQuery), 'hash', fields);
    }

    const explicitChild = fields.find((field) => field.key.toLowerCase() === 'child');
    const pathChild = parsed.pathname.match(/(?:^|\/)([a-z0-9]{6})(?:\/|$)/i);
    const anySixCharacterValue = fields.flatMap((field) => field.values).find(isSixCharacterCode);
    const childFieldValue = explicitChild?.values.find(isSixCharacterCode);

    return {
      ok: true,
      href: parsed.href,
      origin: parsed.origin,
      pathname: parsed.pathname,
      childCode: childFieldValue || pathChild?.[1] || anySixCharacterValue || '',
      fields,
    };
  } catch {
    return {
      ok: false,
      error: 'That does not look like a valid URL yet.',
      childCode: '',
      fields: [],
    };
  }
}

async function copyText(text) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
}

export function CopyButton({ text, label, variant = 'primary' }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await copyText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <button className={`copy-button ${variant}`} type="button" onClick={handleCopy}>
      {copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
      {copied ? 'Copied' : label}
    </button>
  );
}

export function FieldTable({ fields }) {
  if (fields.length === 0) {
    return <p className="empty">No fields found in this URL.</p>;
  }

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Field</th>
            <th>Value</th>
            <th>Found in</th>
          </tr>
        </thead>
        <tbody>
          {fields.map((field) =>
            field.values.map((value, index) => (
              <tr key={`${field.source}-${field.key}-${index}`}>
                <td>{field.key}</td>
                <td>
                  <code>{value}</code>
                  <CopyButton text={value} label="Copy value" variant="small" />
                </td>
                <td>{field.source}</td>
              </tr>
            )),
          )}
        </tbody>
      </table>
    </div>
  );
}

export function Header({ activePage }) {
  return (
    <header className="topbar">
      <Link className="brand" href="/">
        <Link2 aria-hidden="true" />
        <span>ID Keep</span>
      </Link>
      <nav>
        <Link className={activePage === 'dynamic' ? 'active' : ''} href="/">
          <Clipboard aria-hidden="true" />
          Dynamic
        </Link>
        <Link className={activePage === 'static' ? 'active' : ''} href="/static?child=483920">
          <ExternalLink aria-hidden="true" />
          Static
        </Link>
      </nav>
    </header>
  );
}
