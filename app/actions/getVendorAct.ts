'use server';

import {prisma} from '../../lib/prisma';

export async function getVendorAdmin() {
  console.log("Fetching all vendors");
  try {
    const vendors = await prisma.vendor.findMany();
    return { success: true, vendors };
  } catch (error) {
    console.error('Error fetching vendors:', error);
    return { error: 'Failed to fetch vendors' };
  }
}

