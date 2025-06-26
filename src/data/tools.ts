import { Tool, ToolCategory } from '../types/tool';
import { TextFormatter } from '../components/tools/TextFormatter';
import { ColorPicker } from '../components/tools/ColorPicker';
import { Calculator } from '../components/tools/Calculator';
import { QRCodeGenerator } from '../components/tools/QRCodeGenerator';
import { PasswordGenerator } from '../components/tools/PasswordGenerator';
import { UnitConverter } from '../components/tools/UnitConverter';
import { TextCounter } from '../components/tools/TextCounter';
import { Base64Encoder } from '../components/tools/Base64Encoder';
import { JSONFormatter } from '../components/tools/JSONFormatter';
import { RegexTester } from '../components/tools/RegexTester';
import { ImageEditor } from '../components/tools/ImageEditor';
import { PDFTools } from '../components/tools/PDFTools';
import { CSSGenerator } from '../components/tools/CSSGenerator';
import { HashGenerator } from '../components/tools/HashGenerator';
import { MarkdownEditor } from '../components/tools/MarkdownEditor';

// New tools
import { WebsiteUptimeChecker } from '../components/tools/WebsiteUptimeChecker';
import { YouTubeThumbnailDownloader } from '../components/tools/YouTubeThumbnailDownloader';
import { ColorPaletteExtractor } from '../components/tools/ColorPaletteExtractor';
import { CodeMinifier } from '../components/tools/CodeMinifier';
import { PasswordStrengthChecker } from '../components/tools/PasswordStrengthChecker';
import { BulkFileConverter } from '../components/tools/BulkFileConverter';
import { ResponsiveWebDesignTester } from '../components/tools/ResponsiveWebDesignTester';
import { InvoiceGenerator } from '../components/tools/InvoiceGenerator';
import { ImageOptimizerCompressor } from '../components/tools/ImageOptimizerCompressor';

export const toolCategories: ToolCategory[] = [
  {
    id: 'text',
    name: 'Text Tools',
    description: 'Text formatting, conversion, and analysis tools',
    icon: 'Type'
  },
  {
    id: 'image',
    name: 'Image Tools',
    description: 'Image editing and manipulation tools',
    icon: 'Image'
  },
  {
    id: 'developer',
    name: 'Developer Tools',
    description: 'Tools for developers and programmers',
    icon: 'Code'
  },
  {
    id: 'converter',
    name: 'Converters',
    description: 'Convert between different formats and units',
    icon: 'RefreshCw'
  },
  {
    id: 'utility',
    name: 'Utilities',
    description: 'General purpose utility tools',
    icon: 'Settings'
  },
  {
    id: 'web',
    name: 'Web Tools',
    description: 'Website analysis and web development tools',
    icon: 'Globe'
  },
  {
    id: 'business',
    name: 'Business Tools',
    description: 'Professional and business productivity tools',
    icon: 'Briefcase'
  }
];

