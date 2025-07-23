import { NextResponse } from 'next/server';

export async function POST(request) {
  const { searchParams } = new URL(request.url);
  const teacherId = searchParams.get('teacherId');
  const formData = await request.formData();
  
  try {
    const response = await fetch(`http://elearning1.runasp.net/api/Teacher/AddCourse/${teacherId}`, {
      method: 'POST',
      headers: {
        'Authorization': request.headers.get('Authorization') || ''
      },
      body: formData
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}