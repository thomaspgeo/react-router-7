import { Link, Outlet } from "react-router";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto p-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur z-10 border-b">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link to="/" className="font-bold text-lg">
          RRv7 App
        </Link>
        <nav className="space-x-4">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link to="/about" className="hover:underline">
            About Us
          </Link>
          <Link to="/contact" className="hover:underline">
            Contact
          </Link>
          <Link to="/dashboard" className="hover:underline">
            Dashboard
          </Link>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t mt-8 bg-white/90">
      <div className="container mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <h4 className="font-semibold mb-2">About</h4>
          <p className="text-sm text-gray-600">
            A demo app showcasing React Router v7 with TypeScript and Tailwind.
          </p>
        </div>

        <div className="flex gap-6">
          <div>
            <h4 className="font-semibold mb-2">Company</h4>
            <ul className="space-y-1 text-sm">
              <li>
                <a href="#" className="hover:underline">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Careers
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Support</h4>
            <ul className="space-y-1 text-sm">
              <li>
                <a href="#" className="hover:underline">
                  Help
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Docs
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Stay up to date</h4>
          <p className="text-sm text-gray-600 mb-2">
            Subscribe to our newsletter for updates.
          </p>
          <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
            <input
              aria-label="Email address"
              type="email"
              placeholder="you@example.com"
              className="flex-1 px-3 py-2 border rounded"
            />
            <button className="px-3 py-2 bg-blue-600 text-white rounded">
              Subscribe
            </button>
          </form>
        </div>
      </div>
      <div className="border-t mt-4">
        <div className="container mx-auto p-4 text-sm text-center text-gray-600">
          © {new Date().getFullYear()} RRv7 Demo
        </div>
      </div>
    </footer>
  );
}
