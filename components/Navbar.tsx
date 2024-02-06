import Link from "next/link"

function Navbar() {
  return (
    <nav className="bg-[#272727]">
      <div className="wrapper py-4">
        <Link
          href="/"
          className="text-primary text-3xl font-semibold select-none uppercase"
        >
          Movie-RATING
        </Link>
      </div>
    </nav>
  )
}

export default Navbar
