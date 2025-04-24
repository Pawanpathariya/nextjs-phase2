'use server';

import {prisma} from '../../lib/prisma';

export async function DeleteProduct(id) {
  console.log(id);
  try {
    const products = await prisma.productCate.delete({where : {id}});
    console.log(products);
    return { success: true, products };
  } catch (error) {
    console.error('Error fetching products:', error);
    return { error: 'Failed to fetch products' };
  }
}

