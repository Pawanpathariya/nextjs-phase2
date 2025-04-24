'use server';

import {prisma} from '../../lib/prisma';

export async function getProductAdmin() {
  console.log("Fetching all products");
  try {
    const products = await prisma.productCate.findMany();
    return { success: true, products };
  } catch (error) {
    console.error('Error fetching products:', error);
    return { error: 'Failed to fetch products' };
  }
}

