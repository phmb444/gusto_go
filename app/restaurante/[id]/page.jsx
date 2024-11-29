/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */
'use client'
import React, { useEffect, useState } from 'react';

export default function RestaurantePage({ params }) {
    const { id } = params;
    const [restaurante, setRestaurante] = useState(null);
    const [pratos, setPratos] = useState([]);

    useEffect(() => {
        fetch(`https://apifakedelivery.vercel.app/restaurants/${id}`)
            .then(response => response.json())
            .then(data => setRestaurante(data));

        fetch('https://apifakedelivery.vercel.app/foods')
            .then(response => response.json())
            .then(data => {
                const pratosFiltrados = data.filter(prato => prato.restaurantId === id);
                setPratos(pratosFiltrados);
            });
    }, [id]);

    if (!restaurante) return <div>Loading...</div>;

    return (
        <div className="min-h-screen bg-orange-100 w-full">
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
            <section className="rounded-t-3xl bg-orange-100 md:mt-32 mt-28 flex items-center p-4 text-center">
                <img
                    src={restaurante.image}
                    alt={restaurante.name}
                    className="rounded-lg w-40"
                />
                <div className='text-left ml-12'>
                    <h1 className="text-2xl font-bold mt-3">{restaurante.name}</h1>
                    <p className="text-gray-600 mt-2">{restaurante.description}</p>
                    <span className="text-yellow-500">{restaurante.rating} ★</span>
                </div>

            </section>

            <section className="pt-6 bg-orange-100 px-4">
                <h2 className="text-xl font-bold mb-4">Pratos do Restaurante</h2>
                <ul className="space-y-4">
                    {pratos.map(prato => (
                        <li key={prato.id} className="flex rounded-xl bg-orange-100 hover:bg-orange-50 transition p-3">
                            <a href={`/prato/${prato.id}`}>
                            <img
                                src={prato.image}
                                alt={prato.name}
                                className="w-16 h-16 rounded-lg object-cover mr-3"
                            />
                            <div className="flex-1">
                                <h3 className="font-semibold">{prato.name}</h3>
                                <p className="text-gray-600 text-sm">{prato.description}</p>
                                <span className="text-green-600 font-medium">
                                    R${prato.price.toFixed(2)}
                                </span>
                            </div>
                            </a>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
}