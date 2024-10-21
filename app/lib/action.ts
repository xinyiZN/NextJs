"use server"
import { z } from "zod"
import { sql } from "@vercel/postgres"
import { revalidatePath } from "next/dist/server/web/spec-extension/revalidate"

import { redirect } from "next/navigation"

//定义与表单对象的形状匹配的架构,此架构将在将 formData 保存到数据库之前对其进行验证。
const FormSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(),
  status: z.enum([
    'pending',
    'paid',
  ]),
  date: z.string(),
})


const createInvoice = FormSchema.omit({ id: true, date: true })

export async function CreateInvoice(formData: FormData) {
  const { customerId, amount, status } = createInvoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];

  await sql`
  INSERT INTO invoices (customer_id, amount, status, date)
  VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
`;
  //清除当前路径缓存的数据
  revalidatePath('/datshboard/invoices')
  //重新从服务器获取新数据
  redirect('/dashboard/invoices')
}


export async function deleteInvoice(id: string) {
  await sql`DELETE FROM invoices WHERE id = ${id}`;
  revalidatePath('/dashboard/invoices');
}