export const tools: Tool[] = [
  // Free Tools
  {
    id: 'text-formatter',
    name: 'Text Formatter',
    description: 'Format and transform text in various ways',
    category: 'text',
    icon: 'Type',
    isPremium: false,
    component: TextFormatter
  },
  {
    id: 'color-picker',
    name: 'Color Picker',
    description: 'Pick colors and get color codes in different formats',
    category: 'utility',
    icon: 'Palette',
    isPremium: false,
    component: ColorPicker
  },
  {
    id: 'calculator',
    name: 'Calculator',
    description: 'Basic calculator for mathematical operations',
    category: 'utility',
    icon: 'Calculator',
    isPremium: false,
    component: Calculator
  },
  {
    id: 'qr-code-generator',
    name: 'QR Code Generator',
    description: 'Generate QR codes for text, URLs, and more',
    category: 'utility',
    icon: 'QrCode',
    isPremium: false,
    component: QRCodeGenerator
  },
  {
    id: 'password-generator',
    name: 'Password Generator',
    description: 'Generate secure passwords with customizable options',
    category: 'utility',
    icon: 'Key',
    isPremium: false,
    component: PasswordGenerator
  },
  {
    id: 'unit-converter',
    name: 'Unit Converter',
    description: 'Convert between different units of measurement',
    category: 'converter',
    icon: 'Scale',
    isPremium: false,
    component: UnitConverter
  },
  {
    id: 'text-counter',
    name: 'Text Counter',
    description: 'Count characters, words, and lines in text',
    category: 'text',
    icon: 'Hash',
    isPremium: false,
    component: TextCounter
  },
  {
    id: 'base64-encoder',
    name: 'Base64 Encoder/Decoder',
    description: 'Encode and decode Base64 strings',
    category: 'developer',
    icon: 'Binary',
    isPremium: false,
    component: Base64Encoder
  },
  {
    id: 'css-generator',
    name: 'CSS Generator',
    description: 'Generate CSS for gradients, shadows, and borders',
    category: 'developer',
    icon: 'Palette',
    isPremium: false,
    component: CSSGenerator
  },
  {
    id: 'hash-generator',
    name: 'Hash Generator',
    description: 'Generate MD5, SHA-1, SHA-256, and SHA-512 hashes',
    category: 'developer',
    icon: 'Hash',
    isPremium: false,
    component: HashGenerator
  },
  {
    id: 'markdown-editor',
    name: 'Markdown Editor',
    description: 'Write and preview Markdown with live rendering',
    category: 'text',
    icon: 'FileText',
    isPremium: false,
    component: MarkdownEditor
  },
  
  
  // New Free Tools
  {
    id: 'website-uptime-checker',
    name: 'Website Uptime Checker',
    description: 'Check if any website is currently online and view response time',
    category: 'web',
    icon: 'Globe',
    isPremium: false,
    component: WebsiteUptimeChecker
  },
  {
    id: 'youtube-thumbnail-downloader',
    name: 'YouTube Thumbnail Downloader',
    description: 'Download HD/SD thumbnails from any YouTube video URL',
    category: 'utility',
    icon: 'Download',
    isPremium: false,
    component: YouTubeThumbnailDownloader
  },
  {
    id: 'color-palette-extractor',
    name: 'Color Palette Extractor',
    description: 'Upload an image or paste a URL to extract dominant colors',
    category: 'image',
    icon: 'Palette',
    isPremium: false,
    component: ColorPaletteExtractor
  },
  {
    id: 'code-minifier',
    name: 'HTML / CSS / JS Minifier',
    description: 'Minify and compress your code instantly to improve performance',
    category: 'developer',
    icon: 'Code',
    isPremium: false,
    component: CodeMinifier
  },
  {
    id: 'password-strength-checker',
    name: 'Password Strength Checker',
    description: 'Analyze and visualize the strength of any password with suggestions',
    category: 'utility',
    icon: 'Shield',
    isPremium: false,
    component: PasswordStrengthChecker
  },
  
  // Premium Tools
  {
    id: 'json-formatter',
    name: 'JSON Formatter',
    description: 'Format, validate, and minify JSON data',
    category: 'developer',
    icon: 'Braces',
    isPremium: true,
    component: JSONFormatter
  },
  {
    id: 'regex-tester',
    name: 'Regex Tester',
    description: 'Test regular expressions with explanations',
    category: 'developer',
    icon: 'Search',
    isPremium: true,
    component: RegexTester
  },
  {
    id: 'image-editor',
    name: 'Image Editor',
    description: 'Advanced image editing and manipulation',
    category: 'image',
    icon: 'ImageIcon',
    isPremium: true,
    component: ImageEditor
  },
  {
    id: 'pdf-tools',
    name: 'PDF Tools',
    description: 'Merge, split, and compress PDF files',
    category: 'utility',
    icon: 'FileText',
    isPremium: true,
    component: PDFTools
  },
  
  // New Premium Tools
  {
    id: 'bulk-file-converter',
    name: 'Bulk File Converter',
    description: 'Convert multiple files at once; fast drag & drop interface',
    category: 'converter',
    icon: 'RefreshCw',
    isPremium: true,
    component: BulkFileConverter
  },
  {
    id: 'responsive-web-design-tester',
    name: 'Responsive Web Design Tester',
    description: 'Preview your site on multiple devices and screen sizes with export options',
    category: 'web',
    icon: 'Monitor',
    isPremium: true,
    component: ResponsiveWebDesignTester
  },
  
  {
    id: 'invoice-generator',
    name: 'Online Invoice Generator',
    description: 'Create branded invoices with itemization, taxes, and PDF/email export',
    category: 'business',
    icon: 'FileText',
    isPremium: true,
    component: InvoiceGenerator
  },
  {
    id: 'image-optimizer-compressor',
    name: 'Image Optimizer & Compressor',
    description: 'Compress and resize images in bulk, with zip export and drag-drop UI',
    category: 'image',
    icon: 'ImageIcon',
    isPremium: true,
    component: ImageOptimizerCompressor
  }
];