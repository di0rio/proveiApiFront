import React from "react";
import { Star, Clock, Trophy, Heart } from "lucide-react";

const Home = () => {
  const features = [
    {
      icon: <Star className="text-yellow-500" size={24} />,
      title: "Produtos Artesanais",
      description:
        "Pães e doces feitos diariamente com ingredientes selecionados",
    },
    {
      icon: <Clock className="text-blue-500" size={24} />,
      title: "Sempre Fresquinho",
      description: "Fornadas durante todo o dia para garantir a qualidade",
    },
    {
      icon: <Trophy className="text-yellow-600" size={24} />,
      title: "Premiada",
      description: "Reconhecida como melhor padaria da região",
    },
    {
      icon: <Heart className="text-red-500" size={24} />,
      title: "Receitas Especiais",
      description: "Tradição familiar passada por gerações",
    },
  ];

  const products = [
    {
      name: "Pão Francês",
      price: "R$ 0,75",
      // image: "../assets/paofrancesfolhado.jpg"
    },
    {
      name: "Croissant",
      price: "R$ 5,50",
      // image: "/api/placeholder/200/200"
    },
    {
      name: "Bolo de Chocolate",
      price: "R$ 45,00",
      // image: "/api/placeholder/200/200"
    },
    {
      name: "Pão de Queijo",
      price: "R$ 4,50",
      // image: "/api/placeholder/200/200"
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <section className="relative h-96 bg-amber-50 flex items-center justify-center mb-12">
        <div className="text-center p-8">
          <h1 className="text-4xl font-bold text-amber-800 mb-4">
            Padaria Sabor & Tradição
          </h1>
          <p className="text-xl text-amber-700 mb-8">
            Desde 1995 trazendo o melhor da panificação artesanal
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 mb-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-amber-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Nossos Produtos Mais Amados
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold mb-2">{product.name}</h3>
                  <p className="text-amber-600 font-bold">{product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-amber-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Faça sua encomenda</h2>
          <p className="mb-8 text-amber-100">
            Aceitamos encomendas para festas e eventos especiais
          </p>
          <button className="bg-white text-amber-800 px-8 py-3 rounded-full hover:bg-amber-100 transition-colors">
            Entre em Contato
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
