import React from 'react'
import Link from 'next/link'

function Footer() {
  return (
    <div className="w-full border-t border-gray-200 dark:border-gray-700 py-6">
      <div className="max-w-7xl mx-auto flex items-center justify-center p-4">
        <p className="text-gray-600 dark:text-gray-300">
          Made with ❤️ by{' '}
          <Link 
            href="https://x.com/abhinavstwt" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
          >
            @abhinavstwt
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Footer