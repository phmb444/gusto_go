

export default function Landing() {
  return (
    <div className="bg-red-600 flex text-white flex-col items-center justify-center w-screen h-screen">
      <img src="logo.png" className="mb-8" alt="" />
      <h1 className="text-xl text-center"><strong>Sabores da Itália, <br/> entregues à sua porta</strong></h1>
      <p className="text-center mt-4">O seu delivery de comida italiana favorito,<br /> sempre pronto para satisfazer seus, <br /><strong>desejosgastronômicos</strong></p>
      <a href="/home">
      <button className="w-60 mt-12 h-12 text-black text-bold flex items-center justify-around rounded-lg bg-white">Entrar
        <img src="Arrow.png" alt="" />
      </button>
      </a>
    </div>
  );
}
