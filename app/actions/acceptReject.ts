'use server';

import {prisma} from '../../lib/prisma';

export async function ChangeStatus({id,stat}) {
  console.log(id, stat);
  try {
    const updatedProduct = await prisma.productCate.update({
      where: { id },
      data: { status: stat },
    });
    console.log(updatedProduct);
    return { success: true, updatedProduct };
  } catch (error) {
    console.error('Error updating product status:', error);
    return { error: 'Failed to update product status' };
  }
}

