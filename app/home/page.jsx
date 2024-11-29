'use client'

import { useState, useEffect } from 'react'

/* eslint-disable @next/next/no-img-element */


export default function Home() {
  const [popularFoods, setPopularFoods] = useState([]);
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    fetch("https://apifakedelivery.vercel.app/foods")
      .then((response) => response.json())
      .then((data) => setPopularFoods(data));
    fetch("https://apifakedelivery.vercel.app/restaurants")
      .then((response) => response.json())
      .then((data) => setRestaurants(data));
  }, []);

  return (
    <div className="bg-red-700 min-h-screen w-full">
      {/* Header */}
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
      <main className="md:mt-32 mt-28 pb-12 rounded-t-3xl bg-orange-100 px-4">
        {/* Promotional Sections */}
        <section className="mb-6 flex flex-col md:items-center pt-8">
          <h2 className="text-2xl font-bold mb-3">Famosos no GustoGo</h2>
          <div className="flex space-x-4 md:justify-center overflow-x-auto pb-2">
            {popularFoods.slice(0, 4).map((food) => (
              <a href={`/prato/${food.id}`} key={food.id} className="min-w-[150px] h-[180px] bg-white hover:bg-gray-50 transition rounded-lg shadow-md flex flex-col">
                <img
                  src={food.image}
                  alt={food.name}
                  className="h-[100px] w-full object-cover rounded-t-lg"
                />
                <div className="p-2">
                  <h3 className="text-sm font-semibold">{food.name}</h3>
                  <div className="flex items-center mt-1">
                    <span className="text-yellow-400 text-xs">★ {food.rating}</span>
                    <span className="text-gray-400 text-xs ml-2">{food.time}</span>
                  </div>
                  <span className="text-green-600 text-sm">R$ {food.price.toFixed(2)}</span>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Special Offers */}
        <section className="mb-6 flex flex-col md:items-center">
          <h2 className="text-2xl font-bold mb-3">Ofertas Especiais</h2>
          <div className="flex md:justify-center space-x-4 overflow-x-auto pb-2">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="min-w-[200px] h-[120px] bg-white rounded-lg shadow-md flex items-center justify-center">
                <img src="promo.png" className="h-full w-full" alt="" />
              </div>
            ))}
          </div>
        </section>

        {/* Restaurant List */}
        <section className='flex flex-col md:items-center'>
          <h2 className="text-2xl font-bold mb-3">Restaurantes</h2>
          <div className="space-y-3">
            {restaurants.map((restaurant) => (
              <a href={`/restaurante/${restaurant.id}`} key={restaurant.id} className="bg-white hover:bg-gray-50 hover:scale-105 transition p-4 rounded-lg shadow-md flex items-center">
                <div className="w-16 h-16 rounded-lg mr-4 overflow-hidden">
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{restaurant.name}</h3>
                  <p className="text-sm text-gray-500">{restaurant.description}</p>
                  <div className="flex items-center mt-1">
                    <span className="text-yellow-400 text-sm">★ {restaurant.rating}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}