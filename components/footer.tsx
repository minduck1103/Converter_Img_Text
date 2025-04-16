import Link from "next/link"
import { ImageIcon } from "lucide-react"

export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 bg-white py-12">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4 lg:grid-cols-5">
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2">
              <ImageIcon className="h-6 w-6 text-blue-600" />
              <span className="text-xl font-bold text-blue-600">ImageToText</span>
            </div>
            <p className="mt-2 text-sm text-gray-600">
              Convert images to text with high accuracy using our advanced AI technology.
            </p>
            <div className="mt-4 flex space-x-4">
              {["Twitter", "Facebook", "Instagram", "LinkedIn"].map((social, i) => (
                <Link key={i} href="#" className="text-gray-500 hover:text-blue-600">
                  <span className="sr-only">{social}</span>
                  <div className="h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center">
                    <span className="text-xs">{social.charAt(0)}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-900">Product</h3>
            <ul className="mt-4 space-y-2">
              {["Features", "Pricing", "API", "Integrations", "Documentation"].map((item, i) => (
                <li key={i}>
                  <Link href="#" className="text-sm text-gray-600 hover:text-blue-600">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-900">Company</h3>
            <ul className="mt-4 space-y-2">
              {["About", "Blog", "Careers", "Press", "Contact"].map((item, i) => (
                <li key={i}>
                  <Link href="#" className="text-sm text-gray-600 hover:text-blue-600">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-900">Legal</h3>
            <ul className="mt-4 space-y-2">
              {["Terms", "Privacy", "Cookies", "Licenses", "Settings"].map((item, i) => (
                <li key={i}>
                  <Link href="#" className="text-sm text-gray-600 hover:text-blue-600">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-gray-200 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-gray-600">&copy; {new Date().getFullYear()} ImageToText. Product created by MinhDuc.</p>
          <div className="mt-4 md:mt-0">
            <select className="text-xs text-gray-600 bg-transparent border-gray-200 rounded-md">
              <option value="vi">Vietnamese</option>
              <option value="en">English</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
            </select>
          </div>
        </div>
      </div>
    </footer>
  )
}
