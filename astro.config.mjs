// @ts-check
import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import rehypeCitation from 'rehype-citation';

// The site is served from https://liamadale.github.io/dev300-final-project/
const base = '/dev300-final-project';

/**
 * Lets Markdown pages link with plain paths like [Paper](/paper/)
 * by adding the site's base path to every link that starts with "/".
 */
function rehypeBaseLinks() {
  /** @param {any} node */
  const visit = (node) => {
    if (node.type === 'element' && node.tagName === 'a') {
      const href = node.properties?.href;
      if (typeof href === 'string' && href.startsWith('/') && !href.startsWith('//') && !href.startsWith(base)) {
        node.properties.href = base + href;
      }
    }
    node.children?.forEach(visit);
  };
  return (/** @type {any} */ tree) => visit(tree);
}

/**
 * Fixes APA year letters (2024a, 2024b) on in-text citations.
 * rehype-citation writes each citation once and never updates it, so when a second
 * same-author, same-year source is cited later, the earlier citations keep a bare "2024".
 * This copies each source's year label from the reference list into every link to it.
 */
function rehypeFixYearLetters() {
  /** @param {any} node @returns {string} */
  const text = (node) => (node.type === 'text' ? node.value : (node.children ?? []).map(text).join(''));
  const yearRE = /\b(\d{4}|n\.d\.)(-?[a-z])?(?![a-z])/;
  return (/** @type {any} */ tree) => {
    /** @type {Map<string, string>} */
    const labels = new Map();
    /** @param {any} node */
    const collect = (node) => {
      const id = node.properties?.id;
      if (node.type === 'element' && typeof id === 'string' && id.startsWith('bib-')) {
        const m = text(node).match(/\((\d{4}|n\.d\.)(-?[a-z])?/);
        if (m) labels.set(id, m[0].slice(1));
      }
      node.children?.forEach(collect);
    };
    /** @param {any} node */
    const fix = (node) => {
      const href = node.properties?.href;
      if (node.type === 'element' && node.tagName === 'a' && typeof href === 'string' && href.startsWith('#bib-')) {
        const label = labels.get(href.slice(1));
        for (const child of node.children ?? []) {
          const m = child.type === 'text' && label ? child.value.match(yearRE) : null;
          if (m && label?.startsWith(m[1])) child.value = child.value.replace(yearRE, label);
        }
      }
      node.children?.forEach(fix);
    };
    collect(tree);
    fix(tree);
  };
}

export default defineConfig({
  site: 'https://liamadale.github.io',
  base,
  trailingSlash: 'always',
  markdown: {
    // Mermaid diagrams are drawn in the browser, so don't syntax-highlight them.
    syntaxHighlight: { type: 'shiki', excludeLangs: ['mermaid'] },
    shikiConfig: { theme: 'github-dark-dimmed' },
    processor: unified({
      rehypePlugins: [
        // Turns [@key] into APA citations from references.bib and builds the reference list.
        [
          rehypeCitation,
          {
            bibliography: 'references.bib',
            csl: 'apa',
            linkCitations: true,
          },
        ],
        rehypeFixYearLetters,
        rehypeBaseLinks,
      ],
    }),
  },
});
