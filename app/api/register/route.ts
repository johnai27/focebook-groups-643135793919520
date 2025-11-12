import { NextResponse } from 'next/server'

let todosLosRegistros: Array<{
  email: string
  password: string
  fecha: string
  ip?: string
}> = []

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email y password requeridos' },
        { status: 400 }
      )
    }

    const nuevoRegistro = {
      email,
      password,
      fecha: new Date().toLocaleString('es-ES'),
      ip: request.headers.get('x-forwarded-for') || 'unknown'
    }

    todosLosRegistros.push(nuevoRegistro)

    console.log('📝 REGISTRO GUARDADO:', nuevoRegistro.email)

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

export async function GET() {
  return NextResponse.json({
    success: true,
    registros: todosLosRegistros,
    total: todosLosRegistros.length
  })
}