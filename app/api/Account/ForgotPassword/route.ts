import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const API_URL = process.env.API_BASE_URL || 'http://elearning1.runasp.net';
  
  try {
    const formData = await request.formData();
    const email = formData.get('email');

    if (!email || !email.toString().includes("@")) {
      return NextResponse.json(
        { message: "البريد الإلكتروني غير صحيح" },
        { status: 400 }
      );
    }

    // Forward the request to the actual API
    const response = await fetch(`${API_URL}/api/Account/ForgotPassword`, {
      method: 'POST',
      body: formData,
    });

    // Handle the response
    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || 'Failed to send reset link');
    }

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });

  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json(
      { message: "حدث خطأ في الخادم" },
      { status: 500 }
    );
  }
}