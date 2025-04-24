'use server';

import {prisma} from '../../lib/prisma'
import axios from 'axios';
export async function addCategory(prevState: any, formData: FormData) {
    const category = formData.get('category') as string;
    const image = formData.get('image') as File | null;
    if (image) {
        const formData1 = new FormData();
        formData1.append('file', image);
        formData1.append('upload_preset', "pawan_cloud"); 
        try {
            formData.append('cloud_name','dbwpnzi57');
            const api='https://api.cloudinary.com/v1_1/dbwpnzi57/image/upload';
            const response = await axios.post(api, formData1);
             var ImageUrl=response.data.url;
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    }

     console.log(ImageUrl)
    
    try {
       await prisma.category.create({
            data: {
               cat :category ,
               Image : ImageUrl
            },
        });
        return { success: true };
    } catch (error) {
        console.error('Error creating product:', error);
        return { error: 'Failed to create product' };
    }
}



export async function getCategory() {
    console.log("Fetching all category");
    try {
      const categorys = await prisma.category.findMany();
      return { success: true, categorys };
    } catch (error) {
      console.error('Error fetching categorys:', error);
      return { error: 'Failed to fetch categorys' };
    }
  }
  

  export async function DeleteCategory(id) {
    console.log(id);
    try {
      const user = await prisma.category.delete({where : {id}});
      console.log(user);
      return { success: true, user };
    } catch (error) {
      console.error('Error fetching user:', error);
      return { error: 'Failed to fetch user' };
    }
  }