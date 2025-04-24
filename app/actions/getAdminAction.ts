'use server';

import {prisma} from '../../lib/prisma';

export async function getAdmin() {
  console.log("Fetching all admins");
  try {
    const admins = await prisma.admin.findMany();
    return { success: true, admins };
  } catch (error) {
    console.error('Error fetching admins:', error);
    return { error: 'Failed to fetch admins' };
  }
}

export async function DeleteAdmin(id) {
    console.log(id);
    try {
      const user = await prisma.admin.delete({where : {id}});
      console.log(user);
      return { success: true, user };
    } catch (error) {
      console.error('Error fetching user:', error);
      return { error: 'Failed to fetch user' };
    }
  }