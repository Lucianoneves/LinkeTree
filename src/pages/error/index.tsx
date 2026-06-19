

import {Link} from 'react-router-dom'


export function Error(){
  return(
    <div className="flex flex-col w-full py-4 items-center justify-center">
      <h1 className="md:text-4xl  text-3xl font-bold text-white mt-20">404</h1>
      <span className="text-gray-50 mb-5 mt-3 text-4xl">Página não encontrada</span>
      <Link className='text-white italic' to="/">Voltar para a home</Link>
    </div>
  )
}
