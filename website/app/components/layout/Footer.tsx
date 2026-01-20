'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-surface text-gray-dark py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-bold mb-4">Signapse</h3>
            <p className="text-gray-medium mb-6 max-w-md">
              Units 56-58<br />
              Surrey Technology Centre<br />
              40 Occam Road, Guildford, Surrey<br />
              GU2 7YG
            </p>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Products</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/products/signstudio" className="text-gray-medium hover:text-primary transition-colors">
                  SignStudio Platform
                </Link>
              </li>
              <li>
                <Link href="/products/transport" className="text-gray-400 hover:text-white transition-colors">
                  Solution for Transport
                </Link>
              </li>
            </ul>
          </div>

          {/* Menu */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Menu</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/pricing" className="text-gray-medium hover:text-primary transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/use-cases" className="text-gray-medium hover:text-primary transition-colors">
                  Use cases
                </Link>
              </li>
              <li>
                <Link href="/white-papers" className="text-gray-medium hover:text-primary transition-colors">
                  White papers
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-medium hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-gray-medium hover:text-primary transition-colors">
                  News
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-medium hover:text-primary transition-colors">
                  About us
                </Link>
              </li>
              <li>
                <Link href="/partnership" className="text-gray-medium hover:text-primary transition-colors">
                  Partnership
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-gray-medium hover:text-primary transition-colors">
                  Join the Team
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-medium hover:text-primary transition-colors">
                  Contact us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-light pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-medium text-sm mb-4 md:mb-0">
              Copyright Signapse, Ltd. {new Date().getFullYear()} | Disclaimer: Not all videos are synthetic videos.
            </p>
            <div className="flex space-x-6">
              <Link href="/privacy" className="text-gray-medium hover:text-primary text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-medium hover:text-primary text-sm transition-colors">
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 