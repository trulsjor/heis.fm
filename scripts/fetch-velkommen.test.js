import { describe, it, expect } from 'vitest';
import { convertToMarkdown } from './fetch-velkommen.js';

describe('Google Docs to Markdown Conversion', () => {
  it('should convert h1 headings', () => {
    const html = '<h1>Velkommen til Heis!</h1>';
    const result = convertToMarkdown(html);
    expect(result).toBe('# Velkommen til Heis!');
  });

  it('should convert h2 headings', () => {
    const html = '<h2>Før opptaket</h2>';
    const result = convertToMarkdown(html);
    expect(result).toBe('## Før opptaket');
  });

  it('should convert paragraphs', () => {
    const html = '<p>Dette er en paragraf</p>';
    const result = convertToMarkdown(html);
    expect(result).toBe('Dette er en paragraf');
  });

  it('should convert bullet lists', () => {
    const html = '<ul><li>Item 1</li><li>Item 2</li></ul>';
    const result = convertToMarkdown(html);
    expect(result).toBe('*   Item 1\n*   Item 2');
  });

  it('should remove Google Docs metadata', () => {
    const html = '<p>Publisert ved hjelp av Google Dokumenter</p><p>Real content</p>';
    const result = convertToMarkdown(html);
    expect(result).toBe('Real content');
  });

  it('should remove style tags', () => {
    const html = '<style>body { color: red; }</style><p>Content</p>';
    const result = convertToMarkdown(html);
    expect(result).toBe('Content');
  });

  it('should extract content from Google Docs contents div', () => {
    const html = '<div id="contents"><h1>Title</h1><p>Content</p></div><div>Ignore this</div>';
    const result = convertToMarkdown(html);
    expect(result).toContain('# Title');
    expect(result).toContain('Content');
    expect(result).not.toContain('Ignore this');
  });

  it('should handle complex document structure', () => {
    const html = `
      <div id="contents">
        <h1>Velkommen til Heis!</h1>
        <p>Intro tekst</p>
        <h2>Seksjon 1</h2>
        <ul>
          <li>Punkt 1</li>
          <li>Punkt 2</li>
        </ul>
      </div>
    `;
    const result = convertToMarkdown(html);
    expect(result).toContain('# Velkommen til Heis!');
    expect(result).toContain('Intro tekst');
    expect(result).toContain('## Seksjon 1');
    expect(result).toContain('Punkt 1');
    expect(result).toContain('Punkt 2');
  });

  it('should unescape hyphens from Turndown output', () => {
    // Test with HTML that causes Turndown to escape hyphens
    const html = '<p>- Item with hyphen</p>';
    const result = convertToMarkdown(html);
    // Should not contain escaped hyphens
    expect(result).not.toContain('\\-');
    expect(result).toContain('- Item with hyphen');
  });

  it('should convert Google Docs CSS-based bold to markdown bold', () => {
    const html = `
      <style>.c11{font-weight:700}</style>
      <p><span class="c11">Bold text</span></p>
    `;
    const result = convertToMarkdown(html);
    expect(result).toContain('**Bold text**');
  });

  it('should convert Google Docs CSS-based italic to markdown italic', () => {
    const html = `
      <style>.c5{font-style:italic}</style>
      <p><span class="c5">Italic text</span></p>
    `;
    const result = convertToMarkdown(html);
    // Turndown uses underscores for emphasis
    expect(result).toContain('_Italic text_');
  });
});
