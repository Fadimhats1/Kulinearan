import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  try {
    if (req.method === 'POST') {
      const { username, password, email } = req.body;
      const isUsernameExist = await prisma.users.findFirst({
        where: { username },
      });
      const isEmailExist = await prisma.users.findFirst({ where: { email } });

      if (isUsernameExist)
        return res.status(409).json({ message: 'Username sudah digunakan' });

      if (isEmailExist)
        return res.status(409).json({ message: 'Email sudah digunakan' });
      const hashedPasswrod = await bcrypt.hash(password, 10);
      console.log(hashedPasswrod);

      const newUser = await prisma.users.create({
        data: { username, password: hashedPasswrod, email },
      });

      res.status(200).send({ success: true, message: 'Akun berhasil dibuat' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}
