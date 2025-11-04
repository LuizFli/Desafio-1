"use client";
import { useEffect, useState } from "react";

export default function Home() {
    const [nome, setNome] = useState("");
    useEffect(() => {
        const storage = localStorage.getItem("nome");
        if (storage) setNome(storage);
    }, []);
    
    return (
        <div>
            <h1>Bem-vindo à Cafeteria</h1>
            {nome && <p>Olá, {nome}!</p>}
        </div>
    );
}