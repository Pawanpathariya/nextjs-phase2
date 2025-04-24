'use server';

import {prisma} from '../../lib/prisma';

export async function SameDayDelivery() {
  console.log("Fetching all products");
  try {
    const products = await prisma.productCate.findMany({
      where: {
        sameDay: true,
      },
    });
    return { success: true, products };
  } catch (error) {
    console.error('Error fetching products:', error);
    return { error: 'Failed to fetch products' };
  }
}


export async function Flowers() {
  console.log("Fetching all products");
  try {
    const products = await prisma.productCate.findMany({
      where: {
        proCategory:'flower'
      },
    });
    return { success: true, products };
  } catch (error) {
    console.error('Error fetching products:', error);
    return { error: 'Failed to fetch products' };
  }
}