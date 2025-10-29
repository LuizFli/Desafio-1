"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export default function Estoque() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ name: "", description: "", price: "", quantity: "" });
  const router = useRouter();

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/api/products`);
      setProducts(res.data || []);
    } catch (err) {
      console.error("Failed to fetch products", err);
      alert("Erro ao buscar produtos. Veja console.");
    } finally {
      setLoading(false);
    }
  }

  function startEdit(p) {
    setEditingId(p.id);
    setForm({ name: p.name || "", description: p.description || "", price: String(p.price || 0), quantity: String(p.quantity || 0) });
  }

  function cancelEdit() {
    setEditingId(null);
    setForm({ name: "", description: "", price: "", quantity: "" });
  }

  async function saveEdit() {
    try {
      await axios.put(`${API_URL}/api/products/${editingId}`, { name: form.name, description: form.description, price: Number(form.price), quantity: Number(form.quantity) });
      await fetchProducts();
      cancelEdit();
    } catch (err) {
      console.error(err);
      alert("Erro ao atualizar produto");
    }
  }

  async function deleteProduct(id) {
    if (!confirm("Deseja realmente excluir este produto?")) return;
    try {
      await axios.delete(`${API_URL}/api/products/${id}`);
      await fetchProducts();
    } catch (err) {
      console.error(err);
      alert("Erro ao deletar produto");
    }
  }

  return (
    <div className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Estoque</h2>
        <div>
          <button onClick={() => router.push('/home/cadProdutos')} className="mr-2 rounded bg-green-600 px-3 py-1 text-white">Novo Produto</button>
          <button onClick={fetchProducts} className="rounded bg-blue-600 px-3 py-1 text-white">Atualizar</button>
        </div>
      </div>

      {loading ? <div>Carregando...</div> : (
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-zinc-100 text-blue-900">
                <th className="border px-2 py-1 text-center align-middle">ID</th>
                <th className="border px-2 py-1 text-center align-middle">Nome</th>
                <th className="border px-2 py-1 text-center align-middle">Descrição</th>
                <th className="border px-2 py-1 text-center align-middle">Preço</th>
                <th className="border px-2 py-1 text-center align-middle">Quantidade</th>
                <th className="border px-2 py-1 text-center align-middle">Ações</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td className="border px-2 py-1 text-center align-middle">{p.id}</td>
                <td className="border px-2 py-1 text-center align-middle">
                  {editingId === p.id ? (
                      <input className="mx-auto block text-center" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                  ) : (<span className="block">{p.name}</span>)}
                </td>
                <td className="border px-2 py-1 text-center align-middle">
                  {editingId === p.id ? (
                      <input className="mx-auto block text-center" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
                  ) : (<span className="block">{p.description}</span>)}
                </td>
                <td className="border px-2 py-1 text-center align-middle">
                  {editingId === p.id ? (
                      <input className="mx-auto block text-center" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
                  ) : (<span className="block">{p.price}</span>)}
                </td>
                <td className="border px-2 py-1 text-center align-middle">
                  {editingId === p.id ? (
                      <input className="mx-auto block text-center" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} />
                  ) : (<span className="block">{p.quantity}</span>)}
                </td>
                <td className="border px-2 py-1 text-center align-middle">
                  {editingId === p.id ? (
                    <div className="flex items-center justify-center gap-2">
                      <button onClick={saveEdit} className="rounded bg-blue-600 px-2 py-1 text-white">Salvar</button>
                      <button onClick={cancelEdit} className="rounded bg-gray-400 px-2 py-1 text-white">Cancelar</button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <button onClick={() => startEdit(p)} className="rounded bg-yellow-500 px-2 py-1 text-white">Editar</button>
                      <button onClick={() => deleteProduct(p.id)} className="rounded bg-red-600 px-2 py-1 text-white">Excluir</button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
