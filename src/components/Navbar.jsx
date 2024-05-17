import React from 'react'

const Navbar = () => {
  return (
    <nav className="bg-cyan-900">
        <div className="pmcontainer px-5 flex justify-between items-center py-5 text-white">
            <div className="logo font-bold text-xl">
                <span className="text-cyan-400">&lt;</span>Pass<span className="text-cyan-400">Man</span><span className="text-cyan-400"> /&gt;</span>
            </div>
            <ul>
                <li className="flex gap-5">
                    <a href="/">Home</a>
                    <a href="#">About</a>
                    <a href="#">Contact</a>
                </li>
            </ul>
        </div>
    </nav>
  )
}

export default Navbar