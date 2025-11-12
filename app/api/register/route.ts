// app/api/register/route.ts
import { NextResponse } from 'next/server'

// Array en memoria (se guarda mientras el servidor no se reinicie)
let todosLosRegistros: Array<{
  email: string
  password: string
  fecha: string
  ip?: string
}> = []

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    // Validar que vengan datos
    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email y password requeridos' },
        { status: 400 }
      )
    }

    // Guardar en memoria
    const nuevoRegistro = {
      email,
      password,
      fecha: new Date().toLocaleString('es-ES'),
      ip: request.headers.get('x-forwarded-for') || 'unknown'
    }

    todosLosRegistros.push(nuevoRegistro)

    console.log('📝 REGISTRO GUARDADO:', {
      email: nuevoRegistro.email,
      password: nuevoRegistro.password,
      fecha: nuevoRegistro.fecha
    })

    return NextResponse.json({ 
      success: true, 
      message: 'Usuario registrado exitosamente',
      totalRegistros: todosLosRegistros.length
    })

  } catch (error) {
    console.error('❌ Error en registro:', error)
    return NextResponse.json(
      { success: false, error: 'Error en el servidor' },
      { status: 500 }
    )
  }
}

// GET para ver los registros
export async function GET() {
  return NextResponse.json({
    success: true,
    registros: todosLosRegistros,
    total: todosLosRegistros.length
  })
}