import { NextResponse } from 'next/server';
import { getCartId } from "@lib/data/cookies";

export async function GET() {
  try {
    const id = await getCartId();
    return NextResponse.json({ cartId: id });
  } catch (error) {
    console.error('Error retrieving cart ID:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve cart ID' },
      { status: 500 }
    );
  }
}