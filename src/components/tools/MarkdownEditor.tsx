import React, { useState } from 'react';
import { Eye, Edit, Copy, Check, Download } from 'lucide-react';

export const MarkdownEditor: React.FC = () => {
  const [markdown, setMarkdown] = useState(`# Welcome to Markdown Editor

This is a **live preview** markdown editor. Type in the left panel and see the results on the right!

## Features

- **Bold text** and *italic text*
- [Links](https://example.com)
- \`inline code\` and code blocks
- Lists and tables
- And much more!

### Code Example

\`\`\`javascript
function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet('World'));
\`\`\`

### Table Example

| Feature | Status |
|---------|--------|
| Live Preview | ✅ |
| Syntax Highlighting | ✅ |
| Export | ✅ |

> This is a blockquote. Great for highlighting important information!

---

Happy writing! 🚀`);

  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const [copied, setCopied] = useState(false);

  const convertMarkdownToHtml = (md: string) => {
    let html = md;
    
    // Headers
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
    
    // Bold
    html = html.replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>');
    
    // Italic
    html = html.replace(/\*(.*)\*/gim, '<em>$1</em>');
    
    // Code blocks
    html = html.replace(/```(\w+)?\n([\s\S]*?)```/gim, '<pre><code>$2</code></pre>');
    
    // Inline code
    html = html.replace(/`([^`]+)`/gim, '<code>$1</code>');
    
    // Links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
    
    // Blockquotes
    html = html.replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>');
    
    // Horizontal rules
    html = html.replace(/^---$/gim, '<hr>');
    
    // Tables
    html = html.replace(/\|(.+)\|/g, (match, content) => {
      const cells = content.split('|').map((cell: string) => cell.trim());
      return '<tr>' + cells.map((cell: string) => `<td>${cell}</td>`).join('') + '</tr>';
    });
    html = html.replace(/(<tr>.*<\/tr>)/s, '<table>$1</table>');
    
    // Line breaks
    html = html.replace(/\n/gim, '<br>');
    
    return html;
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(markdown);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const downloadMarkdown = () => {
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'document.md';
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadHtml = () => {
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Markdown Document</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; max-width: 800px; margin: 0 auto; padding: 20px; }
        h1, h2, h3 { color: #333; }
        code { background: #f4f4f4; padding: 2px 4px; border-radius: 3px; }
        pre { background: #f4f4f4; padding: 10px; border-radius: 5px; overflow-x: auto; }
        blockquote { border-left: 4px solid #ddd; margin: 0; padding-left: 20px; color: #666; }
        table { border-collapse: collapse; width: 100%; }
        td, th { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
    </style>
</head>
<body>
    ${convertMarkdownToHtml(markdown)}
</body>
</html>`;
    
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'document.html';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Markdown Editor</h1>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Write and preview Markdown with live rendering
              </p>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={copyToClipboard}
                className="flex items-center space-x-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
              
              <button
                onClick={downloadMarkdown}
                className="flex items-center space-x-1 px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
              >
                <Download className="h-4 w-4" />
                <span className="hidden sm:inline">MD</span>
              </button>
              
              <button
                onClick={downloadHtml}
                className="flex items-center space-x-1 px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
              >
                <Download className="h-4 w-4" />
                <span className="hidden sm:inline">HTML</span>
              </button>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          {/* Mobile Tabs */}
          <div className="lg:hidden mb-4">
            <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              <button
                onClick={() => setActiveTab('edit')}
                className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md transition-colors ${
                  activeTab === 'edit'
                    ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-300'
                }`}
              >
                <Edit className="h-4 w-4" />
                <span>Edit</span>
              </button>
              <button
                onClick={() => setActiveTab('preview')}
                className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md transition-colors ${
                  activeTab === 'preview'
                    ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-300'
                }`}
              >
                <Eye className="h-4 w-4" />
                <span>Preview</span>
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[600px]">
            {/* Editor */}
            <div className={`${activeTab === 'edit' ? 'block' : 'hidden'} lg:block`}>
              <div className="hidden lg:flex items-center space-x-2 mb-3">
                <Edit className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Editor</span>
              </div>
              <textarea
                value={markdown}
                onChange={(e) => setMarkdown(e.target.value)}
                className="w-full h-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Type your Markdown here..."
              />
            </div>
            
            {/* Preview */}
            <div className={`${activeTab === 'preview' ? 'block' : 'hidden'} lg:block`}>
              <div className="hidden lg:flex items-center space-x-2 mb-3">
                <Eye className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Preview</span>
              </div>
              <div className="w-full h-full border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 overflow-auto">
                <div 
                  className="p-4 prose prose-sm max-w-none dark:prose-invert"
                  dangerouslySetInnerHTML={{ __html: convertMarkdownToHtml(markdown) }}
                  style={{
                    color: 'inherit',
                    lineHeight: '1.6'
                  }}
                />
              </div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">Markdown Syntax Guide</h4>
            <div className="text-sm text-blue-700 dark:text-blue-300 grid grid-cols-1 md:grid-cols-2 gap-2">
              <div>• <code># Header 1</code> - Main heading</div>
              <div>• <code>**bold**</code> - Bold text</div>
              <div>• <code>*italic*</code> - Italic text</div>
              <div>• <code>`code`</code> - Inline code</div>
              <div>• <code>[link](url)</code> - Links</div>
              <div>• <code>- item</code> - List items</div>
              <div>• <code>&gt; quote</code> - Blockquotes</div>
              <div>• <code>```code```</code> - Code blocks</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};