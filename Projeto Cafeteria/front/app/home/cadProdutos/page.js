"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export default function CadProdutos() {
  const [form, setForm] = useState({ name: "", description: "", price: "", quantity: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${API_URL}/api/products`, { name: form.name, description: form.description, price: Number(form.price), quantity: Number(form.quantity) });
      alert('Produto criado com sucesso');
      router.push('/home/estoque');
    } catch (err) {
      console.error(err);
      alert('Erro ao criar produto');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6 max-w-lg">
      <h2 className="text-2xl font-bold mb-4">Cadastrar Produto</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input required placeholder="Nome" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="p-2 border rounded" />
        <input placeholder="Descrição" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="p-2 border rounded" />
        <input type="number" step="0.01" placeholder="Preço" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="p-2 border rounded" />
        <input type="number" placeholder="Quantidade" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} className="p-2 border rounded" />
        <div className="flex gap-2">
          <button type="submit" disabled={loading} className="rounded bg-green-600 px-4 py-2 text-white">{loading ? 'Salvando...' : 'Salvar'}</button>
          <button type="button" onClick={() => router.push('/home/estoque')} className="rounded bg-gray-400 px-4 py-2 text-white">Cancelar</button>
        </div>
      </form>
    </div>
  );
}
