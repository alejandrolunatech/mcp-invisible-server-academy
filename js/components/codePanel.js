/**
 * codePanel.js — Syntax-highlighted code panel with copy button
 */

export function createCodePanel({ lang = 'Python', rawCode = '', explanation = '' } = {}) {
  const panel = document.createElement('div');
  panel.className = 'code-panel';
  panel.innerHTML = `
    <div class="code-panel__header">
      <span class="code-panel__lang">${lang}</span>
      <button class="code-panel__copy">Copy</button>
    </div>
    <pre class="code-panel__body">${syntaxHighlight(rawCode, lang)}</pre>
    ${explanation ? `<div class="code-panel__explain">💡 ${explanation}</div>` : ''}
  `;

  // Copy functionality
  panel.querySelector('.code-panel__copy').addEventListener('click', function () {
    navigator.clipboard.writeText(rawCode).then(() => {
      this.textContent = 'Copied!';
      this.classList.add('copied');
      setTimeout(() => {
        this.textContent = 'Copy';
        this.classList.remove('copied');
      }, 2000);
    }).catch(() => {
      this.textContent = 'Copy failed';
    });
  });

  return panel;
}

/** Very lightweight syntax highlighter */
function syntaxHighlight(code, lang) {
  const escaped = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  if (lang === 'Python') {
    return escaped
      .replace(/(#[^\n]*)/g, '<span class="py-cmt">$1</span>')
      .replace(/\b(def|class|return|import|from|if|else|elif|for|while|with|as|in|not|and|or|True|False|None|raise)\b/g,
        '<span class="py-kw">$1</span>')
      .replace(/(@\w+(?:\(\))?)/g, '<span class="py-dec">$1</span>')
      .replace(/("""[\s\S]*?"""|'[^']*'|"[^"]*")/g, '<span class="py-str">$1</span>')
      .replace(/\b(\d+(?:\.\d+)?)\b/g, '<span class="py-num">$1</span>');
  }

  if (lang === 'Shell') {
    return escaped
      .replace(/(#[^\n]*)/g, '<span class="py-cmt">$1</span>')
      .replace(/\b(curl|cd|sh|pip|python|python3|uv|mcp)\b/g, '<span class="py-fn">$1</span>');
  }

  return escaped;
}
