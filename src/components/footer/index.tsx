"use client"

export default function Footer() {
  const year = new Date().getFullYear() // ano atual

  return (
    <footer className="w-full border-t border-blue-800 bg-[rgb(15,35,95)] text-white">
      <div className="container mx-auto p-4 text-center">
        <p className="text-sm">
          &copy; {year} Colmeia.io. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  )
}
