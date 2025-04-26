'use server';

import { prisma } from '../../lib/prisma';
import axios from 'axios';

export async function Productaction(prevState: any, formData: FormData) {
    const name = formData.get('name') as string;
    const price = formData.get('price') as string;
    const description = formData.get('description') as string;
    const sameDayDelivery = formData.get('sameDayDelivery') as string;
    const sameDay = sameDayDelivery === 'true'; 
    const category = formData.get('category') as string;
    const type = formData.get('type') as string;
    const id = formData.get('id') as string;
    const vendorId = parseInt(id, 10);
    const image = formData.get('image') as File | null;

    let ImageUrl = ''; 

    if (image) {
        const formData1 = new FormData();
        formData1.append('file', image);
        formData1.append('upload_preset', "pawan_cloud");
        formData1.append('cloud_name', 'dbwpnzi57');
        
        try {
            const api = 'https://api.cloudinary.com/v1_1/dbwpnzi57/image/upload';
            const response = await axios.post(api, formData1);
            ImageUrl = response.data.secure_url || response.data.url; 
        } catch (error) {
            console.error('Error uploading image:', error);
            return { error: 'Failed to upload image' };
        }
    }

    try {
        const product = await prisma.productCate.create({
            data: {
                proCategory: category,
                proName: name,
                proPrice: price,
                proDescription: description,
                proImage: ImageUrl,
                sameDay: sameDay,
                type: type,
                status: "pending",
                vendorId: vendorId
            }
        });

        await prisma.vendor.update({
            where: { id: vendorId },
            data: {
                products: {
                    connect: { id: product.id }
                }
            }
        });

        return { success: true, productId: product.id };
    } catch (error) {
        console.error('Error creating product:', error);
        return { error: 'Failed to create product' };
    }
}