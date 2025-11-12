// app/api/register/route.ts
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    // Simplemente muestra en consola (más rápido)
    console.log('📧 NUEVO REGISTRO:')
    console.log('Email:', email)
    console.log('Password:', password)
    console.log('Fecha:', new Date().toLocaleString())
    console.log('---')

    return NextResponse.json({
      success: true,
      message: 'Usuario registrado exitosamente',
      user: { email }
    })

  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Error en el servidor' },
      { status: 500 }
    )
  }
}