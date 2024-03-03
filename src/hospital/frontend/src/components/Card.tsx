function Card() {
  return (
      <div className="relative flex flex-col rounded-lg bg-white break-words shadow-xl mt-5 mb-4">
          <div className="flex justify-between px-6 pt-6 mb-2">
              <h4 className="text-lg font-bold mb-3"> Title here </h4>
              <button className="flex py-2 px-4 bg-transparent text-sky-600 font-semibold border border-sky-600 rounded hover:bg-sky-400 hover:text-white hover:border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0"
                  data-toggle="modal" data-target="#import">
                  <img src="/assets/img/icons/add.svg" />
                      <span className="ms-2">Nouveau</span>
              </button>

          </div>
          <div className="block w-full overflow-auto scrolling-touch px-6">
              <table className="w-full max-w-full mb-4 bg-transparent">
                  <thead className="text-gray-700">
                      <tr>
                          <th className="pe-4 py-3 text-left"> # </th>
                          <th className="py-3 text-left"> Column 1 </th>
                          <th className="py-3 text-left"> Column 2 </th>
                          <th className="py-3 text-left"> Column 3 </th>
                          <th className="py-3 text-left"> Column 4 </th>
                          <th className="py-3 text-left"> Column 5 </th>
                          <th className="py-3 text-left"></th>
                      </tr>
                  </thead>
                  <tbody className="text-gray-600">
                      <tr>
                          <td>1</td>
                          <td>NADIL</td>
                          <td>Marwa</td>
                          <td>21ans</td>
                          <td>jcpo</td>
                          <td>test</td>
                          <td className="py-3 text-right flex justify-center gap-2">
                              <div className="w-4 transform text-green-500 hover:text-green-700 hover:scale-110">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z">
                                      </path>
                                  </svg>
                              </div>
                              <div className="w-4 transform text-yellow-500 hover:text-yellow-700 hover:scale-110">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z">
                                      </path>
                                  </svg>
                              </div>
                              <div className="w-4 transform text-red-500 hover:text-red-700 hover:scale-110">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
                                      </path>
                                  </svg>
                              </div>
                          </td>
                      </tr>
                  </tbody>
              </table>
          </div>
      </div>
  )
}

export default Card