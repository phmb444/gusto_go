/* eslint-disable @next/next/no-img-element */
'use client'

import { useEffect, useState } from 'react';

const fetchData = async (id) => {
    const res = await fetch(`https://apifakedelivery.vercel.app/foods/${id}`);
    const data = await res.json();
    return data;
};

export default function Prato({ params }) {
    const [prato, setPrato] = useState(null);
    const [observacao, setObservacao] = useState('');

    useEffect(() => {
        const id = params?.id;
        if (id) {
            fetchData(id).then((data) => setPrato(data));
        }
    }, [params]);

    if (!prato) return <p>Loading...</p>;

    return (
        <div className="min-h-screen bg-orange-red-700 flex flex-col">
            {/* Header permanece o mesmo */}
            <header className="bg-red-700 text-white p-4 fixed top-0 w-full z-10">
                <div className="container mx-auto">
                    <span className="text-yellow-300 text-xs font-light mb-2 block">R. Guilherme Lahn, 123</span>
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex-1">
                            <input
                                type="text"
                                placeholder="Busque por item ou loja"
                                className="w-full max-w-md p-2 h-[30px] md:h-[40px] rounded-full border focus:outline-none focus:ring-2 focus:ring-red-500"
                            />
                        </div>
                        <a href="/home">
                            <img
                                src="/logo.png"
                                alt="GustoGo Logo"
                                className="h-8 md:h-12 w-auto"
                            />
                        </a>
                    </div>
                </div>
            </header>

            {/* Main content */}
            <main className="container mx-auto px-4 md:h-full md:px-6 rounded-t-3xl lg:px-8 bg-orange-100 w-full mt-28 md:mt-32 flex-grow">
                <div className="max-w-4xl mx-auto p-6">
                    <h1 className="font-bold text-2xl md:mt-20 md:text-4xl text-center mb-6">{prato.name}</h1>
                    <div className="flex flex-col md:items-center md:flex-row gap-8 items-start">
                        <div className="md:w-1/2">
                            <img 
                                src={prato.image} 
                                alt={prato.name} 
                                className="w-full rounded-lg shadow-md hover:shadow-xl transition-shadow object-cover" 
                            />
                        </div>
                        
                        <div className="md:w-1/2 space-y-4">
                            <p className="text-green-600 text-2xl md:text-3xl font-bold">
                                R${prato.price.toFixed(2)}
                            </p>
                            <p className="text-gray-700 text-lg">{prato.description}</p>
                            <div className="space-y-2 text-gray-600">
                                <p className="flex items-center gap-2">
                                    <span className="font-medium">Tempo de entrega:</span> {prato.time}
                                </p>
                                <p className="flex items-center gap-2">
                                    <span className="font-medium">Custo de entrega:</span> R${prato.delivery.toFixed(2)}
                                </p>
                            </div>

                            <div className="mt-6">
                                <label htmlFor="observacoes" className="block text-gray-700 font-medium mb-2">
                                    Observações do pedido
                                </label>
                                <textarea
                                    id="observacoes"
                                    rows="4"
                                    value={observacao}
                                    onChange={(e) => setObservacao(e.target.value)}
                                    placeholder="Ex: Sem cebola, bem passado..."
                                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none resize-none"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Adicionar ao carrinho dentro do Main */}
                    <div className="mt-6 md:mt-20">
                        <button className="bg-red-600 text-white font-bold py-4 px-6 rounded-lg w-full md:w-1/2 mx-auto block hover:bg-red-700 transition-colors">
                            Adicionar ao carrinho
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}
