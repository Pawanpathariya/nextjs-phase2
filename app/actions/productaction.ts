'use server';

import {prisma} from '../../lib/prisma';
import axios from 'axios';
export async function Productaction(prevState: any, formData: FormData) {
    const name = formData.get('name') as string;
    const price = formData.get('price') as string;
    const description = formData.get('description') as string;
    const sameDayStr = formData.get('sameDayDelivery');
  const sameDay: boolean = sameDayStr === 'true';
    const category = formData.get('category') as string;
    const type = formData.get('type') as string;
    const id = parseInt(formData.get('id') as string, 10);
    console.log(id);
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
       await prisma.productCate.create({
            data: {
                proCategory : category,
                proName: name,
                proPrice  : price,
                proDescription : description,
                sameDay    : sameDay,
                type           : type,
                proImage       : ImageUrl,
                VendorId      : id
            },
        });
        return { success: true };
    } catch (error) {
        console.error('Error creating product:', error);
        return { error: 'Failed to create product' };
    }
}
