import React from 'react'

const Settings = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-black">
      <div className="bg-white rounded-xl p-4 border border-gray-200">
        <div className="text-sm font-medium mb-3">MT5 Connection (Static)</div>
        <div className="space-y-3 text-xs">
          <div>
            <label className="block mb-1">Server</label>
            <input className="w-full rounded-md bg-white border border-gray-300 px-3 py-2" placeholder="e.g. MTS" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block mb-1">Login</label>
              <input className="w-full rounded-md bg-white border border-gray-300 px-3 py-2" placeholder="Login" />
            </div>
            <div>
              <label className="block mb-1">Password</label>
              <input type="password" className="w-full rounded-md bg-white border border-gray-300 px-3 py-2" placeholder="Password" />
            </div>
          </div>
          <div>
            <label className="block mb-1">API Key (optional)</label>
            <input className="w-full rounded-md bg-white border border-gray-300 px-3 py-2" placeholder="Key" />
          </div>
          <button className="px-4 py-2 bg-gray-200 text-black rounded-md cursor-not-allowed">Save (disabled)</button>
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 border border-gray-200">
        <div className="text-sm font-medium mb-3">Connection Status</div>
        <div className="text-xs space-y-2">
          <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-yellow-500" /> Pending (static preview)</div>
          <div className="">Configured server and credentials will be stored in MongoDB later.</div>
          <div className="">Local Postman MT5 endpoints will be wired once backend is ready.</div>
        </div>
      </div>
    </div>
  )
}

export default Settings