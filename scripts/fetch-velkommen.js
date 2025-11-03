import { writeFile } from 'fs/promises';
import { join } from 'path';
import TurndownService from 'turndown';

const GOOGLE_DOCS_URL = 'https://docs.google.com/document/d/e/2PACX-1vSV2fam9SuWdlCK1Hjth_1Qbpti7Q3O0hTM_jnIC8TKSfvWNyxQJh6ye9Wgtjq3SHlErtKemvU_KSGg/pub';
const OUTPUT_PATH = join(process.cwd(), 'src', 'content', 'velkommen.md');

const GOOGLE_DOCS_METADATA = [
  'Publisert ved hjelp av Google Dokumenter',
  'Rapporter uriktig bruk',
  'Finn ut mer',
  'Oppdateres automatisk hvert 5\\. minutt',
  'Gjesteinformasjon',
];

const removePattern = (text, pattern) => text.replace(pattern, '');
const removeAll = (text, patterns) => patterns.reduce((acc, pattern) =>
  acc.replace(new RegExp(pattern, 'g'), ''), text);

const extractContent = (html) => {
  const match = html.match(/<div[^>]*id="contents"[^>]*>([\s\S]*?)<\/div>/i);
  return match ? match[1] : html;
};

// Convert Google Docs CSS classes to semantic HTML before removing styles
const convertStylesToSemanticHtml = (html) => {
  // Extract CSS to find which classes represent bold/italic
  const styleMatch = html.match(/<style[^>]*>([\s\S]*?)<\/style>/);
  if (!styleMatch) return html;

  const css = styleMatch[1];
  const boldClasses = [];
  const italicClasses = [];

  // Find classes with font-weight: 700 (bold)
  css.replace(/\.(c\d+)\{[^}]*font-weight:\s*700[^}]*\}/g, (_, className) => {
    boldClasses.push(className);
  });

  // Find classes with font-style: italic
  css.replace(/\.(c\d+)\{[^}]*font-style:\s*italic[^}]*\}/g, (_, className) => {
    italicClasses.push(className);
  });

  let result = html;

  // Replace spans with bold classes with <strong> tags
  boldClasses.forEach(className => {
    const regex = new RegExp(`<span class="[^"]*\\b${className}\\b[^"]*">([^<]*)<\/span>`, 'g');
    result = result.replace(regex, '<strong>$1</strong>');
  });

  // Replace spans with italic classes with <em> tags
  italicClasses.forEach(className => {
    const regex = new RegExp(`<span class="[^"]*\\b${className}\\b[^"]*">([^<]*)<\/span>`, 'g');
    result = result.replace(regex, '<em>$1</em>');
  });

  return result;
};

// Remove style tags from extracted content
const removeStyles = (html) => html.replace(/<style[\s\S]*?<\/style>/gi, '');

// Turndown escapes hyphens in some contexts to avoid markdown conflicts
const unescapeHyphens = (markdown) => markdown.replace(/\\-/g, '-');

export function convertToMarkdown(html) {
  const turndown = new TurndownService({ headingStyle: 'atx', codeBlockStyle: 'fenced' });

  return [extractContent, convertStylesToSemanticHtml, removeStyles, removeAll, turndown.turndown.bind(turndown), unescapeHyphens]
    .reduce((content, fn) => fn === removeAll ? fn(content, GOOGLE_DOCS_METADATA) : fn(content), html);
}

async function fetchGoogleDoc() {
  const html = await fetch(GOOGLE_DOCS_URL).then(res => res.text());
  await writeFile(OUTPUT_PATH, convertToMarkdown(html), 'utf-8');
  console.log('✅ Successfully fetched and converted velkommen.md from Google Docs');
}

// Only run if this is the main module (not imported)
if (import.meta.url === `file://${process.argv[1]}`) {
  fetchGoogleDoc().catch(error => {
    console.error('❌ Error fetching Google Docs:', error);
    process.exit(1);
  });
}
