import Form from "@/app/ui/invoices/edit-form"
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs"
import { fetchCustomers, fetchInvoiceById } from "@/app/lib/data"
interface PageProps {
  params: {
    id: string
  }
}
export default async function Page({ params }: PageProps) {
  const { id } = params
  const [invoice, customers] = await Promise.all([
    fetchInvoiceById(id),
    fetchCustomers(),
  ])
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Invoices", href: "/dashboard/invoices" },
          {
            label: "Edit Invoice",
            href: `/dashboard/invoices/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form invoice={invoice} customers={customers} />
    </main>
  )
}
