import React, { useState } from 'react';
import { Download, Youtube, Image as ImageIcon, ExternalLink } from 'lucide-react';

export const YouTubeThumbnailDownloader: React.FC = () => {
  const [url, setUrl] = useState('');
  const [videoId, setVideoId] = useState('');
  const [thumbnails, setThumbnails] = useState<Array<{
    quality: string;
    url: string;
    size: string;
  }>>([]);

  const extractVideoId = (url: string) => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /youtube\.com\/v\/([^&\n?#]+)/,
      /youtube\.com\/shorts\/([^&\n?#]+)/
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) {
        return match[1];
      }
    }
    return null;
  };

  const generateThumbnails = (videoId: string) => {
    const baseUrl = `https://img.youtube.com/vi/${videoId}`;
    
    return [
      {
        quality: 'Maximum Resolution',
        url: `${baseUrl}/maxresdefault.jpg`,
        size: '1280x720'
      },
      {
        quality: 'Standard Definition',
        url: `${baseUrl}/sddefault.jpg`,
        size: '640x480'
      },
      {
        quality: 'High Quality',
        url: `${baseUrl}/hqdefault.jpg`,
        size: '480x360'
      },
      {
        quality: 'Medium Quality',
        url: `${baseUrl}/mqdefault.jpg`,
        size: '320x180'
      },
      {
        quality: 'Default',
        url: `${baseUrl}/default.jpg`,
        size: '120x90'
      }
    ];
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const extractedId = extractVideoId(url);
    if (extractedId) {
      setVideoId(extractedId);
      setThumbnails(generateThumbnails(extractedId));
    } else {
      setVideoId('');
      setThumbnails([]);
    }
  };

  const downloadThumbnail = async (thumbnailUrl: string, quality: string) => {
    try {
      const response = await fetch(thumbnailUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `youtube-thumbnail-${videoId}-${quality.toLowerCase().replace(/\s+/g, '-')}.jpg`;
      link.click();
      
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  const downloadAll = async () => {
    for (const thumbnail of thumbnails) {
      await downloadThumbnail(thumbnail.url, thumbnail.quality);
      // Add small delay between downloads
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">YouTube Thumbnail Downloader</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Download HD/SD thumbnails from any YouTube video URL
          </p>
        </div>
        
        <div className="p-6 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                YouTube Video URL
              </label>
              <div className="flex space-x-3">
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                />
                <button
                  type="submit"
                  disabled={!url.trim()}
                  className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white rounded-lg transition-colors"
                >
                  <Youtube className="h-4 w-4" />
                  <span>Get Thumbnails</span>
                </button>
              </div>
            </div>
          </form>

          {videoId && !extractVideoId(url) && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-red-600 dark:text-red-400 text-sm">
                Invalid YouTube URL. Please enter a valid YouTube video URL.
              </p>
            </div>
          )}

          {thumbnails.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Available Thumbnails
                </h3>
                <button
                  onClick={downloadAll}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                >
                  <Download className="h-4 w-4" />
                  <span>Download All</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {thumbnails.map((thumbnail, index) => (
                  <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <div className="aspect-video bg-gray-200 dark:bg-gray-600 rounded-lg mb-3 overflow-hidden">
                      <img
                        src={thumbnail.url}
                        alt={`${thumbnail.quality} thumbnail`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          target.nextElementSibling?.classList.remove('hidden');
                        }}
                      />
                      <div className="hidden flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
                        <ImageIcon className="h-8 w-8" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {thumbnail.quality}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {thumbnail.size}
                      </p>
                      
                      <div className="flex space-x-2">
                        <button
                          onClick={() => downloadThumbnail(thumbnail.url, thumbnail.quality)}
                          className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm"
                        >
                          <Download className="h-3 w-3" />
                          <span>Download</span>
                        </button>
                        
                        <a
                          href={thumbnail.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center px-3 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                        >
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">Supported URLs</h4>
            <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
              <li>• https://www.youtube.com/watch?v=VIDEO_ID</li>
              <li>• https://youtu.be/VIDEO_ID</li>
              <li>• https://www.youtube.com/embed/VIDEO_ID</li>
              <li>• https://www.youtube.com/shorts/VIDEO_ID</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};