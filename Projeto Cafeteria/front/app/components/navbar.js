import Link from "next/link";

const Navbar = () => {
  return (
    <nav aria-label="Main navigation">
      <ul className="space-y-1">

        <li>
          <Link
            href="/home"
            className="block rounded-md px-3 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            Home
          </Link>
        </li>
        
        <li>
          <Link
            href="/home/cadProdutos"
            className="block rounded-md px-3 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            Estoque
          </Link>
        </li>
        <li>
          <Link
            href="/home/estoque"
            className="block rounded-md px-3 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            Cadastrar Produtos
          </Link>
        </li>
        <li>
          <Link
            href="/"
            className="block rounded-md px-3 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            exit
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
