// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '@/lib/db'
import { linksTable } from '@/lib/db/schema'
import { JWT } from 'next-auth/jwt'
import { withAuth } from '@/lib/middleware'

type Response = {
  insertedId?: number
  message?: string
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ data: Response[] }>,
  session?: JWT | null,
) {
  if (req.method !== 'POST') {
    res.status(405).json({ data: [{ message: 'Method not allowed' }] })
  }

  const payload = JSON.parse(req.body)

  const data = await db
    .insert(linksTable)
    .values({ ...payload, email: session?.email })
    .returning({ insertedId: linksTable.id })

  res.status(200).json({ data })
}

export default withAuth(handler)
