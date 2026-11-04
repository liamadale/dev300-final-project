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
        rehypeBaseLinks,
      ],
    }),
  },
});
