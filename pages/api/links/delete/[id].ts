// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '@/lib/db'
import { linksTable } from '@/lib/db/schema'
import { sql, eq, and } from 'drizzle-orm'
import { withAuth } from '@/lib/middleware'
import { JWT } from 'next-auth/jwt'

type Response = {
  deletedId?: number
  message?: string
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ data: Response[] }>,
  session?: JWT | null,
) {
  if (req.method !== 'DELETE') {
    res.status(405).json({ data: [{ message: 'Method not allowed' }] })
  }

  const data = await db
    .update(linksTable)
    .set({ deleted_at: sql`NOW()` })
    .where(
      and(
        eq(linksTable.id, Number(req.query.id)),
        eq(linksTable.email, String(session?.email)),
      ),
    )
    .returning({ deletedId: linksTable.id })

  res.status(200).json({ data })
}

export default withAuth(handler)
