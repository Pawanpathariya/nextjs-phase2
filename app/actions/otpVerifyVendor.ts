'use server';

import nodemailer from 'nodemailer';

import {prisma} from '../../lib/prisma'
export async function sendOtp(email: string, password: string) {
  try {
    const user = await prisma.vendor.findFirst({ where: { email } });

    if (!user) {
      return { error: 'User not found' };
    }
    if (user.password !== password) {
      return { error: 'Incorrect password' };
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your OTP for login',
      text: `Your OTP is ${otp}`,
    };

    await transporter.sendMail(mailOptions);


    return { success: true, otp ,user}; 
  } catch (err) {
    console.error('Failed to send OTP:', err);
    return { error: 'Failed to send OTP' };
  }
}
