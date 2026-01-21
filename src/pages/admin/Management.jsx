import React from 'react'

const Management = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-black">
      <div className="bg-white rounded-xl p-4 border border-gray-200">
        <div className="text-sm font-medium mb-3">Create Copy (Static)</div>
        <div className="space-y-3 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block mb-1">Copier Login</label>
              <input className="w-full rounded-md bg-white border border-gray-300 px-3 py-2" placeholder="e.g. 329481" />
            </div>
            <div>
              <label className="block mb-1">Master</label>
              <select className="w-full rounded-md bg-white border border-gray-300 px-3 py-2">
                <option>Quant Copy</option>
                <option>ZenTrader</option>
                <option>TechEdge</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block mb-1">Allocation</label>
              <select className="w-full rounded-md bg-white border border-gray-300 px-3 py-2">
                <option>Proportionally to Equity</option>
                <option>Fixed Lot</option>
                <option>Risk-based</option>
              </select>
            </div>
            <div>
              <label className="block mb-1">Ratio</label>
              <input className="w-full rounded-md bg-white border border-gray-300 px-3 py-2" placeholder="1.0" />
            </div>
            <div>
              <label className="block mb-1">Max Risk</label>
              <input className="w-full rounded-md bg-white border border-gray-300 px-3 py-2" placeholder="5%" />
            </div>
          </div>
          <button className="px-4 py-2 bg-gray-200 text-black rounded-md cursor-not-allowed">Create (disabled)</button>
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 border border-gray-200">
        <div className="text-sm font-medium mb-3">Manage Copies</div>
        <div className="space-y-2 text-xs">
          {[
            { id: 'COP-11293', status: 'Active', master: 'Quant Copy' },
            { id: 'COP-10311', status: 'Paused', master: 'FX Momentum' },
          ].map((c) => (
            <div key={c.id} className="flex items-center justify-between border border-gray-200 rounded-md p-2">
              <div>
                <div className="font-medium">{c.id}</div>
                <div className="">{c.master} • {c.status}</div>
              </div>
              <div className="space-x-2">
                <button className="px-3 py-1 rounded bg-gray-200 text-black cursor-not-allowed">Pause</button>
                <button className="px-3 py-1 rounded bg-gray-200 text-black cursor-not-allowed">Resume</button>
                <button className="px-3 py-1 rounded bg-gray-200 text-black cursor-not-allowed">Remove</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Management